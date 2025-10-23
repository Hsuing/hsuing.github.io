import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"集群部署","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/etcd/base/24-运维.md","filePath":"guide/Database/etcd/base/24-运维.md","lastUpdated":1710380735000}'),p={name:"guide/Database/etcd/base/24-运维.md"},l=n(`<p>在使用 etcd 过程中，我们经常会面临着一系列问题与选择，比如：etcd 是使用虚拟机还是容器部署，各有什么优缺点？如何及时发现 etcd 集群隐患项（比如数据不一致）？如何及时监控及告警 etcd 的潜在隐患（比如 db 大小即将达到配额）？如何优雅的定时、甚至跨城备份 etcd 数据？如何模拟磁盘 IO 等异常来复现 Bug、故障？今天，我就和你聊聊如何解决以上问题。我将通过从 etcd 集群部署、集群组建、监控体系、巡检、备份及还原、高可用、混沌工程等维度，带你了解如何构建一个高可靠的 etcd 集群运维体系</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211506468.jpg" alt=""></p><h1 id="集群部署" tabindex="-1">集群部署 <a class="header-anchor" href="#集群部署" aria-label="Permalink to &quot;集群部署&quot;">​</a></h1><p>要想使用 etcd 集群，我们面对的第一个问题是如何选择合适的方案去部署 etcd 集群。首先是计算资源的选择，它本质上就是计算资源的交付演进史，分别如下：</p><p>物理机；虚拟机；裸容器（如 Docker 实例）；Kubernetes 容器编排。</p><p>物理机资源交付慢、成本高、扩缩容流程费时，一般情况下大部分业务团队不再考虑物理机，除非是超大规模的上万个节点的 Kubernetes 集群，对 CPU、内存、网络资源有着极高诉求</p><p>虚拟机是目前各个云厂商售卖的主流实例，无论是基于 KVM 还是 Xen 实现，都具有良好的稳定性、隔离性，支持故障热迁移，可弹性伸缩，被 etcd、数据库等存储业务大量使用</p><p>在基于物理机和虚拟机的部署方案中，我推荐你使用 ansible、puppet 等自动运维工具，构建标准、自动化的 etcd 集群搭建、扩缩容流程。基于 ansible 部署 etcd 集群可以拆分成以下若干个任务:</p><p>下载及安装 etcd 二进制到指定目录；将 etcd 加入 systemd 等服务管理；为 etcd 增加配置文件，合理设置相关参数；为 etcd 集群各个节点生成相关证书，构建一个安全的集群；组建集群版（静态配置、动态配置，发现集群其他节点）；开启 etcd 服务，启动 etcd 集群。</p><p>ansible 去部署一个安全的 <a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-and-secure-an-etcd-cluster-with-ansible-on-ubuntu-18-04" target="_blank" rel="noreferrer">etcd 集群</a></p><p>容器化部署则具有极速的交付效率、更灵活的资源控制、更低的虚拟化开销等一系列优点。自从 Docker 诞生后，容器化部署就风靡全球。有的业务直接使用裸 Docker 容器来跑 etcd 集群。然而裸 Docker 容器不具备调度、故障自愈、弹性扩容等特性，存在较大局限性</p><p>随后为了解决以上问题，诞生了以 Kubernetes、Swarm 为首的容器编排平台，Kubernetes 成为了容器编排之战中的王者，大量业务使用 Kubernetes 来部署 etcd、ZooKeeper 等有状态服务。在开源社区中，也诞生了若干个 etcd 的 Kubernetes 容器化解决方案，分别如下：</p><p>etcd-operator；bitnami etcd/statefulset；etcd-cluster-operator；openshit/cluster-etcd-operator；kubeadm</p><p><a href="https://github.com/coreos/etcd-operator" target="_blank" rel="noreferrer">etcd-operator</a>,目前已处于 Archived 状态，无人维护，基本废弃。同时它是基于裸 Pod 实现的，要做好各种备份。在部分异常情况下存在集群宕机、数据丢失风险，==我仅建议你使用它的数据备份 etcd-backup-operator==</p><p><a href="https://bitnami.com/stack/etcd/helm" target="_blank" rel="noreferrer">bitnami etcd</a>,提供了一个 helm 包一键部署 etcd 集群，支持各个云厂商，支持使用 PV、PVC 持久化存储数据，底层基于 StatefulSet 实现，较稳定。目前不少开源项目使用的是它</p><p>你可以通过如下 helm 命令，快速在 Kubernete 集群中部署一个 etcd 集群。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">helm repo add bitnami https://charts.bitnami.com/bitnami</span></span>
<span class="line"><span style="color:#e1e4e8;">helm install my-release bitnami/etcd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">helm repo add bitnami https://charts.bitnami.com/bitnami</span></span>
<span class="line"><span style="color:#24292e;">helm install my-release bitnami/etcd</span></span></code></pre></div><p><a href="https://github.com/improbable-eng/etcd-cluster-operator" target="_blank" rel="noreferrer">etcd-cluster-operator</a>和 openshit/<a href="https://github.com/openshift/cluster-etcd-operator" target="_blank" rel="noreferrer">cluster-etcd-operator</a>比较小众，目前 star 不多，但是有相应的开发者维护，你可参考下它们的实现思路，与 etcd-operator 基于 Pod、bitnami etcd 基于 Statefulset 实现不一样的是，它们是基于 ReplicaSet 和 Static Pod 实现的</p><h2 id="集群组建" tabindex="-1">集群组建 <a class="header-anchor" href="#集群组建" aria-label="Permalink to &quot;集群组建&quot;">​</a></h2><p>和你聊完 etcd 集群部署的几种模式和基本原理后，我们接下来看看在实际部署过程中最棘手的部分，那就是集群组建。因为集群组建涉及到 etcd 成员管理的原理和节点发现机制。</p><p>在 etcd 中，无论是 Leader 选举还是日志同步，都涉及到与其他节点通信。因此组建集群的第一步得知道集群总成员数、各个成员节点的 IP 地址等信息。</p><p>这个过程就是发现（Discovery）。目前 etcd 主要通过两种方式来获取以上信息，分别是 static configuration 和 dynamic service discovery。</p><p>static configuration 是指集群总成员节点数、成员节点的 IP 地址都是已知、固定的，根据我们上面介绍的 initial-cluster-state 原理，有如下两个方法可基于静态配置组建一个集群。</p><ul><li>方法 1，三个节点的 initial-cluster-state 都配置为 new，静态启动，initial-cluster 参数包含三个节点信息即可，详情你可<a href="https://etcd.io/docs/v3.4/op-guide/clustering/" target="_blank" rel="noreferrer">参考</a></li><li>方法 2，第一个节点 initial-cluster-state 设置为 new，独立成集群，随后第二和第三个节点都为 existing，通过扩容的方式，不断加入到第一个节点所组成的集群中</li></ul><p>如果成员节点信息是未知的，你可以通过 dynamic service discovery 机制解决</p><p>etcd 社区还提供了通过公共服务来发现成员节点信息，组建集群的方案。它的核心是集群内的各个成员节点向公共服务注册成员地址等信息，各个节点通过公共服务来发现彼此，你可以参考<a href="https://etcd.io/docs/v3.4/dev-internal/discovery_protocol/" target="_blank" rel="noreferrer">官方</a></p><h2 id="监控及告警体系" tabindex="-1">监控及告警体系 <a class="header-anchor" href="#监控及告警体系" aria-label="Permalink to &quot;监控及告警体系&quot;">​</a></h2><p>当我们把集群部署起来后，在业务开始使用之前，部署监控是必不可少的一个环节，它是我们保障业务稳定性，提前发现风险、隐患点的重要核心手段。那么要如何快速监控你的 etcd 集群呢？</p><p>正如我在14和15里和你介绍延时、内存时所提及的，etcd 提供了丰富的 metrics 来展示整个集群的核心指标、健康度。metrics 按模块可划分为磁盘、网络、MVCC 事务、gRPC RPC、etcdserver。</p><p>磁盘相关的 metrics 及含义如下图所示。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211506103.jpg" alt=""></p><p>网络相关的 metrics 及含义如下图所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202403131734751.jpg" alt="yun3"></p><p>mvcc 相关的较多，我在下图中列举了部分其含义，如下所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211506360.jpg" alt=""></p><p>etcdserver 相关的如下，集群是否有 leader、堆积的 proposal 数等都在此模块。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211507522.jpg" alt=""></p><p>更多 metrics，你可以通过如下方法查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">curl 127.0.0.1:2379/metrics</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">curl 127.0.0.1:2379/metrics</span></span></code></pre></div><p>了解常见的 metrics 后，我们只需要配置 Prometheus 服务，采集 etcd 集群的 2379 端口的 metrics 路径。</p><p>采集的方案一般有两种，<a href="https://etcd.io/docs/v3.4/op-guide/monitoring/" target="_blank" rel="noreferrer">静态配置</a>和动态配置。</p><p>静态配置是指添加待监控的 etcd target 到 Prometheus 配置文件，如下所示</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">global:</span></span>
<span class="line"><span style="color:#e1e4e8;">  scrape_interval: 10s</span></span>
<span class="line"><span style="color:#e1e4e8;">scrape_configs:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - job_name: test-etcd</span></span>
<span class="line"><span style="color:#e1e4e8;">    static_configs:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - targets:</span></span>
<span class="line"><span style="color:#e1e4e8;"> [&#39;10.240.0.32:2379&#39;,&#39;10.240.0.33:2379&#39;,&#39;10.240.0.34:2379&#39;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">global:</span></span>
<span class="line"><span style="color:#24292e;">  scrape_interval: 10s</span></span>
<span class="line"><span style="color:#24292e;">scrape_configs:</span></span>
<span class="line"><span style="color:#24292e;">  - job_name: test-etcd</span></span>
<span class="line"><span style="color:#24292e;">    static_configs:</span></span>
<span class="line"><span style="color:#24292e;">    - targets:</span></span>
<span class="line"><span style="color:#24292e;"> [&#39;10.240.0.32:2379&#39;,&#39;10.240.0.33:2379&#39;,&#39;10.240.0.34:2379&#39;]</span></span></code></pre></div><p>静态配置的缺点是每次新增集群、成员变更都需要人工修改配置，而动态配置就可解决这个痛点</p><p>动态配置是通过 Prometheus-Operator 的提供 ServiceMonitor 机制实现的，当你想采集一个 etcd 实例时，若 etcd 服务部署在同一个 Kubernetes 集群，你只需要通过 Kubernetes 的 API 创建一个如下的 ServiceMonitor 资源即可。若 etcd 集群与 Promehteus-Operator 不在同一个集群，你需要去创建、更新对应的集群 Endpoint</p><p>那 Prometheus 是如何知道该采集哪些服务的 metrics 信息呢?</p><p>答案 ServiceMonitor 资源通过 Namespace、Labels 描述了待采集实例对应的 Service Endpoint</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">apiVersion: monitoring.coreos.com/v1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: ServiceMonitor</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: prometheus-prometheus-oper-kube-etcd</span></span>
<span class="line"><span style="color:#e1e4e8;">  namespace: monitoring</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  endpoints:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - bearerTokenFile: /var/run/secrets/kubernetes.io/serviceaccount/token</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: http-metrics</span></span>
<span class="line"><span style="color:#e1e4e8;">    scheme: https</span></span>
<span class="line"><span style="color:#e1e4e8;">    tlsConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">      caFile: /etc/prometheus/secrets/etcd-certs/ca.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">      certFile: /etc/prometheus/secrets/etcd-certs/client.crt</span></span>
<span class="line"><span style="color:#e1e4e8;">      insecureSkipVerify: true</span></span>
<span class="line"><span style="color:#e1e4e8;">      keyFile: /etc/prometheus/secrets/etcd-certs/client.key</span></span>
<span class="line"><span style="color:#e1e4e8;">  jobLabel: jobLabel</span></span>
<span class="line"><span style="color:#e1e4e8;">  namespaceSelector:</span></span>
<span class="line"><span style="color:#e1e4e8;">    matchNames:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - kube-system</span></span>
<span class="line"><span style="color:#e1e4e8;">  selector:</span></span>
<span class="line"><span style="color:#e1e4e8;">    matchLabels:</span></span>
<span class="line"><span style="color:#e1e4e8;">      app: prometheus-operator-kube-etcd</span></span>
<span class="line"><span style="color:#e1e4e8;">      release: prometheus</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">apiVersion: monitoring.coreos.com/v1</span></span>
<span class="line"><span style="color:#24292e;">kind: ServiceMonitor</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  name: prometheus-prometheus-oper-kube-etcd</span></span>
<span class="line"><span style="color:#24292e;">  namespace: monitoring</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  endpoints:</span></span>
<span class="line"><span style="color:#24292e;">  - bearerTokenFile: /var/run/secrets/kubernetes.io/serviceaccount/token</span></span>
<span class="line"><span style="color:#24292e;">    port: http-metrics</span></span>
<span class="line"><span style="color:#24292e;">    scheme: https</span></span>
<span class="line"><span style="color:#24292e;">    tlsConfig:</span></span>
<span class="line"><span style="color:#24292e;">      caFile: /etc/prometheus/secrets/etcd-certs/ca.crt</span></span>
<span class="line"><span style="color:#24292e;">      certFile: /etc/prometheus/secrets/etcd-certs/client.crt</span></span>
<span class="line"><span style="color:#24292e;">      insecureSkipVerify: true</span></span>
<span class="line"><span style="color:#24292e;">      keyFile: /etc/prometheus/secrets/etcd-certs/client.key</span></span>
<span class="line"><span style="color:#24292e;">  jobLabel: jobLabel</span></span>
<span class="line"><span style="color:#24292e;">  namespaceSelector:</span></span>
<span class="line"><span style="color:#24292e;">    matchNames:</span></span>
<span class="line"><span style="color:#24292e;">    - kube-system</span></span>
<span class="line"><span style="color:#24292e;">  selector:</span></span>
<span class="line"><span style="color:#24292e;">    matchLabels:</span></span>
<span class="line"><span style="color:#24292e;">      app: prometheus-operator-kube-etcd</span></span>
<span class="line"><span style="color:#24292e;">      release: prometheus</span></span></code></pre></div><p>采集了 metrics 监控数据后，下一步就是要基于 metrics 监控数据告警了。你可以通过 Prometheus 和<a href="https://github.com/prometheus/alertmanager" target="_blank" rel="noreferrer">Alertmanager</a></p><p>组件实现</p><p>当然是影响集群可用性的最核心的 metric。比如是否有 Leader、Leader 切换次数、WAL 和事务操作延时。etcd 社区提供了一个<a href="https://github.com/etcd-io/etcd/blob/v3.4.9/Documentation/op-guide/etcd3_alert.rules" target="_blank" rel="noreferrer">丰富的告警规则</a></p><p>最后，为了方便你查看 etcd 集群运行状况和提升定位问题的效率，你可以基于采集的 metrics 配置个</p><p><a href="https://github.com/etcd-io/etcd/blob/v3.4.9/Documentation/op-guide/grafana.json" target="_blank" rel="noreferrer">grafana 可视化面板</a></p><h2 id="备份及还原" tabindex="-1">备份及还原 <a class="header-anchor" href="#备份及还原" aria-label="Permalink to &quot;备份及还原&quot;">​</a></h2><p>主要有以下方法，首先是通过 etcdctl snapshot 命令行人工备份。在发起重要变更的时候，你可以通过如下命令进行备份，并查看快照状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ETCDCTL_API=3 etcdctl --endpoints $ENDPOINT </span></span>
<span class="line"><span style="color:#e1e4e8;">snapshot save snapshotdb</span></span>
<span class="line"><span style="color:#e1e4e8;">ETCDCTL_API=3 etcdctl --write-out=table snapshot status snapshotdb</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ETCDCTL_API=3 etcdctl --endpoints $ENDPOINT </span></span>
<span class="line"><span style="color:#24292e;">snapshot save snapshotdb</span></span>
<span class="line"><span style="color:#24292e;">ETCDCTL_API=3 etcdctl --write-out=table snapshot status snapshotdb</span></span></code></pre></div><p>其次是通过定时任务进行定时备份，建议至少每隔 1 个小时备份一次。</p><p>然后是通过<a href="https://github.com/coreos/etcd-operator/blob/master/doc/user/walkthrough/backup-operator.md#:~:text=etcd%20backup%20operator%20backs%20up,storage%20such%20as%20AWS%20S3." target="_blank" rel="noreferrer">etcd-backup-operator</a>进行自动化的备份，类似 ServiceMonitor，你可以通过创建一个备份任务 CRD 实现。CRD 如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">apiVersion: &quot;etcd.database.coreos.com/v1beta2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: &quot;EtcdBackup&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: example-etcd-cluster-periodic-backup</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  etcdEndpoints: [&lt;etcd-cluster-endpoints&gt;]</span></span>
<span class="line"><span style="color:#e1e4e8;">  storageType: S3</span></span>
<span class="line"><span style="color:#e1e4e8;">  backupPolicy:</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 0 &gt; enable periodic backup</span></span>
<span class="line"><span style="color:#e1e4e8;">    backupIntervalInSecond: 125</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxBackups: 4</span></span>
<span class="line"><span style="color:#e1e4e8;">  s3:</span></span>
<span class="line"><span style="color:#e1e4e8;">    # The format of &quot;path&quot; must be: &quot;&lt;s3-bucket-name&gt;/&lt;path-to-backup-file&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # e.g: &quot;mybucket/etcd.backup&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    path: &lt;full-s3-path&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    awsSecret: &lt;aws-secret&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">apiVersion: &quot;etcd.database.coreos.com/v1beta2&quot;</span></span>
<span class="line"><span style="color:#24292e;">kind: &quot;EtcdBackup&quot;</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  name: example-etcd-cluster-periodic-backup</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  etcdEndpoints: [&lt;etcd-cluster-endpoints&gt;]</span></span>
<span class="line"><span style="color:#24292e;">  storageType: S3</span></span>
<span class="line"><span style="color:#24292e;">  backupPolicy:</span></span>
<span class="line"><span style="color:#24292e;">    # 0 &gt; enable periodic backup</span></span>
<span class="line"><span style="color:#24292e;">    backupIntervalInSecond: 125</span></span>
<span class="line"><span style="color:#24292e;">    maxBackups: 4</span></span>
<span class="line"><span style="color:#24292e;">  s3:</span></span>
<span class="line"><span style="color:#24292e;">    # The format of &quot;path&quot; must be: &quot;&lt;s3-bucket-name&gt;/&lt;path-to-backup-file&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    # e.g: &quot;mybucket/etcd.backup&quot;</span></span>
<span class="line"><span style="color:#24292e;">    path: &lt;full-s3-path&gt;</span></span>
<span class="line"><span style="color:#24292e;">    awsSecret: &lt;aws-secret&gt;</span></span></code></pre></div><p>最后你可以通过给 etcd 集群增加 Learner 节点，实现跨地域热备。因 Learner 节点属于非投票成员的节点，因此它并不会影响你集群的性能。它的基本工作原理是当 Leader 收到写请求时，它会通过 Raft 模块将日志同步给 Learner 节点。你需要注意的是，在 etcd 3.4 中目前只支持 1 个 Learner 节点，并且只允许串行读</p><h2 id="巡检" tabindex="-1">巡检 <a class="header-anchor" href="#巡检" aria-label="Permalink to &quot;巡检&quot;">​</a></h2><p>完成集群部署、了解成员管理、构建好监控及告警体系并添加好定时备份策略后，这时终于可以放心给业务使用了。然而在后续业务使用过程中，你可能会遇到各类问题，而这些问题很可能是 metrics 监控无法发现的，比如如下：</p><ul><li>etcd 集群因重启进程、节点等出现数据不一致；</li><li>业务写入大 key-value 导致 etcd 性能骤降；</li><li>业务异常写入大量 key 数，稳定性存在隐患；</li><li>业务少数 key 出现写入 QPS 异常，导致 etcd 集群出现限速等错误；</li><li>重启、升级 etcd 后，需要人工从多维度检查集群健康度；</li><li>变更 etcd 集群过程中，操作失误可能会导致 etcd 集群出现分裂；</li></ul><p>因此为了实现高效治理 etcd 集群，我们可将这些潜在隐患总结成一个个自动化检查项，比如</p><ul><li>如何高效监控 etcd 数据不一致性？</li><li>如何及时发现大 key-value?</li><li>如何及时通过监控发现 key 数异常增长？</li><li>如何及时监控异常写入 QPS?</li><li>如何从多维度的对集群进行自动化的健康检测，更安心变更？</li></ul><p>如何将这些 etcd 的最佳实践策略反哺到现网大规模 etcd 集群的治理中去呢？</p><p>答案就是巡检</p><p>参考 ServiceMonitor 和 EtcdBackup 机制，你同样可以通过 CRD 的方式描述此巡检任务，然后通过相应的 Operator 实现此巡检任务。比如下面就是一个数据一致性巡检的 YAML 文件，其对应的 Operator 组件会定时、并发检查其关联的 etcd 集群各个节点的 key 差异数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">apiVersion: etcd.cloud.tencent.com/v1beta1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: EtcdMonitor</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:  </span></span>
<span class="line"><span style="color:#e1e4e8;">creationTimestamp: &quot;2020-06-15T12:19:30Z&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">generation: 1  </span></span>
<span class="line"><span style="color:#e1e4e8;">labels:    </span></span>
<span class="line"><span style="color:#e1e4e8;">clusterName: gz-qcloud-etcd-03    </span></span>
<span class="line"><span style="color:#e1e4e8;">region: gz    </span></span>
<span class="line"><span style="color:#e1e4e8;">source: etcd-life-cycle-operator  </span></span>
<span class="line"><span style="color:#e1e4e8;">name: gz-qcloud-etcd-03-etcd-node-key-diff  </span></span>
<span class="line"><span style="color:#e1e4e8;">namespace: gz</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:  </span></span>
<span class="line"><span style="color:#e1e4e8;">clusterId: gz-qcloud-etcd-03  </span></span>
<span class="line"><span style="color:#e1e4e8;">metricName: etcd-node-key-diff  </span></span>
<span class="line"><span style="color:#e1e4e8;">metricProviderName: cruiser  </span></span>
<span class="line"><span style="color:#e1e4e8;">name: gz-qcloud-etcd-03  </span></span>
<span class="line"><span style="color:#e1e4e8;">productName: tke  </span></span>
<span class="line"><span style="color:#e1e4e8;">region: gz</span></span>
<span class="line"><span style="color:#e1e4e8;">status:  </span></span>
<span class="line"><span style="color:#e1e4e8;">records:  </span></span>
<span class="line"><span style="color:#e1e4e8;">- endTime: &quot;2021-02-25T11:22:26Z&quot;    </span></span>
<span class="line"><span style="color:#e1e4e8;">message: collectEtcdNodeKeyDiff,etcd cluster gz-qcloud-etcd-03,total key num is      </span></span>
<span class="line"><span style="color:#e1e4e8;">122143,nodeKeyDiff is 0     </span></span>
<span class="line"><span style="color:#e1e4e8;">startTime: &quot;2021-02-25T12:39:28Z&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">updatedAt: &quot;2021-02-25T12:39:28Z&quot;</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">apiVersion: etcd.cloud.tencent.com/v1beta1</span></span>
<span class="line"><span style="color:#24292e;">kind: EtcdMonitor</span></span>
<span class="line"><span style="color:#24292e;">metadata:  </span></span>
<span class="line"><span style="color:#24292e;">creationTimestamp: &quot;2020-06-15T12:19:30Z&quot;  </span></span>
<span class="line"><span style="color:#24292e;">generation: 1  </span></span>
<span class="line"><span style="color:#24292e;">labels:    </span></span>
<span class="line"><span style="color:#24292e;">clusterName: gz-qcloud-etcd-03    </span></span>
<span class="line"><span style="color:#24292e;">region: gz    </span></span>
<span class="line"><span style="color:#24292e;">source: etcd-life-cycle-operator  </span></span>
<span class="line"><span style="color:#24292e;">name: gz-qcloud-etcd-03-etcd-node-key-diff  </span></span>
<span class="line"><span style="color:#24292e;">namespace: gz</span></span>
<span class="line"><span style="color:#24292e;">spec:  </span></span>
<span class="line"><span style="color:#24292e;">clusterId: gz-qcloud-etcd-03  </span></span>
<span class="line"><span style="color:#24292e;">metricName: etcd-node-key-diff  </span></span>
<span class="line"><span style="color:#24292e;">metricProviderName: cruiser  </span></span>
<span class="line"><span style="color:#24292e;">name: gz-qcloud-etcd-03  </span></span>
<span class="line"><span style="color:#24292e;">productName: tke  </span></span>
<span class="line"><span style="color:#24292e;">region: gz</span></span>
<span class="line"><span style="color:#24292e;">status:  </span></span>
<span class="line"><span style="color:#24292e;">records:  </span></span>
<span class="line"><span style="color:#24292e;">- endTime: &quot;2021-02-25T11:22:26Z&quot;    </span></span>
<span class="line"><span style="color:#24292e;">message: collectEtcdNodeKeyDiff,etcd cluster gz-qcloud-etcd-03,total key num is      </span></span>
<span class="line"><span style="color:#24292e;">122143,nodeKeyDiff is 0     </span></span>
<span class="line"><span style="color:#24292e;">startTime: &quot;2021-02-25T12:39:28Z&quot;  </span></span>
<span class="line"><span style="color:#24292e;">updatedAt: &quot;2021-02-25T12:39:28Z&quot;</span></span></code></pre></div><h2 id="高可用及自愈" tabindex="-1">高可用及自愈 <a class="header-anchor" href="#高可用及自愈" aria-label="Permalink to &quot;高可用及自愈&quot;">​</a></h2><p>通过以上机制，我们已经基本建设好一个高可用的 etcd 集群运维体系了。最后再给你提供几个集群高可用及自愈的小建议：</p><ul><li>若 etcd 集群性能已满足业务诉求，可容忍一定的延时上升，建议你将 etcd 集群做高可用部署，比如对 3 个节点来说，把每个节点部署在独立的可用区，可容忍任意一个可用区故障。</li><li>逐步尝试使用 Kubernetes 容器化部署 etcd 集群。当节点出现故障时，能通过 Kubernetes 的自愈机制，实现故障自愈</li><li>设置合理的 db quota 值，配置合理的压缩策略，避免集群 db quota 满从而导致集群不可用的情况发生。</li></ul><h2 id="混沌工程" tabindex="-1">混沌工程 <a class="header-anchor" href="#混沌工程" aria-label="Permalink to &quot;混沌工程&quot;">​</a></h2><p>在使用 etcd 的过程中，你可能会遇到磁盘、网络、进程异常重启等异常导致的故障。如何快速复现相关故障进行问题定位呢？</p><p>答案就是混沌工程。一般常见的异常我们可以分为如下几类：</p><ul><li>磁盘 IO 相关的。比如模拟磁盘 IO 延时上升、IO 操作报错。之前遇到的一个底层磁盘硬件异常导致 IO 延时飙升，最终触发了 etcd 死锁的 Bug，我们就是通过模拟磁盘 IO 延时上升后来验证的</li><li>网络相关的。比如模拟网络分区、网络丢包、网络延时、包重复等</li><li>进程相关的。比如模拟进程异常被杀、重启等。之前遇到的一个非常难定位和复现的数据不一致 Bug，我们就是通过注入进程异常重启等故障，<strong>最后成功复现</strong></li><li>压力测试相关的。比如模拟 CPU 高负载、内存使用率等。</li></ul><p>开源社区在混沌工程领域诞生了若干个优秀的混沌工程项目，如 <a href="https://github.com/chaos-mesh/chaos-mesh" target="_blank" rel="noreferrer">chaos-mesh</a>、chaos-blade、litmus。这里我重点和你介绍下chaos-mesh，它是基于 Kubernetes 实现的云原生混沌工程平台，下图是其架构图（引用自社区）</p><p>为了实现以上异常场景的故障注入，chaos-mesh 定义了若干种资源类型，分别如下：</p><ul><li>IOChaos，用于模拟文件系统相关的 IO 延时和读写错误等</li><li>NetworkChaos，用于模拟网络延时、丢包等</li><li>PodChaos，用于模拟业务 Pod 异常，比如 Pod 被杀、Pod 内的容器重启等</li><li>StressChaos，用于模拟 CPU 和内存压力测试</li></ul><p>当你希望给 etcd Pod 注入一个磁盘 IO 延时的故障时，你只需要创建此 YAML 文件就好</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">apiVersion: chaos-mesh.org/v1alpha1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: IoChaos</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: io-delay-example</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  action: latency</span></span>
<span class="line"><span style="color:#e1e4e8;">  mode: one</span></span>
<span class="line"><span style="color:#e1e4e8;">  selector:</span></span>
<span class="line"><span style="color:#e1e4e8;">    labelSelectors:</span></span>
<span class="line"><span style="color:#e1e4e8;">      app: etcd</span></span>
<span class="line"><span style="color:#e1e4e8;">  volumePath: /var/run/etcd</span></span>
<span class="line"><span style="color:#e1e4e8;">  path: &#39;/var/run/etcd/**/*&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  delay: &#39;100ms&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  percent: 50</span></span>
<span class="line"><span style="color:#e1e4e8;">  duration: &#39;400s&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  scheduler:</span></span>
<span class="line"><span style="color:#e1e4e8;">    cron: &#39;@every 10m&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">apiVersion: chaos-mesh.org/v1alpha1</span></span>
<span class="line"><span style="color:#24292e;">kind: IoChaos</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  name: io-delay-example</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  action: latency</span></span>
<span class="line"><span style="color:#24292e;">  mode: one</span></span>
<span class="line"><span style="color:#24292e;">  selector:</span></span>
<span class="line"><span style="color:#24292e;">    labelSelectors:</span></span>
<span class="line"><span style="color:#24292e;">      app: etcd</span></span>
<span class="line"><span style="color:#24292e;">  volumePath: /var/run/etcd</span></span>
<span class="line"><span style="color:#24292e;">  path: &#39;/var/run/etcd/**/*&#39;</span></span>
<span class="line"><span style="color:#24292e;">  delay: &#39;100ms&#39;</span></span>
<span class="line"><span style="color:#24292e;">  percent: 50</span></span>
<span class="line"><span style="color:#24292e;">  duration: &#39;400s&#39;</span></span>
<span class="line"><span style="color:#24292e;">  scheduler:</span></span>
<span class="line"><span style="color:#24292e;">    cron: &#39;@every 10m&#39;</span></span></code></pre></div>`,81),t=[l];function c(o,r,i,d,u,y){return e(),a("div",null,t)}const g=s(p,[["render",c]]);export{m as __pageData,g as default};
