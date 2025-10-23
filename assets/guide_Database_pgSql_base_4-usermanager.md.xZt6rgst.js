import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const F=JSON.parse('{"title":"PostgreSQL 给角色授权","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/4-usermanager.md","filePath":"guide/Database/pgSql/base/4-usermanager.md","lastUpdated":1711535325000}'),l={name:"guide/Database/pgSql/base/4-usermanager.md"},o=p(`<h1 id="postgresql-给角色授权" tabindex="-1">PostgreSQL 给角色授权 <a class="header-anchor" href="#postgresql-给角色授权" aria-label="Permalink to &quot;PostgreSQL 给角色授权&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311061016654.png" alt=""></p><p>在数据库中所有的权限都和角色（用户）挂钩，public是一个特殊角色，代表所有人。</p><p>超级用户是有允许任意操作对象的，普通用户只能操作自己创建的对象。</p><p>另外有一些对象是有赋予给public角色默认权限的，所以建好之后，所以人都有这些默认权限</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311061016846.png" alt=""></p><p><strong>当前权限所有表状态</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select relname,relacl from pg_class where relkind=&#39;r&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select relname,relacl from pg_class where relkind=&#39;r&#39;;</span></span></code></pre></div><p><strong>查看一个表权限状态</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# \\dp+ pg_sequence;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            Access privileges</span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema | Name | Type | Access privileges | Column privileges | Policies </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+------+------+-------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;">(0 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# \\dp+ pg_sequence;</span></span>
<span class="line"><span style="color:#24292e;">                            Access privileges</span></span>
<span class="line"><span style="color:#24292e;"> Schema | Name | Type | Access privileges | Column privileges | Policies </span></span>
<span class="line"><span style="color:#24292e;">--------+------+------+-------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#24292e;">(0 rows)</span></span></code></pre></div><p><a href="https://www.postgresql.org/docs/12/sql-grant.html" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/12/sql-grant.html</a></p><p>PG 中常见的几个概念，包括了 Cluster、Database、Schemas</p><h2 id="schemas" tabindex="-1">Schemas <a class="header-anchor" href="#schemas" aria-label="Permalink to &quot;Schemas&quot;">​</a></h2><p>Schema 是 PG-7.3 引入的特性，在 PG 中是一个逻辑概念，一个用户可以访问他所连接数据库中的任意 schema 中的对象，只要他有权限即可。之所以又添加了 schema，主要有如下原因</p><ul><li>允许多个用户互不干扰地使用同一个数据库，从逻辑上将 DB 分组以方便管理</li><li>提供 database 下的命名空间隔离，这样的好处是，灵活。例如，可以创建月份的 schema，每个里面的表结构都相同</li><li>PG 的限制是一个连接只能连接到一个数据库，这样一个连接就可以操作不同 schema 下的对象</li></ul><p>每个客户端的连接都会存在一个搜索路径 (search path)，如果没有指定 schema，那么 PG 就会按照该路径进行搜索</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres@postgres</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">SHOW SEARCH_PATH;</span></span>
<span class="line"><span style="color:#E1E4E8;">   search_path   </span></span>
<span class="line"><span style="color:#6A737D;">-----------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;$user&quot;</span><span style="color:#E1E4E8;">, public</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 可以修改搜索路径</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> SEARCH_PATH </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;foo&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;bar&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;public&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">SET</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres@postgres</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">SHOW SEARCH_PATH;</span></span>
<span class="line"><span style="color:#24292E;">   search_path   </span></span>
<span class="line"><span style="color:#6A737D;">-----------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;$user&quot;</span><span style="color:#24292E;">, public</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 可以修改搜索路径</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> SEARCH_PATH </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;foo&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;bar&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;public&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">SET</span></span></code></pre></div><p>另外的一些常见操作可以参考如下：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">----- 查询schema</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres@postgres</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">\\dn</span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                          List of schemas</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">  |  </span><span style="color:#F97583;">Owner</span><span style="color:#E1E4E8;">   |  Access privileges   |      </span><span style="color:#F97583;">Description</span><span style="color:#E1E4E8;">       </span></span>
<span class="line"><span style="color:#6A737D;">--------+----------+----------------------+------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> cron   | postgres |                      | </span></span>
<span class="line"><span style="color:#E1E4E8;"> dba    | postgres |                      | </span></span>
<span class="line"><span style="color:#E1E4E8;"> public | postgres | postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">UC</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">| </span><span style="color:#F97583;">standard</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">schema</span></span>
<span class="line"><span style="color:#E1E4E8;">        |          | </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">UC</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">postgres         | </span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 创建schema以及其中的表</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> foo;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">foo</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">foobar</span><span style="color:#E1E4E8;">(id </span><span style="color:#F97583;">INTEGER</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 删除schema，如果非空，则通过cascade强制删除</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">DROP</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> foo CASCADE;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">----- 查询schema</span></span>
<span class="line"><span style="color:#24292E;">postgres@postgres</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">\\dn</span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                          List of schemas</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">  |  </span><span style="color:#D73A49;">Owner</span><span style="color:#24292E;">   |  Access privileges   |      </span><span style="color:#D73A49;">Description</span><span style="color:#24292E;">       </span></span>
<span class="line"><span style="color:#6A737D;">--------+----------+----------------------+------------------------</span></span>
<span class="line"><span style="color:#24292E;"> cron   | postgres |                      | </span></span>
<span class="line"><span style="color:#24292E;"> dba    | postgres |                      | </span></span>
<span class="line"><span style="color:#24292E;"> public | postgres | postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">UC</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">| </span><span style="color:#D73A49;">standard</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">schema</span></span>
<span class="line"><span style="color:#24292E;">        |          | </span><span style="color:#D73A49;">=</span><span style="color:#24292E;">UC</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">postgres         | </span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 创建schema以及其中的表</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> foo;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">foo</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">foobar</span><span style="color:#24292E;">(id </span><span style="color:#D73A49;">INTEGER</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 删除schema，如果非空，则通过cascade强制删除</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">DROP</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> foo CASCADE;</span></span></code></pre></div><p>除了 public 和用户创建的 schema 之外，还存在一个 <code>pg_catalog</code>，它包含了系统表所有的内建数据类型、函数、操作符，它总是搜索路径的一部分，只是没有在搜索路径中显示</p><h2 id="databases" tabindex="-1">Databases <a class="header-anchor" href="#databases" aria-label="Permalink to &quot;Databases&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE DATABASE db_name</span></span>
<span class="line"><span style="color:#e1e4e8;">[</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ WITH]</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ OWNER [ = ] user_name ]                     # 所属用户，默认属于创建的用户</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ TEMPLDATE [ =] templdate ]                  # 创建数据库需要的模板，默认template1</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ ENCODING [ = ] encoding ]                   # 数据库使用的编码，如utf8</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ LC_COLLATE [ = ] lc_collate ]               # 排序类型</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ LC_CTYPE [ = ] lc_ctype ]                   # 同上</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ TABLESPACE [ = ] tablespace ]               # 数据库的默认表空间</span></span>
<span class="line"><span style="color:#e1e4e8;">    [ CONNECTION LIMIT [ = ] connection limit ]   # 数据库的最大连接数，默认为-1，禁用连接</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">----- 示例</span></span>
<span class="line"><span style="color:#e1e4e8;">POSTGRES=# CREATE DATABASE demodb TEMPLATE template0 ENCODING &#39;UTF8&#39; TABLESPACE ts_demo01 CONNECTION LIMIT 200;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE DATABASE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE DATABASE db_name</span></span>
<span class="line"><span style="color:#24292e;">[</span></span>
<span class="line"><span style="color:#24292e;">    [ WITH]</span></span>
<span class="line"><span style="color:#24292e;">    [ OWNER [ = ] user_name ]                     # 所属用户，默认属于创建的用户</span></span>
<span class="line"><span style="color:#24292e;">    [ TEMPLDATE [ =] templdate ]                  # 创建数据库需要的模板，默认template1</span></span>
<span class="line"><span style="color:#24292e;">    [ ENCODING [ = ] encoding ]                   # 数据库使用的编码，如utf8</span></span>
<span class="line"><span style="color:#24292e;">    [ LC_COLLATE [ = ] lc_collate ]               # 排序类型</span></span>
<span class="line"><span style="color:#24292e;">    [ LC_CTYPE [ = ] lc_ctype ]                   # 同上</span></span>
<span class="line"><span style="color:#24292e;">    [ TABLESPACE [ = ] tablespace ]               # 数据库的默认表空间</span></span>
<span class="line"><span style="color:#24292e;">    [ CONNECTION LIMIT [ = ] connection limit ]   # 数据库的最大连接数，默认为-1，禁用连接</span></span>
<span class="line"><span style="color:#24292e;">]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">----- 示例</span></span>
<span class="line"><span style="color:#24292e;">POSTGRES=# CREATE DATABASE demodb TEMPLATE template0 ENCODING &#39;UTF8&#39; TABLESPACE ts_demo01 CONNECTION LIMIT 200;</span></span>
<span class="line"><span style="color:#24292e;">CREATE DATABASE</span></span></code></pre></div><p>如果是 superuser 可以指定不同的 OWNER ，否则使用当前的用户。TEMPLATE 则指定了复制的模版，会将该模版中定义的所有 tables、views、data types、functions、operators 复制到新的数据库目录下，默认采用 template1</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">----- 查看详细信息</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\l+</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">----- 查看详细信息</span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\l+</span></span></code></pre></div><p>在 PG 中，数据库、表、索引的关系如下</p><ul><li>数据库：一个 PG 数据库下可以管理多个数据库，当应用连接的时候，只能连接到其中的一个数据库，而一个数据库只能属于一个实例</li><li>表、索引：一个数据库里可以有多个表与索引，PG 称为 “Relation”</li><li>数据行：在每张表中可以有很多数据行，PG 称为 “Tuple”</li></ul><h2 id="表空间-tablespaces" tabindex="-1">表空间，tablespaces <a class="header-anchor" href="#表空间-tablespaces" aria-label="Permalink to &quot;表空间，tablespaces&quot;">​</a></h2><p>这是 PG-8.0 引入的特性，将 DBs、tables、indexs 保存到指定的 tablespace 中，会在创建时指定数据的保存目录，也就是说表空间就是一个简单的目录，其主要用途分两个</p><ul><li>单独扩展表空间用，一旦磁盘或分区被耗尽，可以创建一个表空间到其他磁盘或分区上面</li><li>区分不同对象的存储位置，比如可以将冷热数据进行分别存放</li></ul><p>与 Oracle 中的表空间被独占不同，PG 的表空间是可以被共享的，当创建了一个表空间后，这个表空间可以被多个数据库、表、索引等数据库对象使用</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLESPACE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tablespacename</span><span style="color:#E1E4E8;"> [ OWNER username ] </span><span style="color:#F97583;">LOCATION</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;directory&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLESPACE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tablespacename</span><span style="color:#24292E;"> [ OWNER username ] </span><span style="color:#D73A49;">LOCATION</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;directory&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>创建时必须要满足如下的条件</p><ul><li>superuser</li><li>OS 必须支持符号连接，也就是说 Windows 不支持</li><li>目录必须已经存在且为空,目录所属主</li></ul><p>创建时，PG 会在后台执行一系列操作，基本流程为</p><p>1,将目录权限修改为 700-----&gt;2,创建一个 <code>PG_VERSION</code> 文件-------3,在 <code>pg_tablespace</code> 添加一行，并新建一个 OID(object-id)--------&gt;4,在 <code>$PGDATA/pg_tblspc</code> 目录下创建一个 OID 指向的符号连接</p><p>当在 tablespace 中创建对象时，例如 database，会先创建一个目录，然后才会在该目录下创建对象，之所以这样，是为了避免 OID 冲突</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">----- 查看表空间</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres@postgres</span><span style="color:#F97583;">=&gt;SELECT</span><span style="color:#E1E4E8;"> spcname, pg_tablespace_location(</span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_tablespace;</span></span>
<span class="line"><span style="color:#E1E4E8;">  spcname   | pg_tablespace_location </span></span>
<span class="line"><span style="color:#6A737D;">------------+------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_default | </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_global  | </span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres@postgres</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">\\db</span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                                  List of tablespaces</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">    |  </span><span style="color:#F97583;">Owner</span><span style="color:#E1E4E8;">   | </span><span style="color:#F97583;">Location</span><span style="color:#E1E4E8;"> | Access privileges | Options |  </span><span style="color:#F97583;">Size</span><span style="color:#E1E4E8;">   | </span><span style="color:#F97583;">Description</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;">------------+----------+----------+-------------------+---------+---------+-------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_default | postgres |          |                   |         | </span><span style="color:#79B8FF;">1981</span><span style="color:#E1E4E8;"> MB | </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_global  | postgres |          |                   |         | </span><span style="color:#79B8FF;">639</span><span style="color:#E1E4E8;"> kB  | </span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 创建表空间，目录需要先创建</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar </span><span style="color:#F97583;">LOCATION</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/tmp/foobar&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> TABLESPACE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_tablespace </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> spcname </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ts_foobar&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  |  spcname  | spcowner | spcacl | spcoptions</span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------+----------+--------+------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16435</span><span style="color:#E1E4E8;"> | ts_foobar |       </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> |        |</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\db</span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                                    List of tablespaces</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">    |  </span><span style="color:#F97583;">Owner</span><span style="color:#E1E4E8;">   |  </span><span style="color:#F97583;">Location</span><span style="color:#E1E4E8;">   | Access privileges | Options |  </span><span style="color:#F97583;">Size</span><span style="color:#E1E4E8;">   | </span><span style="color:#F97583;">Description</span></span>
<span class="line"><span style="color:#6A737D;">------------+----------+-------------+-------------------+---------+---------+-------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_default | postgres |             |                   |         | </span><span style="color:#79B8FF;">35</span><span style="color:#E1E4E8;"> MB   |</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_global  | postgres |             |                   |         | </span><span style="color:#79B8FF;">464</span><span style="color:#E1E4E8;"> kB  |</span></span>
<span class="line"><span style="color:#E1E4E8;"> ts_foobar  | postgres | </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">tmp</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">foobar |                   |         | </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> bytes |</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 创建数据库，并指向表空间</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> mydb </span><span style="color:#F97583;">OWNER</span><span style="color:#E1E4E8;"> postgres TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">, datname </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_database;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  |  datname</span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | template1</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12918</span><span style="color:#E1E4E8;"> | template0</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12923</span><span style="color:#E1E4E8;"> | postgres</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16439</span><span style="color:#E1E4E8;"> | mydb</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\</span><span style="color:#F97583;">connect</span><span style="color:#E1E4E8;"> mydb;</span></span>
<span class="line"><span style="color:#E1E4E8;">You are </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;"> connected </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;mydb&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> user </span><span style="color:#9ECBFF;">&quot;postgres&quot;</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 在上述创建的表空间中添加表</span></span>
<span class="line"><span style="color:#E1E4E8;">mydb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span><span style="color:#E1E4E8;"> foobar(x </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">, y </span><span style="color:#F97583;">varchar</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">), z </span><span style="color:#F97583;">date</span><span style="color:#E1E4E8;">) TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"><span style="color:#E1E4E8;">mydb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">INSERT INTO</span><span style="color:#E1E4E8;"> foobar </span><span style="color:#F97583;">VALUES</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;ShangHai&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">()), (</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;NanJing&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">()), (</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;HangZhou&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">mydb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">INDEX</span><span style="color:#E1E4E8;"> idx_foobar_x </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> foobar(x) TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">INDEX</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 添加表的主键约束或是唯一键约束的时候指定表空间</span></span>
<span class="line"><span style="color:#E1E4E8;">mydb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span><span style="color:#E1E4E8;"> foobar </span><span style="color:#F97583;">ADD</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">CONSTRAINT</span><span style="color:#E1E4E8;"> uk_foobar_y </span><span style="color:#F97583;">UNIQUE</span><span style="color:#E1E4E8;">(y) </span><span style="color:#F97583;">USING</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">INDEX</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">------ 查看对应的OID</span></span>
<span class="line"><span style="color:#E1E4E8;">mydb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_class </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> relname </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;foobar&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span></span>
<span class="line"><span style="color:#6A737D;">-------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16440</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">mydb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_database </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> datname </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;mydb&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span></span>
<span class="line"><span style="color:#6A737D;">-------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16439</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 查看表所在文件，可以直接在目录下查找对应文件</span></span>
<span class="line"><span style="color:#E1E4E8;">mydb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> pg_relation_filepath(</span><span style="color:#9ECBFF;">&#39;foobar&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">             pg_relation_filepath</span></span>
<span class="line"><span style="color:#6A737D;">----------------------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_tblspc</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">16435</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">PG_9</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">5_201510051</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">16439</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">16440</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">$ ls </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">l $PGDATA</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">pg_tblspc</span></span>
<span class="line"><span style="color:#E1E4E8;">total </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">lrwxrwxrwx </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> postgres postgres </span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;"> 9月  </span><span style="color:#79B8FF;">27</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">23</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">04</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16435</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">tmp</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">foobar</span></span>
<span class="line"><span style="color:#E1E4E8;">total </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">bash</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">$ ls </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">tmp</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">foobar</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">PG_9</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">5_201510051</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">l</span></span>
<span class="line"><span style="color:#E1E4E8;">total </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">drwx</span><span style="color:#6A737D;">------ 2 postgres postgres   40 9月  27 23:13 13294</span></span>
<span class="line"><span style="color:#E1E4E8;">drwx</span><span style="color:#6A737D;">------ 2 postgres postgres 5400 9月  27 23:20 16439</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 也可以修改表空间名称</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar RENAME </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> ts_foobar01;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLESPACE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 此时表T的表空间名称会相应发生变化</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\d t</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">Table</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;public.t&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> Column |         </span><span style="color:#F97583;">Type</span><span style="color:#E1E4E8;">          | Modifiers</span></span>
<span class="line"><span style="color:#6A737D;">--------+-----------------------+-----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> x      | </span><span style="color:#F97583;">integer</span><span style="color:#E1E4E8;">               |</span></span>
<span class="line"><span style="color:#E1E4E8;"> y      | </span><span style="color:#F97583;">character varying</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">) |</span></span>
<span class="line"><span style="color:#E1E4E8;"> z      | </span><span style="color:#F97583;">date</span><span style="color:#E1E4E8;">                  |</span></span>
<span class="line"><span style="color:#E1E4E8;">Indexes:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;uk_t_y&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">UNIQUE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">CONSTRAINT</span><span style="color:#E1E4E8;">, btree (y), tablespace </span><span style="color:#9ECBFF;">&quot;ts_foobar01&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;idx_t_x&quot;</span><span style="color:#E1E4E8;"> btree (x), tablespace </span><span style="color:#9ECBFF;">&quot;ts_foobar01&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">Tablespace: </span><span style="color:#9ECBFF;">&quot;ts_foobar01&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 也可以把表、数据库在表空间上的移动</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar02 </span><span style="color:#F97583;">LOCATION</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/tmp/foobar02&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> TABLESPACE</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> mydb </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar02;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar02;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 修改表空间的默认用户</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar </span><span style="color:#F97583;">OWNER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;foobar&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> USER foobar </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> default_tablespace </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ts_foobar&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">----- 查看表空间</span></span>
<span class="line"><span style="color:#24292E;">postgres@postgres</span><span style="color:#D73A49;">=&gt;SELECT</span><span style="color:#24292E;"> spcname, pg_tablespace_location(</span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_tablespace;</span></span>
<span class="line"><span style="color:#24292E;">  spcname   | pg_tablespace_location </span></span>
<span class="line"><span style="color:#6A737D;">------------+------------------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_default | </span></span>
<span class="line"><span style="color:#24292E;"> pg_global  | </span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres@postgres</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">\\db</span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                                  List of tablespaces</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">    |  </span><span style="color:#D73A49;">Owner</span><span style="color:#24292E;">   | </span><span style="color:#D73A49;">Location</span><span style="color:#24292E;"> | Access privileges | Options |  </span><span style="color:#D73A49;">Size</span><span style="color:#24292E;">   | </span><span style="color:#D73A49;">Description</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;">------------+----------+----------+-------------------+---------+---------+-------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_default | postgres |          |                   |         | </span><span style="color:#005CC5;">1981</span><span style="color:#24292E;"> MB | </span></span>
<span class="line"><span style="color:#24292E;"> pg_global  | postgres |          |                   |         | </span><span style="color:#005CC5;">639</span><span style="color:#24292E;"> kB  | </span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 创建表空间，目录需要先创建</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> TABLESPACE ts_foobar </span><span style="color:#D73A49;">LOCATION</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/tmp/foobar&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> TABLESPACE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_tablespace </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> spcname </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ts_foobar&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  |  spcname  | spcowner | spcacl | spcoptions</span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------+----------+--------+------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">16435</span><span style="color:#24292E;"> | ts_foobar |       </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> |        |</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\db</span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                                    List of tablespaces</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">    |  </span><span style="color:#D73A49;">Owner</span><span style="color:#24292E;">   |  </span><span style="color:#D73A49;">Location</span><span style="color:#24292E;">   | Access privileges | Options |  </span><span style="color:#D73A49;">Size</span><span style="color:#24292E;">   | </span><span style="color:#D73A49;">Description</span></span>
<span class="line"><span style="color:#6A737D;">------------+----------+-------------+-------------------+---------+---------+-------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_default | postgres |             |                   |         | </span><span style="color:#005CC5;">35</span><span style="color:#24292E;"> MB   |</span></span>
<span class="line"><span style="color:#24292E;"> pg_global  | postgres |             |                   |         | </span><span style="color:#005CC5;">464</span><span style="color:#24292E;"> kB  |</span></span>
<span class="line"><span style="color:#24292E;"> ts_foobar  | postgres | </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">tmp</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">foobar |                   |         | </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> bytes |</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 创建数据库，并指向表空间</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> mydb </span><span style="color:#D73A49;">OWNER</span><span style="color:#24292E;"> postgres TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">, datname </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_database;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  |  datname</span></span>
<span class="line"><span style="color:#6A737D;">-------+-----------</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | template1</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">12918</span><span style="color:#24292E;"> | template0</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">12923</span><span style="color:#24292E;"> | postgres</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">16439</span><span style="color:#24292E;"> | mydb</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\</span><span style="color:#D73A49;">connect</span><span style="color:#24292E;"> mydb;</span></span>
<span class="line"><span style="color:#24292E;">You are </span><span style="color:#D73A49;">now</span><span style="color:#24292E;"> connected </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;mydb&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> user </span><span style="color:#032F62;">&quot;postgres&quot;</span><span style="color:#24292E;">.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 在上述创建的表空间中添加表</span></span>
<span class="line"><span style="color:#24292E;">mydb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span><span style="color:#24292E;"> foobar(x </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">, y </span><span style="color:#D73A49;">varchar</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">30</span><span style="color:#24292E;">), z </span><span style="color:#D73A49;">date</span><span style="color:#24292E;">) TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"><span style="color:#24292E;">mydb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">INSERT INTO</span><span style="color:#24292E;"> foobar </span><span style="color:#D73A49;">VALUES</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;ShangHai&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">()), (</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;NanJing&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">()), (</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;HangZhou&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">mydb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">INDEX</span><span style="color:#24292E;"> idx_foobar_x </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> foobar(x) TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">INDEX</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 添加表的主键约束或是唯一键约束的时候指定表空间</span></span>
<span class="line"><span style="color:#24292E;">mydb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span><span style="color:#24292E;"> foobar </span><span style="color:#D73A49;">ADD</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">CONSTRAINT</span><span style="color:#24292E;"> uk_foobar_y </span><span style="color:#D73A49;">UNIQUE</span><span style="color:#24292E;">(y) </span><span style="color:#D73A49;">USING</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">INDEX</span><span style="color:#24292E;"> TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">------ 查看对应的OID</span></span>
<span class="line"><span style="color:#24292E;">mydb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_class </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> relname </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;foobar&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span></span>
<span class="line"><span style="color:#6A737D;">-------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">16440</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">mydb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_database </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> datname </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;mydb&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span></span>
<span class="line"><span style="color:#6A737D;">-------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">16439</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 查看表所在文件，可以直接在目录下查找对应文件</span></span>
<span class="line"><span style="color:#24292E;">mydb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> pg_relation_filepath(</span><span style="color:#032F62;">&#39;foobar&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">             pg_relation_filepath</span></span>
<span class="line"><span style="color:#6A737D;">----------------------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> pg_tblspc</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">16435</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">PG_9</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">5_201510051</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">16439</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">16440</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">$ ls </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">l $PGDATA</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">pg_tblspc</span></span>
<span class="line"><span style="color:#24292E;">total </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">lrwxrwxrwx </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> postgres postgres </span><span style="color:#005CC5;">11</span><span style="color:#24292E;"> 9月  </span><span style="color:#005CC5;">27</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">23</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">04</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16435</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">tmp</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">foobar</span></span>
<span class="line"><span style="color:#24292E;">total </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">bash</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">$ ls </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">tmp</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">foobar</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">PG_9</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">5_201510051</span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">l</span></span>
<span class="line"><span style="color:#24292E;">total </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">drwx</span><span style="color:#6A737D;">------ 2 postgres postgres   40 9月  27 23:13 13294</span></span>
<span class="line"><span style="color:#24292E;">drwx</span><span style="color:#6A737D;">------ 2 postgres postgres 5400 9月  27 23:20 16439</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 也可以修改表空间名称</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> TABLESPACE ts_foobar RENAME </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> ts_foobar01;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLESPACE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 此时表T的表空间名称会相应发生变化</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\d t</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">Table</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;public.t&quot;</span></span>
<span class="line"><span style="color:#24292E;"> Column |         </span><span style="color:#D73A49;">Type</span><span style="color:#24292E;">          | Modifiers</span></span>
<span class="line"><span style="color:#6A737D;">--------+-----------------------+-----------</span></span>
<span class="line"><span style="color:#24292E;"> x      | </span><span style="color:#D73A49;">integer</span><span style="color:#24292E;">               |</span></span>
<span class="line"><span style="color:#24292E;"> y      | </span><span style="color:#D73A49;">character varying</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">30</span><span style="color:#24292E;">) |</span></span>
<span class="line"><span style="color:#24292E;"> z      | </span><span style="color:#D73A49;">date</span><span style="color:#24292E;">                  |</span></span>
<span class="line"><span style="color:#24292E;">Indexes:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;uk_t_y&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">UNIQUE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">CONSTRAINT</span><span style="color:#24292E;">, btree (y), tablespace </span><span style="color:#032F62;">&quot;ts_foobar01&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;idx_t_x&quot;</span><span style="color:#24292E;"> btree (x), tablespace </span><span style="color:#032F62;">&quot;ts_foobar01&quot;</span></span>
<span class="line"><span style="color:#24292E;">Tablespace: </span><span style="color:#032F62;">&quot;ts_foobar01&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 也可以把表、数据库在表空间上的移动</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> TABLESPACE ts_foobar02 </span><span style="color:#D73A49;">LOCATION</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/tmp/foobar02&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> TABLESPACE</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> mydb </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> TABLESPACE ts_foobar02;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> TABLESPACE ts_foobar02;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 修改表空间的默认用户</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> TABLESPACE ts_foobar </span><span style="color:#D73A49;">OWNER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;foobar&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> USER foobar </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> default_tablespace </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ts_foobar&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>当创建 cluster 时，默认会创建 <code>pg_global</code>、<code>pg_default</code> 两个 tablespace，其中前者保存了 cluster-wide 相关的数据，如 <code>pg_database</code>、<code>pg_group</code> 等，当然你不能在该 tablespace 下创建对象。</p><p>后者，则保存在 <code>$PGDATA/base</code> 目录下，是系统默认表空间，可通过 <code>set default tablespace=ts-name</code> 指定为其他表空间。</p><p>要注意的是，如果创建对象时没有指定 tablespace，它会按照上一级的对象所在 tablespace 创建相应的对象。如，创建 index 时默认与 table 相同；创建 table 时默认与 schema 相同，以此类推</p><h3 id="删除" tabindex="-1">删除 <a class="header-anchor" href="#删除" aria-label="Permalink to &quot;删除&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">-- 如果删除时表空间中仍然有数据库，那么会报错</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">DROP</span><span style="color:#E1E4E8;"> TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#E1E4E8;">ERROR:  tablespace </span><span style="color:#9ECBFF;">&quot;ts_foobar&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">not</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">empty</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 查看那些DBs保存在了该表空间中</span></span>
<span class="line"><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">d</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">datname</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">t</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">spcname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_database d </span><span style="color:#F97583;">JOIN</span><span style="color:#E1E4E8;"> pg_tablespace t </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">d</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">dattablespace</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">t</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">oid</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">t</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">spcname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ts_foobar&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 据说这个有效的，不过DBs的信息没有保存在pg_class中</span></span>
<span class="line"><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relname</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">t</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">spcname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_class c </span><span style="color:#F97583;">JOIN</span><span style="color:#E1E4E8;"> pg_tablespace t </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">reltablespace</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">t</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">oid</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">t</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">spcname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ts_foobar&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">-- 如果删除时表空间中仍然有数据库，那么会报错</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">DROP</span><span style="color:#24292E;"> TABLESPACE ts_foobar;</span></span>
<span class="line"><span style="color:#24292E;">ERROR:  tablespace </span><span style="color:#032F62;">&quot;ts_foobar&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">is</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">not</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">empty</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 查看那些DBs保存在了该表空间中</span></span>
<span class="line"><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">d</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">datname</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">t</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">spcname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_database d </span><span style="color:#D73A49;">JOIN</span><span style="color:#24292E;"> pg_tablespace t </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">d</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">dattablespace</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">t</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">oid</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">t</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">spcname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ts_foobar&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 据说这个有效的，不过DBs的信息没有保存在pg_class中</span></span>
<span class="line"><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relname</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">t</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">spcname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_class c </span><span style="color:#D73A49;">JOIN</span><span style="color:#24292E;"> pg_tablespace t </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">reltablespace</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">t</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">oid</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">t</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">spcname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ts_foobar&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><h3 id="tablesapce-与-schema-的区别" tabindex="-1">tablesapce 与 schema 的区别 <a class="header-anchor" href="#tablesapce-与-schema-的区别" aria-label="Permalink to &quot;tablesapce 与 schema 的区别&quot;">​</a></h3><p>tablespace 实际只影响到 cluster 中数据的存储位置；而 schema 则会影响到数据在 database 中的逻辑组织方式，也就是会影响到一个对象名的解析，而 tablespace 则不会。</p><p>也就是说，当创建了 tablespace 之后，实际就不需要再关心了，而 schema 则不同</p><p>创建一个只读用户 <code>readonly</code>，将 <code>db1</code> 数据的所有表的只读权限赋予给 <code>readonly</code> 用户</p><h2 id="_1-创建用户" tabindex="-1">1.创建用户 <a class="header-anchor" href="#_1-创建用户" aria-label="Permalink to &quot;1.创建用户&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> user </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;password&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> user </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;password&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><h2 id="_2-切换当前数据库" tabindex="-1">2.切换当前数据库 <a class="header-anchor" href="#_2-切换当前数据库" aria-label="Permalink to &quot;2.切换当前数据库&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# \\c db1</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;db1&quot; as user &quot;postgres&quot;.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# \\c db1</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;db1&quot; as user &quot;postgres&quot;.</span></span></code></pre></div><h2 id="_3-给-readonly-用户授权" tabindex="-1">3.给 readonly 用户授权 <a class="header-anchor" href="#_3-给-readonly-用户授权" aria-label="Permalink to &quot;3.给 readonly 用户授权&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">db1</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> all tables </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">db1</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> all tables </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;">;</span></span></code></pre></div><h2 id="_4-创建用户并配置密码" tabindex="-1">4.创建用户并配置密码 <a class="header-anchor" href="#_4-创建用户并配置密码" aria-label="Permalink to &quot;4.创建用户并配置密码&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#pg10之间版本，创建用户并配置密码</span></span>
<span class="line"><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">moni</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;moniff61384e&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#创建数据库并属于用户</span></span>
<span class="line"><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">d_moni</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">owner</span><span style="color:#E1E4E8;"> moni;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#授权</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> all privileges </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> d_moni </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> moni;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#</span><span style="color:#79B8FF;">pg9</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres@db5</span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> psql  </span></span>
<span class="line"><span style="color:#E1E4E8;">psql (</span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)  </span></span>
<span class="line"><span style="color:#F97583;">Type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;help&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> help.</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;"> digoal_01 nosuperuser nocreatedb nocreaterole noinherit </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">encrypted</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;digoal_01&#39;</span><span style="color:#E1E4E8;">;  </span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> digoal_01 </span><span style="color:#F97583;">encoding</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;UTF8&#39;</span><span style="color:#E1E4E8;"> template template0 </span><span style="color:#F97583;">owner</span><span style="color:#E1E4E8;"> digoal_01;  </span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\c digoal_01 digoal_01  </span></span>
<span class="line"><span style="color:#E1E4E8;">You are </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;"> connected </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;digoal_01&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> user </span><span style="color:#9ECBFF;">&quot;digoal_01&quot;</span><span style="color:#E1E4E8;">.  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">digoal_01</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> digoal_01 authorization digoal_01;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#pg10之间版本，创建用户并配置密码</span></span>
<span class="line"><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">moni</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;moniff61384e&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#创建数据库并属于用户</span></span>
<span class="line"><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">d_moni</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">owner</span><span style="color:#24292E;"> moni;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#授权</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> all privileges </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> d_moni </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> moni;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#</span><span style="color:#005CC5;">pg9</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">postgres@db5</span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> psql  </span></span>
<span class="line"><span style="color:#24292E;">psql (</span><span style="color:#005CC5;">9</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)  </span></span>
<span class="line"><span style="color:#D73A49;">Type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;help&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> help.</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;"> digoal_01 nosuperuser nocreatedb nocreaterole noinherit </span><span style="color:#D73A49;">login</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">encrypted</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;digoal_01&#39;</span><span style="color:#24292E;">;  </span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;">  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> digoal_01 </span><span style="color:#D73A49;">encoding</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;UTF8&#39;</span><span style="color:#24292E;"> template template0 </span><span style="color:#D73A49;">owner</span><span style="color:#24292E;"> digoal_01;  </span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\c digoal_01 digoal_01  </span></span>
<span class="line"><span style="color:#24292E;">You are </span><span style="color:#D73A49;">now</span><span style="color:#24292E;"> connected </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;digoal_01&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> user </span><span style="color:#032F62;">&quot;digoal_01&quot;</span><span style="color:#24292E;">.  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">digoal_01</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> digoal_01 authorization digoal_01;</span></span></code></pre></div><h2 id="_5-修改用户密码" tabindex="-1">5.修改用户密码 <a class="header-anchor" href="#_5-修改用户密码" aria-label="Permalink to &quot;5.修改用户密码&quot;">​</a></h2><h3 id="_5-1方式1" tabindex="-1">5.1方式1 <a class="header-anchor" href="#_5-1方式1" aria-label="Permalink to &quot;5.1方式1&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">test1=&gt; \\password</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter new password:</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter it again:</span></span>
<span class="line"><span style="color:#e1e4e8;">test1=&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">我将原密码hello，修改为hellojava.123456</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这种修改方式相当于向postgres server 发送了如下命令：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER USER postgres PASSWORD &#39;02c3c8c0f38ff917487c06eb57d4b984&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">后面的字符串是 hellojava经过md5加密后的字符串</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">12345</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：尽量不要使用postgres作为用户密码，防止被攻击</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;"> psql -c &quot;ALTER USER postgres WITH PASSWORD &#39;securep@free&#39;;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">test1=&gt; \\password</span></span>
<span class="line"><span style="color:#24292e;">Enter new password:</span></span>
<span class="line"><span style="color:#24292e;">Enter it again:</span></span>
<span class="line"><span style="color:#24292e;">test1=&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">我将原密码hello，修改为hellojava.123456</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这种修改方式相当于向postgres server 发送了如下命令：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER USER postgres PASSWORD &#39;02c3c8c0f38ff917487c06eb57d4b984&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">后面的字符串是 hellojava经过md5加密后的字符串</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">12345</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：尽量不要使用postgres作为用户密码，防止被攻击</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;"> psql -c &quot;ALTER USER postgres WITH PASSWORD &#39;securep@free&#39;;&quot;</span></span></code></pre></div><h3 id="_5-2sql修改" tabindex="-1">5.2sql修改 <a class="header-anchor" href="#_5-2sql修改" aria-label="Permalink to &quot;5.2sql修改&quot;">​</a></h3><p>这种方式不仅仅限于psql了，其余客户端也能修改，如pgadmin等</p><p>ALTER USER test1 PASSWORD &#39;secret&#39;</p><p>弊端：通过sql修改，有可能会将修改语句记录在相关工具的log里。 例如：通过psql 运行该条sql，则在.psql_history文件中会有相应语句的记录 有密码泄露的风险</p><h1 id="_2-postgresql-角色权限管理" tabindex="-1">2.PostgreSQL 角色权限管理 <a class="header-anchor" href="#_2-postgresql-角色权限管理" aria-label="Permalink to &quot;2.PostgreSQL  角色权限管理&quot;">​</a></h1><p>在 PG 中，对于不同的对象，可以进行配置的权限是不同的，详细内容查看 <a href="https://www.postgresql.org/docs/9.5/static/sql-grant.html" target="_blank" rel="noreferrer">PostgreSQL Documentation - GRANT</a> 的定义。例如，数据库有 <code>CREATE</code>、<code>CONNECT</code> 等权限，而表有 <code>SELECT</code>、<code>INSERT</code>、<code>UPDATE</code>、<code>DELETE</code>、<code>TRUNCATE</code> 等权限。</p><p>另外，<code>WITH ADMIN OPTION</code> 表示被赋予权限的用户，还可以将对应的权限赋予给其他人</p><p>PostgreSQL中使用”角色”的概念，表示用户账户。拥有登录权限的角色称为可登录角色。一个角色可以继承其他角色的权限，从而成为其成员角色，一个拥有成员角色的角色被称为组角色。</p><p>PostgreSQL新版本去除了”用户”和”组”的概念，取而待之的是”可登录角色”和”组角色”。但是为保持前向兼容，create user 和 create group 这两个命令依然支持，但建议最好不要使用。</p><p>在PostgreSQL 安装过程中数据库初始化，系统会默认创建一个postgres的角色，同时会创建一个同名（postgres）的数据库。安装完成后要做的第一件事就是用psql或者pgAdmin工具以postgres角色身份登录，然后创建其他已规划好的角色</p><p>1.CREATE ROLE创建的用户默认不带LOGIN属性，而CREATE USER创建的用户默认带有LOGIN属性，如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE pg_test_user_1; /*默认不带LOGIN属性*/  </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE  </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# CREATE USER pg_test_user_2; /*默认具有LOGIN属性*/  </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE  </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\du  </span></span>
<span class="line"><span style="color:#e1e4e8;">               List of roles  </span></span>
<span class="line"><span style="color:#e1e4e8;">   Role name    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_test_user_1 | Cannot login | {}  </span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_test_user_2 |              | {}  </span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#e1e4e8;">                : Create role  </span></span>
<span class="line"><span style="color:#e1e4e8;">                : Create DB  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE pg_test_user_1; /*默认不带LOGIN属性*/  </span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE  </span></span>
<span class="line"><span style="color:#24292e;">postgres=# CREATE USER pg_test_user_2; /*默认具有LOGIN属性*/  </span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE  </span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\du  </span></span>
<span class="line"><span style="color:#24292e;">               List of roles  </span></span>
<span class="line"><span style="color:#24292e;">   Role name    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#24292e;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#24292e;"> pg_test_user_1 | Cannot login | {}  </span></span>
<span class="line"><span style="color:#24292e;"> pg_test_user_2 |              | {}  </span></span>
<span class="line"><span style="color:#24292e;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#24292e;">                : Create role  </span></span>
<span class="line"><span style="color:#24292e;">                : Create DB  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">postgres=#</span></span></code></pre></div><p>2.在创建用户时赋予角色属性</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> pg_test_user_3 CREATEDB;   </span><span style="color:#6A737D;">/*具有创建数据库的属性*/</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\du  </span></span>
<span class="line"><span style="color:#E1E4E8;">               List of roles  </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">Role</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_1 | Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;"> | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_2 |              | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_3 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> pg_test_user_4 CREATEDB </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;123456&#39;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">/*具有创建数据库及带有密码登陆的属性 */</span><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\du  </span></span>
<span class="line"><span style="color:#E1E4E8;">               List of roles  </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">Role</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_1 | Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;"> | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_2 |              | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_3 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_4 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> pg_test_user_3 CREATEDB;   </span><span style="color:#6A737D;">/*具有创建数据库的属性*/</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\du  </span></span>
<span class="line"><span style="color:#24292E;">               List of roles  </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">Role</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_1 | Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;"> | {}  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_2 |              | {}  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_3 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB  </span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> pg_test_user_4 CREATEDB </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;123456&#39;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">/*具有创建数据库及带有密码登陆的属性 */</span><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\du  </span></span>
<span class="line"><span style="color:#24292E;">               List of roles  </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">Role</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_1 | Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;"> | {}  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_2 |              | {}  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_3 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_4 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB  </span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">#</span></span></code></pre></div><p>3.给已存在用户赋予各种权限</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\du  </span></span>
<span class="line"><span style="color:#E1E4E8;">               List of roles  </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">Role</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_3 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_4 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> pg_test_user_3 </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">LOGIN</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">/*赋予登录权限*/</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\du  </span></span>
<span class="line"><span style="color:#E1E4E8;">               List of roles  </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">Role</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_3 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_4 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> pg_test_user_4 </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> CREATEROLE;</span><span style="color:#6A737D;">/*赋予创建角色的权限*/</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\du  </span></span>
<span class="line"><span style="color:#E1E4E8;">               List of roles  </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">Role</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_3 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_test_user_4 | </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">  | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">                : </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> pg_test_user_4 </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;654321&#39;</span><span style="color:#E1E4E8;">;</span><span style="color:#6A737D;">/*修改密码*/</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> pg_test_user_4 VALID UNTIL </span><span style="color:#9ECBFF;">&#39;JUL 7 14:00:00 2012 +8&#39;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">/*设置角色的有效期*  </span></span>
<span class="line"><span style="color:#6A737D;">ALTER ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\du  </span></span>
<span class="line"><span style="color:#24292E;">               List of roles  </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">Role</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_3 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_4 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB  </span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> pg_test_user_3 </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">LOGIN</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">/*赋予登录权限*/</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\du  </span></span>
<span class="line"><span style="color:#24292E;">               List of roles  </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">Role</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_3 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_4 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB  </span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> pg_test_user_4 </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> CREATEROLE;</span><span style="color:#6A737D;">/*赋予创建角色的权限*/</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\du  </span></span>
<span class="line"><span style="color:#24292E;">               List of roles  </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">Role</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">    |  Attributes  | Member of  </span></span>
<span class="line"><span style="color:#6A737D;">----------------+--------------+-----------  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_3 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB    | {}  </span></span>
<span class="line"><span style="color:#24292E;"> pg_test_user_4 | </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">  | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB  </span></span>
<span class="line"><span style="color:#24292E;">                : Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> postgres       | Superuser    | {}  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">                : </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB  </span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> pg_test_user_4 </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;654321&#39;</span><span style="color:#24292E;">;</span><span style="color:#6A737D;">/*修改密码*/</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> pg_test_user_4 VALID UNTIL </span><span style="color:#032F62;">&#39;JUL 7 14:00:00 2012 +8&#39;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">/*设置角色的有效期*  </span></span>
<span class="line"><span style="color:#6A737D;">ALTER ROLE</span></span></code></pre></div><h2 id="_2-1角色" tabindex="-1">2.1角色 <a class="header-anchor" href="#_2-1角色" aria-label="Permalink to &quot;2.1角色&quot;">​</a></h2><p><strong>1.创建普通用户角色</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">create role username1 login password &#39;123456&#39; createdb valid until &#39;infinity&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create role username2 login password &#39;123456&#39; craterole valid until &#39;infinity&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create role username3 login password &#39;123456&#39; login valid until &#39;infinity’;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">create role username1 login password &#39;123456&#39; createdb valid until &#39;infinity&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create role username2 login password &#39;123456&#39; craterole valid until &#39;infinity&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create role username3 login password &#39;123456&#39; login valid until &#39;infinity’;</span></span></code></pre></div><p>valid 是可选的，其功能是为此角色权限设置有效期，过期后所有权限都将失效，默认为&#39;infinity&#39;，即永不过期</p><p>createdb修饰符表示为此角色赋予创建新数据库的权限</p><p>craterole修饰符表示为此角色赋予创建新角色的权限</p><p>login 修饰符表示此角色只有登录权限</p><p><strong>2.创建超级用户角色</strong></p><p>create role username4 login password &#39;123456&#39; superuser valid until &#39;2020-1-1 00:00:00&#39;;</p><p><strong>3.修改角色权限</strong></p><p>alter role username4 nologin nocreatedb;</p><h2 id="_2-2组角色" tabindex="-1">2.2组角色 <a class="header-anchor" href="#_2-2组角色" aria-label="Permalink to &quot;2.2组角色&quot;">​</a></h2><p><strong>1.创建组角色</strong></p><p>create role username5 inherit;</p><p>grant username5 to username1;</p><p>grant username5 to username2;</p><p>Inherit表示username5的任何一个成员角色都将自动继承除“超级用户权限”外的所有权限。出于安全考虑，PostgreSQL不允许超级用户权限通过继承的方式传递。</p><p><strong>2.从组角色继承权限</strong></p><p>PostgreSQL还有一个奇葩功能是禁止组角色将其权限授予其成员角色，该功能通过NOINHERIT 关键字控制。因此创建组角色时务必显式声明INHERIT或者NOINHERIT关键字。</p><p>有些权限无法继承，例如前面提到的SUPERUSER超级用户权限。但是其成员角色可以通过SET ROLE 命令来实现冒名顶替其父角色的身份，从而得到超级用户权限，但是这种冒名顶替仅在当前会话存储期间有效。</p><p>例如：username1是username5的成员角色，其可以通过下列命令实现冒名顶替的目的。</p><p>SET ROLE username5</p><p>当然这是非永久授权行为，一旦会话结束，超级用户权限将被回收</p><p>命令：<strong>SET SESSION AUTHORIZATION username1</strong>,更加强大。</p><p>两者比较：</p><p>（1）首先，只有具备SUPERUSER权限的角色才可以执行SET SESSION AUTHORIZATION，SET ROLE任何一个成员角色都可以执行；</p><p>（2）其次，SET SESSION AUTHORIZATION可以使当前角色扮演系统中任何一个其他角色，SET ROLE仅限于扮演父角色。</p><p>（3）从系统内部实现机理看，每个会话会有两个表示当前用户身份的环境变量：一个是session_user，即当前用户登录带的原始身份；一个是current_user，即当前用户所扮演的身份，默认二者一致。SET SESSION AUTHORIZATION命令会将session_user和current_user都替换为所扮演角色的相应身份ID，而SET ROLE只会修改current_user，而保持session_user不变。这也意味着SET SESSION AUTHORIZATION命令会对后续的SET ROLE命令产生影响，因为原始身份session_user发生了变化；而SET ROLE不会对后续的SET SESSION AUTHORIZATION产生影响，因为原始身份session_user未发生变化</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311061113634.jpg" alt=""></p><h2 id="_2-3删除角色" tabindex="-1">2.3删除角色 <a class="header-anchor" href="#_2-3删除角色" aria-label="Permalink to &quot;2.3删除角色&quot;">​</a></h2><p>如果要删除的用户还拥有数据库对象，或者这个用户在某些数据库对象上还拥有权限时，不能删除</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">----- 重新将某个用户的权限赋值给另外的用户，如果不知道可以赋给postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">REASSIGN OWNED </span><span style="color:#F97583;">BY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;olduser&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;newuser&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 删除赋给该用户的所有权限</span></span>
<span class="line"><span style="color:#F97583;">DROP</span><span style="color:#E1E4E8;"> OWNED </span><span style="color:#F97583;">BY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;olduser&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">----- 重新将某个用户的权限赋值给另外的用户，如果不知道可以赋给postgres</span></span>
<span class="line"><span style="color:#24292E;">REASSIGN OWNED </span><span style="color:#D73A49;">BY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;olduser&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;newuser&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 删除赋给该用户的所有权限</span></span>
<span class="line"><span style="color:#D73A49;">DROP</span><span style="color:#24292E;"> OWNED </span><span style="color:#D73A49;">BY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;olduser&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><h2 id="_2-4角色与用户的关系" tabindex="-1">2.4角色与用户的关系 <a class="header-anchor" href="#_2-4角色与用户的关系" aria-label="Permalink to &quot;2.4角色与用户的关系&quot;">​</a></h2><p>在 PostgreSQL 中，实际上这是两个完全相同的对象，唯一的区别是在通过 <code>CREATE USER</code> 命令创建时会默认添加 <code>LOGIN</code> 权限</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">----- 只创建角色，则在尝试登陆的时候会报错</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> foobar1 </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;kidding&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">----- 添加登陆的权限</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> foobar1 </span><span style="color:#F97583;">LOGIN</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 创建用户时，默认会添加LOGIN权限</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> USER foobar2 </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;kidding&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> foobar2 </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;kidding&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">LOGIN</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">----- 只创建角色，则在尝试登陆的时候会报错</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> foobar1 </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;kidding&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">----- 添加登陆的权限</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> foobar1 </span><span style="color:#D73A49;">LOGIN</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 创建用户时，默认会添加LOGIN权限</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> USER foobar2 </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;kidding&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> foobar2 </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;kidding&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">LOGIN</span><span style="color:#24292E;">;</span></span></code></pre></div><p>在 PG 中，默认有一个 public 角色，代表所有人的意思</p><h2 id="_2-5查看权限" tabindex="-1">2.5查看权限 <a class="header-anchor" href="#_2-5查看权限" aria-label="Permalink to &quot;2.5查看权限&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres@han_db</span><span style="color:#F97583;">=&gt;select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_user;</span></span>
<span class="line"><span style="color:#E1E4E8;"> usename  | usesysid | usecreatedb | usesuper | userepl | usebypassrls |  passwd  | valuntil |          useconfig           </span></span>
<span class="line"><span style="color:#6A737D;">----------+----------+-------------+----------+---------+--------------+----------+----------+------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> test     |    </span><span style="color:#79B8FF;">17732</span><span style="color:#E1E4E8;"> | f           | f        | f       | f            | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;"> |          | </span></span>
<span class="line"><span style="color:#E1E4E8;"> app      |    </span><span style="color:#79B8FF;">17735</span><span style="color:#E1E4E8;"> | f           | f        | f       | f            | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;"> |          | {default_tablespace</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">tbl_app}</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres |       </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> | t           | t        | t       | t            | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;"> |          | </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> |    </span><span style="color:#79B8FF;">17803</span><span style="color:#E1E4E8;"> | f           | f        | f       | f            | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;"> |          | </span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres@han_db</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;">\\du</span></span>
<span class="line"><span style="color:#E1E4E8;">                                   List of roles</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Role</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;"> |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#6A737D;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> app       |                                                            | {}</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres  | Superuser, </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB, Replication, Bypass RLS | {}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;">  |                                                            | {}</span></span>
<span class="line"><span style="color:#E1E4E8;"> test      |                                                            | {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres@han_db</span><span style="color:#F97583;">=&gt;select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">information_schema</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">table_privileges</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> grantee</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;用户&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> grantor | grantee | table_catalog | table_schema | table_name | privilege_type | is_grantable | with_hierarchy </span></span>
<span class="line"><span style="color:#6A737D;">---------+---------+---------------+--------------+------------+----------------+--------------+----------------</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres@han_db</span><span style="color:#D73A49;">=&gt;select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_user;</span></span>
<span class="line"><span style="color:#24292E;"> usename  | usesysid | usecreatedb | usesuper | userepl | usebypassrls |  passwd  | valuntil |          useconfig           </span></span>
<span class="line"><span style="color:#6A737D;">----------+----------+-------------+----------+---------+--------------+----------+----------+------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> test     |    </span><span style="color:#005CC5;">17732</span><span style="color:#24292E;"> | f           | f        | f       | f            | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;"> |          | </span></span>
<span class="line"><span style="color:#24292E;"> app      |    </span><span style="color:#005CC5;">17735</span><span style="color:#24292E;"> | f           | f        | f       | f            | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;"> |          | {default_tablespace</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">tbl_app}</span></span>
<span class="line"><span style="color:#24292E;"> postgres |       </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> | t           | t        | t       | t            | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;"> |          | </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> |    </span><span style="color:#005CC5;">17803</span><span style="color:#24292E;"> | f           | f        | f       | f            | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;"> |          | </span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres@han_db</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;">\\du</span></span>
<span class="line"><span style="color:#24292E;">                                   List of roles</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">Role</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;"> |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#6A737D;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#24292E;"> app       |                                                            | {}</span></span>
<span class="line"><span style="color:#24292E;"> postgres  | Superuser, </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB, Replication, Bypass RLS | {}</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;">  |                                                            | {}</span></span>
<span class="line"><span style="color:#24292E;"> test      |                                                            | {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres@han_db</span><span style="color:#D73A49;">=&gt;select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">information_schema</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">table_privileges</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> grantee</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;用户&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> grantor | grantee | table_catalog | table_schema | table_name | privilege_type | is_grantable | with_hierarchy </span></span>
<span class="line"><span style="color:#6A737D;">---------+---------+---------------+--------------+------------+----------------+--------------+----------------</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span></code></pre></div><blockquote><p>[!WARNING]</p><p>查看用户拥有哪些权限，需要切换到所在数据库下，然后进行查看</p></blockquote><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=arwdDxt/postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">    表示postgres这个角色所拥有的权限，对于public则为空；对应的权限为arwdDxt，相应含义如下；该权限是postgres所赋于的。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rolename=xxxx -- privileges granted to a role</span></span>
<span class="line"><span style="color:#e1e4e8;">        =xxxx -- privileges granted to PUBLIC</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            r -- SELECT (&quot;read&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">            w -- UPDATE (&quot;write&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">            a -- INSERT (&quot;append&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">            d -- DELETE</span></span>
<span class="line"><span style="color:#e1e4e8;">            D -- TRUNCATE</span></span>
<span class="line"><span style="color:#e1e4e8;">            x -- REFERENCES</span></span>
<span class="line"><span style="color:#e1e4e8;">            t -- TRIGGER</span></span>
<span class="line"><span style="color:#e1e4e8;">            X -- EXECUTE</span></span>
<span class="line"><span style="color:#e1e4e8;">            U -- USAGE</span></span>
<span class="line"><span style="color:#e1e4e8;">            C -- CREATE</span></span>
<span class="line"><span style="color:#e1e4e8;">            c -- CONNECT</span></span>
<span class="line"><span style="color:#e1e4e8;">            T -- TEMPORARY</span></span>
<span class="line"><span style="color:#e1e4e8;">      arwdDxt -- ALL PRIVILEGES (for tables, varies for other objects)</span></span>
<span class="line"><span style="color:#e1e4e8;">            * -- grant option for preceding privilege</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        /yyyy -- role that granted this privilege</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=arwdDxt/postgres</span></span>
<span class="line"><span style="color:#24292e;">    表示postgres这个角色所拥有的权限，对于public则为空；对应的权限为arwdDxt，相应含义如下；该权限是postgres所赋于的。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rolename=xxxx -- privileges granted to a role</span></span>
<span class="line"><span style="color:#24292e;">        =xxxx -- privileges granted to PUBLIC</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            r -- SELECT (&quot;read&quot;)</span></span>
<span class="line"><span style="color:#24292e;">            w -- UPDATE (&quot;write&quot;)</span></span>
<span class="line"><span style="color:#24292e;">            a -- INSERT (&quot;append&quot;)</span></span>
<span class="line"><span style="color:#24292e;">            d -- DELETE</span></span>
<span class="line"><span style="color:#24292e;">            D -- TRUNCATE</span></span>
<span class="line"><span style="color:#24292e;">            x -- REFERENCES</span></span>
<span class="line"><span style="color:#24292e;">            t -- TRIGGER</span></span>
<span class="line"><span style="color:#24292e;">            X -- EXECUTE</span></span>
<span class="line"><span style="color:#24292e;">            U -- USAGE</span></span>
<span class="line"><span style="color:#24292e;">            C -- CREATE</span></span>
<span class="line"><span style="color:#24292e;">            c -- CONNECT</span></span>
<span class="line"><span style="color:#24292e;">            T -- TEMPORARY</span></span>
<span class="line"><span style="color:#24292e;">      arwdDxt -- ALL PRIVILEGES (for tables, varies for other objects)</span></span>
<span class="line"><span style="color:#24292e;">            * -- grant option for preceding privilege</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        /yyyy -- role that granted this privilege</span></span></code></pre></div><h2 id="_2-6获取用户下所有对象的权限情况" tabindex="-1">2.6<strong>获取用户下所有对象的权限情况</strong> <a class="header-anchor" href="#_2-6获取用户下所有对象的权限情况" aria-label="Permalink to &quot;2.6**获取用户下所有对象的权限情况**&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">nsp</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> SchemaName</span></span>
<span class="line"><span style="color:#E1E4E8;">    ,</span><span style="color:#79B8FF;">cls</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ObjectName </span></span>
<span class="line"><span style="color:#E1E4E8;">    ,</span><span style="color:#79B8FF;">rol</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">rolname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ObjectOwner</span></span>
<span class="line"><span style="color:#E1E4E8;">    ,</span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cls</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relkind</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;r&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;TABLE&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;m&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;MATERIALIZED_VIEW&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;i&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;INDEX&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;S&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;SEQUENCE&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;v&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;VIEW&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;c&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;TYPE&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cls</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relkind</span><span style="color:#E1E4E8;">::</span><span style="color:#F97583;">text</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">end</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ObjectType</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_class cls</span></span>
<span class="line"><span style="color:#F97583;">join</span><span style="color:#E1E4E8;"> pg_roles rol </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">rol</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">oid</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cls</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relowner</span></span>
<span class="line"><span style="color:#F97583;">join</span><span style="color:#E1E4E8;"> pg_namespace nsp </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nsp</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">oid</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cls</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relnamespace</span></span>
<span class="line"><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nsp</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">not</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&#39;information_schema&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;pg_catalog&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">and</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nsp</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">not</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">like</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;pg_toast%&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">and</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">rol</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">rolname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;rw&#39;</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#F97583;">order by</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nsp</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">cls</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relname</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">注意，这个不能获取到schema和database的归属情况，只能获取到表和序列的objectowner的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">上面的这个sql，能查出下面的这种rolname</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">objectowner归属的</span></span>
<span class="line"><span style="color:#E1E4E8;">schemaname | objectname | objectowner | objecttype </span></span>
<span class="line"><span style="color:#6A737D;">------------+------------+-------------+------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> public     | sq1l       | rw          | </span><span style="color:#F97583;">SEQUENCE</span></span>
<span class="line"><span style="color:#E1E4E8;"> public     | t1         | rw          | </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> 对于下面的这2种情况，都查不出来的。</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">、表的owner是一个role，表里面access privilege又有其它的授权</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">、非public的schema下</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">db2</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> myschema;</span></span>
<span class="line"><span style="color:#E1E4E8;">db1</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">alter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> myschema </span><span style="color:#F97583;">owner</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> rw;</span></span>
<span class="line"><span style="color:#E1E4E8;">db1</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\dn</span></span>
<span class="line"><span style="color:#E1E4E8;">   List of schemas</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">   |  </span><span style="color:#F97583;">Owner</span><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#6A737D;">----------+----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> myschema | rw</span></span>
<span class="line"><span style="color:#E1E4E8;"> public   | postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">db2</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\d</span></span>
<span class="line"><span style="color:#E1E4E8;">        List of relations</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Schema</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">Type</span><span style="color:#E1E4E8;">  |  </span><span style="color:#F97583;">Owner</span><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#6A737D;">--------+------+-------+----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | tt   | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">db2</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\z tt</span></span>
<span class="line"><span style="color:#E1E4E8;">                                Access privileges</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Schema</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">Type</span><span style="color:#E1E4E8;">  |     Access privileges     | Column privileges | Policies </span></span>
<span class="line"><span style="color:#6A737D;">--------+------+-------+---------------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | tt   | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">arwdDxt</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">|                   | </span></span>
<span class="line"><span style="color:#E1E4E8;">        |      |       | dts</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">arwdDxt</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">postgres      |                   | </span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">nsp</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> SchemaName</span></span>
<span class="line"><span style="color:#24292E;">    ,</span><span style="color:#005CC5;">cls</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ObjectName </span></span>
<span class="line"><span style="color:#24292E;">    ,</span><span style="color:#005CC5;">rol</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">rolname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ObjectOwner</span></span>
<span class="line"><span style="color:#24292E;">    ,</span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cls</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relkind</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">when</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;r&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;TABLE&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">when</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;m&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;MATERIALIZED_VIEW&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">when</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;i&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;INDEX&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">when</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;S&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;SEQUENCE&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">when</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;v&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;VIEW&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">when</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;c&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;TYPE&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cls</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relkind</span><span style="color:#24292E;">::</span><span style="color:#D73A49;">text</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">end</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ObjectType</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_class cls</span></span>
<span class="line"><span style="color:#D73A49;">join</span><span style="color:#24292E;"> pg_roles rol </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">rol</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">oid</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cls</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relowner</span></span>
<span class="line"><span style="color:#D73A49;">join</span><span style="color:#24292E;"> pg_namespace nsp </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nsp</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">oid</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cls</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relnamespace</span></span>
<span class="line"><span style="color:#D73A49;">where</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nsp</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">not</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&#39;information_schema&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;pg_catalog&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">and</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nsp</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">not</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">like</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;pg_toast%&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">and</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">rol</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">rolname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;rw&#39;</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#D73A49;">order by</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nsp</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">cls</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relname</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">注意，这个不能获取到schema和database的归属情况，只能获取到表和序列的objectowner的情况</span></span>
<span class="line"><span style="color:#24292E;">上面的这个sql，能查出下面的这种rolname</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">objectowner归属的</span></span>
<span class="line"><span style="color:#24292E;">schemaname | objectname | objectowner | objecttype </span></span>
<span class="line"><span style="color:#6A737D;">------------+------------+-------------+------------</span></span>
<span class="line"><span style="color:#24292E;"> public     | sq1l       | rw          | </span><span style="color:#D73A49;">SEQUENCE</span></span>
<span class="line"><span style="color:#24292E;"> public     | t1         | rw          | </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> 对于下面的这2种情况，都查不出来的。</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">、表的owner是一个role，表里面access privilege又有其它的授权</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">、非public的schema下</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">db2</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> myschema;</span></span>
<span class="line"><span style="color:#24292E;">db1</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">alter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> myschema </span><span style="color:#D73A49;">owner</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> rw;</span></span>
<span class="line"><span style="color:#24292E;">db1</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\dn</span></span>
<span class="line"><span style="color:#24292E;">   List of schemas</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">   |  </span><span style="color:#D73A49;">Owner</span><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#6A737D;">----------+----------</span></span>
<span class="line"><span style="color:#24292E;"> myschema | rw</span></span>
<span class="line"><span style="color:#24292E;"> public   | postgres</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">db2</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\d</span></span>
<span class="line"><span style="color:#24292E;">        List of relations</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">Schema</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">Type</span><span style="color:#24292E;">  |  </span><span style="color:#D73A49;">Owner</span><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#6A737D;">--------+------+-------+----------</span></span>
<span class="line"><span style="color:#24292E;"> public | tt   | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">db2</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\z tt</span></span>
<span class="line"><span style="color:#24292E;">                                Access privileges</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">Schema</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">Type</span><span style="color:#24292E;">  |     Access privileges     | Column privileges | Policies </span></span>
<span class="line"><span style="color:#6A737D;">--------+------+-------+---------------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#24292E;"> public | tt   | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">arwdDxt</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">|                   | </span></span>
<span class="line"><span style="color:#24292E;">        |      |       | dts</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">arwdDxt</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">postgres      |                   | </span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span></code></pre></div><h1 id="_3-用户权限管理" tabindex="-1">3.用户权限管理 <a class="header-anchor" href="#_3-用户权限管理" aria-label="Permalink to &quot;3.用户权限管理&quot;">​</a></h1><p><a href="https://www.postgresql.org/docs/11/sql-createuser.html" target="_blank" rel="noreferrer">用户权限管理</a>文档</p><p><strong>注意：</strong></p><p>​ 创建好用户（角色）之后需要连接的话，还需要修改2个权限控制的配置文件（pg_hba.conf、pg_ident.conf）。并且创建用户（user）和创建角色（role）一样，唯一的区别是用户默认可以登录，而创建的角色默认不能登录。创建用户和角色的各个参数选项是一样</p><p>**安装*<em>PostgreSQL*<em>会自动创建一个postgres用户，需要切换到该用户下访问PostgreSQL</em></em></p><p>CREATE USER/ROLE name [ [ WITH ] option [ ... ] ] : 关键词 USER,ROLE； name 用户或角色名；</p><p>where option can be:</p><pre><code>  SUPERUSER | NOSUPERUSER      :超级权限，拥有所有权限，默认nosuperuser。
| CREATEDB | NOCREATEDB        :建库权限，默认nocreatedb。
| CREATEROLE | NOCREATEROLE    :建角色权限，拥有创建、修改、删除角色，默认nocreaterole。
| INHERIT | NOINHERIT          :继承权限，可以把除superuser权限继承给其他用户/角色，默认inherit。
| LOGIN | NOLOGIN              :登录权限，作为连接的用户，默认nologin，除非是create user（默认登录）。
| REPLICATION | NOREPLICATION  :复制权限，用于物理或则逻辑复制（复制和删除slots），默认是noreplication。
| BYPASSRLS | NOBYPASSRLS      :安全策略RLS权限，默认nobypassrls。
| CONNECTION LIMIT connlimit   :限制用户并发数，默认-1，不限制。正常连接会受限制，后台连接和prepared事务不受限制。
| [ ENCRYPTED ] PASSWORD &#39;password&#39; | PASSWORD NULL :设置密码，密码仅用于有login属性的用户，不使用密码身份验证，则可以省略此选项。可以选择将空密码显式写为PASSWORD NULL。
                                                     加密方法由配置参数password_encryption确定，密码始终以加密方式存储在系统目录中。
| VALID UNTIL &#39;timestamp&#39;      :密码有效期时间，不设置则用不失效。
| IN ROLE role_name [, ...]    :新角色将立即添加为新成员。
| IN GROUP role_name [, ...]   :同上
| ROLE role_name [, ...]       :ROLE子句列出一个或多个现有角色，这些角色自动添加为新角色的成员。 （这实际上使新角色成为“组”）。
| ADMIN role_name [, ...]      :与ROLE类似，但命名角色将添加到新角色WITH ADMIN OPTION，使他们有权将此角色的成员资格授予其他人。
| USER role_name [, ...]       :同上
| SYSID uid                    :被忽略，但是为向后兼容性而存在。
</code></pre><p><strong>示例：</strong></p><h2 id="_3-1-创建不需要密码登陆的用户zjy" tabindex="-1">3.1 创建不需要密码登陆的用户zjy： <a class="header-anchor" href="#_3-1-创建不需要密码登陆的用户zjy" aria-label="Permalink to &quot;3.1 创建不需要密码登陆的用户zjy：&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE zjy LOGIN;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE zjy LOGIN;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span></code></pre></div><p>创建该用户后，还不能直接登录。需要修改 <strong>pg_hba.conf</strong> 文件（后面会对该文件进行说明），加入：</p><p>①：本地登陆：local all all **trust **②：远程登陆：host all all 192.168.163.132/32 <strong>trust</strong></p><h2 id="_3-2-创建需要密码登陆的用户zjy" tabindex="-1">3.2 创建需要密码登陆的用户zjy <a class="header-anchor" href="#_3-2-创建需要密码登陆的用户zjy" aria-label="Permalink to &quot;3.2 创建需要密码登陆的用户zjy&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE USER zjy1 WITH PASSWORD &#39;zjy1&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE USER zjy1 WITH PASSWORD &#39;zjy1&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span></code></pre></div><p>{% em %} 和ROLE的区别是：USER带LOGIN属性{% endem %}。也需要修改 <strong>pg_hba.conf</strong> 文件（后面会对该文件进行说明），加入： host all all 192.168.163.132/32 <strong>md5</strong></p><h2 id="_3-3-创建有时间限制的用户zjy2" tabindex="-1">3.3 创建有时间限制的用户zjy2 <a class="header-anchor" href="#_3-3-创建有时间限制的用户zjy2" aria-label="Permalink to &quot;3.3 创建有时间限制的用户zjy2&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE zjy2 WITH LOGIN PASSWORD &#39;zjy2&#39; VALID UNTIL &#39;2019-05-30&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE zjy2 WITH LOGIN PASSWORD &#39;zjy2&#39; VALID UNTIL &#39;2019-05-30&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span></code></pre></div><p>和.3.2的处理方法一样，修改 <strong>pg_hba.conf</strong> 文件，该用户会的密码在给定的时间之后过期不可用</p><h2 id="_3-4-创建有创建数据库和管理角色权限的用户admin" tabindex="-1">3.4 创建有创建数据库和管理角色权限的用户admin <a class="header-anchor" href="#_3-4-创建有创建数据库和管理角色权限的用户admin" aria-label="Permalink to &quot;3.4 创建有创建数据库和管理角色权限的用户admin&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE admin WITH CREATEDB CREATEROLE;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE admin WITH CREATEDB CREATEROLE;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span></code></pre></div><p>注意：拥有创建数据库，角色的用户，也可以删除和修改这些对象</p><p>3.5 创建具有超级权限的用户：admin</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE admin WITH SUPERUSER LOGIN PASSWORD &#39;admin&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE admin WITH SUPERUSER LOGIN PASSWORD &#39;admin&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span></code></pre></div><h2 id="_3-6-创建复制账号-repl" tabindex="-1">3.6 创建复制账号：repl <a class="header-anchor" href="#_3-6-创建复制账号-repl" aria-label="Permalink to &quot;3.6 创建复制账号：repl&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE USER repl REPLICATION LOGIN ENCRYPTED PASSWORD &#39;repl&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE USER repl REPLICATION LOGIN ENCRYPTED PASSWORD &#39;repl&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span></code></pre></div><h2 id="_3-7-其他说明" tabindex="-1">3.7 其他说明 <a class="header-anchor" href="#_3-7-其他说明" aria-label="Permalink to &quot;3.7 其他说明&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">创建复制用户</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">abc</span><span style="color:#E1E4E8;"> REPLICATION </span><span style="color:#F97583;">LOGIN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">abc</span><span style="color:#E1E4E8;"> REPLICATION </span><span style="color:#F97583;">LOGIN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;abc&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">USER</span><span style="color:#E1E4E8;"> work </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">创建scheme 角色</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">abc</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">OWNER</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">ENCODING</span><span style="color:#E1E4E8;"> UTF8 TEMPLATE template0;</span></span>
<span class="line"><span style="color:#E1E4E8;">\\c abc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">创建schema</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">abc</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">OWNER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> public;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">创建用户</span></span>
<span class="line"><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">abc</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##创建读写账号</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> abc_rw;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> abc_rr;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##赋予访问数据库权限，schema权限</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">connect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc_rw;</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> USAGE </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> abc_rw;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##赋予读写权限</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">insert</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;">  ALL TABLES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">赋予序列权限</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> ALL PRIVILEGES </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> ALL SEQUENCES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">赋予默认权限</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">insert</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLES </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">赋予序列权限</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> ALL PRIVILEGES </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> SEQUENCES </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#用户对db要有连接权限</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">connect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#用户要对schema usage 权限，不然要select </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">schema_name</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">table</span><span style="color:#E1E4E8;"> ,不能用搜索路径</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> USAGE </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> ALL TABLES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> abc </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLES </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">abc_w</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">abc_r</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> abc_rw </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc_w；</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> abc_rr </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> abc_r;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">创建复制用户</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">USER</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">abc</span><span style="color:#24292E;"> REPLICATION </span><span style="color:#D73A49;">LOGIN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">USER</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">abc</span><span style="color:#24292E;"> REPLICATION </span><span style="color:#D73A49;">LOGIN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;abc&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">USER</span><span style="color:#24292E;"> work </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">创建scheme 角色</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">abc</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">OWNER</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">ENCODING</span><span style="color:#24292E;"> UTF8 TEMPLATE template0;</span></span>
<span class="line"><span style="color:#24292E;">\\c abc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">创建schema</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">abc</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">OWNER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> public;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">创建用户</span></span>
<span class="line"><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">abc</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##创建读写账号</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> abc_rw;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> abc_rr;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##赋予访问数据库权限，schema权限</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">connect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc_rw;</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> USAGE </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> abc_rw;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##赋予读写权限</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">insert</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;">  ALL TABLES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">赋予序列权限</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> ALL PRIVILEGES </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> ALL SEQUENCES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">赋予默认权限</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">insert</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLES </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">赋予序列权限</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> ALL PRIVILEGES </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> SEQUENCES </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#用户对db要有连接权限</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">connect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#用户要对schema usage 权限，不然要select </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">schema_name</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">table</span><span style="color:#24292E;"> ,不能用搜索路径</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> USAGE </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> ALL TABLES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> abc </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLES </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> abc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">abc_w</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">abc_r</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> abc_rw </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc_w；</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> abc_rr </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> abc_r;</span></span></code></pre></div><h1 id="_4-授权-定义访问权限" tabindex="-1">4.授权，定义访问权限 <a class="header-anchor" href="#_4-授权-定义访问权限" aria-label="Permalink to &quot;4.授权，定义访问权限&quot;">​</a></h1><ul><li>获取权限列表</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\dp</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">.</span><span style="color:#F97583;">*</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\dp</span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">.</span><span style="color:#D73A49;">*</span></span></code></pre></div><ul><li>\\dp 如何获取权限列表的</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ptgres@beta ~]$ psql -E -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#通过-E,可以查看快捷命令执行过程</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ptgres@beta ~]$ psql -E -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#通过-E,可以查看快捷命令执行过程</span></span></code></pre></div><ul><li>查看单独表权限</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Use psql&#39;s \\dp command to obtain information about existing privileges for tables and columns. For example:  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">=&gt; \\dp mytable  </span></span>
<span class="line"><span style="color:#e1e4e8;">                              Access privileges  </span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema |  Name   | Type  |   Access privileges   | Column access privileges   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+---------+-------+-----------------------+--------------------------  </span></span>
<span class="line"><span style="color:#e1e4e8;"> public | mytable | table | miriam=arwdDxt/miriam | col1:  </span></span>
<span class="line"><span style="color:#e1e4e8;">                          : =r/miriam             :   miriam_rw=rw/miriam  </span></span>
<span class="line"><span style="color:#e1e4e8;">                          : admin=arw/miriam          </span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">The entries shown by \\dp are interpreted thus:  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">rolename=xxxx -- privileges granted to a role  </span></span>
<span class="line"><span style="color:#e1e4e8;">        =xxxx -- privileges granted to PUBLIC  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">            r -- SELECT (&quot;read&quot;)  </span></span>
<span class="line"><span style="color:#e1e4e8;">            w -- UPDATE (&quot;write&quot;)  </span></span>
<span class="line"><span style="color:#e1e4e8;">            a -- INSERT (&quot;append&quot;)  </span></span>
<span class="line"><span style="color:#e1e4e8;">            d -- DELETE  </span></span>
<span class="line"><span style="color:#e1e4e8;">            D -- TRUNCATE  </span></span>
<span class="line"><span style="color:#e1e4e8;">            x -- REFERENCES  </span></span>
<span class="line"><span style="color:#e1e4e8;">            t -- TRIGGER  </span></span>
<span class="line"><span style="color:#e1e4e8;">            X -- EXECUTE  </span></span>
<span class="line"><span style="color:#e1e4e8;">            U -- USAGE  </span></span>
<span class="line"><span style="color:#e1e4e8;">            C -- CREATE  </span></span>
<span class="line"><span style="color:#e1e4e8;">            c -- CONNECT  </span></span>
<span class="line"><span style="color:#e1e4e8;">            T -- TEMPORARY  </span></span>
<span class="line"><span style="color:#e1e4e8;">      arwdDxt -- ALL PRIVILEGES (for tables, varies for other objects)  </span></span>
<span class="line"><span style="color:#e1e4e8;">            * -- grant option for preceding privilege  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">        /yyyy -- role that granted this privilege  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">The above example display would be seen by user miriam after creating table mytable and doing:  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT SELECT ON mytable TO PUBLIC;  </span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT SELECT, UPDATE, INSERT ON mytable TO admin;  </span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT SELECT (col1), UPDATE (col1) ON mytable TO miriam_rw;  </span></span>
<span class="line"><span style="color:#e1e4e8;">#https://github.com/digoal/blog/blob/master/201702/20170208_01.md</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Use psql&#39;s \\dp command to obtain information about existing privileges for tables and columns. For example:  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">=&gt; \\dp mytable  </span></span>
<span class="line"><span style="color:#24292e;">                              Access privileges  </span></span>
<span class="line"><span style="color:#24292e;"> Schema |  Name   | Type  |   Access privileges   | Column access privileges   </span></span>
<span class="line"><span style="color:#24292e;">--------+---------+-------+-----------------------+--------------------------  </span></span>
<span class="line"><span style="color:#24292e;"> public | mytable | table | miriam=arwdDxt/miriam | col1:  </span></span>
<span class="line"><span style="color:#24292e;">                          : =r/miriam             :   miriam_rw=rw/miriam  </span></span>
<span class="line"><span style="color:#24292e;">                          : admin=arw/miriam          </span></span>
<span class="line"><span style="color:#24292e;">(1 row)  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">The entries shown by \\dp are interpreted thus:  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">rolename=xxxx -- privileges granted to a role  </span></span>
<span class="line"><span style="color:#24292e;">        =xxxx -- privileges granted to PUBLIC  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">            r -- SELECT (&quot;read&quot;)  </span></span>
<span class="line"><span style="color:#24292e;">            w -- UPDATE (&quot;write&quot;)  </span></span>
<span class="line"><span style="color:#24292e;">            a -- INSERT (&quot;append&quot;)  </span></span>
<span class="line"><span style="color:#24292e;">            d -- DELETE  </span></span>
<span class="line"><span style="color:#24292e;">            D -- TRUNCATE  </span></span>
<span class="line"><span style="color:#24292e;">            x -- REFERENCES  </span></span>
<span class="line"><span style="color:#24292e;">            t -- TRIGGER  </span></span>
<span class="line"><span style="color:#24292e;">            X -- EXECUTE  </span></span>
<span class="line"><span style="color:#24292e;">            U -- USAGE  </span></span>
<span class="line"><span style="color:#24292e;">            C -- CREATE  </span></span>
<span class="line"><span style="color:#24292e;">            c -- CONNECT  </span></span>
<span class="line"><span style="color:#24292e;">            T -- TEMPORARY  </span></span>
<span class="line"><span style="color:#24292e;">      arwdDxt -- ALL PRIVILEGES (for tables, varies for other objects)  </span></span>
<span class="line"><span style="color:#24292e;">            * -- grant option for preceding privilege  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">        /yyyy -- role that granted this privilege  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">The above example display would be seen by user miriam after creating table mytable and doing:  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">GRANT SELECT ON mytable TO PUBLIC;  </span></span>
<span class="line"><span style="color:#24292e;">GRANT SELECT, UPDATE, INSERT ON mytable TO admin;  </span></span>
<span class="line"><span style="color:#24292e;">GRANT SELECT (col1), UPDATE (col1) ON mytable TO miriam_rw;  </span></span>
<span class="line"><span style="color:#24292e;">#https://github.com/digoal/blog/blob/master/201702/20170208_01.md</span></span></code></pre></div><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { { </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">TRUNCATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">REFERENCES</span><span style="color:#E1E4E8;"> | TRIGGER }</span></span>
<span class="line"><span style="color:#E1E4E8;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> { [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">         | ALL TABLES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##单表授权：授权zjy账号可以访问schema为zjy的zjy表</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">insert</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##所有表授权：</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">insert</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> all tables </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { { </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">REFERENCES</span><span style="color:#E1E4E8;"> } ( column_name [, ...] )</span></span>
<span class="line"><span style="color:#E1E4E8;">    [, ...] | ALL [ PRIVILEGES ] ( column_name [, ...] ) }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##列授权，授权指定列(zjy schema下的zjy表的name列)的更新权限给zjy用户</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##指定列授不同权限，zjy schema下的zjy表，查看更新name、age字段，插入name字段</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">,age),</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">,age),</span><span style="color:#F97583;">insert</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">xxx</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { { USAGE | </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">SEQUENCE</span><span style="color:#E1E4E8;"> sequence_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">         | ALL SEQUENCES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##序列（自增键）属性授权，指定zjy schema下的seq_id_seq 给zjy用户</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">sequence</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">seq_id_seq</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##序列（自增键）属性授权，给用户zjy授权zjy schema下的所有序列</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> all sequences </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { { </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">CONNECT</span><span style="color:#E1E4E8;"> | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database_name</span><span style="color:#E1E4E8;"> [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##连接数据库权限，授权cc用户连接数据库zjy</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">connect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> cc;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> DOMAIN domain_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> FOREIGN </span><span style="color:#F97583;">DATA</span><span style="color:#E1E4E8;"> WRAPPER fdw_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#E1E4E8;">##</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> FOREIGN </span><span style="color:#F97583;">SERVER</span><span style="color:#E1E4E8;"> server_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">EXECUTE</span><span style="color:#E1E4E8;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> { { </span><span style="color:#F97583;">FUNCTION</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">PROCEDURE</span><span style="color:#E1E4E8;"> | ROUTINE } routine_name [ ( [ [ argmode ] [ arg_name ] arg_type [, ...] ] ) ] [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">LANGUAGE</span><span style="color:#E1E4E8;"> lang_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#E1E4E8;">##</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { { </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> LARGE </span><span style="color:#F97583;">OBJECT</span><span style="color:#E1E4E8;"> loid [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { { </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> | USAGE } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">##连接schema权限，授权cc访问zjy schema权限</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> usage </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> cc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLESPACE tablespace_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TYPE</span><span style="color:#E1E4E8;"> type_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> role_specification can be:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    [ GROUP ] role_name</span></span>
<span class="line"><span style="color:#E1E4E8;">  | PUBLIC</span></span>
<span class="line"><span style="color:#E1E4E8;">  | CURRENT_USER</span></span>
<span class="line"><span style="color:#E1E4E8;">  | SESSION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> role_name [, ...] </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role_name [, ...] [ WITH ADMIN OPTION ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##把zjy用户的权限授予用户cc。</span></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> cc;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { { </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">TRUNCATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">REFERENCES</span><span style="color:#24292E;"> | TRIGGER }</span></span>
<span class="line"><span style="color:#24292E;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> { [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">         | ALL TABLES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##单表授权：授权zjy账号可以访问schema为zjy的zjy表</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">insert</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##所有表授权：</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">insert</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> all tables </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { { </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">REFERENCES</span><span style="color:#24292E;"> } ( column_name [, ...] )</span></span>
<span class="line"><span style="color:#24292E;">    [, ...] | ALL [ PRIVILEGES ] ( column_name [, ...] ) }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##列授权，授权指定列(zjy schema下的zjy表的name列)的更新权限给zjy用户</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">name</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##指定列授不同权限，zjy schema下的zjy表，查看更新name、age字段，插入name字段</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">name</span><span style="color:#24292E;">,age),</span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">name</span><span style="color:#24292E;">,age),</span><span style="color:#D73A49;">insert</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">name</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">xxx</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { { USAGE | </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">SEQUENCE</span><span style="color:#24292E;"> sequence_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">         | ALL SEQUENCES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##序列（自增键）属性授权，指定zjy schema下的seq_id_seq 给zjy用户</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">sequence</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">seq_id_seq</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##序列（自增键）属性授权，给用户zjy授权zjy schema下的所有序列</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> all sequences </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { { </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">CONNECT</span><span style="color:#24292E;"> | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database_name</span><span style="color:#24292E;"> [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##连接数据库权限，授权cc用户连接数据库zjy</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">connect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> cc;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> DOMAIN domain_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> FOREIGN </span><span style="color:#D73A49;">DATA</span><span style="color:#24292E;"> WRAPPER fdw_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#24292E;">##</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> FOREIGN </span><span style="color:#D73A49;">SERVER</span><span style="color:#24292E;"> server_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">EXECUTE</span><span style="color:#24292E;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> { { </span><span style="color:#D73A49;">FUNCTION</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">PROCEDURE</span><span style="color:#24292E;"> | ROUTINE } routine_name [ ( [ [ argmode ] [ arg_name ] arg_type [, ...] ] ) ] [, ...]</span></span>
<span class="line"><span style="color:#24292E;">         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">LANGUAGE</span><span style="color:#24292E;"> lang_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#24292E;">##</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { { </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> LARGE </span><span style="color:#D73A49;">OBJECT</span><span style="color:#24292E;"> loid [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { { </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> | USAGE } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">##连接schema权限，授权cc访问zjy schema权限</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> usage </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> cc;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLESPACE tablespace_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TYPE</span><span style="color:#24292E;"> type_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_specification [, ...] [ WITH GRANT OPTION ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">where</span><span style="color:#24292E;"> role_specification can be:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    [ GROUP ] role_name</span></span>
<span class="line"><span style="color:#24292E;">  | PUBLIC</span></span>
<span class="line"><span style="color:#24292E;">  | CURRENT_USER</span></span>
<span class="line"><span style="color:#24292E;">  | SESSION_USER</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> role_name [, ...] </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role_name [, ...] [ WITH ADMIN OPTION ]</span></span>
<span class="line"><span style="color:#24292E;">##把zjy用户的权限授予用户cc。</span></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> cc;</span></span></code></pre></div><h2 id="_4-1-权限说明" tabindex="-1">4.1 权限说明 <a class="header-anchor" href="#_4-1-权限说明" aria-label="Permalink to &quot;4.1 权限说明&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;">：允许从指定表，视图或序列的任何列或列出的特定列进行SELECT。也允许使用COPY </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;">。在UPDATE或DELETE中引用现有列值也需要此权限。对于序列，此权限还允许使用currval函数。对于大对象，此权限允许读取对象。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;">：允许将新行INSERT到指定的表中。如果列出了特定列，则只能在INSERT命令中为这些列分配（因此其他列将接收默认值）。也允许COPY </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;">。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;">：允许更新指定表的任何列或列出的特定列，需要SELECT权限。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;">：允许删除指定表中的行，需要SELECT权限。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">TRUNCATE</span><span style="color:#E1E4E8;">：允许在指定的表上创建触发器。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REFERENCES</span><span style="color:#E1E4E8;">：允许创建引用指定表或表的指定列的外键约束。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">TRIGGER：允许在指定的表上创建触发器。 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;">：对于数据库，允许在数据库中创建新的schema、</span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;">、</span><span style="color:#F97583;">index</span><span style="color:#E1E4E8;">。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">CONNECT</span><span style="color:#E1E4E8;">：允许用户连接到指定的数据库。在连接启动时检查此权限。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">TEMPORARY、TEMP：允许在使用指定数据库时创建临时表。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">EXECUTE</span><span style="color:#E1E4E8;">：允许使用指定的函数或过程以及在函数。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">USAGE：对于schema，允许访问指定模式中包含的对象；对于sequence，允许使用currval和nextval函数。对于类型和域，允许在创建表，函数和其他模式对象时使用类型或域。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ALL PRIVILEGES：一次授予所有可用权限。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;">：允许从指定表，视图或序列的任何列或列出的特定列进行SELECT。也允许使用COPY </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;">。在UPDATE或DELETE中引用现有列值也需要此权限。对于序列，此权限还允许使用currval函数。对于大对象，此权限允许读取对象。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;">：允许将新行INSERT到指定的表中。如果列出了特定列，则只能在INSERT命令中为这些列分配（因此其他列将接收默认值）。也允许COPY </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;">。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;">：允许更新指定表的任何列或列出的特定列，需要SELECT权限。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;">：允许删除指定表中的行，需要SELECT权限。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">TRUNCATE</span><span style="color:#24292E;">：允许在指定的表上创建触发器。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REFERENCES</span><span style="color:#24292E;">：允许创建引用指定表或表的指定列的外键约束。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">TRIGGER：允许在指定的表上创建触发器。 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;">：对于数据库，允许在数据库中创建新的schema、</span><span style="color:#D73A49;">table</span><span style="color:#24292E;">、</span><span style="color:#D73A49;">index</span><span style="color:#24292E;">。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">CONNECT</span><span style="color:#24292E;">：允许用户连接到指定的数据库。在连接启动时检查此权限。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">TEMPORARY、TEMP：允许在使用指定数据库时创建临时表。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">EXECUTE</span><span style="color:#24292E;">：允许使用指定的函数或过程以及在函数。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">USAGE：对于schema，允许访问指定模式中包含的对象；对于sequence，允许使用currval和nextval函数。对于类型和域，允许在创建表，函数和其他模式对象时使用类型或域。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ALL PRIVILEGES：一次授予所有可用权限。</span></span></code></pre></div><h2 id="_4-2-撤销权限" tabindex="-1">4.2 撤销权限 <a class="header-anchor" href="#_4-2-撤销权限" aria-label="Permalink to &quot;4.2 撤销权限&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">TRUNCATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">REFERENCES</span><span style="color:#E1E4E8;"> | TRIGGER }</span></span>
<span class="line"><span style="color:#E1E4E8;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> { [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">         | ALL TABLES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#E1E4E8;">##移除用户zjy在schema zjy上所有表的select权限</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> all tables </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">REFERENCES</span><span style="color:#E1E4E8;"> } ( column_name [, ...] )</span></span>
<span class="line"><span style="color:#E1E4E8;">    [, ...] | ALL [ PRIVILEGES ] ( column_name [, ...] ) }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#E1E4E8;">##移除用户zjy在zjy schema的zjy表的age列的查询权限</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> (age) </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">zjy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { USAGE | </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> { </span><span style="color:#F97583;">SEQUENCE</span><span style="color:#E1E4E8;"> sequence_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">         | ALL SEQUENCES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##序列</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">CONNECT</span><span style="color:#E1E4E8;"> | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database_name</span><span style="color:#E1E4E8;"> [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##库</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> DOMAIN domain_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> FOREIGN </span><span style="color:#F97583;">DATA</span><span style="color:#E1E4E8;"> WRAPPER fdw_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> FOREIGN </span><span style="color:#F97583;">SERVER</span><span style="color:#E1E4E8;"> server_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { </span><span style="color:#F97583;">EXECUTE</span><span style="color:#E1E4E8;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> { { </span><span style="color:#F97583;">FUNCTION</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">PROCEDURE</span><span style="color:#E1E4E8;"> | ROUTINE } function_name [ ( [ [ argmode ] [ arg_name ] arg_type [, ...] ] ) ] [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">LANGUAGE</span><span style="color:#E1E4E8;"> lang_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;"> } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> LARGE </span><span style="color:#F97583;">OBJECT</span><span style="color:#E1E4E8;"> loid [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> | USAGE } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> schema_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##schena权限</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLESPACE tablespace_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TYPE</span><span style="color:#E1E4E8;"> type_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span>
<span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> [ ADMIN OPTION FOR ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    role_name [, ...] </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> role_name [, ...]</span></span>
<span class="line"><span style="color:#E1E4E8;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#E1E4E8;">##</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { { </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">TRUNCATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">REFERENCES</span><span style="color:#24292E;"> | TRIGGER }</span></span>
<span class="line"><span style="color:#24292E;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> { [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">         | ALL TABLES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#24292E;">##移除用户zjy在schema zjy上所有表的select权限</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> all tables </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { { </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">REFERENCES</span><span style="color:#24292E;"> } ( column_name [, ...] )</span></span>
<span class="line"><span style="color:#24292E;">    [, ...] | ALL [ PRIVILEGES ] ( column_name [, ...] ) }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> [ TABLE ] table_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#24292E;">##移除用户zjy在zjy schema的zjy表的age列的查询权限</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> (age) </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">zjy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { { USAGE | </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;">    [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> { </span><span style="color:#D73A49;">SEQUENCE</span><span style="color:#24292E;"> sequence_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">         | ALL SEQUENCES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##序列</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { { </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">CONNECT</span><span style="color:#24292E;"> | TEMPORARY | TEMP } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database_name</span><span style="color:#24292E;"> [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##库</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> DOMAIN domain_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> FOREIGN </span><span style="color:#D73A49;">DATA</span><span style="color:#24292E;"> WRAPPER fdw_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> FOREIGN </span><span style="color:#D73A49;">SERVER</span><span style="color:#24292E;"> server_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { </span><span style="color:#D73A49;">EXECUTE</span><span style="color:#24292E;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> { { </span><span style="color:#D73A49;">FUNCTION</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">PROCEDURE</span><span style="color:#24292E;"> | ROUTINE } function_name [ ( [ [ argmode ] [ arg_name ] arg_type [, ...] ] ) ] [, ...]</span></span>
<span class="line"><span style="color:#24292E;">         | ALL { FUNCTIONS | PROCEDURES | ROUTINES } </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">LANGUAGE</span><span style="color:#24292E;"> lang_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { { </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;"> } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> LARGE </span><span style="color:#D73A49;">OBJECT</span><span style="color:#24292E;"> loid [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { { </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> | USAGE } [, ...] | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> schema_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##schena权限</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLESPACE tablespace_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ GRANT OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    { USAGE | ALL [ PRIVILEGES ] }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TYPE</span><span style="color:#24292E;"> type_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> { [ GROUP ] role_name | PUBLIC } [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> [ ADMIN OPTION FOR ]</span></span>
<span class="line"><span style="color:#24292E;">    role_name [, ...] </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> role_name [, ...]</span></span>
<span class="line"><span style="color:#24292E;">    [ CASCADE | RESTRICT ]</span></span>
<span class="line"><span style="color:#24292E;">##</span></span></code></pre></div><h3 id="注意" tabindex="-1">注意： <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意：&quot;">​</a></h3><p>任何用户对public的schema都有all的权限，为了安全可以禁止用户对public schema</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">##移除所有用户（public），superuser除外，对指定DB下的public schema的create 权限。</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> public;</span></span>
<span class="line"><span style="color:#F97583;">REVOKE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">##移除所有用户（public），superuser除外，对指定DB下的public schema的create 权限。</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">revoke</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">create</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> public;</span></span>
<span class="line"><span style="color:#D73A49;">REVOKE</span></span></code></pre></div><p>**示例： ** 注意：option选项里的用户都可以通过alter role进行修改</p><ul><li><p>修改用户为超级/非超级用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">alter role caocao with superuser/nosuperuser;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">alter role caocao with superuser/nosuperuser;</span></span></code></pre></div></li><li><p>修改用户为可/不可登陆用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">alter role caocao with nologin/login;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">alter role caocao with nologin/login;</span></span></code></pre></div></li><li><p>修改用户名：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">alter role caocao rename to youxing;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">alter role caocao rename to youxing;</span></span></code></pre></div></li><li><p>修改用户密码，移除密码用NULL</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">alter role youxing with password &#39;youxing&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">alter role youxing with password &#39;youxing&#39;;</span></span></code></pre></div></li><li><p>修改用户参数，该用户登陆后的以该参数为准</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">alter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">SET</span><span style="color:#E1E4E8;"> geqo </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/default</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">alter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">SET</span><span style="color:#24292E;"> geqo </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/default</span><span style="color:#24292E;">;</span></span></code></pre></div></li></ul><h2 id="_4-3-赋予普通用户a创建数据库的权限" tabindex="-1">4.3 赋予普通用户a创建数据库的权限 <a class="header-anchor" href="#_4-3-赋予普通用户a创建数据库的权限" aria-label="Permalink to &quot;4.3 赋予普通用户a创建数据库的权限&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">alter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> username createdb ;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">alter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> username createdb ;</span></span></code></pre></div><h2 id="_4-4-查看用户权限" tabindex="-1">4.4 查看用户权限 <a class="header-anchor" href="#_4-4-查看用户权限" aria-label="Permalink to &quot;4.4 查看用户权限&quot;">​</a></h2><p>1、查看某用户的表权限</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">information_schema</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">table_privileges</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> grantee</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;postgres&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">information_schema</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">table_privileges</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> grantee</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;postgres&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>2、查看usage权限表</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">information_schema</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">usage_privileges</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> grantee</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;postgres&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> grantor  | grantee  | object_catalog |   object_schema    |   object_name   | object_type | privilege_type | is_grantable </span></span>
<span class="line"><span style="color:#6A737D;">----------+----------+----------------+--------------------+-----------------+-------------+----------------+--------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | postgres | postgres       | information_schema | cardinal_number | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | postgres | postgres       | information_schema | character_data  | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | postgres | postgres       | information_schema | sql_identifier  | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | postgres | postgres       | information_schema | time_stamp      | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | postgres | postgres       | information_schema | yes_or_no       | DOMAIN      | USAGE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">information_schema</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">usage_privileges</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> grantee</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;postgres&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> grantor  | grantee  | object_catalog |   object_schema    |   object_name   | object_type | privilege_type | is_grantable </span></span>
<span class="line"><span style="color:#6A737D;">----------+----------+----------------+--------------------+-----------------+-------------+----------------+--------------</span></span>
<span class="line"><span style="color:#24292E;"> postgres | postgres | postgres       | information_schema | cardinal_number | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#24292E;"> postgres | postgres | postgres       | information_schema | character_data  | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#24292E;"> postgres | postgres | postgres       | information_schema | sql_identifier  | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#24292E;"> postgres | postgres | postgres       | information_schema | time_stamp      | DOMAIN      | USAGE          | YES</span></span>
<span class="line"><span style="color:#24292E;"> postgres | postgres | postgres       | information_schema | yes_or_no       | DOMAIN      | USAGE</span></span></code></pre></div><p>3、查看存储过程函数相关权限表</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select * from information_schema.routine_privileges where grantee=&#39;user_name&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select * from information_schema.routine_privileges where grantee=&#39;user_name&#39;;</span></span></code></pre></div><h1 id="_5-数据库级别" tabindex="-1">5.数据库级别 <a class="header-anchor" href="#_5-数据库级别" aria-label="Permalink to &quot;5.数据库级别&quot;">​</a></h1><p>数据库级别的权限，包括允许连接数据库，允许在数据库中创建schema</p><ul><li>默认创建后，允许 public 角色 (任何人) 连接；</li><li>默认创建后，不允许除了超级用户和 owner 之外的任何人在数据库中创建 schema；</li><li>默认创建后，会自动创建名为 public 的 schema，这个 schema 的 all 权限已经赋予给 public 角色，即允许任何人在里面创建对象。</li></ul><p>这意味着，默认所有角色可以在新建的数据库中创建对象</p><h1 id="_6-schema-级别" tabindex="-1">6.schema 级别 <a class="header-anchor" href="#_6-schema-级别" aria-label="Permalink to &quot;6.schema 级别&quot;">​</a></h1><p>schema 级别的权限，包括允许查看 schema 中的对象，允许在 schema 中创建对象。默认情况下新建的 schema 的权限不会赋予给 public 角色，因此除了超级用户和 owner，任何人都没有权限查看 schema 中的对象或者在 schema 中新建对象</p><p>​ 概念有点像命名空间或者把它想像成一个文件系统中的目录,差别就是这个schema下不能再有schema嵌套. 各个对象比如表、函数等存放在各个schema下,同一个schema下不能有重复的对象名字,但在不同schema下可以重复</p><h2 id="使用schema的作用" tabindex="-1"><strong>使用schema的作用</strong> <a class="header-anchor" href="#使用schema的作用" aria-label="Permalink to &quot;**使用schema的作用**&quot;">​</a></h2><ul><li>方便管理多个用户共享一个数据库,但是又可以互相独立.</li><li>方便管理众多对象,更有逻辑性.</li><li>方便兼容某些第三方应用程序,创建对象时是有schema的</li></ul><p><code>比如要设计一个复杂系统.由众多模块构成,有时候模块间又需要有独立性.各模块存放单独的数据库显然是不合适的. 这时候使用schema来分类各模块间的对象,再对用户进行适当的权限控制.这样逻辑也非常清晰</code></p><h2 id="创建schema" tabindex="-1">创建schema <a class="header-anchor" href="#创建schema" aria-label="Permalink to &quot;创建schema&quot;">​</a></h2><ul><li>语法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA schema_name;</span></span>
<span class="line"><span style="color:#e1e4e8;">Or</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA [IF NOT EXISTS] schema_name;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE SCHEMA schema_name;</span></span>
<span class="line"><span style="color:#24292e;">Or</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA [IF NOT EXISTS] schema_name;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#切换到自己想要的库下面执行</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# create schema schema01;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# \\dn</span></span>
<span class="line"><span style="color:#e1e4e8;">   List of schemas</span></span>
<span class="line"><span style="color:#e1e4e8;">   Name   |  Owner</span></span>
<span class="line"><span style="color:#e1e4e8;">----------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public   | postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"> schema01 | postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#切换到自己想要的库下面执行</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db01=# create schema schema01;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#24292e;">db01=# \\dn</span></span>
<span class="line"><span style="color:#24292e;">   List of schemas</span></span>
<span class="line"><span style="color:#24292e;">   Name   |  Owner</span></span>
<span class="line"><span style="color:#24292e;">----------+----------</span></span>
<span class="line"><span style="color:#24292e;"> public   | postgres</span></span>
<span class="line"><span style="color:#24292e;"> schema01 | postgres</span></span>
<span class="line"><span style="color:#24292e;">(2 rows)</span></span></code></pre></div><h2 id="schema中创建对象" tabindex="-1">schema中创建对象 <a class="header-anchor" href="#schema中创建对象" aria-label="Permalink to &quot;schema中创建对象&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db01=# create table schema01.t1(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# insert into schema01.t1 values(1);</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 1</span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# select * from t1;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  relation &quot;t1&quot; does not exist</span></span>
<span class="line"><span style="color:#e1e4e8;">LINE 1: select * from t1;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      ^</span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# select * from schema01.t1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">  1</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# select * from db01.schema01.t1;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">  1</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db01=# create table schema01.t1(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">db01=# insert into schema01.t1 values(1);</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 1</span></span>
<span class="line"><span style="color:#24292e;">db01=# select * from t1;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  relation &quot;t1&quot; does not exist</span></span>
<span class="line"><span style="color:#24292e;">LINE 1: select * from t1;</span></span>
<span class="line"><span style="color:#24292e;">                      ^</span></span>
<span class="line"><span style="color:#24292e;">db01=# select * from schema01.t1;</span></span>
<span class="line"><span style="color:#24292e;"> id</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">  1</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;">db01=# select * from db01.schema01.t1;</span></span>
<span class="line"><span style="color:#24292e;"> id</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">  1</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p>默认是在public这个schema下.因此要带上schema名称.数据库名字如果要带上,只能是当前连接的数据库!!</p><h2 id="删除schema" tabindex="-1">删除schema <a class="header-anchor" href="#删除schema" aria-label="Permalink to &quot;删除schema&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db01=# drop schema schema01;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  cannot drop schema schema01 because other objects depend on it</span></span>
<span class="line"><span style="color:#e1e4e8;">DETAIL:  table schema01.t1 depends on schema schema01</span></span>
<span class="line"><span style="color:#e1e4e8;">HINT:  Use DROP ... CASCADE to drop the dependent objects too.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# drop schema schema01 cascade;</span></span>
<span class="line"><span style="color:#e1e4e8;">NOTICE:  drop cascades to table schema01.t1</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">schema下有对象如果需要一起删除,需要带上cascade关键字.有点像使用rmdir删除目录一样,文件夹下有东西不然删除</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db01=# drop schema schema01;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  cannot drop schema schema01 because other objects depend on it</span></span>
<span class="line"><span style="color:#24292e;">DETAIL:  table schema01.t1 depends on schema schema01</span></span>
<span class="line"><span style="color:#24292e;">HINT:  Use DROP ... CASCADE to drop the dependent objects too.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db01=# drop schema schema01 cascade;</span></span>
<span class="line"><span style="color:#24292e;">NOTICE:  drop cascades to table schema01.t1</span></span>
<span class="line"><span style="color:#24292e;">DROP SCHEMA</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">schema下有对象如果需要一起删除,需要带上cascade关键字.有点像使用rmdir删除目录一样,文件夹下有东西不然删除</span></span></code></pre></div><h2 id="创建schema指定owner" tabindex="-1">创建schema指定owner <a class="header-anchor" href="#创建schema指定owner" aria-label="Permalink to &quot;创建schema指定owner&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db01=# create schema schema_name authorization owner;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# create schema authorization hippo;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;">db01=# \\dn</span></span>
<span class="line"><span style="color:#e1e4e8;">  List of schemas</span></span>
<span class="line"><span style="color:#e1e4e8;">  Name  |  Owner</span></span>
<span class="line"><span style="color:#e1e4e8;">--------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> hippo  | hippo</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"> s01    | hippo</span></span>
<span class="line"><span style="color:#e1e4e8;">(3 rows)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db01=# create schema schema_name authorization owner;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db01=# create schema authorization hippo;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#24292e;">db01=# \\dn</span></span>
<span class="line"><span style="color:#24292e;">  List of schemas</span></span>
<span class="line"><span style="color:#24292e;">  Name  |  Owner</span></span>
<span class="line"><span style="color:#24292e;">--------+----------</span></span>
<span class="line"><span style="color:#24292e;"> hippo  | hippo</span></span>
<span class="line"><span style="color:#24292e;"> public | postgres</span></span>
<span class="line"><span style="color:#24292e;"> s01    | hippo</span></span>
<span class="line"><span style="color:#24292e;">(3 rows)</span></span></code></pre></div><h2 id="查询schema" tabindex="-1">查询schema <a class="header-anchor" href="#查询schema" aria-label="Permalink to &quot;查询schema&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看当前数据库中全部的Schema</span></span>
<span class="line"><span style="color:#e1e4e8;">select oid,* from pg_catalog.pg_namespace;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看Schema下所有表的大小：</span></span>
<span class="line"><span style="color:#e1e4e8;">select relname, pg_size_pretty(pg_total_relation_size(relid)) from pg_stat_user_tables where schemaname=&#39;usering&#39; order by pg_relation_size (relid) desc;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看当前数据库中全部的Schema</span></span>
<span class="line"><span style="color:#24292e;">select oid,* from pg_catalog.pg_namespace;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看Schema下所有表的大小：</span></span>
<span class="line"><span style="color:#24292e;">select relname, pg_size_pretty(pg_total_relation_size(relid)) from pg_stat_user_tables where schemaname=&#39;usering&#39; order by pg_relation_size (relid) desc;</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311061114515.png" alt="image-20220317154529189"></p><h3 id="查看schema大小" tabindex="-1">查看schema大小 <a class="header-anchor" href="#查看schema大小" aria-label="Permalink to &quot;查看schema大小&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT schema_name, </span></span>
<span class="line"><span style="color:#e1e4e8;">    pg_size_pretty(sum(table_size)::bigint) as &quot;disk space&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    round((sum(table_size) / pg_database_size(current_database())) * 100,2)</span></span>
<span class="line"><span style="color:#e1e4e8;">        as &quot;percent(%)&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM (</span></span>
<span class="line"><span style="color:#e1e4e8;">     SELECT pg_catalog.pg_namespace.nspname as schema_name,</span></span>
<span class="line"><span style="color:#e1e4e8;">         pg_total_relation_size(pg_catalog.pg_class.oid) as table_size</span></span>
<span class="line"><span style="color:#e1e4e8;">     FROM   pg_catalog.pg_class</span></span>
<span class="line"><span style="color:#e1e4e8;">         JOIN pg_catalog.pg_namespace </span></span>
<span class="line"><span style="color:#e1e4e8;">             ON relnamespace = pg_catalog.pg_namespace.oid</span></span>
<span class="line"><span style="color:#e1e4e8;">) t</span></span>
<span class="line"><span style="color:#e1e4e8;">GROUP BY schema_name</span></span>
<span class="line"><span style="color:#e1e4e8;">ORDER BY &quot;percent(%)&quot; desc;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT schema_name, </span></span>
<span class="line"><span style="color:#24292e;">    pg_size_pretty(sum(table_size)::bigint) as &quot;disk space&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    round((sum(table_size) / pg_database_size(current_database())) * 100,2)</span></span>
<span class="line"><span style="color:#24292e;">        as &quot;percent(%)&quot;</span></span>
<span class="line"><span style="color:#24292e;">FROM (</span></span>
<span class="line"><span style="color:#24292e;">     SELECT pg_catalog.pg_namespace.nspname as schema_name,</span></span>
<span class="line"><span style="color:#24292e;">         pg_total_relation_size(pg_catalog.pg_class.oid) as table_size</span></span>
<span class="line"><span style="color:#24292e;">     FROM   pg_catalog.pg_class</span></span>
<span class="line"><span style="color:#24292e;">         JOIN pg_catalog.pg_namespace </span></span>
<span class="line"><span style="color:#24292e;">             ON relnamespace = pg_catalog.pg_namespace.oid</span></span>
<span class="line"><span style="color:#24292e;">) t</span></span>
<span class="line"><span style="color:#24292e;">GROUP BY schema_name</span></span>
<span class="line"><span style="color:#24292e;">ORDER BY &quot;percent(%)&quot; desc;</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311061114668.png" alt="image-20220317160314758"></p><h3 id="查看当前库中所有表大小" tabindex="-1">查看当前库中所有表大小 <a class="header-anchor" href="#查看当前库中所有表大小" aria-label="Permalink to &quot;查看当前库中所有表大小&quot;">​</a></h3><p>并按降序排列</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span></code></pre></div><h3 id="查看schema中对象" tabindex="-1">查看schema中对象 <a class="header-anchor" href="#查看schema中对象" aria-label="Permalink to &quot;查看schema中对象&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#进入到所在数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">cloudminingdb=# select tablename from pg_tables where schemaname=&#39;public&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#进入到所在数据库</span></span>
<span class="line"><span style="color:#24292e;">cloudminingdb=# select tablename from pg_tables where schemaname=&#39;public&#39;;</span></span></code></pre></div><p><strong>显示当前使用的schema</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">show search_path;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">show search_path;</span></span></code></pre></div><h3 id="切换当前" tabindex="-1">切换当前 <a class="header-anchor" href="#切换当前" aria-label="Permalink to &quot;切换当前&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">set search_path TO myschema;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">set search_path TO myschema;</span></span></code></pre></div><h3 id="完整创建" tabindex="-1">完整创建 <a class="header-anchor" href="#完整创建" aria-label="Permalink to &quot;完整创建&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;postgres=# CREATE USER rl password &#39;123&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建库</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;CREATE DATABASE oa;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;COMMENT ON DATABASE oa IS &#39;OA 数据库&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#建 SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;\\c oa</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;CREATE SCHEMA op;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;COMMENT ON SCHEMA op IS &#39;办公流程 SCHEMA&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#修改schema</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;alter schema op owner to op;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;postgres=# CREATE USER rl password &#39;123&#39;;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建库</span></span>
<span class="line"><span style="color:#24292e;">&gt;CREATE DATABASE oa;</span></span>
<span class="line"><span style="color:#24292e;">&gt;COMMENT ON DATABASE oa IS &#39;OA 数据库&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#建 SCHEMA</span></span>
<span class="line"><span style="color:#24292e;">&gt;\\c oa</span></span>
<span class="line"><span style="color:#24292e;">&gt;CREATE SCHEMA op;</span></span>
<span class="line"><span style="color:#24292e;">&gt;COMMENT ON SCHEMA op IS &#39;办公流程 SCHEMA&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#修改schema</span></span>
<span class="line"><span style="color:#24292e;">&gt;alter schema op owner to op;</span></span></code></pre></div><h1 id="_7-线上案例" tabindex="-1">7.线上案例 <a class="header-anchor" href="#_7-线上案例" aria-label="Permalink to &quot;7.线上案例&quot;">​</a></h1><p>现在按照一个正常项目上线的流程来创建一个应用账号为例</p><p>比如一个项目<strong>zjy</strong>上线：用管理账号来操作</p><ul><li><p>创建数据库：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span></span></code></pre></div></li><li><p>创建账号：账号和数据库名字保持一致（search_path）</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> user zjy </span><span style="color:#F97583;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;zjy&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> user zjy </span><span style="color:#D73A49;">with</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;zjy&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span></span></code></pre></div></li><li><p>创建schema：不能用默认的public的schma</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\c zjy</span></span>
<span class="line"><span style="color:#E1E4E8;">You are </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;"> connected </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;zjy&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> user </span><span style="color:#9ECBFF;">&quot;postgres&quot;</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\c zjy</span></span>
<span class="line"><span style="color:#24292E;">You are </span><span style="color:#D73A49;">now</span><span style="color:#24292E;"> connected </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;zjy&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> user </span><span style="color:#032F62;">&quot;postgres&quot;</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span></span></code></pre></div></li></ul><p>授权</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#访问库</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">connect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#访问schmea</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> usage </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#访问表</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">insert</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> all tables </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#如果访问自增序列，需要授权</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> all sequences </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">注意：上面的授权只对历史的一些对象授权，后期增加的对象是没有权限的，需要给个默认权限</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#默认表权限</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">insert</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">delete</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLES </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#默认自增序列权限</span></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> zjy </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> sequences </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> zjy;</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#访问库</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">connect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#访问schmea</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> usage </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#访问表</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">insert</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> all tables </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#如果访问自增序列，需要授权</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> all sequences </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">注意：上面的授权只对历史的一些对象授权，后期增加的对象是没有权限的，需要给个默认权限</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#默认表权限</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">insert</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">delete</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLES </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#默认自增序列权限</span></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> zjy </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> sequences </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> zjy;</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES</span></span></code></pre></div><ul><li>或者</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.创建一个用户名为readonly密码为ropass的用户</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ropass&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">.用户只读事务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">alter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> default_transaction_read_only</span><span style="color:#F97583;">=on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">.把所有库的语言的USAGE权限给到readonly</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> USAGE </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">.授予select权限(这句要进入具体数据库操作在哪个db环境执行就授予那个db的权)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">grant</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;"> all tables </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">schema</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">readonly</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">第四步，切换到指定的数据执行，切记.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">命令行：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">连接数据库, 默认的用户和数据库是postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">psql </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">U user </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d dbname</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">切换数据库,相当于mysql的use dbname</span></span>
<span class="line"><span style="color:#E1E4E8;">\\c dbname</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;">.创建一个用户名为readonly密码为ropass的用户</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">USER</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ropass&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">2</span><span style="color:#24292E;">.用户只读事务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">alter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> default_transaction_read_only</span><span style="color:#D73A49;">=on</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">3</span><span style="color:#24292E;">.把所有库的语言的USAGE权限给到readonly</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> USAGE </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">4</span><span style="color:#24292E;">.授予select权限(这句要进入具体数据库操作在哪个db环境执行就授予那个db的权)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">grant</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;"> all tables </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">schema</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">readonly</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">第四步，切换到指定的数据执行，切记.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">命令行：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">连接数据库, 默认的用户和数据库是postgres</span></span>
<span class="line"><span style="color:#24292E;">psql </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">U user </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d dbname</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">切换数据库,相当于mysql的use dbname</span></span>
<span class="line"><span style="color:#24292E;">\\c dbname</span></span></code></pre></div><h1 id="_8-常用命令" tabindex="-1">8.常用命令 <a class="header-anchor" href="#_8-常用命令" aria-label="Permalink to &quot;8.常用命令&quot;">​</a></h1><h2 id="_8-1查看当前用户" tabindex="-1">8.1查看当前用户 <a class="header-anchor" href="#_8-1查看当前用户" aria-label="Permalink to &quot;8.1查看当前用户&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\du</span></span>
<span class="line"><span style="color:#E1E4E8;">                                   List of roles</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Role</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;"> |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#6A737D;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">admin</span><span style="color:#E1E4E8;">     | Superuser, Cannot </span><span style="color:#F97583;">login</span><span style="color:#E1E4E8;">                                    | {}</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres  | Superuser, </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">role</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Create</span><span style="color:#E1E4E8;"> DB, Replication, Bypass RLS | {}</span></span>
<span class="line"><span style="color:#E1E4E8;"> zjy       |                                                            | {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_roles;</span></span>
<span class="line"><span style="color:#E1E4E8;">       rolname        | rolsuper | rolinherit | rolcreaterole | rolcreatedb | rolcanlogin | rolreplication | rolconnlimit | rolpassword | rolvaliduntil | rolbypassrls | rolconfig |  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#6A737D;">----------------------+----------+------------+---------------+-------------+-------------+----------------+--------------+-------------+---------------+--------------+-----------+-------</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_signal_backend    | f        | t          | f             | f           | f           | f              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | f            |           |  </span><span style="color:#79B8FF;">4200</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres             | t        | t          | t             | t           | t           | t              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | t            |           |    </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">admin</span><span style="color:#E1E4E8;">                | t        | t          | f             | f           | f           | f              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | f            |           | </span><span style="color:#79B8FF;">16456</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_read_all_stats    | f        | t          | f             | f           | f           | f              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | f            |           |  </span><span style="color:#79B8FF;">3375</span></span>
<span class="line"><span style="color:#E1E4E8;"> zjy                  | f        | t          | f             | f           | t           | f              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | f            |           | </span><span style="color:#79B8FF;">16729</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_monitor           | f        | t          | f             | f           | f           | f              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | f            |           |  </span><span style="color:#79B8FF;">3373</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_read_all_settings | f        | t          | f             | f           | f           | f              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | f            |           |  </span><span style="color:#79B8FF;">3374</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_stat_scan_tables  | f        | t          | f             | f           | f           | f              |           </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> | </span><span style="color:#F97583;">********</span><span style="color:#E1E4E8;">    |               | f            |           |  </span><span style="color:#79B8FF;">3377</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#或者</span></span>
<span class="line"><span style="color:#E1E4E8;">查看当前连接的用户名：</span></span>
<span class="line"><span style="color:#E1E4E8;">foo</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">#</span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> current_user;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">或</span></span>
<span class="line"><span style="color:#E1E4E8;">foo</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">#</span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> user;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">查看所有用户名：</span></span>
<span class="line"><span style="color:#E1E4E8;">foo</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">#\\du</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\du</span></span>
<span class="line"><span style="color:#24292E;">                                   List of roles</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">Role</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;"> |                         Attributes                         | Member of </span></span>
<span class="line"><span style="color:#6A737D;">-----------+------------------------------------------------------------+-----------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">admin</span><span style="color:#24292E;">     | Superuser, Cannot </span><span style="color:#D73A49;">login</span><span style="color:#24292E;">                                    | {}</span></span>
<span class="line"><span style="color:#24292E;"> postgres  | Superuser, </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">role</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Create</span><span style="color:#24292E;"> DB, Replication, Bypass RLS | {}</span></span>
<span class="line"><span style="color:#24292E;"> zjy       |                                                            | {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_roles;</span></span>
<span class="line"><span style="color:#24292E;">       rolname        | rolsuper | rolinherit | rolcreaterole | rolcreatedb | rolcanlogin | rolreplication | rolconnlimit | rolpassword | rolvaliduntil | rolbypassrls | rolconfig |  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#6A737D;">----------------------+----------+------------+---------------+-------------+-------------+----------------+--------------+-------------+---------------+--------------+-----------+-------</span></span>
<span class="line"><span style="color:#24292E;"> pg_signal_backend    | f        | t          | f             | f           | f           | f              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | f            |           |  </span><span style="color:#005CC5;">4200</span></span>
<span class="line"><span style="color:#24292E;"> postgres             | t        | t          | t             | t           | t           | t              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | t            |           |    </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">admin</span><span style="color:#24292E;">                | t        | t          | f             | f           | f           | f              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | f            |           | </span><span style="color:#005CC5;">16456</span></span>
<span class="line"><span style="color:#24292E;"> pg_read_all_stats    | f        | t          | f             | f           | f           | f              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | f            |           |  </span><span style="color:#005CC5;">3375</span></span>
<span class="line"><span style="color:#24292E;"> zjy                  | f        | t          | f             | f           | t           | f              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | f            |           | </span><span style="color:#005CC5;">16729</span></span>
<span class="line"><span style="color:#24292E;"> pg_monitor           | f        | t          | f             | f           | f           | f              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | f            |           |  </span><span style="color:#005CC5;">3373</span></span>
<span class="line"><span style="color:#24292E;"> pg_read_all_settings | f        | t          | f             | f           | f           | f              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | f            |           |  </span><span style="color:#005CC5;">3374</span></span>
<span class="line"><span style="color:#24292E;"> pg_stat_scan_tables  | f        | t          | f             | f           | f           | f              |           </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> | </span><span style="color:#D73A49;">********</span><span style="color:#24292E;">    |               | f            |           |  </span><span style="color:#005CC5;">3377</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#或者</span></span>
<span class="line"><span style="color:#24292E;">查看当前连接的用户名：</span></span>
<span class="line"><span style="color:#24292E;">foo</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">#</span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> current_user;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">或</span></span>
<span class="line"><span style="color:#24292E;">foo</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">#</span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> user;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">查看所有用户名：</span></span>
<span class="line"><span style="color:#24292E;">foo</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">#\\du</span></span></code></pre></div><h2 id="_8-2查看用户权限" tabindex="-1">8.2查看用户权限 <a class="header-anchor" href="#_8-2查看用户权限" aria-label="Permalink to &quot;8.2查看用户权限&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">zjy</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">information_schema</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">table_privileges</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> grantee</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;zjy&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> grantor  | grantee | table_catalog | table_schema | table_name | privilege_type | is_grantable | with_hierarchy </span></span>
<span class="line"><span style="color:#6A737D;">----------+---------+---------------+--------------+------------+----------------+--------------+----------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;">         | </span><span style="color:#F97583;">NO</span><span style="color:#E1E4E8;">           | </span><span style="color:#F97583;">NO</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;">         | </span><span style="color:#F97583;">NO</span><span style="color:#E1E4E8;">           | YES</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;">         | </span><span style="color:#F97583;">NO</span><span style="color:#E1E4E8;">           | </span><span style="color:#F97583;">NO</span></span>
<span class="line"><span style="color:#E1E4E8;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;">         | </span><span style="color:#F97583;">NO</span><span style="color:#E1E4E8;">           | </span><span style="color:#F97583;">NO</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">zjy</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">information_schema</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">table_privileges</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> grantee</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;zjy&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> grantor  | grantee | table_catalog | table_schema | table_name | privilege_type | is_grantable | with_hierarchy </span></span>
<span class="line"><span style="color:#6A737D;">----------+---------+---------------+--------------+------------+----------------+--------------+----------------</span></span>
<span class="line"><span style="color:#24292E;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;">         | </span><span style="color:#D73A49;">NO</span><span style="color:#24292E;">           | </span><span style="color:#D73A49;">NO</span></span>
<span class="line"><span style="color:#24292E;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;">         | </span><span style="color:#D73A49;">NO</span><span style="color:#24292E;">           | YES</span></span>
<span class="line"><span style="color:#24292E;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;">         | </span><span style="color:#D73A49;">NO</span><span style="color:#24292E;">           | </span><span style="color:#D73A49;">NO</span></span>
<span class="line"><span style="color:#24292E;"> postgres | zjy     | zjy           | zjy          | zjy        | </span><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;">         | </span><span style="color:#D73A49;">NO</span><span style="color:#24292E;">           | </span><span style="color:#D73A49;">NO</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">显示角色属性（包含系统权限）</span></span>
<span class="line"><span style="color:#e1e4e8;">\\du 或\\du+ [username] </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查看系统表 select * from pg_roles|pg_user; </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查看某用户或角色的权限</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from information_schema.table_privileges where grantee=&#39;repuser&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">显示对象的访问权限列表</span></span>
<span class="line"><span style="color:#e1e4e8;"> \\z或\\dp [tablename]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">显示角色属性（包含系统权限）</span></span>
<span class="line"><span style="color:#24292e;">\\du 或\\du+ [username] </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查看系统表 select * from pg_roles|pg_user; </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查看某用户或角色的权限</span></span>
<span class="line"><span style="color:#24292e;">select * from information_schema.table_privileges where grantee=&#39;repuser&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">显示对象的访问权限列表</span></span>
<span class="line"><span style="color:#24292e;"> \\z或\\dp [tablename]</span></span></code></pre></div><h1 id="_9-案例用户权限" tabindex="-1">9，案例用户权限 <a class="header-anchor" href="#_9-案例用户权限" aria-label="Permalink to &quot;9，案例用户权限&quot;">​</a></h1><p>三个独自子系统bas、app1、app3 bas系统的数据为app1和app3系统所共有的基础数据 app1可修改bas系统数据，但不能删除 app3只能查询bas系统数据，不能修改和删除 需求：只需配置一次，后续新增表无需再次配置</p><h1 id="_10-案例schema-和-database-权限" tabindex="-1">10.案例schema 和 database 权限 <a class="header-anchor" href="#_10-案例schema-和-database-权限" aria-label="Permalink to &quot;10.案例schema 和 database 权限&quot;">​</a></h1><p>关于 schema 使用，需要特别注意，同一个 schema 中可能会有其它用户读取，也就是说，千万不要把自己的对象创建到别人的 schema下面</p><h2 id="示例1" tabindex="-1">示例1 <a class="header-anchor" href="#示例1" aria-label="Permalink to &quot;示例1&quot;">​</a></h2><p>r1 创建了一个 schema r1，并把这个 schema 的所有权限给了 r2；此时，r2 和超级用户 postgres 分别在 r1 这个 schema 下面创建了一个表；此时，r1 可以把 r2 和 postgres 在 schema r1 下创建的表删掉</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE r1 LOGIN;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE r2 LOGIN;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# GRANT ALL ON DATABASE postgres TO r1;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# GRANT ALL ON DATABASE postgres TO r2;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\c postgres r1;</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;postgres&quot; as user &quot;r1&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; CREATE SCHEMA r1;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; GRANT ALL ON SCHEMA r1 TO r2;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; \\c postgres r2;</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;postgres&quot; as user &quot;r2&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; CREATE TABLE r1.t(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; \\c postgres postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# CREATE TABLE r1.t1(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\c postgres r1</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; DROP TABLE r1.t;</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; DROP TABLE r1.t1;</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP TABLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE r1 LOGIN;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span>
<span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE r2 LOGIN;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# GRANT ALL ON DATABASE postgres TO r1;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span>
<span class="line"><span style="color:#24292e;">postgres=# GRANT ALL ON DATABASE postgres TO r2;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\c postgres r1;</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;postgres&quot; as user &quot;r1&quot;.</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; CREATE SCHEMA r1;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; GRANT ALL ON SCHEMA r1 TO r2;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; \\c postgres r2;</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;postgres&quot; as user &quot;r2&quot;.</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; CREATE TABLE r1.t(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; \\c postgres postgres</span></span>
<span class="line"><span style="color:#24292e;">postgres=# CREATE TABLE r1.t1(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\c postgres r1</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; DROP TABLE r1.t;</span></span>
<span class="line"><span style="color:#24292e;">DROP TABLE</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; DROP TABLE r1.t1;</span></span>
<span class="line"><span style="color:#24292e;">DROP TABLE</span></span></code></pre></div><p>r1 甚至可以直接 <code>DROP SCHEMA CASCADE</code> 来删除整个 schema</p><h2 id="示例2" tabindex="-1">示例2 <a class="header-anchor" href="#示例2" aria-label="Permalink to &quot;示例2&quot;">​</a></h2><p>对于 database 的 owner 也存在这个问题，它同样具有删除 database 中任何其他用户创建的对象的权力</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">----- 添加创建数据库的权限</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# ALTER USER r1 WITH CREATEDB;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">----- 普通用户r1创建的数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\c postgres r1</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;postgres&quot; as user &quot;r1&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; CREATE DATABASE db1;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE DATABASE</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; GRANT ALL ON DATABASE db1 TO r2;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">----- 其他用户在这个数据库中创建对象</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; \\c db1 r2</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;db1&quot; as user &quot;r2&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">db1=&gt; CREATE SCHEMA r2;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#e1e4e8;">db1=&gt; CREATE TABLE r2.t(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db1=&gt; \\c db1 postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;db1&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">db1=# CREATE TABLE t(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">----- 数据库的OWNER不能直接删数据库中的对象</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; \\c db1 r1</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;db1&quot; as user &quot;r1&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">db1=&gt; DROP TABLE r2.t ;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  permission denied for schema r2</span></span>
<span class="line"><span style="color:#e1e4e8;">db1=&gt; DROP TABLE public.t ;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  must be owner of relation t</span></span>
<span class="line"><span style="color:#e1e4e8;">db1=&gt; DROP SCHEMA r2;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  must be owner of schema r2</span></span>
<span class="line"><span style="color:#e1e4e8;">db1=&gt; DROP SCHEMA public;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  must be owner of schema public</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">----- 但是可以直接删库</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=&gt; DROP DATABASE db1;</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP DATABASE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">----- 添加创建数据库的权限</span></span>
<span class="line"><span style="color:#24292e;">postgres=# ALTER USER r1 WITH CREATEDB;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">----- 普通用户r1创建的数据库</span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\c postgres r1</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;postgres&quot; as user &quot;r1&quot;.</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; CREATE DATABASE db1;</span></span>
<span class="line"><span style="color:#24292e;">CREATE DATABASE</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; GRANT ALL ON DATABASE db1 TO r2;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">----- 其他用户在这个数据库中创建对象</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; \\c db1 r2</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;db1&quot; as user &quot;r2&quot;.</span></span>
<span class="line"><span style="color:#24292e;">db1=&gt; CREATE SCHEMA r2;</span></span>
<span class="line"><span style="color:#24292e;">CREATE SCHEMA</span></span>
<span class="line"><span style="color:#24292e;">db1=&gt; CREATE TABLE r2.t(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db1=&gt; \\c db1 postgres</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;db1&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#24292e;">db1=# CREATE TABLE t(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">----- 数据库的OWNER不能直接删数据库中的对象</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; \\c db1 r1</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;db1&quot; as user &quot;r1&quot;.</span></span>
<span class="line"><span style="color:#24292e;">db1=&gt; DROP TABLE r2.t ;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  permission denied for schema r2</span></span>
<span class="line"><span style="color:#24292e;">db1=&gt; DROP TABLE public.t ;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  must be owner of relation t</span></span>
<span class="line"><span style="color:#24292e;">db1=&gt; DROP SCHEMA r2;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  must be owner of schema r2</span></span>
<span class="line"><span style="color:#24292e;">db1=&gt; DROP SCHEMA public;</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  must be owner of schema public</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">----- 但是可以直接删库</span></span>
<span class="line"><span style="color:#24292e;">postgres=&gt; DROP DATABASE db1;</span></span>
<span class="line"><span style="color:#24292e;">DROP DATABASE</span></span></code></pre></div><blockquote><p>[!WARNING]</p><p>介于此，建议用户使用超级用户创建 schema 和 database，然后再把 schema 和 database 的读写权限给普通用户，这样就不怕被误删了，因为超级用户本来就有所有权限。</p><p>还有一种方法是创建事件触发器，当执行 DROP 命令时，只有 OWNER 和超级用户能删对应的对象</p></blockquote><h1 id="_11-只读用户设计" tabindex="-1">11.只读用户设计 <a class="header-anchor" href="#_11-只读用户设计" aria-label="Permalink to &quot;11.只读用户设计&quot;">​</a></h1><h2 id="_1-使用超级用户创建读写账号-创建数据库-创建schema" tabindex="-1">1. 使用超级用户创建读写账号，创建数据库, 创建schema <a class="header-anchor" href="#_1-使用超级用户创建读写账号-创建数据库-创建schema" aria-label="Permalink to &quot;1. 使用超级用户创建读写账号，创建数据库, 创建schema&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> appuser </span><span style="color:#F97583;">LOGIN</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> appdb;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 使用超级用户创建schema</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\c appdb postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">You are </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;"> connected </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;appdb&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> user </span><span style="color:#9ECBFF;">&quot;postgres&quot;</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">appdb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> appuser;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 赋权</span></span>
<span class="line"><span style="color:#E1E4E8;">appdb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">CONNECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> appdb </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> appuser;   </span><span style="color:#6A737D;">-- 只赋予连接权限</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span></span>
<span class="line"><span style="color:#E1E4E8;">appdb</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> ALL </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> appuser </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> appuser;       </span><span style="color:#6A737D;">-- 值赋予读和写权限</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> appuser </span><span style="color:#D73A49;">LOGIN</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> appdb;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 使用超级用户创建schema</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\c appdb postgres</span></span>
<span class="line"><span style="color:#24292E;">You are </span><span style="color:#D73A49;">now</span><span style="color:#24292E;"> connected </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;appdb&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> user </span><span style="color:#032F62;">&quot;postgres&quot;</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">appdb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> appuser;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">----- 赋权</span></span>
<span class="line"><span style="color:#24292E;">appdb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">CONNECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> appdb </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> appuser;   </span><span style="color:#6A737D;">-- 只赋予连接权限</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span></span>
<span class="line"><span style="color:#24292E;">appdb</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> ALL </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> appuser </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> appuser;       </span><span style="color:#6A737D;">-- 值赋予读和写权限</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span></span></code></pre></div><h2 id="_2-假设该读写账号已经创建了一些对象" tabindex="-1">2. 假设该读写账号已经创建了一些对象 <a class="header-anchor" href="#_2-假设该读写账号已经创建了一些对象" aria-label="Permalink to &quot;2. 假设该读写账号已经创建了一些对象&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# \\c appdb appuser</span></span>
<span class="line"><span style="color:#e1e4e8;">appdb=&gt; CREATE TABLE tbl1(id INT);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">appdb=&gt; CREATE TABLE tbl2(id INT);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">appdb=&gt; CREATE TABLE tbl3(id INT);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# \\c appdb appuser</span></span>
<span class="line"><span style="color:#24292e;">appdb=&gt; CREATE TABLE tbl1(id INT);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">appdb=&gt; CREATE TABLE tbl2(id INT);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">appdb=&gt; CREATE TABLE tbl3(id INT);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span></code></pre></div><h2 id="_3-创建只读影子账号" tabindex="-1">3. 创建只读影子账号 <a class="header-anchor" href="#_3-创建只读影子账号" aria-label="Permalink to &quot;3. 创建只读影子账号&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# CREATE ROLE readonly LOGIN;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ROLE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\c appdb postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;appdb&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">appdb=# GRANT CONNECT ON DATABASE appdb TO readonly;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span>
<span class="line"><span style="color:#e1e4e8;">appdb=# GRANT USAGE ON SCHEMA appuser TO readonly;</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# CREATE ROLE readonly LOGIN;</span></span>
<span class="line"><span style="color:#24292e;">CREATE ROLE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\c appdb postgres</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;appdb&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#24292e;">appdb=# GRANT CONNECT ON DATABASE appdb TO readonly;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span>
<span class="line"><span style="color:#24292e;">appdb=# GRANT USAGE ON SCHEMA appuser TO readonly;</span></span>
<span class="line"><span style="color:#24292e;">GRANT</span></span></code></pre></div><h2 id="_4-创建隐藏敏感信息的视图" tabindex="-1">4. 创建隐藏敏感信息的视图 <a class="header-anchor" href="#_4-创建隐藏敏感信息的视图" aria-label="Permalink to &quot;4. 创建隐藏敏感信息的视图&quot;">​</a></h2><p>假设tbl2是敏感信息表，需要加密后给只读用户看</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# \\c appdb appuser</span></span>
<span class="line"><span style="color:#e1e4e8;">appdb=&gt; CREATE VIEW v AS SELECT md5(id::text) FROM tbl2;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE VIEW</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# \\c appdb appuser</span></span>
<span class="line"><span style="color:#24292e;">appdb=&gt; CREATE VIEW v AS SELECT md5(id::text) FROM tbl2;</span></span>
<span class="line"><span style="color:#24292e;">CREATE VIEW</span></span></code></pre></div><h2 id="_5-修改已有权限" tabindex="-1">5. 修改已有权限 <a class="header-anchor" href="#_5-修改已有权限" aria-label="Permalink to &quot;5. 修改已有权限&quot;">​</a></h2><p>另外还提供了一种方法，但是一定要指定 schema，所以用户自己要注意，如果要对所有 schema 操作，需要把所有的 schema 都写进去</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">grant select on all tables in schema public,schema1,schema2,schema3 to ro;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">grant select on all tables in schema public,schema1,schema2,schema3 to ro;</span></span></code></pre></div><p>并且这种方法还有一个弊端，如果这些schema下面有其他用户创建的对象，也会被赋予，如果赋权的账号没有权限，则会报错</p><h2 id="_6-修改新建对象的默认权限" tabindex="-1">6.修改新建对象的默认权限 <a class="header-anchor" href="#_6-修改新建对象的默认权限" aria-label="Permalink to &quot;6.修改新建对象的默认权限&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">appdb=&gt; alter default privileges for role appuser grant select on tables to ro;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER DEFAULT PRIVILEGES</span></span>
<span class="line"><span style="color:#e1e4e8;">appdb=&gt; \\ddp+</span></span>
<span class="line"><span style="color:#e1e4e8;">               Default access privileges</span></span>
<span class="line"><span style="color:#e1e4e8;">  Owner   | Schema | Type  |     Access privileges</span></span>
<span class="line"><span style="color:#e1e4e8;">----------+--------+-------+---------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> appuser  |        | table | appuser=arwdDxt/appuser  +</span></span>
<span class="line"><span style="color:#e1e4e8;">          |        |       | ro=r/appuser</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">appdb=&gt; alter default privileges for role appuser grant select on tables to ro;</span></span>
<span class="line"><span style="color:#24292e;">ALTER DEFAULT PRIVILEGES</span></span>
<span class="line"><span style="color:#24292e;">appdb=&gt; \\ddp+</span></span>
<span class="line"><span style="color:#24292e;">               Default access privileges</span></span>
<span class="line"><span style="color:#24292e;">  Owner   | Schema | Type  |     Access privileges</span></span>
<span class="line"><span style="color:#24292e;">----------+--------+-------+---------------------------</span></span>
<span class="line"><span style="color:#24292e;"> appuser  |        | table | appuser=arwdDxt/appuser  +</span></span>
<span class="line"><span style="color:#24292e;">          |        |       | ro=r/appuser</span></span></code></pre></div><p>新增的敏感表，先创建视图，同时回收表的权限</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">appuser=&gt; create table tbl4(id int);</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE</span></span>
<span class="line"><span style="color:#e1e4e8;">appuser=&gt; create view v2 as select md5(id::text) from tbl4;</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE VIEW</span></span>
<span class="line"><span style="color:#e1e4e8;">appuser=&gt; revoke select on tbl4 from ro;</span></span>
<span class="line"><span style="color:#e1e4e8;">REVOKE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">appuser=&gt; create table tbl4(id int);</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE</span></span>
<span class="line"><span style="color:#24292e;">appuser=&gt; create view v2 as select md5(id::text) from tbl4;</span></span>
<span class="line"><span style="color:#24292e;">CREATE VIEW</span></span>
<span class="line"><span style="color:#24292e;">appuser=&gt; revoke select on tbl4 from ro;</span></span>
<span class="line"><span style="color:#24292e;">REVOKE</span></span></code></pre></div><h2 id="_7-创建只读用户案例" tabindex="-1">7.创建只读用户案例 <a class="header-anchor" href="#_7-创建只读用户案例" aria-label="Permalink to &quot;7.创建只读用户案例&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">. 创建用户</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">user_name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ENCRYPTED</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;password&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">. 设置只读事务</span></span>
<span class="line"><span style="color:#F97583;">alter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> user_name </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> default_transaction_read_only</span><span style="color:#F97583;">=on</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">. 赋予指定数据库权限</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">CONNECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> db_name </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">. 进入指定数据库</span></span>
<span class="line"><span style="color:#6A737D;">--在工具中进入数据库或命令行下：</span></span>
<span class="line"><span style="color:#E1E4E8;">\\c db_name</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">. 把当前库现有的所有在public这个schema下的表的使用权限赋给用户</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> USAGE </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">. 默认把当前库之后新建在public这个schema下的表的使用权限赋给用户</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLES </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">. 赋予用户public下的序列的查看权</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> ALL SEQUENCES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">. 赋予用户public下的表的select权</span></span>
<span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> ALL TABLES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> user_name;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;">. 创建用户</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">USER</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">user_name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ENCRYPTED</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;password&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">2</span><span style="color:#24292E;">. 设置只读事务</span></span>
<span class="line"><span style="color:#D73A49;">alter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> user_name </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> default_transaction_read_only</span><span style="color:#D73A49;">=on</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">3</span><span style="color:#24292E;">. 赋予指定数据库权限</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">CONNECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> db_name </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">4</span><span style="color:#24292E;">. 进入指定数据库</span></span>
<span class="line"><span style="color:#6A737D;">--在工具中进入数据库或命令行下：</span></span>
<span class="line"><span style="color:#24292E;">\\c db_name</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">. 把当前库现有的所有在public这个schema下的表的使用权限赋给用户</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> USAGE </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">6</span><span style="color:#24292E;">. 默认把当前库之后新建在public这个schema下的表的使用权限赋给用户</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLES </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">7</span><span style="color:#24292E;">. 赋予用户public下的序列的查看权</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> ALL SEQUENCES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">8</span><span style="color:#24292E;">. 赋予用户public下的表的select权</span></span>
<span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> ALL TABLES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> user_name;</span></span></code></pre></div><p>或者</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">使用postgres超级账号登录PG，创建2个业务账号</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create user  rw login password &#39;123456&#39;;   -- 创建读写账号</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create user rd login password &#39;123456&#39;;     -- 创建只读账号</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create database ticket;   -- 创建测试用数据库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">alter database ticket owner to rw ;  -- 将ticket库owner改为 rw账号</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\c ticket   -- 切换到ticket库下</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">grant select on all tables in schema public to rd ;   # 对rd账号授权，当前已有的表的只读权限  （注意：这个命令对于当前已有的表生效。对于后期新创建的表，是没有加其它的授权）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">alter role rd  set default_transaction_read_only=true;   -- 给rd用户设置只读模式</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">然后，我们使用rw账号登录PG：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\c ticket</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create table t (a int , b int ) ;  -- 尝试创建一张新表</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ticket=&gt; select * from  t;   这里看到是可以执行查询的</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> a | b </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---+---</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(0 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">然后，再开一个窗口，使用rd账号登录PG：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\c ticket</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ticket=&gt; select * from  t;   这里看到提示居然没有查询的权限了</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这时候，如果我们rd账号需要访问t表，则需要使用rw账号再次执行下 grant SELECT on TABLE t to rd ; 命令，才能将rd账号授予t表的select授权</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">更好用的解决方法（即，避免每次新加表后都要执行一次grant授权操作）：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用rw账号登录PG</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\c ticket </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER DEFAULT PRIVILEGES IN SCHEMA public grant select on tables to rd;    -- 对于后期使用rw账号创建的表， rd账号都可以读取的（注意: 如果使用postgres超级账号创建的表的话，rd账号还是不能读取的）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">执行完上面的ALTER DEFAULT PRIVILEGES 命令操作后，使用rw账号再去创建一个新的表，可以看到：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ticket=&gt; create  table tb55(a int, b int);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ticket=&gt; \\dp tb55</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                            Access privileges</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema | Name | Type  | Access privileges | Column privileges | Policies </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--------+------+-------+-------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> public | tb55 | table | rw=arwdDxt/rw    +|                   | </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        |      |       | rd=r/rw           |                   |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">使用postgres超级账号登录PG，创建2个业务账号</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create user  rw login password &#39;123456&#39;;   -- 创建读写账号</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create user rd login password &#39;123456&#39;;     -- 创建只读账号</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create database ticket;   -- 创建测试用数据库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">alter database ticket owner to rw ;  -- 将ticket库owner改为 rw账号</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\c ticket   -- 切换到ticket库下</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">grant select on all tables in schema public to rd ;   # 对rd账号授权，当前已有的表的只读权限  （注意：这个命令对于当前已有的表生效。对于后期新创建的表，是没有加其它的授权）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">alter role rd  set default_transaction_read_only=true;   -- 给rd用户设置只读模式</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">然后，我们使用rw账号登录PG：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\c ticket</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create table t (a int , b int ) ;  -- 尝试创建一张新表</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ticket=&gt; select * from  t;   这里看到是可以执行查询的</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> a | b </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---+---</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(0 rows)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">然后，再开一个窗口，使用rd账号登录PG：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\c ticket</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ticket=&gt; select * from  t;   这里看到提示居然没有查询的权限了</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这时候，如果我们rd账号需要访问t表，则需要使用rw账号再次执行下 grant SELECT on TABLE t to rd ; 命令，才能将rd账号授予t表的select授权</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">更好用的解决方法（即，避免每次新加表后都要执行一次grant授权操作）：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用rw账号登录PG</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\c ticket </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER DEFAULT PRIVILEGES IN SCHEMA public grant select on tables to rd;    -- 对于后期使用rw账号创建的表， rd账号都可以读取的（注意: 如果使用postgres超级账号创建的表的话，rd账号还是不能读取的）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">执行完上面的ALTER DEFAULT PRIVILEGES 命令操作后，使用rw账号再去创建一个新的表，可以看到：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ticket=&gt; create  table tb55(a int, b int);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ticket=&gt; \\dp tb55</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                            Access privileges</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> Schema | Name | Type  | Access privileges | Column privileges | Policies </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--------+------+-------+-------------------+-------------------+----------</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> public | tb55 | table | rw=arwdDxt/rw    +|                   | </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        |      |       | rd=r/rw           |                   |</span></span></code></pre></div><p><a href="http://postgres.cn/docs/10/sql-alterdefaultprivileges.html" target="_blank" rel="noreferrer">http://postgres.cn/docs/10/sql-alterdefaultprivileges.html</a></p><p><a href="https://www.postgresql.org/docs/11/runtime-config-client.html" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/11/runtime-config-client.html</a></p><h3 id="回收权限" tabindex="-1">回收权限 <a class="header-anchor" href="#回收权限" aria-label="Permalink to &quot;回收权限&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">. 回收schema的usage权限</span></span>
<span class="line"><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> USAGE </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">. 回收public下所有表的查询权限：</span></span>
<span class="line"><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> ALL TABLES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">. 回收public下所有序列的查询权限</span></span>
<span class="line"><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> ALL SEQUENCES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">. 回收默认权限</span></span>
<span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLES </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">. 关闭数据库连接权限</span></span>
<span class="line"><span style="color:#F97583;">revoke</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">CONNECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> db_name </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">. 关闭默认只读事务设置</span></span>
<span class="line"><span style="color:#F97583;">alter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> user_name </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> default_transaction_read_only</span><span style="color:#F97583;">=off</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">. 查看权限是否为空了</span></span>
<span class="line"><span style="color:#E1E4E8;">\\ddp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">. 通过管理员删除user_name用户：</span></span>
<span class="line"><span style="color:#F97583;">drop</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> user_name;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;">. 回收schema的usage权限</span></span>
<span class="line"><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> USAGE </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">2</span><span style="color:#24292E;">. 回收public下所有表的查询权限：</span></span>
<span class="line"><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> ALL TABLES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">3</span><span style="color:#24292E;">. 回收public下所有序列的查询权限</span></span>
<span class="line"><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> ALL SEQUENCES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">4</span><span style="color:#24292E;">. 回收默认权限</span></span>
<span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLES </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">5</span><span style="color:#24292E;">. 关闭数据库连接权限</span></span>
<span class="line"><span style="color:#D73A49;">revoke</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">CONNECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> db_name </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> user_name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">6</span><span style="color:#24292E;">. 关闭默认只读事务设置</span></span>
<span class="line"><span style="color:#D73A49;">alter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> user_name </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> default_transaction_read_only</span><span style="color:#D73A49;">=off</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">7</span><span style="color:#24292E;">. 查看权限是否为空了</span></span>
<span class="line"><span style="color:#24292E;">\\ddp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">8</span><span style="color:#24292E;">. 通过管理员删除user_name用户：</span></span>
<span class="line"><span style="color:#D73A49;">drop</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> user_name;</span></span></code></pre></div><h1 id="_12-案例查看表" tabindex="-1">12.案例查看表 <a class="header-anchor" href="#_12-案例查看表" aria-label="Permalink to &quot;12.案例查看表&quot;">​</a></h1><p>查询表命名空间、表名称、对象类型、表大小、表行数、表注释等：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Schema&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Name&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">CASE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relkind</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">WHEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;r&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">THEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;table&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">WHEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;v&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">THEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;view&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">WHEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;m&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">THEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;materialized view&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">WHEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;i&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">THEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;index&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">WHEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;S&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">THEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;sequence&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">WHEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;s&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">THEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;special&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">WHEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;f&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">THEN</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;foreign table&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">END</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Type&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">pg_catalog</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">pg_get_userbyid</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relowner</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Owner&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">pg_catalog</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">pg_size_pretty</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">pg_catalog</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">pg_table_size</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">oid</span><span style="color:#E1E4E8;">)) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Size&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">pg_catalog</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">obj_description</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">oid</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;pg_class&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Description&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">reltuples</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;rows&quot;</span></span>
<span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pg_catalog</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">pg_class</span><span style="color:#E1E4E8;"> c</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">LEFT JOIN</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pg_catalog</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">pg_namespace</span><span style="color:#E1E4E8;"> n </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">oid</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relnamespace</span></span>
<span class="line"><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">c</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">relkind</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&#39;r&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;s&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">AND</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;pg_catalog&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">AND</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;information_schema&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">AND</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">n</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">nspname</span><span style="color:#E1E4E8;"> !~ </span><span style="color:#9ECBFF;">&#39;^pg_toast&#39;</span></span>
<span class="line"><span style="color:#F97583;">ORDER BY</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">limit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Schema</span><span style="color:#E1E4E8;"> |        </span><span style="color:#F97583;">Name</span><span style="color:#E1E4E8;">        | </span><span style="color:#F97583;">Type</span><span style="color:#E1E4E8;">  |  </span><span style="color:#F97583;">Owner</span><span style="color:#E1E4E8;">   |    </span><span style="color:#F97583;">Size</span><span style="color:#E1E4E8;">    | </span><span style="color:#F97583;">Description</span><span style="color:#E1E4E8;"> |     </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#6A737D;">--------+--------------------+-------+----------+------------+-------------+--------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | adg                | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> bytes    |             |            </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | emp1               | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">8192</span><span style="color:#E1E4E8;"> bytes |             |            </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | t1                 | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">8192</span><span style="color:#E1E4E8;"> bytes |             |            </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | tbl_expression     | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">528</span><span style="color:#E1E4E8;"> kB     |             |        </span><span style="color:#79B8FF;">10000</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | tbl_index          | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">498</span><span style="color:#E1E4E8;"> MB     |             |        1e</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">07</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | tbl_partial_index  | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">517</span><span style="color:#E1E4E8;"> MB     |             | </span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">.000101e</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">06</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | tbl_partial_index1 | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">517</span><span style="color:#E1E4E8;"> MB     |             | </span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">.000101e</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">06</span></span>
<span class="line"><span style="color:#E1E4E8;"> public | tbl_unique_index   | </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> | postgres | </span><span style="color:#79B8FF;">8192</span><span style="color:#E1E4E8;"> bytes |             |            </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">n</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Schema&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Name&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">CASE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relkind</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">WHEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;r&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">THEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;table&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">WHEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;v&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">THEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;view&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">WHEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;m&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">THEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;materialized view&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">WHEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;i&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">THEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;index&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">WHEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;S&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">THEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;sequence&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">WHEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;s&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">THEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;special&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">WHEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;f&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">THEN</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;foreign table&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">END</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Type&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">pg_catalog</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">pg_get_userbyid</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relowner</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Owner&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">pg_catalog</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">pg_size_pretty</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">pg_catalog</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">pg_table_size</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">oid</span><span style="color:#24292E;">)) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Size&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">pg_catalog</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">obj_description</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">oid</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;pg_class&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Description&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">reltuples</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;rows&quot;</span></span>
<span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pg_catalog</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">pg_class</span><span style="color:#24292E;"> c</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">LEFT JOIN</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pg_catalog</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">pg_namespace</span><span style="color:#24292E;"> n </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">oid</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relnamespace</span></span>
<span class="line"><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">c</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">relkind</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&#39;r&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;s&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">AND</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;pg_catalog&#39;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">AND</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;information_schema&#39;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">AND</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">n</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">nspname</span><span style="color:#24292E;"> !~ </span><span style="color:#032F62;">&#39;^pg_toast&#39;</span></span>
<span class="line"><span style="color:#D73A49;">ORDER BY</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">limit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">Schema</span><span style="color:#24292E;"> |        </span><span style="color:#D73A49;">Name</span><span style="color:#24292E;">        | </span><span style="color:#D73A49;">Type</span><span style="color:#24292E;">  |  </span><span style="color:#D73A49;">Owner</span><span style="color:#24292E;">   |    </span><span style="color:#D73A49;">Size</span><span style="color:#24292E;">    | </span><span style="color:#D73A49;">Description</span><span style="color:#24292E;"> |     </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#6A737D;">--------+--------------------+-------+----------+------------+-------------+--------------</span></span>
<span class="line"><span style="color:#24292E;"> public | adg                | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> bytes    |             |            </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;"> public | emp1               | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">8192</span><span style="color:#24292E;"> bytes |             |            </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;"> public | t1                 | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">8192</span><span style="color:#24292E;"> bytes |             |            </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;"> public | tbl_expression     | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">528</span><span style="color:#24292E;"> kB     |             |        </span><span style="color:#005CC5;">10000</span></span>
<span class="line"><span style="color:#24292E;"> public | tbl_index          | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">498</span><span style="color:#24292E;"> MB     |             |        1e</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">07</span></span>
<span class="line"><span style="color:#24292E;"> public | tbl_partial_index  | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">517</span><span style="color:#24292E;"> MB     |             | </span><span style="color:#005CC5;">9</span><span style="color:#24292E;">.000101e</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">06</span></span>
<span class="line"><span style="color:#24292E;"> public | tbl_partial_index1 | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">517</span><span style="color:#24292E;"> MB     |             | </span><span style="color:#005CC5;">9</span><span style="color:#24292E;">.000101e</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">06</span></span>
<span class="line"><span style="color:#24292E;"> public | tbl_unique_index   | </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> | postgres | </span><span style="color:#005CC5;">8192</span><span style="color:#24292E;"> bytes |             |            </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="查询数据库大小" tabindex="-1">查询数据库大小 <a class="header-anchor" href="#查询数据库大小" aria-label="Permalink to &quot;查询数据库大小&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 查询单个数据库大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_size_pretty(pg_database_size(&#39;postgres&#39;)) as size;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查询所有数据库大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select datname, pg_size_pretty (pg_database_size(datname)) AS size from pg_database;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 查询单个数据库大小</span></span>
<span class="line"><span style="color:#24292e;">select pg_size_pretty(pg_database_size(&#39;postgres&#39;)) as size;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">-- 查询所有数据库大小</span></span>
<span class="line"><span style="color:#24292e;">select datname, pg_size_pretty (pg_database_size(datname)) AS size from pg_database;</span></span></code></pre></div><h2 id="查询表大小" tabindex="-1">查询表大小 <a class="header-anchor" href="#查询表大小" aria-label="Permalink to &quot;查询表大小&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 查询单个表大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_size_pretty(pg_relation_size(&#39;mytab&#39;)) as size;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查询所有表大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select relname, pg_size_pretty(pg_relation_size(relid)) as size from pg_stat_user_tables;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查询单个表的总大小，包括该表的索引大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_size_pretty(pg_total_relation_size(&#39;tab&#39;)) as size;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查询所有表的总大小，包括其索引大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select relname, pg_size_pretty(pg_total_relation_size(relid)) as size from pg_stat_user_tables;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 查询单个表大小</span></span>
<span class="line"><span style="color:#24292e;">select pg_size_pretty(pg_relation_size(&#39;mytab&#39;)) as size;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">-- 查询所有表大小</span></span>
<span class="line"><span style="color:#24292e;">select relname, pg_size_pretty(pg_relation_size(relid)) as size from pg_stat_user_tables;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">-- 查询单个表的总大小，包括该表的索引大小</span></span>
<span class="line"><span style="color:#24292e;">select pg_size_pretty(pg_total_relation_size(&#39;tab&#39;)) as size;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">-- 查询所有表的总大小，包括其索引大小</span></span>
<span class="line"><span style="color:#24292e;">select relname, pg_size_pretty(pg_total_relation_size(relid)) as size from pg_stat_user_tables;</span></span></code></pre></div><h2 id="查询索引大小" tabindex="-1">查询索引大小 <a class="header-anchor" href="#查询索引大小" aria-label="Permalink to &quot;查询索引大小&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 查询单个索引大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_size_pretty(pg_relation_size(&#39;myindex&#39;)) as size;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 查询单个索引大小</span></span>
<span class="line"><span style="color:#24292e;">select pg_size_pretty(pg_relation_size(&#39;myindex&#39;)) as size;</span></span></code></pre></div><h2 id="查询表空间大小" tabindex="-1">查询表空间大小 <a class="header-anchor" href="#查询表空间大小" aria-label="Permalink to &quot;查询表空间大小&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-- 查询单个表空间大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_size_pretty(pg_tablespace_size(&#39;pg_default&#39;)) as size;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">-- 查询所有表空间大小</span></span>
<span class="line"><span style="color:#e1e4e8;">select spcname, pg_size_pretty(pg_tablespace_size(spcname)) as size from pg_tablespace;</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 或</span></span>
<span class="line"><span style="color:#e1e4e8;">select spcname, pg_size_pretty(pg_tablespace_size(oid)) as size from pg_tablespace;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-- 查询单个表空间大小</span></span>
<span class="line"><span style="color:#24292e;">select pg_size_pretty(pg_tablespace_size(&#39;pg_default&#39;)) as size;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">-- 查询所有表空间大小</span></span>
<span class="line"><span style="color:#24292e;">select spcname, pg_size_pretty(pg_tablespace_size(spcname)) as size from pg_tablespace;</span></span>
<span class="line"><span style="color:#24292e;">-- 或</span></span>
<span class="line"><span style="color:#24292e;">select spcname, pg_size_pretty(pg_tablespace_size(oid)) as size from pg_tablespace;</span></span></code></pre></div><h1 id="_13-只读账户" tabindex="-1">13.只读账户 <a class="header-anchor" href="#_13-只读账户" aria-label="Permalink to &quot;13.只读账户&quot;">​</a></h1><p><a href="https://postgres.fun/20120817105800.html" target="_blank" rel="noreferrer">https://postgres.fun/20120817105800.html</a></p><h1 id="_14-读写" tabindex="-1">14.读写 <a class="header-anchor" href="#_14-读写" aria-label="Permalink to &quot;14.读写&quot;">​</a></h1><p>create user yidu_user with password &#39;aeb87d2548cd08&#39; ;</p><p>create database AdvertiseDB owner yidu_user ;</p><p>grant all on database usercenter to yidu_user ;</p><h1 id="_15-通用账户创建" tabindex="-1">15.通用账户创建 <a class="header-anchor" href="#_15-通用账户创建" aria-label="Permalink to &quot;15.通用账户创建&quot;">​</a></h1><p>（1）默认情况下，数据库在创建后，允许public角色连接，即允许任何人连接，需要revoke connect on database xxx from public之后，再显式执行grant connect on database xxx to xxx。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> ALL </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> mydatabase </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> PUBLIC;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> ALL </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> mydatabase </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> PUBLIC;</span></span></code></pre></div><p>（2）默认情况下，数据库在创建后，会自动创建名为public的schema，这个schema的all权限已经赋予给public角色，即允许任何人在里面创建对象，所以为了方便安全，先revoke，再按需授予权限。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">REVOKE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> public </span><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> PUBLIC;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">REVOKE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> public </span><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> PUBLIC;</span></span></code></pre></div><p>（3）创建用户</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">user1</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">user</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">user1</span><span style="color:#24292E;">;</span></span></code></pre></div><p>（4）创建角色</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ROLE</span><span style="color:#E1E4E8;"> role1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ROLE</span><span style="color:#24292E;"> role1;</span></span></code></pre></div><p>（5）允许角色连接数据库</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">CONNECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> mydatabase </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">CONNECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> mydatabase </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role1;</span></span></code></pre></div><p>（6）允许角色使用模式</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> USAGE </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> myschema </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> USAGE </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> myschema </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role1;</span></span></code></pre></div><p>（7）赋予角色查询（或update，delete，insert等）权限</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> ALL TABLES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> myschema </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> ALL TABLES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> myschema </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role1;</span></span></code></pre></div><p>（8）对于新增的表，不需要再次赋权</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> PRIVILEGES </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SCHEMA</span><span style="color:#E1E4E8;"> myschema </span><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">UPDATE</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">DELETE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ON</span><span style="color:#E1E4E8;"> TABLES </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> role1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> PRIVILEGES </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SCHEMA</span><span style="color:#24292E;"> myschema </span><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">UPDATE</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">DELETE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ON</span><span style="color:#24292E;"> TABLES </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> role1;</span></span></code></pre></div><p>（9）角色赋予用户</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> role1 </span><span style="color:#F97583;">TO</span><span style="color:#E1E4E8;"> user1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> role1 </span><span style="color:#D73A49;">TO</span><span style="color:#24292E;"> user1;</span></span></code></pre></div>`,295),e=[o];function c(t,r,E,y,i,A){return a(),n("div",null,e)}const g=s(l,[["render",c]]);export{F as __pageData,g as default};
