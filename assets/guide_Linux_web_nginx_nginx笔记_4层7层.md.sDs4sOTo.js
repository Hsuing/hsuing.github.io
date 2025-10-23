import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/nginx笔记/4层7层.md","filePath":"guide/Linux/web/nginx/nginx笔记/4层7层.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/nginx笔记/4层7层.md"},l=e(`<h2 id="_7层协议" tabindex="-1">7层协议 <a class="header-anchor" href="#_7层协议" aria-label="Permalink to &quot;7层协议&quot;">​</a></h2><p>OSI（Open System Interconnection）是一个开放性的通行系统互连参考模型，他是一个定义的非常好的协议规范，共包含七层协议。直接上图，这样更直观些：</p><p>assets/20181109183229773.png)</p><h2 id="_4层协议" tabindex="-1">4层协议 <a class="header-anchor" href="#_4层协议" aria-label="Permalink to &quot;4层协议&quot;">​</a></h2><p>TCP/IP协议 之所以说TCP/IP是一个协议族，是因为TCP/IP协议包括TCP、IP、UDP、ICMP、RIP、TELNETFTP、SMTP、ARP、TFTP等许多协议，这些协议一起称为TCP/IP协议。</p><p>从协议分层模型方面来讲，TCP/IP由四个层次组成：网络接口层、网络层、传输层、应用层。</p><p><strong>协议配置</strong></p><p>这里我们举例，在nginx做负载均衡，负载多个服务，部分服务是需要7层的，部分服务是需要4层的，也就是说7层和4层配置在同一个配置文件中。</p><h2 id="_1、7层-upstream-模块" tabindex="-1">1、7层 upstream 模块 <a class="header-anchor" href="#_1、7层-upstream-模块" aria-label="Permalink to &quot;1、7层 upstream 模块&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim nginx.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">worker_processes  2;</span></span>
<span class="line"><span style="color:#e1e4e8;">events {</span></span>
<span class="line"><span style="color:#e1e4e8;">        worker_connections  1024;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"># 7层http负载</span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">        include       mime.types;</span></span>
<span class="line"><span style="color:#e1e4e8;">        default_type  application/octet-stream;</span></span>
<span class="line"><span style="color:#e1e4e8;">        sendfile        on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        keepalive_timeout  65;</span></span>
<span class="line"><span style="color:#e1e4e8;">        gzip  on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        # app</span></span>
<span class="line"><span style="color:#e1e4e8;">        upstream  app.com {</span></span>
<span class="line"><span style="color:#e1e4e8;">                ip_hash;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server 192.168.152.100:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server 192.168.152.101:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        server {</span></span>
<span class="line"><span style="color:#e1e4e8;">                listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server_name  app;</span></span>
<span class="line"><span style="color:#e1e4e8;">                charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_pass http://plugin.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_set_header Host $host:$server_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location = /50x.html {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        root   html;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        # web</span></span>
<span class="line"><span style="color:#e1e4e8;">        upstream  web.com {</span></span>
<span class="line"><span style="color:#e1e4e8;">                ip_hash;</span></span>
<span class="line"><span style="color:#e1e4e8;">        		server 192.168.152.100:8090;</span></span>
<span class="line"><span style="color:#e1e4e8;">       		  server 192.168.152.101:8090;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        server {</span></span>
<span class="line"><span style="color:#e1e4e8;">                listen       81;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server_name  web;</span></span>
<span class="line"><span style="color:#e1e4e8;">                charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_pass http://web.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_set_header Host $host:$server_port;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location = /50x.html {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        root   html;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim nginx.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">worker_processes  2;</span></span>
<span class="line"><span style="color:#24292e;">events {</span></span>
<span class="line"><span style="color:#24292e;">        worker_connections  1024;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"># 7层http负载</span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">        include       mime.types;</span></span>
<span class="line"><span style="color:#24292e;">        default_type  application/octet-stream;</span></span>
<span class="line"><span style="color:#24292e;">        sendfile        on;</span></span>
<span class="line"><span style="color:#24292e;">        keepalive_timeout  65;</span></span>
<span class="line"><span style="color:#24292e;">        gzip  on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        # app</span></span>
<span class="line"><span style="color:#24292e;">        upstream  app.com {</span></span>
<span class="line"><span style="color:#24292e;">                ip_hash;</span></span>
<span class="line"><span style="color:#24292e;">                server 192.168.152.100:8080;</span></span>
<span class="line"><span style="color:#24292e;">                server 192.168.152.101:8080;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        server {</span></span>
<span class="line"><span style="color:#24292e;">                listen       80;</span></span>
<span class="line"><span style="color:#24292e;">                server_name  app;</span></span>
<span class="line"><span style="color:#24292e;">                charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">                location / {</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_pass http://plugin.com;</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_set_header Host $host:$server_port;</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#24292e;">                location = /50x.html {</span></span>
<span class="line"><span style="color:#24292e;">                        root   html;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        # web</span></span>
<span class="line"><span style="color:#24292e;">        upstream  web.com {</span></span>
<span class="line"><span style="color:#24292e;">                ip_hash;</span></span>
<span class="line"><span style="color:#24292e;">        		server 192.168.152.100:8090;</span></span>
<span class="line"><span style="color:#24292e;">       		  server 192.168.152.101:8090;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        server {</span></span>
<span class="line"><span style="color:#24292e;">                listen       81;</span></span>
<span class="line"><span style="color:#24292e;">                server_name  web;</span></span>
<span class="line"><span style="color:#24292e;">                charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;">                location / {</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_pass http://web.com;</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_set_header Host $host:$server_port;</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span style="color:#24292e;">                location = /50x.html {</span></span>
<span class="line"><span style="color:#24292e;">                        root   html;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2、4-层-stream-模块" tabindex="-1">2、4 层 stream 模块 <a class="header-anchor" href="#_2、4-层-stream-模块" aria-label="Permalink to &quot;2、4 层 stream 模块&quot;">​</a></h2><p>nginx 在 1.9.0 的时候，增加了一个 stream 模块，用来实现四层协议（网络层和传输层）的转发、代理、负载均衡等。stream模块的用法跟http的用法类似，允许我们配置一组TCP或者UDP等协议的监听，然后通过proxy_pass来转发我们的请求，通过upstream添加多个后端服务，实现负载均衡。</p><p><strong>注意：stream 模块和 http 模块是一同等级；做四层代理时需要添加上这个模块；</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 4 层 tcp 负载 </span></span>
<span class="line"><span style="color:#e1e4e8;">stream {</span></span>
<span class="line"><span style="color:#e1e4e8;">		upstream myweb {</span></span>
<span class="line"><span style="color:#e1e4e8;">             hash $remote_addr consistent;</span></span>
<span class="line"><span style="color:#e1e4e8;">             server 192.168.152.100:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">             server 192.168.152.101:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        server {</span></span>
<span class="line"><span style="color:#e1e4e8;">            listen 82;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_timeout 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass myweb;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># proxy_timeout  30s; #默认值为10分钟，nginx接收后端服务器的响应超时时间</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 4 层 tcp 负载 </span></span>
<span class="line"><span style="color:#24292e;">stream {</span></span>
<span class="line"><span style="color:#24292e;">		upstream myweb {</span></span>
<span class="line"><span style="color:#24292e;">             hash $remote_addr consistent;</span></span>
<span class="line"><span style="color:#24292e;">             server 192.168.152.100:8080;</span></span>
<span class="line"><span style="color:#24292e;">             server 192.168.152.101:8080;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        server {</span></span>
<span class="line"><span style="color:#24292e;">            listen 82;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_timeout 30s;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass myweb;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># proxy_timeout  30s; #默认值为10分钟，nginx接收后端服务器的响应超时时间</span></span></code></pre></div><h3 id="配置-4-层代理" tabindex="-1">配置 4 层代理 <a class="header-anchor" href="#配置-4-层代理" aria-label="Permalink to &quot;配置 4 层代理&quot;">​</a></h3><p>一台机器测试实验</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 配置 4 层代理</span></span>
<span class="line"><span style="color:#e1e4e8;"># For more information on configuration, see:</span></span>
<span class="line"><span style="color:#e1e4e8;">#   * Official English Documentation: http://nginx.org/en/docs/</span></span>
<span class="line"><span style="color:#e1e4e8;">#   * Official Russian Documentation: http://nginx.org/ru/docs/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">user nginx;</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_processes auto;</span></span>
<span class="line"><span style="color:#e1e4e8;">error_log /var/log/nginx/error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">pid /run/nginx.pid;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.</span></span>
<span class="line"><span style="color:#e1e4e8;">include /usr/share/nginx/modules/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">events {</span></span>
<span class="line"><span style="color:#e1e4e8;">    worker_connections 1024;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置 4 层代理</span></span>
<span class="line"><span style="color:#e1e4e8;">stream {</span></span>
<span class="line"><span style="color:#e1e4e8;">    upstream mytest1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 192.168.0.100:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 192.168.0.100:81;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen      192.168.0.108:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_timeout 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass mytest1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    upstream mytest2 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 192.168.0.100:3000;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 192.168.0.100:3001;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen     192.168.0.108:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_timeout 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass mytest2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log  /var/log/nginx/access.log  main;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    sendfile            on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    tcp_nopush          on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    tcp_nodelay         on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    keepalive_timeout   0;</span></span>
<span class="line"><span style="color:#e1e4e8;">    types_hash_max_size 2048;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    include             /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#e1e4e8;">    default_type        application/octet-stream;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # Load modular configuration files from the /etc/nginx/conf.d directory.</span></span>
<span class="line"><span style="color:#e1e4e8;">    # See http://nginx.org/en/docs/ngx_core_module.html#include</span></span>
<span class="line"><span style="color:#e1e4e8;">    # for more information.</span></span>
<span class="line"><span style="color:#e1e4e8;">    include /etc/nginx/conf.d/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server {</span></span>
<span class="line"><span style="color:#e1e4e8;">                listen 192.168.0.100:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server_name www.test1.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">                root         /usr/share/nginx/mytest1;</span></span>
<span class="line"><span style="color:#e1e4e8;">                access_log   /var/log/www.test1.com.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">                error_log    /var/log/www.test1.com.error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        server {</span></span>
<span class="line"><span style="color:#e1e4e8;">                listen 192.168.0.100:81;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server_name www.test1.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">                root         /usr/share/nginx/mytest2;</span></span>
<span class="line"><span style="color:#e1e4e8;">                access_log   /var/log/www.test1.com.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">                error_log    /var/log/www.test1.com.error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        server {</span></span>
<span class="line"><span style="color:#e1e4e8;">                listen 192.168.0.100:3000;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server_name www.test2.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">                root         /usr/share/nginx/mytest3;</span></span>
<span class="line"><span style="color:#e1e4e8;">                access_log   /var/log/www.test2.com.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">                error_log    /var/log/www.test2.com.error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        server {</span></span>
<span class="line"><span style="color:#e1e4e8;">                listen 192.168.0.100:3001;</span></span>
<span class="line"><span style="color:#e1e4e8;">                server_name www.test2.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">                root         /usr/share/nginx/mytest4;</span></span>
<span class="line"><span style="color:#e1e4e8;">                access_log   /var/log/www.test2.com.log main;</span></span>
<span class="line"><span style="color:#e1e4e8;">                error_log    /var/log/www.test2.com.error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#e1e4e8;">                location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 配置 4 层代理</span></span>
<span class="line"><span style="color:#24292e;"># For more information on configuration, see:</span></span>
<span class="line"><span style="color:#24292e;">#   * Official English Documentation: http://nginx.org/en/docs/</span></span>
<span class="line"><span style="color:#24292e;">#   * Official Russian Documentation: http://nginx.org/ru/docs/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">user nginx;</span></span>
<span class="line"><span style="color:#24292e;">worker_processes auto;</span></span>
<span class="line"><span style="color:#24292e;">error_log /var/log/nginx/error.log;</span></span>
<span class="line"><span style="color:#24292e;">pid /run/nginx.pid;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.</span></span>
<span class="line"><span style="color:#24292e;">include /usr/share/nginx/modules/*.conf;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">events {</span></span>
<span class="line"><span style="color:#24292e;">    worker_connections 1024;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 配置 4 层代理</span></span>
<span class="line"><span style="color:#24292e;">stream {</span></span>
<span class="line"><span style="color:#24292e;">    upstream mytest1 {</span></span>
<span class="line"><span style="color:#24292e;">        server 192.168.0.100:80;</span></span>
<span class="line"><span style="color:#24292e;">        server 192.168.0.100:81;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    server {</span></span>
<span class="line"><span style="color:#24292e;">        listen      192.168.0.108:80;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_timeout 30s;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass mytest1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    upstream mytest2 {</span></span>
<span class="line"><span style="color:#24292e;">        server 192.168.0.100:3000;</span></span>
<span class="line"><span style="color:#24292e;">        server 192.168.0.100:3001;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    server {</span></span>
<span class="line"><span style="color:#24292e;">        listen     192.168.0.108:8080;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_timeout 30s;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass mytest2;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    access_log  /var/log/nginx/access.log  main;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    sendfile            on;</span></span>
<span class="line"><span style="color:#24292e;">    tcp_nopush          on;</span></span>
<span class="line"><span style="color:#24292e;">    tcp_nodelay         on;</span></span>
<span class="line"><span style="color:#24292e;">    keepalive_timeout   0;</span></span>
<span class="line"><span style="color:#24292e;">    types_hash_max_size 2048;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    include             /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#24292e;">    default_type        application/octet-stream;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # Load modular configuration files from the /etc/nginx/conf.d directory.</span></span>
<span class="line"><span style="color:#24292e;">    # See http://nginx.org/en/docs/ngx_core_module.html#include</span></span>
<span class="line"><span style="color:#24292e;">    # for more information.</span></span>
<span class="line"><span style="color:#24292e;">    include /etc/nginx/conf.d/*.conf;</span></span>
<span class="line"><span style="color:#24292e;">        server {</span></span>
<span class="line"><span style="color:#24292e;">                listen 192.168.0.100:80;</span></span>
<span class="line"><span style="color:#24292e;">                server_name www.test1.com;</span></span>
<span class="line"><span style="color:#24292e;">                root         /usr/share/nginx/mytest1;</span></span>
<span class="line"><span style="color:#24292e;">                access_log   /var/log/www.test1.com.log main;</span></span>
<span class="line"><span style="color:#24292e;">                error_log    /var/log/www.test1.com.error.log;</span></span>
<span class="line"><span style="color:#24292e;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#24292e;">                location / {</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        server {</span></span>
<span class="line"><span style="color:#24292e;">                listen 192.168.0.100:81;</span></span>
<span class="line"><span style="color:#24292e;">                server_name www.test1.com;</span></span>
<span class="line"><span style="color:#24292e;">                root         /usr/share/nginx/mytest2;</span></span>
<span class="line"><span style="color:#24292e;">                access_log   /var/log/www.test1.com.log main;</span></span>
<span class="line"><span style="color:#24292e;">                error_log    /var/log/www.test1.com.error.log;</span></span>
<span class="line"><span style="color:#24292e;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#24292e;">                location / {</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        server {</span></span>
<span class="line"><span style="color:#24292e;">                listen 192.168.0.100:3000;</span></span>
<span class="line"><span style="color:#24292e;">                server_name www.test2.com;</span></span>
<span class="line"><span style="color:#24292e;">                root         /usr/share/nginx/mytest3;</span></span>
<span class="line"><span style="color:#24292e;">                access_log   /var/log/www.test2.com.log main;</span></span>
<span class="line"><span style="color:#24292e;">                error_log    /var/log/www.test2.com.error.log;</span></span>
<span class="line"><span style="color:#24292e;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#24292e;">                location / {</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        server {</span></span>
<span class="line"><span style="color:#24292e;">                listen 192.168.0.100:3001;</span></span>
<span class="line"><span style="color:#24292e;">                server_name www.test2.com;</span></span>
<span class="line"><span style="color:#24292e;">                root         /usr/share/nginx/mytest4;</span></span>
<span class="line"><span style="color:#24292e;">                access_log   /var/log/www.test2.com.log main;</span></span>
<span class="line"><span style="color:#24292e;">                error_log    /var/log/www.test2.com.error.log;</span></span>
<span class="line"><span style="color:#24292e;">                set_real_ip_from 192.168.0.108;</span></span>
<span class="line"><span style="color:#24292e;">                location / {</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><strong>3、负载均衡算法</strong></p><p>upstream 支持4种负载均衡调度算法:</p><p>A、<code>轮询(默认)</code> :每个请求按时间顺序逐一分配到不同的后端服务器; 加权论询</p><p>B、<code>ip_hash</code> :每个请求按访问IP的hash结果分配，同一个IP客户端固定访问一个后端服务器。可以保证来自同一ip的请求被打到固定的机器上，可以解决session问题。</p><p>C、url_hash 按访问url的hash结果来分配请求，使每个url 定向到同一个后端服务器。后台服务器为缓存的时候效率。</p><p>D、<code>fair</code> :这是比上面两个更加智能的负载均衡算法。此种算法可以依据页面大小和加载时间长短智能地进行负载均衡，也就是根据后端服务器的响应时间来分配请求，响应时间短的优先分配。<code>Nginx</code> 本身是不支持 <code>fair</code> 的，如果需要使用这种调度算法，必须下载Nginx的 <code>upstream_fair</code> 模块。</p><p><strong>配置实例</strong></p><p><strong>1、轮询</strong></p><p>nginx默认就是轮询其权重都默认为1，服务器处理请求的顺序：ABABABABAB....</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream myweb { </span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.100:8080; </span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.101:8080;      </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream myweb { </span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.100:8080; </span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.101:8080;      </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><p><strong>2、加权轮询</strong></p><p>跟据配置的权重的大小而分发给不同服务器不同数量的请求。如果不设置，则默认为1。下面服务器的请求顺序为：ABBABBABBABBABB....</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> upstream myweb { </span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.100:8080 weight=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.101:8080 weight=2;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意 值越大分配的请求越多</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> upstream myweb { </span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.100:8080 weight=1;</span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.101:8080 weight=2;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"># 注意 值越大分配的请求越多</span></span></code></pre></div><p><strong>3、ip_hash</strong></p><p>nginx 会让相同的客户端ip请求相同的服务器。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream myweb { </span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.100:8080; </span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.101:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">      ip_hash;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream myweb { </span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.100:8080; </span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.101:8080;</span></span>
<span class="line"><span style="color:#24292e;">      ip_hash;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><p><strong>4、fair</strong></p><p>fair比 weight、ip_hash更加智能的负载均衡算法，fair算法可以根据页面大小和加载时间长短智能地进行负载均衡，也就是根据后端服务器的响应时间 来分配请求，响应时间短的优先分配。Nginx本身不支持fair，如果需要这种调度算法，则必须安装upstream_fair模块。</p><p><strong>5、url_hash</strong></p><p>按访问的URL的哈希结果来分配请求，使每个URL定向到一台后端服务器，可以进一步提高后端缓存服务器的效率。Nginx本身不支持url_hash，如果需要这种调度算法，则必须安装Nginx的hash软件包。</p><p><strong>4、nginx负载均衡配置状态参数</strong></p><ul><li>down，表示当前的server暂时不参与负载均衡。</li><li>backup，预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求backup机器，因此这台机器的压力最轻。</li><li>max_fails，允许请求失败的次数，默认为1。当超过最大次数时，返回 proxy_next_upstream 模块定义的错误。</li><li>fail_timeout，在经历了max_fails次失败后，暂停服务的时间。max_fails 可以和 fail_timeout一起使用。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> upstream myweb { </span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.100:8080 weight=2 max_fails=2 fail_timeout=2;</span></span>
<span class="line"><span style="color:#e1e4e8;">      server 192.168.152.101:8080 weight=1 max_fails=2 fail_timeout=1;    </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> upstream myweb { </span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.100:8080 weight=2 max_fails=2 fail_timeout=2;</span></span>
<span class="line"><span style="color:#24292e;">      server 192.168.152.101:8080 weight=1 max_fails=2 fail_timeout=1;    </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div>`,40),o=[l];function c(r,t,i,y,_,m){return n(),a("div",null,o)}const h=s(p,[["render",c]]);export{g as __pageData,h as default};
