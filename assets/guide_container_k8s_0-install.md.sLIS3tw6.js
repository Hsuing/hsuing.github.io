import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1.企业测试环境","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/0-install.md","filePath":"guide/container/k8s/0-install.md","lastUpdated":1720533756000}'),l={name:"guide/container/k8s/0-install.md"},p=a(`<h1 id="_1-企业测试环境" tabindex="-1">1.企业测试环境 <a class="header-anchor" href="#_1-企业测试环境" aria-label="Permalink to &quot;1.企业测试环境&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">a)	Master节点（尽量三台实现高可用，可以将某台Master禁止调度）：8核16G+ 磁盘分为系统盘（路径：/，大小100G+）、Docker数据盘（/var/lib/docker，200G+）</span></span>
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
<span class="line"><span style="color:#24292e;">    其中master节点和etcd节点的系统分区100G即可。</span></span></code></pre></div><h1 id="node节点建议" tabindex="-1">node节点建议 <a class="header-anchor" href="#node节点建议" aria-label="Permalink to &quot;node节点建议&quot;">​</a></h1><p>Node节点上主要部署公司的一些业务应用，生产环境中不建议Master节点部署系统组件之外的其他Pod，测试环境可以允许Master节点部署Pod以节省系统资源</p><h1 id="_3-优化" tabindex="-1">3. 优化 <a class="header-anchor" href="#_3-优化" aria-label="Permalink to &quot;3. 优化&quot;">​</a></h1><h2 id="_3-1-基础设施" tabindex="-1">3.1 基础设施 <a class="header-anchor" href="#_3-1-基础设施" aria-label="Permalink to &quot;3.1 基础设施&quot;">​</a></h2><p>节点级别的优化，主要分 2 个层面，硬件和软件。</p><ul><li>硬件，没什么好说，cpu、内存和磁盘IO。</li><li>软件方面，就是内核参数的优化了。</li><li>网络，硬件和软件方面都有关联，有部分内核参数涉及到网络方面的，硬件方面，也需要网络设备支持。</li></ul><h3 id="硬件优化" tabindex="-1">硬件优化 <a class="header-anchor" href="#硬件优化" aria-label="Permalink to &quot;硬件优化&quot;">​</a></h3><ol><li>根据场景购买或使用对应级别的硬件设施即可，这种当然是节点性能越高越好，当然也需要按需选择，避免浪费，这里没有什么好说的。</li></ol><h3 id="内核优化" tabindex="-1">内核优化 <a class="header-anchor" href="#内核优化" aria-label="Permalink to &quot;内核优化&quot;">​</a></h3><p>最大线程数和文件打开数。</p><p>编辑 /etc/security/limits.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root soft nofile 655350</span></span>
<span class="line"><span style="color:#e1e4e8;">root hard nofile 655350</span></span>
<span class="line"><span style="color:#e1e4e8;">root soft nproc 655350</span></span>
<span class="line"><span style="color:#e1e4e8;">root hard nproc 655350</span></span>
<span class="line"><span style="color:#e1e4e8;">* soft nofile 655350</span></span>
<span class="line"><span style="color:#e1e4e8;">* hard nofile 655350</span></span>
<span class="line"><span style="color:#e1e4e8;">* soft nproc 655350</span></span>
<span class="line"><span style="color:#e1e4e8;">* hard nproc 655350</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root soft nofile 655350</span></span>
<span class="line"><span style="color:#24292e;">root hard nofile 655350</span></span>
<span class="line"><span style="color:#24292e;">root soft nproc 655350</span></span>
<span class="line"><span style="color:#24292e;">root hard nproc 655350</span></span>
<span class="line"><span style="color:#24292e;">* soft nofile 655350</span></span>
<span class="line"><span style="color:#24292e;">* hard nofile 655350</span></span>
<span class="line"><span style="color:#24292e;">* soft nproc 655350</span></span>
<span class="line"><span style="color:#24292e;">* hard nproc 655350</span></span></code></pre></div><p>编辑 /etc/sysctl.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 容器环境下，优化这些参数可以避免 NAT 过的 TCP 连接带宽上不去。</span></span>
<span class="line"><span style="color:#e1e4e8;">net.netfilter.nf_conntrack_tcp_be_liberal = 1 </span></span>
<span class="line"><span style="color:#e1e4e8;">net.netfilter.nf_conntrack_tcp_loose = 1 </span></span>
<span class="line"><span style="color:#e1e4e8;">net.netfilter.nf_conntrack_max = 3200000</span></span>
<span class="line"><span style="color:#e1e4e8;">net.netfilter.nf_conntrack_buckets = 1600512</span></span>
<span class="line"><span style="color:#e1e4e8;">net.netfilter.nf_conntrack_tcp_timeout_time_wait = 30</span></span>
<span class="line"><span style="color:#e1e4e8;">net.netfilter.nf_conntrack_tcp_timeout_established = 1200</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># tcp 队列</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.somaxconn = 4096</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_syn_backlog = 8192</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 端口范围</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = &quot;1024 65000&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># timewait相关优化</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_max_tw_buckets = 50000</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.tcp_fin_timeout = 30</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 以下三个参数是 arp 缓存的 gc 阀值</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.neigh.default.gc_thresh1=&quot;2048&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.neigh.default.gc_thresh2=&quot;4096&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.neigh.default.gc_thresh3=&quot;8192&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 磁盘 IO 优化</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_background_ratio = 5</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_expire_centisecs = 300</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_ratio = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_writeback_centisecs = 50</span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirtytime_expire_seconds = 43200</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># fd优化</span></span>
<span class="line"><span style="color:#e1e4e8;">fs.file-max=655360</span></span>
<span class="line"><span style="color:#e1e4e8;">fs.inotify.max_user_instances=&quot;8192&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">fs.inotify.max_user_watches=&quot;524288&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 最大线程数量</span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.pid_max = 655350</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 容器环境下，优化这些参数可以避免 NAT 过的 TCP 连接带宽上不去。</span></span>
<span class="line"><span style="color:#24292e;">net.netfilter.nf_conntrack_tcp_be_liberal = 1 </span></span>
<span class="line"><span style="color:#24292e;">net.netfilter.nf_conntrack_tcp_loose = 1 </span></span>
<span class="line"><span style="color:#24292e;">net.netfilter.nf_conntrack_max = 3200000</span></span>
<span class="line"><span style="color:#24292e;">net.netfilter.nf_conntrack_buckets = 1600512</span></span>
<span class="line"><span style="color:#24292e;">net.netfilter.nf_conntrack_tcp_timeout_time_wait = 30</span></span>
<span class="line"><span style="color:#24292e;">net.netfilter.nf_conntrack_tcp_timeout_established = 1200</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># tcp 队列</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"><span style="color:#24292e;">net.core.somaxconn = 4096</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_syn_backlog = 8192</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 端口范围</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = &quot;1024 65000&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># timewait相关优化</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_max_tw_buckets = 50000</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.tcp_fin_timeout = 30</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 以下三个参数是 arp 缓存的 gc 阀值</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.neigh.default.gc_thresh1=&quot;2048&quot;</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.neigh.default.gc_thresh2=&quot;4096&quot;</span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.neigh.default.gc_thresh3=&quot;8192&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 磁盘 IO 优化</span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_background_ratio = 5</span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_expire_centisecs = 300</span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_ratio = 10</span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_writeback_centisecs = 50</span></span>
<span class="line"><span style="color:#24292e;">vm.dirtytime_expire_seconds = 43200</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># fd优化</span></span>
<span class="line"><span style="color:#24292e;">fs.file-max=655360</span></span>
<span class="line"><span style="color:#24292e;">fs.inotify.max_user_instances=&quot;8192&quot;</span></span>
<span class="line"><span style="color:#24292e;">fs.inotify.max_user_watches=&quot;524288&quot;</span></span>
<span class="line"><span style="color:#24292e;"># 最大线程数量</span></span>
<span class="line"><span style="color:#24292e;">kernel.pid_max = 655350</span></span></code></pre></div><h3 id="网络" tabindex="-1">网络 <a class="header-anchor" href="#网络" aria-label="Permalink to &quot;网络&quot;">​</a></h3><h2 id="_3-2-集群维度" tabindex="-1">3.2 集群维度 <a class="header-anchor" href="#_3-2-集群维度" aria-label="Permalink to &quot;3.2 集群维度&quot;">​</a></h2><p>集群维护就是对 kubernetes 集群内部组件和容器的一些优化。</p><h3 id="etcd-优化" tabindex="-1">etcd 优化 <a class="header-anchor" href="#etcd-优化" aria-label="Permalink to &quot;etcd 优化&quot;">​</a></h3><p>etcd 优化在不同的时期可以有不同程度的优化，当然，如果条件允许，也可以把所有优化的点子都全部应用上（不过笔者目前还没达到比较大的集群规模，还停留在 1 阶段）。</p><ol><li>etcd 采用本地 ssd 盘作为后端存储存储（规模小）。</li><li>etcd 需要配置单独的 etcd 集群存储 kube-apiserver 的 event （规模中以上）。</li><li>etcd 独立部署在非 kubernetes node 上（规模大）。</li></ol><h3 id="pod-优化" tabindex="-1">pod 优化 <a class="header-anchor" href="#pod-优化" aria-label="Permalink to &quot;pod 优化&quot;">​</a></h3><p>为容器设置资源请求和限制：</p><ul><li>spec.containers[].resources.limits.cpu</li><li>spec.containers[].resources.limits.memory</li><li>spec.containers[].resources.requests.cpu</li><li>spec.containers[].resources.requests.memory</li><li>spec.containers[].resources.limits.ephemeral-storage</li><li>spec.containers[].resources.requests.ephemeral-storage</li></ul><p>在 kubernetes 中，会根据 pod 不同的 limit 和 requests 的配置将 pod 划分为不同的 qos 类别:</p><ul><li>Guaranteed</li><li>Burstable</li><li>BestEffort</li></ul><p>当机器可用资源不够时，kubelet 会根据 qos 级别划分迁移驱逐 pod 。被驱逐的优先级：BestEffort &gt; Burstable &gt; Guaranteed 。</p><p><strong>必要时可以使用开源的或者自己开发的控制器来清理状态异常的 pod ，防止异常状态 pod 对节点产生一些直接的影响。例如：descheduler 。</strong></p><h3 id="kubelet" tabindex="-1">kubelet <a class="header-anchor" href="#kubelet" aria-label="Permalink to &quot;kubelet&quot;">​</a></h3><ol><li><p>pod 个数</p><p>最好按默认 110 个配置，因为如果单个节点配置的 pod 数量太多，容易引起 pleg 、磁盘IO压力或者 cpu 负载高等问题。</p></li><li><p>压力驱逐</p><p>kubelet 监控集群节点的 CPU、内存、磁盘空间和文件系统的 inode 等资源，根据 kubelet 启动参数中的驱逐策略配置，当这些资源中的一个或者多个达到特定的消耗水平，kubelet 可以主动地驱逐节点上一个或者多个 pod ，以回收资源，降低节点资源压力。</p><p>kubelet 的默认硬驱逐条件：</p><ul><li>memory.available&lt;100Mi</li><li>nodefs.available&lt;10%</li><li>imagefs.available&lt;15%</li><li>nodefs.inodesFree&lt;5%（Linux 节点）</li></ul></li></ol><h3 id="kube-proxy" tabindex="-1">kube-proxy <a class="header-anchor" href="#kube-proxy" aria-label="Permalink to &quot;kube-proxy&quot;">​</a></h3><p>使用 ipvs 模式</p><p>由于 iptables 匹配时延和规则更新时延在大规模集群中呈指数增长，增加以及删除规则非常耗时，所以需要转为 ipvs ，ipvs 使用 hash 表，其增加或者删除一条规则几乎不受规则基数的影响</p>`,36),t=[p];function o(c,i,r,d,y,u){return n(),e("div",null,t)}const f=s(l,[["render",o]]);export{h as __pageData,f as default};
