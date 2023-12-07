import{_ as s,o as n,c as a,R as e}from"./chunks/framework.PZ77rLUR.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/24_ocserv.md","filePath":"guide/Linux/vpn/24_ocserv.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/24_ocserv.md"},l=e(`<h2 id="_0-安装" tabindex="-1">0.安装 <a class="header-anchor" href="#_0-安装" aria-label="Permalink to &quot;0.安装&quot;">​</a></h2><p>官方文档，<a href="http://ocserv.gitlab.io/www/manual.html" target="_blank" rel="noreferrer">http://ocserv.gitlab.io/www/manual.html</a></p><p><a href="http://ocserv.gitlab.io/www/index.html" target="_blank" rel="noreferrer">http://ocserv.gitlab.io/www/index.html</a></p><p><a href="http://ocserv.gitlab.io/www/download.html" target="_blank" rel="noreferrer">http://ocserv.gitlab.io/www/download.html</a></p><p><a href="https://gitlab.com/openconnect/ocserv" target="_blank" rel="noreferrer">https://gitlab.com/openconnect/ocserv</a></p><h3 id="anyconnect特点" tabindex="-1">Anyconnect特点 <a class="header-anchor" href="#anyconnect特点" aria-label="Permalink to &quot;Anyconnect特点&quot;">​</a></h3><ul><li>AnyConnect的VPN协议默认使用UDP作为数据传输，但如果有什么网络问题导致UDP传输出现问题，它会利用最初建立的TCP TLS通道作为备份通道，降低VPN断开的概率。</li><li>AnyConnect作为Cisco新一代的VPN解决方案，被用于许多大型企业</li></ul><h3 id="检查ppp-tun环境" tabindex="-1">检查PPP/TUN环境 <a class="header-anchor" href="#检查ppp-tun环境" aria-label="Permalink to &quot;检查PPP/TUN环境&quot;">​</a></h3><p>首先要检查VPS的TUN是否开启(OpenVZ虚拟化的服务器很可能默认关闭)。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /dev/net/tun</span></span>
<span class="line"><span style="color:#e1e4e8;"># 返回的必须是：</span></span>
<span class="line"><span style="color:#e1e4e8;">cat: /dev/net/tun: File descriptor in bad state</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /dev/net/tun</span></span>
<span class="line"><span style="color:#24292e;"># 返回的必须是：</span></span>
<span class="line"><span style="color:#24292e;">cat: /dev/net/tun: File descriptor in bad state</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#iptables</span></span>
<span class="line"><span style="color:#e1e4e8;">#自动调整MTU</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -I FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开启 NAT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -I INPUT -p tcp --dport 10028 -j ACCEPT # 端口应与ocserv配置中配置的端口对应</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -I INPUT -p udp --dport 10028 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---- test</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-port=10028/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-port=10028/udp</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-masquerade</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开启 IPv4 转发</span></span>
<span class="line"><span style="color:#e1e4e8;">sysctl -w net.ipv4.ip_forward=1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 或修改配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">vi /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.conf.all.proxy_arp = 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">iptables-save &gt; /etc/iptables.rules</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --zone=public --add-port=2233/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --zone=public --add-port=2233/udp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-masquerade</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#iptables</span></span>
<span class="line"><span style="color:#24292e;">#自动调整MTU</span></span>
<span class="line"><span style="color:#24292e;">iptables -I FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开启 NAT</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">iptables -I INPUT -p tcp --dport 10028 -j ACCEPT # 端口应与ocserv配置中配置的端口对应</span></span>
<span class="line"><span style="color:#24292e;">iptables -I INPUT -p udp --dport 10028 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---- test</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-port=10028/tcp</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-port=10028/udp</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-masquerade</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开启 IPv4 转发</span></span>
<span class="line"><span style="color:#24292e;">sysctl -w net.ipv4.ip_forward=1</span></span>
<span class="line"><span style="color:#24292e;"># 或修改配置文件</span></span>
<span class="line"><span style="color:#24292e;">vi /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.conf.all.proxy_arp = 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">iptables-save &gt; /etc/iptables.rules</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --zone=public --add-port=2233/tcp</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --zone=public --add-port=2233/udp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-masquerade</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span></code></pre></div><p>安装结束，访问<a href="https://xxx.com" target="_blank" rel="noreferrer">https://xxx.com</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201047832.jpg" alt=""></p><h3 id="连接" tabindex="-1">连接 <a class="header-anchor" href="#连接" aria-label="Permalink to &quot;连接&quot;">​</a></h3><h4 id="win" tabindex="-1">win： <a class="header-anchor" href="#win" aria-label="Permalink to &quot;win：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#链接正常之后，服务端显示结果</span></span>
<span class="line"><span style="color:#e1e4e8;">11: vpns0: &lt;POINTOPOINT,UP,LOWER_UP&gt; mtu 1326 qdisc pfifo_fast state UNKNOWN group default qlen 500</span></span>
<span class="line"><span style="color:#e1e4e8;">    link/none </span></span>
<span class="line"><span style="color:#e1e4e8;">    inet 192.168.8.1 peer 192.168.8.242/32 scope global vpns0</span></span>
<span class="line"><span style="color:#e1e4e8;">       valid_lft forever preferred_lft forever</span></span>
<span class="line"><span style="color:#e1e4e8;">    inet6 fe80::b0ad:1e0f:6b17:e07d/64 scope link flags 800 </span></span>
<span class="line"><span style="color:#e1e4e8;">       valid_lft forever preferred_lft forever</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#链接正常之后，服务端显示结果</span></span>
<span class="line"><span style="color:#24292e;">11: vpns0: &lt;POINTOPOINT,UP,LOWER_UP&gt; mtu 1326 qdisc pfifo_fast state UNKNOWN group default qlen 500</span></span>
<span class="line"><span style="color:#24292e;">    link/none </span></span>
<span class="line"><span style="color:#24292e;">    inet 192.168.8.1 peer 192.168.8.242/32 scope global vpns0</span></span>
<span class="line"><span style="color:#24292e;">       valid_lft forever preferred_lft forever</span></span>
<span class="line"><span style="color:#24292e;">    inet6 fe80::b0ad:1e0f:6b17:e07d/64 scope link flags 800 </span></span>
<span class="line"><span style="color:#24292e;">       valid_lft forever preferred_lft forever</span></span></code></pre></div><h3 id="配置ocserv" tabindex="-1">配置ocserv <a class="header-anchor" href="#配置ocserv" aria-label="Permalink to &quot;配置ocserv&quot;">​</a></h3><p>Ocserv提供了多种认证登录方式.主要有:</p><ul><li>pam本地系统账户</li><li>ocsrev创建的明文账户(需要指定passwd密码文件.下面我指定的是/etc/ocserv/ocpasswd)</li><li>certificate证书认证</li><li>redius认证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$grep -A 5 &quot;#auth&quot; /etc/ocserv/ocserv.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;pam&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;pam[gid-min=1000]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;radius[config=/etc/radiusclient/radiusclient.conf,groupconfig=true]&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$grep -A 5 &quot;#auth&quot; /etc/ocserv/ocserv.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;pam&quot;</span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;pam[gid-min=1000]&quot;</span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span>
<span class="line"><span style="color:#24292e;">auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;radius[config=/etc/radiusclient/radiusclient.conf,groupconfig=true]&quot;</span></span></code></pre></div><h3 id="配置文件解析" tabindex="-1">配置文件解析 <a class="header-anchor" href="#配置文件解析" aria-label="Permalink to &quot;配置文件解析&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#认证方式,这里使用了certificate证书认证  </span></span>
<span class="line"><span style="color:#e1e4e8;">auth = &quot;certificate&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">#最大客户端连接数    </span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients = 50   </span></span>
<span class="line"><span style="color:#e1e4e8;">#同一客户端最大同时连接数    </span></span>
<span class="line"><span style="color:#e1e4e8;">max-same-clients = 10    </span></span>
<span class="line"><span style="color:#e1e4e8;">#优化VPN速度和稳定性 </span></span>
<span class="line"><span style="color:#e1e4e8;">try-mtu-discovery = true  </span></span>
<span class="line"><span style="color:#e1e4e8;">#服务端证书路径  </span></span>
<span class="line"><span style="color:#e1e4e8;">server-cert = /etc/ocserv/server-cert.pem  </span></span>
<span class="line"><span style="color:#e1e4e8;">#服务端key路径 </span></span>
<span class="line"><span style="color:#e1e4e8;">server-key = /etc/ocserv/server-key.pem  </span></span>
<span class="line"><span style="color:#e1e4e8;">#ca证书路径,如果是证书验证则需要开启这个参数,如果是密码认证,则注释掉  </span></span>
<span class="line"><span style="color:#e1e4e8;">ca-cert = /etc/ocserv/ca-cert.pem  </span></span>
<span class="line"><span style="color:#e1e4e8;"># 确保服务器正确读取用户证书（后面会用到用户证书） </span></span>
<span class="line"><span style="color:#e1e4e8;">cert-user-oid = 2.5.4.3  </span></span>
<span class="line"><span style="color:#e1e4e8;">#分发给VPN客户端的IP地址范围,DNS地址  </span></span>
<span class="line"><span style="color:#e1e4e8;">ipv4-network = 10.0.81.0  </span></span>
<span class="line"><span style="color:#e1e4e8;">ipv4-netmask = 255.255.255.0  </span></span>
<span class="line"><span style="color:#e1e4e8;">dns = 114.114.114.114  </span></span>
<span class="line"><span style="color:#e1e4e8;">#如果仅仅是访问以下内网地址则指定route参数,如果注释所有route参数则表示所有流量走VPN  </span></span>
<span class="line"><span style="color:#e1e4e8;">route = 10.0.0.0/255.255.255.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#认证方式,这里使用了certificate证书认证  </span></span>
<span class="line"><span style="color:#24292e;">auth = &quot;certificate&quot;  </span></span>
<span class="line"><span style="color:#24292e;">#最大客户端连接数    </span></span>
<span class="line"><span style="color:#24292e;">max-clients = 50   </span></span>
<span class="line"><span style="color:#24292e;">#同一客户端最大同时连接数    </span></span>
<span class="line"><span style="color:#24292e;">max-same-clients = 10    </span></span>
<span class="line"><span style="color:#24292e;">#优化VPN速度和稳定性 </span></span>
<span class="line"><span style="color:#24292e;">try-mtu-discovery = true  </span></span>
<span class="line"><span style="color:#24292e;">#服务端证书路径  </span></span>
<span class="line"><span style="color:#24292e;">server-cert = /etc/ocserv/server-cert.pem  </span></span>
<span class="line"><span style="color:#24292e;">#服务端key路径 </span></span>
<span class="line"><span style="color:#24292e;">server-key = /etc/ocserv/server-key.pem  </span></span>
<span class="line"><span style="color:#24292e;">#ca证书路径,如果是证书验证则需要开启这个参数,如果是密码认证,则注释掉  </span></span>
<span class="line"><span style="color:#24292e;">ca-cert = /etc/ocserv/ca-cert.pem  </span></span>
<span class="line"><span style="color:#24292e;"># 确保服务器正确读取用户证书（后面会用到用户证书） </span></span>
<span class="line"><span style="color:#24292e;">cert-user-oid = 2.5.4.3  </span></span>
<span class="line"><span style="color:#24292e;">#分发给VPN客户端的IP地址范围,DNS地址  </span></span>
<span class="line"><span style="color:#24292e;">ipv4-network = 10.0.81.0  </span></span>
<span class="line"><span style="color:#24292e;">ipv4-netmask = 255.255.255.0  </span></span>
<span class="line"><span style="color:#24292e;">dns = 114.114.114.114  </span></span>
<span class="line"><span style="color:#24292e;">#如果仅仅是访问以下内网地址则指定route参数,如果注释所有route参数则表示所有流量走VPN  </span></span>
<span class="line"><span style="color:#24292e;">route = 10.0.0.0/255.255.255.0</span></span></code></pre></div><h3 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-label="Permalink to &quot;优化&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">dpd = 900</span></span>
<span class="line"><span style="color:#e1e4e8;">mobile-dpd = 1800</span></span>
<span class="line"><span style="color:#e1e4e8;">output-buffer = 23000</span></span>
<span class="line"><span style="color:#e1e4e8;">idle-timeout = 3600</span></span>
<span class="line"><span style="color:#e1e4e8;">try-mtu-discovery = true</span></span>
<span class="line"><span style="color:#e1e4e8;">compression = true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">dpd = 900</span></span>
<span class="line"><span style="color:#24292e;">mobile-dpd = 1800</span></span>
<span class="line"><span style="color:#24292e;">output-buffer = 23000</span></span>
<span class="line"><span style="color:#24292e;">idle-timeout = 3600</span></span>
<span class="line"><span style="color:#24292e;">try-mtu-discovery = true</span></span>
<span class="line"><span style="color:#24292e;">compression = true</span></span></code></pre></div><h2 id="_1-命令操作" tabindex="-1">1.命令操作 <a class="header-anchor" href="#_1-命令操作" aria-label="Permalink to &quot;1.命令操作&quot;">​</a></h2><ul><li>查看版本</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#ocserv -v ocserv</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">ocserv</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#9ECBFF;">.6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Compiled</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">with:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">seccomp,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tcp-wrappers,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PKCS#11,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">AnyConnect</span></span>
<span class="line"><span style="color:#B392F0;">GnuTLS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3.5</span><span style="color:#9ECBFF;">.18</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#ocserv -v ocserv</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">ocserv</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#032F62;">.6</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Compiled</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">seccomp,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tcp-wrappers,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PKCS#11,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">AnyConnect</span></span>
<span class="line"><span style="color:#6F42C1;">GnuTLS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3.5</span><span style="color:#032F62;">.18</span></span></code></pre></div><h3 id="_1-1管理命令" tabindex="-1">1.1<strong>管理命令</strong> <a class="header-anchor" href="#_1-1管理命令" aria-label="Permalink to &quot;1.1**管理命令**&quot;">​</a></h3><p>查看服务状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">occtl -n show status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">occtl -n show status</span></span></code></pre></div><p>查看在线用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">occtl -n show users</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">occtl -n show users</span></span></code></pre></div><p>剔除当前用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">occtl disconnect user username</span></span>
<span class="line"><span style="color:#e1e4e8;">occtl disconnect id userid</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">occtl disconnect user username</span></span>
<span class="line"><span style="color:#24292e;">occtl disconnect id userid</span></span></code></pre></div><h3 id="_1-2用户管理" tabindex="-1">1.2<strong>用户管理</strong> <a class="header-anchor" href="#_1-2用户管理" aria-label="Permalink to &quot;1.2**用户管理**&quot;">​</a></h3><p>创建用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ocpasswd -c /etc/ocserv/ocpasswd username</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ocpasswd -c /etc/ocserv/ocpasswd username</span></span></code></pre></div><p>添加用户到组：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ocpasswd -c /etc/ocserv/ocpasswd -g groupname username</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ocpasswd -c /etc/ocserv/ocpasswd -g groupname username</span></span></code></pre></div><p>锁定用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ocpasswd -c /etc/ocserv/ocpasswd -l username</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ocpasswd -c /etc/ocserv/ocpasswd -l username</span></span></code></pre></div><p>解锁用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ocpasswd -c /etc/ocserv/ocpasswd -u username</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ocpasswd -c /etc/ocserv/ocpasswd -u username</span></span></code></pre></div><p>删除用户：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ocpasswd -c /etc/ocserv/ocpasswd -d username</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ocpasswd -c /etc/ocserv/ocpasswd -d username</span></span></code></pre></div><p><strong>更多命令：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">occtl --help</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">occtl --help</span></span></code></pre></div><h2 id="_2-ubuntu18-04" tabindex="-1">2.ubuntu18.04 <a class="header-anchor" href="#_2-ubuntu18-04" aria-label="Permalink to &quot;2.ubuntu18.04&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/etc/init.d/ocserv start</span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动 ocserv</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/ocserv stop</span></span>
<span class="line"><span style="color:#e1e4e8;"># 停止 ocserv</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/ocserv restart</span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启 ocserv</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/ocserv status</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看 ocserv 运行状态</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/ocserv log</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看 ocserv 运行日志</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/ocserv test</span></span>
<span class="line"><span style="color:#e1e4e8;"># 测试 ocserv 配置文件是否正确</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">配置文件：/etc/ocserv/ocserv.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">账号配置文件：/etc/ocserv/ocpasswd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">日志文件：/tmp/ocserv.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/etc/init.d/ocserv start</span></span>
<span class="line"><span style="color:#24292e;"># 启动 ocserv</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/ocserv stop</span></span>
<span class="line"><span style="color:#24292e;"># 停止 ocserv</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/ocserv restart</span></span>
<span class="line"><span style="color:#24292e;"># 重启 ocserv</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/ocserv status</span></span>
<span class="line"><span style="color:#24292e;"># 查看 ocserv 运行状态</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/ocserv log</span></span>
<span class="line"><span style="color:#24292e;"># 查看 ocserv 运行日志</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/ocserv test</span></span>
<span class="line"><span style="color:#24292e;"># 测试 ocserv 配置文件是否正确</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">配置文件：/etc/ocserv/ocserv.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">账号配置文件：/etc/ocserv/ocpasswd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">日志文件：/tmp/ocserv.log</span></span></code></pre></div><ol start="3"><li></li></ol><h2 id="_3-线上配置文件" tabindex="-1">3.线上配置文件 <a class="header-anchor" href="#_3-线上配置文件" aria-label="Permalink to &quot;3.线上配置文件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#listen-host = 127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp-port = 443</span></span>
<span class="line"><span style="color:#e1e4e8;">udp-port = 443</span></span>
<span class="line"><span style="color:#e1e4e8;">run-as-user = root</span></span>
<span class="line"><span style="color:#e1e4e8;">run-as-group = daemon</span></span>
<span class="line"><span style="color:#e1e4e8;">socket-file = /var/run/ocserv-socket</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server-cert = /etc/ocserv/ssl/9495244_sike.freehan.ink.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">server-key = /etc/ocserv/ssl/9495244_sike.freehan.ink.key.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">#server-cert = /etc/ocserv/ssl/server-cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">#server-key = /etc/ocserv/ssl/server-key.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">#ca-cert = /etc/ocserv/ssl/ca-cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">isolate-workers = true</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">max-same-clients = 2</span></span>
<span class="line"><span style="color:#e1e4e8;">rate-limit-ms = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">server-stats-reset-time = 604800</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive = 32400</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dpd = 900</span></span>
<span class="line"><span style="color:#e1e4e8;">mobile-dpd = 1900</span></span>
<span class="line"><span style="color:#e1e4e8;">switch-to-tcp-timeout = 25</span></span>
<span class="line"><span style="color:#e1e4e8;">try-mtu-discovery = true</span></span>
<span class="line"><span style="color:#e1e4e8;">compression = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tls-priorities = &quot;NORMAL:%SERVER_PRECEDENCE:%COMPAT:-RSA:-VERS-SSL3.0:-ARCFOUR-128:-VERS-TLS1.0:-VERS-TLS1.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-timeout = 240</span></span>
<span class="line"><span style="color:#e1e4e8;">idle-timeout = 86400</span></span>
<span class="line"><span style="color:#e1e4e8;">mobile-idle-timeout = 86400</span></span>
<span class="line"><span style="color:#e1e4e8;">min-reauth-time = 300</span></span>
<span class="line"><span style="color:#e1e4e8;">max-ban-score = 80</span></span>
<span class="line"><span style="color:#e1e4e8;">ban-reset-time = 1200</span></span>
<span class="line"><span style="color:#e1e4e8;">cookie-timeout = 300</span></span>
<span class="line"><span style="color:#e1e4e8;">deny-roaming = false</span></span>
<span class="line"><span style="color:#e1e4e8;">rekey-time = 172800</span></span>
<span class="line"><span style="color:#e1e4e8;">rekey-method = ssl</span></span>
<span class="line"><span style="color:#e1e4e8;">use-occtl = true</span></span>
<span class="line"><span style="color:#e1e4e8;">pid-file = /var/run/ocserv.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">net-priority = 6</span></span>
<span class="line"><span style="color:#e1e4e8;">device = vpns</span></span>
<span class="line"><span style="color:#e1e4e8;">predictable-ips = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">default-domain = sike.freehan.ink</span></span>
<span class="line"><span style="color:#e1e4e8;">#listen-proxy-proto = true</span></span>
<span class="line"><span style="color:#e1e4e8;">#proxy-url = https://sike.freehan.ink:443</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ipv4-network = 192.168.8.0</span></span>
<span class="line"><span style="color:#e1e4e8;">ipv4-netmask = 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"># An alternative way of specifying the network:</span></span>
<span class="line"><span style="color:#e1e4e8;">#ipv4-network = 192.168.1.0/24</span></span>
<span class="line"><span style="color:#e1e4e8;"># The IPv6 subnet that leases will be given from.</span></span>
<span class="line"><span style="color:#e1e4e8;">#ipv6-network = fda9:4efe:7e3b:03ea::/48 </span></span>
<span class="line"><span style="color:#e1e4e8;"># Specify the size of the network to provide to clients. It is</span></span>
<span class="line"><span style="color:#e1e4e8;"># generally recommended to provide clients with a /64 network in</span></span>
<span class="line"><span style="color:#e1e4e8;"># IPv6, but any subnet may be specified. To provide clients only</span></span>
<span class="line"><span style="color:#e1e4e8;"># with a single IP use the prefix 128.</span></span>
<span class="line"><span style="color:#e1e4e8;">#ipv6-subnet-prefix = 128</span></span>
<span class="line"><span style="color:#e1e4e8;">#ipv6-subnet-prefix = 64</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># tunnel-all-dns = true</span></span>
<span class="line"><span style="color:#e1e4e8;">dns = 8.8.8.8</span></span>
<span class="line"><span style="color:#e1e4e8;">dns = 8.8.4.4</span></span>
<span class="line"><span style="color:#e1e4e8;">ping-leases = false</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 1.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 1.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 1.112.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 1.176.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 1.192.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 14.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 14.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 14.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 14.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 27.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 27.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 27.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 27.176.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 27.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 27.224.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 36.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 36.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 36.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 36.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 36.240.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 39.0.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 39.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 39.96.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 39.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 40.72.0.0/255.254.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 40.124.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 42.0.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 42.48.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 42.80.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 42.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 42.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 43.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 45.65.16.0/255.255.240.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 45.112.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 45.248.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 47.92.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 47.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 49.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 49.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 49.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 52.80.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 54.222.0.0/255.254.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 58.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 58.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 58.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 58.240.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 59.32.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 59.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 59.96.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 59.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 59.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 59.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 60.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 60.48.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 60.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 60.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 61.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 61.80.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 61.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 61.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 91.234.36.0/255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 101.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 101.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 101.192.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 101.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 103.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 106.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 106.224.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 110.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 110.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 110.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 110.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 111.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 111.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 111.112.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 111.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 111.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 111.224.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 112.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 112.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 112.192.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 112.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 113.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 113.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 113.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 114.16.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 114.48.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 114.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 114.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 114.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 115.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 116.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 117.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 117.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 118.16.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 118.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 118.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 119.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 119.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 119.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 120.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 120.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 120.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 120.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 121.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 121.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 122.0.0.0/254.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 124.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 125.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 125.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 125.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 137.59.59.0/255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 137.59.88.0/255.255.252.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 139.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 139.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 140.64.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 140.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 140.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 144.0.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 144.12.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 144.48.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 144.123.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 144.255.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 146.196.0.0/255.255.128.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 150.0.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 150.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 150.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 150.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 152.104.128.0/255.255.128.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 153.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 153.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 157.0.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 157.18.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 157.61.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 157.112.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 157.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 157.255.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 159.226.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 160.19.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 160.20.48.0/255.255.252.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 160.202.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 160.238.64.0/255.255.252.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 161.207.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 162.105.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 163.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 163.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 163.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 163.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 164.52.0.0/255.255.128.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 166.111.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 167.139.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 167.189.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 167.220.244.0/255.255.252.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 168.160.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 170.179.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 171.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 171.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 175.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 175.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 180.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 180.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 182.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 183.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 183.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 183.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 192.124.154.0/255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 192.140.128.0/255.255.128.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 195.78.82.0/255.255.254.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 202.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 202.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 202.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 203.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 210.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 210.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 210.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 210.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 211.64.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 211.80.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 211.96.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 211.136.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 211.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 211.160.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 216.250.108.0/255.255.252.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 218.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 218.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 218.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 219.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 219.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 219.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 220.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 220.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 221.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 221.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 221.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 222.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 223.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 223.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">no-route = 223.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">cisco-client-compat = true</span></span>
<span class="line"><span style="color:#e1e4e8;">dtls-legacy = true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span>
<span class="line"><span style="color:#24292e;">#listen-host = 127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">tcp-port = 443</span></span>
<span class="line"><span style="color:#24292e;">udp-port = 443</span></span>
<span class="line"><span style="color:#24292e;">run-as-user = root</span></span>
<span class="line"><span style="color:#24292e;">run-as-group = daemon</span></span>
<span class="line"><span style="color:#24292e;">socket-file = /var/run/ocserv-socket</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server-cert = /etc/ocserv/ssl/9495244_sike.freehan.ink.pem</span></span>
<span class="line"><span style="color:#24292e;">server-key = /etc/ocserv/ssl/9495244_sike.freehan.ink.key.pem</span></span>
<span class="line"><span style="color:#24292e;">#server-cert = /etc/ocserv/ssl/server-cert.pem</span></span>
<span class="line"><span style="color:#24292e;">#server-key = /etc/ocserv/ssl/server-key.pem</span></span>
<span class="line"><span style="color:#24292e;">#ca-cert = /etc/ocserv/ssl/ca-cert.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">isolate-workers = true</span></span>
<span class="line"><span style="color:#24292e;">max-clients = 0</span></span>
<span class="line"><span style="color:#24292e;">max-same-clients = 2</span></span>
<span class="line"><span style="color:#24292e;">rate-limit-ms = 0</span></span>
<span class="line"><span style="color:#24292e;">server-stats-reset-time = 604800</span></span>
<span class="line"><span style="color:#24292e;">keepalive = 32400</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dpd = 900</span></span>
<span class="line"><span style="color:#24292e;">mobile-dpd = 1900</span></span>
<span class="line"><span style="color:#24292e;">switch-to-tcp-timeout = 25</span></span>
<span class="line"><span style="color:#24292e;">try-mtu-discovery = true</span></span>
<span class="line"><span style="color:#24292e;">compression = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tls-priorities = &quot;NORMAL:%SERVER_PRECEDENCE:%COMPAT:-RSA:-VERS-SSL3.0:-ARCFOUR-128:-VERS-TLS1.0:-VERS-TLS1.1&quot;</span></span>
<span class="line"><span style="color:#24292e;">auth-timeout = 240</span></span>
<span class="line"><span style="color:#24292e;">idle-timeout = 86400</span></span>
<span class="line"><span style="color:#24292e;">mobile-idle-timeout = 86400</span></span>
<span class="line"><span style="color:#24292e;">min-reauth-time = 300</span></span>
<span class="line"><span style="color:#24292e;">max-ban-score = 80</span></span>
<span class="line"><span style="color:#24292e;">ban-reset-time = 1200</span></span>
<span class="line"><span style="color:#24292e;">cookie-timeout = 300</span></span>
<span class="line"><span style="color:#24292e;">deny-roaming = false</span></span>
<span class="line"><span style="color:#24292e;">rekey-time = 172800</span></span>
<span class="line"><span style="color:#24292e;">rekey-method = ssl</span></span>
<span class="line"><span style="color:#24292e;">use-occtl = true</span></span>
<span class="line"><span style="color:#24292e;">pid-file = /var/run/ocserv.pid</span></span>
<span class="line"><span style="color:#24292e;">net-priority = 6</span></span>
<span class="line"><span style="color:#24292e;">device = vpns</span></span>
<span class="line"><span style="color:#24292e;">predictable-ips = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">default-domain = sike.freehan.ink</span></span>
<span class="line"><span style="color:#24292e;">#listen-proxy-proto = true</span></span>
<span class="line"><span style="color:#24292e;">#proxy-url = https://sike.freehan.ink:443</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ipv4-network = 192.168.8.0</span></span>
<span class="line"><span style="color:#24292e;">ipv4-netmask = 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"># An alternative way of specifying the network:</span></span>
<span class="line"><span style="color:#24292e;">#ipv4-network = 192.168.1.0/24</span></span>
<span class="line"><span style="color:#24292e;"># The IPv6 subnet that leases will be given from.</span></span>
<span class="line"><span style="color:#24292e;">#ipv6-network = fda9:4efe:7e3b:03ea::/48 </span></span>
<span class="line"><span style="color:#24292e;"># Specify the size of the network to provide to clients. It is</span></span>
<span class="line"><span style="color:#24292e;"># generally recommended to provide clients with a /64 network in</span></span>
<span class="line"><span style="color:#24292e;"># IPv6, but any subnet may be specified. To provide clients only</span></span>
<span class="line"><span style="color:#24292e;"># with a single IP use the prefix 128.</span></span>
<span class="line"><span style="color:#24292e;">#ipv6-subnet-prefix = 128</span></span>
<span class="line"><span style="color:#24292e;">#ipv6-subnet-prefix = 64</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># tunnel-all-dns = true</span></span>
<span class="line"><span style="color:#24292e;">dns = 8.8.8.8</span></span>
<span class="line"><span style="color:#24292e;">dns = 8.8.4.4</span></span>
<span class="line"><span style="color:#24292e;">ping-leases = false</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">no-route = 1.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 1.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 1.112.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 1.176.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 1.192.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 14.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 14.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 14.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 14.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 27.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 27.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 27.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 27.176.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 27.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 27.224.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 36.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 36.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 36.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 36.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 36.240.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 39.0.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 39.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 39.96.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 39.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 40.72.0.0/255.254.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 40.124.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 42.0.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 42.48.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 42.80.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 42.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 42.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 43.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 45.65.16.0/255.255.240.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 45.112.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 45.248.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 47.92.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 47.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 49.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 49.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 49.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 52.80.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 54.222.0.0/255.254.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 58.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 58.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 58.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 58.240.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 59.32.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 59.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 59.96.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 59.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 59.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 59.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 60.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 60.48.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 60.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 60.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 61.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 61.80.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 61.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 61.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 91.234.36.0/255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 101.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 101.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 101.192.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 101.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 103.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 106.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 106.224.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 110.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 110.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 110.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 110.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 111.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 111.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 111.112.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 111.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 111.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 111.224.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 112.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 112.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 112.192.0.0/255.252.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 112.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 113.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 113.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 113.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 114.16.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 114.48.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 114.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 114.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 114.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 115.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 116.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 117.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 117.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 118.16.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 118.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 118.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 119.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 119.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 119.224.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 120.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 120.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 120.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 120.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 121.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 121.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 122.0.0.0/254.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 124.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 125.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 125.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 125.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 137.59.59.0/255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 137.59.88.0/255.255.252.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 139.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 139.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 140.64.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 140.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 140.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 144.0.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 144.12.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 144.48.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 144.123.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 144.255.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 146.196.0.0/255.255.128.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 150.0.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 150.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 150.128.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 150.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 152.104.128.0/255.255.128.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 153.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 153.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 157.0.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 157.18.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 157.61.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 157.112.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 157.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 157.255.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 159.226.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 160.19.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 160.20.48.0/255.255.252.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 160.202.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 160.238.64.0/255.255.252.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 161.207.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 162.105.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 163.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 163.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 163.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 163.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 164.52.0.0/255.255.128.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 166.111.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 167.139.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 167.189.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 167.220.244.0/255.255.252.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 168.160.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 170.179.0.0/255.255.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 171.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 171.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 175.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 175.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 180.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 180.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 182.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 183.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 183.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 183.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 192.124.154.0/255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 192.140.128.0/255.255.128.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 195.78.82.0/255.255.254.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 202.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 202.128.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 202.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 203.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 210.0.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 210.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 210.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 210.192.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 211.64.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 211.80.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 211.96.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 211.136.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 211.144.0.0/255.240.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 211.160.0.0/255.248.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 216.250.108.0/255.255.252.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 218.0.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 218.160.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 218.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 219.64.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 219.128.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 219.192.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 220.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 220.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 221.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 221.96.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 221.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 222.0.0.0/255.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 223.0.0.0/255.224.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 223.64.0.0/255.192.0.0</span></span>
<span class="line"><span style="color:#24292e;">no-route = 223.128.0.0/255.128.0.0</span></span>
<span class="line"><span style="color:#24292e;">cisco-client-compat = true</span></span>
<span class="line"><span style="color:#24292e;">dtls-legacy = true</span></span></code></pre></div><p><a href="https://zzongbh.github.io/c99fb8e8/" target="_blank" rel="noreferrer">https://zzongbh.github.io/c99fb8e8/</a></p><p><a href="https://www.linuxbabe.com/redhat/openconnect-vpn-server-ocserv-centos-8" target="_blank" rel="noreferrer">https://www.linuxbabe.com/redhat/openconnect-vpn-server-ocserv-centos-8</a></p><p><a href="https://www.cnblogs.com/yueping/p/15842948.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/yueping/p/15842948.html</a></p><p><a href="https://holmesian.org/linode-vps-centos-anyconnect" target="_blank" rel="noreferrer">https://holmesian.org/linode-vps-centos-anyconnect</a></p><h3 id="流量分流" tabindex="-1">流量分流 <a class="header-anchor" href="#流量分流" aria-label="Permalink to &quot;流量分流&quot;">​</a></h3><p><code>no-route</code>配置可能需要根据自己的局域网配置调整。此外，对于国内网段，设置no-route可以避免国内流量通过vpn降低访问效率</p><h2 id="_4-证书方式" tabindex="-1">4.证书方式 <a class="header-anchor" href="#_4-证书方式" aria-label="Permalink to &quot;4.证书方式&quot;">​</a></h2><ul><li>配置文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$sed -e &#39;/^#/d&#39; /etc/ocserv/ocserv.conf | sed &#39;/^$/d&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">tcp-port = 4333</span></span>
<span class="line"><span style="color:#e1e4e8;">udp-port = 4333</span></span>
<span class="line"><span style="color:#e1e4e8;">run-as-user = ocserv</span></span>
<span class="line"><span style="color:#e1e4e8;">run-as-group = ocserv</span></span>
<span class="line"><span style="color:#e1e4e8;">socket-file = ocserv.sock</span></span>
<span class="line"><span style="color:#e1e4e8;">chroot-dir = /var/lib/ocserv</span></span>
<span class="line"><span style="color:#e1e4e8;">isolate-workers = true</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients = 50</span></span>
<span class="line"><span style="color:#e1e4e8;">max-same-clients = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive = 32400</span></span>
<span class="line"><span style="color:#e1e4e8;">dpd = 90</span></span>
<span class="line"><span style="color:#e1e4e8;">mobile-dpd = 1800</span></span>
<span class="line"><span style="color:#e1e4e8;">switch-to-tcp-timeout = 25</span></span>
<span class="line"><span style="color:#e1e4e8;">try-mtu-discovery = true</span></span>
<span class="line"><span style="color:#e1e4e8;">server-cert = /etc/ocserv/server-cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">server-key = /etc/ocserv/server-key.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">ca-cert = /etc/ocserv/ca-cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">cert-user-oid = 2.5.4.3</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-priorities = &quot;NORMAL:%SERVER_PRECEDENCE:%COMPAT:-VERS-SSL3.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-timeout = 240</span></span>
<span class="line"><span style="color:#e1e4e8;">min-reauth-time = 300</span></span>
<span class="line"><span style="color:#e1e4e8;">max-ban-score = 50</span></span>
<span class="line"><span style="color:#e1e4e8;">ban-reset-time = 300</span></span>
<span class="line"><span style="color:#e1e4e8;">cookie-timeout = 300</span></span>
<span class="line"><span style="color:#e1e4e8;">deny-roaming = false</span></span>
<span class="line"><span style="color:#e1e4e8;">rekey-time = 172800</span></span>
<span class="line"><span style="color:#e1e4e8;">rekey-method = ssl</span></span>
<span class="line"><span style="color:#e1e4e8;">use-occtl = true</span></span>
<span class="line"><span style="color:#e1e4e8;">pid-file = /var/run/ocserv.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">device = vpns</span></span>
<span class="line"><span style="color:#e1e4e8;">predictable-ips = true</span></span>
<span class="line"><span style="color:#e1e4e8;">default-domain = example.com</span></span>
<span class="line"><span style="color:#e1e4e8;">ipv4-network = 10.0.81.0</span></span>
<span class="line"><span style="color:#e1e4e8;">ipv4-netmask = 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">dns = 114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;">ping-leases = false</span></span>
<span class="line"><span style="color:#e1e4e8;">route = 10.0.0.0/255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">cisco-client-compat = true</span></span>
<span class="line"><span style="color:#e1e4e8;">dtls-legacy = true</span></span>
<span class="line"><span style="color:#e1e4e8;">user-profile = profile.xml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$sed -e &#39;/^#/d&#39; /etc/ocserv/ocserv.conf | sed &#39;/^$/d&#39;</span></span>
<span class="line"><span style="color:#24292e;">auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#24292e;">tcp-port = 4333</span></span>
<span class="line"><span style="color:#24292e;">udp-port = 4333</span></span>
<span class="line"><span style="color:#24292e;">run-as-user = ocserv</span></span>
<span class="line"><span style="color:#24292e;">run-as-group = ocserv</span></span>
<span class="line"><span style="color:#24292e;">socket-file = ocserv.sock</span></span>
<span class="line"><span style="color:#24292e;">chroot-dir = /var/lib/ocserv</span></span>
<span class="line"><span style="color:#24292e;">isolate-workers = true</span></span>
<span class="line"><span style="color:#24292e;">max-clients = 50</span></span>
<span class="line"><span style="color:#24292e;">max-same-clients = 10</span></span>
<span class="line"><span style="color:#24292e;">keepalive = 32400</span></span>
<span class="line"><span style="color:#24292e;">dpd = 90</span></span>
<span class="line"><span style="color:#24292e;">mobile-dpd = 1800</span></span>
<span class="line"><span style="color:#24292e;">switch-to-tcp-timeout = 25</span></span>
<span class="line"><span style="color:#24292e;">try-mtu-discovery = true</span></span>
<span class="line"><span style="color:#24292e;">server-cert = /etc/ocserv/server-cert.pem</span></span>
<span class="line"><span style="color:#24292e;">server-key = /etc/ocserv/server-key.pem</span></span>
<span class="line"><span style="color:#24292e;">ca-cert = /etc/ocserv/ca-cert.pem</span></span>
<span class="line"><span style="color:#24292e;">cert-user-oid = 2.5.4.3</span></span>
<span class="line"><span style="color:#24292e;">tls-priorities = &quot;NORMAL:%SERVER_PRECEDENCE:%COMPAT:-VERS-SSL3.0&quot;</span></span>
<span class="line"><span style="color:#24292e;">auth-timeout = 240</span></span>
<span class="line"><span style="color:#24292e;">min-reauth-time = 300</span></span>
<span class="line"><span style="color:#24292e;">max-ban-score = 50</span></span>
<span class="line"><span style="color:#24292e;">ban-reset-time = 300</span></span>
<span class="line"><span style="color:#24292e;">cookie-timeout = 300</span></span>
<span class="line"><span style="color:#24292e;">deny-roaming = false</span></span>
<span class="line"><span style="color:#24292e;">rekey-time = 172800</span></span>
<span class="line"><span style="color:#24292e;">rekey-method = ssl</span></span>
<span class="line"><span style="color:#24292e;">use-occtl = true</span></span>
<span class="line"><span style="color:#24292e;">pid-file = /var/run/ocserv.pid</span></span>
<span class="line"><span style="color:#24292e;">device = vpns</span></span>
<span class="line"><span style="color:#24292e;">predictable-ips = true</span></span>
<span class="line"><span style="color:#24292e;">default-domain = example.com</span></span>
<span class="line"><span style="color:#24292e;">ipv4-network = 10.0.81.0</span></span>
<span class="line"><span style="color:#24292e;">ipv4-netmask = 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">dns = 114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;">ping-leases = false</span></span>
<span class="line"><span style="color:#24292e;">route = 10.0.0.0/255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">cisco-client-compat = true</span></span>
<span class="line"><span style="color:#24292e;">dtls-legacy = true</span></span>
<span class="line"><span style="color:#24292e;">user-profile = profile.xml</span></span></code></pre></div><h3 id="_4-1创建客户端证书" tabindex="-1">4.1创建客户端证书 <a class="header-anchor" href="#_4-1创建客户端证书" aria-label="Permalink to &quot;4.1创建客户端证书&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$vim gen-client.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">USER=$1</span></span>
<span class="line"><span style="color:#e1e4e8;">CA_DIR=$2</span></span>
<span class="line"><span style="color:#e1e4e8;">SERIAL=\`date +%s\`</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#生成客户端key</span></span>
<span class="line"><span style="color:#e1e4e8;">certtool --generate-privkey --outfile $USER-key.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#生成证书模板文件</span></span>
<span class="line"><span style="color:#e1e4e8;">cat &lt;&lt; _EOF_ &gt;user.tmpl</span></span>
<span class="line"><span style="color:#e1e4e8;">cn = &quot;$USER&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">unit = &quot;users&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">serial = &quot;$SERIAL&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">expiration_days = 9999</span></span>
<span class="line"><span style="color:#e1e4e8;">signing_key</span></span>
<span class="line"><span style="color:#e1e4e8;">tls_www_client</span></span>
<span class="line"><span style="color:#e1e4e8;">_EOF_</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#生成用户证书</span></span>
<span class="line"><span style="color:#e1e4e8;">certtool --generate-certificate --load-privkey $USER-key.pem --load-ca-certificate $CA_DIR/ca-cert.pem --load-ca-privkey $CA_DIR/ca-key.pem --template user.tmpl --outfile $USER-cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#将证书转换成p12格式,以便客户端导入证书</span></span>
<span class="line"><span style="color:#e1e4e8;">openssl pkcs12 -export -inkey $USER-key.pem -in $USER-cert.pem -name &quot;$USER VPN Client Cert&quot; -certfile $CA_DIR/ca-cert.pem -out $USER.p12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$vim gen-client.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">USER=$1</span></span>
<span class="line"><span style="color:#24292e;">CA_DIR=$2</span></span>
<span class="line"><span style="color:#24292e;">SERIAL=\`date +%s\`</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#生成客户端key</span></span>
<span class="line"><span style="color:#24292e;">certtool --generate-privkey --outfile $USER-key.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#生成证书模板文件</span></span>
<span class="line"><span style="color:#24292e;">cat &lt;&lt; _EOF_ &gt;user.tmpl</span></span>
<span class="line"><span style="color:#24292e;">cn = &quot;$USER&quot;</span></span>
<span class="line"><span style="color:#24292e;">unit = &quot;users&quot;</span></span>
<span class="line"><span style="color:#24292e;">serial = &quot;$SERIAL&quot;</span></span>
<span class="line"><span style="color:#24292e;">expiration_days = 9999</span></span>
<span class="line"><span style="color:#24292e;">signing_key</span></span>
<span class="line"><span style="color:#24292e;">tls_www_client</span></span>
<span class="line"><span style="color:#24292e;">_EOF_</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#生成用户证书</span></span>
<span class="line"><span style="color:#24292e;">certtool --generate-certificate --load-privkey $USER-key.pem --load-ca-certificate $CA_DIR/ca-cert.pem --load-ca-privkey $CA_DIR/ca-key.pem --template user.tmpl --outfile $USER-cert.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#将证书转换成p12格式,以便客户端导入证书</span></span>
<span class="line"><span style="color:#24292e;">openssl pkcs12 -export -inkey $USER-key.pem -in $USER-cert.pem -name &quot;$USER VPN Client Cert&quot; -certfile $CA_DIR/ca-cert.pem -out $USER.p12</span></span></code></pre></div><blockquote><p>官网使用的是certtool命令将证书转换成p12格式:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">certtool --to-p12 --load-privkey user-key.pem --pkcs-cipher 3des-pkcs12 --load-certificate user-cert.pem --outfile user.p12 --outder</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">certtool --to-p12 --load-privkey user-key.pem --pkcs-cipher 3des-pkcs12 --load-certificate user-cert.pem --outfile user.p12 --outder</span></span></code></pre></div></blockquote><p>创建用户文件.例如给我创建一个客户端证书</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$ mkdir han</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$cd han</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#脚本的$1参数表示创建的用户名,$2参数表示ca证书位置.</span></span>
<span class="line"><span style="color:#e1e4e8;">#按提示给证书设置一个密码(建议).也可以空密码(MAC电脑不支持导入空密码证书).</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn han]$../gen-client-cert.sh han ..</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#脚本执行完成后,在用户文件夹可以看到证书文件:</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn han]$ll</span></span>
<span class="line"><span style="color:#e1e4e8;">total 20</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r--. 1 root root 1176 Jul 10 22:47 han-cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root 5826 Jul 10 22:47 han-key.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r--. 1 root root 3376 Jul 10 22:47 han.p12</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r--. 1 root root  104 Jul 10 22:47 user.tmpl</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$ mkdir han</span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$cd han</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#脚本的$1参数表示创建的用户名,$2参数表示ca证书位置.</span></span>
<span class="line"><span style="color:#24292e;">#按提示给证书设置一个密码(建议).也可以空密码(MAC电脑不支持导入空密码证书).</span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn han]$../gen-client-cert.sh han ..</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#脚本执行完成后,在用户文件夹可以看到证书文件:</span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn han]$ll</span></span>
<span class="line"><span style="color:#24292e;">total 20</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r--. 1 root root 1176 Jul 10 22:47 han-cert.pem</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root 5826 Jul 10 22:47 han-key.pem</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r--. 1 root root 3376 Jul 10 22:47 han.p12</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r--. 1 root root  104 Jul 10 22:47 user.tmpl</span></span></code></pre></div><blockquote><p>由于你的证书是自己签发，所以请在anyconnect软件关闭阻止不受信任的服务器选项</p></blockquote><h2 id="_5-密码方式" tabindex="-1">5.密码方式 <a class="header-anchor" href="#_5-密码方式" aria-label="Permalink to &quot;5.密码方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn ocserv]$vim ocserv.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#注释证书认证方面的配置</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#ca-cert = /etc/ocserv/ca-cert.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开启密码认证.passwd指定ocpasswd文件路径</span></span>
<span class="line"><span style="color:#e1e4e8;">auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn ocserv]$vim ocserv.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#注释证书认证方面的配置</span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#24292e;">#ca-cert = /etc/ocserv/ca-cert.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开启密码认证.passwd指定ocpasswd文件路径</span></span>
<span class="line"><span style="color:#24292e;">auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span></code></pre></div><p>其他方面配置和证书验证差不多.重启ocserv服务后,客户端就可以通过用户密码登录VPN</p><h2 id="_6-证书和密码认证" tabindex="-1">6.证书和密码认证 <a class="header-anchor" href="#_6-证书和密码认证" aria-label="Permalink to &quot;6.证书和密码认证&quot;">​</a></h2><p>ocserv在登录认证方面功能非常强大也很人性化.可以同时支持多种认证方式.</p><p>比如我们想要同时使用密码或者证书登录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#开启首选验证机制为密码认证</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;pam&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;pam[gid-min=1000]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = &quot;radius[config=/etc/radiusclient/radiusclient.conf,groupconfig=true]&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 开启证书备用认证&quot;enable-auth&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Specify alternative authentication methods that are sufficient</span></span>
<span class="line"><span style="color:#e1e4e8;"># for authentication. That is, if set, any of the methods enabled</span></span>
<span class="line"><span style="color:#e1e4e8;"># will be sufficient to login, irrespective of the main &#39;auth&#39; entries.</span></span>
<span class="line"><span style="color:#e1e4e8;"># When multiple options are present, they are OR composed (any of them</span></span>
<span class="line"><span style="color:#e1e4e8;"># succeeding allows login).</span></span>
<span class="line"><span style="color:#e1e4e8;">enable-auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#配置文件其他参数无需修改</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#开启首选验证机制为密码认证</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;pam&quot;</span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;pam[gid-min=1000]&quot;</span></span>
<span class="line"><span style="color:#24292e;">auth = &quot;plain[passwd=/etc/ocserv/ocpasswd]&quot;</span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#24292e;">#auth = &quot;radius[config=/etc/radiusclient/radiusclient.conf,groupconfig=true]&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 开启证书备用认证&quot;enable-auth&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Specify alternative authentication methods that are sufficient</span></span>
<span class="line"><span style="color:#24292e;"># for authentication. That is, if set, any of the methods enabled</span></span>
<span class="line"><span style="color:#24292e;"># will be sufficient to login, irrespective of the main &#39;auth&#39; entries.</span></span>
<span class="line"><span style="color:#24292e;"># When multiple options are present, they are OR composed (any of them</span></span>
<span class="line"><span style="color:#24292e;"># succeeding allows login).</span></span>
<span class="line"><span style="color:#24292e;">enable-auth = &quot;certificate&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#配置文件其他参数无需修改</span></span></code></pre></div><p>重启ocserv服务后,客户端在没有证书的情况下会要求输入用户密码登录VPN.如果有导入证书的情况下,不会要求输入用户密码.</p><h2 id="_7-客户端证书注销-账户" tabindex="-1">7.客户端证书注销/账户 <a class="header-anchor" href="#_7-客户端证书注销-账户" aria-label="Permalink to &quot;7.客户端证书注销/账户&quot;">​</a></h2><h3 id="删除一个账户-密码" tabindex="-1">删除一个账户.密码 <a class="header-anchor" href="#删除一个账户-密码" aria-label="Permalink to &quot;删除一个账户.密码&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#ocpasswd命令提供了delete选项删除用户</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$ocpasswd --help</span></span>
<span class="line"><span style="color:#e1e4e8;">ocpasswd - OpenConnect server password utility</span></span>
<span class="line"><span style="color:#e1e4e8;">Usage:  ocpasswd [ -&lt;flag&gt; [&lt;val&gt;] | --&lt;name&gt;[{=| }&lt;val&gt;] ]... [username]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   -c, --passwd=file          Password file</span></span>
<span class="line"><span style="color:#e1e4e8;">   -g, --groupname=str        User&#39;s group name</span></span>
<span class="line"><span style="color:#e1e4e8;">   -d, --delete               Delete user</span></span>
<span class="line"><span style="color:#e1e4e8;">   -l, --lock                 Lock user</span></span>
<span class="line"><span style="color:#e1e4e8;">   -u, --unlock               Unlock user</span></span>
<span class="line"><span style="color:#e1e4e8;">   -v, --version              output version information and exit</span></span>
<span class="line"><span style="color:#e1e4e8;">   -h, --help                 display extended usage information and exit</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除我的账户</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$ocpasswd -c /etc/ocserv/ocpasswd -d han</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#ocpasswd命令提供了delete选项删除用户</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$ocpasswd --help</span></span>
<span class="line"><span style="color:#24292e;">ocpasswd - OpenConnect server password utility</span></span>
<span class="line"><span style="color:#24292e;">Usage:  ocpasswd [ -&lt;flag&gt; [&lt;val&gt;] | --&lt;name&gt;[{=| }&lt;val&gt;] ]... [username]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   -c, --passwd=file          Password file</span></span>
<span class="line"><span style="color:#24292e;">   -g, --groupname=str        User&#39;s group name</span></span>
<span class="line"><span style="color:#24292e;">   -d, --delete               Delete user</span></span>
<span class="line"><span style="color:#24292e;">   -l, --lock                 Lock user</span></span>
<span class="line"><span style="color:#24292e;">   -u, --unlock               Unlock user</span></span>
<span class="line"><span style="color:#24292e;">   -v, --version              output version information and exit</span></span>
<span class="line"><span style="color:#24292e;">   -h, --help                 display extended usage information and exit</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 删除我的账户</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$ocpasswd -c /etc/ocserv/ocpasswd -d han</span></span></code></pre></div><h3 id="注销客户端证书" tabindex="-1">注销客户端证书 <a class="header-anchor" href="#注销客户端证书" aria-label="Permalink to &quot;注销客户端证书&quot;">​</a></h3><h4 id="_1-生成crl-tmpl模板文件" tabindex="-1">1.生成crl.tmpl模板文件 <a class="header-anchor" href="#_1-生成crl-tmpl模板文件" aria-label="Permalink to &quot;1.生成crl.tmpl模板文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$cat &lt;&lt; _EOF_ &gt;crl.tmpl</span></span>
<span class="line"><span style="color:#e1e4e8;">crl_next_update = 365</span></span>
<span class="line"><span style="color:#e1e4e8;">crl_number = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">_EOF_</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$cat crl.tmpl</span></span>
<span class="line"><span style="color:#e1e4e8;">crl_next_update = 365</span></span>
<span class="line"><span style="color:#e1e4e8;">crl_number = 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$cat &lt;&lt; _EOF_ &gt;crl.tmpl</span></span>
<span class="line"><span style="color:#24292e;">crl_next_update = 365</span></span>
<span class="line"><span style="color:#24292e;">crl_number = 1</span></span>
<span class="line"><span style="color:#24292e;">_EOF_</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$cat crl.tmpl</span></span>
<span class="line"><span style="color:#24292e;">crl_next_update = 365</span></span>
<span class="line"><span style="color:#24292e;">crl_number = 1</span></span></code></pre></div><p>2.将要注销的证书文件拷贝一份到revoked.pem文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$cat huangyong/huangyong-cert.pem &gt;&gt; revoked.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$cat huangyong/huangyong-cert.pem &gt;&gt; revoked.pem</span></span></code></pre></div><p>3.生成crl.pem文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">certtool --generate-crl --load-ca-privkey ca-key.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">           --load-ca-certificate ca-cert.pem --load-certificate revoked.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">           --template crl.tmpl --outfile crl.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">certtool --generate-crl --load-ca-privkey ca-key.pem \\</span></span>
<span class="line"><span style="color:#24292e;">           --load-ca-certificate ca-cert.pem --load-certificate revoked.pem \\</span></span>
<span class="line"><span style="color:#24292e;">           --template crl.tmpl --outfile crl.pem</span></span></code></pre></div><p>4.修改配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn anyconnect]$vim /etc/ocserv/ocserv.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开启crl参数,并且制定crl.pem文件的路径</span></span>
<span class="line"><span style="color:#e1e4e8;">crl = /etc/anyconnect/crl.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn anyconnect]$vim /etc/ocserv/ocserv.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开启crl参数,并且制定crl.pem文件的路径</span></span>
<span class="line"><span style="color:#24292e;">crl = /etc/anyconnect/crl.pem</span></span></code></pre></div><p>5.重启ocserv服务</p><h2 id="_8-配合dnsmasq" tabindex="-1">8.配合DNSmasq <a class="header-anchor" href="#_8-配合dnsmasq" aria-label="Permalink to &quot;8.配合DNSmasq&quot;">​</a></h2><p><code>dnsmasq: DNS request timed out for machines in local network</code> ，原来必须显式地设置 listen-address 监听接口，DNSmasq才会对外部客户端请求响应，否则只有本机（估计DNSmasq代码中检查客户端IP来判断是否是本机IP进行过滤）才提供服务，虽然端口已经监听</p><p>修改VPN服务器上 /etc/dnsmasq.conf 配置，添加</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">listen-address</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.101.1</span></span>
<span class="line"><span style="color:#E1E4E8;">listen-address</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">VPN_SERVER_IP</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">listen-address</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.101.1</span></span>
<span class="line"><span style="color:#24292E;">listen-address</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">VPN_SERVER_IP</span></span></code></pre></div><p>然后重启dnsmasq就可以正常解析。</p><blockquote><p>为了安全起见，实际我是只监听tun接口提供服务，这样只有VPN客户端可以访问DNS</p></blockquote><h2 id="_9-密码文件-二次认证" tabindex="-1">9.密码文件+二次认证 <a class="header-anchor" href="#_9-密码文件-二次认证" aria-label="Permalink to &quot;9.密码文件+二次认证&quot;">​</a></h2><p>文档，<a href="https://ocserv.gitlab.io/www/recipes-ocserv-2fa.html" target="_blank" rel="noreferrer">https://ocserv.gitlab.io/www/recipes-ocserv-2fa.html</a></p><p><a href="https://github.com/archiecobbs/mod-authn-otp/wiki/UsersFile" target="_blank" rel="noreferrer">https://github.com/archiecobbs/mod-authn-otp/wiki/UsersFile</a></p><p>Since version 0.10.9 it is possible to use ocserv’s password file for 2FA. It requires ocserv to be compiled with liboath</p><h3 id="_9-1创建otp文件" tabindex="-1">9.1创建otp文件 <a class="header-anchor" href="#_9-1创建otp文件" aria-label="Permalink to &quot;9.1创建otp文件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;HOTP/T30 han - $(</span><span style="color:#B392F0;">head</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">16</span><span style="color:#9ECBFF;"> /dev/urandom </span><span style="color:#F97583;">|</span><span style="color:#B392F0;">xxd</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">256</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-ps</span><span style="color:#9ECBFF;">)&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/ocserv/users.oath</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看users.oath文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">users.oath</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">HOTP/T30</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">han</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">d3856253575278b553d7e2217263e6ae</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#install </span></span>
<span class="line"><span style="color:#B392F0;">apt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">oathtool</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">oathtool</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--totp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-w</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">d3856253575278b553d7e2217263e6ae</span></span>
<span class="line"><span style="color:#B392F0;">625845</span></span>
<span class="line"><span style="color:#B392F0;">466831</span></span>
<span class="line"><span style="color:#B392F0;">507674</span></span>
<span class="line"><span style="color:#B392F0;">845042</span></span>
<span class="line"><span style="color:#B392F0;">611568</span></span>
<span class="line"><span style="color:#B392F0;">079778</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成密钥，生成二维码 一般的otp工具可以进行扫描添加或者手动输入秘钥添加，这里进行二维码生成后便于直接扫描添加 使用以下命令将KEY转换为base32(在0x后面一样记得替换自己的KEY)</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0xd3856253575278b553d7e2217263e6ae</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">xxd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">256</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">base32</span></span>
<span class="line"><span style="color:#E1E4E8;">2OCWEU2XKJ4LKU6X4IQXEY7GVY</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">=====</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#qrencode创建一个二维码</span></span>
<span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt-get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">qrencode</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;otpauth://totp/kay@example.com?secret=2OCWEU2XKJ4LKU6X4IQXEY7GVY&amp;issuer=OpenConnect&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">qrencode</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-o</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">UTF8</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;HOTP/T30 han - $(</span><span style="color:#6F42C1;">head</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-c</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;"> /dev/urandom </span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">xxd</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-c</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">256</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-ps</span><span style="color:#032F62;">)&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/ocserv/users.oath</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看users.oath文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">users.oath</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">HOTP/T30</span><span style="color:#24292E;"> </span><span style="color:#032F62;">han</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">d3856253575278b553d7e2217263e6ae</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#install </span></span>
<span class="line"><span style="color:#6F42C1;">apt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">oathtool</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">oathtool</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--totp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-w</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#032F62;">d3856253575278b553d7e2217263e6ae</span></span>
<span class="line"><span style="color:#6F42C1;">625845</span></span>
<span class="line"><span style="color:#6F42C1;">466831</span></span>
<span class="line"><span style="color:#6F42C1;">507674</span></span>
<span class="line"><span style="color:#6F42C1;">845042</span></span>
<span class="line"><span style="color:#6F42C1;">611568</span></span>
<span class="line"><span style="color:#6F42C1;">079778</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#生成密钥，生成二维码 一般的otp工具可以进行扫描添加或者手动输入秘钥添加，这里进行二维码生成后便于直接扫描添加 使用以下命令将KEY转换为base32(在0x后面一样记得替换自己的KEY)</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0xd3856253575278b553d7e2217263e6ae</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">xxd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">256</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">base32</span></span>
<span class="line"><span style="color:#24292E;">2OCWEU2XKJ4LKU6X4IQXEY7GVY</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">=====</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#qrencode创建一个二维码</span></span>
<span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt-get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">qrencode</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;otpauth://totp/kay@example.com?secret=2OCWEU2XKJ4LKU6X4IQXEY7GVY&amp;issuer=OpenConnect&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">qrencode</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-o</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">UTF8</span></span></code></pre></div><h3 id="_9-2ocserv配置" tabindex="-1">9.2ocserv配置 <a class="header-anchor" href="#_9-2ocserv配置" aria-label="Permalink to &quot;9.2ocserv配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">auth</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;plain[passwd=/etc/ocserv/passwd,otp=/etc/ocserv/users.oath]&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">auth</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;plain[passwd=/etc/ocserv/passwd,otp=/etc/ocserv/users.oath]&quot;</span></span></code></pre></div><h2 id="_10-限速" tabindex="-1">10.限速 <a class="header-anchor" href="#_10-限速" aria-label="Permalink to &quot;10.限速&quot;">​</a></h2><p>1）为userA新建配置文件</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">        # vi /usr/local/ocserv/etc/config-per-user/userA</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">        # vi /usr/local/ocserv/etc/config-per-user/userA</span></span></code></pre></div><p>在上述文件添加下述信息：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">        route = 192.168.11.0/24 #局部路由，userA需要路由的IP或者IP段</span></span>
<span class="line"><span style="color:#e1e4e8;">        rx-data-per-sec = 2000000 #实现接收限速配置</span></span>
<span class="line"><span style="color:#e1e4e8;">        tx-data-per-sec = 2000000  #实现发送限速配置</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">        route = 192.168.11.0/24 #局部路由，userA需要路由的IP或者IP段</span></span>
<span class="line"><span style="color:#24292e;">        rx-data-per-sec = 2000000 #实现接收限速配置</span></span>
<span class="line"><span style="color:#24292e;">        tx-data-per-sec = 2000000  #实现发送限速配置</span></span></code></pre></div><p>（2）修改ocserv的配置文件sample.conf</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">        # vi /usr/local/ocserv/etc/sample.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">        # vi /usr/local/ocserv/etc/sample.conf</span></span></code></pre></div><p>在sample.conf配置文件中添加以下配置：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">        config-per-user = /usr/local/ocserv/etc/config-per-user/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">        config-per-user = /usr/local/ocserv/etc/config-per-user/</span></span></code></pre></div>`,111),o=[l];function c(t,r,i,y,u,d){return n(),a("div",null,o)}const m=s(p,[["render",c]]);export{v as __pageData,m as default};
