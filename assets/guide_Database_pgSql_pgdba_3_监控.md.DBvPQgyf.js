import{_ as s,o as a,c as e,R as p}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/pgdba/3_监控.md","filePath":"guide/Database/pgSql/pgdba/3_监控.md","lastUpdated":1703063387000}'),n={name:"guide/Database/pgSql/pgdba/3_监控.md"},t=p(`<p>日常资源监控、慢查询、告警日志</p><p>重要指标的巡检</p><p>当前用户连接数</p><p>[root@beta ~]# ps axu|grep postgres</p><p>或者</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# select count(*) from pg_stat_activity;</span></span>
<span class="line"><span style="color:#e1e4e8;"> count </span></span>
<span class="line"><span style="color:#e1e4e8;">-------</span></span>
<span class="line"><span style="color:#e1e4e8;">    12</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# select count(*) from pg_stat_activity;</span></span>
<span class="line"><span style="color:#24292e;"> count </span></span>
<span class="line"><span style="color:#24292e;">-------</span></span>
<span class="line"><span style="color:#24292e;">    12</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p>或者</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# select count(*) from pg_stat_activity where not pid=pg_backend_pid();</span></span>
<span class="line"><span style="color:#e1e4e8;"> count </span></span>
<span class="line"><span style="color:#e1e4e8;">-------</span></span>
<span class="line"><span style="color:#e1e4e8;">    11</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# select count(*) from pg_stat_activity where not pid=pg_backend_pid();</span></span>
<span class="line"><span style="color:#24292e;"> count </span></span>
<span class="line"><span style="color:#24292e;">-------</span></span>
<span class="line"><span style="color:#24292e;">    11</span></span>
<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p>pgbadger</p><p>pg_catalog</p><p>pg_buffer</p><p>pmm2</p><p>pghero</p><p>pgtop</p>`,14),l=[t];function o(c,i,r,d,_,g){return a(),e("div",null,l)}const h=s(n,[["render",o]]);export{y as __pageData,h as default};
