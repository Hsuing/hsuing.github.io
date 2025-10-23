import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. redis_exporter","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/monitor_project/5-redis.md","filePath":"guide/Linux/Monitor/Prometheus/monitor_project/5-redis.md","lastUpdated":1748439132000}'),p={name:"guide/Linux/Monitor/Prometheus/monitor_project/5-redis.md"},e=l(`<h1 id="_1-redis-exporter" tabindex="-1">1. redis_exporter <a class="header-anchor" href="#_1-redis-exporter" aria-label="Permalink to &quot;1. redis_exporter&quot;">​</a></h1><h2 id="_1-1-介绍" tabindex="-1">1.1 介绍 <a class="header-anchor" href="#_1-1-介绍" aria-label="Permalink to &quot;1.1 介绍&quot;">​</a></h2><p>Prometheus exporter for ValKey metrics (Redis-compatible)，and cluster. Supports ValKey and Redis 2.x, 3.x, 4.x, 5.x, 6.x, and 7.x</p><h2 id="_1-2-部署" tabindex="-1">1.2 部署 <a class="header-anchor" href="#_1-2-部署" aria-label="Permalink to &quot;1.2 部署&quot;">​</a></h2><ul><li>下载</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/oliver006/redis_exporter/releases/download/v1.66.0/redis_exporter-v1.66.0.linux-amd64.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/oliver006/redis_exporter/releases/download/v1.66.0/redis_exporter-v1.66.0.linux-amd64.tar.gz</span></span></code></pre></div><ul><li>解压</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/redis_exporter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">zxvf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter-v1.66.0.linux-amd64.tar.gz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--strip-components=1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/redis_exporter/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter-v1.66.0.linux-amd64/redis_exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/redis_exporter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">zxvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter-v1.66.0.linux-amd64.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--strip-components=1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/redis_exporter/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter-v1.66.0.linux-amd64/redis_exporter</span></span></code></pre></div><ul><li>配置systemd</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/lib/systemd/system/redis_exporter.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=redis_exporter</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/oliver006/redis_exporter</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target</span></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">User=root</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/opt/redis_exporter/redis_exporter -redis.addr 10.103.236.200:9379 -redis.password 0f4649985edfdf11ae10a  -web.listen-address :9121</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecReload=/bin/kill -HUP </span><span style="color:#E1E4E8;">$MAINPID</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/lib/systemd/system/redis_exporter.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=redis_exporter</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/oliver006/redis_exporter</span></span>
<span class="line"><span style="color:#032F62;">After=network.target</span></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">User=root</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/opt/redis_exporter/redis_exporter -redis.addr 10.103.236.200:9379 -redis.password 0f4649985edfdf11ae10a  -web.listen-address :9121</span></span>
<span class="line"><span style="color:#032F62;">ExecReload=/bin/kill -HUP </span><span style="color:#24292E;">$MAINPID</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><ul><li>启动</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis_exporter.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis_exporter.service</span></span></code></pre></div><ul><li>访问</li></ul><p><a href="http://ip:9121/metrics" target="_blank" rel="noreferrer">http://ip:9121/metrics</a></p><h2 id="_1-3-配置prometheus采集" tabindex="-1">1.3 配置Prometheus采集 <a class="header-anchor" href="#_1-3-配置prometheus采集" aria-label="Permalink to &quot;1.3 配置Prometheus采集&quot;">​</a></h2><ul><li>配置</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">###################### redis ######################</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;redis-cluster&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">redis://10.103.236.200:9379</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">metrics_path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/scrape</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">relabel_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">source_labels</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">__address__</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">target_label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">__param_target</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">source_labels</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">__param_target</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">target_label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">instance</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">target_label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">__address__</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">replacement</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10.103.236.200:9121</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;redis_exporter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">10.103.236.200:9121</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">###################### redis ######################</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">###################### redis ######################</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;redis-cluster&#39;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_timeout</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">redis://10.103.236.200:9379</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">metrics_path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/scrape</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">relabel_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">source_labels</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">__address__</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">target_label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">__param_target</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">source_labels</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">__param_target</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">target_label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">instance</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">target_label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">__address__</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">replacement</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10.103.236.200:9121</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;redis_exporter&#39;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_timeout</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">10.103.236.200:9121</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">###################### redis ######################</span></span></code></pre></div><blockquote><p>ip和端口根据环境进行修改</p></blockquote><ul><li>热更服务</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;">  </span><span style="color:#032F62;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre></div><h3 id="_1-报警规则" tabindex="-1">1.报警规则 <a class="header-anchor" href="#_1-报警规则" aria-label="Permalink to &quot;1.报警规则&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">############## Redis_rules ###########</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">redis.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &quot;Redis.rules&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_Down</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: redis_up == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis down (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_DisconnectedSlaves</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: count without (instance, job) (redis_connected_slaves) - sum without (instance, job) (redis_connected_slaves) - 1 &gt; 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis disconnected slaves (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis not replicating for all slaves. Consider reviewing the redis replication status.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_Replication_Broken</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: delta(redis_connected_slaves[1m]) &lt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 10m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis replication broken (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis instance lost a slave\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_Cluster_Flapping</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: changes(redis_connected_slaves[1m]) &gt; 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis cluster flapping (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Changes have been detected in Redis replica connection. This can occur when replica nodes lose connection to the master and reconnect (a.k.a flapping).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_MissingBackup</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: time() - redis_rdb_last_save_timestamp_seconds &gt; 60 * 60 * 24</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis missing backup (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis has not been backuped for 24 hours\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_OutOfSystemMemory</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: redis_memory_used_bytes / redis_total_system_memory_bytes * 100 &gt; 90 and on(instance) redis_memory_max_bytes &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis out of system memory (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis is running out of system memory (&gt; 90%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_OutOfConfiguredMaxmemory</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: redis_memory_used_bytes / redis_memory_max_bytes * 100 &gt; 90</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis out of configured maxmemory (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis is running out of configured maxmemory (&gt; 90%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_TooManyConnections</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: redis_connected_clients &gt; 1000</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis too many connections (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis instance has too many connections\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_NotEnoughConnections</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: redis_connected_clients &lt; 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis not enough connections (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Redis instance should have more connections (&gt; 5)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: Redis_RejectedConnections</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: increase(redis_rejected_connections_total[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Redis rejected connections (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Some connections to Redis has been rejected\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">############## Redis_rules ###########</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">redis.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &quot;Redis.rules&quot;</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_Down</span></span>
<span class="line"><span style="color:#032F62;">        expr: redis_up == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis down (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_DisconnectedSlaves</span></span>
<span class="line"><span style="color:#032F62;">        expr: count without (instance, job) (redis_connected_slaves) - sum without (instance, job) (redis_connected_slaves) - 1 &gt; 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis disconnected slaves (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis not replicating for all slaves. Consider reviewing the redis replication status.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_Replication_Broken</span></span>
<span class="line"><span style="color:#032F62;">        expr: delta(redis_connected_slaves[1m]) &lt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 10m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis replication broken (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis instance lost a slave\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_Cluster_Flapping</span></span>
<span class="line"><span style="color:#032F62;">        expr: changes(redis_connected_slaves[1m]) &gt; 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis cluster flapping (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Changes have been detected in Redis replica connection. This can occur when replica nodes lose connection to the master and reconnect (a.k.a flapping).\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_MissingBackup</span></span>
<span class="line"><span style="color:#032F62;">        expr: time() - redis_rdb_last_save_timestamp_seconds &gt; 60 * 60 * 24</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis missing backup (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis has not been backuped for 24 hours\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_OutOfSystemMemory</span></span>
<span class="line"><span style="color:#032F62;">        expr: redis_memory_used_bytes / redis_total_system_memory_bytes * 100 &gt; 90 and on(instance) redis_memory_max_bytes &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis out of system memory (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis is running out of system memory (&gt; 90%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_OutOfConfiguredMaxmemory</span></span>
<span class="line"><span style="color:#032F62;">        expr: redis_memory_used_bytes / redis_memory_max_bytes * 100 &gt; 90</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis out of configured maxmemory (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis is running out of configured maxmemory (&gt; 90%)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_TooManyConnections</span></span>
<span class="line"><span style="color:#032F62;">        expr: redis_connected_clients &gt; 1000</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis too many connections (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis instance has too many connections\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_NotEnoughConnections</span></span>
<span class="line"><span style="color:#032F62;">        expr: redis_connected_clients &lt; 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis not enough connections (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Redis instance should have more connections (&gt; 5)\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: Redis_RejectedConnections</span></span>
<span class="line"><span style="color:#032F62;">        expr: increase(redis_rejected_connections_total[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Redis rejected connections (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Some connections to Redis has been rejected\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span></code></pre></div><p>参考：</p><p><a href="https://github.com/bdossantos/prometheus-alert-rules/blob/master/rules/redis.yml" target="_blank" rel="noreferrer">https://github.com/bdossantos/prometheus-alert-rules/blob/master/rules/redis.yml</a></p><h2 id="_1-4-grafana" tabindex="-1">1.4 grafana <a class="header-anchor" href="#_1-4-grafana" aria-label="Permalink to &quot;1.4 grafana&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202411241600992.png" alt="image-20241124160018023"></p><p><a href="https://github.com/ops-center/grafana-dashboards/tree/master/redis" target="_blank" rel="noreferrer">https://github.com/ops-center/grafana-dashboards/tree/master/redis</a></p><p><a href="https://appscode.com/blog/post/monitor-redis-with-grafana-dashboard-in-aws/" target="_blank" rel="noreferrer">https://appscode.com/blog/post/monitor-redis-with-grafana-dashboard-in-aws/</a></p><p><a href="https://logit.io/blog/post/top-grafana-dashboards-and-visualisations/" target="_blank" rel="noreferrer">https://logit.io/blog/post/top-grafana-dashboards-and-visualisations/</a></p><p><a href="https://blog.csdn.net/ApexPredator/article/details/135669760" target="_blank" rel="noreferrer">https://blog.csdn.net/ApexPredator/article/details/135669760</a></p><h1 id="_2-k8s环境" tabindex="-1">2. k8s环境 <a class="header-anchor" href="#_2-k8s环境" aria-label="Permalink to &quot;2. k8s环境&quot;">​</a></h1><h2 id="_2-1-创建secrets" tabindex="-1">2.1 创建secrets <a class="header-anchor" href="#_2-1-创建secrets" aria-label="Permalink to &quot;2.1 创建secrets&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">secret</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">generic</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis-exporter-auth</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--from-literal=user=USER</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--from-literal=password=PASSWORD</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span><span style="color:#24292E;"> </span><span style="color:#032F62;">secret</span><span style="color:#24292E;"> </span><span style="color:#032F62;">generic</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis-exporter-auth</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--from-literal=user=USER</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--from-literal=password=PASSWORD</span></span></code></pre></div><h3 id="_1-单独redis-exporter" tabindex="-1">1.单独redis_exporter <a class="header-anchor" href="#_1-单独redis-exporter" aria-label="Permalink to &quot;1.单独redis_exporter&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-exporter</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">prometheus.io/port</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;9121&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">prometheus.io/scrape</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;true&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">regiregistry.cn-zhangjiakou.aliyuncs.com/hsuing/redis_exporter:v6</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">         - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9121</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">       - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TZ</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">       - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">REDIS_ADDR</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;redis://redis:6379&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">       - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">REDIS_USER</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#85E89D;">valueFrom</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#85E89D;">secretKeyRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">             </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-exporter-auth</span></span>
<span class="line"><span style="color:#E1E4E8;">             </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">user</span></span>
<span class="line"><span style="color:#E1E4E8;">       - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">REDIS_PASSWORD</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#85E89D;">valueFrom</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#85E89D;">secretKeyRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">             </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-exporter-auth</span></span>
<span class="line"><span style="color:#E1E4E8;">             </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">password</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;256Mi&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">           </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;256m&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-exporter</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-exporter</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-exporter</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">prometheus.io/port</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;9121&quot;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">prometheus.io/scrape</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;true&quot;</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-exporter</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">regiregistry.cn-zhangjiakou.aliyuncs.com/hsuing/redis_exporter:v6</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">         - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9121</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">       - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TZ</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#24292E;">       - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">REDIS_ADDR</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;redis://redis:6379&#39;</span></span>
<span class="line"><span style="color:#24292E;">       - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">REDIS_USER</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#22863A;">valueFrom</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#22863A;">secretKeyRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">             </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-exporter-auth</span></span>
<span class="line"><span style="color:#24292E;">             </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">user</span></span>
<span class="line"><span style="color:#24292E;">       - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">REDIS_PASSWORD</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#22863A;">valueFrom</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#22863A;">secretKeyRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">             </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-exporter-auth</span></span>
<span class="line"><span style="color:#24292E;">             </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">password</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;256Mi&quot;</span></span>
<span class="line"><span style="color:#24292E;">           </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;256m&quot;</span></span></code></pre></div><h3 id="_2-redis和redis-exporter" tabindex="-1">2.redis和redis_exporter <a class="header-anchor" href="#_2-redis和redis-exporter" aria-label="Permalink to &quot;2.redis和redis_exporter&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-cart</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-cart</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-cart</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis:alpine</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6379</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">tcpSocket</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6379</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">tcpSocket</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6379</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-data</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">125m</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">70m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">200Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">oliver006/redis_exporter:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TZ</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">runAsUser</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">59000</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">runAsGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">59000</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">allowPrivilegeEscalation</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">capabilities</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">drop</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">ALL</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9121</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">metrics</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">tcpSocket</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9121</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-data</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">emptyDir</span><span style="color:#E1E4E8;">: {}</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-cart</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-cart</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterIP</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis-cart</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">redis</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6379</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6379</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">metrics</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9121</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9121</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-cart</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-cart</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-cart</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis:alpine</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6379</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">tcpSocket</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6379</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">tcpSocket</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6379</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-data</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">125m</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">70m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">200Mi</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-exporter</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">oliver006/redis_exporter:latest</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TZ</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">runAsUser</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">59000</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">runAsGroup</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">59000</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">allowPrivilegeEscalation</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">capabilities</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">drop</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">ALL</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9121</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">metrics</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">tcpSocket</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9121</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-data</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">emptyDir</span><span style="color:#24292E;">: {}</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-cart</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-cart</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterIP</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis-cart</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">redis</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6379</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6379</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">metrics</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9121</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9121</span></span></code></pre></div><p><a href="https://blog.csdn.net/sinat_14840559/article/details/127676664" target="_blank" rel="noreferrer">https://blog.csdn.net/sinat_14840559/article/details/127676664</a></p><p><a href="https://sysdig.com/blog/redis-prometheus/" target="_blank" rel="noreferrer">https://sysdig.com/blog/redis-prometheus/</a></p><p><a href="https://redis.io/docs/latest/integrate/prometheus-with-redis-cloud/" target="_blank" rel="noreferrer">https://redis.io/docs/latest/integrate/prometheus-with-redis-cloud/</a></p><p><a href="https://wiki.eryajf.net/pages/2497.html#_5-%E9%85%8D%E7%BD%AE-grafana-%E7%9A%84%E6%A8%A1%E6%9D%BF" target="_blank" rel="noreferrer">https://wiki.eryajf.net/pages/2497.html#_5-配置-grafana-的模板</a></p>`,41),o=[e];function t(c,r,E,y,i,F){return n(),a("div",null,o)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
