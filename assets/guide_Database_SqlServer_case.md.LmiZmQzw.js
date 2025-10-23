import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const R=JSON.parse('{"title":"一、解锁","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/SqlServer/case.md","filePath":"guide/Database/SqlServer/case.md","lastUpdated":1720533756000}'),l={name:"guide/Database/SqlServer/case.md"},e=p(`<h1 id="一、解锁" tabindex="-1">一、解锁 <a class="header-anchor" href="#一、解锁" aria-label="Permalink to &quot;一、解锁&quot;">​</a></h1><p>系统管理员无法将该帐户解锁 解决方法</p><p>MSSQL提示：帐户当前被锁定,所以用户 ‘sa’ 登录失败。系统管理员无法将该帐户解锁’解决方法</p><p>原因：如果短时间内不停连接，就会被SQL SERVER误认为是这是攻击，会将此账号锁定。</p><p>解决方法：要用windows身份验证登录，在查询分析器里输入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER LOGIN sa ENABLE ;</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER LOGIN sa WITH PASSWORD = &#39;password&#39; unlock, check_policy = off,</span></span>
<span class="line"><span style="color:#e1e4e8;">check_expiration = off ;</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER LOGIN sa ENABLE ;</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;">ALTER LOGIN sa WITH PASSWORD = &#39;password&#39; unlock, check_policy = off,</span></span>
<span class="line"><span style="color:#24292e;">check_expiration = off ;</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span></code></pre></div><h1 id="二、日志文件收缩" tabindex="-1">二、日志文件收缩 <a class="header-anchor" href="#二、日志文件收缩" aria-label="Permalink to &quot;二、日志文件收缩&quot;">​</a></h1><p>第一步： 在SQL SERVER Management Studio 中右击数据库选择“属性”—》“选项”，将恢复模式由默认的“完整”改为“简单”</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141125229.png" alt="26"></p><p>第二步：再次右键选择数据库的“任务”–》“收缩”—》“文件”菜单，进入收缩文件页面，将（要收缩的）文件类型选定为“日志”， 将页面下面的“收缩操作”单选框里选择“在释放未使用的空间前重新组织页，将文件收缩到：”，然后填写合适的收缩后的日志文件大小。</p><p>最后点击这个页面下面的“确定”按钮，以执行收缩文件（日志）操作。</p><p>执行完毕后，用户可以查到到的确该日志文件收缩到指定的大小了</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141125075.png" alt="27"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141125059.png" alt="28"></p><h2 id="使用命令方式" tabindex="-1">使用命令方式 <a class="header-anchor" href="#使用命令方式" aria-label="Permalink to &quot;使用命令方式&quot;">​</a></h2><p>第一种方式当遇到日志文件过于庞大时可能无法生效，因此建议采用第二种方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">USE 数据库名称;</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER DATABASE 数据库名称</span></span>
<span class="line"><span style="color:#e1e4e8;">SET RECOVERY SIMPLE;</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;">-- Shrink the truncated log file to 10 MB.</span></span>
<span class="line"><span style="color:#e1e4e8;">-- 数据库日志文件 为带_log文件</span></span>
<span class="line"><span style="color:#e1e4e8;">DBCC SHRINKFILE (数据库日志名称, 10);</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;">-- Reset the database recovery model.</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER DATABASE 数据库名称</span></span>
<span class="line"><span style="color:#e1e4e8;">SET RECOVERY FULL;</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">USE 数据库名称;</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER DATABASE 数据库名称</span></span>
<span class="line"><span style="color:#24292e;">SET RECOVERY SIMPLE;</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;">-- Shrink the truncated log file to 10 MB.</span></span>
<span class="line"><span style="color:#24292e;">-- 数据库日志文件 为带_log文件</span></span>
<span class="line"><span style="color:#24292e;">DBCC SHRINKFILE (数据库日志名称, 10);</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;">-- Reset the database recovery model.</span></span>
<span class="line"><span style="color:#24292e;">ALTER DATABASE 数据库名称</span></span>
<span class="line"><span style="color:#24292e;">SET RECOVERY FULL;</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span></code></pre></div><h2 id="_3-程序集" tabindex="-1">3.程序集 <a class="header-anchor" href="#_3-程序集" aria-label="Permalink to &quot;3.程序集&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">---开启所有服务器配置选项</span></span>
<span class="line"><span style="color:#F97583;">EXEC</span><span style="color:#E1E4E8;"> sp_configure </span><span style="color:#9ECBFF;">N&#39;show advanced options&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">N&#39;1&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">RECONFIGURE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">OVERRIDE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--开启clr enabled 选项</span></span>
<span class="line"><span style="color:#F97583;">EXEC</span><span style="color:#E1E4E8;"> sp_configure </span><span style="color:#9ECBFF;">N&#39;clr enabled&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">N&#39;1&#39;</span></span>
<span class="line"><span style="color:#F97583;">RECONFIGURE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">OVERRIDE</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--关闭所有服务器配置选项</span></span>
<span class="line"><span style="color:#F97583;">EXEC</span><span style="color:#E1E4E8;"> sp_configure </span><span style="color:#9ECBFF;">N&#39;show advanced options&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">N&#39;0&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">RECONFIGURE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">OVERRIDE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--如果存在权限问题，执行下面一段脚本</span></span>
<span class="line"><span style="color:#F97583;">alter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">database</span><span style="color:#E1E4E8;"> [db_name] </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TRUSTWORTHY</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">on</span></span>
<span class="line"><span style="color:#F97583;">EXEC</span><span style="color:#E1E4E8;"> sp_changedbowner </span><span style="color:#9ECBFF;">&#39;sa&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">---开启所有服务器配置选项</span></span>
<span class="line"><span style="color:#D73A49;">EXEC</span><span style="color:#24292E;"> sp_configure </span><span style="color:#032F62;">N&#39;show advanced options&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">N&#39;1&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">RECONFIGURE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">OVERRIDE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--开启clr enabled 选项</span></span>
<span class="line"><span style="color:#D73A49;">EXEC</span><span style="color:#24292E;"> sp_configure </span><span style="color:#032F62;">N&#39;clr enabled&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">N&#39;1&#39;</span></span>
<span class="line"><span style="color:#D73A49;">RECONFIGURE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">OVERRIDE</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--关闭所有服务器配置选项</span></span>
<span class="line"><span style="color:#D73A49;">EXEC</span><span style="color:#24292E;"> sp_configure </span><span style="color:#032F62;">N&#39;show advanced options&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">N&#39;0&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">RECONFIGURE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">OVERRIDE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--如果存在权限问题，执行下面一段脚本</span></span>
<span class="line"><span style="color:#D73A49;">alter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">database</span><span style="color:#24292E;"> [db_name] </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TRUSTWORTHY</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">on</span></span>
<span class="line"><span style="color:#D73A49;">EXEC</span><span style="color:#24292E;"> sp_changedbowner </span><span style="color:#032F62;">&#39;sa&#39;</span></span></code></pre></div>`,19),o=[e];function c(t,r,i,E,y,d){return a(),n("div",null,o)}const g=s(l,[["render",c]]);export{R as __pageData,g as default};
