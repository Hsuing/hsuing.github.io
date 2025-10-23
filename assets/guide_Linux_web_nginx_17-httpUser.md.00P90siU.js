import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"生成密码","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/17-httpUser.md","filePath":"guide/Linux/web/nginx/17-httpUser.md","lastUpdated":1701684699000}'),p={name:"guide/Linux/web/nginx/17-httpUser.md"},l=n(`<h1 id="生成密码" tabindex="-1">生成密码 <a class="header-anchor" href="#生成密码" aria-label="Permalink to &quot;生成密码&quot;">​</a></h1><h2 id="方式1" tabindex="-1">方式1 <a class="header-anchor" href="#方式1" aria-label="Permalink to &quot;方式1&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">printf &quot;your_username:$(openssl passwd -crypt your_password)\\n&quot; &gt;&gt; /etc/nginx/wzy.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">printf &quot;your_username:$(openssl passwd -crypt your_password)\\n&quot; &gt;&gt; /etc/nginx/wzy.log</span></span></code></pre></div><p><strong>此方式不需要安装httpd-tools</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    auth_basic &quot;网站名称&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    auth_basic_user_file /data/apps/nginx/conf/db.log; </span></span>
<span class="line"><span style="color:#e1e4e8;">    autoindex on;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    auth_basic &quot;网站名称&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    auth_basic_user_file /data/apps/nginx/conf/db.log; </span></span>
<span class="line"><span style="color:#24292e;">    autoindex on;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="方式2" tabindex="-1">方式2 <a class="header-anchor" href="#方式2" aria-label="Permalink to &quot;方式2&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#安装 htpasswd 工具</span></span>
<span class="line"><span style="color:#e1e4e8;">yum -y install httpd-tools </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建认证用户</span></span>
<span class="line"><span style="color:#e1e4e8;">htpasswd -cb pass.db user1 12345 //user1 并输入密码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#安装 htpasswd 工具</span></span>
<span class="line"><span style="color:#24292e;">yum -y install httpd-tools </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建认证用户</span></span>
<span class="line"><span style="color:#24292e;">htpasswd -cb pass.db user1 12345 //user1 并输入密码</span></span></code></pre></div>`,7),t=[l];function o(c,i,r,d,u,h){return a(),e("div",null,t)}const _=s(p,[["render",o]]);export{y as __pageData,_ as default};
