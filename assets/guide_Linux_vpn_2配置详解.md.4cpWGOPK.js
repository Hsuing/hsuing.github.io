import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"三、","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/2配置详解.md","filePath":"guide/Linux/vpn/2配置详解.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/2配置详解.md"},l=e(`<p>#一、server端</p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>server端配置详解，针对多客户端的OpenVPN 2.2 的服务器端配置文件示例 &#39;#号&#39;和;号开头的都是注释</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#该命令是可选的，如果不设置，则默认监听本机的所有IP地址。</span></span>
<span class="line"><span style="color:#e1e4e8;">#使用那种协议，可选的有，udp tcp-server tcp-client</span></span>
<span class="line"><span style="color:#e1e4e8;">    proto udp  </span></span>
<span class="line"><span style="color:#e1e4e8;">    port 1194</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#tun路由模式，tap桥模式，据说tun效率高于tap，但是tun只能转发IP数据，tap是二层可以封装任何协议，window下只有tap模式</span></span>
<span class="line"><span style="color:#e1e4e8;">    dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#该参数能防止密码被缓存到内存中</span></span>
<span class="line"><span style="color:#e1e4e8;">    auth-nocache    </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#openvpn网络模式，默认是net30：表示掩码30位，有地址浪费，还有P2P模式，当然还有subnet这是比较推荐的</span></span>
<span class="line"><span style="color:#e1e4e8;">    topology subnet</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#push表示推送，即将配置推送给客户端，让客户端也使用subnet模式</span></span>
<span class="line"><span style="color:#e1e4e8;">    push &quot;topology subnet&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#定义分配给客户端的IP段，服务端自己默认使用第一个可以地址</span></span>
<span class="line"><span style="color:#e1e4e8;">    server 172.16.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#在openvpn重启时,再次连接的客户端将依然被分配和以前一样的IP地址</span></span>
<span class="line"><span style="color:#e1e4e8;">    #ipp.txt文件格式 &quot;nanchang,172.16.0.22&quot;  一行一个</span></span>
<span class="line"><span style="color:#e1e4e8;">    ifconfig-pool-persist /etc/openvpn/beihai/ipp.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#认证相关的信息</span></span>
<span class="line"><span style="color:#e1e4e8;">    ca /etc/openvpn/ca/pki/ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">    cert /etc/openvpn/ca/pki/issued/beihai.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">    key /etc/openvpn/beihai/pki/private/beihai.key</span></span>
<span class="line"><span style="color:#e1e4e8;">    #dh 是server必须要有的，客户端可以不要，它定义了如何进行密钥交换</span></span>
<span class="line"><span style="color:#e1e4e8;">    dh /etc/openvpn/beihai/pki/dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">    ##防DDOS攻击，openvpn控制通道的tls握手进行保护，服务器端0,客户端1</span></span>
<span class="line"><span style="color:#e1e4e8;">    tls-auth /etc/openvpn/beihai/ta.key 0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#待openvpn初始化完成后，将其降级为nobody权限运行</span></span>
<span class="line"><span style="color:#e1e4e8;">    user nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">    group nobody</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    persist-key #通过keepalive检测超时后，重新启动VPN，不重新读取keys，保留第一次使用的keys</span></span>
<span class="line"><span style="color:#e1e4e8;">    persist-tun #通过keepalive检测超时后，重新启动VPN，一直保持tun或者tap设备是linkup的，否则网络连接会先linkdown然后linkup</span></span>
<span class="line"><span style="color:#e1e4e8;">    comp-lzo        #允许数据压缩，如果启用了客户端配置文件也需要有这项</span></span>
<span class="line"><span style="color:#e1e4e8;">    keepalive 5 20  #表示每隔5秒ping一下客户端/服务端，若是20秒内无响应，认为down，随即重启openvpn（强烈开启）</span></span>
<span class="line"><span style="color:#e1e4e8;">    max-clients 100 #最大客户端并发连接数量    </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    push &quot;dhcp-option DNS 8.8.8.8&quot;  #指定客户端使用的主DNS</span></span>
<span class="line"><span style="color:#e1e4e8;">    push &quot;dhcp-option DNS 8.8.4.4&quot;  #指定客户端使用的备DNS</span></span>
<span class="line"><span style="color:#e1e4e8;">    client-to-client            #默认客户端间不能互访，开启客户端互访，tap模式会形成广播域，tun不会</span></span>
<span class="line"><span style="color:#e1e4e8;">    duplicate-cn                    #支持一个证书多个客户端登录使用，建议不启用</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开启对客户端进行细粒度控制（该目录需要手动创建，名字为客户端的证书辨识名）</span></span>
<span class="line"><span style="color:#e1e4e8;">    client-config-dir /etc/openvpn/beihai/ccd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 给openvpn服务器添加静态路由，目的是让openvpn服务器知道怎么去客户端网段，走vpn接口(tun0)</span></span>
<span class="line"><span style="color:#e1e4e8;">    route 192.168.29.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#推送路由给客户端，通知客户端添加静态路由，让客户端去这两个网段走vpn接口(tun0</span></span>
<span class="line"><span style="color:#e1e4e8;">#推送路由，vpn,根据自己后面有多少服务器填写</span></span>
<span class="line"><span style="color:#e1e4e8;">    push &quot;route 192.168.11.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#重定向默认网关</span></span>
<span class="line"><span style="color:#e1e4e8;">为什么要重定向网关：vpn客户端是经常出差的，网络环境不安全，希望它将所有流量传到公司，经公司出口</span></span>
<span class="line"><span style="color:#e1e4e8;">    #其中包含的flags有&quot;local autolocal def1 bypass-dhcp bypass-dns block-local ipv6 !ipv4&quot;（多个标志之间用空格分隔），</span></span>
<span class="line"><span style="color:#e1e4e8;">    #推荐使用def1，它使用0.0.0.0/1和128.0.0.0/1而不是0.0.0.0/0来覆盖默认网关，即有新路由也保留原始默认网关，只是优先匹配而已</span></span>
<span class="line"><span style="color:#e1e4e8;">    #block-local 是表示当客户端拨入后，阻断其除与本地网关的访问外，本地的其他IP都不允许访问</span></span>
<span class="line"><span style="color:#e1e4e8;">    push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#记录日志，每次重新启动openvpn后追加原有的log信息</span></span>
<span class="line"><span style="color:#e1e4e8;">    log-append /var/log/openvpn.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#日志记录级别，可选0-9，0只记录错误信息，4能记录普通的信息，5和6在连接出现问题时能帮助调试，9显示所有信息，甚至连包头等信息都显示（像tcpdump） </span></span>
<span class="line"><span style="color:#e1e4e8;">    verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#状态文件：定期(默认60s)把状态信息写到该文件，以便自己写程序计费或者进行其他操作（需要关闭selinux）</span></span>
<span class="line"><span style="color:#e1e4e8;">    status /var/log/openvpn-status.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#相同信息的数量，如果连续出现 20 条相同的信息，将不记录到日志中。</span></span>
<span class="line"><span style="color:#e1e4e8;">    mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">;log</span></span>
<span class="line"><span style="color:#e1e4e8;">#输出一个简短的状态文件，用于显示当前的连接状态，该文件每分钟都会清空并重写一次</span></span>
<span class="line"><span style="color:#e1e4e8;">status openvpn-status.log  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#&quot;log-append&quot;这是在之前的日志内容后进行追加</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append openvpn.log </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#&quot;log&quot;方式在每次启动时都会清空之前的日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;">log server.log   </span></span>
<span class="line"><span style="color:#e1e4e8;">;你可以使用两种方式之一(但不要同时使用)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">#为日志文件设置适当的冗余级别(0~9)。冗余级别越高，输出的信息越详细。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">; 0 表示静默运行，只记录致命错误。</span></span>
<span class="line"><span style="color:#e1e4e8;">; 4 表示合理的常规用法。</span></span>
<span class="line"><span style="color:#e1e4e8;">; 5 和 6 可以帮助调试连接错误。</span></span>
<span class="line"><span style="color:#e1e4e8;">; 9 表示极度冗余，输出非常详细的日志信息</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#忽略无线，无用头信息</span></span>
<span class="line"><span style="color:#e1e4e8;">mute-replay-warnings</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#吊销用户证书</span></span>
<span class="line"><span style="color:#e1e4e8;">crl-verify crl.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#该命令是可选的，如果不设置，则默认监听本机的所有IP地址。</span></span>
<span class="line"><span style="color:#24292e;">#使用那种协议，可选的有，udp tcp-server tcp-client</span></span>
<span class="line"><span style="color:#24292e;">    proto udp  </span></span>
<span class="line"><span style="color:#24292e;">    port 1194</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#tun路由模式，tap桥模式，据说tun效率高于tap，但是tun只能转发IP数据，tap是二层可以封装任何协议，window下只有tap模式</span></span>
<span class="line"><span style="color:#24292e;">    dev tun</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#该参数能防止密码被缓存到内存中</span></span>
<span class="line"><span style="color:#24292e;">    auth-nocache    </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#openvpn网络模式，默认是net30：表示掩码30位，有地址浪费，还有P2P模式，当然还有subnet这是比较推荐的</span></span>
<span class="line"><span style="color:#24292e;">    topology subnet</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#push表示推送，即将配置推送给客户端，让客户端也使用subnet模式</span></span>
<span class="line"><span style="color:#24292e;">    push &quot;topology subnet&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#定义分配给客户端的IP段，服务端自己默认使用第一个可以地址</span></span>
<span class="line"><span style="color:#24292e;">    server 172.16.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#在openvpn重启时,再次连接的客户端将依然被分配和以前一样的IP地址</span></span>
<span class="line"><span style="color:#24292e;">    #ipp.txt文件格式 &quot;nanchang,172.16.0.22&quot;  一行一个</span></span>
<span class="line"><span style="color:#24292e;">    ifconfig-pool-persist /etc/openvpn/beihai/ipp.txt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#认证相关的信息</span></span>
<span class="line"><span style="color:#24292e;">    ca /etc/openvpn/ca/pki/ca.crt</span></span>
<span class="line"><span style="color:#24292e;">    cert /etc/openvpn/ca/pki/issued/beihai.crt</span></span>
<span class="line"><span style="color:#24292e;">    key /etc/openvpn/beihai/pki/private/beihai.key</span></span>
<span class="line"><span style="color:#24292e;">    #dh 是server必须要有的，客户端可以不要，它定义了如何进行密钥交换</span></span>
<span class="line"><span style="color:#24292e;">    dh /etc/openvpn/beihai/pki/dh.pem</span></span>
<span class="line"><span style="color:#24292e;">    ##防DDOS攻击，openvpn控制通道的tls握手进行保护，服务器端0,客户端1</span></span>
<span class="line"><span style="color:#24292e;">    tls-auth /etc/openvpn/beihai/ta.key 0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#待openvpn初始化完成后，将其降级为nobody权限运行</span></span>
<span class="line"><span style="color:#24292e;">    user nobody</span></span>
<span class="line"><span style="color:#24292e;">    group nobody</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    persist-key #通过keepalive检测超时后，重新启动VPN，不重新读取keys，保留第一次使用的keys</span></span>
<span class="line"><span style="color:#24292e;">    persist-tun #通过keepalive检测超时后，重新启动VPN，一直保持tun或者tap设备是linkup的，否则网络连接会先linkdown然后linkup</span></span>
<span class="line"><span style="color:#24292e;">    comp-lzo        #允许数据压缩，如果启用了客户端配置文件也需要有这项</span></span>
<span class="line"><span style="color:#24292e;">    keepalive 5 20  #表示每隔5秒ping一下客户端/服务端，若是20秒内无响应，认为down，随即重启openvpn（强烈开启）</span></span>
<span class="line"><span style="color:#24292e;">    max-clients 100 #最大客户端并发连接数量    </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    push &quot;dhcp-option DNS 8.8.8.8&quot;  #指定客户端使用的主DNS</span></span>
<span class="line"><span style="color:#24292e;">    push &quot;dhcp-option DNS 8.8.4.4&quot;  #指定客户端使用的备DNS</span></span>
<span class="line"><span style="color:#24292e;">    client-to-client            #默认客户端间不能互访，开启客户端互访，tap模式会形成广播域，tun不会</span></span>
<span class="line"><span style="color:#24292e;">    duplicate-cn                    #支持一个证书多个客户端登录使用，建议不启用</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开启对客户端进行细粒度控制（该目录需要手动创建，名字为客户端的证书辨识名）</span></span>
<span class="line"><span style="color:#24292e;">    client-config-dir /etc/openvpn/beihai/ccd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 给openvpn服务器添加静态路由，目的是让openvpn服务器知道怎么去客户端网段，走vpn接口(tun0)</span></span>
<span class="line"><span style="color:#24292e;">    route 192.168.29.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#推送路由给客户端，通知客户端添加静态路由，让客户端去这两个网段走vpn接口(tun0</span></span>
<span class="line"><span style="color:#24292e;">#推送路由，vpn,根据自己后面有多少服务器填写</span></span>
<span class="line"><span style="color:#24292e;">    push &quot;route 192.168.11.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#重定向默认网关</span></span>
<span class="line"><span style="color:#24292e;">为什么要重定向网关：vpn客户端是经常出差的，网络环境不安全，希望它将所有流量传到公司，经公司出口</span></span>
<span class="line"><span style="color:#24292e;">    #其中包含的flags有&quot;local autolocal def1 bypass-dhcp bypass-dns block-local ipv6 !ipv4&quot;（多个标志之间用空格分隔），</span></span>
<span class="line"><span style="color:#24292e;">    #推荐使用def1，它使用0.0.0.0/1和128.0.0.0/1而不是0.0.0.0/0来覆盖默认网关，即有新路由也保留原始默认网关，只是优先匹配而已</span></span>
<span class="line"><span style="color:#24292e;">    #block-local 是表示当客户端拨入后，阻断其除与本地网关的访问外，本地的其他IP都不允许访问</span></span>
<span class="line"><span style="color:#24292e;">    push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#记录日志，每次重新启动openvpn后追加原有的log信息</span></span>
<span class="line"><span style="color:#24292e;">    log-append /var/log/openvpn.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#日志记录级别，可选0-9，0只记录错误信息，4能记录普通的信息，5和6在连接出现问题时能帮助调试，9显示所有信息，甚至连包头等信息都显示（像tcpdump） </span></span>
<span class="line"><span style="color:#24292e;">    verb 3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#状态文件：定期(默认60s)把状态信息写到该文件，以便自己写程序计费或者进行其他操作（需要关闭selinux）</span></span>
<span class="line"><span style="color:#24292e;">    status /var/log/openvpn-status.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#相同信息的数量，如果连续出现 20 条相同的信息，将不记录到日志中。</span></span>
<span class="line"><span style="color:#24292e;">    mute 20</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">;log</span></span>
<span class="line"><span style="color:#24292e;">#输出一个简短的状态文件，用于显示当前的连接状态，该文件每分钟都会清空并重写一次</span></span>
<span class="line"><span style="color:#24292e;">status openvpn-status.log  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#&quot;log-append&quot;这是在之前的日志内容后进行追加</span></span>
<span class="line"><span style="color:#24292e;">log-append openvpn.log </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#&quot;log&quot;方式在每次启动时都会清空之前的日志文件</span></span>
<span class="line"><span style="color:#24292e;">log server.log   </span></span>
<span class="line"><span style="color:#24292e;">;你可以使用两种方式之一(但不要同时使用)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">#为日志文件设置适当的冗余级别(0~9)。冗余级别越高，输出的信息越详细。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">; 0 表示静默运行，只记录致命错误。</span></span>
<span class="line"><span style="color:#24292e;">; 4 表示合理的常规用法。</span></span>
<span class="line"><span style="color:#24292e;">; 5 和 6 可以帮助调试连接错误。</span></span>
<span class="line"><span style="color:#24292e;">; 9 表示极度冗余，输出非常详细的日志信息</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#忽略无线，无用头信息</span></span>
<span class="line"><span style="color:#24292e;">mute-replay-warnings</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#吊销用户证书</span></span>
<span class="line"><span style="color:#24292e;">crl-verify crl.pem</span></span></code></pre></div><p>#二、client端配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 定义是一个客户端</span></span>
<span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 定义使用设备类型，与服务端一致</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#协议，与服务端一致</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sndbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#远程vpn服务地址</span></span>
<span class="line"><span style="color:#e1e4e8;">remote 103.61.37.156 33022</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#解析服务器域名</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 客户端不需要绑定端口</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#加密</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA512</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#e1e4e8;">key-direction 1</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">compress lzo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#采用用户名密码方式验证,若不用证书的话,可以考虑这种方式,可以结合LDAP或者mysql</span></span>
<span class="line"><span style="color:#e1e4e8;">;auth-user-pass</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#不存储验证缓存</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-nocache</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">#设置IP地址过期时间</span></span>
<span class="line"><span style="color:#e1e4e8;">ip-win32 dynamic 0 7200</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">ca.crt的内容粘贴到这里</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/ca&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;cert&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">client.crt的内容粘贴到这里</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/cert&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;key&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">client.key的内容粘贴到这里</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/key&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 定义是一个客户端</span></span>
<span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 定义使用设备类型，与服务端一致</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#协议，与服务端一致</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sndbuf 0</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#远程vpn服务地址</span></span>
<span class="line"><span style="color:#24292e;">remote 103.61.37.156 33022</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#解析服务器域名</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 客户端不需要绑定端口</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#加密</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">remote-cert-tls server</span></span>
<span class="line"><span style="color:#24292e;">auth SHA512</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">setenv opt block-outside-dns</span></span>
<span class="line"><span style="color:#24292e;">key-direction 1</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">compress lzo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#采用用户名密码方式验证,若不用证书的话,可以考虑这种方式,可以结合LDAP或者mysql</span></span>
<span class="line"><span style="color:#24292e;">;auth-user-pass</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#不存储验证缓存</span></span>
<span class="line"><span style="color:#24292e;">auth-nocache</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">#设置IP地址过期时间</span></span>
<span class="line"><span style="color:#24292e;">ip-win32 dynamic 0 7200</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;ca&gt;</span></span>
<span class="line"><span style="color:#24292e;">ca.crt的内容粘贴到这里</span></span>
<span class="line"><span style="color:#24292e;">&lt;/ca&gt;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">&lt;cert&gt;</span></span>
<span class="line"><span style="color:#24292e;">client.crt的内容粘贴到这里</span></span>
<span class="line"><span style="color:#24292e;">&lt;/cert&gt;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">&lt;key&gt;</span></span>
<span class="line"><span style="color:#24292e;">client.key的内容粘贴到这里</span></span>
<span class="line"><span style="color:#24292e;">&lt;/key&gt;</span></span></code></pre></div><h1 id="三、" tabindex="-1">三、 <a class="header-anchor" href="#三、" aria-label="Permalink to &quot;三、&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">local 172.16.0.100                               # 监听的ip</span></span>
<span class="line"><span style="color:#e1e4e8;">port 1999                                        # 监听的端口，默认1194，我设置1999，根据你的需求改就行</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp                                        # 使用的协议，默认udp，因为经常要通过vpn传文件对可靠性要求比较高，所以用tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun                                          # 使用tun（隧道）模式，openvpn有两种模式，一种是TUN，另一种是TAP</span></span>
<span class="line"><span style="color:#e1e4e8;">ca   /etc/openvpn/easy-rsa/keys/ca.crt           # 这四条都是指定证书的路径，要确保路径或文件能够访问</span></span>
<span class="line"><span style="color:#e1e4e8;">cert /etc/openvpn/easy-rsa/keys/vpnserver.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">key  /etc/openvpn/easy-rsa/keys/vpnserver.key  </span></span>
<span class="line"><span style="color:#e1e4e8;">dh   /etc/openvpn/easy-rsa/keys/dh2048.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0                    # 设置成server模式并给客户端分配的ip段，服务端会用其中.1和.2两个ip，不要和你的内网冲突</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-pool-persist ipp.txt                    # 当vpn断开或重启后，可以利用该文件重新建立相同的IP地址连接</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.16.0.0 255.255.255.0&quot;            # 这三条是给客户端推的路由，客户端连上后会根据这个添加路由，vpn服务器后端有几个网段就写几个</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 172.16.2.0 255.255.255.0&quot;            # 这些路由的作用是告诉客户端去另一个子网都转发给TUN接口，类似于静态路由</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 10.10.10.0 255.255.255.0&quot;                       </span></span>
<span class="line"><span style="color:#e1e4e8;">client-config-dir /etc/openvpn/ccd               # 客户端的个性配置目录，比如针对每个客户端推送不同的路由、配置不同的ip</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 120                                 # 每10秒ping一次，如果超过120s认为对方已经down了，需要重连</span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo                                         # 在vpn链接上启用压缩，服务端开启客户端也必须开启</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 100                                  # 最多有几个vpn客户端可以连</span></span>
<span class="line"><span style="color:#e1e4e8;">user nobody                                      # 启动openvpn的用户和组，建议用nobody</span></span>
<span class="line"><span style="color:#e1e4e8;">group nobody                                     </span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client                                 # 允许vpn客户端之间通信</span></span>
<span class="line"><span style="color:#e1e4e8;">duplicate-cn                                     # 允许多个客户端使用同一个证书登陆，生产环境建议为每个用户都生成自己的证书</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key                                      # 通过keepalived检测后重新启动vpn，不重新读取keys，保留第一次使用的keys</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun                                      # 通过keepalived检测后重新启动vpn，一直保持tun或tap设备是linkup</span></span>
<span class="line"><span style="color:#e1e4e8;">status   /var/log/openvpn/openvpn-status.log     # openvpn的状态日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;">log      /var/log/openvpn/openvpn.log            # openvpn的日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;">writepid /var/run/openvpn/server.pid             # pid文件</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3                                           # 日志级别</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20                                          # 如果连续出现20条相同的日志，只记录一条</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">local 172.16.0.100                               # 监听的ip</span></span>
<span class="line"><span style="color:#24292e;">port 1999                                        # 监听的端口，默认1194，我设置1999，根据你的需求改就行</span></span>
<span class="line"><span style="color:#24292e;">proto tcp                                        # 使用的协议，默认udp，因为经常要通过vpn传文件对可靠性要求比较高，所以用tcp</span></span>
<span class="line"><span style="color:#24292e;">dev tun                                          # 使用tun（隧道）模式，openvpn有两种模式，一种是TUN，另一种是TAP</span></span>
<span class="line"><span style="color:#24292e;">ca   /etc/openvpn/easy-rsa/keys/ca.crt           # 这四条都是指定证书的路径，要确保路径或文件能够访问</span></span>
<span class="line"><span style="color:#24292e;">cert /etc/openvpn/easy-rsa/keys/vpnserver.crt</span></span>
<span class="line"><span style="color:#24292e;">key  /etc/openvpn/easy-rsa/keys/vpnserver.key  </span></span>
<span class="line"><span style="color:#24292e;">dh   /etc/openvpn/easy-rsa/keys/dh2048.pem</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0                    # 设置成server模式并给客户端分配的ip段，服务端会用其中.1和.2两个ip，不要和你的内网冲突</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-pool-persist ipp.txt                    # 当vpn断开或重启后，可以利用该文件重新建立相同的IP地址连接</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.16.0.0 255.255.255.0&quot;            # 这三条是给客户端推的路由，客户端连上后会根据这个添加路由，vpn服务器后端有几个网段就写几个</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 172.16.2.0 255.255.255.0&quot;            # 这些路由的作用是告诉客户端去另一个子网都转发给TUN接口，类似于静态路由</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 10.10.10.0 255.255.255.0&quot;                       </span></span>
<span class="line"><span style="color:#24292e;">client-config-dir /etc/openvpn/ccd               # 客户端的个性配置目录，比如针对每个客户端推送不同的路由、配置不同的ip</span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 120                                 # 每10秒ping一次，如果超过120s认为对方已经down了，需要重连</span></span>
<span class="line"><span style="color:#24292e;">comp-lzo                                         # 在vpn链接上启用压缩，服务端开启客户端也必须开启</span></span>
<span class="line"><span style="color:#24292e;">max-clients 100                                  # 最多有几个vpn客户端可以连</span></span>
<span class="line"><span style="color:#24292e;">user nobody                                      # 启动openvpn的用户和组，建议用nobody</span></span>
<span class="line"><span style="color:#24292e;">group nobody                                     </span></span>
<span class="line"><span style="color:#24292e;">client-to-client                                 # 允许vpn客户端之间通信</span></span>
<span class="line"><span style="color:#24292e;">duplicate-cn                                     # 允许多个客户端使用同一个证书登陆，生产环境建议为每个用户都生成自己的证书</span></span>
<span class="line"><span style="color:#24292e;">persist-key                                      # 通过keepalived检测后重新启动vpn，不重新读取keys，保留第一次使用的keys</span></span>
<span class="line"><span style="color:#24292e;">persist-tun                                      # 通过keepalived检测后重新启动vpn，一直保持tun或tap设备是linkup</span></span>
<span class="line"><span style="color:#24292e;">status   /var/log/openvpn/openvpn-status.log     # openvpn的状态日志文件</span></span>
<span class="line"><span style="color:#24292e;">log      /var/log/openvpn/openvpn.log            # openvpn的日志文件</span></span>
<span class="line"><span style="color:#24292e;">writepid /var/run/openvpn/server.pid             # pid文件</span></span>
<span class="line"><span style="color:#24292e;">verb 3                                           # 日志级别</span></span>
<span class="line"><span style="color:#24292e;">mute 20                                          # 如果连续出现20条相同的日志，只记录一条</span></span></code></pre></div><h2 id="ccd配置文件语法-ccd能对客户端进行细粒度控制" tabindex="-1">CCD配置文件语法，CCD能对客户端进行细粒度控制 <a class="header-anchor" href="#ccd配置文件语法-ccd能对客户端进行细粒度控制" aria-label="Permalink to &quot;CCD配置文件语法，CCD能对客户端进行细粒度控制&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    ifconfig-push    ：向客户端推送虚拟IP地址，它将会覆盖掉 --config-pool的动态分配地址</span></span>
<span class="line"><span style="color:#e1e4e8;">    local</span></span>
<span class="line"><span style="color:#e1e4e8;">    remote-netmask    ：他们的设置相当于--config 选项，用于在客户端机器上远程执行vpn通道的配置</span></span>
<span class="line"><span style="color:#e1e4e8;">    push</span></span>
<span class="line"><span style="color:#e1e4e8;">    push-reset</span></span>
<span class="line"><span style="color:#e1e4e8;">    iroute  ：用于从服务器向特定的客户端生成内部路由，不管客户端从哪里拨入，总是将某个特定子网从服务器路由到客户端，同时需要在服务器端使用--route指令添加该系统路由</span></span>
<span class="line"><span style="color:#e1e4e8;">    config</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#事例</span></span>
<span class="line"><span style="color:#e1e4e8;">cat /etc/openvpn/beihai/ccd/nanchang</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-push 172.16.0.88 255.255.255.0    #表示给客户端分配一个特定IP地址</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1 bypass-dhcp&quot;   #重定向默认网关</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    ifconfig-push    ：向客户端推送虚拟IP地址，它将会覆盖掉 --config-pool的动态分配地址</span></span>
<span class="line"><span style="color:#24292e;">    local</span></span>
<span class="line"><span style="color:#24292e;">    remote-netmask    ：他们的设置相当于--config 选项，用于在客户端机器上远程执行vpn通道的配置</span></span>
<span class="line"><span style="color:#24292e;">    push</span></span>
<span class="line"><span style="color:#24292e;">    push-reset</span></span>
<span class="line"><span style="color:#24292e;">    iroute  ：用于从服务器向特定的客户端生成内部路由，不管客户端从哪里拨入，总是将某个特定子网从服务器路由到客户端，同时需要在服务器端使用--route指令添加该系统路由</span></span>
<span class="line"><span style="color:#24292e;">    config</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#事例</span></span>
<span class="line"><span style="color:#24292e;">cat /etc/openvpn/beihai/ccd/nanchang</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ifconfig-push 172.16.0.88 255.255.255.0    #表示给客户端分配一个特定IP地址</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1 bypass-dhcp&quot;   #重定向默认网关</span></span></code></pre></div><h2 id="openvpn-client端配置文件参数解释" tabindex="-1">openvpn client端配置文件参数解释 <a class="header-anchor" href="#openvpn-client端配置文件参数解释" aria-label="Permalink to &quot;openvpn client端配置文件参数解释&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#随机选择一个Server连接，否则按照顺序从上到下依次连接。该选项默认不启用。</span></span>
<span class="line"><span style="color:#e1e4e8;">    remote-random</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#始终重新解析Server的IP地址（如果remote后面跟的是域名），保证Server IP地址是动态的使用DDNS动态更新DNS后，Client在自动重新连接时重新解析Server的IP地址。这样无需人为重新启动，即可重新接入VPN。</span></span>
<span class="line"><span style="color:#e1e4e8;">    resolv-retry infinite</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#随机选择一个Server连接，否则按照顺序从上到下依次连接。该选项默认不启用。</span></span>
<span class="line"><span style="color:#24292e;">    remote-random</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#始终重新解析Server的IP地址（如果remote后面跟的是域名），保证Server IP地址是动态的使用DDNS动态更新DNS后，Client在自动重新连接时重新解析Server的IP地址。这样无需人为重新启动，即可重新接入VPN。</span></span>
<span class="line"><span style="color:#24292e;">    resolv-retry infinite</span></span></code></pre></div><h2 id="常用配置说明" tabindex="-1">常用配置说明 <a class="header-anchor" href="#常用配置说明" aria-label="Permalink to &quot;常用配置说明&quot;">​</a></h2><table><thead><tr><th style="text-align:left;">配置参数</th><th style="text-align:left;">参数说明</th></tr></thead><tbody><tr><td style="text-align:left;">local 10.0.0.28(外网卡地址)</td><td style="text-align:left;">哪一个本地地址要被openvpn进行监听</td></tr><tr><td style="text-align:left;">port 52115</td><td style="text-align:left;">监听的端口，默认是1194，这里为了安全起见，修改为52115</td></tr><tr><td style="text-align:left;">proto udp</td><td style="text-align:left;">指定监听的协议，当并发访问多时，推荐tcp</td></tr><tr><td style="text-align:left;">dev tun</td><td style="text-align:left;">vpn server的模式采用路由模式，可选tap或tun</td></tr><tr><td style="text-align:left;">ca ca.crt</td><td style="text-align:left;">ca证书，注意此文件和server.conf在一个目录下，否则要用绝对路径调用</td></tr><tr><td style="text-align:left;">cert server.crt</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">key server.key</td><td style="text-align:left;">this file should be kept secret</td></tr><tr><td style="text-align:left;">dh dh1024.pem</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">server 10.8.0.0</td><td style="text-align:left;">这个是vpn server动态分配给vpn client的地址池，一般不需要更改。这个段不要和任何网络地址段冲突或者重复</td></tr><tr><td style="text-align:left;">ifconfig-pool-persist ipp.txt</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">push “route 172.16.1.0 255.255.255.0”</td><td style="text-align:left;">这个是vpn server所在的内网网段，如果有多个可以写多个push，注意，此命令实际作用是在vpn client本地生成vpn sever所在的内网网段路由，确保能够和vpn server所在的内网网段通信</td></tr><tr><td style="text-align:left;">client-to-client</td><td style="text-align:left;">允许拨号的多个vpn client互相通信</td></tr><tr><td style="text-align:left;">duplicate-cn</td><td style="text-align:left;">允许多个客户端使用同一个帐号连接</td></tr><tr><td style="text-align:left;">keepalive 10 20</td><td style="text-align:left;">每10秒ping一次，若是120秒未收到包，即认定客户端断线</td></tr><tr><td style="text-align:left;">comp-lzo</td><td style="text-align:left;">开启压缩功能</td></tr><tr><td style="text-align:left;">persist-key</td><td style="text-align:left;">当vpn超时后，当重新启动vpn后，保持上一次使用的私钥，而不重新读取私钥</td></tr><tr><td style="text-align:left;">persist-tun</td><td style="text-align:left;">通过keepalive检测vpn超时后，当重新启动vpn后，保持tun或者tap设备自动连接状态</td></tr><tr><td style="text-align:left;">status openvpn-status.log</td><td style="text-align:left;">openvpn日志状态信息</td></tr><tr><td style="text-align:left;">log /var/log/openvpn.log</td><td style="text-align:left;">日志文件</td></tr><tr><td style="text-align:left;">verb 3</td><td style="text-align:left;">指定日志文件冗余</td></tr></tbody></table><h2 id="_4-客户端路由配置" tabindex="-1">4.客户端路由配置 <a class="header-anchor" href="#_4-客户端路由配置" aria-label="Permalink to &quot;4.客户端路由配置&quot;">​</a></h2><p>主要由 <code>route-nopull</code>、<code>vpn_gateway</code>、<code>net_gateway</code> 三个参数决定</p><h3 id="route-nopull" tabindex="-1">route-nopull <a class="header-anchor" href="#route-nopull" aria-label="Permalink to &quot;route-nopull&quot;">​</a></h3><p>当客户端加入这个参数后,openvpn 连接后不会添加路由,也就是不会有任何网络请求走 openvpn.</p><h3 id="vpn-gateway" tabindex="-1">vpn_gateway <a class="header-anchor" href="#vpn-gateway" aria-label="Permalink to &quot;vpn_gateway&quot;">​</a></h3><p>当客户端加入 route-nopull 后,所有出去的访问都不从 Openvpn 出去,但可通过添加 vpn_gateway 参数使部分IP访问走 Openvpn 出去</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">route 192.168.1.0 255.255.0.0 vpn_gateway</span></span>
<span class="line"><span style="color:#e1e4e8;">route 172.121.0.0 255.255.0.0 vpn_gateway</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">route 192.168.1.0 255.255.0.0 vpn_gateway</span></span>
<span class="line"><span style="color:#24292e;">route 172.121.0.0 255.255.0.0 vpn_gateway</span></span></code></pre></div><h3 id="net-gateway" tabindex="-1">net_gateway <a class="header-anchor" href="#net-gateway" aria-label="Permalink to &quot;net_gateway&quot;">​</a></h3><p>这个参数和 <code>vpn_gateway</code> 相反,表示在默认出去的访问全部走 <code>Openvpn</code> 时,强行指定部分IP访问不通过 <code>Openvpn</code> 出去. max-routes 参数表示可以添加路由的条数,默认只允许添加100条路由,如果少于100条路由可不加这个参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">max-routes 1000</span></span>
<span class="line"><span style="color:#e1e4e8;">route 172.121.0.0 255.255.0.0 net_gateway</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">max-routes 1000</span></span>
<span class="line"><span style="color:#24292e;">route 172.121.0.0 255.255.0.0 net_gateway</span></span></code></pre></div>`,23),o=[l];function t(c,i,r,y,d,u){return n(),a("div",null,o)}const h=s(p,[["render",t]]);export{g as __pageData,h as default};
