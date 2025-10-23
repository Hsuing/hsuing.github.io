import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/plugin/11-mysql_fdw.md","filePath":"guide/Database/pgSql/base/plugin/11-mysql_fdw.md","lastUpdated":1711706009000}'),l={name:"guide/Database/pgSql/base/plugin/11-mysql_fdw.md"},p=a(`<p>参考连接： <a href="https://www.percona.com/blog/2018/08/24/postgresql-accessing-mysql-as-a-data-source-using-mysql_fdw/" target="_blank" rel="noreferrer">https://www.percona.com/blog/2018/08/24/postgresql-accessing-mysql-as-a-data-source-using-mysql_fdw/</a></p><p>mysql_fdw 的作用： 用来在PG中快速访问MySQL中的数据</p><h2 id="_1-编译-mysql-fdw-扩展" tabindex="-1">1.编译 mysql_fdw 扩展 <a class="header-anchor" href="#_1-编译-mysql-fdw-扩展" aria-label="Permalink to &quot;1.编译 mysql_fdw 扩展&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 载入环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">export PATH=/usr/local/pgsql-11.5/bin:$PATH</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果mysql是编译安装的，这里可能还需要载入mysql的环境变量,类似这样 export PATH=/usr/local/mysql:$PATH（我们mysql使用rpm安装，默认的PATH路径可发现，这里就i不用export了）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 开始编译扩展</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /home/postgres/</span></span>
<span class="line"><span style="color:#e1e4e8;">git clone https://github.com/EnterpriseDB/mysql_fdw.git </span></span>
<span class="line"><span style="color:#e1e4e8;">cd mysql_fdw</span></span>
<span class="line"><span style="color:#e1e4e8;">make USE_PGXS=1</span></span>
<span class="line"><span style="color:#e1e4e8;">make USE_PGXS=1 install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">chown postgres.postgres /usr/local/pgsql-11.5/lib/mysql_fdw.so   # 我这里用root账号编译的，需要改下最终的pg文件夹下的 .so 文件的权限</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 载入环境变量</span></span>
<span class="line"><span style="color:#24292e;">export PATH=/usr/local/pgsql-11.5/bin:$PATH</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 如果mysql是编译安装的，这里可能还需要载入mysql的环境变量,类似这样 export PATH=/usr/local/mysql:$PATH（我们mysql使用rpm安装，默认的PATH路径可发现，这里就i不用export了）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 开始编译扩展</span></span>
<span class="line"><span style="color:#24292e;">cd /home/postgres/</span></span>
<span class="line"><span style="color:#24292e;">git clone https://github.com/EnterpriseDB/mysql_fdw.git </span></span>
<span class="line"><span style="color:#24292e;">cd mysql_fdw</span></span>
<span class="line"><span style="color:#24292e;">make USE_PGXS=1</span></span>
<span class="line"><span style="color:#24292e;">make USE_PGXS=1 install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">chown postgres.postgres /usr/local/pgsql-11.5/lib/mysql_fdw.so   # 我这里用root账号编译的，需要改下最终的pg文件夹下的 .so 文件的权限</span></span></code></pre></div><p>然后，修改pg的配置文件， 加入 mysql_fdw这个功能</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">shared_preload_libraries = &#39;mysql_fdw&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">shared_preload_libraries = &#39;mysql_fdw&#39;</span></span></code></pre></div><p>登陆pg</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\\c testdb </span></span>
<span class="line"><span style="color:#e1e4e8;">testdb=# \\d</span></span>
<span class="line"><span style="color:#e1e4e8;">           List of relations</span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema |    Name    | Type  |  Owner  </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+------------+-------+---------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | inno_order | table | repuser</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 下面是参考官方github上面的教程实践的：</span></span>
<span class="line"><span style="color:#e1e4e8;">testdb=# CREATE EXTENSION mysql_fdw;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">testdb=# CREATE SERVER mysql_server_db10 FOREIGN DATA WRAPPER mysql_fdw OPTIONS (host &#39;192.168.2.4&#39;, port &#39;3306&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">testdb=# CREATE USER MAPPING FOR postgres SERVER mysql_server_db10 OPTIONS (username &#39;dts&#39;, password &#39;dts&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">testdb=# CREATE FOREIGN TABLE screens (</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;screenid&quot; bigint  NOT NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;name&quot; varchar(255) NOT NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;hsize&quot; int NOT NULL ,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;vsize&quot; int NOT NULL ,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;templateid&quot; bigint DEFAULT NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;userid&quot; bigint  DEFAULT NULL,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;private&quot; int NOT NULL )</span></span>
<span class="line"><span style="color:#e1e4e8;">SERVER mysql_server_db10 OPTIONS (dbname &#39;zabbix&#39;, table_name &#39;screens&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意： PG中有些字段类型与MySQL不一样，需要在PG上建表的时候注意修改适配下。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">testdb=# select * from screens limit 5  ;</span></span>
<span class="line"><span style="color:#e1e4e8;"> screenid |         name         | hsize | vsize | templateid | userid | private </span></span>
<span class="line"><span style="color:#e1e4e8;">----------+----------------------+-------+-------+------------+--------+---------</span></span>
<span class="line"><span style="color:#e1e4e8;">        3 | System performance   |     2 |     3 |      10001 |        |       0</span></span>
<span class="line"><span style="color:#e1e4e8;">        4 | Zabbix server health |     2 |     3 |      10047 |        |       0</span></span>
<span class="line"><span style="color:#e1e4e8;">        5 | System performance   |     2 |     2 |      10076 |        |       0</span></span>
<span class="line"><span style="color:#e1e4e8;">        6 | System performance   |     2 |     2 |      10077 |        |       0</span></span>
<span class="line"><span style="color:#e1e4e8;">        7 | System performance   |     2 |     2 |      10075 |        |       0</span></span>
<span class="line"><span style="color:#e1e4e8;">(5 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\\c testdb </span></span>
<span class="line"><span style="color:#24292e;">testdb=# \\d</span></span>
<span class="line"><span style="color:#24292e;">           List of relations</span></span>
<span class="line"><span style="color:#24292e;"> Schema |    Name    | Type  |  Owner  </span></span>
<span class="line"><span style="color:#24292e;">--------+------------+-------+---------</span></span>
<span class="line"><span style="color:#24292e;"> public | inno_order | table | repuser</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 下面是参考官方github上面的教程实践的：</span></span>
<span class="line"><span style="color:#24292e;">testdb=# CREATE EXTENSION mysql_fdw;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">testdb=# CREATE SERVER mysql_server_db10 FOREIGN DATA WRAPPER mysql_fdw OPTIONS (host &#39;192.168.2.4&#39;, port &#39;3306&#39;);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">testdb=# CREATE USER MAPPING FOR postgres SERVER mysql_server_db10 OPTIONS (username &#39;dts&#39;, password &#39;dts&#39;);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">testdb=# CREATE FOREIGN TABLE screens (</span></span>
<span class="line"><span style="color:#24292e;">  &quot;screenid&quot; bigint  NOT NULL,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;name&quot; varchar(255) NOT NULL,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;hsize&quot; int NOT NULL ,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;vsize&quot; int NOT NULL ,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;templateid&quot; bigint DEFAULT NULL,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;userid&quot; bigint  DEFAULT NULL,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;private&quot; int NOT NULL )</span></span>
<span class="line"><span style="color:#24292e;">SERVER mysql_server_db10 OPTIONS (dbname &#39;zabbix&#39;, table_name &#39;screens&#39;);</span></span>
<span class="line"><span style="color:#24292e;"># 注意： PG中有些字段类型与MySQL不一样，需要在PG上建表的时候注意修改适配下。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">testdb=# select * from screens limit 5  ;</span></span>
<span class="line"><span style="color:#24292e;"> screenid |         name         | hsize | vsize | templateid | userid | private </span></span>
<span class="line"><span style="color:#24292e;">----------+----------------------+-------+-------+------------+--------+---------</span></span>
<span class="line"><span style="color:#24292e;">        3 | System performance   |     2 |     3 |      10001 |        |       0</span></span>
<span class="line"><span style="color:#24292e;">        4 | Zabbix server health |     2 |     3 |      10047 |        |       0</span></span>
<span class="line"><span style="color:#24292e;">        5 | System performance   |     2 |     2 |      10076 |        |       0</span></span>
<span class="line"><span style="color:#24292e;">        6 | System performance   |     2 |     2 |      10077 |        |       0</span></span>
<span class="line"><span style="color:#24292e;">        7 | System performance   |     2 |     2 |      10075 |        |       0</span></span>
<span class="line"><span style="color:#24292e;">(5 rows)</span></span></code></pre></div><h2 id="删除扩展" tabindex="-1">删除扩展 <a class="header-anchor" href="#删除扩展" aria-label="Permalink to &quot;删除扩展&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# drop foreign table screens;</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# drop user mapping for postgres server mysql_server_db10 ;</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# drop server mysql_server_db10 ;</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP SERVER</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# drop extension mysql_fdw ;</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP EXTENSION</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# drop foreign table screens;</span></span>
<span class="line"><span style="color:#24292e;">postgres=# drop user mapping for postgres server mysql_server_db10 ;</span></span>
<span class="line"><span style="color:#24292e;">postgres=# drop server mysql_server_db10 ;</span></span>
<span class="line"><span style="color:#24292e;">DROP SERVER</span></span>
<span class="line"><span style="color:#24292e;">postgres=# drop extension mysql_fdw ;</span></span>
<span class="line"><span style="color:#24292e;">DROP EXTENSION</span></span></code></pre></div>`,10),o=[p];function t(c,r,i,y,d,m){return n(),e("div",null,o)}const b=s(l,[["render",t]]);export{u as __pageData,b as default};
