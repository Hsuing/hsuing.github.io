import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"一、安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/SqlServer/1-pginstall.md","filePath":"guide/Database/SqlServer/1-pginstall.md","lastUpdated":1720606881000}'),l={name:"guide/Database/SqlServer/1-pginstall.md"},p=n(`<blockquote><p>Centos7安装sqlserver2017</p></blockquote><h1 id="一、安装" tabindex="-1">一、安装 <a class="header-anchor" href="#一、安装" aria-label="Permalink to &quot;一、安装&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#创建目录</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /opt/sqlserver2017</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /opt/sqlserver2017/ </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#下载</span></span>
<span class="line"><span style="color:#e1e4e8;">wget --no-check-certificate https://packages.microsoft.com/rhel/7/mssql-server-2017/mssql-server-14.0.1000.169-2.x86_64.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#安装依赖</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install bzip2 gdb libsss_nss_idmap</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#安装</span></span>
<span class="line"><span style="color:#e1e4e8;">rpm -ivh mssql-server-14.0.1000.169-2.x86_64.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#创建目录</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /opt/sqlserver2017</span></span>
<span class="line"><span style="color:#24292e;">cd /opt/sqlserver2017/ </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#下载</span></span>
<span class="line"><span style="color:#24292e;">wget --no-check-certificate https://packages.microsoft.com/rhel/7/mssql-server-2017/mssql-server-14.0.1000.169-2.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#安装依赖</span></span>
<span class="line"><span style="color:#24292e;">yum install bzip2 gdb libsss_nss_idmap</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#安装</span></span>
<span class="line"><span style="color:#24292e;">rpm -ivh mssql-server-14.0.1000.169-2.x86_64.rpm</span></span></code></pre></div><ul><li>效果图</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010339.jpg" alt="效果图"></p><h2 id="_1-1-配置" tabindex="-1">1.1 配置 <a class="header-anchor" href="#_1-1-配置" aria-label="Permalink to &quot;1.1 配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@iZwz94664y88ud9aroa5veZ sqlserver2017]# /opt/mssql/bin/mssql-conf setup</span></span>
<span class="line"><span style="color:#e1e4e8;">Choose an edition of SQL Server:</span></span>
<span class="line"><span style="color:#e1e4e8;">  1) Evaluation (free, no production use rights, 180-day limit)</span></span>
<span class="line"><span style="color:#e1e4e8;">  2) Developer (free, no production use rights)</span></span>
<span class="line"><span style="color:#e1e4e8;">  3) Express (free)</span></span>
<span class="line"><span style="color:#e1e4e8;">  4) Web (PAID)</span></span>
<span class="line"><span style="color:#e1e4e8;">  5) Standard (PAID)</span></span>
<span class="line"><span style="color:#e1e4e8;">  6) Enterprise (PAID)</span></span>
<span class="line"><span style="color:#e1e4e8;">  7) Enterprise Core (PAID)</span></span>
<span class="line"><span style="color:#e1e4e8;">  8) I bought a license through a retail sales channel and have a product key to enter.</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">Details about editions can be found at</span></span>
<span class="line"><span style="color:#e1e4e8;">https://go.microsoft.com/fwlink/?LinkId=852748&amp;clcid=0x409</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">Use of PAID editions of this software requires separate licensing through a</span></span>
<span class="line"><span style="color:#e1e4e8;">Microsoft Volume Licensing program.</span></span>
<span class="line"><span style="color:#e1e4e8;">By choosing a PAID edition, you are verifying that you have the appropriate</span></span>
<span class="line"><span style="color:#e1e4e8;">number of licenses in place to install and run this software.</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">Enter your edition(1-8): 2</span></span>
<span class="line"><span style="color:#e1e4e8;">The license terms for this product can be found in</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/doc/mssql-server or downloaded from:</span></span>
<span class="line"><span style="color:#e1e4e8;">https://go.microsoft.com/fwlink/?LinkId=855862&amp;clcid=0x409</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">The privacy statement can be viewed at:</span></span>
<span class="line"><span style="color:#e1e4e8;">https://go.microsoft.com/fwlink/?LinkId=853010&amp;clcid=0x409</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">Do you accept the license terms? [Yes/No]:Yes</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">Enter the SQL Server system administrator password: </span></span>
<span class="line"><span style="color:#e1e4e8;">Confirm the SQL Server system administrator password: </span></span>
<span class="line"><span style="color:#e1e4e8;">Configuring SQL Server...</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">Created symlink from /etc/systemd/system/multi-user.target.wants/mssql-server.service to /usr/lib/systemd/system/mssql-server.service.</span></span>
<span class="line"><span style="color:#e1e4e8;">Setup has completed successfully. SQL Server is now starting.</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@iZwz94664y88ud9aroa5veZ sqlserver2017]#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@iZwz94664y88ud9aroa5veZ sqlserver2017]# /opt/mssql/bin/mssql-conf setup</span></span>
<span class="line"><span style="color:#24292e;">Choose an edition of SQL Server:</span></span>
<span class="line"><span style="color:#24292e;">  1) Evaluation (free, no production use rights, 180-day limit)</span></span>
<span class="line"><span style="color:#24292e;">  2) Developer (free, no production use rights)</span></span>
<span class="line"><span style="color:#24292e;">  3) Express (free)</span></span>
<span class="line"><span style="color:#24292e;">  4) Web (PAID)</span></span>
<span class="line"><span style="color:#24292e;">  5) Standard (PAID)</span></span>
<span class="line"><span style="color:#24292e;">  6) Enterprise (PAID)</span></span>
<span class="line"><span style="color:#24292e;">  7) Enterprise Core (PAID)</span></span>
<span class="line"><span style="color:#24292e;">  8) I bought a license through a retail sales channel and have a product key to enter.</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">Details about editions can be found at</span></span>
<span class="line"><span style="color:#24292e;">https://go.microsoft.com/fwlink/?LinkId=852748&amp;clcid=0x409</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">Use of PAID editions of this software requires separate licensing through a</span></span>
<span class="line"><span style="color:#24292e;">Microsoft Volume Licensing program.</span></span>
<span class="line"><span style="color:#24292e;">By choosing a PAID edition, you are verifying that you have the appropriate</span></span>
<span class="line"><span style="color:#24292e;">number of licenses in place to install and run this software.</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">Enter your edition(1-8): 2</span></span>
<span class="line"><span style="color:#24292e;">The license terms for this product can be found in</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/doc/mssql-server or downloaded from:</span></span>
<span class="line"><span style="color:#24292e;">https://go.microsoft.com/fwlink/?LinkId=855862&amp;clcid=0x409</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">The privacy statement can be viewed at:</span></span>
<span class="line"><span style="color:#24292e;">https://go.microsoft.com/fwlink/?LinkId=853010&amp;clcid=0x409</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">Do you accept the license terms? [Yes/No]:Yes</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">Enter the SQL Server system administrator password: </span></span>
<span class="line"><span style="color:#24292e;">Confirm the SQL Server system administrator password: </span></span>
<span class="line"><span style="color:#24292e;">Configuring SQL Server...</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">Created symlink from /etc/systemd/system/multi-user.target.wants/mssql-server.service to /usr/lib/systemd/system/mssql-server.service.</span></span>
<span class="line"><span style="color:#24292e;">Setup has completed successfully. SQL Server is now starting.</span></span>
<span class="line"><span style="color:#24292e;">[root@iZwz94664y88ud9aroa5veZ sqlserver2017]#</span></span></code></pre></div><ul><li>验证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl status mssql-server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl status mssql-server</span></span></code></pre></div><h2 id="_1-2-服务" tabindex="-1">1.2 服务 <a class="header-anchor" href="#_1-2-服务" aria-label="Permalink to &quot;1.2 服务&quot;">​</a></h2><ul><li>停止、启动或重启 SQL Server 服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl stop mssql-server</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start mssql-server</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart mssql-server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl stop mssql-server</span></span>
<span class="line"><span style="color:#24292e;">systemctl start mssql-server</span></span>
<span class="line"><span style="color:#24292e;">systemctl restart mssql-server</span></span></code></pre></div><h2 id="_1-3-日志" tabindex="-1">1.3 日志 <a class="header-anchor" href="#_1-3-日志" aria-label="Permalink to &quot;1.3 日志&quot;">​</a></h2><p>/var/opt/mssql/log/errorlog</p><h2 id="_1-4-安装-sqlcmd-和-bcp-sql-server-命令行工具" tabindex="-1">1.4 安装 sqlcmd 和 bcp SQL Server 命令行工具 <a class="header-anchor" href="#_1-4-安装-sqlcmd-和-bcp-sql-server-命令行工具" aria-label="Permalink to &quot;1.4 安装 sqlcmd 和 bcp SQL Server 命令行工具&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget --no-check-certificate https://packages.microsoft.com/rhel/7.3/prod/msodbcsql-13.1.6.0-1.x86_64.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget --no-check-certificate https://packages.microsoft.com/rhel/7.3/prod/mssql-tools-14.0.5.0-1.x86_64.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget --no-check-certificate https://packages.microsoft.com/rhel/7.3/prod/msodbcsql-13.1.6.0-1.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget --no-check-certificate https://packages.microsoft.com/rhel/7.3/prod/mssql-tools-14.0.5.0-1.x86_64.rpm</span></span></code></pre></div><ul><li>安装</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum localinstall msodbcsql-13.1.6.0-1.x86_64.rpm</span></span>
<span class="line"><span style="color:#e1e4e8;">yum localinstall mssql-tools-14.0.5.0-1.x86_64.rpm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum localinstall msodbcsql-13.1.6.0-1.x86_64.rpm</span></span>
<span class="line"><span style="color:#24292e;">yum localinstall mssql-tools-14.0.5.0-1.x86_64.rpm</span></span></code></pre></div><ul><li>设置环境变量</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo &#39;export PATH=&quot;$PATH:/opt/mssql-tools/bin&quot;&#39; &gt;&gt; ~/.bash_profile</span></span>
<span class="line"><span style="color:#e1e4e8;">source ~/.bash_profile </span></span>
<span class="line"><span style="color:#e1e4e8;">echo &#39;export PATH=&quot;$PATH:/opt/mssql-tools/bin&quot;&#39; &gt;&gt; ~/.bashrc</span></span>
<span class="line"><span style="color:#e1e4e8;">source ~/.bashrc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo &#39;export PATH=&quot;$PATH:/opt/mssql-tools/bin&quot;&#39; &gt;&gt; ~/.bash_profile</span></span>
<span class="line"><span style="color:#24292e;">source ~/.bash_profile </span></span>
<span class="line"><span style="color:#24292e;">echo &#39;export PATH=&quot;$PATH:/opt/mssql-tools/bin&quot;&#39; &gt;&gt; ~/.bashrc</span></span>
<span class="line"><span style="color:#24292e;">source ~/.bashrc</span></span></code></pre></div><ul><li>测试数据库连接</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sqlcmd -S localhost -U sa</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#输入密码</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sqlcmd -S localhost -U sa</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#输入密码</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406141010555.jpg" alt="passwd"></p>`,23),o=[p];function t(c,r,i,d,y,h){return e(),a("div",null,o)}const g=s(l,[["render",t]]);export{u as __pageData,g as default};
