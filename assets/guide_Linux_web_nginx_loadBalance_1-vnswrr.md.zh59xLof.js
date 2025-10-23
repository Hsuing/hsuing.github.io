import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/loadBalance/1-vnswrr.md","filePath":"guide/Linux/web/nginx/loadBalance/1-vnswrr.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/loadBalance/1-vnswrr.md"},l=e(`<p>VNSWRR模块是一个高效的负载均衡算法，同Nginx官方的加权轮询算法SWRR相比，VNSWRR 具备 平滑、散列和高性能特征</p><p><a href="https://github.com/alibaba/tengine" target="_blank" rel="noreferrer">https://github.com/alibaba/tengine</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream backend {</span></span>
<span class="line"><span style="color:#e1e4e8;">	vnswrr;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 172.17.155.86:81;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 172.17.155.86:82;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name test.freehan.ink;</span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass http://backend;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream backend {</span></span>
<span class="line"><span style="color:#24292e;">	vnswrr;</span></span>
<span class="line"><span style="color:#24292e;">	server 172.17.155.86:81;</span></span>
<span class="line"><span style="color:#24292e;">	server 172.17.155.86:82;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name test.freehan.ink;</span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass http://backend;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_1-案例" tabindex="-1">1.案例 <a class="header-anchor" href="#_1-案例" aria-label="Permalink to &quot;1.案例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream UPstream {</span></span>
<span class="line"><span style="color:#e1e4e8;">	vnswrr;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server xxx:8000 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server xxx:9080  max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server xxx:8000 max_fails=5 fail_timeout=30s backup;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    check interval=4000 rise=2 fall=3 timeout=3500 type=tcp;</span></span>
<span class="line"><span style="color:#e1e4e8;">	check_keepalive_requests 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">	#check_http_send &quot;GET / HTTP/1.1\\r\\nHost:\\r\\nConnection: keep-alive\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">	#check_http_expect_alive http_4xx;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80 reuseport;</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 443 ssl http2 reuseport;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  cywebxjpa.xxx.io;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate /data/apps/nginx/ssl/xx.crt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_certificate_key /data/apps/nginx/ssl/xx.key;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_ciphers &#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_timeout 5m;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssl_session_cache shared:SSL:20m;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($server_port !~ 443) {</span></span>
<span class="line"><span style="color:#e1e4e8;">	rewrite ^(.*)$ https://$host$1 redirect;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if ($host !~* &#39;cywebxjpa.xx.io&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">		return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">waf on;</span></span>
<span class="line"><span style="color:#e1e4e8;">waf_mode STD;</span></span>
<span class="line"><span style="color:#e1e4e8;">waf_cc_deny on rate=200r/s duration=1h size=100m;</span></span>
<span class="line"><span style="color:#e1e4e8;">waf_cache capacity=50;</span></span>
<span class="line"><span style="color:#e1e4e8;">waf_http_status general=444 cc_deny=444;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Pragma $geoip2_data_country_code;</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_connect_timeout 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_read_timeout 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_send_timeout 30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_next_upstream error timeout invalid_header http_500 non_idempotent http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_next_upstream_timeout 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_next_upstream_tries 0;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass     http://bcwxjpa1UP/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header city $geoip2_data_city_name;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 	proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header Connection $connection_upgrade;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_buffer_size 64k;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_buffers 8 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_busy_buffers_size 256k;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_temp_file_write_size 256k;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log  /var/log/nginx/cyweb.log json_analytics;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream UPstream {</span></span>
<span class="line"><span style="color:#24292e;">	vnswrr;</span></span>
<span class="line"><span style="color:#24292e;">	server xxx:8000 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">	server xxx:9080  max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">	server xxx:8000 max_fails=5 fail_timeout=30s backup;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    check interval=4000 rise=2 fall=3 timeout=3500 type=tcp;</span></span>
<span class="line"><span style="color:#24292e;">	check_keepalive_requests 100;</span></span>
<span class="line"><span style="color:#24292e;">	#check_http_send &quot;GET / HTTP/1.1\\r\\nHost:\\r\\nConnection: keep-alive\\r\\n\\r\\n&quot;;</span></span>
<span class="line"><span style="color:#24292e;">	#check_http_expect_alive http_4xx;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80 reuseport;</span></span>
<span class="line"><span style="color:#24292e;">    listen 443 ssl http2 reuseport;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  cywebxjpa.xxx.io;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate /data/apps/nginx/ssl/xx.crt;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_certificate_key /data/apps/nginx/ssl/xx.key;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_protocols TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_ciphers &#39;EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_timeout 5m;</span></span>
<span class="line"><span style="color:#24292e;">    ssl_session_cache shared:SSL:20m;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($server_port !~ 443) {</span></span>
<span class="line"><span style="color:#24292e;">	rewrite ^(.*)$ https://$host$1 redirect;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if ($host !~* &#39;cywebxjpa.xx.io&#39;){</span></span>
<span class="line"><span style="color:#24292e;">		return 403;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">waf on;</span></span>
<span class="line"><span style="color:#24292e;">waf_mode STD;</span></span>
<span class="line"><span style="color:#24292e;">waf_cc_deny on rate=200r/s duration=1h size=100m;</span></span>
<span class="line"><span style="color:#24292e;">waf_cache capacity=50;</span></span>
<span class="line"><span style="color:#24292e;">waf_http_status general=444 cc_deny=444;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header Pragma $geoip2_data_country_code;</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">	proxy_connect_timeout 30s;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_read_timeout 30s;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_send_timeout 30s;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_next_upstream error timeout invalid_header http_500 non_idempotent http_502 http_503 http_504;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_next_upstream_timeout 0;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_next_upstream_tries 0;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass     http://bcwxjpa1UP/;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header city $geoip2_data_city_name;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	proxy_http_version 1.1;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header Connection &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 	proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header Connection $connection_upgrade;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_buffer_size 64k;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_buffers 8 128k;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_busy_buffers_size 256k;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_temp_file_write_size 256k;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">	access_log  /var/log/nginx/cyweb.log json_analytics;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,5),o=[l];function t(c,r,i,y,_,d){return n(),a("div",null,o)}const u=s(p,[["render",t]]);export{h as __pageData,u as default};
