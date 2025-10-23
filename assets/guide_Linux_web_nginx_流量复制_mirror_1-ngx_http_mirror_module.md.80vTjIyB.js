import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"ngx_http_mirror_module 安装试用","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/流量复制/mirror/1-ngx_http_mirror_module.md","filePath":"guide/Linux/web/nginx/流量复制/mirror/1-ngx_http_mirror_module.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/流量复制/mirror/1-ngx_http_mirror_module.md"},l=e(`<h1 id="ngx-http-mirror-module-安装试用" tabindex="-1">ngx_http_mirror_module 安装试用 <a class="header-anchor" href="#ngx-http-mirror-module-安装试用" aria-label="Permalink to &quot;ngx_http_mirror_module 安装试用&quot;">​</a></h1><ul><li>mirror 模块在 Nginx 1.13.4以后的版本中默认是启用的 这个模块是内置</li><li>ngx_http_mirror_module模块特性： <ul><li>nginx 1.13.4及后续版本内置ngx_http_mirror_module模块，提供流量镜像(复制)的功能。</li><li>支持流量放大，做法为：配置多份相同镜像。</li><li>相比tcp-copy的优势：无需录制流量，实时可用；配置相当简单。</li><li>源站请求，直接原路返回；正常配置下，mirror请求不影响源站请求及响应，源站nginx-server将流量复制到mirror站后，两者不再有任何交集</li></ul></li></ul><p>如果没有加入 --without-http_mirror_module</p><h2 id="_1-1-配置" tabindex="-1">1.1 配置 <a class="header-anchor" href="#_1-1-配置" aria-label="Permalink to &quot;1.1 配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream api.abc.com {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream tapi.abc.com {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 127.0.0.1:8081;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">　　 # 源站点</span></span>
<span class="line"><span style="color:#e1e4e8;">    location /api {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://api.abc.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        # 流量复制，每增加一个mirror 流量放大一倍</span></span>
<span class="line"><span style="color:#e1e4e8;">    mirror /tapi; </span></span>
<span class="line"><span style="color:#e1e4e8;">    mirror /mirror2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    mirror /mirror3;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 复制请求体</span></span>
<span class="line"><span style="color:#e1e4e8;">    mirror_request_body on; </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 镜像站点</span></span>
<span class="line"><span style="color:#e1e4e8;">    location /tapi {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://tapi.abc.com$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass_request_body on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream api.abc.com {</span></span>
<span class="line"><span style="color:#24292e;">    server 127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream tapi.abc.com {</span></span>
<span class="line"><span style="color:#24292e;">    server 127.0.0.1:8081;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">　　 # 源站点</span></span>
<span class="line"><span style="color:#24292e;">    location /api {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://api.abc.com;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        # 流量复制，每增加一个mirror 流量放大一倍</span></span>
<span class="line"><span style="color:#24292e;">    mirror /tapi; </span></span>
<span class="line"><span style="color:#24292e;">    mirror /mirror2;</span></span>
<span class="line"><span style="color:#24292e;">    mirror /mirror3;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 复制请求体</span></span>
<span class="line"><span style="color:#24292e;">    mirror_request_body on; </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 镜像站点</span></span>
<span class="line"><span style="color:#24292e;">    location /tapi {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://tapi.abc.com$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass_request_body on;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="文档" tabindex="-1"><strong>文档</strong> <a class="header-anchor" href="#文档" aria-label="Permalink to &quot;**文档**&quot;">​</a></h3><p>Nginx文档</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://nginx.org/en/docs/</span></span>
<span class="line"><span style="color:#e1e4e8;">http://nginx.org/en/docs/http/ngx_http_mirror_module.html</span></span>
<span class="line"><span style="color:#e1e4e8;">http://nginx.org/en/docs/beginners_guide.html</span></span>
<span class="line"><span style="color:#e1e4e8;">http://nginx.org/en/docs/http/ngx_http_core_module.html#location</span></span>
<span class="line"><span style="color:#e1e4e8;">http://nginx.org/en/docs/configure.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://nginx.org/en/docs/</span></span>
<span class="line"><span style="color:#24292e;">http://nginx.org/en/docs/http/ngx_http_mirror_module.html</span></span>
<span class="line"><span style="color:#24292e;">http://nginx.org/en/docs/beginners_guide.html</span></span>
<span class="line"><span style="color:#24292e;">http://nginx.org/en/docs/http/ngx_http_core_module.html#location</span></span>
<span class="line"><span style="color:#24292e;">http://nginx.org/en/docs/configure.html</span></span></code></pre></div><p>第三方模板</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://luajit.org/</span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.nginx.com/resources/wiki/</span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.nginx.com/resources/wiki/modules/lua/</span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.nginx.com/resources/wiki/modules/index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">https://github.com/openresty/lua-nginx-module</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://luajit.org/</span></span>
<span class="line"><span style="color:#24292e;">https://www.nginx.com/resources/wiki/</span></span>
<span class="line"><span style="color:#24292e;">https://www.nginx.com/resources/wiki/modules/lua/</span></span>
<span class="line"><span style="color:#24292e;">https://www.nginx.com/resources/wiki/modules/index.html</span></span>
<span class="line"><span style="color:#24292e;">https://github.com/openresty/lua-nginx-module</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看进程运行时间</span></span>
<span class="line"><span style="color:#e1e4e8;">ps -eo pid,user,lstart,etime,cmd | grep nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看已经建立连接的数量</span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -an | grep ESTABLISHED | wc -l</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看80端口的连接数</span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -an | grep &quot;:80&quot; | wc -l</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看进程运行时间</span></span>
<span class="line"><span style="color:#24292e;">ps -eo pid,user,lstart,etime,cmd | grep nginx</span></span>
<span class="line"><span style="color:#24292e;"># 查看已经建立连接的数量</span></span>
<span class="line"><span style="color:#24292e;">netstat -an | grep ESTABLISHED | wc -l</span></span>
<span class="line"><span style="color:#24292e;"># 查看80端口的连接数</span></span>
<span class="line"><span style="color:#24292e;">netstat -an | grep &quot;:80&quot; | wc -l</span></span></code></pre></div><h2 id="_1-2-配置说明" tabindex="-1">1.2 配置说明 <a class="header-anchor" href="#_1-2-配置说明" aria-label="Permalink to &quot;1.2 配置说明&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">配置指令解析</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_http_mirror_module 模块提供的两个配置指令 mirror 和 mirror_request_body </span></span>
<span class="line"><span style="color:#e1e4e8;">可以用在配 置文件的 http {} 、 server {} 和 location {} 三类作用域中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 多加一份mirror，流量放大一倍</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    mirror /newapi; </span></span>
<span class="line"><span style="color:#e1e4e8;">    mirror /mirror2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    mirror /mirror3;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">配置指令解析</span></span>
<span class="line"><span style="color:#24292e;">ngx_http_mirror_module 模块提供的两个配置指令 mirror 和 mirror_request_body </span></span>
<span class="line"><span style="color:#24292e;">可以用在配 置文件的 http {} 、 server {} 和 location {} 三类作用域中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 多加一份mirror，流量放大一倍</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    mirror /newapi; </span></span>
<span class="line"><span style="color:#24292e;">    mirror /mirror2;</span></span>
<span class="line"><span style="color:#24292e;">    mirror /mirror3;</span></span></code></pre></div><h2 id="_1-3实现限制" tabindex="-1">1.3实现限制 <a class="header-anchor" href="#_1-3实现限制" aria-label="Permalink to &quot;1.3实现限制&quot;">​</a></h2><ul><li>模块 <code>ngx_http_mirror_module</code> 属于应用层流量复制，它不可避免的会占用 Nginx 连接资源。同时，虽 然它不会阻塞主请求，但是「后台子请求」依然会保持对主请求的引用，就可能会造成主请求占用内存不能被 及时回收。更严重的问题是，如果主请求使用了 <em>keepalive</em> 包头开启了长连接模式时，「后台子请求」对主请 求的引用可能会造成复用此连接的下一个主请求不能被及时接收处理，从而会降低 Nginx 整体吞吐率。</li><li>由于 Nginx 不会为「后台子请求」接收上游完整响应数据，可能会造成上游数据发送失败，从而造成目标业务 处理异常。</li><li><strong>目前并不建议在流量、负载比较高的生产环境中使用该模块</strong>。如果在这些系统中有实时流量复制需 求的话，还是使用 goreplay 和 tcpcopy 这样的网络栈系工具比较妥当</li></ul><h2 id="_1-4完整配置" tabindex="-1">1.4完整配置 <a class="header-anchor" href="#_1-4完整配置" aria-label="Permalink to &quot;1.4完整配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 源后端</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream dtest-server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 172.17.20.23:5454;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 镜像目标后端</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream dtest-mirror1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 172.17.10.13:5555;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 流量分流</span></span>
<span class="line"><span style="color:#e1e4e8;">split_clients $remote_addr $mirror_backend {</span></span>
<span class="line"><span style="color:#e1e4e8;">    30% dtest-mirror1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    *   &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 8443;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name abc.xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log logs/$http_host.access.main.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_log logs/abc.nestealin.com.error.crit.log crit;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location /mirror-test/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 复制请求体</span></span>
<span class="line"><span style="color:#e1e4e8;">        mirror_request_body on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 流量复制到/mirror1的location</span></span>
<span class="line"><span style="color:#e1e4e8;">        mirror /mirror1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://dtest-server;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 镜像站点1</span></span>
<span class="line"><span style="color:#e1e4e8;">    location = /mirror1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 内部路径，禁止直接请求，外部访问该路径直接提示404</span></span>
<span class="line"><span style="color:#e1e4e8;">        internal;</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($mirror_backend = &quot;&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            return 400;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        #使用真实的url重置url</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Original-URI $request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 原始请求正文传递</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass_request_body on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://$mirror_backend$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 源后端</span></span>
<span class="line"><span style="color:#24292e;">upstream dtest-server {</span></span>
<span class="line"><span style="color:#24292e;">    server 172.17.20.23:5454;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 镜像目标后端</span></span>
<span class="line"><span style="color:#24292e;">upstream dtest-mirror1 {</span></span>
<span class="line"><span style="color:#24292e;">    server 172.17.10.13:5555;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 流量分流</span></span>
<span class="line"><span style="color:#24292e;">split_clients $remote_addr $mirror_backend {</span></span>
<span class="line"><span style="color:#24292e;">    30% dtest-mirror1;</span></span>
<span class="line"><span style="color:#24292e;">    *   &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    listen 8443;</span></span>
<span class="line"><span style="color:#24292e;">    server_name abc.xxx.com;</span></span>
<span class="line"><span style="color:#24292e;">    charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">    access_log logs/$http_host.access.main.log main;</span></span>
<span class="line"><span style="color:#24292e;">    error_log logs/abc.nestealin.com.error.crit.log crit;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location /mirror-test/ {</span></span>
<span class="line"><span style="color:#24292e;">        # 复制请求体</span></span>
<span class="line"><span style="color:#24292e;">        mirror_request_body on;</span></span>
<span class="line"><span style="color:#24292e;">        # 流量复制到/mirror1的location</span></span>
<span class="line"><span style="color:#24292e;">        mirror /mirror1;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://dtest-server;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 镜像站点1</span></span>
<span class="line"><span style="color:#24292e;">    location = /mirror1 {</span></span>
<span class="line"><span style="color:#24292e;">        # 内部路径，禁止直接请求，外部访问该路径直接提示404</span></span>
<span class="line"><span style="color:#24292e;">        internal;</span></span>
<span class="line"><span style="color:#24292e;">        if ($mirror_backend = &quot;&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">            return 400;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        #使用真实的url重置url</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Original-URI $request_uri;</span></span>
<span class="line"><span style="color:#24292e;">        # 原始请求正文传递</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass_request_body on;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://$mirror_backend$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><code>$mirror_backend</code> 变量由 split_clients 配置块定义，split_clients 会将左边的变量 <code>$remote_addr</code>（requests remote address）经过 MurmurHash2 算法进行哈希，得出的值如果在前 30% ，那么 <code>$mirror_backend</code> 的值为 dtdns-mirror1；</p><p>如果不在前 30%，那么 <code>$mirror_backend</code> 的值为空字符 “”。</p><p>从以上事例，做到了 30% 流量到镜像后端，如果 <code>$mirror_backend</code> 变量的值为空字符串，就不复制流量；其他情况就会将流量到镜像后端。</p><p>因为镜像请求的错误响应并不会影响原始请求，所以丢弃镜像请求并返回错误响应是很安全的。</p><p>在 mirror1 的 location 中，请求会被转发到 <code>$mirror_backend</code> 变量定义的后端</p><h2 id="注意点" tabindex="-1">注意点 <a class="header-anchor" href="#注意点" aria-label="Permalink to &quot;注意点&quot;">​</a></h2><ul><li>镜像后端不参与客户端请求响应，最终只以原始 proxy_pass 响应为准；</li><li>后端即使报错、返回异常状态码、直接不通 ( 502 ) 或其他异常处理，也不会影响真实流量；</li><li>但后端不可响应缓慢，这种情况会阻塞原始请求；</li><li>如果需要不传递请求 body ，需要置空正文长度</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">proxy_pass_request_body off;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header Content-Length &quot;&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">proxy_pass_request_body off;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header Content-Length &quot;&quot;;</span></span></code></pre></div>`,25),o=[l];function r(t,c,i,y,d,_){return n(),a("div",null,o)}const u=s(p,[["render",r]]);export{m as __pageData,u as default};
