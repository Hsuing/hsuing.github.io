import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"openvpn链接失败-crl证书吊销","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/10-ctr证书.md","filePath":"guide/Linux/vpn/10-ctr证书.md","lastUpdated":1701595065000}'),p={name:"guide/Linux/vpn/10-ctr证书.md"},l=a(`<h1 id="openvpn链接失败-crl证书吊销" tabindex="-1">openvpn链接失败-crl证书吊销 <a class="header-anchor" href="#openvpn链接失败-crl证书吊销" aria-label="Permalink to &quot;openvpn链接失败-crl证书吊销&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201033413.png" alt=""></p><p>请注意日志中问题点：VERIFY ERROR: depth=0, error=CRL has expired</p><ol><li><p>为客户端与服务器时间不一致，检查后发现时间一致，没有问题</p></li><li><p>随后怀疑可能是证书过期，检查CA、和Server证书后并没有过期</p></li><li><p>最后定位到 CRL证书过期问题</p></li></ol><p>关于CRL证书似乎已经过期;</p><p>，针对easyrsa配置文件easy-rsa/3/easyrsa，找到如下内容</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201034800.png" alt=""></p><p>EASYRSA_CRL_DAYS 过期导致VPN无法连接，随即修改</p><p>官方文档：<a href="https://community.openvpn.net/openvpn/wiki/CertificateRevocationListExpired" target="_blank" rel="noreferrer">https://community.openvpn.net/openvpn/wiki/CertificateRevocationListExpired</a></p><p>解决方法：</p><ul><li>查看证书时间</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@vpn server]# openssl x509 -noout -text -in server.crt </span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Data:</span></span>
<span class="line"><span style="color:#e1e4e8;">        Version: 3 (0x2)</span></span>
<span class="line"><span style="color:#e1e4e8;">        Serial Number:</span></span>
<span class="line"><span style="color:#e1e4e8;">            19:9d:6e:34:b3:94:7f:cd:5a:ed:d0:92:fd:a6:c1:33</span></span>
<span class="line"><span style="color:#e1e4e8;">    Signature Algorithm: sha256WithRSAEncryption</span></span>
<span class="line"><span style="color:#e1e4e8;">        Issuer: CN=ChangeMe</span></span>
<span class="line"><span style="color:#e1e4e8;">        Validity</span></span>
<span class="line"><span style="color:#e1e4e8;">            Not Before: May  4 10:28:50 2020 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">            Not After : May  2 10:28:50 2030 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意 ----- 》Not After</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@vpn server]# openssl x509 -noout -text -in server.crt </span></span>
<span class="line"><span style="color:#24292e;">Certificate:</span></span>
<span class="line"><span style="color:#24292e;">    Data:</span></span>
<span class="line"><span style="color:#24292e;">        Version: 3 (0x2)</span></span>
<span class="line"><span style="color:#24292e;">        Serial Number:</span></span>
<span class="line"><span style="color:#24292e;">            19:9d:6e:34:b3:94:7f:cd:5a:ed:d0:92:fd:a6:c1:33</span></span>
<span class="line"><span style="color:#24292e;">    Signature Algorithm: sha256WithRSAEncryption</span></span>
<span class="line"><span style="color:#24292e;">        Issuer: CN=ChangeMe</span></span>
<span class="line"><span style="color:#24292e;">        Validity</span></span>
<span class="line"><span style="color:#24292e;">            Not Before: May  4 10:28:50 2020 GMT</span></span>
<span class="line"><span style="color:#24292e;">            Not After : May  2 10:28:50 2030 GMT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意 ----- 》Not After</span></span></code></pre></div><p>​ 2种方法</p><p>​ 1) OpenVPN 2.4新证书撤销列表方法</p><p>​ 2) 注销掉vpn配置文件的crl证书选项</p><h2 id="法1" tabindex="-1">法1： <a class="header-anchor" href="#法1" aria-label="Permalink to &quot;法1：&quot;">​</a></h2><p>执行命令，重新生成CRL</p><p>cd /vpn的根目录</p><p>./easyrsa gen-crl #使用EasyRSA新的CRL可以生成</p><h2 id="法2" tabindex="-1">法2 ： <a class="header-anchor" href="#法2" aria-label="Permalink to &quot;法2 ：&quot;">​</a></h2><p># vim /etc/openvpn/server.conf #可以ps看到配置文件位置</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201034033.png" alt=""></p><p>重启openvpn服务</p>`,23),o=[l];function t(r,c,i,d,h,y){return n(),e("div",null,o)}const g=s(p,[["render",t]]);export{v as __pageData,g as default};
