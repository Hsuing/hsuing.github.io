import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/optimize/7_PostgreSQL_configuration_parameters.md","filePath":"guide/Database/pgSql/optimize/7_PostgreSQL_configuration_parameters.md","lastUpdated":1703063387000}'),l={name:"guide/Database/pgSql/optimize/7_PostgreSQL_configuration_parameters.md"},p=a(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">show max_connections;</span></span>
<span class="line"><span style="color:#e1e4e8;">show shared_buffers;</span></span>
<span class="line"><span style="color:#e1e4e8;">show wal_buffers;</span></span>
<span class="line"><span style="color:#e1e4e8;">show checkpoint_completion_target;</span></span>
<span class="line"><span style="color:#e1e4e8;">show checkpoint_timeout;</span></span>
<span class="line"><span style="color:#e1e4e8;">show fsync;</span></span>
<span class="line"><span style="color:#e1e4e8;">show commit_delay;</span></span>
<span class="line"><span style="color:#e1e4e8;">show autovacuum_work_mem;</span></span>
<span class="line"><span style="color:#e1e4e8;">show commit_siblings;</span></span>
<span class="line"><span style="color:#e1e4e8;">show effective_cache_size;</span></span>
<span class="line"><span style="color:#e1e4e8;">show maintenance_work_mem;</span></span>
<span class="line"><span style="color:#e1e4e8;">show work_mem;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">show max_connections;</span></span>
<span class="line"><span style="color:#24292e;">show shared_buffers;</span></span>
<span class="line"><span style="color:#24292e;">show wal_buffers;</span></span>
<span class="line"><span style="color:#24292e;">show checkpoint_completion_target;</span></span>
<span class="line"><span style="color:#24292e;">show checkpoint_timeout;</span></span>
<span class="line"><span style="color:#24292e;">show fsync;</span></span>
<span class="line"><span style="color:#24292e;">show commit_delay;</span></span>
<span class="line"><span style="color:#24292e;">show autovacuum_work_mem;</span></span>
<span class="line"><span style="color:#24292e;">show commit_siblings;</span></span>
<span class="line"><span style="color:#24292e;">show effective_cache_size;</span></span>
<span class="line"><span style="color:#24292e;">show maintenance_work_mem;</span></span>
<span class="line"><span style="color:#24292e;">show work_mem;</span></span></code></pre></div><h2 id="_1-max-connections" tabindex="-1">1.max_connections <a class="header-anchor" href="#_1-max-connections" aria-label="Permalink to &quot;1.max_connections&quot;">​</a></h2><ul><li>查询当前库的最大连接数</li></ul><p>show max_connections;</p><ul><li>查询当前库当前的活跃连接数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# show max_connections;</span></span>
<span class="line"><span style="color:#e1e4e8;"> max_connections </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 3000</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">假如有2000个连接，work_mem为8MB的话，那么每个连接都会最多使用到8MB(按需分配)，很快就达到了16GB RAM，所以也得去调整work_mem以及oom机制</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# show max_connections;</span></span>
<span class="line"><span style="color:#24292e;"> max_connections </span></span>
<span class="line"><span style="color:#24292e;">-----------------</span></span>
<span class="line"><span style="color:#24292e;"> 3000</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">假如有2000个连接，work_mem为8MB的话，那么每个连接都会最多使用到8MB(按需分配)，很快就达到了16GB RAM，所以也得去调整work_mem以及oom机制</span></span></code></pre></div><ul><li>按用户查询当前库当前活跃的连接数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# select usename, count(*) from pg_stat_activity group by usename order by count(*) desc;</span></span>
<span class="line"><span style="color:#e1e4e8;"> usename  | count </span></span>
<span class="line"><span style="color:#e1e4e8;">----------+-------</span></span>
<span class="line"><span style="color:#e1e4e8;">          |     4</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres |     2</span></span>
<span class="line"><span style="color:#e1e4e8;">(2 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# select usename, count(*) from pg_stat_activity group by usename order by count(*) desc;</span></span>
<span class="line"><span style="color:#24292e;"> usename  | count </span></span>
<span class="line"><span style="color:#24292e;">----------+-------</span></span>
<span class="line"><span style="color:#24292e;">          |     4</span></span>
<span class="line"><span style="color:#24292e;"> postgres |     2</span></span>
<span class="line"><span style="color:#24292e;">(2 行记录)</span></span></code></pre></div><h2 id="_2-shared-buffers" tabindex="-1">2.shared_buffers <a class="header-anchor" href="#_2-shared-buffers" aria-label="Permalink to &quot;2.shared_buffers&quot;">​</a></h2><p>PostgreSQL既使用自身的缓冲区，也使用内核缓冲IO。这意味着数据会在内存中存储两次，首先是存入PostgreSQL缓冲区，然后是内核缓冲区。这被称为双重缓冲区处理。对大多数操作系统来说，这个参数是最有效的用于调优的参数。此参数的作用是设置PostgreSQL中用于缓存的专用内存量。 shared_buffers的默认值设置得非常低，因为某些机器和操作系统不支持使用更高的值。但在大多数现代设备中，通常需要增大此参数的值才能获得最佳性能。 建议的设置值为机器总内存大小的25％，但是也可以根据实际情况尝试设置更低和更高的值。实际值取决于机器的具体配置和工作的数据量大小</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# show shared_buffers;</span></span>
<span class="line"><span style="color:#e1e4e8;"> shared_buffers </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 512MB</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# show shared_buffers;</span></span>
<span class="line"><span style="color:#24292e;"> shared_buffers </span></span>
<span class="line"><span style="color:#24292e;">----------------</span></span>
<span class="line"><span style="color:#24292e;"> 512MB</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><h2 id="_3-wal-buffers" tabindex="-1">3.<strong>wal_buffers</strong> <a class="header-anchor" href="#_3-wal-buffers" aria-label="Permalink to &quot;3.**wal_buffers**&quot;">​</a></h2><p>PostgreSQL将其WAL（预写日志）记录写入缓冲区，然后将这些缓冲区刷新到磁盘。由wal_buffers定义的缓冲区的默认大小为16MB，但如果有大量并发连接的话，则设置为一个较高的值可以提供更好的性能</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# show wal_buffers;</span></span>
<span class="line"><span style="color:#e1e4e8;"> wal_buffers </span></span>
<span class="line"><span style="color:#e1e4e8;">-------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 16MB</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# show wal_buffers;</span></span>
<span class="line"><span style="color:#24292e;"> wal_buffers </span></span>
<span class="line"><span style="color:#24292e;">-------------</span></span>
<span class="line"><span style="color:#24292e;"> 16MB</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><h2 id="_4-effective-cache-size" tabindex="-1">4.<strong>effective_cache_size</strong> <a class="header-anchor" href="#_4-effective-cache-size" aria-label="Permalink to &quot;4.**effective_cache_size**&quot;">​</a></h2><p>effective_cache_size提供可用于磁盘高速缓存的内存量的估计值。它只是一个建议值，而不是确切分配的内存或缓存大小。它不会实际分配内存，而是会告知优化器内核中可用的缓存量。在一个索引的代价估计中，更高的数值会使得索引扫描更可能被使用，更低的数值会使得顺序扫描更可能被使用。在设置这个参数时，还应该考虑PostgreSQL的共享缓冲区以及将被用于PostgreSQL数据文件的内核磁盘缓冲区。默认值是4GB</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# show effective_cache_size;</span></span>
<span class="line"><span style="color:#e1e4e8;"> effective_cache_size </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 2GB</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# show effective_cache_size;</span></span>
<span class="line"><span style="color:#24292e;"> effective_cache_size </span></span>
<span class="line"><span style="color:#24292e;">----------------------</span></span>
<span class="line"><span style="color:#24292e;"> 2GB</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><h2 id="_5-work-mem" tabindex="-1">5.<strong>work_mem</strong> <a class="header-anchor" href="#_5-work-mem" aria-label="Permalink to &quot;5.**work_mem**&quot;">​</a></h2><p>此配置用于复合排序。内存中的排序比溢出到磁盘的排序快得多，设置非常高的值可能会导致部署环境出现内存瓶颈，因为此参数是按用户排序操作。如果有多个用户尝试执行排序操作，则系统将为所有用户分配大小为work_mem *总排序操作数的空间。全局设置此参数可能会导致内存使用率过高，因此强烈建议在会话级别修改此参数值。默认值为4MB</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=#  show work_mem;</span></span>
<span class="line"><span style="color:#e1e4e8;"> work_mem </span></span>
<span class="line"><span style="color:#e1e4e8;">----------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 3048MB</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=#  show work_mem;</span></span>
<span class="line"><span style="color:#24292e;"> work_mem </span></span>
<span class="line"><span style="color:#24292e;">----------</span></span>
<span class="line"><span style="color:#24292e;"> 3048MB</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><h2 id="_6-maintenance-work-mem" tabindex="-1">6.<strong>maintenance_work_mem</strong> <a class="header-anchor" href="#_6-maintenance-work-mem" aria-label="Permalink to &quot;6.**maintenance_work_mem**&quot;">​</a></h2><p>maintenance_work_mem是用于维护任务的内存设置。默认值为64MB。设置较大的值对于VACUUM，RESTORE，CREATE INDEX，ADD FOREIGN KEY和ALTER TABLE等操作的性能提升效果显著</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# show maintenance_work_mem;</span></span>
<span class="line"><span style="color:#e1e4e8;"> maintenance_work_mem </span></span>
<span class="line"><span style="color:#e1e4e8;">----------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 128MB</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# show maintenance_work_mem;</span></span>
<span class="line"><span style="color:#24292e;"> maintenance_work_mem </span></span>
<span class="line"><span style="color:#24292e;">----------------------</span></span>
<span class="line"><span style="color:#24292e;"> 128MB</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><h2 id="_7-synchronous-commit" tabindex="-1">7.<strong>synchronous_commit</strong> <a class="header-anchor" href="#_7-synchronous-commit" aria-label="Permalink to &quot;7.**synchronous_commit**&quot;">​</a></h2><p>此参数的作用为在向客户端返回成功状态之前，强制提交等待WAL被写入磁盘。这是性能和可靠性之间的权衡。如果应用程序被设计为性能比可靠性更重要，那么关闭synchronous_commit。这意味着成功状态与保证写入磁盘之间会存在时间差。在服务器崩溃的情况下，即使客户端在提交时收到成功消息，数据也可能丢失</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# show synchronous_commit;</span></span>
<span class="line"><span style="color:#e1e4e8;"> synchronous_commit </span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> on</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# show synchronous_commit;</span></span>
<span class="line"><span style="color:#24292e;"> synchronous_commit </span></span>
<span class="line"><span style="color:#24292e;">--------------------</span></span>
<span class="line"><span style="color:#24292e;"> on</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><h2 id="_8-checkpoint-timeout和checkpoint-completion-target" tabindex="-1">8.<strong>checkpoint_timeout和checkpoint_completion_target</strong> <a class="header-anchor" href="#_8-checkpoint-timeout和checkpoint-completion-target" aria-label="Permalink to &quot;8.**checkpoint_timeout和checkpoint_completion_target**&quot;">​</a></h2><p>PostgreSQL将更改写入WAL。检查点进程将数据刷新到数据文件中。发生CHECKPOINT时完成此操作。这是一项开销很大的操作，整个过程涉及大量的磁盘读/写操作。用户可以在需要时随时发出CHECKPOINT指令，或者通过PostgreSQL的参数checkpoint_timeout和checkpoint_completion_target来自动完成。 checkpoint_timeout参数用于设置WAL检查点之间的时间。将此设置得太低会减少崩溃恢复时间，因为更多数据会写入磁盘，但由于每个检查点都会占用系统资源，因此也会损害性能。此参数只能在postgresql.conf文件中或在服务器命令行上设置。 checkpoint_completion_target指定检查点完成的目标，作为检查点之间总时间的一部分。默认值是 0.5。 这个参数只能在postgresql.conf文件中或在服务器命令行上设置。高频率的检查点可能会影响性能</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# show checkpoint_timeout;</span></span>
<span class="line"><span style="color:#e1e4e8;"> checkpoint_timeout</span></span>
<span class="line"><span style="color:#e1e4e8;">--------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 5min</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# show checkpoint_completion_target;</span></span>
<span class="line"><span style="color:#e1e4e8;"> checkpoint_completion_target</span></span>
<span class="line"><span style="color:#e1e4e8;">------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# show checkpoint_timeout;</span></span>
<span class="line"><span style="color:#24292e;"> checkpoint_timeout</span></span>
<span class="line"><span style="color:#24292e;">--------------------</span></span>
<span class="line"><span style="color:#24292e;"> 5min</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">postgres=# show checkpoint_completion_target;</span></span>
<span class="line"><span style="color:#24292e;"> checkpoint_completion_target</span></span>
<span class="line"><span style="color:#24292e;">------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 0.5</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><h2 id="_9-fsync" tabindex="-1">9.<strong>fsync</strong> <a class="header-anchor" href="#_9-fsync" aria-label="Permalink to &quot;9.**fsync**&quot;">​</a></h2><p>强制把数据同步更新到磁盘,如果系统的IO压力很大，把改参数改为off 主要的瓶颈就在系统的IO，如果需要减少IO的负荷，最直接的方法就是把fsync关闭，但是这样就会在掉电的情况下，可能会丢失部分数据</p><h2 id="_10-commit-delay" tabindex="-1">10.<strong>commit_delay</strong> <a class="header-anchor" href="#_10-commit-delay" aria-label="Permalink to &quot;10.**commit_delay**&quot;">​</a></h2><p>事务提交后，日志写到wal log上到wal_buffer写入到磁盘的时间间隔。需要配合commit_sibling。能够一次写入多个事务，减少IO，提高性能</p><h2 id="_11-commit-siblings" tabindex="-1">11.<strong>commit_siblings</strong> <a class="header-anchor" href="#_11-commit-siblings" aria-label="Permalink to &quot;11.**commit_siblings**&quot;">​</a></h2><p>设置触发commit_delay的并发事务数，根据并发事务多少来配置。减少IO，提高性能</p><p>注意： 并非所有参数都适用于所有应用程序类型。某些应用程序通过调整参数可以提高性能，有些则不会。必须针对应用程序及操作系统的特定需求来调整数据库参数</p><p>参考：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">max_connections = 300       # (change requires restart)</span></span>
<span class="line"><span style="color:#e1e4e8;">unix_socket_directories = &#39;.&#39;   # comma-separated list of directories</span></span>
<span class="line"><span style="color:#e1e4e8;">shared_buffers = 194GB       # 尽量用数据库管理内存，减少双重缓存，提高使用效率</span></span>
<span class="line"><span style="color:#e1e4e8;">huge_pages = on           # on, off, or try  ，使用大页</span></span>
<span class="line"><span style="color:#e1e4e8;">work_mem = 256MB # min 64kB  ， 减少外部文件排序的可能，提高效率</span></span>
<span class="line"><span style="color:#e1e4e8;">maintenance_work_mem = 2GB  # min 1MB  ， 加速建立索引</span></span>
<span class="line"><span style="color:#e1e4e8;">autovacuum_work_mem = 2GB   # min 1MB, or -1 to use maintenance_work_mem  ， 加速垃圾回收</span></span>
<span class="line"><span style="color:#e1e4e8;">dynamic_shared_memory_type = mmap      # the default is the first option</span></span>
<span class="line"><span style="color:#e1e4e8;">vacuum_cost_delay = 0      # 0-100 milliseconds   ， 垃圾回收不妥协，极限压力下，减少膨胀可能性</span></span>
<span class="line"><span style="color:#e1e4e8;">bgwriter_delay = 10ms       # 10-10000ms between rounds    ， 刷shared buffer脏页的进程调度间隔，尽量高频调度，减少用户进程申请不到内存而需要主动刷脏页的可能（导致RT升高）。</span></span>
<span class="line"><span style="color:#e1e4e8;">bgwriter_lru_maxpages = 1000   # 0-1000 max buffers written/round ,  一次最多刷多少脏页</span></span>
<span class="line"><span style="color:#e1e4e8;">bgwriter_lru_multiplier = 10.0          # 0-10.0 multipler on buffers scanned/round  一次扫描多少个块，上次刷出脏页数量的倍数</span></span>
<span class="line"><span style="color:#e1e4e8;">effective_io_concurrency = 2           # 1-1000; 0 disables prefetching ， 执行节点为bitmap heap scan时，预读的块数。从而</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level = minimal         # minimal, archive, hot_standby, or logical ， 如果现实环境，建议开启归档。</span></span>
<span class="line"><span style="color:#e1e4e8;">synchronous_commit = off    # synchronization level;    ， 异步提交</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_sync_method = open_sync    # the default is the first option  ， 因为没有standby，所以写xlog选择一个支持O_DIRECT的fsync方法。</span></span>
<span class="line"><span style="color:#e1e4e8;">full_page_writes = off      # recover from partial page writes  ， 生产中，如果有增量备份和归档，可以关闭，提高性能。</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_buffers = 1GB           # min 32kB, -1 sets based on shared_buffers  ，wal buffer大小，如果大量写wal buffer等待，则可以加大。</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_writer_delay = 10ms         # 1-10000 milliseconds  wal buffer调度间隔，和bg writer delay类似。</span></span>
<span class="line"><span style="color:#e1e4e8;">commit_delay = 20           # range 0-100000, in microseconds  ，分组提交的等待时间</span></span>
<span class="line"><span style="color:#e1e4e8;">commit_siblings = 9        # range 1-1000  , 有多少个事务同时进入提交阶段时，就触发分组提交。</span></span>
<span class="line"><span style="color:#e1e4e8;">checkpoint_timeout = 55min  # range 30s-1h  时间控制的检查点间隔。</span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_size = 320GB    #   2个检查点之间最多允许产生多少个XLOG文件</span></span>
<span class="line"><span style="color:#e1e4e8;">checkpoint_completion_target = 0.99     # checkpoint target duration, 0.0 - 1.0  ，平滑调度间隔，假设上一个检查点到现在这个检查点之间产生了100个XLOG，则这次检查点需要在产生100*checkpoint_completion_target个XLOG文件的过程中完成。PG会根据这些值来调度平滑检查点。</span></span>
<span class="line"><span style="color:#e1e4e8;">random_page_cost = 1.0     # same scale as above  , 离散扫描的成本因子，本例使用的SSD IO能力足够好</span></span>
<span class="line"><span style="color:#e1e4e8;">effective_cache_size = 240GB  # 可用的OS CACHE</span></span>
<span class="line"><span style="color:#e1e4e8;">log_destination = &#39;csvlog&#39;  # Valid values are combinations of</span></span>
<span class="line"><span style="color:#e1e4e8;">logging_collector = on          # Enable capturing of stderr and csvlog</span></span>
<span class="line"><span style="color:#e1e4e8;">log_truncate_on_rotation = on           # If on, an existing log file with the</span></span>
<span class="line"><span style="color:#e1e4e8;">update_process_title = off</span></span>
<span class="line"><span style="color:#e1e4e8;">track_activities = off</span></span>
<span class="line"><span style="color:#e1e4e8;">autovacuum = on    # Enable autovacuum subprocess?  &#39;on&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">autovacuum_max_workers = 4 # max number of autovacuum subprocesses    ，允许同时有多少个垃圾回收工作进程。</span></span>
<span class="line"><span style="color:#e1e4e8;">autovacuum_naptime = 6s  # time between autovacuum runs   ， 自动垃圾回收探测进程的唤醒间隔</span></span>
<span class="line"><span style="color:#e1e4e8;">autovacuum_vacuum_cost_delay = 0    # default vacuum cost delay for  ， 垃圾回收不妥协</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">max_connections = 300       # (change requires restart)</span></span>
<span class="line"><span style="color:#24292e;">unix_socket_directories = &#39;.&#39;   # comma-separated list of directories</span></span>
<span class="line"><span style="color:#24292e;">shared_buffers = 194GB       # 尽量用数据库管理内存，减少双重缓存，提高使用效率</span></span>
<span class="line"><span style="color:#24292e;">huge_pages = on           # on, off, or try  ，使用大页</span></span>
<span class="line"><span style="color:#24292e;">work_mem = 256MB # min 64kB  ， 减少外部文件排序的可能，提高效率</span></span>
<span class="line"><span style="color:#24292e;">maintenance_work_mem = 2GB  # min 1MB  ， 加速建立索引</span></span>
<span class="line"><span style="color:#24292e;">autovacuum_work_mem = 2GB   # min 1MB, or -1 to use maintenance_work_mem  ， 加速垃圾回收</span></span>
<span class="line"><span style="color:#24292e;">dynamic_shared_memory_type = mmap      # the default is the first option</span></span>
<span class="line"><span style="color:#24292e;">vacuum_cost_delay = 0      # 0-100 milliseconds   ， 垃圾回收不妥协，极限压力下，减少膨胀可能性</span></span>
<span class="line"><span style="color:#24292e;">bgwriter_delay = 10ms       # 10-10000ms between rounds    ， 刷shared buffer脏页的进程调度间隔，尽量高频调度，减少用户进程申请不到内存而需要主动刷脏页的可能（导致RT升高）。</span></span>
<span class="line"><span style="color:#24292e;">bgwriter_lru_maxpages = 1000   # 0-1000 max buffers written/round ,  一次最多刷多少脏页</span></span>
<span class="line"><span style="color:#24292e;">bgwriter_lru_multiplier = 10.0          # 0-10.0 multipler on buffers scanned/round  一次扫描多少个块，上次刷出脏页数量的倍数</span></span>
<span class="line"><span style="color:#24292e;">effective_io_concurrency = 2           # 1-1000; 0 disables prefetching ， 执行节点为bitmap heap scan时，预读的块数。从而</span></span>
<span class="line"><span style="color:#24292e;">wal_level = minimal         # minimal, archive, hot_standby, or logical ， 如果现实环境，建议开启归档。</span></span>
<span class="line"><span style="color:#24292e;">synchronous_commit = off    # synchronization level;    ， 异步提交</span></span>
<span class="line"><span style="color:#24292e;">wal_sync_method = open_sync    # the default is the first option  ， 因为没有standby，所以写xlog选择一个支持O_DIRECT的fsync方法。</span></span>
<span class="line"><span style="color:#24292e;">full_page_writes = off      # recover from partial page writes  ， 生产中，如果有增量备份和归档，可以关闭，提高性能。</span></span>
<span class="line"><span style="color:#24292e;">wal_buffers = 1GB           # min 32kB, -1 sets based on shared_buffers  ，wal buffer大小，如果大量写wal buffer等待，则可以加大。</span></span>
<span class="line"><span style="color:#24292e;">wal_writer_delay = 10ms         # 1-10000 milliseconds  wal buffer调度间隔，和bg writer delay类似。</span></span>
<span class="line"><span style="color:#24292e;">commit_delay = 20           # range 0-100000, in microseconds  ，分组提交的等待时间</span></span>
<span class="line"><span style="color:#24292e;">commit_siblings = 9        # range 1-1000  , 有多少个事务同时进入提交阶段时，就触发分组提交。</span></span>
<span class="line"><span style="color:#24292e;">checkpoint_timeout = 55min  # range 30s-1h  时间控制的检查点间隔。</span></span>
<span class="line"><span style="color:#24292e;">max_wal_size = 320GB    #   2个检查点之间最多允许产生多少个XLOG文件</span></span>
<span class="line"><span style="color:#24292e;">checkpoint_completion_target = 0.99     # checkpoint target duration, 0.0 - 1.0  ，平滑调度间隔，假设上一个检查点到现在这个检查点之间产生了100个XLOG，则这次检查点需要在产生100*checkpoint_completion_target个XLOG文件的过程中完成。PG会根据这些值来调度平滑检查点。</span></span>
<span class="line"><span style="color:#24292e;">random_page_cost = 1.0     # same scale as above  , 离散扫描的成本因子，本例使用的SSD IO能力足够好</span></span>
<span class="line"><span style="color:#24292e;">effective_cache_size = 240GB  # 可用的OS CACHE</span></span>
<span class="line"><span style="color:#24292e;">log_destination = &#39;csvlog&#39;  # Valid values are combinations of</span></span>
<span class="line"><span style="color:#24292e;">logging_collector = on          # Enable capturing of stderr and csvlog</span></span>
<span class="line"><span style="color:#24292e;">log_truncate_on_rotation = on           # If on, an existing log file with the</span></span>
<span class="line"><span style="color:#24292e;">update_process_title = off</span></span>
<span class="line"><span style="color:#24292e;">track_activities = off</span></span>
<span class="line"><span style="color:#24292e;">autovacuum = on    # Enable autovacuum subprocess?  &#39;on&#39;</span></span>
<span class="line"><span style="color:#24292e;">autovacuum_max_workers = 4 # max number of autovacuum subprocesses    ，允许同时有多少个垃圾回收工作进程。</span></span>
<span class="line"><span style="color:#24292e;">autovacuum_naptime = 6s  # time between autovacuum runs   ， 自动垃圾回收探测进程的唤醒间隔</span></span>
<span class="line"><span style="color:#24292e;">autovacuum_vacuum_cost_delay = 0    # default vacuum cost delay for  ， 垃圾回收不妥协</span></span></code></pre></div><p><a href="http://postgres.cn/docs/12/runtime-config-resource.html" target="_blank" rel="noreferrer">http://postgres.cn/docs/12/runtime-config-resource.html</a></p><p><a href="http://postgres.cn/docs/12/runtime-config-query.html" target="_blank" rel="noreferrer">http://postgres.cn/docs/12/runtime-config-query.html</a></p>`,40),o=[p];function c(t,i,r,m,_,u){return n(),e("div",null,o)}const d=s(l,[["render",c]]);export{y as __pageData,d as default};
