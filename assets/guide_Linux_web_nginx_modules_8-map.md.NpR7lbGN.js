import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/8-map.md","filePath":"guide/Linux/web/nginx/modules/8-map.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/modules/8-map.md"},p=e(`<ul><li>map</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">map $http_host $name {</span></span>
<span class="line"><span style="color:#e1e4e8;">         hostnames;</span></span>
<span class="line"><span style="color:#e1e4e8;">         default 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">         ~map.zhang\\w+\\.com 1;  #表示当请求的host匹配此规则时$name=1，默认$name=0</span></span>
<span class="line"><span style="color:#e1e4e8;">         *.aaa.com 2;</span></span>
<span class="line"><span style="color:#e1e4e8;">         map.aa.com 3;</span></span>
<span class="line"><span style="color:#e1e4e8;">         map.aaa.* 4;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">map $http_user_agent $mobile {</span></span>
<span class="line"><span style="color:#e1e4e8;">         default 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">         &quot;~Opera Mini&quot; 1;  #表示当请求的浏览器类型匹配此规则时 $mobile=1,默认$mobile=0</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">      listen 8080;</span></span>
<span class="line"><span style="color:#e1e4e8;">      default_type text/plain;</span></span>
<span class="line"><span style="color:#e1e4e8;">      location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">       return 200 &#39;$name:$mobile\\n&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hk conf.d]#curl -H &#39;host:map.aaa.cn&#39; 127.0.0.1:8080</span></span>
<span class="line"><span style="color:#e1e4e8;">4:0</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hk conf.d]#curl -H &#39;host:*.aaa.com&#39; 127.0.0.1:8080</span></span>
<span class="line"><span style="color:#e1e4e8;">2:0</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@hk conf.d]#curl -H &#39;host:map.zhangdazhi.com&#39; 127.0.0.1:8080</span></span>
<span class="line"><span style="color:#e1e4e8;">3:0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">map $http_host $name {</span></span>
<span class="line"><span style="color:#24292e;">         hostnames;</span></span>
<span class="line"><span style="color:#24292e;">         default 0;</span></span>
<span class="line"><span style="color:#24292e;">         ~map.zhang\\w+\\.com 1;  #表示当请求的host匹配此规则时$name=1，默认$name=0</span></span>
<span class="line"><span style="color:#24292e;">         *.aaa.com 2;</span></span>
<span class="line"><span style="color:#24292e;">         map.aa.com 3;</span></span>
<span class="line"><span style="color:#24292e;">         map.aaa.* 4;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">map $http_user_agent $mobile {</span></span>
<span class="line"><span style="color:#24292e;">         default 0;</span></span>
<span class="line"><span style="color:#24292e;">         &quot;~Opera Mini&quot; 1;  #表示当请求的浏览器类型匹配此规则时 $mobile=1,默认$mobile=0</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">      listen 8080;</span></span>
<span class="line"><span style="color:#24292e;">      default_type text/plain;</span></span>
<span class="line"><span style="color:#24292e;">      location / {</span></span>
<span class="line"><span style="color:#24292e;">       return 200 &#39;$name:$mobile\\n&#39;;</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">[root@hk conf.d]#curl -H &#39;host:map.aaa.cn&#39; 127.0.0.1:8080</span></span>
<span class="line"><span style="color:#24292e;">4:0</span></span>
<span class="line"><span style="color:#24292e;">[root@hk conf.d]#curl -H &#39;host:*.aaa.com&#39; 127.0.0.1:8080</span></span>
<span class="line"><span style="color:#24292e;">2:0</span></span>
<span class="line"><span style="color:#24292e;">[root@hk conf.d]#curl -H &#39;host:map.zhangdazhi.com&#39; 127.0.0.1:8080</span></span>
<span class="line"><span style="color:#24292e;">3:0</span></span></code></pre></div>`,2),o=[p];function c(t,i,r,m,y,d){return n(),a("div",null,o)}const _=s(l,[["render",c]]);export{u as __pageData,_ as default};
