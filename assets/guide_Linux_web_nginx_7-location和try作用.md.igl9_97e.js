import{_ as s,o as n,c as a,R as e}from"./chunks/framework.PZ77rLUR.js";const _=JSON.parse('{"title":"nginx 配置文件","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/7-location和try作用.md","filePath":"guide/Linux/web/nginx/7-location和try作用.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/7-location和try作用.md"},p=e(`<h1 id="nginx-配置文件" tabindex="-1">nginx 配置文件 <a class="header-anchor" href="#nginx-配置文件" aria-label="Permalink to &quot;nginx 配置文件&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name  api.xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    root /mnt/try;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header  Content-Type &#39;text/html; charset=utf-8&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #echo $uri;</span></span>
<span class="line"><span style="color:#e1e4e8;">        try_files $uri @default;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">    location @default {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /mnt/default;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name  api.xxx.com;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    root /mnt/try;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        add_header  Content-Type &#39;text/html; charset=utf-8&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        #echo $uri;</span></span>
<span class="line"><span style="color:#24292e;">        try_files $uri @default;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">    location @default {</span></span>
<span class="line"><span style="color:#24292e;">        root /mnt/default;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="location-xxx-作用" tabindex="-1">location @xxx　作用 <a class="header-anchor" href="#location-xxx-作用" aria-label="Permalink to &quot;location @xxx　作用&quot;">​</a></h1><p>location @xxx解释：定义一个location段，不能被外部请求所访问，只能用于nginx内部配置指令使用，比如 try_files、error_page。</p><blockquote><p>$uri解释：URI代表资源的名称</p></blockquote><p>浏览器访问 <a href="http://api.xxx.com/abc/index.html" target="_blank" rel="noreferrer">http://api.xxx.com/abc/index.html</a> 时，当前的$uri值为/abc/index.html</p><p>可以通过编译nginx参数--add-module添加第三方echo模块打印$uri</p><h1 id="try-files作用" tabindex="-1">try_files作用： <a class="header-anchor" href="#try-files作用" aria-label="Permalink to &quot;try_files作用：&quot;">​</a></h1><p>try_files会先尝试去/mnt/try目录下找abc目录下的index.html，如果有，直接返回，没有的话则跳转到@default部分（内部重定向）。</p><p>在default部分会去/mnt/default目录下找abc目录下的index.html，有，直接返回，没有就返回404错误。</p><p>try_files可以理解为实现rewrite的作用</p>`,11),t=[p];function o(c,i,r,d,y,x){return n(),a("div",null,t)}const u=s(l,[["render",o]]);export{_ as __pageData,u as default};
