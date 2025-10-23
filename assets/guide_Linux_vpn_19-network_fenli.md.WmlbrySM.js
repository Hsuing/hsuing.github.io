import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"阿里云","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/19-network_fenli.md","filePath":"guide/Linux/vpn/19-network_fenli.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/19-network_fenli.md"},l=e(`<h1 id="阿里云" tabindex="-1">阿里云 <a class="header-anchor" href="#阿里云" aria-label="Permalink to &quot;阿里云&quot;">​</a></h1><h2 id="_1-server端" tabindex="-1">1.server端 <a class="header-anchor" href="#_1-server端" aria-label="Permalink to &quot;1.server端&quot;">​</a></h2><p>systemctl stop openvpn-server@server.service</p><p>systemctl start openvpn-server@server.service</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# cat server.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">port 60168</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">ca ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">cert server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">key server.key</span></span>
<span class="line"><span style="color:#e1e4e8;">dh dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#e1e4e8;">topology subnet</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 8.8.8.8&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.16.195.0 255.255.255.0 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;duplicate-cn</span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client</span></span>
<span class="line"><span style="color:#e1e4e8;">verify-client-cert</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 120</span></span>
<span class="line"><span style="color:#e1e4e8;">user nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">group nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append openvpn.log</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# cat server.conf</span></span>
<span class="line"><span style="color:#24292e;">port 60168</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">ca ca.crt</span></span>
<span class="line"><span style="color:#24292e;">cert server.crt</span></span>
<span class="line"><span style="color:#24292e;">key server.key</span></span>
<span class="line"><span style="color:#24292e;">dh dh.pem</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#24292e;">topology subnet</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 8.8.8.8&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.16.195.0 255.255.255.0 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;duplicate-cn</span></span>
<span class="line"><span style="color:#24292e;">client-to-client</span></span>
<span class="line"><span style="color:#24292e;">verify-client-cert</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 120</span></span>
<span class="line"><span style="color:#24292e;">user nobody</span></span>
<span class="line"><span style="color:#24292e;">group nobody</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#24292e;">log-append openvpn.log</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100</span></span></code></pre></div><ul><li>pam</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">auth [user_unknown=ignore success=ok ignore=ignore default=bad] pam_securetty.so</span></span>
<span class="line"><span style="color:#e1e4e8;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#e1e4e8;">auth include system-auth</span></span>
<span class="line"><span style="color:#e1e4e8;">account include system-auth</span></span>
<span class="line"><span style="color:#e1e4e8;">password include system-auth</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">auth [user_unknown=ignore success=ok ignore=ignore default=bad] pam_securetty.so</span></span>
<span class="line"><span style="color:#24292e;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#24292e;">auth include system-auth</span></span>
<span class="line"><span style="color:#24292e;">account include system-auth</span></span>
<span class="line"><span style="color:#24292e;">password include system-auth</span></span></code></pre></div><h2 id="_2-client端" tabindex="-1">2.client端 <a class="header-anchor" href="#_2-client端" aria-label="Permalink to &quot;2.client端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">;tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 1500</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu-extra 32</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">remote 123.56.187.47 60168</span></span>
<span class="line"><span style="color:#e1e4e8;">;route 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-nocache</span></span>
<span class="line"><span style="color:#e1e4e8;">route-method exe</span></span>
<span class="line"><span style="color:#e1e4e8;">route-delay 2</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;无线网络有很多多余的头文件，设置忽略它</span></span>
<span class="line"><span style="color:#e1e4e8;">mute-replay-warnings</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;route-nopull</span></span>
<span class="line"><span style="color:#e1e4e8;">;redirect-gateway def1 bypass-dhcp</span></span>
<span class="line"><span style="color:#e1e4e8;">;redirect-gateway local def1</span></span>
<span class="line"><span style="color:#e1e4e8;">;setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">;ignore-unknown-option block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">;block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">max-routes 1000</span></span>
<span class="line"><span style="color:#e1e4e8;">;route 192.168.1.0 255.255.255.0 vpn_gateway</span></span>
<span class="line"><span style="color:#e1e4e8;">;route 172.16.195.0 255.255.255.0 vpn_gateway</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">........</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/tls-auth&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">;tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 1500</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu-extra 32</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">remote 123.56.187.47 60168</span></span>
<span class="line"><span style="color:#24292e;">;route 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">key-direction 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">auth-nocache</span></span>
<span class="line"><span style="color:#24292e;">route-method exe</span></span>
<span class="line"><span style="color:#24292e;">route-delay 2</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;无线网络有很多多余的头文件，设置忽略它</span></span>
<span class="line"><span style="color:#24292e;">mute-replay-warnings</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;route-nopull</span></span>
<span class="line"><span style="color:#24292e;">;redirect-gateway def1 bypass-dhcp</span></span>
<span class="line"><span style="color:#24292e;">;redirect-gateway local def1</span></span>
<span class="line"><span style="color:#24292e;">;setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">;ignore-unknown-option block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">;block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">max-routes 1000</span></span>
<span class="line"><span style="color:#24292e;">;route 192.168.1.0 255.255.255.0 vpn_gateway</span></span>
<span class="line"><span style="color:#24292e;">;route 172.16.195.0 255.255.255.0 vpn_gateway</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#24292e;">........</span></span>
<span class="line"><span style="color:#24292e;">&lt;/tls-auth&gt;</span></span></code></pre></div><h2 id="_3-防火墙" tabindex="-1">3.防火墙 <a class="header-anchor" href="#_3-防火墙" aria-label="Permalink to &quot;3.防火墙&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201044692.jpg" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#开启转发</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# vim /etc/sysctl.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-masquerade --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent  --add-port=60168/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --zone=public --query-port=60168/tcp # 查看端口号是否开放成功，输出yes开放成功，no则失败</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##########</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -P FORWARD ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -I INPUT -p tcp --dport 1194 -m comment --comment &quot;openvpn&quot; -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -A POSTROUTING -s 10.8.8.0/24 -j MASQUERADE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#开启转发</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# vim /etc/sysctl.conf </span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-masquerade --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent  --add-port=60168/tcp</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --zone=public --query-port=60168/tcp # 查看端口号是否开放成功，输出yes开放成功，no则失败</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##########</span></span>
<span class="line"><span style="color:#24292e;">iptables -P FORWARD ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -I INPUT -p tcp --dport 1194 -m comment --comment &quot;openvpn&quot; -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -A POSTROUTING -s 10.8.8.0/24 -j MASQUERADE</span></span></code></pre></div><h2 id="_4-白名单" tabindex="-1">4.白名单 <a class="header-anchor" href="#_4-白名单" aria-label="Permalink to &quot;4.白名单&quot;">​</a></h2><ol><li>公司内部网段是 <code>192.168.99.0/24</code>；</li><li><code>所有人</code>允许访问反向代理主机为 <code>192.168.99.130</code>，但不能访问其他服务器；</li><li><code>特定的用户</code>允许访问 <code>数据库服务器</code>为 <code>192.168.99.131</code>，不能访问其他服务器；</li><li><code>管理员</code>能访问 <code>所有公司内网服务器</code></li></ol><p>将VPN地址池的网段划分为<code>管理员</code>网段、<code>客户组</code>网段、<code>普通</code>网络</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 在Openvpn服务端配置文件server.conf增加：</span></span>
<span class="line"><span style="color:#e1e4e8;">#10.8.0.0是给所有VPN客户端的IP段；</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#10.8.1.0是给管理员分配的IP段；</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#10.8.2.0就是给特定用户组分配的IP段；</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.2.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#下面是定义服务器读取特殊客户端配置文件的目录为ccd,ccd是与Openvpn服务端配置文件同级目录中的ccd目录</span></span>
<span class="line"><span style="color:#e1e4e8;">client-config-dir ccd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 在Openvpn服务端配置文件server.conf增加：</span></span>
<span class="line"><span style="color:#24292e;">#10.8.0.0是给所有VPN客户端的IP段；</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#10.8.1.0是给管理员分配的IP段；</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#10.8.2.0就是给特定用户组分配的IP段；</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.2.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#下面是定义服务器读取特殊客户端配置文件的目录为ccd,ccd是与Openvpn服务端配置文件同级目录中的ccd目录</span></span>
<span class="line"><span style="color:#24292e;">client-config-dir ccd</span></span></code></pre></div><ul><li>管理员配置访问网络</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat ccd/sysadmin1</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-push 10.8.1.1 10.8.1.2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat ccd/sysadmin1</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-push 10.8.1.1 10.8.1.2</span></span></code></pre></div><ul><li>客户组网络:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat ccd/kehugroup</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-push 10.8.2.1 10.8.2.2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat ccd/kehugroup</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-push 10.8.2.1 10.8.2.2</span></span></code></pre></div><p>这里需要注意的是, <code>ccd</code>目录下的文件名就是用户的<code>Common Name</code>，OpenVPN是根据该名称来获得指定客户端的，客户端的IP地址不是任意指定的，由于Windows的TAP驱动必须采用/30网段的IP，为兼容该协议，应从特定的IP地址中选择，而且是成组出现的。</p><p>最后在完成网络的划分之后，在<code>OpenVPN</code>端进行<code>Iptables</code>限制</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -s 10.8.0.0/24 -d 192.168.99.130 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -s 10.8.1.0/24 -d 192.168.99.0/24 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -s 10.8.2.0/24 -d 192.168.99.131 -j ACCEPT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -s 10.8.0.0/24 -d 192.168.99.130 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -s 10.8.1.0/24 -d 192.168.99.0/24 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -s 10.8.2.0/24 -d 192.168.99.131 -j ACCEPT</span></span></code></pre></div><h3 id="打通openvpn客户端与服务端的内网" tabindex="-1">打通OpenVPN客户端与服务端的内网 <a class="header-anchor" href="#打通openvpn客户端与服务端的内网" aria-label="Permalink to &quot;打通OpenVPN客户端与服务端的内网&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#让所有客户端都增加到内网192.168.99.0/24的路由</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 192.168.99.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 让所有的客户端都能访问仅允许服务端访问的网站(约束白名单)</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 39.156.69.79 255.255.255.255&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 向客户端推送增加访问服务端子网的192.168.10.0/24的路由，注意服务端的IP是否是子网的网关，否则需要在子网网关处添加到达192.168.99.0的路由(客户端也是如此)</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 192.168.10.0 255.255.255.0&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#让所有客户端都增加到内网192.168.99.0/24的路由</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 192.168.99.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 让所有的客户端都能访问仅允许服务端访问的网站(约束白名单)</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 39.156.69.79 255.255.255.255&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 向客户端推送增加访问服务端子网的192.168.10.0/24的路由，注意服务端的IP是否是子网的网关，否则需要在子网网关处添加到达192.168.99.0的路由(客户端也是如此)</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 192.168.10.0 255.255.255.0&quot;</span></span></code></pre></div><h3 id="dhcp" tabindex="-1">dhcp <a class="header-anchor" href="#dhcp" aria-label="Permalink to &quot;dhcp&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># openvpn服务端的配置</span></span>
<span class="line"><span style="color:#e1e4e8;">#定义客户端的DNS服务器地址</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot; # 这是首选DNS</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 8.8.8.8&quot; # 这是备选DNS</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#定义客户端的WINS服务器地址</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-options WINS 192.168.228.1&quot; # 这是设置IP和主机名之间的映射与IP和域名之间的映射不同,较少使用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># openvpn服务端的配置</span></span>
<span class="line"><span style="color:#24292e;">#定义客户端的DNS服务器地址</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot; # 这是首选DNS</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 8.8.8.8&quot; # 这是备选DNS</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#定义客户端的WINS服务器地址</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-options WINS 192.168.228.1&quot; # 这是设置IP和主机名之间的映射与IP和域名之间的映射不同,较少使用</span></span></code></pre></div><h3 id="流量走vpn" tabindex="-1">流量走vpn <a class="header-anchor" href="#流量走vpn" aria-label="Permalink to &quot;流量走vpn&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#让客户端发起的所有IP请求都通过OpenVPN服务器,可用于全局代理使用，启用后会出现浏览器内打不开网站等情况</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#让客户端发起的所有IP请求都通过OpenVPN服务器,可用于全局代理使用，启用后会出现浏览器内打不开网站等情况</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span></code></pre></div><h2 id="_5-dns" tabindex="-1">5.dns <a class="header-anchor" href="#_5-dns" aria-label="Permalink to &quot;5.dns&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-service=dns --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=53/tcp --zone=public --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=53/udp --zone=public --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart firewalld</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -I INPUT 1 -s 10.8.8.0/24 -p udp --dport 53 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -I INPUT 1 -s 10.8.8.0/24 -p tdp --dport 53 -j ACCEPT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">firewall-cmd --add-service=dns --permanent</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=53/tcp --zone=public --permanent</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=53/udp --zone=public --permanent</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl restart firewalld</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###</span></span>
<span class="line"><span style="color:#24292e;">iptables -I INPUT 1 -s 10.8.8.0/24 -p udp --dport 53 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -I INPUT 1 -s 10.8.8.0/24 -p tdp --dport 53 -j ACCEPT</span></span></code></pre></div><h3 id="安装-dnsmasq" tabindex="-1">安装 dnsmasq <a class="header-anchor" href="#安装-dnsmasq" aria-label="Permalink to &quot;安装 dnsmasq&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install -y dnsmasq</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install -y dnsmasq</span></span></code></pre></div><h3 id="修改配置" tabindex="-1">修改配置 <a class="header-anchor" href="#修改配置" aria-label="Permalink to &quot;修改配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# grep -v &#39;^#&#39; /etc/dnsmasq.conf |grep -v &#39;^$&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-file=/etc/resolv.dnsmasq.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">strict-order</span></span>
<span class="line"><span style="color:#e1e4e8;">server=114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;">listen-address=172.16.195.196,127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">addn-hosts=/etc/dnsmasq.hosts</span></span>
<span class="line"><span style="color:#e1e4e8;">cache-size=1024  # 缓存条数</span></span>
<span class="line"><span style="color:#e1e4e8;">bogus-nxdomain=114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;">log-queries  # 记录查询日志</span></span>
<span class="line"><span style="color:#e1e4e8;">log-facility=/var/log/dnsmasq/dnsmasq.log</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d,.bak</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d/,*.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d,.rpmnew,.rpmsave,.rpmorig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# grep -v &#39;^#&#39; /etc/dnsmasq.conf |grep -v &#39;^$&#39;</span></span>
<span class="line"><span style="color:#24292e;">resolv-file=/etc/resolv.dnsmasq.conf</span></span>
<span class="line"><span style="color:#24292e;">strict-order</span></span>
<span class="line"><span style="color:#24292e;">server=114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;">listen-address=172.16.195.196,127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">addn-hosts=/etc/dnsmasq.hosts</span></span>
<span class="line"><span style="color:#24292e;">cache-size=1024  # 缓存条数</span></span>
<span class="line"><span style="color:#24292e;">bogus-nxdomain=114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;">log-queries  # 记录查询日志</span></span>
<span class="line"><span style="color:#24292e;">log-facility=/var/log/dnsmasq/dnsmasq.log</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d,.bak</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d/,*.conf</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d,.rpmnew,.rpmsave,.rpmorig</span></span></code></pre></div><h3 id="创建目录" tabindex="-1">创建目录 <a class="header-anchor" href="#创建目录" aria-label="Permalink to &quot;创建目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#创建日志目录，不然无法启动</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /var/log/dnsmasq/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#创建日志目录，不然无法启动</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir /var/log/dnsmasq/</span></span></code></pre></div><h3 id="修改-resolv-file" tabindex="-1">修改 resolv-file <a class="header-anchor" href="#修改-resolv-file" aria-label="Permalink to &quot;修改 resolv-file&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# cat /etc/resolv.dnsmasq.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">nameserver 114.114.114.114</span></span>
<span class="line"><span style="color:#e1e4e8;">nameserver 100.100.2.136</span></span>
<span class="line"><span style="color:#e1e4e8;">nameserver 100.100.2.138</span></span>
<span class="line"><span style="color:#e1e4e8;">nameserver 1.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">nameserver 1.1.1.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# cat /etc/resolv.dnsmasq.conf</span></span>
<span class="line"><span style="color:#24292e;">nameserver 114.114.114.114</span></span>
<span class="line"><span style="color:#24292e;">nameserver 100.100.2.136</span></span>
<span class="line"><span style="color:#24292e;">nameserver 100.100.2.138</span></span>
<span class="line"><span style="color:#24292e;">nameserver 1.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">nameserver 1.1.1.1</span></span></code></pre></div><ul><li>aws</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100.100</span><span style="color:#9ECBFF;">.2.136</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100.100</span><span style="color:#9ECBFF;">.2.138</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8.8</span><span style="color:#9ECBFF;">.4.4</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.33.214</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100.100</span><span style="color:#032F62;">.2.136</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100.100</span><span style="color:#032F62;">.2.138</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8.8</span><span style="color:#032F62;">.4.4</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.33.214</span></span></code></pre></div><h3 id="添加-hosts" tabindex="-1">添加 hosts <a class="header-anchor" href="#添加-hosts" aria-label="Permalink to &quot;添加 hosts&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# cat /etc/dnsmasq.hosts</span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.195.191 codefenglei.leihuofeng.net</span></span>
<span class="line"><span style="color:#e1e4e8;">172.16.195.194 yidujenkins.leihuofeng.net</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#一行一个，添加依次重启服务</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# cat /etc/dnsmasq.hosts</span></span>
<span class="line"><span style="color:#24292e;">172.16.195.191 codefenglei.leihuofeng.net</span></span>
<span class="line"><span style="color:#24292e;">172.16.195.194 yidujenkins.leihuofeng.net</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#一行一个，添加依次重启服务</span></span></code></pre></div><h3 id="启动服务" tabindex="-1">启动服务 <a class="header-anchor" href="#启动服务" aria-label="Permalink to &quot;启动服务&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl enable dnsmasq --now</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl enable dnsmasq --now</span></span></code></pre></div><ul><li>测试</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# nslookup yidujenkins.leihuofeng.net</span></span>
<span class="line"><span style="color:#e1e4e8;">Server:		172.16.195.196</span></span>
<span class="line"><span style="color:#e1e4e8;">Address:	172.16.195.196#53</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Name:	yidujenkins.leihuofeng.net</span></span>
<span class="line"><span style="color:#e1e4e8;">Address: 172.16.195.194</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# nslookup yidujenkins.leihuofeng.net</span></span>
<span class="line"><span style="color:#24292e;">Server:		172.16.195.196</span></span>
<span class="line"><span style="color:#24292e;">Address:	172.16.195.196#53</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Name:	yidujenkins.leihuofeng.net</span></span>
<span class="line"><span style="color:#24292e;">Address: 172.16.195.194</span></span></code></pre></div><p>找一台机器将 dns 指向 dnsmasq 服务器地址</p><p>vim /etc/resolv.conf</p><ul><li>防火墙配置</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201044832.jpg" alt=""></p><h3 id="vpnserver" tabindex="-1">vpnserver <a class="header-anchor" href="#vpnserver" aria-label="Permalink to &quot;vpnserver&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# cat server.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">port 60168</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">ca ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">cert server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">key server.key</span></span>
<span class="line"><span style="color:#e1e4e8;">dh dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#e1e4e8;">topology subnet</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.16.195.0 255.255.255.0 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 123.57.146.30 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;这两条是关键</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 172.16.195.196&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;push &quot;register-dns&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">;push &quot;block-outside-dns&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">;push &quot;route-nopull&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;block-ipv6&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;duplicate-cn</span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client</span></span>
<span class="line"><span style="color:#e1e4e8;">verify-client-cert</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 120</span></span>
<span class="line"><span style="color:#e1e4e8;">user nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">group nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append openvpn.log</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;">client-cert-not-required</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# cat server.conf</span></span>
<span class="line"><span style="color:#24292e;">port 60168</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">ca ca.crt</span></span>
<span class="line"><span style="color:#24292e;">cert server.crt</span></span>
<span class="line"><span style="color:#24292e;">key server.key</span></span>
<span class="line"><span style="color:#24292e;">dh dh.pem</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#24292e;">topology subnet</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.16.195.0 255.255.255.0 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 123.57.146.30 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;这两条是关键</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 172.16.195.196&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;push &quot;register-dns&quot;</span></span>
<span class="line"><span style="color:#24292e;">;push &quot;block-outside-dns&quot;</span></span>
<span class="line"><span style="color:#24292e;">;push &quot;route-nopull&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;block-ipv6&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;duplicate-cn</span></span>
<span class="line"><span style="color:#24292e;">client-to-client</span></span>
<span class="line"><span style="color:#24292e;">verify-client-cert</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 120</span></span>
<span class="line"><span style="color:#24292e;">user nobody</span></span>
<span class="line"><span style="color:#24292e;">group nobody</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#24292e;">log-append openvpn.log</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#24292e;">client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><ul><li>客户端测试，连接vpn之后</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201044676.jpg" alt=""></p><h2 id="_6-跨云主机" tabindex="-1">6.跨云主机 <a class="header-anchor" href="#_6-跨云主机" aria-label="Permalink to &quot;6.跨云主机&quot;">​</a></h2><ul><li>被访问端安全组</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201044305.jpg" alt=""></p><h3 id="server-vpn" tabindex="-1">server vpn <a class="header-anchor" href="#server-vpn" aria-label="Permalink to &quot;server vpn&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">push &quot;route 8.212.15.90 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.20.198.222 255.255.255.255 vpn_gateway&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">push &quot;route 8.212.15.90 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.20.198.222 255.255.255.255 vpn_gateway&quot;</span></span></code></pre></div><h3 id="dns" tabindex="-1">dns <a class="header-anchor" href="#dns" aria-label="Permalink to &quot;dns&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# cat /etc/dnsmasq.hosts </span></span>
<span class="line"><span style="color:#e1e4e8;">8.212.15.90 nex.qechacha.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# cat /etc/dnsmasq.hosts </span></span>
<span class="line"><span style="color:#24292e;">8.212.15.90 nex.qechacha.com</span></span></code></pre></div><p>重启所有服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl restart openvpn-server@server.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl restart openvpn-server@server.service</span></span></code></pre></div><h1 id="aws" tabindex="-1">aws <a class="header-anchor" href="#aws" aria-label="Permalink to &quot;aws&quot;">​</a></h1><p>dnsmasq 推送必须写tun0的ip地址，否则写默认eth0地址，将不通</p><ul><li>server.conf</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">port 56619</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">ca ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">cert server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">key server.key</span></span>
<span class="line"><span style="color:#e1e4e8;">dh dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#e1e4e8;">topology subnet</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;jump</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.x 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">;vpn</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.31.33.0 255.255.255.0 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.x 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.x 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 172.31.33.214&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option WINS 10.8.8.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 8.8.8.8&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;register-dns&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;block-outside-dns&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">;push &quot;route-nopull&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">;push &quot;block-ipv6&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client</span></span>
<span class="line"><span style="color:#e1e4e8;">verify-client-cert</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 120</span></span>
<span class="line"><span style="color:#e1e4e8;">user nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">group nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append openvpn.log</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;">client-cert-not-required</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">port 56619</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">ca ca.crt</span></span>
<span class="line"><span style="color:#24292e;">cert server.crt</span></span>
<span class="line"><span style="color:#24292e;">key server.key</span></span>
<span class="line"><span style="color:#24292e;">dh dh.pem</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#24292e;">topology subnet</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server 10.8.8.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;jump</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.x 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;">;vpn</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.31.33.0 255.255.255.0 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.x 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.x 255.255.255.255 vpn_gateway&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 172.31.33.214&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option WINS 10.8.8.1&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 8.8.8.8&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;register-dns&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;block-outside-dns&quot;</span></span>
<span class="line"><span style="color:#24292e;">;push &quot;route-nopull&quot;</span></span>
<span class="line"><span style="color:#24292e;">;push &quot;block-ipv6&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">client-to-client</span></span>
<span class="line"><span style="color:#24292e;">verify-client-cert</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 120</span></span>
<span class="line"><span style="color:#24292e;">user nobody</span></span>
<span class="line"><span style="color:#24292e;">group nobody</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#24292e;">log-append openvpn.log</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#24292e;">client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 0</span></span></code></pre></div><ul><li>/etc/dnsmasq.conf</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">no-poll</span></span>
<span class="line"><span style="color:#e1e4e8;">clear-on-reload</span></span>
<span class="line"><span style="color:#e1e4e8;">no-negcache</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-file=/etc/resolv.dnsmasq.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">strict-order</span></span>
<span class="line"><span style="color:#e1e4e8;">listen-address=172.31.33.214,127.0.0.1,10.8.8.1</span></span>
<span class="line"><span style="color:#e1e4e8;">addn-hosts=/etc/dnsmasq.hosts</span></span>
<span class="line"><span style="color:#e1e4e8;">cache-size=0 # 缓存条数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log-queries  # 记录查询日志</span></span>
<span class="line"><span style="color:#e1e4e8;">log-facility=/var/log/dnsmasq/dnsmasq.log</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d,.bak</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d/,*.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">conf-dir=/etc/dnsmasq.d,.rpmnew,.rpmsave,.rpmorig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">no-poll</span></span>
<span class="line"><span style="color:#24292e;">clear-on-reload</span></span>
<span class="line"><span style="color:#24292e;">no-negcache</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">resolv-file=/etc/resolv.dnsmasq.conf</span></span>
<span class="line"><span style="color:#24292e;">strict-order</span></span>
<span class="line"><span style="color:#24292e;">listen-address=172.31.33.214,127.0.0.1,10.8.8.1</span></span>
<span class="line"><span style="color:#24292e;">addn-hosts=/etc/dnsmasq.hosts</span></span>
<span class="line"><span style="color:#24292e;">cache-size=0 # 缓存条数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log-queries  # 记录查询日志</span></span>
<span class="line"><span style="color:#24292e;">log-facility=/var/log/dnsmasq/dnsmasq.log</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d,.bak</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d/,*.conf</span></span>
<span class="line"><span style="color:#24292e;">conf-dir=/etc/dnsmasq.d,.rpmnew,.rpmsave,.rpmorig</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">如果设置了 block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这样 OpenVPN 会添加 Windows 防火墙记录，拦掉除 tap 以外的所有网络接口上的 DNS 请求。需要把这行从你配置文件中删掉</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">如果设置了 block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这样 OpenVPN 会添加 Windows 防火墙记录，拦掉除 tap 以外的所有网络接口上的 DNS 请求。需要把这行从你配置文件中删掉</span></span></code></pre></div><h1 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-label="Permalink to &quot;FAQ&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">路由：</span></span>
<span class="line"><span style="color:#e1e4e8;">		服务端推送路由规则：</span></span>
<span class="line"><span style="color:#e1e4e8;">			push &quot;route 10.0.0.0 255.0.0.0 vpn_gateway&quot;  #vpn网关</span></span>
<span class="line"><span style="color:#e1e4e8;">			push &quot;route 10.0.0.0 255.0.0.0 net_gateway&quot; #本地net上网网关</span></span>
<span class="line"><span style="color:#e1e4e8;">		客户端：</span></span>
<span class="line"><span style="color:#e1e4e8;">			route 10.0.0.0 255.0.0.0 vpn_gateway  #vpn网关</span></span>
<span class="line"><span style="color:#e1e4e8;">			route 10.0.0.0 255.0.0.0 net_gateway  #本地net上网网关</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">路由：</span></span>
<span class="line"><span style="color:#24292e;">		服务端推送路由规则：</span></span>
<span class="line"><span style="color:#24292e;">			push &quot;route 10.0.0.0 255.0.0.0 vpn_gateway&quot;  #vpn网关</span></span>
<span class="line"><span style="color:#24292e;">			push &quot;route 10.0.0.0 255.0.0.0 net_gateway&quot; #本地net上网网关</span></span>
<span class="line"><span style="color:#24292e;">		客户端：</span></span>
<span class="line"><span style="color:#24292e;">			route 10.0.0.0 255.0.0.0 vpn_gateway  #vpn网关</span></span>
<span class="line"><span style="color:#24292e;">			route 10.0.0.0 255.0.0.0 net_gateway  #本地net上网网关</span></span></code></pre></div><h2 id="tap-win" tabindex="-1">tap-win <a class="header-anchor" href="#tap-win" aria-label="Permalink to &quot;tap-win&quot;">​</a></h2><p>OpenVPN Error: All TAP-Windows adapters on this system are currently in use</p><p><strong>Solution 1: re-enable the adapter</strong></p><p>Open Control Panel &gt; Network and Internet &gt; Network and Sharing Center &gt; Change adapter settings. Check description of network adapters to find the Tap-Windows Adapter.<br> Right click on it &gt; Disable. Right click again &gt; Enable.</p><p><strong>Solution 2: reinstall the Tap driver</strong></p><p>Check if it is already installed by opening <strong>C:\\Program Files\\TAP-Windows</strong> Right click on <strong>Uninstall</strong> and select <strong>Run as administrator</strong> Reboot the system (not required, but recommended) Download the Tap driver from OpenVPN <a href="https://swupdate.openvpn.org/community/releases/tap-windows-9.21.2.exe" target="_blank" rel="noreferrer">repository</a> and install it (right click on it &gt; Run as administrator)</p>`,79),o=[l];function c(t,r,i,y,d,u){return n(),a("div",null,o)}const g=s(p,[["render",c]]);export{v as __pageData,g as default};
