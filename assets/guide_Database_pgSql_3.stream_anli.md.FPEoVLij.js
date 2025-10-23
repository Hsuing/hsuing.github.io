import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"模拟过程","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/3.stream_anli.md","filePath":"guide/Database/pgSql/3.stream_anli.md","lastUpdated":1703063387000}'),p={name:"guide/Database/pgSql/3.stream_anli.md"},l=n(`<p>PostgreSQL：FATAL: requested WAL segment 0000000800002A0000000000 has already been removed</p><p>流复制环境，备库可以停，停机检测大概花了 2 小时左右，之后再次启动备库时，报了如下错误</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">2013-07-01 13:25:29.430 CST,,,27738,,51d112c8.6c5a,1,,2013-07-01 13:25:28 CST,,0,LOG,00000,&quot;streaming replication successfully connected to primary&quot;,,,,,,,,&quot;libpqrcv_connect, libpqwalreceiver.c:171&quot;,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2013-07-01 13:25:29.430 CST,,,27738,,51d112c8.6c5a,2,,2013-07-01 13:25:28 CST,,0,FATAL,XX000,&quot;could not receive data from WAL stream: FATAL:  requested WAL segment 0000000800002A0000000000 has already been removed</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;,,,,,,,,&quot;libpqrcv_receive, libpqwalreceiver.c:389&quot;,&quot;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">2013-07-01 13:25:29.430 CST,,,27738,,51d112c8.6c5a,1,,2013-07-01 13:25:28 CST,,0,LOG,00000,&quot;streaming replication successfully connected to primary&quot;,,,,,,,,&quot;libpqrcv_connect, libpqwalreceiver.c:171&quot;,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2013-07-01 13:25:29.430 CST,,,27738,,51d112c8.6c5a,2,,2013-07-01 13:25:28 CST,,0,FATAL,XX000,&quot;could not receive data from WAL stream: FATAL:  requested WAL segment 0000000800002A0000000000 has already been removed</span></span>
<span class="line"><span style="color:#24292e;">&quot;,,,,,,,,&quot;libpqrcv_receive, libpqwalreceiver.c:389&quot;,&quot;&quot;</span></span></code></pre></div><p>备注：根据报错信息，很容易知道是由于停机时间的过程中备库所需的 WAL 已经被主库循环使用覆盖了，而在备库停机维护过程中，主库并未打开归档，这时这个备库需要重做了。也许有人会问，为何不一直打开主库的归档，我想说的是，这个库在 TB 级而且比较繁忙，忙的时候一天的归档 600 GB左右，这么大的归档需要大量的存储。但是在备库停机维护过程中，建议主库打开归档，只要不把归档目录撑满，那么在备库重新恢复后，有了主库的归档，那么备库依然能够跟上主库，为了加深理解，下面模拟这个错误，并演示规避方法：</p><p>stream 省略</p><h1 id="模拟过程" tabindex="-1">模拟过程 <a class="header-anchor" href="#模拟过程" aria-label="Permalink to &quot;模拟过程&quot;">​</a></h1><p>2.1 设置主库 postgresql.conf</p><p>为了容易出演示效果，设置以下参数，其它参数根据需求设置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">checkpoint_segments = 3</span></span>
<span class="line"><span style="color:#e1e4e8;">archive_mode = on</span></span>
<span class="line"><span style="color:#e1e4e8;">archive_command = &#39;cp %p /archive/pg93/%f&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders = 3</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments = 3 </span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders = 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">checkpoint_segments = 3</span></span>
<span class="line"><span style="color:#24292e;">archive_mode = on</span></span>
<span class="line"><span style="color:#24292e;">archive_command = &#39;cp %p /archive/pg93/%f&#39;</span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders = 3</span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments = 3 </span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders = 3</span></span></code></pre></div><p>备注：归档目录 /archive/pg93/ 需要创建好并赋相应权限</p><p>2.2 重载配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhatB pg_root]$ pg_ctl reload -D $PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;">server signaled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhatB pg_root]$ pg_ctl reload -D $PGDATA</span></span>
<span class="line"><span style="color:#24292e;">server signaled</span></span></code></pre></div><p>2.3 测试前: 主库数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhatB ~]$ psql</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (9.3beta1)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select * from test_1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id |     create_time     </span></span>
<span class="line"><span style="color:#e1e4e8;">----+---------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">  1 | 2013-07-01 21:15:34</span></span>
<span class="line"><span style="color:#e1e4e8;">  2 | 2013-07-01 21:55:37</span></span>
<span class="line"><span style="color:#e1e4e8;">  3 | 2013-07-01 22:01:18</span></span>
<span class="line"><span style="color:#e1e4e8;">(3 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhatB ~]$ psql</span></span>
<span class="line"><span style="color:#24292e;">psql (9.3beta1)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select * from test_1;</span></span>
<span class="line"><span style="color:#24292e;"> id |     create_time     </span></span>
<span class="line"><span style="color:#24292e;">----+---------------------</span></span>
<span class="line"><span style="color:#24292e;">  1 | 2013-07-01 21:15:34</span></span>
<span class="line"><span style="color:#24292e;">  2 | 2013-07-01 21:55:37</span></span>
<span class="line"><span style="color:#24292e;">  3 | 2013-07-01 22:01:18</span></span>
<span class="line"><span style="color:#24292e;">(3 rows)</span></span></code></pre></div><p>2.4 测试前: 备库数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhat6 ~]$ psql</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (9.3beta1)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select * from test_1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id |     create_time     </span></span>
<span class="line"><span style="color:#e1e4e8;">----+---------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">  1 | 2013-07-01 21:15:34</span></span>
<span class="line"><span style="color:#e1e4e8;">  2 | 2013-07-01 21:55:37</span></span>
<span class="line"><span style="color:#e1e4e8;">  3 | 2013-07-01 22:01:18</span></span>
<span class="line"><span style="color:#e1e4e8;">(3 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhat6 ~]$ psql</span></span>
<span class="line"><span style="color:#24292e;">psql (9.3beta1)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select * from test_1;</span></span>
<span class="line"><span style="color:#24292e;"> id |     create_time     </span></span>
<span class="line"><span style="color:#24292e;">----+---------------------</span></span>
<span class="line"><span style="color:#24292e;">  1 | 2013-07-01 21:15:34</span></span>
<span class="line"><span style="color:#24292e;">  2 | 2013-07-01 21:55:37</span></span>
<span class="line"><span style="color:#24292e;">  3 | 2013-07-01 22:01:18</span></span>
<span class="line"><span style="color:#24292e;">(3 rows)</span></span></code></pre></div><p>2.5 停备库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhat6 ~]$ pg_ctl stop -m fast -D $PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;">waiting for server to shut down.... done</span></span>
<span class="line"><span style="color:#e1e4e8;">server stopped</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhat6 ~]$ pg_ctl stop -m fast -D $PGDATA</span></span>
<span class="line"><span style="color:#24292e;">waiting for server to shut down.... done</span></span>
<span class="line"><span style="color:#24292e;">server stopped</span></span></code></pre></div><p>2.6 在主库上执行以下操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# insert into test_1 values (5,now());</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 1</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_switch_xlog </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1/310000AC</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# insert into test_1 values (5,now());</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 1</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_switch_xlog </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1/320004D0</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# insert into test_1 values (5,now());</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 1</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_switch_xlog </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1/330000AC</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">.....</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# insert into test_1 values (5,now());</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 1</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#24292e;"> pg_switch_xlog </span></span>
<span class="line"><span style="color:#24292e;">----------------</span></span>
<span class="line"><span style="color:#24292e;"> 1/310000AC</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">postgres=# insert into test_1 values (5,now());</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 1</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#24292e;"> pg_switch_xlog </span></span>
<span class="line"><span style="color:#24292e;">----------------</span></span>
<span class="line"><span style="color:#24292e;"> 1/320004D0</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">postgres=# insert into test_1 values (5,now());</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 1</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#24292e;"> pg_switch_xlog </span></span>
<span class="line"><span style="color:#24292e;">----------------</span></span>
<span class="line"><span style="color:#24292e;"> 1/330000AC</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">.....</span></span></code></pre></div><p>2.7 查看归档目录</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhatB pg93]$ ll /archive/pg93/ | wc -l</span></span>
<span class="line"><span style="color:#e1e4e8;">36</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhatB pg93]$ ll /archive/pg93/ | wc -l</span></span>
<span class="line"><span style="color:#24292e;">36</span></span></code></pre></div><p>备注：这时归档目录就产生了一些归档的 WAL 日志</p><p>2.8 启动备库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhat6 ~]$ pg_ctl start -D $PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;">server starting</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhat6 ~]$ pg_ctl start -D $PGDATA</span></span>
<span class="line"><span style="color:#24292e;">server starting</span></span></code></pre></div><p>备注：数据库能启来，但查看日志，报以下错误：</p><p>2.9 csv 日志</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhat6 pg_log]$ tail -f postgresql-2013-07-02_062642.csv</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2013-07-02 06:27:17.672 CST,,,3704,,51d20245.e78,1,,2013-07-02 06:27:17 CST,,0,LOG,00000,&quot;started streaming WAL from primary at 1/22000000 on timeline 1&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2013-07-02 06:27:17.674 CST,,,3704,,51d20245.e78,2,,2013-07-02 06:27:17 CST,,0,FATAL,XX000,&quot;could not receive data from WAL stream: ERROR:  requested WAL segment 000000010000000100000022 has already been removed</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhat6 pg_log]$ tail -f postgresql-2013-07-02_062642.csv</span></span>
<span class="line"><span style="color:#24292e;">&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2013-07-02 06:27:17.672 CST,,,3704,,51d20245.e78,1,,2013-07-02 06:27:17 CST,,0,LOG,00000,&quot;started streaming WAL from primary at 1/22000000 on timeline 1&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2013-07-02 06:27:17.674 CST,,,3704,,51d20245.e78,2,,2013-07-02 06:27:17 CST,,0,FATAL,XX000,&quot;could not receive data from WAL stream: ERROR:  requested WAL segment 000000010000000100000022 has already been removed</span></span></code></pre></div><p>备注：目标的错误已重现，在主库的 $PGDATA/pg_xlog 目录里已找不到 000000010000000100000022 文件了,因为 XLOG 文件已被循环使用覆盖了，但在归档目录 /archive/pg93 里可以找到</p><p>2.10 复制主库归档目录的 WAL 到备节点</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhatB pg93]$ scp /archive/pg93/* pg93@192.168.1.35:/archive/pg93</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhatB pg93]$ scp /archive/pg93/* pg93@192.168.1.35:/archive/pg93</span></span></code></pre></div><p>备注：这时把主节点上归档目录的 WAL 文件复制到备节点的归档目录</p><p>2.11 修改备库 recovery.conf 文件的以下参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /archive/pg93/%f %p&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">restore_command = &#39;cp /archive/pg93/%f %p&#39;</span></span></code></pre></div><p>2.12 重启备库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhat6 pg_root]$ pg_ctl stop -m fast -D $PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;">waiting for server to shut down.... done</span></span>
<span class="line"><span style="color:#e1e4e8;">server stopped</span></span>
<span class="line"><span style="color:#e1e4e8;">[pg93@redhat6 pg_root]$ pg_ctl start -D $PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;">server starting</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhat6 pg_root]$ pg_ctl stop -m fast -D $PGDATA</span></span>
<span class="line"><span style="color:#24292e;">waiting for server to shut down.... done</span></span>
<span class="line"><span style="color:#24292e;">server stopped</span></span>
<span class="line"><span style="color:#24292e;">[pg93@redhat6 pg_root]$ pg_ctl start -D $PGDATA</span></span>
<span class="line"><span style="color:#24292e;">server starting</span></span></code></pre></div><p>2.13 查看备库日志</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pg93@redhat6 pg_log]$ tail -f postgresql-2013-07-02_063606.csv</span></span>
<span class="line"><span style="color:#e1e4e8;">2013-07-02 06:36:08.123 CST,,,4008,,51d20456.fa8,4,,2013-07-02 06:36:06 CST,1/0,0,LOG,00000,&quot;redo starts at 1/200002BC&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2013-07-02 06:36:08.592 CST,,,4008,,51d20456.fa8,5,,2013-07-02 06:36:06 CST,1/0,0,LOG,00000,&quot;restored log file &quot;&quot;000000010000000100000021&quot;&quot; from archive&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">省略部分内容</span></span>
<span class="line"><span style="color:#e1e4e8;">2013-07-02 06:36:47.400 CST,,,4059,,51d2047f.fdb,1,,2013-07-02 06:36:47 CST,,0,LOG,00000,&quot;started streaming WAL from primary at 1/43000000 on timeline 1&quot;,,,,,,,,,&quot;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pg93@redhat6 pg_log]$ tail -f postgresql-2013-07-02_063606.csv</span></span>
<span class="line"><span style="color:#24292e;">2013-07-02 06:36:08.123 CST,,,4008,,51d20456.fa8,4,,2013-07-02 06:36:06 CST,1/0,0,LOG,00000,&quot;redo starts at 1/200002BC&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2013-07-02 06:36:08.592 CST,,,4008,,51d20456.fa8,5,,2013-07-02 06:36:06 CST,1/0,0,LOG,00000,&quot;restored log file &quot;&quot;000000010000000100000021&quot;&quot; from archive&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">省略部分内容</span></span>
<span class="line"><span style="color:#24292e;">2013-07-02 06:36:47.400 CST,,,4059,,51d2047f.fdb,1,,2013-07-02 06:36:47 CST,,0,LOG,00000,&quot;started streaming WAL from primary at 1/43000000 on timeline 1&quot;,,,,,,,,,&quot;&quot;</span></span></code></pre></div><p>备注：此时备库从归档目录取到所需的 WAL 后开始拼命追主库，直到看到上面日志的最后一行信息时表示已完全追上主库</p><h1 id="验证" tabindex="-1">验证 <a class="header-anchor" href="#验证" aria-label="Permalink to &quot;验证&quot;">​</a></h1><p>3.1 主库</p><p>3.2 从库</p><p>对于比较繁忙的库，建议给 pg_xlog 分配较大的存储，从而能保留较多的 WAL 文件，在备节点停机维护后，能够获得更多的停库时间。</p><p>对于更繁忙的大数据库，例如 TB 级，如果没有足够的存储长期开启归档，那么至少在备节点需要停库维护时的这段时间把归档开启，否则当备库启来后追不上主库时，TB 级库重做 standby 的代价是可想而知</p><h1 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h1><ul><li><a href="https://www.postgresql.org/docs/9.3/static/archive-recovery-settings.html" target="_blank" rel="noreferrer">Archive Recovery Settings</a></li><li><a href="https://www.postgresql.org/docs/9.3/static/functions-admin.html" target="_blank" rel="noreferrer">System Administration Functions</a></li><li><a href="https://postgres.fun/20130702100240.html" target="_blank" rel="noreferrer">PostgreSQL：使用 pg_basebackup 搭建流复制环境</a></li><li><a href="https://postgres.fun/20110318141508.html" target="_blank" rel="noreferrer">How to estimate total number of WAL segments ?</a></li></ul>`,46),o=[l];function t(c,r,i,d,g,h){return e(),a("div",null,o)}const v=s(p,[["render",t]]);export{u as __pageData,v as default};
