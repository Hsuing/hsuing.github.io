import{_ as s,o as n,c as e,R as a}from"./chunks/framework.byfcZK4E.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/23-FAQ.md","filePath":"guide/Linux/web/nginx/23-FAQ.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/23-FAQ.md"},l=a(`<ul><li>nginx部署ssl证书出现[emerg] PEM_read_bio_X509_AUX failed的解决办法</li></ul><p>nginx -t</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">nginx: [emerg] PEM_read_bio_X509_AUX(&quot;xxxxxxxx.pem&quot;) failed (SSL: error:0906D066:PEM routines:PEM_read_bio:bad end line)</span></span>
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
<span class="line"><span style="color:#24292e;">U2lnbiwgSW5jLiAtIEZvciBhdXRob3JpemVkIHVzZSBvbmx5MUUwQwYDVQQDEzxW</span></span></code></pre></div><h2 id="nginx下-499错误的解决办法" tabindex="-1">nginx下 499错误的解决办法 <a class="header-anchor" href="#nginx下-499错误的解决办法" aria-label="Permalink to &quot;nginx下 499错误的解决办法&quot;">​</a></h2><p>499错误是什么？让我们看看NGINX的源码中的定义</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_495_page), /* 495, https certificate error */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_496_page), /* 496, https no certificate */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_497_page), /* 497, http to https */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_string(ngx_http_error_404_page), /* 498, canceled */</span></span>
<span class="line"><span style="color:#e1e4e8;">ngx_null_string, /* 499, client has closed connection */</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_495_page), /* 495, https certificate error */</span></span>
<span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_496_page), /* 496, https no certificate */</span></span>
<span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_497_page), /* 497, http to https */</span></span>
<span class="line"><span style="color:#24292e;">ngx_string(ngx_http_error_404_page), /* 498, canceled */</span></span>
<span class="line"><span style="color:#24292e;">ngx_null_string, /* 499, client has closed connection */</span></span></code></pre></div>`,8),o=[l];function t(c,i,r,g,d,_){return n(),e("div",null,o)}const x=s(p,[["render",t]]);export{A as __pageData,x as default};
