import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. postgres_exporter","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/monitor_project/6-pg.md","filePath":"guide/Linux/Monitor/Prometheus/monitor_project/6-pg.md","lastUpdated":1732459403000}'),p={name:"guide/Linux/Monitor/Prometheus/monitor_project/6-pg.md"},o=l(`<h1 id="_1-postgres-exporter" tabindex="-1">1. postgres_exporter <a class="header-anchor" href="#_1-postgres-exporter" aria-label="Permalink to &quot;1. postgres_exporter&quot;">​</a></h1><p><a href="https://github.com/wrouesnel/postgres_exporter" target="_blank" rel="noreferrer">官当</a></p><h2 id="_1-1-介绍" tabindex="-1">1.1 介绍 <a class="header-anchor" href="#_1-1-介绍" aria-label="Permalink to &quot;1.1 介绍&quot;">​</a></h2><p>Prometheus exporter for PostgreSQL server metrics.</p><p>CI Tested PostgreSQL versions: <code>11</code>, <code>12</code>, <code>13</code>, <code>14</code>, <code>15</code>, <code>16</code></p><h2 id="_1-2-配置pg" tabindex="-1">1.2 配置pg <a class="header-anchor" href="#_1-2-配置pg" aria-label="Permalink to &quot;1.2 配置pg&quot;">​</a></h2><ul><li>创建帐户</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">monitoring</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">PASSWORD</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;hello123456&#39;</span><span style="color:#E1E4E8;">;  #线上修改复杂点</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">USER</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">monitoring</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">WITH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">PASSWORD</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;hello123456&#39;</span><span style="color:#24292E;">;  #线上修改复杂点</span></span></code></pre></div><ul><li>授权</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">GRANT</span><span style="color:#E1E4E8;"> pg_read_all_stats </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> monitoring;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">GRANT</span><span style="color:#24292E;"> pg_read_all_stats </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> monitoring;</span></span></code></pre></div><ul><li>远程访问</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pg_hba.conf</span></span>
<span class="line"><span style="color:#B392F0;">host</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">             </span><span style="color:#9ECBFF;">all</span><span style="color:#E1E4E8;">             </span><span style="color:#79B8FF;">0.0</span><span style="color:#9ECBFF;">.0.0/0</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">password</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#重启服务或者热更新</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pg_hba.conf</span></span>
<span class="line"><span style="color:#6F42C1;">host</span><span style="color:#24292E;">    </span><span style="color:#032F62;">all</span><span style="color:#24292E;">             </span><span style="color:#032F62;">all</span><span style="color:#24292E;">             </span><span style="color:#005CC5;">0.0</span><span style="color:#032F62;">.0.0/0</span><span style="color:#24292E;">            </span><span style="color:#032F62;">password</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#重启服务或者热更新</span></span></code></pre></div><ul><li>pg_stat_statements</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;"> #创建</span></span>
<span class="line"><span style="color:#B392F0;"> psql -h</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost -p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5432</span><span style="color:#9ECBFF;"> -U</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgres -W -c &quot;CREATE EXTENSION pg_stat_statements;&quot;</span></span>
<span class="line"><span style="color:#B392F0;"> </span></span>
<span class="line"><span style="color:#B392F0;"> #查看</span></span>
<span class="line"><span style="color:#B392F0;"> psql -h</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost -p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5432</span><span style="color:#9ECBFF;"> -U</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgres -W -c &quot;select name from pg_available_extensions where name = &#39;pg_stat_statements&#39;;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;"> #创建</span></span>
<span class="line"><span style="color:#6F42C1;"> psql -h</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost -p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5432</span><span style="color:#032F62;"> -U</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgres -W -c &quot;CREATE EXTENSION pg_stat_statements;&quot;</span></span>
<span class="line"><span style="color:#6F42C1;"> </span></span>
<span class="line"><span style="color:#6F42C1;"> #查看</span></span>
<span class="line"><span style="color:#6F42C1;"> psql -h</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost -p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5432</span><span style="color:#032F62;"> -U</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgres -W -c &quot;select name from pg_available_extensions where name = &#39;pg_stat_statements&#39;;&quot;</span></span></code></pre></div><h2 id="_1-3-部署" tabindex="-1">1.3 部署 <a class="header-anchor" href="#_1-3-部署" aria-label="Permalink to &quot;1.3 部署&quot;">​</a></h2><ul><li>下载</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/prometheus-community/postgres_exporter/releases/download/v0.16.0/postgres_exporter-0.16.0.linux-amd64.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/prometheus-community/postgres_exporter/releases/download/v0.16.0/postgres_exporter-0.16.0.linux-amd64.tar.gz</span></span></code></pre></div><ul><li>安装</li></ul><p>由于是二进制包，解压</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-zxvf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgres_exporter-0.16.0.linux-amd64.tar.gz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mv</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">postgres_exporter-0.16.0.linux-amd64</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/postgres_exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-zxvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgres_exporter-0.16.0.linux-amd64.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mv</span><span style="color:#24292E;">  </span><span style="color:#032F62;">postgres_exporter-0.16.0.linux-amd64</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/postgres_exporter</span></span></code></pre></div><ul><li>配置开机启动</li></ul><blockquote><p>queries.yaml 文件没有用到</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /opt/postgres_exporter/.env</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PG_EXPORTER_EXTEND_QUERY_PATH=&quot;/opt/postgres_exporter/queries.yaml&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">DATA_SOURCE_NAME=postgresql://monitoring:hello123456@localhost:5532/postgres?sslmode=disable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /opt/postgres_exporter/.env</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PG_EXPORTER_EXTEND_QUERY_PATH=&quot;/opt/postgres_exporter/queries.yaml&quot;</span></span>
<span class="line"><span style="color:#24292e;">DATA_SOURCE_NAME=postgresql://monitoring:hello123456@localhost:5532/postgres?sslmode=disable</span></span></code></pre></div><ul><li>queries.yaml</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">pg_replication</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;SELECT CASE WHEN NOT pg_is_in_recovery() THEN 0 ELSE GREATEST (0, EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp()))) END AS lag&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">master</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">lag</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Replication lag behind master in seconds&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_postmaster</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;SELECT pg_postmaster_start_time as start_time_seconds from pg_postmaster_start_time()&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">master</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">start_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Time at which postmaster started&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_database</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;SELECT sum(pg_database_size(pg_database.datname)) as size FROM pg_database&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">master</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;DB Size&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_stat_user_tables</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;SELECT</span></span>
<span class="line"><span style="color:#9ECBFF;">     current_database() datname,</span></span>
<span class="line"><span style="color:#9ECBFF;">     schemaname,</span></span>
<span class="line"><span style="color:#9ECBFF;">     relname,</span></span>
<span class="line"><span style="color:#9ECBFF;">     seq_scan,</span></span>
<span class="line"><span style="color:#9ECBFF;">     seq_tup_read,</span></span>
<span class="line"><span style="color:#9ECBFF;">     idx_scan,</span></span>
<span class="line"><span style="color:#9ECBFF;">     idx_tup_fetch,</span></span>
<span class="line"><span style="color:#9ECBFF;">     n_tup_ins,</span></span>
<span class="line"><span style="color:#9ECBFF;">     n_tup_upd,</span></span>
<span class="line"><span style="color:#9ECBFF;">     n_tup_del,</span></span>
<span class="line"><span style="color:#9ECBFF;">     n_tup_hot_upd,</span></span>
<span class="line"><span style="color:#9ECBFF;">     n_live_tup,</span></span>
<span class="line"><span style="color:#9ECBFF;">     n_dead_tup,</span></span>
<span class="line"><span style="color:#9ECBFF;">     n_mod_since_analyze,</span></span>
<span class="line"><span style="color:#9ECBFF;">     COALESCE(last_vacuum, &#39;1970-01-01Z&#39;) as last_vacuum,</span></span>
<span class="line"><span style="color:#9ECBFF;">     COALESCE(last_autovacuum, &#39;1970-01-01Z&#39;) as last_autovacuum,</span></span>
<span class="line"><span style="color:#9ECBFF;">     COALESCE(last_analyze, &#39;1970-01-01Z&#39;) as last_analyze,</span></span>
<span class="line"><span style="color:#9ECBFF;">     COALESCE(last_autoanalyze, &#39;1970-01-01Z&#39;) as last_autoanalyze,</span></span>
<span class="line"><span style="color:#9ECBFF;">     vacuum_count,</span></span>
<span class="line"><span style="color:#9ECBFF;">     autovacuum_count,</span></span>
<span class="line"><span style="color:#9ECBFF;">     analyze_count,</span></span>
<span class="line"><span style="color:#9ECBFF;">     autoanalyze_count</span></span>
<span class="line"><span style="color:#9ECBFF;">   FROM</span></span>
<span class="line"><span style="color:#9ECBFF;">     pg_stat_user_tables&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">datname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of current database&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">schemaname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of the schema that this table is in&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">relname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">seq_scan</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of sequential scans initiated on this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">seq_tup_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of live rows fetched by sequential scans&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">idx_scan</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of index scans initiated on this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">idx_tup_fetch</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of live rows fetched by index scans&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">n_tup_ins</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of rows inserted&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">n_tup_upd</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of rows updated&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">n_tup_del</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of rows deleted&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">n_tup_hot_upd</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of rows HOT updated (i.e., with no separate index update required)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">n_live_tup</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Estimated number of live rows&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">n_dead_tup</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Estimated number of dead rows&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">n_mod_since_analyze</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Estimated number of rows changed since last analyze&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">last_vacuum</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Last time at which this table was manually vacuumed (not counting VACUUM FULL)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">last_autovacuum</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Last time at which this table was vacuumed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">last_analyze</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Last time at which this table was manually analyzed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">last_autoanalyze</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Last time at which this table was analyzed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">vacuum_count</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of times this table has been manually vacuumed (not counting VACUUM FULL)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">autovacuum_count</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of times this table has been vacuumed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">analyze_count</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of times this table has been manually analyzed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">autoanalyze_count</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of times this table has been analyzed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_statio_user_tables</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;SELECT current_database() datname, schemaname, relname, heap_blks_read, heap_blks_hit, idx_blks_read, idx_blks_hit, toast_blks_read, toast_blks_hit, tidx_blks_read, tidx_blks_hit FROM pg_statio_user_tables&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">datname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of current database&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">schemaname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of the schema that this table is in&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">relname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">heap_blks_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of disk blocks read from this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">heap_blks_hit</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of buffer hits in this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">idx_blks_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of disk blocks read from all indexes on this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">idx_blks_hit</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of buffer hits in all indexes on this table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">toast_blks_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of disk blocks read from this table&#39;s TOAST table (if any)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">toast_blks_hit</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of buffer hits in this table&#39;s TOAST table (if any)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">tidx_blks_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of disk blocks read from this table&#39;s TOAST table indexes (if any)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">tidx_blks_hit</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of buffer hits in this table&#39;s TOAST table indexes (if any)&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_stat_statements</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;select</span></span>
<span class="line"><span style="color:#9ECBFF;">      t2.rolname,</span></span>
<span class="line"><span style="color:#9ECBFF;">      t3.datname,</span></span>
<span class="line"><span style="color:#9ECBFF;">      queryid,</span></span>
<span class="line"><span style="color:#9ECBFF;">      calls,</span></span>
<span class="line"><span style="color:#9ECBFF;">      (total_plan_time + total_exec_time) / 1000 as total_time_seconds,</span></span>
<span class="line"><span style="color:#9ECBFF;">      (min_plan_time + min_exec_time) / 1000 as min_time_seconds,</span></span>
<span class="line"><span style="color:#9ECBFF;">      (max_plan_time + max_exec_time) / 1000 as max_time_seconds,</span></span>
<span class="line"><span style="color:#9ECBFF;">      (mean_plan_time + mean_exec_time) / 1000 as mean_time_seconds,</span></span>
<span class="line"><span style="color:#9ECBFF;">      (stddev_plan_time + stddev_exec_time) / 1000 as stddev_time_seconds,</span></span>
<span class="line"><span style="color:#9ECBFF;">      rows,</span></span>
<span class="line"><span style="color:#9ECBFF;">      shared_blks_hit,</span></span>
<span class="line"><span style="color:#9ECBFF;">      shared_blks_read,</span></span>
<span class="line"><span style="color:#9ECBFF;">      shared_blks_dirtied,</span></span>
<span class="line"><span style="color:#9ECBFF;">      shared_blks_written,</span></span>
<span class="line"><span style="color:#9ECBFF;">      local_blks_hit,</span></span>
<span class="line"><span style="color:#9ECBFF;">      local_blks_read,</span></span>
<span class="line"><span style="color:#9ECBFF;">      local_blks_dirtied,</span></span>
<span class="line"><span style="color:#9ECBFF;">      local_blks_written,</span></span>
<span class="line"><span style="color:#9ECBFF;">      temp_blks_read,</span></span>
<span class="line"><span style="color:#9ECBFF;">      temp_blks_written,</span></span>
<span class="line"><span style="color:#9ECBFF;">      blk_read_time / 1000 as blk_read_time_seconds,</span></span>
<span class="line"><span style="color:#9ECBFF;">      blk_write_time / 1000 as blk_write_time_seconds</span></span>
<span class="line"><span style="color:#9ECBFF;">from</span></span>
<span class="line"><span style="color:#9ECBFF;">      pg_stat_statements t1</span></span>
<span class="line"><span style="color:#9ECBFF;">join pg_roles t2 on</span></span>
<span class="line"><span style="color:#9ECBFF;">      (t1.userid = t2.oid)</span></span>
<span class="line"><span style="color:#9ECBFF;">join pg_database t3 on</span></span>
<span class="line"><span style="color:#9ECBFF;">      (t1.dbid = t3.oid)</span></span>
<span class="line"><span style="color:#9ECBFF;">where</span></span>
<span class="line"><span style="color:#9ECBFF;">      t2.rolname != &#39;rdsadmin&#39;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">master</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">rolname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of user&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">datname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of database&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">queryid</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Query ID&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">calls</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Number of times executed&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">total_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">min_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Minimum time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">max_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Maximum time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">mean_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Mean time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">stddev_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Population standard deviation of time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">rows</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of rows retrieved or affected by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">shared_blks_hit</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of shared block cache hits by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">shared_blks_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of shared blocks read by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">shared_blks_dirtied</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of shared blocks dirtied by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">shared_blks_written</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of shared blocks written by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">local_blks_hit</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of local block cache hits by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">local_blks_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of local blocks read by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">local_blks_dirtied</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of local blocks dirtied by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">local_blks_written</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of local blocks written by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">temp_blks_read</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of temp blocks read by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">temp_blks_written</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total number of temp blocks written by the statement&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">blk_read_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total time the statement spent reading blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">blk_write_time_seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Total time the statement spent writing blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_process_idle</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    WITH</span></span>
<span class="line"><span style="color:#9ECBFF;">      metrics AS (</span></span>
<span class="line"><span style="color:#9ECBFF;">        SELECT</span></span>
<span class="line"><span style="color:#9ECBFF;">          application_name,</span></span>
<span class="line"><span style="color:#9ECBFF;">          SUM(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - state_change))::bigint)::float AS process_idle_seconds_sum,</span></span>
<span class="line"><span style="color:#9ECBFF;">          COUNT(*) AS process_idle_seconds_count</span></span>
<span class="line"><span style="color:#9ECBFF;">        FROM pg_stat_activity</span></span>
<span class="line"><span style="color:#9ECBFF;">        WHERE state = &#39;idle&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        GROUP BY application_name</span></span>
<span class="line"><span style="color:#9ECBFF;">      ),</span></span>
<span class="line"><span style="color:#9ECBFF;">      buckets AS (</span></span>
<span class="line"><span style="color:#9ECBFF;">        SELECT</span></span>
<span class="line"><span style="color:#9ECBFF;">          application_name,</span></span>
<span class="line"><span style="color:#9ECBFF;">          le,</span></span>
<span class="line"><span style="color:#9ECBFF;">          SUM(</span></span>
<span class="line"><span style="color:#9ECBFF;">            CASE WHEN EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - state_change)) &lt;= le</span></span>
<span class="line"><span style="color:#9ECBFF;">              THEN 1</span></span>
<span class="line"><span style="color:#9ECBFF;">              ELSE 0</span></span>
<span class="line"><span style="color:#9ECBFF;">            END</span></span>
<span class="line"><span style="color:#9ECBFF;">          )::bigint AS bucket</span></span>
<span class="line"><span style="color:#9ECBFF;">        FROM</span></span>
<span class="line"><span style="color:#9ECBFF;">          pg_stat_activity,</span></span>
<span class="line"><span style="color:#9ECBFF;">          UNNEST(ARRAY[1, 2, 5, 15, 30, 60, 90, 120, 300]) AS le</span></span>
<span class="line"><span style="color:#9ECBFF;">        GROUP BY application_name, le</span></span>
<span class="line"><span style="color:#9ECBFF;">        ORDER BY application_name, le</span></span>
<span class="line"><span style="color:#9ECBFF;">      )</span></span>
<span class="line"><span style="color:#9ECBFF;">    SELECT</span></span>
<span class="line"><span style="color:#9ECBFF;">      application_name,</span></span>
<span class="line"><span style="color:#9ECBFF;">      process_idle_seconds_sum as seconds_sum,</span></span>
<span class="line"><span style="color:#9ECBFF;">      process_idle_seconds_count as seconds_count,</span></span>
<span class="line"><span style="color:#9ECBFF;">      ARRAY_AGG(le) AS seconds,</span></span>
<span class="line"><span style="color:#9ECBFF;">      ARRAY_AGG(bucket) AS seconds_bucket</span></span>
<span class="line"><span style="color:#9ECBFF;">    FROM metrics JOIN buckets USING (application_name)</span></span>
<span class="line"><span style="color:#9ECBFF;">    GROUP BY 1, 2, 3</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">application_name</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Application Name&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">seconds</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;HISTOGRAM&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Idle time of server processes&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_active_lockedsql</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    select case  when replace(replace(pg_blocking_pids(pid)::text,&#39;{&#39;,&#39;&#39;),&#39;}&#39;,&#39;&#39;)=&#39;&#39; then &#39;numsofnopidblock&#39;  else &#39;numsofsomepidblock&#39; end  pidblock,</span></span>
<span class="line"><span style="color:#9ECBFF;">    count(1) pidnums from pg_stat_activity </span></span>
<span class="line"><span style="color:#9ECBFF;">    where state not in(&#39;idle&#39;) and query !=&#39;&#39;  group by pidblock order by pidblock;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">pidblock</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Possible values:numsofnopidblock--The processes that are not locked; numsofsomepidblock--The processes locked by some &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">pidnums</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;The number of processes&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_active_slowsql</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    select datname,usename,count(1) slowsql_count          </span></span>
<span class="line"><span style="color:#9ECBFF;">    from pg_stat_activity where state not in(&#39;idle&#39;) and query !=&#39;&#39; </span></span>
<span class="line"><span style="color:#9ECBFF;">    and extract(epoch from (now() - query_start)) &gt; 60*5 group by datname,usename order by count(1) desc;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">datname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of database&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">usename</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of user&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">slowsql_count</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;the numbers of slow sqls&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_never_used_indexes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    select pi.schemaname, pi.relname, pi.indexrelname, </span></span>
<span class="line"><span style="color:#9ECBFF;">    pg_table_size(pi.indexrelid) as index_size from pg_indexes pis join </span></span>
<span class="line"><span style="color:#9ECBFF;">    pg_stat_user_indexes pi on pis.schemaname = pi.schemaname </span></span>
<span class="line"><span style="color:#9ECBFF;">    and pis.tablename = pi.relname and pis.indexname = pi.indexrelname </span></span>
<span class="line"><span style="color:#9ECBFF;">    left join pg_constraint pco on pco.conname = pi.indexrelname </span></span>
<span class="line"><span style="color:#9ECBFF;">    and pco.conrelid = pi.relid where pco.contype is distinct from &#39;p&#39; </span></span>
<span class="line"><span style="color:#9ECBFF;">    and pco.contype is distinct from &#39;u&#39; and (idx_scan,idx_tup_read,idx_tup_fetch) = (0,0,0) </span></span>
<span class="line"><span style="color:#9ECBFF;">    and pis.indexdef !~ &#39; UNIQUE INDEX &#39; and pi.relname !~ &#39;backup$&#39; </span></span>
<span class="line"><span style="color:#9ECBFF;">    order by pg_table_size(indexrelid) desc;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">schemaname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Schema of table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">relname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">indexrelname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of index&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">index_size</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Size of index&quot;</span></span>
<span class="line"><span style="color:#85E89D;">pg_tablelocktops</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">query</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    select  db.datname,relname tbname,mode locktype,count(1) locknums</span></span>
<span class="line"><span style="color:#9ECBFF;">    from pg_database db join pg_locks lk on db.oid=lk.database </span></span>
<span class="line"><span style="color:#9ECBFF;">    join pg_class cl on lk.relation=cl.oid </span></span>
<span class="line"><span style="color:#9ECBFF;">    join pg_stat_activity act on lk.pid=act.pid </span></span>
<span class="line"><span style="color:#9ECBFF;">    where db.datname not in (&#39;template0&#39;,&#39;template1&#39;) and fastpath=&#39;t&#39; </span></span>
<span class="line"><span style="color:#9ECBFF;">    and cl.oid not in (select oid from pg_class where relname in (&#39;pg_class&#39;,&#39;pg_locks&#39;))</span></span>
<span class="line"><span style="color:#9ECBFF;">    and act.pid  &lt;&gt;pg_backend_pid() and cl.reltablespace in (select oid from pg_tablespace) </span></span>
<span class="line"><span style="color:#9ECBFF;">    group by db.datname,relname,mode order by count(1) desc limit 10; </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">datname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;database of table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">tbname</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Name of table&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">locktype</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;type of lock&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">locknums</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">usage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;the numbers of this lock&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">pg_replication</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;SELECT CASE WHEN NOT pg_is_in_recovery() THEN 0 ELSE GREATEST (0, EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp()))) END AS lag&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">master</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">lag</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Replication lag behind master in seconds&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_postmaster</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;SELECT pg_postmaster_start_time as start_time_seconds from pg_postmaster_start_time()&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">master</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">start_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Time at which postmaster started&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_database</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;SELECT sum(pg_database_size(pg_database.datname)) as size FROM pg_database&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">master</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">size</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;DB Size&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_stat_user_tables</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;SELECT</span></span>
<span class="line"><span style="color:#032F62;">     current_database() datname,</span></span>
<span class="line"><span style="color:#032F62;">     schemaname,</span></span>
<span class="line"><span style="color:#032F62;">     relname,</span></span>
<span class="line"><span style="color:#032F62;">     seq_scan,</span></span>
<span class="line"><span style="color:#032F62;">     seq_tup_read,</span></span>
<span class="line"><span style="color:#032F62;">     idx_scan,</span></span>
<span class="line"><span style="color:#032F62;">     idx_tup_fetch,</span></span>
<span class="line"><span style="color:#032F62;">     n_tup_ins,</span></span>
<span class="line"><span style="color:#032F62;">     n_tup_upd,</span></span>
<span class="line"><span style="color:#032F62;">     n_tup_del,</span></span>
<span class="line"><span style="color:#032F62;">     n_tup_hot_upd,</span></span>
<span class="line"><span style="color:#032F62;">     n_live_tup,</span></span>
<span class="line"><span style="color:#032F62;">     n_dead_tup,</span></span>
<span class="line"><span style="color:#032F62;">     n_mod_since_analyze,</span></span>
<span class="line"><span style="color:#032F62;">     COALESCE(last_vacuum, &#39;1970-01-01Z&#39;) as last_vacuum,</span></span>
<span class="line"><span style="color:#032F62;">     COALESCE(last_autovacuum, &#39;1970-01-01Z&#39;) as last_autovacuum,</span></span>
<span class="line"><span style="color:#032F62;">     COALESCE(last_analyze, &#39;1970-01-01Z&#39;) as last_analyze,</span></span>
<span class="line"><span style="color:#032F62;">     COALESCE(last_autoanalyze, &#39;1970-01-01Z&#39;) as last_autoanalyze,</span></span>
<span class="line"><span style="color:#032F62;">     vacuum_count,</span></span>
<span class="line"><span style="color:#032F62;">     autovacuum_count,</span></span>
<span class="line"><span style="color:#032F62;">     analyze_count,</span></span>
<span class="line"><span style="color:#032F62;">     autoanalyze_count</span></span>
<span class="line"><span style="color:#032F62;">   FROM</span></span>
<span class="line"><span style="color:#032F62;">     pg_stat_user_tables&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">datname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of current database&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">schemaname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of the schema that this table is in&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">relname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">seq_scan</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of sequential scans initiated on this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">seq_tup_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of live rows fetched by sequential scans&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">idx_scan</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of index scans initiated on this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">idx_tup_fetch</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of live rows fetched by index scans&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">n_tup_ins</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of rows inserted&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">n_tup_upd</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of rows updated&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">n_tup_del</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of rows deleted&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">n_tup_hot_upd</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of rows HOT updated (i.e., with no separate index update required)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">n_live_tup</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Estimated number of live rows&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">n_dead_tup</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Estimated number of dead rows&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">n_mod_since_analyze</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Estimated number of rows changed since last analyze&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">last_vacuum</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Last time at which this table was manually vacuumed (not counting VACUUM FULL)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">last_autovacuum</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Last time at which this table was vacuumed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">last_analyze</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Last time at which this table was manually analyzed&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">last_autoanalyze</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Last time at which this table was analyzed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">vacuum_count</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of times this table has been manually vacuumed (not counting VACUUM FULL)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">autovacuum_count</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of times this table has been vacuumed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">analyze_count</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of times this table has been manually analyzed&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">autoanalyze_count</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of times this table has been analyzed by the autovacuum daemon&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_statio_user_tables</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;SELECT current_database() datname, schemaname, relname, heap_blks_read, heap_blks_hit, idx_blks_read, idx_blks_hit, toast_blks_read, toast_blks_hit, tidx_blks_read, tidx_blks_hit FROM pg_statio_user_tables&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">datname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of current database&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">schemaname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of the schema that this table is in&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">relname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">heap_blks_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of disk blocks read from this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">heap_blks_hit</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of buffer hits in this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">idx_blks_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of disk blocks read from all indexes on this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">idx_blks_hit</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of buffer hits in all indexes on this table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">toast_blks_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of disk blocks read from this table&#39;s TOAST table (if any)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">toast_blks_hit</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of buffer hits in this table&#39;s TOAST table (if any)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">tidx_blks_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of disk blocks read from this table&#39;s TOAST table indexes (if any)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">tidx_blks_hit</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of buffer hits in this table&#39;s TOAST table indexes (if any)&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_stat_statements</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;select</span></span>
<span class="line"><span style="color:#032F62;">      t2.rolname,</span></span>
<span class="line"><span style="color:#032F62;">      t3.datname,</span></span>
<span class="line"><span style="color:#032F62;">      queryid,</span></span>
<span class="line"><span style="color:#032F62;">      calls,</span></span>
<span class="line"><span style="color:#032F62;">      (total_plan_time + total_exec_time) / 1000 as total_time_seconds,</span></span>
<span class="line"><span style="color:#032F62;">      (min_plan_time + min_exec_time) / 1000 as min_time_seconds,</span></span>
<span class="line"><span style="color:#032F62;">      (max_plan_time + max_exec_time) / 1000 as max_time_seconds,</span></span>
<span class="line"><span style="color:#032F62;">      (mean_plan_time + mean_exec_time) / 1000 as mean_time_seconds,</span></span>
<span class="line"><span style="color:#032F62;">      (stddev_plan_time + stddev_exec_time) / 1000 as stddev_time_seconds,</span></span>
<span class="line"><span style="color:#032F62;">      rows,</span></span>
<span class="line"><span style="color:#032F62;">      shared_blks_hit,</span></span>
<span class="line"><span style="color:#032F62;">      shared_blks_read,</span></span>
<span class="line"><span style="color:#032F62;">      shared_blks_dirtied,</span></span>
<span class="line"><span style="color:#032F62;">      shared_blks_written,</span></span>
<span class="line"><span style="color:#032F62;">      local_blks_hit,</span></span>
<span class="line"><span style="color:#032F62;">      local_blks_read,</span></span>
<span class="line"><span style="color:#032F62;">      local_blks_dirtied,</span></span>
<span class="line"><span style="color:#032F62;">      local_blks_written,</span></span>
<span class="line"><span style="color:#032F62;">      temp_blks_read,</span></span>
<span class="line"><span style="color:#032F62;">      temp_blks_written,</span></span>
<span class="line"><span style="color:#032F62;">      blk_read_time / 1000 as blk_read_time_seconds,</span></span>
<span class="line"><span style="color:#032F62;">      blk_write_time / 1000 as blk_write_time_seconds</span></span>
<span class="line"><span style="color:#032F62;">from</span></span>
<span class="line"><span style="color:#032F62;">      pg_stat_statements t1</span></span>
<span class="line"><span style="color:#032F62;">join pg_roles t2 on</span></span>
<span class="line"><span style="color:#032F62;">      (t1.userid = t2.oid)</span></span>
<span class="line"><span style="color:#032F62;">join pg_database t3 on</span></span>
<span class="line"><span style="color:#032F62;">      (t1.dbid = t3.oid)</span></span>
<span class="line"><span style="color:#032F62;">where</span></span>
<span class="line"><span style="color:#032F62;">      t2.rolname != &#39;rdsadmin&#39;&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">master</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">rolname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of user&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">datname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of database&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">queryid</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Query ID&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">calls</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Number of times executed&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">total_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">min_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Minimum time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">max_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Maximum time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">mean_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Mean time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">stddev_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Population standard deviation of time spent in the statement, in milliseconds&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">rows</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of rows retrieved or affected by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">shared_blks_hit</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of shared block cache hits by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">shared_blks_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of shared blocks read by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">shared_blks_dirtied</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of shared blocks dirtied by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">shared_blks_written</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of shared blocks written by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">local_blks_hit</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of local block cache hits by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">local_blks_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of local blocks read by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">local_blks_dirtied</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of local blocks dirtied by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">local_blks_written</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of local blocks written by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">temp_blks_read</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of temp blocks read by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">temp_blks_written</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total number of temp blocks written by the statement&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">blk_read_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total time the statement spent reading blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">blk_write_time_seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Total time the statement spent writing blocks, in milliseconds (if track_io_timing is enabled, otherwise zero)&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_process_idle</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    WITH</span></span>
<span class="line"><span style="color:#032F62;">      metrics AS (</span></span>
<span class="line"><span style="color:#032F62;">        SELECT</span></span>
<span class="line"><span style="color:#032F62;">          application_name,</span></span>
<span class="line"><span style="color:#032F62;">          SUM(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - state_change))::bigint)::float AS process_idle_seconds_sum,</span></span>
<span class="line"><span style="color:#032F62;">          COUNT(*) AS process_idle_seconds_count</span></span>
<span class="line"><span style="color:#032F62;">        FROM pg_stat_activity</span></span>
<span class="line"><span style="color:#032F62;">        WHERE state = &#39;idle&#39;</span></span>
<span class="line"><span style="color:#032F62;">        GROUP BY application_name</span></span>
<span class="line"><span style="color:#032F62;">      ),</span></span>
<span class="line"><span style="color:#032F62;">      buckets AS (</span></span>
<span class="line"><span style="color:#032F62;">        SELECT</span></span>
<span class="line"><span style="color:#032F62;">          application_name,</span></span>
<span class="line"><span style="color:#032F62;">          le,</span></span>
<span class="line"><span style="color:#032F62;">          SUM(</span></span>
<span class="line"><span style="color:#032F62;">            CASE WHEN EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - state_change)) &lt;= le</span></span>
<span class="line"><span style="color:#032F62;">              THEN 1</span></span>
<span class="line"><span style="color:#032F62;">              ELSE 0</span></span>
<span class="line"><span style="color:#032F62;">            END</span></span>
<span class="line"><span style="color:#032F62;">          )::bigint AS bucket</span></span>
<span class="line"><span style="color:#032F62;">        FROM</span></span>
<span class="line"><span style="color:#032F62;">          pg_stat_activity,</span></span>
<span class="line"><span style="color:#032F62;">          UNNEST(ARRAY[1, 2, 5, 15, 30, 60, 90, 120, 300]) AS le</span></span>
<span class="line"><span style="color:#032F62;">        GROUP BY application_name, le</span></span>
<span class="line"><span style="color:#032F62;">        ORDER BY application_name, le</span></span>
<span class="line"><span style="color:#032F62;">      )</span></span>
<span class="line"><span style="color:#032F62;">    SELECT</span></span>
<span class="line"><span style="color:#032F62;">      application_name,</span></span>
<span class="line"><span style="color:#032F62;">      process_idle_seconds_sum as seconds_sum,</span></span>
<span class="line"><span style="color:#032F62;">      process_idle_seconds_count as seconds_count,</span></span>
<span class="line"><span style="color:#032F62;">      ARRAY_AGG(le) AS seconds,</span></span>
<span class="line"><span style="color:#032F62;">      ARRAY_AGG(bucket) AS seconds_bucket</span></span>
<span class="line"><span style="color:#032F62;">    FROM metrics JOIN buckets USING (application_name)</span></span>
<span class="line"><span style="color:#032F62;">    GROUP BY 1, 2, 3</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">application_name</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Application Name&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">seconds</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;HISTOGRAM&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Idle time of server processes&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_active_lockedsql</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    select case  when replace(replace(pg_blocking_pids(pid)::text,&#39;{&#39;,&#39;&#39;),&#39;}&#39;,&#39;&#39;)=&#39;&#39; then &#39;numsofnopidblock&#39;  else &#39;numsofsomepidblock&#39; end  pidblock,</span></span>
<span class="line"><span style="color:#032F62;">    count(1) pidnums from pg_stat_activity </span></span>
<span class="line"><span style="color:#032F62;">    where state not in(&#39;idle&#39;) and query !=&#39;&#39;  group by pidblock order by pidblock;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">pidblock</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Possible values:numsofnopidblock--The processes that are not locked; numsofsomepidblock--The processes locked by some &quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">pidnums</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;The number of processes&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_active_slowsql</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    select datname,usename,count(1) slowsql_count          </span></span>
<span class="line"><span style="color:#032F62;">    from pg_stat_activity where state not in(&#39;idle&#39;) and query !=&#39;&#39; </span></span>
<span class="line"><span style="color:#032F62;">    and extract(epoch from (now() - query_start)) &gt; 60*5 group by datname,usename order by count(1) desc;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">datname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of database&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">usename</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of user&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">slowsql_count</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;the numbers of slow sqls&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_never_used_indexes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    select pi.schemaname, pi.relname, pi.indexrelname, </span></span>
<span class="line"><span style="color:#032F62;">    pg_table_size(pi.indexrelid) as index_size from pg_indexes pis join </span></span>
<span class="line"><span style="color:#032F62;">    pg_stat_user_indexes pi on pis.schemaname = pi.schemaname </span></span>
<span class="line"><span style="color:#032F62;">    and pis.tablename = pi.relname and pis.indexname = pi.indexrelname </span></span>
<span class="line"><span style="color:#032F62;">    left join pg_constraint pco on pco.conname = pi.indexrelname </span></span>
<span class="line"><span style="color:#032F62;">    and pco.conrelid = pi.relid where pco.contype is distinct from &#39;p&#39; </span></span>
<span class="line"><span style="color:#032F62;">    and pco.contype is distinct from &#39;u&#39; and (idx_scan,idx_tup_read,idx_tup_fetch) = (0,0,0) </span></span>
<span class="line"><span style="color:#032F62;">    and pis.indexdef !~ &#39; UNIQUE INDEX &#39; and pi.relname !~ &#39;backup$&#39; </span></span>
<span class="line"><span style="color:#032F62;">    order by pg_table_size(indexrelid) desc;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">schemaname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Schema of table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">relname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">indexrelname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of index&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">index_size</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;GAUGE&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Size of index&quot;</span></span>
<span class="line"><span style="color:#22863A;">pg_tablelocktops</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">query</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    select  db.datname,relname tbname,mode locktype,count(1) locknums</span></span>
<span class="line"><span style="color:#032F62;">    from pg_database db join pg_locks lk on db.oid=lk.database </span></span>
<span class="line"><span style="color:#032F62;">    join pg_class cl on lk.relation=cl.oid </span></span>
<span class="line"><span style="color:#032F62;">    join pg_stat_activity act on lk.pid=act.pid </span></span>
<span class="line"><span style="color:#032F62;">    where db.datname not in (&#39;template0&#39;,&#39;template1&#39;) and fastpath=&#39;t&#39; </span></span>
<span class="line"><span style="color:#032F62;">    and cl.oid not in (select oid from pg_class where relname in (&#39;pg_class&#39;,&#39;pg_locks&#39;))</span></span>
<span class="line"><span style="color:#032F62;">    and act.pid  &lt;&gt;pg_backend_pid() and cl.reltablespace in (select oid from pg_tablespace) </span></span>
<span class="line"><span style="color:#032F62;">    group by db.datname,relname,mode order by count(1) desc limit 10; </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">datname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;database of table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">tbname</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Name of table&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">locktype</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;LABEL&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;type of lock&quot;</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">locknums</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">usage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;COUNTER&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;the numbers of this lock&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/systemd/system/postgres_exporter.service</span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Prometheus exporter for Postgresql</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">User=ptgres</span></span>
<span class="line"><span style="color:#9ECBFF;">Group=ptgres</span></span>
<span class="line"><span style="color:#9ECBFF;">WorkingDirectory=/opt/postgres_exporter</span></span>
<span class="line"><span style="color:#9ECBFF;">EnvironmentFile=/opt/postgres_exporter/.env</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/opt/postgres_exporter/postgres_exporter --web.listen-address=:9187 --collector.stat_statements --web.telemetry-path=/metrics</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStop=/bin/kill -s SIGTERM </span><span style="color:#E1E4E8;">$MAINPID</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/systemd/system/postgres_exporter.service</span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Prometheus exporter for Postgresql</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#032F62;">After=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">User=ptgres</span></span>
<span class="line"><span style="color:#032F62;">Group=ptgres</span></span>
<span class="line"><span style="color:#032F62;">WorkingDirectory=/opt/postgres_exporter</span></span>
<span class="line"><span style="color:#032F62;">EnvironmentFile=/opt/postgres_exporter/.env</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/opt/postgres_exporter/postgres_exporter --web.listen-address=:9187 --collector.stat_statements --web.telemetry-path=/metrics</span></span>
<span class="line"><span style="color:#032F62;">ExecStop=/bin/kill -s SIGTERM </span><span style="color:#24292E;">$MAINPID</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kubeadm-master01 postgres_exporter]# cat .env</span></span>
<span class="line"><span style="color:#E1E4E8;">PG_EXPORTER_EXTEND_QUERY_PATH</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/opt/postgres_exporter/queries.yaml&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">DATA_SOURCE_NAME</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">postgresql://monitoring:hello123456@localhost:5532/postgres?sslmode=disable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kubeadm-master01 postgres_exporter]# cat .env</span></span>
<span class="line"><span style="color:#24292E;">PG_EXPORTER_EXTEND_QUERY_PATH</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/opt/postgres_exporter/queries.yaml&quot;</span></span>
<span class="line"><span style="color:#24292E;">DATA_SOURCE_NAME</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">postgresql://monitoring:hello123456@localhost:5532/postgres?sslmode=disable</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgres_exporter</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">postgres_exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgres_exporter</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">postgres_exporter</span></span></code></pre></div><ul><li>访问</li></ul><p><a href="http://ip:9187/metrics" target="_blank" rel="noreferrer">http://ip:9187/metrics</a></p><h2 id="_1-4-prometheus采集" tabindex="-1">1.4 Prometheus采集 <a class="header-anchor" href="#_1-4-prometheus采集" aria-label="Permalink to &quot;1.4 Prometheus采集&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">###################### postgres_exporter ######################</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;postgres_exporter&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;ip:9187&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">###################### postgres_exporter ######################</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;postgres_exporter&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;ip:9187&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><ul><li>热更新</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;">  </span><span style="color:#032F62;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre></div><h3 id="_1-报警规则" tabindex="-1">1.报警规则 <a class="header-anchor" href="#_1-报警规则" aria-label="Permalink to &quot;1.报警规则&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">postgres.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &quot;postgres.rules&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgres_InstanceDown</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: pg_up == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgres server instance is down&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Postgres has not been responding for the past 1 minutes on {{ $labels.instance }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_Restarted</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: time() - pg_postmaster_start_time_seconds &lt; 60</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql restarted (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Postgresql restarted\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_ExporterError</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: pg_exporter_last_scrape_error &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql exporter error (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Postgresql exporter is showing errors. A query may be buggy in query.yaml\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_ReplicationLag</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (pg_replication_lag) &gt; 10 and ON(instance) (pg_replication_is_replica == 1)</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql replication lag (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;PostgreSQL replication lag is going up (&gt; 10s)\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_TooManyConnections</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by (datname) (pg_stat_activity_count{datname!~&quot;template.*|postgres&quot;}) &gt; pg_settings_max_connections * 0.9</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql too many connections (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;PostgreSQL instance has too many connections\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_NotEnoughConnections</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: sum by (datname) (pg_stat_activity_count{datname!~&quot;template.*|postgres&quot;}) &lt; 5</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql not enough connections (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;PostgreSQL instance should have more connections (&gt; 5)\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_DeadLocks</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: rate(pg_stat_database_deadlocks{datname!~&quot;template.*|postgres&quot;}[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql dead locks (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;PostgreSQL has dead-locks\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_HighRollbackRate</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          rate(pg_stat_database_xact_rollback{datname!~&quot;template.*&quot;}[3m]) / rate(pg_stat_database_xact_commit{datname!~&quot;template.*&quot;}[3m]) &gt; 0.02</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql high rollback rate (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Ratio of transactions being aborted compared to committed is &gt; 2 %\\n  VALUE = {{ $value }}\\nLABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_CommitRateLow</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: rate(pg_stat_database_xact_commit[1m]) &lt; 10</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql commit rate low (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Postgres seems to be processing very few transactions\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_TooManyLocksAcquired</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: ((sum (pg_locks_count)) / (pg_settings_max_locks_per_transaction * pg_settings_max_connections)) &gt; 0.20</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Postgresql too many locks acquired (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Too many locks acquired on the database. If this alert happens frequently, we may need to increase the postgres setting max_locks_per_transaction.\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Postgresql_ConfigurationChanged</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          {__name__=~&quot;pg_settings_.*&quot;} != ON(__name__) {__name__=~&quot;pg_settings_([^t]|t[^r]|tr[^a]|tra[^n]|tran[^s]|trans[^a]|transa[^c]|transac[^t]|transact[^i]|transacti[^o]|transactio[^n]|transaction[^_]|transaction_[^r]|transaction_r[^e]|transaction_re[^a]|transaction_rea[^d]|transaction_read[^_]|transaction_read_[^o]|transaction_read_o[^n]|transaction_read_on[^l]|transaction_read_onl[^y]).*&quot;} OFFSET 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 0m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: info</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Postgresql configuration changed (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Postgres Database configuration change has occurred\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PostgreSQL_SlowQueries</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |-</span></span>
<span class="line"><span style="color:#9ECBFF;">          avg by (datname) (</span></span>
<span class="line"><span style="color:#9ECBFF;">            rate (</span></span>
<span class="line"><span style="color:#9ECBFF;">              pg_stat_activity_max_tx_duration{datname!~&quot;template.*&quot;}[2m]</span></span>
<span class="line"><span style="color:#9ECBFF;">            )</span></span>
<span class="line"><span style="color:#9ECBFF;">          ) &gt; 2 * 60</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;PostgreSQL high number of slow queries for database: {{ \`{{ $labels.datname }}\` }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;PostgreSQL high number of slow queries for database {{ \`{{ $labels.datname }}\` }} with a value of {{ \`{{ $value }}\` }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PostgreSQL_QPS</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |-</span></span>
<span class="line"><span style="color:#9ECBFF;">          avg by (datname) (</span></span>
<span class="line"><span style="color:#9ECBFF;">            irate(</span></span>
<span class="line"><span style="color:#9ECBFF;">              pg_stat_database_xact_commit{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#9ECBFF;">            )</span></span>
<span class="line"><span style="color:#9ECBFF;">            +</span></span>
<span class="line"><span style="color:#9ECBFF;">            irate(</span></span>
<span class="line"><span style="color:#9ECBFF;">              pg_stat_database_xact_rollback{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#9ECBFF;">            )</span></span>
<span class="line"><span style="color:#9ECBFF;">          ) &gt; 10000</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;PostgreSQL high number of queries per second for database {{ \`{{ $labels.datname }}\` }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;PostgreSQL high number of queries per second  for database {{ \`{{ $labels.datname }}\` }} witha value of {{ \`{{ $value }}\` }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PostgreSQL_CacheHitRatio</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |-</span></span>
<span class="line"><span style="color:#9ECBFF;">          avg by (datname) (</span></span>
<span class="line"><span style="color:#9ECBFF;">            rate(pg_stat_database_blks_hit{datname!~&quot;template.*&quot;}[5m])</span></span>
<span class="line"><span style="color:#9ECBFF;">            /</span></span>
<span class="line"><span style="color:#9ECBFF;">            (</span></span>
<span class="line"><span style="color:#9ECBFF;">              rate(</span></span>
<span class="line"><span style="color:#9ECBFF;">                 pg_stat_database_blks_hit{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#9ECBFF;">              )</span></span>
<span class="line"><span style="color:#9ECBFF;">              +</span></span>
<span class="line"><span style="color:#9ECBFF;">              rate(</span></span>
<span class="line"><span style="color:#9ECBFF;">                 pg_stat_database_blks_read{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#9ECBFF;">              )</span></span>
<span class="line"><span style="color:#9ECBFF;">            )</span></span>
<span class="line"><span style="color:#9ECBFF;">          ) &lt; 0.98</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;PostgreSQL low cache hit rate for database {{\`{{ $labels.datname }}\`}}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;PostgreSQL low on cache hit rate for database {{\`{{ $labels.datname }}\`}} with a value of {{\`{{ $value }}\`}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">############## postgresql_rules ###########</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">postgres.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &quot;postgres.rules&quot;</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgres_InstanceDown</span></span>
<span class="line"><span style="color:#032F62;">        expr: pg_up == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgres server instance is down&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Postgres has not been responding for the past 1 minutes on {{ $labels.instance }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_Restarted</span></span>
<span class="line"><span style="color:#032F62;">        expr: time() - pg_postmaster_start_time_seconds &lt; 60</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql restarted (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Postgresql restarted\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_ExporterError</span></span>
<span class="line"><span style="color:#032F62;">        expr: pg_exporter_last_scrape_error &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql exporter error (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Postgresql exporter is showing errors. A query may be buggy in query.yaml\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_ReplicationLag</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (pg_replication_lag) &gt; 10 and ON(instance) (pg_replication_is_replica == 1)</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql replication lag (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;PostgreSQL replication lag is going up (&gt; 10s)\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_TooManyConnections</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by (datname) (pg_stat_activity_count{datname!~&quot;template.*|postgres&quot;}) &gt; pg_settings_max_connections * 0.9</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql too many connections (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;PostgreSQL instance has too many connections\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_NotEnoughConnections</span></span>
<span class="line"><span style="color:#032F62;">        expr: sum by (datname) (pg_stat_activity_count{datname!~&quot;template.*|postgres&quot;}) &lt; 5</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql not enough connections (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;PostgreSQL instance should have more connections (&gt; 5)\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_DeadLocks</span></span>
<span class="line"><span style="color:#032F62;">        expr: rate(pg_stat_database_deadlocks{datname!~&quot;template.*|postgres&quot;}[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql dead locks (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;PostgreSQL has dead-locks\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_HighRollbackRate</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          rate(pg_stat_database_xact_rollback{datname!~&quot;template.*&quot;}[3m]) / rate(pg_stat_database_xact_commit{datname!~&quot;template.*&quot;}[3m]) &gt; 0.02</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql high rollback rate (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Ratio of transactions being aborted compared to committed is &gt; 2 %\\n  VALUE = {{ $value }}\\nLABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_CommitRateLow</span></span>
<span class="line"><span style="color:#032F62;">        expr: rate(pg_stat_database_xact_commit[1m]) &lt; 10</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql commit rate low (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Postgres seems to be processing very few transactions\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_TooManyLocksAcquired</span></span>
<span class="line"><span style="color:#032F62;">        expr: ((sum (pg_locks_count)) / (pg_settings_max_locks_per_transaction * pg_settings_max_connections)) &gt; 0.20</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Postgresql too many locks acquired (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Too many locks acquired on the database. If this alert happens frequently, we may need to increase the postgres setting max_locks_per_transaction.\\n  VALUE = {{ $value }}\\n  LABELS: {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Postgresql_ConfigurationChanged</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          {__name__=~&quot;pg_settings_.*&quot;} != ON(__name__) {__name__=~&quot;pg_settings_([^t]|t[^r]|tr[^a]|tra[^n]|tran[^s]|trans[^a]|transa[^c]|transac[^t]|transact[^i]|transacti[^o]|transactio[^n]|transaction[^_]|transaction_[^r]|transaction_r[^e]|transaction_re[^a]|transaction_rea[^d]|transaction_read[^_]|transaction_read_[^o]|transaction_read_o[^n]|transaction_read_on[^l]|transaction_read_onl[^y]).*&quot;} OFFSET 5m</span></span>
<span class="line"><span style="color:#032F62;">        for: 0m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: info</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Postgresql configuration changed (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Postgres Database configuration change has occurred\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PostgreSQL_SlowQueries</span></span>
<span class="line"><span style="color:#032F62;">        expr: |-</span></span>
<span class="line"><span style="color:#032F62;">          avg by (datname) (</span></span>
<span class="line"><span style="color:#032F62;">            rate (</span></span>
<span class="line"><span style="color:#032F62;">              pg_stat_activity_max_tx_duration{datname!~&quot;template.*&quot;}[2m]</span></span>
<span class="line"><span style="color:#032F62;">            )</span></span>
<span class="line"><span style="color:#032F62;">          ) &gt; 2 * 60</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;PostgreSQL high number of slow queries for database: {{ \`{{ $labels.datname }}\` }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;PostgreSQL high number of slow queries for database {{ \`{{ $labels.datname }}\` }} with a value of {{ \`{{ $value }}\` }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PostgreSQL_QPS</span></span>
<span class="line"><span style="color:#032F62;">        expr: |-</span></span>
<span class="line"><span style="color:#032F62;">          avg by (datname) (</span></span>
<span class="line"><span style="color:#032F62;">            irate(</span></span>
<span class="line"><span style="color:#032F62;">              pg_stat_database_xact_commit{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#032F62;">            )</span></span>
<span class="line"><span style="color:#032F62;">            +</span></span>
<span class="line"><span style="color:#032F62;">            irate(</span></span>
<span class="line"><span style="color:#032F62;">              pg_stat_database_xact_rollback{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#032F62;">            )</span></span>
<span class="line"><span style="color:#032F62;">          ) &gt; 10000</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;PostgreSQL high number of queries per second for database {{ \`{{ $labels.datname }}\` }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;PostgreSQL high number of queries per second  for database {{ \`{{ $labels.datname }}\` }} witha value of {{ \`{{ $value }}\` }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PostgreSQL_CacheHitRatio</span></span>
<span class="line"><span style="color:#032F62;">        expr: |-</span></span>
<span class="line"><span style="color:#032F62;">          avg by (datname) (</span></span>
<span class="line"><span style="color:#032F62;">            rate(pg_stat_database_blks_hit{datname!~&quot;template.*&quot;}[5m])</span></span>
<span class="line"><span style="color:#032F62;">            /</span></span>
<span class="line"><span style="color:#032F62;">            (</span></span>
<span class="line"><span style="color:#032F62;">              rate(</span></span>
<span class="line"><span style="color:#032F62;">                 pg_stat_database_blks_hit{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#032F62;">              )</span></span>
<span class="line"><span style="color:#032F62;">              +</span></span>
<span class="line"><span style="color:#032F62;">              rate(</span></span>
<span class="line"><span style="color:#032F62;">                 pg_stat_database_blks_read{datname!~&quot;template.*&quot;}[5m]</span></span>
<span class="line"><span style="color:#032F62;">              )</span></span>
<span class="line"><span style="color:#032F62;">            )</span></span>
<span class="line"><span style="color:#032F62;">          ) &lt; 0.98</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;PostgreSQL low cache hit rate for database {{\`{{ $labels.datname }}\`}}&#39;</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;PostgreSQL low on cache hit rate for database {{\`{{ $labels.datname }}\`}} with a value of {{\`{{ $value }}\`}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">############## postgresql_rules ###########</span></span></code></pre></div><h2 id="_1-5-grafana" tabindex="-1">1.5 grafana <a class="header-anchor" href="#_1-5-grafana" aria-label="Permalink to &quot;1.5 grafana&quot;">​</a></h2><p>默认搜索，<a href="https://grafana.com/grafana/dashboards/" target="_blank" rel="noreferrer">https://grafana.com/grafana/dashboards/</a></p><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202411161557868.png" alt="image-20241116155729720"></p><h2 id="_2-k8s环境" tabindex="-1">2. k8s环境 <a class="header-anchor" href="#_2-k8s环境" aria-label="Permalink to &quot;2. k8s环境&quot;">​</a></h2><ul><li>验证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> curl -s $(kubectl -n kube-system get svc prometheus -ojsonpath=&#39;{.spec.clusterIP}:{.spec.ports[0].port}&#39;)/prometheus/api/v1/query --data-urlencode &#39;query=up{job=&quot;postgres-exporter&quot;}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> curl -s $(kubectl -n kube-system get svc prometheus -ojsonpath=&#39;{.spec.clusterIP}:{.spec.ports[0].port}&#39;)/prometheus/api/v1/query --data-urlencode &#39;query=up{job=&quot;postgres-exporter&quot;}&#39;</span></span></code></pre></div><p>参考：</p><p>alert</p><p><a href="https://sysdig.com/blog/postgresql-monitoring/" target="_blank" rel="noreferrer">https://sysdig.com/blog/postgresql-monitoring/</a></p><p><a href="https://github.com/philyuchkoff/prometheus-alerts/blob/master/databases/postgresql.md" target="_blank" rel="noreferrer">https://github.com/philyuchkoff/prometheus-alerts/blob/master/databases/postgresql.md</a></p><p><a href="https://samber.github.io/awesome-prometheus-alerts/rules.html#postgresql" target="_blank" rel="noreferrer">https://samber.github.io/awesome-prometheus-alerts/rules.html#postgresql</a></p><p>aws</p><p><a href="https://www.perfectscale.io/blog/monitoring-postgresql-with-prometheus-operator" target="_blank" rel="noreferrer">https://www.perfectscale.io/blog/monitoring-postgresql-with-prometheus-operator</a></p>`,50),e=[o];function t(c,r,E,i,y,u){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{d as __pageData,m as default};
