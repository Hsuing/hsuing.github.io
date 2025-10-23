import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/日常使用规范的总结.md","filePath":"guide/Database/pgSql/base/日常使用规范的总结.md","lastUpdated":1711535325000}'),p={name:"guide/Database/pgSql/base/日常使用规范的总结.md"},l=e(`<h2 id="事务设计规范" tabindex="-1">事务设计规范 <a class="header-anchor" href="#事务设计规范" aria-label="Permalink to &quot;事务设计规范&quot;">​</a></h2><p>高并发场景，有时候会看到开发同学将很长的事务逻辑放在一个事务里面实现，其实这样对数据库并不友好。</p><p>我们应尽量避免单个事务过大、过长、过于复杂，建议将单个事务中多条SQL操作,分解、拆分，或者不放在同一个事务里，让每个事务的粒度尽可能小，这样可以尽量lock较少的资源，减少lock阻塞 、dead lock的产生</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#sesseion1把所有数据都更新而不提交，一下子锁了2000千万条记录</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# begin;</span></span>
<span class="line"><span style="color:#e1e4e8;">BEGIN</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.3&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 200000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#sesseion2 等待</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.4&#39;  where id=1;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#sesseion3 等待</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.5&#39;  where id=2;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如果#sesseion1分布批更新的话，则session2和session3中就能部分提前完成，</span></span>
<span class="line"><span style="color:#e1e4e8;">这样可以避免大量的锁等待和出现大量的session占用系统资源，</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在做全表更新时请使用这种方法来执行。如下所示:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# begin;</span></span>
<span class="line"><span style="color:#e1e4e8;">BEGIN</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.3&#39; where id&gt;0 and id &lt;=100000;</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 100000</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#COMMIT;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# begin;</span></span>
<span class="line"><span style="color:#e1e4e8;">BEGIN</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.3&#39; where id&gt;100000 and id &lt;=200000;</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 100000</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#COMMIT;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#sesseion1把所有数据都更新而不提交，一下子锁了2000千万条记录</span></span>
<span class="line"><span style="color:#24292e;">postgres=# begin;</span></span>
<span class="line"><span style="color:#24292e;">BEGIN</span></span>
<span class="line"><span style="color:#24292e;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.3&#39;;</span></span>
<span class="line"><span style="color:#24292e;">UPDATE 200000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#sesseion2 等待</span></span>
<span class="line"><span style="color:#24292e;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.4&#39;  where id=1;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#sesseion3 等待</span></span>
<span class="line"><span style="color:#24292e;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.5&#39;  where id=2;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如果#sesseion1分布批更新的话，则session2和session3中就能部分提前完成，</span></span>
<span class="line"><span style="color:#24292e;">这样可以避免大量的锁等待和出现大量的session占用系统资源，</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在做全表更新时请使用这种方法来执行。如下所示:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# begin;</span></span>
<span class="line"><span style="color:#24292e;">BEGIN</span></span>
<span class="line"><span style="color:#24292e;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.3&#39; where id&gt;0 and id &lt;=100000;</span></span>
<span class="line"><span style="color:#24292e;">UPDATE 100000</span></span>
<span class="line"><span style="color:#24292e;">postgres=#COMMIT;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# begin;</span></span>
<span class="line"><span style="color:#24292e;">BEGIN</span></span>
<span class="line"><span style="color:#24292e;">postgres=# update tab_pgsql_main set mc=&#39;tab_pgsql_1.3&#39; where id&gt;100000 and id &lt;=200000;</span></span>
<span class="line"><span style="color:#24292e;">UPDATE 100000</span></span>
<span class="line"><span style="color:#24292e;">postgres=#COMMIT;</span></span></code></pre></div><h2 id="index索引设计规范" tabindex="-1">Index索引设计规范 <a class="header-anchor" href="#index索引设计规范" aria-label="Permalink to &quot;Index索引设计规范&quot;">​</a></h2><p>1.建议对频繁update, delete的index字段, 用create index CONCURRENTLY , drop index CONCURRENTLY方式维护来保证并发效果；</p><p>2.建议用unique index 代替unique constraints，便于后续维护；</p><p>3.建议对where 中带多个字段and条件的高频 query，参考数据分布情况，建多个字段的联合index；</p><p>4.建议对固定条件的（一般有特定业务含义）且选择比好（数据占比低）的query，建带where的Partial Indexes:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> select * from test where status=1 and col=?; -- 其中status=1为固定的条件</span></span>
<span class="line"><span style="color:#e1e4e8;"> create index on test (col) where status=1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> select * from test where status=1 and col=?; -- 其中status=1为固定的条件</span></span>
<span class="line"><span style="color:#24292e;"> create index on test (col) where status=1;</span></span></code></pre></div><p>5.建议对经常使用表达式作为查询条件的query，可以使用表达式或函数索引加速query:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select * from test where exp(xxx);</span></span>
<span class="line"><span style="color:#e1e4e8;">create index on test (exp(xxx));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select * from test where exp(xxx);</span></span>
<span class="line"><span style="color:#24292e;">create index on test (exp(xxx));</span></span></code></pre></div><h2 id="constraints设计规范" tabindex="-1">Constraints设计规范 <a class="header-anchor" href="#constraints设计规范" aria-label="Permalink to &quot;Constraints设计规范&quot;">​</a></h2><p>1.为保证业务逻辑，建议建表时把主键或者唯一索引一并建立。 2.分布式环境中，建议禁用外键约束，外键对分布式系统性能影响较大。</p><p>3.分布式环境中，建议每个table都使用shard key做为主键或者唯一索引。</p><p>*建议非必须时避免select ，只写所需字段</p><p>去掉非必要是select list，简短的select list可以减少CS之间、节点之间网络带宽的消耗：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=#  explain (verbose) select * from tab_pgsql_main where id=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">                                         QUERY PLAN                                          </span></span>
<span class="line"><span style="color:#e1e4e8;">---------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> Index Scan using idx_tab_pgsql_main_id on public.tab_pgsql_main  (cost=0.15..8.17 rows=1 width=36)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Output: id, mc</span></span>
<span class="line"><span style="color:#e1e4e8;">   Index Cond: (tab_pgsql_main.id = 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">(3 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#  explain (verbose) select tableoid from tab_pgsql_main where id=1;   </span></span>
<span class="line"><span style="color:#e1e4e8;">                                         QUERY PLAN                                         </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> Index Scan using idx_tab_pgsql_main_id on public.tab_pgsql_main  (cost=0.15..8.17 rows=1 width=4)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Output: tableoid</span></span>
<span class="line"><span style="color:#e1e4e8;">   Index Cond: (tab_pgsql_main.id = 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">(3 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=#  explain (verbose) select * from tab_pgsql_main where id=1;</span></span>
<span class="line"><span style="color:#24292e;">                                         QUERY PLAN                                          </span></span>
<span class="line"><span style="color:#24292e;">---------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> Index Scan using idx_tab_pgsql_main_id on public.tab_pgsql_main  (cost=0.15..8.17 rows=1 width=36)</span></span>
<span class="line"><span style="color:#24292e;">   Output: id, mc</span></span>
<span class="line"><span style="color:#24292e;">   Index Cond: (tab_pgsql_main.id = 1)</span></span>
<span class="line"><span style="color:#24292e;">(3 rows)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=#  explain (verbose) select tableoid from tab_pgsql_main where id=1;   </span></span>
<span class="line"><span style="color:#24292e;">                                         QUERY PLAN                                         </span></span>
<span class="line"><span style="color:#24292e;">--------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> Index Scan using idx_tab_pgsql_main_id on public.tab_pgsql_main  (cost=0.15..8.17 rows=1 width=4)</span></span>
<span class="line"><span style="color:#24292e;">   Output: tableoid</span></span>
<span class="line"><span style="color:#24292e;">   Index Cond: (tab_pgsql_main.id = 1)</span></span>
<span class="line"><span style="color:#24292e;">(3 rows)</span></span></code></pre></div><h2 id="表字段column设计规范" tabindex="-1">表字段COLUMN设计规范 <a class="header-anchor" href="#表字段column设计规范" aria-label="Permalink to &quot;表字段COLUMN设计规范&quot;">​</a></h2><p>1.建议小字节数类型，就不要用大字节数类型；</p><p>2.建议能用varchar(N)、text就不用char(N)；</p><p>3.建议使用default NULL,而不用default ‘’；</p><p>4.建议如有国际货业务的话，使用timestamp with time zone(timestamptz),而不用timestamp without time zone,避免时间函数在对于不同时区的时间点返回值不同,也为业务国际化扫清障碍;</p><p>5.建议使用NUMERIC(precision, scale)来存储货币金额和其它要求精确计算的数值, 而不建议使用real, double precision；</p><p>6.建议对DB object 尤其是COLUMN 加COMMENT，便于后续了解业务及维护:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# \\d+ tab_pgsql_main</span></span>
<span class="line"><span style="color:#e1e4e8;">                      Table &quot;public.tab_pgsql_main&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> Column |  Type   | Modifiers | Storage  | Stats target | Description </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+---------+-----------+----------+--------------+-------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> id     | integer |           | plain    |              | </span></span>
<span class="line"><span style="color:#e1e4e8;"> mc     | text    |           | extended |              | </span></span>
<span class="line"><span style="color:#e1e4e8;">Indexes:</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;idx_main_id&quot; UNIQUE, btree (id)</span></span>
<span class="line"><span style="color:#e1e4e8;">Has OIDs: no</span></span>
<span class="line"><span style="color:#e1e4e8;">Distribute By SHARD(id)</span></span>
<span class="line"><span style="color:#e1e4e8;">        Location Nodes: ALL DATANODES</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# comment on column tab_pgsql_main.id is &#39;id号&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">COMMENT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# comment on column tab_pgsql_main.mc is &#39;产品名称&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">COMMENT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\d+ tab_pgsql_main</span></span>
<span class="line"><span style="color:#e1e4e8;">                      Table &quot;public.tab_pgsql_main&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> Column |  Type   | Modifiers | Storage  | Stats target | Description </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+---------+-----------+----------+--------------+-------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> id     | integer |           | plain    |              | id号</span></span>
<span class="line"><span style="color:#e1e4e8;"> mc     | text    |           | extended |              | 产品名称</span></span>
<span class="line"><span style="color:#e1e4e8;">Indexes:</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;idx_main_id&quot; UNIQUE, btree (id)</span></span>
<span class="line"><span style="color:#e1e4e8;">Has OIDs: no</span></span>
<span class="line"><span style="color:#e1e4e8;">Distribute By SHARD(id)</span></span>
<span class="line"><span style="color:#e1e4e8;">        Location Nodes: ALL DATANODES</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# \\d+ tab_pgsql_main</span></span>
<span class="line"><span style="color:#24292e;">                      Table &quot;public.tab_pgsql_main&quot;</span></span>
<span class="line"><span style="color:#24292e;"> Column |  Type   | Modifiers | Storage  | Stats target | Description </span></span>
<span class="line"><span style="color:#24292e;">--------+---------+-----------+----------+--------------+-------------</span></span>
<span class="line"><span style="color:#24292e;"> id     | integer |           | plain    |              | </span></span>
<span class="line"><span style="color:#24292e;"> mc     | text    |           | extended |              | </span></span>
<span class="line"><span style="color:#24292e;">Indexes:</span></span>
<span class="line"><span style="color:#24292e;">    &quot;idx_main_id&quot; UNIQUE, btree (id)</span></span>
<span class="line"><span style="color:#24292e;">Has OIDs: no</span></span>
<span class="line"><span style="color:#24292e;">Distribute By SHARD(id)</span></span>
<span class="line"><span style="color:#24292e;">        Location Nodes: ALL DATANODES</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# comment on column tab_pgsql_main.id is &#39;id号&#39;;</span></span>
<span class="line"><span style="color:#24292e;">COMMENT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# comment on column tab_pgsql_main.mc is &#39;产品名称&#39;;</span></span>
<span class="line"><span style="color:#24292e;">COMMENT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\d+ tab_pgsql_main</span></span>
<span class="line"><span style="color:#24292e;">                      Table &quot;public.tab_pgsql_main&quot;</span></span>
<span class="line"><span style="color:#24292e;"> Column |  Type   | Modifiers | Storage  | Stats target | Description </span></span>
<span class="line"><span style="color:#24292e;">--------+---------+-----------+----------+--------------+-------------</span></span>
<span class="line"><span style="color:#24292e;"> id     | integer |           | plain    |              | id号</span></span>
<span class="line"><span style="color:#24292e;"> mc     | text    |           | extended |              | 产品名称</span></span>
<span class="line"><span style="color:#24292e;">Indexes:</span></span>
<span class="line"><span style="color:#24292e;">    &quot;idx_main_id&quot; UNIQUE, btree (id)</span></span>
<span class="line"><span style="color:#24292e;">Has OIDs: no</span></span>
<span class="line"><span style="color:#24292e;">Distribute By SHARD(id)</span></span>
<span class="line"><span style="color:#24292e;">        Location Nodes: ALL DATANODES</span></span></code></pre></div><h2 id="考虑使用物化视图优化大表统计" tabindex="-1">考虑使用物化视图优化大表统计 <a class="header-anchor" href="#考虑使用物化视图优化大表统计" aria-label="Permalink to &quot;考虑使用物化视图优化大表统计&quot;">​</a></h2><p>建议对报表类的或生成基础数据的查询，使用物化视图(MATERIALIZED VIEW)定期固化数据快照， 避免对多表（尤其多写频繁的表）重复跑相同的查询。</p><p>PostgreSQL中物化视图支持并发更新：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">REFRESH MATERIALIZED VIEW CONCURRENTLY</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">REFRESH MATERIALIZED VIEW CONCURRENTLY</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">原理和优缺点与index CONCURRENTLY类似，即以时间来换取锁，并发刷新的速度会比非CONCURRENTLY慢，但后者会阻塞其他从该物化视图读数据的请求。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">假设程序需要不断查询大表的总记录数，那么我们可以这样做</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select count(1) from tab_pgsql_main;</span></span>
<span class="line"><span style="color:#e1e4e8;"> count  </span></span>
<span class="line"><span style="color:#e1e4e8;">--------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 200004</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 27.948 ms</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create MATERIALIZED VIEW tab_pgsql_main_count as select count(1) as num from tab_pgsql_main;</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT 1</span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 322.372 ms</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select num from  tab_pgsql_main_count ;</span></span>
<span class="line"><span style="color:#e1e4e8;">  num   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 200004</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 0.421 ms</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">原理和优缺点与index CONCURRENTLY类似，即以时间来换取锁，并发刷新的速度会比非CONCURRENTLY慢，但后者会阻塞其他从该物化视图读数据的请求。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">假设程序需要不断查询大表的总记录数，那么我们可以这样做</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select count(1) from tab_pgsql_main;</span></span>
<span class="line"><span style="color:#24292e;"> count  </span></span>
<span class="line"><span style="color:#24292e;">--------</span></span>
<span class="line"><span style="color:#24292e;"> 200004</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">Time: 27.948 ms</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# create MATERIALIZED VIEW tab_pgsql_main_count as select count(1) as num from tab_pgsql_main;</span></span>
<span class="line"><span style="color:#24292e;">SELECT 1</span></span>
<span class="line"><span style="color:#24292e;">Time: 322.372 ms</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select num from  tab_pgsql_main_count ;</span></span>
<span class="line"><span style="color:#24292e;">  num   </span></span>
<span class="line"><span style="color:#24292e;">--------</span></span>
<span class="line"><span style="color:#24292e;"> 200004</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">Time: 0.421 ms</span></span></code></pre></div><p>性能提高上百倍</p><p>当数据变化时刷新方法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=#  copy  tab_pgsql_main from  &#39;/data/pgsql/tab_pgsql_main.txt&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">COPY 100002</span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 1201.774 ms</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select count(1) from tab_pgsql_main;</span></span>
<span class="line"><span style="color:#e1e4e8;"> count  </span></span>
<span class="line"><span style="color:#e1e4e8;">--------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 300006</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 23.164 ms</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# REFRESH MATERIALIZED VIEW tab_pgsql_main_count;         </span></span>
<span class="line"><span style="color:#e1e4e8;">REFRESH MATERIALIZED VIEW</span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 49.486 ms</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select num from tab_pgsql_main_count ;</span></span>
<span class="line"><span style="color:#e1e4e8;">  num   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 300006</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 0.301 ms</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=#  copy  tab_pgsql_main from  &#39;/data/pgsql/tab_pgsql_main.txt&#39;;</span></span>
<span class="line"><span style="color:#24292e;">COPY 100002</span></span>
<span class="line"><span style="color:#24292e;">Time: 1201.774 ms</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select count(1) from tab_pgsql_main;</span></span>
<span class="line"><span style="color:#24292e;"> count  </span></span>
<span class="line"><span style="color:#24292e;">--------</span></span>
<span class="line"><span style="color:#24292e;"> 300006</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">Time: 23.164 ms</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# REFRESH MATERIALIZED VIEW tab_pgsql_main_count;         </span></span>
<span class="line"><span style="color:#24292e;">REFRESH MATERIALIZED VIEW</span></span>
<span class="line"><span style="color:#24292e;">Time: 49.486 ms</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select num from tab_pgsql_main_count ;</span></span>
<span class="line"><span style="color:#24292e;">  num   </span></span>
<span class="line"><span style="color:#24292e;">--------</span></span>
<span class="line"><span style="color:#24292e;"> 300006</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">Time: 0.301 ms</span></span></code></pre></div><p>两表join时尽量的使用分布键进行join</p><p>在分布式环境，在创建业务主表、明细表时，考虑使用他们的关联键来做分布键，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[pgsql@~]$ psql -p 15001              </span></span>
<span class="line"><span style="color:#e1e4e8;">psql (PostgreSQL 10 (tab_pgsql 2.01))</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create table tab_pgsql_main(id integer,mc text) distribute by shard(id);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create table tab_pgsql_detail(id integer,tab_pgsql_main_id integer,mc text) distribute by shard(tab_pgsql_main_id);   </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# explain select tab_pgsql_detail.* from tab_pgsql_main,tab_pgsql_detail where tab_pgsql_main.id=tab_pgsql_detail.tab_pgsql_main_id;       </span></span>
<span class="line"><span style="color:#e1e4e8;">                                 QUERY PLAN                                 </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> Data Node Scan on &quot;__REMOTE_FQS_QUERY__&quot;  (cost=0.00..0.00 rows=0 width=0)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Node/s: dn001, dn002</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# explain (verbose) select tab_pgsql_detail.* from tab_pgsql_main,tab_pgsql_detail where tab_pgsql_main.id=tab_pgsql_detail.tab_pgsql_main_id; </span></span>
<span class="line"><span style="color:#e1e4e8;">                                                                                 QUERY PLAN                                                                                     </span></span>
<span class="line"><span style="color:#e1e4e8;">------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> Data Node Scan on &quot;__REMOTE_FQS_QUERY__&quot;  (cost=0.00..0.00 rows=0 width=0)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Output: tab_pgsql_detail.id, tab_pgsql_detail.tab_pgsql_main_id, tab_pgsql_detail.mc</span></span>
<span class="line"><span style="color:#e1e4e8;">   Node/s: dn001, dn002</span></span>
<span class="line"><span style="color:#e1e4e8;">   Remote query: SELECT tab_pgsql_detail.id, tab_pgsql_detail.tab_pgsql_main_id, tab_pgsql_detail.mc FROM public.tab_pgsql_main, public.tab_pgsql_detail WHERE (tab_pgsql_main.id = tab_pgsql_detail.tab_pgsql_main_id)</span></span>
<span class="line"><span style="color:#e1e4e8;">(4 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[pgsql@~]$ psql -p 15001              </span></span>
<span class="line"><span style="color:#24292e;">psql (PostgreSQL 10 (tab_pgsql 2.01))</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# create table tab_pgsql_main(id integer,mc text) distribute by shard(id);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# create table tab_pgsql_detail(id integer,tab_pgsql_main_id integer,mc text) distribute by shard(tab_pgsql_main_id);   </span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# explain select tab_pgsql_detail.* from tab_pgsql_main,tab_pgsql_detail where tab_pgsql_main.id=tab_pgsql_detail.tab_pgsql_main_id;       </span></span>
<span class="line"><span style="color:#24292e;">                                 QUERY PLAN                                 </span></span>
<span class="line"><span style="color:#24292e;">----------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> Data Node Scan on &quot;__REMOTE_FQS_QUERY__&quot;  (cost=0.00..0.00 rows=0 width=0)</span></span>
<span class="line"><span style="color:#24292e;">   Node/s: dn001, dn002</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span>
<span class="line"><span style="color:#24292e;">postgres=# explain (verbose) select tab_pgsql_detail.* from tab_pgsql_main,tab_pgsql_detail where tab_pgsql_main.id=tab_pgsql_detail.tab_pgsql_main_id; </span></span>
<span class="line"><span style="color:#24292e;">                                                                                 QUERY PLAN                                                                                     </span></span>
<span class="line"><span style="color:#24292e;">------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> Data Node Scan on &quot;__REMOTE_FQS_QUERY__&quot;  (cost=0.00..0.00 rows=0 width=0)</span></span>
<span class="line"><span style="color:#24292e;">   Output: tab_pgsql_detail.id, tab_pgsql_detail.tab_pgsql_main_id, tab_pgsql_detail.mc</span></span>
<span class="line"><span style="color:#24292e;">   Node/s: dn001, dn002</span></span>
<span class="line"><span style="color:#24292e;">   Remote query: SELECT tab_pgsql_detail.id, tab_pgsql_detail.tab_pgsql_main_id, tab_pgsql_detail.mc FROM public.tab_pgsql_main, public.tab_pgsql_detail WHERE (tab_pgsql_main.id = tab_pgsql_detail.tab_pgsql_main_id)</span></span>
<span class="line"><span style="color:#24292e;">(4 rows)</span></span>
<span class="line"><span style="color:#24292e;">postgres=#</span></span></code></pre></div><h2 id="分布式环境的分布键用唯一索引代替主键" tabindex="-1">分布式环境的分布键用唯一索引代替主键 <a class="header-anchor" href="#分布式环境的分布键用唯一索引代替主键" aria-label="Permalink to &quot;分布式环境的分布键用唯一索引代替主键&quot;">​</a></h2><p>唯一索引后期的维护成本比主键要低很多</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# create unique index uidx_pgsql_main_id on tab_pgsql_main using btree(id);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# create unique index uidx_pgsql_main_id on tab_pgsql_main using btree(id);</span></span></code></pre></div><h2 id="create-index" tabindex="-1">CREATE INDEX <a class="header-anchor" href="#create-index" aria-label="Permalink to &quot;CREATE INDEX&quot;">​</a></h2><p>分布键无法建立唯一索引则要建立普通索引，提高查询的效率</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# create index idx_pgsql_detail_id on tab_pgsql_detail using btree(id);                   </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE INDEX</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# create index idx_pgsql_detail_id on tab_pgsql_detail using btree(id);                   </span></span>
<span class="line"><span style="color:#24292e;">CREATE INDEX</span></span></code></pre></div><p>DB object包含: tablespace，database, schema, table, column, view, index, sequence, function, trigger等。 (1) 对象按类别带上标识，表tab,索引idx，视图v，函数fun等。 (2) 不建议以dba_、pgxl_、pg_、pgxc_开头，避免与系统对象、dba人员使用对象混淆。 (3) 建议使用小写字母、数字、下划线的组合。</p><p>(4) 临时中间表或临时备份表建议加上日期, 如tab_tmp_2020_10_12、tab_bak_2020_10_12；</p>`,45),o=[l];function t(c,i,r,d,_,y){return n(),a("div",null,o)}const m=s(p,[["render",t]]);export{b as __pageData,m as default};
