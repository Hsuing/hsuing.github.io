import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const l="/assets/image-20220323150842963.ZrpKc8Ol.png",x=JSON.parse('{"title":"nginx实现302重定向自动跟随","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/20-302.md","filePath":"guide/Linux/web/nginx/20-302.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/20-302.md"},o=a(`<h1 id="nginx实现302重定向自动跟随" tabindex="-1">nginx实现302重定向自动跟随 <a class="header-anchor" href="#nginx实现302重定向自动跟随" aria-label="Permalink to &quot;nginx实现302重定向自动跟随&quot;">​</a></h1><h2 id="实验场景" tabindex="-1">实验场景 <a class="header-anchor" href="#实验场景" aria-label="Permalink to &quot;实验场景&quot;">​</a></h2><ul><li>前端域名</li></ul><div class="language-none vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">none</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://abc.xxx.com/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://abc.xxx.com/</span></span></code></pre></div><ul><li>配置如下</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    80 ;</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    8443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  abc.xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log  logs/abc.nestealin.com.access.main.log  main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_log  logs/abc.nestealin.com.error.log error;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate      /usr/local/nginx/conf/cert/server.cer;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key  /usr/local/nginx/conf/cert/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">    location  / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        # include firewall.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://192.168.1.23:12345;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen    80 ;</span></span>
<span class="line"><span style="color:#24292e;">    listen    443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">    listen    8443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  abc.xxx.com;</span></span>
<span class="line"><span style="color:#24292e;">    charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">    access_log  logs/abc.nestealin.com.access.main.log  main;</span></span>
<span class="line"><span style="color:#24292e;">    error_log  logs/abc.nestealin.com.error.log error;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate      /usr/local/nginx/conf/cert/server.cer;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key  /usr/local/nginx/conf/cert/server.key;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">    location  / {</span></span>
<span class="line"><span style="color:#24292e;">        # include firewall.conf;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://192.168.1.23:12345;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>后端服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://192.168.1.23:12345/login</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://192.168.1.23:12345/login</span></span></code></pre></div><ul><li>配置如下</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 12345;</span></span>
<span class="line"><span style="color:#e1e4e8;">    charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log logs/$http_host.access.main.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_log logs/test.error.crit.log crit;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location /login {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Content-Type &#39;application/json&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 200 &quot;uri: $uri&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 302 http://abc.nestealin.com/login;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 12345;</span></span>
<span class="line"><span style="color:#24292e;">    charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">    access_log logs/$http_host.access.main.log main;</span></span>
<span class="line"><span style="color:#24292e;">    error_log logs/test.error.crit.log crit;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location /login {</span></span>
<span class="line"><span style="color:#24292e;">        add_header Content-Type &#39;application/json&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        return 200 &quot;uri: $uri&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        return 302 http://abc.nestealin.com/login;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="实验背景" tabindex="-1">实验背景 <a class="header-anchor" href="#实验背景" aria-label="Permalink to &quot;实验背景&quot;">​</a></h2><ul><li>场景1： <ul><li>当正常请求域名根路径，后端服务会有一次让客户端302到 <code>/login</code> 的动作</li></ul></li></ul><p>正常请求，会给客户端返回302，然后再去请求 <code>/login</code> 路径</p><p><img src="`+l+`" alt="image-20220323150842963"></p><ul><li>curl 下查看跟随跳转</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">nestealin &gt;&gt; ~ # curl http://abc.xxx.com -vL</span></span>
<span class="line"><span style="color:#e1e4e8;">*   Trying 192.168.1.11...</span></span>
<span class="line"><span style="color:#e1e4e8;">* TCP_NODELAY set</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connected to abc.nestealin.com (192.168.1.11) port 80 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; GET / HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Host: abc.xxx.com</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; HTTP/1.1 302 Moved Temporarily</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Server: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Date: Wed, 04 Aug 2021 15:27:36 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Content-Type: text/html</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Content-Length: 138</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Connection: keep-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Keep-Alive: timeout=120</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Location: http://abc.xxx.com/login</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">* Ignoring the response-body</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connection #0 to host abc.xxx.com left intact</span></span>
<span class="line"><span style="color:#e1e4e8;">* Issue another request to this URL: &#39;http://abc.xxx.com/login&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">* Found bundle for host abc.nestealin.com: 0x7fcb7dd15ee0 [can pipeline]</span></span>
<span class="line"><span style="color:#e1e4e8;">* Could pipeline, but not asked to!</span></span>
<span class="line"><span style="color:#e1e4e8;">* Re-using existing connection! (#0) with host abc.xxx.com</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connected to abc.nestealin.com (192.168.1.11) port 80 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; GET /login HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Host: abc.xxx.com</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Server: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Date: Wed, 04 Aug 2021 15:27:36 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Content-Type: application/json</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Content-Length: 11</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Connection: keep-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Keep-Alive: timeout=120</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connection #0 to host abc.xxx.com left intact</span></span>
<span class="line"><span style="color:#e1e4e8;">uri: /login* Closing connection 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">nestealin &gt;&gt; ~ # curl http://abc.xxx.com -vL</span></span>
<span class="line"><span style="color:#24292e;">*   Trying 192.168.1.11...</span></span>
<span class="line"><span style="color:#24292e;">* TCP_NODELAY set</span></span>
<span class="line"><span style="color:#24292e;">* Connected to abc.nestealin.com (192.168.1.11) port 80 (#0)</span></span>
<span class="line"><span style="color:#24292e;">&gt; GET / HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">&gt; Host: abc.xxx.com</span></span>
<span class="line"><span style="color:#24292e;">&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span style="color:#24292e;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt; HTTP/1.1 302 Moved Temporarily</span></span>
<span class="line"><span style="color:#24292e;">&lt; Server: nginx</span></span>
<span class="line"><span style="color:#24292e;">&lt; Date: Wed, 04 Aug 2021 15:27:36 GMT</span></span>
<span class="line"><span style="color:#24292e;">&lt; Content-Type: text/html</span></span>
<span class="line"><span style="color:#24292e;">&lt; Content-Length: 138</span></span>
<span class="line"><span style="color:#24292e;">&lt; Connection: keep-alive</span></span>
<span class="line"><span style="color:#24292e;">&lt; Keep-Alive: timeout=120</span></span>
<span class="line"><span style="color:#24292e;">&lt; Location: http://abc.xxx.com/login</span></span>
<span class="line"><span style="color:#24292e;">&lt;</span></span>
<span class="line"><span style="color:#24292e;">* Ignoring the response-body</span></span>
<span class="line"><span style="color:#24292e;">* Connection #0 to host abc.xxx.com left intact</span></span>
<span class="line"><span style="color:#24292e;">* Issue another request to this URL: &#39;http://abc.xxx.com/login&#39;</span></span>
<span class="line"><span style="color:#24292e;">* Found bundle for host abc.nestealin.com: 0x7fcb7dd15ee0 [can pipeline]</span></span>
<span class="line"><span style="color:#24292e;">* Could pipeline, but not asked to!</span></span>
<span class="line"><span style="color:#24292e;">* Re-using existing connection! (#0) with host abc.xxx.com</span></span>
<span class="line"><span style="color:#24292e;">* Connected to abc.nestealin.com (192.168.1.11) port 80 (#0)</span></span>
<span class="line"><span style="color:#24292e;">&gt; GET /login HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">&gt; Host: abc.xxx.com</span></span>
<span class="line"><span style="color:#24292e;">&gt; User-Agent: curl/7.64.1</span></span>
<span class="line"><span style="color:#24292e;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt; HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#24292e;">&lt; Server: nginx</span></span>
<span class="line"><span style="color:#24292e;">&lt; Date: Wed, 04 Aug 2021 15:27:36 GMT</span></span>
<span class="line"><span style="color:#24292e;">&lt; Content-Type: application/json</span></span>
<span class="line"><span style="color:#24292e;">&lt; Content-Length: 11</span></span>
<span class="line"><span style="color:#24292e;">&lt; Connection: keep-alive</span></span>
<span class="line"><span style="color:#24292e;">&lt; Keep-Alive: timeout=120</span></span>
<span class="line"><span style="color:#24292e;">&lt;</span></span>
<span class="line"><span style="color:#24292e;">* Connection #0 to host abc.xxx.com left intact</span></span>
<span class="line"><span style="color:#24292e;">uri: /login* Closing connection 0</span></span></code></pre></div><ul><li><p>由上可以看出:</p><ul><li>客户端先请求了 <code>http://abc.xxx.com/</code> 这个URL</li><li>然后服务端响应了 302 状态码，并指定 <code>Location: http://abc.xxx.com/login</code> 这个 URL 让客户端进行重定向请求</li><li>最终客户端通过请求 <code>http://abc.xxx.com/login</code> 获取数据，得到状态码200</li></ul><p>由此发现，当发升重定向时，存在客户端同一个域名需要请求两次的情况，”体验感受”没那么友好。</p></li><li><p>场景2：</p><ul><li>在外网通过其他端口 (例如: 8443) 请求后端服务的根路径后，会重定向到默认端口的 <code>/login</code> 路径</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@test &gt;&gt; ~ # curl https://abc.xxx.com:8443 -IL</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP/1.1 302 Moved Temporarily</span></span>
<span class="line"><span style="color:#e1e4e8;">Server: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">Date: Wed, 04 Aug 2021 12:18:02 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: text/html</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Length: 138</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">Keep-Alive: timeout=120</span></span>
<span class="line"><span style="color:#e1e4e8;">Location: http://abc.xxx.com/login</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">curl: (7) couldn&#39;t connect to host</span></span>
<span class="line"><span style="color:#e1e4e8;">但因为外网80端口禁用，所以访问失败</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@test &gt;&gt; ~ # curl https://abc.xxx.com:8443 -IL</span></span>
<span class="line"><span style="color:#24292e;">HTTP/1.1 302 Moved Temporarily</span></span>
<span class="line"><span style="color:#24292e;">Server: nginx</span></span>
<span class="line"><span style="color:#24292e;">Date: Wed, 04 Aug 2021 12:18:02 GMT</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: text/html</span></span>
<span class="line"><span style="color:#24292e;">Content-Length: 138</span></span>
<span class="line"><span style="color:#24292e;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#24292e;">Keep-Alive: timeout=120</span></span>
<span class="line"><span style="color:#24292e;">Location: http://abc.xxx.com/login</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">curl: (7) couldn&#39;t connect to host</span></span>
<span class="line"><span style="color:#24292e;">但因为外网80端口禁用，所以访问失败</span></span></code></pre></div><h3 id="解决方式" tabindex="-1">解决方式 <a class="header-anchor" href="#解决方式" aria-label="Permalink to &quot;解决方式&quot;">​</a></h3><p>利用 error_page 指令实现重定向跟随</p><p>核心配置如</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location @handle_redirect {</span></span>
<span class="line"><span style="color:#e1e4e8;">    resolver 223.5.5.5;</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $saved_redirect_location &#39;$upstream_http_location&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass $saved_redirect_location;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location  / {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://192.168.1.23:12345;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 对 upstream 状态码检查，实现 error_page 错误重定向</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_intercept_errors on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # error_page 指令默认只检查了第一次后端返回的状态码，开启后可以跟随多次重定向。</span></span>
<span class="line"><span style="color:#e1e4e8;">    recursive_error_pages on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 根据状态码执行对应操作，以下为301、302、307状态码都会触发</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_page 301 302 307 = @handle_redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location @handle_redirect {</span></span>
<span class="line"><span style="color:#24292e;">    resolver 223.5.5.5;</span></span>
<span class="line"><span style="color:#24292e;">    set $saved_redirect_location &#39;$upstream_http_location&#39;;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass $saved_redirect_location;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location  / {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://192.168.1.23:12345;</span></span>
<span class="line"><span style="color:#24292e;">    # 对 upstream 状态码检查，实现 error_page 错误重定向</span></span>
<span class="line"><span style="color:#24292e;">    proxy_intercept_errors on;</span></span>
<span class="line"><span style="color:#24292e;">    # error_page 指令默认只检查了第一次后端返回的状态码，开启后可以跟随多次重定向。</span></span>
<span class="line"><span style="color:#24292e;">    recursive_error_pages on;</span></span>
<span class="line"><span style="color:#24292e;">    # 根据状态码执行对应操作，以下为301、302、307状态码都会触发</span></span>
<span class="line"><span style="color:#24292e;">    error_page 301 302 307 = @handle_redirect;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>完整配置参考</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    80 ;</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen    8443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  abc.xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log  logs/abc.xxx.com.access.main.log  main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_log  logs/abc.xxx.com.error.log error;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate      /usr/local/nginx/conf/cert/server.cer;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key  /usr/local/nginx/conf/cert/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	location @handle_redirect {</span></span>
<span class="line"><span style="color:#e1e4e8;">        resolver 223.5.5.5;</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $saved_redirect_location &#39;$upstream_http_location&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass $saved_redirect_location;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location  / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://192.168.7.83:12345;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_intercept_errors on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        recursive_error_pages on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        error_page 301 302 307 = @handle_redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen    80 ;</span></span>
<span class="line"><span style="color:#24292e;">    listen    443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">    listen    8443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  abc.xxx.com;</span></span>
<span class="line"><span style="color:#24292e;">    charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">    access_log  logs/abc.xxx.com.access.main.log  main;</span></span>
<span class="line"><span style="color:#24292e;">    error_log  logs/abc.xxx.com.error.log error;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate      /usr/local/nginx/conf/cert/server.cer;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key  /usr/local/nginx/conf/cert/server.key;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	location @handle_redirect {</span></span>
<span class="line"><span style="color:#24292e;">        resolver 223.5.5.5;</span></span>
<span class="line"><span style="color:#24292e;">        set $saved_redirect_location &#39;$upstream_http_location&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass $saved_redirect_location;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location  / {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-Port $remote_port;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://192.168.7.83:12345;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_intercept_errors on;</span></span>
<span class="line"><span style="color:#24292e;">        recursive_error_pages on;</span></span>
<span class="line"><span style="color:#24292e;">        error_page 301 302 307 = @handle_redirect;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>因为 error_page 捕获后是由 nginx 发起的重定向访问，所以若需透传客户端相关信息，那么也要在 <code>handle_redirect</code> 内部方法下增加响应透传头部，否则重定向后只会拿到 nginx 本机信息</p><h4 id="特别注意" tabindex="-1">特别注意 <a class="header-anchor" href="#特别注意" aria-label="Permalink to &quot;特别注意&quot;">​</a></h4><ul><li>在做内部重定向时，nginx需要对重定向域名做一次域名解析，一定务必保证ngxin可以解析该域名，否则会因无法解析直接返回502</li></ul>`,27),c=[o];function t(r,i,y,d,_,g){return n(),e("div",null,c)}const u=s(p,[["render",t]]);export{x as __pageData,u as default};
