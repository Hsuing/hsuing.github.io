import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/udp/udp.md","filePath":"guide/Linux/vpn/udp/udp.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/udp/udp.md"},l=a(`<h2 id="_1-iptables" tabindex="-1">1.iptables <a class="header-anchor" href="#_1-iptables" aria-label="Permalink to &quot;1.iptables&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 如下网段记得与server.conf 当中定义的网段保持一致</span></span>
<span class="line"><span style="color:#e1e4e8;">$ iptables -A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">$ iptables -A FORWARD -s 10.8.0.0/24 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">$ iptables -A FORWARD -j REJECT</span></span>
<span class="line"><span style="color:#e1e4e8;">$ iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -L -t nat</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">iptables-save &gt; /etc/sysconfig/iptables   # iptables 规则持久化保存</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo net.ipv4.ip_forward = 1 &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">sysctl -p # 这一步一定得执行，否则不会立即生效。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 如下网段记得与server.conf 当中定义的网段保持一致</span></span>
<span class="line"><span style="color:#24292e;">$ iptables -A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">$ iptables -A FORWARD -s 10.8.0.0/24 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">$ iptables -A FORWARD -j REJECT</span></span>
<span class="line"><span style="color:#24292e;">$ iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">iptables -L -t nat</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">iptables-save &gt; /etc/sysconfig/iptables   # iptables 规则持久化保存</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo net.ipv4.ip_forward = 1 &gt;&gt; /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">sysctl -p # 这一步一定得执行，否则不会立即生效。</span></span></code></pre></div><h2 id="_2-配置" tabindex="-1">2.配置 <a class="header-anchor" href="#_2-配置" aria-label="Permalink to &quot;2.配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 监听的端口号</span></span>
<span class="line"><span style="color:#e1e4e8;">port 1194</span></span>
<span class="line"><span style="color:#e1e4e8;"># 服务端用的协议，udp 能快点，所以我选择 udp</span></span>
<span class="line"><span style="color:#e1e4e8;">proto udp</span></span>
<span class="line"><span style="color:#e1e4e8;"># 定义openvpn运行时使用哪一种模式，openvpn有两种运行模式一种是tap模式，一种是tun模式。</span></span>
<span class="line"><span style="color:#e1e4e8;"># tap模式也就是桥接模式，通过软件在系统中模拟出一个tap设备，该设备是一个二层设备，同时支持链路层协议。</span></span>
<span class="line"><span style="color:#e1e4e8;"># tun模式也就是路由模式，通过软件在系统中模拟出一个tun路由，tun是ip层的点对点协议。</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;"># 定义openvpn在使用tun路由模式时，分配给client端分配的IP地址段</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这条命令可以重定向客户端的网关，在进行翻墙时会使用到</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 向客户端推送的路由信息，如下内容表示客户端连接之后与当前互通</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 10.0.0.0 255.255.0.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 向客户端推送的DNS信息</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 223.5.5.5&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 223.6.6.6&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 定义活动连接保时期限</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 300</span></span>
<span class="line"><span style="color:#e1e4e8;"># 加密类型</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用允许数据压缩，客户端配置文件也需要有这项</span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo</span></span>
<span class="line"><span style="color:#e1e4e8;"># 最多允许连接1000个客户端</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 1000</span></span>
<span class="line"><span style="color:#e1e4e8;"># 通过keepalive检测超时后，重新启动VPN，不重新读取keys，保留第一次使用的keys</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;"># 通过keepalive检测超时后，重新启动VPN，一直保持tun或者tap设备是linkup的。否则网络连接，会先linkdown然后再linkup</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;"># 指定日志文件的记录详细级别，可选0-9，等级越高日志内容越详细</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 4</span></span>
<span class="line"><span style="color:#e1e4e8;"># 重复日志记录限额</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;"># 禁用TSL重协商</span></span>
<span class="line"><span style="color:#e1e4e8;">reneg-sec 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 此选项开启只能使用udp协议。否则会报错error: --explicit-exit-notify can only be used with --proto udp</span></span>
<span class="line"><span style="color:#e1e4e8;">explicit-exit-notify 1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 客户端1,服务端是0</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 2.4版本之前使用 tls-auth，如果高于此版本，则用tls-crypt，我用的2.4.8使用了tls-auth，结果连通之后无法访问外网了</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-crypt /etc/openvpn/server/certs/ta.key 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 记录客户端和虚拟ip地址之间的关系。在openvpn重启时,再次连接的客户端将依然被分配和断开之前的IP地址</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist /etc/openvpn/ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"># 使用客户提供的UserName作为Common Name </span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;"># 基于mysql进行认证，如不需要可注释掉</span></span>
<span class="line"><span style="color:#e1e4e8;">plugin      /etc/openvpn/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;"># CA 根证书路径</span></span>
<span class="line"><span style="color:#e1e4e8;">ca /etc/openvpn/server/certs/ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;"># open VPN 服务器证书路径</span></span>
<span class="line"><span style="color:#e1e4e8;">cert /etc/openvpn/server/certs/server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;"># open VPN 服务器密钥路径</span></span>
<span class="line"><span style="color:#e1e4e8;">key /etc/openvpn/server/certs/server.key</span></span>
<span class="line"><span style="color:#e1e4e8;"># Diffie-Hellman 算法密钥文件路径</span></span>
<span class="line"><span style="color:#e1e4e8;">dh /etc/openvpn/server/certs/dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 指定 log 文件位置</span></span>
<span class="line"><span style="color:#e1e4e8;">log /var/log/openvpn/server.log</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append /var/log/openvpn/server.log</span></span>
<span class="line"><span style="color:#e1e4e8;">status /var/log/openvpn/status.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 监听的端口号</span></span>
<span class="line"><span style="color:#24292e;">port 1194</span></span>
<span class="line"><span style="color:#24292e;"># 服务端用的协议，udp 能快点，所以我选择 udp</span></span>
<span class="line"><span style="color:#24292e;">proto udp</span></span>
<span class="line"><span style="color:#24292e;"># 定义openvpn运行时使用哪一种模式，openvpn有两种运行模式一种是tap模式，一种是tun模式。</span></span>
<span class="line"><span style="color:#24292e;"># tap模式也就是桥接模式，通过软件在系统中模拟出一个tap设备，该设备是一个二层设备，同时支持链路层协议。</span></span>
<span class="line"><span style="color:#24292e;"># tun模式也就是路由模式，通过软件在系统中模拟出一个tun路由，tun是ip层的点对点协议。</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;"># 定义openvpn在使用tun路由模式时，分配给client端分配的IP地址段</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"># 这条命令可以重定向客户端的网关，在进行翻墙时会使用到</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 向客户端推送的路由信息，如下内容表示客户端连接之后与当前互通</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 10.0.0.0 255.255.0.0&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 向客户端推送的DNS信息</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 223.5.5.5&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 223.6.6.6&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 114.114.114.114&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 定义活动连接保时期限</span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 300</span></span>
<span class="line"><span style="color:#24292e;"># 加密类型</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;"># 启用允许数据压缩，客户端配置文件也需要有这项</span></span>
<span class="line"><span style="color:#24292e;">comp-lzo</span></span>
<span class="line"><span style="color:#24292e;"># 最多允许连接1000个客户端</span></span>
<span class="line"><span style="color:#24292e;">max-clients 1000</span></span>
<span class="line"><span style="color:#24292e;"># 通过keepalive检测超时后，重新启动VPN，不重新读取keys，保留第一次使用的keys</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;"># 通过keepalive检测超时后，重新启动VPN，一直保持tun或者tap设备是linkup的。否则网络连接，会先linkdown然后再linkup</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;"># 指定日志文件的记录详细级别，可选0-9，等级越高日志内容越详细</span></span>
<span class="line"><span style="color:#24292e;">verb 4</span></span>
<span class="line"><span style="color:#24292e;"># 重复日志记录限额</span></span>
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;"># 禁用TSL重协商</span></span>
<span class="line"><span style="color:#24292e;">reneg-sec 0</span></span>
<span class="line"><span style="color:#24292e;"># 此选项开启只能使用udp协议。否则会报错error: --explicit-exit-notify can only be used with --proto udp</span></span>
<span class="line"><span style="color:#24292e;">explicit-exit-notify 1</span></span>
<span class="line"><span style="color:#24292e;"># 客户端1,服务端是0</span></span>
<span class="line"><span style="color:#24292e;">key-direction 0</span></span>
<span class="line"><span style="color:#24292e;"># 2.4版本之前使用 tls-auth，如果高于此版本，则用tls-crypt，我用的2.4.8使用了tls-auth，结果连通之后无法访问外网了</span></span>
<span class="line"><span style="color:#24292e;">tls-crypt /etc/openvpn/server/certs/ta.key 0</span></span>
<span class="line"><span style="color:#24292e;"># 记录客户端和虚拟ip地址之间的关系。在openvpn重启时,再次连接的客户端将依然被分配和断开之前的IP地址</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist /etc/openvpn/ipp.txt</span></span>
<span class="line"><span style="color:#24292e;"># 使用客户提供的UserName作为Common Name </span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;"># 基于mysql进行认证，如不需要可注释掉</span></span>
<span class="line"><span style="color:#24292e;">plugin      /etc/openvpn/openvpn-plugin-auth-pam.so openvpn</span></span>
<span class="line"><span style="color:#24292e;"># CA 根证书路径</span></span>
<span class="line"><span style="color:#24292e;">ca /etc/openvpn/server/certs/ca.crt</span></span>
<span class="line"><span style="color:#24292e;"># open VPN 服务器证书路径</span></span>
<span class="line"><span style="color:#24292e;">cert /etc/openvpn/server/certs/server.crt</span></span>
<span class="line"><span style="color:#24292e;"># open VPN 服务器密钥路径</span></span>
<span class="line"><span style="color:#24292e;">key /etc/openvpn/server/certs/server.key</span></span>
<span class="line"><span style="color:#24292e;"># Diffie-Hellman 算法密钥文件路径</span></span>
<span class="line"><span style="color:#24292e;">dh /etc/openvpn/server/certs/dh.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 指定 log 文件位置</span></span>
<span class="line"><span style="color:#24292e;">log /var/log/openvpn/server.log</span></span>
<span class="line"><span style="color:#24292e;">log-append /var/log/openvpn/server.log</span></span>
<span class="line"><span style="color:#24292e;">status /var/log/openvpn/status.log</span></span></code></pre></div>`,4),o=[l];function c(t,r,i,y,u,d){return n(),e("div",null,o)}const g=s(p,[["render",c]]);export{h as __pageData,g as default};
