import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/etcd/1-sigle.md","filePath":"guide/Database/etcd/1-sigle.md","lastUpdated":1703141608000}'),p={name:"guide/Database/etcd/1-sigle.md"},o=l(`<h2 id="_1-下载" tabindex="-1">1.下载 <a class="header-anchor" href="#_1-下载" aria-label="Permalink to &quot;1.下载&quot;">​</a></h2><p>wget <a href="https://github.com/etcd-io/etcd/releases/download/v3.4.13/etcd-v3.4.13-linux-amd64.tar.gz" target="_blank" rel="noreferrer">https://github.com/etcd-io/etcd/releases/download/v3.4.13/etcd-v3.4.13-linux-amd64.tar.gz</a></p><h2 id="_2-安装" tabindex="-1">2.安装 <a class="header-anchor" href="#_2-安装" aria-label="Permalink to &quot;2.安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cp etcd etcdctl /usr/bin/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#firewall and selinux</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl stop firewalld.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl disable firewalld.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sed -i &#39;s/SELINUX=permissive/SELINUX=disabled/&#39; /etc/sysconfig/selinux</span></span>
<span class="line"><span style="color:#e1e4e8;">setenforce 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cp etcd etcdctl /usr/bin/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#firewall and selinux</span></span>
<span class="line"><span style="color:#24292e;">systemctl stop firewalld.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl disable firewalld.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sed -i &#39;s/SELINUX=permissive/SELINUX=disabled/&#39; /etc/sysconfig/selinux</span></span>
<span class="line"><span style="color:#24292e;">setenforce 0</span></span></code></pre></div><h2 id="_3-配置文件" tabindex="-1">3.配置文件 <a class="header-anchor" href="#_3-配置文件" aria-label="Permalink to &quot;3.配置文件&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建数据目录</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/etcd_data</span></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-R</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/etcd_data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建用户和用户组</span></span>
<span class="line"><span style="color:#B392F0;">groupadd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">useradd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Etcd user&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-g</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-s</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/sbin/nologin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">etcd</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost etcd_data]# cat etcd.conf </span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_NAME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_DATA_DIR</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/data/etcd_data&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_WAL_DIR</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/data/etcd_data/wal&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_LISTEN_CLIENT_URLS</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;http://0.0.0.0:2379&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_ADVERTISE_CLIENT_URLS</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;http://0.0.0.0:2379&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_AUTO_COMPACTION_RETENTION</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_AUTO_COMPACTION_MODE</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">periodic</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_MAX_SNAPSHOTS</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;5&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_MAX_WALS</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;5&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_SNAPSHOT_COUNT</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;50000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_HEARTBEAT_INTERVAL</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_ELECTION_TIMEOUT</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;1000&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_MAX_REQUEST_BYTES</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;10485760&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建数据目录</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/etcd_data</span></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-R</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/etcd_data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 创建用户和用户组</span></span>
<span class="line"><span style="color:#6F42C1;">groupadd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Etcd user&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-s</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/sbin/nologin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">etcd</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@localhost etcd_data]# cat etcd.conf </span></span>
<span class="line"><span style="color:#24292E;">ETCD_NAME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#24292E;">ETCD_DATA_DIR</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/data/etcd_data&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_WAL_DIR</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/data/etcd_data/wal&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_LISTEN_CLIENT_URLS</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;http://0.0.0.0:2379&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_ADVERTISE_CLIENT_URLS</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;http://0.0.0.0:2379&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_AUTO_COMPACTION_RETENTION</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_AUTO_COMPACTION_MODE</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">periodic</span></span>
<span class="line"><span style="color:#24292E;">ETCD_MAX_SNAPSHOTS</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;5&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_MAX_WALS</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;5&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_SNAPSHOT_COUNT</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;50000&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_HEARTBEAT_INTERVAL</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_ELECTION_TIMEOUT</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;1000&quot;</span></span>
<span class="line"><span style="color:#24292E;">ETCD_MAX_REQUEST_BYTES</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;10485760&quot;</span></span></code></pre></div><h2 id="_4-systemd" tabindex="-1">4.systemd <a class="header-anchor" href="#_4-systemd" aria-label="Permalink to &quot;4.systemd&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost etcd_data]# cat /etc/systemd/system/etcd.service </span></span>
<span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">Etcd</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Server</span></span>
<span class="line"><span style="color:#E1E4E8;">After</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network.target</span></span>
<span class="line"><span style="color:#E1E4E8;">After</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network-online.target</span></span>
<span class="line"><span style="color:#E1E4E8;">Wants</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">User</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">etcd</span></span>
<span class="line"><span style="color:#E1E4E8;">Type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">simple</span></span>
<span class="line"><span style="color:#E1E4E8;">WorkingDirectory</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/etcd_data</span></span>
<span class="line"><span style="color:#E1E4E8;">EnvironmentFile</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">-/data/etcd_data/etcd.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/bin/etcd</span></span>
<span class="line"><span style="color:#E1E4E8;">Restart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">on-failure</span></span>
<span class="line"><span style="color:#E1E4E8;">RestartSec</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">10</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"><span style="color:#E1E4E8;">LimitNOFILE</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">40000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost etcd_data]# cat /etc/systemd/system/etcd.service </span></span>
<span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">Etcd</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Server</span></span>
<span class="line"><span style="color:#24292E;">After</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network.target</span></span>
<span class="line"><span style="color:#24292E;">After</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network-online.target</span></span>
<span class="line"><span style="color:#24292E;">Wants</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">User</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">etcd</span></span>
<span class="line"><span style="color:#24292E;">Type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">simple</span></span>
<span class="line"><span style="color:#24292E;">WorkingDirectory</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/etcd_data</span></span>
<span class="line"><span style="color:#24292E;">EnvironmentFile</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">-/data/etcd_data/etcd.conf</span></span>
<span class="line"><span style="color:#24292E;">ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/bin/etcd</span></span>
<span class="line"><span style="color:#24292E;">Restart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">on-failure</span></span>
<span class="line"><span style="color:#24292E;">RestartSec</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">10</span><span style="color:#032F62;">s</span></span>
<span class="line"><span style="color:#24292E;">LimitNOFILE</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">40000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><ul><li>另一个单节点启动方式</li></ul><p>[root@localhost etcd_data]# etcd</p><p>默认用2379端口接受客户端请求，数据存储路默认为主目录下的default.etcd</p><ul><li>第二种，指定参数启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">etcd --listen-client-urls  &quot;http://0.0.0.0:2381&quot; --advertise-client-urls &quot;http://0.0.0.0:2381&quot; --data-dir &quot;/var/lib/etcd/data&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">etcd --listen-client-urls  &quot;http://0.0.0.0:2381&quot; --advertise-client-urls &quot;http://0.0.0.0:2381&quot; --data-dir &quot;/var/lib/etcd/data&quot;</span></span></code></pre></div><ul><li>第三种，指定配置文件启动,必须是yml格式的</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost etcd_data]# cat etcd.yml </span></span>
<span class="line"><span style="color:#B392F0;">ETCD_NAME:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#B392F0;">ETCD_DATA_DIR:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/etcd_data/</span></span>
<span class="line"><span style="color:#B392F0;">ETCD_LISTEN_CLIENT_URLS:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://0.0.0.0:2379</span></span>
<span class="line"><span style="color:#B392F0;">ETCD_ADVERTISE_CLIENT_URLS:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://0.0.0.0:2379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#B392F0;">etcd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--config-file=/data/etcd_data/etcd.yml</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#systemd方式</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">Etcd</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Server</span></span>
<span class="line"><span style="color:#E1E4E8;">After</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network.target</span></span>
<span class="line"><span style="color:#E1E4E8;">After</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network-online.target</span></span>
<span class="line"><span style="color:#E1E4E8;">Wants</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network-online.target</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">Type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">notify</span></span>
<span class="line"><span style="color:#E1E4E8;">WorkingDirectory</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/opt/etcd-v3.2.6/</span></span>
<span class="line"><span style="color:#6A737D;"># User=etcd</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/opt/etcd-v3.2.6/etcd</span><span style="color:#E1E4E8;"> --config-file</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/etc/etcd/conf.yml</span></span>
<span class="line"><span style="color:#E1E4E8;">Restart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">on-failure</span></span>
<span class="line"><span style="color:#E1E4E8;">LimitNOFILE</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">65536</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost etcd_data]# cat etcd.yml </span></span>
<span class="line"><span style="color:#6F42C1;">ETCD_NAME:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#6F42C1;">ETCD_DATA_DIR:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/etcd_data/</span></span>
<span class="line"><span style="color:#6F42C1;">ETCD_LISTEN_CLIENT_URLS:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://0.0.0.0:2379</span></span>
<span class="line"><span style="color:#6F42C1;">ETCD_ADVERTISE_CLIENT_URLS:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://0.0.0.0:2379</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#6F42C1;">etcd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--config-file=/data/etcd_data/etcd.yml</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#systemd方式</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">Etcd</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Server</span></span>
<span class="line"><span style="color:#24292E;">After</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network.target</span></span>
<span class="line"><span style="color:#24292E;">After</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network-online.target</span></span>
<span class="line"><span style="color:#24292E;">Wants</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network-online.target</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">Type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">notify</span></span>
<span class="line"><span style="color:#24292E;">WorkingDirectory</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/opt/etcd-v3.2.6/</span></span>
<span class="line"><span style="color:#6A737D;"># User=etcd</span></span>
<span class="line"><span style="color:#24292E;">ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/opt/etcd-v3.2.6/etcd</span><span style="color:#24292E;"> --config-file</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/etc/etcd/conf.yml</span></span>
<span class="line"><span style="color:#24292E;">Restart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">on-failure</span></span>
<span class="line"><span style="color:#24292E;">LimitNOFILE</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">65536</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><p>注意：如果客户端请求端口设置在非2379上，需要指定endpoints参数，因为默认请求下查看的是2379端口下成员状态</p><ul><li>查看</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost etcd_data]# etcdctl --endpoints=http://127.0.0.1:2379 member list --write-out=table</span></span>
<span class="line"><span style="color:#B392F0;">+------------------+---------+---------+-----------------------+---------------------+------------+</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">ID</span><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">STATUS</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">PEER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ADDRS</span><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">CLIENT</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ADDRS</span><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">LEARNER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">+------------------+---------+---------+-----------------------+---------------------+------------+</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">8e9e05c52164694d</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">started</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http://localhost:2380</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http://0.0.0.0:2379</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">+------------------+---------+---------+-----------------------+---------------------+------------+</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#默认是2379，查看成员信息</span></span>
<span class="line"><span style="color:#B392F0;">etcdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">member</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--write-out=table</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">注意：</span></span>
<span class="line"><span style="color:#B392F0;">如果指定了listen-client-urls，则必须同时指定advertise-client-urls，否则会报错</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost etcd_data]# etcdctl --endpoints=http://127.0.0.1:2379 member list --write-out=table</span></span>
<span class="line"><span style="color:#6F42C1;">+------------------+---------+---------+-----------------------+---------------------+------------+</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;">        </span><span style="color:#6F42C1;">ID</span><span style="color:#24292E;">        </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">STATUS</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">      </span><span style="color:#6F42C1;">PEER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ADDRS</span><span style="color:#24292E;">       </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">    </span><span style="color:#6F42C1;">CLIENT</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ADDRS</span><span style="color:#24292E;">     </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">LEARNER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">+------------------+---------+---------+-----------------------+---------------------+------------+</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">8e9e05c52164694d</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">started</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http://localhost:2380</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http://0.0.0.0:2379</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">+------------------+---------+---------+-----------------------+---------------------+------------+</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#默认是2379，查看成员信息</span></span>
<span class="line"><span style="color:#6F42C1;">etcdctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">member</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--write-out=table</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">注意：</span></span>
<span class="line"><span style="color:#6F42C1;">如果指定了listen-client-urls，则必须同时指定advertise-client-urls，否则会报错</span></span></code></pre></div>`,18),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{C as __pageData,u as default};
