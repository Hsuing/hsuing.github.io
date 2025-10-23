import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const k=JSON.parse('{"title":"一、Cookie安全相关属性","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/proxy/6-proxy_cookie_path.md","filePath":"guide/Linux/web/nginx/proxy/6-proxy_cookie_path.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/proxy/6-proxy_cookie_path.md"},o=n(`<p>HttpOnly Secure SameSite参数解决Cookie跨域丢失</p><p>Chrome 升级到80版本后，默认限制了跨域携带cookie给后端。我们也提到了可以修改Chrome的设置或在服务端添加SameSite设置来解决，但是普通的Web框架需要升级到最新版本才支持SameSite属性，升级Web框架成本太高，因此使用Nginx来解决SameSite问题的办法</p><h1 id="一、cookie安全相关属性" tabindex="-1">一、Cookie安全相关属性 <a class="header-anchor" href="#一、cookie安全相关属性" aria-label="Permalink to &quot;一、Cookie安全相关属性&quot;">​</a></h1><h2 id="httponly" tabindex="-1">HttpOnly ： <a class="header-anchor" href="#httponly" aria-label="Permalink to &quot;HttpOnly ：&quot;">​</a></h2><p>​ 在Cookie中设置了“HttpOnly”属性，通过程序(JS脚本、Applet等)将无法读取到Cookie信息。</p><p>​ 将HttpOnly 设置为true 防止程序获取cookie后进行攻击。</p><h2 id="secure" tabindex="-1">Secure ： <a class="header-anchor" href="#secure" aria-label="Permalink to &quot;Secure ：&quot;">​</a></h2><p>​ 安全性，指定Cookie是否只能通过https协议访问，一般的Cookie使用HTTP协议既可访问。</p><p>​ 设置了Secure （没有值），则只有当使用https协议连接时cookie才可以被页面访问。可用于防止信息在传递的过程中被监听捕获后信息泄漏。</p><h2 id="samesite" tabindex="-1">SameSite： <a class="header-anchor" href="#samesite" aria-label="Permalink to &quot;SameSite：&quot;">​</a></h2><p>​ Chrome浏览器在51版本后为 Cookie 新增的属性，用来防止 CSRF 攻击和用户追踪。可以设置三个值：Strict、 Lax、 None</p><p>​ Strict：完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。Set-Cookie: CookieName=CookieValue; SameSite=Strict;</p><p>​ Lax：规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。Set-Cookie: CookieName=CookieValue; SameSite=Lax；设置了Strict或Lax以后，基本就杜绝了 CSRF 攻击。当然，前提是用户浏览器支持 SameSite 属性。</p><p>​ None：Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。Set-Cookie: key=value; SameSite=None; Secure</p><p>proxy_cookie_path参数的作用是用来改变cookie的路径</p><p>语法： proxy_cookie_path path replacement; path就是你要替换的路径 replacement 就是要替换的值</p><p><strong>为什么cookie 会丢失？</strong> 比如说一个没有经过代理的地址 ： <a href="http://127.0.0.1/project" target="_blank" rel="noreferrer">http://127.0.0.1/project</a> cookie_path：/project 如果按照第二种方式代理那么地址就是 ： <a href="http://127.0.0.1/proxy_path" target="_blank" rel="noreferrer">http://127.0.0.1/proxy_path</a> cookie_path: /proxy_path 如果cookie_path与地址栏上的path不相符游览器就不会接受这个cookie，自然session就失效了。</p><p><strong>解决nginx proxy_pass反向代理cookie,session丢失的问题</strong></p><p><strong>1）host、端口转换，cookie不会丢失</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /project {</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_pass   http://127.0.0.1:8080/project;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /project {</span></span>
<span class="line"><span style="color:#24292e;">       proxy_pass   http://127.0.0.1:8080/project;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span></code></pre></div><p>通过浏览器访问<a href="http://127.0.0.1/project%E6%97%B6%EF%BC%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84cookie%E5%86%85%E6%9C%89jsessionid%E3%80%82%E5%86%8D%E6%AC%A1%E8%AE%BF%E9%97%AE%E6%97%B6%EF%BC%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BC%9A%E5%8F%91%E9%80%81%E5%BD%93%E5%89%8D%E7%9A%84cookie" target="_blank" rel="noreferrer">http://127.0.0.1/project时，浏览器的cookie内有jsessionid。再次访问时，浏览器会发送当前的cookie</a></p><p><strong>2）如果路径也变化了，则需要设置cookie的路径转换，nginx.conf的配置如下</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /proxy_path {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass   http://127.0.0.1:8080/project;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /proxy_path {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass   http://127.0.0.1:8080/project;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><p>通过浏览器访问<a href="http://127.0.0.1/proxy_path%E6%97%B6%EF%BC%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84cookie%E5%86%85%E6%B2%A1%E6%9C%89jsessionid%E3%80%82%E5%86%8D%E6%AC%A1%E8%AE%BF%E9%97%AE%E6%97%B6%EF%BC%8C%E5%90%8E%E5%8F%B0%E5%BD%93%E7%84%B6%E6%97%A0%E6%B3%95%E8%8E%B7%E5%8F%96%E5%88%B0cookie%E4%BA%86%E3%80%82" target="_blank" rel="noreferrer">http://127.0.0.1/proxy_path时，浏览器的cookie内没有jsessionid。再次访问时，后台当然无法获取到cookie了。</a> 加上路径转换：proxy_cookie_path /project /proxy_path;则可以将project的cookie输出到proxy_path上。 保证cookie不丢失的正确配置是:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /proxy_path {</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_pass   http://127.0.0.1:8080/project;</span></span>
<span class="line"><span style="color:#e1e4e8;">       proxy_cookie_path  /project /proxy_path;</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /proxy_path {</span></span>
<span class="line"><span style="color:#24292e;">       proxy_pass   http://127.0.0.1:8080/project;</span></span>
<span class="line"><span style="color:#24292e;">       proxy_cookie_path  /project /proxy_path;</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span></code></pre></div><p><strong>3）直接代理本地端口</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /proxy_path {</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_pass   http://127.0.0.1:8080/;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_cookie_path  /project /proxy_path; # project 为你的项目名 也可用变量代替</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /proxy_path {</span></span>
<span class="line"><span style="color:#24292e;">    proxy_pass   http://127.0.0.1:8080/;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_cookie_path  /project /proxy_path; # project 为你的项目名 也可用变量代替</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">    listen 443 ssl http2;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name www.demo.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    # add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # add_header X-Frame-Options SAMEORIGIN;</span></span>
<span class="line"><span style="color:#e1e4e8;">    add_header Strict-Transport-Security &quot;max-age=15768000&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        root /var/www/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    location /api {</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 配置位置如下</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_cookie_path / &quot;/; httponly; secure; SameSite=None&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set $uid &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">       if ( $http_cookie ~* &quot;uid=(\\S+)(;.*|$)&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            set $uid $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        } </span></span>
<span class="line"><span style="color:#e1e4e8;">        #charset koi8-r;</span></span>
<span class="line"><span style="color:#e1e4e8;">                if ( $time_iso8601 ~ &quot;(\\d{4})-(\\d{2})-(\\d{2})&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        set $time $1$2$3;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">    listen 443 ssl http2;</span></span>
<span class="line"><span style="color:#24292e;">    server_name www.demo.com;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    # add_header X-XSS-Protection &quot;1; mode=block&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    # add_header X-Frame-Options SAMEORIGIN;</span></span>
<span class="line"><span style="color:#24292e;">    add_header Strict-Transport-Security &quot;max-age=15768000&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        root /var/www/html;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    location /api {</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://localhost;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        # 配置位置如下</span></span>
<span class="line"><span style="color:#24292e;">        proxy_cookie_path / &quot;/; httponly; secure; SameSite=None&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set $uid &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">       if ( $http_cookie ~* &quot;uid=(\\S+)(;.*|$)&quot;){</span></span>
<span class="line"><span style="color:#24292e;">            set $uid $1;</span></span>
<span class="line"><span style="color:#24292e;">        } </span></span>
<span class="line"><span style="color:#24292e;">        #charset koi8-r;</span></span>
<span class="line"><span style="color:#24292e;">                if ( $time_iso8601 ~ &quot;(\\d{4})-(\\d{2})-(\\d{2})&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">                        set $time $1$2$3;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span></code></pre></div>`,29),l=[o];function t(c,r,i,y,h,d){return e(),a("div",null,l)}const u=s(p,[["render",t]]);export{k as __pageData,u as default};
