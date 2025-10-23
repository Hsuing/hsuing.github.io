import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/optimize/2_pgbadger.md","filePath":"guide/Database/pgSql/optimize/2_pgbadger.md","lastUpdated":1721309786000}'),l={name:"guide/Database/pgSql/optimize/2_pgbadger.md"},p=n(`<h2 id="_1-介绍" tabindex="-1">1.介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1.介绍&quot;">​</a></h2><p>pgBadger是一款开源的快速分析PostgreSQL日志的工具，它使用perl语言编写。对日志进行分析之后输出成HTML文件。它生成的报告易于阅读。可以帮助我们查看错误日志、连接数、检查点、临时文件、VACUUM、Locks等信息。</p><blockquote><p>官方地址：</p><p><a href="https://pgbadger.darold.net/" target="_blank" rel="noreferrer">https://pgbadger.darold.net/</a></p></blockquote><h3 id="要求" tabindex="-1">要求 <a class="header-anchor" href="#要求" aria-label="Permalink to &quot;要求&quot;">​</a></h3><p>数据库端开启日志，可使用syslog、stderr、csvlog或jsonlog等多种格式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_destination = &#39;csvlog&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">logging_collector = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_age = 1d</span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_size = 10240</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_checkpoints = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_connections = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_disconnections = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_lock_waits = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_temp_files = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">log_autovacuum_min_duration = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">log_error_verbosity = default</span></span>
<span class="line"><span style="color:#e1e4e8;">log_min_duration_statement = &#39;0&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_destination = &#39;csvlog&#39;</span></span>
<span class="line"><span style="color:#24292e;">logging_collector = on</span></span>
<span class="line"><span style="color:#24292e;">log_rotation_age = 1d</span></span>
<span class="line"><span style="color:#24292e;">log_rotation_size = 10240</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_checkpoints = on</span></span>
<span class="line"><span style="color:#24292e;">log_connections = on</span></span>
<span class="line"><span style="color:#24292e;">log_disconnections = on</span></span>
<span class="line"><span style="color:#24292e;">log_lock_waits = on</span></span>
<span class="line"><span style="color:#24292e;">log_temp_files = 0</span></span>
<span class="line"><span style="color:#24292e;">log_autovacuum_min_duration = 0</span></span>
<span class="line"><span style="color:#24292e;">log_error_verbosity = default</span></span>
<span class="line"><span style="color:#24292e;">log_min_duration_statement = &#39;0&#39;</span></span></code></pre></div><ul><li>syslog</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_line_prefix=&#39;user =％u，db=％d，app=％a，client=％h&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_line_prefix=&#39;user =％u，db=％d，app=％a，client=％h&#39;</span></span></code></pre></div><ul><li>log_destination = ‘stderr’</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_line_prefix = &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h &#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_line_prefix = &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h &#39;</span></span></code></pre></div><p>执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pgbadger --prefix &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h &#39; postgresql.log -o postgresql.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pgbadger --prefix &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h &#39; postgresql.log -o postgresql.html</span></span></code></pre></div><h2 id="_2-安装" tabindex="-1">2.安装 <a class="header-anchor" href="#_2-安装" aria-label="Permalink to &quot;2.安装&quot;">​</a></h2><h3 id="下载" tabindex="-1">下载 <a class="header-anchor" href="#下载" aria-label="Permalink to &quot;下载&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://github.com/darold/pgbadger/releases</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://github.com/darold/pgbadger/archive/v12.2.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://github.com/darold/pgbadger/releases</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget https://github.com/darold/pgbadger/archive/v12.2.tar.gz</span></span></code></pre></div><h3 id="编译" tabindex="-1">编译 <a class="header-anchor" href="#编译" aria-label="Permalink to &quot;编译&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#如果没有perl 环境，需要执行以下</span></span>
<span class="line"><span style="color:#e1e4e8;">yum -y install perl-ExtUtils-CBuilder perl-ExtUtils-MakeMaker</span></span>
<span class="line"><span style="color:#e1e4e8;">yum -y install perl-CPAN perl-JSON-XS  perl-Text-CSV_XS perl-ExtUtils-MakeMaker</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#cpan Text::CSV</span></span>
<span class="line"><span style="color:#e1e4e8;">#cpan JSON::XS</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">perl Makefile.PL (生成config)</span></span>
<span class="line"><span style="color:#e1e4e8;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看版本</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@pg_beta pgbadger-10.0]# pgbadger -V</span></span>
<span class="line"><span style="color:#e1e4e8;">pgBadger version 10.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#如果没有perl 环境，需要执行以下</span></span>
<span class="line"><span style="color:#24292e;">yum -y install perl-ExtUtils-CBuilder perl-ExtUtils-MakeMaker</span></span>
<span class="line"><span style="color:#24292e;">yum -y install perl-CPAN perl-JSON-XS  perl-Text-CSV_XS perl-ExtUtils-MakeMaker</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#cpan Text::CSV</span></span>
<span class="line"><span style="color:#24292e;">#cpan JSON::XS</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">perl Makefile.PL (生成config)</span></span>
<span class="line"><span style="color:#24292e;">make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看版本</span></span>
<span class="line"><span style="color:#24292e;">[root@pg_beta pgbadger-10.0]# pgbadger -V</span></span>
<span class="line"><span style="color:#24292e;">pgBadger version 10.0</span></span></code></pre></div><h2 id="_3-语法使用" tabindex="-1">3.语法使用 <a class="header-anchor" href="#_3-语法使用" aria-label="Permalink to &quot;3.语法使用&quot;">​</a></h2><p>pgbadger [options] logfile […]</p><p><strong>常用参数</strong></p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>-f,–format logtype</td><td>指定输出的格式syslog, syslog2, stderr, jsonlog,cvs, pgbouncer, logplex, rds and redshift</td></tr><tr><td>-d,–dbname database</td><td>分析指定的数据库</td></tr><tr><td>-b,–begin datetime</td><td>解析指定时间日志，开始时间或日期</td></tr><tr><td>-e,–end datetime</td><td>解析指定时间日志，结束时间或日期</td></tr><tr><td>-o</td><td>指定输入的文件</td></tr><tr><td>-C,–nocomment</td><td>移除查询中的备注信息</td></tr><tr><td>–exclude-query regex</td><td>排除符合正则表达式的内容不需要分析</td></tr><tr><td>-a,–average minutes</td><td>图表时间间隔，默认5min</td></tr><tr><td>-A,–histo-average</td><td>构建直方图的分钟数的查询，默认60min</td></tr><tr><td>-c,–dbclient host</td><td>解析执行ip访问的日志信息</td></tr><tr><td>-j,–jobs number</td><td>并行解析的进程数量</td></tr><tr><td>-J,–Jobs number</td><td>并行执行解析的日志文件数量</td></tr><tr><td>-u,–dbuser username</td><td>解析指定的用户</td></tr><tr><td>-t,–top number</td><td>存储或显示查询数量，默认20</td></tr><tr><td>-S,–select-only</td><td>只输出select查询报告</td></tr><tr><td>-v,–verbose</td><td>详细显示信息</td></tr><tr><td>-q,–quiet</td><td>不打印进程信息</td></tr><tr><td>-w,–watch-mode</td><td>只显示错误报告</td></tr><tr><td>-I</td><td>增量产生</td></tr></tbody></table><p><strong>日志输出参数格式选项：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">%t:表示时间戳</span></span>
<span class="line"><span style="color:#e1e4e8;">%p:表示进程号</span></span>
<span class="line"><span style="color:#e1e4e8;">%r:表示客户端的主机和端口</span></span>
<span class="line"><span style="color:#e1e4e8;">%d:表示数据库名</span></span>
<span class="line"><span style="color:#e1e4e8;">%u:表示用户名</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">%t:表示时间戳</span></span>
<span class="line"><span style="color:#24292e;">%p:表示进程号</span></span>
<span class="line"><span style="color:#24292e;">%r:表示客户端的主机和端口</span></span>
<span class="line"><span style="color:#24292e;">%d:表示数据库名</span></span>
<span class="line"><span style="color:#24292e;">%u:表示用户名</span></span></code></pre></div><ul><li>Examples:</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_line_prefix = &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">#线上</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger --prefix &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h &#39;  /data/pgdata/data/log/*.csv -o /root/out.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##标准文本格式输出日志</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger -f stderr --prefix=’%t:%r:%u@%d:[%p]:’ -o /data/pgbadger.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##单个分析</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger /var/log/postgresql.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##批量分析</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger /var/log/postgresql/postgresql-2021-09-*</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##分析日志文件可以是多种格式的，如：压缩格式或者文本格式</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger /var/log/postgres.log.2.gz /var/log/postgres.log.1.gz /var/log/postgres.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##指定排除分析</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger --exclude-query=&quot;^(COPY|COMMIT)&quot; /var/log/postgresql.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##分析执行时间段的日志信息</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger -b “2012-06-25 10:56:11” -e “2012-06-25 10:59:11” /var/log/postgresql.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定使用的CPU数据进行解析</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger -j 8 /pglog/postgresql-10.1-main.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">##下载aws上postgresql_instance的日志信息</span></span>
<span class="line"><span style="color:#e1e4e8;">aws rds download-db-log-file-portion --region $region --db-instance-identifier $postgresql_instance --log-file-name error/postgresql.log --starting-token 0 --output text &gt; aa.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_line_prefix = &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h&#39;</span></span>
<span class="line"><span style="color:#24292e;">#线上</span></span>
<span class="line"><span style="color:#24292e;">pgbadger --prefix &#39;%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h &#39;  /data/pgdata/data/log/*.csv -o /root/out.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##标准文本格式输出日志</span></span>
<span class="line"><span style="color:#24292e;">pgbadger -f stderr --prefix=’%t:%r:%u@%d:[%p]:’ -o /data/pgbadger.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##单个分析</span></span>
<span class="line"><span style="color:#24292e;">pgbadger /var/log/postgresql.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##批量分析</span></span>
<span class="line"><span style="color:#24292e;">pgbadger /var/log/postgresql/postgresql-2021-09-*</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##分析日志文件可以是多种格式的，如：压缩格式或者文本格式</span></span>
<span class="line"><span style="color:#24292e;">pgbadger /var/log/postgres.log.2.gz /var/log/postgres.log.1.gz /var/log/postgres.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##指定排除分析</span></span>
<span class="line"><span style="color:#24292e;">pgbadger --exclude-query=&quot;^(COPY|COMMIT)&quot; /var/log/postgresql.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##分析执行时间段的日志信息</span></span>
<span class="line"><span style="color:#24292e;">pgbadger -b “2012-06-25 10:56:11” -e “2012-06-25 10:59:11” /var/log/postgresql.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定使用的CPU数据进行解析</span></span>
<span class="line"><span style="color:#24292e;">pgbadger -j 8 /pglog/postgresql-10.1-main.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">##下载aws上postgresql_instance的日志信息</span></span>
<span class="line"><span style="color:#24292e;">aws rds download-db-log-file-portion --region $region --db-instance-identifier $postgresql_instance --log-file-name error/postgresql.log --starting-token 0 --output text &gt; aa.log</span></span></code></pre></div><h3 id="每小时" tabindex="-1">每小时 <a class="header-anchor" href="#每小时" aria-label="Permalink to &quot;每小时&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">每小时</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger -q /xxx_log/*.log  -o /xxx.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">每小时</span></span>
<span class="line"><span style="color:#24292e;">pgbadger -q /xxx_log/*.log  -o /xxx.html</span></span></code></pre></div><h3 id="增量" tabindex="-1">增量 <a class="header-anchor" href="#增量" aria-label="Permalink to &quot;增量&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">每天每周</span></span>
<span class="line"><span style="color:#e1e4e8;">pgbadger  -I -q /xxx_log/*.log  -O /reports/ -f stderr</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">这种模式下，pgbadger 将在输出目录中创建一个自动增量文件，这意味可以在每周的日志文件上进行pgbadger,并且不会对日志条目计数两次，用cron 定时运行</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#月</span></span>
<span class="line"><span style="color:#e1e4e8;">if [[ $(date +%d) == 1 ]]; then</span></span>
<span class="line"><span style="color:#e1e4e8;">    PRE_MONTH=$(date -d &#39;1 months ago&#39; +%Y-%m)</span></span>
<span class="line"><span style="color:#e1e4e8;">    \${PGBADGER_CMD}  -q -I  --month-report \${PRE_MONTH}  \${PGBADGER_REPORT_PATH}</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;月报完成：\`date\`&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">每天每周</span></span>
<span class="line"><span style="color:#24292e;">pgbadger  -I -q /xxx_log/*.log  -O /reports/ -f stderr</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">这种模式下，pgbadger 将在输出目录中创建一个自动增量文件，这意味可以在每周的日志文件上进行pgbadger,并且不会对日志条目计数两次，用cron 定时运行</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#月</span></span>
<span class="line"><span style="color:#24292e;">if [[ $(date +%d) == 1 ]]; then</span></span>
<span class="line"><span style="color:#24292e;">    PRE_MONTH=$(date -d &#39;1 months ago&#39; +%Y-%m)</span></span>
<span class="line"><span style="color:#24292e;">    \${PGBADGER_CMD}  -q -I  --month-report \${PRE_MONTH}  \${PGBADGER_REPORT_PATH}</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;月报完成：\`date\`&quot;</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span></code></pre></div>`,29),o=[p];function t(r,c,i,d,g,y){return a(),e("div",null,o)}const b=s(l,[["render",t]]);export{u as __pageData,b as default};
