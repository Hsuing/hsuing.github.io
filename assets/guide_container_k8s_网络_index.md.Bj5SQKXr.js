import{_ as e,c as s,o as a,R as t}from"./chunks/framework.CIzs38F0.js";const k=JSON.parse('{"title":"Overlay Netowrk","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/网络/index.md","filePath":"guide/container/k8s/网络/index.md","lastUpdated":1717033168000}'),r={name:"guide/container/k8s/网络/index.md"},n=t(`<p>CNI 性能部分</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202405271651083.png" alt="image-20240527165135732"></p><h1 id="overlay-netowrk" tabindex="-1">Overlay Netowrk <a class="header-anchor" href="#overlay-netowrk" aria-label="Permalink to &quot;Overlay Netowrk&quot;">​</a></h1><p>CNI的全称是Container Network Interface，它为容器提供了一种基于插件结构的标准化网络解决方案。以往，容器的网络层是和具体的底层网络环境高度相关的，不同的网络服务提供商有不同的实现。CNI从网络服务里抽象出了一套标准接口，从而屏蔽了上层网络和底层网络提供商的网络实现之间的差异。并且，通过插件结构，它让容器在网络层的具体实现变得可插拔了，所以非常灵活。</p><h1 id="_1-网络模型" tabindex="-1">1.网络模型 <a class="header-anchor" href="#_1-网络模型" aria-label="Permalink to &quot;1.网络模型&quot;">​</a></h1><p>​ CNI:容器网络接口</p><h1 id="_2-网络插件" tabindex="-1">2.网络插件 <a class="header-anchor" href="#_2-网络插件" aria-label="Permalink to &quot;2.网络插件&quot;">​</a></h1><p>​ Cilium</p><p>​ Calico：网络配置，支持网络策略</p><p>​ <a href="https://docs.tigera.io/calico/latest/about" target="_blank" rel="noreferrer">https://docs.tigera.io/calico/latest/about</a></p><p>​ <a href="https://docs.tigera.io/calico/3.25/about/" target="_blank" rel="noreferrer">https://docs.tigera.io/calico/3.25/about/</a></p><p>​ Flannel：网络配置，不支持网络策略</p><h1 id="_3-网络策略" tabindex="-1">3.网络策略 <a class="header-anchor" href="#_3-网络策略" aria-label="Permalink to &quot;3.网络策略&quot;">​</a></h1><p>​ NetworkPolicy</p><p>目前这两种比较多Flannel和Calico</p><h1 id="_4-ingress" tabindex="-1">4.ingress <a class="header-anchor" href="#_4-ingress" aria-label="Permalink to &quot;4.ingress&quot;">​</a></h1><p>Ingress官方文档：<a href="https://kubernetes.io/docs/concepts/services-networking/ingress/" target="_blank" rel="noreferrer">https://kubernetes.io/docs/concepts/services-networking/ingress/</a> Ingress Controllers官网介绍：<a href="https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/" target="_blank" rel="noreferrer">https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/</a></p><p>推荐这个进行安装，<a href="https://github.com/nginxinc/kubernetes-ingress" target="_blank" rel="noreferrer">https://github.com/nginxinc/kubernetes-ingress</a></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 只在 master 节点执行</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://raw.githubusercontent.com/eip-work/eip-monitor-repository/master/dashboard/nginx-ingress.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 只在 master 节点执行</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://raw.githubusercontent.com/eip-work/eip-monitor-repository/master/dashboard/nginx-ingress.yaml</span></span></code></pre></div>`,19),o=[n];function l(i,p,c,h,d,g){return a(),s("div",null,o)}const _=e(r,[["render",l]]);export{k as __pageData,_ as default};
