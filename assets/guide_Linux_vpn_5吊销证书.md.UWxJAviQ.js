import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/5吊销证书.md","filePath":"guide/Linux/vpn/5吊销证书.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/5吊销证书.md"},l=a(`<div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>吊销证书</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn ~]# cd /etc/openvpn/easy-rsa/</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn easy-rsa]# ./easyrsa revoke dalin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Please confirm you wish to revoke the certificate with the following subject:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">subject= </span></span>
<span class="line"><span style="color:#e1e4e8;">    commonName                = dalin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Type the word &#39;yes&#39; to continue, or any other input to abort.</span></span>
<span class="line"><span style="color:#e1e4e8;">  Continue with revocation: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">Using configuration from /etc/openvpn/easy-rsa/openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;">Revoking Certificate 06.</span></span>
<span class="line"><span style="color:#e1e4e8;">Data Base Updated</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">IMPORTANT!!!</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Revocation was successful. You must run gen-crl and upload a CRL to your</span></span>
<span class="line"><span style="color:#e1e4e8;">infrastructure in order to prevent the revoked cert from being accepted.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn easy-rsa]# ./easyrsa gen-crl</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#e1e4e8;">Using configuration from /etc/openvpn/easy-rsa/openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">An updated CRL has been created.</span></span>
<span class="line"><span style="color:#e1e4e8;">CRL file: /etc/openvpn/easy-rsa/pki/crl.pem</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn ~]# cd /etc/openvpn/easy-rsa/</span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn easy-rsa]# ./easyrsa revoke dalin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Please confirm you wish to revoke the certificate with the following subject:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">subject= </span></span>
<span class="line"><span style="color:#24292e;">    commonName                = dalin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Type the word &#39;yes&#39; to continue, or any other input to abort.</span></span>
<span class="line"><span style="color:#24292e;">  Continue with revocation: yes</span></span>
<span class="line"><span style="color:#24292e;">Using configuration from /etc/openvpn/easy-rsa/openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#24292e;">Revoking Certificate 06.</span></span>
<span class="line"><span style="color:#24292e;">Data Base Updated</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">IMPORTANT!!!</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Revocation was successful. You must run gen-crl and upload a CRL to your</span></span>
<span class="line"><span style="color:#24292e;">infrastructure in order to prevent the revoked cert from being accepted.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn easy-rsa]# ./easyrsa gen-crl</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Note: using Easy-RSA configuration from: ./vars</span></span>
<span class="line"><span style="color:#24292e;">Using configuration from /etc/openvpn/easy-rsa/openssl-1.0.cnf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">An updated CRL has been created.</span></span>
<span class="line"><span style="color:#24292e;">CRL file: /etc/openvpn/easy-rsa/pki/crl.pem</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>执行上述命令后用户证书不会被删除，只是更新了 crl.pem 文件，可以看到上面的提示，文件位置在 /etc/openvpn/easy-rsa/pki/crl.pem</p></div><hr><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn easy-rsa]# find /etc/openvpn/ -type f -name &quot;index.txt&quot; | xargs cat</span></span>
<span class="line"><span style="color:#e1e4e8;">V    280825082643Z        01    unknown    /CN=server</span></span>
<span class="line"><span style="color:#e1e4e8;">R    280826061455Z    181211135800Z    03    unknown    /CN=dalin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">V 为可用</span></span>
<span class="line"><span style="color:#e1e4e8;">R 为注销</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn easy-rsa]# find /etc/openvpn/ -type f -name &quot;index.txt&quot; | xargs cat</span></span>
<span class="line"><span style="color:#24292e;">V    280825082643Z        01    unknown    /CN=server</span></span>
<span class="line"><span style="color:#24292e;">R    280826061455Z    181211135800Z    03    unknown    /CN=dalin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">V 为可用</span></span>
<span class="line"><span style="color:#24292e;">R 为注销</span></span></code></pre></div><ul><li>改配置文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn easy-rsa]# vim /etc/openvpn/server.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">crl-verify /etc/openvpn/easy-rsa/pki/crl.pem</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#重启服务</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#删除有关用户的文件</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn openvpn]# find . -type f -name &quot;dalin.*&quot; | xargs rm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn easy-rsa]# vim /etc/openvpn/server.conf</span></span>
<span class="line"><span style="color:#24292e;">crl-verify /etc/openvpn/easy-rsa/pki/crl.pem</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#重启服务</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#删除有关用户的文件</span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn openvpn]# find . -type f -name &quot;dalin.*&quot; | xargs rm</span></span></code></pre></div>`,7),o=[l];function c(t,r,i,y,d,u){return n(),e("div",null,o)}const f=s(p,[["render",c]]);export{g as __pageData,f as default};
