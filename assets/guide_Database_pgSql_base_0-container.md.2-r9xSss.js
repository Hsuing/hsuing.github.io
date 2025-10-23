import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1、docker安装","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/base/0-container.md","filePath":"guide/Database/pgSql/base/0-container.md","lastUpdated":1711535325000}'),p={name:"guide/Database/pgSql/base/0-container.md"},l=n(`<h1 id="_1、docker安装" tabindex="-1">1、docker安装 <a class="header-anchor" href="#_1、docker安装" aria-label="Permalink to &quot;1、docker安装&quot;">​</a></h1><h2 id="_1-1pull-images" tabindex="-1">1.1pull images <a class="header-anchor" href="#_1-1pull-images" aria-label="Permalink to &quot;1.1pull images&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker pull postgres:12.2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">12.2----&gt;版本号，不写版本直接拉取最新版本</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker pull postgres:12.2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">12.2----&gt;版本号，不写版本直接拉取最新版本</span></span></code></pre></div><h2 id="_1-2-start" tabindex="-1">1.2 start <a class="header-anchor" href="#_1-2-start" aria-label="Permalink to &quot;1.2 start&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker run --name postgres2 -e POSTGRES_PASSWORD=password -p 5432:5432 -v /data/pgdata:/var/lib/postgresql/data -d postgres:12.2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#进入镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">docker exec -it postgres2 /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#目录</span></span>
<span class="line"><span style="color:#e1e4e8;"> cd /var/lib/postgresql/data</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #连接数据库</span></span>
<span class="line"><span style="color:#e1e4e8;"> root@72c5af7ed83c:/usr/lib/postgresql/12/bin# psql -Upostgres</span></span>
<span class="line"><span style="color:#e1e4e8;"> psql (12.2 (Debian 12.2-1.pgdg100+1))</span></span>
<span class="line"><span style="color:#e1e4e8;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker run --name postgres2 -e POSTGRES_PASSWORD=password -p 5432:5432 -v /data/pgdata:/var/lib/postgresql/data -d postgres:12.2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#进入镜像</span></span>
<span class="line"><span style="color:#24292e;">docker exec -it postgres2 /bin/bash</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#目录</span></span>
<span class="line"><span style="color:#24292e;"> cd /var/lib/postgresql/data</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #连接数据库</span></span>
<span class="line"><span style="color:#24292e;"> root@72c5af7ed83c:/usr/lib/postgresql/12/bin# psql -Upostgres</span></span>
<span class="line"><span style="color:#24292e;"> psql (12.2 (Debian 12.2-1.pgdg100+1))</span></span>
<span class="line"><span style="color:#24292e;">Type &quot;help&quot; for help.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=#</span></span></code></pre></div>`,5),o=[l];function t(c,r,i,d,g,h){return a(),e("div",null,o)}const _=s(p,[["render",t]]);export{u as __pageData,_ as default};
