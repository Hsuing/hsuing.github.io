import{_ as s,c as a,o as n,R as o}from"./chunks/framework.CIzs38F0.js";const m=JSON.parse('{"title":"1. 安装前","description":"","frontmatter":{},"headers":[],"relativePath":"guide/faq/18-mac-install-win11.md","filePath":"guide/faq/18-mac-install-win11.md","lastUpdated":1717511420000}'),i={name:"guide/faq/18-mac-install-win11.md"},e=o(`<h1 id="_1-安装前" tabindex="-1">1. 安装前 <a class="header-anchor" href="#_1-安装前" aria-label="Permalink to &quot;1. 安装前&quot;">​</a></h1><p>在使用mac的<code>转换助理</code>安装官方windows11的iso镜像时，会提示不能安装该软件，因为当前无法从软件更新服务器获得,原因是windows11的镜像包install.wim大于4g，导致转换助理无法直接使用</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406041027161.jpeg" alt="img"></p><blockquote><p>因此我们需要将其进行分割</p></blockquote><h1 id="_2-安装开始" tabindex="-1">2. 安装开始 <a class="header-anchor" href="#_2-安装开始" aria-label="Permalink to &quot;2. 安装开始&quot;">​</a></h1><h2 id="_2-1-新建文件夹" tabindex="-1">2.1 新建文件夹 <a class="header-anchor" href="#_2-1-新建文件夹" aria-label="Permalink to &quot;2.1 新建文件夹&quot;">​</a></h2><p>在桌面新建windows11文件夹</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406041032177.jpeg" alt="img"></p><p><strong>下载的windows10*1的镜像包，将里面的内容全部拷贝至</strong>新建的windows11文件夹**</p><p>前切走<strong>新建windows11文件夹</strong>下<strong>sources</strong>内的<strong>install.wim</strong>文件，到桌面下</p><h2 id="_2-2-分割windows11镜像文件" tabindex="-1">2.2 分割windows11镜像文件 <a class="header-anchor" href="#_2-2-分割windows11镜像文件" aria-label="Permalink to &quot;2.2 分割windows11镜像文件&quot;">​</a></h2><ol><li>打开下载的windows11的镜像包，将<strong>sources</strong>内的<strong>install.wim</strong>文件拷贝至桌面</li><li>安装<strong>wimlib</strong>软件</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">brew</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wimlib</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">brew</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wimlib</span></span></code></pre></div><p>3.使用命令分割install.wim文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd ~/Desktop</span></span>
<span class="line"><span style="color:#e1e4e8;">wimlib-imagex split install.wim install.swm 3500</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd ~/Desktop</span></span>
<span class="line"><span style="color:#24292e;">wimlib-imagex split install.wim install.swm 3500</span></span></code></pre></div><p>将分割好的<strong>install.swm</strong>和<strong>install2.swm</strong>拷贝至<strong>新建的windows11文件夹</strong>下的<strong>sources</strong>文件夹内</p><h2 id="_2-3-打包新建的windows11文件夹为iso文件" tabindex="-1">2.3 打包新建的windows11文件夹为iso文件 <a class="header-anchor" href="#_2-3-打包新建的windows11文件夹为iso文件" aria-label="Permalink to &quot;2.3 打包新建的windows11文件夹为iso文件&quot;">​</a></h2><p>使用自带磁盘工具，点击菜单栏的文件，新建映像，基于文件夹新建映像</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406041102823.jpeg" alt="img"></p><p>选择桌面<strong>新建的windows11文件夹</strong>，再选择映像格式为DVD/CD主映像，存储即可，桌面会生成一个<strong>windows11.cdr</strong>文件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406041102716.jpeg" alt="img"></p><p>转化cdr文件为iso文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cd ~/Desktop</span></span>
<span class="line"><span style="color:#e1e4e8;">hdiutil makehybrid -iso -joliet -o windows11.iso windows11.cdr</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cd ~/Desktop</span></span>
<span class="line"><span style="color:#24292e;">hdiutil makehybrid -iso -joliet -o windows11.iso windows11.cdr</span></span></code></pre></div><p>桌面成功生成windows11的iso文件</p><h2 id="_2-4-转换助理安装windows11" tabindex="-1">2.4 转换助理安装windows11 <a class="header-anchor" href="#_2-4-转换助理安装windows11" aria-label="Permalink to &quot;2.4 转换助理安装windows11&quot;">​</a></h2><p>打开启动转换助理，选择桌面的windows11.iso文件，选择分区大小，点击安装即可</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406041104004.jpeg" alt="img"></p><p>等待安装结束</p><h2 id="_2-5-制作u盘进行安装" tabindex="-1">2.5 制作u盘进行安装 <a class="header-anchor" href="#_2-5-制作u盘进行安装" aria-label="Permalink to &quot;2.5 制作u盘进行安装&quot;">​</a></h2>`,29),l=[e];function t(p,c,r,d,g,h){return n(),a("div",null,l)}const u=s(i,[["render",t]]);export{m as __pageData,u as default};