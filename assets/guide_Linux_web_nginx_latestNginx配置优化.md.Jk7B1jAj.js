import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const l="/assets/image-20220321105634224.BedlTrQe.png",p="/assets/image-20220321105531626.p3H2a3VO.png",f=JSON.parse('{"title":"另一个维度来总结","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/latestNginx配置优化.md","filePath":"guide/Linux/web/nginx/latestNginx配置优化.md","lastUpdated":1701684699000}'),o={name:"guide/Linux/web/nginx/latestNginx配置优化.md"},t=a(`<h2 id="_1-隐藏版本信息" tabindex="-1">1. 隐藏版本信息 <a class="header-anchor" href="#_1-隐藏版本信息" aria-label="Permalink to &quot;1. 隐藏版本信息&quot;">​</a></h2><p>修改Nginx源码文件，此配置文件需要在nginx.conf的http中添加server_tokens off;开启nginx版本隐藏才能实现预期效果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@CentOS7 nginx-1.14.2]#vim src/http/ngx_http_header_filter_module.c</span></span>
<span class="line"><span style="color:#e1e4e8;"> 49 static u_char ngx_http_server_string[] = &quot;Server: Darius/10.0&quot; CRLF;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> # 修改src/core/nginx.h文件无需开启隐藏功能，起到修改版本信息的效果</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@CentOS7 nginx-1.14.2]# vim src/core/nginx.h</span></span>
<span class="line"><span style="color:#e1e4e8;">#define NGINX_VERSION      &quot;10.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> #define NGINX_VER          &quot;Darius/&quot; NGINX_VERSION</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i -e &#39;s/1.12.2//g&#39; -e &#39;s/nginx\\//JSP/g&#39; -e &#39;s/&quot;NGINX&quot;/&quot;JSP&quot;/g&#39; src/core/nginx.h</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vi +48 src/http/ngx_http_header_filter_module.c</span></span>
<span class="line"><span style="color:#e1e4e8;">static char ngx_http_server_string[] = &quot;Server: nginx&quot; CRLF;</span></span>
<span class="line"><span style="color:#e1e4e8;">static char ngx_http_server_full_string[] = &quot;Server: &quot; NGINX_VER CRLF;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">修改</span></span>
<span class="line"><span style="color:#e1e4e8;">static char ngx_http_server_string[] = &quot;Server: Ninja Web Server&quot; CRLF;</span></span>
<span class="line"><span style="color:#e1e4e8;">static char ngx_http_server_full_string[] = &quot;Server: Ninja Web Server&quot; CRLF;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@CentOS7 nginx-1.14.2]#vim src/http/ngx_http_header_filter_module.c</span></span>
<span class="line"><span style="color:#24292e;"> 49 static u_char ngx_http_server_string[] = &quot;Server: Darius/10.0&quot; CRLF;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> # 修改src/core/nginx.h文件无需开启隐藏功能，起到修改版本信息的效果</span></span>
<span class="line"><span style="color:#24292e;">[root@CentOS7 nginx-1.14.2]# vim src/core/nginx.h</span></span>
<span class="line"><span style="color:#24292e;">#define NGINX_VERSION      &quot;10.0&quot;</span></span>
<span class="line"><span style="color:#24292e;"> #define NGINX_VER          &quot;Darius/&quot; NGINX_VERSION</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sed -i -e &#39;s/1.12.2//g&#39; -e &#39;s/nginx\\//JSP/g&#39; -e &#39;s/&quot;NGINX&quot;/&quot;JSP&quot;/g&#39; src/core/nginx.h</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vi +48 src/http/ngx_http_header_filter_module.c</span></span>
<span class="line"><span style="color:#24292e;">static char ngx_http_server_string[] = &quot;Server: nginx&quot; CRLF;</span></span>
<span class="line"><span style="color:#24292e;">static char ngx_http_server_full_string[] = &quot;Server: &quot; NGINX_VER CRLF;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">修改</span></span>
<span class="line"><span style="color:#24292e;">static char ngx_http_server_string[] = &quot;Server: Ninja Web Server&quot; CRLF;</span></span>
<span class="line"><span style="color:#24292e;">static char ngx_http_server_full_string[] = &quot;Server: Ninja Web Server&quot; CRLF;</span></span></code></pre></div><h3 id="只允许我们的域名的访问" tabindex="-1">只允许我们的域名的访问 <a class="header-anchor" href="#只允许我们的域名的访问" aria-label="Permalink to &quot;只允许我们的域名的访问&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($host </span><span style="color:#F97583;">!</span><span style="color:#B392F0;">~</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">nixcraft.in</span><span style="color:#F97583;">|</span><span style="color:#B392F0;">www.nixcraft.in</span><span style="color:#F97583;">|</span><span style="color:#B392F0;">images.nixcraft.in</span><span style="color:#E1E4E8;">)$ ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">444</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($host </span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">~</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">nixcraft.in</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">www.nixcraft.in</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">images.nixcraft.in</span><span style="color:#24292E;">)$ ) {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">444</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">http{</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_tokens off;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # tricks</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_tokens off;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #Server头伪装</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_tag &#39;Apache&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_info off;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_hide_header &quot;X-Powered-By&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_hide_header &quot;Server&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span style="color:#24292e;">http{</span></span>
<span class="line"><span style="color:#24292e;">    server_tokens off;</span></span>
<span class="line"><span style="color:#24292e;">    # tricks</span></span>
<span class="line"><span style="color:#24292e;">    server_tokens off;</span></span>
<span class="line"><span style="color:#24292e;">    #Server头伪装</span></span>
<span class="line"><span style="color:#24292e;">    server_tag &#39;Apache&#39;;</span></span>
<span class="line"><span style="color:#24292e;">    server_info off;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_hide_header &quot;X-Powered-By&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_hide_header &quot;Server&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2-更改nginx默认用户" tabindex="-1">2. 更改Nginx默认用户 <a class="header-anchor" href="#_2-更改nginx默认用户" aria-label="Permalink to &quot;2. 更改Nginx默认用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@Debian:~# useradd nginx -s /sbin/nologin -M</span></span>
<span class="line"><span style="color:#e1e4e8;">root@Debian:~# grep &quot;user&quot; /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">user nginx nginx;</span></span>
<span class="line"><span style="color:#e1e4e8;">定义user和工作group 进程使用的凭证。如果group省略，user则使用名称等于的组</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@Debian:~# useradd nginx -s /sbin/nologin -M</span></span>
<span class="line"><span style="color:#24292e;">root@Debian:~# grep &quot;user&quot; /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span style="color:#24292e;">user nginx nginx;</span></span>
<span class="line"><span style="color:#24292e;">定义user和工作group 进程使用的凭证。如果group省略，user则使用名称等于的组</span></span></code></pre></div><h2 id="_3-优化worker进程个数" tabindex="-1">3. 优化worker进程个数 <a class="header-anchor" href="#_3-优化worker进程个数" aria-label="Permalink to &quot;3. 优化worker进程个数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">worker_processes 4 一般为CPU核数 或 CPU核数*2</span></span>
<span class="line"><span style="color:#e1e4e8;">lscpu</span></span>
<span class="line"><span style="color:#e1e4e8;">root@Debian:~# grep &#39;physical id&#39; /proc/cpuinfo|sort -nr|uniq -c|wc -l #查看物理CPU颗数</span></span>
<span class="line"><span style="color:#e1e4e8;">1</span></span>
<span class="line"><span style="color:#e1e4e8;">root@Debian:~# grep &#39;core id&#39; /proc/cpuinfo | sort -u | wc -l #查看单核心数量</span></span>
<span class="line"><span style="color:#e1e4e8;">4</span></span>
<span class="line"><span style="color:#e1e4e8;">root@Debian:~# grep &quot;processor&quot; /etc/cpuinfo|sort -nr|uniq -c|wc -l #逻辑核心数</span></span>
<span class="line"><span style="color:#e1e4e8;">4</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">worker_processes 4 一般为CPU核数 或 CPU核数*2</span></span>
<span class="line"><span style="color:#24292e;">lscpu</span></span>
<span class="line"><span style="color:#24292e;">root@Debian:~# grep &#39;physical id&#39; /proc/cpuinfo|sort -nr|uniq -c|wc -l #查看物理CPU颗数</span></span>
<span class="line"><span style="color:#24292e;">1</span></span>
<span class="line"><span style="color:#24292e;">root@Debian:~# grep &#39;core id&#39; /proc/cpuinfo | sort -u | wc -l #查看单核心数量</span></span>
<span class="line"><span style="color:#24292e;">4</span></span>
<span class="line"><span style="color:#24292e;">root@Debian:~# grep &quot;processor&quot; /etc/cpuinfo|sort -nr|uniq -c|wc -l #逻辑核心数</span></span>
<span class="line"><span style="color:#24292e;">4</span></span></code></pre></div><h2 id="_4-cpu核数绑定" tabindex="-1">4. CPU核数绑定 <a class="header-anchor" href="#_4-cpu核数绑定" aria-label="Permalink to &quot;4. CPU核数绑定&quot;">​</a></h2><h2 id="_5-nginx事件处理模型优化" tabindex="-1">5. Nginx事件处理模型优化 <a class="header-anchor" href="#_5-nginx事件处理模型优化" aria-label="Permalink to &quot;5. Nginx事件处理模型优化&quot;">​</a></h2><h2 id="_6-调整进程最大连接数" tabindex="-1">6. 调整进程最大连接数 <a class="header-anchor" href="#_6-调整进程最大连接数" aria-label="Permalink to &quot;6. 调整进程最大连接数&quot;">​</a></h2><p>并发=worker_process * worker_connections</p><h2 id="_7-worker进程最大打开文件数" tabindex="-1">7. worker进程最大打开文件数 <a class="header-anchor" href="#_7-worker进程最大打开文件数" aria-label="Permalink to &quot;7. worker进程最大打开文件数&quot;">​</a></h2><p>worker_rlimit_nofile 65535; 设置为ulimit -HSn结果</p><h2 id="_8-开启高效文件传输模式" tabindex="-1">8. 开启高效文件传输模式 <a class="header-anchor" href="#_8-开启高效文件传输模式" aria-label="Permalink to &quot;8. 开启高效文件传输模式&quot;">​</a></h2><p>sendfile参数用于开启文件的高效传输模式，同时将tcp_nopush和tcp_nodelay两个指定设为on，可防止网络及磁盘I/O阻塞，提升Nginx工作效 率。3个参数配合使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">sendfile on;</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp_nopush on;</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp_nodelay on;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">sendfile on;</span></span>
<span class="line"><span style="color:#24292e;">tcp_nopush on;</span></span>
<span class="line"><span style="color:#24292e;">tcp_nodelay on;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_9-设置连接超时" tabindex="-1">9. 设置连接超时 <a class="header-anchor" href="#_9-设置连接超时" aria-label="Permalink to &quot;9. 设置连接超时&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive_timeout 60; #设置客户端连接保持会话的超时时间</span></span>
<span class="line"><span style="color:#e1e4e8;">client_header_timeout 15; #读取客户端请求头数据超时时间，超时则返回“Request time out（408）”</span></span>
<span class="line"><span style="color:#e1e4e8;">clietn_body_timeout 15; #读取客户端请求主体超时时间</span></span>
<span class="line"><span style="color:#e1e4e8;">send_timeout 15; #指定客户端响应时间</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">#将无用的连接尽快设置为超时，可以保护服务器的系统资源（CPU、内存、磁盘）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">控制缓冲区溢出攻击</span></span>
<span class="line"><span style="color:#e1e4e8;">## Start: Size Limits &amp; Buffer Overflows ##</span></span>
<span class="line"><span style="color:#e1e4e8;">  client_body_buffer_size  1K;</span></span>
<span class="line"><span style="color:#e1e4e8;">  client_header_buffer_size 1k;</span></span>
<span class="line"><span style="color:#e1e4e8;">  client_max_body_size 1k;</span></span>
<span class="line"><span style="color:#e1e4e8;">  large_client_header_buffers 2 1k;</span></span>
<span class="line"><span style="color:#e1e4e8;"> ## END: Size Limits &amp; Buffer Overflows ##</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> 1、client_body_buffer_size 1k-（默认8k或16k）这个指令可以指定连接请求实体的缓冲区大小。如果连接请求超过缓存区指定的值，那么这些请求实体的整体或部分将尝试写入一个临时文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2、client_header_buffer_size 1k-指令指定客户端请求头部的缓冲区大小。绝大多数情况下一个请求头不会大于1k，不过如果有来自于wap客户端的较大的cookie它可能会大于1k，Nginx将分配给它一个更大的缓冲区，这个值可以在large_client_header_buffers里面设置。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3、client_max_body_size 1k-指令指定允许客户端连接的最大请求实体大小，它出现在请求头部的Content-Length字段。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果请求大于指定的值，客户端将收到一个”Request Entity Too Large” (413)错误。记住，浏览器并不知道怎样显示这个错误。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4、large_client_header_buffers-指定客户端一些比较大的请求头使用的缓冲区数量和大小。请求字段不能大于一个缓冲区大小，如果客户端发送一个比较大的头，nginx将返回”Request URI too large” (414)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">同样，请求的头部最长字段不能大于一个缓冲区，否则服务器将返回”Bad request” (400)。缓冲区只在需求时分开。默认一个缓冲区大小为操作系统中分页文件大小，通常是4k或8k，如果一个连接请求最终将状态转换为keep-alive，它所占用的缓冲区将被释放</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">keepalive_timeout 60; #设置客户端连接保持会话的超时时间</span></span>
<span class="line"><span style="color:#24292e;">client_header_timeout 15; #读取客户端请求头数据超时时间，超时则返回“Request time out（408）”</span></span>
<span class="line"><span style="color:#24292e;">clietn_body_timeout 15; #读取客户端请求主体超时时间</span></span>
<span class="line"><span style="color:#24292e;">send_timeout 15; #指定客户端响应时间</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">#将无用的连接尽快设置为超时，可以保护服务器的系统资源（CPU、内存、磁盘）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">控制缓冲区溢出攻击</span></span>
<span class="line"><span style="color:#24292e;">## Start: Size Limits &amp; Buffer Overflows ##</span></span>
<span class="line"><span style="color:#24292e;">  client_body_buffer_size  1K;</span></span>
<span class="line"><span style="color:#24292e;">  client_header_buffer_size 1k;</span></span>
<span class="line"><span style="color:#24292e;">  client_max_body_size 1k;</span></span>
<span class="line"><span style="color:#24292e;">  large_client_header_buffers 2 1k;</span></span>
<span class="line"><span style="color:#24292e;"> ## END: Size Limits &amp; Buffer Overflows ##</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> 1、client_body_buffer_size 1k-（默认8k或16k）这个指令可以指定连接请求实体的缓冲区大小。如果连接请求超过缓存区指定的值，那么这些请求实体的整体或部分将尝试写入一个临时文件。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2、client_header_buffer_size 1k-指令指定客户端请求头部的缓冲区大小。绝大多数情况下一个请求头不会大于1k，不过如果有来自于wap客户端的较大的cookie它可能会大于1k，Nginx将分配给它一个更大的缓冲区，这个值可以在large_client_header_buffers里面设置。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3、client_max_body_size 1k-指令指定允许客户端连接的最大请求实体大小，它出现在请求头部的Content-Length字段。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果请求大于指定的值，客户端将收到一个”Request Entity Too Large” (413)错误。记住，浏览器并不知道怎样显示这个错误。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4、large_client_header_buffers-指定客户端一些比较大的请求头使用的缓冲区数量和大小。请求字段不能大于一个缓冲区大小，如果客户端发送一个比较大的头，nginx将返回”Request URI too large” (414)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">同样，请求的头部最长字段不能大于一个缓冲区，否则服务器将返回”Bad request” (400)。缓冲区只在需求时分开。默认一个缓冲区大小为操作系统中分页文件大小，通常是4k或8k，如果一个连接请求最终将状态转换为keep-alive，它所占用的缓冲区将被释放</span></span></code></pre></div><h2 id="_10-优化服务器域名的bash表大小" tabindex="-1">10.优化服务器域名的bash表大小 <a class="header-anchor" href="#_10-优化服务器域名的bash表大小" aria-label="Permalink to &quot;10.优化服务器域名的bash表大小&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">设置存放域名（server names）的最大哈希表大小</span></span>
<span class="line"><span style="color:#e1e4e8;">server_names_hash_bucket_size size 512;</span></span>
<span class="line"><span style="color:#e1e4e8;">#默认是512KB 一般要看系统给出确切的值。这里一般是cpu L1的4-5倍</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">设置存放域名（server names）的最大哈希表大小</span></span>
<span class="line"><span style="color:#24292e;">server_names_hash_bucket_size size 512;</span></span>
<span class="line"><span style="color:#24292e;">#默认是512KB 一般要看系统给出确切的值。这里一般是cpu L1的4-5倍</span></span></code></pre></div><h2 id="_11-设置请求-上传大小" tabindex="-1">11. 设置请求 上传大小 <a class="header-anchor" href="#_11-设置请求-上传大小" aria-label="Permalink to &quot;11. 设置请求 上传大小&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client_header_buffer_size 32k; #设置读取客户端请求标头的缓冲区大小</span></span>
<span class="line"><span style="color:#e1e4e8;">large_client_header_buffers 4 32k; #设置读取客户端请求标头的最大值number和size缓冲区</span></span>
<span class="line"><span style="color:#e1e4e8;">client_max_body_size 300m; #设置上传大小（根据业务调整）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client_header_buffer_size 32k; #设置读取客户端请求标头的缓冲区大小</span></span>
<span class="line"><span style="color:#24292e;">large_client_header_buffers 4 32k; #设置读取客户端请求标头的最大值number和size缓冲区</span></span>
<span class="line"><span style="color:#24292e;">client_max_body_size 300m; #设置上传大小（根据业务调整）</span></span></code></pre></div><h2 id="_12-开启gzip压缩" tabindex="-1">12. 开启gzip压缩 <a class="header-anchor" href="#_12-开启gzip压缩" aria-label="Permalink to &quot;12. 开启gzip压缩&quot;">​</a></h2><p>以下字段的写入配置段可以为：http server location</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">gzip            on;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_vary       on;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_min_length 1000;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_buffers    16 10k;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_comp_level 3;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_proxied    any;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_types      text/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_http_version 1.0;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_disable    &quot;msie6&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">gzip            on;</span></span>
<span class="line"><span style="color:#24292e;">gzip_vary       on;</span></span>
<span class="line"><span style="color:#24292e;">gzip_min_length 1000;</span></span>
<span class="line"><span style="color:#24292e;">gzip_buffers    16 10k;</span></span>
<span class="line"><span style="color:#24292e;">gzip_comp_level 3;</span></span>
<span class="line"><span style="color:#24292e;">gzip_proxied    any;</span></span>
<span class="line"><span style="color:#24292e;">gzip_types      text/html;</span></span>
<span class="line"><span style="color:#24292e;">gzip_http_version 1.0;</span></span>
<span class="line"><span style="color:#24292e;">gzip_disable    &quot;msie6&quot;;</span></span></code></pre></div><h3 id="_12-1-gzip-压缩的增强插件" tabindex="-1">12.1 GZip 压缩的增强插件 <a class="header-anchor" href="#_12-1-gzip-压缩的增强插件" aria-label="Permalink to &quot;12.1 GZip 压缩的增强插件&quot;">​</a></h3><ul><li>http_gzip_static_module</li><li>http_gunzip_module</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 配置段: http, server, location</span></span>
<span class="line"><span style="color:#e1e4e8;"># 值: on, off, always</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_static  \${value};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置段: http, server, location</span></span>
<span class="line"><span style="color:#e1e4e8;"># 值: on, off</span></span>
<span class="line"><span style="color:#e1e4e8;">gunzip  \${value};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http_gzip_static_module 发送一个已经压缩好的文件，而 http_gunzip_module 可以解压文件以让 Nginx 发送给不支持压缩的客户端</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 配置段: http, server, location</span></span>
<span class="line"><span style="color:#24292e;"># 值: on, off, always</span></span>
<span class="line"><span style="color:#24292e;">gzip_static  \${value};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 配置段: http, server, location</span></span>
<span class="line"><span style="color:#24292e;"># 值: on, off</span></span>
<span class="line"><span style="color:#24292e;">gunzip  \${value};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http_gzip_static_module 发送一个已经压缩好的文件，而 http_gunzip_module 可以解压文件以让 Nginx 发送给不支持压缩的客户端</span></span></code></pre></div><ul><li>完整配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">gzip on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_vary on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_proxied any;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_disable &quot;msie6&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_min_length  1100;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_buffers     4 32k;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/x-javascript application/xml application/xml+rss image/jpeg image/png font/ttf font/otf image/svg+xml;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gzip_static                 always;</span></span>
<span class="line"><span style="color:#e1e4e8;">    gunzip                      on;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">gzip on;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_vary on;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_proxied any;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_disable &quot;msie6&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_min_length  1100;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_buffers     4 32k;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/x-javascript application/xml application/xml+rss image/jpeg image/png font/ttf font/otf image/svg+xml;</span></span>
<span class="line"><span style="color:#24292e;">    gzip_static                 always;</span></span>
<span class="line"><span style="color:#24292e;">    gunzip                      on;</span></span></code></pre></div><h2 id="_13-nginx-fastcgi相关参数" tabindex="-1">13. Nginx Fastcgi相关参数 <a class="header-anchor" href="#_13-nginx-fastcgi相关参数" aria-label="Permalink to &quot;13. Nginx Fastcgi相关参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_connect_timeout 300; #连接到后端fastcgi的超时时间</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_send_timeout 300; #已经和fastcgi建立连接后多久不传送数据，就会被断开</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_read_timeout 300; #接收fastcgi应答的超时时间</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffer_size 64k; 指定读取FastCGI服务端收到的第一部分响应信息的缓冲区大小</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffers 4 64k; 指定读取从FastCGI服务端收到的响应信息的缓冲区大小以及缓冲区数量</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_busy_buffers_size 128k #繁忙时的buffer，可以是fastcgi_buffer的两倍;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_file_write_size 128k; #fastcgi临时文件的大小，可设置128-256k</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_path /data/ngx_fcgi_tmp; #fastcgi临时文件目录</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_path /data/ngx_fcgi_cache levels=2:2 keys_zone=ngx_fcgi_cache:512m inactive=1d max_s</span></span>
<span class="line"><span style="color:#e1e4e8;">ize=40g; #缓存目录，可以设置目录哈希层级。比如2:2会生成256*256个子目录，keys_zene是这个缓存空间的名字，</span></span>
<span class="line"><span style="color:#e1e4e8;">cache是用多少内存(这样热门的内容nginx直接放入内存，提高访问速度)，inactive表示默认失效时间，max_size表示</span></span>
<span class="line"><span style="color:#e1e4e8;">最多用多少硬盘空间，需要注意的是fastcgi_cache缓存是先卸载fastcgi_temp_path再移到fastcgi_cache_path。</span></span>
<span class="line"><span style="color:#e1e4e8;">所以这两个目录最好在同一个分区</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(php|php5)?$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">root html/www;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_index index.php;</span></span>
<span class="line"><span style="color:#e1e4e8;">include fastcgi.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache ngx_fcgi_cache;#表示开启缓存并为其指定一个名称，可以有效降低cpu的负载，并且防止502的发生，但是也可能会带来其他问题</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_valid 200 302 1h; #将对应的应答码缓存时间</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_valid 301 1d; #将301缓存1天</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_valid any 1m; #将其他应答缓存1分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_min_uses 1; #请求数量</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_use_stale error timeout invalid_header http_500; #错误判断</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_key http://$host$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_connect_timeout 300; #连接到后端fastcgi的超时时间</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_send_timeout 300; #已经和fastcgi建立连接后多久不传送数据，就会被断开</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_read_timeout 300; #接收fastcgi应答的超时时间</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffer_size 64k; 指定读取FastCGI服务端收到的第一部分响应信息的缓冲区大小</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffers 4 64k; 指定读取从FastCGI服务端收到的响应信息的缓冲区大小以及缓冲区数量</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_busy_buffers_size 128k #繁忙时的buffer，可以是fastcgi_buffer的两倍;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_file_write_size 128k; #fastcgi临时文件的大小，可设置128-256k</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_path /data/ngx_fcgi_tmp; #fastcgi临时文件目录</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_path /data/ngx_fcgi_cache levels=2:2 keys_zone=ngx_fcgi_cache:512m inactive=1d max_s</span></span>
<span class="line"><span style="color:#24292e;">ize=40g; #缓存目录，可以设置目录哈希层级。比如2:2会生成256*256个子目录，keys_zene是这个缓存空间的名字，</span></span>
<span class="line"><span style="color:#24292e;">cache是用多少内存(这样热门的内容nginx直接放入内存，提高访问速度)，inactive表示默认失效时间，max_size表示</span></span>
<span class="line"><span style="color:#24292e;">最多用多少硬盘空间，需要注意的是fastcgi_cache缓存是先卸载fastcgi_temp_path再移到fastcgi_cache_path。</span></span>
<span class="line"><span style="color:#24292e;">所以这两个目录最好在同一个分区</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(php|php5)?$ {</span></span>
<span class="line"><span style="color:#24292e;">root html/www;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_index index.php;</span></span>
<span class="line"><span style="color:#24292e;">include fastcgi.conf;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache ngx_fcgi_cache;#表示开启缓存并为其指定一个名称，可以有效降低cpu的负载，并且防止502的发生，但是也可能会带来其他问题</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_valid 200 302 1h; #将对应的应答码缓存时间</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_valid 301 1d; #将301缓存1天</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_valid any 1m; #将其他应答缓存1分钟</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_min_uses 1; #请求数量</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_use_stale error timeout invalid_header http_500; #错误判断</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_key http://$host$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_14-配置nginx-expires缓存功能" tabindex="-1">14. 配置Nginx expires缓存功能 <a class="header-anchor" href="#_14-配置nginx-expires缓存功能" aria-label="Permalink to &quot;14. 配置Nginx expires缓存功能&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$ { #指定缓存文件的类型</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 365d; #指定缓存时间</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(js|css)?$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 3d;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$ { #指定缓存文件的类型</span></span>
<span class="line"><span style="color:#24292e;">expires 365d; #指定缓存时间</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(js|css)?$ {</span></span>
<span class="line"><span style="color:#24292e;">expires 3d;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_15-nginx日志相关优化与安全" tabindex="-1">15.Nginx日志相关优化与安全 <a class="header-anchor" href="#_15-nginx日志相关优化与安全" aria-label="Permalink to &quot;15.Nginx日志相关优化与安全&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">不记录不需要的访问日志</span></span>
<span class="line"><span style="color:#e1e4e8;">对于健康检查或者某些图片、JS、CSS日志，一般不需要记录日志，因为在统计PV时是按照页面计算的，而且写入频繁会消耗IO，降低服务器性能</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(js|jpg|JPG|jpeg|JPEG|css|bmp|gif|GIF)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">不记录不需要的访问日志</span></span>
<span class="line"><span style="color:#24292e;">对于健康检查或者某些图片、JS、CSS日志，一般不需要记录日志，因为在统计PV时是按照页面计算的，而且写入频繁会消耗IO，降低服务器性能</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(js|jpg|JPG|jpeg|JPEG|css|bmp|gif|GIF)$ {</span></span>
<span class="line"><span style="color:#24292e;">access_log off;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_16-nginx站点目录及文件url访问控制" tabindex="-1">16.Nginx站点目录及文件URL访问控制 <a class="header-anchor" href="#_16-nginx站点目录及文件url访问控制" aria-label="Permalink to &quot;16.Nginx站点目录及文件URL访问控制&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1）根据扩展名限制程序或者文件被访问</span></span>
<span class="line"><span style="color:#e1e4e8;">资源文件夹如用户上传的头像，防止恶意上传脚本病毒文件被解析执行</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ ^/images/.*\\.(php|php5|sh|pl|py)$ { #指定目录限制访问</span></span>
<span class="line"><span style="color:#e1e4e8;">deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ ^/static/.*\\.(php|php5|sh|pl|py)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ ^/data/.*\\.(php|php5|sh|pl|py)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ .*\\.(php|php5)?$ { #必须配置在解析之前</span></span>
<span class="line"><span style="color:#e1e4e8;">root html/www;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_index index.php;</span></span>
<span class="line"><span style="color:#e1e4e8;">include fastcgi.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2）禁止访问目录并返回指定HTTP代码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">location /admin/ { return 404； }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">3）限制网站来源IP</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ ^/admin/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">allow 202.111.12.211;</span></span>
<span class="line"><span style="color:#e1e4e8;">#allow 192.168.1.0/24; #也可以限制IP段</span></span>
<span class="line"><span style="color:#e1e4e8;">deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">企业问题案列：Nginx做方向代理的时候可以限制客户端IP吗？</span></span>
<span class="line"><span style="color:#e1e4e8;">方法一：用if来控制</span></span>
<span class="line"><span style="color:#e1e4e8;">if （ $remotea_addr = 10.0.0.110 ） {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">if （ $remotea_addr = 10.0.0.111 ） {</span></span>
<span class="line"><span style="color:#e1e4e8;">set $allow_access_root &#39;true&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">方法二：利用deny和allow</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">root html/blog;</span></span>
<span class="line"><span style="color:#e1e4e8;">index index.php index.html index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">deny 10.0.0.7;</span></span>
<span class="line"><span style="color:#e1e4e8;">allow all;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1）根据扩展名限制程序或者文件被访问</span></span>
<span class="line"><span style="color:#24292e;">资源文件夹如用户上传的头像，防止恶意上传脚本病毒文件被解析执行</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">location ~ ^/images/.*\\.(php|php5|sh|pl|py)$ { #指定目录限制访问</span></span>
<span class="line"><span style="color:#24292e;">deny all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~ ^/static/.*\\.(php|php5|sh|pl|py)$ {</span></span>
<span class="line"><span style="color:#24292e;">deny all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~ ^/data/.*\\.(php|php5|sh|pl|py)$ {</span></span>
<span class="line"><span style="color:#24292e;">deny all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~ .*\\.(php|php5)?$ { #必须配置在解析之前</span></span>
<span class="line"><span style="color:#24292e;">root html/www;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_index index.php;</span></span>
<span class="line"><span style="color:#24292e;">include fastcgi.conf;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2）禁止访问目录并返回指定HTTP代码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">location /admin/ { return 404； }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">3）限制网站来源IP</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">location ~ ^/admin/ {</span></span>
<span class="line"><span style="color:#24292e;">allow 202.111.12.211;</span></span>
<span class="line"><span style="color:#24292e;">#allow 192.168.1.0/24; #也可以限制IP段</span></span>
<span class="line"><span style="color:#24292e;">deny all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">企业问题案列：Nginx做方向代理的时候可以限制客户端IP吗？</span></span>
<span class="line"><span style="color:#24292e;">方法一：用if来控制</span></span>
<span class="line"><span style="color:#24292e;">if （ $remotea_addr = 10.0.0.110 ） {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">if （ $remotea_addr = 10.0.0.111 ） {</span></span>
<span class="line"><span style="color:#24292e;">set $allow_access_root &#39;true&#39;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">方法二：利用deny和allow</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">root html/blog;</span></span>
<span class="line"><span style="color:#24292e;">index index.php index.html index.html;</span></span>
<span class="line"><span style="color:#24292e;">deny 10.0.0.7;</span></span>
<span class="line"><span style="color:#24292e;">allow all;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_17-防止恶意解析访问企业网站-针对80-443" tabindex="-1">17.防止恶意解析访问企业网站(针对80,443) <a class="header-anchor" href="#_17-防止恶意解析访问企业网站-针对80-443" aria-label="Permalink to &quot;17.防止恶意解析访问企业网站(针对80,443)&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">方法一</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">listen 80 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">server_name _;</span></span>
<span class="line"><span style="color:#e1e4e8;">return 501;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">方法二</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">listen 80 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">server_name _;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*) http://www.sundayle.com$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">方法三</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($host !~ ^www/.sundayle/.com$) {</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*) http://www.sundayle.com$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https 443 端口 Nginx 配置如下</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意：ssl_certificate ssl_certificate_key 这两行配置必须要有，否则 Nginx 会拒绝所有443的连接</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 443 ssl default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name _;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate   cert/2546685_www.678fly.cn.pem;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key  cert/2546685_www.678fly.cn.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #rewrite ^(.*) https://www.678fly.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">方法一</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">listen 80 default_server;</span></span>
<span class="line"><span style="color:#24292e;">server_name _;</span></span>
<span class="line"><span style="color:#24292e;">return 501;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">方法二</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">listen 80 default_server;</span></span>
<span class="line"><span style="color:#24292e;">server_name _;</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*) http://www.sundayle.com$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">方法三</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">if ($host !~ ^www/.sundayle/.com$) {</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*) http://www.sundayle.com$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https 443 端口 Nginx 配置如下</span></span>
<span class="line"><span style="color:#24292e;"># 注意：ssl_certificate ssl_certificate_key 这两行配置必须要有，否则 Nginx 会拒绝所有443的连接</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 443 ssl default_server;</span></span>
<span class="line"><span style="color:#24292e;">    server_name _;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate   cert/2546685_www.678fly.cn.pem;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key  cert/2546685_www.678fly.cn.key;</span></span>
<span class="line"><span style="color:#24292e;">    return 403;</span></span>
<span class="line"><span style="color:#24292e;">    #rewrite ^(.*) https://www.678fly.cn;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_18-nginx图片及目录防盗链" tabindex="-1">18.Nginx图片及目录防盗链 <a class="header-anchor" href="#_18-nginx图片及目录防盗链" aria-label="Permalink to &quot;18.Nginx图片及目录防盗链&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">网站图片被盗链最直接的影响就是网络带宽占用加大了，宽带费用变高了，网络流量忽高忽低</span></span>
<span class="line"><span style="color:#e1e4e8;">利用referer防盗链</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~.* \\.(jpg|gif|png|swf|flv|wma|wmv|asf|mp3|mmf|zip|rar)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">valid_referers none blocked *.xxx.cn xxx.cn;</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($invalid_referer) {s</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^/ http://www.xxx.cn/img/nolink.jpg</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">网站图片被盗链最直接的影响就是网络带宽占用加大了，宽带费用变高了，网络流量忽高忽低</span></span>
<span class="line"><span style="color:#24292e;">利用referer防盗链</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~.* \\.(jpg|gif|png|swf|flv|wma|wmv|asf|mp3|mmf|zip|rar)$ {</span></span>
<span class="line"><span style="color:#24292e;">valid_referers none blocked *.xxx.cn xxx.cn;</span></span>
<span class="line"><span style="color:#24292e;">if ($invalid_referer) {s</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^/ http://www.xxx.cn/img/nolink.jpg</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_19-nginx错误页面的优雅显示" tabindex="-1">19. Nginx错误页面的优雅显示 <a class="header-anchor" href="#_19-nginx错误页面的优雅显示" aria-label="Permalink to &quot;19. Nginx错误页面的优雅显示&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">error_page 403 /403.html; #当出现403错误时，会跳转到403.html页面</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">error_page 403 /403.html; #当出现403错误时，会跳转到403.html页面</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_20-nginx防爬虫优化" tabindex="-1">20. Nginx防爬虫优化 <a class="header-anchor" href="#_20-nginx防爬虫优化" aria-label="Permalink to &quot;20. Nginx防爬虫优化&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">robots.txt机器人协议</span></span>
<span class="line"><span style="color:#e1e4e8;">网络爬虫排除标准，告诉搜索引擎哪些目录可以抓取，哪些禁止抓取</span></span>
<span class="line"><span style="color:#e1e4e8;">禁止下载协议代理</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* LWP::Simple|BBBike|wget) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">防止N多爬虫代理访问网站</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~*</span></span>
<span class="line"><span style="color:#e1e4e8;">“qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot”) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">禁止不同浏览器访问</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($http_user_agent ~* “Firefox|MSIE”)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*) http://blog.etiantian.org/$1 permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">robots.txt机器人协议</span></span>
<span class="line"><span style="color:#24292e;">网络爬虫排除标准，告诉搜索引擎哪些目录可以抓取，哪些禁止抓取</span></span>
<span class="line"><span style="color:#24292e;">禁止下载协议代理</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* LWP::Simple|BBBike|wget) {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">防止N多爬虫代理访问网站</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~*</span></span>
<span class="line"><span style="color:#24292e;">“qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot”) {</span></span>
<span class="line"><span style="color:#24292e;">return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">禁止不同浏览器访问</span></span>
<span class="line"><span style="color:#24292e;">if ($http_user_agent ~* “Firefox|MSIE”)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*) http://blog.etiantian.org/$1 permanent</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_21-限制http请求方法" tabindex="-1">21. 限制HTTP请求方法 <a class="header-anchor" href="#_21-限制http请求方法" aria-label="Permalink to &quot;21. 限制HTTP请求方法&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($request_method !~ ^(GET|HEAD|POST)$ ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 501;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">只允许GET等，允许DELETE、SEARCH等</span></span>
<span class="line"><span style="color:#e1e4e8;">为防止黑客通过上传服务器执行木马，也可以在上传服务器上做限制HTTP的GET</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($request_method ~* ^(GET)$ ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 501;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($request_method !~ ^(GET|HEAD|POST)$ ) {</span></span>
<span class="line"><span style="color:#24292e;">return 501;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">只允许GET等，允许DELETE、SEARCH等</span></span>
<span class="line"><span style="color:#24292e;">为防止黑客通过上传服务器执行木马，也可以在上传服务器上做限制HTTP的GET</span></span>
<span class="line"><span style="color:#24292e;">if ($request_method ~* ^(GET)$ ) {</span></span>
<span class="line"><span style="color:#24292e;">return 501;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_22-防dos攻击" tabindex="-1">22. 防DOS攻击 <a class="header-anchor" href="#_22-防dos攻击" aria-label="Permalink to &quot;22. 防DOS攻击&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">使用limit_conn_zone进行控制，控制单个IP或域名的访问次数，限制连续访问</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">limit_conn_zone</span><span style="color:#E1E4E8;"> $binary_remote_addr </span><span style="color:#9ECBFF;">zone=perip:10m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn_zone</span><span style="color:#E1E4E8;"> $server_remote_addr </span><span style="color:#9ECBFF;">zone=perserver:10m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">perip</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">; </span><span style="color:#B392F0;">允许每一个IP地址最多同时打开有10个连接。</span></span>
<span class="line"><span style="color:#B392F0;">limit_conn</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">perserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">#还可以使用limit_req_zone进行控制，控制单个IP的访问速</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">使用limit_conn_zone进行控制，控制单个IP或域名的访问次数，限制连续访问</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">limit_conn_zone</span><span style="color:#24292E;"> $binary_remote_addr </span><span style="color:#032F62;">zone=perip:10m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn_zone</span><span style="color:#24292E;"> $server_remote_addr </span><span style="color:#032F62;">zone=perserver:10m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">perip</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">; </span><span style="color:#6F42C1;">允许每一个IP地址最多同时打开有10个连接。</span></span>
<span class="line"><span style="color:#6F42C1;">limit_conn</span><span style="color:#24292E;"> </span><span style="color:#032F62;">perserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">#还可以使用limit_req_zone进行控制，控制单个IP的访问速</span></span></code></pre></div><h2 id="_24-nginx程序架构优化" tabindex="-1">24. Nginx程序架构优化 <a class="header-anchor" href="#_24-nginx程序架构优化" aria-label="Permalink to &quot;24. Nginx程序架构优化&quot;">​</a></h2><p>解耦，一堆程序代码按照业务用途分开，然后提供服务，例如：注册登录、上传、下载、浏览列表、商品内容、订单支付等都应该是独立的程序服务， 只不过在客户端看来是一个整体而已，小公司最起码要做到的解耦是 01.网页页面服务 02.图片附件及下载服务 03.上传图片服务</p><h2 id="_25-fastcgi-调优" tabindex="-1">25. fastcgi 调优 <a class="header-anchor" href="#_25-fastcgi-调优" aria-label="Permalink to &quot;25. fastcgi 调优&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">fastcgi_connect_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_send_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_read_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffer_size 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffers 4 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_file_write_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_path /usr/local/nginx1.10/nginx_tmp;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_intercept_errors on;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_path /usr/local/nginx1.10/fastcgi_cache levels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">fastcgi_connect_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_send_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_read_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffer_size 64k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffers 4 64k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_file_write_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_path /usr/local/nginx1.10/nginx_tmp;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_intercept_errors on;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_path /usr/local/nginx1.10/fastcgi_cache levels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g;</span></span></code></pre></div><ul><li><p>fastcgi_connect_time 600：指定连接到后端FastCGI的超时时间</p></li><li><p>fastcgi_send_timeout 600：向fastcgi传送请求的超时时间；</p></li><li><p>fastcgi_read_timeout 600：指定接收FastCGI应答的超时时间。</p></li><li><p>fastcgi_buffer_size 64k ：指定读取fastcgi应答第一部分需要用多大的缓冲区，默认的缓冲区大小为fastcgi_buffers指令中的每块大小，可以将这个值设置更小。</p></li><li><p>fastcgi_buffers 4 64K ：指定本地需要用多少和多大的缓冲区来缓冲fastcgi的应答请求，如果一个php脚本所产生的页面大小为256KB，那么会分配4个64KB的缓冲区来缓存，如果页面大小大于256KB，那么大于256KB的部分会缓存到fastcgi_temp_path指定的路径中，但是这并不是好方法，因为内存中的数据处理速度要快于磁盘。一般这个值应该为站点中php脚本所产生的页面大小的中间值，如果站点大部分脚本所产生的页面大小为256KB，那么可以把这个值设置为“8 32K”、“4 64k”等。（要根据实际中php页面大小来调整）</p></li></ul><p>fastcgi_busy_buffers_size 128K ： 建议设置为fastcgi_buffers的两倍，繁忙时候的buffer。</p><p>fastcgi_temp_path：缓存临时目录</p><p>fastcgi_intercept_errors on：这个指定指定是否传递4XX和5XX错误信息到客户端，或者允许nginx使用error_page处理错误信息。注意：静态文件不存在会返回404页面，但是php页面则返回空白页！</p><p>fastcgi_cache_path /usr/local/nginx1.10/fastcgi_cachelevels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g ：fastcgi_cache缓存目录，可以设置目录层级，比如1:2会生成16*256个子目录，cache_fastcgi是这个缓存空间的名字，cache是用多少内存（这样热门的内容nginx直接放内存，提高访问速度），inactive表示默认失效时间，如果缓存数据在失效时间内没有被访问,将被删除，max_size表示最多用多少硬盘空间。</p><p>fastcgi_cache cache_fastcgi：表示开启fastcgi缓存并为其指定一个名称。开启缓存非常有用，可以有效降低cpu的负载，并且防止502的错误发生。cache_fastcgi为proxy_cache_path指令创建缓存区名称。</p><p>fastcgi_cache_valid 200 302 1h：用来指定应答代码的缓存时间，实际中的值将表示200和302应答缓存一小时，要和fastcgi_cache配合使用。</p><p>fastcgi_cache_valid 301 1d：将301应答缓存1天。</p><p>fastcgi_cache_vaild any 1m :其他应答缓存为1分钟</p><p>fastcgi——cache_min_uses 1：该指令用于设置经过多少次请求的相同的URL将被缓存。</p><p>fastcgi_cache_key http://$host$request_uri：该指令用来设置web缓存的key值，nginx根据key值md5哈希存储，一般根据$host $request_uri 等变量组合成proxy_cache_key。</p><p>fastcgi_pass：指定fastcgi服务器监听的地址与端口，可以是本机或者是其他</p><h2 id="_26-tcp-优化" tabindex="-1">26. TCP 优化 <a class="header-anchor" href="#_26-tcp-优化" aria-label="Permalink to &quot;26. TCP 优化&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    sendfile    on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    tcp_nopush  on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    tcp_nodelay on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    keepalive_timeout 60;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 443 fastopen=3 reuseport;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    sendfile    on;</span></span>
<span class="line"><span style="color:#24292e;">    tcp_nopush  on;</span></span>
<span class="line"><span style="color:#24292e;">    tcp_nodelay on;</span></span>
<span class="line"><span style="color:#24292e;">    keepalive_timeout 60;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 443 fastopen=3 reuseport;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>sendfile 可以提高 Nginx 静态资源管理效率，它是一个系统调用，直接在内核空间完成文件发送，不需要先 read 再 write，没有上下文切换开销。</p><p>tcp_nopush 是 FreeBSD 的一个 socket 选项，对应于 Linux 的 tcp_cork，Nginx 中统一用 tcp_nopush 控制，且只有在启用了 sendfile 后才会生效。启用它后，数据包会累计到一定大小后才会发送，减小额外开销，提高网络效率。</p><p>tcp_nodelay 也是一个 socket 选项，启用后会禁用 Nagle 算法，尽快发送数据。Nginx 只会针对处于 keep-alive 状态的 TCP 连接启用 tcp_nodelay。</p><p>然后你会发现，一个要等数据包累积到一定大小才发送，另一个要尽快发送，这不是矛盾的吗？事实是，这俩是可以叠加的，最终结果是：先填满包，然后尽快发送。</p><p>keepalive_timeout 用于指定服务端每个 TCP 连接的最大保持连接时间。Nginx 默认是 75 秒，而有的浏览器最多只保持 60 秒，所以我设置为 60。</p><p>fastopen=3 用于指定开启 Tcp Fast Open。设置这项的值为 3，表示只允许 3 个未经三次握手的 TCP 连接进行排队。超过这个限制，服务端会退化到采用普通的 TCP 握手流程。这是为了减少资源耗尽攻击：Tcp Fast Open 可以在第一次 SYN 的时候发送 HTTP 请求，而服务端会校验 Fast Open Cookie（FOC），如果通过就开始处理请求。如果不加限制，恶意客户端可以利用合法的 FOC 发送大量请求耗光服务端资源。关于 Tcp Fast Open 的更多信息，可以参看 RFC7413。</p><p>reuseport Nginx 在 1.9.1 版本中加入了 reuseport 功能，表示 Nginx 开始支持 TCP 的 so_reuseport 选项</p><h2 id="_27-内核参数优化" tabindex="-1">27. 内核参数优化 <a class="header-anchor" href="#_27-内核参数优化" aria-label="Permalink to &quot;27. 内核参数优化&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">fs.file-max = 999999：这个参数表示进程（比如一个worker进程）可以同时打开的最大句柄数，这个参数直线限制最大并发连接数，需根据实际情况配置。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_tw_buckets = 6000 ：这个参数表示操作系统允许TIME_WAIT套接字数量的最大值，如果超过这个数字，TIME_WAIT套接字将立刻被清除并打印警告信息。该参数默认为180000，过多的TIME_WAIT套接字会使Web服务器变慢。注：主动关闭连接的服务端会产生TIME_WAIT状态的连接</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 1024 65000 ：允许系统打开的端口范围。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_tw_recycle = 1 ：启用timewait快速回收。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_tw_reuse = 1 ：开启重用。允许将TIME-WAIT sockets重新用于新的TCP连接。这对于服务器来说很有意义，因为服务器上总会有大量TIME-WAIT状态的连接。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_keepalive_time = 30：这个参数表示当keepalive启用时，TCP发送keepalive消息的频度。默认是2小时，若将其设置的小一些，可以更快地清理无效的连接。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_syncookies = 1 ：开启SYN Cookies，当出现SYN等待队列溢出时，启用cookies来处理。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.somaxconn = 40960 ：web 应用中 listen 函数的 backlog 默认会给我们内核参数的。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.somaxconn ：限制到128，而nginx定义的NGX_LISTEN_BACKLOG 默认为511，所以有必要调整这个值。注：对于一个TCP连接，Server与Client需要通过三次握手来建立网络连接.当三次握手成功后,我们可以看到端口的状态由LISTEN转变为ESTABLISHED,接着这条链路上就可以开始传送数据了.每一个处于监听(Listen)状态的端口,都有自己的监听队列.监听队列的长度与如somaxconn参数和使用该端口的程序中listen()函数有关。somaxconn定义了系统中每一个端口最大的监听队列的长度,这是个全局的参数,默认值为128，对于一个经常处理新连接的高负载 web服务环境来说，默认的 128 太小了。大多数环境这个值建议增加到 1024 或者更多。大的侦听队列对防止拒绝服务 DoS ***也会有所帮助。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.netdev_max_backlog = 262144 ：每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_syn_backlog = 262144 ：这个参数标示TCP三次握手建立阶段接受SYN请求队列的最大长度，默认为1024，将其设置得大一些可以使出现Nginx繁忙来不及accept新连接的情况时，Linux不至于丢失客户端发起的连接请求。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_rmem = 10240 87380 12582912 ：这个参数定义了TCP接受缓存（用于TCP接受滑动窗口）的最小值、默认值、最大值</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_wmem = 10240 87380 12582912：这个参数定义了TCP发送缓存（用于TCP发送滑动窗口）的最小值、默认值、最大值。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_default = 6291456：这个参数表示内核套接字接受缓存区默认的大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_default = 6291456：这个参数表示内核套接字发送缓存区默认的大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_max = 12582912：这个参数表示内核套接字接受缓存区的最大大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_max = 12582912：这个参数表示内核套接字发送缓存区的最大大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_syncookies = 1：该参数与性能无关，用于解决TCP的SYN</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">fs.file-max = 999999：这个参数表示进程（比如一个worker进程）可以同时打开的最大句柄数，这个参数直线限制最大并发连接数，需根据实际情况配置。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_tw_buckets = 6000 ：这个参数表示操作系统允许TIME_WAIT套接字数量的最大值，如果超过这个数字，TIME_WAIT套接字将立刻被清除并打印警告信息。该参数默认为180000，过多的TIME_WAIT套接字会使Web服务器变慢。注：主动关闭连接的服务端会产生TIME_WAIT状态的连接</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 1024 65000 ：允许系统打开的端口范围。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_tw_recycle = 1 ：启用timewait快速回收。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_tw_reuse = 1 ：开启重用。允许将TIME-WAIT sockets重新用于新的TCP连接。这对于服务器来说很有意义，因为服务器上总会有大量TIME-WAIT状态的连接。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_keepalive_time = 30：这个参数表示当keepalive启用时，TCP发送keepalive消息的频度。默认是2小时，若将其设置的小一些，可以更快地清理无效的连接。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_syncookies = 1 ：开启SYN Cookies，当出现SYN等待队列溢出时，启用cookies来处理。</span></span>
<span class="line"><span style="color:#24292e;">net.core.somaxconn = 40960 ：web 应用中 listen 函数的 backlog 默认会给我们内核参数的。</span></span>
<span class="line"><span style="color:#24292e;">net.core.somaxconn ：限制到128，而nginx定义的NGX_LISTEN_BACKLOG 默认为511，所以有必要调整这个值。注：对于一个TCP连接，Server与Client需要通过三次握手来建立网络连接.当三次握手成功后,我们可以看到端口的状态由LISTEN转变为ESTABLISHED,接着这条链路上就可以开始传送数据了.每一个处于监听(Listen)状态的端口,都有自己的监听队列.监听队列的长度与如somaxconn参数和使用该端口的程序中listen()函数有关。somaxconn定义了系统中每一个端口最大的监听队列的长度,这是个全局的参数,默认值为128，对于一个经常处理新连接的高负载 web服务环境来说，默认的 128 太小了。大多数环境这个值建议增加到 1024 或者更多。大的侦听队列对防止拒绝服务 DoS ***也会有所帮助。</span></span>
<span class="line"><span style="color:#24292e;">net.core.netdev_max_backlog = 262144 ：每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_syn_backlog = 262144 ：这个参数标示TCP三次握手建立阶段接受SYN请求队列的最大长度，默认为1024，将其设置得大一些可以使出现Nginx繁忙来不及accept新连接的情况时，Linux不至于丢失客户端发起的连接请求。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_rmem = 10240 87380 12582912 ：这个参数定义了TCP接受缓存（用于TCP接受滑动窗口）的最小值、默认值、最大值</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_wmem = 10240 87380 12582912：这个参数定义了TCP发送缓存（用于TCP发送滑动窗口）的最小值、默认值、最大值。</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_default = 6291456：这个参数表示内核套接字接受缓存区默认的大小。</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_default = 6291456：这个参数表示内核套接字发送缓存区默认的大小。</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_max = 12582912：这个参数表示内核套接字接受缓存区的最大大小。</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_max = 12582912：这个参数表示内核套接字发送缓存区的最大大小。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_syncookies = 1：该参数与性能无关，用于解决TCP的SYN</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#vim /etc/systcl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">fs.file-max = 999999</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_forward = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.conf.default.rp_filter = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.conf.default.accept_source_route = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.sysrq = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.core_uses_pid = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.msgmnb = 65536</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.msgmax = 65536</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.shmmax = 68719476736</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.shmall = 4294967296</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_tw_buckets = 6000</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_sack = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_window_scaling = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_rmem = 10240 87380 12582912</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_wmem = 10240 87380 12582912</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_default = 8388608</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_default = 8388608</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_max = 16777216</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_max = 16777216</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.netdev_max_backlog = 262144</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.somaxconn = 40960</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_orphans = 3276800</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_syn_backlog = 262144</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_timestamps = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_synack_retries = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_syn_retries = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_tw_recycle = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_mem = 94500000 915000000 927000000</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_fin_timeout = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_keepalive_time = 30</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 1024 65000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#vim /etc/systcl.conf</span></span>
<span class="line"><span style="color:#24292e;">fs.file-max = 999999</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_forward = 0</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.conf.default.rp_filter = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.conf.default.accept_source_route = 0</span></span>
<span class="line"><span style="color:#24292e;">kernel.sysrq = 0</span></span>
<span class="line"><span style="color:#24292e;">kernel.core_uses_pid = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span style="color:#24292e;">kernel.msgmnb = 65536</span></span>
<span class="line"><span style="color:#24292e;">kernel.msgmax = 65536</span></span>
<span class="line"><span style="color:#24292e;">kernel.shmmax = 68719476736</span></span>
<span class="line"><span style="color:#24292e;">kernel.shmall = 4294967296</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_tw_buckets = 6000</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_sack = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_window_scaling = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_rmem = 10240 87380 12582912</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_wmem = 10240 87380 12582912</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_default = 8388608</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_default = 8388608</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_max = 16777216</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_max = 16777216</span></span>
<span class="line"><span style="color:#24292e;">net.core.netdev_max_backlog = 262144</span></span>
<span class="line"><span style="color:#24292e;">net.core.somaxconn = 40960</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_orphans = 3276800</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_syn_backlog = 262144</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_timestamps = 0</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_synack_retries = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_syn_retries = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_tw_recycle = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_mem = 94500000 915000000 927000000</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_fin_timeout = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_keepalive_time = 30</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 1024 65000</span></span></code></pre></div><h2 id="_28-ssl优化" tabindex="-1">28.ssl优化 <a class="header-anchor" href="#_28-ssl优化" aria-label="Permalink to &quot;28.ssl优化&quot;">​</a></h2><ul><li>在server中加入</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    listen 443 ssl http2 fastopen=3 reuseport;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	# Enable SSL cache to speed up for return visitors</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_session_cache   shared:SSL:20m; # speed up first time. 1m ~= 4000 connections</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_session_timeout 4h;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        # Specify cipher</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_prefer_server_ciphers on;  # prefer a list of ciphers to prevent old and slow ciphers</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_ciphers &#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        # Enable TLS</span></span>
<span class="line"><span style="color:#e1e4e8;">        charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 		ssl_certificate /usr/local/openresty/ssl/new.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">		ssl_certificate_key /usr/local/openresty/ssl/new.key;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	# OCSP</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_stapling on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#e1e4e8;">		ssl_stapling_file /usr/local/openresty/ssl/stapling_ocsp;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_trusted_certificate  /usr/local/openresty/ssl/new.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">		resolver 114.114.114.114 valid=300s;</span></span>
<span class="line"><span style="color:#e1e4e8;">		#resolver 8.8.8.8 valid=300s;</span></span>
<span class="line"><span style="color:#e1e4e8;">		resolver_timeout 2s;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_buffer_size 4k;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header Strict-Transport-Security &quot;max-age=31536000&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    listen 443 ssl http2 fastopen=3 reuseport;</span></span>
<span class="line"><span style="color:#24292e;">    server_name xxx.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	# Enable SSL cache to speed up for return visitors</span></span>
<span class="line"><span style="color:#24292e;">        ssl_session_cache   shared:SSL:20m; # speed up first time. 1m ~= 4000 connections</span></span>
<span class="line"><span style="color:#24292e;">        ssl_session_timeout 4h;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        # Specify cipher</span></span>
<span class="line"><span style="color:#24292e;">        ssl_prefer_server_ciphers on;  # prefer a list of ciphers to prevent old and slow ciphers</span></span>
<span class="line"><span style="color:#24292e;">        ssl_ciphers &#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        # Enable TLS</span></span>
<span class="line"><span style="color:#24292e;">        charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;"> 		ssl_certificate /usr/local/openresty/ssl/new.crt;</span></span>
<span class="line"><span style="color:#24292e;">		ssl_certificate_key /usr/local/openresty/ssl/new.key;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	# OCSP</span></span>
<span class="line"><span style="color:#24292e;">        ssl_stapling on;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#24292e;">		ssl_stapling_file /usr/local/openresty/ssl/stapling_ocsp;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_trusted_certificate  /usr/local/openresty/ssl/new.crt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">		resolver 114.114.114.114 valid=300s;</span></span>
<span class="line"><span style="color:#24292e;">		#resolver 8.8.8.8 valid=300s;</span></span>
<span class="line"><span style="color:#24292e;">		resolver_timeout 2s;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        ssl_buffer_size 4k;</span></span>
<span class="line"><span style="color:#24292e;">        add_header Strict-Transport-Security &quot;max-age=31536000&quot;;</span></span></code></pre></div><ul><li>查看ocsp地址</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl x509 -in new.crt -noout -ocsp_uri</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl x509 -in new.crt -noout -ocsp_uri</span></span></code></pre></div><p><img src="`+l+`" alt="image-20220321105634224"></p><ul><li>stapling_ocsp生成（godday）</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl ocsp -issuer gd_bundle-g2-g1.crt -cert new.crt -no_nonce -text -url http://ocsp.godaddy.com -text -respout stapling_ocsp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl ocsp -issuer gd_bundle-g2-g1.crt -cert new.crt -no_nonce -text -url http://ocsp.godaddy.com -text -respout stapling_ocsp</span></span></code></pre></div><ul><li>验证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo QUIT | openssl s_client -connect han.xxx.io:443 -status 2&gt; /dev/null | grep -A 17 &#39;OCSP response:&#39; | grep -B 17 &#39;Next Update&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">https://myssl.com/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.ssllabs.com/ssltest/index.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo QUIT | openssl s_client -connect han.xxx.io:443 -status 2&gt; /dev/null | grep -A 17 &#39;OCSP response:&#39; | grep -B 17 &#39;Next Update&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">https://myssl.com/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://www.ssllabs.com/ssltest/index.html</span></span></code></pre></div><p><img src="`+p+`" alt="image-20220321105531626"></p><h2 id="_29-header" tabindex="-1">29.header <a class="header-anchor" href="#_29-header" aria-label="Permalink to &quot;29.header&quot;">​</a></h2><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP" target="_blank" rel="noreferrer">https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP</a></li><li><a href="https://www.owasp.org/index.php/OWASP_Secure_Headers_Project#csp" target="_blank" rel="noreferrer">https://www.owasp.org/index.php/OWASP_Secure_Headers_Project#csp</a></li></ul><h3 id="content-security-policy" tabindex="-1">Content-Security-Policy <a class="header-anchor" href="#content-security-policy" aria-label="Permalink to &quot;Content-Security-Policy&quot;">​</a></h3><p>是一种HTTP内容安全策略响应头，允许网站管理员控制页面加载的资源，有助于防止跨站脚本攻击（Cross-site scripting 通常也称作 XSS）。XSS 是一种网站应用程序的安全漏洞攻击，是代码注入的一种。配置 <code>Content-Security-Policy</code> 可有助于防止 XSS ，虽然它无法替代WAF，但是它加固了网站前端安全的第一道防线</p><table><thead><tr><th>Directive</th><th>Description</th></tr></thead><tbody><tr><td>base-uri</td><td>Define the base uri for relative uri.</td></tr><tr><td>default-src</td><td>Define loading policy for all resources type in case of a resource type dedicated directive is not defined (fallback).</td></tr><tr><td>script-src</td><td>Define which scripts the protected resource can execute.</td></tr><tr><td>object-src</td><td>Define from where the protected resource can load plugins.</td></tr><tr><td>style-src</td><td>Define which styles (CSS) the user applies to the protected resource.</td></tr><tr><td>img-src</td><td>Define from where the protected resource can load images.</td></tr><tr><td>media-src</td><td>Define from where the protected resource can load video and audio.</td></tr><tr><td>frame-src</td><td>Deprecated and replaced by child-src. Define from where the protected resource can embed frames.</td></tr><tr><td>child-src</td><td>Define from where the protected resource can embed frames.</td></tr><tr><td>frame-ancestors</td><td>Define from where the protected resource can be embedded in frames.</td></tr><tr><td>font-src</td><td>Define from where the protected resource can load fonts.</td></tr><tr><td>connect-src</td><td>Define which URIs the protected resource can load using script interfaces.</td></tr><tr><td>manifest-src</td><td>Define from where the protected resource can load manifest.</td></tr><tr><td>form-action</td><td>Define which URIs can be used as the action of HTML form elements.</td></tr><tr><td>sandbox</td><td>Specifies an HTML sandbox policy that the user agent applies to the protected resource.</td></tr><tr><td>script-nonce</td><td>Define script execution by requiring the presence of the specified nonce on script elements.</td></tr><tr><td>plugin-types</td><td>Define the set of plugins that can be invoked by the protected resource by limiting the types of resources that can be embedded.</td></tr><tr><td>reflected-xss</td><td>Instructs a user agent to activate or deactivate any heuristics used to filter or block reflected cross-site scripting attacks, equivalent to the effects of the non-standard X-XSS-Protection header.</td></tr><tr><td>block-all-mixed-content</td><td>Prevent user agent from loading mixed content.</td></tr><tr><td>upgrade-insecure-requests</td><td>Instructs user agent to download insecure resources using HTTPS.</td></tr><tr><td>referrer</td><td>Define information user agent must send in Referer header.</td></tr><tr><td>report-uri</td><td>Specifies a URI to which the user agent sends reports about policy violation.</td></tr><tr><td>report-to</td><td>Specifies a group (defined in Report-To header) to which the user agent sends reports about policy violation.</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">add_header Content-Security-Policy &quot;upgrade-insecure-requests;connect-src *&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">add_header Content-Security-Policy &quot;upgrade-insecure-requests;connect-src *&quot;;</span></span></code></pre></div><p>即消除全部警告，同时兼容了各种协议资源</p><h3 id="基础配置" tabindex="-1">基础配置 <a class="header-anchor" href="#基础配置" aria-label="Permalink to &quot;基础配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	#只允许通过 https 加载资源（图片、字体、JavaScript等）</span></span>
<span class="line"><span style="color:#e1e4e8;">	add_header Content-Security-Policy: default-src https:;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	#只允许通过 https 加载资源（图片、字体、JavaScript等）</span></span>
<span class="line"><span style="color:#24292e;">	add_header Content-Security-Policy: default-src https:;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="高级配置" tabindex="-1">高级配置 <a class="header-anchor" href="#高级配置" aria-label="Permalink to &quot;高级配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Content-Security-Policy &quot;connect-src &#39;self&#39; https://pagead2.googlesyndication.com; default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://cdn.jsdelivr.net https://hm.baidu.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://adservice.google.com https://www.googletagservices.com https://tpc.googlesyndication.com https://cpwebassets.codepen.io; img-src &#39;self&#39; data: https://hm.baidu.com https://pagead2.googlesyndication.com; style-src &#39;self&#39; &#39;unsafe-inline&#39; https://cdn.jsdelivr.net https://hm.baidu.com https://pagead2.googlesyndication.com; font-src &#39;self&#39; https://cdn.jsdelivr.net https://fonts.gstatic.com; frame-src https://codepen.io https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; object-src &#39;none&#39;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header  Content-Security-Policy  &quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://a.disquscdn.com; img-src &#39;self&#39; data: https://www.google-analytics.com; style-src &#39;self&#39; &#39;unsafe-inline&#39;; frame-src https://disqus.com&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header Content-Security-Policy &quot;connect-src &#39;self&#39; https://pagead2.googlesyndication.com; default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://cdn.jsdelivr.net https://hm.baidu.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://adservice.google.com https://www.googletagservices.com https://tpc.googlesyndication.com https://cpwebassets.codepen.io; img-src &#39;self&#39; data: https://hm.baidu.com https://pagead2.googlesyndication.com; style-src &#39;self&#39; &#39;unsafe-inline&#39; https://cdn.jsdelivr.net https://hm.baidu.com https://pagead2.googlesyndication.com; font-src &#39;self&#39; https://cdn.jsdelivr.net https://fonts.gstatic.com; frame-src https://codepen.io https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; object-src &#39;none&#39;&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header  Content-Security-Policy  &quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://a.disquscdn.com; img-src &#39;self&#39; data: https://www.google-analytics.com; style-src &#39;self&#39; &#39;unsafe-inline&#39;; frame-src https://disqus.com&quot;;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">add_header Content-Security-Policy &quot;default-src &#39;self&#39; xxx.xxx.com(允许的地址)</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Content-Type-Options &quot;nosniff&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Frame-Options SAMEORIGIN;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Strict-Transport-Security &quot;max-age=63072000; includeSubdomains; preload&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header &#39;Referrer-Policy&#39; &#39;origin&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Download-Options noopen;</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Permitted-Cross-Domain-Policies none;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">add_header Content-Security-Policy &quot;default-src &#39;self&#39; xxx.xxx.com(允许的地址)</span></span>
<span class="line"><span style="color:#24292e;">add_header X-Content-Type-Options &quot;nosniff&quot;;</span></span>
<span class="line"><span style="color:#24292e;">add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span style="color:#24292e;">add_header X-Frame-Options SAMEORIGIN;</span></span>
<span class="line"><span style="color:#24292e;">add_header Strict-Transport-Security &quot;max-age=63072000; includeSubdomains; preload&quot;;</span></span>
<span class="line"><span style="color:#24292e;">add_header &#39;Referrer-Policy&#39; &#39;origin&#39;; </span></span>
<span class="line"><span style="color:#24292e;">add_header X-Download-Options noopen;</span></span>
<span class="line"><span style="color:#24292e;">add_header X-Permitted-Cross-Domain-Policies none;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">script-src：外部脚本 定义针对 JavaScript 的加载策略</span></span>
<span class="line"><span style="color:#e1e4e8;">style-src：样式表  定义针对样式的加载策略</span></span>
<span class="line"><span style="color:#e1e4e8;">img-src：图像   定义针对图片的加载策略</span></span>
<span class="line"><span style="color:#e1e4e8;">media-src：媒体文件（音频和视频）  定义针对多媒体的加载策略</span></span>
<span class="line"><span style="color:#e1e4e8;">font-src：字体文件   定义针对字体的加载策略。</span></span>
<span class="line"><span style="color:#e1e4e8;">object-src：插件（比如 Flash） 定义针对插件的加载策略</span></span>
<span class="line"><span style="color:#e1e4e8;">child-src：框架    定义针对框架的加载策略</span></span>
<span class="line"><span style="color:#e1e4e8;">frame-ancestors：嵌入的外部资源（比如&lt;frame&gt;、&lt;iframe&gt;、&lt;embed&gt;和&lt;applet&gt;）</span></span>
<span class="line"><span style="color:#e1e4e8;">connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）定义针对 Ajax/WebSocket 等请求的加载策略。不允许的情况下，浏览器会模拟一个状态为400的响应</span></span>
<span class="line"><span style="color:#e1e4e8;">worker-src：worker脚本</span></span>
<span class="line"><span style="color:#e1e4e8;">manifest-src：manifest 文件</span></span>
<span class="line"><span style="color:#e1e4e8;">##################################################</span></span>
<span class="line"><span style="color:#e1e4e8;">sandbox : 定义针对 sandbox 的限制</span></span>
<span class="line"><span style="color:#e1e4e8;">report-uri : 告诉浏览器如果请求的资源不被策略允许时，往哪个地址提交日志信息</span></span>
<span class="line"><span style="color:#e1e4e8;">form-action : 定义针对提交的 form 到特定来源的加载策略。</span></span>
<span class="line"><span style="color:#e1e4e8;">referrer : 定义针对 referrer 的加载策略</span></span>
<span class="line"><span style="color:#e1e4e8;">reflected-xss : 定义针对 XSS 过滤器使用策略。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header &quot;Content-Security-Policy&quot; &quot;default-src &#39;self&#39; *.zhixueyun.com &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; script-src &#39;self&#39; *.zhixueyun.com; frame-ancestors &#39;self&#39; *.zhixueyun.com; object-src &#39;none&#39; *.zhixueyun.com&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header &quot;Content-Security-Policy&quot; &quot;default-src  &#39;self&#39; ehr.abc  *.abchina.com  &#39;unsafe-inline&#39;  &#39;unsafe-eval&#39; blob: data: ;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header &quot;Content-Security-Policy&quot; &quot;default-src &#39;self&#39; *.zhixueyun.com &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; script-src &#39;self&#39; *.zhixueyun.com; frame-ancestors &#39;self&#39; *.zhixueyun.com; object-src &#39;none&#39; *.zhixueyun.com&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">script-src：外部脚本 定义针对 JavaScript 的加载策略</span></span>
<span class="line"><span style="color:#24292e;">style-src：样式表  定义针对样式的加载策略</span></span>
<span class="line"><span style="color:#24292e;">img-src：图像   定义针对图片的加载策略</span></span>
<span class="line"><span style="color:#24292e;">media-src：媒体文件（音频和视频）  定义针对多媒体的加载策略</span></span>
<span class="line"><span style="color:#24292e;">font-src：字体文件   定义针对字体的加载策略。</span></span>
<span class="line"><span style="color:#24292e;">object-src：插件（比如 Flash） 定义针对插件的加载策略</span></span>
<span class="line"><span style="color:#24292e;">child-src：框架    定义针对框架的加载策略</span></span>
<span class="line"><span style="color:#24292e;">frame-ancestors：嵌入的外部资源（比如&lt;frame&gt;、&lt;iframe&gt;、&lt;embed&gt;和&lt;applet&gt;）</span></span>
<span class="line"><span style="color:#24292e;">connect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）定义针对 Ajax/WebSocket 等请求的加载策略。不允许的情况下，浏览器会模拟一个状态为400的响应</span></span>
<span class="line"><span style="color:#24292e;">worker-src：worker脚本</span></span>
<span class="line"><span style="color:#24292e;">manifest-src：manifest 文件</span></span>
<span class="line"><span style="color:#24292e;">##################################################</span></span>
<span class="line"><span style="color:#24292e;">sandbox : 定义针对 sandbox 的限制</span></span>
<span class="line"><span style="color:#24292e;">report-uri : 告诉浏览器如果请求的资源不被策略允许时，往哪个地址提交日志信息</span></span>
<span class="line"><span style="color:#24292e;">form-action : 定义针对提交的 form 到特定来源的加载策略。</span></span>
<span class="line"><span style="color:#24292e;">referrer : 定义针对 referrer 的加载策略</span></span>
<span class="line"><span style="color:#24292e;">reflected-xss : 定义针对 XSS 过滤器使用策略。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header &quot;Content-Security-Policy&quot; &quot;default-src &#39;self&#39; *.zhixueyun.com &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; script-src &#39;self&#39; *.zhixueyun.com; frame-ancestors &#39;self&#39; *.zhixueyun.com; object-src &#39;none&#39; *.zhixueyun.com&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header &quot;Content-Security-Policy&quot; &quot;default-src  &#39;self&#39; ehr.abc  *.abchina.com  &#39;unsafe-inline&#39;  &#39;unsafe-eval&#39; blob: data: ;&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header &quot;Content-Security-Policy&quot; &quot;default-src &#39;self&#39; *.zhixueyun.com &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; script-src &#39;self&#39; *.zhixueyun.com; frame-ancestors &#39;self&#39; *.zhixueyun.com; object-src &#39;none&#39; *.zhixueyun.com&quot;;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">主机名：example.org，https://example.com:443</span></span>
<span class="line"><span style="color:#e1e4e8;">路径名：example.org/resources/js/</span></span>
<span class="line"><span style="color:#e1e4e8;">通配符：*.example.org，*://*.example.com:*（表示任意协议、任意子域名、任意端口）</span></span>
<span class="line"><span style="color:#e1e4e8;">协议名：https:、data:</span></span>
<span class="line"><span style="color:#e1e4e8;">关键字&#39;self&#39;：当前域名，需要加引号</span></span>
<span class="line"><span style="color:#e1e4e8;">关键字&#39;none&#39;：禁止加载任何外部资源，需要加引号</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指令值    说明</span></span>
<span class="line"><span style="color:#e1e4e8;">  *               允许加载任何内容</span></span>
<span class="line"><span style="color:#e1e4e8;">‘none‘            允许加载任何内容</span></span>
<span class="line"><span style="color:#e1e4e8;">‘self‘            允许加载相同源的内容</span></span>
<span class="line"><span style="color:#e1e4e8;">www.a.com         允许加载指定域名的资源</span></span>
<span class="line"><span style="color:#e1e4e8;">*.a.com           允许加载 a.com 任何子域名的资源</span></span>
<span class="line"><span style="color:#e1e4e8;">https://a.com     允许加载 a.com 的 https 资源</span></span>
<span class="line"><span style="color:#e1e4e8;">https:            允许加载 https 资源</span></span>
<span class="line"><span style="color:#e1e4e8;">data:             允许加载 data: 协议，例如：base64编码的图片</span></span>
<span class="line"><span style="color:#e1e4e8;">‘unsafe-inline‘   允许加载 inline 资源，例如style属性、onclick、inline js、inline css等</span></span>
<span class="line"><span style="color:#e1e4e8;">‘unsafe-eval‘     允许加载动态 js 代码，例如 eval()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">主机名：example.org，https://example.com:443</span></span>
<span class="line"><span style="color:#24292e;">路径名：example.org/resources/js/</span></span>
<span class="line"><span style="color:#24292e;">通配符：*.example.org，*://*.example.com:*（表示任意协议、任意子域名、任意端口）</span></span>
<span class="line"><span style="color:#24292e;">协议名：https:、data:</span></span>
<span class="line"><span style="color:#24292e;">关键字&#39;self&#39;：当前域名，需要加引号</span></span>
<span class="line"><span style="color:#24292e;">关键字&#39;none&#39;：禁止加载任何外部资源，需要加引号</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指令值    说明</span></span>
<span class="line"><span style="color:#24292e;">  *               允许加载任何内容</span></span>
<span class="line"><span style="color:#24292e;">‘none‘            允许加载任何内容</span></span>
<span class="line"><span style="color:#24292e;">‘self‘            允许加载相同源的内容</span></span>
<span class="line"><span style="color:#24292e;">www.a.com         允许加载指定域名的资源</span></span>
<span class="line"><span style="color:#24292e;">*.a.com           允许加载 a.com 任何子域名的资源</span></span>
<span class="line"><span style="color:#24292e;">https://a.com     允许加载 a.com 的 https 资源</span></span>
<span class="line"><span style="color:#24292e;">https:            允许加载 https 资源</span></span>
<span class="line"><span style="color:#24292e;">data:             允许加载 data: 协议，例如：base64编码的图片</span></span>
<span class="line"><span style="color:#24292e;">‘unsafe-inline‘   允许加载 inline 资源，例如style属性、onclick、inline js、inline css等</span></span>
<span class="line"><span style="color:#24292e;">‘unsafe-eval‘     允许加载动态 js 代码，例如 eval()</span></span></code></pre></div><h3 id="referrer-policy" tabindex="-1">Referrer-Policy <a class="header-anchor" href="#referrer-policy" aria-label="Permalink to &quot;Referrer-Policy&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">配置参数：no-referrer-when-downgrade：在同等安全等级下（例如https页面请求https地址），发送referer，但当请求方低于发送方（例如https页面请求http地址），不发送refererorigin：仅仅发送origin，即protocal+hostorigin-when-cross-origin：跨域时发送originsame-origin：当双方origin相同时发送strict-origin：当双方origin相同且安全等级相同时发送unfafe-url：任何情况下都显示完整的referernginx配置：add_header &#39;Referrer-Policy&#39; &#39;origin&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">配置参数：no-referrer-when-downgrade：在同等安全等级下（例如https页面请求https地址），发送referer，但当请求方低于发送方（例如https页面请求http地址），不发送refererorigin：仅仅发送origin，即protocal+hostorigin-when-cross-origin：跨域时发送originsame-origin：当双方origin相同时发送strict-origin：当双方origin相同且安全等级相同时发送unfafe-url：任何情况下都显示完整的referernginx配置：add_header &#39;Referrer-Policy&#39; &#39;origin&#39;;</span></span></code></pre></div><h3 id="x-permitted-cross-domain-policies" tabindex="-1">X-Permitted-Cross-Domain-Policies <a class="header-anchor" href="#x-permitted-cross-domain-policies" aria-label="Permalink to &quot;X-Permitted-Cross-Domain-Policies&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">一个针对flash的安全策略，用于指定当不能将&quot;crossdomain.xml&quot;文件（当需要从别的域名中的某个文件中读取 Flash 内容时用于进行必要设置的策略文件）放置在网站根目录等场合时采取的替代策略。配置参数：X-Permitted-Cross-Domain-Policies: master-onlymaster-only 只允许使用主策略文件（/crossdomain.xml）add_header X-Permitted-Cross-Domain-Policies none;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">一个针对flash的安全策略，用于指定当不能将&quot;crossdomain.xml&quot;文件（当需要从别的域名中的某个文件中读取 Flash 内容时用于进行必要设置的策略文件）放置在网站根目录等场合时采取的替代策略。配置参数：X-Permitted-Cross-Domain-Policies: master-onlymaster-only 只允许使用主策略文件（/crossdomain.xml）add_header X-Permitted-Cross-Domain-Policies none;</span></span></code></pre></div><h3 id="x-download-options" tabindex="-1">X-Download-Options <a class="header-anchor" href="#x-download-options" aria-label="Permalink to &quot;X-Download-Options&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">用于控制浏览器下载文件是否支持直接打开，如果支持直接打开，可能会有安全隐患。配置信息：X-Download-Options: noopennoopen 用于指定IE 8以上版本的用户不打开文件而直接保存文件。在下载对话框中不显示“打开”选项。nginx配置：add_header X-Download-Options noopen;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">用于控制浏览器下载文件是否支持直接打开，如果支持直接打开，可能会有安全隐患。配置信息：X-Download-Options: noopennoopen 用于指定IE 8以上版本的用户不打开文件而直接保存文件。在下载对话框中不显示“打开”选项。nginx配置：add_header X-Download-Options noopen;</span></span></code></pre></div><h2 id="_30-time" tabindex="-1">30.time <a class="header-anchor" href="#_30-time" aria-label="Permalink to &quot;30.time&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">复用tcp连接的优点：</span></span>
<span class="line"><span style="color:#e1e4e8;">1.减少握手次数</span></span>
<span class="line"><span style="color:#e1e4e8;">2.减少并发连接数，减少了服务器资源的消耗</span></span>
<span class="line"><span style="color:#e1e4e8;">3.降低TCP拥塞控制的影响</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">分两步使用keepalive：1.对客户端使用 keepalive，2.对上游服务使用 keepalive</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream uuUP {</span></span>
<span class="line"><span style="color:#e1e4e8;">#对上游服务使用keepalive，并缓存32个连接</span></span>
<span class="line"><span style="color:#e1e4e8;">    keepalive 32;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#在一个tcp连接上，最多执行多少个http请求，默认值100</span></span>
<span class="line"><span style="color:#e1e4e8;">    keepalive_requests 100;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#一个http请求完成后，最多经过timeout时间，如果还没有新的请求就关闭连接，默认值60s</span></span>
<span class="line"><span style="color:#e1e4e8;">    keepalive_timeout 45 50; </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#对客户端keepalive-tcp探活，30分钟后无数据会发送探活包，时间间隔使用系统默认的，发送10次探活包</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80 so_keepalive=30m::10;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">复用tcp连接的优点：</span></span>
<span class="line"><span style="color:#24292e;">1.减少握手次数</span></span>
<span class="line"><span style="color:#24292e;">2.减少并发连接数，减少了服务器资源的消耗</span></span>
<span class="line"><span style="color:#24292e;">3.降低TCP拥塞控制的影响</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">分两步使用keepalive：1.对客户端使用 keepalive，2.对上游服务使用 keepalive</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream uuUP {</span></span>
<span class="line"><span style="color:#24292e;">#对上游服务使用keepalive，并缓存32个连接</span></span>
<span class="line"><span style="color:#24292e;">    keepalive 32;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#在一个tcp连接上，最多执行多少个http请求，默认值100</span></span>
<span class="line"><span style="color:#24292e;">    keepalive_requests 100;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#一个http请求完成后，最多经过timeout时间，如果还没有新的请求就关闭连接，默认值60s</span></span>
<span class="line"><span style="color:#24292e;">    keepalive_timeout 45 50; </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#对客户端keepalive-tcp探活，30分钟后无数据会发送探活包，时间间隔使用系统默认的，发送10次探活包</span></span>
<span class="line"><span style="color:#24292e;">    listen 80 so_keepalive=30m::10;</span></span></code></pre></div><h1 id="另一个维度来总结" tabindex="-1">另一个维度来总结 <a class="header-anchor" href="#另一个维度来总结" aria-label="Permalink to &quot;另一个维度来总结&quot;">​</a></h1><h2 id="一、安全方面" tabindex="-1">一、安全方面 <a class="header-anchor" href="#一、安全方面" aria-label="Permalink to &quot;一、安全方面&quot;">​</a></h2><ul><li>1.1. 根据实际情况，隐藏 nginx header 版本号</li><li>1.2. 根据实际情况，更改源码，隐藏 nginx 软件名称</li><li>1.3. 更改 nginx 默认用户及用户组</li><li>1.4. nginx 站点目录及文件 URL 访问控制（防止恶意解析）</li><li>1.5. 防止恶意解析访问企业网站</li><li>1.6. 配置 nginx 图片及目录防盗链</li><li>1.7. 配置 nginx 防爬虫</li><li>1.8. 限制 HTTP 请求方法</li><li>1.9. 防 DOS 攻击</li></ul><h2 id="二、性能方面" tabindex="-1">二、性能方面 <a class="header-anchor" href="#二、性能方面" aria-label="Permalink to &quot;二、性能方面&quot;">​</a></h2><ul><li>2.1. 根据 CPU 逻辑核心数，配置 nginx worker 进程个数</li><li>2.2. 配置 nginx worker 进程的 CPU 亲和力参数</li><li>2.3. 配置 ngixn worker 单个进程允许的客户端最大连接数</li><li>2.4. 配置 nginx worker 进程的最大打开文件数</li><li>2.5. 配置 nginx 事件处理模型为 epoll</li></ul><h2 id="三、http-协议方面" tabindex="-1">三、HTTP 协议方面 <a class="header-anchor" href="#三、http-协议方面" aria-label="Permalink to &quot;三、HTTP 协议方面&quot;">​</a></h2><ul><li>3.1. 开启高效的文件传输模式（sendfile/tcp_nopush/tcp_nodelay）</li><li>3.2. 设置连接超时时间</li><li>3.3. 设置客户端上传文件大小</li><li>3.4. fastcgi 调优</li></ul><h2 id="四、功能方面" tabindex="-1">四、功能方面 <a class="header-anchor" href="#四、功能方面" aria-label="Permalink to &quot;四、功能方面&quot;">​</a></h2><ul><li>4.1. 配置 nginx gzip 压缩功能</li><li>4.2. 配置 nginx expires 缓存功能</li><li>4.3. 配置 nginx 错误页面的优雅显示</li></ul><h2 id="五、日志方面" tabindex="-1">五、日志方面 <a class="header-anchor" href="#五、日志方面" aria-label="Permalink to &quot;五、日志方面&quot;">​</a></h2><p>5.1. 每天进行日志切割、备份/不记录不需要的访问日志/访问日志的权限设置</p><h2 id="六、架构方面" tabindex="-1">六、架构方面 <a class="header-anchor" href="#六、架构方面" aria-label="Permalink to &quot;六、架构方面&quot;">​</a></h2><ul><li>6.1. nginx 程序架构优化(服务解耦)</li><li>6.2. 使用 CDN 为网站内容加速</li></ul>`,127),c=[t];function i(r,y,d,h,u,g){return n(),e("div",null,c)}const m=s(o,[["render",i]]);export{f as __pageData,m as default};
