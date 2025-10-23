import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"一、InfluxDB基本概念","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/index.md","filePath":"guide/Database/influxdb/index.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/index.md"},p=e(`<h1 id="一、influxdb基本概念" tabindex="-1">一、InfluxDB基本概念 <a class="header-anchor" href="#一、influxdb基本概念" aria-label="Permalink to &quot;一、InfluxDB基本概念&quot;">​</a></h1><p>InfluxDB下载地址</p><p><a href="https://portal.influxdata.com/downloads/" target="_blank" rel="noreferrer">https://portal.influxdata.com/downloads/</a></p><p>InfluxDB排名</p><p><a href="https://db-engines.com/en/ranking/time+series+dbms" target="_blank" rel="noreferrer">https://db-engines.com/en/ranking/time+series+dbms</a></p><p>InfluxDB 是一个开源分布式时序、事件和指标数据库。使用 Go 语言编写，无需外部依赖。其设计目标是实现分布式和水平伸缩扩展。</p><p>它有三大特性：</p><ol><li>Time Series （时间序列）：你可以使用与时间有关的相关函数（如最大，最小，求和等）</li><li>Metrics（度量）：你可以实时对大量数据进行计算</li><li>Eevents（事件）：它支持任意的事件数据</li></ol><p>特点:</p><ul><li>schemaless(无结构)，可以是任意数量的列</li><li>Scalable</li><li>min, max, sum, count, mean, median 一系列函数，方便统计</li><li>Native HTTP API, 内置http支持，使用http读写</li><li>Powerful Query Language 类似sql</li><li>Built-in Explorer 自带管理工具</li></ul><ul><li>InfluxDB作为时序数据库</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1，influxdb 是go语言开发，是一种时间序列数据库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2，influxdb 是无需预先定义列，无结构</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1，influxdb 是go语言开发，是一种时间序列数据库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2，influxdb 是无需预先定义列，无结构</span></span></code></pre></div><table><thead><tr><th>mysql</th><th>influxdb</th><th>说明</th></tr></thead><tbody><tr><td>database</td><td>database</td><td>数据库</td></tr><tr><td>table</td><td>measurement</td><td>类似mysql中表的概念</td></tr><tr><td>record(point)</td><td>tag + field + timestamp [tag(可索引)，field(不可索引)]</td><td>传统表中的一行数据，映射到influxdb中，可以划分为三个</td></tr></tbody></table><blockquote><ol><li>database 数据库，和mysql的数据库相比，没有太大的歧义</li></ol></blockquote><blockquote><ol start="2"><li>measurement 对比的是mysql中的table，从实际体验来看，两个之间最明显的区别在于没有单独的创建measurement的方法，直接新增一条数据时，若measurement不存在，则直接创建并插入一条数据</li></ol></blockquote><blockquote><ol start="3"><li><p>Point 这个对比的是mysql中的record，在influxDB中，表示每个表中，某个时刻，满足某个条件的&gt;filed数据（简单来说就是 timestamp + tag + filed)的组成一个point</p></li><li><p>Shard</p></li></ol><p>Shard 在 InfluxDB 中是一个比较重要的概念，它和 retention policy 相关联。每一个存储策略下会存在许多 shard，每一个 shard 存储一个指定时间段内的数据，并且不重复，例如 7点-8点 的数据落入 shard0 中，8点-9点的数据则落入 shard1 中。每一个 shard 都对应一个底层的 tsm 存储引擎，有独立的 cache、wal、tsm file</p><ol start="5"><li>组件</li></ol><p>TSM 存储引擎主要由几个部分组成： cache、wal、tsm file、compactor</p></blockquote><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141821198.png" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1）Cache：cache 相当于是 LSM Tree 中的 memtabl。插入数据时，实际上是同时往 cache 与 wal 中写入数据，可以认为 cache 是 wal 文件中的数据在内存中的缓存。当 InfluxDB 启动时，会遍历所有的 wal 文件，重新构造 cache，这样即使系统出现故障，也不会导致数据的丢失。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cache 中的数据并不是无限增长的，有一个 maxSize 参数用于控制当 cache 中的数据占用多少内存后就会将数据写入 tsm 文件。如果不配置的话，默认上限为 25MB，每当 cache 中的数据达到阀值后，会将当前的 cache 进行一次快照，之后清空当前 cache 中的内容，再创建一个新的 wal 文件用于写入，剩下的 wal 文件最后会被删除，快照中的数据会经过排序写入一个新的 tsm 文件中。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2）WAL：wal 文件的内容与内存中的 cache 相同，其作用就是为了持久化数据，当系统崩溃后可以通过 wal 文件恢复还没有写入到 tsm 文件中的数据。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3）TSM File：单个 tsm file 大小最大为 2GB，用于存放数据。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4）Compactor：compactor 组件在后台持续运行，每隔 1 秒会检查一次是否有需要压缩合并的数据。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">主要进行两种操作，一种是 cache 中的数据大小达到阀值后，进行快照，之后转存到一个新的 tsm 文件中。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">另外一种就是合并当前的 tsm 文件，将多个小的 tsm 文件合并成一个，使每一个文件尽量达到单个文件的最大大小，减少文件的数量，并且一些数据的删除操作也是在这个时候完成</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1）Cache：cache 相当于是 LSM Tree 中的 memtabl。插入数据时，实际上是同时往 cache 与 wal 中写入数据，可以认为 cache 是 wal 文件中的数据在内存中的缓存。当 InfluxDB 启动时，会遍历所有的 wal 文件，重新构造 cache，这样即使系统出现故障，也不会导致数据的丢失。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cache 中的数据并不是无限增长的，有一个 maxSize 参数用于控制当 cache 中的数据占用多少内存后就会将数据写入 tsm 文件。如果不配置的话，默认上限为 25MB，每当 cache 中的数据达到阀值后，会将当前的 cache 进行一次快照，之后清空当前 cache 中的内容，再创建一个新的 wal 文件用于写入，剩下的 wal 文件最后会被删除，快照中的数据会经过排序写入一个新的 tsm 文件中。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2）WAL：wal 文件的内容与内存中的 cache 相同，其作用就是为了持久化数据，当系统崩溃后可以通过 wal 文件恢复还没有写入到 tsm 文件中的数据。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3）TSM File：单个 tsm file 大小最大为 2GB，用于存放数据。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4）Compactor：compactor 组件在后台持续运行，每隔 1 秒会检查一次是否有需要压缩合并的数据。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">主要进行两种操作，一种是 cache 中的数据大小达到阀值后，进行快照，之后转存到一个新的 tsm 文件中。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">另外一种就是合并当前的 tsm 文件，将多个小的 tsm 文件合并成一个，使每一个文件尽量达到单个文件的最大大小，减少文件的数量，并且一些数据的删除操作也是在这个时候完成</span></span></code></pre></div><h2 id="目录与文件结构" tabindex="-1">目录与文件结构 <a class="header-anchor" href="#目录与文件结构" aria-label="Permalink to &quot;目录与文件结构&quot;">​</a></h2><p>InfluxDB 的数据存储主要有三个目录。默认情况下是 meta, wal 以及 data 三个目录。</p><p>meta 用于存储数据库的一些元数据，meta 目录下有一个 <code>meta.db</code> 文件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141821200.png" alt=""></p><p>wal 目录存放预写日志文件，以 <code>.wal</code> 结尾</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141821169.png" alt=""></p><p>data 目录存放实际存储的数据文件，以 <code>.tsm</code> 结尾</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141821196.png" alt=""></p><p>上面几张图中，_internal为数据库名，monitor为存储策略名称，再下一层目录中的以数字命名的目录是 shard 的 ID 值。</p><p>存储策略下有两个 shard，ID 分别为 1 和 2，shard 存储了某一个时间段范围内的数据。再下一级的目录则为具体的文件，分别是 <code>.wal</code> 和 <code>.tsm</code> 结尾的文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">timestamp : 时间戳，ns单位，每个记录都必然有这个属性，没有显示添加时，默认给一个</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tag: 标签，kv结构，在database中， tag + measurement 一起构建索引</span></span>
<span class="line"><span style="color:#e1e4e8;">参与索引创建，因此适合作为查询的过滤条件</span></span>
<span class="line"><span style="color:#e1e4e8;">tag的数据量不要太多，最好能有典型的辨别性（和mysql的建立索引的原则差不多）</span></span>
<span class="line"><span style="color:#e1e4e8;">value为String类型</span></span>
<span class="line"><span style="color:#e1e4e8;">tag是可选的，在measurement不设置tag也是ok的</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">field：存储数据，kv结构</span></span>
<span class="line"><span style="color:#e1e4e8;">数据类型为: long, String, boolean, float</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4. Series</span></span>
<span class="line"><span style="color:#e1e4e8;">Series: tag key 与tag value的唯一组合</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">field key， field value， field set，tag key，tag value，tag set，measurement， retention policy ，series，point</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">timestamp : 时间戳，ns单位，每个记录都必然有这个属性，没有显示添加时，默认给一个</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tag: 标签，kv结构，在database中， tag + measurement 一起构建索引</span></span>
<span class="line"><span style="color:#24292e;">参与索引创建，因此适合作为查询的过滤条件</span></span>
<span class="line"><span style="color:#24292e;">tag的数据量不要太多，最好能有典型的辨别性（和mysql的建立索引的原则差不多）</span></span>
<span class="line"><span style="color:#24292e;">value为String类型</span></span>
<span class="line"><span style="color:#24292e;">tag是可选的，在measurement不设置tag也是ok的</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">field：存储数据，kv结构</span></span>
<span class="line"><span style="color:#24292e;">数据类型为: long, String, boolean, float</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4. Series</span></span>
<span class="line"><span style="color:#24292e;">Series: tag key 与tag value的唯一组合</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">field key， field value， field set，tag key，tag value，tag set，measurement， retention policy ，series，point</span></span></code></pre></div><h2 id="point" tabindex="-1">Point <a class="header-anchor" href="#point" aria-label="Permalink to &quot;Point&quot;">​</a></h2><p>Point由时间戳（time）、数据（field）、标签（tags）组成</p><table><thead><tr><th>Point属性</th><th>传统数据库中的概念</th></tr></thead><tbody><tr><td>time</td><td>每个数据记录时间，是数据库中的主索引(会自动生成)</td></tr><tr><td>fields</td><td>各种记录值（没有索引的属性）也就是记录的值：温度， 湿度</td></tr><tr><td>tags</td><td>各种有索引的属性：地区，海拔</td></tr></tbody></table><h2 id="series" tabindex="-1">series <a class="header-anchor" href="#series" aria-label="Permalink to &quot;series&quot;">​</a></h2><p>所有在数据库中的数据，都需要通过图表来展示，而这个series表示这个表里面的数据，可以在图表上画成几条线：通过tags排列组合算出来</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show series from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">key</span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">add_test,name=YiHui,phone=110</span></span>
<span class="line"><span style="color:#e1e4e8;">add_test,name=YiHui2,phone=911</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show series from add_test</span></span>
<span class="line"><span style="color:#24292e;">key</span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">add_test,name=YiHui,phone=110</span></span>
<span class="line"><span style="color:#24292e;">add_test,name=YiHui2,phone=911</span></span></code></pre></div><h2 id="_1-1列子" tabindex="-1">1.1列子 <a class="header-anchor" href="#_1-1列子" aria-label="Permalink to &quot;1.1列子&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">建立一个measurement,保存某个应用的性能状况，包含以下指标, 每秒写一次数据到influxDB中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">服务机器: host=127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">服务接口: service=app.service.index</span></span>
<span class="line"><span style="color:#e1e4e8;">qps: qps=1340</span></span>
<span class="line"><span style="color:#e1e4e8;">rt: 1313</span></span>
<span class="line"><span style="color:#e1e4e8;">cpu: 45.23</span></span>
<span class="line"><span style="color:#e1e4e8;">mem: 4154m</span></span>
<span class="line"><span style="color:#e1e4e8;">load: 1.21</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1. measurement创建</span></span>
<span class="line"><span style="color:#e1e4e8;">上面有7个指标参数，第一步就是区分tag和field，前面说到tag会建索引，推荐用于可以区分类型，取值可以预估的字段，所以对上面进行如下区分</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tag:</span></span>
<span class="line"><span style="color:#e1e4e8;">    host</span></span>
<span class="line"><span style="color:#e1e4e8;">    servie</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">field:</span></span>
<span class="line"><span style="color:#e1e4e8;">    qps</span></span>
<span class="line"><span style="color:#e1e4e8;">    rt</span></span>
<span class="line"><span style="color:#e1e4e8;">    cpu</span></span>
<span class="line"><span style="color:#e1e4e8;">    mem</span></span>
<span class="line"><span style="color:#e1e4e8;">    load</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">建立一个measurement,保存某个应用的性能状况，包含以下指标, 每秒写一次数据到influxDB中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">服务机器: host=127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">服务接口: service=app.service.index</span></span>
<span class="line"><span style="color:#24292e;">qps: qps=1340</span></span>
<span class="line"><span style="color:#24292e;">rt: 1313</span></span>
<span class="line"><span style="color:#24292e;">cpu: 45.23</span></span>
<span class="line"><span style="color:#24292e;">mem: 4154m</span></span>
<span class="line"><span style="color:#24292e;">load: 1.21</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1. measurement创建</span></span>
<span class="line"><span style="color:#24292e;">上面有7个指标参数，第一步就是区分tag和field，前面说到tag会建索引，推荐用于可以区分类型，取值可以预估的字段，所以对上面进行如下区分</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tag:</span></span>
<span class="line"><span style="color:#24292e;">    host</span></span>
<span class="line"><span style="color:#24292e;">    servie</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">field:</span></span>
<span class="line"><span style="color:#24292e;">    qps</span></span>
<span class="line"><span style="color:#24292e;">    rt</span></span>
<span class="line"><span style="color:#24292e;">    cpu</span></span>
<span class="line"><span style="color:#24292e;">    mem</span></span>
<span class="line"><span style="color:#24292e;">    load</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; insert myapp,host=127.0.0.1,service=app.service.index qps=1340,rt=1313,cpu=45.23,mem=1,load=1.21</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：</span></span>
<span class="line"><span style="color:#e1e4e8;">    命令最后不能有分号; ,否则导致语法错误</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from myapp</span></span>
<span class="line"><span style="color:#e1e4e8;">name: myapp</span></span>
<span class="line"><span style="color:#e1e4e8;">time                cpu   host      load mem qps  rt   service</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ---   ----      ---- --- ---  --   -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568385256278474506 45.23 127.0.0.1 1.21 1   1340 1313 app.service.index</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注释：</span></span>
<span class="line"><span style="color:#e1e4e8;">    在insert执行语句中，tag与tag、field与field之间用都好进行分割，tag与field之间用空格分割</span></span>
<span class="line"><span style="color:#e1e4e8;">    tag的value都是，String类型，不需要加双引号</span></span>
<span class="line"><span style="color:#e1e4e8;">    field的String类型数据，需要放在双引号中，否则会报错</span></span>
<span class="line"><span style="color:#e1e4e8;">    如果需要显示添加时间戳，在filed后添加空格，再添加时间戳</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; insert myapp,host=127.0.0.1,service=app.service.index qps=1340,rt=1313,cpu=45.23,mem=1,load=1.21</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：</span></span>
<span class="line"><span style="color:#24292e;">    命令最后不能有分号; ,否则导致语法错误</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from myapp</span></span>
<span class="line"><span style="color:#24292e;">name: myapp</span></span>
<span class="line"><span style="color:#24292e;">time                cpu   host      load mem qps  rt   service</span></span>
<span class="line"><span style="color:#24292e;">----                ---   ----      ---- --- ---  --   -------</span></span>
<span class="line"><span style="color:#24292e;">1568385256278474506 45.23 127.0.0.1 1.21 1   1340 1313 app.service.index</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注释：</span></span>
<span class="line"><span style="color:#24292e;">    在insert执行语句中，tag与tag、field与field之间用都好进行分割，tag与field之间用空格分割</span></span>
<span class="line"><span style="color:#24292e;">    tag的value都是，String类型，不需要加双引号</span></span>
<span class="line"><span style="color:#24292e;">    field的String类型数据，需要放在双引号中，否则会报错</span></span>
<span class="line"><span style="color:#24292e;">    如果需要显示添加时间戳，在filed后添加空格，再添加时间戳</span></span></code></pre></div><h3 id="field" tabindex="-1">field <a class="header-anchor" href="#field" aria-label="Permalink to &quot;field&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#是否可以没有field</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; insert gotable , host=217.0.1 ,server=hello</span></span>
<span class="line"><span style="color:#e1e4e8;">ERR: {&quot;error&quot;:&quot;unable to parse &#39;gotable , host=217.0.1 ,server=hello&#39;: invalid field format&quot;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#是否可以没有field</span></span>
<span class="line"><span style="color:#24292e;">&gt; insert gotable , host=217.0.1 ,server=hello</span></span>
<span class="line"><span style="color:#24292e;">ERR: {&quot;error&quot;:&quot;unable to parse &#39;gotable , host=217.0.1 ,server=hello&#39;: invalid field format&quot;}</span></span></code></pre></div><h3 id="tag" tabindex="-1">tag <a class="header-anchor" href="#tag" aria-label="Permalink to &quot;tag&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; insert gotabl qps=123 ,rts=123</span></span>
<span class="line"><span style="color:#e1e4e8;">ERR: {&quot;error&quot;:&quot;unable to parse &#39;gotabl qps=123 ,rts=123&#39;: bad timestamp&quot;}</span></span>
<span class="line"><span style="color:#e1e4e8;">注意：</span></span>
<span class="line"><span style="color:#e1e4e8;">    tag和tag之间不能有空格</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; insert gotabl qps=123,rts=123</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; insert gotabl qps=123 ,rts=123</span></span>
<span class="line"><span style="color:#24292e;">ERR: {&quot;error&quot;:&quot;unable to parse &#39;gotabl qps=123 ,rts=123&#39;: bad timestamp&quot;}</span></span>
<span class="line"><span style="color:#24292e;">注意：</span></span>
<span class="line"><span style="color:#24292e;">    tag和tag之间不能有空格</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; insert gotabl qps=123,rts=123</span></span></code></pre></div><h2 id="_2-2策略" tabindex="-1">2.2策略 <a class="header-anchor" href="#_2-2策略" aria-label="Permalink to &quot;2.2策略&quot;">​</a></h2><blockquote><p>数据保存的策略 retention policy, 用于决定数据保存多久（意思是数据可以删除），保存几个备份，集群的处理</p></blockquote><blockquote><p>InfluxDB本身不提供数据的删除操作，因此用来控制数据量的方式就是定义数据保留策略。 因此定义数据保留策略的目的是让InfluxDB能够知道可以丢弃哪些数据，从而更高效的处理数据</p></blockquote><h3 id="查询策略" tabindex="-1">查询策略 <a class="header-anchor" href="#查询策略" aria-label="Permalink to &quot;查询策略&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#语法：</span></span>
<span class="line"><span style="color:#e1e4e8;">show retention policies on &lt;database name&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on hello(db_name)</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">name: 名称</span></span>
<span class="line"><span style="color:#e1e4e8;">duration: 保留时间, 0表示永久保存</span></span>
<span class="line"><span style="color:#e1e4e8;">shardGroupDuration: shardGroup的存储时间，shardGroup是InfluxDB的一个基本储存结构，应该大于这个时间的数据在查询效率上应该有所降低。</span></span>
<span class="line"><span style="color:#e1e4e8;">replicaN: 全称是REPLICATION，副本个数</span></span>
<span class="line"><span style="color:#e1e4e8;">default: 是否是默认策略</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#语法：</span></span>
<span class="line"><span style="color:#24292e;">show retention policies on &lt;database name&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on hello(db_name)</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">name: 名称</span></span>
<span class="line"><span style="color:#24292e;">duration: 保留时间, 0表示永久保存</span></span>
<span class="line"><span style="color:#24292e;">shardGroupDuration: shardGroup的存储时间，shardGroup是InfluxDB的一个基本储存结构，应该大于这个时间的数据在查询效率上应该有所降低。</span></span>
<span class="line"><span style="color:#24292e;">replicaN: 全称是REPLICATION，副本个数</span></span>
<span class="line"><span style="color:#24292e;">default: 是否是默认策略</span></span></code></pre></div><h3 id="新建策略retention-policy" tabindex="-1">新建策略retention policy <a class="header-anchor" href="#新建策略retention-policy" aria-label="Permalink to &quot;新建策略retention policy&quot;">​</a></h3><blockquote><p>retention policy依托于database存在，也就是说保存策略创建时，需要指定具体的数据库</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">RETENTION</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">POLICY</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">retention_policy_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">database_nam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">DURATION</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">duratio</span><span style="color:#E1E4E8;">n</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">REPLICATION</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">n</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> [SHARD </span><span style="color:#9ECBFF;">DURATION</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">duratio</span><span style="color:#E1E4E8;">n</span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">]</span><span style="color:#E1E4E8;"> [DEFAULT]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">RETENTION</span><span style="color:#24292E;"> </span><span style="color:#032F62;">POLICY</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">retention_policy_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">database_nam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">DURATION</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">duratio</span><span style="color:#24292E;">n</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">REPLICATION</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">n</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> [SHARD </span><span style="color:#032F62;">DURATION</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">duratio</span><span style="color:#24292E;">n</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">]</span><span style="color:#24292E;"> [DEFAULT]</span></span></code></pre></div><blockquote><p>retention_policy_name: 策略名（自定义的）</p></blockquote><blockquote><p>database_name: 一个必须存在的数据库名</p></blockquote><blockquote><p>duration: 定义的数据保存时间，最低为1h，如果设置为0，表示数据持久不失效（默认的策略就是这样的）</p></blockquote><blockquote><p>REPLICATION: 定义每个point保存的副本数，默认为1</p></blockquote><blockquote><p>default: 表示将这个创建的保存策略设置为默认的</p></blockquote><blockquote><p>h（小时），d（天），w（星期）</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; create retention policy &quot;2_hour&quot; on hello duration 2h replication 1 default</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on hello</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">2_hour  2h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">数据保存时间,数据分片时间,副本数</span></span>
<span class="line"><span style="color:#e1e4e8;">duration 这一列，表示的就是这个策略定义的数据保存时间</span></span>
<span class="line"><span style="color:#e1e4e8;">    因为我们知道每条记录都有一个time表明这条记录的时间戳，如果当前时间与这条记录的time之间差值，大于duration，那么这条数据就会被删除掉</span></span>
<span class="line"><span style="color:#e1e4e8;">    默认的保存策略autogen中的duraiton=0，这里表示这条数据不会被删除</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">副本</span></span>
<span class="line"><span style="color:#e1e4e8;">    副本这个指定了数据有多少个独立的备份存在</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">分片时间</span></span>
<span class="line"><span style="color:#e1e4e8;">简单理解为每个分片的时间跨度，比如上面的1_d这个策略中，数据保存最近24小时的，每个小时一个分组</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; create retention policy &quot;2_hour&quot; on hello duration 2h replication 1 default</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on hello</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">2_hour  2h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">数据保存时间,数据分片时间,副本数</span></span>
<span class="line"><span style="color:#24292e;">duration 这一列，表示的就是这个策略定义的数据保存时间</span></span>
<span class="line"><span style="color:#24292e;">    因为我们知道每条记录都有一个time表明这条记录的时间戳，如果当前时间与这条记录的time之间差值，大于duration，那么这条数据就会被删除掉</span></span>
<span class="line"><span style="color:#24292e;">    默认的保存策略autogen中的duraiton=0，这里表示这条数据不会被删除</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">副本</span></span>
<span class="line"><span style="color:#24292e;">    副本这个指定了数据有多少个独立的备份存在</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">分片时间</span></span>
<span class="line"><span style="color:#24292e;">简单理解为每个分片的时间跨度，比如上面的1_d这个策略中，数据保存最近24小时的，每个小时一个分组</span></span></code></pre></div><ul><li>我们在创建数据策略的时候，大多时候都没有指定这个值，系统给出的方案如下</li></ul><table><thead><tr><th>Retention Policy’s DURATION</th><th>Shard Group Duration</th></tr></thead><tbody><tr><td>&lt; 2 days</td><td>1 hour</td></tr><tr><td>&gt;= 2 days and &lt;= 6 months</td><td>1 day</td></tr><tr><td>&gt; 6 months</td><td>7 days</td></tr></tbody></table><h3 id="修改策略" tabindex="-1">修改策略 <a class="header-anchor" href="#修改策略" aria-label="Permalink to &quot;修改策略&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; alter retention policy &quot;2_hour&quot; on hello duration 4h default</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on hello</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">2_hour  4h0m0s   1h0m0s             1        true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; alter retention policy &quot;2_hour&quot; on hello duration 4h default</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on hello</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">2_hour  4h0m0s   1h0m0s             1        true</span></span></code></pre></div><h3 id="删除策略" tabindex="-1">删除策略 <a class="header-anchor" href="#删除策略" aria-label="Permalink to &quot;删除策略&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; drop retention policy &quot;2_hour&quot; on hello</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on hello</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; drop retention policy &quot;2_hour&quot; on hello</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on hello</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span></code></pre></div><h2 id="_2-3-time" tabindex="-1">2.3 time <a class="header-anchor" href="#_2-3-time" aria-label="Permalink to &quot;2.3 time&quot;">​</a></h2><ul><li>直接使用influx-cli查询数据时，时间戳格式不太友好，记录下显示日期的方式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">influx -precision rfc3339</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">influx -precision rfc3339</span></span></code></pre></div><ul><li>连接后设置参数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入控制台</span></span>
<span class="line"><span style="color:#e1e4e8;">influx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置参数</span></span>
<span class="line"><span style="color:#e1e4e8;">precision rfc3339</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入控制台</span></span>
<span class="line"><span style="color:#24292e;">influx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 设置参数</span></span>
<span class="line"><span style="color:#24292e;">precision rfc3339</span></span></code></pre></div><h1 id="二、influxdb提供多种操作方式" tabindex="-1">二、InfluxDB提供多种操作方式： <a class="header-anchor" href="#二、influxdb提供多种操作方式" aria-label="Permalink to &quot;二、InfluxDB提供多种操作方式：&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1）客户端命令行方式</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2）HTTP API接口</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3）各语言API库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4）基于WEB管理页面操作</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1）客户端命令行方式</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2）HTTP API接口</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3）各语言API库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4）基于WEB管理页面操作</span></span></code></pre></div><ul><li>文档</li></ul><p><a href="https://docs.influxdata.com/influxdb/v1.7/" target="_blank" rel="noreferrer">https://docs.influxdata.com/influxdb/v1.7/</a></p><p><a href="https://zhuanlan.zhihu.com/p/97247465" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/97247465</a></p>`,73),o=[p];function t(c,i,r,d,y,h){return a(),n("div",null,o)}const m=s(l,[["render",t]]);export{g as __pageData,m as default};
