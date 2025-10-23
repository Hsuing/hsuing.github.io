import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/proxy/index.md","filePath":"guide/Linux/web/nginx/proxy/index.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/proxy/index.md"},l=a(`<p>sawk &#39;{if($NF==&quot;HIT&quot;) hit++} END {printf &quot;%.2f%\\n&quot;,hit/NR*100 }&#39; access.log</p><ul><li>proxy 优化</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//nignx会把后端返回的内容先放到缓冲区当中，然后再返回给客户端,边收边传, 不是全部接收完再传给客户端</span></span>
<span class="line"><span style="color:#e1e4e8;">Syntax:  proxy_buffering on | off;</span></span>
<span class="line"><span style="color:#e1e4e8;">Default: proxy_buffering on;</span></span>
<span class="line"><span style="color:#e1e4e8;">Context: http, server, location</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//设置nginx代理保存用户头信息的缓冲区大小</span></span>
<span class="line"><span style="color:#e1e4e8;">Syntax:  proxy_buffer_size size;</span></span>
<span class="line"><span style="color:#e1e4e8;">Default: proxy_buffer_size 4k|8k;</span></span>
<span class="line"><span style="color:#e1e4e8;">Context: http, server, location</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//proxy_buffers 缓冲区</span></span>
<span class="line"><span style="color:#e1e4e8;">Syntax:  proxy_buffers number size;</span></span>
<span class="line"><span style="color:#e1e4e8;">Default: proxy_buffers 8 4k|8k;</span></span>
<span class="line"><span style="color:#e1e4e8;">Context: http, server, location</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//nignx会把后端返回的内容先放到缓冲区当中，然后再返回给客户端,边收边传, 不是全部接收完再传给客户端</span></span>
<span class="line"><span style="color:#24292e;">Syntax:  proxy_buffering on | off;</span></span>
<span class="line"><span style="color:#24292e;">Default: proxy_buffering on;</span></span>
<span class="line"><span style="color:#24292e;">Context: http, server, location</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//设置nginx代理保存用户头信息的缓冲区大小</span></span>
<span class="line"><span style="color:#24292e;">Syntax:  proxy_buffer_size size;</span></span>
<span class="line"><span style="color:#24292e;">Default: proxy_buffer_size 4k|8k;</span></span>
<span class="line"><span style="color:#24292e;">Context: http, server, location</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//proxy_buffers 缓冲区</span></span>
<span class="line"><span style="color:#24292e;">Syntax:  proxy_buffers number size;</span></span>
<span class="line"><span style="color:#24292e;">Default: proxy_buffers 8 4k|8k;</span></span>
<span class="line"><span style="color:#24292e;">Context: http, server, location</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@Nginx ~]# vim /etc/nginx/proxy_params</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_connect_timeout 30;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_send_timeout 60;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_read_timeout 60;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_buffering on;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_buffer_size 32k;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_buffers 4 128k;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//如何调用</span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://10.0.0.10:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    include proxy_params;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@Nginx ~]# vim /etc/nginx/proxy_params</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">proxy_connect_timeout 30;</span></span>
<span class="line"><span style="color:#24292e;">proxy_send_timeout 60;</span></span>
<span class="line"><span style="color:#24292e;">proxy_read_timeout 60;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">proxy_buffering on;</span></span>
<span class="line"><span style="color:#24292e;">proxy_buffer_size 32k;</span></span>
<span class="line"><span style="color:#24292e;">proxy_buffers 4 128k;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//如何调用</span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://10.0.0.10:80;</span></span>
<span class="line"><span style="color:#24292e;">    include proxy_params;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_1-proxy-next" tabindex="-1">1,proxy_next <a class="header-anchor" href="#_1-proxy-next" aria-label="Permalink to &quot;1,proxy_next&quot;">​</a></h2><p><a href="http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream" target="_blank" rel="noreferrer">http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream</a></p><p>proxy_next_upstream项定义了什么情况下进行重试</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1\`\`.Syntax: proxy_next_upstream error | timeout | invalid_header </span></span>
<span class="line"><span style="color:#e1e4e8;">  \`\`| http_500 | http_502 | http_503 | http_504 | http_403 | http_404 | off ...; </span></span>
<span class="line"><span style="color:#e1e4e8;">2\`\`.Default:  proxy_next_upstream error timeout; </span></span>
<span class="line"><span style="color:#e1e4e8;">3\`\`.Context:  http, server, location</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1\`\`.Syntax: proxy_next_upstream error | timeout | invalid_header </span></span>
<span class="line"><span style="color:#24292e;">  \`\`| http_500 | http_502 | http_503 | http_504 | http_403 | http_404 | off ...; </span></span>
<span class="line"><span style="color:#24292e;">2\`\`.Default:  proxy_next_upstream error timeout; </span></span>
<span class="line"><span style="color:#24292e;">3\`\`.Context:  http, server, location</span></span></code></pre></div><h2 id="_2-proxy-redirect" tabindex="-1">2.proxy_redirect <a class="header-anchor" href="#_2-proxy-redirect" aria-label="Permalink to &quot;2.proxy_redirect&quot;">​</a></h2><p>proxy_redirect 该指令用来修改被代理服务器返回的响应头中的Location头域和“refresh”头域</p><p><strong>语法结构为：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">proxy_redirect redirect replacement;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_redirect default;</span></span>
<span class="line"><span style="color:#e1e4e8;">proxy_redirect off;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">proxy_redirect redirect replacement;</span></span>
<span class="line"><span style="color:#24292e;">proxy_redirect default;</span></span>
<span class="line"><span style="color:#24292e;">proxy_redirect off;</span></span></code></pre></div><p><strong>错误示例：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name www.xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    index  index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location /</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Real-IP      $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name www.xxx.com;</span></span>
<span class="line"><span style="color:#24292e;">    index  index.html;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location /</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header host $host;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Real-IP      $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>当请求的链接为 <a href="http://www.xxx.com/aming" target="_blank" rel="noreferrer">http://www.xxx.com/aming</a> 　　结果会返回301，定向到了 <a href="http://www.xxx.com:8080/aming/" target="_blank" rel="noreferrer">http://www.xxx.com:8080/aming/</a></p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>返回301有几个先决条件</p><p>1.location后面必须是/;</p><ol start="2"><li>proxy_pass后面的URL不能加uri,只能是IP或者IP:port结尾，并不能以/结尾；</li><li>访问的uri必须是一个真实存在的目录，如，这里的aming必须是存在的</li><li>访问的时候，不能以/结尾，只能是 www.xxx.com/aming</li></ol></div><p>虽然，这4个条件挺苛刻，但确实会遇到类似的请求。解决方法是，加一行proxy_redirect <a href="http://:8080$host/" target="_blank" rel="noreferrer">http://:8080$host/</a> /;</p><p><strong>正确示例：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name www.xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    index  index.html;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    location /</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_redirect http://$host:8080/ /;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Real-IP      $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Host # 包含客户端真实的域名和端口号；</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Forwarded-Proto # 表示客户端真实的协议（http还是https）；</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Real-IP # 表示客户端真实的IP；</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Forwarded-For # 这个 Header 和 X-Real-IP 类似，但它在多层代理时会包含真实客户端及中间</span></span>
<span class="line"><span style="color:#e1e4e8;">每个代理服务器的IP</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name www.xxx.com;</span></span>
<span class="line"><span style="color:#24292e;">    index  index.html;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    location /</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://127.0.0.1:8080;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header host $host;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_redirect http://$host:8080/ /;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Real-IP      $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Host # 包含客户端真实的域名和端口号；</span></span>
<span class="line"><span style="color:#24292e;">X-Forwarded-Proto # 表示客户端真实的协议（http还是https）；</span></span>
<span class="line"><span style="color:#24292e;">X-Real-IP # 表示客户端真实的IP；</span></span>
<span class="line"><span style="color:#24292e;">X-Forwarded-For # 这个 Header 和 X-Real-IP 类似，但它在多层代理时会包含真实客户端及中间</span></span>
<span class="line"><span style="color:#24292e;">每个代理服务器的IP</span></span></code></pre></div>`,19),o=[l];function t(r,c,i,y,d,_){return n(),e("div",null,o)}const u=s(p,[["render",t]]);export{h as __pageData,u as default};
