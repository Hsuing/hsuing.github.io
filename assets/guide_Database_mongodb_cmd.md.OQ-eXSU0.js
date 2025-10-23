import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/cmd.md","filePath":"guide/Database/mongodb/cmd.md","lastUpdated":1704853811000}'),l={name:"guide/Database/mongodb/cmd.md"},p=a(`<h2 id="_1-配置用户和密码" tabindex="-1">1.配置用户和密码 <a class="header-anchor" href="#_1-配置用户和密码" aria-label="Permalink to &quot;1.配置用户和密码&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser({ </span></span>
<span class="line"><span style="color:#e1e4e8;">    user: &quot;admin&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    pwd: &quot;admin123&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    roles: [ { role: &quot;readWrite&quot;, db: &quot;admin&quot; } ], </span></span>
<span class="line"><span style="color:#e1e4e8;">    mechanisms : [&quot;SCRAM-SHA-1&quot;] </span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">db.createUser({ </span></span>
<span class="line"><span style="color:#e1e4e8;">    user: &quot;whp&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    pwd: &quot;whp123&quot;, </span></span>
<span class="line"><span style="color:#e1e4e8;">    roles: [ { role: &quot;readWrite&quot;, db: &quot;platformUtilsItem&quot; } ], </span></span>
<span class="line"><span style="color:#e1e4e8;">    mechanisms : [&quot;SCRAM-SHA-1&quot;] </span></span>
<span class="line"><span style="color:#e1e4e8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">use admin</span></span>
<span class="line"><span style="color:#24292e;">db.createUser({ </span></span>
<span class="line"><span style="color:#24292e;">    user: &quot;admin&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    pwd: &quot;admin123&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    roles: [ { role: &quot;readWrite&quot;, db: &quot;admin&quot; } ], </span></span>
<span class="line"><span style="color:#24292e;">    mechanisms : [&quot;SCRAM-SHA-1&quot;] </span></span>
<span class="line"><span style="color:#24292e;">})</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">db.createUser({ </span></span>
<span class="line"><span style="color:#24292e;">    user: &quot;whp&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    pwd: &quot;whp123&quot;, </span></span>
<span class="line"><span style="color:#24292e;">    roles: [ { role: &quot;readWrite&quot;, db: &quot;platformUtilsItem&quot; } ], </span></span>
<span class="line"><span style="color:#24292e;">    mechanisms : [&quot;SCRAM-SHA-1&quot;] </span></span>
<span class="line"><span style="color:#24292e;">})</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1）help：列出所有的function</span></span>
<span class="line"><span style="color:#e1e4e8;">2）show dbs：展示当前实例中所有的databases。</span></span>
<span class="line"><span style="color:#e1e4e8;">3）use &lt;dbname&gt;：切换到指定的db，接下来的操作将会在此db中。</span></span>
<span class="line"><span style="color:#e1e4e8;">4）show collections：展示出当前db中所有的collections。</span></span>
<span class="line"><span style="color:#e1e4e8;">5）show users：展示当前db中已经添加的所有用户。</span></span>
<span class="line"><span style="color:#e1e4e8;">6）show roles：展示当前db中所有内置的或者自定义的用户角色。</span></span>
<span class="line"><span style="color:#e1e4e8;">7）show profile：这涉及到profile相关的配置，默认情况下展示出最近5个操作耗时超过1秒的操作，通常用于跟踪慢查询。</span></span>
<span class="line"><span style="color:#e1e4e8;">8）db.help()：展示出可以在db上进行的操作function。</span></span>
<span class="line"><span style="color:#e1e4e8;">9）db.&lt;collection&gt;.help()：展示出可以在colleciton上进行的操作。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1）help：列出所有的function</span></span>
<span class="line"><span style="color:#24292e;">2）show dbs：展示当前实例中所有的databases。</span></span>
<span class="line"><span style="color:#24292e;">3）use &lt;dbname&gt;：切换到指定的db，接下来的操作将会在此db中。</span></span>
<span class="line"><span style="color:#24292e;">4）show collections：展示出当前db中所有的collections。</span></span>
<span class="line"><span style="color:#24292e;">5）show users：展示当前db中已经添加的所有用户。</span></span>
<span class="line"><span style="color:#24292e;">6）show roles：展示当前db中所有内置的或者自定义的用户角色。</span></span>
<span class="line"><span style="color:#24292e;">7）show profile：这涉及到profile相关的配置，默认情况下展示出最近5个操作耗时超过1秒的操作，通常用于跟踪慢查询。</span></span>
<span class="line"><span style="color:#24292e;">8）db.help()：展示出可以在db上进行的操作function。</span></span>
<span class="line"><span style="color:#24292e;">9）db.&lt;collection&gt;.help()：展示出可以在colleciton上进行的操作。</span></span></code></pre></div><p><a href="https://www.zhangbj.com/topic/MongoDB.html" target="_blank" rel="noreferrer">https://www.zhangbj.com/topic/MongoDB.html</a></p><p><a href="https://blog.csdn.net/sun_xuegang/article/details/110386992" target="_blank" rel="noreferrer">https://blog.csdn.net/sun_xuegang/article/details/110386992</a></p><p><a href="https://www.cnblogs.com/zgq7/p/14062714.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/zgq7/p/14062714.html</a></p><p><a href="https://www.cnblogs.com/fb010001/p/14949548.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/fb010001/p/14949548.html</a></p>`,7),o=[p];function t(c,r,i,d,u,h){return n(),e("div",null,o)}const y=s(l,[["render",t]]);export{m as __pageData,y as default};
