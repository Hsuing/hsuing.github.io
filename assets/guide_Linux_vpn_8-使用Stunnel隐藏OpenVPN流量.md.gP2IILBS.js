import{_ as n,D as e,o as a,c as l,I as p,w as t,R as o,a as c}from"./chunks/framework.zUbWieqp.js";const r="/assets/stunnel-openvpn.t1Tlz6aG.png",i="/assets/stunnel1.XImR1PDv.png",u="/assets/stunnel.SHqZtzZP.png",y="/assets/stunnel3.cLGekAam.png",d="/assets/stunnel4.GryemSEW.png",N=JSON.parse('{"title":"一、简介","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/8-使用Stunnel隐藏OpenVPN流量.md","filePath":"guide/Linux/vpn/8-使用Stunnel隐藏OpenVPN流量.md","lastUpdated":1701928035000}'),h={name:"guide/Linux/vpn/8-使用Stunnel隐藏OpenVPN流量.md"},v=o('<ul><li>centos7x64</li><li>stunnel4.x</li><li>win_stunnel5.5</li></ul><p>参考: <a href="https://medium.com/swlh/stunnel-openvpn-server-on-ubuntu-16-04-3c3d4a1910cc" target="_blank" rel="noreferrer">https://medium.com/swlh/stunnel-openvpn-server-on-ubuntu-16-04-3c3d4a1910cc</a></p><h1 id="一、简介" tabindex="-1">一、简介 <a class="header-anchor" href="#一、简介" aria-label="Permalink to &quot;一、简介&quot;">​</a></h1><p>   众所周知的原因，在海外直接搭建 OpenVPN 根本无法使用（TCP 模式），或者用段时间就被墙了（UDP 模式）。本文主要介绍如何通过 Stunnel 隐藏 OpenVPN 流量，使其看起来像普通的 SSL 协议传输，从而绕过 gfw</p><p>   Stunnel 分为客户端和服务端，客户端负责接收用户 OpenVPN 客户端流量并转化成 SSL 协议加密数据包，然后转发给 Stunnel 服务端，实现 SSL 协议数据传输，服务端然后将流量转化成 OpenVPN 流量传输给 OpenVPN 服务端。因此我们可以在国内搭 Stunnel 客户端，国外搭 Stunnel 服务端。OpenVPN + Stunnel 整体架构如下</p><p><img src="'+r+`" alt="架构图"></p><h2 id="_1-首先需要有个-openvpn-服务端" tabindex="-1">1. 首先需要有个 OpenVPN 服务端 <a class="header-anchor" href="#_1-首先需要有个-openvpn-服务端" aria-label="Permalink to &quot;1. 首先需要有个 OpenVPN 服务端&quot;">​</a></h2><p>OpenVPN安装</p><p>说明的是，Stunnel 不支持 udp 流量转换，所以 OpenVPN 需要以 TCP 模式运行</p><h2 id="_2-openvpn-tcp-模式的配置示例" tabindex="-1">2.OpenVPN TCP 模式的配置示例 <a class="header-anchor" href="#_2-openvpn-tcp-模式的配置示例" aria-label="Permalink to &quot;2.OpenVPN TCP 模式的配置示例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">port 4001   # 监听的端口号</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp-server</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">ca /etc/openvpn/server/certs/ca.crt  #   CA 根证书路径</span></span>
<span class="line"><span style="color:#e1e4e8;">cert /etc/openvpn/server/certs/server.crt  # open VPN 服务器证书路径</span></span>
<span class="line"><span style="color:#e1e4e8;">key /etc/openvpn/server/certs/server.key  # open VPN 服务器密钥路径，This file should be kept secret</span></span>
<span class="line"><span style="color:#e1e4e8;">dh /etc/openvpn/server/certs/dh.pem  # Diffie-Hellman 算法密钥文件路径</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-auth /etc/openvpn/server/certs/ta.key 0 #  tls-auth key，参数 0 可以省略，如果不省略，那么客户端</span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置相应的参数该配成 1。如果省略，那么客户端不需要 tls-auth 配置</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0   # 该网段为 open VPN 虚拟网卡网段，不要和内网网段冲突即可。open VPN 默认为 10.8.0.0/24</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 8.8.8.8&quot;  # DNS 服务器配置，可以根据需要指定其他 ns</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 8.8.4.4&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1&quot;   # 客户端所有流量都通过 open VPN 转发，类似于代理开全局</span></span>
<span class="line"><span style="color:#e1e4e8;">compress lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">duplicate-cn   # 允许一个用户多个终端连接</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 120</span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">user openvpn  # open VPN 进程启动用户，openvpn 用户在安装完 openvpn 后就自动生成了</span></span>
<span class="line"><span style="color:#e1e4e8;">group openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;">log /var/log/openvpn/server.log  # 指定 log 文件位置</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append /var/log/openvpn/server.log</span></span>
<span class="line"><span style="color:#e1e4e8;">status /var/log/openvpn/status.log</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">port 4001   # 监听的端口号</span></span>
<span class="line"><span style="color:#24292e;">proto tcp-server</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">ca /etc/openvpn/server/certs/ca.crt  #   CA 根证书路径</span></span>
<span class="line"><span style="color:#24292e;">cert /etc/openvpn/server/certs/server.crt  # open VPN 服务器证书路径</span></span>
<span class="line"><span style="color:#24292e;">key /etc/openvpn/server/certs/server.key  # open VPN 服务器密钥路径，This file should be kept secret</span></span>
<span class="line"><span style="color:#24292e;">dh /etc/openvpn/server/certs/dh.pem  # Diffie-Hellman 算法密钥文件路径</span></span>
<span class="line"><span style="color:#24292e;">tls-auth /etc/openvpn/server/certs/ta.key 0 #  tls-auth key，参数 0 可以省略，如果不省略，那么客户端</span></span>
<span class="line"><span style="color:#24292e;"># 配置相应的参数该配成 1。如果省略，那么客户端不需要 tls-auth 配置</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0   # 该网段为 open VPN 虚拟网卡网段，不要和内网网段冲突即可。open VPN 默认为 10.8.0.0/24</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 8.8.8.8&quot;  # DNS 服务器配置，可以根据需要指定其他 ns</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 8.8.4.4&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1&quot;   # 客户端所有流量都通过 open VPN 转发，类似于代理开全局</span></span>
<span class="line"><span style="color:#24292e;">compress lzo</span></span>
<span class="line"><span style="color:#24292e;">duplicate-cn   # 允许一个用户多个终端连接</span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 120</span></span>
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">user openvpn  # open VPN 进程启动用户，openvpn 用户在安装完 openvpn 后就自动生成了</span></span>
<span class="line"><span style="color:#24292e;">group openvpn</span></span>
<span class="line"><span style="color:#24292e;">log /var/log/openvpn/server.log  # 指定 log 文件位置</span></span>
<span class="line"><span style="color:#24292e;">log-append /var/log/openvpn/server.log</span></span>
<span class="line"><span style="color:#24292e;">status /var/log/openvpn/status.log</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span></code></pre></div><h2 id="_3-stunnel-服务端安装配置" tabindex="-1">3. Stunnel 服务端安装配置 <a class="header-anchor" href="#_3-stunnel-服务端安装配置" aria-label="Permalink to &quot;3. Stunnel 服务端安装配置&quot;">​</a></h2><ul><li>安装配置 Stunnel 服务端（海外节点）</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum -y install stunnel</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /etc/stunnel</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@op stunnel]# openssl req -new -x509 -days 3650 -nodes -out stunnel.pem -keyout stunnel.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#e1e4e8;">...........................................................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">.........................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">writing new private key to &#39;stunnel.pem&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#e1e4e8;">into your certificate request.</span></span>
<span class="line"><span style="color:#e1e4e8;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#e1e4e8;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#e1e4e8;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#e1e4e8;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Country Name (2 letter code) [XX]:CN</span></span>
<span class="line"><span style="color:#e1e4e8;">State or Province Name (full name) []:BeiJing</span></span>
<span class="line"><span style="color:#e1e4e8;">Locality Name (eg, city) [Default City]:BeiJing</span></span>
<span class="line"><span style="color:#e1e4e8;">Organization Name (eg, company) [Default Company Ltd]:BeiJing</span></span>
<span class="line"><span style="color:#e1e4e8;">Organizational Unit Name (eg, section) []:BJ</span></span>
<span class="line"><span style="color:#e1e4e8;">Common Name (eg, your name or your server&#39;s hostname) []:</span></span>
<span class="line"><span style="color:#e1e4e8;">Email Address []:</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@op stunnel]# </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 600 /etc/stunnel/stunnel.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">vim stunnel.conf 填入如下内容:</span></span>
<span class="line"><span style="color:#e1e4e8;">pid = /var/run/stunnel.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">output = /var/log/stunnel.log</span></span>
<span class="line"><span style="color:#e1e4e8;">client = no</span></span>
<span class="line"><span style="color:#e1e4e8;">[openvpn]</span></span>
<span class="line"><span style="color:#e1e4e8;">accept = 443   </span></span>
<span class="line"><span style="color:#e1e4e8;">connect = 127.0.0.1:4001</span></span>
<span class="line"><span style="color:#e1e4e8;">cert = /etc/stunnel/stunnel.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum -y install stunnel</span></span>
<span class="line"><span style="color:#24292e;">cd /etc/stunnel</span></span>
<span class="line"><span style="color:#24292e;">[root@op stunnel]# openssl req -new -x509 -days 3650 -nodes -out stunnel.pem -keyout stunnel.pem</span></span>
<span class="line"><span style="color:#24292e;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#24292e;">...........................................................+++</span></span>
<span class="line"><span style="color:#24292e;">.........................+++</span></span>
<span class="line"><span style="color:#24292e;">writing new private key to &#39;stunnel.pem&#39;</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#24292e;">into your certificate request.</span></span>
<span class="line"><span style="color:#24292e;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#24292e;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#24292e;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#24292e;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">Country Name (2 letter code) [XX]:CN</span></span>
<span class="line"><span style="color:#24292e;">State or Province Name (full name) []:BeiJing</span></span>
<span class="line"><span style="color:#24292e;">Locality Name (eg, city) [Default City]:BeiJing</span></span>
<span class="line"><span style="color:#24292e;">Organization Name (eg, company) [Default Company Ltd]:BeiJing</span></span>
<span class="line"><span style="color:#24292e;">Organizational Unit Name (eg, section) []:BJ</span></span>
<span class="line"><span style="color:#24292e;">Common Name (eg, your name or your server&#39;s hostname) []:</span></span>
<span class="line"><span style="color:#24292e;">Email Address []:</span></span>
<span class="line"><span style="color:#24292e;">[root@op stunnel]# </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">chmod 600 /etc/stunnel/stunnel.pem</span></span>
<span class="line"><span style="color:#24292e;">vim stunnel.conf 填入如下内容:</span></span>
<span class="line"><span style="color:#24292e;">pid = /var/run/stunnel.pid</span></span>
<span class="line"><span style="color:#24292e;">output = /var/log/stunnel.log</span></span>
<span class="line"><span style="color:#24292e;">client = no</span></span>
<span class="line"><span style="color:#24292e;">[openvpn]</span></span>
<span class="line"><span style="color:#24292e;">accept = 443   </span></span>
<span class="line"><span style="color:#24292e;">connect = 127.0.0.1:4001</span></span>
<span class="line"><span style="color:#24292e;">cert = /etc/stunnel/stunnel.pem</span></span></code></pre></div><blockquote><p>说明： accept = 443 # Stunnel 服务端监听端口</p></blockquote><blockquote><p>connect = 127.0.0.1:4001 # OpenVPN 服务端地址</p></blockquote><h2 id="启动-stunnel-服务端" tabindex="-1">启动 Stunnel 服务端： <a class="header-anchor" href="#启动-stunnel-服务端" aria-label="Permalink to &quot;启动 Stunnel 服务端：&quot;">​</a></h2><p>为了管理方便，我们使用 systemd 管理 Stunnel 服务，编辑一个 systemd unit 文件，vim /lib/systemd/system/stunnel.service</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description=SSL tunnel for network daemons</span></span>
<span class="line"><span style="color:#e1e4e8;">After=network.target</span></span>
<span class="line"><span style="color:#e1e4e8;">After=syslog.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#e1e4e8;">Alias=stunnel.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">Type=forking</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/usr/bin/stunnel /etc/stunnel/stunnel.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStop=/usr/bin/killall -9 stunnel</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Give up if ping don&#39;t get an answer</span></span>
<span class="line"><span style="color:#e1e4e8;">TimeoutSec=600</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Restart=always</span></span>
<span class="line"><span style="color:#e1e4e8;">PrivateTmp=false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description=SSL tunnel for network daemons</span></span>
<span class="line"><span style="color:#24292e;">After=network.target</span></span>
<span class="line"><span style="color:#24292e;">After=syslog.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#24292e;">Alias=stunnel.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">Type=forking</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/usr/bin/stunnel /etc/stunnel/stunnel.conf</span></span>
<span class="line"><span style="color:#24292e;">ExecStop=/usr/bin/killall -9 stunnel</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Give up if ping don&#39;t get an answer</span></span>
<span class="line"><span style="color:#24292e;">TimeoutSec=600</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Restart=always</span></span>
<span class="line"><span style="color:#24292e;">PrivateTmp=false</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl start stunnel.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable stunnel.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl start stunnel.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable stunnel.service</span></span></code></pre></div><h2 id="_4-stunnel-客户端安装配置" tabindex="-1">4. Stunnel 客户端安装配置 <a class="header-anchor" href="#_4-stunnel-客户端安装配置" aria-label="Permalink to &quot;4. Stunnel 客户端安装配置&quot;">​</a></h2><p>Stunnel 的客户端安装和服务器一样，同样的软件，既可以作为客户端，也可以作为服务端，只是配置不同而已</p><ul><li>安装配置 Stunnel 客户端（国内节点）</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum -y install stunnel</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /etc/stunnel</span></span>
<span class="line"><span style="color:#e1e4e8;">scp ....  # 将服务端的证书 stunnel.pem 拷贝到这里</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 600 /etc/stunnel/stunnel.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">vim stunnel.conf 填入如下内容：</span></span>
<span class="line"><span style="color:#e1e4e8;">pid=/var/run/stunnel.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">output=/var/log/stunnel.log</span></span>
<span class="line"><span style="color:#e1e4e8;">client = yes</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[openvpn]</span></span>
<span class="line"><span style="color:#e1e4e8;">accept=8443</span></span>
<span class="line"><span style="color:#e1e4e8;">connect=stunnel_server_ip:443</span></span>
<span class="line"><span style="color:#e1e4e8;">cert = /etc/stunnel/stunnel.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum -y install stunnel</span></span>
<span class="line"><span style="color:#24292e;">cd /etc/stunnel</span></span>
<span class="line"><span style="color:#24292e;">scp ....  # 将服务端的证书 stunnel.pem 拷贝到这里</span></span>
<span class="line"><span style="color:#24292e;">chmod 600 /etc/stunnel/stunnel.pem</span></span>
<span class="line"><span style="color:#24292e;">vim stunnel.conf 填入如下内容：</span></span>
<span class="line"><span style="color:#24292e;">pid=/var/run/stunnel.pid</span></span>
<span class="line"><span style="color:#24292e;">output=/var/log/stunnel.log</span></span>
<span class="line"><span style="color:#24292e;">client = yes</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[openvpn]</span></span>
<span class="line"><span style="color:#24292e;">accept=8443</span></span>
<span class="line"><span style="color:#24292e;">connect=stunnel_server_ip:443</span></span>
<span class="line"><span style="color:#24292e;">cert = /etc/stunnel/stunnel.pem</span></span></code></pre></div><blockquote><p>说明：</p></blockquote><blockquote><p>accept=8443 # Stunnel 客户端监听端口</p></blockquote><blockquote><p>stunnel_server_ip:443 # stunnel 服务端 ip 及端口</p></blockquote><ul><li>启动 Stunnel 客户端</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl start stunnel.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable stunnel.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl start stunnel.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable stunnel.service</span></span></code></pre></div><h2 id="_5-使用-openvpn-连接-stunnel" tabindex="-1">5. 使用 OpenVPN 连接 Stunnel <a class="header-anchor" href="#_5-使用-openvpn-连接-stunnel" aria-label="Permalink to &quot;5. 使用 OpenVPN 连接 Stunnel&quot;">​</a></h2><p>Stunnel + OpenVPN 都配好后，就可以使用 OpenVPN 客户端实现自由上网了，需要注意的是 OpenVPN 客户端现在需要连接的是 Stunnel 客户端，不再是直接连接 OpenVPN 服务端</p><p><a href="https://github.com/Xaqron/stunnel" target="_blank" rel="noreferrer">https://github.com/Xaqron/stunnel</a></p><h1 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h1><p>OpenVPN over TLS</p><p>VPN使用TCP作为传输协议. stunnel实例用于在TLS / TCP中封装TCP流的内容.你得到这个协议栈：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[IP     ]&lt;------------------------&gt;[IP     ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[OpenVPN]&lt;------------------------&gt;[OpenVPN]</span></span>
<span class="line"><span style="color:#e1e4e8;">            [TLS   ]&lt;~~~~~&gt;[TLS]</span></span>
<span class="line"><span style="color:#e1e4e8;">[TCP    ]&lt;-&gt;[TCP   ]&lt;-----&gt;[TCP]&lt;-&gt;[TCP    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[IP     ]&lt;-&gt;[IP    ]&lt;-----&gt;[IP ]&lt;-&gt;[IP     ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[       ]   [      ]       [   ]   [       ]</span></span>
<span class="line"><span style="color:#e1e4e8;"> Server      stunnel      stunnel  Client</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[IP     ]&lt;------------------------&gt;[IP     ]</span></span>
<span class="line"><span style="color:#24292e;">[OpenVPN]&lt;------------------------&gt;[OpenVPN]</span></span>
<span class="line"><span style="color:#24292e;">            [TLS   ]&lt;~~~~~&gt;[TLS]</span></span>
<span class="line"><span style="color:#24292e;">[TCP    ]&lt;-&gt;[TCP   ]&lt;-----&gt;[TCP]&lt;-&gt;[TCP    ]</span></span>
<span class="line"><span style="color:#24292e;">[IP     ]&lt;-&gt;[IP    ]&lt;-----&gt;[IP ]&lt;-&gt;[IP     ]</span></span>
<span class="line"><span style="color:#24292e;">[       ]   [      ]       [   ]   [       ]</span></span>
<span class="line"><span style="color:#24292e;"> Server      stunnel      stunnel  Client</span></span></code></pre></div><p>在stunnel实例之间,你有这个协议栈在线上：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[IP      ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[OpenVPN ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[TLS     ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[TCP(443)]</span></span>
<span class="line"><span style="color:#e1e4e8;">[IP      ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[...     ]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[IP      ]</span></span>
<span class="line"><span style="color:#24292e;">[OpenVPN ]</span></span>
<span class="line"><span style="color:#24292e;">[TLS     ]</span></span>
<span class="line"><span style="color:#24292e;">[TCP(443)]</span></span>
<span class="line"><span style="color:#24292e;">[IP      ]</span></span>
<span class="line"><span style="color:#24292e;">[...     ]</span></span></code></pre></div><p>由于TLS加密其有效负载,攻击者只能看到：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[???     ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[TLS     ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[TCP(443)]</span></span>
<span class="line"><span style="color:#e1e4e8;">[IP      ]</span></span>
<span class="line"><span style="color:#e1e4e8;">[...     ]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[???     ]</span></span>
<span class="line"><span style="color:#24292e;">[TLS     ]</span></span>
<span class="line"><span style="color:#24292e;">[TCP(443)]</span></span>
<span class="line"><span style="color:#24292e;">[IP      ]</span></span>
<span class="line"><span style="color:#24292e;">[...     ]</span></span></code></pre></div><p>所以是的,它是普通的TLS流量(它可能是HTTP / TLS,SMTP / TLS,POP / TLS或任何其他用于查看流量的人,但它看起来很像HTTP / TLS,因为使用了TCP端口443).您可以使用wireshark进行检查：记录stunnel实例之间的流量.在wireshark UI(流的数据包右键)中,您可以让wireshark将流量解释为TLS：它会将其识别为TLS流量(您将看到不同的TLS消息,但不会看到TLS会话的有效负载</p><h1 id="二、win完整配置" tabindex="-1">二、win完整配置 <a class="header-anchor" href="#二、win完整配置" aria-label="Permalink to &quot;二、win完整配置&quot;">​</a></h1><ul><li>下载stunnel</li></ul><p><a href="https://www.stunnel.org/downloads.html" target="_blank" rel="noreferrer">https://www.stunnel.org/downloads.html</a></p><p>下载　stunnel-5.55-win64-installer.exe</p><ul><li>安装</li></ul><p><img src="`+i+'" alt="stunnel1"></p><ul><li>启动</li></ul><p><img src="'+u+`" alt="stunnel"></p><h2 id="_1-1-win-配置证书" tabindex="-1">1.1 win 配置证书 <a class="header-anchor" href="#_1-1-win-配置证书" aria-label="Permalink to &quot;1.1 win 配置证书&quot;">​</a></h2><ul><li>把ｓｅｒｖｅｒ端生成的{% em %} stunnel.pem {% endem %}放到win 下 C:\\Program Files (x86)\\stunnel\\config(根据自己路径放置)</li></ul><h2 id="_1-2-win-stunnel-conf" tabindex="-1">1.2 win stunnel.conf <a class="header-anchor" href="#_1-2-win-stunnel-conf" aria-label="Permalink to &quot;1.2 win stunnel.conf&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">C:\\Program Files (x86)\\stunnel\\config\\stunnel.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[openvpn]</span></span>
<span class="line"><span style="color:#e1e4e8;">cert = stunnel.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">client = yes</span></span>
<span class="line"><span style="color:#e1e4e8;">accept = 127.0.0.1:8443</span></span>
<span class="line"><span style="color:#e1e4e8;">connect = 47.56.131.123:443</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">C:\\Program Files (x86)\\stunnel\\config\\stunnel.conf</span></span>
<span class="line"><span style="color:#24292e;">[openvpn]</span></span>
<span class="line"><span style="color:#24292e;">cert = stunnel.pem</span></span>
<span class="line"><span style="color:#24292e;">client = yes</span></span>
<span class="line"><span style="color:#24292e;">accept = 127.0.0.1:8443</span></span>
<span class="line"><span style="color:#24292e;">connect = 47.56.131.123:443</span></span></code></pre></div><p>accept: stunnel 本地监听port</p><p>connect: 指向stunnel server port , 一定的是443 port</p><p>注意：在文件末尾添加</p><h2 id="_1-3-win-配置vpn" tabindex="-1">1.3 win 配置vpn <a class="header-anchor" href="#_1-3-win-配置vpn" aria-label="Permalink to &quot;1.3 win 配置vpn&quot;">​</a></h2><ul><li>下载</li></ul><p><a href="https://openvpn.net/community-downloads/" target="_blank" rel="noreferrer">https://openvpn.net/community-downloads/</a></p><ul><li>配置xxxx.ovpn</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">remote 127.0.0.1 8443</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 1500</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu-extra 32</span></span>
<span class="line"><span style="color:#e1e4e8;">mssfix 1450</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 1</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/ca&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;cert&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/cert&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;key&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/key&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;tls-auth&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">.....</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/tls-auth&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">sndbuf 0</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 0</span></span>
<span class="line"><span style="color:#24292e;">remote 127.0.0.1 8443</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 1500</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu-extra 32</span></span>
<span class="line"><span style="color:#24292e;">mssfix 1450</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">key-direction 1</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">&lt;/ca&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;cert&gt;</span></span>
<span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">&lt;/cert&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;key&gt;</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">&lt;/key&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;tls-auth&gt;</span></span>
<span class="line"><span style="color:#24292e;">.....</span></span>
<span class="line"><span style="color:#24292e;">&lt;/tls-auth&gt;</span></span></code></pre></div><p>remote 127.0.0.1 8443 指向本地stunnel 端口</p><h2 id="_1-4-启动stunnel" tabindex="-1">1.4 启动stunnel <a class="header-anchor" href="#_1-4-启动stunnel" aria-label="Permalink to &quot;1.4 启动stunnel&quot;">​</a></h2><p>以管理员身份运行</p><p><img src="`+y+'" alt="status"></p><p>显示如上信息表示成功</p><h2 id="_1-5-启动openvpn" tabindex="-1">1.5 启动openvpn <a class="header-anchor" href="#_1-5-启动openvpn" aria-label="Permalink to &quot;1.5 启动openvpn&quot;">​</a></h2><p>以管理员身份运行</p><p><img src="'+d+'" alt="启动openvpn"></p>',69);function g(m,b,k,P,f,S){const s=e("center");return a(),l("div",null,[p(s,null,{default:t(()=>[c("使用 Stunnel 隐藏 OpenVPN 流量")]),_:1}),v])}const C=n(h,[["render",g]]);export{N as __pageData,C as default};
