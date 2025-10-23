import{_ as e,o as s,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/vpn/23-openvpn_cluster.md","filePath":"guide/Linux/vpn/23-openvpn_cluster.md","lastUpdated":1701595065000}'),o={name:"guide/Linux/vpn/23-openvpn_cluster.md"},t=a(`<h2 id="_1-client" tabindex="-1">1.client <a class="header-anchor" href="#_1-client" aria-label="Permalink to &quot;1.client&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">remote server1.mydomain</span></span>
<span class="line"><span style="color:#e1e4e8;">remote server2.mydomain</span></span>
<span class="line"><span style="color:#e1e4e8;">remote server3.mydomain</span></span>
<span class="line"><span style="color:#e1e4e8;">remote-random</span></span>
<span class="line"><span style="color:#e1e4e8;">resolv-retry 60</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">remote server1.mydomain</span></span>
<span class="line"><span style="color:#24292e;">remote server2.mydomain</span></span>
<span class="line"><span style="color:#24292e;">remote server3.mydomain</span></span>
<span class="line"><span style="color:#24292e;">remote-random</span></span>
<span class="line"><span style="color:#24292e;">resolv-retry 60</span></span></code></pre></div>`,2),p=[t];function l(r,c,i,d,_,m){return s(),n("div",null,p)}const y=e(o,[["render",l]]);export{u as __pageData,y as default};
