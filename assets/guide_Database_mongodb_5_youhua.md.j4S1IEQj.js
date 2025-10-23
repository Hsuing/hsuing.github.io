import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.业务层","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/5_youhua.md","filePath":"guide/Database/mongodb/5_youhua.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/5_youhua.md"},t=a(`<h1 id="_1-业务层" tabindex="-1">1.业务层 <a class="header-anchor" href="#_1-业务层" aria-label="Permalink to &quot;1.业务层&quot;">​</a></h1><p><a href="https://developer.aliyun.com/article/779084" target="_blank" rel="noreferrer">https://developer.aliyun.com/article/779084</a></p><h1 id="_2-mongodb层" tabindex="-1">2.MongoDB层 <a class="header-anchor" href="#_2-mongodb层" aria-label="Permalink to &quot;2.MongoDB层&quot;">​</a></h1><h2 id="网络优化" tabindex="-1">网络优化 <a class="header-anchor" href="#网络优化" aria-label="Permalink to &quot;网络优化&quot;">​</a></h2><p>为了适应高并发的读写场景，mongodb-3.6开始引入serviceExecutor: adaptive配置，该配置根据请求数动态调整网络线程数，并尽量做到网络IO复用来降低线程创建消耗引起的系统高负载问题。此外，加上serviceExecutor: adaptive配置后，借助boost:asio网络模块实现网络IO复用，同时实现网络IO和磁盘IO分离。这样高并发情况下，通过网络链接IO复用和mongodb的锁操作来控制磁盘IO访问线程数，最终降低了大量线程创建和消耗带来的高系统负载，最终通过该方式提升高并发读写性能</p><h2 id="wiredtiger存储引擎优化" tabindex="-1">wiredtiger存储引擎优化 <a class="header-anchor" href="#wiredtiger存储引擎优化" aria-label="Permalink to &quot;wiredtiger存储引擎优化&quot;">​</a></h2><ol><li>cachesize调整</li><li>脏数据淘汰比例调整</li><li>checkpoint优化</li></ol><h3 id="cachesize" tabindex="-1">cachesize <a class="header-anchor" href="#cachesize" aria-label="Permalink to &quot;cachesize&quot;">​</a></h3><h3 id="存储引擎dirty脏数据淘汰" tabindex="-1">存储引擎dirty脏数据淘汰 <a class="header-anchor" href="#存储引擎dirty脏数据淘汰" aria-label="Permalink to &quot;存储引擎dirty脏数据淘汰&quot;">​</a></h3><p>wiredtiger的cache淘汰策略相关的几个配置如下:</p><table><thead><tr><th>wiredtiger淘汰相关配置</th><th>默认值</th><th>工作原理</th></tr></thead><tbody><tr><td>eviction_target</td><td>80</td><td>当用掉的内存超过总内存的百分比达到 eviction_target，后台evict线程开始淘汰</td></tr><tr><td>eviction_trigger</td><td>95</td><td>当用掉的内存超过总内存的 eviction_trigger，用户线程也开始淘汰</td></tr><tr><td>eviction_dirty_target</td><td>5</td><td>当cache中脏数据比例超过 eviction_dirty_target，后台evict线程开始淘汰</td></tr><tr><td>eviction_dirty_trigger</td><td>20</td><td>当cache中脏数据比例超过 eviction_dirty_trigger, 用户线程也开始淘汰</td></tr><tr><td>evict.threads_min</td><td>4</td><td>后台evict线程最小数</td></tr><tr><td>evict.threads_max</td><td>4</td><td>后台evict线程最大数</td></tr></tbody></table><p>调整cacheSize从120G到50G后，如果脏数据比例达到5%，则极端情况下如果淘汰速度跟不上客户端写入速度，这样还是容易引起I/O瓶颈，最终造成阻塞</p><p>如何进一步减少持续性I/O写入，也就是如何平衡cache内存和磁盘I/O的关系成为问题关键所在。从上表中可以看出，如果脏数据及总内占用存达到一定比例，后台线程开始选择page进行淘汰写盘，如果脏数据及内存占用比例进一步增加，那么用户线程就会开始做page淘汰，这是个非常危险的阻塞过程，造成用户请求验证阻塞。平衡cache和I/O的方法: 调整淘汰策略，让后台线程尽早淘汰数据，避免大量刷盘，同时降低用户线程阀值，避免用户线程进行page淘汰引起阻塞。而不是突发性的大流量写，因此eviction_target、eviction_trigger、eviction_dirty_target、eviction_dirty_trigger几个配置用处不大，优化调整存储引起配置如下:</p><p>eviction_target: 75%</p><p>eviction_trigger：97%</p><p>eviction_dirty_target: %3</p><p>eviction_dirty_trigger：25%</p><p>evict.threads_min：8</p><p>evict.threads_max：12</p><h3 id="存储引擎checkpoint" tabindex="-1">存储引擎checkpoint <a class="header-anchor" href="#存储引擎checkpoint" aria-label="Permalink to &quot;存储引擎checkpoint&quot;">​</a></h3><p>存储引擎得checkpoint检测点，实际上就是做快照，把当前存储引擎的脏数据全部记录到磁盘。触发checkpoint的条件默认又两个，触发条件如下:</p><ol><li>固定周期做一次checkpoint快照，默认60s</li><li>增量的redo log(也就是journal日志)达到2G</li></ol><p>当journal日志达到2G或者redo log没有达到2G并且距离上一次时间间隔达到60s，wiredtiger将会触发checkpoint，如果在两次checkpoint的时间间隔类evict淘汰线程淘汰的dirty page越少，那么积压的脏数据就会越多，也就是checkpoint的时候脏数据就会越多，造成checkpoint的时候大量的IO写盘操作。如果我们把checkpoint的周期缩短，那么两个checkpoint期间的脏数据相应的也就会减少，磁盘IO 100%持续的时间也就会缩短。</p><p>checkpoint调整后的值如下:</p><p>checkpoint=(wait=25,log_size=1GB)</p><h1 id="_3-系统层" tabindex="-1">3.系统层 <a class="header-anchor" href="#_3-系统层" aria-label="Permalink to &quot;3.系统层&quot;">​</a></h1><h2 id="磁盘io" tabindex="-1">磁盘io <a class="header-anchor" href="#磁盘io" aria-label="Permalink to &quot;磁盘io&quot;">​</a></h2><h1 id="慢日志开启" tabindex="-1">慢日志开启 <a class="header-anchor" href="#慢日志开启" aria-label="Permalink to &quot;慢日志开启&quot;">​</a></h1><p><a href="https://www.cnblogs.com/operationhome/p/10728654.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/operationhome/p/10728654.html</a></p><h1 id="日志切割" tabindex="-1">日志切割 <a class="header-anchor" href="#日志切割" aria-label="Permalink to &quot;日志切割&quot;">​</a></h1><p><a href="https://www.cnblogs.com/operationhome/p/10677099.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/operationhome/p/10677099.html</a></p><h1 id="oplog" tabindex="-1">oplog <a class="header-anchor" href="#oplog" aria-label="Permalink to &quot;oplog&quot;">​</a></h1><p><a href="https://www.cnblogs.com/operationhome/p/10688798.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/operationhome/p/10688798.html</a></p><p><a href="https://zhuanlan.zhihu.com/p/344790069" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/344790069</a></p><p><a href="https://www.cnblogs.com/swordfall/p/10427150.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/swordfall/p/10427150.html</a></p><p><a href="https://www.cnblogs.com/operationhome/p/10734047.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/operationhome/p/10734047.html</a></p><p>原理</p><p><a href="https://blog.csdn.net/weixin_44275259/article/details/108383345?spm=1001.2014.3001.5501" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_44275259/article/details/108383345?spm=1001.2014.3001.5501</a></p><h1 id="优化工具" tabindex="-1">优化工具 <a class="header-anchor" href="#优化工具" aria-label="Permalink to &quot;优化工具&quot;">​</a></h1><p>MongoDB查询分析常用工具有：explain() 和 hint()</p><h2 id="explain" tabindex="-1">explain <a class="header-anchor" href="#explain" aria-label="Permalink to &quot;explain&quot;">​</a></h2><ul><li>queryPlanner：查询计划的选择器，首先进行查询分析，最终选择一个winningPlan，是explain返回的默认层面</li><li>executionStats：为执行统计层面，返回winningPlan的统计结果</li><li>allPlansExecution：为返回所有执行计划的统计，包括rejectedPlan</li></ul><p>queryPlanner为我们选择出了winningPlan，而executionStats为我们统计了winningPlan的所有关键数据。</p><p>在查询优化的时候，主要是使用<strong>executionStats</strong>值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">shijiange&gt; db.myuser.find( {age:9999} ).explain(true)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  explainVersion: &#39;1&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  queryPlanner: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    namespace: &#39;shijiange.myuser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    indexFilterSet: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    parsedQuery: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIndexedOrSolutionsReached: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIndexedAndSolutionsReached: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxScansToExplodeReached: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    winningPlan: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      stage: &#39;COLLSCAN&#39;,  #----------------------&gt;&gt;注意这里，collscan全表扫描</span></span>
<span class="line"><span style="color:#e1e4e8;">      filter: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#e1e4e8;">      direction: &#39;forward&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    rejectedPlans: []</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  executionStats: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    executionSuccess: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    nReturned: 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    executionTimeMillis: 166,-----------》》执行时间ms</span></span>
<span class="line"><span style="color:#e1e4e8;">    totalKeysExamined: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    totalDocsExamined: 500006,</span></span>
<span class="line"><span style="color:#e1e4e8;">    executionStages: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      stage: &#39;COLLSCAN&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      filter: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#e1e4e8;">      nReturned: 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">      executionTimeMillisEstimate: 2,</span></span>
<span class="line"><span style="color:#e1e4e8;">      works: 500008,</span></span>
<span class="line"><span style="color:#e1e4e8;">      advanced: 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">      needTime: 500006,</span></span>
<span class="line"><span style="color:#e1e4e8;">      needYield: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">      saveState: 500,</span></span>
<span class="line"><span style="color:#e1e4e8;">      restoreState: 500,</span></span>
<span class="line"><span style="color:#e1e4e8;">      isEOF: 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">      direction: &#39;forward&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      docsExamined: 500006</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    allPlansExecution: []</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  command: { find: &#39;myuser&#39;, filter: { age: 9999 }, &#39;$db&#39;: &#39;shijiange&#39; },</span></span>
<span class="line"><span style="color:#e1e4e8;">  serverInfo: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    host: &#39;slave01&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    port: 27017,</span></span>
<span class="line"><span style="color:#e1e4e8;">    version: &#39;5.0.5&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    gitVersion: &#39;d65fd89df3fc039b5c55933c0f71d647a54510ae&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  serverParameters: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalQueryFacetBufferSizeBytes: 104857600,</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalQueryFacetMaxOutputDocSizeBytes: 104857600,</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalDocumentSourceGroupMaxMemoryBytes: 104857600,</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalQueryProhibitBlockingMergeOnMongoS: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalQueryMaxAddToSetBytes: 104857600,</span></span>
<span class="line"><span style="color:#e1e4e8;">    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600</span></span>
<span class="line"><span style="color:#e1e4e8;">  },</span></span>
<span class="line"><span style="color:#e1e4e8;">  ok: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">shijiange&gt; db.myuser.find( {age:9999} ).explain(true)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  explainVersion: &#39;1&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  queryPlanner: {</span></span>
<span class="line"><span style="color:#24292e;">    namespace: &#39;shijiange.myuser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    indexFilterSet: false,</span></span>
<span class="line"><span style="color:#24292e;">    parsedQuery: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#24292e;">    maxIndexedOrSolutionsReached: false,</span></span>
<span class="line"><span style="color:#24292e;">    maxIndexedAndSolutionsReached: false,</span></span>
<span class="line"><span style="color:#24292e;">    maxScansToExplodeReached: false,</span></span>
<span class="line"><span style="color:#24292e;">    winningPlan: {</span></span>
<span class="line"><span style="color:#24292e;">      stage: &#39;COLLSCAN&#39;,  #----------------------&gt;&gt;注意这里，collscan全表扫描</span></span>
<span class="line"><span style="color:#24292e;">      filter: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#24292e;">      direction: &#39;forward&#39;</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    rejectedPlans: []</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  executionStats: {</span></span>
<span class="line"><span style="color:#24292e;">    executionSuccess: true,</span></span>
<span class="line"><span style="color:#24292e;">    nReturned: 1,</span></span>
<span class="line"><span style="color:#24292e;">    executionTimeMillis: 166,-----------》》执行时间ms</span></span>
<span class="line"><span style="color:#24292e;">    totalKeysExamined: 0,</span></span>
<span class="line"><span style="color:#24292e;">    totalDocsExamined: 500006,</span></span>
<span class="line"><span style="color:#24292e;">    executionStages: {</span></span>
<span class="line"><span style="color:#24292e;">      stage: &#39;COLLSCAN&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      filter: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#24292e;">      nReturned: 1,</span></span>
<span class="line"><span style="color:#24292e;">      executionTimeMillisEstimate: 2,</span></span>
<span class="line"><span style="color:#24292e;">      works: 500008,</span></span>
<span class="line"><span style="color:#24292e;">      advanced: 1,</span></span>
<span class="line"><span style="color:#24292e;">      needTime: 500006,</span></span>
<span class="line"><span style="color:#24292e;">      needYield: 0,</span></span>
<span class="line"><span style="color:#24292e;">      saveState: 500,</span></span>
<span class="line"><span style="color:#24292e;">      restoreState: 500,</span></span>
<span class="line"><span style="color:#24292e;">      isEOF: 1,</span></span>
<span class="line"><span style="color:#24292e;">      direction: &#39;forward&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      docsExamined: 500006</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    allPlansExecution: []</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  command: { find: &#39;myuser&#39;, filter: { age: 9999 }, &#39;$db&#39;: &#39;shijiange&#39; },</span></span>
<span class="line"><span style="color:#24292e;">  serverInfo: {</span></span>
<span class="line"><span style="color:#24292e;">    host: &#39;slave01&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    port: 27017,</span></span>
<span class="line"><span style="color:#24292e;">    version: &#39;5.0.5&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    gitVersion: &#39;d65fd89df3fc039b5c55933c0f71d647a54510ae&#39;</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  serverParameters: {</span></span>
<span class="line"><span style="color:#24292e;">    internalQueryFacetBufferSizeBytes: 104857600,</span></span>
<span class="line"><span style="color:#24292e;">    internalQueryFacetMaxOutputDocSizeBytes: 104857600,</span></span>
<span class="line"><span style="color:#24292e;">    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,</span></span>
<span class="line"><span style="color:#24292e;">    internalDocumentSourceGroupMaxMemoryBytes: 104857600,</span></span>
<span class="line"><span style="color:#24292e;">    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,</span></span>
<span class="line"><span style="color:#24292e;">    internalQueryProhibitBlockingMergeOnMongoS: 0,</span></span>
<span class="line"><span style="color:#24292e;">    internalQueryMaxAddToSetBytes: 104857600,</span></span>
<span class="line"><span style="color:#24292e;">    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600</span></span>
<span class="line"><span style="color:#24292e;">  },</span></span>
<span class="line"><span style="color:#24292e;">  ok: 1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="winningplan" tabindex="-1">winningPlan <a class="header-anchor" href="#winningplan" aria-label="Permalink to &quot;winningPlan&quot;">​</a></h3><p>重点关注<strong>winningPlan</strong>，stage将告诉你是采用了什么索引进行查询</p><ul><li>stage</li></ul><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>COLLSCAN</td><td>全表扫描</td></tr><tr><td>IXSCAN</td><td>索引扫描</td></tr><tr><td>FETCH</td><td>根据索引去检索指定document，</td></tr><tr><td>SHARD_MERGE</td><td>各个分片返回数据进行merge</td></tr><tr><td>SORT</td><td>表明在内存中进行了排序</td></tr><tr><td>SORT_MERGE</td><td>表明在内存中进行了排序后再合并</td></tr><tr><td>LIMIT</td><td>使用limit限制返回数</td></tr><tr><td>SKIP</td><td>使用skip进行跳过</td></tr><tr><td>IDHACK</td><td>针对_id进行查询</td></tr><tr><td>SHARDING_FILTER</td><td>通过mongos对分片数据进行查询</td></tr><tr><td>COUNT</td><td>利用db.collection.count()之类进行count运算</td></tr><tr><td>COUNTSCAN</td><td>count不使用用Index进行count时的stage返回</td></tr><tr><td>COUNT_SCAN</td><td>count使用了Index进行count时的stage返回</td></tr><tr><td>SUBPLA</td><td>未使用到索引的$or查询的stage返回</td></tr><tr><td>TEXT</td><td>使用全文索引进行查询时候的stage返回</td></tr></tbody></table><h3 id="executionstats" tabindex="-1">executionStats <a class="header-anchor" href="#executionstats" aria-label="Permalink to &quot;executionStats&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;executionStats&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;executionSuccess&quot; : &lt;boolean&gt;,</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;nReturned&quot; : &lt;int&gt;, // 返回结果数</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;executionTimeMillis&quot; : &lt;int&gt;, // 执行耗时（以毫秒为单位）</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;totalKeysExamined&quot; : &lt;int&gt;, // 索引扫描次数</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;totalDocsExamined&quot; : &lt;int&gt;, // 文档扫描次数</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;executionStages&quot; : { // 整个winningPlan执行树的详细信息，一个executionStages包含一个或者多个inputStages</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;stage&quot; : &lt;STAGE1&gt; // 扫描方式</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;nReturned&quot; : &lt;int&gt;, // 查询结果数量</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;executionTimeMillisEstimate&quot; : &lt;int&gt;, // 查询执行的估计时间（以毫秒为单位）</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;works&quot; : &lt;int&gt;, // 工作单元数，一个查询会分解成小的工作单元</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;advanced&quot; : &lt;int&gt;, // 优先返回数</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;needTime&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;needYield&quot; : &lt;int&gt;, </span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;saveState&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;restoreState&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;isEOF&quot; : &lt;boolean&gt;, // 查询执行是否已经到了数据流的末尾</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;docsExamined&quot; : &lt;boolean&gt;, // 文档检查数</span></span>
<span class="line"><span style="color:#e1e4e8;">      ...</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;inputStage&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">         &quot;stage&quot; : &lt;STAGE2&gt;,</span></span>
<span class="line"><span style="color:#e1e4e8;">         &quot;nReturned&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#e1e4e8;">         &quot;executionTimeMillisEstimate&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#e1e4e8;">         ...</span></span>
<span class="line"><span style="color:#e1e4e8;">         &quot;inputStage&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">            ...</span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">   },</span></span>
<span class="line"><span style="color:#e1e4e8;">  // 所有查询计划的信息，包含最优和拒绝的</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;allPlansExecution&quot; : [ ... ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;executionStats&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">   &quot;executionSuccess&quot; : &lt;boolean&gt;,</span></span>
<span class="line"><span style="color:#24292e;">   &quot;nReturned&quot; : &lt;int&gt;, // 返回结果数</span></span>
<span class="line"><span style="color:#24292e;">   &quot;executionTimeMillis&quot; : &lt;int&gt;, // 执行耗时（以毫秒为单位）</span></span>
<span class="line"><span style="color:#24292e;">   &quot;totalKeysExamined&quot; : &lt;int&gt;, // 索引扫描次数</span></span>
<span class="line"><span style="color:#24292e;">   &quot;totalDocsExamined&quot; : &lt;int&gt;, // 文档扫描次数</span></span>
<span class="line"><span style="color:#24292e;">   &quot;executionStages&quot; : { // 整个winningPlan执行树的详细信息，一个executionStages包含一个或者多个inputStages</span></span>
<span class="line"><span style="color:#24292e;">      &quot;stage&quot; : &lt;STAGE1&gt; // 扫描方式</span></span>
<span class="line"><span style="color:#24292e;">      &quot;nReturned&quot; : &lt;int&gt;, // 查询结果数量</span></span>
<span class="line"><span style="color:#24292e;">      &quot;executionTimeMillisEstimate&quot; : &lt;int&gt;, // 查询执行的估计时间（以毫秒为单位）</span></span>
<span class="line"><span style="color:#24292e;">      &quot;works&quot; : &lt;int&gt;, // 工作单元数，一个查询会分解成小的工作单元</span></span>
<span class="line"><span style="color:#24292e;">      &quot;advanced&quot; : &lt;int&gt;, // 优先返回数</span></span>
<span class="line"><span style="color:#24292e;">      &quot;needTime&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;needYield&quot; : &lt;int&gt;, </span></span>
<span class="line"><span style="color:#24292e;">      &quot;saveState&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;restoreState&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;isEOF&quot; : &lt;boolean&gt;, // 查询执行是否已经到了数据流的末尾</span></span>
<span class="line"><span style="color:#24292e;">      &quot;docsExamined&quot; : &lt;boolean&gt;, // 文档检查数</span></span>
<span class="line"><span style="color:#24292e;">      ...</span></span>
<span class="line"><span style="color:#24292e;">      &quot;inputStage&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">         &quot;stage&quot; : &lt;STAGE2&gt;,</span></span>
<span class="line"><span style="color:#24292e;">         &quot;nReturned&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#24292e;">         &quot;executionTimeMillisEstimate&quot; : &lt;int&gt;,</span></span>
<span class="line"><span style="color:#24292e;">         ...</span></span>
<span class="line"><span style="color:#24292e;">         &quot;inputStage&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">            ...</span></span>
<span class="line"><span style="color:#24292e;">         }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">   },</span></span>
<span class="line"><span style="color:#24292e;">  // 所有查询计划的信息，包含最优和拒绝的</span></span>
<span class="line"><span style="color:#24292e;">   &quot;allPlansExecution&quot; : [ ... ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><strong>理想状态下：</strong></p><ul><li>nReturned应该等于totalKeysExamined而且totalDocsExamined=0，这种情况相当于索引全覆盖，仅扫描索引，无需扫描文档，是最理想状态</li><li>nReturned、totalKeysExamined和totalDocsExamined三者相等，这种情况相当于检查的键数与返回的文档数相匹配，这意味着MongoDB只需检查索引键即可返回结果，MongoDB不必扫描所有文档或者多余文档，这个查询结果是非常高效的。</li><li>如果有sort的时候，为了使得sort不在内存中进行，我们可以在保证nReturned等于totalDocsExamined的基础上，totalKeysExamined可以大于totalDocsExamined与nReturned，因为量级较大的时候内存排序非常消耗性能</li></ul><h3 id="serverinfo" tabindex="-1">serverInfo <a class="header-anchor" href="#serverinfo" aria-label="Permalink to &quot;serverInfo&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;serverInfo&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;host&quot; : &lt;string&gt;, // 数据库主机信息</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;port&quot; : &lt;int&gt;, // 数据库端口</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;version&quot; : &lt;string&gt;, // 数据库版本</span></span>
<span class="line"><span style="color:#e1e4e8;">   &quot;gitVersion&quot; : &lt;string&gt; // git版本号</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;serverInfo&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">   &quot;host&quot; : &lt;string&gt;, // 数据库主机信息</span></span>
<span class="line"><span style="color:#24292e;">   &quot;port&quot; : &lt;int&gt;, // 数据库端口</span></span>
<span class="line"><span style="color:#24292e;">   &quot;version&quot; : &lt;string&gt;, // 数据库版本</span></span>
<span class="line"><span style="color:#24292e;">   &quot;gitVersion&quot; : &lt;string&gt; // git版本号</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="分析" tabindex="-1">分析 <a class="header-anchor" href="#分析" aria-label="Permalink to &quot;分析&quot;">​</a></h3><h5 id="无索引" tabindex="-1">无索引 <a class="header-anchor" href="#无索引" aria-label="Permalink to &quot;无索引&quot;">​</a></h5><p>查询name包含&quot;其他&quot;的文档集合</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.collection.find({ </span></span>
<span class="line"><span style="color:#e1e4e8;">  &#39;name&#39;: { $regex: &#39;其他&#39; }</span></span>
<span class="line"><span style="color:#e1e4e8;">}).explain(&#39;executionStats&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.collection.find({ </span></span>
<span class="line"><span style="color:#24292e;">  &#39;name&#39;: { $regex: &#39;其他&#39; }</span></span>
<span class="line"><span style="color:#24292e;">}).explain(&#39;executionStats&#39;)</span></span></code></pre></div><h5 id="添加索引" tabindex="-1">添加索引 <a class="header-anchor" href="#添加索引" aria-label="Permalink to &quot;添加索引&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#升序索引</span></span>
<span class="line"><span style="color:#e1e4e8;">test&gt; db.myuser.ensureIndex( {age:1} )</span></span>
<span class="line"><span style="color:#e1e4e8;">[ &#39;age_1&#39; ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">test&gt; db.myuser.find( {age:9999} ).explain(&#39;executionStats&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  explainVersion: &#39;1&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  queryPlanner: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    namespace: &#39;shijiange.myuser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    indexFilterSet: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    parsedQuery: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIndexedOrSolutionsReached: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxIndexedAndSolutionsReached: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    maxScansToExplodeReached: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    winningPlan: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      stage: &#39;FETCH&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      inputStage: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage: &#39;IXSCAN&#39;,</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#升序索引</span></span>
<span class="line"><span style="color:#24292e;">test&gt; db.myuser.ensureIndex( {age:1} )</span></span>
<span class="line"><span style="color:#24292e;">[ &#39;age_1&#39; ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">test&gt; db.myuser.find( {age:9999} ).explain(&#39;executionStats&#39;)</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  explainVersion: &#39;1&#39;,</span></span>
<span class="line"><span style="color:#24292e;">  queryPlanner: {</span></span>
<span class="line"><span style="color:#24292e;">    namespace: &#39;shijiange.myuser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">    indexFilterSet: false,</span></span>
<span class="line"><span style="color:#24292e;">    parsedQuery: { age: { &#39;$eq&#39;: 9999 } },</span></span>
<span class="line"><span style="color:#24292e;">    maxIndexedOrSolutionsReached: false,</span></span>
<span class="line"><span style="color:#24292e;">    maxIndexedAndSolutionsReached: false,</span></span>
<span class="line"><span style="color:#24292e;">    maxScansToExplodeReached: false,</span></span>
<span class="line"><span style="color:#24292e;">    winningPlan: {</span></span>
<span class="line"><span style="color:#24292e;">      stage: &#39;FETCH&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      inputStage: {</span></span>
<span class="line"><span style="color:#24292e;">        stage: &#39;IXSCAN&#39;,</span></span></code></pre></div><h2 id="hint" tabindex="-1">hint <a class="header-anchor" href="#hint" aria-label="Permalink to &quot;hint&quot;">​</a></h2><p>用hint来强制MongoDB使用一个指定的索引，这种方法在某些情形下会提升性能</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.collection.hint({ key: 1 })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.collection.hint({ key: 1 })</span></span></code></pre></div><h3 id="无索引-1" tabindex="-1">无索引 <a class="header-anchor" href="#无索引-1" aria-label="Permalink to &quot;无索引&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.collection.find({</span></span>
<span class="line"><span style="color:#e1e4e8;">  $or: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    { &#39;name&#39;: { $regex: &#39;文本&#39; } },</span></span>
<span class="line"><span style="color:#e1e4e8;">    { &#39;name&#39;: { $regex: &#39;按钮&#39; } },</span></span>
<span class="line"><span style="color:#e1e4e8;">    { &#39;name&#39;: { $regex: &#39;其他&#39; } }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}).explain(&#39;executionStats&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.collection.find({</span></span>
<span class="line"><span style="color:#24292e;">  $or: [</span></span>
<span class="line"><span style="color:#24292e;">    { &#39;name&#39;: { $regex: &#39;文本&#39; } },</span></span>
<span class="line"><span style="color:#24292e;">    { &#39;name&#39;: { $regex: &#39;按钮&#39; } },</span></span>
<span class="line"><span style="color:#24292e;">    { &#39;name&#39;: { $regex: &#39;其他&#39; } }</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;">}).explain(&#39;executionStats&#39;)</span></span></code></pre></div><h3 id="有索引" tabindex="-1">有索引 <a class="header-anchor" href="#有索引" aria-label="Permalink to &quot;有索引&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.collection.find({</span></span>
<span class="line"><span style="color:#e1e4e8;">  $or: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    { &#39;name&#39;: { $regex: &#39;文本&#39; } },</span></span>
<span class="line"><span style="color:#e1e4e8;">    { &#39;name&#39;: { $regex: &#39;按钮&#39; } },</span></span>
<span class="line"><span style="color:#e1e4e8;">    { &#39;name&#39;: { $regex: &#39;其他&#39; } }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}).hint({ &#39;name&#39;: 1 }).explain(&#39;executionStats&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.collection.find({</span></span>
<span class="line"><span style="color:#24292e;">  $or: [</span></span>
<span class="line"><span style="color:#24292e;">    { &#39;name&#39;: { $regex: &#39;文本&#39; } },</span></span>
<span class="line"><span style="color:#24292e;">    { &#39;name&#39;: { $regex: &#39;按钮&#39; } },</span></span>
<span class="line"><span style="color:#24292e;">    { &#39;name&#39;: { $regex: &#39;其他&#39; } }</span></span>
<span class="line"><span style="color:#24292e;">  ]</span></span>
<span class="line"><span style="color:#24292e;">}).hint({ &#39;name&#39;: 1 }).explain(&#39;executionStats&#39;)</span></span></code></pre></div><h2 id="关注查询点" tabindex="-1">关注查询点 <a class="header-anchor" href="#关注查询点" aria-label="Permalink to &quot;关注查询点&quot;">​</a></h2><ul><li>全表扫描（关键字：COLLSCAN、totalDocsExamined）。当一个操作（如查询、更新、删除等）需要全表扫描时，将非常占用CPU资源。如果这种情况比较频繁，建议对查询的字段建立索引的方式来优化。通过查看totalDocsExamined的值，可以查看到一个查询扫描了多少文档。该值越大，请求所占用的CPU开销越大。</li><li>不合理的索引（关键字： IXSCAN、totalKeysExamined）索引不是越多越好，索引过多会影响写入、更新的性能。如果应用偏向于写操作，索引可能会影响性能。通过查看totalKeysExamined字段，可以查看到一个使用了索引的查询，扫描了多少条索引。该值越大，CPU开销越大。如果索引建立的不太合理，或者是匹配的结果很多。这样即使使用索引，查询开销也不会优化很多，执行的速度也会很慢。</li><li>大量数据排序（关键字：SORT）当查询请求里包含排序的时候，如果排序无法通过索引满足，MongoDB会在查询结果中进行排序。而排序这个动作将非常消耗CPU资源，这种情况需要对经常排序的字段建立索引的方式进行优化。</li><li>最期望看到的查询组合 <ul><li>FETCH+IDHACK</li><li>FETCH+IXSCAN</li><li>LIMIT+（FETCH+IXSCAN）</li><li>PROJECTION+IXSCAN</li></ul></li><li>最不期望看到的查询组合 <ul><li>COLLSCAN（全表扫）</li><li>SORT（使用sort但是无index）</li><li>COUNTSCAN（不使用索引进行count）</li></ul></li></ul><h2 id="索引自我优化规则" tabindex="-1">索引自我优化规则 <a class="header-anchor" href="#索引自我优化规则" aria-label="Permalink to &quot;索引自我优化规则&quot;">​</a></h2><h3 id="查询优化器" tabindex="-1">查询优化器 <a class="header-anchor" href="#查询优化器" aria-label="Permalink to &quot;查询优化器&quot;">​</a></h3><p>MongoDB自带了一个查询优化器会为我们选择最合适的查询方案。</p><p>如果一个索引能够精确匹配一个查询，那么查询优化器就会使用这个索引。</p><p>如果不能精确匹配，可能会有几个索引都适合你的查询，那MongoDB会做下列选择：</p><ul><li>MongoDB的查询计划会将多个索引并行的去执行，最先返回第101个结果的就是胜者，其他查询计划都会被终止，执行优胜的查询计划</li><li>这个查询计划会被缓存，接下来相同的查询条件都会使用它</li></ul><h3 id="查询计划缓存改变时机" tabindex="-1">查询计划缓存改变时机 <a class="header-anchor" href="#查询计划缓存改变时机" aria-label="Permalink to &quot;查询计划缓存改变时机&quot;">​</a></h3><ul><li>在计划评估之后表发生了比较大的数据波动，查询优化器就会重新挑选可行的查询计划</li><li>建立索引时</li><li>每执行1000次查询之后，查询优化器就会重新评估查询计划</li></ul><h3 id="联合索引的优化" tabindex="-1">联合索引的优化 <a class="header-anchor" href="#联合索引的优化" aria-label="Permalink to &quot;联合索引的优化&quot;">​</a></h3><p>当你查询条件的顺序和你索引的顺序不一致的话，MongoDB会自动的调整查询顺序，保证你可以使用上索引。</p><p>例如：你的查询条件是(a,c,b)但是你的索引是（a,b,c）mongo会自动将你的查询条件调整为abc，寻找最优解</p><h3 id="聚合管道的优化" tabindex="-1">聚合管道的优化 <a class="header-anchor" href="#聚合管道的优化" aria-label="Permalink to &quot;聚合管道的优化&quot;">​</a></h3><ul><li>如果管道中不需要使用一个完整的文档的全部字段的话，管道不会将多余字段进行传递</li><li>$sort和$limit合并，在内存中只会维护limit个数量的文档，不需要将所有的文档维护在内存中，大大降低内存中sort的压力</li></ul><h2 id="索引的使用建议" tabindex="-1">索引的使用建议 <a class="header-anchor" href="#索引的使用建议" aria-label="Permalink to &quot;索引的使用建议&quot;">​</a></h2><h3 id="索引的优点" tabindex="-1">索引的优点 <a class="header-anchor" href="#索引的优点" aria-label="Permalink to &quot;索引的优点&quot;">​</a></h3><ul><li>减少数据扫描：避免全表扫描代价</li><li>减少内存计算：避免分组排序计算</li><li>提供数据约束：唯一和时间约束性</li></ul><p>索引固然不全是优点，如果不能了解到索引可能带来的危害滥用索引，后果也是非常严重的。</p><h3 id="索引依赖内存" tabindex="-1">索引依赖内存 <a class="header-anchor" href="#索引依赖内存" aria-label="Permalink to &quot;索引依赖内存&quot;">​</a></h3><p>索引虽然是持久化在磁盘中存储的，但为了确保索引的速度，实际上需要将索引加载到内存中使用，使用过后还会进行缓存。内存资源相比磁盘空间那是非常的珍贵了，当内存不足以承载索引的时候，就会出现内存与磁盘交换的情况，这时会大大降低索引的性能。</p><h3 id="索引在每次查询中只使用一次" tabindex="-1">索引在每次查询中只使用一次 <a class="header-anchor" href="#索引在每次查询中只使用一次" aria-label="Permalink to &quot;索引在每次查询中只使用一次&quot;">​</a></h3><p>虽然可以建立多个索引，但是MongoDB在查询时候每次只会使用一次索引。只有$or或查询特殊，它才会给每一个或分支使用索引然后再合并。比如说你对name和count分别做了两个索引，你目标是查找name的值，然后再进行count排序，索引只会对name进行索引查询，并不会再次对count索引排序。</p><h3 id="索引不一定会更快" tabindex="-1">索引不一定会更快 <a class="header-anchor" href="#索引不一定会更快" aria-label="Permalink to &quot;索引不一定会更快&quot;">​</a></h3><p>有一些查询不使用索引会更快。结果集在原集合中所占的比例越大，查询效率越慢。因为使用索引需要进行两次查找：一次查找索引条目，另一次根据索引指针去查找相应的文档。而全表扫描只需要进行一次查询。在最坏的情况，使用索引进行查找次数会是全表扫描的两倍。效率会明显比全表扫描低。而相反在提取较小的子数据集时，索引就非常有效，这就是我们为什么会使用分页。</p><h3 id="索引过多会增加insert和update代价" tabindex="-1">索引过多会增加insert和update代价 <a class="header-anchor" href="#索引过多会增加insert和update代价" aria-label="Permalink to &quot;索引过多会增加insert和update代价&quot;">​</a></h3><p>每次的增改操作都会触发MongoDB去重新建立索引，对于频繁修改的字段不建议使用索引。</p><h3 id="避免效率极低的操作符" tabindex="-1">避免效率极低的操作符 <a class="header-anchor" href="#避免效率极低的操作符" aria-label="Permalink to &quot;避免效率极低的操作符&quot;">​</a></h3><ul><li>$where和$exists这两个操作符，完全不能使用索引</li><li>$ne和$not通常来说取反和不等于，可以使用索引，但是效率极低，不是很有效，往往也会退化成扫描全表</li><li>$nin这个操作符也总是会全表扫描</li></ul><h3 id="aggregate管道中索引只作用在最开始" tabindex="-1">aggregate管道中索引只作用在最开始 <a class="header-anchor" href="#aggregate管道中索引只作用在最开始" aria-label="Permalink to &quot;aggregate管道中索引只作用在最开始&quot;">​</a></h3><p>在aggregate中使用索引时，只有在管道最开始时的$match和$sort可以使用到索引，一旦发生过$project投射，$group分组，$lookup表关联，$unwind打散等操作后，就完全无法使用索引</p><h1 id="ip安全" tabindex="-1">ip安全 <a class="header-anchor" href="#ip安全" aria-label="Permalink to &quot;ip安全&quot;">​</a></h1><p>从3.6开始默认登陆是localhost</p><p>bind_ip=localhost,172.XXX.XXX.XXX</p><p>中间使用登号隔开</p><p>如果不想做IP限制，可以将bind_ip 赋值为0.0.0.0 或者 在[配置文件中启用另外一个参数bind_ip_all，将其设置为true</p><p>登入默认的数据库不同。在3.6 版本，默认的连接数据库变成了test，而3.4/3.2 版本默认是admin库。所以，在设置具有root权限的管理员账号时，请先转至admin下操作（因为账号的查询，系统只有在admin才可以查询，所以root权限的账号，建议在admin库创建，用户数据库的账号，转到用户数据库下创建）。账号的删除一定要在归属库下删除</p><p><a href="https://www.cnblogs.com/operationhome/p/10734659.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/operationhome/p/10734659.html</a></p>`,106),p=[t];function o(i,c,r,d,u,h){return n(),e("div",null,p)}const m=s(l,[["render",o]]);export{g as __pageData,m as default};
