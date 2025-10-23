import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const p="/assets/port.GIndi7se.jpg",l="/assets/tcp.cV9TDBet.jpg",k=JSON.parse('{"title":"二、高并发状态下nginx的配置(20万并发)","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/5-并发.md","filePath":"guide/Linux/web/nginx/5-并发.md","lastUpdated":1701684699000}'),o={name:"guide/Linux/web/nginx/5-并发.md"},t=e(`<h2 id="查看httpd进程数" tabindex="-1">查看httpd进程数 <a class="header-anchor" href="#查看httpd进程数" aria-label="Permalink to &quot;查看httpd进程数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ps -ef | grep httpd | wc -l </span></span>
<span class="line"><span style="color:#e1e4e8;">查看Apache的并发请求数及其TCP连接状态  </span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -n | awk &#39;/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">LAST_ACK 5  </span></span>
<span class="line"><span style="color:#e1e4e8;">SYN_RECV 30  </span></span>
<span class="line"><span style="color:#e1e4e8;">ESTABLISHED 1597  </span></span>
<span class="line"><span style="color:#e1e4e8;">FIN_WAIT1 51  </span></span>
<span class="line"><span style="color:#e1e4e8;">FIN_WAIT2 504  </span></span>
<span class="line"><span style="color:#e1e4e8;">TIME_WAIT 1057 </span></span>
<span class="line"><span style="color:#e1e4e8;">其中的SYN_RECV表示正在等待处理的请求数；</span></span>
<span class="line"><span style="color:#e1e4e8;">ESTABLISHED表示正常数据传输状态；</span></span>
<span class="line"><span style="color:#e1e4e8;">TIME_WAIT表示处理完毕，等待超时结束的请求数。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ps -ef | grep httpd | wc -l </span></span>
<span class="line"><span style="color:#24292e;">查看Apache的并发请求数及其TCP连接状态  </span></span>
<span class="line"><span style="color:#24292e;">netstat -n | awk &#39;/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}&#39; </span></span>
<span class="line"><span style="color:#24292e;">LAST_ACK 5  </span></span>
<span class="line"><span style="color:#24292e;">SYN_RECV 30  </span></span>
<span class="line"><span style="color:#24292e;">ESTABLISHED 1597  </span></span>
<span class="line"><span style="color:#24292e;">FIN_WAIT1 51  </span></span>
<span class="line"><span style="color:#24292e;">FIN_WAIT2 504  </span></span>
<span class="line"><span style="color:#24292e;">TIME_WAIT 1057 </span></span>
<span class="line"><span style="color:#24292e;">其中的SYN_RECV表示正在等待处理的请求数；</span></span>
<span class="line"><span style="color:#24292e;">ESTABLISHED表示正常数据传输状态；</span></span>
<span class="line"><span style="color:#24292e;">TIME_WAIT表示处理完毕，等待超时结束的请求数。</span></span></code></pre></div><h2 id="并发连接数查看" tabindex="-1">并发连接数查看 <a class="header-anchor" href="#并发连接数查看" aria-label="Permalink to &quot;并发连接数查看&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">netstat -n | awk &#39;/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}&#39;  </span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -n|grep  ^tcp|awk &#39;{print $NF}&#39;|sort -nr|uniq -c </span></span>
<span class="line"><span style="color:#e1e4e8;">或者：  </span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -n | awk &#39;/^tcp/ {++state[$NF]} END {for(key in state) print key,&quot;t&quot;,state[key]}&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">返回结果一般如下：  </span></span>
<span class="line"><span style="color:#e1e4e8;">LAST_ACK 5 （正在等待处理的请求数）  </span></span>
<span class="line"><span style="color:#e1e4e8;">SYN_RECV 30  </span></span>
<span class="line"><span style="color:#e1e4e8;">ESTABLISHED 1597 （正常数据传输状态）  </span></span>
<span class="line"><span style="color:#e1e4e8;">FIN_WAIT1 51  </span></span>
<span class="line"><span style="color:#e1e4e8;">FIN_WAIT2 504  </span></span>
<span class="line"><span style="color:#e1e4e8;">TIME_WAIT 1057 （处理完毕，等待超时结束的请求数） </span></span>
<span class="line"><span style="color:#e1e4e8;">其他参数说明：  </span></span>
<span class="line"><span style="color:#e1e4e8;">CLOSED：无连接是活动的或正在进行  </span></span>
<span class="line"><span style="color:#e1e4e8;">LISTEN：服务器在等待进入呼叫  </span></span>
<span class="line"><span style="color:#e1e4e8;">SYN_RECV：一个连接请求已经到达，等待确认  </span></span>
<span class="line"><span style="color:#e1e4e8;">SYN_SENT：应用已经开始，打开一个连接  ESTABLISHED：正常数据传输状态  </span></span>
<span class="line"><span style="color:#e1e4e8;">FIN_WAIT1：应用说它已经完成  </span></span>
<span class="line"><span style="color:#e1e4e8;">FIN_WAIT2：另一边已同意释放  </span></span>
<span class="line"><span style="color:#e1e4e8;">ITMED_WAIT：等待所有分组死掉  </span></span>
<span class="line"><span style="color:#e1e4e8;">CLOSING：两边同时尝试关闭  </span></span>
<span class="line"><span style="color:#e1e4e8;">TIME_WAIT：另一边已初始化一个释放  </span></span>
<span class="line"><span style="color:#e1e4e8;">LAST_ACK：等待所有分组死掉</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">netstat -n | awk &#39;/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}&#39;  </span></span>
<span class="line"><span style="color:#24292e;">netstat -n|grep  ^tcp|awk &#39;{print $NF}&#39;|sort -nr|uniq -c </span></span>
<span class="line"><span style="color:#24292e;">或者：  </span></span>
<span class="line"><span style="color:#24292e;">netstat -n | awk &#39;/^tcp/ {++state[$NF]} END {for(key in state) print key,&quot;t&quot;,state[key]}&#39; </span></span>
<span class="line"><span style="color:#24292e;">返回结果一般如下：  </span></span>
<span class="line"><span style="color:#24292e;">LAST_ACK 5 （正在等待处理的请求数）  </span></span>
<span class="line"><span style="color:#24292e;">SYN_RECV 30  </span></span>
<span class="line"><span style="color:#24292e;">ESTABLISHED 1597 （正常数据传输状态）  </span></span>
<span class="line"><span style="color:#24292e;">FIN_WAIT1 51  </span></span>
<span class="line"><span style="color:#24292e;">FIN_WAIT2 504  </span></span>
<span class="line"><span style="color:#24292e;">TIME_WAIT 1057 （处理完毕，等待超时结束的请求数） </span></span>
<span class="line"><span style="color:#24292e;">其他参数说明：  </span></span>
<span class="line"><span style="color:#24292e;">CLOSED：无连接是活动的或正在进行  </span></span>
<span class="line"><span style="color:#24292e;">LISTEN：服务器在等待进入呼叫  </span></span>
<span class="line"><span style="color:#24292e;">SYN_RECV：一个连接请求已经到达，等待确认  </span></span>
<span class="line"><span style="color:#24292e;">SYN_SENT：应用已经开始，打开一个连接  ESTABLISHED：正常数据传输状态  </span></span>
<span class="line"><span style="color:#24292e;">FIN_WAIT1：应用说它已经完成  </span></span>
<span class="line"><span style="color:#24292e;">FIN_WAIT2：另一边已同意释放  </span></span>
<span class="line"><span style="color:#24292e;">ITMED_WAIT：等待所有分组死掉  </span></span>
<span class="line"><span style="color:#24292e;">CLOSING：两边同时尝试关闭  </span></span>
<span class="line"><span style="color:#24292e;">TIME_WAIT：另一边已初始化一个释放  </span></span>
<span class="line"><span style="color:#24292e;">LAST_ACK：等待所有分组死掉</span></span></code></pre></div><p><a href="https://www.isfirst.net/yunwei/89" target="_blank" rel="noreferrer">https://www.isfirst.net/yunwei/89</a></p><h1 id="二、高并发状态下nginx的配置-20万并发" tabindex="-1">二、高并发状态下nginx的配置(20万并发) <a class="header-anchor" href="#二、高并发状态下nginx的配置-20万并发" aria-label="Permalink to &quot;二、高并发状态下nginx的配置(20万并发)&quot;">​</a></h1><blockquote><p>[!TIP] nginx出现了十六七万将近二十万并发（ESTABLISH连接数）的情况</p></blockquote><h2 id="_2-1-操作系统基础优化" tabindex="-1">2.1 操作系统基础优化 <a class="header-anchor" href="#_2-1-操作系统基础优化" aria-label="Permalink to &quot;2.1 操作系统基础优化&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">关键需要修改地方</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_tw_buckets = 940000</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_tw_recycle=0</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 1024 65000</span></span>
<span class="line"><span style="color:#e1e4e8;">#端口范围尽量大一些</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">关键需要修改地方</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_tw_buckets = 940000</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_tw_recycle=0</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 1024 65000</span></span>
<span class="line"><span style="color:#24292e;">#端口范围尽量大一些</span></span></code></pre></div><h2 id="_2-2-nf-conntrack的配置" tabindex="-1">2.2 nf_conntrack的配置 <a class="header-anchor" href="#_2-2-nf-conntrack的配置" aria-label="Permalink to &quot;2.2 nf_conntrack的配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">如果启用了nf_conntrack，并且配置的数值较小，那么会遇到</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nf_conntrack: table full, dropping packet</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果可能的话，建议关闭nf_conntrack，设置NOTRACK或者调大数值</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nf_conntrack_max = 4194304 </span></span>
<span class="line"><span style="color:#e1e4e8;">nf_conntrack_buckets = 1048576</span></span>
<span class="line"><span style="color:#e1e4e8;">nf_conntrack_tcp_timeout_time_wait = 60</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">如果启用了nf_conntrack，并且配置的数值较小，那么会遇到</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nf_conntrack: table full, dropping packet</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果可能的话，建议关闭nf_conntrack，设置NOTRACK或者调大数值</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nf_conntrack_max = 4194304 </span></span>
<span class="line"><span style="color:#24292e;">nf_conntrack_buckets = 1048576</span></span>
<span class="line"><span style="color:#24292e;">nf_conntrack_tcp_timeout_time_wait = 60</span></span></code></pre></div><h2 id="_2-3-文件打开数配置" tabindex="-1">2.3 文件打开数配置 <a class="header-anchor" href="#_2-3-文件打开数配置" aria-label="Permalink to &quot;2.3 文件打开数配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">如果你的文件打开数是65535，那么应该先遇到的错误是”Too many open files”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">error: 2019/06/15 17:03:51 [crit] 3325#0: accept4() failed (24: Too many open files)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">需要调整操作系统的/etc/security/limits.conf以及附属文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在nginx层面有2个参数也需要调整</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_rlimit_nofile 512000;</span></span>
<span class="line"><span style="color:#e1e4e8;">##@@worker进程的最大打开文件数限制。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">worker_connections 151200;</span></span>
<span class="line"><span style="color:#e1e4e8;">##@@worker进程可以保持的最大并发连接。官方文档明确标出，作为代理使用时，这个值包含&quot;nginx与客户端的连接&quot;和&quot;nginx与upstream的连接&quot;。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">如果你的文件打开数是65535，那么应该先遇到的错误是”Too many open files”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">error: 2019/06/15 17:03:51 [crit] 3325#0: accept4() failed (24: Too many open files)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">需要调整操作系统的/etc/security/limits.conf以及附属文件。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在nginx层面有2个参数也需要调整</span></span>
<span class="line"><span style="color:#24292e;">worker_rlimit_nofile 512000;</span></span>
<span class="line"><span style="color:#24292e;">##@@worker进程的最大打开文件数限制。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">worker_connections 151200;</span></span>
<span class="line"><span style="color:#24292e;">##@@worker进程可以保持的最大并发连接。官方文档明确标出，作为代理使用时，这个值包含&quot;nginx与客户端的连接&quot;和&quot;nginx与upstream的连接&quot;。</span></span></code></pre></div><p>网上有个公式： max_clients = worker_processes * worker_connections / 2; (部分文档是除以4，是考虑浏览器并发数为2) 这个参数解决了，基本上七八万的ESTABLISH是没问题了</p><h2 id="_2-4-端口耗尽的问题" tabindex="-1">2.4 端口耗尽的问题 <a class="header-anchor" href="#_2-4-端口耗尽的问题" aria-label="Permalink to &quot;2.4 端口耗尽的问题&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">如果并发数继续往上增长，可能出现如下错误：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2019/06/16 08:37:35 [crit] 27744#0: *137027418 connect() to 10.140.2.47:443 failed (99: Cannot assign requested address) while connecting to upstream, client: 10.140.2.200, server: 0.0.0.0:9443, upstream: &quot;10.140.2.47:443&quot;, bytes from/to client:0/0, bytes from/to upstream:0/0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">如果并发数继续往上增长，可能出现如下错误：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2019/06/16 08:37:35 [crit] 27744#0: *137027418 connect() to 10.140.2.47:443 failed (99: Cannot assign requested address) while connecting to upstream, client: 10.140.2.200, server: 0.0.0.0:9443, upstream: &quot;10.140.2.47:443&quot;, bytes from/to client:0/0, bytes from/to upstream:0/0</span></span></code></pre></div><blockquote><p>[!WARNING] 这里的端口耗尽，并不是指1-65535端口，而是socket五元组，如下</p></blockquote><p><img src="`+p+`" alt="端口耗尽"></p><ul><li>对于客户端访问nginx的连接来说</li></ul><p>源IP和源端口都是随机的，目的IP（nginx本机IP）和目的端口（nginx本机服务端口）是固定的，这样理论上来说，是没有限制的</p><ul><li>对于nginx访问upstream来说</li></ul><p>源IP固定（nginx本机IP），源端口随机，目的IP和目的端口（upstream地址）需要看upstream的数量，总数就是6万随机端口乘以upstream的个数</p><p>如果upstream的个数很少，那就会出现端口耗尽，例如5个upstream地址，那么总数就是6万*5=30万（实际只有80-90%）大约25万</p><p>使用 “ss -n” 也发现确实是按照五元组使用的，例如下面的13958本机端口就是用了两次，产生了两个socket连接</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ESTAB 0 0 172.28.4.173:13958 172.28.4.161:3000               </span></span>
<span class="line"><span style="color:#e1e4e8;">ESTAB 0 0 172.28.4.173:13958 172.28.4.162:3000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ESTAB 0 0 172.28.4.173:13958 172.28.4.161:3000               </span></span>
<span class="line"><span style="color:#24292e;">ESTAB 0 0 172.28.4.173:13958 172.28.4.162:3000</span></span></code></pre></div><ul><li>那么如何解决端口耗尽的问题</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">一方面可以在upstream机器上增加IP地址或者端口，</span></span>
<span class="line"><span style="color:#e1e4e8;">另一方面也可以在nginx主机上增加IP地址，然后使用nginx的proxy_bind指定源地址</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">一方面可以在upstream机器上增加IP地址或者端口，</span></span>
<span class="line"><span style="color:#24292e;">另一方面也可以在nginx主机上增加IP地址，然后使用nginx的proxy_bind指定源地址</span></span></code></pre></div><h2 id="_2-5-系统内存" tabindex="-1">2.5 系统内存 <a class="header-anchor" href="#_2-5-系统内存" aria-label="Permalink to &quot;2.5 系统内存&quot;">​</a></h2><p>在操作系统层面每个TCP连接会占用3k-10k的内存，以20万来计算，需要2G内存。</p><p>nginx程序本身还要消耗内存，特别是nginx反向代理POST请求比较多的情况，20万连接情况下推荐16G内存配置</p><h2 id="_2-6-tcp连接会不会占用文件描述符" tabindex="-1">2.6 TCP连接会不会占用文件描述符 <a class="header-anchor" href="#_2-6-tcp连接会不会占用文件描述符" aria-label="Permalink to &quot;2.6 TCP连接会不会占用文件描述符&quot;">​</a></h2><p>处在ESTABLISH状态的TCP连接，是会占用文件描述符的。而处在TIME_WAIT等非连接状态的TCP连接不会占用。</p><p>注意：CLOSE_WAIT状态也会占用文件描述符(losf)</p><h2 id="_2-6-关于time-wait数量过大会有什么影响" tabindex="-1">2.6 关于TIME_WAIT数量过大会有什么影响 <a class="header-anchor" href="#_2-6-关于time-wait数量过大会有什么影响" aria-label="Permalink to &quot;2.6 关于TIME_WAIT数量过大会有什么影响&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">这个担心是多余的，我目前机器上TIME_WAIT数量在60万左右，tcp_max_tw_buckets 设置的是94万，由于TIME_WAIT占用内存很小，并且不占用文件描述符，目前没发现有什么问题。唯一需要担心的就是TIME_WAIT耗尽了nginx访问upstream时候的五元组，这个担心可以通过在nginx主机上增加IP地址解决（同端口耗尽）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">这个担心是多余的，我目前机器上TIME_WAIT数量在60万左右，tcp_max_tw_buckets 设置的是94万，由于TIME_WAIT占用内存很小，并且不占用文件描述符，目前没发现有什么问题。唯一需要担心的就是TIME_WAIT耗尽了nginx访问upstream时候的五元组，这个担心可以通过在nginx主机上增加IP地址解决（同端口耗尽）</span></span></code></pre></div><p><img src="`+l+'" alt="tcp"></p>',36),c=[t];function i(r,y,d,_,u,h){return n(),a("div",null,c)}const T=s(o,[["render",i]]);export{k as __pageData,T as default};
