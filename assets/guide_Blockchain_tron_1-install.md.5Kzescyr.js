import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"全节点和超级节点搭建","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/tron/1-install.md","filePath":"guide/Blockchain/tron/1-install.md","lastUpdated":1745936384000}'),l={name:"guide/Blockchain/tron/1-install.md"},p=e(`<h1 id="全节点和超级节点搭建" tabindex="-1">全节点和超级节点搭建 <a class="header-anchor" href="#全节点和超级节点搭建" aria-label="Permalink to &quot;全节点和超级节点搭建&quot;">​</a></h1><p>环境：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">jdk1.8.0_144(oracle</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">jdk1.8.0_144(oracle</span><span style="color:#24292E;">)</span></span></code></pre></div><p>配置：</p><p>CPU：16核 内存：32G 带宽：100M SSD：500G以上</p><p>aws，c5.4xlarge(16x_32g)，1.6T 需以内存的一半来控制，否则超过会出现内存溢出</p><p>用快照（默认是430g左右）拉数据块</p><h2 id="_1-部署" tabindex="-1">1，部署 <a class="header-anchor" href="#_1-部署" aria-label="Permalink to &quot;1，部署&quot;">​</a></h2><h3 id="源码" tabindex="-1">源码 <a class="header-anchor" href="#源码" aria-label="Permalink to &quot;源码&quot;">​</a></h3><p>git clone -b master <a href="https://github.com/tronprotocol/java-tron.git" target="_blank" rel="noreferrer">https://github.com/tronprotocol/java-tron.git</a></p><p>编译java-tron项目</p><p>cd ./java-tron</p><p>./gradlew build</p><h3 id="jar包" tabindex="-1">jar包 <a class="header-anchor" href="#jar包" aria-label="Permalink to &quot;jar包&quot;">​</a></h3><p>通过release直接获取最新版本jar包</p><p><a href="https://github.com/tronprotocol/java-tron/releases" target="_blank" rel="noreferrer">https://github.com/tronprotocol/java-tron/releases</a></p><p><strong>配置文件</strong></p><p><a href="https://github.com/tronprotocol/tron-deployment/blob/master/main_net_config.conf" target="_blank" rel="noreferrer">https://github.com/tronprotocol/tron-deployment/blob/master/main_net_config.conf</a></p><h2 id="_2-部署节点" tabindex="-1">2,<strong>部署节点</strong> <a class="header-anchor" href="#_2-部署节点" aria-label="Permalink to &quot;2,**部署节点**&quot;">​</a></h2><p>启动节点同步数据较慢，可通过数据快照直接下载最新数据后，解压至tron项目下的output-directory目录下，再进行同步。数据快照可以从<a href="https://cn.developers.tron.network/docs/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%BF%AB%E7%85%A7%E5%A4%87%E4%BB%BD" target="_blank" rel="noreferrer">数据快照和使用</a>获取</p><div class="danger custom-block"><p class="custom-block-title">❌ 注意 ，快照新地址</p><p><a href="https://tronprotocol.github.io/documentation-zh/using_javatron/backup_restore/#lite-fullnode" target="_blank" rel="noreferrer">https://tronprotocol.github.io/documentation-zh/using_javatron/backup_restore/#lite-fullnode</a></p></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">nohup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xmx24g</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XX:+HeapDumpOnOutOfMemoryError</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-XX:+UseConcMarkSweepGC</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-jar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v4.7.4.jar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">2&gt;&amp;1</span><span style="color:#E1E4E8;"> &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">nohup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xmx24g</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XX:+HeapDumpOnOutOfMemoryError</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-XX:+UseConcMarkSweepGC</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-jar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v4.7.4.jar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">2&gt;&amp;1</span><span style="color:#24292E;"> &amp;</span></span></code></pre></div><h3 id="_2-1加速插件" tabindex="-1">2.1加速插件 <a class="header-anchor" href="#_2-1加速插件" aria-label="Permalink to &quot;2.1加速插件&quot;">​</a></h3><p><a href="https://github.com/tronprotocol/documentation-zh/blob/master/docs/developers/archive-manifest.md" target="_blank" rel="noreferrer">https://github.com/tronprotocol/documentation-zh/blob/master/docs/developers/archive-manifest.md</a></p><p>关闭节点</p><p>kill -15 pid</p><h2 id="_3-配置文件" tabindex="-1">3.配置文件 <a class="header-anchor" href="#_3-配置文件" aria-label="Permalink to &quot;3.配置文件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">net {</span></span>
<span class="line"><span style="color:#e1e4e8;">  type = mainnet</span></span>
<span class="line"><span style="color:#e1e4e8;">  # type = testnet</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">storage {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # Directory for storing persistent data</span></span>
<span class="line"><span style="color:#e1e4e8;">  db.version = 2,</span></span>
<span class="line"><span style="color:#e1e4e8;">  db.engine = &quot;LEVELDB&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  db.sync = false,</span></span>
<span class="line"><span style="color:#e1e4e8;">  db.directory = &quot;database&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  index.directory = &quot;index&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  transHistory.switch = &quot;on&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  # You can custom these 14 databases&#39; configs:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # account, account-index, asset-issue, block, block-index,</span></span>
<span class="line"><span style="color:#e1e4e8;">  # block_KDB, peers, properties, recent-block, trans,</span></span>
<span class="line"><span style="color:#e1e4e8;">  # utxo, votes, witness, witness_schedule.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # Otherwise, db configs will remain defualt and data will be stored in</span></span>
<span class="line"><span style="color:#e1e4e8;">  # the path of &quot;output-directory&quot; or which is set by &quot;-d&quot; (&quot;--output-directory&quot;).</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # Attention: name is a required field that must be set !!!</span></span>
<span class="line"><span style="color:#e1e4e8;">  properties = [</span></span>
<span class="line"><span style="color:#e1e4e8;">//    {</span></span>
<span class="line"><span style="color:#e1e4e8;">//      name = &quot;account&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      path = &quot;storage_directory_test&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      createIfMissing = true,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      paranoidChecks = true,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      verifyChecksums = true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      compressionType = 1,        // compressed with snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      blockSize = 4096,           // 4  KB =         4 * 1024 B</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      writeBufferSize = 10485760, // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      cacheSize = 10485760,       // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      maxOpenFiles = 100</span></span>
<span class="line"><span style="color:#e1e4e8;">    //    },</span></span>
<span class="line"><span style="color:#e1e4e8;">//    {</span></span>
<span class="line"><span style="color:#e1e4e8;">//      name = &quot;account-index&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      path = &quot;storage_directory_test&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      createIfMissing = true,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      paranoidChecks = true,</span></span>
<span class="line"><span style="color:#e1e4e8;">//      verifyChecksums = true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      compressionType = 1,        // compressed with snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      blockSize = 4096,           // 4  KB =         4 * 1024 B</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      writeBufferSize = 10485760, // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      cacheSize = 10485760,       // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#e1e4e8;">    //      maxOpenFiles = 100</span></span>
<span class="line"><span style="color:#e1e4e8;">    //    },</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  needToUpdateAsset = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  //dbsettings is needed when using rocksdb as the storage implement (db.version=2 and db.engine=&quot;ROCKSDB&quot;).</span></span>
<span class="line"><span style="color:#e1e4e8;">  //we&#39;d strongly recommend that do not modify it unless you know every item&#39;s meaning clearly.</span></span>
<span class="line"><span style="color:#e1e4e8;">  dbSettings = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    levelNumber = 7</span></span>
<span class="line"><span style="color:#e1e4e8;">    //compactThreads = 32</span></span>
<span class="line"><span style="color:#e1e4e8;">    blocksize = 64  // n * KB</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxBytesForLevelBase = 256  // n * MB</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxBytesForLevelMultiplier = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">    level0FileNumCompactionTrigger = 4</span></span>
<span class="line"><span style="color:#e1e4e8;">    targetFileSizeBase = 256  // n * MB</span></span>
<span class="line"><span style="color:#e1e4e8;">    targetFileSizeMultiplier = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  //backup settings when using rocks db as the storage implement (db.version=2 and db.engine=&quot;ROCKSDB&quot;).</span></span>
<span class="line"><span style="color:#e1e4e8;">  //if you want to use the backup plugin, please confirm set the db.version=2 and db.engine=&quot;ROCKSDB&quot; above.</span></span>
<span class="line"><span style="color:#e1e4e8;">  backup = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    enable = false  // indicate whether enable the backup plugin</span></span>
<span class="line"><span style="color:#e1e4e8;">    propPath = &quot;prop.properties&quot; // record which bak directory is valid</span></span>
<span class="line"><span style="color:#e1e4e8;">    bak1path = &quot;bak1/database&quot; // you must set two backup directories to prevent application halt unexpected(e.g. kill -9).</span></span>
<span class="line"><span style="color:#e1e4e8;">    bak2path = &quot;bak2/database&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    frequency = 10000   // indicate backup db once every 10000 blocks processed.</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">node.discovery = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  enable = true</span></span>
<span class="line"><span style="color:#e1e4e8;">  persist = true</span></span>
<span class="line"><span style="color:#e1e4e8;">  bind.ip = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  external.ip = null</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">node.backup {</span></span>
<span class="line"><span style="color:#e1e4e8;">  port = 10001</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # my priority, each member should use different priority</span></span>
<span class="line"><span style="color:#e1e4e8;">  priority = 8</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # peer&#39;s ip list, can&#39;t contain mine</span></span>
<span class="line"><span style="color:#e1e4e8;">  members = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    # &quot;ip&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    # &quot;ip&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">node {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # trust node for solidity node</span></span>
<span class="line"><span style="color:#e1e4e8;">  # trustNode = &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  trustNode = &quot;127.0.0.1:50051&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # expose extension api to public or not</span></span>
<span class="line"><span style="color:#e1e4e8;">  walletExtensionApi = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  listen.port = 18888</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  connection.timeout = 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  tcpNettyWorkThreadNum = 0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  udpNettyWorkThreadNum = 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # Number of validate sign thread, default availableProcessors / 2</span></span>
<span class="line"><span style="color:#e1e4e8;">  # validateSignThreadNum = 16</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  connectFactor = 0.3</span></span>
<span class="line"><span style="color:#e1e4e8;">  activeConnectFactor = 0.1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  maxActiveNodes = 30</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  maxActiveNodesWithSameIp = 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  maxHttpConnectNumber = 50</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  minParticipationRate = 15</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # check the peer data transfer ,disconnect factor</span></span>
<span class="line"><span style="color:#e1e4e8;">  disconnectNumberFactor = 0.4</span></span>
<span class="line"><span style="color:#e1e4e8;">  maxConnectNumberFactor = 0.8</span></span>
<span class="line"><span style="color:#e1e4e8;">  receiveTcpMinDataLength = 2048</span></span>
<span class="line"><span style="color:#e1e4e8;">  isOpenFullTcpDisconnect = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  p2p {</span></span>
<span class="line"><span style="color:#e1e4e8;">    version = 11111 # 11111: mainnet; 20180622: testnet</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  active = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    # Active establish connection in any case</span></span>
<span class="line"><span style="color:#e1e4e8;">    # Sample entries:</span></span>
<span class="line"><span style="color:#e1e4e8;">    # &quot;ip:port&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    # &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  passive = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    # Passive accept connection in any case</span></span>
<span class="line"><span style="color:#e1e4e8;">    # Sample entries:</span></span>
<span class="line"><span style="color:#e1e4e8;">    # &quot;ip:port&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    # &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  fastForward = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;100.26.245.209:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;15.188.6.125:18888&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    fullNodePort = 8090</span></span>
<span class="line"><span style="color:#e1e4e8;">    solidityPort = 8091</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  rpc {</span></span>
<span class="line"><span style="color:#e1e4e8;">    port = 50051</span></span>
<span class="line"><span style="color:#e1e4e8;">    #solidityPort = 50061</span></span>
<span class="line"><span style="color:#e1e4e8;">    # Number of gRPC thread, default availableProcessors / 2</span></span>
<span class="line"><span style="color:#e1e4e8;">    # thread = 16</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # The maximum number of concurrent calls permitted for each incoming connection</span></span>
<span class="line"><span style="color:#e1e4e8;">    # maxConcurrentCallsPerConnection =</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # The HTTP/2 flow control window, default 1MB</span></span>
<span class="line"><span style="color:#e1e4e8;">    # flowControlWindow =</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # Connection being idle for longer than which will be gracefully terminated</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxConnectionIdleInMillis = 60000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # Connection lasting longer than which will be gracefully terminated</span></span>
<span class="line"><span style="color:#e1e4e8;">    # maxConnectionAgeInMillis =</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # The maximum message size allowed to be received on the server, default 4MB</span></span>
<span class="line"><span style="color:#e1e4e8;">    # maxMessageSize =</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # The maximum size of header list allowed to be received, default 8192</span></span>
<span class="line"><span style="color:#e1e4e8;">    # maxHeaderListSize =</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # Transactions can only be broadcast if the number of effective connections is reached.</span></span>
<span class="line"><span style="color:#e1e4e8;">    minEffectiveConnection = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # number of solidity thread in the FullNode.</span></span>
<span class="line"><span style="color:#e1e4e8;">  # If accessing solidity rpc and http interface timeout, could increase the number of threads,</span></span>
<span class="line"><span style="color:#e1e4e8;">  # The default value is the number of cpu cores of the machine.</span></span>
<span class="line"><span style="color:#e1e4e8;">  #solidity.threads = 8</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # Limits the maximum percentage (default 75%) of producing block interval</span></span>
<span class="line"><span style="color:#e1e4e8;">  # to provide sufficient time to perform other operations e.g. broadcast block</span></span>
<span class="line"><span style="color:#e1e4e8;">  # blockProducedTimeOut = 75</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # Limits the maximum number (default 700) of transaction from network layer</span></span>
<span class="line"><span style="color:#e1e4e8;">  # netMaxTrxPerSecond = 700</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">seed.node = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # List of the seed nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">  # Seed nodes are stable full nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">  # example:</span></span>
<span class="line"><span style="color:#e1e4e8;">  # ip.list = [</span></span>
<span class="line"><span style="color:#e1e4e8;">  #   &quot;ip:port&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  #   &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  # ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  ip.list = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;3.225.171.164:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;52.53.189.99:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;18.196.99.16:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;34.253.187.192:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;18.133.82.227:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;35.180.51.163:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;54.252.224.209:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;18.228.15.36:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;52.15.93.92:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;34.220.77.106:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;13.127.47.162:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;13.124.62.58:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;13.229.128.108:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;35.182.37.246:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;34.200.228.125:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;18.220.232.201:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;13.57.30.186:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;35.165.103.105:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;18.184.238.21:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;34.250.140.143:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;35.176.192.130:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;52.47.197.188:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;52.62.210.100:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;13.231.4.243:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;18.231.76.29:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;35.154.90.144:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;13.125.210.234:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;13.250.40.82:18888&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;35.183.101.48:18888&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">genesis.block = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  # Reserve balance</span></span>
<span class="line"><span style="color:#e1e4e8;">  assets = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      accountName = &quot;Zion&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      accountType = &quot;AssetIssue&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      address = &quot;TLLM21wteSPs4hKjbxgmH1L6poyMjeTbHm&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      balance = &quot;99000000000000000&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      accountName = &quot;Sun&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      accountType = &quot;AssetIssue&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      address = &quot;TXmVpin5vq5gdZsciyyjdZgKRUju4st1wM&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      balance = &quot;0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      accountName = &quot;Blackhole&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      accountType = &quot;AssetIssue&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      address = &quot;TLsV52sRDL79HXGGm9yzwKibb6BeruhUzy&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      balance = &quot;-9223372036854775808&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  witnesses = [</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: THKJYuUmMKKARNf7s2VT51g5uPY6KEqnat,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR1.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000026</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TVDmPWGYxgi5DNeW8hXrzrhY8Y6zgxPNg4,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR2.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000025</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TWKZN1JJPFydd5rMgMCV5aZTSiwmoksSZv,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR3.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000024</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TDarXEG2rAD57oa7JTK785Yb2Et32UzY32,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR4.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000023</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TAmFfS4Tmm8yKeoqZN8x51ASwdQBdnVizt,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR5.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000022</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TK6V5Pw2UWQWpySnZyCDZaAvu1y48oRgXN,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR6.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000021</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TGqFJPFiEqdZx52ZR4QcKHz4Zr3QXA24VL,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR7.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000020</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TC1ZCj9Ne3j5v3TLx5ZCDLD55MU9g3XqQW,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR8.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000019</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TWm3id3mrQ42guf7c4oVpYExyTYnEGy3JL,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR9.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000018</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TCvwc3FV3ssq2rD82rMmjhT4PVXYTsFcKV,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR10.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000017</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TFuC2Qge4GxA2U9abKxk1pw3YZvGM5XRir,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR11.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000016</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TNGoca1VHC6Y5Jd2B1VFpFEhizVk92Rz85,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR12.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000015</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TLCjmH6SqGK8twZ9XrBDWpBbfyvEXihhNS,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR13.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000014</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TEEzguTtCihbRPfjf1CvW8Euxz1kKuvtR9,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR14.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000013</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TZHvwiw9cehbMxrtTbmAexm9oPo4eFFvLS,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR15.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000012</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TGK6iAKgBmHeQyp5hn3imB71EDnFPkXiPR,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR16.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000011</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TLaqfGrxZ3dykAFps7M2B4gETTX1yixPgN,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR17.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000010</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TX3ZceVew6yLC5hWTXnjrUFtiFfUDGKGty,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR18.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000009</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TYednHaV9zXpnPchSywVpnseQxY9Pxw4do,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR19.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000008</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TCf5cqLffPccEY7hcsabiFnMfdipfyryvr,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR20.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000007</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TAa14iLEKPAetX49mzaxZmH6saRxcX7dT5,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR21.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000006</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TBYsHxDmFaRmfCF3jZNmgeJE8sDnTNKHbz,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR22.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000005</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TEVAq8dmSQyTYK7uP1ZnZpa6MBVR83GsV6,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR23.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000004</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TRKJzrZxN34YyB8aBqqPDt7g4fv6sieemz,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR24.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000003</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TRMP6SKeFUt5NtMLzJv8kdpYuHRnEGjGfe,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR25.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000002</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TDbNE1VajxjpgM5p7FyGNDASt3UVoFbiD3,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR26.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000001</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">      address: TLTDZBcPoJ8tZ6TTEeEqEvwYFk2wgotSfD,</span></span>
<span class="line"><span style="color:#e1e4e8;">      url = &quot;http://GR27.com&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      voteCount = 100000000</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  timestamp = &quot;0&quot; #2017-8-26 12:00:00</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  parentHash = &quot;0xe58f33f9baf9305dc6f82b9f1934ea8f0ade2defb951258d50167028c780351f&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// Optional.The default is empty.</span></span>
<span class="line"><span style="color:#e1e4e8;">// It is used when the witness account has set the witnessPermission.</span></span>
<span class="line"><span style="color:#e1e4e8;">// When it is not empty, the localWitnessAccountAddress represents the address of the witness account,</span></span>
<span class="line"><span style="color:#e1e4e8;">// and the localwitness is configured with the private key of the witnessPermissionAddress in the witness account.</span></span>
<span class="line"><span style="color:#e1e4e8;">// When it is empty,the localwitness is configured with the private key of the witness account.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//localWitnessAccountAddress =</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">localwitness = [</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#localwitnesskeystore = [</span></span>
<span class="line"><span style="color:#e1e4e8;">#  &quot;localwitnesskeystore.json&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">block = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  needSyncCheck = true</span></span>
<span class="line"><span style="color:#e1e4e8;">  maintenanceTimeInterval = 21600000</span></span>
<span class="line"><span style="color:#e1e4e8;">  proposalExpireTime = 259200000 // 3 day: 259200000(ms)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Transaction reference block, default is &quot;head&quot;, configure to &quot;solid&quot; can avoid TaPos error</span></span>
<span class="line"><span style="color:#e1e4e8;"># trx.reference.block = &quot;head&quot; // head;solid;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># This property sets the number of milliseconds after the creation of the transaction that is expired, default value is  60000.</span></span>
<span class="line"><span style="color:#e1e4e8;"># trx.expiration.timeInMilliseconds = 60000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vm = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  supportConstant = true</span></span>
<span class="line"><span style="color:#e1e4e8;">  minTimeRatio = 0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">  maxTimeRatio = 5.0</span></span>
<span class="line"><span style="color:#e1e4e8;">  saveInternalTx = false</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  # In rare cases, transactions that will be within the specified maximum execution time (default 10(ms)) are re-executed and packaged</span></span>
<span class="line"><span style="color:#e1e4e8;">  # longRunningTime = 10</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">committee = {</span></span>
<span class="line"><span style="color:#e1e4e8;">  allowCreationOfContracts = 0  //mainnet:0 (reset by committee),test:1</span></span>
<span class="line"><span style="color:#e1e4e8;">  allowAdaptiveEnergy = 0  //mainnet:0 (reset by committee),test:1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">event.subscribe = {</span></span>
<span class="line"><span style="color:#e1e4e8;">    native = {</span></span>
<span class="line"><span style="color:#e1e4e8;">      useNativeQueue = true // if true, use native message queue, else use event plugin.</span></span>
<span class="line"><span style="color:#e1e4e8;">      bindport = 5555 // bind port</span></span>
<span class="line"><span style="color:#e1e4e8;">      sendqueuelength = 1000 //max length of send queue</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    path = &quot;&quot; // absolute path of plugin</span></span>
<span class="line"><span style="color:#e1e4e8;">    server = &quot;&quot; // target server address to receive event triggers</span></span>
<span class="line"><span style="color:#e1e4e8;">    dbconfig=&quot;&quot; // dbname|username|password</span></span>
<span class="line"><span style="color:#e1e4e8;">    contractParse = true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    topics = [</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">          triggerName = &quot;block&quot; // block trigger, the value can&#39;t be modified</span></span>
<span class="line"><span style="color:#e1e4e8;">          enable = false</span></span>
<span class="line"><span style="color:#e1e4e8;">          topic = &quot;block&quot; // plugin topic, the value could be modified</span></span>
<span class="line"><span style="color:#e1e4e8;">        },</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">          triggerName = &quot;transaction&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          enable = false</span></span>
<span class="line"><span style="color:#e1e4e8;">          topic = &quot;transaction&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        },</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">          triggerName = &quot;contractevent&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          enable = false</span></span>
<span class="line"><span style="color:#e1e4e8;">          topic = &quot;contractevent&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        },</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">          triggerName = &quot;contractlog&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          enable = false</span></span>
<span class="line"><span style="color:#e1e4e8;">          topic = &quot;contractlog&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        },</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">          triggerName = &quot;solidity&quot; // solidity block event trigger, the value can&#39;t be modified</span></span>
<span class="line"><span style="color:#e1e4e8;">          enable = true            // the default value is true</span></span>
<span class="line"><span style="color:#e1e4e8;">          topic = &quot;solidity&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    filter = {</span></span>
<span class="line"><span style="color:#e1e4e8;">       fromblock = &quot;&quot; // the value could be &quot;&quot;, &quot;earliest&quot; or a specified block number as the beginning of the queried range</span></span>
<span class="line"><span style="color:#e1e4e8;">       toblock = &quot;&quot; // the value could be &quot;&quot;, &quot;latest&quot; or a specified block number as end of the queried range</span></span>
<span class="line"><span style="color:#e1e4e8;">       contractAddress = [</span></span>
<span class="line"><span style="color:#e1e4e8;">           &quot;&quot; // contract address you want to subscribe, if it&#39;s set to &quot;&quot;, you will receive contract logs/events with any contract address.</span></span>
<span class="line"><span style="color:#e1e4e8;">       ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">       contractTopic = [</span></span>
<span class="line"><span style="color:#e1e4e8;">           &quot;&quot; // contract topic you want to subscribe, if it&#39;s set to &quot;&quot;, you will receive contract logs/events with any contract topic.</span></span>
<span class="line"><span style="color:#e1e4e8;">       ]</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">net {</span></span>
<span class="line"><span style="color:#24292e;">  type = mainnet</span></span>
<span class="line"><span style="color:#24292e;">  # type = testnet</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">storage {</span></span>
<span class="line"><span style="color:#24292e;">  # Directory for storing persistent data</span></span>
<span class="line"><span style="color:#24292e;">  db.version = 2,</span></span>
<span class="line"><span style="color:#24292e;">  db.engine = &quot;LEVELDB&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  db.sync = false,</span></span>
<span class="line"><span style="color:#24292e;">  db.directory = &quot;database&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  index.directory = &quot;index&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  transHistory.switch = &quot;on&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  # You can custom these 14 databases&#39; configs:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # account, account-index, asset-issue, block, block-index,</span></span>
<span class="line"><span style="color:#24292e;">  # block_KDB, peers, properties, recent-block, trans,</span></span>
<span class="line"><span style="color:#24292e;">  # utxo, votes, witness, witness_schedule.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # Otherwise, db configs will remain defualt and data will be stored in</span></span>
<span class="line"><span style="color:#24292e;">  # the path of &quot;output-directory&quot; or which is set by &quot;-d&quot; (&quot;--output-directory&quot;).</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # Attention: name is a required field that must be set !!!</span></span>
<span class="line"><span style="color:#24292e;">  properties = [</span></span>
<span class="line"><span style="color:#24292e;">//    {</span></span>
<span class="line"><span style="color:#24292e;">//      name = &quot;account&quot;,</span></span>
<span class="line"><span style="color:#24292e;">//      path = &quot;storage_directory_test&quot;,</span></span>
<span class="line"><span style="color:#24292e;">//      createIfMissing = true,</span></span>
<span class="line"><span style="color:#24292e;">//      paranoidChecks = true,</span></span>
<span class="line"><span style="color:#24292e;">//      verifyChecksums = true,</span></span>
<span class="line"><span style="color:#24292e;">    //      compressionType = 1,        // compressed with snappy</span></span>
<span class="line"><span style="color:#24292e;">    //      blockSize = 4096,           // 4  KB =         4 * 1024 B</span></span>
<span class="line"><span style="color:#24292e;">    //      writeBufferSize = 10485760, // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#24292e;">    //      cacheSize = 10485760,       // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#24292e;">    //      maxOpenFiles = 100</span></span>
<span class="line"><span style="color:#24292e;">    //    },</span></span>
<span class="line"><span style="color:#24292e;">//    {</span></span>
<span class="line"><span style="color:#24292e;">//      name = &quot;account-index&quot;,</span></span>
<span class="line"><span style="color:#24292e;">//      path = &quot;storage_directory_test&quot;,</span></span>
<span class="line"><span style="color:#24292e;">//      createIfMissing = true,</span></span>
<span class="line"><span style="color:#24292e;">//      paranoidChecks = true,</span></span>
<span class="line"><span style="color:#24292e;">//      verifyChecksums = true,</span></span>
<span class="line"><span style="color:#24292e;">    //      compressionType = 1,        // compressed with snappy</span></span>
<span class="line"><span style="color:#24292e;">    //      blockSize = 4096,           // 4  KB =         4 * 1024 B</span></span>
<span class="line"><span style="color:#24292e;">    //      writeBufferSize = 10485760, // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#24292e;">    //      cacheSize = 10485760,       // 10 MB = 10 * 1024 * 1024 B</span></span>
<span class="line"><span style="color:#24292e;">    //      maxOpenFiles = 100</span></span>
<span class="line"><span style="color:#24292e;">    //    },</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  needToUpdateAsset = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  //dbsettings is needed when using rocksdb as the storage implement (db.version=2 and db.engine=&quot;ROCKSDB&quot;).</span></span>
<span class="line"><span style="color:#24292e;">  //we&#39;d strongly recommend that do not modify it unless you know every item&#39;s meaning clearly.</span></span>
<span class="line"><span style="color:#24292e;">  dbSettings = {</span></span>
<span class="line"><span style="color:#24292e;">    levelNumber = 7</span></span>
<span class="line"><span style="color:#24292e;">    //compactThreads = 32</span></span>
<span class="line"><span style="color:#24292e;">    blocksize = 64  // n * KB</span></span>
<span class="line"><span style="color:#24292e;">    maxBytesForLevelBase = 256  // n * MB</span></span>
<span class="line"><span style="color:#24292e;">    maxBytesForLevelMultiplier = 10</span></span>
<span class="line"><span style="color:#24292e;">    level0FileNumCompactionTrigger = 4</span></span>
<span class="line"><span style="color:#24292e;">    targetFileSizeBase = 256  // n * MB</span></span>
<span class="line"><span style="color:#24292e;">    targetFileSizeMultiplier = 1</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  //backup settings when using rocks db as the storage implement (db.version=2 and db.engine=&quot;ROCKSDB&quot;).</span></span>
<span class="line"><span style="color:#24292e;">  //if you want to use the backup plugin, please confirm set the db.version=2 and db.engine=&quot;ROCKSDB&quot; above.</span></span>
<span class="line"><span style="color:#24292e;">  backup = {</span></span>
<span class="line"><span style="color:#24292e;">    enable = false  // indicate whether enable the backup plugin</span></span>
<span class="line"><span style="color:#24292e;">    propPath = &quot;prop.properties&quot; // record which bak directory is valid</span></span>
<span class="line"><span style="color:#24292e;">    bak1path = &quot;bak1/database&quot; // you must set two backup directories to prevent application halt unexpected(e.g. kill -9).</span></span>
<span class="line"><span style="color:#24292e;">    bak2path = &quot;bak2/database&quot;</span></span>
<span class="line"><span style="color:#24292e;">    frequency = 10000   // indicate backup db once every 10000 blocks processed.</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">node.discovery = {</span></span>
<span class="line"><span style="color:#24292e;">  enable = true</span></span>
<span class="line"><span style="color:#24292e;">  persist = true</span></span>
<span class="line"><span style="color:#24292e;">  bind.ip = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">  external.ip = null</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">node.backup {</span></span>
<span class="line"><span style="color:#24292e;">  port = 10001</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # my priority, each member should use different priority</span></span>
<span class="line"><span style="color:#24292e;">  priority = 8</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # peer&#39;s ip list, can&#39;t contain mine</span></span>
<span class="line"><span style="color:#24292e;">  members = [</span></span>
<span class="line"><span style="color:#24292e;">    # &quot;ip&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    # &quot;ip&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">node {</span></span>
<span class="line"><span style="color:#24292e;">  # trust node for solidity node</span></span>
<span class="line"><span style="color:#24292e;">  # trustNode = &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#24292e;">  trustNode = &quot;127.0.0.1:50051&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # expose extension api to public or not</span></span>
<span class="line"><span style="color:#24292e;">  walletExtensionApi = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  listen.port = 18888</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  connection.timeout = 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  tcpNettyWorkThreadNum = 0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  udpNettyWorkThreadNum = 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # Number of validate sign thread, default availableProcessors / 2</span></span>
<span class="line"><span style="color:#24292e;">  # validateSignThreadNum = 16</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  connectFactor = 0.3</span></span>
<span class="line"><span style="color:#24292e;">  activeConnectFactor = 0.1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  maxActiveNodes = 30</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  maxActiveNodesWithSameIp = 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  maxHttpConnectNumber = 50</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  minParticipationRate = 15</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # check the peer data transfer ,disconnect factor</span></span>
<span class="line"><span style="color:#24292e;">  disconnectNumberFactor = 0.4</span></span>
<span class="line"><span style="color:#24292e;">  maxConnectNumberFactor = 0.8</span></span>
<span class="line"><span style="color:#24292e;">  receiveTcpMinDataLength = 2048</span></span>
<span class="line"><span style="color:#24292e;">  isOpenFullTcpDisconnect = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  p2p {</span></span>
<span class="line"><span style="color:#24292e;">    version = 11111 # 11111: mainnet; 20180622: testnet</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  active = [</span></span>
<span class="line"><span style="color:#24292e;">    # Active establish connection in any case</span></span>
<span class="line"><span style="color:#24292e;">    # Sample entries:</span></span>
<span class="line"><span style="color:#24292e;">    # &quot;ip:port&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    # &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  passive = [</span></span>
<span class="line"><span style="color:#24292e;">    # Passive accept connection in any case</span></span>
<span class="line"><span style="color:#24292e;">    # Sample entries:</span></span>
<span class="line"><span style="color:#24292e;">    # &quot;ip:port&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    # &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  fastForward = [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;100.26.245.209:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;15.188.6.125:18888&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  http {</span></span>
<span class="line"><span style="color:#24292e;">    fullNodePort = 8090</span></span>
<span class="line"><span style="color:#24292e;">    solidityPort = 8091</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  rpc {</span></span>
<span class="line"><span style="color:#24292e;">    port = 50051</span></span>
<span class="line"><span style="color:#24292e;">    #solidityPort = 50061</span></span>
<span class="line"><span style="color:#24292e;">    # Number of gRPC thread, default availableProcessors / 2</span></span>
<span class="line"><span style="color:#24292e;">    # thread = 16</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # The maximum number of concurrent calls permitted for each incoming connection</span></span>
<span class="line"><span style="color:#24292e;">    # maxConcurrentCallsPerConnection =</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # The HTTP/2 flow control window, default 1MB</span></span>
<span class="line"><span style="color:#24292e;">    # flowControlWindow =</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # Connection being idle for longer than which will be gracefully terminated</span></span>
<span class="line"><span style="color:#24292e;">    maxConnectionIdleInMillis = 60000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # Connection lasting longer than which will be gracefully terminated</span></span>
<span class="line"><span style="color:#24292e;">    # maxConnectionAgeInMillis =</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # The maximum message size allowed to be received on the server, default 4MB</span></span>
<span class="line"><span style="color:#24292e;">    # maxMessageSize =</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # The maximum size of header list allowed to be received, default 8192</span></span>
<span class="line"><span style="color:#24292e;">    # maxHeaderListSize =</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # Transactions can only be broadcast if the number of effective connections is reached.</span></span>
<span class="line"><span style="color:#24292e;">    minEffectiveConnection = 1</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # number of solidity thread in the FullNode.</span></span>
<span class="line"><span style="color:#24292e;">  # If accessing solidity rpc and http interface timeout, could increase the number of threads,</span></span>
<span class="line"><span style="color:#24292e;">  # The default value is the number of cpu cores of the machine.</span></span>
<span class="line"><span style="color:#24292e;">  #solidity.threads = 8</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # Limits the maximum percentage (default 75%) of producing block interval</span></span>
<span class="line"><span style="color:#24292e;">  # to provide sufficient time to perform other operations e.g. broadcast block</span></span>
<span class="line"><span style="color:#24292e;">  # blockProducedTimeOut = 75</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # Limits the maximum number (default 700) of transaction from network layer</span></span>
<span class="line"><span style="color:#24292e;">  # netMaxTrxPerSecond = 700</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">seed.node = {</span></span>
<span class="line"><span style="color:#24292e;">  # List of the seed nodes</span></span>
<span class="line"><span style="color:#24292e;">  # Seed nodes are stable full nodes</span></span>
<span class="line"><span style="color:#24292e;">  # example:</span></span>
<span class="line"><span style="color:#24292e;">  # ip.list = [</span></span>
<span class="line"><span style="color:#24292e;">  #   &quot;ip:port&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  #   &quot;ip:port&quot;</span></span>
<span class="line"><span style="color:#24292e;">  # ]</span></span>
<span class="line"><span style="color:#24292e;">  ip.list = [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;3.225.171.164:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;52.53.189.99:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;18.196.99.16:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;34.253.187.192:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;18.133.82.227:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;35.180.51.163:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;54.252.224.209:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;18.228.15.36:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;52.15.93.92:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;34.220.77.106:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;13.127.47.162:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;13.124.62.58:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;13.229.128.108:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;35.182.37.246:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;34.200.228.125:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;18.220.232.201:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;13.57.30.186:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;35.165.103.105:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;18.184.238.21:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;34.250.140.143:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;35.176.192.130:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;52.47.197.188:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;52.62.210.100:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;13.231.4.243:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;18.231.76.29:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;35.154.90.144:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;13.125.210.234:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;13.250.40.82:18888&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;35.183.101.48:18888&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">genesis.block = {</span></span>
<span class="line"><span style="color:#24292e;">  # Reserve balance</span></span>
<span class="line"><span style="color:#24292e;">  assets = [</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      accountName = &quot;Zion&quot;</span></span>
<span class="line"><span style="color:#24292e;">      accountType = &quot;AssetIssue&quot;</span></span>
<span class="line"><span style="color:#24292e;">      address = &quot;TLLM21wteSPs4hKjbxgmH1L6poyMjeTbHm&quot;</span></span>
<span class="line"><span style="color:#24292e;">      balance = &quot;99000000000000000&quot;</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      accountName = &quot;Sun&quot;</span></span>
<span class="line"><span style="color:#24292e;">      accountType = &quot;AssetIssue&quot;</span></span>
<span class="line"><span style="color:#24292e;">      address = &quot;TXmVpin5vq5gdZsciyyjdZgKRUju4st1wM&quot;</span></span>
<span class="line"><span style="color:#24292e;">      balance = &quot;0&quot;</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      accountName = &quot;Blackhole&quot;</span></span>
<span class="line"><span style="color:#24292e;">      accountType = &quot;AssetIssue&quot;</span></span>
<span class="line"><span style="color:#24292e;">      address = &quot;TLsV52sRDL79HXGGm9yzwKibb6BeruhUzy&quot;</span></span>
<span class="line"><span style="color:#24292e;">      balance = &quot;-9223372036854775808&quot;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  witnesses = [</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: THKJYuUmMKKARNf7s2VT51g5uPY6KEqnat,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR1.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000026</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TVDmPWGYxgi5DNeW8hXrzrhY8Y6zgxPNg4,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR2.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000025</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TWKZN1JJPFydd5rMgMCV5aZTSiwmoksSZv,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR3.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000024</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TDarXEG2rAD57oa7JTK785Yb2Et32UzY32,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR4.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000023</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TAmFfS4Tmm8yKeoqZN8x51ASwdQBdnVizt,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR5.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000022</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TK6V5Pw2UWQWpySnZyCDZaAvu1y48oRgXN,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR6.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000021</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TGqFJPFiEqdZx52ZR4QcKHz4Zr3QXA24VL,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR7.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000020</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TC1ZCj9Ne3j5v3TLx5ZCDLD55MU9g3XqQW,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR8.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000019</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TWm3id3mrQ42guf7c4oVpYExyTYnEGy3JL,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR9.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000018</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TCvwc3FV3ssq2rD82rMmjhT4PVXYTsFcKV,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR10.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000017</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TFuC2Qge4GxA2U9abKxk1pw3YZvGM5XRir,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR11.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000016</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TNGoca1VHC6Y5Jd2B1VFpFEhizVk92Rz85,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR12.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000015</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TLCjmH6SqGK8twZ9XrBDWpBbfyvEXihhNS,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR13.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000014</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TEEzguTtCihbRPfjf1CvW8Euxz1kKuvtR9,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR14.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000013</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TZHvwiw9cehbMxrtTbmAexm9oPo4eFFvLS,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR15.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000012</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TGK6iAKgBmHeQyp5hn3imB71EDnFPkXiPR,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR16.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000011</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TLaqfGrxZ3dykAFps7M2B4gETTX1yixPgN,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR17.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000010</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TX3ZceVew6yLC5hWTXnjrUFtiFfUDGKGty,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR18.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000009</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TYednHaV9zXpnPchSywVpnseQxY9Pxw4do,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR19.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000008</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TCf5cqLffPccEY7hcsabiFnMfdipfyryvr,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR20.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000007</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TAa14iLEKPAetX49mzaxZmH6saRxcX7dT5,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR21.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000006</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TBYsHxDmFaRmfCF3jZNmgeJE8sDnTNKHbz,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR22.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000005</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TEVAq8dmSQyTYK7uP1ZnZpa6MBVR83GsV6,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR23.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000004</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TRKJzrZxN34YyB8aBqqPDt7g4fv6sieemz,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR24.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000003</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TRMP6SKeFUt5NtMLzJv8kdpYuHRnEGjGfe,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR25.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000002</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TDbNE1VajxjpgM5p7FyGNDASt3UVoFbiD3,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR26.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000001</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">      address: TLTDZBcPoJ8tZ6TTEeEqEvwYFk2wgotSfD,</span></span>
<span class="line"><span style="color:#24292e;">      url = &quot;http://GR27.com&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      voteCount = 100000000</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  timestamp = &quot;0&quot; #2017-8-26 12:00:00</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  parentHash = &quot;0xe58f33f9baf9305dc6f82b9f1934ea8f0ade2defb951258d50167028c780351f&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// Optional.The default is empty.</span></span>
<span class="line"><span style="color:#24292e;">// It is used when the witness account has set the witnessPermission.</span></span>
<span class="line"><span style="color:#24292e;">// When it is not empty, the localWitnessAccountAddress represents the address of the witness account,</span></span>
<span class="line"><span style="color:#24292e;">// and the localwitness is configured with the private key of the witnessPermissionAddress in the witness account.</span></span>
<span class="line"><span style="color:#24292e;">// When it is empty,the localwitness is configured with the private key of the witness account.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//localWitnessAccountAddress =</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">localwitness = [</span></span>
<span class="line"><span style="color:#24292e;">]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#localwitnesskeystore = [</span></span>
<span class="line"><span style="color:#24292e;">#  &quot;localwitnesskeystore.json&quot;</span></span>
<span class="line"><span style="color:#24292e;">#]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">block = {</span></span>
<span class="line"><span style="color:#24292e;">  needSyncCheck = true</span></span>
<span class="line"><span style="color:#24292e;">  maintenanceTimeInterval = 21600000</span></span>
<span class="line"><span style="color:#24292e;">  proposalExpireTime = 259200000 // 3 day: 259200000(ms)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Transaction reference block, default is &quot;head&quot;, configure to &quot;solid&quot; can avoid TaPos error</span></span>
<span class="line"><span style="color:#24292e;"># trx.reference.block = &quot;head&quot; // head;solid;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># This property sets the number of milliseconds after the creation of the transaction that is expired, default value is  60000.</span></span>
<span class="line"><span style="color:#24292e;"># trx.expiration.timeInMilliseconds = 60000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vm = {</span></span>
<span class="line"><span style="color:#24292e;">  supportConstant = true</span></span>
<span class="line"><span style="color:#24292e;">  minTimeRatio = 0.0</span></span>
<span class="line"><span style="color:#24292e;">  maxTimeRatio = 5.0</span></span>
<span class="line"><span style="color:#24292e;">  saveInternalTx = false</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  # In rare cases, transactions that will be within the specified maximum execution time (default 10(ms)) are re-executed and packaged</span></span>
<span class="line"><span style="color:#24292e;">  # longRunningTime = 10</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">committee = {</span></span>
<span class="line"><span style="color:#24292e;">  allowCreationOfContracts = 0  //mainnet:0 (reset by committee),test:1</span></span>
<span class="line"><span style="color:#24292e;">  allowAdaptiveEnergy = 0  //mainnet:0 (reset by committee),test:1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">event.subscribe = {</span></span>
<span class="line"><span style="color:#24292e;">    native = {</span></span>
<span class="line"><span style="color:#24292e;">      useNativeQueue = true // if true, use native message queue, else use event plugin.</span></span>
<span class="line"><span style="color:#24292e;">      bindport = 5555 // bind port</span></span>
<span class="line"><span style="color:#24292e;">      sendqueuelength = 1000 //max length of send queue</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    path = &quot;&quot; // absolute path of plugin</span></span>
<span class="line"><span style="color:#24292e;">    server = &quot;&quot; // target server address to receive event triggers</span></span>
<span class="line"><span style="color:#24292e;">    dbconfig=&quot;&quot; // dbname|username|password</span></span>
<span class="line"><span style="color:#24292e;">    contractParse = true,</span></span>
<span class="line"><span style="color:#24292e;">    topics = [</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">          triggerName = &quot;block&quot; // block trigger, the value can&#39;t be modified</span></span>
<span class="line"><span style="color:#24292e;">          enable = false</span></span>
<span class="line"><span style="color:#24292e;">          topic = &quot;block&quot; // plugin topic, the value could be modified</span></span>
<span class="line"><span style="color:#24292e;">        },</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">          triggerName = &quot;transaction&quot;</span></span>
<span class="line"><span style="color:#24292e;">          enable = false</span></span>
<span class="line"><span style="color:#24292e;">          topic = &quot;transaction&quot;</span></span>
<span class="line"><span style="color:#24292e;">        },</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">          triggerName = &quot;contractevent&quot;</span></span>
<span class="line"><span style="color:#24292e;">          enable = false</span></span>
<span class="line"><span style="color:#24292e;">          topic = &quot;contractevent&quot;</span></span>
<span class="line"><span style="color:#24292e;">        },</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">          triggerName = &quot;contractlog&quot;</span></span>
<span class="line"><span style="color:#24292e;">          enable = false</span></span>
<span class="line"><span style="color:#24292e;">          topic = &quot;contractlog&quot;</span></span>
<span class="line"><span style="color:#24292e;">        },</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">          triggerName = &quot;solidity&quot; // solidity block event trigger, the value can&#39;t be modified</span></span>
<span class="line"><span style="color:#24292e;">          enable = true            // the default value is true</span></span>
<span class="line"><span style="color:#24292e;">          topic = &quot;solidity&quot;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    filter = {</span></span>
<span class="line"><span style="color:#24292e;">       fromblock = &quot;&quot; // the value could be &quot;&quot;, &quot;earliest&quot; or a specified block number as the beginning of the queried range</span></span>
<span class="line"><span style="color:#24292e;">       toblock = &quot;&quot; // the value could be &quot;&quot;, &quot;latest&quot; or a specified block number as end of the queried range</span></span>
<span class="line"><span style="color:#24292e;">       contractAddress = [</span></span>
<span class="line"><span style="color:#24292e;">           &quot;&quot; // contract address you want to subscribe, if it&#39;s set to &quot;&quot;, you will receive contract logs/events with any contract address.</span></span>
<span class="line"><span style="color:#24292e;">       ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">       contractTopic = [</span></span>
<span class="line"><span style="color:#24292e;">           &quot;&quot; // contract topic you want to subscribe, if it&#39;s set to &quot;&quot;, you will receive contract logs/events with any contract topic.</span></span>
<span class="line"><span style="color:#24292e;">       ]</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="启动服务" tabindex="-1">启动服务 <a class="header-anchor" href="#启动服务" aria-label="Permalink to &quot;启动服务&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">nohup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xmx24g</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XX:+HeapDumpOnOutOfMemoryError</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-XX:+UseConcMarkSweepGC</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-jar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v4.7.4.jar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">main.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">2&gt;&amp;1</span><span style="color:#E1E4E8;"> &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">nohup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xmx24g</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XX:+HeapDumpOnOutOfMemoryError</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-XX:+UseConcMarkSweepGC</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-jar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v4.7.4.jar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">main.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">2&gt;&amp;1</span><span style="color:#24292E;"> &amp;</span></span></code></pre></div><h2 id="查看块高度" tabindex="-1">查看块高度 <a class="header-anchor" href="#查看块高度" aria-label="Permalink to &quot;查看块高度&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -s -H &quot;Content-Type: application/json&quot; -X POST http://127.0.0.1:8091/walletsolidity/getnowblock |jq -r .block_header.raw_data.number</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -s -H &quot;Content-Type: application/json&quot; -X POST http://127.0.0.1:8091/walletsolidity/getnowblock |jq -r .block_header.raw_data.number</span></span></code></pre></div><blockquote><p>参考文档<a href="https://tronprotocol.github.io/documentation-zh/api/http/" target="_blank" rel="noreferrer">https://tronprotocol.github.io/documentation-zh/api/http/</a></p></blockquote>`,33),o=[p];function t(c,r,i,y,u,d){return n(),a("div",null,o)}const m=s(l,[["render",t]]);export{h as __pageData,m as default};
