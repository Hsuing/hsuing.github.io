import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const E=JSON.parse('{"title":"1.wal_log增长","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/9-wal_log.md","filePath":"guide/Database/pgSql/base/9-wal_log.md","lastUpdated":1711696988000}'),l={name:"guide/Database/pgSql/base/9-wal_log.md"},p=e(`<h1 id="_1-wal-log增长" tabindex="-1">1.wal_log增长 <a class="header-anchor" href="#_1-wal-log增长" aria-label="Permalink to &quot;1.wal_log增长&quot;">​</a></h1><p><a href="https://www.cnblogs.com/believexin/p/14623345.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/believexin/p/14623345.html</a></p><p>具体过程如下</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">关闭PostgreSQL的数据库服务</span></span>
<span class="line"><span style="color:#B392F0;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">修改postgresql.conf中参数，查阅了多方资料显示min_wal_size</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">必须是</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wal_segment_size</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">的两倍</span></span>
<span class="line"><span style="color:#B392F0;">于是修改</span></span>
<span class="line"><span style="color:#B392F0;">max_wal_size</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">GB</span></span>
<span class="line"><span style="color:#B392F0;">min_wal_size</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">128</span><span style="color:#9ECBFF;">MB</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">关闭PostgreSQL的数据库服务</span></span>
<span class="line"><span style="color:#6F42C1;">2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">修改postgresql.conf中参数，查阅了多方资料显示min_wal_size</span><span style="color:#24292E;"> </span><span style="color:#032F62;">必须是</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wal_segment_size</span><span style="color:#24292E;"> </span><span style="color:#032F62;">的两倍</span></span>
<span class="line"><span style="color:#6F42C1;">于是修改</span></span>
<span class="line"><span style="color:#6F42C1;">max_wal_size</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">GB</span></span>
<span class="line"><span style="color:#6F42C1;">min_wal_size</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">128</span><span style="color:#032F62;">MB</span></span></code></pre></div><p>修改后保存，重新启动postgreSQL显示 OK ，wal_log终于低增长</p><p>调整wal_log 大小</p><p><code>initdb</code> 命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$initdb -E UTF8 --locale=C --wal-segsize=64 -D /home/pg11/data01 -U postgres -W</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$initdb -E UTF8 --locale=C --wal-segsize=64 -D /home/pg11/data01 -U postgres -W</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#暴力修改</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_resetwal --wal-segsize=64 -D /database/pg11/pg_root</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#暴力修改</span></span>
<span class="line"><span style="color:#24292e;">pg_resetwal --wal-segsize=64 -D /database/pg11/pg_root</span></span></code></pre></div><h1 id="_2-开启归档" tabindex="-1">2.开启归档 <a class="header-anchor" href="#_2-开启归档" aria-label="Permalink to &quot;2.开启归档&quot;">​</a></h1><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.#查看归档是否开启</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">,setting </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_settings </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">like</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;archive%&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">or</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;wal_level&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">           |                                 setting                                  </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------+--------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> archive_cleanup_command | </span></span>
<span class="line"><span style="color:#E1E4E8;"> archive_command         | test ! </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f </span><span style="color:#F97583;">/data/</span><span style="color:#E1E4E8;">pgdata</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">archivedir</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">%f &amp;&amp; cp %p </span><span style="color:#F97583;">/data/</span><span style="color:#E1E4E8;">pgdata</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">archivedir</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">%f</span></span>
<span class="line"><span style="color:#E1E4E8;"> archive_mode            | </span><span style="color:#F97583;">on</span></span>
<span class="line"><span style="color:#E1E4E8;"> archive_timeout         | </span><span style="color:#79B8FF;">60</span></span>
<span class="line"><span style="color:#E1E4E8;"> wal_level               | </span><span style="color:#F97583;">replica</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">或者</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># show archive_mode;</span></span>
<span class="line"><span style="color:#E1E4E8;"> archive_mode </span></span>
<span class="line"><span style="color:#6A737D;">--------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#修改postgresql的配置文件(</span><span style="color:#79B8FF;">postgresql</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">conf</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">archive_mode </span><span style="color:#F97583;">=on</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">archive_command </span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;DATE=\`date +%Y%m%d\`;DIR=&quot;/home/postgres/arch/$DATE&quot;;(test -d $DIR || mkdir -p $DIR)&amp;&amp; cp %p</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">%p表示wal日志文件的路径，%f表示wal日志文件名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#创建归档路径</span></span>
<span class="line"><span style="color:#9ECBFF;">mkdir -p /data/pgdata/archivedir</span></span>
<span class="line"><span style="color:#9ECBFF;">chown -R postgres:postgres /data/pgdata/archivedir</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#重启数据库</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#验证归档是否正常</span></span>
<span class="line"><span style="color:#9ECBFF;">postgres=# checkpoint;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#PG10之后</span></span>
<span class="line"><span style="color:#9ECBFF;">postgres=# select pg_switch_wal();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#PG10之前</span></span>
<span class="line"><span style="color:#9ECBFF;">postgres=# select pg_switch_xlog();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;">.#查看归档是否开启</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">,setting </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_settings </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">like</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;archive%&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">or</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;wal_level&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">           |                                 setting                                  </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------+--------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> archive_cleanup_command | </span></span>
<span class="line"><span style="color:#24292E;"> archive_command         | test ! </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f </span><span style="color:#D73A49;">/data/</span><span style="color:#24292E;">pgdata</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">archivedir</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">%f &amp;&amp; cp %p </span><span style="color:#D73A49;">/data/</span><span style="color:#24292E;">pgdata</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">archivedir</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">%f</span></span>
<span class="line"><span style="color:#24292E;"> archive_mode            | </span><span style="color:#D73A49;">on</span></span>
<span class="line"><span style="color:#24292E;"> archive_timeout         | </span><span style="color:#005CC5;">60</span></span>
<span class="line"><span style="color:#24292E;"> wal_level               | </span><span style="color:#D73A49;">replica</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">或者</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># show archive_mode;</span></span>
<span class="line"><span style="color:#24292E;"> archive_mode </span></span>
<span class="line"><span style="color:#6A737D;">--------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#修改postgresql的配置文件(</span><span style="color:#005CC5;">postgresql</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">conf</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">archive_mode </span><span style="color:#D73A49;">=on</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">archive_command </span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;DATE=\`date +%Y%m%d\`;DIR=&quot;/home/postgres/arch/$DATE&quot;;(test -d $DIR || mkdir -p $DIR)&amp;&amp; cp %p</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">%p表示wal日志文件的路径，%f表示wal日志文件名</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#创建归档路径</span></span>
<span class="line"><span style="color:#032F62;">mkdir -p /data/pgdata/archivedir</span></span>
<span class="line"><span style="color:#032F62;">chown -R postgres:postgres /data/pgdata/archivedir</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#重启数据库</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#验证归档是否正常</span></span>
<span class="line"><span style="color:#032F62;">postgres=# checkpoint;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#PG10之后</span></span>
<span class="line"><span style="color:#032F62;">postgres=# select pg_switch_wal();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#PG10之前</span></span>
<span class="line"><span style="color:#032F62;">postgres=# select pg_switch_xlog();</span></span></code></pre></div><h2 id="归档策略脚本" tabindex="-1">归档策略脚本 <a class="header-anchor" href="#归档策略脚本" aria-label="Permalink to &quot;归档策略脚本&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">archive_command =&#39;/bin/bash /data/pgdata/data/pg_archive.sh %p %f&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">archive_command =&#39;/bin/bash /data/pgdata/data/pg_archive.sh %p %f&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">#source /home/postgres/.bash_profile</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">DATE=\`date +%Y%m%d\`</span></span>
<span class="line"><span style="color:#e1e4e8;">DIR=&quot;/data/pgdata/archivedir/$DATE&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">BACK=&quot;/data/pgdata/archivedir/&quot;\`date -d &#39;-20 day&#39; +%Y%m%d\`</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ -d &quot;$BACK&quot; ]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">   rm -rf $BACK</span></span>
<span class="line"><span style="color:#e1e4e8;">   echo &quot;success rm $BACK&quot; &gt; hx.log</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">   echo &quot;the old backup file not exists!&quot; &gt; hx.log</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span>
<span class="line"><span style="color:#e1e4e8;">(test -d $DIR || mkdir -p $DIR) &amp;&amp; cp $1 $DIR/$2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">#source /home/postgres/.bash_profile</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">DATE=\`date +%Y%m%d\`</span></span>
<span class="line"><span style="color:#24292e;">DIR=&quot;/data/pgdata/archivedir/$DATE&quot;</span></span>
<span class="line"><span style="color:#24292e;">BACK=&quot;/data/pgdata/archivedir/&quot;\`date -d &#39;-20 day&#39; +%Y%m%d\`</span></span>
<span class="line"><span style="color:#24292e;">if [ -d &quot;$BACK&quot; ]; then</span></span>
<span class="line"><span style="color:#24292e;">   rm -rf $BACK</span></span>
<span class="line"><span style="color:#24292e;">   echo &quot;success rm $BACK&quot; &gt; hx.log</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">   echo &quot;the old backup file not exists!&quot; &gt; hx.log</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span>
<span class="line"><span style="color:#24292e;">(test -d $DIR || mkdir -p $DIR) &amp;&amp; cp $1 $DIR/$2</span></span></code></pre></div><h1 id="_3-手动清理归档文件" tabindex="-1">3.手动清理归档文件 <a class="header-anchor" href="#_3-手动清理归档文件" aria-label="Permalink to &quot;3.手动清理归档文件&quot;">​</a></h1><h3 id="pg-wal-write-ahead-logging-说明" tabindex="-1">pg_wal（Write-AHead Logging） 说明 <a class="header-anchor" href="#pg-wal-write-ahead-logging-说明" aria-label="Permalink to &quot;pg_wal（Write-AHead Logging） 说明&quot;">​</a></h3><blockquote><p>wal日志位置： $PGDATA/pg_wal(pg10之前叫pg_xlog)</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">#wal日志文件命名规则：</span></span>
<span class="line"><span style="color:#e1e4e8;">#我们看到的wal日志是这样的：000000010000000100000092</span></span>
<span class="line"><span style="color:#e1e4e8;">#其中前8位:00000001表示timeline；</span></span>
<span class="line"><span style="color:#e1e4e8;">#中间8位：00000001表示logid；</span></span>
<span class="line"><span style="color:#e1e4e8;">#最后8位：00000092表示logseg</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">#wal日志文件命名规则：</span></span>
<span class="line"><span style="color:#24292e;">#我们看到的wal日志是这样的：000000010000000100000092</span></span>
<span class="line"><span style="color:#24292e;">#其中前8位:00000001表示timeline；</span></span>
<span class="line"><span style="color:#24292e;">#中间8位：00000001表示logid；</span></span>
<span class="line"><span style="color:#24292e;">#最后8位：00000092表示logseg</span></span></code></pre></div><h3 id="清除检查点以前的xlog文件" tabindex="-1">清除检查点以前的XLOG文件 <a class="header-anchor" href="#清除检查点以前的xlog文件" aria-label="Permalink to &quot;清除检查点以前的XLOG文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@~&gt; pg_controldata $PGDATA</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Latest checkpoint location:           1/E000028  </span></span>
<span class="line"><span style="color:#e1e4e8;">Prior checkpoint location:            1/D18C068  </span></span>
<span class="line"><span style="color:#e1e4e8;">Latest checkpoint&#39;s REDO location:    1/E000028  </span></span>
<span class="line"><span style="color:#e1e4e8;">Latest checkpoint&#39;s REDO WAL file:    00000001000000010000000E  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">表示00000001000000010000000E之前的pg_wal文件可以删除</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@~&gt; pg_controldata $PGDATA</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Latest checkpoint location:           1/E000028  </span></span>
<span class="line"><span style="color:#24292e;">Prior checkpoint location:            1/D18C068  </span></span>
<span class="line"><span style="color:#24292e;">Latest checkpoint&#39;s REDO location:    1/E000028  </span></span>
<span class="line"><span style="color:#24292e;">Latest checkpoint&#39;s REDO WAL file:    00000001000000010000000E  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">表示00000001000000010000000E之前的pg_wal文件可以删除</span></span></code></pre></div><blockquote><p>比如你配置了archive_mode=on，但是没有配置archive_command，那么xlog文件会一直堆积（pg_wal写完后，会写.ready，但是由于没有配置archive_command，也就是说不会触发归档命令，所以一直都不会写.done）。</p></blockquote><blockquote><p>从而导致pg_wal一直不会被清理。</p><p>然后使用pg_archivecleanup命令来清理</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 1. 读取控制文件，找到哪个文件是可以被清理的</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_controldata $PGDATA  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">Latest checkpoint location:           1/E000028  </span></span>
<span class="line"><span style="color:#e1e4e8;">Prior checkpoint location:            1/D18C068  </span></span>
<span class="line"><span style="color:#e1e4e8;">Latest checkpoint&#39;s REDO location:    1/E000028  </span></span>
<span class="line"><span style="color:#e1e4e8;">Latest checkpoint&#39;s REDO WAL file:    00000001000000010000000E  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;"># 表示00000001000000010000000E之前的pg_wal文件可以删除 (pg10以前的叫做pg_xlog)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[ptgres@k8s1 pg_wal]$ pg_archivecleanup -d /data/pgdata/data/pg_wal 000000010000000000000006 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg_archivecleanup: keeping WAL file &quot;/data/pgdata/data/pg_wal/000000010000000000000006&quot; and later</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000001&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000005&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000004&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000002&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000003&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 1. 读取控制文件，找到哪个文件是可以被清理的</span></span>
<span class="line"><span style="color:#24292e;">pg_controldata $PGDATA  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">Latest checkpoint location:           1/E000028  </span></span>
<span class="line"><span style="color:#24292e;">Prior checkpoint location:            1/D18C068  </span></span>
<span class="line"><span style="color:#24292e;">Latest checkpoint&#39;s REDO location:    1/E000028  </span></span>
<span class="line"><span style="color:#24292e;">Latest checkpoint&#39;s REDO WAL file:    00000001000000010000000E  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;"># 表示00000001000000010000000E之前的pg_wal文件可以删除 (pg10以前的叫做pg_xlog)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[ptgres@k8s1 pg_wal]$ pg_archivecleanup -d /data/pgdata/data/pg_wal 000000010000000000000006 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg_archivecleanup: keeping WAL file &quot;/data/pgdata/data/pg_wal/000000010000000000000006&quot; and later</span></span>
<span class="line"><span style="color:#24292e;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000001&quot;</span></span>
<span class="line"><span style="color:#24292e;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000005&quot;</span></span>
<span class="line"><span style="color:#24292e;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000004&quot;</span></span>
<span class="line"><span style="color:#24292e;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000002&quot;</span></span>
<span class="line"><span style="color:#24292e;">pg_archivecleanup: removing file &quot;/data/pgdata/data/pg_wal/000000010000000000000003&quot;</span></span></code></pre></div><ul><li>脚本清理</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">export PGHOME=/data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#e1e4e8;">export PGPORT=5532  </span></span>
<span class="line"><span style="color:#e1e4e8;">export PGDATA=/data/pgdata/data  </span></span>
<span class="line"><span style="color:#e1e4e8;">export PATH=$PGHOME/bin:$PATH</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># database user</span></span>
<span class="line"><span style="color:#e1e4e8;">PGIP=127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">PORT=5532</span></span>
<span class="line"><span style="color:#e1e4e8;">PGUSER_NAME=postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PG_WAL_NUM=\`pg_controldata $PGDATA |head |grep &quot;WAL file&quot;|awk -F&#39;:&#39; &#39;{print $2}&#39;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">if [ \${PG_WAL_NUM} == &quot;&quot; ]</span></span>
<span class="line"><span style="color:#e1e4e8;">then</span></span>
<span class="line"><span style="color:#e1e4e8;">	exit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">	pg_archivecleanup -d \${PGDATA}/pg_wal \${PG_WAL_NUM} &gt; /dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">export PGHOME=/data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#24292e;">export PGPORT=5532  </span></span>
<span class="line"><span style="color:#24292e;">export PGDATA=/data/pgdata/data  </span></span>
<span class="line"><span style="color:#24292e;">export PATH=$PGHOME/bin:$PATH</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># database user</span></span>
<span class="line"><span style="color:#24292e;">PGIP=127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;">PORT=5532</span></span>
<span class="line"><span style="color:#24292e;">PGUSER_NAME=postgres</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PG_WAL_NUM=\`pg_controldata $PGDATA |head |grep &quot;WAL file&quot;|awk -F&#39;:&#39; &#39;{print $2}&#39;\`</span></span>
<span class="line"><span style="color:#24292e;">if [ \${PG_WAL_NUM} == &quot;&quot; ]</span></span>
<span class="line"><span style="color:#24292e;">then</span></span>
<span class="line"><span style="color:#24292e;">	exit 1</span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">	pg_archivecleanup -d \${PGDATA}/pg_wal \${PG_WAL_NUM} &gt; /dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span></code></pre></div><h1 id="_4-关闭或修改归档模式" tabindex="-1">4.关闭或修改归档模式 <a class="header-anchor" href="#_4-关闭或修改归档模式" aria-label="Permalink to &quot;4.关闭或修改归档模式&quot;">​</a></h1><ul><li>修改<code>archive_mode</code>配置</li></ul><blockquote><p>当启用archive_mode时，通过设置archive_command将已完成的WAL段发送到归档存储。除了off，disable，还有两种模式：on,always。在正常操作期间，两种模式之间没有区别，但是当设置为always的情况下,WAL archiver在存档恢复或待机模式下也被启用。在always模式下，从归档还原或流式复制流的所有文件都将被归档（再次）。archive_mode和archive_command是单独的变量，因此可以在不更改存档模式的情况下更改archive_command。此参数只能在服务器启动时设置。当wal_level设置为minimal时，无法启用archive_mode</p></blockquote><ul><li>修改<code>wal_level</code>配置</li></ul><blockquote><p>1、minimal是默认的值，它仅写入崩溃或者突发关机时所需要的信息（不建议使用）。</p><p>2、archive是增加wal归档所需的日志（最常用）。</p><p>3、hot_standby是在备用服务器上增加了运行只读查询所需的信息，一般实在流复制的时候使用到</p></blockquote><h1 id="_5-触发-wal-日志归档" tabindex="-1">5.触发 WAL 日志归档 <a class="header-anchor" href="#_5-触发-wal-日志归档" aria-label="Permalink to &quot;5.触发 WAL 日志归档&quot;">​</a></h1><h2 id="手动切换-wal-日志" tabindex="-1">手动切换 WAL 日志 <a class="header-anchor" href="#手动切换-wal-日志" aria-label="Permalink to &quot;手动切换 WAL 日志&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#10之前</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#10之后</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_switch_wal();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#10之前</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_switch_xlog();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#10之后</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_switch_wal();</span></span></code></pre></div><h2 id="wal-日志写满后触发归档" tabindex="-1">WAL 日志写满后触发归档 <a class="header-anchor" href="#wal-日志写满后触发归档" aria-label="Permalink to &quot;WAL 日志写满后触发归档&quot;">​</a></h2><h2 id="设置-archive-timeout" tabindex="-1">设置 archive_timeout <a class="header-anchor" href="#设置-archive-timeout" aria-label="Permalink to &quot;设置 archive_timeout&quot;">​</a></h2><p>另外可以设置archive 超时参数 archive_timeout ，假如设置 archive_timeout=60 ，那么每 60 s ，会触发一次 WAL 日志切换，同时触发日志归档</p><h1 id="_6-设置wal-log-大小" tabindex="-1">6.设置wal_log 大小 <a class="header-anchor" href="#_6-设置wal-log-大小" aria-label="Permalink to &quot;6.设置wal_log 大小&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#首先停止PostgreSQL服务</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_ctl -D /data/pgdata stop -m fast</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#修改wal-segsize段大小,默认单位是MB,值必须是2的幂并且在1到1024MB之间</span></span>
<span class="line"><span style="color:#e1e4e8;">#以postgresql 用户运行</span></span>
<span class="line"><span style="color:#e1e4e8;">#pg_resetwal --wal-segsize=32 /data/pgdata/data;</span></span>
<span class="line"><span style="color:#e1e4e8;">Write-ahead log reset</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">show block_size;</span></span>
<span class="line"><span style="color:#e1e4e8;">show wal_block_size;</span></span>
<span class="line"><span style="color:#e1e4e8;">show segment_size;</span></span>
<span class="line"><span style="color:#e1e4e8;">show wal_segment_size;</span></span>
<span class="line"><span style="color:#e1e4e8;">ls /data/pgdata/data/pg_wal -lh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres@127.0.0.1 ~=#\\! ls </span></span>
<span class="line"><span style="color:#e1e4e8;">pg_healthcheck.report  pg_healthcheck.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#实验segment_size</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select database_block_size,blocks_per_segment,database_block_size*blocks_per_segment::bigint/1024/1024/1024 as &quot;segment_size(GB)&quot; from pg_control_init();</span></span>
<span class="line"><span style="color:#e1e4e8;"> database_block_size | blocks_per_segment | segment_size(GB) </span></span>
<span class="line"><span style="color:#e1e4e8;">---------------------+--------------------+------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">                8192 |             131072 |                1</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#插入数据来验证</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create table test(id int,name text);</span></span>
<span class="line"><span style="color:#e1e4e8;">insert into test select n,n||&#39;_test&#39; from generate_series(1,40000000) n;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看表位置</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_relation_filepath(&#39;table_name&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#首先停止PostgreSQL服务</span></span>
<span class="line"><span style="color:#24292e;">pg_ctl -D /data/pgdata stop -m fast</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#修改wal-segsize段大小,默认单位是MB,值必须是2的幂并且在1到1024MB之间</span></span>
<span class="line"><span style="color:#24292e;">#以postgresql 用户运行</span></span>
<span class="line"><span style="color:#24292e;">#pg_resetwal --wal-segsize=32 /data/pgdata/data;</span></span>
<span class="line"><span style="color:#24292e;">Write-ahead log reset</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">show block_size;</span></span>
<span class="line"><span style="color:#24292e;">show wal_block_size;</span></span>
<span class="line"><span style="color:#24292e;">show segment_size;</span></span>
<span class="line"><span style="color:#24292e;">show wal_segment_size;</span></span>
<span class="line"><span style="color:#24292e;">ls /data/pgdata/data/pg_wal -lh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres@127.0.0.1 ~=#\\! ls </span></span>
<span class="line"><span style="color:#24292e;">pg_healthcheck.report  pg_healthcheck.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#实验segment_size</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select database_block_size,blocks_per_segment,database_block_size*blocks_per_segment::bigint/1024/1024/1024 as &quot;segment_size(GB)&quot; from pg_control_init();</span></span>
<span class="line"><span style="color:#24292e;"> database_block_size | blocks_per_segment | segment_size(GB) </span></span>
<span class="line"><span style="color:#24292e;">---------------------+--------------------+------------------</span></span>
<span class="line"><span style="color:#24292e;">                8192 |             131072 |                1</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#插入数据来验证</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create table test(id int,name text);</span></span>
<span class="line"><span style="color:#24292e;">insert into test select n,n||&#39;_test&#39; from generate_series(1,40000000) n;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看表位置</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_relation_filepath(&#39;table_name&#39;);</span></span></code></pre></div><p>或者暴力清理，这个会丢失数据，不建议使用</p><p>pg_resetwal -f /data/pgdata/data</p><h1 id="_7-pg-wal" tabindex="-1">7.pg_wal <a class="header-anchor" href="#_7-pg-wal" aria-label="Permalink to &quot;7.pg_wal&quot;">​</a></h1><p><a href="https://www.modb.pro/db/48191" target="_blank" rel="noreferrer">https://www.modb.pro/db/48191</a></p><p><a href="https://www.modb.pro/db/48193" target="_blank" rel="noreferrer">https://www.modb.pro/db/48193</a></p><p><a href="https://www.modb.pro/db/28548" target="_blank" rel="noreferrer">https://www.modb.pro/db/28548</a></p><p><a href="https://www.modb.pro/db/22844" target="_blank" rel="noreferrer">https://www.modb.pro/db/22844</a></p>`,45),o=[p];function t(c,r,i,y,d,g){return a(),n("div",null,o)}const _=s(l,[["render",t]]);export{E as __pageData,_ as default};
