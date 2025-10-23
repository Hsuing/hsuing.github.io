import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/12-POLICY.md","filePath":"guide/Database/influxdb/12-POLICY.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/12-POLICY.md"},p=n(`<h2 id="_1-设置策略" tabindex="-1">1.设置策略 <a class="header-anchor" href="#_1-设置策略" aria-label="Permalink to &quot;1.设置策略&quot;">​</a></h2><p>InfluxDB 设置数据保留策略，验证保留的数据存储大小</p><h3 id="基本概念说明" tabindex="-1">基本概念说明 <a class="header-anchor" href="#基本概念说明" aria-label="Permalink to &quot;基本概念说明&quot;">​</a></h3><h3 id="_1-1-influxdb-数据保留策略说明" tabindex="-1">1.1 InfluxDB 数据保留策略说明 <a class="header-anchor" href="#_1-1-influxdb-数据保留策略说明" aria-label="Permalink to &quot;1.1 InfluxDB 数据保留策略说明&quot;">​</a></h3><p>InfluxDB的数据保留策略(RP)用来定义数据在InfluxDB中存放的时间,或者定义保存某个期间的数据。 一个数据库可以有多个保留策略, 但每个策略必须是独一无二的。</p><p>数据保留策略提供了一个简单高效的方法用来清除InfluxDB数据库中的过期数据，一旦数据超过过期时间，数据会自动从InfluxDB中清除，而过期数据清除的时间单位以shard group的duration为单位</p><h3 id="_1-2-influxdb数据保留策略目的" tabindex="-1">1.2 InfluxDB数据保留策略目的 <a class="header-anchor" href="#_1-2-influxdb数据保留策略目的" aria-label="Permalink to &quot;1.2  InfluxDB数据保留策略目的&quot;">​</a></h3><p>InfluxDB本身不提供数据的删除操作, 因此用来控制数据量的方式就是定义数据保留策略。 因此定义数据保留策略的目的是让InfluxDB能够知道可以丢弃哪些数据, 节省数据存储空间，避免数据冗余的情况</p><h2 id="_2-操作示例" tabindex="-1">2.操作示例 <a class="header-anchor" href="#_2-操作示例" aria-label="Permalink to &quot;2.操作示例&quot;">​</a></h2><h3 id="_2-1查看数据保留策略" tabindex="-1">2.1查看数据保留策略 <a class="header-anchor" href="#_2-1查看数据保留策略" aria-label="Permalink to &quot;2.1查看数据保留策略&quot;">​</a></h3><ul><li>语法：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">show retention policies on &lt;database name&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">show retention policies on &lt;database name&gt;</span></span></code></pre></div><p>比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 选择使用telegraf数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use telegraf;</span></span>
<span class="line"><span style="color:#e1e4e8;">Using database telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 查询数据保留策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 选择使用telegraf数据库</span></span>
<span class="line"><span style="color:#24292e;">&gt; use telegraf;</span></span>
<span class="line"><span style="color:#24292e;">Using database telegraf</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 查询数据保留策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><h3 id="_2-2-新建数据保留策略" tabindex="-1">2.2 新建数据保留策略 <a class="header-anchor" href="#_2-2-新建数据保留策略" aria-label="Permalink to &quot;2.2 新建数据保留策略&quot;">​</a></h3><ul><li>语法：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE RETENTION POLICY &lt;retention_policy_name&gt; ON &lt;database_name&gt; DURATION &lt;duration&gt; REPLICATION &lt;n&gt; [SHARD DURATION &lt;duration&gt;] [DEFAULT]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE RETENTION POLICY &lt;retention_policy_name&gt; ON &lt;database_name&gt; DURATION &lt;duration&gt; REPLICATION &lt;n&gt; [SHARD DURATION &lt;duration&gt;] [DEFAULT]</span></span></code></pre></div><p>参数说明：</p><table><thead><tr><th>参数名字</th><th>说明</th></tr></thead><tbody><tr><td>name</td><td>策略名称，默认autogen</td></tr><tr><td>duration</td><td>持续时间， 0s 代表无限制，单位(s,h,d,w,m)</td></tr><tr><td>shardGroupDuration shardGroup</td><td>数据存储时间，shardGroup是InfluxDB的一个基本存储结构, 应该大于这个时间的数据在查询效率上应该有所降低</td></tr><tr><td>replicaN</td><td>副本个数，1 代表只有一个副本</td></tr><tr><td>default</td><td>是否默认策略：true 代表设置为该数据库的默认策略</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 新建一个策略</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE RETENTION POLICY &quot;策略名称&quot; ON 数据库名 DURATION 时长 REPLICATION 副本个数;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 新建一个策略并且直接设置为默认策略</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE RETENTION POLICY &quot;策略名称&quot; ON 数据库名 DURATION 时长 REPLICATION 副本个数 DEFAULT;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 新建一个策略</span></span>
<span class="line"><span style="color:#24292e;">CREATE RETENTION POLICY &quot;策略名称&quot; ON 数据库名 DURATION 时长 REPLICATION 副本个数;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 新建一个策略并且直接设置为默认策略</span></span>
<span class="line"><span style="color:#24292e;">CREATE RETENTION POLICY &quot;策略名称&quot; ON 数据库名 DURATION 时长 REPLICATION 副本个数 DEFAULT;</span></span></code></pre></div><ul><li>新增一个新的默认策略</li></ul><p>要注意的是，一个数据库的保留策略可以有多个，但是只能有一个是默认的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建新的默认策略之前的策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建新的默认策略role_01保留数据时长1小时</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; CREATE RETENTION POLICY &quot;role_01&quot; ON telegraf DURATION 1h REPLICATION 1 DEFAULT;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看策略的变化</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">role_01 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建新的默认策略之前的策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 创建新的默认策略role_01保留数据时长1小时</span></span>
<span class="line"><span style="color:#24292e;">&gt; CREATE RETENTION POLICY &quot;role_01&quot; ON telegraf DURATION 1h REPLICATION 1 DEFAULT;</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 查看策略的变化</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">role_01 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><p>因为默认策略已经修改为<code>role_01</code>，那么如果还想用之前的<code>autogen</code>策略来查询数据，则需要在查询表之前加上策略的名称：<code>&quot;策略名&quot;.表名</code>，如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from &quot;autogen&quot;.cpu limit 2;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: cpu</span></span>
<span class="line"><span style="color:#e1e4e8;">time                cpu       host     usage_guest usage_guest_nice usage_idle        usage_iowait        usage_irq usage_nice usage_softirq usage_steal usage_system        usage_user</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ---       ----     ----------- ---------------- ----------        ------------        --------- ---------- ------------- ----------- ------------        ----------</span></span>
<span class="line"><span style="color:#e1e4e8;">1574663960000000000 cpu-total locust03 0           0                99.44972486076016 0.05002501250678571 0         0          0             0           0.2501250625248291  0.2501250625430281</span></span>
<span class="line"><span style="color:#e1e4e8;">1574663960000000000 cpu0      locust03 0           0                99.59959959921699 0.10010010010243535 0         0          0             0           0.20020020020031867 0.10010010005008706</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from &quot;autogen&quot;.cpu limit 2;</span></span>
<span class="line"><span style="color:#24292e;">name: cpu</span></span>
<span class="line"><span style="color:#24292e;">time                cpu       host     usage_guest usage_guest_nice usage_idle        usage_iowait        usage_irq usage_nice usage_softirq usage_steal usage_system        usage_user</span></span>
<span class="line"><span style="color:#24292e;">----                ---       ----     ----------- ---------------- ----------        ------------        --------- ---------- ------------- ----------- ------------        ----------</span></span>
<span class="line"><span style="color:#24292e;">1574663960000000000 cpu-total locust03 0           0                99.44972486076016 0.05002501250678571 0         0          0             0           0.2501250625248291  0.2501250625430281</span></span>
<span class="line"><span style="color:#24292e;">1574663960000000000 cpu0      locust03 0           0                99.59959959921699 0.10010010010243535 0         0          0             0           0.20020020020031867 0.10010010005008706</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><h3 id="_2-3-修改数据保留策略" tabindex="-1">2.3 修改数据保留策略 <a class="header-anchor" href="#_2-3-修改数据保留策略" aria-label="Permalink to &quot;2.3 修改数据保留策略&quot;">​</a></h3><ul><li>语法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER RETENTION POLICY &lt;retention_policy_name&gt; ON &lt;database_name&gt; DURATION &lt;duration&gt; REPLICATION &lt;n&gt; SHARD DURATION &lt;duration&gt; DEFAULT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER RETENTION POLICY &lt;retention_policy_name&gt; ON &lt;database_name&gt; DURATION &lt;duration&gt; REPLICATION &lt;n&gt; SHARD DURATION &lt;duration&gt; DEFAULT</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER RETENTION POLICY &quot;策略名称&quot; ON &quot;数据库名&quot; DURATION 时长</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER RETENTION POLICY &quot;策略名称&quot; ON &quot;数据库名&quot; DURATION 时长 DEFAULT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER RETENTION POLICY &quot;策略名称&quot; ON &quot;数据库名&quot; DURATION 时长</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER RETENTION POLICY &quot;策略名称&quot; ON &quot;数据库名&quot; DURATION 时长 DEFAULT</span></span></code></pre></div><p>在这里示例修改<code>role_01</code>策略的时长为<code>2h</code>，如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">role_01 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 执行修改时长为2小时</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; ALTER RETENTION POLICY &quot;role_01&quot; ON &quot;telegraf&quot; DURATION 2h</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 可以看到role_01的duration为2h</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">role_01 2h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">role_01 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 执行修改时长为2小时</span></span>
<span class="line"><span style="color:#24292e;">&gt; ALTER RETENTION POLICY &quot;role_01&quot; ON &quot;telegraf&quot; DURATION 2h</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 可以看到role_01的duration为2h</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">role_01 2h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><h3 id="_2-4-删除数据保留策略" tabindex="-1">2.4 删除数据保留策略 <a class="header-anchor" href="#_2-4-删除数据保留策略" aria-label="Permalink to &quot;2.4 删除数据保留策略&quot;">​</a></h3><ul><li>语法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DROP RETENTION POLICY &lt;retention_policy_name&gt; ON &lt;database_name&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DROP RETENTION POLICY &lt;retention_policy_name&gt; ON &lt;database_name&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">drop retention POLICY &quot;策略名&quot; ON &quot;数据库名&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">drop retention POLICY &quot;策略名&quot; ON &quot;数据库名&quot;</span></span></code></pre></div><ul><li>删除<code>role_01</code>策略，如下：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看当前的数据保留策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">role_01 2h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除role_01的策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; drop retention POLICY &quot;role_01&quot; ON &quot;telegraf&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看删除后的策略，可以看到剩余的策略autogen并不会自动设置为默认default策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改autogen策略为default策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; ALTER RETENTION POLICY &quot;autogen&quot; ON &quot;telegraf&quot;  DEFAULT</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看当前的数据保留策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">role_01 2h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 删除role_01的策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; drop retention POLICY &quot;role_01&quot; ON &quot;telegraf&quot;</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 查看删除后的策略，可以看到剩余的策略autogen并不会自动设置为默认default策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 修改autogen策略为default策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; ALTER RETENTION POLICY &quot;autogen&quot; ON &quot;telegraf&quot;  DEFAULT</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name    duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s       168h0m0s           1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><h2 id="_3-验证变更策略之后-存储数据是否会变少" tabindex="-1">3. 验证变更策略之后，存储数据是否会变少 <a class="header-anchor" href="#_3-验证变更策略之后-存储数据是否会变少" aria-label="Permalink to &quot;3. 验证变更策略之后，存储数据是否会变少&quot;">​</a></h2><p>默认的telegraf数据库的存储策略是一直保存数据，并无限制。那么为了节省数据存储，我下面创建一个保留1小时的策略，然后删除默认的策略，观察存储数据是否变少</p><h3 id="_3-1-变更策略之前的数据存储大小" tabindex="-1">3.1 变更策略之前的数据存储大小 <a class="header-anchor" href="#_3-1-变更策略之前的数据存储大小" aria-label="Permalink to &quot;3.1 变更策略之前的数据存储大小&quot;">​</a></h3><p>在变更策略之前，我特意运行了采集数据服务几天，查看目前的存储数据大小如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@server influxdb]# du -h --max-depth=1 .</span></span>
<span class="line"><span style="color:#e1e4e8;">69M ./data</span></span>
<span class="line"><span style="color:#e1e4e8;">69M .</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@server influxdb]#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@server influxdb]# du -h --max-depth=1 .</span></span>
<span class="line"><span style="color:#24292e;">69M ./data</span></span>
<span class="line"><span style="color:#24292e;">69M .</span></span>
<span class="line"><span style="color:#24292e;">[root@server influxdb]#</span></span></code></pre></div><h3 id="_3-2-创建新策略-删除旧策略" tabindex="-1">3.2 创建新策略，删除旧策略 <a class="header-anchor" href="#_3-2-创建新策略-删除旧策略" aria-label="Permalink to &quot;3.2 创建新策略，删除旧策略&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建新策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; CREATE RETENTION POLICY &quot;rule_telegraf&quot; ON telegraf DURATION 1h REPLICATION 1 DEFAULT;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name          duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----          -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen       0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">rule_telegraf 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除历史策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; drop retention POLICY &quot;autogen&quot; ON &quot;telegraf&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看当前的数据策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#e1e4e8;">name          duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----          -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">rule_telegraf 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建新策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; CREATE RETENTION POLICY &quot;rule_telegraf&quot; ON telegraf DURATION 1h REPLICATION 1 DEFAULT;</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name          duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----          -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen       0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">rule_telegraf 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 删除历史策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; drop retention POLICY &quot;autogen&quot; ON &quot;telegraf&quot;;</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;"># 查看当前的数据策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on telegraf</span></span>
<span class="line"><span style="color:#24292e;">name          duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----          -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">rule_telegraf 1h0m0s   1h0m0s             1        true</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><h3 id="_3-3-删除旧策略之后-确认数据存储大小" tabindex="-1">3.3 删除旧策略之后，确认数据存储大小 <a class="header-anchor" href="#_3-3-删除旧策略之后-确认数据存储大小" aria-label="Permalink to &quot;3.3 删除旧策略之后，确认数据存储大小&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 删除旧策略之前，数据有69M</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@server influxdb]# du -h --max-depth=1 .</span></span>
<span class="line"><span style="color:#e1e4e8;">69M ./data</span></span>
<span class="line"><span style="color:#e1e4e8;">69M .</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@server influxdb]# </span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除旧策略之后，数据只保留15M</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@server influxdb]# du -h --max-depth=1 .</span></span>
<span class="line"><span style="color:#e1e4e8;">15M ./data</span></span>
<span class="line"><span style="color:#e1e4e8;">15M .</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@server influxdb]#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 删除旧策略之前，数据有69M</span></span>
<span class="line"><span style="color:#24292e;">[root@server influxdb]# du -h --max-depth=1 .</span></span>
<span class="line"><span style="color:#24292e;">69M ./data</span></span>
<span class="line"><span style="color:#24292e;">69M .</span></span>
<span class="line"><span style="color:#24292e;">[root@server influxdb]# </span></span>
<span class="line"><span style="color:#24292e;"># 删除旧策略之后，数据只保留15M</span></span>
<span class="line"><span style="color:#24292e;">[root@server influxdb]# du -h --max-depth=1 .</span></span>
<span class="line"><span style="color:#24292e;">15M ./data</span></span>
<span class="line"><span style="color:#24292e;">15M .</span></span>
<span class="line"><span style="color:#24292e;">[root@server influxdb]#</span></span></code></pre></div><p>注意，这个会把所有的删除</p><h2 id="_4-三者关系" tabindex="-1">4.三者关系 <a class="header-anchor" href="#_4-三者关系" aria-label="Permalink to &quot;4.三者关系&quot;">​</a></h2><h3 id="_4-1-retention-policy-rp" tabindex="-1">4.1 retention policy(RP) <a class="header-anchor" href="#_4-1-retention-policy-rp" aria-label="Permalink to &quot;4.1 retention policy(RP)&quot;">​</a></h3><p>数据保留策略提供了一个简单高效的方法用来清除InfluxDB数据库中的过期数据，一旦数据超过过期时间，数据会自动从InfluxDB中清除，而过期数据清除的时间单位以shard group的duration为单位</p><h3 id="_4-2shard" tabindex="-1">4.2shard <a class="header-anchor" href="#_4-2shard" aria-label="Permalink to &quot;4.2shard&quot;">​</a></h3><p>shard是InfluxDB存储引擎的实现，负责数据的编码存储、读写服务等。将InfluxDB中时间序列化的数据按照时间的先后顺序存入到shard中，每个shard中都负责InfluxDB中一部分的数据存储工作，并以tsm文件的表现形式存储在物理磁盘上，每个存放了数据的shard都属于一个shard group</p><h3 id="_4-3shard-group" tabindex="-1">4.3shard group <a class="header-anchor" href="#_4-3shard-group" aria-label="Permalink to &quot;4.3shard group&quot;">​</a></h3><p>shard group可以理解为存放shard的容器，所有的shard在逻辑上都属于这个shard group，每个shard group中的shard都有一个对应的时间跨度和过期时间，每一个shard group都有一个默认的时间跨度，叫做shard group duration</p><table><thead><tr><th>Retention Policy’s DURATION</th><th>Shard Group Duration</th></tr></thead><tbody><tr><td>&lt; 2 days</td><td>1 hour</td></tr><tr><td>&gt;= 2 days and &lt;= 6 months</td><td>1 day</td></tr><tr><td>&gt; 6 months</td><td>7 days</td></tr></tbody></table><ul><li>官方推荐</li></ul><p>InfluxDB默认设置的shard duration在大多数场景都工作的很好，但对于高吞吐量、长时间运行的InfluxDB实例来说，较长的shard group duration更加适合。所以对于需要较长的shard group duration的场景，官方推荐如下</p><table><thead><tr><th>Retention Policy’s DURATION</th><th>Shard Group Duration</th></tr></thead><tbody><tr><td>&lt; = 1 天</td><td>6小时</td></tr><tr><td>&gt; 1 天 and &lt;= 7天</td><td>1 day</td></tr><tr><td>&gt; 7天 and &lt;= 3个月</td><td>7 days</td></tr><tr><td>&gt; 3个月</td><td>30 days</td></tr><tr><td>= 永久</td><td>52 w或更长</td></tr></tbody></table><h3 id="_4-4三者之间的关系" tabindex="-1">4.4三者之间的关系 <a class="header-anchor" href="#_4-4三者之间的关系" aria-label="Permalink to &quot;4.4三者之间的关系&quot;">​</a></h3><p>在一个RP中，如果指定的保留时间为24小时，那么每个shard的duration为1小时，即每个shard的时间跨度为1小时，那么总共会有24个跨度为1小时的shard，在触发数据的RP后，删除最早时间跨度的shard。</p><p>例如，我们在mydb数据库中指定保留策略为24小时</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; CREATE RETENTION POLICY &quot;role_01&quot; ON ProxyMarketOffer DURATION 180d REPLICATION 1 DEFAULT;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show retention policies on ProxyMarketOffer</span></span>
<span class="line"><span style="color:#e1e4e8;">name          duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----          -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen       0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;">keep_24_hours 24h0m0s  1h0m0s             1        true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; CREATE RETENTION POLICY &quot;role_01&quot; ON ProxyMarketOffer DURATION 180d REPLICATION 1 DEFAULT;</span></span>
<span class="line"><span style="color:#24292e;">&gt; show retention policies on ProxyMarketOffer</span></span>
<span class="line"><span style="color:#24292e;">name          duration shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----          -------- ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen       0s       168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;">keep_24_hours 24h0m0s  1h0m0s             1        true</span></span></code></pre></div><p>那么此时shard group中对应就会存在24个shard，每次到达过期时间时，删除最早的shard，并生成一个新的shard</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show shard groups</span></span>
<span class="line"><span style="color:#e1e4e8;">name: shard groups</span></span>
<span class="line"><span style="color:#e1e4e8;">id database  retention_policy start_time           end_time             expiry_time</span></span>
<span class="line"><span style="color:#e1e4e8;">-- --------  ---------------- -----&gt; show shard groups</span></span>
<span class="line"><span style="color:#e1e4e8;">name: shard groups</span></span>
<span class="line"><span style="color:#e1e4e8;">id database  retention_policy start_time           end_time             expiry_time</span></span>
<span class="line"><span style="color:#e1e4e8;">-- --------  ---------------- ----------           --------             -----------</span></span>
<span class="line"><span style="color:#e1e4e8;">1 mydb      keep_24_hours    2020-04-24T19:00:00Z 2020-04-24T20:00:00Z 2020-04-25T20:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">2 mydb      keep_24_hours    2020-04-24T20:00:00Z 2020-04-24T21:00:00Z 2020-04-25T21:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">3 mydb      keep_24_hours    2020-04-24T21:00:00Z 2020-04-24T22:00:00Z 2020-04-25T22:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">4 mydb      keep_24_hours    2020-04-24T22:00:00Z 2020-04-24T23:00:00Z 2020-04-25T23:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">5 mydb      keep_24_hours    2020-04-24T23:00:00Z 2020-04-25T00:00:00Z 2020-04-26T00:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">6 mydb      keep_24_hours    2020-04-25T00:00:00Z 2020-04-25T01:00:00Z 2020-04-26T01:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">7 mydb      keep_24_hours    2020-04-25T01:00:00Z 2020-04-25T02:00:00Z 2020-04-26T02:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">8 mydb      keep_24_hours    2020-04-25T02:00:00Z 2020-04-25T03:00:00Z 2020-04-26T03:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">9 mydb      keep_24_hours    2020-04-25T03:00:00Z 2020-04-25T04:00:00Z 2020-04-26T04:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">10 mydb      keep_24_hours    2020-04-25T04:00:00Z 2020-04-25T05:00:00Z 2020-04-26T05:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">11 mydb      keep_24_hours    2020-04-25T05:00:00Z 2020-04-25T06:00:00Z 2020-04-26T06:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">12 mydb      keep_24_hours    2020-04-25T06:00:00Z 2020-04-25T07:00:00Z 2020-04-26T07:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">13 mydb      keep_24_hours    2020-04-25T07:00:00Z 2020-04-25T08:00:00Z 2020-04-26T08:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">14 mydb      keep_24_hours    2020-04-25T08:00:00Z 2020-04-25T09:00:00Z 2020-04-26T09:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">15 mydb      keep_24_hours    2020-04-25T09:00:00Z 2020-04-25T10:00:00Z 2020-04-26T10:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">16 mydb      keep_24_hours    2020-04-25T10:00:00Z 2020-04-25T11:00:00Z 2020-04-26T11:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">17 mydb      keep_24_hours    2020-04-25T11:00:00Z 2020-04-25T12:00:00Z 2020-04-26T12:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">18 mydb      keep_24_hours    2020-04-25T12:00:00Z 2020-04-25T13:00:00Z 2020-04-26T13:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">29 mydb      keep_24_hours    2020-04-25T13:00:00Z 2020-04-25T14:00:00Z 2020-04-26T14:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">20 mydb      keep_24_hours    2020-04-25T14:00:00Z 2020-04-25T15:00:00Z 2020-04-26T15:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">21 mydb      keep_24_hours    2020-04-25T15:00:00Z 2020-04-25T16:00:00Z 2020-04-26T16:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">22 mydb      keep_24_hours    2020-04-25T16:00:00Z 2020-04-25T17:00:00Z 2020-04-26T17:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">23 mydb      keep_24_hours    2020-04-25T17:00:00Z 2020-04-25T18:00:00Z 2020-04-26T17:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">24 mydb      keep_24_hours    2020-04-25T18:00:00Z 2020-04-25T19:00:00Z 2020-04-26T17:00:00Z</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show shard groups</span></span>
<span class="line"><span style="color:#24292e;">name: shard groups</span></span>
<span class="line"><span style="color:#24292e;">id database  retention_policy start_time           end_time             expiry_time</span></span>
<span class="line"><span style="color:#24292e;">-- --------  ---------------- -----&gt; show shard groups</span></span>
<span class="line"><span style="color:#24292e;">name: shard groups</span></span>
<span class="line"><span style="color:#24292e;">id database  retention_policy start_time           end_time             expiry_time</span></span>
<span class="line"><span style="color:#24292e;">-- --------  ---------------- ----------           --------             -----------</span></span>
<span class="line"><span style="color:#24292e;">1 mydb      keep_24_hours    2020-04-24T19:00:00Z 2020-04-24T20:00:00Z 2020-04-25T20:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">2 mydb      keep_24_hours    2020-04-24T20:00:00Z 2020-04-24T21:00:00Z 2020-04-25T21:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">3 mydb      keep_24_hours    2020-04-24T21:00:00Z 2020-04-24T22:00:00Z 2020-04-25T22:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">4 mydb      keep_24_hours    2020-04-24T22:00:00Z 2020-04-24T23:00:00Z 2020-04-25T23:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">5 mydb      keep_24_hours    2020-04-24T23:00:00Z 2020-04-25T00:00:00Z 2020-04-26T00:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">6 mydb      keep_24_hours    2020-04-25T00:00:00Z 2020-04-25T01:00:00Z 2020-04-26T01:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">7 mydb      keep_24_hours    2020-04-25T01:00:00Z 2020-04-25T02:00:00Z 2020-04-26T02:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">8 mydb      keep_24_hours    2020-04-25T02:00:00Z 2020-04-25T03:00:00Z 2020-04-26T03:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">9 mydb      keep_24_hours    2020-04-25T03:00:00Z 2020-04-25T04:00:00Z 2020-04-26T04:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">10 mydb      keep_24_hours    2020-04-25T04:00:00Z 2020-04-25T05:00:00Z 2020-04-26T05:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">11 mydb      keep_24_hours    2020-04-25T05:00:00Z 2020-04-25T06:00:00Z 2020-04-26T06:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">12 mydb      keep_24_hours    2020-04-25T06:00:00Z 2020-04-25T07:00:00Z 2020-04-26T07:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">13 mydb      keep_24_hours    2020-04-25T07:00:00Z 2020-04-25T08:00:00Z 2020-04-26T08:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">14 mydb      keep_24_hours    2020-04-25T08:00:00Z 2020-04-25T09:00:00Z 2020-04-26T09:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">15 mydb      keep_24_hours    2020-04-25T09:00:00Z 2020-04-25T10:00:00Z 2020-04-26T10:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">16 mydb      keep_24_hours    2020-04-25T10:00:00Z 2020-04-25T11:00:00Z 2020-04-26T11:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">17 mydb      keep_24_hours    2020-04-25T11:00:00Z 2020-04-25T12:00:00Z 2020-04-26T12:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">18 mydb      keep_24_hours    2020-04-25T12:00:00Z 2020-04-25T13:00:00Z 2020-04-26T13:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">29 mydb      keep_24_hours    2020-04-25T13:00:00Z 2020-04-25T14:00:00Z 2020-04-26T14:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">20 mydb      keep_24_hours    2020-04-25T14:00:00Z 2020-04-25T15:00:00Z 2020-04-26T15:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">21 mydb      keep_24_hours    2020-04-25T15:00:00Z 2020-04-25T16:00:00Z 2020-04-26T16:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">22 mydb      keep_24_hours    2020-04-25T16:00:00Z 2020-04-25T17:00:00Z 2020-04-26T17:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">23 mydb      keep_24_hours    2020-04-25T17:00:00Z 2020-04-25T18:00:00Z 2020-04-26T17:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">24 mydb      keep_24_hours    2020-04-25T18:00:00Z 2020-04-25T19:00:00Z 2020-04-26T17:00:00Z</span></span></code></pre></div><p><a href="https://blog.csdn.net/weixin_36586120/category_10514352.html" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_36586120/category_10514352.html</a></p><p><a href="https://stefan.blog.csdn.net/article/details/109439800" target="_blank" rel="noreferrer">https://stefan.blog.csdn.net/article/details/109439800</a></p><p><a href="https://blog.csdn.net/suzy1030/article/details/81459029?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165132454816781432975844%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&amp;request_id=165132454816781432975844&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-23-81459029.142%5Ev9%5Epc_search_result_cache,157%5Ev4%5Enew_style&amp;utm_term=InfluxDB+DTDB+%E5%AF%B9%E6%AF%94&amp;spm=1018.2226.3001.4187" target="_blank" rel="noreferrer">https://blog.csdn.net/suzy1030/article/details/81459029?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165132454816781432975844%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&amp;request_id=165132454816781432975844&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-23-81459029.142^v9^pc_search_result_cache,157^v4^new_style&amp;utm_term=InfluxDB+DTDB+对比&amp;spm=1018.2226.3001.4187</a></p>`,67),o=[p];function t(r,c,i,d,u,h){return a(),e("div",null,o)}const _=s(l,[["render",t]]);export{g as __pageData,_ as default};
