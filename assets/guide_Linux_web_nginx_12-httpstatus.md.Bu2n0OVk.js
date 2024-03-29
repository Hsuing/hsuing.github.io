import{_ as e,c as a,o as s,R as n}from"./chunks/framework.CIzs38F0.js";const y=JSON.parse('{"title":"1.502报错和504报错有什么区别","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/12-httpstatus.md","filePath":"guide/Linux/web/nginx/12-httpstatus.md","lastUpdated":1701684699000}'),t={name:"guide/Linux/web/nginx/12-httpstatus.md"},p=n(`<h1 id="_1-502报错和504报错有什么区别" tabindex="-1">1.502报错和504报错有什么区别 <a class="header-anchor" href="#_1-502报错和504报错有什么区别" aria-label="Permalink to &quot;1.502报错和504报错有什么区别&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">502 Bad Gateway</span></span>
<span class="line"><span style="color:#e1e4e8;">The server was acting as a gateway or proxy and received an invalid response from the upstream server.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">504 Gateway Timeout</span></span>
<span class="line"><span style="color:#e1e4e8;">The server was acting as a gateway or proxy and did not receive a timely response from the upstream server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">502 Bad Gateway</span></span>
<span class="line"><span style="color:#24292e;">The server was acting as a gateway or proxy and received an invalid response from the upstream server.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">504 Gateway Timeout</span></span>
<span class="line"><span style="color:#24292e;">The server was acting as a gateway or proxy and did not receive a timely response from the upstream server</span></span></code></pre></div><p>502是后端死了，连不上（可能无法建立TCP连接） ，504是后端活着，但没给我回应（至少TCP连接已经建立）</p><ul><li>解决方法</li></ul><ul><li>502的情况需要检查后端服务器状态。</li><li>504的情况需要检查后端服务器响应情况，和nginx设置的超时时间</li></ul>`,5),r=[p];function l(o,i,c,d,u,_){return s(),a("div",null,r)}const g=e(t,[["render",l]]);export{y as __pageData,g as default};