import{_ as e,c as a,o as s,R as p}from"./chunks/framework.CIzs38F0.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/1.md","filePath":"guide/Database/pgSql/1.md","lastUpdated":1703063387000}'),t={name:"guide/Database/pgSql/1.md"},l=p('<p>postgresql 系统概述</p><p>目标：</p><p>发展史</p><p>pg 特性</p><p>​ 如何安装pg</p><p>​ 可靠性</p><p>​ wal 日志和基础备份，可以恢复到任意时间点数据</p><p>体系架构</p><p>系统表之间关系</p><p>pg物理架构，数据库逻辑</p><p>编译 --with-blocksize=32</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">show max_standby_streaming_delay;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">show max_standby_streaming_delay;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pg_terminate_backend</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pg_terminate_backend</span></span></code></pre></div><p>对于Postgresql ，最好不要用kill -9 去杀用户进程，因为如果是一个很大的UPDATE,kill后，Postgresql需要很长的时间做Recovery,而在这个RECOVERY过程中，数据库是不可用的，在这点上，Oracle 要友好些，在数据库恢复的过程中数据库依然可用,不太需要因Kill -9 用户进程而造成数据库不可用的情况</p>',14),o=[l];function n(c,i,d,r,_,g){return s(),a("div",null,o)}const m=e(t,[["render",n]]);export{u as __pageData,m as default};
