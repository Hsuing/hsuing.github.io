import{_ as n,D as a,o as e,c as p,I as l,w as o,R as c,a as t}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一、基本备份方法","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/SqlServer/0-back.md","filePath":"guide/Database/SqlServer/0-back.md","lastUpdated":1720533756000}'),r={name:"guide/Database/SqlServer/0-back.md"},i=c(`<h1 id="一、基本备份方法" tabindex="-1">一、基本备份方法 <a class="header-anchor" href="#一、基本备份方法" aria-label="Permalink to &quot;一、基本备份方法&quot;">​</a></h1><ol><li>选中需要备份的数据库，右击数据库 选择 ：“任务”—“备份”：</li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141007856.png" alt="2"></p><p>点击备份出现：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141007845.png" alt="3"></p><p>备份的类型：</p><p>（1）完全备份：它可以备份整个数据库，包含用户表、系统表、索引、视图和存储过程等所有数据库对象。但是呢，它也需要花费更多的时间和空间。</p><p>（2）事物日志备份：事务日志备份的内容是从还未被备份的事务日志开始，直到备份结尾的最后一个事务日志为止。</p><p>（3）差异性数据库备份：包括自从上一次完整性备份以来所有改变的数据页，以及备份结尾的部分活动事物日志</p><p>点击添加，选择备份路径，点击确定，备份成功</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141007582.png" alt="4"></p><p>在备份路径，发现出现一个后缀名为.bak数据库文件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141007909.png" alt="5"></p><h1 id="二、作业启动" tabindex="-1">二、作业启动 <a class="header-anchor" href="#二、作业启动" aria-label="Permalink to &quot;二、作业启动&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141007136.png" alt="1"></p><h1 id="三、sql-server维护计划进行自动备份" tabindex="-1">三、SQL Server维护计划进行自动备份 <a class="header-anchor" href="#三、sql-server维护计划进行自动备份" aria-label="Permalink to &quot;三、SQL Server维护计划进行自动备份&quot;">​</a></h1><p>自动备份需要的数据库，在时间、效率上都要比手动备份更加优化。</p><p>首先保证Sql Server的代理服务是开启的。右键点击SQL Server代理–启动</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141007874.png" alt="6"></p><p>选中“对象资源管理器”中的“管理”下的“维护计划”，右击选择“维护计划向导”</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141007579.png" alt="7"></p><p>单击“下一步”</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008404.png" alt="8"></p><p>在如下弹出的“维护计划向导”界面中，输入名称，选择“整个计划统筹安排或无计划”，单击“更改”</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008538.png" alt="9"></p><p>设置自动备份的频率，单击“确定”按钮</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008496.png" alt="10"></p><p>单击下一步后，界面如下图；勾选备份数据库，此时可以选择：完整、差异、事务日志三种类型的备份</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008745.png" alt="11"></p><p>单击下一步，选择需要备份的数据库。比如勾选了“beifen”</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008044.png" alt="12"></p><p>下一步，选择备份目标地址</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008165.png" alt="13"></p><p>最后选择完成，最终结果：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008886.png" alt="14"></p><h1 id="四、sql-server代理进行自动备份" tabindex="-1">四、SQL Server代理进行自动备份 <a class="header-anchor" href="#四、sql-server代理进行自动备份" aria-label="Permalink to &quot;四、SQL Server代理进行自动备份&quot;">​</a></h1><ul><li>牢记开启代理服务</li></ul><p><a href="http://note.youdao.com/noteshare?id=b6c020073776f79626cd5f21c0a074d3" target="_blank" rel="noreferrer">http://note.youdao.com/noteshare?id=b6c020073776f79626cd5f21c0a074d3</a></p><h2 id="_4-1-sql-server代理进行备份数据库文件的自动删除" tabindex="-1">4.1 SQL Server代理进行备份数据库文件的自动删除 <a class="header-anchor" href="#_4-1-sql-server代理进行备份数据库文件的自动删除" aria-label="Permalink to &quot;4.1 SQL Server代理进行备份数据库文件的自动删除&quot;">​</a></h2><p>前面备份了数据库文件，如果手动删除是不现实的</p><p>步骤类似目录三，新建作业</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008552.png" alt="15"></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">DECLARE</span><span style="color:#E1E4E8;"> @OLDDATE </span><span style="color:#F97583;">DATETIME</span></span>
<span class="line"><span style="color:#F97583;">SELECT</span><span style="color:#E1E4E8;"> @OLDDATE</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">GETDATE</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">20</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">EXECUTE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">master</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">dbo</span><span style="color:#E1E4E8;">.xp_delete_file </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">N&#39;E:\\backup_ceimm2\\&#39;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">N&#39;bak&#39;</span><span style="color:#E1E4E8;">,@olddate</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">说明：删除E:\\backup_ceimm2 目录下，格式为bak的20天前的文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">DECLARE</span><span style="color:#24292E;"> @OLDDATE </span><span style="color:#D73A49;">DATETIME</span></span>
<span class="line"><span style="color:#D73A49;">SELECT</span><span style="color:#24292E;"> @OLDDATE</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">GETDATE</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">20</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">EXECUTE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">master</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">dbo</span><span style="color:#24292E;">.xp_delete_file </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span><span style="color:#032F62;">N&#39;E:\\backup_ceimm2\\&#39;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">N&#39;bak&#39;</span><span style="color:#24292E;">,@olddate</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">说明：删除E:\\backup_ceimm2 目录下，格式为bak的20天前的文件</span></span></code></pre></div><h1 id="五、sql-server维护计划进行备份数据库文件的自动删除" tabindex="-1">五、SQL Server维护计划进行备份数据库文件的自动删除 <a class="header-anchor" href="#五、sql-server维护计划进行备份数据库文件的自动删除" aria-label="Permalink to &quot;五、SQL Server维护计划进行备份数据库文件的自动删除&quot;">​</a></h1><ol><li>进入管理-维护计划</li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008798.png" alt="16"></p><ol start="2"><li>步骤类似目录二，新建维护计划</li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008592.png" alt="17"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141008962.png" alt="19"></p><ul><li>备份名字不允许出现中文</li></ul><h1 id="六、bak数据库文件的还原" tabindex="-1">六、bak数据库文件的还原 <a class="header-anchor" href="#六、bak数据库文件的还原" aria-label="Permalink to &quot;六、bak数据库文件的还原&quot;">​</a></h1><ol><li>打开SQL server 数据库，右击数据库在列表中选择还原数据库，会弹出还原数据库的窗口，选择原设备按钮，然后点击原设备右边的文件选择按钮</li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010381.png" alt="20"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010739.png" alt="21"></p><p>选择指定目录下bak文件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010754.png" alt="22"></p><p>目标数据库需要与你要还原的数据库一致，在下拉菜单中有，直接选择就可以了</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010177.png" alt="23"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010655.png" alt="24"></p><p>数据库还原问题：</p><p>System.Data.SqlClient.SqlError: 因为数据库正在使用，所以无法获得对数据库的独占访问权。 (Microsoft.SqlServer.SmoExtended)。出现此问题的原因是在还原数据库时，有其他用户正在使用数据库。还原数据库要求数据库工作在单用户模式。通常就是DBA在操作时，不允许其他用户连接数据库</p><p>解决方案1.</p><p>如果你使用管理工具还原数据库并且在Microsoft SQL Server Management Studio 2016或以上版本的话，可以在还原的时候勾选&quot;关闭到目标数据库的现有链接&quot;</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010877.png" alt="25"></p><p>解决方案2：</p><p>如果你的SqlServer Management Studio的版本比较低，可以设置数据库为单用户模式，执行完还原操作后，恢复为多用户模式</p><p>方法一（最方便）：右键点击数据库 -&gt; 属性 -&gt; 选项 -&gt; 状态 -&gt; 限制访问 -&gt; 选择Single-&gt; 确定。然后还原。</p><p>方法二（最直接）：断开数据库连接</p><p>方法三（最暴力）：注销/重启数据库服务器</p><p>方法四（最麻烦）：写代码修改数据库相关属性，虽然麻烦，有的时候还是要用到，那就用到的时候再研究。</p><p>方法五（终级解决方案）： 关键SQL语句：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER DATABASE [datebase] SET OFFLINE WITH ROLLBACK IMMEDIATE</span></span>
<span class="line"><span style="color:#e1e4e8;">用完之后再</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER  database  [ datebase]  set   online</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER DATABASE [datebase] SET OFFLINE WITH ROLLBACK IMMEDIATE</span></span>
<span class="line"><span style="color:#24292e;">用完之后再</span></span>
<span class="line"><span style="color:#24292e;">ALTER  database  [ datebase]  set   online</span></span></code></pre></div><h1 id="七、sqlserver批量备份多个数据库且删除3天前的备份" tabindex="-1">七、SqlServer批量备份多个数据库且删除3天前的备份 <a class="header-anchor" href="#七、sqlserver批量备份多个数据库且删除3天前的备份" aria-label="Permalink to &quot;七、SqlServer批量备份多个数据库且删除3天前的备份&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/*******************************************</span></span>
<span class="line"><span style="color:#e1e4e8;"> * 批量备份数据库且删除3天前的备份</span></span>
<span class="line"><span style="color:#e1e4e8;"> *******************************************/</span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @backupfile VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @backdesc VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @filename VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @path VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @dbname VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @extension_name VARCHAR(16)  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">--备份参数  </span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE tmp_Cur CURSOR  </span></span>
<span class="line"><span style="color:#e1e4e8;">FOR  </span></span>
<span class="line"><span style="color:#e1e4e8;">    SELECT  NAME  </span></span>
<span class="line"><span style="color:#e1e4e8;">    FROM    [sys].[databases]  </span></span>
<span class="line"><span style="color:#e1e4e8;">    WHERE   NAME NOT IN ( &#39;master&#39;, &#39;model&#39;,&#39;msdb&#39;,&#39;tempdb&#39; )  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">SET @path = N&#39;D:\\Backup\\Autoback\\&#39;;  </span></span>
<span class="line"><span style="color:#e1e4e8;">SET @extension_name = N&#39;bak&#39;;  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">--生成文件名  </span></span>
<span class="line"><span style="color:#e1e4e8;">SET @filename = CONVERT(VARCHAR(1024), GETDATE(), 120)  </span></span>
<span class="line"><span style="color:#e1e4e8;">SET @filename = REPLACE(@filename, &#39;:&#39;, &#39;&#39;)  </span></span>
<span class="line"><span style="color:#e1e4e8;">SET @filename = REPLACE(@filename, &#39;-&#39;, &#39;&#39;)  </span></span>
<span class="line"><span style="color:#e1e4e8;">SET @filename = REPLACE(@filename, &#39; &#39;, &#39;&#39;)  </span></span>
<span class="line"><span style="color:#e1e4e8;">SET @filename = @filename + &#39;_&#39; + CONVERT (VARCHAR(3), DATEPART(ms, GETDATE()))  </span></span>
<span class="line"><span style="color:#e1e4e8;">    + N&#39;.&#39; + @extension_name  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">OPEN tmp_Cur;  </span></span>
<span class="line"><span style="color:#e1e4e8;">FETCH NEXT FROM tmp_Cur INTO @dbname;  </span></span>
<span class="line"><span style="color:#e1e4e8;">WHILE @@FETCH_STATUS = 0   </span></span>
<span class="line"><span style="color:#e1e4e8;">    BEGIN  </span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 得到完整目标文件，数据库将备份到这个文件中  </span></span>
<span class="line"><span style="color:#e1e4e8;">        SET @backupfile = @path + @dbname + @filename  </span></span>
<span class="line"><span style="color:#e1e4e8;">        --SELECT  @backupfile  </span></span>
<span class="line"><span style="color:#e1e4e8;">        SET @backdesc =@dbname + N&#39;-完整 数据库 备份&#39;  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">        -- 开始备份, COMPRESSION 参数表示压缩，可节省磁盘空间  </span></span>
<span class="line"><span style="color:#e1e4e8;">        BACKUP DATABASE @dbname TO DISK = @backupfile WITH NOFORMAT, NOINIT,  NAME = @backdesc, SKIP, NOREWIND, NOUNLOAD,  STATS = 10, COMPRESSION  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">        FETCH NEXT FROM tmp_Cur INTO @dbname  </span></span>
<span class="line"><span style="color:#e1e4e8;">    END  </span></span>
<span class="line"><span style="color:#e1e4e8;">CLOSE tmp_Cur;  </span></span>
<span class="line"><span style="color:#e1e4e8;">DEALLOCATE tmp_Cur;  </span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">-- 删除3天前的备份文件  </span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @olddate DATETIME  </span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT  @olddate = DATEADD(d, -3, GETDATE())  </span></span>
<span class="line"><span style="color:#e1e4e8;">-- 执行删除 (SQL 2008 具备)  </span></span>
<span class="line"><span style="color:#e1e4e8;">EXECUTE master.dbo.xp_delete_file 0, @path, @extension_name, @olddate, 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/*******************************************</span></span>
<span class="line"><span style="color:#24292e;"> * 批量备份数据库且删除3天前的备份</span></span>
<span class="line"><span style="color:#24292e;"> *******************************************/</span></span>
<span class="line"><span style="color:#24292e;">DECLARE @backupfile VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#24292e;">DECLARE @backdesc VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#24292e;">DECLARE @filename VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#24292e;">DECLARE @path VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#24292e;">DECLARE @dbname VARCHAR(1024)  </span></span>
<span class="line"><span style="color:#24292e;">DECLARE @extension_name VARCHAR(16)  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">--备份参数  </span></span>
<span class="line"><span style="color:#24292e;">DECLARE tmp_Cur CURSOR  </span></span>
<span class="line"><span style="color:#24292e;">FOR  </span></span>
<span class="line"><span style="color:#24292e;">    SELECT  NAME  </span></span>
<span class="line"><span style="color:#24292e;">    FROM    [sys].[databases]  </span></span>
<span class="line"><span style="color:#24292e;">    WHERE   NAME NOT IN ( &#39;master&#39;, &#39;model&#39;,&#39;msdb&#39;,&#39;tempdb&#39; )  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">SET @path = N&#39;D:\\Backup\\Autoback\\&#39;;  </span></span>
<span class="line"><span style="color:#24292e;">SET @extension_name = N&#39;bak&#39;;  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">--生成文件名  </span></span>
<span class="line"><span style="color:#24292e;">SET @filename = CONVERT(VARCHAR(1024), GETDATE(), 120)  </span></span>
<span class="line"><span style="color:#24292e;">SET @filename = REPLACE(@filename, &#39;:&#39;, &#39;&#39;)  </span></span>
<span class="line"><span style="color:#24292e;">SET @filename = REPLACE(@filename, &#39;-&#39;, &#39;&#39;)  </span></span>
<span class="line"><span style="color:#24292e;">SET @filename = REPLACE(@filename, &#39; &#39;, &#39;&#39;)  </span></span>
<span class="line"><span style="color:#24292e;">SET @filename = @filename + &#39;_&#39; + CONVERT (VARCHAR(3), DATEPART(ms, GETDATE()))  </span></span>
<span class="line"><span style="color:#24292e;">    + N&#39;.&#39; + @extension_name  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">OPEN tmp_Cur;  </span></span>
<span class="line"><span style="color:#24292e;">FETCH NEXT FROM tmp_Cur INTO @dbname;  </span></span>
<span class="line"><span style="color:#24292e;">WHILE @@FETCH_STATUS = 0   </span></span>
<span class="line"><span style="color:#24292e;">    BEGIN  </span></span>
<span class="line"><span style="color:#24292e;">        -- 得到完整目标文件，数据库将备份到这个文件中  </span></span>
<span class="line"><span style="color:#24292e;">        SET @backupfile = @path + @dbname + @filename  </span></span>
<span class="line"><span style="color:#24292e;">        --SELECT  @backupfile  </span></span>
<span class="line"><span style="color:#24292e;">        SET @backdesc =@dbname + N&#39;-完整 数据库 备份&#39;  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">        -- 开始备份, COMPRESSION 参数表示压缩，可节省磁盘空间  </span></span>
<span class="line"><span style="color:#24292e;">        BACKUP DATABASE @dbname TO DISK = @backupfile WITH NOFORMAT, NOINIT,  NAME = @backdesc, SKIP, NOREWIND, NOUNLOAD,  STATS = 10, COMPRESSION  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">        FETCH NEXT FROM tmp_Cur INTO @dbname  </span></span>
<span class="line"><span style="color:#24292e;">    END  </span></span>
<span class="line"><span style="color:#24292e;">CLOSE tmp_Cur;  </span></span>
<span class="line"><span style="color:#24292e;">DEALLOCATE tmp_Cur;  </span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">-- 删除3天前的备份文件  </span></span>
<span class="line"><span style="color:#24292e;">DECLARE @olddate DATETIME  </span></span>
<span class="line"><span style="color:#24292e;">SELECT  @olddate = DATEADD(d, -3, GETDATE())  </span></span>
<span class="line"><span style="color:#24292e;">-- 执行删除 (SQL 2008 具备)  </span></span>
<span class="line"><span style="color:#24292e;">EXECUTE master.dbo.xp_delete_file 0, @path, @extension_name, @olddate, 1</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--作业定时压缩脚本支持多库</span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @DatabaseName NVARCHAR(50)</span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE @ExecuteSql NVARCHAR(MAX)</span></span>
<span class="line"><span style="color:#e1e4e8;">SET @ExecuteSql=&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">DECLARE name_cursor CURSOR</span></span>
<span class="line"><span style="color:#e1e4e8;">FOR</span></span>
<span class="line"><span style="color:#e1e4e8;">    SELECT name FROM  master..sysdatabases WHERE name NOT IN ( &#39;master&#39;, &#39;model&#39;, &#39;msdb&#39;, &#39;tempdb&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    &#39;northwind&#39;,&#39;pubs&#39;,&#39;AgentSys&#39;,&#39;ydttimedtask&#39;,&#39;YiDianTongV2&#39; ) </span></span>
<span class="line"><span style="color:#e1e4e8;">OPEN name_cursor;  </span></span>
<span class="line"><span style="color:#e1e4e8;">FETCH NEXT FROM name_cursor INTO @DatabaseName;  </span></span>
<span class="line"><span style="color:#e1e4e8;">WHILE @@FETCH_STATUS = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">    BEGIN   </span></span>
<span class="line"><span style="color:#e1e4e8;">        SET @ExecuteSql =&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        SET @ExecuteSql +=&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            USE [&#39;+@DatabaseName+&#39;];</span></span>
<span class="line"><span style="color:#e1e4e8;">            DECLARE @Error INT</span></span>
<span class="line"><span style="color:#e1e4e8;">            SET @Error=(SELECT TOP 1 size/128.0 - CAST(FILEPROPERTY([NAME], &#39;&#39;SpaceUsed&#39;&#39;) AS int)/128.0 AS AvailableSpaceInMB FROM sys.database_files ORDER BY [NAME] DESC)</span></span>
<span class="line"><span style="color:#e1e4e8;">            --PRINT @Error</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            IF(@Error&gt;1)</span></span>
<span class="line"><span style="color:#e1e4e8;">                BEGIN</span></span>
<span class="line"><span style="color:#e1e4e8;">                    ALTER DATABASE [&#39;+@DatabaseName+&#39;]　　--数据库名字</span></span>
<span class="line"><span style="color:#e1e4e8;">                    SET RECOVERY SIMPLE;　　--设置简单恢复模式</span></span>
<span class="line"><span style="color:#e1e4e8;">                    DBCC SHRINKFILE ([YiDianTongV2], 1);　　--(M)不能小于1M,</span></span>
<span class="line"><span style="color:#e1e4e8;">                    DBCC SHRINKFILE ([YiDianTongV2_log], 1);　　--(M)不能小于1M</span></span>
<span class="line"><span style="color:#e1e4e8;">                    ALTER DATABASE [&#39;+@DatabaseName+&#39;]</span></span>
<span class="line"><span style="color:#e1e4e8;">                    SET RECOVERY FULL;　　--恢复为原来完整模式</span></span>
<span class="line"><span style="color:#e1e4e8;">                END</span></span>
<span class="line"><span style="color:#e1e4e8;">        &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        PRINT @ExecuteSql; --打印</span></span>
<span class="line"><span style="color:#e1e4e8;">        EXEC(@ExecuteSql)  --执行</span></span>
<span class="line"><span style="color:#e1e4e8;">        FETCH NEXT FROM name_cursor INTO @DatabaseName;  </span></span>
<span class="line"><span style="color:#e1e4e8;">    END;  </span></span>
<span class="line"><span style="color:#e1e4e8;">CLOSE name_cursor;  </span></span>
<span class="line"><span style="color:#e1e4e8;">DEALLOCATE name_cursor;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--作业定时压缩脚本支持多库</span></span>
<span class="line"><span style="color:#24292e;">DECLARE @DatabaseName NVARCHAR(50)</span></span>
<span class="line"><span style="color:#24292e;">DECLARE @ExecuteSql NVARCHAR(MAX)</span></span>
<span class="line"><span style="color:#24292e;">SET @ExecuteSql=&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">DECLARE name_cursor CURSOR</span></span>
<span class="line"><span style="color:#24292e;">FOR</span></span>
<span class="line"><span style="color:#24292e;">    SELECT name FROM  master..sysdatabases WHERE name NOT IN ( &#39;master&#39;, &#39;model&#39;, &#39;msdb&#39;, &#39;tempdb&#39;, </span></span>
<span class="line"><span style="color:#24292e;">    &#39;northwind&#39;,&#39;pubs&#39;,&#39;AgentSys&#39;,&#39;ydttimedtask&#39;,&#39;YiDianTongV2&#39; ) </span></span>
<span class="line"><span style="color:#24292e;">OPEN name_cursor;  </span></span>
<span class="line"><span style="color:#24292e;">FETCH NEXT FROM name_cursor INTO @DatabaseName;  </span></span>
<span class="line"><span style="color:#24292e;">WHILE @@FETCH_STATUS = 0</span></span>
<span class="line"><span style="color:#24292e;">    BEGIN   </span></span>
<span class="line"><span style="color:#24292e;">        SET @ExecuteSql =&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">        SET @ExecuteSql +=&#39;</span></span>
<span class="line"><span style="color:#24292e;">            USE [&#39;+@DatabaseName+&#39;];</span></span>
<span class="line"><span style="color:#24292e;">            DECLARE @Error INT</span></span>
<span class="line"><span style="color:#24292e;">            SET @Error=(SELECT TOP 1 size/128.0 - CAST(FILEPROPERTY([NAME], &#39;&#39;SpaceUsed&#39;&#39;) AS int)/128.0 AS AvailableSpaceInMB FROM sys.database_files ORDER BY [NAME] DESC)</span></span>
<span class="line"><span style="color:#24292e;">            --PRINT @Error</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            IF(@Error&gt;1)</span></span>
<span class="line"><span style="color:#24292e;">                BEGIN</span></span>
<span class="line"><span style="color:#24292e;">                    ALTER DATABASE [&#39;+@DatabaseName+&#39;]　　--数据库名字</span></span>
<span class="line"><span style="color:#24292e;">                    SET RECOVERY SIMPLE;　　--设置简单恢复模式</span></span>
<span class="line"><span style="color:#24292e;">                    DBCC SHRINKFILE ([YiDianTongV2], 1);　　--(M)不能小于1M,</span></span>
<span class="line"><span style="color:#24292e;">                    DBCC SHRINKFILE ([YiDianTongV2_log], 1);　　--(M)不能小于1M</span></span>
<span class="line"><span style="color:#24292e;">                    ALTER DATABASE [&#39;+@DatabaseName+&#39;]</span></span>
<span class="line"><span style="color:#24292e;">                    SET RECOVERY FULL;　　--恢复为原来完整模式</span></span>
<span class="line"><span style="color:#24292e;">                END</span></span>
<span class="line"><span style="color:#24292e;">        &#39;</span></span>
<span class="line"><span style="color:#24292e;">        PRINT @ExecuteSql; --打印</span></span>
<span class="line"><span style="color:#24292e;">        EXEC(@ExecuteSql)  --执行</span></span>
<span class="line"><span style="color:#24292e;">        FETCH NEXT FROM name_cursor INTO @DatabaseName;  </span></span>
<span class="line"><span style="color:#24292e;">    END;  </span></span>
<span class="line"><span style="color:#24292e;">CLOSE name_cursor;  </span></span>
<span class="line"><span style="color:#24292e;">DEALLOCATE name_cursor;</span></span></code></pre></div>`,75);function E(y,m,T,A,d,g){const s=a("center");return e(),p("div",null,[l(s,null,{default:o(()=>[t("SQLServer2017自动备份数据库")]),_:1}),i])}const C=n(r,[["render",E]]);export{h as __pageData,C as default};
