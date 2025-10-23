import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/15-anli.md","filePath":"guide/Linux/vpn/15-anli.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/15-anli.md"},l=e(`<h2 id="一、案例1" tabindex="-1"><strong>一、案例1</strong> <a class="header-anchor" href="#一、案例1" aria-label="Permalink to &quot;**一、案例1**&quot;">​</a></h2><p>**针对不同的客户端指定不同的等级和权限。**通常的方法是： 1、每个客户端分配不同的IP地址； 2、利用防火墙对不同的IP地址进行控制；</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">例如：</span></span>
<span class="line"><span style="color:#e1e4e8;">引用</span></span>
<span class="line"><span style="color:#e1e4e8;">1、公司内部网段是10.66.4.0/24；</span></span>
<span class="line"><span style="color:#e1e4e8;">2、所有人允许访问Email服务器为10.66.4.4，但不能访问其他服务器；</span></span>
<span class="line"><span style="color:#e1e4e8;">3、特定的客户组允许访问Samba服务器为10.66.4.12，不能访问其他服务器；</span></span>
<span class="line"><span style="color:#e1e4e8;">4、管理员能访问所有公司内网服务器。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 根据上述的要求，我们可以对OpenVPN服务端进行配置：（而不需要修改客户端配置文件）</span></span>
<span class="line"><span style="color:#e1e4e8;">引用</span></span>
<span class="line"><span style="color:#e1e4e8;">server.conf增加：</span></span>
<span class="line"><span style="color:#e1e4e8;">#10.8.0.0是给所有VPN客户端的IP段；</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">#10.8.1.0是给管理员分配的IP段；</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">#10.8.2.0就是给特定用户组分配的IP段；</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.2.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">#下面是定义服务器读取特殊客户端配置文件的目录为ccd；</span></span>
<span class="line"><span style="color:#e1e4e8;">client-config-dir ccd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 通过上面的配置，今后我们就可以对指定的客户进行特殊的定义了。配置文件应该放在ccd目录下：</span></span>
<span class="line"><span style="color:#e1e4e8;">引用</span></span>
<span class="line"><span style="color:#e1e4e8;">ccd/sysadmin1：</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-push 10.8.1.1 10.8.1.2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">引用</span></span>
<span class="line"><span style="color:#e1e4e8;">ccd/contractor1：</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-push 10.8.2.1 10.8.2.2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">引用</span></span>
<span class="line"><span style="color:#e1e4e8;">ccd/contractor2：</span></span>
<span class="line"><span style="color:#e1e4e8;">ifconfig-push 10.8.2.5 10.8.2.6</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">例如：</span></span>
<span class="line"><span style="color:#24292e;">引用</span></span>
<span class="line"><span style="color:#24292e;">1、公司内部网段是10.66.4.0/24；</span></span>
<span class="line"><span style="color:#24292e;">2、所有人允许访问Email服务器为10.66.4.4，但不能访问其他服务器；</span></span>
<span class="line"><span style="color:#24292e;">3、特定的客户组允许访问Samba服务器为10.66.4.12，不能访问其他服务器；</span></span>
<span class="line"><span style="color:#24292e;">4、管理员能访问所有公司内网服务器。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 根据上述的要求，我们可以对OpenVPN服务端进行配置：（而不需要修改客户端配置文件）</span></span>
<span class="line"><span style="color:#24292e;">引用</span></span>
<span class="line"><span style="color:#24292e;">server.conf增加：</span></span>
<span class="line"><span style="color:#24292e;">#10.8.0.0是给所有VPN客户端的IP段；</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">#10.8.1.0是给管理员分配的IP段；</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">#10.8.2.0就是给特定用户组分配的IP段；</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.2.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">#下面是定义服务器读取特殊客户端配置文件的目录为ccd；</span></span>
<span class="line"><span style="color:#24292e;">client-config-dir ccd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 通过上面的配置，今后我们就可以对指定的客户进行特殊的定义了。配置文件应该放在ccd目录下：</span></span>
<span class="line"><span style="color:#24292e;">引用</span></span>
<span class="line"><span style="color:#24292e;">ccd/sysadmin1：</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-push 10.8.1.1 10.8.1.2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">引用</span></span>
<span class="line"><span style="color:#24292e;">ccd/contractor1：</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-push 10.8.2.1 10.8.2.2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">引用</span></span>
<span class="line"><span style="color:#24292e;">ccd/contractor2：</span></span>
<span class="line"><span style="color:#24292e;">ifconfig-push 10.8.2.5 10.8.2.6</span></span></code></pre></div><p><strong>※注意： 1、文件名就是客户的Common Name，OpenVPN是根据该名称来获得指定客户端的； 2、客户端的IP地址不是任意指定的，由于Windows的TAP驱动必须采用/30网段的IP，为兼容该协议，应从特定的IP地址中选择，而且是成组出现的</strong></p><p>那最后，剩下的就是用iptables防火墙做限制即可：（假设PLOICY为Deny）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -s 10.8.0.0/24 -d 10.66.4.4 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -s 10.8.1.0/24 -d 10.66.4.0/24 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -s 10.8.2.0/24 -d 10.66.4.12 -j ACCEPT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -s 10.8.0.0/24 -d 10.66.4.4 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -s 10.8.1.0/24 -d 10.66.4.0/24 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -s 10.8.2.0/24 -d 10.66.4.12 -j ACCEPT</span></span></code></pre></div><h2 id="二、案例2" tabindex="-1"><strong>二、案例2</strong> <a class="header-anchor" href="#二、案例2" aria-label="Permalink to &quot;**二、案例2**&quot;">​</a></h2><p><strong>让客户端内部子网可与服务端内部网互通，其实也就是实现点对点互连了</strong></p><p>要求如下： 1、客户端的子网网段必须唯一； 2、客户端的Common Name要唯一，而且不能在服务器的配置文件中配置有duplicate-cn； 3、客户端打开IP Forward（路由转发）和允许TUN、TAP进入；</p><p>那假设客户端子网为192.168.4.0，并且客户端网关和客户端OpenVPN是同一服务器，配置如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server.conf增加：</span></span>
<span class="line"><span style="color:#e1e4e8;">#下面是定义服务器读取特殊客户端配置文件的目录为ccd；</span></span>
<span class="line"><span style="color:#e1e4e8;">client-config-dir ccd</span></span>
<span class="line"><span style="color:#e1e4e8;">#服务器增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#e1e4e8;">route 192.168.4.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">#允许客户端子网互通</span></span>
<span class="line"><span style="color:#e1e4e8;">client-to-client</span></span>
<span class="line"><span style="color:#e1e4e8;">#让所有客户端都增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;route 192.168.4.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#对指定的客户端建立配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /etc/openvpn/ccd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#在ccd目录下建立一个与客户端Common Name相同名字的文件名，并加入：</span></span>
<span class="line"><span style="color:#e1e4e8;">#这是告诉服务器，我（客户端）的子网网段是192.168.4.0/24；</span></span>
<span class="line"><span style="color:#e1e4e8;">iroute 192.168.4.0 255.255.255.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server.conf增加：</span></span>
<span class="line"><span style="color:#24292e;">#下面是定义服务器读取特殊客户端配置文件的目录为ccd；</span></span>
<span class="line"><span style="color:#24292e;">client-config-dir ccd</span></span>
<span class="line"><span style="color:#24292e;">#服务器增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#24292e;">route 192.168.4.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">#允许客户端子网互通</span></span>
<span class="line"><span style="color:#24292e;">client-to-client</span></span>
<span class="line"><span style="color:#24292e;">#让所有客户端都增加到192.168.4.0/24的路由</span></span>
<span class="line"><span style="color:#24292e;">push &quot;route 192.168.4.0 255.255.255.0&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#对指定的客户端建立配置文件</span></span>
<span class="line"><span style="color:#24292e;">mkdir /etc/openvpn/ccd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#在ccd目录下建立一个与客户端Common Name相同名字的文件名，并加入：</span></span>
<span class="line"><span style="color:#24292e;">#这是告诉服务器，我（客户端）的子网网段是192.168.4.0/24；</span></span>
<span class="line"><span style="color:#24292e;">iroute 192.168.4.0 255.255.255.0</span></span></code></pre></div><p><strong>※注意： 1、若OpenVPN Server不是服务端子网的网关，则必须在服务端子网网关加入指向192.168.4.0/24的路由； 2、若客户端的OpenVPN Client也不是客户端子网的网关，同样的，也必须加入对应的路由，如</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">route add -net 192.168.4.0 netmask 255.255.255.0 gw 10.8.0.5 dev eth0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">route add -net 192.168.4.0 netmask 255.255.255.0 gw 10.8.0.5 dev eth0</span></span></code></pre></div><p><strong>总而言之，就是必须让网关通过VPN服务器，可路由到所有的VPN子网，这无论是对于服务端还是客户端都是必须定义的</strong></p><h2 id="三、案例3" tabindex="-1"><strong>三、案例3</strong> <a class="header-anchor" href="#三、案例3" aria-label="Permalink to &quot;**三、案例3**&quot;">​</a></h2><p>OpenVPN内部提供了DHCP的服务，而不需要依赖外部的DHCP服务器。同样，也提供了DHCP服务的一些配置参数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server.conf配置：</span></span>
<span class="line"><span style="color:#e1e4e8;">#定义客户端的DNS服务器地址</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-options DNS 192.168.228.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#定义客户端的WINS服务器地址</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;dhcp-options WINS 192.168.228.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#让客户端发起的所有IP请求都通过OpenVPN服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">push &quot;redirect-gateway def1&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server.conf配置：</span></span>
<span class="line"><span style="color:#24292e;">#定义客户端的DNS服务器地址</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-options DNS 192.168.228.1&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#定义客户端的WINS服务器地址</span></span>
<span class="line"><span style="color:#24292e;">push &quot;dhcp-options WINS 192.168.228.1&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#让客户端发起的所有IP请求都通过OpenVPN服务器</span></span>
<span class="line"><span style="color:#24292e;">push &quot;redirect-gateway def1&quot;</span></span></code></pre></div><p>其中，最后一项配置会修改客户端的默认路由为OpenVPN服务器。这样，通常还必须加入NAT转换</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE</span></span></code></pre></div><p>这样，所有客户端当和OpenVPN服务器连接后，就可以把该服务器作为对外的路由服务器使用了。（类似Proxy）</p><h2 id="四、案例4" tabindex="-1"><strong>四、案例4</strong> <a class="header-anchor" href="#四、案例4" aria-label="Permalink to &quot;**四、案例4**&quot;">​</a></h2><p><strong>由服务端先生成客户端证书，然后分发到客户端，让客户端通过证书连接到服务器上。但有时候，这样的分发是比较麻烦的（也不安全）。我们可以考虑另外一种方式：</strong></p><p><strong>只在服务端制作客户端证书，而客户端只需要有ca.crt文件，而不需要拿到客户端证书，当登陆服务器的时候是通过用户名和密码即可登陆OpenVPN服务器</strong></p><ul><li>服务端配置</li></ul><p>OpenVPN可以通过插件（plugin）方式支持上述的用户名认证，在Linux下以PAM为例，必须先增加用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">useradd -M test</span></span>
<span class="line"><span style="color:#e1e4e8;">passwd test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">useradd -M test</span></span>
<span class="line"><span style="color:#24292e;">passwd test</span></span></code></pre></div><p>修改server.conf增加</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#使用PAM插件</span></span>
<span class="line"><span style="color:#e1e4e8;">plugin /usr/share/openvpn/plugin/lib/openvpn-auth-pam.so login</span></span>
<span class="line"><span style="color:#e1e4e8;">#客户端可以不提供证书</span></span>
<span class="line"><span style="color:#e1e4e8;">client-cert-not-required</span></span>
<span class="line"><span style="color:#e1e4e8;">#用户登陆的用户名就是Common Name</span></span>
<span class="line"><span style="color:#e1e4e8;">username-as-common-name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#使用PAM插件</span></span>
<span class="line"><span style="color:#24292e;">plugin /usr/share/openvpn/plugin/lib/openvpn-auth-pam.so login</span></span>
<span class="line"><span style="color:#24292e;">#客户端可以不提供证书</span></span>
<span class="line"><span style="color:#24292e;">client-cert-not-required</span></span>
<span class="line"><span style="color:#24292e;">#用户登陆的用户名就是Common Name</span></span>
<span class="line"><span style="color:#24292e;">username-as-common-name</span></span></code></pre></div><p><strong>※注意： 1、若不增加client-cert-not-required语句，默认PAM认证和证书验证是需要同时通过才能建立连接的； 2、OpenVPN是基于SSL连接，所以，上述设置只是让客户端不用提供证书，但却必须提供ca.crt； 3、而且OpenVPN服务器也必须用客户端使用的登陆名（如：test）建立相同Common Name的证书，否则客户端登陆的时候，服务器会提示找不到对应证书，而不能建立连接</strong></p><ul><li>客户端配置： client.conf增加</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#激活登陆认证方式</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-user-pass</span></span>
<span class="line"><span style="color:#e1e4e8;">#修改认证证书，保留ca.crt即可，客户端证书可以不要了</span></span>
<span class="line"><span style="color:#e1e4e8;">ca ./easy-rsa/keys/ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">#cert ./easy-rsa/keys/client1.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">#key ./easy-rsa/keys/client1.key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#激活登陆认证方式</span></span>
<span class="line"><span style="color:#24292e;">auth-user-pass</span></span>
<span class="line"><span style="color:#24292e;">#修改认证证书，保留ca.crt即可，客户端证书可以不要了</span></span>
<span class="line"><span style="color:#24292e;">ca ./easy-rsa/keys/ca.crt</span></span>
<span class="line"><span style="color:#24292e;">#cert ./easy-rsa/keys/client1.crt</span></span>
<span class="line"><span style="color:#24292e;">#key ./easy-rsa/keys/client1.key</span></span></code></pre></div><p>这样，当手动启动客户端的时候，即会提示用户名和密码。（用户名和密码为登陆服务器PAM认证，通过后，OpenVPN会提取用户名作为Common Name，并验证客户端证书，若也通过，则连接搭建成功） ※问题：若采用该方式，如何使用后台服务启动客户端？ 答：可以先建立一个文件author-keys（用户名和密码各一行），然后修改配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">auth-user-pass author-keys</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">auth-user-pass author-keys</span></span></code></pre></div><p>另其从中读取该文件以通过验证。 但前提是必须在编译的时候增加--enable-password-save参数</p><h2 id="五、其他" tabindex="-1"><strong>五、其他</strong> <a class="header-anchor" href="#五、其他" aria-label="Permalink to &quot;**五、其他**&quot;">​</a></h2><p>1）若客户端不能访问OpenVPN使用的1194端口，可通过HTTP Proxy，但有要求： 1、OpenVPN连接要使用tcp方式，而不能使用udp方式； 2、客户端配置加入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http-proxy ip port</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http-proxy ip port</span></span></code></pre></div><p>2）OpenVPN负载均衡 要使用OpenVPN负载均衡，可以这样做： 1、可以建立多台服务器，除server配置不同外，其余相同：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server1</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">server2</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#e1e4e8;">server3</span></span>
<span class="line"><span style="color:#e1e4e8;">server 10.8.2.0 255.255.255.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server1</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.0.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">server2</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.1.0 255.255.255.0</span></span>
<span class="line"><span style="color:#24292e;">server3</span></span>
<span class="line"><span style="color:#24292e;">server 10.8.2.0 255.255.255.0</span></span></code></pre></div><p>2、客户端可以用多点尝试进行配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#默认从上往下尝试</span></span>
<span class="line"><span style="color:#e1e4e8;">remote server1 port</span></span>
<span class="line"><span style="color:#e1e4e8;">remote server2 port</span></span>
<span class="line"><span style="color:#e1e4e8;">#也可以改为随机连接</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-random</span></span>
<span class="line"><span style="color:#e1e4e8;">#为防止DNS解析错误导致不进行后续的尝试，可以加入下面的语句</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry 60</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#默认从上往下尝试</span></span>
<span class="line"><span style="color:#24292e;">remote server1 port</span></span>
<span class="line"><span style="color:#24292e;">remote server2 port</span></span>
<span class="line"><span style="color:#24292e;">#也可以改为随机连接</span></span>
<span class="line"><span style="color:#24292e;">remote-random</span></span>
<span class="line"><span style="color:#24292e;">#为防止DNS解析错误导致不进行后续的尝试，可以加入下面的语句</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry 60</span></span></code></pre></div><p>3、使用UDP协议</p><p>因为UDP一般不会有DoS攻击，而且能能防止端口被扫描，能保证更安全</p>`,43),o=[l];function c(t,r,i,d,y,u){return n(),a("div",null,o)}const v=s(p,[["render",c]]);export{g as __pageData,v as default};
