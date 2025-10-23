import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const F=JSON.parse('{"title":"1. windows_exporter","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/monitor_project/11-sqlserver.md","filePath":"guide/Linux/Monitor/Prometheus/monitor_project/11-sqlserver.md","lastUpdated":1733306897000}'),p={name:"guide/Linux/Monitor/Prometheus/monitor_project/11-sqlserver.md"},o=l(`<p><a href="https://www.alibabacloud.com/blog/600909" target="_blank" rel="noreferrer">https://www.alibabacloud.com/blog/600909</a></p><h1 id="_1-windows-exporter" tabindex="-1">1. windows_exporter <a class="header-anchor" href="#_1-windows-exporter" aria-label="Permalink to &quot;1. windows_exporter&quot;">​</a></h1><h2 id="_1-1-介绍" tabindex="-1">1.1 介绍 <a class="header-anchor" href="#_1-1-介绍" aria-label="Permalink to &quot;1.1 介绍&quot;">​</a></h2><p>既能收集win机器指标，又能收集SqlServer</p><ul><li>默认安装到C:\\Program Files \\windows_exporter目录。</li><li>默认监听端口是9182</li></ul><h2 id="_1-2-部署" tabindex="-1">1.2 部署 <a class="header-anchor" href="#_1-2-部署" aria-label="Permalink to &quot;1.2 部署&quot;">​</a></h2><p>看windows_exporter章节介绍</p><h3 id="_1-配置mssql" tabindex="-1">1.配置mssql <a class="header-anchor" href="#_1-配置mssql" aria-label="Permalink to &quot;1.配置mssql&quot;">​</a></h3><p>C:\\Program Files\\windows_exporter\\config.yml</p><p>默认是空，添加如下配置即可开启mssql监控，重启服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">collectors:</span></span>
<span class="line"><span style="color:#e1e4e8;">  enabled: cs,dhcp,dns,cpu,logical_disk,memory,net,os,textfile,thermalzon,time,cpu_info,mem,tcp,udp,diskdrive,logon,physical_disk,system,service,process,mssql</span></span>
<span class="line"><span style="color:#e1e4e8;">log:</span></span>
<span class="line"><span style="color:#e1e4e8;">  level: warn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">collectors:</span></span>
<span class="line"><span style="color:#24292e;">  enabled: cs,dhcp,dns,cpu,logical_disk,memory,net,os,textfile,thermalzon,time,cpu_info,mem,tcp,udp,diskdrive,logon,physical_disk,system,service,process,mssql</span></span>
<span class="line"><span style="color:#24292e;">log:</span></span>
<span class="line"><span style="color:#24292e;">  level: warn</span></span></code></pre></div><h3 id="_2-开启sql-server-agent-in-ssms" tabindex="-1">2.开启SQL Server Agent in SSMS <a class="header-anchor" href="#_2-开启sql-server-agent-in-ssms" aria-label="Permalink to &quot;2.开启SQL Server Agent in SSMS&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202411212259616.png" alt="img"></p><ul><li>配置开机自起</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202411212302022.png" alt="img"></p><h3 id="_3-调试" tabindex="-1">3.调试 <a class="header-anchor" href="#_3-调试" aria-label="Permalink to &quot;3.调试&quot;">​</a></h3><p>手动启动并配置参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;C:\\Program Files\\windows_exporter\\windows_exporter.exe&quot; --collectors.enabled=&quot;mssql&quot; --log.format logger:eventlog?name=windows_exporter --log.file eventlog --config.file=&quot;C:\\Program Files\\windows_exporter\\config.yaml&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;C:\\Program Files\\windows_exporter\\windows_exporter.exe&quot; --collectors.enabled=&quot;mssql&quot; --log.format logger:eventlog?name=windows_exporter --log.file eventlog --config.file=&quot;C:\\Program Files\\windows_exporter\\config.yaml&quot;</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202411212215126.png" alt="image-20241121221410390"></p><h2 id="_1-3-配置prometheus采集" tabindex="-1">1.3 配置Prometheus采集 <a class="header-anchor" href="#_1-3-配置prometheus采集" aria-label="Permalink to &quot;1.3 配置Prometheus采集&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Windows</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">10.103.236.129:9182</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">30s</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scheme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">metrics_path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/metrics&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">honor_labels</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Windows</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">10.103.236.129:9182</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_timeout</span><span style="color:#24292E;">: </span><span style="color:#032F62;">30s</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scheme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">metrics_path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/metrics&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">honor_labels</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre></div><ul><li>重启服务</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;">  </span><span style="color:#032F62;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre></div><h3 id="_1-告警规则" tabindex="-1">1.告警规则 <a class="header-anchor" href="#_1-告警规则" aria-label="Permalink to &quot;1.告警规则&quot;">​</a></h3><p><a href="https://github.com/prometheus-community/windows_exporter/blob/master/docs/collector.service.md" target="_blank" rel="noreferrer">https://github.com/prometheus-community/windows_exporter/blob/master/docs/collector.service.md</a></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">############## SqlServer_rules ###########</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">SqlServer.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &quot;SqlServer.rules&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: SqlServer_Down</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: windows_service_state{ name=&quot;MSSQLSERVER&quot;,state=&quot;running&quot;} == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 0m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: SQL Server down (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;SQL server instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">############## SqlServer_rules ###########</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">SqlServer.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &quot;SqlServer.rules&quot;</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: SqlServer_Down</span></span>
<span class="line"><span style="color:#032F62;">        expr: windows_service_state{ name=&quot;MSSQLSERVER&quot;,state=&quot;running&quot;} == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 0m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: SQL Server down (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;SQL server instance is down\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span></code></pre></div><h2 id="_1-4-grafana" tabindex="-1">1.4 grafana <a class="header-anchor" href="#_1-4-grafana" aria-label="Permalink to &quot;1.4 grafana&quot;">​</a></h2><p><a href="https://grafana.com/grafana/dashboards/15024-mssql-windows-exporter/" target="_blank" rel="noreferrer">15024</a></p><h1 id="_2-prometheus-mssql-exporter" tabindex="-1">2. prometheus-mssql-exporter <a class="header-anchor" href="#_2-prometheus-mssql-exporter" aria-label="Permalink to &quot;2. prometheus-mssql-exporter&quot;">​</a></h1><h2 id="_1-1-介绍-1" tabindex="-1">1.1 介绍 <a class="header-anchor" href="#_1-1-介绍-1" aria-label="Permalink to &quot;1.1 介绍&quot;">​</a></h2><p><a href="https://github.com/awaragi/prometheus-mssql-exporter/tree/master" target="_blank" rel="noreferrer">官当</a></p><h2 id="_1-2-部署-1" tabindex="-1">1.2 部署 <a class="header-anchor" href="#_1-2-部署-1" aria-label="Permalink to &quot;1.2 部署&quot;">​</a></h2><h3 id="_1-k8s" tabindex="-1">1.k8s <a class="header-anchor" href="#_1-k8s" aria-label="Permalink to &quot;1.k8s&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">awaragi/prometheus-mssql-exporter:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">SERVER</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;your-mssql-server&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">USERNAME</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;your-username&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">PASSWORD</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;your-password&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DEBUG</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;app&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">PORT</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1433&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">4000</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">4000</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">4000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">awaragi/prometheus-mssql-exporter:latest</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">SERVER</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;your-mssql-server&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">USERNAME</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;your-username&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">PASSWORD</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;your-password&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DEBUG</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;app&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">PORT</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1433&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">4000</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">4000</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">4000</span></span></code></pre></div><h3 id="_2-配置采集" tabindex="-1">2.配置采集 <a class="header-anchor" href="#_2-配置采集" aria-label="Permalink to &quot;2.配置采集&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sql-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">sql-exporter:4000</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sql-exporter</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">sql-exporter:4000</span><span style="color:#24292E;">]</span></span></code></pre></div><h3 id="_3-grafana" tabindex="-1">3.grafana <a class="header-anchor" href="#_3-grafana" aria-label="Permalink to &quot;3.grafana&quot;">​</a></h3><ul><li><a href="https://grafana.com/grafana/dashboards/13919" target="_blank" rel="noreferrer">https://grafana.com/grafana/dashboards/13919</a></li></ul><h1 id="_3-mssql-exporter" tabindex="-1">3. mssql_exporter <a class="header-anchor" href="#_3-mssql-exporter" aria-label="Permalink to &quot;3. mssql_exporter&quot;">​</a></h1><h2 id="_1-介绍" tabindex="-1">1. 介绍 <a class="header-anchor" href="#_1-介绍" aria-label="Permalink to &quot;1. 介绍&quot;">​</a></h2><p><a href="https://github.com/DanielOliver/mssql_exporter" target="_blank" rel="noreferrer">https://github.com/DanielOliver/mssql_exporter</a></p><p>这种方式所有sql语句自己收集</p><h2 id="_2-部署" tabindex="-1">2. 部署 <a class="header-anchor" href="#_2-部署" aria-label="Permalink to &quot;2. 部署&quot;">​</a></h2><p>vi docker-compose.yml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">mssql_exporter</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;danieloliver/mssql_exporter:latest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;80:80&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">depends_on</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">sqlserver.dev</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PROMETHEUS_MSSQL_DataSource=Server=tcp:sqlserver.dev,1433;Initial Catalog=master;Persist Security Info=False;User ID=sa;Password=yourStrong(!)Password;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True;Connection Timeout=10;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PROMETHEUS_MSSQL_ConfigFile=metrics.json</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PROMETHEUS_MSSQL_ServerPath=metrics</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PROMETHEUS_MSSQL_ServerPort=80</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PROMETHEUS_MSSQL_AddExporterMetrics=false</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">PROMETHEUS_MSSQL_Serilog__MinimumLevel=Information</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">        PROMETHEUS_MSSQL_ConfigText=</span></span>
<span class="line"><span style="color:#9ECBFF;">        {</span></span>
<span class="line"><span style="color:#9ECBFF;">          &quot;Queries&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">            {</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Name&quot;: &quot;mssql_process_status&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Query&quot;: &quot;SELECT status, COUNT(*) count FROM sys.sysprocesses GROUP BY status&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Description&quot;: &quot;Counts the number of processes per status&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Usage&quot;: &quot;GaugesWithLabels&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Columns&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">                {</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Name&quot;: &quot;status&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Label&quot;: &quot;status&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Usage&quot;: &quot;GaugeLabel&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Order&quot;: 0</span></span>
<span class="line"><span style="color:#9ECBFF;">                },</span></span>
<span class="line"><span style="color:#9ECBFF;">                {</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Name&quot;: &quot;count&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Label&quot;: &quot;count&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Usage&quot;: &quot;Gauge&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                }</span></span>
<span class="line"><span style="color:#9ECBFF;">              ]</span></span>
<span class="line"><span style="color:#9ECBFF;">            },</span></span>
<span class="line"><span style="color:#9ECBFF;">            {</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Name&quot;: &quot;mssql_process_connections&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Query&quot;: &quot;SELECT ISNULL(DB_NAME(dbid), &#39;other&#39;) as dbname, COUNT(dbid) as connections FROM sys.sysprocesses WHERE dbid &gt; 0 GROUP BY dbid&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Description&quot;: &quot;Counts the number of connections per db&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Usage&quot;: &quot;GaugesWithLabels&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Columns&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">                {</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Name&quot;: &quot;dbname&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Label&quot;: &quot;dbname&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Usage&quot;: &quot;GaugeLabel&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Order&quot;: 0</span></span>
<span class="line"><span style="color:#9ECBFF;">                },</span></span>
<span class="line"><span style="color:#9ECBFF;">                {</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Name&quot;: &quot;connections&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Label&quot;: &quot;count&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Usage&quot;: &quot;Gauge&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">                }</span></span>
<span class="line"><span style="color:#9ECBFF;">              ]</span></span>
<span class="line"><span style="color:#9ECBFF;">            },</span></span>
<span class="line"><span style="color:#9ECBFF;">            {</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Name&quot;: &quot;mssql_deadlocks&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Query&quot;: &quot;SELECT cntr_value FROM sys.dm_os_performance_counters where counter_name = &#39;Number of Deadlocks/sec&#39; AND instance_name = &#39;_Total&#39;&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Description&quot;: &quot;Number of lock requests per second that resulted in a deadlock since last restart&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">              &quot;Columns&quot;: [</span></span>
<span class="line"><span style="color:#9ECBFF;">                {</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Name&quot;: &quot;cntr_value&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Label&quot;: &quot;mssql_deadlocks&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;Usage&quot;: &quot;Gauge&quot;,</span></span>
<span class="line"><span style="color:#9ECBFF;">                  &quot;DefaultValue&quot;: 0</span></span>
<span class="line"><span style="color:#9ECBFF;">                }</span></span>
<span class="line"><span style="color:#9ECBFF;">              ]</span></span>
<span class="line"><span style="color:#9ECBFF;">            }</span></span>
<span class="line"><span style="color:#9ECBFF;">          ],</span></span>
<span class="line"><span style="color:#9ECBFF;">          &quot;MillisecondTimeout&quot;: 4000</span></span>
<span class="line"><span style="color:#9ECBFF;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">sqlserver.dev</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;mcr.microsoft.com/mssql/server:2017-latest&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;1433:1433&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">ACCEPT_EULA=Y</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">SA_PASSWORD=yourStrong(!)Password</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">mssql_exporter</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;danieloliver/mssql_exporter:latest&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;80:80&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">depends_on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">sqlserver.dev</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PROMETHEUS_MSSQL_DataSource=Server=tcp:sqlserver.dev,1433;Initial Catalog=master;Persist Security Info=False;User ID=sa;Password=yourStrong(!)Password;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True;Connection Timeout=10;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PROMETHEUS_MSSQL_ConfigFile=metrics.json</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PROMETHEUS_MSSQL_ServerPath=metrics</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PROMETHEUS_MSSQL_ServerPort=80</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PROMETHEUS_MSSQL_AddExporterMetrics=false</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">PROMETHEUS_MSSQL_Serilog__MinimumLevel=Information</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">        PROMETHEUS_MSSQL_ConfigText=</span></span>
<span class="line"><span style="color:#032F62;">        {</span></span>
<span class="line"><span style="color:#032F62;">          &quot;Queries&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">            {</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Name&quot;: &quot;mssql_process_status&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Query&quot;: &quot;SELECT status, COUNT(*) count FROM sys.sysprocesses GROUP BY status&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Description&quot;: &quot;Counts the number of processes per status&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Usage&quot;: &quot;GaugesWithLabels&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Columns&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">                {</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Name&quot;: &quot;status&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Label&quot;: &quot;status&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Usage&quot;: &quot;GaugeLabel&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Order&quot;: 0</span></span>
<span class="line"><span style="color:#032F62;">                },</span></span>
<span class="line"><span style="color:#032F62;">                {</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Name&quot;: &quot;count&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Label&quot;: &quot;count&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Usage&quot;: &quot;Gauge&quot;</span></span>
<span class="line"><span style="color:#032F62;">                }</span></span>
<span class="line"><span style="color:#032F62;">              ]</span></span>
<span class="line"><span style="color:#032F62;">            },</span></span>
<span class="line"><span style="color:#032F62;">            {</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Name&quot;: &quot;mssql_process_connections&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Query&quot;: &quot;SELECT ISNULL(DB_NAME(dbid), &#39;other&#39;) as dbname, COUNT(dbid) as connections FROM sys.sysprocesses WHERE dbid &gt; 0 GROUP BY dbid&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Description&quot;: &quot;Counts the number of connections per db&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Usage&quot;: &quot;GaugesWithLabels&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Columns&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">                {</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Name&quot;: &quot;dbname&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Label&quot;: &quot;dbname&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Usage&quot;: &quot;GaugeLabel&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Order&quot;: 0</span></span>
<span class="line"><span style="color:#032F62;">                },</span></span>
<span class="line"><span style="color:#032F62;">                {</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Name&quot;: &quot;connections&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Label&quot;: &quot;count&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Usage&quot;: &quot;Gauge&quot;</span></span>
<span class="line"><span style="color:#032F62;">                }</span></span>
<span class="line"><span style="color:#032F62;">              ]</span></span>
<span class="line"><span style="color:#032F62;">            },</span></span>
<span class="line"><span style="color:#032F62;">            {</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Name&quot;: &quot;mssql_deadlocks&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Query&quot;: &quot;SELECT cntr_value FROM sys.dm_os_performance_counters where counter_name = &#39;Number of Deadlocks/sec&#39; AND instance_name = &#39;_Total&#39;&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Description&quot;: &quot;Number of lock requests per second that resulted in a deadlock since last restart&quot;,</span></span>
<span class="line"><span style="color:#032F62;">              &quot;Columns&quot;: [</span></span>
<span class="line"><span style="color:#032F62;">                {</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Name&quot;: &quot;cntr_value&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Label&quot;: &quot;mssql_deadlocks&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;Usage&quot;: &quot;Gauge&quot;,</span></span>
<span class="line"><span style="color:#032F62;">                  &quot;DefaultValue&quot;: 0</span></span>
<span class="line"><span style="color:#032F62;">                }</span></span>
<span class="line"><span style="color:#032F62;">              ]</span></span>
<span class="line"><span style="color:#032F62;">            }</span></span>
<span class="line"><span style="color:#032F62;">          ],</span></span>
<span class="line"><span style="color:#032F62;">          &quot;MillisecondTimeout&quot;: 4000</span></span>
<span class="line"><span style="color:#032F62;">        }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">sqlserver.dev</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;mcr.microsoft.com/mssql/server:2017-latest&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;1433:1433&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">ACCEPT_EULA=Y</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">SA_PASSWORD=yourStrong(!)Password</span></span></code></pre></div><blockquote><p>$env:PROMETHEUS_MSSQL_DataSource=&quot;Server=tcp:hjgjhg324.database.windows.net,1433;Initial Catalog=jjkhjk34;Persist Security Info=False;User ID={ USER ID };Password={ PASWORD }; MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;&quot;</p></blockquote><h2 id="_3-配置采集" tabindex="-1">3. 配置采集 <a class="header-anchor" href="#_3-配置采集" aria-label="Permalink to &quot;3. 配置采集&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">  - job_name: &#39;netcore-prometheus&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    # metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    static_configs:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - targets: [&#39;localhost&#39;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">  - job_name: &#39;netcore-prometheus&#39;</span></span>
<span class="line"><span style="color:#24292e;">    # metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#24292e;">    static_configs:</span></span>
<span class="line"><span style="color:#24292e;">    - targets: [&#39;localhost&#39;]</span></span></code></pre></div><h2 id="_4-grafana" tabindex="-1">4. grafana <a class="header-anchor" href="#_4-grafana" aria-label="Permalink to &quot;4. grafana&quot;">​</a></h2><p>自己画</p><p>自定义</p><h1 id="_4-sql-exporter-推荐这个" tabindex="-1">4. sql_exporter-推荐这个 <a class="header-anchor" href="#_4-sql-exporter-推荐这个" aria-label="Permalink to &quot;4. sql_exporter-推荐这个&quot;">​</a></h1><p><a href="https://github.com/burningalchemist/sql_exporter%EF%BC%88%E4%B8%80%E7%9B%B4%E5%9C%A8%E6%9B%B4%E6%96%B0%EF%BC%89" target="_blank" rel="noreferrer">https://github.com/burningalchemist/sql_exporter（一直在更新）</a></p><p>更多、更高级的sql server采集指标：<a href="https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver?tdsourcetag=s_pctim_aiomsg" target="_blank" rel="noreferrer">https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver?tdsourcetag=s_pctim_aiomsg</a></p><p>sql server 对象监控 参考：<a href="https://docs.microsoft.com/zh-cn/sql/relational-databases/performance-monitor/use-sql-server-objects?view=sql-server-ver15" target="_blank" rel="noreferrer">https://docs.microsoft.com/zh-cn/sql/relational-databases/performance-monitor/use-sql-server-objects?view=sql-server-ver15</a></p><h2 id="_4-1-介绍" tabindex="-1">4.1 介绍 <a class="header-anchor" href="#_4-1-介绍" aria-label="Permalink to &quot;4.1 介绍&quot;">​</a></h2><p>可以自定义查询sql语句来生成指标</p><p>参考：</p><p><a href="https://learn.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-wait-statistics-object?view=sql-server-2017" target="_blank" rel="noreferrer">https://learn.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-wait-statistics-object?view=sql-server-2017</a></p><p><a href="https://github.com/free/sql_exporter" target="_blank" rel="noreferrer">https://github.com/free/sql_exporter</a></p><p><a href="https://grafana.com/grafana/dashboards/13919-microsoft-sql-server/" target="_blank" rel="noreferrer">https://grafana.com/grafana/dashboards/13919-microsoft-sql-server/</a></p>`,62),e=[o];function t(r,c,i,E,y,u){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{F as __pageData,d as default};
