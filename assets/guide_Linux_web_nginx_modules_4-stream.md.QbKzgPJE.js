import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"一、tcp 代理","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/4-stream.md","filePath":"guide/Linux/web/nginx/modules/4-stream.md","lastUpdated":1701684699000}'),l={name:"guide/Linux/web/nginx/modules/4-stream.md"},p=e(`<h1 id="一、tcp-代理" tabindex="-1">一、tcp 代理 <a class="header-anchor" href="#一、tcp-代理" aria-label="Permalink to &quot;一、tcp 代理&quot;">​</a></h1><p>使用Nginx做tcp的反向代理，目前1.7至1.9版本需要加载[nginx_tcp_proxy_module]模块，1.9之后可以使用[--with-stream]模块</p><h2 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">stream 和http同级</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">stream {</span></span>
<span class="line"><span style="color:#e1e4e8;">    upstream helo {</span></span>
<span class="line"><span style="color:#e1e4e8;">        server x.x.x.x;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">#注意: server 后面只需要添加地址即可!</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">stream 和http同级</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">stream {</span></span>
<span class="line"><span style="color:#24292e;">    upstream helo {</span></span>
<span class="line"><span style="color:#24292e;">        server x.x.x.x;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">#注意: server 后面只需要添加地址即可!</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>编译nginx时加上 --with-http_sub_module --with-stream --with-stream_ssl_module</li></ul><h2 id="_1-代理ssh" tabindex="-1">1.代理ssh <a class="header-anchor" href="#_1-代理ssh" aria-label="Permalink to &quot;1.代理ssh&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">stream {</span></span>
<span class="line"><span style="color:#e1e4e8;">  upstream hello {</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 127.0.0.1:22;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 9898;</span></span>
<span class="line"><span style="color:#e1e4e8;">    proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_timeout 300s;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_pass hello;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">stream {</span></span>
<span class="line"><span style="color:#24292e;">  upstream hello {</span></span>
<span class="line"><span style="color:#24292e;">	server 127.0.0.1:22;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 9898;</span></span>
<span class="line"><span style="color:#24292e;">    proxy_connect_timeout 10s;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_timeout 300s;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_pass hello;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>测试</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost conf]# ssh -p 9898 127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">The authenticity of host &#39;[127.0.0.1]:9898 ([127.0.0.1]:9898)&#39; can&#39;t be established.</span></span>
<span class="line"><span style="color:#e1e4e8;">ECDSA key fingerprint is SHA256:7jY66oPptlYepMp/i3Rau5trHyZyH39fdEZYW/zx7Us.</span></span>
<span class="line"><span style="color:#e1e4e8;">Are you sure you want to continue connecting (yes/no)? yes</span></span>
<span class="line"><span style="color:#e1e4e8;">Warning: Permanently added &#39;[127.0.0.1]:9898&#39; (ECDSA) to the list of known hosts.</span></span>
<span class="line"><span style="color:#e1e4e8;">root@127.0.0.1&#39;s password: </span></span>
<span class="line"><span style="color:#e1e4e8;">Activate the web console with: systemctl enable --now cockpit.socket</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Last login: Fri Jan  3 03:47:25 2020 from 192.168.122.1</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# exit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost conf]# ssh -p 9898 127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">The authenticity of host &#39;[127.0.0.1]:9898 ([127.0.0.1]:9898)&#39; can&#39;t be established.</span></span>
<span class="line"><span style="color:#24292e;">ECDSA key fingerprint is SHA256:7jY66oPptlYepMp/i3Rau5trHyZyH39fdEZYW/zx7Us.</span></span>
<span class="line"><span style="color:#24292e;">Are you sure you want to continue connecting (yes/no)? yes</span></span>
<span class="line"><span style="color:#24292e;">Warning: Permanently added &#39;[127.0.0.1]:9898&#39; (ECDSA) to the list of known hosts.</span></span>
<span class="line"><span style="color:#24292e;">root@127.0.0.1&#39;s password: </span></span>
<span class="line"><span style="color:#24292e;">Activate the web console with: systemctl enable --now cockpit.socket</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Last login: Fri Jan  3 03:47:25 2020 from 192.168.122.1</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# exit</span></span></code></pre></div>`,9),o=[p];function t(c,i,r,y,h,d){return n(),a("div",null,o)}const _=s(l,[["render",t]]);export{m as __pageData,_ as default};
