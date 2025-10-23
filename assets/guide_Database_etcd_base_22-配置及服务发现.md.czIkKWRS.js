import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"配置及服务发现：解析etcd在API Gateway开源项目中应用","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/etcd/base/22-配置及服务发现.md","filePath":"guide/Database/etcd/base/22-配置及服务发现.md","lastUpdated":1703142476000}'),p={name:"guide/Database/etcd/base/22-配置及服务发现.md"},l=n(`<h1 id="配置及服务发现-解析etcd在api-gateway开源项目中应用" tabindex="-1">配置及服务发现：解析etcd在API Gateway开源项目中应用 <a class="header-anchor" href="#配置及服务发现-解析etcd在api-gateway开源项目中应用" aria-label="Permalink to &quot;配置及服务发现：解析etcd在API Gateway开源项目中应用&quot;">​</a></h1><p>从简单的数据库账号密码配置，到<a href="https://github.com/kelseyhightower/confd" target="_blank" rel="noreferrer">confd</a>支持以 etcd 为后端存储的本地配置及模板管理，再到<a href="https://github.com/apache/apisix" target="_blank" rel="noreferrer">Apache APISIX</a>等 API Gateway 项目使用 etcd 存储服务配置、路由信息等，最后到 Kubernetes 更实现了 Secret 和 ConfigMap 资源对象来解决配置管理的问题</p><p>那么它们是如何实现实时、动态调整服务配置而不需要重启相关服务的呢？</p><p>今天我就和你聊聊 etcd 在配置和服务发现场景中的应用。我将以开源项目 Apache APISIX 为例，为你分析服务发现的原理，带你了解 etcd 的 key-value 模型，Watch 机制，鉴权机制，Lease 特性，事务特性在其中的应用</p><h2 id="服务发现" tabindex="-1">服务发现 <a class="header-anchor" href="#服务发现" aria-label="Permalink to &quot;服务发现&quot;">​</a></h2><h3 id="单体架构" tabindex="-1">单体架构 <a class="header-anchor" href="#单体架构" aria-label="Permalink to &quot;单体架构&quot;">​</a></h3><p>在早期软件开发时使用的是单体架构，也就是所有功能耦合在同一个项目中，统一构建、测试、发布。单体架构在项目刚启动的时候，架构简单、开发效率高，比较容易部署、测试。但是随着项目不断增大，它具有若干缺点，比如：</p><ul><li>所有功能耦合在同一个项目中，修复一个小 Bug 就需要发布整个大工程项目，增大引入问题风险。同时随着开发人员增多、单体项目的代码增长、各模块堆砌在一起、代码质量参差不齐，内部复杂度会越来越高，可维护性差。</li><li>无法按需针对仅出现瓶颈的功能模块进行弹性扩容，只能作为一个整体继续扩展，因此扩展性较差</li><li>一旦单体应用宕机，将导致所有服务不可用，因此可用性较差</li></ul><h3 id="分布式及微服务架构" tabindex="-1">分布式及微服务架构 <a class="header-anchor" href="#分布式及微服务架构" aria-label="Permalink to &quot;分布式及微服务架构&quot;">​</a></h3><p>如何解决以上痛点呢？</p><p>当然是将单体应用进行拆分，大而化小。如何拆分呢？ 这里我就以一个我曾经参与重构建设的电商系统为案例给你分析一下。在一个单体架构中，完整的电商系统应包括如下模块：</p><ul><li>商城系统，负责用户登录、查看及搜索商品、购物车商品管理、优惠券管理、订单管理、支付等功能</li><li>物流及仓储系统，根据用户订单，进行发货、退货、换货等一系列仓储、物流管理</li><li>其他客服系统、客户管理系统等</li></ul><p>因此在分布式架构中，你可以按整体功能，将单体应用垂直拆分成以上三大功能模块，各个功能模块可以选择不同的技术栈实现，按需弹性扩缩容，如下图所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211506316.jpg" alt=""></p><p>那什么又是微服务架构呢？</p><p>它是对各个功能模块进行更细立度的拆分，比如商城系统模块可以拆分成：</p><ul><li>用户鉴权模块；</li><li>商品模块；</li><li>购物车模块</li><li>优惠券模块</li><li>支付模块；</li></ul><p>在微服务架构中，每个模块职责更单一、独立部署、开发迭代快，如下图所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211506723.jpg" alt=""></p><p>那么在分布式及微服务架构中，各个模块之间如何及时知道对方网络地址与端口、协议，进行接口调用呢？</p><h3 id="为什么需要服务发现中间件" tabindex="-1">为什么需要服务发现中间件? <a class="header-anchor" href="#为什么需要服务发现中间件" aria-label="Permalink to &quot;为什么需要服务发现中间件?&quot;">​</a></h3><p>其实这个知道的过程，就是服务发现。在早期的时候我们往往通过硬编码、配置文件声明各个依赖模块的网络地址、端口，然而这种方式在分布式及微服务架构中，其运维效率、服务可用性是远远不够的。</p><p>那么我们能否实现通过一个特殊服务就查询到各个服务的后端部署地址呢？ 各服务启动的时候，就自动将 IP 和 Port、协议等信息注册到特殊服务上，当某服务出现异常的时候，特殊服务就自动删除异常实例信息？</p><p>是的，当然可以，这个特殊服务就是注册中心服务，你可以基于 etcd、ZooKeeper、consul 等实现</p><h3 id="etcd-服务发现原理" tabindex="-1">etcd 服务发现原理 <a class="header-anchor" href="#etcd-服务发现原理" aria-label="Permalink to &quot;etcd 服务发现原理&quot;">​</a></h3><p>那么如何基于 etcd 实现服务发现呢?</p><p>下面我给出了一个通用的服务发现原理架构图，通过此图，为你介绍下服务发现的基本原理。详细如下：</p><ul><li>整体上分为四层，client 层、proxy 层 (可选)、业务 server、etcd 存储层组成。引入 proxy 层的原因是使 client 更轻、逻辑更简单，无需直接访问存储层，同时可通过 proxy 层支持各种协议</li><li>client 层通过负载均衡访问 proxy 组件。proxy 组件启动的时候，通过 etcd 的 Range RPC 方法从 etcd 读取初始化服务配置数据，随后通过 Watch 接口持续监听后端业务 server 扩缩容变化，实时修改路由</li><li>proxy 组件收到 client 的请求后，它根据从 etcd 读取到的对应服务的路由配置、负载均衡算法（比如 Round-robin）转发到对应的业务 server</li><li>业务 server 启动的时候，通过 etcd 的写接口 Txn/Put 等，注册自身地址信息、协议到高可用的 etcd 集群上。业务 server 缩容、故障时，对应的 key 应能自动从 etcd 集群删除，因此相关 key 需要关联 lease 信息，设置一个合理的 TTL，并定时发送 keepalive 请求给 Leader 续租，以防止租约及 key 被淘汰</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211506597.jpg" alt=""></p><p>当然，在分布式及微服务架构中，我们面对的问题不仅仅是服务发现，还包括如下痛点：</p><p>限速；鉴权；安全；日志；监控；丰富的发布策略；链路追踪；</p><h3 id="apache-apisix-原理" tabindex="-1">Apache APISIX 原理 <a class="header-anchor" href="#apache-apisix-原理" aria-label="Permalink to &quot;Apache APISIX 原理&quot;">​</a></h3><p>Apache APISIX 它具备哪些功能呢？</p><p>它的本质是一个无状态、高性能、实时、动态、可水平扩展的 API 网关。核心原理就是基于你配置的服务信息、路由规则等信息，将收到的请求通过一系列规则后，正确转发给后端的服务</p><p>Apache APISIX 其实就是上面服务发现原理架构图中的 proxy 组件，如下图红色虚线框所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312211506581.jpg" alt=""></p><p>Apache APISIX 详细架构图如下（<a href="https://github.com/apache/apisix" target="_blank" rel="noreferrer">引用自社区项目文档</a>）。从图中你可以看到，它由控制面和数据面组成</p><p>控制面顾名思义，就是你通过 Admin API 下发服务、路由、安全配置的操作。控制面默认的服务发现存储是 etcd，当然也支持 consul、nacos 等</p><p>你如果没有使用过 Apache APISIX 的话，可以参考下这个<a href="https://github.com/apache/apisix-docker/tree/master/example" target="_blank" rel="noreferrer">example</a>，快速、直观的了解下 Apache APISIX 是如何通过 Admin API 下发服务和路由配置的</p><h2 id="etcd-在-apache-apisix-中的应用" tabindex="-1">etcd 在 Apache APISIX 中的应用 <a class="header-anchor" href="#etcd-在-apache-apisix-中的应用" aria-label="Permalink to &quot;etcd 在 Apache APISIX 中的应用&quot;">​</a></h2><p>在搞懂这个问题之前，我们先看看 Apache APISIX 在 etcd 中，都存储了哪些数据呢？它的数据存储格式是怎样的？</p><p>下面我参考 Apache APISIX 的<a href="https://github.com/apache/apisix-docker/tree/master/example" target="_blank" rel="noreferrer">example</a>案例（apisix:2.3），通过 Admin API 新增了两个服务、路由规则后，执行如下查看 etcd 所有 key 的命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">etcdctl get &quot;&quot; --prefix --keys-only</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">etcdctl get &quot;&quot; --prefix --keys-only</span></span></code></pre></div><p>etcd 输出结果如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/consumers/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/data_plane/server_info/f7285805-73e9-4ce4-acc6-a38d619afdc3</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/global_rules/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/node_status/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/plugin_metadata/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/plugins</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/plugins/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/proto/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/routes/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/routes/12</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/routes/22</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/services/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/services/1</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/services/2</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/ssl/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/ssl/1</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/ssl/2</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/stream_routes/</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/upstreams/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/apisix/consumers/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/data_plane/server_info/f7285805-73e9-4ce4-acc6-a38d619afdc3</span></span>
<span class="line"><span style="color:#24292e;">/apisix/global_rules/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/node_status/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/plugin_metadata/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/plugins</span></span>
<span class="line"><span style="color:#24292e;">/apisix/plugins/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/proto/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/routes/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/routes/12</span></span>
<span class="line"><span style="color:#24292e;">/apisix/routes/22</span></span>
<span class="line"><span style="color:#24292e;">/apisix/services/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/services/1</span></span>
<span class="line"><span style="color:#24292e;">/apisix/services/2</span></span>
<span class="line"><span style="color:#24292e;">/apisix/ssl/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/ssl/1</span></span>
<span class="line"><span style="color:#24292e;">/apisix/ssl/2</span></span>
<span class="line"><span style="color:#24292e;">/apisix/stream_routes/</span></span>
<span class="line"><span style="color:#24292e;">/apisix/upstreams/</span></span></code></pre></div><p>然后我们继续通过 etcdctl get 命令查看下 services 都存储了哪些信息呢</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@e9d3b477ca1f:/opt/bitnami/etcd# etcdctl get /apisix/services --prefix</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/services/</span></span>
<span class="line"><span style="color:#e1e4e8;">init_dir</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/services/1</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;update_time&quot;:1614293352,&quot;create_time&quot;:1614293352,&quot;upstream&quot;:{&quot;type&quot;:&quot;roundrobin&quot;,&quot;nodes&quot;:{&quot;172.18.5.12:80&quot;:1},&quot;hash_on&quot;:&quot;vars&quot;,&quot;scheme&quot;:&quot;http&quot;,&quot;pass_host&quot;:&quot;pass&quot;},&quot;id&quot;:&quot;1&quot;}</span></span>
<span class="line"><span style="color:#e1e4e8;">/apisix/services/2</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;update_time&quot;:1614293361,&quot;create_time&quot;:1614293361,&quot;upstream&quot;:</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;type&quot;:&quot;roundrobin&quot;,&quot;nodes&quot;:{&quot;172.18.5.13:80&quot;:1},&quot;hash_on&quot;:&quot;vars&quot;,&quot;scheme&quot;:&quot;http&quot;,&quot;pass_host&quot;:&quot;pass&quot;},&quot;id&quot;:&quot;2&quot;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@e9d3b477ca1f:/opt/bitnami/etcd# etcdctl get /apisix/services --prefix</span></span>
<span class="line"><span style="color:#24292e;">/apisix/services/</span></span>
<span class="line"><span style="color:#24292e;">init_dir</span></span>
<span class="line"><span style="color:#24292e;">/apisix/services/1</span></span>
<span class="line"><span style="color:#24292e;">{&quot;update_time&quot;:1614293352,&quot;create_time&quot;:1614293352,&quot;upstream&quot;:{&quot;type&quot;:&quot;roundrobin&quot;,&quot;nodes&quot;:{&quot;172.18.5.12:80&quot;:1},&quot;hash_on&quot;:&quot;vars&quot;,&quot;scheme&quot;:&quot;http&quot;,&quot;pass_host&quot;:&quot;pass&quot;},&quot;id&quot;:&quot;1&quot;}</span></span>
<span class="line"><span style="color:#24292e;">/apisix/services/2</span></span>
<span class="line"><span style="color:#24292e;">{&quot;update_time&quot;:1614293361,&quot;create_time&quot;:1614293361,&quot;upstream&quot;:</span></span>
<span class="line"><span style="color:#24292e;">{&quot;type&quot;:&quot;roundrobin&quot;,&quot;nodes&quot;:{&quot;172.18.5.13:80&quot;:1},&quot;hash_on&quot;:&quot;vars&quot;,&quot;scheme&quot;:&quot;http&quot;,&quot;pass_host&quot;:&quot;pass&quot;},&quot;id&quot;:&quot;2&quot;}</span></span></code></pre></div><p>从中我们可以总结出如下信息：</p><ul><li>Apache APSIX 2.x 系列版本使用的是 etcd3</li><li>服务、路由、ssl、插件等配置存储格式前缀是 /apisix + &quot;/&quot; + 功能特性类型（routes/services/ssl 等），我们通过 Admin API 添加的路由、服务等配置就保存在相应的前缀下</li><li>路由和服务配置的 value 是个 Json 对象，其中服务对象包含了 id、负载均衡算法、后端节点、协议等信息</li></ul><h3 id="watch-机制的应用" tabindex="-1">Watch 机制的应用 <a class="header-anchor" href="#watch-机制的应用" aria-label="Permalink to &quot;Watch 机制的应用&quot;">​</a></h3><p>与 Kubernetes 一样，它们都是通过 etcd 的 Watch 机制来实现的</p><p>Apache APISIX 在启动的时候，首先会通过 Range 操作获取网关的配置、路由等信息，随后就通过 Watch 机制，获取增量变化事件</p><p>使用 Watch 机制最容易犯错的地方是什么呢？</p><p>答案是不处理 Watch 返回的相关错误信息，比如已压缩 ErrCompacted 错误。Apache APISIX 项目在从 etcd v2 中切换到 etcd v3 早期的时候，同样也犯了这个错误</p><p>去年某日收到小伙伴求助，说使用 Apache APISIX 后，获取不到新的服务配置了，是不是 etcd 出什么 Bug 了？</p><p>经过一番交流和查看日志，发现原来是 Apache APISIX 未处理 ErrCompacted 错误导致的。根据我们07Watch 原理的介绍，当你请求 Watch 的版本号已被 etcd 压缩后，etcd 就会取消这个 watcher，这时你需要重建 watcher，才能继续监听到最新数据变化事件</p><p>查清楚问题后，小伙伴向社区提交了 issue 反馈，随后 Apache APISIX 相关同学通过PR 2687修复了此问题，更多信息你可参考 Apache APISIX 访问 etcd相关<a href="https://github.com/apache/apisix/blob/v2.3/apisix/core/etcd.lua" target="_blank" rel="noreferrer">实现代码文件</a></p><h3 id="鉴权机制的应用" tabindex="-1">鉴权机制的应用 <a class="header-anchor" href="#鉴权机制的应用" aria-label="Permalink to &quot;鉴权机制的应用&quot;">​</a></h3><p>除了 Watch 机制，Apache APISIX 项目还使用了鉴权，毕竟配置网关是个高危操作，那它是如何使用 etcd 鉴权机制的呢？ etcd 鉴权机制中最容易踩的坑是什么呢？</p><p>答案是不复用 client 和鉴权 token，频繁发起 Authenticate 操作，导致 etcd 高负载。正如我在17和你介绍的，一个 8 核 32G 的高配节点在 100 个连接时，Authenticate QPS 仅为 8。可想而知，你如果不复用 token，那么出问题就很自然不过了</p><p>Apache APISIX 是否也踩了这个坑呢？</p><p>Apache APISIX 是基于 Lua 构建的，使用的是<a href="https://github.com/api7/lua-resty-etcd/blob/master/lib/resty/etcd/v3.lua" target="_blank" rel="noreferrer">lua-resty-etcd</a>这个项目访问 etcd，从相关<a href="https://github.com/apache/apisix/issues/2899" target="_blank" rel="noreferrer">issue</a>反馈看，的确也踩了这个坑。社区用户反馈后，随后通过复用 client、更完善的 token 复用机制解决了 Authenticate 的性能瓶颈，详细信息你可参考<a href="https://github.com/apache/apisix/pull/2932" target="_blank" rel="noreferrer">PR 2932</a>、<a href="https://github.com/api7/lua-resty-etcd/pull/100" target="_blank" rel="noreferrer">PR 100</a></p><p>除了以上介绍的 Watch 机制、鉴权机制，Apache APISIX 还使用了 etcd 的 Lease 特性和事务接口</p><h3 id="lease-特性的应用" tabindex="-1">Lease 特性的应用 <a class="header-anchor" href="#lease-特性的应用" aria-label="Permalink to &quot;Lease 特性的应用&quot;">​</a></h3><p>为什么 Apache APISIX 项目需要 Lease 特性呢？</p><p>服务发现的核心工作原理是服务启动的时候将地址信息登录到注册中心，服务异常时自动从注册中心删除</p><p>这是不是跟我们前面05节介绍的 应用场景很匹配呢？</p><p>没错，Apache APISIX 通过 etcd v2 的 TTL 特性、etcd v3 的 Lease 特性来实现类似的效果，它提供的增加服务路由 API，支持设置 TTL 属性，如下面所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Create a route expires after 60 seconds, then it&#39;s deleted automatically</span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl http://127.0.0.1:9080/apisix/admin/routes/2?ttl=60 -H &#39;X-API-KEY: edd1c9f034335f136f87ad84b625c8f1&#39; -X PUT -i -d &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;uri&quot;: &quot;/aa/index.html&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;upstream&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;type&quot;: &quot;roundrobin&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;nodes&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;39.97.63.215:80&quot;: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Create a route expires after 60 seconds, then it&#39;s deleted automatically</span></span>
<span class="line"><span style="color:#24292e;">$ curl http://127.0.0.1:9080/apisix/admin/routes/2?ttl=60 -H &#39;X-API-KEY: edd1c9f034335f136f87ad84b625c8f1&#39; -X PUT -i -d &#39;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;uri&quot;: &quot;/aa/index.html&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;upstream&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;type&quot;: &quot;roundrobin&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;nodes&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;39.97.63.215:80&quot;: 1</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}&#39;</span></span></code></pre></div><p>当一个路由设置非 0 TTL 后，Apache APISIX 就会为它创建 Lease，关联 key，相关代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- lease substitute ttl in v3</span></span>
<span class="line"><span style="color:#e1e4e8;">local res, err</span></span>
<span class="line"><span style="color:#e1e4e8;">if ttl then</span></span>
<span class="line"><span style="color:#e1e4e8;">    local data, grant_err = etcd_cli:grant(tonumber(ttl))</span></span>
<span class="line"><span style="color:#e1e4e8;">    if not data then</span></span>
<span class="line"><span style="color:#e1e4e8;">        return nil, grant_err</span></span>
<span class="line"><span style="color:#e1e4e8;">    end</span></span>
<span class="line"><span style="color:#e1e4e8;">    res, err = etcd_cli:set(prefix .. key, value, {prev_kv = true, lease = data.body.ID})</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">    res, err = etcd_cli:set(prefix .. key, value, {prev_kv = true})</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- lease substitute ttl in v3</span></span>
<span class="line"><span style="color:#24292e;">local res, err</span></span>
<span class="line"><span style="color:#24292e;">if ttl then</span></span>
<span class="line"><span style="color:#24292e;">    local data, grant_err = etcd_cli:grant(tonumber(ttl))</span></span>
<span class="line"><span style="color:#24292e;">    if not data then</span></span>
<span class="line"><span style="color:#24292e;">        return nil, grant_err</span></span>
<span class="line"><span style="color:#24292e;">    end</span></span>
<span class="line"><span style="color:#24292e;">    res, err = etcd_cli:set(prefix .. key, value, {prev_kv = true, lease = data.body.ID})</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">    res, err = etcd_cli:set(prefix .. key, value, {prev_kv = true})</span></span>
<span class="line"><span style="color:#24292e;">end</span></span></code></pre></div><h3 id="事务特性的应用" tabindex="-1">事务特性的应用 <a class="header-anchor" href="#事务特性的应用" aria-label="Permalink to &quot;事务特性的应用&quot;">​</a></h3><p>介绍完 Lease 特性在 Apache APISIX 项目中的应用后，我们再来思考两个问题。为什么它还依赖 etcd 的事务特性呢？简单的执行 put 接口有什么问题？</p><p>答案是它跟 Kubernetes 是一样的使用目的。使用事务是为了防止并发场景下的数据写冲突，比如你可能同时发起两个 Patch Admin API 去修改配置等。如果简单地使用 put 接口，就会导致第一个写请求的结果被覆盖</p><p>Apache APISIX 是如何使用事务接口提供的乐观锁机制去解决并发冲突的问题呢？</p><p>核心依然是我们前面课程中一直强调的 mod_revision，它会比较事务提交时的 mod_revision 与预期是否一致，一致才能执行 put 操作，Apache APISIX 相关使用代码如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local compare = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        key = key,</span></span>
<span class="line"><span style="color:#e1e4e8;">        target = &quot;MOD&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        result = &quot;EQUAL&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        mod_revision = mod_revision,</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">local success = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        requestPut = {</span></span>
<span class="line"><span style="color:#e1e4e8;">            key = key,</span></span>
<span class="line"><span style="color:#e1e4e8;">            value = value,</span></span>
<span class="line"><span style="color:#e1e4e8;">            lease = lease_id,</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">local res, err = etcd_cli:txn(compare, success)</span></span>
<span class="line"><span style="color:#e1e4e8;">if not res then</span></span>
<span class="line"><span style="color:#e1e4e8;">    return nil, err</span></span>
<span class="line"><span style="color:#e1e4e8;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local compare = {</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        key = key,</span></span>
<span class="line"><span style="color:#24292e;">        target = &quot;MOD&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        result = &quot;EQUAL&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        mod_revision = mod_revision,</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">local success = {</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        requestPut = {</span></span>
<span class="line"><span style="color:#24292e;">            key = key,</span></span>
<span class="line"><span style="color:#24292e;">            value = value,</span></span>
<span class="line"><span style="color:#24292e;">            lease = lease_id,</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">local res, err = etcd_cli:txn(compare, success)</span></span>
<span class="line"><span style="color:#24292e;">if not res then</span></span>
<span class="line"><span style="color:#24292e;">    return nil, err</span></span>
<span class="line"><span style="color:#24292e;">end</span></span></code></pre></div><p>关于 Apache APISIX 事务特性的引入、背景以及更详细的实现，你也可以参考<a href="https://github.com/apache/apisix/pull/2216" target="_blank" rel="noreferrer">PR 2216</a>。</p>`,78),t=[l];function o(c,i,r,u,d,h){return a(),e("div",null,t)}const g=s(p,[["render",o]]);export{q as __pageData,g as default};
