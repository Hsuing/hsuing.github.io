import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"升级内核","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/6-TcpBBR.md","filePath":"guide/Linux/web/nginx/6-TcpBBR.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/6-TcpBBR.md"},p=a(`<ul><li>centos7</li></ul><p>TCP BBR是谷歌出品的TCP拥塞控制算法，BBR目的是要尽量跑满带宽，并且尽量不要有排队的情况。BBR可以起到单边加速TCP连接的效果。替代锐速再合适不过，毕竟免费。</p><p>Google提交到Linux主线并发表在ACM queue期刊上的TCP-BBR拥塞控制算法。继承了Google“先在生产环境上部署，再开源和发论文”的研究传统。TCP-BBR已经再YouTube服务器和Google跨数据中心的内部广域网(B4)上部署。由此可见出该算法的前途。</p><p>TCP-BBR的目标就是最大化利用网络上瓶颈链路的带宽。一条网络链路就像一条水管，要想最大化利用这条水管，最好的办法就是给这跟水管灌满水。</p><p>BBR解决了两个问题：</p><p>再有一定丢包率的网络链路上充分利用带宽。非常适合高延迟，高带宽的网络链路。 降低网络链路上的buffer占用率，从而降低延迟。非常适合慢速接入网络的用户。 项目地址:<a href="https://github.com/google/bbr" target="_blank" rel="noreferrer">https://github.com/google/bbr</a></p><p>使用TCP BBR 拥塞控制算法，能够使Linux服务器更高效的利用带宽、增加吞吐量并减少连接的延迟</p><p>Linux kernel 4.9+ 已支持 tcp_bbr 下面简单讲述基于KVM架构VPS如何开启</p><p>附: OpenVZ 架构VPS开启BBR （容易导致判定滥用ban机，慎用！)</p><p>Debian/Ubuntu TCP BBR 魔改版 (不支持4.13.*及更新的内核)</p><h1 id="升级内核" tabindex="-1">升级内核 <a class="header-anchor" href="#升级内核" aria-label="Permalink to &quot;升级内核&quot;">​</a></h1><ul><li>查看当前的内核</li></ul><p>uname -r</p><h2 id="安装内核" tabindex="-1">安装内核 <a class="header-anchor" href="#安装内核" aria-label="Permalink to &quot;安装内核&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sudo rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-2.el7.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#8</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install https://www.elrepo.org/elrepo-release-8.0-2.el8.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo yum --enablerepo=elrepo-kernel install kernel-ml -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sudo rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org</span></span>
<span class="line"><span style="color:#24292e;">sudo rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-2.el7.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#8</span></span>
<span class="line"><span style="color:#24292e;">yum install https://www.elrepo.org/elrepo-release-8.0-2.el8.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo yum --enablerepo=elrepo-kernel install kernel-ml -y</span></span></code></pre></div><h2 id="查看已安装内核" tabindex="-1">查看已安装内核 <a class="header-anchor" href="#查看已安装内核" aria-label="Permalink to &quot;查看已安装内核&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@bj-caijing ~]# egrep ^menuentry /etc/grub2.cfg | cut -f 2 -d \\&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS Linux 7 Rescue 20a501f9e7ce45ab9b68c592f973c8a4 (5.3.7-1.el7.elrepo.x86_64)</span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS Linux (5.3.7-1.el7.elrepo.x86_64) 7 (Core)</span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS Linux (3.10.0-957.27.2.el7.x86_64) 7 (Core)</span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS Linux (3.10.0-957.el7.x86_64) 7 (Core)</span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS Linux (0-rescue-902773b02db54c6ba7c050c025573637) 7 (Core)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@bj-caijing ~]# egrep ^menuentry /etc/grub2.cfg | cut -f 2 -d \\&#39;</span></span>
<span class="line"><span style="color:#24292e;">CentOS Linux 7 Rescue 20a501f9e7ce45ab9b68c592f973c8a4 (5.3.7-1.el7.elrepo.x86_64)</span></span>
<span class="line"><span style="color:#24292e;">CentOS Linux (5.3.7-1.el7.elrepo.x86_64) 7 (Core)</span></span>
<span class="line"><span style="color:#24292e;">CentOS Linux (3.10.0-957.27.2.el7.x86_64) 7 (Core)</span></span>
<span class="line"><span style="color:#24292e;">CentOS Linux (3.10.0-957.el7.x86_64) 7 (Core)</span></span>
<span class="line"><span style="color:#24292e;">CentOS Linux (0-rescue-902773b02db54c6ba7c050c025573637) 7 (Core)</span></span></code></pre></div><h2 id="设置默认的grub2引导项来启用5-3内核" tabindex="-1">设置默认的grub2引导项来启用5.3内核 <a class="header-anchor" href="#设置默认的grub2引导项来启用5-3内核" aria-label="Permalink to &quot;设置默认的grub2引导项来启用5.3内核&quot;">​</a></h2><p>由于行计数从0开始，5.3内核CentOS Linux (5.3.7-1.el7.elrepo.x86_64) 7 (Core)条目位于第二行，因此将默认启动项设置为1</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">grub2-set-default 0</span></span>
<span class="line"><span style="color:#e1e4e8;">grub2-mkconfig -o /boot/grub2/grub.cfg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">grub2-set-default 0</span></span>
<span class="line"><span style="color:#24292e;">grub2-mkconfig -o /boot/grub2/grub.cfg</span></span></code></pre></div><h2 id="重启系统" tabindex="-1">重启系统 <a class="header-anchor" href="#重启系统" aria-label="Permalink to &quot;重启系统&quot;">​</a></h2><h2 id="查看内核" tabindex="-1">查看内核 <a class="header-anchor" href="#查看内核" aria-label="Permalink to &quot;查看内核&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@bj-caijing ~]# uname -r</span></span>
<span class="line"><span style="color:#e1e4e8;">5.3.7-1.el7.elrepo.x86_64</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##  激活 BBR</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;net.core.default_qdisc=fq&#39; | sudo tee -a /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;net.ipv4.tcp_congestion_control=bbr&#39; | sudo tee -a /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo sysctl -p</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 查看启用tcp_bbr模块</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@bj-caijing ~]# lsmod | grep tcp_bbr</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp_bbr                20480  3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 关闭bbr</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ sed -i &#39;/net\\.core\\.default_qdisc=fq/d&#39; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sed -i &#39;/net\\.ipv4\\.tcp_congestion_control=bbr/d&#39; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sysctl -p</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># CentOS 8 开启 BBR/升级内核</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 1. CentOS 8 开启 BBR</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;net.core.default_qdisc=fq&quot; &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;net.ipv4.tcp_congestion_control=bbr&quot; &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">sysctl -p</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">然后重启一下系统</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 2. 检查 BBR 是否开启成功</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sysctl -n net.ipv4.tcp_congestion_control</span></span>
<span class="line"><span style="color:#e1e4e8;">lsmod | grep bbr</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 3. CentOS 8 升级内核</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -Uvh https://www.elrepo.org/elrepo-release-8.0-2.el8.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">启用 ELRepo 源仓库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum --disablerepo=&quot;*&quot; --enablerepo=&quot;elrepo-kernel&quot; list available</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">安装新内核</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum -y --enablerepo=elrepo-kernel install kernel-ml kernel-ml-devel</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 4. 修改 grub 配置使用新内核版本启动</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dnf install grubby</span></span>
<span class="line"><span style="color:#e1e4e8;">grubby --default-kernel</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">当前最新版本 5.3.8，一般安装完就会以最新内核启动，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如不是，查看所有内核：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">grubby --info=ALL</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">然后指定新内核启动</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">grubby --set-default /boot/vmlinuz-5.3.8-1.el8.elrepo.x86_64</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@bj-caijing ~]# uname -r</span></span>
<span class="line"><span style="color:#24292e;">5.3.7-1.el7.elrepo.x86_64</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##  激活 BBR</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &#39;net.core.default_qdisc=fq&#39; | sudo tee -a /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">echo &#39;net.ipv4.tcp_congestion_control=bbr&#39; | sudo tee -a /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">sudo sysctl -p</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 查看启用tcp_bbr模块</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@bj-caijing ~]# lsmod | grep tcp_bbr</span></span>
<span class="line"><span style="color:#24292e;">tcp_bbr                20480  3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 关闭bbr</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ sed -i &#39;/net\\.core\\.default_qdisc=fq/d&#39; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">$ sed -i &#39;/net\\.ipv4\\.tcp_congestion_control=bbr/d&#39; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">$ sysctl -p</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># CentOS 8 开启 BBR/升级内核</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 1. CentOS 8 开启 BBR</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;net.core.default_qdisc=fq&quot; &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;net.ipv4.tcp_congestion_control=bbr&quot; &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">sysctl -p</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">然后重启一下系统</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 2. 检查 BBR 是否开启成功</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sysctl -n net.ipv4.tcp_congestion_control</span></span>
<span class="line"><span style="color:#24292e;">lsmod | grep bbr</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 3. CentOS 8 升级内核</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org</span></span>
<span class="line"><span style="color:#24292e;">rpm -Uvh https://www.elrepo.org/elrepo-release-8.0-2.el8.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">启用 ELRepo 源仓库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum --disablerepo=&quot;*&quot; --enablerepo=&quot;elrepo-kernel&quot; list available</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">安装新内核</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum -y --enablerepo=elrepo-kernel install kernel-ml kernel-ml-devel</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 4. 修改 grub 配置使用新内核版本启动</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dnf install grubby</span></span>
<span class="line"><span style="color:#24292e;">grubby --default-kernel</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">当前最新版本 5.3.8，一般安装完就会以最新内核启动，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如不是，查看所有内核：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">grubby --info=ALL</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">然后指定新内核启动</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">grubby --set-default /boot/vmlinuz-5.3.8-1.el8.elrepo.x86_64</span></span></code></pre></div>`,23),o=[p];function c(t,r,i,y,u,b){return n(),e("div",null,o)}const h=s(l,[["render",c]]);export{g as __pageData,h as default};
