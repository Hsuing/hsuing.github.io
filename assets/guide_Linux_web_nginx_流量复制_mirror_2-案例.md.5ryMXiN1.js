import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/流量复制/mirror/2-案例.md","filePath":"guide/Linux/web/nginx/流量复制/mirror/2-案例.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/流量复制/mirror/2-案例.md"},p=e(`<h2 id="简单进行流量复制" tabindex="-1">简单进行流量复制 <a class="header-anchor" href="#简单进行流量复制" aria-label="Permalink to &quot;简单进行流量复制&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen 8181;</span></span>
<span class="line"><span style="color:#e1e4e8;">        access_log /var/log/nginx/test.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">        root html/test;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen 8282;</span></span>
<span class="line"><span style="color:#e1e4e8;">        access_log /var/log/nginx/mir1.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">        root html/mir1;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen 8383;</span></span>
<span class="line"><span style="color:#e1e4e8;">        access_log /var/log/nginx/mir2.log;</span></span>
<span class="line"><span style="color:#e1e4e8;">        root html/mir2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    upstream backend {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 127.0.0.1:8181;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    upstream test_backend1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 127.0.0.1:8282;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    upstream test_backend2 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server 127.0.0.1:8383;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">            mirror /mirror1;</span></span>
<span class="line"><span style="color:#e1e4e8;">            mirror /mirror2;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass http://backend;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        location = /mirror1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">            internal;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass http://test_backend1$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        location = /mirror2 {</span></span>
<span class="line"><span style="color:#e1e4e8;">            internal;</span></span>
<span class="line"><span style="color:#e1e4e8;">            proxy_pass http://test_backend2$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen 8181;</span></span>
<span class="line"><span style="color:#24292e;">        access_log /var/log/nginx/test.log;</span></span>
<span class="line"><span style="color:#24292e;">        root html/test;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    server {</span></span>
<span class="line"><span style="color:#24292e;">        listen 8282;</span></span>
<span class="line"><span style="color:#24292e;">        access_log /var/log/nginx/mir1.log;</span></span>
<span class="line"><span style="color:#24292e;">        root html/mir1;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    server {</span></span>
<span class="line"><span style="color:#24292e;">        listen 8383;</span></span>
<span class="line"><span style="color:#24292e;">        access_log /var/log/nginx/mir2.log;</span></span>
<span class="line"><span style="color:#24292e;">        root html/mir2;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    upstream backend {</span></span>
<span class="line"><span style="color:#24292e;">        server 127.0.0.1:8181;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    upstream test_backend1 {</span></span>
<span class="line"><span style="color:#24292e;">        server 127.0.0.1:8282;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    upstream test_backend2 {</span></span>
<span class="line"><span style="color:#24292e;">        server 127.0.0.1:8383;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    server {</span></span>
<span class="line"><span style="color:#24292e;">        listen 80;</span></span>
<span class="line"><span style="color:#24292e;">        server_name localhost;</span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">            mirror /mirror1;</span></span>
<span class="line"><span style="color:#24292e;">            mirror /mirror2;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass http://backend;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        location = /mirror1 {</span></span>
<span class="line"><span style="color:#24292e;">            internal;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass http://test_backend1$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        location = /mirror2 {</span></span>
<span class="line"><span style="color:#24292e;">            internal;</span></span>
<span class="line"><span style="color:#24292e;">            proxy_pass http://test_backend2$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>验证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cd /usr/local/nginx/html/</span></span>
<span class="line"><span style="color:#e1e4e8;">$ mkdir test mir1 mir2</span></span>
<span class="line"><span style="color:#e1e4e8;">$ echo test &gt; test/index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">$ echo mir1 &gt; mir1/index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">$ echo mir2 &gt; mir2/index.html</span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl 127.0.0.1/index.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cd /usr/local/nginx/html/</span></span>
<span class="line"><span style="color:#24292e;">$ mkdir test mir1 mir2</span></span>
<span class="line"><span style="color:#24292e;">$ echo test &gt; test/index.html</span></span>
<span class="line"><span style="color:#24292e;">$ echo mir1 &gt; mir1/index.html</span></span>
<span class="line"><span style="color:#24292e;">$ echo mir2 &gt; mir2/index.html</span></span>
<span class="line"><span style="color:#24292e;">$ curl 127.0.0.1/index.html</span></span></code></pre></div>`,4),o=[p];function c(r,t,i,y,m,d){return n(),a("div",null,o)}const g=s(l,[["render",c]]);export{_ as __pageData,g as default};
