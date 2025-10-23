import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const e="/assets/m.lrlnQyjD.png",l="/assets/wal.VA_1UD2b.png",o="/assets/wal2.FVx-9o6z.png",c="/assets/stream.0Vzk7FQM.jpg",t="/assets/ms.2_r7Y7g9.png",F=JSON.parse('{"title":"PostgreSQL主备流复制机制","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/cluster/1.stream.md","filePath":"guide/Database/pgSql/cluster/1.stream.md","lastUpdated":1703063387000}'),r={name:"guide/Database/pgSql/cluster/1.stream.md"},i=p('<h1 id="postgresql主备流复制机制" tabindex="-1">PostgreSQL主备流复制机制 <a class="header-anchor" href="#postgresql主备流复制机制" aria-label="Permalink to &quot;PostgreSQL主备流复制机制&quot;">​</a></h1><p>​ PostgreSQL在9.0之后引入了主备流复制机制，通过流复制，备库不断的从主库同步相应的数据，并在备库apply每个WAL record，这里的流复制每次传输单位是WAL日志的record。而PostgreSQL9.0之前提供的方法是主库写完一个WAL日志文件后，才把WAL日志文件传送到备库，这样的方式导致主备延迟特别大。同时PostgreSQL9.0之后提供了Hot Standby，备库在应用WAL record的同时也能够提供只读服务，大大提升了用户体验</p><h2 id="主备总体结构" tabindex="-1">主备总体结构 <a class="header-anchor" href="#主备总体结构" aria-label="Permalink to &quot;主备总体结构&quot;">​</a></h2><p>PG主备流复制的核心部分由walsender，walreceiver和startup三个进程组成</p><p>walsender进程是用来发送WAL日志记录的，执行顺序如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">PostgresMain()-&gt;exec_replication_command()-&gt;StartReplication()-&gt;WalSndLoop()-&gt;XLogSendPhysical()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">PostgresMain()-&gt;exec_replication_command()-&gt;StartReplication()-&gt;WalSndLoop()-&gt;XLogSendPhysical()</span></span></code></pre></div><p>walreceiver进程是用来接收WAL日志记录的，执行顺序如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sigusr1_handler()-&gt;StartWalReceiver()-&gt;AuxiliaryProcessMain()-&gt;WalReceiverMain()-&gt;walrcv_receive()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sigusr1_handler()-&gt;StartWalReceiver()-&gt;AuxiliaryProcessMain()-&gt;WalReceiverMain()-&gt;walrcv_receive()</span></span></code></pre></div><p>startup进程是用来apply日志的，执行顺序如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">PostmasterMain()-&gt;StartupDataBase()-&gt;AuxiliaryProcessMain()-&gt;StartupProcessMain()-&gt;StartupXLOG()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">PostmasterMain()-&gt;StartupDataBase()-&gt;AuxiliaryProcessMain()-&gt;StartupProcessMain()-&gt;StartupXLOG()</span></span></code></pre></div><p>PG主备总体框架图</p><p><img src="'+e+'" alt=""></p><h2 id="walsender和walreceiver进程流复制过程" tabindex="-1">walsender和walreceiver进程流复制过程 <a class="header-anchor" href="#walsender和walreceiver进程流复制过程" aria-label="Permalink to &quot;walsender和walreceiver进程流复制过程&quot;">​</a></h2><p>walsender和walreceiver交互主要分为以下几个步骤：</p><ol><li><p>walreceiver启动后通过recovery.conf文件中的primary_conninfo参数信息连向主库，主库通过连接参数replication=true启动walsender进程；</p></li><li><p>walreceiver执行identify_system命令，获取主库systemid/timeline/xlogpos等信息，执行TIMELINE_HISTORY命令拉取history文件；</p></li><li><p>执行wal_startstreaming开始启动流复制，通过walrcv_receive获取WAL日志，期间也会回应主库发过来的心跳信息(接收位点、flush位点、apply位点)，向主库发送feedback信息(最老的事务id)，避免vacuum删掉备库正在使用的记录；</p></li></ol><p>​ 4.执行walrcv_endstreaming结束流复制，等待startup进程更新receiveStart和receiveStartTLI，一旦更新，进入步骤2</p><p><img src="'+l+'" alt=""></p><h2 id="walreceiver和startup进程" tabindex="-1">walreceiver和startup进程 <a class="header-anchor" href="#walreceiver和startup进程" aria-label="Permalink to &quot;walreceiver和startup进程&quot;">​</a></h2><p>startup进程进入standby模式和apply日志主要过程：</p><p>1.读取pg_control文件，找到redo位点;读取recovery.conf，如果配置standby_mode=on则进入standby模式。</p><p>2.如果是Hot Standby需要初始化clog、subtrans、事务环境等。初始化redo资源管理器，比如Heap、Heap2、Database、XLOG等。</p><p>3.读取WAL record，如果record不存在需要调用XLogPageRead-&gt;WaitForWALToBecomeAvailable-&gt;RequestXLogStreaming唤醒walreceiver从walsender获取WAL record。</p><p>4.对读取的WAL record进行redo，通过<code>record-&gt;xl_rmid</code>信息，调用相应的redo资源管理器进行redo操作。比如heap_redo的XLOG_HEAP_INSERT操作，就是通过record的信息在buffer page中增加一个record：</p><p>还有部分redo操作(vacuum产生的record)需要检查在Hot Standby模式下的查询冲突，比如某些tuples需要remove，而存在正在执行的query可能读到这些tuples，这样 就会破坏事务隔离级别。通过函数ResolveRecoveryConflictWithSnapshot检测冲突，如果发生冲突，那么就把这个query所在的进程kill掉</p><p>5.检查一致性，如果一致了，Hot Standby模式可以接受用户只读查询；更新共享内存中XLogCtlData的apply位点和时间线；如果恢复到时间点，时间线或者事务id需要检 查是否恢复到当前目标；</p><p>6.回到步骤3，读取next WAL record</p><p><img src="'+o+'" alt=""></p><p><img src="'+c+`" alt=""></p><h1 id="_1-环境" tabindex="-1">1.环境 <a class="header-anchor" href="#_1-环境" aria-label="Permalink to &quot;1.环境&quot;">​</a></h1><p>​ Centos7/8 安装 postgreSQL</p><p>192.168.122.217 pg01 （主） 192.168.122.218 pg02（从）</p><p>--异步流复制 ，事务提交时不需要等待备库接收并写入wal日志便返回成功</p><p>pg12将recovery.conf文件合并到了postgresql.auto.conf</p><h2 id="_1-1安装" tabindex="-1">1.1安装 <a class="header-anchor" href="#_1-1安装" aria-label="Permalink to &quot;1.1安装&quot;">​</a></h2><p>省。。。</p><p>初始化数据库</p><p>[root@pg01 data]# systemctl start postgresql.service</p><h2 id="_1-2-主库创建用户" tabindex="-1">1.2 主库创建用户 <a class="header-anchor" href="#_1-2-主库创建用户" aria-label="Permalink to &quot;1.2 主库创建用户&quot;">​</a></h2><div class="language-pgsql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pgsql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@pg01 ~]$ psql -U postgres -h 127.0.0.1 -p 5532 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#CREATE USER repl replication LOGIN CONNECTION LIMIT 30 ENCRYPTED PASSWORD &#39;123456&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@pg01 ~]$ psql -U postgres -h 127.0.0.1 -p 5532 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=#CREATE USER repl replication LOGIN CONNECTION LIMIT 30 ENCRYPTED PASSWORD &#39;123456&#39;;</span></span></code></pre></div><h2 id="_1-3主库pg-hba-conf" tabindex="-1">1.3主库pg_hba.conf <a class="header-anchor" href="#_1-3主库pg-hba-conf" aria-label="Permalink to &quot;1.3主库pg_hba.conf&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">在末尾添加</span></span>
<span class="line"><span style="color:#e1e4e8;">host replication repl pg01 md5</span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">host          replication       replica    192.168.122.218/32         md5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">在末尾添加</span></span>
<span class="line"><span style="color:#24292e;">host replication repl pg01 md5</span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">host          replication       replica    192.168.122.218/32         md5</span></span></code></pre></div><h2 id="_1-4主库配置postgresql-conf" tabindex="-1">1.4主库配置postgresql.conf <a class="header-anchor" href="#_1-4主库配置postgresql-conf" aria-label="Permalink to &quot;1.4主库配置postgresql.conf&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">############### master-slave ##############</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level = hot_standby</span></span>
<span class="line"><span style="color:#e1e4e8;">#hot_standby = on</span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments = 16</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_sender_timeout = 60s</span></span>
<span class="line"><span style="color:#e1e4e8;">max_connections = 100     # 最大连接数，从机需要大于或等于该值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">############### master-slave ##############</span></span>
<span class="line"><span style="color:#24292e;">wal_level = hot_standby</span></span>
<span class="line"><span style="color:#24292e;">#hot_standby = on</span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments = 16</span></span>
<span class="line"><span style="color:#24292e;">wal_sender_timeout = 60s</span></span>
<span class="line"><span style="color:#24292e;">max_connections = 100     # 最大连接数，从机需要大于或等于该值</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">create database han_db</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE TABLE adg (c1 bigint  primary key,c2 bigint,c3 time,c4 character varying(136));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">create database han_db</span></span>
<span class="line"><span style="color:#24292e;">CREATE TABLE adg (c1 bigint  primary key,c2 bigint,c3 time,c4 character varying(136));</span></span></code></pre></div><p>重新加载配置参数</p><p>sudo -u postgres /usr/pgsql-12/bin/psql -c &quot;select pg_reload_conf()&quot;</p><h2 id="_1-5查看当前属于master-slave" tabindex="-1">1.5查看当前属于master/slave <a class="header-anchor" href="#_1-5查看当前属于master-slave" aria-label="Permalink to &quot;1.5查看当前属于master/slave&quot;">​</a></h2><h4 id="通过系统函数查看" tabindex="-1">通过系统函数查看 <a class="header-anchor" href="#通过系统函数查看" aria-label="Permalink to &quot;通过系统函数查看&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">u postgres </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">pgsql</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">12</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">psql </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&quot;select pg_is_in_recovery()&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 在master和slave上都执行</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@pg01 ~]$ psql </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">U postgres </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">h </span><span style="color:#79B8FF;">127</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p </span><span style="color:#79B8FF;">5532</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&quot;select pg_is_in_recovery()&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> pg_is_in_recovery </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> f</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">row</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">f说明是主库，t说明是备库</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#####或者</span></span>
<span class="line"><span style="color:#E1E4E8;">主机</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@localhost ~]$ pg_controldata</span></span>
<span class="line"><span style="color:#E1E4E8;">pg_control </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">number</span><span style="color:#E1E4E8;">:            </span><span style="color:#79B8FF;">903</span></span>
<span class="line"><span style="color:#F97583;">Catalog</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">number</span><span style="color:#E1E4E8;">:               </span><span style="color:#79B8FF;">201105231</span></span>
<span class="line"><span style="color:#F97583;">Database</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">system</span><span style="color:#E1E4E8;"> identifier:           </span><span style="color:#79B8FF;">5809766734683241747</span></span>
<span class="line"><span style="color:#F97583;">Database</span><span style="color:#E1E4E8;"> cluster </span><span style="color:#F97583;">state</span><span style="color:#E1E4E8;">:               </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> production</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">备机</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@localhost pg_log]$ pg_controldata </span><span style="color:#F97583;">/data/</span><span style="color:#E1E4E8;">pgdata</span><span style="color:#F97583;">/data</span><span style="color:#E1E4E8;"> |grep cluster</span></span>
<span class="line"><span style="color:#E1E4E8;">pg_control </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">number</span><span style="color:#E1E4E8;">:            </span><span style="color:#79B8FF;">903</span></span>
<span class="line"><span style="color:#F97583;">Catalog</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">number</span><span style="color:#E1E4E8;">:               </span><span style="color:#79B8FF;">201105231</span></span>
<span class="line"><span style="color:#F97583;">Database</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">system</span><span style="color:#E1E4E8;"> identifier:           </span><span style="color:#79B8FF;">5809766734683241747</span></span>
<span class="line"><span style="color:#F97583;">Database</span><span style="color:#E1E4E8;"> cluster </span><span style="color:#F97583;">state</span><span style="color:#E1E4E8;">:               </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> archive </span><span style="color:#F97583;">recovery</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">u postgres </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">pgsql</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">12</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">psql </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&quot;select pg_is_in_recovery()&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">-- 在master和slave上都执行</span></span>
<span class="line"><span style="color:#24292E;">[postgres@pg01 ~]$ psql </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">U postgres </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">h </span><span style="color:#005CC5;">127</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p </span><span style="color:#005CC5;">5532</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&quot;select pg_is_in_recovery()&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> pg_is_in_recovery </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> f</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">row</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">f说明是主库，t说明是备库</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#####或者</span></span>
<span class="line"><span style="color:#24292E;">主机</span></span>
<span class="line"><span style="color:#24292E;">[postgres@localhost ~]$ pg_controldata</span></span>
<span class="line"><span style="color:#24292E;">pg_control </span><span style="color:#D73A49;">version</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">number</span><span style="color:#24292E;">:            </span><span style="color:#005CC5;">903</span></span>
<span class="line"><span style="color:#D73A49;">Catalog</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">version</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">number</span><span style="color:#24292E;">:               </span><span style="color:#005CC5;">201105231</span></span>
<span class="line"><span style="color:#D73A49;">Database</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">system</span><span style="color:#24292E;"> identifier:           </span><span style="color:#005CC5;">5809766734683241747</span></span>
<span class="line"><span style="color:#D73A49;">Database</span><span style="color:#24292E;"> cluster </span><span style="color:#D73A49;">state</span><span style="color:#24292E;">:               </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> production</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">备机</span></span>
<span class="line"><span style="color:#24292E;">[postgres@localhost pg_log]$ pg_controldata </span><span style="color:#D73A49;">/data/</span><span style="color:#24292E;">pgdata</span><span style="color:#D73A49;">/data</span><span style="color:#24292E;"> |grep cluster</span></span>
<span class="line"><span style="color:#24292E;">pg_control </span><span style="color:#D73A49;">version</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">number</span><span style="color:#24292E;">:            </span><span style="color:#005CC5;">903</span></span>
<span class="line"><span style="color:#D73A49;">Catalog</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">version</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">number</span><span style="color:#24292E;">:               </span><span style="color:#005CC5;">201105231</span></span>
<span class="line"><span style="color:#D73A49;">Database</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">system</span><span style="color:#24292E;"> identifier:           </span><span style="color:#005CC5;">5809766734683241747</span></span>
<span class="line"><span style="color:#D73A49;">Database</span><span style="color:#24292E;"> cluster </span><span style="color:#D73A49;">state</span><span style="color:#24292E;">:               </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> archive </span><span style="color:#D73A49;">recovery</span></span></code></pre></div><h4 id="查看wal发送进程或wal接收线程" tabindex="-1">查看wal发送进程或wal接收线程 <a class="header-anchor" href="#查看wal发送进程或wal接收线程" aria-label="Permalink to &quot;查看wal发送进程或wal接收线程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">进程查看，显示wal sender的是主机，显示wal receiver的是备机</span></span>
<span class="line"><span style="color:#e1e4e8;">主机</span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@localhost ]$ ps -ef|grep postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres  5228  5224  0 05:26 ?        00:00:06 postgres: wal sender process   repuser 192.168.2.137(43246)  0/ED610000                     </span></span>
<span class="line"><span style="color:#e1e4e8;">.....</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">备机</span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@localhost ]$ ps -ef|grep postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres  5228  5224  0 05:22 ?        00:00:06 postgres: wal receiver process   streaming 0/ED610000</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres  5231  5224  0 05:22 ?        00:00:01 postgres: writer process</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">进程查看，显示wal sender的是主机，显示wal receiver的是备机</span></span>
<span class="line"><span style="color:#24292e;">主机</span></span>
<span class="line"><span style="color:#24292e;">[postgres@localhost ]$ ps -ef|grep postgres</span></span>
<span class="line"><span style="color:#24292e;">postgres  5228  5224  0 05:26 ?        00:00:06 postgres: wal sender process   repuser 192.168.2.137(43246)  0/ED610000                     </span></span>
<span class="line"><span style="color:#24292e;">.....</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">备机</span></span>
<span class="line"><span style="color:#24292e;">[postgres@localhost ]$ ps -ef|grep postgres</span></span>
<span class="line"><span style="color:#24292e;">postgres  5228  5224  0 05:22 ?        00:00:06 postgres: wal receiver process   streaming 0/ED610000</span></span>
<span class="line"><span style="color:#24292e;">postgres  5231  5224  0 05:22 ?        00:00:01 postgres: writer process</span></span></code></pre></div><h4 id="查看pg-stat-replication表" tabindex="-1">查看pg_stat_replication表 <a class="header-anchor" href="#查看pg-stat-replication表" aria-label="Permalink to &quot;查看pg_stat_replication表&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# select client_addr,usename,backend_start,application_name,sync_state,sync_priority FROM pg_stat_replication;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select * from pg_replication_slots;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# select client_addr,usename,backend_start,application_name,sync_state,sync_priority FROM pg_stat_replication;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select * from pg_replication_slots;</span></span></code></pre></div><h1 id="_2-从节点" tabindex="-1">2.从节点 <a class="header-anchor" href="#_2-从节点" aria-label="Permalink to &quot;2.从节点&quot;">​</a></h1><p>从库只安装数据库软件，不进行数据库初始化。根据主库相关路径配置，创建日志目录，表空间目录。 主库重载数据库配置信息</p><p>清空数据文件夹</p><p>从主节点拷贝数据 * 需要使用postgres用户进行操作否则启动从节点将会有问题</p><p>[postgres@pg02 data]$ pg_basebackup -D /data/pgdata/data -Fp -R -Xs -Pv -h 192.168.122.217 -p 5532 -U repl</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pg_basebackup: initiating base backup, waiting for checkpoint to complete</span></span>
<span class="line"><span style="color:#e1e4e8;">WARNING:  skipping special file &quot;./.s.PGSQL.5532&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: checkpoint completed</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: write-ahead log start point: 0/24000028 on timeline 1</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: starting background WAL receiver</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: created temporary replication slot &quot;pg_basebackup_25243&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">WARNING:  skipping special file &quot;./.s.PGSQL.5532&quot;/data/backup_label     )</span></span>
<span class="line"><span style="color:#e1e4e8;">49001/49001 kB (100%), 1/1 tablespace                                         </span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: write-ahead log end point: 0/24000100</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: waiting for background process to finish streaming ...</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: syncing data to disk ...</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup: base backup completed</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pg_basebackup: initiating base backup, waiting for checkpoint to complete</span></span>
<span class="line"><span style="color:#24292e;">WARNING:  skipping special file &quot;./.s.PGSQL.5532&quot;</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: checkpoint completed</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: write-ahead log start point: 0/24000028 on timeline 1</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: starting background WAL receiver</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: created temporary replication slot &quot;pg_basebackup_25243&quot;</span></span>
<span class="line"><span style="color:#24292e;">WARNING:  skipping special file &quot;./.s.PGSQL.5532&quot;/data/backup_label     )</span></span>
<span class="line"><span style="color:#24292e;">49001/49001 kB (100%), 1/1 tablespace                                         </span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: write-ahead log end point: 0/24000100</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: waiting for background process to finish streaming ...</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: syncing data to disk ...</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup: base backup completed</span></span></code></pre></div><blockquote><p>备注：</p><p>standby.signal ， postgresql.auto.conf 从库会产生两个文件</p></blockquote><p><em>pg_basebackup</em> 工具来同步基础数据，</p><p>-Fp表示以plain格式数据，</p><p>-Xs表示以stream方式包含所需的WAL文件，</p><p>-P表示显示进度，</p><p>-R表示为replication写配置信息</p><p>备份完成，在数据库实例目录下自动生成standby.signal“信号”文件，并在&quot;postgresql.auto.conf&quot;文件写入了主要数据库的连接信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@pg02 data]$ cat postgresql.auto.conf </span></span>
<span class="line"><span style="color:#e1e4e8;"># Do not edit this file manually!</span></span>
<span class="line"><span style="color:#e1e4e8;"># It will be overwritten by the ALTER SYSTEM command.</span></span>
<span class="line"><span style="color:#e1e4e8;">primary_conninfo = &#39;user=repl password=123456 host=192.168.122.217 port=5532 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@pg02 data]$ cat postgresql.auto.conf </span></span>
<span class="line"><span style="color:#24292e;"># Do not edit this file manually!</span></span>
<span class="line"><span style="color:#24292e;"># It will be overwritten by the ALTER SYSTEM command.</span></span>
<span class="line"><span style="color:#24292e;">primary_conninfo = &#39;user=repl password=123456 host=192.168.122.217 port=5532 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any&#39;</span></span></code></pre></div><h3 id="_2-0修改配置文件" tabindex="-1">2.0修改配置文件 <a class="header-anchor" href="#_2-0修改配置文件" aria-label="Permalink to &quot;2.0修改配置文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#################slave #################</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level = hot_standby</span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby = on</span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments = 16</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_sender_timeout = 60s</span></span>
<span class="line"><span style="color:#e1e4e8;">max_connections = 60</span></span>
<span class="line"><span style="color:#e1e4e8;">max_standby_streaming_delay = 30s</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_receiver_status_interval = 10s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#################slave #################</span></span>
<span class="line"><span style="color:#24292e;">wal_level = hot_standby</span></span>
<span class="line"><span style="color:#24292e;">hot_standby = on</span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments = 16</span></span>
<span class="line"><span style="color:#24292e;">wal_sender_timeout = 60s</span></span>
<span class="line"><span style="color:#24292e;">max_connections = 60</span></span>
<span class="line"><span style="color:#24292e;">max_standby_streaming_delay = 30s</span></span>
<span class="line"><span style="color:#24292e;">wal_receiver_status_interval = 10s</span></span></code></pre></div><p>方法二：</p><p><strong>在primary服务器通过pg_(start|stop)_backup函数进行备份</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# SELECT pg_start_backup(&#39;label&#39;, true);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_start_backup </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 7/E6000060</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ rsync -az --progress \${PGDATA} postgres@10.189.100.195:/usr/local/pgsql/ --exclude postmaster.pid</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# SELECT pg_stop_backup();</span></span>
<span class="line"><span style="color:#e1e4e8;">NOTICE:  pg_stop_backup complete, all required WAL segments have been archived</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_stop_backup </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 7/E60005C8</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# SELECT pg_start_backup(&#39;label&#39;, true);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> pg_start_backup </span></span>
<span class="line"><span style="color:#24292e;">-----------------</span></span>
<span class="line"><span style="color:#24292e;"> 7/E6000060</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ rsync -az --progress \${PGDATA} postgres@10.189.100.195:/usr/local/pgsql/ --exclude postmaster.pid</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# SELECT pg_stop_backup();</span></span>
<span class="line"><span style="color:#24292e;">NOTICE:  pg_stop_backup complete, all required WAL segments have been archived</span></span>
<span class="line"><span style="color:#24292e;"> pg_stop_backup </span></span>
<span class="line"><span style="color:#24292e;">----------------</span></span>
<span class="line"><span style="color:#24292e;"> 7/E60005C8</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p>修改postgresql.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">############### master-slave ##############</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level = hot_standby</span></span>
<span class="line"><span style="color:#e1e4e8;">max_connections = 4000 #大于主的数值</span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby = on</span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby_feedback = on</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments = 16</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_sender_timeout = 60s</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_receiver_status_interval = 10s</span></span>
<span class="line"><span style="color:#e1e4e8;">max_standby_streaming_delay = 30s</span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders = 50</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">############### master-slave ##############</span></span>
<span class="line"><span style="color:#24292e;">wal_level = hot_standby</span></span>
<span class="line"><span style="color:#24292e;">max_connections = 4000 #大于主的数值</span></span>
<span class="line"><span style="color:#24292e;">hot_standby = on</span></span>
<span class="line"><span style="color:#24292e;">hot_standby_feedback = on</span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments = 16</span></span>
<span class="line"><span style="color:#24292e;">wal_sender_timeout = 60s</span></span>
<span class="line"><span style="color:#24292e;">wal_receiver_status_interval = 10s</span></span>
<span class="line"><span style="color:#24292e;">max_standby_streaming_delay = 30s</span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders = 50</span></span></code></pre></div><p>启动从节点</p><p>[root@pg02 data]# systemctl start postgresql.service</p><h3 id="_2-1查看备库落后主库多少字节的wal日志" tabindex="-1"><strong>2.1查看备库落后主库多少字节的WAl日志</strong> <a class="header-anchor" href="#_2-1查看备库落后主库多少字节的wal日志" aria-label="Permalink to &quot;**2.1查看备库落后主库多少字节的WAl日志**&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> pg_xlog_location_diff(pg_current_xlog_location(),replay_location) </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_stat_replication ;     #在primary库查看</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> pg_xlog_location_diff(pg_current_xlog_location(),replay_location) </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_stat_replication ;     #在primary库查看</span></span></code></pre></div><h1 id="_3-验证数据" tabindex="-1">3.验证数据 <a class="header-anchor" href="#_3-验证数据" aria-label="Permalink to &quot;3.验证数据&quot;">​</a></h1><p>提前创建库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE adg (c1 bigint  primary key,c2 bigint,c3 time,c4 character varying(136));</span></span>
<span class="line"><span style="color:#e1e4e8;">insert into adg(c1,c2,c3,c4) values (random()*10000000, random()*1000,now(),md5(random()::text));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE adg (c1 bigint  primary key,c2 bigint,c3 time,c4 character varying(136));</span></span>
<span class="line"><span style="color:#24292e;">insert into adg(c1,c2,c3,c4) values (random()*10000000, random()*1000,now(),md5(random()::text));</span></span></code></pre></div><h2 id="_3-1登录从库" tabindex="-1">3.1登录从库 <a class="header-anchor" href="#_3-1登录从库" aria-label="Permalink to &quot;3.1登录从库&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pg02 data]# su - postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@pg02 ~]$ psql -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.2)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\l</span></span>
<span class="line"><span style="color:#e1e4e8;">                                 List of databases</span></span>
<span class="line"><span style="color:#e1e4e8;">   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges   </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------+----------+----------+------------+------------+-----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> han_db    | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres  | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#e1e4e8;"> template0 | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | =c/postgres          +</span></span>
<span class="line"><span style="color:#e1e4e8;">           |          |          |            |            | postgres=CTc/postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"> template1 | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | =c/postgres          +</span></span>
<span class="line"><span style="color:#e1e4e8;">           |          |          |            |            | postgres=CTc/postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">(4 rows)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#切换数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\c han_db</span></span>
<span class="line"><span style="color:#e1e4e8;">You are now connected to database &quot;han_db&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看包含有那些表</span></span>
<span class="line"><span style="color:#e1e4e8;">han_db=# \\dt</span></span>
<span class="line"><span style="color:#e1e4e8;">        List of relations</span></span>
<span class="line"><span style="color:#e1e4e8;"> Schema | Name | Type  |  Owner   </span></span>
<span class="line"><span style="color:#e1e4e8;">--------+------+-------+----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> public | adg  | table | postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">han_db=# select * from adg;</span></span>
<span class="line"><span style="color:#e1e4e8;">   c1    | c2  |       c3        |                c4                </span></span>
<span class="line"><span style="color:#e1e4e8;">---------+-----+-----------------+----------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 8841756 | 641 | 17:40:54.828836 | 5d71e8e45b6604aab3fb2968f4e4438a</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">han_db=# insert into adg(c1,c2,c3,c4) values (random()*10000000, random()*1000,now(),md5(random()::text));</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  cannot execute INSERT in a read-only transaction</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pg02 data]# su - postgres</span></span>
<span class="line"><span style="color:#24292e;">[postgres@pg02 ~]$ psql -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#24292e;">psql (12.2)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=#</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看数据库</span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\l</span></span>
<span class="line"><span style="color:#24292e;">                                 List of databases</span></span>
<span class="line"><span style="color:#24292e;">   Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges   </span></span>
<span class="line"><span style="color:#24292e;">-----------+----------+----------+------------+------------+-----------------------</span></span>
<span class="line"><span style="color:#24292e;"> han_db    | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#24292e;"> postgres  | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | </span></span>
<span class="line"><span style="color:#24292e;"> template0 | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | =c/postgres          +</span></span>
<span class="line"><span style="color:#24292e;">           |          |          |            |            | postgres=CTc/postgres</span></span>
<span class="line"><span style="color:#24292e;"> template1 | postgres | UTF8     | en_US.UTF8 | en_US.UTF8 | =c/postgres          +</span></span>
<span class="line"><span style="color:#24292e;">           |          |          |            |            | postgres=CTc/postgres</span></span>
<span class="line"><span style="color:#24292e;">(4 rows)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#切换数据库</span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\c han_db</span></span>
<span class="line"><span style="color:#24292e;">You are now connected to database &quot;han_db&quot; as user &quot;postgres&quot;.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看包含有那些表</span></span>
<span class="line"><span style="color:#24292e;">han_db=# \\dt</span></span>
<span class="line"><span style="color:#24292e;">        List of relations</span></span>
<span class="line"><span style="color:#24292e;"> Schema | Name | Type  |  Owner   </span></span>
<span class="line"><span style="color:#24292e;">--------+------+-------+----------</span></span>
<span class="line"><span style="color:#24292e;"> public | adg  | table | postgres</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">han_db=# select * from adg;</span></span>
<span class="line"><span style="color:#24292e;">   c1    | c2  |       c3        |                c4                </span></span>
<span class="line"><span style="color:#24292e;">---------+-----+-----------------+----------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 8841756 | 641 | 17:40:54.828836 | 5d71e8e45b6604aab3fb2968f4e4438a</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">han_db=# insert into adg(c1,c2,c3,c4) values (random()*10000000, random()*1000,now(),md5(random()::text));</span></span>
<span class="line"><span style="color:#24292e;">ERROR:  cannot execute INSERT in a read-only transaction</span></span></code></pre></div><h2 id="_3-2主库查看复制状态" tabindex="-1">3.2主库查看复制状态 <a class="header-anchor" href="#_3-2主库查看复制状态" aria-label="Permalink to &quot;3.2主库查看复制状态&quot;">​</a></h2><p>流异步复制，只有主库才能查到数据</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[postgres@pg01 ~]$ psql </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">U postgres </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">h </span><span style="color:#79B8FF;">127</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p </span><span style="color:#79B8FF;">5532</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">x </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&quot;select * from pg_stat_replication&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d postgres</span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">[ RECORD 1 ]</span><span style="color:#6A737D;">----+------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">pid              | </span><span style="color:#79B8FF;">10237</span></span>
<span class="line"><span style="color:#E1E4E8;">usesysid         | </span><span style="color:#79B8FF;">16384</span></span>
<span class="line"><span style="color:#E1E4E8;">usename          | repl</span></span>
<span class="line"><span style="color:#E1E4E8;">application_name | walreceiver</span></span>
<span class="line"><span style="color:#E1E4E8;">client_addr      | </span><span style="color:#79B8FF;">192</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">168</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">122</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">218</span></span>
<span class="line"><span style="color:#E1E4E8;">client_hostname  | pg02</span></span>
<span class="line"><span style="color:#E1E4E8;">client_port      | </span><span style="color:#79B8FF;">40998</span></span>
<span class="line"><span style="color:#E1E4E8;">backend_start    | </span><span style="color:#79B8FF;">2020</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">06</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">17</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">43</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">468171</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">08</span></span>
<span class="line"><span style="color:#E1E4E8;">backend_xmin     | </span><span style="color:#79B8FF;">490</span></span>
<span class="line"><span style="color:#F97583;">state</span><span style="color:#E1E4E8;">            | streaming</span></span>
<span class="line"><span style="color:#E1E4E8;">sent_lsn         | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">13000000</span></span>
<span class="line"><span style="color:#E1E4E8;">write_lsn        | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">13000000</span></span>
<span class="line"><span style="color:#E1E4E8;">flush_lsn        | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">13000000</span></span>
<span class="line"><span style="color:#E1E4E8;">replay_lsn       | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">13000000</span></span>
<span class="line"><span style="color:#E1E4E8;">write_lag        | </span></span>
<span class="line"><span style="color:#E1E4E8;">flush_lag        | </span></span>
<span class="line"><span style="color:#E1E4E8;">replay_lag       | </span></span>
<span class="line"><span style="color:#E1E4E8;">sync_priority    | </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">sync_state       | async</span></span>
<span class="line"><span style="color:#E1E4E8;">reply_time       | </span><span style="color:#79B8FF;">2020</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">06</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">17</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">07</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">13</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">226869</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">08</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#或者</span></span>
<span class="line"><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_replication_slots;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">或者</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\x</span></span>
<span class="line"><span style="color:#E1E4E8;">Expanded display </span><span style="color:#F97583;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">#  </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_stat_replication;</span></span>
<span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">[ RECORD 1 ]</span><span style="color:#6A737D;">----+------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">pid              | </span><span style="color:#79B8FF;">10237</span></span>
<span class="line"><span style="color:#E1E4E8;">usesysid         | </span><span style="color:#79B8FF;">16384</span></span>
<span class="line"><span style="color:#E1E4E8;">usename          | repl        </span><span style="color:#6A737D;">--复制用户</span></span>
<span class="line"><span style="color:#E1E4E8;">application_name | walreceiver</span></span>
<span class="line"><span style="color:#E1E4E8;">client_addr      | </span><span style="color:#79B8FF;">192</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">168</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">122</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">218</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">--从库IP</span></span>
<span class="line"><span style="color:#E1E4E8;">client_hostname  | pg02</span></span>
<span class="line"><span style="color:#E1E4E8;">client_port      | </span><span style="color:#79B8FF;">40998</span></span>
<span class="line"><span style="color:#E1E4E8;">backend_start    | </span><span style="color:#79B8FF;">2020</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">06</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">17</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">43</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">468171</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">08</span></span>
<span class="line"><span style="color:#E1E4E8;">backend_xmin     | </span><span style="color:#79B8FF;">490</span></span>
<span class="line"><span style="color:#F97583;">state</span><span style="color:#E1E4E8;">            | streaming       </span><span style="color:#6A737D;">--流复制</span></span>
<span class="line"><span style="color:#E1E4E8;">sent_lsn         | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">12000000</span></span>
<span class="line"><span style="color:#E1E4E8;">write_lsn        | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">12000000</span></span>
<span class="line"><span style="color:#E1E4E8;">flush_lsn        | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">12000000</span></span>
<span class="line"><span style="color:#E1E4E8;">replay_lsn       | </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">12000000</span></span>
<span class="line"><span style="color:#E1E4E8;">write_lag        | </span></span>
<span class="line"><span style="color:#E1E4E8;">flush_lag        | </span></span>
<span class="line"><span style="color:#E1E4E8;">replay_lag       | </span></span>
<span class="line"><span style="color:#E1E4E8;">sync_priority    | </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">sync_state       | async     </span><span style="color:#6A737D;">--异步</span></span>
<span class="line"><span style="color:#E1E4E8;">reply_time       | </span><span style="color:#79B8FF;">2020</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">06</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">17</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">42</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">3673</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">08</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[postgres@pg01 ~]$ psql </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">U postgres </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">h </span><span style="color:#005CC5;">127</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p </span><span style="color:#005CC5;">5532</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">x </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&quot;select * from pg_stat_replication&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d postgres</span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">[ RECORD 1 ]</span><span style="color:#6A737D;">----+------------------------------</span></span>
<span class="line"><span style="color:#24292E;">pid              | </span><span style="color:#005CC5;">10237</span></span>
<span class="line"><span style="color:#24292E;">usesysid         | </span><span style="color:#005CC5;">16384</span></span>
<span class="line"><span style="color:#24292E;">usename          | repl</span></span>
<span class="line"><span style="color:#24292E;">application_name | walreceiver</span></span>
<span class="line"><span style="color:#24292E;">client_addr      | </span><span style="color:#005CC5;">192</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">168</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">122</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">218</span></span>
<span class="line"><span style="color:#24292E;">client_hostname  | pg02</span></span>
<span class="line"><span style="color:#24292E;">client_port      | </span><span style="color:#005CC5;">40998</span></span>
<span class="line"><span style="color:#24292E;">backend_start    | </span><span style="color:#005CC5;">2020</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">06</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">15</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">17</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">43</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">468171</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">08</span></span>
<span class="line"><span style="color:#24292E;">backend_xmin     | </span><span style="color:#005CC5;">490</span></span>
<span class="line"><span style="color:#D73A49;">state</span><span style="color:#24292E;">            | streaming</span></span>
<span class="line"><span style="color:#24292E;">sent_lsn         | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">13000000</span></span>
<span class="line"><span style="color:#24292E;">write_lsn        | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">13000000</span></span>
<span class="line"><span style="color:#24292E;">flush_lsn        | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">13000000</span></span>
<span class="line"><span style="color:#24292E;">replay_lsn       | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">13000000</span></span>
<span class="line"><span style="color:#24292E;">write_lag        | </span></span>
<span class="line"><span style="color:#24292E;">flush_lag        | </span></span>
<span class="line"><span style="color:#24292E;">replay_lag       | </span></span>
<span class="line"><span style="color:#24292E;">sync_priority    | </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">sync_state       | async</span></span>
<span class="line"><span style="color:#24292E;">reply_time       | </span><span style="color:#005CC5;">2020</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">06</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">17</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">07</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">13</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">226869</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">08</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#或者</span></span>
<span class="line"><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_replication_slots;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">或者</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\x</span></span>
<span class="line"><span style="color:#24292E;">Expanded display </span><span style="color:#D73A49;">is</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">#  </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_stat_replication;</span></span>
<span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;">[ RECORD 1 ]</span><span style="color:#6A737D;">----+------------------------------</span></span>
<span class="line"><span style="color:#24292E;">pid              | </span><span style="color:#005CC5;">10237</span></span>
<span class="line"><span style="color:#24292E;">usesysid         | </span><span style="color:#005CC5;">16384</span></span>
<span class="line"><span style="color:#24292E;">usename          | repl        </span><span style="color:#6A737D;">--复制用户</span></span>
<span class="line"><span style="color:#24292E;">application_name | walreceiver</span></span>
<span class="line"><span style="color:#24292E;">client_addr      | </span><span style="color:#005CC5;">192</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">168</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">122</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">218</span><span style="color:#24292E;">   </span><span style="color:#6A737D;">--从库IP</span></span>
<span class="line"><span style="color:#24292E;">client_hostname  | pg02</span></span>
<span class="line"><span style="color:#24292E;">client_port      | </span><span style="color:#005CC5;">40998</span></span>
<span class="line"><span style="color:#24292E;">backend_start    | </span><span style="color:#005CC5;">2020</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">06</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">15</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">17</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">43</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">468171</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">08</span></span>
<span class="line"><span style="color:#24292E;">backend_xmin     | </span><span style="color:#005CC5;">490</span></span>
<span class="line"><span style="color:#D73A49;">state</span><span style="color:#24292E;">            | streaming       </span><span style="color:#6A737D;">--流复制</span></span>
<span class="line"><span style="color:#24292E;">sent_lsn         | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">12000000</span></span>
<span class="line"><span style="color:#24292E;">write_lsn        | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">12000000</span></span>
<span class="line"><span style="color:#24292E;">flush_lsn        | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">12000000</span></span>
<span class="line"><span style="color:#24292E;">replay_lsn       | </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">12000000</span></span>
<span class="line"><span style="color:#24292E;">write_lag        | </span></span>
<span class="line"><span style="color:#24292E;">flush_lag        | </span></span>
<span class="line"><span style="color:#24292E;">replay_lag       | </span></span>
<span class="line"><span style="color:#24292E;">sync_priority    | </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">sync_state       | async     </span><span style="color:#6A737D;">--异步</span></span>
<span class="line"><span style="color:#24292E;">reply_time       | </span><span style="color:#005CC5;">2020</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">06</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">15</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">17</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">42</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">3673</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">08</span></span></code></pre></div><h1 id="_4-状态检测" tabindex="-1">4.状态检测 <a class="header-anchor" href="#_4-状态检测" aria-label="Permalink to &quot;4.状态检测&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">##状态检查</span></span>
<span class="line"><span style="color:#e1e4e8;">### 回到主库查看状态</span></span>
<span class="line"><span style="color:#e1e4e8;">$ psql -c &quot;select client_addr,usename,backend_start,application_name,sync_state,sync_priority FROM pg_stat_replication;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ psql -c &quot;select client_addr, sync_state from pg_stat_replication;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##备库只读, 所以任何操作, 都会告警失败:</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# drop database pgtest;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR: cannot execute DROP DATABASE in a read-only transaction</span></span>
<span class="line"><span style="color:#e1e4e8;">## 查看主备的状态</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#主</span></span>
<span class="line"><span style="color:#e1e4e8;">ps -ef |grep sender</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres 92996 51692 0 15:34 ?  00:00:00 postgres: walsender repl 192.168.3.61(53958) streaming 0/8000060</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres 101845 20470 0 15:45 pts/2 00:00:00 grep --color=auto sender</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#备</span></span>
<span class="line"><span style="color:#e1e4e8;">ps -ef |grep recover</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres 98311 98309 0 15:34 ?  00:00:00 postgres: startup recovering 000000010000000000000008</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres 108029 21054 0 15:46 pts/2 00:00:00 grep --color=auto recover</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#通过此命令判断主备</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_controldata -D /data/pgdata/data/ |grep state</span></span>
<span class="line"><span style="color:#e1e4e8;">in archive recovery ## 表示从库</span></span>
<span class="line"><span style="color:#e1e4e8;">in production  ## 表示主库</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">##状态检查</span></span>
<span class="line"><span style="color:#24292e;">### 回到主库查看状态</span></span>
<span class="line"><span style="color:#24292e;">$ psql -c &quot;select client_addr,usename,backend_start,application_name,sync_state,sync_priority FROM pg_stat_replication;&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ psql -c &quot;select client_addr, sync_state from pg_stat_replication;&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##备库只读, 所以任何操作, 都会告警失败:</span></span>
<span class="line"><span style="color:#24292e;">postgres=# drop database pgtest;</span></span>
<span class="line"><span style="color:#24292e;">ERROR: cannot execute DROP DATABASE in a read-only transaction</span></span>
<span class="line"><span style="color:#24292e;">## 查看主备的状态</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#主</span></span>
<span class="line"><span style="color:#24292e;">ps -ef |grep sender</span></span>
<span class="line"><span style="color:#24292e;">postgres 92996 51692 0 15:34 ?  00:00:00 postgres: walsender repl 192.168.3.61(53958) streaming 0/8000060</span></span>
<span class="line"><span style="color:#24292e;">postgres 101845 20470 0 15:45 pts/2 00:00:00 grep --color=auto sender</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#备</span></span>
<span class="line"><span style="color:#24292e;">ps -ef |grep recover</span></span>
<span class="line"><span style="color:#24292e;">postgres 98311 98309 0 15:34 ?  00:00:00 postgres: startup recovering 000000010000000000000008</span></span>
<span class="line"><span style="color:#24292e;">postgres 108029 21054 0 15:46 pts/2 00:00:00 grep --color=auto recover</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#通过此命令判断主备</span></span>
<span class="line"><span style="color:#24292e;">pg_controldata -D /data/pgdata/data/ |grep state</span></span>
<span class="line"><span style="color:#24292e;">in archive recovery ## 表示从库</span></span>
<span class="line"><span style="color:#24292e;">in production  ## 表示主库</span></span></code></pre></div><h1 id="_4-从属节点提升主要节点" tabindex="-1">4.<strong>从属节点提升主要节点</strong> <a class="header-anchor" href="#_4-从属节点提升主要节点" aria-label="Permalink to &quot;4.**从属节点提升主要节点**&quot;">​</a></h1><p>启用流复制模式后，主要数据库节点允许读写，从属数据库节点仅允许读。</p><p>如需将流复制模式中的从属节点提升为主要节点（比如在主要节点发生故障时），在从属数据库节点上执行：</p><p>sudo su -u postgres /usr/pgsql-12/bin/pg_ctl promote -D /data/pgsql12-data</p><p>三种方式切换主备，激活备库</p><ol><li><p>pg_ctl promote 命令方式;</p></li><li><p>创建配置的promote_trigger_file触发器文件方式;</p></li><li><p>pg_promote()函数方式</p></li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.pg_ctl stop -m fast --关闭原主库模拟故障</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2.postgres=# SELECT pg_promote(true,60);  --在备库使用函数进行主备切换，默认为true,等待60秒</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_promote</span></span>
<span class="line"><span style="color:#e1e4e8;">------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> t</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3.touch standby.signal  --在原来的主库新建标志文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">4.pg_ctl start  --启动原故障的主库作为新的备库</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.pg_ctl stop -m fast --关闭原主库模拟故障</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2.postgres=# SELECT pg_promote(true,60);  --在备库使用函数进行主备切换，默认为true,等待60秒</span></span>
<span class="line"><span style="color:#24292e;"> pg_promote</span></span>
<span class="line"><span style="color:#24292e;">------------</span></span>
<span class="line"><span style="color:#24292e;"> t</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3.touch standby.signal  --在原来的主库新建标志文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">4.pg_ctl start  --启动原故障的主库作为新的备库</span></span></code></pre></div><h2 id="pg-promote" tabindex="-1">pg_promote <a class="header-anchor" href="#pg-promote" aria-label="Permalink to &quot;pg_promote&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pg_promote(wait </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> true, wait_seconds </span><span style="color:#F97583;">integer</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DEFAULT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">60</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">\`\`\`两个参数：</span></span>
<span class="line"><span style="color:#9ECBFF;">wait: 表示是否等待备库的 promotion 完成或者 wait_seconds 秒之后返回成功，默认值为 true。</span></span>
<span class="line"><span style="color:#9ECBFF;">wait_seconds: 等待时间，单位秒，默认 60</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#原有主库操作</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">关闭主库，模拟主库故障：</span></span>
<span class="line"><span style="color:#9ECBFF;">pg12@test180-&gt; pg_ctl stop -m fast</span></span>
<span class="line"><span style="color:#9ECBFF;">waiting for server to shut down.... done</span></span>
<span class="line"><span style="color:#9ECBFF;">server stopped</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#激活备库：</span></span>
<span class="line"><span style="color:#9ECBFF;">bill=# select pg_promote(true,60);</span></span>
<span class="line"><span style="color:#9ECBFF;"> pg_promote </span></span>
<span class="line"><span style="color:#9ECBFF;">------------</span></span>
<span class="line"><span style="color:#9ECBFF;"> t</span></span>
<span class="line"><span style="color:#9ECBFF;">(1 row)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#原有主库操作，修改配置文件，添加如下内容</span></span>
<span class="line"><span style="color:#9ECBFF;">#1.postgresql.auto.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">[ptgres@k8s1 data]$ vim postgresql.auto.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">primary_conninfo = &#39;user=repl passfile=&#39;&#39;/root/.pgpass&#39;&#39; host=192.168.49.144 port=5532 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">#host写备库ip地址</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#2. 创建 touch standby.signal   (注意用户组)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#在原有备考下操作</span></span>
<span class="line"><span style="color:#9ECBFF;">#1. 修改pg_hba.conf文件</span></span>
<span class="line"><span style="color:#9ECBFF;">[ptgres@k8s1 data]$ cat pg_hba.conf</span></span>
<span class="line"><span style="color:#9ECBFF;">host    replication     all             192.168.49.143/32            trust</span></span>
<span class="line"><span style="color:#9ECBFF;">#添加原有主库ip地址</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">#2. 注释postgresql.auto.conf</span></span>
<span class="line"><span style="color:#9ECBFF;"># Do not edit this file manually!</span></span>
<span class="line"><span style="color:#9ECBFF;"># It will be overwritten by the ALTER SYSTEM command.</span></span>
<span class="line"><span style="color:#9ECBFF;">#primary_conninfo = &#39;user=repl passfile=&#39;&#39;/root/.pgpass&#39;&#39; host=192.168.49.143 port=5532 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">5.主从库重新重启</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pg_promote(wait </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> true, wait_seconds </span><span style="color:#D73A49;">integer</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DEFAULT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">60</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">\`\`\`两个参数：</span></span>
<span class="line"><span style="color:#032F62;">wait: 表示是否等待备库的 promotion 完成或者 wait_seconds 秒之后返回成功，默认值为 true。</span></span>
<span class="line"><span style="color:#032F62;">wait_seconds: 等待时间，单位秒，默认 60</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#原有主库操作</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">关闭主库，模拟主库故障：</span></span>
<span class="line"><span style="color:#032F62;">pg12@test180-&gt; pg_ctl stop -m fast</span></span>
<span class="line"><span style="color:#032F62;">waiting for server to shut down.... done</span></span>
<span class="line"><span style="color:#032F62;">server stopped</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#激活备库：</span></span>
<span class="line"><span style="color:#032F62;">bill=# select pg_promote(true,60);</span></span>
<span class="line"><span style="color:#032F62;"> pg_promote </span></span>
<span class="line"><span style="color:#032F62;">------------</span></span>
<span class="line"><span style="color:#032F62;"> t</span></span>
<span class="line"><span style="color:#032F62;">(1 row)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#原有主库操作，修改配置文件，添加如下内容</span></span>
<span class="line"><span style="color:#032F62;">#1.postgresql.auto.conf</span></span>
<span class="line"><span style="color:#032F62;">[ptgres@k8s1 data]$ vim postgresql.auto.conf</span></span>
<span class="line"><span style="color:#032F62;">primary_conninfo = &#39;user=repl passfile=&#39;&#39;/root/.pgpass&#39;&#39; host=192.168.49.144 port=5532 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any&#39;</span></span>
<span class="line"><span style="color:#032F62;">#host写备库ip地址</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#2. 创建 touch standby.signal   (注意用户组)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#在原有备考下操作</span></span>
<span class="line"><span style="color:#032F62;">#1. 修改pg_hba.conf文件</span></span>
<span class="line"><span style="color:#032F62;">[ptgres@k8s1 data]$ cat pg_hba.conf</span></span>
<span class="line"><span style="color:#032F62;">host    replication     all             192.168.49.143/32            trust</span></span>
<span class="line"><span style="color:#032F62;">#添加原有主库ip地址</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">#2. 注释postgresql.auto.conf</span></span>
<span class="line"><span style="color:#032F62;"># Do not edit this file manually!</span></span>
<span class="line"><span style="color:#032F62;"># It will be overwritten by the ALTER SYSTEM command.</span></span>
<span class="line"><span style="color:#032F62;">#primary_conninfo = &#39;user=repl passfile=&#39;&#39;/root/.pgpass&#39;&#39; host=192.168.49.143 port=5532 sslmode=prefer sslcompression=0 gssencmode=prefer krbsrvname=postgres target_session_attrs=any&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">5.主从库重新重启</span></span></code></pre></div><h1 id="_4-监控主从" tabindex="-1">4,监控主从 <a class="header-anchor" href="#_4-监控主从" aria-label="Permalink to &quot;4,监控主从&quot;">​</a></h1><p>如何监控replication logical 复制是否中断的问题</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres@postgres</span><span style="color:#F97583;">=&gt;select</span><span style="color:#E1E4E8;">  pid, client_addr, </span><span style="color:#F97583;">state</span><span style="color:#E1E4E8;">, sync_state,  pg_wal_lsn_diff(sent_lsn, write_lsn) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> write_lag,  pg_wal_lsn_diff(sent_lsn, flush_lsn) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> flush_lag, pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> replay_lag </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> pg_stat_replication;</span></span>
<span class="line"><span style="color:#E1E4E8;"> pid | client_addr | </span><span style="color:#F97583;">state</span><span style="color:#E1E4E8;"> | sync_state | write_lag | flush_lag | replay_lag </span></span>
<span class="line"><span style="color:#6A737D;">-----+-------------+-------+------------+-----------+-----------+------------</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres@postgres</span><span style="color:#D73A49;">=&gt;select</span><span style="color:#24292E;">  pid, client_addr, </span><span style="color:#D73A49;">state</span><span style="color:#24292E;">, sync_state,  pg_wal_lsn_diff(sent_lsn, write_lsn) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> write_lag,  pg_wal_lsn_diff(sent_lsn, flush_lsn) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> flush_lag, pg_wal_lsn_diff(sent_lsn, replay_lsn) </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> replay_lag </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> pg_stat_replication;</span></span>
<span class="line"><span style="color:#24292E;"> pid | client_addr | </span><span style="color:#D73A49;">state</span><span style="color:#24292E;"> | sync_state | write_lag | flush_lag | replay_lag </span></span>
<span class="line"><span style="color:#6A737D;">-----+-------------+-------+------------+-----------+-----------+------------</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span></code></pre></div><p><img src="`+t+`" alt=""></p><p>如果你当前有一个replication 的情况下, 查询主库,如果复制正常,则会查出你与subscription之间的情况</p><p>如果数据不一致,造成复制停止的情况,则再次查询就不会有数据显示</p><h1 id="faq" tabindex="-1">FAQ <a class="header-anchor" href="#faq" aria-label="Permalink to &quot;FAQ&quot;">​</a></h1><h2 id="pg流复制场景下" tabindex="-1">PG流复制场景下 <a class="header-anchor" href="#pg流复制场景下" aria-label="Permalink to &quot;PG流复制场景下&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">默认配置下， 如果在PG从库执行长时间的查询，会出现查询的报错。提示</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR: canceling statement due to conflict with recovery</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">DETAIL: User query might have needed to see row versions that must be removed.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">默认配置下， 如果在PG从库执行长时间的查询，会出现查询的报错。提示</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ERROR: canceling statement due to conflict with recovery</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">DETAIL: User query might have needed to see row versions that must be removed.</span></span></code></pre></div><p>解决方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">实际上 PostgreSQL提供了配置参数来减少或避免这种情况出现的概率,主要包括以下两个参数:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">maxstandby_ streaming_delay:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">此参数默认为30秒,当备库执行SQL时,有可能与正在应用的WAL发生冲突,此查询如果30秒没有执行完成则被中止,注意30秒不是备库上单个查询允许的最大执行时间,是指当备库上应用WAL时允许的最大WAL延迟应用时间,因此备库上查询的执行时间有可能不到这个参数设置的值就被中止了,此参数可以设置成-1,表示当从库上的WAL应用进程与从库上执行的查询冲突时,WAL应用进程一直等待直到从库查询执行完成</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">hotstandby_feedback:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">默认情况下从库执行查询时并不会通知主库,设置此参数为on后从库执行查询时会通知主库,当从库执行查询过程中,主库不会清理从库需要的数据行老版本,因此,从库上的查询不会被中止,然而,这种方法也会带来一定的弊端,主库上的表可能出现膨胀,主库表的膨胀程度与表上的写事务和从库执行时间有关,此参数默认为off</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">然后reload下PG的配置使其生效</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">实际上 PostgreSQL提供了配置参数来减少或避免这种情况出现的概率,主要包括以下两个参数:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">maxstandby_ streaming_delay:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">此参数默认为30秒,当备库执行SQL时,有可能与正在应用的WAL发生冲突,此查询如果30秒没有执行完成则被中止,注意30秒不是备库上单个查询允许的最大执行时间,是指当备库上应用WAL时允许的最大WAL延迟应用时间,因此备库上查询的执行时间有可能不到这个参数设置的值就被中止了,此参数可以设置成-1,表示当从库上的WAL应用进程与从库上执行的查询冲突时,WAL应用进程一直等待直到从库查询执行完成</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">hotstandby_feedback:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">默认情况下从库执行查询时并不会通知主库,设置此参数为on后从库执行查询时会通知主库,当从库执行查询过程中,主库不会清理从库需要的数据行老版本,因此,从库上的查询不会被中止,然而,这种方法也会带来一定的弊端,主库上的表可能出现膨胀,主库表的膨胀程度与表上的写事务和从库执行时间有关,此参数默认为off</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">然后reload下PG的配置使其生效</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">在主库pgMaster 上创建测试表：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\c postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create table test_per2 ( id int , flag int);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">insert into test_per2 (id) select * from generate_series(1,1000000) ;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">编写pgbench压测脚本 update_per2.sql 内容如下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\\set v_id random(1,1000000)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">update test_per2 set flag=&#39;1&#39; where id=:v_id;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">开始压测：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -c 8 -T 120 -d postgres -Upostgres -n N -M prepared -f update_per2.sql</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">然后，到pgSlave备库去执行下查询操作：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_sleep(12),* from test_per2 limit 10 ;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR:  canceling statement due to conflict with recovery</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">DETAIL:  User query might have needed to see row versions that must be removed.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Time: 729.120 ms</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">在主库pgMaster 上创建测试表：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\c postgres</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create table test_per2 ( id int , flag int);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">insert into test_per2 (id) select * from generate_series(1,1000000) ;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">编写pgbench压测脚本 update_per2.sql 内容如下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\\set v_id random(1,1000000)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">update test_per2 set flag=&#39;1&#39; where id=:v_id;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">开始压测：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -c 8 -T 120 -d postgres -Upostgres -n N -M prepared -f update_per2.sql</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">然后，到pgSlave备库去执行下查询操作：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_sleep(12),* from test_per2 limit 10 ;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ERROR:  canceling statement due to conflict with recovery</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">DETAIL:  User query might have needed to see row versions that must be removed.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Time: 729.120 ms</span></span></code></pre></div><h2 id="延迟复制" tabindex="-1">延迟复制 <a class="header-anchor" href="#延迟复制" aria-label="Permalink to &quot;延迟复制&quot;">​</a></h2><p>参数： recovery_min_apply_delay</p><p>某些情况下，一个后备服务器会尽快恢复来自于主服务器的 WAL 记录。有一份数据的延时拷贝是有用的，它能提供机会纠正数据丢失错误。这个参数允许你将恢复延迟一段固定的时间，如果没有指定单位则以毫秒为单位。例如，如果你设置这个参数为5min，对于一个事务提交，只有当后备机上的系统时钟超过主服务器报告的提交时间至少 5分钟时，后备机才会重放该事务</p><p>有可能服务器之间的复制延迟会超过这个参数的值，在这种情况下则不会增加延迟。注意延迟是根据主服务器上写 WAL 的时间戳以及后备机上的当前时间来计算。由于网络延迟或者级联复制配置导致的传输延迟可能会显著地减少实际等待时间。如果主服务器和后备机上的系统时钟不同步，这会导致恢复比预期的更早应用记录。但这不是一个主要问题，因为这个参数有用的设置比服务器之间的典型事件偏差要大得多</p><p>只有在事务提交的 WAL 记录上才会发生延迟。其他记录还是会被尽可能快地重放，这不会成为问题，因为 MVCC 可见性规则确保了在对应的提交记录被应用之前它们的效果不会被看到。</p><p>一旦恢复中的数据库已经达到一致状态，延迟就会产生，直到后备机被提升或者触发。在那之后，后备机将会结束恢复并且不再等待。</p><p>这个参数的目的是和流复制部署一起使用，但是，如果指定了该参数，所有的情况下都会遵守它。使用这个特性也会让hot_standby_feedback被延迟，这可能导致主服务器的膨胀，两者一起使用时要小心</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">延迟备库的搭建很简单， 只要在 recovery.conf 里面增加个配置项即可</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_min_apply_delay = 1min  # 这里我测试就设置1分钟的延迟</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 默认的支持时间单位为 ms 、s、min、h、d 即 毫秒 秒 分钟 小时 天</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：修改后，需要重启 standby节点才能生效。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">延迟备库的搭建很简单， 只要在 recovery.conf 里面增加个配置项即可</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">recovery_min_apply_delay = 1min  # 这里我测试就设置1分钟的延迟</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 默认的支持时间单位为 ms 、s、min、h、d 即 毫秒 秒 分钟 小时 天</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：修改后，需要重启 standby节点才能生效。</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">然后，在主库创建表并插入一条测试数据：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# create table test_delay(id int4,create_time timestamp(0) without time zone);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# insert into test_delay (id,create_time) values (1,now());</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">然后，在主库创建表并插入一条测试数据：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# create table test_delay(id int4,create_time timestamp(0) without time zone);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# insert into test_delay (id,create_time) values (1,now());</span></span></code></pre></div><p>然后，等一分钟左右到延迟standby节点去查看下数据是否同步过去</p><p>recovery_min_apply_delay 参数对同步复制的影响</p><p>同步复制情况下， 通常要 synchronous_commit 配置为 on 或 remote_apply</p><p>on 表示 standby将wal接收到 --&gt; 写入wal日志文件 --&gt; 向客户端返回成功。</p><p>standby表示 standby将wal接收到 --&gt; 写入wal日志文件 --&gt; 并应用到standby --&gt; 才会向客户端返回成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">下面对 synchronous_commit 不同参数下，并且设置了延迟复制的测试：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">场景1： synchronous_commit=on  并且 recovery_min_apply_delay = 1min</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_commit是设置在主库的postgresql.conf中的(支持会话级别设置,也可以修改配置文件reload后全局生效)。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_min_apply_delay 是设置在standby的recovery.conf中的。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这种场景下， 我们在主库上插入一条数据，主库会立即返回执行成功or失败的结果。 然后我们到延迟复制的standby去查询，发现还是会需要1min后才能查到这条数据。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">也就是说， 延迟备库场景下， synchronous_commit 配置为on时 和 异步流复制是一致的。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">场景2： synchronous_commit=remote_apply  并且 recovery_min_apply_delay = 1min</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_commit是设置在主库的postgresql.conf中的(支持会话级别设置,也可以修改配置文件reload后全局生效)。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_min_apply_delay 是设置在standby的recovery.conf中的。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这种场景下， 我们在主库上插入一条数据，主库会hang住等待1min(等待从库完成apply操作)后，然后才能返回执行成功or失败的结果。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">然后我们到延迟复制的standby去查询，发现立即就能查到这条数据。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">也就是说， 延迟备库场景下， synchronous_commit 配置为 remote_apply时，会造成主库上面的事务的提交的阻塞。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">生产环境用到延迟从库的场景下，一定要避免设置 synchronous_commit=remote_apply (当然从性能角度考虑也很少会设置为remote_apply的)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">下面对 synchronous_commit 不同参数下，并且设置了延迟复制的测试：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">场景1： synchronous_commit=on  并且 recovery_min_apply_delay = 1min</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">synchronous_commit是设置在主库的postgresql.conf中的(支持会话级别设置,也可以修改配置文件reload后全局生效)。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">recovery_min_apply_delay 是设置在standby的recovery.conf中的。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这种场景下， 我们在主库上插入一条数据，主库会立即返回执行成功or失败的结果。 然后我们到延迟复制的standby去查询，发现还是会需要1min后才能查到这条数据。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">也就是说， 延迟备库场景下， synchronous_commit 配置为on时 和 异步流复制是一致的。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">场景2： synchronous_commit=remote_apply  并且 recovery_min_apply_delay = 1min</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">synchronous_commit是设置在主库的postgresql.conf中的(支持会话级别设置,也可以修改配置文件reload后全局生效)。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">recovery_min_apply_delay 是设置在standby的recovery.conf中的。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这种场景下， 我们在主库上插入一条数据，主库会hang住等待1min(等待从库完成apply操作)后，然后才能返回执行成功or失败的结果。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">然后我们到延迟复制的standby去查询，发现立即就能查到这条数据。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">也就是说， 延迟备库场景下， synchronous_commit 配置为 remote_apply时，会造成主库上面的事务的提交的阻塞。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">生产环境用到延迟从库的场景下，一定要避免设置 synchronous_commit=remote_apply (当然从性能角度考虑也很少会设置为remote_apply的)</span></span></code></pre></div><p><a href="https://www.modb.pro/db/28548" target="_blank" rel="noreferrer">https://www.modb.pro/db/28548</a></p><p>ab</p><p><a href="https://www.modb.pro/db/12365" target="_blank" rel="noreferrer">https://www.modb.pro/db/12365</a></p><p><a href="https://postgres.fun/20130702100240.html" target="_blank" rel="noreferrer">https://postgres.fun/20130702100240.html</a></p><p>出现问题：</p><p><a href="https://blog.51cto.com/lishiyan/2460518?source=dra" target="_blank" rel="noreferrer">https://blog.51cto.com/lishiyan/2460518?source=dra</a></p>`,130),y=[i];function d(g,E,_,h,u,m){return n(),a("div",null,y)}const v=s(r,[["render",d]]);export{F as __pageData,v as default};
