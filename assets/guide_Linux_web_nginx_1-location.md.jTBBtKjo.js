import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一、 location匹配顺序","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/1-location.md","filePath":"guide/Linux/web/nginx/1-location.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/1-location.md"},p=e(`<h1 id="一、-location匹配顺序" tabindex="-1">一、 location匹配顺序 <a class="header-anchor" href="#一、-location匹配顺序" aria-label="Permalink to &quot;一、 location匹配顺序&quot;">​</a></h1><ul><li>location 测试工具</li></ul><p><a href="https://detailyang.github.io/nginx-location-match-visible/" target="_blank" rel="noreferrer">https://detailyang.github.io/nginx-location-match-visible/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location  = / {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 精确匹配 / ，主机名后面不能带任何字符串</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration A ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location  / {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 但是正则和最长字符串会优先匹配</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration B ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /documents/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration C ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ /documents/Abc {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration CC ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ^~ /images/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration D ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* \\.(gif|jpg|jpeg)$ {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 匹配所有以 gif,jpg或jpeg 结尾的请求</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration E ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /images/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration F ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /images/abc {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在</span></span>
<span class="line"><span style="color:#e1e4e8;">  # F与G的放置顺序是没有关系的</span></span>
<span class="line"><span style="color:#e1e4e8;">  [ configuration G ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~ /images/abc/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ configuration H ] </span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location ~* /js/.*/\\.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location  = / {</span></span>
<span class="line"><span style="color:#24292e;">  # 精确匹配 / ，主机名后面不能带任何字符串</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration A ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location  / {</span></span>
<span class="line"><span style="color:#24292e;">  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求</span></span>
<span class="line"><span style="color:#24292e;">  # 但是正则和最长字符串会优先匹配</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration B ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /documents/ {</span></span>
<span class="line"><span style="color:#24292e;">  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索</span></span>
<span class="line"><span style="color:#24292e;">  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration C ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~ /documents/Abc {</span></span>
<span class="line"><span style="color:#24292e;">  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索</span></span>
<span class="line"><span style="color:#24292e;">  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration CC ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ^~ /images/ {</span></span>
<span class="line"><span style="color:#24292e;">  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration D ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~* \\.(gif|jpg|jpeg)$ {</span></span>
<span class="line"><span style="color:#24292e;">  # 匹配所有以 gif,jpg或jpeg 结尾的请求</span></span>
<span class="line"><span style="color:#24292e;">  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration E ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /images/ {</span></span>
<span class="line"><span style="color:#24292e;">  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration F ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /images/abc {</span></span>
<span class="line"><span style="color:#24292e;">  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在</span></span>
<span class="line"><span style="color:#24292e;">  # F与G的放置顺序是没有关系的</span></span>
<span class="line"><span style="color:#24292e;">  [ configuration G ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~ /images/abc/ {</span></span>
<span class="line"><span style="color:#24292e;">  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用</span></span>
<span class="line"><span style="color:#24292e;">    [ configuration H ] </span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location ~* /js/.*/\\.js</span></span></code></pre></div><h2 id="_1-1-正则表达" tabindex="-1">1.1 正则表达 <a class="header-anchor" href="#_1-1-正则表达" aria-label="Permalink to &quot;1.1 正则表达&quot;">​</a></h2><p><code>=</code> 开头表示精确匹配 ,如 A 中只匹配根目录结尾的请求，后面不能带任何字符串。</p><p><code>^~</code> 开头表示uri以某个常规字符串开头，不是正则匹配</p><p><code>~</code> 开头表示区分大小写的正则匹配;</p><p><code>~*</code> 开头表示不区分大小写的正则匹配</p><p><code>/</code> 通用匹配, 如果没有其它匹配,任何请求都会匹配到</p><ul><li>优先级</li></ul><blockquote><p>[!TIP]</p></blockquote><blockquote><p>(location <code>=</code> ) &gt; (location <code>完整路径</code> ) &gt; (location <code>^~</code> 路径) &gt; (location <code>~</code>,<code>~*</code> 从上向下正则顺序，匹配在最后一条终止) &gt; (location 部分起始路径) &gt; (<code>/</code>)</p></blockquote><h2 id="_1-2nginx匹配-符号的作用" tabindex="-1">1.2Nginx匹配@符号的作用 <a class="header-anchor" href="#_1-2nginx匹配-符号的作用" aria-label="Permalink to &quot;1.2Nginx匹配@符号的作用&quot;">​</a></h2><blockquote><p>@ 符号, 用于定义一个Location块，且该块不能被外部Client所访问，只能被Nginx 内部配置指令所访问，比如 try_files 或 error_page.</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">error_page 404 = @fallback;</span></span>
<span class="line"><span style="color:#e1e4e8;">location @fallback {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass http://www.xx.org;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果URI不存在，则把请求代理到www.xxx.org上去做个弥补</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">   try_files $uri @linuxhub;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">location @linuxhub {</span></span>
<span class="line"><span style="color:#e1e4e8;">   proxy_pass http://www.xxx.org;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">error_page 404 = @fallback;</span></span>
<span class="line"><span style="color:#24292e;">location @fallback {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass http://www.xx.org;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"># 如果URI不存在，则把请求代理到www.xxx.org上去做个弥补</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">   try_files $uri @linuxhub;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">location @linuxhub {</span></span>
<span class="line"><span style="color:#24292e;">   proxy_pass http://www.xxx.org;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><a href="https://www.jianshu.com/p/38810b49bc29" target="_blank" rel="noreferrer">https://www.jianshu.com/p/38810b49bc29</a></p>`,17),o=[p];function c(i,t,r,y,g,d){return n(),a("div",null,o)}const f=s(l,[["render",c]]);export{h as __pageData,f as default};
