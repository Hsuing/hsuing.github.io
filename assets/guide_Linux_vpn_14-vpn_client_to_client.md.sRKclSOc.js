import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/14-vpn_client_to_client.md","filePath":"guide/Linux/vpn/14-vpn_client_to_client.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/14-vpn_client_to_client.md"},l=e(`<ul><li>阿里云环境</li><li>centos7</li><li>openvpn2.4</li></ul><h2 id="_1-server端配置" tabindex="-1">1.server端配置 <a class="header-anchor" href="#_1-server端配置" aria-label="Permalink to &quot;1.server端配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">port 10020</span></span>
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
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 1.1.1.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">route 192.168.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.18.106.133 255.255.255.0&quot;</span></span>
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
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;">client-cert-not-required</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">port 10020</span></span>
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
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 1.1.1.1&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">route 192.168.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.18.106.133 255.255.255.0&quot;</span></span>
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
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#24292e;">client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><ul><li>关键点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#服务器增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#e1e4e8;">route 192.168.4.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#允许客户端子网互通</span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#让所有客户端都增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 192.168.4.0 255.255.255.0&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#服务器增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#24292e;">route 192.168.4.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#允许客户端子网互通</span></span>
<span class="line"><span style="color:#24292e;">client-to-client</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#让所有客户端都增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 192.168.4.0 255.255.255.0&quot;</span></span></code></pre></div><h2 id="_2-client端配置" tabindex="-1">2.client端配置 <a class="header-anchor" href="#_2-client端配置" aria-label="Permalink to &quot;2.client端配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">remote 39.98.112.233 10020</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 1</span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-nocache</span></span>
<span class="line"><span style="color:#e1e4e8;">route-method exe</span></span>
<span class="line"><span style="color:#e1e4e8;">route-delay 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">remote 39.98.112.233 10020</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">key-direction 1</span></span>
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">auth-nocache</span></span>
<span class="line"><span style="color:#24292e;">route-method exe</span></span>
<span class="line"><span style="color:#24292e;">route-delay 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><h2 id="_3-配置pam" tabindex="-1">3.配置pam <a class="header-anchor" href="#_3-配置pam" aria-label="Permalink to &quot;3.配置pam&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ipa pam.d]# cat openvpn </span></span>
<span class="line"><span style="color:#e1e4e8;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#e1e4e8;">auth	required	pam_ldap.so use_first_pass debug</span></span>
<span class="line"><span style="color:#e1e4e8;">account	required	pam_ldap.so</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ipa pam.d]# cat openvpn </span></span>
<span class="line"><span style="color:#24292e;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#24292e;">auth	required	pam_ldap.so use_first_pass debug</span></span>
<span class="line"><span style="color:#24292e;">account	required	pam_ldap.so</span></span></code></pre></div><h2 id="_4-配置防火墙" tabindex="-1">4.配置防火墙 <a class="header-anchor" href="#_4-配置防火墙" aria-label="Permalink to &quot;4.配置防火墙&quot;">​</a></h2><p>把tun0 地址10.8.0.1 和eth ip地址加入到安全组里面</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201038941.jpg" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-masquerade --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent  --add-port=60168/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart openvpn-server@server.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">firewall-cmd --add-masquerade --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent  --add-port=60168/tcp</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl restart openvpn-server@server.service</span></span></code></pre></div><h2 id="_5-测试" tabindex="-1">5.测试 <a class="header-anchor" href="#_5-测试" aria-label="Permalink to &quot;5.测试&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201038226.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201039915.jpg" alt=""></p>`,16),o=[l];function c(t,r,i,y,u,d){return n(),a("div",null,o)}const g=s(p,[["render",c]]);export{v as __pageData,g as default};
