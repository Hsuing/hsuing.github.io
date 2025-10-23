import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const p="/assets/vpn_pam1.DMKhigJ7.jpg",m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/11-pam_google_auth.md","filePath":"guide/Linux/vpn/11-pam_google_auth.md","lastUpdated":1701595065000}'),l={name:"guide/Linux/vpn/11-pam_google_auth.md"},o=e(`<ul><li>CentOS 7.x</li><li>OpenVPN 2.4.x</li><li>Google Authenticator libPAM 1.0.1</li></ul><h2 id="_1-google-authenticator" tabindex="-1">1.google-authenticator <a class="header-anchor" href="#_1-google-authenticator" aria-label="Permalink to &quot;1.google-authenticator&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 准备打包的软件环境</span></span>
<span class="line"><span style="color:#e1e4e8;">yum -y install git gcc libtool autoconf automake pam-devel rpm-build qrencode-libs;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 抓取源代码，打包</span></span>
<span class="line"><span style="color:#e1e4e8;">git clone https://github.com/google/google-authenticator-libpam.git;</span></span>
<span class="line"><span style="color:#e1e4e8;">cd google-authenticator-libpam;</span></span>
<span class="line"><span style="color:#e1e4e8;">./bootstrap.sh;</span></span>
<span class="line"><span style="color:#e1e4e8;">./configure;</span></span>
<span class="line"><span style="color:#e1e4e8;">make dist;</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir ~/rpmbuild/SOURCES/</span></span>
<span class="line"><span style="color:#e1e4e8;">cp google-authenticator-*.tar.gz ~/rpmbuild/SOURCES/;</span></span>
<span class="line"><span style="color:#e1e4e8;">rpmbuild -ba contrib/rpm.spec;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 成功以后，编好的rpm包路径在：</span></span>
<span class="line"><span style="color:#e1e4e8;"># ~/rpmbuild/RPMS/x86_64/google-authenticator-1.*.el6.x86_64.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#安装</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -vih /root/rpmbuild/RPMS/x86_64/google-authenticator-1.09-1.el7.x86_64.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 准备打包的软件环境</span></span>
<span class="line"><span style="color:#24292e;">yum -y install git gcc libtool autoconf automake pam-devel rpm-build qrencode-libs;</span></span>
<span class="line"><span style="color:#24292e;"># 抓取源代码，打包</span></span>
<span class="line"><span style="color:#24292e;">git clone https://github.com/google/google-authenticator-libpam.git;</span></span>
<span class="line"><span style="color:#24292e;">cd google-authenticator-libpam;</span></span>
<span class="line"><span style="color:#24292e;">./bootstrap.sh;</span></span>
<span class="line"><span style="color:#24292e;">./configure;</span></span>
<span class="line"><span style="color:#24292e;">make dist;</span></span>
<span class="line"><span style="color:#24292e;">mkdir ~/rpmbuild/SOURCES/</span></span>
<span class="line"><span style="color:#24292e;">cp google-authenticator-*.tar.gz ~/rpmbuild/SOURCES/;</span></span>
<span class="line"><span style="color:#24292e;">rpmbuild -ba contrib/rpm.spec;</span></span>
<span class="line"><span style="color:#24292e;"># 成功以后，编好的rpm包路径在：</span></span>
<span class="line"><span style="color:#24292e;"># ~/rpmbuild/RPMS/x86_64/google-authenticator-1.*.el6.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#安装</span></span>
<span class="line"><span style="color:#24292e;">rpm -vih /root/rpmbuild/RPMS/x86_64/google-authenticator-1.09-1.el7.x86_64.rpm</span></span></code></pre></div><h2 id="_2-pamtester" tabindex="-1">2.pamtester <a class="header-anchor" href="#_2-pamtester" aria-label="Permalink to &quot;2.pamtester&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#验证pam是否成功</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install pamtester -y</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#centos8</span></span>
<span class="line"><span style="color:#e1e4e8;">dnf install pam_ldap  openvpn-auth-ldap pamtester</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#验证pam是否成功</span></span>
<span class="line"><span style="color:#24292e;">yum install pamtester -y</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#centos8</span></span>
<span class="line"><span style="color:#24292e;">dnf install pam_ldap  openvpn-auth-ldap pamtester</span></span></code></pre></div><h2 id="_3-openvpn-server配置" tabindex="-1">3.openvpn_server配置 <a class="header-anchor" href="#_3-openvpn-server配置" aria-label="Permalink to &quot;3.openvpn_server配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#vi server.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">port 1194</span></span>
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
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 1.1.1.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.26.0.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;rcvbuf 393216&quot;</span></span>
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
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#vi server.conf</span></span>
<span class="line"><span style="color:#24292e;">port 1194</span></span>
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
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 1.1.1.1&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.26.0.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;rcvbuf 393216&quot;</span></span>
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
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><h2 id="_4-client配置" tabindex="-1">4.client配置 <a class="header-anchor" href="#_4-client配置" aria-label="Permalink to &quot;4.client配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">remote 39.98.112.233 1194</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 1</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-nocache</span></span>
<span class="line"><span style="color:#e1e4e8;">route-method exe</span></span>
<span class="line"><span style="color:#e1e4e8;">route-delay 2</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">《证书省。。。》</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">remote 39.98.112.233 1194</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">key-direction 1</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">auth-nocache</span></span>
<span class="line"><span style="color:#24292e;">route-method exe</span></span>
<span class="line"><span style="color:#24292e;">route-delay 2</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">《证书省。。。》</span></span></code></pre></div><h2 id="_5-pam配置" tabindex="-1">5.pam配置 <a class="header-anchor" href="#_5-pam配置" aria-label="Permalink to &quot;5.pam配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#cat /etc/pam.d/openvpn </span></span>
<span class="line"><span style="color:#e1e4e8;">auth [user_unknown=ignore success=ok ignore=ignore default=bad] pam_securetty.so</span></span>
<span class="line"><span style="color:#e1e4e8;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#e1e4e8;">auth include system-auth</span></span>
<span class="line"><span style="color:#e1e4e8;">account include system-auth</span></span>
<span class="line"><span style="color:#e1e4e8;">password include system-auth</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#cat /etc/pam.d/openvpn </span></span>
<span class="line"><span style="color:#24292e;">auth [user_unknown=ignore success=ok ignore=ignore default=bad] pam_securetty.so</span></span>
<span class="line"><span style="color:#24292e;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#24292e;">auth include system-auth</span></span>
<span class="line"><span style="color:#24292e;">account include system-auth</span></span>
<span class="line"><span style="color:#24292e;">password include system-auth</span></span></code></pre></div><h2 id="_6-配置google验证" tabindex="-1">6.配置google验证 <a class="header-anchor" href="#_6-配置google验证" aria-label="Permalink to &quot;6.配置google验证&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#create user ，用于google验证</span></span>
<span class="line"><span style="color:#e1e4e8;">useradd gauth</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#Create directory to store google authenticator files and change ownership to gauth</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /etc/openvpn/google-authenticator</span></span>
<span class="line"><span style="color:#e1e4e8;">chown gauth:gauth /etc/openvpn/google-authenticator </span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 700 /etc/openvpn/google-authenticator</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#create user ，用于google验证</span></span>
<span class="line"><span style="color:#24292e;">useradd gauth</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#Create directory to store google authenticator files and change ownership to gauth</span></span>
<span class="line"><span style="color:#24292e;">mkdir /etc/openvpn/google-authenticator</span></span>
<span class="line"><span style="color:#24292e;">chown gauth:gauth /etc/openvpn/google-authenticator </span></span>
<span class="line"><span style="color:#24292e;">chmod 700 /etc/openvpn/google-authenticator</span></span></code></pre></div><ul><li>Create script file with the content below for the creation of the OTP username</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">chmod 700 /root/create-gauth.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">vi create-gauth.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#e1e4e8;"># Parse arguments</span></span>
<span class="line"><span style="color:#e1e4e8;">USERNAME=&quot;$1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ -z &quot;$USERNAME&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  echo &quot;Usage: $(basename $0) &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 2</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;"># Set the label the user will see when importing the token:</span></span>
<span class="line"><span style="color:#e1e4e8;">LABEL=&#39;OpenVPN Server&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">su -c &quot;google-authenticator -t -d -r3 -R30 -W -f -l \\&quot;\${LABEL}\\&quot; -s /etc/openvpn/google-authenticator/\${USERNAME}&quot; - gauth</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">chmod 700 /root/create-gauth.sh</span></span>
<span class="line"><span style="color:#24292e;">vi create-gauth.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292e;"># Parse arguments</span></span>
<span class="line"><span style="color:#24292e;">USERNAME=&quot;$1&quot;</span></span>
<span class="line"><span style="color:#24292e;">if [ -z &quot;$USERNAME&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  echo &quot;Usage: $(basename $0) &quot;</span></span>
<span class="line"><span style="color:#24292e;">  exit 2</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;"># Set the label the user will see when importing the token:</span></span>
<span class="line"><span style="color:#24292e;">LABEL=&#39;OpenVPN Server&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">su -c &quot;google-authenticator -t -d -r3 -R30 -W -f -l \\&quot;\${LABEL}\\&quot; -s /etc/openvpn/google-authenticator/\${USERNAME}&quot; - gauth</span></span></code></pre></div><ul><li>Create vpn user with the OS command below</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">useradd -M -c &quot;google_auth_vpnxiong&quot; -s /sbin/false vpnxiong</span></span>
<span class="line"><span style="color:#e1e4e8;">passwd vpnxiong</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sh create-gauth.sh vpnxiong</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">useradd -M -c &quot;google_auth_vpnxiong&quot; -s /sbin/false vpnxiong</span></span>
<span class="line"><span style="color:#24292e;">passwd vpnxiong</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sh create-gauth.sh vpnxiong</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201034340.jpg" alt=""></p><p><img src="`+p+`" alt=""></p><h2 id="_7-pam测试" tabindex="-1">7.pam测试 <a class="header-anchor" href="#_7-pam测试" aria-label="Permalink to &quot;7.pam测试&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@iZ8vbcvjtgyijxs9ixmh6oZ pam.d]# pamtester openvpn vpnxiong authenticate;</span></span>
<span class="line"><span style="color:#e1e4e8;">Password &amp; verification code: 密码+google验证</span></span>
<span class="line"><span style="color:#e1e4e8;">pamtester: successfully authenticated</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@iZ8vbcvjtgyijxs9ixmh6oZ pam.d]# pamtester openvpn vpnxiong authenticate;</span></span>
<span class="line"><span style="color:#24292e;">Password &amp; verification code: 密码+google验证</span></span>
<span class="line"><span style="color:#24292e;">pamtester: successfully authenticated</span></span></code></pre></div><h2 id="_8-额外" tabindex="-1">8.额外 <a class="header-anchor" href="#_8-额外" aria-label="Permalink to &quot;8.额外&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#vpn 发邮件</span></span>
<span class="line"><span style="color:#e1e4e8;">vi server.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">client-connect /etc/openvpn/scripts/up.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#chmod 755 /etc/openvpn/scripts/up.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#vi /etc/openvpn/scripts/up.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">smtp=&quot;A.B.C.D&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">from=&quot;vpnadmin@dilli.com.np&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">full_name=$(/usr/bin/getent passwd $common_name | /usr/bin/cut -d: -f5 | /usr/bin/awk -F &quot;,&quot; &#39;{print $1}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">email_address=$(/usr/bin/getent passwd $common_name | /usr/bin/cut -d: -f5 | /usr/bin/awk -F &quot;,&quot; &#39;{print $2}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">subject=&quot;VPN connected from $untrusted_ip\\nContent-Type: text/html&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">date_n_time=$(date +%c)</span></span>
<span class="line"><span style="color:#e1e4e8;">Message=$(echo &quot;Dear \${full_name},</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Your VPN Username $common_name has been connected from IP Address: $untrusted_ip. Make sure it is you or you are aware of it.</span></span>
<span class="line"><span style="color:#e1e4e8;">Please change your password if it is not you and contact System administrator for further assistance.</span></span>
<span class="line"><span style="color:#e1e4e8;">Following is the details</span></span>
<span class="line"><span style="color:#e1e4e8;">==========================================</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected Since: \${date_n_time}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Public Address: $untrusted_ip</span></span>
<span class="line"><span style="color:#e1e4e8;">Virtual Address: $ifconfig_pool_remote_ip</span></span>
<span class="line"><span style="color:#e1e4e8;">Name: $common_name</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Full Name: $full_name</span></span>
<span class="line"><span style="color:#e1e4e8;">Email Address: $email_address</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Regards,</span></span>
<span class="line"><span style="color:#e1e4e8;">IT Team</span></span>
<span class="line"><span style="color:#e1e4e8;">Idealab.&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo $Message | /bin/mailx -r \${from} -s &quot;$(echo -e \${subject})&quot; -S smtp=&quot;\${smtp}&quot; \${email_address}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#vpn 发邮件</span></span>
<span class="line"><span style="color:#24292e;">vi server.conf</span></span>
<span class="line"><span style="color:#24292e;">client-connect /etc/openvpn/scripts/up.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#chmod 755 /etc/openvpn/scripts/up.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#vi /etc/openvpn/scripts/up.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">smtp=&quot;A.B.C.D&quot;</span></span>
<span class="line"><span style="color:#24292e;">from=&quot;vpnadmin@dilli.com.np&quot;</span></span>
<span class="line"><span style="color:#24292e;">full_name=$(/usr/bin/getent passwd $common_name | /usr/bin/cut -d: -f5 | /usr/bin/awk -F &quot;,&quot; &#39;{print $1}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">email_address=$(/usr/bin/getent passwd $common_name | /usr/bin/cut -d: -f5 | /usr/bin/awk -F &quot;,&quot; &#39;{print $2}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">subject=&quot;VPN connected from $untrusted_ip\\nContent-Type: text/html&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">date_n_time=$(date +%c)</span></span>
<span class="line"><span style="color:#24292e;">Message=$(echo &quot;Dear \${full_name},</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Your VPN Username $common_name has been connected from IP Address: $untrusted_ip. Make sure it is you or you are aware of it.</span></span>
<span class="line"><span style="color:#24292e;">Please change your password if it is not you and contact System administrator for further assistance.</span></span>
<span class="line"><span style="color:#24292e;">Following is the details</span></span>
<span class="line"><span style="color:#24292e;">==========================================</span></span>
<span class="line"><span style="color:#24292e;">Connected Since: \${date_n_time}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Public Address: $untrusted_ip</span></span>
<span class="line"><span style="color:#24292e;">Virtual Address: $ifconfig_pool_remote_ip</span></span>
<span class="line"><span style="color:#24292e;">Name: $common_name</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Full Name: $full_name</span></span>
<span class="line"><span style="color:#24292e;">Email Address: $email_address</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Regards,</span></span>
<span class="line"><span style="color:#24292e;">IT Team</span></span>
<span class="line"><span style="color:#24292e;">Idealab.&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo $Message | /bin/mailx -r \${from} -s &quot;$(echo -e \${subject})&quot; -S smtp=&quot;\${smtp}&quot; \${email_address}</span></span></code></pre></div><ul><li>关闭systemd 保护模式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /usr/lib/systemd/system/openvpn-server@.service</span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">ProtectHome=true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /usr/lib/systemd/system/openvpn-server@.service</span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">ProtectHome=true</span></span></code></pre></div><h2 id="_9-测试" tabindex="-1">9.测试 <a class="header-anchor" href="#_9-测试" aria-label="Permalink to &quot;9.测试&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201036688.jpg" alt=""></p>`,27),t=[o];function c(i,r,u,y,d,h){return n(),a("div",null,t)}const v=s(l,[["render",c]]);export{m as __pageData,v as default};
