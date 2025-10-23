import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/ssl证书/3-http-https.md","filePath":"guide/Linux/web/nginx/ssl证书/3-http-https.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/ssl证书/3-http-https.md"},p=a(`<ul><li>1种</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($scheme = http ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 301 https://$host$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($scheme = http ) {</span></span>
<span class="line"><span style="color:#24292e;">return 301 https://$host$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>2种</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server_name xxx.com ;</span></span>
<span class="line"><span style="color:#e1e4e8;">rewrite ^(.*) https://xxx.com$1 permanent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server_name xxx.com ;</span></span>
<span class="line"><span style="color:#24292e;">rewrite ^(.*) https://xxx.com$1 permanent</span></span></code></pre></div><ul><li>3种</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($server_port = 80 ) {</span></span>
<span class="line"><span style="color:#e1e4e8;">return 301 https://$host$request_uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">这个与第一种差不多</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($server_port = 80 ) {</span></span>
<span class="line"><span style="color:#24292e;">return 301 https://$host$request_uri;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">这个与第一种差不多</span></span></code></pre></div><ul><li>4种</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server_name xxx.com ;</span></span>
<span class="line"><span style="color:#e1e4e8;">return 301 https://$server_name$request_uri;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server_name xxx.com ;</span></span>
<span class="line"><span style="color:#24292e;">return 301 https://$server_name$request_uri;</span></span></code></pre></div><ul><li>5种</li></ul><p>497 状态码</p><p>当 server 只允许 HTTPS 请求时，基于 HTTP 的访问会被 Nginx 返回 497 错误。这时我们使用 error_page 将访问重定向至 HTTPS 上：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">error_page  497  https://$server_name$request_uri;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">error_page  497  https://$server_name$request_uri;</span></span></code></pre></div><ul><li>6种</li></ul><p>返回一个写入 meta 标签的 html 页面，让浏览器跳转。和上面三种方式不同，此方案不在 Nginx 上进行跳转，节约服务器资源，而缺点是不能写入 $request_uri 变量，只能跳转到固定地址</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ...</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    index  meta.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    error_page 404 meta.html;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在要返回的 meta.html 中写入：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=\${你要跳转的目标地址}&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">本站就使用这个方案，所以我是这样写的：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=https://xxx.org/&quot;&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/html&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    ...</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    index  meta.html;</span></span>
<span class="line"><span style="color:#24292e;">    error_page 404 meta.html;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在要返回的 meta.html 中写入：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#24292e;">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=\${你要跳转的目标地址}&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#24292e;">本站就使用这个方案，所以我是这样写的：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&lt;html&gt;</span></span>
<span class="line"><span style="color:#24292e;">  &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0; url=https://xxx.org/&quot;&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/html&gt;</span></span></code></pre></div>`,15),t=[p];function o(c,r,i,u,h,d){return e(),n("div",null,t)}const m=s(l,[["render",o]]);export{y as __pageData,m as default};
