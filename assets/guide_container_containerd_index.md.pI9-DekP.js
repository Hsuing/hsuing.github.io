import{_ as n,c as e,o,R as t}from"./chunks/framework.CIzs38F0.js";const m=JSON.parse('{"title":"1.Containerd 架构","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/containerd/index.md","filePath":"guide/container/containerd/index.md","lastUpdated":1713620605000}'),i={name:"guide/container/containerd/index.md"},a=t('<h1 id="_1-containerd-架构" tabindex="-1">1.Containerd 架构 <a class="header-anchor" href="#_1-containerd-架构" aria-label="Permalink to &quot;1.Containerd 架构&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310251750073.png" alt=""></p><p>可以看到 Containerd 仍然采用标准的 C/S 架构，服务端通过 <code>GRPC</code> 协议提供稳定的 API，客户端通过调用服务端的 API 进行高级的操作。</p><p>为了解耦，Containerd 将不同的职责划分给不同的组件，每个组件就相当于一个<strong>子系统</strong>（subsystem）。连接不同子系统的组件被称为模块。</p><p>总体上 Containerd 被划分为两个子系统：</p><ul><li><strong>Bundle</strong> : 在 Containerd 中，<code>Bundle</code> 包含了配置、元数据和根文件系统数据，你可以理解为容器的文件系统。而 <strong>Bundle 子系统</strong>允许用户从镜像中提取和打包 Bundles。</li><li><strong>Runtime</strong> : Runtime 子系统用来执行 Bundles，比如创建容器。</li></ul><p>其中，每一个子系统的行为都由一个或多个<strong>模块</strong>协作完成（架构图中的 <code>Core</code> 部分）。每一种类型的模块都以<strong>插件</strong>的形式集成到 Containerd 中，而且插件之间是相互依赖的。例如，上图中的每一个长虚线的方框都表示一种类型的插件，包括 <code>Service Plugin</code>、<code>Metadata Plugin</code>、<code>GC Plugin</code>、<code>Runtime Plugin</code> 等，其中 <code>Service Plugin</code> 又会依赖 Metadata Plugin、GC Plugin 和 Runtime Plugin。每一个小方框都表示一个细分的插件，例如 <code>Metadata Plugin</code> 依赖 Containers Plugin、Content Plugin 等。 总之，万物皆插件，插件就是模块，模块就是插件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310251751665.png" alt=""></p><p>这里介绍几个常用的插件：</p><ul><li><strong>Content Plugin</strong> : 提供对镜像中可寻址内容的访问，所有不可变的内容都被存储在这里。</li><li><strong>Snapshot Plugin</strong> : 用来管理容器镜像的文件系统快照。镜像中的每一个 layer 都会被解压成文件系统快照，类似于 Docker 中的 <code>graphdriver</code>。</li><li><strong>Metrics</strong> : 暴露各个组件的监控指标。</li></ul><p>从总体来看，Containerd 被分为三个大块：<code>Storage</code>、<code>Metadata</code> 和 <code>Runtime</code>，可以将上面的架构图提炼一下</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202310251752717.png" alt=""></p>',12),d=[a];function r(c,s,l,g,u,p){return o(),e("div",null,d)}const h=n(i,[["render",r]]);export{m as __pageData,h as default};
