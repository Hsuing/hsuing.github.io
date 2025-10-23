import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"案例","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/plugin/9-postgres_fdw.md","filePath":"guide/Database/pgSql/base/plugin/9-postgres_fdw.md","lastUpdated":1711706009000}'),p={name:"guide/Database/pgSql/base/plugin/9-postgres_fdw.md"},l=e(`<h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>在使用异构数据库构建数据平台的过程中，异构数据库之间的访问一直是比较复杂的问题。我们使用PostgeSQL的过程中，遇到需要访问MySQL实时数据的场景。可供我们选择的方案包括FDW(Foreign Data Wrapper)是我们选用的开源方案，这个方案明显的优点是使用统一的接口方式实现多种数据库的远程访问，包括但不限于PostgreSQL, MySQL, MongoDB, HDFS</p><h2 id="_1-查看已有扩展" tabindex="-1">1.查看已有扩展 <a class="header-anchor" href="#_1-查看已有扩展" aria-label="Permalink to &quot;1.查看已有扩展&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\\dx 或者 select * from pg_available_extensions; </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\dx</span></span>
<span class="line"><span style="color:#e1e4e8;">                          List of installed extensions</span></span>
<span class="line"><span style="color:#e1e4e8;">     Name     | Version |   Schema   |               Description                </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------+---------+------------+------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_dirtyread | 2       | public     | Read dead but unvacuumed rows from table</span></span>
<span class="line"><span style="color:#e1e4e8;"> plpgsql      | 1.0     | pg_catalog | PL/pgSQL procedural language</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select * from pg_available_extensions; </span></span>
<span class="line"><span style="color:#e1e4e8;">        name        | default_version | installed_version |                          comment       </span></span>
<span class="line"><span style="color:#e1e4e8;">                   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------+-----------------+-------------------+----------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">-------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> plpgsql            | 1.0             | 1.0               | PL/pgSQL procedural language</span></span>
<span class="line"><span style="color:#e1e4e8;"> plpython3u         | 1.0             |                   | PL/Python3U untrusted procedural langua</span></span>
<span class="line"><span style="color:#e1e4e8;">ge</span></span>
<span class="line"><span style="color:#e1e4e8;"> pltcl              | 1.0             |                   | PL/Tcl procedural language</span></span>
<span class="line"><span style="color:#e1e4e8;"> pltclu             | 1.0             |                   | PL/TclU untrusted procedural language</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_stat_statements | 1.7             |                   | track execution statistics of all SQL s</span></span>
<span class="line"><span style="color:#e1e4e8;">tatements executed</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_dirtyread       | 2               | 2                 | Read dead but unvacuumed rows from tabl</span></span>
<span class="line"><span style="color:#e1e4e8;">e</span></span>
<span class="line"><span style="color:#e1e4e8;">(6 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\\dx 或者 select * from pg_available_extensions; </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\dx</span></span>
<span class="line"><span style="color:#24292e;">                          List of installed extensions</span></span>
<span class="line"><span style="color:#24292e;">     Name     | Version |   Schema   |               Description                </span></span>
<span class="line"><span style="color:#24292e;">--------------+---------+------------+------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> pg_dirtyread | 2       | public     | Read dead but unvacuumed rows from table</span></span>
<span class="line"><span style="color:#24292e;"> plpgsql      | 1.0     | pg_catalog | PL/pgSQL procedural language</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select * from pg_available_extensions; </span></span>
<span class="line"><span style="color:#24292e;">        name        | default_version | installed_version |                          comment       </span></span>
<span class="line"><span style="color:#24292e;">                   </span></span>
<span class="line"><span style="color:#24292e;">--------------------+-----------------+-------------------+----------------------------------------</span></span>
<span class="line"><span style="color:#24292e;">-------------------</span></span>
<span class="line"><span style="color:#24292e;"> plpgsql            | 1.0             | 1.0               | PL/pgSQL procedural language</span></span>
<span class="line"><span style="color:#24292e;"> plpython3u         | 1.0             |                   | PL/Python3U untrusted procedural langua</span></span>
<span class="line"><span style="color:#24292e;">ge</span></span>
<span class="line"><span style="color:#24292e;"> pltcl              | 1.0             |                   | PL/Tcl procedural language</span></span>
<span class="line"><span style="color:#24292e;"> pltclu             | 1.0             |                   | PL/TclU untrusted procedural language</span></span>
<span class="line"><span style="color:#24292e;"> pg_stat_statements | 1.7             |                   | track execution statistics of all SQL s</span></span>
<span class="line"><span style="color:#24292e;">tatements executed</span></span>
<span class="line"><span style="color:#24292e;"> pg_dirtyread       | 2               | 2                 | Read dead but unvacuumed rows from tabl</span></span>
<span class="line"><span style="color:#24292e;">e</span></span>
<span class="line"><span style="color:#24292e;">(6 rows)</span></span></code></pre></div><h2 id="_2-安装" tabindex="-1">2.安装 <a class="header-anchor" href="#_2-安装" aria-label="Permalink to &quot;2.安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@beta postgresql-12.2]#cd /root/postgresql-12.2/contrib/postgres_fdw</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta postgres_fdw]#make</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@beta postgres_fdw]# make install PG_CONFIG=/opt/pg12/bin/pg_config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@beta postgresql-12.2]#cd /root/postgresql-12.2/contrib/postgres_fdw</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta postgres_fdw]#make</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@beta postgres_fdw]# make install PG_CONFIG=/opt/pg12/bin/pg_config</span></span></code></pre></div><h2 id="_3-创建" tabindex="-1">3.创建 <a class="header-anchor" href="#_3-创建" aria-label="Permalink to &quot;3.创建&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> user peiyb </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;postgrespostgres&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> peiybdb </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">owner=</span><span style="color:#E1E4E8;">peiyb;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> extension postgres_fdw;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> EXTENSION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\dx</span></span>
<span class="line"><span style="color:#E1E4E8;">                               List of installed extensions</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">     | </span><span style="color:#F97583;">Version</span><span style="color:#E1E4E8;"> |   </span><span style="color:#F97583;">Schema</span><span style="color:#E1E4E8;">   |                    </span><span style="color:#F97583;">Description</span><span style="color:#E1E4E8;">                     </span></span>
<span class="line"><span style="color:#6A737D;">--------------+---------+------------+----------------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_dirtyread | </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">       | public     | </span><span style="color:#F97583;">Read</span><span style="color:#E1E4E8;"> dead but unvacuumed </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span></span>
<span class="line"><span style="color:#E1E4E8;"> plpgsql      | </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">     | pg_catalog | PL</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">pgSQL procedural </span><span style="color:#F97583;">language</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres_fdw | </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">     | public     | foreign</span><span style="color:#F97583;">-data</span><span style="color:#E1E4E8;"> wrapper </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">remote</span><span style="color:#E1E4E8;"> PostgreSQL servers</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#查看fdw属于那个库</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\dew</span></span>
<span class="line"><span style="color:#E1E4E8;">                      List of foreign</span><span style="color:#F97583;">-data</span><span style="color:#E1E4E8;"> wrappers</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">     |  </span><span style="color:#F97583;">Owner</span><span style="color:#E1E4E8;">   |       Handler        |       Validator        </span></span>
<span class="line"><span style="color:#6A737D;">--------------+----------+----------------------+------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres_fdw | postgres | postgres_fdw_handler | postgres_fdw_validator</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> user peiyb </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;postgrespostgres&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> peiybdb </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">owner=</span><span style="color:#24292E;">peiyb;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> extension postgres_fdw;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> EXTENSION</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\dx</span></span>
<span class="line"><span style="color:#24292E;">                               List of installed extensions</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">     | </span><span style="color:#D73A49;">Version</span><span style="color:#24292E;"> |   </span><span style="color:#D73A49;">Schema</span><span style="color:#24292E;">   |                    </span><span style="color:#D73A49;">Description</span><span style="color:#24292E;">                     </span></span>
<span class="line"><span style="color:#6A737D;">--------------+---------+------------+----------------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_dirtyread | </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">       | public     | </span><span style="color:#D73A49;">Read</span><span style="color:#24292E;"> dead but unvacuumed </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span></span>
<span class="line"><span style="color:#24292E;"> plpgsql      | </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">     | pg_catalog | PL</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">pgSQL procedural </span><span style="color:#D73A49;">language</span></span>
<span class="line"><span style="color:#24292E;"> postgres_fdw | </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">     | public     | foreign</span><span style="color:#D73A49;">-data</span><span style="color:#24292E;"> wrapper </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">remote</span><span style="color:#24292E;"> PostgreSQL servers</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#查看fdw属于那个库</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\dew</span></span>
<span class="line"><span style="color:#24292E;">                      List of foreign</span><span style="color:#D73A49;">-data</span><span style="color:#24292E;"> wrappers</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">     |  </span><span style="color:#D73A49;">Owner</span><span style="color:#24292E;">   |       Handler        |       Validator        </span></span>
<span class="line"><span style="color:#6A737D;">--------------+----------+----------------------+------------------------</span></span>
<span class="line"><span style="color:#24292E;"> postgres_fdw | postgres | postgres_fdw_handler | postgres_fdw_validator</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span></code></pre></div><h3 id="验证" tabindex="-1">验证 <a class="header-anchor" href="#验证" aria-label="Permalink to &quot;验证&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">查询postgres的所有拓展，验证fdw安装成功</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from pg_available_extensions;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">查询postgres的所有拓展，验证fdw安装成功</span></span>
<span class="line"><span style="color:#24292e;">select * from pg_available_extensions;</span></span></code></pre></div><h3 id="创建远程server" tabindex="-1">创建远程server <a class="header-anchor" href="#创建远程server" aria-label="Permalink to &quot;创建远程server&quot;">​</a></h3><p>192.168.1.10 源端</p><p>168.2.237.207 目标地址</p><p>server_remote是给这个远程server取得名字。</p><p>options中是连接远程server需要的信息，包括地址、端口和需要连接的数据库名</p><p>注意： 创建server 需要超级</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">192.168.1.10&gt;postgres=# create server server_remote FOREIGN data wrapper postgres_fdw OPTIONS(host &#39;168.2.237.207&#39;, port &#39;5432&#39;, dbname &#39;aasccs&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SERVER</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看所有远程连接，验证server创建成功</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.1.10&gt;# SELECT * from pg_foreign_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">  oid  |    srvname    | srvowner | srvfdw | srvtype | srvversion | srvacl |                  srvop</span></span>
<span class="line"><span style="color:#e1e4e8;">tions                  </span></span>
<span class="line"><span style="color:#e1e4e8;">-------+---------------+----------+--------+---------+------------+--------+-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 25974 | server_remote |       10 |  25973 |         |            |        | {host=168.2.237.207,po</span></span>
<span class="line"><span style="color:#e1e4e8;">rt=5432,dbname=aasccs}</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">192.168.1.10&gt;postgres=# create server server_remote FOREIGN data wrapper postgres_fdw OPTIONS(host &#39;168.2.237.207&#39;, port &#39;5432&#39;, dbname &#39;aasccs&#39;);</span></span>
<span class="line"><span style="color:#24292e;">CREATE SERVER</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看所有远程连接，验证server创建成功</span></span>
<span class="line"><span style="color:#24292e;">192.168.1.10&gt;# SELECT * from pg_foreign_server;</span></span>
<span class="line"><span style="color:#24292e;">  oid  |    srvname    | srvowner | srvfdw | srvtype | srvversion | srvacl |                  srvop</span></span>
<span class="line"><span style="color:#24292e;">tions                  </span></span>
<span class="line"><span style="color:#24292e;">-------+---------------+----------+--------+---------+------------+--------+-----------------------</span></span>
<span class="line"><span style="color:#24292e;">-----------------------</span></span>
<span class="line"><span style="color:#24292e;"> 25974 | server_remote |       10 |  25973 |         |            |        | {host=168.2.237.207,po</span></span>
<span class="line"><span style="color:#24292e;">rt=5432,dbname=aasccs}</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><h3 id="创建用户匹配信息" tabindex="-1">创建用户匹配信息 <a class="header-anchor" href="#创建用户匹配信息" aria-label="Permalink to &quot;创建用户匹配信息&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres 用户</span></span>
<span class="line"><span style="color:#e1e4e8;">表示在server_remote下为角色postgres创建一个用户匹配信息，options里是用户名和密码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定用户</span></span>
<span class="line"><span style="color:#e1e4e8;">create user mapping for postgres server server_remote options(user &#39;postgres&#39;,password &#39;yourpassword&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定所有用户</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create user mapping for public server_remote options(user &#39;postgres&#39;,password &#39;123456&#39;);                          </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE USER MAPPING</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create user mapping for peiyb server shard1 options (user &#39;peiyb&#39;, password &#39;postgrespostgres&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意： </span></span>
<span class="line"><span style="color:#e1e4e8;">create user mapping是将server与本地的用户连接起来。</span></span>
<span class="line"><span style="color:#e1e4e8;">public表示当前库的没有明确指定user mapping 的所有用户</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres 用户</span></span>
<span class="line"><span style="color:#24292e;">表示在server_remote下为角色postgres创建一个用户匹配信息，options里是用户名和密码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定用户</span></span>
<span class="line"><span style="color:#24292e;">create user mapping for postgres server server_remote options(user &#39;postgres&#39;,password &#39;yourpassword&#39;);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定所有用户</span></span>
<span class="line"><span style="color:#24292e;">postgres=# create user mapping for public server_remote options(user &#39;postgres&#39;,password &#39;123456&#39;);                          </span></span>
<span class="line"><span style="color:#24292e;">CREATE USER MAPPING</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create user mapping for peiyb server shard1 options (user &#39;peiyb&#39;, password &#39;postgrespostgres&#39;);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意： </span></span>
<span class="line"><span style="color:#24292e;">create user mapping是将server与本地的用户连接起来。</span></span>
<span class="line"><span style="color:#24292e;">public表示当前库的没有明确指定user mapping 的所有用户</span></span></code></pre></div><h3 id="授权" tabindex="-1">授权 <a class="header-anchor" href="#授权" aria-label="Permalink to &quot;授权&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> grant usage on foreign data wrapper postgres_fdw to user_name;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> grant usage on foreign data wrapper postgres_fdw to user_name;</span></span></code></pre></div><h3 id="创建外部表" tabindex="-1"><em>创建外部表</em> <a class="header-anchor" href="#创建外部表" aria-label="Permalink to &quot;*创建外部表*&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#public</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create foreign table foreign_goods(id integer,name character varying)server server_remote options(schema_name &#39;public&#39;,table_name &#39;goods&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE FOREIGN TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE FOREIGN TABLE t_resource </span></span>
<span class="line"><span style="color:#e1e4e8;"> (   fd_resid SERIAL,</span></span>
<span class="line"><span style="color:#e1e4e8;">         fd_res_name TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">         fd_res_desc TEXT,</span></span>
<span class="line"><span style="color:#e1e4e8;">         fd_tenantid INTEGER, </span></span>
<span class="line"><span style="color:#e1e4e8;">         fd_service TEXT, </span></span>
<span class="line"><span style="color:#e1e4e8;">         fd_display_name TEXT, </span></span>
<span class="line"><span style="color:#e1e4e8;">         fd_modify_date TEXT, </span></span>
<span class="line"><span style="color:#e1e4e8;">         fd_modify_person_id INTEGER</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;">server server_remote </span></span>
<span class="line"><span style="color:#e1e4e8;">options (table_name &#39;t_resource_remote&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#public</span></span>
<span class="line"><span style="color:#24292e;">postgres=# create foreign table foreign_goods(id integer,name character varying)server server_remote options(schema_name &#39;public&#39;,table_name &#39;goods&#39;);</span></span>
<span class="line"><span style="color:#24292e;">CREATE FOREIGN TABLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">CREATE FOREIGN TABLE t_resource </span></span>
<span class="line"><span style="color:#24292e;"> (   fd_resid SERIAL,</span></span>
<span class="line"><span style="color:#24292e;">         fd_res_name TEXT,</span></span>
<span class="line"><span style="color:#24292e;">         fd_res_desc TEXT,</span></span>
<span class="line"><span style="color:#24292e;">         fd_tenantid INTEGER, </span></span>
<span class="line"><span style="color:#24292e;">         fd_service TEXT, </span></span>
<span class="line"><span style="color:#24292e;">         fd_display_name TEXT, </span></span>
<span class="line"><span style="color:#24292e;">         fd_modify_date TEXT, </span></span>
<span class="line"><span style="color:#24292e;">         fd_modify_person_id INTEGER</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;">server server_remote </span></span>
<span class="line"><span style="color:#24292e;">options (table_name &#39;t_resource_remote&#39;);</span></span></code></pre></div><h3 id="执行计划" tabindex="-1"><em>执行计划</em> <a class="header-anchor" href="#执行计划" aria-label="Permalink to &quot;*执行计划*&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# explain (analyze,verbose) select * from foreign_goods where id=1;</span></span>
<span class="line"><span style="color:#e1e4e8;">                                                      QUERY PLAN                                                       </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> Foreign Scan on public.foreign_goods  (cost=100.00..127.20 rows=7 width=36) (actual time=1.256..1.257 rows=1 loops=1)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Output: id,name</span></span>
<span class="line"><span style="color:#e1e4e8;">   Remote sql: SELECT id,name FROM public.goods WHERE ((id = 1)) Total runtime: 2.614 ms (4 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# explain (analyze,verbose) select * from foreign_goods where id=1;</span></span>
<span class="line"><span style="color:#24292e;">                                                      QUERY PLAN                                                       </span></span>
<span class="line"><span style="color:#24292e;">-----------------------------------------------------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> Foreign Scan on public.foreign_goods  (cost=100.00..127.20 rows=7 width=36) (actual time=1.256..1.257 rows=1 loops=1)</span></span>
<span class="line"><span style="color:#24292e;">   Output: id,name</span></span>
<span class="line"><span style="color:#24292e;">   Remote sql: SELECT id,name FROM public.goods WHERE ((id = 1)) Total runtime: 2.614 ms (4 rows)</span></span></code></pre></div><h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.目的</span></span>
<span class="line"><span style="color:#e1e4e8;">在node2中查询node1的t1表</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from t1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id | name </span></span>
<span class="line"><span style="color:#e1e4e8;">----+------</span></span>
<span class="line"><span style="color:#e1e4e8;">  1 | aa</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">2.实施</span></span>
<span class="line"><span style="color:#e1e4e8;">node1数据准备</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@localhost ~]$ psql</span></span>
<span class="line"><span style="color:#e1e4e8;">Password for user postgres: </span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.4)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create database db_1;</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create user user1 password &#39;Aa111&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# alter database db_1 owner to user1;</span></span>
<span class="line"><span style="color:#e1e4e8;">db_1=# \\q</span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@localhost ~]$ psql -U user1 -d db_1</span></span>
<span class="line"><span style="color:#e1e4e8;">Password for user user1: </span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.4)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;">db_1=&gt; create table t1(id int,name varchar) tablespace pg_default;</span></span>
<span class="line"><span style="color:#e1e4e8;">db_1=&gt; insert into t1 values(1,&#39;aa&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">db_1=&gt; select * from t1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id | name </span></span>
<span class="line"><span style="color:#e1e4e8;">----+------</span></span>
<span class="line"><span style="color:#e1e4e8;">  1 | aa</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">node2设置</span></span>
<span class="line"><span style="color:#e1e4e8;">-bash-4.1$ psql</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.3)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create user user2 password &#39;Aa111&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create database db_2;</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# alter database db_2 owner to user2;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\c db_2</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;db_2&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=# create extension postgres_fdw;</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=# grant usage on foreign data wrapper postgres_fdw to user2;</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=# create server fnode1 foreign data wrapper postgres_fdw options (host &#39;node1&#39;, port &#39;5432&#39;, dbname &#39;db_1&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=# grant usage on foreign server fnode1 to user2; </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-bash-4.1$ psql -U user2 -d db_2 -h node2</span></span>
<span class="line"><span style="color:#e1e4e8;">Password for user user2: </span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.3)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; # create user mapping for user2 server fnode1 options (user &#39;user1&#39;, password &#39;Aa111&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; # create foreign table t1 (id int,name varchar) server fnode1 options (schema_name &#39;public&#39;, table_name &#39;t1&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; select * from t1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id | name </span></span>
<span class="line"><span style="color:#e1e4e8;">----+------</span></span>
<span class="line"><span style="color:#e1e4e8;">  1 | aa</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3.测试</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; insert into t1 values(2,&#39;bb&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 1</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; select  * from t1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id | name </span></span>
<span class="line"><span style="color:#e1e4e8;">----+------</span></span>
<span class="line"><span style="color:#e1e4e8;">  1 | aa</span></span>
<span class="line"><span style="color:#e1e4e8;">  2 | bb</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; create table t2 (id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; insert into t2 values(2),(3);</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 2</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; select * from t1,t2 where t1.id=t2.id;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id | name | id </span></span>
<span class="line"><span style="color:#e1e4e8;">----+------+----</span></span>
<span class="line"><span style="color:#e1e4e8;">db_2=&gt; explain select * from t1,t2 where t1.id=t2.id;</span></span>
<span class="line"><span style="color:#e1e4e8;">                                QUERY PLAN                                </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> Merge Join  (cost=401.81..669.70 rows=17404 width=40)</span></span>
<span class="line"><span style="color:#e1e4e8;">   Merge Cond: (t1.id = t2.id)</span></span>
<span class="line"><span style="color:#e1e4e8;">   -&gt;  Sort  (cost=222.03..225.44 rows=1365 width=36)</span></span>
<span class="line"><span style="color:#e1e4e8;">         Sort Key: t1.id</span></span>
<span class="line"><span style="color:#e1e4e8;">         -&gt;  Foreign Scan on t1  (cost=100.00..150.95 rows=1365 width=36)</span></span>
<span class="line"><span style="color:#e1e4e8;">   -&gt;  Sort  (cost=179.78..186.16 rows=2550 width=4)</span></span>
<span class="line"><span style="color:#e1e4e8;">         Sort Key: t2.id</span></span>
<span class="line"><span style="color:#e1e4e8;">         -&gt;  Seq Scan on t2  (cost=0.00..35.50 rows=2550 width=4)</span></span>
<span class="line"><span style="color:#e1e4e8;">(8 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.目的</span></span>
<span class="line"><span style="color:#24292e;">在node2中查询node1的t1表</span></span>
<span class="line"><span style="color:#24292e;">select * from t1;</span></span>
<span class="line"><span style="color:#24292e;"> id | name </span></span>
<span class="line"><span style="color:#24292e;">----+------</span></span>
<span class="line"><span style="color:#24292e;">  1 | aa</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">2.实施</span></span>
<span class="line"><span style="color:#24292e;">node1数据准备</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[postgres@localhost ~]$ psql</span></span>
<span class="line"><span style="color:#24292e;">Password for user postgres: </span></span>
<span class="line"><span style="color:#24292e;">psql (12.4)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;">postgres=# create database db_1;</span></span>
<span class="line"><span style="color:#24292e;">postgres=# create user user1 password &#39;Aa111&#39;;</span></span>
<span class="line"><span style="color:#24292e;">postgres=# alter database db_1 owner to user1;</span></span>
<span class="line"><span style="color:#24292e;">db_1=# \\q</span></span>
<span class="line"><span style="color:#24292e;">[postgres@localhost ~]$ psql -U user1 -d db_1</span></span>
<span class="line"><span style="color:#24292e;">Password for user user1: </span></span>
<span class="line"><span style="color:#24292e;">psql (12.4)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;">db_1=&gt; create table t1(id int,name varchar) tablespace pg_default;</span></span>
<span class="line"><span style="color:#24292e;">db_1=&gt; insert into t1 values(1,&#39;aa&#39;);</span></span>
<span class="line"><span style="color:#24292e;">db_1=&gt; select * from t1;</span></span>
<span class="line"><span style="color:#24292e;"> id | name </span></span>
<span class="line"><span style="color:#24292e;">----+------</span></span>
<span class="line"><span style="color:#24292e;">  1 | aa</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">node2设置</span></span>
<span class="line"><span style="color:#24292e;">-bash-4.1$ psql</span></span>
<span class="line"><span style="color:#24292e;">psql (12.3)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# create user user2 password &#39;Aa111&#39;;</span></span>
<span class="line"><span style="color:#24292e;">postgres=# create database db_2;</span></span>
<span class="line"><span style="color:#24292e;">postgres=# alter database db_2 owner to user2;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\c db_2</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;db_2&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#24292e;">db_2=# create extension postgres_fdw;</span></span>
<span class="line"><span style="color:#24292e;">db_2=# grant usage on foreign data wrapper postgres_fdw to user2;</span></span>
<span class="line"><span style="color:#24292e;">db_2=# create server fnode1 foreign data wrapper postgres_fdw options (host &#39;node1&#39;, port &#39;5432&#39;, dbname &#39;db_1&#39;);</span></span>
<span class="line"><span style="color:#24292e;">db_2=# grant usage on foreign server fnode1 to user2; </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-bash-4.1$ psql -U user2 -d db_2 -h node2</span></span>
<span class="line"><span style="color:#24292e;">Password for user user2: </span></span>
<span class="line"><span style="color:#24292e;">psql (12.3)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; # create user mapping for user2 server fnode1 options (user &#39;user1&#39;, password &#39;Aa111&#39;);</span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; # create foreign table t1 (id int,name varchar) server fnode1 options (schema_name &#39;public&#39;, table_name &#39;t1&#39;);</span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; select * from t1;</span></span>
<span class="line"><span style="color:#24292e;"> id | name </span></span>
<span class="line"><span style="color:#24292e;">----+------</span></span>
<span class="line"><span style="color:#24292e;">  1 | aa</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3.测试</span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; insert into t1 values(2,&#39;bb&#39;);</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 1</span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; select  * from t1;</span></span>
<span class="line"><span style="color:#24292e;"> id | name </span></span>
<span class="line"><span style="color:#24292e;">----+------</span></span>
<span class="line"><span style="color:#24292e;">  1 | aa</span></span>
<span class="line"><span style="color:#24292e;">  2 | bb</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; create table t2 (id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; insert into t2 values(2),(3);</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 2</span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; select * from t1,t2 where t1.id=t2.id;</span></span>
<span class="line"><span style="color:#24292e;"> id | name | id </span></span>
<span class="line"><span style="color:#24292e;">----+------+----</span></span>
<span class="line"><span style="color:#24292e;">db_2=&gt; explain select * from t1,t2 where t1.id=t2.id;</span></span>
<span class="line"><span style="color:#24292e;">                                QUERY PLAN                                </span></span>
<span class="line"><span style="color:#24292e;">--------------------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> Merge Join  (cost=401.81..669.70 rows=17404 width=40)</span></span>
<span class="line"><span style="color:#24292e;">   Merge Cond: (t1.id = t2.id)</span></span>
<span class="line"><span style="color:#24292e;">   -&gt;  Sort  (cost=222.03..225.44 rows=1365 width=36)</span></span>
<span class="line"><span style="color:#24292e;">         Sort Key: t1.id</span></span>
<span class="line"><span style="color:#24292e;">         -&gt;  Foreign Scan on t1  (cost=100.00..150.95 rows=1365 width=36)</span></span>
<span class="line"><span style="color:#24292e;">   -&gt;  Sort  (cost=179.78..186.16 rows=2550 width=4)</span></span>
<span class="line"><span style="color:#24292e;">         Sort Key: t2.id</span></span>
<span class="line"><span style="color:#24292e;">         -&gt;  Seq Scan on t2  (cost=0.00..35.50 rows=2550 width=4)</span></span>
<span class="line"><span style="color:#24292e;">(8 rows)</span></span></code></pre></div><p>参考地址：</p><p><a href="https://helpcdn.aliyun.com/document_detail/142422.html" target="_blank" rel="noreferrer">https://helpcdn.aliyun.com/document_detail/142422.html</a></p><p><a href="https://www.postgresql.org/docs/12/postgres-fdw.html" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/12/postgres-fdw.html</a></p><p><a href="https://www.postgresql.org/docs/9.2/dblink.html" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/9.2/dblink.html</a></p>`,31),o=[l];function t(r,c,i,y,d,g){return n(),a("div",null,o)}const b=s(p,[["render",t]]);export{u as __pageData,b as default};
