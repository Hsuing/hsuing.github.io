import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.单机安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/1_binary_install.md","filePath":"guide/Database/mongodb/1_binary_install.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/1_binary_install.md"},p=e(`<h1 id="_1-单机安装" tabindex="-1">1.单机安装 <a class="header-anchor" href="#_1-单机安装" aria-label="Permalink to &quot;1.单机安装&quot;">​</a></h1><h2 id="_1-1-软件包的下载" tabindex="-1">1.1 软件包的下载 <a class="header-anchor" href="#_1-1-软件包的下载" aria-label="Permalink to &quot;1.1 软件包的下载&quot;">​</a></h2><p>下载地址：<a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noreferrer">https://www.mongodb.com/try/download/community</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100940332.jpg" alt=""></p><h2 id="_1-2关闭" tabindex="-1">1.2关闭 <a class="header-anchor" href="#_1-2关闭" aria-label="Permalink to &quot;1.2关闭&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 关闭服务器指令</span></span>
<span class="line"><span style="color:#e1e4e8;">mongod --shutdown --dbpath /data/mongodb_data/data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 关闭服务器指令</span></span>
<span class="line"><span style="color:#24292e;">mongod --shutdown --dbpath /data/mongodb_data/data</span></span></code></pre></div><h2 id="_1-3systemd方式" tabindex="-1">1.3systemd方式 <a class="header-anchor" href="#_1-3systemd方式" aria-label="Permalink to &quot;1.3systemd方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /usr/lib/systemd/system/mongodb.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description= mongodb service manager</span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;"># Other directives omitted</span></span>
<span class="line"><span style="color:#e1e4e8;"># (file size)</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitFSIZE=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># (cpu time)</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitCPU=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># (virtual memory size)</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitAS=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># (locked-in-memory size)</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitMEMLOCK=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># (open files)</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNOFILE=64000</span></span>
<span class="line"><span style="color:#e1e4e8;"># (processes/threads)</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNPROC=64000</span></span>
<span class="line"><span style="color:#e1e4e8;">Type=forking</span></span>
<span class="line"><span style="color:#e1e4e8;">User=mongodb</span></span>
<span class="line"><span style="color:#e1e4e8;">Group=mongodb</span></span>
<span class="line"><span style="color:#e1e4e8;">PIDFile=/opt/mongodb/logs/mongod.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart= /opt/mongodb/bin/mongod -f /opt/mongodb/mongodb_rep.yaml</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStop= /opt/mongodb/bin/mongod --shutdown   --dbpath /opt/mongodb/data</span></span>
<span class="line"><span style="color:#e1e4e8;">Restart=always</span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /usr/lib/systemd/system/mongodb.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description= mongodb service manager</span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;"># Other directives omitted</span></span>
<span class="line"><span style="color:#24292e;"># (file size)</span></span>
<span class="line"><span style="color:#24292e;">LimitFSIZE=infinity</span></span>
<span class="line"><span style="color:#24292e;"># (cpu time)</span></span>
<span class="line"><span style="color:#24292e;">LimitCPU=infinity</span></span>
<span class="line"><span style="color:#24292e;"># (virtual memory size)</span></span>
<span class="line"><span style="color:#24292e;">LimitAS=infinity</span></span>
<span class="line"><span style="color:#24292e;"># (locked-in-memory size)</span></span>
<span class="line"><span style="color:#24292e;">LimitMEMLOCK=infinity</span></span>
<span class="line"><span style="color:#24292e;"># (open files)</span></span>
<span class="line"><span style="color:#24292e;">LimitNOFILE=64000</span></span>
<span class="line"><span style="color:#24292e;"># (processes/threads)</span></span>
<span class="line"><span style="color:#24292e;">LimitNPROC=64000</span></span>
<span class="line"><span style="color:#24292e;">Type=forking</span></span>
<span class="line"><span style="color:#24292e;">User=mongodb</span></span>
<span class="line"><span style="color:#24292e;">Group=mongodb</span></span>
<span class="line"><span style="color:#24292e;">PIDFile=/opt/mongodb/logs/mongod.pid</span></span>
<span class="line"><span style="color:#24292e;">ExecStart= /opt/mongodb/bin/mongod -f /opt/mongodb/mongodb_rep.yaml</span></span>
<span class="line"><span style="color:#24292e;">ExecStop= /opt/mongodb/bin/mongod --shutdown   --dbpath /opt/mongodb/data</span></span>
<span class="line"><span style="color:#24292e;">Restart=always</span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span></code></pre></div><h2 id="_1-4配置讲解" tabindex="-1">1.4配置讲解 <a class="header-anchor" href="#_1-4配置讲解" aria-label="Permalink to &quot;1.4配置讲解&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 数据文件位置</span></span>
<span class="line"><span style="color:#e1e4e8;">dbpath = /opt/module/mongoData</span></span>
<span class="line"><span style="color:#e1e4e8;"># 日志文件位置</span></span>
<span class="line"><span style="color:#e1e4e8;">logpath = /opt/module/mongoLog/mongodb.log</span></span>
<span class="line"><span style="color:#e1e4e8;"># 以追加方式写入日志，true为追加。false是覆盖</span></span>
<span class="line"><span style="color:#e1e4e8;">logappend = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 日志输出都发送到主机的syslog系统，而不是标准输出到logpath指定日志文件。syslog和logpath不能一起用，会报错：Cant use both a logpath and syslog</span></span>
<span class="line"><span style="color:#e1e4e8;"># syslog = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 绑定地址。默认127.0.0.1，只能通过本地连接。进程绑定和监听来自这个地址上的应用连接。要是需要给其他服务器连接，则需要注释掉这个或则 把IP改成本机地址，</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如192.168.200.201[其他服务器用 mongo --host=192.168.200.201 连接] ，可以用一个逗号分隔的列表绑定多个IP地址。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 远程访问则配置为0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;"># bind_ip = 127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认端口27017</span></span>
<span class="line"><span style="color:#e1e4e8;">port = 27017</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否后台运行，设置为true 启动 进程在后台运行的守护进程模式。默认false。</span></span>
<span class="line"><span style="color:#e1e4e8;">fork = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 安静模式。这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false</span></span>
<span class="line"><span style="color:#e1e4e8;">quiet = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用日志文件，默认启用</span></span>
<span class="line"><span style="color:#e1e4e8;">journal = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 刷写提交机制，默认是30ms或则100ms。较低的值，会更消耗磁盘的性能。此选项接受2和300毫秒之间的值：</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果单块设备提供日志和数据文件，默认的日记提交时间间隔为100毫秒。如果不同的块设备提供的日志和数据文件，默认的日记提交的时间间隔为30毫秒。</span></span>
<span class="line"><span style="color:#e1e4e8;"># journalCommitInterval=100</span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用定期记录CPU利用率和 I/O 等待，设置为true会强制mongodb每4s报告cpu利用率和io等待，把日志信息写到标准输出或日志文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认为false。开启日志会出现：1.Mon Jun 10 10:21:42.241 [snapshotthread] cpu: elapsed:4000 writelock: 0%</span></span>
<span class="line"><span style="color:#e1e4e8;"># cpu = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 用户认证，默认false。不需要认证。当设置为true时候，进入数据库需要auth验证，当数据库里没有用户，则不需要验证也可以操作。直到创建了第一个用户，之后操作都需要验证。</span></span>
<span class="line"><span style="color:#e1e4e8;"># noauth = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># auth = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 详细记录输出</span></span>
<span class="line"><span style="color:#e1e4e8;"># verbose = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置oplog记录等级 0=off (default) 1=W 2=R 3=both 7=W+some reads</span></span>
<span class="line"><span style="color:#e1e4e8;"># diaglog = 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 动态调试项</span></span>
<span class="line"><span style="color:#e1e4e8;"># nocursors = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 忽略查询提示</span></span>
<span class="line"><span style="color:#e1e4e8;"># nohints = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 指定的复制操作日志（OPLOG）的最大大小。mongod创建一个OPLOG的大小基于最大可用空间量。对于64位系统，OPLOG通常是5％的可用磁盘空间。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 一旦mongod第一次创建OPLOG，改变oplogSize将不会影响OPLOG的大小。</span></span>
<span class="line"><span style="color:#e1e4e8;"># oplogSize = 1024</span></span>
<span class="line"><span style="color:#e1e4e8;"># 指定存储身份验证信息的密钥文件的路径，默认缺省</span></span>
<span class="line"><span style="color:#e1e4e8;"># keyFile = /path/to/keyfile</span></span>
<span class="line"><span style="color:#e1e4e8;"># 最大连接数。默认值：取决于系统（即的ulimit和文件描述符）限制。MongoDB中不会限制其自身的连接。当设置大于系统的限制，则无效，以系统限制为准。这对于客户端创建很多“表”，</span></span>
<span class="line"><span style="color:#e1e4e8;"># 允许连接超时而不关闭“表”的时候很有用。设置该值的高于连接池和总连接数的大小，以防止尖峰时 候的连接。注意：不能设置该值大于20000。</span></span>
<span class="line"><span style="color:#e1e4e8;"># maxConns = 100</span></span>
<span class="line"><span style="color:#e1e4e8;"># 强制验证客户端请求。2.4的默认设置为objcheck成为true，在早期版本objcheck默认为false。因为它强制验证客户端请求，确保客户端绝不插入无效文件到数据库中。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 对于嵌套文档的对象，会有一点性能影响。设置noobjcheck 关闭。</span></span>
<span class="line"><span style="color:#e1e4e8;"># objcheck = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 同上，默认false</span></span>
<span class="line"><span style="color:#e1e4e8;"># noobjcheck = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 进程ID，没有指定则启动时候就没有PID文件。默认缺省。</span></span>
<span class="line"><span style="color:#e1e4e8;"># pidfilepath = /var/run/mongo.pid</span></span>
<span class="line"><span style="color:#e1e4e8;"># 套接字文件，默认为false，有生成socket文件。当设置为true时，不会生成socket文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># nounixsocket = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 套接字文件路径，默认/tmp</span></span>
<span class="line"><span style="color:#e1e4e8;"># unixSocketPrefix = /tmp</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置为true，修改数据目录存储模式，每个数据库的文件存储在DBPATH指定目录的不同的文件夹中。使用此选项，可以配置的MongoDB将数据存储在不同的磁盘设备上，以提高写入吞吐量或磁盘容量。默认为false。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意：要是在运行一段时间的数据库中，开启该参数，会导致原始的数据都会消失（注释参数则会回来）。因为数据目录都不同了，除非迁移现有的数据文件到directoryperdb产生的数据库目录中</span></span>
<span class="line"><span style="color:#e1e4e8;"># directoryperdb = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否支持ipv6，默认false</span></span>
<span class="line"><span style="color:#e1e4e8;"># ipv6 = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否允许JSONP访问通过一个HTTP接口，默认false。</span></span>
<span class="line"><span style="color:#e1e4e8;"># jsonp = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否禁止http接口，即28017 端口开启的服务。默认false，支持</span></span>
<span class="line"><span style="color:#e1e4e8;"># nohttpinterface = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 预分配方式。默认false：使用预分配方式来保证写入性能的稳定，预分配在后台进行，并且每个预分配的文件都用0进行填充。这会让MongoDB始终保持额外的空间和空余的数据文件，</span></span>
<span class="line"><span style="color:#e1e4e8;"># 从而避免了数据增长过快而带来的分配磁盘空间引起的阻塞。设置noprealloc= true来禁用预分配的数据文件，会缩短启动时间，但在正常操作过程中，可能会导致性能显著下降。</span></span>
<span class="line"><span style="color:#e1e4e8;"># noprealloc = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否禁止脚本引擎。默认是false：不禁止。ture：禁止。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 要是设置成true：运行一些脚本的时候会出现：JavaScript execution failed: group command failed: { &quot;ok&quot; : 0, &quot;errmsg&quot; : &quot;server-side JavaScript execution is disabled&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"># noscripting = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否禁止表扫描操作。默认false：不禁止，ture：禁止</span></span>
<span class="line"><span style="color:#e1e4e8;"># 禁止要是执行表扫描会出现：error: { &quot;$err&quot; : &quot;table scans not allowed:test.emp&quot;, &quot;code&quot; : 10111 }</span></span>
<span class="line"><span style="color:#e1e4e8;"># notablescan = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 命名空间的文件（即NS）的默认大小，默认16M，最大2G。所有新创建的默认大小命名空间的文件（即NS）。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 此选项不会影响现有的命名空间的文件的大小。默认值是16M字节，最大大小为2 GB。让小数据库不让浪费太多的磁盘空间，同时让大数据在磁盘上有连续的空间。</span></span>
<span class="line"><span style="color:#e1e4e8;"># nssize = 16</span></span>
<span class="line"><span style="color:#e1e4e8;"># 数据库分析等级设置。记录一些操作性能到标准输出或则指定的logpath的日志文件中，默认0:关闭。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 数据库分析可以影响数据库的性能，因为分析器必须记录和处理所有的数据库操作。所以在需要的时候用动态修改就可以了</span></span>
<span class="line"><span style="color:#e1e4e8;"># 0：关，无分析。 1：开，仅包括慢操作。 2：开，包括所有操作。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 控制 Profiling  的开关和级别：2种</span></span>
<span class="line"><span style="color:#e1e4e8;"># 第一种是直接在启动参数里直接进行设置或则启动MongoDB时加上–profile=级别，其信息保存在 生成的system.profile 中。</span></span>
<span class="line"><span style="color:#e1e4e8;"># profile = 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 记录profile分析的慢查询的时间，默认是100毫秒</span></span>
<span class="line"><span style="color:#e1e4e8;"># slowms = 100</span></span>
<span class="line"><span style="color:#e1e4e8;"># 配额，默认false。是否开启配置每个数据库的最多文件数的限制。当为true则用quotaFiles来配置最多文件的数量。</span></span>
<span class="line"><span style="color:#e1e4e8;"># quota = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 配额数量。每个数据库的数据文件数量的限制。此选项需要quota为true。默认为8</span></span>
<span class="line"><span style="color:#e1e4e8;"># quotaFiles = 8</span></span>
<span class="line"><span style="color:#e1e4e8;"># 使一个简单的 REST API，默认false，设置为true。</span></span>
<span class="line"><span style="color:#e1e4e8;"># rest = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 修复数据库操作，默认是false。设置为true时，启动后修复所有数据库，设置这个选项最好在命令行上，而不是在配置文件或控制脚本。</span></span>
<span class="line"><span style="color:#e1e4e8;"># repair = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 修复路径，默认是在dbpath路径下的_tmp 目录。</span></span>
<span class="line"><span style="color:#e1e4e8;"># repairpath</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否使用较小的默认文件。默认为false，不使用。设置为true，使用较小的默认数据文件大小。smallfiles减少数据文件的初始大小，并限制他们到512M，</span></span>
<span class="line"><span style="color:#e1e4e8;"># 也减少了日志文件的大小，并限制他们到128M。如果数据库很大，各持有少量的数据，会导致mongodb创建很多文件，会影响性能。</span></span>
<span class="line"><span style="color:#e1e4e8;"># smallfiles = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 刷写数据到日志的频率，通过fsync操作数据。默认60秒。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 警告：如果设置为0，SYNCDELAY 不会同步到磁盘的内存映射文件。在生产系统上，不要设置这个值。</span></span>
<span class="line"><span style="color:#e1e4e8;"># syncdelay = 60</span></span>
<span class="line"><span style="color:#e1e4e8;"># 系统信息，默认false。设置为true，mongod会诊断系统有关的页面大小，数量的物理页面，可用物理??页面的数量输出到标准输出。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当开启sysinfo参数的时候，只会打印信息，不会启动mongodb的程序。所以要关闭该参数，才能开启mongodb。</span></span>
<span class="line"><span style="color:#e1e4e8;"># sysinfo = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 升级。默认为false。当设置为true，指定DBPATH，升级磁盘上的数据格式的文件到最新版本。会影响数据库操作，更新元数据。大部分情况下，不需要设置该值。</span></span>
<span class="line"><span style="color:#e1e4e8;"># upgrade = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否使用内部诊断。默认false。</span></span>
<span class="line"><span style="color:#e1e4e8;"># traceExceptions = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 2.4的新参数，指定启动选项配置。想设置多个选项则用一个setParameter选项指定，可以setParameter的参数请见这里。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 声明setParameter设置在这个文件中，使用下面的格式：setParameter = &lt;parameter&gt;=&lt;value&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 例如： setParameter = syncdelay= 55,notablescan = true,journalCommitInterval = 50,traceExceptions = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># setParameter = </span></span>
<span class="line"><span style="color:#e1e4e8;"># 使用此设置来配置复制副本集。指定一个副本集名称作为参数，所有主机都必须有相同的名称作为同一个副本集。</span></span>
<span class="line"><span style="color:#e1e4e8;"># replSet = </span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认为false。在副本集下，设置为true，从一个dbpath里启用从库复制服务，该dbpath的数据库是主库的快照，可用于快速启用同步，</span></span>
<span class="line"><span style="color:#e1e4e8;"># 否则的mongod将尝试执行初始同步。注意：如果数据不完全同步，mongod指定fastsync开启，secondary或slave与主永久不同步，这可能会导致显着的一致性问题。</span></span>
<span class="line"><span style="color:#e1e4e8;"># fastsync = </span></span>
<span class="line"><span style="color:#e1e4e8;"># 2.2版本出现的新参数，默认是all。可以设置的值有：all, none, and _id_only。只能在副本集（replSet）中使用。默认情况下，</span></span>
<span class="line"><span style="color:#e1e4e8;"># secondary副本集的成员将加载所有索引到内存中（从OPLOG之前的操作有关的）。您可以修改此行为，使secondary只会加载_id索引。指定id或none，防止mongod的任何索引加载到内存。</span></span>
<span class="line"><span style="color:#e1e4e8;"># replIndexPrefetch = </span></span>
<span class="line"><span style="color:#e1e4e8;"># 主从复制的相关设置</span></span>
<span class="line"><span style="color:#e1e4e8;"># master：默认为false，当设置为true，则配置当前实例作为主实例。</span></span>
<span class="line"><span style="color:#e1e4e8;"># master = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># slave：默认为false，当设置为true，则配置当前实例作为从实例。</span></span>
<span class="line"><span style="color:#e1e4e8;"># slave = true</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置从库同步主库的延迟时间，用于从设置，默认为0。</span></span>
<span class="line"><span style="color:#e1e4e8;"># slavedelay = 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 是否自动重新同步.默认为false，用于从设置。设置为true，如果落后主超过10秒，会强制从自动重新同步。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果oplogSize太小，此设置可能有问题。如果OPLOG大小不足以存储主的变化状态和从的状态变化之间的差异，这种情况下强制重新同步是不必要的。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当设置autoresync选项设置为false，10分钟内从不会进行大于1次的自动重新同步。</span></span>
<span class="line"><span style="color:#e1e4e8;"># autoresync = false</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认为空，格式为：&lt;host&gt;&lt;:port&gt;。用于从实例的复制：设置从的时候指定该选项会让从复制指定主的实例</span></span>
<span class="line"><span style="color:#e1e4e8;"># source = 127.0.0.1:30001</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认为空，用于从选项，指定一个数据库进行复制。</span></span>
<span class="line"><span style="color:#e1e4e8;"># only =</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 数据文件位置</span></span>
<span class="line"><span style="color:#24292e;">dbpath = /opt/module/mongoData</span></span>
<span class="line"><span style="color:#24292e;"># 日志文件位置</span></span>
<span class="line"><span style="color:#24292e;">logpath = /opt/module/mongoLog/mongodb.log</span></span>
<span class="line"><span style="color:#24292e;"># 以追加方式写入日志，true为追加。false是覆盖</span></span>
<span class="line"><span style="color:#24292e;">logappend = true</span></span>
<span class="line"><span style="color:#24292e;"># 日志输出都发送到主机的syslog系统，而不是标准输出到logpath指定日志文件。syslog和logpath不能一起用，会报错：Cant use both a logpath and syslog</span></span>
<span class="line"><span style="color:#24292e;"># syslog = true</span></span>
<span class="line"><span style="color:#24292e;"># 绑定地址。默认127.0.0.1，只能通过本地连接。进程绑定和监听来自这个地址上的应用连接。要是需要给其他服务器连接，则需要注释掉这个或则 把IP改成本机地址，</span></span>
<span class="line"><span style="color:#24292e;"># 如192.168.200.201[其他服务器用 mongo --host=192.168.200.201 连接] ，可以用一个逗号分隔的列表绑定多个IP地址。</span></span>
<span class="line"><span style="color:#24292e;"># 远程访问则配置为0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;"># bind_ip = 127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;"># 默认端口27017</span></span>
<span class="line"><span style="color:#24292e;">port = 27017</span></span>
<span class="line"><span style="color:#24292e;"># 是否后台运行，设置为true 启动 进程在后台运行的守护进程模式。默认false。</span></span>
<span class="line"><span style="color:#24292e;">fork = true</span></span>
<span class="line"><span style="color:#24292e;"># 安静模式。这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false</span></span>
<span class="line"><span style="color:#24292e;">quiet = false</span></span>
<span class="line"><span style="color:#24292e;"># 启用日志文件，默认启用</span></span>
<span class="line"><span style="color:#24292e;">journal = true</span></span>
<span class="line"><span style="color:#24292e;"># 刷写提交机制，默认是30ms或则100ms。较低的值，会更消耗磁盘的性能。此选项接受2和300毫秒之间的值：</span></span>
<span class="line"><span style="color:#24292e;"># 如果单块设备提供日志和数据文件，默认的日记提交时间间隔为100毫秒。如果不同的块设备提供的日志和数据文件，默认的日记提交的时间间隔为30毫秒。</span></span>
<span class="line"><span style="color:#24292e;"># journalCommitInterval=100</span></span>
<span class="line"><span style="color:#24292e;"># 启用定期记录CPU利用率和 I/O 等待，设置为true会强制mongodb每4s报告cpu利用率和io等待，把日志信息写到标准输出或日志文件。</span></span>
<span class="line"><span style="color:#24292e;"># 默认为false。开启日志会出现：1.Mon Jun 10 10:21:42.241 [snapshotthread] cpu: elapsed:4000 writelock: 0%</span></span>
<span class="line"><span style="color:#24292e;"># cpu = true</span></span>
<span class="line"><span style="color:#24292e;"># 用户认证，默认false。不需要认证。当设置为true时候，进入数据库需要auth验证，当数据库里没有用户，则不需要验证也可以操作。直到创建了第一个用户，之后操作都需要验证。</span></span>
<span class="line"><span style="color:#24292e;"># noauth = true</span></span>
<span class="line"><span style="color:#24292e;"># auth = true</span></span>
<span class="line"><span style="color:#24292e;"># 详细记录输出</span></span>
<span class="line"><span style="color:#24292e;"># verbose = true</span></span>
<span class="line"><span style="color:#24292e;"># 设置oplog记录等级 0=off (default) 1=W 2=R 3=both 7=W+some reads</span></span>
<span class="line"><span style="color:#24292e;"># diaglog = 0</span></span>
<span class="line"><span style="color:#24292e;"># 动态调试项</span></span>
<span class="line"><span style="color:#24292e;"># nocursors = true</span></span>
<span class="line"><span style="color:#24292e;"># 忽略查询提示</span></span>
<span class="line"><span style="color:#24292e;"># nohints = true</span></span>
<span class="line"><span style="color:#24292e;"># 指定的复制操作日志（OPLOG）的最大大小。mongod创建一个OPLOG的大小基于最大可用空间量。对于64位系统，OPLOG通常是5％的可用磁盘空间。</span></span>
<span class="line"><span style="color:#24292e;"># 一旦mongod第一次创建OPLOG，改变oplogSize将不会影响OPLOG的大小。</span></span>
<span class="line"><span style="color:#24292e;"># oplogSize = 1024</span></span>
<span class="line"><span style="color:#24292e;"># 指定存储身份验证信息的密钥文件的路径，默认缺省</span></span>
<span class="line"><span style="color:#24292e;"># keyFile = /path/to/keyfile</span></span>
<span class="line"><span style="color:#24292e;"># 最大连接数。默认值：取决于系统（即的ulimit和文件描述符）限制。MongoDB中不会限制其自身的连接。当设置大于系统的限制，则无效，以系统限制为准。这对于客户端创建很多“表”，</span></span>
<span class="line"><span style="color:#24292e;"># 允许连接超时而不关闭“表”的时候很有用。设置该值的高于连接池和总连接数的大小，以防止尖峰时 候的连接。注意：不能设置该值大于20000。</span></span>
<span class="line"><span style="color:#24292e;"># maxConns = 100</span></span>
<span class="line"><span style="color:#24292e;"># 强制验证客户端请求。2.4的默认设置为objcheck成为true，在早期版本objcheck默认为false。因为它强制验证客户端请求，确保客户端绝不插入无效文件到数据库中。</span></span>
<span class="line"><span style="color:#24292e;"># 对于嵌套文档的对象，会有一点性能影响。设置noobjcheck 关闭。</span></span>
<span class="line"><span style="color:#24292e;"># objcheck = true</span></span>
<span class="line"><span style="color:#24292e;"># 同上，默认false</span></span>
<span class="line"><span style="color:#24292e;"># noobjcheck = false</span></span>
<span class="line"><span style="color:#24292e;"># 进程ID，没有指定则启动时候就没有PID文件。默认缺省。</span></span>
<span class="line"><span style="color:#24292e;"># pidfilepath = /var/run/mongo.pid</span></span>
<span class="line"><span style="color:#24292e;"># 套接字文件，默认为false，有生成socket文件。当设置为true时，不会生成socket文件</span></span>
<span class="line"><span style="color:#24292e;"># nounixsocket = false</span></span>
<span class="line"><span style="color:#24292e;"># 套接字文件路径，默认/tmp</span></span>
<span class="line"><span style="color:#24292e;"># unixSocketPrefix = /tmp</span></span>
<span class="line"><span style="color:#24292e;"># 设置为true，修改数据目录存储模式，每个数据库的文件存储在DBPATH指定目录的不同的文件夹中。使用此选项，可以配置的MongoDB将数据存储在不同的磁盘设备上，以提高写入吞吐量或磁盘容量。默认为false。</span></span>
<span class="line"><span style="color:#24292e;"># 注意：要是在运行一段时间的数据库中，开启该参数，会导致原始的数据都会消失（注释参数则会回来）。因为数据目录都不同了，除非迁移现有的数据文件到directoryperdb产生的数据库目录中</span></span>
<span class="line"><span style="color:#24292e;"># directoryperdb = false</span></span>
<span class="line"><span style="color:#24292e;"># 是否支持ipv6，默认false</span></span>
<span class="line"><span style="color:#24292e;"># ipv6 = false</span></span>
<span class="line"><span style="color:#24292e;"># 是否允许JSONP访问通过一个HTTP接口，默认false。</span></span>
<span class="line"><span style="color:#24292e;"># jsonp = false</span></span>
<span class="line"><span style="color:#24292e;"># 是否禁止http接口，即28017 端口开启的服务。默认false，支持</span></span>
<span class="line"><span style="color:#24292e;"># nohttpinterface = false</span></span>
<span class="line"><span style="color:#24292e;"># 预分配方式。默认false：使用预分配方式来保证写入性能的稳定，预分配在后台进行，并且每个预分配的文件都用0进行填充。这会让MongoDB始终保持额外的空间和空余的数据文件，</span></span>
<span class="line"><span style="color:#24292e;"># 从而避免了数据增长过快而带来的分配磁盘空间引起的阻塞。设置noprealloc= true来禁用预分配的数据文件，会缩短启动时间，但在正常操作过程中，可能会导致性能显著下降。</span></span>
<span class="line"><span style="color:#24292e;"># noprealloc = false</span></span>
<span class="line"><span style="color:#24292e;"># 是否禁止脚本引擎。默认是false：不禁止。ture：禁止。</span></span>
<span class="line"><span style="color:#24292e;"># 要是设置成true：运行一些脚本的时候会出现：JavaScript execution failed: group command failed: { &quot;ok&quot; : 0, &quot;errmsg&quot; : &quot;server-side JavaScript execution is disabled&quot; }</span></span>
<span class="line"><span style="color:#24292e;"># noscripting = false</span></span>
<span class="line"><span style="color:#24292e;"># 是否禁止表扫描操作。默认false：不禁止，ture：禁止</span></span>
<span class="line"><span style="color:#24292e;"># 禁止要是执行表扫描会出现：error: { &quot;$err&quot; : &quot;table scans not allowed:test.emp&quot;, &quot;code&quot; : 10111 }</span></span>
<span class="line"><span style="color:#24292e;"># notablescan = false</span></span>
<span class="line"><span style="color:#24292e;"># 命名空间的文件（即NS）的默认大小，默认16M，最大2G。所有新创建的默认大小命名空间的文件（即NS）。</span></span>
<span class="line"><span style="color:#24292e;"># 此选项不会影响现有的命名空间的文件的大小。默认值是16M字节，最大大小为2 GB。让小数据库不让浪费太多的磁盘空间，同时让大数据在磁盘上有连续的空间。</span></span>
<span class="line"><span style="color:#24292e;"># nssize = 16</span></span>
<span class="line"><span style="color:#24292e;"># 数据库分析等级设置。记录一些操作性能到标准输出或则指定的logpath的日志文件中，默认0:关闭。</span></span>
<span class="line"><span style="color:#24292e;"># 数据库分析可以影响数据库的性能，因为分析器必须记录和处理所有的数据库操作。所以在需要的时候用动态修改就可以了</span></span>
<span class="line"><span style="color:#24292e;"># 0：关，无分析。 1：开，仅包括慢操作。 2：开，包括所有操作。</span></span>
<span class="line"><span style="color:#24292e;"># 控制 Profiling  的开关和级别：2种</span></span>
<span class="line"><span style="color:#24292e;"># 第一种是直接在启动参数里直接进行设置或则启动MongoDB时加上–profile=级别，其信息保存在 生成的system.profile 中。</span></span>
<span class="line"><span style="color:#24292e;"># profile = 0</span></span>
<span class="line"><span style="color:#24292e;"># 记录profile分析的慢查询的时间，默认是100毫秒</span></span>
<span class="line"><span style="color:#24292e;"># slowms = 100</span></span>
<span class="line"><span style="color:#24292e;"># 配额，默认false。是否开启配置每个数据库的最多文件数的限制。当为true则用quotaFiles来配置最多文件的数量。</span></span>
<span class="line"><span style="color:#24292e;"># quota = false</span></span>
<span class="line"><span style="color:#24292e;"># 配额数量。每个数据库的数据文件数量的限制。此选项需要quota为true。默认为8</span></span>
<span class="line"><span style="color:#24292e;"># quotaFiles = 8</span></span>
<span class="line"><span style="color:#24292e;"># 使一个简单的 REST API，默认false，设置为true。</span></span>
<span class="line"><span style="color:#24292e;"># rest = true</span></span>
<span class="line"><span style="color:#24292e;"># 修复数据库操作，默认是false。设置为true时，启动后修复所有数据库，设置这个选项最好在命令行上，而不是在配置文件或控制脚本。</span></span>
<span class="line"><span style="color:#24292e;"># repair = true</span></span>
<span class="line"><span style="color:#24292e;"># 修复路径，默认是在dbpath路径下的_tmp 目录。</span></span>
<span class="line"><span style="color:#24292e;"># repairpath</span></span>
<span class="line"><span style="color:#24292e;"># 是否使用较小的默认文件。默认为false，不使用。设置为true，使用较小的默认数据文件大小。smallfiles减少数据文件的初始大小，并限制他们到512M，</span></span>
<span class="line"><span style="color:#24292e;"># 也减少了日志文件的大小，并限制他们到128M。如果数据库很大，各持有少量的数据，会导致mongodb创建很多文件，会影响性能。</span></span>
<span class="line"><span style="color:#24292e;"># smallfiles = true</span></span>
<span class="line"><span style="color:#24292e;"># 刷写数据到日志的频率，通过fsync操作数据。默认60秒。</span></span>
<span class="line"><span style="color:#24292e;"># 警告：如果设置为0，SYNCDELAY 不会同步到磁盘的内存映射文件。在生产系统上，不要设置这个值。</span></span>
<span class="line"><span style="color:#24292e;"># syncdelay = 60</span></span>
<span class="line"><span style="color:#24292e;"># 系统信息，默认false。设置为true，mongod会诊断系统有关的页面大小，数量的物理页面，可用物理??页面的数量输出到标准输出。</span></span>
<span class="line"><span style="color:#24292e;"># 当开启sysinfo参数的时候，只会打印信息，不会启动mongodb的程序。所以要关闭该参数，才能开启mongodb。</span></span>
<span class="line"><span style="color:#24292e;"># sysinfo = false</span></span>
<span class="line"><span style="color:#24292e;"># 升级。默认为false。当设置为true，指定DBPATH，升级磁盘上的数据格式的文件到最新版本。会影响数据库操作，更新元数据。大部分情况下，不需要设置该值。</span></span>
<span class="line"><span style="color:#24292e;"># upgrade = false</span></span>
<span class="line"><span style="color:#24292e;"># 是否使用内部诊断。默认false。</span></span>
<span class="line"><span style="color:#24292e;"># traceExceptions = false</span></span>
<span class="line"><span style="color:#24292e;"># 2.4的新参数，指定启动选项配置。想设置多个选项则用一个setParameter选项指定，可以setParameter的参数请见这里。</span></span>
<span class="line"><span style="color:#24292e;"># 声明setParameter设置在这个文件中，使用下面的格式：setParameter = &lt;parameter&gt;=&lt;value&gt;</span></span>
<span class="line"><span style="color:#24292e;"># 例如： setParameter = syncdelay= 55,notablescan = true,journalCommitInterval = 50,traceExceptions = true</span></span>
<span class="line"><span style="color:#24292e;"># setParameter = </span></span>
<span class="line"><span style="color:#24292e;"># 使用此设置来配置复制副本集。指定一个副本集名称作为参数，所有主机都必须有相同的名称作为同一个副本集。</span></span>
<span class="line"><span style="color:#24292e;"># replSet = </span></span>
<span class="line"><span style="color:#24292e;"># 默认为false。在副本集下，设置为true，从一个dbpath里启用从库复制服务，该dbpath的数据库是主库的快照，可用于快速启用同步，</span></span>
<span class="line"><span style="color:#24292e;"># 否则的mongod将尝试执行初始同步。注意：如果数据不完全同步，mongod指定fastsync开启，secondary或slave与主永久不同步，这可能会导致显着的一致性问题。</span></span>
<span class="line"><span style="color:#24292e;"># fastsync = </span></span>
<span class="line"><span style="color:#24292e;"># 2.2版本出现的新参数，默认是all。可以设置的值有：all, none, and _id_only。只能在副本集（replSet）中使用。默认情况下，</span></span>
<span class="line"><span style="color:#24292e;"># secondary副本集的成员将加载所有索引到内存中（从OPLOG之前的操作有关的）。您可以修改此行为，使secondary只会加载_id索引。指定id或none，防止mongod的任何索引加载到内存。</span></span>
<span class="line"><span style="color:#24292e;"># replIndexPrefetch = </span></span>
<span class="line"><span style="color:#24292e;"># 主从复制的相关设置</span></span>
<span class="line"><span style="color:#24292e;"># master：默认为false，当设置为true，则配置当前实例作为主实例。</span></span>
<span class="line"><span style="color:#24292e;"># master = false</span></span>
<span class="line"><span style="color:#24292e;"># slave：默认为false，当设置为true，则配置当前实例作为从实例。</span></span>
<span class="line"><span style="color:#24292e;"># slave = true</span></span>
<span class="line"><span style="color:#24292e;"># 设置从库同步主库的延迟时间，用于从设置，默认为0。</span></span>
<span class="line"><span style="color:#24292e;"># slavedelay = 0</span></span>
<span class="line"><span style="color:#24292e;"># 是否自动重新同步.默认为false，用于从设置。设置为true，如果落后主超过10秒，会强制从自动重新同步。</span></span>
<span class="line"><span style="color:#24292e;"># 如果oplogSize太小，此设置可能有问题。如果OPLOG大小不足以存储主的变化状态和从的状态变化之间的差异，这种情况下强制重新同步是不必要的。</span></span>
<span class="line"><span style="color:#24292e;"># 当设置autoresync选项设置为false，10分钟内从不会进行大于1次的自动重新同步。</span></span>
<span class="line"><span style="color:#24292e;"># autoresync = false</span></span>
<span class="line"><span style="color:#24292e;"># 默认为空，格式为：&lt;host&gt;&lt;:port&gt;。用于从实例的复制：设置从的时候指定该选项会让从复制指定主的实例</span></span>
<span class="line"><span style="color:#24292e;"># source = 127.0.0.1:30001</span></span>
<span class="line"><span style="color:#24292e;"># 默认为空，用于从选项，指定一个数据库进行复制。</span></span>
<span class="line"><span style="color:#24292e;"># only =</span></span></code></pre></div><h1 id="_2-备份工具" tabindex="-1">2.备份工具 <a class="header-anchor" href="#_2-备份工具" aria-label="Permalink to &quot;2.备份工具&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#从5.0开始mongodump 需要单独下载</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://www.mongodb.com/try/download/database-tools</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#从5.0开始mongodump 需要单独下载</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://www.mongodb.com/try/download/database-tools</span></span></code></pre></div><h1 id="_3-mongodb-shell" tabindex="-1">3.mongodb-shell <a class="header-anchor" href="#_3-mongodb-shell" aria-label="Permalink to &quot;3.mongodb-shell&quot;">​</a></h1><p><a href="https://www.mongodb.com/docs/mongodb-shell/connect/#connect-to-a-deployment-on-a-remote-host" target="_blank" rel="noreferrer">https://www.mongodb.com/docs/mongodb-shell/connect/#connect-to-a-deployment-on-a-remote-host</a></p><ul><li>安装</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cp mongosh /usr/local/bin/</span></span>
<span class="line"><span style="color:#e1e4e8;">cp mongosh_crypt_v1.so /usr/local/lib/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cp mongosh /usr/local/bin/</span></span>
<span class="line"><span style="color:#24292e;">cp mongosh_crypt_v1.so /usr/local/lib/</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongosh --port 28015</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mongosh &quot;mongodb://mongodb0.example.com:28015&quot; --username alice --authenticationDatabase admin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mongosh --username alice@dba.example.com --password  --authenticationDatabase &#39;$external&#39; --authenticationMechanism &quot;PLAIN&quot;  --host &quot;mongodb.example.com&quot; --port 27017</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongosh --port 28015</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mongosh &quot;mongodb://mongodb0.example.com:28015&quot; --username alice --authenticationDatabase admin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mongosh --username alice@dba.example.com --password  --authenticationDatabase &#39;$external&#39; --authenticationMechanism &quot;PLAIN&quot;  --host &quot;mongodb.example.com&quot; --port 27017</span></span></code></pre></div>`,17),o=[p];function c(t,r,i,y,d,u){return n(),a("div",null,o)}const h=s(l,[["render",c]]);export{g as __pageData,h as default};
