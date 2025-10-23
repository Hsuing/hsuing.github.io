import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"1.系统设置","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/7_replication.md","filePath":"guide/Database/mongodb/7_replication.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/7_replication.md"},t=e(`<h1 id="_1-系统设置" tabindex="-1">1.系统设置 <a class="header-anchor" href="#_1-系统设置" aria-label="Permalink to &quot;1.系统设置&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">禁用透明页</span></span>
<span class="line"><span style="color:#e1e4e8;">ssh mongo1 &quot;echo &#39;never&#39; &gt; /sys/kernel/mm/transparent_hugepage/defrag&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">ssh mongo1 &quot;echo &#39;never&#39; &gt; /sys/kernel/mm/transparent_hugepage/enabled&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">禁用透明页</span></span>
<span class="line"><span style="color:#24292e;">ssh mongo1 &quot;echo &#39;never&#39; &gt; /sys/kernel/mm/transparent_hugepage/defrag&quot;</span></span>
<span class="line"><span style="color:#24292e;">ssh mongo1 &quot;echo &#39;never&#39; &gt; /sys/kernel/mm/transparent_hugepage/enabled&quot;</span></span></code></pre></div><ul><li>添加 /etc/security/limits.conf</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">*                soft   fsize            unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                hard   fsize            unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                soft   cpu              unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                hard   cpu              unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                soft   as               unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                hard   as               unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                soft   memlock          unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                hard   memlock          unlimited</span></span>
<span class="line"><span style="color:#e1e4e8;">*                soft   nofile           64000</span></span>
<span class="line"><span style="color:#e1e4e8;">*                hard   nofile           64000</span></span>
<span class="line"><span style="color:#e1e4e8;">*                soft   nproc            64000</span></span>
<span class="line"><span style="color:#e1e4e8;">*                hard   nproc            64000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">*                soft   fsize            unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                hard   fsize            unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                soft   cpu              unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                hard   cpu              unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                soft   as               unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                hard   as               unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                soft   memlock          unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                hard   memlock          unlimited</span></span>
<span class="line"><span style="color:#24292e;">*                soft   nofile           64000</span></span>
<span class="line"><span style="color:#24292e;">*                hard   nofile           64000</span></span>
<span class="line"><span style="color:#24292e;">*                soft   nproc            64000</span></span>
<span class="line"><span style="color:#24292e;">*                hard   nproc            64000</span></span></code></pre></div><ul><li>/etc/sysctl.conf</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ssh mongo1 &quot;echo &quot;net.ipv4.tcp_keepalive_time = 300&quot; &gt;&gt; /etc/sysctl.conf&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ssh mongo1 &quot;echo &quot;net.ipv4.tcp_keepalive_time = 300&quot; &gt;&gt; /etc/sysctl.conf&quot;</span></span></code></pre></div><ul><li>关闭防火墙和selinux</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl disable --now firewalld</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/^SELINUX=enforcing$/SELINUX=disabled/&#39; /etc/selinux/config &amp;&amp; setenforce 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl disable --now firewalld</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/^SELINUX=enforcing$/SELINUX=disabled/&#39; /etc/selinux/config &amp;&amp; setenforce 0</span></span></code></pre></div><ul><li><strong>磁盘 io 调度策略</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> echo deadline &gt; /sys/block/sda/queue/scheduler</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> echo deadline &gt; /sys/block/sda/queue/scheduler</span></span></code></pre></div><ul><li>修改内存分配策略</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo 0 &gt; /proc/sys/vm/zone_reclaim_mode</span></span>
<span class="line"><span style="color:#e1e4e8;">sysctl -w vm.zone_reclaim_mode=0</span></span>
<span class="line"><span style="color:#e1e4e8;">sysctl vm.overcommit_memory=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo 0 &gt; /proc/sys/vm/zone_reclaim_mode</span></span>
<span class="line"><span style="color:#24292e;">sysctl -w vm.zone_reclaim_mode=0</span></span>
<span class="line"><span style="color:#24292e;">sysctl vm.overcommit_memory=1</span></span></code></pre></div><h2 id="三种方式区别" tabindex="-1">三种方式区别 <a class="header-anchor" href="#三种方式区别" aria-label="Permalink to &quot;三种方式区别&quot;">​</a></h2><p><strong>mongodb集群的副本集和sharding模式目前是用的最广的方案，通常这2种方案的选择通过数据量和并发数来权衡。在GB级别的基本上副本集方案可满足，TB级别或以上采用sharding模式，解决单机容量和单机并发能力</strong></p><ul><li>Master-Slaver 是一种主从副本的模式，目前已经不推荐使用。</li><li>Replica Set 模式取代了 Master-Slaver 模式，是一种互为主从的关系。Replica Set 将数据复制多份保存，不同服务器保存同一份数据，在出现故障时自动切换，实现故障转移，在实际生产中非常实用。</li><li>Sharding 模式适合处理大量数据，它将数据分开存储，不同服务器保存不同的数据，所有服务器数据的总和即为整个数据集。</li></ul><h1 id="_2-mongodb-副本集介绍" tabindex="-1">2.MongoDB 副本集介绍 <a class="header-anchor" href="#_2-mongodb-副本集介绍" aria-label="Permalink to &quot;2.MongoDB 副本集介绍&quot;">​</a></h1><p>MongoDB副本集（Replica Set）其实就是具有自动故障恢复功能的主从集群，和主从复制最大的区别就是在副本集中没有固定的“主节点；整个副本集会选出一个节点作为“主节点”，当其挂掉后，再在剩下的从节点中选举一个节点成为新的“主节点”，在副本集中总有一个主节点(primary)和一个或多个备份节点(secondary)</p><p>MongoDB 副本集（Replica Set）包括主节点（primary）跟副本节点（Secondaries）。</p><p>主节点只能有一个，所有的写操作请求都在主节点上面处理。副本节点可以有多个，通过同步主节点的操作日志（oplog）来备份主节点数据。</p><p>在主节点挂掉后，有选举权限的副本节点会自动发起选举，并从中选举出新的主节点</p><p>搭建一个副本集集群最少需要三个节点：一个主节点，两个备份节点，如果三个节点分布合理，基本可以保证线上数据99.9%安全</p><p>除了primary和secondary之外，副本集中的节点还可以是以下角色</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100942968.jpg" alt=""></p><p>官方帮助文档：<a href="https://docs.mongodb.com/manual/replication/" target="_blank" rel="noreferrer">https://docs.mongodb.com/manual/replication/</a></p><h2 id="一主两从" tabindex="-1">一主两从 <a class="header-anchor" href="#一主两从" aria-label="Permalink to &quot;一主两从&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100942820.jpg" alt=""></p><h2 id="一主一从" tabindex="-1">一主一从 <a class="header-anchor" href="#一主一从" aria-label="Permalink to &quot;一主一从&quot;">​</a></h2><p>如果只有一个主节点，一个副本节点，且没有资源拿来当第二个副本节点，那就可以起一个仲裁者节点（arbiter），不存数据，只用来选举用，如下图所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100942877.jpg" alt=""></p><h2 id="主要成员介绍" tabindex="-1">主要成员介绍 <a class="header-anchor" href="#主要成员介绍" aria-label="Permalink to &quot;主要成员介绍&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100942387.jpg" alt=""></p><p>对于副本集成员属性，特别需要说明下这几个：priority、hidden、slaveDelay、tags、votes</p><h3 id="priority" tabindex="-1">priority <a class="header-anchor" href="#priority" aria-label="Permalink to &quot;priority&quot;">​</a></h3><p>对于副本节点，可以通过该属性来增大或者减小该节点被选举成为主节点的可能性，取值范围为0-1000（如果是arbiters，则取值只有0或者1），数据越大，成为主节点的可能性越大，如果被配置为0，那么他就不能被选举成为主节点，而且也不能主动发起选举。</p><p>这种特性一般会被用在有多个数据中心的情况下，比如一个主数据中心，一个备份数据中心，主数据中心速度会更快，如果主节点挂掉，我们肯定希望新主节点也在主数据中心产生，那么我们就可以设置在备份数据中心的副本节点优先级为0，如下图所示：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100942664.jpg" alt=""></p><h3 id="hidden" tabindex="-1">hidden <a class="header-anchor" href="#hidden" aria-label="Permalink to &quot;hidden&quot;">​</a></h3><p>隐藏节点会从主节点同步数据，但对客户端不可见，在mongo shell 执行 db.isMaster() 方法也不会展示该节点，隐藏节点必须Priority为0，即不可以被选举成为主节点。但是如果有配置选举权限的话，可以参与选举。</p><p>因为隐藏节点对客户端不可见，所以跟客户端不会互相影响，可以用来备份数据或者跑一些后端定时任务之类的操作，具体如下图，4个备份节点都从主节点同步数据，其中1个为隐藏节点</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100943668.jpg" alt=""></p><h3 id="slavedelay" tabindex="-1">slaveDelay <a class="header-anchor" href="#slavedelay" aria-label="Permalink to &quot;slaveDelay&quot;">​</a></h3><p>延迟同步即延迟从主节点同步数据，比如延迟时间配置的1小时，现在时间是 09:52，那么延迟节点中只同步到主节点 08:52 之前的数据。另外需要注意延迟节点必须是隐藏节点，且Priority为0。</p><p>那这个延迟节点有什么用呢？有过数据库误操作惨痛经历的开发者肯定知道答案，那就是为了防止数据库误操作，比如更新服务前，一般会先执行数据库更新脚本，如果脚本有问题，且操作前未做备份，那数据可能就找不回了。但如果说配置了延迟节点，那误操作完，还有该节点可以兜底，只能说该功能真是贴心。具体延迟节点如下图所展示：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100943585.jpg" alt=""></p><h3 id="tags" tabindex="-1">tags <a class="header-anchor" href="#tags" aria-label="Permalink to &quot;tags&quot;">​</a></h3><p>支持对副本集成员打标签，在查询数据时会用到，比如找到对应标签的副本节点，然后从该节点读取数据，这点也非常有用，可以根据标签对节点分类，查询数据时不同服务的客户端指定其对应的标签的节点，对某个标签的节点数量进行增加或减少，也不怕会影响到使用其他标签的服务</p><h3 id="votes" tabindex="-1">votes <a class="header-anchor" href="#votes" aria-label="Permalink to &quot;votes&quot;">​</a></h3><p>表示节点是否有权限参与选举，最大可以配置7个副本节点参与选举</p><h2 id="副本集状态" tabindex="-1">副本集状态 <a class="header-anchor" href="#副本集状态" aria-label="Permalink to &quot;副本集状态&quot;">​</a></h2><table><thead><tr><th style="text-align:left;">Number</th><th style="text-align:left;">Name</th><th style="text-align:left;">State Description</th></tr></thead><tbody><tr><td style="text-align:left;">0</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.STARTUP" target="_blank" rel="noreferrer"><code>STARTUP</code></a></td><td style="text-align:left;">Not yet an active member of any set. All members start up in this state. The <a href="https://docs.mongodb.com/v5.0/reference/program/mongod/#mongodb-binary-bin.mongod" target="_blank" rel="noreferrer"><code>mongod</code></a> parses the <a href="https://docs.mongodb.com/v5.0/administration/replica-set-member-configuration/" target="_blank" rel="noreferrer">replica set configuration document</a> while in <a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.STARTUP" target="_blank" rel="noreferrer"><code>STARTUP</code></a>.</td></tr><tr><td style="text-align:left;">1</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.PRIMARY" target="_blank" rel="noreferrer"><code>PRIMARY</code></a></td><td style="text-align:left;">The member in state <a href="https://docs.mongodb.com/v5.0/core/replica-set-primary/" target="_blank" rel="noreferrer">primary</a> is the only member that can accept write operations. Eligible to vote.</td></tr><tr><td style="text-align:left;">2</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.SECONDARY" target="_blank" rel="noreferrer"><code>SECONDARY</code></a></td><td style="text-align:left;">A member in state <a href="https://docs.mongodb.com/v5.0/core/replica-set-secondary/" target="_blank" rel="noreferrer">secondary</a> is replicating the data store. Eligible to vote.</td></tr><tr><td style="text-align:left;">3</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.RECOVERING" target="_blank" rel="noreferrer"><code>RECOVERING</code></a></td><td style="text-align:left;">Members either perform startup self-checks, or transition from completing a <a href="https://docs.mongodb.com/v5.0/core/replica-set-rollbacks/" target="_blank" rel="noreferrer">rollback</a> or <a href="https://docs.mongodb.com/v5.0/tutorial/resync-replica-set-member/" target="_blank" rel="noreferrer">resync</a>. Data is not available for reads from this member. Eligible to vote.</td></tr><tr><td style="text-align:left;">5</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.STARTUP2" target="_blank" rel="noreferrer"><code>STARTUP2</code></a></td><td style="text-align:left;">The member has joined the set and is running an initial sync. Eligible to vote.NOTEStarting in MongoDB 5.0, if the member was newly added to the replica set, it is not eligible to vote and cannot be elected during the initial sync process.</td></tr><tr><td style="text-align:left;">6</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.UNKNOWN" target="_blank" rel="noreferrer"><code>UNKNOWN</code></a></td><td style="text-align:left;">The member&#39;s state, as seen from another member of the set, is not yet known.</td></tr><tr><td style="text-align:left;">7</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.ARBITER" target="_blank" rel="noreferrer"><code>ARBITER</code></a></td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/core/replica-set-members/#std-label-replica-set-arbiters" target="_blank" rel="noreferrer">Arbiters</a> do not replicate data and exist solely to participate in elections. Eligible to vote.</td></tr><tr><td style="text-align:left;">8</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.DOWN" target="_blank" rel="noreferrer"><code>DOWN</code></a></td><td style="text-align:left;">The member, as seen from another member of the set, is unreachable.</td></tr><tr><td style="text-align:left;">9</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.ROLLBACK" target="_blank" rel="noreferrer"><code>ROLLBACK</code></a></td><td style="text-align:left;">This member is actively performing a <a href="https://docs.mongodb.com/v5.0/core/replica-set-rollbacks/" target="_blank" rel="noreferrer">rollback</a>. Eligible to vote. Data is not available for reads from this member.Starting in version 4.2, MongoDB kills all in-progress user operations when a member enters the <a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.ROLLBACK" target="_blank" rel="noreferrer"><code>ROLLBACK</code></a> state.</td></tr><tr><td style="text-align:left;">10</td><td style="text-align:left;"><a href="https://docs.mongodb.com/v5.0/reference/replica-states/#mongodb-replstate-replstate.REMOVED" target="_blank" rel="noreferrer"><code>REMOVED</code></a></td><td style="text-align:left;">This member was once in a replica set but was subsequently removed</td></tr></tbody></table><h1 id="_3-副本集写跟读特性" tabindex="-1">3.副本集写跟读特性 <a class="header-anchor" href="#_3-副本集写跟读特性" aria-label="Permalink to &quot;3.副本集写跟读特性&quot;">​</a></h1><p>副本集写关注是指写入一条数据，主节点处理完成后，需要其他承载数据的副本节点也确认写成功后，才能给客户端返回写入数据成功。</p><p>这个功能主要是解决主节点挂掉后，数据还未来得及同步到副本节点，而导致数据丢失的问题。</p><p>可以配置节点个数，默认配置 {“w”：1}，这样表示主节点写入数据成功即可给客户端返回成功，“w” 配置为2，则表示除了主节点，还需要收到其中一个副本节点返回写入成功，“w” 还可以配置为 &quot;majority&quot;，表示需要集群中大多数承载数据且有选举权限的节点返回写入成功。</p><p>如下图所示，P-S-S 结构（一个 primary 节点，两个 secondary 节点），写请求里面带了w : “majority&quot; ，那么主节点写入完成后，数据同步到第一个副本节点，且第一个副本节点回复数据写入成功后，才给客户端返回成功</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100943712.jpg" alt=""></p><h2 id="写" tabindex="-1">写 <a class="header-anchor" href="#写" aria-label="Permalink to &quot;写&quot;">​</a></h2><ul><li>1.在写请求中指定 writeConcern 相关参数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.products.insert(</span></span>
<span class="line"><span style="color:#e1e4e8;">    { item: &quot;envelopes&quot;, qty : 100, type: &quot;Clasp&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">    { writeConcern: { w: &quot;majority&quot; , wtimeout: 5000 } }</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.products.insert(</span></span>
<span class="line"><span style="color:#24292e;">    { item: &quot;envelopes&quot;, qty : 100, type: &quot;Clasp&quot; },</span></span>
<span class="line"><span style="color:#24292e;">    { writeConcern: { w: &quot;majority&quot; , wtimeout: 5000 } }</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div><ul><li>2.修改副本集 getLastErrorDefaults 配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cfg = rs.conf()</span></span>
<span class="line"><span style="color:#e1e4e8;">cfg.settings.getLastErrorDefaults = { w: &quot;majority&quot;, wtimeout: 5000 }</span></span>
<span class="line"><span style="color:#e1e4e8;">rs.reconfig(cfg)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cfg = rs.conf()</span></span>
<span class="line"><span style="color:#24292e;">cfg.settings.getLastErrorDefaults = { w: &quot;majority&quot;, wtimeout: 5000 }</span></span>
<span class="line"><span style="color:#24292e;">rs.reconfig(cfg)</span></span></code></pre></div><h2 id="读" tabindex="-1">读 <a class="header-anchor" href="#读" aria-label="Permalink to &quot;读&quot;">​</a></h2><p>读跟写不一样，为了保持一致性，写只能通过主节点，但读可以选择主节点，也可以选择副本节点，区别是主节点数据最新，副本节点因为同步问题可能会有延迟，但从副本节点读取数据可以分散对主节点的压力</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100943893.jpg" alt=""></p><p>因为承载数据的节点会有多个，那客户端如何选择从那个节点读呢？</p><p>主要有3个条件（Tag Sets、 maxStalenessSeconds、Hedged Read），5种模式（primary、primaryPreferred、secondary、secondaryPreferred、nearest）</p><h3 id="_5种模式" tabindex="-1">5种模式 <a class="header-anchor" href="#_5种模式" aria-label="Permalink to &quot;5种模式&quot;">​</a></h3><table><thead><tr><th><strong>模式</strong></th><th><strong>特点</strong></th></tr></thead><tbody><tr><td>primary</td><td>所有读请求都从主节点读取</td></tr><tr><td>primaryPreferred</td><td>主节点正常，则所有读请求都从主节点读取，如果主节点挂掉，则从符合条件的副本节点读取</td></tr><tr><td>secondary</td><td>所有读请求都从副本节点读取</td></tr><tr><td>secondaryPreferred</td><td>所有读请求都从副本节点读取，但如果副本节点都挂掉了，那就从主节点读取</td></tr><tr><td>nearest</td><td>主要看网络延迟，选取延迟最小的节点，主节点跟副本节点均可</td></tr></tbody></table><h3 id="_3个条件" tabindex="-1">3个条件 <a class="header-anchor" href="#_3个条件" aria-label="Permalink to &quot;3个条件&quot;">​</a></h3><p>条件是在符合模式的基础上，再根据条件删选具体的节点</p><ol><li><p>Tag Sets（标签）</p><p>顾名思义，这个可以给节点加上标签，然后查找数据时，可以根据标签选择对应的节点，然后在该节点查找数据。可以通过mongo shell 使用 rs.conf() 查看当前每个节点下面的 tags， 修改或者添加tags 过程同上面修改 getLastErrorDefaults 配置 ，如：<code>cfg.members[n].tags = { &quot;region&quot;: &quot;South&quot;, &quot;datacenter&quot;: &quot;A&quot; }</code></p></li><li><p>maxStalenessSeconds （可容忍的最大同步延迟）</p><p>顾名思义+1，这个值是指副本节点同步主节点写入的时间 跟 主节点实际最近写入时间的对比值，如果主节点挂掉了，那就跟副本集中最新写入的时间做对比。</p><p>这个值建议设置，避免因为部分副本节点网络原因导致比较长时间未同步主节点数据，然后读到比较老的数据。特别注意的是该值需要设置 90s 以上，因为客户端是定时去校验副本节点的同步延迟时间，数据不会特别准确，设置比 90s 小，会抛出异常。</p></li><li><p>Hedged Read （对冲读取）</p><p>该选项是在分片集群 MongoDB 4.4 版本后才支持，指 mongos 实例路由读取请求时会同时发给两个符合条件的副本集节点，然后那个先返回结果就返回这个结果给客户端</p></li></ol><h4 id="查询请求中如何" tabindex="-1">查询请求中如何 <a class="header-anchor" href="#查询请求中如何" aria-label="Permalink to &quot;查询请求中如何&quot;">​</a></h4><p>代码中连接数据库，使用 connection string uri 时，可以加上下面的这三个参数</p><table><thead><tr><th><strong>参数</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td>readPreference</td><td>模式，枚举值有：primary（默认值）、 primaryPreferred、secondary、secondaryPreferred、nearest</td></tr><tr><td>maxStalenessSeconds</td><td>最大同步延时秒数，取值0 - 90 会报错， -1 表示没有最大值</td></tr><tr><td>readPreferenceTags</td><td>标签，如果标签是 { &quot;dc&quot;: &quot;ny&quot;, &quot;rack&quot;: &quot;r1&quot; }, 则在uri 为 readPreferenceTags=dc:ny,rack:r1</td></tr></tbody></table><p>例如下面：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongodb://db0.example.com,db1.example.com,db2.example.com/?replicaSet=myRepl&amp;readPreference=secondary&amp;maxStalenessSeconds=120&amp;readPreferenceTags=dc:ny,rack:r1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongodb://db0.example.com,db1.example.com,db2.example.com/?replicaSet=myRepl&amp;readPreference=secondary&amp;maxStalenessSeconds=120&amp;readPreferenceTags=dc:ny,rack:r1</span></span></code></pre></div><p>在mogo shell 中，可以使用 <a href="https://docs.mongodb.com/manual/reference/method/cursor.readPref/#cursor.readPref" target="_blank" rel="noreferrer">cursor.readPref() </a>或者 <a href="https://docs.mongodb.com/manual/reference/method/Mongo.setReadPref/#Mongo.setReadPref" target="_blank" rel="noreferrer">Mongo.setReadPref()</a></p><p>cursor.readPref() 参数分别为： mode、tag set、hedge options, 具体请求例如下面这样</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.collection.find({ }).readPref(</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;secondary&quot;,                      // mode</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ { &quot;datacenter&quot;: &quot;B&quot; },  { } ],  // tag set</span></span>
<span class="line"><span style="color:#e1e4e8;">    { enabled: true }                 // hedge options</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.collection.find({ }).readPref(</span></span>
<span class="line"><span style="color:#24292e;">    &quot;secondary&quot;,                      // mode</span></span>
<span class="line"><span style="color:#24292e;">    [ { &quot;datacenter&quot;: &quot;B&quot; },  { } ],  // tag set</span></span>
<span class="line"><span style="color:#24292e;">    { enabled: true }                 // hedge options</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div><p>Mongo.setReadPref() 类似，只是预先设置请求条件，这样就不用每个请求后面带上 readPref 条件</p><h3 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h3><ol><li><p>登录主节点： <code>mongo localhost:27018</code></p></li><li><p>插入一条数据： <code>db.nums.insert({name: “num0”})</code></p><p>在当前节点查询: <code>db.nums.find()</code></p><p>可以看到本条数据： <code>{ &quot;_id&quot; : ObjectId(&quot;5f958687233b11771912ced5&quot;), &quot;name&quot; : &quot;num0&quot; }</code></p></li><li><p>登录副本节点： <code>mongo localhost:27019</code></p><p>查询：<code>db.nums.find()</code></p><p>因为查询模式默认为 primary，所以在副本节点查询会报错，如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Error: error: {</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;operationTime&quot; : Timestamp(1603788383, 1),</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;ok&quot; : 0,</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;errmsg&quot; : &quot;not master and slaveOk=false&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;code&quot; : 13435,</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;codeName&quot; : &quot;NotMasterNoSlaveOk&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;"> &quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">     &quot;clusterTime&quot; : Timestamp(1603788383, 1),</span></span>
<span class="line"><span style="color:#e1e4e8;">     &quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">         &quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">         &quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Error: error: {</span></span>
<span class="line"><span style="color:#24292e;"> &quot;operationTime&quot; : Timestamp(1603788383, 1),</span></span>
<span class="line"><span style="color:#24292e;"> &quot;ok&quot; : 0,</span></span>
<span class="line"><span style="color:#24292e;"> &quot;errmsg&quot; : &quot;not master and slaveOk=false&quot;,</span></span>
<span class="line"><span style="color:#24292e;"> &quot;code&quot; : 13435,</span></span>
<span class="line"><span style="color:#24292e;"> &quot;codeName&quot; : &quot;NotMasterNoSlaveOk&quot;,</span></span>
<span class="line"><span style="color:#24292e;"> &quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">     &quot;clusterTime&quot; : Timestamp(1603788383, 1),</span></span>
<span class="line"><span style="color:#24292e;">     &quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">         &quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#24292e;">         &quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>查询时指定模式为 “secondary”： <code>db.nums.find().readPref(“secondary&quot;)</code></p><p>就可以查询到插入的数据：<code>{ &quot;_id&quot; : ObjectId(&quot;5f958687233b11771912ced5&quot;), &quot;name&quot; : &quot;num0&quot; }</code></p></li></ol><h1 id="_4-安装" tabindex="-1">4.安装 <a class="header-anchor" href="#_4-安装" aria-label="Permalink to &quot;4.安装&quot;">​</a></h1><p>官方文档：<a href="https://docs.mongodb.com/manual/tutorial/deploy-replica-set/" target="_blank" rel="noreferrer">https://docs.mongodb.com/manual/tutorial/deploy-replica-set/</a></p><p>3.6开始支持副本</p><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><p>三台机器一样的配置，一主2从</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt;&gt; /etc/mongod.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">systemLog:</span></span>
<span class="line"><span style="color:#e1e4e8;">    quiet: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    path: &quot;/data/mongodb_data/log/mongod.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    logRotate: rename</span></span>
<span class="line"><span style="color:#e1e4e8;">    logAppend: true   </span></span>
<span class="line"><span style="color:#e1e4e8;">    destination: file</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeStampFormat: ctime</span></span>
<span class="line"><span style="color:#e1e4e8;">    #timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#e1e4e8;">processManagement:</span></span>
<span class="line"><span style="color:#e1e4e8;">    fork: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    pidFilePath: &quot;/data/mongodb_data/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">storage:</span></span>
<span class="line"><span style="color:#e1e4e8;">    dbPath: &quot;/data/mongodb_data/data&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    indexBuildRetry: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    journal:</span></span>
<span class="line"><span style="color:#e1e4e8;">        enabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">        commitIntervalMs: 100</span></span>
<span class="line"><span style="color:#e1e4e8;">    directoryPerDB: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    syncPeriodSecs: 60</span></span>
<span class="line"><span style="color:#e1e4e8;">    engine: wiredTiger</span></span>
<span class="line"><span style="color:#e1e4e8;">    wiredTiger:</span></span>
<span class="line"><span style="color:#e1e4e8;">        engineConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            cacheSizeGB: 12</span></span>
<span class="line"><span style="color:#e1e4e8;">            statisticsLogDelaySecs: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">            journalCompressor: snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">            directoryForIndexes: true</span></span>
<span class="line"><span style="color:#e1e4e8;">        collectionConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            blockCompressor: snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">        indexConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            prefixCompression: true</span></span>
<span class="line"><span style="color:#e1e4e8;">net:  </span></span>
<span class="line"><span style="color:#e1e4e8;">    bindIp: 192.168.1.10,127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 47017</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIncomingConnections: 52528</span></span>
<span class="line"><span style="color:#e1e4e8;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    ipv6: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    unixDomainSocket:</span></span>
<span class="line"><span style="color:#e1e4e8;">        enabled: false</span></span>
<span class="line"><span style="color:#e1e4e8;">operationProfiling:</span></span>
<span class="line"><span style="color:#e1e4e8;">    slowOpThresholdMs: 200</span></span>
<span class="line"><span style="color:#e1e4e8;">    mode: slowOp</span></span>
<span class="line"><span style="color:#e1e4e8;">security:</span></span>
<span class="line"><span style="color:#e1e4e8;">    authorization: disabled</span></span>
<span class="line"><span style="color:#e1e4e8;">    #clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#e1e4e8;">    #keyFile: &quot;/home/mongod/keyfile&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">setParameter:</span></span>
<span class="line"><span style="color:#e1e4e8;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#e1e4e8;">replication:</span></span>
<span class="line"><span style="color:#e1e4e8;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#e1e4e8;">    replSetName: configRS</span></span>
<span class="line"><span style="color:#e1e4e8;">    secondaryIndexPrefetch: all</span></span>
<span class="line"><span style="color:#e1e4e8;">#sharding:</span></span>
<span class="line"><span style="color:#e1e4e8;">    #clusterRole: configsvr</span></span>
<span class="line"><span style="color:#e1e4e8;">    #archiveMovedChunks: true</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt;&gt; /etc/mongod.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">systemLog:</span></span>
<span class="line"><span style="color:#24292e;">    quiet: false</span></span>
<span class="line"><span style="color:#24292e;">    path: &quot;/data/mongodb_data/log/mongod.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">    logRotate: rename</span></span>
<span class="line"><span style="color:#24292e;">    logAppend: true   </span></span>
<span class="line"><span style="color:#24292e;">    destination: file</span></span>
<span class="line"><span style="color:#24292e;">    timeStampFormat: ctime</span></span>
<span class="line"><span style="color:#24292e;">    #timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#24292e;">processManagement:</span></span>
<span class="line"><span style="color:#24292e;">    fork: true</span></span>
<span class="line"><span style="color:#24292e;">    pidFilePath: &quot;/data/mongodb_data/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#24292e;">storage:</span></span>
<span class="line"><span style="color:#24292e;">    dbPath: &quot;/data/mongodb_data/data&quot;</span></span>
<span class="line"><span style="color:#24292e;">    indexBuildRetry: true</span></span>
<span class="line"><span style="color:#24292e;">    journal:</span></span>
<span class="line"><span style="color:#24292e;">        enabled: true</span></span>
<span class="line"><span style="color:#24292e;">        commitIntervalMs: 100</span></span>
<span class="line"><span style="color:#24292e;">    directoryPerDB: true</span></span>
<span class="line"><span style="color:#24292e;">    syncPeriodSecs: 60</span></span>
<span class="line"><span style="color:#24292e;">    engine: wiredTiger</span></span>
<span class="line"><span style="color:#24292e;">    wiredTiger:</span></span>
<span class="line"><span style="color:#24292e;">        engineConfig:</span></span>
<span class="line"><span style="color:#24292e;">            cacheSizeGB: 12</span></span>
<span class="line"><span style="color:#24292e;">            statisticsLogDelaySecs: 0</span></span>
<span class="line"><span style="color:#24292e;">            journalCompressor: snappy</span></span>
<span class="line"><span style="color:#24292e;">            directoryForIndexes: true</span></span>
<span class="line"><span style="color:#24292e;">        collectionConfig:</span></span>
<span class="line"><span style="color:#24292e;">            blockCompressor: snappy</span></span>
<span class="line"><span style="color:#24292e;">        indexConfig:</span></span>
<span class="line"><span style="color:#24292e;">            prefixCompression: true</span></span>
<span class="line"><span style="color:#24292e;">net:  </span></span>
<span class="line"><span style="color:#24292e;">    bindIp: 192.168.1.10,127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">    port: 47017</span></span>
<span class="line"><span style="color:#24292e;">    maxIncomingConnections: 52528</span></span>
<span class="line"><span style="color:#24292e;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#24292e;">    ipv6: false</span></span>
<span class="line"><span style="color:#24292e;">    unixDomainSocket:</span></span>
<span class="line"><span style="color:#24292e;">        enabled: false</span></span>
<span class="line"><span style="color:#24292e;">operationProfiling:</span></span>
<span class="line"><span style="color:#24292e;">    slowOpThresholdMs: 200</span></span>
<span class="line"><span style="color:#24292e;">    mode: slowOp</span></span>
<span class="line"><span style="color:#24292e;">security:</span></span>
<span class="line"><span style="color:#24292e;">    authorization: disabled</span></span>
<span class="line"><span style="color:#24292e;">    #clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#24292e;">    #keyFile: &quot;/home/mongod/keyfile&quot;</span></span>
<span class="line"><span style="color:#24292e;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#24292e;">setParameter:</span></span>
<span class="line"><span style="color:#24292e;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#24292e;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#24292e;">replication:</span></span>
<span class="line"><span style="color:#24292e;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#24292e;">    replSetName: configRS</span></span>
<span class="line"><span style="color:#24292e;">    secondaryIndexPrefetch: all</span></span>
<span class="line"><span style="color:#24292e;">#sharding:</span></span>
<span class="line"><span style="color:#24292e;">    #clusterRole: configsvr</span></span>
<span class="line"><span style="color:#24292e;">    #archiveMovedChunks: true</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div><p>重启三台mongodb服务</p><h2 id="副本集初始化" tabindex="-1">副本集初始化 <a class="header-anchor" href="#副本集初始化" aria-label="Permalink to &quot;副本集初始化&quot;">​</a></h2><ul><li>登陆任意一台mongo，执行如下操作</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rs.initiate( {</span></span>
<span class="line"><span style="color:#e1e4e8;">   _id : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">   members: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 0, host: &quot;192.168.122.245:47017&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 1, host: &quot;192.168.122.246:47017&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 2, host: &quot;192.168.122.14:47017&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">   ]</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rs.initiate( {</span></span>
<span class="line"><span style="color:#24292e;">   _id : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#24292e;">   members: [</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 0, host: &quot;192.168.122.245:47017&quot; },</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 1, host: &quot;192.168.122.246:47017&quot; },</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 2, host: &quot;192.168.122.14:47017&quot; }</span></span>
<span class="line"><span style="color:#24292e;">   ]</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><ul><li>master</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; show dbs</span></span>
<span class="line"><span style="color:#e1e4e8;">admin   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">config  0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">local   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; show dbs</span></span>
<span class="line"><span style="color:#24292e;">admin   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">config  0.000GB</span></span>
<span class="line"><span style="color:#24292e;">local   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;</span></span></code></pre></div><ul><li>slave</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:SECONDARY&gt; rs.slaveOk()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:SECONDARY&gt; rs.secondaryOk()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:SECONDARY&gt; rs.slaveOk()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:SECONDARY&gt; rs.secondaryOk()</span></span></code></pre></div><h3 id="测试效果" tabindex="-1">测试效果 <a class="header-anchor" href="#测试效果" aria-label="Permalink to &quot;测试效果&quot;">​</a></h3><ul><li>master</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db test</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;  db.user1.insertMany([{ id:3,name:&quot;peter&quot;,age:14 },{ id:4,name:&quot;tom&quot;,age:13 },{ id:5,name:&quot;ben&quot;,age:24 }])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或着</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; for(var i=0;i&lt;10000;i++){db.customer.insert({&quot;name&quot;:&quot;user&quot;+i})}</span></span>
<span class="line"><span style="color:#e1e4e8;">WriteResult({ &quot;nInserted&quot; : 1 })</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; db.customer.count()</span></span>
<span class="line"><span style="color:#e1e4e8;">10000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; use test;</span></span>
<span class="line"><span style="color:#24292e;">switched to db test</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;  db.user1.insertMany([{ id:3,name:&quot;peter&quot;,age:14 },{ id:4,name:&quot;tom&quot;,age:13 },{ id:5,name:&quot;ben&quot;,age:24 }])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或着</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; for(var i=0;i&lt;10000;i++){db.customer.insert({&quot;name&quot;:&quot;user&quot;+i})}</span></span>
<span class="line"><span style="color:#24292e;">WriteResult({ &quot;nInserted&quot; : 1 })</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; db.customer.count()</span></span>
<span class="line"><span style="color:#24292e;">10000</span></span></code></pre></div><ul><li>slave</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:SECONDARY&gt; show dbs;</span></span>
<span class="line"><span style="color:#e1e4e8;">admin   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">config  0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">local   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">test    0.000GB</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">configRS:SECONDARY&gt; show dbs;</span></span>
<span class="line"><span style="color:#24292e;">admin   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">config  0.000GB</span></span>
<span class="line"><span style="color:#24292e;">local   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">test    0.000GB</span></span></code></pre></div><h2 id="故障转移测试" tabindex="-1">故障转移测试 <a class="header-anchor" href="#故障转移测试" aria-label="Permalink to &quot;故障转移测试&quot;">​</a></h2><p>把其中任意节点关闭</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongod --shutdown --dbpath /data/mongodb_data/data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:SECONDARY&gt;use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:SECONDARY&gt; db.shutdownServer()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongod --shutdown --dbpath /data/mongodb_data/data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:SECONDARY&gt;use admin</span></span>
<span class="line"><span style="color:#24292e;">configRS:SECONDARY&gt; db.shutdownServer()</span></span></code></pre></div><h2 id="查看属性" tabindex="-1">查看属性 <a class="header-anchor" href="#查看属性" aria-label="Permalink to &quot;查看属性&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.conf()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;_id&quot; : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;version&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;term&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;members&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;_id&quot; : 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;host&quot; : &quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;arbiterOnly&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;buildIndexes&quot; : true,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hidden&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;priority&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;tags&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">				</span></span>
<span class="line"><span style="color:#e1e4e8;">			},</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;secondaryDelaySecs&quot; : NumberLong(0),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;votes&quot; : 1</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;_id&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;host&quot; : &quot;192.168.122.246:47017&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;arbiterOnly&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;buildIndexes&quot; : true,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hidden&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;priority&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;tags&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">				</span></span>
<span class="line"><span style="color:#e1e4e8;">			},</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;secondaryDelaySecs&quot; : NumberLong(0),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;votes&quot; : 1</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;_id&quot; : 2,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;host&quot; : &quot;192.168.122.14:47017&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;arbiterOnly&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;buildIndexes&quot; : true,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hidden&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;priority&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;tags&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">				</span></span>
<span class="line"><span style="color:#e1e4e8;">			},</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;secondaryDelaySecs&quot; : NumberLong(0),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;votes&quot; : 1</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	],</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;protocolVersion&quot; : NumberLong(1),</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;writeConcernMajorityJournalDefault&quot; : true,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;settings&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;chainingAllowed&quot; : true,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;heartbeatIntervalMillis&quot; : 2000,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;heartbeatTimeoutSecs&quot; : 10,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;electionTimeoutMillis&quot; : 10000,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;catchUpTimeoutMillis&quot; : -1,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;catchUpTakeoverDelayMillis&quot; : 30000,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;getLastErrorModes&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;getLastErrorDefaults&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;w&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;wtimeout&quot; : 0</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;replicaSetId&quot; : ObjectId(&quot;61d3d523406b36cb0b6f7710&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.conf()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;_id&quot; : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;version&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;term&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;members&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;_id&quot; : 0,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;host&quot; : &quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;arbiterOnly&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;buildIndexes&quot; : true,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hidden&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;priority&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;tags&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">				</span></span>
<span class="line"><span style="color:#24292e;">			},</span></span>
<span class="line"><span style="color:#24292e;">			&quot;secondaryDelaySecs&quot; : NumberLong(0),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;votes&quot; : 1</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;_id&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;host&quot; : &quot;192.168.122.246:47017&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;arbiterOnly&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;buildIndexes&quot; : true,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hidden&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;priority&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;tags&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">				</span></span>
<span class="line"><span style="color:#24292e;">			},</span></span>
<span class="line"><span style="color:#24292e;">			&quot;secondaryDelaySecs&quot; : NumberLong(0),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;votes&quot; : 1</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;_id&quot; : 2,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;host&quot; : &quot;192.168.122.14:47017&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;arbiterOnly&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;buildIndexes&quot; : true,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hidden&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;priority&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;tags&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">				</span></span>
<span class="line"><span style="color:#24292e;">			},</span></span>
<span class="line"><span style="color:#24292e;">			&quot;secondaryDelaySecs&quot; : NumberLong(0),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;votes&quot; : 1</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	],</span></span>
<span class="line"><span style="color:#24292e;">	&quot;protocolVersion&quot; : NumberLong(1),</span></span>
<span class="line"><span style="color:#24292e;">	&quot;writeConcernMajorityJournalDefault&quot; : true,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;settings&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;chainingAllowed&quot; : true,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;heartbeatIntervalMillis&quot; : 2000,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;heartbeatTimeoutSecs&quot; : 10,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;electionTimeoutMillis&quot; : 10000,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;catchUpTimeoutMillis&quot; : -1,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;catchUpTakeoverDelayMillis&quot; : 30000,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;getLastErrorModes&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		&quot;getLastErrorDefaults&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;w&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;wtimeout&quot; : 0</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		&quot;replicaSetId&quot; : ObjectId(&quot;61d3d523406b36cb0b6f7710&quot;)</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="查看master属性" tabindex="-1">查看master属性 <a class="header-anchor" href="#查看master属性" aria-label="Permalink to &quot;查看master属性&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; db.isMaster()</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;topologyVersion&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;processId&quot; : ObjectId(&quot;61d3c63b406b36cb0b6f7626&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;counter&quot; : NumberLong(6)</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;hosts&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;192.168.122.246:47017&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;192.168.122.14:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	],</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;setName&quot; : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;setVersion&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ismaster&quot; : true,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;secondary&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;primary&quot; : &quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;me&quot; : &quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;electionId&quot; : ObjectId(&quot;7fffffff0000000000000001&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;lastWrite&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;opTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;ts&quot; : Timestamp(1641273262, 1),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;t&quot; : NumberLong(1)</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;lastWriteDate&quot; : ISODate(&quot;2022-01-04T05:14:22Z&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;majorityOpTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;ts&quot; : Timestamp(1641273262, 1),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;t&quot; : NumberLong(1)</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;majorityWriteDate&quot; : ISODate(&quot;2022-01-04T05:14:22Z&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxBsonObjectSize&quot; : 16777216,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxMessageSizeBytes&quot; : 48000000,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxWriteBatchSize&quot; : 100000,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;localTime&quot; : ISODate(&quot;2022-01-04T05:14:28.349Z&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;logicalSessionTimeoutMinutes&quot; : 30,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;connectionId&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;minWireVersion&quot; : 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxWireVersion&quot; : 13,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;readOnly&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;clusterTime&quot; : Timestamp(1641273262, 1),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;operationTime&quot; : Timestamp(1641273262, 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; db.isMaster()</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;topologyVersion&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;processId&quot; : ObjectId(&quot;61d3c63b406b36cb0b6f7626&quot;),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;counter&quot; : NumberLong(6)</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;hosts&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		&quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;192.168.122.246:47017&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;192.168.122.14:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">	],</span></span>
<span class="line"><span style="color:#24292e;">	&quot;setName&quot; : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;setVersion&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ismaster&quot; : true,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;secondary&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;primary&quot; : &quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;me&quot; : &quot;192.168.122.245:47017&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;electionId&quot; : ObjectId(&quot;7fffffff0000000000000001&quot;),</span></span>
<span class="line"><span style="color:#24292e;">	&quot;lastWrite&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;opTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;ts&quot; : Timestamp(1641273262, 1),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;t&quot; : NumberLong(1)</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		&quot;lastWriteDate&quot; : ISODate(&quot;2022-01-04T05:14:22Z&quot;),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;majorityOpTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;ts&quot; : Timestamp(1641273262, 1),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;t&quot; : NumberLong(1)</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		&quot;majorityWriteDate&quot; : ISODate(&quot;2022-01-04T05:14:22Z&quot;)</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxBsonObjectSize&quot; : 16777216,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxMessageSizeBytes&quot; : 48000000,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxWriteBatchSize&quot; : 100000,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;localTime&quot; : ISODate(&quot;2022-01-04T05:14:28.349Z&quot;),</span></span>
<span class="line"><span style="color:#24292e;">	&quot;logicalSessionTimeoutMinutes&quot; : 30,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;connectionId&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;minWireVersion&quot; : 0,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxWireVersion&quot; : 13,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;readOnly&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;clusterTime&quot; : Timestamp(1641273262, 1),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;operationTime&quot; : Timestamp(1641273262, 1)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>查看副本集状态</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.status()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.status()</span></span></code></pre></div><h3 id="查看当前副本状态" tabindex="-1">查看当前副本状态 <a class="header-anchor" href="#查看当前副本状态" aria-label="Permalink to &quot;查看当前副本状态&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;rs.status().members.forEach( </span></span>
<span class="line"><span style="color:#e1e4e8;">    function(z){ </span></span>
<span class="line"><span style="color:#e1e4e8;">            printjson(z.name);</span></span>
<span class="line"><span style="color:#e1e4e8;">            printjson(z.stateStr);</span></span>
<span class="line"><span style="color:#e1e4e8;">    } </span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.245:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.246:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;PRIMARY&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.14:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#其中一个slave掉线</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.245:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.246:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;PRIMARY&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.14:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;(not reachable/healthy)&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;rs.status().members.forEach( </span></span>
<span class="line"><span style="color:#24292e;">    function(z){ </span></span>
<span class="line"><span style="color:#24292e;">            printjson(z.name);</span></span>
<span class="line"><span style="color:#24292e;">            printjson(z.stateStr);</span></span>
<span class="line"><span style="color:#24292e;">    } </span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.245:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.246:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;PRIMARY&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.14:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#其中一个slave掉线</span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.245:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.246:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;PRIMARY&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.14:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;(not reachable/healthy)&quot;</span></span></code></pre></div><h1 id="副本集" tabindex="-1">副本集 <a class="header-anchor" href="#副本集" aria-label="Permalink to &quot;副本集&quot;">​</a></h1><h2 id="删除" tabindex="-1">删除 <a class="header-anchor" href="#删除" aria-label="Permalink to &quot;删除&quot;">​</a></h2><p>两种方式，使用rs.remove()或rs.reconfig()</p><h3 id="rs-remove" tabindex="-1"><strong>rs.remove</strong> <a class="header-anchor" href="#rs-remove" aria-label="Permalink to &quot;**rs.remove**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.remove(&quot;192.168.122.14:47017&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;clusterTime&quot; : Timestamp(1641273945, 1),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;operationTime&quot; : Timestamp(1641273945, 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看副本状态</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.status().members.forEach(     function(z){              printjson(z.name);             printjson(z.stateStr);     }  )</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.245:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;192.168.122.246:47017&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;PRIMARY&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.remove(&quot;192.168.122.14:47017&quot;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;clusterTime&quot; : Timestamp(1641273945, 1),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;operationTime&quot; : Timestamp(1641273945, 1)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看副本状态</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.status().members.forEach(     function(z){              printjson(z.name);             printjson(z.stateStr);     }  )</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.245:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;SECONDARY&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;192.168.122.246:47017&quot;</span></span>
<span class="line"><span style="color:#24292e;">&quot;PRIMARY&quot;</span></span></code></pre></div><h3 id="rs-conf" tabindex="-1">rs.conf <a class="header-anchor" href="#rs-conf" aria-label="Permalink to &quot;rs.conf&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; cfg = rs.conf()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; cfg.members.splice(2,1)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.reconfig(cfg)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; cfg = rs.conf()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; cfg.members.splice(2,1)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.reconfig(cfg)</span></span></code></pre></div><h2 id="添加副本集" tabindex="-1">添加副本集 <a class="header-anchor" href="#添加副本集" aria-label="Permalink to &quot;添加副本集&quot;">​</a></h2><p>mongodb副本集的扩展非常好，往副本集里添加实例和移除实例都非常方便</p><p>往mongodb副本集添加实例数据能够自动同步，无需人工干预</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#清空原来数据，启动mongodb</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#rs.add的优先权重默认为1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;use admin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.add( { host: &quot;192.168.122.14:47017&quot;, priority: 0, votes: 0 } )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;clusterTime&quot; : Timestamp(1641274239, 1),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;operationTime&quot; : Timestamp(1641274239, 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.status().members.forEach(     function(z){              printjson(z.name);             printjson(z.stateStr);     }  )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#清空原来数据，启动mongodb</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#rs.add的优先权重默认为1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;use admin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.add( { host: &quot;192.168.122.14:47017&quot;, priority: 0, votes: 0 } )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;clusterTime&quot; : Timestamp(1641274239, 1),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;operationTime&quot; : Timestamp(1641274239, 1)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.status().members.forEach(     function(z){              printjson(z.name);             printjson(z.stateStr);     }  )</span></span></code></pre></div><p>如果数据量大，同步时间过长，可以考虑拷贝文件的 <a href="https://link.segmentfault.com/?enc=XoE1kDJXx8VXvqF3Wyg7qg%3D%3D.HVB1tUsxQlPyxa%2B4IXSecN8gGA2p0igrDhT0afUzLTU0i2VM5HBMQ5590bff62K73z8EFYxuphX7FfTmwFNA6kzYVsBZ0Zt7Z7Woe29VA3U%3D" target="_blank" rel="noreferrer">resync</a> 方式来进行全量同步（initial sync）</p><h3 id="重新配置优先级" tabindex="-1">重新配置优先级 <a class="header-anchor" href="#重新配置优先级" aria-label="Permalink to &quot;重新配置优先级&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">使用rs.conf()查看新成员id，查看每个实列的位置，则将其priority和votes更新为 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; conf = rs.conf()</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; conf.members[1].priority = 11</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; conf.members[2].priority = 11</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.reconfig(conf)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">使用rs.conf()查看新成员id，查看每个实列的位置，则将其priority和votes更新为 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; conf = rs.conf()</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; conf.members[1].priority = 11</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; conf.members[2].priority = 11</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.reconfig(conf)</span></span></code></pre></div><h3 id="添加仲裁" tabindex="-1"><em>添加仲裁</em> <a class="header-anchor" href="#添加仲裁" aria-label="Permalink to &quot;*添加仲裁*&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;rs.addArb(&quot;172.16.250.240:27017&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;rs.addArb(&quot;172.16.250.240:27017&quot;)</span></span></code></pre></div><h3 id="添加备份节点" tabindex="-1"><em>添加备份节点</em> <a class="header-anchor" href="#添加备份节点" aria-label="Permalink to &quot;*添加备份节点*&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;rs.add({&quot;_id&quot;:3,&quot;host&quot;:&quot;172.16.250.240:27017&quot;,&quot;priority&quot;:0,&quot;hidden&quot;:true})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;rs.add({&quot;_id&quot;:3,&quot;host&quot;:&quot;172.16.250.240:27017&quot;,&quot;priority&quot;:0,&quot;hidden&quot;:true})</span></span></code></pre></div><h2 id="节点成为primary" tabindex="-1">节点成为Primary <a class="header-anchor" href="#节点成为primary" aria-label="Permalink to &quot;节点成为Primary&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#强制让一个节点成为Primary</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cfg = rs.conf()</span></span>
<span class="line"><span style="color:#e1e4e8;">cfg.members[0].priority = 5</span></span>
<span class="line"><span style="color:#e1e4e8;">cfg.members[1].priority = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">cfg.members[2].priority = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">rs.reconfig(cfg)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#强制让一个节点成为Primary</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cfg = rs.conf()</span></span>
<span class="line"><span style="color:#24292e;">cfg.members[0].priority = 5</span></span>
<span class="line"><span style="color:#24292e;">cfg.members[1].priority = 1</span></span>
<span class="line"><span style="color:#24292e;">cfg.members[2].priority = 1</span></span>
<span class="line"><span style="color:#24292e;">rs.reconfig(cfg)</span></span></code></pre></div><h2 id="副本集监控" tabindex="-1">副本集监控 <a class="header-anchor" href="#副本集监控" aria-label="Permalink to &quot;副本集监控&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看副本集的配置信息</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.conf()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看副本集运行状态</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; rs.status()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">health:为1表示健康</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看备份节点的复制信息</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; db.printSlaveReplicationInfo()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看副本集的配置信息</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.conf()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看副本集运行状态</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; rs.status()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">health:为1表示健康</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看备份节点的复制信息</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; db.printSlaveReplicationInfo()</span></span></code></pre></div><h3 id="参数信息" tabindex="-1">参数信息 <a class="header-anchor" href="#参数信息" aria-label="Permalink to &quot;参数信息&quot;">​</a></h3><p><strong>副本集参数说明</strong></p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>_id</td><td>集群中节点编号</td></tr><tr><td>name</td><td>成员服务器名称及端口</td></tr><tr><td>health</td><td>表示成员中的健康状态（0:down;1:up）</td></tr><tr><td>state</td><td>为0~10，表示成员的当前状态</td></tr><tr><td>stateStr</td><td>描述该成员是主库（PRIMARY）还是备库（SECONDARY）</td></tr><tr><td>uptime</td><td>该成员在线时间（秒）</td></tr><tr><td>optime</td><td>成员最后一次应用日志(oplog)的信息</td></tr><tr><td>optimeDate</td><td>成员最后一次应用日志(oplog)的时间</td></tr><tr><td>electionTime</td><td>当前primary从操作日志中选举信息</td></tr><tr><td>configVersion</td><td>mongodb版本</td></tr><tr><td>self</td><td>为true 表示当前节点</td></tr></tbody></table><h2 id="查看从库状态" tabindex="-1">查看从库状态 <a class="header-anchor" href="#查看从库状态" aria-label="Permalink to &quot;查看从库状态&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># -- 获取当前集群内所有从库信息与复制延迟状态</span></span>
<span class="line"><span style="color:#e1e4e8;">dbawsp:PRIMARY&gt; rs.printSlaveReplicationInfo()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># -- 查询当前节点是否为 Master 角色</span></span>
<span class="line"><span style="color:#e1e4e8;">dbawsp:PRIMARY&gt; rs.isMaster()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># -- 获取当前集群内所有从库信息与复制延迟状态</span></span>
<span class="line"><span style="color:#24292e;">dbawsp:PRIMARY&gt; rs.printSlaveReplicationInfo()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># -- 查询当前节点是否为 Master 角色</span></span>
<span class="line"><span style="color:#24292e;">dbawsp:PRIMARY&gt; rs.isMaster()</span></span></code></pre></div><h1 id="tag标签" tabindex="-1">tag标签 <a class="header-anchor" href="#tag标签" aria-label="Permalink to &quot;tag标签&quot;">​</a></h1><ul><li>**注意：**Arbiter 节点( 仲裁节点 ) <code>无法设置标签</code></li></ul><h1 id="开启安全认证" tabindex="-1">开启安全认证 <a class="header-anchor" href="#开启安全认证" aria-label="Permalink to &quot;开启安全认证&quot;">​</a></h1><h2 id="创建用户" tabindex="-1">创建用户 <a class="header-anchor" href="#创建用户" aria-label="Permalink to &quot;创建用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#登录 PRIMARY节点创建用户</span></span>
<span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">  {</span></span>
<span class="line"><span style="color:#e1e4e8;">    user: &quot;sysadmin&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    pwd: passwordPrompt(),</span></span>
<span class="line"><span style="color:#e1e4e8;">    roles: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;clusterAdmin&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;dbAdminAnyDatabase&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;userAdminAnyDatabase&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;readWriteAnyDatabase&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者，超级管理者</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser({ user: &quot;admin&quot;, pwd: &quot;123456&quot;, roles: [{ role: &quot;root&quot;, db: &quot;admin&quot; }] })</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;db.createUser({user:&quot;admin&quot;,pwd:&quot;123456&quot;,roles:[{role:&quot;userAdminAnyDatabase&quot;,db:&quot;admin&quot;}]})</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#对test开启安全认证</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;db.createUser({user:&quot;admin&quot;,pwd:&quot;123456&quot;,roles:[{role:&quot;readWrite&quot;,db:&quot;test&quot;}]})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#登录 PRIMARY节点创建用户</span></span>
<span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">  {</span></span>
<span class="line"><span style="color:#24292e;">    user: &quot;sysadmin&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    pwd: passwordPrompt(),</span></span>
<span class="line"><span style="color:#24292e;">    roles: [</span></span>
<span class="line"><span style="color:#24292e;">    &#39;clusterAdmin&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;dbAdminAnyDatabase&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;userAdminAnyDatabase&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    &#39;readWriteAnyDatabase&#39;</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者，超级管理者</span></span>
<span class="line"><span style="color:#24292e;">db.createUser({ user: &quot;admin&quot;, pwd: &quot;123456&quot;, roles: [{ role: &quot;root&quot;, db: &quot;admin&quot; }] })</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;db.createUser({user:&quot;admin&quot;,pwd:&quot;123456&quot;,roles:[{role:&quot;userAdminAnyDatabase&quot;,db:&quot;admin&quot;}]})</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#对test开启安全认证</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;db.createUser({user:&quot;admin&quot;,pwd:&quot;123456&quot;,roles:[{role:&quot;readWrite&quot;,db:&quot;test&quot;}]})</span></span></code></pre></div><h2 id="创建keyfile文件" tabindex="-1">创建keyFile文件 <a class="header-anchor" href="#创建keyfile文件" aria-label="Permalink to &quot;创建keyFile文件&quot;">​</a></h2><ul><li>停止mogodb数据库</li></ul><p><strong>先停掉所有SECONDARY节点的MongoDB服务，然后再停掉PRIMARY节点的MongoDB服务，并在PRIMARY节点所在服务器上创建keyFile文件</strong>，之后把keyfile文件cp 到其余机器上面</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl rand -base64 745 &gt; /data/mongodb_data/keyfile</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 600 /data/mongodb_data/keyfile</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">scp keyfile 192.168.122.245:/data/mongodb_data/</span></span>
<span class="line"><span style="color:#e1e4e8;">scp keyfile 192.168.122.246:/data/mongodb_data/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl rand -base64 745 &gt; /data/mongodb_data/keyfile</span></span>
<span class="line"><span style="color:#24292e;">chmod 600 /data/mongodb_data/keyfile</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">scp keyfile 192.168.122.245:/data/mongodb_data/</span></span>
<span class="line"><span style="color:#24292e;">scp keyfile 192.168.122.246:/data/mongodb_data/</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#三台配置都添加如下</span></span>
<span class="line"><span style="color:#e1e4e8;">security:</span></span>
<span class="line"><span style="color:#e1e4e8;">    authorization: enabled</span></span>
<span class="line"><span style="color:#e1e4e8;">    clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#e1e4e8;">    keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    javascriptEnabled: true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#三台配置都添加如下</span></span>
<span class="line"><span style="color:#24292e;">security:</span></span>
<span class="line"><span style="color:#24292e;">    authorization: enabled</span></span>
<span class="line"><span style="color:#24292e;">    clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#24292e;">    keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#24292e;">    javascriptEnabled: true</span></span></code></pre></div><ul><li>测试</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#登陆任意一台机器</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mongo --host 127.0.0.1 --port 47017</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:SECONDARY&gt; db.auth(&quot;admin&quot;,&quot;123456&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:SECONDARY&gt; show dbs;</span></span>
<span class="line"><span style="color:#e1e4e8;">test  0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者 登陆时直接认证</span></span>
<span class="line"><span style="color:#e1e4e8;">mongo -uadmin -p123456 127.0.0.1:47017</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db admin</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; db.auth(&quot;admin&quot;,&quot;123456&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">1</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt; show dbs;</span></span>
<span class="line"><span style="color:#e1e4e8;">admin   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">config  0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">local   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">test    0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">mongo -u &quot;root&quot; --authenticationDatabase &quot;admin&quot; -p&#39;password&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#登陆任意一台机器</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mongo --host 127.0.0.1 --port 47017</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:SECONDARY&gt; db.auth(&quot;admin&quot;,&quot;123456&quot;)</span></span>
<span class="line"><span style="color:#24292e;">1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:SECONDARY&gt; show dbs;</span></span>
<span class="line"><span style="color:#24292e;">test  0.000GB</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者 登陆时直接认证</span></span>
<span class="line"><span style="color:#24292e;">mongo -uadmin -p123456 127.0.0.1:47017</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; use admin</span></span>
<span class="line"><span style="color:#24292e;">switched to db admin</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; db.auth(&quot;admin&quot;,&quot;123456&quot;)</span></span>
<span class="line"><span style="color:#24292e;">1</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt; show dbs;</span></span>
<span class="line"><span style="color:#24292e;">admin   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">config  0.000GB</span></span>
<span class="line"><span style="color:#24292e;">local   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">test    0.000GB</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">mongo -u &quot;root&quot; --authenticationDatabase &quot;admin&quot; -p&#39;password&#39;</span></span></code></pre></div><h2 id="连接副本集" tabindex="-1">连接副本集 <a class="header-anchor" href="#连接副本集" aria-label="Permalink to &quot;连接副本集&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave01 ~]# mongo &quot;192.168.122.245:47017,192.168.122.246:47017,192.168.122.14:47017/test?replicaSet=configRS&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">MongoDB shell version v5.0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">connecting to: mongodb://192.168.122.245:47017,192.168.122.246:47017,192.168.122.14:47017/test%3FreplicaSet%3DconfigRS?compressors=disabled&amp;gssapiServiceName=mongodb</span></span>
<span class="line"><span style="color:#e1e4e8;">Implicit session: session { &quot;id&quot; : UUID(&quot;8773dc9f-6373-49a3-8869-07b98064875e&quot;) }</span></span>
<span class="line"><span style="color:#e1e4e8;">MongoDB server version: 5.0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">================</span></span>
<span class="line"><span style="color:#e1e4e8;">Warning: the &quot;mongo&quot; shell has been superseded by &quot;mongosh&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">which delivers improved usability and compatibility.The &quot;mongo&quot; shell has been deprecated and will be removed in</span></span>
<span class="line"><span style="color:#e1e4e8;">an upcoming release.</span></span>
<span class="line"><span style="color:#e1e4e8;">For installation instructions, see</span></span>
<span class="line"><span style="color:#e1e4e8;">https://docs.mongodb.com/mongodb-shell/install/</span></span>
<span class="line"><span style="color:#e1e4e8;">================</span></span>
<span class="line"><span style="color:#e1e4e8;">configRS:PRIMARY&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave01 ~]# mongo &quot;192.168.122.245:47017,192.168.122.246:47017,192.168.122.14:47017/test?replicaSet=configRS&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">MongoDB shell version v5.0.5</span></span>
<span class="line"><span style="color:#24292e;">connecting to: mongodb://192.168.122.245:47017,192.168.122.246:47017,192.168.122.14:47017/test%3FreplicaSet%3DconfigRS?compressors=disabled&amp;gssapiServiceName=mongodb</span></span>
<span class="line"><span style="color:#24292e;">Implicit session: session { &quot;id&quot; : UUID(&quot;8773dc9f-6373-49a3-8869-07b98064875e&quot;) }</span></span>
<span class="line"><span style="color:#24292e;">MongoDB server version: 5.0.5</span></span>
<span class="line"><span style="color:#24292e;">================</span></span>
<span class="line"><span style="color:#24292e;">Warning: the &quot;mongo&quot; shell has been superseded by &quot;mongosh&quot;,</span></span>
<span class="line"><span style="color:#24292e;">which delivers improved usability and compatibility.The &quot;mongo&quot; shell has been deprecated and will be removed in</span></span>
<span class="line"><span style="color:#24292e;">an upcoming release.</span></span>
<span class="line"><span style="color:#24292e;">For installation instructions, see</span></span>
<span class="line"><span style="color:#24292e;">https://docs.mongodb.com/mongodb-shell/install/</span></span>
<span class="line"><span style="color:#24292e;">================</span></span>
<span class="line"><span style="color:#24292e;">configRS:PRIMARY&gt;</span></span></code></pre></div><p>rs.slaveOk();</p><p>这个命令在客户端命令中执行，只能在当前连接中生效，关闭重新连接，需要再次输入</p><p>可以在启动时加入，保证不需要在从库每次都输入。一直开启从库读操作</p><p>在 .mongorc.js 加入上面的命令即可 此文件和.bash_profile 有相同的左右，应该是mongo的入口执行文件。</p><p><a href="https://www.cnblogs.com/operationhome/p/10744712.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/operationhome/p/10744712.html</a></p><p><a href="http://blog.huati365.com/7669e0e31f5afa06" target="_blank" rel="noreferrer">http://blog.huati365.com/7669e0e31f5afa06</a></p>`,159),o=[t];function p(c,r,i,u,d,y){return n(),a("div",null,o)}const h=s(l,[["render",p]]);export{q as __pageData,h as default};
