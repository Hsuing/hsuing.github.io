import{_ as s,c as t,o as a,R as e}from"./chunks/framework.CIzs38F0.js";const h=JSON.parse('{"title":"1.安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/plugin/1-pg_stat_statements.md","filePath":"guide/Database/pgSql/base/plugin/1-pg_stat_statements.md","lastUpdated":1711535325000}'),n={name:"guide/Database/pgSql/base/plugin/1-pg_stat_statements.md"},l=e(`<h1 id="_1-安装" tabindex="-1">1.安装 <a class="header-anchor" href="#_1-安装" aria-label="Permalink to &quot;1.安装&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd postgresql-12.2/contrib/pg_stat_statements</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd postgresql-12.2/contrib/pg_stat_statements</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span></code></pre></div><ul><li>配置参数</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#修改postgresql.conf</span></span>
<span class="line"><span style="color:#6A737D;">################ IO #####################</span></span>
<span class="line"><span style="color:#B392F0;">shared_preload_libraries</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;pg_stat_statements&#39;</span></span>
<span class="line"><span style="color:#B392F0;">custom_variable_classes</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;pg_stat_statements&#39;</span></span>
<span class="line"><span style="color:#B392F0;">track_io_timing</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span></span>
<span class="line"><span style="color:#B392F0;">pg_stat_statements.max</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10000</span><span style="color:#E1E4E8;">           </span><span style="color:#6A737D;"># 在pg_stat_statements中最多保留多少条统计信息，通过LRU算法，覆盖老的记录。    </span></span>
<span class="line"><span style="color:#B392F0;">pg_stat_statements.track</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">           </span><span style="color:#6A737D;"># all - (所有SQL包括函数内嵌套的SQL), top - 直接执行的SQL(函数内的sql不被跟踪), none - (不跟踪)    </span></span>
<span class="line"><span style="color:#B392F0;">pg_stat_statements.track_utility</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">off</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;"># 是否跟踪非DML语句 (例如DDL，DCL)， on表示跟踪, off表示不跟踪    </span></span>
<span class="line"><span style="color:#B392F0;">pg_stat_statements.save</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">on</span><span style="color:#E1E4E8;">             </span><span style="color:#6A737D;"># 重启后是否保留统计信息</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#修改postgresql.conf</span></span>
<span class="line"><span style="color:#6A737D;">################ IO #####################</span></span>
<span class="line"><span style="color:#6F42C1;">shared_preload_libraries</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;pg_stat_statements&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">custom_variable_classes</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;pg_stat_statements&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">track_io_timing</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span></span>
<span class="line"><span style="color:#6F42C1;">pg_stat_statements.max</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10000</span><span style="color:#24292E;">           </span><span style="color:#6A737D;"># 在pg_stat_statements中最多保留多少条统计信息，通过LRU算法，覆盖老的记录。    </span></span>
<span class="line"><span style="color:#6F42C1;">pg_stat_statements.track</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span><span style="color:#24292E;">           </span><span style="color:#6A737D;"># all - (所有SQL包括函数内嵌套的SQL), top - 直接执行的SQL(函数内的sql不被跟踪), none - (不跟踪)    </span></span>
<span class="line"><span style="color:#6F42C1;">pg_stat_statements.track_utility</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">off</span><span style="color:#24292E;">   </span><span style="color:#6A737D;"># 是否跟踪非DML语句 (例如DDL，DCL)， on表示跟踪, off表示不跟踪    </span></span>
<span class="line"><span style="color:#6F42C1;">pg_stat_statements.save</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">on</span><span style="color:#24292E;">             </span><span style="color:#6A737D;"># 重启后是否保留统计信息</span></span></code></pre></div><ul><li>重启数据库</li></ul><h1 id="_2-创建扩展" tabindex="-1">2.创建扩展 <a class="header-anchor" href="#_2-创建扩展" aria-label="Permalink to &quot;2.创建扩展&quot;">​</a></h1><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">在需要查询TOP SQL的数据库中，创建extension</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> extension pg_stat_statements; </span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> EXTENSION </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\dx</span></span>
<span class="line"><span style="color:#E1E4E8;">                                     List of installed extensions</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">        | </span><span style="color:#F97583;">Version</span><span style="color:#E1E4E8;"> |   </span><span style="color:#F97583;">Schema</span><span style="color:#E1E4E8;">   |                        </span><span style="color:#F97583;">Description</span><span style="color:#E1E4E8;">                        </span></span>
<span class="line"><span style="color:#6A737D;">--------------------+---------+------------+-----------------------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_stat_statements | </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">     | public     | track execution </span><span style="color:#F97583;">statistics</span><span style="color:#E1E4E8;"> of all </span><span style="color:#F97583;">SQL</span><span style="color:#E1E4E8;"> statements executed</span></span>
<span class="line"><span style="color:#E1E4E8;"> plpgsql            | </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">     | pg_catalog | PL</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">pgSQL procedural </span><span style="color:#F97583;">language</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">在需要查询TOP SQL的数据库中，创建extension</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> extension pg_stat_statements; </span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> EXTENSION </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\dx</span></span>
<span class="line"><span style="color:#24292E;">                                     List of installed extensions</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">        | </span><span style="color:#D73A49;">Version</span><span style="color:#24292E;"> |   </span><span style="color:#D73A49;">Schema</span><span style="color:#24292E;">   |                        </span><span style="color:#D73A49;">Description</span><span style="color:#24292E;">                        </span></span>
<span class="line"><span style="color:#6A737D;">--------------------+---------+------------+-----------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_stat_statements | </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">     | public     | track execution </span><span style="color:#D73A49;">statistics</span><span style="color:#24292E;"> of all </span><span style="color:#D73A49;">SQL</span><span style="color:#24292E;"> statements executed</span></span>
<span class="line"><span style="color:#24292E;"> plpgsql            | </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">     | pg_catalog | PL</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">pgSQL procedural </span><span style="color:#D73A49;">language</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span></code></pre></div><h3 id="pg-stat-statements输出内容介绍" tabindex="-1">pg_stat_statements输出内容介绍 <a class="header-anchor" href="#pg-stat-statements输出内容介绍" aria-label="Permalink to &quot;pg_stat_statements输出内容介绍&quot;">​</a></h3><p>查询pg_stat_statements视图，可以得到统计信息</p><p>SQL语句中的一些过滤条件在pg_stat_statements中会被替换成变量，减少重复显示的问题。</p><p>pg_stat_statements视图包含了一些重要的信息，例如：</p><p>\\1. SQL的调用次数，总的耗时，最快执行时间，最慢执行时间，平均执行时间，执行时间的方差（看出抖动），总共扫描或返回或处理了多少行；</p><p>\\2. shared buffer的使用情况，命中，未命中，产生脏块，驱逐脏块。</p><p>\\3. local buffer的使用情况，命中，未命中，产生脏块，驱逐脏块。</p><p>\\4. temp buffer的使用情况，读了多少脏块，驱逐脏块。</p><p>\\5. 数据块的读写时间。</p><table><thead><tr><th>Name</th><th>Type</th><th>References</th><th>Description</th></tr></thead><tbody><tr><td>userid</td><td>oid</td><td>pg_authid.oid</td><td>OID of user who executed the statement</td></tr><tr><td>dbid</td><td>oid</td><td>pg_database.oid</td><td>OID of database in which the statement was executed</td></tr><tr><td>queryid</td><td>bigint</td><td>-</td><td>Internal hash code, computed from the statement&#39;s parse tree</td></tr><tr><td>query</td><td>text</td><td>-</td><td>Text of a representative statement</td></tr><tr><td>calls</td><td>bigint</td><td>-</td><td>Number of times executed</td></tr><tr><td>total_time</td><td>double precision</td><td>-</td><td>Total time spent in the statement, in milliseconds</td></tr><tr><td>min_time</td><td>double precision</td><td>-</td><td>Minimum time spent in the statement, in milliseconds</td></tr><tr><td>max_time</td><td>double precision</td><td>-</td><td>Maximum time spent in the statement, in milliseconds</td></tr><tr><td>mean_time</td><td>double precision</td><td>-</td><td>Mean time spent in the statement, in milliseconds</td></tr><tr><td>stddev_time</td><td>double precision</td><td>-</td><td>Population standard deviation of time spent in the statement, in milliseconds</td></tr><tr><td>rows</td><td>bigint</td><td>-</td><td>Total number of rows retrieved or affected by the statement</td></tr><tr><td>shared_blks_hit</td><td>bigint</td><td>-</td><td>Total number of shared block cache hits by the statement</td></tr><tr><td>shared_blks_read</td><td>bigint</td><td>-</td><td>Total number of shared blocks read by the statement</td></tr><tr><td>shared_blks_dirtied</td><td>bigint</td><td>-</td><td>Total number of shared blocks dirtied by the statement</td></tr><tr><td>shared_blks_written</td><td>bigint</td><td>-</td><td>Total number of shared blocks written by the statement</td></tr><tr><td>local_blks_hit</td><td>bigint</td><td>-</td><td>Total number of local block cache hits by the statement</td></tr><tr><td>local_blks_read</td><td>bigint</td><td>-</td><td>Total number of local blocks read by the statement</td></tr><tr><td>local_blks_dirtied</td><td>bigint</td><td>-</td><td>Total number of local blocks dirtied by the statement</td></tr><tr><td>local_blks_written</td><td>bigint</td><td>-</td><td>Total number of local blocks written by the statement</td></tr><tr><td>temp_blks_read</td><td>bigint</td><td>-</td><td>Total number of temp blocks read by the statement</td></tr><tr><td>temp_blks_written</td><td>bigint</td><td>-</td><td>Total number of temp blocks written by the statement</td></tr><tr><td>blk_read_time</td><td>double precision</td><td>-</td><td>Total time the statement spent reading blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)</td></tr><tr><td>blk_write_time</td><td>double precision</td><td>-</td><td>Total time the statement spent writing blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)</td></tr></tbody></table><h3 id="最耗io-sql" tabindex="-1">最耗IO SQL <a class="header-anchor" href="#最耗io-sql" aria-label="Permalink to &quot;最耗IO SQL&quot;">​</a></h3><p>单次调用最耗IO SQL TOP 5</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select userid::regrole, dbid, query from pg_stat_statements order by (blk_read_time+blk_write_time)/calls desc limit 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select userid::regrole, dbid, query from pg_stat_statements order by (blk_read_time+blk_write_time)/calls desc limit 5;</span></span></code></pre></div><p>总最耗IO SQL TOP 5</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select userid::regrole, dbid, query from pg_stat_statements order by (blk_read_time+blk_write_time) desc limit 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select userid::regrole, dbid, query from pg_stat_statements order by (blk_read_time+blk_write_time) desc limit 5;</span></span></code></pre></div><h3 id="最耗时-sql" tabindex="-1">最耗时 SQL <a class="header-anchor" href="#最耗时-sql" aria-label="Permalink to &quot;最耗时 SQL&quot;">​</a></h3><p>单次调用最耗时 SQL TOP 5</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select userid::regrole, dbid, query from pg_stat_statements order by mean_time desc limit 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select userid::regrole, dbid, query from pg_stat_statements order by mean_time desc limit 5;</span></span></code></pre></div><p><strong>总最耗时 SQL TOP 5(最需要关注的是这个)</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select userid::regrole, dbid, query from pg_stat_statements order by total_time desc limit 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select userid::regrole, dbid, query from pg_stat_statements order by total_time desc limit 5;</span></span></code></pre></div><h3 id="响应时间抖动最严重-sql" tabindex="-1">响应时间抖动最严重 SQL <a class="header-anchor" href="#响应时间抖动最严重-sql" aria-label="Permalink to &quot;响应时间抖动最严重 SQL&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select userid::regrole, dbid, query from pg_stat_statements order by stddev_time desc limit 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select userid::regrole, dbid, query from pg_stat_statements order by stddev_time desc limit 5;</span></span></code></pre></div><h3 id="最耗共享内存-sql" tabindex="-1">最耗共享内存 SQL <a class="header-anchor" href="#最耗共享内存-sql" aria-label="Permalink to &quot;最耗共享内存 SQL&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select userid::regrole, dbid, query from pg_stat_statements order by (shared_blks_hit+shared_blks_dirtied) desc limit 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select userid::regrole, dbid, query from pg_stat_statements order by (shared_blks_hit+shared_blks_dirtied) desc limit 5;</span></span></code></pre></div><h3 id="最耗临时空间-sql" tabindex="-1">最耗临时空间 SQL <a class="header-anchor" href="#最耗临时空间-sql" aria-label="Permalink to &quot;最耗临时空间 SQL&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select userid::regrole, dbid, query from pg_stat_statements order by temp_blks_written desc limit 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select userid::regrole, dbid, query from pg_stat_statements order by temp_blks_written desc limit 5;</span></span></code></pre></div><h1 id="_3-重置统计信息" tabindex="-1">3.重置统计信息 <a class="header-anchor" href="#_3-重置统计信息" aria-label="Permalink to &quot;3.重置统计信息&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select pg_stat_statements_reset();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select pg_stat_statements_reset();</span></span></code></pre></div><h2 id="_3-1查询慢查执行时间前5的sql" tabindex="-1">3.1查询慢查执行时间前5的SQL <a class="header-anchor" href="#_3-1查询慢查执行时间前5的sql" aria-label="Permalink to &quot;3.1查询慢查执行时间前5的SQL&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# SELECT query, calls, total_time, rows, 100.0 \\* shared_blks_hit /nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent FROM pg_stat_statements ORDER BY total_time DESC LIMIT 5;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# SELECT query, calls, total_time, rows, 100.0 \\* shared_blks_hit /nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent FROM pg_stat_statements ORDER BY total_time DESC LIMIT 5;</span></span></code></pre></div><ul><li>慢SQL、TOP SQL优化</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">explain (analyze,verbose,timing,costs,buffers,timing) SQL;  -- SQL代替为要分析的SQL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">explain (analyze,verbose,timing,costs,buffers,timing) SQL;  -- SQL代替为要分析的SQL</span></span></code></pre></div><p><a href="https://github.com/digoal/blog/blob/master/201704/20170424_06.md?spm=a2c4e.10696291.0.0.35ff19a4EP0tjW&amp;file=20170424_06.md" target="_blank" rel="noreferrer">https://github.com/digoal/blog/blob/master/201704/20170424_06.md?spm=a2c4e.10696291.0.0.35ff19a4EP0tjW&amp;file=20170424_06.md</a></p>`,40),p=[l];function o(r,c,i,d,y,m){return a(),t("div",null,p)}const b=s(n,[["render",o]]);export{h as __pageData,b as default};
