import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/灰度/单一ip灰度.md","filePath":"guide/Linux/web/nginx/灰度/单一ip灰度.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/灰度/单一ip灰度.md"},l=e(`<h2 id="单一ip" tabindex="-1">单一ip <a class="header-anchor" href="#单一ip" aria-label="Permalink to &quot;单一ip&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream prod {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.1.10;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.1.11;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream pre-prod {</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 192.168.1.100;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log /var/log/nginx/access.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    set $web_backend prod;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($remote_addr ~ &quot;123.123.123.123&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $web_backend pre-prod;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://$web_backend;</span></span>
<span class="line"><span style="color:#e1e4e8;">        include proxy.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream prod {</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.1.10;</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.1.11;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">upstream pre-prod {</span></span>
<span class="line"><span style="color:#24292e;">    server 192.168.1.100;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    access_log /var/log/nginx/access.log main;</span></span>
<span class="line"><span style="color:#24292e;">    set $web_backend prod;</span></span>
<span class="line"><span style="color:#24292e;">    if ($remote_addr ~ &quot;123.123.123.123&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">        set $web_backend pre-prod;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://$web_backend;</span></span>
<span class="line"><span style="color:#24292e;">        include proxy.conf;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="nginx-动态请求" tabindex="-1">nginx 动态请求 <a class="header-anchor" href="#nginx-动态请求" aria-label="Permalink to &quot;nginx 动态请求&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream jljerp {</span></span>
<span class="line"><span style="color:#e1e4e8;">           server 192.168.1.190:8001  weight=20 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">           ip_hash;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream jljerp_rc {</span></span>
<span class="line"><span style="color:#e1e4e8;">           server 192.168.1.190:8004  weight=20 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">           ip_hash;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  jljerp.jinlejia.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">        root   /var/www/index;</span></span>
<span class="line"><span style="color:#e1e4e8;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header HOST   $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header X-Real-IP      $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_set_header X-Forwarded-FOR $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_connect_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_read_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_send_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #  预发布规则，这个地址是部门内部公网地址，当这个地址过来的请求转发到新tomcat上</span></span>
<span class="line"><span style="color:#e1e4e8;">        if ($remote_addr  ~* &quot;202.106.0.20&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_pass      http://jljerp_rc;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 如果不是本部门ip请求，按照原有规则进行原有生产环境进行转发</span></span>
<span class="line"><span style="color:#e1e4e8;">          proxy_pass      http://jljerp;</span></span>
<span class="line"><span style="color:#e1e4e8;">              }</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    location = /50x.html {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream jljerp {</span></span>
<span class="line"><span style="color:#24292e;">           server 192.168.1.190:8001  weight=20 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">           ip_hash;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">upstream jljerp_rc {</span></span>
<span class="line"><span style="color:#24292e;">           server 192.168.1.190:8004  weight=20 max_fails=2 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">           ip_hash;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen       80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  jljerp.jinlejia.com;</span></span>
<span class="line"><span style="color:#24292e;">        root   /var/www/index;</span></span>
<span class="line"><span style="color:#24292e;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header HOST   $host;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header X-Real-IP      $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_set_header X-Forwarded-FOR $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_connect_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_read_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">          proxy_send_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">        #  预发布规则，这个地址是部门内部公网地址，当这个地址过来的请求转发到新tomcat上</span></span>
<span class="line"><span style="color:#24292e;">        if ($remote_addr  ~* &quot;202.106.0.20&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">          proxy_pass      http://jljerp_rc;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        # 如果不是本部门ip请求，按照原有规则进行原有生产环境进行转发</span></span>
<span class="line"><span style="color:#24292e;">          proxy_pass      http://jljerp;</span></span>
<span class="line"><span style="color:#24292e;">              }</span></span>
<span class="line"><span style="color:#24292e;">    error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#24292e;">    location = /50x.html {</span></span>
<span class="line"><span style="color:#24292e;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="nginx-静态" tabindex="-1">nginx 静态 <a class="header-anchor" href="#nginx-静态" aria-label="Permalink to &quot;nginx 静态&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen      80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  www.a.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    root   /var/www/a;</span></span>
<span class="line"><span style="color:#e1e4e8;">    index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        #  预发布规则,如果是本部门的公网的ip，访问这个目录下的地址</span></span>
<span class="line"><span style="color:#e1e4e8;">         if ($remote_addr  ~* &quot;202.106.0.20&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">               root    /var/www/b;</span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"># 由于字体使用跨域的方式进行的调用，默认浏览器拒绝访问，加上这个location就可以在其他域名下访问这个域名的字体了</span></span>
<span class="line"><span style="color:#e1e4e8;">    location ~* \\.(eot|ttf|woff|svg|otf|woff2)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">             add_header Access-Control-Allow-Origin *;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    error_page  404 500 502 503 504  /404.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    location = /404.html {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen      80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  www.a.com;</span></span>
<span class="line"><span style="color:#24292e;">    root   /var/www/a;</span></span>
<span class="line"><span style="color:#24292e;">    index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        #  预发布规则,如果是本部门的公网的ip，访问这个目录下的地址</span></span>
<span class="line"><span style="color:#24292e;">         if ($remote_addr  ~* &quot;202.106.0.20&quot;){</span></span>
<span class="line"><span style="color:#24292e;">               root    /var/www/b;</span></span>
<span class="line"><span style="color:#24292e;">         }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"># 由于字体使用跨域的方式进行的调用，默认浏览器拒绝访问，加上这个location就可以在其他域名下访问这个域名的字体了</span></span>
<span class="line"><span style="color:#24292e;">    location ~* \\.(eot|ttf|woff|svg|otf|woff2)$ {</span></span>
<span class="line"><span style="color:#24292e;">             add_header Access-Control-Allow-Origin *;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    error_page  404 500 502 503 504  /404.html;</span></span>
<span class="line"><span style="color:#24292e;">    location = /404.html {</span></span>
<span class="line"><span style="color:#24292e;">        root   /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,6),o=[l];function c(r,t,i,y,d,_){return n(),a("div",null,o)}const x=s(p,[["render",c]]);export{m as __pageData,x as default};
