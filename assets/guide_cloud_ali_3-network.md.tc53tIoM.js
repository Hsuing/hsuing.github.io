import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.添加辅助网卡","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/ali/3-network.md","filePath":"guide/cloud/ali/3-network.md","lastUpdated":1701247404000}'),p={name:"guide/cloud/ali/3-network.md"},l=e(`<h1 id="_1-添加辅助网卡" tabindex="-1">1.添加辅助网卡 <a class="header-anchor" href="#_1-添加辅助网卡" aria-label="Permalink to &quot;1.添加辅助网卡&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn network-scripts]# cat ifcfg-eth1 </span></span>
<span class="line"><span style="color:#e1e4e8;">DEVICE=eth1</span></span>
<span class="line"><span style="color:#e1e4e8;">BOOTPROTO=dhcp</span></span>
<span class="line"><span style="color:#e1e4e8;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn network-scripts]# systemctl restart network</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn network-scripts]# cat ifcfg-eth1 </span></span>
<span class="line"><span style="color:#24292e;">DEVICE=eth1</span></span>
<span class="line"><span style="color:#24292e;">BOOTPROTO=dhcp</span></span>
<span class="line"><span style="color:#24292e;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn network-scripts]# systemctl restart network</span></span></code></pre></div><p>创建弹性网卡： <a href="https://help.aliyun.com/document_detail/56955.html" target="_blank" rel="noreferrer">https://help.aliyun.com/document_detail/56955.html</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291600045.jpg" alt=""></p><h1 id="_2-辅助私网ip" tabindex="-1">2.辅助私网IP <a class="header-anchor" href="#_2-辅助私网ip" aria-label="Permalink to &quot;2.辅助私网IP&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@openvpn network-scripts]# cat ifcfg-eth0:1</span></span>
<span class="line"><span style="color:#e1e4e8;">DEVICE=eth0:1</span></span>
<span class="line"><span style="color:#e1e4e8;">TYPE=Ethernet</span></span>
<span class="line"><span style="color:#e1e4e8;">BOOTPROTO=static</span></span>
<span class="line"><span style="color:#e1e4e8;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">IPADDR=172.16.98.83</span></span>
<span class="line"><span style="color:#e1e4e8;">NETMASK=255.255.128.0</span></span>
<span class="line"><span style="color:#e1e4e8;">GATEWAY=172.16.127.253</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@openvpn network-scripts]#重启网络</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@openvpn network-scripts]# cat ifcfg-eth0:1</span></span>
<span class="line"><span style="color:#24292e;">DEVICE=eth0:1</span></span>
<span class="line"><span style="color:#24292e;">TYPE=Ethernet</span></span>
<span class="line"><span style="color:#24292e;">BOOTPROTO=static</span></span>
<span class="line"><span style="color:#24292e;">ONBOOT=yes</span></span>
<span class="line"><span style="color:#24292e;">IPADDR=172.16.98.83</span></span>
<span class="line"><span style="color:#24292e;">NETMASK=255.255.128.0</span></span>
<span class="line"><span style="color:#24292e;">GATEWAY=172.16.127.253</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@openvpn network-scripts]#重启网络</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291600150.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291601861.jpg" alt=""></p><h1 id="_3-带宽并发" tabindex="-1">3.带宽并发 <a class="header-anchor" href="#_3-带宽并发" aria-label="Permalink to &quot;3.带宽并发&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291601914.jpg" alt=""></p><p>10M公网带宽下载速度不是10M/S，即1280KB/秒</p><p>将设网页优化后的大小为30KB，根据带宽计算1秒钟并发数公式：<code>1秒并发连接数 = 服务器租用带宽下载速度/网页大小</code>，那么10M带宽云服务器支持在1秒内42个人同时打开网页（1280/30大约是42），所以云服务器10M带宽能够支撑42个并发在1秒内同时打开</p><p>阿里云服务器4核8G配置可选ECS实例规格有共享型s6实例、计算型c6、突发性能t5等实例规格，计算型c6是企业级独享型云服务器，共享型s6实例是共享型实例，突发性能t5实例是限制CPU性能基线的规格，同样是4核8G的服务器配置，ECS实例规格不同性能也不同，详细可以参考官方文档：<a href="https://help.aliyun.com/document_detail/25378.html?spm=a2c6h.12873639.0.0.44e251e6WU7DxJ&amp;source=5176.11533457&amp;userCode=w1g62dpe" target="_blank" rel="noreferrer">ECS实例规格性能详解 - 阿里云</a></p><h1 id="_4-安全组" tabindex="-1">4.安全组 <a class="header-anchor" href="#_4-安全组" aria-label="Permalink to &quot;4.安全组&quot;">​</a></h1><p>出方向，限制</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311291601481.jpg" alt=""></p>`,16),t=[l];function o(c,r,i,h,d,g){return a(),n("div",null,t)}const m=s(p,[["render",o]]);export{u as __pageData,m as default};
