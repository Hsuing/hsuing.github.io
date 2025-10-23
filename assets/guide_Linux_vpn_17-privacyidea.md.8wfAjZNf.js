import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.privacyIDEA的介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/17-privacyidea.md","filePath":"guide/Linux/vpn/17-privacyidea.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/17-privacyidea.md"},l=n(`<ul><li>centos7_x86</li><li>privacyIDEA 3.3.1</li><li>apache</li><li>mariadb-5.5</li><li>python2.7</li></ul><p>官方文档</p><ul><li>ldap配置</li></ul><p><a href="https://privacyidea.readthedocs.io/en/latest/configuration/useridresolvers.html#ldap-resolver" target="_blank" rel="noreferrer">https://privacyidea.readthedocs.io/en/latest/configuration/useridresolvers.html#ldap-resolver</a></p><ul><li>安装</li></ul><p><a href="https://privacyidea.readthedocs.io/en/latest/installation/centos.html" target="_blank" rel="noreferrer">https://privacyidea.readthedocs.io/en/latest/installation/centos.html</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git clone https://github.com/privacyidea/privacyidea.git</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git clone https://github.com/privacyidea/privacyidea.git</span></span></code></pre></div><h1 id="_1-privacyidea的介绍" tabindex="-1">1.privacyIDEA的介绍 <a class="header-anchor" href="#_1-privacyidea的介绍" aria-label="Permalink to &quot;1.privacyIDEA的介绍&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201041605.jpg" alt=""></p><h2 id="privacyidea是什么" tabindex="-1">privacyIDEA是什么 <a class="header-anchor" href="#privacyidea是什么" aria-label="Permalink to &quot;privacyIDEA是什么&quot;">​</a></h2><p>– 模块化的身份验证服务器</p><p>– 可通过双因素身份验证来增强应用程序的安全</p><h2 id="privacyidea的作用" tabindex="-1">privacyIDEA的作用 <a class="header-anchor" href="#privacyidea的作用" aria-label="Permalink to &quot;privacyIDEA的作用&quot;">​</a></h2><p>– 可增强本地登录的安全性</p><p>– 可增强VPN的安全性</p><p>– 可增强远程访问的安全性</p><p>– 可增强SSH连接的安全性</p><p>– 可增强访问网站或Web门户网站的安全性</p><p>注，</p><p>privacyIDEA最初有如下作用，</p><p>– 作为OTP服务器的提供OTP（一次性密码）认证设备</p><p>– 也可用户其他设备的Challenge Response、U2F、Yubikeys、SSH秘钥和x509证书</p><h2 id="软件特点" tabindex="-1">软件特点 <a class="header-anchor" href="#软件特点" aria-label="Permalink to &quot;软件特点&quot;">​</a></h2><p>– 运行于Linux系统</p><p>– 完全开源，基于AGPLv3的许可发布</p><p>– 系统由Python语言编写</p><p>– 使用Flask的Web框架</p><p>– 使用SQL数据库作为数据存储</p><h2 id="支持的用户来源" tabindex="-1">支持的用户来源 <a class="header-anchor" href="#支持的用户来源" aria-label="Permalink to &quot;支持的用户来源&quot;">​</a></h2><p>– LDAP服务</p><p>– Active Directory</p><p>– SQL数据库</p><p>– 平面文件</p><p>– SCIM服务</p><h2 id="privacyidea的功能" tabindex="-1">privacyIDEA的功能 <a class="header-anchor" href="#privacyidea的功能" aria-label="Permalink to &quot;privacyIDEA的功能&quot;">​</a></h2><h3 id="支持的认证设备" tabindex="-1">支持的认证设备 <a class="header-anchor" href="#支持的认证设备" aria-label="Permalink to &quot;支持的认证设备&quot;">​</a></h3><p>– Simple pass token，即简单的令牌传递（实际总回应ACCEPTED）</p><p>– HOTP/TOTP，支持的品牌有SafeNet/eToken Pass、Safeword、Feitian、Smartdisplayer（所有OATH令牌）</p><p>– Push-Button key fobs，即按钮式密码卡</p><p>– OTP cards，即One-time Password或称动态口令</p><p>– Smartphone Apps，如Google Authenticator或FreeOTP</p><p>– MOTP，即移动密码系统</p><p>– QR code，即通过扫描QR码验证TiQR令牌</p><p>– RADIUS token，即将身份验证请求转发给RADIUS服务器</p><p>– REMOTE token，即将身份验证请求转发给别的privacyIDEA服务器</p><p>– Email-Token，即通过电子邮件发送的一次性密码</p><p>– SMS-Token，即通过短信发送一次性密码（SMSOTP,mTAN,mobileTAN）</p><p>– Yubikey in all Modes，即Yubikey的所有模式，包括OATH HOTP、Challenge Response、Yubico AES</p><p>– Day OTP token，即通过一天使用一个密码并在第二天更改令牌的密码的验证设备</p><p>– Password token，即将OTP PIN与附加密码的组合，适用于内部丢失令牌的场景</p><p>– SSH public key，即SSH令牌包含公共的SSH秘钥，此SSH秘钥可分发到计算机用于SSH登录</p><p>– x509 certificates，即由证书颁发机构颁发的x509证书</p><p>– Registration Token，即注册令牌，便于部署</p><p>– python class inherited from TokenClass，即从TokenClass继承的新Python类来添加新的身份验证设备</p><h3 id="支持的认证接口" tabindex="-1">支持的认证接口 <a class="header-anchor" href="#支持的认证接口" aria-label="Permalink to &quot;支持的认证接口&quot;">​</a></h3><p>– 支持REST API（符合RESTful设计架构的接口）和JWT（JSON Web Token）身份验证</p><p>– 支持返回JSON输出</p><p>– 支持与SimpleSAMLphp一起充当SAML身份提供程序</p><p>– 插件可用于，</p><p>– – FreeRADIUS</p><p>– – PAM（支持离线OTP）</p><p>– – Apache2</p><p>– – OTRS</p><p>– – Django</p><p>– – ownCloud</p><p>– – WordPress</p><p>– – TYPO3</p><p>– – Contao</p><p>– – dokuwiki等等</p><h3 id="支持的登录方式" tabindex="-1">支持的登录方式 <a class="header-anchor" href="#支持的登录方式" aria-label="Permalink to &quot;支持的登录方式&quot;">​</a></h3><p>– 用户或管理员可以登录privacyIDEA WebUI</p><p>– 用户或管理员可针对其他用户（例如域密码）或针对privacyIDEA（使用OTP）进行身份验证</p><h3 id="支持的管理" tabindex="-1">支持的管理 <a class="header-anchor" href="#支持的管理" aria-label="Permalink to &quot;支持的管理&quot;">​</a></h3><p>– 支持创建解析器和领域</p><p>– 支持查看审核日志</p><p>– 支持管理令牌，具体是注册或删除、分配或取消分配、设置PIN、导入、启用或禁用、重新同步令牌、查看令牌详情</p><p>– 支持获取特定的令牌OTP值</p><p>– 支持获取特定OTP值的令牌序列号</p><p>– 支持定义令牌默认设置</p><p>– 支持令牌有效期</p><p>– 支持令牌最大使用量（根据每天或单个令牌的使用计数，例如可限制10此成功登录或20此尝试登录，或多少周内有效）</p><p>– 支持创建丢失的令牌，即将临时令牌注册给丢失令牌的用户</p><p>– 支持定义策略</p><p>– 支持通过RADIUS侧列进行简单迁移</p><p>– 支持定义根据任何的操作定义任何操作</p><h3 id="支持的自助服务" tabindex="-1">支持的自助服务 <a class="header-anchor" href="#支持的自助服务" aria-label="Permalink to &quot;支持的自助服务&quot;">​</a></h3><p>– 支持用户可通过WebUI自行管理自己的令牌</p><p>– 支持通过QR码（Google身份验证器）、通过种子或令牌的序列号注册新令牌</p><p>– 支持删除、禁用、启用和设置PIN</p><p>– 支持查看与用户相关的账号、令牌的审核日志</p><h3 id="支持的用户来源-1" tabindex="-1">支持的用户来源 <a class="header-anchor" href="#支持的用户来源-1" aria-label="Permalink to &quot;支持的用户来源&quot;">​</a></h3><p>– 支持用户的来源有，平面文件、SQL数据库、LDAP、openLDAP、Active Directory或其他LDAP服务器或SCIM服务器</p><p>– 支持根据SQL用户表定义设置，有些程序包含预定义配置，如WordPress、OTRS、onwCloud和Tine 2.0</p><p>– 支持根据LDAP目录定义设置，有些程序包含预定义配置，如openLDAP和Active Directory</p><p>– 支持将一个领域组合到另外一个领域，privacyIDEA可管理无限个领域</p><p>– 支持在SQL用户存储中增删改查privacyIDEA用户</p><h3 id="支持的策略" tabindex="-1">支持的策略 <a class="header-anchor" href="#支持的策略" aria-label="Permalink to &quot;支持的策略&quot;">​</a></h3><p>– 支持详细的行为配置（由复杂的策略模块支持）</p><p>– 支持为令牌管理、系统配置、自助服务、身份验证、授权 、注册和审核定义策略</p><p>– 支持针对某些用户、领域、管理员、管理员操作、请求的客户端、请求令牌的类型等使用策略</p><p>– 支持管理范围策略，如定义管理界面中允许管理员执行的操作（每个操作）</p><p>– 支持系统范围策略，如定义允许那个管理员配置privacyIDEA</p><p>– 支持自助服务范围策略，如定义允许用户在自助服务门户中使用它的令牌执行操作（定制从本地网络或因特网登录权限不同）</p><p>– 支持身份验证范围策略，如定义要求用户使用OTP值以外的OTP PIN登录或额外使用LDAP密码登陆</p><p>– 支持授权范围策略，如定义需要某些类型的令牌或序列号登录</p><p>– 支持注册范围策略，如定义允许用户分配的令牌数或领域包含的令牌数或注册期间的随机OTP PIN或OTP PIN强度</p><p>– 支持审计范围，如定义允许那个管理严查看审计日志</p><p>– 支持导入和导出、启用或禁用策略</p><h3 id="支持的事件处理程序" tabindex="-1">支持的事件处理程序 <a class="header-anchor" href="#支持的事件处理程序" aria-label="Permalink to &quot;支持的事件处理程序&quot;">​</a></h3><p>– 支持响应事件的电子邮件通知</p><p>– 支持定义已处理事件不会更改原始行为</p><p>– 支持通过简单的模块设置增强时间处理</p><h3 id="支持的审计" tabindex="-1">支持的审计 <a class="header-anchor" href="#支持的审计" aria-label="Permalink to &quot;支持的审计&quot;">​</a></h3><p>– 详细的审计日志存储到SQL数据库</p><p>– 审计条目经过数据签名和检查以防止删除（防篡改）</p><p>– 审计日志会跟踪事件状态、事件触发者、涉及的令牌、请求的客户端、执行的privacyIDEA服务器以及其他详细信息</p><h3 id="支持的机器和应用" tabindex="-1">支持的机器和应用 <a class="header-anchor" href="#支持的机器和应用" aria-label="Permalink to &quot;支持的机器和应用&quot;">​</a></h3><p>– 支持定义客户端的计算机</p><p>– 支持定义应用程序的类型（SSH、PAM、LUKS），支持分配令牌到计算机的那些程序、支持脱机身份验证</p><h3 id="支持的数据库" tabindex="-1">支持的数据库 <a class="header-anchor" href="#支持的数据库" aria-label="Permalink to &quot;支持的数据库&quot;">​</a></h3><p>– SQLite</p><p>– MySQL</p><p>– PostgreSQL</p><p>– Oracle</p><p>– DB2</p><p>注：令牌秘钥数据库中使用AES加密</p><h1 id="_2-安装" tabindex="-1">2.安装 <a class="header-anchor" href="#_2-安装" aria-label="Permalink to &quot;2.安装&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install mariadb-server httpd mod_wsgi mod_ssl python-virtualenv policycoreutils-python mysql-devel</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y python-devel openjpeg-devel openldap-devel libffi-devel freetype-devel freeradius-perl libpng-devel postgresql-devel perl-libwww-perl perl-Config-IniFiles perl-Try-Tiny perl-Data-Dump perl-JSON perl-LWP-Protocol-https</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y libxslt-devel libxml2-devel </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">yum install gcc postgresql-devel -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install mariadb-server httpd mod_wsgi mod_ssl python-virtualenv policycoreutils-python mysql-devel</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum install -y python-devel openjpeg-devel openldap-devel libffi-devel freetype-devel freeradius-perl libpng-devel postgresql-devel perl-libwww-perl perl-Config-IniFiles perl-Try-Tiny perl-Data-Dump perl-JSON perl-LWP-Protocol-https</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum install -y libxslt-devel libxml2-devel </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">yum install gcc postgresql-devel -y</span></span></code></pre></div><ul><li>配置ulimit</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt; /etc/security/limits.d/20-nproc.conf &lt;&lt;&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># Default limit for number of user&#39;s processes to prevent</span></span>
<span class="line"><span style="color:#e1e4e8;"># accidental fork bombs.</span></span>
<span class="line"><span style="color:#e1e4e8;"># See rhbz #432903 for reasoning.</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">#nproc</span></span>
<span class="line"><span style="color:#e1e4e8;">*          soft    nproc     65535</span></span>
<span class="line"><span style="color:#e1e4e8;">root       soft    nproc     unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*          hard    nproc     65535</span></span>
<span class="line"><span style="color:#e1e4e8;">root       hard    nproc     unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">#nofile</span></span>
<span class="line"><span style="color:#e1e4e8;">*          soft    nofile     65535</span></span>
<span class="line"><span style="color:#e1e4e8;">*          hard    nofile     65535</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改systemd系统级ulimit</span></span>
<span class="line"><span style="color:#e1e4e8;">cat &gt;&gt; /etc/systemd/system.conf &lt;&lt;&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">DefaultLimitCORE=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;">DefaultLimitNOFILE=100000</span></span>
<span class="line"><span style="color:#e1e4e8;">DefaultLimitNPROC=100000</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改systemd用户级ulimit</span></span>
<span class="line"><span style="color:#e1e4e8;">cat &gt;&gt;  /etc/systemd/user.conf &lt;&lt;&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">DefaultLimitCORE=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;">DefaultLimitNOFILE=100000</span></span>
<span class="line"><span style="color:#e1e4e8;">DefaultLimitNPROC=100000</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">ulimit -a|egrep &#39;open files|max user processes&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt; /etc/security/limits.d/20-nproc.conf &lt;&lt;&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#24292e;"># Default limit for number of user&#39;s processes to prevent</span></span>
<span class="line"><span style="color:#24292e;"># accidental fork bombs.</span></span>
<span class="line"><span style="color:#24292e;"># See rhbz #432903 for reasoning.</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">#nproc</span></span>
<span class="line"><span style="color:#24292e;">*          soft    nproc     65535</span></span>
<span class="line"><span style="color:#24292e;">root       soft    nproc     unlimited</span></span>
<span class="line"><span style="color:#24292e;">*          hard    nproc     65535</span></span>
<span class="line"><span style="color:#24292e;">root       hard    nproc     unlimited</span></span>
<span class="line"><span style="color:#24292e;">#nofile</span></span>
<span class="line"><span style="color:#24292e;">*          soft    nofile     65535</span></span>
<span class="line"><span style="color:#24292e;">*          hard    nofile     65535</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;"># 修改systemd系统级ulimit</span></span>
<span class="line"><span style="color:#24292e;">cat &gt;&gt; /etc/systemd/system.conf &lt;&lt;&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#24292e;">DefaultLimitCORE=infinity</span></span>
<span class="line"><span style="color:#24292e;">DefaultLimitNOFILE=100000</span></span>
<span class="line"><span style="color:#24292e;">DefaultLimitNPROC=100000</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"># 修改systemd用户级ulimit</span></span>
<span class="line"><span style="color:#24292e;">cat &gt;&gt;  /etc/systemd/user.conf &lt;&lt;&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#24292e;">DefaultLimitCORE=infinity</span></span>
<span class="line"><span style="color:#24292e;">DefaultLimitNOFILE=100000</span></span>
<span class="line"><span style="color:#24292e;">DefaultLimitNPROC=100000</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">ulimit -a|egrep &#39;open files|max user processes&#39;</span></span></code></pre></div><ul><li><h3 id="配置名称解析" tabindex="-1">配置名称解析 <a class="header-anchor" href="#配置名称解析" aria-label="Permalink to &quot;配置名称解析&quot;">​</a></h3></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /etc/hosts</span></span>
<span class="line"><span style="color:#e1e4e8;">172.18.106.132	privacyidea privacyidea.freehan.ink freehan.ink</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /etc/hosts</span></span>
<span class="line"><span style="color:#24292e;">172.18.106.132	privacyidea privacyidea.freehan.ink freehan.ink</span></span></code></pre></div><ul><li><h3 id="关闭selinux" tabindex="-1">关闭selinux <a class="header-anchor" href="#关闭selinux" aria-label="Permalink to &quot;关闭selinux&quot;">​</a></h3></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">setenforce 0</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39; /etc/selinux/config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">setenforce 0</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/SELINUX=enforcing/SELINUX=disabled/g&#39; /etc/selinux/config</span></span></code></pre></div><ul><li><h3 id="配置ntp服务与时区" tabindex="-1">配置ntp服务与时区 <a class="header-anchor" href="#配置ntp服务与时区" aria-label="Permalink to &quot;配置ntp服务与时区&quot;">​</a></h3></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install -y chrony</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#启动服务并配置自启动</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start chronyd.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable chronyd.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注：如果内网有NTP服务器，请根据实际情况修改如下配置，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">grep server /etc/chrony.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">需要修改的参数如下，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server 0.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#e1e4e8;">server 1.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#e1e4e8;">server 2.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#e1e4e8;">server 3.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#e1e4e8;">配置时区，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">timedatectl set-timezone Asia/Shanghai</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install -y chrony</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#启动服务并配置自启动</span></span>
<span class="line"><span style="color:#24292e;">systemctl start chronyd.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable chronyd.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注：如果内网有NTP服务器，请根据实际情况修改如下配置，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">grep server /etc/chrony.conf</span></span>
<span class="line"><span style="color:#24292e;">需要修改的参数如下，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server 0.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#24292e;">server 1.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#24292e;">server 2.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#24292e;">server 3.centos.pool.ntp.org iburst</span></span>
<span class="line"><span style="color:#24292e;">配置时区，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">timedatectl set-timezone Asia/Shanghai</span></span></code></pre></div><ul><li><h3 id="配置防火墙" tabindex="-1">配置防火墙 <a class="header-anchor" href="#配置防火墙" aria-label="Permalink to &quot;配置防火墙&quot;">​</a></h3></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-service=http --add-service=https</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --list-all</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-service=http --add-service=https</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --list-all</span></span></code></pre></div><ul><li><h2 id="部署开发环境" tabindex="-1">部署开发环境 <a class="header-anchor" href="#部署开发环境" aria-label="Permalink to &quot;部署开发环境&quot;">​</a></h2></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum groupinstall -y &#39;Development Tools&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum groupinstall -y &#39;Development Tools&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ systemctl enable --now httpd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl enable --now mariadb</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$systemctl start mariadb.service</span></span>
<span class="line"><span style="color:#e1e4e8;">$systemctl enable mariadb.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#初始化数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">$ mysql_secure_installation</span></span>
<span class="line"><span style="color:#e1e4e8;">[...]</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter current password for root (enter for none):</span></span>
<span class="line"><span style="color:#e1e4e8;">[...]</span></span>
<span class="line"><span style="color:#e1e4e8;">Set root password? [Y/n] y</span></span>
<span class="line"><span style="color:#e1e4e8;">New password:******</span></span>
<span class="line"><span style="color:#e1e4e8;">Re-enter new password:******</span></span>
<span class="line"><span style="color:#e1e4e8;">[...]</span></span>
<span class="line"><span style="color:#e1e4e8;">Remove anonymous users? [Y/n] y</span></span>
<span class="line"><span style="color:#e1e4e8;">[...]</span></span>
<span class="line"><span style="color:#e1e4e8;">Disallow root login remotely? [Y/n] n</span></span>
<span class="line"><span style="color:#e1e4e8;">[...]</span></span>
<span class="line"><span style="color:#e1e4e8;">Remove test database and access to it? [Y/n] y</span></span>
<span class="line"><span style="color:#e1e4e8;">[...]</span></span>
<span class="line"><span style="color:#e1e4e8;">Reload privilege tables now? [Y/n] y</span></span>
<span class="line"><span style="color:#e1e4e8;">[...]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ systemctl enable --now httpd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ systemctl enable --now mariadb</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$systemctl start mariadb.service</span></span>
<span class="line"><span style="color:#24292e;">$systemctl enable mariadb.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#初始化数据库</span></span>
<span class="line"><span style="color:#24292e;">$ mysql_secure_installation</span></span>
<span class="line"><span style="color:#24292e;">[...]</span></span>
<span class="line"><span style="color:#24292e;">Enter current password for root (enter for none):</span></span>
<span class="line"><span style="color:#24292e;">[...]</span></span>
<span class="line"><span style="color:#24292e;">Set root password? [Y/n] y</span></span>
<span class="line"><span style="color:#24292e;">New password:******</span></span>
<span class="line"><span style="color:#24292e;">Re-enter new password:******</span></span>
<span class="line"><span style="color:#24292e;">[...]</span></span>
<span class="line"><span style="color:#24292e;">Remove anonymous users? [Y/n] y</span></span>
<span class="line"><span style="color:#24292e;">[...]</span></span>
<span class="line"><span style="color:#24292e;">Disallow root login remotely? [Y/n] n</span></span>
<span class="line"><span style="color:#24292e;">[...]</span></span>
<span class="line"><span style="color:#24292e;">Remove test database and access to it? [Y/n] y</span></span>
<span class="line"><span style="color:#24292e;">[...]</span></span>
<span class="line"><span style="color:#24292e;">Reload privilege tables now? [Y/n] y</span></span>
<span class="line"><span style="color:#24292e;">[...]</span></span></code></pre></div><h2 id="配置idea数据库" tabindex="-1">配置idea数据库 <a class="header-anchor" href="#配置idea数据库" aria-label="Permalink to &quot;配置idea数据库&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo &#39;create database privacyidea;&#39; | mysql -u root -p</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;create user &quot;pi&quot;@&quot;localhost&quot; identified by &quot;privacyideapwd&quot;;&#39; | mysql -u root -p</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;grant all privileges on privacyidea.* to &quot;privacyidea&quot;@&quot;localhost&quot; identified by &quot;privacyideapwd&quot;;&#39; | mysql -u root -p</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#测试你的配置</span></span>
<span class="line"><span style="color:#e1e4e8;">mysql -uprivacyidea -pprivacyideapwd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo &#39;create database privacyidea;&#39; | mysql -u root -p</span></span>
<span class="line"><span style="color:#24292e;">echo &#39;create user &quot;pi&quot;@&quot;localhost&quot; identified by &quot;privacyideapwd&quot;;&#39; | mysql -u root -p</span></span>
<span class="line"><span style="color:#24292e;">echo &#39;grant all privileges on privacyidea.* to &quot;privacyidea&quot;@&quot;localhost&quot; identified by &quot;privacyideapwd&quot;;&#39; | mysql -u root -p</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#测试你的配置</span></span>
<span class="line"><span style="color:#24292e;">mysql -uprivacyidea -pprivacyideapwd</span></span></code></pre></div><h2 id="配置目录" tabindex="-1">配置目录 <a class="header-anchor" href="#配置目录" aria-label="Permalink to &quot;配置目录&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ mkdir /etc/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">$ mkdir /opt/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">$ mkdir /var/log/privacyidea</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ mkdir /etc/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">$ mkdir /opt/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">$ mkdir /var/log/privacyidea</span></span></code></pre></div><h2 id="配置用户" tabindex="-1">配置用户 <a class="header-anchor" href="#配置用户" aria-label="Permalink to &quot;配置用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ useradd -r -M -d /opt/privacyidea privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">$ chown privacyidea:privacyidea /opt/privacyidea /etc/privacyidea /var/log/privacyidea</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ useradd -r -M -d /opt/privacyidea privacyidea</span></span>
<span class="line"><span style="color:#24292e;">$ chown privacyidea:privacyidea /opt/privacyidea /etc/privacyidea /var/log/privacyidea</span></span></code></pre></div><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ su - privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#Create the virtual environment</span></span>
<span class="line"><span style="color:#e1e4e8;">$ virtualenv /opt/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#activate</span></span>
<span class="line"><span style="color:#e1e4e8;">$ . /opt/privacyidea/bin/activate</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#update pip</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ pip install -U pip setuptools</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#install</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ export PI_VERSION=3.3.1</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ pip install -r https://raw.githubusercontent.com/privacyidea/privacyidea/v\${PI_VERSION}/requirements.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$pip install MySQL-python</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># install the targeted privacyIDEA</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ pip install privacyidea==\${PI_VERSION}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ su - privacyidea</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#Create the virtual environment</span></span>
<span class="line"><span style="color:#24292e;">$ virtualenv /opt/privacyidea</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#activate</span></span>
<span class="line"><span style="color:#24292e;">$ . /opt/privacyidea/bin/activate</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#update pip</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ pip install -U pip setuptools</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#install</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ export PI_VERSION=3.3.1</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ pip install -r https://raw.githubusercontent.com/privacyidea/privacyidea/v\${PI_VERSION}/requirements.txt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$pip install MySQL-python</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># install the targeted privacyIDEA</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ pip install privacyidea==\${PI_VERSION}</span></span></code></pre></div><h2 id="配置privacyidea" tabindex="-1">配置privacyIDEA <a class="header-anchor" href="#配置privacyidea" aria-label="Permalink to &quot;配置privacyIDEA&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">(privacyidea)$vim /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># The realm, where users are allowed to login as administrators</span></span>
<span class="line"><span style="color:#e1e4e8;">SUPERUSER_REALM = [&#39;super&#39;, &#39;administrators&#39;]</span></span>
<span class="line"><span style="color:#e1e4e8;"># Your database</span></span>
<span class="line"><span style="color:#e1e4e8;">SQLALCHEMY_DATABASE_URI = &#39;mysql://privacyidea:privacyideapwd@localhost/privacyidea&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># This is used to encrypt the auth_token</span></span>
<span class="line"><span style="color:#e1e4e8;">SECRET_KEY = &#39;t0p s3cr3t&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># This is used to encrypt the admin passwords</span></span>
<span class="line"><span style="color:#e1e4e8;">PI_PEPPER = &quot;Never know...&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># This is used to encrypt the token data and token passwords</span></span>
<span class="line"><span style="color:#e1e4e8;">PI_ENCFILE = &#39;/etc/privacyidea/enckey&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># This is used to sign the audit log</span></span>
<span class="line"><span style="color:#e1e4e8;">PI_AUDIT_KEY_PRIVATE = &#39;/etc/privacyidea/private.pem&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">PI_AUDIT_KEY_PUBLIC = &#39;/etc/privacyidea/public.pem&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">PI_LOGFILE = &#39;/var/log/privacyidea/privacyidea.log&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># PI_LOGLEVEL = 20</span></span>
<span class="line"><span style="color:#e1e4e8;"># PI_INIT_CHECK_HOOK = &#39;your.module.function&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ chmod 640 /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># a new PI_PEPPER and SECRET_KEY must be generated</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ PEPPER=&quot;$(tr -dc A-Za-z0-9_ &lt;/dev/urandom | head -c24)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ echo &quot;PI_PEPPER = &#39;$PEPPER&#39;&quot; &gt;&gt; /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ SECRET=&quot;$(tr -dc A-Za-z0-9_ &lt;/dev/urandom | head -c24)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ echo &quot;SECRET_KEY = &#39;$SECRET&#39;&quot; &gt;&gt; /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#pi-manage-tool </span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ pi-manage create_enckey  # encryption key for the database</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ pi-manage create_audit_keys  # key for verification of audit log entries</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea)$ pi-manage createdb  # create the database structure</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">(privacyidea)$vim /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># The realm, where users are allowed to login as administrators</span></span>
<span class="line"><span style="color:#24292e;">SUPERUSER_REALM = [&#39;super&#39;, &#39;administrators&#39;]</span></span>
<span class="line"><span style="color:#24292e;"># Your database</span></span>
<span class="line"><span style="color:#24292e;">SQLALCHEMY_DATABASE_URI = &#39;mysql://privacyidea:privacyideapwd@localhost/privacyidea&#39;</span></span>
<span class="line"><span style="color:#24292e;"># This is used to encrypt the auth_token</span></span>
<span class="line"><span style="color:#24292e;">SECRET_KEY = &#39;t0p s3cr3t&#39;</span></span>
<span class="line"><span style="color:#24292e;"># This is used to encrypt the admin passwords</span></span>
<span class="line"><span style="color:#24292e;">PI_PEPPER = &quot;Never know...&quot;</span></span>
<span class="line"><span style="color:#24292e;"># This is used to encrypt the token data and token passwords</span></span>
<span class="line"><span style="color:#24292e;">PI_ENCFILE = &#39;/etc/privacyidea/enckey&#39;</span></span>
<span class="line"><span style="color:#24292e;"># This is used to sign the audit log</span></span>
<span class="line"><span style="color:#24292e;">PI_AUDIT_KEY_PRIVATE = &#39;/etc/privacyidea/private.pem&#39;</span></span>
<span class="line"><span style="color:#24292e;">PI_AUDIT_KEY_PUBLIC = &#39;/etc/privacyidea/public.pem&#39;</span></span>
<span class="line"><span style="color:#24292e;">PI_LOGFILE = &#39;/var/log/privacyidea/privacyidea.log&#39;</span></span>
<span class="line"><span style="color:#24292e;"># PI_LOGLEVEL = 20</span></span>
<span class="line"><span style="color:#24292e;"># PI_INIT_CHECK_HOOK = &#39;your.module.function&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ chmod 640 /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># a new PI_PEPPER and SECRET_KEY must be generated</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ PEPPER=&quot;$(tr -dc A-Za-z0-9_ &lt;/dev/urandom | head -c24)&quot;</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ echo &quot;PI_PEPPER = &#39;$PEPPER&#39;&quot; &gt;&gt; /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ SECRET=&quot;$(tr -dc A-Za-z0-9_ &lt;/dev/urandom | head -c24)&quot;</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ echo &quot;SECRET_KEY = &#39;$SECRET&#39;&quot; &gt;&gt; /etc/privacyidea/pi.cfg</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#pi-manage-tool </span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ pi-manage create_enckey  # encryption key for the database</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ pi-manage create_audit_keys  # key for verification of audit log entries</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea)$ pi-manage createdb  # create the database structure</span></span></code></pre></div><h2 id="配置密码" tabindex="-1">配置密码 <a class="header-anchor" href="#配置密码" aria-label="Permalink to &quot;配置密码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pi-manage admin add admin -e admin@localhost</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#测试服务</span></span>
<span class="line"><span style="color:#e1e4e8;">(privacyidea) -bash-4.2$ pi-manage runserver -h 0.0.0.0 -p 8080</span></span>
<span class="line"><span style="color:#e1e4e8;"> ___  ____(_)  _____ _______ __/  _/ _ \\/ __/ _ |</span></span>
<span class="line"><span style="color:#e1e4e8;">  / _ \\/ __/ / |/ / _ \`/ __/ // // // // / _// __ |</span></span>
<span class="line"><span style="color:#e1e4e8;"> / .__/_/ /_/|___/\\_,_/\\__/\\_, /___/____/___/_/ |_|</span></span>
<span class="line"><span style="color:#e1e4e8;">/_/                       /___/</span></span>
<span class="line"><span style="color:#e1e4e8;">   </span></span>
<span class="line"><span style="color:#e1e4e8;"> * Serving Flask app &quot;privacyidea.app&quot; (lazy loading)</span></span>
<span class="line"><span style="color:#e1e4e8;"> * Environment: production</span></span>
<span class="line"><span style="color:#e1e4e8;">   WARNING: This is a development server. Do not use it in a production deployment.</span></span>
<span class="line"><span style="color:#e1e4e8;">   Use a production WSGI server instead.</span></span>
<span class="line"><span style="color:#e1e4e8;"> * Debug mode: off</span></span>
<span class="line"><span style="color:#e1e4e8;"> * Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pi-manage admin add admin -e admin@localhost</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#测试服务</span></span>
<span class="line"><span style="color:#24292e;">(privacyidea) -bash-4.2$ pi-manage runserver -h 0.0.0.0 -p 8080</span></span>
<span class="line"><span style="color:#24292e;"> ___  ____(_)  _____ _______ __/  _/ _ \\/ __/ _ |</span></span>
<span class="line"><span style="color:#24292e;">  / _ \\/ __/ / |/ / _ \`/ __/ // // // // / _// __ |</span></span>
<span class="line"><span style="color:#24292e;"> / .__/_/ /_/|___/\\_,_/\\__/\\_, /___/____/___/_/ |_|</span></span>
<span class="line"><span style="color:#24292e;">/_/                       /___/</span></span>
<span class="line"><span style="color:#24292e;">   </span></span>
<span class="line"><span style="color:#24292e;"> * Serving Flask app &quot;privacyidea.app&quot; (lazy loading)</span></span>
<span class="line"><span style="color:#24292e;"> * Environment: production</span></span>
<span class="line"><span style="color:#24292e;">   WARNING: This is a development server. Do not use it in a production deployment.</span></span>
<span class="line"><span style="color:#24292e;">   Use a production WSGI server instead.</span></span>
<span class="line"><span style="color:#24292e;"> * Debug mode: off</span></span>
<span class="line"><span style="color:#24292e;"> * Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)</span></span></code></pre></div><ul><li>访问</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201041456.jpg" alt=""></p><h2 id="配置apache" tabindex="-1">配置apache <a class="header-anchor" href="#配置apache" aria-label="Permalink to &quot;配置apache&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#退出privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">$ semanage fcontext -a -t httpd_sys_rw_content_t &quot;/var/log/privacyidea(/.*)?&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">$ restorecon -R /var/log/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">$ setsebool -P httpd_can_network_connect_db 1</span></span>
<span class="line"><span style="color:#e1e4e8;">$ setsebool -P httpd_can_connect_ldap 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#退出privacyidea</span></span>
<span class="line"><span style="color:#24292e;">$ semanage fcontext -a -t httpd_sys_rw_content_t &quot;/var/log/privacyidea(/.*)?&quot;</span></span>
<span class="line"><span style="color:#24292e;">$ restorecon -R /var/log/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">$ setsebool -P httpd_can_network_connect_db 1</span></span>
<span class="line"><span style="color:#24292e;">$ setsebool -P httpd_can_connect_ldap 1</span></span></code></pre></div><h2 id="配置权限" tabindex="-1">配置权限 <a class="header-anchor" href="#配置权限" aria-label="Permalink to &quot;配置权限&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">chown -R privacyidea:root /etc/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">/opt/privacyidea/bin/privacyidea-fix-access-rights -f /etc/privacyidea/pi.cfg -u privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 400 /etc/privacyidea/enckey</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 400 /etc/privacyidea/*.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">chown -R privacyidea:root /var/log/privacyidea</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">chown -R privacyidea:root /etc/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">/opt/privacyidea/bin/privacyidea-fix-access-rights -f /etc/privacyidea/pi.cfg -u privacyidea</span></span>
<span class="line"><span style="color:#24292e;">chmod 400 /etc/privacyidea/enckey</span></span>
<span class="line"><span style="color:#24292e;">chmod 400 /etc/privacyidea/*.pem</span></span>
<span class="line"><span style="color:#24292e;">chown -R privacyidea:root /var/log/privacyidea</span></span></code></pre></div><h2 id="wsgi的配置文件" tabindex="-1">wsgi的配置文件 <a class="header-anchor" href="#wsgi的配置文件" aria-label="Permalink to &quot;wsgi的配置文件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir -p /var/run/wsgi</span></span>
<span class="line"><span style="color:#e1e4e8;">cp /opt/privacyidea/etc/privacyidea/privacyideaapp.wsgi /etc/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">mv /etc/httpd/conf.d/welcome.conf /etc/httpd/conf.d/welcome.conf.disabled</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># chown -R privacyidea:root /var/run/wsgi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@iZ8vbcvjtgyijxs9ixmh6oZ conf.d]# vi /etc/httpd/conf.d/privacyidea.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir -p /var/run/wsgi</span></span>
<span class="line"><span style="color:#24292e;">cp /opt/privacyidea/etc/privacyidea/privacyideaapp.wsgi /etc/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">mv /etc/httpd/conf.d/welcome.conf /etc/httpd/conf.d/welcome.conf.disabled</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># chown -R privacyidea:root /var/run/wsgi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@iZ8vbcvjtgyijxs9ixmh6oZ conf.d]# vi /etc/httpd/conf.d/privacyidea.conf</span></span></code></pre></div><ul><li>配置文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">TraceEnable off</span></span>
<span class="line"><span style="color:#e1e4e8;">ServerSignature Off</span></span>
<span class="line"><span style="color:#e1e4e8;">ServerTokens Prod</span></span>
<span class="line"><span style="color:#e1e4e8;">WSGIPythonHome /opt/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">WSGISocketPrefix /var/run/wsgi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;VirtualHost _default_:80&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ServerAdmin webmaster@localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">  ServerName localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">  RewriteEngine On</span></span>
<span class="line"><span style="color:#e1e4e8;">  RewriteCond %{HTTPS} !=On</span></span>
<span class="line"><span style="color:#e1e4e8;">  RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/VirtualHost&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;VirtualHost _default_:443&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ServerAdmin webmaster@localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">  ServerName localhost</span></span>
<span class="line"><span style="color:#e1e4e8;">  DocumentRoot /var/www</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;Directory /&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    Require all granted</span></span>
<span class="line"><span style="color:#e1e4e8;">    Options FollowSymLinks</span></span>
<span class="line"><span style="color:#e1e4e8;">    AllowOverride None</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  # The daemon is running as user &#39;privacyidea&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  # This user should have access to the encKey database encryption file</span></span>
<span class="line"><span style="color:#e1e4e8;">  WSGIDaemonProcess privacyidea python-path=/etc/privacyidea:/opt/privacyidea/lib/python2.7/site-packages processes=1 threads=15 display-name=%{GROUP} user=privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">  WSGIProcessGroup privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">  WSGIPassAuthorization On</span></span>
<span class="line"><span style="color:#e1e4e8;">  WSGIScriptAlias / /etc/privacyidea/privacyideaapp.wsgi</span></span>
<span class="line"><span style="color:#e1e4e8;">  SSLEngine On</span></span>
<span class="line"><span style="color:#e1e4e8;">  SSLProtocol All -SSLv2 -SSLv3</span></span>
<span class="line"><span style="color:#e1e4e8;">  SSLHonorCipherOrder On</span></span>
<span class="line"><span style="color:#e1e4e8;">  SSLCipherSuite EECDH+AES256:DHE+AES256:EECDH+AES:EDH+AES:-SHA1:EECDH+RC4:EDH+RC4:RC4-SHA:AES256-SHA:!aNULL:!eNULL:!EXP:!LOW:!MD5</span></span>
<span class="line"><span style="color:#e1e4e8;">  SSLCertificateFile /etc/pki/tls/certs/privacyideaserver.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">  SSLCertificateKeyFile /etc/pki/tls/private/privacyideaserver.key</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/VirtualHost&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">TraceEnable off</span></span>
<span class="line"><span style="color:#24292e;">ServerSignature Off</span></span>
<span class="line"><span style="color:#24292e;">ServerTokens Prod</span></span>
<span class="line"><span style="color:#24292e;">WSGIPythonHome /opt/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">WSGISocketPrefix /var/run/wsgi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;VirtualHost _default_:80&gt;</span></span>
<span class="line"><span style="color:#24292e;">  ServerAdmin webmaster@localhost</span></span>
<span class="line"><span style="color:#24292e;">  ServerName localhost</span></span>
<span class="line"><span style="color:#24292e;">  RewriteEngine On</span></span>
<span class="line"><span style="color:#24292e;">  RewriteCond %{HTTPS} !=On</span></span>
<span class="line"><span style="color:#24292e;">  RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]</span></span>
<span class="line"><span style="color:#24292e;">&lt;/VirtualHost&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;VirtualHost _default_:443&gt;</span></span>
<span class="line"><span style="color:#24292e;">  ServerAdmin webmaster@localhost</span></span>
<span class="line"><span style="color:#24292e;">  ServerName localhost</span></span>
<span class="line"><span style="color:#24292e;">  DocumentRoot /var/www</span></span>
<span class="line"><span style="color:#24292e;">  &lt;Directory /&gt;</span></span>
<span class="line"><span style="color:#24292e;">    Require all granted</span></span>
<span class="line"><span style="color:#24292e;">    Options FollowSymLinks</span></span>
<span class="line"><span style="color:#24292e;">    AllowOverride None</span></span>
<span class="line"><span style="color:#24292e;">  &lt;/Directory&gt;</span></span>
<span class="line"><span style="color:#24292e;">  # The daemon is running as user &#39;privacyidea&#39;</span></span>
<span class="line"><span style="color:#24292e;">  # This user should have access to the encKey database encryption file</span></span>
<span class="line"><span style="color:#24292e;">  WSGIDaemonProcess privacyidea python-path=/etc/privacyidea:/opt/privacyidea/lib/python2.7/site-packages processes=1 threads=15 display-name=%{GROUP} user=privacyidea</span></span>
<span class="line"><span style="color:#24292e;">  WSGIProcessGroup privacyidea</span></span>
<span class="line"><span style="color:#24292e;">  WSGIPassAuthorization On</span></span>
<span class="line"><span style="color:#24292e;">  WSGIScriptAlias / /etc/privacyidea/privacyideaapp.wsgi</span></span>
<span class="line"><span style="color:#24292e;">  SSLEngine On</span></span>
<span class="line"><span style="color:#24292e;">  SSLProtocol All -SSLv2 -SSLv3</span></span>
<span class="line"><span style="color:#24292e;">  SSLHonorCipherOrder On</span></span>
<span class="line"><span style="color:#24292e;">  SSLCipherSuite EECDH+AES256:DHE+AES256:EECDH+AES:EDH+AES:-SHA1:EECDH+RC4:EDH+RC4:RC4-SHA:AES256-SHA:!aNULL:!eNULL:!EXP:!LOW:!MD5</span></span>
<span class="line"><span style="color:#24292e;">  SSLCertificateFile /etc/pki/tls/certs/privacyideaserver.pem</span></span>
<span class="line"><span style="color:#24292e;">  SSLCertificateKeyFile /etc/pki/tls/private/privacyideaserver.key</span></span>
<span class="line"><span style="color:#24292e;">&lt;/VirtualHost&gt;</span></span></code></pre></div><ul><li>证书</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@iZ8vbcvjtgyijxs9ixmh6oZ conf.d]# /opt/privacyidea/bin/privacyidea-create-certificate -f /etc/httpd/conf.d/privacyidea.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating certificate...</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#e1e4e8;">.................................................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">......+++</span></span>
<span class="line"><span style="color:#e1e4e8;">writing new private key to &#39;/etc/pki/tls/private/privacyideaserver.key&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">created key and cert...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@iZ8vbcvjtgyijxs9ixmh6oZ conf.d]# /opt/privacyidea/bin/privacyidea-create-certificate -f /etc/httpd/conf.d/privacyidea.conf</span></span>
<span class="line"><span style="color:#24292e;">Creating certificate...</span></span>
<span class="line"><span style="color:#24292e;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#24292e;">.................................................+++</span></span>
<span class="line"><span style="color:#24292e;">......+++</span></span>
<span class="line"><span style="color:#24292e;">writing new private key to &#39;/etc/pki/tls/private/privacyideaserver.key&#39;</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">created key and cert...</span></span></code></pre></div><h2 id="修改域名" tabindex="-1">修改域名 <a class="header-anchor" href="#修改域名" aria-label="Permalink to &quot;修改域名&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/#ServerName www.example.com:80/ServerName privacyidea.freehan.ink:80/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#检查语法</span></span>
<span class="line"><span style="color:#e1e4e8;">apachectl configtest</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@iZ8vbcvjtgyijxs9ixmh6oZ conf.d]# ll</span></span>
<span class="line"><span style="color:#e1e4e8;">total 32</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root 2926 Nov 10 22:26 autoindex.conf.disabled</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root 1293 Dec  2 15:40 privacyidea.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root  366 Nov 10 22:27 README</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root 9443 Sep 30  2020 ssl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root 1252 Sep 30  2020 userdir.conf.disabled</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root  824 Sep 30  2020 welcome.conf.disabled</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#重启服务</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart httpd.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sed -i &#39;s/#ServerName www.example.com:80/ServerName privacyidea.freehan.ink:80/g&#39; /etc/httpd/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#检查语法</span></span>
<span class="line"><span style="color:#24292e;">apachectl configtest</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@iZ8vbcvjtgyijxs9ixmh6oZ conf.d]# ll</span></span>
<span class="line"><span style="color:#24292e;">total 32</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root 2926 Nov 10 22:26 autoindex.conf.disabled</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root 1293 Dec  2 15:40 privacyidea.conf</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root  366 Nov 10 22:27 README</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root 9443 Sep 30  2020 ssl.conf</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root 1252 Sep 30  2020 userdir.conf.disabled</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root  824 Sep 30  2020 welcome.conf.disabled</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#重启服务</span></span>
<span class="line"><span style="color:#24292e;">systemctl restart httpd.service</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201041864.jpg" alt=""></p><h1 id="_3-其他配置" tabindex="-1">3.其他配置 <a class="header-anchor" href="#_3-其他配置" aria-label="Permalink to &quot;3.其他配置&quot;">​</a></h1><h2 id="修正权限" tabindex="-1">修正权限 <a class="header-anchor" href="#修正权限" aria-label="Permalink to &quot;修正权限&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">chown -R privacyidea:root /etc/privacyidea</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">chown -R privacyidea:root /etc/privacyidea</span></span></code></pre></div><h2 id="修改管理密码" tabindex="-1">修改管理密码 <a class="header-anchor" href="#修改管理密码" aria-label="Permalink to &quot;修改管理密码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /opt/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">source bin/activate</span></span>
<span class="line"><span style="color:#e1e4e8;">pi-manage admin change -p admin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /opt/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">source bin/activate</span></span>
<span class="line"><span style="color:#24292e;">pi-manage admin change -p admin</span></span></code></pre></div><h2 id="升级privacyidea" tabindex="-1">升级privacyIDEA <a class="header-anchor" href="#升级privacyidea" aria-label="Permalink to &quot;升级privacyIDEA&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /opt/privacyidea</span></span>
<span class="line"><span style="color:#e1e4e8;">source bin/activate</span></span>
<span class="line"><span style="color:#e1e4e8;">pip install --upgrade cffi</span></span>
<span class="line"><span style="color:#e1e4e8;">pip install --upgrade bcrypt</span></span>
<span class="line"><span style="color:#e1e4e8;">pip install --upgrade privacyidea</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /opt/privacyidea</span></span>
<span class="line"><span style="color:#24292e;">source bin/activate</span></span>
<span class="line"><span style="color:#24292e;">pip install --upgrade cffi</span></span>
<span class="line"><span style="color:#24292e;">pip install --upgrade bcrypt</span></span>
<span class="line"><span style="color:#24292e;">pip install --upgrade privacyidea</span></span></code></pre></div><h1 id="_4-配置freeipa" tabindex="-1">4.配置freeipa <a class="header-anchor" href="#_4-配置freeipa" aria-label="Permalink to &quot;4.配置freeipa&quot;">​</a></h1><h2 id="创建users" tabindex="-1">创建users <a class="header-anchor" href="#创建users" aria-label="Permalink to &quot;创建users&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201041289.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201042956.jpg" alt=""></p><ul><li>注意uid</li></ul><p>The <code>UID Type</code> is the unique identifier for the LDAP object. If it is left blank, the distinguished name will be used. In case of OpenLDAP this can be <em>entryUUID</em> and in case of Active Directory <em>objectGUID</em>. For FreeIPA you can use <em>ipaUniqueID</em></p><h2 id="创建realms" tabindex="-1">创建realms <a class="header-anchor" href="#创建realms" aria-label="Permalink to &quot;创建realms&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201042041.jpg" alt=""></p><h2 id="创建google验证" tabindex="-1">创建google验证 <a class="header-anchor" href="#创建google验证" aria-label="Permalink to &quot;创建google验证&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201042416.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201043110.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201043160.jpg" alt=""></p><h2 id="客户端配置" tabindex="-1">客户端配置 <a class="header-anchor" href="#客户端配置" aria-label="Permalink to &quot;客户端配置&quot;">​</a></h2><p>安卓用夸克密码验证器，进行扫码</p><p>ios用google验证器，进行扫码</p><p>官方网站 ———– <a href="https://www.privacyidea.org/" target="_blank" rel="noreferrer">https://www.privacyidea.org/</a></p><p>软件的特点 ———– <a href="https://www.privacyidea.org/about/features/" target="_blank" rel="noreferrer">https://www.privacyidea.org/about/features/</a></p><p>privacyIDEA的github ——————- <a href="https://github.com/privacyidea/privacyidea" target="_blank" rel="noreferrer">https://github.com/privacyidea/privacyidea</a><a href="https://www.privacyidea.org/about/the-code/" target="_blank" rel="noreferrer">https://www.privacyidea.org/about/the-code/</a></p><p>安装教程 ———— <a href="https://www.privacyidea.org/two-factor-authentication-with-otp-on-centos-7/" target="_blank" rel="noreferrer">https://www.privacyidea.org/two-factor-authentication-with-otp-on-centos-7/</a><a href="https://privacyidea.readthedocs.io/en/latest/" target="_blank" rel="noreferrer">https://privacyidea.readthedocs.io/en/latest/</a></p><p>使用教程 ———— <a href="https://privacyidea.readthedocs.io/en/latest/" target="_blank" rel="noreferrer">https://privacyidea.readthedocs.io/en/latest/</a></p>`,195),o=[l];function c(i,t,r,d,y,h){return a(),e("div",null,o)}const g=s(p,[["render",c]]);export{u as __pageData,g as default};
