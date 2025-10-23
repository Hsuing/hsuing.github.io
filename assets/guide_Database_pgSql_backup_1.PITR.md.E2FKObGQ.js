import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const E=JSON.parse('{"title":"案例","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/backup/1.PITR.md","filePath":"guide/Database/pgSql/backup/1.PITR.md","lastUpdated":1703063387000}'),p={name:"guide/Database/pgSql/backup/1.PITR.md"},l=e(`<p>PostgreSQL 提供了不同的方法来备份和恢复数据库，可以是某一时刻数据库快照的完整备份或增量备份，可以使用 SQL 转储或文件系统级别的备份，在增量备份的基础上还可以实现基于时间点恢复。 有三种不同的基本方法来备份</p><p>和恢复 PostgreSQL 数据：</p><p>⚫ 使用 pg_dump 和 pg_dumpall 进行转储，从 SQL 转储文件中恢复</p><p>⚫ 文件系统级别的备份</p><p>⚫ 增量备份和基于时间点恢复，PITR全称是Point-In-Time-Recover （时间点恢复)</p><h2 id="_1-增量备份" tabindex="-1">1.增量备份 <a class="header-anchor" href="#_1-增量备份" aria-label="Permalink to &quot;1.增量备份&quot;">​</a></h2><p>PostgreSQL 在做写入操作时，对数据文件做的任何修改信息，首先会写入 WAL 日 志（预写日志），然后才会对数据文件做物理修改。 当数据库服务器掉电或意外宕机， PostgreSQL 在启动时会首先读取 WAL 日志，对数据文件进行恢复。 因此，从理论上讲， 如果我们有一个数据库的基础备份（也称为全备），再配合 WAL 日志，是可以将数据库恢复到任意时间点的</p><h3 id="创建归档目录" tabindex="-1">创建归档目录 <a class="header-anchor" href="#创建归档目录" aria-label="Permalink to &quot;创建归档目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">创建归档目录： </span></span>
<span class="line"><span style="color:#e1e4e8;"># mkdir -p /pgdata/12/archive_wals </span></span>
<span class="line"><span style="color:#e1e4e8;"># chown -R postgres.dba /pgdata/12/archive_wals</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">创建归档目录： </span></span>
<span class="line"><span style="color:#24292e;"># mkdir -p /pgdata/12/archive_wals </span></span>
<span class="line"><span style="color:#24292e;"># chown -R postgres.dba /pgdata/12/archive_wals</span></span></code></pre></div><h3 id="修改-wal-level-参数" tabindex="-1">修改 wal_level 参数 <a class="header-anchor" href="#修改-wal-level-参数" aria-label="Permalink to &quot;修改 wal_level 参数&quot;">​</a></h3><p>wal_level 参数可选的值有 minimal、 replica 和 logical ，从 minimal 到 replica 再到 logical 级别， WAL 的级别依次增高，在 WAL 中包含的信息也越多。由于 minimal 这一级别的 WAL 不包含从基本的备份和 WAL 日志中重建数据的足够信息，在 minimal 模式下无法开启 archive_mode，所以开启 WAL 归档 wal_level 至少设置为 replica，如下所示 ：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mydb=# ALTER SYSTEM SET wal_level = &#39;replica&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mydb=# ALTER SYSTEM SET wal_level = &#39;replica&#39;;</span></span></code></pre></div><h3 id="修改-archive-mode-参数" tabindex="-1">修改 archive_mode 参数 <a class="header-anchor" href="#修改-archive-mode-参数" aria-label="Permalink to &quot;修改 archive_mode 参数&quot;">​</a></h3><p>archive_mode 参数可选的值有 on、off 和 always，默认值为 off，开启归档需要修改为 on，如下所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mydb=# ALTER SYSTEM SET archive_mode = &#39;on&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">修改后需要重启服务</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mydb=# ALTER SYSTEM SET archive_mode = &#39;on&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">修改后需要重启服务</span></span></code></pre></div><h3 id="修改-archive-command-参数" tabindex="-1">修改 archive_command 参数 <a class="header-anchor" href="#修改-archive-command-参数" aria-label="Permalink to &quot;修改 archive_command 参数&quot;">​</a></h3><p>archive_command 参数的默认值是个空字符串，它的值可以是一条 shell 命令或者一个复杂的 shell 脚本。 在 archive_command 的 shell 命令或脚本中可以用“%p”表示将要归档 的 WAL 文件的包含完整路径信息的文件名，用“%f”代表不包含路径信息的 WAL 文件的文件名</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">archive_command = &#39;cp %p /pgdata/12/archive_wals/%f&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">archive_command = &#39;cp %p /pgdata/12/archive_wals/%f&#39;</span></span></code></pre></div><p>修改 wal_level 和 archive_mode 参数都需要重新启动数据库才可以生效，修改 archive_command 不需要重启，只需要 reload 即可</p><h3 id="创建基础备份" tabindex="-1">创建基础备份 <a class="header-anchor" href="#创建基础备份" aria-label="Permalink to &quot;创建基础备份&quot;">​</a></h3><p>在较低的 PostgreSQL 版本中， 使用 pg_start_backup 和 pg_stop_backup 这些低级 API 创建基础备份，从 PostgreSQL 9.1 版开始有了 pg_basebackup 实用程序 ，使得创建基础备份更便捷，pg_base backup 用普通文件或创建 tar 包的方式进行基础备份，它在内部也是使用 pg_start_backup 和 pg_stop_ backup 低级命令。 如果希望用更灵活的方式创建基础备份，例如希望通过 rsync、 scp 等命令创建基础备份，依然可以使用低级 API 的方式</p><ul><li>pg_basebackup 命令创建基础备份</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#--先提前创建好流复制用户 </span></span>
<span class="line"><span style="color:#e1e4e8;">$ create user repuser replication login connection limit 5 encrypted password&#39;123456&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ pg_basebackup -D /pgdata/12/backups/ -Fp -Xs -v -P -h127.0.0.1 -p5432 -Urepuser</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#--先提前创建好流复制用户 </span></span>
<span class="line"><span style="color:#24292e;">$ create user repuser replication login connection limit 5 encrypted password&#39;123456&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ pg_basebackup -D /pgdata/12/backups/ -Fp -Xs -v -P -h127.0.0.1 -p5432 -Urepuser</span></span></code></pre></div><h2 id="_2-恢复" tabindex="-1">2.恢复 <a class="header-anchor" href="#_2-恢复" aria-label="Permalink to &quot;2.恢复&quot;">​</a></h2><p>官方文档<a href="https://www.postgresql.org/docs/12/runtime-config-wal.html#RUNTIME-CONFIG-WAL-ARCHIVE-RECOVERY" target="_blank" rel="noreferrer">https://www.postgresql.org/docs/12/runtime-config-wal.html#RUNTIME-CONFIG-WAL-ARCHIVE-RECOVERY</a></p><h3 id="恢复到最近时间点" tabindex="-1">恢复到最近时间点 <a class="header-anchor" href="#恢复到最近时间点" aria-label="Permalink to &quot;恢复到最近时间点&quot;">​</a></h3><p>在postgresql.conf中填写，并在pgdata/data 目录下touch recovery.signal</p><p><code>recovery.signal 成功之后，这个文件会自动消失</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_timeline=&#39;latest&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#24292e;">recovery_target_timeline=&#39;latest&#39;</span></span></code></pre></div><h3 id="恢复到指定时间点" tabindex="-1">恢复到指定时间点 <a class="header-anchor" href="#恢复到指定时间点" aria-label="Permalink to &quot;恢复到指定时间点&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_time=&#39;2021-11-10 15:44:35&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39;</span></span>
<span class="line"><span style="color:#24292e;">recovery_target_time=&#39;2021-11-10 15:44:35&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#时间可以通过以下方式查看</span></span>
<span class="line"><span style="color:#e1e4e8;">[ptgres@pg_beta data]$ cat backup_label.old </span></span>
<span class="line"><span style="color:#e1e4e8;">START WAL LOCATION: 0/3000028 (file 000000010000000000000003)</span></span>
<span class="line"><span style="color:#e1e4e8;">CHECKPOINT LOCATION: 0/3000060</span></span>
<span class="line"><span style="color:#e1e4e8;">BACKUP METHOD: streamed</span></span>
<span class="line"><span style="color:#e1e4e8;">BACKUP FROM: master</span></span>
<span class="line"><span style="color:#e1e4e8;">START TIME: 2021-11-10 15:44:35 CST</span></span>
<span class="line"><span style="color:#e1e4e8;">LABEL: pg_basebackup base backup</span></span>
<span class="line"><span style="color:#e1e4e8;">START TIMELINE: 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#时间可以通过以下方式查看</span></span>
<span class="line"><span style="color:#24292e;">[ptgres@pg_beta data]$ cat backup_label.old </span></span>
<span class="line"><span style="color:#24292e;">START WAL LOCATION: 0/3000028 (file 000000010000000000000003)</span></span>
<span class="line"><span style="color:#24292e;">CHECKPOINT LOCATION: 0/3000060</span></span>
<span class="line"><span style="color:#24292e;">BACKUP METHOD: streamed</span></span>
<span class="line"><span style="color:#24292e;">BACKUP FROM: master</span></span>
<span class="line"><span style="color:#24292e;">START TIME: 2021-11-10 15:44:35 CST</span></span>
<span class="line"><span style="color:#24292e;">LABEL: pg_basebackup base backup</span></span>
<span class="line"><span style="color:#24292e;">START TIMELINE: 1</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.712 CST,,,32678,,618b7a75.7fa6,1,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;数据库系统中断；上一次的启动时间是在2021-11-10 15:44:35 CST&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.738 CST,,,32678,,618b7a75.7fa6,2,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;开始执行到2021-11-10 15:43:43+08的基于时间点恢复&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.753 CST,,,32678,,618b7a75.7fa6,3,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;从归档中恢复日志文件 &quot;&quot;000000010000000000000003&quot;&quot;&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.793 CST,,,32678,,618b7a75.7fa6,4,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;redo 在 0/3000028 开始&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.797 CST,,,32678,,618b7a75.7fa6,5,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;在0/3000100上已到达一致性恢复状态&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.799 CST,,,32676,,618b7a75.7fa4,2,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;数据库系统准备接受只读请求的连接&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.819 CST,,,32678,,618b7a75.7fa6,6,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;从归档中恢复日志文件 &quot;&quot;000000010000000000000004&quot;&quot;&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.845 CST,,,32678,,618b7a75.7fa6,7,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;恢复停止在事物 488 提交之前, 时间 2021-11-10 15:45:24.356228+08&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-11-10 15:53:25.845 CST,,,32678,,618b7a75.7fa6,8,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;恢复操作已暂停&quot;,,&quot;执行 pg_wal_replay_resume() 以继续.&quot;,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#必须执行这个才能结束,关闭数据库pause状态</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_wal_replay_resume() ;</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_wal_replay_resume </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select * from test;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id </span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">  1</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.712 CST,,,32678,,618b7a75.7fa6,1,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;数据库系统中断；上一次的启动时间是在2021-11-10 15:44:35 CST&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.738 CST,,,32678,,618b7a75.7fa6,2,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;开始执行到2021-11-10 15:43:43+08的基于时间点恢复&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.753 CST,,,32678,,618b7a75.7fa6,3,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;从归档中恢复日志文件 &quot;&quot;000000010000000000000003&quot;&quot;&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.793 CST,,,32678,,618b7a75.7fa6,4,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;redo 在 0/3000028 开始&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.797 CST,,,32678,,618b7a75.7fa6,5,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;在0/3000100上已到达一致性恢复状态&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.799 CST,,,32676,,618b7a75.7fa4,2,,2021-11-10 15:53:25 CST,,0,日志,00000,&quot;数据库系统准备接受只读请求的连接&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.819 CST,,,32678,,618b7a75.7fa6,6,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;从归档中恢复日志文件 &quot;&quot;000000010000000000000004&quot;&quot;&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.845 CST,,,32678,,618b7a75.7fa6,7,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;恢复停止在事物 488 提交之前, 时间 2021-11-10 15:45:24.356228+08&quot;,,,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-11-10 15:53:25.845 CST,,,32678,,618b7a75.7fa6,8,,2021-11-10 15:53:25 CST,1/0,0,日志,00000,&quot;恢复操作已暂停&quot;,,&quot;执行 pg_wal_replay_resume() 以继续.&quot;,,,,,,,&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#必须执行这个才能结束,关闭数据库pause状态</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_wal_replay_resume() ;</span></span>
<span class="line"><span style="color:#24292e;"> pg_wal_replay_resume </span></span>
<span class="line"><span style="color:#24292e;">----------------------</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select * from test;</span></span>
<span class="line"><span style="color:#24292e;"> id </span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">  1</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><ul><li>清理归档点旧的日志</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312201650918.jpg" alt=""></p><h3 id="恢复到指定还原点" tabindex="-1">恢复到指定还原点 <a class="header-anchor" href="#恢复到指定还原点" aria-label="Permalink to &quot;恢复到指定还原点&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# select pg_create_restore_point(&#39;my-restore-point1&#39;);  </span></span>
<span class="line"><span style="color:#e1e4e8;">pg_create_restore_point  </span></span>
<span class="line"><span style="color:#e1e4e8;">-------------------------  </span></span>
<span class="line"><span style="color:#e1e4e8;">0/8000290 (1 row)  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_name=&#39;my-restore-point1&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# select pg_create_restore_point(&#39;my-restore-point1&#39;);  </span></span>
<span class="line"><span style="color:#24292e;">pg_create_restore_point  </span></span>
<span class="line"><span style="color:#24292e;">-------------------------  </span></span>
<span class="line"><span style="color:#24292e;">0/8000290 (1 row)  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#24292e;">recovery_target_name=&#39;my-restore-point1&#39;</span></span></code></pre></div><h3 id="恢复到指定事务" tabindex="-1">恢复到指定事务 <a class="header-anchor" href="#恢复到指定事务" aria-label="Permalink to &quot;恢复到指定事务&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--查询当前事务 xid</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select txid_current();</span></span>
<span class="line"><span style="color:#e1e4e8;"> txid_current </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------</span></span>
<span class="line"><span style="color:#e1e4e8;">       182889</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_xid=182889</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--查询当前事务 xid</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select txid_current();</span></span>
<span class="line"><span style="color:#24292e;"> txid_current </span></span>
<span class="line"><span style="color:#24292e;">--------------</span></span>
<span class="line"><span style="color:#24292e;">       182889</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#24292e;">recovery_target_xid=182889</span></span></code></pre></div><h3 id="恢复到指定时间线" tabindex="-1">恢复到指定时间线 <a class="header-anchor" href="#恢复到指定时间线" aria-label="Permalink to &quot;恢复到指定时间线&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_timeline=2 </span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_time=&#39;2019-12-25 15:15:00&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">restore_command = &#39;cp /pgdata/12/archive_wals/%f %p&#39; </span></span>
<span class="line"><span style="color:#24292e;">recovery_target_timeline=2 </span></span>
<span class="line"><span style="color:#24292e;">recovery_target_time=&#39;2019-12-25 15:15:00&#39;</span></span></code></pre></div><h2 id="_3-sql-转储" tabindex="-1">3.SQL 转储 <a class="header-anchor" href="#_3-sql-转储" aria-label="Permalink to &quot;3.SQL 转储&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">按 schema 备份 </span></span>
<span class="line"><span style="color:#e1e4e8;">pg_dump -h 192.168.20.19 -p 5432 -Fc -v --schema=ebas -f ebas.backup -U ebas student </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">按 schema 恢复 </span></span>
<span class="line"><span style="color:#e1e4e8;">pg_restore -p 5432 -d student -U ebas --schema ebas -v ebas.backup</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">使用管道备份恢复 </span></span>
<span class="line"><span style="color:#e1e4e8;">pg_dump -h 192.168.20.19 -p 5432 -Fc -v --schema=ebas -U ebas student  |  pg_restore -h 192.168.20.138 -p 5432 -d student -U ebas --schema ebas -v  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">只备份结构 pg_dump -Fp -v --schema=afc --schema-only --no-owner --no-tablespaces --no-privileges -T c_card_trade* -f 19_edb_schema_afc.sql -U afc edb  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">备份全库 pg_dumpall -h 192.168.20.19 -p 5432 -c -f /tcps/pg-19-dumpall.sql -U postgres psql </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">直接执行恢复 psql -p 5432 -U postgres -f /tcps/pg-19-dumpall.sql</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">按 schema 备份 </span></span>
<span class="line"><span style="color:#24292e;">pg_dump -h 192.168.20.19 -p 5432 -Fc -v --schema=ebas -f ebas.backup -U ebas student </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">按 schema 恢复 </span></span>
<span class="line"><span style="color:#24292e;">pg_restore -p 5432 -d student -U ebas --schema ebas -v ebas.backup</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">使用管道备份恢复 </span></span>
<span class="line"><span style="color:#24292e;">pg_dump -h 192.168.20.19 -p 5432 -Fc -v --schema=ebas -U ebas student  |  pg_restore -h 192.168.20.138 -p 5432 -d student -U ebas --schema ebas -v  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">只备份结构 pg_dump -Fp -v --schema=afc --schema-only --no-owner --no-tablespaces --no-privileges -T c_card_trade* -f 19_edb_schema_afc.sql -U afc edb  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">备份全库 pg_dumpall -h 192.168.20.19 -p 5432 -c -f /tcps/pg-19-dumpall.sql -U postgres psql </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">直接执行恢复 psql -p 5432 -U postgres -f /tcps/pg-19-dumpall.sql</span></span></code></pre></div><h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><h2 id="_1-指定时间点" tabindex="-1">1.指定时间点 <a class="header-anchor" href="#_1-指定时间点" aria-label="Permalink to &quot;1.指定时间点&quot;">​</a></h2><h3 id="准备数据" tabindex="-1">准备数据 <a class="header-anchor" href="#准备数据" aria-label="Permalink to &quot;准备数据&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">              </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2021</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">11</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">04</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">01</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">886137</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">08</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> test (id </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">insert into</span><span style="color:#E1E4E8;"> test (id) </span><span style="color:#F97583;">values</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">INSERT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">              </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2021</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">11</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">05</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">553561</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">08</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> pg_switch_wal();</span></span>
<span class="line"><span style="color:#E1E4E8;"> pg_switch_wal </span></span>
<span class="line"><span style="color:#6A737D;">---------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">3000000</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">now</span><span style="color:#E1E4E8;">              </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2021</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">11</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">08</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">40</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">089325</span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">08</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">              </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">2021</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">11</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">04</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">01</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">886137</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">08</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> test (id </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">insert into</span><span style="color:#24292E;"> test (id) </span><span style="color:#D73A49;">values</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">INSERT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">              </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">2021</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">11</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">05</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">553561</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">08</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> pg_switch_wal();</span></span>
<span class="line"><span style="color:#24292E;"> pg_switch_wal </span></span>
<span class="line"><span style="color:#6A737D;">---------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">3000000</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">now</span><span style="color:#24292E;">              </span></span>
<span class="line"><span style="color:#6A737D;">-------------------------------</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">2021</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">11</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">08</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">40</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">089325</span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">08</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> 行记录)</span></span></code></pre></div><h3 id="备份数据" tabindex="-1">备份数据 <a class="header-anchor" href="#备份数据" aria-label="Permalink to &quot;备份数据&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#为方便演示不使用密码用户，生产环境改用密码</span></span>
<span class="line"><span style="color:#e1e4e8;">#backup 目录不可存在</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#plain形式</span></span>
<span class="line"><span style="color:#e1e4e8;">[ptgres@pg_beta pgdata]$ pg_basebackup -h 127.0.0.1 -p 5532 -U postgres -D /data/pgdata/backup_\`date +&quot;%Y%m%d&quot;\` -Fp -Xs -P -R</span></span>
<span class="line"><span style="color:#e1e4e8;">警告:  跳过特殊文件 &quot;./.s.PGSQL.5532&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">警告:  跳过特殊文件 &quot;./.s.PGSQL.5532&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">25304/25304 kB (100%), 1/1 表空间</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#压缩的形式</span></span>
<span class="line"><span style="color:#e1e4e8;">pg_basebackup -h 127.0.0.1 -p 5532 -U postgres -D /data/pgdata/backup -Ft -Xs -P -R</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#为方便演示不使用密码用户，生产环境改用密码</span></span>
<span class="line"><span style="color:#24292e;">#backup 目录不可存在</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#plain形式</span></span>
<span class="line"><span style="color:#24292e;">[ptgres@pg_beta pgdata]$ pg_basebackup -h 127.0.0.1 -p 5532 -U postgres -D /data/pgdata/backup_\`date +&quot;%Y%m%d&quot;\` -Fp -Xs -P -R</span></span>
<span class="line"><span style="color:#24292e;">警告:  跳过特殊文件 &quot;./.s.PGSQL.5532&quot;</span></span>
<span class="line"><span style="color:#24292e;">警告:  跳过特殊文件 &quot;./.s.PGSQL.5532&quot;</span></span>
<span class="line"><span style="color:#24292e;">25304/25304 kB (100%), 1/1 表空间</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#压缩的形式</span></span>
<span class="line"><span style="color:#24292e;">pg_basebackup -h 127.0.0.1 -p 5532 -U postgres -D /data/pgdata/backup -Ft -Xs -P -R</span></span></code></pre></div><h3 id="删除表" tabindex="-1">删除表 <a class="header-anchor" href="#删除表" aria-label="Permalink to &quot;删除表&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># \\dt</span></span>
<span class="line"><span style="color:#E1E4E8;">              关联列表</span></span>
<span class="line"><span style="color:#E1E4E8;"> 架构模式 | 名称 |  类型  |  拥有者  </span></span>
<span class="line"><span style="color:#6A737D;">----------+------+--------+----------</span></span>
<span class="line"><span style="color:#E1E4E8;"> public   | test | 数据表 | postgres</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> test;</span></span>
<span class="line"><span style="color:#E1E4E8;"> id </span></span>
<span class="line"><span style="color:#6A737D;">----</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">postgres</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"># </span><span style="color:#F97583;">drop</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">table</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">DROP</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#停止数据库</span></span>
<span class="line"><span style="color:#E1E4E8;">备份故障data并将基础备份的back替换为新data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># \\dt</span></span>
<span class="line"><span style="color:#24292E;">              关联列表</span></span>
<span class="line"><span style="color:#24292E;"> 架构模式 | 名称 |  类型  |  拥有者  </span></span>
<span class="line"><span style="color:#6A737D;">----------+------+--------+----------</span></span>
<span class="line"><span style="color:#24292E;"> public   | test | 数据表 | postgres</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> test;</span></span>
<span class="line"><span style="color:#24292E;"> id </span></span>
<span class="line"><span style="color:#6A737D;">----</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> 行记录)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">postgres</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"># </span><span style="color:#D73A49;">drop</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">table</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">DROP</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#停止数据库</span></span>
<span class="line"><span style="color:#24292E;">备份故障data并将基础备份的back替换为新data</span></span></code></pre></div><p>PITR 过程与普通的数据恢复的过程基本相同,不同点主要在于</p><p>1 普通的恢复读取的日志是从pg_wal中读取,而PITR的过程会从archive_command中读取archive 中的数据</p><p>2 普通的恢复的checkpoint的位置获取是从pg_control 文件中,而PITR是从backup_label中获得的文件PITR的过程</p><h2 id="_2-指定还原点" tabindex="-1">2.指定还原点 <a class="header-anchor" href="#_2-指定还原点" aria-label="Permalink to &quot;2.指定还原点&quot;">​</a></h2><h3 id="数据插入" tabindex="-1">数据插入 <a class="header-anchor" href="#数据插入" aria-label="Permalink to &quot;数据插入&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">create user repuser replication login connection limit 5 encrypted password&#39;123456&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">create table t2(id int,info text);</span></span>
<span class="line"><span style="color:#e1e4e8;">insert into t2 values(1,&#39;data1 &#39;||now());</span></span>
<span class="line"><span style="color:#e1e4e8;">insert into t2 values(2,&#39;data2 &#39;||now());</span></span>
<span class="line"><span style="color:#e1e4e8;">insert into t2 values(3,&#39;data3 &#39;||now());</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">create user repuser replication login connection limit 5 encrypted password&#39;123456&#39;;</span></span>
<span class="line"><span style="color:#24292e;">create table t2(id int,info text);</span></span>
<span class="line"><span style="color:#24292e;">insert into t2 values(1,&#39;data1 &#39;||now());</span></span>
<span class="line"><span style="color:#24292e;">insert into t2 values(2,&#39;data2 &#39;||now());</span></span>
<span class="line"><span style="color:#24292e;">insert into t2 values(3,&#39;data3 &#39;||now());</span></span></code></pre></div><h3 id="基础备份" tabindex="-1">基础备份 <a class="header-anchor" href="#基础备份" aria-label="Permalink to &quot;基础备份&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pg_basebackup -h 127.0.0.1 -p 5532 -U repuser -D /data/pgdata/backup_\`date +&quot;%Y%m%d&quot;\` -Fp -Xs -P -R</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pg_basebackup -h 127.0.0.1 -p 5532 -U repuser -D /data/pgdata/backup_\`date +&quot;%Y%m%d&quot;\` -Fp -Xs -P -R</span></span></code></pre></div><h3 id="创建还原点" tabindex="-1">创建还原点 <a class="header-anchor" href="#创建还原点" aria-label="Permalink to &quot;创建还原点&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ptgres@pg_beta pgdata]$ psql -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.2)</span></span>
<span class="line"><span style="color:#e1e4e8;">输入 &quot;help&quot; 来获取帮助信息.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select pg_create_restore_point(&#39;my_res_point1&#39;);</span></span>
<span class="line"><span style="color:#e1e4e8;"> pg_create_restore_point </span></span>
<span class="line"><span style="color:#e1e4e8;">-------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0/B000090</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">###数据变更</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# insert into t2 values(4,&#39;data4 &#39;||now());</span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT 0 1</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# update t2 set info=null where id=2;</span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE 1</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# select * from t2 order by id;</span></span>
<span class="line"><span style="color:#e1e4e8;"> id |                info                 </span></span>
<span class="line"><span style="color:#e1e4e8;">----+-------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">  1 | data1 2021-11-10 16:41:28.096795+08</span></span>
<span class="line"><span style="color:#e1e4e8;">  2 | </span></span>
<span class="line"><span style="color:#e1e4e8;">  3 | data3 2021-11-10 16:42:23.18769+08</span></span>
<span class="line"><span style="color:#e1e4e8;">  4 | data4 2021-11-10 16:43:57.315688+08</span></span>
<span class="line"><span style="color:#e1e4e8;">(4 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ptgres@pg_beta pgdata]$ psql -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#24292e;">psql (12.2)</span></span>
<span class="line"><span style="color:#24292e;">输入 &quot;help&quot; 来获取帮助信息.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# select pg_create_restore_point(&#39;my_res_point1&#39;);</span></span>
<span class="line"><span style="color:#24292e;"> pg_create_restore_point </span></span>
<span class="line"><span style="color:#24292e;">-------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 0/B000090</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">###数据变更</span></span>
<span class="line"><span style="color:#24292e;">postgres=# insert into t2 values(4,&#39;data4 &#39;||now());</span></span>
<span class="line"><span style="color:#24292e;">INSERT 0 1</span></span>
<span class="line"><span style="color:#24292e;">postgres=# update t2 set info=null where id=2;</span></span>
<span class="line"><span style="color:#24292e;">UPDATE 1</span></span>
<span class="line"><span style="color:#24292e;">postgres=# select * from t2 order by id;</span></span>
<span class="line"><span style="color:#24292e;"> id |                info                 </span></span>
<span class="line"><span style="color:#24292e;">----+-------------------------------------</span></span>
<span class="line"><span style="color:#24292e;">  1 | data1 2021-11-10 16:41:28.096795+08</span></span>
<span class="line"><span style="color:#24292e;">  2 | </span></span>
<span class="line"><span style="color:#24292e;">  3 | data3 2021-11-10 16:42:23.18769+08</span></span>
<span class="line"><span style="color:#24292e;">  4 | data4 2021-11-10 16:43:57.315688+08</span></span>
<span class="line"><span style="color:#24292e;">(4 行记录)</span></span></code></pre></div><h3 id="恢复到还原点-my-res-point1" tabindex="-1">恢复到还原点“my_res_point1” <a class="header-anchor" href="#恢复到还原点-my-res-point1" aria-label="Permalink to &quot;恢复到还原点“my_res_point1”&quot;">​</a></h3><p>停止数据库</p><p>备份故障data并将基础备份的back替换为新data</p><p>touch /data/pgdata/data/recovery.signal --保存空文件即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ vi $pgdata_path/postgresql.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /data/pgdata/archivedir/%f %p&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_target_name=&#39;my_res_point1&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ vi $pgdata_path/postgresql.conf </span></span>
<span class="line"><span style="color:#24292e;">restore_command = &#39;cp /data/pgdata/archivedir/%f %p&#39;</span></span>
<span class="line"><span style="color:#24292e;">recovery_target_name=&#39;my_res_point1&#39;</span></span></code></pre></div><h2 id="_3-指定事务" tabindex="-1">3.指定事务 <a class="header-anchor" href="#_3-指定事务" aria-label="Permalink to &quot;3.指定事务&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select * from test01 ;</span></span>
<span class="line"><span style="color:#e1e4e8;">id | name </span></span>
<span class="line"><span style="color:#e1e4e8;">----+------</span></span>
<span class="line"><span style="color:#e1e4e8;">1 | a</span></span>
<span class="line"><span style="color:#e1e4e8;">2 | b</span></span>
<span class="line"><span style="color:#e1e4e8;">3 | c</span></span>
<span class="line"><span style="color:#e1e4e8;">   4 | d</span></span>
<span class="line"><span style="color:#e1e4e8;">begin;</span></span>
<span class="line"><span style="color:#e1e4e8;">select txid_current();</span></span>
<span class="line"><span style="color:#e1e4e8;"> txid_current </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------</span></span>
<span class="line"><span style="color:#e1e4e8;">   342261</span></span>
<span class="line"><span style="color:#e1e4e8;">drop table test01 ;</span></span>
<span class="line"><span style="color:#e1e4e8;">end;</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_switch_wal();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select * from test01 ;</span></span>
<span class="line"><span style="color:#24292e;">id | name </span></span>
<span class="line"><span style="color:#24292e;">----+------</span></span>
<span class="line"><span style="color:#24292e;">1 | a</span></span>
<span class="line"><span style="color:#24292e;">2 | b</span></span>
<span class="line"><span style="color:#24292e;">3 | c</span></span>
<span class="line"><span style="color:#24292e;">   4 | d</span></span>
<span class="line"><span style="color:#24292e;">begin;</span></span>
<span class="line"><span style="color:#24292e;">select txid_current();</span></span>
<span class="line"><span style="color:#24292e;"> txid_current </span></span>
<span class="line"><span style="color:#24292e;">--------------</span></span>
<span class="line"><span style="color:#24292e;">   342261</span></span>
<span class="line"><span style="color:#24292e;">drop table test01 ;</span></span>
<span class="line"><span style="color:#24292e;">end;</span></span>
<span class="line"><span style="color:#24292e;">select pg_switch_wal();</span></span></code></pre></div><p>rpm包恢复</p><p><a href="https://www.postgresql.r2schools.com/point-in-time-recoverypitr-in-postgresql-12-13/" target="_blank" rel="noreferrer">https://www.postgresql.r2schools.com/point-in-time-recoverypitr-in-postgresql-12-13/</a></p>`,70),o=[l];function c(t,r,i,y,d,u){return a(),n("div",null,o)}const g=s(p,[["render",c]]);export{E as __pageData,g as default};
