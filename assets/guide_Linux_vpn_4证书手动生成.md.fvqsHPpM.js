import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/4证书手动生成.md","filePath":"guide/Linux/vpn/4证书手动生成.md","lastUpdated":1701595065000}'),l={name:"guide/Linux/vpn/4证书手动生成.md"},p=n(`<p>#一、安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# yum -y install openvpn easy-rsa</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# yum -y install openvpn easy-rsa</span></span></code></pre></div><ul><li>配置 easy-rsa-3.0</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#复制文件</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# cp -r /usr/share/easy-rsa/ /etc/openvpn/easy-rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# cd /etc/openvpn/easy-rsa/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost easy-rsa]# \\rm 3 3.0</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost easy-rsa]# cd 3.0.3/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# find / -type f -name &quot;vars.example&quot; | xargs -i cp {} . &amp;&amp; mv vars.example vars</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#复制文件</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# cp -r /usr/share/easy-rsa/ /etc/openvpn/easy-rsa</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# cd /etc/openvpn/easy-rsa/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost easy-rsa]# \\rm 3 3.0</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost easy-rsa]# cd 3.0.3/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# find / -type f -name &quot;vars.example&quot; | xargs -i cp {} . &amp;&amp; mv vars.example vars</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>正常来说 easy-rsa-3.0.3 安装完之后，vars.example 文件在 /usr/share/doc/easy-rsa-3.0.3/ 目录</p></div><hr><p>#二、创建一个新的 PKI 和 CA</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/openvpn/easy-rsa/3.0.3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建空的pki</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa init-pki  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">init-pki complete; you may now create a CA or requests.</span></span>
<span class="line"><span style="color:#e1e4e8;">Your newly created PKI dir is: /etc/openvpn/easy-rsa/3.0.3/pki</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建新的CA，不使用密码</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa build-ca nopass </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#e1e4e8;">......................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">................................................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">writing new private key to &#39;/etc/openvpn/easy-rsa/3.0.3/pki/private/ca.key.pClvaQ1GLD&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#e1e4e8;">into your certificate request.</span></span>
<span class="line"><span style="color:#e1e4e8;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#e1e4e8;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#e1e4e8;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#e1e4e8;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Common Name (eg: your user, host, or server name) [Easy-RSA CA]: 回车</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CA creation complete and you may now import and sign cert requests.</span></span>
<span class="line"><span style="color:#e1e4e8;">Your new CA certificate file for publishing is at:</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/openvpn/easy-rsa/3.0.3/pki/ca.crt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/etc/openvpn/easy-rsa/3.0.3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建空的pki</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa init-pki  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">init-pki complete; you may now create a CA or requests.</span></span>
<span class="line"><span style="color:#24292e;">Your newly created PKI dir is: /etc/openvpn/easy-rsa/3.0.3/pki</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建新的CA，不使用密码</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa build-ca nopass </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#24292e;">......................+++</span></span>
<span class="line"><span style="color:#24292e;">................................................+++</span></span>
<span class="line"><span style="color:#24292e;">writing new private key to &#39;/etc/openvpn/easy-rsa/3.0.3/pki/private/ca.key.pClvaQ1GLD&#39;</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#24292e;">into your certificate request.</span></span>
<span class="line"><span style="color:#24292e;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#24292e;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#24292e;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#24292e;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">Common Name (eg: your user, host, or server name) [Easy-RSA CA]: 回车</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CA creation complete and you may now import and sign cert requests.</span></span>
<span class="line"><span style="color:#24292e;">Your new CA certificate file for publishing is at:</span></span>
<span class="line"><span style="color:#24292e;">/etc/openvpn/easy-rsa/3.0.3/pki/ca.crt</span></span></code></pre></div><ul><li>创建服务端证书</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa gen-req server nopass</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#e1e4e8;">...........................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">..............................................................................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">writing new private key to &#39;/etc/openvpn/easy-rsa/3.0.3/pki/private/server.key.wy7Q0fuG6A&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#e1e4e8;">into your certificate request.</span></span>
<span class="line"><span style="color:#e1e4e8;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#e1e4e8;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#e1e4e8;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#e1e4e8;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Common Name (eg: your user, host, or server name) [server]: 回车</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Keypair and certificate request completed. Your files are:</span></span>
<span class="line"><span style="color:#e1e4e8;">req: /etc/openvpn/easy-rsa/3.0.3/pki/reqs/server.req</span></span>
<span class="line"><span style="color:#e1e4e8;">key: /etc/openvpn/easy-rsa/3.0.3/pki/private/server.key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa gen-req server nopass</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#24292e;">...........................+++</span></span>
<span class="line"><span style="color:#24292e;">..............................................................................+++</span></span>
<span class="line"><span style="color:#24292e;">writing new private key to &#39;/etc/openvpn/easy-rsa/3.0.3/pki/private/server.key.wy7Q0fuG6A&#39;</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#24292e;">into your certificate request.</span></span>
<span class="line"><span style="color:#24292e;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#24292e;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#24292e;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#24292e;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">Common Name (eg: your user, host, or server name) [server]: 回车</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Keypair and certificate request completed. Your files are:</span></span>
<span class="line"><span style="color:#24292e;">req: /etc/openvpn/easy-rsa/3.0.3/pki/reqs/server.req</span></span>
<span class="line"><span style="color:#24292e;">key: /etc/openvpn/easy-rsa/3.0.3/pki/private/server.key</span></span></code></pre></div><ul><li>签约服务端证书</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa sign server server</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">You are about to sign the following certificate.</span></span>
<span class="line"><span style="color:#e1e4e8;">Please check over the details shown below for accuracy. Note that this request</span></span>
<span class="line"><span style="color:#e1e4e8;">has not been cryptographically verified. Please be sure it came from a trusted</span></span>
<span class="line"><span style="color:#e1e4e8;">source or that you have verified the request checksum with the sender.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Request subject, to be signed as a server certificate for 3650 days:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">subject=</span></span>
<span class="line"><span style="color:#e1e4e8;">    commonName                = server</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Type the word &#39;yes&#39; to continue, or any other input to abort.</span></span>
<span class="line"><span style="color:#e1e4e8;">  Confirm request details: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">Using configuration from ./openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#e1e4e8;">Signature ok</span></span>
<span class="line"><span style="color:#e1e4e8;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#e1e4e8;">commonName            :ASN.1 12:&#39;server&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate is to be certified until Apr  7 14:54:08 2028 GMT (3650 days)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#e1e4e8;">Data Base Updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate created at: /etc/openvpn/easy-rsa/3.0.3/pki/issued/server.crt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa sign server server</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">You are about to sign the following certificate.</span></span>
<span class="line"><span style="color:#24292e;">Please check over the details shown below for accuracy. Note that this request</span></span>
<span class="line"><span style="color:#24292e;">has not been cryptographically verified. Please be sure it came from a trusted</span></span>
<span class="line"><span style="color:#24292e;">source or that you have verified the request checksum with the sender.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Request subject, to be signed as a server certificate for 3650 days:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">subject=</span></span>
<span class="line"><span style="color:#24292e;">    commonName                = server</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Type the word &#39;yes&#39; to continue, or any other input to abort.</span></span>
<span class="line"><span style="color:#24292e;">  Confirm request details: yes</span></span>
<span class="line"><span style="color:#24292e;">Using configuration from ./openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#24292e;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#24292e;">Signature ok</span></span>
<span class="line"><span style="color:#24292e;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#24292e;">commonName            :ASN.1 12:&#39;server&#39;</span></span>
<span class="line"><span style="color:#24292e;">Certificate is to be certified until Apr  7 14:54:08 2028 GMT (3650 days)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#24292e;">Data Base Updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Certificate created at: /etc/openvpn/easy-rsa/3.0.3/pki/issued/server.crt</span></span></code></pre></div><ul><li>创建 Diffie-Hellman</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa gen-dh</span></span>
<span class="line"><span style="color:#e1e4e8;">............................................................</span></span>
<span class="line"><span style="color:#e1e4e8;">DH parameters of size 2048 created at /etc/openvpn/easy-rsa/3.0.3/pki/dh.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa gen-dh</span></span>
<span class="line"><span style="color:#24292e;">............................................................</span></span>
<span class="line"><span style="color:#24292e;">DH parameters of size 2048 created at /etc/openvpn/easy-rsa/3.0.3/pki/dh.pem</span></span></code></pre></div><blockquote><p>[!TIP] 到这里服务端的证书就创建完</p></blockquote><hr><p>#三、创建客户端证书</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#复制文件</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# cp -r /usr/share/easy-rsa/ /etc/openvpn/client/easy-rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# cd /etc/openvpn/client/easy-rsa/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost easy-rsa]# \\rm 3 3.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost easy-rsa]# cd 3.0.3/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# find / -type f -name &quot;vars.example&quot; | xargs -i cp {} . &amp;&amp; mv vars.example vars</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#复制文件</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# cp -r /usr/share/easy-rsa/ /etc/openvpn/client/easy-rsa</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# cd /etc/openvpn/client/easy-rsa/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost easy-rsa]# \\rm 3 3.0 </span></span>
<span class="line"><span style="color:#24292e;">[root@localhost easy-rsa]# cd 3.0.3/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# find / -type f -name &quot;vars.example&quot; | xargs -i cp {} . &amp;&amp; mv vars.example vars</span></span></code></pre></div><ul><li>生成证书</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/openvpn/client/easy-rsa/3.0.3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建新的pki</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa init-pki </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">init-pki complete; you may now create a CA or requests.</span></span>
<span class="line"><span style="color:#e1e4e8;">Your newly created PKI dir is: /etc/openvpn/client/easy-rsa/3.0.3/pki</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#客户证书名为大林，木有密码</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa gen-req dalin nopass  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#e1e4e8;">....................................................+++</span></span>
<span class="line"><span style="color:#e1e4e8;">............+++</span></span>
<span class="line"><span style="color:#e1e4e8;">writing new private key to &#39;/etc/openvpn/client/easy-rsa/3.0.3/pki/private/dalin.key.FkrLzXH9Bm&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#e1e4e8;">into your certificate request.</span></span>
<span class="line"><span style="color:#e1e4e8;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#e1e4e8;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#e1e4e8;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#e1e4e8;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#e1e4e8;">-----</span></span>
<span class="line"><span style="color:#e1e4e8;">Common Name (eg: your user, host, or server name) [dalin]: 回车</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Keypair and certificate request completed. Your files are:</span></span>
<span class="line"><span style="color:#e1e4e8;">req: /etc/openvpn/client/easy-rsa/3.0.3/pki/reqs/dalin.req</span></span>
<span class="line"><span style="color:#e1e4e8;">key: /etc/openvpn/client/easy-rsa/3.0.3/pki/private/dalin.key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/etc/openvpn/client/easy-rsa/3.0.3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建新的pki</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa init-pki </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">init-pki complete; you may now create a CA or requests.</span></span>
<span class="line"><span style="color:#24292e;">Your newly created PKI dir is: /etc/openvpn/client/easy-rsa/3.0.3/pki</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#客户证书名为大林，木有密码</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa gen-req dalin nopass  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;">Generating a 2048 bit RSA private key</span></span>
<span class="line"><span style="color:#24292e;">....................................................+++</span></span>
<span class="line"><span style="color:#24292e;">............+++</span></span>
<span class="line"><span style="color:#24292e;">writing new private key to &#39;/etc/openvpn/client/easy-rsa/3.0.3/pki/private/dalin.key.FkrLzXH9Bm&#39;</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">You are about to be asked to enter information that will be incorporated</span></span>
<span class="line"><span style="color:#24292e;">into your certificate request.</span></span>
<span class="line"><span style="color:#24292e;">What you are about to enter is what is called a Distinguished Name or a DN.</span></span>
<span class="line"><span style="color:#24292e;">There are quite a few fields but you can leave some blank</span></span>
<span class="line"><span style="color:#24292e;">For some fields there will be a default value,</span></span>
<span class="line"><span style="color:#24292e;">If you enter &#39;.&#39;, the field will be left blank.</span></span>
<span class="line"><span style="color:#24292e;">-----</span></span>
<span class="line"><span style="color:#24292e;">Common Name (eg: your user, host, or server name) [dalin]: 回车</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Keypair and certificate request completed. Your files are:</span></span>
<span class="line"><span style="color:#24292e;">req: /etc/openvpn/client/easy-rsa/3.0.3/pki/reqs/dalin.req</span></span>
<span class="line"><span style="color:#24292e;">key: /etc/openvpn/client/easy-rsa/3.0.3/pki/private/dalin.key</span></span></code></pre></div><ul><li>最后签约客户端证书</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# cd /etc/openvpn/easy-rsa/3.0.3/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/openvpn/easy-rsa/3.0.3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#dalin 为client name</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa import-req /etc/openvpn/client/easy-rsa/3.0.3/pki/reqs/dalin.req dalin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">The request has been successfully imported with a short name of: dalin</span></span>
<span class="line"><span style="color:#e1e4e8;">You may now use this name to perform signing operations on this request.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost 3.0.3]# ./easyrsa sign client dalin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">You are about to sign the following certificate.</span></span>
<span class="line"><span style="color:#e1e4e8;">Please check over the details shown below for accuracy. Note that this request</span></span>
<span class="line"><span style="color:#e1e4e8;">has not been cryptographically verified. Please be sure it came from a trusted</span></span>
<span class="line"><span style="color:#e1e4e8;">source or that you have verified the request checksum with the sender.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Request subject, to be signed as a client certificate for 3650 days:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">subject=</span></span>
<span class="line"><span style="color:#e1e4e8;">    commonName                = dalin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Type the word &#39;yes&#39; to continue, or any other input to abort.</span></span>
<span class="line"><span style="color:#e1e4e8;">  Confirm request details: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">Using configuration from ./openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#e1e4e8;">Signature ok</span></span>
<span class="line"><span style="color:#e1e4e8;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#e1e4e8;">commonName            :ASN.1 12:&#39;dalin&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate is to be certified until Apr  8 01:54:57 2028 GMT (3650 days)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#e1e4e8;">Data Base Updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate created at: /etc/openvpn/easy-rsa/3.0.3/pki/issued/dalin.crt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# cd /etc/openvpn/easy-rsa/3.0.3/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/etc/openvpn/easy-rsa/3.0.3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#dalin 为client name</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa import-req /etc/openvpn/client/easy-rsa/3.0.3/pki/reqs/dalin.req dalin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">The request has been successfully imported with a short name of: dalin</span></span>
<span class="line"><span style="color:#24292e;">You may now use this name to perform signing operations on this request.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@localhost 3.0.3]# ./easyrsa sign client dalin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">You are about to sign the following certificate.</span></span>
<span class="line"><span style="color:#24292e;">Please check over the details shown below for accuracy. Note that this request</span></span>
<span class="line"><span style="color:#24292e;">has not been cryptographically verified. Please be sure it came from a trusted</span></span>
<span class="line"><span style="color:#24292e;">source or that you have verified the request checksum with the sender.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Request subject, to be signed as a client certificate for 3650 days:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">subject=</span></span>
<span class="line"><span style="color:#24292e;">    commonName                = dalin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Type the word &#39;yes&#39; to continue, or any other input to abort.</span></span>
<span class="line"><span style="color:#24292e;">  Confirm request details: yes</span></span>
<span class="line"><span style="color:#24292e;">Using configuration from ./openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#24292e;">Check that the request matches the signature</span></span>
<span class="line"><span style="color:#24292e;">Signature ok</span></span>
<span class="line"><span style="color:#24292e;">The Subject&#39;s Distinguished Name is as follows</span></span>
<span class="line"><span style="color:#24292e;">commonName            :ASN.1 12:&#39;dalin&#39;</span></span>
<span class="line"><span style="color:#24292e;">Certificate is to be certified until Apr  8 01:54:57 2028 GMT (3650 days)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Write out database with 1 new entries</span></span>
<span class="line"><span style="color:#24292e;">Data Base Updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Certificate created at: /etc/openvpn/easy-rsa/3.0.3/pki/issued/dalin.crt</span></span></code></pre></div><blockquote><p>[!TIP] 到这里用户证书创建完</p></blockquote><hr><p>#四、整理证书</p><ul><li>服务端</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# mkdir /etc/openvpn/certs</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# cd /etc/openvpn/certs/  </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/dh.pem .        </span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/ca.crt .</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/issued/server.crt .</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/private/server.key .</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# ll</span></span>
<span class="line"><span style="color:#e1e4e8;">总用量 20</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root 1172 4月  11 10:02 ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root  424 4月  11 10:03 dh.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root 4547 4月  11 10:03 server.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root 1704 4月  11 10:02 server.key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# mkdir /etc/openvpn/certs</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# cd /etc/openvpn/certs/  </span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/dh.pem .        </span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/ca.crt .</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/issued/server.crt .</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/private/server.key .</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# ll</span></span>
<span class="line"><span style="color:#24292e;">总用量 20</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root 1172 4月  11 10:02 ca.crt</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root  424 4月  11 10:03 dh.pem</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root 4547 4月  11 10:03 server.crt</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root 1704 4月  11 10:02 server.key</span></span></code></pre></div><ul><li>client端</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# mkdir /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/ca.crt /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/issued/dalin.crt /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# cp /etc/openvpn/client/easy-rsa/3.0.3/pki/private/dalin.key /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost certs]# ll /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#e1e4e8;">总用量 16</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root 1172 4月  11 10:07 ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root 4431 4月  11 10:08 dalin.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-------. 1 root root 1704 4月  11 10:08 dalin.key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost certs]# mkdir /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/ca.crt /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# cp /etc/openvpn/easy-rsa/3.0.3/pki/issued/dalin.crt /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# cp /etc/openvpn/client/easy-rsa/3.0.3/pki/private/dalin.key /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost certs]# ll /etc/openvpn/client/dalin/</span></span>
<span class="line"><span style="color:#24292e;">总用量 16</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root 1172 4月  11 10:07 ca.crt</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root 4431 4月  11 10:08 dalin.crt</span></span>
<span class="line"><span style="color:#24292e;">-rw-------. 1 root root 1704 4月  11 10:08 dalin.key</span></span></code></pre></div><blockquote><p>[!NOTE] 添加用户在./easyrsa gen-req 这里开始就行</p></blockquote><hr><blockquote><p>[!WARNING] 签名也可以安下面的方式整体走</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cp -rf /usr/share/easy-rsa/3.0.3 /etc/openvpn/server/easy-rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /etc/openvpn/server/easy-rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">./easyrsa init-pki</span></span>
<span class="line"><span style="color:#e1e4e8;">./easyrsa build-ca nopass</span></span>
<span class="line"><span style="color:#e1e4e8;">./easyrsa build-server-full server nopass</span></span>
<span class="line"><span style="color:#e1e4e8;">./easyrsa build-client-full client1 nopass</span></span>
<span class="line"><span style="color:#e1e4e8;">./easyrsa gen-dh</span></span>
<span class="line"><span style="color:#e1e4e8;">openvpn --genkey --secret ta.key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cp -rf /usr/share/easy-rsa/3.0.3 /etc/openvpn/server/easy-rsa</span></span>
<span class="line"><span style="color:#24292e;">cd /etc/openvpn/server/easy-rsa</span></span>
<span class="line"><span style="color:#24292e;">./easyrsa init-pki</span></span>
<span class="line"><span style="color:#24292e;">./easyrsa build-ca nopass</span></span>
<span class="line"><span style="color:#24292e;">./easyrsa build-server-full server nopass</span></span>
<span class="line"><span style="color:#24292e;">./easyrsa build-client-full client1 nopass</span></span>
<span class="line"><span style="color:#24292e;">./easyrsa gen-dh</span></span>
<span class="line"><span style="color:#24292e;">openvpn --genkey --secret ta.key</span></span></code></pre></div>`,33),o=[p];function t(c,r,i,y,d,u){return e(),a("div",null,o)}const m=s(l,[["render",t]]);export{v as __pageData,m as default};
