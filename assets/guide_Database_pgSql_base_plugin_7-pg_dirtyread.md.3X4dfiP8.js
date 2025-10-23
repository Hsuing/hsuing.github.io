import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/plugin/7-pg_dirtyread.md","filePath":"guide/Database/pgSql/base/plugin/7-pg_dirtyread.md","lastUpdated":1711706009000}'),l={name:"guide/Database/pgSql/base/plugin/7-pg_dirtyread.md"},o=p(`<h2 id="_1-介绍" tabindex="-1">1.介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1.介绍&quot;">​</a></h2><p>误删数据总是在所难免，一种是使用延时备库，在延迟间隔内可以从备库恢复数据，另一种使用开源插件pg_dirtyread，pg_dirtyread使用时需要关闭表的自动清理功能（可以读取<strong>未被vacuum</strong>的dead数据），不然可能也恢复不了</p><h3 id="闪回" tabindex="-1">闪回 <a class="header-anchor" href="#闪回" aria-label="Permalink to &quot;闪回&quot;">​</a></h3><p>DML闪回和DDL闪回。</p><p>DML闪回指对INSET, UPDATE, DELETE操作的闪回。</p><p>DDL闪回指DROP, TRUNCATE操作的闪回</p><h3 id="闪回的实现分两种" tabindex="-1">闪回的实现分两种： <a class="header-anchor" href="#闪回的实现分两种" aria-label="Permalink to &quot;闪回的实现分两种：&quot;">​</a></h3><p>1、物理回退，相当于使用物理备份和归档进行时间点恢复，全库恢复到误操作前的状态。</p><p>（可以新建一个库用于恢复，恢复到目标时间点，恢复后，将误操作前的数据导出来，再导入线上数据库。）</p><p>2、在当前库回退，在当前库，将误操作影响的数据找出来。</p><h3 id="闪回的手段" tabindex="-1">闪回的手段： <a class="header-anchor" href="#闪回的手段" aria-label="Permalink to &quot;闪回的手段：&quot;">​</a></h3><p>1、物理回退，PG内核已支持时间点恢复，只要有误操作前的全量备份和所有归档即可。</p><p>2、当前库回退，使用HOOK，可以实现DROP和TRUNCATE操作的回收站功能。</p><p>3、使用延迟垃圾回收、脏读、行头事务号、事务提交日志，可以实现DML操作的闪回</p><h2 id="_2-支持的版本" tabindex="-1">2.支持的版本 <a class="header-anchor" href="#_2-支持的版本" aria-label="Permalink to &quot;2.支持的版本&quot;">​</a></h2><p>10和11已经支持，2.0以后的版本已经支持12和13</p><h2 id="_3-编译安装扩展" tabindex="-1">3.编译安装扩展 <a class="header-anchor" href="#_3-编译安装扩展" aria-label="Permalink to &quot;3.编译安装扩展&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#下载</span></span>
<span class="line"><span style="color:#e1e4e8;"># wget https://github.com/df7cb/pg_dirtyread/archive/refs/tags/2.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"># tar -zxvf ./2.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd pg_dirtyread-2.2</span></span>
<span class="line"><span style="color:#e1e4e8;"># make</span></span>
<span class="line"><span style="color:#e1e4e8;"># make install PG_CONFIG=/opt/pg12/bin/pg_config（根据路径修改）</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/mkdir -p &#39;/data/apps/pgsql/12/lib&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/mkdir -p &#39;/data/apps/pgsql/12/share/extension&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/mkdir -p &#39;/data/apps/pgsql/12/share/extension&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/install -c -m 755  pg_dirtyread.so &#39;/data/apps/pgsql/12/lib/pg_dirtyread.so&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/install -c -m 644 .//pg_dirtyread.control &#39;/data/apps/pgsql/12/share/extension/&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/install -c -m 644 .//pg_dirtyread--1.0.sql .//pg_dirtyread--1.0--2.sql .//pg_dirtyread--2.sql  &#39;/data/apps/pgsql/12/share/extension/&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#下载</span></span>
<span class="line"><span style="color:#24292e;"># wget https://github.com/df7cb/pg_dirtyread/archive/refs/tags/2.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"># tar -zxvf ./2.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"># cd pg_dirtyread-2.2</span></span>
<span class="line"><span style="color:#24292e;"># make</span></span>
<span class="line"><span style="color:#24292e;"># make install PG_CONFIG=/opt/pg12/bin/pg_config（根据路径修改）</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/mkdir -p &#39;/data/apps/pgsql/12/lib&#39;</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/mkdir -p &#39;/data/apps/pgsql/12/share/extension&#39;</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/mkdir -p &#39;/data/apps/pgsql/12/share/extension&#39;</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/install -c -m 755  pg_dirtyread.so &#39;/data/apps/pgsql/12/lib/pg_dirtyread.so&#39;</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/install -c -m 644 .//pg_dirtyread.control &#39;/data/apps/pgsql/12/share/extension/&#39;</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/install -c -m 644 .//pg_dirtyread--1.0.sql .//pg_dirtyread--1.0--2.sql .//pg_dirtyread--2.sql  &#39;/data/apps/pgsql/12/share/extension/&#39;</span></span></code></pre></div><h2 id="_4-创建扩展和测试表" tabindex="-1">4.创建扩展和测试表 <a class="header-anchor" href="#_4-创建扩展和测试表" aria-label="Permalink to &quot;4.创建扩展和测试表&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ psql </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p5555 </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Upostgres</span></span>
<span class="line"><span style="color:#E1E4E8;">psql (</span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">Type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;help&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> help.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> EXTENSION pg_dirtyread;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> EXTENSION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> extension pageinspect;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> EXTENSION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#查看</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\dx</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> pg_dirtyread</span></span>
<span class="line"><span style="color:#E1E4E8;">Objects </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> extension </span><span style="color:#9ECBFF;">&quot;pg_dirtyread&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">description</span><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#6A737D;">---------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> pg_dirtyread(regclass)</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> t(id </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">,info </span><span style="color:#F97583;">text</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">insert into</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">values</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;aaa&#39;</span><span style="color:#E1E4E8;">),(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;bbb&#39;</span><span style="color:#E1E4E8;">),(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;ccc&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> t;</span></span>
<span class="line"><span style="color:#E1E4E8;"> id | info </span></span>
<span class="line"><span style="color:#6A737D;">----+------</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | aaa</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> | bbb</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> | ccc</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> ctid,</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> t;</span></span>
<span class="line"><span style="color:#E1E4E8;"> ctid  | id | info </span></span>
<span class="line"><span style="color:#6A737D;">-------+----+------</span></span>
<span class="line"><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) |  </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | aaa</span></span>
<span class="line"><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) |  </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> | bbb</span></span>
<span class="line"><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">) |  </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> | ccc</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> lp </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">#   </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> heap_page_items(get_raw_page(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#6A737D;">-------+--------+--------</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">--前三行数据是一个事务语句插入的，所以xmin都是506</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">insert into</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">values</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;ddd&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> lp </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> heap_page_items(get_raw_page(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#6A737D;">-------+--------+--------</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">507</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">--新插入一行，xmin变为507</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ psql </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p5555 </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Upostgres</span></span>
<span class="line"><span style="color:#24292E;">psql (</span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">Type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;help&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> help.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> EXTENSION pg_dirtyread;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> EXTENSION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> extension pageinspect;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> EXTENSION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#查看</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\dx</span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> pg_dirtyread</span></span>
<span class="line"><span style="color:#24292E;">Objects </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> extension </span><span style="color:#032F62;">&quot;pg_dirtyread&quot;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">description</span><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#6A737D;">---------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> pg_dirtyread(regclass)</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> t(id </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">,info </span><span style="color:#D73A49;">text</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">insert into</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">values</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;aaa&#39;</span><span style="color:#24292E;">),(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;bbb&#39;</span><span style="color:#24292E;">),(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;ccc&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> t;</span></span>
<span class="line"><span style="color:#24292E;"> id | info </span></span>
<span class="line"><span style="color:#6A737D;">----+------</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | aaa</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> | bbb</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> | ccc</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> ctid,</span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> t;</span></span>
<span class="line"><span style="color:#24292E;"> ctid  | id | info </span></span>
<span class="line"><span style="color:#6A737D;">-------+----+------</span></span>
<span class="line"><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) |  </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | aaa</span></span>
<span class="line"><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) |  </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> | bbb</span></span>
<span class="line"><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">) |  </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> | ccc</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> lp </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">#   </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> heap_page_items(get_raw_page(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#6A737D;">-------+--------+--------</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">--前三行数据是一个事务语句插入的，所以xmin都是506</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">insert into</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">values</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;ddd&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> lp </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> heap_page_items(get_raw_page(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#6A737D;">-------+--------+--------</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">507</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">--新插入一行，xmin变为507</span></span></code></pre></div><h2 id="_5-删除行后再查看" tabindex="-1">5.删除行后再查看 <a class="header-anchor" href="#_5-删除行后再查看" aria-label="Permalink to &quot;5.删除行后再查看&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> id</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> ctid,xmin,xmax,</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> t;</span></span>
<span class="line"><span style="color:#E1E4E8;"> ctid  | xmin | xmax | id | info </span></span>
<span class="line"><span style="color:#6A737D;">-------+------+------+----+------</span></span>
<span class="line"><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) |  </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> |  </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | aaa</span></span>
<span class="line"><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">) |  </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> |  </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> | ccc</span></span>
<span class="line"><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">) |  </span><span style="color:#79B8FF;">507</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> |  </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> | ddd</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">--删除id=2后的行已经看不见</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> lp </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> heap_page_items(get_raw_page(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#6A737D;">-------+--------+--------</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">508</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">506</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">507</span><span style="color:#E1E4E8;"> |      </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">--通过插件查看，实际行数据是存在的，只是不可见而已</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> id</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> ctid,xmin,xmax,</span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> t;</span></span>
<span class="line"><span style="color:#24292E;"> ctid  | xmin | xmax | id | info </span></span>
<span class="line"><span style="color:#6A737D;">-------+------+------+----+------</span></span>
<span class="line"><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) |  </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> |  </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | aaa</span></span>
<span class="line"><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">) |  </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> |  </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> | ccc</span></span>
<span class="line"><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">) |  </span><span style="color:#005CC5;">507</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> |  </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> | ddd</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">--删除id=2后的行已经看不见</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> lp </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> heap_page_items(get_raw_page(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#6A737D;">-------+--------+--------</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">508</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">506</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">507</span><span style="color:#24292E;"> |      </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">--通过插件查看，实际行数据是存在的，只是不可见而已</span></span></code></pre></div><h2 id="_6-手工对表做一下清理" tabindex="-1">6.手工对表做一下清理 <a class="header-anchor" href="#_6-手工对表做一下清理" aria-label="Permalink to &quot;6.手工对表做一下清理&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# vacuum t;</span></span>
<span class="line"><span style="color:#e1e4e8;">VACUUM</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select lp as tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#e1e4e8;">  from heap_page_items(get_raw_page(&#39;t&#39;,0));</span></span>
<span class="line"><span style="color:#e1e4e8;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#e1e4e8;">-------+--------+--------</span></span>
<span class="line"><span style="color:#e1e4e8;">     1 |    506 |      0</span></span>
<span class="line"><span style="color:#e1e4e8;">     2 |        |       </span></span>
<span class="line"><span style="color:#e1e4e8;">     3 |    506 |      0</span></span>
<span class="line"><span style="color:#e1e4e8;">     4 |    507 |      0</span></span>
<span class="line"><span style="color:#e1e4e8;">(4 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;">--可以看到第2个块已经清理了</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# vacuum FULL t;</span></span>
<span class="line"><span style="color:#e1e4e8;">VACUUM</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select lp as tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#e1e4e8;">  from heap_page_items(get_raw_page(&#39;t&#39;,0));</span></span>
<span class="line"><span style="color:#e1e4e8;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#e1e4e8;">-------+--------+--------</span></span>
<span class="line"><span style="color:#e1e4e8;">     1 |    506 |      0</span></span>
<span class="line"><span style="color:#e1e4e8;">     2 |    506 |      0</span></span>
<span class="line"><span style="color:#e1e4e8;">     3 |    507 |      0</span></span>
<span class="line"><span style="color:#e1e4e8;">(3 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;">--做完碎片整理后再查看更清晰</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select ctid,* from t;</span></span>
<span class="line"><span style="color:#e1e4e8;"> ctid  | id | info </span></span>
<span class="line"><span style="color:#e1e4e8;">-------+----+------</span></span>
<span class="line"><span style="color:#e1e4e8;"> (0,1) |  1 | aaa</span></span>
<span class="line"><span style="color:#e1e4e8;"> (0,2) |  3 | ccc</span></span>
<span class="line"><span style="color:#e1e4e8;"> (0,3) |  4 | ddd</span></span>
<span class="line"><span style="color:#e1e4e8;">(3 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# vacuum t;</span></span>
<span class="line"><span style="color:#24292e;">VACUUM</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select lp as tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#24292e;">  from heap_page_items(get_raw_page(&#39;t&#39;,0));</span></span>
<span class="line"><span style="color:#24292e;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#24292e;">-------+--------+--------</span></span>
<span class="line"><span style="color:#24292e;">     1 |    506 |      0</span></span>
<span class="line"><span style="color:#24292e;">     2 |        |       </span></span>
<span class="line"><span style="color:#24292e;">     3 |    506 |      0</span></span>
<span class="line"><span style="color:#24292e;">     4 |    507 |      0</span></span>
<span class="line"><span style="color:#24292e;">(4 rows)</span></span>
<span class="line"><span style="color:#24292e;">--可以看到第2个块已经清理了</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# vacuum FULL t;</span></span>
<span class="line"><span style="color:#24292e;">VACUUM</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select lp as tuple,t_xmin,t_xmax</span></span>
<span class="line"><span style="color:#24292e;">  from heap_page_items(get_raw_page(&#39;t&#39;,0));</span></span>
<span class="line"><span style="color:#24292e;"> tuple | t_xmin | t_xmax </span></span>
<span class="line"><span style="color:#24292e;">-------+--------+--------</span></span>
<span class="line"><span style="color:#24292e;">     1 |    506 |      0</span></span>
<span class="line"><span style="color:#24292e;">     2 |    506 |      0</span></span>
<span class="line"><span style="color:#24292e;">     3 |    507 |      0</span></span>
<span class="line"><span style="color:#24292e;">(3 rows)</span></span>
<span class="line"><span style="color:#24292e;">--做完碎片整理后再查看更清晰</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select ctid,* from t;</span></span>
<span class="line"><span style="color:#24292e;"> ctid  | id | info </span></span>
<span class="line"><span style="color:#24292e;">-------+----+------</span></span>
<span class="line"><span style="color:#24292e;"> (0,1) |  1 | aaa</span></span>
<span class="line"><span style="color:#24292e;"> (0,2) |  3 | ccc</span></span>
<span class="line"><span style="color:#24292e;"> (0,3) |  4 | ddd</span></span>
<span class="line"><span style="color:#24292e;">(3 rows)</span></span></code></pre></div><h2 id="_7-pg-dirtyread使用" tabindex="-1">7.pg_dirtyread使用 <a class="header-anchor" href="#_7-pg-dirtyread使用" aria-label="Permalink to &quot;7.pg_dirtyread使用&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">.1版本之后支持pg12</span></span>
<span class="line"><span style="color:#6A737D;">--先关闭表的自动清理</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">#   </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres(#     autovacuum_enabled </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> false, </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres(#     </span><span style="color:#79B8FF;">toast</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">autovacuum_enabled</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> false</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres(#   );</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--插入两条测试数据</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">#  </span><span style="color:#F97583;">insert into</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">values</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;eee&#39;</span><span style="color:#E1E4E8;">),(</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;fff&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--模拟误操作，删除刚才的两条数据</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> id</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--此时查看发现上一步操作错了</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> t;</span></span>
<span class="line"><span style="color:#E1E4E8;"> id | info </span></span>
<span class="line"><span style="color:#6A737D;">----+------</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | aaa</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> | ccc</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> | ddd</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 使用pg_dirtyread函数传入需要恢复的表名，as后面接自定义表结构(与原表结构一致)</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_dirtyread(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> recovery_t(id </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">,info </span><span style="color:#F97583;">text</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;"> id | info </span></span>
<span class="line"><span style="color:#6A737D;">----+------</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | aaa</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> | ccc</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> | ddd</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> | eee</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> | fff</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">2</span><span style="color:#24292E;">.1版本之后支持pg12</span></span>
<span class="line"><span style="color:#6A737D;">--先关闭表的自动清理</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">#   </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">postgres(#     autovacuum_enabled </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> false, </span></span>
<span class="line"><span style="color:#24292E;">postgres(#     </span><span style="color:#005CC5;">toast</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">autovacuum_enabled</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> false</span></span>
<span class="line"><span style="color:#24292E;">postgres(#   );</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--插入两条测试数据</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">#  </span><span style="color:#D73A49;">insert into</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">values</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;eee&#39;</span><span style="color:#24292E;">),(</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;fff&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--模拟误操作，删除刚才的两条数据</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> id</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--此时查看发现上一步操作错了</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> t;</span></span>
<span class="line"><span style="color:#24292E;"> id | info </span></span>
<span class="line"><span style="color:#6A737D;">----+------</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | aaa</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> | ccc</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> | ddd</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 使用pg_dirtyread函数传入需要恢复的表名，as后面接自定义表结构(与原表结构一致)</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_dirtyread(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> recovery_t(id </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">,info </span><span style="color:#D73A49;">text</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;"> id | info </span></span>
<span class="line"><span style="color:#6A737D;">----+------</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | aaa</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> | ccc</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> | ddd</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> | eee</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> | fff</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span></code></pre></div><p>参考：<a href="https://developer.aliyun.com/article/617340" target="_blank" rel="noreferrer">https://developer.aliyun.com/article/617340</a></p>`,27),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const g=s(l,[["render",c]]);export{C as __pageData,g as default};
