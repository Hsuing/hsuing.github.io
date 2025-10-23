import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"优化vpn速度","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/index.md","filePath":"guide/Linux/vpn/index.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/index.md"},l=e(`<ul><li>官方文档</li></ul><p><a href="https://openvpn.net/community-resources/how-to/" target="_blank" rel="noreferrer">https://openvpn.net/community-resources/how-to/</a></p><p>[SOLVED] OpenVPN 重复的消息: TEST ROUTES: 0/0 succeeded len=1 ret=0 a=0 u/d=down</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Wed Jun 08 01:55:59 2011 C:\\WINDOWS\\system32\\route.exe ADD 128.0.0.0 MASK 128.0.0.0 10.8.0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">Wed Jun 08 01:55:59 2011 Warning: route gateway is not reachable on any active network adapters: 10.8.0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">Wed Jun 08 01:55:59 2011 Route addition via IPAPI failed [adaptive]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Wed Jun 08 01:55:59 2011 C:\\WINDOWS\\system32\\route.exe ADD 128.0.0.0 MASK 128.0.0.0 10.8.0.5</span></span>
<span class="line"><span style="color:#24292e;">Wed Jun 08 01:55:59 2011 Warning: route gateway is not reachable on any active network adapters: 10.8.0.5</span></span>
<span class="line"><span style="color:#24292e;">Wed Jun 08 01:55:59 2011 Route addition via IPAPI failed [adaptive]</span></span></code></pre></div><p>解决方式：</p><p>​ <strong>Warning: route gateway is not reachable on any active network adapters: 10.8.0.5</strong></p><ul><li>到你安装OpenVPN\\bin目录下，将openvpn.exe, openvpn-gui-1.0.3.exe以及openvpnserv.exe设置管理员权限和windows xp 兼容模式（右击-属性-兼容性）</li><li>修改客户端配置文件（.ovpn），增加一行：<code>route-method exe</code></li></ul><h1 id="优化vpn速度" tabindex="-1">优化vpn速度 <a class="header-anchor" href="#优化vpn速度" aria-label="Permalink to &quot;优化vpn速度&quot;">​</a></h1><h2 id="sever端" tabindex="-1">sever端 <a class="header-anchor" href="#sever端" aria-label="Permalink to &quot;sever端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sndbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher none       // 关闭加密 </span></span>
<span class="line"><span style="color:#e1e4e8;">auth none          //关闭MAC</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sndbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">rcvbuf 393216</span></span>
<span class="line"><span style="color:#24292e;">push &quot;sndbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;">push &quot;rcvbuf 393216&quot;</span></span>
<span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">cipher none       // 关闭加密 </span></span>
<span class="line"><span style="color:#24292e;">auth none          //关闭MAC</span></span></code></pre></div><h2 id="client端" tabindex="-1">client端 <a class="header-anchor" href="#client端" aria-label="Permalink to &quot;client端&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 20</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher none       // 关闭加密 </span></span>
<span class="line"><span style="color:#e1e4e8;">auth none          //关闭MAC</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">tun-mtu 9000</span></span>
<span class="line"><span style="color:#24292e;">mute 20</span></span>
<span class="line"><span style="color:#24292e;">cipher none       // 关闭加密 </span></span>
<span class="line"><span style="color:#24292e;">auth none          //关闭MAC</span></span></code></pre></div><p>可以把压缩删除</p><h2 id="openssl加密与lzo压缩的影响" tabindex="-1">OpenSSL加密与LZO压缩的影响 <a class="header-anchor" href="#openssl加密与lzo压缩的影响" aria-label="Permalink to &quot;OpenSSL加密与LZO压缩的影响&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">对于不是特别古老的CPU，这两项都不会成为性能瓶颈。然而：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(1)VPS等环境下，cpu被共享，服务器能用于压缩和加密的计算资源不多</span></span>
<span class="line"><span style="color:#e1e4e8;">(2)客户端设备繁多，可能存在性能瓶颈。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">对SSL，OpenVPN先查看可用的加密方法：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	openvpn --show-ciphers</span></span>
<span class="line"><span style="color:#e1e4e8;">注意区别于</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	openvpn --show-tls</span></span>
<span class="line"><span style="color:#e1e4e8;">后者是指在交换密钥时用到的加密方法，而前者是指对于数据通道的加密方法。前者真正影响传输性能。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">速度比较快的加密方法也只有bf-cbc和aes-128-cbc两种。然后分别在服务端和客户端进行一下OpenSSL性能测试，Win下的OpenSSL在OpenVPN安装目录下的bin文件夹内。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	openssl speed bf-cbc aes-128-cbc</span></span>
<span class="line"><span style="color:#e1e4e8;">根据实际速度选择合适的加密算法，然后在服务器和客户端的openvpn配置文件中用cipher BF-CBC或者cipher AES-128-CBC指明，服务端和客户端配置文件都需要更改。注意部分Intel i5/i7和AMD的Bulldozer处理器支持AES-NI指令集，搭配OpenSSL的AES-NI补丁可以将AES-128-CBC的速度提升7倍。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">对lzo我没有找到简单科学的的测试方法，我的测试方法是运行</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	dd count=10240 if=/dev/urandom | lzop -c &gt;/dev/null</span></span>
<span class="line"><span style="color:#e1e4e8;">然后把上面的结果处以top里面看到的lzop的cpu占用率，得到lzop真实效率。在我的测试中，Xeon(R) CPU X3220@2.40GHz的一个核心上，占用14%的cpu时间，只能处理5.0MB/s的压缩。官方的数据在这里。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">意义</span></span>
<span class="line"><span style="color:#e1e4e8;">不使用OpenVPN时，下载有多线程工具，视频网站有CDN加速，RWIN和RTT的限制都被很好地避免了。然而OpenVPN需要将所有流量全部经由单个UDP/TCP连接传输，保证单个接口/连接的吞吐率就非常重要</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">对于不是特别古老的CPU，这两项都不会成为性能瓶颈。然而：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(1)VPS等环境下，cpu被共享，服务器能用于压缩和加密的计算资源不多</span></span>
<span class="line"><span style="color:#24292e;">(2)客户端设备繁多，可能存在性能瓶颈。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">对SSL，OpenVPN先查看可用的加密方法：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	openvpn --show-ciphers</span></span>
<span class="line"><span style="color:#24292e;">注意区别于</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	openvpn --show-tls</span></span>
<span class="line"><span style="color:#24292e;">后者是指在交换密钥时用到的加密方法，而前者是指对于数据通道的加密方法。前者真正影响传输性能。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">速度比较快的加密方法也只有bf-cbc和aes-128-cbc两种。然后分别在服务端和客户端进行一下OpenSSL性能测试，Win下的OpenSSL在OpenVPN安装目录下的bin文件夹内。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	openssl speed bf-cbc aes-128-cbc</span></span>
<span class="line"><span style="color:#24292e;">根据实际速度选择合适的加密算法，然后在服务器和客户端的openvpn配置文件中用cipher BF-CBC或者cipher AES-128-CBC指明，服务端和客户端配置文件都需要更改。注意部分Intel i5/i7和AMD的Bulldozer处理器支持AES-NI指令集，搭配OpenSSL的AES-NI补丁可以将AES-128-CBC的速度提升7倍。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">对lzo我没有找到简单科学的的测试方法，我的测试方法是运行</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	dd count=10240 if=/dev/urandom | lzop -c &gt;/dev/null</span></span>
<span class="line"><span style="color:#24292e;">然后把上面的结果处以top里面看到的lzop的cpu占用率，得到lzop真实效率。在我的测试中，Xeon(R) CPU X3220@2.40GHz的一个核心上，占用14%的cpu时间，只能处理5.0MB/s的压缩。官方的数据在这里。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">意义</span></span>
<span class="line"><span style="color:#24292e;">不使用OpenVPN时，下载有多线程工具，视频网站有CDN加速，RWIN和RTT的限制都被很好地避免了。然而OpenVPN需要将所有流量全部经由单个UDP/TCP连接传输，保证单个接口/连接的吞吐率就非常重要</span></span></code></pre></div><p>3安装方式</p><p><a href="https://luanlengli.github.io/2019/11/25/CentOS7%E9%83%A8%E7%BD%B2OpenVPN%E5%AE%9E%E7%8E%B0%E5%86%85%E7%BD%91%E4%BA%92%E9%80%9A.html" target="_blank" rel="noreferrer">https://luanlengli.github.io/2019/11/25/CentOS7%E9%83%A8%E7%BD%B2OpenVPN%E5%AE%9E%E7%8E%B0%E5%86%85%E7%BD%91%E4%BA%92%E9%80%9A.html</a></p><h2 id="配置模版" tabindex="-1">配置模版 <a class="header-anchor" href="#配置模版" aria-label="Permalink to &quot;配置模版&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#通讯协议，可以选择TCP或者UDP，UDP更适合于在丢包率较大的环境使用</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#端口号</span></span>
<span class="line"><span style="color:#e1e4e8;">port 1194</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#使用tun或者tap设备</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#实现/24子网掩码换算，最大客户端有255个</span></span>
<span class="line"><span style="color:#e1e4e8;">topology subnet</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#设置子网，默认是10.8.0.0/24</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#认证算法</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA256</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#加密算法</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#使用LZO压缩</span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo adaptive</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#告知客户端通讯将采用LZO压缩</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;comp-lzo adaptive&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#此处是全局路由选项，即告知客户端将所有流量通过VPN隧道发送，一般是不使用</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#推送DNS信息，下同</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 1.1.1.1&quot; </span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-option DNS 8.8.8.8&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#服务器CA证书路径</span></span>
<span class="line"><span style="color:#e1e4e8;">ca /etc/openvpn/cert/ca.crt </span></span>
<span class="line"><span style="color:#e1e4e8;">#diffie hellman密钥路径</span></span>
<span class="line"><span style="color:#e1e4e8;">dh /etc/openvpn/cert/dh1024.pem </span></span>
<span class="line"><span style="color:#e1e4e8;">#服务器证书路径</span></span>
<span class="line"><span style="color:#e1e4e8;">cert /etc/openvpn/cert/server.crt </span></span>
<span class="line"><span style="color:#e1e4e8;">#服务器密钥路径</span></span>
<span class="line"><span style="color:#e1e4e8;">key /etc/openvpn/cert/server.key </span></span>
<span class="line"><span style="color:#e1e4e8;">#在SSL/TLS握手包的基础上增加额外的签名以提高安全性。</span></span>
<span class="line"><span style="color:#e1e4e8;">tls-auth /etc/openvpn/cert/ta.key </span></span>
<span class="line"><span style="color:#e1e4e8;">#此选项使VPN在重连时不重新读取key且不会将tun设备关闭</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key </span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">#通过yum安装的，可将其配置为以openvpn用户和组运行，增加安全性</span></span>
<span class="line"><span style="color:#e1e4e8;">user openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;">group openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;">#openvpn账号密码认证脚本</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass-verify /etc/openvpn/openvpn3config/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#使用客户端提供的用户名作为common name</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#不要求客户端提供证书</span></span>
<span class="line"><span style="color:#e1e4e8;">client-cert-not-required</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#脚本运行级别为3，否则无法认证用户名密码</span></span>
<span class="line"><span style="color:#e1e4e8;">script-security 3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#客户端配置文件，可以配置客户端的IP</span></span>
<span class="line"><span style="color:#e1e4e8;">client-config-dir /etc/openvpn/ccd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#生成日志</span></span>
<span class="line"><span style="color:#e1e4e8;">log /var/log/openvpn.log</span></span>
<span class="line"><span style="color:#e1e4e8;">log-append /var/log/openvpn.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#将最大客户端设置为255</span></span>
<span class="line"><span style="color:#e1e4e8;">max-clients 255</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#该选项允许客户端直接通讯而在路由上不经过网关</span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#10秒钟ping一次对端以确定对方是否在线，60秒未响应则断开连接，适合客户端在NAT后使用</span></span>
<span class="line"><span style="color:#e1e4e8;">keepalive 10 60</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nice 3</span></span>
<span class="line"><span style="color:#e1e4e8;">#日志级别设置</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 4</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 10</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">explicit-exit-notify 1</span></span>
<span class="line"><span style="color:#e1e4e8;">当服务器重新启动时，通知客户端，以便它可以自动重新连接。仅在UDP协议是可用</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">#通讯协议，可以选择TCP或者UDP，UDP更适合于在丢包率较大的环境使用</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#端口号</span></span>
<span class="line"><span style="color:#24292e;">port 1194</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#使用tun或者tap设备</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#实现/24子网掩码换算，最大客户端有255个</span></span>
<span class="line"><span style="color:#24292e;">topology subnet</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#设置子网，默认是10.8.0.0/24</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#认证算法</span></span>
<span class="line"><span style="color:#24292e;">auth SHA256</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#加密算法</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#使用LZO压缩</span></span>
<span class="line"><span style="color:#24292e;">comp-lzo adaptive</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#告知客户端通讯将采用LZO压缩</span></span>
<span class="line"><span style="color:#24292e;">push &quot;comp-lzo adaptive&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#此处是全局路由选项，即告知客户端将所有流量通过VPN隧道发送，一般是不使用</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1 bypass-dhcp&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#推送DNS信息，下同</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 1.1.1.1&quot; </span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-option DNS 8.8.8.8&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#服务器CA证书路径</span></span>
<span class="line"><span style="color:#24292e;">ca /etc/openvpn/cert/ca.crt </span></span>
<span class="line"><span style="color:#24292e;">#diffie hellman密钥路径</span></span>
<span class="line"><span style="color:#24292e;">dh /etc/openvpn/cert/dh1024.pem </span></span>
<span class="line"><span style="color:#24292e;">#服务器证书路径</span></span>
<span class="line"><span style="color:#24292e;">cert /etc/openvpn/cert/server.crt </span></span>
<span class="line"><span style="color:#24292e;">#服务器密钥路径</span></span>
<span class="line"><span style="color:#24292e;">key /etc/openvpn/cert/server.key </span></span>
<span class="line"><span style="color:#24292e;">#在SSL/TLS握手包的基础上增加额外的签名以提高安全性。</span></span>
<span class="line"><span style="color:#24292e;">tls-auth /etc/openvpn/cert/ta.key </span></span>
<span class="line"><span style="color:#24292e;">#此选项使VPN在重连时不重新读取key且不会将tun设备关闭</span></span>
<span class="line"><span style="color:#24292e;">persist-key </span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">#通过yum安装的，可将其配置为以openvpn用户和组运行，增加安全性</span></span>
<span class="line"><span style="color:#24292e;">user openvpn</span></span>
<span class="line"><span style="color:#24292e;">group openvpn</span></span>
<span class="line"><span style="color:#24292e;">#openvpn账号密码认证脚本</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass-verify /etc/openvpn/openvpn3config/checkpsw.sh via-env</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#使用客户端提供的用户名作为common name</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#不要求客户端提供证书</span></span>
<span class="line"><span style="color:#24292e;">client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#脚本运行级别为3，否则无法认证用户名密码</span></span>
<span class="line"><span style="color:#24292e;">script-security 3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#客户端配置文件，可以配置客户端的IP</span></span>
<span class="line"><span style="color:#24292e;">client-config-dir /etc/openvpn/ccd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#生成日志</span></span>
<span class="line"><span style="color:#24292e;">log /var/log/openvpn.log</span></span>
<span class="line"><span style="color:#24292e;">log-append /var/log/openvpn.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#将最大客户端设置为255</span></span>
<span class="line"><span style="color:#24292e;">max-clients 255</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#该选项允许客户端直接通讯而在路由上不经过网关</span></span>
<span class="line"><span style="color:#24292e;">client-to-client</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#10秒钟ping一次对端以确定对方是否在线，60秒未响应则断开连接，适合客户端在NAT后使用</span></span>
<span class="line"><span style="color:#24292e;">keepalive 10 60</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nice 3</span></span>
<span class="line"><span style="color:#24292e;">#日志级别设置</span></span>
<span class="line"><span style="color:#24292e;">verb 4</span></span>
<span class="line"><span style="color:#24292e;">mute 10</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">explicit-exit-notify 1</span></span>
<span class="line"><span style="color:#24292e;">当服务器重新启动时，通知客户端，以便它可以自动重新连接。仅在UDP协议是可用</span></span></code></pre></div><ul><li>client</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#声明为客户端</span></span>
<span class="line"><span style="color:#e1e4e8;">client</span></span>
<span class="line"><span style="color:#e1e4e8;">#使用tun/tap设备，必须与服务端一直</span></span>
<span class="line"><span style="color:#e1e4e8;">dev tun</span></span>
<span class="line"><span style="color:#e1e4e8;">#连接协议，必须与服务端一直</span></span>
<span class="line"><span style="color:#e1e4e8;">proto tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">#远程服务器的地址和端口号，可以是域名也可以是IP地址</span></span>
<span class="line"><span style="color:#e1e4e8;">remote IP or Domain name Portnum</span></span>
<span class="line"><span style="color:#e1e4e8;">#在服务器中断后自动连接</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#e1e4e8;">#不指定网卡</span></span>
<span class="line"><span style="color:#e1e4e8;">nobind</span></span>
<span class="line"><span style="color:#e1e4e8;">#以下同服务端说明</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-key</span></span>
<span class="line"><span style="color:#e1e4e8;">persist-tun</span></span>
<span class="line"><span style="color:#e1e4e8;">auth SHA256</span></span>
<span class="line"><span style="color:#e1e4e8;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#e1e4e8;">comp-lzo adaptive</span></span>
<span class="line"><span style="color:#e1e4e8;">nice 0</span></span>
<span class="line"><span style="color:#e1e4e8;">verb 3</span></span>
<span class="line"><span style="color:#e1e4e8;">mute 10</span></span>
<span class="line"><span style="color:#e1e4e8;">#认证文件，即用户名密码，下次无需再输入</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass pass.txt</span></span>
<span class="line"><span style="color:#e1e4e8;">#ca证书路径，也可使用&lt;ca&gt;&lt;/ca&gt;的形式直接将证书粘贴于此</span></span>
<span class="line"><span style="color:#e1e4e8;">ca ca证书路径</span></span>
<span class="line"><span style="color:#e1e4e8;">#key应该与服务器一致 </span></span>
<span class="line"><span style="color:#e1e4e8;">tls-auth ta.key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#声明为客户端</span></span>
<span class="line"><span style="color:#24292e;">client</span></span>
<span class="line"><span style="color:#24292e;">#使用tun/tap设备，必须与服务端一直</span></span>
<span class="line"><span style="color:#24292e;">dev tun</span></span>
<span class="line"><span style="color:#24292e;">#连接协议，必须与服务端一直</span></span>
<span class="line"><span style="color:#24292e;">proto tcp</span></span>
<span class="line"><span style="color:#24292e;">#远程服务器的地址和端口号，可以是域名也可以是IP地址</span></span>
<span class="line"><span style="color:#24292e;">remote IP or Domain name Portnum</span></span>
<span class="line"><span style="color:#24292e;">#在服务器中断后自动连接</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry infinite</span></span>
<span class="line"><span style="color:#24292e;">#不指定网卡</span></span>
<span class="line"><span style="color:#24292e;">nobind</span></span>
<span class="line"><span style="color:#24292e;">#以下同服务端说明</span></span>
<span class="line"><span style="color:#24292e;">persist-key</span></span>
<span class="line"><span style="color:#24292e;">persist-tun</span></span>
<span class="line"><span style="color:#24292e;">auth SHA256</span></span>
<span class="line"><span style="color:#24292e;">cipher AES-256-CBC</span></span>
<span class="line"><span style="color:#24292e;">comp-lzo adaptive</span></span>
<span class="line"><span style="color:#24292e;">nice 0</span></span>
<span class="line"><span style="color:#24292e;">verb 3</span></span>
<span class="line"><span style="color:#24292e;">mute 10</span></span>
<span class="line"><span style="color:#24292e;">#认证文件，即用户名密码，下次无需再输入</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass pass.txt</span></span>
<span class="line"><span style="color:#24292e;">#ca证书路径，也可使用&lt;ca&gt;&lt;/ca&gt;的形式直接将证书粘贴于此</span></span>
<span class="line"><span style="color:#24292e;">ca ca证书路径</span></span>
<span class="line"><span style="color:#24292e;">#key应该与服务器一致 </span></span>
<span class="line"><span style="color:#24292e;">tls-auth ta.key</span></span></code></pre></div><p>注意，如果客户端和服务端在同一网络内（如，同个路由器下，192.168.1.100 和 192.168.1.101），要增加 <code>local</code> 关键字（这个坑很大）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway local def1 bypass-dhcp&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">push &quot;redirect-gateway local def1 bypass-dhcp&quot;</span></span></code></pre></div><h1 id="系统参数优化" tabindex="-1">系统参数优化 <a class="header-anchor" href="#系统参数优化" aria-label="Permalink to &quot;系统参数优化&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install epel-release -y</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#替换阿里源</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -e &#39;s,^#baseurl,baseurl,g&#39; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -e &#39;s,^metalink,#metalink,g&#39; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -e &#39;s,^mirrorlist=,#mirrorlist=,g&#39; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -e &#39;s,http://download.fedoraproject.org/pub,https://mirrors.aliyun.com,g&#39; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -i /etc/yum.repos.d/epel.repo</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">yum makecache</span></span>
<span class="line"><span style="color:#e1e4e8;">yum update -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install epel-release -y</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#替换阿里源</span></span>
<span class="line"><span style="color:#24292e;">sed -e &#39;s,^#baseurl,baseurl,g&#39; \\</span></span>
<span class="line"><span style="color:#24292e;">    -e &#39;s,^metalink,#metalink,g&#39; \\</span></span>
<span class="line"><span style="color:#24292e;">    -e &#39;s,^mirrorlist=,#mirrorlist=,g&#39; \\</span></span>
<span class="line"><span style="color:#24292e;">    -e &#39;s,http://download.fedoraproject.org/pub,https://mirrors.aliyun.com,g&#39; \\</span></span>
<span class="line"><span style="color:#24292e;">    -i /etc/yum.repos.d/epel.repo</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">yum makecache</span></span>
<span class="line"><span style="color:#24292e;">yum update -y</span></span></code></pre></div><h2 id="修改sysctl参数" tabindex="-1">修改sysctl参数 <a class="header-anchor" href="#修改sysctl参数" aria-label="Permalink to &quot;修改sysctl参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt; /etc/sysctl.d/99-net.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"># 二层的网桥在转发包时也会被iptables的FORWARD规则所过滤</span></span>
<span class="line"><span style="color:#e1e4e8;">net.bridge.bridge-nf-call-arptables=1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.bridge.bridge-nf-call-iptables=1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.bridge.bridge-nf-call-ip6tables=1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 关闭严格校验数据包的反向路径，默认值1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.conf.default.rp_filter=0</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.conf.all.rp_filter=0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置 conntrack 的上限</span></span>
<span class="line"><span style="color:#e1e4e8;">net.netfilter.nf_conntrack_max=1048576</span></span>
<span class="line"><span style="color:#e1e4e8;"># 端口最大的监听队列的长度</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.somaxconn=21644</span></span>
<span class="line"><span style="color:#e1e4e8;"># TCP阻塞控制算法BBR，Linux内核版本4.9开始内置BBR算法</span></span>
<span class="line"><span style="color:#e1e4e8;">#net.ipv4.tcp_congestion_control=bbr</span></span>
<span class="line"><span style="color:#e1e4e8;">#net.core.default_qdisc=fq</span></span>
<span class="line"><span style="color:#e1e4e8;"># 打开ipv4数据包转发</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_forward=1</span></span>
<span class="line"><span style="color:#e1e4e8;"># TCP FastOpen</span></span>
<span class="line"><span style="color:#e1e4e8;"># 0:关闭 ; 1:作为客户端时使用 ; 2:作为服务器端时使用 ; 3:无论作为客户端还是服务器端都使用</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_fastopen=3</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt; /etc/sysctl.d/99-net.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;"># 二层的网桥在转发包时也会被iptables的FORWARD规则所过滤</span></span>
<span class="line"><span style="color:#24292e;">net.bridge.bridge-nf-call-arptables=1</span></span>
<span class="line"><span style="color:#24292e;">net.bridge.bridge-nf-call-iptables=1</span></span>
<span class="line"><span style="color:#24292e;">net.bridge.bridge-nf-call-ip6tables=1</span></span>
<span class="line"><span style="color:#24292e;"># 关闭严格校验数据包的反向路径，默认值1</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.conf.default.rp_filter=0</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.conf.all.rp_filter=0</span></span>
<span class="line"><span style="color:#24292e;"># 设置 conntrack 的上限</span></span>
<span class="line"><span style="color:#24292e;">net.netfilter.nf_conntrack_max=1048576</span></span>
<span class="line"><span style="color:#24292e;"># 端口最大的监听队列的长度</span></span>
<span class="line"><span style="color:#24292e;">net.core.somaxconn=21644</span></span>
<span class="line"><span style="color:#24292e;"># TCP阻塞控制算法BBR，Linux内核版本4.9开始内置BBR算法</span></span>
<span class="line"><span style="color:#24292e;">#net.ipv4.tcp_congestion_control=bbr</span></span>
<span class="line"><span style="color:#24292e;">#net.core.default_qdisc=fq</span></span>
<span class="line"><span style="color:#24292e;"># 打开ipv4数据包转发</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_forward=1</span></span>
<span class="line"><span style="color:#24292e;"># TCP FastOpen</span></span>
<span class="line"><span style="color:#24292e;"># 0:关闭 ; 1:作为客户端时使用 ; 2:作为服务器端时使用 ; 3:无论作为客户端还是服务器端都使用</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_fastopen=3</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div><h2 id="修改limits参数" tabindex="-1">修改limits参数 <a class="header-anchor" href="#修改limits参数" aria-label="Permalink to &quot;修改limits参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt; /etc/security/limits.d/99-centos.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">* - nproc 1048576</span></span>
<span class="line"><span style="color:#e1e4e8;">* - nofile 1048576</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt; /etc/security/limits.d/99-centos.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">* - nproc 1048576</span></span>
<span class="line"><span style="color:#24292e;">* - nofile 1048576</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div>`,29),o=[l];function c(t,i,r,y,d,u){return n(),a("div",null,o)}const g=s(p,[["render",c]]);export{v as __pageData,g as default};
