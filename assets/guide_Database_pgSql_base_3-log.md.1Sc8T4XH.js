import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"开启 PostgreSQL 日志","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/3-log.md","filePath":"guide/Database/pgSql/base/3-log.md","lastUpdated":1711694824000}'),e={name:"guide/Database/pgSql/base/3-log.md"},p=l(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 启动日志收集， 这是一个后台进程，抓取发送到stderr的日志消息，并会将他们重定向到日志文件。</span></span>
<span class="line"><span style="color:#e1e4e8;">logging_collector = on    </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 日志输出路径，可以是自定义绝对路径或相对于数据目录 PGDATA 的相对路径</span></span>
<span class="line"><span style="color:#e1e4e8;">log_directory = &#39;log&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 文件名，可以带上格式字符串</span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%a.log&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 当生成新的文件时，文件名已存在，则覆盖同名旧文件名</span></span>
<span class="line"><span style="color:#e1e4e8;">log_truncate_on_rotation  = on</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#设置日志记录内容，log_statement：none, ddl, mod, and all 默认是 none </span></span>
<span class="line"><span style="color:#e1e4e8;"># None表示不记录，ddl记录所有数据定义命令，比如CREATE,ALTER,和DROP语句，</span></span>
<span class="line"><span style="color:#e1e4e8;"># mod记录所有ddl语句,加上数据修改语句INSERT,UPDATE等</span></span>
<span class="line"><span style="color:#e1e4e8;"># all记录所有执行的语句，将此配置设置为all可跟踪整个数据库执行的SQL语句，但会对数据库性能产生较大影响，生产环境不建议配置此值</span></span>
<span class="line"><span style="color:#e1e4e8;">log_statement = mod</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 以上设置完成之后，可以记录到 update、drop 等，但是并不会记录 select 语句，加上 log_min_duration_statement = 0 才可以记录到select</span></span>
<span class="line"><span style="color:#e1e4e8;">log_min_duration_statement=0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 启动日志收集， 这是一个后台进程，抓取发送到stderr的日志消息，并会将他们重定向到日志文件。</span></span>
<span class="line"><span style="color:#24292e;">logging_collector = on    </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 日志输出路径，可以是自定义绝对路径或相对于数据目录 PGDATA 的相对路径</span></span>
<span class="line"><span style="color:#24292e;">log_directory = &#39;log&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 文件名，可以带上格式字符串</span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%a.log&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 当生成新的文件时，文件名已存在，则覆盖同名旧文件名</span></span>
<span class="line"><span style="color:#24292e;">log_truncate_on_rotation  = on</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#设置日志记录内容，log_statement：none, ddl, mod, and all 默认是 none </span></span>
<span class="line"><span style="color:#24292e;"># None表示不记录，ddl记录所有数据定义命令，比如CREATE,ALTER,和DROP语句，</span></span>
<span class="line"><span style="color:#24292e;"># mod记录所有ddl语句,加上数据修改语句INSERT,UPDATE等</span></span>
<span class="line"><span style="color:#24292e;"># all记录所有执行的语句，将此配置设置为all可跟踪整个数据库执行的SQL语句，但会对数据库性能产生较大影响，生产环境不建议配置此值</span></span>
<span class="line"><span style="color:#24292e;">log_statement = mod</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 以上设置完成之后，可以记录到 update、drop 等，但是并不会记录 select 语句，加上 log_min_duration_statement = 0 才可以记录到select</span></span>
<span class="line"><span style="color:#24292e;">log_min_duration_statement=0</span></span></code></pre></div><p><strong>有关日志配置</strong></p><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>logging_collector = on/off</td><td>是否将日志重定向至文件中，默认是off（修改后需重启DB）</td></tr><tr><td>log_directory=&#39;pg_log&#39;</td><td>日志文件目录，默认是\${PGDATA}的相对路径，即\${PGDATA}/pg_log，也可以改为绝对路径</td></tr><tr><td>log_filename = &#39;postgresql-%Y-%m-%d_%H%M%S.log&#39;</td><td>日志文件命名形式，使用默认即可</td></tr><tr><td>log_rotation_age = 1d</td><td>单个日志文件的生存期，默认1天，在日志文件大小没有达到log_rotation_size时，一天只生成一个日志文件</td></tr><tr><td>log_rotation_size = 10MB</td><td>单个日志文件的大小，如果超过将新生成一个日志文件</td></tr><tr><td>log_truncate_on_rotation = off</td><td>当日志文件已存在时，该配置如果为off，新生成的日志将在文件尾部追加，如果为on，则会覆盖原来的日志</td></tr><tr><td>log_lock_waits = off</td><td>控制当一个会话等待时间超过deadlock_timeout而被锁时是否产生一个日志信息。在判断一个锁等待是否会影响性能时是有用的，缺省是off</td></tr><tr><td>log_statement = &#39;none&#39;</td><td># none, ddl, mod, all 控制记录哪些SQL语句。none不记录，ddl记录所有数据定义命令，比如CREATE,ALTER,和DROP 语句。mod记录所有ddl语句,加上数据修改语句INSERT,UPDATE等,all记录所有执行的语句，将此配置设置为all可跟踪整个数据库执行的SQL语句</td></tr><tr><td>log_duration = off</td><td>记录每条SQL语句执行完成消耗的时间，将此配置设置为on,用于统计哪些SQL语句耗时较长</td></tr><tr><td>log_min_duration_statement = -1</td><td># -1 is disabled, 0 logs all statements and their durations, &gt; 0 logs only statements running at least this number of milliseconds<br>-1表示不可用，0将记录所有SQL语句和它们的耗时，&gt;0只记录那些耗时超过（或等于）这个值（ms）的SQL语句。使用log_statement和log_duration也能够统计SQL语句及耗时，log_min_duration_statement会将SQL语句和耗时在同一行记录，更方便阅读</td></tr><tr><td>log_connections = off</td><td>是否记录连接日志</td></tr><tr><td>log_disconnections = off</td><td>是否记录连接断开日志</td></tr><tr><td>log_line_prefix = &#39;%m %p %u %d %r &#39;</td><td>日志输出格式（%m,%p实际意义配置文件中有解释）,可根据自己需要设置（能够记录时间，用户名称，数据库名称，客户端IP和端口，方便定位问题）</td></tr><tr><td>log_timezone = &#39;Asia/Shanghai&#39;</td><td>日志时区，最好和服务器设置同一个时区，方便问题定位</td></tr><tr><td>log_lock_waits = on</td><td>记录sql语句长时间锁，off关闭（控制当一个会话等待时间超过deadlock_timeout而被锁时是否产生一个）</td></tr><tr><td>log_error_verbosity</td><td>默认为default，verbose表示冗长的</td></tr><tr><td>log_connections</td><td>用户session登陆时是否写入日志，默认off</td></tr><tr><td>log_disconnections</td><td>用户session退出时是否写入日志，默认off</td></tr><tr><td></td><td></td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#   %a = application name   # （能够记录时间，用户名称，数据库名称，客户端IP和端口，sql语句方便定位问题）</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %u = user name</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %d = database name</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %r = remote host and port</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %h = remote host</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %p = process ID</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %t = timestamp without milliseconds</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %m = timestamp with milliseconds</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %n = timestamp with milliseconds (as a Unix epoch)</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %i = command tag</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %e = SQL state</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %c = session ID</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %l = session line number</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %s = session start timestamp</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %v = virtual transaction ID</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %x = transaction ID (0 if none)</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %q = stop here in non-session</span></span>
<span class="line"><span style="color:#e1e4e8;">					#        processes</span></span>
<span class="line"><span style="color:#e1e4e8;">					#   %% = &#39;%&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#   %a = application name   # （能够记录时间，用户名称，数据库名称，客户端IP和端口，sql语句方便定位问题）</span></span>
<span class="line"><span style="color:#24292e;">					#   %u = user name</span></span>
<span class="line"><span style="color:#24292e;">					#   %d = database name</span></span>
<span class="line"><span style="color:#24292e;">					#   %r = remote host and port</span></span>
<span class="line"><span style="color:#24292e;">					#   %h = remote host</span></span>
<span class="line"><span style="color:#24292e;">					#   %p = process ID</span></span>
<span class="line"><span style="color:#24292e;">					#   %t = timestamp without milliseconds</span></span>
<span class="line"><span style="color:#24292e;">					#   %m = timestamp with milliseconds</span></span>
<span class="line"><span style="color:#24292e;">					#   %n = timestamp with milliseconds (as a Unix epoch)</span></span>
<span class="line"><span style="color:#24292e;">					#   %i = command tag</span></span>
<span class="line"><span style="color:#24292e;">					#   %e = SQL state</span></span>
<span class="line"><span style="color:#24292e;">					#   %c = session ID</span></span>
<span class="line"><span style="color:#24292e;">					#   %l = session line number</span></span>
<span class="line"><span style="color:#24292e;">					#   %s = session start timestamp</span></span>
<span class="line"><span style="color:#24292e;">					#   %v = virtual transaction ID</span></span>
<span class="line"><span style="color:#24292e;">					#   %x = transaction ID (0 if none)</span></span>
<span class="line"><span style="color:#24292e;">					#   %q = stop here in non-session</span></span>
<span class="line"><span style="color:#24292e;">					#        processes</span></span>
<span class="line"><span style="color:#24292e;">					#   %% = &#39;%&#39;</span></span></code></pre></div><p>记录用户登陆数据库后的各种操作，postgres日志里分成了3类，通过参数pg_statement来控制，默认的pg_statement参数值是none，即不记录，可以设置ddl(记录create,drop和alter)、mod(记录ddl+insert,delete,update和truncate)和all(mod+select)</p><h1 id="开启-postgresql-日志" tabindex="-1">开启 PostgreSQL 日志 <a class="header-anchor" href="#开启-postgresql-日志" aria-label="Permalink to &quot;开启 PostgreSQL 日志&quot;">​</a></h1><h2 id="_1-配置文件" tabindex="-1">1.配置文件 <a class="header-anchor" href="#_1-配置文件" aria-label="Permalink to &quot;1.配置文件&quot;">​</a></h2><p>一般的错误跟踪，只需在配置文件 vi<code>postgresql.conf</code> 简单设置几个参数，当然还有错误级别等要设置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">logging_collector = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_destination = &#39;stderr&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">log_directory = &#39;log&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%Y-%m-%d_%H%M%S.log&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_age = 1440             #minute,多长时间创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_size = 10240           #kb,文件多大后创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#e1e4e8;">log_truncate_on_rotation = on       #可重用同名日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#慢语句</span></span>
<span class="line"><span style="color:#e1e4e8;">log_statement = all  #需设置跟踪所有语句，否则只能跟踪出错信息，有4种类型：none(默认), ddl, mod, all。跟踪所有语句时可设置为 &quot;all&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">log_min_duration_statement = 5000   #milliseconds,记录执行5秒及以上的语句</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">当 log_statement=all 和 log_min_duration_statement 同时设置时，将跟踪所有语句，忽略log_min_duration_statement 设置。所以需按情况设置其中一个或两个值？？？</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">logging_collector = on</span></span>
<span class="line"><span style="color:#24292e;">log_destination = &#39;stderr&#39;</span></span>
<span class="line"><span style="color:#24292e;">log_directory = &#39;log&#39;</span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%Y-%m-%d_%H%M%S.log&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_rotation_age = 1440             #minute,多长时间创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#24292e;">log_rotation_size = 10240           #kb,文件多大后创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#24292e;">log_truncate_on_rotation = on       #可重用同名日志文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#慢语句</span></span>
<span class="line"><span style="color:#24292e;">log_statement = all  #需设置跟踪所有语句，否则只能跟踪出错信息，有4种类型：none(默认), ddl, mod, all。跟踪所有语句时可设置为 &quot;all&quot;</span></span>
<span class="line"><span style="color:#24292e;">log_min_duration_statement = 5000   #milliseconds,记录执行5秒及以上的语句</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">当 log_statement=all 和 log_min_duration_statement 同时设置时，将跟踪所有语句，忽略log_min_duration_statement 设置。所以需按情况设置其中一个或两个值？？？</span></span></code></pre></div><h2 id="_2-查询设置状态" tabindex="-1">2.查询设置状态 <a class="header-anchor" href="#_2-查询设置状态" aria-label="Permalink to &quot;2.查询设置状态&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#以管理员查查</span></span>
<span class="line"><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">,setting,vartype,boot_val,reset_val </span></span>
<span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> pg_settings </span></span>
<span class="line"><span style="color:#F97583;">WHERE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">IN</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&#39;logging_collector&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;log_destination&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;log_directory&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&#39;log_filename&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">        |          setting           | vartype |            boot_val            |         reset_val          </span></span>
<span class="line"><span style="color:#6A737D;">-------------------+----------------------------+---------+--------------------------------+----------------------------</span></span>
<span class="line"><span style="color:#E1E4E8;"> log_destination   | csvlog                     | string  | stderr                         | csvlog</span></span>
<span class="line"><span style="color:#E1E4E8;"> log_directory     | </span><span style="color:#F97583;">log</span><span style="color:#E1E4E8;">                        | string  | </span><span style="color:#F97583;">log</span><span style="color:#E1E4E8;">                            | </span><span style="color:#F97583;">log</span></span>
<span class="line"><span style="color:#E1E4E8;"> log_filename      | postgresql</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%Y</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%m</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%d_%H%M%S | string  | postgresql</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%Y</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%m</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%d_%H%M%</span><span style="color:#79B8FF;">S</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">log</span><span style="color:#E1E4E8;"> | postgresql</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%Y</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%m</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">%d_%H%M%S</span></span>
<span class="line"><span style="color:#E1E4E8;"> logging_collector | </span><span style="color:#F97583;">on</span><span style="color:#E1E4E8;">                         | bool    | </span><span style="color:#F97583;">off</span><span style="color:#E1E4E8;">                            | </span><span style="color:#F97583;">on</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">rows</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#以管理员查查</span></span>
<span class="line"><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">,setting,vartype,boot_val,reset_val </span></span>
<span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> pg_settings </span></span>
<span class="line"><span style="color:#D73A49;">WHERE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">IN</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&#39;logging_collector&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;log_destination&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;log_directory&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&#39;log_filename&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">name</span><span style="color:#24292E;">        |          setting           | vartype |            boot_val            |         reset_val          </span></span>
<span class="line"><span style="color:#6A737D;">-------------------+----------------------------+---------+--------------------------------+----------------------------</span></span>
<span class="line"><span style="color:#24292E;"> log_destination   | csvlog                     | string  | stderr                         | csvlog</span></span>
<span class="line"><span style="color:#24292E;"> log_directory     | </span><span style="color:#D73A49;">log</span><span style="color:#24292E;">                        | string  | </span><span style="color:#D73A49;">log</span><span style="color:#24292E;">                            | </span><span style="color:#D73A49;">log</span></span>
<span class="line"><span style="color:#24292E;"> log_filename      | postgresql</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%Y</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%m</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%d_%H%M%S | string  | postgresql</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%Y</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%m</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%d_%H%M%</span><span style="color:#005CC5;">S</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">log</span><span style="color:#24292E;"> | postgresql</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%Y</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%m</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">%d_%H%M%S</span></span>
<span class="line"><span style="color:#24292E;"> logging_collector | </span><span style="color:#D73A49;">on</span><span style="color:#24292E;">                         | bool    | </span><span style="color:#D73A49;">off</span><span style="color:#24292E;">                            | </span><span style="color:#D73A49;">on</span></span>
<span class="line"><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">rows</span><span style="color:#24292E;">)</span></span></code></pre></div><h2 id="_3-完整配置" tabindex="-1">3.完整配置 <a class="header-anchor" href="#_3-完整配置" aria-label="Permalink to &quot;3.完整配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /data/pgdata/data/postgresql.conf </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">listen_addresses = &#39;*&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">port = 5432 </span></span>
<span class="line"><span style="color:#e1e4e8;">max_connections = 100 </span></span>
<span class="line"><span style="color:#e1e4e8;">superuser_reserved_connections = 10 </span></span>
<span class="line"><span style="color:#e1e4e8;">full_page_writes = on </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_log_hints = off </span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby = on </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">unix_socket_directories = &#39;/tmp&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">shared_buffers = 512MB </span></span>
<span class="line"><span style="color:#e1e4e8;">temp_buffers = 16MB </span></span>
<span class="line"><span style="color:#e1e4e8;">work_mem = 3MB </span></span>
<span class="line"><span style="color:#e1e4e8;">effective_cache_size = 2GB </span></span>
<span class="line"><span style="color:#e1e4e8;">maintenance_work_mem = 128MB </span></span>
<span class="line"><span style="color:#e1e4e8;">#max_stack_depth = 2MB </span></span>
<span class="line"><span style="color:#e1e4e8;">dynamic_shared_memory_type = posix </span></span>
<span class="line"><span style="color:#e1e4e8;">## PITR full_page_writes = on </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_keep_segments = 2048</span></span>
<span class="line"><span style="color:#e1e4e8;">wal_buffers = 16MB </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_writer_delay = 200ms </span></span>
<span class="line"><span style="color:#e1e4e8;">commit_delay = 0 </span></span>
<span class="line"><span style="color:#e1e4e8;">commit_siblings = 5 </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level = replica </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_mode = on </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_command = &#39;test ! -f /data/pgdata/archivedir/%f &amp;&amp; cp %p /data/pgdata/archivedir/%f&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_timeout = 60s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_destination = &#39;csvlog&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">logging_collector = on </span></span>
<span class="line"><span style="color:#e1e4e8;">log_directory = &#39;log&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%Y-%m-%d-%w.log&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_age = 1d </span></span>
<span class="line"><span style="color:#e1e4e8;">log_statement = ddl</span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_size = 10MB  </span></span>
<span class="line"><span style="color:#e1e4e8;">log_timezone = &#39;PRC&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">timezone = &#39;PRC&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 记录执行慢的SQL</span></span>
<span class="line"><span style="color:#e1e4e8;">log_min_duration_statement = 3s</span></span>
<span class="line"><span style="color:#e1e4e8;">log_checkpoints = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_lock_waits = on</span></span>
<span class="line"><span style="color:#e1e4e8;">deadlock_timeout = 1s</span></span>
<span class="line"><span style="color:#e1e4e8;">log_connections = off</span></span>
<span class="line"><span style="color:#e1e4e8;">log_disconnections = off</span></span>
<span class="line"><span style="color:#e1e4e8;">log_duration = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_line_prefix = &#39;%m %p %u %d %r %e&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_truncate_on_rotation = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_error_verbosity = verbose</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /data/pgdata/data/postgresql.conf </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">listen_addresses = &#39;*&#39; </span></span>
<span class="line"><span style="color:#24292e;">port = 5432 </span></span>
<span class="line"><span style="color:#24292e;">max_connections = 100 </span></span>
<span class="line"><span style="color:#24292e;">superuser_reserved_connections = 10 </span></span>
<span class="line"><span style="color:#24292e;">full_page_writes = on </span></span>
<span class="line"><span style="color:#24292e;">wal_log_hints = off </span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#24292e;">hot_standby = on </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">unix_socket_directories = &#39;/tmp&#39; </span></span>
<span class="line"><span style="color:#24292e;">shared_buffers = 512MB </span></span>
<span class="line"><span style="color:#24292e;">temp_buffers = 16MB </span></span>
<span class="line"><span style="color:#24292e;">work_mem = 3MB </span></span>
<span class="line"><span style="color:#24292e;">effective_cache_size = 2GB </span></span>
<span class="line"><span style="color:#24292e;">maintenance_work_mem = 128MB </span></span>
<span class="line"><span style="color:#24292e;">#max_stack_depth = 2MB </span></span>
<span class="line"><span style="color:#24292e;">dynamic_shared_memory_type = posix </span></span>
<span class="line"><span style="color:#24292e;">## PITR full_page_writes = on </span></span>
<span class="line"><span style="color:#24292e;">wal_keep_segments = 2048</span></span>
<span class="line"><span style="color:#24292e;">wal_buffers = 16MB </span></span>
<span class="line"><span style="color:#24292e;">wal_writer_delay = 200ms </span></span>
<span class="line"><span style="color:#24292e;">commit_delay = 0 </span></span>
<span class="line"><span style="color:#24292e;">commit_siblings = 5 </span></span>
<span class="line"><span style="color:#24292e;">wal_level = replica </span></span>
<span class="line"><span style="color:#24292e;">archive_mode = on </span></span>
<span class="line"><span style="color:#24292e;">archive_command = &#39;test ! -f /data/pgdata/archivedir/%f &amp;&amp; cp %p /data/pgdata/archivedir/%f&#39; </span></span>
<span class="line"><span style="color:#24292e;">archive_timeout = 60s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_destination = &#39;csvlog&#39; </span></span>
<span class="line"><span style="color:#24292e;">logging_collector = on </span></span>
<span class="line"><span style="color:#24292e;">log_directory = &#39;log&#39; </span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%Y-%m-%d-%w.log&#39; </span></span>
<span class="line"><span style="color:#24292e;">log_rotation_age = 1d </span></span>
<span class="line"><span style="color:#24292e;">log_statement = ddl</span></span>
<span class="line"><span style="color:#24292e;">log_rotation_size = 10MB  </span></span>
<span class="line"><span style="color:#24292e;">log_timezone = &#39;PRC&#39; </span></span>
<span class="line"><span style="color:#24292e;">timezone = &#39;PRC&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 记录执行慢的SQL</span></span>
<span class="line"><span style="color:#24292e;">log_min_duration_statement = 3s</span></span>
<span class="line"><span style="color:#24292e;">log_checkpoints = on</span></span>
<span class="line"><span style="color:#24292e;">log_lock_waits = on</span></span>
<span class="line"><span style="color:#24292e;">deadlock_timeout = 1s</span></span>
<span class="line"><span style="color:#24292e;">log_connections = off</span></span>
<span class="line"><span style="color:#24292e;">log_disconnections = off</span></span>
<span class="line"><span style="color:#24292e;">log_duration = on</span></span>
<span class="line"><span style="color:#24292e;">log_line_prefix = &#39;%m %p %u %d %r %e&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_truncate_on_rotation = on</span></span>
<span class="line"><span style="color:#24292e;">log_error_verbosity = verbose</span></span></code></pre></div><ul><li>过滤慢日志</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">注意</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">“duration:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2113.625</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ms”</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgresql-2014-06-17_215</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;duration: [0-9].* ms&quot;</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">awk</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-F</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;statement:| ms|duration: &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{b=2000;if($2-b&gt;0) print $0}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">注意</span><span style="color:#24292E;"> </span><span style="color:#032F62;">“duration:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2113.625</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ms”</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgresql-2014-06-17_215</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;duration: [0-9].* ms&quot;</span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">awk</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-F</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;statement:| ms|duration: &#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{b=2000;if($2-b&gt;0) print $0}&#39;</span></span></code></pre></div><h2 id="_4-保留日志时间" tabindex="-1">4.保留日志时间 <a class="header-anchor" href="#_4-保留日志时间" aria-label="Permalink to &quot;4.保留日志时间&quot;">​</a></h2><p>为了让日志文件自动覆盖，达到保留多少日志的目的，可以进行如下设置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_truncate_on_rotation = on</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%I.log&#39; #最多保存12小时的日志,每小时一个文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%H.log&#39; #最多保存24小时的日志,每小时一个文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%w.log&#39; #最多保存一周的日志,每天一个文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%d.log&#39; #最多保存一个月的日志,每天一个文件</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%j.log&#39; #最多保存一年的日志,每天一个文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_truncate_on_rotation = on</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%I.log&#39; #最多保存12小时的日志,每小时一个文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%H.log&#39; #最多保存24小时的日志,每小时一个文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%w.log&#39; #最多保存一周的日志,每天一个文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%d.log&#39; #最多保存一个月的日志,每天一个文件</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%j.log&#39; #最多保存一年的日志,每天一个文件</span></span></code></pre></div><h1 id="二、日志压缩" tabindex="-1">二、日志压缩 <a class="header-anchor" href="#二、日志压缩" aria-label="Permalink to &quot;二、日志压缩&quot;">​</a></h1><p>archive_command 是 postgresql.conf 里的参</p><p>restore_command 是 recovery.conf 里的参数</p><h2 id="_2-1非压缩" tabindex="-1">2.1非压缩 <a class="header-anchor" href="#_2-1非压缩" aria-label="Permalink to &quot;2.1非压缩&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">archive_command = &#39;cp %p /data/backup/pgwalarchive/%f &amp;&amp; echo %f &gt;&gt; /data/backup/pgwalarchive/archive.list&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">restore_command = &#39;cp /data/backup/pgwalarchive/%f %p&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">archive_command = &#39;cp %p /data/backup/pgwalarchive/%f &amp;&amp; echo %f &gt;&gt; /data/backup/pgwalarchive/archive.list&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">restore_command = &#39;cp /data/backup/pgwalarchive/%f %p&#39;</span></span></code></pre></div><h2 id="_2-2压缩-gzip" tabindex="-1">2.2压缩 gzip <a class="header-anchor" href="#_2-2压缩-gzip" aria-label="Permalink to &quot;2.2压缩 gzip&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">archive_command = &#39;gzip &lt; %p &gt; /data/backup/pgwalarchive/%f.gz&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">restore_command = &#39;gunzip &lt; /data/backup/pgwalarchive/%f.gz &gt; %p&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">archive_command = &#39;gzip &lt; %p &gt; /data/backup/pgwalarchive/%f.gz&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">restore_command = &#39;gunzip &lt; /data/backup/pgwalarchive/%f.gz &gt; %p&#39;</span></span></code></pre></div><h2 id="_2-3压缩-bzip2" tabindex="-1">2.3压缩 bzip2 <a class="header-anchor" href="#_2-3压缩-bzip2" aria-label="Permalink to &quot;2.3压缩 bzip2&quot;">​</a></h2><p>主要用户二进制和大文件。经测试，压缩率比 gzip 要好很多</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">archive_command = &#39;bzip2 &lt; %p &gt; /data/backup/pgwalarchive/%f.bz2&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">restore_command = &#39;bunzip2 &lt; /data/backup/pgwalarchive/%f.bz2 &gt; %p&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">archive_command = &#39;bzip2 &lt; %p &gt; /data/backup/pgwalarchive/%f.bz2&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">restore_command = &#39;bunzip2 &lt; /data/backup/pgwalarchive/%f.bz2 &gt; %p&#39;</span></span></code></pre></div><h2 id="_2-4压缩-lz4" tabindex="-1">2.4压缩 lz4 <a class="header-anchor" href="#_2-4压缩-lz4" aria-label="Permalink to &quot;2.4压缩 lz4&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">archive_command = &#39;lz4 -f -q -z %p /data/backup/pgwalarchive/%f.lz4&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">restore_command = &#39;lz4 -f -q -d /data/backup/pgwalarchive/%f.lz4 %p&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">archive_command = &#39;lz4 -f -q -z %p /data/backup/pgwalarchive/%f.lz4&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">restore_command = &#39;lz4 -f -q -d /data/backup/pgwalarchive/%f.lz4 %p&#39;</span></span></code></pre></div><h1 id="三、pgsql共三类日志文件" tabindex="-1">三、pgsql共三类日志文件 <a class="header-anchor" href="#三、pgsql共三类日志文件" aria-label="Permalink to &quot;三、pgsql共三类日志文件&quot;">​</a></h1><p>pg12.2</p><p>pg_xlog ---- pg_wal （WAL 日志，即重做日志） 强制开启</p><p>pg_clog ---- pg_xact （事务提交日志，记录的是事务的元数据） 内容一般不具有可读性 强制开启</p><p>pg_log ---- log （数据库运行日志） 内容可读 默认关闭的，需要设置参数启动</p><h2 id="_3-1pg-wal-write-ahead-log" tabindex="-1">3.1pg_wal（write ahead log） <a class="header-anchor" href="#_3-1pg-wal-write-ahead-log" aria-label="Permalink to &quot;3.1pg_wal（write ahead log）&quot;">​</a></h2><p>由文件名可以知道为重做日志，类似mysql和oralce中的undo log，二进制文件，一般WAL机制的引入，可以保证事物的持久性和数据的完整性。同时也解决了写入磁盘的耗时操作</p><p>具体步骤：</p><p>数据更新或者插入：先写入WAL BUFFER中，再将更新或插入后的数据写入DATA BUFFER中</p><p>数据提交后：WAL BUFFER中的内容写入磁盘，DATA BUFFER写入磁盘推迟</p><p>CHECKPOINT发生时：将所有DATA BUFFER数据写到磁盘</p><h2 id="_3-2pg-xact" tabindex="-1">3.2pg_xact <a class="header-anchor" href="#_3-2pg-xact" aria-label="Permalink to &quot;3.2pg_xact&quot;">​</a></h2><p>这个目录下的文件也是事务日志文件，但与pg_wal不同的是它记录的是事务的元数据（metadata），这个日志文件主要功能为记录事务的状态，这个日志文件一般非常小，但很重要，不得随意删除修改,手动直接rm删除导致不能启动数据库</p><h2 id="_3-3pg-log" tabindex="-1">3.3pg_log <a class="header-anchor" href="#_3-3pg-log" aria-label="Permalink to &quot;3.3pg_log&quot;">​</a></h2><p>pg_log记录各种运行、Error信息，以及服务器和DB的状态信息，定位慢查询SQL，数据库的启动关闭信息类似mysql的catalog和oracle的alter日志。当数据库出现问题时，应该首先查看这个日志文件</p><p>该日志有.csv格式和.log。个人建议用前一种，因为一般会按大小和时间自动切割，毕竟查看一个巨大的日志文件比查看不同时间段的多个日志要难得多。另外这种日志是可以被清理删除，压缩打包或者转移，同时并不影响DB的正常运行</p>`,46),o=[p];function t(c,r,i,d,y,g){return a(),n("div",null,o)}const h=s(e,[["render",t]]);export{m as __pageData,h as default};
