import{_ as s,c as a,o as n,R as p}from"./chunks/framework.CIzs38F0.js";const _=JSON.parse('{"title":"一、proxy_pass","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/proxy/1-proxy_pass.md","filePath":"guide/Linux/web/nginx/proxy/1-proxy_pass.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/proxy/1-proxy_pass.md"},e=p(`<h1 id="一、proxy-pass" tabindex="-1">一、proxy_pass <a class="header-anchor" href="#一、proxy-pass" aria-label="Permalink to &quot;一、proxy_pass&quot;">​</a></h1><ul><li>Nginx proxy_pass 后面的url 加/与不加/的区别</li></ul><blockquote><p>[!TIP] 在nginx中配置proxy_pass时，当在后面的url加上了/，相当于是绝对根路径，则nginx不会把location中匹配的路径部分代理走;</p></blockquote><blockquote><p>如果没有/，则会把匹配的路径部分也给代理走</p></blockquote><ul><li>第一种</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://127.0.0.1:81/;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://127.0.0.1:81/;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><p>会被代理到 <a href="http://127.0.0.1:81/test.html" target="_blank" rel="noreferrer">http://127.0.0.1:81/test.html</a> 这个url</p></div><ul><li>第二(相对于第一种，最后少一个 / ) (proxy_pass 参数中如果不包含url的路径，则会将location的pattern识别的路径作为绝对路径</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://127.0.0.1:81;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://127.0.0.1:81;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><p>会被代理到 <a href="http://127.0.0.1:81/proxy/test.html" target="_blank" rel="noreferrer">http://127.0.0.1:81/proxy/test.html</a> 这个url</p></div><ul><li>第三种</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://127.0.0.1:81/ftlynx/;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://127.0.0.1:81/ftlynx/;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><p>会被代理到 <a href="http://127.0.0.1:81/ftlynx/test.html" target="_blank" rel="noreferrer">http://127.0.0.1:81/ftlynx/test.html</a> 这个url</p></div><ul><li>第四种情况(相对于第三种，最后少一个 / )</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://127.0.0.1:81/ftlynx;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location  /proxy/ {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://127.0.0.1:81/ftlynx;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><p>会被代理到 <a href="http://127.0.0.1:81/ftlynxtest.html" target="_blank" rel="noreferrer">http://127.0.0.1:81/ftlynxtest.html</a> 这个url</p></div><h2 id="_1-1案例" tabindex="-1">1.1案例 <a class="header-anchor" href="#_1-1案例" aria-label="Permalink to &quot;1.1案例&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">   listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">   server_name  localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api1/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   # http://localhost/api1/xxx -&gt; http://localhost:8080/api1/xxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api2/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   # http://localhost/api2/xxx -&gt; http://localhost:8080/xxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api3 {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   # http://localhost/api3/xxx -&gt; http://localhost:8080/api3/xxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api4 {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   # http://localhost/api4/xxx -&gt; http://localhost:8080//xxx，请注意这里的双斜线，好好分析一下。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api5/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080/haha;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   # http://localhost/api5/xxx -&gt; http://localhost:8080/hahaxxx，请注意这里的haha和xxx之间没有斜杠，分析一下原因。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api6/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080/haha/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   # http://localhost/api6/xxx -&gt; http://localhost:8080/haha/xxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api7 {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080/haha;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">   # http://localhost/api7/xxx -&gt; http://localhost:8080/haha/xxx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   location /api8 {</span></span>
<span class="line"><span style="color:#e1e4e8;">           proxy_pass http://localhost:8080/haha/;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">  # http://localhost/api8/xxx -&gt; http://localhost:8080/haha//xxx，请注意这里的双斜杠。</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">   listen       80;</span></span>
<span class="line"><span style="color:#24292e;">   server_name  localhost;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api1/ {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   # http://localhost/api1/xxx -&gt; http://localhost:8080/api1/xxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api2/ {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080/;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   # http://localhost/api2/xxx -&gt; http://localhost:8080/xxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api3 {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   # http://localhost/api3/xxx -&gt; http://localhost:8080/api3/xxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api4 {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080/;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   # http://localhost/api4/xxx -&gt; http://localhost:8080//xxx，请注意这里的双斜线，好好分析一下。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api5/ {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080/haha;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   # http://localhost/api5/xxx -&gt; http://localhost:8080/hahaxxx，请注意这里的haha和xxx之间没有斜杠，分析一下原因。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api6/ {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080/haha/;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   # http://localhost/api6/xxx -&gt; http://localhost:8080/haha/xxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api7 {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080/haha;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">   # http://localhost/api7/xxx -&gt; http://localhost:8080/haha/xxx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   location /api8 {</span></span>
<span class="line"><span style="color:#24292e;">           proxy_pass http://localhost:8080/haha/;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">  # http://localhost/api8/xxx -&gt; http://localhost:8080/haha//xxx，请注意这里的双斜杠。</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,18),o=[e];function t(c,i,r,h,y,x){return n(),a("div",null,o)}const g=s(l,[["render",t]]);export{_ as __pageData,g as default};
