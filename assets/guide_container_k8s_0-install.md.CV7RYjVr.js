import{_ as s,c as a,o as e,R as n}from"./chunks/framework.CIzs38F0.js";const S=JSON.parse('{"title":"1.企业测试环境","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/0-install.md","filePath":"guide/container/k8s/0-install.md","lastUpdated":1712761397000}'),l={name:"guide/container/k8s/0-install.md"},p=n(`<h1 id="_1-企业测试环境" tabindex="-1">1.企业测试环境 <a class="header-anchor" href="#_1-企业测试环境" aria-label="Permalink to &quot;1.企业测试环境&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">a)	Master节点（尽量三台实现高可用，可以将某台Master禁止调度）：8核16G+ 磁盘分为系统盘（路径：/，大小100G+）、Docker数据盘（/var/lib/docker，200G+）</span></span>
<span class="line"><span style="color:#e1e4e8;">b)	Etcd数据盘（/var/lib/etcd，50节点50G+，150节点150G+，etcd节点可以和Master节点同一个宿主机，三个节点实现高可用）</span></span>
<span class="line"><span style="color:#e1e4e8;">c)	Node节点：无特殊要求</span></span>
<span class="line"><span style="color:#e1e4e8;">d)	注意：测试环境所有的数据盘可以无需区分，有条件最好单独</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">a)	Master节点（尽量三台实现高可用，可以将某台Master禁止调度）：8核16G+ 磁盘分为系统盘（路径：/，大小100G+）、Docker数据盘（/var/lib/docker，200G+）</span></span>
<span class="line"><span style="color:#24292e;">b)	Etcd数据盘（/var/lib/etcd，50节点50G+，150节点150G+，etcd节点可以和Master节点同一个宿主机，三个节点实现高可用）</span></span>
<span class="line"><span style="color:#24292e;">c)	Node节点：无特殊要求</span></span>
<span class="line"><span style="color:#24292e;">d)	注意：测试环境所有的数据盘可以无需区分，有条件最好单独</span></span></code></pre></div><h1 id="_2-企业生产环境" tabindex="-1">2.企业生产环境 <a class="header-anchor" href="#_2-企业生产环境" aria-label="Permalink to &quot;2.企业生产环境&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">a)	Master节点：三个节点实现高可用（必须）</span></span>
<span class="line"><span style="color:#e1e4e8;">    i.	节点数：0-100    8核16+</span></span>
<span class="line"><span style="color:#e1e4e8;">    ii.	节点数：100-250  8核32G+</span></span>
<span class="line"><span style="color:#e1e4e8;">    iii.	节点数：250-500  16核32G+</span></span>
<span class="line"><span style="color:#e1e4e8;">b)	etcd节点：三个节点实现高可用（必须），有条件存储分区必须高性能SSD硬盘，没有SSD也要有高效独立磁盘</span></span>
<span class="line"><span style="color:#e1e4e8;">    i.	节点数：0-50    2核8G+   50G SSD存储</span></span>
<span class="line"><span style="color:#e1e4e8;">    ii.	节点数：50-250  4核16G+  150G SSD存储</span></span>
<span class="line"><span style="color:#e1e4e8;">    iii.	节点数：250-1000  8核32G+ 250G SSD存储</span></span>
<span class="line"><span style="color:#e1e4e8;">c)	Node节点：无特殊要求，主要是Docker数据分区、系统分区需要单独使用，不可以使用同一个磁盘，系统分区100G+、Docker数据分区200G+，有条件使用SSD硬盘，必须独立于系统盘</span></span>
<span class="line"><span style="color:#e1e4e8;">d)	其他：集群规模不大可以将etcd和master放置于同一个宿主机，</span></span>
<span class="line"><span style="color:#e1e4e8;">    也就是每个master节点部署k8s组件和etcd服务，但是etcd的数据目录一定要独立，并且使用SSD，</span></span>
<span class="line"><span style="color:#e1e4e8;">    两者部署在一起需要相对增加宿主机的资源，个人建议生产环境把master节点的资源一次性给够，</span></span>
<span class="line"><span style="color:#e1e4e8;">    此处的费用不应该节省，可以直接使用16核32G或者64G的机器，之后集群扩容就无需扩容master节点的资源，减少风险。</span></span>
<span class="line"><span style="color:#e1e4e8;">    其中master节点和etcd节点的系统分区100G即可。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">a)	Master节点：三个节点实现高可用（必须）</span></span>
<span class="line"><span style="color:#24292e;">    i.	节点数：0-100    8核16+</span></span>
<span class="line"><span style="color:#24292e;">    ii.	节点数：100-250  8核32G+</span></span>
<span class="line"><span style="color:#24292e;">    iii.	节点数：250-500  16核32G+</span></span>
<span class="line"><span style="color:#24292e;">b)	etcd节点：三个节点实现高可用（必须），有条件存储分区必须高性能SSD硬盘，没有SSD也要有高效独立磁盘</span></span>
<span class="line"><span style="color:#24292e;">    i.	节点数：0-50    2核8G+   50G SSD存储</span></span>
<span class="line"><span style="color:#24292e;">    ii.	节点数：50-250  4核16G+  150G SSD存储</span></span>
<span class="line"><span style="color:#24292e;">    iii.	节点数：250-1000  8核32G+ 250G SSD存储</span></span>
<span class="line"><span style="color:#24292e;">c)	Node节点：无特殊要求，主要是Docker数据分区、系统分区需要单独使用，不可以使用同一个磁盘，系统分区100G+、Docker数据分区200G+，有条件使用SSD硬盘，必须独立于系统盘</span></span>
<span class="line"><span style="color:#24292e;">d)	其他：集群规模不大可以将etcd和master放置于同一个宿主机，</span></span>
<span class="line"><span style="color:#24292e;">    也就是每个master节点部署k8s组件和etcd服务，但是etcd的数据目录一定要独立，并且使用SSD，</span></span>
<span class="line"><span style="color:#24292e;">    两者部署在一起需要相对增加宿主机的资源，个人建议生产环境把master节点的资源一次性给够，</span></span>
<span class="line"><span style="color:#24292e;">    此处的费用不应该节省，可以直接使用16核32G或者64G的机器，之后集群扩容就无需扩容master节点的资源，减少风险。</span></span>
<span class="line"><span style="color:#24292e;">    其中master节点和etcd节点的系统分区100G即可。</span></span></code></pre></div><h1 id="node节点建议" tabindex="-1">node节点建议 <a class="header-anchor" href="#node节点建议" aria-label="Permalink to &quot;node节点建议&quot;">​</a></h1><p>Node节点上主要部署公司的一些业务应用，生产环境中不建议Master节点部署系统组件之外的其他Pod，测试环境可以允许Master节点部署Pod以节省系统资源</p>`,6),t=[p];function c(o,i,r,d,y,G){return e(),a("div",null,t)}const _=s(l,[["render",c]]);export{S as __pageData,_ as default};
