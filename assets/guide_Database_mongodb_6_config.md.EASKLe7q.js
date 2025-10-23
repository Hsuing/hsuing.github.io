import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1.两种样式配置文件","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/6_config.md","filePath":"guide/Database/mongodb/6_config.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/6_config.md"},o=e(`<h1 id="_1-两种样式配置文件" tabindex="-1">1.两种样式配置文件 <a class="header-anchor" href="#_1-两种样式配置文件" aria-label="Permalink to &quot;1.两种样式配置文件&quot;">​</a></h1><ul><li>文档</li></ul><p><a href="https://www.mongodb.com/docs/manual/reference/configuration-options/" target="_blank" rel="noreferrer">https://www.mongodb.com/docs/manual/reference/configuration-options/</a></p><p><a href="https://www.mongodb.com/docs/manual/reference/parameters/" target="_blank" rel="noreferrer">https://www.mongodb.com/docs/manual/reference/parameters/</a></p><h2 id="yml方式" tabindex="-1">yml方式 <a class="header-anchor" href="#yml方式" aria-label="Permalink to &quot;yml方式&quot;">​</a></h2><h3 id="存储" tabindex="-1">存储 <a class="header-anchor" href="#存储" aria-label="Permalink to &quot;存储&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">storage:</span></span>
<span class="line"><span style="color:#e1e4e8;">    dbPath: /data/mongodb/db</span></span>
<span class="line"><span style="color:#e1e4e8;">    indexBuildRetry: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    journal:</span></span>
<span class="line"><span style="color:#e1e4e8;">        enabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    directoryPerDB: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    engine: mmapv1</span></span>
<span class="line"><span style="color:#e1e4e8;">    syncPeriodSecs: 60 </span></span>
<span class="line"><span style="color:#e1e4e8;">    mmapv1:</span></span>
<span class="line"><span style="color:#e1e4e8;">        quota:</span></span>
<span class="line"><span style="color:#e1e4e8;">            enforced: false</span></span>
<span class="line"><span style="color:#e1e4e8;">            maxFilesPerDB: 8</span></span>
<span class="line"><span style="color:#e1e4e8;">        smallFiles: true	</span></span>
<span class="line"><span style="color:#e1e4e8;">        journal:</span></span>
<span class="line"><span style="color:#e1e4e8;">            commitIntervalMs: 100</span></span>
<span class="line"><span style="color:#e1e4e8;">    wiredTiger:</span></span>
<span class="line"><span style="color:#e1e4e8;">        engineConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            cacheSizeGB: 8</span></span>
<span class="line"><span style="color:#e1e4e8;">            journalCompressor: snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">            directoryForIndexes: false	</span></span>
<span class="line"><span style="color:#e1e4e8;">        collectionConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            blockCompressor: snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">        indexConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            prefixCompression: true</span></span>
<span class="line"><span style="color:#e1e4e8;">operationProfiling:</span></span>
<span class="line"><span style="color:#e1e4e8;">    slowOpThresholdMs: 100</span></span>
<span class="line"><span style="color:#e1e4e8;">    mode: off</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">storage:</span></span>
<span class="line"><span style="color:#24292e;">    dbPath: /data/mongodb/db</span></span>
<span class="line"><span style="color:#24292e;">    indexBuildRetry: true</span></span>
<span class="line"><span style="color:#24292e;">    journal:</span></span>
<span class="line"><span style="color:#24292e;">        enabled: true</span></span>
<span class="line"><span style="color:#24292e;">    directoryPerDB: false</span></span>
<span class="line"><span style="color:#24292e;">    engine: mmapv1</span></span>
<span class="line"><span style="color:#24292e;">    syncPeriodSecs: 60 </span></span>
<span class="line"><span style="color:#24292e;">    mmapv1:</span></span>
<span class="line"><span style="color:#24292e;">        quota:</span></span>
<span class="line"><span style="color:#24292e;">            enforced: false</span></span>
<span class="line"><span style="color:#24292e;">            maxFilesPerDB: 8</span></span>
<span class="line"><span style="color:#24292e;">        smallFiles: true	</span></span>
<span class="line"><span style="color:#24292e;">        journal:</span></span>
<span class="line"><span style="color:#24292e;">            commitIntervalMs: 100</span></span>
<span class="line"><span style="color:#24292e;">    wiredTiger:</span></span>
<span class="line"><span style="color:#24292e;">        engineConfig:</span></span>
<span class="line"><span style="color:#24292e;">            cacheSizeGB: 8</span></span>
<span class="line"><span style="color:#24292e;">            journalCompressor: snappy</span></span>
<span class="line"><span style="color:#24292e;">            directoryForIndexes: false	</span></span>
<span class="line"><span style="color:#24292e;">        collectionConfig:</span></span>
<span class="line"><span style="color:#24292e;">            blockCompressor: snappy</span></span>
<span class="line"><span style="color:#24292e;">        indexConfig:</span></span>
<span class="line"><span style="color:#24292e;">            prefixCompression: true</span></span>
<span class="line"><span style="color:#24292e;">operationProfiling:</span></span>
<span class="line"><span style="color:#24292e;">    slowOpThresholdMs: 100</span></span>
<span class="line"><span style="color:#24292e;">    mode: off</span></span></code></pre></div><ul><li>参数注解</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> dbPath: db</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：mongod进程存储数据目录，此配置仅对mongod进程有效。默认值为：/data/db。</span></span>
<span class="line"><span style="color:#e1e4e8;"> indexBuildRetry: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：当构建索引时mongod意外关闭，那么再次启动是否重新构建索引；索引构建失败，mongod重启后将会删除尚未完成的索引，但是否重建由此参数决定。默认值为true。</span></span>
<span class="line"><span style="color:#e1e4e8;">    repairPath: _tmp</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：配合--repair启动命令参数，在repair期间使用此目录存储临时数据，repair结束后此目录下数据将被删除，此配置仅对mongod进程有效。不建议在配置文件中配置，而是使用mongod启动命令指定。</span></span>
<span class="line"><span style="color:#e1e4e8;">    engine: mmapv1</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：存储引擎类型，mongodb 3.0之后支持“mmapv1”、“wiredTiger”两种引擎，默认值为“mmapv1”；官方宣称wiredTiger引擎更加优秀。</span></span>
<span class="line"><span style="color:#e1e4e8;">    journal:</span></span>
<span class="line"><span style="color:#e1e4e8;">        enabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">        描述：是否开启journal日志持久存储，journal日志用来数据恢复，是mongod最基础的特性，通常用于故障恢复。64位系统默认为true，32位默认为false，建议开启，仅对mongod进程有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    directoryPerDB: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：是否将不同DB的数据存储在不同的目录中，dbPath的子目录，目录名为db的名称。对已经存储数据的mongod修改此值，需要首先使用mongodump指令将数据导出，然后关闭mongod，再修改此值和指定新的dbPath，然后使用mongorestore指令重新导入数据。（即导出数据，并使用mongorestore将数据重新写入mongod的新目录中）</span></span>
<span class="line"><span style="color:#e1e4e8;">    对于replica set架构模式，只需要在每个secondary依次操作：关闭secondary，然后配置新的dbPath，然后启动即可（会执行初始化sync，从primary中将数据去完全同步到本地）。最后操作primary。</span></span>
<span class="line"><span style="color:#e1e4e8;">    此参数仅对mongod进程有效，默认值为false，不建议修改此值</span></span>
<span class="line"><span style="color:#e1e4e8;">    syncPeriodSecs: 60</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：mongod使用fsync操作将数据flush到磁盘的时间间隔，默认值为60（单位：秒），强烈建议不要修改此值；mongod将变更的数据写入journal后再写入内存，并间歇性的将内存数据flush到磁盘中，即延迟写入磁盘，有效提升磁盘效率。此指令不影响journal存储，仅对mongod有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    mmapv1:（如下配置仅对MMAPV1引擎生效）</span></span>
<span class="line"><span style="color:#e1e4e8;">        quota:</span></span>
<span class="line"><span style="color:#e1e4e8;">            enforced: false</span></span>
<span class="line"><span style="color:#e1e4e8;">            描述：配额管理，是否限制每个DB所能持有的最大文件数量，仅对mongod有效，默认值为false，建议保持默认值。</span></span>
<span class="line"><span style="color:#e1e4e8;">            maxFilesPerDB: 8</span></span>
<span class="line"><span style="color:#e1e4e8;">            描述：如果enforce开启，每个DB所持有的存储文件不会超过此阀值。仅对mongod进程有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">        smallFiles: false</span></span>
<span class="line"><span style="color:#e1e4e8;">        描述：是否使用小文件存储数据；如果此值为true，mongod将会限定每个数据文件的大小为512M（默认最大为2G），journal降低到128M（默认为1G）。如果DB的数据量较大，将会导致每个DB创建大量的小文件，这对性能有一定的影响。在production环境下，不建议修改此值，在测试时可以设置为true，节约磁盘。</span></span>
<span class="line"><span style="color:#e1e4e8;">        journal:</span></span>
<span class="line"><span style="color:#e1e4e8;">            commitIntervalMs: 100</span></span>
<span class="line"><span style="color:#e1e4e8;">            描述：mongod进程提交journal日志的时间间隔，即fsync的间隔。考虑到磁盘效能，mongod间歇性的flush日志数据；此值越小，数据丢失的可能性越低，磁盘消耗越大，性能越低。如果希望write操作强制立即写入journal，可以传递参数选项“j:true”（在客户端write操作中指定此选项即可），此操作（包括此前尚未提交的）将会立即fsync到磁盘。仅对mongod有效，单位：毫秒</span></span>
<span class="line"><span style="color:#e1e4e8;">        nsSize: 每个database的namespace文件的大小，默认为16，单位：M；最大值可以设置为2048，即dbpath下“.ns”后缀文件的大小。16M基本上可以保存24000条命名条目，新建一个collection或者index信息，即会增加一个namespace条目；如果你的database下需要创建大量的collection（比如数据分析），则可以适度调大此值。</span></span>
<span class="line"><span style="color:#e1e4e8;">    wiredTiger:（如下配置仅对wiredTiger引擎生效（3.0以上版本）</span></span>
<span class="line"><span style="color:#e1e4e8;">        engineConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            cacheSizeGB: 8</span></span>
<span class="line"><span style="color:#e1e4e8;">            描述：wiredTiger缓存工作集（working set）数据的内存大小，单位：GB，此值决定了wiredTiger与mmapv1的内存模型不同，它可以限制mongod对内存的使用量，而mmapv1则不能（依赖于系统级的mmap）。默认情况下，cacheSizeGB的值为假定当前节点只部署一个mongod实例，此值的大小为物理内存的一半；如果当前节点部署了多个mongod进程，那么需要合理配置此值。如果mongod部署在虚拟容器中（比如，lxc，cgroups，Docker）等，它将不能使用整个系统的物理内存，则需要适当调整此值。默认值为物理内存的一半。</span></span>
<span class="line"><span style="color:#e1e4e8;">            journalCompressor: snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">            描述：journal日志的压缩算法，可选值为“none”、“snappy”、“zlib”。</span></span>
<span class="line"><span style="color:#e1e4e8;">            directoryForIndexes: false</span></span>
<span class="line"><span style="color:#e1e4e8;">            描述：是否将索引和collections数据分别存储在dbPath单独的目录中。即index数据保存“index”子目录，collections数据保存在“collection”子目录。默认值为false，仅对mongod有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">        collectionConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">             blockCompressor: snappy</span></span>
<span class="line"><span style="color:#e1e4e8;">             描述：collection数据压缩算法，可选值“none”、“snappy”、“zlib”。开发者在创建collection时可以指定值，以覆盖此配置项。如果mongod中已经存在数据，修改此值不会带来问题，旧数据仍然使用原来的算法解压，新数据文件将会采用新的解压缩算法。</span></span>
<span class="line"><span style="color:#e1e4e8;">        indexConfig:</span></span>
<span class="line"><span style="color:#e1e4e8;">            prefixCompression: true</span></span>
<span class="line"><span style="color:#e1e4e8;">            描述：是否对索引数据使用“前缀压缩”（prefix compression，一种算法）。前缀压缩，对那些经过排序的值存储，有很大帮助，可以有效的减少索引数据的内存使用量。默认值为true。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> dbPath: db</span></span>
<span class="line"><span style="color:#24292e;">    描述：mongod进程存储数据目录，此配置仅对mongod进程有效。默认值为：/data/db。</span></span>
<span class="line"><span style="color:#24292e;"> indexBuildRetry: true</span></span>
<span class="line"><span style="color:#24292e;">    描述：当构建索引时mongod意外关闭，那么再次启动是否重新构建索引；索引构建失败，mongod重启后将会删除尚未完成的索引，但是否重建由此参数决定。默认值为true。</span></span>
<span class="line"><span style="color:#24292e;">    repairPath: _tmp</span></span>
<span class="line"><span style="color:#24292e;">    描述：配合--repair启动命令参数，在repair期间使用此目录存储临时数据，repair结束后此目录下数据将被删除，此配置仅对mongod进程有效。不建议在配置文件中配置，而是使用mongod启动命令指定。</span></span>
<span class="line"><span style="color:#24292e;">    engine: mmapv1</span></span>
<span class="line"><span style="color:#24292e;">    描述：存储引擎类型，mongodb 3.0之后支持“mmapv1”、“wiredTiger”两种引擎，默认值为“mmapv1”；官方宣称wiredTiger引擎更加优秀。</span></span>
<span class="line"><span style="color:#24292e;">    journal:</span></span>
<span class="line"><span style="color:#24292e;">        enabled: true</span></span>
<span class="line"><span style="color:#24292e;">        描述：是否开启journal日志持久存储，journal日志用来数据恢复，是mongod最基础的特性，通常用于故障恢复。64位系统默认为true，32位默认为false，建议开启，仅对mongod进程有效。</span></span>
<span class="line"><span style="color:#24292e;">    directoryPerDB: false</span></span>
<span class="line"><span style="color:#24292e;">    描述：是否将不同DB的数据存储在不同的目录中，dbPath的子目录，目录名为db的名称。对已经存储数据的mongod修改此值，需要首先使用mongodump指令将数据导出，然后关闭mongod，再修改此值和指定新的dbPath，然后使用mongorestore指令重新导入数据。（即导出数据，并使用mongorestore将数据重新写入mongod的新目录中）</span></span>
<span class="line"><span style="color:#24292e;">    对于replica set架构模式，只需要在每个secondary依次操作：关闭secondary，然后配置新的dbPath，然后启动即可（会执行初始化sync，从primary中将数据去完全同步到本地）。最后操作primary。</span></span>
<span class="line"><span style="color:#24292e;">    此参数仅对mongod进程有效，默认值为false，不建议修改此值</span></span>
<span class="line"><span style="color:#24292e;">    syncPeriodSecs: 60</span></span>
<span class="line"><span style="color:#24292e;">    描述：mongod使用fsync操作将数据flush到磁盘的时间间隔，默认值为60（单位：秒），强烈建议不要修改此值；mongod将变更的数据写入journal后再写入内存，并间歇性的将内存数据flush到磁盘中，即延迟写入磁盘，有效提升磁盘效率。此指令不影响journal存储，仅对mongod有效。</span></span>
<span class="line"><span style="color:#24292e;">    mmapv1:（如下配置仅对MMAPV1引擎生效）</span></span>
<span class="line"><span style="color:#24292e;">        quota:</span></span>
<span class="line"><span style="color:#24292e;">            enforced: false</span></span>
<span class="line"><span style="color:#24292e;">            描述：配额管理，是否限制每个DB所能持有的最大文件数量，仅对mongod有效，默认值为false，建议保持默认值。</span></span>
<span class="line"><span style="color:#24292e;">            maxFilesPerDB: 8</span></span>
<span class="line"><span style="color:#24292e;">            描述：如果enforce开启，每个DB所持有的存储文件不会超过此阀值。仅对mongod进程有效。</span></span>
<span class="line"><span style="color:#24292e;">        smallFiles: false</span></span>
<span class="line"><span style="color:#24292e;">        描述：是否使用小文件存储数据；如果此值为true，mongod将会限定每个数据文件的大小为512M（默认最大为2G），journal降低到128M（默认为1G）。如果DB的数据量较大，将会导致每个DB创建大量的小文件，这对性能有一定的影响。在production环境下，不建议修改此值，在测试时可以设置为true，节约磁盘。</span></span>
<span class="line"><span style="color:#24292e;">        journal:</span></span>
<span class="line"><span style="color:#24292e;">            commitIntervalMs: 100</span></span>
<span class="line"><span style="color:#24292e;">            描述：mongod进程提交journal日志的时间间隔，即fsync的间隔。考虑到磁盘效能，mongod间歇性的flush日志数据；此值越小，数据丢失的可能性越低，磁盘消耗越大，性能越低。如果希望write操作强制立即写入journal，可以传递参数选项“j:true”（在客户端write操作中指定此选项即可），此操作（包括此前尚未提交的）将会立即fsync到磁盘。仅对mongod有效，单位：毫秒</span></span>
<span class="line"><span style="color:#24292e;">        nsSize: 每个database的namespace文件的大小，默认为16，单位：M；最大值可以设置为2048，即dbpath下“.ns”后缀文件的大小。16M基本上可以保存24000条命名条目，新建一个collection或者index信息，即会增加一个namespace条目；如果你的database下需要创建大量的collection（比如数据分析），则可以适度调大此值。</span></span>
<span class="line"><span style="color:#24292e;">    wiredTiger:（如下配置仅对wiredTiger引擎生效（3.0以上版本）</span></span>
<span class="line"><span style="color:#24292e;">        engineConfig:</span></span>
<span class="line"><span style="color:#24292e;">            cacheSizeGB: 8</span></span>
<span class="line"><span style="color:#24292e;">            描述：wiredTiger缓存工作集（working set）数据的内存大小，单位：GB，此值决定了wiredTiger与mmapv1的内存模型不同，它可以限制mongod对内存的使用量，而mmapv1则不能（依赖于系统级的mmap）。默认情况下，cacheSizeGB的值为假定当前节点只部署一个mongod实例，此值的大小为物理内存的一半；如果当前节点部署了多个mongod进程，那么需要合理配置此值。如果mongod部署在虚拟容器中（比如，lxc，cgroups，Docker）等，它将不能使用整个系统的物理内存，则需要适当调整此值。默认值为物理内存的一半。</span></span>
<span class="line"><span style="color:#24292e;">            journalCompressor: snappy</span></span>
<span class="line"><span style="color:#24292e;">            描述：journal日志的压缩算法，可选值为“none”、“snappy”、“zlib”。</span></span>
<span class="line"><span style="color:#24292e;">            directoryForIndexes: false</span></span>
<span class="line"><span style="color:#24292e;">            描述：是否将索引和collections数据分别存储在dbPath单独的目录中。即index数据保存“index”子目录，collections数据保存在“collection”子目录。默认值为false，仅对mongod有效。</span></span>
<span class="line"><span style="color:#24292e;">        collectionConfig:</span></span>
<span class="line"><span style="color:#24292e;">             blockCompressor: snappy</span></span>
<span class="line"><span style="color:#24292e;">             描述：collection数据压缩算法，可选值“none”、“snappy”、“zlib”。开发者在创建collection时可以指定值，以覆盖此配置项。如果mongod中已经存在数据，修改此值不会带来问题，旧数据仍然使用原来的算法解压，新数据文件将会采用新的解压缩算法。</span></span>
<span class="line"><span style="color:#24292e;">        indexConfig:</span></span>
<span class="line"><span style="color:#24292e;">            prefixCompression: true</span></span>
<span class="line"><span style="color:#24292e;">            描述：是否对索引数据使用“前缀压缩”（prefix compression，一种算法）。前缀压缩，对那些经过排序的值存储，有很大帮助，可以有效的减少索引数据的内存使用量。默认值为true。</span></span></code></pre></div><h3 id="线程配置" tabindex="-1">线程配置 <a class="header-anchor" href="#线程配置" aria-label="Permalink to &quot;线程配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">processManagement:</span></span>
<span class="line"><span style="color:#e1e4e8;">    fork: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    pidFilePath: /data/mongodb/mongod.pid</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">fork: &lt;true | false&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：是否以fork模式运行mongod/mongos进程，默认为false。</span></span>
<span class="line"><span style="color:#e1e4e8;">    pidFilePath:&lt;路径&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：配合&quot;fork:true&quot;参数，将mongod/mongos进程ID写入指定的文件，如果不指定，将不会创建PID文件。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">processManagement:</span></span>
<span class="line"><span style="color:#24292e;">    fork: true</span></span>
<span class="line"><span style="color:#24292e;">    pidFilePath: /data/mongodb/mongod.pid</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">fork: &lt;true | false&gt;</span></span>
<span class="line"><span style="color:#24292e;">    描述：是否以fork模式运行mongod/mongos进程，默认为false。</span></span>
<span class="line"><span style="color:#24292e;">    pidFilePath:&lt;路径&gt;</span></span>
<span class="line"><span style="color:#24292e;">    描述：配合&quot;fork:true&quot;参数，将mongod/mongos进程ID写入指定的文件，如果不指定，将不会创建PID文件。</span></span></code></pre></div><h4 id="连接池资源" tabindex="-1">连接池资源 <a class="header-anchor" href="#连接池资源" aria-label="Permalink to &quot;连接池资源&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">setParameter:</span></span>
<span class="line"><span style="color:#e1e4e8;">    connPoolMaxShardedConnsPerHost: 200</span></span>
<span class="line"><span style="color:#e1e4e8;">    connPoolMaxConnsPerHost: 200</span></span>
<span class="line"><span style="color:#e1e4e8;">    notablescan:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">setParameter:</span></span>
<span class="line"><span style="color:#24292e;">    connPoolMaxShardedConnsPerHost: 200</span></span>
<span class="line"><span style="color:#24292e;">    connPoolMaxConnsPerHost: 200</span></span>
<span class="line"><span style="color:#24292e;">    notablescan:</span></span></code></pre></div><ul><li>注解</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1）connPoolMaxShardedConnsPerHost：默认值为200，对mongod/mongos有效；表示当前mongos或者shard与集群中其他shards链接的链接池的最大容量，此值我们通常不会调整。连接池的容量不会阻止创建新的链接，但是从连接池中获取链接的个数不会超过此值。维护连接池需要一定的开支，保持一个链接也需要占用一定的系统资源。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2）connPoolMaxConnsPerHost：默认值为200，对mongod/mongos有效；同上</span></span>
<span class="line"><span style="color:#e1e4e8;">表示mongos或者mongod与其他mongod实例之间的连接池的容量，根据host限定</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1）connPoolMaxShardedConnsPerHost：默认值为200，对mongod/mongos有效；表示当前mongos或者shard与集群中其他shards链接的链接池的最大容量，此值我们通常不会调整。连接池的容量不会阻止创建新的链接，但是从连接池中获取链接的个数不会超过此值。维护连接池需要一定的开支，保持一个链接也需要占用一定的系统资源。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2）connPoolMaxConnsPerHost：默认值为200，对mongod/mongos有效；同上</span></span>
<span class="line"><span style="color:#24292e;">表示mongos或者mongod与其他mongod实例之间的连接池的容量，根据host限定</span></span></code></pre></div><h2 id="网络配置" tabindex="-1">网络配置 <a class="header-anchor" href="#网络配置" aria-label="Permalink to &quot;网络配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">net:</span></span>
<span class="line"><span style="color:#e1e4e8;">    bindIp: 127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 27017</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIncomingConnections: 65536</span></span>
<span class="line"><span style="color:#e1e4e8;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    ipv6: false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">net:</span></span>
<span class="line"><span style="color:#24292e;">    bindIp: 127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">    port: 27017</span></span>
<span class="line"><span style="color:#24292e;">    maxIncomingConnections: 65536</span></span>
<span class="line"><span style="color:#24292e;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#24292e;">    ipv6: false</span></span></code></pre></div><ul><li>注解</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> bindIp: &lt;127.0.0.1&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：mongod/monogs进程绑定的IP，application通过此IP、port建立链接。可以绑定在任意网卡接口上，如果你的mongos/mongod只需要内网访问，可以绑定在内网IP(例如：192.168.1.100)，如果需要外网访问，那么则绑定外网IP，如果此值为“0.0.0.0”，则绑定到所有接口即内网、外网IP均可以访问。（不建议）可以绑定都多个ip上，ip地址之间用“,”分割。</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 27017</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：mongod/mongos侦听端口，默认为27017；不过因为mongodb有2种典型的架构模式：replica set和sharding，如果开发者在一个节点上部署多个mongod实例，需要注意修改此端口以避免冲突。</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIncomingConnections: 65536</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：mongod/mongos进程允许的最大连接数，如果此值超过操作系统配置的连接数阀值，将不会生效(ulimit)；默认值为65536。通常客户端将会使用连接池机制，可以有效的控制每个客户端的链接个数。</span></span>
<span class="line"><span style="color:#e1e4e8;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：当客户端写入数据时，mongos/mongod是否检测数据的有效性(BSON)，如果数据格式不良，此insert、update操作将会被拒绝；默认值为true</span></span>
<span class="line"><span style="color:#e1e4e8;">    ipv6: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：是否支持mongos/mongod多个实例之间使用IPV6网络，默认值为false。此值需要在整个cluster中保持一致。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> bindIp: &lt;127.0.0.1&gt;</span></span>
<span class="line"><span style="color:#24292e;">    描述：mongod/monogs进程绑定的IP，application通过此IP、port建立链接。可以绑定在任意网卡接口上，如果你的mongos/mongod只需要内网访问，可以绑定在内网IP(例如：192.168.1.100)，如果需要外网访问，那么则绑定外网IP，如果此值为“0.0.0.0”，则绑定到所有接口即内网、外网IP均可以访问。（不建议）可以绑定都多个ip上，ip地址之间用“,”分割。</span></span>
<span class="line"><span style="color:#24292e;">    port: 27017</span></span>
<span class="line"><span style="color:#24292e;">    描述：mongod/mongos侦听端口，默认为27017；不过因为mongodb有2种典型的架构模式：replica set和sharding，如果开发者在一个节点上部署多个mongod实例，需要注意修改此端口以避免冲突。</span></span>
<span class="line"><span style="color:#24292e;">    maxIncomingConnections: 65536</span></span>
<span class="line"><span style="color:#24292e;">    描述：mongod/mongos进程允许的最大连接数，如果此值超过操作系统配置的连接数阀值，将不会生效(ulimit)；默认值为65536。通常客户端将会使用连接池机制，可以有效的控制每个客户端的链接个数。</span></span>
<span class="line"><span style="color:#24292e;">    wireObjectCheck: true</span></span>
<span class="line"><span style="color:#24292e;">    描述：当客户端写入数据时，mongos/mongod是否检测数据的有效性(BSON)，如果数据格式不良，此insert、update操作将会被拒绝；默认值为true</span></span>
<span class="line"><span style="color:#24292e;">    ipv6: false</span></span>
<span class="line"><span style="color:#24292e;">    描述：是否支持mongos/mongod多个实例之间使用IPV6网络，默认值为false。此值需要在整个cluster中保持一致。</span></span></code></pre></div><h2 id="安全配置" tabindex="-1">安全配置 <a class="header-anchor" href="#安全配置" aria-label="Permalink to &quot;安全配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">security:</span></span>
<span class="line"><span style="color:#e1e4e8;">    authorization: enabled</span></span>
<span class="line"><span style="color:#e1e4e8;">    clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#e1e4e8;">    keyFile: /srv/mongodb/keyfile</span></span>
<span class="line"><span style="color:#e1e4e8;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#e1e4e8;">setParameter: </span></span>
<span class="line"><span style="color:#e1e4e8;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    authenticationMechanisms: SCRAM-SHA-1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">security:</span></span>
<span class="line"><span style="color:#24292e;">    authorization: enabled</span></span>
<span class="line"><span style="color:#24292e;">    clusterAuthMode: keyFile</span></span>
<span class="line"><span style="color:#24292e;">    keyFile: /srv/mongodb/keyfile</span></span>
<span class="line"><span style="color:#24292e;">    javascriptEnabled: true</span></span>
<span class="line"><span style="color:#24292e;">setParameter: </span></span>
<span class="line"><span style="color:#24292e;">    enableLocalhostAuthBypass: true</span></span>
<span class="line"><span style="color:#24292e;">    authenticationMechanisms: SCRAM-SHA-1</span></span></code></pre></div><ul><li>注解</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1）authorization：disabled或者enabled，仅对mongod有效；表示是否开启用户访问控制（Access Control），即客户端可以通过用户名和密码认证的方式访问系统的数据，默认为“disabled”，即客户端不需要密码即可访问数据库数据。（限定客户端与mongod、mongos的认证）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2）clusterAuthMode：集群中members之间的认证模式，可选值为“keyFile”、“sendKeyFile”、“sendX509”、“x509”，对mongod/mongos有效；默认值为“keyFile”，mongodb官方推荐使用x509，不过我个人觉得还是keyFile比较易于学习和使用。不过3.0版本中，mongodb增加了对TLS/SSL的支持，如果可以的话，建议使用SSL相关的配置来认证集群的member，此文将不再介绍。（限定集群中members之间的认证）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3）keyFile：当clusterAuthMode为“keyFile”时，此参数指定keyfile的位置，mongodb需要有访问此文件的权限。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4）javascriptEnabled：true或者false，默认为true，仅对mongod有效；表示是否关闭server端的javascript功能，就是是否允许mongod上执行javascript脚本，如果为false，那么mapreduce、group命令等将无法使用，因为它们需要在mongod上执行javascript脚本方法。如果你的应用中没有mapreduce等操作的需求，为了安全起见，可以关闭javascript。</span></span>
<span class="line"><span style="color:#e1e4e8;">“setParameter”允许指定一些的Server端参数，这些参数不依赖于存储引擎和交互机制，只是微调系统的运行状态，比如“认证机制”、“线程池参数”等。参见【parameter】</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1）enableLocalhostAuthBypass：true或者false，默认为true，对mongod/mongos有效；表示是否开启“localhost exception”，对于sharding cluster而言，我们倾向于在mongos上开启，在shard节点的mongod上关闭。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2）authenticationMechanisms：认证机制，可选值为“SCRAM-SHA-1”、“MONGODB-CR”、“PLAN”等，建议为“SCRAM-SHA-1”，对mongod/mongos有效；一旦选定了认证机制，客户端访问databases时需要与其匹配才能有效</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1）authorization：disabled或者enabled，仅对mongod有效；表示是否开启用户访问控制（Access Control），即客户端可以通过用户名和密码认证的方式访问系统的数据，默认为“disabled”，即客户端不需要密码即可访问数据库数据。（限定客户端与mongod、mongos的认证）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2）clusterAuthMode：集群中members之间的认证模式，可选值为“keyFile”、“sendKeyFile”、“sendX509”、“x509”，对mongod/mongos有效；默认值为“keyFile”，mongodb官方推荐使用x509，不过我个人觉得还是keyFile比较易于学习和使用。不过3.0版本中，mongodb增加了对TLS/SSL的支持，如果可以的话，建议使用SSL相关的配置来认证集群的member，此文将不再介绍。（限定集群中members之间的认证）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3）keyFile：当clusterAuthMode为“keyFile”时，此参数指定keyfile的位置，mongodb需要有访问此文件的权限。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4）javascriptEnabled：true或者false，默认为true，仅对mongod有效；表示是否关闭server端的javascript功能，就是是否允许mongod上执行javascript脚本，如果为false，那么mapreduce、group命令等将无法使用，因为它们需要在mongod上执行javascript脚本方法。如果你的应用中没有mapreduce等操作的需求，为了安全起见，可以关闭javascript。</span></span>
<span class="line"><span style="color:#24292e;">“setParameter”允许指定一些的Server端参数，这些参数不依赖于存储引擎和交互机制，只是微调系统的运行状态，比如“认证机制”、“线程池参数”等。参见【parameter】</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1）enableLocalhostAuthBypass：true或者false，默认为true，对mongod/mongos有效；表示是否开启“localhost exception”，对于sharding cluster而言，我们倾向于在mongos上开启，在shard节点的mongod上关闭。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2）authenticationMechanisms：认证机制，可选值为“SCRAM-SHA-1”、“MONGODB-CR”、“PLAN”等，建议为“SCRAM-SHA-1”，对mongod/mongos有效；一旦选定了认证机制，客户端访问databases时需要与其匹配才能有效</span></span></code></pre></div><h2 id="日志配置" tabindex="-1">日志配置 <a class="header-anchor" href="#日志配置" aria-label="Permalink to &quot;日志配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemLog:</span></span>
<span class="line"><span style="color:#e1e4e8;">    verbosity: 0 #日志级别，0：默认值，包含“info”信息，1~5，即大于0的值均会包含debug信息</span></span>
<span class="line"><span style="color:#e1e4e8;">    quiet: false #安静&quot;，此时mongod/mongos将会尝试减少日志的输出量。不建议在production环境下开启，</span></span>
<span class="line"><span style="color:#e1e4e8;">                #否则将会导致跟踪错误比较困难。</span></span>
<span class="line"><span style="color:#e1e4e8;">    path: /data/mongodb/logs/mongod.log</span></span>
<span class="line"><span style="color:#e1e4e8;">    traceAllExceptions: true #打印异常详细信息</span></span>
<span class="line"><span style="color:#e1e4e8;">    logAppend: false #如果为true，当mongod/mongos重启后，</span></span>
<span class="line"><span style="color:#e1e4e8;">                   #将在现有日志的尾部继续添加日志。否则，将会备份当前日志文件，然后创建一个新的日志文件；默认为false。</span></span>
<span class="line"><span style="color:#e1e4e8;">    destination: file #日志输出目的地，可以指定为“ file”或者“syslog”，表述输出到日志文件，</span></span>
<span class="line"><span style="color:#e1e4e8;">    #如果不指定，则会输出到标准输出中（standard output）。</span></span>
<span class="line"><span style="color:#e1e4e8;">    logRotate: rename</span></span>
<span class="line"><span style="color:#e1e4e8;">    #日志“回转”，防止一个日志文件特别大，则使用logRotate指令将文件“回转”，可选值：</span></span>
<span class="line"><span style="color:#e1e4e8;">    #1）rename：重命名日志文件，默认值。</span></span>
<span class="line"><span style="color:#e1e4e8;">    #2）reopen：使用linux日志rotate特性，关闭并重新打开此日志文件，可以避免日志丢失，但是logAppend必须为true。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemLog:</span></span>
<span class="line"><span style="color:#24292e;">    verbosity: 0 #日志级别，0：默认值，包含“info”信息，1~5，即大于0的值均会包含debug信息</span></span>
<span class="line"><span style="color:#24292e;">    quiet: false #安静&quot;，此时mongod/mongos将会尝试减少日志的输出量。不建议在production环境下开启，</span></span>
<span class="line"><span style="color:#24292e;">                #否则将会导致跟踪错误比较困难。</span></span>
<span class="line"><span style="color:#24292e;">    path: /data/mongodb/logs/mongod.log</span></span>
<span class="line"><span style="color:#24292e;">    traceAllExceptions: true #打印异常详细信息</span></span>
<span class="line"><span style="color:#24292e;">    logAppend: false #如果为true，当mongod/mongos重启后，</span></span>
<span class="line"><span style="color:#24292e;">                   #将在现有日志的尾部继续添加日志。否则，将会备份当前日志文件，然后创建一个新的日志文件；默认为false。</span></span>
<span class="line"><span style="color:#24292e;">    destination: file #日志输出目的地，可以指定为“ file”或者“syslog”，表述输出到日志文件，</span></span>
<span class="line"><span style="color:#24292e;">    #如果不指定，则会输出到标准输出中（standard output）。</span></span>
<span class="line"><span style="color:#24292e;">    logRotate: rename</span></span>
<span class="line"><span style="color:#24292e;">    #日志“回转”，防止一个日志文件特别大，则使用logRotate指令将文件“回转”，可选值：</span></span>
<span class="line"><span style="color:#24292e;">    #1）rename：重命名日志文件，默认值。</span></span>
<span class="line"><span style="color:#24292e;">    #2）reopen：使用linux日志rotate特性，关闭并重新打开此日志文件，可以避免日志丢失，但是logAppend必须为true。</span></span></code></pre></div><h3 id="性能分析器" tabindex="-1">性能分析器 <a class="header-anchor" href="#性能分析器" aria-label="Permalink to &quot;性能分析器&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">operationProfiling:</span></span>
<span class="line"><span style="color:#e1e4e8;">    slowOpThresholdMs: 100</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：数据库profiler判定一个操作是“慢查询”的时间阀值，单位毫秒；mongod将会把慢查询记录到日志中，即使profiler被关闭。当profiler开启时，慢查询记录还会被写入“system.profile”这个系统级的collection中。请参看mongod profiler相关文档。默认值为100，此值只对mongod进程有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    mode: off</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：数据库profiler级别，操作的性能信息将会被写入日志文件中，可选值：</span></span>
<span class="line"><span style="color:#e1e4e8;">    1）off：关闭profiling</span></span>
<span class="line"><span style="color:#e1e4e8;">    2）slowOp：on，只包含慢操作日志</span></span>
<span class="line"><span style="color:#e1e4e8;">    3）all：on，记录所有操作</span></span>
<span class="line"><span style="color:#e1e4e8;">    数据库profiling会影响性能，建议只在性能调试阶段开启。此参数仅对mongod有效。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">operationProfiling:</span></span>
<span class="line"><span style="color:#24292e;">    slowOpThresholdMs: 100</span></span>
<span class="line"><span style="color:#24292e;">    描述：数据库profiler判定一个操作是“慢查询”的时间阀值，单位毫秒；mongod将会把慢查询记录到日志中，即使profiler被关闭。当profiler开启时，慢查询记录还会被写入“system.profile”这个系统级的collection中。请参看mongod profiler相关文档。默认值为100，此值只对mongod进程有效。</span></span>
<span class="line"><span style="color:#24292e;">    mode: off</span></span>
<span class="line"><span style="color:#24292e;">    描述：数据库profiler级别，操作的性能信息将会被写入日志文件中，可选值：</span></span>
<span class="line"><span style="color:#24292e;">    1）off：关闭profiling</span></span>
<span class="line"><span style="color:#24292e;">    2）slowOp：on，只包含慢操作日志</span></span>
<span class="line"><span style="color:#24292e;">    3）all：on，记录所有操作</span></span>
<span class="line"><span style="color:#24292e;">    数据库profiling会影响性能，建议只在性能调试阶段开启。此参数仅对mongod有效。</span></span></code></pre></div><h2 id="普通方式" tabindex="-1">普通方式 <a class="header-anchor" href="#普通方式" aria-label="Permalink to &quot;普通方式&quot;">​</a></h2><h1 id="_2-主从配置" tabindex="-1">2.主从配置 <a class="header-anchor" href="#_2-主从配置" aria-label="Permalink to &quot;2.主从配置&quot;">​</a></h1><h2 id="主从副本配置" tabindex="-1">主从副本配置 <a class="header-anchor" href="#主从副本配置" aria-label="Permalink to &quot;主从副本配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">replication:</span></span>
<span class="line"><span style="color:#e1e4e8;">    oplogSizeMB: 10240</span></span>
<span class="line"><span style="color:#e1e4e8;">    replSetName: rs0</span></span>
<span class="line"><span style="color:#e1e4e8;">    secondaryIndexPrefetch: all</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">oplogSizeMB: 10240</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：replication操作日志的最大尺寸，单位：MB。mongod进程根据磁盘最大可用空间来创建oplog，比如64位系统，oplog为磁盘可用空间的5%，一旦mongod创建了oplog文件，此后再次修改oplogSizeMB将不会生效。此值不要设置的太小， 应该足以保存24小时的操作日志，以保证secondary有充足的维护时间；如果太小，secondary将不能通过oplog来同步数据，只能全量同步。此值仅对mongod有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    enableMajorityReadConcern: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：是否开启readConcern的级别为“majority”，默认为false；只有开启此选项，才能在read操作中使用“majority”。（3.2+版本）</span></span>
<span class="line"><span style="color:#e1e4e8;">    replSetName: &lt;无默认值&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：“复制集”的名称，复制集中的所有mongd实例都必须有相同的名字，sharding分布式下，不同的sharding应该使用不同的replSetName。仅对mongod有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    secondaryIndexPrefetch: all</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：只对mmapv1存储引擎有效。复制集中的secondary，从oplog中运用变更操作之前，将会先把索引加载到内存中，默认情况下，secondaries首先将操作相关的索引加载到内存，然后再根据oplog应用操作。可选值：</span></span>
<span class="line"><span style="color:#e1e4e8;">    1）none：secondaries不将索引数据加载到内容</span></span>
<span class="line"><span style="color:#e1e4e8;">    2）all：sencondaries将此操作有关的索引数据加载到内存</span></span>
<span class="line"><span style="color:#e1e4e8;">	3）_id_only：只加载_id索引</span></span>
<span class="line"><span style="color:#e1e4e8;">    默认值为：all，此配置仅对mongod有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    localPingThresholdMs: 15</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：ping时间，单位：毫秒，mongos用来判定将客户端read请求发给哪个secondary。仅对mongos有效。默认值为15，和客户端driver中的默认值一样。当mongos接收到客户端read请求，它将：</span></span>
<span class="line"><span style="color:#e1e4e8;">    1、找出复制集中ping值最小的member。</span></span>
<span class="line"><span style="color:#e1e4e8;">    2、将延迟值被此值允许的members，构建一个列表</span></span>
<span class="line"><span style="color:#e1e4e8;">    3、从列表中随机选择一个member。</span></span>
<span class="line"><span style="color:#e1e4e8;">    ping值是动态值，每10秒计算一次。mongos将客户端请求转发给延迟较小（与此值相比）的某个secondary节点。仅对mongos有效。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">replication:</span></span>
<span class="line"><span style="color:#24292e;">    oplogSizeMB: 10240</span></span>
<span class="line"><span style="color:#24292e;">    replSetName: rs0</span></span>
<span class="line"><span style="color:#24292e;">    secondaryIndexPrefetch: all</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">oplogSizeMB: 10240</span></span>
<span class="line"><span style="color:#24292e;">    描述：replication操作日志的最大尺寸，单位：MB。mongod进程根据磁盘最大可用空间来创建oplog，比如64位系统，oplog为磁盘可用空间的5%，一旦mongod创建了oplog文件，此后再次修改oplogSizeMB将不会生效。此值不要设置的太小， 应该足以保存24小时的操作日志，以保证secondary有充足的维护时间；如果太小，secondary将不能通过oplog来同步数据，只能全量同步。此值仅对mongod有效。</span></span>
<span class="line"><span style="color:#24292e;">    enableMajorityReadConcern: false</span></span>
<span class="line"><span style="color:#24292e;">    描述：是否开启readConcern的级别为“majority”，默认为false；只有开启此选项，才能在read操作中使用“majority”。（3.2+版本）</span></span>
<span class="line"><span style="color:#24292e;">    replSetName: &lt;无默认值&gt;</span></span>
<span class="line"><span style="color:#24292e;">    描述：“复制集”的名称，复制集中的所有mongd实例都必须有相同的名字，sharding分布式下，不同的sharding应该使用不同的replSetName。仅对mongod有效。</span></span>
<span class="line"><span style="color:#24292e;">    secondaryIndexPrefetch: all</span></span>
<span class="line"><span style="color:#24292e;">    描述：只对mmapv1存储引擎有效。复制集中的secondary，从oplog中运用变更操作之前，将会先把索引加载到内存中，默认情况下，secondaries首先将操作相关的索引加载到内存，然后再根据oplog应用操作。可选值：</span></span>
<span class="line"><span style="color:#24292e;">    1）none：secondaries不将索引数据加载到内容</span></span>
<span class="line"><span style="color:#24292e;">    2）all：sencondaries将此操作有关的索引数据加载到内存</span></span>
<span class="line"><span style="color:#24292e;">	3）_id_only：只加载_id索引</span></span>
<span class="line"><span style="color:#24292e;">    默认值为：all，此配置仅对mongod有效。</span></span>
<span class="line"><span style="color:#24292e;">    localPingThresholdMs: 15</span></span>
<span class="line"><span style="color:#24292e;">    描述：ping时间，单位：毫秒，mongos用来判定将客户端read请求发给哪个secondary。仅对mongos有效。默认值为15，和客户端driver中的默认值一样。当mongos接收到客户端read请求，它将：</span></span>
<span class="line"><span style="color:#24292e;">    1、找出复制集中ping值最小的member。</span></span>
<span class="line"><span style="color:#24292e;">    2、将延迟值被此值允许的members，构建一个列表</span></span>
<span class="line"><span style="color:#24292e;">    3、从列表中随机选择一个member。</span></span>
<span class="line"><span style="color:#24292e;">    ping值是动态值，每10秒计算一次。mongos将客户端请求转发给延迟较小（与此值相比）的某个secondary节点。仅对mongos有效。</span></span></code></pre></div><h2 id="分片集群配置" tabindex="-1">分片集群配置 <a class="header-anchor" href="#分片集群配置" aria-label="Permalink to &quot;分片集群配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sharding:</span></span>
<span class="line"><span style="color:#e1e4e8;">    autoSplit: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    configDB: m1.com:27018,m2.com:27018,m3.com:27018</span></span>
<span class="line"><span style="color:#e1e4e8;">    chunkSize: 64</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">clusterRole: &lt;无默认值&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：在sharding集群中，此mongod实例的角色，可选值：</span></span>
<span class="line"><span style="color:#e1e4e8;">    1、configsvr：此实例为config server，此实例默认侦听27019端口</span></span>
<span class="line"><span style="color:#e1e4e8;">    2、shardsvr：此实例为shard（分片），侦听27018端口</span></span>
<span class="line"><span style="color:#e1e4e8;">    此配置仅对mongod有效。通常config server和sharding server需要使用各自的配置文件。</span></span>
<span class="line"><span style="color:#e1e4e8;">    archiveMovedChunks: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：当chunks因为“负载平衡”而迁移到其他节点时，mongod是否将这些chunks归档，并保存在dbPath下“moveChunk”目录下，mongod不会删除moveChunk下的文件。默认为true。</span></span>
<span class="line"><span style="color:#e1e4e8;">    autoSplit: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：是否开启sharded collections的自动分裂，仅对mongos有效。如果所有的mongos都设定为false，那么collections数据增长但不能分裂成新的chunks。因为集群中任何一个mongos进程都可以触发split，所以此值需要在所有mongos行保持一致。仅对mongos有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    configDB: &lt;无默认值&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：设定config server的地址列表，每个server地址之间以“,”分割，通常sharded集群中指定1或者3个config server。（生产环境，通常是3个config server，但1个也是可以的）。所有的mongos实例必须配置一样，否则可能带来不必要的问题。仅对mongos有效。</span></span>
<span class="line"><span style="color:#e1e4e8;">    chunkSize: 64</span></span>
<span class="line"><span style="color:#e1e4e8;">    描述：sharded集群中每个chunk的大小，单位：MB，默认为64，此值对于绝大多数应用而言都是比较理想的。chunkSize太大会导致分布不均，太小会导致分裂成大量的chunk而经常移</span></span>
<span class="line"><span style="color:#e1e4e8;">##整个sharding集群中，此值需要保持一致，集群启动后修改此值将不再生效。仅对mongos有效。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sharding:</span></span>
<span class="line"><span style="color:#24292e;">    autoSplit: true</span></span>
<span class="line"><span style="color:#24292e;">    configDB: m1.com:27018,m2.com:27018,m3.com:27018</span></span>
<span class="line"><span style="color:#24292e;">    chunkSize: 64</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">clusterRole: &lt;无默认值&gt;</span></span>
<span class="line"><span style="color:#24292e;">    描述：在sharding集群中，此mongod实例的角色，可选值：</span></span>
<span class="line"><span style="color:#24292e;">    1、configsvr：此实例为config server，此实例默认侦听27019端口</span></span>
<span class="line"><span style="color:#24292e;">    2、shardsvr：此实例为shard（分片），侦听27018端口</span></span>
<span class="line"><span style="color:#24292e;">    此配置仅对mongod有效。通常config server和sharding server需要使用各自的配置文件。</span></span>
<span class="line"><span style="color:#24292e;">    archiveMovedChunks: true</span></span>
<span class="line"><span style="color:#24292e;">    描述：当chunks因为“负载平衡”而迁移到其他节点时，mongod是否将这些chunks归档，并保存在dbPath下“moveChunk”目录下，mongod不会删除moveChunk下的文件。默认为true。</span></span>
<span class="line"><span style="color:#24292e;">    autoSplit: true</span></span>
<span class="line"><span style="color:#24292e;">    描述：是否开启sharded collections的自动分裂，仅对mongos有效。如果所有的mongos都设定为false，那么collections数据增长但不能分裂成新的chunks。因为集群中任何一个mongos进程都可以触发split，所以此值需要在所有mongos行保持一致。仅对mongos有效。</span></span>
<span class="line"><span style="color:#24292e;">    configDB: &lt;无默认值&gt;</span></span>
<span class="line"><span style="color:#24292e;">    描述：设定config server的地址列表，每个server地址之间以“,”分割，通常sharded集群中指定1或者3个config server。（生产环境，通常是3个config server，但1个也是可以的）。所有的mongos实例必须配置一样，否则可能带来不必要的问题。仅对mongos有效。</span></span>
<span class="line"><span style="color:#24292e;">    chunkSize: 64</span></span>
<span class="line"><span style="color:#24292e;">    描述：sharded集群中每个chunk的大小，单位：MB，默认为64，此值对于绝大多数应用而言都是比较理想的。chunkSize太大会导致分布不均，太小会导致分裂成大量的chunk而经常移</span></span>
<span class="line"><span style="color:#24292e;">##整个sharding集群中，此值需要保持一致，集群启动后修改此值将不再生效。仅对mongos有效。</span></span></code></pre></div><p><a href="https://www.cnblogs.com/xibuhaohao/p/12580331.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/xibuhaohao/p/12580331.html</a></p><p><a href="https://blog.csdn.net/weixin_44275259/article/details/108399267" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_44275259/article/details/108399267</a></p>`,35),p=[o];function c(r,t,i,d,y,g){return n(),a("div",null,p)}const u=s(l,[["render",c]]);export{h as __pageData,u as default};
