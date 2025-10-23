import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/service/9-Supervisor.md","filePath":"guide/Linux/service/9-Supervisor.md","lastUpdated":1752158731000}'),p={name:"guide/Linux/service/9-Supervisor.md"},l=e(`<h2 id="一、supervisor简介" tabindex="-1">一、supervisor简介 <a class="header-anchor" href="#一、supervisor简介" aria-label="Permalink to &quot;一、supervisor简介&quot;">​</a></h2><p>Supervisor是用Python开发的一套通用的进程管理程序，能将一个普通的命令行进程变为后台daemon，并监控进程状态，异常退出时能自动重启。它是通过fork/exec的方式把这些被管理的进程当作supervisor的子进程来启动，这样只要在supervisor的配置文件中，把要管理的进程的可执行文件的路径写进去即可。也实现当子进程挂掉的时候，父进程可以准确获取子进程挂掉的信息的，可以选择是否自己启动和报警。supervisor还提供了一个功能，可以为supervisord或者每个子进程，设置一个非root的user，这个user就可以管理它对应的进程</p><p>*注：本文以centos7为例，supervisor版本4.2.2</p><p>官方文档，<a href="http://supervisord.org/" target="_blank" rel="noreferrer">http://supervisord.org/</a></p><p>优点：</p><p>​ 规范化</p><p>​ supervisor配置文件中指定子进程的配置文件路径，将所有子进程放在一个目录，并对子进程配置文件类型（后缀）统一要求。</p><p>自动重启</p><p>​ 可以设置 supervisor 启动后，自动启动子进程。父进程对子进程进行监控，当子进程误挂掉后，可以自动重启。</p><p>功能丰富：</p><p>​ 配置项（自动重启次数、进程数量等）众多，可以根据自己的业务需求选择合适配置项。</p><p>命令健全</p><p>​ 提供了重启、开启、关闭等命令选项</p><h2 id="二、supervisor安装" tabindex="-1">二、supervisor安装 <a class="header-anchor" href="#二、supervisor安装" aria-label="Permalink to &quot;二、supervisor安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install -y epel-release &amp;&amp; yum install -y supervisor</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看版本</span></span>
<span class="line"><span style="color:#e1e4e8;">supervisord --version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install -y epel-release &amp;&amp; yum install -y supervisor</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看版本</span></span>
<span class="line"><span style="color:#24292e;">supervisord --version</span></span></code></pre></div><h3 id="_3-1systemd-配置" tabindex="-1">3.1systemd 配置 <a class="header-anchor" href="#_3-1systemd-配置" aria-label="Permalink to &quot;3.1systemd 配置&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/supervisord.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">Supervisor</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">daemon</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">Type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">forking</span></span>
<span class="line"><span style="color:#E1E4E8;">PIDFile</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/var/run/supervisord.pid</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/bin/supervisord</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/supervisord.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStop</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/bin/supervisorctl</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">shutdown</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecReload</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/bin/supervisorctl</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reload</span></span>
<span class="line"><span style="color:#E1E4E8;">KillMode</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">process</span></span>
<span class="line"><span style="color:#E1E4E8;">Restart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">on-failure</span></span>
<span class="line"><span style="color:#E1E4E8;">RestartSec</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">42</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"><span style="color:#E1E4E8;">LimitNOFILE</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1048576</span></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/systemd/system/supervisord.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">Supervisor</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">daemon</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">Type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">forking</span></span>
<span class="line"><span style="color:#24292E;">PIDFile</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/var/run/supervisord.pid</span></span>
<span class="line"><span style="color:#24292E;">ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/bin/supervisord</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/supervisord.conf</span></span>
<span class="line"><span style="color:#24292E;">ExecStop</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/bin/supervisorctl</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">shutdown</span></span>
<span class="line"><span style="color:#24292E;">ExecReload</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/bin/supervisorctl</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reload</span></span>
<span class="line"><span style="color:#24292E;">KillMode</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">process</span></span>
<span class="line"><span style="color:#24292E;">Restart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">on-failure</span></span>
<span class="line"><span style="color:#24292E;">RestartSec</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">42</span><span style="color:#032F62;">s</span></span>
<span class="line"><span style="color:#24292E;">LimitNOFILE</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1048576</span></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><h3 id="_3-2启动" tabindex="-1">3.2启动 <a class="header-anchor" href="#_3-2启动" aria-label="Permalink to &quot;3.2启动&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#开机启动</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">supervisord</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">supervisord</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#关闭</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">supervisord</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">reload</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">supervisord</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">supervisord</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">status：查看服务状态</span></span>
<span class="line"><span style="color:#B392F0;">update：重新加载配置文件，添加新服务的时候执行</span></span>
<span class="line"><span style="color:#B392F0;">restart：重新启动服务</span></span>
<span class="line"><span style="color:#B392F0;">stop：停止服务</span></span>
<span class="line"><span style="color:#B392F0;">pid：查看某服务的</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pid</span></span>
<span class="line"><span style="color:#B392F0;">tail：输出最新的</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">log</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">信息</span></span>
<span class="line"><span style="color:#B392F0;">shutdown：关闭</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">supervisord</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">服务</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#开机启动</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">supervisord</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">supervisord</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#关闭</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">supervisord</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">reload</span><span style="color:#24292E;"> </span><span style="color:#032F62;">supervisord</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">supervisord</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">status：查看服务状态</span></span>
<span class="line"><span style="color:#6F42C1;">update：重新加载配置文件，添加新服务的时候执行</span></span>
<span class="line"><span style="color:#6F42C1;">restart：重新启动服务</span></span>
<span class="line"><span style="color:#6F42C1;">stop：停止服务</span></span>
<span class="line"><span style="color:#6F42C1;">pid：查看某服务的</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pid</span></span>
<span class="line"><span style="color:#6F42C1;">tail：输出最新的</span><span style="color:#24292E;"> </span><span style="color:#032F62;">log</span><span style="color:#24292E;"> </span><span style="color:#032F62;">信息</span></span>
<span class="line"><span style="color:#6F42C1;">shutdown：关闭</span><span style="color:#24292E;"> </span><span style="color:#032F62;">supervisord</span><span style="color:#24292E;"> </span><span style="color:#032F62;">服务</span></span></code></pre></div><h2 id="三、supervisor使用" tabindex="-1">三、supervisor使用 <a class="header-anchor" href="#三、supervisor使用" aria-label="Permalink to &quot;三、supervisor使用&quot;">​</a></h2><h3 id="supervisor配置文件" tabindex="-1">supervisor配置文件 <a class="header-anchor" href="#supervisor配置文件" aria-label="Permalink to &quot;supervisor配置文件&quot;">​</a></h3><p>/etc/supervisord.conf</p><p><em>注：supervisor的配置文件默认是不全的，不过在大部分默认的情况下，上面说的基本功能已经满足</em></p><h3 id="子进程配置文件路径" tabindex="-1">子进程配置文件路径 <a class="header-anchor" href="#子进程配置文件路径" aria-label="Permalink to &quot;子进程配置文件路径&quot;">​</a></h3><p><code>/etc/supervisord.d/</code></p><p><em>注：默认子进程配置文件为ini格式，可在supervisor主配置文件中修改</em></p><h2 id="四、配置文件说明" tabindex="-1">四、配置文件说明 <a class="header-anchor" href="#四、配置文件说明" aria-label="Permalink to &quot;四、配置文件说明&quot;">​</a></h2><h3 id="生成配置文件" tabindex="-1">生成配置文件 <a class="header-anchor" href="#生成配置文件" aria-label="Permalink to &quot;生成配置文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ mkdir /etc/supervisor</span></span>
<span class="line"><span style="color:#e1e4e8;">$ echo_supervisord_conf &gt; /etc/supervisor/supervisord.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ mkdir /etc/supervisor</span></span>
<span class="line"><span style="color:#24292e;">$ echo_supervisord_conf &gt; /etc/supervisor/supervisord.conf</span></span></code></pre></div><h3 id="主配置部分" tabindex="-1">主配置部分 <a class="header-anchor" href="#主配置部分" aria-label="Permalink to &quot;主配置部分&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[unix_http_server]</span></span>
<span class="line"><span style="color:#e1e4e8;">file=/tmp/supervisor.sock   ; socket文件的路径</span></span>
<span class="line"><span style="color:#e1e4e8;">;chmod=0700                 ; socket文件权限</span></span>
<span class="line"><span style="color:#e1e4e8;">;chown=nobody:nogroup       ; socket文件用户和用户组</span></span>
<span class="line"><span style="color:#e1e4e8;">;username=user              ; 连接时认证的用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">;password=123               ; 连接时认证的密码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[inet_http_server]          ; 监听TCP</span></span>
<span class="line"><span style="color:#e1e4e8;">port=127.0.0.1:9001         ; 监听ip和端口</span></span>
<span class="line"><span style="color:#e1e4e8;">username=user               ; 连接时认证的用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">password=123                ; 连接时认证的密码</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[supervisord]</span></span>
<span class="line"><span style="color:#e1e4e8;">logfile=/var/log/supervisord.log ; log目录</span></span>
<span class="line"><span style="color:#e1e4e8;">logfile_maxbytes=50MB        ; log文件最大空间</span></span>
<span class="line"><span style="color:#e1e4e8;">logfile_backups=10           ; log文件保持的数量</span></span>
<span class="line"><span style="color:#e1e4e8;">loglevel=info                ; log级别</span></span>
<span class="line"><span style="color:#e1e4e8;">pidfile=/var/run/supervisord.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">nodaemon=false               ; 是否非守护进程态运行</span></span>
<span class="line"><span style="color:#e1e4e8;">minfds=1024                  ; 系统空闲的最少文件描述符</span></span>
<span class="line"><span style="color:#e1e4e8;">minprocs=200                 ; 可用的最小进程描述符</span></span>
<span class="line"><span style="color:#e1e4e8;">;umask=022                   ; 进程创建文件的掩码</span></span>
<span class="line"><span style="color:#e1e4e8;">;identifier=supervisor       ; supervisord标识符</span></span>
<span class="line"><span style="color:#e1e4e8;">;directory=/tmp              ; 启动前切换到的目录</span></span>
<span class="line"><span style="color:#e1e4e8;">;nocleanup=true              ; 启动前是否清除子进程的日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;">;childlogdir=/tmp            ; AUTO模式，子进程日志路径</span></span>
<span class="line"><span style="color:#e1e4e8;">;environment=KEY=&quot;value&quot;     ; 设置环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[rpcinterface:supervisor]    ; XML_RPC配置</span></span>
<span class="line"><span style="color:#e1e4e8;">supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[supervisorctl]</span></span>
<span class="line"><span style="color:#e1e4e8;">serverurl=unix:///tmp/supervisor.sock ; 连接的socket路径</span></span>
<span class="line"><span style="color:#e1e4e8;">;username=chris               ; 用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">;password=123                 ; 密码</span></span>
<span class="line"><span style="color:#e1e4e8;">prompt=mysupervisor           ; 输入用户名和密码时的提示符</span></span>
<span class="line"><span style="color:#e1e4e8;">;history_file=~/.sc_history   ; 历史操作记录存储路径</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[include]                     ; 包含文件，将每个进程配置为一个文件并包含</span></span>
<span class="line"><span style="color:#e1e4e8;">files = /etc/supervisor/*.ini ; 多个进程的配置文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[unix_http_server]</span></span>
<span class="line"><span style="color:#24292e;">file=/tmp/supervisor.sock   ; socket文件的路径</span></span>
<span class="line"><span style="color:#24292e;">;chmod=0700                 ; socket文件权限</span></span>
<span class="line"><span style="color:#24292e;">;chown=nobody:nogroup       ; socket文件用户和用户组</span></span>
<span class="line"><span style="color:#24292e;">;username=user              ; 连接时认证的用户名</span></span>
<span class="line"><span style="color:#24292e;">;password=123               ; 连接时认证的密码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[inet_http_server]          ; 监听TCP</span></span>
<span class="line"><span style="color:#24292e;">port=127.0.0.1:9001         ; 监听ip和端口</span></span>
<span class="line"><span style="color:#24292e;">username=user               ; 连接时认证的用户名</span></span>
<span class="line"><span style="color:#24292e;">password=123                ; 连接时认证的密码</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[supervisord]</span></span>
<span class="line"><span style="color:#24292e;">logfile=/var/log/supervisord.log ; log目录</span></span>
<span class="line"><span style="color:#24292e;">logfile_maxbytes=50MB        ; log文件最大空间</span></span>
<span class="line"><span style="color:#24292e;">logfile_backups=10           ; log文件保持的数量</span></span>
<span class="line"><span style="color:#24292e;">loglevel=info                ; log级别</span></span>
<span class="line"><span style="color:#24292e;">pidfile=/var/run/supervisord.pid</span></span>
<span class="line"><span style="color:#24292e;">nodaemon=false               ; 是否非守护进程态运行</span></span>
<span class="line"><span style="color:#24292e;">minfds=1024                  ; 系统空闲的最少文件描述符</span></span>
<span class="line"><span style="color:#24292e;">minprocs=200                 ; 可用的最小进程描述符</span></span>
<span class="line"><span style="color:#24292e;">;umask=022                   ; 进程创建文件的掩码</span></span>
<span class="line"><span style="color:#24292e;">;identifier=supervisor       ; supervisord标识符</span></span>
<span class="line"><span style="color:#24292e;">;directory=/tmp              ; 启动前切换到的目录</span></span>
<span class="line"><span style="color:#24292e;">;nocleanup=true              ; 启动前是否清除子进程的日志文件</span></span>
<span class="line"><span style="color:#24292e;">;childlogdir=/tmp            ; AUTO模式，子进程日志路径</span></span>
<span class="line"><span style="color:#24292e;">;environment=KEY=&quot;value&quot;     ; 设置环境变量</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[rpcinterface:supervisor]    ; XML_RPC配置</span></span>
<span class="line"><span style="color:#24292e;">supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[supervisorctl]</span></span>
<span class="line"><span style="color:#24292e;">serverurl=unix:///tmp/supervisor.sock ; 连接的socket路径</span></span>
<span class="line"><span style="color:#24292e;">;username=chris               ; 用户名</span></span>
<span class="line"><span style="color:#24292e;">;password=123                 ; 密码</span></span>
<span class="line"><span style="color:#24292e;">prompt=mysupervisor           ; 输入用户名和密码时的提示符</span></span>
<span class="line"><span style="color:#24292e;">;history_file=~/.sc_history   ; 历史操作记录存储路径</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[include]                     ; 包含文件，将每个进程配置为一个文件并包含</span></span>
<span class="line"><span style="color:#24292e;">files = /etc/supervisor/*.ini ; 多个进程的配置文件</span></span></code></pre></div><p>这部分我们不需要做太多的配置修改，如果需要开启 WEB 终端监控，则需要配置并开启 inet_http_server 项</p><h3 id="进程配置部分" tabindex="-1">进程配置部分 <a class="header-anchor" href="#进程配置部分" aria-label="Permalink to &quot;进程配置部分&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[program:work]                      ; 服务名，例如work</span></span>
<span class="line"><span style="color:#e1e4e8;">command=php -r &quot;sleep(10);exit(1);&quot; ; 带有参数的可执行命令</span></span>
<span class="line"><span style="color:#e1e4e8;">process_name=%(process_num)s        ; 进程名，当numprocs&gt;1时，需包含%(process_num)s</span></span>
<span class="line"><span style="color:#e1e4e8;">numprocs=2                          ; 启动进程的数目数</span></span>
<span class="line"><span style="color:#e1e4e8;">;directory=/tmp                     ; 运行前切换到该目录</span></span>
<span class="line"><span style="color:#e1e4e8;">;umask=022                          ; 进程掩码</span></span>
<span class="line"><span style="color:#e1e4e8;">;priority=999                       ; 子进程启动关闭优先级</span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true                      ; 子进程是否被自动启动，#这个是设置子进程挂掉后自动重启的情况，有三个选项，false,unexpected和true。如果&gt;为false的时候，无论什么情况下，都不会被重新启动，如果为unexpected，只有当进程的&gt;退出码不在下面的exitcodes里面定义的退出码的时候，才会被自动重启。当为true的时候&gt;&gt;，只要子进程挂掉，将会被无条件的重启</span></span>
<span class="line"><span style="color:#e1e4e8;">startsecs=1                         ; 成功启动几秒后则认为成功启动</span></span>
<span class="line"><span style="color:#e1e4e8;">;startretries=3                     ; 子进程启动失败后，最大尝试启动的次数</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=unexpected            ; 子进程意外退出后自动重启的选项，false, unexpected, true。unexpected表示不在exitcodes列表时重启</span></span>
<span class="line"><span style="color:#e1e4e8;">exitcodes=0,2                     ; 期待的子程序退出码</span></span>
<span class="line"><span style="color:#e1e4e8;">;stopsignal=QUIT                  ; 进程停止信号，可以为TERM,HUP,INT,QUIT,KILL,USR1,or USR2等信号，默认为TERM</span></span>
<span class="line"><span style="color:#e1e4e8;">;stopwaitsecs=10                  ; 发送停止信号后等待的最大时间</span></span>
<span class="line"><span style="color:#e1e4e8;">;stopasgroup=false                ; 是否向子进程组发送停止信号</span></span>
<span class="line"><span style="color:#e1e4e8;">;killasgroup=false                ; 是否向子进程组发送kill信号</span></span>
<span class="line"><span style="color:#e1e4e8;">;redirect_stderr=true             ; 是否重定向日志到标准输出</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=/data/logs/work.log ; 进程的stdout的日志路径</span></span>
<span class="line"><span style="color:#e1e4e8;">;stdout_logfile_maxbytes=1MB      ; 日志文件最大大小</span></span>
<span class="line"><span style="color:#e1e4e8;">;stdout_logfile_backups=10</span></span>
<span class="line"><span style="color:#e1e4e8;">;stdout_capture_maxbytes=1MB</span></span>
<span class="line"><span style="color:#e1e4e8;">;stderr_logfile=/a/path           ; stderr的日志路径</span></span>
<span class="line"><span style="color:#e1e4e8;">;stderr_logfile_maxbytes=1MB</span></span>
<span class="line"><span style="color:#e1e4e8;">;stderr_logfile_backups=10</span></span>
<span class="line"><span style="color:#e1e4e8;">;stderr_capture_maxbytes=1MB</span></span>
<span class="line"><span style="color:#e1e4e8;">;environment=A=&quot;1&quot;,B=&quot;2&quot;          ; 子进程的环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">;serverurl=AUTO                   ; 子进程的环境变量SUPERVISOR_SERVER_URL</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[program:work]                      ; 服务名，例如work</span></span>
<span class="line"><span style="color:#24292e;">command=php -r &quot;sleep(10);exit(1);&quot; ; 带有参数的可执行命令</span></span>
<span class="line"><span style="color:#24292e;">process_name=%(process_num)s        ; 进程名，当numprocs&gt;1时，需包含%(process_num)s</span></span>
<span class="line"><span style="color:#24292e;">numprocs=2                          ; 启动进程的数目数</span></span>
<span class="line"><span style="color:#24292e;">;directory=/tmp                     ; 运行前切换到该目录</span></span>
<span class="line"><span style="color:#24292e;">;umask=022                          ; 进程掩码</span></span>
<span class="line"><span style="color:#24292e;">;priority=999                       ; 子进程启动关闭优先级</span></span>
<span class="line"><span style="color:#24292e;">autostart=true                      ; 子进程是否被自动启动，#这个是设置子进程挂掉后自动重启的情况，有三个选项，false,unexpected和true。如果&gt;为false的时候，无论什么情况下，都不会被重新启动，如果为unexpected，只有当进程的&gt;退出码不在下面的exitcodes里面定义的退出码的时候，才会被自动重启。当为true的时候&gt;&gt;，只要子进程挂掉，将会被无条件的重启</span></span>
<span class="line"><span style="color:#24292e;">startsecs=1                         ; 成功启动几秒后则认为成功启动</span></span>
<span class="line"><span style="color:#24292e;">;startretries=3                     ; 子进程启动失败后，最大尝试启动的次数</span></span>
<span class="line"><span style="color:#24292e;">autorestart=unexpected            ; 子进程意外退出后自动重启的选项，false, unexpected, true。unexpected表示不在exitcodes列表时重启</span></span>
<span class="line"><span style="color:#24292e;">exitcodes=0,2                     ; 期待的子程序退出码</span></span>
<span class="line"><span style="color:#24292e;">;stopsignal=QUIT                  ; 进程停止信号，可以为TERM,HUP,INT,QUIT,KILL,USR1,or USR2等信号，默认为TERM</span></span>
<span class="line"><span style="color:#24292e;">;stopwaitsecs=10                  ; 发送停止信号后等待的最大时间</span></span>
<span class="line"><span style="color:#24292e;">;stopasgroup=false                ; 是否向子进程组发送停止信号</span></span>
<span class="line"><span style="color:#24292e;">;killasgroup=false                ; 是否向子进程组发送kill信号</span></span>
<span class="line"><span style="color:#24292e;">;redirect_stderr=true             ; 是否重定向日志到标准输出</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=/data/logs/work.log ; 进程的stdout的日志路径</span></span>
<span class="line"><span style="color:#24292e;">;stdout_logfile_maxbytes=1MB      ; 日志文件最大大小</span></span>
<span class="line"><span style="color:#24292e;">;stdout_logfile_backups=10</span></span>
<span class="line"><span style="color:#24292e;">;stdout_capture_maxbytes=1MB</span></span>
<span class="line"><span style="color:#24292e;">;stderr_logfile=/a/path           ; stderr的日志路径</span></span>
<span class="line"><span style="color:#24292e;">;stderr_logfile_maxbytes=1MB</span></span>
<span class="line"><span style="color:#24292e;">;stderr_logfile_backups=10</span></span>
<span class="line"><span style="color:#24292e;">;stderr_capture_maxbytes=1MB</span></span>
<span class="line"><span style="color:#24292e;">;environment=A=&quot;1&quot;,B=&quot;2&quot;          ; 子进程的环境变量</span></span>
<span class="line"><span style="color:#24292e;">;serverurl=AUTO                   ; 子进程的环境变量SUPERVISOR_SERVER_URL</span></span></code></pre></div><blockquote><p>通常将每个进程的配置信息配置成独立文件，并通过 include 模块包含，这样方便修改和管理配置文件</p></blockquote><h4 id="kill" tabindex="-1">kill <a class="header-anchor" href="#kill" aria-label="Permalink to &quot;kill&quot;">​</a></h4><p>supervisor支持的信号：TERM，HUP，INT，QUIT，KILL，USR1或USR2中的任何一个，分别对应内核级信号：SIGTERM，SIGHUP，SIGINT，SIGQUIT，SIGKILL，SIGUSR1，SIGUSR2</p><p>其中，USR1信号将导致以下步骤的发生：</p><ul><li>停止接受新的连接</li><li>等待当前连接停止</li><li>重新载入配置文件，重新打开日志文件，重启服务器，从而实现相对平滑的不关机的更改</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#以USR1为例，新增如下行</span></span>
<span class="line"><span style="color:#e1e4e8;">stopsignal = USR1</span></span>
<span class="line"><span style="color:#e1e4e8;">stopwaitsecs = 20</span></span>
<span class="line"><span style="color:#e1e4e8;">stopasgroup = true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">stopsignal含义</span></span>
<span class="line"><span style="color:#e1e4e8;">	使用SIGUSR1信号来stop</span></span>
<span class="line"><span style="color:#e1e4e8;">stopwaitsecs含义</span></span>
<span class="line"><span style="color:#e1e4e8;">	在向程序发送停止信号后，等待操作系统将SIGCHLD返回给supervisor的秒数。如果超过了这个时间仍未收到SIGCHLD，最终将会使用SIGKILL来杀掉进程。默认值：10秒</span></span>
<span class="line"><span style="color:#e1e4e8;">stopasgroup含义</span></span>
<span class="line"><span style="color:#e1e4e8;">	将停止信号发送到整个过程组，使程序将停止信号成为孤立状态</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#以USR1为例，新增如下行</span></span>
<span class="line"><span style="color:#24292e;">stopsignal = USR1</span></span>
<span class="line"><span style="color:#24292e;">stopwaitsecs = 20</span></span>
<span class="line"><span style="color:#24292e;">stopasgroup = true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">stopsignal含义</span></span>
<span class="line"><span style="color:#24292e;">	使用SIGUSR1信号来stop</span></span>
<span class="line"><span style="color:#24292e;">stopwaitsecs含义</span></span>
<span class="line"><span style="color:#24292e;">	在向程序发送停止信号后，等待操作系统将SIGCHLD返回给supervisor的秒数。如果超过了这个时间仍未收到SIGCHLD，最终将会使用SIGKILL来杀掉进程。默认值：10秒</span></span>
<span class="line"><span style="color:#24292e;">stopasgroup含义</span></span>
<span class="line"><span style="color:#24292e;">	将停止信号发送到整个过程组，使程序将停止信号成为孤立状态</span></span></code></pre></div><h3 id="supervisor-conf配置文件说明" tabindex="-1">supervisor.conf配置文件说明 <a class="header-anchor" href="#supervisor-conf配置文件说明" aria-label="Permalink to &quot;supervisor.conf配置文件说明&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[unix_http_server]</span></span>
<span class="line"><span style="color:#e1e4e8;">file=/tmp/supervisor.sock   ;UNIX socket 文件，supervisorctl 会使用</span></span>
<span class="line"><span style="color:#e1e4e8;">;chmod=0700                 ;socket文件的mode，默认是0700</span></span>
<span class="line"><span style="color:#e1e4e8;">;chown=nobody:nogroup       ;socket文件的owner，格式：uid:gid</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">;[inet_http_server]         ;HTTP服务器，提供web管理界面</span></span>
<span class="line"><span style="color:#e1e4e8;">;port=127.0.0.1:9001        ;Web管理后台运行的IP和端口，如果开放到公网，需要注意安全性</span></span>
<span class="line"><span style="color:#e1e4e8;">;username=user              ;登录管理后台的用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">;password=123               ;登录管理后台的密码</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">[supervisord]</span></span>
<span class="line"><span style="color:#e1e4e8;">logfile=/tmp/supervisord.log ;日志文件，默认是 $CWD/supervisord.log</span></span>
<span class="line"><span style="color:#e1e4e8;">logfile_maxbytes=50MB        ;日志文件大小，超出会rotate，默认 50MB，如果设成0，表示不限制大小</span></span>
<span class="line"><span style="color:#e1e4e8;">logfile_backups=10           ;日志文件保留备份数量默认10，设为0表示不备份</span></span>
<span class="line"><span style="color:#e1e4e8;">loglevel=info                ;日志级别，默认info，其它: debug,warn,trace</span></span>
<span class="line"><span style="color:#e1e4e8;">pidfile=/tmp/supervisord.pid ;pid 文件</span></span>
<span class="line"><span style="color:#e1e4e8;">nodaemon=false               ;是否在前台启动，默认是false，即以 daemon 的方式启动</span></span>
<span class="line"><span style="color:#e1e4e8;">minfds=1024                  ;可以打开的文件描述符的最小值，默认 1024</span></span>
<span class="line"><span style="color:#e1e4e8;">minprocs=200                 ;可以打开的进程数的最小值，默认 200</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">[supervisorctl]</span></span>
<span class="line"><span style="color:#e1e4e8;">serverurl=unix:///tmp/supervisor.sock ;通过UNIX socket连接supervisord，路径与unix_http_server部分的file一致</span></span>
<span class="line"><span style="color:#e1e4e8;">;serverurl=http://127.0.0.1:9001 ; 通过HTTP的方式连接supervisord</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">; [program:xx]是被管理的进程配置参数，xx是进程的名称</span></span>
<span class="line"><span style="color:#e1e4e8;">[program:xx]</span></span>
<span class="line"><span style="color:#e1e4e8;">command=/opt/apache-tomcat-8.0.35/bin/catalina.sh run  ; 程序启动命令</span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true       ; 在supervisord启动的时候也自动启动</span></span>
<span class="line"><span style="color:#e1e4e8;">startsecs=10         ; 启动10秒后没有异常退出，就表示进程正常启动了，默认为1秒</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=true     ; 程序退出后自动重启,可选值：[unexpected,true,false]，默认为unexpected，表示进程意外杀死后才重启</span></span>
<span class="line"><span style="color:#e1e4e8;">startretries=3       ; 启动失败自动重试次数，默认是3</span></span>
<span class="line"><span style="color:#e1e4e8;">user=tomcat          ; 用哪个用户启动进程，默认是root</span></span>
<span class="line"><span style="color:#e1e4e8;">priority=999         ; 进程启动优先级，默认999，值小的优先启动</span></span>
<span class="line"><span style="color:#e1e4e8;">redirect_stderr=true ; 把stderr重定向到stdout，默认false</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_maxbytes=20MB  ; stdout 日志文件大小，默认50MB</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_backups = 20   ; stdout 日志文件备份数，默认是10</span></span>
<span class="line"><span style="color:#e1e4e8;">; stdout 日志文件，需要注意当指定目录不存在时无法正常启动，所以需要手动创建目录（supervisord 会自动创建日志文件）</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=/opt/apache-tomcat-8.0.35/logs/catalina.out</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">stopasgroup=false     ;默认为false,进程被杀死时，是否向这个进程组发送stop信号，包括子进程</span></span>
<span class="line"><span style="color:#e1e4e8;">killasgroup=false     ;默认为false，向进程组发送kill信号，包括子进程</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">;包含其它配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">[include]</span></span>
<span class="line"><span style="color:#e1e4e8;">files = relative/directory/*.ini    ;可以指定一个或多个以.ini结束的配置文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[unix_http_server]</span></span>
<span class="line"><span style="color:#24292e;">file=/tmp/supervisor.sock   ;UNIX socket 文件，supervisorctl 会使用</span></span>
<span class="line"><span style="color:#24292e;">;chmod=0700                 ;socket文件的mode，默认是0700</span></span>
<span class="line"><span style="color:#24292e;">;chown=nobody:nogroup       ;socket文件的owner，格式：uid:gid</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">;[inet_http_server]         ;HTTP服务器，提供web管理界面</span></span>
<span class="line"><span style="color:#24292e;">;port=127.0.0.1:9001        ;Web管理后台运行的IP和端口，如果开放到公网，需要注意安全性</span></span>
<span class="line"><span style="color:#24292e;">;username=user              ;登录管理后台的用户名</span></span>
<span class="line"><span style="color:#24292e;">;password=123               ;登录管理后台的密码</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">[supervisord]</span></span>
<span class="line"><span style="color:#24292e;">logfile=/tmp/supervisord.log ;日志文件，默认是 $CWD/supervisord.log</span></span>
<span class="line"><span style="color:#24292e;">logfile_maxbytes=50MB        ;日志文件大小，超出会rotate，默认 50MB，如果设成0，表示不限制大小</span></span>
<span class="line"><span style="color:#24292e;">logfile_backups=10           ;日志文件保留备份数量默认10，设为0表示不备份</span></span>
<span class="line"><span style="color:#24292e;">loglevel=info                ;日志级别，默认info，其它: debug,warn,trace</span></span>
<span class="line"><span style="color:#24292e;">pidfile=/tmp/supervisord.pid ;pid 文件</span></span>
<span class="line"><span style="color:#24292e;">nodaemon=false               ;是否在前台启动，默认是false，即以 daemon 的方式启动</span></span>
<span class="line"><span style="color:#24292e;">minfds=1024                  ;可以打开的文件描述符的最小值，默认 1024</span></span>
<span class="line"><span style="color:#24292e;">minprocs=200                 ;可以打开的进程数的最小值，默认 200</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">[supervisorctl]</span></span>
<span class="line"><span style="color:#24292e;">serverurl=unix:///tmp/supervisor.sock ;通过UNIX socket连接supervisord，路径与unix_http_server部分的file一致</span></span>
<span class="line"><span style="color:#24292e;">;serverurl=http://127.0.0.1:9001 ; 通过HTTP的方式连接supervisord</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">; [program:xx]是被管理的进程配置参数，xx是进程的名称</span></span>
<span class="line"><span style="color:#24292e;">[program:xx]</span></span>
<span class="line"><span style="color:#24292e;">command=/opt/apache-tomcat-8.0.35/bin/catalina.sh run  ; 程序启动命令</span></span>
<span class="line"><span style="color:#24292e;">autostart=true       ; 在supervisord启动的时候也自动启动</span></span>
<span class="line"><span style="color:#24292e;">startsecs=10         ; 启动10秒后没有异常退出，就表示进程正常启动了，默认为1秒</span></span>
<span class="line"><span style="color:#24292e;">autorestart=true     ; 程序退出后自动重启,可选值：[unexpected,true,false]，默认为unexpected，表示进程意外杀死后才重启</span></span>
<span class="line"><span style="color:#24292e;">startretries=3       ; 启动失败自动重试次数，默认是3</span></span>
<span class="line"><span style="color:#24292e;">user=tomcat          ; 用哪个用户启动进程，默认是root</span></span>
<span class="line"><span style="color:#24292e;">priority=999         ; 进程启动优先级，默认999，值小的优先启动</span></span>
<span class="line"><span style="color:#24292e;">redirect_stderr=true ; 把stderr重定向到stdout，默认false</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_maxbytes=20MB  ; stdout 日志文件大小，默认50MB</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_backups = 20   ; stdout 日志文件备份数，默认是10</span></span>
<span class="line"><span style="color:#24292e;">; stdout 日志文件，需要注意当指定目录不存在时无法正常启动，所以需要手动创建目录（supervisord 会自动创建日志文件）</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=/opt/apache-tomcat-8.0.35/logs/catalina.out</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">stopasgroup=false     ;默认为false,进程被杀死时，是否向这个进程组发送stop信号，包括子进程</span></span>
<span class="line"><span style="color:#24292e;">killasgroup=false     ;默认为false，向进程组发送kill信号，包括子进程</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">;包含其它配置文件</span></span>
<span class="line"><span style="color:#24292e;">[include]</span></span>
<span class="line"><span style="color:#24292e;">files = relative/directory/*.ini    ;可以指定一个或多个以.ini结束的配置文件</span></span></code></pre></div><h3 id="子进程配置文件说明" tabindex="-1">子进程配置文件说明 <a class="header-anchor" href="#子进程配置文件说明" aria-label="Permalink to &quot;子进程配置文件说明&quot;">​</a></h3><p>给需要管理的子进程(程序)编写一个配置文件，放在<code>/etc/supervisor.d/</code>目录下，以<code>.ini</code>作为扩展名（每个进程的配置文件都可以单独分拆也可以把相关的脚本放一起）</p><h3 id="配置supervisor" tabindex="-1">配置<strong>Supervisor</strong> <a class="header-anchor" href="#配置supervisor" aria-label="Permalink to &quot;配置**Supervisor**&quot;">​</a></h3><p><strong>通过运行echo_supervisord_conf程序生成supervisor的初始化配置文件</strong></p><ul><li>如果使用yum安装则此步骤省略，直接进行修改配置文件步骤</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir /etc/supervisord.d</span></span>
<span class="line"><span style="color:#e1e4e8;">echo_supervisord_conf &gt; /etc/supervisord.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir /etc/supervisord.d</span></span>
<span class="line"><span style="color:#24292e;">echo_supervisord_conf &gt; /etc/supervisord.conf</span></span></code></pre></div><ul><li><strong>修改配置文件</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#修改socket文件的mode，默认是0700</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/;chmod=0700/chmod=0766/g&#39; /etc/supervisord.conf   </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#在配置文件最后添加以下两行内容来包含/etc/supervisord目录</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;$a [include] \\</span></span>
<span class="line"><span style="color:#e1e4e8;">files = /etc/supervisord.d/*.conf&#39; /etc/supervisord.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#修改socket文件的mode，默认是0700</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/;chmod=0700/chmod=0766/g&#39; /etc/supervisord.conf   </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#在配置文件最后添加以下两行内容来包含/etc/supervisord目录</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;$a [include] \\</span></span>
<span class="line"><span style="color:#24292e;">files = /etc/supervisord.d/*.conf&#39; /etc/supervisord.conf</span></span></code></pre></div><h2 id="五、supervisor命令说明" tabindex="-1">五、supervisor命令说明 <a class="header-anchor" href="#五、supervisor命令说明" aria-label="Permalink to &quot;五、supervisor命令说明&quot;">​</a></h2><h3 id="_5-1常用命令" tabindex="-1">5.1常用命令 <a class="header-anchor" href="#_5-1常用命令" aria-label="Permalink to &quot;5.1常用命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">### 查看supervisorctl支持的命令</span></span>
<span class="line"><span style="color:#6A737D;"># supervisorctl help </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">commands</span><span style="color:#E1E4E8;"> (type </span><span style="color:#9ECBFF;">help</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">topi</span><span style="color:#E1E4E8;">c</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">=====================================</span></span>
<span class="line"><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">exit</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">open</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">reload</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">tail</span><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#B392F0;">avail</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">fg</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">pid</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">remove</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">shutdown</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">update</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">clear</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">maintail</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">quit</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">reread</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">signal</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">version</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">supervisorctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tail</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">client_name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stdout</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">### 查看supervisorctl支持的命令</span></span>
<span class="line"><span style="color:#6A737D;"># supervisorctl help </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> </span><span style="color:#032F62;">commands</span><span style="color:#24292E;"> (type </span><span style="color:#032F62;">help</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">topi</span><span style="color:#24292E;">c</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">=====================================</span></span>
<span class="line"><span style="color:#6F42C1;">add</span><span style="color:#24292E;">    </span><span style="color:#032F62;">exit</span><span style="color:#24292E;">      </span><span style="color:#032F62;">open</span><span style="color:#24292E;">  </span><span style="color:#032F62;">reload</span><span style="color:#24292E;">  </span><span style="color:#032F62;">restart</span><span style="color:#24292E;">   </span><span style="color:#032F62;">start</span><span style="color:#24292E;">   </span><span style="color:#032F62;">tail</span><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#6F42C1;">avail</span><span style="color:#24292E;">  </span><span style="color:#032F62;">fg</span><span style="color:#24292E;">        </span><span style="color:#032F62;">pid</span><span style="color:#24292E;">   </span><span style="color:#032F62;">remove</span><span style="color:#24292E;">  </span><span style="color:#032F62;">shutdown</span><span style="color:#24292E;">  </span><span style="color:#032F62;">status</span><span style="color:#24292E;">  </span><span style="color:#032F62;">update</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">clear</span><span style="color:#24292E;">  </span><span style="color:#032F62;">maintail</span><span style="color:#24292E;">  </span><span style="color:#032F62;">quit</span><span style="color:#24292E;">  </span><span style="color:#032F62;">reread</span><span style="color:#24292E;">  </span><span style="color:#032F62;">signal</span><span style="color:#24292E;">    </span><span style="color:#032F62;">stop</span><span style="color:#24292E;">    </span><span style="color:#032F62;">version</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">supervisorctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tail</span><span style="color:#24292E;"> </span><span style="color:#032F62;">client_name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stdout</span></span></code></pre></div><table><thead><tr><th>命令</th><th>用途</th></tr></thead><tbody><tr><td>supervisord</td><td>启动supervisor监管服务</td></tr><tr><td>supervisorctl start xxx</td><td>启动XXX进程</td></tr><tr><td>supervisorctl restart xxx</td><td>重启XXX进程</td></tr><tr><td>supervisorctl stop xxx</td><td>停止XXX进程</td></tr><tr><td>supervisorctl stop all</td><td>停止全部进程</td></tr><tr><td>supervisorctl status</td><td>查看supervisor监管的进程状态</td></tr><tr><td>supervisorctl reload</td><td>修改完配置文件后重新启动supervisor</td></tr><tr><td>supervisorctl update</td><td>根据最新的配置文件，启动新配置或有改动的进程，配置没有改动的进程不会受影响而重启</td></tr></tbody></table><p>注：把<code>xxx</code>换成<code>all</code>可以管理配置中的所有进程。直接输入<code>supervisorctl</code>进入supervisorctl的shell交互界面，此时上面的命令不带supervisorctl可直接使用</p><h3 id="_5-2三个执行程序" tabindex="-1">5.2三个执行程序 <a class="header-anchor" href="#_5-2三个执行程序" aria-label="Permalink to &quot;5.2三个执行程序&quot;">​</a></h3><p>supervisor安装完成后会生成三个执行程序:</p><p>supervisortd：用于管理supervisor本身服务</p><p>supervisorctl： 用于管理我们需要委托给superviso工具的服务</p><p>echo_supervisord_conf： 用于生成superviso的配置文件</p><p><strong>更改 Supervisor 的最大打开文件描述符数</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 如果应用使用supervisor来管理，则需要按以下步骤配置，否则上面的配置对使用supervisor管理的应用不生效</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改supervisor的配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /etc/supervisord.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">minfds=1048576</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改supervisor的systemctl启动脚本，添加LimitNOFILE属性</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /usr/lib/systemd/system/supervisord.service</span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启supervisord生效</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl restart supervisord</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 如果应用使用supervisor来管理，则需要按以下步骤配置，否则上面的配置对使用supervisor管理的应用不生效</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 修改supervisor的配置文件</span></span>
<span class="line"><span style="color:#24292e;"># vim /etc/supervisord.conf</span></span>
<span class="line"><span style="color:#24292e;">minfds=1048576</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 修改supervisor的systemctl启动脚本，添加LimitNOFILE属性</span></span>
<span class="line"><span style="color:#24292e;"># vim /usr/lib/systemd/system/supervisord.service</span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重启supervisord生效</span></span>
<span class="line"><span style="color:#24292e;"># systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"># systemctl restart supervisord</span></span></code></pre></div><p><strong>更改 MySQL（RPM 方式安装）的最大打开文件描述符数</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 如果是通过yum源或者rpm包的方式安装mysql，那么上面的配置对mysql无效，因为systemctl启动脚本覆盖了ulimit配置</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看mysql的最大打开文件描述符数</span></span>
<span class="line"><span style="color:#e1e4e8;"># cat /proc/\`pidof mysqld\`/limits</span></span>
<span class="line"><span style="color:#e1e4e8;"># egrep &#39;^(Limit|Max open files)&#39; /proc/\`pidof mysqld\`/limits</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 第一种方法：直接修改mysql的systemctl启动脚本（不建议修改mysqld.service，这样会影响下次升级）</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /usr/lib/systemd/system/mysqld.service</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 第二种方法：完美解决升级问题</span></span>
<span class="line"><span style="color:#e1e4e8;"># mkdir /usr/lib/systemd/system/mysqld.service.d</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /usr/lib/systemd/system/mysqld.service.d/override.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启mysql生效</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl restart mysqld</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 如果是通过yum源或者rpm包的方式安装mysql，那么上面的配置对mysql无效，因为systemctl启动脚本覆盖了ulimit配置</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看mysql的最大打开文件描述符数</span></span>
<span class="line"><span style="color:#24292e;"># cat /proc/\`pidof mysqld\`/limits</span></span>
<span class="line"><span style="color:#24292e;"># egrep &#39;^(Limit|Max open files)&#39; /proc/\`pidof mysqld\`/limits</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 第一种方法：直接修改mysql的systemctl启动脚本（不建议修改mysqld.service，这样会影响下次升级）</span></span>
<span class="line"><span style="color:#24292e;"># vim /usr/lib/systemd/system/mysqld.service</span></span>
<span class="line"><span style="color:#24292e;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 第二种方法：完美解决升级问题</span></span>
<span class="line"><span style="color:#24292e;"># mkdir /usr/lib/systemd/system/mysqld.service.d</span></span>
<span class="line"><span style="color:#24292e;"># vim /usr/lib/systemd/system/mysqld.service.d/override.conf</span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重启mysql生效</span></span>
<span class="line"><span style="color:#24292e;"># systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"># systemctl restart mysqld</span></span></code></pre></div><h3 id="_5-3环境变量" tabindex="-1">5.3环境变量 <a class="header-anchor" href="#_5-3环境变量" aria-label="Permalink to &quot;5.3环境变量&quot;">​</a></h3><p>supervisor 调用的环境变量分为两种，</p><p>一种是在 supervisor 配置文件中使用系统已经定义好的环境变量，</p><p>另一种为 supervisor 子程序运行过程中使用的环境变量</p><h4 id="调用系统环境变量" tabindex="-1">调用系统环境变量 <a class="header-anchor" href="#调用系统环境变量" aria-label="Permalink to &quot;调用系统环境变量&quot;">​</a></h4><p>在 supervisor 的配置文件中调用系统的环境变量时，需要以 <code>%(ENV_xxxx)s</code> 的格式进行调用。</p><p>假如系统环境变量中有这样一个环境变量 <code>export MY_HOME=/opt/home</code>，那我在 supervisor 中就要以 <code>%(ENV_MY_HOME)s</code>进行调用</p><h4 id="子程序运行的环境变量" tabindex="-1">子程序运行的环境变量 <a class="header-anchor" href="#子程序运行的环境变量" aria-label="Permalink to &quot;子程序运行的环境变量&quot;">​</a></h4><p>此类环境变量一般用来定义子程序所依赖的一些库文件</p><p>子程序的环境变量需要在自己的 <code>[program:x]</code> 下新增 <code>environment</code> 字段。如 <code>environment=LD_LIBRARY=/opt/home/lib</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[program:hello]</span></span>
<span class="line"><span style="color:#e1e4e8;">depends_on=hello</span></span>
<span class="line"><span style="color:#e1e4e8;">command=%(ENV_MY_HOME)s/hello</span></span>
<span class="line"><span style="color:#e1e4e8;">directory=%(ENV_MY_HOME)s/hello</span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">stopwaitsecs=3</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=%(ENV_MY_HOME)s/logs/hello.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile=%(ENV_MY_HOME)s/logs/hello.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_maxbytes=10485760</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_backups=2</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile_maxbytes=10485760</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile_backups=2</span></span>
<span class="line"><span style="color:#e1e4e8;">environment=LD_LIBRARY=%(ENV_MY_HOME)s/lib</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[program:hello]</span></span>
<span class="line"><span style="color:#24292e;">depends_on=hello</span></span>
<span class="line"><span style="color:#24292e;">command=%(ENV_MY_HOME)s/hello</span></span>
<span class="line"><span style="color:#24292e;">directory=%(ENV_MY_HOME)s/hello</span></span>
<span class="line"><span style="color:#24292e;">autostart=true</span></span>
<span class="line"><span style="color:#24292e;">autorestart=true</span></span>
<span class="line"><span style="color:#24292e;">stopwaitsecs=3</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=%(ENV_MY_HOME)s/logs/hello.log</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile=%(ENV_MY_HOME)s/logs/hello.log</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_maxbytes=10485760</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_backups=2</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile_maxbytes=10485760</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile_backups=2</span></span>
<span class="line"><span style="color:#24292e;">environment=LD_LIBRARY=%(ENV_MY_HOME)s/lib</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">;#使用下面的方式定义多个变量</span></span>
<span class="line"><span style="color:#e1e4e8;">environment = </span></span>
<span class="line"><span style="color:#e1e4e8;">    BINPATH=&quot;/home/server/bin/&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    ROOT=/home/server,</span></span>
<span class="line"><span style="color:#e1e4e8;">    RES_PATH=/home/server/xxx1/:/home/server/xxx2/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">;#使用下面的方式定义多个变量</span></span>
<span class="line"><span style="color:#24292e;">environment = </span></span>
<span class="line"><span style="color:#24292e;">    BINPATH=&quot;/home/server/bin/&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    ROOT=/home/server,</span></span>
<span class="line"><span style="color:#24292e;">    RES_PATH=/home/server/xxx1/:/home/server/xxx2/</span></span></code></pre></div><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">systemctl start supervisord.service</span><span style="color:#6A737D;">     //启动supervisor并加载默认配置文件</span></span>
<span class="line"><span style="color:#E1E4E8;">systemctl enable supervisord.service</span><span style="color:#6A737D;">    //将supervisor加入开机启动项</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">其他启动命令</span></span>
<span class="line"><span style="color:#E1E4E8;">supervisord </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">etc</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">supervisord.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">systemctl start supervisord.service</span><span style="color:#6A737D;">     //启动supervisor并加载默认配置文件</span></span>
<span class="line"><span style="color:#24292E;">systemctl enable supervisord.service</span><span style="color:#6A737D;">    //将supervisor加入开机启动项</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">其他启动命令</span></span>
<span class="line"><span style="color:#24292E;">supervisord </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">etc</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">supervisord.conf</span></span></code></pre></div><p><strong>supervisor只能监控前台程序， 如果你的程序是通过fork方式实现的daemon服务，则不能用它监控，否则supervisor&gt; status 会提示：BACKOFF Exited too quickly (process log may have details)。</strong> 因此像apache、tomcat服务默认启动都是按daemon方式启动的，则不能通过supervisor直接运行启动脚本(service httpd start)，相反要通过一个包装过的启停脚本来完成，比如,tomcat,看案例</p><h2 id="六-案例" tabindex="-1">六.案例 <a class="header-anchor" href="#六-案例" aria-label="Permalink to &quot;六.案例&quot;">​</a></h2><h3 id="dotnet" tabindex="-1">dotnet <a class="header-anchor" href="#dotnet" aria-label="Permalink to &quot;dotnet&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@appman supervisord.d]# cat webapi.ini </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[program:webapi]</span></span>
<span class="line"><span style="color:#e1e4e8;">directory=/data/MicroServices/TradeSystem.WebApi</span></span>
<span class="line"><span style="color:#e1e4e8;">#进程环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">environment=变量名1=&quot;变量值１&quot;,变量名2=&quot;变量值2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">command=/data/MicroServices/TradeSystem.WebApi/TradeSystem.WebApi</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">startretries=5</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile=/data/MicroServices/log/WebApi_error.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=/data/MicroServices/log/WebApi_out.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_maxbytes=50MB</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_backups = 20</span></span>
<span class="line"><span style="color:#e1e4e8;">stopasgroup=true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@appman supervisord.d]# cat webapi.ini </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[program:webapi]</span></span>
<span class="line"><span style="color:#24292e;">directory=/data/MicroServices/TradeSystem.WebApi</span></span>
<span class="line"><span style="color:#24292e;">#进程环境变量</span></span>
<span class="line"><span style="color:#24292e;">environment=变量名1=&quot;变量值１&quot;,变量名2=&quot;变量值2&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">command=/data/MicroServices/TradeSystem.WebApi/TradeSystem.WebApi</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">autostart=true</span></span>
<span class="line"><span style="color:#24292e;">autorestart=true</span></span>
<span class="line"><span style="color:#24292e;">startretries=5</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile=/data/MicroServices/log/WebApi_error.log</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=/data/MicroServices/log/WebApi_out.log</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_maxbytes=50MB</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_backups = 20</span></span>
<span class="line"><span style="color:#24292e;">stopasgroup=true</span></span></code></pre></div><ul><li>多命令</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[program:riskpaymentFK]</span></span>
<span class="line"><span style="color:#e1e4e8;">directory=/data/ufun/riskpayment</span></span>
<span class="line"><span style="color:#e1e4e8;">command=/bin/bash -c &quot;/bin/chmod 750 /data/ufun/riskpayment/ReplacePayment &amp;&amp; exec /data/ufun/riskpayment/ReplacePayment --server.urls http://172.19.149.143:10070&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">environment=PATH=&quot;/data/apps/dotnet2.2/:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">startretries=5</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile=/data/ufun/log/riskpayment_error.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=/data/ufun/log/riskpayment_out.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_maxbytes=50MB</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_backups=2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[program:riskpaymentFK]</span></span>
<span class="line"><span style="color:#24292e;">directory=/data/ufun/riskpayment</span></span>
<span class="line"><span style="color:#24292e;">command=/bin/bash -c &quot;/bin/chmod 750 /data/ufun/riskpayment/ReplacePayment &amp;&amp; exec /data/ufun/riskpayment/ReplacePayment --server.urls http://172.19.149.143:10070&quot;</span></span>
<span class="line"><span style="color:#24292e;">environment=PATH=&quot;/data/apps/dotnet2.2/:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/bin&quot;</span></span>
<span class="line"><span style="color:#24292e;">autostart=true</span></span>
<span class="line"><span style="color:#24292e;">autorestart=true</span></span>
<span class="line"><span style="color:#24292e;">startretries=5</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile=/data/ufun/log/riskpayment_error.log</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=/data/ufun/log/riskpayment_out.log</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_maxbytes=50MB</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_backups=2</span></span></code></pre></div><h3 id="node" tabindex="-1">node <a class="header-anchor" href="#node" aria-label="Permalink to &quot;node&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[program:pcfanyi]</span></span>
<span class="line"><span style="color:#e1e4e8;">;environment=NODEPATH=$NODEPATH:/data/apps/nodev12.16.3/bin</span></span>
<span class="line"><span style="color:#e1e4e8;">directory=/data/apps/tranAdmin</span></span>
<span class="line"><span style="color:#e1e4e8;">command=/data/apps/nodev12.16.3/bin/node ./src/main.js --model=production</span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">startretries=5</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile=/data/apps/tranAdmin/log/pcfanyi_error.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=/data/apps/tranAdmin/log/pcfanyi_out.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_maxbytes=50MB</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_backups = 20</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[program:pcfanyi]</span></span>
<span class="line"><span style="color:#24292e;">;environment=NODEPATH=$NODEPATH:/data/apps/nodev12.16.3/bin</span></span>
<span class="line"><span style="color:#24292e;">directory=/data/apps/tranAdmin</span></span>
<span class="line"><span style="color:#24292e;">command=/data/apps/nodev12.16.3/bin/node ./src/main.js --model=production</span></span>
<span class="line"><span style="color:#24292e;">autostart=true</span></span>
<span class="line"><span style="color:#24292e;">autorestart=true</span></span>
<span class="line"><span style="color:#24292e;">startretries=5</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile=/data/apps/tranAdmin/log/pcfanyi_error.log</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=/data/apps/tranAdmin/log/pcfanyi_out.log</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_maxbytes=50MB</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_backups = 20</span></span></code></pre></div><h3 id="tomcat" tabindex="-1">tomcat <a class="header-anchor" href="#tomcat" aria-label="Permalink to &quot;tomcat&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[program:tomcat]</span></span>
<span class="line"><span style="color:#e1e4e8;">directory=/usr/local/tomcat</span></span>
<span class="line"><span style="color:#e1e4e8;">command=/usr/local/tomcat/bin/supervisord_wrapper.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=syslog</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile=syslog</span></span>
<span class="line"><span style="color:#e1e4e8;">user=apache</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">####</span></span>
<span class="line"><span style="color:#e1e4e8;">cat supervisord_wrapper.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;"># Source: https://confluence.atlassian.com/plugins/viewsource/viewpagesrc.action?pageId=252348917</span></span>
<span class="line"><span style="color:#e1e4e8;">function shutdown()</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    date</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;Shutting down Tomcat&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    unset CATALINA_PID # Necessary in some cases</span></span>
<span class="line"><span style="color:#e1e4e8;">    unset LD_LIBRARY_PATH # Necessary in some cases</span></span>
<span class="line"><span style="color:#e1e4e8;">    unset JAVA_OPTS # Necessary in some cases</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    $TOMCAT_HOME/bin/catalina.sh stop</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">date</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Starting Tomcat&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">export CATALINA_PID=/tmp/$$</span></span>
<span class="line"><span style="color:#e1e4e8;">export JAVA_HOME=/usr/local/java</span></span>
<span class="line"><span style="color:#e1e4e8;">export LD_LIBRARY_PATH=/usr/local/apr/lib</span></span>
<span class="line"><span style="color:#e1e4e8;">export JAVA_OPTS=&quot;-Dcom.sun.management.jmxremote.port=8999 -Dcom.sun.management.jmxremote.password.file=/etc/tomcat.jmx.pwd -Dcom.sun.management.jmxremote.access.file=/etc/tomcat.jmxremote.access -Dcom.sun.management.jmxremote.ssl=false -Xms128m -Xmx3072m -XX:MaxPermSize=256m&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Uncomment to increase Tomcat&#39;s maximum heap allocation</span></span>
<span class="line"><span style="color:#e1e4e8;"># export JAVA_OPTS=-Xmx512M $JAVA_OPTS</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">. $TOMCAT_HOME/bin/catalina.sh start</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Allow any signal which would kill a process to stop Tomcat</span></span>
<span class="line"><span style="color:#e1e4e8;">trap shutdown HUP INT QUIT ABRT KILL ALRM TERM TSTP</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Waiting for \`cat $CATALINA_PID\`&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">wait \`cat $CATALINA_PID\`</span></span>
<span class="line"><span style="color:#e1e4e8;">###</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[program:tomcat]</span></span>
<span class="line"><span style="color:#24292e;">directory=/usr/local/tomcat</span></span>
<span class="line"><span style="color:#24292e;">command=/usr/local/tomcat/bin/supervisord_wrapper.sh</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=syslog</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile=syslog</span></span>
<span class="line"><span style="color:#24292e;">user=apache</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">####</span></span>
<span class="line"><span style="color:#24292e;">cat supervisord_wrapper.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;"># Source: https://confluence.atlassian.com/plugins/viewsource/viewpagesrc.action?pageId=252348917</span></span>
<span class="line"><span style="color:#24292e;">function shutdown()</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    date</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;Shutting down Tomcat&quot;</span></span>
<span class="line"><span style="color:#24292e;">    unset CATALINA_PID # Necessary in some cases</span></span>
<span class="line"><span style="color:#24292e;">    unset LD_LIBRARY_PATH # Necessary in some cases</span></span>
<span class="line"><span style="color:#24292e;">    unset JAVA_OPTS # Necessary in some cases</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    $TOMCAT_HOME/bin/catalina.sh stop</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">date</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Starting Tomcat&quot;</span></span>
<span class="line"><span style="color:#24292e;">export CATALINA_PID=/tmp/$$</span></span>
<span class="line"><span style="color:#24292e;">export JAVA_HOME=/usr/local/java</span></span>
<span class="line"><span style="color:#24292e;">export LD_LIBRARY_PATH=/usr/local/apr/lib</span></span>
<span class="line"><span style="color:#24292e;">export JAVA_OPTS=&quot;-Dcom.sun.management.jmxremote.port=8999 -Dcom.sun.management.jmxremote.password.file=/etc/tomcat.jmx.pwd -Dcom.sun.management.jmxremote.access.file=/etc/tomcat.jmxremote.access -Dcom.sun.management.jmxremote.ssl=false -Xms128m -Xmx3072m -XX:MaxPermSize=256m&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Uncomment to increase Tomcat&#39;s maximum heap allocation</span></span>
<span class="line"><span style="color:#24292e;"># export JAVA_OPTS=-Xmx512M $JAVA_OPTS</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">. $TOMCAT_HOME/bin/catalina.sh start</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Allow any signal which would kill a process to stop Tomcat</span></span>
<span class="line"><span style="color:#24292e;">trap shutdown HUP INT QUIT ABRT KILL ALRM TERM TSTP</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Waiting for \`cat $CATALINA_PID\`&quot;</span></span>
<span class="line"><span style="color:#24292e;">wait \`cat $CATALINA_PID\`</span></span>
<span class="line"><span style="color:#24292e;">###</span></span></code></pre></div><h3 id="多进程" tabindex="-1">多进程 <a class="header-anchor" href="#多进程" aria-label="Permalink to &quot;多进程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span></code></pre></div><h3 id="多命令command" tabindex="-1">多命令command <a class="header-anchor" href="#多命令command" aria-label="Permalink to &quot;多命令command&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">command=/bin/bash -c &quot;chmod 750 /data/ufun/riskpayment/ReplacePayment &amp;&amp; /data/ufun/riskpayment/ReplacePayment --server.urls http://172.19.149.143:10070&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">command=/bin/bash -c &quot;chmod 750 /data/ufun/riskpayment/ReplacePayment &amp;&amp; /data/ufun/riskpayment/ReplacePayment --server.urls http://172.19.149.143:10070&quot;</span></span></code></pre></div><h3 id="make" tabindex="-1">make <a class="header-anchor" href="#make" aria-label="Permalink to &quot;make&quot;">​</a></h3><div class="language-makefile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#Makefile</span></span>
<span class="line"><span style="color:#6A737D;"># 操作命令</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 拉取代码</span></span>
<span class="line"><span style="color:#79B8FF;">.PHONY</span><span style="color:#E1E4E8;">: pull</span></span>
<span class="line"><span style="color:#B392F0;">pull</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	git pull</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># maven打包</span></span>
<span class="line"><span style="color:#79B8FF;">.PHONY</span><span style="color:#E1E4E8;">: build</span></span>
<span class="line"><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	mvn clean package -Dmaven.test.skip=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 重启进程</span></span>
<span class="line"><span style="color:#79B8FF;">.PHONY</span><span style="color:#E1E4E8;">: restart</span></span>
<span class="line"><span style="color:#B392F0;">restart</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	supervisorctl restart spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启动进程</span></span>
<span class="line"><span style="color:#79B8FF;">.PHONY</span><span style="color:#E1E4E8;">: start</span></span>
<span class="line"><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	supervisorctl start spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 停止进程</span></span>
<span class="line"><span style="color:#79B8FF;">.PHONY</span><span style="color:#E1E4E8;">: stop</span></span>
<span class="line"><span style="color:#B392F0;">stop</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	supervisorctl stop spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 日志</span></span>
<span class="line"><span style="color:#79B8FF;">.PHONY</span><span style="color:#E1E4E8;">: log</span></span>
<span class="line"><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	supervisorctl tail -f spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 部署</span></span>
<span class="line"><span style="color:#79B8FF;">.PHONY</span><span style="color:#E1E4E8;">: deploy</span></span>
<span class="line"><span style="color:#B392F0;">deploy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	make pull</span></span>
<span class="line"><span style="color:#E1E4E8;">	make build</span></span>
<span class="line"><span style="color:#E1E4E8;">	make restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#Makefile</span></span>
<span class="line"><span style="color:#6A737D;"># 操作命令</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 拉取代码</span></span>
<span class="line"><span style="color:#005CC5;">.PHONY</span><span style="color:#24292E;">: pull</span></span>
<span class="line"><span style="color:#6F42C1;">pull</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	git pull</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># maven打包</span></span>
<span class="line"><span style="color:#005CC5;">.PHONY</span><span style="color:#24292E;">: build</span></span>
<span class="line"><span style="color:#6F42C1;">build</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	mvn clean package -Dmaven.test.skip=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 重启进程</span></span>
<span class="line"><span style="color:#005CC5;">.PHONY</span><span style="color:#24292E;">: restart</span></span>
<span class="line"><span style="color:#6F42C1;">restart</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	supervisorctl restart spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启动进程</span></span>
<span class="line"><span style="color:#005CC5;">.PHONY</span><span style="color:#24292E;">: start</span></span>
<span class="line"><span style="color:#6F42C1;">start</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	supervisorctl start spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 停止进程</span></span>
<span class="line"><span style="color:#005CC5;">.PHONY</span><span style="color:#24292E;">: stop</span></span>
<span class="line"><span style="color:#6F42C1;">stop</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	supervisorctl stop spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 日志</span></span>
<span class="line"><span style="color:#005CC5;">.PHONY</span><span style="color:#24292E;">: log</span></span>
<span class="line"><span style="color:#6F42C1;">log</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	supervisorctl tail -f spring-boot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 部署</span></span>
<span class="line"><span style="color:#005CC5;">.PHONY</span><span style="color:#24292E;">: deploy</span></span>
<span class="line"><span style="color:#6F42C1;">deploy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">	make pull</span></span>
<span class="line"><span style="color:#24292E;">	make build</span></span>
<span class="line"><span style="color:#24292E;">	make restart</span></span></code></pre></div>`,94),o=[l];function t(c,r,i,y,d,u){return n(),a("div",null,o)}const v=s(p,[["render",t]]);export{E as __pageData,v as default};
