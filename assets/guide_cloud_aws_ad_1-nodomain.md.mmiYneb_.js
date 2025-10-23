import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一、搭建无域","description":"","frontmatter":{},"headers":[],"relativePath":"guide/cloud/aws/ad/1-nodomain.md","filePath":"guide/cloud/aws/ad/1-nodomain.md","lastUpdated":1701332406000}'),l={name:"guide/cloud/aws/ad/1-nodomain.md"},p=e(`<ul><li><p>在aws上搭建ad无域环境</p></li><li><p>windows server 2016 可以搭建无域环境</p></li><li><p>关闭防火墙</p></li></ul><p>注意事项：</p><p>1，两个节点的Windos Server 2016 都已Administrator账户运行，并且两台服务器的Administrator密码相同。</p><p>2，两个节点的SQL Server 2016 服务启动账户都设置成Administrator</p><h1 id="一、搭建无域" tabindex="-1">一、搭建无域 <a class="header-anchor" href="#一、搭建无域" aria-label="Permalink to &quot;一、搭建无域&quot;">​</a></h1><blockquote><p>环境</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">windows server 2016 base</span></span>
<span class="line"><span style="color:#e1e4e8;">java 1.7</span></span>
<span class="line"><span style="color:#e1e4e8;">sqlserver 2017</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">windows server 2016 base</span></span>
<span class="line"><span style="color:#24292e;">java 1.7</span></span>
<span class="line"><span style="color:#24292e;">sqlserver 2017</span></span></code></pre></div><h2 id="_1-1规划" tabindex="-1">1.1规划 <a class="header-anchor" href="#_1-1规划" aria-label="Permalink to &quot;1.1规划&quot;">​</a></h2><table><thead><tr><th>名称</th><th>ip</th><th>辅助ip (监听器添加一个或者两个)</th><th>描述</th></tr></thead><tbody><tr><td>master</td><td>172.31.41.50</td><td>172.31.41.54, 172.31.41.55</td><td>主数据库</td></tr><tr><td>slave</td><td>172.31.41.53</td><td>172.31.41.51, 172.31.41.52</td><td>从数据库</td></tr><tr><td>ad群集</td><td>172.31.41.49</td><td>x.x.x.x</td><td>加入集群时ip地址</td></tr><tr><td>AlwaysOn</td><td>172.31.41.50</td><td>x.x.x.x</td><td>共享地址用于ssl证书和数据库备份地址</td></tr><tr><td>ListenIP</td><td>172.31.41.54or172.31.41.51</td><td>x.x.x.x</td><td>对外访问ip</td></tr></tbody></table><h2 id="_1-2添加辅助ip" tabindex="-1">1.2添加辅助ip <a class="header-anchor" href="#_1-2添加辅助ip" aria-label="Permalink to &quot;1.2添加辅助ip&quot;">​</a></h2><ul><li>eth0------&gt; eni</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301542216.png" alt="eth0"></p><ul><li>eni</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301542044.png" alt="eni"></p><ul><li>管理ip</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301542506.png" alt="管理ip"></p><h2 id="_1-3-配置hosts文件" tabindex="-1">1.3 配置hosts文件 <a class="header-anchor" href="#_1-3-配置hosts文件" aria-label="Permalink to &quot;1.3 配置hosts文件&quot;">​</a></h2><ul><li>master/ slave 都执行</li></ul><p>C:\\Windows\\System32\\drivers\\etc 打开文件hosts</p><p>添加群集信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">172.31.41.49 sqlcluster</span></span>
<span class="line"><span style="color:#e1e4e8;">172.31.41.50 master.bb.com</span></span>
<span class="line"><span style="color:#e1e4e8;">172.31.41.53 slave.bb.com</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">172.31.41.49 sqlcluster</span></span>
<span class="line"><span style="color:#24292e;">172.31.41.50 master.bb.com</span></span>
<span class="line"><span style="color:#24292e;">172.31.41.53 slave.bb.com</span></span></code></pre></div><h2 id="_1-4-修改主机名并加入域" tabindex="-1">1.4 修改主机名并加入域 <a class="header-anchor" href="#_1-4-修改主机名并加入域" aria-label="Permalink to &quot;1.4 修改主机名并加入域&quot;">​</a></h2><ul><li>每个节点的计算机不需要加入域，但需要添加DNS后缀，且每个节点的后缀必须要相同</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301542272.png" alt="修改主机名并加入域"></p><blockquote><p>重启系统</p></blockquote><h2 id="_1-5-关闭防火墙" tabindex="-1">1.5 关闭防火墙 <a class="header-anchor" href="#_1-5-关闭防火墙" aria-label="Permalink to &quot;1.5 关闭防火墙&quot;">​</a></h2><ul><li>all node 执行</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301543814.png" alt="关闭防火墙"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301543573.png" alt="关闭防火墙"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301543101.png" alt="关闭防火墙"></p><blockquote><p>设置允许应用或功能通过windows防火墙</p></blockquote><blockquote><p>还是在刚刚的防火墙中点击设置允许应用或功能通过windows防火墙</p></blockquote><blockquote><p>file and print</p></blockquote><h2 id="_1-6-配置ip和dns" tabindex="-1">1.6 配置ip和dns <a class="header-anchor" href="#_1-6-配置ip和dns" aria-label="Permalink to &quot;1.6 配置ip和dns&quot;">​</a></h2><ul><li>master/slave 都执行</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301543641.jpg" alt="配置ip和dns"></p><h2 id="_1-7统一修改admin密码" tabindex="-1">1.7统一修改admin密码 <a class="header-anchor" href="#_1-7统一修改admin密码" aria-label="Permalink to &quot;1.7统一修改admin密码&quot;">​</a></h2><p>win + R -----&gt; lusrmgr.msc</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301543427.jpg" alt="修改admin密码"></p><ul><li>添加用户，在每个节点上都添加一个用户DCadmin，且用户名以及密码每个节点都一致</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301543699.png" alt="user"></p><h1 id="二、安装win集群" tabindex="-1">二、安装win集群 <a class="header-anchor" href="#二、安装win集群" aria-label="Permalink to &quot;二、安装win集群&quot;">​</a></h1><h2 id="_2-1-安装windows故障转移群集" tabindex="-1">2.1 安装Windows故障转移群集 <a class="header-anchor" href="#_2-1-安装windows故障转移群集" aria-label="Permalink to &quot;2.1 安装Windows故障转移群集&quot;">​</a></h2><ul><li>所有节点都需要安装</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301544279.png" alt="安装Windows故障转移群集"></p><p>重启系统</p><h2 id="_2-2-加入群集" tabindex="-1">2.2 加入群集 <a class="header-anchor" href="#_2-2-加入群集" aria-label="Permalink to &quot;2.2  加入群集&quot;">​</a></h2><p>在DB1这个节点上，用以管理员方式运行Power Shell ，使用脚本创建Windows群集，也可以使用图形创建群集</p><p>注意：如果登陆Windows Server 2016服务器的账户不是Administrator，需要先以管理员方式运行PowerShell，执行下面的命令：</p><p>new-itemproperty -path HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name LocalAccountTokenFilterPolicy -Value 1</p><p>因为我登陆Windows Server 2016用的是Administrator，所以跳过执行上面的命令，直接运行下面的命令：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Power Shell 脚本：  New-Cluster -Name JF-AlwaysOn -Node MASTER, SLAVE -StaticAddress 172.31.41.49 -AdministrativeAccessPoint DNS </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--获取集群名</span></span>
<span class="line"><span style="color:#e1e4e8;">Get-Cluster  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--群集详情  </span></span>
<span class="line"><span style="color:#e1e4e8;">Get-ClusterResource</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Power Shell 脚本：  New-Cluster -Name JF-AlwaysOn -Node MASTER, SLAVE -StaticAddress 172.31.41.49 -AdministrativeAccessPoint DNS </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--获取集群名</span></span>
<span class="line"><span style="color:#24292e;">Get-Cluster  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--群集详情  </span></span>
<span class="line"><span style="color:#24292e;">Get-ClusterResource</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301547022.jpg" alt="CLUS"></p><p>使用Power Shell 安装群集后，在故障转移群集管理器中是看不到群集信息的，需要手动连接到群集，如下面图所示</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301544888.png" alt="CLUS"></p><p>打开故障转移群集管理器后，在管理器处右键鼠标，选择“连接到群集”</p><p>在弹出的对话框中手动输入群集的名称</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301544360.png" alt="conn"></p><p>这样就能在故障转移群集管理器中看到群集的信息了。同样的方法在slave的节点上再重复设置即可在slave上看到群集信息</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301545042.jpg" alt="conn"></p><h2 id="_2-3配置sql-server-alwayson" tabindex="-1">2.3配置SQL Server AlwaysOn <a class="header-anchor" href="#_2-3配置sql-server-alwayson" aria-label="Permalink to &quot;2.3配置SQL Server AlwaysOn&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301545777.jpg" alt="AlwaysOn"></p><h3 id="_1在master-slave上启用alwayson" tabindex="-1">1在master/slave上启用AlwaysOn <a class="header-anchor" href="#_1在master-slave上启用alwayson" aria-label="Permalink to &quot;1在master/slave上启用AlwaysOn&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301545403.jpg" alt="AlwaysOn"></p><p>启用AlwaysOn会要求重启服务，重启就可以</p><ul><li>重启服务后，查看服务器属性，确保 HADR 为 True</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301545646.jpg" alt="HADR"></p><blockquote><p>既然节点没有加入域，那么就不能用域认证，只能用证书认证，因此需要创建证书和端点</p></blockquote><ul><li>因此在配置可用性组前先在各节点配置证书认证信任</li></ul><h3 id="_2-创建证书" tabindex="-1">2.创建证书 <a class="header-anchor" href="#_2-创建证书" aria-label="Permalink to &quot;2.创建证书&quot;">​</a></h3><ul><li>分别在两个节点数据库上创建证书，并且彼此还原对方的证书，SQL代码</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-共享文件夹路径： ---\\\\MASTER\\SQLAlwaysOnShare</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--节点一上执行：创建主密钥/证书/端点，备份证书。 </span></span>
<span class="line"><span style="color:#e1e4e8;">USE master; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE MASTER KEY ENCRYPTION BY PASSWORD = &#39;JFAlwaysOnShare2016&#39;; ----administrator密码</span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE CERTIFICATE Cert_DB01 </span></span>
<span class="line"><span style="color:#e1e4e8;">WITH SUBJECT = &#39;Cert_DB01&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">START_DATE = &#39;2017-12-01&#39;,EXPIRY_DATE = &#39;2099-12-31&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">BACKUP CERTIFICATE Cert_DB01 </span></span>
<span class="line"><span style="color:#e1e4e8;">TO FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB01.cer&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ENDPOINT [SQLAG_Endpoint] </span></span>
<span class="line"><span style="color:#e1e4e8;">AUTHORIZATION [MASTER\\administrator] </span></span>
<span class="line"><span style="color:#e1e4e8;">STATE=STARTED </span></span>
<span class="line"><span style="color:#e1e4e8;">AS TCP (LISTENER_PORT = 5022, LISTENER_IP = ALL) </span></span>
<span class="line"><span style="color:#e1e4e8;">FOR DATA_MIRRORING </span></span>
<span class="line"><span style="color:#e1e4e8;">(ROLE = ALL,AUTHENTICATION = CERTIFICATE Cert_DB01, ENCRYPTION = REQUIRED ALGORITHM AES)</span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--节点二上执行：创建主密钥/证书，备份证书。 </span></span>
<span class="line"><span style="color:#e1e4e8;">USE master; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE MASTER KEY ENCRYPTION BY PASSWORD = &#39;JFAlwaysOnShare2016&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE CERTIFICATE Cert_DB02 </span></span>
<span class="line"><span style="color:#e1e4e8;">WITH SUBJECT = &#39;Cert_DB02&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">START_DATE = &#39;2017-12-01&#39;,EXPIRY_DATE = &#39;2099-12-31&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">BACKUP CERTIFICATE Cert_DB02 </span></span>
<span class="line"><span style="color:#e1e4e8;">TO FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB02.cer&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE ENDPOINT [SQLAG_Endpoint] </span></span>
<span class="line"><span style="color:#e1e4e8;">AUTHORIZATION [SLAVE\\administrator] </span></span>
<span class="line"><span style="color:#e1e4e8;">STATE=STARTED </span></span>
<span class="line"><span style="color:#e1e4e8;">AS TCP (LISTENER_PORT = 5022, LISTENER_IP = ALL) </span></span>
<span class="line"><span style="color:#e1e4e8;">FOR DATA_MIRRORING </span></span>
<span class="line"><span style="color:#e1e4e8;">(ROLE = ALL,AUTHENTICATION = CERTIFICATE Cert_DB02, ENCRYPTION = REQUIRED ALGORITHM AES)</span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--节点一上执行：创建节点二的证书 </span></span>
<span class="line"><span style="color:#e1e4e8;">USE master; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE CERTIFICATE Cert_DB02 </span></span>
<span class="line"><span style="color:#e1e4e8;">FROM FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB02.cer&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--节点二上执行：创建节点一的证书 </span></span>
<span class="line"><span style="color:#e1e4e8;">USE master; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO </span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE CERTIFICATE Cert_DB01 </span></span>
<span class="line"><span style="color:#e1e4e8;">FROM FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB01.cer&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-共享文件夹路径： ---\\\\MASTER\\SQLAlwaysOnShare</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--节点一上执行：创建主密钥/证书/端点，备份证书。 </span></span>
<span class="line"><span style="color:#24292e;">USE master; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CREATE MASTER KEY ENCRYPTION BY PASSWORD = &#39;JFAlwaysOnShare2016&#39;; ----administrator密码</span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CREATE CERTIFICATE Cert_DB01 </span></span>
<span class="line"><span style="color:#24292e;">WITH SUBJECT = &#39;Cert_DB01&#39;, </span></span>
<span class="line"><span style="color:#24292e;">START_DATE = &#39;2017-12-01&#39;,EXPIRY_DATE = &#39;2099-12-31&#39;; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">BACKUP CERTIFICATE Cert_DB01 </span></span>
<span class="line"><span style="color:#24292e;">TO FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB01.cer&#39;; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CREATE ENDPOINT [SQLAG_Endpoint] </span></span>
<span class="line"><span style="color:#24292e;">AUTHORIZATION [MASTER\\administrator] </span></span>
<span class="line"><span style="color:#24292e;">STATE=STARTED </span></span>
<span class="line"><span style="color:#24292e;">AS TCP (LISTENER_PORT = 5022, LISTENER_IP = ALL) </span></span>
<span class="line"><span style="color:#24292e;">FOR DATA_MIRRORING </span></span>
<span class="line"><span style="color:#24292e;">(ROLE = ALL,AUTHENTICATION = CERTIFICATE Cert_DB01, ENCRYPTION = REQUIRED ALGORITHM AES)</span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--节点二上执行：创建主密钥/证书，备份证书。 </span></span>
<span class="line"><span style="color:#24292e;">USE master; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;">CREATE MASTER KEY ENCRYPTION BY PASSWORD = &#39;JFAlwaysOnShare2016&#39;; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CREATE CERTIFICATE Cert_DB02 </span></span>
<span class="line"><span style="color:#24292e;">WITH SUBJECT = &#39;Cert_DB02&#39;, </span></span>
<span class="line"><span style="color:#24292e;">START_DATE = &#39;2017-12-01&#39;,EXPIRY_DATE = &#39;2099-12-31&#39;; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">BACKUP CERTIFICATE Cert_DB02 </span></span>
<span class="line"><span style="color:#24292e;">TO FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB02.cer&#39;; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CREATE ENDPOINT [SQLAG_Endpoint] </span></span>
<span class="line"><span style="color:#24292e;">AUTHORIZATION [SLAVE\\administrator] </span></span>
<span class="line"><span style="color:#24292e;">STATE=STARTED </span></span>
<span class="line"><span style="color:#24292e;">AS TCP (LISTENER_PORT = 5022, LISTENER_IP = ALL) </span></span>
<span class="line"><span style="color:#24292e;">FOR DATA_MIRRORING </span></span>
<span class="line"><span style="color:#24292e;">(ROLE = ALL,AUTHENTICATION = CERTIFICATE Cert_DB02, ENCRYPTION = REQUIRED ALGORITHM AES)</span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--节点一上执行：创建节点二的证书 </span></span>
<span class="line"><span style="color:#24292e;">USE master; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;">CREATE CERTIFICATE Cert_DB02 </span></span>
<span class="line"><span style="color:#24292e;">FROM FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB02.cer&#39;; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--节点二上执行：创建节点一的证书 </span></span>
<span class="line"><span style="color:#24292e;">USE master; </span></span>
<span class="line"><span style="color:#24292e;">GO </span></span>
<span class="line"><span style="color:#24292e;">CREATE CERTIFICATE Cert_DB01 </span></span>
<span class="line"><span style="color:#24292e;">FROM FILE = &#39;\\\\MASTER\\SQLAlwaysOnShare\\Cert_DB01.cer&#39;; </span></span>
<span class="line"><span style="color:#24292e;">GO</span></span></code></pre></div><ul><li>删除证书秘钥</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--删除终结点</span></span>
<span class="line"><span style="color:#e1e4e8;">drop ENDPOINT [group0_endpoint];</span></span>
<span class="line"><span style="color:#e1e4e8;">go</span></span>
<span class="line"><span style="color:#e1e4e8;">--删除证书</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP CERTIFICATE CERT1;</span></span>
<span class="line"><span style="color:#e1e4e8;">--删除主密钥</span></span>
<span class="line"><span style="color:#e1e4e8;">drop master key</span></span>
<span class="line"><span style="color:#e1e4e8;">go</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--删除终结点</span></span>
<span class="line"><span style="color:#24292e;">drop ENDPOINT [group0_endpoint];</span></span>
<span class="line"><span style="color:#24292e;">go</span></span>
<span class="line"><span style="color:#24292e;">--删除证书</span></span>
<span class="line"><span style="color:#24292e;">DROP CERTIFICATE CERT1;</span></span>
<span class="line"><span style="color:#24292e;">--删除主密钥</span></span>
<span class="line"><span style="color:#24292e;">drop master key</span></span>
<span class="line"><span style="color:#24292e;">go</span></span></code></pre></div><ul><li>查看证书与终结点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select * from sys.certificates</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from sys.endpoints</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select * from sys.certificates</span></span>
<span class="line"><span style="color:#24292e;">select * from sys.endpoints</span></span></code></pre></div><h3 id="_3-配置可用性组" tabindex="-1">3.配置可用性组 <a class="header-anchor" href="#_3-配置可用性组" aria-label="Permalink to &quot;3.配置可用性组&quot;">​</a></h3><ul><li>先备份下完整数据库，进行可用性组</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546350.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546607.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546368.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546673.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546651.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546135.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546956.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546886.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546259.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301546376.png" alt="HADR"></p><h3 id="_4-最后创建侦听器" tabindex="-1">4.最后创建侦听器 <a class="header-anchor" href="#_4-最后创建侦听器" aria-label="Permalink to &quot;4.最后创建侦听器&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301547722.png" alt="HADR"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311301547422.png" alt="HADR"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select name,* from  sys.availability_groups</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT * FROM  sys.dm_hadr_cluster_members;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT * FROM master.sys.availability_replicas</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#e1e4e8;">MODIFY REPLICA ON</span></span>
<span class="line"><span style="color:#e1e4e8;">N&#39;MASTER&#39; WITH</span></span>
<span class="line"><span style="color:#e1e4e8;">(PRIMARY_ROLE (READ_ONLY_ROUTING_LIST=(&#39;SLAVE&#39;,&#39;MASTER&#39;)));</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#e1e4e8;">MODIFY REPLICA ON</span></span>
<span class="line"><span style="color:#e1e4e8;">N&#39;SLAVE&#39; WITH</span></span>
<span class="line"><span style="color:#e1e4e8;">(PRIMARY_ROLE (READ_ONLY_ROUTING_LIST=(&#39;MASTER&#39;,&#39;SLAVE&#39;)));</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT  ar.replica_server_name ,</span></span>
<span class="line"><span style="color:#e1e4e8;">        rl.routing_priority ,</span></span>
<span class="line"><span style="color:#e1e4e8;">        ( SELECT    ar2.replica_server_name</span></span>
<span class="line"><span style="color:#e1e4e8;">          FROM      sys.availability_read_only_routing_lists rl2</span></span>
<span class="line"><span style="color:#e1e4e8;">                    JOIN sys.availability_replicas AS ar2 ON rl2.read_only_replica_id = ar2.replica_id</span></span>
<span class="line"><span style="color:#e1e4e8;">          WHERE     rl.replica_id = rl2.replica_id</span></span>
<span class="line"><span style="color:#e1e4e8;">                    AND rl.routing_priority = rl2.routing_priority</span></span>
<span class="line"><span style="color:#e1e4e8;">                    AND rl.read_only_replica_id = rl2.read_only_replica_id</span></span>
<span class="line"><span style="color:#e1e4e8;">        ) AS &#39;read_only_replica_server_name&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM    sys.availability_read_only_routing_lists rl</span></span>
<span class="line"><span style="color:#e1e4e8;">        JOIN sys.availability_replicas AS ar ON rl.replica_id = ar.replica_id</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT * FROM [General]..sysusers</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT * FROM [storm]..sysusers</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE LOGIN [samaster] WITH PASSWORD=N&#39;master123&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">SID =0x99AD266AFD26F841B3E49EF9633B0D4B, DEFAULT_DATABASE=[storm],</span></span>
<span class="line"><span style="color:#e1e4e8;"> CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">USE [master]</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#e1e4e8;">MODIFY REPLICA ON N&#39;MASTER&#39; WITH (PRIMARY_ROLE(ALLOW_CONNECTIONS = READ_WRITE))</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">USE [master]</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#e1e4e8;">MODIFY REPLICA ON N&#39;MASTER&#39; WITH (PRIMARY_ROLE(ALLOW_CONNECTIONS = all))</span></span>
<span class="line"><span style="color:#e1e4e8;">GO</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select name,* from  sys.availability_groups</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT * FROM  sys.dm_hadr_cluster_members;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT * FROM master.sys.availability_replicas</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#24292e;">MODIFY REPLICA ON</span></span>
<span class="line"><span style="color:#24292e;">N&#39;MASTER&#39; WITH</span></span>
<span class="line"><span style="color:#24292e;">(PRIMARY_ROLE (READ_ONLY_ROUTING_LIST=(&#39;SLAVE&#39;,&#39;MASTER&#39;)));</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#24292e;">MODIFY REPLICA ON</span></span>
<span class="line"><span style="color:#24292e;">N&#39;SLAVE&#39; WITH</span></span>
<span class="line"><span style="color:#24292e;">(PRIMARY_ROLE (READ_ONLY_ROUTING_LIST=(&#39;MASTER&#39;,&#39;SLAVE&#39;)));</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT  ar.replica_server_name ,</span></span>
<span class="line"><span style="color:#24292e;">        rl.routing_priority ,</span></span>
<span class="line"><span style="color:#24292e;">        ( SELECT    ar2.replica_server_name</span></span>
<span class="line"><span style="color:#24292e;">          FROM      sys.availability_read_only_routing_lists rl2</span></span>
<span class="line"><span style="color:#24292e;">                    JOIN sys.availability_replicas AS ar2 ON rl2.read_only_replica_id = ar2.replica_id</span></span>
<span class="line"><span style="color:#24292e;">          WHERE     rl.replica_id = rl2.replica_id</span></span>
<span class="line"><span style="color:#24292e;">                    AND rl.routing_priority = rl2.routing_priority</span></span>
<span class="line"><span style="color:#24292e;">                    AND rl.read_only_replica_id = rl2.read_only_replica_id</span></span>
<span class="line"><span style="color:#24292e;">        ) AS &#39;read_only_replica_server_name&#39;</span></span>
<span class="line"><span style="color:#24292e;">FROM    sys.availability_read_only_routing_lists rl</span></span>
<span class="line"><span style="color:#24292e;">        JOIN sys.availability_replicas AS ar ON rl.replica_id = ar.replica_id</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT * FROM [General]..sysusers</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SELECT * FROM [storm]..sysusers</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">CREATE LOGIN [samaster] WITH PASSWORD=N&#39;master123&#39;,</span></span>
<span class="line"><span style="color:#24292e;">SID =0x99AD266AFD26F841B3E49EF9633B0D4B, DEFAULT_DATABASE=[storm],</span></span>
<span class="line"><span style="color:#24292e;"> CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">USE [master]</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#24292e;">MODIFY REPLICA ON N&#39;MASTER&#39; WITH (PRIMARY_ROLE(ALLOW_CONNECTIONS = READ_WRITE))</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">USE [master]</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span>
<span class="line"><span style="color:#24292e;">ALTER AVAILABILITY GROUP [SQLAG]</span></span>
<span class="line"><span style="color:#24292e;">MODIFY REPLICA ON N&#39;MASTER&#39; WITH (PRIMARY_ROLE(ALLOW_CONNECTIONS = all))</span></span>
<span class="line"><span style="color:#24292e;">GO</span></span></code></pre></div><h1 id="三、sqlserver-读写分离" tabindex="-1">三、sqlserver 读写分离 <a class="header-anchor" href="#三、sqlserver-读写分离" aria-label="Permalink to &quot;三、sqlserver 读写分离&quot;">​</a></h1><p><a href="http://note.youdao.com/noteshare?id=ce71cc7ffa4b4c50107724451a5b2fd1" target="_blank" rel="noreferrer">http://note.youdao.com/noteshare?id=ce71cc7ffa4b4c50107724451a5b2fd1</a></p>`,94),o=[p];function c(t,i,r,y,d,A){return n(),a("div",null,o)}const T=s(l,[["render",c]]);export{h as __pageData,T as default};
