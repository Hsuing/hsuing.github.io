import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1.master","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/9_master_slave.md","filePath":"guide/Database/mongodb/9_master_slave.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/9_master_slave.md"},p=e(`<p>官方在4.0版本后不建议再使用主从架构，mongodb4.0后废弃主从复制</p><p>wget <a href="https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.23.tgz" target="_blank" rel="noreferrer">https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.6.23.tgz</a></p><table><thead><tr><th>ip地址</th><th>说明</th></tr></thead><tbody><tr><td>192.168.122.246</td><td>master</td></tr><tr><td>192.168.122.245</td><td>slave</td></tr></tbody></table><p>master和副本集不能同时存在</p><h1 id="_1-master" tabindex="-1">1.master <a class="header-anchor" href="#_1-master" aria-label="Permalink to &quot;1.master&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@master 27017]# cat mongod.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">port=28017</span></span>
<span class="line"><span style="color:#e1e4e8;">dbpath=/data/mongodb_data/27017/data</span></span>
<span class="line"><span style="color:#e1e4e8;">logpath=/data/mongodb_data/27017/logs/mongod.log</span></span>
<span class="line"><span style="color:#e1e4e8;">pidfilepath=/data/mongodb_data/27017/mongod.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">fork=true</span></span>
<span class="line"><span style="color:#e1e4e8;">logappend=true</span></span>
<span class="line"><span style="color:#e1e4e8;">logRotate=reopen</span></span>
<span class="line"><span style="color:#e1e4e8;">journal=true</span></span>
<span class="line"><span style="color:#e1e4e8;">storageEngine=wiredTiger</span></span>
<span class="line"><span style="color:#e1e4e8;">bind_ip = 0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">master = true</span></span>
<span class="line"><span style="color:#e1e4e8;">source = 192.168.122.245:28017</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@master 27017]# cat mongod.conf </span></span>
<span class="line"><span style="color:#24292e;">port=28017</span></span>
<span class="line"><span style="color:#24292e;">dbpath=/data/mongodb_data/27017/data</span></span>
<span class="line"><span style="color:#24292e;">logpath=/data/mongodb_data/27017/logs/mongod.log</span></span>
<span class="line"><span style="color:#24292e;">pidfilepath=/data/mongodb_data/27017/mongod.pid</span></span>
<span class="line"><span style="color:#24292e;">fork=true</span></span>
<span class="line"><span style="color:#24292e;">logappend=true</span></span>
<span class="line"><span style="color:#24292e;">logRotate=reopen</span></span>
<span class="line"><span style="color:#24292e;">journal=true</span></span>
<span class="line"><span style="color:#24292e;">storageEngine=wiredTiger</span></span>
<span class="line"><span style="color:#24292e;">bind_ip = 0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">master = true</span></span>
<span class="line"><span style="color:#24292e;">source = 192.168.122.245:28017</span></span>
<span class="line"><span style="color:#24292e;">#auth = true</span></span></code></pre></div><ul><li>启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/usr/local/mongo/bin/mongod --config /data/mongodb_data/27017/mongod.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/usr/local/mongo/bin/mongod --config /data/mongodb_data/27017/mongod.conf</span></span></code></pre></div><h1 id="_2-slave" tabindex="-1">2.slave <a class="header-anchor" href="#_2-slave" aria-label="Permalink to &quot;2.slave&quot;">​</a></h1><ul><li>配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave 27017]# cat mongod.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">port=28017</span></span>
<span class="line"><span style="color:#e1e4e8;">dbpath=/data/mongodb_data/27017/data</span></span>
<span class="line"><span style="color:#e1e4e8;">logpath=/data/mongodb_data/27017/logs/mongod.log</span></span>
<span class="line"><span style="color:#e1e4e8;">pidfilepath=/data/mongodb_data/27017/mongod.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">fork=true</span></span>
<span class="line"><span style="color:#e1e4e8;">logappend=true</span></span>
<span class="line"><span style="color:#e1e4e8;">logRotate=reopen</span></span>
<span class="line"><span style="color:#e1e4e8;">journal=true</span></span>
<span class="line"><span style="color:#e1e4e8;">storageEngine=wiredTiger</span></span>
<span class="line"><span style="color:#e1e4e8;">bind_ip = 0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">slave = true </span></span>
<span class="line"><span style="color:#e1e4e8;">source = 192.168.122.246:28017</span></span>
<span class="line"><span style="color:#e1e4e8;">#auth = true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave 27017]# cat mongod.conf </span></span>
<span class="line"><span style="color:#24292e;">port=28017</span></span>
<span class="line"><span style="color:#24292e;">dbpath=/data/mongodb_data/27017/data</span></span>
<span class="line"><span style="color:#24292e;">logpath=/data/mongodb_data/27017/logs/mongod.log</span></span>
<span class="line"><span style="color:#24292e;">pidfilepath=/data/mongodb_data/27017/mongod.pid</span></span>
<span class="line"><span style="color:#24292e;">fork=true</span></span>
<span class="line"><span style="color:#24292e;">logappend=true</span></span>
<span class="line"><span style="color:#24292e;">logRotate=reopen</span></span>
<span class="line"><span style="color:#24292e;">journal=true</span></span>
<span class="line"><span style="color:#24292e;">storageEngine=wiredTiger</span></span>
<span class="line"><span style="color:#24292e;">bind_ip = 0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">slave = true </span></span>
<span class="line"><span style="color:#24292e;">source = 192.168.122.246:28017</span></span>
<span class="line"><span style="color:#24292e;">#auth = true</span></span></code></pre></div><ul><li>启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/usr/local/mongo/bin/mongod --config /data/mongodb_data/27017/mongod.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/usr/local/mongo/bin/mongod --config /data/mongodb_data/27017/mongod.conf</span></span></code></pre></div><h2 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h2><p>在master上面执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/usr/local/mongo/bin/mongo 127.0.0.1:28017</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">创建新库 插入数据</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use new10         </span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db new10</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.new10.save({&quot;name&quot;:22200})</span></span>
<span class="line"><span style="color:#e1e4e8;">WriteResult({ &quot;nInserted&quot; : 1 })</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.new10.find()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/usr/local/mongo/bin/mongo 127.0.0.1:28017</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">创建新库 插入数据</span></span>
<span class="line"><span style="color:#24292e;">&gt; use new10         </span></span>
<span class="line"><span style="color:#24292e;">switched to db new10</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.new10.save({&quot;name&quot;:22200})</span></span>
<span class="line"><span style="color:#24292e;">WriteResult({ &quot;nInserted&quot; : 1 })</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.new10.find()</span></span></code></pre></div><p>在slave上查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/usr/local/mongo/bin/mongo 127.0.0.1:28017</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;rs.slaveOk()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show dbs;</span></span>
<span class="line"><span style="color:#e1e4e8;">admin   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">config  0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">local   0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;">test    0.000GB</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db test</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show tables;</span></span>
<span class="line"><span style="color:#e1e4e8;">new10</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.new10.find()</span></span>
<span class="line"><span style="color:#e1e4e8;">{ &quot;_id&quot; : ObjectId(&quot;61c9275b5745d52b72d861c5&quot;), &quot;name&quot; : 22200 }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/usr/local/mongo/bin/mongo 127.0.0.1:28017</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;rs.slaveOk()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; show dbs;</span></span>
<span class="line"><span style="color:#24292e;">admin   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">config  0.000GB</span></span>
<span class="line"><span style="color:#24292e;">local   0.000GB</span></span>
<span class="line"><span style="color:#24292e;">test    0.000GB</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; use test;</span></span>
<span class="line"><span style="color:#24292e;">switched to db test</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; show tables;</span></span>
<span class="line"><span style="color:#24292e;">new10</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; db.new10.find()</span></span>
<span class="line"><span style="color:#24292e;">{ &quot;_id&quot; : ObjectId(&quot;61c9275b5745d52b72d861c5&quot;), &quot;name&quot; : 22200 }</span></span></code></pre></div><h1 id="_3-cmd" tabindex="-1">3.cmd <a class="header-anchor" href="#_3-cmd" aria-label="Permalink to &quot;3.cmd&quot;">​</a></h1><p><strong>主从相关命令：</strong></p><h2 id="判断master" tabindex="-1">判断master <a class="header-anchor" href="#判断master" aria-label="Permalink to &quot;判断master&quot;">​</a></h2><p>db.isMaster()：主从都可执行，用这个命令判断是不是master</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; db.isMaster()</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ismaster&quot; : true,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxBsonObjectSize&quot; : 16777216,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxMessageSizeBytes&quot; : 48000000,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxWriteBatchSize&quot; : 100000,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;localTime&quot; : ISODate(&quot;2021-12-27T03:03:09.118Z&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;logicalSessionTimeoutMinutes&quot; : 30,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;minWireVersion&quot; : 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;maxWireVersion&quot; : 6,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;readOnly&quot; : false,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;ok&quot; : 1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; db.isMaster()</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ismaster&quot; : true,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxBsonObjectSize&quot; : 16777216,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxMessageSizeBytes&quot; : 48000000,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxWriteBatchSize&quot; : 100000,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;localTime&quot; : ISODate(&quot;2021-12-27T03:03:09.118Z&quot;),</span></span>
<span class="line"><span style="color:#24292e;">	&quot;logicalSessionTimeoutMinutes&quot; : 30,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;minWireVersion&quot; : 0,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;maxWireVersion&quot; : 6,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;readOnly&quot; : false,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;ok&quot; : 1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="获取主从信息master" tabindex="-1">获取主从信息master <a class="header-anchor" href="#获取主从信息master" aria-label="Permalink to &quot;获取主从信息master&quot;">​</a></h2><p>db.getReplicationInfo()：主上执行，获取主从信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#master</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.getReplicationInfo()</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;logSizeMB&quot; : 1292.5505857467651,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;usedMB&quot; : 0.02,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;timeDiff&quot; : 1634,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;timeDiffHours&quot; : 0.45,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;tFirst&quot; : &quot;Sun Dec 26 2021 21:35:17 GMT-0500 (EST)&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;tLast&quot; : &quot;Sun Dec 26 2021 22:02:31 GMT-0500 (EST)&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;now&quot; : &quot;Sun Dec 26 2021 22:02:36 GMT-0500 (EST)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#master</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.getReplicationInfo()</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;logSizeMB&quot; : 1292.5505857467651,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;usedMB&quot; : 0.02,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;timeDiff&quot; : 1634,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;timeDiffHours&quot; : 0.45,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;tFirst&quot; : &quot;Sun Dec 26 2021 21:35:17 GMT-0500 (EST)&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;tLast&quot; : &quot;Sun Dec 26 2021 22:02:31 GMT-0500 (EST)&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;now&quot; : &quot;Sun Dec 26 2021 22:02:36 GMT-0500 (EST)&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="获取主从信息master-slave" tabindex="-1">获取主从信息master/slave <a class="header-anchor" href="#获取主从信息master-slave" aria-label="Permalink to &quot;获取主从信息master/slave&quot;">​</a></h2><p>db.printReplicationInfo()：主从都可执行，获取主从信息</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100943764.jpeg" alt=""></p><h2 id="查看主从延时" tabindex="-1">查看主从延时 <a class="header-anchor" href="#查看主从延时" aria-label="Permalink to &quot;查看主从延时&quot;">​</a></h2><p>db.printSlaveReplicationInfo();：从库执行，查看主从延时</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; db.printSlaveReplicationInfo();</span></span>
<span class="line"><span style="color:#e1e4e8;">WARNING: printSlaveReplicationInfo is deprecated and may be removed in the next major release. Please use printSecondaryReplicationInfo instead.</span></span>
<span class="line"><span style="color:#e1e4e8;">source: 192.168.122.246:28017</span></span>
<span class="line"><span style="color:#e1e4e8;">	syncedTo: Sun Dec 26 2021 22:04:01 GMT-0500 (EST)</span></span>
<span class="line"><span style="color:#e1e4e8;">	2 secs (0 hrs) behind the freshest member (no primary available at the moment)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; db.printSlaveReplicationInfo();</span></span>
<span class="line"><span style="color:#24292e;">WARNING: printSlaveReplicationInfo is deprecated and may be removed in the next major release. Please use printSecondaryReplicationInfo instead.</span></span>
<span class="line"><span style="color:#24292e;">source: 192.168.122.246:28017</span></span>
<span class="line"><span style="color:#24292e;">	syncedTo: Sun Dec 26 2021 22:04:01 GMT-0500 (EST)</span></span>
<span class="line"><span style="color:#24292e;">	2 secs (0 hrs) behind the freshest member (no primary available at the moment)</span></span></code></pre></div><p><strong>同步原理：</strong></p><p>同步就是master上把对数据的更改操作记录到oplog中，然后slave抓取master的oplog执行。从这点看Oplog的功能和<a href="https://www.yisu.com/mysql/" target="_blank" rel="noreferrer">mysql</a>的mysql-bin.的功能类似。Mysql-bin以二进制日志的形式存在，但是oplog是以一个mongodb的表的形式存在，该表在local库表名为oplog.$main，该表为循环写入形，所以不用定时清理</p>`,34),o=[p];function t(c,i,r,d,u,g){return a(),n("div",null,o)}const h=s(l,[["render",t]]);export{m as __pageData,h as default};
