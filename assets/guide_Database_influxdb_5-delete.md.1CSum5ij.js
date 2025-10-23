import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"一、删除","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/5-delete.md","filePath":"guide/Database/influxdb/5-delete.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/5-delete.md"},p=a(`<h1 id="一、删除" tabindex="-1">一、删除 <a class="header-anchor" href="#一、删除" aria-label="Permalink to &quot;一、删除&quot;">​</a></h1><ul><li>delete 语句</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> DELETE FROM &lt;measurement_name&gt; WHERE [&lt;tag_key&gt;=&#39;&lt;tag_value&gt;&#39;] | [&lt;time interval&gt;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> DELETE FROM &lt;measurement_name&gt; WHERE [&lt;tag_key&gt;=&#39;&lt;tag_value&gt;&#39;] | [&lt;time interval&gt;]</span></span></code></pre></div><p>==只允许根据tag和时间来进行删除操作==</p><h2 id="_1-1-根据时间删除" tabindex="-1">1.1 根据时间删除 <a class="header-anchor" href="#_1-1-根据时间删除" aria-label="Permalink to &quot;1.1 根据时间删除&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">name: userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">time                blog   name userId</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ----   ---- ------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568468825672884073 ksksks blog 10</span></span>
<span class="line"><span style="color:#e1e4e8;">1568468830240881233 ksksks blog 1</span></span>
<span class="line"><span style="color:#e1e4e8;">1568468833161251273 ksksks blog 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; delete from userInfo where time=1568468825672884073</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">name: userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">time                blog   name userId</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ----   ---- ------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568468830240881233 ksksks blog 1</span></span>
<span class="line"><span style="color:#e1e4e8;">1568468833161251273 ksksks blog 2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#24292e;">name: userInfo</span></span>
<span class="line"><span style="color:#24292e;">time                blog   name userId</span></span>
<span class="line"><span style="color:#24292e;">----                ----   ---- ------</span></span>
<span class="line"><span style="color:#24292e;">1568468825672884073 ksksks blog 10</span></span>
<span class="line"><span style="color:#24292e;">1568468830240881233 ksksks blog 1</span></span>
<span class="line"><span style="color:#24292e;">1568468833161251273 ksksks blog 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; delete from userInfo where time=1568468825672884073</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#24292e;">name: userInfo</span></span>
<span class="line"><span style="color:#24292e;">time                blog   name userId</span></span>
<span class="line"><span style="color:#24292e;">----                ----   ---- ------</span></span>
<span class="line"><span style="color:#24292e;">1568468830240881233 ksksks blog 1</span></span>
<span class="line"><span style="color:#24292e;">1568468833161251273 ksksks blog 2</span></span></code></pre></div><h2 id="_1-2-根据tag删除" tabindex="-1">1.2 根据tag删除 <a class="header-anchor" href="#_1-2-根据tag删除" aria-label="Permalink to &quot;1.2 根据tag删除&quot;">​</a></h2><ul><li>注意name为保留名，因此需要用双引号括起来</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show tag keys from userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">name: userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">tagKey</span></span>
<span class="line"><span style="color:#e1e4e8;">------</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">name: userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">time                blog   name userId</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ----   ---- ------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568468830240881233 ksksks blog 1</span></span>
<span class="line"><span style="color:#e1e4e8;">1568468833161251273 ksksks blog 2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; delete from userInfo where &quot;name&quot;=&#39;blog&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show tag keys from userInfo</span></span>
<span class="line"><span style="color:#24292e;">name: userInfo</span></span>
<span class="line"><span style="color:#24292e;">tagKey</span></span>
<span class="line"><span style="color:#24292e;">------</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#24292e;">name: userInfo</span></span>
<span class="line"><span style="color:#24292e;">time                blog   name userId</span></span>
<span class="line"><span style="color:#24292e;">----                ----   ---- ------</span></span>
<span class="line"><span style="color:#24292e;">1568468830240881233 ksksks blog 1</span></span>
<span class="line"><span style="color:#24292e;">1568468833161251273 ksksks blog 2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; delete from userInfo where &quot;name&quot;=&#39;blog&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from userInfo</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><h2 id="_1-3-不同保存策略的数据删除" tabindex="-1">1.3 不同保存策略的数据删除 <a class="header-anchor" href="#_1-3-不同保存策略的数据删除" aria-label="Permalink to &quot;1.3 不同保存策略的数据删除&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; insert add_test,name=YiHui,phone=110 boy=true,age=19i,user_id=2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; insert into &quot;1D&quot; add_test,name=YiHui,phone=110 boy=true,age=19i,user_id=1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; insert into &quot;1Y&quot; add_test,name=YiHui,phone=110 boy=true,age=19i,user_id=1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;  select * from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1564150279123000000 18  true test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#e1e4e8;">1568470304939913644          test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#e1e4e8;">1568470399995857565 18  true test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#e1e4e8;">1568601987939395085 19  true              YiHui 110   2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from &quot;1Y&quot;.add_tes</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from &quot;1Y&quot;.add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name   phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----   ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1564150279123000000 18  true test@126.com YiHui2 911   23</span></span>
<span class="line"><span style="color:#e1e4e8;">1568602026240146951 19  true              YiHui  110   1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; delete from add_test where &quot;name&quot;=&#39;YiHui&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from &quot;1Y&quot;.add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name   phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----   ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1564150279123000000 18  true test@126.com YiHui2 911   23</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; insert add_test,name=YiHui,phone=110 boy=true,age=19i,user_id=2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; insert into &quot;1D&quot; add_test,name=YiHui,phone=110 boy=true,age=19i,user_id=1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; insert into &quot;1Y&quot; add_test,name=YiHui,phone=110 boy=true,age=19i,user_id=1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;  select * from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1564150279123000000 18  true test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#24292e;">1568470304939913644          test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#24292e;">1568470399995857565 18  true test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#24292e;">1568601987939395085 19  true              YiHui 110   2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from &quot;1Y&quot;.add_tes</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from &quot;1Y&quot;.add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name   phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----   ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1564150279123000000 18  true test@126.com YiHui2 911   23</span></span>
<span class="line"><span style="color:#24292e;">1568602026240146951 19  true              YiHui  110   1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; delete from add_test where &quot;name&quot;=&#39;YiHui&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from &quot;1Y&quot;.add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name   phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----   ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1564150279123000000 18  true test@126.com YiHui2 911   23</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><blockquote><p>根据tag进行删除时，默认策略，和”1D”保存策略中的数据都被删除掉</p></blockquote>`,12),o=[p];function t(c,i,r,y,d,u){return e(),n("div",null,o)}const _=s(l,[["render",t]]);export{m as __pageData,_ as default};
