import{_ as s,c as n,o as a,R as e}from"./chunks/framework.CIzs38F0.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/1安装.md","filePath":"guide/Linux/vpn/1安装.md","lastUpdated":1701595065000}'),l={name:"guide/Linux/vpn/1安装.md"},p=e(`<p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/openvpn-icon.png" alt=""></p><ul><li>场景</li></ul><p>openvpn使用场景</p><p>a) 企业员工远程办公，通过远程VPN连接到公司的服务器，访问公司ERP、OA等系统。IT技术人员通过VPN远程连接到机房进行系统维护。</p><p>b) 总部与分支机构之间联通，打通分支与总部的连接</p><p>c) 多IDC机房之间的互联，实现多机房之间的互联互通，数据共享，文件传送</p><p>注意：OpenVPN适用于功能性实现，对于大流量大带宽应用，建议使用点对点专线实现互联</p><p>#一、安装</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>For warning</p></div><p>由于不同环境及软件版本命令使用略有差异，特别是 easy-rsa 的使用在 2.0 和 3.0 的差别有点大</p><p>尽管不同环境及软件版本命令使用略有所差异，但是整个搭建过程都是一致的：</p><blockquote><p>安装相关软件—&gt;生成相关证书：CA 根证书、服务器证书—&gt;配置 open VPN 服务端—&gt;添加防火墙规则：snat—&gt;启动 open VPN 服务端—&gt;创建一个用户测试连接：创建客户端 CA 证书、生成 .ovpn 配置文件、打包相关文件供客户端使用</p></blockquote><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/openvpn-install-step.png" alt="openvpn-install-step"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">环境配置:</span></span>
<span class="line"><span style="color:#e1e4e8;">centos7</span></span>
<span class="line"><span style="color:#e1e4e8;">easy-rsa - 3.0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">OpenVPN - 2.4.7</span></span>
<span class="line"><span style="color:#e1e4e8;">时间服务器一定要同步</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">环境配置:</span></span>
<span class="line"><span style="color:#24292e;">centos7</span></span>
<span class="line"><span style="color:#24292e;">easy-rsa - 3.0.5</span></span>
<span class="line"><span style="color:#24292e;">OpenVPN - 2.4.7</span></span>
<span class="line"><span style="color:#24292e;">时间服务器一定要同步</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#更换阿里源</span></span>
<span class="line"><span style="color:#e1e4e8;">curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo</span></span>
<span class="line"><span style="color:#e1e4e8;">yum clean all &amp;&amp; yum makecache</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# yum install -y epel-release </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# yum install -y openssl lzo pam openssl-devel lzo-devel pam-devel</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]#yum -y install epel-release</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]#yum -y install openvpn easy-rsa iptables-services</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者脚本安装</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# sh openvpn-install.sh </span></span>
<span class="line"><span style="color:#e1e4e8;">Welcome to this OpenVPN &quot;road warrior&quot; installer!</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">I need to ask you a few questions before starting the setup.</span></span>
<span class="line"><span style="color:#e1e4e8;">You can leave the default options and just press enter if you are ok with them.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">First, provide the IPv4 address of the network interface you want OpenVPN</span></span>
<span class="line"><span style="color:#e1e4e8;">listening to.</span></span>
<span class="line"><span style="color:#e1e4e8;">IP address: </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Which protocol do you want for OpenVPN connections?</span></span>
<span class="line"><span style="color:#e1e4e8;">   1) UDP (recommended)</span></span>
<span class="line"><span style="color:#e1e4e8;">   2) TCP</span></span>
<span class="line"><span style="color:#e1e4e8;">Protocol [1-2]: 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">What port do you want OpenVPN listening to?</span></span>
<span class="line"><span style="color:#e1e4e8;">Port: 330</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Which DNS do you want to use with the VPN?</span></span>
<span class="line"><span style="color:#e1e4e8;">   1) Current system resolvers</span></span>
<span class="line"><span style="color:#e1e4e8;">   2) 1.1.1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">   3) Google</span></span>
<span class="line"><span style="color:#e1e4e8;">   4) OpenDNS</span></span>
<span class="line"><span style="color:#e1e4e8;">   5) Verisign</span></span>
<span class="line"><span style="color:#e1e4e8;">DNS [1-5]: 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#更换阿里源</span></span>
<span class="line"><span style="color:#24292e;">curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo</span></span>
<span class="line"><span style="color:#24292e;">yum clean all &amp;&amp; yum makecache</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# yum install -y epel-release </span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# yum install -y openssl lzo pam openssl-devel lzo-devel pam-devel</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]#yum -y install epel-release</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]#yum -y install openvpn easy-rsa iptables-services</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者脚本安装</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# sh openvpn-install.sh </span></span>
<span class="line"><span style="color:#24292e;">Welcome to this OpenVPN &quot;road warrior&quot; installer!</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">I need to ask you a few questions before starting the setup.</span></span>
<span class="line"><span style="color:#24292e;">You can leave the default options and just press enter if you are ok with them.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">First, provide the IPv4 address of the network interface you want OpenVPN</span></span>
<span class="line"><span style="color:#24292e;">listening to.</span></span>
<span class="line"><span style="color:#24292e;">IP address: </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Which protocol do you want for OpenVPN connections?</span></span>
<span class="line"><span style="color:#24292e;">   1) UDP (recommended)</span></span>
<span class="line"><span style="color:#24292e;">   2) TCP</span></span>
<span class="line"><span style="color:#24292e;">Protocol [1-2]: 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">What port do you want OpenVPN listening to?</span></span>
<span class="line"><span style="color:#24292e;">Port: 330</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Which DNS do you want to use with the VPN?</span></span>
<span class="line"><span style="color:#24292e;">   1) Current system resolvers</span></span>
<span class="line"><span style="color:#24292e;">   2) 1.1.1.1</span></span>
<span class="line"><span style="color:#24292e;">   3) Google</span></span>
<span class="line"><span style="color:#24292e;">   4) OpenDNS</span></span>
<span class="line"><span style="color:#24292e;">   5) Verisign</span></span>
<span class="line"><span style="color:#24292e;">DNS [1-5]: 1</span></span></code></pre></div><blockquote><p>输入用户名</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Finally, tell me your name for the client certificate.</span></span>
<span class="line"><span style="color:#e1e4e8;">Please, use one word only, no special characters.</span></span>
<span class="line"><span style="color:#e1e4e8;">Client name: client1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Finally, tell me your name for the client certificate.</span></span>
<span class="line"><span style="color:#24292e;">Please, use one word only, no special characters.</span></span>
<span class="line"><span style="color:#24292e;">Client name: client1</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Okay, that was all I needed. We are ready to set up your OpenVPN server now.</span></span>
<span class="line"><span style="color:#e1e4e8;">Press any key to continue...</span></span>
<span class="line"><span style="color:#e1e4e8;">Loaded plugins: fastestmirror</span></span>
<span class="line"><span style="color:#e1e4e8;">Loading mirror speeds from cached hostfile</span></span>
<span class="line"><span style="color:#e1e4e8;">Package epel-release-7-11.noarch already installed and latest version</span></span>
<span class="line"><span style="color:#e1e4e8;">Nothing to do</span></span>
<span class="line"><span style="color:#e1e4e8;">Loaded plugins: fastestmirror</span></span>
<span class="line"><span style="color:#e1e4e8;">Loading mirror speeds from cached hostfile</span></span>
<span class="line"><span style="color:#e1e4e8;">Package iptables-1.4.21-28.el7.x86_64 already installed and latest version</span></span>
<span class="line"><span style="color:#e1e4e8;">Package 1:openssl-1.0.2k-16.el7_6.1.x86_64 already installed and latest version</span></span>
<span class="line"><span style="color:#e1e4e8;">Package ca-certificates-2018.2.22-70.0.el7_5.noarch already installed and latest version</span></span>
<span class="line"><span style="color:#e1e4e8;">Resolving Dependencies</span></span>
<span class="line"><span style="color:#e1e4e8;">--&gt; Running transaction check</span></span>
<span class="line"><span style="color:#e1e4e8;">---&gt; Package openvpn.x86_64 0:2.4.7-1.el7 will be installed</span></span>
<span class="line"><span style="color:#e1e4e8;">--&gt; Finished Dependency Resolution</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">。。。。                                                                      </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Installed:</span></span>
<span class="line"><span style="color:#e1e4e8;">  openvpn.x86_64 0:2.4.7-1.el7                                                                 </span></span>
<span class="line"><span style="color:#e1e4e8;">Complete!</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">init-pki complete; you may now create a CA or requests.</span></span>
<span class="line"><span style="color:#e1e4e8;">Your newly created PKI dir is: /etc/openvpn/server/easy-rsa/pki</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Generating RSA private key, 2048 bit long modulus</span></span>
<span class="line"><span style="color:#e1e4e8;">.............................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">................................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">e is 65537 (0x10001)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#e1e4e8;">..+++</span></span>
<span class="line"><span style="color:#e1e4e8;">.............................................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">writing new private key to &#39;/etc/openvpn/server/easy-rsa/pki/private/server.key.IseSDZ9N9j&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Using configuration from ./safessl-easyrsa.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#e1e4e8;">Signature ok</span></span>
<span class="line"><span style="color:#e1e4e8;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#e1e4e8;">commonName            :ASN.1 12:&#39;server&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate is to be certified until Sep  3 03:03:59 2029 GMT (3650 days)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#e1e4e8;">Data Base Updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#e1e4e8;">...............+++</span></span>
<span class="line"><span style="color:#e1e4e8;">....+++</span></span>
<span class="line"><span style="color:#e1e4e8;">writing new private key to &#39;/etc/openvpn/server/easy-rsa/pki/private/client1.key.EdLb68mAda&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Using configuration from ./safessl-easyrsa.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#e1e4e8;">Signature ok</span></span>
<span class="line"><span style="color:#e1e4e8;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#e1e4e8;">commonName            :ASN.1 12:&#39;client1&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate is to be certified until Sep  3 03:04:00 2029 GMT (3650 days)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#e1e4e8;">Data Base Updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#e1e4e8;">Using configuration from ./safessl-easyrsa.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">An updated CRL has been created.</span></span>
<span class="line"><span style="color:#e1e4e8;">CRL file: /etc/openvpn/server/easy-rsa/pki/crl.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Created symlink from /etc/systemd/system/multi-user.target.wants/openvpn-iptables.service to /etc/systemd/system/openvpn-iptables.service.</span></span>
<span class="line"><span style="color:#e1e4e8;">Job for openvpn-iptables.service failed because the control process exited with error code. See &quot;systemctl status openvpn-iptables.service&quot; and &quot;journalctl -xe&quot; for details.</span></span>
<span class="line"><span style="color:#e1e4e8;">Created symlink from /etc/systemd/system/multi-user.target.wants/openvpn-server@server.service to /usr/lib/systemd/system/openvpn-server@.service.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Finished!</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Your client configuration is available at: /root/client1.ovpn</span></span>
<span class="line"><span style="color:#e1e4e8;">If you want to add more clients, you simply need to run this script again!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Okay, that was all I needed. We are ready to set up your OpenVPN server now.</span></span>
<span class="line"><span style="color:#24292e;">Press any key to continue...</span></span>
<span class="line"><span style="color:#24292e;">Loaded plugins: fastestmirror</span></span>
<span class="line"><span style="color:#24292e;">Loading mirror speeds from cached hostfile</span></span>
<span class="line"><span style="color:#24292e;">Package epel-release-7-11.noarch already installed and latest version</span></span>
<span class="line"><span style="color:#24292e;">Nothing to do</span></span>
<span class="line"><span style="color:#24292e;">Loaded plugins: fastestmirror</span></span>
<span class="line"><span style="color:#24292e;">Loading mirror speeds from cached hostfile</span></span>
<span class="line"><span style="color:#24292e;">Package iptables-1.4.21-28.el7.x86_64 already installed and latest version</span></span>
<span class="line"><span style="color:#24292e;">Package 1:openssl-1.0.2k-16.el7_6.1.x86_64 already installed and latest version</span></span>
<span class="line"><span style="color:#24292e;">Package ca-certificates-2018.2.22-70.0.el7_5.noarch already installed and latest version</span></span>
<span class="line"><span style="color:#24292e;">Resolving Dependencies</span></span>
<span class="line"><span style="color:#24292e;">--&gt; Running transaction check</span></span>
<span class="line"><span style="color:#24292e;">---&gt; Package openvpn.x86_64 0:2.4.7-1.el7 will be installed</span></span>
<span class="line"><span style="color:#24292e;">--&gt; Finished Dependency Resolution</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">。。。。                                                                      </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Installed:</span></span>
<span class="line"><span style="color:#24292e;">  openvpn.x86_64 0:2.4.7-1.el7                                                                 </span></span>
<span class="line"><span style="color:#24292e;">Complete!</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">init-pki complete; you may now create a CA or requests.</span></span>
<span class="line"><span style="color:#24292e;">Your newly created PKI dir is: /etc/openvpn/server/easy-rsa/pki</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Generating RSA private key, 2048 bit long modulus</span></span>
<span class="line"><span style="color:#24292e;">.............................+++</span></span>
<span class="line"><span style="color:#24292e;">................................+++</span></span>
<span class="line"><span style="color:#24292e;">e is 65537 (0x10001)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#24292e;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#24292e;">..+++</span></span>
<span class="line"><span style="color:#24292e;">.............................................+++</span></span>
<span class="line"><span style="color:#24292e;">writing new private key to &#39;/etc/openvpn/server/easy-rsa/pki/private/server.key.IseSDZ9N9j&#39;</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">Using configuration from ./safessl-easyrsa.cnf</span></span>
<span class="line"><span style="color:#24292e;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#24292e;">Signature ok</span></span>
<span class="line"><span style="color:#24292e;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#24292e;">commonName            :ASN.1 12:&#39;server&#39;</span></span>
<span class="line"><span style="color:#24292e;">Certificate is to be certified until Sep  3 03:03:59 2029 GMT (3650 days)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#24292e;">Data Base Updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#24292e;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#24292e;">...............+++</span></span>
<span class="line"><span style="color:#24292e;">....+++</span></span>
<span class="line"><span style="color:#24292e;">writing new private key to &#39;/etc/openvpn/server/easy-rsa/pki/private/client1.key.EdLb68mAda&#39;</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">Using configuration from ./safessl-easyrsa.cnf</span></span>
<span class="line"><span style="color:#24292e;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#24292e;">Signature ok</span></span>
<span class="line"><span style="color:#24292e;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#24292e;">commonName            :ASN.1 12:&#39;client1&#39;</span></span>
<span class="line"><span style="color:#24292e;">Certificate is to be certified until Sep  3 03:04:00 2029 GMT (3650 days)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#24292e;">Data Base Updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Using SSL: openssl OpenSSL 1.0.2k-fips  26 Jan 2017</span></span>
<span class="line"><span style="color:#24292e;">Using configuration from ./safessl-easyrsa.cnf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">An updated CRL has been created.</span></span>
<span class="line"><span style="color:#24292e;">CRL file: /etc/openvpn/server/easy-rsa/pki/crl.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Created symlink from /etc/systemd/system/multi-user.target.wants/openvpn-iptables.service to /etc/systemd/system/openvpn-iptables.service.</span></span>
<span class="line"><span style="color:#24292e;">Job for openvpn-iptables.service failed because the control process exited with error code. See &quot;systemctl status openvpn-iptables.service&quot; and &quot;journalctl -xe&quot; for details.</span></span>
<span class="line"><span style="color:#24292e;">Created symlink from /etc/systemd/system/multi-user.target.wants/openvpn-server@server.service to /usr/lib/systemd/system/openvpn-server@.service.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Finished!</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Your client configuration is available at: /root/client1.ovpn</span></span>
<span class="line"><span style="color:#24292e;">If you want to add more clients, you simply need to run this script again!</span></span></code></pre></div><p>#二、步骤</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">监听地址设置为空 IP address</span></span>
<span class="line"><span style="color:#e1e4e8;">Protocol:[2]TCP</span></span>
<span class="line"><span style="color:#e1e4e8;">Port:1194</span></span>
<span class="line"><span style="color:#e1e4e8;">不选DNS</span></span>
<span class="line"><span style="color:#e1e4e8;">client name: client_k2</span></span>
<span class="line"><span style="color:#e1e4e8;">External IP : 公网ip地址</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">监听地址设置为空 IP address</span></span>
<span class="line"><span style="color:#24292e;">Protocol:[2]TCP</span></span>
<span class="line"><span style="color:#24292e;">Port:1194</span></span>
<span class="line"><span style="color:#24292e;">不选DNS</span></span>
<span class="line"><span style="color:#24292e;">client name: client_k2</span></span>
<span class="line"><span style="color:#24292e;">External IP : 公网ip地址</span></span></code></pre></div><p>#三、添加用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Select an option[1-4]:1 (add a new user)</span></span>
<span class="line"><span style="color:#e1e4e8;">client name: client_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Select an option[1-4]:1 (add a new user)</span></span>
<span class="line"><span style="color:#24292e;">client name: client_name</span></span></code></pre></div><p>#三、删除用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@beta ~]# sh openvpn-install.sh </span></span>
<span class="line"><span style="color:#e1e4e8;">Looks like OpenVPN is already installed.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">What do you want to do?</span></span>
<span class="line"><span style="color:#e1e4e8;">   1) Add a new user</span></span>
<span class="line"><span style="color:#e1e4e8;">   2) Revoke an existing user</span></span>
<span class="line"><span style="color:#e1e4e8;">   3) Remove OpenVPN</span></span>
<span class="line"><span style="color:#e1e4e8;">   4) Exit</span></span>
<span class="line"><span style="color:#e1e4e8;">Select an option [1-4]:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@beta ~]# sh openvpn-install.sh </span></span>
<span class="line"><span style="color:#24292e;">Looks like OpenVPN is already installed.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">What do you want to do?</span></span>
<span class="line"><span style="color:#24292e;">   1) Add a new user</span></span>
<span class="line"><span style="color:#24292e;">   2) Revoke an existing user</span></span>
<span class="line"><span style="color:#24292e;">   3) Remove OpenVPN</span></span>
<span class="line"><span style="color:#24292e;">   4) Exit</span></span>
<span class="line"><span style="color:#24292e;">Select an option [1-4]:</span></span></code></pre></div><p>#四、启动服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#重启生效</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta server]#systemctl restart openvpn-server@server.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#随系统启动服务</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta server]#systemctl enable openvpn-server@server.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#重启生效</span></span>
<span class="line"><span style="color:#24292e;">[root@beta server]#systemctl restart openvpn-server@server.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#随系统启动服务</span></span>
<span class="line"><span style="color:#24292e;">[root@beta server]#systemctl enable openvpn-server@server.service</span></span></code></pre></div><p>#五、配置 iptables 及转发</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#关闭 firewalld 防火墙</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# systemctl stop firewalld.service    //停止服务</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# systemctl disable firewalld.service //禁止开启动  </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# firewall-cmd --state                //查看状态</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删除FORWARD 规则：</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -nL FORWARD --line-number</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -D FORWARD 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看nat</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]#iptables -L -n -t nat --line-number</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删除一条nat 规则  删除SNAT规则</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat  -D POSTROUTING  1</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -D POSTROUTING 7</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">让openstack 虚拟机上网的规则</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -A POSTROUTING -s 172.28.101.111/255.255.255.0 -o ens33 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##如果是 iptables</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# yum -y install iptables iptables-services</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# iptables -t nat -A POSTROUTING -s 17.166.221.0/24 -o ens192 -j MASQUERADE   #NAT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# systemctl enable iptables.service</span></span>
<span class="line"><span style="color:#e1e4e8;">Created symlink from /etc/systemd/system/basic.target.wants/iptables.service to /usr/lib/systemd/system/iptables.service.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#保存</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# service iptables save</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# systemctl start iptables.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# iptables -L -n</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# iptables -t nat -L -n</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#如果是 firewall-cmd</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]#firewall-cmd --permanent --add-masquerade</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]#firewall-cmd --permanent --add-service=openvpn</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 或者添加自定义端口</span></span>
<span class="line"><span style="color:#e1e4e8;"># firewall-cmd --permanent  --add-port=1194/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]#firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开启转发</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# vim /etc/sysctl.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;1&quot; &gt; /proc/sys/net/ipv4/ip_forward  #这个是临时</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# sysctl -p</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">:::warning</span></span>
<span class="line"><span style="color:#e1e4e8;">到这里为止，openvpn搭建结束，不过这个时候链接vpn之后，本地网络是不能上网的</span></span>
<span class="line"><span style="color:#e1e4e8;">17.166.221.0/24 这个地址vpn server配置文件中定义</span></span>
<span class="line"><span style="color:#e1e4e8;">:::</span></span>
<span class="line"><span style="color:#e1e4e8;">[C:\\~]$ ping www.baidu.com</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">正在 Ping www.a.shifen.com [220.181.38.150] 具有 32 字节的数据:</span></span>
<span class="line"><span style="color:#e1e4e8;">请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">220.181.38.150 的 Ping 统计信息:</span></span>
<span class="line"><span style="color:#e1e4e8;">    数据包: 已发送 = 1，已接收 = 0，丢失 = 1 (100% 丢失)，</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#关闭 firewalld 防火墙</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# systemctl stop firewalld.service    //停止服务</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# systemctl disable firewalld.service //禁止开启动  </span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# firewall-cmd --state                //查看状态</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删除FORWARD 规则：</span></span>
<span class="line"><span style="color:#24292e;">iptables -nL FORWARD --line-number</span></span>
<span class="line"><span style="color:#24292e;">iptables -D FORWARD 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看nat</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]#iptables -L -n -t nat --line-number</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删除一条nat 规则  删除SNAT规则</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat  -D POSTROUTING  1</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -D POSTROUTING 7</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">让openstack 虚拟机上网的规则</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -A POSTROUTING -s 172.28.101.111/255.255.255.0 -o ens33 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##如果是 iptables</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# yum -y install iptables iptables-services</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# iptables -t nat -A POSTROUTING -s 17.166.221.0/24 -o ens192 -j MASQUERADE   #NAT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# systemctl enable iptables.service</span></span>
<span class="line"><span style="color:#24292e;">Created symlink from /etc/systemd/system/basic.target.wants/iptables.service to /usr/lib/systemd/system/iptables.service.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#保存</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# service iptables save</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# systemctl start iptables.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# iptables -L -n</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# iptables -t nat -L -n</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#如果是 firewall-cmd</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]#firewall-cmd --permanent --add-masquerade</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]#firewall-cmd --permanent --add-service=openvpn</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 或者添加自定义端口</span></span>
<span class="line"><span style="color:#24292e;"># firewall-cmd --permanent  --add-port=1194/tcp</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# firewall-cmd --permanent --direct --passthrough ipv4 -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]#firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开启转发</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# vim /etc/sysctl.conf </span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;1&quot; &gt; /proc/sys/net/ipv4/ip_forward  #这个是临时</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# sysctl -p</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">:::warning</span></span>
<span class="line"><span style="color:#24292e;">到这里为止，openvpn搭建结束，不过这个时候链接vpn之后，本地网络是不能上网的</span></span>
<span class="line"><span style="color:#24292e;">17.166.221.0/24 这个地址vpn server配置文件中定义</span></span>
<span class="line"><span style="color:#24292e;">:::</span></span>
<span class="line"><span style="color:#24292e;">[C:\\~]$ ping www.baidu.com</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">正在 Ping www.a.shifen.com [220.181.38.150] 具有 32 字节的数据:</span></span>
<span class="line"><span style="color:#24292e;">请求超时。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">220.181.38.150 的 Ping 统计信息:</span></span>
<span class="line"><span style="color:#24292e;">    数据包: 已发送 = 1，已接收 = 0，丢失 = 1 (100% 丢失)，</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>允许 tun0 网卡进行 FORWARD</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">OpenVPN nat配置笔录</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#192.168.10.0 为虚拟网卡地址</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -A POSTROUTING -s 172.31.33.214/20 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A INPUT -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -o tun0 -j ACCEPT </span></span>
<span class="line"><span style="color:#e1e4e8;">############################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# iptables -I FORWARD -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# iptables -I FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta ~]# iptables -L -n</span></span>
<span class="line"><span style="color:#e1e4e8;">Chain FORWARD (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED</span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">OpenVPN nat配置笔录</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#192.168.10.0 为虚拟网卡地址</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -A POSTROUTING -s 172.31.33.214/20 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">iptables -A INPUT -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -o tun0 -j ACCEPT </span></span>
<span class="line"><span style="color:#24292e;">############################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# iptables -I FORWARD -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# iptables -I FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">[root@beta ~]# iptables -L -n</span></span>
<span class="line"><span style="color:#24292e;">Chain FORWARD (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED</span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>到这里为止，openvpn搭建结束，不过这个时候链接vpn之后，本地网络是不能上网的 17.166.221.0/24 这个地址vpn server配置文件中定义</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[C:\\~]$ ping www.baidu.com</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">正在 Ping www.wshifen.com [103.235.46.39] 具有 32 字节的数据:</span></span>
<span class="line"><span style="color:#e1e4e8;">来自 103.235.46.39 的回复: 字节=32 时间=55ms TTL=56</span></span>
<span class="line"><span style="color:#e1e4e8;">来自 103.235.46.39 的回复: 字节=32 时间=134ms TTL=56</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">103.235.46.39 的 Ping 统计信息:</span></span>
<span class="line"><span style="color:#e1e4e8;">    数据包: 已发送 = 2，已接收 = 2，丢失 = 0 (0% 丢失)，</span></span>
<span class="line"><span style="color:#e1e4e8;">往返行程的估计时间(以毫秒为单位):</span></span>
<span class="line"><span style="color:#e1e4e8;">    最短 = 55ms，最长 = 134ms，平均 = 94ms</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;"> #如果还是不行，查看</span></span>
<span class="line"><span style="color:#e1e4e8;"> cat /etc/iptables/add-openvpn-rules.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -A POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A INPUT -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i eth0 -o tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A FORWARD -i tun0 -o eth0 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -A INPUT -i eth0 -p udp --dport 56619 -j ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -L -n -v</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_forward</span></span>
<span class="line"><span style="color:#e1e4e8;">netstat -tulpn | grep :1194</span></span>
<span class="line"><span style="color:#e1e4e8;">ps aux | grep openvpn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[C:\\~]$ ping www.baidu.com</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">正在 Ping www.wshifen.com [103.235.46.39] 具有 32 字节的数据:</span></span>
<span class="line"><span style="color:#24292e;">来自 103.235.46.39 的回复: 字节=32 时间=55ms TTL=56</span></span>
<span class="line"><span style="color:#24292e;">来自 103.235.46.39 的回复: 字节=32 时间=134ms TTL=56</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">103.235.46.39 的 Ping 统计信息:</span></span>
<span class="line"><span style="color:#24292e;">    数据包: 已发送 = 2，已接收 = 2，丢失 = 0 (0% 丢失)，</span></span>
<span class="line"><span style="color:#24292e;">往返行程的估计时间(以毫秒为单位):</span></span>
<span class="line"><span style="color:#24292e;">    最短 = 55ms，最长 = 134ms，平均 = 94ms</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;"> #如果还是不行，查看</span></span>
<span class="line"><span style="color:#24292e;"> cat /etc/iptables/add-openvpn-rules.sh</span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -A POSTROUTING -s 10.8.8.0/24 -o eth0 -j MASQUERADE</span></span>
<span class="line"><span style="color:#24292e;">iptables -A INPUT -i tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i eth0 -o tun0 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A FORWARD -i tun0 -o eth0 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;">iptables -A INPUT -i eth0 -p udp --dport 56619 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -L -n -v</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_forward</span></span>
<span class="line"><span style="color:#24292e;">netstat -tulpn | grep :1194</span></span>
<span class="line"><span style="color:#24292e;">ps aux | grep openvpn</span></span></code></pre></div><ul><li>iptables</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx ~]# iptables -L -n</span></span>
<span class="line"><span style="color:#e1e4e8;">Chain INPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:61379</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Chain FORWARD (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED</span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           </span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           </span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  10.8.0.0/24          0.0.0.0/0           </span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Chain OUTPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hkfengkongnginx ~]# iptables -L -n -t nat</span></span>
<span class="line"><span style="color:#e1e4e8;">Chain PREROUTING (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Chain INPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Chain OUTPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Chain POSTROUTING (policy ACCEPT)</span></span>
<span class="line"><span style="color:#e1e4e8;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#e1e4e8;">MASQUERADE  all  --  10.8.0.0/24          0.0.0.0/0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@hkfengkongnginx ~]# iptables -L -n</span></span>
<span class="line"><span style="color:#24292e;">Chain INPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:61379</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Chain FORWARD (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED</span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           </span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           </span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  10.8.0.0/24          0.0.0.0/0           </span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Chain OUTPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;">ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@hkfengkongnginx ~]# iptables -L -n -t nat</span></span>
<span class="line"><span style="color:#24292e;">Chain PREROUTING (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Chain INPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Chain OUTPUT (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Chain POSTROUTING (policy ACCEPT)</span></span>
<span class="line"><span style="color:#24292e;">target     prot opt source               destination         </span></span>
<span class="line"><span style="color:#24292e;">MASQUERADE  all  --  10.8.0.0/24          0.0.0.0/0</span></span></code></pre></div><h4 id="添加路由规则方式访问内部网络" tabindex="-1">添加路由规则方式访问内部网络 <a class="header-anchor" href="#添加路由规则方式访问内部网络" aria-label="Permalink to &quot;添加路由规则方式访问内部网络&quot;">​</a></h4><p>在内网主机web01上添加一条路由规则，让web01有回到OpenVPN客户端的路由。如果不添加，那web01只能接受到来自客户端的包，但是没法把响应的包传回去。</p><p>[root@web01 ~]<strong># route add -net 10.8.0.0/24 gw 172.16.1.61</strong></p><h4 id="添加防火墙方式访问内部网络" tabindex="-1">添加防火墙方式访问内部网络 <a class="header-anchor" href="#添加防火墙方式访问内部网络" aria-label="Permalink to &quot;添加防火墙方式访问内部网络&quot;">​</a></h4><p>在服务端开启防火墙，放行openvpn服务，并且开启<code>masquerade</code>。</p><p>优点：只需在OpenVPN服务端配置防火墙规则，内部网络主机无需配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl start firewalld</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-masquerade --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-service=openvpn --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl start firewalld</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-masquerade --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-service=openvpn --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span></code></pre></div>`,41),o=[p];function t(c,i,r,y,d,u){return a(),n("div",null,o)}const h=s(l,[["render",t]]);export{g as __pageData,h as default};
