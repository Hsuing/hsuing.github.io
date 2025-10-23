import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1.acl","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/usermanager/3-acl.md","filePath":"guide/Database/pgSql/usermanager/3-acl.md","lastUpdated":1711694824000}'),t={name:"guide/Database/pgSql/usermanager/3-acl.md"},l=n(`<h1 id="_1-acl" tabindex="-1">1.acl <a class="header-anchor" href="#_1-acl" aria-label="Permalink to &quot;1.acl&quot;">​</a></h1><ul><li>ACL 权限列表</li></ul><table><thead><tr><th style="text-align:center;">Relacl Code</th><th style="text-align:center;">Privilege Name</th></tr></thead><tbody><tr><td style="text-align:center;">a</td><td style="text-align:center;">INSERT</td></tr><tr><td style="text-align:center;">r</td><td style="text-align:center;">SELECT</td></tr><tr><td style="text-align:center;">w</td><td style="text-align:center;">UPDATE</td></tr><tr><td style="text-align:center;">d</td><td style="text-align:center;">DELETE</td></tr><tr><td style="text-align:center;">D</td><td style="text-align:center;">TRUNCATE</td></tr><tr><td style="text-align:center;">x</td><td style="text-align:center;">REFERENCES</td></tr><tr><td style="text-align:center;">t</td><td style="text-align:center;">TRIGGER</td></tr><tr><td style="text-align:center;">arwdDxt</td><td style="text-align:center;">ALL</td></tr></tbody></table><ul><li><a href="http://etutorials.org/SQL/Postgresql/Part+III+PostgreSQL+Administration/Chapter+21.+Security/Securing+Tables/" target="_blank" rel="noreferrer">Securing Tables</a></li><li><a href="http://www.depesz.com/2012/08/19/waiting-for-9-3-implement-sql-standard-lateral-subqueries/" target="_blank" rel="noreferrer">WAITING FOR 9.3 – IMPLEMENT SQL-STANDARD LATERAL SUBQUERIES</a></li><li><a href="http://www.postgresql.org/docs/9.3/static/infoschema-table-privileges.html" target="_blank" rel="noreferrer">table_privileges</a></li><li><a href="http://www.postgresql.org/docs/9.3/static/sql-grant.html" target="_blank" rel="noreferrer">grant</a></li></ul><h2 id="_1-通过-dp-元子命令" tabindex="-1">1. 通过 \\dp 元子命令 <a class="header-anchor" href="#_1-通过-dp-元子命令" aria-label="Permalink to &quot;1. 通过 \\dp 元子命令&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres@127.0.0.1 ~=#\\dp pg_stat_statements;</span></span>
<span class="line"><span style="color:#e1e4e8;">                                       Access privileges</span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema |        Name        | Type |     Access privileges     | Column privileges | Policies </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+--------------------+------+---------------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | pg_stat_statements | view | postgres=arwdDxt/postgres+|                   | </span></span>
<span class="line"><span style="color:#e1e4e8;">        |                    |      | =r/postgres               |                   |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres@127.0.0.1 ~=#\\dp pg_stat_statements;</span></span>
<span class="line"><span style="color:#24292e;">                                       Access privileges</span></span>
<span class="line"><span style="color:#24292e;"> Schema |        Name        | Type |     Access privileges     | Column privileges | Policies </span></span>
<span class="line"><span style="color:#24292e;">--------+--------------------+------+---------------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#24292e;"> public | pg_stat_statements | view | postgres=arwdDxt/postgres+|                   | </span></span>
<span class="line"><span style="color:#24292e;">        |                    |      | =r/postgres               |                   |</span></span></code></pre></div><h2 id="_2-通过-aclexplode-函数" tabindex="-1">2.通过 aclexplode 函数 <a class="header-anchor" href="#_2-通过-aclexplode-函数" aria-label="Permalink to &quot;2.通过 aclexplode 函数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres@127.0.0.1 ~=# select oid,relname ,relacl from pg_class where relname=&#39;pg_stat_statements&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">  oid  |      relname       |                 relacl                  </span></span>
<span class="line"><span style="color:#e1e4e8;">-------+--------------------+-----------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 16388 | pg_stat_statements | {postgres=arwdDxt/postgres,=r/postgres}</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres@127.0.0.1 ~=# select oid,relname ,relacl from pg_class where relname=&#39;pg_stat_statements&#39;;</span></span>
<span class="line"><span style="color:#24292e;">  oid  |      relname       |                 relacl                  </span></span>
<span class="line"><span style="color:#24292e;">-------+--------------------+-----------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 16388 | pg_stat_statements | {postgres=arwdDxt/postgres,=r/postgres}</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p>解析：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">=#select * From aclexplode(&#39;{postgres=arwdDxt/postgres,=r/postgres}&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"> grantor | grantee | privilege_type | is_grantable </span></span>
<span class="line"><span style="color:#e1e4e8;">---------+---------+----------------+--------------</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |      10 | INSERT         | f</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |      10 | SELECT         | f</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |      10 | UPDATE         | f</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |      10 | DELETE         | f</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |      10 | TRUNCATE       | f</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |      10 | REFERENCES     | f</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |      10 | TRIGGER        | f</span></span>
<span class="line"><span style="color:#e1e4e8;">      10 |       0 | SELECT         | f</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">#找到对应用户</span></span>
<span class="line"><span style="color:#e1e4e8;">#select oid,rolname from pg_roles where oid in (10,0);</span></span>
<span class="line"><span style="color:#e1e4e8;"> oid | rolname  </span></span>
<span class="line"><span style="color:#e1e4e8;">-----+----------</span></span>
<span class="line"><span style="color:#e1e4e8;">  10 | postgres</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">=#select * From aclexplode(&#39;{postgres=arwdDxt/postgres,=r/postgres}&#39;);</span></span>
<span class="line"><span style="color:#24292e;"> grantor | grantee | privilege_type | is_grantable </span></span>
<span class="line"><span style="color:#24292e;">---------+---------+----------------+--------------</span></span>
<span class="line"><span style="color:#24292e;">      10 |      10 | INSERT         | f</span></span>
<span class="line"><span style="color:#24292e;">      10 |      10 | SELECT         | f</span></span>
<span class="line"><span style="color:#24292e;">      10 |      10 | UPDATE         | f</span></span>
<span class="line"><span style="color:#24292e;">      10 |      10 | DELETE         | f</span></span>
<span class="line"><span style="color:#24292e;">      10 |      10 | TRUNCATE       | f</span></span>
<span class="line"><span style="color:#24292e;">      10 |      10 | REFERENCES     | f</span></span>
<span class="line"><span style="color:#24292e;">      10 |      10 | TRIGGER        | f</span></span>
<span class="line"><span style="color:#24292e;">      10 |       0 | SELECT         | f</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">#找到对应用户</span></span>
<span class="line"><span style="color:#24292e;">#select oid,rolname from pg_roles where oid in (10,0);</span></span>
<span class="line"><span style="color:#24292e;"> oid | rolname  </span></span>
<span class="line"><span style="color:#24292e;">-----+----------</span></span>
<span class="line"><span style="color:#24292e;">  10 | postgres</span></span></code></pre></div><h2 id="_3-通过-table-privileges-视图" tabindex="-1">3. 通过 table_privileges 视图 <a class="header-anchor" href="#_3-通过-table-privileges-视图" aria-label="Permalink to &quot;3. 通过 table_privileges 视图&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres@127.0.0.1 ~=#select grantor,grantee,table_schema,table_name,privilege_type from information_schema.table_privileges where table_name=&#39;pg_stat_statements&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"> grantor  | grantee  | table_schema |     table_name     | privilege_type </span></span>
<span class="line"><span style="color:#e1e4e8;">----------+----------+--------------+--------------------+----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | postgres | public       | pg_stat_statements | INSERT</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | postgres | public       | pg_stat_statements | SELECT</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | postgres | public       | pg_stat_statements | UPDATE</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | postgres | public       | pg_stat_statements | DELETE</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | postgres | public       | pg_stat_statements | TRUNCATE</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | postgres | public       | pg_stat_statements | REFERENCES</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | postgres | public       | pg_stat_statements | TRIGGER</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres | PUBLIC   | public       | pg_stat_statements | SELECT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres@127.0.0.1 ~=#select grantor,grantee,table_schema,table_name,privilege_type from information_schema.table_privileges where table_name=&#39;pg_stat_statements&#39;;</span></span>
<span class="line"><span style="color:#24292e;"> grantor  | grantee  | table_schema |     table_name     | privilege_type </span></span>
<span class="line"><span style="color:#24292e;">----------+----------+--------------+--------------------+----------------</span></span>
<span class="line"><span style="color:#24292e;"> postgres | postgres | public       | pg_stat_statements | INSERT</span></span>
<span class="line"><span style="color:#24292e;"> postgres | postgres | public       | pg_stat_statements | SELECT</span></span>
<span class="line"><span style="color:#24292e;"> postgres | postgres | public       | pg_stat_statements | UPDATE</span></span>
<span class="line"><span style="color:#24292e;"> postgres | postgres | public       | pg_stat_statements | DELETE</span></span>
<span class="line"><span style="color:#24292e;"> postgres | postgres | public       | pg_stat_statements | TRUNCATE</span></span>
<span class="line"><span style="color:#24292e;"> postgres | postgres | public       | pg_stat_statements | REFERENCES</span></span>
<span class="line"><span style="color:#24292e;"> postgres | postgres | public       | pg_stat_statements | TRIGGER</span></span>
<span class="line"><span style="color:#24292e;"> postgres | PUBLIC   | public       | pg_stat_statements | SELECT</span></span></code></pre></div>`,12),p=[l];function r(o,c,i,g,d,_){return e(),a("div",null,p)}const h=s(t,[["render",r]]);export{m as __pageData,h as default};
