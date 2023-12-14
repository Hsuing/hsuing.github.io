import{_ as s,o as n,c as a,R as e}from"./chunks/framework.byfcZK4E.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/ssl证书/4-1.3ssl.md","filePath":"guide/Linux/web/nginx/ssl证书/4-1.3ssl.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/ssl证书/4-1.3ssl.md"},p=e(`<p>Nginx 配置文件 server 段添加 ssl_protocols TLSv1.3;</p><p>TLSv1.3 现行 cipher 只有以下三种：</p><p>TLS-AES-128-GCM-SHA256 TLS-AES-256-GCM-SHA384 TLS-CHACHA20-POLY1305-SHA256</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">   ssl_protocols TLSv1.2;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_ciphers   &#39;ECDHE-RSA-AES128-GCM-SHA256 ECDHE-RSA-CHACHA20-POLY1305 ECDHE-RSA-AES256-GCM-SHA384&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 443 ssl http2;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_name 192.168.122.217 hx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_certificate     /data/apps/nginx/ssl/hx.com.crt; </span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_certificate_key  /data/apps/nginx/ssl/hx.com.key; </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">        keepalive_timeout    75s;</span></span>
<span class="line"><span style="color:#e1e4e8;">        keepalive_requests   100;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  ssl_protocols   TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ssl_ciphers    &#39;TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+ECDSA+AES128:EECDH+aRSA+AES128:RSA+AES128:EECDH+ECDSA+AES256:EECDH+aRSA+AES256:RSA+AES256:EECDH+ECDSA+3DES:EECDH+aRSA+3DES:RSA+3DES:!MD5&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_early_data  on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">		chunked_transfer_encoding on;</span></span>
<span class="line"><span style="color:#e1e4e8;">		root html;</span></span>
<span class="line"><span style="color:#e1e4e8;">		index index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">   ssl_protocols TLSv1.2;</span></span>
<span class="line"><span style="color:#24292e;">ssl_ciphers   &#39;ECDHE-RSA-AES128-GCM-SHA256 ECDHE-RSA-CHACHA20-POLY1305 ECDHE-RSA-AES256-GCM-SHA384&#39;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 80;</span></span>
<span class="line"><span style="color:#24292e;">	listen 443 ssl http2;</span></span>
<span class="line"><span style="color:#24292e;">	server_name 192.168.122.217 hx.com;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_certificate     /data/apps/nginx/ssl/hx.com.crt; </span></span>
<span class="line"><span style="color:#24292e;">        ssl_certificate_key  /data/apps/nginx/ssl/hx.com.key; </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_session_timeout  5m;</span></span>
<span class="line"><span style="color:#24292e;">        keepalive_timeout    75s;</span></span>
<span class="line"><span style="color:#24292e;">        keepalive_requests   100;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  ssl_protocols   TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">  ssl_ciphers    &#39;TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+ECDSA+AES128:EECDH+aRSA+AES128:RSA+AES128:EECDH+ECDSA+AES256:EECDH+aRSA+AES256:RSA+AES256:EECDH+ECDSA+3DES:EECDH+aRSA+3DES:RSA+3DES:!MD5&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ssl_early_data  on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	location / {</span></span>
<span class="line"><span style="color:#24292e;">		chunked_transfer_encoding on;</span></span>
<span class="line"><span style="color:#24292e;">		root html;</span></span>
<span class="line"><span style="color:#24292e;">		index index.html;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>tengine2.3 配置</p><p>ssl_early_data on;</p><ul><li>生成ssl配置文件</li></ul><p><a href="https://ssl-config.mozilla.org" target="_blank" rel="noreferrer">https://ssl-config.mozilla.org</a></p><h2 id="_1-1证书转换" tabindex="-1">1.1证书转换 <a class="header-anchor" href="#_1-1证书转换" aria-label="Permalink to &quot;1.1证书转换&quot;">​</a></h2><h3 id="crt的ssl证书文件转换成-pem格式" tabindex="-1">.crt的ssl证书文件转换成.pem格式 <a class="header-anchor" href="#crt的ssl证书文件转换成-pem格式" aria-label="Permalink to &quot;.crt的ssl证书文件转换成.pem格式&quot;">​</a></h3><p>openssl x509 -in www.xx.com.crt -out www.xx.com.pem</p><p>openssl rsa -in ulqkmns.cn.key -out ulqkmns.cn.key.pem</p>`,12),o=[p];function c(t,r,i,S,A,E){return n(),a("div",null,o)}const C=s(l,[["render",c]]);export{_ as __pageData,C as default};
