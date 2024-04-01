import{_ as s,c as a,o as n,R as p}from"./chunks/framework.CIzs38F0.js";const g=JSON.parse('{"title":"pg数据库data目录","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/3-dir.md","filePath":"guide/Database/pgSql/base/3-dir.md","lastUpdated":1711952995000}'),l={name:"guide/Database/pgSql/base/3-dir.md"},e=p(`<h1 id="pg数据库data目录" tabindex="-1">pg数据库data目录 <a class="header-anchor" href="#pg数据库data目录" aria-label="Permalink to &quot;pg数据库data目录&quot;">​</a></h1><p>pg数据库和mysql数据库的安装目录结构很类似，程序和数据是分开的，在启动时候可以自行指定不同的数据目录来做到启动不同的数据库</p><p>释pg数据目录下，每个文件夹以及文件名的作用</p><table><thead><tr><th>目录名</th><th>作用</th></tr></thead><tbody><tr><td>base</td><td>该目录包含了数据库中各个数据库，每个数据库都是由一个文件夹组成，文件名是该数据库的oid，这个可以通过数据字典pg_database来查看对应的数据库名(select oid,datname from pg_database)。</td></tr><tr><td>pg_xlog/pg_wal</td><td>该目录包含wal(预写)日志。注意在10版本后，该目录重命名为&quot;pg_wal&quot;。</td></tr><tr><td>global</td><td>该目录包含集群范围的各个表和相关视图。 （ pg_database、 pg_tablespace ）</td></tr><tr><td>pg_clog</td><td>该目录包含事务提交状态数据。</td></tr><tr><td>pg_multixact</td><td>该目录包含多事务状态数据（等待锁定的并发事务）</td></tr><tr><td>pg_notify</td><td>该目录包含LISTEN/NOTIFY状态数据。存储通知信息，用于在事务提交时发送通知</td></tr><tr><td>pg_serial</td><td>该目录包含了已经提交的序列化事务的有关信息。</td></tr><tr><td>pg_snapshots</td><td>该目录包含导出的快照,存储快照文件，用于逻辑复制的初始同步</td></tr><tr><td>pg_stat_tmp</td><td>该目录包含统计子系统的临时文件。</td></tr><tr><td>pg_subtrans</td><td>该目录包含子事务状态数据。</td></tr><tr><td>pg_tblspc</td><td>该目录包含表空间的符号链接。</td></tr><tr><td>pg_twophase</td><td>该目录包含预备事务的状态文件。</td></tr><tr><td>pg_commit_ts</td><td>该目录包含已提交事务的时间。</td></tr><tr><td>pg_dynshmem</td><td>该目录动态共享内存目录，用于存储动态分配的共享内存块</td></tr><tr><td>pg_logical</td><td>该目录包含逻辑解码的状态数据。</td></tr><tr><td>pg_replslot</td><td>该目录包含复制槽数据，用于物理复制和逻辑复制</td></tr><tr><td>pg_stat</td><td>该目录包含统计子系统的永久文件,存储统计信息，用于数据库的性能监控</td></tr></tbody></table><hr><table><thead><tr><th>文件名</th><th>作用</th></tr></thead><tbody><tr><td>pg_hba.conf</td><td>数据库访问控制文件，一般新安装的数据库都需要进行配置，在流复制中也需要配置。</td></tr><tr><td>pg_ident.conf</td><td>将数据库用户映射到本地用户的一种认证方式，使用比较少，在特殊场景下需要配置（控制哪一个本地用户可以连接到哪一个数据库）。</td></tr><tr><td>postgresql.conf/postgresql.auto.conf</td><td>主要配置文件，在数据库安装完后，需要手动更改里面的监听地址，否则默认只能本地连接。</td></tr><tr><td>PG_VERSION</td><td>包含版本信息。</td></tr><tr><td>postmaster.pid</td><td>启动后pg主进程ID</td></tr></tbody></table><h2 id="_1-global" tabindex="-1">1.global <a class="header-anchor" href="#_1-global" aria-label="Permalink to &quot;1.global&quot;">​</a></h2><p>global，存放的文件用于存储全局的系统表信息和全局控制信息。</p><p>global下有四种文件：</p><ol><li>pg_control 用于存储全局控制信息</li><li>pg_filenode.map 用于将当前目录下系统表的OID与具体文件名进行硬编码映射（每个用户创建的数据库目录下也有同名文件）。</li><li>pg_internal.init 用于缓存系统表，加快系统表读取速度（每个用户创建的数据库目录下也有同名文件）。</li><li>全局系统表文件 数字命名的文件，用于存储系统表的内容。它们在pg_class里的relfilenode都为0，是靠pg_filenode.map将OID与文件硬编码映射。（注：不是所有的系统表的relfilenode都为0）</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">data</span></span>
<span class="line"><span style="color:#e1e4e8;">├── global                # under global, all the filenode is hard-code(select oid,relname,relfilenode from pg_class where relfilenode=0 order by oid;)</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1136              # pg_pltemplate</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1137              # pg_pltemplate_name_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1213              # pg_tablespace</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1214              # pg_shdepend</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1232              # pg_shdepend_depender_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1233              # pg_shdepend_reference_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1260              # pg_authid</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1261              # pg_auth_members</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1262              # pg_database</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2396              # pg_shdescription</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2397              # pg_shdescription_o_c_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2671              # pg_database_datname_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2672              # pg_database_oid_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2676              # pg_authid_rolname_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2677              # pg_authid_oid_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2694              # pg_auth_members_role_member_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2695              # pg_auth_members_member_role_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2697              # pg_tablespace_oid_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2698              # pg_tablespace_spcname_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2846              # pg_toast_2396</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2847              # pg_toast_2396_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2964              # pg_db_role_setting</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2965              # pg_db_role_setting_databaseid_rol_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2966              # pg_toast_2964</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 2967              # pg_toast_2964_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 3592              # pg_shseclabel</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 3593              # pg_shseclabel_object_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 4060              # pg_toast_3592x</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 4061              # pg_toast_3592_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 6000              # pg_replication_origin</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 6001              # pg_replication_origin_roiident_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 6002              # pg_replication_origin_roname_index</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── pg_control        # global control file, use pgcheck -pc to see it.</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── pg_filenode.map   # system table (oid -&gt; filenode) mapping file, use pgcheck -pm to see it.</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── pg_internal.init  # system table cache file, use pgcheck -pr to see it.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">data</span></span>
<span class="line"><span style="color:#24292e;">├── global                # under global, all the filenode is hard-code(select oid,relname,relfilenode from pg_class where relfilenode=0 order by oid;)</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1136              # pg_pltemplate</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1137              # pg_pltemplate_name_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1213              # pg_tablespace</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1214              # pg_shdepend</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1232              # pg_shdepend_depender_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1233              # pg_shdepend_reference_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1260              # pg_authid</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1261              # pg_auth_members</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1262              # pg_database</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2396              # pg_shdescription</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2397              # pg_shdescription_o_c_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2671              # pg_database_datname_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2672              # pg_database_oid_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2676              # pg_authid_rolname_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2677              # pg_authid_oid_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2694              # pg_auth_members_role_member_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2695              # pg_auth_members_member_role_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2697              # pg_tablespace_oid_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2698              # pg_tablespace_spcname_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2846              # pg_toast_2396</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2847              # pg_toast_2396_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2964              # pg_db_role_setting</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2965              # pg_db_role_setting_databaseid_rol_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2966              # pg_toast_2964</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 2967              # pg_toast_2964_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 3592              # pg_shseclabel</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 3593              # pg_shseclabel_object_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 4060              # pg_toast_3592x</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 4061              # pg_toast_3592_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 6000              # pg_replication_origin</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 6001              # pg_replication_origin_roiident_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 6002              # pg_replication_origin_roname_index</span></span>
<span class="line"><span style="color:#24292e;">│   ├── pg_control        # global control file, use pgcheck -pc to see it.</span></span>
<span class="line"><span style="color:#24292e;">│   ├── pg_filenode.map   # system table (oid -&gt; filenode) mapping file, use pgcheck -pm to see it.</span></span>
<span class="line"><span style="color:#24292e;">│   └── pg_internal.init  # system table cache file, use pgcheck -pr to see it.</span></span></code></pre></div><h2 id="_2-base" tabindex="-1">2.base <a class="header-anchor" href="#_2-base" aria-label="Permalink to &quot;2.base&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">data</span></span>
<span class="line"><span style="color:#e1e4e8;">├── base                  # use to store database file(SELECT oid, datname FROM pg_database;)</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 1                 # template database</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 12406             # template0 database</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── 12407             # postgres database</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── 16384             # testdb, first user database</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── 3600</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── 3600_fsm</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── 3600_vm</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── 16385</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── pg_filenode.map</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── pg_internal.init</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   └── PG_VERSION</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">data</span></span>
<span class="line"><span style="color:#24292e;">├── base                  # use to store database file(SELECT oid, datname FROM pg_database;)</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 1                 # template database</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 12406             # template0 database</span></span>
<span class="line"><span style="color:#24292e;">│   ├── 12407             # postgres database</span></span>
<span class="line"><span style="color:#24292e;">│   └── 16384             # testdb, first user database</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── 3600</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── 3600_fsm</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── 3600_vm</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── 16385</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── pg_filenode.map</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── pg_internal.init</span></span>
<span class="line"><span style="color:#24292e;">│   │   └── PG_VERSION</span></span></code></pre></div><ol><li>pg_filenode.map 是pg_class里relfilenode为0的系统表，OID与文件的硬编码映射。</li><li>pg_internal.init 是系统表的cache文件，用于加快读取。默认不存在，查询系统表后自动产生。</li><li>PG_VERSION 是当前数据库数据格式对应的版本号</li><li>其它文件是需要到pg_class里根据OID查到对应的relfilenode来与文件名匹配的。 例如：tab1的relfilenode是16385，那么16385这个文件就是tab1的数据文件</li></ol><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">han</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">,relfilenode,relname </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_class </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> relname</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  | relfilenode | relname </span></span>
<span class="line"><span style="color:#6A737D;">-------+-------------+---------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16393</span><span style="color:#E1E4E8;"> |       </span><span style="color:#79B8FF;">16393</span><span style="color:#E1E4E8;"> | test</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">han</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">,relfilenode,relname </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_class </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> relname</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  | relfilenode | relname </span></span>
<span class="line"><span style="color:#6A737D;">-------+-------------+---------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">16393</span><span style="color:#24292E;"> |       </span><span style="color:#005CC5;">16393</span><span style="color:#24292E;"> | test</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span></code></pre></div><p>5.空闲空间映射表 名字以_fsm结尾的文件是数据文件对应的FSM(free space map)文件，用map方式来标识哪些block是空闲的。用一个Byte而不是bit来标识一个block。对于一个有N个字节的block，它在_fsm文件中第blknum个字节中记录的值是(31+N)/32。通过这种方式标识一个block空闲字节数。FSM中不是简单的数组，而是一个三层的树形结构。FSM文件是在需要用到它时才自动产生的。</p><p>6.可见性映射表文件 名字以_vm结尾的文件是数据文件对应的VM(visibility map)。PostgreSQL中在做多版本并发控制时是通过在元组头上标识“已无效”来实现删除或更新的，最后通过VACUUM功能来清理无效数据回收空闲空间。在做VACUUM时就使用VM开快速查找包含无效元组的block。VM仅是个简单的bitmap,一个bit对应一个block。</p><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><p>系统表分为全局系统表和库级系统表。</p><p>全局系统表位于global下，例如：pg_database,pg_tablespace,pg_auth_members这种存储系统级对象的表。</p><p>库级系统表位于数据库目录下，例如：pg_type,pg_proc,pg_attribute这种存储库级对象的表。</p><p>值得注意的是pg_class位于库级目录的里，但也包含全局系统表信息，因此研发或运维人员在改动全局系统表信息时需要注意</p></div><h2 id="_3-表空间" tabindex="-1">3.表空间 <a class="header-anchor" href="#_3-表空间" aria-label="Permalink to &quot;3.表空间&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">han</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_tablespace;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  | </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  |  spcname   | spcowner | spcacl | spcoptions </span></span>
<span class="line"><span style="color:#6A737D;">------+------+------------+----------+--------+------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1663</span><span style="color:#E1E4E8;"> | </span><span style="color:#79B8FF;">1663</span><span style="color:#E1E4E8;"> | pg_default |       </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> |        | </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1664</span><span style="color:#E1E4E8;"> | </span><span style="color:#79B8FF;">1664</span><span style="color:#E1E4E8;"> | pg_global  |       </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> |        | </span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">han</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_tablespace;</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  | </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  |  spcname   | spcowner | spcacl | spcoptions </span></span>
<span class="line"><span style="color:#6A737D;">------+------+------------+----------+--------+------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">1663</span><span style="color:#24292E;"> | </span><span style="color:#005CC5;">1663</span><span style="color:#24292E;"> | pg_default |       </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> |        | </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">1664</span><span style="color:#24292E;"> | </span><span style="color:#005CC5;">1664</span><span style="color:#24292E;"> | pg_global  |       </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> |        | </span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span></code></pre></div><p>每一个Oid都在data/pg_tblspc下对应一个名为Oid的软链接文件，指向真正的space目录</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">han</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> test1(a </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">) tablespace dbspace;</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">han</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">,relname,relfilenode </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_class </span><span style="color:#F97583;">where</span><span style="color:#E1E4E8;"> relname</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;test1&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">oid</span><span style="color:#E1E4E8;">  | relname | relfilenode</span></span>
<span class="line"><span style="color:#6A737D;">-------+---------+-------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">57351</span><span style="color:#E1E4E8;"> | tab3    |       </span><span style="color:#79B8FF;">57351</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#查看</span></span>
<span class="line"><span style="color:#E1E4E8;"> tree ..</span><span style="color:#F97583;">/data/</span><span style="color:#E1E4E8;">pg_tblspc</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">49162</span></span>
<span class="line"><span style="color:#E1E4E8;">..</span><span style="color:#F97583;">/data/</span><span style="color:#E1E4E8;">pg_tblspc</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">49162</span></span>
<span class="line"><span style="color:#E1E4E8;">└── </span><span style="color:#79B8FF;">PG_9</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">6_201608131</span></span>
<span class="line"><span style="color:#E1E4E8;">    └── </span><span style="color:#79B8FF;">16384</span></span>
<span class="line"><span style="color:#E1E4E8;">        └── </span><span style="color:#79B8FF;">57351</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">han</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> test1(a </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">) tablespace dbspace;</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">han</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">,relname,relfilenode </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_class </span><span style="color:#D73A49;">where</span><span style="color:#24292E;"> relname</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;test1&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">oid</span><span style="color:#24292E;">  | relname | relfilenode</span></span>
<span class="line"><span style="color:#6A737D;">-------+---------+-------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">57351</span><span style="color:#24292E;"> | tab3    |       </span><span style="color:#005CC5;">57351</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#查看</span></span>
<span class="line"><span style="color:#24292E;"> tree ..</span><span style="color:#D73A49;">/data/</span><span style="color:#24292E;">pg_tblspc</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">49162</span></span>
<span class="line"><span style="color:#24292E;">..</span><span style="color:#D73A49;">/data/</span><span style="color:#24292E;">pg_tblspc</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">49162</span></span>
<span class="line"><span style="color:#24292E;">└── </span><span style="color:#005CC5;">PG_9</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">6_201608131</span></span>
<span class="line"><span style="color:#24292E;">    └── </span><span style="color:#005CC5;">16384</span></span>
<span class="line"><span style="color:#24292E;">        └── </span><span style="color:#005CC5;">57351</span></span></code></pre></div>`,22),o=[e];function t(c,r,i,d,y,_){return n(),a("div",null,o)}const b=s(l,[["render",t]]);export{g as __pageData,b as default};
