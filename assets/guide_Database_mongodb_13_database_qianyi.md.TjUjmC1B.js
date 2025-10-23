import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1.分片数据迁移","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/mongodb/13_database_qianyi.md","filePath":"guide/Database/mongodb/13_database_qianyi.md","lastUpdated":1704853811000}'),o={name:"guide/Database/mongodb/13_database_qianyi.md"},t=e(`<p><a href="https://www.jianshu.com/p/d839119b1d15" target="_blank" rel="noreferrer">https://www.jianshu.com/p/d839119b1d15</a></p><h1 id="_1-分片数据迁移" tabindex="-1">1.分片数据迁移 <a class="header-anchor" href="#_1-分片数据迁移" aria-label="Permalink to &quot;1.分片数据迁移&quot;">​</a></h1><p><strong>检查 balancer 是否开启 （必须为开启）</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; sh.getBalancerState()</span></span>
<span class="line"><span style="color:#e1e4e8;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; sh.getBalancerState()</span></span>
<span class="line"><span style="color:#24292e;">true</span></span></code></pre></div><h2 id="查看分片状态" tabindex="-1"><strong>查看分片状态</strong> <a class="header-anchor" href="#查看分片状态" aria-label="Permalink to &quot;**查看分片状态**&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; db.printShardingStatus()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; db.printShardingStatus()</span></span></code></pre></div><h2 id="分片迁移数据块" tabindex="-1">分片迁移数据块 <a class="header-anchor" href="#分片迁移数据块" aria-label="Permalink to &quot;分片迁移数据块&quot;">​</a></h2><p>在 admin 数据库中,运行 removeShard 命令.运行之后会开始将这个分片的数据块”转移”到其他分片的过程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; db.runCommand( { removeShard: &quot;shard1&quot; } )</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; use admin</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; db.runCommand( { removeShard: &quot;shard1&quot; } )</span></span></code></pre></div><h2 id="检查迁移状态" tabindex="-1">检查迁移状态 <a class="header-anchor" href="#检查迁移状态" aria-label="Permalink to &quot;检查迁移状态&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; use admin</span></span>
<span class="line"><span style="color:#e1e4e8;">mongos&gt; db.runCommand( { removeShard: &quot;shard1&quot; } )</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;msg&quot; : &quot;draining ongoing&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;state&quot; : &quot;ongoing&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">	&quot;remaining&quot; : {</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;chunks&quot; : NumberLong(4255),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;dbs&quot; : NumberLong(6),</span></span>
<span class="line"><span style="color:#e1e4e8;">		&quot;jumboChunks&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#e1e4e8;">	},</span></span>
<span class="line"><span style="color:#e1e4e8;">。。。。。。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">remaining 必须迁移到其他分片的数据块中剩余的数据块数量</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; use admin</span></span>
<span class="line"><span style="color:#24292e;">mongos&gt; db.runCommand( { removeShard: &quot;shard1&quot; } )</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">	&quot;msg&quot; : &quot;draining ongoing&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;state&quot; : &quot;ongoing&quot;,</span></span>
<span class="line"><span style="color:#24292e;">	&quot;remaining&quot; : {</span></span>
<span class="line"><span style="color:#24292e;">		&quot;chunks&quot; : NumberLong(4255),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;dbs&quot; : NumberLong(6),</span></span>
<span class="line"><span style="color:#24292e;">		&quot;jumboChunks&quot; : NumberLong(0)</span></span>
<span class="line"><span style="color:#24292e;">	},</span></span>
<span class="line"><span style="color:#24292e;">。。。。。。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">remaining 必须迁移到其他分片的数据块中剩余的数据块数量</span></span></code></pre></div><p><strong><em>*注意*</em>： 在分片迁移未完成之前不要执行,数据库到另一个分片</strong></p><h2 id="数据库迁移到另一个分片" tabindex="-1">数据库迁移到另一个分片 <a class="header-anchor" href="#数据库迁移到另一个分片" aria-label="Permalink to &quot;数据库迁移到另一个分片&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; db.printShardingStatus()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; db.printShardingStatus()</span></span></code></pre></div><p>将数据库迁移到另一个分片，需要使用 movePrimary. 将所有的剩余的未分片的数据从 shard1 迁移至 shard2 上</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; db.runCommand( { movePrimary: &quot;products&quot;, to: &quot;shard2&quot; })</span></span>
<span class="line"><span style="color:#e1e4e8;">{ &quot;primary&quot; : &quot;mongodb1&quot;, &quot;ok&quot; : 1 }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; db.runCommand( { movePrimary: &quot;products&quot;, to: &quot;shard2&quot; })</span></span>
<span class="line"><span style="color:#24292e;">{ &quot;primary&quot; : &quot;mongodb1&quot;, &quot;ok&quot; : 1 }</span></span></code></pre></div><p>结束删除分片的过程,再次执行 removeShard 命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mongos&gt; db.runCommand( { removeShard: &quot;shard1&quot; } )</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;msg&quot; : &quot;removeshard completed successfully&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;state&quot; : &quot;completed&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;shard&quot; : &quot;shard1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ok&quot; : 1</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">#至此结束分片迁移</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mongos&gt; db.runCommand( { removeShard: &quot;shard1&quot; } )</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;msg&quot; : &quot;removeshard completed successfully&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;state&quot; : &quot;completed&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;shard&quot; : &quot;shard1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;ok&quot; : 1</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">#至此结束分片迁移</span></span></code></pre></div>`,18),p=[t];function l(c,r,i,d,u,g){return a(),n("div",null,p)}const q=s(o,[["render",l]]);export{m as __pageData,q as default};
