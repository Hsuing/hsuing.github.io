import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"1. nginx下 499错误的解决办法","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/faq/FAQ.md","filePath":"guide/Linux/web/faq/FAQ.md","lastUpdated":1747663360000}'),l={name:"guide/Linux/web/faq/FAQ.md"},p=e(`<ul><li>nginx部署ssl证书出现[emerg] PEM_read_bio_X509_AUX failed的解决办法</li></ul><p>nginx -t</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">nginx: [emerg] PEM_read_bio_X509_AUX(&quot;xxxxxxxx.pem&quot;) failed (SSL: error:0906D066:PEM routines:PEM_read_bio:bad end line)</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx: configuration file nginx.conf test failed</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">nginx: [emerg] PEM_read_bio_X509_AUX(&quot;xxxxxxxx.pem&quot;) failed (SSL: error:0906D066:PEM routines:PEM_read_bio:bad end line)</span></span>
<span class="line"><span style="color:#24292e;">nginx: configuration file nginx.conf test failed</span></span></code></pre></div><blockquote><p>原因,发现是证书在合并的过程中有问题,结束和开始没有换行</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">dwDuS723dc5guuFCaR+r4Z5mow9+X7By2IMAxHuJeqj9ywAAAVhwAyL3AAAEAwBI</span></span>
<span class="line"><span style="color:#e1e4e8;">MEYCIQDOmzx8eUDWCN0HukZuuyNsWtTkj9cXwvXHt7b2VhSH+wIhAMicRFn3HJIp</span></span>
<span class="line"><span style="color:#e1e4e8;">wbXgQhoHGLawTWEIkdT0oTuiax34Bs4lMA0GCSqGSIb3DQEBCwUAA4IBAQALfiaS</span></span>
<span class="line"><span style="color:#e1e4e8;">7kKLP6N+fCS3bOBbjg/GCRUpt23q0wCMvcU3FxdDmpMMpi3/suvo9DYhLCNJOJt5</span></span>
<span class="line"><span style="color:#e1e4e8;">GJgc9PnuTYAuSeWCYj20C8SocTCG/oMASWND+KzvuLflFxlvbNLM7vAqAjuOFoVE</span></span>
<span class="line"><span style="color:#e1e4e8;">YQ58D0rusrf4vBODx67bGmJwPa4SBkzbJAp2v84sdlUFplqdFWbFHt9gk6FqlcHh</span></span>
<span class="line"><span style="color:#e1e4e8;">6Vlk7b8erutUo/+isEPYJz5lkadCRMrcefq/l2gUIJfbw/dyCNzSZCmRSCMAuTEy</span></span>
<span class="line"><span style="color:#e1e4e8;">P02KWpP2sxhKtKn89P41V3JaicZiWPB0pEmhZ3SuIV+OGUjD4OVdHl25c3a7/uqt</span></span>
<span class="line"><span style="color:#e1e4e8;">AyQzqLTZDYmqhoYG</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE----------BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">MIIFYjCCBEqgAwIBAgIQTEzYoPxP6q4VVKh/CQ7ahzANBgkqhkiG9w0BAQsFADCB</span></span>
<span class="line"><span style="color:#e1e4e8;">yjELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQL</span></span>
<span class="line"><span style="color:#e1e4e8;">ExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTowOAYDVQQLEzEoYykgMjAwNiBWZXJp</span></span>
<span class="line"><span style="color:#e1e4e8;">U2lnbiwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MUUwQwYDVQQDEzxW</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">dwDuS723dc5guuFCaR+r4Z5mow9+X7By2IMAxHuJeqj9ywAAAVhwAyL3AAAEAwBI</span></span>
<span class="line"><span style="color:#24292e;">MEYCIQDOmzx8eUDWCN0HukZuuyNsWtTkj9cXwvXHt7b2VhSH+wIhAMicRFn3HJIp</span></span>
<span class="line"><span style="color:#24292e;">wbXgQhoHGLawTWEIkdT0oTuiax34Bs4lMA0GCSqGSIb3DQEBCwUAA4IBAQALfiaS</span></span>
<span class="line"><span style="color:#24292e;">7kKLP6N+fCS3bOBbjg/GCRUpt23q0wCMvcU3FxdDmpMMpi3/suvo9DYhLCNJOJt5</span></span>
<span class="line"><span style="color:#24292e;">GJgc9PnuTYAuSeWCYj20C8SocTCG/oMASWND+KzvuLflFxlvbNLM7vAqAjuOFoVE</span></span>
<span class="line"><span style="color:#24292e;">YQ58D0rusrf4vBODx67bGmJwPa4SBkzbJAp2v84sdlUFplqdFWbFHt9gk6FqlcHh</span></span>
<span class="line"><span style="color:#24292e;">6Vlk7b8erutUo/+isEPYJz5lkadCRMrcefq/l2gUIJfbw/dyCNzSZCmRSCMAuTEy</span></span>
<span class="line"><span style="color:#24292e;">P02KWpP2sxhKtKn89P41V3JaicZiWPB0pEmhZ3SuIV+OGUjD4OVdHl25c3a7/uqt</span></span>
<span class="line"><span style="color:#24292e;">AyQzqLTZDYmqhoYG</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE----------BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">MIIFYjCCBEqgAwIBAgIQTEzYoPxP6q4VVKh/CQ7ahzANBgkqhkiG9w0BAQsFADCB</span></span>
<span class="line"><span style="color:#24292e;">yjELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQL</span></span>
<span class="line"><span style="color:#24292e;">ExZWZXJpU2lnbiBUcnVzdCBOZXR3b3JrMTowOAYDVQQLEzEoYykgMjAwNiBWZXJp</span></span>
<span class="line"><span style="color:#24292e;">U2lnbiwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MUUwQwYDVQQDEzxW</span></span></code></pre></div><h1 id="_1-nginx下-499错误的解决办法" tabindex="-1">1. nginx下 499错误的解决办法 <a class="header-anchor" href="#_1-nginx下-499错误的解决办法" aria-label="Permalink to &quot;1. nginx下 499错误的解决办法&quot;">​</a></h1><p>499错误是什么？让我们看看NGINX的源码中的定义</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_495_page), /* 495, https certificate error */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_496_page), /* 496, https no certificate */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_497_page), /* 497, http to https */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_404_page), /* 498, canceled */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_null_string, /* 499, client has closed connection */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_495_page), /* 495, https certificate error */</span></span>
<span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_496_page), /* 496, https no certificate */</span></span>
<span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_497_page), /* 497, http to https */</span></span>
<span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_404_page), /* 498, canceled */</span></span>
<span class="line"><span style="color:#24292e;">ngx_null_string, /* 499, client has closed connection */</span></span></code></pre></div><h1 id="_2-tls版本配置" tabindex="-1">2. tls版本配置 <a class="header-anchor" href="#_2-tls版本配置" aria-label="Permalink to &quot;2. tls版本配置&quot;">​</a></h1><p>ssl配置参考<a href="https://ssl-config.mozilla.org/#server=nginx&amp;version=1.17.7&amp;config=intermediate&amp;openssl=1.1.1k&amp;hsts=false&amp;ocsp=false&amp;guideline=5.7" target="_blank" rel="noreferrer"> SSL Configuration Generator</a></p><h2 id="_2-1-示例" tabindex="-1">2.1 示例 <a class="header-anchor" href="#_2-1-示例" aria-label="Permalink to &quot;2.1 示例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@test-1 conf.d]# pwd</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/local/openresty/nginx/conf/conf.d</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@test-1 conf.d]# ls</span></span>
<span class="line"><span style="color:#e1e4e8;">a.ffu.com.conf  b.ffu.com.conf  c.ffu.com.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@test-1 conf.d]# cat a.ffu.com.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  a.ffu.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_certificate             ssl/server.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_certificate_key         ssl/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_session_timeout         5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">	      ssl_protocols               TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_prefer_server_ciphers   on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">           root html;</span></span>
<span class="line"><span style="color:#e1e4e8;">           index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@test-1 conf.d]# cat b.ffu.com.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  b.ffu.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_certificate             ssl/server.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_certificate_key         ssl/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_session_timeout         5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_protocols               TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_prefer_server_ciphers   on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">           root html;</span></span>
<span class="line"><span style="color:#e1e4e8;">           index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@test-1 conf.d]# pwd</span></span>
<span class="line"><span style="color:#24292e;">/usr/local/openresty/nginx/conf/conf.d</span></span>
<span class="line"><span style="color:#24292e;">[root@test-1 conf.d]# ls</span></span>
<span class="line"><span style="color:#24292e;">a.ffu.com.conf  b.ffu.com.conf  c.ffu.com.conf</span></span>
<span class="line"><span style="color:#24292e;">[root@test-1 conf.d]# cat a.ffu.com.conf</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  a.ffu.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        ssl_certificate             ssl/server.crt;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_certificate_key         ssl/server.key;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_session_timeout         5m;</span></span>
<span class="line"><span style="color:#24292e;">	      ssl_protocols               TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_prefer_server_ciphers   on;</span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">           root html;</span></span>
<span class="line"><span style="color:#24292e;">           index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">[root@test-1 conf.d]# cat b.ffu.com.conf</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  b.ffu.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        ssl_certificate             ssl/server.crt;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_certificate_key         ssl/server.key;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_session_timeout         5m;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_protocols               TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_prefer_server_ciphers   on;</span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">           root html;</span></span>
<span class="line"><span style="color:#24292e;">           index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2-2-客户端验证" tabindex="-1">2.2 客户端验证 <a class="header-anchor" href="#_2-2-客户端验证" aria-label="Permalink to &quot;2.2 客户端验证&quot;">​</a></h2><p>客户端请求验证server支持的TLS版本</p><h3 id="虚拟主机a-ffu-com" tabindex="-1">虚拟主机a.ffu.com <a class="header-anchor" href="#虚拟主机a-ffu-com" aria-label="Permalink to &quot;虚拟主机a.ffu.com&quot;">​</a></h3><p>不支持TLSv1和TLSv1.1，和配置一致<code>ssl_protocols TLSv1.2 TLSv1.3;</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost] ~$ openssl s_client -servername a.ffu.com -connect a.ffu.com:443 -tls1 &lt; /dev/null</span></span>
<span class="line"><span style="color:#e1e4e8;">CONNECTED(00000003)</span></span>
<span class="line"><span style="color:#e1e4e8;">140616533698448:error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version:s3_pkt.c:1493:SSL alert number 70</span></span>
<span class="line"><span style="color:#e1e4e8;">140616533698448:error:1409E0E5:SSL routines:ssl3_write_bytes:ssl handshake failure:s3_pkt.c:659:</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">no peer certificate available</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL handshake has read 7 bytes and written 0 bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">New, (NONE), Cipher is (NONE)</span></span>
<span class="line"><span style="color:#e1e4e8;">Secure Renegotiation IS NOT supported</span></span>
<span class="line"><span style="color:#e1e4e8;">Compression: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">Expansion: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL-Session:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Protocol  : TLSv1</span></span>
<span class="line"><span style="color:#e1e4e8;">    Cipher    : 0000</span></span>
<span class="line"><span style="color:#e1e4e8;">    Session-ID:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Session-ID-ctx:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Master-Key:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Key-Arg   : None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Krb5 Principal: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Start Time: 1718960402</span></span>
<span class="line"><span style="color:#e1e4e8;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#e1e4e8;">    Verify return code: 0 (ok)</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost] ~$ openssl s_client -servername a.ffu.com -connect a.ffu.com:443 -tls1_1 &lt; /dev/null</span></span>
<span class="line"><span style="color:#e1e4e8;">CONNECTED(00000003)</span></span>
<span class="line"><span style="color:#e1e4e8;">140378553411472:error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version:s3_pkt.c:1493:SSL alert number 70</span></span>
<span class="line"><span style="color:#e1e4e8;">140378553411472:error:1409E0E5:SSL routines:ssl3_write_bytes:ssl handshake failure:s3_pkt.c:659:</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">no peer certificate available</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL handshake has read 7 bytes and written 0 bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">New, (NONE), Cipher is (NONE)</span></span>
<span class="line"><span style="color:#e1e4e8;">Secure Renegotiation IS NOT supported</span></span>
<span class="line"><span style="color:#e1e4e8;">Compression: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">Expansion: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL-Session:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Protocol  : TLSv1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    Cipher    : 0000</span></span>
<span class="line"><span style="color:#e1e4e8;">    Session-ID:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Session-ID-ctx:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Master-Key:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Key-Arg   : None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Krb5 Principal: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Start Time: 1718960405</span></span>
<span class="line"><span style="color:#e1e4e8;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#e1e4e8;">    Verify return code: 0 (ok)</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost] ~$ openssl s_client -servername a.ffu.com -connect a.ffu.com:443 -tls1_2 -no_ticket  &lt; /dev/null</span></span>
<span class="line"><span style="color:#e1e4e8;">CONNECTED(00000003)</span></span>
<span class="line"><span style="color:#e1e4e8;">depth=0 CN = *.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">verify error:num=20:unable to get local issuer certificate</span></span>
<span class="line"><span style="color:#e1e4e8;">verify return:1</span></span>
<span class="line"><span style="color:#e1e4e8;">depth=0 CN = *.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">verify error:num=21:unable to verify the first certificate</span></span>
<span class="line"><span style="color:#e1e4e8;">verify return:1</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate chain</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0 s:/CN=*.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">   i:/CN=FFU ROOT CA</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">Server certificate</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">MIIDAzCCAeugAwIBAgIBAjANBgkqhkiG9w0BAQsFADAWMRQwEgYDVQQDDAtGRlUg</span></span>
<span class="line"><span style="color:#e1e4e8;">Uk9PVCBDQTAeFw0yNDA1MTcwNjM5MjRaFw0yNTA1MTcwNjM5MjRaMBQxEjAQBgNV</span></span>
<span class="line"><span style="color:#e1e4e8;">BAMMCSouZmZ1LmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMuq</span></span>
<span class="line"><span style="color:#e1e4e8;">+ke4/mfaXMFMAj7u9VHhumC3UBJCQ6j60Vd2LUMX+lQqNfoHiIRPfYBjSt/hEnmr</span></span>
<span class="line"><span style="color:#e1e4e8;">ePDnMvtimqTOTjPpCajiRiaKtLQrhtOB3QhXllibF2P5b1shF0ed6n+yr52f9JOF</span></span>
<span class="line"><span style="color:#e1e4e8;">mc6H3skFuFNsAtp4GuuUoUPp5Nqjv643/FWO7mfOPbrcqPbl7PhcenowAClk5ZzY</span></span>
<span class="line"><span style="color:#e1e4e8;">jGWTJC3EaM+C4bmburNS8QUnsk0O6MxjGw6jhaRROVMhLfsMoOJTZzmU5Ff4qjOP</span></span>
<span class="line"><span style="color:#e1e4e8;">mp+hnIF+1dEA5vBiWncZxffEGd55U1JdjysXInvxjg8VP28ItcRY7V6ad1DrakE7</span></span>
<span class="line"><span style="color:#e1e4e8;">oSjGtyeXpCy9RP9vzDsCAwEAAaNeMFwwCQYDVR0TBAIwADALBgNVHQ8EBAMCBaAw</span></span>
<span class="line"><span style="color:#e1e4e8;">HQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMCMGA1UdEQQcMBqCCSouZmZ1</span></span>
<span class="line"><span style="color:#e1e4e8;">LmNvbYIHZmZ1LmNvbYcEClkJgTANBgkqhkiG9w0BAQsFAAOCAQEAcNQL4pA7xGrw</span></span>
<span class="line"><span style="color:#e1e4e8;">DoknuV+jx9FEdHAyS6gTdzWHz4Fz1FA5qSY2FL7wpH4CQDPyCYhezOPtjpK6cvAd</span></span>
<span class="line"><span style="color:#e1e4e8;">cOj251M5ZyafRP+ZWOz9bDl3hOCwHnhsHiyB2WrUCOQILpw/m2dapuflDfzUs92h</span></span>
<span class="line"><span style="color:#e1e4e8;">gCbOCA9bX9AiG09gLHaPYvkF+eNRLUtDZ39xOGQz2lf/fj1OtQDXz2OkGcCny5Ip</span></span>
<span class="line"><span style="color:#e1e4e8;">U7ESIoEY0loREsB2D7caugwuTOGZusWuzX9D9//dZhyacETzsJBE//RxI2df5INB</span></span>
<span class="line"><span style="color:#e1e4e8;">krmYjklWiWN9TE5ZOh0l7anQCasOegpymmKXCzViYxFCFwFiHNIHLwQ0YBcIUWUb</span></span>
<span class="line"><span style="color:#e1e4e8;">pXWyUr/FGw==</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">subject=/CN=*.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">issuer=/CN=FFU ROOT CA</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#e1e4e8;">Peer signing digest: SHA256</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Temp Key: ECDH, P-256, 256 bits</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL handshake has read 1286 bytes and written 429 bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">New, TLSv1/SSLv3, Cipher is ECDHE-RSA-AES128-GCM-SHA256</span></span>
<span class="line"><span style="color:#e1e4e8;">Server public key is 2048 bit</span></span>
<span class="line"><span style="color:#e1e4e8;">Secure Renegotiation IS supported</span></span>
<span class="line"><span style="color:#e1e4e8;">Compression: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">Expansion: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL-Session:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Protocol  : TLSv1.2</span></span>
<span class="line"><span style="color:#e1e4e8;">    Cipher    : ECDHE-RSA-AES128-GCM-SHA256</span></span>
<span class="line"><span style="color:#e1e4e8;">    Sesson-ID: 49BC497A0318A94CA554137F655121CB3421E06292626E9CFAF372096AB5DF0A</span></span>
<span class="line"><span style="color:#e1e4e8;">    Session-ID-ctx:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Master-Key: 32FF67B7B1C51670D707D3D623D0063917458EE5AA6941E8F9ECC6BC723DA5C6162E0835CB4AF7FFE2E21FB3F9F22DE7</span></span>
<span class="line"><span style="color:#e1e4e8;">    Key-Arg   : None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Krb5 Principal: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    Start Time: 1718960895</span></span>
<span class="line"><span style="color:#e1e4e8;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#e1e4e8;">    Verify return code: 21 (unable to verify the first certificate)</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">DONE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost] ~$ openssl s_client -servername a.ffu.com -connect a.ffu.com:443 -tls1 &lt; /dev/null</span></span>
<span class="line"><span style="color:#24292e;">CONNECTED(00000003)</span></span>
<span class="line"><span style="color:#24292e;">140616533698448:error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version:s3_pkt.c:1493:SSL alert number 70</span></span>
<span class="line"><span style="color:#24292e;">140616533698448:error:1409E0E5:SSL routines:ssl3_write_bytes:ssl handshake failure:s3_pkt.c:659:</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">no peer certificate available</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">SSL handshake has read 7 bytes and written 0 bytes</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">New, (NONE), Cipher is (NONE)</span></span>
<span class="line"><span style="color:#24292e;">Secure Renegotiation IS NOT supported</span></span>
<span class="line"><span style="color:#24292e;">Compression: NONE</span></span>
<span class="line"><span style="color:#24292e;">Expansion: NONE</span></span>
<span class="line"><span style="color:#24292e;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#24292e;">SSL-Session:</span></span>
<span class="line"><span style="color:#24292e;">    Protocol  : TLSv1</span></span>
<span class="line"><span style="color:#24292e;">    Cipher    : 0000</span></span>
<span class="line"><span style="color:#24292e;">    Session-ID:</span></span>
<span class="line"><span style="color:#24292e;">    Session-ID-ctx:</span></span>
<span class="line"><span style="color:#24292e;">    Master-Key:</span></span>
<span class="line"><span style="color:#24292e;">    Key-Arg   : None</span></span>
<span class="line"><span style="color:#24292e;">    Krb5 Principal: None</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity: None</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#24292e;">    Start Time: 1718960402</span></span>
<span class="line"><span style="color:#24292e;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#24292e;">    Verify return code: 0 (ok)</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost] ~$ openssl s_client -servername a.ffu.com -connect a.ffu.com:443 -tls1_1 &lt; /dev/null</span></span>
<span class="line"><span style="color:#24292e;">CONNECTED(00000003)</span></span>
<span class="line"><span style="color:#24292e;">140378553411472:error:1409442E:SSL routines:ssl3_read_bytes:tlsv1 alert protocol version:s3_pkt.c:1493:SSL alert number 70</span></span>
<span class="line"><span style="color:#24292e;">140378553411472:error:1409E0E5:SSL routines:ssl3_write_bytes:ssl handshake failure:s3_pkt.c:659:</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">no peer certificate available</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">SSL handshake has read 7 bytes and written 0 bytes</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">New, (NONE), Cipher is (NONE)</span></span>
<span class="line"><span style="color:#24292e;">Secure Renegotiation IS NOT supported</span></span>
<span class="line"><span style="color:#24292e;">Compression: NONE</span></span>
<span class="line"><span style="color:#24292e;">Expansion: NONE</span></span>
<span class="line"><span style="color:#24292e;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#24292e;">SSL-Session:</span></span>
<span class="line"><span style="color:#24292e;">    Protocol  : TLSv1.1</span></span>
<span class="line"><span style="color:#24292e;">    Cipher    : 0000</span></span>
<span class="line"><span style="color:#24292e;">    Session-ID:</span></span>
<span class="line"><span style="color:#24292e;">    Session-ID-ctx:</span></span>
<span class="line"><span style="color:#24292e;">    Master-Key:</span></span>
<span class="line"><span style="color:#24292e;">    Key-Arg   : None</span></span>
<span class="line"><span style="color:#24292e;">    Krb5 Principal: None</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity: None</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#24292e;">    Start Time: 1718960405</span></span>
<span class="line"><span style="color:#24292e;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#24292e;">    Verify return code: 0 (ok)</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@localhost] ~$ openssl s_client -servername a.ffu.com -connect a.ffu.com:443 -tls1_2 -no_ticket  &lt; /dev/null</span></span>
<span class="line"><span style="color:#24292e;">CONNECTED(00000003)</span></span>
<span class="line"><span style="color:#24292e;">depth=0 CN = *.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">verify error:num=20:unable to get local issuer certificate</span></span>
<span class="line"><span style="color:#24292e;">verify return:1</span></span>
<span class="line"><span style="color:#24292e;">depth=0 CN = *.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">verify error:num=21:unable to verify the first certificate</span></span>
<span class="line"><span style="color:#24292e;">verify return:1</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">Certificate chain</span></span>
<span class="line"><span style="color:#24292e;"> 0 s:/CN=*.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">   i:/CN=FFU ROOT CA</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">Server certificate</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">MIIDAzCCAeugAwIBAgIBAjANBgkqhkiG9w0BAQsFADAWMRQwEgYDVQQDDAtGRlUg</span></span>
<span class="line"><span style="color:#24292e;">Uk9PVCBDQTAeFw0yNDA1MTcwNjM5MjRaFw0yNTA1MTcwNjM5MjRaMBQxEjAQBgNV</span></span>
<span class="line"><span style="color:#24292e;">BAMMCSouZmZ1LmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMuq</span></span>
<span class="line"><span style="color:#24292e;">+ke4/mfaXMFMAj7u9VHhumC3UBJCQ6j60Vd2LUMX+lQqNfoHiIRPfYBjSt/hEnmr</span></span>
<span class="line"><span style="color:#24292e;">ePDnMvtimqTOTjPpCajiRiaKtLQrhtOB3QhXllibF2P5b1shF0ed6n+yr52f9JOF</span></span>
<span class="line"><span style="color:#24292e;">mc6H3skFuFNsAtp4GuuUoUPp5Nqjv643/FWO7mfOPbrcqPbl7PhcenowAClk5ZzY</span></span>
<span class="line"><span style="color:#24292e;">jGWTJC3EaM+C4bmburNS8QUnsk0O6MxjGw6jhaRROVMhLfsMoOJTZzmU5Ff4qjOP</span></span>
<span class="line"><span style="color:#24292e;">mp+hnIF+1dEA5vBiWncZxffEGd55U1JdjysXInvxjg8VP28ItcRY7V6ad1DrakE7</span></span>
<span class="line"><span style="color:#24292e;">oSjGtyeXpCy9RP9vzDsCAwEAAaNeMFwwCQYDVR0TBAIwADALBgNVHQ8EBAMCBaAw</span></span>
<span class="line"><span style="color:#24292e;">HQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMCMGA1UdEQQcMBqCCSouZmZ1</span></span>
<span class="line"><span style="color:#24292e;">LmNvbYIHZmZ1LmNvbYcEClkJgTANBgkqhkiG9w0BAQsFAAOCAQEAcNQL4pA7xGrw</span></span>
<span class="line"><span style="color:#24292e;">DoknuV+jx9FEdHAyS6gTdzWHz4Fz1FA5qSY2FL7wpH4CQDPyCYhezOPtjpK6cvAd</span></span>
<span class="line"><span style="color:#24292e;">cOj251M5ZyafRP+ZWOz9bDl3hOCwHnhsHiyB2WrUCOQILpw/m2dapuflDfzUs92h</span></span>
<span class="line"><span style="color:#24292e;">gCbOCA9bX9AiG09gLHaPYvkF+eNRLUtDZ39xOGQz2lf/fj1OtQDXz2OkGcCny5Ip</span></span>
<span class="line"><span style="color:#24292e;">U7ESIoEY0loREsB2D7caugwuTOGZusWuzX9D9//dZhyacETzsJBE//RxI2df5INB</span></span>
<span class="line"><span style="color:#24292e;">krmYjklWiWN9TE5ZOh0l7anQCasOegpymmKXCzViYxFCFwFiHNIHLwQ0YBcIUWUb</span></span>
<span class="line"><span style="color:#24292e;">pXWyUr/FGw==</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">subject=/CN=*.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">issuer=/CN=FFU ROOT CA</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#24292e;">Peer signing digest: SHA256</span></span>
<span class="line"><span style="color:#24292e;">Server Temp Key: ECDH, P-256, 256 bits</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">SSL handshake has read 1286 bytes and written 429 bytes</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">New, TLSv1/SSLv3, Cipher is ECDHE-RSA-AES128-GCM-SHA256</span></span>
<span class="line"><span style="color:#24292e;">Server public key is 2048 bit</span></span>
<span class="line"><span style="color:#24292e;">Secure Renegotiation IS supported</span></span>
<span class="line"><span style="color:#24292e;">Compression: NONE</span></span>
<span class="line"><span style="color:#24292e;">Expansion: NONE</span></span>
<span class="line"><span style="color:#24292e;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#24292e;">SSL-Session:</span></span>
<span class="line"><span style="color:#24292e;">    Protocol  : TLSv1.2</span></span>
<span class="line"><span style="color:#24292e;">    Cipher    : ECDHE-RSA-AES128-GCM-SHA256</span></span>
<span class="line"><span style="color:#24292e;">    Sesson-ID: 49BC497A0318A94CA554137F655121CB3421E06292626E9CFAF372096AB5DF0A</span></span>
<span class="line"><span style="color:#24292e;">    Session-ID-ctx:</span></span>
<span class="line"><span style="color:#24292e;">    Master-Key: 32FF67B7B1C51670D707D3D623D0063917458EE5AA6941E8F9ECC6BC723DA5C6162E0835CB4AF7FFE2E21FB3F9F22DE7</span></span>
<span class="line"><span style="color:#24292e;">    Key-Arg   : None</span></span>
<span class="line"><span style="color:#24292e;">    Krb5 Principal: None</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity: None</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#24292e;">    Start Time: 1718960895</span></span>
<span class="line"><span style="color:#24292e;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#24292e;">    Verify return code: 21 (unable to verify the first certificate)</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">DONE</span></span></code></pre></div><h3 id="虚拟主机b-ffu-com" tabindex="-1">虚拟主机b.ffu.com <a class="header-anchor" href="#虚拟主机b-ffu-com" aria-label="Permalink to &quot;虚拟主机b.ffu.com&quot;">​</a></h3><p>不支持TLSv1和TLSv1.1，和配置不一致<code>ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost] ~$ curl -kvI  --tlsv1.0 https://b.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">* About to connect() to b.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">*   Trying 10.89.9.129...</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connected to b.ffu.com (10.89.9.129) port 443 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">* Initializing NSS with certpath: sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#e1e4e8;">* NSS error -12190 (SSL_ERROR_PROTOCOL_VERSION_ALERT)</span></span>
<span class="line"><span style="color:#e1e4e8;">* Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#e1e4e8;">* Closing connection 0</span></span>
<span class="line"><span style="color:#e1e4e8;">curl: (35) Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost] ~$ curl -kvI  --tlsv1.1 https://b.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">* About to connect() to b.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">*   Trying 10.89.9.129...</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connected to b.ffu.com (10.89.9.129) port 443 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">* Initializing NSS with certpath: sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#e1e4e8;">* NSS error -12190 (SSL_ERROR_PROTOCOL_VERSION_ALERT)</span></span>
<span class="line"><span style="color:#e1e4e8;">* Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#e1e4e8;">* Closing connection 0</span></span>
<span class="line"><span style="color:#e1e4e8;">curl: (35) Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost] ~$ curl -kvI  --tlsv1.2 https://b.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">* About to connect() to b.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">*   Trying 10.89.9.129...</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connected to b.ffu.com (10.89.9.129) port 443 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">* Initializing NSS with certpath: sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#e1e4e8;">* skipping SSL peer certificate verification</span></span>
<span class="line"><span style="color:#e1e4e8;">* SSL connection using TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256</span></span>
<span class="line"><span style="color:#e1e4e8;">* Server certificate:</span></span>
<span class="line"><span style="color:#e1e4e8;">* 	subject: CN=*.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">* 	start date: 5月 17 06:39:24 2024 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">* 	expire date: 5月 17 06:39:24 2025 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">* 	common name: *.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">* 	issuer: CN=FFU ROOT CA</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; HEAD / HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; User-Agent: curl/7.29.0</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Host: b.ffu.com</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Server: openresty</span></span>
<span class="line"><span style="color:#e1e4e8;">Server: openresty</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Date: Fri, 21 May 2024 09:16:16 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">Date: Fri, 21 May 2024 09:16:16 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Content-Type: text/html</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: text/html</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Content-Length: 1097</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Length: 1097</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Last-Modified: Fri, 06 Nov 2020 08:26:32 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">Last-Modified: Fri, 06 Nov 2020 08:26:32 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Connection: keep-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#e1e4e8;">Vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; ETag: &quot;5fa508b8-449&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">ETag: &quot;5fa508b8-449&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connection #0 to host b.ffu.com left intact</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost] ~$ curl -kvI  --tlsv1.0 https://b.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">* About to connect() to b.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#24292e;">*   Trying 10.89.9.129...</span></span>
<span class="line"><span style="color:#24292e;">* Connected to b.ffu.com (10.89.9.129) port 443 (#0)</span></span>
<span class="line"><span style="color:#24292e;">* Initializing NSS with certpath: sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#24292e;">* NSS error -12190 (SSL_ERROR_PROTOCOL_VERSION_ALERT)</span></span>
<span class="line"><span style="color:#24292e;">* Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#24292e;">* Closing connection 0</span></span>
<span class="line"><span style="color:#24292e;">curl: (35) Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@localhost] ~$ curl -kvI  --tlsv1.1 https://b.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">* About to connect() to b.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#24292e;">*   Trying 10.89.9.129...</span></span>
<span class="line"><span style="color:#24292e;">* Connected to b.ffu.com (10.89.9.129) port 443 (#0)</span></span>
<span class="line"><span style="color:#24292e;">* Initializing NSS with certpath: sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#24292e;">* NSS error -12190 (SSL_ERROR_PROTOCOL_VERSION_ALERT)</span></span>
<span class="line"><span style="color:#24292e;">* Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#24292e;">* Closing connection 0</span></span>
<span class="line"><span style="color:#24292e;">curl: (35) Peer reports incompatible or unsupported protocol version.</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost] ~$ curl -kvI  --tlsv1.2 https://b.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">* About to connect() to b.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#24292e;">*   Trying 10.89.9.129...</span></span>
<span class="line"><span style="color:#24292e;">* Connected to b.ffu.com (10.89.9.129) port 443 (#0)</span></span>
<span class="line"><span style="color:#24292e;">* Initializing NSS with certpath: sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#24292e;">* skipping SSL peer certificate verification</span></span>
<span class="line"><span style="color:#24292e;">* SSL connection using TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256</span></span>
<span class="line"><span style="color:#24292e;">* Server certificate:</span></span>
<span class="line"><span style="color:#24292e;">* 	subject: CN=*.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">* 	start date: 5月 17 06:39:24 2024 GMT</span></span>
<span class="line"><span style="color:#24292e;">* 	expire date: 5月 17 06:39:24 2025 GMT</span></span>
<span class="line"><span style="color:#24292e;">* 	common name: *.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">* 	issuer: CN=FFU ROOT CA</span></span>
<span class="line"><span style="color:#24292e;">&gt; HEAD / HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">&gt; User-Agent: curl/7.29.0</span></span>
<span class="line"><span style="color:#24292e;">&gt; Host: b.ffu.com</span></span>
<span class="line"><span style="color:#24292e;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt; HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#24292e;">HTTP/1.1 200 OK</span></span>
<span class="line"><span style="color:#24292e;">&lt; Server: openresty</span></span>
<span class="line"><span style="color:#24292e;">Server: openresty</span></span>
<span class="line"><span style="color:#24292e;">&lt; Date: Fri, 21 May 2024 09:16:16 GMT</span></span>
<span class="line"><span style="color:#24292e;">Date: Fri, 21 May 2024 09:16:16 GMT</span></span>
<span class="line"><span style="color:#24292e;">&lt; Content-Type: text/html</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: text/html</span></span>
<span class="line"><span style="color:#24292e;">&lt; Content-Length: 1097</span></span>
<span class="line"><span style="color:#24292e;">Content-Length: 1097</span></span>
<span class="line"><span style="color:#24292e;">&lt; Last-Modified: Fri, 06 Nov 2020 08:26:32 GMT</span></span>
<span class="line"><span style="color:#24292e;">Last-Modified: Fri, 06 Nov 2020 08:26:32 GMT</span></span>
<span class="line"><span style="color:#24292e;">&lt; Connection: keep-alive</span></span>
<span class="line"><span style="color:#24292e;">Connection: keep-alive</span></span>
<span class="line"><span style="color:#24292e;">&lt; Vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#24292e;">Vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#24292e;">&lt; ETag: &quot;5fa508b8-449&quot;</span></span>
<span class="line"><span style="color:#24292e;">ETag: &quot;5fa508b8-449&quot;</span></span>
<span class="line"><span style="color:#24292e;">&lt; Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#24292e;">Accept-Ranges: bytes</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;</span></span>
<span class="line"><span style="color:#24292e;">* Connection #0 to host b.ffu.com left intact</span></span></code></pre></div><p>为什么虚拟主机配置文件b.ffu.com.conf中ssl_protocols指定了<code>TLSv1 TLSv1.1</code> 还不支持呢？官方文档解释<a href="https://nginx.org/en/docs/http/server_names.html#virtual_server_selection" target="_blank" rel="noreferrer"> ssl_protocols应该在default server中配置</a></p><blockquote><p>in case of the <a href="https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_protocols" target="_blank" rel="noreferrer">ssl_protocols</a> directive, the protocol list is set by the OpenSSL library before the server configuration could be applied according to the name requested through SNI, thus, protocols should be specified only for a default server;</p></blockquote><h3 id="配置default-server" tabindex="-1">配置default_server <a class="header-anchor" href="#配置default-server" aria-label="Permalink to &quot;配置default_server&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@test-1 conf.d]# cat defult.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       443 ssl default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  _;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_certificate             ssl/server.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_certificate_key         ssl/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_session_timeout         5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_protocols               TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_prefer_server_ciphers   on;</span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">           root html;</span></span>
<span class="line"><span style="color:#e1e4e8;">           index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@test-1 conf.d]# cat defult.conf</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       443 ssl default_server;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  _;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        ssl_certificate             ssl/server.crt;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_certificate_key         ssl/server.key;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_session_timeout         5m;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_protocols               TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA;</span></span>
<span class="line"><span style="color:#24292e;">        ssl_prefer_server_ciphers   on;</span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">           root html;</span></span>
<span class="line"><span style="color:#24292e;">           index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>再次验证</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost] </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">$ curl -kvI  --tlsv1.0 https://a.ffu.com</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> About to </span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">() to a.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#B392F0;">*</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">Trying</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10.89</span><span style="color:#9ECBFF;">.9.129...</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> Connected to a.ffu.com (</span><span style="color:#B392F0;">10.89.9.129</span><span style="color:#E1E4E8;">) port 443 (#0)</span></span>
<span class="line"><span style="color:#B392F0;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Initializing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">NSS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">certpath:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> NSS error -12286 (</span><span style="color:#B392F0;">SSL_ERROR_NO_CYPHER_OVERLAP</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> Cannot communicate securely with peer: no common encryption algorithm(</span><span style="color:#B392F0;">s</span><span style="color:#E1E4E8;">).</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> Closing connection 0</span></span>
<span class="line"><span style="color:#B392F0;">curl:</span><span style="color:#E1E4E8;"> (35) Cannot communicate securely with peer: no common encryption algorithm(</span><span style="color:#B392F0;">s</span><span style="color:#E1E4E8;">).</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost] </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">$ curl -kI --tlsv1.0 https://b.ffu.com</span></span>
<span class="line"><span style="color:#B392F0;">HTTP/1.1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">OK</span></span>
<span class="line"><span style="color:#B392F0;">Server:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">openresty</span></span>
<span class="line"><span style="color:#B392F0;">Date:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Fri,</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">21</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">may</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">09</span><span style="color:#9ECBFF;">:52:55</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GMT</span></span>
<span class="line"><span style="color:#B392F0;">Content-Type:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">text/html</span></span>
<span class="line"><span style="color:#B392F0;">Content-Length:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1097</span></span>
<span class="line"><span style="color:#B392F0;">Last-Modified:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Fri,</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">06</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Nov</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2020</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">08</span><span style="color:#9ECBFF;">:26:32</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">GMT</span></span>
<span class="line"><span style="color:#B392F0;">Connection:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">keep-alive</span></span>
<span class="line"><span style="color:#B392F0;">Vary:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Accept-Encoding</span></span>
<span class="line"><span style="color:#B392F0;">ETag:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;5fa508b8-449&quot;</span></span>
<span class="line"><span style="color:#B392F0;">Accept-Ranges:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bytes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost] </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">$ curl -kvI  --tlsv1.0 https://a.ffu.com</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> About to </span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">() to a.ffu.com port 443 (#0)</span></span>
<span class="line"><span style="color:#6F42C1;">*</span><span style="color:#24292E;">   </span><span style="color:#032F62;">Trying</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10.89</span><span style="color:#032F62;">.9.129...</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> Connected to a.ffu.com (</span><span style="color:#6F42C1;">10.89.9.129</span><span style="color:#24292E;">) port 443 (#0)</span></span>
<span class="line"><span style="color:#6F42C1;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Initializing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">NSS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with</span><span style="color:#24292E;"> </span><span style="color:#032F62;">certpath:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sql:/etc/pki/nssdb</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> NSS error -12286 (</span><span style="color:#6F42C1;">SSL_ERROR_NO_CYPHER_OVERLAP</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> Cannot communicate securely with peer: no common encryption algorithm(</span><span style="color:#6F42C1;">s</span><span style="color:#24292E;">).</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> Closing connection 0</span></span>
<span class="line"><span style="color:#6F42C1;">curl:</span><span style="color:#24292E;"> (35) Cannot communicate securely with peer: no common encryption algorithm(</span><span style="color:#6F42C1;">s</span><span style="color:#24292E;">).</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@localhost] </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">$ curl -kI --tlsv1.0 https://b.ffu.com</span></span>
<span class="line"><span style="color:#6F42C1;">HTTP/1.1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#032F62;">OK</span></span>
<span class="line"><span style="color:#6F42C1;">Server:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">openresty</span></span>
<span class="line"><span style="color:#6F42C1;">Date:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Fri,</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">21</span><span style="color:#24292E;"> </span><span style="color:#032F62;">may</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">09</span><span style="color:#032F62;">:52:55</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GMT</span></span>
<span class="line"><span style="color:#6F42C1;">Content-Type:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">text/html</span></span>
<span class="line"><span style="color:#6F42C1;">Content-Length:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1097</span></span>
<span class="line"><span style="color:#6F42C1;">Last-Modified:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Fri,</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">06</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Nov</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2020</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">08</span><span style="color:#032F62;">:26:32</span><span style="color:#24292E;"> </span><span style="color:#032F62;">GMT</span></span>
<span class="line"><span style="color:#6F42C1;">Connection:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">keep-alive</span></span>
<span class="line"><span style="color:#6F42C1;">Vary:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Accept-Encoding</span></span>
<span class="line"><span style="color:#6F42C1;">ETag:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;5fa508b8-449&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">Accept-Ranges:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bytes</span></span></code></pre></div><h1 id="_3-roclinux9-x" tabindex="-1">3.Roclinux9.x <a class="header-anchor" href="#_3-roclinux9-x" aria-label="Permalink to &quot;3.Roclinux9.x&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemdctl enable nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> Failed to execute /usr/lib/systemd/systemd-sysv-install: 没有文件或目录</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">解决方式：</span></span>
<span class="line"><span style="color:#e1e4e8;">ln -s /usr/lib/systemd/system/nginx.service /etc/systemd/system/multi-user.target.wants/nginx.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemdctl enable nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> Failed to execute /usr/lib/systemd/systemd-sysv-install: 没有文件或目录</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">解决方式：</span></span>
<span class="line"><span style="color:#24292e;">ln -s /usr/lib/systemd/system/nginx.service /etc/systemd/system/multi-user.target.wants/nginx.service</span></span></code></pre></div><h1 id="_4-加速缓存导致event-stream消息延迟问题" tabindex="-1">4. 加速缓存导致event-stream消息延迟问题 <a class="header-anchor" href="#_4-加速缓存导致event-stream消息延迟问题" aria-label="Permalink to &quot;4. 加速缓存导致event-stream消息延迟问题&quot;">​</a></h1><p>现象：过了2秒，又在几百毫秒内收到几十个响应，但是在本地的时候，接受到的stream时持续不断的，不可能中断2秒，然后又瞬间发送。推测是java应用发送响应到nginx之后，被nginx缓存起来了，缓存到一定数据量之后，再统一发送到浏览器客户端。</p><p>解决：</p><p>nginx添加，没有生效</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># http模块添加tcp_nodelay尝试让nginx直接将数据发送至客户端</span></span>
<span class="line"><span style="color:#B392F0;">tcp_nodelay</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;"># server下的location模块针对该接口设置禁用缓存</span></span>
<span class="line"><span style="color:#B392F0;">proxy_buffering</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">proxy_cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">proxy_buffer_size</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># http模块添加tcp_nodelay尝试让nginx直接将数据发送至客户端</span></span>
<span class="line"><span style="color:#6F42C1;">tcp_nodelay</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;"># server下的location模块针对该接口设置禁用缓存</span></span>
<span class="line"><span style="color:#6F42C1;">proxy_buffering</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">proxy_cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">proxy_buffer_size</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">;</span></span></code></pre></div><p>直接在程序中添加</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ResponseEntity.ok</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                .header(</span><span style="color:#B392F0;">&quot;X-Accel-Buffering&quot;</span><span style="color:#B392F0;">,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;no&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">.body(stringFlux</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ResponseEntity.ok</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                .header(</span><span style="color:#6F42C1;">&quot;X-Accel-Buffering&quot;</span><span style="color:#6F42C1;">,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;no&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">.body(stringFlux</span><span style="color:#24292E;">);</span></span></code></pre></div>`,35),o=[p];function c(t,r,i,y,E,A){return n(),a("div",null,o)}const u=s(l,[["render",c]]);export{C as __pageData,u as default};
