import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/16-OpenVPN_FreeRADIUS_PrivacyIDEA.md","filePath":"guide/Linux/vpn/16-OpenVPN_FreeRADIUS_PrivacyIDEA.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/16-OpenVPN_FreeRADIUS_PrivacyIDEA.md"},l=e(`<ul><li>ubuntu20.04</li><li>openvpn2.4</li><li>freeradius3.6.0</li><li>privacyIDEA 3.6.3</li><li>172.18.106.134-----&gt;radius</li><li>172.18.106.135-----&gt;openvpn</li></ul><h1 id="_1-介绍" tabindex="-1">1.介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1.介绍&quot;">​</a></h1><p>RSA提供了完整的身份认证解决方案，特别是RSA SecurID双因素身份认证解决方案，已成为该领域的事实标准，该解决方案以易于实现、成熟、可靠等特点在信息安全领域赢得广泛信赖。RSA的产品覆盖 也非常的广，除了传统的硬件token设备，也有在智能设备上使用的软token，非常方便</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201039516.jpeg" alt=""></p><p>但是对于中小型公司来讲，使用RSA这种商用身份认证解决方案成本高昂。往往因为IT预算不足限制了企业对双因素方案的选择</p><p>Google Authenticator项目是可用于多手机平台的生成一次性密码的软件实现，包含可插拔验证模块(PAM)的实现。通过使用开放标准的 Initiative for Open Authentication (OATH，与OAuth不同)来生成一次性密码。支持RFC 4226文档定义的基于HMAC的一次性密码(HOTP)算法和由 RFC 6238文档定义的基于时间的一次性密码 (TOTP)算法。</p><p>随着google-authenticator的成熟，使用openvpn和双因素认证系统结合，让搭建完全基于开源软件的安全远程接入系统成为可能。</p><p>OpenVPN是一个用于创建虚拟专用网络(Virtual Private Network)加密通道的免费开源软件。使用OpenVPN可以方便地在家庭、办公场所、住宿酒店等不同网络访问场所之间搭建类似于局域网的专用网络通道。</p><p>在PAM中使用Google Authenticator，提供双因素认证已经实现。但是管理维护非常麻烦，也不直观。用户必须是系统账户，用户修改pin码或者生成新的token需 要登陆系统，执行命令，对于小白用户的使用有些困难，登录系统也会有潜在的安全风险。对于管理员来讲，不能使用公司现有的账户系统，需要在认证系统上创建 管理另一套账户系统。</p><p>PrivacyIDEA是一个模块化的认证系统，认证服务器。使用privacyIDEA可以增强本地登录，VPN，远程访问，SSH连接，在认证 期间访问网站或门户网站是很好使用的双因素，提高现有应用程序的安全性。它最初被用于OTP(一次性密码)，认证设备来作为一个OTP服务器。但其他的 “设备”之类的挑战响应，SSH密钥和X509证书也可提供。它可以运行在Linux系统并且是完全开源的。</p><p>PrivacyIDEA有着友好的管理界面。无论是管理员管理系统还是用户自管理，都可以非常方便轻松的在Web上完成操作。PrivacyIDEA可以读取本地文件中的用户、数据库中的用户，也可以读取LDAP中的用户。这样就可以完全和公司的账户系统联动，非常方便</p><p>PrivacyIDEA的HOTP、TOTP使用Google Authenticator。这样，我们在智能手机上的使用Google Authenticator的APP将非常方便。</p><p>PrivacyIDEA提供了三种方式和OpenVPN集成。第一种，使用PAM的privacyidea_pam.py模块。OpneVPN使用 PAM认证，PAM调用privacyidea_pam.py模块和PrivacyIDEA做验证。第二种，直接集成OpenVPN和 FreeRADIUS。OpenVPN使用radius认证，FreeRADIUS向PrivacyIDEA验证。第三种，在OpenVPN中使用 RADIUS的PAM模块</p><h1 id="_2-方案" tabindex="-1">2.方案 <a class="header-anchor" href="#_2-方案" aria-label="Permalink to &quot;2.方案&quot;">​</a></h1><p>OpenVPN+FreeRADIUS+PrivacyIDEA</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201039512.jpeg" alt=""></p><p>首先远端用户发起VPN连接，提供认证信息。然后，OpenVPN向FreeRADIUS去做认证并提供用户认证信息。接 着，FreeRADIUS通过perl脚本向PrivacyIDEA验证信息正确与否。然后，PrivacyIDEA将验证结果发给 FreeRADIUS，FreeRADIUS再将认证结果发送OpenvVPN。最后，OpenvVPN查看结果，认证成功建立连接。如果认证失败，断开 连接，发送失败信息</p><h1 id="_3-privacyidea" tabindex="-1">3.privacyIDEA <a class="header-anchor" href="#_3-privacyidea" aria-label="Permalink to &quot;3.privacyIDEA&quot;">​</a></h1><h2 id="add-repository" tabindex="-1">Add repository <a class="header-anchor" href="#add-repository" aria-label="Permalink to &quot;Add repository&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">apt update</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">apt install software-properties-common</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://lancelot.netknights.it/NetKnights-Release.asc</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">gpg --import --import-options show-only --with-fingerprint NetKnights-Release.asc</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add-apt-repository http://lancelot.netknights.it/community/focal/stable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">apt update</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">apt install software-properties-common</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget https://lancelot.netknights.it/NetKnights-Release.asc</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">gpg --import --import-options show-only --with-fingerprint NetKnights-Release.asc</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add-apt-repository http://lancelot.netknights.it/community/focal/stable</span></span></code></pre></div><h2 id="installation-of-privacyidea-3-x" tabindex="-1">Installation of privacyIDEA 3.x <a class="header-anchor" href="#installation-of-privacyidea-3-x" aria-label="Permalink to &quot;Installation of privacyIDEA 3.x&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#apt install privacyidea-apache2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#privacyidea-nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#apt install privacyidea-apache2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#privacyidea-nginx</span></span></code></pre></div><h2 id="配置管理员用户" tabindex="-1">配置管理员用户 <a class="header-anchor" href="#配置管理员用户" aria-label="Permalink to &quot;配置管理员用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pi-manage admin add admin -e admin@freehan.ink</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pi-manage admin add admin -e admin@freehan.ink</span></span></code></pre></div><h2 id="登录" tabindex="-1">登录 <a class="header-anchor" href="#登录" aria-label="Permalink to &quot;登录&quot;">​</a></h2><p><a href="https://ip" target="_blank" rel="noreferrer">https://ip</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201039105.jpg" alt=""></p><h2 id="配置ldap" tabindex="-1">配置ldap <a class="header-anchor" href="#配置ldap" aria-label="Permalink to &quot;配置ldap&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201040936.jpg" alt=""></p><h1 id="_4-freeradius" tabindex="-1">4.FreeRADIUS <a class="header-anchor" href="#_4-freeradius" aria-label="Permalink to &quot;4.FreeRADIUS&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">apt-get install freeradius privacyidea-radius freeradius-rest freeradius-utils</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">apt-get install freeradius privacyidea-radius freeradius-rest freeradius-utils</span></span></code></pre></div><ul><li>官方文档</li></ul><p><a href="https://privacyidea.readthedocs.io/en/latest/installation/ubuntu.html#add-ubuntu-repository" target="_blank" rel="noreferrer">https://privacyidea.readthedocs.io/en/latest/installation/ubuntu.html#add-ubuntu-repository</a></p><h2 id="配置rlm-rest" tabindex="-1">配置rlm_rest <a class="header-anchor" href="#配置rlm-rest" aria-label="Permalink to &quot;配置rlm_rest&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cp /etc/freeradius/3.0/mods-available/rest{,.old}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ln -vs  /etc/freeradius/3.0/mods-available/rest /etc/freeradius/3.0/mods-enabled/rest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cp /etc/freeradius/3.0/mods-available/rest{,.old}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ln -vs  /etc/freeradius/3.0/mods-available/rest /etc/freeradius/3.0/mods-enabled/rest</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim rest</span></span>
<span class="line"><span style="color:#e1e4e8;">#修改3处地方，如下</span></span>
<span class="line"><span style="color:#e1e4e8;">connect_uri = &quot;https://172.18.106.134&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">authenticate</span></span>
<span class="line"><span style="color:#e1e4e8;">    uri = &quot;\${..connect_uri}/validate/radiuscheck&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    method = &#39;post&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    body = &#39;post&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    data = &quot;user=%{urlquote:%{User-Name}}&amp;pass=%{urlquote:%{User-Password}}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    force_to = &#39;plain&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    tls = \${..tls}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#添加detail</span></span>
<span class="line"><span style="color:#e1e4e8;">accounting {</span></span>
<span class="line"><span style="color:#e1e4e8;">		。。。</span></span>
<span class="line"><span style="color:#e1e4e8;">		detail</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim rest</span></span>
<span class="line"><span style="color:#24292e;">#修改3处地方，如下</span></span>
<span class="line"><span style="color:#24292e;">connect_uri = &quot;https://172.18.106.134&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">authenticate</span></span>
<span class="line"><span style="color:#24292e;">    uri = &quot;\${..connect_uri}/validate/radiuscheck&quot;</span></span>
<span class="line"><span style="color:#24292e;">    method = &#39;post&#39;</span></span>
<span class="line"><span style="color:#24292e;">    body = &#39;post&#39;</span></span>
<span class="line"><span style="color:#24292e;">    data = &quot;user=%{urlquote:%{User-Name}}&amp;pass=%{urlquote:%{User-Password}}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    force_to = &#39;plain&#39;</span></span>
<span class="line"><span style="color:#24292e;">    tls = \${..tls}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#添加detail</span></span>
<span class="line"><span style="color:#24292e;">accounting {</span></span>
<span class="line"><span style="color:#24292e;">		。。。</span></span>
<span class="line"><span style="color:#24292e;">		detail</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span></code></pre></div><h2 id="配置users" tabindex="-1">配置users <a class="header-anchor" href="#配置users" aria-label="Permalink to &quot;配置users&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/freeradius/3.0/users</span></span>
<span class="line"><span style="color:#e1e4e8;">#末尾添加</span></span>
<span class="line"><span style="color:#e1e4e8;">DEFAULT Auth-Type := rest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/freeradius/3.0/users</span></span>
<span class="line"><span style="color:#24292e;">#末尾添加</span></span>
<span class="line"><span style="color:#24292e;">DEFAULT Auth-Type := rest</span></span></code></pre></div><h2 id="配置clients-conf" tabindex="-1">配置clients.conf <a class="header-anchor" href="#配置clients-conf" aria-label="Permalink to &quot;配置clients.conf&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#egrep -v &quot;#|^$&quot; /etc/freeradius/3.0/clients.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#本地测试验证</span></span>
<span class="line"><span style="color:#e1e4e8;">client localhost {</span></span>
<span class="line"><span style="color:#e1e4e8;">	ipaddr = 172.18.106.134</span></span>
<span class="line"><span style="color:#e1e4e8;">	proto = *</span></span>
<span class="line"><span style="color:#e1e4e8;">	secret = testing123</span></span>
<span class="line"><span style="color:#e1e4e8;">	require_message_authenticator = no</span></span>
<span class="line"><span style="color:#e1e4e8;">	limit {</span></span>
<span class="line"><span style="color:#e1e4e8;">		max_connections = 16</span></span>
<span class="line"><span style="color:#e1e4e8;">		lifetime = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">		idle_timeout = 30</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">client localhost_ipv6 {</span></span>
<span class="line"><span style="color:#e1e4e8;">	ipv6addr	= ::1</span></span>
<span class="line"><span style="color:#e1e4e8;">	secret		= testing123</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#openvpn验证</span></span>
<span class="line"><span style="color:#e1e4e8;">client openvpn {</span></span>
<span class="line"><span style="color:#e1e4e8;">	ipaddr = 0.0.0.0/0</span></span>
<span class="line"><span style="color:#e1e4e8;">	proto = *</span></span>
<span class="line"><span style="color:#e1e4e8;">	secret = testing123</span></span>
<span class="line"><span style="color:#e1e4e8;">	require_message_authenticator = no</span></span>
<span class="line"><span style="color:#e1e4e8;">	nastype     = other</span></span>
<span class="line"><span style="color:#e1e4e8;">	limit {</span></span>
<span class="line"><span style="color:#e1e4e8;">		max_connections = 1000</span></span>
<span class="line"><span style="color:#e1e4e8;">		lifetime = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">		idle_timeout = 30</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#egrep -v &quot;#|^$&quot; /etc/freeradius/3.0/clients.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#本地测试验证</span></span>
<span class="line"><span style="color:#24292e;">client localhost {</span></span>
<span class="line"><span style="color:#24292e;">	ipaddr = 172.18.106.134</span></span>
<span class="line"><span style="color:#24292e;">	proto = *</span></span>
<span class="line"><span style="color:#24292e;">	secret = testing123</span></span>
<span class="line"><span style="color:#24292e;">	require_message_authenticator = no</span></span>
<span class="line"><span style="color:#24292e;">	limit {</span></span>
<span class="line"><span style="color:#24292e;">		max_connections = 16</span></span>
<span class="line"><span style="color:#24292e;">		lifetime = 0</span></span>
<span class="line"><span style="color:#24292e;">		idle_timeout = 30</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">client localhost_ipv6 {</span></span>
<span class="line"><span style="color:#24292e;">	ipv6addr	= ::1</span></span>
<span class="line"><span style="color:#24292e;">	secret		= testing123</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#openvpn验证</span></span>
<span class="line"><span style="color:#24292e;">client openvpn {</span></span>
<span class="line"><span style="color:#24292e;">	ipaddr = 0.0.0.0/0</span></span>
<span class="line"><span style="color:#24292e;">	proto = *</span></span>
<span class="line"><span style="color:#24292e;">	secret = testing123</span></span>
<span class="line"><span style="color:#24292e;">	require_message_authenticator = no</span></span>
<span class="line"><span style="color:#24292e;">	nastype     = other</span></span>
<span class="line"><span style="color:#24292e;">	limit {</span></span>
<span class="line"><span style="color:#24292e;">		max_connections = 1000</span></span>
<span class="line"><span style="color:#24292e;">		lifetime = 0</span></span>
<span class="line"><span style="color:#24292e;">		idle_timeout = 30</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="配置rlm-perl-ini" tabindex="-1">配置rlm_perl.ini <a class="header-anchor" href="#配置rlm-perl-ini" aria-label="Permalink to &quot;配置rlm_perl.ini&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@radius:/etc/privacyidea# egrep -v &quot;#|^$&quot; rlm_perl.ini </span></span>
<span class="line"><span style="color:#e1e4e8;">[Default]</span></span>
<span class="line"><span style="color:#e1e4e8;">URL = https://172.18.106.134/validate/check</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL_CHECK = false</span></span>
<span class="line"><span style="color:#e1e4e8;">DEBUG = true</span></span>
<span class="line"><span style="color:#e1e4e8;">[Mapping]</span></span>
<span class="line"><span style="color:#e1e4e8;">[Mapping user]</span></span>
<span class="line"><span style="color:#e1e4e8;">[Attribute Filter-Id]</span></span>
<span class="line"><span style="color:#e1e4e8;">[Attribute otherAttribute]</span></span>
<span class="line"><span style="color:#e1e4e8;">[Attribute Class]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@radius:/etc/privacyidea# egrep -v &quot;#|^$&quot; rlm_perl.ini </span></span>
<span class="line"><span style="color:#24292e;">[Default]</span></span>
<span class="line"><span style="color:#24292e;">URL = https://172.18.106.134/validate/check</span></span>
<span class="line"><span style="color:#24292e;">SSL_CHECK = false</span></span>
<span class="line"><span style="color:#24292e;">DEBUG = true</span></span>
<span class="line"><span style="color:#24292e;">[Mapping]</span></span>
<span class="line"><span style="color:#24292e;">[Mapping user]</span></span>
<span class="line"><span style="color:#24292e;">[Attribute Filter-Id]</span></span>
<span class="line"><span style="color:#24292e;">[Attribute otherAttribute]</span></span>
<span class="line"><span style="color:#24292e;">[Attribute Class]</span></span></code></pre></div><h2 id="配置privacyidea" tabindex="-1">配置privacyidea <a class="header-anchor" href="#配置privacyidea" aria-label="Permalink to &quot;配置privacyidea&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@radius:/etc/freeradius/3.0# egrep -v &quot;#|^$&quot; sites-enabled/privacyidea </span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	accounting {</span></span>
<span class="line"><span style="color:#e1e4e8;">      detail</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">    authorize {</span></span>
<span class="line"><span style="color:#e1e4e8;">	update request {</span></span>
<span class="line"><span style="color:#e1e4e8;">		Packet-Src-IP-Address = &quot;%{Packet-Src-IP-Address}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">        perl-privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (ok || updated) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            update control {</span></span>
<span class="line"><span style="color:#e1e4e8;">                Auth-Type := Perl</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">	digest</span></span>
<span class="line"><span style="color:#e1e4e8;">        unix</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen {</span></span>
<span class="line"><span style="color:#e1e4e8;">        type = auth</span></span>
<span class="line"><span style="color:#e1e4e8;">        ipaddr = *</span></span>
<span class="line"><span style="color:#e1e4e8;">        port = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    authenticate {</span></span>
<span class="line"><span style="color:#e1e4e8;">	Auth-Type rest {</span></span>
<span class="line"><span style="color:#e1e4e8;">            rest</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">	digest</span></span>
<span class="line"><span style="color:#e1e4e8;">	Auth-Type Perl {</span></span>
<span class="line"><span style="color:#e1e4e8;">            perl-privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@radius:/etc/freeradius/3.0# egrep -v &quot;#|^$&quot; sites-enabled/privacyidea </span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	accounting {</span></span>
<span class="line"><span style="color:#24292e;">      detail</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">    authorize {</span></span>
<span class="line"><span style="color:#24292e;">	update request {</span></span>
<span class="line"><span style="color:#24292e;">		Packet-Src-IP-Address = &quot;%{Packet-Src-IP-Address}&quot;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">        perl-privacyidea</span></span>
<span class="line"><span style="color:#24292e;">        if (ok || updated) {</span></span>
<span class="line"><span style="color:#24292e;">            update control {</span></span>
<span class="line"><span style="color:#24292e;">                Auth-Type := Perl</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">	digest</span></span>
<span class="line"><span style="color:#24292e;">        unix</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    listen {</span></span>
<span class="line"><span style="color:#24292e;">        type = auth</span></span>
<span class="line"><span style="color:#24292e;">        ipaddr = *</span></span>
<span class="line"><span style="color:#24292e;">        port = 0</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    authenticate {</span></span>
<span class="line"><span style="color:#24292e;">	Auth-Type rest {</span></span>
<span class="line"><span style="color:#24292e;">            rest</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">	digest</span></span>
<span class="line"><span style="color:#24292e;">	Auth-Type Perl {</span></span>
<span class="line"><span style="color:#24292e;">            perl-privacyidea</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="配置token" tabindex="-1">配置token <a class="header-anchor" href="#配置token" aria-label="Permalink to &quot;配置token&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201040240.jpg" alt=""></p><h2 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@radius:/etc/privacyidea#freeradius -X</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@radius:/etc/privacyidea# echo &quot;User-Name=han, User-Password=PIN+OTP&quot; | radclient -sx 172.18.106.134 auth testing123 </span></span>
<span class="line"><span style="color:#e1e4e8;">Sent Access-Request Id 154 from 0.0.0.0:57117 to 172.18.106.134:1812 length 68</span></span>
<span class="line"><span style="color:#e1e4e8;">	User-Name = &quot;han&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	User-Password = &quot;han123449104&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	Cleartext-Password = &quot;han123449104&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">Received Access-Accept Id 154 from 172.18.106.134:1812 to 172.18.106.134:57117 length 48</span></span>
<span class="line"><span style="color:#e1e4e8;">	Reply-Message = &quot;privacyIDEA access granted&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">Packet summary:</span></span>
<span class="line"><span style="color:#e1e4e8;">	Accepted      : 1</span></span>
<span class="line"><span style="color:#e1e4e8;">	Rejected      : 0</span></span>
<span class="line"><span style="color:#e1e4e8;">	Lost          : 0</span></span>
<span class="line"><span style="color:#e1e4e8;">	Passed filter : 1</span></span>
<span class="line"><span style="color:#e1e4e8;">	Failed filter : 0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#提示如上信息说明成功</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@radius:/etc/privacyidea#freeradius -X</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@radius:/etc/privacyidea# echo &quot;User-Name=han, User-Password=PIN+OTP&quot; | radclient -sx 172.18.106.134 auth testing123 </span></span>
<span class="line"><span style="color:#24292e;">Sent Access-Request Id 154 from 0.0.0.0:57117 to 172.18.106.134:1812 length 68</span></span>
<span class="line"><span style="color:#24292e;">	User-Name = &quot;han&quot;</span></span>
<span class="line"><span style="color:#24292e;">	User-Password = &quot;han123449104&quot;</span></span>
<span class="line"><span style="color:#24292e;">	Cleartext-Password = &quot;han123449104&quot;</span></span>
<span class="line"><span style="color:#24292e;">Received Access-Accept Id 154 from 172.18.106.134:1812 to 172.18.106.134:57117 length 48</span></span>
<span class="line"><span style="color:#24292e;">	Reply-Message = &quot;privacyIDEA access granted&quot;</span></span>
<span class="line"><span style="color:#24292e;">Packet summary:</span></span>
<span class="line"><span style="color:#24292e;">	Accepted      : 1</span></span>
<span class="line"><span style="color:#24292e;">	Rejected      : 0</span></span>
<span class="line"><span style="color:#24292e;">	Lost          : 0</span></span>
<span class="line"><span style="color:#24292e;">	Passed filter : 1</span></span>
<span class="line"><span style="color:#24292e;">	Failed filter : 0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#提示如上信息说明成功</span></span></code></pre></div><h1 id="_5-配置openvpn" tabindex="-1">5.配置openvpn <a class="header-anchor" href="#_5-配置openvpn" aria-label="Permalink to &quot;5.配置openvpn&quot;">​</a></h1><h2 id="安装radiusplugin" tabindex="-1">安装radiusplugin <a class="header-anchor" href="#安装radiusplugin" aria-label="Permalink to &quot;安装radiusplugin&quot;">​</a></h2><ul><li>下载radiusplugin</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget http://www.nongnu.org/radiusplugin/radiusplugin_v2.1a_beta1.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget http://www.nongnu.org/radiusplugin/radiusplugin_v2.1a_beta1.tar.gz</span></span></code></pre></div><ul><li>安装依赖</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install gcc gcc-c++ libgcrypt*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install gcc gcc-c++ libgcrypt*</span></span></code></pre></div><ul><li>编译</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">tarzxvf radiusplugin_v2.1a_beta1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cd radiusplugin_v2.1a_beta1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">make</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cp radiusplugin.so /etc/openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cp radiusplugin.cnf /etc/openvpn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">tarzxvf radiusplugin_v2.1a_beta1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cd radiusplugin_v2.1a_beta1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">make</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cp radiusplugin.so /etc/openvpn</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cp radiusplugin.cnf /etc/openvpn</span></span></code></pre></div><h3 id="配置radiusplugin-cnf" tabindex="-1">配置radiusplugin.cnf <a class="header-anchor" href="#配置radiusplugin-cnf" aria-label="Permalink to &quot;配置radiusplugin.cnf&quot;">​</a></h3><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#F97583;">root</span><span style="color:#E1E4E8;">@vpn </span><span style="color:#F97583;">openvpn</span><span style="color:#E1E4E8;">]</span><span style="color:#6A737D;"># cat radiusplugin.cnf </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">NAS</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Identifier</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">other</span></span>
<span class="line"><span style="color:#E1E4E8;">Service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Type</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">Framed</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Protocol</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">NAS</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Port</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Type</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">NAS</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">IP</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Address</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.18</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">106.135</span></span>
<span class="line"><span style="color:#E1E4E8;">OpenVPNConfig</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">etc</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">openvpn</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">server</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">server.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">subnet</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">255.255</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">255.0</span></span>
<span class="line"><span style="color:#E1E4E8;">overwriteccfiles</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">nonfatalaccounting</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">true</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">server</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	acctport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1813</span></span>
<span class="line"><span style="color:#E1E4E8;">	authport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1812</span></span>
<span class="line"><span style="color:#E1E4E8;">	name</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.18</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">106.134</span></span>
<span class="line"><span style="color:#E1E4E8;">	retry</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">	wait</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">	sharedsecret</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">testing123</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#D73A49;">root</span><span style="color:#24292E;">@vpn </span><span style="color:#D73A49;">openvpn</span><span style="color:#24292E;">]</span><span style="color:#6A737D;"># cat radiusplugin.cnf </span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">NAS</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Identifier</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">other</span></span>
<span class="line"><span style="color:#24292E;">Service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Type</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">Framed</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Protocol</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">NAS</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Port</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Type</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">NAS</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">IP</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Address</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.18</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">106.135</span></span>
<span class="line"><span style="color:#24292E;">OpenVPNConfig</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">etc</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">openvpn</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">server</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">server.conf</span></span>
<span class="line"><span style="color:#24292E;">subnet</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">255.255</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">255.0</span></span>
<span class="line"><span style="color:#24292E;">overwriteccfiles</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">true</span></span>
<span class="line"><span style="color:#24292E;">nonfatalaccounting</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">true</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">server</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	acctport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1813</span></span>
<span class="line"><span style="color:#24292E;">	authport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1812</span></span>
<span class="line"><span style="color:#24292E;">	name</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.18</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">106.134</span></span>
<span class="line"><span style="color:#24292E;">	retry</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">	wait</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">	sharedsecret</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">testing123</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="配置vpn" tabindex="-1">配置vpn <a class="header-anchor" href="#配置vpn" aria-label="Permalink to &quot;配置vpn&quot;">​</a></h2><h3 id="server端" tabindex="-1">server端 <a class="header-anchor" href="#server端" aria-label="Permalink to &quot;server端&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">port 10020</span></span>
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
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">plugin  /etc/openvpn/radiusplugin.so /etc/openvpn/radiusplugin.cnf</span></span>
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
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">plugin  /etc/openvpn/radiusplugin.so /etc/openvpn/radiusplugin.cnf</span></span>
<span class="line"><span style="color:#24292e;">client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><h3 id="client端" tabindex="-1">client端 <a class="header-anchor" href="#client端" aria-label="Permalink to &quot;client端&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">remote 39.99.129.148 10020</span></span>
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
<span class="line"><span style="color:#e1e4e8;">auth-user-pass</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 36000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">remote 39.99.129.148 10020</span></span>
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
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 36000</span></span></code></pre></div><p>注意，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ProtectSystem=true</span></span>
<span class="line"><span style="color:#e1e4e8;">ProtectHome=true  --&gt;必须关闭这个</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ProtectSystem=true</span></span>
<span class="line"><span style="color:#24292e;">ProtectHome=true  --&gt;必须关闭这个</span></span></code></pre></div>`,65),o=[l];function t(c,r,i,y,d,u){return n(),a("div",null,o)}const v=s(p,[["render",t]]);export{g as __pageData,v as default};
