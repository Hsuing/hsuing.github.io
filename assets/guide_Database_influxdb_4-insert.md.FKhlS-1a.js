import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一、Insert 使用说明","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/4-insert.md","filePath":"guide/Database/influxdb/4-insert.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/4-insert.md"},p=n(`<h1 id="一、insert-使用说明" tabindex="-1">一、Insert 使用说明 <a class="header-anchor" href="#一、insert-使用说明" aria-label="Permalink to &quot;一、Insert 使用说明&quot;">​</a></h1><p><a href="https://docs.influxdata.com/influxdb/v1.7/tools/shell/#write-data-to-influxdb-with-insert" target="_blank" rel="noreferrer">https://docs.influxdata.com/influxdb/v1.7/tools/shell/#write-data-to-influxdb-with-insert</a></p><p><a href="https://docs.influxdata.com/influxdb/v1.7/query_language/database_management/#delete-series-with-delete" target="_blank" rel="noreferrer">https://docs.influxdata.com/influxdb/v1.7/query_language/database_management/#delete-series-with-delete</a></p><h2 id="_1-1-基本语法" tabindex="-1">1.1 基本语法 <a class="header-anchor" href="#_1-1-基本语法" aria-label="Permalink to &quot;1.1 基本语法&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">insert</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">into</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">retention</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">polic</span><span style="color:#E1E4E8;">y</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">measurement,tagKey=tagValue</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">fieldKey=fieldValue</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">timestamp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">insert</span><span style="color:#24292E;"> </span><span style="color:#032F62;">into</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">retention</span><span style="color:#24292E;"> </span><span style="color:#032F62;">polic</span><span style="color:#24292E;">y</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">measurement,tagKey=tagValue</span><span style="color:#24292E;"> </span><span style="color:#032F62;">fieldKey=fieldValue</span><span style="color:#24292E;"> </span><span style="color:#032F62;">timestamp</span></span></code></pre></div><ul><li>插入的语句写法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">insert + measurement + &quot;,&quot; + tag=value,tag=value + + field=value,field=value</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tag与tag之间用逗号分隔；field与field之间用逗号分隔</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tag与field之间用空格分隔</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tag都是string类型，不需要引号将value包裹</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">field如果是string类型，需要加引号</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">insert + measurement + &quot;,&quot; + tag=value,tag=value + + field=value,field=value</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tag与tag之间用逗号分隔；field与field之间用逗号分隔</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tag与field之间用空格分隔</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tag都是string类型，不需要引号将value包裹</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">field如果是string类型，需要加引号</span></span></code></pre></div><h2 id="_1-2-四种类型" tabindex="-1">1.2 四种类型 <a class="header-anchor" href="#_1-2-四种类型" aria-label="Permalink to &quot;1.2 四种类型&quot;">​</a></h2><ul><li>field有四种类型，int, float, string, boolean</li></ul><table><thead><tr><th>类型</th><th>方式</th><th>示例</th></tr></thead><tbody><tr><td>float</td><td>数字</td><td>user_id=21</td></tr><tr><td>int</td><td>数字i</td><td>age=18i</td></tr><tr><td>boolean</td><td>true/false</td><td>boy=true</td></tr><tr><td>String</td><td>&quot;&quot; or &#39;&#39;</td><td><a href="mailto:email=%22sfds@126.com" target="_blank" rel="noreferrer">email=&quot;sfds@126.com</a>&quot;</td></tr></tbody></table><ul><li>instert</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; insert add_test,name=YiHui,phone=110 user_id=20,email=&quot;test@126.com&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;  select * from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568470304939913644 test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568470304939913644          test@126.com YiHui 110   20</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; insert add_test,name=YiHui,phone=110 user_id=20,email=&quot;test@126.com&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;  select * from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1568470304939913644 test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1568470304939913644          test@126.com YiHui 110   20</span></span></code></pre></div><ul><li>field类型</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; insert add_test,name=YiHui,phone=110 user_id=21,email=&quot;test@126.com&quot;,age=18i,boy=true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568470399995857565 18  true test@126.com YiHui 110   21</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; insert add_test,name=YiHui,phone=110 user_id=21,email=&quot;test@126.com&quot;,age=18i,boy=true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1568470399995857565 18  true test@126.com YiHui 110   21</span></span></code></pre></div><h2 id="_1-3-tag" tabindex="-1">1.3 tag <a class="header-anchor" href="#_1-3-tag" aria-label="Permalink to &quot;1.3 tag&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show tag keys from add_test;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">tagKey</span></span>
<span class="line"><span style="color:#e1e4e8;">------</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">phone</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show tag keys from add_test;</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">tagKey</span></span>
<span class="line"><span style="color:#24292e;">------</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">phone</span></span></code></pre></div><h2 id="_1-4-field" tabindex="-1">1.4 field <a class="header-anchor" href="#_1-4-field" aria-label="Permalink to &quot;1.4 field&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show field keys from add_test;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">fieldKey fieldType</span></span>
<span class="line"><span style="color:#e1e4e8;">-------- ---------</span></span>
<span class="line"><span style="color:#e1e4e8;">age      integer</span></span>
<span class="line"><span style="color:#e1e4e8;">boy      boolean</span></span>
<span class="line"><span style="color:#e1e4e8;">email    string</span></span>
<span class="line"><span style="color:#e1e4e8;">user_id  float</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show field keys from add_test;</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">fieldKey fieldType</span></span>
<span class="line"><span style="color:#24292e;">-------- ---------</span></span>
<span class="line"><span style="color:#24292e;">age      integer</span></span>
<span class="line"><span style="color:#24292e;">boy      boolean</span></span>
<span class="line"><span style="color:#24292e;">email    string</span></span>
<span class="line"><span style="color:#24292e;">user_id  float</span></span></code></pre></div><h2 id="_1-5-时间戳指定" tabindex="-1">1.5 时间戳指定 <a class="header-anchor" href="#_1-5-时间戳指定" aria-label="Permalink to &quot;1.5 时间戳指定&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">注意时间为ns</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; insert add_test,name=YiHui,phone=110 user_id=22,email=&quot;test@126.com&quot;,age=18i,boy=true 1564150279123000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1564150279123000000 18  true test@126.com YiHui 110   22</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">注意时间为ns</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; insert add_test,name=YiHui,phone=110 user_id=22,email=&quot;test@126.com&quot;,age=18i,boy=true 1564150279123000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1564150279123000000 18  true test@126.com YiHui 110   22</span></span></code></pre></div><h2 id="_1-6-指定保存策略插入数据" tabindex="-1">1.6 指定保存策略插入数据 <a class="header-anchor" href="#_1-6-指定保存策略插入数据" aria-label="Permalink to &quot;1.6 指定保存策略插入数据&quot;">​</a></h2><ul><li>写入数据时，如果需要指定保存策略</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看下</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;  show retention policies on test</span></span>
<span class="line"><span style="color:#e1e4e8;">name    duration  shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#e1e4e8;">----    --------  ------------------ -------- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">autogen 0s        168h0m0s           1        true</span></span>
<span class="line"><span style="color:#e1e4e8;">1Y      8784h0m0s 168h0m0s           1        false</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; insert into &quot;1Y&quot; add_test,name=YiHui2,phone=911 user_id=23,email=&quot;test@126.com&quot;,age=18i,boy=true 1564150279123000000</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1564150279123000000 18  true test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#e1e4e8;">1568470304939913644          test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#e1e4e8;">1568470399995857565 18  true test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from &quot;1Y&quot;.add_test;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                age boy  email        name   phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                --- ---  -----        ----   ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1564150279123000000 18  true test@126.com YiHui2 911   23</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看下</span></span>
<span class="line"><span style="color:#24292e;">&gt;  show retention policies on test</span></span>
<span class="line"><span style="color:#24292e;">name    duration  shardGroupDuration replicaN default</span></span>
<span class="line"><span style="color:#24292e;">----    --------  ------------------ -------- -------</span></span>
<span class="line"><span style="color:#24292e;">autogen 0s        168h0m0s           1        true</span></span>
<span class="line"><span style="color:#24292e;">1Y      8784h0m0s 168h0m0s           1        false</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; insert into &quot;1Y&quot; add_test,name=YiHui2,phone=911 user_id=23,email=&quot;test@126.com&quot;,age=18i,boy=true 1564150279123000000</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test;</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1564150279123000000 18  true test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#24292e;">1568470304939913644          test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#24292e;">1568470399995857565 18  true test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from &quot;1Y&quot;.add_test;</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                age boy  email        name   phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                --- ---  -----        ----   ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1564150279123000000 18  true test@126.com YiHui2 911   23</span></span></code></pre></div>`,23),t=[p];function o(i,c,r,d,y,u){return a(),e("div",null,t)}const g=s(l,[["render",o]]);export{h as __pageData,g as default};
