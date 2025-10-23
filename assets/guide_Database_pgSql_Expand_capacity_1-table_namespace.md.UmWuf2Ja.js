import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const D=JSON.parse('{"title":"PosgreSQL三种表空间使用方式","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/Expand_capacity/1-table_namespace.md","filePath":"guide/Database/pgSql/Expand_capacity/1-table_namespace.md","lastUpdated":1711525185000}'),l={name:"guide/Database/pgSql/Expand_capacity/1-table_namespace.md"},o=p(`<h1 id="posgresql三种表空间使用方式" tabindex="-1">PosgreSQL三种表空间使用方式 <a class="header-anchor" href="#posgresql三种表空间使用方式" aria-label="Permalink to &quot;PosgreSQL三种表空间使用方式&quot;">​</a></h1><blockquote><p>第一种：懒汉模式 直接使用系统默认表空间pg_default,不需要知道表空间的概念</p></blockquote><blockquote><p>第二种：悲观模式</p><p>用户预先创建好文件系统目录，创建自定义表空间，再创建数据库，建库使用自定义表空间，以后使用过程中直接创建表无需关注表空间，无感知。这也是推荐比较良好的使用习惯</p></blockquote><blockquote><p>第三种：乐观模式 不够用或者出问题再扩容 不管是使用默认表空间或者自定义表空间也有可能会出现空间满的情况，这时可以在现有库对新表指定新的表空间来满足使用。</p></blockquote><h1 id="代码演示" tabindex="-1">代码演示 <a class="header-anchor" href="#代码演示" aria-label="Permalink to &quot;代码演示&quot;">​</a></h1><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">-- pg_default是初始化后的默认表空间，oid为1663</span></span>
<span class="line"><span style="color:#6A737D;">-- my_tablespace是新建的表空间，oid为24692</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">,spcname </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_tablespace ;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  |    spcname    </span></span>
<span class="line"><span style="color:#6A737D;">-------+---------------</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1663</span><span style="color:#E1E4E8;"> | pg_default</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1664</span><span style="color:#E1E4E8;"> | pg_global</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">24692</span><span style="color:#E1E4E8;"> | my_tablespace</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 初始化后默认有三个数据库，template0和template1，一般不能直接使用</span></span>
<span class="line"><span style="color:#6A737D;">-- 另一个postgres数据库oid为13593</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">,datname </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_database ;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  |  datname  </span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">13593</span><span style="color:#E1E4E8;"> | postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | template1</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">13592</span><span style="color:#E1E4E8;"> | template0</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 第一种：postgres数据库创建数据表t</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> t(id </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">,info </span><span style="color:#F97583;">text</span><span style="color:#E1E4E8;">) ;</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> to_regclass(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">)::</span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> to_regclass </span></span>
<span class="line"><span style="color:#6A737D;">-------------</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">24674</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--查看文件存储位置</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> pg_relation_filepath(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_relation_filepath </span></span>
<span class="line"><span style="color:#6A737D;">----------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> base</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">13593</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">24674</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">-- base为$PGDATA下的目录，默认表空间pg_default放在此目录下</span></span>
<span class="line"><span style="color:#6A737D;">-- 13593代表数据库postgres</span></span>
<span class="line"><span style="color:#6A737D;">-- 24674是上面t表的oid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 新建数据库test,并指定表空间</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> user test </span><span style="color:#F97583;">password</span><span style="color:#9ECBFF;">&#39;123456&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> test </span><span style="color:#F97583;">owner=</span><span style="color:#E1E4E8;">test tablespace</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">my_tablespace;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 查看数据库，可以看到test数据库的oid为24693</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">,datname </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_database ;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  |  datname  </span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">13593</span><span style="color:#E1E4E8;"> | postgres</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">24693</span><span style="color:#E1E4E8;"> | test</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | template1</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">13592</span><span style="color:#E1E4E8;"> | template0</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 第二种：test数据库使用test用户创建数据表t</span></span>
<span class="line"><span style="color:#E1E4E8;">test</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> t(id </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">,info </span><span style="color:#F97583;">text</span><span style="color:#E1E4E8;">) ;</span></span>
<span class="line"><span style="color:#E1E4E8;">test</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> to_regclass(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">)::</span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> to_regclass </span></span>
<span class="line"><span style="color:#6A737D;">-------------</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#79B8FF;">24694</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--查看文件存储位置</span></span>
<span class="line"><span style="color:#E1E4E8;">test</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> pg_relation_filepath(</span><span style="color:#9ECBFF;">&#39;t&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            pg_relation_filepath             </span></span>
<span class="line"><span style="color:#6A737D;">---------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_tblspc</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">24692</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">PG_12_201909212</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">24693</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">24694</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">-- pg_tblspc下为符号链接</span></span>
<span class="line"><span style="color:#6A737D;">-- 24692是自定义表空间my_tablespace的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- PG_12_201909212是一个特定命名，12是主版本号，201909212是目录版本号</span></span>
<span class="line"><span style="color:#6A737D;">-- 24693是test数据库的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- 24694是t表的oid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$ ls </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">l pg_tblspc</span><span style="color:#F97583;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">lrwxrwxrwx. </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> postgres dba </span><span style="color:#79B8FF;">17</span><span style="color:#E1E4E8;"> Jan  </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">14</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">07</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">24692</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">opt</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">mytablespace</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 第三种：postgres数据库创建数据表t2，同时指定表空间</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> t2 (id </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">,info </span><span style="color:#F97583;">text</span><span style="color:#E1E4E8;">) tablespace my_tablespace ;</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> pg_relation_filepath(</span><span style="color:#9ECBFF;">&#39;t2&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            pg_relation_filepath             </span></span>
<span class="line"><span style="color:#6A737D;">---------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_tblspc</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">24692</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">PG_12_201909212</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">13593</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">24700</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">-- 24692是自定义表空间my_tablespace的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- 13593是postgres数据库的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- 24700是t2表的oid</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">-- pg_default是初始化后的默认表空间，oid为1663</span></span>
<span class="line"><span style="color:#6A737D;">-- my_tablespace是新建的表空间，oid为24692</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">,spcname </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_tablespace ;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  |    spcname    </span></span>
<span class="line"><span style="color:#6A737D;">-------+---------------</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">1663</span><span style="color:#24292E;"> | pg_default</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">1664</span><span style="color:#24292E;"> | pg_global</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">24692</span><span style="color:#24292E;"> | my_tablespace</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 初始化后默认有三个数据库，template0和template1，一般不能直接使用</span></span>
<span class="line"><span style="color:#6A737D;">-- 另一个postgres数据库oid为13593</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">,datname </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_database ;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  |  datname  </span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">13593</span><span style="color:#24292E;"> | postgres</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | template1</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">13592</span><span style="color:#24292E;"> | template0</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 第一种：postgres数据库创建数据表t</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> t(id </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">,info </span><span style="color:#D73A49;">text</span><span style="color:#24292E;">) ;</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> to_regclass(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">)::</span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> to_regclass </span></span>
<span class="line"><span style="color:#6A737D;">-------------</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#005CC5;">24674</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--查看文件存储位置</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> pg_relation_filepath(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;"> pg_relation_filepath </span></span>
<span class="line"><span style="color:#6A737D;">----------------------</span></span>
<span class="line"><span style="color:#24292E;"> base</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">13593</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">24674</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">-- base为$PGDATA下的目录，默认表空间pg_default放在此目录下</span></span>
<span class="line"><span style="color:#6A737D;">-- 13593代表数据库postgres</span></span>
<span class="line"><span style="color:#6A737D;">-- 24674是上面t表的oid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 新建数据库test,并指定表空间</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> user test </span><span style="color:#D73A49;">password</span><span style="color:#032F62;">&#39;123456&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> test </span><span style="color:#D73A49;">owner=</span><span style="color:#24292E;">test tablespace</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">my_tablespace;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 查看数据库，可以看到test数据库的oid为24693</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">,datname </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_database ;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  |  datname  </span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">13593</span><span style="color:#24292E;"> | postgres</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">24693</span><span style="color:#24292E;"> | test</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | template1</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">13592</span><span style="color:#24292E;"> | template0</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 第二种：test数据库使用test用户创建数据表t</span></span>
<span class="line"><span style="color:#24292E;">test</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> t(id </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">,info </span><span style="color:#D73A49;">text</span><span style="color:#24292E;">) ;</span></span>
<span class="line"><span style="color:#24292E;">test</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> to_regclass(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">)::</span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> to_regclass </span></span>
<span class="line"><span style="color:#6A737D;">-------------</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#005CC5;">24694</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--查看文件存储位置</span></span>
<span class="line"><span style="color:#24292E;">test</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> pg_relation_filepath(</span><span style="color:#032F62;">&#39;t&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            pg_relation_filepath             </span></span>
<span class="line"><span style="color:#6A737D;">---------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_tblspc</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">24692</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">PG_12_201909212</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">24693</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">24694</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">-- pg_tblspc下为符号链接</span></span>
<span class="line"><span style="color:#6A737D;">-- 24692是自定义表空间my_tablespace的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- PG_12_201909212是一个特定命名，12是主版本号，201909212是目录版本号</span></span>
<span class="line"><span style="color:#6A737D;">-- 24693是test数据库的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- 24694是t表的oid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$ ls </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">l pg_tblspc</span><span style="color:#D73A49;">/</span></span>
<span class="line"><span style="color:#24292E;">lrwxrwxrwx. </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> postgres dba </span><span style="color:#005CC5;">17</span><span style="color:#24292E;"> Jan  </span><span style="color:#005CC5;">7</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">14</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">07</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">24692</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">opt</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">mytablespace</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 第三种：postgres数据库创建数据表t2，同时指定表空间</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> t2 (id </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">,info </span><span style="color:#D73A49;">text</span><span style="color:#24292E;">) tablespace my_tablespace ;</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> pg_relation_filepath(</span><span style="color:#032F62;">&#39;t2&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            pg_relation_filepath             </span></span>
<span class="line"><span style="color:#6A737D;">---------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_tblspc</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">24692</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">PG_12_201909212</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">13593</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">24700</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">-- 24692是自定义表空间my_tablespace的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- 13593是postgres数据库的oid</span></span>
<span class="line"><span style="color:#6A737D;">-- 24700是t2表的oid</span></span></code></pre></div>`,6),e=[o];function t(c,r,y,E,i,F){return a(),n("div",null,e)}const _=s(l,[["render",t]]);export{D as __pageData,_ as default};
