import{_ as e,D as n,o as a,c as t,I as l,w as p,R as o,a as c}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"1,点击劫持","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/8-xss.md","filePath":"guide/Linux/web/nginx/8-xss.md","lastUpdated":1701684699000}'),r={name:"guide/Linux/web/nginx/8-xss.md"},i=o(`<h1 id="_1-点击劫持" tabindex="-1">1,点击劫持 <a class="header-anchor" href="#_1-点击劫持" aria-label="Permalink to &quot;1,点击劫持&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 点击劫持（ClickJacking）是一种视觉上的欺骗手段。大概有两种方式，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 一是攻击者使用一个透明的iframe，覆盖在一个网页上，然后诱使用户在该页面上进行操作，此时用户将在不知情的情况下点击透明的iframe页面；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 二是攻击者使用一张图片覆盖在网页，遮挡网页原有位置的含义;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 点击劫持（ClickJacking）是一种视觉上的欺骗手段。大概有两种方式，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 一是攻击者使用一个透明的iframe，覆盖在一个网页上，然后诱使用户在该页面上进行操作，此时用户将在不知情的情况下点击透明的iframe页面；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 二是攻击者使用一张图片覆盖在网页，遮挡网页原有位置的含义;</span></span></code></pre></div><ul><li>解释:</li></ul><h1 id="_2-x-frame-options" tabindex="-1">2,X-Frame-Options <a class="header-anchor" href="#_2-x-frame-options" aria-label="Permalink to &quot;2,X-Frame-Options&quot;">​</a></h1><p><code>X-Frame-Options HTTP</code> 响应头是微软提出来的一个HTTP响应头，主要用来给浏览器指示允许一个页面可否在 <code>&lt;frame&gt;</code>, <code>&lt;iframe&gt;</code> 或者 <code>&lt;object&gt;</code> 中展现的标记。网站可以使用此功能，来确保自己网站的内容没有被嵌到别人的网站中去，也从而避免了<strong>点击劫持</strong> (ClickJacking<a href="https://www.imydl.tech/lnmp/263.html#fn-1" target="_blank" rel="noreferrer">{注1}</a>) 的攻击</p><p>使用X-Frame-Options有三个值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># DENY # 表示该页面不允许在frame中展示,即使在相同域名的页面中嵌套也不允许 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># SAMEORIGIN # 表示该页面可以在相同域名页面的frame中展示 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># ALLOW-FROM url # 表示该页面可以在指定来源的frame中展示</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果设置为 DENY，不光在别人的网站 frame 嵌入时会无法加载，在同域名页面中同样会无法加载。另一方面，如果设置为SAMEORIGIN，那么页面就可以在同域名页面的 frame 中嵌套。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PS：目前发现这个HTTP响应头会带来的问题就是百度统计中的“热点追踪(页面点击图）”功能会失效，这也说明百度统计的“热点追踪(页面点击图）”使用的是 frame 嵌入引用网页的形式，这时候大家可以使用 X-Frame-Options 的ALLOW-FROM uri来指定百度统计域名为可 frame 嵌入域名即可。具体在Nginx里可以采用如下的方式添加响应头</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">比如：</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Frame-Options:ALLOW-FROM https://tongji.baidu.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Frame-Options:SAMEORIGIN;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Frame-Options ALLOWALL; #允许所有域名iframe</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header Set-Cookie &quot;Path=/; HttpOnly; Secure&quot;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># DENY # 表示该页面不允许在frame中展示,即使在相同域名的页面中嵌套也不允许 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># SAMEORIGIN # 表示该页面可以在相同域名页面的frame中展示 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># ALLOW-FROM url # 表示该页面可以在指定来源的frame中展示</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果设置为 DENY，不光在别人的网站 frame 嵌入时会无法加载，在同域名页面中同样会无法加载。另一方面，如果设置为SAMEORIGIN，那么页面就可以在同域名页面的 frame 中嵌套。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PS：目前发现这个HTTP响应头会带来的问题就是百度统计中的“热点追踪(页面点击图）”功能会失效，这也说明百度统计的“热点追踪(页面点击图）”使用的是 frame 嵌入引用网页的形式，这时候大家可以使用 X-Frame-Options 的ALLOW-FROM uri来指定百度统计域名为可 frame 嵌入域名即可。具体在Nginx里可以采用如下的方式添加响应头</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">比如：</span></span>
<span class="line"><span style="color:#24292e;">add_header X-Frame-Options:ALLOW-FROM https://tongji.baidu.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header X-Frame-Options:SAMEORIGIN;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header X-Frame-Options ALLOWALL; #允许所有域名iframe</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header Set-Cookie &quot;Path=/; HttpOnly; Secure&quot;;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">X-Frame-Options</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Frame-Options 响应头用于防范点击劫持（Click Jacking）。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">响应头格式为：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">x-frame-options: \${value}</span></span>
<span class="line"><span style="color:#e1e4e8;">可填入的 value 有三种：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">allow-from \${domain} 不允许被指定域名以外的页面嵌入</span></span>
<span class="line"><span style="color:#e1e4e8;">sameorigin 不允许被站点自身域名以外的页面嵌入</span></span>
<span class="line"><span style="color:#e1e4e8;">deny 不允许被任何页面嵌入</span></span>
<span class="line"><span style="color:#e1e4e8;">由于嵌入的页面不会加载，这就减少了点击劫持的发生。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在 Nginx 中的配置：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Frame-Options deny;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">X-Content-Type-Options</span></span>
<span class="line"><span style="color:#e1e4e8;">互联网上的资源多种多样，在 web 浏览方面，一般浏览器会根据响应头的 Content-Type 字段分辨资源的类型。例如，”text/html” 表示 html 文件，”text/css” 表示 CSS 样式文件，”application/javascript” 表示 js 代码。但有时，会出现 Content-Type 未定义或无效值的资源，这时浏览器会调用 MIME-sniffing 来猜测该资源的类型。攻击者利用浏览器的这种猜测，例如可以让原本应解析为图片的请求被解析为恶意 JavaScript 脚本，被攻击者成功入侵。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">为了防范这类攻击，需要禁用浏览器的资源类型猜测。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">通过返回下面这个响应头：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">X-Content-Type-Options: nosniff</span></span>
<span class="line"><span style="color:#e1e4e8;">其中，这个响应头的值只能是 nosniff。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在 Nginx 中的配置：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Content-Type-Options nosniff;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">X-XSS-Protection</span></span>
<span class="line"><span style="color:#e1e4e8;">顾名思义，这个响应头用于防范 XSS 攻击。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">该响应头已具有广泛浏览器支持，并且主流浏览器基本默认开启 XSS 保护。倒是用这个头可以关闭它。虽然一般不建议这样做。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">响应头格式为：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">X-Xss-Protection: \${value}</span></span>
<span class="line"><span style="color:#e1e4e8;">可填入的值有三种：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">0 禁用 XSS 保护</span></span>
<span class="line"><span style="color:#e1e4e8;">1 启用 XSS 保护</span></span>
<span class="line"><span style="color:#e1e4e8;">1; mode=block 启用 XSS 保护，并规定在检查到 XSS 攻击时停止页面渲染</span></span>
<span class="line"><span style="color:#e1e4e8;">在 Nginx 中的配置：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Xss-Protection &quot;1; mode=block&quot; ;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">X-Frame-Options</span></span>
<span class="line"><span style="color:#24292e;">X-Frame-Options 响应头用于防范点击劫持（Click Jacking）。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">响应头格式为：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">x-frame-options: \${value}</span></span>
<span class="line"><span style="color:#24292e;">可填入的 value 有三种：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">allow-from \${domain} 不允许被指定域名以外的页面嵌入</span></span>
<span class="line"><span style="color:#24292e;">sameorigin 不允许被站点自身域名以外的页面嵌入</span></span>
<span class="line"><span style="color:#24292e;">deny 不允许被任何页面嵌入</span></span>
<span class="line"><span style="color:#24292e;">由于嵌入的页面不会加载，这就减少了点击劫持的发生。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在 Nginx 中的配置：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header X-Frame-Options deny;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">X-Content-Type-Options</span></span>
<span class="line"><span style="color:#24292e;">互联网上的资源多种多样，在 web 浏览方面，一般浏览器会根据响应头的 Content-Type 字段分辨资源的类型。例如，”text/html” 表示 html 文件，”text/css” 表示 CSS 样式文件，”application/javascript” 表示 js 代码。但有时，会出现 Content-Type 未定义或无效值的资源，这时浏览器会调用 MIME-sniffing 来猜测该资源的类型。攻击者利用浏览器的这种猜测，例如可以让原本应解析为图片的请求被解析为恶意 JavaScript 脚本，被攻击者成功入侵。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">为了防范这类攻击，需要禁用浏览器的资源类型猜测。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">通过返回下面这个响应头：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">X-Content-Type-Options: nosniff</span></span>
<span class="line"><span style="color:#24292e;">其中，这个响应头的值只能是 nosniff。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在 Nginx 中的配置：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header X-Content-Type-Options nosniff;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">X-XSS-Protection</span></span>
<span class="line"><span style="color:#24292e;">顾名思义，这个响应头用于防范 XSS 攻击。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">该响应头已具有广泛浏览器支持，并且主流浏览器基本默认开启 XSS 保护。倒是用这个头可以关闭它。虽然一般不建议这样做。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">响应头格式为：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">X-Xss-Protection: \${value}</span></span>
<span class="line"><span style="color:#24292e;">可填入的值有三种：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">0 禁用 XSS 保护</span></span>
<span class="line"><span style="color:#24292e;">1 启用 XSS 保护</span></span>
<span class="line"><span style="color:#24292e;">1; mode=block 启用 XSS 保护，并规定在检查到 XSS 攻击时停止页面渲染</span></span>
<span class="line"><span style="color:#24292e;">在 Nginx 中的配置：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header X-Xss-Protection &quot;1; mode=block&quot; ;</span></span></code></pre></div><ul><li>nginx配置</li></ul><p>允许单个域名iframe嵌套</p><p>add_header X-Frame-Options ALLOW-FROM <a href="http://xxx.com/" target="_blank" rel="noreferrer">http://xxx.com/</a>;</p><p>允许多个域名iframe嵌套，注意这里是用<strong>逗号</strong>分隔</p><p>add_header X-Frame-Options &quot;ALLOW-FROM <a href="http://xxx.com/,https://xxx.cn/" target="_blank" rel="noreferrer">http://xxx.com/,https://xxx.cn/</a>&quot;;</p><h1 id="_3-x-content-type-options" tabindex="-1">3,X-Content-Type-Options <a class="header-anchor" href="#_3-x-content-type-options" aria-label="Permalink to &quot;3,X-Content-Type-Options&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">互联网上的资源有各种类型，通常浏览器会根据响应头的Content-Type字段来分辨它们的类型。例如：text/html代表html文档，image/png是PNG图片，text/css是CSS样式文档。然而，有些资源的Content-Type是错的或者未定义。这时，某些浏览器会启用MIME-sniffing来猜测该资源的类型，解析内容并执行。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">例如，我们即使给一个html文档指定Content-Type为text/plain，在IE8-中这个文档依然会被当做html来解析。利用浏览器的这个特性，攻击者甚至可以让原本应该解析为图片的请求被解析为JavaScript。在Nginx里通过下面这个响应头可以禁用浏览器的类型猜测行为：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># X-Content-Type-Options HTTP 消息头相当于一个提示标志，被服务器用来提示客户端一定要遵循在 Content-Type 首部中对  MIME 类型 的设定，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 而不能对其进行修改。这就禁用了客户端的 MIME 类型嗅探行为，换句话说，也就是意味着网站管理员确定自己的设置没有问题。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># X-Content-Type-Options响应头的缺失使得目标URL更易遭受跨站脚本攻击。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># add_header X-Content-Type-Options: nosniff;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这个响应头的值只能是nosniff</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">互联网上的资源有各种类型，通常浏览器会根据响应头的Content-Type字段来分辨它们的类型。例如：text/html代表html文档，image/png是PNG图片，text/css是CSS样式文档。然而，有些资源的Content-Type是错的或者未定义。这时，某些浏览器会启用MIME-sniffing来猜测该资源的类型，解析内容并执行。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">例如，我们即使给一个html文档指定Content-Type为text/plain，在IE8-中这个文档依然会被当做html来解析。利用浏览器的这个特性，攻击者甚至可以让原本应该解析为图片的请求被解析为JavaScript。在Nginx里通过下面这个响应头可以禁用浏览器的类型猜测行为：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># X-Content-Type-Options HTTP 消息头相当于一个提示标志，被服务器用来提示客户端一定要遵循在 Content-Type 首部中对  MIME 类型 的设定，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 而不能对其进行修改。这就禁用了客户端的 MIME 类型嗅探行为，换句话说，也就是意味着网站管理员确定自己的设置没有问题。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># X-Content-Type-Options响应头的缺失使得目标URL更易遭受跨站脚本攻击。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># add_header X-Content-Type-Options: nosniff;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这个响应头的值只能是nosniff</span></span></code></pre></div><h1 id="_4-content-security-policy" tabindex="-1">4,Content-Security-Policy <a class="header-anchor" href="#_4-content-security-policy" aria-label="Permalink to &quot;4,Content-Security-Policy&quot;">​</a></h1><p>W3C 的 Content Security Policy，简称 CSP。顾名思义，这个规范与内容安全有关，主要是用来定义页面可以加载哪些资源，减少 XSS 的发生。</p><p>Chrome 扩展已经引入了 CSP，通过 manifest.json 中的 content_security_policy 字段来定义。一些现代浏览器也支持通过响应头来定义 CSP。下面我们主要介绍如何通过响应头来使用 CSP，Chrome 扩展中 CSP 的使用可以参考 <a href="https://developer.chrome.com/extensions/contentSecurityPolicy.html" target="_blank" rel="noreferrer">Chrome 官方文档</a>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># HTTP 响应头Content-Security-Policy允许站点管理者控制用户代理能够为指定的页面加载哪些资源。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 除了少数例外情况，设置的政策主要涉及指定服务器的源和脚本结束点。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Content-Security-Policy响应头的缺失使得目标URL更易遭受跨站脚本攻击。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># HTTP 响应头Content-Security-Policy允许站点管理者控制用户代理能够为指定的页面加载哪些资源。</span></span>
<span class="line"><span style="color:#24292e;"># 除了少数例外情况，设置的政策主要涉及指定服务器的源和脚本结束点。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Content-Security-Policy响应头的缺失使得目标URL更易遭受跨站脚本攻击。</span></span></code></pre></div><h2 id="_4-1-如何使用" tabindex="-1">4.1 如何使用 <a class="header-anchor" href="#_4-1-如何使用" aria-label="Permalink to &quot;4.1 如何使用&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 要使用 CSP，只需要服务端输出类似这样的响应头就行了：</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Security-Policy: default-src &#39;self&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;"># default-src 是 CSP 指令，多个指令之间用英文分号分割；&#39;self&#39; 是指令值，多个指令值用英文空格分割。目前，有这些 CSP 指令：</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 要使用 CSP，只需要服务端输出类似这样的响应头就行了：</span></span>
<span class="line"><span style="color:#24292e;">Content-Security-Policy: default-src &#39;self&#39;</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;"># default-src 是 CSP 指令，多个指令之间用英文分号分割；&#39;self&#39; 是指令值，多个指令值用英文空格分割。目前，有这些 CSP 指令：</span></span></code></pre></div><table><thead><tr><th style="text-align:left;">指令</th><th style="text-align:left;">指令值示例</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">default-src</td><td style="text-align:left;">&#39;self&#39; cnd.a.com</td><td style="text-align:left;">定义针对所有类型（js、image、css、web font，ajax 请求，iframe，多媒体等）资源的默认加载策略，某类型资源如果没有单独定义策略，就使用默认的。</td></tr><tr><td style="text-align:left;">script-src</td><td style="text-align:left;">&#39;self&#39; js.a.com</td><td style="text-align:left;">定义针对 JavaScript 的加载策略。</td></tr><tr><td style="text-align:left;">style-src</td><td style="text-align:left;">&#39;self&#39; css.a.com</td><td style="text-align:left;">定义针对样式的加载策略。</td></tr><tr><td style="text-align:left;">img-src</td><td style="text-align:left;">&#39;self&#39; img.a.com</td><td style="text-align:left;">定义针对图片的加载策略。</td></tr><tr><td style="text-align:left;">connect-src</td><td style="text-align:left;">&#39;self&#39;</td><td style="text-align:left;">针对 <code>Ajax</code>、<code>WebSocket</code> 等请求的加载策略。不允许的情况下，浏览器会模拟一个状态为 400 的响。</td></tr><tr><td style="text-align:left;">font-src</td><td style="text-align:left;">font.a.com</td><td style="text-align:left;">针对 <code>WebFont</code> 的加载策略。</td></tr><tr><td style="text-align:left;">object-src</td><td style="text-align:left;">&#39;self&#39;</td><td style="text-align:left;">针对 <code>&lt;object&gt;</code>、<code>&lt;embed&gt;</code> 或 <code>&lt;applet&gt;</code> 等标签引入的 <code>flash</code> 等插件的加载策略。</td></tr><tr><td style="text-align:left;">media-src</td><td style="text-align:left;">media.a.com</td><td style="text-align:left;">针对 <code>&lt;audio&gt;</code> 或 <code>&lt;video&gt;</code> 等标签引入的 <code>HTML</code> 多媒体的加载策略。</td></tr><tr><td style="text-align:left;">frame-src</td><td style="text-align:left;">&#39;self&#39;</td><td style="text-align:left;">针对 frame 的加载策略。</td></tr><tr><td style="text-align:left;">sandbox</td><td style="text-align:left;">allow-forms</td><td style="text-align:left;">对请求的资源启用 sandbox（类似于 iframe 的 sandbox 属性）。</td></tr><tr><td style="text-align:left;">report-uri</td><td style="text-align:left;">/report-uri</td><td style="text-align:left;">告诉浏览器如果请求的资源不被策略允许时，往哪个地址提交日志信息。 特别的：如果想让浏览器只汇报日志，不阻止任何内容，可以改用 Content-Security-Policy-Report-Only 头。</td></tr></tbody></table><table><thead><tr><th style="text-align:left;">指令值</th><th style="text-align:left;">指令示例</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;"></td><td style="text-align:left;">img-src</td><td style="text-align:left;">允许任何内容。</td></tr><tr><td style="text-align:left;">&#39;none&#39;</td><td style="text-align:left;">img-src &#39;none&#39;</td><td style="text-align:left;">不允许任何内容。</td></tr><tr><td style="text-align:left;">&#39;self&#39;</td><td style="text-align:left;">img-src &#39;self&#39;</td><td style="text-align:left;">允许来自相同来源的内容（相同的协议、域名和端口）。</td></tr><tr><td style="text-align:left;">data:</td><td style="text-align:left;">img-src data:</td><td style="text-align:left;">允许 data: 协议（如 base64 编码的图片）。</td></tr><tr><td style="text-align:left;">www.a.com</td><td style="text-align:left;">img-src img.a.com</td><td style="text-align:left;">允许加载指定域名的资源。</td></tr><tr><td style="text-align:left;">.a.com</td><td style="text-align:left;">img-src .a.com</td><td style="text-align:left;">允许加载 a.com 任何子域的资源。</td></tr><tr><td style="text-align:left;"><a href="https://img.com/" target="_blank" rel="noreferrer">https://img.com</a></td><td style="text-align:left;">img-src <a href="https://img.com/" target="_blank" rel="noreferrer">https://img.com</a></td><td style="text-align:left;">允许加载 img.com 的 https 资源（协议需匹配）。</td></tr><tr><td style="text-align:left;">https: img-src</td><td style="text-align:left;">https:</td><td style="text-align:left;">允许加载 https 资源。</td></tr><tr><td style="text-align:left;">&#39;unsafe-inline&#39;</td><td style="text-align:left;">script-src &#39;unsafe-inline&#39;</td><td style="text-align:left;">允许加载 inline 资源（例如常见的 style 属性，onclick，inline js 和 inline css 等等）。</td></tr><tr><td style="text-align:left;">&#39;unsafe-eval&#39;</td><td style="text-align:left;">script-src &#39;unsafe-eval&#39;</td><td style="text-align:left;">允许加载动态 js 代码，例如 eval()</td></tr></tbody></table><p>从上面的介绍可以看到，CSP 协议可以控制的内容非常多。而且如果不特别指定 &#39;unsafe-inline&#39; 时，页面上所有 inline 样式和脚本都不会执行；不特别指定 &#39;unsafe-eval&#39;，页面上不允许使用 new Function，setTimeout，eval 等方式执行动态代码。在限制了页面资源来源之后，被 XSS 的风险确实小不少。</p><p>当然，仅仅依靠 CSP 来防范 XSS 是远远不够的，不支持全部浏览器是它的硬伤。不过，鉴于低廉的开发成本，加上也没什么坏处</p><h1 id="_5-strict-transport-security" tabindex="-1">5,Strict Transport Security <a class="header-anchor" href="#_5-strict-transport-security" aria-label="Permalink to &quot;5,Strict Transport Security&quot;">​</a></h1><h2 id="_5-1-什么是strict-transport-security" tabindex="-1">5.1 什么是Strict Transport Security <a class="header-anchor" href="#_5-1-什么是strict-transport-security" aria-label="Permalink to &quot;5.1 什么是Strict Transport Security&quot;">​</a></h2><p>一个网站接受一个HTTP的请求，然后跳转到HTTPS，用户可能在开始跳转前，通过没有加密的方式和服务器对话，比如，用户输入<a href="http://foo.xn--comfoo-r06l46hb56de7s.com" target="_blank" rel="noreferrer">http://foo.com或者直接foo.com</a>。这样存在中间人攻击潜在威胁，跳转过程可能被恶意网站利用来直接接触用户信息，而不是原来的加密信息。网站通过HTTP Strict Transport Security通知浏览器，这个网站禁止使用HTTP方式加载，浏览器应该自动把所有尝试使用HTTP的请求自动替换为HTTPS请求</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">有的网站开启了https，但为了照顾用户的使用体验（因为用户总是很赖的，一般不会主动键入https，而是直接输入域名, 直接输入域名访问，默认就是http访问）同时也支持http访问，当用户http访问的时候，就会返回给用户一个302重定向，重定向到https的地址，然后后续的访问都使用https传输,这种通信模式看起来貌似没有问题，但细致分析，就会发现种通信模式也存在一个风险，那就是这个302重定向可能会被劫持篡改，如果被改成一个恶意的或者钓鱼的https站点，然后，你懂得，一旦落入钓鱼站点，数据还有安全可言吗？</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">对于篡改302的攻击，建议服务器开启HTTP Strict Transport Security功能，这个功能的含义是：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">当用户已经安全的登录开启过htst功能的网站 (支持hsts功能的站点会在响应头中插入：Strict-Transport-Security) 之后，支持htst的浏览器(比如chrome. firefox)会自动将这个域名加入到HSTS列表，下次即使用户使用http访问这个网站，支持htst功能的浏览器就会自动发送https请求（前提是用户没有清空缓存，如果清空了缓存第一次访问还是明文，后续浏览器接收到服务器响应头中的Strict-Transport-Security，就会把域名加入到hsts缓存中，然后才会在发送请求前将http内部转换成https），而不是先发送http，然后重定向到https，这样就能避免中途的302重定向URL被篡改。进一步提高通信的安全性。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">上面是我自己的理解，下面是owasp中文站点关于hsts的描述：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">HSTS的作用是强制客户端（如浏览器）使用HTTPS与服务器创建连接。服务器开启HSTS的方法是，当客户端通过HTTPS发出请求时，在服务器返回的超文本传输协议响应头中包含Strict-Transport-Security字段。非加密传输时设置的HSTS字段无效。</span></span>
<span class="line"><span style="color:#e1e4e8;">比如，https://example.com/ 的响应头含有Strict-Transport-Security: max-age=31536000; includeSubDomains。这意味着两点：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在接下来的一年（即31536000秒）中，浏览器只要向example.com或其子域名发送HTTP请求时，必须采用HTTPS来发起连接。比如，用户点击超链接或在地址栏输入 http://www.example.com/ ，浏览器应当自动将 http 转写成 https，然后直接向 https://www.example.com/ 发送请求。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在接下来的一年中，如果 example.com 服务器发送的TLS证书无效，用户不能忽略浏览器警告继续访问网站。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">HSTS可以用来抵御SSL剥离攻击。SSL剥离攻击是中间人攻击的一种，由Moxie Marlinspike于2009年发明。他在当年的黑帽大会上发表的题为“New Tricks For Defeating SSL In Practice”的演讲中将这种攻击方式公开。SSL剥离的实施方法是阻止浏览器与服务器创建HTTPS连接。它的前提是用户很少直接在地址栏输入https://，用户总是通过点击链接或3xx重定向，从HTTP页面进入HTTPS页面。所以攻击者可以在用户访问HTTP页面时替换所有https://开头的链接为http://，达到阻止HTTPS的目的。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">HSTS可以很大程度上解决SSL剥离攻击，因为只要浏览器曾经与服务器创建过一次安全连接，之后浏览器会强制使用HTTPS，即使链接被换成了HTTP</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">另外，如果中间人使用自己的自签名证书来进行攻击，浏览器会给出警告，但是许多用户会忽略警告。HSTS解决了这一问题，一旦服务器发送了HSTS字段，用户将不再允许忽略警告。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">0×03. Strict-Transport-Security的一些不足</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">用户首次访问某网站是不受HSTS保护的。这是因为首次访问时，浏览器还未收到HSTS，所以仍有可能通过明文HTTP来访问。解决这个不足目前有两种方案，一是浏览器预置HSTS域名列表，Google Chrome、Firefox、Internet Explorer和Spartan实现了这一方案。二是将HSTS信息加入到域名系统记录中。但这需要保证DNS的安全性，也就是需要部署域名系统安全扩展。截至2014年这一方案没有大规模部署。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">由于HSTS会在一定时间后失效（有效期由max-age指定），所以浏览器是否强制HSTS策略取决于当前系统时间。部分操作系统经常通过网络时间协议更新系统时间，如Ubuntu每次连接网络时，OS X Lion每隔9分钟会自动连接时间服务器。攻击者可以通过伪造NTP信息，设置错误时间来绕过HSTS。解决方法是认证NTP信息，或者禁止NTP大幅度增减时间。比如Windows 8每7天更新一次时间，并且要求每次NTP设置的时间与当前时间不得超过15小时</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">有的网站开启了https，但为了照顾用户的使用体验（因为用户总是很赖的，一般不会主动键入https，而是直接输入域名, 直接输入域名访问，默认就是http访问）同时也支持http访问，当用户http访问的时候，就会返回给用户一个302重定向，重定向到https的地址，然后后续的访问都使用https传输,这种通信模式看起来貌似没有问题，但细致分析，就会发现种通信模式也存在一个风险，那就是这个302重定向可能会被劫持篡改，如果被改成一个恶意的或者钓鱼的https站点，然后，你懂得，一旦落入钓鱼站点，数据还有安全可言吗？</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">对于篡改302的攻击，建议服务器开启HTTP Strict Transport Security功能，这个功能的含义是：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">当用户已经安全的登录开启过htst功能的网站 (支持hsts功能的站点会在响应头中插入：Strict-Transport-Security) 之后，支持htst的浏览器(比如chrome. firefox)会自动将这个域名加入到HSTS列表，下次即使用户使用http访问这个网站，支持htst功能的浏览器就会自动发送https请求（前提是用户没有清空缓存，如果清空了缓存第一次访问还是明文，后续浏览器接收到服务器响应头中的Strict-Transport-Security，就会把域名加入到hsts缓存中，然后才会在发送请求前将http内部转换成https），而不是先发送http，然后重定向到https，这样就能避免中途的302重定向URL被篡改。进一步提高通信的安全性。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">上面是我自己的理解，下面是owasp中文站点关于hsts的描述：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">HSTS的作用是强制客户端（如浏览器）使用HTTPS与服务器创建连接。服务器开启HSTS的方法是，当客户端通过HTTPS发出请求时，在服务器返回的超文本传输协议响应头中包含Strict-Transport-Security字段。非加密传输时设置的HSTS字段无效。</span></span>
<span class="line"><span style="color:#24292e;">比如，https://example.com/ 的响应头含有Strict-Transport-Security: max-age=31536000; includeSubDomains。这意味着两点：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在接下来的一年（即31536000秒）中，浏览器只要向example.com或其子域名发送HTTP请求时，必须采用HTTPS来发起连接。比如，用户点击超链接或在地址栏输入 http://www.example.com/ ，浏览器应当自动将 http 转写成 https，然后直接向 https://www.example.com/ 发送请求。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在接下来的一年中，如果 example.com 服务器发送的TLS证书无效，用户不能忽略浏览器警告继续访问网站。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">HSTS可以用来抵御SSL剥离攻击。SSL剥离攻击是中间人攻击的一种，由Moxie Marlinspike于2009年发明。他在当年的黑帽大会上发表的题为“New Tricks For Defeating SSL In Practice”的演讲中将这种攻击方式公开。SSL剥离的实施方法是阻止浏览器与服务器创建HTTPS连接。它的前提是用户很少直接在地址栏输入https://，用户总是通过点击链接或3xx重定向，从HTTP页面进入HTTPS页面。所以攻击者可以在用户访问HTTP页面时替换所有https://开头的链接为http://，达到阻止HTTPS的目的。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">HSTS可以很大程度上解决SSL剥离攻击，因为只要浏览器曾经与服务器创建过一次安全连接，之后浏览器会强制使用HTTPS，即使链接被换成了HTTP</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">另外，如果中间人使用自己的自签名证书来进行攻击，浏览器会给出警告，但是许多用户会忽略警告。HSTS解决了这一问题，一旦服务器发送了HSTS字段，用户将不再允许忽略警告。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">0×03. Strict-Transport-Security的一些不足</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">用户首次访问某网站是不受HSTS保护的。这是因为首次访问时，浏览器还未收到HSTS，所以仍有可能通过明文HTTP来访问。解决这个不足目前有两种方案，一是浏览器预置HSTS域名列表，Google Chrome、Firefox、Internet Explorer和Spartan实现了这一方案。二是将HSTS信息加入到域名系统记录中。但这需要保证DNS的安全性，也就是需要部署域名系统安全扩展。截至2014年这一方案没有大规模部署。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">由于HSTS会在一定时间后失效（有效期由max-age指定），所以浏览器是否强制HSTS策略取决于当前系统时间。部分操作系统经常通过网络时间协议更新系统时间，如Ubuntu每次连接网络时，OS X Lion每隔9分钟会自动连接时间服务器。攻击者可以通过伪造NTP信息，设置错误时间来绕过HSTS。解决方法是认证NTP信息，或者禁止NTP大幅度增减时间。比如Windows 8每7天更新一次时间，并且要求每次NTP设置的时间与当前时间不得超过15小时</span></span></code></pre></div><h1 id="_6-x-xss-protection" tabindex="-1">6, X-XSS-Protection <a class="header-anchor" href="#_6-x-xss-protection" aria-label="Permalink to &quot;6, X-XSS-Protection&quot;">​</a></h1><p>这个响应头是用来防范XSS的。最早我是在介绍IE8的文章里看到这个，现在主流浏览器都支持，并且默认都开启了XSS保护，用这个header可以关闭它。它有几种配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#减少点击劫持</span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Xss-Protection &quot;1;mode=block&quot; always;  #开启XSS过滤器</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header X-Content-Type-Options &#39;nosniff&#39;;  #禁止嗅探文件类型</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">0：# 禁用XSS保护；</span></span>
<span class="line"><span style="color:#e1e4e8;">1：# 启用XSS保护；</span></span>
<span class="line"><span style="color:#e1e4e8;">1; # mode=block：启用XSS保护，并在检查到XSS攻击时，停止渲染页面（例如IE8中，检查到攻击时，整个页面会被一个#替换）；</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># HTTP X-XSS-Protection 响应头是 Internet Explorer，Chrome 和 Safari 的一个特性，</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当检测到跨站脚本攻击 (XSS)时，浏览器将停止加载页面。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># X-XSS-Protection响应头的缺失使得目标URL更易遭受跨站脚本攻击。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 浏览器提供的XSS保护机制并不完美，但是开启后仍然可以提升攻击难度，总之没有特别的理由，不要关闭它。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#减少点击劫持</span></span>
<span class="line"><span style="color:#24292e;">add_header X-Xss-Protection &quot;1;mode=block&quot; always;  #开启XSS过滤器</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header X-Content-Type-Options &#39;nosniff&#39;;  #禁止嗅探文件类型</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">0：# 禁用XSS保护；</span></span>
<span class="line"><span style="color:#24292e;">1：# 启用XSS保护；</span></span>
<span class="line"><span style="color:#24292e;">1; # mode=block：启用XSS保护，并在检查到XSS攻击时，停止渲染页面（例如IE8中，检查到攻击时，整个页面会被一个#替换）；</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># HTTP X-XSS-Protection 响应头是 Internet Explorer，Chrome 和 Safari 的一个特性，</span></span>
<span class="line"><span style="color:#24292e;"># 当检测到跨站脚本攻击 (XSS)时，浏览器将停止加载页面。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># X-XSS-Protection响应头的缺失使得目标URL更易遭受跨站脚本攻击。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 浏览器提供的XSS保护机制并不完美，但是开启后仍然可以提升攻击难度，总之没有特别的理由，不要关闭它。</span></span></code></pre></div><h1 id="csp" tabindex="-1">CSP <a class="header-anchor" href="#csp" aria-label="Permalink to &quot;CSP&quot;">​</a></h1><h2 id="什么是-xss-攻击" tabindex="-1">什么是 XSS 攻击 <a class="header-anchor" href="#什么是-xss-攻击" aria-label="Permalink to &quot;什么是 XSS 攻击&quot;">​</a></h2><p>跨站脚本（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了 HTML 以及用户端脚本语言。</p><p>跨域脚本攻击（XSS 攻击）通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是 JavaScript，但实际上也可以包括 Java，VBScript，ActiveX，Flash 甚至是普通的 HTML。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页、会话和 cookie 等各种内容。</p><p>为了防止它，要采取很多编程对策，成本较高。很多人发出呼声，能不能让浏览器自己禁止外部注入恶意脚本呢？这时，CSP 应运而生</p><h2 id="什么是-csp" tabindex="-1">什么是 CSP <a class="header-anchor" href="#什么是-csp" aria-label="Permalink to &quot;什么是 CSP&quot;">​</a></h2><p>CSP 定义了页面中哪些资源可以加载。</p><p>所以 CSP 的实质就是白名单，Web 端明确地告诉客户端，只有哪些外部资源可以加载可以执行，相当于提供一份白名单，“我的规则里没提到的全部拜拜，不给进来”。</p><p>因此 CSP 大大增强了网页的安全性。即使攻击者发现可趁之机，也没法注入脚本</p><h2 id="csp-的两种启用方式" tabindex="-1">CSP 的两种启用方式 <a class="header-anchor" href="#csp-的两种启用方式" aria-label="Permalink to &quot;CSP 的两种启用方式&quot;">​</a></h2><p>一种是使用网页的 <meta> 标签</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;default-src \${value}; script-src \${value}; style-src \${value}; img-src \${value}; font-src \${value}; media-src \${value}; object-src \${value}; connect-src \${value}; child-src \${value}; sandbox \${value}; report-uri \${value}&quot;&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&lt;meta http-equiv=&quot;Content-Security-Policy&quot; content=&quot;default-src \${value}; script-src \${value}; style-src \${value}; img-src \${value}; font-src \${value}; media-src \${value}; object-src \${value}; connect-src \${value}; child-src \${value}; sandbox \${value}; report-uri \${value}&quot;&gt;</span></span></code></pre></div><p>一种是使用 HTTP 响应头</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Content-Security-Policy: &quot;default-src \${value}; script-src \${value}; style-src \${value}; img-src \${value}; font-src \${value}; media-src \${value}; object-src \${value}; connect-src \${value}; child-src \${value}; sandbox \${value}; report-uri \${value}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Content-Security-Policy: &quot;default-src \${value}; script-src \${value}; style-src \${value}; img-src \${value}; font-src \${value}; media-src \${value}; object-src \${value}; connect-src \${value}; child-src \${value}; sandbox \${value}; report-uri \${value}&quot;</span></span></code></pre></div><h2 id="csp-规则" tabindex="-1">CSP 规则 <a class="header-anchor" href="#csp-规则" aria-label="Permalink to &quot;CSP 规则&quot;">​</a></h2><p><a href="http://note.youdao.com/noteshare?id=a6f38bb91d2cf0af9e78e3edb45e5322" target="_blank" rel="noreferrer">http://note.youdao.com/noteshare?id=a6f38bb91d2cf0af9e78e3edb45e5322</a></p><h2 id="csp-在-nginx-中的启用" tabindex="-1">CSP 在 Nginx 中的启用 <a class="header-anchor" href="#csp-在-nginx-中的启用" aria-label="Permalink to &quot;CSP 在 Nginx 中的启用&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">add_header  Content-Security-Policy  &quot;default-src \${value}; script-src \${value}; style-src \${value}; img-src \${value}; font-src \${value}; media-src \${value}; object-src \${value}; connect-src \${value}; child-src \${value}; sandbox \${value}; report-uri \${value}&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">add_header  Content-Security-Policy  &quot;default-src &#39;none&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; style-src &#39;self&#39; &#39;unsafe-inline&#39;; img-src &#39;self&#39; data: https://www.w3.org https://avatars0.githubusercontent.com; font-src &#39;none&#39;; media-src &#39;none&#39;; object-src &#39;none&#39;; connect-src &#39;self&#39; https://github.com https://api.github.com; child-src &#39;none&#39;&quot; always;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">add_header  Content-Security-Policy  &quot;default-src \${value}; script-src \${value}; style-src \${value}; img-src \${value}; font-src \${value}; media-src \${value}; object-src \${value}; connect-src \${value}; child-src \${value}; sandbox \${value}; report-uri \${value}&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">add_header  Content-Security-Policy  &quot;default-src &#39;none&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;; style-src &#39;self&#39; &#39;unsafe-inline&#39;; img-src &#39;self&#39; data: https://www.w3.org https://avatars0.githubusercontent.com; font-src &#39;none&#39;; media-src &#39;none&#39;; object-src &#39;none&#39;; connect-src &#39;self&#39; https://github.com https://api.github.com; child-src &#39;none&#39;&quot; always;</span></span></code></pre></div><p>将下面的Nginx配置文件代码放入到对应站点的.conf配置文件[server]里，然后重启Nginx即可生效</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">if ($request_method !~* GET|POST) { return 444; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#使用444错误代码可以更加减轻服务器负载压力。</span></span>
<span class="line"><span style="color:#e1e4e8;">#防止SQL注入</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($query_string ~* (\\$|&#39;|--|[+|(%20)]union[+|(%20)]|[+|(%20)]insert[+|(%20)]|[+|(%20)]drop[+|(%20)]|[+|(%20)]truncate[+|(%20)]|[+|(%20)]update[+|(%20)]|[+|(%20)]from[+|(%20)]|[+|(%20)]grant[+|(%20)]|[+|(%20)]exec[+|(%20)]|[+|(%20)]where[+|(%20)]|[+|(%20)]select[+|(%20)]|[+|(%20)]and[+|(%20)]|[+|(%20)]or[+|(%20)]|[+|(%20)]count[+|(%20)]|[+|(%20)]exec[+|(%20)]|[+|(%20)]chr[+|(%20)]|[+|(%20)]mid[+|(%20)]|[+|(%20)]like[+|(%20)]|[+|(%20)]iframe[+|(%20)]|[\\&lt;|%3c]script[\\&gt;|%3e]|javascript|alert|webscan|dbappsecurity|style|confirm\\(|innerhtml|innertext)(.*)$) { return 555; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($uri ~* (/~).*) { return 501; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($uri ~* (\\\\x.)) { return 501; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#防止SQL注入 </span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~* &quot;[;&#39;&lt;&gt;].*&quot;) { return 509; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~ &quot; &quot;) { return 509; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~ (\\/\\.+)) { return 509; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~ (\\.+\\/)) { return 509; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #if ($uri ~* (insert|select|delete|update|count|master|truncate|declare|exec|\\*|\\&#39;)(.*)$ ) { return 503; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#防止SQL注入</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;(cost\\()|(concat\\()&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;[+|(%20)]union[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;[+|(%20)]and[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;[+|(%20)]select[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;[+|(%20)]or[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;[+|(%20)]delete[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;[+|(%20)]update[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($request_uri ~* &quot;[+|(%20)]insert[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;(&lt;|%3C).*script.*(&gt;|%3E)&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;GLOBALS(=|\\[|\\%[0-9A-Z]{0,2})&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;_REQUEST(=|\\[|\\%[0-9A-Z]{0,2})&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;proc/self/environ&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;mosConfig_[a-zA-Z_]{1,21}(=|\\%3D)&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;base64_(en|de)code\\(.*\\)&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;[a-zA-Z0-9_]=http://&quot;) { return 506; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;[a-zA-Z0-9_]=(\\.\\.//?)+&quot;) { return 506; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;[a-zA-Z0-9_]=/([a-z0-9_.]//?)+&quot;) { return 506; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;b(ultram|unicauca|valium|viagra|vicodin|xanax|ypxaieo)b&quot;) { return 507; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;b(erections|hoodia|huronriveracres|impotence|levitra|libido)b&quot;) {return 507; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;b(ambien|bluespill|cialis|cocaine|ejaculation|erectile)b&quot;) { return 507; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($query_string ~ &quot;b(lipitor|phentermin|pro[sz]ac|sandyauer|tramadol|troyhamby)b&quot;) { return 507; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#这里大家根据自己情况添加删减上述判断参数，cURL、wget这类的屏蔽有点儿极端了，但要“宁可错杀一千，不可放过一个”。</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* YisouSpider|ApacheBench|WebBench|Jmeter|JoeDog|Havij|GetRight|TurnitinBot|GrabNet|masscan|mail2000|github|wget|curl|Java|python) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#同上，大家根据自己站点实际情况来添加删减下面的屏蔽拦截参数。</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;Go-Ahead-Got-It&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;GetWeb!&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;Go!Zilla&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;Download Demon&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;Indy Library&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;libwww-perl&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;Nmap Scripting Engine&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;~17ce.com&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;WebBench*&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_user_agent ~* &quot;spider&quot;) { return 508; } #这个会影响国内某些搜索引擎爬虫，比如：搜狗</span></span>
<span class="line"><span style="color:#e1e4e8;">#拦截各恶意请求的UA，可以通过分析站点日志文件或者waf日志作为参考配置。</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_referer ~* 17ce.com) { return 509; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#拦截17ce.com站点测速节点的请求，所以明月一直都说这些测速网站的数据仅供参考不能当真的。</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($http_referer ~* WebBench*&quot;) { return 509; }</span></span>
<span class="line"><span style="color:#e1e4e8;">#拦截WebBench或者类似压力测试工具，其他工具只需要更换名称即可</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">if ($request_method !~* GET|POST) { return 444; }</span></span>
<span class="line"><span style="color:#24292e;">#使用444错误代码可以更加减轻服务器负载压力。</span></span>
<span class="line"><span style="color:#24292e;">#防止SQL注入</span></span>
<span class="line"><span style="color:#24292e;">if ($query_string ~* (\\$|&#39;|--|[+|(%20)]union[+|(%20)]|[+|(%20)]insert[+|(%20)]|[+|(%20)]drop[+|(%20)]|[+|(%20)]truncate[+|(%20)]|[+|(%20)]update[+|(%20)]|[+|(%20)]from[+|(%20)]|[+|(%20)]grant[+|(%20)]|[+|(%20)]exec[+|(%20)]|[+|(%20)]where[+|(%20)]|[+|(%20)]select[+|(%20)]|[+|(%20)]and[+|(%20)]|[+|(%20)]or[+|(%20)]|[+|(%20)]count[+|(%20)]|[+|(%20)]exec[+|(%20)]|[+|(%20)]chr[+|(%20)]|[+|(%20)]mid[+|(%20)]|[+|(%20)]like[+|(%20)]|[+|(%20)]iframe[+|(%20)]|[\\&lt;|%3c]script[\\&gt;|%3e]|javascript|alert|webscan|dbappsecurity|style|confirm\\(|innerhtml|innertext)(.*)$) { return 555; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($uri ~* (/~).*) { return 501; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($uri ~* (\\\\x.)) { return 501; }</span></span>
<span class="line"><span style="color:#24292e;">#防止SQL注入 </span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~* &quot;[;&#39;&lt;&gt;].*&quot;) { return 509; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~ &quot; &quot;) { return 509; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~ (\\/\\.+)) { return 509; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~ (\\.+\\/)) { return 509; }</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #if ($uri ~* (insert|select|delete|update|count|master|truncate|declare|exec|\\*|\\&#39;)(.*)$ ) { return 503; }</span></span>
<span class="line"><span style="color:#24292e;">#防止SQL注入</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;(cost\\()|(concat\\()&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;[+|(%20)]union[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;[+|(%20)]and[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;[+|(%20)]select[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;[+|(%20)]or[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;[+|(%20)]delete[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;[+|(%20)]update[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($request_uri ~* &quot;[+|(%20)]insert[+|(%20)]&quot;) { return 504; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;(&lt;|%3C).*script.*(&gt;|%3E)&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;GLOBALS(=|\\[|\\%[0-9A-Z]{0,2})&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;_REQUEST(=|\\[|\\%[0-9A-Z]{0,2})&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;proc/self/environ&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;mosConfig_[a-zA-Z_]{1,21}(=|\\%3D)&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;base64_(en|de)code\\(.*\\)&quot;) { return 505; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;[a-zA-Z0-9_]=http://&quot;) { return 506; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;[a-zA-Z0-9_]=(\\.\\.//?)+&quot;) { return 506; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;[a-zA-Z0-9_]=/([a-z0-9_.]//?)+&quot;) { return 506; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;b(ultram|unicauca|valium|viagra|vicodin|xanax|ypxaieo)b&quot;) { return 507; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;b(erections|hoodia|huronriveracres|impotence|levitra|libido)b&quot;) {return 507; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;b(ambien|bluespill|cialis|cocaine|ejaculation|erectile)b&quot;) { return 507; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($query_string ~ &quot;b(lipitor|phentermin|pro[sz]ac|sandyauer|tramadol|troyhamby)b&quot;) { return 507; }</span></span>
<span class="line"><span style="color:#24292e;">#这里大家根据自己情况添加删减上述判断参数，cURL、wget这类的屏蔽有点儿极端了，但要“宁可错杀一千，不可放过一个”。</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* YisouSpider|ApacheBench|WebBench|Jmeter|JoeDog|Havij|GetRight|TurnitinBot|GrabNet|masscan|mail2000|github|wget|curl|Java|python) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;">#同上，大家根据自己站点实际情况来添加删减下面的屏蔽拦截参数。</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;Go-Ahead-Got-It&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;GetWeb!&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;Go!Zilla&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;Download Demon&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;Indy Library&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;libwww-perl&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;Nmap Scripting Engine&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;~17ce.com&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;WebBench*&quot;) { return 508; }</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_user_agent ~* &quot;spider&quot;) { return 508; } #这个会影响国内某些搜索引擎爬虫，比如：搜狗</span></span>
<span class="line"><span style="color:#24292e;">#拦截各恶意请求的UA，可以通过分析站点日志文件或者waf日志作为参考配置。</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_referer ~* 17ce.com) { return 509; }</span></span>
<span class="line"><span style="color:#24292e;">#拦截17ce.com站点测速节点的请求，所以明月一直都说这些测速网站的数据仅供参考不能当真的。</span></span>
<span class="line"><span style="color:#24292e;"> if ($http_referer ~* WebBench*&quot;) { return 509; }</span></span>
<span class="line"><span style="color:#24292e;">#拦截WebBench或者类似压力测试工具，其他工具只需要更换名称即可</span></span></code></pre></div><h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><h2 id="google" tabindex="-1">google+ <a class="header-anchor" href="#google" aria-label="Permalink to &quot;google+&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># x-content-type-options: nosniff</span></span>
<span class="line"><span style="color:#e1e4e8;"># x-frame-options: SAMEORIGIN</span></span>
<span class="line"><span style="color:#e1e4e8;"># x-xss-protection: 1; mode=block</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># x-content-type-options: nosniff</span></span>
<span class="line"><span style="color:#24292e;"># x-frame-options: SAMEORIGIN</span></span>
<span class="line"><span style="color:#24292e;"># x-xss-protection: 1; mode=block</span></span></code></pre></div><h2 id="twitter" tabindex="-1">Twitter <a class="header-anchor" href="#twitter" aria-label="Permalink to &quot;Twitter&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># strict-transport-security: max-age=631138519</span></span>
<span class="line"><span style="color:#e1e4e8;"># x-frame-options: SAMEORIGIN</span></span>
<span class="line"><span style="color:#e1e4e8;"># x-xss-protection: 1; mode=block</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># strict-transport-security: max-age=631138519</span></span>
<span class="line"><span style="color:#24292e;"># x-frame-options: SAMEORIGIN</span></span>
<span class="line"><span style="color:#24292e;"># x-xss-protection: 1; mode=block</span></span></code></pre></div><h2 id="paypal" tabindex="-1">Paypal <a class="header-anchor" href="#paypal" aria-label="Permalink to &quot;Paypal&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># X-Frame-Options: SAMEORIGIN</span></span>
<span class="line"><span style="color:#e1e4e8;"># Strict-Transport-Security: max-age=14400</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># X-Frame-Options: SAMEORIGIN</span></span>
<span class="line"><span style="color:#24292e;"># Strict-Transport-Security: max-age=14400</span></span></code></pre></div><h2 id="facebook" tabindex="-1">facebook <a class="header-anchor" href="#facebook" aria-label="Permalink to &quot;facebook&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">strict-transport-security: max-age=60</span></span>
<span class="line"><span style="color:#e1e4e8;">x-content-type-options: nosniff</span></span>
<span class="line"><span style="color:#e1e4e8;">x-frame-options: DENY</span></span>
<span class="line"><span style="color:#e1e4e8;">x-xss-protection: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">content-security-policy: default-src *;script-src https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* chrome-extension://lifbcibllhkdhoafpjfnlhfpfgnpldfl &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://*.akamaihd.net http://*.akamaihd.net;style-src * &#39;unsafe-inline&#39;;connect-src https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.spotilocal.com:* https://*.akamaihd.net ws://*.facebook.com:* http://*.akamaihd.net https://fb.scanandcleanlocal.com:*;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">strict-transport-security: max-age=60</span></span>
<span class="line"><span style="color:#24292e;">x-content-type-options: nosniff</span></span>
<span class="line"><span style="color:#24292e;">x-frame-options: DENY</span></span>
<span class="line"><span style="color:#24292e;">x-xss-protection: 0</span></span>
<span class="line"><span style="color:#24292e;">content-security-policy: default-src *;script-src https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* chrome-extension://lifbcibllhkdhoafpjfnlhfpfgnpldfl &#39;unsafe-inline&#39; &#39;unsafe-eval&#39; https://*.akamaihd.net http://*.akamaihd.net;style-src * &#39;unsafe-inline&#39;;connect-src https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.spotilocal.com:* https://*.akamaihd.net ws://*.facebook.com:* http://*.akamaihd.net https://fb.scanandcleanlocal.com:*;</span></span></code></pre></div>`,61);function u(y,d,h,f,g,m){const s=n("center");return a(),t("div",null,[l(s,null,{default:p(()=>[c("Nginx 防止SQL注入、XSS攻击的实践配置方法")]),_:1}),i])}const b=e(r,[["render",u]]);export{q as __pageData,b as default};
