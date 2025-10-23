import{_ as e,o as s,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"Kubernetes基础应用：创建一个Pod背后etcd发生了什么？","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/etcd/base/19-Kubernetes基础应用.md","filePath":"guide/Database/etcd/base/19-Kubernetes基础应用.md","lastUpdated":1703142476000}'),t={name:"guide/Database/etcd/base/19-Kubernetes基础应用.md"},p=a(`<h1 id="kubernetes基础应用-创建一个pod背后etcd发生了什么" tabindex="-1">Kubernetes基础应用：创建一个Pod背后etcd发生了什么？ <a class="header-anchor" href="#kubernetes基础应用-创建一个pod背后etcd发生了什么" aria-label="Permalink to &quot;Kubernetes基础应用：创建一个Pod背后etcd发生了什么？&quot;">​</a></h1><p>Kubernetes 是如何使用 etcd 的</p><h2 id="kubernetes-基础架构" tabindex="-1">Kubernetes 基础架构 <a class="header-anchor" href="#kubernetes-基础架构" aria-label="Permalink to &quot;Kubernetes 基础架构&quot;">​</a></h2><p>下图是 Kubernetes 集群的架构图（<a href="https://kubernetes.io/docs/concepts/overview/components/" target="_blank" rel="noreferrer">引用自 Kubernetes 官方文档</a>），从图中你可以看到，它由 Master 节点和 Node 节点组成</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211505735.jpg" alt=""></p><p>==控制面 Master 节点主要包含以下组件：==</p><ul><li>kube-apiserver，负责对外提供集群各类资源的增删改查及 Watch 接口，它是 Kubernetes 集群中各组件数据交互和通信的枢纽。kube-apiserver 在设计上可水平扩展，高可用 Kubernetes 集群中一般多副本部署。当收到一个创建 Pod 写请求时，它的基本流程是对请求进行认证、限速、授权、准入机制等检查后，写入到 etcd 即可</li><li>kube-scheduler 是调度器组件，负责集群 Pod 的调度。基本原理是通过监听 kube-apiserver 获取待调度的 Pod，然后基于一系列筛选和评优算法，为 Pod 分配最佳的 Node 节点</li><li>kube-controller-manager 包含一系列的控制器组件，比如 Deployment、StatefulSet 等控制器。控制器的核心思想是监听、比较资源实际状态与期望状态是否一致，若不一致则进行协调工作使其最终一致</li><li>etcd 组件，Kubernetes 的元数据存储</li></ul><p>==Node 节点主要包含以下组件==</p><ul><li>kubelet，部署在每个节点上的 Agent 的组件，负责 Pod 的创建运行。基本原理是通过监听 APIServer 获取分配到其节点上的 Pod，然后根据 Pod 的规格详情，调用运行时组件创建 pause 和业务容器等</li><li>kube-proxy，部署在每个节点上的网络代理组件。基本原理是通过监听 APIServer 获取 Service、Endpoint 等资源，基于 Iptables、IPVS 等技术实现数据包转发等功能</li></ul><p>从 Kubernetes 基础架构介绍中你可以看到，kube-apiserver 是唯一直接与 etcd 打交道的组件，各组件都通过 kube-apiserver 实现数据交互，它们极度依赖 kube-apiserver 提供的资源变化监听机制。而 kube-apiserver 对外提供的监听机制，也正是由我们基础篇08中介绍的 etcd Watch 特性提供的底层支持</p><h3 id="创建-pod-案例" tabindex="-1">创建 Pod 案例 <a class="header-anchor" href="#创建-pod-案例" aria-label="Permalink to &quot;创建 Pod 案例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim nginx.yml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">apiVersion: apps/v1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: Deployment</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: nginx-deployment</span></span>
<span class="line"><span style="color:#e1e4e8;">  labels:</span></span>
<span class="line"><span style="color:#e1e4e8;">    app: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  replicas: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">  selector:</span></span>
<span class="line"><span style="color:#e1e4e8;">    matchLabels:</span></span>
<span class="line"><span style="color:#e1e4e8;">      app: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">  template:</span></span>
<span class="line"><span style="color:#e1e4e8;">    metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">      labels:</span></span>
<span class="line"><span style="color:#e1e4e8;">        app: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">    spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">      containers:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - name: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">        image: nginx:1.14.2</span></span>
<span class="line"><span style="color:#e1e4e8;">        ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">        - containerPort: 80</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim nginx.yml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">apiVersion: apps/v1</span></span>
<span class="line"><span style="color:#24292e;">kind: Deployment</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  name: nginx-deployment</span></span>
<span class="line"><span style="color:#24292e;">  labels:</span></span>
<span class="line"><span style="color:#24292e;">    app: nginx</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  replicas: 1</span></span>
<span class="line"><span style="color:#24292e;">  selector:</span></span>
<span class="line"><span style="color:#24292e;">    matchLabels:</span></span>
<span class="line"><span style="color:#24292e;">      app: nginx</span></span>
<span class="line"><span style="color:#24292e;">  template:</span></span>
<span class="line"><span style="color:#24292e;">    metadata:</span></span>
<span class="line"><span style="color:#24292e;">      labels:</span></span>
<span class="line"><span style="color:#24292e;">        app: nginx</span></span>
<span class="line"><span style="color:#24292e;">    spec:</span></span>
<span class="line"><span style="color:#24292e;">      containers:</span></span>
<span class="line"><span style="color:#24292e;">      - name: nginx</span></span>
<span class="line"><span style="color:#24292e;">        image: nginx:1.14.2</span></span>
<span class="line"><span style="color:#24292e;">        ports:</span></span>
<span class="line"><span style="color:#24292e;">        - containerPort: 80</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">kubectl create -f nginx.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">kubectl create -f nginx.yml</span></span></code></pre></div><p>创建之后，我们立刻通过如下命令，带标签查询 Pod，输出如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ kubectl get po -l app=nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME                                READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx-deployment-756d9fd5f9-fkqnf   1/1     Running   0          8s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ kubectl get po -l app=nginx</span></span>
<span class="line"><span style="color:#24292e;">NAME                                READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#24292e;">nginx-deployment-756d9fd5f9-fkqnf   1/1     Running   0          8s</span></span></code></pre></div><p>那么在 kubectl create 命令发出，nginx Deployment 资源成功创建的背后，kube-apiserver 是如何与 etcd 打交道的呢？ 它是通过什么接口安全写入资源到 etcd 的？</p><p>同时，使用 kubectl 带标签查询 Pod 背后，kube-apiserver 是直接从缓存读取还是向 etcd 发出一个线性读或串行读请求呢？ 若同 namespace 下存在大量的 Pod，此操作性能又是怎样的呢?</p><p>接下来我就和你聊聊 kube-apiserver 收到创建和查询请求后，是如何与 etcd 交互的。</p><h3 id="kube-apiserver-请求执行链路" tabindex="-1">kube-apiserver 请求执行链路 <a class="header-anchor" href="#kube-apiserver-请求执行链路" aria-label="Permalink to &quot;kube-apiserver 请求执行链路&quot;">​</a></h3><p>kube-apiserver 作为 Kubernetes 集群交互的枢纽、对外提供 API 供用户访问的组件，因此保障集群安全、保障本身及后端 etcd 的稳定性的等重任也是非它莫属。比如校验创建请求发起者是否合法、是否有权限操作相关资源、是否出现 Bug 产生大量写和读请求等</p><p><a href="https://speakerdeck.com/sttts/kubernetes-api-codebase-tour?slide=18" target="_blank" rel="noreferrer">下图是 kube-apiserver 的请求执行链路</a>当收到一个请求后，它主要经过以下处理链路来完成以上若干职责后，才能与 etcd 交互</p><p>==核心链路如下：==</p><ul><li>认证模块，校验发起的请求的用户身份是否合法。支持多种方式，比如 x509 客户端证书认证、静态 token 认证、webhook 认证等</li><li>限速模块，对请求进行简单的限速，默认读 400/s 写 200/s，不支持根据请求类型进行分类、按优先级限速，存在较多问题。Kubernetes 1.19 后已新增 Priority and Fairness 特性取代它，它支持将请求重要程度分类进行限速，支持多租户，可有效保障 Leader 选举之类的高优先级请求得到及时响应，能防止一个异常 client 导致整个集群被限速</li><li>审计模块，可记录用户对资源的详细操作行为</li><li>授权模块，检查用户是否有权限对其访问的资源进行相关操作。支持多种方式，RBAC(Role-based access control)、ABAC(Attribute-based access control)、Webhhook 等。Kubernetes 1.12 版本后，默认授权机制使用的 RBAC</li><li>准入控制模块，提供在访问资源前拦截请求的静态和动态扩展能力，比如要求镜像的拉取策略始终为 AlwaysPullImages</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211505481.jpg" alt=""></p><p>经过上面一系列的模块检查后，这时 kube-apiserver 就开始与 etcd 打交道了。在了解 kube-apiserver 如何将我们创建的 Deployment 资源写入到 etcd 前，我先和你介绍下 Kubernetes 的资源是如何组织、存储在 etcd 中</p><h3 id="kubernetes-资源存储格式" tabindex="-1">Kubernetes 资源存储格式 <a class="header-anchor" href="#kubernetes-资源存储格式" aria-label="Permalink to &quot;Kubernetes 资源存储格式&quot;">​</a></h3><p>我们知道 etcd 仅仅是个 key-value 存储，但是在 Kubernetes 中存在各种各样的资源，并提供了以下几种灵活的资源查询方式</p><ul><li>按具体资源名称查询，比如 PodName、kubectl get po/PodName</li><li>按 namespace 查询，获取一个 namespace 下的所有 Pod，比如 kubectl get po -n kube-system</li><li>按标签名，标签是极度灵活的一种方式，你可以为你的 Kubernetes 资源打上各种各样的标签，比如上面案例中的 kubectl get po -l app=nginx</li></ul><p>你知道以上这几种查询方式它们的性能优劣吗？假设你是 Kubernetes 开发者，你会如何设计存储格式来满足以上功能点？</p><p>首先是按具体资源名称查询。它本质就是个 key-value 查询，只需要写入 etcd 的 key 名称与资源 key 一致即可</p><p>其次是按 namespace 查询。这种查询也并不难。因为我们知道 etcd 支持范围查询，若 key 名称前缀包含 namespace、资源类型，查询的时候指定 namespace 和资源类型的组合的最小开始区间、最大结束区间即可</p><p>最后是标签名查询。这种查询方式非常灵活，业务可随时添加、删除标签，各种标签可相互组合。实现标签查询的办法主要有以下两种：</p><ul><li>方案一，在 etcd 中存储标签数据，实现通过标签可快速定位（时间复杂度 O(1)）到具体资源名称。然而一个标签可能容易实现，但是在 Kubernetes 集群中，它支持按各个标签组合查询，各个标签组合后的数量相当庞大。在 etcd 中维护各种标签组合对应的资源列表，会显著增加 kube-apiserver 的实现复杂度，导致更频繁的 etcd 写入</li><li>方案二，在 etcd 中不存储标签数据，而是由 kube-apiserver 通过范围遍历 etcd 获取原始数据，然后基于用户指定标签，来筛选符合条件的资源返回给 client。此方案优点是实现简单，但是大量标签查询可能会导致 etcd 大流量等异常情况发生</li></ul><p>那么 Kubernetes 集群选择的是哪种实现方式呢?</p><p>下面是一个 Kubernetes 集群中的 coredns 一系列资源在 etcd 中的存储格式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/clusterrolebindings/system:coredns</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/clusterroles/system:coredns</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/configmaps/kube-system/coredns</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/deployments/kube-system/coredns</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/events/kube-system/coredns-7fcc6d65dc-6njlg.1662c287aabf742b</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/events/kube-system/coredns-7fcc6d65dc-6njlg.1662c288232143ae</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/pods/kube-system/coredns-7fcc6d65dc-jvj26</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/pods/kube-system/coredns-7fcc6d65dc-mgvtb</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/pods/kube-system/coredns-7fcc6d65dc-whzq9</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/replicasets/kube-system/coredns-7fcc6d65dc</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/secrets/kube-system/coredns-token-hpqbt</span></span>
<span class="line"><span style="color:#e1e4e8;">/registry/serviceaccounts/kube-system/coredns</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/registry/clusterrolebindings/system:coredns</span></span>
<span class="line"><span style="color:#24292e;">/registry/clusterroles/system:coredns</span></span>
<span class="line"><span style="color:#24292e;">/registry/configmaps/kube-system/coredns</span></span>
<span class="line"><span style="color:#24292e;">/registry/deployments/kube-system/coredns</span></span>
<span class="line"><span style="color:#24292e;">/registry/events/kube-system/coredns-7fcc6d65dc-6njlg.1662c287aabf742b</span></span>
<span class="line"><span style="color:#24292e;">/registry/events/kube-system/coredns-7fcc6d65dc-6njlg.1662c288232143ae</span></span>
<span class="line"><span style="color:#24292e;">/registry/pods/kube-system/coredns-7fcc6d65dc-jvj26</span></span>
<span class="line"><span style="color:#24292e;">/registry/pods/kube-system/coredns-7fcc6d65dc-mgvtb</span></span>
<span class="line"><span style="color:#24292e;">/registry/pods/kube-system/coredns-7fcc6d65dc-whzq9</span></span>
<span class="line"><span style="color:#24292e;">/registry/replicasets/kube-system/coredns-7fcc6d65dc</span></span>
<span class="line"><span style="color:#24292e;">/registry/secrets/kube-system/coredns-token-hpqbt</span></span>
<span class="line"><span style="color:#24292e;">/registry/serviceaccounts/kube-system/coredns</span></span></code></pre></div><p>从中你可以看到，一方面 Kubernetes 资源在 etcd 中的存储格式由 prefix + &quot;/&quot; + 资源类型 + &quot;/&quot; + namespace + &quot;/&quot; + 具体资源名组成，基于 etcd 提供的范围查询能力，非常简单地支持了按具体资源名称查询和 namespace 查询</p><p>kube-apiserver 提供了如下参数给你配置 etcd prefix，并支持将资源存储在多个 etcd 集群</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--etcd-prefix string     Default: &quot;/registry&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">The prefix to prepend to all resource paths in etcd.</span></span>
<span class="line"><span style="color:#e1e4e8;">--etcd-servers stringSlice</span></span>
<span class="line"><span style="color:#e1e4e8;">List of etcd servers to connect with (scheme://ip:port), comma separated.</span></span>
<span class="line"><span style="color:#e1e4e8;">--etcd-servers-overrides stringSlice</span></span>
<span class="line"><span style="color:#e1e4e8;">Per-resource etcd servers overrides, comma separated. The individual override format: group/resource#servers, where servers are URLs, </span></span>
<span class="line"><span style="color:#e1e4e8;">semicolon separated.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--etcd-prefix string     Default: &quot;/registry&quot;</span></span>
<span class="line"><span style="color:#24292e;">The prefix to prepend to all resource paths in etcd.</span></span>
<span class="line"><span style="color:#24292e;">--etcd-servers stringSlice</span></span>
<span class="line"><span style="color:#24292e;">List of etcd servers to connect with (scheme://ip:port), comma separated.</span></span>
<span class="line"><span style="color:#24292e;">--etcd-servers-overrides stringSlice</span></span>
<span class="line"><span style="color:#24292e;">Per-resource etcd servers overrides, comma separated. The individual override format: group/resource#servers, where servers are URLs, </span></span>
<span class="line"><span style="color:#24292e;">semicolon separated.</span></span></code></pre></div><p>另一方面，我们未看到任何标签相关的 key。Kubernetes 实现标签查询的方式显然是方案二，即由 kube-apiserver 通过范围遍历 etcd 获取原始数据，然后基于用户指定标签，来筛选符合条件的资源返回给 client（资源 key 的 value 中记录了资源 YAML 文件内容等，如标签）</p><p>也就是当你执行&quot;kubectl get po -l app=nginx&quot;命令，按标签查询 Pod 时，它会向 etcd 发起一个范围遍历整个 default namespace 下的 Pod 操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ kubectl get po -l app=nginx -v 8</span></span>
<span class="line"><span style="color:#e1e4e8;">I0301 23:45:25.597465   32411 loader.go:359] Config loaded from file /root/.kube/config</span></span>
<span class="line"><span style="color:#e1e4e8;">I0301 23:45:25.603182   32411 round_trippers.go:416] GET https://ip:port/api/v1/namespaces/default/pods?</span></span>
<span class="line"><span style="color:#e1e4e8;">labelSelector=app%3Dnginx&amp;limit=500</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ kubectl get po -l app=nginx -v 8</span></span>
<span class="line"><span style="color:#24292e;">I0301 23:45:25.597465   32411 loader.go:359] Config loaded from file /root/.kube/config</span></span>
<span class="line"><span style="color:#24292e;">I0301 23:45:25.603182   32411 round_trippers.go:416] GET https://ip:port/api/v1/namespaces/default/pods?</span></span>
<span class="line"><span style="color:#24292e;">labelSelector=app%3Dnginx&amp;limit=500</span></span></code></pre></div><p>etcd 收到的请求日志如下，由此可见当一个 namespace 存在大量 Pod 等资源时，若频繁通过 kubectl，使用标签查询 Pod 等资源，后端 etcd 将出现较大的压力</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ts&quot;:&quot;2021-03-01T23:45:25.609+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;start time&quot;:&quot;2021-03-01T23:45:25.608+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;time spent&quot;:&quot;1.414135ms&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;remote&quot;:&quot;127.0.0.1:44664&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Range&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request count&quot;:0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request size&quot;:61,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response count&quot;:11,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response size&quot;:81478,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request content&quot;:&quot;key:&quot;/registry/pods/default/&quot; range_end:&quot;/registry/pods/default0&quot; limit:500 &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;ts&quot;:&quot;2021-03-01T23:45:25.609+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;start time&quot;:&quot;2021-03-01T23:45:25.608+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;time spent&quot;:&quot;1.414135ms&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;remote&quot;:&quot;127.0.0.1:44664&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Range&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request count&quot;:0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request size&quot;:61,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response count&quot;:11,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response size&quot;:81478,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request content&quot;:&quot;key:&quot;/registry/pods/default/&quot; range_end:&quot;/registry/pods/default0&quot; limit:500 &quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>了解完 Kubernetes 资源的存储格式后，我们再看看 nginx Deployment 资源是如何由 kube-apiserver 写入 etcd 的</p><h3 id="通用存储模块" tabindex="-1">通用存储模块 <a class="header-anchor" href="#通用存储模块" aria-label="Permalink to &quot;通用存储模块&quot;">​</a></h3><p>kube-apiserver 启动的时候，会将每个资源的 APIGroup、Version、Resource Handler 注册到路由上。当请求经过认证、限速、授权、准入控制模块检查后，请求就会被转发到对应的资源逻辑进行处理</p><p>同时，kube-apiserver 实现了类似数据库 ORM 机制的通用资源存储机制，提供了对一个资源创建、更新、删除前后的 hook 能力，将其封装成策略接口。当你新增一个资源时，你只需要编写相应的创建、更新、删除等策略即可，不需要写任何 etcd 的 API。</p><p>下面是 kube-apiserver 通用存储模块的创建流程图：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211505660.jpg" alt=""></p><p>从图中你可以看到，创建一个资源主要由 BeforeCreate、Storage.Create 以及 AfterCreate 三大步骤组成</p><p>当收到创建 nginx Deployment 请求后，通用存储模块首先会回调各个资源自定义实现的 BeforeCreate 策略，为资源写入 etcd 做一些初始化工作</p><p>下面是 Deployment 资源的创建策略实现，它会进行将 deployment.Generation 设置为 1 等操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// PrepareForCreate clears fields that are not allowed to be set by end users on creation.</span></span>
<span class="line"><span style="color:#e1e4e8;">func (deploymentStrategy) PrepareForCreate(ctx context.Context, obj runtime.Object) {</span></span>
<span class="line"><span style="color:#e1e4e8;">   deployment := obj.(*apps.Deployment)</span></span>
<span class="line"><span style="color:#e1e4e8;">   deployment.Status = apps.DeploymentStatus{}</span></span>
<span class="line"><span style="color:#e1e4e8;">   deployment.Generation = 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   pod.DropDisabledTemplateFields(&amp;deployment.Spec.Template, nil)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// PrepareForCreate clears fields that are not allowed to be set by end users on creation.</span></span>
<span class="line"><span style="color:#24292e;">func (deploymentStrategy) PrepareForCreate(ctx context.Context, obj runtime.Object) {</span></span>
<span class="line"><span style="color:#24292e;">   deployment := obj.(*apps.Deployment)</span></span>
<span class="line"><span style="color:#24292e;">   deployment.Status = apps.DeploymentStatus{}</span></span>
<span class="line"><span style="color:#24292e;">   deployment.Generation = 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   pod.DropDisabledTemplateFields(&amp;deployment.Spec.Template, nil)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>执行完 BeforeCreate 策略后，它就会执行 Storage.Create 接口，也就是由它真正开始调用底层存储模块 etcd3，将 nginx Deployment 资源对象写入 etcd</p><p>那么 Kubernetes 是使用 etcd Put 接口写入资源 key-value 的吗？如果是，那要如何防止同名资源并发创建被覆盖的问题？</p><h3 id="资源安全创建及更新" tabindex="-1">资源安全创建及更新 <a class="header-anchor" href="#资源安全创建及更新" aria-label="Permalink to &quot;资源安全创建及更新&quot;">​</a></h3><p>们知道 etcd 提供了 Put 和 Txn 接口给业务添加 key-value 数据，但是 Put 接口在并发场景下若收到 key 相同的资源创建，就会导致被覆盖</p><p>因此 Kubernetes 很显然无法直接通过 etcd Put 接口来写入数据</p><p>而我们09节中介绍的 etcd 事务接口 Txn，它正是为了多 key 原子更新、并发操作安全性等而诞生的，它提供了丰富的冲突检查机制</p><p>Kubernetes 集群使用的正是事务 Txn 接口来防止并发创建、更新被覆盖等问题。当执行完 BeforeCreate 策略后，这时 kube-apiserver 就会调用 Storage 的模块的 Create 接口写入资源。1.6 版本后的 Kubernete 集群默认使用的存储是 etcd3，它的创建接口简要实现如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// Create implements storage.Interface.Create.</span></span>
<span class="line"><span style="color:#e1e4e8;">func (s *store) Create(ctx context.Context, key string, obj, out runtime.Object, ttl uint64) error {</span></span>
<span class="line"><span style="color:#e1e4e8;">   ......</span></span>
<span class="line"><span style="color:#e1e4e8;">   key = path.Join(s.pathPrefix, key)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   opts, err := s.ttlOpts(ctx, int64(ttl))</span></span>
<span class="line"><span style="color:#e1e4e8;">   if err != nil {</span></span>
<span class="line"><span style="color:#e1e4e8;">      return err</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   newData, err := s.transformer.TransformToStorage(data, authenticatedDataString(key))</span></span>
<span class="line"><span style="color:#e1e4e8;">   if err != nil {</span></span>
<span class="line"><span style="color:#e1e4e8;">      return storage.NewInternalError(err.Error())</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   startTime := time.Now()</span></span>
<span class="line"><span style="color:#e1e4e8;">   txnResp, err := s.client.KV.Txn(ctx).If(</span></span>
<span class="line"><span style="color:#e1e4e8;">      notFound(key),</span></span>
<span class="line"><span style="color:#e1e4e8;">   ).Then(</span></span>
<span class="line"><span style="color:#e1e4e8;">      clientv3.OpPut(key, string(newData), opts...),</span></span>
<span class="line"><span style="color:#e1e4e8;">   ).Commit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// Create implements storage.Interface.Create.</span></span>
<span class="line"><span style="color:#24292e;">func (s *store) Create(ctx context.Context, key string, obj, out runtime.Object, ttl uint64) error {</span></span>
<span class="line"><span style="color:#24292e;">   ......</span></span>
<span class="line"><span style="color:#24292e;">   key = path.Join(s.pathPrefix, key)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   opts, err := s.ttlOpts(ctx, int64(ttl))</span></span>
<span class="line"><span style="color:#24292e;">   if err != nil {</span></span>
<span class="line"><span style="color:#24292e;">      return err</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   newData, err := s.transformer.TransformToStorage(data, authenticatedDataString(key))</span></span>
<span class="line"><span style="color:#24292e;">   if err != nil {</span></span>
<span class="line"><span style="color:#24292e;">      return storage.NewInternalError(err.Error())</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   startTime := time.Now()</span></span>
<span class="line"><span style="color:#24292e;">   txnResp, err := s.client.KV.Txn(ctx).If(</span></span>
<span class="line"><span style="color:#24292e;">      notFound(key),</span></span>
<span class="line"><span style="color:#24292e;">   ).Then(</span></span>
<span class="line"><span style="color:#24292e;">      clientv3.OpPut(key, string(newData), opts...),</span></span>
<span class="line"><span style="color:#24292e;">   ).Commit</span></span></code></pre></div><p>从上面的代码片段中，我们可以得出首先它会按照我们介绍的 Kubernetes 资源存储格式拼接 key</p><p>然后若 TTL 非 0，它会根据 TTL 从 leaseManager 获取可复用的 Lease ID。Kubernetes 集群默认若不同 key（如 Kubernetes 的 Event 资源对象）的 TTL 差异在 1 分钟内，可复用同一个 Lease ID，避免大量 Lease 影响 etcd 性能和稳定性</p><p>其次若开启了数据加密，在写入 etcd 前数据还将按加密算法进行转换工作</p><p>最后就是使用 etcd 的 Txn 接口，向 etcd 发起一个创建 deployment 资源的 Txn 请求</p><p>那么 etcd 收到 kube-apiserver 的请求是长什么样子的呢？</p><p>下面是 etcd 收到创建 nginx deployment 资源的请求日志：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ts&quot;:&quot;2021-02-11T09:55:45.914+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;start time&quot;:&quot;2021-02-11T09:55:45.911+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;time spent&quot;:&quot;2.697925ms&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;remote&quot;:&quot;127.0.0.1:44822&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request size&quot;:479,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/deployments/default/nginx-deployment&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/deployments/default/nginx-deployment&quot; value_size:421 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;ts&quot;:&quot;2021-02-11T09:55:45.914+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;start time&quot;:&quot;2021-02-11T09:55:45.911+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;time spent&quot;:&quot;2.697925ms&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;remote&quot;:&quot;127.0.0.1:44822&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request size&quot;:479,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/deployments/default/nginx-deployment&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/deployments/default/nginx-deployment&quot; value_size:421 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>从这个请求日志中，你可以得到以下信息：</p><ul><li>请求的模块和接口，KV/Txn；</li><li>key 路径，/registry/deployments/default/nginx-deployment，由 prefix + &quot;/&quot; + 资源类型 + &quot;/&quot; + namespace + &quot;/&quot; + 具体资源名组成；</li><li>安全的并发创建检查机制，mod_revision 为 0 时，也就是此 key 不存在时，才允许执行 put 更新操作</li></ul><p>通过 Txn 接口成功将数据写入到 etcd 后，kubectl create -f nginx.yml 命令就执行完毕，返回给 client 了。在以上介绍中你可以看到，kube-apiserver 并没有任何逻辑去真正创建 Pod，但是为什么我们可以马上通过 kubectl get 命令查询到新建并成功运行的 Pod 呢？</p><p>这就涉及到了基础架构图中的控制器、调度器、Kubelet 等组件。下面我就为你浅析它们是如何基于 etcd 提供的 Watch 机制工作，最终实现创建 Pod、调度 Pod、运行 Pod 的</p><h3 id="watch-机制在-kubernetes-中应用" tabindex="-1">Watch 机制在 Kubernetes 中应用 <a class="header-anchor" href="#watch-机制在-kubernetes-中应用" aria-label="Permalink to &quot;Watch 机制在 Kubernetes 中应用&quot;">​</a></h3><p>正如我们基础架构中所介绍的，kube-controller-manager 组件中包含一系列 WorkLoad 的控制器。Deployment 资源就由其中的 Deployment 控制器来负责的，那么它又是如何感知到新建 Deployment 资源，最终驱动 ReplicaSet 控制器创建出 Pod 的呢？</p><p>获取数据变化的方案，主要有轮询和推送两种方案组成。轮询会产生大量 expensive request，并且存在高延时。而 etcd Watch 机制提供的流式推送能力，赋予了 kube-apiserver 对外提供数据监听能力</p><p>我们知道在 etcd 中版本号是个逻辑时钟，随着 client 对 etcd 的增、删、改操作而全局递增，它被广泛应用在 MVCC、事务、Watch 特性中</p><p>尤其是在 Watch 特性中，版本号是数据增量同步的核心。当 client 因网络等异常出现连接闪断后，它就可以通过版本号从 etcd server 中快速获取异常后的事件，无需全量同步</p><p>那么在 Kubernetes 集群中，它提供了什么概念来实现增量监听逻辑呢</p><p>答案是 Resource Version</p><h3 id="resource-version-与-etcd-版本号" tabindex="-1">Resource Version 与 etcd 版本号 <a class="header-anchor" href="#resource-version-与-etcd-版本号" aria-label="Permalink to &quot;Resource Version 与 etcd 版本号&quot;">​</a></h3><p>Resource Version 是 Kubernetes API 中非常重要的一个概念，顾名思义，它是一个 Kubernetes 资源的内部版本字符串，client 可通过它来判断资源是否发生了变化。同时，你可以在 Get、List、Watch 接口中，通过指定 Resource Version 值来满足你对数据一致性、高性能等诉求</p><p>那么 Resource Version 有哪些值呢？跟 etcd 版本号是什么关系？</p><p>下面我分别以 Get 和 Watch 接口中的 Resource Version 参数值为例，为你剖析它与 etcd 的关系</p><p>在 Get 请求查询案例中，ResourceVersion 主要有以下这三种取值：</p><p>第一种是未指定 ResourceVersion，默认空字符串。kube-apiserver 收到一个此类型的读请求后，它会向 etcd 发出共识读 / 线性读请求获取 etcd 集群最新的数据</p><p>第二种是设置 ResourceVersion=&quot;0&quot;，赋值字符串 0。kube-apiserver 收到此类请求时，它可能会返回任意资源版本号的数据，但是优先返回较新版本。一般情况下它直接从 kube-apiserver 缓存中获取数据返回给 client，有可能读到过期的数据，适用于对数据一致性要求不高的场景</p><p>第三种是设置 ResourceVersion 为一个非 0 的字符串。kube-apiserver 收到此类请求时，它会保证 Cache 中的最新 ResourceVersion 大于等于你传入的 ResourceVersion，然后从 Cache 中查找你请求的资源对象 key，返回数据给 client。基本原理是 kube-apiserver 为各个核心资源（如 Pod）维护了一个 Cache，通过 etcd 的 Watch 机制来实时更新 Cache。当你的 Get 请求中携带了非 0 的 ResourceVersion，它会等待缓存中最新 ResourceVersion 大于等于你 Get 请求中的 ResoureVersion，若满足条件则从 Cache 中查询数据，返回给 client。若不满足条件，它最多等待 3 秒，若超过 3 秒，Cache 中的最新 ResourceVersion 还小于 Get 请求中的 ResourceVersion，就会返回 ResourceVersionTooLarge 错误给 client</p><p>你要注意的是，若你使用的 Get 接口，那么 kube-apiserver 会取资源 key 的 ModRevision 字段填充 Kubernetes 资源的 ResourceVersion 字段（v1.meta/ObjectMeta.ResourceVersion）。若你使用的是 List 接口，kube-apiserver 会在查询时，使用 etcd 当前版本号填充 ListMeta.ResourceVersion 字段（v1.meta/ListMeta.ResourceVersion）</p><p>那么当我们执行 kubectl get po 查询案例时，它的 ResouceVersion 是什么取值呢? 查询的是 kube-apiserver 缓存还是 etcd 最新共识数据?</p><p>如下所示，你可以通过指定 kubectl 日志级别为 6，观察它向 kube-apiserver 发出的请求参数。从下面请求日志里你可以看到，默认是未指定 Resource Version，也就是会发出一个共识读 / 线性读请求给 etcd，获取 etcd 最新共识数据。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">kubectl get po -l app=nginx -v 6</span></span>
<span class="line"><span style="color:#e1e4e8;">4410 loader.go:359] Config loaded from file /root/.kube/config</span></span>
<span class="line"><span style="color:#e1e4e8;">4410 round_trippers.go:438] GET https://*.*.*.*:*/api/v1/namespaces/default/pods?labelSelector=app%3Dnginx&amp;limit=500 200 OK in 8 milliseconds</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">kubectl get po -l app=nginx -v 6</span></span>
<span class="line"><span style="color:#24292e;">4410 loader.go:359] Config loaded from file /root/.kube/config</span></span>
<span class="line"><span style="color:#24292e;">4410 round_trippers.go:438] GET https://*.*.*.*:*/api/v1/namespaces/default/pods?labelSelector=app%3Dnginx&amp;limit=500 200 OK in 8 milliseconds</span></span></code></pre></div><p>这里要提醒下你，在规模较大的集群中，尽量不要使用 kubectl 频繁查询资源。正如我们上面所分析的，它会直接查询 etcd 数据，可能会产生大量的 expensive request 请求，之前我就有见过业务这样用，然后导致了集群不稳定</p><p>介绍完查询案例后，我们再看看 Watch 案例中，它的不同取值含义是怎样的呢?</p><p>它同样含有查询案例中的三种取值，官方定义的含义分别如下：</p><ul><li>未指定 ResourceVersion，默认空字符串。一方面为了帮助 client 建立初始状态，它会将当前已存在的资源通过 Add 事件返回给 client。另一方面，它会从 etcd 当前版本号开始监听，后续新增写请求导致数据变化时可及时推送给 client</li><li>设置 ResourceVersion=&quot;0&quot;，赋值字符串 0。它同样会帮助 client 建立初始状态，但是它会从任意版本号开始监听（当前 kube-apiserver 的实现指定 ResourceVersion=0 和不指定行为一致，在获取初始状态后，都会从 cache 最新的 ResourceVersion 开始监听），这种场景可能会导致集群返回陈旧的数据</li><li>设置 ResourceVersion 为一个非 0 的字符串。从精确的版本号开始监听数据，它只会返回大于等于精确版本号的变更事件</li></ul><p>Kubernetes 的控制器组件就基于以上的 Watch 特性，在快速感知到新建 Deployment 资源后，进入一致性协调逻辑，创建 ReplicaSet 控制器，整体交互流程如下所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211505774.jpg" alt=""></p><p>Deployment 控制器创建 ReplicaSet 资源对象的日志如下所示</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ts&quot;:&quot;2021-02-11T09:55:45.923+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;start time&quot;:&quot;2021-02-11T09:55:45.917+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;time spent&quot;:&quot;5.922089ms&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;remote&quot;:&quot;127.0.0.1:44828&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request size&quot;:766,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/replicasets/default/nginx-deployment-756d9fd5f9&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/replicasets/default/nginx-deployment-756d9fd5f9&quot; value_size:697 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;ts&quot;:&quot;2021-02-11T09:55:45.923+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;start time&quot;:&quot;2021-02-11T09:55:45.917+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;time spent&quot;:&quot;5.922089ms&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;remote&quot;:&quot;127.0.0.1:44828&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request size&quot;:766,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/replicasets/default/nginx-deployment-756d9fd5f9&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/replicasets/default/nginx-deployment-756d9fd5f9&quot; value_size:697 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>真正创建 Pod 则是由 ReplicaSet 控制器负责，它同样基于 Watch 机制感知到新的 RS 资源创建后，发起请求创建 Pod，确保实际运行 Pod 数与期望一致。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ts&quot;:&quot;2021-02-11T09:55:46.023+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;start time&quot;:&quot;2021-02-11T09:55:46.019+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;time spent&quot;:&quot;3.519326ms&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;remote&quot;:&quot;127.0.0.1:44664&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request size&quot;:822,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/pods/default/nginx-deployment-756d9fd5f9-x6r6q&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/pods/default/nginx-deployment-756d9fd5f9-x6r6q&quot; value_size:754 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;ts&quot;:&quot;2021-02-11T09:55:46.023+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;start time&quot;:&quot;2021-02-11T09:55:46.019+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;time spent&quot;:&quot;3.519326ms&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;remote&quot;:&quot;127.0.0.1:44664&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request size&quot;:822,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/pods/default/nginx-deployment-756d9fd5f9-x6r6q&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/pods/default/nginx-deployment-756d9fd5f9-x6r6q&quot; value_size:754 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>在这过程中也产生了若干 Event，下面是 etcd 收到新增 Events 资源的请求，你可以看到 Event 事件 key 关联了 Lease，这个 Lease 正是由我上面所介绍的 leaseManager 所负责创建</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ts&quot;:&quot;2021-02-11T09:55:45.930+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;start time&quot;:&quot;2021-02-11T09:55:45.926+0800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;time spent&quot;:&quot;3.259966ms&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;remote&quot;:&quot;127.0.0.1:44632&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request size&quot;:449,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/events/default/nginx-deployment.16628eb9f79e0ab0&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/events/default/nginx-deployment.16628eb9f79e0ab0&quot; value_size:369 lease:5772338802590698925 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;level&quot;:&quot;debug&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;ts&quot;:&quot;2021-02-11T09:55:45.930+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;caller&quot;:&quot;v3rpc/interceptor.go:181&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;msg&quot;:&quot;request stats&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;start time&quot;:&quot;2021-02-11T09:55:45.926+0800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;time spent&quot;:&quot;3.259966ms&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;remote&quot;:&quot;127.0.0.1:44632&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response type&quot;:&quot;/etcdserverpb.KV/Txn&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request count&quot;:1,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request size&quot;:449,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response count&quot;:0,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;response size&quot;:44,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;request content&quot;:&quot;compare:&lt;target:MOD key:&quot;/registry/events/default/nginx-deployment.16628eb9f79e0ab0&quot; mod_revision:0 &gt; success:&lt;request_put:&lt;key:&quot;/registry/events/default/nginx-deployment.16628eb9f79e0ab0&quot; value_size:369 lease:5772338802590698925 &gt;&gt; failure:&lt;&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>Pod 创建出来后，这时 kube-scheduler 监听到待调度的 Pod，于是为其分配 Node，通过 kube-apiserver 的 Bind 接口，将调度后的节点 IP 绑定到 Pod 资源上。kubelet 通过同样的 Watch 机制感知到新建的 Pod 后，发起 Pod 创建流程即可</p>`,105),l=[p];function o(c,r,i,u,d,q){return s(),n("div",null,l)}const b=e(t,[["render",o]]);export{g as __pageData,b as default};
