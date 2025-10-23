import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const p="/assets/url.vaHEVplR.png",l="/assets/url2.Xf1RhS8R.png",m=JSON.parse('{"title":"一、rewrite","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/9-rewrite.md","filePath":"guide/Linux/web/nginx/9-rewrite.md","lastUpdated":1701684699000}'),o={name:"guide/Linux/web/nginx/9-rewrite.md"},t=e(`<h1 id="一、rewrite" tabindex="-1">一、rewrite <a class="header-anchor" href="#一、rewrite" aria-label="Permalink to &quot;一、rewrite&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1,URL访问跳转，支持开发设计。 页面跳转、兼容性支持(新旧版本更迭)、展示效果(网址精简)等。</span></span>
<span class="line"><span style="color:#e1e4e8;">2,SEO优化(Nginx伪静态的支持)</span></span>
<span class="line"><span style="color:#e1e4e8;">3,后台维护、流量转发等。</span></span>
<span class="line"><span style="color:#e1e4e8;">4,安全(动态界面进行伪装)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1,URL访问跳转，支持开发设计。 页面跳转、兼容性支持(新旧版本更迭)、展示效果(网址精简)等。</span></span>
<span class="line"><span style="color:#24292e;">2,SEO优化(Nginx伪静态的支持)</span></span>
<span class="line"><span style="color:#24292e;">3,后台维护、流量转发等。</span></span>
<span class="line"><span style="color:#24292e;">4,安全(动态界面进行伪装)</span></span></code></pre></div><p>项目开发中，有嵌入PHP框架中的动态页面，也有纯HTML的静态页面。静态页面为了方便管理，也为了和框架目录区分开，通常放在根目录下一个单独的目录中，例如：/html，但是这样有一个问题：访问url的时候，会出现：<a href="http://www.yuming.com/html/service/a.html%EF%BC%8C%E7%BC%BA%E4%B9%8F%E7%BE%8E%E8%A7%82%E6%80%A7%EF%BC%8C%E8%80%8C%E4%B8%94%E4%B9%9F%E6%9A%B4%E9%9C%B2%E4%BA%86%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E3%80%82%E9%82%A3%E5%B0%B1%E6%83%B3%E5%8A%9E%E6%B3%95%E5%8E%BB%E6%8E%89%E4%B8%AD%E9%97%B4%E7%9A%84" target="_blank" rel="noreferrer">http://www.yuming.com/html/service/a.html，缺乏美观性，而且也暴露了目录结构。那就想办法去掉中间的</a> html，将连接变为：<a href="http://www.yuming.com/service/a.html%E3%80%82%E6%83%B3%E8%A6%81%E5%AE%9E%E7%8E%B0%E6%AD%A4%E5%8F%98%E5%8C%96%EF%BC%8C%E9%9C%80%E8%A6%81%E5%AF%B9nginx%E7%9A%84location%E8%BF%9B%E8%A1%8C%E9%85%8D%E7%BD%AE" target="_blank" rel="noreferrer">http://www.yuming.com/service/a.html。想要实现此变化，需要对nginx的location进行配置</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 匹配/service/开头的任何查询并且停止搜索。任何正则表达式将不会被测试。</span></span>
<span class="line"><span style="color:#e1e4e8;">location ^~ /service/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    #将service指向/html/service目录</span></span>
<span class="line"><span style="color:#e1e4e8;">    #测试过程中，可以用 在结尾加上 redirect 查看跳转结果</span></span>
<span class="line"><span style="color:#e1e4e8;">    #rewrite ^/service/(.*)$  /html/service/$1$2 redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^/service/(.*)$  /html/service/$1$2;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 匹配/service/开头的任何查询并且停止搜索。任何正则表达式将不会被测试。</span></span>
<span class="line"><span style="color:#24292e;">location ^~ /service/ {</span></span>
<span class="line"><span style="color:#24292e;">    #将service指向/html/service目录</span></span>
<span class="line"><span style="color:#24292e;">    #测试过程中，可以用 在结尾加上 redirect 查看跳转结果</span></span>
<span class="line"><span style="color:#24292e;">    #rewrite ^/service/(.*)$  /html/service/$1$2 redirect;</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^/service/(.*)$  /html/service/$1$2;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><blockquote><p>重定向是通过 Response 状态 301 和 302 完成的, 301 状态是永久重定向, 在用户浏览器中长期保存, 甚至不经过服务器确认, 这种状态最好少用 302 状态称为 Found, 告诉浏览器当前访问的 URL 临时移动到另一个 Location 下了, 浏览器应该重新访问这个 Location. 另外Nginx有内部重定向, 注意区分</p></blockquote><h2 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h2><h3 id="_302" tabindex="-1">302 <a class="header-anchor" href="#_302" aria-label="Permalink to &quot;302&quot;">​</a></h3><p>要求访问 <a href="http://abc.com/a/" target="_blank" rel="noreferrer">http://abc.com/a/</a> 下的内容时时转发到该项目, Nginx 配置如下:</p><p>首先, 当用户访问 <a href="http://abc.com/a" target="_blank" rel="noreferrer">http://abc.com/a</a> 时, 不能直接从 location / 转发到 tomcat, 这会造成根目录错误, 所以先精确匹配该URL, 使用return功能重定向到 <a href="http://abc.com/a/" target="_blank" rel="noreferrer">http://abc.com/a/</a> 或 <a href="http://abc.com/a/index.jsp" target="_blank" rel="noreferrer">http://abc.com/a/index.jsp</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location = /a {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return http://abc.com/a/index.jsp; # 302重定向</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location = /a {</span></span>
<span class="line"><span style="color:#24292e;">    return http://abc.com/a/index.jsp; # 302重定向</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>转发 /a/* 到tomcat</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">proxy_intercept_errors  on; # 开启代理错误拦截</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /a/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://tomcat/Shop/;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    error_page 404 /404; # 404页面, 这是一个内部重定向</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location = /404 {</span></span>
<span class="line"><span style="color:#e1e4e8;">    try_files /static/err.htm =404; # try_files 依次查询文件, 若无则返回一个指定的状态码</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">proxy_intercept_errors  on; # 开启代理错误拦截</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /a/ {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://tomcat/Shop/;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    error_page 404 /404; # 404页面, 这是一个内部重定向</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location = /404 {</span></span>
<span class="line"><span style="color:#24292e;">    try_files /static/err.htm =404; # try_files 依次查询文件, 若无则返回一个指定的状态码</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="_404" tabindex="-1">404 <a class="header-anchor" href="#_404" aria-label="Permalink to &quot;404&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> upstream tomcat {</span></span>
<span class="line"><span style="color:#e1e4e8;">          server 127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">  server {</span></span>
<span class="line"><span style="color:#e1e4e8;">          listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">          server_name *.javac.ga;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">          root /home/d/www;</span></span>
<span class="line"><span style="color:#e1e4e8;">          index index.htm index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">          #添加 response header</span></span>
<span class="line"><span style="color:#e1e4e8;">          add_header developer &quot;develon&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">          add_header 原始uri &quot;$uri$is_args$args&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">          #设置代理 Header</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header Cookie $http_cookie;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header X-Forwarded-For $http_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">          #错误处理</span></span>
<span class="line"><span style="color:#e1e4e8;">          error_page 404 = @404; # 全局404</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_intercept_errors  on; # 开启代理错误拦截</span></span>
<span class="line"><span style="color:#e1e4e8;">          fastcgi_intercept_errors on; # cgi错误拦截</span></span>
<span class="line"><span style="color:#e1e4e8;">          #recursive_error_pages on; # 递归错误页面</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">          location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">          }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">          location /demo/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">                  proxy_pass http://tomcat/HeadFirstJSP/;</span></span>
<span class="line"><span style="color:#e1e4e8;">                  proxy_cookie_path /HeadFirstJSP /demo;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">                  if ($uri ~ &quot;\\.jsp$&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                          rewrite &quot;^/demo/(.+)\\.jsp$&quot; &quot;/demo/$1&quot; redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">                  }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">                  if ($uri ~ &quot;/([^\\.]+)$&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                          rewrite &quot;^/demo/(.+)$&quot; &quot;/HeadFirstJSP/$1.jsp&quot; break;</span></span>
<span class="line"><span style="color:#e1e4e8;">                  }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">                  proxy_redirect /HeadFirstJSP /demo;</span></span>
<span class="line"><span style="color:#e1e4e8;">                  error_page 404 = /demo/static/err?err=$uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">          }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">          location @404 {</span></span>
<span class="line"><span style="color:#e1e4e8;">                  root /home/d/www;</span></span>
<span class="line"><span style="color:#e1e4e8;">                  try_files /err.html =404;</span></span>
<span class="line"><span style="color:#e1e4e8;">          }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">  server {</span></span>
<span class="line"><span style="color:#e1e4e8;">          listen 80 default;</span></span>
<span class="line"><span style="color:#e1e4e8;">          return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> upstream tomcat {</span></span>
<span class="line"><span style="color:#24292e;">          server 127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">  server {</span></span>
<span class="line"><span style="color:#24292e;">          listen 80;</span></span>
<span class="line"><span style="color:#24292e;">          server_name *.javac.ga;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">          root /home/d/www;</span></span>
<span class="line"><span style="color:#24292e;">          index index.htm index.html;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">          #添加 response header</span></span>
<span class="line"><span style="color:#24292e;">          add_header developer &quot;develon&quot;;</span></span>
<span class="line"><span style="color:#24292e;">          add_header 原始uri &quot;$uri$is_args$args&quot;;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">          #设置代理 Header</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header Cookie $http_cookie;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header X-Forwarded-For $http_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">          #错误处理</span></span>
<span class="line"><span style="color:#24292e;">          error_page 404 = @404; # 全局404</span></span>
<span class="line"><span style="color:#24292e;">          proxy_intercept_errors  on; # 开启代理错误拦截</span></span>
<span class="line"><span style="color:#24292e;">          fastcgi_intercept_errors on; # cgi错误拦截</span></span>
<span class="line"><span style="color:#24292e;">          #recursive_error_pages on; # 递归错误页面</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">          location / {</span></span>
<span class="line"><span style="color:#24292e;">          }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">          location /demo/ {</span></span>
<span class="line"><span style="color:#24292e;">                  proxy_pass http://tomcat/HeadFirstJSP/;</span></span>
<span class="line"><span style="color:#24292e;">                  proxy_cookie_path /HeadFirstJSP /demo;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">                  if ($uri ~ &quot;\\.jsp$&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">                          rewrite &quot;^/demo/(.+)\\.jsp$&quot; &quot;/demo/$1&quot; redirect;</span></span>
<span class="line"><span style="color:#24292e;">                  }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">                  if ($uri ~ &quot;/([^\\.]+)$&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">                          rewrite &quot;^/demo/(.+)$&quot; &quot;/HeadFirstJSP/$1.jsp&quot; break;</span></span>
<span class="line"><span style="color:#24292e;">                  }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">                  proxy_redirect /HeadFirstJSP /demo;</span></span>
<span class="line"><span style="color:#24292e;">                  error_page 404 = /demo/static/err?err=$uri;</span></span>
<span class="line"><span style="color:#24292e;">          }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">          location @404 {</span></span>
<span class="line"><span style="color:#24292e;">                  root /home/d/www;</span></span>
<span class="line"><span style="color:#24292e;">                  try_files /err.html =404;</span></span>
<span class="line"><span style="color:#24292e;">          }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">  server {</span></span>
<span class="line"><span style="color:#24292e;">          listen 80 default;</span></span>
<span class="line"><span style="color:#24292e;">          return 444;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span></code></pre></div><h2 id="案例-1" tabindex="-1">案例 <a class="header-anchor" href="#案例-1" aria-label="Permalink to &quot;案例&quot;">​</a></h2><p>请求：<a href="http://www.ckl.com/json/rooms/2010101/info.json" target="_blank" rel="noreferrer">http://www.ckl.com/json/rooms/2010101/info.json</a></p><p>rewrite：<a href="http://test.ckl.tv/room/info/uid/2010101" target="_blank" rel="noreferrer">http://test.ckl.tv/room/info/uid/2010101</a></p><p>请求上面的地址，rewrite到一个新的地址并且发往另一组upstream</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream ckl_backend {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 10.10.1.23:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">        keepalive 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream qm_test {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 127.0.0.1:81;</span></span>
<span class="line"><span style="color:#e1e4e8;">        keepalive 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name test.ckl.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">        access_log /app/local/log/nginx/ckl_access.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_headers_hash_max_size 51200;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_headers_hash_bucket_size 6400;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #set $proxy_url qm_test;  </span></span>
<span class="line"><span style="color:#e1e4e8;">         </span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^/json/rooms/([^\\/]+)/info.json$ /room/info/uid/$1 last;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        location ~ ^/room/info/uid/([^\\/]+)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass    http://ckl_backend;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_connect_timeout 10;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_send_timeout 10;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Real-IP $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Forwarded-Server $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Forwarded-For $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_pass http://qm_test/;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_connect_timeout 10;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_send_timeout 10;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Real-IP $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Forwarded-Server $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Forwarded-For $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream ckl_backend {</span></span>
<span class="line"><span style="color:#24292e;">        server 10.10.1.23:80;</span></span>
<span class="line"><span style="color:#24292e;">        keepalive 100;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream qm_test {</span></span>
<span class="line"><span style="color:#24292e;">        server 127.0.0.1:81;</span></span>
<span class="line"><span style="color:#24292e;">        keepalive 100;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        server_name test.ckl.com;</span></span>
<span class="line"><span style="color:#24292e;">        access_log /app/local/log/nginx/ckl_access.log main;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_headers_hash_max_size 51200;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_headers_hash_bucket_size 6400;</span></span>
<span class="line"><span style="color:#24292e;">        #set $proxy_url qm_test;  </span></span>
<span class="line"><span style="color:#24292e;">         </span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^/json/rooms/([^\\/]+)/info.json$ /room/info/uid/$1 last;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        location ~ ^/room/info/uid/([^\\/]+)$ {</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass    http://ckl_backend;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                proxy_connect_timeout 10;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_send_timeout 10;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Real-IP $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Forwarded-Server $host;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Forwarded-For $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">                proxy_pass http://qm_test/;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                proxy_connect_timeout 10;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_send_timeout 10;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Real-IP $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Forwarded-Server $host;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Forwarded-For $http_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="三、参数" tabindex="-1">三、参数 <a class="header-anchor" href="#三、参数" aria-label="Permalink to &quot;三、参数&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$args：变量中存放了URL中的指令</span></span>
<span class="line"><span style="color:#e1e4e8;">$content_length:保存了请求报文头部中的content-lenght字段</span></span>
<span class="line"><span style="color:#e1e4e8;">$content_type:保存了请求头部中的content-type字段</span></span>
<span class="line"><span style="color:#e1e4e8;">$document_root:保存了针对当前资源的请求的系统根目录</span></span>
<span class="line"><span style="color:#e1e4e8;">$document_uri：保存了当前请求中不包含指令的URI，主注意是不包含请求的指令</span></span>
<span class="line"><span style="color:#e1e4e8;">$host:存放了请求的服务器名称</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_user_agent：客户端浏览器的详细信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_cookie:客户端的cookie信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$limit_rate：如果nginx服务器使用limit_rate配置了显示网络速率，则会显示，如果没有设置， 则显示0</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_addr:存放了客户端的地址，注意是客户端的公网IP，也就是一家人访问一个网站，则会显示为路由器的公网IP</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_port:客户端请求Nginx服务器时随机打开的端口，这是每个客户端自己的端口</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_user:已经经过Auth Basic Module验证的用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_body_file:做反向代理时发给后端服务器的本地资源的名称</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_method:请求资源的方式，GET/PUT/DELETE等</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_filename:当前请求的资源文件的路径名称，由root或alias指令与URI请求生成</span></span>
<span class="line"><span style="color:#e1e4e8;">$request_uri：包含请求参数的原始URI，不包含主机名</span></span>
<span class="line"><span style="color:#e1e4e8;">$squery_string:保存了URL请求的指令，与 $args相同</span></span>
<span class="line"><span style="color:#e1e4e8;">$scheme:请求的协议，如ftp，https，http等</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_protocpl：保存了客户端请求资源使用的协议的版本，如HTTP/1.0，HTTP/1.1，HTTP/2.0等</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_addr:保存了服务器的IP地址</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_name:服务器的主机名</span></span>
<span class="line"><span style="color:#e1e4e8;">$server_port:服务器的端口号</span></span>
<span class="line"><span style="color:#e1e4e8;">$uri：与$document_uri相同,是一个不包含指令的uri地址</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$args：变量中存放了URL中的指令</span></span>
<span class="line"><span style="color:#24292e;">$content_length:保存了请求报文头部中的content-lenght字段</span></span>
<span class="line"><span style="color:#24292e;">$content_type:保存了请求头部中的content-type字段</span></span>
<span class="line"><span style="color:#24292e;">$document_root:保存了针对当前资源的请求的系统根目录</span></span>
<span class="line"><span style="color:#24292e;">$document_uri：保存了当前请求中不包含指令的URI，主注意是不包含请求的指令</span></span>
<span class="line"><span style="color:#24292e;">$host:存放了请求的服务器名称</span></span>
<span class="line"><span style="color:#24292e;">$http_user_agent：客户端浏览器的详细信息</span></span>
<span class="line"><span style="color:#24292e;">$http_cookie:客户端的cookie信息</span></span>
<span class="line"><span style="color:#24292e;">$limit_rate：如果nginx服务器使用limit_rate配置了显示网络速率，则会显示，如果没有设置， 则显示0</span></span>
<span class="line"><span style="color:#24292e;">$remote_addr:存放了客户端的地址，注意是客户端的公网IP，也就是一家人访问一个网站，则会显示为路由器的公网IP</span></span>
<span class="line"><span style="color:#24292e;">$remote_port:客户端请求Nginx服务器时随机打开的端口，这是每个客户端自己的端口</span></span>
<span class="line"><span style="color:#24292e;">$remote_user:已经经过Auth Basic Module验证的用户名</span></span>
<span class="line"><span style="color:#24292e;">$request_body_file:做反向代理时发给后端服务器的本地资源的名称</span></span>
<span class="line"><span style="color:#24292e;">$request_method:请求资源的方式，GET/PUT/DELETE等</span></span>
<span class="line"><span style="color:#24292e;">$request_filename:当前请求的资源文件的路径名称，由root或alias指令与URI请求生成</span></span>
<span class="line"><span style="color:#24292e;">$request_uri：包含请求参数的原始URI，不包含主机名</span></span>
<span class="line"><span style="color:#24292e;">$squery_string:保存了URL请求的指令，与 $args相同</span></span>
<span class="line"><span style="color:#24292e;">$scheme:请求的协议，如ftp，https，http等</span></span>
<span class="line"><span style="color:#24292e;">$server_protocpl：保存了客户端请求资源使用的协议的版本，如HTTP/1.0，HTTP/1.1，HTTP/2.0等</span></span>
<span class="line"><span style="color:#24292e;">$server_addr:保存了服务器的IP地址</span></span>
<span class="line"><span style="color:#24292e;">$server_name:服务器的主机名</span></span>
<span class="line"><span style="color:#24292e;">$server_port:服务器的端口号</span></span>
<span class="line"><span style="color:#24292e;">$uri：与$document_uri相同,是一个不包含指令的uri地址</span></span></code></pre></div><ul><li>正则表达式元字符</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">.     :匹配除换行符以外的任意字符</span></span>
<span class="line"><span style="color:#e1e4e8;">?     :重复0次或1次</span></span>
<span class="line"><span style="color:#e1e4e8;">+     :重复1次或更多次</span></span>
<span class="line"><span style="color:#e1e4e8;">*     :重复0次或更多次</span></span>
<span class="line"><span style="color:#e1e4e8;">\\d    :匹配数字</span></span>
<span class="line"><span style="color:#e1e4e8;">^     :匹配字符串的开始字符</span></span>
<span class="line"><span style="color:#e1e4e8;">$     :匹配字符串的结束字符</span></span>
<span class="line"><span style="color:#e1e4e8;">{n}   :重复n次</span></span>
<span class="line"><span style="color:#e1e4e8;">{n,}  :重复n次或更多次</span></span>
<span class="line"><span style="color:#e1e4e8;">[c]   :匹配单个字符c</span></span>
<span class="line"><span style="color:#e1e4e8;">[a-z] :匹配a-z小写字母的任意一个</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">.     :匹配除换行符以外的任意字符</span></span>
<span class="line"><span style="color:#24292e;">?     :重复0次或1次</span></span>
<span class="line"><span style="color:#24292e;">+     :重复1次或更多次</span></span>
<span class="line"><span style="color:#24292e;">*     :重复0次或更多次</span></span>
<span class="line"><span style="color:#24292e;">\\d    :匹配数字</span></span>
<span class="line"><span style="color:#24292e;">^     :匹配字符串的开始字符</span></span>
<span class="line"><span style="color:#24292e;">$     :匹配字符串的结束字符</span></span>
<span class="line"><span style="color:#24292e;">{n}   :重复n次</span></span>
<span class="line"><span style="color:#24292e;">{n,}  :重复n次或更多次</span></span>
<span class="line"><span style="color:#24292e;">[c]   :匹配单个字符c</span></span>
<span class="line"><span style="color:#24292e;">[a-z] :匹配a-z小写字母的任意一个</span></span></code></pre></div><ul><li>标志位</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">last : 相当于Apache的[L]标记，表示完成rewrite</span></span>
<span class="line"><span style="color:#e1e4e8;">break : 停止执行当前虚拟主机的后续rewrite指令集</span></span>
<span class="line"><span style="color:#e1e4e8;">redirect : 返回302临时重定向，地址栏会显示跳转后的地址</span></span>
<span class="line"><span style="color:#e1e4e8;">permanent : 返回301永久重定向，地址栏会显示跳转后的地址</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">last : 相当于Apache的[L]标记，表示完成rewrite</span></span>
<span class="line"><span style="color:#24292e;">break : 停止执行当前虚拟主机的后续rewrite指令集</span></span>
<span class="line"><span style="color:#24292e;">redirect : 返回302临时重定向，地址栏会显示跳转后的地址</span></span>
<span class="line"><span style="color:#24292e;">permanent : 返回301永久重定向，地址栏会显示跳转后的地址</span></span></code></pre></div><p>Rewrite总次数不能超过10次，否则Nginx会返回状态码500报错并在浏览器提示网站重定向次数过多</p><h1 id="例子" tabindex="-1">例子 <a class="header-anchor" href="#例子" aria-label="Permalink to &quot;例子&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ ^/break {</span></span>
<span class="line"><span style="color:#e1e4e8;">     rewrite ^/break /test/ break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ ^/last {</span></span>
<span class="line"><span style="color:#e1e4e8;">     rewrite ^/last /test/ last;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;">location /test/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    default_type application/json;</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 200 &#39;{&quot;status&quot;:&quot;success&quot;}&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">当我请求127.0.0.1/break时，浏览器返回的是404，因为break不会去请求/test/块，而网站根目录下test目录根本不存在，当我请求127.0.0.1/last时，浏览器返回的是{&quot;status&quot;:&quot;success&quot;}，因为last将地址重写后生成了新的请求，新的请求地址为/test/，然后与/test/块进行匹配，返回200状态码以及{&quot;status&quot;:&quot;success&quot;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($host = &quot;xxx.com&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^/(.*)$ http://www.xxx.com/$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if (!-f $request_filename) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    rewrite ^/(.*)  http://www.xxx.com/index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#e1e4e8;">             rewrite ^/(.*)$ /index.php?$1 last;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ ^/break {</span></span>
<span class="line"><span style="color:#24292e;">     rewrite ^/break /test/ break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~ ^/last {</span></span>
<span class="line"><span style="color:#24292e;">     rewrite ^/last /test/ last;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;">location /test/ {</span></span>
<span class="line"><span style="color:#24292e;">    default_type application/json;</span></span>
<span class="line"><span style="color:#24292e;">    return 200 &#39;{&quot;status&quot;:&quot;success&quot;}&#39;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">当我请求127.0.0.1/break时，浏览器返回的是404，因为break不会去请求/test/块，而网站根目录下test目录根本不存在，当我请求127.0.0.1/last时，浏览器返回的是{&quot;status&quot;:&quot;success&quot;}，因为last将地址重写后生成了新的请求，新的请求地址为/test/，然后与/test/块进行匹配，返回200状态码以及{&quot;status&quot;:&quot;success&quot;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($host = &quot;xxx.com&quot;){</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^/(.*)$ http://www.xxx.com/$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if (!-f $request_filename) {</span></span>
<span class="line"><span style="color:#24292e;">    rewrite ^/(.*)  http://www.xxx.com/index.html;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#24292e;">             rewrite ^/(.*)$ /index.php?$1 last;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><h1 id="四、rewrite-配置-url重写及301跳转原理图" tabindex="-1">四、rewrite 配置 URL重写及301跳转原理图 <a class="header-anchor" href="#四、rewrite-配置-url重写及301跳转原理图" aria-label="Permalink to &quot;四、rewrite 配置 URL重写及301跳转原理图&quot;">​</a></h1><p>官网：<a href="http://nginx.org/en/docs/http/ngx_http_rewrite_module.html" target="_blank" rel="noreferrer">http://nginx.org/en/docs/http/ngx_http_rewrite_module.html</a></p><p>语法：rewrite regex replacement [flag];</p><p>应用位置：server，location，if</p><p>功能：实现url重写，根据正则部分内容（regex），进行替换（replacement</p><p><img src="`+p+'" alt="301跳转原理图"></p><blockquote><p>[!TIP] flag last 本规则匹对后，继续向下配对。</p></blockquote><blockquote><p>break 本规则匹对后，不继续向下匹对。</p></blockquote><blockquote><p>redirect 返回302临时重定向，浏览器显示新的url</p></blockquote><blockquote><p>permanent 返回301永久重定向，浏览器显示新的rul</p></blockquote><ul><li>301 原理图</li></ul><p><img src="'+l+`" alt="301跳转原理图"></p><p>301跳转：rewrite ^/(.*) <a href="http://www.etianetian.org/$1" target="_blank" rel="noreferrer">http://www.etianetian.org/$1</a> permanent;</p><blockquote><p>[!WARNING] 此外，如果您不确定是否要永久取消旧的URL，请避免301重定向</p></blockquote><blockquote><p>如果使用了，将会导致，再次使用old域名时，浏览器会永久缓存这个url</p></blockquote><h2 id="_4-1使用301时的建议" tabindex="-1">4.1使用301时的建议 <a class="header-anchor" href="#_4-1使用301时的建议" aria-label="Permalink to &quot;4.1使用301时的建议&quot;">​</a></h2><p>虽然部分浏览器清理缓存能去除301缓存，但总不能要求用户去清理浏览器缓存吧？</p><p>因此使用HTTP301重定向时要格外注意，以下两种方式可以避免踩坑</p><h3 id="_4-1-1使用302跳转替代301跳转" tabindex="-1">4.1.1使用302跳转替代301跳转 <a class="header-anchor" href="#_4-1-1使用302跳转替代301跳转" aria-label="Permalink to &quot;4.1.1使用302跳转替代301跳转&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">301是永久重定向，不适合临时跳转，302才是临时跳转</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#@nginx配置</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^ https://www.baidu.com redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">301是永久重定向，不适合临时跳转，302才是临时跳转</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#@nginx配置</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^ https://www.baidu.com redirect;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="_4-1-2-给301跳转加上no-cache" tabindex="-1">4.1.2.给301跳转加上no-cache <a class="header-anchor" href="#_4-1-2-给301跳转加上no-cache" aria-label="Permalink to &quot;4.1.2.给301跳转加上no-cache&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#@nginx配置</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^ https://www.baidu.com permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#@nginx配置</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">        add_header Cache-Control no-cache;</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^ https://www.baidu.com permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="五、nginx使用arg-重写带参数url案例" tabindex="-1">五、nginx使用arg_重写带参数url案例 <a class="header-anchor" href="#五、nginx使用arg-重写带参数url案例" aria-label="Permalink to &quot;五、nginx使用arg_重写带参数url案例&quot;">​</a></h1><p>需求：</p><p><a href="https://uatm.gbw-china.com.cn/pages/product/detail?id=170366085" target="_blank" rel="noreferrer">https://uatm.gbw-china.com.cn/pages/product/detail?id=170366085</a> ----》uatwww.gbw-china.com.cn/info/170366085.html</p><p>由于此期间含有参数，参数的变化：可以使用arg_参数名 去匹配到具体参数所带的值 最后的?可以阻止请求中原来的参数再带过来放到重写后的url里</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($http_user_agent !~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">	#如果从arg_参数从左到右</span></span>
<span class="line"><span style="color:#e1e4e8;">	rewrite ^/pages/product/detail  https://uatwww.gbw-china.com.cn/info/$arg_id.html? redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> rewrite ^/info(.*)\\.html https://uatm.gbw-china.com.cn/pages/product/detail\\?id=$1 redorect;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($http_user_agent !~* (mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)) {</span></span>
<span class="line"><span style="color:#24292e;">	#如果从arg_参数从左到右</span></span>
<span class="line"><span style="color:#24292e;">	rewrite ^/pages/product/detail  https://uatwww.gbw-china.com.cn/info/$arg_id.html? redirect;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> rewrite ^/info(.*)\\.html https://uatm.gbw-china.com.cn/pages/product/detail\\?id=$1 redorect;</span></span></code></pre></div><p>其他有用的nginx全局变量</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">arg_PARAMETER  #这个变量包含GET请求中，如果有变量PARAMETER时的值。</span></span>
<span class="line"><span style="color:#e1e4e8;">args          #这个变量等于请求行中(GET请求)的参数，如：foo=123&amp;bar=blahblah;</span></span>
<span class="line"><span style="color:#e1e4e8;">binary_remote_addr #二进制的客户地址。</span></span>
<span class="line"><span style="color:#e1e4e8;">body_bytes_sent  #响应时送出的body字节数数量。即使连接中断，这个数据也是精确的。</span></span>
<span class="line"><span style="color:#e1e4e8;">content_length  #请求头中的Content-length字段。</span></span>
<span class="line"><span style="color:#e1e4e8;">content_type   #请求头中的Content-Type字段。</span></span>
<span class="line"><span style="color:#e1e4e8;">cookie_COOKIE  #cookie COOKIE变量的值</span></span>
<span class="line"><span style="color:#e1e4e8;">document_root  #当前请求在root指令中指定的值。</span></span>
<span class="line"><span style="color:#e1e4e8;">document_uri   #与uri相同。</span></span>
<span class="line"><span style="color:#e1e4e8;">host        #请求主机头字段，否则为服务器名称。</span></span>
<span class="line"><span style="color:#e1e4e8;">hostname     #Set to themachine’s hostname as returned by gethostname</span></span>
<span class="line"><span style="color:#e1e4e8;">http_HEADER</span></span>
<span class="line"><span style="color:#e1e4e8;">is_args       #如果有args参数，这个变量等于”?”，否则等于”&quot;，空值。</span></span>
<span class="line"><span style="color:#e1e4e8;">http_user_agent  #客户端agent信息</span></span>
<span class="line"><span style="color:#e1e4e8;">http_cookie     #客户端cookie信息</span></span>
<span class="line"><span style="color:#e1e4e8;">limit_rate      #这个变量可以限制连接速率。</span></span>
<span class="line"><span style="color:#e1e4e8;">query_string     #与args相同。</span></span>
<span class="line"><span style="color:#e1e4e8;">request_body_file #客户端请求主体信息的临时文件名。</span></span>
<span class="line"><span style="color:#e1e4e8;">request_method  #客户端请求的动作，通常为GET或POST。</span></span>
<span class="line"><span style="color:#e1e4e8;">remote_addr     #客户端的IP地址。</span></span>
<span class="line"><span style="color:#e1e4e8;">remote_port     #客户端的端口。</span></span>
<span class="line"><span style="color:#e1e4e8;">remote_user     #已经经过Auth Basic Module验证的用户名。</span></span>
<span class="line"><span style="color:#e1e4e8;">request_completion #如果请求结束，设置为OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)。</span></span>
<span class="line"><span style="color:#e1e4e8;">request_method  #GET或POST</span></span>
<span class="line"><span style="color:#e1e4e8;">request_filename #当前请求的文件路径，由root或alias指令与URI请求生成。</span></span>
<span class="line"><span style="color:#e1e4e8;">request_uri     #包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。不能修改。</span></span>
<span class="line"><span style="color:#e1e4e8;">scheme        #HTTP方法（如http，https）。</span></span>
<span class="line"><span style="color:#e1e4e8;">server_protocol   #请求使用的协议，通常是HTTP/1.0或HTTP/1.1。</span></span>
<span class="line"><span style="color:#e1e4e8;">server_addr     #服务器地址，在完成一次系统调用后可以确定这个值。</span></span>
<span class="line"><span style="color:#e1e4e8;">server_name    #服务器名称。</span></span>
<span class="line"><span style="color:#e1e4e8;">server_port     #请求到达服务器的端口号。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">arg_PARAMETER  #这个变量包含GET请求中，如果有变量PARAMETER时的值。</span></span>
<span class="line"><span style="color:#24292e;">args          #这个变量等于请求行中(GET请求)的参数，如：foo=123&amp;bar=blahblah;</span></span>
<span class="line"><span style="color:#24292e;">binary_remote_addr #二进制的客户地址。</span></span>
<span class="line"><span style="color:#24292e;">body_bytes_sent  #响应时送出的body字节数数量。即使连接中断，这个数据也是精确的。</span></span>
<span class="line"><span style="color:#24292e;">content_length  #请求头中的Content-length字段。</span></span>
<span class="line"><span style="color:#24292e;">content_type   #请求头中的Content-Type字段。</span></span>
<span class="line"><span style="color:#24292e;">cookie_COOKIE  #cookie COOKIE变量的值</span></span>
<span class="line"><span style="color:#24292e;">document_root  #当前请求在root指令中指定的值。</span></span>
<span class="line"><span style="color:#24292e;">document_uri   #与uri相同。</span></span>
<span class="line"><span style="color:#24292e;">host        #请求主机头字段，否则为服务器名称。</span></span>
<span class="line"><span style="color:#24292e;">hostname     #Set to themachine’s hostname as returned by gethostname</span></span>
<span class="line"><span style="color:#24292e;">http_HEADER</span></span>
<span class="line"><span style="color:#24292e;">is_args       #如果有args参数，这个变量等于”?”，否则等于”&quot;，空值。</span></span>
<span class="line"><span style="color:#24292e;">http_user_agent  #客户端agent信息</span></span>
<span class="line"><span style="color:#24292e;">http_cookie     #客户端cookie信息</span></span>
<span class="line"><span style="color:#24292e;">limit_rate      #这个变量可以限制连接速率。</span></span>
<span class="line"><span style="color:#24292e;">query_string     #与args相同。</span></span>
<span class="line"><span style="color:#24292e;">request_body_file #客户端请求主体信息的临时文件名。</span></span>
<span class="line"><span style="color:#24292e;">request_method  #客户端请求的动作，通常为GET或POST。</span></span>
<span class="line"><span style="color:#24292e;">remote_addr     #客户端的IP地址。</span></span>
<span class="line"><span style="color:#24292e;">remote_port     #客户端的端口。</span></span>
<span class="line"><span style="color:#24292e;">remote_user     #已经经过Auth Basic Module验证的用户名。</span></span>
<span class="line"><span style="color:#24292e;">request_completion #如果请求结束，设置为OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)。</span></span>
<span class="line"><span style="color:#24292e;">request_method  #GET或POST</span></span>
<span class="line"><span style="color:#24292e;">request_filename #当前请求的文件路径，由root或alias指令与URI请求生成。</span></span>
<span class="line"><span style="color:#24292e;">request_uri     #包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。不能修改。</span></span>
<span class="line"><span style="color:#24292e;">scheme        #HTTP方法（如http，https）。</span></span>
<span class="line"><span style="color:#24292e;">server_protocol   #请求使用的协议，通常是HTTP/1.0或HTTP/1.1。</span></span>
<span class="line"><span style="color:#24292e;">server_addr     #服务器地址，在完成一次系统调用后可以确定这个值。</span></span>
<span class="line"><span style="color:#24292e;">server_name    #服务器名称。</span></span>
<span class="line"><span style="color:#24292e;">server_port     #请求到达服务器的端口号。</span></span></code></pre></div><p>**例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">把http://example.com/test.php?para=xxx重定向到 \\*http://example.com/new</span></span>
<span class="line"><span style="color:#e1e4e8;">若按照默认的写法：rewrite ^/test.php(.\\*) /new permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 重定向后的结果是：\\*http://example.com/new?para=xxx\\*</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> 如果改写成：rewrite ^/test.php(.\\*) /new? permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 那结果就是：http://example.com/new</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">**所以，关键点就在于“？”这个尾缀。假如又想保留某个特定的参数，那又该如何呢？可以利用Nginx本身就带有的$arg_PARAMETER参数来实现。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">**例如：</span></span>
<span class="line"><span style="color:#e1e4e8;"> 把http://example.com/test.php?para=xxx&amp;p=xx重写向到 http://example.com/new?p=xx</span></span>
<span class="line"><span style="color:#e1e4e8;"> 可以写成：rewrite ^/test.php  /new?p=$arg_p? permanent;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">把http://example.com/test.php?para=xxx重定向到 \\*http://example.com/new</span></span>
<span class="line"><span style="color:#24292e;">若按照默认的写法：rewrite ^/test.php(.\\*) /new permanent;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 重定向后的结果是：\\*http://example.com/new?para=xxx\\*</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> 如果改写成：rewrite ^/test.php(.\\*) /new? permanent;</span></span>
<span class="line"><span style="color:#24292e;"> 那结果就是：http://example.com/new</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">**所以，关键点就在于“？”这个尾缀。假如又想保留某个特定的参数，那又该如何呢？可以利用Nginx本身就带有的$arg_PARAMETER参数来实现。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">**例如：</span></span>
<span class="line"><span style="color:#24292e;"> 把http://example.com/test.php?para=xxx&amp;p=xx重写向到 http://example.com/new?p=xx</span></span>
<span class="line"><span style="color:#24292e;"> 可以写成：rewrite ^/test.php  /new?p=$arg_p? permanent;</span></span></code></pre></div><p>关于判断获取参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> if ($query_string ~* &quot;appId=(\\d+)$&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  set $id $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">  rewrite^/show/index/.* /rewrite/htmlrewrite/$id.html;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> if ($query_string ~* &quot;appId=(\\d+)$&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">  set $id $1;</span></span>
<span class="line"><span style="color:#24292e;">  rewrite^/show/index/.* /rewrite/htmlrewrite/$id.html;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span></code></pre></div><p>NginxRewrite 规则相关指令</p><p>1.break指令 使用环境：server,location,if; 该指令的作用是完成当前的规则集，不再处理rewrite指令。</p><p>2.if指令 使用环境：server,location 该指令用于检查一个条件是否符合，如果条件符合，则执行大括号内的语句。If指令不支持嵌套，不支持多个条件&amp;&amp;和||处理。</p><p>3.return指令 语法：returncode ; 使用环境：server,location,if; 该指令用于结束规则的执行并返回状态码给客户端。 示例：如果访问的URL以&quot;.sh&quot;或&quot;.bash&quot;结尾，则返回403状态码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(sh|bash)?$</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(sh|bash)?$</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>4.rewrite 指令 语法：rewriteregex replacement flag 使用环境：server,location,if 该指令根据表达式来重定向URI，或者修改字符串。指令根据配置文件中的顺序来执行。注意重写表达式只对相对路径有效。如果你想配对主机名，你应该使用if语句，示例如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if( $host ~* www\\.(.*) )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">set $host_without_www $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*)$ http://$host_without_www$1permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if( $host ~* www\\.(.*) )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">set $host_without_www $1;</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*)$ http://$host_without_www$1permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>5.Set指令 语法：setvariable value ; 默认值:none; 使用环境：server,location,if; 该指令用于定义一个变量，并给变量赋值。变量的值可以为文本、变量以及文本变量的联合。 示例：set$varname &quot;hello world&quot;;</p><p>6.Uninitialized_variable_warn指令 语法：uninitialized_variable_warnon|off 使用环境：http,server,location,if 该指令用于开启和关闭未初始化变量的警告信息，默认值为开启。</p><p>五．Nginx的Rewrite规则编写实例 1.当访问的文件和目录不存在时，重定向到某个php文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if( !-e $request_filename )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/(.*)$ index.php last;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if( !-e $request_filename )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/(.*)$ index.php last;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>2.目录对换 /123456/xxxx ====&gt; /xxxx?id=123456</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rewrite ^/(\\d+)/(.+)/ /$2?id=$1 last;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rewrite ^/(\\d+)/(.+)/ /$2?id=$1 last;</span></span></code></pre></div><p>3.如果客户端使用的是IE浏览器，则重定向到/ie目录下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if( $http_user_agent ~ MSIE)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*)$ /ie/$1 break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if( $http_user_agent ~ MSIE)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*)$ /ie/$1 break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>4.禁止访问多个目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ ^/(cron|templates)/</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ ^/(cron|templates)/</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">deny all;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>5.禁止访问以/data开头的文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ ^/data</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ ^/data</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">deny all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>6.禁止访问以.sh,.flv,.mp3为文件后缀名的文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(sh|flv|mp3)$</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(sh|flv|mp3)$</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>7.设置某些类型文件的浏览器缓存时间</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 30d;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(js|css)$</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 1h;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">expires 30d;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(js|css)$</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">expires 1h;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>8.给favicon.ico和robots.txt设置过期时间; 这里为favicon.ico为99天,robots.txt为7天并不记录404错误日志</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~(favicon.ico) {</span></span>
<span class="line"><span style="color:#e1e4e8;">log_not_found off;</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 99d;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~(robots.txt) {</span></span>
<span class="line"><span style="color:#e1e4e8;">log_not_found off;</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 7d;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~(favicon.ico) {</span></span>
<span class="line"><span style="color:#24292e;">log_not_found off;</span></span>
<span class="line"><span style="color:#24292e;">expires 99d;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~(robots.txt) {</span></span>
<span class="line"><span style="color:#24292e;">log_not_found off;</span></span>
<span class="line"><span style="color:#24292e;">expires 7d;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>9.设定某个文件的过期时间;这里为600秒，并不记录访问日志</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ^~ /html/scripts/loadhead_1.js {</span></span>
<span class="line"><span style="color:#e1e4e8;">access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">root /opt/lampp/htdocs/web;</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ^~ /html/scripts/loadhead_1.js {</span></span>
<span class="line"><span style="color:#24292e;">access_log off;</span></span>
<span class="line"><span style="color:#24292e;">root /opt/lampp/htdocs/web;</span></span>
<span class="line"><span style="color:#24292e;">expires 600;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>10.文件反盗链并设置过期时间 这里的return412 为自定义的http状态码，默认为403，方便找出正确的盗链的请求 “rewrite ^/ <a href="http://img.linuxidc.net/leech.gif;%E2%80%9D%E6%98%BE%E7%A4%BA%E4%B8%80%E5%BC%A0%E9%98%B2%E7%9B%97%E9%93%BE%E5%9B%BE%E7%89%87" target="_blank" rel="noreferrer">http://img.linuxidc.net/leech.gif;”显示一张防盗链图片</a> “access_log off;”不记录访问日志，减轻压力 “expires 3d”所有文件3天的浏览器缓存</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location ~*^.+\\.(jpg|jpeg|gif|png|swf|rar|zip|css|js)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">valid_referers none blocked *.linuxidc.com*.linuxidc.net localhost 208.97.167.194;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($invalid_referer) {</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/ http://img.linuxidc.net/leech.gif;</span></span>
<span class="line"><span style="color:#e1e4e8;">return 412;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">root /opt/lampp/htdocs/web;</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 3d;</span></span>
<span class="line"><span style="color:#e1e4e8;">break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location ~*^.+\\.(jpg|jpeg|gif|png|swf|rar|zip|css|js)$ {</span></span>
<span class="line"><span style="color:#24292e;">valid_referers none blocked *.linuxidc.com*.linuxidc.net localhost 208.97.167.194;</span></span>
<span class="line"><span style="color:#24292e;">if ($invalid_referer) {</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/ http://img.linuxidc.net/leech.gif;</span></span>
<span class="line"><span style="color:#24292e;">return 412;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">access_log off;</span></span>
<span class="line"><span style="color:#24292e;">root /opt/lampp/htdocs/web;</span></span>
<span class="line"><span style="color:#24292e;">expires 3d;</span></span>
<span class="line"><span style="color:#24292e;">break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>11.只允许固定ip访问网站，并加上密码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root /opt/htdocs/www;</span></span>
<span class="line"><span style="color:#e1e4e8;">allow 208.97.167.194; </span></span>
<span class="line"><span style="color:#e1e4e8;">allow 222.33.1.2; </span></span>
<span class="line"><span style="color:#e1e4e8;">allow 231.152.49.4;</span></span>
<span class="line"><span style="color:#e1e4e8;">deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth_basic “C1G_ADMIN”;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth_basic_user_file htpasswd;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root /opt/htdocs/www;</span></span>
<span class="line"><span style="color:#24292e;">allow 208.97.167.194; </span></span>
<span class="line"><span style="color:#24292e;">allow 222.33.1.2; </span></span>
<span class="line"><span style="color:#24292e;">allow 231.152.49.4;</span></span>
<span class="line"><span style="color:#24292e;">deny all;</span></span>
<span class="line"><span style="color:#24292e;">auth_basic “C1G_ADMIN”;</span></span>
<span class="line"><span style="color:#24292e;">auth_basic_user_file htpasswd;</span></span></code></pre></div><p>12将多级目录下的文件转成一个文件，增强seo效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/job-123-456-789.html 指向/job/123/456/789.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite^/job-([0-9]+)-([0-9]+)-([0-9]+)\\.html$ /job/$1/$2/jobshow_$3.html last;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/job-123-456-789.html 指向/job/123/456/789.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rewrite^/job-([0-9]+)-([0-9]+)-([0-9]+)\\.html$ /job/$1/$2/jobshow_$3.html last;</span></span></code></pre></div><p>13.文件和目录不存在的时候重定向：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_pass http://127.0.0.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if (!-e $request_filename) {</span></span>
<span class="line"><span style="color:#24292e;">proxy_pass http://127.0.0.1;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>14.将根目录下某个文件夹指向2级目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">如/shanghaijob/ 指向 /area/shanghai/</span></span>
<span class="line"><span style="color:#e1e4e8;">如果你将last改成permanent，那么浏览器地址栏显是/location/shanghai/</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;</span></span>
<span class="line"><span style="color:#e1e4e8;">上面例子有个问题是访问/shanghai时将不会匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/([0-9a-z]+)job$ /area/$1/ last;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">如/shanghaijob/ 指向 /area/shanghai/</span></span>
<span class="line"><span style="color:#24292e;">如果你将last改成permanent，那么浏览器地址栏显是/location/shanghai/</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;</span></span>
<span class="line"><span style="color:#24292e;">上面例子有个问题是访问/shanghai时将不会匹配</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/([0-9a-z]+)job$ /area/$1/ last;</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;</span></span></code></pre></div><p>这样/shanghai 也可以访问了，但页面中的相对链接无法使用， 如./list_1.html真实地址是/area/shanghia/list_1.html会变成/list_1.html,导至无法访问。 那我加上自动跳转也是不行咯</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">(-d $request_filename)它有个条件是必需为真实目录，而我的rewrite不是的，所以没有效果</span></span>
<span class="line"><span style="color:#e1e4e8;">if (-d $request_filename){</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/(.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">(-d $request_filename)它有个条件是必需为真实目录，而我的rewrite不是的，所以没有效果</span></span>
<span class="line"><span style="color:#24292e;">if (-d $request_filename){</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/(.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">*)([^/])$ http://$host/$1$2/permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">知道原因后就好办了，让我手动跳转吧</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/([0-9a-z]+)job$ /$1job/permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">*)([^/])$ http://$host/$1$2/permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">知道原因后就好办了，让我手动跳转吧</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/([0-9a-z]+)job$ /$1job/permanent;</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/([0-9a-z]+)job/(.*)$ /area/$1/$2last;</span></span></code></pre></div><p>15.域名跳转</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">listen   80;</span></span>
<span class="line"><span style="color:#e1e4e8;">server_name jump.linuxidc.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">index index.html index.htm index.php;</span></span>
<span class="line"><span style="color:#e1e4e8;">root /opt/lampp/htdocs/www;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/ http://www.linuxidc.com/;</span></span>
<span class="line"><span style="color:#e1e4e8;">access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">listen   80;</span></span>
<span class="line"><span style="color:#24292e;">server_name jump.linuxidc.com;</span></span>
<span class="line"><span style="color:#24292e;">index index.html index.htm index.php;</span></span>
<span class="line"><span style="color:#24292e;">root /opt/lampp/htdocs/www;</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/ http://www.linuxidc.com/;</span></span>
<span class="line"><span style="color:#24292e;">access_log off;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>16.多域名转向</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server_name www.linuxidc.comwww.linuxidc.net;</span></span>
<span class="line"><span style="color:#e1e4e8;">index index.html index.htm index.php;</span></span>
<span class="line"><span style="color:#e1e4e8;">root /opt/lampp/htdocs;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($host ~ &quot;linuxidc\\.net&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*) http://www.linuxidc.com$1permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server_name www.linuxidc.comwww.linuxidc.net;</span></span>
<span class="line"><span style="color:#24292e;">index index.html index.htm index.php;</span></span>
<span class="line"><span style="color:#24292e;">root /opt/lampp/htdocs;</span></span>
<span class="line"><span style="color:#24292e;">if ($host ~ &quot;linuxidc\\.net&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*) http://www.linuxidc.com$1permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>七．Apache和Nginx规则的对应关系 Apache的RewriteCond对应Nginx的if Apache的RewriteRule对应Nginx的rewrite Apache的[R]对应Nginx的redirect Apache的[P]对应Nginx的last Apache的[R,L]对应Nginx的redirect Apache的[P,L]对应Nginx的last Apache的[PT,L]对应Nginx的last</p><p>例如：允许指定的域名访问本站，其他的域名一律转向www.linuxidc.net Apache:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">RewriteCond %{HTTP_HOST} !^(.*?)\\.aaa\\.com$[NC]</span></span>
<span class="line"><span style="color:#e1e4e8;">RewriteCond %{HTTP_HOST} !^localhost$ </span></span>
<span class="line"><span style="color:#e1e4e8;">RewriteCond %{HTTP_HOST}!^192\\.168\\.0\\.(.*?)$</span></span>
<span class="line"><span style="color:#e1e4e8;">RewriteRule ^/(.*)$ http://www.linuxidc.net[R,L]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">RewriteCond %{HTTP_HOST} !^(.*?)\\.aaa\\.com$[NC]</span></span>
<span class="line"><span style="color:#24292e;">RewriteCond %{HTTP_HOST} !^localhost$ </span></span>
<span class="line"><span style="color:#24292e;">RewriteCond %{HTTP_HOST}!^192\\.168\\.0\\.(.*?)$</span></span>
<span class="line"><span style="color:#24292e;">RewriteRule ^/(.*)$ http://www.linuxidc.net[R,L]</span></span></code></pre></div><p>Nginx:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if( $host ~* ^(.*)\\.aaa\\.com$ )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">set $allowHost ‘1’;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if( $host ~* ^localhost )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">set $allowHost ‘1’;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if( $host ~* ^192\\.168\\.1\\.(.*?)$ )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">set $allowHost ‘1’;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if( $allowHost !~ ‘1’ )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/(.*)$ http://www.linuxidc.netredirect ;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if( $host ~* ^(.*)\\.aaa\\.com$ )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">set $allowHost ‘1’;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if( $host ~* ^localhost )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">set $allowHost ‘1’;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if( $host ~* ^192\\.168\\.1\\.(.*?)$ )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">set $allowHost ‘1’;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if( $allowHost !~ ‘1’ )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/(.*)$ http://www.linuxidc.netredirect ;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,110),c=[t];function r(i,y,d,h,u,_){return n(),a("div",null,c)}const b=s(o,[["render",r]]);export{m as __pageData,b as default};
