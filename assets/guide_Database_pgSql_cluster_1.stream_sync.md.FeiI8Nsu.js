import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/cluster/1.stream_sync.md","filePath":"guide/Database/pgSql/cluster/1.stream_sync.md","lastUpdated":1703063387000}'),l={name:"guide/Database/pgSql/cluster/1.stream_sync.md"},p=n(`<h2 id="_1-操作系统" tabindex="-1">1.操作系统 <a class="header-anchor" href="#_1-操作系统" aria-label="Permalink to &quot;1.操作系统&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># sysctl -p </span></span>
<span class="line"><span style="color:#e1e4e8;">fs.file-max = 76724200 </span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.sem = 10000  10240000 10000 1024 </span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.shmmni = 4096 </span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.shmall = 253702 </span></span>
<span class="line"><span style="color:#e1e4e8;">kernel.shmmax = 1039163392 </span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 9000 65500</span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_default = 262144 </span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_default = 262144 </span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.rmem_max = 4194304 </span></span>
<span class="line"><span style="color:#e1e4e8;">net.core.wmem_max = 1048576 </span></span>
<span class="line"><span style="color:#e1e4e8;">fs.aio-max-nr = 40960000 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_ratio = 20 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_background_ratio = 3 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_writeback_centisecs = 100 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.dirty_expire_centisecs = 500 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.swappiness = 10 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.min_free_kbytes = 52428 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.swappiness = 0 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.overcommit_memory = 2 </span></span>
<span class="line"><span style="color:#e1e4e8;">vm.overcommit_ratio = 75 </span></span>
<span class="line"><span style="color:#e1e4e8;">net.ipv4.ip_local_port_range = 10000 65535</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># sysctl -p </span></span>
<span class="line"><span style="color:#24292e;">fs.file-max = 76724200 </span></span>
<span class="line"><span style="color:#24292e;">kernel.sem = 10000  10240000 10000 1024 </span></span>
<span class="line"><span style="color:#24292e;">kernel.shmmni = 4096 </span></span>
<span class="line"><span style="color:#24292e;">kernel.shmall = 253702 </span></span>
<span class="line"><span style="color:#24292e;">kernel.shmmax = 1039163392 </span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 9000 65500</span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_default = 262144 </span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_default = 262144 </span></span>
<span class="line"><span style="color:#24292e;">net.core.rmem_max = 4194304 </span></span>
<span class="line"><span style="color:#24292e;">net.core.wmem_max = 1048576 </span></span>
<span class="line"><span style="color:#24292e;">fs.aio-max-nr = 40960000 </span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_ratio = 20 </span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_background_ratio = 3 </span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_writeback_centisecs = 100 </span></span>
<span class="line"><span style="color:#24292e;">vm.dirty_expire_centisecs = 500 </span></span>
<span class="line"><span style="color:#24292e;">vm.swappiness = 10 </span></span>
<span class="line"><span style="color:#24292e;">vm.min_free_kbytes = 52428 </span></span>
<span class="line"><span style="color:#24292e;">vm.swappiness = 0 </span></span>
<span class="line"><span style="color:#24292e;">vm.overcommit_memory = 2 </span></span>
<span class="line"><span style="color:#24292e;">vm.overcommit_ratio = 75 </span></span>
<span class="line"><span style="color:#24292e;">net.ipv4.ip_local_port_range = 10000 65535</span></span></code></pre></div><h3 id="用户-limits" tabindex="-1">用户 limits <a class="header-anchor" href="#用户-limits" aria-label="Permalink to &quot;用户 limits&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/etc/security/limits.conf 文件 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     soft   nofile     1048576 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     hard   nofile     1048576 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     soft   nproc      131072 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     hard   nproc      131072 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     soft   stack      10240 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     hard   stack      32768 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     soft   core       6291456 </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres     hard   core       6291456</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/etc/security/limits.conf 文件 </span></span>
<span class="line"><span style="color:#24292e;">postgres     soft   nofile     1048576 </span></span>
<span class="line"><span style="color:#24292e;">postgres     hard   nofile     1048576 </span></span>
<span class="line"><span style="color:#24292e;">postgres     soft   nproc      131072 </span></span>
<span class="line"><span style="color:#24292e;">postgres     hard   nproc      131072 </span></span>
<span class="line"><span style="color:#24292e;">postgres     soft   stack      10240 </span></span>
<span class="line"><span style="color:#24292e;">postgres     hard   stack      32768 </span></span>
<span class="line"><span style="color:#24292e;">postgres     soft   core       6291456 </span></span>
<span class="line"><span style="color:#24292e;">postgres     hard   core       6291456</span></span></code></pre></div><h2 id="_2-配置" tabindex="-1">2.配置 <a class="header-anchor" href="#_2-配置" aria-label="Permalink to &quot;2.配置&quot;">​</a></h2><h3 id="创建流复制用户" tabindex="-1">创建流复制用户 <a class="header-anchor" href="#创建流复制用户" aria-label="Permalink to &quot;创建流复制用户&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ psql -Upostgres  postgres=# create user repuser replication login connection limit 5 encrypted password&#39;123456&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ psql -Upostgres  postgres=# create user repuser replication login connection limit 5 encrypted password&#39;123456&#39;;</span></span></code></pre></div><h3 id="配置-pg-hba-conf" tabindex="-1">配置 pg_hba.conf <a class="header-anchor" href="#配置-pg-hba-conf" aria-label="Permalink to &quot;配置 pg_hba.conf&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">host    replication     repuser             ::1/128                 md5 </span></span>
<span class="line"><span style="color:#e1e4e8;">host    replication     repuser             127.0.0.1/32            md5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">host    replication     repuser             ::1/128                 md5 </span></span>
<span class="line"><span style="color:#24292e;">host    replication     repuser             127.0.0.1/32            md5</span></span></code></pre></div><h3 id="主库配置-postgresql-conf" tabindex="-1">主库配置 postgresql.conf <a class="header-anchor" href="#主库配置-postgresql-conf" aria-label="Permalink to &quot;主库配置 postgresql.conf&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">listen_addresses=&#39;*&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">port=5555 </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level=replica </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_mode=on </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_command=&#39;/bin/date&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders=10 </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments=512 </span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby=on </span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_commit=on </span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_standby_names=&#39;node2&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">listen_addresses=&#39;*&#39; </span></span>
<span class="line"><span style="color:#24292e;">port=5555 </span></span>
<span class="line"><span style="color:#24292e;">wal_level=replica </span></span>
<span class="line"><span style="color:#24292e;">archive_mode=on </span></span>
<span class="line"><span style="color:#24292e;">archive_command=&#39;/bin/date&#39; </span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders=10 </span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments=512 </span></span>
<span class="line"><span style="color:#24292e;">hot_standby=on </span></span>
<span class="line"><span style="color:#24292e;">synchronous_commit=on </span></span>
<span class="line"><span style="color:#24292e;">synchronous_standby_names=&#39;node2&#39;</span></span></code></pre></div><h3 id="配置-pgpass" tabindex="-1">配置.pgpass <a class="header-anchor" href="#配置-pgpass" aria-label="Permalink to &quot;配置.pgpass&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">127.0.0.1:5555:replication:repuser:123456</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:5556:replication:repuser:123456</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">127.0.0.1:5555:replication:repuser:123456</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:5556:replication:repuser:123456</span></span></code></pre></div><h3 id="基础备份备库数据目录" tabindex="-1">基础备份备库数据目录 <a class="header-anchor" href="#基础备份备库数据目录" aria-label="Permalink to &quot;基础备份备库数据目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pg_basebackup -D /opt/data5556 -Fp -Xs -v -P -h127.0.0.1 -p5555 -Urepuser</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pg_basebackup -D /opt/data5556 -Fp -Xs -v -P -h127.0.0.1 -p5555 -Urepuser</span></span></code></pre></div><h3 id="备库参数配置" tabindex="-1">备库参数配置 <a class="header-anchor" href="#备库参数配置" aria-label="Permalink to &quot;备库参数配置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">主配置参数 </span></span>
<span class="line"><span style="color:#e1e4e8;">listen_addresses=&#39;*&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">port=5556 </span></span>
<span class="line"><span style="color:#e1e4e8;">max_connections=100 </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level=replica </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_mode=on </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_command=&#39;/bin/date&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders=10</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments=512 </span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby=on</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">主配置参数 </span></span>
<span class="line"><span style="color:#24292e;">listen_addresses=&#39;*&#39; </span></span>
<span class="line"><span style="color:#24292e;">port=5556 </span></span>
<span class="line"><span style="color:#24292e;">max_connections=100 </span></span>
<span class="line"><span style="color:#24292e;">wal_level=replica </span></span>
<span class="line"><span style="color:#24292e;">archive_mode=on </span></span>
<span class="line"><span style="color:#24292e;">archive_command=&#39;/bin/date&#39; </span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders=10</span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments=512 </span></span>
<span class="line"><span style="color:#24292e;">hot_standby=on</span></span></code></pre></div><h3 id="从库配置恢复参数" tabindex="-1">从库配置恢复参数 <a class="header-anchor" href="#从库配置恢复参数" aria-label="Permalink to &quot;从库配置恢复参数&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">恢复配置参数 </span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_timeline=&#39;latest&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">standby_mode=on </span></span>
<span class="line"><span style="color:#e1e4e8;">primary_conninfo=&#39;host=127.0.0.1 port=5432 user=repuser&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">恢复配置参数 </span></span>
<span class="line"><span style="color:#24292e;">recovery_target_timeline=&#39;latest&#39; </span></span>
<span class="line"><span style="color:#24292e;">standby_mode=on </span></span>
<span class="line"><span style="color:#24292e;">primary_conninfo=&#39;host=127.0.0.1 port=5432 user=repuser&#39;</span></span></code></pre></div><h3 id="启动从库" tabindex="-1">启动从库 <a class="header-anchor" href="#启动从库" aria-label="Permalink to &quot;启动从库&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /opt/pgsql/data_s1/postgresql.conf --修改端口为 5433  </span></span>
<span class="line"><span style="color:#e1e4e8;">/opt/pgsql/bin/pg_ctl -D /opt/pgsql/data_s1/ start &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /opt/pgsql/data_s1/postgresql.conf --修改端口为 5433  </span></span>
<span class="line"><span style="color:#24292e;">/opt/pgsql/bin/pg_ctl -D /opt/pgsql/data_s1/ start &amp;</span></span></code></pre></div><h3 id="查看同步方式" tabindex="-1">查看同步方式 <a class="header-anchor" href="#查看同步方式" aria-label="Permalink to &quot;查看同步方式&quot;">​</a></h3><p>主库查看 pg_stat_replication 视图的 sync_state 字段</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select usename,application_name,client_addr,sync_state from pg_stat_replication;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select usename,application_name,client_addr,sync_state from pg_stat_replication;</span></span></code></pre></div><h3 id="查看主备延迟" tabindex="-1">查看主备延迟 <a class="header-anchor" href="#查看主备延迟" aria-label="Permalink to &quot;查看主备延迟&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT pid,usename,client_addr,state,write_lag,flush_lag,replay_lag FROM pg_stat_replication;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT pid,usename,client_addr,state, pg_wal_lsn_diff(pg_current_wal_lsn(),write_lsn) write_delay , pg_wal_lsn_diff(pg_current_wal_lsn(),flush_lsn) flush_delay, pg_wal_lsn_diff(pg_current_wal_lsn(),replay_lsn) replay_dely FROM pg_stat_replication;</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT pid,usename,client_addr,state,write_lag,flush_lag,replay_lag FROM pg_stat_replication;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT pid,usename,client_addr,state, pg_wal_lsn_diff(pg_current_wal_lsn(),write_lsn) write_delay , pg_wal_lsn_diff(pg_current_wal_lsn(),flush_lsn) flush_delay, pg_wal_lsn_diff(pg_current_wal_lsn(),replay_lsn) replay_dely FROM pg_stat_replication;</span></span></code></pre></div>`,26),o=[p];function t(c,r,i,d,_,y){return a(),e("div",null,o)}const m=s(l,[["render",t]]);export{g as __pageData,m as default};
