import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.分片集群","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/10_share.md","filePath":"guide/Database/mongodb/10_share.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/10_share.md"},p=e(`<p>MongoDB的部署方案有单机部署、复本集（主备）部署、分片部署、复本集与分片混合部署</p><h1 id="_1-分片集群" tabindex="-1">1.分片集群 <a class="header-anchor" href="#_1-分片集群" aria-label="Permalink to &quot;1.分片集群&quot;">​</a></h1><p>官方文档：<a href="https://docs.mongodb.com/manual/sharding/" target="_blank" rel="noreferrer">https://docs.mongodb.com/manual/sharding/</a></p><p>​ <code> 分片(sharding)</code>是指将数据拆分，将其分散存在不通机器的过程，有时也用<code>分区（partitioning）</code>来表示这个概念，将数据分散在不通的机器上，不需要功能强大的大型计算机就能存储更多的数据，处理更大的复制。</p><p>​ 分片的目的是通过分片能够增加更多机器来应对不断的增加负载和数据，还不影响应用运行。</p><p>​ Mongodb支持<code>自动分片</code>，可以摆脱手动分片的管理困扰，集群自动切分数据做负载均衡。MongoDB分片的基本思想就是将集合拆分成多个块，这些块分散在若干个片里，每个片只负责总数据的一部分，应用程序不必知道哪些片对应哪些数据，甚至不需要知道数据拆分，所以在分片之前会运行一个路由进程，mongos进程，这个路由器知道所有的数据存放位置，应用只需要直接与mongos交互即可。mongos自动将请求转到相应的片上获取数据，从应用角度看分不分片没有什么区别。</p><p>架构图：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100943864.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100943852.jpg" alt=""></p><h2 id="组件" tabindex="-1">组件 <a class="header-anchor" href="#组件" aria-label="Permalink to &quot;组件&quot;">​</a></h2><table><thead><tr><th><strong>组件</strong></th><th><strong>说明</strong></th></tr></thead><tbody><tr><td><strong>Config Server</strong></td><td>存储集群所有节点、分片数据路由信息。默认需要配置3个Config Server节点。从MongoDB 3.4 开始，必须将配置服务器部署为副本集（CSRS）</td></tr><tr><td><strong>Mongos</strong></td><td>mongos充当查询路由器，在客户端应用程序和分片集群之间提供接口</td></tr><tr><td><strong>share_Mongod</strong></td><td>存储应用数据记录。一般有多个Mongod节点，达到数据分片目的</td></tr></tbody></table><blockquote><p>Mongos本身并不持久化数据，Sharded cluster所有的元数据都会存储到Config Server，而用户的数据会议分散存储到各个shard。Mongos启动后，会从配置服务器加载元数据，开始提供服务，将用户的请求正确路由到对应的碎片</p></blockquote><h2 id="集群中数据分布" tabindex="-1">集群中数据分布 <a class="header-anchor" href="#集群中数据分布" aria-label="Permalink to &quot;集群中数据分布&quot;">​</a></h2><h3 id="chunk是什么" tabindex="-1">Chunk是什么 <a class="header-anchor" href="#chunk是什么" aria-label="Permalink to &quot;Chunk是什么&quot;">​</a></h3><p>在一个shard server内部，MongoDB还是会把数据分为chunks，每个chunk代表这个shard server内部一部分数据。chunk的产生，会有以下两个用途：</p><p><strong>Splitting</strong>：当一个chunk的大小超过配置中的chunk size时，MongoDB的后台进程会把这个chunk切分成更小的chunk，从而避免chunk过大的情况</p><p><strong>Balancing</strong>：在MongoDB中，balancer是一个后台进程，负责chunk的迁移，从而均衡各个shard server的负载，系统初始1个chunk，chunk size默认值64M,生产库上选择适合业务的chunk size是最好的。MongoDB会自动拆分和迁移chunks.</p><p><strong>分片集群的数据分布（shard</strong>节点）</p><blockquote><p>（1）使用chunk来存储数据</p><p>（2）进群搭建完成之后，默认开启一个chunk，大小是64M，</p><p>（3）存储需求超过64M，chunk会进行分裂，如果单位时间存储需求很大，设置更大的chunk</p><p>（4）chunk会被自动均衡迁移。</p></blockquote><h3 id="chunksize的选择" tabindex="-1">chunksize的选择 <a class="header-anchor" href="#chunksize的选择" aria-label="Permalink to &quot;chunksize的选择&quot;">​</a></h3><p>chunk的分裂和迁移非常消耗IO资源；chunk分裂的时机：在插入和更新，读数据不会分裂。</p><p><strong>chunksize</strong>的选择：</p><p>小的chunksize：数据均衡是迁移速度快，数据分布更均匀。数据分裂频繁，路由节点消耗更多资源。大的chunksize：数据分裂少。数据块移动集中消耗IO资源。通常100-200M</p><h3 id="chunk分裂及迁移" tabindex="-1">chunk分裂及迁移 <a class="header-anchor" href="#chunk分裂及迁移" aria-label="Permalink to &quot;chunk分裂及迁移&quot;">​</a></h3><p>随着数据的增长，其中的数据大小超过了配置的chunk size，默认是64M，则这个chunk就会分裂成两个。数据的增长会让chunk分裂得越来越多。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100944892.jpg" alt=""></p><p>这时候，各个shard 上的chunk数量就会不平衡。这时候，mongos中的一个组件balancer 就会执行自动平衡。把chunk从chunk数量最多的shard节点挪动到数量最少的节点。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100944321.jpg" alt=""></p><p><strong>chunkSize</strong> <strong>对分裂及迁移的影响</strong></p><p>​ MongoDB 默认的 chunkSize 为64MB，如无特殊需求，建议保持默认值；chunkSize 会直接影响到 chunk 分裂、迁移的行为。</p><p>chunkSize 越小，chunk 分裂及迁移越多，数据分布越均衡；反之，chunkSize 越大，chunk 分裂及迁移会更少，但可能导致数据分布不均。</p><p>chunkSize 太小，容易出现 jumbo chunk（即shardKey 的某个取值出现频率很高，这些文档只能放到一个 chunk 里，无法再分裂）而无法迁移；chunkSize 越大，则可能出现 chunk 内文档数太多（chunk 内文档数不能超过 250000 ）而无法迁移。</p><p>chunk 自动分裂只会在数据写入时触发，所以如果将 chunkSize 改小，系统需要一定的时间来将 chunk 分裂到指定的大小。</p><p>chunk 只会分裂，不会合并，所以即使将 chunkSize 改大，现有的 chunk 数量不会减少，但 chunk 大小会随着写入不断增长，直到达到目标大小。</p><h1 id="_2-分片部署" tabindex="-1">2.分片部署 <a class="header-anchor" href="#_2-分片部署" aria-label="Permalink to &quot;2.分片部署&quot;">​</a></h1><ul><li>环境</li><li>5.0.5</li><li>centos8</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100944410.png" alt="img"></p><p>端口分配</p><p>mongos：20000</p><p>config：21000</p><p>shard1：27001</p><p>shard2：27002</p><p>shard3：27003</p><p>分别在每台机器建立mongos、config、shard1、shard2、shard3六个目录，因为mongos不存储数据，只需要建立日志文件目录即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir -p /data/mongodb_data/mongos/log</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /data/mongodb_data/config/{data,log}</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /data/mongodb_data/shard1/{data,log}</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /data/mongodb_data/shard2/{data,log}</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /data/mongodb_data/shard3/{data,log}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir -p /data/mongodb_data/mongos/log</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /data/mongodb_data/config/{data,log}</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /data/mongodb_data/shard1/{data,log}</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /data/mongodb_data/shard2/{data,log}</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /data/mongodb_data/shard3/{data,log}</span></span></code></pre></div><ul><li>配置文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemLog:</span></span>
<span class="line"><span style="color:#e1e4e8;">    quiet: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    path: &quot;/data/mongodb_data/config/log/config.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    logAppend: true   </span></span>
<span class="line"><span style="color:#e1e4e8;">    logRotate: rename</span></span>
<span class="line"><span style="color:#e1e4e8;">    destination: file</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#e1e4e8;">processManagement:</span></span>
<span class="line"><span style="color:#e1e4e8;">    fork: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    pidFilePath: &quot;/data/mongodb_data/config/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#e1e4e8;">storage:</span></span>
<span class="line"><span style="color:#e1e4e8;">    dbPath: &quot;/data/mongodb_data/config/data&quot;</span></span>
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
<span class="line"><span style="color:#e1e4e8;">    bindIp: 192.168.122.244,127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 21000</span></span>
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
<span class="line"><span style="color:#e1e4e8;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">setParameter:</span></span>
<span class="line"><span style="color:#e1e4e8;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#e1e4e8;">replication:</span></span>
<span class="line"><span style="color:#e1e4e8;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#e1e4e8;">    replSetName: configRS</span></span>
<span class="line"><span style="color:#e1e4e8;">sharding:</span></span>
<span class="line"><span style="color:#e1e4e8;">    clusterRole: configsvr</span></span>
<span class="line"><span style="color:#e1e4e8;">    archiveMovedChunks: true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemLog:</span></span>
<span class="line"><span style="color:#24292e;">    quiet: false</span></span>
<span class="line"><span style="color:#24292e;">    path: &quot;/data/mongodb_data/config/log/config.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">    logAppend: true   </span></span>
<span class="line"><span style="color:#24292e;">    logRotate: rename</span></span>
<span class="line"><span style="color:#24292e;">    destination: file</span></span>
<span class="line"><span style="color:#24292e;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#24292e;">processManagement:</span></span>
<span class="line"><span style="color:#24292e;">    fork: true</span></span>
<span class="line"><span style="color:#24292e;">    pidFilePath: &quot;/data/mongodb_data/config/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#24292e;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#24292e;">storage:</span></span>
<span class="line"><span style="color:#24292e;">    dbPath: &quot;/data/mongodb_data/config/data&quot;</span></span>
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
<span class="line"><span style="color:#24292e;">    bindIp: 192.168.122.244,127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">    port: 21000</span></span>
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
<span class="line"><span style="color:#24292e;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#24292e;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#24292e;">setParameter:</span></span>
<span class="line"><span style="color:#24292e;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#24292e;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#24292e;">replication:</span></span>
<span class="line"><span style="color:#24292e;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#24292e;">    replSetName: configRS</span></span>
<span class="line"><span style="color:#24292e;">sharding:</span></span>
<span class="line"><span style="color:#24292e;">    clusterRole: configsvr</span></span>
<span class="line"><span style="color:#24292e;">    archiveMovedChunks: true</span></span></code></pre></div><ul><li>启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#启动对应服务：</span></span>
<span class="line"><span style="color:#e1e4e8;">mongod -f  logpath</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#启动对应服务：</span></span>
<span class="line"><span style="color:#24292e;">mongod -f  logpath</span></span></code></pre></div><h2 id="config初始化" tabindex="-1">config初始化 <a class="header-anchor" href="#config初始化" aria-label="Permalink to &quot;config初始化&quot;">​</a></h2><ul><li>配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@master config]# cat config.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">systemLog:</span></span>
<span class="line"><span style="color:#e1e4e8;">    quiet: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    path: &quot;/data/mongodb_data/config/log/config.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    logAppend: true   </span></span>
<span class="line"><span style="color:#e1e4e8;">    logRotate: rename</span></span>
<span class="line"><span style="color:#e1e4e8;">    destination: file</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#e1e4e8;">processManagement:</span></span>
<span class="line"><span style="color:#e1e4e8;">    fork: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    pidFilePath: &quot;/data/mongodb_data/config/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#e1e4e8;">storage:</span></span>
<span class="line"><span style="color:#e1e4e8;">    dbPath: &quot;/data/mongodb_data/config/data&quot;</span></span>
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
<span class="line"><span style="color:#e1e4e8;">    bindIp: 192.168.122.246,127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 21000</span></span>
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
<span class="line"><span style="color:#e1e4e8;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">setParameter:</span></span>
<span class="line"><span style="color:#e1e4e8;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#e1e4e8;">replication:</span></span>
<span class="line"><span style="color:#e1e4e8;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#e1e4e8;">    replSetName: configRS</span></span>
<span class="line"><span style="color:#e1e4e8;">sharding:</span></span>
<span class="line"><span style="color:#e1e4e8;">    clusterRole: configsvr</span></span>
<span class="line"><span style="color:#e1e4e8;">    archiveMovedChunks: true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@master config]# cat config.conf </span></span>
<span class="line"><span style="color:#24292e;">systemLog:</span></span>
<span class="line"><span style="color:#24292e;">    quiet: false</span></span>
<span class="line"><span style="color:#24292e;">    path: &quot;/data/mongodb_data/config/log/config.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">    logAppend: true   </span></span>
<span class="line"><span style="color:#24292e;">    logRotate: rename</span></span>
<span class="line"><span style="color:#24292e;">    destination: file</span></span>
<span class="line"><span style="color:#24292e;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#24292e;">processManagement:</span></span>
<span class="line"><span style="color:#24292e;">    fork: true</span></span>
<span class="line"><span style="color:#24292e;">    pidFilePath: &quot;/data/mongodb_data/config/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#24292e;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#24292e;">storage:</span></span>
<span class="line"><span style="color:#24292e;">    dbPath: &quot;/data/mongodb_data/config/data&quot;</span></span>
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
<span class="line"><span style="color:#24292e;">    bindIp: 192.168.122.246,127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">    port: 21000</span></span>
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
<span class="line"><span style="color:#24292e;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#24292e;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#24292e;">setParameter:</span></span>
<span class="line"><span style="color:#24292e;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#24292e;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#24292e;">replication:</span></span>
<span class="line"><span style="color:#24292e;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#24292e;">    replSetName: configRS</span></span>
<span class="line"><span style="color:#24292e;">sharding:</span></span>
<span class="line"><span style="color:#24292e;">    clusterRole: configsvr</span></span>
<span class="line"><span style="color:#24292e;">    archiveMovedChunks: true</span></span></code></pre></div><p>登录任意一台配置服务器，初始化配置副本集</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">configRS----&gt;副本名字</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@slave01 config]# mongo 192.168.122.14:21000</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;config = {</span></span>
<span class="line"><span style="color:#e1e4e8;"> _id : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;"> configsvr: true,</span></span>
<span class="line"><span style="color:#e1e4e8;"> members : [</span></span>
<span class="line"><span style="color:#e1e4e8;">     {_id : 0, host : &quot;192.168.122.14:21000&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">     {_id : 1, host : &quot;192.168.122.244:21000&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">     {_id : 2, host : &quot;192.168.122.246:21000&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">     ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"># 初始化配置</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;rs.initiate(config)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">rs.initiate( {</span></span>
<span class="line"><span style="color:#e1e4e8;">   _id : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">   members: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 0, host: &quot;192.168.122.244:21000&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 1, host: &quot;192.168.122.246:21000&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 2, host: &quot;192.168.122.14:21000&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">   ]</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">configRS----&gt;副本名字</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@slave01 config]# mongo 192.168.122.14:21000</span></span>
<span class="line"><span style="color:#24292e;">&gt;config = {</span></span>
<span class="line"><span style="color:#24292e;"> _id : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#24292e;"> configsvr: true,</span></span>
<span class="line"><span style="color:#24292e;"> members : [</span></span>
<span class="line"><span style="color:#24292e;">     {_id : 0, host : &quot;192.168.122.14:21000&quot; },</span></span>
<span class="line"><span style="color:#24292e;">     {_id : 1, host : &quot;192.168.122.244:21000&quot; },</span></span>
<span class="line"><span style="color:#24292e;">     {_id : 2, host : &quot;192.168.122.246:21000&quot; }</span></span>
<span class="line"><span style="color:#24292e;">     ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"># 初始化配置</span></span>
<span class="line"><span style="color:#24292e;">&gt;rs.initiate(config)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">rs.initiate( {</span></span>
<span class="line"><span style="color:#24292e;">   _id : &quot;configRS&quot;,</span></span>
<span class="line"><span style="color:#24292e;">   members: [</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 0, host: &quot;192.168.122.244:21000&quot; },</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 1, host: &quot;192.168.122.246:21000&quot; },</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 2, host: &quot;192.168.122.14:21000&quot; }</span></span>
<span class="line"><span style="color:#24292e;">   ]</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><h2 id="share副本集配置" tabindex="-1">share副本集配置 <a class="header-anchor" href="#share副本集配置" aria-label="Permalink to &quot;share副本集配置&quot;">​</a></h2><ul><li>配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@master shard1]# cat share1.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">systemLog:</span></span>
<span class="line"><span style="color:#e1e4e8;">    quiet: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    path: &quot;/data/mongodb_data/shard1/log/share1.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    logAppend: true   </span></span>
<span class="line"><span style="color:#e1e4e8;">    logRotate: rename</span></span>
<span class="line"><span style="color:#e1e4e8;">    destination: file</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#e1e4e8;">processManagement:</span></span>
<span class="line"><span style="color:#e1e4e8;">    fork: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    pidFilePath: &quot;/data/mongodb_data/shard1/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#e1e4e8;">storage:</span></span>
<span class="line"><span style="color:#e1e4e8;">    dbPath: &quot;/data/mongodb_data/shard1/data&quot;</span></span>
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
<span class="line"><span style="color:#e1e4e8;">    bindIp: 192.168.122.246,127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 27001</span></span>
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
<span class="line"><span style="color:#e1e4e8;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">setParameter:</span></span>
<span class="line"><span style="color:#e1e4e8;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#e1e4e8;">replication:</span></span>
<span class="line"><span style="color:#e1e4e8;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#e1e4e8;">    replSetName: shard1</span></span>
<span class="line"><span style="color:#e1e4e8;">sharding:</span></span>
<span class="line"><span style="color:#e1e4e8;">    clusterRole: shardsvr</span></span>
<span class="line"><span style="color:#e1e4e8;">    archiveMovedChunks: true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@master shard1]# cat share1.conf </span></span>
<span class="line"><span style="color:#24292e;">systemLog:</span></span>
<span class="line"><span style="color:#24292e;">    quiet: false</span></span>
<span class="line"><span style="color:#24292e;">    path: &quot;/data/mongodb_data/shard1/log/share1.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">    logAppend: true   </span></span>
<span class="line"><span style="color:#24292e;">    logRotate: rename</span></span>
<span class="line"><span style="color:#24292e;">    destination: file</span></span>
<span class="line"><span style="color:#24292e;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#24292e;">processManagement:</span></span>
<span class="line"><span style="color:#24292e;">    fork: true</span></span>
<span class="line"><span style="color:#24292e;">    pidFilePath: &quot;/data/mongodb_data/shard1/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#24292e;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#24292e;">storage:</span></span>
<span class="line"><span style="color:#24292e;">    dbPath: &quot;/data/mongodb_data/shard1/data&quot;</span></span>
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
<span class="line"><span style="color:#24292e;">    bindIp: 192.168.122.246,127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">    port: 27001</span></span>
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
<span class="line"><span style="color:#24292e;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#24292e;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#24292e;">setParameter:</span></span>
<span class="line"><span style="color:#24292e;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#24292e;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#24292e;">replication:</span></span>
<span class="line"><span style="color:#24292e;">    oplogSizeMB: 5120</span></span>
<span class="line"><span style="color:#24292e;">    replSetName: shard1</span></span>
<span class="line"><span style="color:#24292e;">sharding:</span></span>
<span class="line"><span style="color:#24292e;">    clusterRole: shardsvr</span></span>
<span class="line"><span style="color:#24292e;">    archiveMovedChunks: true</span></span></code></pre></div><ul><li>启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongod -f shard1.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongod -f shard1.conf</span></span></code></pre></div><p>登录任意一台配置服务器，进行初始化</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave shard1]# mongo 192.168.122.244:27001</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;rs.initiate( {</span></span>
<span class="line"><span style="color:#e1e4e8;">   _id : &quot;shard1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">   members: [</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 0, host: &quot;192.168.122.244:27001&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 1, host: &quot;192.168.122.246:27001&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">      { _id: 2, host: &quot;192.168.122.14:27001&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">   ]</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave shard1]# mongo 192.168.122.244:27001</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;rs.initiate( {</span></span>
<span class="line"><span style="color:#24292e;">   _id : &quot;shard1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">   members: [</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 0, host: &quot;192.168.122.244:27001&quot; },</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 1, host: &quot;192.168.122.246:27001&quot; },</span></span>
<span class="line"><span style="color:#24292e;">      { _id: 2, host: &quot;192.168.122.14:27001&quot; }</span></span>
<span class="line"><span style="color:#24292e;">   ]</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><h2 id="mongos路由配置" tabindex="-1">mongos路由配置 <a class="header-anchor" href="#mongos路由配置" aria-label="Permalink to &quot;mongos路由配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@master mongos]# cat mongos.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">systemLog:</span></span>
<span class="line"><span style="color:#e1e4e8;">    quiet: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    path: &quot;/data/mongodb_data/mongos/log/mongos.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    logAppend: true   </span></span>
<span class="line"><span style="color:#e1e4e8;">    logRotate: rename</span></span>
<span class="line"><span style="color:#e1e4e8;">    destination: file</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#e1e4e8;">processManagement:</span></span>
<span class="line"><span style="color:#e1e4e8;">    fork: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    pidFilePath: &quot;/data/mongodb_data/mongos/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#e1e4e8;">net:  </span></span>
<span class="line"><span style="color:#e1e4e8;">    bindIp: 192.168.122.246,127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 20000</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIncomingConnections: 52528</span></span>
<span class="line"><span style="color:#e1e4e8;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    ipv6: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    unixDomainSocket:</span></span>
<span class="line"><span style="color:#e1e4e8;">        enabled: false</span></span>
<span class="line"><span style="color:#e1e4e8;">security:</span></span>
<span class="line"><span style="color:#e1e4e8;">    #authorization: disabled</span></span>
<span class="line"><span style="color:#e1e4e8;">    #clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#e1e4e8;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">setParameter:</span></span>
<span class="line"><span style="color:#e1e4e8;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#e1e4e8;">sharding:</span></span>
<span class="line"><span style="color:#e1e4e8;">    configDB: configRS/192.168.122.14:21000,192.168.122.244:21000,192.168.122.246:21000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@master mongos]# cat mongos.conf </span></span>
<span class="line"><span style="color:#24292e;">systemLog:</span></span>
<span class="line"><span style="color:#24292e;">    quiet: false</span></span>
<span class="line"><span style="color:#24292e;">    path: &quot;/data/mongodb_data/mongos/log/mongos.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">    logAppend: true   </span></span>
<span class="line"><span style="color:#24292e;">    logRotate: rename</span></span>
<span class="line"><span style="color:#24292e;">    destination: file</span></span>
<span class="line"><span style="color:#24292e;">    timeStampFormat: iso8601-local</span></span>
<span class="line"><span style="color:#24292e;">processManagement:</span></span>
<span class="line"><span style="color:#24292e;">    fork: true</span></span>
<span class="line"><span style="color:#24292e;">    pidFilePath: &quot;/data/mongodb_data/mongos/mongod.pid&quot;</span></span>
<span class="line"><span style="color:#24292e;">    timeZoneInfo: /usr/share/zoneinfo</span></span>
<span class="line"><span style="color:#24292e;">net:  </span></span>
<span class="line"><span style="color:#24292e;">    bindIp: 192.168.122.246,127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">    port: 20000</span></span>
<span class="line"><span style="color:#24292e;">    maxIncomingConnections: 52528</span></span>
<span class="line"><span style="color:#24292e;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#24292e;">    ipv6: false</span></span>
<span class="line"><span style="color:#24292e;">    unixDomainSocket:</span></span>
<span class="line"><span style="color:#24292e;">        enabled: false</span></span>
<span class="line"><span style="color:#24292e;">security:</span></span>
<span class="line"><span style="color:#24292e;">    #authorization: disabled</span></span>
<span class="line"><span style="color:#24292e;">    #clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#24292e;">    #keyFile: &quot;/data/mongodb_data/keyfile&quot;</span></span>
<span class="line"><span style="color:#24292e;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#24292e;">setParameter:</span></span>
<span class="line"><span style="color:#24292e;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#24292e;">    authenticationMechanisms: SCRAM-SHA-1</span></span>
<span class="line"><span style="color:#24292e;">sharding:</span></span>
<span class="line"><span style="color:#24292e;">    configDB: configRS/192.168.122.14:21000,192.168.122.244:21000,192.168.122.246:21000</span></span></code></pre></div><ul><li>分别启动三台</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@master mongos]#mongos -f mongos.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@master mongos]#mongos -f mongos.conf</span></span></code></pre></div><h2 id="启用分片" tabindex="-1">启用分片 <a class="header-anchor" href="#启用分片" aria-label="Permalink to &quot;启用分片&quot;">​</a></h2><p>​ 目前搭建了mongodb配置服务器、路由服务器，各个分片服务器，不过应用程序连接到mongos路由服务器并不能使用分片机制，还需要在程序里设置分片配置，让分片生效。</p><pre><code> 片键是集合的一个键，MongoDB根据这个键拆分数据。例如，如果选择基于“username”进行分片，MongoDB会根据不同的用户名进行分片。选择片键可以认为是选择集合中数据的顺序。它与索引是个相似的概念：随着集合的不断增长，片键就会成为集合上最重要的索引。只有被索引过的键才能够作为片键
</code></pre><h3 id="登陆" tabindex="-1">登陆 <a class="header-anchor" href="#登陆" aria-label="Permalink to &quot;登陆&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@master config]# mongo 192.168.122.14:20000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@master config]# mongo 192.168.122.14:20000</span></span></code></pre></div><h3 id="串联路由" tabindex="-1">串联路由 <a class="header-anchor" href="#串联路由" aria-label="Permalink to &quot;串联路由&quot;">​</a></h3><p>串联路由服务器与分配副本集</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; use admin;</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db admin</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#添加分片信息</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; sh.addShard(&quot;shard1/192.168.122.244:27001,192.168.122.246:27001,192.168.122.14:27001&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;shardAdded&quot; : &quot;shard1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;clusterTime&quot; : Timestamp(1641803717, 4),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;operationTime&quot; : Timestamp(1641803717, 4)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;sh.addShard(&quot;shard2/192.168.122.244:27002,192.168.122.246:27002,192.168.122.14:27002&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;sh.addShard(&quot;shard3/192.168.122.244:27003,192.168.122.246:27003,192.168.122.14:27003&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;db.runCommand({ addshard:&quot;shard1/192.168.122.244:27001,192.168.122.246:27001,192.168.122.14:27001&quot;,&quot;allowLocal&quot;:true })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; use admin;</span></span>
<span class="line"><span style="color:#24292e;">switched to db admin</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#添加分片信息</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; sh.addShard(&quot;shard1/192.168.122.244:27001,192.168.122.246:27001,192.168.122.14:27001&quot;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;shardAdded&quot; : &quot;shard1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;clusterTime&quot; : Timestamp(1641803717, 4),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;operationTime&quot; : Timestamp(1641803717, 4)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;sh.addShard(&quot;shard2/192.168.122.244:27002,192.168.122.246:27002,192.168.122.14:27002&quot;)</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;sh.addShard(&quot;shard3/192.168.122.244:27003,192.168.122.246:27003,192.168.122.14:27003&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;db.runCommand({ addshard:&quot;shard1/192.168.122.244:27001,192.168.122.246:27001,192.168.122.14:27001&quot;,&quot;allowLocal&quot;:true })</span></span></code></pre></div><ul><li>查看状态</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; sh.status();</span></span>
<span class="line"><span style="color:#e1e4e8;">--- Sharding Status --- </span></span>
<span class="line"><span style="color:#e1e4e8;">  sharding version: {</span></span>
<span class="line"><span style="color:#e1e4e8;">  	&quot;_id&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">  	&quot;minCompatibleVersion&quot; : 5,</span></span>
<span class="line"><span style="color:#e1e4e8;">  	&quot;currentVersion&quot; : 6,</span></span>
<span class="line"><span style="color:#e1e4e8;">  	&quot;clusterId&quot; : ObjectId(&quot;61dbe3728c0a24e39415b7ac&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  shards:</span></span>
<span class="line"><span style="color:#e1e4e8;">        {  &quot;_id&quot; : &quot;shard1&quot;,  &quot;host&quot; : &quot;shard1/192.168.122.14:27001,192.168.122.244:27001,192.168.122.246:27001&quot;,  &quot;state&quot; : 1,  &quot;topologyTime&quot; : Timestamp(1641803717, 1) }</span></span>
<span class="line"><span style="color:#e1e4e8;">        {  &quot;_id&quot; : &quot;shard2&quot;,  &quot;host&quot; : &quot;shard2/192.168.122.14:27002,192.168.122.244:27002,192.168.122.246:27002&quot;,  &quot;state&quot; : 1,  &quot;topologyTime&quot; : Timestamp(1641803781, 1) }</span></span>
<span class="line"><span style="color:#e1e4e8;">        {  &quot;_id&quot; : &quot;shard3&quot;,  &quot;host&quot; : &quot;shard3/192.168.122.14:27003,192.168.122.244:27003,192.168.122.246:27003&quot;,  &quot;state&quot; : 1,  &quot;topologyTime&quot; : Timestamp(1641803793, 2) }</span></span>
<span class="line"><span style="color:#e1e4e8;">  active mongoses:</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;5.0.5&quot; : 3</span></span>
<span class="line"><span style="color:#e1e4e8;">  autosplit:</span></span>
<span class="line"><span style="color:#e1e4e8;">        Currently enabled: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">  balancer:</span></span>
<span class="line"><span style="color:#e1e4e8;">        Currently enabled: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">        Currently running: no</span></span>
<span class="line"><span style="color:#e1e4e8;">        Failed balancer rounds in last 5 attempts: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">        Migration results for the last 24 hours: </span></span>
<span class="line"><span style="color:#e1e4e8;">                No recent migrations</span></span>
<span class="line"><span style="color:#e1e4e8;">  databases:</span></span>
<span class="line"><span style="color:#e1e4e8;">        {  &quot;_id&quot; : &quot;config&quot;,  &quot;primary&quot; : &quot;config&quot;,  &quot;partitioned&quot; : true }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; sh.status();</span></span>
<span class="line"><span style="color:#24292e;">--- Sharding Status --- </span></span>
<span class="line"><span style="color:#24292e;">  sharding version: {</span></span>
<span class="line"><span style="color:#24292e;">  	&quot;_id&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">  	&quot;minCompatibleVersion&quot; : 5,</span></span>
<span class="line"><span style="color:#24292e;">  	&quot;currentVersion&quot; : 6,</span></span>
<span class="line"><span style="color:#24292e;">  	&quot;clusterId&quot; : ObjectId(&quot;61dbe3728c0a24e39415b7ac&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  shards:</span></span>
<span class="line"><span style="color:#24292e;">        {  &quot;_id&quot; : &quot;shard1&quot;,  &quot;host&quot; : &quot;shard1/192.168.122.14:27001,192.168.122.244:27001,192.168.122.246:27001&quot;,  &quot;state&quot; : 1,  &quot;topologyTime&quot; : Timestamp(1641803717, 1) }</span></span>
<span class="line"><span style="color:#24292e;">        {  &quot;_id&quot; : &quot;shard2&quot;,  &quot;host&quot; : &quot;shard2/192.168.122.14:27002,192.168.122.244:27002,192.168.122.246:27002&quot;,  &quot;state&quot; : 1,  &quot;topologyTime&quot; : Timestamp(1641803781, 1) }</span></span>
<span class="line"><span style="color:#24292e;">        {  &quot;_id&quot; : &quot;shard3&quot;,  &quot;host&quot; : &quot;shard3/192.168.122.14:27003,192.168.122.244:27003,192.168.122.246:27003&quot;,  &quot;state&quot; : 1,  &quot;topologyTime&quot; : Timestamp(1641803793, 2) }</span></span>
<span class="line"><span style="color:#24292e;">  active mongoses:</span></span>
<span class="line"><span style="color:#24292e;">        &quot;5.0.5&quot; : 3</span></span>
<span class="line"><span style="color:#24292e;">  autosplit:</span></span>
<span class="line"><span style="color:#24292e;">        Currently enabled: yes</span></span>
<span class="line"><span style="color:#24292e;">  balancer:</span></span>
<span class="line"><span style="color:#24292e;">        Currently enabled: yes</span></span>
<span class="line"><span style="color:#24292e;">        Currently running: no</span></span>
<span class="line"><span style="color:#24292e;">        Failed balancer rounds in last 5 attempts: 0</span></span>
<span class="line"><span style="color:#24292e;">        Migration results for the last 24 hours: </span></span>
<span class="line"><span style="color:#24292e;">                No recent migrations</span></span>
<span class="line"><span style="color:#24292e;">  databases:</span></span>
<span class="line"><span style="color:#24292e;">        {  &quot;_id&quot; : &quot;config&quot;,  &quot;primary&quot; : &quot;config&quot;,  &quot;partitioned&quot; : true }</span></span></code></pre></div><p><code>至此分片集群搭建结束</code></p><h2 id="测试效果" tabindex="-1">测试效果 <a class="header-anchor" href="#测试效果" aria-label="Permalink to &quot;测试效果&quot;">​</a></h2><h3 id="数据库分片" tabindex="-1">数据库分片 <a class="header-anchor" href="#数据库分片" aria-label="Permalink to &quot;数据库分片&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">语法：( { enablesharding : &quot;数据库名称&quot; } )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">语法：( { enablesharding : &quot;数据库名称&quot; } )</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#必须进入到admin下执行</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; use amdin;</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db amdin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; sh.enableSharding(&quot;test&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;clusterTime&quot; : Timestamp(1641804070, 4),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;operationTime&quot; : Timestamp(1641804070, 3)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">db.runCommand( { enablesharding : &quot;test&quot; } )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#必须进入到admin下执行</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; use amdin;</span></span>
<span class="line"><span style="color:#24292e;">switched to db amdin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; sh.enableSharding(&quot;test&quot;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;clusterTime&quot; : Timestamp(1641804070, 4),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;operationTime&quot; : Timestamp(1641804070, 3)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">db.runCommand( { enablesharding : &quot;test&quot; } )</span></span></code></pre></div><h3 id="hashed" tabindex="-1">hashed <a class="header-anchor" href="#hashed" aria-label="Permalink to &quot;hashed&quot;">​</a></h3><ul><li>对users表进行hash</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt;db.runCommand({ shardcollection: &quot;test.users&quot;,key: { _id: &quot;hashed&quot;}})</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;collectionsharded&quot; : &quot;test.users&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;clusterTime&quot; : Timestamp(1641805793, 29),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;operationTime&quot; : Timestamp(1641805793, 23)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#插入数据</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;for(i=1; i&lt;=500;i++){</span></span>
<span class="line"><span style="color:#e1e4e8;">  db.users.insert( {name:&#39;mytest&#39;+i, age:i} )</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">shard1:PRIMARY&gt; use test</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db test</span></span>
<span class="line"><span style="color:#e1e4e8;">shard1:PRIMARY&gt; db.users.count();</span></span>
<span class="line"><span style="color:#e1e4e8;">177</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">shard2:PRIMARY&gt; use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db test</span></span>
<span class="line"><span style="color:#e1e4e8;">shard2:PRIMARY&gt; db.users.count();</span></span>
<span class="line"><span style="color:#e1e4e8;">161</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">shard3:PRIMARY&gt; db.users.count()</span></span>
<span class="line"><span style="color:#e1e4e8;">162</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者,进行查看是否分片</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;db.users.status()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt;db.runCommand({ shardcollection: &quot;test.users&quot;,key: { _id: &quot;hashed&quot;}})</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;collectionsharded&quot; : &quot;test.users&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ok&quot; : 1,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;$clusterTime&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;clusterTime&quot; : Timestamp(1641805793, 29),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;signature&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">			&quot;hash&quot; : BinData(0,&quot;AAAAAAAAAAAAAAAAAAAAAAAAAAA=&quot;),</span></span>
<span class="line"><span style="color:#24292e;">			&quot;keyId&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	&quot;operationTime&quot; : Timestamp(1641805793, 23)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#插入数据</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;for(i=1; i&lt;=500;i++){</span></span>
<span class="line"><span style="color:#24292e;">  db.users.insert( {name:&#39;mytest&#39;+i, age:i} )</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">shard1:PRIMARY&gt; use test</span></span>
<span class="line"><span style="color:#24292e;">switched to db test</span></span>
<span class="line"><span style="color:#24292e;">shard1:PRIMARY&gt; db.users.count();</span></span>
<span class="line"><span style="color:#24292e;">177</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">shard2:PRIMARY&gt; use test;</span></span>
<span class="line"><span style="color:#24292e;">switched to db test</span></span>
<span class="line"><span style="color:#24292e;">shard2:PRIMARY&gt; db.users.count();</span></span>
<span class="line"><span style="color:#24292e;">161</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">shard3:PRIMARY&gt; db.users.count()</span></span>
<span class="line"><span style="color:#24292e;">162</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者,进行查看是否分片</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;db.users.status()</span></span></code></pre></div><h3 id="普通分片" tabindex="-1">普通分片 <a class="header-anchor" href="#普通分片" aria-label="Permalink to &quot;普通分片&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt;db.runCommand({ shardcollection: &quot;test.users&quot;,key: { _id:1}})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt;db.runCommand({ shardcollection: &quot;test.users&quot;,key: { _id:1}})</span></span></code></pre></div><h1 id="分片集数据分布策略" tabindex="-1">分片集数据分布策略 <a class="header-anchor" href="#分片集数据分布策略" aria-label="Permalink to &quot;分片集数据分布策略&quot;">​</a></h1><p>MongoDB分片集提供了三种数据分布的策略：</p><p>（1）基于范围（Range）</p><p>（2）基于哈希（Hash）</p><p>（3）基于zone/tag</p><h2 id="基于范围分片" tabindex="-1"><strong>基于范围分片</strong> <a class="header-anchor" href="#基于范围分片" aria-label="Permalink to &quot;**基于范围分片**&quot;">​</a></h2><p>首先，基于范围的数据分片很好理解，通常会按照某个字段如创建日期来区分不同范围的数据存储</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100944566.png" alt="img"></p><p>其优点是分片范围的查询性能足够好，缺点是存在热点数据问题，数据的分布可能会不够均匀</p><h2 id="基于哈希分片" tabindex="-1"><strong>基于哈希分片</strong> <a class="header-anchor" href="#基于哈希分片" aria-label="Permalink to &quot;**基于哈希分片**&quot;">​</a></h2><p>其次，基于Hash的分片策略也比较好理解，通常会按照某个字段的哈希值来确定数据存储的位置</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100944733.png" alt="img"></p><p>其优点是数据的分布会比较均匀，缺点则是范围查询的效率会较低，因为可能会涉及在多个节点读取数据并聚合</p><h2 id="基于zone-tag分片" tabindex="-1"><strong>基于Zone/Tag分片</strong> <a class="header-anchor" href="#基于zone-tag分片" aria-label="Permalink to &quot;**基于Zone/Tag分片**&quot;">​</a></h2><p>基于zone/tag的数据分片则有点不太好理解，它不是一般我们所熟知的分片方式。所谓基于zone/tag的数据分片，一般是指在两地三中心或异地多活的应用场景中，如果数据存在地域性的访问需求，那么就可以自定义Zone来进行分片</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100944254.png" alt="img"></p><p>通过打tag的方式，可以实现将为某个地域服务的数据存储到指定地域的数据分片上（比如CountryCode=NewYork），最终实现本地读和本地写的目的</p><h1 id="常用操作" tabindex="-1">常用操作 <a class="header-anchor" href="#常用操作" aria-label="Permalink to &quot;常用操作&quot;">​</a></h1><h2 id="查看分片信息" tabindex="-1">查看分片信息 <a class="header-anchor" href="#查看分片信息" aria-label="Permalink to &quot;查看分片信息&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt;  db.printShardingStatus()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;sh.status()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#出错调试</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; sh.status({&quot;verbose&quot;:1})</span></span>
<span class="line"><span style="color:#e1e4e8;">或则</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; db.printShardingStatus(&quot;vvvv&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">或则</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; printShardingStatus(db.getSisterDB(&quot;config&quot;),1)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt;  db.printShardingStatus()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;sh.status()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#出错调试</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; sh.status({&quot;verbose&quot;:1})</span></span>
<span class="line"><span style="color:#24292e;">或则</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; db.printShardingStatus(&quot;vvvv&quot;)</span></span>
<span class="line"><span style="color:#24292e;">或则</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; printShardingStatus(db.getSisterDB(&quot;config&quot;),1)</span></span></code></pre></div><h2 id="是否开启均衡状态" tabindex="-1">是否开启均衡状态 <a class="header-anchor" href="#是否开启均衡状态" aria-label="Permalink to &quot;是否开启均衡状态&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; sh.getBalancerState()</span></span>
<span class="line"><span style="color:#e1e4e8;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; sh.getBalancerState()</span></span>
<span class="line"><span style="color:#24292e;">true</span></span></code></pre></div><h2 id="查看是否有数据迁移" tabindex="-1">查看是否有数据迁移 <a class="header-anchor" href="#查看是否有数据迁移" aria-label="Permalink to &quot;查看是否有数据迁移&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; sh.isBalancerRunning()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; sh.isBalancerRunning()</span></span></code></pre></div><h2 id="启动关闭" tabindex="-1">启动关闭 <a class="header-anchor" href="#启动关闭" aria-label="Permalink to &quot;启动关闭&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongodb的启动顺序是，先启动配置服务器，在启动分片，最后启动mongos</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#关闭，无先后顺序</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongodb的启动顺序是，先启动配置服务器，在启动分片，最后启动mongos</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#关闭，无先后顺序</span></span></code></pre></div><h2 id="开启用户验证" tabindex="-1">开启用户验证 <a class="header-anchor" href="#开启用户验证" aria-label="Permalink to &quot;开启用户验证&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">每个实例的配置文件中</span></span>
<span class="line"><span style="color:#e1e4e8;">security:</span></span>
<span class="line"><span style="color:#e1e4e8;">  authorization: enabled   #若启动实例报错，可删除此行</span></span>
<span class="line"><span style="color:#e1e4e8;">  keyFile: /root/keyfile</span></span>
<span class="line"><span style="color:#e1e4e8;">  clusterAuthMode: keyFile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">每个实例的配置文件中</span></span>
<span class="line"><span style="color:#24292e;">security:</span></span>
<span class="line"><span style="color:#24292e;">  authorization: enabled   #若启动实例报错，可删除此行</span></span>
<span class="line"><span style="color:#24292e;">  keyFile: /root/keyfile</span></span>
<span class="line"><span style="color:#24292e;">  clusterAuthMode: keyFile</span></span></code></pre></div><h2 id="删除分片" tabindex="-1">删除分片 <a class="header-anchor" href="#删除分片" aria-label="Permalink to &quot;删除分片&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt;use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt;db.runCommand( { removeShard: &quot;myshardrs02&quot; } )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt;use admin</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt;db.runCommand( { removeShard: &quot;myshardrs02&quot; } )</span></span></code></pre></div><ul><li>如果只剩下最后一个 shard，是无法删除的</li><li>移除时会自动转移分片数据，需要一个时间过程</li><li>完成后，再次执行删除分片命令才能真正删除</li></ul><h2 id="添加分片" tabindex="-1">添加分片 <a class="header-anchor" href="#添加分片" aria-label="Permalink to &quot;添加分片&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt;sh.addShard(&quot;shard2/192.168.122.244:27002,192.168.122.246:27002,192.168.122.14:27002&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt;sh.addShard(&quot;shard2/192.168.122.244:27002,192.168.122.246:27002,192.168.122.14:27002&quot;)</span></span></code></pre></div><h2 id="分片连接" tabindex="-1">分片连接 <a class="header-anchor" href="#分片连接" aria-label="Permalink to &quot;分片连接&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 连接到复制集</span></span>
<span class="line"><span style="color:#e1e4e8;">mongodb://节点1,节点2,节点3…/database?[options]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 连接到分片集</span></span>
<span class="line"><span style="color:#e1e4e8;">mongodb://mongos1,mongos2,mongos3…/database?[options]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 连接到复制集</span></span>
<span class="line"><span style="color:#24292e;">mongodb://节点1,节点2,节点3…/database?[options]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 连接到分片集</span></span>
<span class="line"><span style="color:#24292e;">mongodb://mongos1,mongos2,mongos3…/database?[options]</span></span></code></pre></div><p>常见的连接字符串参数有：</p><ul><li>maxPoolSize ：连接池大小</li><li>maxWaitTime：最大等待时间，建议设置，自动杀掉太慢的查询</li><li>writeConcern：建议设置为majority 保证数据安全</li><li>readConcern：对于数据一致性要求较高的场景适当使用</li></ul><p>对于连接字符串中的节点和地址：</p><ul><li>无论对于复制集或分片集，连接字符串中建议全部列出所有节点地址</li><li>连接字符串中尽可能使用与复制集内部配置相同的域名或IP地址，建议均使用域名</li></ul><p><code>不要在mongos前面使用负载均衡：MongoDB Driver自己会处理负载均衡和自动故障恢复，不要在mongos或复制集上层放置负载均衡器（比如LVS或Nginx），否则Driver会无法探测具体哪个节点存活，也无法判断游标是在哪个节点创建的</code></p><p><a href="https://blog.51cto.com/bigboss/2160311" target="_blank" rel="noreferrer">https://blog.51cto.com/bigboss/2160311</a></p><p><a href="https://www.cnblogs.com/clsn/p/8214345.html#auto-id-37" target="_blank" rel="noreferrer">https://www.cnblogs.com/clsn/p/8214345.html#auto-id-37</a></p><p><a href="https://dbawsp.com/339.html" target="_blank" rel="noreferrer">https://dbawsp.com/339.html</a></p><p><a href="https://www.cnblogs.com/wushaoyu/p/10723599.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/wushaoyu/p/10723599.html</a></p><p>视频：<a href="https://www.bilibili.com/video/BV1vL4y1J7i3?p=30" target="_blank" rel="noreferrer">https://www.bilibili.com/video/BV1vL4y1J7i3?p=30</a></p><p>查看分片信息和状态： 在mongos上： db.runCommand({listshards:1}) 判断是否sharding： db.runCommand({isdbgrid:1}) printShardingStatus(); --和rs.status()一样 db.collection.stats() db.collection.getShardDistribution()</p>`,131),o=[p];function t(c,i,r,d,u,y){return n(),a("div",null,o)}const m=s(l,[["render",t]]);export{g as __pageData,m as default};
