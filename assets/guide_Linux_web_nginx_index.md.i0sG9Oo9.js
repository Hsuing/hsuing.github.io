import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const p="/assets/4.bEdd-TLF.jpg",l="/assets/5.CAj8CVB5.png",c="/assets/6.V2paLlrM.png",o="/assets/7.P-XrA_5n.png",x=JSON.parse('{"title":"1.介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/index.md","filePath":"guide/Linux/web/nginx/index.md","lastUpdated":1731060191000}'),t={name:"guide/Linux/web/nginx/index.md"},i=a(`<blockquote><p>官方文档</p></blockquote><table><thead><tr><th>文件名</th><th>URL地址</th></tr></thead><tbody><tr><td>下载地址</td><td><a href="http://nginx.org/en/download.html" target="_blank" rel="noreferrer">http://nginx.org/en/download.html</a></td></tr><tr><td>文档地址</td><td><a href="http://nginx.org/en/docs/" target="_blank" rel="noreferrer">http://nginx.org/en/docs/</a></td></tr><tr><td>index</td><td><a href="https://nginx.org/en/docs/dirindex.html" target="_blank" rel="noreferrer">https://nginx.org/en/docs/dirindex.html</a></td></tr><tr><td>博客地址</td><td><a href="https://www.nginx.com/" target="_blank" rel="noreferrer">https://www.nginx.com/</a></td></tr><tr><td>源码地址</td><td><a href="https://trac.nginx.org/nginx/browser" target="_blank" rel="noreferrer">https://trac.nginx.org/nginx/browser</a></td></tr><tr><td>配置文件生成</td><td><a href="https://digitalocean.com/community/tools/nginx" target="_blank" rel="noreferrer">https://digitalocean.com/community/tools/nginx</a></td></tr></tbody></table><h1 id="_1-介绍" tabindex="-1">1.介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1.介绍&quot;">​</a></h1><p>特点，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">高稳定 高性能 资源占用少   功能丰富    模块化结构   支持热部署</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">高稳定 高性能 资源占用少   功能丰富    模块化结构   支持热部署</span></span></code></pre></div><h2 id="_1-1安装" tabindex="-1">1.1安装 <a class="header-anchor" href="#_1-1安装" aria-label="Permalink to &quot;1.1安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#下载地址</span></span>
<span class="line"><span style="color:#e1e4e8;">http://www.pcre.org/</span></span>
<span class="line"><span style="color:#e1e4e8;">http://nginx.org/</span></span>
<span class="line"><span style="color:#e1e4e8;">http://zlib.net/zlib-1.2.11.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#下载地址</span></span>
<span class="line"><span style="color:#24292e;">http://www.pcre.org/</span></span>
<span class="line"><span style="color:#24292e;">http://nginx.org/</span></span>
<span class="line"><span style="color:#24292e;">http://zlib.net/zlib-1.2.11.tar.gz</span></span></code></pre></div><h1 id="_2-nginx-文件结构" tabindex="-1">2.nginx 文件结构 <a class="header-anchor" href="#_2-nginx-文件结构" aria-label="Permalink to &quot;2.nginx 文件结构&quot;">​</a></h1><p><img src="`+p+`" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">...              #全局块</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">events {         #events块</span></span>
<span class="line"><span style="color:#e1e4e8;">   ...</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http      #http块</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...   #http全局块</span></span>
<span class="line"><span style="color:#e1e4e8;">    server        #server块</span></span>
<span class="line"><span style="color:#e1e4e8;">    { </span></span>
<span class="line"><span style="color:#e1e4e8;">        ...       #server全局块</span></span>
<span class="line"><span style="color:#e1e4e8;">        location [PATTERN]   #location块</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">            ...</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        location [PATTERN] </span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">            ...</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    server</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      ...</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...     #http全局块</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">...              #全局块</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">events {         #events块</span></span>
<span class="line"><span style="color:#24292e;">   ...</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http      #http块</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    ...   #http全局块</span></span>
<span class="line"><span style="color:#24292e;">    server        #server块</span></span>
<span class="line"><span style="color:#24292e;">    { </span></span>
<span class="line"><span style="color:#24292e;">        ...       #server全局块</span></span>
<span class="line"><span style="color:#24292e;">        location [PATTERN]   #location块</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">            ...</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        location [PATTERN] </span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">            ...</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    server</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      ...</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    ...     #http全局块</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>注解：</p><ul><li>1、<strong>全局块</strong>：配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。</li><li>2、<strong>events块</strong>：配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。</li><li>3、<strong>http块</strong>：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。</li><li>4、<strong>server块</strong>：配置虚拟主机的相关参数，一个http中可以有多个server。</li><li>5、<strong>location块</strong>：配置请求的路由，以及各种页面的处理情况</li></ul><h1 id="_3-代理" tabindex="-1">3.代理 <a class="header-anchor" href="#_3-代理" aria-label="Permalink to &quot;3.代理&quot;">​</a></h1><h2 id="正向代理" tabindex="-1">正向代理 <a class="header-anchor" href="#正向代理" aria-label="Permalink to &quot;正向代理&quot;">​</a></h2><p>需要在客户端配置代理服务器进行指定网站访问</p><p><img src="`+l+'" alt=""></p><h2 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h2><p>暴露的是代理服务器地址，隐藏了真实服务器 IP</p><p><img src="'+c+'" alt=""></p><h1 id="_4-负载均衡" tabindex="-1">4.负载均衡 <a class="header-anchor" href="#_4-负载均衡" aria-label="Permalink to &quot;4.负载均衡&quot;">​</a></h1><p>增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器上的 情况改为将请求分发到多个服务器上，将负载分发到不同的服务器，也就是我们所说的负载均衡</p><p><img src="'+o+`" alt=""></p><h1 id="_5-缓存" tabindex="-1">5.缓存 <a class="header-anchor" href="#_5-缓存" aria-label="Permalink to &quot;5.缓存&quot;">​</a></h1><h1 id="_6-模块" tabindex="-1">6.模块 <a class="header-anchor" href="#_6-模块" aria-label="Permalink to &quot;6.模块&quot;">​</a></h1><h1 id="一、nginx优化" tabindex="-1">一、nginx优化 <a class="header-anchor" href="#一、nginx优化" aria-label="Permalink to &quot;一、nginx优化&quot;">​</a></h1><ol><li>worker_processes</li><li>worker_connections</li><li>Buffers</li><li>Timeouts</li><li>Gzip Compression</li><li>Static File Caching</li><li>logging</li></ol><h2 id="worker-processes" tabindex="-1">worker_processes <a class="header-anchor" href="#worker-processes" aria-label="Permalink to &quot;worker_processes&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">grep ^processor /proc/cpuinfo | wc -l</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx运行CPU亲和力</span></span>
<span class="line"><span style="color:#e1e4e8;">比如4核配置</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_processes  4;</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_cpu_affinity 0001 0010 0100 1000</span></span>
<span class="line"><span style="color:#e1e4e8;">比如8核配置</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_processes 8;</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_cpu_affinity 00000001 00000010 00000100 0000100000010000 00100000 01000000 10000000;</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_processes最多开启8个，8个以上性能提升不会再提升了，而且稳定性变得更低，所以8个进程够用了。</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx最多可以打开文件数</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_rlimit_nofile 65535;</span></span>
<span class="line"><span style="color:#e1e4e8;">这个指令是指当一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n的值保持一致。</span></span>
<span class="line"><span style="color:#e1e4e8;">注：</span></span>
<span class="line"><span style="color:#e1e4e8;">文件资源限制的配置可以在/etc/security/limits.conf设置，针对root/user等各个用户或者*代表所有用户来设置。</span></span>
<span class="line"><span style="color:#e1e4e8;">soft   nofile   65535</span></span>
<span class="line"><span style="color:#e1e4e8;">hard  nofile   65535</span></span>
<span class="line"><span style="color:#e1e4e8;">用户重新登录生效（ulimit -n）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">grep ^processor /proc/cpuinfo | wc -l</span></span>
<span class="line"><span style="color:#24292e;">Nginx运行CPU亲和力</span></span>
<span class="line"><span style="color:#24292e;">比如4核配置</span></span>
<span class="line"><span style="color:#24292e;">worker_processes  4;</span></span>
<span class="line"><span style="color:#24292e;">worker_cpu_affinity 0001 0010 0100 1000</span></span>
<span class="line"><span style="color:#24292e;">比如8核配置</span></span>
<span class="line"><span style="color:#24292e;">worker_processes 8;</span></span>
<span class="line"><span style="color:#24292e;">worker_cpu_affinity 00000001 00000010 00000100 0000100000010000 00100000 01000000 10000000;</span></span>
<span class="line"><span style="color:#24292e;">worker_processes最多开启8个，8个以上性能提升不会再提升了，而且稳定性变得更低，所以8个进程够用了。</span></span>
<span class="line"><span style="color:#24292e;">Nginx最多可以打开文件数</span></span>
<span class="line"><span style="color:#24292e;">worker_rlimit_nofile 65535;</span></span>
<span class="line"><span style="color:#24292e;">这个指令是指当一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n的值保持一致。</span></span>
<span class="line"><span style="color:#24292e;">注：</span></span>
<span class="line"><span style="color:#24292e;">文件资源限制的配置可以在/etc/security/limits.conf设置，针对root/user等各个用户或者*代表所有用户来设置。</span></span>
<span class="line"><span style="color:#24292e;">soft   nofile   65535</span></span>
<span class="line"><span style="color:#24292e;">hard  nofile   65535</span></span>
<span class="line"><span style="color:#24292e;">用户重新登录生效（ulimit -n）</span></span></code></pre></div><h2 id="nginx事件处理模型" tabindex="-1">Nginx事件处理模型 <a class="header-anchor" href="#nginx事件处理模型" aria-label="Permalink to &quot;Nginx事件处理模型&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">events {</span></span>
<span class="line"><span style="color:#e1e4e8;">use epoll;</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_connections 65535;</span></span>
<span class="line"><span style="color:#e1e4e8;">multi_accept on;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx采用epoll事件模型，处理效率高</span></span>
<span class="line"><span style="color:#e1e4e8;">work_connections是单个worker进程允许客户端最大连接数，这个数值一般根据服务器性能和内存来制定，实际最大值就是worker进程数乘以work_connections</span></span>
<span class="line"><span style="color:#e1e4e8;">实际我们填入一个65535，足够了，这些都算并发值，一个网站的并发达到这么大的数量，也算一个大站了！</span></span>
<span class="line"><span style="color:#e1e4e8;">multi_accept 告诉nginx收到一个新连接通知后接受尽可能多的连接，默认是on，设置为on后，多个worker按串行方式来处理连接，也就是一个连接只有一个worker被唤醒，其他的处于休眠状态，设置为off后，多个worker按并行方式来处理连接，也就是一个连接会唤醒所有的worker，直到连接分配完毕，没有取得连接的继续休眠。当你的服务器连接数不多时，开启这个参数会让负载有一定的降低，但是当服务器的吞吐量很大时，为了效率，可以关闭这个参数。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">events {</span></span>
<span class="line"><span style="color:#24292e;">use epoll;</span></span>
<span class="line"><span style="color:#24292e;">worker_connections 65535;</span></span>
<span class="line"><span style="color:#24292e;">multi_accept on;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">nginx采用epoll事件模型，处理效率高</span></span>
<span class="line"><span style="color:#24292e;">work_connections是单个worker进程允许客户端最大连接数，这个数值一般根据服务器性能和内存来制定，实际最大值就是worker进程数乘以work_connections</span></span>
<span class="line"><span style="color:#24292e;">实际我们填入一个65535，足够了，这些都算并发值，一个网站的并发达到这么大的数量，也算一个大站了！</span></span>
<span class="line"><span style="color:#24292e;">multi_accept 告诉nginx收到一个新连接通知后接受尽可能多的连接，默认是on，设置为on后，多个worker按串行方式来处理连接，也就是一个连接只有一个worker被唤醒，其他的处于休眠状态，设置为off后，多个worker按并行方式来处理连接，也就是一个连接会唤醒所有的worker，直到连接分配完毕，没有取得连接的继续休眠。当你的服务器连接数不多时，开启这个参数会让负载有一定的降低，但是当服务器的吞吐量很大时，为了效率，可以关闭这个参数。</span></span></code></pre></div><h2 id="开启高效传输模式" tabindex="-1">开启高效传输模式 <a class="header-anchor" href="#开启高效传输模式" aria-label="Permalink to &quot;开启高效传输模式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">include mime.types;</span></span>
<span class="line"><span style="color:#e1e4e8;">default_type application/octet-stream;</span></span>
<span class="line"><span style="color:#e1e4e8;">……</span></span>
<span class="line"><span style="color:#e1e4e8;">sendfile on;</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp_nopush on;</span></span>
<span class="line"><span style="color:#e1e4e8;">……</span></span>
<span class="line"><span style="color:#e1e4e8;">Include mime.types; //媒体类型,include 只是一个在当前文件中包含另一个文件内容的指令</span></span>
<span class="line"><span style="color:#e1e4e8;">default_type application/octet-stream;  //默认媒体类型足够</span></span>
<span class="line"><span style="color:#e1e4e8;">sendfile on；//开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。</span></span>
<span class="line"><span style="color:#e1e4e8;">注意：如果图片显示不正常把这个改成off。</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp_nopush on；必须在sendfile开启模式才有效，防止网路阻塞，积极的减少网络报文段的数量（将响应头和正文的开始部分一起发送，而不一个接一个的发送。）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">include mime.types;</span></span>
<span class="line"><span style="color:#24292e;">default_type application/octet-stream;</span></span>
<span class="line"><span style="color:#24292e;">……</span></span>
<span class="line"><span style="color:#24292e;">sendfile on;</span></span>
<span class="line"><span style="color:#24292e;">tcp_nopush on;</span></span>
<span class="line"><span style="color:#24292e;">……</span></span>
<span class="line"><span style="color:#24292e;">Include mime.types; //媒体类型,include 只是一个在当前文件中包含另一个文件内容的指令</span></span>
<span class="line"><span style="color:#24292e;">default_type application/octet-stream;  //默认媒体类型足够</span></span>
<span class="line"><span style="color:#24292e;">sendfile on；//开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。</span></span>
<span class="line"><span style="color:#24292e;">注意：如果图片显示不正常把这个改成off。</span></span>
<span class="line"><span style="color:#24292e;">tcp_nopush on；必须在sendfile开启模式才有效，防止网路阻塞，积极的减少网络报文段的数量（将响应头和正文的开始部分一起发送，而不一个接一个的发送。）</span></span></code></pre></div><h2 id="连接超时时间" tabindex="-1">连接超时时间 <a class="header-anchor" href="#连接超时时间" aria-label="Permalink to &quot;连接超时时间&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">主要目的是保护服务器资源，CPU，内存，控制连接数，因为建立连接也是需要消耗资源的</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive_timeout 60;</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp_nodelay on;</span></span>
<span class="line"><span style="color:#e1e4e8;">client_header_buffer_size 4k;</span></span>
<span class="line"><span style="color:#e1e4e8;">open_file_cache max=102400 inactive=20s;</span></span>
<span class="line"><span style="color:#e1e4e8;">open_file_cache_valid 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">open_file_cache_min_uses 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">client_header_timeout 15;</span></span>
<span class="line"><span style="color:#e1e4e8;">client_body_timeout 15;</span></span>
<span class="line"><span style="color:#e1e4e8;">reset_timedout_connection on;</span></span>
<span class="line"><span style="color:#e1e4e8;">send_timeout 15;</span></span>
<span class="line"><span style="color:#e1e4e8;">server_tokens off;</span></span>
<span class="line"><span style="color:#e1e4e8;">client_max_body_size 10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalived_timeout客户端连接保持会话超时时间，超过这个时间，服务器断开这个链接</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp_nodelay；也是防止网络阻塞，不过要包涵在keepalived参数才有效</span></span>
<span class="line"><span style="color:#e1e4e8;">client_header_buffer_size 4k;</span></span>
<span class="line"><span style="color:#e1e4e8;">客户端请求头部的缓冲区大小，这个可以根据你的系统分页大小来设置，一般一个请求头的大小不会超过 1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。分页大小可以用命令getconf PAGESIZE取得。</span></span>
<span class="line"><span style="color:#e1e4e8;">open_file_cache max=102400 inactive=20s;</span></span>
<span class="line"><span style="color:#e1e4e8;">这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件</span></span>
<span class="line"><span style="color:#e1e4e8;">数一致，inactive 是指经过多长时间文件没被请求后删除缓存。</span></span>
<span class="line"><span style="color:#e1e4e8;">open_file_cache_valid 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">这个是指多长时间检查一次缓存的有效信息。</span></span>
<span class="line"><span style="color:#e1e4e8;">open_file_cache_min_uses 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">open_file_cache指令中的inactive 参数时间内文件的最少使用次数，如果超过这个数字，文</span></span>
<span class="line"><span style="color:#e1e4e8;">件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive 时间内一次没被使用，它将被移除。</span></span>
<span class="line"><span style="color:#e1e4e8;">client_header_timeout设置请求头的超时时间。我们也可以把这个设置低些，如果超过这个时间没有发送任何数据，nginx将返回request time out的错误</span></span>
<span class="line"><span style="color:#e1e4e8;">client_body_timeout设置请求体的超时时间。我们也可以把这个设置低些，超过这个时间没有发送任何数据，和上面一样的错误提示</span></span>
<span class="line"><span style="color:#e1e4e8;">reset_timeout_connection 告诉nginx关闭不响应的客户端连接。这将会释放那个客户端所占有的内存空间。</span></span>
<span class="line"><span style="color:#e1e4e8;">send_timeout响应客户端超时时间，这个超时时间仅限于两个活动之间的时间，如果超过这个时间，客户端没有任何活动，nginx关闭连接</span></span>
<span class="line"><span style="color:#e1e4e8;">server_tokens  并不会让nginx执行的速度更快，但它可以关闭在错误页面中的nginx版本数字，这样对于安全性是有好处的。</span></span>
<span class="line"><span style="color:#e1e4e8;">client_max_body_size上传文件大小限制</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">主要目的是保护服务器资源，CPU，内存，控制连接数，因为建立连接也是需要消耗资源的</span></span>
<span class="line"><span style="color:#24292e;">keepalive_timeout 60;</span></span>
<span class="line"><span style="color:#24292e;">tcp_nodelay on;</span></span>
<span class="line"><span style="color:#24292e;">client_header_buffer_size 4k;</span></span>
<span class="line"><span style="color:#24292e;">open_file_cache max=102400 inactive=20s;</span></span>
<span class="line"><span style="color:#24292e;">open_file_cache_valid 30s;</span></span>
<span class="line"><span style="color:#24292e;">open_file_cache_min_uses 1;</span></span>
<span class="line"><span style="color:#24292e;">client_header_timeout 15;</span></span>
<span class="line"><span style="color:#24292e;">client_body_timeout 15;</span></span>
<span class="line"><span style="color:#24292e;">reset_timedout_connection on;</span></span>
<span class="line"><span style="color:#24292e;">send_timeout 15;</span></span>
<span class="line"><span style="color:#24292e;">server_tokens off;</span></span>
<span class="line"><span style="color:#24292e;">client_max_body_size 10m;</span></span>
<span class="line"><span style="color:#24292e;">keepalived_timeout客户端连接保持会话超时时间，超过这个时间，服务器断开这个链接</span></span>
<span class="line"><span style="color:#24292e;">tcp_nodelay；也是防止网络阻塞，不过要包涵在keepalived参数才有效</span></span>
<span class="line"><span style="color:#24292e;">client_header_buffer_size 4k;</span></span>
<span class="line"><span style="color:#24292e;">客户端请求头部的缓冲区大小，这个可以根据你的系统分页大小来设置，一般一个请求头的大小不会超过 1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。分页大小可以用命令getconf PAGESIZE取得。</span></span>
<span class="line"><span style="color:#24292e;">open_file_cache max=102400 inactive=20s;</span></span>
<span class="line"><span style="color:#24292e;">这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件</span></span>
<span class="line"><span style="color:#24292e;">数一致，inactive 是指经过多长时间文件没被请求后删除缓存。</span></span>
<span class="line"><span style="color:#24292e;">open_file_cache_valid 30s;</span></span>
<span class="line"><span style="color:#24292e;">这个是指多长时间检查一次缓存的有效信息。</span></span>
<span class="line"><span style="color:#24292e;">open_file_cache_min_uses 1;</span></span>
<span class="line"><span style="color:#24292e;">open_file_cache指令中的inactive 参数时间内文件的最少使用次数，如果超过这个数字，文</span></span>
<span class="line"><span style="color:#24292e;">件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive 时间内一次没被使用，它将被移除。</span></span>
<span class="line"><span style="color:#24292e;">client_header_timeout设置请求头的超时时间。我们也可以把这个设置低些，如果超过这个时间没有发送任何数据，nginx将返回request time out的错误</span></span>
<span class="line"><span style="color:#24292e;">client_body_timeout设置请求体的超时时间。我们也可以把这个设置低些，超过这个时间没有发送任何数据，和上面一样的错误提示</span></span>
<span class="line"><span style="color:#24292e;">reset_timeout_connection 告诉nginx关闭不响应的客户端连接。这将会释放那个客户端所占有的内存空间。</span></span>
<span class="line"><span style="color:#24292e;">send_timeout响应客户端超时时间，这个超时时间仅限于两个活动之间的时间，如果超过这个时间，客户端没有任何活动，nginx关闭连接</span></span>
<span class="line"><span style="color:#24292e;">server_tokens  并不会让nginx执行的速度更快，但它可以关闭在错误页面中的nginx版本数字，这样对于安全性是有好处的。</span></span>
<span class="line"><span style="color:#24292e;">client_max_body_size上传文件大小限制</span></span></code></pre></div><h2 id="fastcgi调优" tabindex="-1">fastcgi调优 <a class="header-anchor" href="#fastcgi调优" aria-label="Permalink to &quot;fastcgi调优&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">fastcgi_connect_timeout    600;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_send_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_read_timeout 600;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffer_size 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffers 4 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_file_write_size 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_path/usr/local/nginx1.10/nginx_tmp;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_intercept_errors on;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_path/usr/local/nginx1.10/fastcgi_cache levels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g;</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_connect_timeout 600; #指定连接到后端FastCGI的超时时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_send_timeout 600; #向FastCGI传送请求的超时时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_read_timeout 600; #指定接收FastCGI应答的超时时间。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffer_size 64k; #指定读取FastCGI应答第一部分需要用多大的缓冲区，默认的缓冲区大小为fastcgi_buffers指令中的每块大小，可以将这个值设置更小。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_buffers 4 64k; #指定本地需要用多少和多大的缓冲区来缓冲FastCGI的应答请求，如果一个php脚本所产生的页面大小为256KB，那么会分配4个64KB的缓冲区来缓存，如果页面大小大于256KB，那么大于256KB的部分会缓存到fastcgi_temp_path指定的路径中，但是这并不是好方法，因为内存中的数据处理速度要快于磁盘。一般这个值应该为站点中php脚本所产生的页面大小的中间值，如果站点大部分脚本所产生的页面大小为256KB，那么可以把这个值设置为“8 32K”、“4 64k”等。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_busy_buffers_size 128k; #建议设置为fastcgi_buffers的两倍，繁忙时候的buffer</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_file_write_size 128k;  #在写入fastcgi_temp_path时将用多大的数据块，默认值是fastcgi_buffers的两倍，该数值设置小时若负载上来时可能报502BadGateway</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_temp_path #缓存临时目录</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_intercept_errors on;#这个指令指定是否传递4xx和5xx错误信息到客户端，或者允许nginx使用error_page处理错误信息。</span></span>
<span class="line"><span style="color:#e1e4e8;">注：静态文件不存在会返回404页面，但是php页面则返回空白页！！</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_path /usr/local/nginx1.10/fastcgi_cachelevels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g;# fastcgi_cache缓存目录，可以设置目录层级，比如1:2会生成16*256个子目录，cache_fastcgi是这个缓存空间的名字，cache是用多少内存（这样热门的内容nginx直接放内存，提高访问速度），inactive表示默认失效时间，如果缓存数据在失效时间内没有被访问,将被删除，max_size表示最多用多少硬盘空间。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache cache_fastcgi;  #表示开启FastCGI缓存并为其指定一个名称。开启缓存非常有用，可以有效降低CPU的负载，并且防止502的错误放生。cache_fastcgi为proxy_cache_path指令创建的缓存区名称</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_valid 200 302 1h; #用来指定应答代码的缓存时间，实例中的值表示将200和302应答缓存一小时，要和fastcgi_cache配合使用</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_valid 301 1d;     #将301应答缓存一天</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_valid any 1m;     #将其他应答缓存为1分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_min_uses 1;       #该指令用于设置经过多少次请求的相同URL将被缓存。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache_key http://$host$request_uri; #该指令用来设置web缓存的Key值,nginx根据Key值md5哈希存储.一般根据$host(域名)、$request_uri(请求的路径)等变量组合成proxy_cache_key 。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_pass #指定FastCGI服务器监听端口与地址，可以是本机或者其它</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">总结：</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx的缓存功能有：proxy_cache / fastcgi_cache</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache的作用是缓存后端服务器的内容，可能是任何内容，包括静态的和动态。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache的作用是缓存fastcgi生成的内容，很多情况是php生成的动态的内容。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_cache缓存减少了nginx与后端通信的次数，节省了传输时间和后端宽带。</span></span>
<span class="line"><span style="color:#e1e4e8;">fastcgi_cache缓存减少了nginx与php的通信的次数，更减轻了php和数据库(mysql)的压力。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">fastcgi_connect_timeout    600;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_send_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_read_timeout 600;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffer_size 64k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffers 4 64k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_busy_buffers_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_file_write_size 128k;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_path/usr/local/nginx1.10/nginx_tmp;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_intercept_errors on;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_path/usr/local/nginx1.10/fastcgi_cache levels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g;</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_connect_timeout 600; #指定连接到后端FastCGI的超时时间。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_send_timeout 600; #向FastCGI传送请求的超时时间。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_read_timeout 600; #指定接收FastCGI应答的超时时间。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffer_size 64k; #指定读取FastCGI应答第一部分需要用多大的缓冲区，默认的缓冲区大小为fastcgi_buffers指令中的每块大小，可以将这个值设置更小。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_buffers 4 64k; #指定本地需要用多少和多大的缓冲区来缓冲FastCGI的应答请求，如果一个php脚本所产生的页面大小为256KB，那么会分配4个64KB的缓冲区来缓存，如果页面大小大于256KB，那么大于256KB的部分会缓存到fastcgi_temp_path指定的路径中，但是这并不是好方法，因为内存中的数据处理速度要快于磁盘。一般这个值应该为站点中php脚本所产生的页面大小的中间值，如果站点大部分脚本所产生的页面大小为256KB，那么可以把这个值设置为“8 32K”、“4 64k”等。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_busy_buffers_size 128k; #建议设置为fastcgi_buffers的两倍，繁忙时候的buffer</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_file_write_size 128k;  #在写入fastcgi_temp_path时将用多大的数据块，默认值是fastcgi_buffers的两倍，该数值设置小时若负载上来时可能报502BadGateway</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_temp_path #缓存临时目录</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_intercept_errors on;#这个指令指定是否传递4xx和5xx错误信息到客户端，或者允许nginx使用error_page处理错误信息。</span></span>
<span class="line"><span style="color:#24292e;">注：静态文件不存在会返回404页面，但是php页面则返回空白页！！</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_path /usr/local/nginx1.10/fastcgi_cachelevels=1:2 keys_zone=cache_fastcgi:128minactive=1d max_size=10g;# fastcgi_cache缓存目录，可以设置目录层级，比如1:2会生成16*256个子目录，cache_fastcgi是这个缓存空间的名字，cache是用多少内存（这样热门的内容nginx直接放内存，提高访问速度），inactive表示默认失效时间，如果缓存数据在失效时间内没有被访问,将被删除，max_size表示最多用多少硬盘空间。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache cache_fastcgi;  #表示开启FastCGI缓存并为其指定一个名称。开启缓存非常有用，可以有效降低CPU的负载，并且防止502的错误放生。cache_fastcgi为proxy_cache_path指令创建的缓存区名称</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_valid 200 302 1h; #用来指定应答代码的缓存时间，实例中的值表示将200和302应答缓存一小时，要和fastcgi_cache配合使用</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_valid 301 1d;     #将301应答缓存一天</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_valid any 1m;     #将其他应答缓存为1分钟</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_min_uses 1;       #该指令用于设置经过多少次请求的相同URL将被缓存。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache_key http://$host$request_uri; #该指令用来设置web缓存的Key值,nginx根据Key值md5哈希存储.一般根据$host(域名)、$request_uri(请求的路径)等变量组合成proxy_cache_key 。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_pass #指定FastCGI服务器监听端口与地址，可以是本机或者其它</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">总结：</span></span>
<span class="line"><span style="color:#24292e;">nginx的缓存功能有：proxy_cache / fastcgi_cache</span></span>
<span class="line"><span style="color:#24292e;">proxy_cache的作用是缓存后端服务器的内容，可能是任何内容，包括静态的和动态。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache的作用是缓存fastcgi生成的内容，很多情况是php生成的动态的内容。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">proxy_cache缓存减少了nginx与后端通信的次数，节省了传输时间和后端宽带。</span></span>
<span class="line"><span style="color:#24292e;">fastcgi_cache缓存减少了nginx与php的通信的次数，更减轻了php和数据库(mysql)的压力。</span></span></code></pre></div><h2 id="gzip调优" tabindex="-1">gzip调优 <a class="header-anchor" href="#gzip调优" aria-label="Permalink to &quot;gzip调优&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">使用gzip压缩功能，可能为我们节约带宽，加快传输速度，有更好的体验，也为我们节约成本，所以说这是一个重点。</span></span>
<span class="line"><span style="color:#e1e4e8;">Nginx启用压缩功能需要你来ngx_http_gzip_module模块，apache使用的是mod_deflate</span></span>
<span class="line"><span style="color:#e1e4e8;">一般我们需要压缩的内容有：文本，js，html，css，对于图片，视频，flash什么的不压缩，同时也要注意，我们使用gzip的功能是需要消耗CPU的！</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip on;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_min_length 2k;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_buffers    4 32k;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_typestext/plain text/css text/javascriptapplication/json application/javascript application/x-javascriptapplication/xml;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_vary on;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip on;    #开启压缩功能</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_min_length 1k; #设置允许压缩的页面最小字节数，页面字节数从header头的Content-Length中获取，默认值是0，不管页面多大都进行压缩，建议设置成大于1K，如果小与1K可能会越压越大。</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_buffers 4 32k; #压缩缓冲区大小，表示申请4个单位为32K的内存作为压缩结果流缓存，默认值是申请与原始数据大小相同的内存空间来存储gzip压缩结果。</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_http_version 1.1; #压缩版本，用于设置识别HTTP协议版本，默认是1.1，目前大部分浏览器已经支持GZIP解压，使用默认即可</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_comp_level 6; #压缩比例，用来指定GZIP压缩比，1压缩比最小，处理速度最快，9压缩比最大，传输速度快，但是处理慢，也比较消耗CPU资源。</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_types text/css text/xml application/javascript; #用来指定压缩的类型，‘text/html’类型总是会被压缩。</span></span>
<span class="line"><span style="color:#e1e4e8;">默认值: gzip_types text/html (默认不对js/css文件进行压缩)</span></span>
<span class="line"><span style="color:#e1e4e8;">压缩类型，匹配MIME��型进行压缩</span></span>
<span class="line"><span style="color:#e1e4e8;">不能用通配符 text/*</span></span>
<span class="line"><span style="color:#e1e4e8;">(无论是否指定)text/html默认已经压缩</span></span>
<span class="line"><span style="color:#e1e4e8;">设置哪压缩种文本文件可参考 conf/mime.types</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_vary on;  #varyheader支持，改选项可以让前端的缓存服务器缓存经过GZIP压缩的页面，例如用Squid缓存经过nginx压缩的数据</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">使用gzip压缩功能，可能为我们节约带宽，加快传输速度，有更好的体验，也为我们节约成本，所以说这是一个重点。</span></span>
<span class="line"><span style="color:#24292e;">Nginx启用压缩功能需要你来ngx_http_gzip_module模块，apache使用的是mod_deflate</span></span>
<span class="line"><span style="color:#24292e;">一般我们需要压缩的内容有：文本，js，html，css，对于图片，视频，flash什么的不压缩，同时也要注意，我们使用gzip的功能是需要消耗CPU的！</span></span>
<span class="line"><span style="color:#24292e;">gzip on;</span></span>
<span class="line"><span style="color:#24292e;">gzip_min_length 2k;</span></span>
<span class="line"><span style="color:#24292e;">gzip_buffers    4 32k;</span></span>
<span class="line"><span style="color:#24292e;">gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#24292e;">gzip_typestext/plain text/css text/javascriptapplication/json application/javascript application/x-javascriptapplication/xml;</span></span>
<span class="line"><span style="color:#24292e;">gzip_vary on;</span></span>
<span class="line"><span style="color:#24292e;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#24292e;">gzip on;    #开启压缩功能</span></span>
<span class="line"><span style="color:#24292e;">gzip_min_length 1k; #设置允许压缩的页面最小字节数，页面字节数从header头的Content-Length中获取，默认值是0，不管页面多大都进行压缩，建议设置成大于1K，如果小与1K可能会越压越大。</span></span>
<span class="line"><span style="color:#24292e;">gzip_buffers 4 32k; #压缩缓冲区大小，表示申请4个单位为32K的内存作为压缩结果流缓存，默认值是申请与原始数据大小相同的内存空间来存储gzip压缩结果。</span></span>
<span class="line"><span style="color:#24292e;">gzip_http_version 1.1; #压缩版本，用于设置识别HTTP协议版本，默认是1.1，目前大部分浏览器已经支持GZIP解压，使用默认即可</span></span>
<span class="line"><span style="color:#24292e;">gzip_comp_level 6; #压缩比例，用来指定GZIP压缩比，1压缩比最小，处理速度最快，9压缩比最大，传输速度快，但是处理慢，也比较消耗CPU资源。</span></span>
<span class="line"><span style="color:#24292e;">gzip_types text/css text/xml application/javascript; #用来指定压缩的类型，‘text/html’类型总是会被压缩。</span></span>
<span class="line"><span style="color:#24292e;">默认值: gzip_types text/html (默认不对js/css文件进行压缩)</span></span>
<span class="line"><span style="color:#24292e;">压缩类型，匹配MIME��型进行压缩</span></span>
<span class="line"><span style="color:#24292e;">不能用通配符 text/*</span></span>
<span class="line"><span style="color:#24292e;">(无论是否指定)text/html默认已经压缩</span></span>
<span class="line"><span style="color:#24292e;">设置哪压缩种文本文件可参考 conf/mime.types</span></span>
<span class="line"><span style="color:#24292e;">gzip_vary on;  #varyheader支持，改选项可以让前端的缓存服务器缓存经过GZIP压缩的页面，例如用Squid缓存经过nginx压缩的数据</span></span></code></pre></div><h2 id="expires缓存调优" tabindex="-1">expires缓存调优 <a class="header-anchor" href="#expires缓存调优" aria-label="Permalink to &quot;expires缓存调优&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">缓存，主要针对于图片，css，js等元素更改机会比较少的情况下使用，特别是图片，占用带宽大，我们完全可以设置图片在浏览器本地缓存365d，css，js，html可以缓存个10来天，这样用户第一次打开加载慢一点，第二次，就非常快了！缓存的时候，我们需要将需要缓存的拓展名列出来， Expires缓存配置在server字段里面</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* .(ico|jpe?g|gif|png|bmp|swf|flv)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 30d;</span></span>
<span class="line"><span style="color:#e1e4e8;">#log_not_found off;</span></span>
<span class="line"><span style="color:#e1e4e8;">access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* .(js|css)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">expires 7d;</span></span>
<span class="line"><span style="color:#e1e4e8;">log_not_found off;</span></span>
<span class="line"><span style="color:#e1e4e8;">access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;">} </span></span>
<span class="line"><span style="color:#e1e4e8;">注：log_not_found off;是否在error_log中记录不存在的错误。默认是。</span></span>
<span class="line"><span style="color:#e1e4e8;">总结：</span></span>
<span class="line"><span style="color:#e1e4e8;">expire功能优点 （1）expires可以降低网站购买的带宽，节约成本（2）同时提升用户访问体验（3）减轻服务的压力，节约服务器成本，是web服务非常重要的功能。 expire功能缺点：被缓存的页面或数据更新了，用户看到的可能还是旧的内容，反而影响用户体验。解决办法：第一个缩短缓存时间，例如：1天，但不彻底，除非更新频率大于1天；第二个对缓存的对象改名。</span></span>
<span class="line"><span style="color:#e1e4e8;">网站不希望被缓存的内容 1）网站流量统计工具2）更新频繁的文件（google的logo）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">缓存，主要针对于图片，css，js等元素更改机会比较少的情况下使用，特别是图片，占用带宽大，我们完全可以设置图片在浏览器本地缓存365d，css，js，html可以缓存个10来天，这样用户第一次打开加载慢一点，第二次，就非常快了！缓存的时候，我们需要将需要缓存的拓展名列出来， Expires缓存配置在server字段里面</span></span>
<span class="line"><span style="color:#24292e;">location ~* .(ico|jpe?g|gif|png|bmp|swf|flv)$ {</span></span>
<span class="line"><span style="color:#24292e;">expires 30d;</span></span>
<span class="line"><span style="color:#24292e;">#log_not_found off;</span></span>
<span class="line"><span style="color:#24292e;">access_log off;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location ~* .(js|css)$ {</span></span>
<span class="line"><span style="color:#24292e;">expires 7d;</span></span>
<span class="line"><span style="color:#24292e;">log_not_found off;</span></span>
<span class="line"><span style="color:#24292e;">access_log off;</span></span>
<span class="line"><span style="color:#24292e;">} </span></span>
<span class="line"><span style="color:#24292e;">注：log_not_found off;是否在error_log中记录不存在的错误。默认是。</span></span>
<span class="line"><span style="color:#24292e;">总结：</span></span>
<span class="line"><span style="color:#24292e;">expire功能优点 （1）expires可以降低网站购买的带宽，节约成本（2）同时提升用户访问体验（3）减轻服务的压力，节约服务器成本，是web服务非常重要的功能。 expire功能缺点：被缓存的页面或数据更新了，用户看到的可能还是旧的内容，反而影响用户体验。解决办法：第一个缩短缓存时间，例如：1天，但不彻底，除非更新频率大于1天；第二个对缓存的对象改名。</span></span>
<span class="line"><span style="color:#24292e;">网站不希望被缓存的内容 1）网站流量统计工具2）更新频繁的文件（google的logo）</span></span></code></pre></div><h2 id="防盗链" tabindex="-1">防盗链 <a class="header-anchor" href="#防盗链" aria-label="Permalink to &quot;防盗链&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">防止别人直接从你网站引用图片等链接，消耗了你的资源和网络流量，那么我们的解决办法由几种：</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1：水印，品牌宣传，你的带宽，服务器足够 </span></span>
<span class="line"><span style="color:#e1e4e8;"> 2：防火墙，直接控制，前提是你知道IP来源 </span></span>
<span class="line"><span style="color:#e1e4e8;"> 3：防盗链策略下面的方法是直接给予404的错误提示</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">location ~*^.+.(jpg|gif|png|swf|flv|wma|wmv|asf|mp3|mmf|zip|rar)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">valid_referers noneblocked  www.benet.com benet.com; if($invalid_referer) {   #return 302  http://www.benet.com/img/nolink.jpg;   return 404;     break; } access_log off;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;">参数可以使如下形式：</span></span>
<span class="line"><span style="color:#e1e4e8;">none 意思是不存在的Referer头(表示空的，也就是直接访问，比如直接在浏览器打开一个图片)</span></span>
<span class="line"><span style="color:#e1e4e8;">blocked 意为根据防火墙伪装Referer头，如：“Referer:XXXXXXX”。</span></span>
<span class="line"><span style="color:#e1e4e8;">server_names 为一个或多个服务器的列表，0.5.33版本以后可以在名称中使用“*”通配符。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">防止别人直接从你网站引用图片等链接，消耗了你的资源和网络流量，那么我们的解决办法由几种：</span></span>
<span class="line"><span style="color:#24292e;"> 1：水印，品牌宣传，你的带宽，服务器足够 </span></span>
<span class="line"><span style="color:#24292e;"> 2：防火墙，直接控制，前提是你知道IP来源 </span></span>
<span class="line"><span style="color:#24292e;"> 3：防盗链策略下面的方法是直接给予404的错误提示</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">location ~*^.+.(jpg|gif|png|swf|flv|wma|wmv|asf|mp3|mmf|zip|rar)$ {</span></span>
<span class="line"><span style="color:#24292e;">valid_referers noneblocked  www.benet.com benet.com; if($invalid_referer) {   #return 302  http://www.benet.com/img/nolink.jpg;   return 404;     break; } access_log off;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;">参数可以使如下形式：</span></span>
<span class="line"><span style="color:#24292e;">none 意思是不存在的Referer头(表示空的，也就是直接访问，比如直接在浏览器打开一个图片)</span></span>
<span class="line"><span style="color:#24292e;">blocked 意为根据防火墙伪装Referer头，如：“Referer:XXXXXXX”。</span></span>
<span class="line"><span style="color:#24292e;">server_names 为一个或多个服务器的列表，0.5.33版本以后可以在名称中使用“*”通配符。</span></span></code></pre></div><h2 id="内核参数优化" tabindex="-1">内核参数优化 <a class="header-anchor" href="#内核参数优化" aria-label="Permalink to &quot;内核参数优化&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">fs.file-max = 999999：这个参数表示进程（比如一个worker进程）可以同时打开的最大句柄数，这个参数直线限制最大并发连接数，需根据实际情况配置。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_tw_buckets = 6000 #这个参数表示操作系统允许TIME_WAIT套接字数量的最大值，如果超过这个数字，TIME_WAIT套接字将立刻被清除并打印警告信息。该参数默认为180000，过多的TIME_WAIT套接字会使Web服务器变慢。</span></span>
<span class="line"><span style="color:#e1e4e8;">注：主动关闭连接的服务端会产生TIME_WAIT状态的连接</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 1024 65000 #允许系统打开的端口范围。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_tw_recycle = 1#启用timewait快速回收。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_tw_reuse = 1#开启重用。允许将TIME-WAIT sockets重新用于新的TCP连接。这对于服务器来说很有意义，因为服务器上总会有大量TIME-WAIT状态的连接。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_keepalive_time = 30：这个参数表示当keepalive启用时，TCP发送keepalive消息的频度。默认是2小时，若将其设置的小一些，可以更快地清理无效的连接。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_syncookies = 1#开启SYN Cookies，当出现SYN等待队列溢出时，启用cookies来处理。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.somaxconn = 40960 #web 应用中 listen 函数的 backlog 默认会给我们内核参数的 net.core.somaxconn 限制到128，而nginx定义的NGX_LISTEN_BACKLOG 默认为511，所以有必要调整这个值。</span></span>
<span class="line"><span style="color:#e1e4e8;">注：对于一个TCP连接，Server与Client需要通过三次握手来建立网络连接.当三次握手成功后,我们可以看到端口的状态由LISTEN转变为ESTABLISHED,接着这条链路上就可以开始传送数据了.每一个处于监听(Listen)状态的端口,都有自己的监听队列.监听队列的长度与如somaxconn参数和使用该端口的程序中listen()函数有关</span></span>
<span class="line"><span style="color:#e1e4e8;">somaxconn参数:定义了系统中每一个端口最大的监听队列的长度,这是个全局的参数,默认值为128，对于一个经常处理新连接的高负载 web服务环境来说，默认的 128 太小了。大多数环境这个值建议增加到 1024 或者更多。大的侦听队列对防止拒绝服务 DoS 攻击也会有所帮助。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.netdev_max_backlog = 262144 #每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_syn_backlog = 262144 #这个参数标示TCP三次握手建立阶段接受SYN请求队列的最大长度，默认为1024，将其设置得大一些可以使出现Nginx繁忙来不及accept新连接的情况时，Linux不至于丢失客户端发起的连接请求。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_rmem = 10240 87380 12582912#这个参数定义了TCP接受缓存（用于TCP接受滑动窗口）的最小值、默认值、最大值。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_wmem = 10240 87380 12582912：这个参数定义了TCP发送缓存（用于TCP发送滑动窗口）的最小值、默认值、最大值。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_default = 6291456：这个参数表示内核套接字接受缓存区默认的大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_default = 6291456：这个参数表示内核套接字发送缓存区默认的大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_max = 12582912：这个参数表示内核套接字接受缓存区的最大大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_max = 12582912：这个参数表示内核套接字发送缓存区的最大大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_syncookies = 1：该参数与性能无关，用于解决TCP的SYN攻击。</span></span>
<span class="line"><span style="color:#e1e4e8;">下面贴一个完整的内核优化设置：</span></span>
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
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 1024 65000</span></span>
<span class="line"><span style="color:#e1e4e8;">执行sysctl  -p使内核修改生效</span></span>
<span class="line"><span style="color:#e1e4e8;">（10）关于系统连接数的优化：</span></span>
<span class="line"><span style="color:#e1e4e8;">linux 默认值 open files为1024</span></span>
<span class="line"><span style="color:#e1e4e8;">ulimit -n</span></span>
<span class="line"><span style="color:#e1e4e8;">1024</span></span>
<span class="line"><span style="color:#e1e4e8;">说明server只允许同时打开1024个文件</span></span>
<span class="line"><span style="color:#e1e4e8;">使用ulimit -a 可以查看当前系统的所有限制值，使用ulimit -n 可以查看当前的最大打开文件数。</span></span>
<span class="line"><span style="color:#e1e4e8;">新装的linux 默认只有1024 ，当作负载较大的服务器时，很容易遇到error: too many open files。因此，需要将其改大</span></span>
<span class="line"><span style="color:#e1e4e8;">在/etc/security/limits.conf最后增加：</span></span>
<span class="line"><span style="color:#e1e4e8;">soft    nofile          65535</span></span>
<span class="line"><span style="color:#e1e4e8;">hard    nofile          65535</span></span>
<span class="line"><span style="color:#e1e4e8;">soft    noproc          65535</span></span>
<span class="line"><span style="color:#e1e4e8;">hard    noproc          65535</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">fs.file-max = 999999：这个参数表示进程（比如一个worker进程）可以同时打开的最大句柄数，这个参数直线限制最大并发连接数，需根据实际情况配置。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_tw_buckets = 6000 #这个参数表示操作系统允许TIME_WAIT套接字数量的最大值，如果超过这个数字，TIME_WAIT套接字将立刻被清除并打印警告信息。该参数默认为180000，过多的TIME_WAIT套接字会使Web服务器变慢。</span></span>
<span class="line"><span style="color:#24292e;">注：主动关闭连接的服务端会产生TIME_WAIT状态的连接</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 1024 65000 #允许系统打开的端口范围。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_tw_recycle = 1#启用timewait快速回收。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_tw_reuse = 1#开启重用。允许将TIME-WAIT sockets重新用于新的TCP连接。这对于服务器来说很有意义，因为服务器上总会有大量TIME-WAIT状态的连接。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_keepalive_time = 30：这个参数表示当keepalive启用时，TCP发送keepalive消息的频度。默认是2小时，若将其设置的小一些，可以更快地清理无效的连接。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_syncookies = 1#开启SYN Cookies，当出现SYN等待队列溢出时，启用cookies来处理。</span></span>
<span class="line"><span style="color:#24292e;">net.core.somaxconn = 40960 #web 应用中 listen 函数的 backlog 默认会给我们内核参数的 net.core.somaxconn 限制到128，而nginx定义的NGX_LISTEN_BACKLOG 默认为511，所以有必要调整这个值。</span></span>
<span class="line"><span style="color:#24292e;">注：对于一个TCP连接，Server与Client需要通过三次握手来建立网络连接.当三次握手成功后,我们可以看到端口的状态由LISTEN转变为ESTABLISHED,接着这条链路上就可以开始传送数据了.每一个处于监听(Listen)状态的端口,都有自己的监听队列.监听队列的长度与如somaxconn参数和使用该端口的程序中listen()函数有关</span></span>
<span class="line"><span style="color:#24292e;">somaxconn参数:定义了系统中每一个端口最大的监听队列的长度,这是个全局的参数,默认值为128，对于一个经常处理新连接的高负载 web服务环境来说，默认的 128 太小了。大多数环境这个值建议增加到 1024 或者更多。大的侦听队列对防止拒绝服务 DoS 攻击也会有所帮助。</span></span>
<span class="line"><span style="color:#24292e;">net.core.netdev_max_backlog = 262144 #每个网络接口接收数据包的速率比内核处理这些包的速率快时，允许送到队列的数据包的最大数目。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_syn_backlog = 262144 #这个参数标示TCP三次握手建立阶段接受SYN请求队列的最大长度，默认为1024，将其设置得大一些可以使出现Nginx繁忙来不及accept新连接的情况时，Linux不至于丢失客户端发起的连接请求。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_rmem = 10240 87380 12582912#这个参数定义了TCP接受缓存（用于TCP接受滑动窗口）的最小值、默认值、最大值。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_wmem = 10240 87380 12582912：这个参数定义了TCP发送缓存（用于TCP发送滑动窗口）的最小值、默认值、最大值。</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_default = 6291456：这个参数表示内核套接字接受缓存区默认的大小。</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_default = 6291456：这个参数表示内核套接字发送缓存区默认的大小。</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_max = 12582912：这个参数表示内核套接字接受缓存区的最大大小。</span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_max = 12582912：这个参数表示内核套接字发送缓存区的最大大小。</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_syncookies = 1：该参数与性能无关，用于解决TCP的SYN攻击。</span></span>
<span class="line"><span style="color:#24292e;">下面贴一个完整的内核优化设置：</span></span>
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
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 1024 65000</span></span>
<span class="line"><span style="color:#24292e;">执行sysctl  -p使内核修改生效</span></span>
<span class="line"><span style="color:#24292e;">（10）关于系统连接数的优化：</span></span>
<span class="line"><span style="color:#24292e;">linux 默认值 open files为1024</span></span>
<span class="line"><span style="color:#24292e;">ulimit -n</span></span>
<span class="line"><span style="color:#24292e;">1024</span></span>
<span class="line"><span style="color:#24292e;">说明server只允许同时打开1024个文件</span></span>
<span class="line"><span style="color:#24292e;">使用ulimit -a 可以查看当前系统的所有限制值，使用ulimit -n 可以查看当前的最大打开文件数。</span></span>
<span class="line"><span style="color:#24292e;">新装的linux 默认只有1024 ，当作负载较大的服务器时，很容易遇到error: too many open files。因此，需要将其改大</span></span>
<span class="line"><span style="color:#24292e;">在/etc/security/limits.conf最后增加：</span></span>
<span class="line"><span style="color:#24292e;">soft    nofile          65535</span></span>
<span class="line"><span style="color:#24292e;">hard    nofile          65535</span></span>
<span class="line"><span style="color:#24292e;">soft    noproc          65535</span></span>
<span class="line"><span style="color:#24292e;">hard    noproc          65535</span></span></code></pre></div><h1 id="二、nginx执行步骤" tabindex="-1">二、nginx执行步骤 <a class="header-anchor" href="#二、nginx执行步骤" aria-label="Permalink to &quot;二、nginx执行步骤&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">nginx在处理每一个用户请求时，都是按照若干个不同的阶段依次处理的</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">post-read</span></span>
<span class="line"><span style="color:#e1e4e8;">读取请求内容阶段，nginx读取并解析完请求头之后就立即开始运行；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server-rewrite</span></span>
<span class="line"><span style="color:#e1e4e8;">server请求地址重写阶段；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">find-config</span></span>
<span class="line"><span style="color:#e1e4e8;">配置查找阶段，用来完成当前请求与location配重块之间的配对工作；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite</span></span>
<span class="line"><span style="color:#e1e4e8;">location请求地址重写阶段，当ngx_rewrite指令用于location中，就是再这个阶段运行的；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">post-rewrite</span></span>
<span class="line"><span style="color:#e1e4e8;">请求地址重写提交阶段，当nginx完成rewrite阶段所要求的内部跳转动作，如果rewrite阶段有这个要求的话；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">preaccess</span></span>
<span class="line"><span style="color:#e1e4e8;">访问权限检查准备阶段，ngx_limit_req和ngx_limit_zone在这个阶段运行，ngx_limit_req可以控制请求的访问频率，ngx_limit_zone可以控制访问的并发度；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">access</span></span>
<span class="line"><span style="color:#e1e4e8;">权限检查阶段，ngx_access在这个阶段运行，配置指令多是执行访问控制相关的任务，如检查用户的访问权限，检查用户的来源IP是否合法；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">post-access</span></span>
<span class="line"><span style="color:#e1e4e8;">访问权限检查提交阶段；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">try-files</span></span>
<span class="line"><span style="color:#e1e4e8;">配置项try_files处理阶段；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">content</span></span>
<span class="line"><span style="color:#e1e4e8;">内容产生阶段，是所有请求处理阶段中最为重要的阶段，因为这个阶段的指令通常是用来生成HTTP响应内容的；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log</span></span>
<span class="line"><span style="color:#e1e4e8;">日志模块处理阶段；</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">nginx在处理每一个用户请求时，都是按照若干个不同的阶段依次处理的</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">post-read</span></span>
<span class="line"><span style="color:#24292e;">读取请求内容阶段，nginx读取并解析完请求头之后就立即开始运行；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server-rewrite</span></span>
<span class="line"><span style="color:#24292e;">server请求地址重写阶段；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">find-config</span></span>
<span class="line"><span style="color:#24292e;">配置查找阶段，用来完成当前请求与location配重块之间的配对工作；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rewrite</span></span>
<span class="line"><span style="color:#24292e;">location请求地址重写阶段，当ngx_rewrite指令用于location中，就是再这个阶段运行的；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">post-rewrite</span></span>
<span class="line"><span style="color:#24292e;">请求地址重写提交阶段，当nginx完成rewrite阶段所要求的内部跳转动作，如果rewrite阶段有这个要求的话；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">preaccess</span></span>
<span class="line"><span style="color:#24292e;">访问权限检查准备阶段，ngx_limit_req和ngx_limit_zone在这个阶段运行，ngx_limit_req可以控制请求的访问频率，ngx_limit_zone可以控制访问的并发度；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">access</span></span>
<span class="line"><span style="color:#24292e;">权限检查阶段，ngx_access在这个阶段运行，配置指令多是执行访问控制相关的任务，如检查用户的访问权限，检查用户的来源IP是否合法；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">post-access</span></span>
<span class="line"><span style="color:#24292e;">访问权限检查提交阶段；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">try-files</span></span>
<span class="line"><span style="color:#24292e;">配置项try_files处理阶段；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">content</span></span>
<span class="line"><span style="color:#24292e;">内容产生阶段，是所有请求处理阶段中最为重要的阶段，因为这个阶段的指令通常是用来生成HTTP响应内容的；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log</span></span>
<span class="line"><span style="color:#24292e;">日志模块处理阶段；</span></span></code></pre></div>`,46),r=[i];function y(_,g,d,h,f,m){return n(),e("div",null,r)}const v=s(t,[["render",y]]);export{x as __pageData,v as default};
