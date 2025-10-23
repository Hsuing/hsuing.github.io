import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/optimize/10_slowLog.md","filePath":"guide/Database/pgSql/optimize/10_slowLog.md","lastUpdated":1703233898000}'),l={name:"guide/Database/pgSql/optimize/10_slowLog.md"},o=n(`<h2 id="_1-完整配置" tabindex="-1">1.完整配置 <a class="header-anchor" href="#_1-完整配置" aria-label="Permalink to &quot;1.完整配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#################slow_log#####################</span></span>
<span class="line"><span style="color:#e1e4e8;">logging_collector = on</span></span>
<span class="line"><span style="color:#e1e4e8;">log_destination = &#39;stderr&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">log_directory = &#39;log&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">log_filename = &#39;postgresql-%Y-%m-%d_%H%M%S.log&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_age = 1d</span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_size = 10240</span></span>
<span class="line"><span style="color:#e1e4e8;">log_min_duration_statement = 3000</span></span>
<span class="line"><span style="color:#e1e4e8;">log_statement = DDL</span></span>
<span class="line"><span style="color:#e1e4e8;">log_truncate_on_rotation = on</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#################slow_log#####################</span></span>
<span class="line"><span style="color:#24292e;">logging_collector = on</span></span>
<span class="line"><span style="color:#24292e;">log_destination = &#39;stderr&#39;</span></span>
<span class="line"><span style="color:#24292e;">log_directory = &#39;log&#39;</span></span>
<span class="line"><span style="color:#24292e;">log_filename = &#39;postgresql-%Y-%m-%d_%H%M%S.log&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">log_rotation_age = 1d</span></span>
<span class="line"><span style="color:#24292e;">log_rotation_size = 10240</span></span>
<span class="line"><span style="color:#24292e;">log_min_duration_statement = 3000</span></span>
<span class="line"><span style="color:#24292e;">log_statement = DDL</span></span>
<span class="line"><span style="color:#24292e;">log_truncate_on_rotation = on</span></span></code></pre></div><h2 id="_2-捕获正在查询的慢sql" tabindex="-1">2.捕获正在查询的慢SQL <a class="header-anchor" href="#_2-捕获正在查询的慢sql" aria-label="Permalink to &quot;2.捕获正在查询的慢SQL&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select * from pg_stat_activity where state&lt;&gt;&#39;idle&#39; and now()-query_start &gt; interval &#39;5 s&#39; order by query_start ;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select * from pg_stat_activity where state&lt;&gt;&#39;idle&#39; and now()-query_start &gt; interval &#39;5 s&#39; order by query_start ;</span></span></code></pre></div><h2 id="_3-查看配置" tabindex="-1">3.查看配置 <a class="header-anchor" href="#_3-查看配置" aria-label="Permalink to &quot;3.查看配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT </span></span>
<span class="line"><span style="color:#e1e4e8;">      name,</span></span>
<span class="line"><span style="color:#e1e4e8;">      setting,</span></span>
<span class="line"><span style="color:#e1e4e8;">      vartype,</span></span>
<span class="line"><span style="color:#e1e4e8;">      boot_val,</span></span>
<span class="line"><span style="color:#e1e4e8;">      reset_val </span></span>
<span class="line"><span style="color:#e1e4e8;">FROM pg_settings </span></span>
<span class="line"><span style="color:#e1e4e8;">where name in(&#39;logging_collector&#39;,&#39;log_destination&#39;,&#39;log_directory&#39;,&#39;log_filename&#39;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT </span></span>
<span class="line"><span style="color:#24292e;">      name,</span></span>
<span class="line"><span style="color:#24292e;">      setting,</span></span>
<span class="line"><span style="color:#24292e;">      vartype,</span></span>
<span class="line"><span style="color:#24292e;">      boot_val,</span></span>
<span class="line"><span style="color:#24292e;">      reset_val </span></span>
<span class="line"><span style="color:#24292e;">FROM pg_settings </span></span>
<span class="line"><span style="color:#24292e;">where name in(&#39;logging_collector&#39;,&#39;log_destination&#39;,&#39;log_directory&#39;,&#39;log_filename&#39;);</span></span></code></pre></div><p>其他几个重要参数说明：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_rotation_age = 1440    #minute,多长时间创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#e1e4e8;">log_rotation_size = 10240    #kb,文件多大后创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#e1e4e8;">log_truncate_on_rotation = on #可重用同名日志文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_rotation_age = 1440    #minute,多长时间创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#24292e;">log_rotation_size = 10240    #kb,文件多大后创建新的文件记录日志。0 表示禁扩展。</span></span>
<span class="line"><span style="color:#24292e;">log_truncate_on_rotation = on #可重用同名日志文件</span></span></code></pre></div><p>当需要跟踪SQL语句或者慢语句，得需要设置以下参数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">log_statement = all    #需设置跟踪所有语句，否则只能跟踪出错信息</span></span>
<span class="line"><span style="color:#e1e4e8;">log_min_duration_statement = 5000    #milliseconds,记录执行5秒及以上的语句</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">log_statement = all    #需设置跟踪所有语句，否则只能跟踪出错信息</span></span>
<span class="line"><span style="color:#24292e;">log_min_duration_statement = 5000    #milliseconds,记录执行5秒及以上的语句</span></span></code></pre></div><p><strong>log_statement：</strong> 设置跟踪的语句类型，有4种类型：none(默认), ddl, mod, all。跟踪所有语句时可设置为 &quot;all&quot;。</p><p><strong>log_min_duration_statement：</strong> 跟踪慢查询语句，单位为毫秒。如设置 5000，表示日志将记录执行5秒以上的SQL语句。</p><p>当 log_statement=all 和 log_min_duration_statement 同时设置时，将跟踪所有语句，忽略log_min_duration_statement 设置。所以需按情况设置其中一个或两个值。</p><p><strong>加载配置</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select pg_reload_conf();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">show log_min_duration_statement;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select pg_reload_conf();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">show log_min_duration_statement;</span></span></code></pre></div><p>针对某个用户或者某数据库进行设置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> alter database test set log_min_duration_statement=5000;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> alter database test set log_min_duration_statement=5000;</span></span></code></pre></div>`,17),t=[o];function p(i,c,r,d,g,_){return a(),e("div",null,t)}const u=s(l,[["render",p]]);export{h as __pageData,u as default};
