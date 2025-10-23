import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"老式pg_basebackup 搭建流复制环境","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/cluster/10-ab1.md","filePath":"guide/Database/pgSql/cluster/10-ab1.md","lastUpdated":1711706974000}'),l={name:"guide/Database/pgSql/cluster/10-ab1.md"},p=e(`<h1 id="老式pg-basebackup-搭建流复制环境" tabindex="-1">老式pg_basebackup 搭建流复制环境 <a class="header-anchor" href="#老式pg-basebackup-搭建流复制环境" aria-label="Permalink to &quot;老式pg_basebackup 搭建流复制环境&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--异步流复制 ，事务提交时不需要等待备库接收并写入wal日志便返回成功。</span></span>
<span class="line"><span style="color:#e1e4e8;">--postgresql.conf  添加以下参数</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level=replica</span></span>
<span class="line"><span style="color:#e1e4e8;">archive_mode=on</span></span>
<span class="line"><span style="color:#e1e4e8;">archive_command=&#39;/bin/date&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders=10         ##max number of walsender processes</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments=512      ##in logfile segments,16MB each; 0 disables</span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby=on</span></span>
<span class="line"><span style="color:#e1e4e8;">--pg_hab.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">#replication privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">host    replication     repuser     192.168.8.81/32     md5</span></span>
<span class="line"><span style="color:#e1e4e8;">host    replication     repuser     192.168.8.25/32     md5</span></span>
<span class="line"><span style="color:#e1e4e8;">--create user</span></span>
<span class="line"><span style="color:#e1e4e8;">create user repuser replication login connection limit 5 encrypted password &#39;re12a345&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">--start backup</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_start_backup(&#39;fancs_bk1&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">tar czvf pg_root.tar.gz data --exclude=data/pg_wal</span></span>
<span class="line"><span style="color:#e1e4e8;">scp pg_root.tar.gz postgres@192.168.8.25:/pgdata</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--node2</span></span>
<span class="line"><span style="color:#e1e4e8;">tar xvf pg_root.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir pg_wal</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_stop_backup();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--node2</span></span>
<span class="line"><span style="color:#e1e4e8;">cp /pgdata/pgsql/share/postgresql/recovery.conf.sample  $PGDATA/recovery.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_timeline=&#39;latest&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">standby_mode=on</span></span>
<span class="line"><span style="color:#e1e4e8;">primary_conninfo=&#39;host=192.168.8.81 port=5432 user=repuser&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--编写密码文件，免密码登录</span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@mystandby ~]$ touch .pgpass</span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@mystandby ~]$ chmod 0600 .pgpass </span></span>
<span class="line"><span style="color:#e1e4e8;">[postgres@mystandby ~]$ cat .pgpass </span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.8.81:5432:replication:repuser:re12a345</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.8.25:5432:replication:repuser:re12a345</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--查看进程</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres   4902   4838  0 15:14 ?        00:00:00 postgres: wal sender process repuser 192.168.8.25(30137) streaming 0/B000140</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres   5670   5668  0 15:14 ?        00:00:00 postgres: wal receiver process   streaming 0/B000140</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--测试</span></span>
<span class="line"><span style="color:#e1e4e8;">create table t7 (id int4,name text);</span></span>
<span class="line"><span style="color:#e1e4e8;">insert into t7 values(1,&#39;firsouler&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from t7;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--查看流复制同步方式</span></span>
<span class="line"><span style="color:#e1e4e8;">select usename,application_name,client_addr,sync_state from pg_stat_replication;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--同步流复制，需要等待备库接收wal日志，增加了事务响应时间</span></span>
<span class="line"><span style="color:#e1e4e8;">--postgresql.conf    单实例环境</span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_commit   #on 表示提交事务时需要等待本地wal写入wal日志后才向客户端返回成功，安全，性能损耗</span></span>
<span class="line"><span style="color:#e1e4e8;">                     #off 可能数据丢失，提高性能</span></span>
<span class="line"><span style="color:#e1e4e8;">                     #local 与on类似</span></span>
<span class="line"><span style="color:#e1e4e8;">                     --流复制环境</span></span>
<span class="line"><span style="color:#e1e4e8;">                     #remote_write  等待备库写入系统缓存中</span></span>
<span class="line"><span style="color:#e1e4e8;">                     # on 备库写入wal日志</span></span>
<span class="line"><span style="color:#e1e4e8;">                     #remote_apply 备库完成重做</span></span>
<span class="line"><span style="color:#e1e4e8;">                      </span></span>
<span class="line"><span style="color:#e1e4e8;">--recovery.conf  node2  备库别名</span></span>
<span class="line"><span style="color:#e1e4e8;">primary_conninfo=&#39;host=192.168.8.25 port=5432 user=repuser application_name=node2&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--node1 设置以下参数</span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_commit=on</span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_standby_names=&#39;node2&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--同步流复制，备库宕机，主库一直等待， 不建议同步流复制</span></span>
<span class="line"><span style="color:#e1e4e8;">--性能测试，并发 跟cpu数量有关系，性能方面</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--测试脚本</span></span>
<span class="line"><span style="color:#e1e4e8;">create table test_per1(id int4,name text,create_time timestamp() without time zone default clock_timestamp());</span></span>
<span class="line"><span style="color:#e1e4e8;">insert into test_per1(id,name) select n,n||&#39;_per1&#39; from generate_series(1,10000000) n;</span></span>
<span class="line"><span style="color:#e1e4e8;">alter table test_per1 add primary key(id);</span></span>
<span class="line"><span style="color:#e1e4e8;">--select 脚本</span></span>
<span class="line"><span style="color:#e1e4e8;">\\set v_id random(1,1000000)</span></span>
<span class="line"><span style="color:#e1e4e8;">select name from test_per1 where id=:v_id;</span></span>
<span class="line"><span style="color:#e1e4e8;">--写测试</span></span>
<span class="line"><span style="color:#e1e4e8;">\\set v_id random(1,1000000)</span></span>
<span class="line"><span style="color:#e1e4e8;">update test_per2 set flag=&#39;1&#39; where id=:v_id;</span></span>
<span class="line"><span style="color:#e1e4e8;">--读测试，单实例最佳，异步流复制次之，写测试，单实例与异步差异不明显，同步流复制慢</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -c 2 -T 120 -d postgres -U postgres -n N -M prepared -f update_per2.sql &gt; update_2.out 2&gt;&amp;1 &amp;</span></span>
<span class="line"><span style="color:#e1e4e8;">--流复制监控</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from pg_stat_replication;</span></span>
<span class="line"><span style="color:#e1e4e8;">--主备延迟 write_lag 主库wal落盘，等待备库接收wal日志，(操作系统缓存中)并返回确认信息；flush_lag（已写入wal日志，但没应用）；replay_lag(已应用）</span></span>
<span class="line"><span style="color:#e1e4e8;">select pid,usename,client_addr,state,write_lag,flush_lag,replay_lag from pg_stat_replication;</span></span>
<span class="line"><span style="color:#e1e4e8;">--replay_lag&gt;flush_lag&gt;write_lag</span></span>
<span class="line"><span style="color:#e1e4e8;">--10之前的版本</span></span>
<span class="line"><span style="color:#e1e4e8;">select extract(second from now()-pg_last_xact_replay_timestamp());</span></span>
<span class="line"><span style="color:#e1e4e8;">--通过流复制wal日志应用延迟衡量 返回字节数</span></span>
<span class="line"><span style="color:#e1e4e8;">select pid,usename,client_addr,state,</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_wal_lsn_diff(pg_current_wal_lsn(),write_lsn) write_delay,</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_wal_lsn_diff(pg_current_wal_lsn(),flush_lsn) flush_delay,</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_wal_lsn_diff(pg_current_wal_lsn(),replay_lsn) replay_delay from pg_stat_replication;</span></span>
<span class="line"><span style="color:#e1e4e8;">--接收进程相关试图</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from pg_stat_wal_receiver;</span></span>
<span class="line"><span style="color:#e1e4e8;">--备库，恢复进程是否处于恢复模式</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_is_in_recovery();</span></span>
<span class="line"><span style="color:#e1e4e8;">--备库最近接收的wal位置</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_last_wal_receive_lsn();</span></span>
<span class="line"><span style="color:#e1e4e8;">--备库最近应用的wal日志</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_last_wal_replay_lsn();</span></span>
<span class="line"><span style="color:#e1e4e8;">--备库最近事务的应用时间</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_last_xact_replay_timestamp();</span></span>
<span class="line"><span style="color:#e1e4e8;">--主库wal当前写入位置</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_current_wal_lsn();</span></span>
<span class="line"><span style="color:#e1e4e8;">--计算两个wal日志位置的偏移量</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_wal_lsn_diff(&#39;&#39;,&#39;&#39;);</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">--异步流复制 ，事务提交时不需要等待备库接收并写入wal日志便返回成功。</span></span>
<span class="line"><span style="color:#24292e;">--postgresql.conf  添加以下参数</span></span>
<span class="line"><span style="color:#24292e;">wal_level=replica</span></span>
<span class="line"><span style="color:#24292e;">archive_mode=on</span></span>
<span class="line"><span style="color:#24292e;">archive_command=&#39;/bin/date&#39;</span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders=10         ##max number of walsender processes</span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments=512      ##in logfile segments,16MB each; 0 disables</span></span>
<span class="line"><span style="color:#24292e;">hot_standby=on</span></span>
<span class="line"><span style="color:#24292e;">--pg_hab.conf</span></span>
<span class="line"><span style="color:#24292e;">#replication privilege</span></span>
<span class="line"><span style="color:#24292e;">host    replication     repuser     192.168.8.81/32     md5</span></span>
<span class="line"><span style="color:#24292e;">host    replication     repuser     192.168.8.25/32     md5</span></span>
<span class="line"><span style="color:#24292e;">--create user</span></span>
<span class="line"><span style="color:#24292e;">create user repuser replication login connection limit 5 encrypted password &#39;re12a345&#39;;</span></span>
<span class="line"><span style="color:#24292e;">--start backup</span></span>
<span class="line"><span style="color:#24292e;">select pg_start_backup(&#39;fancs_bk1&#39;);</span></span>
<span class="line"><span style="color:#24292e;">tar czvf pg_root.tar.gz data --exclude=data/pg_wal</span></span>
<span class="line"><span style="color:#24292e;">scp pg_root.tar.gz postgres@192.168.8.25:/pgdata</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--node2</span></span>
<span class="line"><span style="color:#24292e;">tar xvf pg_root.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">mkdir pg_wal</span></span>
<span class="line"><span style="color:#24292e;">select pg_stop_backup();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--node2</span></span>
<span class="line"><span style="color:#24292e;">cp /pgdata/pgsql/share/postgresql/recovery.conf.sample  $PGDATA/recovery.conf</span></span>
<span class="line"><span style="color:#24292e;">recovery_target_timeline=&#39;latest&#39;</span></span>
<span class="line"><span style="color:#24292e;">standby_mode=on</span></span>
<span class="line"><span style="color:#24292e;">primary_conninfo=&#39;host=192.168.8.81 port=5432 user=repuser&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--编写密码文件，免密码登录</span></span>
<span class="line"><span style="color:#24292e;">[postgres@mystandby ~]$ touch .pgpass</span></span>
<span class="line"><span style="color:#24292e;">[postgres@mystandby ~]$ chmod 0600 .pgpass </span></span>
<span class="line"><span style="color:#24292e;">[postgres@mystandby ~]$ cat .pgpass </span></span>
<span class="line"><span style="color:#24292e;">192.168.8.81:5432:replication:repuser:re12a345</span></span>
<span class="line"><span style="color:#24292e;">192.168.8.25:5432:replication:repuser:re12a345</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--查看进程</span></span>
<span class="line"><span style="color:#24292e;">postgres   4902   4838  0 15:14 ?        00:00:00 postgres: wal sender process repuser 192.168.8.25(30137) streaming 0/B000140</span></span>
<span class="line"><span style="color:#24292e;">postgres   5670   5668  0 15:14 ?        00:00:00 postgres: wal receiver process   streaming 0/B000140</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--测试</span></span>
<span class="line"><span style="color:#24292e;">create table t7 (id int4,name text);</span></span>
<span class="line"><span style="color:#24292e;">insert into t7 values(1,&#39;firsouler&#39;);</span></span>
<span class="line"><span style="color:#24292e;">select * from t7;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--查看流复制同步方式</span></span>
<span class="line"><span style="color:#24292e;">select usename,application_name,client_addr,sync_state from pg_stat_replication;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--同步流复制，需要等待备库接收wal日志，增加了事务响应时间</span></span>
<span class="line"><span style="color:#24292e;">--postgresql.conf    单实例环境</span></span>
<span class="line"><span style="color:#24292e;">synchronous_commit   #on 表示提交事务时需要等待本地wal写入wal日志后才向客户端返回成功，安全，性能损耗</span></span>
<span class="line"><span style="color:#24292e;">                     #off 可能数据丢失，提高性能</span></span>
<span class="line"><span style="color:#24292e;">                     #local 与on类似</span></span>
<span class="line"><span style="color:#24292e;">                     --流复制环境</span></span>
<span class="line"><span style="color:#24292e;">                     #remote_write  等待备库写入系统缓存中</span></span>
<span class="line"><span style="color:#24292e;">                     # on 备库写入wal日志</span></span>
<span class="line"><span style="color:#24292e;">                     #remote_apply 备库完成重做</span></span>
<span class="line"><span style="color:#24292e;">                      </span></span>
<span class="line"><span style="color:#24292e;">--recovery.conf  node2  备库别名</span></span>
<span class="line"><span style="color:#24292e;">primary_conninfo=&#39;host=192.168.8.25 port=5432 user=repuser application_name=node2&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--node1 设置以下参数</span></span>
<span class="line"><span style="color:#24292e;">synchronous_commit=on</span></span>
<span class="line"><span style="color:#24292e;">synchronous_standby_names=&#39;node2&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--同步流复制，备库宕机，主库一直等待， 不建议同步流复制</span></span>
<span class="line"><span style="color:#24292e;">--性能测试，并发 跟cpu数量有关系，性能方面</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--测试脚本</span></span>
<span class="line"><span style="color:#24292e;">create table test_per1(id int4,name text,create_time timestamp() without time zone default clock_timestamp());</span></span>
<span class="line"><span style="color:#24292e;">insert into test_per1(id,name) select n,n||&#39;_per1&#39; from generate_series(1,10000000) n;</span></span>
<span class="line"><span style="color:#24292e;">alter table test_per1 add primary key(id);</span></span>
<span class="line"><span style="color:#24292e;">--select 脚本</span></span>
<span class="line"><span style="color:#24292e;">\\set v_id random(1,1000000)</span></span>
<span class="line"><span style="color:#24292e;">select name from test_per1 where id=:v_id;</span></span>
<span class="line"><span style="color:#24292e;">--写测试</span></span>
<span class="line"><span style="color:#24292e;">\\set v_id random(1,1000000)</span></span>
<span class="line"><span style="color:#24292e;">update test_per2 set flag=&#39;1&#39; where id=:v_id;</span></span>
<span class="line"><span style="color:#24292e;">--读测试，单实例最佳，异步流复制次之，写测试，单实例与异步差异不明显，同步流复制慢</span></span>
<span class="line"><span style="color:#24292e;">pgbench -c 2 -T 120 -d postgres -U postgres -n N -M prepared -f update_per2.sql &gt; update_2.out 2&gt;&amp;1 &amp;</span></span>
<span class="line"><span style="color:#24292e;">--流复制监控</span></span>
<span class="line"><span style="color:#24292e;">select * from pg_stat_replication;</span></span>
<span class="line"><span style="color:#24292e;">--主备延迟 write_lag 主库wal落盘，等待备库接收wal日志，(操作系统缓存中)并返回确认信息；flush_lag（已写入wal日志，但没应用）；replay_lag(已应用）</span></span>
<span class="line"><span style="color:#24292e;">select pid,usename,client_addr,state,write_lag,flush_lag,replay_lag from pg_stat_replication;</span></span>
<span class="line"><span style="color:#24292e;">--replay_lag&gt;flush_lag&gt;write_lag</span></span>
<span class="line"><span style="color:#24292e;">--10之前的版本</span></span>
<span class="line"><span style="color:#24292e;">select extract(second from now()-pg_last_xact_replay_timestamp());</span></span>
<span class="line"><span style="color:#24292e;">--通过流复制wal日志应用延迟衡量 返回字节数</span></span>
<span class="line"><span style="color:#24292e;">select pid,usename,client_addr,state,</span></span>
<span class="line"><span style="color:#24292e;">pg_wal_lsn_diff(pg_current_wal_lsn(),write_lsn) write_delay,</span></span>
<span class="line"><span style="color:#24292e;">pg_wal_lsn_diff(pg_current_wal_lsn(),flush_lsn) flush_delay,</span></span>
<span class="line"><span style="color:#24292e;">pg_wal_lsn_diff(pg_current_wal_lsn(),replay_lsn) replay_delay from pg_stat_replication;</span></span>
<span class="line"><span style="color:#24292e;">--接收进程相关试图</span></span>
<span class="line"><span style="color:#24292e;">select * from pg_stat_wal_receiver;</span></span>
<span class="line"><span style="color:#24292e;">--备库，恢复进程是否处于恢复模式</span></span>
<span class="line"><span style="color:#24292e;">select pg_is_in_recovery();</span></span>
<span class="line"><span style="color:#24292e;">--备库最近接收的wal位置</span></span>
<span class="line"><span style="color:#24292e;">select pg_last_wal_receive_lsn();</span></span>
<span class="line"><span style="color:#24292e;">--备库最近应用的wal日志</span></span>
<span class="line"><span style="color:#24292e;">select pg_last_wal_replay_lsn();</span></span>
<span class="line"><span style="color:#24292e;">--备库最近事务的应用时间</span></span>
<span class="line"><span style="color:#24292e;">select pg_last_xact_replay_timestamp();</span></span>
<span class="line"><span style="color:#24292e;">--主库wal当前写入位置</span></span>
<span class="line"><span style="color:#24292e;">select pg_current_wal_lsn();</span></span>
<span class="line"><span style="color:#24292e;">--计算两个wal日志位置的偏移量</span></span>
<span class="line"><span style="color:#24292e;">select pg_wal_lsn_diff(&#39;&#39;,&#39;&#39;);</span></span></code></pre></div>`,2),o=[p];function c(t,r,i,y,_,d){return n(),a("div",null,o)}const u=s(l,[["render",c]]);export{m as __pageData,u as default};
