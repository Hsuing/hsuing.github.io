import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"5.源码安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/rabbitmq/1-install.md","filePath":"guide/Database/rabbitmq/1-install.md","lastUpdated":1710405635000}'),l={name:"guide/Database/rabbitmq/1-install.md"},p=n(`<h2 id="_1-下载" tabindex="-1">1.下载 <a class="header-anchor" href="#_1-下载" aria-label="Permalink to &quot;1.下载&quot;">​</a></h2><p>RabbitMQ服务端代码是使用并发式语言Erlang编写的，安装Rabbit MQ的前提是安装Erlang</p><ul><li>下载地址：<a href="http://www.erlang.org/downloads" target="_blank" rel="noreferrer">http://www.erlang.org/downloads</a></li><li>下载地址：<a href="http://www.rabbitmq.com/download.html" target="_blank" rel="noreferrer">http://www.rabbitmq.com/download.html</a></li></ul><blockquote><p>注意事项</p><p>erlang的版本会影响到rabbitmq的安装，两者有个版本对照。查看对照的地址：<a href="http://www.rabbitmq.com/which-erlang.html" target="_blank" rel="noreferrer">http://www.rabbitmq.com/which-erlang.html</a></p></blockquote><p><a href="https://www.rabbitmq.com/documentation.html" target="_blank" rel="noreferrer">https://www.rabbitmq.com/documentation.html</a></p><p><a href="https://packagecloud.io/rabbitmq/erlang" target="_blank" rel="noreferrer">https://packagecloud.io/rabbitmq/erlang</a></p><h2 id="_2-准备工作" tabindex="-1">2.准备工作 <a class="header-anchor" href="#_2-准备工作" aria-label="Permalink to &quot;2.准备工作&quot;">​</a></h2><h3 id="关闭防火墙" tabindex="-1">关闭防火墙 <a class="header-anchor" href="#关闭防火墙" aria-label="Permalink to &quot;关闭防火墙&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">firewall-cmd --permanent --add-port=5672/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#e1e4e8;">setsebool -P nis_enabled 1 （关闭selinux）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">firewall-cmd --permanent --add-port=5672/tcp</span></span>
<span class="line"><span style="color:#24292e;">firewall-cmd --reload</span></span>
<span class="line"><span style="color:#24292e;">setsebool -P nis_enabled 1 （关闭selinux）</span></span></code></pre></div><h3 id="安装依赖包" tabindex="-1">安装依赖包 <a class="header-anchor" href="#安装依赖包" aria-label="Permalink to &quot;安装依赖包&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install build-essential openssl openssl-devel unixODBC unixODBC-devel make gcc gcc-c++ kernel-devel m4 ncurses-devel tk tc xz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install build-essential openssl openssl-devel unixODBC unixODBC-devel make gcc gcc-c++ kernel-devel m4 ncurses-devel tk tc xz</span></span></code></pre></div><h2 id="_3-开启后台管理" tabindex="-1">3.开启后台管理 <a class="header-anchor" href="#_3-开启后台管理" aria-label="Permalink to &quot;3.开启后台管理&quot;">​</a></h2><p>rabbitmq-plugins enable rabbitmq_management</p><h2 id="_4-开启远程访问" tabindex="-1">4.开启远程访问 <a class="header-anchor" href="#_4-开启远程访问" aria-label="Permalink to &quot;4.开启远程访问&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#添加用户</span></span>
<span class="line"><span style="color:#e1e4e8;">#rabbitmqctl add_user 账号 密码</span></span>
<span class="line"><span style="color:#e1e4e8;">#rabbitmqctl add_user admin admin</span></span>
<span class="line"><span style="color:#e1e4e8;">#分配用户标签(admin为要赋予administrator权限的刚创建的那个账号的名字)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#e1e4e8;">#设置权限&lt;即开启远程访问&gt;(如果需要远程连接,例如java项目中需要调用mq,则一定要配置,否则无法连接到mq,admin为要赋予远程访问权限的刚创建的那个账号的名字,必须运行着rabbitmq此命令才能执行)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#rabbitmqctl set_permissions -p &quot;/&quot; admin &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#添加用户</span></span>
<span class="line"><span style="color:#24292e;">#rabbitmqctl add_user 账号 密码</span></span>
<span class="line"><span style="color:#24292e;">#rabbitmqctl add_user admin admin</span></span>
<span class="line"><span style="color:#24292e;">#分配用户标签(admin为要赋予administrator权限的刚创建的那个账号的名字)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#24292e;">#设置权限&lt;即开启远程访问&gt;(如果需要远程连接,例如java项目中需要调用mq,则一定要配置,否则无法连接到mq,admin为要赋予远程访问权限的刚创建的那个账号的名字,必须运行着rabbitmq此命令才能执行)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#rabbitmqctl set_permissions -p &quot;/&quot; admin &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;</span></span></code></pre></div><h1 id="_5-源码安装" tabindex="-1">5.源码安装 <a class="header-anchor" href="#_5-源码安装" aria-label="Permalink to &quot;5.源码安装&quot;">​</a></h1><p>一、安装erlang</p><p>1.利用yum安装erlang编译所依赖的环境</p><p>yum -y install make gcc gcc-c++ kernel-devel m4ncurses-devel openssl-devel unixODBC-devel</p><p>2.下载erlang 进行源码安装</p><p>erlang官网地址： <a href="http://www.erlang.org/downloads" target="_blank" rel="noreferrer">http://www.erlang.org/downloads</a></p><p>3.解压并进行编译安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#解压</span></span>
<span class="line"><span style="color:#e1e4e8;">    tar -xvf otp_src_21.0.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">    #进入目录</span></span>
<span class="line"><span style="color:#e1e4e8;">    cd cd otp_src_21.0</span></span>
<span class="line"><span style="color:#e1e4e8;">    #编译</span></span>
<span class="line"><span style="color:#e1e4e8;">    ./configure  --prefix=/usr/local/erlang --without-javac</span></span>
<span class="line"><span style="color:#e1e4e8;">    #安装</span></span>
<span class="line"><span style="color:#e1e4e8;">    make &amp;&amp; make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#解压</span></span>
<span class="line"><span style="color:#24292e;">    tar -xvf otp_src_21.0.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">    #进入目录</span></span>
<span class="line"><span style="color:#24292e;">    cd cd otp_src_21.0</span></span>
<span class="line"><span style="color:#24292e;">    #编译</span></span>
<span class="line"><span style="color:#24292e;">    ./configure  --prefix=/usr/local/erlang --without-javac</span></span>
<span class="line"><span style="color:#24292e;">    #安装</span></span>
<span class="line"><span style="color:#24292e;">    make &amp;&amp; make install</span></span></code></pre></div><p>4.安装rabbitmq</p><p>下载rabbitmq</p><p>rabbitmq官网下载地址 ： <a href="http://www.rabbitmq.com/download.html" target="_blank" rel="noreferrer">http://www.rabbitmq.com/download.html</a></p><p>rabbitmq源码下载地址： <a href="http://www.rabbitmq.com/install-generic-unix.html" target="_blank" rel="noreferrer">http://www.rabbitmq.com/install-generic-unix.html</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">xz -d rabbitmq-server-generic-unix-3.7.7.tar.xz</span></span>
<span class="line"><span style="color:#e1e4e8;">tar -xvf rabbitmq-server-generic-unix-3.7.7.tar</span></span>
<span class="line"><span style="color:#e1e4e8;">mv rabbitmq_server-3.7.7/  /usr/local/rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#添加系统变量</span></span>
<span class="line"><span style="color:#e1e4e8;">#打开环境变量文件</span></span>
<span class="line"><span style="color:#e1e4e8;">    vim /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;">    #添加erlang rabbitmq 到环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">    export PATH=$PATH:/usr/local/erlang/bin</span></span>
<span class="line"><span style="color:#e1e4e8;">    export PATH=$PATH:/usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#e1e4e8;">    #重新加载环境变量</span></span>
<span class="line"><span style="color:#e1e4e8;">    source /etc/profile</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#启动web插件 启动rabbitmq</span></span>
<span class="line"><span style="color:#e1e4e8;">#启动web插件 便于访问</span></span>
<span class="line"><span style="color:#e1e4e8;">    rabbitmq-plugins enable rabbitmq_management</span></span>
<span class="line"><span style="color:#e1e4e8;">#启动rabbitmq服务</span></span>
<span class="line"><span style="color:#e1e4e8;">    rabbitmq-server</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">添加远端登录账户</span></span>
<span class="line"><span style="color:#e1e4e8;">#添加用户 admin  密码为 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">    rabbitmqctl add_user admin 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">    #将admin 设置为管理员权限</span></span>
<span class="line"><span style="color:#e1e4e8;">    rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#e1e4e8;">    #将admin 设置为远端登录</span></span>
<span class="line"><span style="color:#e1e4e8;">    rabbitmqctl set_permissions -p / admin &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">xz -d rabbitmq-server-generic-unix-3.7.7.tar.xz</span></span>
<span class="line"><span style="color:#24292e;">tar -xvf rabbitmq-server-generic-unix-3.7.7.tar</span></span>
<span class="line"><span style="color:#24292e;">mv rabbitmq_server-3.7.7/  /usr/local/rabbitmq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#添加系统变量</span></span>
<span class="line"><span style="color:#24292e;">#打开环境变量文件</span></span>
<span class="line"><span style="color:#24292e;">    vim /etc/profile</span></span>
<span class="line"><span style="color:#24292e;">    #添加erlang rabbitmq 到环境变量</span></span>
<span class="line"><span style="color:#24292e;">    export PATH=$PATH:/usr/local/erlang/bin</span></span>
<span class="line"><span style="color:#24292e;">    export PATH=$PATH:/usr/local/rabbitmq/sbin</span></span>
<span class="line"><span style="color:#24292e;">    #重新加载环境变量</span></span>
<span class="line"><span style="color:#24292e;">    source /etc/profile</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#启动web插件 启动rabbitmq</span></span>
<span class="line"><span style="color:#24292e;">#启动web插件 便于访问</span></span>
<span class="line"><span style="color:#24292e;">    rabbitmq-plugins enable rabbitmq_management</span></span>
<span class="line"><span style="color:#24292e;">#启动rabbitmq服务</span></span>
<span class="line"><span style="color:#24292e;">    rabbitmq-server</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">添加远端登录账户</span></span>
<span class="line"><span style="color:#24292e;">#添加用户 admin  密码为 123456</span></span>
<span class="line"><span style="color:#24292e;">    rabbitmqctl add_user admin 123456</span></span>
<span class="line"><span style="color:#24292e;">    #将admin 设置为管理员权限</span></span>
<span class="line"><span style="color:#24292e;">    rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#24292e;">    #将admin 设置为远端登录</span></span>
<span class="line"><span style="color:#24292e;">    rabbitmqctl set_permissions -p / admin &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;</span></span></code></pre></div><h1 id="_6-yum-安装" tabindex="-1">6.yum 安装 <a class="header-anchor" href="#_6-yum-安装" aria-label="Permalink to &quot;6.yum 安装&quot;">​</a></h1><h2 id="_1-1-官网地址" tabindex="-1">1.1 官网地址 <a class="header-anchor" href="#_1-1-官网地址" aria-label="Permalink to &quot;1.1 官网地址&quot;">​</a></h2><p><a href="https://www.rabbitmq.com/download.html" target="_blank" rel="noreferrer">https://www.rabbitmq.com/download.html</a></p><ul><li>RabbitMQ(3.8.8): <a href="https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.8.8" target="_blank" rel="noreferrer">https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.8.8</a></li><li>erlang(22.3)：<a href="https://www.erlang-solutions.com/downloads/" target="_blank" rel="noreferrer">https://www.erlang-solutions.com/downloads/</a></li></ul><ul><li>版本对应：<a href="https://www.rabbitmq.com/which-erlang.html#erlang-repositories" target="_blank" rel="noreferrer">https://www.rabbitmq.com/which-erlang.html#erlang-repositories</a></li></ul><h2 id="_1-2依赖安装" tabindex="-1">1.2依赖安装 <a class="header-anchor" href="#_1-2依赖安装" aria-label="Permalink to &quot;1.2依赖安装&quot;">​</a></h2><p>安装文件（分别按照以下顺序安装）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># yum install epel-release</span></span>
<span class="line"><span style="color:#e1e4e8;"># yum install unixODBC unixODBC-devel wxBase wxGTK SDL wxGTK-gl socat -y</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 安装erlang</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -ivh esl-erlang_22.3.1-1_centos_7_amd64.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#安装RabbitMQ</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -ivh rabbitmq-server-3.8.8-1.el7.noarch.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># yum install epel-release</span></span>
<span class="line"><span style="color:#24292e;"># yum install unixODBC unixODBC-devel wxBase wxGTK SDL wxGTK-gl socat -y</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 安装erlang</span></span>
<span class="line"><span style="color:#24292e;">rpm -ivh esl-erlang_22.3.1-1_centos_7_amd64.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#安装RabbitMQ</span></span>
<span class="line"><span style="color:#24292e;">rpm -ivh rabbitmq-server-3.8.8-1.el7.noarch.rpm</span></span></code></pre></div><h2 id="_1-3yum安装位置" tabindex="-1">1.3yum安装位置 <a class="header-anchor" href="#_1-3yum安装位置" aria-label="Permalink to &quot;1.3yum安装位置&quot;">​</a></h2><table><thead><tr><th>bin</th><th></th></tr></thead><tbody><tr><td>/usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/sbin</td><td>可执行命令</td></tr><tr><td>/usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/sbin/rabbitmq-defaults</td><td>查看默认配置文件位置</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@dj_a_sms_otc_index_opera01 sbin]# ll</span></span>
<span class="line"><span style="color:#e1e4e8;">total 40</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 1245 Sep  3  2020 rabbitmqctl</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root  983 Sep  3  2020 rabbitmq-defaults</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 1254 Sep  3  2020 rabbitmq-diagnostics</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 6948 Sep  3  2020 rabbitmq-env</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 1250 Sep  3  2020 rabbitmq-plugins</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 1249 Sep  3  2020 rabbitmq-queues</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 7042 Sep  3  2020 rabbitmq-server</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 1250 Sep  3  2020 rabbitmq-upgrade</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@dj_a_sms_otc_index_opera01 sbin]# ll</span></span>
<span class="line"><span style="color:#24292e;">total 40</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 1245 Sep  3  2020 rabbitmqctl</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root  983 Sep  3  2020 rabbitmq-defaults</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 1254 Sep  3  2020 rabbitmq-diagnostics</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 6948 Sep  3  2020 rabbitmq-env</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 1250 Sep  3  2020 rabbitmq-plugins</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 1249 Sep  3  2020 rabbitmq-queues</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 7042 Sep  3  2020 rabbitmq-server</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 1250 Sep  3  2020 rabbitmq-upgrade</span></span></code></pre></div><h2 id="_1-4修改配置" tabindex="-1">1.4修改配置 <a class="header-anchor" href="#_1-4修改配置" aria-label="Permalink to &quot;1.4修改配置&quot;">​</a></h2><p>官方配置，<a href="https://www.rabbitmq.com/configure.html#config-file" target="_blank" rel="noreferrer">https://www.rabbitmq.com/configure.html#config-file</a></p><p>默认没有配置文件</p><p>有三个配置文件，分别为</p><p>主配置文件（rabbitmq.conf），</p><p>Erlang术语格式配置文件(advanced.config)、</p><p>环境变量配置文件(rabbitmq-env.conf)</p><p><a href="https://github.com/rabbitmq/rabbitmq-server/blob/master/deps/rabbit/docs/rabbitmq.conf.example" target="_blank" rel="noreferrer">https://github.com/rabbitmq/rabbitmq-server/blob/master/deps/rabbit/docs/rabbitmq.conf.example</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/sbin/rabbitmq-defaults</span></span>
<span class="line"><span style="color:#e1e4e8;">#  Specifies new style config file location</span></span>
<span class="line"><span style="color:#e1e4e8;">CONFIG_FILE=/etc/rabbitmq/rabbitmq.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/sbin/rabbitmq-defaults</span></span>
<span class="line"><span style="color:#24292e;">#  Specifies new style config file location</span></span>
<span class="line"><span style="color:#24292e;">CONFIG_FILE=/etc/rabbitmq/rabbitmq.conf</span></span></code></pre></div><p>该文件默认也不存在/etc/rabbitmq/目录下<strong>手动创建</strong></p><ul><li>新版格式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># A new style format snippet. This format is used by rabbitmq.conf files.</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_options.cacertfile           = /path/to/ca_certificate.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_options.certfile             = /path/to/server_certificate.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_options.keyfile              = /path/to/server_key.pem</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_options.verify               = verify_peer</span></span>
<span class="line"><span style="color:#e1e4e8;">ssl_options.fail_if_no_peer_cert = true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># A new style format snippet. This format is used by rabbitmq.conf files.</span></span>
<span class="line"><span style="color:#24292e;">ssl_options.cacertfile           = /path/to/ca_certificate.pem</span></span>
<span class="line"><span style="color:#24292e;">ssl_options.certfile             = /path/to/server_certificate.pem</span></span>
<span class="line"><span style="color:#24292e;">ssl_options.keyfile              = /path/to/server_key.pem</span></span>
<span class="line"><span style="color:#24292e;">ssl_options.verify               = verify_peer</span></span>
<span class="line"><span style="color:#24292e;">ssl_options.fail_if_no_peer_cert = true</span></span></code></pre></div><ul><li><strong>旧版本格式</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">%% A classic format snippet, now used by advanced.config files.</span></span>
<span class="line"><span style="color:#e1e4e8;">[</span></span>
<span class="line"><span style="color:#e1e4e8;"> {rabbit, [{ssl_options, [{cacertfile,           &quot;/path/to/ca_certificate.pem&quot;},</span></span>
<span class="line"><span style="color:#e1e4e8;">                          {certfile,             &quot;/path/to/server_certificate.pem&quot;},</span></span>
<span class="line"><span style="color:#e1e4e8;">                          {keyfile,              &quot;/path/to/server_key.pem&quot;},</span></span>
<span class="line"><span style="color:#e1e4e8;">                          {verify,               verify_peer},</span></span>
<span class="line"><span style="color:#e1e4e8;">                          {fail_if_no_peer_cert, true}]}]}</span></span>
<span class="line"><span style="color:#e1e4e8;">].</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">%% A classic format snippet, now used by advanced.config files.</span></span>
<span class="line"><span style="color:#24292e;">[</span></span>
<span class="line"><span style="color:#24292e;"> {rabbit, [{ssl_options, [{cacertfile,           &quot;/path/to/ca_certificate.pem&quot;},</span></span>
<span class="line"><span style="color:#24292e;">                          {certfile,             &quot;/path/to/server_certificate.pem&quot;},</span></span>
<span class="line"><span style="color:#24292e;">                          {keyfile,              &quot;/path/to/server_key.pem&quot;},</span></span>
<span class="line"><span style="color:#24292e;">                          {verify,               verify_peer},</span></span>
<span class="line"><span style="color:#24292e;">                          {fail_if_no_peer_cert, true}]}]}</span></span>
<span class="line"><span style="color:#24292e;">].</span></span></code></pre></div><h2 id="_1-5添加用户" tabindex="-1">1.5添加用户 <a class="header-anchor" href="#_1-5添加用户" aria-label="Permalink to &quot;1.5添加用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#创建账号</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl add_user admin 123</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#设置用户角色</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#设置用户权限</span></span>
<span class="line"><span style="color:#e1e4e8;">set_permissions [-p &lt;vhostpath&gt;] &lt;user&gt; &lt;conf&gt; &lt;write&gt; &lt;read&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl set_permissions -p &quot;/&quot; admin &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#户 user_admin 具有/vhost1 这个 virtual host 中所有资源的配置、写、读权限</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#当前用户和角色</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl list_users</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#创建账号</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl add_user admin 123</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#设置用户角色</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl set_user_tags admin administrator</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#设置用户权限</span></span>
<span class="line"><span style="color:#24292e;">set_permissions [-p &lt;vhostpath&gt;] &lt;user&gt; &lt;conf&gt; &lt;write&gt; &lt;read&gt;</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl set_permissions -p &quot;/&quot; admin &quot;.*&quot; &quot;.*&quot; &quot;.*&quot;</span></span>
<span class="line"><span style="color:#24292e;">#户 user_admin 具有/vhost1 这个 virtual host 中所有资源的配置、写、读权限</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#当前用户和角色</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl list_users</span></span></code></pre></div><h1 id="_7-容器安装" tabindex="-1">7.容器安装 <a class="header-anchor" href="#_7-容器安装" aria-label="Permalink to &quot;7.容器安装&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker run -di --net=host --restart=always -v /data/data_rabbitmq:/var/lib/rabbitmq --name mq -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=ad45good6ad -p 15672:15672 -p 5672:5672 -p 25672:25672 -p 1883:1883 rabbitmq:management</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker run -di --net=host --restart=always -v /data/data_rabbitmq:/var/lib/rabbitmq --name mq -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=ad45good6ad -p 15672:15672 -p 5672:5672 -p 25672:25672 -p 1883:1883 rabbitmq:management</span></span></code></pre></div><h1 id="_8-命令" tabindex="-1">8.命令 <a class="header-anchor" href="#_8-命令" aria-label="Permalink to &quot;8.命令&quot;">​</a></h1><h2 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#启动</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@master software]# service rabbitmq-server start</span></span>
<span class="line"><span style="color:#e1e4e8;">#查看状态</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@master software]# service rabbitmq-server status</span></span>
<span class="line"><span style="color:#e1e4e8;">#停止</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@master software]# service rabbitmq-server stop</span></span>
<span class="line"><span style="color:#e1e4e8;">#开机自启动</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@master software]# chkconfig rabbitmq-server on</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#启动</span></span>
<span class="line"><span style="color:#24292e;">[root@master software]# service rabbitmq-server start</span></span>
<span class="line"><span style="color:#24292e;">#查看状态</span></span>
<span class="line"><span style="color:#24292e;">[root@master software]# service rabbitmq-server status</span></span>
<span class="line"><span style="color:#24292e;">#停止</span></span>
<span class="line"><span style="color:#24292e;">[root@master software]# service rabbitmq-server stop</span></span>
<span class="line"><span style="color:#24292e;">#开机自启动</span></span>
<span class="line"><span style="color:#24292e;">[root@master software]# chkconfig rabbitmq-server on</span></span></code></pre></div><h2 id="重置" tabindex="-1">重置 <a class="header-anchor" href="#重置" aria-label="Permalink to &quot;重置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#关闭应用的命令为</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl stop_app</span></span>
<span class="line"><span style="color:#e1e4e8;">#清除的命令为</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl reset</span></span>
<span class="line"><span style="color:#e1e4e8;">#重新启动命令为</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl start_app</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#关闭应用的命令为</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl stop_app</span></span>
<span class="line"><span style="color:#24292e;">#清除的命令为</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl reset</span></span>
<span class="line"><span style="color:#24292e;">#重新启动命令为</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl start_app</span></span></code></pre></div>`,62),t=[p];function o(r,i,c,b,d,m){return a(),e("div",null,t)}const y=s(l,[["render",o]]);export{u as __pageData,y as default};
