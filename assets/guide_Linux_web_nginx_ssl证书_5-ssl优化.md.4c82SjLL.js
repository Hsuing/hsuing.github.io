import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"获取中间件证书","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/ssl证书/5-ssl优化.md","filePath":"guide/Linux/web/nginx/ssl证书/5-ssl优化.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/ssl证书/5-ssl优化.md"},p=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ssl_session_tickets       on;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_session_ticket_key  ~/ssl_session_ticket.key;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_session_cache       shared:SSL:10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_session_timeout     10m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_stapling on;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_trusted_certificate   ~/ocsp.cer;</span></span>
<span class="line"><span style="color:#e1e4e8;">resolver 208.67.222.222 valid=300s;</span></span>
<span class="line"><span style="color:#e1e4e8;">resolver_timeout 5s;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ssl_session_tickets       on;</span></span>
<span class="line"><span style="color:#24292e;">ssl_session_ticket_key  ~/ssl_session_ticket.key;</span></span>
<span class="line"><span style="color:#24292e;">ssl_session_cache       shared:SSL:10m;</span></span>
<span class="line"><span style="color:#24292e;">ssl_session_timeout     10m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ssl_stapling on;</span></span>
<span class="line"><span style="color:#24292e;">ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#24292e;">ssl_trusted_certificate   ~/ocsp.cer;</span></span>
<span class="line"><span style="color:#24292e;">resolver 208.67.222.222 valid=300s;</span></span>
<span class="line"><span style="color:#24292e;">resolver_timeout 5s;</span></span></code></pre></div><p>TLS 会话恢复的目的是简化 TLS 握手，它包含两种方案：Session Cache 和 Session Ticket，这俩都是将之前握手的 Session 存起来，供后续连接使用。</p><p>所不同的是，Session Cache 将缓存丢在服务端，占用服务端资源；而 Session Ticket 丢在客户端，不占用服务端资源，而是对客户端提出缓存要求，这对客户端浏览器的兼容性提出了要求。目前主流浏览器普遍支持 Session Cache，而 Session Ticket 的支持度较一般。</p><p>在以上配置中，出现了一个 ssl_session_ticket.key，这个文件是用于让多台机器使用相同的 key 文件，否则 Nginx 会使用随机生成的 key 文件，无法复用 Session Ticket，降低性能。对于单服务器站点，此文件无需配置。可执行以下指令生成该文件：</p><p>openssl rand 48 &gt; ssl_session_ticket.key</p><ul><li>ssl_stapling_file</li></ul><p><a href="https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_stapling_file" target="_blank" rel="noreferrer">https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_stapling_file</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Syntax:     ssl_stapling_file file;</span></span>
<span class="line"><span style="color:#e1e4e8;">Default:     —</span></span>
<span class="line"><span style="color:#e1e4e8;">Context:     http, server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Syntax:     ssl_stapling_file file;</span></span>
<span class="line"><span style="color:#24292e;">Default:     —</span></span>
<span class="line"><span style="color:#24292e;">Context:     http, server</span></span></code></pre></div><ul><li>生成ocsp 文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl ocsp -no_nonce \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -issuer  intermediate.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -cert    website.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -CAfile  bundle.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -VAfile  bundle.pem \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -url     http://ocsp.int-x3.letsencrypt.org \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    -respout stapled.der</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl ocsp -no_nonce \\</span></span>
<span class="line"><span style="color:#24292e;">    -issuer  intermediate.pem \\</span></span>
<span class="line"><span style="color:#24292e;">    -cert    website.pem \\</span></span>
<span class="line"><span style="color:#24292e;">    -CAfile  bundle.pem \\</span></span>
<span class="line"><span style="color:#24292e;">    -VAfile  bundle.pem \\</span></span>
<span class="line"><span style="color:#24292e;">    -url     http://ocsp.int-x3.letsencrypt.org \\</span></span>
<span class="line"><span style="color:#24292e;">    -respout stapled.der</span></span></code></pre></div><ul><li>配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ssl_stapling on;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_stapling_file .../stapled.der;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ssl_stapling on;</span></span>
<span class="line"><span style="color:#24292e;">ssl_stapling_file .../stapled.der;</span></span></code></pre></div><p>stapled.der 这个文件有限期为7天</p><p>curl <a href="https://ssl-config.mozilla.org/ffdhe2048.txt" target="_blank" rel="noreferrer">https://ssl-config.mozilla.org/ffdhe2048.txt</a> &gt; /path/to/dhparam.pem</p><p>ssl_dhparam /path/to/dhparam.pem;</p><pre><code># OCSP stapling
ssl_stapling on;
ssl_stapling_verify on;
</code></pre><p>#verify chain of trust of OCSP response using Root CA and Intermediate certs ssl_trusted_certificate /path/to/root_CA_cert_plus_intermediates;</p><pre><code># replace with the IP address of your resolver
resolver 127.0.0.1;
</code></pre><ul><li>crt to pem</li></ul><p>openssl x509 -in www.xx.com.crt -out www.xx.com.pem</p><h1 id="获取中间件证书" tabindex="-1">获取中间件证书 <a class="header-anchor" href="#获取中间件证书" aria-label="Permalink to &quot;获取中间件证书&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl s_client -connect xx.com:443 -showcerts &lt; /dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CONNECTED(00000004)</span></span>
<span class="line"><span style="color:#e1e4e8;">depth=2 C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, CN = Go Daddy Root Certificate Authority - G2</span></span>
<span class="line"><span style="color:#e1e4e8;">verify return:1</span></span>
<span class="line"><span style="color:#e1e4e8;">depth=1 C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#e1e4e8;">verify return:1</span></span>
<span class="line"><span style="color:#e1e4e8;">depth=0 OU = Domain Control Validated, CN = *.bitcoinwin.io</span></span>
<span class="line"><span style="color:#e1e4e8;">verify return:1</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">Certificate chain</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0 s:OU = Domain Control Validated, CN = *.bitcoinwin.io</span></span>
<span class="line"><span style="color:#e1e4e8;">   i:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">MIIGOjCCBSKgAwIBAgIIHTBwaOYexGowDQYJKoZIhvcNAQELBQAwgbQxCzAJBgNV</span></span>
<span class="line"><span style="color:#e1e4e8;">BAYTAlVTMRAwDgYDVQQIEwdBcml6b25hMRMwEQYDVQQHEwpTY290dHNkYWxlMRow</span></span>
<span class="line"><span style="color:#e1e4e8;">GAYDVQQKExFHb0RhZGR5LmNvbSwgSW5jLjEtMCsGA1UECxMkaHR0cDovL2NlcnRz</span></span>
<span class="line"><span style="color:#e1e4e8;">LmdvZGFkZHkuY29tL3JlcG9zaXRvcnkvMTMwMQYDVQQDEypHbyBEYWRkeSBTZWN1</span></span>
<span class="line"><span style="color:#e1e4e8;">cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IC0gRzIwHhcNMjAwMTA4MDg1NjE1WhcN</span></span>
<span class="line"><span style="color:#e1e4e8;">MjEwMjE4MDQxNjE3WjA9MSEwHwYDVQQLExhEb21haW4gQ29udHJvbCBWYWxpZGF0</span></span>
<span class="line"><span style="color:#e1e4e8;">ZWQxGDAWBgNVBAMMDyouYml0Y29pbndpbi5pbzCCASIwDQYJKoZIhvcNAQEBBQAD</span></span>
<span class="line"><span style="color:#e1e4e8;">ggEPADCCAQoCggEBAMEgX8NDssfFEwo3iA1fRNij9ZIRMS9EEtex5vrcwonVGf4F</span></span>
<span class="line"><span style="color:#e1e4e8;">NwaXrtC94zt0RA7tjuV3Olb/Oi/u29G3+9rnYM1WCI9m8c+7dBQzdqQeR6RkUnjQ</span></span>
<span class="line"><span style="color:#e1e4e8;">ug047qnQn7mYoiuA6azcw2vgAXX1mDBH+rYyn29UWmYioPrS7CIEBuxZbRZK3ndR</span></span>
<span class="line"><span style="color:#e1e4e8;">SfRs8pIi6ZdxYw08rIche/Ht9x3LRWvvT8exrAW7LnztHI3YmYz4pMTsGEs/UhEw</span></span>
<span class="line"><span style="color:#e1e4e8;">REGmwx6DWxawa/CgurKupZu6P9sEvVlugrpkM2AUITyy8eU9UYBXjLHfJIJENVb9</span></span>
<span class="line"><span style="color:#e1e4e8;">6fbTdCS8udttGq2IUBDe0ja6X+/nQDbwQJbY/dUCAwEAAaOCAsQwggLAMAwGA1Ud</span></span>
<span class="line"><span style="color:#e1e4e8;">EwEB/wQCMAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMA4GA1UdDwEB</span></span>
<span class="line"><span style="color:#e1e4e8;">/wQEAwIFoDA4BgNVHR8EMTAvMC2gK6AphidodHRwOi8vY3JsLmdvZGFkZHkuY29t</span></span>
<span class="line"><span style="color:#e1e4e8;">L2dkaWcyczEtMTYyOS5jcmwwXQYDVR0gBFYwVDBIBgtghkgBhv1tAQcXATA5MDcG</span></span>
<span class="line"><span style="color:#e1e4e8;">CCsGAQUFBwIBFitodHRwOi8vY2VydGlmaWNhdGVzLmdvZGFkZHkuY29tL3JlcG9z</span></span>
<span class="line"><span style="color:#e1e4e8;">aXRvcnkvMAgGBmeBDAECATB2BggrBgEFBQcBAQRqMGgwJAYIKwYBBQUHMAGGGGh0</span></span>
<span class="line"><span style="color:#e1e4e8;">dHA6Ly9vY3NwLmdvZGFkZHkuY29tLzBABggrBgEFBQcwAoY0aHR0cDovL2NlcnRp</span></span>
<span class="line"><span style="color:#e1e4e8;">ZmljYXRlcy5nb2RhZGR5LmNvbS9yZXBvc2l0b3J5L2dkaWcyLmNydDAfBgNVHSME</span></span>
<span class="line"><span style="color:#e1e4e8;">GDAWgBRAwr0njsw0gzCiM9f7bLPwtCyAzjApBgNVHREEIjAggg8qLmJpdGNvaW53</span></span>
<span class="line"><span style="color:#e1e4e8;">aW4uaW+CDWJpdGNvaW53aW4uaW8wHQYDVR0OBBYEFB0DZn+RDJqm+HakmikSsc4b</span></span>
<span class="line"><span style="color:#e1e4e8;">bA1jMIIBAwYKKwYBBAHWeQIEAgSB9ASB8QDvAHUApLkJkLQYWBSHuxOizGdwCjw1</span></span>
<span class="line"><span style="color:#e1e4e8;">mAT5G9+443fNDsgN3BAAAAFvhF5jdwAABAMARjBEAiBt4gu5ciVvYdTHVgpAmBMc</span></span>
<span class="line"><span style="color:#e1e4e8;">BEeb+qJc239BMD903MTMOgIgAc+35MY/9iDDPksQfb2rHoHQ3AM/ffL+vCVcEVN9</span></span>
<span class="line"><span style="color:#e1e4e8;">+qEAdgBElGUusO7Or8RAB9io/ijA2uaCvtjLMbU/0zOWtbaBqAAAAW+EXmSWAAAE</span></span>
<span class="line"><span style="color:#e1e4e8;">AwBHMEUCIHDyY9iPaImQ1ZBdc3dMhlKi1V8jSGPjdgdkwkL6Uw8xAiEAnJTJE5wU</span></span>
<span class="line"><span style="color:#e1e4e8;">Vi3vElEo0W1/9iopV38Bh8Sz/PUA7WKV5YkwDQYJKoZIhvcNAQELBQADggEBAGDq</span></span>
<span class="line"><span style="color:#e1e4e8;">0l3U1o0+QDVQnYGsY06ERTn095wnbaBCyGc/rfxJlrtixCBOMpzkL5Q6L2SkQOTj</span></span>
<span class="line"><span style="color:#e1e4e8;">9MUtqXHEh5rfpXwtY6J14ghZP/c/HWuBfkFR8Ba0AKf2obsICzJA6StI44VEv0XZ</span></span>
<span class="line"><span style="color:#e1e4e8;">JxP94B3HlfDTR1lcHS5VW88CqqEW13gtU6tF/RYmbO4uw6554pQyVllJw2EhYyNH</span></span>
<span class="line"><span style="color:#e1e4e8;">vRVi3RcmE+GKmG4ZJI98y5AeE8aOM7qIPc6RXRKM7JrlYRg43BeJXbrqaknq2tWN</span></span>
<span class="line"><span style="color:#e1e4e8;">euPrXC7/4KL/e9QAijdCA2qUkDWALJGkPrUUzIIAAgGaG1vYw37Y/Uk7XhJzMQ2U</span></span>
<span class="line"><span style="color:#e1e4e8;">oXEVzD9zAmOYdO2+i40=</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1 s:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#e1e4e8;">   i:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, CN = Go Daddy Root Certificate Authority - G2</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">MIIE0DCCA7igAwIBAgIBBzANBgkqhkiG9w0BAQsFADCBgzELMAkGA1UEBhMCVVMx</span></span>
<span class="line"><span style="color:#e1e4e8;">EDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxGjAYBgNVBAoT</span></span>
<span class="line"><span style="color:#e1e4e8;">EUdvRGFkZHkuY29tLCBJbmMuMTEwLwYDVQQDEyhHbyBEYWRkeSBSb290IENlcnRp</span></span>
<span class="line"><span style="color:#e1e4e8;">ZmljYXRlIEF1dGhvcml0eSAtIEcyMB4XDTExMDUwMzA3MDAwMFoXDTMxMDUwMzA3</span></span>
<span class="line"><span style="color:#e1e4e8;">MDAwMFowgbQxCzAJBgNVBAYTAlVTMRAwDgYDVQQIEwdBcml6b25hMRMwEQYDVQQH</span></span>
<span class="line"><span style="color:#e1e4e8;">EwpTY290dHNkYWxlMRowGAYDVQQKExFHb0RhZGR5LmNvbSwgSW5jLjEtMCsGA1UE</span></span>
<span class="line"><span style="color:#e1e4e8;">CxMkaHR0cDovL2NlcnRzLmdvZGFkZHkuY29tL3JlcG9zaXRvcnkvMTMwMQYDVQQD</span></span>
<span class="line"><span style="color:#e1e4e8;">EypHbyBEYWRkeSBTZWN1cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IC0gRzIwggEi</span></span>
<span class="line"><span style="color:#e1e4e8;">MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC54MsQ1K92vdSTYuswZLiBCGzD</span></span>
<span class="line"><span style="color:#e1e4e8;">BNliF44v/z5lz4/OYuY8UhzaFkVLVat4a2ODYpDOD2lsmcgaFItMzEUz6ojcnqOv</span></span>
<span class="line"><span style="color:#e1e4e8;">K/6AYZ15V8TPLvQ/MDxdR/yaFrzDN5ZBUY4RS1T4KL7QjL7wMDge87Am+GZHY23e</span></span>
<span class="line"><span style="color:#e1e4e8;">cSZHjzhHU9FGHbTj3ADqRay9vHHZqm8A29vNMDp5T19MR/gd71vCxJ1gO7GyQ5HY</span></span>
<span class="line"><span style="color:#e1e4e8;">pDNO6rPWJ0+tJYqlxvTV0KaudAVkV4i1RFXULSo6Pvi4vekyCgKUZMQWOlDxSq7n</span></span>
<span class="line"><span style="color:#e1e4e8;">eTOvDCAHf+jfBDnCaQJsY1L6d8EbyHSHyLmTGFBUNUtpTrw700kuH9zB0lL7AgMB</span></span>
<span class="line"><span style="color:#e1e4e8;">AAGjggEaMIIBFjAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBBjAdBgNV</span></span>
<span class="line"><span style="color:#e1e4e8;">HQ4EFgQUQMK9J47MNIMwojPX+2yz8LQsgM4wHwYDVR0jBBgwFoAUOpqFBxBnKLbv</span></span>
<span class="line"><span style="color:#e1e4e8;">9r0FQW4gwZTaD94wNAYIKwYBBQUHAQEEKDAmMCQGCCsGAQUFBzABhhhodHRwOi8v</span></span>
<span class="line"><span style="color:#e1e4e8;">b2NzcC5nb2RhZGR5LmNvbS8wNQYDVR0fBC4wLDAqoCigJoYkaHR0cDovL2NybC5n</span></span>
<span class="line"><span style="color:#e1e4e8;">b2RhZGR5LmNvbS9nZHJvb3QtZzIuY3JsMEYGA1UdIAQ/MD0wOwYEVR0gADAzMDEG</span></span>
<span class="line"><span style="color:#e1e4e8;">CCsGAQUFBwIBFiVodHRwczovL2NlcnRzLmdvZGFkZHkuY29tL3JlcG9zaXRvcnkv</span></span>
<span class="line"><span style="color:#e1e4e8;">MA0GCSqGSIb3DQEBCwUAA4IBAQAIfmyTEMg4uJapkEv/oV9PBO9sPpyIBslQj6Zz</span></span>
<span class="line"><span style="color:#e1e4e8;">91cxG7685C/b+LrTW+C05+Z5Yg4MotdqY3MxtfWoSKQ7CC2iXZDXtHwlTxFWMMS2</span></span>
<span class="line"><span style="color:#e1e4e8;">RJ17LJ3lXubvDGGqv+QqG+6EnriDfcFDzkSnE3ANkR/0yBOtg2DZ2HKocyQetawi</span></span>
<span class="line"><span style="color:#e1e4e8;">DsoXiWJYRBuriSUBAA/NxBti21G00w9RKpv0vHP8ds42pM3Z2Czqrpv1KrKQ0U11</span></span>
<span class="line"><span style="color:#e1e4e8;">GIo/ikGQI31bS/6kA1ibRrLDYGCD+H1QQc7CoZDDu+8CL9IVVO5EFdkKrqeKM+2x</span></span>
<span class="line"><span style="color:#e1e4e8;">LXY2JtwE65/3YR8V3Idv7kaWKK2hJn0KCacuBKONvPi8BDAB</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 2 s:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, CN = Go Daddy Root Certificate Authority - G2</span></span>
<span class="line"><span style="color:#e1e4e8;">   i:C = US, O = &quot;The Go Daddy Group, Inc.&quot;, OU = Go Daddy Class 2 Certification Authority</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">MIIEfTCCA2WgAwIBAgIDG+cVMA0GCSqGSIb3DQEBCwUAMGMxCzAJBgNVBAYTAlVT</span></span>
<span class="line"><span style="color:#e1e4e8;">MSEwHwYDVQQKExhUaGUgR28gRGFkZHkgR3JvdXAsIEluYy4xMTAvBgNVBAsTKEdv</span></span>
<span class="line"><span style="color:#e1e4e8;">IERhZGR5IENsYXNzIDIgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTQwMTAx</span></span>
<span class="line"><span style="color:#e1e4e8;">MDcwMDAwWhcNMzEwNTMwMDcwMDAwWjCBgzELMAkGA1UEBhMCVVMxEDAOBgNVBAgT</span></span>
<span class="line"><span style="color:#e1e4e8;">B0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxGjAYBgNVBAoTEUdvRGFkZHku</span></span>
<span class="line"><span style="color:#e1e4e8;">Y29tLCBJbmMuMTEwLwYDVQQDEyhHbyBEYWRkeSBSb290IENlcnRpZmljYXRlIEF1</span></span>
<span class="line"><span style="color:#e1e4e8;">dGhvcml0eSAtIEcyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv3Fi</span></span>
<span class="line"><span style="color:#e1e4e8;">CPH6WTT3G8kYo/eASVjpIoMTpsUgQwE7hPHmhUmfJ+r2hBtOoLTbcJjHMgGxBT4H</span></span>
<span class="line"><span style="color:#e1e4e8;">Tu70+k8vWTAi56sZVmvigAf88xZ1gDlRe+X5NbZ0TqmNghPktj+pA4P6or6KFWp/</span></span>
<span class="line"><span style="color:#e1e4e8;">3gvDthkUBcrqw6gElDtGfDIN8wBmIsiNaW02jBEYt9OyHGC0OPoCjM7T3UYH3go+</span></span>
<span class="line"><span style="color:#e1e4e8;">6118yHz7sCtTpJJiaVElBWEaRIGMLKlDliPfrDqBmg4pxRyp6V0etp6eMAo5zvGI</span></span>
<span class="line"><span style="color:#e1e4e8;">gPtLXcwy7IViQyU0AlYnAZG0O3AqP26x6JyIAX2f1PnbU21gnb8s51iruF9G/M7E</span></span>
<span class="line"><span style="color:#e1e4e8;">GwM8CetJMVxpRrPgRwIDAQABo4IBFzCCARMwDwYDVR0TAQH/BAUwAwEB/zAOBgNV</span></span>
<span class="line"><span style="color:#e1e4e8;">HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFDqahQcQZyi27/a9BUFuIMGU2g/eMB8GA1Ud</span></span>
<span class="line"><span style="color:#e1e4e8;">IwQYMBaAFNLEsNKR1EwRcbNhyz2h/t2oatTjMDQGCCsGAQUFBwEBBCgwJjAkBggr</span></span>
<span class="line"><span style="color:#e1e4e8;">BgEFBQcwAYYYaHR0cDovL29jc3AuZ29kYWRkeS5jb20vMDIGA1UdHwQrMCkwJ6Al</span></span>
<span class="line"><span style="color:#e1e4e8;">oCOGIWh0dHA6Ly9jcmwuZ29kYWRkeS5jb20vZ2Ryb290LmNybDBGBgNVHSAEPzA9</span></span>
<span class="line"><span style="color:#e1e4e8;">MDsGBFUdIAAwMzAxBggrBgEFBQcCARYlaHR0cHM6Ly9jZXJ0cy5nb2RhZGR5LmNv</span></span>
<span class="line"><span style="color:#e1e4e8;">bS9yZXBvc2l0b3J5LzANBgkqhkiG9w0BAQsFAAOCAQEAWQtTvZKGEacke+1bMc8d</span></span>
<span class="line"><span style="color:#e1e4e8;">H2xwxbhuvk679r6XUOEwf7ooXGKUwuN+M/f7QnaF25UcjCJYdQkMiGVnOQoWCcWg</span></span>
<span class="line"><span style="color:#e1e4e8;">OJekxSOTP7QYpgEGRJHjp2kntFolfzq3Ms3dhP8qOCkzpN1nsoX+oYggHFCJyNwq</span></span>
<span class="line"><span style="color:#e1e4e8;">9kIDN0zmiN/VryTyscPfzLXs4Jlet0lUIDyUGAzHHFIYSaRt4bNYC8nY7NmuHDKO</span></span>
<span class="line"><span style="color:#e1e4e8;">KHAN4v6mF56ED71XcLNa6R+ghlO773z/aQvgSMO3kwvIClTErF0UZzdsyqUvMQg3</span></span>
<span class="line"><span style="color:#e1e4e8;">qm5vjLyb4lddJIGvl5echK1srDdMZvNhkREg5L4wn3qkKQmw4TRfZHcYQFHfjDCm</span></span>
<span class="line"><span style="color:#e1e4e8;">rw==</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;"> 3 s:C = US, O = &quot;The Go Daddy Group, Inc.&quot;, OU = Go Daddy Class 2 Certification Authority</span></span>
<span class="line"><span style="color:#e1e4e8;">   i:C = US, O = &quot;The Go Daddy Group, Inc.&quot;, OU = Go Daddy Class 2 Certification Authority</span></span>
<span class="line"><span style="color:#e1e4e8;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">MIIEADCCAuigAwIBAgIBADANBgkqhkiG9w0BAQUFADBjMQswCQYDVQQGEwJVUzEh</span></span>
<span class="line"><span style="color:#e1e4e8;">MB8GA1UEChMYVGhlIEdvIERhZGR5IEdyb3VwLCBJbmMuMTEwLwYDVQQLEyhHbyBE</span></span>
<span class="line"><span style="color:#e1e4e8;">YWRkeSBDbGFzcyAyIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTA0MDYyOTE3</span></span>
<span class="line"><span style="color:#e1e4e8;">MDYyMFoXDTM0MDYyOTE3MDYyMFowYzELMAkGA1UEBhMCVVMxITAfBgNVBAoTGFRo</span></span>
<span class="line"><span style="color:#e1e4e8;">ZSBHbyBEYWRkeSBHcm91cCwgSW5jLjExMC8GA1UECxMoR28gRGFkZHkgQ2xhc3Mg</span></span>
<span class="line"><span style="color:#e1e4e8;">MiBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTCCASAwDQYJKoZIhvcNAQEBBQADggEN</span></span>
<span class="line"><span style="color:#e1e4e8;">ADCCAQgCggEBAN6d1+pXGEmhW+vXX0iG6r7d/+TvZxz0ZWizV3GgXne77ZtJ6XCA</span></span>
<span class="line"><span style="color:#e1e4e8;">PVYYYwhv2vLM0D9/AlQiVBDYsoHUwHU9S3/Hd8M+eKsaA7Ugay9qK7HFiH7Eux6w</span></span>
<span class="line"><span style="color:#e1e4e8;">wdhFJ2+qN1j3hybX2C32qRe3H3I2TqYXP2WYktsqbl2i/ojgC95/5Y0V4evLOtXi</span></span>
<span class="line"><span style="color:#e1e4e8;">EqITLdiOr18SPaAIBQi2XKVlOARFmR6jYGB0xUGlcmIbYsUfb18aQr4CUWWoriMY</span></span>
<span class="line"><span style="color:#e1e4e8;">avx4A6lNf4DD+qta/KFApMoZFv6yyO9ecw3ud72a9nmYvLEHZ6IVDd2gWMZEewo+</span></span>
<span class="line"><span style="color:#e1e4e8;">YihfukEHU1jPEX44dMX4/7VpkI+EdOqXG68CAQOjgcAwgb0wHQYDVR0OBBYEFNLE</span></span>
<span class="line"><span style="color:#e1e4e8;">sNKR1EwRcbNhyz2h/t2oatTjMIGNBgNVHSMEgYUwgYKAFNLEsNKR1EwRcbNhyz2h</span></span>
<span class="line"><span style="color:#e1e4e8;">/t2oatTjoWekZTBjMQswCQYDVQQGEwJVUzEhMB8GA1UEChMYVGhlIEdvIERhZGR5</span></span>
<span class="line"><span style="color:#e1e4e8;">IEdyb3VwLCBJbmMuMTEwLwYDVQQLEyhHbyBEYWRkeSBDbGFzcyAyIENlcnRpZmlj</span></span>
<span class="line"><span style="color:#e1e4e8;">YXRpb24gQXV0aG9yaXR5ggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQAD</span></span>
<span class="line"><span style="color:#e1e4e8;">ggEBADJL87LKPpH8EsahB4yOd6AzBhRckB4Y9wimPQoZ+YeAEW5p5JYXMP80kWNy</span></span>
<span class="line"><span style="color:#e1e4e8;">OO7MHAGjHZQopDH2esRU1/blMVgDoszOYtuURXO1v0XJJLXVggKtI3lpjbi2Tc7P</span></span>
<span class="line"><span style="color:#e1e4e8;">TMozI+gciKqdi0FuFskg5YmezTvacPd+mSYgFFQlq25zheabIZ0KbIIOqPjCDPoQ</span></span>
<span class="line"><span style="color:#e1e4e8;">HmyW74cNxA9hi63ugyuV+I6ShHI56yDqg+2DzZduCLzrTia2cyvk0/ZM/iZx4mER</span></span>
<span class="line"><span style="color:#e1e4e8;">dEr/VxqHD3VILs9RaRegAhJhldXRQLIQTO7ErBBDpqWeCtWVYpoNz4iCxTIM5Cuf</span></span>
<span class="line"><span style="color:#e1e4e8;">ReYNnyicsbkqWletNw+vHX/bvZ8=</span></span>
<span class="line"><span style="color:#e1e4e8;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">Server certificate</span></span>
<span class="line"><span style="color:#e1e4e8;">subject=OU = Domain Control Validated, CN = *.bitcoinwin.io</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">issuer=C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#e1e4e8;">Peer signing digest: SHA256</span></span>
<span class="line"><span style="color:#e1e4e8;">Peer signature type: RSA-PSS</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Temp Key: X25519, 253 bits</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL handshake has read 5693 bytes and written 410 bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">Verification: OK</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">New, TLSv1.2, Cipher is ECDHE-RSA-CHACHA20-POLY1305</span></span>
<span class="line"><span style="color:#e1e4e8;">Server public key is 2048 bit</span></span>
<span class="line"><span style="color:#e1e4e8;">Secure Renegotiation IS supported</span></span>
<span class="line"><span style="color:#e1e4e8;">Compression: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">Expansion: NONE</span></span>
<span class="line"><span style="color:#e1e4e8;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#e1e4e8;">SSL-Session:</span></span>
<span class="line"><span style="color:#e1e4e8;">    Protocol  : TLSv1.2</span></span>
<span class="line"><span style="color:#e1e4e8;">    Cipher    : ECDHE-RSA-CHACHA20-POLY1305</span></span>
<span class="line"><span style="color:#e1e4e8;">    Session-ID: 959412EF2EE6AAA15C723B577AF63A36AC2761C600948FC048EEF38813875637</span></span>
<span class="line"><span style="color:#e1e4e8;">    Session-ID-ctx: </span></span>
<span class="line"><span style="color:#e1e4e8;">    Master-Key: 66A51845AA2374CB7C565EE26F15D1B2DEFA1F4C36034F95331CC1E45C1B7D6BA48E45ACECDF7ED9AADC1CFE219D12F9</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    SRP username: None</span></span>
<span class="line"><span style="color:#e1e4e8;">    TLS session ticket lifetime hint: 300 (seconds)</span></span>
<span class="line"><span style="color:#e1e4e8;">    TLS session ticket:</span></span>
<span class="line"><span style="color:#e1e4e8;">    0000 - e2 bb 80 56 bb 80 7c 52-48 8d a0 fd d8 99 24 ce   ...V..|RH.....$.</span></span>
<span class="line"><span style="color:#e1e4e8;">    0010 - 80 0d 02 7a 81 d1 87 cc-8e a8 9a 6b a4 7f 75 db   ...z.......k..u.</span></span>
<span class="line"><span style="color:#e1e4e8;">    0020 - 8f cf e5 bb c2 11 24 82-f4 57 dc b6 18 6b 32 8c   ......$..W...k2.</span></span>
<span class="line"><span style="color:#e1e4e8;">    0030 - 53 6e 9c 1f 7c 89 0a f9-21 54 97 86 3f a2 38 02   Sn..|...!T..?.8.</span></span>
<span class="line"><span style="color:#e1e4e8;">    0040 - c1 b3 c1 31 2f d8 1c fb-96 dd 14 b3 f8 7b 6f a5   ...1/........{o.</span></span>
<span class="line"><span style="color:#e1e4e8;">    0050 - 9d 00 da d4 7c 40 2b 82-95 db 3c ec 33 80 74 25   ....|@+...&lt;.3.t%</span></span>
<span class="line"><span style="color:#e1e4e8;">    0060 - da 76 93 af 95 c0 da f9-77 69 77 93 bf 18 8a 9e   .v......wiw.....</span></span>
<span class="line"><span style="color:#e1e4e8;">    0070 - 5e 79 23 9e 74 34 fb 80-de dd 20 d6 aa 40 eb 64   ^y#.t4.... ..@.d</span></span>
<span class="line"><span style="color:#e1e4e8;">    0080 - ca 4b fe 21 40 7f de f3-5c e6 7f d7 e7 7d 5d cc   .K.!@...\\....}].</span></span>
<span class="line"><span style="color:#e1e4e8;">    0090 - e0 21 eb 8f 05 8c 25 56-59 b9 6c 8b 66 72 5f 3a   .!....%VY.l.fr_:</span></span>
<span class="line"><span style="color:#e1e4e8;">    00a0 - 69 c6 65 d1 bf b0 d2 dd-f3 f1 5a 2b c4 e1 d3 2a   i.e.......Z+...*</span></span>
<span class="line"><span style="color:#e1e4e8;">    00b0 - 15 e6 c9 9d 5d 82 b7 10-25 08 d4 8c 50 24 0d 3b   ....]...%...P$.;</span></span>
<span class="line"><span style="color:#e1e4e8;">    00c0 - 1c f1 0e 33 2e 54 dc c2-da 78 31 12 75 5d 04 2c   ...3.T...x1.u].,</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    Start Time: 1579080694</span></span>
<span class="line"><span style="color:#e1e4e8;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#e1e4e8;">    Verify return code: 0 (ok)</span></span>
<span class="line"><span style="color:#e1e4e8;">    Extended master secret: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">DONE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl s_client -connect xx.com:443 -showcerts &lt; /dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CONNECTED(00000004)</span></span>
<span class="line"><span style="color:#24292e;">depth=2 C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, CN = Go Daddy Root Certificate Authority - G2</span></span>
<span class="line"><span style="color:#24292e;">verify return:1</span></span>
<span class="line"><span style="color:#24292e;">depth=1 C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#24292e;">verify return:1</span></span>
<span class="line"><span style="color:#24292e;">depth=0 OU = Domain Control Validated, CN = *.bitcoinwin.io</span></span>
<span class="line"><span style="color:#24292e;">verify return:1</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">Certificate chain</span></span>
<span class="line"><span style="color:#24292e;"> 0 s:OU = Domain Control Validated, CN = *.bitcoinwin.io</span></span>
<span class="line"><span style="color:#24292e;">   i:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">MIIGOjCCBSKgAwIBAgIIHTBwaOYexGowDQYJKoZIhvcNAQELBQAwgbQxCzAJBgNV</span></span>
<span class="line"><span style="color:#24292e;">BAYTAlVTMRAwDgYDVQQIEwdBcml6b25hMRMwEQYDVQQHEwpTY290dHNkYWxlMRow</span></span>
<span class="line"><span style="color:#24292e;">GAYDVQQKExFHb0RhZGR5LmNvbSwgSW5jLjEtMCsGA1UECxMkaHR0cDovL2NlcnRz</span></span>
<span class="line"><span style="color:#24292e;">LmdvZGFkZHkuY29tL3JlcG9zaXRvcnkvMTMwMQYDVQQDEypHbyBEYWRkeSBTZWN1</span></span>
<span class="line"><span style="color:#24292e;">cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IC0gRzIwHhcNMjAwMTA4MDg1NjE1WhcN</span></span>
<span class="line"><span style="color:#24292e;">MjEwMjE4MDQxNjE3WjA9MSEwHwYDVQQLExhEb21haW4gQ29udHJvbCBWYWxpZGF0</span></span>
<span class="line"><span style="color:#24292e;">ZWQxGDAWBgNVBAMMDyouYml0Y29pbndpbi5pbzCCASIwDQYJKoZIhvcNAQEBBQAD</span></span>
<span class="line"><span style="color:#24292e;">ggEPADCCAQoCggEBAMEgX8NDssfFEwo3iA1fRNij9ZIRMS9EEtex5vrcwonVGf4F</span></span>
<span class="line"><span style="color:#24292e;">NwaXrtC94zt0RA7tjuV3Olb/Oi/u29G3+9rnYM1WCI9m8c+7dBQzdqQeR6RkUnjQ</span></span>
<span class="line"><span style="color:#24292e;">ug047qnQn7mYoiuA6azcw2vgAXX1mDBH+rYyn29UWmYioPrS7CIEBuxZbRZK3ndR</span></span>
<span class="line"><span style="color:#24292e;">SfRs8pIi6ZdxYw08rIche/Ht9x3LRWvvT8exrAW7LnztHI3YmYz4pMTsGEs/UhEw</span></span>
<span class="line"><span style="color:#24292e;">REGmwx6DWxawa/CgurKupZu6P9sEvVlugrpkM2AUITyy8eU9UYBXjLHfJIJENVb9</span></span>
<span class="line"><span style="color:#24292e;">6fbTdCS8udttGq2IUBDe0ja6X+/nQDbwQJbY/dUCAwEAAaOCAsQwggLAMAwGA1Ud</span></span>
<span class="line"><span style="color:#24292e;">EwEB/wQCMAAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMA4GA1UdDwEB</span></span>
<span class="line"><span style="color:#24292e;">/wQEAwIFoDA4BgNVHR8EMTAvMC2gK6AphidodHRwOi8vY3JsLmdvZGFkZHkuY29t</span></span>
<span class="line"><span style="color:#24292e;">L2dkaWcyczEtMTYyOS5jcmwwXQYDVR0gBFYwVDBIBgtghkgBhv1tAQcXATA5MDcG</span></span>
<span class="line"><span style="color:#24292e;">CCsGAQUFBwIBFitodHRwOi8vY2VydGlmaWNhdGVzLmdvZGFkZHkuY29tL3JlcG9z</span></span>
<span class="line"><span style="color:#24292e;">aXRvcnkvMAgGBmeBDAECATB2BggrBgEFBQcBAQRqMGgwJAYIKwYBBQUHMAGGGGh0</span></span>
<span class="line"><span style="color:#24292e;">dHA6Ly9vY3NwLmdvZGFkZHkuY29tLzBABggrBgEFBQcwAoY0aHR0cDovL2NlcnRp</span></span>
<span class="line"><span style="color:#24292e;">ZmljYXRlcy5nb2RhZGR5LmNvbS9yZXBvc2l0b3J5L2dkaWcyLmNydDAfBgNVHSME</span></span>
<span class="line"><span style="color:#24292e;">GDAWgBRAwr0njsw0gzCiM9f7bLPwtCyAzjApBgNVHREEIjAggg8qLmJpdGNvaW53</span></span>
<span class="line"><span style="color:#24292e;">aW4uaW+CDWJpdGNvaW53aW4uaW8wHQYDVR0OBBYEFB0DZn+RDJqm+HakmikSsc4b</span></span>
<span class="line"><span style="color:#24292e;">bA1jMIIBAwYKKwYBBAHWeQIEAgSB9ASB8QDvAHUApLkJkLQYWBSHuxOizGdwCjw1</span></span>
<span class="line"><span style="color:#24292e;">mAT5G9+443fNDsgN3BAAAAFvhF5jdwAABAMARjBEAiBt4gu5ciVvYdTHVgpAmBMc</span></span>
<span class="line"><span style="color:#24292e;">BEeb+qJc239BMD903MTMOgIgAc+35MY/9iDDPksQfb2rHoHQ3AM/ffL+vCVcEVN9</span></span>
<span class="line"><span style="color:#24292e;">+qEAdgBElGUusO7Or8RAB9io/ijA2uaCvtjLMbU/0zOWtbaBqAAAAW+EXmSWAAAE</span></span>
<span class="line"><span style="color:#24292e;">AwBHMEUCIHDyY9iPaImQ1ZBdc3dMhlKi1V8jSGPjdgdkwkL6Uw8xAiEAnJTJE5wU</span></span>
<span class="line"><span style="color:#24292e;">Vi3vElEo0W1/9iopV38Bh8Sz/PUA7WKV5YkwDQYJKoZIhvcNAQELBQADggEBAGDq</span></span>
<span class="line"><span style="color:#24292e;">0l3U1o0+QDVQnYGsY06ERTn095wnbaBCyGc/rfxJlrtixCBOMpzkL5Q6L2SkQOTj</span></span>
<span class="line"><span style="color:#24292e;">9MUtqXHEh5rfpXwtY6J14ghZP/c/HWuBfkFR8Ba0AKf2obsICzJA6StI44VEv0XZ</span></span>
<span class="line"><span style="color:#24292e;">JxP94B3HlfDTR1lcHS5VW88CqqEW13gtU6tF/RYmbO4uw6554pQyVllJw2EhYyNH</span></span>
<span class="line"><span style="color:#24292e;">vRVi3RcmE+GKmG4ZJI98y5AeE8aOM7qIPc6RXRKM7JrlYRg43BeJXbrqaknq2tWN</span></span>
<span class="line"><span style="color:#24292e;">euPrXC7/4KL/e9QAijdCA2qUkDWALJGkPrUUzIIAAgGaG1vYw37Y/Uk7XhJzMQ2U</span></span>
<span class="line"><span style="color:#24292e;">oXEVzD9zAmOYdO2+i40=</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;"> 1 s:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#24292e;">   i:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, CN = Go Daddy Root Certificate Authority - G2</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">MIIE0DCCA7igAwIBAgIBBzANBgkqhkiG9w0BAQsFADCBgzELMAkGA1UEBhMCVVMx</span></span>
<span class="line"><span style="color:#24292e;">EDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxGjAYBgNVBAoT</span></span>
<span class="line"><span style="color:#24292e;">EUdvRGFkZHkuY29tLCBJbmMuMTEwLwYDVQQDEyhHbyBEYWRkeSBSb290IENlcnRp</span></span>
<span class="line"><span style="color:#24292e;">ZmljYXRlIEF1dGhvcml0eSAtIEcyMB4XDTExMDUwMzA3MDAwMFoXDTMxMDUwMzA3</span></span>
<span class="line"><span style="color:#24292e;">MDAwMFowgbQxCzAJBgNVBAYTAlVTMRAwDgYDVQQIEwdBcml6b25hMRMwEQYDVQQH</span></span>
<span class="line"><span style="color:#24292e;">EwpTY290dHNkYWxlMRowGAYDVQQKExFHb0RhZGR5LmNvbSwgSW5jLjEtMCsGA1UE</span></span>
<span class="line"><span style="color:#24292e;">CxMkaHR0cDovL2NlcnRzLmdvZGFkZHkuY29tL3JlcG9zaXRvcnkvMTMwMQYDVQQD</span></span>
<span class="line"><span style="color:#24292e;">EypHbyBEYWRkeSBTZWN1cmUgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IC0gRzIwggEi</span></span>
<span class="line"><span style="color:#24292e;">MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC54MsQ1K92vdSTYuswZLiBCGzD</span></span>
<span class="line"><span style="color:#24292e;">BNliF44v/z5lz4/OYuY8UhzaFkVLVat4a2ODYpDOD2lsmcgaFItMzEUz6ojcnqOv</span></span>
<span class="line"><span style="color:#24292e;">K/6AYZ15V8TPLvQ/MDxdR/yaFrzDN5ZBUY4RS1T4KL7QjL7wMDge87Am+GZHY23e</span></span>
<span class="line"><span style="color:#24292e;">cSZHjzhHU9FGHbTj3ADqRay9vHHZqm8A29vNMDp5T19MR/gd71vCxJ1gO7GyQ5HY</span></span>
<span class="line"><span style="color:#24292e;">pDNO6rPWJ0+tJYqlxvTV0KaudAVkV4i1RFXULSo6Pvi4vekyCgKUZMQWOlDxSq7n</span></span>
<span class="line"><span style="color:#24292e;">eTOvDCAHf+jfBDnCaQJsY1L6d8EbyHSHyLmTGFBUNUtpTrw700kuH9zB0lL7AgMB</span></span>
<span class="line"><span style="color:#24292e;">AAGjggEaMIIBFjAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBBjAdBgNV</span></span>
<span class="line"><span style="color:#24292e;">HQ4EFgQUQMK9J47MNIMwojPX+2yz8LQsgM4wHwYDVR0jBBgwFoAUOpqFBxBnKLbv</span></span>
<span class="line"><span style="color:#24292e;">9r0FQW4gwZTaD94wNAYIKwYBBQUHAQEEKDAmMCQGCCsGAQUFBzABhhhodHRwOi8v</span></span>
<span class="line"><span style="color:#24292e;">b2NzcC5nb2RhZGR5LmNvbS8wNQYDVR0fBC4wLDAqoCigJoYkaHR0cDovL2NybC5n</span></span>
<span class="line"><span style="color:#24292e;">b2RhZGR5LmNvbS9nZHJvb3QtZzIuY3JsMEYGA1UdIAQ/MD0wOwYEVR0gADAzMDEG</span></span>
<span class="line"><span style="color:#24292e;">CCsGAQUFBwIBFiVodHRwczovL2NlcnRzLmdvZGFkZHkuY29tL3JlcG9zaXRvcnkv</span></span>
<span class="line"><span style="color:#24292e;">MA0GCSqGSIb3DQEBCwUAA4IBAQAIfmyTEMg4uJapkEv/oV9PBO9sPpyIBslQj6Zz</span></span>
<span class="line"><span style="color:#24292e;">91cxG7685C/b+LrTW+C05+Z5Yg4MotdqY3MxtfWoSKQ7CC2iXZDXtHwlTxFWMMS2</span></span>
<span class="line"><span style="color:#24292e;">RJ17LJ3lXubvDGGqv+QqG+6EnriDfcFDzkSnE3ANkR/0yBOtg2DZ2HKocyQetawi</span></span>
<span class="line"><span style="color:#24292e;">DsoXiWJYRBuriSUBAA/NxBti21G00w9RKpv0vHP8ds42pM3Z2Czqrpv1KrKQ0U11</span></span>
<span class="line"><span style="color:#24292e;">GIo/ikGQI31bS/6kA1ibRrLDYGCD+H1QQc7CoZDDu+8CL9IVVO5EFdkKrqeKM+2x</span></span>
<span class="line"><span style="color:#24292e;">LXY2JtwE65/3YR8V3Idv7kaWKK2hJn0KCacuBKONvPi8BDAB</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;"> 2 s:C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, CN = Go Daddy Root Certificate Authority - G2</span></span>
<span class="line"><span style="color:#24292e;">   i:C = US, O = &quot;The Go Daddy Group, Inc.&quot;, OU = Go Daddy Class 2 Certification Authority</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">MIIEfTCCA2WgAwIBAgIDG+cVMA0GCSqGSIb3DQEBCwUAMGMxCzAJBgNVBAYTAlVT</span></span>
<span class="line"><span style="color:#24292e;">MSEwHwYDVQQKExhUaGUgR28gRGFkZHkgR3JvdXAsIEluYy4xMTAvBgNVBAsTKEdv</span></span>
<span class="line"><span style="color:#24292e;">IERhZGR5IENsYXNzIDIgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTQwMTAx</span></span>
<span class="line"><span style="color:#24292e;">MDcwMDAwWhcNMzEwNTMwMDcwMDAwWjCBgzELMAkGA1UEBhMCVVMxEDAOBgNVBAgT</span></span>
<span class="line"><span style="color:#24292e;">B0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxGjAYBgNVBAoTEUdvRGFkZHku</span></span>
<span class="line"><span style="color:#24292e;">Y29tLCBJbmMuMTEwLwYDVQQDEyhHbyBEYWRkeSBSb290IENlcnRpZmljYXRlIEF1</span></span>
<span class="line"><span style="color:#24292e;">dGhvcml0eSAtIEcyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv3Fi</span></span>
<span class="line"><span style="color:#24292e;">CPH6WTT3G8kYo/eASVjpIoMTpsUgQwE7hPHmhUmfJ+r2hBtOoLTbcJjHMgGxBT4H</span></span>
<span class="line"><span style="color:#24292e;">Tu70+k8vWTAi56sZVmvigAf88xZ1gDlRe+X5NbZ0TqmNghPktj+pA4P6or6KFWp/</span></span>
<span class="line"><span style="color:#24292e;">3gvDthkUBcrqw6gElDtGfDIN8wBmIsiNaW02jBEYt9OyHGC0OPoCjM7T3UYH3go+</span></span>
<span class="line"><span style="color:#24292e;">6118yHz7sCtTpJJiaVElBWEaRIGMLKlDliPfrDqBmg4pxRyp6V0etp6eMAo5zvGI</span></span>
<span class="line"><span style="color:#24292e;">gPtLXcwy7IViQyU0AlYnAZG0O3AqP26x6JyIAX2f1PnbU21gnb8s51iruF9G/M7E</span></span>
<span class="line"><span style="color:#24292e;">GwM8CetJMVxpRrPgRwIDAQABo4IBFzCCARMwDwYDVR0TAQH/BAUwAwEB/zAOBgNV</span></span>
<span class="line"><span style="color:#24292e;">HQ8BAf8EBAMCAQYwHQYDVR0OBBYEFDqahQcQZyi27/a9BUFuIMGU2g/eMB8GA1Ud</span></span>
<span class="line"><span style="color:#24292e;">IwQYMBaAFNLEsNKR1EwRcbNhyz2h/t2oatTjMDQGCCsGAQUFBwEBBCgwJjAkBggr</span></span>
<span class="line"><span style="color:#24292e;">BgEFBQcwAYYYaHR0cDovL29jc3AuZ29kYWRkeS5jb20vMDIGA1UdHwQrMCkwJ6Al</span></span>
<span class="line"><span style="color:#24292e;">oCOGIWh0dHA6Ly9jcmwuZ29kYWRkeS5jb20vZ2Ryb290LmNybDBGBgNVHSAEPzA9</span></span>
<span class="line"><span style="color:#24292e;">MDsGBFUdIAAwMzAxBggrBgEFBQcCARYlaHR0cHM6Ly9jZXJ0cy5nb2RhZGR5LmNv</span></span>
<span class="line"><span style="color:#24292e;">bS9yZXBvc2l0b3J5LzANBgkqhkiG9w0BAQsFAAOCAQEAWQtTvZKGEacke+1bMc8d</span></span>
<span class="line"><span style="color:#24292e;">H2xwxbhuvk679r6XUOEwf7ooXGKUwuN+M/f7QnaF25UcjCJYdQkMiGVnOQoWCcWg</span></span>
<span class="line"><span style="color:#24292e;">OJekxSOTP7QYpgEGRJHjp2kntFolfzq3Ms3dhP8qOCkzpN1nsoX+oYggHFCJyNwq</span></span>
<span class="line"><span style="color:#24292e;">9kIDN0zmiN/VryTyscPfzLXs4Jlet0lUIDyUGAzHHFIYSaRt4bNYC8nY7NmuHDKO</span></span>
<span class="line"><span style="color:#24292e;">KHAN4v6mF56ED71XcLNa6R+ghlO773z/aQvgSMO3kwvIClTErF0UZzdsyqUvMQg3</span></span>
<span class="line"><span style="color:#24292e;">qm5vjLyb4lddJIGvl5echK1srDdMZvNhkREg5L4wn3qkKQmw4TRfZHcYQFHfjDCm</span></span>
<span class="line"><span style="color:#24292e;">rw==</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;"> 3 s:C = US, O = &quot;The Go Daddy Group, Inc.&quot;, OU = Go Daddy Class 2 Certification Authority</span></span>
<span class="line"><span style="color:#24292e;">   i:C = US, O = &quot;The Go Daddy Group, Inc.&quot;, OU = Go Daddy Class 2 Certification Authority</span></span>
<span class="line"><span style="color:#24292e;">-----BEGIN CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">MIIEADCCAuigAwIBAgIBADANBgkqhkiG9w0BAQUFADBjMQswCQYDVQQGEwJVUzEh</span></span>
<span class="line"><span style="color:#24292e;">MB8GA1UEChMYVGhlIEdvIERhZGR5IEdyb3VwLCBJbmMuMTEwLwYDVQQLEyhHbyBE</span></span>
<span class="line"><span style="color:#24292e;">YWRkeSBDbGFzcyAyIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MB4XDTA0MDYyOTE3</span></span>
<span class="line"><span style="color:#24292e;">MDYyMFoXDTM0MDYyOTE3MDYyMFowYzELMAkGA1UEBhMCVVMxITAfBgNVBAoTGFRo</span></span>
<span class="line"><span style="color:#24292e;">ZSBHbyBEYWRkeSBHcm91cCwgSW5jLjExMC8GA1UECxMoR28gRGFkZHkgQ2xhc3Mg</span></span>
<span class="line"><span style="color:#24292e;">MiBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTCCASAwDQYJKoZIhvcNAQEBBQADggEN</span></span>
<span class="line"><span style="color:#24292e;">ADCCAQgCggEBAN6d1+pXGEmhW+vXX0iG6r7d/+TvZxz0ZWizV3GgXne77ZtJ6XCA</span></span>
<span class="line"><span style="color:#24292e;">PVYYYwhv2vLM0D9/AlQiVBDYsoHUwHU9S3/Hd8M+eKsaA7Ugay9qK7HFiH7Eux6w</span></span>
<span class="line"><span style="color:#24292e;">wdhFJ2+qN1j3hybX2C32qRe3H3I2TqYXP2WYktsqbl2i/ojgC95/5Y0V4evLOtXi</span></span>
<span class="line"><span style="color:#24292e;">EqITLdiOr18SPaAIBQi2XKVlOARFmR6jYGB0xUGlcmIbYsUfb18aQr4CUWWoriMY</span></span>
<span class="line"><span style="color:#24292e;">avx4A6lNf4DD+qta/KFApMoZFv6yyO9ecw3ud72a9nmYvLEHZ6IVDd2gWMZEewo+</span></span>
<span class="line"><span style="color:#24292e;">YihfukEHU1jPEX44dMX4/7VpkI+EdOqXG68CAQOjgcAwgb0wHQYDVR0OBBYEFNLE</span></span>
<span class="line"><span style="color:#24292e;">sNKR1EwRcbNhyz2h/t2oatTjMIGNBgNVHSMEgYUwgYKAFNLEsNKR1EwRcbNhyz2h</span></span>
<span class="line"><span style="color:#24292e;">/t2oatTjoWekZTBjMQswCQYDVQQGEwJVUzEhMB8GA1UEChMYVGhlIEdvIERhZGR5</span></span>
<span class="line"><span style="color:#24292e;">IEdyb3VwLCBJbmMuMTEwLwYDVQQLEyhHbyBEYWRkeSBDbGFzcyAyIENlcnRpZmlj</span></span>
<span class="line"><span style="color:#24292e;">YXRpb24gQXV0aG9yaXR5ggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEFBQAD</span></span>
<span class="line"><span style="color:#24292e;">ggEBADJL87LKPpH8EsahB4yOd6AzBhRckB4Y9wimPQoZ+YeAEW5p5JYXMP80kWNy</span></span>
<span class="line"><span style="color:#24292e;">OO7MHAGjHZQopDH2esRU1/blMVgDoszOYtuURXO1v0XJJLXVggKtI3lpjbi2Tc7P</span></span>
<span class="line"><span style="color:#24292e;">TMozI+gciKqdi0FuFskg5YmezTvacPd+mSYgFFQlq25zheabIZ0KbIIOqPjCDPoQ</span></span>
<span class="line"><span style="color:#24292e;">HmyW74cNxA9hi63ugyuV+I6ShHI56yDqg+2DzZduCLzrTia2cyvk0/ZM/iZx4mER</span></span>
<span class="line"><span style="color:#24292e;">dEr/VxqHD3VILs9RaRegAhJhldXRQLIQTO7ErBBDpqWeCtWVYpoNz4iCxTIM5Cuf</span></span>
<span class="line"><span style="color:#24292e;">ReYNnyicsbkqWletNw+vHX/bvZ8=</span></span>
<span class="line"><span style="color:#24292e;">-----END CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">Server certificate</span></span>
<span class="line"><span style="color:#24292e;">subject=OU = Domain Control Validated, CN = *.bitcoinwin.io</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">issuer=C = US, ST = Arizona, L = Scottsdale, O = &quot;GoDaddy.com, Inc.&quot;, OU = http://certs.godaddy.com/repository/, CN = Go Daddy Secure Certificate Authority - G2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">No client certificate CA names sent</span></span>
<span class="line"><span style="color:#24292e;">Peer signing digest: SHA256</span></span>
<span class="line"><span style="color:#24292e;">Peer signature type: RSA-PSS</span></span>
<span class="line"><span style="color:#24292e;">Server Temp Key: X25519, 253 bits</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">SSL handshake has read 5693 bytes and written 410 bytes</span></span>
<span class="line"><span style="color:#24292e;">Verification: OK</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">New, TLSv1.2, Cipher is ECDHE-RSA-CHACHA20-POLY1305</span></span>
<span class="line"><span style="color:#24292e;">Server public key is 2048 bit</span></span>
<span class="line"><span style="color:#24292e;">Secure Renegotiation IS supported</span></span>
<span class="line"><span style="color:#24292e;">Compression: NONE</span></span>
<span class="line"><span style="color:#24292e;">Expansion: NONE</span></span>
<span class="line"><span style="color:#24292e;">No ALPN negotiated</span></span>
<span class="line"><span style="color:#24292e;">SSL-Session:</span></span>
<span class="line"><span style="color:#24292e;">    Protocol  : TLSv1.2</span></span>
<span class="line"><span style="color:#24292e;">    Cipher    : ECDHE-RSA-CHACHA20-POLY1305</span></span>
<span class="line"><span style="color:#24292e;">    Session-ID: 959412EF2EE6AAA15C723B577AF63A36AC2761C600948FC048EEF38813875637</span></span>
<span class="line"><span style="color:#24292e;">    Session-ID-ctx: </span></span>
<span class="line"><span style="color:#24292e;">    Master-Key: 66A51845AA2374CB7C565EE26F15D1B2DEFA1F4C36034F95331CC1E45C1B7D6BA48E45ACECDF7ED9AADC1CFE219D12F9</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity: None</span></span>
<span class="line"><span style="color:#24292e;">    PSK identity hint: None</span></span>
<span class="line"><span style="color:#24292e;">    SRP username: None</span></span>
<span class="line"><span style="color:#24292e;">    TLS session ticket lifetime hint: 300 (seconds)</span></span>
<span class="line"><span style="color:#24292e;">    TLS session ticket:</span></span>
<span class="line"><span style="color:#24292e;">    0000 - e2 bb 80 56 bb 80 7c 52-48 8d a0 fd d8 99 24 ce   ...V..|RH.....$.</span></span>
<span class="line"><span style="color:#24292e;">    0010 - 80 0d 02 7a 81 d1 87 cc-8e a8 9a 6b a4 7f 75 db   ...z.......k..u.</span></span>
<span class="line"><span style="color:#24292e;">    0020 - 8f cf e5 bb c2 11 24 82-f4 57 dc b6 18 6b 32 8c   ......$..W...k2.</span></span>
<span class="line"><span style="color:#24292e;">    0030 - 53 6e 9c 1f 7c 89 0a f9-21 54 97 86 3f a2 38 02   Sn..|...!T..?.8.</span></span>
<span class="line"><span style="color:#24292e;">    0040 - c1 b3 c1 31 2f d8 1c fb-96 dd 14 b3 f8 7b 6f a5   ...1/........{o.</span></span>
<span class="line"><span style="color:#24292e;">    0050 - 9d 00 da d4 7c 40 2b 82-95 db 3c ec 33 80 74 25   ....|@+...&lt;.3.t%</span></span>
<span class="line"><span style="color:#24292e;">    0060 - da 76 93 af 95 c0 da f9-77 69 77 93 bf 18 8a 9e   .v......wiw.....</span></span>
<span class="line"><span style="color:#24292e;">    0070 - 5e 79 23 9e 74 34 fb 80-de dd 20 d6 aa 40 eb 64   ^y#.t4.... ..@.d</span></span>
<span class="line"><span style="color:#24292e;">    0080 - ca 4b fe 21 40 7f de f3-5c e6 7f d7 e7 7d 5d cc   .K.!@...\\....}].</span></span>
<span class="line"><span style="color:#24292e;">    0090 - e0 21 eb 8f 05 8c 25 56-59 b9 6c 8b 66 72 5f 3a   .!....%VY.l.fr_:</span></span>
<span class="line"><span style="color:#24292e;">    00a0 - 69 c6 65 d1 bf b0 d2 dd-f3 f1 5a 2b c4 e1 d3 2a   i.e.......Z+...*</span></span>
<span class="line"><span style="color:#24292e;">    00b0 - 15 e6 c9 9d 5d 82 b7 10-25 08 d4 8c 50 24 0d 3b   ....]...%...P$.;</span></span>
<span class="line"><span style="color:#24292e;">    00c0 - 1c f1 0e 33 2e 54 dc c2-da 78 31 12 75 5d 04 2c   ...3.T...x1.u].,</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    Start Time: 1579080694</span></span>
<span class="line"><span style="color:#24292e;">    Timeout   : 7200 (sec)</span></span>
<span class="line"><span style="color:#24292e;">    Verify return code: 0 (ok)</span></span>
<span class="line"><span style="color:#24292e;">    Extended master secret: yes</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">DONE</span></span></code></pre></div><p>编号为 0 的证书是站点证书；</p><p>编号为 1 的证书是中间证书</p><p>我的证书链一共是三级，服务端只需要发送两个证书，对于四级证书链，服务端就需要发送三个证书了。总之，只有根证书无需发送</p><p>将站点证书保存为 site.pem；中间证书保存为 intermediate.pem（如果有多个中间证书，按照子证书在上的顺序保存）；再从系统中导出对应的根证书存为 root.pem。这样，证书链上的所有证书都搞定了。为了确保无误，建议再验证一下每个证书的 Common Name：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ openssl x509 -in site.pem -noout -subject</span></span>
<span class="line"><span style="color:#e1e4e8;">subject= /CN=www.imququ.com</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ openssl x509 -in intermediate.pem -noout -subject</span></span>
<span class="line"><span style="color:#e1e4e8;">subject= /C=US/O=GeoTrust Inc./CN=RapidSSL SHA256 CA - G4</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ openssl x509 -in root.pem -noout -subject</span></span>
<span class="line"><span style="color:#e1e4e8;">subject= /C=US/O=GeoTrust Inc./OU=(c) 2008 GeoTrust Inc. - For authorized use only/CN=GeoTrust Primary Certification Authority - G3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ openssl x509 -in site.pem -noout -subject</span></span>
<span class="line"><span style="color:#24292e;">subject= /CN=www.imququ.com</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ openssl x509 -in intermediate.pem -noout -subject</span></span>
<span class="line"><span style="color:#24292e;">subject= /C=US/O=GeoTrust Inc./CN=RapidSSL SHA256 CA - G4</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ openssl x509 -in root.pem -noout -subject</span></span>
<span class="line"><span style="color:#24292e;">subject= /C=US/O=GeoTrust Inc./OU=(c) 2008 GeoTrust Inc. - For authorized use only/CN=GeoTrust Primary Certification Authority - G3</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl x509 -in site.pem -noout -subject</span></span>
<span class="line"><span style="color:#e1e4e8;">openssl x509 -in intermediate.pem -noout -subject</span></span>
<span class="line"><span style="color:#e1e4e8;">openssl x509 -in site.pem -noout -ocsp_uri</span></span>
<span class="line"><span style="color:#e1e4e8;">openssl ocsp -issuer intermediate.pem -cert site.pem -no_nonce -text -url http://ocsp.godaddy.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl x509 -in site.pem -noout -subject</span></span>
<span class="line"><span style="color:#24292e;">openssl x509 -in intermediate.pem -noout -subject</span></span>
<span class="line"><span style="color:#24292e;">openssl x509 -in site.pem -noout -ocsp_uri</span></span>
<span class="line"><span style="color:#24292e;">openssl ocsp -issuer intermediate.pem -cert site.pem -no_nonce -text -url http://ocsp.godaddy.com</span></span></code></pre></div><ul><li>完整配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">     ssl_session_cache   shared:SSL:20m;</span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_session_timeout 4h;</span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_prefer_server_ciphers on;  # prefer a list of ciphers to prevent old and slow ciphers</span></span>
<span class="line"><span style="color:#e1e4e8;">     ssl_ciphers &#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    charset utf-8;</span></span>
<span class="line"><span style="color:#e1e4e8;"> 	ssl_certificate /data/apps/nginx/ssl/domain.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_certificate_key /data/apps/nginx/ssl/domain.key;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	# OCSP</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_stapling on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_stapling_file /data/apps/nginx/ssl/stapling_ocsp;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_trusted_certificate  /data/apps/nginx/ssl/domain.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	resolver 8.8.8.8 valid=300s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	resolver_timeout 2s;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        ssl_buffer_size 4k;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">     ssl_session_cache   shared:SSL:20m;</span></span>
<span class="line"><span style="color:#24292e;">     ssl_session_timeout 4h;</span></span>
<span class="line"><span style="color:#24292e;">     ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">     ssl_prefer_server_ciphers on;  # prefer a list of ciphers to prevent old and slow ciphers</span></span>
<span class="line"><span style="color:#24292e;">     ssl_ciphers &#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    charset utf-8;</span></span>
<span class="line"><span style="color:#24292e;"> 	ssl_certificate /data/apps/nginx/ssl/domain.crt;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_certificate_key /data/apps/nginx/ssl/domain.key;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	# OCSP</span></span>
<span class="line"><span style="color:#24292e;">    ssl_stapling on;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_stapling_verify on;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_stapling_file /data/apps/nginx/ssl/stapling_ocsp;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_trusted_certificate  /data/apps/nginx/ssl/domain.crt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	resolver 8.8.8.8 valid=300s;</span></span>
<span class="line"><span style="color:#24292e;">	resolver_timeout 2s;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        ssl_buffer_size 4k;</span></span></code></pre></div><h1 id="测试带宽" tabindex="-1">测试带宽 <a class="header-anchor" href="#测试带宽" aria-label="Permalink to &quot;测试带宽&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ wget -O=/dev/null http://url/download.tgz</span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -o /dev/null http://url/download.tgz</span></span>
<span class="line"><span style="color:#e1e4e8;">$ scp download.tgz jaseywang@host-2:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ wget -O=/dev/null http://url/download.tgz</span></span>
<span class="line"><span style="color:#24292e;">$ curl -o /dev/null http://url/download.tgz</span></span>
<span class="line"><span style="color:#24292e;">$ scp download.tgz jaseywang@host-2:</span></span></code></pre></div><p><a href="https://quchao.com/entry/how-to-configure-ocsp-stapling-on-nginx-for-the-certificates-issued-by-lets-encrypt/" target="_blank" rel="noreferrer">https://quchao.com/entry/how-to-configure-ocsp-stapling-on-nginx-for-the-certificates-issued-by-lets-encrypt/</a></p>`,33),o=[p];function c(t,i,r,y,A,d){return n(),a("div",null,o)}const B=s(l,[["render",c]]);export{g as __pageData,B as default};
