import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"1.修改limit","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Shells/scripts/aws/youhua.md","filePath":"guide/Shells/scripts/aws/youhua.md","lastUpdated":1702634445000}'),l={name:"guide/Shells/scripts/aws/youhua.md"},e=p(`<h1 id="_1-修改limit" tabindex="-1">1.修改limit <a class="header-anchor" href="#_1-修改limit" aria-label="Permalink to &quot;1.修改limit&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/security/limits.d/99-centos.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">* - nproc 1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">* - nofile 1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">root - nproc 1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">root - nofile 1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/security/limits.d/99-centos.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">* - nproc 1048576</span></span>
<span class="line"><span style="color:#032F62;">* - nofile 1048576</span></span>
<span class="line"><span style="color:#032F62;">root - nproc 1048576</span></span>
<span class="line"><span style="color:#032F62;">root - nofile 1048576</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h1 id="_2-修改journal设置" tabindex="-1">2.修改journal设置 <a class="header-anchor" href="#_2-修改journal设置" aria-label="Permalink to &quot;2.修改journal设置&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s,^#Compress=yes,Compress=yes,&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-e </span><span style="color:#9ECBFF;">&#39;s,^#SystemMaxUse=,SystemMaxUse=2G,&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-e </span><span style="color:#9ECBFF;">&#39;s,^#Seal=yes,Seal=yes,&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-e </span><span style="color:#9ECBFF;">&#39;s,^#RateLimitBurst=1000,RateLimitBurst=5000,&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">-i </span><span style="color:#9ECBFF;">/etc/systemd/journald.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s,^#Compress=yes,Compress=yes,&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-e </span><span style="color:#032F62;">&#39;s,^#SystemMaxUse=,SystemMaxUse=2G,&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-e </span><span style="color:#032F62;">&#39;s,^#Seal=yes,Seal=yes,&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-e </span><span style="color:#032F62;">&#39;s,^#RateLimitBurst=1000,RateLimitBurst=5000,&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">-i </span><span style="color:#032F62;">/etc/systemd/journald.conf</span></span></code></pre></div><h1 id="_3-修改终端提示符" tabindex="-1">3.修改终端提示符 <a class="header-anchor" href="#_3-修改终端提示符" aria-label="Permalink to &quot;3.修改终端提示符&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PS1</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;[\\t]\\[$(</span><span style="color:#B392F0;">tput</span><span style="color:#9ECBFF;"> setaf </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">)\\][\\u@\\h:\\W]\\[$(</span><span style="color:#B392F0;">tput</span><span style="color:#9ECBFF;"> setaf </span><span style="color:#79B8FF;">7</span><span style="color:#9ECBFF;">)\\]</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">$ \\[$(</span><span style="color:#B392F0;">tput</span><span style="color:#9ECBFF;"> sgr0)\\]&quot;</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;export PS1=&quot;[\\t]\\[$(tput setaf 1)\\][\\u@\\h:\\W]\\[$(tput setaf 7)\\]\\\\$ \\[$(tput sgr0)\\]&quot;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~/.bashrc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PS1</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;[\\t]\\[$(</span><span style="color:#6F42C1;">tput</span><span style="color:#032F62;"> setaf </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">)\\][\\u@\\h:\\W]\\[$(</span><span style="color:#6F42C1;">tput</span><span style="color:#032F62;"> setaf </span><span style="color:#005CC5;">7</span><span style="color:#032F62;">)\\]</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">$ \\[$(</span><span style="color:#6F42C1;">tput</span><span style="color:#032F62;"> sgr0)\\]&quot;</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;export PS1=&quot;[\\t]\\[$(tput setaf 1)\\][\\u@\\h:\\W]\\[$(tput setaf 7)\\]\\\\$ \\[$(tput sgr0)\\]&quot;&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~/.bashrc</span></span></code></pre></div><h1 id="_4-net" tabindex="-1">4.net <a class="header-anchor" href="#_4-net" aria-label="Permalink to &quot;4.net&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.d/99-net.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;"># 二层的网桥在转发包时也会被iptables的FORWARD规则所过滤</span></span>
<span class="line"><span style="color:#9ECBFF;">net.bridge.bridge-nf-call-arptables=1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.bridge.bridge-nf-call-iptables=1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.bridge.bridge-nf-call-ip6tables=1</span></span>
<span class="line"><span style="color:#9ECBFF;"># 关闭严格校验数据包的反向路径，默认值1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.conf.default.rp_filter=0</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.conf.all.rp_filter=0</span></span>
<span class="line"><span style="color:#9ECBFF;"># 进程间通信发送数据, 默认100</span></span>
<span class="line"><span style="color:#9ECBFF;">net.unix.max_dgram_qlen=512</span></span>
<span class="line"><span style="color:#9ECBFF;"># 设置 conntrack 的上限</span></span>
<span class="line"><span style="color:#9ECBFF;">net.netfilter.nf_conntrack_max=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;"># 设置连接跟踪表中处于TIME_WAIT状态的超时时间</span></span>
<span class="line"><span style="color:#9ECBFF;">net.netfilter.nf_conntrack_tcp_timeout_timewait=30</span></span>
<span class="line"><span style="color:#9ECBFF;"># 设置连接跟踪表中TCP连接超时时间</span></span>
<span class="line"><span style="color:#9ECBFF;">net.netfilter.nf_conntrack_tcp_timeout_established=1200</span></span>
<span class="line"><span style="color:#9ECBFF;"># 端口最大的监听队列的长度</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.somaxconn=21644</span></span>
<span class="line"><span style="color:#9ECBFF;"># 接收自网卡、但未被内核协议栈处理的报文队列长度</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.netdev_max_backlog=262144</span></span>
<span class="line"><span style="color:#9ECBFF;"># 系统无内存压力、启动压力模式阈值、最大值，单位为页的数量</span></span>
<span class="line"><span style="color:#9ECBFF;">#net.ipv4.tcp_mem=1541646 2055528 3083292</span></span>
<span class="line"><span style="color:#9ECBFF;"># 内核socket接收缓存区字节数min/default/max</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.rmem=4096 65536 8388608</span></span>
<span class="line"><span style="color:#9ECBFF;"># 内核socket发送缓存区字节数min/default/max</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.wmem=4096 65536 8388608</span></span>
<span class="line"><span style="color:#9ECBFF;"># 开启自动调节缓存模式</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_moderate_rcvbuf=1</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP阻塞控制算法BBR，Linux内核版本4.9开始内置BBR算法</span></span>
<span class="line"><span style="color:#9ECBFF;">#net.ipv4.tcp_congestion_control=bbr</span></span>
<span class="line"><span style="color:#9ECBFF;">#net.core.default_qdisc=fq</span></span>
<span class="line"><span style="color:#9ECBFF;"># 用作本地随机TCP端口的范围</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.ip_local_port_range=10000 65000</span></span>
<span class="line"><span style="color:#9ECBFF;"># 打开ipv4数据包转发</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.ip_forward=1</span></span>
<span class="line"><span style="color:#9ECBFF;"># 允许应用程序能够绑定到不属于本地网卡的地址</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.ip_nonlocal_bind=1</span></span>
<span class="line"><span style="color:#9ECBFF;"># 系统中处于 SYN_RECV 状态的 TCP 连接数量</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_max_syn_backlog=16384</span></span>
<span class="line"><span style="color:#9ECBFF;"># 内核中管理 TIME_WAIT 状态的数量</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_max_tw_buckets=5000</span></span>
<span class="line"><span style="color:#9ECBFF;"># 指定重发 SYN/ACK 的次数</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_synack_retries=2</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP连接中TIME_WAIT sockets的快速回收</span></span>
<span class="line"><span style="color:#9ECBFF;"># 4.12内核版本开始移除了 tcp_tw_recycle </span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_tw_recycle=0</span></span>
<span class="line"><span style="color:#9ECBFF;"># 不属于任何进程的tcp socket最大数量. 超过这个数量的socket会被reset, 并告警</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_max_orphans=1024</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP FIN报文重试次数</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_orphan_retries=8</span></span>
<span class="line"><span style="color:#9ECBFF;"># 加快系统关闭处于 FIN_WAIT2 状态的 TCP 连接</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_fin_timeout=15</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP连接keepalive的持续时间，默认7200</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_keepalive_time=600</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP keepalive探测包发送间隔</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_keepalive_intvl=30</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP keepalive探测包重试次数</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_keepalive_probes=10</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP FastOpen</span></span>
<span class="line"><span style="color:#9ECBFF;"># 0:关闭 ; 1:作为客户端时使用 ; 2:作为服务器端时使用 ; 3:无论作为客户端还是服务器端都使用</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_fastopen=3</span></span>
<span class="line"><span style="color:#9ECBFF;"># 限制TCP重传次数</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_retries1=3</span></span>
<span class="line"><span style="color:#9ECBFF;"># TCP重传次数到达上限时，关闭TCP连接</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_retries2=15</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.d/99-net.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;"># 二层的网桥在转发包时也会被iptables的FORWARD规则所过滤</span></span>
<span class="line"><span style="color:#032F62;">net.bridge.bridge-nf-call-arptables=1</span></span>
<span class="line"><span style="color:#032F62;">net.bridge.bridge-nf-call-iptables=1</span></span>
<span class="line"><span style="color:#032F62;">net.bridge.bridge-nf-call-ip6tables=1</span></span>
<span class="line"><span style="color:#032F62;"># 关闭严格校验数据包的反向路径，默认值1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.conf.default.rp_filter=0</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.conf.all.rp_filter=0</span></span>
<span class="line"><span style="color:#032F62;"># 进程间通信发送数据, 默认100</span></span>
<span class="line"><span style="color:#032F62;">net.unix.max_dgram_qlen=512</span></span>
<span class="line"><span style="color:#032F62;"># 设置 conntrack 的上限</span></span>
<span class="line"><span style="color:#032F62;">net.netfilter.nf_conntrack_max=1048576</span></span>
<span class="line"><span style="color:#032F62;"># 设置连接跟踪表中处于TIME_WAIT状态的超时时间</span></span>
<span class="line"><span style="color:#032F62;">net.netfilter.nf_conntrack_tcp_timeout_timewait=30</span></span>
<span class="line"><span style="color:#032F62;"># 设置连接跟踪表中TCP连接超时时间</span></span>
<span class="line"><span style="color:#032F62;">net.netfilter.nf_conntrack_tcp_timeout_established=1200</span></span>
<span class="line"><span style="color:#032F62;"># 端口最大的监听队列的长度</span></span>
<span class="line"><span style="color:#032F62;">net.core.somaxconn=21644</span></span>
<span class="line"><span style="color:#032F62;"># 接收自网卡、但未被内核协议栈处理的报文队列长度</span></span>
<span class="line"><span style="color:#032F62;">net.core.netdev_max_backlog=262144</span></span>
<span class="line"><span style="color:#032F62;"># 系统无内存压力、启动压力模式阈值、最大值，单位为页的数量</span></span>
<span class="line"><span style="color:#032F62;">#net.ipv4.tcp_mem=1541646 2055528 3083292</span></span>
<span class="line"><span style="color:#032F62;"># 内核socket接收缓存区字节数min/default/max</span></span>
<span class="line"><span style="color:#032F62;">net.core.rmem=4096 65536 8388608</span></span>
<span class="line"><span style="color:#032F62;"># 内核socket发送缓存区字节数min/default/max</span></span>
<span class="line"><span style="color:#032F62;">net.core.wmem=4096 65536 8388608</span></span>
<span class="line"><span style="color:#032F62;"># 开启自动调节缓存模式</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_moderate_rcvbuf=1</span></span>
<span class="line"><span style="color:#032F62;"># TCP阻塞控制算法BBR，Linux内核版本4.9开始内置BBR算法</span></span>
<span class="line"><span style="color:#032F62;">#net.ipv4.tcp_congestion_control=bbr</span></span>
<span class="line"><span style="color:#032F62;">#net.core.default_qdisc=fq</span></span>
<span class="line"><span style="color:#032F62;"># 用作本地随机TCP端口的范围</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.ip_local_port_range=10000 65000</span></span>
<span class="line"><span style="color:#032F62;"># 打开ipv4数据包转发</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.ip_forward=1</span></span>
<span class="line"><span style="color:#032F62;"># 允许应用程序能够绑定到不属于本地网卡的地址</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.ip_nonlocal_bind=1</span></span>
<span class="line"><span style="color:#032F62;"># 系统中处于 SYN_RECV 状态的 TCP 连接数量</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_max_syn_backlog=16384</span></span>
<span class="line"><span style="color:#032F62;"># 内核中管理 TIME_WAIT 状态的数量</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_max_tw_buckets=5000</span></span>
<span class="line"><span style="color:#032F62;"># 指定重发 SYN/ACK 的次数</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_synack_retries=2</span></span>
<span class="line"><span style="color:#032F62;"># TCP连接中TIME_WAIT sockets的快速回收</span></span>
<span class="line"><span style="color:#032F62;"># 4.12内核版本开始移除了 tcp_tw_recycle </span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_tw_recycle=0</span></span>
<span class="line"><span style="color:#032F62;"># 不属于任何进程的tcp socket最大数量. 超过这个数量的socket会被reset, 并告警</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_max_orphans=1024</span></span>
<span class="line"><span style="color:#032F62;"># TCP FIN报文重试次数</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_orphan_retries=8</span></span>
<span class="line"><span style="color:#032F62;"># 加快系统关闭处于 FIN_WAIT2 状态的 TCP 连接</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_fin_timeout=15</span></span>
<span class="line"><span style="color:#032F62;"># TCP连接keepalive的持续时间，默认7200</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_keepalive_time=600</span></span>
<span class="line"><span style="color:#032F62;"># TCP keepalive探测包发送间隔</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_keepalive_intvl=30</span></span>
<span class="line"><span style="color:#032F62;"># TCP keepalive探测包重试次数</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_keepalive_probes=10</span></span>
<span class="line"><span style="color:#032F62;"># TCP FastOpen</span></span>
<span class="line"><span style="color:#032F62;"># 0:关闭 ; 1:作为客户端时使用 ; 2:作为服务器端时使用 ; 3:无论作为客户端还是服务器端都使用</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_fastopen=3</span></span>
<span class="line"><span style="color:#032F62;"># 限制TCP重传次数</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_retries1=3</span></span>
<span class="line"><span style="color:#032F62;"># TCP重传次数到达上限时，关闭TCP连接</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_retries2=15</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h1 id="_5-fs参数" tabindex="-1">5.fs参数 <a class="header-anchor" href="#_5-fs参数" aria-label="Permalink to &quot;5.fs参数&quot;">​</a></h1><p>fs 参数主要是调整系统的文件打开数，适用与文件交互频繁的系统场景，例如 Oracle 数据库服务器或 Nginx 代理服务器</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.d/99-fs.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;"># 最大文件句柄数</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.file-max=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;"># 最大文件打开数</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.nr_open=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;"># 同一时间异步IO请求数</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.aio-max-nr=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;"># 在CentOS7.4引入了一个新的参数来控制内核的行为。 </span></span>
<span class="line"><span style="color:#9ECBFF;"># /proc/sys/fs/may_detach_mounts 默认设置为0</span></span>
<span class="line"><span style="color:#9ECBFF;"># 当系统有容器运行的时候，需要将该值设置为1。</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.may_detach_mounts=1</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.d/99-fs.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;"># 最大文件句柄数</span></span>
<span class="line"><span style="color:#032F62;">fs.file-max=1048576</span></span>
<span class="line"><span style="color:#032F62;"># 最大文件打开数</span></span>
<span class="line"><span style="color:#032F62;">fs.nr_open=1048576</span></span>
<span class="line"><span style="color:#032F62;"># 同一时间异步IO请求数</span></span>
<span class="line"><span style="color:#032F62;">fs.aio-max-nr=1048576</span></span>
<span class="line"><span style="color:#032F62;"># 在CentOS7.4引入了一个新的参数来控制内核的行为。 </span></span>
<span class="line"><span style="color:#032F62;"># /proc/sys/fs/may_detach_mounts 默认设置为0</span></span>
<span class="line"><span style="color:#032F62;"># 当系统有容器运行的时候，需要将该值设置为1。</span></span>
<span class="line"><span style="color:#032F62;">fs.may_detach_mounts=1</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h1 id="_6-vm-参数" tabindex="-1">6.vm 参数 <a class="header-anchor" href="#_6-vm-参数" aria-label="Permalink to &quot;6.vm 参数&quot;">​</a></h1><p>vm 参数用于优化 vmware 虚拟机的系统配置</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.d/99-vm.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;"># 内存耗尽才使用swap分区</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.swappiness=10</span></span>
<span class="line"><span style="color:#9ECBFF;"># 当内存耗尽时，内核会触发OOM killer根据oom_score杀掉最耗内存的进程</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.panic_on_oom=0</span></span>
<span class="line"><span style="color:#9ECBFF;"># 允许overcommit</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.overcommit_memory=1</span></span>
<span class="line"><span style="color:#9ECBFF;"># 定义了进程能拥有的最多内存区域，默认65536</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.max_map_count=262144</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.d/99-vm.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;"># 内存耗尽才使用swap分区</span></span>
<span class="line"><span style="color:#032F62;">vm.swappiness=10</span></span>
<span class="line"><span style="color:#032F62;"># 当内存耗尽时，内核会触发OOM killer根据oom_score杀掉最耗内存的进程</span></span>
<span class="line"><span style="color:#032F62;">vm.panic_on_oom=0</span></span>
<span class="line"><span style="color:#032F62;"># 允许overcommit</span></span>
<span class="line"><span style="color:#032F62;">vm.overcommit_memory=1</span></span>
<span class="line"><span style="color:#032F62;"># 定义了进程能拥有的最多内存区域，默认65536</span></span>
<span class="line"><span style="color:#032F62;">vm.max_map_count=262144</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div>`,14),o=[e];function t(c,r,i,F,y,E){return n(),a("div",null,o)}const d=s(l,[["render",t]]);export{_ as __pageData,d as default};
