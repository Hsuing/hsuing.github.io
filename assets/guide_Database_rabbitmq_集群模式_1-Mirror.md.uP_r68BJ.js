import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const l="/assets/rabbitmq-cluster-2.D_MNNmHw.png",p="/assets/rabbitmq-cluster-3.SHD_pwkn.png",t="/assets/rabbitmq-cluster-4.KBWv8CL-.png",o="/assets/rabbitmq-cluster-6.CEXHRGd1.png",c="/assets/rabbitmq-cluster-7.DhHDD24-.png",i="/assets/rabbitmq-cluster-8.j2eSi21a.png",r="/assets/rabbitmq-cluster-9.tU64rdTG.png",b="/assets/rabbitmq-cluster-13.xgAAf0Ek.png",d="/assets/rabbitmq-cluster-14.TZpqvrEw.png",R=JSON.parse('{"title":"1.集群规划","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/rabbitmq/集群模式/1-Mirror.md","filePath":"guide/Database/rabbitmq/集群模式/1-Mirror.md","lastUpdated":1710405635000}'),y={name:"guide/Database/rabbitmq/集群模式/1-Mirror.md"},m=e(`<h1 id="_1-集群规划" tabindex="-1">1.集群规划 <a class="header-anchor" href="#_1-集群规划" aria-label="Permalink to &quot;1.集群规划&quot;">​</a></h1><table><thead><tr><th>名称</th><th>IP</th><th>端口</th><th>用途</th><th>RabbitMQ 节点名称</th></tr></thead><tbody><tr><td>节点一</td><td>192.168.1.109</td><td>15672</td><td>磁盘节点</td><td>rabbit@rabbitmq1</td></tr><tr><td>节点二</td><td>192.168.1.201</td><td>15672</td><td>内存节点</td><td>rabbit@rabbitmq2</td></tr><tr><td>节点三</td><td>192.168.1.200</td><td>15672</td><td>内存节点</td><td>rabbit@rabbitmq3</td></tr></tbody></table><p>集群中，每一个RabbitMQ实例都是一个节点，而节点分为磁盘节点和内存节点</p><ul><li>内存节点：将Rabbit中的元数据（Queue, Exchange, binding, vhost等）存储在内存中，持久化的 <strong>Message</strong> 依旧保存在磁盘中，内存节点的性能只能体现在资源管理上，消息的发送和接收和磁盘节点没有区别</li><li>磁盘节点：元数据存储在磁盘中，一个Rabbit集群要求至少有一个磁盘节点，因为内存节点中不存储元数据，所以每次内存节点启动，都会从其他节点中同步元数据</li></ul><p>另外如果唯一磁盘的磁盘节点崩溃了，不能进行如下操作：</p><ul><li>不能创建队列</li><li>不能创建交换器</li><li>不能创建绑定</li><li>不能添加用户</li><li>不能更改权限</li><li>不能添加和删除集群几点</li></ul><h2 id="rabbitmq集群的几种类型" tabindex="-1">RabbitMQ集群的几种类型 <a class="header-anchor" href="#rabbitmq集群的几种类型" aria-label="Permalink to &quot;RabbitMQ集群的几种类型&quot;">​</a></h2><ul><li>单一模式：仅有一个rabbit实例</li><li>普通模式：默认集群模式，每个节点各自维护自己的数据，两个节点仅存有相同的元数据。例如RabbitA 和 RabbitB，A中存在 QueueA，消费者可以从RabbitB实例中，读取QueueA的消息，这时RabbitB会从A中读取消息，返回给消费者。但是如果RabbitA 宕机，这时就无法获取QueueA的数据了</li><li>镜像模式：Rabbit 会将数据同步到其他节点中，这固然提高了可用性，但是随之而来的问题是，系统的性能会降低。节点之间消息的传递会占用带宽，而每个节点存储的数据量会变大</li></ul><h2 id="_1-0rabbit主要的端口说明" tabindex="-1">1.0Rabbit主要的端口说明： <a class="header-anchor" href="#_1-0rabbit主要的端口说明" aria-label="Permalink to &quot;1.0Rabbit主要的端口说明：&quot;">​</a></h2><table><thead><tr><th>端口</th><th>说明</th></tr></thead><tbody><tr><td>4369</td><td>erlang发现口</td></tr><tr><td>5672</td><td>client端通信口</td></tr><tr><td>15672</td><td>管理界面ui端口</td></tr><tr><td>25672</td><td>server间内部通信口</td></tr></tbody></table><blockquote><p>注意，在生产环境搭建 RabbitMQ 集群时，所有集群节点要求都可以连接上互联网，另外 RabbitMQ 集群节点建议都在同一网段里，如果是跨广域网（外网），效果会变差</p></blockquote><h2 id="_1-1配置路径" tabindex="-1">1.1配置路径 <a class="header-anchor" href="#_1-1配置路径" aria-label="Permalink to &quot;1.1配置路径&quot;">​</a></h2><table><thead><tr><th>位置</th><th>说明</th></tr></thead><tbody><tr><td>/usr/local/rabbitmq</td><td>安装目录</td></tr><tr><td>/usr/local/rabbitmq/var/log/rabbitmq</td><td>日志目录</td></tr><tr><td>/usr/local/rabbitmq/var/lib/rabbitmq/mnesia</td><td>数据目录</td></tr><tr><td>/usr/local/rabbitmq/etc/rabbitmq/rabbitmq.config</td><td>配置文件</td></tr><tr><td>/usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf</td><td>环境变量配置文件</td></tr><tr><td>/etc/init.d/rabbitmq-cluster-15672</td><td>服务自启动脚本</td></tr></tbody></table><h2 id="_1-2系统初始化" tabindex="-1">1.2系统初始化 <a class="header-anchor" href="#_1-2系统初始化" aria-label="Permalink to &quot;1.2系统初始化&quot;">​</a></h2><p><strong>临时更改最大打开文件描述符数</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看限制</span></span>
<span class="line"><span style="color:#e1e4e8;"># ulimit -n</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 临时更改限制（系统重启失效）</span></span>
<span class="line"><span style="color:#e1e4e8;"># ulimit -n 1048576</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看限制</span></span>
<span class="line"><span style="color:#24292e;"># ulimit -n</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 临时更改限制（系统重启失效）</span></span>
<span class="line"><span style="color:#24292e;"># ulimit -n 1048576</span></span></code></pre></div><p><strong>永久更改最大打开文件描述符数</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 第一步</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">* soft nofile 1048576</span></span>
<span class="line"><span style="color:#e1e4e8;">* hard nofile 1048576       #星号表示对所有用户生效</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 第二步</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">fs.file-max = 1048576       #可执行&quot;sysctl -p&quot;使fs.file-max生效</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 第三步</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /etc/pam.d/login</span></span>
<span class="line"><span style="color:#e1e4e8;">session required pam_limits.so       #查看配置文件有没有这行，没有就加上</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 第四步</span></span>
<span class="line"><span style="color:#e1e4e8;"># reboot       #重启系统</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 第五步（查看是否生效）</span></span>
<span class="line"><span style="color:#e1e4e8;"># ulimit -n</span></span>
<span class="line"><span style="color:#e1e4e8;"># sysctl fs.file-max</span></span>
<span class="line"><span style="color:#e1e4e8;"># cat /proc/PID/limits       #PID是应用的进程ID，在输出结果中查看&quot;Max open files&quot;的显示值</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 第一步</span></span>
<span class="line"><span style="color:#24292e;"># vim /etc/security/limits.conf</span></span>
<span class="line"><span style="color:#24292e;">* soft nofile 1048576</span></span>
<span class="line"><span style="color:#24292e;">* hard nofile 1048576       #星号表示对所有用户生效</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 第二步</span></span>
<span class="line"><span style="color:#24292e;"># vim /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#24292e;">fs.file-max = 1048576       #可执行&quot;sysctl -p&quot;使fs.file-max生效</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 第三步</span></span>
<span class="line"><span style="color:#24292e;"># vim /etc/pam.d/login</span></span>
<span class="line"><span style="color:#24292e;">session required pam_limits.so       #查看配置文件有没有这行，没有就加上</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 第四步</span></span>
<span class="line"><span style="color:#24292e;"># reboot       #重启系统</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 第五步（查看是否生效）</span></span>
<span class="line"><span style="color:#24292e;"># ulimit -n</span></span>
<span class="line"><span style="color:#24292e;"># sysctl fs.file-max</span></span>
<span class="line"><span style="color:#24292e;"># cat /proc/PID/limits       #PID是应用的进程ID，在输出结果中查看&quot;Max open files&quot;的显示值</span></span></code></pre></div><h2 id="_1-3创建用户和用户组" tabindex="-1">1.3创建用户和用户组 <a class="header-anchor" href="#_1-3创建用户和用户组" aria-label="Permalink to &quot;1.3创建用户和用户组&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建rabbitmq用户组</span></span>
<span class="line"><span style="color:#e1e4e8;"># groupadd rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建rabbitmq用户（不允许远程登录）</span></span>
<span class="line"><span style="color:#e1e4e8;"># useradd -g rabbitmq rabbitmq -s /bin/false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建rabbitmq用户组</span></span>
<span class="line"><span style="color:#24292e;"># groupadd rabbitmq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建rabbitmq用户（不允许远程登录）</span></span>
<span class="line"><span style="color:#24292e;"># useradd -g rabbitmq rabbitmq -s /bin/false</span></span></code></pre></div><h2 id="_1-4集群同步那些东西" tabindex="-1">1.4集群同步那些东西 <a class="header-anchor" href="#_1-4集群同步那些东西" aria-label="Permalink to &quot;1.4集群同步那些东西&quot;">​</a></h2><p>RabbitMQ集群会始终同步四种类型的内部元数据：</p><ul><li>队列元数据：队列名称和它的属性</li><li>交换器元数据：交换器名称、类型和属性</li><li>绑定元数据：一张简单的表格展示了如何将消息路由到队列</li><li>vhost元数据：为vhost内的队列、交换器和绑定提供命名空间和安全属性</li></ul><h1 id="_2-rabbitmq-集群安装" tabindex="-1">2.RabbitMQ 集群安装 <a class="header-anchor" href="#_2-rabbitmq-集群安装" aria-label="Permalink to &quot;2.RabbitMQ 集群安装&quot;">​</a></h1><p>资源下载</p><p>Erlang 下载1：<a href="http://packages.erlang-solutions.com/erlang/rpm/centos/7/x86_64/" target="_blank" rel="noreferrer">http://packages.erlang-solutions.com/erlang/rpm/centos/7/x86_64/</a></p><p>Erlang 下载2（GitHub）：<a href="https://github.com/rabbitmq/erlang-rpm/releases/tag/v23.2.5" target="_blank" rel="noreferrer">https://github.com/rabbitmq/erlang-rpm/releases/tag/v23.2.5</a></p><p>RabbitMQ 下载：<a href="https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.9.7" target="_blank" rel="noreferrer">https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.9.7</a></p><h2 id="_2-1erlang-安装" tabindex="-1">2.1Erlang 安装 <a class="header-anchor" href="#_2-1erlang-安装" aria-label="Permalink to &quot;2.1Erlang 安装&quot;">​</a></h2><p>在每个集群节点上分别编译安装 Erlang，这里使用的版本是 <code>23.2</code>，其他版本的 Erlang 可以从 <a href="https://www.erlang.org/downloads" target="_blank" rel="noreferrer">Erlang 官网</a> 下载</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 安装依赖</span></span>
<span class="line"><span style="color:#e1e4e8;"># yum install -y make autoconf gcc gcc-c++ glibc-devel kernel-devel m4 ncurses-devel openssl-devel unixODBC unixODBC-devel libtool libtool-ltdl-devel unzip</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># mkdir -p /usr/local/erlang-23.2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 下载</span></span>
<span class="line"><span style="color:#e1e4e8;"># wget https://erlang.org/download/otp_src_23.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 解压</span></span>
<span class="line"><span style="color:#e1e4e8;"># tar -xvf otp_src_23.2.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 进入解压目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd otp_src_23.2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./otp_build autoconf</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./configure --prefix=/usr/local/erlang-23.2 --without-javac  --enable-smp-support    \\</span></span>
<span class="line"><span style="color:#e1e4e8;">            --enable-threads  \\</span></span>
<span class="line"><span style="color:#e1e4e8;">            --enable-sctp   \\</span></span>
<span class="line"><span style="color:#e1e4e8;">            --enable-kernel-poll \\</span></span>
<span class="line"><span style="color:#e1e4e8;">            --enable-hipe  \\</span></span>
<span class="line"><span style="color:#e1e4e8;">            --with-ssl </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--prefix  指定安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-smp-support启用对称多处理支持</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-threads启用异步线程支持</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-sctp启用流控制协议支持（Stream Control Transmission Protocol，流控制传输协议）</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-kernel-poll启用Linux内核poll</span></span>
<span class="line"><span style="color:#e1e4e8;">--enable-hipe启用高性能Erlang</span></span>
<span class="line"><span style="color:#e1e4e8;">--with-ssl使用SSL包</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 编译安装</span></span>
<span class="line"><span style="color:#e1e4e8;"># make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建软链接</span></span>
<span class="line"><span style="color:#e1e4e8;"># ln -sf /usr/local/erlang-23.2/bin/erl /usr/bin/erl</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;">export ERLANG_HOME=/usr/local/erlang-23.2</span></span>
<span class="line"><span style="color:#e1e4e8;">export PATH=$PATH:$ERLANG_HOME/bin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 使环境变量生效</span></span>
<span class="line"><span style="color:#e1e4e8;"># source /etc/profile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 安装依赖</span></span>
<span class="line"><span style="color:#24292e;"># yum install -y make autoconf gcc gcc-c++ glibc-devel kernel-devel m4 ncurses-devel openssl-devel unixODBC unixODBC-devel libtool libtool-ltdl-devel unzip</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建安装目录</span></span>
<span class="line"><span style="color:#24292e;"># mkdir -p /usr/local/erlang-23.2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 下载</span></span>
<span class="line"><span style="color:#24292e;"># wget https://erlang.org/download/otp_src_23.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 解压</span></span>
<span class="line"><span style="color:#24292e;"># tar -xvf otp_src_23.2.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 进入解压目录</span></span>
<span class="line"><span style="color:#24292e;"># cd otp_src_23.2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 配置</span></span>
<span class="line"><span style="color:#24292e;"># ./otp_build autoconf</span></span>
<span class="line"><span style="color:#24292e;"># ./configure --prefix=/usr/local/erlang-23.2 --without-javac  --enable-smp-support    \\</span></span>
<span class="line"><span style="color:#24292e;">            --enable-threads  \\</span></span>
<span class="line"><span style="color:#24292e;">            --enable-sctp   \\</span></span>
<span class="line"><span style="color:#24292e;">            --enable-kernel-poll \\</span></span>
<span class="line"><span style="color:#24292e;">            --enable-hipe  \\</span></span>
<span class="line"><span style="color:#24292e;">            --with-ssl </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--prefix  指定安装目录</span></span>
<span class="line"><span style="color:#24292e;">--enable-smp-support启用对称多处理支持</span></span>
<span class="line"><span style="color:#24292e;">--enable-threads启用异步线程支持</span></span>
<span class="line"><span style="color:#24292e;">--enable-sctp启用流控制协议支持（Stream Control Transmission Protocol，流控制传输协议）</span></span>
<span class="line"><span style="color:#24292e;">--enable-kernel-poll启用Linux内核poll</span></span>
<span class="line"><span style="color:#24292e;">--enable-hipe启用高性能Erlang</span></span>
<span class="line"><span style="color:#24292e;">--with-ssl使用SSL包</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 编译安装</span></span>
<span class="line"><span style="color:#24292e;"># make &amp;&amp; make install</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建软链接</span></span>
<span class="line"><span style="color:#24292e;"># ln -sf /usr/local/erlang-23.2/bin/erl /usr/bin/erl</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 配置环境变量</span></span>
<span class="line"><span style="color:#24292e;"># vim /etc/profile</span></span>
<span class="line"><span style="color:#24292e;">export ERLANG_HOME=/usr/local/erlang-23.2</span></span>
<span class="line"><span style="color:#24292e;">export PATH=$PATH:$ERLANG_HOME/bin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 使环境变量生效</span></span>
<span class="line"><span style="color:#24292e;"># source /etc/profile</span></span></code></pre></div><h1 id="_3-rabbitmq-安装" tabindex="-1">3.RabbitMQ 安装 <a class="header-anchor" href="#_3-rabbitmq-安装" aria-label="Permalink to &quot;3.RabbitMQ 安装&quot;">​</a></h1><p>在==每个集群节点上==分别使用二进制包的方式安装 RabbitMQ，使用的版本是 <code>3.8.6</code>，其他版本的 RabbitMQ 可以从 <a href="https://github.com/rabbitmq/rabbitmq-server/releases" target="_blank" rel="noreferrer">RabbitMQ Github</a> 下载</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 安装依赖</span></span>
<span class="line"><span style="color:#e1e4e8;"># yum install -y xmlto python-simplejson</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 下载</span></span>
<span class="line"><span style="color:#e1e4e8;"># wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.6/rabbitmq-server-generic-unix-3.8.6.tar.xz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 解压</span></span>
<span class="line"><span style="color:#e1e4e8;"># xz -d rabbitmq-server-generic-unix-3.8.6.tar.xz</span></span>
<span class="line"><span style="color:#e1e4e8;"># tar -xvf rabbitmq-server-generic-unix-3.8.6.tar</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 拷贝安装文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># cp -r rabbitmq_server-3.8.6 /usr/local/rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 文件授权</span></span>
<span class="line"><span style="color:#e1e4e8;"># chown -R rabbitmq:rabbitmq /usr/local/rabbitmq</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 安装依赖</span></span>
<span class="line"><span style="color:#24292e;"># yum install -y xmlto python-simplejson</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 下载</span></span>
<span class="line"><span style="color:#24292e;"># wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.8.6/rabbitmq-server-generic-unix-3.8.6.tar.xz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 解压</span></span>
<span class="line"><span style="color:#24292e;"># xz -d rabbitmq-server-generic-unix-3.8.6.tar.xz</span></span>
<span class="line"><span style="color:#24292e;"># tar -xvf rabbitmq-server-generic-unix-3.8.6.tar</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 拷贝安装文件</span></span>
<span class="line"><span style="color:#24292e;"># cp -r rabbitmq_server-3.8.6 /usr/local/rabbitmq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 文件授权</span></span>
<span class="line"><span style="color:#24292e;"># chown -R rabbitmq:rabbitmq /usr/local/rabbitmq</span></span></code></pre></div><h1 id="_4-rabbitmq-配置" tabindex="-1">4.RabbitMQ 配置 <a class="header-anchor" href="#_4-rabbitmq-配置" aria-label="Permalink to &quot;4.RabbitMQ 配置&quot;">​</a></h1><p>在每个集群节点上分别配置 RabbitMQ，包括创建默认的日志目录与数据目录、启用 Web 控制台管理插件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建默认的日志目录与数据目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># mkdir -p /usr/local/rabbitmq/var/log/rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;"># mkdir -p /usr/local/rabbitmq/var/lib/rabbitmq/mnesia</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建默认的配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># touch /usr/local/rabbitmq/etc/rabbitmq/rabbitmq.config</span></span>
<span class="line"><span style="color:#e1e4e8;"># echo &quot;[].&quot; &gt; /usr/local/rabbitmq/etc/rabbitmq/rabbitmq.config</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建默认的环境变量文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># touch /usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"># echo &quot;CONF_ENV_FILE=/usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf&quot; &gt;&gt; /usr/local/rabbitmq/sbin/rabbitmq-defaults</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启用Web控制台管理插件</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmq-plugins enable rabbitmq_management</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看所有插件的安装信息</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmq-plugins list</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 文件授权</span></span>
<span class="line"><span style="color:#e1e4e8;"># chown -R rabbitmq:rabbitmq /usr/local/rabbitmq</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建默认的日志目录与数据目录</span></span>
<span class="line"><span style="color:#24292e;"># mkdir -p /usr/local/rabbitmq/var/log/rabbitmq</span></span>
<span class="line"><span style="color:#24292e;"># mkdir -p /usr/local/rabbitmq/var/lib/rabbitmq/mnesia</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建默认的配置文件</span></span>
<span class="line"><span style="color:#24292e;"># touch /usr/local/rabbitmq/etc/rabbitmq/rabbitmq.config</span></span>
<span class="line"><span style="color:#24292e;"># echo &quot;[].&quot; &gt; /usr/local/rabbitmq/etc/rabbitmq/rabbitmq.config</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建默认的环境变量文件</span></span>
<span class="line"><span style="color:#24292e;"># touch /usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf</span></span>
<span class="line"><span style="color:#24292e;"># echo &quot;CONF_ENV_FILE=/usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf&quot; &gt;&gt; /usr/local/rabbitmq/sbin/rabbitmq-defaults</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启用Web控制台管理插件</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmq-plugins enable rabbitmq_management</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看所有插件的安装信息</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmq-plugins list</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 文件授权</span></span>
<span class="line"><span style="color:#24292e;"># chown -R rabbitmq:rabbitmq /usr/local/rabbitmq</span></span></code></pre></div><p>在每个集群节点上分别配置 RabbitMQ，包括创建虚拟主机、超级管理员用户、设置角色权限。由于出于系统安全考虑，RabbitMQ 默认限制了 <code>guest</code> 用户只能通过 <code>localhost</code> 登录使用，因此需要手动创建管理员帐号，并更改 <code>guest</code> 用户默认的密码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 前台启动RabbitMQ服务（默认会打印出日志文件和配置文件的路径）</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmq-server</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 或者后台启动RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmq-server -detached</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建虚拟主机（相当于MySQL的数据库概念）</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl add_vhost /</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 更改guest用户默认的密码</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl change_password guest yourPassword</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 创建超级管理员用户</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl add_user admin yourPassword</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 赋予administrator角色给超级管理员用户</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 赋予超级管理员用户权限</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl set_permissions -p / admin &#39;.*&#39; &#39;.*&#39; &#39;.*&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 彻底关闭后台启动的RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl stop</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 前台启动RabbitMQ服务（默认会打印出日志文件和配置文件的路径）</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmq-server</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 或者后台启动RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmq-server -detached</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建虚拟主机（相当于MySQL的数据库概念）</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl add_vhost /</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 更改guest用户默认的密码</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl change_password guest yourPassword</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 创建超级管理员用户</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl add_user admin yourPassword</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 赋予administrator角色给超级管理员用户</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 赋予超级管理员用户权限</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl set_permissions -p / admin &#39;.*&#39; &#39;.*&#39; &#39;.*&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 彻底关闭后台启动的RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl stop</span></span></code></pre></div><h3 id="配置systemd" tabindex="-1">配置systemd <a class="header-anchor" href="#配置systemd" aria-label="Permalink to &quot;配置systemd&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建服务自启动脚本</span></span>
<span class="line"><span style="color:#e1e4e8;"># touch /etc/init.d/rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 更改服务自启动脚本，写入后面给出的脚本内容</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /etc/init.d/rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 服务自启动脚本授权</span></span>
<span class="line"><span style="color:#e1e4e8;"># chmod u+x /etc/init.d/rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 开机自启动</span></span>
<span class="line"><span style="color:#e1e4e8;"># chkconfig rabbitmq-cluster-15672 on</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看开机自启动列表</span></span>
<span class="line"><span style="color:#e1e4e8;"># chkconfig --list</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 关闭开机自启动</span></span>
<span class="line"><span style="color:#e1e4e8;"># chkconfig rabbitmq-cluster-15672 off</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建服务自启动脚本</span></span>
<span class="line"><span style="color:#24292e;"># touch /etc/init.d/rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 更改服务自启动脚本，写入后面给出的脚本内容</span></span>
<span class="line"><span style="color:#24292e;"># vim /etc/init.d/rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 服务自启动脚本授权</span></span>
<span class="line"><span style="color:#24292e;"># chmod u+x /etc/init.d/rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 开机自启动</span></span>
<span class="line"><span style="color:#24292e;"># chkconfig rabbitmq-cluster-15672 on</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看开机自启动列表</span></span>
<span class="line"><span style="color:#24292e;"># chkconfig --list</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 关闭开机自启动</span></span>
<span class="line"><span style="color:#24292e;"># chkconfig rabbitmq-cluster-15672 off</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 关闭服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl stop rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl start rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看服务状态</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl status rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl restart rabbitmq-cluster-15672</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 关闭服务</span></span>
<span class="line"><span style="color:#24292e;"># systemctl stop rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动服务</span></span>
<span class="line"><span style="color:#24292e;"># systemctl start rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看服务状态</span></span>
<span class="line"><span style="color:#24292e;"># systemctl status rabbitmq-cluster-15672</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重启服务</span></span>
<span class="line"><span style="color:#24292e;"># systemctl restart rabbitmq-cluster-15672</span></span></code></pre></div><h3 id="配置防火墙" tabindex="-1">配置防火墙 <a class="header-anchor" href="#配置防火墙" aria-label="Permalink to &quot;配置防火墙&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-port={4369/tcp,25672/tcp}</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=4369/tcp --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=25672/tcp --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=5671-5672/tcp --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=15672/tcp --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=61613-61614/tcp --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=1883/tcp --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --add-port=8883/tcp --permanent</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload # 重载配置</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-port={4369/tcp,25672/tcp}</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=4369/tcp --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=25672/tcp --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=5671-5672/tcp --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=15672/tcp --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=61613-61614/tcp --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=1883/tcp --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --add-port=8883/tcp --permanent</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload # 重载配置</span></span></code></pre></div><h1 id="_5-rabbitmq-普通集群搭建" tabindex="-1">5.RabbitMQ 普通集群搭建 <a class="header-anchor" href="#_5-rabbitmq-普通集群搭建" aria-label="Permalink to &quot;5.RabbitMQ 普通集群搭建&quot;">​</a></h1><h2 id="_5-1添加节点主机名" tabindex="-1">5.1添加节点主机名 <a class="header-anchor" href="#_5-1添加节点主机名" aria-label="Permalink to &quot;5.1添加节点主机名&quot;">​</a></h2><p>在每个集群节点上分别编辑 <code>/etc/hosts</code> 配置文件，指定各个节点的主机名</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># vim /etc/hosts</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.1.109 rabbitmq1</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.1.201 rabbitmq2</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.1.200 rabbitmq3</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;$a\\192.168.1.109   rabbitmq1&#39; /etc/hosts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># vim /etc/hosts</span></span>
<span class="line"><span style="color:#24292e;">192.168.1.109 rabbitmq1</span></span>
<span class="line"><span style="color:#24292e;">192.168.1.201 rabbitmq2</span></span>
<span class="line"><span style="color:#24292e;">192.168.1.200 rabbitmq3</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;$a\\192.168.1.109   rabbitmq1&#39; /etc/hosts</span></span></code></pre></div><h2 id="_5-2配置节点名称" tabindex="-1">5.2配置节点名称 <a class="header-anchor" href="#_5-2配置节点名称" aria-label="Permalink to &quot;5.2配置节点名称&quot;">​</a></h2><p>RabbitMQ 节点由节点名称（RABBITMQ_NODENAME）标识，节点名称由两部分组成，前缀（默认是 <code>rabbit</code>）和主机名，例如：<code>rabbit@rabbit1</code> 是一个包含前缀 <code>rabbit</code> 和主机名 <code>rabbit1</code> 的节点名称。</p><p>可以在同一台主机上运行多个 RabbitMQ 节点，但集群中每个节点必须有一个唯一的 RABBITMQ_NODENAME。<strong>若在同一台主机上运行多个节点（开发和 QA 环境中通常是这种情况），每个节点还必须使用不同的前缀，例如：<code>rabbit1@hostname1</code> 和 <code>rabbit2@hostname2</code>。</strong></p><p>在集群中，节点使用节点名称标识和联系彼此，这意味着必须解析每个节点名的主机名部分。当节点启动时，它会检查是否已为其分配了节点名，这是通过配置文件 <code>rabbitmq-env.conf</code> 里的 <code>RABBITMQ_NODENAME</code> 环境变量指定，如果环境变量没有配置，则节点将解析其主机名并在其前面添加 <code>rabbit</code> 来计算其节点名</p><p>在每个集群节点上分别配置节点名称，只需将下面 <code>rabbit@xxx</code> 中的 <code>xxx</code> 替换为该节点的主机名即可，例如节点一的节点名称为： <code>rabbit@rabbitmq1</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 配置节点名称</span></span>
<span class="line"><span style="color:#e1e4e8;"># echo &quot;NODENAME=rabbit@xxx&quot; &gt;&gt; /usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 配置节点名称</span></span>
<span class="line"><span style="color:#24292e;"># echo &quot;NODENAME=rabbit@xxx&quot; &gt;&gt; /usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf</span></span></code></pre></div><blockquote><p>如果两个节点都是 rabbit@localhost，这是无法建立集群</p></blockquote><h2 id="_5-3拷贝-erlang-cookie" tabindex="-1">5.3拷贝 Erlang Cookie <a class="header-anchor" href="#_5-3拷贝-erlang-cookie" aria-label="Permalink to &quot;5.3拷贝 Erlang Cookie&quot;">​</a></h2><p>RabbitMQ 的集群是依附于 Erlang 的集群来工作的，所以必须先构建起 Erlang 的集群。Erlang 的集群中各节点是经由过程一个 cookie 来实现的，当使用解压缩的方式来安装 RabbitMQ 时，那么这个 cookie 存放在 <code>\${home}/.erlang.cookie</code> 中，文件是 400 的权限。必须保证集群各节点的 cookie 一致，不然节点之间就无法通信</p><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><p>cookie 在所有节点上必须完全一样，同步时一定要注意。 erlang 是通过主机名来连接服务，必须保证各个主机名之间可以 ping 通。可以通过编辑 / etc/hosts 来手工添加主机名和 IP 对应关系。如果主机名 ping 不通，rabbitmq 服务启动会失败</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 拷贝节点一的Cookie到其他节点</span></span>
<span class="line"><span style="color:#e1e4e8;"># scp /root/.erlang.cookie root@rabbitmq2:/root/</span></span>
<span class="line"><span style="color:#e1e4e8;"># scp /root/.erlang.cookie root@rabbitmq3:/root/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 拷贝节点一的Cookie到其他节点</span></span>
<span class="line"><span style="color:#24292e;"># scp /root/.erlang.cookie root@rabbitmq2:/root/</span></span>
<span class="line"><span style="color:#24292e;"># scp /root/.erlang.cookie root@rabbitmq3:/root/</span></span></code></pre></div><h2 id="_5-4构建集群节点" tabindex="-1">5.4构建集群节点 <a class="header-anchor" href="#_5-4构建集群节点" aria-label="Permalink to &quot;5.4构建集群节点&quot;">​</a></h2><p>在每个集群节点上分别启动 RabbitMQ 的服务，这里默认使用的用户为 <code>root</code>。<strong>当使用解压缩的方式来安装 RabbitMQ 时，cookie 是存放在 <code>\${home}/.erlang.cookie</code>，因此这里必须注意各个节点的 RabbitMQ 是使用哪个用户启动，否则后续很可能由于各节点的 <code>.erlang.cookie</code> 不一致而导致节点无法加入集群</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 后台启动RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmq-server -detached</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 后台启动RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmq-server -detached</span></span></code></pre></div><p>在节点二执行以下操作，将节点二（<code>rabbit@rabbitmq2</code>）加入到 RabbitMQ 集群</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入节点二的安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 停止节点二的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop_app</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 将节点二加入到集群中，&quot;--ram&quot; 表示节点二为内存节点，#默认磁盘节点类型disc</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 start_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入节点二的安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 停止节点二的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop_app</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 将节点二加入到集群中，&quot;--ram&quot; 表示节点二为内存节点，#默认磁盘节点类型disc</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 start_app</span></span></code></pre></div><p>在节点三执行以下操作，将节点三（<code>rabbit@rabbitmq3</code>）加入到 RabbitMQ 集群</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入节点三的安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 清空节点状态</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl reset </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 停止节点三的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq3 stop_app</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 将节点三加入到集群中，&quot;--ram&quot; 表示节点三为内存节点</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq3 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动节点三的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq3 start_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入节点三的安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 清空节点状态</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl reset </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 停止节点三的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq3 stop_app</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 将节点三加入到集群中，&quot;--ram&quot; 表示节点三为内存节点</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq3 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动节点三的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq3 start_app</span></span></code></pre></div><p>在任意节点上查看集群的状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看集群状态</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl cluster_status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看集群状态</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl cluster_status</span></span></code></pre></div><blockquote><ul><li>搭建集群时，停止 RabbitMQ 服务必须使用 <code>stop_app</code> 命令，而不是 <code>stop</code> 命令，否则无法将节点加入到集群中</li><li>默认情况下，RabbitMQ 启动后是磁盘节点，在上面的 <code>join_cluster</code> 命令下，<code>rabbitmq2</code> 和 <code>rabbitmq3</code> 是内存节点，<code>rabbitmq1</code> 是磁盘节点</li><li>若要使 <code>rabbitmq2</code> 和 <code>rabbitmq3</code> 都成为磁盘节点，去掉 <code>--ram</code> 参数即可，或者使用 <code>--disc</code> 参数替代</li><li>如果想要更改节点类型，可以使用命令 <code>rabbitmqctl change_cluster_node_type disc(ram)</code>，前提是必须停掉 RabbitMQ 服务</li></ul></blockquote><h3 id="设置集群名字" tabindex="-1">设置集群名字 <a class="header-anchor" href="#设置集群名字" aria-label="Permalink to &quot;设置集群名字&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl set_cluster_name zz-rmqs</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl set_cluster_name zz-rmqs</span></span></code></pre></div><h2 id="_5-5测试集群节点" tabindex="-1">5.5测试集群节点 <a class="header-anchor" href="#_5-5测试集群节点" aria-label="Permalink to &quot;5.5测试集群节点&quot;">​</a></h2><p>若集群节点构建成功，通过浏览器访问任意节点的 Web 控制台，例如 <code>http://192.168.1.109:15672</code>，会看到如下的内容。最后可以在节点一创建队列 <code>test</code>，如果在节点二、节点三的 Web 控制台，也可以看到对应的 <code>test</code> 队列，则说明各集群节点的元数据（队列的结构）同步正常。至此，RabbitMQ 的普通集群搭建完成</p><h1 id="_6-rabbitmq-镜像集群搭建" tabindex="-1">6.RabbitMQ 镜像集群搭建 <a class="header-anchor" href="#_6-rabbitmq-镜像集群搭建" aria-label="Permalink to &quot;6.RabbitMQ 镜像集群搭建&quot;">​</a></h1><p>官方文档，<a href="https://www.rabbitmq.com/ha.html" target="_blank" rel="noreferrer">https://www.rabbitmq.com/ha.html</a></p><p>上面已经完成 RabbitMQ 普通集群的搭建，但并不能保证队列的高可用性，尽管交换机、队列、绑定这些可以复制到集群里的任何一个节点，但是队列内容（消息）不会复制。虽然普通集群解决可以一项目组的节点压力，但队列节点（磁盘节点）宕机会直接导致其他节点的队列（内存节点）无法使用，只能等待队列节点（磁盘节点）重启，所以要想在队列节点（磁盘节点）宕机或故障也能正常应用，就要复制队列内容（消息）到集群里的每个节点，因此必须要创建镜像队列。镜像队列是基于普通的集群模式的，然后再添加一些策略，所以还是得先配置普通集群，然后才能设置镜像队列。设置镜像队列可以在 RabbitMQ 的 Web 控制台进行，也可以通过命令，这里介绍是其中的 Web 控制台设置方式</p><h2 id="_6-0镜像机制" tabindex="-1">6.0镜像机制 <a class="header-anchor" href="#_6-0镜像机制" aria-label="Permalink to &quot;6.0镜像机制&quot;">​</a></h2><p>镜像队列机制是基于Master-Slave主从模式的，镜像队列所有操作都是只能在Master节点进行操作，生产者发布消息到队列，分发消息给消费者，跟踪消费者的消费确认ACK，消费者不管连接的哪个节点最终都会转发到Master节点，然后将这些操作对应的消息由Master节点广播同步给其他节点</p><h2 id="_6-0创建策略" tabindex="-1">6.0创建策略 <a class="header-anchor" href="#_6-0创建策略" aria-label="Permalink to &quot;6.0创建策略&quot;">​</a></h2><p>在节点一的 Web 控制台上创建策略：</p><ul><li><ol><li>点击 <code>Admin</code> 菜单 –&gt; 右侧的 <code>Policies</code> 选项</li></ol></li><li>2.按照图中的内容根据自己的需求填写</li></ul><p><img src="`+l+`" alt=""></p><blockquote><ul><li>Name：策略名称</li><li>Pattern：匹配的规则，<code>^a</code> 表示匹配 <code>a</code> 开头的队列，如果是匹配所有的队列，那就是 <code>^.</code></li><li>Definition：使用 <code>ha-mode</code> 模式中的 <code>all</code>，也就是同步所有匹配的队列</li></ul></blockquote><ul><li>命令行模式</li></ul><p>任意rabbit节点输入命令，将所有队列，同步到所有节点中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl set_policy ha-all &quot;^&quot; &#39;{&quot;ha-mode&quot;:&quot;all&quot;}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl set_policy ha-all &quot;^&quot; &#39;{&quot;ha-mode&quot;:&quot;all&quot;}&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl set_policy [-p Vhost] Name Pattern Definition [Priority]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-p Vhost： 可选参数，针对指定vhost下的queue进行设置</span></span>
<span class="line"><span style="color:#e1e4e8;">Name: policy的名称</span></span>
<span class="line"><span style="color:#e1e4e8;">Pattern: queue的匹配模式(正则表达式)</span></span>
<span class="line"><span style="color:#e1e4e8;">^：为匹配符，只有一个^代表匹配所有，^zlh为匹配名称为zlh的exchanges或者queue</span></span>
<span class="line"><span style="color:#e1e4e8;">Definition：镜像定义，包括三个部分ha-mode, ha-params, ha-sync-mode</span></span>
<span class="line"><span style="color:#e1e4e8;">        ha-mode:指明镜像队列的模式，有效值为 all/exactly/nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">        all：表示在集群中所有的节点上进行镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">        exactly：表示在指定个数的节点上进行镜像，节点的个数由ha-params指定</span></span>
<span class="line"><span style="color:#e1e4e8;">        nodes：表示在指定的节点上进行镜像，节点名称通过ha-params指定</span></span>
<span class="line"><span style="color:#e1e4e8;">        ha-params：ha-mode模式需要用到的参数</span></span>
<span class="line"><span style="color:#e1e4e8;">        ha-sync-mode：进行队列中消息的同步方式，有效值为automatic和manual</span></span>
<span class="line"><span style="color:#e1e4e8;">priority：可选参数，policy的优先级</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl set_policy [-p Vhost] Name Pattern Definition [Priority]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-p Vhost： 可选参数，针对指定vhost下的queue进行设置</span></span>
<span class="line"><span style="color:#24292e;">Name: policy的名称</span></span>
<span class="line"><span style="color:#24292e;">Pattern: queue的匹配模式(正则表达式)</span></span>
<span class="line"><span style="color:#24292e;">^：为匹配符，只有一个^代表匹配所有，^zlh为匹配名称为zlh的exchanges或者queue</span></span>
<span class="line"><span style="color:#24292e;">Definition：镜像定义，包括三个部分ha-mode, ha-params, ha-sync-mode</span></span>
<span class="line"><span style="color:#24292e;">        ha-mode:指明镜像队列的模式，有效值为 all/exactly/nodes</span></span>
<span class="line"><span style="color:#24292e;">        all：表示在集群中所有的节点上进行镜像</span></span>
<span class="line"><span style="color:#24292e;">        exactly：表示在指定个数的节点上进行镜像，节点的个数由ha-params指定</span></span>
<span class="line"><span style="color:#24292e;">        nodes：表示在指定的节点上进行镜像，节点名称通过ha-params指定</span></span>
<span class="line"><span style="color:#24292e;">        ha-params：ha-mode模式需要用到的参数</span></span>
<span class="line"><span style="color:#24292e;">        ha-sync-mode：进行队列中消息的同步方式，有效值为automatic和manual</span></span>
<span class="line"><span style="color:#24292e;">priority：可选参数，policy的优先级</span></span></code></pre></div><ul><li>或者</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl  set_policy  fzb-ha  &quot;^&quot;  &#39;{&quot;ha-mode&quot;:&quot;exactly&quot;,&quot;ha-params&quot;:2,&quot;ha-sync-mode&quot;:&quot;automatic&quot;}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl  set_policy  fzb-ha  &quot;^&quot;  &#39;{&quot;ha-mode&quot;:&quot;exactly&quot;,&quot;ha-params&quot;:2,&quot;ha-sync-mode&quot;:&quot;automatic&quot;}&#39;</span></span></code></pre></div><ul><li>目的</li></ul><p>要设置Exchanges或者queue的数据需要复制</p><ul><li>3.点击左侧最下边的 <code>Add/update a policy</code> 按钮新增策略</li></ul><p><img src="`+p+'" alt=""></p><ul><li>4.此时分别登录节点二、节点三的 Web 控制台，同样可以看到刚添加的这个策略</li></ul><p><img src="'+t+'" alt=""></p><h2 id="_6-1创建队列" tabindex="-1">6.1创建队列 <a class="header-anchor" href="#_6-1创建队列" aria-label="Permalink to &quot;6.1创建队列&quot;">​</a></h2><p>在节点一的 Web 控制台上创建队列：</p><ul><li>点击 <code>Queues</code> 菜单</li><li>输入 <code>Name 和</code> Arguments参数的值，别的参数默认即可</li></ul><p><img src="'+o+'" alt=""></p><blockquote><p>Name：队列名称 Durability：队列是否持久化 Node：消息队列的节点 Auto delete：是否自动删除 Arguments：使用的策略类型</p></blockquote><ul><li>点击左侧下边的 <code>Add a new queue</code> 按钮新增队列，将鼠标指向 <code>+2</code> 可以显示出另外两台节点</li></ul><p><img src="'+c+'" alt=""></p><h2 id="_6-2创建消息" tabindex="-1">6.2创建消息 <a class="header-anchor" href="#_6-2创建消息" aria-label="Permalink to &quot;6.2创建消息&quot;">​</a></h2><ul><li>点击 <code>ab</code> 队列按钮，拖动滚动条</li><li>填写相关内容</li></ul><p><img src="'+i+'" alt=""></p><blockquote><p>2-Persistent：表示持久化 Headers：随便填写即可 Properties：点击问号，选择一个消息 ID 号 Payload：消息内容</p></blockquote><ul><li>点击 <code>Publish message</code> 按钮新增消息，可发现 <code>ab</code> 队列的 <code>Ready</code> 和 <code>Total</code> 中多了一条消息记录</li></ul><p><img src="'+r+'" alt=""></p><h3 id="验证高可用性" tabindex="-1">验证高可用性 <a class="header-anchor" href="#验证高可用性" aria-label="Permalink to &quot;验证高可用性&quot;">​</a></h3><ul><li>将节点一的 RabbitMQ 服务关闭，再通过节点一和节点二，查看消息记录是否还存在，结果可以看到在其他节点的消息记录是存在的</li><li>再将节点二的 RabbitMQ 服务关闭，通过节点三查看消息记录是否还存在，结果可以看到 <code>ab</code> 队列和消息记录还是存在的，只是变成了只有一个节点</li><li>将节点一和节点二的 RabbitMQ 服务重启，从中可以看到 <code>ab</code> 队列后面 <code>+2</code> 变成了红色，鼠标指上去显示镜像无法同步</li></ul><p><img src="'+b+`" alt=""></p><ul><li>采取的解决办法是选择在节点二上执行同步命令</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入节点一的安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 同步特定的队列</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl sync_queue ab</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入节点一的安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 同步特定的队列</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl sync_queue ab</span></span></code></pre></div><p><img src="`+d+`" alt=""></p><p>同步完成后，<code>+2</code> 标识又变成了蓝色，这样就测试了 RabbitMQ 集群的高可用性，说明镜像集群配置成功</p><h1 id="_7-集群开机自启动" tabindex="-1">7.集群开机自启动 <a class="header-anchor" href="#_7-集群开机自启动" aria-label="Permalink to &quot;7.集群开机自启动&quot;">​</a></h1><h2 id="_7-1supervior" tabindex="-1">7.1Supervior <a class="header-anchor" href="#_7-1supervior" aria-label="Permalink to &quot;7.1Supervior&quot;">​</a></h2><p>严格来说 RabbitMQ 并不适用使用 Supervior 来管理服务，因为当手动 Kill 掉 RabbitMQ 的进程时，Supervior 无法正常重启 RabbitMQ 的进程，具体原因可以看<a href="https://www.cnblogs.com/cwp-bg/p/8939792.html" target="_blank" rel="noreferrer">这里</a>，但若只是简单实现 RabbitMQ 开机自启动，Supervior 无疑是可以胜任的</p><p>使用 Supervior 托管管理 RabbitMQ 的服务，以节点一为例给出下述配置示例，其他节点只需更改对应的端口号即可。值得一提的是，这里必须指定 <code>environment=HOME=/home/rabbitmq</code>，否则 RabbitMQ 会找不到 <code>.erlang.cookie</code> 而导致启动失败</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[program:rabbitmq]</span></span>
<span class="line"><span style="color:#e1e4e8;">environment=HOME=/home/rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;">directory=/usr/local/rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;">command=/usr/local/rabbitmq/sbin/rabbitmq-server</span></span>
<span class="line"><span style="color:#e1e4e8;">user=rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;">numprocs=1</span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">startretries=10</span></span>
<span class="line"><span style="color:#e1e4e8;">process_name=%(program_name)s</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_backups=5</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_maxbytes=10MB</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=/var/log/supervisor/rabbitmq.log</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile_backups=5</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile_maxbytes=10MB</span></span>
<span class="line"><span style="color:#e1e4e8;">stderr_logfile=/var/log/supervisor/rabbitmq-error.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[program:rabbitmq]</span></span>
<span class="line"><span style="color:#24292e;">environment=HOME=/home/rabbitmq</span></span>
<span class="line"><span style="color:#24292e;">directory=/usr/local/rabbitmq</span></span>
<span class="line"><span style="color:#24292e;">command=/usr/local/rabbitmq/sbin/rabbitmq-server</span></span>
<span class="line"><span style="color:#24292e;">user=rabbitmq</span></span>
<span class="line"><span style="color:#24292e;">numprocs=1</span></span>
<span class="line"><span style="color:#24292e;">autostart=true</span></span>
<span class="line"><span style="color:#24292e;">autorestart=true</span></span>
<span class="line"><span style="color:#24292e;">startretries=10</span></span>
<span class="line"><span style="color:#24292e;">process_name=%(program_name)s</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_backups=5</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_maxbytes=10MB</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=/var/log/supervisor/rabbitmq.log</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile_backups=5</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile_maxbytes=10MB</span></span>
<span class="line"><span style="color:#24292e;">stderr_logfile=/var/log/supervisor/rabbitmq-error.log</span></span></code></pre></div><p>以节点一为例通过 Supervisor 管理 RabbitMQ 服务，其他节点不再累述</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 关闭服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># supervisorctl stop rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># supervisorctl start rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看服务状态</span></span>
<span class="line"><span style="color:#e1e4e8;"># supervisorctl status rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># supervisorctl restart rabbitmq</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 关闭服务</span></span>
<span class="line"><span style="color:#24292e;"># supervisorctl stop rabbitmq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动服务</span></span>
<span class="line"><span style="color:#24292e;"># supervisorctl start rabbitmq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看服务状态</span></span>
<span class="line"><span style="color:#24292e;"># supervisorctl status rabbitmq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重启服务</span></span>
<span class="line"><span style="color:#24292e;"># supervisorctl restart rabbitmq</span></span></code></pre></div><h2 id="_7-2systemd" tabindex="-1">7.2systemd <a class="header-anchor" href="#_7-2systemd" aria-label="Permalink to &quot;7.2systemd&quot;">​</a></h2><h2 id="_7-3修改端口" tabindex="-1">7.3修改端口 <a class="header-anchor" href="#_7-3修改端口" aria-label="Permalink to &quot;7.3修改端口&quot;">​</a></h2><p>RabbitMQ 默认占用 4369、5672、15672、25672 默认端口号，更改默认端口的方法如下：</p><ul><li>更改 15672 端口，配置文件路径：<code>/usr/local/rabbitmq/etc/rabbitmq/rabbitmq.config</code></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[</span></span>
<span class="line"><span style="color:#e1e4e8;">  {rabbitmq_management,</span></span>
<span class="line"><span style="color:#e1e4e8;">      [</span></span>
<span class="line"><span style="color:#e1e4e8;">        {listener,</span></span>
<span class="line"><span style="color:#e1e4e8;">                [</span></span>
<span class="line"><span style="color:#e1e4e8;">                   {port, 15672},</span></span>
<span class="line"><span style="color:#e1e4e8;">                   {ip, &quot;0.0.0.0&quot;},</span></span>
<span class="line"><span style="color:#e1e4e8;">                   {ssl, false}</span></span>
<span class="line"><span style="color:#e1e4e8;">                ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[</span></span>
<span class="line"><span style="color:#24292e;">  {rabbitmq_management,</span></span>
<span class="line"><span style="color:#24292e;">      [</span></span>
<span class="line"><span style="color:#24292e;">        {listener,</span></span>
<span class="line"><span style="color:#24292e;">                [</span></span>
<span class="line"><span style="color:#24292e;">                   {port, 15672},</span></span>
<span class="line"><span style="color:#24292e;">                   {ip, &quot;0.0.0.0&quot;},</span></span>
<span class="line"><span style="color:#24292e;">                   {ssl, false}</span></span>
<span class="line"><span style="color:#24292e;">                ]</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      ]</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">]</span></span></code></pre></div><ul><li>更改 5672、25672 端口，配置文件路径：<code>/usr/local/rabbitmq/etc/rabbitmq/rabbitmq-env.conf</code></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NODE_PORT=5673</span></span>
<span class="line"><span style="color:#e1e4e8;">DIST_PORT=25673</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NODE_PORT=5673</span></span>
<span class="line"><span style="color:#24292e;">DIST_PORT=25673</span></span></code></pre></div><ul><li>更改 4369 端口，配置文件路径：<code>/etc/profile</code>，单机可以多个 RabbitMQ 节点共用同一个 <code>ERL_EPMD_PORT</code> 端口</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">export ERL_EPMD_PORT=4363</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">export ERL_EPMD_PORT=4363</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo &quot;listeners.tcp.default = 5672</span></span>
<span class="line"><span style="color:#e1e4e8;">management.listener.port = 15672</span></span>
<span class="line"><span style="color:#e1e4e8;">vm_memory_high_watermark.relative = 0.2</span></span>
<span class="line"><span style="color:#e1e4e8;">vm_memory_high_watermark_paging_ratio = 0.2</span></span>
<span class="line"><span style="color:#e1e4e8;">disk_free_limit.absolute = 1GB</span></span>
<span class="line"><span style="color:#e1e4e8;">cluster_partition_handling = autoheal</span></span>
<span class="line"><span style="color:#e1e4e8;">default_vhost = /&quot;&gt;&gt;rabbitmq2.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo &quot;listeners.tcp.default = 5672</span></span>
<span class="line"><span style="color:#24292e;">management.listener.port = 15672</span></span>
<span class="line"><span style="color:#24292e;">vm_memory_high_watermark.relative = 0.2</span></span>
<span class="line"><span style="color:#24292e;">vm_memory_high_watermark_paging_ratio = 0.2</span></span>
<span class="line"><span style="color:#24292e;">disk_free_limit.absolute = 1GB</span></span>
<span class="line"><span style="color:#24292e;">cluster_partition_handling = autoheal</span></span>
<span class="line"><span style="color:#24292e;">default_vhost = /&quot;&gt;&gt;rabbitmq2.conf</span></span></code></pre></div><h1 id="_8-集群操作" tabindex="-1">8.集群操作 <a class="header-anchor" href="#_8-集群操作" aria-label="Permalink to &quot;8.集群操作&quot;">​</a></h1><h2 id="重新将节点加入集群" tabindex="-1">重新将节点加入集群 <a class="header-anchor" href="#重新将节点加入集群" aria-label="Permalink to &quot;重新将节点加入集群&quot;">​</a></h2><p>这里假设由于各种原因（例如断电重启、节点宕机重启），节点二无法成功加入到集群，那么可以执行以下操作来解决。<strong>特别注意，以下操作会删除节点二的元数据（虚拟机、用户、角色、权限、已持久化的消息等），因此当节点二成功加入集群后，必须重新配置节点二的虚拟机、用户、角色、权限等，否则 RabbitMQ 客户端将无法连接节点二</strong></p><h3 id="移出集群" tabindex="-1">移出集群 <a class="header-anchor" href="#移出集群" aria-label="Permalink to &quot;移出集群&quot;">​</a></h3><p>首先在节点一里，将节点二移出集群</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入节点一的安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 将节点二移出集群</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq1 forget_cluster_node rabbit@rabbitmq2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入节点一的安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 将节点二移出集群</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq1 forget_cluster_node rabbit@rabbitmq2</span></span></code></pre></div><p>然后重置节点二的元数据、集群配置等信息，其中会删除虚拟机、用户、角色、权限、已持久化的消息等元数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入节点二的安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 后台启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmq-server -detached</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 停止节点二的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop_app</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重置节点二的元数据、集群配置等信息</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 reset</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重新将节点二加入到集群</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 start_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入节点二的安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 后台启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmq-server -detached</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 停止节点二的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop_app</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重置节点二的元数据、集群配置等信息</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 reset</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重新将节点二加入到集群</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 start_app</span></span></code></pre></div><p>如果节点二仍然无法加入集群，可以直接删除节点二的所有数据库文件，然后重启节点二的 RabbitMQ 服务，最后重新将节点二加入到集群</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 进入节点二的安装目录</span></span>
<span class="line"><span style="color:#e1e4e8;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 彻底关闭节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除节点二的数据文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># rm -rf /usr/local/rabbitmq/var/lib/rabbitmq/mnesia/*</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 后台启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmq-server -detached</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 停止节点二的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop_app</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重置节点二的元数据、集群配置等信息</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 reset</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重新将节点二加入到集群</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl -n rabbit@rabbitmq2 start_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 进入节点二的安装目录</span></span>
<span class="line"><span style="color:#24292e;"># cd /usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 彻底关闭节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 删除节点二的数据文件</span></span>
<span class="line"><span style="color:#24292e;"># rm -rf /usr/local/rabbitmq/var/lib/rabbitmq/mnesia/*</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 后台启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmq-server -detached</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 停止节点二的RabbitMQ的服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 stop_app</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重置节点二的元数据、集群配置等信息</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 reset</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重新将节点二加入到集群</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 join_cluster rabbit@rabbitmq1 --ram</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动节点二的RabbitMQ服务</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl -n rabbit@rabbitmq2 start_app</span></span></code></pre></div><p>强制重置节点，<code>force_reset</code> 命令和 <code>reset</code> 的区别是无条件重置节点，不管当前管理数据库状态以及集群的配置，如果数据库或者集群配置发生错误才使用这个最后的手段</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl force_reset</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># ./rabbitmqctl force_reset</span></span></code></pre></div><h3 id="加入集群" tabindex="-1">加入集群 <a class="header-anchor" href="#加入集群" aria-label="Permalink to &quot;加入集群&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ rabbitmqctl -n rabbit2 stop_app</span></span>
<span class="line"><span style="color:#e1e4e8;">$ rabbitmqctl -n rabbit2 reset</span></span>
<span class="line"><span style="color:#e1e4e8;">$ rabbitmqctl -n rabbit2 join_cluster rabbit1</span></span>
<span class="line"><span style="color:#e1e4e8;">$ rabbitmqctl -n rabbit2 start_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ rabbitmqctl -n rabbit2 stop_app</span></span>
<span class="line"><span style="color:#24292e;">$ rabbitmqctl -n rabbit2 reset</span></span>
<span class="line"><span style="color:#24292e;">$ rabbitmqctl -n rabbit2 join_cluster rabbit1</span></span>
<span class="line"><span style="color:#24292e;">$ rabbitmqctl -n rabbit2 start_app</span></span></code></pre></div><h2 id="_8-2rabbitmq-无法操作集群节点" tabindex="-1">8.2RabbitMQ 无法操作集群节点 <a class="header-anchor" href="#_8-2rabbitmq-无法操作集群节点" aria-label="Permalink to &quot;8.2RabbitMQ 无法操作集群节点&quot;">​</a></h2><p>若执行以下命令出现下述的错误，一般是当前执行操作的用户的家目录下的 <code>.erlang.cookie</code> 与 集群节点的 <code>.erlang.cookie</code> 不一致导致。解决办法是集群节点是以哪个用户启动的，就切换到对应的用户，例如 <code>su rabbitmq</code> ，然后再执行集群操作命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看集群状态</span></span>
<span class="line"><span style="color:#e1e4e8;"># ./rabbitmqctl cluster_status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看集群状态</span></span>
<span class="line"><span style="color:#24292e;"># ./rabbitmqctl cluster_status</span></span></code></pre></div><p>执行集群状态查看命令，出现以下错误信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Error: unable to perform an operation on node &#39;rabbit2@rabbitmq2&#39;. Please see diagnostics information and suggestions below.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Most common reasons for this are:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> * Target node is unreachable (e.g. due to hostname resolution, TCP connection or firewall issues)</span></span>
<span class="line"><span style="color:#e1e4e8;"> * CLI tool fails to authenticate with the server (e.g. due to CLI tool&#39;s Erlang cookie not matching that of the server)</span></span>
<span class="line"><span style="color:#e1e4e8;"> * Target node is not running</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">In addition to the diagnostics info below:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> * See the CLI, clustering and networking guides on https://rabbitmq.com/documentation.html to learn more</span></span>
<span class="line"><span style="color:#e1e4e8;"> * Consult server logs on node rabbit2@rabbitmq2</span></span>
<span class="line"><span style="color:#e1e4e8;"> * If target node is configured to use long node names, don&#39;t forget to use --longnames with CLI tools</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">DIAGNOSTICS</span></span>
<span class="line"><span style="color:#e1e4e8;">===========</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">attempted to contact: [rabbit2@rabbitmq2]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rabbit2@rabbitmq2:</span></span>
<span class="line"><span style="color:#e1e4e8;">  * connected to epmd (port 4369) on rabbitmq2</span></span>
<span class="line"><span style="color:#e1e4e8;">  * epmd reports node &#39;rabbit2&#39; uses port 25674 for inter-node and CLI tool traffic</span></span>
<span class="line"><span style="color:#e1e4e8;">  * TCP connection succeeded but Erlang distribution failed</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  * Authentication failed (rejected by the remote node), please check the Erlang cookie</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Current node details:</span></span>
<span class="line"><span style="color:#e1e4e8;"> * node name: &#39;rabbitmqcli-7936-rabbit2@rabbitmq2&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"> * effective user&#39;s home directory: /home/centos</span></span>
<span class="line"><span style="color:#e1e4e8;"> * Erlang cookie hash: 5hmDFFQNoU5sdfrafENxAg==</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Error: unable to perform an operation on node &#39;rabbit2@rabbitmq2&#39;. Please see diagnostics information and suggestions below.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Most common reasons for this are:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> * Target node is unreachable (e.g. due to hostname resolution, TCP connection or firewall issues)</span></span>
<span class="line"><span style="color:#24292e;"> * CLI tool fails to authenticate with the server (e.g. due to CLI tool&#39;s Erlang cookie not matching that of the server)</span></span>
<span class="line"><span style="color:#24292e;"> * Target node is not running</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">In addition to the diagnostics info below:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> * See the CLI, clustering and networking guides on https://rabbitmq.com/documentation.html to learn more</span></span>
<span class="line"><span style="color:#24292e;"> * Consult server logs on node rabbit2@rabbitmq2</span></span>
<span class="line"><span style="color:#24292e;"> * If target node is configured to use long node names, don&#39;t forget to use --longnames with CLI tools</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">DIAGNOSTICS</span></span>
<span class="line"><span style="color:#24292e;">===========</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">attempted to contact: [rabbit2@rabbitmq2]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rabbit2@rabbitmq2:</span></span>
<span class="line"><span style="color:#24292e;">  * connected to epmd (port 4369) on rabbitmq2</span></span>
<span class="line"><span style="color:#24292e;">  * epmd reports node &#39;rabbit2&#39; uses port 25674 for inter-node and CLI tool traffic</span></span>
<span class="line"><span style="color:#24292e;">  * TCP connection succeeded but Erlang distribution failed</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  * Authentication failed (rejected by the remote node), please check the Erlang cookie</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Current node details:</span></span>
<span class="line"><span style="color:#24292e;"> * node name: &#39;rabbitmqcli-7936-rabbit2@rabbitmq2&#39;</span></span>
<span class="line"><span style="color:#24292e;"> * effective user&#39;s home directory: /home/centos</span></span>
<span class="line"><span style="color:#24292e;"> * Erlang cookie hash: 5hmDFFQNoU5sdfrafENxAg==</span></span></code></pre></div><h2 id="_8-3重置节点" tabindex="-1">8.3重置节点 <a class="header-anchor" href="#_8-3重置节点" aria-label="Permalink to &quot;8.3重置节点&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl reset</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl reset</span></span></code></pre></div><h2 id="_8-4移除节点" tabindex="-1">8.4移除节点 <a class="header-anchor" href="#_8-4移除节点" aria-label="Permalink to &quot;8.4移除节点&quot;">​</a></h2><ul><li>集群删除节点,就在哪个节点上操作</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># on rabbit3</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl stop_app</span></span>
<span class="line"><span style="color:#e1e4e8;"># =&gt; Stopping node rabbit@rabbit3 ...done.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl reset</span></span>
<span class="line"><span style="color:#e1e4e8;"># =&gt; Resetting node rabbit@rabbit3 ...done.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl forget_cluster_node rabbit@rabbit3  #此时会报错，忽略即可</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl start_app</span></span>
<span class="line"><span style="color:#e1e4e8;"># =&gt; Starting node rabbit@rabbit3 ...done.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">在节点上运行cluster_status</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl cluster_status</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">命令可确认rabbit@rabbit3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># on rabbit3</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl stop_app</span></span>
<span class="line"><span style="color:#24292e;"># =&gt; Stopping node rabbit@rabbit3 ...done.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl reset</span></span>
<span class="line"><span style="color:#24292e;"># =&gt; Resetting node rabbit@rabbit3 ...done.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl forget_cluster_node rabbit@rabbit3  #此时会报错，忽略即可</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl start_app</span></span>
<span class="line"><span style="color:#24292e;"># =&gt; Starting node rabbit@rabbit3 ...done.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">在节点上运行cluster_status</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl cluster_status</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">命令可确认rabbit@rabbit3</span></span></code></pre></div><h2 id="_8-5修改节点类型" tabindex="-1">8.5修改节点类型 <a class="header-anchor" href="#_8-5修改节点类型" aria-label="Permalink to &quot;8.5修改节点类型&quot;">​</a></h2><p>修改集群节点类型disc为ram类型</p><ul><li>查看集群状态</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl cluster_status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl cluster_status</span></span></code></pre></div><ul><li>停止</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl stop_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl stop_app</span></span></code></pre></div><ul><li>修改ram类型，在需要改变类型节点上操作</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl change_cluster_node_type ram</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#disc</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl change_cluster_node_type disc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl change_cluster_node_type ram</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#disc</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl change_cluster_node_type disc</span></span></code></pre></div><ul><li>启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl start_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl start_app</span></span></code></pre></div><h2 id="_8-6修改集群名字" tabindex="-1">8.6修改集群名字 <a class="header-anchor" href="#_8-6修改集群名字" aria-label="Permalink to &quot;8.6修改集群名字&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#rabbitmqctl cluster_status</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#设置集群名字</span></span>
<span class="line"><span style="color:#e1e4e8;">#rabbitmqctl  set_cluster_name ha_rmq_cluster</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#rabbitmqctl cluster_status</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#设置集群名字</span></span>
<span class="line"><span style="color:#24292e;">#rabbitmqctl  set_cluster_name ha_rmq_cluster</span></span></code></pre></div><h1 id="_9-rabbitmq集群恢复与故障转移" tabindex="-1">9.RabbitMQ集群恢复与故障转移 <a class="header-anchor" href="#_9-rabbitmq集群恢复与故障转移" aria-label="Permalink to &quot;9.RabbitMQ集群恢复与故障转移&quot;">​</a></h1><p>前提 : A, B两个节点组成一个镜像队列, B是Master节点</p><h2 id="场景一-a先停-b后停" tabindex="-1">场景一：A先停, B后停 <a class="header-anchor" href="#场景一-a先停-b后停" aria-label="Permalink to &quot;场景一：A先停, B后停&quot;">​</a></h2><p>解决方案 : 该场景下B是Master, 只要先启动B, 在启动A即可。或者先启动A, 30秒之内启动B即可恢复镜像队列</p><h2 id="场景二-a-b同时停机" tabindex="-1">场景二：A, B同时停机 <a class="header-anchor" href="#场景二-a-b同时停机" aria-label="Permalink to &quot;场景二：A, B同时停机&quot;">​</a></h2><p>解决方案 : 只需要在30秒内连续启动A和B即可恢复镜像</p><h2 id="场景三-a先停-b后停-且a无法恢复" tabindex="-1">场景三：A先停, B后停, 且A无法恢复 <a class="header-anchor" href="#场景三-a先停-b后停-且a无法恢复" aria-label="Permalink to &quot;场景三：A先停, B后停, 且A无法恢复&quot;">​</a></h2><p>解决场景 : 因为B是Master, 所以等B启起来以后, 在B节点上调用控制台命令 : rabbitmqctl forget_cluster_node A解除与A的Cluster关系, 再将新的Slave节点加入B即可重新恢复镜像队列</p><h2 id="场景四-a先停-b后停-且b无法恢复" tabindex="-1">场景四：A先停, B后停, 且B无法恢复 <a class="header-anchor" href="#场景四-a先停-b后停-且b无法恢复" aria-label="Permalink to &quot;场景四：A先停, B后停, 且B无法恢复&quot;">​</a></h2><p>解决方案 :</p><p>因为Master节点无法恢复, 所以较难处理, 在3.4.2之前没有什么好的解决方案, 但是现在已经有解决方案了, 在3.4.2以后的版本。</p><p>因为B是主节点, 所以直接启动A是不行的, 当A无法启动时, 也就没有办法在A节点上调用rabbitmqctl forget_cluster_node B 命令了。但是在新版本中forget_cluster_node支持–offline参数, 支持线下移除节点。</p><p>这就意味着运行rabbitmqctl在理想节点上执行命令, 迫使RabbitMQ在未启动Slave节点中选择一个节点作为Master。</p><p>当在A节点执行**rabbitmqctl forget_cluster_node --offline B **时, RabbitMQ会mock一个节点代表A, 执行 forget_cluster_node命令将B移除cluster, 然后A就可以正常启动了, 最后将新的Slave节点加入A即可重新恢复镜像队列</p><h2 id="场景五-a先停-b后停-且a-b均无法恢复-但是能得到a或b的磁盘文件" tabindex="-1">场景五：A先停, B后停, 且A, B均无法恢复, 但是能得到A或B的磁盘文件 <a class="header-anchor" href="#场景五-a先停-b后停-且a-b均无法恢复-但是能得到a或b的磁盘文件" aria-label="Permalink to &quot;场景五：A先停, B后停, 且A, B均无法恢复, 但是能得到A或B的磁盘文件&quot;">​</a></h2><p>解决方案 : 这种场景更加难以处理, 只能通过恢复数据的方式去尝试恢复, 将A或B的数据库文件默认在$RABBIT_HOME/var/lib目录中, 把它拷贝到新节点对应的目录下, 再将新节点的hostname改成A或B的hostname, 如果是A节点(Slave)的磁盘文件, 按照场景四处理即可, 如果是B节点(Master)的磁盘文件, 则按照场景三处理, 最后将新的Slave加入到新节点后完成恢复 这种场景很极端, 只能尝试恢复</p>`,185),u=[m];function h(q,g,v,_,k,f){return a(),n("div",null,u)}const x=s(y,[["render",h]]);export{R as __pageData,x as default};
