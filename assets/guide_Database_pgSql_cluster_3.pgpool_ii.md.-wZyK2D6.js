import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const p="/assets/pgpoll.AnXtKE8h.gif",o="/assets/pool.JWEABzaT.jpg",O=JSON.parse('{"title":"1.介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/cluster/3.pgpool_ii.md","filePath":"guide/Database/pgSql/cluster/3.pgpool_ii.md","lastUpdated":1703063387000}'),l={name:"guide/Database/pgSql/cluster/3.pgpool_ii.md"},t=a('<h1 id="_1-介绍" tabindex="-1">1.介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1.介绍&quot;">​</a></h1><p>官方文档：<a href="https://www.pgpool.net/mediawiki/index.php/Main_Page" target="_blank" rel="noreferrer">https://www.pgpool.net/mediawiki/index.php/Main_Page</a></p><p>13安装</p><p><a href="https://www.pgpool.net/docs/latest/en/html/example-cluster.html" target="_blank" rel="noreferrer">https://www.pgpool.net/docs/latest/en/html/example-cluster.html</a></p><p>12安装</p><p><a href="https://www.pgpool.net/docs/41/en/html/example-cluster.html" target="_blank" rel="noreferrer">https://www.pgpool.net/docs/41/en/html/example-cluster.html</a></p><p>Pgpool-II 是一个位于 PostgreSQL服务器和 PostgreSQL数据库客户端之间的中间件，Pgpool-II提供了连接池（Connection Pooling）、复制（Replication）、负载均衡（Load Balancing）、缓存（In Memory Query Cache）、看门狗（Watchdog）、超出限制链接（Limiting Exceeding Connections）等功能，可以基于这些特性来搭建PostgreSQL高可用集群</p><h2 id="_1-2架构图" tabindex="-1">1.2架构图 <a class="header-anchor" href="#_1-2架构图" aria-label="Permalink to &quot;1.2架构图&quot;">​</a></h2><p><img src="'+p+`" alt=""></p><h1 id="_2-环境" tabindex="-1">2.环境 <a class="header-anchor" href="#_2-环境" aria-label="Permalink to &quot;2.环境&quot;">​</a></h1><p>postgresql + pgpool 构建容灾高可用集群(数据同步流复制/主备自动切换)</p><p>流程分为以下几部分:</p><ol><li>postgresql-12 安装</li><li>postgresql-12 流复制配置以及验证</li><li>pgpoll-ii-4.1 安装</li><li>pgpool-ii-4.1 主备机器自动切换配置</li><li>pgpoll-ii-4.1 配置说明</li><li>方案宕机效果测试</li></ol><h2 id="高可用-容灾-效果" tabindex="-1">高可用(容灾)效果 <a class="header-anchor" href="#高可用-容灾-效果" aria-label="Permalink to &quot;高可用(容灾)效果&quot;">​</a></h2><p>解决三种宕机</p><ol><li>某一个 postgresql 数据库挂掉 (多台数据库启动后其中一台作为主机,其余作为备机构成一个数据库集群); <ul><li>如果是主机primary,集群检测到挂掉会通过配置的策略重新选一个<strong>备机standby</strong>切换为<strong>主机primary</strong>, 整个集群仍旧保证可用, 当原主机恢复服务后, 重新作为一个新备机standby,<strong>同步完数据后加入集群</strong></li><li>如果是备机standby,对整个集群无可见影响, 当备机恢复服务后,从主库同步完数据后,恢复正常状态加入集群;</li></ul></li><li>某一台机器上的pgpool-ii 程序挂掉; <ul><li>监测每个pgpool-ii进程的状态, 监测到挂掉之后,及时&quot;切换&quot;虚拟ip所在的主机以保证可用性(有些人叫IP漂移);</li><li>整个集群始终对外提供一个唯一的,可用的虚拟IP 来提供访问;</li><li>监测每个主机postgresql数据库的状态, 以即使切换数据库的主备角色;</li></ul></li><li>某一台主机直接宕机; <ul><li>当pgpool-ii监测主机挂掉之后, 需要进行数据库角色的切换和ip的切换两个操作(如果需要)</li></ul></li></ol><h2 id="方案结构" tabindex="-1">方案结构: <a class="header-anchor" href="#方案结构" aria-label="Permalink to &quot;方案结构:&quot;">​</a></h2><p>基于<strong>两台装有postgresql数据库的服务器</strong>，通过每台机器上的pgpool-ii程序来<strong>维护一个高可用体系</strong>, 从而保证能<code>始终提供一个可用的IP地址</code>,用于<code>外界数据操作或者访问</code>.</p><table><thead><tr><th style="text-align:center;">发行版</th><th style="text-align:center;">ip</th><th style="text-align:center;">hostname</th><th>补充说明</th></tr></thead><tbody><tr><td style="text-align:center;">Cent OS8</td><td style="text-align:center;">192.168.122.234</td><td style="text-align:center;">master</td><td>安装<code>postgresql 12.1</code> + <code>pgpool-ii 4.1</code>并进行配置</td></tr><tr><td style="text-align:center;">Cent OS8</td><td style="text-align:center;">192.168.122.235</td><td style="text-align:center;">slave</td><td>安装<code>postgresql 12.1</code> + <code>pgpool-ii 4.1</code>并进行配置</td></tr><tr><td style="text-align:center;">Cent OS8</td><td style="text-align:center;">192.168.122.236</td><td style="text-align:center;">vip</td><td>virtual ip, 通过一个虚拟的IP统一对外提供访问</td></tr></tbody></table><ul><li>2(n)台主机均安装有<code>postgresql 12</code> 版本的数据库和<code>pgpool-ii 4.1</code> 版本的中间件;</li><li>2(n)个数据库之间可以做到数据同步以(通过流复制来实现, 但同一时刻<strong>主机primary</strong>只有一台,其余作为<strong>备机standby</strong>)及<code>身份切换</code>;</li><li>pgpool-ii 是一个介于postgresql 服务器和postgresql数据库之间的中间件, 提供了<code>链接池(Connection Pooling)</code>,<code>看门狗(WatchDog)</code>,<code>复制</code>,<code>负载均衡</code>,<code>缓存</code>等功能(具体的可以查看官方文档);</li><li>通过pgpool-ii 维护的虚拟ip, 向外界提供一个始终可用的访问地址, 屏蔽掉具体的<code>主机数据库</code>地址概念;</li><li>通过pgpool-ii 程序来自动处理宕机后相关方案(后面有讲)</li><li>数据库down之后需要通过<code>pcp_attach_node</code>将节点加入集群</li></ul><p>流复制数据同步: 通过postgresql数据库配置来实现</p><p>虚拟ip自动切换: 通过pgpool-ii 配置实现</p><p>数据库主备角色切换: 通过pgpool-ii 监测机 + 执行 postgresql 中的<code>promote</code>命令来实现</p><h1 id="_3-安装" tabindex="-1">3.安装 <a class="header-anchor" href="#_3-安装" aria-label="Permalink to &quot;3.安装&quot;">​</a></h1><h2 id="_3-1离线rpm安装" tabindex="-1">3.1离线rpm安装 <a class="header-anchor" href="#_3-1离线rpm安装" aria-label="Permalink to &quot;3.1离线rpm安装&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># ftp下载rpm离线包</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-contrib-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-libs-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-server-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#contrib 是安装扩展的 没有这个包就没有 ossp-uuid的插件</span></span>
<span class="line"><span style="color:#6A737D;">#server 是数据库的安装文件</span></span>
<span class="line"><span style="color:#6A737D;">#libs 用来客户端进行连接. </span></span>
<span class="line"><span style="color:#6A737D;">#注意 如果是centos8 的话,修改为 rhel-8 进行下载就可以</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 上传文件到服务器之后, 执行安装命令</span></span>
<span class="line"><span style="color:#B392F0;">rpm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ivh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgresql</span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># ftp下载rpm离线包</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-contrib-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-libs-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://yum.postgresql.org/12/redhat/rhel-7-x86_64/postgresql12-server-12.3-1PGDG.rhel7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#contrib 是安装扩展的 没有这个包就没有 ossp-uuid的插件</span></span>
<span class="line"><span style="color:#6A737D;">#server 是数据库的安装文件</span></span>
<span class="line"><span style="color:#6A737D;">#libs 用来客户端进行连接. </span></span>
<span class="line"><span style="color:#6A737D;">#注意 如果是centos8 的话,修改为 rhel-8 进行下载就可以</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 上传文件到服务器之后, 执行安装命令</span></span>
<span class="line"><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ivh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgresql</span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.rpm</span></span></code></pre></div><h2 id="_3-2流复制" tabindex="-1">3.2流复制 <a class="header-anchor" href="#_3-2流复制" aria-label="Permalink to &quot;3.2流复制&quot;">​</a></h2><p>。。。省略</p><h1 id="_4-pgpoll安装" tabindex="-1">4.pgpoll安装 <a class="header-anchor" href="#_4-pgpoll安装" aria-label="Permalink to &quot;4.pgpoll安装&quot;">​</a></h1><h3 id="_4-1pgpool-ii-4-1-安装-2台机器均安装" tabindex="-1">4.1pgpool-ii 4.1 安装(2台机器均安装) <a class="header-anchor" href="#_4-1pgpool-ii-4-1-安装-2台机器均安装" aria-label="Permalink to &quot;4.1pgpool-ii 4.1 安装(2台机器均安装)&quot;">​</a></h3><p>ftp 文件服务器地址中: <a href="https://www.pgpool.net/yum/rpms/%604.1%60/redhat/rhel-7-x86_64/" target="_blank" rel="noreferrer">https://www.pgpool.net/yum/rpms/\`4.1\`/redhat/rhel-7-x86_64/</a> 中间的版本号可以可以更改, 但后续pg版本也需要对应上</p><h3 id="_4-2yum-在线安装" tabindex="-1">4.2yum 在线安装 <a class="header-anchor" href="#_4-2yum-在线安装" aria-label="Permalink to &quot;4.2yum 在线安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#设置rpm源</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-release-4.1-2.noarch.rpm</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#B392F0;">rpm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-ivh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pgpool-II-release-4.1-2.noarch.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装(关于对应的 postgresql 版本,体现在文件名中的 pgXX 这里)</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pgpool-II-pg12</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pgpool-II-pg12-debuginfo</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pgpool-II-pg12-devel</span></span>
<span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-y</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pgpool-II-pg12-extensions</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#设置rpm源</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;">  </span><span style="color:#032F62;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-release-4.1-2.noarch.rpm</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#6F42C1;">rpm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-ivh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pgpool-II-release-4.1-2.noarch.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#安装(关于对应的 postgresql 版本,体现在文件名中的 pgXX 这里)</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pgpool-II-pg12</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pgpool-II-pg12-debuginfo</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pgpool-II-pg12-devel</span></span>
<span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-y</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pgpool-II-pg12-extensions</span></span></code></pre></div><h3 id="_4-3rpm离线安装" tabindex="-1">4.3<code>rpm</code>离线安装 <a class="header-anchor" href="#_4-3rpm离线安装" aria-label="Permalink to &quot;4.3\`rpm\`离线安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># ftp下载rpm离线包</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-debuginfo-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-devel-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-extensions-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># ftp下载rpm离线包</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-debuginfo-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-devel-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://www.pgpool.net/yum/rpms/4.1/redhat/rhel-7-x86_64/pgpool-II-pg12-extensions-4.1.2-1pgdg.rhel7.x86_64.rpm</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 上传文件到服务器之后, 执行安装命令</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y libmemcached libpq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -ivh pgpool*.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 上传文件到服务器之后, 执行安装命令</span></span>
<span class="line"><span style="color:#24292e;">yum install -y libmemcached libpq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rpm -ivh pgpool*.rpm</span></span></code></pre></div><p>补充: <strong>源码编译</strong>安装参照官方指定文档：<a href="https://www.pgpool.net/docs/pgpool-II-4.1.2/en/html/installation.html" target="_blank" rel="noreferrer">https://www.pgpool.net/docs/pgpool-II-4.1.2/en/html/installation.html</a> 补充: <a href="https://www.pgpool.net/docs/pgpool-II-3.2.1/tutorial-zh_cn.html#install" target="_blank" rel="noreferrer">旧版中文文档</a></p><h4 id="目录-相关命令授权" tabindex="-1">目录/相关命令授权 <a class="header-anchor" href="#目录-相关命令授权" aria-label="Permalink to &quot;目录/相关命令授权&quot;">​</a></h4><p>因为pgpool-ii 配置中会以 postgres 用户执行一些系统权限命令, 需要使用设置普通用户授权:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s1 centos8]#chmod u+x /usr/sbin/ip</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@k8s1 centos8]#chmod u+s /usr/sbin/arping</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@k8s1 centos8]#chmod u+s /sbin/ip</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@k8s1 centos8]#chmod u+s /sbin/ifconfig</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s1 centos8]#chmod u+x /usr/sbin/ip</span></span>
<span class="line"><span style="color:#24292e;">[root@k8s1 centos8]#chmod u+s /usr/sbin/arping</span></span>
<span class="line"><span style="color:#24292e;">[root@k8s1 centos8]#chmod u+s /sbin/ip</span></span>
<span class="line"><span style="color:#24292e;">[root@k8s1 centos8]#chmod u+s /sbin/ifconfig</span></span></code></pre></div><p>配置中相关的日志目录,pid 目录权限:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">chown ptgres.ptgres /var/run/pgpool</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /var/log/pgpool/</span></span>
<span class="line"><span style="color:#e1e4e8;">touch /var/log/pgpool/pgpool_status</span></span>
<span class="line"><span style="color:#e1e4e8;">chown -R ptgres.ptgres /var/log/pgpool/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[ptgres@k8s2 ~]$ mkdir /var/run/postgresql</span></span>
<span class="line"><span style="color:#e1e4e8;">[ptgres@k8s2 ~]$ sudo chown ptgres /var/run/postgresql</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">chown ptgres.ptgres /var/run/pgpool</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /var/log/pgpool/</span></span>
<span class="line"><span style="color:#24292e;">touch /var/log/pgpool/pgpool_status</span></span>
<span class="line"><span style="color:#24292e;">chown -R ptgres.ptgres /var/log/pgpool/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[ptgres@k8s2 ~]$ mkdir /var/run/postgresql</span></span>
<span class="line"><span style="color:#24292e;">[ptgres@k8s2 ~]$ sudo chown ptgres /var/run/postgresql</span></span></code></pre></div><h3 id="_4-4pgpool-ii-相关配置-etc-pgpool-ii" tabindex="-1">4.4pgpool-ii 相关配置(/etc/pgpool-II/) <a class="header-anchor" href="#_4-4pgpool-ii-相关配置-etc-pgpool-ii" aria-label="Permalink to &quot;4.4pgpool-ii 相关配置(/etc/pgpool-II/)&quot;">​</a></h3><h4 id="pool-hba-conf主备相同" tabindex="-1"><code>pool_hba.conf</code>主备相同 <a class="header-anchor" href="#pool-hba-conf主备相同" aria-label="Permalink to &quot;\`pool_hba.conf\`主备相同&quot;">​</a></h4><p><code>pool_hba.conf</code> 是配置用户链接时的验证策略, 和<code>postgresql</code>的<code>pg_hba.conf</code>保持一致，要么都是<code>trust</code>，要么都是<code>md5</code>验证方式，这里采用了md5验证方式如下设置:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">] su - ptgres</span></span>
<span class="line"><span style="color:#B392F0;">-bash-4.2$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/pgpool-II/</span></span>
<span class="line"><span style="color:#B392F0;">-bash-4.2$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pool_hba.conf</span></span>
<span class="line"><span style="color:#6A737D;">#编辑内容如下(这里和postgressql设置一样, trust/md5保持一致)</span></span>
<span class="line"><span style="color:#6A737D;"># IPv4 local connections:</span></span>
<span class="line"><span style="color:#B392F0;">host</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">0.0</span><span style="color:#9ECBFF;">.0.0/0</span><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">md5</span></span>
<span class="line"><span style="color:#B392F0;">host</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">0</span><span style="color:#9ECBFF;">/0</span><span style="color:#E1E4E8;">                 </span><span style="color:#9ECBFF;">md5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">] su - ptgres</span></span>
<span class="line"><span style="color:#6F42C1;">-bash-4.2$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/pgpool-II/</span></span>
<span class="line"><span style="color:#6F42C1;">-bash-4.2$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pool_hba.conf</span></span>
<span class="line"><span style="color:#6A737D;">#编辑内容如下(这里和postgressql设置一样, trust/md5保持一致)</span></span>
<span class="line"><span style="color:#6A737D;"># IPv4 local connections:</span></span>
<span class="line"><span style="color:#6F42C1;">host</span><span style="color:#24292E;">    </span><span style="color:#032F62;">all</span><span style="color:#24292E;">         </span><span style="color:#032F62;">all</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">0.0</span><span style="color:#032F62;">.0.0/0</span><span style="color:#24292E;">          </span><span style="color:#032F62;">md5</span></span>
<span class="line"><span style="color:#6F42C1;">host</span><span style="color:#24292E;">    </span><span style="color:#032F62;">all</span><span style="color:#24292E;">         </span><span style="color:#032F62;">all</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">0</span><span style="color:#032F62;">/0</span><span style="color:#24292E;">                 </span><span style="color:#032F62;">md5</span></span></code></pre></div><h4 id="pcp-conf-pool-passwd-主备相同" tabindex="-1"><code>pcp.conf</code> / pool_passwd (主备相同) <a class="header-anchor" href="#pcp-conf-pool-passwd-主备相同" aria-label="Permalink to &quot;\`pcp.conf\` / pool_passwd (主备相同)&quot;">​</a></h4><p>这个文件是pgpool管理器自己的用户名和密码，用于管理集群的.</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">-bash-4.2$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pg_md5</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"><span style="color:#B392F0;">e8a48653851e28c69d0506508fb27fc5</span></span>
<span class="line"><span style="color:#B392F0;">-bash-4.2$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pcp.conf</span></span>
<span class="line"><span style="color:#6A737D;">#编辑内容如下:</span></span>
<span class="line"><span style="color:#6A737D;"># USERID:MD5PASSWD</span></span>
<span class="line"><span style="color:#B392F0;">postgres:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">e8a48653851e28c69d0506508fb27fc5</span></span>
<span class="line"><span style="color:#6A737D;">#在pgpool中添加pg数据库的用户名和密码</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@etc~]$ pg_md5 -p -m -u postgres pool_passwd</span></span>
<span class="line"><span style="color:#6A737D;">#数据库登录用户是postgres,这里输入登录密码，不能出错</span></span>
<span class="line"><span style="color:#6A737D;">#输入密码后，在/etc/pgpoll-II目录下会生成一个pool_passwd文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">-bash-4.2$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pg_md5</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgres</span></span>
<span class="line"><span style="color:#6F42C1;">e8a48653851e28c69d0506508fb27fc5</span></span>
<span class="line"><span style="color:#6F42C1;">-bash-4.2$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pcp.conf</span></span>
<span class="line"><span style="color:#6A737D;">#编辑内容如下:</span></span>
<span class="line"><span style="color:#6A737D;"># USERID:MD5PASSWD</span></span>
<span class="line"><span style="color:#6F42C1;">postgres:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">e8a48653851e28c69d0506508fb27fc5</span></span>
<span class="line"><span style="color:#6A737D;">#在pgpool中添加pg数据库的用户名和密码</span></span>
<span class="line"><span style="color:#24292E;">[postgres@etc~]$ pg_md5 -p -m -u postgres pool_passwd</span></span>
<span class="line"><span style="color:#6A737D;">#数据库登录用户是postgres,这里输入登录密码，不能出错</span></span>
<span class="line"><span style="color:#6A737D;">#输入密码后，在/etc/pgpoll-II目录下会生成一个pool_passwd文件</span></span></code></pre></div><h4 id="pgpool-conf" tabindex="-1"><code>pgpool.conf</code> <a class="header-anchor" href="#pgpool-conf" aria-label="Permalink to &quot;\`pgpool.conf\`&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">failover.sh                (数据库故障切换脚本)</span></span>
<span class="line"><span style="color:#e1e4e8;">pcp.conf                   (用户访问验证策略trust/md5)</span></span>
<span class="line"><span style="color:#e1e4e8;">pgpool.conf                (pgpool-ii 主配置文件)</span></span>
<span class="line"><span style="color:#e1e4e8;">pool_hba.conf              (集群节点密码管理)</span></span>
<span class="line"><span style="color:#e1e4e8;">pool_passwd                (数据库密码管理文件)</span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_1st_stage.sample  (在线故障恢复的脚本示例, 放到postgresql数据目录/var/lib/pgsql/12/data 下)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">failover.sh                (数据库故障切换脚本)</span></span>
<span class="line"><span style="color:#24292e;">pcp.conf                   (用户访问验证策略trust/md5)</span></span>
<span class="line"><span style="color:#24292e;">pgpool.conf                (pgpool-ii 主配置文件)</span></span>
<span class="line"><span style="color:#24292e;">pool_hba.conf              (集群节点密码管理)</span></span>
<span class="line"><span style="color:#24292e;">pool_passwd                (数据库密码管理文件)</span></span>
<span class="line"><span style="color:#24292e;">recovery_1st_stage.sample  (在线故障恢复的脚本示例, 放到postgresql数据目录/var/lib/pgsql/12/data 下)</span></span></code></pre></div><ol><li>数据库故障转移(故障后处理)</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 数据库运行状况检查，以便Pgpool-II执行故障转移: 数据库的主备切换</span></span>
<span class="line"><span style="color:#e1e4e8;">health_check_period = 10                    # Health check period, Disabled (0) by default</span></span>
<span class="line"><span style="color:#e1e4e8;">health_check_timeout = 20                   # 健康检查的超时时间,0 永不超时</span></span>
<span class="line"><span style="color:#e1e4e8;">health_check_user = &#39;postgres&#39;              # 健康检查的用户</span></span>
<span class="line"><span style="color:#e1e4e8;">health_check_password = &#39;postgres&#39;          # 健康检查的用户密码</span></span>
<span class="line"><span style="color:#e1e4e8;">health_check_database = &#39;postgres&#39;          # 健康检查的数据库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 故障后处理, 为了当postgresql数据库挂掉之后执行相应的策略</span></span>
<span class="line"><span style="color:#e1e4e8;"># 这个脚本时放在pgpool的目录下, 确切的说是由pgpool执行脚本来维护集群中数据库的状态</span></span>
<span class="line"><span style="color:#e1e4e8;">failover_command = &#39;/etc/pgpool-II/failover.sh %H %R &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># follow_master_command = &#39;&#39;                # 2台服务器不配置</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如果使用3台PostgreSQL服务器，则需要指定follow_master_command在主节点故障转移上的故障转移后运行。如果有两个PostgreSQL服务器，则无需follow_master_command设置。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 数据库运行状况检查，以便Pgpool-II执行故障转移: 数据库的主备切换</span></span>
<span class="line"><span style="color:#24292e;">health_check_period = 10                    # Health check period, Disabled (0) by default</span></span>
<span class="line"><span style="color:#24292e;">health_check_timeout = 20                   # 健康检查的超时时间,0 永不超时</span></span>
<span class="line"><span style="color:#24292e;">health_check_user = &#39;postgres&#39;              # 健康检查的用户</span></span>
<span class="line"><span style="color:#24292e;">health_check_password = &#39;postgres&#39;          # 健康检查的用户密码</span></span>
<span class="line"><span style="color:#24292e;">health_check_database = &#39;postgres&#39;          # 健康检查的数据库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 故障后处理, 为了当postgresql数据库挂掉之后执行相应的策略</span></span>
<span class="line"><span style="color:#24292e;"># 这个脚本时放在pgpool的目录下, 确切的说是由pgpool执行脚本来维护集群中数据库的状态</span></span>
<span class="line"><span style="color:#24292e;">failover_command = &#39;/etc/pgpool-II/failover.sh %H %R &#39;</span></span>
<span class="line"><span style="color:#24292e;"># follow_master_command = &#39;&#39;                # 2台服务器不配置</span></span>
<span class="line"><span style="color:#24292e;"># 如果使用3台PostgreSQL服务器，则需要指定follow_master_command在主节点故障转移上的故障转移后运行。如果有两个PostgreSQL服务器，则无需follow_master_command设置。</span></span></code></pre></div><p>配置文件中传入的相应参数请参照: <a href="https://www.pgpool.net/docs/pgpool-II-4.1.2/en/html/runtime-config-failover.html#GUC-FAILOVER-COMMAND" target="_blank" rel="noreferrer">config-failover-params</a></p><p><strong>Table 5-6. failover command options</strong></p><table><thead><tr><th>Special character</th><th>Description</th></tr></thead><tbody><tr><td>%d</td><td>DB node ID of the detached node</td></tr><tr><td>%h</td><td>Hostname of the detached node</td></tr><tr><td>%p</td><td>Port number of the detached node</td></tr><tr><td>%D</td><td>Database cluster directory of the detached node</td></tr><tr><td>%M</td><td>Old master node ID</td></tr><tr><td>%m</td><td>New master node ID</td></tr><tr><td>%H</td><td>Hostname of the new master node</td></tr><tr><td>%P</td><td>Old primary node ID</td></tr><tr><td>%r</td><td>Port number of the new master node</td></tr><tr><td>%R</td><td>Database cluster directory of the new master node</td></tr><tr><td>%N</td><td>Hostname of the old primary node (Pgpool-II 4.1 or after)</td></tr><tr><td>%S</td><td>Port number of the old primary node (Pgpool-II 4.1 or after)</td></tr><tr><td>%%</td><td>&#39;%&#39; character</td></tr></tbody></table><p>​ 2.watchdog</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">use_watchdog = on                           # 激活看门狗配置</span></span>
<span class="line"><span style="color:#e1e4e8;">wd_hostname = &#39;master&#39;                      # 当前主机(也可使用IP)</span></span>
<span class="line"><span style="color:#e1e4e8;">wd_port = 9000                              # 工作端口</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 虚拟IP指定</span></span>
<span class="line"><span style="color:#e1e4e8;">delegate_IP = &#39;10.242.111.203&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">if_cmd_path = &#39;/sbin&#39;                       # 如果if_up_cmd, if_down_cmd 以/开头, 忽略此配置</span></span>
<span class="line"><span style="color:#e1e4e8;"># 命令中的\`ens160\` 请根据自己机器上ip addr 实际的网卡名称进行修改</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当前节点启动指定虚拟IP的命令</span></span>
<span class="line"><span style="color:#e1e4e8;">if_up_cmd = &#39;/usr/bin/sudo /sbin/ip addr add $_IP_$/24 dev ens160 label ens160:0&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当前节点指定关闭虚拟IP的命令</span></span>
<span class="line"><span style="color:#e1e4e8;">if_down_cmd = &#39;/usr/bin/sudo /sbin/ip addr del $_IP_$/24 dev ens160&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># watchdog 健康检查</span></span>
<span class="line"><span style="color:#e1e4e8;">wd_heartbeat_port = 9694                    # 健康检查端口</span></span>
<span class="line"><span style="color:#e1e4e8;">wd_heartbeat_keepalive = 2</span></span>
<span class="line"><span style="color:#e1e4e8;">wd_heartbeat_deadtime = 30</span></span>
<span class="line"><span style="color:#e1e4e8;"># 其他机器地址配置(多台请增加配置)</span></span>
<span class="line"><span style="color:#e1e4e8;">heartbeat_destination0 = &#39;slave&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">heartbeat_destination_port0 = 9694</span></span>
<span class="line"><span style="color:#e1e4e8;">heartbeat_device0 = &#39;ens160&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 其他pgpgool节点链接信息(多台请增加配置)</span></span>
<span class="line"><span style="color:#e1e4e8;">other_pgpool_hostname0 = &#39;slave&#39;            # 其他节点地址</span></span>
<span class="line"><span style="color:#e1e4e8;">other_pgpool_port0 = 9999</span></span>
<span class="line"><span style="color:#e1e4e8;">other_wd_port0 = 9000                       # 其他节点watchdof 端口</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># watchdog 发生故障后, 处理的相关配置(宕机, pgpool进程终止)</span></span>
<span class="line"><span style="color:#e1e4e8;"># 当某个节点故障后, </span></span>
<span class="line"><span style="color:#e1e4e8;">failover_when_quorum_exists = on</span></span>
<span class="line"><span style="color:#e1e4e8;">failover_require_consensus = on</span></span>
<span class="line"><span style="color:#e1e4e8;">allow_multiple_failover_requests_from_node = on</span></span>
<span class="line"><span style="color:#e1e4e8;">enable_consensus_with_half_votes = on</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">use_watchdog = on                           # 激活看门狗配置</span></span>
<span class="line"><span style="color:#24292e;">wd_hostname = &#39;master&#39;                      # 当前主机(也可使用IP)</span></span>
<span class="line"><span style="color:#24292e;">wd_port = 9000                              # 工作端口</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 虚拟IP指定</span></span>
<span class="line"><span style="color:#24292e;">delegate_IP = &#39;10.242.111.203&#39;</span></span>
<span class="line"><span style="color:#24292e;">if_cmd_path = &#39;/sbin&#39;                       # 如果if_up_cmd, if_down_cmd 以/开头, 忽略此配置</span></span>
<span class="line"><span style="color:#24292e;"># 命令中的\`ens160\` 请根据自己机器上ip addr 实际的网卡名称进行修改</span></span>
<span class="line"><span style="color:#24292e;"># 当前节点启动指定虚拟IP的命令</span></span>
<span class="line"><span style="color:#24292e;">if_up_cmd = &#39;/usr/bin/sudo /sbin/ip addr add $_IP_$/24 dev ens160 label ens160:0&#39;</span></span>
<span class="line"><span style="color:#24292e;"># 当前节点指定关闭虚拟IP的命令</span></span>
<span class="line"><span style="color:#24292e;">if_down_cmd = &#39;/usr/bin/sudo /sbin/ip addr del $_IP_$/24 dev ens160&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># watchdog 健康检查</span></span>
<span class="line"><span style="color:#24292e;">wd_heartbeat_port = 9694                    # 健康检查端口</span></span>
<span class="line"><span style="color:#24292e;">wd_heartbeat_keepalive = 2</span></span>
<span class="line"><span style="color:#24292e;">wd_heartbeat_deadtime = 30</span></span>
<span class="line"><span style="color:#24292e;"># 其他机器地址配置(多台请增加配置)</span></span>
<span class="line"><span style="color:#24292e;">heartbeat_destination0 = &#39;slave&#39;</span></span>
<span class="line"><span style="color:#24292e;">heartbeat_destination_port0 = 9694</span></span>
<span class="line"><span style="color:#24292e;">heartbeat_device0 = &#39;ens160&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 其他pgpgool节点链接信息(多台请增加配置)</span></span>
<span class="line"><span style="color:#24292e;">other_pgpool_hostname0 = &#39;slave&#39;            # 其他节点地址</span></span>
<span class="line"><span style="color:#24292e;">other_pgpool_port0 = 9999</span></span>
<span class="line"><span style="color:#24292e;">other_wd_port0 = 9000                       # 其他节点watchdof 端口</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># watchdog 发生故障后, 处理的相关配置(宕机, pgpool进程终止)</span></span>
<span class="line"><span style="color:#24292e;"># 当某个节点故障后, </span></span>
<span class="line"><span style="color:#24292e;">failover_when_quorum_exists = on</span></span>
<span class="line"><span style="color:#24292e;">failover_require_consensus = on</span></span>
<span class="line"><span style="color:#24292e;">allow_multiple_failover_requests_from_node = on</span></span>
<span class="line"><span style="color:#24292e;">enable_consensus_with_half_votes = on</span></span></code></pre></div><ul><li><p>关于watchdog本身(pgpool-ii)发生故障后相关的处理策略, 请务必阅读官方文档: <a href="https://www.pgpool.net/docs/pgpool-II-4.1.2/en/html/runtime-watchdog-config.html#CONFIG-WATCHDOG-FAILOVER-BEHAVIOR" target="_blank" rel="noreferrer">CONFIG-WATCHDOG-FAILOVER-BEHAVIOR</a></p></li><li><p>watchdog本身(pgpool-ii节点)本身故障后, 如果配置打开, 其他节点会执行仲裁, 如仲裁从节点中那一个成为主节点, 那一台阶段虚拟IP等, 这个仲裁本身有投票机制, 和无视仲裁结果等配置;</p></li><li><p>如果不配置, 主pgpool-i 节点关闭后, 可能不会转移虚拟IP, 出现集群暂时不可访问;</p><p>3.关于在线恢复(master 恢复后自动变为备库)</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 此配置将在多个pgpool-ii 节点时无效</span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_user = &#39;postgres&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_password = &#39;postgres&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">recovery_1st_stage_command = &#39;recovery_1st_stage&#39;   # 这个脚本时放在postgresql数据目录下的</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 此配置将在多个pgpool-ii 节点时无效</span></span>
<span class="line"><span style="color:#24292e;">recovery_user = &#39;postgres&#39;</span></span>
<span class="line"><span style="color:#24292e;">recovery_password = &#39;postgres&#39;</span></span>
<span class="line"><span style="color:#24292e;">recovery_1st_stage_command = &#39;recovery_1st_stage&#39;   # 这个脚本时放在postgresql数据目录下的</span></span></code></pre></div><ul><li>如果有多个pgpool-ii 节点共同维护集群状态, 此配置将不可用, 需要手动恢复同步数据&gt;加入集群</li></ul><p><strong>备库pgpool-ii 节点</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 将主库的配置文件拷贝过来</span></span>
<span class="line"><span style="color:#e1e4e8;">scp master:/etc/pgpool-II/pool.conf /etc/pgpool-II/pool.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改以下几项即可</span></span>
<span class="line"><span style="color:#e1e4e8;">wd_hostname = &#39;slave&#39;               # 当前机器</span></span>
<span class="line"><span style="color:#e1e4e8;">heartbeat_destination0 = &#39;master&#39;   # 其他pg库机器</span></span>
<span class="line"><span style="color:#e1e4e8;">other_pgpool_hostname0 = &#39;master&#39;   # 其他pgpool节点机器</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 将主库的配置文件拷贝过来</span></span>
<span class="line"><span style="color:#24292e;">scp master:/etc/pgpool-II/pool.conf /etc/pgpool-II/pool.conf</span></span>
<span class="line"><span style="color:#24292e;"># 修改以下几项即可</span></span>
<span class="line"><span style="color:#24292e;">wd_hostname = &#39;slave&#39;               # 当前机器</span></span>
<span class="line"><span style="color:#24292e;">heartbeat_destination0 = &#39;master&#39;   # 其他pg库机器</span></span>
<span class="line"><span style="color:#24292e;">other_pgpool_hostname0 = &#39;master&#39;   # 其他pgpool节点机器</span></span></code></pre></div><h1 id="_5-效果" tabindex="-1">5.效果 <a class="header-anchor" href="#_5-效果" aria-label="Permalink to &quot;5.效果&quot;">​</a></h1><p>[root@k8s1 ~]# psql -h 192.168.122.199 -p 9999 -U postgres</p><p><img src="`+o+`" alt=""></p><h2 id="master日志" tabindex="-1">master日志 <a class="header-anchor" href="#master日志" aria-label="Permalink to &quot;master日志&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ptgres@k8s1 pgpool-II]$ pgpool -n -D</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8179: LOG:  Backend status file /var/log/pgpool/pgpool_status discarded</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8179: LOG:  memory cache initialized</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8179: DETAIL:  memcache blocks :64</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8179: LOG:  pool_discard_oid_maps: discarded memqcache oid maps</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8179: LOG:  waiting for watchdog to initialize</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8181: LOG:  setting the local watchdog node name to &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog cluster is configured with 2 remote nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog remote node:0 on slave:9000</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog remote node:1 on slave01:9000</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8181: LOG:  interface monitoring is disabled in watchdog</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog node state changed from [DEAD] to [LOADING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:44: pid 8181: LOG:  watchdog node state changed from [LOADING] to [JOINING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:48: pid 8181: LOG:  watchdog node state changed from [JOINING] to [INITIALIZING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:49: pid 8181: LOG:  I am the only alive node in the watchdog cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:49: pid 8181: HINT:  skipping stand for coordinator state</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:49: pid 8181: LOG:  watchdog node state changed from [INITIALIZING] to [MASTER]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:49: pid 8181: LOG:  I am announcing my self as master/coordinator watchdog node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8181: LOG:  I am the cluster leader node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8181: DETAIL:  our declare coordinator message is accepted by all nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8181: LOG:  setting the local node &quot;master:9999 Linux k8s1&quot; as watchdog cluster master</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8181: LOG:  I am the cluster leader node but we do not have enough nodes in cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8181: DETAIL:  waiting for the quorum to start escalation process</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  watchdog process is initialized</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: DETAIL:  watchdog messaging data version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8190: LOG:  3 watchdog nodes are configured for lifecheck</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8190: LOG:  watchdog nodes ID:0 Name:&quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8190: DETAIL:  Host:&quot;master&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8190: LOG:  watchdog nodes ID:1 Name:&quot;Not_Set&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8190: DETAIL:  Host:&quot;slave&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8190: LOG:  watchdog nodes ID:2 Name:&quot;Not_Set&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8190: DETAIL:  Host:&quot;slave01&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  Setting up socket for 0.0.0.0:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  Setting up socket for :::9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node_repeatedly: waiting for finding a primary node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node: primary node is 0</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node: standby node is 1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node: standby node is 2</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8228: LOG:  PCP process: 8228 started</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  pgpool-II successfully started. version 4.1.2 (karasukiboshi)</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  node status[0]: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  node status[1]: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:53: pid 8179: LOG:  node status[2]: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8194: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8194: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8194: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8194: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8194: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8192: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8192: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8192: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8192: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8192: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8196: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8196: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8196: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8196: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8196: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8191: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8191: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8191: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8191: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:48:54: pid 8191: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 8181: LOG:  new watchdog node connection is received from &quot;192.168.122.14:26773&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 8181: LOG:  new node joined the cluster hostname:&quot;slave01&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 8181: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 8181: LOG:  new outbound connection to slave01:9000 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8181: LOG:  adding watchdog node &quot;slave01:9999 Linux k8s3&quot; to the standby list</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8181: LOG:  quorum found</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8181: DETAIL:  starting escalation process</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8181: LOG:  escalation process started with PID:8268</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8179: LOG:  Pgpool-II parent process received watchdog quorum change signal from watchdog</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8268: LOG:  watchdog: escalation started</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8179: LOG:  watchdog cluster now holds the quorum</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8179: DETAIL:  updating the state of quarantine backend nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:13: pid 8268: LOG:  successfully acquired the delegate IP:&quot;192.168.122.199&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:13: pid 8268: DETAIL:  &#39;if_up_cmd&#39; returned with success</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:13: pid 8181: LOG:  watchdog escalation process with pid: 8268 exit with SUCCESS.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:15: pid 8181: LOG:  remote node &quot;slave01:9999 Linux k8s3&quot; is replying again after missing 1 beacons</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ptgres@k8s1 pgpool-II]$ pgpool -n -D</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8179: LOG:  Backend status file /var/log/pgpool/pgpool_status discarded</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8179: LOG:  memory cache initialized</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8179: DETAIL:  memcache blocks :64</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8179: LOG:  pool_discard_oid_maps: discarded memqcache oid maps</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8179: LOG:  waiting for watchdog to initialize</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8181: LOG:  setting the local watchdog node name to &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog cluster is configured with 2 remote nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog remote node:0 on slave:9000</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog remote node:1 on slave01:9000</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8181: LOG:  interface monitoring is disabled in watchdog</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:39: pid 8181: LOG:  watchdog node state changed from [DEAD] to [LOADING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:44: pid 8181: LOG:  watchdog node state changed from [LOADING] to [JOINING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:48: pid 8181: LOG:  watchdog node state changed from [JOINING] to [INITIALIZING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:49: pid 8181: LOG:  I am the only alive node in the watchdog cluster</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:49: pid 8181: HINT:  skipping stand for coordinator state</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:49: pid 8181: LOG:  watchdog node state changed from [INITIALIZING] to [MASTER]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:49: pid 8181: LOG:  I am announcing my self as master/coordinator watchdog node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8181: LOG:  I am the cluster leader node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8181: DETAIL:  our declare coordinator message is accepted by all nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8181: LOG:  setting the local node &quot;master:9999 Linux k8s1&quot; as watchdog cluster master</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8181: LOG:  I am the cluster leader node but we do not have enough nodes in cluster</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8181: DETAIL:  waiting for the quorum to start escalation process</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  watchdog process is initialized</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: DETAIL:  watchdog messaging data version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8190: LOG:  3 watchdog nodes are configured for lifecheck</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8190: LOG:  watchdog nodes ID:0 Name:&quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8190: DETAIL:  Host:&quot;master&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8190: LOG:  watchdog nodes ID:1 Name:&quot;Not_Set&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8190: DETAIL:  Host:&quot;slave&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8190: LOG:  watchdog nodes ID:2 Name:&quot;Not_Set&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8190: DETAIL:  Host:&quot;slave01&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  Setting up socket for 0.0.0.0:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  Setting up socket for :::9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node_repeatedly: waiting for finding a primary node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node: primary node is 0</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node: standby node is 1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  find_primary_node: standby node is 2</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8228: LOG:  PCP process: 8228 started</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  pgpool-II successfully started. version 4.1.2 (karasukiboshi)</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  node status[0]: 1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  node status[1]: 2</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:53: pid 8179: LOG:  node status[2]: 2</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8194: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8194: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8194: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8194: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8194: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8192: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8192: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8192: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8192: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8192: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8196: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8196: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8196: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8196: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8196: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8191: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8191: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8191: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8191: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:48:54: pid 8191: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 8181: LOG:  new watchdog node connection is received from &quot;192.168.122.14:26773&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 8181: LOG:  new node joined the cluster hostname:&quot;slave01&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 8181: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 8181: LOG:  new outbound connection to slave01:9000 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8181: LOG:  adding watchdog node &quot;slave01:9999 Linux k8s3&quot; to the standby list</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8181: LOG:  quorum found</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8181: DETAIL:  starting escalation process</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8181: LOG:  escalation process started with PID:8268</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8179: LOG:  Pgpool-II parent process received watchdog quorum change signal from watchdog</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8268: LOG:  watchdog: escalation started</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8179: LOG:  watchdog cluster now holds the quorum</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8179: DETAIL:  updating the state of quarantine backend nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 8181: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:13: pid 8268: LOG:  successfully acquired the delegate IP:&quot;192.168.122.199&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:13: pid 8268: DETAIL:  &#39;if_up_cmd&#39; returned with success</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:13: pid 8181: LOG:  watchdog escalation process with pid: 8268 exit with SUCCESS.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:15: pid 8181: LOG:  remote node &quot;slave01:9999 Linux k8s3&quot; is replying again after missing 1 beacons</span></span></code></pre></div><h2 id="slave日志" tabindex="-1">slave日志 <a class="header-anchor" href="#slave日志" aria-label="Permalink to &quot;slave日志&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ptgres@k8s3 ~]$ pgpool -n -D</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7827: LOG:  Backend status file /var/log/pgpool/pgpool_status discarded</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7827: LOG:  memory cache initialized</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7827: DETAIL:  memcache blocks :64</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7827: LOG:  pool_discard_oid_maps: discarded memqcache oid maps</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7827: LOG:  waiting for watchdog to initialize</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  setting the local watchdog node name to &quot;slave01:9999 Linux k8s3&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog cluster is configured with 2 remote nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog remote node:0 on master:9000</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog remote node:1 on slave:9000</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  interface monitoring is disabled in watchdog</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog node state changed from [DEAD] to [LOADING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  new outbound connection to master:9000 </span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  new watchdog node connection is received from &quot;192.168.122.251:53925&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: LOG:  new node joined the cluster hostname:&quot;master&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:03: pid 7829: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:08: pid 7829: LOG:  watchdog node state changed from [LOADING] to [JOINING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:08: pid 7829: LOG:  setting the remote node &quot;master:9999 Linux k8s1&quot; as watchdog cluster master</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:08: pid 7829: LOG:  watchdog node state changed from [JOINING] to [INITIALIZING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  watchdog node state changed from [INITIALIZING] to [STANDBY]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  successfully joined the watchdog cluster as standby node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: DETAIL:  our join coordinator request is accepted by cluster leader node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  watchdog process is initialized</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: DETAIL:  watchdog messaging data version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  Pgpool-II parent process received watchdog quorum change signal from watchdog</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  watchdog cluster now holds the quorum</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: DETAIL:  updating the state of quarantine backend nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  we have joined the watchdog cluster as STANDBY node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: DETAIL:  syncing the backend states from the MASTER watchdog node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  received the get data request from local pgpool-II on IPC interface</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  get data request from local pgpool-II node received on IPC interface is forwarded to master watchdog node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: DETAIL:  waiting for the reply...</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  master watchdog node &quot;master:9999 Linux k8s1&quot; returned status for 3 backend nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  Setting up socket for 0.0.0.0:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  Setting up socket for :::9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7833: LOG:  3 watchdog nodes are configured for lifecheck</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7833: LOG:  watchdog nodes ID:0 Name:&quot;slave01:9999 Linux k8s3&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7833: DETAIL:  Host:&quot;slave01&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7833: LOG:  watchdog nodes ID:1 Name:&quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7833: DETAIL:  Host:&quot;master&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7833: LOG:  watchdog nodes ID:2 Name:&quot;Not_Set&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7833: DETAIL:  Host:&quot;slave&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  pgpool-II successfully started. version 4.1.2 (karasukiboshi)</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  node status[0]: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  node status[1]: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7827: LOG:  node status[2]: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:09: pid 7866: LOG:  PCP process: 7866 started</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7874: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7874: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7874: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7874: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7874: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7872: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7872: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7872: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7872: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7872: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7871: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7871: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7871: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7871: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7871: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7873: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7873: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7873: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7873: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:50:10: pid 7873: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7829: LOG:  new watchdog node connection is received from &quot;192.168.122.249:5853&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7829: LOG:  new node joined the cluster hostname:&quot;slave&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7829: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7829: LOG:  new outbound connection to slave:9000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ptgres@k8s3 ~]$ pgpool -n -D</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7827: LOG:  Backend status file /var/log/pgpool/pgpool_status discarded</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7827: LOG:  memory cache initialized</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7827: DETAIL:  memcache blocks :64</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7827: LOG:  pool_discard_oid_maps: discarded memqcache oid maps</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7827: LOG:  waiting for watchdog to initialize</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  setting the local watchdog node name to &quot;slave01:9999 Linux k8s3&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog cluster is configured with 2 remote nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog remote node:0 on master:9000</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog remote node:1 on slave:9000</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  interface monitoring is disabled in watchdog</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  watchdog node state changed from [DEAD] to [LOADING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  new outbound connection to master:9000 </span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  new watchdog node connection is received from &quot;192.168.122.251:53925&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: LOG:  new node joined the cluster hostname:&quot;master&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:03: pid 7829: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:08: pid 7829: LOG:  watchdog node state changed from [LOADING] to [JOINING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:08: pid 7829: LOG:  setting the remote node &quot;master:9999 Linux k8s1&quot; as watchdog cluster master</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:08: pid 7829: LOG:  watchdog node state changed from [JOINING] to [INITIALIZING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  watchdog node state changed from [INITIALIZING] to [STANDBY]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  successfully joined the watchdog cluster as standby node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: DETAIL:  our join coordinator request is accepted by cluster leader node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  watchdog process is initialized</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: DETAIL:  watchdog messaging data version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  Pgpool-II parent process received watchdog quorum change signal from watchdog</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  watchdog cluster now holds the quorum</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: DETAIL:  updating the state of quarantine backend nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  we have joined the watchdog cluster as STANDBY node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: DETAIL:  syncing the backend states from the MASTER watchdog node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  received the get data request from local pgpool-II on IPC interface</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  get data request from local pgpool-II node received on IPC interface is forwarded to master watchdog node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: DETAIL:  waiting for the reply...</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7829: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  master watchdog node &quot;master:9999 Linux k8s1&quot; returned status for 3 backend nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  Setting up socket for 0.0.0.0:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  Setting up socket for :::9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7833: LOG:  3 watchdog nodes are configured for lifecheck</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7833: LOG:  watchdog nodes ID:0 Name:&quot;slave01:9999 Linux k8s3&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7833: DETAIL:  Host:&quot;slave01&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7833: LOG:  watchdog nodes ID:1 Name:&quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7833: DETAIL:  Host:&quot;master&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7833: LOG:  watchdog nodes ID:2 Name:&quot;Not_Set&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7833: DETAIL:  Host:&quot;slave&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  pgpool-II successfully started. version 4.1.2 (karasukiboshi)</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  node status[0]: 0</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  node status[1]: 0</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7827: LOG:  node status[2]: 0</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:09: pid 7866: LOG:  PCP process: 7866 started</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7874: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7874: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7874: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7874: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7874: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7872: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7872: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7872: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7872: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7872: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7871: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7871: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7871: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7871: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7871: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7873: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7873: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7873: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7873: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:50:10: pid 7873: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7829: LOG:  new watchdog node connection is received from &quot;192.168.122.249:5853&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7829: LOG:  new node joined the cluster hostname:&quot;slave&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7829: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7829: LOG:  new outbound connection to slave:9000</span></span></code></pre></div><h2 id="slave01日志" tabindex="-1">slave01日志 <a class="header-anchor" href="#slave01日志" aria-label="Permalink to &quot;slave01日志&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[ptgres@k8s2 ~]$ pgpool -n -D</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7992: LOG:  Backend status file /var/log/pgpool/pgpool_status discarded</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7992: LOG:  memory cache initialized</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7992: DETAIL:  memcache blocks :64</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7992: LOG:  pool_discard_oid_maps: discarded memqcache oid maps</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7992: LOG:  waiting for watchdog to initialize</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  setting the local watchdog node name to &quot;slave:9999 Linux k8s2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog cluster is configured with 2 remote nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog remote node:0 on master:9000</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog remote node:1 on slave01:9000</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  interface monitoring is disabled in watchdog</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog node state changed from [DEAD] to [LOADING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  new outbound connection to master:9000 </span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  new outbound connection to slave01:9000 </span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  new watchdog node connection is received from &quot;192.168.122.251:31360&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  new node joined the cluster hostname:&quot;master&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  new watchdog node connection is received from &quot;192.168.122.14:25824&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: LOG:  new node joined the cluster hostname:&quot;slave01&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:15: pid 7994: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:20: pid 7994: LOG:  watchdog node state changed from [LOADING] to [JOINING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:20: pid 7994: LOG:  setting the remote node &quot;master:9999 Linux k8s1&quot; as watchdog cluster master</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:20: pid 7994: LOG:  watchdog node state changed from [JOINING] to [INITIALIZING]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: LOG:  watchdog node state changed from [INITIALIZING] to [STANDBY]</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: LOG:  successfully joined the watchdog cluster as standby node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: DETAIL:  our join coordinator request is accepted by cluster leader node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  watchdog process is initialized</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: DETAIL:  watchdog messaging data version: 1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  we have joined the watchdog cluster as STANDBY node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: DETAIL:  syncing the backend states from the MASTER watchdog node</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: LOG:  received the get data request from local pgpool-II on IPC interface</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: LOG:  get data request from local pgpool-II node received on IPC interface is forwarded to master watchdog node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: DETAIL:  waiting for the reply...</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  master watchdog node &quot;master:9999 Linux k8s1&quot; returned status for 3 backend nodes</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  Setting up socket for 0.0.0.0:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  Setting up socket for :::9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7994: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7998: LOG:  3 watchdog nodes are configured for lifecheck</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7998: LOG:  watchdog nodes ID:0 Name:&quot;slave:9999 Linux k8s2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7998: DETAIL:  Host:&quot;slave&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7998: LOG:  watchdog nodes ID:1 Name:&quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7998: DETAIL:  Host:&quot;master&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7998: LOG:  watchdog nodes ID:2 Name:&quot;slave01:9999 Linux k8s3&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7998: DETAIL:  Host:&quot;slave01&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  pgpool-II successfully started. version 4.1.2 (karasukiboshi)</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  node status[0]: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  node status[1]: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 7992: LOG:  node status[2]: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:21: pid 8031: LOG:  PCP process: 8031 started</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8037: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8037: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8037: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8037: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8037: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8039: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8039: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8039: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8039: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8039: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8036: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8036: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8036: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8036: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8036: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8038: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8038: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8038: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8038: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:52:22: pid 8038: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#e1e4e8;">2021-07-05 01:54:01: pid 7998: LOG:  watchdog: lifecheck started</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[ptgres@k8s2 ~]$ pgpool -n -D</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7992: LOG:  Backend status file /var/log/pgpool/pgpool_status discarded</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7992: LOG:  memory cache initialized</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7992: DETAIL:  memcache blocks :64</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7992: LOG:  pool_discard_oid_maps: discarded memqcache oid maps</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7992: LOG:  waiting for watchdog to initialize</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  setting the local watchdog node name to &quot;slave:9999 Linux k8s2&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog cluster is configured with 2 remote nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog remote node:0 on master:9000</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog remote node:1 on slave01:9000</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  interface monitoring is disabled in watchdog</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  watchdog node state changed from [DEAD] to [LOADING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  new outbound connection to master:9000 </span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  new outbound connection to slave01:9000 </span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  new watchdog node connection is received from &quot;192.168.122.251:31360&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  new node joined the cluster hostname:&quot;master&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  new watchdog node connection is received from &quot;192.168.122.14:25824&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: LOG:  new node joined the cluster hostname:&quot;slave01&quot; port:9000 pgpool_port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:15: pid 7994: DETAIL:  Pgpool-II version:&quot;4.1.2&quot; watchdog messaging version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:20: pid 7994: LOG:  watchdog node state changed from [LOADING] to [JOINING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:20: pid 7994: LOG:  setting the remote node &quot;master:9999 Linux k8s1&quot; as watchdog cluster master</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:20: pid 7994: LOG:  watchdog node state changed from [JOINING] to [INITIALIZING]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: LOG:  watchdog node state changed from [INITIALIZING] to [STANDBY]</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: LOG:  successfully joined the watchdog cluster as standby node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: DETAIL:  our join coordinator request is accepted by cluster leader node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  watchdog process is initialized</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: DETAIL:  watchdog messaging data version: 1.1</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  we have joined the watchdog cluster as STANDBY node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: DETAIL:  syncing the backend states from the MASTER watchdog node</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: LOG:  received the get data request from local pgpool-II on IPC interface</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: LOG:  get data request from local pgpool-II node received on IPC interface is forwarded to master watchdog node &quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: DETAIL:  waiting for the reply...</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  master watchdog node &quot;master:9999 Linux k8s1&quot; returned status for 3 backend nodes</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  Setting up socket for 0.0.0.0:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  Setting up socket for :::9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7994: LOG:  new IPC connection received</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7998: LOG:  3 watchdog nodes are configured for lifecheck</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7998: LOG:  watchdog nodes ID:0 Name:&quot;slave:9999 Linux k8s2&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7998: DETAIL:  Host:&quot;slave&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7998: LOG:  watchdog nodes ID:1 Name:&quot;master:9999 Linux k8s1&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7998: DETAIL:  Host:&quot;master&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7998: LOG:  watchdog nodes ID:2 Name:&quot;slave01:9999 Linux k8s3&quot;</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7998: DETAIL:  Host:&quot;slave01&quot; WD Port:9000 pgpool-II port:9999</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  pgpool-II successfully started. version 4.1.2 (karasukiboshi)</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  node status[0]: 0</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  node status[1]: 0</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 7992: LOG:  node status[2]: 0</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:21: pid 8031: LOG:  PCP process: 8031 started</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8037: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8037: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8037: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8037: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8037: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8039: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8039: DETAIL:  setsockopt(SO_BINDTODEVICE) requires root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8039: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8039: LOG:  creating socket for sending heartbeat</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8039: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8036: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8036: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8036: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8036: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8036: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8038: LOG:  failed to create watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8038: DETAIL:  setsockopt(SO_BINDTODEVICE) requies root privilege</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8038: LOG:  set SO_REUSEPORT option to the socket</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8038: LOG:  creating watchdog heartbeat receive socket.</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:52:22: pid 8038: DETAIL:  set SO_REUSEPORT</span></span>
<span class="line"><span style="color:#24292e;">2021-07-05 01:54:01: pid 7998: LOG:  watchdog: lifecheck started</span></span></code></pre></div><p><a href="https://www.cnblogs.com/applerosa/p/13176051.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/applerosa/p/13176051.html</a></p><p>error</p><p><a href="https://qiita.com/11ohina017/items/525df9a290bf43df47dd" target="_blank" rel="noreferrer">https://qiita.com/11ohina017/items/525df9a290bf43df47dd</a></p><p><a href="https://www.jianshu.com/p/d8a19ec68868" target="_blank" rel="noreferrer">https://www.jianshu.com/p/d8a19ec68868</a></p><p><a href="https://segmentfault.com/a/1190000007012082" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000007012082</a></p>`,77),c=[t];function r(i,d,y,g,h,u){return n(),e("div",null,c)}const I=s(l,[["render",r]]);export{O as __pageData,I as default};
