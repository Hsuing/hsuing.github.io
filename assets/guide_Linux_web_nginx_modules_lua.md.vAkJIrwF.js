import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/lua.md","filePath":"guide/Linux/web/nginx/modules/lua.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/modules/lua.md"},l=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location = /admin.php {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 403;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location = /admin.php {</span></span>
<span class="line"><span style="color:#24292e;">        return 403;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div><p>如果想要使用 Lua 实现，那么我们先把 Lua 代码写出来：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    if (ngx.var.request_uri == &quot;/admin.php&quot;) then</span></span>
<span class="line"><span style="color:#e1e4e8;">        return ngx.exit(ngx.HTTP_FORBIDDEN)</span></span>
<span class="line"><span style="color:#e1e4e8;">    end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    if (ngx.var.request_uri == &quot;/admin.php&quot;) then</span></span>
<span class="line"><span style="color:#24292e;">        return ngx.exit(ngx.HTTP_FORBIDDEN)</span></span>
<span class="line"><span style="color:#24292e;">    end</span></span></code></pre></div><p>然后把它放进 access_by_lua_block 中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">        access_by_lua_block {</span></span>
<span class="line"><span style="color:#e1e4e8;">            if (ngx.var.request_uri == &quot;/admin.php&quot;) then</span></span>
<span class="line"><span style="color:#e1e4e8;">                return ngx.exit(ngx.HTTP_FORBIDDEN)</span></span>
<span class="line"><span style="color:#e1e4e8;">            end</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    location / {</span></span>
<span class="line"><span style="color:#24292e;">        access_by_lua_block {</span></span>
<span class="line"><span style="color:#24292e;">            if (ngx.var.request_uri == &quot;/admin.php&quot;) then</span></span>
<span class="line"><span style="color:#24292e;">                return ngx.exit(ngx.HTTP_FORBIDDEN)</span></span>
<span class="line"><span style="color:#24292e;">            end</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div>`,5),o=[l];function t(c,i,r,d,u,_){return n(),a("div",null,o)}const y=s(p,[["render",t]]);export{h as __pageData,y as default};
