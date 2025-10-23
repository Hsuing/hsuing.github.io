import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"一、备份","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/1-back.md","filePath":"guide/Database/influxdb/1-back.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/1-back.md"},p=e(`<h1 id="一、备份" tabindex="-1">一、备份 <a class="header-anchor" href="#一、备份" aria-label="Permalink to &quot;一、备份&quot;">​</a></h1><h2 id="_1-1-完整备份" tabindex="-1">1.1 完整备份 <a class="header-anchor" href="#_1-1-完整备份" aria-label="Permalink to &quot;1.1 完整备份&quot;">​</a></h2><ul><li>适用于1.6-1.7版本</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">参数：</span></span>
<span class="line"><span style="color:#e1e4e8;">influxd backup</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -database &lt;db_name&gt; ]  --&gt; 指定需要备份的数据库名</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -portable ]            --&gt; 表示在线备份</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -host &lt;host:port&gt; ]    --&gt; influxdb服务所在的机器，端口号默认为8088</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -retention &lt;rp_name&gt; ] | [ -shard &lt;shard_ID&gt; -retention &lt;rp_name&gt; ]  --&gt; 备份的保留策略，注意shard是挂在rp下的；我们需要备份的就是shard中的数据</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -start &lt;timestamp&gt; [ -end &lt;timestamp&gt; ] | -since &lt;timestamp&gt; ]   --&gt; 备份指定时间段的数据</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;path-to-backup&gt;   --&gt; 备份文件的输出地址</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@a1229df1ff1e:/# influx</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.7.8</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.7.8</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: databases</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; create database hello;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: databases</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">hello</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@a1229df1ff1e:~# influxd backup -portable /root/hello</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">.。。。</span></span>
<span class="line"><span style="color:#e1e4e8;">2019/09/13 08:05:32 	/root/hello/20190913T080532Z.meta</span></span>
<span class="line"><span style="color:#e1e4e8;">2019/09/13 08:05:32 	/root/hello/20190913T080532Z.s1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">2019/09/13 08:05:32 	/root/hello/20190913T080532Z.manifest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">参数：</span></span>
<span class="line"><span style="color:#24292e;">influxd backup</span></span>
<span class="line"><span style="color:#24292e;">    [ -database &lt;db_name&gt; ]  --&gt; 指定需要备份的数据库名</span></span>
<span class="line"><span style="color:#24292e;">    [ -portable ]            --&gt; 表示在线备份</span></span>
<span class="line"><span style="color:#24292e;">    [ -host &lt;host:port&gt; ]    --&gt; influxdb服务所在的机器，端口号默认为8088</span></span>
<span class="line"><span style="color:#24292e;">    [ -retention &lt;rp_name&gt; ] | [ -shard &lt;shard_ID&gt; -retention &lt;rp_name&gt; ]  --&gt; 备份的保留策略，注意shard是挂在rp下的；我们需要备份的就是shard中的数据</span></span>
<span class="line"><span style="color:#24292e;">    [ -start &lt;timestamp&gt; [ -end &lt;timestamp&gt; ] | -since &lt;timestamp&gt; ]   --&gt; 备份指定时间段的数据</span></span>
<span class="line"><span style="color:#24292e;">    &lt;path-to-backup&gt;   --&gt; 备份文件的输出地址</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@a1229df1ff1e:/# influx</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.7.8</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.7.8</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">name: databases</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">_internal</span></span>
<span class="line"><span style="color:#24292e;">&gt; create database hello;</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">name: databases</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">_internal</span></span>
<span class="line"><span style="color:#24292e;">hello</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@a1229df1ff1e:~# influxd backup -portable /root/hello</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">.。。。</span></span>
<span class="line"><span style="color:#24292e;">2019/09/13 08:05:32 	/root/hello/20190913T080532Z.meta</span></span>
<span class="line"><span style="color:#24292e;">2019/09/13 08:05:32 	/root/hello/20190913T080532Z.s1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">2019/09/13 08:05:32 	/root/hello/20190913T080532Z.manifest</span></span></code></pre></div><h2 id="_1-2指定数据库备份" tabindex="-1">1.2指定数据库备份 <a class="header-anchor" href="#_1-2指定数据库备份" aria-label="Permalink to &quot;1.2指定数据库备份&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#backup 指定数据库备份</span></span>
<span class="line"><span style="color:#e1e4e8;">root@a1229df1ff1e:~#influxd backup -portable -database db_name /path/db_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#backup 指定数据库备份</span></span>
<span class="line"><span style="color:#24292e;">root@a1229df1ff1e:~#influxd backup -portable -database db_name /path/db_name</span></span></code></pre></div><h2 id="_1-3备份所有" tabindex="-1">1.3备份所有 <a class="header-anchor" href="#_1-3备份所有" aria-label="Permalink to &quot;1.3备份所有&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">influxd backup -portable /path</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">influxd backup -portable /path</span></span></code></pre></div><h2 id="_1-4时间段数据" tabindex="-1">1.4时间段数据 <a class="header-anchor" href="#_1-4时间段数据" aria-label="Permalink to &quot;1.4时间段数据&quot;">​</a></h2><p>只备份部分时间满足要求的数据，可以添加start/end参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># influxd backup -portable -database db_name -start 2018-07-27T2:31:57Z -end 2018-07-27T2:32:59Z  /path/db_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># influxd backup -portable -database db_name -start 2018-07-27T2:31:57Z -end 2018-07-27T2:32:59Z  /path/db_name</span></span></code></pre></div><h2 id="_1-4备份远程主机数据库" tabindex="-1">1.4备份远程主机数据库 <a class="header-anchor" href="#_1-4备份远程主机数据库" aria-label="Permalink to &quot;1.4备份远程主机数据库&quot;">​</a></h2><p>备份远程端口是8088</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pg02 ~]# influxd backup -portable -database test -host 127.0.0.1:8088 ./test</span></span>
<span class="line"><span style="color:#e1e4e8;">2020/11/19 03:25:51 backing up metastore to test/meta.00</span></span>
<span class="line"><span style="color:#e1e4e8;">2020/11/19 03:25:51 backing up db=test</span></span>
<span class="line"><span style="color:#e1e4e8;">2020/11/19 03:25:51 backing up db=test rp=autogen shard=2 to test/test.autogen.00002.00 since 0001-01-01T00:00:00Z</span></span>
<span class="line"><span style="color:#e1e4e8;">2020/11/19 03:25:51 backup complete:</span></span>
<span class="line"><span style="color:#e1e4e8;">2020/11/19 03:25:51 	test/20201119T082551Z.meta</span></span>
<span class="line"><span style="color:#e1e4e8;">2020/11/19 03:25:51 	test/20201119T082551Z.s2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">2020/11/19 03:25:51 	test/20201119T082551Z.manifest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pg02 ~]# influxd backup -portable -database test -host 127.0.0.1:8088 ./test</span></span>
<span class="line"><span style="color:#24292e;">2020/11/19 03:25:51 backing up metastore to test/meta.00</span></span>
<span class="line"><span style="color:#24292e;">2020/11/19 03:25:51 backing up db=test</span></span>
<span class="line"><span style="color:#24292e;">2020/11/19 03:25:51 backing up db=test rp=autogen shard=2 to test/test.autogen.00002.00 since 0001-01-01T00:00:00Z</span></span>
<span class="line"><span style="color:#24292e;">2020/11/19 03:25:51 backup complete:</span></span>
<span class="line"><span style="color:#24292e;">2020/11/19 03:25:51 	test/20201119T082551Z.meta</span></span>
<span class="line"><span style="color:#24292e;">2020/11/19 03:25:51 	test/20201119T082551Z.s2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">2020/11/19 03:25:51 	test/20201119T082551Z.manifest</span></span></code></pre></div><h1 id="二、恢复" tabindex="-1">二、恢复 <a class="header-anchor" href="#二、恢复" aria-label="Permalink to &quot;二、恢复&quot;">​</a></h1><h2 id="_2-2恢复指定数据库" tabindex="-1">2.2恢复指定数据库 <a class="header-anchor" href="#_2-2恢复指定数据库" aria-label="Permalink to &quot;2.2恢复指定数据库&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">influxd restore </span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -db &lt;db_name&gt; ]       --&gt; 待恢复的数据库(备份中的数据库名)</span></span>
<span class="line"><span style="color:#e1e4e8;">    -portable | -online</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -host &lt;host:port&gt; ]    --&gt; influxdb 的服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -newdb &lt;newdb_name&gt; ]  --&gt; 恢复到influxdb中的数据库名</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -rp &lt;rp_name&gt; ]        --&gt; 备份中的保留策略</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -newrp &lt;newrp_name&gt; ]  --&gt; 恢复的保留策略</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ -shard &lt;shard_ID&gt; ]</span></span>
<span class="line"><span style="color:#e1e4e8;">    &lt;path-to-backup-files&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#restore,前提这个数据库不存在</span></span>
<span class="line"><span style="color:#e1e4e8;">root@a1229df1ff1e:~#influxd restore -portable -db db_name -newdb new_db_name /path/db_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">influxd restore </span></span>
<span class="line"><span style="color:#24292e;">    [ -db &lt;db_name&gt; ]       --&gt; 待恢复的数据库(备份中的数据库名)</span></span>
<span class="line"><span style="color:#24292e;">    -portable | -online</span></span>
<span class="line"><span style="color:#24292e;">    [ -host &lt;host:port&gt; ]    --&gt; influxdb 的服务器</span></span>
<span class="line"><span style="color:#24292e;">    [ -newdb &lt;newdb_name&gt; ]  --&gt; 恢复到influxdb中的数据库名</span></span>
<span class="line"><span style="color:#24292e;">    [ -rp &lt;rp_name&gt; ]        --&gt; 备份中的保留策略</span></span>
<span class="line"><span style="color:#24292e;">    [ -newrp &lt;newrp_name&gt; ]  --&gt; 恢复的保留策略</span></span>
<span class="line"><span style="color:#24292e;">    [ -shard &lt;shard_ID&gt; ]</span></span>
<span class="line"><span style="color:#24292e;">    &lt;path-to-backup-files&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#restore,前提这个数据库不存在</span></span>
<span class="line"><span style="color:#24292e;">root@a1229df1ff1e:~#influxd restore -portable -db db_name -newdb new_db_name /path/db_name</span></span></code></pre></div><h2 id="_2-3恢复到存在的db" tabindex="-1">2.3恢复到存在的DB <a class="header-anchor" href="#_2-3恢复到存在的db" aria-label="Permalink to &quot;2.3恢复到存在的DB&quot;">​</a></h2><p>看官网恢复的文档中，如果想将备份恢复到一个已经存在的database中时，并不是上面那么简单的就可以了，这里采用的一个策略是西安备份到一个临时的db中；然后将临时DB中的数据写入已存在的db中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT * INTO &quot;db_name&quot;.&quot;autogen&quot;.&quot;db_name_table&quot; FROM &quot;back_db_name_table&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db_name:需要恢复的数据库名</span></span>
<span class="line"><span style="color:#e1e4e8;">db_name_table:需要恢复的数据库表名字</span></span>
<span class="line"><span style="color:#e1e4e8;">back_db_name_table:备份数据库表名字</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 首先是将备份恢复到一个不存在的数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">root@a1229df1ff1e:~#influxd restore -portable -db db_name -newdb new_db_name /path/db_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT * INTO &quot;db_name&quot;.&quot;autogen&quot;.&quot;db_name_table&quot; FROM &quot;back_db_name_table&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db_name:需要恢复的数据库名</span></span>
<span class="line"><span style="color:#24292e;">db_name_table:需要恢复的数据库表名字</span></span>
<span class="line"><span style="color:#24292e;">back_db_name_table:备份数据库表名字</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 首先是将备份恢复到一个不存在的数据库</span></span>
<span class="line"><span style="color:#24292e;">root@a1229df1ff1e:~#influxd restore -portable -db db_name -newdb new_db_name /path/db_name</span></span></code></pre></div><p>将备份恢复到已经存在的数据库 yhhblogNew 中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 首先是将备份恢复到一个不存在的数据库 yhhblog_bk 中</span></span>
<span class="line"><span style="color:#e1e4e8;">influxd restore -portable -db yhhblog -newdb yhhblog_bk yhhblog_per</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 首先是将备份恢复到一个不存在的数据库 yhhblog_bk 中</span></span>
<span class="line"><span style="color:#24292e;">influxd restore -portable -db yhhblog -newdb yhhblog_bk yhhblog_per</span></span></code></pre></div><p>进入 influx 控制台，执行拷贝和删除临时数据库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 准备 yhhblogNew 数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; create database yhhblogNew</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 将临时数据库中的数据导入已存在的数据库中</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use yhhblog_bk</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; SELECT * INTO yhhblogNew..:MEASUREMENT FROM /.*/ GROUP BY *</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; drop yhhblog_bk</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 准备 yhhblogNew 数据库</span></span>
<span class="line"><span style="color:#24292e;">&gt; create database yhhblogNew</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 将临时数据库中的数据导入已存在的数据库中</span></span>
<span class="line"><span style="color:#24292e;">&gt; use yhhblog_bk</span></span>
<span class="line"><span style="color:#24292e;">&gt; SELECT * INTO yhhblogNew..:MEASUREMENT FROM /.*/ GROUP BY *</span></span>
<span class="line"><span style="color:#24292e;">&gt; drop yhhblog_bk</span></span></code></pre></div><h2 id="_2-4保留策略已存在时-恢复" tabindex="-1">2.4保留策略已存在时，恢复 <a class="header-anchor" href="#_2-4保留策略已存在时-恢复" aria-label="Permalink to &quot;2.4保留策略已存在时，恢复&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">influxd restore -portable -db yhhblog -newdb yhhblog_tmp -rp autogen -newrp autogen_tmp  yhhblog</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">influxd restore -portable -db yhhblog -newdb yhhblog_tmp -rp autogen -newrp autogen_tmp  yhhblog</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; user yhhblog_tmp</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; SELECT * INTO yhhblogNew.autogen.:MEASUREMENT FROM /yhhblog_tmp.autogen_tmp.*/ GROUP BY *</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; drop database yhhblog_tmp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; user yhhblog_tmp</span></span>
<span class="line"><span style="color:#24292e;">&gt; SELECT * INTO yhhblogNew.autogen.:MEASUREMENT FROM /yhhblog_tmp.autogen_tmp.*/ GROUP BY *</span></span>
<span class="line"><span style="color:#24292e;">&gt; drop database yhhblog_tmp</span></span></code></pre></div><h2 id="_1-4容灾策略" tabindex="-1">1.4容灾策略 <a class="header-anchor" href="#_1-4容灾策略" aria-label="Permalink to &quot;1.4容灾策略&quot;">​</a></h2><p><strong>数据备份、恢复，如果不能热备至少要有办法做到冷备</strong></p><p>提供tsm文件进行数据持久化，针对这部分数据可完成冷备。</p><p>数据写到influxdb时，首先是写入cache和wal文件，默认10分钟||25M 后写入tsm文件。服务重启时，不会立即将wal加载到tsm文件，先加载wal到cache，再从cache写入tsm文件，也遵循写入设定（默认10分钟||25M）</p>`,31),t=[p];function o(c,r,i,d,b,h){return a(),n("div",null,t)}const u=s(l,[["render",o]]);export{y as __pageData,u as default};
