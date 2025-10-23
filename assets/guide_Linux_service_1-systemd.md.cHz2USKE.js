import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1.systemd简介","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/service/1-systemd.md","filePath":"guide/Linux/service/1-systemd.md","lastUpdated":1731942729000}'),t={name:"guide/Linux/service/1-systemd.md"},l=a(`<h1 id="_1-systemd简介" tabindex="-1">1.systemd简介 <a class="header-anchor" href="#_1-systemd简介" aria-label="Permalink to &quot;1.systemd简介&quot;">​</a></h1><p>官当，<a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/chap-managing_services_with_systemd#sect-Managing_Services_with_systemd-Targets" target="_blank" rel="noreferrer">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/chap-managing_services_with_systemd#sect-Managing_Services_with_systemd-Targets</a></p><p>​ <em>systemd</em> 是一个 Linux 系统基础组件的集合，提供了一个系统和服务管理器，运行为 PID 1 并负责启动其它程序。功能包括：支持并行化任务；同时采用 socket 式与 <a href="https://wiki.archlinuxcn.org/wiki/D-Bus" target="_blank" rel="noreferrer">D-Bus</a> 总线式启用服务；按需启动守护进程（daemon）；利用 Linux 的 <a href="https://wiki.archlinuxcn.org/wzh/index.php?title=Cgroups&amp;action=edit&amp;redlink=1" target="_blank" rel="noreferrer">cgroups</a> 监视进程；支持快照和系统恢复；维护挂载点和自动挂载点；各服务间基于依赖关系进行精密控制。<em>systemd</em> 支持 SysV 和 LSB 初始脚本，可以替代 sysvinit。除此之外，功能还包括日志进程、控制基础系统配置，维护登陆用户列表以及系统账户、运行时目录和设置，可以运行容器和虚拟机，可以简单的管理网络配置、网络时间同步、日志转发和名称解析等。</p><p>以前启动方式：</p><p>不同系统的init版本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">centos5: Sysv Init</span></span>
<span class="line"><span style="color:#e1e4e8;">centos6: Upstart</span></span>
<span class="line"><span style="color:#e1e4e8;">centos7: systemd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">centos5: Sysv Init</span></span>
<span class="line"><span style="color:#24292e;">centos6: Upstart</span></span>
<span class="line"><span style="color:#24292e;">centos7: systemd</span></span></code></pre></div><h3 id="systemd-设计目标" tabindex="-1">systemd 设计目标 <a class="header-anchor" href="#systemd-设计目标" aria-label="Permalink to &quot;systemd 设计目标&quot;">​</a></h3><ul><li>改进效能。使用二进制代码替换松散的 SYSV 启动脚本，减少频繁的进程创建，库加载，内核/用户切换。</li><li>利用 Dbus 进程间通讯与 socket 激活机制，解决任务启动时的依赖问题，实现启动并行化。</li><li>实现任务（daemons）的精确控制。使用内核的 cgroup 机制，不依赖 pid 来追踪进程，即使是两次 fork 之后生成的守护进程也不会脱离 systemd 的控制。</li><li>统一任务定义。用户不需要自行编写 shell 脚本，而仅依据 systemd 制定的 unit 规则</li></ul><h3 id="systemd-体系架构" tabindex="-1">systemd 体系架构 <a class="header-anchor" href="#systemd-体系架构" aria-label="Permalink to &quot;systemd 体系架构&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401221444073.png" alt="img"></p><ul><li>最底层：systemd 内核层面依赖 cgroup、autofs、kdbus</li><li>第二层：systemd libraries 是 systemd 依赖库</li><li>第三层：systemd Core 是 systemd 自己的库</li><li>第四层：systemd daemons 以及 targets 是自带的一些基本 unit、target，类似于 sysvinit 中自带的脚本</li><li>最上层就是和 systemd 交互的一些工具</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401221444683.png" alt="img"></p><h1 id="_2-systemd单元文件位置" tabindex="-1">2.systemd<strong>单元文件位置</strong> <a class="header-anchor" href="#_2-systemd单元文件位置" aria-label="Permalink to &quot;2.systemd**单元文件位置**&quot;">​</a></h1><table><thead><tr><th style="text-align:left;">目录</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;"><code>/usr/lib/systemd/system/</code></td><td style="text-align:left;">Systemd 单元文件随已安装的 RPM 软件包一起分发。</td></tr><tr><td style="text-align:left;"><code>/run/systemd/system/</code></td><td style="text-align:left;">在运行时创建的 Systemd 单元文件。此目录优先于已安装服务单元文件的目录。</td></tr><tr><td style="text-align:left;"><code>/etc/systemd/system/</code></td><td style="text-align:left;">Systemd 创建的单元文件<code>systemctl enable</code>以及为扩展服务而添加的单元文件。该目录优先于包含运行时单元文件的目录。</td></tr></tbody></table><p>systemd默认从 /etc/systemd/system/ 目录读取配置文件</p><p>centos7的服务脚本一般存放在 /usr/lib/systemd 下，有系统 system 和 user 区分。 即 /usr/lib/systemd/system 和 /usr/lib/systemd/user</p><p><code>三个目录的文件优先级依次从低到高，同一服务三个地方都配置了，优先级高的会覆盖优先级低的</code></p><p>/run/systemd/system 是进程在运行时动态创建unit文件的目录，一般很少修改，除非是修改程序运行时的一些参数时，即Session级别的，才在这里做修改</p><p>systemd 的默认配置是在编译期间定义的，可以在 systemd 配置文件中找到<code>/etc/systemd/system.conf</code></p><h1 id="_3-unit服务配置" tabindex="-1">3.Unit服务配置 <a class="header-anchor" href="#_3-unit服务配置" aria-label="Permalink to &quot;3.Unit服务配置&quot;">​</a></h1><h2 id="_3-1运行级别" tabindex="-1">3.1运行级别 <a class="header-anchor" href="#_3-1运行级别" aria-label="Permalink to &quot;3.1运行级别&quot;">​</a></h2><table><thead><tr><th style="text-align:left;">运行级别</th><th style="text-align:left;">目标单位</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;"><code>0</code></td><td style="text-align:left;"><code>runlevel0.target</code>,<code>poweroff.target</code></td><td style="text-align:left;">关闭并关闭系统电源。</td></tr><tr><td style="text-align:left;"><code>1</code></td><td style="text-align:left;"><code>runlevel1.target</code>,<code>rescue.target</code></td><td style="text-align:left;">设置救援外壳。</td></tr><tr><td style="text-align:left;"><code>2</code></td><td style="text-align:left;"><code>runlevel2.target</code>,<code>multi-user.target</code></td><td style="text-align:left;">设置非图形多用户系统。</td></tr><tr><td style="text-align:left;"><code>3</code></td><td style="text-align:left;"><code>runlevel3.target</code>,<code>multi-user.target</code></td><td style="text-align:left;">设置非图形多用户系统。</td></tr><tr><td style="text-align:left;"><code>4</code></td><td style="text-align:left;"><code>runlevel4.target</code>,<code>multi-user.target</code></td><td style="text-align:left;">设置非图形多用户系统。</td></tr><tr><td style="text-align:left;"><code>5</code></td><td style="text-align:left;"><code>runlevel5.target</code>,<code>graphical.target</code></td><td style="text-align:left;">设置图形多用户系统。</td></tr><tr><td style="text-align:left;"><code>6</code></td><td style="text-align:left;"><code>runlevel6.target</code>,<code>reboot.target</code></td><td style="text-align:left;">关闭并重新启动系统</td></tr></tbody></table><h2 id="_3-2文件结构" tabindex="-1">3.2文件结构 <a class="header-anchor" href="#_3-2文件结构" aria-label="Permalink to &quot;3.2文件结构&quot;">​</a></h2><p>一般会分为3部分</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span></code></pre></div><ul><li>Unit 和 Install 段：所有 Unit 文件通用，用于配置服务（或其它系统资源）的描述、依赖和随系统启动的方式</li><li>Service 段：服务（Service）类型的 Unit 文件（后缀为 .service）特有的，用于定义服务的具体管理和操作方法</li><li>Install 段：所有 Unit 文件通用，用来定义如何启动，以及是否开机启动</li></ul><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>单元文件中的区段名和字段名大小写敏感, 每个区段内都是一些等号连接的键值对（键值对的等号两侧不能有空格）</p></div><h3 id="unit" tabindex="-1">Unit <a class="header-anchor" href="#unit" aria-label="Permalink to &quot;Unit&quot;">​</a></h3><p><code>查看完整参数，man systemd.unit</code></p><p>或者在线查看</p><p><a href="https://www.man7.org/linux/man-pages/man5/systemd.resource-control.5.html" target="_blank" rel="noreferrer">https://www.man7.org/linux/man-pages/man5/systemd.resource-control.5.html</a></p><table><thead><tr><th style="text-align:left;">Option section, see the <code>systemd.unit(5)</code> manual page</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>Description</code></td><td style="text-align:left;">A meaningful description of the unit. This text is displayed for example in the output of the <code>systemctl status</code> command.</td></tr><tr><td style="text-align:left;"><code>Documentation</code></td><td style="text-align:left;">Provides a list of URIs referencing documentation for the unit.</td></tr><tr><td style="text-align:left;"><code>After</code></td><td style="text-align:left;">Defines the order in which units are started. The unit starts only after the units specified in <code>After</code> are active. Unlike <code>Requires</code>, <code>After</code> does not explicitly activate the specified units. The <code>Before</code> option has the opposite functionality to <code>After</code>.</td></tr><tr><td style="text-align:left;">Requires</td><td style="text-align:left;">Configures dependencies on other units. The units listed in <code>Requires</code> are activated together with the unit. If any of the required units fail to start, the unit is not activated.</td></tr><tr><td style="text-align:left;">Wants</td><td style="text-align:left;">Configures weaker dependencies than <code>Requires</code>. If any of the listed units does not start successfully, it has no impact on the unit activation. This is the recommended way to establish custom unit dependencies.</td></tr><tr><td style="text-align:left;">Conflicts</td><td style="text-align:left;">Configures negative dependencies, an opposite to <code>Requires</code>.</td></tr></tbody></table><h3 id="service" tabindex="-1">Service <a class="header-anchor" href="#service" aria-label="Permalink to &quot;Service&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">Option section, see the <code>systemd.service(5)</code> manual page</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>Type</code></td><td style="text-align:left;">Configures the unit process startup type that affects the functionality of <code>ExecStart</code> and related options. One of:* <code>simple</code> – The default value. The process started with <code>ExecStart</code> is the main process of the service.* <code>forking</code> – The process started with <code>ExecStart</code> spawns a child process that becomes the main process of the service. The parent process exits when the startup is complete.* <code>oneshot</code> – This type is similar to <code>simple</code>, but the process exits before starting consequent units.* <code>dbus</code> – This type is similar to <code>simple</code>, but consequent units are started only after the main process gains a D-Bus name.* <code>notify</code> – This type is similar to <code>simple</code>, but consequent units are started only after a notification message is sent via the sd_notify() function.* <code>idle</code> – similar to <code>simple</code>, the actual execution of the service binary is delayed until all jobs are finished, which avoids mixing the status output with shell output of services.</td></tr><tr><td style="text-align:left;"><code>ExecStart</code></td><td style="text-align:left;">Specifies commands or scripts to be executed when the unit is started. <code>ExecStartPre</code> and <code>ExecStartPost</code> specify custom commands to be executed before and after <code>ExecStart</code>. <code>Type=oneshot</code> enables specifying multiple custom commands that are then executed sequentially.</td></tr><tr><td style="text-align:left;"><code>ExecStop</code></td><td style="text-align:left;">Specifies commands or scripts to be executed when the unit is stopped.</td></tr><tr><td style="text-align:left;"><code>ExecReload</code></td><td style="text-align:left;">Specifies commands or scripts to be executed when the unit is reloaded.</td></tr><tr><td style="text-align:left;"><code>Restart</code></td><td style="text-align:left;">With this option enabled, the service is restarted after its process exits, with the exception of a clean stop by the <code>systemctl</code> command.</td></tr><tr><td style="text-align:left;"><code>RemainAfterExit</code></td><td style="text-align:left;">If set to True, the service is considered active even when all its processes exited. Default value is False. This option is especially useful if <code>Type=oneshot</code> is configured.</td></tr><tr><td style="text-align:left;">User</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">Group</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">LimitCORE</td><td style="text-align:left;">LimitCORE=infinity：限制内核文件的大小</td></tr><tr><td style="text-align:left;">LimitNOFILE</td><td style="text-align:left;">LimitNOFILE=65536：服务最大允许打开的文件描述符数量</td></tr><tr><td style="text-align:left;">LimitNPROC</td><td style="text-align:left;">LimitNPROC=65536：进程的最大数量</td></tr><tr><td style="text-align:left;">Environment</td><td style="text-align:left;">Environment=&quot;export JAVA_HOME=/opt/jdk&quot; ，可以写多行</td></tr></tbody></table><h3 id="install" tabindex="-1">Install <a class="header-anchor" href="#install" aria-label="Permalink to &quot;Install&quot;">​</a></h3><table><thead><tr><th><code>Alias</code></th><th>Provides a space-separated list of additional names for the unit. Most <code>systemctl</code> commands, excluding <code>systemctl enable</code>, can use aliases instead of the actual unit name.</th></tr></thead><tbody><tr><td><code>RequiredBy</code></td><td>A list of units that depend on the unit. When this unit is enabled, the units listed in <code>RequiredBy</code> gain a <code>Require</code> dependency on the unit.</td></tr><tr><td><code>WantedBy</code></td><td>A list of units that weakly depend on the unit. When this unit is enabled, the units listed in <code>WantedBy</code> gain a <code>Want</code> dependency on the unit.</td></tr><tr><td><code>Also</code></td><td>Specifies a list of units to be installed or uninstalled along with the unit.</td></tr><tr><td><code>DefaultInstance</code></td><td>Limited to instantiated units, this option specifies the default instance for which the unit is enabled.</td></tr></tbody></table><ul><li>案例</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">touch /usr/lib/systemd/system/containerd.service</span></span>
<span class="line"><span style="color:#e1e4e8;">chmod 644 /usr/lib/systemd/system/containerd.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vim /usr/lib/systemd/system/containerd.service</span></span>
<span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description=containerd container runtime</span></span>
<span class="line"><span style="color:#e1e4e8;">Documentation=https://containerd.io</span></span>
<span class="line"><span style="color:#e1e4e8;">After=network.target local-fs.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStartPre=-/sbin/modprobe overlay</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/usr/local/bin/containerd</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Type=notify</span></span>
<span class="line"><span style="color:#e1e4e8;">Delegate=yes</span></span>
<span class="line"><span style="color:#e1e4e8;">KillMode=process</span></span>
<span class="line"><span style="color:#e1e4e8;">Restart=always</span></span>
<span class="line"><span style="color:#e1e4e8;">RestartSec=5</span></span>
<span class="line"><span style="color:#e1e4e8;"># Having non-zero Limit*s causes performance problems due to accounting overhead</span></span>
<span class="line"><span style="color:#e1e4e8;"># in the kernel. We recommend using cgroups to do container-local accounting.</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#e1e4e8;"># Comment TasksMax if your systemd version does not supports it.</span></span>
<span class="line"><span style="color:#e1e4e8;"># Only systemd 226 and above support this version.</span></span>
<span class="line"><span style="color:#e1e4e8;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">touch /usr/lib/systemd/system/containerd.service</span></span>
<span class="line"><span style="color:#24292e;">chmod 644 /usr/lib/systemd/system/containerd.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vim /usr/lib/systemd/system/containerd.service</span></span>
<span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description=containerd container runtime</span></span>
<span class="line"><span style="color:#24292e;">Documentation=https://containerd.io</span></span>
<span class="line"><span style="color:#24292e;">After=network.target local-fs.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">ExecStartPre=-/sbin/modprobe overlay</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/usr/local/bin/containerd</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Type=notify</span></span>
<span class="line"><span style="color:#24292e;">Delegate=yes</span></span>
<span class="line"><span style="color:#24292e;">KillMode=process</span></span>
<span class="line"><span style="color:#24292e;">Restart=always</span></span>
<span class="line"><span style="color:#24292e;">RestartSec=5</span></span>
<span class="line"><span style="color:#24292e;"># Having non-zero Limit*s causes performance problems due to accounting overhead</span></span>
<span class="line"><span style="color:#24292e;"># in the kernel. We recommend using cgroups to do container-local accounting.</span></span>
<span class="line"><span style="color:#24292e;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#24292e;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#24292e;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#24292e;"># Comment TasksMax if your systemd version does not supports it.</span></span>
<span class="line"><span style="color:#24292e;"># Only systemd 226 and above support this version.</span></span>
<span class="line"><span style="color:#24292e;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#24292e;">OOMScoreAdjust=-999</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span></code></pre></div><h1 id="_4-资源管理" tabindex="-1">4.资源管理 <a class="header-anchor" href="#_4-资源管理" aria-label="Permalink to &quot;4.资源管理&quot;">​</a></h1><h2 id="_4-1-unit管理" tabindex="-1">4.1 Unit管理 <a class="header-anchor" href="#_4-1-unit管理" aria-label="Permalink to &quot;4.1 Unit管理&quot;">​</a></h2><ul><li>查看当前系统的所有 Unit</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 列出正在运行的 Unit</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl list-units</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 列出所有Unit，包括没有找到配置文件的或者启动失败的</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl list-units --all</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 列出所有没有运行的 Unit</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl list-units --all --state=inactive</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 列出所有加载失败的 Unit</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl list-units --failed</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 列出所有正在运行的、类型为 service 的 Unit</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl list-units --type=service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看 Unit 配置文件的内容</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl cat docker.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 列出正在运行的 Unit</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl list-units</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 列出所有Unit，包括没有找到配置文件的或者启动失败的</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl list-units --all</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 列出所有没有运行的 Unit</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl list-units --all --state=inactive</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 列出所有加载失败的 Unit</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl list-units --failed</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 列出所有正在运行的、类型为 service 的 Unit</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl list-units --type=service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看 Unit 配置文件的内容</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl cat docker.service</span></span></code></pre></div><ul><li>查看 Unit 的状态</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 显示系统状态</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl status</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 显示单个 Unit 的状态</span></span>
<span class="line"><span style="color:#e1e4e8;">$ ystemctl status bluetooth.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 显示远程主机的某个 Unit 的状态</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl -H root@rhel7.example.com status httpd.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 显示系统状态</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl status</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 显示单个 Unit 的状态</span></span>
<span class="line"><span style="color:#24292e;">$ ystemctl status bluetooth.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 显示远程主机的某个 Unit 的状态</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl -H root@rhel7.example.com status httpd.service</span></span></code></pre></div><ul><li>启动和加载服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 立即启动一个服务</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo systemctl start apache.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 立即停止一个服务</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo systemctl stop apache.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启一个服务</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo systemctl restart apache.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 杀死一个服务的所有子进程</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo systemctl kill apache.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重新加载一个服务的配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo systemctl reload apache.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重载所有修改过的配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 显示某个 Unit 的所有底层参数</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl show docker.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 显示某个 Unit 的指定属性的值</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl show -p CPUShares httpd.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 设置某个 Unit 的指定属性</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo systemctl set-property httpd.service CPUShares=500</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 立即启动一个服务</span></span>
<span class="line"><span style="color:#24292e;">$ sudo systemctl start apache.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 立即停止一个服务</span></span>
<span class="line"><span style="color:#24292e;">$ sudo systemctl stop apache.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重启一个服务</span></span>
<span class="line"><span style="color:#24292e;">$ sudo systemctl restart apache.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 杀死一个服务的所有子进程</span></span>
<span class="line"><span style="color:#24292e;">$ sudo systemctl kill apache.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重新加载一个服务的配置文件</span></span>
<span class="line"><span style="color:#24292e;">$ sudo systemctl reload apache.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重载所有修改过的配置文件</span></span>
<span class="line"><span style="color:#24292e;">$ sudo systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 显示某个 Unit 的所有底层参数</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl show docker.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 显示某个 Unit 的指定属性的值</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl show -p CPUShares httpd.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 设置某个 Unit 的指定属性</span></span>
<span class="line"><span style="color:#24292e;">$ sudo systemctl set-property httpd.service CPUShares=500</span></span></code></pre></div><ul><li>查看依赖关系</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 列出一个 Unit 的所有依赖，默认不会列出 target 类型</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl list-dependencies nginx.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 列出一个 Unit 的所有依赖，包括 target 类型</span></span>
<span class="line"><span style="color:#e1e4e8;">$ systemctl list-dependencies --all nginx.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 列出一个 Unit 的所有依赖，默认不会列出 target 类型</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl list-dependencies nginx.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 列出一个 Unit 的所有依赖，包括 target 类型</span></span>
<span class="line"><span style="color:#24292e;">$ systemctl list-dependencies --all nginx.service</span></span></code></pre></div><h2 id="_4-2系统管理命令" tabindex="-1">4.2系统管理命令 <a class="header-anchor" href="#_4-2系统管理命令" aria-label="Permalink to &quot;4.2系统管理命令&quot;">​</a></h2><p><code>systemctl</code>是 Systemd 的主命令，用于管理系统</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 重启系统</span></span>
<span class="line"><span style="color:#e1e4e8;">$  systemctl reboot</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 关闭系统，切断电源</span></span>
<span class="line"><span style="color:#e1e4e8;">$  systemctl poweroff</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># CPU停止工作</span></span>
<span class="line"><span style="color:#e1e4e8;">$  systemctl halt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 暂停系统</span></span>
<span class="line"><span style="color:#e1e4e8;">$  systemctl suspend</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 让系统进入冬眠状态</span></span>
<span class="line"><span style="color:#e1e4e8;">$  systemctl hibernate</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 让系统进入交互式休眠状态</span></span>
<span class="line"><span style="color:#e1e4e8;">$  systemctl hybrid-sleep</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动进入救援状态（单用户状态）</span></span>
<span class="line"><span style="color:#e1e4e8;">$  systemctl rescue</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 重启系统</span></span>
<span class="line"><span style="color:#24292e;">$  systemctl reboot</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 关闭系统，切断电源</span></span>
<span class="line"><span style="color:#24292e;">$  systemctl poweroff</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># CPU停止工作</span></span>
<span class="line"><span style="color:#24292e;">$  systemctl halt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 暂停系统</span></span>
<span class="line"><span style="color:#24292e;">$  systemctl suspend</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 让系统进入冬眠状态</span></span>
<span class="line"><span style="color:#24292e;">$  systemctl hibernate</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 让系统进入交互式休眠状态</span></span>
<span class="line"><span style="color:#24292e;">$  systemctl hybrid-sleep</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动进入救援状态（单用户状态）</span></span>
<span class="line"><span style="color:#24292e;">$  systemctl rescue</span></span></code></pre></div><h2 id="_4-3启动过程" tabindex="-1">4.3启动过程 <a class="header-anchor" href="#_4-3启动过程" aria-label="Permalink to &quot;4.3启动过程&quot;">​</a></h2><p>当内核加载到内存中后开始执行 systemd 。根据 dmesg 的日志我们可以了解到 systemd 启动后执行了哪一些操作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[    2.516258] Run /sbin/init as init process</span></span>
<span class="line"><span style="color:#e1e4e8;">[    3.992535] systemd[1]: systemd 237 running in system mode. (+PAM +AUDIT +SELINUX +IMA +APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCRYPT +GNUTLS +ACL +XZ +LZ4 +SECCOMP +BLKID +ELFUTILS +KMOD -IDN2 +IDN -PCRE2 default-hierarchy=hybrid)</span></span>
<span class="line"><span style="color:#e1e4e8;">[    4.002297] systemd[1]: Detected virtualization kvm.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    4.004593] systemd[1]: Detected architecture x86-64.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    4.031531] systemd[1]: Set hostname to &lt;blog&gt;.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.343604] systemd[1]: Reached target Swap.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.355156] systemd[1]: Started Dispatch Password Requests to Console Directory Watch.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.367360] systemd[1]: Created slice User and Session Slice.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.379321] systemd[1]: Set up automount Arbitrary Executable File Formats File System Automount Point.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.395189] systemd[1]: Started Forward Password Requests to Wall Directory Watch.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.411078] systemd[1]: Reached target Local Encrypted Volumes.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.644759] EXT4-fs (sda1): re-mounted. Opts: (null)</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.702603] RPC: Registered named UNIX socket transport module.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.704115] RPC: Registered udp transport module.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.705318] RPC: Registered tcp transport module.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.706573] RPC: Registered tcp NFSv4.1 backchannel transport module.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.825727] Loading iSCSI transport class v2.0-870.</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.912079] iscsi: registered transport (tcp)</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.942499] systemd-journald[196]: Received request to flush runtime journal from PID 1</span></span>
<span class="line"><span style="color:#e1e4e8;">[    5.973269] systemd-journald[196]: File /var/log/journal/7bc72ce3e0aa559e38159aa4fa0547f9/system.journal corrupted or uncleanly shut down, renaming and replacing.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[    2.516258] Run /sbin/init as init process</span></span>
<span class="line"><span style="color:#24292e;">[    3.992535] systemd[1]: systemd 237 running in system mode. (+PAM +AUDIT +SELINUX +IMA +APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCRYPT +GNUTLS +ACL +XZ +LZ4 +SECCOMP +BLKID +ELFUTILS +KMOD -IDN2 +IDN -PCRE2 default-hierarchy=hybrid)</span></span>
<span class="line"><span style="color:#24292e;">[    4.002297] systemd[1]: Detected virtualization kvm.</span></span>
<span class="line"><span style="color:#24292e;">[    4.004593] systemd[1]: Detected architecture x86-64.</span></span>
<span class="line"><span style="color:#24292e;">[    4.031531] systemd[1]: Set hostname to &lt;blog&gt;.</span></span>
<span class="line"><span style="color:#24292e;">[    5.343604] systemd[1]: Reached target Swap.</span></span>
<span class="line"><span style="color:#24292e;">[    5.355156] systemd[1]: Started Dispatch Password Requests to Console Directory Watch.</span></span>
<span class="line"><span style="color:#24292e;">[    5.367360] systemd[1]: Created slice User and Session Slice.</span></span>
<span class="line"><span style="color:#24292e;">[    5.379321] systemd[1]: Set up automount Arbitrary Executable File Formats File System Automount Point.</span></span>
<span class="line"><span style="color:#24292e;">[    5.395189] systemd[1]: Started Forward Password Requests to Wall Directory Watch.</span></span>
<span class="line"><span style="color:#24292e;">[    5.411078] systemd[1]: Reached target Local Encrypted Volumes.</span></span>
<span class="line"><span style="color:#24292e;">[    5.644759] EXT4-fs (sda1): re-mounted. Opts: (null)</span></span>
<span class="line"><span style="color:#24292e;">[    5.702603] RPC: Registered named UNIX socket transport module.</span></span>
<span class="line"><span style="color:#24292e;">[    5.704115] RPC: Registered udp transport module.</span></span>
<span class="line"><span style="color:#24292e;">[    5.705318] RPC: Registered tcp transport module.</span></span>
<span class="line"><span style="color:#24292e;">[    5.706573] RPC: Registered tcp NFSv4.1 backchannel transport module.</span></span>
<span class="line"><span style="color:#24292e;">[    5.825727] Loading iSCSI transport class v2.0-870.</span></span>
<span class="line"><span style="color:#24292e;">[    5.912079] iscsi: registered transport (tcp)</span></span>
<span class="line"><span style="color:#24292e;">[    5.942499] systemd-journald[196]: Received request to flush runtime journal from PID 1</span></span>
<span class="line"><span style="color:#24292e;">[    5.973269] systemd-journald[196]: File /var/log/journal/7bc72ce3e0aa559e38159aa4fa0547f9/system.journal corrupted or uncleanly shut down, renaming and replacing.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">local-fs-pre.target</span></span>
<span class="line"><span style="color:#e1e4e8;">            |</span></span>
<span class="line"><span style="color:#e1e4e8;">            v</span></span>
<span class="line"><span style="color:#e1e4e8;">   (various mounts and   (various swap   (various cryptsetup</span></span>
<span class="line"><span style="color:#e1e4e8;">    fsck services...)     devices...)        devices...)       (various low-level   (various low-level</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |                  |             services: udevd,     API VFS mounts:</span></span>
<span class="line"><span style="color:#e1e4e8;">            v                  v                  v             tmpfiles, random     mqueue, configfs,</span></span>
<span class="line"><span style="color:#e1e4e8;">     local-fs.target      swap.target     cryptsetup.target    seed, sysctl, ...)      debugfs, ...)</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |                  |                    |                    |</span></span>
<span class="line"><span style="color:#e1e4e8;">            \\__________________|_________________ | \`_______________\` |____________________/</span></span>
<span class="line"><span style="color:#e1e4e8;">                                                 \\|/</span></span>
<span class="line"><span style="color:#e1e4e8;">                                                  v</span></span>
<span class="line"><span style="color:#e1e4e8;">                                           sysinit.target</span></span>
<span class="line"><span style="color:#e1e4e8;">                                                  |</span></span>
<span class="line"><span style="color:#e1e4e8;">             \`________________________________\` /|\\________________________________________</span></span>
<span class="line"><span style="color:#e1e4e8;">            /                  |                  |                    |                    \\</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |                  |                    |                    |</span></span>
<span class="line"><span style="color:#e1e4e8;">            v                  v                  |                    v                    v</span></span>
<span class="line"><span style="color:#e1e4e8;">        (various           (various               |                (various          rescue.service</span></span>
<span class="line"><span style="color:#e1e4e8;">       timers...)          paths...)              |               sockets...)               |</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |                  |                    |                    v</span></span>
<span class="line"><span style="color:#e1e4e8;">            v                  v                  |                    v             *rescue.target</span></span>
<span class="line"><span style="color:#e1e4e8;">      timers.target      paths.target             |             sockets.target</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |                  |                    |</span></span>
<span class="line"><span style="color:#e1e4e8;">            v                  \\_________________ | \`_______________\` /</span></span>
<span class="line"><span style="color:#e1e4e8;">                                                 \\|/</span></span>
<span class="line"><span style="color:#e1e4e8;">                                                  v</span></span>
<span class="line"><span style="color:#e1e4e8;">                                            basic.target</span></span>
<span class="line"><span style="color:#e1e4e8;">                                                  |</span></span>
<span class="line"><span style="color:#e1e4e8;">             \`________________________________\` /|                                 emergency.service</span></span>
<span class="line"><span style="color:#e1e4e8;">            /                  |                  |                                         |</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |                  |                                         v</span></span>
<span class="line"><span style="color:#e1e4e8;">            v                  v                  v                                *emergency.target</span></span>
<span class="line"><span style="color:#e1e4e8;">        display-        (various system    (various system</span></span>
<span class="line"><span style="color:#e1e4e8;">    manager.service         services           services)</span></span>
<span class="line"><span style="color:#e1e4e8;">            |             required for            |</span></span>
<span class="line"><span style="color:#e1e4e8;">            |            graphical UIs)           v</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |          *multi-user.target</span></span>
<span class="line"><span style="color:#e1e4e8;">            |                  |                  |</span></span>
<span class="line"><span style="color:#e1e4e8;">            \\_________________ | \`_____________\` /</span></span>
<span class="line"><span style="color:#e1e4e8;">                              \\|/</span></span>
<span class="line"><span style="color:#e1e4e8;">                               v</span></span>
<span class="line"><span style="color:#e1e4e8;">                  *graphical.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">local-fs-pre.target</span></span>
<span class="line"><span style="color:#24292e;">            |</span></span>
<span class="line"><span style="color:#24292e;">            v</span></span>
<span class="line"><span style="color:#24292e;">   (various mounts and   (various swap   (various cryptsetup</span></span>
<span class="line"><span style="color:#24292e;">    fsck services...)     devices...)        devices...)       (various low-level   (various low-level</span></span>
<span class="line"><span style="color:#24292e;">            |                  |                  |             services: udevd,     API VFS mounts:</span></span>
<span class="line"><span style="color:#24292e;">            v                  v                  v             tmpfiles, random     mqueue, configfs,</span></span>
<span class="line"><span style="color:#24292e;">     local-fs.target      swap.target     cryptsetup.target    seed, sysctl, ...)      debugfs, ...)</span></span>
<span class="line"><span style="color:#24292e;">            |                  |                  |                    |                    |</span></span>
<span class="line"><span style="color:#24292e;">            \\__________________|_________________ | \`_______________\` |____________________/</span></span>
<span class="line"><span style="color:#24292e;">                                                 \\|/</span></span>
<span class="line"><span style="color:#24292e;">                                                  v</span></span>
<span class="line"><span style="color:#24292e;">                                           sysinit.target</span></span>
<span class="line"><span style="color:#24292e;">                                                  |</span></span>
<span class="line"><span style="color:#24292e;">             \`________________________________\` /|\\________________________________________</span></span>
<span class="line"><span style="color:#24292e;">            /                  |                  |                    |                    \\</span></span>
<span class="line"><span style="color:#24292e;">            |                  |                  |                    |                    |</span></span>
<span class="line"><span style="color:#24292e;">            v                  v                  |                    v                    v</span></span>
<span class="line"><span style="color:#24292e;">        (various           (various               |                (various          rescue.service</span></span>
<span class="line"><span style="color:#24292e;">       timers...)          paths...)              |               sockets...)               |</span></span>
<span class="line"><span style="color:#24292e;">            |                  |                  |                    |                    v</span></span>
<span class="line"><span style="color:#24292e;">            v                  v                  |                    v             *rescue.target</span></span>
<span class="line"><span style="color:#24292e;">      timers.target      paths.target             |             sockets.target</span></span>
<span class="line"><span style="color:#24292e;">            |                  |                  |                    |</span></span>
<span class="line"><span style="color:#24292e;">            v                  \\_________________ | \`_______________\` /</span></span>
<span class="line"><span style="color:#24292e;">                                                 \\|/</span></span>
<span class="line"><span style="color:#24292e;">                                                  v</span></span>
<span class="line"><span style="color:#24292e;">                                            basic.target</span></span>
<span class="line"><span style="color:#24292e;">                                                  |</span></span>
<span class="line"><span style="color:#24292e;">             \`________________________________\` /|                                 emergency.service</span></span>
<span class="line"><span style="color:#24292e;">            /                  |                  |                                         |</span></span>
<span class="line"><span style="color:#24292e;">            |                  |                  |                                         v</span></span>
<span class="line"><span style="color:#24292e;">            v                  v                  v                                *emergency.target</span></span>
<span class="line"><span style="color:#24292e;">        display-        (various system    (various system</span></span>
<span class="line"><span style="color:#24292e;">    manager.service         services           services)</span></span>
<span class="line"><span style="color:#24292e;">            |             required for            |</span></span>
<span class="line"><span style="color:#24292e;">            |            graphical UIs)           v</span></span>
<span class="line"><span style="color:#24292e;">            |                  |          *multi-user.target</span></span>
<span class="line"><span style="color:#24292e;">            |                  |                  |</span></span>
<span class="line"><span style="color:#24292e;">            \\_________________ | \`_____________\` /</span></span>
<span class="line"><span style="color:#24292e;">                              \\|/</span></span>
<span class="line"><span style="color:#24292e;">                               v</span></span>
<span class="line"><span style="color:#24292e;">                  *graphical.target</span></span></code></pre></div><ul><li>systemd 执行的第一个目标是 <strong>default.target</strong>。但实际上 default.target 是指向 <strong>graphical.target</strong> 的软链接。Graphical.target 的实际位置是 <code>/usr/lib/systemd/system/graphical.target</code></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /usr/lib/systemd/system/graphical.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /usr/lib/systemd/system/graphical.target</span></span></code></pre></div><ul><li>在 <strong>default.target</strong> 这个阶段，会启动 <strong>multi-user.target</strong> 而这个 target 将自己的子单元放在目录 <code>/etc/systemd/system/multi-user.target.wants</code> 里。这个 target 为多用户支持设定系统环境。非 root 用户会在这个阶段的引导过程中启用。防火墙相关的服务也会在这个阶段启动。<strong>multi-user.target</strong> 会将控制权交给另一层 <strong>basic.target</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /usr/lib/systemd/system/multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /usr/lib/systemd/system/multi-user.target</span></span></code></pre></div><ul><li><strong>basic.target</strong> 单元用于启动普通服务特别是图形管理服务。它通过 <code>/etc/systemd/system/basic.target.wants</code> 目录来决定哪些服务会被启动，<strong>basic.target</strong> 之后将控制权交给 <strong>sysinit.target</strong>.</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">tree /etc/systemd/system/multi-user.target.wants</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">tree /etc/systemd/system/multi-user.target.wants</span></span></code></pre></div><ul><li><strong>sysinit.target</strong> 会启动重要的系统服务例如系统挂载，内存交换空间和设备，内核补充选项等等。sysinit.target 在启动过程中会传递给 <strong>local-fs.target</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">tree /etc/systemd/system/basic.target.wants</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">tree /etc/systemd/system/basic.target.wants</span></span></code></pre></div><ul><li><code>local-fs.target</code>，这个 target 单元不会启动用户相关的服务，它只处理底层核心服务。这个 target 会根据 /etc/fstab 和 /etc/inittab 来执行相关操作</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> cat /usr/lib/systemd/system/sysinit.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> cat /usr/lib/systemd/system/sysinit.target</span></span></code></pre></div><h1 id="_5-systemctl-与-service-命令的区别" tabindex="-1">5.systemctl 与 service 命令的区别 <a class="header-anchor" href="#_5-systemctl-与-service-命令的区别" aria-label="Permalink to &quot;5.systemctl 与 service 命令的区别&quot;">​</a></h1><ol><li>systemctl 融合了 service 和 chkconfig 的功能</li><li>service 命令实际上重定向到 systemctl 命令</li></ol><p>Target 与 SysV-init 进程的主要区别：</p><ul><li>默认的 RunLevel（在 /etc/inittab 文件设置）现在被默认的 Target 取代，位置是 /etc/systemd/system/default.target，通常符号链接到graphical.target（图形界面）或者multi-user.target（多用户命令行）。</li><li>启动脚本的位置，以前是 /etc/init.d 目录，符号链接到不同的 RunLevel 目录 （比如 /etc/rc3.d、/etc/rc5.d 等），现在则存放在 /lib/systemd/system 和 /etc/systemd/system 目录。</li><li>配置文件的位置，以前 init 进程的配置文件是 /etc/inittab，各种服务的配置文件存放在 /etc/sysconfig 目录。现在的配置文件主要存放在 /lib/systemd 目录，在 /etc/systemd 目录里面的修改可以覆盖原始设置</li></ul>`,69),p=[l];function o(c,i,r,d,y,_){return e(),n("div",null,p)}const h=s(t,[["render",o]]);export{m as __pageData,h as default};
