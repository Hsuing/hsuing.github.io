import{_ as a,D as n,o as e,c as l,I as p,w as o,R as t,a as c}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"一、介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/9-permition.md","filePath":"guide/Database/influxdb/9-permition.md","lastUpdated":1720533756000}'),r={name:"guide/Database/influxdb/9-permition.md"},i=t(`<h1 id="一、介绍" tabindex="-1">一、介绍 <a class="header-anchor" href="#一、介绍" aria-label="Permalink to &quot;一、介绍&quot;">​</a></h1><p>权限认证机制，顾名思义，就是对 InfluxDB 数据库添加权限访问控制，在默认情况下，InfluxDB 的权限认证机制是关闭的，也就是说所有用户都有所有权限</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ influx -precision rfc3339</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.7.7</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.7.7</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERR: unable to parse authentication credentials</span></span>
<span class="line"><span style="color:#e1e4e8;">Warning: It is possible this error is due to not setting a database.</span></span>
<span class="line"><span style="color:#e1e4e8;">Please set a database with the command &quot;use &lt;database&gt;&quot;.</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; auth</span></span>
<span class="line"><span style="color:#e1e4e8;">username: rw_influxdb_de</span></span>
<span class="line"><span style="color:#e1e4e8;">password: </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: databases</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">kwang_db</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ influx -precision rfc3339</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.7.7</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.7.7</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">ERR: unable to parse authentication credentials</span></span>
<span class="line"><span style="color:#24292e;">Warning: It is possible this error is due to not setting a database.</span></span>
<span class="line"><span style="color:#24292e;">Please set a database with the command &quot;use &lt;database&gt;&quot;.</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; auth</span></span>
<span class="line"><span style="color:#24292e;">username: rw_influxdb_de</span></span>
<span class="line"><span style="color:#24292e;">password: </span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">name: databases</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">_internal</span></span>
<span class="line"><span style="color:#24292e;">kwang_db</span></span></code></pre></div><h1 id="二、开启-influxdb-权限认证机制" tabindex="-1">二、开启 InfluxDB 权限认证机制 <a class="header-anchor" href="#二、开启-influxdb-权限认证机制" aria-label="Permalink to &quot;二、开启 InfluxDB 权限认证机制&quot;">​</a></h1><p>开启 InfluxDB 权限认证机制有三步：</p><ul><li>添加 admin 账号，至少添加一个 admin 账号；</li><li>修改 InfluxDB 配置文件；</li><li>重启 InfluxDB 服务；</li></ul><h2 id="_2-1-添加-admin-账号" tabindex="-1">2.1 添加 admin 账号 <a class="header-anchor" href="#_2-1-添加-admin-账号" aria-label="Permalink to &quot;2.1 添加 admin 账号&quot;">​</a></h2><p>在初次登录时，InfluxDB 是没有开启权限认证的，可以通过如下操作添加一个 admin 账号：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; create user admin with password &#39;123456&#39; with all privileges;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; create user admin with password &#39;123456&#39; with all privileges;</span></span></code></pre></div><p>查看 rw_influxdb 账号是否属于 admin 账号</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show users;</span></span>
<span class="line"><span style="color:#e1e4e8;">user           admin</span></span>
<span class="line"><span style="color:#e1e4e8;">----           -----</span></span>
<span class="line"><span style="color:#e1e4e8;">admin true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show users;</span></span>
<span class="line"><span style="color:#24292e;">user           admin</span></span>
<span class="line"><span style="color:#24292e;">----           -----</span></span>
<span class="line"><span style="color:#24292e;">admin true</span></span></code></pre></div><h2 id="_2-2-修改-influxdb-配置文件" tabindex="-1">2.2 修改 InfluxDB 配置文件 <a class="header-anchor" href="#_2-2-修改-influxdb-配置文件" aria-label="Permalink to &quot;2.2 修改 InfluxDB 配置文件&quot;">​</a></h2><p>修改 /etc/influxdb/influxdb.conf 配置文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[http]</span></span>
<span class="line"><span style="color:#e1e4e8;">  enabled = true</span></span>
<span class="line"><span style="color:#e1e4e8;">  bind-address = &quot;:8086&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  auth-enabled = true</span></span>
<span class="line"><span style="color:#e1e4e8;">  log-enabled = true</span></span>
<span class="line"><span style="color:#e1e4e8;">  write-tracing = false</span></span>
<span class="line"><span style="color:#e1e4e8;">  pprof-enabled = false</span></span>
<span class="line"><span style="color:#e1e4e8;">  https-enabled = false</span></span>
<span class="line"><span style="color:#e1e4e8;">  #https-certificate = &quot;/etc/ssl/influxdb.pem&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[http]</span></span>
<span class="line"><span style="color:#24292e;">  enabled = true</span></span>
<span class="line"><span style="color:#24292e;">  bind-address = &quot;:8086&quot;</span></span>
<span class="line"><span style="color:#24292e;">  auth-enabled = true</span></span>
<span class="line"><span style="color:#24292e;">  log-enabled = true</span></span>
<span class="line"><span style="color:#24292e;">  write-tracing = false</span></span>
<span class="line"><span style="color:#24292e;">  pprof-enabled = false</span></span>
<span class="line"><span style="color:#24292e;">  https-enabled = false</span></span>
<span class="line"><span style="color:#24292e;">  #https-certificate = &quot;/etc/ssl/influxdb.pem&quot;</span></span></code></pre></div><h2 id="_2-3-重启-influxdb-服务" tabindex="-1">2.3 重启 InfluxDB 服务 <a class="header-anchor" href="#_2-3-重启-influxdb-服务" aria-label="Permalink to &quot;2.3 重启 InfluxDB 服务&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pg02 ~]# systemctl stop influxdb</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@pg02 ~]# systemctl start influxdb</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pg02 ~]# systemctl stop influxdb</span></span>
<span class="line"><span style="color:#24292e;">[root@pg02 ~]# systemctl start influxdb</span></span></code></pre></div><h2 id="_2-4验证" tabindex="-1">2.4验证 <a class="header-anchor" href="#_2-4验证" aria-label="Permalink to &quot;2.4验证&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pg02 ~]# influx</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter an InfluxQL query</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">ERR: unable to parse authentication credentials</span></span>
<span class="line"><span style="color:#e1e4e8;">Warning: It is possible this error is due to not setting a database.</span></span>
<span class="line"><span style="color:#e1e4e8;">Please set a database with the command &quot;use &lt;database&gt;&quot;.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pg02 ~]# influx</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">Enter an InfluxQL query</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">ERR: unable to parse authentication credentials</span></span>
<span class="line"><span style="color:#24292e;">Warning: It is possible this error is due to not setting a database.</span></span>
<span class="line"><span style="color:#24292e;">Please set a database with the command &quot;use &lt;database&gt;&quot;.</span></span></code></pre></div><p>认证机制成功</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@pg02 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# influx</span></span>
<span class="line"><span style="color:#B392F0;">Connected</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://localhost:8086</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.7</span><span style="color:#9ECBFF;">.0</span></span>
<span class="line"><span style="color:#B392F0;">InfluxDB</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">shell</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">version:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.7</span><span style="color:#9ECBFF;">.0</span></span>
<span class="line"><span style="color:#B392F0;">Enter</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">an</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">InfluxQL</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">query</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> show databases;</span></span>
<span class="line"><span style="color:#B392F0;">ERR:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">unable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">parse</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">authentication</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">credentials</span></span>
<span class="line"><span style="color:#B392F0;">Warning:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">It</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">possible</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">this</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">error</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">is</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">due</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">not</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">setting</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">database.</span></span>
<span class="line"><span style="color:#B392F0;">Please</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">database</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">command</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;use &lt;database&gt;&quot;.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> auth </span></span>
<span class="line"><span style="color:#B392F0;">username:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">admin</span></span>
<span class="line"><span style="color:#B392F0;">password:</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> show databases;</span></span>
<span class="line"><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">databases</span></span>
<span class="line"><span style="color:#B392F0;">name</span></span>
<span class="line"><span style="color:#B392F0;">----</span></span>
<span class="line"><span style="color:#B392F0;">_internal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@pg02 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# influx</span></span>
<span class="line"><span style="color:#6F42C1;">Connected</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://localhost:8086</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.7</span><span style="color:#032F62;">.0</span></span>
<span class="line"><span style="color:#6F42C1;">InfluxDB</span><span style="color:#24292E;"> </span><span style="color:#032F62;">shell</span><span style="color:#24292E;"> </span><span style="color:#032F62;">version:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.7</span><span style="color:#032F62;">.0</span></span>
<span class="line"><span style="color:#6F42C1;">Enter</span><span style="color:#24292E;"> </span><span style="color:#032F62;">an</span><span style="color:#24292E;"> </span><span style="color:#032F62;">InfluxQL</span><span style="color:#24292E;"> </span><span style="color:#032F62;">query</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> show databases;</span></span>
<span class="line"><span style="color:#6F42C1;">ERR:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">parse</span><span style="color:#24292E;"> </span><span style="color:#032F62;">authentication</span><span style="color:#24292E;"> </span><span style="color:#032F62;">credentials</span></span>
<span class="line"><span style="color:#6F42C1;">Warning:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">It</span><span style="color:#24292E;"> </span><span style="color:#032F62;">is</span><span style="color:#24292E;"> </span><span style="color:#032F62;">possible</span><span style="color:#24292E;"> </span><span style="color:#032F62;">this</span><span style="color:#24292E;"> </span><span style="color:#032F62;">error</span><span style="color:#24292E;"> </span><span style="color:#032F62;">is</span><span style="color:#24292E;"> </span><span style="color:#032F62;">due</span><span style="color:#24292E;"> </span><span style="color:#032F62;">to</span><span style="color:#24292E;"> </span><span style="color:#032F62;">not</span><span style="color:#24292E;"> </span><span style="color:#032F62;">setting</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a</span><span style="color:#24292E;"> </span><span style="color:#032F62;">database.</span></span>
<span class="line"><span style="color:#6F42C1;">Please</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">a</span><span style="color:#24292E;"> </span><span style="color:#032F62;">database</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with</span><span style="color:#24292E;"> </span><span style="color:#032F62;">the</span><span style="color:#24292E;"> </span><span style="color:#032F62;">command</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;use &lt;database&gt;&quot;.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> auth </span></span>
<span class="line"><span style="color:#6F42C1;">username:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">admin</span></span>
<span class="line"><span style="color:#6F42C1;">password:</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> show databases;</span></span>
<span class="line"><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">databases</span></span>
<span class="line"><span style="color:#6F42C1;">name</span></span>
<span class="line"><span style="color:#6F42C1;">----</span></span>
<span class="line"><span style="color:#6F42C1;">_internal</span></span></code></pre></div><h1 id="三、用户管理" tabindex="-1">三、用户管理 <a class="header-anchor" href="#三、用户管理" aria-label="Permalink to &quot;三、用户管理&quot;">​</a></h1><p>数据库管理：</p><p>◦ <code>CREATE DATABASE</code>, 和 <code>DROP DATABASE</code> ◦ <code>DROP SERIES</code> 和 <code>DROP MEASUREMENT</code> ◦ <code>CREATE RETENTION POLICY</code>, <code>ALTER RETENTION POLICY</code>, 和 <code>DROP RETENTION POLICY</code> ◦ <code>CREATE CONTINUOUS QUERY</code> 和 <code>DROP CONTINUOUS QUERY</code></p><p>用户管理： ◦ Admin user management: <code>CREATE USER</code>, <code>GRANT ALL PRIVILEGES</code>, <code>REVOKE ALL PRIVILEGES</code>, 和 <code>SHOW USERS</code> ◦ Non-admin user management: <code>CREATE USER</code>, <code>GRANT [READ,WRITE,ALL], REVOKE [READ,WRITE,ALL</code>], 和 <code>SHOW GRANTS</code> ◦ General user management: <code>SET PASSWORD</code> 和 <code>DROP USER</code></p><p>非管理员用户：</p><p>非管理员用户可以赋一种权限： ◦ <code>READ</code> ◦ <code>WRITE</code> ◦ <code>ALL</code> (<code>READ</code> 和 <code>WRITE</code> ) 这三种情况可以赋给每个用户，每个数据库</p><p><strong>授权语法</strong></p><ol><li><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">1.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">创建用户：CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">usernam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&lt;password&gt;&#39;</span></span>
<span class="line"><span style="color:#B392F0;">2.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">授权权限：GRANT</span><span style="color:#E1E4E8;"> [READ,WRITE,ALL] ON </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">database_name</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> TO </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">username</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">3.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">创建并授权：CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">usernam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&lt;password&gt;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ALL</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PRIVILEGES</span></span>
<span class="line"><span style="color:#B392F0;">4.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">取消授权：REVOKE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ALL</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PRIVILEGES</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">FROM</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">usernam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">5.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">修改密码：SET</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">FOR</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">usernam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&lt;password&gt;&#39;</span></span>
<span class="line"><span style="color:#B392F0;">6.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">删除用户：DROP</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">usernam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">1.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">创建用户：CREATE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">USER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">WITH</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&lt;password&gt;&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">2.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">授权权限：GRANT</span><span style="color:#24292E;"> [READ,WRITE,ALL] ON </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">database_name</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> TO </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">username</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">3.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">创建并授权：CREATE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">USER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">WITH</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&lt;password&gt;&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">WITH</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ALL</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PRIVILEGES</span></span>
<span class="line"><span style="color:#6F42C1;">4.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">取消授权：REVOKE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ALL</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PRIVILEGES</span><span style="color:#24292E;"> </span><span style="color:#032F62;">FROM</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">5.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">修改密码：SET</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">FOR</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&lt;password&gt;&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">6.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">删除用户：DROP</span><span style="color:#24292E;"> </span><span style="color:#032F62;">USER</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div></li></ol><h2 id="_3-1授权操作" tabindex="-1">3.1授权操作 <a class="header-anchor" href="#_3-1授权操作" aria-label="Permalink to &quot;3.1授权操作&quot;">​</a></h2><h3 id="_1-创建超级用户" tabindex="-1"><strong>1.创建超级用户</strong> <a class="header-anchor" href="#_1-创建超级用户" aria-label="Permalink to &quot;**1.创建超级用户**&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">创建用户：monitor</span></span>
<span class="line"><span style="color:#B392F0;">密码：zabbix</span></span>
<span class="line"><span style="color:#B392F0;">权限：全部权限（超级用户）</span></span>
<span class="line"><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;zabbix&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">privileges</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#为一个已有用户授权管理员权限</span></span>
<span class="line"><span style="color:#B392F0;">GRANT</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ALL</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">PRIVILEGES</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">TO</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">usernam</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">创建用户：monitor</span></span>
<span class="line"><span style="color:#6F42C1;">密码：zabbix</span></span>
<span class="line"><span style="color:#6F42C1;">权限：全部权限（超级用户）</span></span>
<span class="line"><span style="color:#6F42C1;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">user</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with</span><span style="color:#24292E;"> </span><span style="color:#032F62;">password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;zabbix&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">with</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span><span style="color:#24292E;"> </span><span style="color:#032F62;">privileges</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#为一个已有用户授权管理员权限</span></span>
<span class="line"><span style="color:#6F42C1;">GRANT</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ALL</span><span style="color:#24292E;"> </span><span style="color:#032F62;">PRIVILEGES</span><span style="color:#24292E;"> </span><span style="color:#032F62;">TO</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">usernam</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="_2-创建只读用户" tabindex="-1"><strong>2.创建只读用户</strong> <a class="header-anchor" href="#_2-创建只读用户" aria-label="Permalink to &quot;**2.创建只读用户**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">用户：monitor_ro</span></span>
<span class="line"><span style="color:#e1e4e8;">数据库：monitordb</span></span>
<span class="line"><span style="color:#e1e4e8;">权限：指定数据库的只读权限</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create user monitor_ro with password &#39;zabbix_apipwd&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">grant read on monitordb to monitor_ro</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">用户：monitor_ro</span></span>
<span class="line"><span style="color:#24292e;">数据库：monitordb</span></span>
<span class="line"><span style="color:#24292e;">权限：指定数据库的只读权限</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create user monitor_ro with password &#39;zabbix_apipwd&#39;</span></span>
<span class="line"><span style="color:#24292e;">grant read on monitordb to monitor_ro</span></span></code></pre></div><h3 id="_3-创建可以写用户" tabindex="-1"><strong>3.创建可以写用户</strong> <a class="header-anchor" href="#_3-创建可以写用户" aria-label="Permalink to &quot;**3.创建可以写用户**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">用户：monitor_rw</span></span>
<span class="line"><span style="color:#e1e4e8;">数据库：monitordb</span></span>
<span class="line"><span style="color:#e1e4e8;">权限：指定数据库的写权限</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">create user monitor_rw with password &#39;zabbix_apipwd&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">grant write on monitordb to monitor_rw</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">用户：monitor_rw</span></span>
<span class="line"><span style="color:#24292e;">数据库：monitordb</span></span>
<span class="line"><span style="color:#24292e;">权限：指定数据库的写权限</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">create user monitor_rw with password &#39;zabbix_apipwd&#39;</span></span>
<span class="line"><span style="color:#24292e;">grant write on monitordb to monitor_rw</span></span></code></pre></div><h3 id="_4-取消用户授权" tabindex="-1"><strong>4.取消用户授权</strong> <a class="header-anchor" href="#_4-取消用户授权" aria-label="Permalink to &quot;**4.取消用户授权**&quot;">​</a></h3><p>取消用户授权：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">REVOKE ALL PRIVILEGES FROM monitor_rw</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">REVOKE ALL PRIVILEGES FROM monitor_rw</span></span></code></pre></div><h3 id="_5-查看所有用户" tabindex="-1"><strong>5.查看所有用户</strong> <a class="header-anchor" href="#_5-查看所有用户" aria-label="Permalink to &quot;**5.查看所有用户**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SHOW USERS</span></span>
<span class="line"><span style="color:#e1e4e8;">user admin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">monitor true</span></span>
<span class="line"><span style="color:#e1e4e8;">monitor_ro false</span></span>
<span class="line"><span style="color:#e1e4e8;">monitor_rw false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SHOW USERS</span></span>
<span class="line"><span style="color:#24292e;">user admin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">monitor true</span></span>
<span class="line"><span style="color:#24292e;">monitor_ro false</span></span>
<span class="line"><span style="color:#24292e;">monitor_rw false</span></span></code></pre></div><h3 id="_6-删除用户" tabindex="-1"><strong>6.删除用户</strong> <a class="header-anchor" href="#_6-删除用户" aria-label="Permalink to &quot;**6.删除用户**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DROP USER monitor_rw</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DROP USER monitor_rw</span></span></code></pre></div><h2 id="_3-2非管理员用户管理" tabindex="-1">3.2非管理员用户管理 <a class="header-anchor" href="#_3-2非管理员用户管理" aria-label="Permalink to &quot;3.2非管理员用户管理&quot;">​</a></h2><h3 id="_1-创建一个新的普通用户" tabindex="-1">1.创建一个新的普通用户 <a class="header-anchor" href="#_1-创建一个新的普通用户" aria-label="Permalink to &quot;1.创建一个新的普通用户&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE USER &lt;username&gt; WITH PASSWORD &#39;&lt;password&gt;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#为一个已有用户授权</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT [READ,WRITE,ALL] ON &lt;database_name&gt; TO &lt;username&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#取消权限</span></span>
<span class="line"><span style="color:#e1e4e8;">REVOKE [READ,WRITE,ALL] ON &lt;database_name&gt; FROM &lt;username&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#展示用户在不同数据库上的权限</span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW GRANTS FOR &lt;user_name&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#例子：</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show grants for admin</span></span>
<span class="line"><span style="color:#e1e4e8;">database privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">-------- ---------</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show grants for admin;</span></span>
<span class="line"><span style="color:#e1e4e8;">database privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">-------- ---------</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: databases</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">test</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; create user h_user with password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show users;</span></span>
<span class="line"><span style="color:#e1e4e8;">user   admin</span></span>
<span class="line"><span style="color:#e1e4e8;">----   -----</span></span>
<span class="line"><span style="color:#e1e4e8;">admin  true</span></span>
<span class="line"><span style="color:#e1e4e8;">h_user false</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; grant read on test to h_user;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show users;</span></span>
<span class="line"><span style="color:#e1e4e8;">user   admin</span></span>
<span class="line"><span style="color:#e1e4e8;">----   -----</span></span>
<span class="line"><span style="color:#e1e4e8;">admin  true</span></span>
<span class="line"><span style="color:#e1e4e8;">h_user false</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show grants for h_user;</span></span>
<span class="line"><span style="color:#e1e4e8;">database privilege</span></span>
<span class="line"><span style="color:#e1e4e8;">-------- ---------</span></span>
<span class="line"><span style="color:#e1e4e8;">test     READ</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE USER &lt;username&gt; WITH PASSWORD &#39;&lt;password&gt;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#为一个已有用户授权</span></span>
<span class="line"><span style="color:#24292e;">GRANT [READ,WRITE,ALL] ON &lt;database_name&gt; TO &lt;username&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#取消权限</span></span>
<span class="line"><span style="color:#24292e;">REVOKE [READ,WRITE,ALL] ON &lt;database_name&gt; FROM &lt;username&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#展示用户在不同数据库上的权限</span></span>
<span class="line"><span style="color:#24292e;">SHOW GRANTS FOR &lt;user_name&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#例子：</span></span>
<span class="line"><span style="color:#24292e;">&gt; show grants for admin</span></span>
<span class="line"><span style="color:#24292e;">database privilege</span></span>
<span class="line"><span style="color:#24292e;">-------- ---------</span></span>
<span class="line"><span style="color:#24292e;">&gt; show grants for admin;</span></span>
<span class="line"><span style="color:#24292e;">database privilege</span></span>
<span class="line"><span style="color:#24292e;">-------- ---------</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">name: databases</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">_internal</span></span>
<span class="line"><span style="color:#24292e;">test</span></span>
<span class="line"><span style="color:#24292e;">&gt; create user h_user with password &#39;123456&#39;;</span></span>
<span class="line"><span style="color:#24292e;">&gt; show users;</span></span>
<span class="line"><span style="color:#24292e;">user   admin</span></span>
<span class="line"><span style="color:#24292e;">----   -----</span></span>
<span class="line"><span style="color:#24292e;">admin  true</span></span>
<span class="line"><span style="color:#24292e;">h_user false</span></span>
<span class="line"><span style="color:#24292e;">&gt; grant read on test to h_user;</span></span>
<span class="line"><span style="color:#24292e;">&gt; show users;</span></span>
<span class="line"><span style="color:#24292e;">user   admin</span></span>
<span class="line"><span style="color:#24292e;">----   -----</span></span>
<span class="line"><span style="color:#24292e;">admin  true</span></span>
<span class="line"><span style="color:#24292e;">h_user false</span></span>
<span class="line"><span style="color:#24292e;">&gt; show grants for h_user;</span></span>
<span class="line"><span style="color:#24292e;">database privilege</span></span>
<span class="line"><span style="color:#24292e;">-------- ---------</span></span>
<span class="line"><span style="color:#24292e;">test     READ</span></span></code></pre></div><h2 id="_3-3普通用户账号功能管理" tabindex="-1">3.3普通用户账号功能管理 <a class="header-anchor" href="#_3-3普通用户账号功能管理" aria-label="Permalink to &quot;3.3普通用户账号功能管理&quot;">​</a></h2><h3 id="_1-重设密码" tabindex="-1">1.重设密码 <a class="header-anchor" href="#_1-重设密码" aria-label="Permalink to &quot;1.重设密码&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SET PASSWORD FOR &lt;username&gt; = &#39;&lt;password&gt;&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SET PASSWORD FOR &lt;username&gt; = &#39;&lt;password&gt;&#39;</span></span></code></pre></div><h3 id="_2-删除用户" tabindex="-1">2.删除用户 <a class="header-anchor" href="#_2-删除用户" aria-label="Permalink to &quot;2.删除用户&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">DROP USER &lt;username&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">DROP USER &lt;username&gt;</span></span></code></pre></div><h1 id="四、认证下查询" tabindex="-1">四、认证下查询 <a class="header-anchor" href="#四、认证下查询" aria-label="Permalink to &quot;四、认证下查询&quot;">​</a></h1><h3 id="http-api" tabindex="-1">HTTP API <a class="header-anchor" href="#http-api" aria-label="Permalink to &quot;HTTP API&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Query:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">curl -v -G &quot;http://localhost:8086/query?db=test&amp;u=admin&amp;p=123456&quot; --data-urlencode &quot;q=select * from table&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Write:</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@pg02 influxdb]# curl -v -XPOST &quot;http://localhost:8086/write?db=test&amp;u=admin&amp;p=123456&quot; --data-binary &quot;table dd=44&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">Note: Unnecessary use of -X or --request, POST is already inferred.</span></span>
<span class="line"><span style="color:#e1e4e8;">*   Trying ::1...</span></span>
<span class="line"><span style="color:#e1e4e8;">* TCP_NODELAY set</span></span>
<span class="line"><span style="color:#e1e4e8;">* Connected to localhost (::1) port 8086 (#0)</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; POST /write?db=test&amp;u=admin&amp;p=123456 HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Host: localhost:8086</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; User-Agent: curl/7.61.1</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Content-Length: 11</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; Content-Type: application/x-www-form-urlencoded</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">* upload completely sent off: 11 out of 11 bytes</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Content-Type: application/json</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Request-Id: 3cead2ab-2a3c-11eb-8007-525400a367e0</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; X-Influxdb-Version: 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; X-Request-Id: 3cead2ab-2a3c-11eb-8007-525400a367e0</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; Date: Thu, 19 Nov 2020 07:52:57 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt; </span></span>
<span class="line"><span style="color:#e1e4e8;">* Connection #0 to host localhost left intact</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Query:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">curl -v -G &quot;http://localhost:8086/query?db=test&amp;u=admin&amp;p=123456&quot; --data-urlencode &quot;q=select * from table&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Write:</span></span>
<span class="line"><span style="color:#24292e;">[root@pg02 influxdb]# curl -v -XPOST &quot;http://localhost:8086/write?db=test&amp;u=admin&amp;p=123456&quot; --data-binary &quot;table dd=44&quot;</span></span>
<span class="line"><span style="color:#24292e;">Note: Unnecessary use of -X or --request, POST is already inferred.</span></span>
<span class="line"><span style="color:#24292e;">*   Trying ::1...</span></span>
<span class="line"><span style="color:#24292e;">* TCP_NODELAY set</span></span>
<span class="line"><span style="color:#24292e;">* Connected to localhost (::1) port 8086 (#0)</span></span>
<span class="line"><span style="color:#24292e;">&gt; POST /write?db=test&amp;u=admin&amp;p=123456 HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">&gt; Host: localhost:8086</span></span>
<span class="line"><span style="color:#24292e;">&gt; User-Agent: curl/7.61.1</span></span>
<span class="line"><span style="color:#24292e;">&gt; Accept: */*</span></span>
<span class="line"><span style="color:#24292e;">&gt; Content-Length: 11</span></span>
<span class="line"><span style="color:#24292e;">&gt; Content-Type: application/x-www-form-urlencoded</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">* upload completely sent off: 11 out of 11 bytes</span></span>
<span class="line"><span style="color:#24292e;">&lt; HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#24292e;">&lt; Content-Type: application/json</span></span>
<span class="line"><span style="color:#24292e;">&lt; Request-Id: 3cead2ab-2a3c-11eb-8007-525400a367e0</span></span>
<span class="line"><span style="color:#24292e;">&lt; X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#24292e;">&lt; X-Influxdb-Version: 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">&lt; X-Request-Id: 3cead2ab-2a3c-11eb-8007-525400a367e0</span></span>
<span class="line"><span style="color:#24292e;">&lt; Date: Thu, 19 Nov 2020 07:52:57 GMT</span></span>
<span class="line"><span style="color:#24292e;">&lt; </span></span>
<span class="line"><span style="color:#24292e;">* Connection #0 to host localhost left intact</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">有密码形式：</span></span>
<span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query&quot; -u admin:admin --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query&quot; --data-urlencode &quot;u=admin&quot; --data-urlencode &quot;p=admin&quot; --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query?u=admin&amp;p=admin&amp;q=SHOW+DATABASES&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">有密码形式：</span></span>
<span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query&quot; -u admin:admin --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query&quot; --data-urlencode &quot;u=admin&quot; --data-urlencode &quot;p=admin&quot; --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query?u=admin&amp;p=admin&amp;q=SHOW+DATABASES&quot;</span></span></code></pre></div><h3 id="cli" tabindex="-1">CLI <a class="header-anchor" href="#cli" aria-label="Permalink to &quot;CLI&quot;">​</a></h3><p>启动控制台后，再设置用户 <code>auth &lt;username&gt; &lt;password&gt;</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pg02 influxdb]# influx</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter an InfluxQL query</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; auth admin 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: databases</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">test</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pg02 influxdb]# influx</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">Enter an InfluxQL query</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span>
<span class="line"><span style="color:#24292e;">&gt; auth admin 123456</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">name: databases</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">_internal</span></span>
<span class="line"><span style="color:#24292e;">test</span></span></code></pre></div><p>以用户名密码启动</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pg02 influxdb]# influx -username admin -password 123456</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter an InfluxQL query</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show databases;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: databases</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">test</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者密码不回现</span></span>
<span class="line"><span style="color:#e1e4e8;">influx -username &#39;shijiange&#39; -password &#39;&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pg02 influxdb]# influx -username admin -password 123456</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">Enter an InfluxQL query</span></span>
<span class="line"><span style="color:#24292e;">&gt; show databases;</span></span>
<span class="line"><span style="color:#24292e;">name: databases</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">_internal</span></span>
<span class="line"><span style="color:#24292e;">test</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者密码不回现</span></span>
<span class="line"><span style="color:#24292e;">influx -username &#39;shijiange&#39; -password &#39;&#39;</span></span></code></pre></div>`,59);function y(d,E,u,h,g,F){const s=n("center");return e(),l("div",null,[p(s,null,{default:o(()=>[c("InfluxDB权限认证机制")]),_:1}),i])}const C=a(r,[["render",y]]);export{m as __pageData,C as default};
