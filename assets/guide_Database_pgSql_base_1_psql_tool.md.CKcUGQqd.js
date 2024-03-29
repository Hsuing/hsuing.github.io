import{_ as s,c as a,o as n,R as e}from"./chunks/framework.CIzs38F0.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/1_psql_tool.md","filePath":"guide/Database/pgSql/base/1_psql_tool.md","lastUpdated":1711535325000}'),l={name:"guide/Database/pgSql/base/1_psql_tool.md"},p=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\\d命令的格式如下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   \\d [ pattern ]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   \\d [ pattern ] +</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   该命令用于显示每个匹配关系（表，视图，索引，序列）的信息</span></span>
<span class="line"><span style="color:#e1e4e8;">   </span></span>
<span class="line"><span style="color:#e1e4e8;">如果\\d 后面什么都不带，会显示数据库所有的表，视图，索引，序列</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\d后面可以跟视图</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\d+命令显示比\\d更多的信息包括表和列的注释等相关信息</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 匹配不同对象类型的\\d命令</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">           \\dt   显示匹配的表</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">           \\di   显示匹配的索引</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">           \\ds  显示匹配的序列</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">           \\dv  显示匹配的视图</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">           \\df   显示匹配的函数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\\d命令的格式如下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   \\d [ pattern ]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   \\d [ pattern ] +</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   该命令用于显示每个匹配关系（表，视图，索引，序列）的信息</span></span>
<span class="line"><span style="color:#24292e;">   </span></span>
<span class="line"><span style="color:#24292e;">如果\\d 后面什么都不带，会显示数据库所有的表，视图，索引，序列</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\d后面可以跟视图</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\d+命令显示比\\d更多的信息包括表和列的注释等相关信息</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 匹配不同对象类型的\\d命令</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">           \\dt   显示匹配的表</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">           \\di   显示匹配的索引</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">           \\ds  显示匹配的序列</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">           \\dv  显示匹配的视图</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">           \\df   显示匹配的函数</span></span></code></pre></div><h2 id="_1-查看数据库" tabindex="-1">1.查看数据库 <a class="header-anchor" href="#_1-查看数据库" aria-label="Permalink to &quot;1.查看数据库&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ptgres@beta ~]$ psql -U postgres -h 127.0.0.1  -p 5532</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.2)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\l</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\l</span></span>
<span class="line"><span style="color:#e1e4e8;">                                    List of databases</span></span>
<span class="line"><span style="color:#e1e4e8;">      Name       |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges   </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------+----------+----------+------------+------------+-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> advertisedb     | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#e1e4e8;"> agile           | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#e1e4e8;"> eidu            | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ptgres@beta ~]$ psql -U postgres -h 127.0.0.1  -p 5532</span></span>
<span class="line"><span style="color:#24292e;">psql (12.2)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\l</span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\l</span></span>
<span class="line"><span style="color:#24292e;">                                    List of databases</span></span>
<span class="line"><span style="color:#24292e;">      Name       |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges   </span></span>
<span class="line"><span style="color:#24292e;">-----------------+----------+----------+------------+------------+-----------------------</span></span>
<span class="line"><span style="color:#24292e;"> advertisedb     | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#24292e;"> agile           | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#24292e;"> eidu            | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 |</span></span></code></pre></div><h2 id="_2-查看表" tabindex="-1">2.查看表 <a class="header-anchor" href="#_2-查看表" aria-label="Permalink to &quot;2.查看表&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# \\c han</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;han&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">han=# \\d</span></span>
<span class="line"><span style="color:#e1e4e8;">        List of relations</span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema | Name | Type  |  Owner   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+------+-------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | you  | table | postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# \\c han</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;han&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">han=# \\d</span></span>
<span class="line"><span style="color:#24292e;">        List of relations</span></span>
<span class="line"><span style="color:#24292e;"> Schema | Name | Type  |  Owner   </span></span>
<span class="line"><span style="color:#24292e;">--------+------+-------+----------</span></span>
<span class="line"><span style="color:#24292e;"> public | you  | table | postgres</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><h2 id="_3-查看表结构" tabindex="-1">3.查看表结构 <a class="header-anchor" href="#_3-查看表结构" aria-label="Permalink to &quot;3.查看表结构&quot;">​</a></h2><p>\\d后面跟一个表名，表示显示这个表的结构定义</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">han=# \\d you</span></span>
<span class="line"><span style="color:#e1e4e8;">                     Table &quot;public.you&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> Column |       Type        | Collation | Nullable | Default </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+-------------------+-----------+----------+---------</span></span>
<span class="line"><span style="color:#e1e4e8;"> name11 | character varying |           |          | </span></span>
<span class="line"><span style="color:#e1e4e8;"> fdf    | character varying |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">han=# \\d you</span></span>
<span class="line"><span style="color:#24292e;">                     Table &quot;public.you&quot;</span></span>
<span class="line"><span style="color:#24292e;"> Column |       Type        | Collation | Nullable | Default </span></span>
<span class="line"><span style="color:#24292e;">--------+-------------------+-----------+----------+---------</span></span>
<span class="line"><span style="color:#24292e;"> name11 | character varying |           |          | </span></span>
<span class="line"><span style="color:#24292e;"> fdf    | character varying |</span></span></code></pre></div><h2 id="_4-查看索引名字" tabindex="-1">4.查看索引名字 <a class="header-anchor" href="#_4-查看索引名字" aria-label="Permalink to &quot;4.查看索引名字&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\\d 后跟一个索引，可以显示索引的信息</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\\d 后跟一个索引，可以显示索引的信息</span></span></code></pre></div><h2 id="_5-模糊查询" tabindex="-1">5.模糊查询 <a class="header-anchor" href="#_5-模糊查询" aria-label="Permalink to &quot;5.模糊查询&quot;">​</a></h2><p>\\d后面跟通配符如“*” 或“?”</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">han=# \\d y*</span></span>
<span class="line"><span style="color:#e1e4e8;">                     Table &quot;public.you&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> Column |       Type        | Collation | Nullable | Default </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+-------------------+-----------+----------+---------</span></span>
<span class="line"><span style="color:#e1e4e8;"> name11 | character varying |           |          | </span></span>
<span class="line"><span style="color:#e1e4e8;"> fdf    | character varying |           |          |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">han=# \\d y*</span></span>
<span class="line"><span style="color:#24292e;">                     Table &quot;public.you&quot;</span></span>
<span class="line"><span style="color:#24292e;"> Column |       Type        | Collation | Nullable | Default </span></span>
<span class="line"><span style="color:#24292e;">--------+-------------------+-----------+----------+---------</span></span>
<span class="line"><span style="color:#24292e;"> name11 | character varying |           |          | </span></span>
<span class="line"><span style="color:#24292e;"> fdf    | character varying |           |          |</span></span></code></pre></div><h2 id="_6-查看表大小" tabindex="-1">6.查看表大小 <a class="header-anchor" href="#_6-查看表大小" aria-label="Permalink to &quot;6.查看表大小&quot;">​</a></h2><p>\\d+命令显示比\\d更多的信息包括表和列的注释等相关信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">han=# \\d+</span></span>
<span class="line"><span style="color:#e1e4e8;">                   List of relations</span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema | Name | Type  |  Owner   | Size  | Description </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+------+-------+----------+-------+-------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | you  | table | postgres | 16 kB | </span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">han=# \\d+</span></span>
<span class="line"><span style="color:#24292e;">                   List of relations</span></span>
<span class="line"><span style="color:#24292e;"> Schema | Name | Type  |  Owner   | Size  | Description </span></span>
<span class="line"><span style="color:#24292e;">--------+------+-------+----------+-------+-------------</span></span>
<span class="line"><span style="color:#24292e;"> public | you  | table | postgres | 16 kB | </span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><h2 id="_7-显示执行时间" tabindex="-1">7.显示执行时间 <a class="header-anchor" href="#_7-显示执行时间" aria-label="Permalink to &quot;7.显示执行时间&quot;">​</a></h2><p>可以使用\\timing on 命令开启计时功能，如果要关闭，使用\\timing off关闭计时功能</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">han=# \\timing on</span></span>
<span class="line"><span style="color:#e1e4e8;">Timing is on.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">han=# \\d+</span></span>
<span class="line"><span style="color:#e1e4e8;">                   List of relations</span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema | Name | Type  |  Owner   | Size  | Description </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+------+-------+----------+-------+-------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | you  | table | postgres | 16 kB | </span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">han=# select * from you ;</span></span>
<span class="line"><span style="color:#e1e4e8;"> name11 |   fdf   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+---------</span></span>
<span class="line"><span style="color:#e1e4e8;"> han    | student</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 0.479 ms</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">han=# \\timing on</span></span>
<span class="line"><span style="color:#24292e;">Timing is on.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">han=# \\d+</span></span>
<span class="line"><span style="color:#24292e;">                   List of relations</span></span>
<span class="line"><span style="color:#24292e;"> Schema | Name | Type  |  Owner   | Size  | Description </span></span>
<span class="line"><span style="color:#24292e;">--------+------+-------+----------+-------+-------------</span></span>
<span class="line"><span style="color:#24292e;"> public | you  | table | postgres | 16 kB | </span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">han=# select * from you ;</span></span>
<span class="line"><span style="color:#24292e;"> name11 |   fdf   </span></span>
<span class="line"><span style="color:#24292e;">--------+---------</span></span>
<span class="line"><span style="color:#24292e;"> han    | student</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Time: 0.479 ms</span></span></code></pre></div><h2 id="_8-列出所有schema" tabindex="-1">8.列出所有schema <a class="header-anchor" href="#_8-列出所有schema" aria-label="Permalink to &quot;8.列出所有schema&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">han=# \\dn</span></span>
<span class="line"><span style="color:#e1e4e8;">  List of schemas</span></span>
<span class="line"><span style="color:#e1e4e8;">  Name  |  Owner   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">han=# \\dn</span></span>
<span class="line"><span style="color:#24292e;">  List of schemas</span></span>
<span class="line"><span style="color:#24292e;">  Name  |  Owner   </span></span>
<span class="line"><span style="color:#24292e;">--------+----------</span></span>
<span class="line"><span style="color:#24292e;"> public | postgres</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><h2 id="_9-列出所有表空间" tabindex="-1">9.列出所有表空间 <a class="header-anchor" href="#_9-列出所有表空间" aria-label="Permalink to &quot;9.列出所有表空间&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">han=# \\db</span></span>
<span class="line"><span style="color:#e1e4e8;">       List of tablespaces</span></span>
<span class="line"><span style="color:#e1e4e8;">    Name    |  Owner   | Location </span></span>
<span class="line"><span style="color:#e1e4e8;">------------+----------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_default | postgres | </span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_global  | postgres | </span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">han=# \\db</span></span>
<span class="line"><span style="color:#24292e;">       List of tablespaces</span></span>
<span class="line"><span style="color:#24292e;">    Name    |  Owner   | Location </span></span>
<span class="line"><span style="color:#24292e;">------------+----------+----------</span></span>
<span class="line"><span style="color:#24292e;"> pg_default | postgres | </span></span>
<span class="line"><span style="color:#24292e;"> pg_global  | postgres | </span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span></code></pre></div><h2 id="_10-列出所有用户" tabindex="-1">10.列出所有用户 <a class="header-anchor" href="#_10-列出所有用户" aria-label="Permalink to &quot;10.列出所有用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">han=# \\du</span></span>
<span class="line"><span style="color:#e1e4e8;">                                   List of roles</span></span>
<span class="line"><span style="color:#e1e4e8;"> Role name |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">han=# \\dg</span></span>
<span class="line"><span style="color:#e1e4e8;">                                   List of roles</span></span>
<span class="line"><span style="color:#e1e4e8;"> Role name |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">han=# \\du</span></span>
<span class="line"><span style="color:#24292e;">                                   List of roles</span></span>
<span class="line"><span style="color:#24292e;"> Role name |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#24292e;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#24292e;"> postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">han=# \\dg</span></span>
<span class="line"><span style="color:#24292e;">                                   List of roles</span></span>
<span class="line"><span style="color:#24292e;"> Role name |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#24292e;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#24292e;"> postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}</span></span></code></pre></div><h2 id="_11-权限分配情况" tabindex="-1">11.权限分配情况 <a class="header-anchor" href="#_11-权限分配情况" aria-label="Permalink to &quot;11.权限分配情况&quot;">​</a></h2><p>\\dp或者\\z</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\\dp talbe_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\\dp talbe_name</span></span></code></pre></div><h2 id="_12-执行文件中的命令" tabindex="-1">12.执行文件中的命令 <a class="header-anchor" href="#_12-执行文件中的命令" aria-label="Permalink to &quot;12.执行文件中的命令&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">一般\\i用于执行sql文件的脚本</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">一般\\i用于执行sql文件的脚本</span></span></code></pre></div><h2 id="_13-指定字符集编译的命令" tabindex="-1">13.<strong>指定字符集编译的命令</strong> <a class="header-anchor" href="#_13-指定字符集编译的命令" aria-label="Permalink to &quot;13.**指定字符集编译的命令**&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">当客户端的字符编码与服务器不一致时，可能出现乱码现象，可以使用\\encoding命令指定客户端的字符编码。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    比如：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   \\encoding gbk    设置客户端的字符编码为gbk.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   \\encoding utf8    设置客户端的字符编码为uft8</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">当客户端的字符编码与服务器不一致时，可能出现乱码现象，可以使用\\encoding命令指定客户端的字符编码。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    比如：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   \\encoding gbk    设置客户端的字符编码为gbk.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   \\encoding utf8    设置客户端的字符编码为uft8</span></span></code></pre></div><h2 id="_14-pset-命令" tabindex="-1">14.<strong>pset 命令</strong> <a class="header-anchor" href="#_14-pset-命令" aria-label="Permalink to &quot;14.**pset 命令**&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> \\pset命令用于设置输出的格式</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    \\pset border 0:表示输出内容无边框</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    \\pset border 1:表示边框只在内部存在</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    \\pset border 2:表示内外都有边框</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> \\pset命令用于设置输出的格式</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    \\pset border 0:表示输出内容无边框</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    \\pset border 1:表示边框只在内部存在</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    \\pset border 2:表示内外都有边框</span></span></code></pre></div><h2 id="_15-x命令" tabindex="-1">15.x命令 <a class="header-anchor" href="#_15-x命令" aria-label="Permalink to &quot;15.x命令&quot;">​</a></h2><p>使用\\x命令，可以把表中的每一行的每列数据都拆分为单行展示，这种适合列比较多，界面显示不全的情况下比较有用</p><p>通过使用? 可以获取到更多的命令的解释</p>`,37),o=[p];function c(t,i,r,d,y,h){return n(),a("div",null,o)}const b=s(l,[["render",c]]);export{g as __pageData,b as default};
