import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"建议：","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/pgSql/optimize/1_vacuum.md","filePath":"guide/Database/pgSql/optimize/1_vacuum.md","lastUpdated":1711524170000}'),l={name:"guide/Database/pgSql/optimize/1_vacuum.md"},p=e(`<blockquote><p>官方文档</p><p><a href="http://www.postgres.cn/docs/12/runtime-config-autovacuum.html" target="_blank" rel="noreferrer">http://www.postgres.cn/docs/12/runtime-config-autovacuum.html</a></p><h1 id="建议" tabindex="-1">建议： <a class="header-anchor" href="#建议" aria-label="Permalink to &quot;建议：&quot;">​</a></h1><p>1、autovacuum_max_workers的建议值为CPU核数/3。CPU资源充足，I/O性能较好时，可以适当加大。</p><p>2、对于更新频繁的交易系统，如果系统资源充足，可以缩小autovacuum_vacuum_scale_factor 与 autovacuum_vacuum_threshold，让vacuum清理频繁</p></blockquote><p>VACUUM命令基本上删除由更新删除或过时但未从表中物理删除的元组。这对避免腹胀很有帮助</p><h2 id="_1-查看配置参数" tabindex="-1">1.查看配置参数 <a class="header-anchor" href="#_1-查看配置参数" aria-label="Permalink to &quot;1.查看配置参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ptgres@pg_beta data]$ psql -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#e1e4e8;">psql (12.2)</span></span>
<span class="line"><span style="color:#e1e4e8;">输入 &quot;help&quot; 来获取帮助信息.</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">postgres=# show log_autovacuum_min_duration;</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_autovacuum_min_duration </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> 1ms</span></span>
<span class="line"><span style="color:#e1e4e8;">(1 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ptgres@pg_beta data]$ psql -U postgres -h 127.0.0.1 -p 5532</span></span>
<span class="line"><span style="color:#24292e;">psql (12.2)</span></span>
<span class="line"><span style="color:#24292e;">输入 &quot;help&quot; 来获取帮助信息.</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">postgres=# show log_autovacuum_min_duration;</span></span>
<span class="line"><span style="color:#24292e;"> log_autovacuum_min_duration </span></span>
<span class="line"><span style="color:#24292e;">-----------------------------</span></span>
<span class="line"><span style="color:#24292e;"> 1ms</span></span>
<span class="line"><span style="color:#24292e;">(1 行记录)</span></span></code></pre></div><h2 id="_2-修改参数" tabindex="-1">2.修改参数 <a class="header-anchor" href="#_2-修改参数" aria-label="Permalink to &quot;2.修改参数&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER SYSTEM SET autovacuum_vacuum_scale_factor = 0.03;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER SYSTEM SET autovacuum_analyze_scale_factor = 0.03;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER SYSTEM SET autovacuum_vacuum_threshold = 300;</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER SYSTEM SET autovacuum_analyze_threshold = 300;</span></span>
<span class="line"><span style="color:#e1e4e8;">select pg_reload_conf ();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER SYSTEM SET autovacuum_vacuum_scale_factor = 0.03;</span></span>
<span class="line"><span style="color:#24292e;">ALTER SYSTEM SET autovacuum_analyze_scale_factor = 0.03;</span></span>
<span class="line"><span style="color:#24292e;">ALTER SYSTEM SET autovacuum_vacuum_threshold = 300;</span></span>
<span class="line"><span style="color:#24292e;">ALTER SYSTEM SET autovacuum_analyze_threshold = 300;</span></span>
<span class="line"><span style="color:#24292e;">select pg_reload_conf ();</span></span></code></pre></div><ul><li>查看配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">postgres=# \\d pg_settings;</span></span>
<span class="line"><span style="color:#e1e4e8;">            视图 &quot;pg_catalog.pg_settings&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      栏位       |  类型   | 校对规则 | 可空的 | 预设 </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------+---------+----------+--------+------</span></span>
<span class="line"><span style="color:#e1e4e8;"> name            | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> setting         | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> unit            | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> category        | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> short_desc      | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> extra_desc      | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> context         | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> vartype         | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> source          | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> min_val         | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> max_val         | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> enumvals        | text[]  |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> boot_val        | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> reset_val       | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> sourcefile      | text    |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> sourceline      | integer |          |        | </span></span>
<span class="line"><span style="color:#e1e4e8;"> pending_restart | boolean |          |        |</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #查看位置</span></span>
<span class="line"><span style="color:#e1e4e8;"> postgres=# select name,setting from pg_settings where name like &#39;log%&#39; ;</span></span>
<span class="line"><span style="color:#e1e4e8;">            name             |                    setting                     </span></span>
<span class="line"><span style="color:#e1e4e8;">-----------------------------+------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_autovacuum_min_duration | 1</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_checkpoints             | on</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_connections             | on</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_destination             | csvlog</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_directory               | log</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_disconnections          | on</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_duration                | on</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_error_verbosity         | default</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_executor_stats          | off</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_file_mode               | 0600</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_filename                | postgresql-%Y-%m-%d_%H%.log</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_hostname                | off</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_line_prefix             | %t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_lock_waits              | on</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_min_duration_statement  | 30000</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_min_error_statement     | error</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_min_messages            | warning</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_parser_stats            | off</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_planner_stats           | off</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_replication_commands    | off</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_rotation_age            | 1440</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_rotation_size           | 10240</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_statement               | ddl</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_statement_stats         | off</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_temp_files              | 1</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_timezone                | PRC</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_transaction_sample_rate | 0</span></span>
<span class="line"><span style="color:#e1e4e8;"> log_truncate_on_rotation    | on</span></span>
<span class="line"><span style="color:#e1e4e8;"> logging_collector           | on</span></span>
<span class="line"><span style="color:#e1e4e8;">(29 行记录)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">postgres=# \\d pg_settings;</span></span>
<span class="line"><span style="color:#24292e;">            视图 &quot;pg_catalog.pg_settings&quot;</span></span>
<span class="line"><span style="color:#24292e;">      栏位       |  类型   | 校对规则 | 可空的 | 预设 </span></span>
<span class="line"><span style="color:#24292e;">-----------------+---------+----------+--------+------</span></span>
<span class="line"><span style="color:#24292e;"> name            | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> setting         | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> unit            | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> category        | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> short_desc      | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> extra_desc      | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> context         | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> vartype         | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> source          | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> min_val         | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> max_val         | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> enumvals        | text[]  |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> boot_val        | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> reset_val       | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> sourcefile      | text    |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> sourceline      | integer |          |        | </span></span>
<span class="line"><span style="color:#24292e;"> pending_restart | boolean |          |        |</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #查看位置</span></span>
<span class="line"><span style="color:#24292e;"> postgres=# select name,setting from pg_settings where name like &#39;log%&#39; ;</span></span>
<span class="line"><span style="color:#24292e;">            name             |                    setting                     </span></span>
<span class="line"><span style="color:#24292e;">-----------------------------+------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;"> log_autovacuum_min_duration | 1</span></span>
<span class="line"><span style="color:#24292e;"> log_checkpoints             | on</span></span>
<span class="line"><span style="color:#24292e;"> log_connections             | on</span></span>
<span class="line"><span style="color:#24292e;"> log_destination             | csvlog</span></span>
<span class="line"><span style="color:#24292e;"> log_directory               | log</span></span>
<span class="line"><span style="color:#24292e;"> log_disconnections          | on</span></span>
<span class="line"><span style="color:#24292e;"> log_duration                | on</span></span>
<span class="line"><span style="color:#24292e;"> log_error_verbosity         | default</span></span>
<span class="line"><span style="color:#24292e;"> log_executor_stats          | off</span></span>
<span class="line"><span style="color:#24292e;"> log_file_mode               | 0600</span></span>
<span class="line"><span style="color:#24292e;"> log_filename                | postgresql-%Y-%m-%d_%H%.log</span></span>
<span class="line"><span style="color:#24292e;"> log_hostname                | off</span></span>
<span class="line"><span style="color:#24292e;"> log_line_prefix             | %t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h</span></span>
<span class="line"><span style="color:#24292e;"> log_lock_waits              | on</span></span>
<span class="line"><span style="color:#24292e;"> log_min_duration_statement  | 30000</span></span>
<span class="line"><span style="color:#24292e;"> log_min_error_statement     | error</span></span>
<span class="line"><span style="color:#24292e;"> log_min_messages            | warning</span></span>
<span class="line"><span style="color:#24292e;"> log_parser_stats            | off</span></span>
<span class="line"><span style="color:#24292e;"> log_planner_stats           | off</span></span>
<span class="line"><span style="color:#24292e;"> log_replication_commands    | off</span></span>
<span class="line"><span style="color:#24292e;"> log_rotation_age            | 1440</span></span>
<span class="line"><span style="color:#24292e;"> log_rotation_size           | 10240</span></span>
<span class="line"><span style="color:#24292e;"> log_statement               | ddl</span></span>
<span class="line"><span style="color:#24292e;"> log_statement_stats         | off</span></span>
<span class="line"><span style="color:#24292e;"> log_temp_files              | 1</span></span>
<span class="line"><span style="color:#24292e;"> log_timezone                | PRC</span></span>
<span class="line"><span style="color:#24292e;"> log_transaction_sample_rate | 0</span></span>
<span class="line"><span style="color:#24292e;"> log_truncate_on_rotation    | on</span></span>
<span class="line"><span style="color:#24292e;"> logging_collector           | on</span></span>
<span class="line"><span style="color:#24292e;">(29 行记录)</span></span></code></pre></div>`,8),o=[p];function t(c,r,i,_,y,g){return n(),a("div",null,o)}const m=s(l,[["render",t]]);export{d as __pageData,m as default};
