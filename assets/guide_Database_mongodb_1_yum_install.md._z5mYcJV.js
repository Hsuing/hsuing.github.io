import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"安装文件下载","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/1_yum_install.md","filePath":"guide/Database/mongodb/1_yum_install.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/1_yum_install.md"},o=e(`<p>centos8.x</p><p>mongodb5.0</p><blockquote><p>在centos7.5以下 yum方式安装有问题，启动失败，建议mongodb5.x 在centos8上安装</p></blockquote><h1 id="安装文件下载" tabindex="-1">安装文件下载 <a class="header-anchor" href="#安装文件下载" aria-label="Permalink to &quot;安装文件下载&quot;">​</a></h1><ul><li>官网地址：<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">https://www.mongodb.com/</a></li><li>下载地址：<a href="https://www.mongodb.com/try/download" target="_blank" rel="noreferrer">https://www.mongodb.com/try/download</a></li><li>下载地址（社区）：<a href="https://www.mongodb.com/try/download/community" target="_blank" rel="noreferrer">https://www.mongodb.com/try/download/community</a></li><li>下载地址（工具）：<a href="https://www.mongodb.com/try/download/tools" target="_blank" rel="noreferrer">https://www.mongodb.com/try/download/tools</a></li></ul><h2 id="安装文件列表" tabindex="-1">安装文件列表 <a class="header-anchor" href="#安装文件列表" aria-label="Permalink to &quot;安装文件列表&quot;">​</a></h2><ul><li>mongodb-org-server-5.0.3-1.el7.x86_64.rpm</li><li>mongodb-org-mongos-5.0.3-1.el7.x86_64.rpm</li><li>mongodb-org-shell-5.0.3-1.el7.x86_64.rpm</li><li>mongodb-database-tools-rhel70-x86_64-100.5.0.rpm</li></ul><h1 id="_1-安装" tabindex="-1">1.安装 <a class="header-anchor" href="#_1-安装" aria-label="Permalink to &quot;1.安装&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/yum.repos.d/mongodb-org-5.0.repo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[mongodb-org-5.0]</span></span>
<span class="line"><span style="color:#e1e4e8;">name=MongoDB Repository</span></span>
<span class="line"><span style="color:#e1e4e8;">baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/</span></span>
<span class="line"><span style="color:#e1e4e8;">gpgcheck=1</span></span>
<span class="line"><span style="color:#e1e4e8;">enabled=1</span></span>
<span class="line"><span style="color:#e1e4e8;">gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/yum.repos.d/mongodb-org-5.0.repo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[mongodb-org-5.0]</span></span>
<span class="line"><span style="color:#24292e;">name=MongoDB Repository</span></span>
<span class="line"><span style="color:#24292e;">baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/</span></span>
<span class="line"><span style="color:#24292e;">gpgcheck=1</span></span>
<span class="line"><span style="color:#24292e;">enabled=1</span></span>
<span class="line"><span style="color:#24292e;">gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#安装最新版</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y mongodb-org</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定版本安装</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install -y mongodb-org-5.0.2 mongodb-org-database-5.0.2 mongodb-org-server-5.0.2 mongodb-org-shell-5.0.2 mongodb-org-mongos-5.0.2 mongodb-org-tools-5.0.2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#安装最新版</span></span>
<span class="line"><span style="color:#24292e;">yum install -y mongodb-org</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定版本安装</span></span>
<span class="line"><span style="color:#24292e;">yum install -y mongodb-org-5.0.2 mongodb-org-database-5.0.2 mongodb-org-server-5.0.2 mongodb-org-shell-5.0.2 mongodb-org-mongos-5.0.2 mongodb-org-tools-5.0.2</span></span></code></pre></div><h2 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl start mongod</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#开机启动</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable mongod</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl start mongod</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#开机启动</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable mongod</span></span></code></pre></div><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/mongod.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/mongod.conf</span></span></code></pre></div><ul><li>开启认证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">security:</span></span>
<span class="line"><span style="color:#e1e4e8;">  authorization: enabled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">security:</span></span>
<span class="line"><span style="color:#24292e;">  authorization: enabled</span></span></code></pre></div><ul><li>修改mongod.service</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim /usr/lib/systemd/system/mongod.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Environment=&quot;OPTIONS=--auth -f /etc/mongod.conf&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim /usr/lib/systemd/system/mongod.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Environment=&quot;OPTIONS=--auth -f /etc/mongod.conf&quot;</span></span></code></pre></div><ul><li>重启</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart mongod</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;">systemctl restart mongod</span></span></code></pre></div><h2 id="配置admin密码" tabindex="-1">配置admin密码 <a class="header-anchor" href="#配置admin密码" aria-label="Permalink to &quot;配置admin密码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">user: &quot;mongouseradmin&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">pwd: passwordPrompt(), // or cleartext password</span></span>
<span class="line"><span style="color:#e1e4e8;">roles: [ { role: &quot;userAdminAnyDatabase&quot;, db: &quot;admin&quot; }, &quot;readWriteAnyDatabase&quot; ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">user: &quot;mongouseradmin&quot;,</span></span>
<span class="line"><span style="color:#24292e;">pwd: passwordPrompt(), // or cleartext password</span></span>
<span class="line"><span style="color:#24292e;">roles: [ { role: &quot;userAdminAnyDatabase&quot;, db: &quot;admin&quot; }, &quot;readWriteAnyDatabase&quot; ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div><h2 id="登陆" tabindex="-1">登陆 <a class="header-anchor" href="#登陆" aria-label="Permalink to &quot;登陆&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave01 ~]# mongo -u mongouser -p --authenticationDatabase admin</span></span>
<span class="line"><span style="color:#e1e4e8;">MongoDB shell version v5.0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter password:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave01 ~]# mongo -u mongouser -p --authenticationDatabase admin</span></span>
<span class="line"><span style="color:#24292e;">MongoDB shell version v5.0.5</span></span>
<span class="line"><span style="color:#24292e;">Enter password:</span></span></code></pre></div><h2 id="卸载" tabindex="-1">卸载 <a class="header-anchor" href="#卸载" aria-label="Permalink to &quot;卸载&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum erase $(rpm -qa | grep mongodb-org)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum erase $(rpm -qa | grep mongodb-org)</span></span></code></pre></div><ul><li>systemd</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave01 etc]# cat /usr/lib/systemd/system/mongod.service</span></span>
<span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description=MongoDB Database Server</span></span>
<span class="line"><span style="color:#e1e4e8;">Documentation=https://docs.mongodb.org/manual</span></span>
<span class="line"><span style="color:#e1e4e8;">After=network-online.target</span></span>
<span class="line"><span style="color:#e1e4e8;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">User=mongod</span></span>
<span class="line"><span style="color:#e1e4e8;">Group=mongod</span></span>
<span class="line"><span style="color:#e1e4e8;">Environment=&quot;OPTIONS=-f /etc/mongod.conf&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">EnvironmentFile=-/etc/sysconfig/mongod</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/usr/bin/mongod $OPTIONS</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStartPre=/usr/bin/mkdir -p /var/run/mongodb</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStartPre=/usr/bin/chown mongod:mongod /var/run/mongodb</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStartPre=/usr/bin/chmod 0755 /var/run/mongodb</span></span>
<span class="line"><span style="color:#e1e4e8;">PermissionsStartOnly=true</span></span>
<span class="line"><span style="color:#e1e4e8;">PIDFile=/var/run/mongodb/mongod.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">Type=forking</span></span>
<span class="line"><span style="color:#e1e4e8;"># file size</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitFSIZE=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># cpu time</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitCPU=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># virtual memory size</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitAS=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># open files</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNOFILE=64000</span></span>
<span class="line"><span style="color:#e1e4e8;"># processes/threads</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNPROC=64000</span></span>
<span class="line"><span style="color:#e1e4e8;"># locked memory</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitMEMLOCK=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;"># total threads (user+kernel)</span></span>
<span class="line"><span style="color:#e1e4e8;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#e1e4e8;">TasksAccounting=false</span></span>
<span class="line"><span style="color:#e1e4e8;"># Recommended limits for mongod as specified in</span></span>
<span class="line"><span style="color:#e1e4e8;"># https://docs.mongodb.com/manual/reference/ulimit/#recommended-ulimit-settings</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave01 etc]# cat /usr/lib/systemd/system/mongod.service</span></span>
<span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description=MongoDB Database Server</span></span>
<span class="line"><span style="color:#24292e;">Documentation=https://docs.mongodb.org/manual</span></span>
<span class="line"><span style="color:#24292e;">After=network-online.target</span></span>
<span class="line"><span style="color:#24292e;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">User=mongod</span></span>
<span class="line"><span style="color:#24292e;">Group=mongod</span></span>
<span class="line"><span style="color:#24292e;">Environment=&quot;OPTIONS=-f /etc/mongod.conf&quot;</span></span>
<span class="line"><span style="color:#24292e;">EnvironmentFile=-/etc/sysconfig/mongod</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/usr/bin/mongod $OPTIONS</span></span>
<span class="line"><span style="color:#24292e;">ExecStartPre=/usr/bin/mkdir -p /var/run/mongodb</span></span>
<span class="line"><span style="color:#24292e;">ExecStartPre=/usr/bin/chown mongod:mongod /var/run/mongodb</span></span>
<span class="line"><span style="color:#24292e;">ExecStartPre=/usr/bin/chmod 0755 /var/run/mongodb</span></span>
<span class="line"><span style="color:#24292e;">PermissionsStartOnly=true</span></span>
<span class="line"><span style="color:#24292e;">PIDFile=/var/run/mongodb/mongod.pid</span></span>
<span class="line"><span style="color:#24292e;">Type=forking</span></span>
<span class="line"><span style="color:#24292e;"># file size</span></span>
<span class="line"><span style="color:#24292e;">LimitFSIZE=infinity</span></span>
<span class="line"><span style="color:#24292e;"># cpu time</span></span>
<span class="line"><span style="color:#24292e;">LimitCPU=infinity</span></span>
<span class="line"><span style="color:#24292e;"># virtual memory size</span></span>
<span class="line"><span style="color:#24292e;">LimitAS=infinity</span></span>
<span class="line"><span style="color:#24292e;"># open files</span></span>
<span class="line"><span style="color:#24292e;">LimitNOFILE=64000</span></span>
<span class="line"><span style="color:#24292e;"># processes/threads</span></span>
<span class="line"><span style="color:#24292e;">LimitNPROC=64000</span></span>
<span class="line"><span style="color:#24292e;"># locked memory</span></span>
<span class="line"><span style="color:#24292e;">LimitMEMLOCK=infinity</span></span>
<span class="line"><span style="color:#24292e;"># total threads (user+kernel)</span></span>
<span class="line"><span style="color:#24292e;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#24292e;">TasksAccounting=false</span></span>
<span class="line"><span style="color:#24292e;"># Recommended limits for mongod as specified in</span></span>
<span class="line"><span style="color:#24292e;"># https://docs.mongodb.com/manual/reference/ulimit/#recommended-ulimit-settings</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span></code></pre></div>`,28),p=[o];function t(c,i,r,d,m,y){return n(),a("div",null,p)}const h=s(l,[["render",t]]);export{u as __pageData,h as default};
