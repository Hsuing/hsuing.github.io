import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const O=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/ssl证书/2-自定义ssl.md","filePath":"guide/Linux/web/nginx/ssl证书/2-自定义ssl.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/ssl证书/2-自定义ssl.md"},p=a(`<ul><li>自签名证书申请</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># create self-signed server certificate:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">read -p &quot;Enter your domain [www.example.com]: &quot; DOMAIN</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Create server key...&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl genrsa -des3 -out $DOMAIN.key 1024</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Create server certificate signing request...&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SUBJECT=&quot;/C=US/ST=Mars/L=iTranswarp/O=iTranswarp/OU=iTranswarp/CN=$DOMAIN&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl req -new -subj $SUBJECT -key $DOMAIN.key -out $DOMAIN.csr</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Remove password...&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mv $DOMAIN.key $DOMAIN.origin.key</span></span>
<span class="line"><span style="color:#e1e4e8;">openssl rsa -in $DOMAIN.origin.key -out $DOMAIN.key</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Sign SSL certificate...&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">openssl x509 -req -days 3650 -in $DOMAIN.csr -signkey $DOMAIN.key -out $DOMAIN.crt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;TODO:&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Copy $DOMAIN.crt to /root/ssl/$DOMAIN.crt&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Copy $DOMAIN.key to /root/ssl/$DOMAIN.key&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Add configuration in nginx:&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;server {&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;    ...&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;    listen 443 ssl;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;    ssl_certificate     /root/ssl/$DOMAIN.crt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;    ssl_certificate_key /root/ssl/$DOMAIN.key;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#www.test.com.crt：自签名的证书</span></span>
<span class="line"><span style="color:#e1e4e8;">#www.test.com.csr：证书的请求</span></span>
<span class="line"><span style="color:#e1e4e8;">#www.test.com.key：不带口令的Key</span></span>
<span class="line"><span style="color:#e1e4e8;">#www.test.com.origin.key：带口令的Key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># create self-signed server certificate:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">read -p &quot;Enter your domain [www.example.com]: &quot; DOMAIN</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Create server key...&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl genrsa -des3 -out $DOMAIN.key 1024</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Create server certificate signing request...&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SUBJECT=&quot;/C=US/ST=Mars/L=iTranswarp/O=iTranswarp/OU=iTranswarp/CN=$DOMAIN&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl req -new -subj $SUBJECT -key $DOMAIN.key -out $DOMAIN.csr</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Remove password...&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mv $DOMAIN.key $DOMAIN.origin.key</span></span>
<span class="line"><span style="color:#24292e;">openssl rsa -in $DOMAIN.origin.key -out $DOMAIN.key</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Sign SSL certificate...&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">openssl x509 -req -days 3650 -in $DOMAIN.csr -signkey $DOMAIN.key -out $DOMAIN.crt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;TODO:&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Copy $DOMAIN.crt to /root/ssl/$DOMAIN.crt&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Copy $DOMAIN.key to /root/ssl/$DOMAIN.key&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Add configuration in nginx:&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;server {&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;    ...&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;    listen 443 ssl;&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;    ssl_certificate     /root/ssl/$DOMAIN.crt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;    ssl_certificate_key /root/ssl/$DOMAIN.key;&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;}&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#www.test.com.crt：自签名的证书</span></span>
<span class="line"><span style="color:#24292e;">#www.test.com.csr：证书的请求</span></span>
<span class="line"><span style="color:#24292e;">#www.test.com.key：不带口令的Key</span></span>
<span class="line"><span style="color:#24292e;">#www.test.com.origin.key：带口令的Key</span></span></code></pre></div>`,2),o=[p];function c(t,r,i,y,u,q){return n(),e("div",null,o)}const h=s(l,[["render",c]]);export{O as __pageData,h as default};
