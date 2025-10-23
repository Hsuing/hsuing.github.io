import{_ as a,D as n,o as e,c as p,I as l,w as o,R as r,a as c}from"./chunks/framework.zUbWieqp.js";const $=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/4-iphash.md","filePath":"guide/Linux/web/nginx/modules/4-iphash.md","lastUpdated":1701684699000}'),t={name:"guide/Linux/web/nginx/modules/4-iphash.md"},i=r(`<p>下四种负载均衡的算法，分别是：round-robin、ip-hash、least-connected和weighted</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">upstream h5 {</span></span>
<span class="line"><span style="color:#e1e4e8;">   ip_hash;</span></span>
<span class="line"><span style="color:#e1e4e8;">   server 192.168.100.104:9080;</span></span>
<span class="line"><span style="color:#e1e4e8;">   server 192.168.100.105:9080;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">upstream h5 {</span></span>
<span class="line"><span style="color:#24292e;">   ip_hash;</span></span>
<span class="line"><span style="color:#24292e;">   server 192.168.100.104:9080;</span></span>
<span class="line"><span style="color:#24292e;">   server 192.168.100.105:9080;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    #获取用户真实IP，并赋值给变量$clientRealIP</span></span>
<span class="line"><span style="color:#e1e4e8;">#realip</span></span>
<span class="line"><span style="color:#e1e4e8;">map $http_x_forwarded_for $clientRealIp {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;&quot;  $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^(?P&lt;firstAddr&gt;[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+|[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+),?.*$ $firstAddr;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">upstream h5 {</span></span>
<span class="line"><span style="color:#e1e4e8;">hash $clientRealIp;</span></span>
<span class="line"><span style="color:#e1e4e8;">server 192.168.100.104:9080;</span></span>
<span class="line"><span style="color:#e1e4e8;">server 192.168.100.105:9080;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注：这种方式也并不是万无一失了，因为请求的Header中的HTTP_X_FORWARDED_FOR参数是可以在请求时被修改的，因此就存在一定的安全隐患。不过现在的CDN一般都有加速防黑的功能，所有实际上问题也不是很大。如果实在不放心的话不是还可以使用SSL证书整站加密</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    #获取用户真实IP，并赋值给变量$clientRealIP</span></span>
<span class="line"><span style="color:#24292e;">#realip</span></span>
<span class="line"><span style="color:#24292e;">map $http_x_forwarded_for $clientRealIp {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;&quot;  $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        ~^(?P&lt;firstAddr&gt;[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+|[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+:[0-9A-Fa-f]+),?.*$ $firstAddr;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">upstream h5 {</span></span>
<span class="line"><span style="color:#24292e;">hash $clientRealIp;</span></span>
<span class="line"><span style="color:#24292e;">server 192.168.100.104:9080;</span></span>
<span class="line"><span style="color:#24292e;">server 192.168.100.105:9080;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注：这种方式也并不是万无一失了，因为请求的Header中的HTTP_X_FORWARDED_FOR参数是可以在请求时被修改的，因此就存在一定的安全隐患。不过现在的CDN一般都有加速防黑的功能，所有实际上问题也不是很大。如果实在不放心的话不是还可以使用SSL证书整站加密</span></span></code></pre></div><h2 id="ip真实原理" tabindex="-1">ip真实原理 <a class="header-anchor" href="#ip真实原理" aria-label="Permalink to &quot;ip真实原理&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1. 几个概念</span></span>
<span class="line"><span style="color:#e1e4e8;">remote_addr：如果中间没有代理，这个就是客户端的真实IP，如果有代理，这就是上层代理的IP.</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Forwarded-For：一个HTTP扩展头，格式为 X-Forwarded-For: client, proxy1, proxy2 </span></span>
<span class="line"><span style="color:#e1e4e8;">X-Real-IP：自定义的HTTP头，用于把客户端真实IP一层层传递下去。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2.几个变量</span></span>
<span class="line"><span style="color:#e1e4e8;">$remote_addr：上层IP（客户端或代理）</span></span>
<span class="line"><span style="color:#e1e4e8;">$proxy_add_x_forwarded_for：包括客户端请求头的X-Forwarded-For和$remote_addr</span></span>
<span class="line"><span style="color:#e1e4e8;">$http_x_forwarded_for：就是X-Forwarded-For的值</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3. 获取客户端真实IP的方法</span></span>
<span class="line"><span style="color:#e1e4e8;">    3.1 通过设置X-real-IP层层传递</span></span>
<span class="line"><span style="color:#e1e4e8;">        首层代理：proxy_set_header X-Real-IP $remote_addr;   针对首层代理，拿到真实IP</span></span>
<span class="line"><span style="color:#e1e4e8;">        非首层代理：proxy_set_header X-Real-IP $http_x_real_ip;  # 针对非首层代理，一直传下去 </span></span>
<span class="line"><span style="color:#e1e4e8;">    3.2 通过设置X-Forwarded-For请求头</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">        然后截取X-Forward-For请求头的第一段，即是客户端的真实IP</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> http {</span></span>
<span class="line"><span style="color:#e1e4e8;">        map $http_x_forwarded_for  $clientRealIp {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;&quot;      $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ~^(?P[0-9\\.]+),?.*$  $firstAddr;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1. 几个概念</span></span>
<span class="line"><span style="color:#24292e;">remote_addr：如果中间没有代理，这个就是客户端的真实IP，如果有代理，这就是上层代理的IP.</span></span>
<span class="line"><span style="color:#24292e;">X-Forwarded-For：一个HTTP扩展头，格式为 X-Forwarded-For: client, proxy1, proxy2 </span></span>
<span class="line"><span style="color:#24292e;">X-Real-IP：自定义的HTTP头，用于把客户端真实IP一层层传递下去。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2.几个变量</span></span>
<span class="line"><span style="color:#24292e;">$remote_addr：上层IP（客户端或代理）</span></span>
<span class="line"><span style="color:#24292e;">$proxy_add_x_forwarded_for：包括客户端请求头的X-Forwarded-For和$remote_addr</span></span>
<span class="line"><span style="color:#24292e;">$http_x_forwarded_for：就是X-Forwarded-For的值</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3. 获取客户端真实IP的方法</span></span>
<span class="line"><span style="color:#24292e;">    3.1 通过设置X-real-IP层层传递</span></span>
<span class="line"><span style="color:#24292e;">        首层代理：proxy_set_header X-Real-IP $remote_addr;   针对首层代理，拿到真实IP</span></span>
<span class="line"><span style="color:#24292e;">        非首层代理：proxy_set_header X-Real-IP $http_x_real_ip;  # 针对非首层代理，一直传下去 </span></span>
<span class="line"><span style="color:#24292e;">    3.2 通过设置X-Forwarded-For请求头</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">        然后截取X-Forward-For请求头的第一段，即是客户端的真实IP</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> http {</span></span>
<span class="line"><span style="color:#24292e;">        map $http_x_forwarded_for  $clientRealIp {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;&quot;      $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        ~^(?P[0-9\\.]+),?.*$  $firstAddr;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span></code></pre></div>`,5);function d(y,_,h,f,F,u){const s=n("center");return e(),p("div",null,[l(s,null,{default:o(()=>[c("nginx使用用户真实IP做hash（解决经过CND后ip_hash失效问题）")]),_:1}),i])}const x=a(t,[["render",d]]);export{$ as __pageData,x as default};
