import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const x=JSON.parse('{"title":"1.Wireguard","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/21-Wireguard.md","filePath":"guide/Linux/vpn/21-Wireguard.md","lastUpdated":1701595065000}'),l={name:"guide/Linux/vpn/21-Wireguard.md"},p=e(`<h1 id="_1-wireguard" tabindex="-1">1.Wireguard <a class="header-anchor" href="#_1-wireguard" aria-label="Permalink to &quot;1.Wireguard&quot;">​</a></h1><p>官方文档：<a href="https://www.wireguard.com/performance" target="_blank" rel="noreferrer">https://www.wireguard.com/performance</a></p><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>WireGuard ®是一种非常简单而现代，快捷的VPN，利用<strong>最先进的加密技术</strong>。它比IPSec <a href="https://www.wireguard.com/performance/" target="_blank" rel="noreferrer">更快</a>，<a href="https://www.wireguard.com/quickstart/" target="_blank" rel="noreferrer">更简单</a>，更精简，更有用。它比OpenVPN更高效。WireGuard设计为通用VPN，适用于多种不同情况。它是跨平台的，可大规模部署。它已经被认为是业内最安全，最易于使用，最简单的VPN解决方案，目前支持Linux,Windows,mac OS,Android,iOS等主流平台</p><p>WireGuard协议作为Linux内核模块运行，所以效率极高。使用了最先进的加密技术(利用Curve25519进行密钥交换，ChaCha20和Poly1305用于数据认证，BLAKE2用于散列)，安全性毋庸置疑。WireGuard支持IP地址漫游，也就是网络断开再连，对它不会有影响。</p><p>WireGuard使用UDP协议传输数据，在不使用的情况下默认不会传输任何 UDP 数据包，所以比常规VPN省电很多，可以像SS一样一直挂着使用。WireGuard协议的速度瞬秒其它VPN协议</p><h2 id="安全性" tabindex="-1">安全性 <a class="header-anchor" href="#安全性" aria-label="Permalink to &quot;安全性&quot;">​</a></h2><ul><li>Curve25519 目前最高水平的秘钥交换算法。</li><li>ChaCha20 对称加解密算法，比 AES 更快更高效。</li><li>Poly1305 是一种 MAC (Message Authentication Code) 标准，用于验证数据的完整性和消息的真实性。</li><li>BLAKE2 一种更安全的 HASH 算法（类似的有 SHA1, SHA256, MD5）</li><li>SipHash24 另一种 HASH 算法。</li><li>HKDF 一种秘钥衍生算法</li></ul><ul><li>官方测试结果</li></ul><p><img src="https://gitee.com/freehan/imgs/raw/master/imgs/image-20220107153512556.png" alt="image-20220107153512556"></p><h1 id="_2-nat-to-nat-vpn" tabindex="-1">2.NAT to NAT VPN <a class="header-anchor" href="#_2-nat-to-nat-vpn" aria-label="Permalink to &quot;2.NAT to NAT VPN&quot;">​</a></h1><p>客户端如果想要同时访问多个 nat 只能像图中的 NAT C 客户端一样连接两个 vpn</p><p><img src="https://gitee.com/freehan/imgs/raw/master/imgs/legacy-openvpn2.png" alt="openvpn"></p><p>wireguard 中没有 client/server 的概念，所有 nat 中的某台机器与 gateway 主机建立连接，即可实现共享所有节点的网络资源</p><p><img src="https://gitee.com/freehan/imgs/raw/master/imgs/new-wireguard.png" alt="wireguard"></p><ul><li>环境</li></ul><p>centos7.9_x64</p><p>内核要求，Linux ≥3.10</p><p>开启转发</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#开启转发</span></span>
<span class="line"><span style="color:#e1e4e8;">vim /etc/sysctl.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.conf.all.proxy_arp = 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 应用修改</span></span>
<span class="line"><span style="color:#e1e4e8;">sysctl -p</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#开启转发</span></span>
<span class="line"><span style="color:#24292e;">vim /etc/sysctl.conf </span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.conf.all.proxy_arp = 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 应用修改</span></span>
<span class="line"><span style="color:#24292e;">sysctl -p</span></span></code></pre></div><h2 id="升级内核" tabindex="-1">升级内核 <a class="header-anchor" href="#升级内核" aria-label="Permalink to &quot;升级内核&quot;">​</a></h2><h3 id="_1-rpm" tabindex="-1">1.rpm <a class="header-anchor" href="#_1-rpm" aria-label="Permalink to &quot;1.rpm&quot;">​</a></h3><p>如果你想安装其他内核，你也可以在 <a href="http://ftp.sjtu.edu.cn/sites/elrepo.org/linux/kernel/el7/x86_64/RPMS/" target="_blank" rel="noreferrer">这里下载</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://pan.cnsre.cn/d/Package/Linux/kernel/kernel-ml-5.15.2-1.el7.elrepo.x86_64.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -ivh kernel-ml-5.15.2-1.el7.elrepo.x86_64.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://pan.cnsre.cn/d/Package/Linux/kernel/kernel-ml-5.15.2-1.el7.elrepo.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292e;">rpm -ivh kernel-ml-5.15.2-1.el7.elrepo.x86_64.rpm</span></span></code></pre></div><h3 id="_2-方式" tabindex="-1">2.方式 <a class="header-anchor" href="#_2-方式" aria-label="Permalink to &quot;2.方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 载入公钥</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org</span></span>
<span class="line"><span style="color:#e1e4e8;"># 升级安装 elrepo</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-5.el7.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"># 载入 elrepo-kernel 元数据</span></span>
<span class="line"><span style="color:#e1e4e8;">yum --disablerepo=\\* --enablerepo=elrepo-kernel repolist</span></span>
<span class="line"><span style="color:#e1e4e8;"># 安装最新版本的内核</span></span>
<span class="line"><span style="color:#e1e4e8;">yum --disablerepo=\\* --enablerepo=elrepo-kernel install  kernel-ml.x86_64  -y</span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除旧版本工具包</span></span>
<span class="line"><span style="color:#e1e4e8;">yum remove kernel-tools-libs.x86_64 kernel-tools.x86_64  -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 载入公钥</span></span>
<span class="line"><span style="color:#24292e;">rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org</span></span>
<span class="line"><span style="color:#24292e;"># 升级安装 elrepo</span></span>
<span class="line"><span style="color:#24292e;">rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-5.el7.elrepo.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;"># 载入 elrepo-kernel 元数据</span></span>
<span class="line"><span style="color:#24292e;">yum --disablerepo=\\* --enablerepo=elrepo-kernel repolist</span></span>
<span class="line"><span style="color:#24292e;"># 安装最新版本的内核</span></span>
<span class="line"><span style="color:#24292e;">yum --disablerepo=\\* --enablerepo=elrepo-kernel install  kernel-ml.x86_64  -y</span></span>
<span class="line"><span style="color:#24292e;"># 删除旧版本工具包</span></span>
<span class="line"><span style="color:#24292e;">yum remove kernel-tools-libs.x86_64 kernel-tools.x86_64  -y</span></span></code></pre></div><h2 id="修改默认内核版本" tabindex="-1">修改默认内核版本 <a class="header-anchor" href="#修改默认内核版本" aria-label="Permalink to &quot;修改默认内核版本&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看当前实际启动顺序</span></span>
<span class="line"><span style="color:#e1e4e8;">grub2-editenv list</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看内核插入顺序</span></span>
<span class="line"><span style="color:#e1e4e8;">grep &quot;^menuentry&quot; /boot/grub2/grub.cfg | cut -d &quot;&#39;&quot; -f2</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置默认启动</span></span>
<span class="line"><span style="color:#e1e4e8;">grub2-set-default &#39;CentOS Linux (5.15.2-1.el7.elrepo.x86_64) 7 (Core)&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 重新创建内核配置</span></span>
<span class="line"><span style="color:#e1e4e8;">grub2-mkconfig -o /boot/grub2/grub.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">reboot</span></span>
<span class="line"><span style="color:#e1e4e8;"># 验证当前内核版本</span></span>
<span class="line"><span style="color:#e1e4e8;">uname -r</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看当前实际启动顺序</span></span>
<span class="line"><span style="color:#24292e;">grub2-editenv list</span></span>
<span class="line"><span style="color:#24292e;"># 查看内核插入顺序</span></span>
<span class="line"><span style="color:#24292e;">grep &quot;^menuentry&quot; /boot/grub2/grub.cfg | cut -d &quot;&#39;&quot; -f2</span></span>
<span class="line"><span style="color:#24292e;"># 设置默认启动</span></span>
<span class="line"><span style="color:#24292e;">grub2-set-default &#39;CentOS Linux (5.15.2-1.el7.elrepo.x86_64) 7 (Core)&#39;</span></span>
<span class="line"><span style="color:#24292e;"># 重新创建内核配置</span></span>
<span class="line"><span style="color:#24292e;">grub2-mkconfig -o /boot/grub2/grub.cfg</span></span>
<span class="line"><span style="color:#24292e;"># 重启服务器</span></span>
<span class="line"><span style="color:#24292e;">reboot</span></span>
<span class="line"><span style="color:#24292e;"># 验证当前内核版本</span></span>
<span class="line"><span style="color:#24292e;">uname -r</span></span></code></pre></div><blockquote><p>内核版本一定要是比较高的，不然启动<code>WireGuard</code>会有如下报错</p><p>[#] ip link add wg0 type wireguard RTNETLINK answers: Operation not supported Unable to access interface: Protocol not supported [#] ip link delete dev wg0 Cannot find device &quot;wg0&quot;</p></blockquote><h2 id="server端安装" tabindex="-1">server端安装 <a class="header-anchor" href="#server端安装" aria-label="Permalink to &quot;server端安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#标准内核 ，所有节点执行</span></span>
<span class="line"><span style="color:#e1e4e8;">$ yum install epel-release elrepo-release</span></span>
<span class="line"><span style="color:#e1e4e8;">$ yum install yum-plugin-elrepo kmod-wireguard wireguard-tools</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i wg0 -o wg0 -m conntrack --ctstate NEW -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -A POSTROUTING -s 192.168.1.1/24 -o eth0 -j MASQUERADE  （根据各个节点虚拟ip写）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#标准内核 ，所有节点执行</span></span>
<span class="line"><span style="color:#24292e;">$ yum install epel-release elrepo-release</span></span>
<span class="line"><span style="color:#24292e;">$ yum install yum-plugin-elrepo kmod-wireguard wireguard-tools</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i wg0 -o wg0 -m conntrack --ctstate NEW -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -A POSTROUTING -s 192.168.1.1/24 -o eth0 -j MASQUERADE  （根据各个节点虚拟ip写）</span></span></code></pre></div><h3 id="gateway-配置" tabindex="-1">gateway 配置 <a class="header-anchor" href="#gateway-配置" aria-label="Permalink to &quot;gateway 配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd 到wireguard 目录生成服务器私钥和公钥 privatekey、publickey；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">公钥私钥成对出现，如果丢了，可以重新用此命令生成</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">ListenPort = 12000</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 5.5.5.1/24</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = \${GATEWAY_SERVER_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">DNS = 114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;">MTU = 1420</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg-quick up wg0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd 到wireguard 目录生成服务器私钥和公钥 privatekey、publickey；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">公钥私钥成对出现，如果丢了，可以重新用此命令生成</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">ListenPort = 12000</span></span>
<span class="line"><span style="color:#24292e;">Address = 5.5.5.1/24</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = \${GATEWAY_SERVER_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#24292e;">DNS = 114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;">MTU = 1420</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg-quick up wg0</span></span></code></pre></div><h3 id="nat-a-配置" tabindex="-1">NAT-A 配置 <a class="header-anchor" href="#nat-a-配置" aria-label="Permalink to &quot;NAT-A 配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 5.5.5.4/24</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = \${NAT_A_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = \${GATEWAY_SERVER_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs =  5.5.5.0/24</span></span>
<span class="line"><span style="color:#e1e4e8;">Endpoint = \${GATEWAY_SERVER:12000}</span></span>
<span class="line"><span style="color:#e1e4e8;">PersistentKeepalive = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#启动服务</span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg-quick up wg0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">Address = 5.5.5.4/24</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = \${NAT_A_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#24292e;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = \${GATEWAY_SERVER_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs =  5.5.5.0/24</span></span>
<span class="line"><span style="color:#24292e;">Endpoint = \${GATEWAY_SERVER:12000}</span></span>
<span class="line"><span style="color:#24292e;">PersistentKeepalive = 10</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#启动服务</span></span>
<span class="line"><span style="color:#24292e;">$ wg-quick up wg0</span></span></code></pre></div><h3 id="nat-d-配置" tabindex="-1">NAT-D 配置 <a class="header-anchor" href="#nat-d-配置" aria-label="Permalink to &quot;NAT-D 配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 5.5.5.2/24</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = \${NAT_D_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = \${GATEWAY_SERVER_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs =  5.5.5.0/24</span></span>
<span class="line"><span style="color:#e1e4e8;">Endpoint = \${GATEWAY_SERVER:12000}</span></span>
<span class="line"><span style="color:#e1e4e8;">PersistentKeepalive = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg-quick up wg0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">Address = 5.5.5.2/24</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = \${NAT_D_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#24292e;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = \${GATEWAY_SERVER_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs =  5.5.5.0/24</span></span>
<span class="line"><span style="color:#24292e;">Endpoint = \${GATEWAY_SERVER:12000}</span></span>
<span class="line"><span style="color:#24292e;">PersistentKeepalive = 10</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg-quick up wg0</span></span></code></pre></div><h3 id="nat-c-配置" tabindex="-1">NAT-C 配置 <a class="header-anchor" href="#nat-c-配置" aria-label="Permalink to &quot;NAT-C 配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 5.5.5.3/24</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = \${NAT_C_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = \${GATEWAY_SERVER_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs =  5.5.5.0/24</span></span>
<span class="line"><span style="color:#e1e4e8;">Endpoint = \${GATEWAY_SERVER:12000}</span></span>
<span class="line"><span style="color:#e1e4e8;">PersistentKeepalive = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg-quick up wg0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ cat &gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">Address = 5.5.5.3/24</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = \${NAT_C_PRIVATE_KEY}</span></span>
<span class="line"><span style="color:#24292e;">PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = \${GATEWAY_SERVER_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs =  5.5.5.0/24</span></span>
<span class="line"><span style="color:#24292e;">Endpoint = \${GATEWAY_SERVER:12000}</span></span>
<span class="line"><span style="color:#24292e;">PersistentKeepalive = 10</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg-quick up wg0</span></span></code></pre></div><h3 id="gateway-添加-peer" tabindex="-1">gateway 添加 peer <a class="header-anchor" href="#gateway-添加-peer" aria-label="Permalink to &quot;gateway 添加 peer&quot;">​</a></h3><p>在所有的 wireguard 节点配置好之后，要在 gateway 节点添加 peer 的信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ cat &gt;&gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = \${NAT_A_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 5.5.5.4/32</span></span>
<span class="line"><span style="color:#e1e4e8;">PersistentKeepalive = 25</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = \${NAT_C_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 5.5.5.3/32</span></span>
<span class="line"><span style="color:#e1e4e8;">PersistentKeepalive = 25</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = \${NAT_D_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 5.5.5.2/32</span></span>
<span class="line"><span style="color:#e1e4e8;">PersistentKeepalive = 25</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ wg-quick down wg0 &amp;&amp; wg-quick up wg0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cd /etc/wireguard</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ cat &gt;&gt; wg0.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = \${NAT_A_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 5.5.5.4/32</span></span>
<span class="line"><span style="color:#24292e;">PersistentKeepalive = 25</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = \${NAT_C_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 5.5.5.3/32</span></span>
<span class="line"><span style="color:#24292e;">PersistentKeepalive = 25</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = \${NAT_D_PUBLIC_KEY}</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 5.5.5.2/32</span></span>
<span class="line"><span style="color:#24292e;">PersistentKeepalive = 25</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ wg-quick down wg0 &amp;&amp; wg-quick up wg0</span></span></code></pre></div><h3 id="连接测试" tabindex="-1">连接测试 <a class="header-anchor" href="#连接测试" aria-label="Permalink to &quot;连接测试&quot;">​</a></h3><h2 id="wireguard-服务操作命令" tabindex="-1">wireguard 服务操作命令 <a class="header-anchor" href="#wireguard-服务操作命令" aria-label="Permalink to &quot;wireguard 服务操作命令&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">## 运行</span></span>
<span class="line"><span style="color:#e1e4e8;">wg-quick up wg0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 查看连接状态</span></span>
<span class="line"><span style="color:#e1e4e8;">wg</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 设置开机自启</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable wg-quick@wg0.service</span></span>
<span class="line"><span style="color:#e1e4e8;">## 重载 每次加完VPC中继器后运行下 实际上根据经验还是有点问题，新加入的VPC可能连不上，还是需要先down然后up服务端(会引起所有VPC的短暂失联)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl reload wg-quick@wg0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 停止</span></span>
<span class="line"><span style="color:#e1e4e8;">wg-quick down wg0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定路径</span></span>
<span class="line"><span style="color:#e1e4e8;">wg-quick up /path/to/wg0.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除peer</span></span>
<span class="line"><span style="color:#e1e4e8;">wg-quick down wg0</span></span>
<span class="line"><span style="color:#e1e4e8;">wg set wg0 peer $(cat cpublickey1) remove</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#最好是到/etc/wireguard/ 执行命令</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">## 运行</span></span>
<span class="line"><span style="color:#24292e;">wg-quick up wg0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 查看连接状态</span></span>
<span class="line"><span style="color:#24292e;">wg</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 设置开机自启</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable wg-quick@wg0.service</span></span>
<span class="line"><span style="color:#24292e;">## 重载 每次加完VPC中继器后运行下 实际上根据经验还是有点问题，新加入的VPC可能连不上，还是需要先down然后up服务端(会引起所有VPC的短暂失联)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl reload wg-quick@wg0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 停止</span></span>
<span class="line"><span style="color:#24292e;">wg-quick down wg0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定路径</span></span>
<span class="line"><span style="color:#24292e;">wg-quick up /path/to/wg0.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 删除peer</span></span>
<span class="line"><span style="color:#24292e;">wg-quick down wg0</span></span>
<span class="line"><span style="color:#24292e;">wg set wg0 peer $(cat cpublickey1) remove</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#最好是到/etc/wireguard/ 执行命令</span></span></code></pre></div><h2 id="热加载" tabindex="-1">热加载 <a class="header-anchor" href="#热加载" aria-label="Permalink to &quot;热加载&quot;">​</a></h2><p>wg-quick并未提供重载相关的指令，但是提供了 <code>strip</code> 指令，可以将 conf 文件转换为 wg 指令可以识别的格式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wg syncconf wg0 &lt;(wg-quick strip wg0)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wg syncconf wg0 &lt;(wg-quick strip wg0)</span></span></code></pre></div><h2 id="配置讲解" tabindex="-1">配置讲解 <a class="header-anchor" href="#配置讲解" aria-label="Permalink to &quot;配置讲解&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = 【客户端私钥】</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 10.12.0.2/16</span></span>
<span class="line"><span style="color:#e1e4e8;">DNS = 114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;">MTU = 1420</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PreUp = iptables -t nat -A POSTROUTING -s 192.168.0.0/16 -o wg0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">PostUp   = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -A FORWARD -o wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -D FORWARD -o wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = 【服务端公钥】</span></span>
<span class="line"><span style="color:#e1e4e8;">Endpoint = 【服务端IP:51820】</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 10.12.0.0/16,10.10.0.0/24</span></span>
<span class="line"><span style="color:#e1e4e8;">PersistentKeepalive = 25</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = 【客户端私钥】</span></span>
<span class="line"><span style="color:#24292e;">Address = 10.12.0.2/16</span></span>
<span class="line"><span style="color:#24292e;">DNS = 114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;">MTU = 1420</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PreUp = iptables -t nat -A POSTROUTING -s 192.168.0.0/16 -o wg0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">PostUp   = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -A FORWARD -o wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -D FORWARD -o wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = 【服务端公钥】</span></span>
<span class="line"><span style="color:#24292e;">Endpoint = 【服务端IP:51820】</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 10.12.0.0/16,10.10.0.0/24</span></span>
<span class="line"><span style="color:#24292e;">PersistentKeepalive = 25</span></span></code></pre></div><ul><li>Address 中继器的 wg 虚拟 IP</li><li>AllowedIPs 第一个 IP 填写的是一样的 10.12.0.0/16 代表 wireguard 的虚拟 IP 网段，后面加的是此 VPC 相访问的其他 VPC 的本地 IP 网段，不能写服务端外网ip段和本机内网ip段，只需要写本机想通过vpn组网要访问到哪个网段</li><li>PersistentKeepalive 是保持连接的间隔</li></ul><h1 id="_3-转发所有流量" tabindex="-1">3.转发所有流量 <a class="header-anchor" href="#_3-转发所有流量" aria-label="Permalink to &quot;3.转发所有流量&quot;">​</a></h1><p>如果你想通过 VPN 转发所有的流量，包括 VPN 子网和公网流量，需要在 <code>[Peer]</code> 的 <code>AllowedIPs</code> 中添加 <code>0.0.0.0/0, ::/0</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;"># Name = phone.example-vpn.dev</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 192.0.2.3/32</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = &lt;private key for phone.example-vpn.dev&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;"># Name = public-server1.example-vpn.dev</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = &lt;public key for public-server1.example-vpn.dev&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">Endpoint = public-server1.example-vpn.dev:51820</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 0.0.0.0/0, ::/0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;"># Name = phone.example-vpn.dev</span></span>
<span class="line"><span style="color:#24292e;">Address = 192.0.2.3/32</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = &lt;private key for phone.example-vpn.dev&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;"># Name = public-server1.example-vpn.dev</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = &lt;public key for public-server1.example-vpn.dev&gt;</span></span>
<span class="line"><span style="color:#24292e;">Endpoint = public-server1.example-vpn.dev:51820</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 0.0.0.0/0, ::/0</span></span></code></pre></div><h1 id="_3-client端" tabindex="-1">3.client端 <a class="header-anchor" href="#_3-client端" aria-label="Permalink to &quot;3.client端&quot;">​</a></h1><h2 id="win" tabindex="-1">win <a class="header-anchor" href="#win" aria-label="Permalink to &quot;win&quot;">​</a></h2><p><a href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer">https://www.wireguard.com/install/</a></p><p>Windows [7, 8.1, 10, 11, 2008R2, 2012R2, 2016, 2019, 2022 – v0.5.3]</p><p><a href="https://download.wireguard.com/windows-client/wireguard-installer.exe" target="_blank" rel="noreferrer"> Download Windows Installer</a><a href="https://download.wireguard.com/windows-client/" target="_blank" rel="noreferrer">Browse MSIs</a></p><p><a href="https://ccstudio.com.cn/linux/part3/wg.html" target="_blank" rel="noreferrer">https://ccstudio.com.cn/linux/part3/wg.html</a></p><h2 id="mac" tabindex="-1">mac <a class="header-anchor" href="#mac" aria-label="Permalink to &quot;mac&quot;">​</a></h2><p>macOS [<a href="https://itunes.apple.com/us/app/wireguard/id1451685025?ls=1&amp;mt=12" target="_blank" rel="noreferrer">app store</a> – v1.0.15]</p><p><a href="https://itunes.apple.com/us/app/wireguard/id1451685025?ls=1&amp;mt=12" target="_blank" rel="noreferrer"> Download from App Store</a></p><ul><li>参考</li></ul><p><a href="https://fuckcloudnative.io/posts/wireguard-docs-practice/" target="_blank" rel="noreferrer">https://fuckcloudnative.io/posts/wireguard-docs-practice/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 允许客户端访问服务器端所有局域网（即PC-to-LAN，一般采用这种模式）</span></span>
<span class="line"><span style="color:#e1e4e8;"># 基于基本场景还需执行以下设置：## on server：</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加vpn网段路由到服务器端企业路由器</span></span>
<span class="line"><span style="color:#e1e4e8;"># 172.30.0.0/24 via [本机的局域网ip]## on client：</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加server端网段到本机路由表</span></span>
<span class="line"><span style="color:#e1e4e8;">ip route add 10.1.0.0/16 via 172.30.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;"># 允许server端网络访问client端（无需ip link down + up；这里0.0.0.0/0代表所有网络）</span></span>
<span class="line"><span style="color:#e1e4e8;">wg set wg0 peer dLssxxxxxxxxxxxxxxxxxq98NQKOivi3MN/VM= persistent-keepalive 25 allowed-ips 172.30.0.1/32,0.0.0.0/0 endpoint 192.168.11.29:51820</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 允许客户端访问服务器端所有局域网（即PC-to-LAN，一般采用这种模式）</span></span>
<span class="line"><span style="color:#24292e;"># 基于基本场景还需执行以下设置：## on server：</span></span>
<span class="line"><span style="color:#24292e;"># 添加vpn网段路由到服务器端企业路由器</span></span>
<span class="line"><span style="color:#24292e;"># 172.30.0.0/24 via [本机的局域网ip]## on client：</span></span>
<span class="line"><span style="color:#24292e;"># 添加server端网段到本机路由表</span></span>
<span class="line"><span style="color:#24292e;">ip route add 10.1.0.0/16 via 172.30.0.1</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;"># 允许server端网络访问client端（无需ip link down + up；这里0.0.0.0/0代表所有网络）</span></span>
<span class="line"><span style="color:#24292e;">wg set wg0 peer dLssxxxxxxxxxxxxxxxxxq98NQKOivi3MN/VM= persistent-keepalive 25 allowed-ips 172.30.0.1/32,0.0.0.0/0 endpoint 192.168.11.29:51820</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 将两边的局域网连成一个整体的局域网（即LAN-to-LAN）</span></span>
<span class="line"><span style="color:#e1e4e8;"># 基于基本场景还需执行以下设置：## on server：</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加vpn网段路由到服务器端企业路由器</span></span>
<span class="line"><span style="color:#e1e4e8;"># 172.30.0.0/24 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加client端网段路由到服务器端企业路由器</span></span>
<span class="line"><span style="color:#e1e4e8;"># 192.168.2.0/24 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#e1e4e8;"># ...</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加client端网段路由到本机路由表</span></span>
<span class="line"><span style="color:#e1e4e8;">ip route add 192.168.0.0/16 via 172.30.0.2</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;"># 允许client端访问server端网络（无需ip link down + up）</span></span>
<span class="line"><span style="color:#e1e4e8;">wg set wg0 peer VbR3Kxgxxxxxxxxxxxxxxxxxzq3H4ebdgTng= allowed-ips 172.30.0.2/32,192.168.0.0/24## on client：</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加vpn网段路由到客户端企业路由器</span></span>
<span class="line"><span style="color:#e1e4e8;"># 172.30.0.0/24 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加server端网段路由到客户端企业路由器</span></span>
<span class="line"><span style="color:#e1e4e8;"># 10.1.0.0/16 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#e1e4e8;"># ...</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加server端网段路由到本机路由表</span></span>
<span class="line"><span style="color:#e1e4e8;">ip route add 10.1.0.0/16 via 172.30.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;"># 允许server端访问client端网络（无需ip link down + up；0.0.0.0/0代表所有网络）</span></span>
<span class="line"><span style="color:#e1e4e8;">wg set wg0 peer dLssxxxxxxxxxxxxxxxxx98NQKOivi3MN/VM= persistent-keepalive 25 allowed-ips 172.30.0.1/32,0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 将两边的局域网连成一个整体的局域网（即LAN-to-LAN）</span></span>
<span class="line"><span style="color:#24292e;"># 基于基本场景还需执行以下设置：## on server：</span></span>
<span class="line"><span style="color:#24292e;"># 添加vpn网段路由到服务器端企业路由器</span></span>
<span class="line"><span style="color:#24292e;"># 172.30.0.0/24 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#24292e;"># 添加client端网段路由到服务器端企业路由器</span></span>
<span class="line"><span style="color:#24292e;"># 192.168.2.0/24 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#24292e;"># ...</span></span>
<span class="line"><span style="color:#24292e;"># 添加client端网段路由到本机路由表</span></span>
<span class="line"><span style="color:#24292e;">ip route add 192.168.0.0/16 via 172.30.0.2</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;"># 允许client端访问server端网络（无需ip link down + up）</span></span>
<span class="line"><span style="color:#24292e;">wg set wg0 peer VbR3Kxgxxxxxxxxxxxxxxxxxzq3H4ebdgTng= allowed-ips 172.30.0.2/32,192.168.0.0/24## on client：</span></span>
<span class="line"><span style="color:#24292e;"># 添加vpn网段路由到客户端企业路由器</span></span>
<span class="line"><span style="color:#24292e;"># 172.30.0.0/24 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#24292e;"># 添加server端网段路由到客户端企业路由器</span></span>
<span class="line"><span style="color:#24292e;"># 10.1.0.0/16 via [本机的局域网ip]</span></span>
<span class="line"><span style="color:#24292e;"># ...</span></span>
<span class="line"><span style="color:#24292e;"># 添加server端网段路由到本机路由表</span></span>
<span class="line"><span style="color:#24292e;">ip route add 10.1.0.0/16 via 172.30.0.1</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;"># 允许server端访问client端网络（无需ip link down + up；0.0.0.0/0代表所有网络）</span></span>
<span class="line"><span style="color:#24292e;">wg set wg0 peer dLssxxxxxxxxxxxxxxxxx98NQKOivi3MN/VM= persistent-keepalive 25 allowed-ips 172.30.0.1/32,0</span></span></code></pre></div><h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><table><thead><tr><th style="text-align:left;">云厂商</th><th style="text-align:left;">公网IP地址</th><th style="text-align:left;">内网IP地址</th><th style="text-align:left;">虚拟网络IP地址</th><th style="text-align:left;">操作系统</th><th style="text-align:left;">内核版本</th></tr></thead><tbody><tr><td style="text-align:left;">腾讯云1，master</td><td style="text-align:left;">42.xx.xx.12</td><td style="text-align:left;">10.0.16.8</td><td style="text-align:left;">192.168.1.1</td><td style="text-align:left;">CentOS Linux release 7.9.2009 (Core)</td><td style="text-align:left;">5.15.2-1</td></tr><tr><td style="text-align:left;">腾讯云2</td><td style="text-align:left;">122.xx.xxx.111</td><td style="text-align:left;">10.0.0.6</td><td style="text-align:left;">192.168.1.2</td><td style="text-align:left;">CentOS Linux release 7.9.2009 (Core)</td><td style="text-align:left;">5.15.2-1</td></tr><tr><td style="text-align:left;">阿里云</td><td style="text-align:left;">122.xx.xx.155</td><td style="text-align:left;">172.17.0.3</td><td style="text-align:left;">192.168.1.3</td><td style="text-align:left;">CentOS Linux release 7.9.2009 (Core)</td><td style="text-align:left;">5.15.2-1</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># master 节点</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = EMWcI01iqM4zkb7xfbaaxxxxxxxxDo2GJUA=</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 192.168.1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">ListenPort = 5418</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = 3izpVbZgPhlM+S5szOogTDTxxxxxxxxxuKuDGn4=</span></span>
<span class="line"><span style="color:#e1e4e8;">EndPoint = 122.xx.xxx.111:5418</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 192.168.1.2/32</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = 0f0dn60+tBUfYgzw7rIihKbqxxxxxxxxa6Wo=</span></span>
<span class="line"><span style="color:#e1e4e8;">EndPoint = 122.xx.xx.155:5418</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 192.168.1.3/32</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># master 节点</span></span>
<span class="line"><span style="color:#24292e;">cat /etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = EMWcI01iqM4zkb7xfbaaxxxxxxxxDo2GJUA=</span></span>
<span class="line"><span style="color:#24292e;">Address = 192.168.1.1</span></span>
<span class="line"><span style="color:#24292e;">ListenPort = 5418</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = 3izpVbZgPhlM+S5szOogTDTxxxxxxxxxuKuDGn4=</span></span>
<span class="line"><span style="color:#24292e;">EndPoint = 122.xx.xxx.111:5418</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 192.168.1.2/32</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = 0f0dn60+tBUfYgzw7rIihKbqxxxxxxxxa6Wo=</span></span>
<span class="line"><span style="color:#24292e;">EndPoint = 122.xx.xx.155:5418</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 192.168.1.3/32</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># node1 节点</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = QGdNkzpnIkuvUU+00C6XYxxxxxxxxxK0D82qJVc=</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 192.168.1.2</span></span>
<span class="line"><span style="color:#e1e4e8;">ListenPort = 5418</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = 0ay8WfGOIHndWklSIVBqrsp5LDWxxxxxxxxxxxxxxQ=</span></span>
<span class="line"><span style="color:#e1e4e8;">EndPoint = 42.xxx.xx.16:5418</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 192.168.1.1/32</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = 0f0dn60+tBUfYgzw7rIihKbqxxxxxxxxa6Wo=</span></span>
<span class="line"><span style="color:#e1e4e8;">EndPoint = 122.xx.xx.155:5418</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 192.168.1.3/32</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># node1 节点</span></span>
<span class="line"><span style="color:#24292e;">cat /etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = QGdNkzpnIkuvUU+00C6XYxxxxxxxxxK0D82qJVc=</span></span>
<span class="line"><span style="color:#24292e;">Address = 192.168.1.2</span></span>
<span class="line"><span style="color:#24292e;">ListenPort = 5418</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = 0ay8WfGOIHndWklSIVBqrsp5LDWxxxxxxxxxxxxxxQ=</span></span>
<span class="line"><span style="color:#24292e;">EndPoint = 42.xxx.xx.16:5418</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 192.168.1.1/32</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = 0f0dn60+tBUfYgzw7rIihKbqxxxxxxxxa6Wo=</span></span>
<span class="line"><span style="color:#24292e;">EndPoint = 122.xx.xx.155:5418</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 192.168.1.3/32</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># node2 节点</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[Interface]</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateKey = WOOObkWINkW/hqaAME9r+xxxxxxxxxm+r2Q=</span></span>
<span class="line"><span style="color:#e1e4e8;">Address = 192.168.1.3</span></span>
<span class="line"><span style="color:#e1e4e8;">ListenPort = 5418</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = 0ay8WfGOIHndWklSIVBqrsp5LDWxxxxxxxxxxxxxxQ=</span></span>
<span class="line"><span style="color:#e1e4e8;">EndPoint = 42.xxx.xx.16:5418</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 192.168.1.1/32</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Peer]</span></span>
<span class="line"><span style="color:#e1e4e8;">PublicKey = 3izpVbZgPhlM+S5szOogTDTxxxxxxxxxuKuDGn4=</span></span>
<span class="line"><span style="color:#e1e4e8;">EndPoint = 122.xx.xx.155:5418</span></span>
<span class="line"><span style="color:#e1e4e8;">AllowedIPs = 192.168.1.2/32</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># node2 节点</span></span>
<span class="line"><span style="color:#24292e;">cat /etc/wireguard/wg0.conf</span></span>
<span class="line"><span style="color:#24292e;">[Interface]</span></span>
<span class="line"><span style="color:#24292e;">PrivateKey = WOOObkWINkW/hqaAME9r+xxxxxxxxxm+r2Q=</span></span>
<span class="line"><span style="color:#24292e;">Address = 192.168.1.3</span></span>
<span class="line"><span style="color:#24292e;">ListenPort = 5418</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = 0ay8WfGOIHndWklSIVBqrsp5LDWxxxxxxxxxxxxxxQ=</span></span>
<span class="line"><span style="color:#24292e;">EndPoint = 42.xxx.xx.16:5418</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 192.168.1.1/32</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Peer]</span></span>
<span class="line"><span style="color:#24292e;">PublicKey = 3izpVbZgPhlM+S5szOogTDTxxxxxxxxxuKuDGn4=</span></span>
<span class="line"><span style="color:#24292e;">EndPoint = 122.xx.xx.155:5418</span></span>
<span class="line"><span style="color:#24292e;">AllowedIPs = 192.168.1.2/32</span></span></code></pre></div><h1 id="_4-分流案例" tabindex="-1">4.分流案例 <a class="header-anchor" href="#_4-分流案例" aria-label="Permalink to &quot;4.分流案例&quot;">​</a></h1><p>​ 官方的WireGuard并没有分流功能，对国内用户实在是不太友好。不过，NekoRay作为基于Sing-box开发的客户端，由于其上游Sing-box核心支持WireGuard的协议且支持分流，故我们可以使用NekoRay这个客户端，加上我们的WARP的WireGuard节点配置文件，就可以将WARP节点作为日常节点使用</p><ul><li>Windows / Linux 的电脑并安装 NekoRay</li></ul><h2 id="_4-1下载" tabindex="-1">4.1下载 <a class="header-anchor" href="#_4-1下载" aria-label="Permalink to &quot;4.1下载&quot;">​</a></h2><p><a href="https://github.com/MatsuriDayo/nekoray/releases" target="_blank" rel="noreferrer">https://github.com/MatsuriDayo/nekoray/releases</a></p><ul><li>打开Nekoray客户端，依次进入“程序”→“首选项”→“基本设置”→“核心”---&gt;&quot;选中sing-box&quot;</li><li>依次进入“程序”→“首选项”→“路由设置”</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201045500.jpg" alt=""></p><ul><li>点击预设中的“绕过局域网和大陆”，然后点击“确定”保存</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201045950.jpg" alt=""></p><ul><li>在主界面空白处右键，点击“手动输入配置”</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201045841.jpg" alt=""></p><ul><li>类型选择“自定义（Sing-box出站）”，名称自定义，然后底下的json内容可参考下方的模板【主要是替换优选Endpoint IP、公私钥和内网IP地址</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;interface_name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;WARP&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;local_address&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;172.16.0.2/32&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;2606:4700:110:87eb:73e4:1db0:3a8d:e8a4/128&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;mtu&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1408</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;peer_public_key&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;private_key&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;CE6ohzhrIpug28RfZocuutPdDZX+15xFDcpLGcZG730=&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;server&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;188.114.96.236&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;server_port&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">4233</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;system_interface&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;tag&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;proxy&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;wireguard&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;interface_name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;WARP&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;local_address&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;172.16.0.2/32&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;2606:4700:110:87eb:73e4:1db0:3a8d:e8a4/128&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;mtu&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1408</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;peer_public_key&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;private_key&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;CE6ohzhrIpug28RfZocuutPdDZX+15xFDcpLGcZG730=&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;server&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;188.114.96.236&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;server_port&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">4233</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;system_interface&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;tag&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;proxy&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;wireguard&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201046953.jpg" alt=""></p><ul><li>启动</li></ul><p>右键配置，启动</p><ul><li>测试是否分流</li></ul><p><a href="https://ip.skk.moe/" target="_blank" rel="noreferrer">https://ip.skk.moe/</a></p><p>参考文档：</p><p><a href="https://blog.misaka.rest/2023/03/25/nekoray-warp/" target="_blank" rel="noreferrer">https://blog.misaka.rest/2023/03/25/nekoray-warp/</a></p>`,92),o=[p];function t(c,r,i,y,d,u){return n(),a("div",null,o)}const h=s(l,[["render",t]]);export{x as __pageData,h as default};
