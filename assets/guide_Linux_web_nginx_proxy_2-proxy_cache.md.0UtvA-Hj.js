import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const p="/assets/proxy.4Hp_-HfV.jpg",l="/assets/use.4-ob-7Xf.jpg",o="/assets/cache.obzS8SR9.png",m=JSON.parse('{"title":"4. 避免 Nginx 缓存 0 字节文件的方法","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/proxy/2-proxy_cache.md","filePath":"guide/Linux/web/nginx/proxy/2-proxy_cache.md","lastUpdated":1701684699000}'),c={name:"guide/Linux/web/nginx/proxy/2-proxy_cache.md"},t=e('<p>#1,ETag和Last-Modified</p><p>nginx的proxy_cache可以通过缓存首部Cache-Control和Expires进行代理缓存，但是有个参数可以有效减少报文的传输</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">proxy_cache_revalidate on;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">proxy_cache_revalidate on;</span></span></code></pre></div><p>##1.1 缓存原理</p><p>在HTTP协议中If-Modified-Since和If-None-Match分别对应Last-Modified和ETag。结合Expires为缓存的方式实现减少传输报文的场景。按照RFC2616对HTTP协议的规定，在客户端第二次向服务器发出请求时，对于第一次访问请求的资源如果响应状态为200的资源，那么在这次请求中将会添加一个新的请求头：If-Modified-Since，故名思议，就是询问服务器从这个时间起，或者说是以这个时间为分割点，在这时间点之前有没有修改过这个文档，如果没有修改，那么返回的http状态代码是304.并且同时再次发回响应头Last-Modified，而且这两个头的时间完全相同的。</p><p>在计算Etag的时候，会产生CPU的耗费，所以也可以用时间戳，但这样直接使用Last-Modified即可。</p><p>在同时使用Expires和Etag时，没有优先级，在满足两者时才会做出决定。</p><p>在http的Response的首部中，有transfer-coding域值为chunked。则无法使用304的原理。在tomcat中禁用的方法就是设置返回的缓存，只要返回数据小于这个缓存，则不会开启。 response.setBufferSize(1024 * 1024);</p><p>如果expires 和 add_header 同时开启的情况下，则add_header优于expires生效；</p><ul><li>查看图</li></ul><p><img src="'+p+'" alt="proxy"></p><p>启用proxy_cache_min_uses最后一次缓存出发的时候，nginx服务器不会把304透传给应用服务器，而是直接获取最新的数据进行缓存，应用服务器返回200状态码</p><ul><li>proxy_cache_min_uses</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">proxy_cache_min_uses</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">proxy_cache_min_uses</span></span></code></pre></div><p><img src="'+l+`" alt="proxy_cache_min_uses"></p><p>##1.2 缓存规则</p><p>所有的缓存，都遵循源策略，就像CDN一样。Cache-Control以下4个属性，出现任意一个，则不缓存。 no-cache, no-store, max-age=0, s-maxage=0 其中max-age和s-maxage大于0的时候，则根据源站策略进行缓存，proxy_cache_valid的缓存设置时间失效。</p><p>当 max-age=3, s-maxage=5，同时配置的时候，nginx缓存时间以s-maxage时间为主。 遵循源和proxy_cache_path里面的时间有冲突的时候，策略如下：</p><p>当proxy_cache_path时间大于遵循源的时候，遵循源时间到期，请求时候，重新设置并覆盖磁盘上的文件；</p><p>当proxy_cache_path时间小于遵循源的时候，则proxy_cache_path到期的时候，重新到源站获取数据，遵循源策略失效。</p><p>#2,参数配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    proxy_cache_valid  200 304 301 302 1h;  #哪些状态缓存多长时间</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache_methods GET;                # 默认是get和head</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache_valid  any 3s;              #其他的缓存多长时间</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache_key $host:$server_port$uri$is_args$args;   </span></span>
<span class="line"><span style="color:#e1e4e8;">    #通过key来hash，定义KEY的值  </span></span>
<span class="line"><span style="color:#e1e4e8;">    #缓存的具体key值是：   [host]192.168.56.2 [server_port]8080 [uri]/cache_ehcache-2.10.0_web/expire [is_args] [args]-</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache_min_uses 3; #只要统一个url,在磁盘文件删除之前，总次数访问到达3次，就开始缓存</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache_bypass $cookie_nocache $arg_nocache $arg_comment; # 如果任何一个参数值不为空，或者不等于0，nginx就不会查找缓存，直接进行代理转发</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    proxy_cache_valid  200 304 301 302 1h;  #哪些状态缓存多长时间</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache_methods GET;                # 默认是get和head</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache_valid  any 3s;              #其他的缓存多长时间</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache_key $host:$server_port$uri$is_args$args;   </span></span>
<span class="line"><span style="color:#24292e;">    #通过key来hash，定义KEY的值  </span></span>
<span class="line"><span style="color:#24292e;">    #缓存的具体key值是：   [host]192.168.56.2 [server_port]8080 [uri]/cache_ehcache-2.10.0_web/expire [is_args] [args]-</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache_min_uses 3; #只要统一个url,在磁盘文件删除之前，总次数访问到达3次，就开始缓存</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache_bypass $cookie_nocache $arg_nocache $arg_comment; # 如果任何一个参数值不为空，或者不等于0，nginx就不会查找缓存，直接进行代理转发</span></span></code></pre></div><p>#3，例子</p><p>##3.1 favicon缓存</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location = /favicon.ico {   </span></span>
<span class="line"><span style="color:#e1e4e8;">       root   html;  </span></span>
<span class="line"><span style="color:#e1e4e8;">       index  index.html index.htm;  </span></span>
<span class="line"><span style="color:#e1e4e8;">       expires 30d; #会同时设置Expires 和 Cache-Control:max-age  </span></span>
<span class="line"><span style="color:#e1e4e8;">       add_header Pragma Pragma;  </span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location = /favicon.ico {   </span></span>
<span class="line"><span style="color:#24292e;">       root   html;  </span></span>
<span class="line"><span style="color:#24292e;">       index  index.html index.htm;  </span></span>
<span class="line"><span style="color:#24292e;">       expires 30d; #会同时设置Expires 和 Cache-Control:max-age  </span></span>
<span class="line"><span style="color:#24292e;">       add_header Pragma Pragma;  </span></span>
<span class="line"><span style="color:#24292e;">   }</span></span></code></pre></div><h1 id="_4-避免-nginx-缓存-0-字节文件的方法" tabindex="-1">4. 避免 Nginx 缓存 0 字节文件的方法 <a class="header-anchor" href="#_4-避免-nginx-缓存-0-字节文件的方法" aria-label="Permalink to &quot;4. 避免 Nginx 缓存 0 字节文件的方法&quot;">​</a></h1><ul><li>通过使用 Content-Length 响应头信息来判断并禁止缓存</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">只缓存大小大于0的内容</span></span>
<span class="line"><span style="color:#e1e4e8;">map $upstream_http_content_length $flag_cache_empty {</span></span>
<span class="line"><span style="color:#e1e4e8;">	default         0;</span></span>
<span class="line"><span style="color:#e1e4e8;">	0               1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">	location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">		...</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_no_cache $flag_cache_empty;</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_cache_bypass $flag_cache_empty;</span></span>
<span class="line"><span style="color:#e1e4e8;">		...</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果 Content-Length 值为 0 时 map 将设置 flag_cache_empty 变量值为 1，当这个值为 1 时不启用缓存</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">只缓存大小大于0的内容</span></span>
<span class="line"><span style="color:#24292e;">map $upstream_http_content_length $flag_cache_empty {</span></span>
<span class="line"><span style="color:#24292e;">	default         0;</span></span>
<span class="line"><span style="color:#24292e;">	0               1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">	location / {</span></span>
<span class="line"><span style="color:#24292e;">		...</span></span>
<span class="line"><span style="color:#24292e;">		proxy_no_cache $flag_cache_empty;</span></span>
<span class="line"><span style="color:#24292e;">		proxy_cache_bypass $flag_cache_empty;</span></span>
<span class="line"><span style="color:#24292e;">		...</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果 Content-Length 值为 0 时 map 将设置 flag_cache_empty 变量值为 1，当这个值为 1 时不启用缓存</span></span></code></pre></div><h1 id="proxy-cache" tabindex="-1">proxy_cache <a class="header-anchor" href="#proxy-cache" aria-label="Permalink to &quot;proxy_cache&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">proxy_cache_path    /home/nginx/proxy_cache/cache levels=1:2 keys_zone=proxycache:60m max_size=120m inactive=2h use_temp_path=off;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_key     $host$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache                 proxycache;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_valid           304 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_valid           403 444 24h;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_valid           404 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_valid           500 502 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_use_stale       invalid_header http_403 http_404 http_500 http_502;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_lock            on;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_lock_timeout    5s;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_no_cache              $proxynocache_atomxml $proxynocache_sitemapxml;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">proxy_cache_path    /home/nginx/proxy_cache/cache levels=1:2 keys_zone=proxycache:60m max_size=120m inactive=2h use_temp_path=off;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_key     $host$request_uri;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">proxy_cache                 proxycache;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_valid           304 2h;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_valid           403 444 24h;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_valid           404 2h;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_valid           500 502 2h;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_use_stale       invalid_header http_403 http_404 http_500 http_502;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_lock            on;</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_lock_timeout    5s;</span></span>
<span class="line"><span style="color:#24292e;">proxy_no_cache              $proxynocache_atomxml $proxynocache_sitemapxml;</span></span></code></pre></div><ul><li>proxy_cache：对应 http 段的 key_zone，是你定义的 proxy_cache 所使用的共享空间的名称。我在上面示例中使用的名称是“proxycache”</li><li>proxy_cache_valid：对指定的 HTTP 状态进行缓存，并指定缓存时间。可以自定义写入多个配置项</li><li>proxy_cache_stale：这个可以大大减少回源次数。因此可以将 inactive 适当延长</li><li>proxy_cache_lock：同样是减少回源次数。和上面的差别在于缓存是否存在</li><li>proxy_no_cache：值为若干个变量($string)，这个变量的值只有俩类，0 和 非0，这若干个变量中只要有一个值不为 0，就不会触发缓存</li></ul><h1 id="_5-案例" tabindex="-1">5.案例 <a class="header-anchor" href="#_5-案例" aria-label="Permalink to &quot;5.案例&quot;">​</a></h1><p><img src="`+o+`" alt="tu"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pcweb conf]# cat proxy.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache_path /data/cache_dir/cdn levels=1:2 keys_zone=Rats:600m inactive=6h max_size=10g use_temp_path=off;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_connect_timeout    60;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_read_timeout       60;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_send_timeout       60;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_buffer_size        32k;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_buffers           4 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_busy_buffers_size 128k;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pcweb conf]# cat proxy.conf </span></span>
<span class="line"><span style="color:#24292e;">proxy_cache_path /data/cache_dir/cdn levels=1:2 keys_zone=Rats:600m inactive=6h max_size=10g use_temp_path=off;</span></span>
<span class="line"><span style="color:#24292e;">proxy_connect_timeout    60;</span></span>
<span class="line"><span style="color:#24292e;">proxy_read_timeout       60;</span></span>
<span class="line"><span style="color:#24292e;">proxy_send_timeout       60;</span></span>
<span class="line"><span style="color:#24292e;">proxy_buffer_size        32k;</span></span>
<span class="line"><span style="color:#24292e;">proxy_buffers           4 64k;</span></span>
<span class="line"><span style="color:#24292e;">proxy_busy_buffers_size 128k;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream NORTH1_SERVER_PROXY {</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 172.x.x.x:10000 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       80 fastopen=3 reuseport;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    return       301 https://xxx.com$request_uri; </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       443 ssl http2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  web.xxx.io www.xxx.io xxx.io;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate /data/apps/nginx/ssl/xx.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key /data/apps/nginx/ssl/xx.key;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_ciphers &#39;TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+ECDSA+AES128:EECDH+aRSA+AES128:RSA+AES128:EECDH+ECDSA+AES256:EECDH+aRSA+AES256:RSA+AES256:EECDH+ECDSA+3DES:EECDH+aRSA+3DES:RSA+3DES:!MD5&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_async  on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_timeout 5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_cache shared:SSL:20m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_early_data on;</span></span>
<span class="line"><span style="color:#e1e4e8;">#ssl_stapling               on;</span></span>
<span class="line"><span style="color:#e1e4e8;">#ssl_stapling_verify        on;</span></span>
<span class="line"><span style="color:#e1e4e8;">#ssl_trusted_certificate    /data/apps/nginx/ssl/chain.pem;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   if ($server_port !~ 443) {</span></span>
<span class="line"><span style="color:#e1e4e8;">	rewrite ^(.*)$ https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($request_uri ~ ^/static/js/login.*\\.(js|css)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $nocache 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($request_uri ~ ^/static/js/register.*\\.js) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $nocache 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* /downloadImgs/*\\.(png)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">                add_header Content-Disposition: &quot;attachment; filename=$1&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	   try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   proxy_next_upstream http_500  http_503 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   proxy_pass http://NORTH1_SERVER_PROXY;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache Rats;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid  304 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid  301 24h;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid  500 502 503 504 0s;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid any 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_min_uses 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   expires 4h;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_ignore_headers &quot;Cache-Control&quot; &quot;Expires&quot; &quot;Set-Cookie&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">	#add</span></span>
<span class="line"><span style="color:#e1e4e8;">	   proxy_cache_revalidate on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_lock on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   proxy_no_cache $nocache $arg_nocache $arg_comment;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">	location ~ .*\\.(htm|html|js|css|gif|webp|jpg|jpeg|png|bmp|woff)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">	   try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_ignore_headers Cache-Control;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_next_upstream http_500 http_503 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache Rats;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid 200 304 1d;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid 301 302 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid 404 10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_valid any 2h;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#e1e4e8;">	       proxy_no_cache $nocache $arg_nocache $arg_comment;</span></span>
<span class="line"><span style="color:#e1e4e8;">           #proxy_no_cache $http_pargma $http_authorization; </span></span>
<span class="line"><span style="color:#e1e4e8;">           add_header x-cache &#39;$upstream_cache_status from TCP-MEM_CACHEB&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://NORTH1_SERVER_PROXY;</span></span>
<span class="line"><span style="color:#e1e4e8;">	   expires 4d;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log /var/log/nginx/web_access.log es;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream NORTH1_SERVER_PROXY {</span></span>
<span class="line"><span style="color:#24292e;">	server 172.x.x.x:10000 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       80 fastopen=3 reuseport;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  xxx.com;</span></span>
<span class="line"><span style="color:#24292e;">    return       301 https://xxx.com$request_uri; </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       443 ssl http2;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  web.xxx.io www.xxx.io xxx.io;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate /data/apps/nginx/ssl/xx.crt;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key /data/apps/nginx/ssl/xx.key;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_ciphers &#39;TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+ECDSA+AES128:EECDH+aRSA+AES128:RSA+AES128:EECDH+ECDSA+AES256:EECDH+aRSA+AES256:RSA+AES256:EECDH+ECDSA+3DES:EECDH+aRSA+3DES:RSA+3DES:!MD5&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_async  on;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_timeout 5m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_cache shared:SSL:20m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_early_data on;</span></span>
<span class="line"><span style="color:#24292e;">#ssl_stapling               on;</span></span>
<span class="line"><span style="color:#24292e;">#ssl_stapling_verify        on;</span></span>
<span class="line"><span style="color:#24292e;">#ssl_trusted_certificate    /data/apps/nginx/ssl/chain.pem;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   if ($server_port !~ 443) {</span></span>
<span class="line"><span style="color:#24292e;">	rewrite ^(.*)$ https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">if ($request_uri ~ ^/static/js/login.*\\.(js|css)) {</span></span>
<span class="line"><span style="color:#24292e;">        set $nocache 1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">if ($request_uri ~ ^/static/js/register.*\\.js) {</span></span>
<span class="line"><span style="color:#24292e;">        set $nocache 1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">location ~* /downloadImgs/*\\.(png)$ {</span></span>
<span class="line"><span style="color:#24292e;">                add_header Content-Disposition: &quot;attachment; filename=$1&quot;;</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	location / {</span></span>
<span class="line"><span style="color:#24292e;">	   try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#24292e;">	   proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">	   proxy_next_upstream http_500  http_503 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#24292e;">	   proxy_pass http://NORTH1_SERVER_PROXY;</span></span>
<span class="line"><span style="color:#24292e;">	   proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache Rats;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid  304 2h;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid  301 24h;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid  500 502 503 504 0s;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid any 2h;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_min_uses 1;</span></span>
<span class="line"><span style="color:#24292e;">	   expires 4h;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_ignore_headers &quot;Cache-Control&quot; &quot;Expires&quot; &quot;Set-Cookie&quot;;</span></span>
<span class="line"><span style="color:#24292e;">	#add</span></span>
<span class="line"><span style="color:#24292e;">	   proxy_cache_revalidate on;</span></span>
<span class="line"><span style="color:#24292e;">	   proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_lock on;</span></span>
<span class="line"><span style="color:#24292e;">	   proxy_no_cache $nocache $arg_nocache $arg_comment;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">	location ~ .*\\.(htm|html|js|css|gif|webp|jpg|jpeg|png|bmp|woff)$ {</span></span>
<span class="line"><span style="color:#24292e;">	   try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_ignore_headers Cache-Control;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_next_upstream http_500 http_503 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache Rats;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid 200 304 1d;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid 301 302 2h;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid 404 10m;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_valid any 2h;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#24292e;">	       proxy_no_cache $nocache $arg_nocache $arg_comment;</span></span>
<span class="line"><span style="color:#24292e;">           #proxy_no_cache $http_pargma $http_authorization; </span></span>
<span class="line"><span style="color:#24292e;">           add_header x-cache &#39;$upstream_cache_status from TCP-MEM_CACHEB&#39;;</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://NORTH1_SERVER_PROXY;</span></span>
<span class="line"><span style="color:#24292e;">	   expires 4d;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;">	access_log /var/log/nginx/web_access.log es;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>香港服务器反向代理我这台国内的服务器.来加速境外缓存.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">境内-&gt;CDN-&gt;源站</span></span>
<span class="line"><span style="color:#e1e4e8;">境外-&gt;香港服务器-&gt;CDN-&gt;源站</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">境内-&gt;CDN-&gt;源站</span></span>
<span class="line"><span style="color:#24292e;">境外-&gt;香港服务器-&gt;CDN-&gt;源站</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#PROXY-START/</span></span>
<span class="line"><span style="color:#e1e4e8;">location  ~* \\.(php|jsp|cgi|asp|aspx)$</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass https://blog.kieng.cn.**.***;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Host blog.kieng.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header REMOTE-HOST $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">location /</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass https://blog.kieng.cn.**.***;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Host blog.kieng.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header REMOTE-HOST $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header X-Cache $upstream_cache_status;</span></span>
<span class="line"><span style="color:#e1e4e8;">	#Set &lt;a href=&quot;https://blog.kieng.cn/tag/nginx&quot; title=&quot;查看更多关于 Nginx 的文章&quot; target=&quot;_blank&quot;&gt;Nginx&lt;/a&gt; Cache</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_ignore_headers Set-Cookie Cache-Control expires;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache cache_one;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cache_valid 200 304 301 302 1h;</span></span>
<span class="line"><span style="color:#e1e4e8;">    expires 12h;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">#我们需要缓存的文件后缀,可以自己按照自己的情况配置</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~*\\.(png|jpg|gif|svg|jpeg|js|css|ttf|woff|eot)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Access-Control-Allow-Origin *;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Access-Control-Allow-Methods &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Access-Control-Allow-Headers &#39;DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">      #所有链接，浏览器缓存过期时间为 365 天</span></span>
<span class="line"><span style="color:#e1e4e8;">        expires 365d;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #此目录为服务器的根目录，下面的 if 语句就是判断此目录下是否有响应的文件</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /www/wwwroot/blog.kieng.cn; </span></span>
<span class="line"><span style="color:#e1e4e8;">        #表示开启缓存</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_store on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #表示用户读写权限</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_store_access user:rw group:rw all:rw;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #此处为文件的缓存路径，这个路径是和 url 中的文件路径一致的</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_temp_path /www/wwwroot/blog.kieng.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #发送的 host  就是博客域名</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host blog.kieng.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #这句话的意思是请求时让源服务器不压缩数据,如果你开启了 gzip 的话必须加这个.要不然 CSS 和 JS 文件会乱码</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Accept-Encoding identity;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ( !-e $request_filename)  {</span></span>
<span class="line"><span style="color:#e1e4e8;">                #此处为要被代理的服务器的地址 CDN 的 cname 地址</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass https://blog.kieng.cn.**.***;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">#PROXY-END/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#PROXY-START/</span></span>
<span class="line"><span style="color:#24292e;">location  ~* \\.(php|jsp|cgi|asp|aspx)$</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass https://blog.kieng.cn.**.***;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Host blog.kieng.cn;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header REMOTE-HOST $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">location /</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass https://blog.kieng.cn.**.***;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Host blog.kieng.cn;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header REMOTE-HOST $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    add_header X-Cache $upstream_cache_status;</span></span>
<span class="line"><span style="color:#24292e;">	#Set &lt;a href=&quot;https://blog.kieng.cn/tag/nginx&quot; title=&quot;查看更多关于 Nginx 的文章&quot; target=&quot;_blank&quot;&gt;Nginx&lt;/a&gt; Cache</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    proxy_ignore_headers Set-Cookie Cache-Control expires;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache cache_one;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache_key $host$uri$is_args$args;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_cache_valid 200 304 301 302 1h;</span></span>
<span class="line"><span style="color:#24292e;">    expires 12h;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">#我们需要缓存的文件后缀,可以自己按照自己的情况配置</span></span>
<span class="line"><span style="color:#24292e;">location ~*\\.(png|jpg|gif|svg|jpeg|js|css|ttf|woff|eot)$ {</span></span>
<span class="line"><span style="color:#24292e;">        add_header Access-Control-Allow-Origin *;</span></span>
<span class="line"><span style="color:#24292e;">        add_header Access-Control-Allow-Methods &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header Access-Control-Allow-Headers &#39;DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization&#39;;</span></span>
<span class="line"><span style="color:#24292e;">      #所有链接，浏览器缓存过期时间为 365 天</span></span>
<span class="line"><span style="color:#24292e;">        expires 365d;</span></span>
<span class="line"><span style="color:#24292e;">        #此目录为服务器的根目录，下面的 if 语句就是判断此目录下是否有响应的文件</span></span>
<span class="line"><span style="color:#24292e;">        root /www/wwwroot/blog.kieng.cn; </span></span>
<span class="line"><span style="color:#24292e;">        #表示开启缓存</span></span>
<span class="line"><span style="color:#24292e;">        proxy_store on;</span></span>
<span class="line"><span style="color:#24292e;">        #表示用户读写权限</span></span>
<span class="line"><span style="color:#24292e;">        proxy_store_access user:rw group:rw all:rw;</span></span>
<span class="line"><span style="color:#24292e;">        #此处为文件的缓存路径，这个路径是和 url 中的文件路径一致的</span></span>
<span class="line"><span style="color:#24292e;">        proxy_temp_path /www/wwwroot/blog.kieng.cn;</span></span>
<span class="line"><span style="color:#24292e;">        #发送的 host  就是博客域名</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host blog.kieng.cn;</span></span>
<span class="line"><span style="color:#24292e;">        #这句话的意思是请求时让源服务器不压缩数据,如果你开启了 gzip 的话必须加这个.要不然 CSS 和 JS 文件会乱码</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Accept-Encoding identity;</span></span>
<span class="line"><span style="color:#24292e;">        if ( !-e $request_filename)  {</span></span>
<span class="line"><span style="color:#24292e;">                #此处为要被代理的服务器的地址 CDN 的 cname 地址</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass https://blog.kieng.cn.**.***;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">#PROXY-END/</span></span></code></pre></div><h1 id="_6-跳过缓存配置" tabindex="-1">6.跳过缓存配置 <a class="header-anchor" href="#_6-跳过缓存配置" aria-label="Permalink to &quot;6.跳过缓存配置&quot;">​</a></h1><p>第一个是url包含preview和cauth不缓存，第二个是url包含type =4的缓存，其他都不走缓存</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> location ~* /apadlibrary/.*GetJpgUrl.aspx.* {</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_next_upstream http_502 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://usp_sub;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  X-Real-IP  $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  Host  $host:$server_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  X-NginX-Proxy  true;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_redirect     off;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_ignore_headers Expires;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_ignore_headers Cache-Control;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_cache cache_one;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_cache_valid 301 302 1d;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_cache_bypass $arg_preview $arg_cauth;</span></span>
<span class="line"><span style="color:#e1e4e8;">                add_header  Nginx-Cache &quot;$upstream_cache_status&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">                expires 1d;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        location ~* /.*/Detail.mvc.* {</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_next_upstream http_502 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://usp_iis;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  X-Real-IP  $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  Host  $host:$server_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header  X-NginX-Proxy  true;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_redirect     off;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_ignore_headers Expires;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_ignore_headers Cache-Control;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_cache cache_one;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_cache_valid 301 302 1d;</span></span>
<span class="line"><span style="color:#e1e4e8;">                set $nocache 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">                if ($arg_type = &quot;4&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        set $nocache 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_cache_bypass $nocache;</span></span>
<span class="line"><span style="color:#e1e4e8;">                add_header  Nginx-Cache &quot;$upstream_cache_status&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">                expires 1d;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> location ~* /apadlibrary/.*GetJpgUrl.aspx.* {</span></span>
<span class="line"><span style="color:#24292e;">                proxy_next_upstream http_502 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://usp_sub;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  X-Real-IP  $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  Host  $host:$server_port;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  X-NginX-Proxy  true;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_redirect     off;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_ignore_headers Expires;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_ignore_headers Cache-Control;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_cache cache_one;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_cache_valid 301 302 1d;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_cache_bypass $arg_preview $arg_cauth;</span></span>
<span class="line"><span style="color:#24292e;">                add_header  Nginx-Cache &quot;$upstream_cache_status&quot;;</span></span>
<span class="line"><span style="color:#24292e;">                expires 1d;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        location ~* /.*/Detail.mvc.* {</span></span>
<span class="line"><span style="color:#24292e;">                proxy_next_upstream http_502 http_504 error timeout invalid_header;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://usp_iis;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  X-Real-IP  $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  Host  $host:$server_port;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header  X-NginX-Proxy  true;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_redirect     off;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_ignore_headers Expires;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_ignore_headers Cache-Control;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_cache cache_one;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_cache_valid 301 302 1d;</span></span>
<span class="line"><span style="color:#24292e;">                set $nocache 1;</span></span>
<span class="line"><span style="color:#24292e;">                if ($arg_type = &quot;4&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">                        set $nocache 0;</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                proxy_cache_bypass $nocache;</span></span>
<span class="line"><span style="color:#24292e;">                add_header  Nginx-Cache &quot;$upstream_cache_status&quot;;</span></span>
<span class="line"><span style="color:#24292e;">                expires 1d;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span></code></pre></div>`,41),r=[t];function i(y,_,h,d,x,g){return a(),n("div",null,r)}const v=s(c,[["render",i]]);export{m as __pageData,v as default};
