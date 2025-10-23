import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/22-ss_ws_tls.md","filePath":"guide/Linux/vpn/22-ss_ws_tls.md","lastUpdated":1735640291000}'),p={name:"guide/Linux/vpn/22-ss_ws_tls.md"},o=l(`<p>Deploy Shadowsocks with v2ray-plugin + nginx Enabled</p><p>[TOC]</p><h2 id="_1-下载包" tabindex="-1">1.下载包 <a class="header-anchor" href="#_1-下载包" aria-label="Permalink to &quot;1.下载包&quot;">​</a></h2><ul><li>mac,自带v2ray-plugin</li></ul><p><a href="https://github.com/ssx-ng/ShadowsocksX-NG/releases/download/v1.10.0-alpha/ShadowsocksX-NG.zip" target="_blank" rel="noreferrer">https://github.com/ssx-ng/ShadowsocksX-NG/releases/download/v1.10.0-alpha/ShadowsocksX-NG.zip</a></p><ul><li>win</li></ul><p><a href="https://github.com/shadowsocks/shadowsocks-windows/releases/download/4.4.1.0/Shadowsocks-4.4.1.0.zip" target="_blank" rel="noreferrer">https://github.com/shadowsocks/shadowsocks-windows/releases/download/4.4.1.0/Shadowsocks-4.4.1.0.zip</a></p><p><a href="https://github.com/shadowsocks/v2ray-plugin/releases/download/v1.3.1/v2ray-plugin-windows-amd64-v1.3.1.tar.gz" target="_blank" rel="noreferrer">https://github.com/shadowsocks/v2ray-plugin/releases/download/v1.3.1/v2ray-plugin-windows-amd64-v1.3.1.tar.gz</a></p><ul><li>linux</li></ul><p><a href="https://github.com/shadowsocks/v2ray-plugin/releases/download/v1.3.1/v2ray-plugin-linux-amd64-v1.3.1.tar.gz" target="_blank" rel="noreferrer">https://github.com/shadowsocks/v2ray-plugin/releases/download/v1.3.1/v2ray-plugin-linux-amd64-v1.3.1.tar.gz</a></p><ul><li>android，<strong>官方建议使用 Shadowsocks 5.04版或以上版本</strong></li></ul><p><a href="https://github.com/shadowsocks/shadowsocks-android/releases/download/v5.2.6/shadowsocks--universal-v5.2.6.apk" target="_blank" rel="noreferrer">https://github.com/shadowsocks/shadowsocks-android/releases/download/v5.2.6/shadowsocks--universal-v5.2.6.apk</a></p><p><a href="https://github.com/shadowsocks/v2ray-plugin-android/releases/download/v1.3.3/v2ray--universal-1.3.3.apk" target="_blank" rel="noreferrer">https://github.com/shadowsocks/v2ray-plugin-android/releases/download/v1.3.3/v2ray--universal-1.3.3.apk</a></p><ul><li>ios</li></ul><p>小火箭，需要美版id登陆appstore下载</p><ul><li>配置域名</li></ul><p>免费域名申请：<a href="https://www.freenom.com" target="_blank" rel="noreferrer">https://www.freenom.com</a></p><p>DNS解析服务商：<a href="./">https://www.cloudflare.com/</a></p><p>Google Cloud Platform：<a href="https://cloud.google.com/" target="_blank" rel="noreferrer">https://cloud.google.com/</a></p><h2 id="_2-nginx安装" tabindex="-1">2.nginx安装 <a class="header-anchor" href="#_2-nginx安装" aria-label="Permalink to &quot;2.nginx安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install nginx</span></span></code></pre></div><ul><li>配置ss代理</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vss.freehan.ink</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/nginx/conf/roles/</span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.conf</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">^</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">.</span><span style="color:#E1E4E8;">*)$ </span><span style="color:#9ECBFF;">https://</span><span style="color:#E1E4E8;">$host</span><span style="color:#FFAB70;">$1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">permanent</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">443</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ssl</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vss.freehan.ink</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ssl_certificate</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/nginx/ssl/9262959_vss.freehan.ink.pem</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ssl_certificate_key</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/nginx/ssl/9262959_vss.freehan.ink.key</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ssl_session_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ssl_protocols</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TLSv1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TLSv1.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TLSv1.2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ssl_ciphers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">ssl_prefer_server_ciphers</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">keepalive_timeout</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">70</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Strict-Transport-Security</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;max-age=31536000; includeSubDomains; preload&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/nginx/conf/roles/</span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.conf</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($geoip2_data_country_name </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">= </span><span style="color:#9ECBFF;">China</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">444</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($geoip2_data_country_code </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">= </span><span style="color:#9ECBFF;">CN</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">444</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span>
<span class="line"></span>
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
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">error_page</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">404</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">502</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">503</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">504</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/404.html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 承接上面的location。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/404.html</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">html</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/vss</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_upgrade </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">= </span><span style="color:#9ECBFF;">&quot;websocket&quot;</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">404</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#B392F0;">waf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">waf_mode</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">STD</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">waf_cc_deny</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rate=</span><span style="color:#79B8FF;">200</span><span style="color:#9ECBFF;">r/s</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">duration=</span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">h</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">size=</span><span style="color:#79B8FF;">100</span><span style="color:#9ECBFF;">m</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">waf_cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">capacity=</span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">waf_http_status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">general=</span><span style="color:#79B8FF;">444</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cc_deny=</span><span style="color:#79B8FF;">444</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">proxy_redirect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://172.31.50.61:10132</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_http_version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Upgrade</span><span style="color:#E1E4E8;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Connection</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;upgrade&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Host</span><span style="color:#E1E4E8;"> $http_host;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Real-IP</span><span style="color:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_set_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">X-Forwarded-For</span><span style="color:#E1E4E8;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">deny</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">123.15</span><span style="color:#9ECBFF;">.129.1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">allow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">access_log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/nginx/access.log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">es</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vss.freehan.ink</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/nginx/conf/roles/</span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.conf</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">^</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">.</span><span style="color:#24292E;">*)$ </span><span style="color:#032F62;">https://</span><span style="color:#24292E;">$host</span><span style="color:#E36209;">$1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">permanent</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">listen</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">443</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ssl</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">server_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vss.freehan.ink</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ssl_certificate</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/nginx/ssl/9262959_vss.freehan.ink.pem</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ssl_certificate_key</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/nginx/ssl/9262959_vss.freehan.ink.key</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ssl_session_timeout</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#032F62;">m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ssl_protocols</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TLSv1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TLSv1.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TLSv1.2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ssl_ciphers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">ssl_prefer_server_ciphers</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">keepalive_timeout</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">70</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">add_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Strict-Transport-Security</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;max-age=31536000; includeSubDomains; preload&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/nginx/conf/roles/</span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.conf</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($geoip2_data_country_name </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">= </span><span style="color:#032F62;">China</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">444</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($geoip2_data_country_code </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">= </span><span style="color:#032F62;">CN</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">444</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span>
<span class="line"></span>
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
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">error_page</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">500</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">502</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">503</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">504</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/404.html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 承接上面的location。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/404.html</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">root</span><span style="color:#24292E;"> </span><span style="color:#032F62;">html</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/vss</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_upgrade </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">= </span><span style="color:#032F62;">&quot;websocket&quot;</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">        	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">404</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#6F42C1;">waf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">waf_mode</span><span style="color:#24292E;"> </span><span style="color:#032F62;">STD</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">waf_cc_deny</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rate=</span><span style="color:#005CC5;">200</span><span style="color:#032F62;">r/s</span><span style="color:#24292E;"> </span><span style="color:#032F62;">duration=</span><span style="color:#005CC5;">1</span><span style="color:#032F62;">h</span><span style="color:#24292E;"> </span><span style="color:#032F62;">size=</span><span style="color:#005CC5;">100</span><span style="color:#032F62;">m</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">waf_cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">capacity=</span><span style="color:#005CC5;">50</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">waf_http_status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">general=</span><span style="color:#005CC5;">444</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cc_deny=</span><span style="color:#005CC5;">444</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">proxy_redirect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://172.31.50.61:10132</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_http_version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Upgrade</span><span style="color:#24292E;"> $http_upgrade;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Connection</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;upgrade&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Host</span><span style="color:#24292E;"> $http_host;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Real-IP</span><span style="color:#24292E;"> $remote_addr;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_set_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">X-Forwarded-For</span><span style="color:#24292E;"> $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">deny</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">123.15</span><span style="color:#032F62;">.129.1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">allow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">access_log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/nginx/access.log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">es</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="_3-ss安装" tabindex="-1">3.ss安装 <a class="header-anchor" href="#_3-ss安装" aria-label="Permalink to &quot;3.ss安装&quot;">​</a></h2><p>。。。</p><h3 id="_3-1服务端配置" tabindex="-1">3.1服务端配置 <a class="header-anchor" href="#_3-1服务端配置" aria-label="Permalink to &quot;3.1服务端配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@feiji shadowsocks-libev]# cat config.json </span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;server&quot;:&quot;0.0.0.0&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;server_port&quot;:10132,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;local_port&quot;:1080,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;password&quot;:&quot;qDepCjE.4&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;timeout&quot;:300,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;user&quot;:&quot;nobody&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;fast_open&quot;:false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;mode&quot;:&quot;tcp_and_udp&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;method&quot;:&quot;aes-256-gcm&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;plugin&quot;:&quot;/usr/bin/v2ray-plugin&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;plugin_opts&quot;:&quot;server;host=127.0.0.1;path=/vss&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@feiji shadowsocks-libev]# cat config.json </span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;server&quot;:&quot;0.0.0.0&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;server_port&quot;:10132,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;local_port&quot;:1080,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;password&quot;:&quot;qDepCjE.4&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;timeout&quot;:300,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;user&quot;:&quot;nobody&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;fast_open&quot;:false,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;mode&quot;:&quot;tcp_and_udp&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;method&quot;:&quot;aes-256-gcm&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;plugin&quot;:&quot;/usr/bin/v2ray-plugin&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;plugin_opts&quot;:&quot;server;host=127.0.0.1;path=/vss&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>解压</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">tar zxvf v2ray-plugin-linux-amd64-v1.3.1.tar.gz &amp;&amp; mv v2ray-plugin_linux_amd64 /usr/bin/v2ray-plugin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">tar zxvf v2ray-plugin-linux-amd64-v1.3.1.tar.gz &amp;&amp; mv v2ray-plugin_linux_amd64 /usr/bin/v2ray-plugin</span></span></code></pre></div><ul><li>启动服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#启动，此时ss会自动启动v2ray-plugin 插件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/shadowsocks start</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#关闭ss,此时ss关闭，并不会关闭v2ray插件，需要手动关闭pid</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/init.d/shadowsocks stop</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#启动，此时ss会自动启动v2ray-plugin 插件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/shadowsocks start</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#关闭ss,此时ss关闭，并不会关闭v2ray插件，需要手动关闭pid</span></span>
<span class="line"><span style="color:#24292e;">/etc/init.d/shadowsocks stop</span></span></code></pre></div><h3 id="_3-2win-client配置" tabindex="-1">3.2win client配置 <a class="header-anchor" href="#_3-2win-client配置" aria-label="Permalink to &quot;3.2win client配置&quot;">​</a></h3><p>下载完成将插件<code>v2ray-plugin.exe</code>解压到shadowsocks的文件夹中（使其与<code>shadowsocks.exe</code>平级），启动按如下配置：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201046045.png" alt="image-20220211145235824"></p><h3 id="_3-3macos" tabindex="-1">3.3macos <a class="header-anchor" href="#_3-3macos" aria-label="Permalink to &quot;3.3macos&quot;">​</a></h3><p>将客户端解压到应用目录（客户端会自己安装插件），启动按如下配置：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201046245.png" alt="image-20220211145423646"></p><h3 id="_3-4android" tabindex="-1">3.4Android <a class="header-anchor" href="#_3-4android" aria-label="Permalink to &quot;3.4Android&quot;">​</a></h3><p>两个apk安装以后启动按如下配置：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201046037.png" alt="Android设置"></p><p>启用插件</p><p>点击配置</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310201047084.jpg" alt=""></p><p>点击右上角对勾，进行保存</p><h3 id="_3-5ios" tabindex="-1">3.5ios <a class="header-anchor" href="#_3-5ios" aria-label="Permalink to &quot;3.5ios&quot;">​</a></h3><p>小火箭2.1.5以上</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">地址:     xxx.com</span></span>
<span class="line"><span style="color:#e1e4e8;">端口:     443 </span></span>
<span class="line"><span style="color:#e1e4e8;">密码:     xxx</span></span>
<span class="line"><span style="color:#e1e4e8;">加密方式:  aes-256-gcm </span></span>
<span class="line"><span style="color:#e1e4e8;">插件:     v2ray-plugin</span></span>
<span class="line"><span style="color:#e1e4e8;">插件选项 : tls;host=xxx.com;path=/vss</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">地址:     xxx.com</span></span>
<span class="line"><span style="color:#24292e;">端口:     443 </span></span>
<span class="line"><span style="color:#24292e;">密码:     xxx</span></span>
<span class="line"><span style="color:#24292e;">加密方式:  aes-256-gcm </span></span>
<span class="line"><span style="color:#24292e;">插件:     v2ray-plugin</span></span>
<span class="line"><span style="color:#24292e;">插件选项 : tls;host=xxx.com;path=/vss</span></span></code></pre></div><h2 id="_4-配置cdn" tabindex="-1">4.配置CDN <a class="header-anchor" href="#_4-配置cdn" aria-label="Permalink to &quot;4.配置CDN&quot;">​</a></h2><p>选择cloudflare（被墙之后解决方式）</p><h2 id="_5-脚本安装" tabindex="-1">5.脚本安装 <a class="header-anchor" href="#_5-脚本安装" aria-label="Permalink to &quot;5.脚本安装&quot;">​</a></h2><p>Ubuntu 16.04 / Debian 9 wget -O ubuntu-ss-install.sh <a href="https://github.com/M3chD09/shadowsocks-with-v2ray-plugin-install/raw/master/ubuntu-ss-install.sh" target="_blank" rel="noreferrer">https://github.com/M3chD09/shadowsocks-with-v2ray-plugin-install/raw/master/ubuntu-ss-install.sh</a></p><p><strong>CentOS 7系统：</strong> wget -O centos-ss-install.sh <a href="https://github.com/M3chD09/shadowsocks-with-v2ray-plugin-install/raw/master/centos-ss-install.sh" target="_blank" rel="noreferrer">https://github.com/M3chD09/shadowsocks-with-v2ray-plugin-install/raw/master/centos-ss-install.sh</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl status shadowsocks              #运行状态</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start shadowsocks                #启动</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl stop shadowsocks               #停止</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl status shadowsocks              #运行状态</span></span>
<span class="line"><span style="color:#24292e;">systemctl start shadowsocks                #启动</span></span>
<span class="line"><span style="color:#24292e;">systemctl stop shadowsocks               #停止</span></span></code></pre></div><ul><li>rocklinux启动脚本</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env bash</span></span>
<span class="line"><span style="color:#6A737D;"># chkconfig: 2345 90 10</span></span>
<span class="line"><span style="color:#6A737D;"># description: A secure socks5 proxy, designed to protect your Internet traffic.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### BEGIN INIT INFO</span></span>
<span class="line"><span style="color:#6A737D;"># Provides:          Shadowsocks-libev</span></span>
<span class="line"><span style="color:#6A737D;"># Required-Start:    $network $syslog</span></span>
<span class="line"><span style="color:#6A737D;"># Required-Stop:     $network</span></span>
<span class="line"><span style="color:#6A737D;"># Default-Start:     2 3 4 5</span></span>
<span class="line"><span style="color:#6A737D;"># Default-Stop:      0 1 6</span></span>
<span class="line"><span style="color:#6A737D;"># Short-Description: Fast tunnel proxy that helps you bypass firewalls</span></span>
<span class="line"><span style="color:#6A737D;"># Description:       Start or stop the Shadowsocks-libev server</span></span>
<span class="line"><span style="color:#6A737D;">### END INIT INFO</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Author: Teddysun &lt;i@teddysun.com&gt;</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">-f</span><span style="color:#E1E4E8;"> /usr/local/bin/ss-server ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">    DAEMON</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/bin/ss-server</span></span>
<span class="line"><span style="color:#F97583;">elif</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">-f</span><span style="color:#E1E4E8;"> /usr/bin/ss-server ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">    DAEMON</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/bin/ss-server</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;">NAME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">Shadowsocks-libev</span></span>
<span class="line"><span style="color:#E1E4E8;">CONF</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/etc/shadowsocks-libev/config.json</span></span>
<span class="line"><span style="color:#E1E4E8;">PID_DIR</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/var/run</span></span>
<span class="line"><span style="color:#E1E4E8;">PID_FILE</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$PID_DIR</span><span style="color:#9ECBFF;">/shadowsocks-libev.pid</span></span>
<span class="line"><span style="color:#E1E4E8;">RET_VAL</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[ </span><span style="color:#F97583;">-x</span><span style="color:#E1E4E8;"> $DAEMON ] </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-d</span><span style="color:#E1E4E8;"> $PID_DIR ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> $PID_DIR</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#79B8FF;">$?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-ne</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Creating PID directory </span><span style="color:#E1E4E8;">$PID_DIR</span><span style="color:#9ECBFF;"> failed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-f</span><span style="color:#E1E4E8;"> $CONF ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> config file </span><span style="color:#E1E4E8;">$CONF</span><span style="color:#9ECBFF;"> not found&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">check_running</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">-r</span><span style="color:#E1E4E8;"> $PID_FILE ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">read</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PID</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> $PID_FILE</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/proc/</span><span style="color:#E1E4E8;">$PID</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> $PID_FILE</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">do_status</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">check_running</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">$?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span></span>
<span class="line"><span style="color:#E1E4E8;">        0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> (pid </span><span style="color:#E1E4E8;">$PID</span><span style="color:#9ECBFF;">) is running...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ;;</span></span>
<span class="line"><span style="color:#E1E4E8;">        1|2)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> is stopped&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        RET_VAL</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">        ;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">esac</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">do_start</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">check_running</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> (pid </span><span style="color:#E1E4E8;">$PID</span><span style="color:#9ECBFF;">) is already running...&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;">    $DAEMON </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> $CONF </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> $PID_FILE</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">check_running</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Starting </span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> success&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Starting </span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> failed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        RET_VAL</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">do_stop</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">check_running</span><span style="color:#E1E4E8;">; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">kill</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-9</span><span style="color:#E1E4E8;"> $PID</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> $PID_FILE</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Stopping </span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> success&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$NAME</span><span style="color:#9ECBFF;"> is stopped&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        RET_VAL</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">do_restart</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">do_stop</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.5</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">do_start</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">$1</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span></span>
<span class="line"><span style="color:#E1E4E8;">    start|stop|restart|status)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">do_$1</span></span>
<span class="line"><span style="color:#E1E4E8;">    ;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Usage: </span><span style="color:#79B8FF;">$0</span><span style="color:#9ECBFF;"> { start | stop | restart | status }&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    RET_VAL</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    ;;</span></span>
<span class="line"><span style="color:#F97583;">esac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> $RET_VAL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/env bash</span></span>
<span class="line"><span style="color:#6A737D;"># chkconfig: 2345 90 10</span></span>
<span class="line"><span style="color:#6A737D;"># description: A secure socks5 proxy, designed to protect your Internet traffic.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### BEGIN INIT INFO</span></span>
<span class="line"><span style="color:#6A737D;"># Provides:          Shadowsocks-libev</span></span>
<span class="line"><span style="color:#6A737D;"># Required-Start:    $network $syslog</span></span>
<span class="line"><span style="color:#6A737D;"># Required-Stop:     $network</span></span>
<span class="line"><span style="color:#6A737D;"># Default-Start:     2 3 4 5</span></span>
<span class="line"><span style="color:#6A737D;"># Default-Stop:      0 1 6</span></span>
<span class="line"><span style="color:#6A737D;"># Short-Description: Fast tunnel proxy that helps you bypass firewalls</span></span>
<span class="line"><span style="color:#6A737D;"># Description:       Start or stop the Shadowsocks-libev server</span></span>
<span class="line"><span style="color:#6A737D;">### END INIT INFO</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Author: Teddysun &lt;i@teddysun.com&gt;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">-f</span><span style="color:#24292E;"> /usr/local/bin/ss-server ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">    DAEMON</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/bin/ss-server</span></span>
<span class="line"><span style="color:#D73A49;">elif</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">-f</span><span style="color:#24292E;"> /usr/bin/ss-server ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">    DAEMON</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/bin/ss-server</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#24292E;">NAME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">Shadowsocks-libev</span></span>
<span class="line"><span style="color:#24292E;">CONF</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/etc/shadowsocks-libev/config.json</span></span>
<span class="line"><span style="color:#24292E;">PID_DIR</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/var/run</span></span>
<span class="line"><span style="color:#24292E;">PID_FILE</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$PID_DIR</span><span style="color:#032F62;">/shadowsocks-libev.pid</span></span>
<span class="line"><span style="color:#24292E;">RET_VAL</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[ </span><span style="color:#D73A49;">-x</span><span style="color:#24292E;"> $DAEMON ] </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">!</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-d</span><span style="color:#24292E;"> $PID_DIR ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> $PID_DIR</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#005CC5;">$?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-ne</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Creating PID directory </span><span style="color:#24292E;">$PID_DIR</span><span style="color:#032F62;"> failed&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">!</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-f</span><span style="color:#24292E;"> $CONF ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> config file </span><span style="color:#24292E;">$CONF</span><span style="color:#032F62;"> not found&quot;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">check_running</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">-r</span><span style="color:#24292E;"> $PID_FILE ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">read</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PID</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> $PID_FILE</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/proc/</span><span style="color:#24292E;">$PID</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> $PID_FILE</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">do_status</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">check_running</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">$?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span></span>
<span class="line"><span style="color:#24292E;">        0)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> (pid </span><span style="color:#24292E;">$PID</span><span style="color:#032F62;">) is running...&quot;</span></span>
<span class="line"><span style="color:#24292E;">        ;;</span></span>
<span class="line"><span style="color:#24292E;">        1|2)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> is stopped&quot;</span></span>
<span class="line"><span style="color:#24292E;">        RET_VAL</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">        ;;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">esac</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">do_start</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">check_running</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> (pid </span><span style="color:#24292E;">$PID</span><span style="color:#032F62;">) is already running...&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#24292E;">    $DAEMON </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> $CONF </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> $PID_FILE</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">check_running</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Starting </span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> success&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Starting </span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> failed&quot;</span></span>
<span class="line"><span style="color:#24292E;">        RET_VAL</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">do_stop</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">check_running</span><span style="color:#24292E;">; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">kill</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-9</span><span style="color:#24292E;"> $PID</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> $PID_FILE</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Stopping </span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> success&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$NAME</span><span style="color:#032F62;"> is stopped&quot;</span></span>
<span class="line"><span style="color:#24292E;">        RET_VAL</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">do_restart</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">do_stop</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.5</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">do_start</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">$1</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span></span>
<span class="line"><span style="color:#24292E;">    start|stop|restart|status)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">do_$1</span></span>
<span class="line"><span style="color:#24292E;">    ;;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Usage: </span><span style="color:#005CC5;">$0</span><span style="color:#032F62;"> { start | stop | restart | status }&quot;</span></span>
<span class="line"><span style="color:#24292E;">    RET_VAL</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    ;;</span></span>
<span class="line"><span style="color:#D73A49;">esac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> $RET_VAL</span></span></code></pre></div>`,55),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",c]]);export{u as __pageData,h as default};
