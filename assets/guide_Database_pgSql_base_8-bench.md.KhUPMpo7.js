import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1.pgbench简介","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/8-bench.md","filePath":"guide/Database/pgSql/base/8-bench.md","lastUpdated":1711535325000}'),l={name:"guide/Database/pgSql/base/8-bench.md"},p=e(`<h1 id="_1-pgbench简介" tabindex="-1">1.pgbench简介 <a class="header-anchor" href="#_1-pgbench简介" aria-label="Permalink to &quot;1.pgbench简介&quot;">​</a></h1><p>PostgreSQL自带一款轻量级的压力测试工具：pgbench。pgbench是一种在PostgreSQL上运行<strong>基准测试</strong>的简单程序。它可以在并发的数据库会话中一遍一遍地运行相同的SQL命令</p><h2 id="_1-1安装方法" tabindex="-1">1.1安装方法 <a class="header-anchor" href="#_1-1安装方法" aria-label="Permalink to &quot;1.1安装方法&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/pgdg-centos11-11-2.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y postgresql11*</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">su - postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">vi .bash_profile</span></span>
<span class="line"><span style="color:#e1e4e8;">export PS1=&quot;$USER@\`/bin/hostname -s\`-&gt; &quot;    </span></span>
<span class="line"><span style="color:#e1e4e8;">export LANG=en_US.utf8    </span></span>
<span class="line"><span style="color:#e1e4e8;">export PGHOME=/usr/pgsql-11  </span></span>
<span class="line"><span style="color:#e1e4e8;">export LD_LIBRARY_PATH=$PGHOME/lib:/lib64:/usr/lib64:/usr/local/lib64:/lib:/usr/lib:/usr/local/lib:$LD_LIBRARY_PATH    </span></span>
<span class="line"><span style="color:#e1e4e8;">export DATE=\`date +&quot;%Y%m%d%H%M&quot;\`  </span></span>
<span class="line"><span style="color:#e1e4e8;">export PATH=$PGHOME/bin:$PATH:.    </span></span>
<span class="line"><span style="color:#e1e4e8;">export MANPATH=$PGHOME/share/man:$MANPATH    </span></span>
<span class="line"><span style="color:#e1e4e8;">alias rm=&#39;rm -i&#39;    </span></span>
<span class="line"><span style="color:#e1e4e8;">alias ll=&#39;ls -lh&#39;    </span></span>
<span class="line"><span style="color:#e1e4e8;">unalias vi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;">yum install -y https://download.postgresql.org/pub/repos/yum/11/redhat/rhel-7-x86_64/pgdg-centos11-11-2.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;">yum install -y postgresql11*</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">su - postgres</span></span>
<span class="line"><span style="color:#24292e;">vi .bash_profile</span></span>
<span class="line"><span style="color:#24292e;">export PS1=&quot;$USER@\`/bin/hostname -s\`-&gt; &quot;    </span></span>
<span class="line"><span style="color:#24292e;">export LANG=en_US.utf8    </span></span>
<span class="line"><span style="color:#24292e;">export PGHOME=/usr/pgsql-11  </span></span>
<span class="line"><span style="color:#24292e;">export LD_LIBRARY_PATH=$PGHOME/lib:/lib64:/usr/lib64:/usr/local/lib64:/lib:/usr/lib:/usr/local/lib:$LD_LIBRARY_PATH    </span></span>
<span class="line"><span style="color:#24292e;">export DATE=\`date +&quot;%Y%m%d%H%M&quot;\`  </span></span>
<span class="line"><span style="color:#24292e;">export PATH=$PGHOME/bin:$PATH:.    </span></span>
<span class="line"><span style="color:#24292e;">export MANPATH=$PGHOME/share/man:$MANPATH    </span></span>
<span class="line"><span style="color:#24292e;">alias rm=&#39;rm -i&#39;    </span></span>
<span class="line"><span style="color:#24292e;">alias ll=&#39;ls -lh&#39;    </span></span>
<span class="line"><span style="color:#24292e;">unalias vi</span></span></code></pre></div><h1 id="_2-测试指标" tabindex="-1">2.测试指标 <a class="header-anchor" href="#_2-测试指标" aria-label="Permalink to &quot;2.测试指标&quot;">​</a></h1><h2 id="_2-1-只读qps" tabindex="-1">2.1 只读QPS <a class="header-anchor" href="#_2-1-只读qps" aria-label="Permalink to &quot;2.1 只读QPS&quot;">​</a></h2><p>数据库只读时每秒执行的SQL数（仅包含select）</p><h2 id="_2-2-读写qps" tabindex="-1">2.2 读写QPS <a class="header-anchor" href="#_2-2-读写qps" aria-label="Permalink to &quot;2.2 读写QPS&quot;">​</a></h2><p>数据库读写时每秒执行的SQL数（含insert、select、update）</p><h1 id="_3-测试步骤" tabindex="-1">3.测试步骤 <a class="header-anchor" href="#_3-测试步骤" aria-label="Permalink to &quot;3.测试步骤&quot;">​</a></h1><h2 id="_3-1修改配置文件" tabindex="-1">3.1修改配置文件 <a class="header-anchor" href="#_3-1修改配置文件" aria-label="Permalink to &quot;3.1修改配置文件&quot;">​</a></h2><p>本文以PostgreSQL10.0 版本为例，需要修改主备实例上的postgresql.auto.conf文件</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">vacuum_cost_delay </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">bgwriter_delay </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 10ms</span></span>
<span class="line"><span style="color:#E1E4E8;">bgwriter_lru_maxpages </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span></span>
<span class="line"><span style="color:#E1E4E8;">bgwriter_lru_multiplier </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">effective_io_concurrency </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">max_worker_processes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">128</span></span>
<span class="line"><span style="color:#E1E4E8;">max_parallel_workers_per_gather </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#F97583;">synchronous_commit</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"><span style="color:#E1E4E8;">wal_compression </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span></span>
<span class="line"><span style="color:#E1E4E8;">wal_writer_delay </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 10ms</span></span>
<span class="line"><span style="color:#E1E4E8;">wal_writer_flush_after </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 1MB</span></span>
<span class="line"><span style="color:#E1E4E8;">checkpoint_timeout </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 30min</span></span>
<span class="line"><span style="color:#E1E4E8;">max_wal_size </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 64GB    # </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> 当前PG实例的规格内存 </span></span>
<span class="line"><span style="color:#E1E4E8;">min_wal_size </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 16GB    # </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> 当前PG实例的规格内存 </span></span>
<span class="line"><span style="color:#E1E4E8;">checkpoint_completion_target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">hot_standby_feedback </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">off</span></span>
<span class="line"><span style="color:#E1E4E8;">random_page_cost </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">log_checkpoints </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span></span>
<span class="line"><span style="color:#E1E4E8;">log_statement </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ddl&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">log_autovacuum_min_duration </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">autovacuum_freeze_max_age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1500000000</span></span>
<span class="line"><span style="color:#E1E4E8;">autovacuum_multixact_freeze_max_age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1600000000</span></span>
<span class="line"><span style="color:#E1E4E8;">autovacuum_vacuum_cost_delay </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> 0ms</span></span>
<span class="line"><span style="color:#E1E4E8;">vacuum_freeze_table_age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1450000000</span></span>
<span class="line"><span style="color:#E1E4E8;">vacuum_multixact_freeze_table_age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1450000000</span></span>
<span class="line"><span style="color:#E1E4E8;">log_min_duration_statement</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">5s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">vacuum_cost_delay </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">bgwriter_delay </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 10ms</span></span>
<span class="line"><span style="color:#24292E;">bgwriter_lru_maxpages </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span></span>
<span class="line"><span style="color:#24292E;">bgwriter_lru_multiplier </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">effective_io_concurrency </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">max_worker_processes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">128</span></span>
<span class="line"><span style="color:#24292E;">max_parallel_workers_per_gather </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#D73A49;">synchronous_commit</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"><span style="color:#24292E;">wal_compression </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span></span>
<span class="line"><span style="color:#24292E;">wal_writer_delay </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 10ms</span></span>
<span class="line"><span style="color:#24292E;">wal_writer_flush_after </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 1MB</span></span>
<span class="line"><span style="color:#24292E;">checkpoint_timeout </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 30min</span></span>
<span class="line"><span style="color:#24292E;">max_wal_size </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 64GB    # </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> 当前PG实例的规格内存 </span></span>
<span class="line"><span style="color:#24292E;">min_wal_size </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 16GB    # </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> 当前PG实例的规格内存 </span></span>
<span class="line"><span style="color:#24292E;">checkpoint_completion_target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">hot_standby_feedback </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">off</span></span>
<span class="line"><span style="color:#24292E;">random_page_cost </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">log_checkpoints </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span></span>
<span class="line"><span style="color:#24292E;">log_statement </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ddl&#39;</span></span>
<span class="line"><span style="color:#24292E;">log_autovacuum_min_duration </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">autovacuum_freeze_max_age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1500000000</span></span>
<span class="line"><span style="color:#24292E;">autovacuum_multixact_freeze_max_age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1600000000</span></span>
<span class="line"><span style="color:#24292E;">autovacuum_vacuum_cost_delay </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> 0ms</span></span>
<span class="line"><span style="color:#24292E;">vacuum_freeze_table_age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1450000000</span></span>
<span class="line"><span style="color:#24292E;">vacuum_multixact_freeze_table_age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1450000000</span></span>
<span class="line"><span style="color:#24292E;">log_min_duration_statement</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">5s</span></span></code></pre></div><p>重启pg实例</p><h2 id="_3-2根据目标库大小初始化测试数据" tabindex="-1">3.2根据目标库大小初始化测试数据 <a class="header-anchor" href="#_3-2根据目标库大小初始化测试数据" aria-label="Permalink to &quot;3.2根据目标库大小初始化测试数据&quot;">​</a></h2><p>具体命令如下</p><ul><li>初始化数据50亿：<code>pgbench -i -s 50000</code></li><li>初始化数据10亿：<code>pgbench -i -s 10000</code></li><li>初始化数据5亿：<code>pgbench -i -s 5000</code></li><li>初始化数据1亿：<code>pgbench -i -s 1000</code></li></ul><h2 id="_3-3配置环境变量" tabindex="-1">3.3配置环境变量 <a class="header-anchor" href="#_3-3配置环境变量" aria-label="Permalink to &quot;3.3配置环境变量&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">export PGHOST=&lt;PostgreSQL实例内网地址&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">export PGPORT=&lt;PostgreSQL实例端口&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">export PGDATABASE=postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">export PGUSER=&lt;PostgreSQL数据库用户名&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">export PGPASSWORD=&lt;PostgreSQL对应用户的密码&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">export PGHOST=&lt;PostgreSQL实例内网地址&gt;</span></span>
<span class="line"><span style="color:#24292e;">export PGPORT=&lt;PostgreSQL实例端口&gt;</span></span>
<span class="line"><span style="color:#24292e;">export PGDATABASE=postgres</span></span>
<span class="line"><span style="color:#24292e;">export PGUSER=&lt;PostgreSQL数据库用户名&gt;</span></span>
<span class="line"><span style="color:#24292e;">export PGPASSWORD=&lt;PostgreSQL对应用户的密码&gt;</span></span></code></pre></div><h2 id="_3-4创建只读和读写的测试脚本" tabindex="-1">3.4创建只读和读写的测试脚本 <a class="header-anchor" href="#_3-4创建只读和读写的测试脚本" aria-label="Permalink to &quot;3.4创建只读和读写的测试脚本&quot;">​</a></h2><h3 id="_3-4-1创建只读脚本ro-sql" tabindex="-1">3.4.1创建只读脚本ro.sql <a class="header-anchor" href="#_3-4-1创建只读脚本ro-sql" aria-label="Permalink to &quot;3.4.1创建只读脚本ro.sql&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\\set aid random_gaussian(1, :range, 10.0)</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT abalance FROM pgbench_accounts WHERE aid = :aid;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\\set aid random_gaussian(1, :range, 10.0)</span></span>
<span class="line"><span style="color:#24292e;">SELECT abalance FROM pgbench_accounts WHERE aid = :aid;</span></span></code></pre></div><h3 id="_3-4-2创建读写脚本rw-sql" tabindex="-1">3.4.2创建读写脚本rw.sql <a class="header-anchor" href="#_3-4-2创建读写脚本rw-sql" aria-label="Permalink to &quot;3.4.2创建读写脚本rw.sql&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">\\set aid random_gaussian(1, :range, 10.0)  </span></span>
<span class="line"><span style="color:#e1e4e8;">\\set bid random(1, 1 * :scale)  </span></span>
<span class="line"><span style="color:#e1e4e8;">\\set tid random(1, 10 * :scale)  </span></span>
<span class="line"><span style="color:#e1e4e8;">\\set delta random(-5000, 5000)  </span></span>
<span class="line"><span style="color:#e1e4e8;">BEGIN;  </span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE pgbench_accounts SET abalance = abalance + :delta WHERE aid = :aid;  </span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT abalance FROM pgbench_accounts WHERE aid = :aid;  </span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE pgbench_tellers SET tbalance = tbalance + :delta WHERE tid = :tid;  </span></span>
<span class="line"><span style="color:#e1e4e8;">UPDATE pgbench_branches SET bbalance = bbalance + :delta WHERE bid = :bid;  </span></span>
<span class="line"><span style="color:#e1e4e8;">INSERT INTO pgbench_history (tid, bid, aid, delta, mtime) VALUES (:tid, :bid, :aid, :delta, CURRENT_TIMESTAMP);  </span></span>
<span class="line"><span style="color:#e1e4e8;">END;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">\\set aid random_gaussian(1, :range, 10.0)  </span></span>
<span class="line"><span style="color:#24292e;">\\set bid random(1, 1 * :scale)  </span></span>
<span class="line"><span style="color:#24292e;">\\set tid random(1, 10 * :scale)  </span></span>
<span class="line"><span style="color:#24292e;">\\set delta random(-5000, 5000)  </span></span>
<span class="line"><span style="color:#24292e;">BEGIN;  </span></span>
<span class="line"><span style="color:#24292e;">UPDATE pgbench_accounts SET abalance = abalance + :delta WHERE aid = :aid;  </span></span>
<span class="line"><span style="color:#24292e;">SELECT abalance FROM pgbench_accounts WHERE aid = :aid;  </span></span>
<span class="line"><span style="color:#24292e;">UPDATE pgbench_tellers SET tbalance = tbalance + :delta WHERE tid = :tid;  </span></span>
<span class="line"><span style="color:#24292e;">UPDATE pgbench_branches SET bbalance = bbalance + :delta WHERE bid = :bid;  </span></span>
<span class="line"><span style="color:#24292e;">INSERT INTO pgbench_history (tid, bid, aid, delta, mtime) VALUES (:tid, :bid, :aid, :delta, CURRENT_TIMESTAMP);  </span></span>
<span class="line"><span style="color:#24292e;">END;</span></span></code></pre></div><h1 id="_4-命令测试" tabindex="-1">4.命令测试 <a class="header-anchor" href="#_4-命令测试" aria-label="Permalink to &quot;4.命令测试&quot;">​</a></h1><h2 id="_4-1只读测试" tabindex="-1">4.1只读测试 <a class="header-anchor" href="#_4-1只读测试" aria-label="Permalink to &quot;4.1只读测试&quot;">​</a></h2><h3 id="只读测试" tabindex="-1">只读测试 <a class="header-anchor" href="#只读测试" aria-label="Permalink to &quot;只读测试&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据50亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=5000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x4.4xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x4.4xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x4.4xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.2xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.2xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.2xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.large.2，总数据量5亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.large.2，总数据量5亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.medium.2，总数据量1亿，热数据5000万</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=50000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.medium.2，总数据量1亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=100000000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据50亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=5000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x4.4xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x4.4xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x4.4xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.2xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.2xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.2xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.large.2，总数据量5亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.large.2，总数据量5亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.medium.2，总数据量1亿，热数据5000万</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./ro.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=50000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.medium.2，总数据量1亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./ro.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=100000000</span></span></code></pre></div><h3 id="读写测试" tabindex="-1">读写测试 <a class="header-anchor" href="#读写测试" aria-label="Permalink to &quot;读写测试&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rds.pg.st.h43，总数据量50亿，热数据50亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=5000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x4.4xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x4.4xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x4.4xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.2xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.2xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.2xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.large.2，总数据量5亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=100000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.large.2，总数据量5亿，热数据5亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=500000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.medium.2，总数据量1亿，热数据5000万</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=50000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pg.x8.medium.2，总数据量1亿，热数据1亿</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=100000000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rds.pg.st.h43，总数据量50亿，热数据50亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 240 -j 240 -T 120 -D scale=50000 -D range=5000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x4.4xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x4.4xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x4.4xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 128 -j 128 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.2xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.2xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.2xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 64 -j 64 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.xlarge.2，总数据量10亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.xlarge.2，总数据量10亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.xlarge.2，总数据量10亿，热数据10亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 32 -j 32 -T 120 -D scale=10000 -D range=1000000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.large.2，总数据量5亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=100000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.large.2，总数据量5亿，热数据5亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 16 -j 16 -T 120 -D scale=5000 -D range=500000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.medium.2，总数据量1亿，热数据5000万</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -v -r -P 1 -f ./rw.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=50000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pg.x8.medium.2，总数据量1亿，热数据1亿</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pgbench -M prepared -n -r -P 1 -f ./rw.sql -c 8 -j 8 -T 120 -D scale=1000 -D range=100000000</span></span></code></pre></div><p><strong>说明</strong></p><ul><li>scale乘以10万：表示测试数据量。</li><li>range：表示活跃数据量。</li><li>-c：表示测试连接数，测试连接数不代表该规格的最大连接数，最大连接数</li></ul>`,32),o=[p];function c(r,t,i,y,g,d){return n(),a("div",null,o)}const b=s(l,[["render",c]]);export{h as __pageData,b as default};
