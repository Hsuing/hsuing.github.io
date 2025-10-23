import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const p="/assets/vmess.OOyV-RI7.jpg",u=JSON.parse('{"title":"1.安装acme","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/25_vmess.md","filePath":"guide/Linux/vpn/25_vmess.md","lastUpdated":1736935968000}'),o={name:"guide/Linux/vpn/25_vmess.md"},e=l(`<p><a href="https://github.com/v2fly/fhs-install-v2ray" target="_blank" rel="noreferrer">https://github.com/v2fly/fhs-install-v2ray</a></p><h1 id="_1-安装acme" tabindex="-1">1.安装acme <a class="header-anchor" href="#_1-安装acme" aria-label="Permalink to &quot;1.安装acme&quot;">​</a></h1><p>ubuntu系统</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">安装acme:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://get.acme.sh</span></span>
<span class="line"><span style="color:#B392F0;">安装socat:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">socat</span></span>
<span class="line"><span style="color:#B392F0;">添加软链接:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ln</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-s</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/.acme.sh/acme.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/bin/acme.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">安装acme:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">curl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://get.acme.sh</span></span>
<span class="line"><span style="color:#6F42C1;">安装socat:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">socat</span></span>
<span class="line"><span style="color:#6F42C1;">添加软链接:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ln</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-s</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/.acme.sh/acme.sh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/bin/acme.sh</span></span></code></pre></div><h1 id="_2-注册账号" tabindex="-1">2.注册账号 <a class="header-anchor" href="#_2-注册账号" aria-label="Permalink to &quot;2.注册账号&quot;">​</a></h1><p>语法：</p><p>acme.sh --register-account -m <a href="mailto:my@example.com" target="_blank" rel="noreferrer">my@example.com</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@iZj6c9jm2xw77w13d79ecbZ:~/vmess# acme.sh --register-account -m hsuing.hx@southhere.com</span></span>
<span class="line"><span style="color:#e1e4e8;">[Wed Apr  5 11:29:58 CST 2023] Create account key ok.</span></span>
<span class="line"><span style="color:#e1e4e8;">[Wed Apr  5 11:29:58 CST 2023] No EAB credentials found for ZeroSSL, let&#39;s get one</span></span>
<span class="line"><span style="color:#e1e4e8;">[Wed Apr  5 11:30:00 CST 2023] Registering account: https://acme.zerossl.com/v2/DV90</span></span>
<span class="line"><span style="color:#e1e4e8;">[Wed Apr  5 11:30:02 CST 2023] Registered</span></span>
<span class="line"><span style="color:#e1e4e8;">[Wed Apr  5 11:30:02 CST 2023] ACCOUNT_THUMBPRINT=&#39;ToJqC_RoEYD0hNcJp7zkhsDchWtsVIPrT65yHWcEyqU&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@iZj6c9jm2xw77w13d79ecbZ:~/vmess# acme.sh --register-account -m hsuing.hx@southhere.com</span></span>
<span class="line"><span style="color:#24292e;">[Wed Apr  5 11:29:58 CST 2023] Create account key ok.</span></span>
<span class="line"><span style="color:#24292e;">[Wed Apr  5 11:29:58 CST 2023] No EAB credentials found for ZeroSSL, let&#39;s get one</span></span>
<span class="line"><span style="color:#24292e;">[Wed Apr  5 11:30:00 CST 2023] Registering account: https://acme.zerossl.com/v2/DV90</span></span>
<span class="line"><span style="color:#24292e;">[Wed Apr  5 11:30:02 CST 2023] Registered</span></span>
<span class="line"><span style="color:#24292e;">[Wed Apr  5 11:30:02 CST 2023] ACCOUNT_THUMBPRINT=&#39;ToJqC_RoEYD0hNcJp7zkhsDchWtsVIPrT65yHWcEyqU&#39;</span></span></code></pre></div><h1 id="_3-申请证书" tabindex="-1">3.申请证书 <a class="header-anchor" href="#_3-申请证书" aria-label="Permalink to &quot;3.申请证书&quot;">​</a></h1><h2 id="_3-1-http方式" tabindex="-1">3.1 http方式 <a class="header-anchor" href="#_3-1-http方式" aria-label="Permalink to &quot;3.1 http方式&quot;">​</a></h2><p>开放80端口: ufw allow 80</p><p>#这里的域名（<code>申请证书的域名要提前解析到dns上面</code>），要访问web服务，这个acme会自己提供</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#acme.sh --issue -d domain.com --standalone -k ec-256</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#acme.sh --issue -d domain.com --standalone -k ec-256</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#成功现象</span></span>
<span class="line"><span style="color:#B392F0;">root@iZj6c9jm2xw77w13d79ecbZ:~#</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">acme.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--issue</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gos.xxx.info</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--standalone</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-k</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ec-256</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:26 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Using CA: https://acme.zerossl.com/v2/DV90</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:26 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Standalone mode.</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:27 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Single domain=</span><span style="color:#9ECBFF;">&#39;gos.naigosto.info&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:27 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Getting domain auth token </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> each domain</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:31 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Getting webroot </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> domain=</span><span style="color:#9ECBFF;">&#39;gos.naigosto.info&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:31 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Verifying: gos.naigosto.info</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:31 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Standalone mode server</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:33 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Processing, The CA is processing your order, please just wait. (</span><span style="color:#B392F0;">1/30</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:37 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Success</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:37 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Verify finished, start to sign.</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:37 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Lets finalize the order.</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:37 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Le_OrderFinalize=</span><span style="color:#9ECBFF;">&#39;https://acme.zerossl.com/v2/DV90/order/Mth3kUpt_ANMr3xrfT94sg/finalize&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:38 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Order status is processing, lets sleep and retry.</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:39 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Retry after: 15</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:55 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Polling order status: https://acme.zerossl.com/v2/DV90/order/Mth3kUpt_ANMr3xrfT94sg</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:56 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Downloading cert.</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:56 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Le_LinkCert=</span><span style="color:#9ECBFF;">&#39;https://acme.zerossl.com/v2/DV90/cert/2QU0KxSksAAtC7fzQdxzhQ&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:57 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Cert success.</span></span>
<span class="line"><span style="color:#B392F0;">-----BEGIN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CERTIFICATE-----</span></span>
<span class="line"><span style="color:#B392F0;">MIIEBjCCA4ygAwIBAgIRAJTDtMaaTte2W7mIXyeoF98wCgYIKoZIzj0EAwMwSzEL</span></span>
<span class="line"><span style="color:#B392F0;">MAkGA1UEBhMCQVQxEDAOBgNVBAoTB1plcm9TU0wxKjAoBgNVBAMTIVplcm9TU0wg</span></span>
<span class="line"><span style="color:#B392F0;">RUNDIERvbWFpbiBTZWN1cmUgU2l0ZSBDQTAeFw0yMzA0MDYwMDAwMDBaFw0yMzA3</span></span>
<span class="line"><span style="color:#B392F0;">MDUyMzU5NTlaMBwxGjAYBgNVBAMTEWdvcy5uYWlnb3N0by5pbmZvMFkwEwYHKoZI</span></span>
<span class="line"><span style="color:#B392F0;">zj0CAQYIKoZIzj0DAQcDQgAEJbby2wcHB6OgwcdU4C+Tyuo7sbqF2oxfmBHUtI5E</span></span>
<span class="line"><span style="color:#B392F0;">sZO+aHfG7SzD+pSUXslAjDZhfr5EEkC4SamRmIcFYAtudqOCAn4wggJ6MB8GA1Ud</span></span>
<span class="line"><span style="color:#B392F0;">IwQYMBaAFA9r5kvOOUeu9n6QHnnwMJGSyF+jMB0GA1UdDgQWBBQs5kJ/z/D88jwS</span></span>
<span class="line"><span style="color:#B392F0;">C/Y7YVenJOKNUjAOBgNVHQ8BAf8EBAMCB4AwDAYDVR0TAQH/BAIwADAdBgNVHSUE</span></span>
<span class="line"><span style="color:#B392F0;">FjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwSQYDVR0gBEIwQDA0BgsrBgEEAbIxAQIC</span></span>
<span class="line"><span style="color:#B392F0;">TjAlMCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29tL0NQUzAIBgZngQwB</span></span>
<span class="line"><span style="color:#B392F0;">AgEwgYgGCCsGAQUFBwEBBHwwejBLBggrBgEFBQcwAoY/aHR0cDovL3plcm9zc2wu</span></span>
<span class="line"><span style="color:#B392F0;">Y3J0LnNlY3RpZ28uY29tL1plcm9TU0xFQ0NEb21haW5TZWN1cmVTaXRlQ0EuY3J0</span></span>
<span class="line"><span style="color:#B392F0;">MCsGCCsGAQUFBzABhh9odHRwOi8vemVyb3NzbC5vY3NwLnNlY3RpZ28uY29tMIIB</span></span>
<span class="line"><span style="color:#B392F0;">BQYKKwYBBAHWeQIEAgSB9gSB8wDxAHYArfe++nz/EMiLnT2cHj4YarRnKV3PsQwk</span></span>
<span class="line"><span style="color:#B392F0;">yoWGNOvcgooAAAGHVOfwqgAABAMARzBFAiEAw+MQPi+jYxnPsAFfp0fgqe1qBIqV</span></span>
<span class="line"><span style="color:#B392F0;">a4YAqJbe6tJlgiECIG6k4m75tq0JYa8HuoXfcMvRW+7UUXQG/yGisYqrGRQOAHcA</span></span>
<span class="line"><span style="color:#B392F0;">ejKMVNi3LbYg6jjgUh7phBZwMhOFTTvSK8E6V6NS61IAAAGHVOfw/wAABAMASDBG</span></span>
<span class="line"><span style="color:#B392F0;">AiEA5e/LDLwFIOz0HNLLOu9vHfMM0rHMX9j7/Uy8licGSN4CIQDMdbQ7tune0lCt</span></span>
<span class="line"><span style="color:#B392F0;">VVR+YWesbfLuXP0v6FyNeitVRRrS/jAcBgNVHREEFTATghFnb3MubmFpZ29zdG8u</span></span>
<span class="line"><span style="color:#B392F0;">aW5mbzAKBggqhkjOPQQDAwNoADBlAjBgFji3ea/AxurHp8msibPhPrErnXQkVQLA</span></span>
<span class="line"><span style="color:#B392F0;">OC0YBvVDEzqgY63A+eSHb6nibwE2s1gCMQDaSr20Bm0J1EWm9x42KmY1+gW0k87I</span></span>
<span class="line"><span style="color:#E1E4E8;">Ii09QL2hunLTMV72jvg22dUBDBSvdvJ0hhM</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#B392F0;">-----END</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CERTIFICATE-----</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:57 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Your cert is in: /root/.acme.sh/gos.naigosto.info_ecc/gos.naigosto.info.cer</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:57 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Your cert key is in: /root/.acme.sh/gos.naigosto.info_ecc/gos.naigosto.info.key</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:57 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] The intermediate CA cert is in: /root/.acme.sh/gos.naigosto.info_ecc/ca.cer</span></span>
<span class="line"><span style="color:#E1E4E8;">[Thu Apr  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:51:57 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] And the full chain certs is there: /root/.acme.sh/gos.naigosto.info_ecc/fullchain.cer</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#成功现象</span></span>
<span class="line"><span style="color:#6F42C1;">root@iZj6c9jm2xw77w13d79ecbZ:~#</span><span style="color:#24292E;"> </span><span style="color:#032F62;">acme.sh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--issue</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gos.xxx.info</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--standalone</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-k</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ec-256</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:26 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Using CA: https://acme.zerossl.com/v2/DV90</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:26 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Standalone mode.</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:27 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Single domain=</span><span style="color:#032F62;">&#39;gos.naigosto.info&#39;</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:27 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Getting domain auth token </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> each domain</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:31 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Getting webroot </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> domain=</span><span style="color:#032F62;">&#39;gos.naigosto.info&#39;</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:31 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Verifying: gos.naigosto.info</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:31 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Standalone mode server</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:33 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Processing, The CA is processing your order, please just wait. (</span><span style="color:#6F42C1;">1/30</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:37 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Success</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:37 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Verify finished, start to sign.</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:37 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Lets finalize the order.</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:37 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Le_OrderFinalize=</span><span style="color:#032F62;">&#39;https://acme.zerossl.com/v2/DV90/order/Mth3kUpt_ANMr3xrfT94sg/finalize&#39;</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:38 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Order status is processing, lets sleep and retry.</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:39 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Retry after: 15</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:55 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Polling order status: https://acme.zerossl.com/v2/DV90/order/Mth3kUpt_ANMr3xrfT94sg</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:56 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Downloading cert.</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:56 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Le_LinkCert=</span><span style="color:#032F62;">&#39;https://acme.zerossl.com/v2/DV90/cert/2QU0KxSksAAtC7fzQdxzhQ&#39;</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:57 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Cert success.</span></span>
<span class="line"><span style="color:#6F42C1;">-----BEGIN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CERTIFICATE-----</span></span>
<span class="line"><span style="color:#6F42C1;">MIIEBjCCA4ygAwIBAgIRAJTDtMaaTte2W7mIXyeoF98wCgYIKoZIzj0EAwMwSzEL</span></span>
<span class="line"><span style="color:#6F42C1;">MAkGA1UEBhMCQVQxEDAOBgNVBAoTB1plcm9TU0wxKjAoBgNVBAMTIVplcm9TU0wg</span></span>
<span class="line"><span style="color:#6F42C1;">RUNDIERvbWFpbiBTZWN1cmUgU2l0ZSBDQTAeFw0yMzA0MDYwMDAwMDBaFw0yMzA3</span></span>
<span class="line"><span style="color:#6F42C1;">MDUyMzU5NTlaMBwxGjAYBgNVBAMTEWdvcy5uYWlnb3N0by5pbmZvMFkwEwYHKoZI</span></span>
<span class="line"><span style="color:#6F42C1;">zj0CAQYIKoZIzj0DAQcDQgAEJbby2wcHB6OgwcdU4C+Tyuo7sbqF2oxfmBHUtI5E</span></span>
<span class="line"><span style="color:#6F42C1;">sZO+aHfG7SzD+pSUXslAjDZhfr5EEkC4SamRmIcFYAtudqOCAn4wggJ6MB8GA1Ud</span></span>
<span class="line"><span style="color:#6F42C1;">IwQYMBaAFA9r5kvOOUeu9n6QHnnwMJGSyF+jMB0GA1UdDgQWBBQs5kJ/z/D88jwS</span></span>
<span class="line"><span style="color:#6F42C1;">C/Y7YVenJOKNUjAOBgNVHQ8BAf8EBAMCB4AwDAYDVR0TAQH/BAIwADAdBgNVHSUE</span></span>
<span class="line"><span style="color:#6F42C1;">FjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwSQYDVR0gBEIwQDA0BgsrBgEEAbIxAQIC</span></span>
<span class="line"><span style="color:#6F42C1;">TjAlMCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29tL0NQUzAIBgZngQwB</span></span>
<span class="line"><span style="color:#6F42C1;">AgEwgYgGCCsGAQUFBwEBBHwwejBLBggrBgEFBQcwAoY/aHR0cDovL3plcm9zc2wu</span></span>
<span class="line"><span style="color:#6F42C1;">Y3J0LnNlY3RpZ28uY29tL1plcm9TU0xFQ0NEb21haW5TZWN1cmVTaXRlQ0EuY3J0</span></span>
<span class="line"><span style="color:#6F42C1;">MCsGCCsGAQUFBzABhh9odHRwOi8vemVyb3NzbC5vY3NwLnNlY3RpZ28uY29tMIIB</span></span>
<span class="line"><span style="color:#6F42C1;">BQYKKwYBBAHWeQIEAgSB9gSB8wDxAHYArfe++nz/EMiLnT2cHj4YarRnKV3PsQwk</span></span>
<span class="line"><span style="color:#6F42C1;">yoWGNOvcgooAAAGHVOfwqgAABAMARzBFAiEAw+MQPi+jYxnPsAFfp0fgqe1qBIqV</span></span>
<span class="line"><span style="color:#6F42C1;">a4YAqJbe6tJlgiECIG6k4m75tq0JYa8HuoXfcMvRW+7UUXQG/yGisYqrGRQOAHcA</span></span>
<span class="line"><span style="color:#6F42C1;">ejKMVNi3LbYg6jjgUh7phBZwMhOFTTvSK8E6V6NS61IAAAGHVOfw/wAABAMASDBG</span></span>
<span class="line"><span style="color:#6F42C1;">AiEA5e/LDLwFIOz0HNLLOu9vHfMM0rHMX9j7/Uy8licGSN4CIQDMdbQ7tune0lCt</span></span>
<span class="line"><span style="color:#6F42C1;">VVR+YWesbfLuXP0v6FyNeitVRRrS/jAcBgNVHREEFTATghFnb3MubmFpZ29zdG8u</span></span>
<span class="line"><span style="color:#6F42C1;">aW5mbzAKBggqhkjOPQQDAwNoADBlAjBgFji3ea/AxurHp8msibPhPrErnXQkVQLA</span></span>
<span class="line"><span style="color:#6F42C1;">OC0YBvVDEzqgY63A+eSHb6nibwE2s1gCMQDaSr20Bm0J1EWm9x42KmY1+gW0k87I</span></span>
<span class="line"><span style="color:#24292E;">Ii09QL2hunLTMV72jvg22dUBDBSvdvJ0hhM</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#6F42C1;">-----END</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CERTIFICATE-----</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:57 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Your cert is in: /root/.acme.sh/gos.naigosto.info_ecc/gos.naigosto.info.cer</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:57 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Your cert key is in: /root/.acme.sh/gos.naigosto.info_ecc/gos.naigosto.info.key</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:57 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] The intermediate CA cert is in: /root/.acme.sh/gos.naigosto.info_ecc/ca.cer</span></span>
<span class="line"><span style="color:#24292E;">[Thu Apr  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:51:57 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] And the full chain certs is there: /root/.acme.sh/gos.naigosto.info_ecc/fullchain.cer</span></span></code></pre></div><h3 id="浏览器现象" tabindex="-1">浏览器现象 <a class="header-anchor" href="#浏览器现象" aria-label="Permalink to &quot;浏览器现象&quot;">​</a></h3><p><img src="`+p+`" alt=""></p><h2 id="_3-2-dns方式" tabindex="-1">3.2 dns方式 <a class="header-anchor" href="#_3-2-dns方式" aria-label="Permalink to &quot;3.2 dns方式&quot;">​</a></h2><ul><li>获取证书</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">acme.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--issue</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dns</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.xxx.info</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">acme.sh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--issue</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dns</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.xxx.info</span></span></code></pre></div><p>执行后退出，提示有：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">following</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">txt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">record:</span></span>
<span class="line"><span style="color:#B392F0;">Domain:_acme-challenge.xxx.info</span></span>
<span class="line"><span style="color:#B392F0;">Txt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">value:9ihDbjYfTExAYeDs4DBUeuTo18KBzwvTEjUnSwd32-c</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">the</span><span style="color:#24292E;"> </span><span style="color:#032F62;">following</span><span style="color:#24292E;"> </span><span style="color:#032F62;">txt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">record:</span></span>
<span class="line"><span style="color:#6F42C1;">Domain:_acme-challenge.xxx.info</span></span>
<span class="line"><span style="color:#6F42C1;">Txt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">value:9ihDbjYfTExAYeDs4DBUeuTo18KBzwvTEjUnSwd32-c</span></span></code></pre></div><p>这时，修改DNS记录，增加</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">_acme-challenge.xxx.info</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">IN</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">TXT</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;9ihDbjYfTExAYeDs4DBUeuTo18KBzwvTEjUnSwd32-c&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">_acme-challenge.xxx.info</span><span style="color:#24292E;"> </span><span style="color:#032F62;">IN</span><span style="color:#24292E;">	</span><span style="color:#032F62;">TXT</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;9ihDbjYfTExAYeDs4DBUeuTo18KBzwvTEjUnSwd32-c&quot;</span></span></code></pre></div><p>然后继续获取证书的过程，注意下面的命令行中的”renew”</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">./acme.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--renew</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.xxx.info</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">./acme.sh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--renew</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.xxx.info</span></span></code></pre></div><h1 id="_4-安装证书" tabindex="-1">4.安装证书 <a class="header-anchor" href="#_4-安装证书" aria-label="Permalink to &quot;4.安装证书&quot;">​</a></h1><p>acme.sh --installcert -d domain.com --ecc --key-file /root/trojan/serverkey -fulchain-file /root/trojan/server.crt</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">acme.sh --installcert -d gos.naigosto.info --ecc --key-file /usr/local/etc/v2ray/server.key --fullchain-file /usr/local/etc/v2ray/server.crt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">acme.sh --installcert -d gos.naigosto.info --ecc --key-file /usr/local/etc/v2ray/server.key --fullchain-file /usr/local/etc/v2ray/server.crt</span></span></code></pre></div><p>如果默认CA无法颁发，则可以切换下列CA:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">切换 Let&#39;s Encrypt: acme.sh --set-default-ca --server letsencrypt</span></span>
<span class="line"><span style="color:#e1e4e8;">切换 Buypass: acme.sh --setdefault-ca --server buypass</span></span>
<span class="line"><span style="color:#e1e4e8;">切换 ZeroSSL: acme.sh --set-default-ca --server zerossl （默认）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">切换 Let&#39;s Encrypt: acme.sh --set-default-ca --server letsencrypt</span></span>
<span class="line"><span style="color:#24292e;">切换 Buypass: acme.sh --setdefault-ca --server buypass</span></span>
<span class="line"><span style="color:#24292e;">切换 ZeroSSL: acme.sh --set-default-ca --server zerossl （默认）</span></span></code></pre></div><h2 id="_4-1自动升级acme-sh" tabindex="-1">4.1自动升级acme.sh <a class="header-anchor" href="#_4-1自动升级acme-sh" aria-label="Permalink to &quot;4.1自动升级acme.sh&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">root@iZj6c9jm2xw77w13d79ecbZ:~#</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">acme.sh</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--upgrade</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--auto-upgrade</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:39 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Installing from online archive.</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:39 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Downloading https://github.com/acmesh-official/acme.sh/archive/master.tar.gz</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:40 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Extracting master.tar.gz</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:41 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Installing to /root/.acme.sh</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:41 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Installed to /root/.acme.sh/acme.sh</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:41 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Good, bash is found, so change the shebang to use bash as preferred.</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:42 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] OK</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:42 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Install success</span><span style="color:#F97583;">!</span></span>
<span class="line"><span style="color:#E1E4E8;">[Mon May </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:40:42 CST </span><span style="color:#79B8FF;">2023</span><span style="color:#E1E4E8;">] Upgrade success</span><span style="color:#F97583;">!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">root@iZj6c9jm2xw77w13d79ecbZ:~#</span><span style="color:#24292E;"> </span><span style="color:#032F62;">acme.sh</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--upgrade</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--auto-upgrade</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:39 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Installing from online archive.</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:39 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Downloading https://github.com/acmesh-official/acme.sh/archive/master.tar.gz</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:40 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Extracting master.tar.gz</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:41 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Installing to /root/.acme.sh</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:41 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Installed to /root/.acme.sh/acme.sh</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:41 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Good, bash is found, so change the shebang to use bash as preferred.</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:42 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] OK</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:42 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Install success</span><span style="color:#D73A49;">!</span></span>
<span class="line"><span style="color:#24292E;">[Mon May </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:40:42 CST </span><span style="color:#005CC5;">2023</span><span style="color:#24292E;">] Upgrade success</span><span style="color:#D73A49;">!</span></span></code></pre></div><h2 id="_4-2更新证书" tabindex="-1">4.2更新证书 <a class="header-anchor" href="#_4-2更新证书" aria-label="Permalink to &quot;4.2更新证书&quot;">​</a></h2><p>目前证书在 60 天以后会自动更新，你无需任何操作，因为在acme.sh安装时，已经把相关的自动更新程序写入到crontab中，如果想要查看，可以通过以下命令</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">crontab</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-l</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">crontab</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-l</span></span></code></pre></div><h2 id="_4-3停止自动更新证书" tabindex="-1">4.3停止自动更新证书 <a class="header-anchor" href="#_4-3停止自动更新证书" aria-label="Permalink to &quot;4.3停止自动更新证书&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">acme.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--remove</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">example.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">acme.sh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--remove</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">example.com</span></span></code></pre></div><p>或者手动在<code>~/.acme.sh/</code>目录下删除对应的域名目录，如<code>~/.acme.sh/a.com</code></p><h2 id="_4-4手动" tabindex="-1">4.4手动 <a class="header-anchor" href="#_4-4手动" aria-label="Permalink to &quot;4.4手动&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 颁发泛域名证书</span></span>
<span class="line"><span style="color:#B392F0;">acme.sh</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--issue</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;*.xxx.com&#39;</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--dns</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--yes-I-know-dns-manual-mode-enough-go-ahead-please</span></span>
<span class="line"><span style="color:#6A737D;"># 按提示在DNS解析上增加TXT_VALUE等值，等待生效  </span></span>
<span class="line"><span style="color:#6A737D;"># 使用dig查看是否生效</span></span>
<span class="line"><span style="color:#B392F0;">dig</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">txt</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">_acme-challenge.xxx.com</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@8.8.8.8</span></span>
<span class="line"><span style="color:#6A737D;"># renew，重新颁发</span></span>
<span class="line"><span style="color:#B392F0;">acme.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--renew</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.xxx.com</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--yes-I-know-dns-manual-mode-enough-go-ahead-please</span></span>
<span class="line"><span style="color:#6A737D;"># 重新install即可</span></span>
<span class="line"><span style="color:#B392F0;">acme.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--install-cert</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.xxx.com</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\ </span></span>
<span class="line"><span style="color:#B392F0;">--key-file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/nginx/conf.d/ssl/common.xxx.com.key.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\ </span></span>
<span class="line"><span style="color:#B392F0;">--fullchain-file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/nginx/conf.d/ssl/common.xxx.com.cert.pem</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--reloadcmd </span><span style="color:#9ECBFF;">&quot;systemctl restart nginx&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 颁发泛域名证书</span></span>
<span class="line"><span style="color:#6F42C1;">acme.sh</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--issue</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;*.xxx.com&#39;</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--dns</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--yes-I-know-dns-manual-mode-enough-go-ahead-please</span></span>
<span class="line"><span style="color:#6A737D;"># 按提示在DNS解析上增加TXT_VALUE等值，等待生效  </span></span>
<span class="line"><span style="color:#6A737D;"># 使用dig查看是否生效</span></span>
<span class="line"><span style="color:#6F42C1;">dig</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">txt</span><span style="color:#24292E;"> </span><span style="color:#032F62;">_acme-challenge.xxx.com</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@8.8.8.8</span></span>
<span class="line"><span style="color:#6A737D;"># renew，重新颁发</span></span>
<span class="line"><span style="color:#6F42C1;">acme.sh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--renew</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.xxx.com</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--yes-I-know-dns-manual-mode-enough-go-ahead-please</span></span>
<span class="line"><span style="color:#6A737D;"># 重新install即可</span></span>
<span class="line"><span style="color:#6F42C1;">acme.sh</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--install-cert</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.xxx.com</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\ </span></span>
<span class="line"><span style="color:#6F42C1;">--key-file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/nginx/conf.d/ssl/common.xxx.com.key.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\ </span></span>
<span class="line"><span style="color:#6F42C1;">--fullchain-file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/nginx/conf.d/ssl/common.xxx.com.cert.pem</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--reloadcmd </span><span style="color:#032F62;">&quot;systemctl restart nginx&quot;</span></span></code></pre></div><h1 id="_5-服务端配置" tabindex="-1">5.服务端配置 <a class="header-anchor" href="#_5-服务端配置" aria-label="Permalink to &quot;5.服务端配置&quot;">​</a></h1><h2 id="_5-0安装" tabindex="-1">5.0安装 <a class="header-anchor" href="#_5-0安装" aria-label="Permalink to &quot;5.0安装&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">https://github.com/v2fly/fhs-install-v2ray</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">//</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">安裝執行檔和</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">.dat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">資料檔</span></span>
<span class="line"><span style="color:#6A737D;"># bash &lt;(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">https://github.com/v2fly/fhs-install-v2ray</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">//</span><span style="color:#24292E;"> </span><span style="color:#032F62;">安裝執行檔和</span><span style="color:#24292E;"> </span><span style="color:#032F62;">.dat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">資料檔</span></span>
<span class="line"><span style="color:#6A737D;"># bash &lt;(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)</span></span></code></pre></div><h2 id="_5-1vmess-tls" tabindex="-1">5.1vmess+tls <a class="header-anchor" href="#_5-1vmess-tls" aria-label="Permalink to &quot;5.1vmess+tls&quot;">​</a></h2><h3 id="uuid生成" tabindex="-1">uuid生成 <a class="header-anchor" href="#uuid生成" aria-label="Permalink to &quot;uuid生成&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/proc/sys/kernel/random/uuid</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/proc/sys/kernel/random/uuid</span></span></code></pre></div><p>vim config.json</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">&quot;inbounds&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">	{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;port&quot;</span><span style="color:#B392F0;">:8388,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;protocol&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;vmess&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;settings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">&quot;clients&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">					{</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#B392F0;">&quot;id&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;5eeb28d6-d439-11ed-afa1-0242ac120002&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#B392F0;">&quot;alterId&quot;</span><span style="color:#B392F0;">:0</span></span>
<span class="line"><span style="color:#E1E4E8;">					}</span></span>
<span class="line"><span style="color:#E1E4E8;">				]</span></span>
<span class="line"><span style="color:#E1E4E8;">			},</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;streamSettings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">&quot;network&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;tcp&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">&quot;security&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;tls&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">&quot;tlsSettings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#B392F0;">&quot;certificates&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">						{</span></span>
<span class="line"><span style="color:#E1E4E8;">							</span><span style="color:#B392F0;">&quot;certificateFile&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;/usr/local/etc/v2ray/server.crt&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">							</span><span style="color:#B392F0;">&quot;keyFile&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;/usr/local/etc/v2ray/server.key&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">						}</span></span>
<span class="line"><span style="color:#E1E4E8;">					]</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;outbounds&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">	{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">&quot;protocol&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;freedom&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">&quot;settings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">&quot;inbounds&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">	{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;port&quot;</span><span style="color:#6F42C1;">:8388,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;protocol&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;vmess&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;settings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">&quot;clients&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">					{</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#6F42C1;">&quot;id&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;5eeb28d6-d439-11ed-afa1-0242ac120002&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#6F42C1;">&quot;alterId&quot;</span><span style="color:#6F42C1;">:0</span></span>
<span class="line"><span style="color:#24292E;">					}</span></span>
<span class="line"><span style="color:#24292E;">				]</span></span>
<span class="line"><span style="color:#24292E;">			},</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;streamSettings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">&quot;network&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;tcp&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">&quot;security&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;tls&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">&quot;tlsSettings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6F42C1;">&quot;certificates&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">						{</span></span>
<span class="line"><span style="color:#24292E;">							</span><span style="color:#6F42C1;">&quot;certificateFile&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;/usr/local/etc/v2ray/server.crt&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">							</span><span style="color:#6F42C1;">&quot;keyFile&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;/usr/local/etc/v2ray/server.key&quot;</span></span>
<span class="line"><span style="color:#24292E;">						}</span></span>
<span class="line"><span style="color:#24292E;">					]</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;outbounds&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">	{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">&quot;protocol&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;freedom&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">&quot;settings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li>验证语法是否有问题</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/usr/local/bin/v2ray test -c /usr/local/etc/v2ray/config.json </span></span>
<span class="line"><span style="color:#e1e4e8;">V2Ray 5.3.0 (V2Fly, a community-driven edition of V2Ray.) Custom (go1.20 linux/amd64)</span></span>
<span class="line"><span style="color:#e1e4e8;">A unified platform for anti-censorship.</span></span>
<span class="line"><span style="color:#e1e4e8;">Configuration OK.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/usr/local/bin/v2ray test -c /usr/local/etc/v2ray/config.json </span></span>
<span class="line"><span style="color:#24292e;">V2Ray 5.3.0 (V2Fly, a community-driven edition of V2Ray.) Custom (go1.20 linux/amd64)</span></span>
<span class="line"><span style="color:#24292e;">A unified platform for anti-censorship.</span></span>
<span class="line"><span style="color:#24292e;">Configuration OK.</span></span></code></pre></div><h2 id="_5-2vmess-tls-web" tabindex="-1">5.2vmess_tls_web <a class="header-anchor" href="#_5-2vmess-tls-web" aria-label="Permalink to &quot;5.2vmess_tls_web&quot;">​</a></h2><p>vim nginx.conf</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">##</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;"># Basic Settings</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">sendfile</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">tcp_nopush</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">tcp_nodelay</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">keepalive_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">65</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">types_hash_max_size</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2048</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">server_tokens</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/nginx/mime.types</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">default_type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">application/octet-stream</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">access_log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/nginx/access.log</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">error_log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/nginx/error.log</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">gzip</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">443</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ssl</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> [::]:443 ssl;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gos.xxx.info</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">ssl_certificate</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/nginx/ssl/server.crt</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">ssl_certificate_key</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/nginx/ssl/server.key</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">ssl_session_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">d</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">ssl_session_cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">shared:MozSSL:10m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">ssl_session_tickets</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">ssl_protocols</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TLSv1.2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TLSv1.3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ssl_ciphers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">ssl_prefer_server_ciphers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://nextcloud.com</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">#伪装网址</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_redirect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_ssl_server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">sub_filter_once</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">sub_filter</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;nextcloud.com&quot;</span><span style="color:#E1E4E8;"> $server_name;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Host</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;nextcloud.com&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Referer</span><span style="color:#E1E4E8;"> $http_referer;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">User-Agent</span><span style="color:#E1E4E8;"> $http_user_agent;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-Proto</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Accept-Encoding</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Accept-Language</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;zh-CN&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/goray</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_upgrade </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">= </span><span style="color:#9ECBFF;">&quot;websocket&quot;</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">404</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_redirect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://127.0.0.1:8388</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Upgrade</span><span style="color:#E1E4E8;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;upgrade&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Host</span><span style="color:#E1E4E8;"> $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gos.naigosto.info</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">*)$ </span><span style="color:#9ECBFF;">https://</span><span style="color:#E1E4E8;">$host</span><span style="color:#FFAB70;">$1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">permanent</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">##</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;"># Basic Settings</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">sendfile</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">tcp_nopush</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">tcp_nodelay</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">keepalive_timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">65</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">types_hash_max_size</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2048</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">server_tokens</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/nginx/mime.types</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">default_type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">application/octet-stream</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">access_log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/nginx/access.log</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">error_log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/nginx/error.log</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">gzip</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">443</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ssl</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> [::]:443 ssl;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gos.xxx.info</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">ssl_certificate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/nginx/ssl/server.crt</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">ssl_certificate_key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/nginx/ssl/server.key</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">ssl_session_timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">d</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">ssl_session_cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">shared:MozSSL:10m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">ssl_session_tickets</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">ssl_protocols</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TLSv1.2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TLSv1.3</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ssl_ciphers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">ssl_prefer_server_ciphers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://nextcloud.com</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">#伪装网址</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_redirect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_ssl_server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">sub_filter_once</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">sub_filter</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;nextcloud.com&quot;</span><span style="color:#24292E;"> $server_name;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Host</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;nextcloud.com&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Referer</span><span style="color:#24292E;"> $http_referer;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">User-Agent</span><span style="color:#24292E;"> $http_user_agent;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-Proto</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Accept-Encoding</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Accept-Language</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;zh-CN&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/goray</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_upgrade </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">= </span><span style="color:#032F62;">&quot;websocket&quot;</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">        	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_redirect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://127.0.0.1:8388</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Upgrade</span><span style="color:#24292E;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;upgrade&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Host</span><span style="color:#24292E;"> $host;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gos.naigosto.info</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">*)$ </span><span style="color:#032F62;">https://</span><span style="color:#24292E;">$host</span><span style="color:#E36209;">$1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">permanent</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="cdn方式" tabindex="-1">cdn方式 <a class="header-anchor" href="#cdn方式" aria-label="Permalink to &quot;cdn方式&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	##</span></span>
<span class="line"><span style="color:#e1e4e8;">	# Basic Settings</span></span>
<span class="line"><span style="color:#e1e4e8;">	##</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	sendfile on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	tcp_nopush on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	tcp_nodelay on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	keepalive_timeout 65;</span></span>
<span class="line"><span style="color:#e1e4e8;">	types_hash_max_size 2048;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_tokens off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	include /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#e1e4e8;">	default_type application/octet-stream;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log /var/log/nginx/access.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">	error_log /var/log/nginx/error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	gzip on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_name gos.xxx.info;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_certificate /etc/nginx/ssl/server.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_certificate_key /etc/nginx/ssl/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_protocols TLSv1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">    	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_prefer_server_ciphers off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_session_timeout 1d;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_session_cache shared:MozSSL:20m;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_session_tickets off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass https://nextcloud.com; #伪装网址</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_ssl_server_name on;</span></span>
<span class="line"><span style="color:#e1e4e8;">            sub_filter_once off;</span></span>
<span class="line"><span style="color:#e1e4e8;">            sub_filter &quot;nextcloud.com&quot; $server_name;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Host &quot;nextcloud.com&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Referer $http_referer;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Forwarded-Proto https;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Accept-Language &quot;zh-CN&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /goray {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://127.0.0.1:8388;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Connection &quot;upgrade&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	##</span></span>
<span class="line"><span style="color:#24292e;">	# Basic Settings</span></span>
<span class="line"><span style="color:#24292e;">	##</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	sendfile on;</span></span>
<span class="line"><span style="color:#24292e;">	tcp_nopush on;</span></span>
<span class="line"><span style="color:#24292e;">	tcp_nodelay on;</span></span>
<span class="line"><span style="color:#24292e;">	keepalive_timeout 65;</span></span>
<span class="line"><span style="color:#24292e;">	types_hash_max_size 2048;</span></span>
<span class="line"><span style="color:#24292e;">	server_tokens off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	include /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#24292e;">	default_type application/octet-stream;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	access_log /var/log/nginx/access.log;</span></span>
<span class="line"><span style="color:#24292e;">	error_log /var/log/nginx/error.log;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	gzip on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 80;</span></span>
<span class="line"><span style="color:#24292e;">	listen 443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">	server_name gos.xxx.info;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_certificate /etc/nginx/ssl/server.crt;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_certificate_key /etc/nginx/ssl/server.key;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	ssl_protocols TLSv1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">    	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_prefer_server_ciphers off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	ssl_session_timeout 1d;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_session_cache shared:MozSSL:20m;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_session_tickets off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass https://nextcloud.com; #伪装网址</span></span>
<span class="line"><span style="color:#24292e;">            proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_ssl_server_name on;</span></span>
<span class="line"><span style="color:#24292e;">            sub_filter_once off;</span></span>
<span class="line"><span style="color:#24292e;">            sub_filter &quot;nextcloud.com&quot; $server_name;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Host &quot;nextcloud.com&quot;;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Referer $http_referer;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Forwarded-Proto https;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Accept-Language &quot;zh-CN&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /goray {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://127.0.0.1:8388;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Connection &quot;upgrade&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>vim config.json</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">&quot;inbounds&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">	{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;listen&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;127.0.0.1&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;port&quot;</span><span style="color:#B392F0;">:8388,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;protocol&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;vmess&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;settings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">&quot;clients&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">					{</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#B392F0;">&quot;id&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;5eeb28d6-d439-11ed-afa1-0242ac120002&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#B392F0;">&quot;alterId&quot;</span><span style="color:#B392F0;">:0</span></span>
<span class="line"><span style="color:#E1E4E8;">					}</span></span>
<span class="line"><span style="color:#E1E4E8;">				]</span></span>
<span class="line"><span style="color:#E1E4E8;">			},</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#B392F0;">&quot;streamSettings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">&quot;network&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;ws&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#B392F0;">&quot;wsSettings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#B392F0;">&quot;path&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;/goray&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">&quot;outbounds&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">	{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">&quot;protocol&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#B392F0;">&quot;freedom&quot;</span><span style="color:#B392F0;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#B392F0;">&quot;settings&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">&quot;inbounds&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">	{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;listen&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;127.0.0.1&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;port&quot;</span><span style="color:#6F42C1;">:8388,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;protocol&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;vmess&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;settings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">&quot;clients&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">					{</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#6F42C1;">&quot;id&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;5eeb28d6-d439-11ed-afa1-0242ac120002&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#6F42C1;">&quot;alterId&quot;</span><span style="color:#6F42C1;">:0</span></span>
<span class="line"><span style="color:#24292E;">					}</span></span>
<span class="line"><span style="color:#24292E;">				]</span></span>
<span class="line"><span style="color:#24292E;">			},</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#6F42C1;">&quot;streamSettings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">&quot;network&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;ws&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#6F42C1;">&quot;wsSettings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#6F42C1;">&quot;path&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;/goray&quot;</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">&quot;outbounds&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">	{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">&quot;protocol&quot;</span><span style="color:#005CC5;">:</span><span style="color:#6F42C1;">&quot;freedom&quot;</span><span style="color:#6F42C1;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6F42C1;">&quot;settings&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_6-client端下载" tabindex="-1">6. client端下载 <a class="header-anchor" href="#_6-client端下载" aria-label="Permalink to &quot;6. client端下载&quot;">​</a></h1><p><a href="https://github.com/2dust/v2rayN" target="_blank" rel="noreferrer">https://github.com/2dust/v2rayN</a></p><h1 id="伪站的选择" tabindex="-1">伪站的选择 <a class="header-anchor" href="#伪站的选择" aria-label="Permalink to &quot;伪站的选择&quot;">​</a></h1><p><strong>伪装网站的选择</strong></p><p>使用VPS自建Xray代理在流量的常见特征有 <strong>单点性</strong> 、 <strong>大流量性</strong> 、 <strong>长时间性</strong> 、 <strong>GO-TLS指纹特性</strong> 、 <strong>出入相同性</strong> 等。</p><ul><li><strong>单点性</strong> 指使用的人少，一般只有自己，即使分享给朋友，一般也不会太多。</li><li><strong>长时间性</strong> 不单指时间长，也指坚持一个月或一年每天都使用代理。</li><li><strong>GO-TLS指纹特性</strong> <strong>在不伪装浏览器指纹的前提下</strong>，从TLS握手信息中可以判断出客户端是GO程序，详见<a href="https://github.com/kirin10000/Xray-script#%E5%85%B3%E4%BA%8Etls%E6%8F%A1%E6%89%8Btls%E6%8C%87%E7%BA%B9%E5%92%8Calpn" target="_blank" rel="noreferrer">此处</a>。</li><li><strong>出入相同性</strong> 指入VPS和出VPS的流量在时间和大小上几乎相同，比如使用Xray代理浏览<code>BiliBili</code>，从<code>BiliBili</code>到<code>VPS(Xray服务端)</code>的流量，和从<code>VPS</code>到<code>Xray客户端</code>的流量在时间上和大小上是几乎相同的。<strong>出入相同性</strong> 是所有代理的通病，目前还没有太好的伪装方法，但是因为VPS不在大陆，如果不是被特别关注的对象，一般不会被审查。</li></ul><p>既然使用Xray进行代理的全部流量都将伪装成访问这个网站的流量，那么我们选择伪装网站就是要尽量选择<strong>流量特征与Xray代理的流量特征相同的网站</strong>。</p><ol><li><strong>Cloudreve 和 Nextcloud</strong></li></ol><p>他们都是个人网盘，个人网盘可以理解为使用自己的VPS搭建起来的百度网盘，区别就是文件都存放在VPS中，并且自己是网盘的管理员。</p><p>个人网盘与上面所说特征的吻合数最多，包括 <strong>单点性</strong> 、 <strong>大流量性</strong> 、 <strong>GO-TLS指纹特性</strong> 、 <strong>长时间性</strong> 等，建议选择。</p><p>关于<strong>GO-TLS指纹特性</strong>，<strong>在不伪装浏览器指纹的前提下</strong>，将alpn设置为http/1.1，可以伪装成GO语言实现的WebDav客户端，详见<a href="https://github.com/kirin10000/Xray-script#%E5%85%B3%E4%BA%8Etls%E6%8F%A1%E6%89%8Btls%E6%8C%87%E7%BA%B9%E5%92%8Calpn" target="_blank" rel="noreferrer">此处</a>。</p><p>线上</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">user www-data;</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_processes auto;</span></span>
<span class="line"><span style="color:#e1e4e8;">pid /run/nginx.pid;</span></span>
<span class="line"><span style="color:#e1e4e8;">include /etc/nginx/modules-enabled/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">events {</span></span>
<span class="line"><span style="color:#e1e4e8;">	worker_connections 768;</span></span>
<span class="line"><span style="color:#e1e4e8;">	# multi_accept on;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	##</span></span>
<span class="line"><span style="color:#e1e4e8;">	# Basic Settings</span></span>
<span class="line"><span style="color:#e1e4e8;">	##</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	sendfile on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	tcp_nopush on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	tcp_nodelay on;</span></span>
<span class="line"><span style="color:#e1e4e8;">	keepalive_timeout 65;</span></span>
<span class="line"><span style="color:#e1e4e8;">	types_hash_max_size 2048;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_tokens off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	include /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#e1e4e8;">	default_type application/octet-stream;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log /var/log/nginx/access.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">	error_log /var/log/nginx/error.log;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	gzip on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 443 ssl;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_name nais.xxx.info;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_certificate /usr/local/etc/v2ray/server.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_certificate_key /usr/local/etc/v2ray/server.key;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_protocols TLSv1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">    	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_prefer_server_ciphers off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_session_timeout 1d;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_session_cache shared:MozSSL:20m;</span></span>
<span class="line"><span style="color:#e1e4e8;">	ssl_session_tickets off;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass https://nextcloud.com; #伪装网址</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_ssl_server_name on;</span></span>
<span class="line"><span style="color:#e1e4e8;">            sub_filter_once off;</span></span>
<span class="line"><span style="color:#e1e4e8;">            sub_filter &quot;nextcloud.com&quot; $server_name;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Host &quot;nextcloud.com&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Referer $http_referer;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header X-Forwarded-Proto https;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_set_header Accept-Language &quot;zh-CN&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /goray {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://127.0.0.1:8388;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Connection &quot;upgrade&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">#server {</span></span>
<span class="line"><span style="color:#e1e4e8;">#	listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">#	server_name gos.naigosto.info;</span></span>
<span class="line"><span style="color:#e1e4e8;">#       	rewrite ^(.*)$ https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#e1e4e8;">#}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">user www-data;</span></span>
<span class="line"><span style="color:#24292e;">worker_processes auto;</span></span>
<span class="line"><span style="color:#24292e;">pid /run/nginx.pid;</span></span>
<span class="line"><span style="color:#24292e;">include /etc/nginx/modules-enabled/*.conf;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">events {</span></span>
<span class="line"><span style="color:#24292e;">	worker_connections 768;</span></span>
<span class="line"><span style="color:#24292e;">	# multi_accept on;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	##</span></span>
<span class="line"><span style="color:#24292e;">	# Basic Settings</span></span>
<span class="line"><span style="color:#24292e;">	##</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	sendfile on;</span></span>
<span class="line"><span style="color:#24292e;">	tcp_nopush on;</span></span>
<span class="line"><span style="color:#24292e;">	tcp_nodelay on;</span></span>
<span class="line"><span style="color:#24292e;">	keepalive_timeout 65;</span></span>
<span class="line"><span style="color:#24292e;">	types_hash_max_size 2048;</span></span>
<span class="line"><span style="color:#24292e;">	server_tokens off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	include /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#24292e;">	default_type application/octet-stream;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	access_log /var/log/nginx/access.log;</span></span>
<span class="line"><span style="color:#24292e;">	error_log /var/log/nginx/error.log;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	gzip on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 80;</span></span>
<span class="line"><span style="color:#24292e;">	listen 443 ssl;</span></span>
<span class="line"><span style="color:#24292e;">	server_name nais.xxx.info;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_certificate /usr/local/etc/v2ray/server.crt;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_certificate_key /usr/local/etc/v2ray/server.key;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	ssl_protocols TLSv1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">    	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_prefer_server_ciphers off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	ssl_session_timeout 1d;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_session_cache shared:MozSSL:20m;</span></span>
<span class="line"><span style="color:#24292e;">	ssl_session_tickets off;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass https://nextcloud.com; #伪装网址</span></span>
<span class="line"><span style="color:#24292e;">            proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_ssl_server_name on;</span></span>
<span class="line"><span style="color:#24292e;">            sub_filter_once off;</span></span>
<span class="line"><span style="color:#24292e;">            sub_filter &quot;nextcloud.com&quot; $server_name;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Host &quot;nextcloud.com&quot;;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Referer $http_referer;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header User-Agent $http_user_agent;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header X-Forwarded-Proto https;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Accept-Encoding &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_set_header Accept-Language &quot;zh-CN&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /goray {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_redirect off;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://127.0.0.1:8388;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Connection &quot;upgrade&quot;;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">#server {</span></span>
<span class="line"><span style="color:#24292e;">#	listen 80;</span></span>
<span class="line"><span style="color:#24292e;">#	server_name gos.naigosto.info;</span></span>
<span class="line"><span style="color:#24292e;">#       	rewrite ^(.*)$ https://$host$1 permanent;</span></span>
<span class="line"><span style="color:#24292e;">#}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,70),t=[e];function c(r,y,E,i,F,d){return n(),a("div",null,t)}const h=s(o,[["render",c]]);export{u as __pageData,h as default};
