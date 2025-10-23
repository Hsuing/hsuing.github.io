import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/12-ldap_google_auth.md","filePath":"guide/Linux/vpn/12-ldap_google_auth.md","lastUpdated":1701928035000}'),p={name:"guide/Linux/vpn/12-ldap_google_auth.md"},l=e(`<p>以下都是在openvpn server端执行</p><h2 id="_1-server端配置" tabindex="-1">1.server端配置 <a class="header-anchor" href="#_1-server端配置" aria-label="Permalink to &quot;1.server端配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">port 1194</span></span>
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
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.18.0.0 255.255.255.0&quot;</span></span>
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
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;">client-cert-not-required</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">port 1194</span></span>
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
<span class="line"><span style="color:#24292e;">push &quot;route 172.18.0.0 255.255.255.0&quot;</span></span>
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
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">plugin /usr/lib64/openvpn/plugins/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#24292e;">client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><h2 id="_2-client端" tabindex="-1">2.client端 <a class="header-anchor" href="#_2-client端" aria-label="Permalink to &quot;2.client端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
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
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">auth-nocache</span></span>
<span class="line"><span style="color:#24292e;">route-method exe</span></span>
<span class="line"><span style="color:#24292e;">route-delay 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><ul><li>openldap添加用户</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">useradd  ldapuser1</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;123456&#39; | passwd --stdin ldapuser1</span></span>
<span class="line"><span style="color:#e1e4e8;">grep &quot;:10[0-9][0-9]&quot; /etc/passwd &gt; /root/users</span></span>
<span class="line"><span style="color:#e1e4e8;">grep &quot;:10[0-9][0-9]&quot; /etc/group &gt; /root/groups</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/migrationtools/migrate_passwd.pl /root/users &gt; /root/users.ldif</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/migrationtools/migrate_group.pl /root/groups &gt; /root/groups.ldif</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ldapadd -x -w &quot;han123456&quot; -D &quot;cn=Manager,dc=freehan,dc=ink&quot; -f /root/users.ldif</span></span>
<span class="line"><span style="color:#e1e4e8;">ldapadd -x -w &quot;han123456&quot; -D &quot;cn=Manager,dc=freehan,dc=ink&quot; -f /root/groups.ldif</span></span>
<span class="line"><span style="color:#e1e4e8;">ldapsearch -x -b &quot;dc=freehan,dc=ink&quot; -H ldap://127.0.0.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">useradd  ldapuser1</span></span>
<span class="line"><span style="color:#24292e;">echo &#39;123456&#39; | passwd --stdin ldapuser1</span></span>
<span class="line"><span style="color:#24292e;">grep &quot;:10[0-9][0-9]&quot; /etc/passwd &gt; /root/users</span></span>
<span class="line"><span style="color:#24292e;">grep &quot;:10[0-9][0-9]&quot; /etc/group &gt; /root/groups</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">/usr/share/migrationtools/migrate_passwd.pl /root/users &gt; /root/users.ldif</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/usr/share/migrationtools/migrate_group.pl /root/groups &gt; /root/groups.ldif</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ldapadd -x -w &quot;han123456&quot; -D &quot;cn=Manager,dc=freehan,dc=ink&quot; -f /root/users.ldif</span></span>
<span class="line"><span style="color:#24292e;">ldapadd -x -w &quot;han123456&quot; -D &quot;cn=Manager,dc=freehan,dc=ink&quot; -f /root/groups.ldif</span></span>
<span class="line"><span style="color:#24292e;">ldapsearch -x -b &quot;dc=freehan,dc=ink&quot; -H ldap://127.0.0.1</span></span></code></pre></div><h2 id="_3-pam配置" tabindex="-1">3.pam配置 <a class="header-anchor" href="#_3-pam配置" aria-label="Permalink to &quot;3.pam配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /etc/pam.d/openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#e1e4e8;">auth	required	pam_ldap.so use_first_pass debug</span></span>
<span class="line"><span style="color:#e1e4e8;">account	required	pam_ldap.so</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /etc/pam.d/openvpn</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">auth required /usr/lib64/security/pam_google_authenticator.so secret=/etc/openvpn/google-authenticator/\${USER} user=gauth forward_pass</span></span>
<span class="line"><span style="color:#24292e;">auth	required	pam_ldap.so use_first_pass debug</span></span>
<span class="line"><span style="color:#24292e;">account	required	pam_ldap.so</span></span></code></pre></div><ul><li>sercet：指定了google auth模块读取的文件</li><li>auth：代表需要认证的事务，这里包括了google_auth和ldap</li><li>account：指定账户类型，这里是ldap账户，也可以是pam_unix.so（代表需要本地建立该账户）</li></ul><h2 id="_4-配置openvpn-连接ldap" tabindex="-1">4.配置openvpn 连接ldap <a class="header-anchor" href="#_4-配置openvpn-连接ldap" aria-label="Permalink to &quot;4.配置openvpn 连接ldap&quot;">​</a></h2><p>配置OpenV P N连接的Ldap配置，pam_ldap模块使用的是nslcd的配置，只需要配置/etc/nslcd.conf文件即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install pam_ldap</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install pam_ldap</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">uid nslcd</span></span>
<span class="line"><span style="color:#e1e4e8;">gid ldap</span></span>
<span class="line"><span style="color:#e1e4e8;">uri ldap://127.0.0.1/</span></span>
<span class="line"><span style="color:#e1e4e8;">base dc=freehan,dc=com</span></span>
<span class="line"><span style="color:#e1e4e8;">binddn cn=Manager,dc=freehan,dc=com</span></span>
<span class="line"><span style="color:#e1e4e8;">bindpw han123</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">uid nslcd</span></span>
<span class="line"><span style="color:#24292e;">gid ldap</span></span>
<span class="line"><span style="color:#24292e;">uri ldap://127.0.0.1/</span></span>
<span class="line"><span style="color:#24292e;">base dc=freehan,dc=com</span></span>
<span class="line"><span style="color:#24292e;">binddn cn=Manager,dc=freehan,dc=com</span></span>
<span class="line"><span style="color:#24292e;">bindpw han123</span></span></code></pre></div><ul><li>配置freeipaLDAP</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ipa server]# grep -Ev &quot;#|^$&quot; /etc/nslcd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">uid nslcd</span></span>
<span class="line"><span style="color:#e1e4e8;">gid ldap</span></span>
<span class="line"><span style="color:#e1e4e8;">uri ldap://ipa.freehan.ink:389</span></span>
<span class="line"><span style="color:#e1e4e8;">base dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#e1e4e8;">binddn uid=admin,cn=users,cn=accounts,dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#e1e4e8;">bindpw han123456</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ipa server]# grep -Ev &quot;#|^$&quot; /etc/nslcd.conf</span></span>
<span class="line"><span style="color:#24292e;">uid nslcd</span></span>
<span class="line"><span style="color:#24292e;">gid ldap</span></span>
<span class="line"><span style="color:#24292e;">uri ldap://ipa.freehan.ink:389</span></span>
<span class="line"><span style="color:#24292e;">base dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#24292e;">binddn uid=admin,cn=users,cn=accounts,dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#24292e;">bindpw han123456</span></span></code></pre></div><ul><li>获取binddn地址</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ldapsearch -x uid=admin</span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">$ ldapsearch -x -h ipa.freehan.ink  -b dc=freehan,dc=ink uid=admin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># extended LDIF</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># LDAPv3</span></span>
<span class="line"><span style="color:#e1e4e8;"># base &lt;dc=freehan,dc=ink&gt; with scope subtree</span></span>
<span class="line"><span style="color:#e1e4e8;"># filter: uid=admin</span></span>
<span class="line"><span style="color:#e1e4e8;"># requesting: ALL</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># admin, users, compat, freehan.ink</span></span>
<span class="line"><span style="color:#e1e4e8;">dn: uid=admin,cn=users,cn=compat,dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: posixAccount</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: ipaOverrideTarget</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: top</span></span>
<span class="line"><span style="color:#e1e4e8;">gecos: Administrator</span></span>
<span class="line"><span style="color:#e1e4e8;">cn: Administrator</span></span>
<span class="line"><span style="color:#e1e4e8;">uidNumber: 428200000</span></span>
<span class="line"><span style="color:#e1e4e8;">gidNumber: 428200000</span></span>
<span class="line"><span style="color:#e1e4e8;">loginShell: /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">homeDirectory: /home/admin</span></span>
<span class="line"><span style="color:#e1e4e8;">ipaAnchorUUID:: OklQQTpmcmVlaGFuLmluazo3NTc1Y2JiNC00ZGJkLTExZWMtOWFkNi0wMDE2M2</span></span>
<span class="line"><span style="color:#e1e4e8;"> UxNTBlYTg=</span></span>
<span class="line"><span style="color:#e1e4e8;">uid: admin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># admin, users, accounts, freehan.ink</span></span>
<span class="line"><span style="color:#e1e4e8;">dn: uid=admin,cn=users,cn=accounts,dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: top</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: person</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: posixaccount</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: krbprincipalaux</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: krbticketpolicyaux</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: inetuser</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: ipaobject</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: ipasshuser</span></span>
<span class="line"><span style="color:#e1e4e8;">objectClass: ipaSshGroupOfPubKeys</span></span>
<span class="line"><span style="color:#e1e4e8;">uid: admin</span></span>
<span class="line"><span style="color:#e1e4e8;">cn: Administrator</span></span>
<span class="line"><span style="color:#e1e4e8;">sn: Administrator</span></span>
<span class="line"><span style="color:#e1e4e8;">uidNumber: 428200000</span></span>
<span class="line"><span style="color:#e1e4e8;">gidNumber: 428200000</span></span>
<span class="line"><span style="color:#e1e4e8;">homeDirectory: /home/admin</span></span>
<span class="line"><span style="color:#e1e4e8;">loginShell: /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">gecos: Administrator</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># search result</span></span>
<span class="line"><span style="color:#e1e4e8;">search: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">result: 0 Success</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># numResponses: 3</span></span>
<span class="line"><span style="color:#e1e4e8;"># numEntries: 2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ldapsearch -x uid=admin</span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">$ ldapsearch -x -h ipa.freehan.ink  -b dc=freehan,dc=ink uid=admin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># extended LDIF</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># LDAPv3</span></span>
<span class="line"><span style="color:#24292e;"># base &lt;dc=freehan,dc=ink&gt; with scope subtree</span></span>
<span class="line"><span style="color:#24292e;"># filter: uid=admin</span></span>
<span class="line"><span style="color:#24292e;"># requesting: ALL</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># admin, users, compat, freehan.ink</span></span>
<span class="line"><span style="color:#24292e;">dn: uid=admin,cn=users,cn=compat,dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#24292e;">objectClass: posixAccount</span></span>
<span class="line"><span style="color:#24292e;">objectClass: ipaOverrideTarget</span></span>
<span class="line"><span style="color:#24292e;">objectClass: top</span></span>
<span class="line"><span style="color:#24292e;">gecos: Administrator</span></span>
<span class="line"><span style="color:#24292e;">cn: Administrator</span></span>
<span class="line"><span style="color:#24292e;">uidNumber: 428200000</span></span>
<span class="line"><span style="color:#24292e;">gidNumber: 428200000</span></span>
<span class="line"><span style="color:#24292e;">loginShell: /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">homeDirectory: /home/admin</span></span>
<span class="line"><span style="color:#24292e;">ipaAnchorUUID:: OklQQTpmcmVlaGFuLmluazo3NTc1Y2JiNC00ZGJkLTExZWMtOWFkNi0wMDE2M2</span></span>
<span class="line"><span style="color:#24292e;"> UxNTBlYTg=</span></span>
<span class="line"><span style="color:#24292e;">uid: admin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># admin, users, accounts, freehan.ink</span></span>
<span class="line"><span style="color:#24292e;">dn: uid=admin,cn=users,cn=accounts,dc=freehan,dc=ink</span></span>
<span class="line"><span style="color:#24292e;">objectClass: top</span></span>
<span class="line"><span style="color:#24292e;">objectClass: person</span></span>
<span class="line"><span style="color:#24292e;">objectClass: posixaccount</span></span>
<span class="line"><span style="color:#24292e;">objectClass: krbprincipalaux</span></span>
<span class="line"><span style="color:#24292e;">objectClass: krbticketpolicyaux</span></span>
<span class="line"><span style="color:#24292e;">objectClass: inetuser</span></span>
<span class="line"><span style="color:#24292e;">objectClass: ipaobject</span></span>
<span class="line"><span style="color:#24292e;">objectClass: ipasshuser</span></span>
<span class="line"><span style="color:#24292e;">objectClass: ipaSshGroupOfPubKeys</span></span>
<span class="line"><span style="color:#24292e;">uid: admin</span></span>
<span class="line"><span style="color:#24292e;">cn: Administrator</span></span>
<span class="line"><span style="color:#24292e;">sn: Administrator</span></span>
<span class="line"><span style="color:#24292e;">uidNumber: 428200000</span></span>
<span class="line"><span style="color:#24292e;">gidNumber: 428200000</span></span>
<span class="line"><span style="color:#24292e;">homeDirectory: /home/admin</span></span>
<span class="line"><span style="color:#24292e;">loginShell: /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">gecos: Administrator</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># search result</span></span>
<span class="line"><span style="color:#24292e;">search: 2</span></span>
<span class="line"><span style="color:#24292e;">result: 0 Success</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># numResponses: 3</span></span>
<span class="line"><span style="color:#24292e;"># numEntries: 2</span></span></code></pre></div><ul><li>重启服务</li></ul><p>systemctl restart nslcd.service</p><p>systemctl restart slapd</p><p>systemctl restart openvpn-server@server.service</p><h2 id="_5-配置google验证" tabindex="-1">5.配置google验证 <a class="header-anchor" href="#_5-配置google验证" aria-label="Permalink to &quot;5.配置google验证&quot;">​</a></h2><p>参考gogle验证</p><h2 id="_6-自动创建家目录" tabindex="-1">6.自动创建家目录 <a class="header-anchor" href="#_6-自动创建家目录" aria-label="Permalink to &quot;6.自动创建家目录&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">dnf install oddjob-mkhomedir</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;session optional pam_oddjob_mkhomedir.so skel=/etc/skel/ umask=0022&quot; &gt;&gt; /etc/pam.d/system-auth</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart oddjobd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#切换用户</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@idm openvpn]# su - jmumr</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating home directory for jmumr.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[jmumr@idm ~]$ ls</span></span>
<span class="line"><span style="color:#e1e4e8;">[jmumr@idm ~]$ logout</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">dnf install oddjob-mkhomedir</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;session optional pam_oddjob_mkhomedir.so skel=/etc/skel/ umask=0022&quot; &gt;&gt; /etc/pam.d/system-auth</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">systemctl restart oddjobd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#切换用户</span></span>
<span class="line"><span style="color:#24292e;">[root@idm openvpn]# su - jmumr</span></span>
<span class="line"><span style="color:#24292e;">Creating home directory for jmumr.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[jmumr@idm ~]$ ls</span></span>
<span class="line"><span style="color:#24292e;">[jmumr@idm ~]$ logout</span></span></code></pre></div>`,26),o=[l];function c(t,r,i,d,y,u){return n(),a("div",null,o)}const m=s(p,[["render",c]]);export{g as __pageData,m as default};
