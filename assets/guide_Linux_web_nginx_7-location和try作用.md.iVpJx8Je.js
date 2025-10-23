import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"nginx 配置文件","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/7-location和try作用.md","filePath":"guide/Linux/web/nginx/7-location和try作用.md","lastUpdated":1747060331000}'),l={name:"guide/Linux/web/nginx/7-location和try作用.md"},p=e(`<h1 id="nginx-配置文件" tabindex="-1">nginx 配置文件 <a class="header-anchor" href="#nginx-配置文件" aria-label="Permalink to &quot;nginx 配置文件&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
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
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="location-xxx-作用" tabindex="-1">location @xxx　作用 <a class="header-anchor" href="#location-xxx-作用" aria-label="Permalink to &quot;location @xxx　作用&quot;">​</a></h1><p>location @xxx解释：定义一个location段，不能被外部请求所访问，只能用于nginx内部配置指令使用，比如 try_files、error_page。</p><blockquote><p>$uri解释：URI代表资源的名称</p></blockquote><p>浏览器访问 <a href="http://api.xxx.com/abc/index.html" target="_blank" rel="noreferrer">http://api.xxx.com/abc/index.html</a> 时，当前的$uri值为/abc/index.html</p><p>可以通过编译nginx参数--add-module添加第三方echo模块打印$uri</p><h1 id="try-files作用" tabindex="-1">try_files作用： <a class="header-anchor" href="#try-files作用" aria-label="Permalink to &quot;try_files作用：&quot;">​</a></h1><p>try_files会先尝试去/mnt/try目录下找abc目录下的index.html，如果有，直接返回，没有的话则跳转到@default部分（内部重定向）。</p><p>在default部分会去/mnt/default目录下找abc目录下的index.html，有，直接返回，没有就返回404错误。</p><p>try_files可以理解为实现rewrite的作用</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">try_files</span><span style="color:#E1E4E8;"> $uri $uri</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/index.html</span><span style="color:#E1E4E8;">; </span><span style="color:#B392F0;">这句话是Nginx服务器配置中的一条指令，用于设置处理请求的策略。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$uri：这是Nginx内置的一个变量，代表当前请求的URI，不包括参数部分。例如，如果请求的URL是http://example.com/user</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">id=1，那么$uri的值就是/user。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$uri/：尝试将请求作为目录处理，如果这个目录存在，Nginx会试图返回该目录下的默认文件（通常是index.html或index.htm）。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">/index.html：如果前面的$uri和$uri/都无法找到对应的文件或目录，那么就返回/index.html文件。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">因此，try_files</span><span style="color:#E1E4E8;"> $uri $uri</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/index.html</span><span style="color:#E1E4E8;">; </span><span style="color:#B392F0;">的含义是：首先尝试按照请求的URI去寻找对应的文件，如果找不到，再尝试将请求作为目录处理，如果还是找不到，最后就返回/index.html文件。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">这对于单页应用来说非常有用，因为无论用户请求的是什么URL，服务器都会返回同一个HTML文件（即index.html），然后由前端路由来决定显示哪个页面。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">try_files</span><span style="color:#24292E;"> $uri $uri</span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/index.html</span><span style="color:#24292E;">; </span><span style="color:#6F42C1;">这句话是Nginx服务器配置中的一条指令，用于设置处理请求的策略。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$uri：这是Nginx内置的一个变量，代表当前请求的URI，不包括参数部分。例如，如果请求的URL是http://example.com/user</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">id=1，那么$uri的值就是/user。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$uri/：尝试将请求作为目录处理，如果这个目录存在，Nginx会试图返回该目录下的默认文件（通常是index.html或index.htm）。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">/index.html：如果前面的$uri和$uri/都无法找到对应的文件或目录，那么就返回/index.html文件。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">因此，try_files</span><span style="color:#24292E;"> $uri $uri</span><span style="color:#032F62;">/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/index.html</span><span style="color:#24292E;">; </span><span style="color:#6F42C1;">的含义是：首先尝试按照请求的URI去寻找对应的文件，如果找不到，再尝试将请求作为目录处理，如果还是找不到，最后就返回/index.html文件。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">这对于单页应用来说非常有用，因为无论用户请求的是什么URL，服务器都会返回同一个HTML文件（即index.html），然后由前端路由来决定显示哪个页面。</span></span></code></pre></div>`,12),o=[p];function t(c,i,r,y,d,x){return n(),a("div",null,o)}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
