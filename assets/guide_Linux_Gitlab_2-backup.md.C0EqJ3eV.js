import{_ as s,c as a,o as n,R as l}from"./chunks/framework.CIzs38F0.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Gitlab/2-backup.md","filePath":"guide/Linux/Gitlab/2-backup.md","lastUpdated":1712917766000}'),p={name:"guide/Linux/Gitlab/2-backup.md"},o=l(`<h2 id="_1-备份-gitlab-ce-数据" tabindex="-1">1.备份 gitlab-ce 数据 <a class="header-anchor" href="#_1-备份-gitlab-ce-数据" aria-label="Permalink to &quot;1.备份 gitlab-ce 数据&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">gitlab-rake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gitlab:backup:create</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">gitlab-rake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gitlab:backup:create</span></span></code></pre></div><p>备份文件保存在/var/opt/gitlab/backups/目录下，使用工具将文件下载上传至目标服务器的/var/opt/gitlab/backups/目录</p><h2 id="_2-使用原-gitlab-ce-备份数据进行恢复" tabindex="-1">2.使用原 gitlab-ce 备份数据进行恢复 <a class="header-anchor" href="#_2-使用原-gitlab-ce-备份数据进行恢复" aria-label="Permalink to &quot;2.使用原 gitlab-ce 备份数据进行恢复&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/opt/gitlab/backups/</span></span>
<span class="line"><span style="color:#6A737D;"># 将权限修改为git用户</span></span>
<span class="line"><span style="color:#B392F0;">chown</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1551144361</span><span style="color:#9ECBFF;">_2019_02_26_11.6.5_gitlab_backup.tar</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#停止数据写入服务</span></span>
<span class="line"><span style="color:#B392F0;">gitlab-ctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">unicorn</span></span>
<span class="line"><span style="color:#B392F0;">gitlab-ctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sidekiq</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看状态</span></span>
<span class="line"><span style="color:#B392F0;">gitlab-ctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 执行还原操作</span></span>
<span class="line"><span style="color:#B392F0;">gitlab-rake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gitlab:backup:restore</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">BACKUP=</span><span style="color:#79B8FF;">1551144361</span><span style="color:#9ECBFF;">_2019_02_26_11.6.5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#重启服务</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">gitlab-ctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/opt/gitlab/backups/</span></span>
<span class="line"><span style="color:#6A737D;"># 将权限修改为git用户</span></span>
<span class="line"><span style="color:#6F42C1;">chown</span><span style="color:#24292E;"> </span><span style="color:#032F62;">git</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1551144361</span><span style="color:#032F62;">_2019_02_26_11.6.5_gitlab_backup.tar</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#停止数据写入服务</span></span>
<span class="line"><span style="color:#6F42C1;">gitlab-ctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unicorn</span></span>
<span class="line"><span style="color:#6F42C1;">gitlab-ctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sidekiq</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看状态</span></span>
<span class="line"><span style="color:#6F42C1;">gitlab-ctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 执行还原操作</span></span>
<span class="line"><span style="color:#6F42C1;">gitlab-rake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gitlab:backup:restore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">BACKUP=</span><span style="color:#005CC5;">1551144361</span><span style="color:#032F62;">_2019_02_26_11.6.5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#重启服务</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">gitlab-ctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span></span></code></pre></div>`,5),e=[o];function t(c,r,i,y,E,b){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{d as __pageData,g as default};
