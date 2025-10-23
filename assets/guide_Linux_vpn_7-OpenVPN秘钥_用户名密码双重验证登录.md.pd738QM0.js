import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"1.配置openvpn使用  秘钥+用户名密码 验证登录","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/7-OpenVPN秘钥+用户名密码双重验证登录.md","filePath":"guide/Linux/vpn/7-OpenVPN秘钥+用户名密码双重验证登录.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/7-OpenVPN秘钥+用户名密码双重验证登录.md"},l=a(`<h1 id="_1-配置openvpn使用-秘钥-用户名密码-验证登录" tabindex="-1">1.配置openvpn使用 秘钥+用户名密码 验证登录 <a class="header-anchor" href="#_1-配置openvpn使用-秘钥-用户名密码-验证登录" aria-label="Permalink to &quot;1.配置openvpn使用  秘钥+用户名密码 验证登录&quot;">​</a></h1><h2 id="_1-修改server端配置文件-添加以下三行代码。" tabindex="-1">1.修改Server端配置文件，添加以下三行代码。 <a class="header-anchor" href="#_1-修改server端配置文件-添加以下三行代码。" aria-label="Permalink to &quot;1.修改Server端配置文件，添加以下三行代码。&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">auth-user-pass-verify /etc/openvpn/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;">script-security 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">auth-user-pass-verify /etc/openvpn/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;">script-security 3</span></span></code></pre></div><p>注：</p><p>如果加上client-cert-not-required则代表只使用用户名密码方式验证登录，</p><p>如果不加，则代表需要证书和用户名密码双重验证登录！</p><p>使用用户名和密码进行客户端身份验证并非意味着完全不需要证书，CA证书和服务器证书还是需要的</p><p>2).checkpsw.sh</p><p>下载地址：<a href="http://openvpn.se/files/other/checkpsw.sh" target="_blank" rel="noreferrer">http://openvpn.se/files/other/checkpsw.sh</a></p><p>wget <a href="http://openvpn.se/files/other/checkpsw.sh" target="_blank" rel="noreferrer">http://openvpn.se/files/other/checkpsw.sh</a> -P /etc/openvpn/</p><p>或者创建checkpsw.sh文件，直接复制粘贴以下代码也可以。</p><p>PASSFILE和LOG_FILE是密码文件和日志文件的路径，这里我们默认就好，不用修改</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#e1e4e8;">###########################################################</span></span>
<span class="line"><span style="color:#e1e4e8;"># checkpsw.sh (C) 2004 Mathias Sundman &lt;mathias@openvpn.se&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># This script will authenticate OpenVPN users against</span></span>
<span class="line"><span style="color:#e1e4e8;"># a plain text file. The passfile should simply contain</span></span>
<span class="line"><span style="color:#e1e4e8;"># one row per user with the username first followed by</span></span>
<span class="line"><span style="color:#e1e4e8;"># one or more space(s) or tab(s) and then the password.</span></span>
<span class="line"><span style="color:#e1e4e8;">PASSFILE=&quot;/etc/openvpn/psw-file&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">LOG_FILE=&quot;/var/log/openvpn-password.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">TIME_STAMP=\`date &quot;+%Y-%m-%d %T&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">###########################################################</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ ! -r &quot;\${PASSFILE}&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">  echo &quot;\${TIME_STAMP}: Could not open password file \\&quot;\${PASSFILE}\\&quot; for reading.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">CORRECT_PASSWORD=\`awk &#39;!/^;/&amp;&amp;!/^#/&amp;&amp;$1==&quot;&#39;\${username}&#39;&quot;{print $2;exit}&#39; \${PASSFILE}\`</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ &quot;\${CORRECT_PASSWORD}&quot; = &quot;&quot; ]; then </span></span>
<span class="line"><span style="color:#e1e4e8;">  echo &quot;\${TIME_STAMP}: User does not exist: username=\\&quot;\${username}\\&quot;, password=\\&quot;\${password}\\&quot;.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ &quot;\${password}&quot; = &quot;\${CORRECT_PASSWORD}&quot; ]; then </span></span>
<span class="line"><span style="color:#e1e4e8;">  echo &quot;\${TIME_STAMP}: Successful authentication: username=\\&quot;\${username}\\&quot;.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#e1e4e8;">  exit 0</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;\${TIME_STAMP}: Incorrect password: username=\\&quot;\${username}\\&quot;, password=\\&quot;\${password}\\&quot;.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#e1e4e8;">exit 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292e;">###########################################################</span></span>
<span class="line"><span style="color:#24292e;"># checkpsw.sh (C) 2004 Mathias Sundman &lt;mathias@openvpn.se&gt;</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># This script will authenticate OpenVPN users against</span></span>
<span class="line"><span style="color:#24292e;"># a plain text file. The passfile should simply contain</span></span>
<span class="line"><span style="color:#24292e;"># one row per user with the username first followed by</span></span>
<span class="line"><span style="color:#24292e;"># one or more space(s) or tab(s) and then the password.</span></span>
<span class="line"><span style="color:#24292e;">PASSFILE=&quot;/etc/openvpn/psw-file&quot;</span></span>
<span class="line"><span style="color:#24292e;">LOG_FILE=&quot;/var/log/openvpn-password.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">TIME_STAMP=\`date &quot;+%Y-%m-%d %T&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">###########################################################</span></span>
<span class="line"><span style="color:#24292e;">if [ ! -r &quot;\${PASSFILE}&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">  echo &quot;\${TIME_STAMP}: Could not open password file \\&quot;\${PASSFILE}\\&quot; for reading.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#24292e;">  exit 1</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">CORRECT_PASSWORD=\`awk &#39;!/^;/&amp;&amp;!/^#/&amp;&amp;$1==&quot;&#39;\${username}&#39;&quot;{print $2;exit}&#39; \${PASSFILE}\`</span></span>
<span class="line"><span style="color:#24292e;">if [ &quot;\${CORRECT_PASSWORD}&quot; = &quot;&quot; ]; then </span></span>
<span class="line"><span style="color:#24292e;">  echo &quot;\${TIME_STAMP}: User does not exist: username=\\&quot;\${username}\\&quot;, password=\\&quot;\${password}\\&quot;.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#24292e;">  exit 1</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">if [ &quot;\${password}&quot; = &quot;\${CORRECT_PASSWORD}&quot; ]; then </span></span>
<span class="line"><span style="color:#24292e;">  echo &quot;\${TIME_STAMP}: Successful authentication: username=\\&quot;\${username}\\&quot;.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#24292e;">  exit 0</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;\${TIME_STAMP}: Incorrect password: username=\\&quot;\${username}\\&quot;, password=\\&quot;\${password}\\&quot;.&quot; &gt;&gt; \${LOG_FILE}</span></span>
<span class="line"><span style="color:#24292e;">exit 1</span></span></code></pre></div><p>添加执行权限</p><p>chmod +x /etc/openvpn/checkpsw.sh</p><p>3). 创建用户和密码认证文件</p><p>vim /etc/openvpn/psw-file</p><p>admin 123456 (前面是用户 后面是密码)</p><p>注：这里 psw-file的权限</p><p>chmod 400 /etc/openvpn/psw-file</p><p>chown nobody.nobody /etc/openvpn/psw-file</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">user1    pass-user1</span></span>
<span class="line"><span style="color:#e1e4e8;">#comment</span></span>
<span class="line"><span style="color:#e1e4e8;">user2   pass-user2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">user1    pass-user1</span></span>
<span class="line"><span style="color:#24292e;">#comment</span></span>
<span class="line"><span style="color:#24292e;">user2   pass-user2</span></span></code></pre></div><ul><li>直接往这个文件写入用户和密码即可，并不需要重启openvpn服务</li></ul><h2 id="_4-修改客户端配置文件-client-ovpn" tabindex="-1">4. 修改客户端配置文件：client.ovpn <a class="header-anchor" href="#_4-修改客户端配置文件-client-ovpn" aria-label="Permalink to &quot;4. 修改客户端配置文件：client.ovpn&quot;">​</a></h2><p>再添加这一行，就会提示输入用户名和密码</p><p>auth-user-pass</p><p>5).重启OpenVPN服务，测试客户端登录</p><h1 id="s端配置文件" tabindex="-1">S端配置文件 <a class="header-anchor" href="#s端配置文件" aria-label="Permalink to &quot;S端配置文件&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">port 1194</span></span>
<span class="line"><span style="color:#e1e4e8;">proto udp</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ca /etc/openvpn/server/ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">cert /etc/openvpn/server/server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">key /etc/openvpn/server/server.key</span></span>
<span class="line"><span style="color:#e1e4e8;">dh /etc/openvpn/server/dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#VPN CIDR</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#推送的S端的CIDR给C端路由</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 10.0.0.0 255.255.224.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#推送S端DNS</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 10.247.3.10&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 20 120</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">log         /dev/stdout</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append  /dev/stdout</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">explicit-exit-notify 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#启用用户/密码进行登录需要添加的选项</span></span>
<span class="line"><span style="color:#e1e4e8;">#栗子文件里面没有这些信息</span></span>
<span class="line"><span style="color:#e1e4e8;">script-security 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass-verify /etc/openvpn/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#e1e4e8;">#http://openvpn.se/files/other/checkpsw.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">#去下载这个脚本</span></span>
<span class="line"><span style="color:#e1e4e8;">#client-cert-not-required</span></span>
<span class="line"><span style="color:#e1e4e8;">#此选项只使用用户密码，不使用证书</span></span>
<span class="line"><span style="color:#e1e4e8;">#注释它，使用证书和用户密码双重登录</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">port 1194</span></span>
<span class="line"><span style="color:#24292e;">proto udp</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ca /etc/openvpn/server/ca.crt</span></span>
<span class="line"><span style="color:#24292e;">cert /etc/openvpn/server/server.crt</span></span>
<span class="line"><span style="color:#24292e;">key /etc/openvpn/server/server.key</span></span>
<span class="line"><span style="color:#24292e;">dh /etc/openvpn/server/dh.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#VPN CIDR</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#推送的S端的CIDR给C端路由</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 10.0.0.0 255.255.224.0&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#推送S端DNS</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 10.247.3.10&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">client-to-client</span></span>
<span class="line"><span style="color:#24292e;">keepalive 20 120</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">log         /dev/stdout</span></span>
<span class="line"><span style="color:#24292e;">log-append  /dev/stdout</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">explicit-exit-notify 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#启用用户/密码进行登录需要添加的选项</span></span>
<span class="line"><span style="color:#24292e;">#栗子文件里面没有这些信息</span></span>
<span class="line"><span style="color:#24292e;">script-security 3</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass-verify /etc/openvpn/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#24292e;">#http://openvpn.se/files/other/checkpsw.sh</span></span>
<span class="line"><span style="color:#24292e;">#去下载这个脚本</span></span>
<span class="line"><span style="color:#24292e;">#client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;">#此选项只使用用户密码，不使用证书</span></span>
<span class="line"><span style="color:#24292e;">#注释它，使用证书和用户密码双重登录</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span></code></pre></div><h1 id="c端配置文件" tabindex="-1">C端配置文件 <a class="header-anchor" href="#c端配置文件" aria-label="Permalink to &quot;C端配置文件&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">proto udp</span></span>
<span class="line"><span style="color:#e1e4e8;">remote addr port</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#此处我将CA证书和C端证书信息写入配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">#当然，也可下载证书在指定，但这麻烦了</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">xxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/ca&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;cert&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">xxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/cert&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;key&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#e1e4e8;">xxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/key&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#用户认证</span></span>
<span class="line"><span style="color:#e1e4e8;">script-security 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass</span></span>
<span class="line"><span style="color:#e1e4e8;">#可将用户信息写入文件，用户密码各一行</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">proto udp</span></span>
<span class="line"><span style="color:#24292e;">remote addr port</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#此处我将CA证书和C端证书信息写入配置文件</span></span>
<span class="line"><span style="color:#24292e;">#当然，也可下载证书在指定，但这麻烦了</span></span>
<span class="line"><span style="color:#24292e;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">xxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">&lt;/ca&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;cert&gt;</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">xxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">&lt;/cert&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;key&gt;</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#24292e;">xxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#24292e;">-----END PRIVATE KEY-----</span></span>
<span class="line"><span style="color:#24292e;">&lt;/key&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#用户认证</span></span>
<span class="line"><span style="color:#24292e;">script-security 3</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span>
<span class="line"><span style="color:#24292e;">#可将用户信息写入文件，用户密码各一行</span></span></code></pre></div><h1 id="_2-案例" tabindex="-1">2，案例 <a class="header-anchor" href="#_2-案例" aria-label="Permalink to &quot;2，案例&quot;">​</a></h1><h2 id="_2-1-via-env" tabindex="-1">2.1 via-env <a class="header-anchor" href="#_2-1-via-env" aria-label="Permalink to &quot;2.1 via-env&quot;">​</a></h2><ul><li>目录结构</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx openvpn]# tree -L 2</span></span>
<span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">├── ccd</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── han</span></span>
<span class="line"><span style="color:#e1e4e8;">├── checkpsw.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">├── client</span></span>
<span class="line"><span style="color:#e1e4e8;">├── openvpn-auth.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">├── psw-file</span></span>
<span class="line"><span style="color:#e1e4e8;">├── server</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── ca.key</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── client-common.txt</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── crl.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── easy-rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── openvpn.log</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── openvpn-status.log</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── server.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── server.key</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── ta.key</span></span>
<span class="line"><span style="color:#e1e4e8;">├── via-file</span></span>
<span class="line"><span style="color:#e1e4e8;">└── viafile.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx /etc/openvpn]#mkdir ccd;chow -R root.openvpn ccd</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx /etc/openvpn]#cd ccd;touch han(根据用户创建)</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx /etc/openvpn/ccd]#cat han</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-push 10.8.0.3 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx openvpn]# cat psw-file </span></span>
<span class="line"><span style="color:#e1e4e8;">han 123456</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@hkfengkongnginx openvpn]# tree -L 2</span></span>
<span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">├── ccd</span></span>
<span class="line"><span style="color:#24292e;">│   └── han</span></span>
<span class="line"><span style="color:#24292e;">├── checkpsw.sh</span></span>
<span class="line"><span style="color:#24292e;">├── client</span></span>
<span class="line"><span style="color:#24292e;">├── openvpn-auth.sh</span></span>
<span class="line"><span style="color:#24292e;">├── psw-file</span></span>
<span class="line"><span style="color:#24292e;">├── server</span></span>
<span class="line"><span style="color:#24292e;">│   ├── ca.crt</span></span>
<span class="line"><span style="color:#24292e;">│   ├── ca.key</span></span>
<span class="line"><span style="color:#24292e;">│   ├── client-common.txt</span></span>
<span class="line"><span style="color:#24292e;">│   ├── crl.pem</span></span>
<span class="line"><span style="color:#24292e;">│   ├── dh.pem</span></span>
<span class="line"><span style="color:#24292e;">│   ├── easy-rsa</span></span>
<span class="line"><span style="color:#24292e;">│   ├── ipp.txt</span></span>
<span class="line"><span style="color:#24292e;">│   ├── openvpn.log</span></span>
<span class="line"><span style="color:#24292e;">│   ├── openvpn-status.log</span></span>
<span class="line"><span style="color:#24292e;">│   ├── server.conf</span></span>
<span class="line"><span style="color:#24292e;">│   ├── server.crt</span></span>
<span class="line"><span style="color:#24292e;">│   ├── server.key</span></span>
<span class="line"><span style="color:#24292e;">│   └── ta.key</span></span>
<span class="line"><span style="color:#24292e;">├── via-file</span></span>
<span class="line"><span style="color:#24292e;">└── viafile.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@hkfengkongnginx /etc/openvpn]#mkdir ccd;chow -R root.openvpn ccd</span></span>
<span class="line"><span style="color:#24292e;">[root@hkfengkongnginx /etc/openvpn]#cd ccd;touch han(根据用户创建)</span></span>
<span class="line"><span style="color:#24292e;">[root@hkfengkongnginx /etc/openvpn/ccd]#cat han</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-push 10.8.0.3 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@hkfengkongnginx openvpn]# cat psw-file </span></span>
<span class="line"><span style="color:#24292e;">han 123456</span></span></code></pre></div><ul><li>server端配置文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">port 61379</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">ca ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">cert server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">key server.key</span></span>
<span class="line"><span style="color:#e1e4e8;">dh dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#e1e4e8;">topology subnet</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 1.1.1.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">client-config-dir /etc/openvpn/ccd</span></span>
<span class="line"><span style="color:#e1e4e8;">#route 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.31.65.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 120</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">user nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">group nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append openvpn.log </span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20 </span></span>
<span class="line"><span style="color:#e1e4e8;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;">script-security 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass-verify /etc/openvpn/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth-user-pass-verify /etc/openvpn/openvpn-auth.sh via-file</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">port 61379</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 0</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 0</span></span>
<span class="line"><span style="color:#24292e;">ca ca.crt</span></span>
<span class="line"><span style="color:#24292e;">cert server.crt</span></span>
<span class="line"><span style="color:#24292e;">key server.key</span></span>
<span class="line"><span style="color:#24292e;">dh dh.pem</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">tls-auth ta.key 0</span></span>
<span class="line"><span style="color:#24292e;">topology subnet</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist ipp.txt</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 1.1.1.1&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">client-config-dir /etc/openvpn/ccd</span></span>
<span class="line"><span style="color:#24292e;">#route 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.31.65.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 120</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">user nobody</span></span>
<span class="line"><span style="color:#24292e;">group nobody</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">status openvpn-status.log</span></span>
<span class="line"><span style="color:#24292e;">log-append openvpn.log </span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100</span></span>
<span class="line"><span style="color:#24292e;">mute 20 </span></span>
<span class="line"><span style="color:#24292e;">crl-verify crl.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;">script-security 3</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass-verify /etc/openvpn/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#24292e;">#auth-user-pass-verify /etc/openvpn/openvpn-auth.sh via-file</span></span></code></pre></div><blockquote><p>[!NOTE] /etc/openvpn/server/ccd 使用其他路径，否则客户端会出现权限拒绝</p><p>默认的/etc/openvpn/server/ccd路径，但它导致以下错误</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Could not access file &#39;ccd/koromicha&#39;: Permission denied (errno=13)</span></span>
<span class="line"><span style="color:#e1e4e8;">Could not access file &#39;ccd/DEFAULT&#39;: Permission denied (errno=13)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Could not access file &#39;ccd/koromicha&#39;: Permission denied (errno=13)</span></span>
<span class="line"><span style="color:#24292e;">Could not access file &#39;ccd/DEFAULT&#39;: Permission denied (errno=13)</span></span></code></pre></div></blockquote><ul><li>client端配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">remote 127.0.0.1 1194</span></span>
<span class="line"><span style="color:#e1e4e8;">route 10.8.0.3 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 1</span></span>
<span class="line"><span style="color:#e1e4e8;">redirect-gateway def1</span></span>
<span class="line"><span style="color:#e1e4e8;">#route-nopull</span></span>
<span class="line"><span style="color:#e1e4e8;">route-method exe</span></span>
<span class="line"><span style="color:#e1e4e8;">route-delay 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">script-security 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 0</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 0</span></span>
<span class="line"><span style="color:#24292e;">remote 127.0.0.1 1194</span></span>
<span class="line"><span style="color:#24292e;">route 10.8.0.3 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">key-direction 1</span></span>
<span class="line"><span style="color:#24292e;">redirect-gateway def1</span></span>
<span class="line"><span style="color:#24292e;">#route-nopull</span></span>
<span class="line"><span style="color:#24292e;">route-method exe</span></span>
<span class="line"><span style="color:#24292e;">route-delay 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">script-security 3</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span></code></pre></div><blockquote><p>[!NOTE] client 端配置是全局走openvpn流量</p></blockquote><ul><li>登陆效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201032211.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx openvpn]# tail /var/log/openvpn-password.log </span></span>
<span class="line"><span style="color:#e1e4e8;">2021-01-28 10:53:53: Successful authentication: username=&quot;han&quot;.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@hkfengkongnginx openvpn]# tail /var/log/openvpn-password.log </span></span>
<span class="line"><span style="color:#24292e;">2021-01-28 10:53:53: Successful authentication: username=&quot;han&quot;.</span></span></code></pre></div><h2 id="_2-2-via-file" tabindex="-1">2.2 via-file <a class="header-anchor" href="#_2-2-via-file" aria-label="Permalink to &quot;2.2 via-file&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx openvpn]# cat openvpn-auth.sh </span></span>
<span class="line"><span style="color:#e1e4e8;">read -p &quot;Login:&quot; Login;read -p &quot;Password:&quot; Password;[ -n &quot;$Login&quot; ] &amp;&amp; [ -n &quot;$Password&quot; ] &amp;&amp; echo -e &quot;$Login\\t$(echo $Password|md5sum|cut -f 1 -d &#39; &#39;)&quot;&gt;&gt;/etc/openvpn/via-file</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx openvpn]# cat via-file </span></span>
<span class="line"><span style="color:#e1e4e8;">han	f447b20a7fcbf53a5d5be013ea0b15af</span></span>
<span class="line"><span style="color:#e1e4e8;">li	5ce4e85ef0aa7345d829abec08780219</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@hkfengkongnginx openvpn]# cat openvpn-auth.sh </span></span>
<span class="line"><span style="color:#24292e;">read -p &quot;Login:&quot; Login;read -p &quot;Password:&quot; Password;[ -n &quot;$Login&quot; ] &amp;&amp; [ -n &quot;$Password&quot; ] &amp;&amp; echo -e &quot;$Login\\t$(echo $Password|md5sum|cut -f 1 -d &#39; &#39;)&quot;&gt;&gt;/etc/openvpn/via-file</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@hkfengkongnginx openvpn]# cat via-file </span></span>
<span class="line"><span style="color:#24292e;">han	f447b20a7fcbf53a5d5be013ea0b15af</span></span>
<span class="line"><span style="color:#24292e;">li	5ce4e85ef0aa7345d829abec08780219</span></span></code></pre></div><h2 id="_2-3-不让全部流量走vpn通道" tabindex="-1">2.3 不让全部流量走VPN通道 <a class="header-anchor" href="#_2-3-不让全部流量走vpn通道" aria-label="Permalink to &quot;2.3 不让全部流量走VPN通道&quot;">​</a></h2><ul><li>修改前</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201033459.png" alt=""></p><p>在百度中查看ip，发现也确实是该VPN所在的ip</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201033562.png" alt=""></p><p>仅仅需要10.8.0.x这些走VPN</p><p>在client端配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 在remote ip port 这行后面加入</span></span>
<span class="line"><span style="color:#e1e4e8;">route 10.101.232.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 文件末尾注释掉，防止所有网络都走VPN服务器， 如果想全部流量通过VPN则添加这一行。</span></span>
<span class="line"><span style="color:#e1e4e8;"># redirect-gateway def1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加下面一行，不从服务器拉取路由表</span></span>
<span class="line"><span style="color:#e1e4e8;">route-nopull</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 在remote ip port 这行后面加入</span></span>
<span class="line"><span style="color:#24292e;">route 10.101.232.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 文件末尾注释掉，防止所有网络都走VPN服务器， 如果想全部流量通过VPN则添加这一行。</span></span>
<span class="line"><span style="color:#24292e;"># redirect-gateway def1</span></span>
<span class="line"><span style="color:#24292e;"># 添加下面一行，不从服务器拉取路由表</span></span>
<span class="line"><span style="color:#24292e;">route-nopull</span></span></code></pre></div><ul><li>完整配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">remote 127.0.0.1 1194</span></span>
<span class="line"><span style="color:#e1e4e8;">route 10.8.0.3 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 1</span></span>
<span class="line"><span style="color:#e1e4e8;">route-nopull</span></span>
<span class="line"><span style="color:#e1e4e8;">route-method exe</span></span>
<span class="line"><span style="color:#e1e4e8;">route-delay 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">script-security 3</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 0</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 0</span></span>
<span class="line"><span style="color:#24292e;">remote 127.0.0.1 1194</span></span>
<span class="line"><span style="color:#24292e;">route 10.8.0.3 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">key-direction 1</span></span>
<span class="line"><span style="color:#24292e;">route-nopull</span></span>
<span class="line"><span style="color:#24292e;">route-method exe</span></span>
<span class="line"><span style="color:#24292e;">route-delay 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">script-security 3</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span></code></pre></div>`,56),o=[l];function c(t,r,i,y,u,d){return n(),e("div",null,o)}const g=s(p,[["render",c]]);export{v as __pageData,g as default};
