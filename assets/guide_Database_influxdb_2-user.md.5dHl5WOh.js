import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"一、用户","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/2-user.md","filePath":"guide/Database/influxdb/2-user.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/2-user.md"},p=e(`<h1 id="一、用户" tabindex="-1">一、用户 <a class="header-anchor" href="#一、用户" aria-label="Permalink to &quot;一、用户&quot;">​</a></h1><ul><li>安装完毕之后，默认没有开启权限，因此可以直接连接</li></ul><p>官方文档，<a href="https://docs.influxdata.com/influxdb/v1.7/administration/authentication_and_authorization/#set-up-authentication" target="_blank" rel="noreferrer">https://docs.influxdata.com/influxdb/v1.7/administration/authentication_and_authorization/#set-up-authentication</a></p><h2 id="_1-0-创建用户和设置密码并授权" tabindex="-1">1.0 创建用户和设置密码并授权 <a class="header-anchor" href="#_1-0-创建用户和设置密码并授权" aria-label="Permalink to &quot;1.0 创建用户和设置密码并授权&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">## 创建用户和设置密码,需要注意的是密码必须使用引号括起来</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; CREATE USER testuser WITH PASSWORD &#39;testpwd&#39; with all privileges;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">## 创建用户和设置密码,需要注意的是密码必须使用引号括起来</span></span>
<span class="line"><span style="color:#24292e;">&gt; CREATE USER testuser WITH PASSWORD &#39;testpwd&#39; with all privileges;</span></span></code></pre></div><h3 id="开启权限校验" tabindex="-1">开启权限校验 <a class="header-anchor" href="#开启权限校验" aria-label="Permalink to &quot;开启权限校验&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim /etc/influxdb/influxdb.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 开启配置</span></span>
<span class="line"><span style="color:#e1e4e8;">[http]</span></span>
<span class="line"><span style="color:#e1e4e8;">enabled = true</span></span>
<span class="line"><span style="color:#e1e4e8;">bind-address = &quot;:8086&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">auth-enabled = true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim /etc/influxdb/influxdb.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 开启配置</span></span>
<span class="line"><span style="color:#24292e;">[http]</span></span>
<span class="line"><span style="color:#24292e;">enabled = true</span></span>
<span class="line"><span style="color:#24292e;">bind-address = &quot;:8086&quot;</span></span>
<span class="line"><span style="color:#24292e;">auth-enabled = true</span></span></code></pre></div><ul><li><p>重启并测试</p></li><li><p>连接测试</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">influx -username admin -password admin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定host port 登陆</span></span>
<span class="line"><span style="color:#e1e4e8;">influx  -host &#39;localhost&#39; -port &#39;8086&#39; -username &#39;admin&#39; -password &#39;root123&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">$ influx -precision rfc3339</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.7.7</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.7.7</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; auth</span></span>
<span class="line"><span style="color:#e1e4e8;">username: rw_influxdb_de</span></span>
<span class="line"><span style="color:#e1e4e8;">password: </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;auth username password</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">influx -username admin -password admin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定host port 登陆</span></span>
<span class="line"><span style="color:#24292e;">influx  -host &#39;localhost&#39; -port &#39;8086&#39; -username &#39;admin&#39; -password &#39;root123&#39; </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">$ influx -precision rfc3339</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.7.7</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.7.7</span></span>
<span class="line"><span style="color:#24292e;">&gt; auth</span></span>
<span class="line"><span style="color:#24292e;">username: rw_influxdb_de</span></span>
<span class="line"><span style="color:#24292e;">password: </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">&gt;auth username password</span></span></code></pre></div><h2 id="_1-1启动方式" tabindex="-1">1.1启动方式 <a class="header-anchor" href="#_1-1启动方式" aria-label="Permalink to &quot;1.1启动方式&quot;">​</a></h2><p>格式：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">influx </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">format</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">format</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">influx </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">format</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">format</span><span style="color:#24292E;">]</span></span></code></pre></div><p>format ： 启动格式，支持column,csv,json三种格式，默认为column</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# influx -format=csv</span></span>
<span class="line"><span style="color:#e1e4e8;">Visit https://enterprise.influxdata.com to register for updates, InfluxDB server management, and monitoring.</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">name,name</span></span>
<span class="line"><span style="color:#e1e4e8;">databases,_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">databases,testdb</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; exit</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# influx -format=json</span></span>
<span class="line"><span style="color:#e1e4e8;">Visit https://enterprise.influxdata.com to register for updates, InfluxDB server management, and monitoring.</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;results&quot;:[{&quot;series&quot;:[{&quot;name&quot;:&quot;databases&quot;,&quot;columns&quot;:[&quot;name&quot;],&quot;values&quot;:[[&quot;_internal&quot;],[&quot;testdb&quot;]]}]}]}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; exit</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@localhost ~]# influx -format=json -pretty</span></span>
<span class="line"><span style="color:#e1e4e8;">Visit https://enterprise.influxdata.com to register for updates, InfluxDB server management, and monitoring.</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;results&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;series&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;name&quot;: &quot;databases&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;columns&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                        &quot;name&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;values&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                        [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            &quot;_internal&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">                        [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            &quot;testdb&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ]</span></span>
<span class="line"><span style="color:#e1e4e8;">                    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@localhost ~]# influx -format=csv</span></span>
<span class="line"><span style="color:#24292e;">Visit https://enterprise.influxdata.com to register for updates, InfluxDB server management, and monitoring.</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.1.0</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.1.0</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">name,name</span></span>
<span class="line"><span style="color:#24292e;">databases,_internal</span></span>
<span class="line"><span style="color:#24292e;">databases,testdb</span></span>
<span class="line"><span style="color:#24292e;">&gt; exit</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# influx -format=json</span></span>
<span class="line"><span style="color:#24292e;">Visit https://enterprise.influxdata.com to register for updates, InfluxDB server management, and monitoring.</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.1.0</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.1.0</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">{&quot;results&quot;:[{&quot;series&quot;:[{&quot;name&quot;:&quot;databases&quot;,&quot;columns&quot;:[&quot;name&quot;],&quot;values&quot;:[[&quot;_internal&quot;],[&quot;testdb&quot;]]}]}]}</span></span>
<span class="line"><span style="color:#24292e;">&gt; exit</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@localhost ~]# influx -format=json -pretty</span></span>
<span class="line"><span style="color:#24292e;">Visit https://enterprise.influxdata.com to register for updates, InfluxDB server management, and monitoring.</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.1.0</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.1.0</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;results&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;series&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                {</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;name&quot;: &quot;databases&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;columns&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                        &quot;name&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    ],</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;values&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                        [</span></span>
<span class="line"><span style="color:#24292e;">                            &quot;_internal&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        ],</span></span>
<span class="line"><span style="color:#24292e;">                        [</span></span>
<span class="line"><span style="color:#24292e;">                            &quot;testdb&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        ]</span></span>
<span class="line"><span style="color:#24292e;">                    ]</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            ]</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><h2 id="_1-2-设置用户并赋权" tabindex="-1">1.2 设置用户并赋权 <a class="header-anchor" href="#_1-2-设置用户并赋权" aria-label="Permalink to &quot;1.2 设置用户并赋权&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; GRANT ALL PRIVILEGES ON db_name TO testuser ## 授权数据库给指定用户</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; GRANT ALL PRIVILEGES ON db_name TO testuser ## 授权数据库给指定用户</span></span></code></pre></div><h1 id="二、权限管理" tabindex="-1">二、权限管理 <a class="header-anchor" href="#二、权限管理" aria-label="Permalink to &quot;二、权限管理&quot;">​</a></h1><h2 id="_2-0-用户类型及其权限" tabindex="-1">2.0 用户类型及其权限 <a class="header-anchor" href="#_2-0-用户类型及其权限" aria-label="Permalink to &quot;2.0 用户类型及其权限&quot;">​</a></h2><h3 id="管理员" tabindex="-1">管理员 <a class="header-anchor" href="#管理员" aria-label="Permalink to &quot;管理员&quot;">​</a></h3><p>所有管理员有所有数据库的读写权限，并且可以执行以下所有的管理类查询语句：</p><p>数据库管理：</p><p>◦ <code>CREATE DATABASE</code>, 和 <code>DROP DATABASE</code> ◦ <code>DROP SERIES</code> 和 <code>DROP MEASUREMENT</code> ◦ <code>CREATE RETENTION POLICY</code>, <code>ALTER RETENTION POLICY</code>, 和 <code>DROP RETENTION POLICY</code> ◦ <code>CREATE CONTINUOUS QUERY</code> 和 <code>DROP CONTINUOUS QUERY</code></p><p>用户管理： ◦ Admin user management: <code>CREATE USER</code>, <code>GRANT ALL PRIVILEGES</code>, <code>REVOKE ALL PRIVILEGES</code>, 和 <code>SHOW USERS</code> ◦ Non-admin user management: <code>CREATE USER</code>, <code>GRANT [READ,WRITE,ALL], REVOKE [READ,WRITE,ALL</code>], 和 <code>SHOW GRANTS</code> ◦ General user management: <code>SET PASSWORD</code> 和 <code>DROP USER</code></p><h3 id="非管理员用户" tabindex="-1">非管理员用户 <a class="header-anchor" href="#非管理员用户" aria-label="Permalink to &quot;非管理员用户&quot;">​</a></h3><p>非管理员用户可以赋一种权限： ◦ <code>READ</code> ◦ <code>WRITE</code> ◦ <code>ALL</code> (<code>READ</code> 和 <code>WRITE</code> ) 这三种情况可以赋给每个用户，每个数据库</p><h2 id="_2-1-用户管理" tabindex="-1">2.1 用户管理 <a class="header-anchor" href="#_2-1-用户管理" aria-label="Permalink to &quot;2.1 用户管理&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;create user xxx with password &#39;pwd&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;create user xxx with password &#39;pwd&#39;</span></span></code></pre></div><h2 id="_2-2-重设密码" tabindex="-1">2.2 重设密码 <a class="header-anchor" href="#_2-2-重设密码" aria-label="Permalink to &quot;2.2 重设密码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;set password for xxx=&#39;newpwd&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;set password for xxx=&#39;newpwd&#39;</span></span></code></pre></div><h2 id="_2-3-删除用户" tabindex="-1">2.3 删除用户 <a class="header-anchor" href="#_2-3-删除用户" aria-label="Permalink to &quot;2.3 删除用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;drop user xxx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;drop user xxx</span></span></code></pre></div><h2 id="_2-4-查看用户" tabindex="-1">2.4 查看用户 <a class="header-anchor" href="#_2-4-查看用户" aria-label="Permalink to &quot;2.4 查看用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;show users</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;show users</span></span></code></pre></div><h2 id="_2-5-针对用户进行授权和回收" tabindex="-1">2.5 针对用户进行授权和回收 <a class="header-anchor" href="#_2-5-针对用户进行授权和回收" aria-label="Permalink to &quot;2.5 针对用户进行授权和回收&quot;">​</a></h2><ul><li>授权</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;GRANT ALL PRIVILEGES TO &lt;username&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;GRANT [READ,WRITE,ALL] ON &lt;database_name&gt; TO &lt;username&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;GRANT ALL PRIVILEGES TO &lt;username&gt;</span></span>
<span class="line"><span style="color:#24292e;">&gt;GRANT [READ,WRITE,ALL] ON &lt;database_name&gt; TO &lt;username&gt;</span></span></code></pre></div><ul><li>回收</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;REVOKE ALL PRIVILEGES FROM &lt;username&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;REVOKE [READ,WRITE,ALL] ON &lt;database_name&gt; FROM &lt;username&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;REVOKE ALL PRIVILEGES FROM &lt;username&gt;</span></span>
<span class="line"><span style="color:#24292e;">&gt;REVOKE [READ,WRITE,ALL] ON &lt;database_name&gt; FROM &lt;username&gt;</span></span></code></pre></div><h2 id="_2-6-权限查询" tabindex="-1">2.6 权限查询 <a class="header-anchor" href="#_2-6-权限查询" aria-label="Permalink to &quot;2.6 权限查询&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;show grants for &lt;username&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;show grants for &lt;username&gt;</span></span></code></pre></div><h2 id="_2-7创建admin-用户" tabindex="-1">2.7创建admin 用户 <a class="header-anchor" href="#_2-7创建admin-用户" aria-label="Permalink to &quot;2.7创建admin 用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;create user &quot;admin&quot; with password &#39;admin&#39; with all privileges;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;show users;</span></span>
<span class="line"><span style="color:#e1e4e8;">user           admin</span></span>
<span class="line"><span style="color:#e1e4e8;">----           -----</span></span>
<span class="line"><span style="color:#e1e4e8;">admin          true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;create user &quot;admin&quot; with password &#39;admin&#39; with all privileges;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">&gt;show users;</span></span>
<span class="line"><span style="color:#24292e;">user           admin</span></span>
<span class="line"><span style="color:#24292e;">----           -----</span></span>
<span class="line"><span style="color:#24292e;">admin          true</span></span></code></pre></div><h2 id="_1-3" tabindex="-1">1.3 <a class="header-anchor" href="#_1-3" aria-label="Permalink to &quot;1.3&quot;">​</a></h2><blockquote><p>CREATE RETENTION POLICY &quot;cadvisor_retention&quot; ON &quot;cadvisor&quot; DURATION 30d REPLICATION 1 DEFAULT ## 创建默认的数据保留策略，设置保存时间30天，副本为1</p></blockquote>`,44),o=[p];function t(c,i,r,d,u,h){return a(),n("div",null,o)}const m=s(l,[["render",t]]);export{g as __pageData,m as default};
