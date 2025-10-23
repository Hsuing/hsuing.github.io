import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"一、环境依赖","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/2-pg_install.md","filePath":"guide/Database/pgSql/base/2-pg_install.md","lastUpdated":1711535325000}'),p={name:"guide/Database/pgSql/base/2-pg_install.md"},e=l(`<h1 id="一、环境依赖" tabindex="-1">一、环境依赖 <a class="header-anchor" href="#一、环境依赖" aria-label="Permalink to &quot;一、环境依赖&quot;">​</a></h1><p>centos7_x86</p><p>pgsql_12.2</p><p>源码方式安装</p><p><a href="https://www.enterprisedb.com/download-postgresql-binaries" target="_blank" rel="noreferrer">https://www.enterprisedb.com/download-postgresql-binaries</a></p><h1 id="二、安装" tabindex="-1">二、安装 <a class="header-anchor" href="#二、安装" aria-label="Permalink to &quot;二、安装&quot;">​</a></h1><h2 id="_2-1下载" tabindex="-1">2.1下载 <a class="header-anchor" href="#_2-1下载" aria-label="Permalink to &quot;2.1下载&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#wget https://ftp.postgresql.org/pub/source/v12.2/postgresql-12.2.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#wget https://ftp.postgresql.org/pub/source/v12.2/postgresql-12.2.tar.gz</span></span></code></pre></div><h2 id="_2-2环境依赖" tabindex="-1">2.2环境依赖 <a class="header-anchor" href="#_2-2环境依赖" aria-label="Permalink to &quot;2.2环境依赖&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#yum install -y wget gcc gcc-c++ llvm5.0 llvm5.0-devel clang libicu-devel perl-ExtUtils-Embed readline readline-devel zlib zlib-devel openssl openssl-devel pam-devel libxml2-devel libxslt-devel openldap-devel systemd-devel tcl-devel python-devel</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#yum install -y wget gcc gcc-c++ llvm5.0 llvm5.0-devel clang libicu-devel perl-ExtUtils-Embed readline readline-devel zlib zlib-devel openssl openssl-devel pam-devel libxml2-devel libxslt-devel openldap-devel systemd-devel tcl-devel python-devel</span></span></code></pre></div><h2 id="_2-3安装" tabindex="-1">2.3安装 <a class="header-anchor" href="#_2-3安装" aria-label="Permalink to &quot;2.3安装&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#6A737D;">#tar zxvf postgresql-12.2.tar.gz &amp;&amp; cd postgresql-12.2</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#./configure --prefix=/data/apps/pgsql/12 --enable-nls --with-python --with-tcl --with-gssapi --with-icu --with-openssl --with-pam --with-ldap --with-systemd --with-libxml --with-libxslt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#make &amp;&amp; </span><span style="color:#B392F0;">make</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">（</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gmake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">world</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">gmake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install-world）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#创建目录和用户,以及配置环境变量</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#groupadd postgres</span></span>
<span class="line"><span style="color:#6A737D;">#useradd -s /sbin/nolog -M redis</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#useradd -g postgres postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 密码设置在引号内输入自己的密码</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#echo </span><span style="color:#9ECBFF;">&quot;postgres&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">passwd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--stdin</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#mkdir -p /data/pgdata/{</span><span style="color:#B392F0;">data,archivedir}</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#chown -R postgres:postgres /data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#chown postgres:postgres /data/pgdata -R</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#echo </span><span style="color:#9ECBFF;">&quot;export PATH=/data/apps/pgsql/12/bin:</span><span style="color:#E1E4E8;">$PATH</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">/etc/profile.d/pgsql.sh</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#source /etc/profile.d/pgsql.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#以下的操作均在postgres用户下进行</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@test postgresql-12.2]#su - postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置环境变量</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">vi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~/.bash_profile</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PGPORT</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5532</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PGUSER</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PGHOME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PGDATA</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/pgdata/data</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> PATH</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$PGHOME</span><span style="color:#9ECBFF;">/bin:</span><span style="color:#E1E4E8;">$PATH</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">##数据库初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@test </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]$ initdb -D /data/pgdata/data -U postgres --locale=en_US.UTF8 -E UTF8</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@test </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]$ cp /data/pgdata/data/{</span><span style="color:#B392F0;">pg_hba.conf,pg_hba.conf.bak}</span></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@test </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]$ cp /data/pgdata/data/{</span><span style="color:#B392F0;">postgresql.conf,postgresql.conf.bak}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#手工启停数据库</span></span>
<span class="line"><span style="color:#B392F0;">查看数据库运行状态</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pg_ctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/data5555</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span></span>
<span class="line"><span style="color:#B392F0;">启动数据库</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pg_ctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/data5555</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> &amp;</span></span>
<span class="line"><span style="color:#B392F0;">停止数据库</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pg_ctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/data5555</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#6A737D;">#tar zxvf postgresql-12.2.tar.gz &amp;&amp; cd postgresql-12.2</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#./configure --prefix=/data/apps/pgsql/12 --enable-nls --with-python --with-tcl --with-gssapi --with-icu --with-openssl --with-pam --with-ldap --with-systemd --with-libxml --with-libxslt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#make &amp;&amp; </span><span style="color:#6F42C1;">make</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">（</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gmake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">world</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">gmake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install-world）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#创建目录和用户,以及配置环境变量</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#groupadd postgres</span></span>
<span class="line"><span style="color:#6A737D;">#useradd -s /sbin/nolog -M redis</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#useradd -g postgres postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 密码设置在引号内输入自己的密码</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#echo </span><span style="color:#032F62;">&quot;postgres&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">passwd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--stdin</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#mkdir -p /data/pgdata/{</span><span style="color:#6F42C1;">data,archivedir}</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#chown -R postgres:postgres /data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#chown postgres:postgres /data/pgdata -R</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#echo </span><span style="color:#032F62;">&quot;export PATH=/data/apps/pgsql/12/bin:</span><span style="color:#24292E;">$PATH</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">/etc/profile.d/pgsql.sh</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#source /etc/profile.d/pgsql.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#以下的操作均在postgres用户下进行</span></span>
<span class="line"><span style="color:#24292E;">[root@test postgresql-12.2]#su - postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置环境变量</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">vi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~/.bash_profile</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PGPORT</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5532</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PGUSER</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">postgres</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PGHOME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/apps/pgsql/12</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PGDATA</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/pgdata/data</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> PATH</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$PGHOME</span><span style="color:#032F62;">/bin:</span><span style="color:#24292E;">$PATH</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">##数据库初始化</span></span>
<span class="line"><span style="color:#24292E;">[postgres@test </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]$ initdb -D /data/pgdata/data -U postgres --locale=en_US.UTF8 -E UTF8</span></span>
<span class="line"><span style="color:#24292E;">[postgres@test </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]$ cp /data/pgdata/data/{</span><span style="color:#6F42C1;">pg_hba.conf,pg_hba.conf.bak}</span></span>
<span class="line"><span style="color:#24292E;">[postgres@test </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]$ cp /data/pgdata/data/{</span><span style="color:#6F42C1;">postgresql.conf,postgresql.conf.bak}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#手工启停数据库</span></span>
<span class="line"><span style="color:#6F42C1;">查看数据库运行状态</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pg_ctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/data5555</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span></span>
<span class="line"><span style="color:#6F42C1;">启动数据库</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pg_ctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/data5555</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> &amp;</span></span>
<span class="line"><span style="color:#6F42C1;">停止数据库</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pg_ctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/data5555</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@redis ~]$ cat /data/pgdata/data/postgresql.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">listen_addresses = &#39;*&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">port = 5532 </span></span>
<span class="line"><span style="color:#e1e4e8;">max_connections = 3000 </span></span>
<span class="line"><span style="color:#e1e4e8;">superuser_reserved_connections = 10 </span></span>
<span class="line"><span style="color:#e1e4e8;">full_page_writes = on </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_log_hints = off </span></span>
<span class="line"><span style="color:#e1e4e8;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#e1e4e8;">hot_standby = on </span></span>
<span class="line"><span style="color:#e1e4e8;">log_destination = &#39;csvlog&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">logging_collector = on </span></span>
<span class="line"><span style="color:#e1e4e8;">log_directory = &#39;log&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%Y-%m-%d_%H%M%S&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_age = 1d </span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_size = 10MB </span></span>
<span class="line"><span style="color:#e1e4e8;">log_statement = &#39;mod&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">log_timezone = &#39;PRC&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">timezone = &#39;PRC&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">unix_socket_directories = &#39;/tmp&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">shared_buffers = 512MB </span></span>
<span class="line"><span style="color:#e1e4e8;">temp_buffers = 16MB </span></span>
<span class="line"><span style="color:#e1e4e8;">work_mem = 3048MB </span></span>
<span class="line"><span style="color:#e1e4e8;">effective_cache_size = 2GB </span></span>
<span class="line"><span style="color:#e1e4e8;">maintenance_work_mem = 128MB </span></span>
<span class="line"><span style="color:#e1e4e8;">#max_stack_depth = 2MB </span></span>
<span class="line"><span style="color:#e1e4e8;">dynamic_shared_memory_type = posix </span></span>
<span class="line"><span style="color:#e1e4e8;">## PITR full_page_writes = on </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_buffers = 16MB </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_writer_delay = 200ms </span></span>
<span class="line"><span style="color:#e1e4e8;">commit_delay = 0 </span></span>
<span class="line"><span style="color:#e1e4e8;">commit_siblings = 5 </span></span>
<span class="line"><span style="color:#e1e4e8;">wal_level = replica </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_mode = on </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_command = &#39;test ! -f /data/pgdata/archivedir/%f &amp;&amp; cp %p /data/pgdata/archivedir/%f&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">archive_timeout = 60s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@redis ~]$ cat /data/pgdata/data/postgresql.conf</span></span>
<span class="line"><span style="color:#24292e;">listen_addresses = &#39;*&#39; </span></span>
<span class="line"><span style="color:#24292e;">port = 5532 </span></span>
<span class="line"><span style="color:#24292e;">max_connections = 3000 </span></span>
<span class="line"><span style="color:#24292e;">superuser_reserved_connections = 10 </span></span>
<span class="line"><span style="color:#24292e;">full_page_writes = on </span></span>
<span class="line"><span style="color:#24292e;">wal_log_hints = off </span></span>
<span class="line"><span style="color:#24292e;">max_wal_senders = 50 </span></span>
<span class="line"><span style="color:#24292e;">hot_standby = on </span></span>
<span class="line"><span style="color:#24292e;">log_destination = &#39;csvlog&#39; </span></span>
<span class="line"><span style="color:#24292e;">logging_collector = on </span></span>
<span class="line"><span style="color:#24292e;">log_directory = &#39;log&#39; </span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%Y-%m-%d_%H%M%S&#39; </span></span>
<span class="line"><span style="color:#24292e;">log_rotation_age = 1d </span></span>
<span class="line"><span style="color:#24292e;">log_rotation_size = 10MB </span></span>
<span class="line"><span style="color:#24292e;">log_statement = &#39;mod&#39; </span></span>
<span class="line"><span style="color:#24292e;">log_timezone = &#39;PRC&#39; </span></span>
<span class="line"><span style="color:#24292e;">timezone = &#39;PRC&#39; </span></span>
<span class="line"><span style="color:#24292e;">unix_socket_directories = &#39;/tmp&#39; </span></span>
<span class="line"><span style="color:#24292e;">shared_buffers = 512MB </span></span>
<span class="line"><span style="color:#24292e;">temp_buffers = 16MB </span></span>
<span class="line"><span style="color:#24292e;">work_mem = 3048MB </span></span>
<span class="line"><span style="color:#24292e;">effective_cache_size = 2GB </span></span>
<span class="line"><span style="color:#24292e;">maintenance_work_mem = 128MB </span></span>
<span class="line"><span style="color:#24292e;">#max_stack_depth = 2MB </span></span>
<span class="line"><span style="color:#24292e;">dynamic_shared_memory_type = posix </span></span>
<span class="line"><span style="color:#24292e;">## PITR full_page_writes = on </span></span>
<span class="line"><span style="color:#24292e;">wal_buffers = 16MB </span></span>
<span class="line"><span style="color:#24292e;">wal_writer_delay = 200ms </span></span>
<span class="line"><span style="color:#24292e;">commit_delay = 0 </span></span>
<span class="line"><span style="color:#24292e;">commit_siblings = 5 </span></span>
<span class="line"><span style="color:#24292e;">wal_level = replica </span></span>
<span class="line"><span style="color:#24292e;">archive_mode = on </span></span>
<span class="line"><span style="color:#24292e;">archive_command = &#39;test ! -f /data/pgdata/archivedir/%f &amp;&amp; cp %p /data/pgdata/archivedir/%f&#39; </span></span>
<span class="line"><span style="color:#24292e;">archive_timeout = 60s</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[postgres@test~]$ grep -v &quot;#&quot; /data/pgdata/data/pg_hba.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">local   all             all                                     md5</span></span>
<span class="line"><span style="color:#e1e4e8;">host    all             all             127.0.0.1/32            md5</span></span>
<span class="line"><span style="color:#e1e4e8;">host    all             all             ::1/128                 trust</span></span>
<span class="line"><span style="color:#e1e4e8;">host    all             all             0.0.0.0/0               md5</span></span>
<span class="line"><span style="color:#e1e4e8;">host    all             all             172.31.0.0/32           md5</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动</span></span>
<span class="line"><span style="color:#e1e4e8;"> [postgres@test~]$ pg_ctl -D /data/pgdata/data -l /data/pgdata/data/serverlog start</span></span>
<span class="line"><span style="color:#e1e4e8;"> [postgres@test~]$ pg_ctl -D /data/pgdata/data -l /data/pgdata/data/serverlog stop</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[postgres@test~]$ grep -v &quot;#&quot; /data/pgdata/data/pg_hba.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">local   all             all                                     md5</span></span>
<span class="line"><span style="color:#24292e;">host    all             all             127.0.0.1/32            md5</span></span>
<span class="line"><span style="color:#24292e;">host    all             all             ::1/128                 trust</span></span>
<span class="line"><span style="color:#24292e;">host    all             all             0.0.0.0/0               md5</span></span>
<span class="line"><span style="color:#24292e;">host    all             all             172.31.0.0/32           md5</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动</span></span>
<span class="line"><span style="color:#24292e;"> [postgres@test~]$ pg_ctl -D /data/pgdata/data -l /data/pgdata/data/serverlog start</span></span>
<span class="line"><span style="color:#24292e;"> [postgres@test~]$ pg_ctl -D /data/pgdata/data -l /data/pgdata/data/serverlog stop</span></span></code></pre></div><h2 id="_2-4启动脚本" tabindex="-1">2.4启动脚本 <a class="header-anchor" href="#_2-4启动脚本" aria-label="Permalink to &quot;2.4启动脚本&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/postgresql-12.2/contrib/start-scripts/linux</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/init.d/postgresql</span></span>
<span class="line"><span style="color:#6A737D;">#调整配置，主要是脚本中三个变量的值</span></span>
<span class="line"><span style="color:#E1E4E8;">prefix</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/home/postgresql/dbhome&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">PGDATA</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/home/postgresql/data&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">PGUSER</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">postgre</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">prefix</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">是软件的安装路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">PGDATA</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">是数据存放路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">PGUSER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">是启动postgresql服务的用户</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@redis </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]$ cat /etc/init.d/postgresql </span></span>
<span class="line"><span style="color:#6A737D;">#! /bin/bash</span></span>
<span class="line"><span style="color:#6A737D;"># chkconfig: 2345 98 02</span></span>
<span class="line"><span style="color:#6A737D;"># description: PostgreSQL RDBMS</span></span>
<span class="line"><span style="color:#6A737D;"># chkconfig --add postgresql</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># Installation prefix</span></span>
<span class="line"><span style="color:#E1E4E8;">prefix</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/apps/pgsql/12</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Data directory</span></span>
<span class="line"><span style="color:#E1E4E8;">PGDATA</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/data/pgdata/data&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Who to run the postmaster as, usually &quot;postgres&quot;.  (NOT &quot;root&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">PGUSER</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Where to keep a log file</span></span>
<span class="line"><span style="color:#E1E4E8;">PGLOG</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PGDATA</span><span style="color:#9ECBFF;">/serverlog&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># It&#39;s often a good idea to protect the postmaster from being killed by the</span></span>
<span class="line"><span style="color:#6A737D;"># OOM killer (which will tend to preferentially kill the postmaster because</span></span>
<span class="line"><span style="color:#6A737D;"># of the way it accounts for shared memory).  To do that, uncomment these</span></span>
<span class="line"><span style="color:#6A737D;"># three lines:</span></span>
<span class="line"><span style="color:#6A737D;">#PG_OOM_ADJUST_FILE=/proc/self/oom_score_adj</span></span>
<span class="line"><span style="color:#6A737D;">#PG_MASTER_OOM_SCORE_ADJ=-1000</span></span>
<span class="line"><span style="color:#6A737D;">#PG_CHILD_OOM_SCORE_ADJ=0</span></span>
<span class="line"><span style="color:#6A737D;"># Older Linux kernels may not have /proc/self/oom_score_adj, but instead</span></span>
<span class="line"><span style="color:#6A737D;"># /proc/self/oom_adj, which works similarly except for having a different</span></span>
<span class="line"><span style="color:#6A737D;"># range of scores.  For such a system, uncomment these three lines instead:</span></span>
<span class="line"><span style="color:#6A737D;">#PG_OOM_ADJUST_FILE=/proc/self/oom_adj</span></span>
<span class="line"><span style="color:#6A737D;">#PG_MASTER_OOM_SCORE_ADJ=-17</span></span>
<span class="line"><span style="color:#6A737D;">#PG_CHILD_OOM_SCORE_ADJ=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## STOP EDITING HERE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The path that is to be used for the script</span></span>
<span class="line"><span style="color:#E1E4E8;">PATH</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/apps/pgsql/12/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># What to use to start up the postmaster.  (If you want the script to wait</span></span>
<span class="line"><span style="color:#6A737D;"># until the server has started, you could use &quot;pg_ctl start&quot; here.)</span></span>
<span class="line"><span style="color:#E1E4E8;">DAEMON</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$prefix</span><span style="color:#9ECBFF;">/bin/postmaster&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># What to use to shut down the postmaster</span></span>
<span class="line"><span style="color:#E1E4E8;">PGCTL</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$prefix</span><span style="color:#9ECBFF;">/bin/pg_ctl&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Only start if we can find the postmaster.</span></span>
<span class="line"><span style="color:#79B8FF;">test</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-x</span><span style="color:#E1E4E8;"> $DAEMON </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$DAEMON</span><span style="color:#9ECBFF;"> not found&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">$1</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;stop&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">fi</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If we want to tell child processes to adjust their OOM scores, set up the</span></span>
<span class="line"><span style="color:#6A737D;"># necessary environment variables.  Can&#39;t just export them through the &quot;su&quot;.</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#F97583;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_OOM_ADJUST_FILE</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_CHILD_OOM_SCORE_ADJ</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">	DAEMON_ENV</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;PG_OOM_ADJUST_FILE=</span><span style="color:#E1E4E8;">$PG_OOM_ADJUST_FILE</span><span style="color:#9ECBFF;"> PG_OOM_ADJUST_VALUE=</span><span style="color:#E1E4E8;">$PG_CHILD_OOM_SCORE_ADJ</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Parse command line parameters.</span></span>
<span class="line"><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">$1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span></span>
<span class="line"><span style="color:#E1E4E8;">  start)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Starting PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">test</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_OOM_ADJUST_FILE</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_MASTER_OOM_SCORE_ADJ</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_OOM_ADJUST_FILE</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">su</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> $PGUSER </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$DAEMON_ENV</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">$DAEMON</span><span style="color:#9ECBFF;"> -D &#39;</span><span style="color:#E1E4E8;">$PGDATA</span><span style="color:#9ECBFF;">&#39; &gt;&gt;</span><span style="color:#E1E4E8;">$PGLOG</span><span style="color:#9ECBFF;"> 2&gt;&amp;1 &amp;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	;;</span></span>
<span class="line"><span style="color:#E1E4E8;">  stop)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Stopping PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">su</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> $PGUSER </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PGCTL</span><span style="color:#9ECBFF;"> stop -D &#39;</span><span style="color:#E1E4E8;">$PGDATA</span><span style="color:#9ECBFF;">&#39; -s&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	;;</span></span>
<span class="line"><span style="color:#E1E4E8;">  restart)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Restarting PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">su</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> $PGUSER </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PGCTL</span><span style="color:#9ECBFF;"> stop -D &#39;</span><span style="color:#E1E4E8;">$PGDATA</span><span style="color:#9ECBFF;">&#39; -s&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">test</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_OOM_ADJUST_FILE</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_MASTER_OOM_SCORE_ADJ</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PG_OOM_ADJUST_FILE</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">su</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> $PGUSER </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$DAEMON_ENV</span><span style="color:#9ECBFF;"> </span><span style="color:#E1E4E8;">$DAEMON</span><span style="color:#9ECBFF;"> -D &#39;</span><span style="color:#E1E4E8;">$PGDATA</span><span style="color:#9ECBFF;">&#39; &gt;&gt;</span><span style="color:#E1E4E8;">$PGLOG</span><span style="color:#9ECBFF;"> 2&gt;&amp;1 &amp;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	;;</span></span>
<span class="line"><span style="color:#E1E4E8;">  reload)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Reload PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">su</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> $PGUSER </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PGCTL</span><span style="color:#9ECBFF;"> reload -D &#39;</span><span style="color:#E1E4E8;">$PGDATA</span><span style="color:#9ECBFF;">&#39; -s&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	;;</span></span>
<span class="line"><span style="color:#E1E4E8;">  status)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">su</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> $PGUSER </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$PGCTL</span><span style="color:#9ECBFF;"> status -D &#39;</span><span style="color:#E1E4E8;">$PGDATA</span><span style="color:#9ECBFF;">&#39;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	;;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;"># Print help</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Usage: </span><span style="color:#79B8FF;">$0</span><span style="color:#9ECBFF;"> {start|stop|restart|reload|status}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">1&gt;&amp;2</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">	;;</span></span>
<span class="line"><span style="color:#F97583;">esac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">exit</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/postgresql-12.2/contrib/start-scripts/linux</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/init.d/postgresql</span></span>
<span class="line"><span style="color:#6A737D;">#调整配置，主要是脚本中三个变量的值</span></span>
<span class="line"><span style="color:#24292E;">prefix</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/home/postgresql/dbhome&quot;</span></span>
<span class="line"><span style="color:#24292E;">PGDATA</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/home/postgresql/data&quot;</span></span>
<span class="line"><span style="color:#24292E;">PGUSER</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">postgre</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">prefix</span><span style="color:#24292E;"> </span><span style="color:#032F62;">是软件的安装路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">PGDATA</span><span style="color:#24292E;"> </span><span style="color:#032F62;">是数据存放路径</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">PGUSER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">是启动postgresql服务的用户</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[postgres@redis </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]$ cat /etc/init.d/postgresql </span></span>
<span class="line"><span style="color:#6A737D;">#! /bin/bash</span></span>
<span class="line"><span style="color:#6A737D;"># chkconfig: 2345 98 02</span></span>
<span class="line"><span style="color:#6A737D;"># description: PostgreSQL RDBMS</span></span>
<span class="line"><span style="color:#6A737D;"># chkconfig --add postgresql</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># Installation prefix</span></span>
<span class="line"><span style="color:#24292E;">prefix</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/apps/pgsql/12</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Data directory</span></span>
<span class="line"><span style="color:#24292E;">PGDATA</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/data/pgdata/data&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Who to run the postmaster as, usually &quot;postgres&quot;.  (NOT &quot;root&quot;)</span></span>
<span class="line"><span style="color:#24292E;">PGUSER</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">postgres</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Where to keep a log file</span></span>
<span class="line"><span style="color:#24292E;">PGLOG</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PGDATA</span><span style="color:#032F62;">/serverlog&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># It&#39;s often a good idea to protect the postmaster from being killed by the</span></span>
<span class="line"><span style="color:#6A737D;"># OOM killer (which will tend to preferentially kill the postmaster because</span></span>
<span class="line"><span style="color:#6A737D;"># of the way it accounts for shared memory).  To do that, uncomment these</span></span>
<span class="line"><span style="color:#6A737D;"># three lines:</span></span>
<span class="line"><span style="color:#6A737D;">#PG_OOM_ADJUST_FILE=/proc/self/oom_score_adj</span></span>
<span class="line"><span style="color:#6A737D;">#PG_MASTER_OOM_SCORE_ADJ=-1000</span></span>
<span class="line"><span style="color:#6A737D;">#PG_CHILD_OOM_SCORE_ADJ=0</span></span>
<span class="line"><span style="color:#6A737D;"># Older Linux kernels may not have /proc/self/oom_score_adj, but instead</span></span>
<span class="line"><span style="color:#6A737D;"># /proc/self/oom_adj, which works similarly except for having a different</span></span>
<span class="line"><span style="color:#6A737D;"># range of scores.  For such a system, uncomment these three lines instead:</span></span>
<span class="line"><span style="color:#6A737D;">#PG_OOM_ADJUST_FILE=/proc/self/oom_adj</span></span>
<span class="line"><span style="color:#6A737D;">#PG_MASTER_OOM_SCORE_ADJ=-17</span></span>
<span class="line"><span style="color:#6A737D;">#PG_CHILD_OOM_SCORE_ADJ=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## STOP EDITING HERE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># The path that is to be used for the script</span></span>
<span class="line"><span style="color:#24292E;">PATH</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/apps/pgsql/12/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># What to use to start up the postmaster.  (If you want the script to wait</span></span>
<span class="line"><span style="color:#6A737D;"># until the server has started, you could use &quot;pg_ctl start&quot; here.)</span></span>
<span class="line"><span style="color:#24292E;">DAEMON</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$prefix</span><span style="color:#032F62;">/bin/postmaster&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># What to use to shut down the postmaster</span></span>
<span class="line"><span style="color:#24292E;">PGCTL</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$prefix</span><span style="color:#032F62;">/bin/pg_ctl&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">set</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Only start if we can find the postmaster.</span></span>
<span class="line"><span style="color:#005CC5;">test</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-x</span><span style="color:#24292E;"> $DAEMON </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$DAEMON</span><span style="color:#032F62;"> not found&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">$1</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;stop&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">then</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">fi</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># If we want to tell child processes to adjust their OOM scores, set up the</span></span>
<span class="line"><span style="color:#6A737D;"># necessary environment variables.  Can&#39;t just export them through the &quot;su&quot;.</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#D73A49;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_OOM_ADJUST_FILE</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_CHILD_OOM_SCORE_ADJ</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">	DAEMON_ENV</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;PG_OOM_ADJUST_FILE=</span><span style="color:#24292E;">$PG_OOM_ADJUST_FILE</span><span style="color:#032F62;"> PG_OOM_ADJUST_VALUE=</span><span style="color:#24292E;">$PG_CHILD_OOM_SCORE_ADJ</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Parse command line parameters.</span></span>
<span class="line"><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#E36209;">$1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span></span>
<span class="line"><span style="color:#24292E;">  start)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Starting PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">test</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_OOM_ADJUST_FILE</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_MASTER_OOM_SCORE_ADJ</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_OOM_ADJUST_FILE</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">su</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> $PGUSER </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$DAEMON_ENV</span><span style="color:#032F62;"> </span><span style="color:#24292E;">$DAEMON</span><span style="color:#032F62;"> -D &#39;</span><span style="color:#24292E;">$PGDATA</span><span style="color:#032F62;">&#39; &gt;&gt;</span><span style="color:#24292E;">$PGLOG</span><span style="color:#032F62;"> 2&gt;&amp;1 &amp;&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#24292E;">	;;</span></span>
<span class="line"><span style="color:#24292E;">  stop)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Stopping PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">su</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> $PGUSER </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PGCTL</span><span style="color:#032F62;"> stop -D &#39;</span><span style="color:#24292E;">$PGDATA</span><span style="color:#032F62;">&#39; -s&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#24292E;">	;;</span></span>
<span class="line"><span style="color:#24292E;">  restart)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Restarting PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">su</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> $PGUSER </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PGCTL</span><span style="color:#032F62;"> stop -D &#39;</span><span style="color:#24292E;">$PGDATA</span><span style="color:#032F62;">&#39; -s&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">test</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_OOM_ADJUST_FILE</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_MASTER_OOM_SCORE_ADJ</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PG_OOM_ADJUST_FILE</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">su</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> $PGUSER </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$DAEMON_ENV</span><span style="color:#032F62;"> </span><span style="color:#24292E;">$DAEMON</span><span style="color:#032F62;"> -D &#39;</span><span style="color:#24292E;">$PGDATA</span><span style="color:#032F62;">&#39; &gt;&gt;</span><span style="color:#24292E;">$PGLOG</span><span style="color:#032F62;"> 2&gt;&amp;1 &amp;&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#24292E;">	;;</span></span>
<span class="line"><span style="color:#24292E;">  reload)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Reload PostgreSQL: &quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">su</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> $PGUSER </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PGCTL</span><span style="color:#032F62;"> reload -D &#39;</span><span style="color:#24292E;">$PGDATA</span><span style="color:#032F62;">&#39; -s&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;ok&quot;</span></span>
<span class="line"><span style="color:#24292E;">	;;</span></span>
<span class="line"><span style="color:#24292E;">  status)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">su</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> $PGUSER </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$PGCTL</span><span style="color:#032F62;"> status -D &#39;</span><span style="color:#24292E;">$PGDATA</span><span style="color:#032F62;">&#39;&quot;</span></span>
<span class="line"><span style="color:#24292E;">	;;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;"># Print help</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Usage: </span><span style="color:#005CC5;">$0</span><span style="color:#032F62;"> {start|stop|restart|reload|status}&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">1&gt;&amp;2</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">	;;</span></span>
<span class="line"><span style="color:#D73A49;">esac</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">exit</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span></code></pre></div><p><strong>登陆</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">psql -U postgres -h 127.0.0.1 -p 5532</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">psql -U postgres -h 127.0.0.1 -p 5532</span></span></code></pre></div><p><strong>systemd启动</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost postgresql-12.2]# vi /usr/lib/systemd/system/postgresql.service</span></span>
<span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description=PostgreSQL database server</span></span>
<span class="line"><span style="color:#e1e4e8;">After=network.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">Type=forking</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">User=postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">Group=postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Port number for server to listen on</span></span>
<span class="line"><span style="color:#e1e4e8;">Environment=PGPORT=5532</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Location of database directory</span></span>
<span class="line"><span style="color:#e1e4e8;">Environment=PGDATA=/data/pgdata/data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Where to send early-startup messages from the server (before the logging</span></span>
<span class="line"><span style="color:#e1e4e8;"># options of postgresql.conf take effect)</span></span>
<span class="line"><span style="color:#e1e4e8;"># This is normally controlled by the global default set by systemd</span></span>
<span class="line"><span style="color:#e1e4e8;"># StandardOutput=syslog</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Disable OOM kill on the postmaster</span></span>
<span class="line"><span style="color:#e1e4e8;">OOMScoreAdjust=-1000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#ExecStartPre=/usr/local/pgsql/bin/postgresql-check-db-dir \${PGDATA}</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/data/apps/pgsql/12/bin/pg_ctl start -D \${PGDATA} -s -o &quot;-p \${PGPORT}&quot; -w -t 300</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStop=/data/apps/pgsql/12/bin/pg_ctl stop -D \${PGDATA} -s -m fast</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecReload=/data/apps/pgsql/12/bin/pg_ctl reload -D \${PGDATA} -s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Give a reasonable amount of time for the server to start up/shut down</span></span>
<span class="line"><span style="color:#e1e4e8;">TimeoutSec=300</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost postgresql-12.2]# vi /usr/lib/systemd/system/postgresql.service</span></span>
<span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description=PostgreSQL database server</span></span>
<span class="line"><span style="color:#24292e;">After=network.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">Type=forking</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">User=postgres</span></span>
<span class="line"><span style="color:#24292e;">Group=postgres</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Port number for server to listen on</span></span>
<span class="line"><span style="color:#24292e;">Environment=PGPORT=5532</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Location of database directory</span></span>
<span class="line"><span style="color:#24292e;">Environment=PGDATA=/data/pgdata/data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Where to send early-startup messages from the server (before the logging</span></span>
<span class="line"><span style="color:#24292e;"># options of postgresql.conf take effect)</span></span>
<span class="line"><span style="color:#24292e;"># This is normally controlled by the global default set by systemd</span></span>
<span class="line"><span style="color:#24292e;"># StandardOutput=syslog</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Disable OOM kill on the postmaster</span></span>
<span class="line"><span style="color:#24292e;">OOMScoreAdjust=-1000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#ExecStartPre=/usr/local/pgsql/bin/postgresql-check-db-dir \${PGDATA}</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/data/apps/pgsql/12/bin/pg_ctl start -D \${PGDATA} -s -o &quot;-p \${PGPORT}&quot; -w -t 300</span></span>
<span class="line"><span style="color:#24292e;">ExecStop=/data/apps/pgsql/12/bin/pg_ctl stop -D \${PGDATA} -s -m fast</span></span>
<span class="line"><span style="color:#24292e;">ExecReload=/data/apps/pgsql/12/bin/pg_ctl reload -D \${PGDATA} -s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Give a reasonable amount of time for the server to start up/shut down</span></span>
<span class="line"><span style="color:#24292e;">TimeoutSec=300</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost postgresql-12.2]# systemctl  start  postgresql.service</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost postgresql-12.2]# systemctl  stop  postgresql.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable postgresql.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl disable postgresql.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl   status  postgresql.service</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl   is-active postgresql.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost postgresql-12.2]# systemctl  start  postgresql.service</span></span>
<span class="line"><span style="color:#24292e;">[root@localhost postgresql-12.2]# systemctl  stop  postgresql.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable postgresql.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl disable postgresql.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl   status  postgresql.service</span></span>
<span class="line"><span style="color:#24292e;">systemctl   is-active postgresql.service</span></span></code></pre></div><h1 id="三、client端" tabindex="-1">三、client端 <a class="header-anchor" href="#三、client端" aria-label="Permalink to &quot;三、client端&quot;">​</a></h1><h2 id="_3-1安装客户端包" tabindex="-1">3.1安装客户端包 <a class="header-anchor" href="#_3-1安装客户端包" aria-label="Permalink to &quot;3.1安装客户端包&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">yum</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgresql12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">yum</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgresql12</span></span></code></pre></div><h1 id="四、yum安装" tabindex="-1">四、yum安装 <a class="header-anchor" href="#四、yum安装" aria-label="Permalink to &quot;四、yum安装&quot;">​</a></h1><p>参考官方文档，<a href="https://www.postgresql.org/download/linux/redhat/" target="_blank" rel="noreferrer">https://www.postgresql.org/download/linux/redhat/</a></p><p>centos7</p><h2 id="_4-1install-the-repository-rpm" tabindex="-1">4.1Install the repository RPM <a class="header-anchor" href="#_4-1install-the-repository-rpm" aria-label="Permalink to &quot;4.1Install the repository RPM&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm</span></span></code></pre></div><h2 id="_4-2-install" tabindex="-1">4.2 install <a class="header-anchor" href="#_4-2-install" aria-label="Permalink to &quot;4.2 install&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install postgresql12 postgresql12-server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install postgresql12 postgresql12-server</span></span></code></pre></div><h2 id="_4-3-initialize-the-database" tabindex="-1">4.3 initialize the database <a class="header-anchor" href="#_4-3-initialize-the-database" aria-label="Permalink to &quot;4.3 initialize the database&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/usr/pgsql-12/bin/postgresql-12-setup initdb</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable postgresql-12</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start postgresql-12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/usr/pgsql-12/bin/postgresql-12-setup initdb</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable postgresql-12</span></span>
<span class="line"><span style="color:#24292e;">systemctl start postgresql-12</span></span></code></pre></div><h2 id="_4-4-数据目录" tabindex="-1">4.4 数据目录 <a class="header-anchor" href="#_4-4-数据目录" aria-label="Permalink to &quot;4.4 数据目录&quot;">​</a></h2><ul><li>其数据目录是<code>/var/lib/pgsql/12/data</code></li><li>其二进制目录是<code>/usr/pgsql-12/bin/</code></li><li>/var/lib/pgsql/12/pgstartup.log</li></ul><h2 id="_4-5-pg-ctl-启停pg的服务" tabindex="-1">4.5 pg_ctl,启停pg的服务 <a class="header-anchor" href="#_4-5-pg-ctl-启停pg的服务" aria-label="Permalink to &quot;4.5 pg_ctl,启停pg的服务&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">关闭服务</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@db </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">]# su postgres -c </span><span style="color:#9ECBFF;">&#39;/usr/pgsql-12/bin/pg_ctl stop -D /var/lib/pgsql/12/data/ -l zsdpglog&#39;</span></span>
<span class="line"><span style="color:#B392F0;">启动服务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@db </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">]# su postgres -c </span><span style="color:#9ECBFF;">&#39;/usr/pgsql-12/bin/pg_ctl start -D /var/lib/pgsql/12/data/ -l zsdpglog&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">使用postgres,启动pg的服务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[postgres@db bin]$ ./postgres -D /var/lib/pgsql/12/data/ </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> /home/postgres/zsdstartupPg.log </span><span style="color:#F97583;">2&gt;&amp;1</span><span style="color:#E1E4E8;"> &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">关闭服务</span></span>
<span class="line"><span style="color:#24292E;">[root@db </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">]# su postgres -c </span><span style="color:#032F62;">&#39;/usr/pgsql-12/bin/pg_ctl stop -D /var/lib/pgsql/12/data/ -l zsdpglog&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">启动服务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@db </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">]# su postgres -c </span><span style="color:#032F62;">&#39;/usr/pgsql-12/bin/pg_ctl start -D /var/lib/pgsql/12/data/ -l zsdpglog&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">使用postgres,启动pg的服务</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[postgres@db bin]$ ./postgres -D /var/lib/pgsql/12/data/ </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> /home/postgres/zsdstartupPg.log </span><span style="color:#D73A49;">2&gt;&amp;1</span><span style="color:#24292E;"> &amp;</span></span></code></pre></div><h2 id="_4-6-centos8-yum" tabindex="-1">4.6 centos8_yum <a class="header-anchor" href="#_4-6-centos8-yum" aria-label="Permalink to &quot;4.6 centos8_yum&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1.下载并安装PostgreSQL官方yum源配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">dnf install https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2. 禁用系统内置yum源的PostgreSQL安装模块</span></span>
<span class="line"><span style="color:#e1e4e8;">CentOS8的内置yum源中已经提供PostgreSQL安装模块（但比官方提供的版本要旧），而在执行安装命令时，内置yum源的优先级高于其他yum源，因此要禁用内置yum源的PostgreSQL安装模块</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dnf module list postgresql</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dnf config-manager --disable pgdg11</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dnf config-manager --disable pgdg10</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dnf config-manager --disable pgdg96</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dnf config-manager --disable pgdg95</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">dnf module disable postgresql</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3. 安装PostgreSQL12的客户端和服务器端程序</span></span>
<span class="line"><span style="color:#e1e4e8;">dnf install postgresql12</span></span>
<span class="line"><span style="color:#e1e4e8;">dnf install postgresql12-server</span></span>
<span class="line"><span style="color:#e1e4e8;">dnf install postgresql12-contrib</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：程序安装目录是&quot;/usr/pgsql-12&quot;，程序运行目录是&quot;/var/run/postgresql&quot;，程序运行用户和组是&quot;postgres:postgres&quot;，&quot;postgres&quot;用户和组安装时默认创建</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">设置数据库实例的数据存储目录</span></span>
<span class="line"><span style="color:#e1e4e8;">数据库实例的默认数据存储目录是&quot;/var/lib/pgsql/12/data/&quot;。&quot;/var&quot;是一个系统目录，不宜存放大量业务数据。因此需要在初始化数据库实例之前设置数据存储目录</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">1）创建数据存储目录</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /data/pgsql12-data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2）设置数据存储目录的所有者用户和组为&quot;postgres:postgres&quot;，&quot;postgres&quot;用户和组在安装PostgreSQL12时已创建</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">chown postgres:postgres /data/pgsql12-data</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3）修改PostgreSQL12开机启动服务配置文件，设置为新的数据存储目录</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vim /usr/lib/systemd/system/postgresql-12.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1.下载并安装PostgreSQL官方yum源配置文件</span></span>
<span class="line"><span style="color:#24292e;">dnf install https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2. 禁用系统内置yum源的PostgreSQL安装模块</span></span>
<span class="line"><span style="color:#24292e;">CentOS8的内置yum源中已经提供PostgreSQL安装模块（但比官方提供的版本要旧），而在执行安装命令时，内置yum源的优先级高于其他yum源，因此要禁用内置yum源的PostgreSQL安装模块</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dnf module list postgresql</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dnf config-manager --disable pgdg11</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dnf config-manager --disable pgdg10</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dnf config-manager --disable pgdg96</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dnf config-manager --disable pgdg95</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">dnf module disable postgresql</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3. 安装PostgreSQL12的客户端和服务器端程序</span></span>
<span class="line"><span style="color:#24292e;">dnf install postgresql12</span></span>
<span class="line"><span style="color:#24292e;">dnf install postgresql12-server</span></span>
<span class="line"><span style="color:#24292e;">dnf install postgresql12-contrib</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：程序安装目录是&quot;/usr/pgsql-12&quot;，程序运行目录是&quot;/var/run/postgresql&quot;，程序运行用户和组是&quot;postgres:postgres&quot;，&quot;postgres&quot;用户和组安装时默认创建</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">设置数据库实例的数据存储目录</span></span>
<span class="line"><span style="color:#24292e;">数据库实例的默认数据存储目录是&quot;/var/lib/pgsql/12/data/&quot;。&quot;/var&quot;是一个系统目录，不宜存放大量业务数据。因此需要在初始化数据库实例之前设置数据存储目录</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">1）创建数据存储目录</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">mkdir /data/pgsql12-data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2）设置数据存储目录的所有者用户和组为&quot;postgres:postgres&quot;，&quot;postgres&quot;用户和组在安装PostgreSQL12时已创建</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">chown postgres:postgres /data/pgsql12-data</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3）修改PostgreSQL12开机启动服务配置文件，设置为新的数据存储目录</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vim /usr/lib/systemd/system/postgresql-12.service</span></span></code></pre></div><p>*　修改配置文件中的&quot;Environment&quot;参数项并保存</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description=PostgreSQL 12 database server</span></span>
<span class="line"><span style="color:#e1e4e8;">Documentation=https://www.postgresql.org/docs/12/static/</span></span>
<span class="line"><span style="color:#e1e4e8;">After=syslog.target</span></span>
<span class="line"><span style="color:#e1e4e8;">After=network.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">Type=notify</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">User=postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">Group=postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Location of database directory</span></span>
<span class="line"><span style="color:#e1e4e8;">#Environment=PGDATA=/var/lib/pgsql/12/data/</span></span>
<span class="line"><span style="color:#e1e4e8;">Environment=PGDATA=/data/pgsql12-data/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># This is normally controlled by the global default set by systemd</span></span>
<span class="line"><span style="color:#e1e4e8;"># StandardOutput=syslog</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Disable OOM kill on the postmaster</span></span>
<span class="line"><span style="color:#e1e4e8;">OOMScoreAdjust=-1000</span></span>
<span class="line"><span style="color:#e1e4e8;">Environment=PG_OOM_ADJUST_FILE=/proc/self/oom_score_adj</span></span>
<span class="line"><span style="color:#e1e4e8;">Environment=PG_OOM_ADJUST_VALUE=0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStartPre=/usr/pgsql-12/bin/postgresql-12-check-db-dir \${PGDATA}</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/usr/pgsql-12/bin/postmaster -D \${PGDATA}</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecReload=/bin/kill -HUP $MAINPID</span></span>
<span class="line"><span style="color:#e1e4e8;">KillMode=mixed</span></span>
<span class="line"><span style="color:#e1e4e8;">KillSignal=SIGINT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Do not set any timeout value, so that systemd will not kill postmaster</span></span>
<span class="line"><span style="color:#e1e4e8;"># during crash recovery.</span></span>
<span class="line"><span style="color:#e1e4e8;">TimeoutSec=0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description=PostgreSQL 12 database server</span></span>
<span class="line"><span style="color:#24292e;">Documentation=https://www.postgresql.org/docs/12/static/</span></span>
<span class="line"><span style="color:#24292e;">After=syslog.target</span></span>
<span class="line"><span style="color:#24292e;">After=network.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">Type=notify</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">User=postgres</span></span>
<span class="line"><span style="color:#24292e;">Group=postgres</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Location of database directory</span></span>
<span class="line"><span style="color:#24292e;">#Environment=PGDATA=/var/lib/pgsql/12/data/</span></span>
<span class="line"><span style="color:#24292e;">Environment=PGDATA=/data/pgsql12-data/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># This is normally controlled by the global default set by systemd</span></span>
<span class="line"><span style="color:#24292e;"># StandardOutput=syslog</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Disable OOM kill on the postmaster</span></span>
<span class="line"><span style="color:#24292e;">OOMScoreAdjust=-1000</span></span>
<span class="line"><span style="color:#24292e;">Environment=PG_OOM_ADJUST_FILE=/proc/self/oom_score_adj</span></span>
<span class="line"><span style="color:#24292e;">Environment=PG_OOM_ADJUST_VALUE=0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ExecStartPre=/usr/pgsql-12/bin/postgresql-12-check-db-dir \${PGDATA}</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/usr/pgsql-12/bin/postmaster -D \${PGDATA}</span></span>
<span class="line"><span style="color:#24292e;">ExecReload=/bin/kill -HUP $MAINPID</span></span>
<span class="line"><span style="color:#24292e;">KillMode=mixed</span></span>
<span class="line"><span style="color:#24292e;">KillSignal=SIGINT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Do not set any timeout value, so that systemd will not kill postmaster</span></span>
<span class="line"><span style="color:#24292e;"># during crash recovery.</span></span>
<span class="line"><span style="color:#24292e;">TimeoutSec=0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span></code></pre></div><h3 id="_2-2-初始化数据库实例" tabindex="-1"><strong>2.2 初始化数据库实例</strong> <a class="header-anchor" href="#_2-2-初始化数据库实例" aria-label="Permalink to &quot;**2.2 初始化数据库实例**&quot;">​</a></h3><p>进入程序安装目录下的&quot;bin&quot;目录下，执行&quot;postgresql-12-setup initdb&quot;命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd /usr/pgsql-12/bin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">./postgresql-12-setup initdb</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres /usr/pgsql-12/bin/pg_ctl -D /data/pgsql12-data init</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd /usr/pgsql-12/bin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">./postgresql-12-setup initdb</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">postgres /usr/pgsql-12/bin/pg_ctl -D /data/pgsql12-data init</span></span></code></pre></div><h3 id="_2-3-启动数据库实例服务-并设置为开机自动启动" tabindex="-1"><strong>2.3 启动数据库实例服务，并设置为开机自动启动</strong> <a class="header-anchor" href="#_2-3-启动数据库实例服务-并设置为开机自动启动" aria-label="Permalink to &quot;**2.3 启动数据库实例服务，并设置为开机自动启动**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl enable postgresql-12.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start postgresql-12.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl enable postgresql-12.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl start postgresql-12.service</span></span></code></pre></div><h3 id="_2-4-设置数据库实例超级管理员账户-postgres-的口令" tabindex="-1"><strong>2.4 设置数据库实例超级管理员账户&quot;postgres&quot;的口令</strong> <a class="header-anchor" href="#_2-4-设置数据库实例超级管理员账户-postgres-的口令" aria-label="Permalink to &quot;**2.4 设置数据库实例超级管理员账户&quot;postgres&quot;的口令**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">PostgreSQL12安装完成后&quot;postgres&quot;的默认口令为空，为空时无法使用该用户登录数据库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">passwd postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">su postgres</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">bash-4.4$ psql</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.3)</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# alter user postgres with password &#39;gis&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER ROLE</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# \\q</span></span>
<span class="line"><span style="color:#e1e4e8;">bash-4.4$ exit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">PostgreSQL12安装完成后&quot;postgres&quot;的默认口令为空，为空时无法使用该用户登录数据库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">passwd postgres</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">su postgres</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">bash-4.4$ psql</span></span>
<span class="line"><span style="color:#24292e;">psql (12.3)</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# alter user postgres with password &#39;gis&#39;;</span></span>
<span class="line"><span style="color:#24292e;">ALTER ROLE</span></span>
<span class="line"><span style="color:#24292e;">postgres=# \\q</span></span>
<span class="line"><span style="color:#24292e;">bash-4.4$ exit</span></span></code></pre></div><h1 id="五、源码安装" tabindex="-1">五、源码安装 <a class="header-anchor" href="#五、源码安装" aria-label="Permalink to &quot;五、源码安装&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">./configure</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--prefix=/data/apps/pgsql/version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--enable-nls</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--without-python</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-tcl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-gssapi</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-icu</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-openssl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-pam</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--with-ldap</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-systemd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-libxml</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-lz4</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-libxslt</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-perl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--enable-thread-safety</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-wal-blocksize=8</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-blocksize=8</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-segsize=10</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--with-pgport=15432</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--enable-dtrace</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--enable-depend</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--enable-cassert</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--enable-debug</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">gmake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">world</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">gmake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install-world</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">./configure</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--prefix=/data/apps/pgsql/version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--enable-nls</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--without-python</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-tcl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-gssapi</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-icu</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-openssl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-pam</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--with-ldap</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-systemd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-libxml</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-lz4</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-libxslt</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-perl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--enable-thread-safety</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-wal-blocksize=8</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-blocksize=8</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-segsize=10</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--with-pgport=15432</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--enable-dtrace</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--enable-depend</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--enable-cassert</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--enable-debug</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">gmake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">world</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">gmake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install-world</span></span></code></pre></div><h1 id="六、扩展安装" tabindex="-1">六、扩展安装 <a class="header-anchor" href="#六、扩展安装" aria-label="Permalink to &quot;六、扩展安装&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">下载文件并解压</span></span>
<span class="line"><span style="color:#e1e4e8;"># su - postgres</span></span>
<span class="line"><span style="color:#e1e4e8;">$ cd /soft</span></span>
<span class="line"><span style="color:#e1e4e8;">$ wget https://ftp.postgresql.org/pub/source/v12.1/postgresql-12.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">$ tar -zxvf postgresql-12.1.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">编译</span></span>
<span class="line"><span style="color:#e1e4e8;">$ cd postgresql-12.1/</span></span>
<span class="line"><span style="color:#e1e4e8;">$ ./configure --prefix=/opt/pg12 --with-pgport=5555</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">建议修改一下端口，不采用默认5432端口</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">安装</span></span>
<span class="line"><span style="color:#e1e4e8;">使用gmake 或者gmake world</span></span>
<span class="line"><span style="color:#e1e4e8;">$ gmake world</span></span>
<span class="line"><span style="color:#e1e4e8;">当看到最后一行显示为：</span></span>
<span class="line"><span style="color:#e1e4e8;">PostgreSQL, contrib, and documentation successfully made. Ready to install.</span></span>
<span class="line"><span style="color:#e1e4e8;">说明已经编译成功</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">使用gmake install或者gmake install-world 进行安装</span></span>
<span class="line"><span style="color:#e1e4e8;">$ gmake install-world //包含扩展包和文档</span></span>
<span class="line"><span style="color:#e1e4e8;">当看到最后一行显示为：</span></span>
<span class="line"><span style="color:#e1e4e8;">PostgreSQL, contrib, and documentation installation complete.</span></span>
<span class="line"><span style="color:#e1e4e8;">说明已经安装成功</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查看版本</span></span>
<span class="line"><span style="color:#e1e4e8;">$ /opt/pg12/bin/postgres --version</span></span>
<span class="line"><span style="color:#e1e4e8;">postgres (PostgreSQL) 12.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">下载文件并解压</span></span>
<span class="line"><span style="color:#24292e;"># su - postgres</span></span>
<span class="line"><span style="color:#24292e;">$ cd /soft</span></span>
<span class="line"><span style="color:#24292e;">$ wget https://ftp.postgresql.org/pub/source/v12.1/postgresql-12.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">$ tar -zxvf postgresql-12.1.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">编译</span></span>
<span class="line"><span style="color:#24292e;">$ cd postgresql-12.1/</span></span>
<span class="line"><span style="color:#24292e;">$ ./configure --prefix=/opt/pg12 --with-pgport=5555</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">建议修改一下端口，不采用默认5432端口</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">安装</span></span>
<span class="line"><span style="color:#24292e;">使用gmake 或者gmake world</span></span>
<span class="line"><span style="color:#24292e;">$ gmake world</span></span>
<span class="line"><span style="color:#24292e;">当看到最后一行显示为：</span></span>
<span class="line"><span style="color:#24292e;">PostgreSQL, contrib, and documentation successfully made. Ready to install.</span></span>
<span class="line"><span style="color:#24292e;">说明已经编译成功</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">使用gmake install或者gmake install-world 进行安装</span></span>
<span class="line"><span style="color:#24292e;">$ gmake install-world //包含扩展包和文档</span></span>
<span class="line"><span style="color:#24292e;">当看到最后一行显示为：</span></span>
<span class="line"><span style="color:#24292e;">PostgreSQL, contrib, and documentation installation complete.</span></span>
<span class="line"><span style="color:#24292e;">说明已经安装成功</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查看版本</span></span>
<span class="line"><span style="color:#24292e;">$ /opt/pg12/bin/postgres --version</span></span>
<span class="line"><span style="color:#24292e;">postgres (PostgreSQL) 12.1</span></span></code></pre></div>`,52),o=[e];function t(c,r,i,y,E,d){return a(),n("div",null,o)}const F=s(p,[["render",t]]);export{u as __pageData,F as default};
