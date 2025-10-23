import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"参数解释","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/Redis/2-config.md","filePath":"guide/Database/Redis/2-config.md","lastUpdated":1720533756000}'),l={name:"guide/Database/Redis/2-config.md"},p=e(`<h1 id="参数解释" tabindex="-1">参数解释 <a class="header-anchor" href="#参数解释" aria-label="Permalink to &quot;参数解释&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">daemonize no</span></span>
<span class="line"><span style="color:#e1e4e8;"># Redis默认是不作为守护进程来运行的。你可以把这个设置为&quot;yes&quot;让它作为守护进程来运行</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">port 6379</span></span>
<span class="line"><span style="color:#e1e4e8;"># 接受连接的特定端口，默认是6379。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果端口设置为0，Redis就不会监听TCP套接字</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">bind 127.0.0.1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 可以绑定单一接口；如果这里没单独设置，那么所有接口的连接都会被监听</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">timeout 0</span></span>
<span class="line"><span style="color:#e1e4e8;">#一个客户端空闲多少秒后关闭连接。(0代表禁用，永不关闭)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tcp-keepalive ：单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">loglevel verbose</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置服务器调试等级。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 可能值：</span></span>
<span class="line"><span style="color:#e1e4e8;"># debug （很多信息，对开发/测试有用）</span></span>
<span class="line"><span style="color:#e1e4e8;"># verbose （很多精简的有用信息，但是不像debug等级那么多）</span></span>
<span class="line"><span style="color:#e1e4e8;"># notice （适量的信息，基本上是你生产环境中需要的程度）</span></span>
<span class="line"><span style="color:#e1e4e8;"># warning （只有很重要/严重的信息会记录下来）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">logfile stdout</span></span>
<span class="line"><span style="color:#e1e4e8;"># 指明日志文件名。也可以使用&quot;stdout&quot;来强制让Redis把日志信息写到标准输出上。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意：如果Redis以守护进程方式运行，而你设置日志显示到标准输出的话，那么日志会发送到 /dev/null</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">syslog-enabled no</span></span>
<span class="line"><span style="color:#e1e4e8;"># 要使用系统日志记录器很简单，只要设置 &quot;syslog-enabled&quot; 为 &quot;yes&quot; 就可以了。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 然后根据需要设置其他一些syslog参数就可以了。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">syslog-ident redis</span></span>
<span class="line"><span style="color:#e1e4e8;"># 指明syslog身份</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">syslog-facility local0</span></span>
<span class="line"><span style="color:#e1e4e8;"># 指明syslog的设备。必须是一个用户或者是 LOCAL0 ~ LOCAL7 之一</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">databases 16</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置数据库个数。默认数据库是 DB 0，你可以通过SELECT &lt;dbid&gt; WHERE dbid（0～&#39;databases&#39; - 1）来为每个连接使用不同的数据库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">save 900 1</span></span>
<span class="line"><span style="color:#e1e4e8;">save 300 10</span></span>
<span class="line"><span style="color:#e1e4e8;">save 60 10000</span></span>
<span class="line"><span style="color:#e1e4e8;"># 把数据库存到磁盘上:</span></span>
<span class="line"><span style="color:#e1e4e8;"># save &lt;seconds&gt; &lt;changes&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 会在指定秒数和数据变化次数之后把数据库写到磁盘上。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 下面的例子将会进行把数据写入磁盘的操作:</span></span>
<span class="line"><span style="color:#e1e4e8;"># 900秒（15分钟）之后，且至少1次变更</span></span>
<span class="line"><span style="color:#e1e4e8;"># 300秒（5分钟）之后，且至少10次变更</span></span>
<span class="line"><span style="color:#e1e4e8;"># 60秒之后，且至少10000次变更</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意：你要想不写磁盘的话就把所有 &quot;save&quot; 设置注释掉就行了</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rdbcompression yes</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 当导出到 .rdb 数据库时是否用LZF压缩字符串对象。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认设置为 &quot;yes&quot;，所以几乎总是生效的。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果你想节省CPU的话你可以把这个设置为 &quot;no&quot;，但是如果你有可压缩的key的话，那数据文件就会更大了。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dbfilename dump.rdb</span></span>
<span class="line"><span style="color:#e1e4e8;"># 数据库的文件名</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dir ./</span></span>
<span class="line"><span style="color:#e1e4e8;"># 工作目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># 数据库会写到这个目录下，文件名就是上面的 &quot;dbfilename&quot; 的值。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 累加文件也放这里。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意你这里指定的必须是目录，不是文件名</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">daemonize no</span></span>
<span class="line"><span style="color:#24292e;"># Redis默认是不作为守护进程来运行的。你可以把这个设置为&quot;yes&quot;让它作为守护进程来运行</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">port 6379</span></span>
<span class="line"><span style="color:#24292e;"># 接受连接的特定端口，默认是6379。</span></span>
<span class="line"><span style="color:#24292e;"># 如果端口设置为0，Redis就不会监听TCP套接字</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">bind 127.0.0.1</span></span>
<span class="line"><span style="color:#24292e;"># 可以绑定单一接口；如果这里没单独设置，那么所有接口的连接都会被监听</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">timeout 0</span></span>
<span class="line"><span style="color:#24292e;">#一个客户端空闲多少秒后关闭连接。(0代表禁用，永不关闭)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tcp-keepalive ：单位是秒，表示将周期性的使用SO_KEEPALIVE检测客户端是否还处于健康状态，避免服务器一直阻塞，官方给出的建议值是300s，如果设置为0，则不会周期性的检测</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">loglevel verbose</span></span>
<span class="line"><span style="color:#24292e;"># 设置服务器调试等级。</span></span>
<span class="line"><span style="color:#24292e;"># 可能值：</span></span>
<span class="line"><span style="color:#24292e;"># debug （很多信息，对开发/测试有用）</span></span>
<span class="line"><span style="color:#24292e;"># verbose （很多精简的有用信息，但是不像debug等级那么多）</span></span>
<span class="line"><span style="color:#24292e;"># notice （适量的信息，基本上是你生产环境中需要的程度）</span></span>
<span class="line"><span style="color:#24292e;"># warning （只有很重要/严重的信息会记录下来）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">logfile stdout</span></span>
<span class="line"><span style="color:#24292e;"># 指明日志文件名。也可以使用&quot;stdout&quot;来强制让Redis把日志信息写到标准输出上。</span></span>
<span class="line"><span style="color:#24292e;"># 注意：如果Redis以守护进程方式运行，而你设置日志显示到标准输出的话，那么日志会发送到 /dev/null</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">syslog-enabled no</span></span>
<span class="line"><span style="color:#24292e;"># 要使用系统日志记录器很简单，只要设置 &quot;syslog-enabled&quot; 为 &quot;yes&quot; 就可以了。</span></span>
<span class="line"><span style="color:#24292e;"># 然后根据需要设置其他一些syslog参数就可以了。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">syslog-ident redis</span></span>
<span class="line"><span style="color:#24292e;"># 指明syslog身份</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">syslog-facility local0</span></span>
<span class="line"><span style="color:#24292e;"># 指明syslog的设备。必须是一个用户或者是 LOCAL0 ~ LOCAL7 之一</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">databases 16</span></span>
<span class="line"><span style="color:#24292e;"># 设置数据库个数。默认数据库是 DB 0，你可以通过SELECT &lt;dbid&gt; WHERE dbid（0～&#39;databases&#39; - 1）来为每个连接使用不同的数据库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">save 900 1</span></span>
<span class="line"><span style="color:#24292e;">save 300 10</span></span>
<span class="line"><span style="color:#24292e;">save 60 10000</span></span>
<span class="line"><span style="color:#24292e;"># 把数据库存到磁盘上:</span></span>
<span class="line"><span style="color:#24292e;"># save &lt;seconds&gt; &lt;changes&gt;</span></span>
<span class="line"><span style="color:#24292e;"># 会在指定秒数和数据变化次数之后把数据库写到磁盘上。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 下面的例子将会进行把数据写入磁盘的操作:</span></span>
<span class="line"><span style="color:#24292e;"># 900秒（15分钟）之后，且至少1次变更</span></span>
<span class="line"><span style="color:#24292e;"># 300秒（5分钟）之后，且至少10次变更</span></span>
<span class="line"><span style="color:#24292e;"># 60秒之后，且至少10000次变更</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 注意：你要想不写磁盘的话就把所有 &quot;save&quot; 设置注释掉就行了</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rdbcompression yes</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 当导出到 .rdb 数据库时是否用LZF压缩字符串对象。</span></span>
<span class="line"><span style="color:#24292e;"># 默认设置为 &quot;yes&quot;，所以几乎总是生效的。</span></span>
<span class="line"><span style="color:#24292e;"># 如果你想节省CPU的话你可以把这个设置为 &quot;no&quot;，但是如果你有可压缩的key的话，那数据文件就会更大了。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dbfilename dump.rdb</span></span>
<span class="line"><span style="color:#24292e;"># 数据库的文件名</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dir ./</span></span>
<span class="line"><span style="color:#24292e;"># 工作目录</span></span>
<span class="line"><span style="color:#24292e;"># 数据库会写到这个目录下，文件名就是上面的 &quot;dbfilename&quot; 的值。</span></span>
<span class="line"><span style="color:#24292e;"># 累加文件也放这里。</span></span>
<span class="line"><span style="color:#24292e;"># 注意你这里指定的必须是目录，不是文件名</span></span></code></pre></div><h2 id="slave" tabindex="-1">slave <a class="header-anchor" href="#slave" aria-label="Permalink to &quot;slave&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">########################################## 同步 ##########################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">slaveof &lt;masterip&gt; &lt;masterport&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 主从同步。通过 slaveof 配置来实现Redis实例的备份。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意，这里是本地从远端复制数据。也就是说，本地可以有不同的数据库文件、绑定不同的IP、监听不同的端口。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">masterauth &lt;master-password&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果master设置了密码（通过下面的 &quot;requirepass&quot; 选项来配置），那么slave在开始同步之前必须进行身份验证，否则它的同步请求会被拒绝。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">slave-serve-stale-data yes</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当一个slave失去和master的连接，或者同步正在进行中，slave的行为有两种可能：</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 1) 如果 slave-serve-stale-data 设置为 &quot;yes&quot; (默认值)，slave会继续响应客户端请求，可能是正常数据，也可能是还没获得值的空数据。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 2) 如果 slave-serve-stale-data 设置为 &quot;no&quot;，slave会回复&quot;正在从master同步（SYNC with master in progress）&quot;来处理各种请求，除了 INFO 和 SLAVEOF 命令。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">repl-ping-slave-period 10</span></span>
<span class="line"><span style="color:#e1e4e8;"># slave根据指定的时间间隔向服务器发送ping请求。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 时间间隔可以通过 repl_ping_slave_period 来设置。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认10。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">repl-timeout 60</span></span>
<span class="line"><span style="color:#e1e4e8;"># 下面的选项设置了大块数据I/O、向master请求数据和ping响应的过期时间。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认值60秒。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 一个很重要的事情是：确保这个值比 repl-ping-slave-period 大，否则master和slave之间的传输过期时间比预想的要短</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">########################################## 同步 ##########################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">slaveof &lt;masterip&gt; &lt;masterport&gt;</span></span>
<span class="line"><span style="color:#24292e;"># 主从同步。通过 slaveof 配置来实现Redis实例的备份。</span></span>
<span class="line"><span style="color:#24292e;"># 注意，这里是本地从远端复制数据。也就是说，本地可以有不同的数据库文件、绑定不同的IP、监听不同的端口。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">masterauth &lt;master-password&gt;</span></span>
<span class="line"><span style="color:#24292e;"># 如果master设置了密码（通过下面的 &quot;requirepass&quot; 选项来配置），那么slave在开始同步之前必须进行身份验证，否则它的同步请求会被拒绝。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">slave-serve-stale-data yes</span></span>
<span class="line"><span style="color:#24292e;"># 当一个slave失去和master的连接，或者同步正在进行中，slave的行为有两种可能：</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 1) 如果 slave-serve-stale-data 设置为 &quot;yes&quot; (默认值)，slave会继续响应客户端请求，可能是正常数据，也可能是还没获得值的空数据。</span></span>
<span class="line"><span style="color:#24292e;"># 2) 如果 slave-serve-stale-data 设置为 &quot;no&quot;，slave会回复&quot;正在从master同步（SYNC with master in progress）&quot;来处理各种请求，除了 INFO 和 SLAVEOF 命令。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">repl-ping-slave-period 10</span></span>
<span class="line"><span style="color:#24292e;"># slave根据指定的时间间隔向服务器发送ping请求。</span></span>
<span class="line"><span style="color:#24292e;"># 时间间隔可以通过 repl_ping_slave_period 来设置。</span></span>
<span class="line"><span style="color:#24292e;"># 默认10。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">repl-timeout 60</span></span>
<span class="line"><span style="color:#24292e;"># 下面的选项设置了大块数据I/O、向master请求数据和ping响应的过期时间。</span></span>
<span class="line"><span style="color:#24292e;"># 默认值60秒。</span></span>
<span class="line"><span style="color:#24292e;"># 一个很重要的事情是：确保这个值比 repl-ping-slave-period 大，否则master和slave之间的传输过期时间比预想的要短</span></span></code></pre></div><h2 id="安全" tabindex="-1">安全 <a class="header-anchor" href="#安全" aria-label="Permalink to &quot;安全&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">########################################## 安全 ##########################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">requirepass foobared</span></span>
<span class="line"><span style="color:#e1e4e8;"># 要求客户端在处理任何命令时都要验证身份和密码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rename-command：命令重命名，对于一些危险命令例如：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　　　flushdb（清空数据库）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　　　flushall（清空所有记录）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　　　config（客户端连接后可配置服务器）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　　　keys（客户端连接后可查看所有存在的键）                   </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　作为服务端redis-server，常常需要禁用以上命令来使得服务器更加安全，禁用的具体做法是是：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rename-command FLUSHALL &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">也可以保留命令但是不能轻易使用，重命名这个命令即可：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rename-command FLUSHALL abcdefg</span></span>
<span class="line"><span style="color:#e1e4e8;">　　这样，重启服务器后则需要使用新命令来执行操作，否则服务器会报错unknown command</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">########################################## 安全 ##########################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">requirepass foobared</span></span>
<span class="line"><span style="color:#24292e;"># 要求客户端在处理任何命令时都要验证身份和密码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rename-command：命令重命名，对于一些危险命令例如：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　　　flushdb（清空数据库）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　　　flushall（清空所有记录）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　　　config（客户端连接后可配置服务器）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　　　keys（客户端连接后可查看所有存在的键）                   </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　作为服务端redis-server，常常需要禁用以上命令来使得服务器更加安全，禁用的具体做法是是：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rename-command FLUSHALL &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">也可以保留命令但是不能轻易使用，重命名这个命令即可：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rename-command FLUSHALL abcdefg</span></span>
<span class="line"><span style="color:#24292e;">　　这样，重启服务器后则需要使用新命令来执行操作，否则服务器会报错unknown command</span></span></code></pre></div><h2 id="限制" tabindex="-1">限制 <a class="header-anchor" href="#限制" aria-label="Permalink to &quot;限制&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">################################### 限制 ####################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">maxclients 128</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置最多同时连接客户端数量。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认没有限制，这个关系到Redis进程能够打开的文件描述符数量。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 特殊值&quot;0&quot;表示没有限制。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 一旦达到这个限制，Redis会关闭所有新连接并发送错误&quot;达到最大用户数上限（max number of clients reached）&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">maxmemory &lt;bytes&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 不要用比设置的上限更多的内存。一旦内存使用达到上限，Redis会根据选定的回收策略（参见：maxmemmory-policy）删除key。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果因为删除策略问题Redis无法删除key，或者策略设置为 &quot;noeviction&quot;，Redis会回复需要更多内存的错误信息给命令。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 例如，SET,LPUSH等等。但是会继续合理响应只读命令，比如：GET。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 在使用Redis作为LRU缓存，或者为实例设置了硬性内存限制的时候（使用 &quot;noeviction&quot; 策略）的时候，这个选项还是满有用的。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 警告：当一堆slave连上达到内存上限的实例的时候，响应slave需要的输出缓存所需内存不计算在使用内存当中。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这样当请求一个删除掉的key的时候就不会触发网络问题／重新同步的事件，然后slave就会收到一堆删除指令，直到数据库空了为止。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 简而言之，如果你有slave连上一个master的话，那建议你把master内存限制设小点儿，确保有足够的系统内存用作输出缓存。</span></span>
<span class="line"><span style="color:#e1e4e8;"># （如果策略设置为&quot;noeviction&quot;的话就不无所谓了）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">maxmemory-policy volatile-lru</span></span>
<span class="line"><span style="color:#e1e4e8;"># 内存策略：如果达到内存限制了，Redis如何删除key。你可以在下面五个策略里面选：</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># volatile-lru -&gt; 根据LRU算法生成的过期时间来删除。</span></span>
<span class="line"><span style="color:#e1e4e8;"># allkeys-lru -&gt; 根据LRU算法删除任何key。</span></span>
<span class="line"><span style="color:#e1e4e8;"># volatile-random -&gt; 根据过期设置来随机删除key。</span></span>
<span class="line"><span style="color:#e1e4e8;"># allkeys-&gt;random -&gt; 无差别随机删。</span></span>
<span class="line"><span style="color:#e1e4e8;"># volatile-ttl -&gt; 根据最近过期时间来删除（辅以TTL）</span></span>
<span class="line"><span style="color:#e1e4e8;"># noeviction -&gt; 谁也不删，直接在写操作时返回错误。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意：对所有策略来说，如果Redis找不到合适的可以删除的key都会在写操作时返回一个错误。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这里涉及的命令：set setnx setex append</span></span>
<span class="line"><span style="color:#e1e4e8;"># incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd</span></span>
<span class="line"><span style="color:#e1e4e8;"># sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby</span></span>
<span class="line"><span style="color:#e1e4e8;"># zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby</span></span>
<span class="line"><span style="color:#e1e4e8;"># getset mset msetnx exec sort</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认值如下：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">maxmemory-samples 3</span></span>
<span class="line"><span style="color:#e1e4e8;"># LRU和最小TTL算法的实现都不是很精确，但是很接近（为了省内存），所以你可以用样例做测试。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 例如：默认Redis会检查三个key然后取最旧的那个，你可以通过下面的配置项来设置样本的个数</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">################################### 限制 ####################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">maxclients 128</span></span>
<span class="line"><span style="color:#24292e;"># 设置最多同时连接客户端数量。</span></span>
<span class="line"><span style="color:#24292e;"># 默认没有限制，这个关系到Redis进程能够打开的文件描述符数量。</span></span>
<span class="line"><span style="color:#24292e;"># 特殊值&quot;0&quot;表示没有限制。</span></span>
<span class="line"><span style="color:#24292e;"># 一旦达到这个限制，Redis会关闭所有新连接并发送错误&quot;达到最大用户数上限（max number of clients reached）&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">maxmemory &lt;bytes&gt;</span></span>
<span class="line"><span style="color:#24292e;"># 不要用比设置的上限更多的内存。一旦内存使用达到上限，Redis会根据选定的回收策略（参见：maxmemmory-policy）删除key。</span></span>
<span class="line"><span style="color:#24292e;"># 如果因为删除策略问题Redis无法删除key，或者策略设置为 &quot;noeviction&quot;，Redis会回复需要更多内存的错误信息给命令。</span></span>
<span class="line"><span style="color:#24292e;"># 例如，SET,LPUSH等等。但是会继续合理响应只读命令，比如：GET。</span></span>
<span class="line"><span style="color:#24292e;"># 在使用Redis作为LRU缓存，或者为实例设置了硬性内存限制的时候（使用 &quot;noeviction&quot; 策略）的时候，这个选项还是满有用的。</span></span>
<span class="line"><span style="color:#24292e;"># 警告：当一堆slave连上达到内存上限的实例的时候，响应slave需要的输出缓存所需内存不计算在使用内存当中。</span></span>
<span class="line"><span style="color:#24292e;"># 这样当请求一个删除掉的key的时候就不会触发网络问题／重新同步的事件，然后slave就会收到一堆删除指令，直到数据库空了为止。</span></span>
<span class="line"><span style="color:#24292e;"># 简而言之，如果你有slave连上一个master的话，那建议你把master内存限制设小点儿，确保有足够的系统内存用作输出缓存。</span></span>
<span class="line"><span style="color:#24292e;"># （如果策略设置为&quot;noeviction&quot;的话就不无所谓了）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">maxmemory-policy volatile-lru</span></span>
<span class="line"><span style="color:#24292e;"># 内存策略：如果达到内存限制了，Redis如何删除key。你可以在下面五个策略里面选：</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># volatile-lru -&gt; 根据LRU算法生成的过期时间来删除。</span></span>
<span class="line"><span style="color:#24292e;"># allkeys-lru -&gt; 根据LRU算法删除任何key。</span></span>
<span class="line"><span style="color:#24292e;"># volatile-random -&gt; 根据过期设置来随机删除key。</span></span>
<span class="line"><span style="color:#24292e;"># allkeys-&gt;random -&gt; 无差别随机删。</span></span>
<span class="line"><span style="color:#24292e;"># volatile-ttl -&gt; 根据最近过期时间来删除（辅以TTL）</span></span>
<span class="line"><span style="color:#24292e;"># noeviction -&gt; 谁也不删，直接在写操作时返回错误。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 注意：对所有策略来说，如果Redis找不到合适的可以删除的key都会在写操作时返回一个错误。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 这里涉及的命令：set setnx setex append</span></span>
<span class="line"><span style="color:#24292e;"># incr decr rpush lpush rpushx lpushx linsert lset rpoplpush sadd</span></span>
<span class="line"><span style="color:#24292e;"># sinter sinterstore sunion sunionstore sdiff sdiffstore zadd zincrby</span></span>
<span class="line"><span style="color:#24292e;"># zunionstore zinterstore hset hsetnx hmset hincrby incrby decrby</span></span>
<span class="line"><span style="color:#24292e;"># getset mset msetnx exec sort</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 默认值如下：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">maxmemory-samples 3</span></span>
<span class="line"><span style="color:#24292e;"># LRU和最小TTL算法的实现都不是很精确，但是很接近（为了省内存），所以你可以用样例做测试。</span></span>
<span class="line"><span style="color:#24292e;"># 例如：默认Redis会检查三个key然后取最旧的那个，你可以通过下面的配置项来设置样本的个数</span></span></code></pre></div><h2 id="aof" tabindex="-1">aof <a class="header-anchor" href="#aof" aria-label="Permalink to &quot;aof&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">############################## 纯累加模式 ###############################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">appendonly no</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认情况下，Redis是异步的把数据导出到磁盘上。这种情况下，当Redis挂掉的时候，最新的数据就丢了。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果不希望丢掉任何一条数据的话就该用纯累加模式：一旦开启这个模式，Redis会把每次写入的数据在接收后都写入 appendonly.aof 文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 每次启动时Redis都会把这个文件的数据读入内存里。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意，异步导出的数据库文件和纯累加文件可以并存（你得把上面所有&quot;save&quot;设置都注释掉，关掉导出机制）。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果纯累加模式开启了，那么Redis会在启动时载入日志文件而忽略导出的 dump.rdb 文件。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 重要：查看 BGREWRITEAOF 来了解当累加日志文件太大了之后，怎么在后台重新处理这个日志文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">appendfilename appendonly.aof</span></span>
<span class="line"><span style="color:#e1e4e8;"># 纯累加文件名字（默认：&quot;appendonly.aof&quot;）</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">appendfsync always</span></span>
<span class="line"><span style="color:#e1e4e8;">appendfsync everysec</span></span>
<span class="line"><span style="color:#e1e4e8;">appendfsync no</span></span>
<span class="line"><span style="color:#e1e4e8;"># fsync() 请求操作系统马上把数据写到磁盘上，不要再等了。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 有些操作系统会真的把数据马上刷到磁盘上；有些则要磨蹭一下，但是会尽快去做。</span></span>
<span class="line"><span style="color:#e1e4e8;"># Redis支持三种不同的模式：</span></span>
<span class="line"><span style="color:#e1e4e8;"># no：不要立刻刷，只有在操作系统需要刷的时候再刷。比较快。</span></span>
<span class="line"><span style="color:#e1e4e8;"># always：每次写操作都立刻写入到aof文件。慢，但是最安全。</span></span>
<span class="line"><span style="color:#e1e4e8;"># everysec：每秒写一次。折衷方案。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认的 &quot;everysec&quot; 通常来说能在速度和数据安全性之间取得比较好的平衡。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果你真的理解了这个意味着什么，那么设置&quot;no&quot;可以获得更好的性能表现（如果丢数据的话，则只能拿到一个不是很新的快照）；</span></span>
<span class="line"><span style="color:#e1e4e8;"># 或者相反的，你选择 &quot;always&quot; 来牺牲速度确保数据安全、完整。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果拿不准，就用 &quot;everysec&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">no-appendfsync-on-rewrite no</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果AOF的同步策略设置成 &quot;always&quot; 或者 &quot;everysec&quot;，那么后台的存储进程（后台存储或写入AOF日志）会产生很多磁盘I/O开销。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 某些Linux的配置下会使Redis因为 fsync() 而阻塞很久。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 注意，目前对这个情况还没有完美修正，甚至不同线程的 fsync() 会阻塞我们的 write(2) 请求。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 为了缓解这个问题，可以用下面这个选项。它可以在 BGSAVE 或 BGREWRITEAOF 处理时阻止 fsync()。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这就意味着如果有子进程在进行保存操作，那么Redis就处于&quot;不可同步&quot;的状态。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这实际上是说，在最差的情况下可能会丢掉30秒钟的日志数据。（默认Linux设定）</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果你有延迟的问题那就把这个设为 &quot;yes&quot;，否则就保持 &quot;no&quot;，这是保存持久数据的最安全的方式。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span style="color:#e1e4e8;">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span style="color:#e1e4e8;"># 自动重写AOF文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果AOF日志文件大到指定百分比，Redis能够通过 BGREWRITEAOF 自动重写AOF日志文件。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 工作原理：Redis记住上次重写时AOF日志的大小（或者重启后没有写操作的话，那就直接用此时的AOF文件），</span></span>
<span class="line"><span style="color:#e1e4e8;"># 基准尺寸和当前尺寸做比较。如果当前尺寸超过指定比例，就会触发重写操作。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 你还需要指定被重写日志的最小尺寸，这样避免了达到约定百分比但尺寸仍然很小的情况还要重写。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 指定百分比为0会禁用AOF自动重写特性</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">############################## 纯累加模式 ###############################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">appendonly no</span></span>
<span class="line"><span style="color:#24292e;"># 默认情况下，Redis是异步的把数据导出到磁盘上。这种情况下，当Redis挂掉的时候，最新的数据就丢了。</span></span>
<span class="line"><span style="color:#24292e;"># 如果不希望丢掉任何一条数据的话就该用纯累加模式：一旦开启这个模式，Redis会把每次写入的数据在接收后都写入 appendonly.aof 文件。</span></span>
<span class="line"><span style="color:#24292e;"># 每次启动时Redis都会把这个文件的数据读入内存里。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 注意，异步导出的数据库文件和纯累加文件可以并存（你得把上面所有&quot;save&quot;设置都注释掉，关掉导出机制）。</span></span>
<span class="line"><span style="color:#24292e;"># 如果纯累加模式开启了，那么Redis会在启动时载入日志文件而忽略导出的 dump.rdb 文件。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 重要：查看 BGREWRITEAOF 来了解当累加日志文件太大了之后，怎么在后台重新处理这个日志文件。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">appendfilename appendonly.aof</span></span>
<span class="line"><span style="color:#24292e;"># 纯累加文件名字（默认：&quot;appendonly.aof&quot;）</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">appendfsync always</span></span>
<span class="line"><span style="color:#24292e;">appendfsync everysec</span></span>
<span class="line"><span style="color:#24292e;">appendfsync no</span></span>
<span class="line"><span style="color:#24292e;"># fsync() 请求操作系统马上把数据写到磁盘上，不要再等了。</span></span>
<span class="line"><span style="color:#24292e;"># 有些操作系统会真的把数据马上刷到磁盘上；有些则要磨蹭一下，但是会尽快去做。</span></span>
<span class="line"><span style="color:#24292e;"># Redis支持三种不同的模式：</span></span>
<span class="line"><span style="color:#24292e;"># no：不要立刻刷，只有在操作系统需要刷的时候再刷。比较快。</span></span>
<span class="line"><span style="color:#24292e;"># always：每次写操作都立刻写入到aof文件。慢，但是最安全。</span></span>
<span class="line"><span style="color:#24292e;"># everysec：每秒写一次。折衷方案。</span></span>
<span class="line"><span style="color:#24292e;"># 默认的 &quot;everysec&quot; 通常来说能在速度和数据安全性之间取得比较好的平衡。</span></span>
<span class="line"><span style="color:#24292e;"># 如果你真的理解了这个意味着什么，那么设置&quot;no&quot;可以获得更好的性能表现（如果丢数据的话，则只能拿到一个不是很新的快照）；</span></span>
<span class="line"><span style="color:#24292e;"># 或者相反的，你选择 &quot;always&quot; 来牺牲速度确保数据安全、完整。</span></span>
<span class="line"><span style="color:#24292e;"># 如果拿不准，就用 &quot;everysec&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">no-appendfsync-on-rewrite no</span></span>
<span class="line"><span style="color:#24292e;"># 如果AOF的同步策略设置成 &quot;always&quot; 或者 &quot;everysec&quot;，那么后台的存储进程（后台存储或写入AOF日志）会产生很多磁盘I/O开销。</span></span>
<span class="line"><span style="color:#24292e;"># 某些Linux的配置下会使Redis因为 fsync() 而阻塞很久。</span></span>
<span class="line"><span style="color:#24292e;"># 注意，目前对这个情况还没有完美修正，甚至不同线程的 fsync() 会阻塞我们的 write(2) 请求。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 为了缓解这个问题，可以用下面这个选项。它可以在 BGSAVE 或 BGREWRITEAOF 处理时阻止 fsync()。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 这就意味着如果有子进程在进行保存操作，那么Redis就处于&quot;不可同步&quot;的状态。</span></span>
<span class="line"><span style="color:#24292e;"># 这实际上是说，在最差的情况下可能会丢掉30秒钟的日志数据。（默认Linux设定）</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 如果你有延迟的问题那就把这个设为 &quot;yes&quot;，否则就保持 &quot;no&quot;，这是保存持久数据的最安全的方式。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">auto-aof-rewrite-percentage 100</span></span>
<span class="line"><span style="color:#24292e;">auto-aof-rewrite-min-size 64mb</span></span>
<span class="line"><span style="color:#24292e;"># 自动重写AOF文件</span></span>
<span class="line"><span style="color:#24292e;"># 如果AOF日志文件大到指定百分比，Redis能够通过 BGREWRITEAOF 自动重写AOF日志文件。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 工作原理：Redis记住上次重写时AOF日志的大小（或者重启后没有写操作的话，那就直接用此时的AOF文件），</span></span>
<span class="line"><span style="color:#24292e;"># 基准尺寸和当前尺寸做比较。如果当前尺寸超过指定比例，就会触发重写操作。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 你还需要指定被重写日志的最小尺寸，这样避免了达到约定百分比但尺寸仍然很小的情况还要重写。</span></span>
<span class="line"><span style="color:#24292e;"># 指定百分比为0会禁用AOF自动重写特性</span></span></code></pre></div><h2 id="慢查询日志" tabindex="-1">慢查询日志 <a class="header-anchor" href="#慢查询日志" aria-label="Permalink to &quot;慢查询日志&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">################################## 慢查询日志 ###################################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#e1e4e8;"># Redis慢查询日志可以记录超过指定时间的查询。运行时间不包括各种I/O时间。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 例如：连接客户端，发送响应数据等。只计算命令运行的实际时间（这是唯一一种命令运行线程阻塞而无法同时为其他请求服务的场景）</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 你可以为慢查询日志配置两个参数：一个是超标时间，单位为微妙，记录超过个时间的命令。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 另一个是慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 下面的时间单位是微秒，所以1000000就是1秒。注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">slowlog-max-len 128</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这个长度没有限制。只要有足够的内存就行。你可以通过 SLOWLOG RESET 来释放内存</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">################################## 慢查询日志 ###################################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#24292e;"># Redis慢查询日志可以记录超过指定时间的查询。运行时间不包括各种I/O时间。</span></span>
<span class="line"><span style="color:#24292e;"># 例如：连接客户端，发送响应数据等。只计算命令运行的实际时间（这是唯一一种命令运行线程阻塞而无法同时为其他请求服务的场景）</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 你可以为慢查询日志配置两个参数：一个是超标时间，单位为微妙，记录超过个时间的命令。</span></span>
<span class="line"><span style="color:#24292e;"># 另一个是慢查询日志长度。当一个新的命令被写进日志的时候，最老的那个记录会被删掉。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 下面的时间单位是微秒，所以1000000就是1秒。注意，负数时间会禁用慢查询日志，而0则会强制记录所有命令。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">slowlog-max-len 128</span></span>
<span class="line"><span style="color:#24292e;"># 这个长度没有限制。只要有足够的内存就行。你可以通过 SLOWLOG RESET 来释放内存</span></span></code></pre></div><h2 id="虚拟内存" tabindex="-1">虚拟内存 <a class="header-anchor" href="#虚拟内存" aria-label="Permalink to &quot;虚拟内存&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">################################ 虚拟内存 ###############################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">### 警告！虚拟内存在Redis 2.4是反对的。</span></span>
<span class="line"><span style="color:#e1e4e8;">### 非常不鼓励使用虚拟内存！！</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vm-enabled no</span></span>
<span class="line"><span style="color:#e1e4e8;">vm-enabled yes</span></span>
<span class="line"><span style="color:#e1e4e8;"># 虚拟内存可以使Redis在内存不够的情况下仍然可以将所有数据序列保存在内存里。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 为了做到这一点，高频key会调到内存里，而低频key会转到交换文件里，就像操作系统使用内存页一样。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 要使用虚拟内存，只要把 &quot;vm-enabled&quot; 设置为 &quot;yes&quot;，并根据需要设置下面三个虚拟内存参数就可以了。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vm-swap-file /tmp/redis.swap</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这是交换文件的路径。估计你猜到了，交换文件不能在多个Redis实例之间共享，所以确保每个Redis实例使用一个独立交换文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 最好的保存交换文件（被随机访问）的介质是固态硬盘（SSD）。</span></span>
<span class="line"><span style="color:#e1e4e8;"># *** 警告 *** 如果你使用共享主机，那么默认的交换文件放到 /tmp 下是不安全的。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建一个Redis用户可写的目录，并配置Redis在这里创建交换文件。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vm-max-memory 0</span></span>
<span class="line"><span style="color:#e1e4e8;"># &quot;vm-max-memory&quot; 配置虚拟内存可用的最大内存容量。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果交换文件还有空间的话，所有超标部分都会放到交换文件里。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># &quot;vm-max-memory&quot; 设置为0表示系统会用掉所有可用内存。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这默认值不咋地，只是把你能用的内存全用掉了，留点余量会更好。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 例如，设置为剩余内存的60%-80%</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vm-page-size 32</span></span>
<span class="line"><span style="color:#e1e4e8;"># Redis交换文件是分成多个数据页的。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 一个可存储对象可以被保存在多个连续页里，但是一个数据页无法被多个对象共享。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 所以，如果你的数据页太大，那么小对象就会浪费掉很多空间。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果数据页太小，那用于存储的交换空间就会更少（假定你设置相同的数据页数量）</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果你使用很多小对象，建议分页尺寸为64或32个字节。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果你使用很多大对象，那就用大一些的尺寸。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果不确定，那就用默认值 :)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vm-pages 134217728</span></span>
<span class="line"><span style="color:#e1e4e8;"># 交换文件里数据页总数。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 根据内存中分页表（已用/未用的数据页分布情况），磁盘上每8个数据页会消耗内存里1个字节。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 交换区容量 = vm-page-size * vm-pages</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 根据默认的32字节的数据页尺寸和134217728的数据页数来算，Redis的数据页文件会占4GB，而内存里的分页表会消耗16MB内存。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 为你的应验程序设置最小且够用的数字比较好，下面这个默认值在大多数情况下都是偏大的。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vm-max-threads 4</span></span>
<span class="line"><span style="color:#e1e4e8;"># 同时可运行的虚拟内存I/O线程数。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这些线程可以完成从交换文件进行数据读写的操作，也可以处理数据在内存与磁盘间的交互和编码/解码处理。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 多一些线程可以一定程度上提高处理效率，虽然I/O操作本身依赖于物理设备的限制，不会因为更多的线程而提高单次读写操作的效率。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 特殊值0会关闭线程级I/O，并会开启阻塞虚拟内存机制。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">################################ 虚拟内存 ###############################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">### 警告！虚拟内存在Redis 2.4是反对的。</span></span>
<span class="line"><span style="color:#24292e;">### 非常不鼓励使用虚拟内存！！</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vm-enabled no</span></span>
<span class="line"><span style="color:#24292e;">vm-enabled yes</span></span>
<span class="line"><span style="color:#24292e;"># 虚拟内存可以使Redis在内存不够的情况下仍然可以将所有数据序列保存在内存里。</span></span>
<span class="line"><span style="color:#24292e;"># 为了做到这一点，高频key会调到内存里，而低频key会转到交换文件里，就像操作系统使用内存页一样。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 要使用虚拟内存，只要把 &quot;vm-enabled&quot; 设置为 &quot;yes&quot;，并根据需要设置下面三个虚拟内存参数就可以了。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vm-swap-file /tmp/redis.swap</span></span>
<span class="line"><span style="color:#24292e;"># 这是交换文件的路径。估计你猜到了，交换文件不能在多个Redis实例之间共享，所以确保每个Redis实例使用一个独立交换文件。</span></span>
<span class="line"><span style="color:#24292e;"># 最好的保存交换文件（被随机访问）的介质是固态硬盘（SSD）。</span></span>
<span class="line"><span style="color:#24292e;"># *** 警告 *** 如果你使用共享主机，那么默认的交换文件放到 /tmp 下是不安全的。</span></span>
<span class="line"><span style="color:#24292e;"># 创建一个Redis用户可写的目录，并配置Redis在这里创建交换文件。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vm-max-memory 0</span></span>
<span class="line"><span style="color:#24292e;"># &quot;vm-max-memory&quot; 配置虚拟内存可用的最大内存容量。</span></span>
<span class="line"><span style="color:#24292e;"># 如果交换文件还有空间的话，所有超标部分都会放到交换文件里。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># &quot;vm-max-memory&quot; 设置为0表示系统会用掉所有可用内存。</span></span>
<span class="line"><span style="color:#24292e;"># 这默认值不咋地，只是把你能用的内存全用掉了，留点余量会更好。</span></span>
<span class="line"><span style="color:#24292e;"># 例如，设置为剩余内存的60%-80%</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vm-page-size 32</span></span>
<span class="line"><span style="color:#24292e;"># Redis交换文件是分成多个数据页的。</span></span>
<span class="line"><span style="color:#24292e;"># 一个可存储对象可以被保存在多个连续页里，但是一个数据页无法被多个对象共享。</span></span>
<span class="line"><span style="color:#24292e;"># 所以，如果你的数据页太大，那么小对象就会浪费掉很多空间。</span></span>
<span class="line"><span style="color:#24292e;"># 如果数据页太小，那用于存储的交换空间就会更少（假定你设置相同的数据页数量）</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 如果你使用很多小对象，建议分页尺寸为64或32个字节。</span></span>
<span class="line"><span style="color:#24292e;"># 如果你使用很多大对象，那就用大一些的尺寸。</span></span>
<span class="line"><span style="color:#24292e;"># 如果不确定，那就用默认值 :)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vm-pages 134217728</span></span>
<span class="line"><span style="color:#24292e;"># 交换文件里数据页总数。</span></span>
<span class="line"><span style="color:#24292e;"># 根据内存中分页表（已用/未用的数据页分布情况），磁盘上每8个数据页会消耗内存里1个字节。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 交换区容量 = vm-page-size * vm-pages</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 根据默认的32字节的数据页尺寸和134217728的数据页数来算，Redis的数据页文件会占4GB，而内存里的分页表会消耗16MB内存。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 为你的应验程序设置最小且够用的数字比较好，下面这个默认值在大多数情况下都是偏大的。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vm-max-threads 4</span></span>
<span class="line"><span style="color:#24292e;"># 同时可运行的虚拟内存I/O线程数。</span></span>
<span class="line"><span style="color:#24292e;"># 这些线程可以完成从交换文件进行数据读写的操作，也可以处理数据在内存与磁盘间的交互和编码/解码处理。</span></span>
<span class="line"><span style="color:#24292e;"># 多一些线程可以一定程度上提高处理效率，虽然I/O操作本身依赖于物理设备的限制，不会因为更多的线程而提高单次读写操作的效率。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 特殊值0会关闭线程级I/O，并会开启阻塞虚拟内存机制。</span></span></code></pre></div><h2 id="高级配置" tabindex="-1">高级配置 <a class="header-anchor" href="#高级配置" aria-label="Permalink to &quot;高级配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">############################### 高级配置 ###############################</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">hash-max-zipmap-entries 512</span></span>
<span class="line"><span style="color:#e1e4e8;">hash-max-zipmap-value 64</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当有大量数据时，适合用哈希编码（需要更多的内存），元素数量上限不能超过给定限制。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 你可以通过下面的选项来设定这些限制：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">list-max-ziplist-entries 512</span></span>
<span class="line"><span style="color:#e1e4e8;">list-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#e1e4e8;"># 与哈希相类似，数据元素较少的情况下，可以用另一种方式来编码从而节省大量空间。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这种方式只有在符合下面限制的时候才可以用：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set-max-intset-entries 512</span></span>
<span class="line"><span style="color:#e1e4e8;"># 还有这样一种特殊编码的情况：数据全是64位无符号整型数字构成的字符串。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 下面这个配置项就是用来限制这种情况下使用这种编码的最大上限的。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">zset-max-ziplist-entries 128</span></span>
<span class="line"><span style="color:#e1e4e8;">zset-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#e1e4e8;"># 与第一、第二种情况相似，有序序列也可以用一种特别的编码方式来处理，可节省大量空间。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这种编码只适合长度和元素都符合下面限制的有序序列：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">activerehashing yes</span></span>
<span class="line"><span style="color:#e1e4e8;"># 哈希刷新，每100个CPU毫秒会拿出1个毫秒来刷新Redis的主哈希表（顶级键值映射表）。</span></span>
<span class="line"><span style="color:#e1e4e8;"># redis所用的哈希表实现（见dict.c）采用延迟哈希刷新机制：你对一个哈希表操作越多，哈希刷新操作就越频繁；</span></span>
<span class="line"><span style="color:#e1e4e8;"># 反之，如果服务器非常不活跃那么也就是用点内存保存哈希表而已。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认是每秒钟进行10次哈希表刷新，用来刷新字典，然后尽快释放内存。</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;"># 建议：</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果你对延迟比较在意的话就用 &quot;activerehashing no&quot;，每个请求延迟2毫秒不太好嘛。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果你不太在意延迟而希望尽快释放内存的话就设置 &quot;activerehashing yes&quot;。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span style="color:#e1e4e8;">client-output-buffer-limit slave 256mb 64mb 60</span></span>
<span class="line"><span style="color:#e1e4e8;">client-output-buffer-limit pubsub 32mb 8mb 60</span></span>
<span class="line"><span style="color:#e1e4e8;"># 客户端输出缓存限制强迫断开读取速度比较慢的客户端</span></span>
<span class="line"><span style="color:#e1e4e8;"># 有三种类型的限制</span></span>
<span class="line"><span style="color:#e1e4e8;"># normal -&gt; 正常的客户端包括监控客户端</span></span>
<span class="line"><span style="color:#e1e4e8;"># slave -&gt; 从客户端</span></span>
<span class="line"><span style="color:#e1e4e8;"># pubsub -&gt; 客户端至少订阅了一个频道或者模式</span></span>
<span class="line"><span style="color:#e1e4e8;"># 客户端输出缓存限制语法如下（时间单位：秒）</span></span>
<span class="line"><span style="color:#e1e4e8;"># client-output-buffer-limit &lt;类别&gt; &lt;强制限制&gt; &lt;软性限制&gt; &lt;软性时间&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 达到强制限制缓存大小，立刻断开链接。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 达到软性限制，仍然会有软性时间大小的链接时间</span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认正常客户端无限制，只有请求后，异步客户端数据请求速度快于它能读取数据的速度</span></span>
<span class="line"><span style="color:#e1e4e8;"># 订阅模式和主从客户端又默认限制，因为它们都接受推送。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 强制限制和软性限制都可以设置为0来禁用这个特性</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">hz 10</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置Redis后台任务执行频率，比如清除过期键任务。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置范围为1到500，默认为10.越大CPU消耗越大，延迟越小。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 建议不要超过100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当子进程重写AOF文件，以下选项开启时，AOF文件会每产生32M数据同步一次。</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这有助于更快写入文件到磁盘避免延迟</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">############################### 高级配置 ###############################</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">hash-max-zipmap-entries 512</span></span>
<span class="line"><span style="color:#24292e;">hash-max-zipmap-value 64</span></span>
<span class="line"><span style="color:#24292e;"># 当有大量数据时，适合用哈希编码（需要更多的内存），元素数量上限不能超过给定限制。</span></span>
<span class="line"><span style="color:#24292e;"># 你可以通过下面的选项来设定这些限制：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">list-max-ziplist-entries 512</span></span>
<span class="line"><span style="color:#24292e;">list-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#24292e;"># 与哈希相类似，数据元素较少的情况下，可以用另一种方式来编码从而节省大量空间。</span></span>
<span class="line"><span style="color:#24292e;"># 这种方式只有在符合下面限制的时候才可以用：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set-max-intset-entries 512</span></span>
<span class="line"><span style="color:#24292e;"># 还有这样一种特殊编码的情况：数据全是64位无符号整型数字构成的字符串。</span></span>
<span class="line"><span style="color:#24292e;"># 下面这个配置项就是用来限制这种情况下使用这种编码的最大上限的。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">zset-max-ziplist-entries 128</span></span>
<span class="line"><span style="color:#24292e;">zset-max-ziplist-value 64</span></span>
<span class="line"><span style="color:#24292e;"># 与第一、第二种情况相似，有序序列也可以用一种特别的编码方式来处理，可节省大量空间。</span></span>
<span class="line"><span style="color:#24292e;"># 这种编码只适合长度和元素都符合下面限制的有序序列：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">activerehashing yes</span></span>
<span class="line"><span style="color:#24292e;"># 哈希刷新，每100个CPU毫秒会拿出1个毫秒来刷新Redis的主哈希表（顶级键值映射表）。</span></span>
<span class="line"><span style="color:#24292e;"># redis所用的哈希表实现（见dict.c）采用延迟哈希刷新机制：你对一个哈希表操作越多，哈希刷新操作就越频繁；</span></span>
<span class="line"><span style="color:#24292e;"># 反之，如果服务器非常不活跃那么也就是用点内存保存哈希表而已。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 默认是每秒钟进行10次哈希表刷新，用来刷新字典，然后尽快释放内存。</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;"># 建议：</span></span>
<span class="line"><span style="color:#24292e;"># 如果你对延迟比较在意的话就用 &quot;activerehashing no&quot;，每个请求延迟2毫秒不太好嘛。</span></span>
<span class="line"><span style="color:#24292e;"># 如果你不太在意延迟而希望尽快释放内存的话就设置 &quot;activerehashing yes&quot;。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">client-output-buffer-limit normal 0 0 0</span></span>
<span class="line"><span style="color:#24292e;">client-output-buffer-limit slave 256mb 64mb 60</span></span>
<span class="line"><span style="color:#24292e;">client-output-buffer-limit pubsub 32mb 8mb 60</span></span>
<span class="line"><span style="color:#24292e;"># 客户端输出缓存限制强迫断开读取速度比较慢的客户端</span></span>
<span class="line"><span style="color:#24292e;"># 有三种类型的限制</span></span>
<span class="line"><span style="color:#24292e;"># normal -&gt; 正常的客户端包括监控客户端</span></span>
<span class="line"><span style="color:#24292e;"># slave -&gt; 从客户端</span></span>
<span class="line"><span style="color:#24292e;"># pubsub -&gt; 客户端至少订阅了一个频道或者模式</span></span>
<span class="line"><span style="color:#24292e;"># 客户端输出缓存限制语法如下（时间单位：秒）</span></span>
<span class="line"><span style="color:#24292e;"># client-output-buffer-limit &lt;类别&gt; &lt;强制限制&gt; &lt;软性限制&gt; &lt;软性时间&gt;</span></span>
<span class="line"><span style="color:#24292e;"># 达到强制限制缓存大小，立刻断开链接。</span></span>
<span class="line"><span style="color:#24292e;"># 达到软性限制，仍然会有软性时间大小的链接时间</span></span>
<span class="line"><span style="color:#24292e;"># 默认正常客户端无限制，只有请求后，异步客户端数据请求速度快于它能读取数据的速度</span></span>
<span class="line"><span style="color:#24292e;"># 订阅模式和主从客户端又默认限制，因为它们都接受推送。</span></span>
<span class="line"><span style="color:#24292e;"># 强制限制和软性限制都可以设置为0来禁用这个特性</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">hz 10</span></span>
<span class="line"><span style="color:#24292e;"># 设置Redis后台任务执行频率，比如清除过期键任务。</span></span>
<span class="line"><span style="color:#24292e;"># 设置范围为1到500，默认为10.越大CPU消耗越大，延迟越小。</span></span>
<span class="line"><span style="color:#24292e;"># 建议不要超过100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">aof-rewrite-incremental-fsync yes</span></span>
<span class="line"><span style="color:#24292e;"># 当子进程重写AOF文件，以下选项开启时，AOF文件会每产生32M数据同步一次。</span></span>
<span class="line"><span style="color:#24292e;"># 这有助于更快写入文件到磁盘避免延迟</span></span></code></pre></div>`,16),o=[p];function c(t,i,r,y,d,u){return n(),a("div",null,o)}const g=s(l,[["render",c]]);export{v as __pageData,g as default};
