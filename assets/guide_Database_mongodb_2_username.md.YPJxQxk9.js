import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const b=JSON.parse('{"title":"1.开启认证","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/2_username.md","filePath":"guide/Database/mongodb/2_username.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/2_username.md"},t=n(`<ul><li>mongo5.0.5</li></ul><p>用户是跟着库创建的，在哪个库创建的什么权限的什么用户，只对此库有相应权限（除超级管理员以外）</p><h1 id="_1-开启认证" tabindex="-1">1.开启认证 <a class="header-anchor" href="#_1-开启认证" aria-label="Permalink to &quot;1.开启认证&quot;">​</a></h1><h2 id="配置认证文件" tabindex="-1">配置认证文件 <a class="header-anchor" href="#配置认证文件" aria-label="Permalink to &quot;配置认证文件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vi /etc/mongod.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vi /etc/mongod.conf</span></span></code></pre></div><ul><li>开启认证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">security:</span></span>
<span class="line"><span style="color:#e1e4e8;">  authorization: enabled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">security:</span></span>
<span class="line"><span style="color:#24292e;">  authorization: enabled</span></span></code></pre></div><p>非yaml格式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">auth=true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">auth=true</span></span></code></pre></div><ul><li>关闭认证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//注释这两句 =&gt; 关闭认证</span></span>
<span class="line"><span style="color:#e1e4e8;">#security:</span></span>
<span class="line"><span style="color:#e1e4e8;"># authorization: enabled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//注释这两句 =&gt; 关闭认证</span></span>
<span class="line"><span style="color:#24292e;">#security:</span></span>
<span class="line"><span style="color:#24292e;"># authorization: enabled</span></span></code></pre></div><ul><li>重启</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl restart mongod</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl restart mongod</span></span></code></pre></div><h2 id="配置admin密码" tabindex="-1">配置admin密码 <a class="header-anchor" href="#配置admin密码" aria-label="Permalink to &quot;配置admin密码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">user: &quot;admin&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">pwd: passwordPrompt(), // or cleartext password</span></span>
<span class="line"><span style="color:#e1e4e8;">roles: [ { role: &quot;userAdminAnyDatabase&quot;, db: &quot;admin&quot; }, &quot;readWriteAnyDatabase&quot; ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">user: &quot;admin&quot;,</span></span>
<span class="line"><span style="color:#24292e;">pwd: passwordPrompt(), // or cleartext password</span></span>
<span class="line"><span style="color:#24292e;">roles: [ { role: &quot;userAdminAnyDatabase&quot;, db: &quot;admin&quot; }, &quot;readWriteAnyDatabase&quot; ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div><ul><li>通过外部脚本执行</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">mongosh db_name </span><span style="color:#6A737D;">--eval &quot;db.createUser({user:&#39;username&#39;,pwd:&#39;123456qwe&#39;,roles:[{role:&#39;userAdminAnyDatabase&#39;,db:&#39;admin&#39;}]})&quot; --port 27018</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">mongosh db_name </span><span style="color:#6A737D;">--eval &quot;db.createUser({user:&#39;username&#39;,pwd:&#39;123456qwe&#39;,roles:[{role:&#39;userAdminAnyDatabase&#39;,db:&#39;admin&#39;}]})&quot; --port 27018</span></span></code></pre></div><h2 id="登陆" tabindex="-1">登陆 <a class="header-anchor" href="#登陆" aria-label="Permalink to &quot;登陆&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@slave01 ~]# mongosh -u mongouser -p --authenticationDatabase admin</span></span>
<span class="line"><span style="color:#e1e4e8;">MongoDB shell version v5.0.5</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter password: </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者登陆之后认证</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db admin</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.auth(&quot;username&quot;,&quot;password&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#返回1，代表正常</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@slave01 ~]# mongosh -u mongouser -p --authenticationDatabase admin</span></span>
<span class="line"><span style="color:#24292e;">MongoDB shell version v5.0.5</span></span>
<span class="line"><span style="color:#24292e;">Enter password: </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者登陆之后认证</span></span>
<span class="line"><span style="color:#24292e;">&gt; use admin</span></span>
<span class="line"><span style="color:#24292e;">switched to db admin</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.auth(&quot;username&quot;,&quot;password&quot;);</span></span>
<span class="line"><span style="color:#24292e;">1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#返回1，代表正常</span></span></code></pre></div><h1 id="_2-创建普通用户" tabindex="-1">2.创建普通用户 <a class="header-anchor" href="#_2-创建普通用户" aria-label="Permalink to &quot;2.创建普通用户&quot;">​</a></h1><p>管理员通常没有数据库的读写权限，只有操作用户的权限, 因此我们只需要赋予管理员userAdminAnyDatabase角色即可。</p><p>另外管理员账户必须在admin数据库下创建，3.0版本后没有admin数据库，但我们可以手动use一个。注：use命令在切换数据库时，如果切换到一个不存在的数据库，MongodDB会自动创建该数据库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">use test</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">   {</span></span>
<span class="line"><span style="color:#e1e4e8;">     user: &#39;yiduuser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">     pwd: &#39;fa2e5474db854dd&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">     roles: [ { role: &#39;readWrite&#39;, db: &#39;EiduApp&#39; } ]</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;"> );</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #或者</span></span>
<span class="line"><span style="color:#e1e4e8;"> db.createUser({user: &quot;user&quot;, pwd:&quot;user&quot;, roles: [ { role: &quot;readWrite&quot;, db: &quot;db_name&quot; } ]})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">use test</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">   {</span></span>
<span class="line"><span style="color:#24292e;">     user: &#39;yiduuser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">     pwd: &#39;fa2e5474db854dd&#39;,</span></span>
<span class="line"><span style="color:#24292e;">     roles: [ { role: &#39;readWrite&#39;, db: &#39;EiduApp&#39; } ]</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;"> );</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #或者</span></span>
<span class="line"><span style="color:#24292e;"> db.createUser({user: &quot;user&quot;, pwd:&quot;user&quot;, roles: [ { role: &quot;readWrite&quot;, db: &quot;db_name&quot; } ]})</span></span></code></pre></div><h2 id="创建超级管理员" tabindex="-1">创建超级管理员 <a class="header-anchor" href="#创建超级管理员" aria-label="Permalink to &quot;创建超级管理员&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#创建前要use admin这个验证库，否则无法登陆</span></span>
<span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser({user: &quot;root&quot;, pwd: &quot;redhat&quot;, roles: [ { role: &quot;root&quot;, db: &quot;admin&quot; } ]})</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        user: &quot;root&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        pwd: &quot;redhat&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        roles: [ { role: &quot;root&quot;, db: &quot;admin&quot; } ]</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">#查看超级用户信息前要进入admin库，系统把超级用户信息存放在admin库</span></span>
<span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">db.system.users.find()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db.system.users.find().pretty()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#验证用户</span></span>
<span class="line"><span style="color:#e1e4e8;">#返回 1 为可用</span></span>
<span class="line"><span style="color:#e1e4e8;">db.auth(&#39;root&#39;,&#39;redhat&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#创建前要use admin这个验证库，否则无法登陆</span></span>
<span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;">db.createUser({user: &quot;root&quot;, pwd: &quot;redhat&quot;, roles: [ { role: &quot;root&quot;, db: &quot;admin&quot; } ]})</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        user: &quot;root&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        pwd: &quot;redhat&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        roles: [ { role: &quot;root&quot;, db: &quot;admin&quot; } ]</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">#查看超级用户信息前要进入admin库，系统把超级用户信息存放在admin库</span></span>
<span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;">db.system.users.find()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db.system.users.find().pretty()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#验证用户</span></span>
<span class="line"><span style="color:#24292e;">#返回 1 为可用</span></span>
<span class="line"><span style="color:#24292e;">db.auth(&#39;root&#39;,&#39;redhat&#39;)</span></span></code></pre></div><h2 id="创建库管理员用户" tabindex="-1"><strong>创建库管理员用户</strong> <a class="header-anchor" href="#创建库管理员用户" aria-label="Permalink to &quot;**创建库管理员用户**&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#建议创建用户之前先use到准备创建的库操作用户（只能操作olda库）</span></span>
<span class="line"><span style="color:#e1e4e8;">use olda</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        user: &quot;yiduuser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        pwd: &quot;fa2e5474db854dd&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        roles: [ { role: &quot;dbAdmin&quot;, db: &quot;EiduApp&quot; } ]</span></span>
<span class="line"><span style="color:#e1e4e8;">    })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#建议创建用户之前先use到准备创建的库操作用户（只能操作olda库）</span></span>
<span class="line"><span style="color:#24292e;">use olda</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        user: &quot;yiduuser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        pwd: &quot;fa2e5474db854dd&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        roles: [ { role: &quot;dbAdmin&quot;, db: &quot;EiduApp&quot; } ]</span></span>
<span class="line"><span style="color:#24292e;">    })</span></span></code></pre></div><ul><li><strong>创建管理多个库的用户</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#duouser这个用户可以多olda库读写，对test库只能读</span></span>
<span class="line"><span style="color:#e1e4e8;">use olda</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">    {</span></span>
<span class="line"><span style="color:#e1e4e8;">        user: &#39;duouser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        pwd: &#39;duouser&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        roles: [ </span></span>
<span class="line"><span style="color:#e1e4e8;">        { role: &#39;readWrite&#39;, db: &#39;olda&#39; },</span></span>
<span class="line"><span style="color:#e1e4e8;">        { role: &#39;read&#39;, db: &#39;test&#39; } ] } )</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #连接</span></span>
<span class="line"><span style="color:#e1e4e8;"> mongo -uduouser -pduouser 10.0.0.20/olda</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#duouser这个用户可以多olda库读写，对test库只能读</span></span>
<span class="line"><span style="color:#24292e;">use olda</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">    {</span></span>
<span class="line"><span style="color:#24292e;">        user: &#39;duouser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        pwd: &#39;duouser&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        roles: [ </span></span>
<span class="line"><span style="color:#24292e;">        { role: &#39;readWrite&#39;, db: &#39;olda&#39; },</span></span>
<span class="line"><span style="color:#24292e;">        { role: &#39;read&#39;, db: &#39;test&#39; } ] } )</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #连接</span></span>
<span class="line"><span style="color:#24292e;"> mongo -uduouser -pduouser 10.0.0.20/olda</span></span></code></pre></div><h2 id="创建读账户" tabindex="-1">创建读账户 <a class="header-anchor" href="#创建读账户" aria-label="Permalink to &quot;创建读账户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;db.createUser({user:&quot;reader&quot;,pwd:&quot;reader&quot;,roles:[{role:&quot;read&quot;,db:&quot;test&quot;}]})#创建test库只读用户</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;use test;</span></span>
<span class="line"><span style="color:#24292e;">&gt;db.createUser({user:&quot;reader&quot;,pwd:&quot;reader&quot;,roles:[{role:&quot;read&quot;,db:&quot;test&quot;}]})#创建test库只读用户</span></span></code></pre></div><h2 id="创建写账户" tabindex="-1">创建写账户 <a class="header-anchor" href="#创建写账户" aria-label="Permalink to &quot;创建写账户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;db.createUser({user:&quot;writer&quot;,pwd:&quot;writer&quot;,roles:[{role:&quot;readWrite&quot;,db:&quot;test&quot;}]})#创建test库读写用</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;use test;</span></span>
<span class="line"><span style="color:#24292e;">&gt;db.createUser({user:&quot;writer&quot;,pwd:&quot;writer&quot;,roles:[{role:&quot;readWrite&quot;,db:&quot;test&quot;}]})#创建test库读写用</span></span></code></pre></div><h2 id="用户指定加密方式" tabindex="-1">用户指定加密方式 <a class="header-anchor" href="#用户指定加密方式" aria-label="Permalink to &quot;用户指定加密方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.createUser({ </span></span>
<span class="line"><span style="color:#e1e4e8;">    user: &quot;yiduusers&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    pwd: &quot;fa2e5474db854dd&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    roles: [ { role: &quot;dbAdmin&quot;, db: &quot;EiduApp&quot; } ], </span></span>
<span class="line"><span style="color:#e1e4e8;">    mechanisms : [&quot;SCRAM-SHA-256&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.createUser({ </span></span>
<span class="line"><span style="color:#24292e;">    user: &quot;yiduusers&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    pwd: &quot;fa2e5474db854dd&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    roles: [ { role: &quot;dbAdmin&quot;, db: &quot;EiduApp&quot; } ], </span></span>
<span class="line"><span style="color:#24292e;">    mechanisms : [&quot;SCRAM-SHA-256&quot;]</span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><h3 id="完整用户案例" tabindex="-1">完整用户案例 <a class="header-anchor" href="#完整用户案例" aria-label="Permalink to &quot;完整用户案例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#程序中调用</span></span>
<span class="line"><span style="color:#e1e4e8;">在admin，和所在库中，都需要授权</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">   {</span></span>
<span class="line"><span style="color:#e1e4e8;">     user: &quot;leihuo&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">     pwd: &quot;fa2e5474db854dd&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">     roles: [ { role: &quot;dbOwner&quot;,db: &quot;admin&quot; } ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"> )</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">use rank</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">   {</span></span>
<span class="line"><span style="color:#e1e4e8;">     user: &quot;leihuo&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">     pwd: &quot;fa2e5474db854dd&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">     roles: [ { role: &quot;dbOwner&quot;,db: &quot;rank&quot; } ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"> )</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">####</span></span>
<span class="line"><span style="color:#e1e4e8;">use test</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">  {</span></span>
<span class="line"><span style="color:#e1e4e8;">    user: &quot;myTester&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    pwd: &quot;xyz123&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    roles: [ { role: &quot;readWrite&quot;, db: &quot;test&quot; },</span></span>
<span class="line"><span style="color:#e1e4e8;">             { role: &quot;read&quot;, db: &quot;reporting&quot; } ]</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#程序中调用</span></span>
<span class="line"><span style="color:#24292e;">在admin，和所在库中，都需要授权</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">   {</span></span>
<span class="line"><span style="color:#24292e;">     user: &quot;leihuo&quot;,</span></span>
<span class="line"><span style="color:#24292e;">     pwd: &quot;fa2e5474db854dd&quot;,</span></span>
<span class="line"><span style="color:#24292e;">     roles: [ { role: &quot;dbOwner&quot;,db: &quot;admin&quot; } ]</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"> )</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">use rank</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">   {</span></span>
<span class="line"><span style="color:#24292e;">     user: &quot;leihuo&quot;,</span></span>
<span class="line"><span style="color:#24292e;">     pwd: &quot;fa2e5474db854dd&quot;,</span></span>
<span class="line"><span style="color:#24292e;">     roles: [ { role: &quot;dbOwner&quot;,db: &quot;rank&quot; } ]</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"> )</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">####</span></span>
<span class="line"><span style="color:#24292e;">use test</span></span>
<span class="line"><span style="color:#24292e;">db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">  {</span></span>
<span class="line"><span style="color:#24292e;">    user: &quot;myTester&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    pwd: &quot;xyz123&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    roles: [ { role: &quot;readWrite&quot;, db: &quot;test&quot; },</span></span>
<span class="line"><span style="color:#24292e;">             { role: &quot;read&quot;, db: &quot;reporting&quot; } ]</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div><h1 id="_3-添加远程权限" tabindex="-1">3.添加远程权限 <a class="header-anchor" href="#_3-添加远程权限" aria-label="Permalink to &quot;3.添加远程权限&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#vim /etc/mongod.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">net:</span></span>
<span class="line"><span style="color:#e1e4e8;"> port: 27017</span></span>
<span class="line"><span style="color:#e1e4e8;"> bindIp: 0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;"> bindIpAll: true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#vim /etc/mongod.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">net:</span></span>
<span class="line"><span style="color:#24292e;"> port: 27017</span></span>
<span class="line"><span style="color:#24292e;"> bindIp: 0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;"> bindIpAll: true</span></span></code></pre></div><ul><li>重启服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl restart mongod.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl restart mongod.service</span></span></code></pre></div><h3 id="uri-形式的访问" tabindex="-1">URI 形式的访问 <a class="header-anchor" href="#uri-形式的访问" aria-label="Permalink to &quot;URI 形式的访问&quot;">​</a></h3><p>​ 生产中常用 URI 形式对数据库进行连接</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mongodb</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//your.db.ip.address:27017/foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mongodb</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//your.db.ip.address:27017/foo</span></span></code></pre></div><p>添加用户名密码验证</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mongodb</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//simpleUser:simplePass@your.db.ip.address:27017/foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mongodb</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//simpleUser:simplePass@your.db.ip.address:27017/foo</span></span></code></pre></div><h1 id="_4-用户管理和认证方法" tabindex="-1">4.用户管理和认证方法 <a class="header-anchor" href="#_4-用户管理和认证方法" aria-label="Permalink to &quot;4.用户管理和认证方法&quot;">​</a></h1><p>官网文档：<a href="https://docs.mongodb.com/master/reference/security/#security-methods-in-the-mongo-shell" target="_blank" rel="noreferrer">https://docs.mongodb.com/master/reference/security/#security-methods-in-the-mongo-shell</a></p><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.auth/#mongodb-method-db.auth" target="_blank" rel="noreferrer"><code>db.auth()</code></a></td><td style="text-align:left;">Authenticates a user to a database.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.changeUserPassword/#mongodb-method-db.changeUserPassword" target="_blank" rel="noreferrer"><code>db.changeUserPassword()</code></a></td><td style="text-align:left;">Changes an existing user&#39;s password.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.createUser/#mongodb-method-db.createUser" target="_blank" rel="noreferrer"><code>db.createUser()</code></a></td><td style="text-align:left;">Creates a new user.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.dropUser/#mongodb-method-db.dropUser" target="_blank" rel="noreferrer"><code>db.dropUser()</code></a></td><td style="text-align:left;">Removes a single user.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.dropAllUsers/#mongodb-method-db.dropAllUsers" target="_blank" rel="noreferrer"><code>db.dropAllUsers()</code></a></td><td style="text-align:left;">Deletes all users associated with a database.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.getUser/#mongodb-method-db.getUser" target="_blank" rel="noreferrer"><code>db.getUser()</code></a></td><td style="text-align:left;">Returns information about the specified user.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.getUsers/#mongodb-method-db.getUsers" target="_blank" rel="noreferrer"><code>db.getUsers()</code></a></td><td style="text-align:left;">Returns information about all users associated with a database.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.grantRolesToUser/#mongodb-method-db.grantRolesToUser" target="_blank" rel="noreferrer"><code>db.grantRolesToUser()</code></a></td><td style="text-align:left;">Grants a role and its privileges to a user.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.removeUser/#mongodb-method-db.removeUser" target="_blank" rel="noreferrer"><code>db.removeUser()</code></a></td><td style="text-align:left;">Deprecated. Removes a user from a database.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.revokeRolesFromUser/#mongodb-method-db.revokeRolesFromUser" target="_blank" rel="noreferrer"><code>db.revokeRolesFromUser()</code></a></td><td style="text-align:left;">Removes a role from a user.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.updateUser/#mongodb-method-db.updateUser" target="_blank" rel="noreferrer"><code>db.updateUser()</code></a></td><td style="text-align:left;">Updates user data.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/passwordPrompt/#mongodb-method-passwordPrompt" target="_blank" rel="noreferrer"><code>passwordPrompt()</code></a></td><td style="text-align:left;">Prompts for the password as an alternative to specifying passwords directly in various <a href="https://docs.mongodb.com/mongodb-shell/#mongodb-binary-bin.mongosh" target="_blank" rel="noreferrer"><code>mongosh</code></a> user authentication/management methods.</td></tr></tbody></table><ul><li>mongosh安装</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://downloads.mongodb.com/compass/mongosh-1.5.4-linux-x64.tgz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://downloads.mongodb.com/compass/mongosh-1.5.4-linux-x64.tgz</span></span></code></pre></div><h1 id="_5-用户角色" tabindex="-1">5.用户角色 <a class="header-anchor" href="#_5-用户角色" aria-label="Permalink to &quot;5.用户角色&quot;">​</a></h1><p>官方详细档：<a href="https://docs.mongodb.com/master/reference/security/#security-methods-in-the-mongo-shell" target="_blank" rel="noreferrer">https://docs.mongodb.com/master/reference/security/#security-methods-in-the-mongo-shell</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401100941170.jpg" alt=""></p><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.createRole/#mongodb-method-db.createRole" target="_blank" rel="noreferrer"><code>db.createRole()</code></a></td><td style="text-align:left;">Creates a role and specifies its privileges.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.dropRole/#mongodb-method-db.dropRole" target="_blank" rel="noreferrer"><code>db.dropRole()</code></a></td><td style="text-align:left;">Deletes a user-defined role.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.dropAllRoles/#mongodb-method-db.dropAllRoles" target="_blank" rel="noreferrer"><code>db.dropAllRoles()</code></a></td><td style="text-align:left;">Deletes all user-defined roles associated with a database.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.getRole/#mongodb-method-db.getRole" target="_blank" rel="noreferrer"><code>db.getRole()</code></a></td><td style="text-align:left;">Returns information for the specified role.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.getRoles/#mongodb-method-db.getRoles" target="_blank" rel="noreferrer"><code>db.getRoles()</code></a></td><td style="text-align:left;">Returns information for all the user-defined roles in a database.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.grantPrivilegesToRole/#mongodb-method-db.grantPrivilegesToRole" target="_blank" rel="noreferrer"><code>db.grantPrivilegesToRole()</code></a></td><td style="text-align:left;">Assigns privileges to a user-defined role.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.revokePrivilegesFromRole/#mongodb-method-db.revokePrivilegesFromRole" target="_blank" rel="noreferrer"><code>db.revokePrivilegesFromRole()</code></a></td><td style="text-align:left;">Removes the specified privileges from a user-defined role.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.grantRolesToRole/#mongodb-method-db.grantRolesToRole" target="_blank" rel="noreferrer"><code>db.grantRolesToRole()</code></a></td><td style="text-align:left;">Specifies roles from which a user-defined role inherits privileges.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.revokeRolesFromRole/#mongodb-method-db.revokeRolesFromRole" target="_blank" rel="noreferrer"><code>db.revokeRolesFromRole()</code></a></td><td style="text-align:left;">Removes inherited roles from a role.</td></tr><tr><td style="text-align:left;"><a href="https://docs.mongodb.com/upcoming/reference/method/db.updateRole/#mongodb-method-db.updateRole" target="_blank" rel="noreferrer"><code>db.updateRole()</code></a></td><td style="text-align:left;">Updates a user-defined role.</td></tr></tbody></table><table><thead><tr><th>read</th><th>允许用户读取指定数据库</th></tr></thead><tbody><tr><td>readWrite</td><td>允许用户读写指定数据库</td></tr><tr><td>dbAdmin</td><td>允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile</td></tr><tr><td>dbOwner</td><td>允许在当前DB中执行任意操作</td></tr><tr><td>userAdmin</td><td>允许用户向system.users集合写入，可以在指定数据库里创建、删除和管理用户</td></tr><tr><td>clusterAdmin</td><td>只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限</td></tr><tr><td>readAnyDatabase</td><td>只在admin数据库中可用，赋予用户所有数据库的读权限</td></tr><tr><td>readWriteAnyDatabase</td><td>只在admin数据库中可用，赋予用户所有数据库的读写权限</td></tr><tr><td>userAdminAnyDatabase</td><td>只在admin数据库中可用，赋予用户所有数据库的userAdmin权限,除config和local</td></tr><tr><td>dbAdminAnyDatabase</td><td>只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限</td></tr><tr><td>root</td><td>只在admin数据库中可用。超级账号，超级权限，包含所有权限</td></tr><tr><td>clusterAdmin</td><td>只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限</td></tr><tr><td>clusterManager</td><td></td></tr><tr><td>clusterMonitor</td><td></td></tr><tr><td>hostManager</td><td></td></tr><tr><td>backup</td><td>备份MongoDB数据最小的权限</td></tr><tr><td>restore</td><td>从备份文件中还原恢复MongoDB数据（处理system.profile集合）的权限</td></tr></tbody></table><h2 id="查找用户" tabindex="-1">查找用户 <a class="header-anchor" href="#查找用户" aria-label="Permalink to &quot;查找用户&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#切换到admin</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">use</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">admin</span></span>
<span class="line"><span style="color:#E1E4E8;">switched </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> db </span><span style="color:#F97583;">admin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">db</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">system</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">users</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">find</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#或者格式化输出</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">db</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">system</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">users</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">find</span><span style="color:#E1E4E8;">().pretty()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#或者</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">show users;</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">db</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">getUsers</span><span style="color:#E1E4E8;">();</span><span style="color:#F97583;">//</span><span style="color:#E1E4E8;">查看所有用户</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#或者</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">db</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">runCommand</span><span style="color:#E1E4E8;">({usersInfo:</span><span style="color:#9ECBFF;">&quot;username&quot;</span><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#切换到admin</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">use</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">admin</span></span>
<span class="line"><span style="color:#24292E;">switched </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> db </span><span style="color:#D73A49;">admin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">db</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">system</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">users</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">find</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#或者格式化输出</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">db</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">system</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">users</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">find</span><span style="color:#24292E;">().pretty()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#或者</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">show users;</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">db</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">getUsers</span><span style="color:#24292E;">();</span><span style="color:#D73A49;">//</span><span style="color:#24292E;">查看所有用户</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#或者</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">db</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">runCommand</span><span style="color:#24292E;">({usersInfo:</span><span style="color:#032F62;">&quot;username&quot;</span><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="创建管理员用户" tabindex="-1">创建管理员用户 <a class="header-anchor" href="#创建管理员用户" aria-label="Permalink to &quot;创建管理员用户&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&gt;use</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">admin</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">db</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">createUser</span><span style="color:#E1E4E8;">({user:</span><span style="color:#9ECBFF;">&#39;bjsxt&#39;</span><span style="color:#E1E4E8;">,pwd:</span><span style="color:#9ECBFF;">&#39;bjsxtpwd&#39;</span><span style="color:#E1E4E8;">,roles:[{role:&#39;userAdminAnyDatabase&#39;,db:&#39;admin&#39;}])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#查看用户</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">show users</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&gt;use</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">admin</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">db</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">createUser</span><span style="color:#24292E;">({user:</span><span style="color:#032F62;">&#39;bjsxt&#39;</span><span style="color:#24292E;">,pwd:</span><span style="color:#032F62;">&#39;bjsxtpwd&#39;</span><span style="color:#24292E;">,roles:[{role:&#39;userAdminAnyDatabase&#39;,db:&#39;admin&#39;}])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#查看用户</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">show users</span></span></code></pre></div><h2 id="更新用户角色" tabindex="-1">更新用户角色 <a class="header-anchor" href="#更新用户角色" aria-label="Permalink to &quot;更新用户角色&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">语法：db.updateUser( &quot;用户名&quot;,&quot;roles&quot;:[{&quot;role&quot;:&quot;角色名称&quot;},{&quot;更新项2&quot;:&quot;更新内容&quot;}])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;db.system.users.find();</span></span>
<span class="line"><span style="color:#e1e4e8;">{ &quot;_id&quot; : &quot;test.testuser&quot;, &quot;userId&quot; : UUID(&quot;334e360a-eedb-4b15-bf74-dbd0b471017a&quot;), &quot;user&quot; : &quot;testuser&quot;, &quot;db&quot; : &quot;test&quot;, &quot;credentials&quot; : { &quot;SCRAM-SHA-1&quot; : { &quot;iterationCount&quot; : 10000, &quot;salt&quot; : &quot;GLiQHuCyw0arlAaU4im+Tw==&quot;, &quot;storedKey&quot; : &quot;Kczjk8bCUkgTzAM7T8uWeSC/lZY=&quot;, &quot;serverKey&quot; : &quot;TWx/lx5SaTO3eWtJv62KVSlKGvo=&quot; }, &quot;SCRAM-SHA-256&quot; : { &quot;iterationCount&quot; : 15000, &quot;salt&quot; : &quot;Htwx1Oe9fktN028lqayj3b+jxZ7AsTt9SzQ15A==&quot;, &quot;storedKey&quot; : &quot;fNPhyvhxMs4VDvsXrabRDEOqRS9MmNXZZeFzri/rDYY=&quot;, &quot;serverKey&quot; : &quot;FO7BUayfvl3ZqPYHpkTQHGgU1cST9VzUmubku6YQY34=&quot; } }, &quot;roles&quot; : [ { &quot;role&quot; : &quot;readWrite&quot;, &quot;db&quot; : &quot;test&quot; } ] }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#更新</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;use test</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;db.updateUser(&quot;testuser&quot;,{roles : [{&quot;role&quot; : &quot;userAdminAnyDatabase&quot;,&quot;db&quot; : &quot;admin&quot;},{&quot;role&quot; : &quot;dbAdminAnyDatabase&quot;,&quot;db&quot; : &quot;admin&quot;}]})</span></span>
<span class="line"><span style="color:#e1e4e8;">标注：如果没有提示任何信息则表示更新成功。退出当前客户端重新连接即可生效</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">语法：db.updateUser( &quot;用户名&quot;,&quot;roles&quot;:[{&quot;role&quot;:&quot;角色名称&quot;},{&quot;更新项2&quot;:&quot;更新内容&quot;}])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;use admin</span></span>
<span class="line"><span style="color:#24292e;">&gt;db.system.users.find();</span></span>
<span class="line"><span style="color:#24292e;">{ &quot;_id&quot; : &quot;test.testuser&quot;, &quot;userId&quot; : UUID(&quot;334e360a-eedb-4b15-bf74-dbd0b471017a&quot;), &quot;user&quot; : &quot;testuser&quot;, &quot;db&quot; : &quot;test&quot;, &quot;credentials&quot; : { &quot;SCRAM-SHA-1&quot; : { &quot;iterationCount&quot; : 10000, &quot;salt&quot; : &quot;GLiQHuCyw0arlAaU4im+Tw==&quot;, &quot;storedKey&quot; : &quot;Kczjk8bCUkgTzAM7T8uWeSC/lZY=&quot;, &quot;serverKey&quot; : &quot;TWx/lx5SaTO3eWtJv62KVSlKGvo=&quot; }, &quot;SCRAM-SHA-256&quot; : { &quot;iterationCount&quot; : 15000, &quot;salt&quot; : &quot;Htwx1Oe9fktN028lqayj3b+jxZ7AsTt9SzQ15A==&quot;, &quot;storedKey&quot; : &quot;fNPhyvhxMs4VDvsXrabRDEOqRS9MmNXZZeFzri/rDYY=&quot;, &quot;serverKey&quot; : &quot;FO7BUayfvl3ZqPYHpkTQHGgU1cST9VzUmubku6YQY34=&quot; } }, &quot;roles&quot; : [ { &quot;role&quot; : &quot;readWrite&quot;, &quot;db&quot; : &quot;test&quot; } ] }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#更新</span></span>
<span class="line"><span style="color:#24292e;">&gt;use test</span></span>
<span class="line"><span style="color:#24292e;">&gt;db.updateUser(&quot;testuser&quot;,{roles : [{&quot;role&quot; : &quot;userAdminAnyDatabase&quot;,&quot;db&quot; : &quot;admin&quot;},{&quot;role&quot; : &quot;dbAdminAnyDatabase&quot;,&quot;db&quot; : &quot;admin&quot;}]})</span></span>
<span class="line"><span style="color:#24292e;">标注：如果没有提示任何信息则表示更新成功。退出当前客户端重新连接即可生效</span></span></code></pre></div><ul><li>查看当前用户信息</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show users;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;_id&quot; : &quot;test.testuser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;userId&quot; : UUID(&quot;334e360a-eedb-4b15-bf74-dbd0b471017a&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;user&quot; : &quot;testuser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;db&quot; : &quot;test&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;roles&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;role&quot; : &quot;dbAdminAnyDatabase&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;db&quot; : &quot;admin&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;role&quot; : &quot;userAdminAnyDatabase&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;db&quot; : &quot;admin&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	],</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;mechanisms&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;SCRAM-SHA-1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;db.system.users.find();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;use test;</span></span>
<span class="line"><span style="color:#24292e;">&gt; show users;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;_id&quot; : &quot;test.testuser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;userId&quot; : UUID(&quot;334e360a-eedb-4b15-bf74-dbd0b471017a&quot;),</span></span>
<span class="line"><span style="color:#24292e;">	&quot;user&quot; : &quot;testuser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;db&quot; : &quot;test&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;roles&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;role&quot; : &quot;dbAdminAnyDatabase&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;db&quot; : &quot;admin&quot;</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;role&quot; : &quot;userAdminAnyDatabase&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;db&quot; : &quot;admin&quot;</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	],</span></span>
<span class="line"><span style="color:#24292e;">	&quot;mechanisms&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		&quot;SCRAM-SHA-1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#24292e;">	]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">&gt;db.system.users.find();</span></span></code></pre></div><h2 id="更新用户密码" tabindex="-1">更新用户密码 <a class="header-anchor" href="#更新用户密码" aria-label="Permalink to &quot;更新用户密码&quot;">​</a></h2><p>更新用户密码有两种方式：</p><p>1）使用db.updateUser()函数更新密码。</p><p>2）使用db.changeUserPassword()函数更新密码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">语法格式：db.updateUser(&quot;用户名&quot;,{&quot;pwd&quot;:&quot;新密码&quot;})</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use test</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db test</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.updateUser(&quot;testuser&quot;,{&quot;pwd&quot;:&quot;123456&quot;})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">语法格式：db.updateUser(&quot;用户名&quot;,{&quot;pwd&quot;:&quot;新密码&quot;})</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; use test</span></span>
<span class="line"><span style="color:#24292e;">switched to db test</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.updateUser(&quot;testuser&quot;,{&quot;pwd&quot;:&quot;123456&quot;})</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">语法格式：db.changeUserPassword(&quot;用户名&quot;,&quot;新密码&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;db.changeUserPassword(&quot;testuser&quot;,&quot;123&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">语法格式：db.changeUserPassword(&quot;用户名&quot;,&quot;新密码&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;use test;</span></span>
<span class="line"><span style="color:#24292e;">&gt;db.changeUserPassword(&quot;testuser&quot;,&quot;123&quot;)</span></span></code></pre></div><h2 id="权限修改" tabindex="-1">权限修改 <a class="header-anchor" href="#权限修改" aria-label="Permalink to &quot;权限修改&quot;">​</a></h2><p>注：updateuser它是完全替换之前的值，如果要新增或添加roles而不是代替它</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show users</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;_id&quot; : &quot;test.testuser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;userId&quot; : UUID(&quot;1a81e6ae-e80e-48eb-a526-6596988518a7&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;user&quot; : &quot;testuser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;db&quot; : &quot;test&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;roles&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;role&quot; : &quot;readWrite&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;db&quot; : &quot;test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	],</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;mechanisms&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;SCRAM-SHA-1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.grantRolesToUser(&quot;testuser&quot;, [{role:&quot;readWrite&quot;, db:&quot;test&quot;},{role:&quot;read&quot;, db:&quot;test&quot;}]) </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show users</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;_id&quot; : &quot;test.testuser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;userId&quot; : UUID(&quot;1a81e6ae-e80e-48eb-a526-6596988518a7&quot;),</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;user&quot; : &quot;testuser&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;db&quot; : &quot;test&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;roles&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;role&quot; : &quot;readWrite&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;db&quot; : &quot;test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">		},</span></span>
<span class="line"><span style="color:#e1e4e8;">		{</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;role&quot; : &quot;read&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			&quot;db&quot; : &quot;test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	],</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;mechanisms&quot; : [</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;SCRAM-SHA-1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show users</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;_id&quot; : &quot;test.testuser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;userId&quot; : UUID(&quot;1a81e6ae-e80e-48eb-a526-6596988518a7&quot;),</span></span>
<span class="line"><span style="color:#24292e;">	&quot;user&quot; : &quot;testuser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;db&quot; : &quot;test&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;roles&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;role&quot; : &quot;readWrite&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;db&quot; : &quot;test&quot;</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	],</span></span>
<span class="line"><span style="color:#24292e;">	&quot;mechanisms&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		&quot;SCRAM-SHA-1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#24292e;">	]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.grantRolesToUser(&quot;testuser&quot;, [{role:&quot;readWrite&quot;, db:&quot;test&quot;},{role:&quot;read&quot;, db:&quot;test&quot;}]) </span></span>
<span class="line"><span style="color:#24292e;">&gt; show users</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;_id&quot; : &quot;test.testuser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;userId&quot; : UUID(&quot;1a81e6ae-e80e-48eb-a526-6596988518a7&quot;),</span></span>
<span class="line"><span style="color:#24292e;">	&quot;user&quot; : &quot;testuser&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;db&quot; : &quot;test&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;roles&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;role&quot; : &quot;readWrite&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;db&quot; : &quot;test&quot;</span></span>
<span class="line"><span style="color:#24292e;">		},</span></span>
<span class="line"><span style="color:#24292e;">		{</span></span>
<span class="line"><span style="color:#24292e;">			&quot;role&quot; : &quot;read&quot;,</span></span>
<span class="line"><span style="color:#24292e;">			&quot;db&quot; : &quot;test&quot;</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	],</span></span>
<span class="line"><span style="color:#24292e;">	&quot;mechanisms&quot; : [</span></span>
<span class="line"><span style="color:#24292e;">		&quot;SCRAM-SHA-1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#24292e;">	]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="权限收回" tabindex="-1">权限收回 <a class="header-anchor" href="#权限收回" aria-label="Permalink to &quot;权限收回&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&gt;use</span><span style="color:#E1E4E8;"> test</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> show users</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;_id&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;test.testuser&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;userId&quot;</span><span style="color:#E1E4E8;"> : UUID(</span><span style="color:#9ECBFF;">&quot;1a81e6ae-e80e-48eb-a526-6596988518a7&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;testuser&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;db&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;roles&quot;</span><span style="color:#E1E4E8;"> : [</span></span>
<span class="line"><span style="color:#E1E4E8;">		{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;role&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;readWrite&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;db&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">		{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;role&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;read&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">&quot;db&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	],</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;mechanisms&quot;</span><span style="color:#E1E4E8;"> : [</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;SCRAM-SHA-1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#9ECBFF;">&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">db</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">revokeRolesFromUser</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;testuser&quot;</span><span style="color:#E1E4E8;">,[{role:&quot;read&quot;, db:&quot;test&quot;}])</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">show users;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&gt;use</span><span style="color:#24292E;"> test</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> show users</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;_id&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;test.testuser&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;userId&quot;</span><span style="color:#24292E;"> : UUID(</span><span style="color:#032F62;">&quot;1a81e6ae-e80e-48eb-a526-6596988518a7&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;testuser&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;db&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;roles&quot;</span><span style="color:#24292E;"> : [</span></span>
<span class="line"><span style="color:#24292E;">		{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;role&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;readWrite&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;db&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;test&quot;</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">		{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;role&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;read&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">&quot;db&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;test&quot;</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	],</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;mechanisms&quot;</span><span style="color:#24292E;"> : [</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;SCRAM-SHA-1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#032F62;">&quot;SCRAM-SHA-256&quot;</span></span>
<span class="line"><span style="color:#24292E;">	]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">db</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">revokeRolesFromUser</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;testuser&quot;</span><span style="color:#24292E;">,[{role:&quot;read&quot;, db:&quot;test&quot;}])</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">show users;</span></span></code></pre></div><h2 id="删除用户" tabindex="-1">删除用户 <a class="header-anchor" href="#删除用户" aria-label="Permalink to &quot;删除用户&quot;">​</a></h2><p>通过db.dropUser()函数可删除指定用户。删除成功后会返回true。在删除用户时<code>需要切换到创建时用户所指定的数据库中才可以删除</code>。</p><blockquote><p>注意：需要使用具有userAdminAnyDatabse角色管理员用户才可以删除其他用户</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; use test;</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db test</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.dropUser(&quot;testuser&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">标注：该函数返回了true，表示删除成功</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; use test;</span></span>
<span class="line"><span style="color:#24292e;">switched to db test</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.dropUser(&quot;testuser&quot;);</span></span>
<span class="line"><span style="color:#24292e;">true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">标注：该函数返回了true，表示删除成功</span></span></code></pre></div><p>官方文档：<a href="https://docs.mongodb.com/manual/reference/method/db.createUser/" target="_blank" rel="noreferrer">https://docs.mongodb.com/manual/reference/method/db.createUser/</a></p><h3 id="案例" tabindex="-1">案例： <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例：&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">db.createUser({</span></span>
<span class="line"><span style="color:#e1e4e8;">	user:&quot;user01&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	pwd:&quot;123456&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	customData:{</span></span>
<span class="line"><span style="color:#e1e4e8;">		name:&#39;tom&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		email:&#39;ss@qq.com&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		age:18,</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">	roles:[</span></span>
<span class="line"><span style="color:#e1e4e8;">		{role:&quot;readWrite&quot;,db:&quot;test&quot;},</span></span>
<span class="line"><span style="color:#e1e4e8;">		{role:&quot;readWrite&quot;,db:&quot;test&quot;},</span></span>
<span class="line"><span style="color:#e1e4e8;">		&#39;read&#39; //对其他数据库只有读权限，对test有读写</span></span>
<span class="line"><span style="color:#e1e4e8;">	]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#修改含有描述信息的密码账户</span></span>
<span class="line"><span style="color:#e1e4e8;">db.runCommand(</span></span>
<span class="line"><span style="color:#e1e4e8;">	{</span></span>
<span class="line"><span style="color:#e1e4e8;">		updateUser:&quot;username&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		pwd:&quot;123456&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">		customData:{</span></span>
<span class="line"><span style="color:#e1e4e8;">			name:&#39;tom&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			email:&#39;ss@qq.com&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">			age:18,</span></span>
<span class="line"><span style="color:#e1e4e8;">		}</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">db.createUser({</span></span>
<span class="line"><span style="color:#24292e;">	user:&quot;user01&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	pwd:&quot;123456&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	customData:{</span></span>
<span class="line"><span style="color:#24292e;">		name:&#39;tom&#39;,</span></span>
<span class="line"><span style="color:#24292e;">		email:&#39;ss@qq.com&#39;,</span></span>
<span class="line"><span style="color:#24292e;">		age:18,</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">	roles:[</span></span>
<span class="line"><span style="color:#24292e;">		{role:&quot;readWrite&quot;,db:&quot;test&quot;},</span></span>
<span class="line"><span style="color:#24292e;">		{role:&quot;readWrite&quot;,db:&quot;test&quot;},</span></span>
<span class="line"><span style="color:#24292e;">		&#39;read&#39; //对其他数据库只有读权限，对test有读写</span></span>
<span class="line"><span style="color:#24292e;">	]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#修改含有描述信息的密码账户</span></span>
<span class="line"><span style="color:#24292e;">db.runCommand(</span></span>
<span class="line"><span style="color:#24292e;">	{</span></span>
<span class="line"><span style="color:#24292e;">		updateUser:&quot;username&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		pwd:&quot;123456&quot;,</span></span>
<span class="line"><span style="color:#24292e;">		customData:{</span></span>
<span class="line"><span style="color:#24292e;">			name:&#39;tom&#39;,</span></span>
<span class="line"><span style="color:#24292e;">			email:&#39;ss@qq.com&#39;,</span></span>
<span class="line"><span style="color:#24292e;">			age:18,</span></span>
<span class="line"><span style="color:#24292e;">		}</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div><h3 id="net方式连接" tabindex="-1">net方式连接 <a class="header-anchor" href="#net方式连接" aria-label="Permalink to &quot;net方式连接&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongodb://leihuo:fa2e5474db854dd@172.16.195.193:47017/EiduApp?authSource=EiduApp&amp;authMechanism=SCRAM-SHA-1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongodb://leihuo:fa2e5474db854dd@172.16.195.193:47017/EiduApp?authSource=EiduApp&amp;authMechanism=SCRAM-SHA-1</span></span></code></pre></div><h1 id="_6-集群角色" tabindex="-1">6.集群角色 <a class="header-anchor" href="#_6-集群角色" aria-label="Permalink to &quot;6.集群角色&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#让这名用户能够访问系统中的所有数据库、创建新的数据库以及管理 MongoDB 集群和副本集</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">switched to db admin</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; db.createUser(</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">user: &quot;dbadmin&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">pwd: &quot;abc123&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">roles: [ &quot;readWriteAnyDatabase&quot;, &quot;dbAdminAnyDatabase&quot;,&quot;clusterAdmin&quot; ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#让这名用户能够访问系统中的所有数据库、创建新的数据库以及管理 MongoDB 集群和副本集</span></span>
<span class="line"><span style="color:#24292e;">&gt; use admin</span></span>
<span class="line"><span style="color:#24292e;">switched to db admin</span></span>
<span class="line"><span style="color:#24292e;">&gt; db.createUser(</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">user: &quot;dbadmin&quot;,</span></span>
<span class="line"><span style="color:#24292e;">pwd: &quot;abc123&quot;,</span></span>
<span class="line"><span style="color:#24292e;">roles: [ &quot;readWriteAnyDatabase&quot;, &quot;dbAdminAnyDatabase&quot;,&quot;clusterAdmin&quot; ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">)</span></span></code></pre></div>`,86),o=[t];function p(r,c,i,d,u,y){return e(),a("div",null,o)}const h=s(l,[["render",p]]);export{b as __pageData,h as default};
