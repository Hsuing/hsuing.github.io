import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. 部署","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/21-wireguard-script.md","filePath":"guide/Linux/vpn/21-wireguard-script.md","lastUpdated":1725507452000}'),p={name:"guide/Linux/vpn/21-wireguard-script.md"},o=l(`<h1 id="_1-部署" tabindex="-1">1. 部署 <a class="header-anchor" href="#_1-部署" aria-label="Permalink to &quot;1. 部署&quot;">​</a></h1><p>基于centos7.9</p><h2 id="_1-1-机器初始化" tabindex="-1">1.1 机器初始化 <a class="header-anchor" href="#_1-1-机器初始化" aria-label="Permalink to &quot;1.1 机器初始化&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 关闭 selinux</span></span>
<span class="line"><span style="color:#B392F0;">setenforce</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s/SELINUX=.*/SELINUX=disabled/g&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/selinux/config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 调整文件描述符大小</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;* - nofile 65535&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/security/limits.conf</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;* - nproc 65536&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/security/limits.conf</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s#4096#65536#g&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/security/limits.d/20-nproc.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/security/limits.d/nofile.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">* soft nofile 65536</span></span>
<span class="line"><span style="color:#9ECBFF;">* hard nofile 65536</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置时间同步</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">crontab</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-l</span><span style="color:#E1E4E8;">;</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;*/30 * * * * /usr/sbin/ntpdate ntp1.aliyun.com &amp;&amp; /usr/sbin/hwclock -w&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">crontab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 优化系统内核参数</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.ip_local_port_range = 1024 65535</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_max_syn_backlog = 20480</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_synack_retries = 2</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_syn_retries = 2</span></span>
<span class="line"><span style="color:#9ECBFF;">net.core.somaxconn = 655350</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_fin_timeout = 30</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_max_tw_buckets = 10240</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.tcp_tw_recycle = 0</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.neigh.default.gc_thresh1 = 1024</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.neigh.default.gc_thresh1 = 2048</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv4.neigh.default.gc_thresh1 = 4096</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.swappiness = 0</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.overcommit_memory = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">vm.panic_on_oom = 0</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.inotify.max_user_instances = 8192</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.inotify.max_user_watches = 1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.file-max = 52706963</span></span>
<span class="line"><span style="color:#9ECBFF;">fs.nr_open = 52706963</span></span>
<span class="line"><span style="color:#9ECBFF;">net.ipv6.conf.all.disable_ipv6 = 1</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">sysctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">/dev/null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">2&gt;&amp;1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改 yum 源地址</span></span>
<span class="line"><span style="color:#B392F0;">sed</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s|^mirrorlist=|#mirrorlist=|g&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s|^#baseurl=http://mirror.centos.org|baseurl=https://mirrors.tuna.tsinghua.edu.cn|g&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">-i.bak</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">/etc/yum.repos.d/CentOS-</span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.repo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clean</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">makecache</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更新(可选)</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">update</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 重启机器</span></span>
<span class="line"><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">or</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">reboot</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 关闭 selinux</span></span>
<span class="line"><span style="color:#6F42C1;">setenforce</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s/SELINUX=.*/SELINUX=disabled/g&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/selinux/config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 调整文件描述符大小</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;* - nofile 65535&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/security/limits.conf</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;* - nproc 65536&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/security/limits.conf</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s#4096#65536#g&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/security/limits.d/20-nproc.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/security/limits.d/nofile.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">* soft nofile 65536</span></span>
<span class="line"><span style="color:#032F62;">* hard nofile 65536</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置时间同步</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#6F42C1;">crontab</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-l</span><span style="color:#24292E;">;</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;*/30 * * * * /usr/sbin/ntpdate ntp1.aliyun.com &amp;&amp; /usr/sbin/hwclock -w&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">crontab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 优化系统内核参数</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.ip_local_port_range = 1024 65535</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_max_syn_backlog = 20480</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_synack_retries = 2</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_syn_retries = 2</span></span>
<span class="line"><span style="color:#032F62;">net.core.somaxconn = 655350</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_fin_timeout = 30</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_max_tw_buckets = 10240</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.tcp_tw_recycle = 0</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.neigh.default.gc_thresh1 = 1024</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.neigh.default.gc_thresh1 = 2048</span></span>
<span class="line"><span style="color:#032F62;">net.ipv4.neigh.default.gc_thresh1 = 4096</span></span>
<span class="line"><span style="color:#032F62;">vm.swappiness = 0</span></span>
<span class="line"><span style="color:#032F62;">vm.overcommit_memory = 1</span></span>
<span class="line"><span style="color:#032F62;">vm.panic_on_oom = 0</span></span>
<span class="line"><span style="color:#032F62;">fs.inotify.max_user_instances = 8192</span></span>
<span class="line"><span style="color:#032F62;">fs.inotify.max_user_watches = 1048576</span></span>
<span class="line"><span style="color:#032F62;">fs.file-max = 52706963</span></span>
<span class="line"><span style="color:#032F62;">fs.nr_open = 52706963</span></span>
<span class="line"><span style="color:#032F62;">net.ipv6.conf.all.disable_ipv6 = 1</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">sysctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">/dev/null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">2&gt;&amp;1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 修改 yum 源地址</span></span>
<span class="line"><span style="color:#6F42C1;">sed</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s|^mirrorlist=|#mirrorlist=|g&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s|^#baseurl=http://mirror.centos.org|baseurl=https://mirrors.tuna.tsinghua.edu.cn|g&#39;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">-i.bak</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#032F62;">/etc/yum.repos.d/CentOS-</span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.repo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clean</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">makecache</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更新(可选)</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">update</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 重启机器</span></span>
<span class="line"><span style="color:#6F42C1;">init</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#032F62;">or</span><span style="color:#24292E;"> </span><span style="color:#032F62;">reboot</span></span></code></pre></div><h2 id="_1-2-服务端部署" tabindex="-1">1.2 服务端部署 <a class="header-anchor" href="#_1-2-服务端部署" aria-label="Permalink to &quot;1.2 服务端部署&quot;">​</a></h2><h3 id="_1-2-1-安装" tabindex="-1">1.2.1 安装 <a class="header-anchor" href="#_1-2-1-安装" aria-label="Permalink to &quot;1.2.1 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">epel-release</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">elrepo-release</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">yum-plugin-elrepo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kmod-wireguard</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wireguard-tools</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">epel-release</span><span style="color:#24292E;"> </span><span style="color:#032F62;">elrepo-release</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">yum-plugin-elrepo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kmod-wireguard</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wireguard-tools</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span></code></pre></div><h3 id="_1-2-2-配置" tabindex="-1">1.2.2 配置 <a class="header-anchor" href="#_1-2-2-配置" aria-label="Permalink to &quot;1.2.2 配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 进入目录，不存在请手动创建</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/wireguard</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建服务端密钥对</span></span>
<span class="line"><span style="color:#B392F0;">wg</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">genkey</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">privatekey-server</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">wg</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pubkey</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">publickey-server</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 创建客户端密钥对</span></span>
<span class="line"><span style="color:#B392F0;">wg</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">genkey</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">client</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">wg</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pubkey</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">publickey-client</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置服务端配置文件</span></span>
<span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">[Interface]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里指的是使用 172.172.0.1，网段大小是 24 位，不要与原有的冲突</span></span>
<span class="line"><span style="color:#B392F0;">Address</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">172.172</span><span style="color:#9ECBFF;">.0.1/24</span></span>
<span class="line"><span style="color:#B392F0;">SaveConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;"># 监听的 UDP 端口</span></span>
<span class="line"><span style="color:#B392F0;">ListenPort</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3367</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 privatekey-server 的内容</span></span>
<span class="line"><span style="color:#B392F0;">PrivateKey</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">UHon4NzonBaSajdajdjsahdadj3TuyXcBYnesVLNjBtWA=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Client，可以有很多 Peer</span></span>
<span class="line"><span style="color:#E1E4E8;">[Peer]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 publickey-client 的内容</span></span>
<span class="line"><span style="color:#B392F0;">PublicKey</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ou0RUhzq21uefewfwefwf2WGAIbaEIOnPluCY2Oy8=</span></span>
<span class="line"><span style="color:#6A737D;"># 这个是 Peer IP 地址，这里是 172.172.0.2/32</span></span>
<span class="line"><span style="color:#B392F0;">AllowedIPs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">172.172</span><span style="color:#9ECBFF;">.0.2/32</span></span>
<span class="line"><span style="color:#6A737D;"># 如果想把所有流量都通过服务器的话，这样配置：</span></span>
<span class="line"><span style="color:#6A737D;"># AllowedIPs = 0.0.0.0/0, ::/0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置虚拟网卡</span></span>
<span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysconfig/network-scripts/ifcfg-wg0</span></span>
<span class="line"><span style="color:#E1E4E8;">DEVICE</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">wg0</span></span>
<span class="line"><span style="color:#E1E4E8;">TYPE</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">wireguard</span></span>
<span class="line"><span style="color:#E1E4E8;">IPADDR</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.172</span><span style="color:#9ECBFF;">.0.1</span></span>
<span class="line"><span style="color:#E1E4E8;">NETMASK</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">255.255</span><span style="color:#9ECBFF;">.255.0</span></span>
<span class="line"><span style="color:#E1E4E8;">ONBOOT</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">yes</span></span>
<span class="line"><span style="color:#E1E4E8;">NAME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">wg0</span></span>
<span class="line"><span style="color:#E1E4E8;">ZONE</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">public</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置防火墙</span></span>
<span class="line"><span style="color:#B392F0;">firewall-cmd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--add-masquerade</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--zone=public</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--permanent</span></span>
<span class="line"><span style="color:#B392F0;">firewall-cmd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启动服务端</span></span>
<span class="line"><span style="color:#B392F0;">wg-quick</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">up</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wg0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 常用命令</span></span>
<span class="line"><span style="color:#6A737D;"># 停止服务端</span></span>
<span class="line"><span style="color:#B392F0;">wg-quick</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">down</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wg0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看节点列表</span></span>
<span class="line"><span style="color:#B392F0;">wg</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">show</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 进入目录，不存在请手动创建</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/wireguard</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建服务端密钥对</span></span>
<span class="line"><span style="color:#6F42C1;">wg</span><span style="color:#24292E;"> </span><span style="color:#032F62;">genkey</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">privatekey-server</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">wg</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pubkey</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">publickey-server</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;"># 创建客户端密钥对</span></span>
<span class="line"><span style="color:#6F42C1;">wg</span><span style="color:#24292E;"> </span><span style="color:#032F62;">genkey</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">client</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">wg</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pubkey</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">publickey-client</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置服务端配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#24292E;">[Interface]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里指的是使用 172.172.0.1，网段大小是 24 位，不要与原有的冲突</span></span>
<span class="line"><span style="color:#6F42C1;">Address</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">172.172</span><span style="color:#032F62;">.0.1/24</span></span>
<span class="line"><span style="color:#6F42C1;">SaveConfig</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#6A737D;"># 监听的 UDP 端口</span></span>
<span class="line"><span style="color:#6F42C1;">ListenPort</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3367</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 privatekey-server 的内容</span></span>
<span class="line"><span style="color:#6F42C1;">PrivateKey</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">UHon4NzonBaSajdajdjsahdadj3TuyXcBYnesVLNjBtWA=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Client，可以有很多 Peer</span></span>
<span class="line"><span style="color:#24292E;">[Peer]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 publickey-client 的内容</span></span>
<span class="line"><span style="color:#6F42C1;">PublicKey</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ou0RUhzq21uefewfwefwf2WGAIbaEIOnPluCY2Oy8=</span></span>
<span class="line"><span style="color:#6A737D;"># 这个是 Peer IP 地址，这里是 172.172.0.2/32</span></span>
<span class="line"><span style="color:#6F42C1;">AllowedIPs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">172.172</span><span style="color:#032F62;">.0.2/32</span></span>
<span class="line"><span style="color:#6A737D;"># 如果想把所有流量都通过服务器的话，这样配置：</span></span>
<span class="line"><span style="color:#6A737D;"># AllowedIPs = 0.0.0.0/0, ::/0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置虚拟网卡</span></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysconfig/network-scripts/ifcfg-wg0</span></span>
<span class="line"><span style="color:#24292E;">DEVICE</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">wg0</span></span>
<span class="line"><span style="color:#24292E;">TYPE</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">wireguard</span></span>
<span class="line"><span style="color:#24292E;">IPADDR</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.172</span><span style="color:#032F62;">.0.1</span></span>
<span class="line"><span style="color:#24292E;">NETMASK</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">255.255</span><span style="color:#032F62;">.255.0</span></span>
<span class="line"><span style="color:#24292E;">ONBOOT</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">yes</span></span>
<span class="line"><span style="color:#24292E;">NAME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">wg0</span></span>
<span class="line"><span style="color:#24292E;">ZONE</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">public</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置防火墙</span></span>
<span class="line"><span style="color:#6F42C1;">firewall-cmd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--add-masquerade</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--zone=public</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--permanent</span></span>
<span class="line"><span style="color:#6F42C1;">firewall-cmd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启动服务端</span></span>
<span class="line"><span style="color:#6F42C1;">wg-quick</span><span style="color:#24292E;"> </span><span style="color:#032F62;">up</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wg0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 常用命令</span></span>
<span class="line"><span style="color:#6A737D;"># 停止服务端</span></span>
<span class="line"><span style="color:#6F42C1;">wg-quick</span><span style="color:#24292E;"> </span><span style="color:#032F62;">down</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wg0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看节点列表</span></span>
<span class="line"><span style="color:#6F42C1;">wg</span><span style="color:#24292E;"> </span><span style="color:#032F62;">show</span></span></code></pre></div><h2 id="_1-3-客户端使用" tabindex="-1">1.3 客户端使用 <a class="header-anchor" href="#_1-3-客户端使用" aria-label="Permalink to &quot;1.3 客户端使用&quot;">​</a></h2><h3 id="_1-3-1-配置文件" tabindex="-1">1.3.1 配置文件 <a class="header-anchor" href="#_1-3-1-配置文件" aria-label="Permalink to &quot;1.3.1 配置文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 为方便，我在服务端上编写好客户端配置文件</span></span>
<span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">han.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">[Interface]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 client 的内容</span></span>
<span class="line"><span style="color:#B392F0;">PrivateKey</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bxiIs0czP8fdfdfsfsSldqCIjqI5hMp3LmAY=</span></span>
<span class="line"><span style="color:#6A737D;"># 客户端虚拟 IP</span></span>
<span class="line"><span style="color:#B392F0;">Address</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">172.172</span><span style="color:#9ECBFF;">.0.2/32</span></span>
<span class="line"><span style="color:#6A737D;"># 配置 DNS 地址</span></span>
<span class="line"><span style="color:#B392F0;">DNS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">114.114</span><span style="color:#9ECBFF;">.114.114</span></span>
<span class="line"><span style="color:#B392F0;">MTU</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1500</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">[Peer]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 publickey-server 的内容</span></span>
<span class="line"><span style="color:#B392F0;">PublicKey</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">JmWXpm2TUTsdnaklcnjbncqJXOWsslDK2n6Xw/8hM=</span></span>
<span class="line"><span style="color:#6A737D;"># 服务端公网暴露地址，3367 是上面指定的 UDP，这里做演示，就不做外网端口映射了</span></span>
<span class="line"><span style="color:#B392F0;">Endpoint</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.105:3367</span></span>
<span class="line"><span style="color:#6A737D;"># 指定要访问的服务端网段,或者设置0.0.0.0/0来进行全局代理</span></span>
<span class="line"><span style="color:#6A737D;"># 我这里配置访问 172.172.0.0/24 和 192.168.0.0/23 的流量走虚拟网关，按需修改</span></span>
<span class="line"><span style="color:#B392F0;">AllowedIPs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">172.172</span><span style="color:#9ECBFF;">.0.1/24,192.168.0.0/23</span></span>
<span class="line"><span style="color:#6A737D;"># 配置 Keepalive</span></span>
<span class="line"><span style="color:#B392F0;">PersistentKeepalive</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">25</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 为方便，我在服务端上编写好客户端配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">han.conf</span></span>
<span class="line"><span style="color:#24292E;">[Interface]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 client 的内容</span></span>
<span class="line"><span style="color:#6F42C1;">PrivateKey</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bxiIs0czP8fdfdfsfsSldqCIjqI5hMp3LmAY=</span></span>
<span class="line"><span style="color:#6A737D;"># 客户端虚拟 IP</span></span>
<span class="line"><span style="color:#6F42C1;">Address</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">172.172</span><span style="color:#032F62;">.0.2/32</span></span>
<span class="line"><span style="color:#6A737D;"># 配置 DNS 地址</span></span>
<span class="line"><span style="color:#6F42C1;">DNS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">114.114</span><span style="color:#032F62;">.114.114</span></span>
<span class="line"><span style="color:#6F42C1;">MTU</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1500</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">[Peer]</span></span>
<span class="line"><span style="color:#6A737D;"># 这里填写 publickey-server 的内容</span></span>
<span class="line"><span style="color:#6F42C1;">PublicKey</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">JmWXpm2TUTsdnaklcnjbncqJXOWsslDK2n6Xw/8hM=</span></span>
<span class="line"><span style="color:#6A737D;"># 服务端公网暴露地址，3367 是上面指定的 UDP，这里做演示，就不做外网端口映射了</span></span>
<span class="line"><span style="color:#6F42C1;">Endpoint</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.105:3367</span></span>
<span class="line"><span style="color:#6A737D;"># 指定要访问的服务端网段,或者设置0.0.0.0/0来进行全局代理</span></span>
<span class="line"><span style="color:#6A737D;"># 我这里配置访问 172.172.0.0/24 和 192.168.0.0/23 的流量走虚拟网关，按需修改</span></span>
<span class="line"><span style="color:#6F42C1;">AllowedIPs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">172.172</span><span style="color:#032F62;">.0.1/24,192.168.0.0/23</span></span>
<span class="line"><span style="color:#6A737D;"># 配置 Keepalive</span></span>
<span class="line"><span style="color:#6F42C1;">PersistentKeepalive</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">25</span></span></code></pre></div><h3 id="_1-3-2-win下" tabindex="-1">1.3.2 win下 <a class="header-anchor" href="#_1-3-2-win下" aria-label="Permalink to &quot;1.3.2 win下&quot;">​</a></h3><p>下载地址：<a href="https://github.com/WireGuard/wireguard-windows" target="_blank" rel="noreferrer">GitHub - WireGuard</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409051122709.png" alt="img"></p><ul><li>使用</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409051123348.png" alt="img"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409051123259.png" alt="img"></p><ul><li>验证是否成功</li></ul><p>键盘按 <code>Win+R</code> 输入 <code>cmd</code> 调出命令行终端 输入 <code>tracert 192.168.1.58</code>，前提是服务端有这个 <code>IP</code> 地址，按需修改</p><p>如果流量走了虚拟网卡，说明部署成功</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409051124002.png" alt="img"></p>`,22),e=[o];function c(t,r,y,E,i,F){return n(),a("div",null,e)}const B=s(p,[["render",c]]);export{d as __pageData,B as default};
