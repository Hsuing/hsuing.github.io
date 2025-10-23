import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const x=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/loadBalance/2-backup.md","filePath":"guide/Linux/web/nginx/loadBalance/2-backup.md","lastUpdated":1701928035000}'),p={name:"guide/Linux/web/nginx/loadBalance/2-backup.md"},l=a(`<p>只要在希望成为后备的服务器ip后面多添加一个backup参数，这台服务器就会成为备份服务器。 在平时不使用，nginx不会给它转发任何请求。只有当其他节点全部无法连接的时候，nginx才会启用这个节点。 一旦有可用的节点恢复服务，该节点则不再使用，又进入后备状态</p><p>nginx backup 功能已实现，404 页面不转到备机， 502 503 504 到备机</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">配置如下</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream server_tomcat1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">server 127.0.0.1:9001 weight=1 max_fails=5  fail_timeout=60s;</span></span>
<span class="line"><span style="color:#e1e4e8;">server 127.0.0.1:9010 weight=1  max_fails=5  fail_timeout=60s backup;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen      443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">    include      /etc/nginx/ssl_certificate/ssl.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">  server_name test.xx.cn  ; </span></span>
<span class="line"><span style="color:#e1e4e8;">  location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        # root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_next_upstream  error timeout http_502 http_503 http_504 ;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://server_tomcat1/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_buffer_size 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_buffers  32 32k;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header  Host  $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header  X-Real-IP  $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_read_timeout 120;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">配置如下</span></span>
<span class="line"><span style="color:#24292e;">upstream server_tomcat1 {</span></span>
<span class="line"><span style="color:#24292e;">server 127.0.0.1:9001 weight=1 max_fails=5  fail_timeout=60s;</span></span>
<span class="line"><span style="color:#24292e;">server 127.0.0.1:9010 weight=1  max_fails=5  fail_timeout=60s backup;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen      443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">    include      /etc/nginx/ssl_certificate/ssl.conf;</span></span>
<span class="line"><span style="color:#24292e;">  server_name test.xx.cn  ; </span></span>
<span class="line"><span style="color:#24292e;">  location / {</span></span>
<span class="line"><span style="color:#24292e;">        # root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_next_upstream  error timeout http_502 http_503 http_504 ;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://server_tomcat1/;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_buffer_size 64k;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_buffers  32 32k;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header  Host  $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header  X-Real-IP  $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_read_timeout 120;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="解释" tabindex="-1">解释 <a class="header-anchor" href="#解释" aria-label="Permalink to &quot;解释&quot;">​</a></h2><p>#backup参数 ，backup 不能和ip_hash一起使用，backup 参数是指当所有非备机都宕机或者不可用的情况下，就只能使用带backup标准的备机。</p><p>#Nginx默认判断失败节点状态以connect refuse和timeout状态为准，不以HTTP错误状态进行判断失败， HTTP只要能返回状态说明该节点还可以正常连接，所以nginx判断其还是存活状态除非添加了proxy_next_upstream指令设置对404、502、503、504、500和time out等错误转到备机处理，</p><p>nginx记录错误数量只记录timeout 、connect refuse、502、500、503、504这6种状态，timeout和connect refuse是永远被记录错误状态，</p><p>而502、500、503、504只有在配置proxy_next_upstream参数之后nginx才会记录这4种HTTP错误到fails中；</p>`,8),o=[l];function t(r,c,i,_,y,u){return e(),n("div",null,o)}const h=s(p,[["render",t]]);export{x as __pageData,h as default};
