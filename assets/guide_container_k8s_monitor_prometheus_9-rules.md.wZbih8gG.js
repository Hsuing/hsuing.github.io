import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. 背景","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus/9-rules.md","filePath":"guide/container/k8s/monitor/prometheus/9-rules.md","lastUpdated":1729503684000}'),e={name:"guide/container/k8s/monitor/prometheus/9-rules.md"},p=l(`<h1 id="_1-背景" tabindex="-1">1. 背景 <a class="header-anchor" href="#_1-背景" aria-label="Permalink to &quot;1. 背景&quot;">​</a></h1><p>需要考虑如下几个维度:</p><h2 id="_1-1-业务维度" tabindex="-1">1.1 业务维度 <a class="header-anchor" href="#_1-1-业务维度" aria-label="Permalink to &quot;1.1 业务维度&quot;">​</a></h2><p>业务维度：在企业中，不同的业务拥有不同的指标和告警规则。例如，对于ToC平台，需要监控订单量、库存、支付成功率等指标，以确保业务的正常运行。</p><h2 id="_1-2-环境维度" tabindex="-1">1.2 环境维度 <a class="header-anchor" href="#_1-2-环境维度" aria-label="Permalink to &quot;1.2 环境维度&quot;">​</a></h2><p>企业中通常会有多个环境，例如开发、测试、预生产和生产环境等。由于每个环境的特点不同，因此需要为每个环境制定不同的告警规则。</p><h2 id="_1-3-应用程序维度" tabindex="-1">1.3 应用程序维度 <a class="header-anchor" href="#_1-3-应用程序维度" aria-label="Permalink to &quot;1.3 应用程序维度&quot;">​</a></h2><p>不同的应用程序拥有不同的指标和告警规则。例如，在监控Web应用程序时，需要监控HTTP请求失败率、响应时间和内存使用情况等指标。</p><h2 id="_1-4-基础设施维度" tabindex="-1">1.4 基础设施维度 <a class="header-anchor" href="#_1-4-基础设施维度" aria-label="Permalink to &quot;1.4 基础设施维度&quot;">​</a></h2><p>企业中的基础设施包括服务器、网络设备和存储设备等。在监控基础设施时，需要监控CPU使用率、磁盘空间和网络带宽等指标。</p><h1 id="_2-定义告警规则" tabindex="-1">2. 定义告警规则 <a class="header-anchor" href="#_2-定义告警规则" aria-label="Permalink to &quot;2. 定义告警规则&quot;">​</a></h1><p>简单案例</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">groups</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">general.rules</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">InstanceDown</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">          up{job=~&quot;other-ECS|k8s-nodes|prometheus|service_discovery_consul&quot;} == 0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5s</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">critical</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Instance {{ $labels.instance }} 停止工作&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} 已经停止1分钟以上.&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">groups</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">general.rules</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">InstanceDown</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          up{job=~&quot;other-ECS|k8s-nodes|prometheus|service_discovery_consul&quot;} == 0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5s</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">critical</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Instance {{ $labels.instance }} 停止工作&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} 已经停止1分钟以上.&quot;</span></span></code></pre></div><p>在告警文件中,将一组相关的规则设置定义在一个group下,在每个组里面可以定义多个规则</p><p>规则的组成:</p><p><code>alert</code>：告警规则的名称。</p><p><code>expr</code>：基于PromQL表达式告警触发条件，用于计算是否有时间序列满足该条件。</p><p><code>for</code>：评估等待时间，可选参数。用于表示只有当触发条件持续一段时间后才发送告警。在等待期间新产生告警的状态为pending。</p><p><code>labels</code>：自定义标签，允许用户指定要附加到告警上的一组附加标签。</p><p><code>annotations</code>：用于指定一组附加信息，比如用于描述告警详细信息的文字等，annotations的内容在告警产生时会一同作为参数发送到Alertmanager。</p><h1 id="_3-告警rules" tabindex="-1">3. 告警rules <a class="header-anchor" href="#_3-告警rules" aria-label="Permalink to &quot;3. 告警rules&quot;">​</a></h1><p><a href="https://samber.github.io/awesome-prometheus-alerts/rules#kubernetes" target="_blank" rel="noreferrer">参考文档-awesome-prometheus-alerts</a></p><h2 id="_3-0-prometheus-rules" tabindex="-1">3.0 prometheus.rules <a class="header-anchor" href="#_3-0-prometheus-rules" aria-label="Permalink to &quot;3.0 prometheus.rules&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">prometheus.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: prometheus.rules</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PrometheusErrorSendingAlertsToAnyAlertmanagers</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (rate(prometheus_notifications_errors_total{instance=&quot;localhost:9090&quot;, job=&quot;prometheus&quot;}[5m]) /rate(prometheus_notifications_sent_total{instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;}[5m])) * 100 &gt; 3</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ printf &quot;%.1f&quot; $value }}% minimum errors while sending alerts from Prometheus {{$labels.namespace}}/{{$labels.pod}} to any Alertmanager.&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PrometheusNotConnectedToAlertmanagers</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          max_over_time(prometheus_notifications_alertmanagers_discovered{instance=&quot;localhost:9090&quot;, job=&quot;prometheus&quot;}[5m]) != 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Prometheus {{$labels.namespace}}/{{$labels.pod}} 链接alertmanager异常！&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PrometheusRuleFailures</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          increase(prometheus_rule_evaluation_failures_total{instance=&quot;localhost:9090&quot;, job=&quot;prometheus&quot;}[5m]) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;Prometheus {{$labels.namespace}}/{{$labels.pod}} 在5分钟执行失败的规则次数 {{ printf &quot;%.0f&quot; $value }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PrometheusRuleEvaluationFailures</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          increase(prometheus_rule_evaluation_failures_total[3m]) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 0m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Prometheus rule evaluation failures (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Prometheus 遇到规则 {{ $value }} 载入失败, 请及时检查.&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PrometheusTsdbReloadFailures</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          increase(prometheus_tsdb_reloads_failures_total[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 0m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Prometheus TSDB reload failures (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Prometheus {{ $value }} TSDB 重载失败!&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PrometheusTsdbWalCorruptions</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          increase(prometheus_tsdb_wal_corruptions_total[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 0m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Prometheus TSDB WAL corruptions (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Prometheus {{ $value }} TSDB WAL 模块出现问题!&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">prometheus.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: prometheus.rules</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PrometheusErrorSendingAlertsToAnyAlertmanagers</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (rate(prometheus_notifications_errors_total{instance=&quot;localhost:9090&quot;, job=&quot;prometheus&quot;}[5m]) /rate(prometheus_notifications_sent_total{instance=&quot;localhost:9090&quot;,job=&quot;prometheus&quot;}[5m])) * 100 &gt; 3</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ printf &quot;%.1f&quot; $value }}% minimum errors while sending alerts from Prometheus {{$labels.namespace}}/{{$labels.pod}} to any Alertmanager.&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PrometheusNotConnectedToAlertmanagers</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          max_over_time(prometheus_notifications_alertmanagers_discovered{instance=&quot;localhost:9090&quot;, job=&quot;prometheus&quot;}[5m]) != 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Prometheus {{$labels.namespace}}/{{$labels.pod}} 链接alertmanager异常！&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PrometheusRuleFailures</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          increase(prometheus_rule_evaluation_failures_total{instance=&quot;localhost:9090&quot;, job=&quot;prometheus&quot;}[5m]) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;Prometheus {{$labels.namespace}}/{{$labels.pod}} 在5分钟执行失败的规则次数 {{ printf &quot;%.0f&quot; $value }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PrometheusRuleEvaluationFailures</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          increase(prometheus_rule_evaluation_failures_total[3m]) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 0m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Prometheus rule evaluation failures (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Prometheus 遇到规则 {{ $value }} 载入失败, 请及时检查.&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PrometheusTsdbReloadFailures</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          increase(prometheus_tsdb_reloads_failures_total[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 0m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Prometheus TSDB reload failures (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Prometheus {{ $value }} TSDB 重载失败!&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PrometheusTsdbWalCorruptions</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          increase(prometheus_tsdb_wal_corruptions_total[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 0m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Prometheus TSDB WAL corruptions (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Prometheus {{ $value }} TSDB WAL 模块出现问题!&quot;</span></span></code></pre></div><h2 id="_3-1-node-rules" tabindex="-1">3.1 Node.rules <a class="header-anchor" href="#_3-1-node-rules" aria-label="Permalink to &quot;3.1 Node.rules&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">node.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: node.rules</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: NodeFilesystemUsage</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          100 - (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 &gt; 85</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Instance {{ $labels.instance }} : {{ $labels.mountpoint }} 分区使用率过高&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} : {{ $labels.mountpoint }} 分区使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: NodeMemoryUsage</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          100 - (node_memory_MemFree_bytes+node_memory_Cached_bytes+node_memory_Buffers_bytes) / node_memory_MemTotal_bytes * 100 &gt; 85</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Instance {{ $labels.instance }} 内存使用率过高&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 内存使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: NodeCPUUsage</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (100 - (avg by (instance) (irate(node_cpu_seconds_total{job=~&quot;.*&quot;,mode=&quot;idle&quot;}[5m])) * 100)) &gt; 85</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 10m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Instance {{ $labels.instance }} CPU使用率过高&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} CPU使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: TCPEstab</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          node_netstat_Tcp_CurrEstab &gt; 6000</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Instance {{ $labels.instance }} TCP_Estab链接过高 &gt; 6000&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} TCP_Estab链接过高!(当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: TCP_TIME_WAIT</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          node_sockstat_TCP_tw &gt; 3000</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Instance {{ $labels.instance }} TCP_TIME_WAIT过高&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} TCP_TIME_WAIT过高!(当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: TCP_Sockets</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          node_sockstat_sockets_used &gt; 10000</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Instance {{ $labels.instance }} TCP_Sockets链接过高&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} TCP_Sockets链接过高!(当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: KubeNodeNotReady</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_node_status_condition{condition=&quot;Ready&quot;,status=&quot;true&quot;} == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.node }} NotReady已经1分钟.&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: KubernetesMemoryPressure</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_node_status_condition{condition=&quot;MemoryPressure&quot;,status=&quot;true&quot;} == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Kubernetes memory pressure (instance {{$labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.node }} has MemoryPressurecondition VALUE = {{ $value }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: KubernetesDiskPressure</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_node_status_condition{condition=&quot;DiskPressure&quot;,status=&quot;true&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Kubernetes disk pressure (instance {{$labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.node }} has DiskPressurecondition.&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: KubernetesJobFailed</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_job_status_failed &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Kubernetes Job failed (instance {{$labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Job {{$labels.namespace}}/{{$labels.job_name}} failed to complete.&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: UnusualDiskWriteRate</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by (job,instance)(irate(node_disk_written_bytes_total[5m])) / 1024 / 1024 &gt; 140</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">          hostname: &#39;{{ $labels.hostname }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟磁盘写入数据(&gt; 140 MB/s) (当前值: {{ $value}})阿里云ESSD PL0最大吞吐量180MB/s, PL1最大350MB/s&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: UnusualDiskReadRate</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by (job,instance)(irate(node_disk_read_bytes_total[5m])) / 1024 / 1024 &gt; 140</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">          hostname: &#39;{{ $labels.hostname }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟磁盘读取数据(&gt; 140 MB/s) (当前值: {{ $value}})阿里云ESSD PL0最大吞吐量180MB/s, PL1最大350MB/s&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: UnusualNetworkThroughputIn</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by (job,instance)(irate(node_network_receive_bytes_total{job=~&quot;aws-jd-monitor|k8s-nodes&quot;}[5m])) / 1024 / 1024 &gt; 80</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟网络带宽接收数据(&gt; 80 MB/s) (当前值: {{$value }})&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: UnusualNetworkThroughputOut</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by (job,instance)(irate(node_network_transmit_bytes_total{job=~&quot;aws-hk-monitor|k8s-nodes&quot;}[5m])) / 1024 / 1024 &gt; 80</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟网络带宽发送数据(&gt; 80 MB/s) (当前值: {{$value }})&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: SystemdServiceCrashed</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          node_systemd_unit_state{state=&quot;failed&quot;} == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 上的{{$labels.name}}服务有问题已经5分钟，请及时处理&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: HostDiskWillFillIn24Hours</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (node_filesystem_avail_bytes * 100) /node_filesystem_size_bytes &lt; 10 and ON (instance, device,mountpoint)predict_linear(node_filesystem_avail_bytes{fstype!~&quot;tmpfs&quot;}[1h], 24* 3600) &lt; 0 and ON (instance, device, mountpoint)node_filesystem_readonly == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Host disk will fill in 24 hours (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 以当前写入速率，预计文件系统将在未来24小时内耗尽空间!&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: HostOutOfInodes</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          node_filesystem_files_free / node_filesystem_files *100 &lt; 10 and ON (instance, device, mountpoint)node_filesystem_readonly == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Host out of inodes (instance {{ $labels.instance}})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 磁盘iNode空间剩余小于10%!\\n VALUE = {{ $value }}\\n LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: HostOomKillDetected</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          increase(node_vmstat_oom_kill[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 0m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Host OOM kill detected (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 当前主机检查到有OOM现象!&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: 节点磁盘容量</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          max((node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;}) *100/(node_filesystem_avail_bytes {fstype=~&quot;ext.?|xfs&quot;}+(node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;})))by(instance) &gt; 80</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;节点磁盘分区使用率过高！&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{$labels.instance }} 磁盘分区使用大于80%(目前使用:{{$value}}%)&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: 节点磁盘容量</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          max((node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;}) *100/(node_filesystem_avail_bytes {fstype=~&quot;ext.?|xfs&quot;}+(node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;})))by(instance) &gt; 80</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;节点磁盘分区使用率过高！&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{$labels.instance }} 磁盘分区使用大于80%(目前使用:{{$value}}%)&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: node_processes_threads</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (node_processes_threads / on(instance) min by(instance) (node_processes_max_processes or node_processes_max_threads) &gt; 0.8)</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;节点processes_threads较高！&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{$labels.instance }} node_processes_max_threads大于80%(目前使用:{{$value}}%)&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">node.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: node.rules</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: NodeFilesystemUsage</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          100 - (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 &gt; 85</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Instance {{ $labels.instance }} : {{ $labels.mountpoint }} 分区使用率过高&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} : {{ $labels.mountpoint }} 分区使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: NodeMemoryUsage</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          100 - (node_memory_MemFree_bytes+node_memory_Cached_bytes+node_memory_Buffers_bytes) / node_memory_MemTotal_bytes * 100 &gt; 85</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Instance {{ $labels.instance }} 内存使用率过高&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 内存使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: NodeCPUUsage</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (100 - (avg by (instance) (irate(node_cpu_seconds_total{job=~&quot;.*&quot;,mode=&quot;idle&quot;}[5m])) * 100)) &gt; 85</span></span>
<span class="line"><span style="color:#032F62;">        for: 10m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Instance {{ $labels.instance }} CPU使用率过高&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} CPU使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: TCPEstab</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          node_netstat_Tcp_CurrEstab &gt; 6000</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Instance {{ $labels.instance }} TCP_Estab链接过高 &gt; 6000&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} TCP_Estab链接过高!(当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: TCP_TIME_WAIT</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          node_sockstat_TCP_tw &gt; 3000</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Instance {{ $labels.instance }} TCP_TIME_WAIT过高&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} TCP_TIME_WAIT过高!(当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: TCP_Sockets</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          node_sockstat_sockets_used &gt; 10000</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Instance {{ $labels.instance }} TCP_Sockets链接过高&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} TCP_Sockets链接过高!(当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: KubeNodeNotReady</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_node_status_condition{condition=&quot;Ready&quot;,status=&quot;true&quot;} == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.node }} NotReady已经1分钟.&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: KubernetesMemoryPressure</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_node_status_condition{condition=&quot;MemoryPressure&quot;,status=&quot;true&quot;} == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Kubernetes memory pressure (instance {{$labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.node }} has MemoryPressurecondition VALUE = {{ $value }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: KubernetesDiskPressure</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_node_status_condition{condition=&quot;DiskPressure&quot;,status=&quot;true&quot;}</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Kubernetes disk pressure (instance {{$labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.node }} has DiskPressurecondition.&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: KubernetesJobFailed</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_job_status_failed &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Kubernetes Job failed (instance {{$labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Job {{$labels.namespace}}/{{$labels.job_name}} failed to complete.&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: UnusualDiskWriteRate</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by (job,instance)(irate(node_disk_written_bytes_total[5m])) / 1024 / 1024 &gt; 140</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">          hostname: &#39;{{ $labels.hostname }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟磁盘写入数据(&gt; 140 MB/s) (当前值: {{ $value}})阿里云ESSD PL0最大吞吐量180MB/s, PL1最大350MB/s&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: UnusualDiskReadRate</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by (job,instance)(irate(node_disk_read_bytes_total[5m])) / 1024 / 1024 &gt; 140</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">          hostname: &#39;{{ $labels.hostname }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟磁盘读取数据(&gt; 140 MB/s) (当前值: {{ $value}})阿里云ESSD PL0最大吞吐量180MB/s, PL1最大350MB/s&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: UnusualNetworkThroughputIn</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by (job,instance)(irate(node_network_receive_bytes_total{job=~&quot;aws-jd-monitor|k8s-nodes&quot;}[5m])) / 1024 / 1024 &gt; 80</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟网络带宽接收数据(&gt; 80 MB/s) (当前值: {{$value }})&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: UnusualNetworkThroughputOut</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by (job,instance)(irate(node_network_transmit_bytes_total{job=~&quot;aws-hk-monitor|k8s-nodes&quot;}[5m])) / 1024 / 1024 &gt; 80</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 持续5分钟网络带宽发送数据(&gt; 80 MB/s) (当前值: {{$value }})&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: SystemdServiceCrashed</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          node_systemd_unit_state{state=&quot;failed&quot;} == 1</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.instance }} 主机名：{{$labels.hostname }} 上的{{$labels.name}}服务有问题已经5分钟，请及时处理&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: HostDiskWillFillIn24Hours</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (node_filesystem_avail_bytes * 100) /node_filesystem_size_bytes &lt; 10 and ON (instance, device,mountpoint)predict_linear(node_filesystem_avail_bytes{fstype!~&quot;tmpfs&quot;}[1h], 24* 3600) &lt; 0 and ON (instance, device, mountpoint)node_filesystem_readonly == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Host disk will fill in 24 hours (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 以当前写入速率，预计文件系统将在未来24小时内耗尽空间!&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: HostOutOfInodes</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          node_filesystem_files_free / node_filesystem_files *100 &lt; 10 and ON (instance, device, mountpoint)node_filesystem_readonly == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Host out of inodes (instance {{ $labels.instance}})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 磁盘iNode空间剩余小于10%!\\n VALUE = {{ $value }}\\n LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: HostOomKillDetected</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          increase(node_vmstat_oom_kill[1m]) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 0m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Host OOM kill detected (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{$labels.hostname }} 当前主机检查到有OOM现象!&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: 节点磁盘容量</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          max((node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;}) *100/(node_filesystem_avail_bytes {fstype=~&quot;ext.?|xfs&quot;}+(node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;})))by(instance) &gt; 80</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;节点磁盘分区使用率过高！&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{$labels.instance }} 磁盘分区使用大于80%(目前使用:{{$value}}%)&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: 节点磁盘容量</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          max((node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;}) *100/(node_filesystem_avail_bytes {fstype=~&quot;ext.?|xfs&quot;}+(node_filesystem_size_bytes{fstype=~&quot;ext.?|xfs&quot;}-node_filesystem_free_bytes{fstype=~&quot;ext.?|xfs&quot;})))by(instance) &gt; 80</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;节点磁盘分区使用率过高！&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{$labels.instance }} 磁盘分区使用大于80%(目前使用:{{$value}}%)&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: node_processes_threads</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (node_processes_threads / on(instance) min by(instance) (node_processes_max_processes or node_processes_max_threads) &gt; 0.8)</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;节点processes_threads较高！&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{$labels.instance }} node_processes_max_threads大于80%(目前使用:{{$value}}%)&quot;</span></span></code></pre></div><h4 id="conntrack" tabindex="-1">conntrack <a class="header-anchor" href="#conntrack" aria-label="Permalink to &quot;conntrack&quot;">​</a></h4><ul><li>查看是否采集该指标</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> curl -s localhost:9100/metrics | grep &quot;node_nf_conntrack_&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> curl -s localhost:9100/metrics | grep &quot;node_nf_conntrack_&quot;</span></span></code></pre></div><p>Conntrack 是 Linux 内核中的一个模块，用来跟踪连接的状态。比如，你的机器是一个 NAT 网关，那么 Conntrack 就会记录内网 IP 和端口到外网 IP 和端口的映射关系。这样，当外网回包的时候，内核就能根据 Conntrack 表找到对应的内网 IP 和端口，把包转发给内网机器。我们可以通过 <code>conntrack -L</code> 命令查看 Conntrack 表的内容。</p><p>Conntrack 表是有限的，所以当表满了，新连接就无法建立。这时，就会出现 <code>nf_conntrack: table full</code>的错误，导致生产故障。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">node_nf_conntrack</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">          100 * node_nf_conntrack_entries / node_nf_conntrack_entries_limit &gt; 85</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">critical</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;节点node_nf_conntrack即将耗尽！&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;{{$labels.instance }} node_nf_conntrack_entries_limit 大于85%(目前使用:{{$value}}%)&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">node_nf_conntrack</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">          100 * node_nf_conntrack_entries / node_nf_conntrack_entries_limit &gt; 85</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">critical</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;节点node_nf_conntrack即将耗尽！&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;{{$labels.instance }} node_nf_conntrack_entries_limit 大于85%(目前使用:{{$value}}%)&quot;</span></span></code></pre></div><h2 id="_3-2-pod-rules" tabindex="-1">3.2 Pod.rules <a class="header-anchor" href="#_3-2-pod-rules" aria-label="Permalink to &quot;3.2 Pod.rules&quot;">​</a></h2><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407070005113.png" alt="image-20240706181431008"></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">Pod.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: Pod.rules</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: customError</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_pod_container_status_running{container=&quot;custom&quot;} == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} custome服务异常 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodRestart</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(changes(kube_pod_container_status_restarts_total[1m])) by (pod,namespace) &gt; 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod重启 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodFailed</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(kube_pod_status_phase{phase=&quot;Failed&quot;}) by (pod,namespace) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5s</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态Failed (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodPending</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(kube_pod_status_phase{phase=&quot;Pending&quot;}) by (pod,namespace) &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 30s</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态Pending (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodErrImagePull</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;ErrImagePull&quot;}) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态ErrImagePull (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodImagePullBackOff</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;ImagePullBackOff&quot;}) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态ImagePullBackOff (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodCrashLoopBackOff</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;CrashLoopBackOff&quot;}) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态CrashLoopBackOff (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodInvalidImageName</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;InvalidImageName&quot;}) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态InvalidImageName (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodCreateContainerConfigError</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;CreateContainerConfigError&quot;}) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态CreateContainerConfigError (当前值: {{ $value}})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: StatefulsetDown</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (kube_statefulset_status_replicas_ready / kube_statefulset_status_replicas_current) != 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Kubernetes StatefulSet down (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.statefulset }} A StatefulSet went down!&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: StatefulsetReplicasMismatch</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_statefulset_status_replicas_ready != kube_statefulset_status_replicas</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 10m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: StatefulSet replicas mismatch (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.statefulset }} A StatefulSet does not match the expected number of replicas.&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodDown</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: | #根据环境修改</span></span>
<span class="line"><span style="color:#9ECBFF;">          min_over_time(kube_pod_container_status_ready{pod!~&quot;.*job.*|.*jenkins.*&quot;} [1m])== 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1s # 持续多久确认报警信息</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;Container: {{ $labels.container }} down&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          message: &#39;Namespace: {{ $labels.namespace }}, Pod: {{ $labels.pod }} 服务不可用&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodOomKiller</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (kube_pod_container_status_restarts_total - kube_pod_container_status_restarts_total offset 10m &gt;= 1) and ignoring (reason)min_over_time(kube_pod_container_status_last_terminated_reason{reason=&quot;OOMKilled&quot;}[10m]) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 0m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: Kubernetes container oom killer (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} has been OOMKilled {{ $value }} times in the last 10 minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodCPUUsage</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(rate(container_cpu_usage_seconds_total{image!=&quot;&quot;}[5m]) * 100) by (pod, namespace) &gt; 90</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} CPU使用大于90% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodMemoryUsage</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(container_memory_rss{image!=&quot;&quot;}) by(pod, namespace)/sum(container_spec_memory_limit_bytes{image!=&quot;&quot;}) by(pod, namespace)* 100 != +inf &gt; 85</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} 内存使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: KubeDeploymentError</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_deployment_spec_replicas{job=&quot;kubernetes-service-endpoints&quot;} != kube_deployment_status_replicas_available{job=&quot;kubernetes-service-endpoints&quot;}</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 3m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">          pod: &#39;{{$labels.deployment}}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Deployment {{ $labels.namespace }}/{{$labels.deployment }}控制器与实际数量不相符 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: coreDnsError</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_pod_container_status_running{container=&quot;coredns&quot;} == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} coreDns服务异常 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: kubeProxyError</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          kube_pod_container_status_running{container=&quot;kube-proxy&quot;} == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} kube-proxy服务异常 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodNetworkReceive</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(rate(container_network_receive_bytes_total{image!=&quot;&quot;,name=~&quot;^k8s_.*&quot;}[5m]) /1000) by (pod,namespace) &gt; 60000</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} 入口流量大于60MB/s (当前值: {{ $value }}K/s)&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PodNetworkTransmit</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(rate(container_network_transmit_bytes_total{image!=&quot;&quot;,name=~&quot;^k8s_.*&quot;}[5m]) /1000) by (pod,namespace) &gt; 60000</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} 出口流量大于60MB/s (当前值: {{ $value }}/K/s)&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">Pod.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: Pod.rules</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: customError</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_pod_container_status_running{container=&quot;custom&quot;} == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} custome服务异常 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodRestart</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(changes(kube_pod_container_status_restarts_total[1m])) by (pod,namespace) &gt; 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod重启 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodFailed</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(kube_pod_status_phase{phase=&quot;Failed&quot;}) by (pod,namespace) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5s</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态Failed (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodPending</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(kube_pod_status_phase{phase=&quot;Pending&quot;}) by (pod,namespace) &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 30s</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态Pending (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodErrImagePull</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;ErrImagePull&quot;}) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态ErrImagePull (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodImagePullBackOff</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;ImagePullBackOff&quot;}) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态ImagePullBackOff (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodCrashLoopBackOff</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;CrashLoopBackOff&quot;}) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态CrashLoopBackOff (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodInvalidImageName</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;InvalidImageName&quot;}) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态InvalidImageName (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodCreateContainerConfigError</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by(namespace,pod)(kube_pod_container_status_waiting_reason{reason=&quot;CreateContainerConfigError&quot;}) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} Pod状态CreateContainerConfigError (当前值: {{ $value}})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: StatefulsetDown</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (kube_statefulset_status_replicas_ready / kube_statefulset_status_replicas_current) != 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Kubernetes StatefulSet down (instance {{$labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.statefulset }} A StatefulSet went down!&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: StatefulsetReplicasMismatch</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_statefulset_status_replicas_ready != kube_statefulset_status_replicas</span></span>
<span class="line"><span style="color:#032F62;">        for: 10m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: StatefulSet replicas mismatch (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.statefulset }} A StatefulSet does not match the expected number of replicas.&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodDown</span></span>
<span class="line"><span style="color:#032F62;">        expr: | #根据环境修改</span></span>
<span class="line"><span style="color:#032F62;">          min_over_time(kube_pod_container_status_ready{pod!~&quot;.*job.*|.*jenkins.*&quot;} [1m])== 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1s # 持续多久确认报警信息</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;Container: {{ $labels.container }} down&#39;</span></span>
<span class="line"><span style="color:#032F62;">          message: &#39;Namespace: {{ $labels.namespace }}, Pod: {{ $labels.pod }} 服务不可用&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodOomKiller</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (kube_pod_container_status_restarts_total - kube_pod_container_status_restarts_total offset 10m &gt;= 1) and ignoring (reason)min_over_time(kube_pod_container_status_last_terminated_reason{reason=&quot;OOMKilled&quot;}[10m]) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 0m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: Kubernetes container oom killer (instance {{ $labels.instance }})</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} has been OOMKilled {{ $value }} times in the last 10 minutes.\\n  VALUE = {{ $value }}\\n  LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodCPUUsage</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(rate(container_cpu_usage_seconds_total{image!=&quot;&quot;}[5m]) * 100) by (pod, namespace) &gt; 90</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} CPU使用大于90% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodMemoryUsage</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(container_memory_rss{image!=&quot;&quot;}) by(pod, namespace)/sum(container_spec_memory_limit_bytes{image!=&quot;&quot;}) by(pod, namespace)* 100 != +inf &gt; 85</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">          pod: &#39;{{$labels.pod}}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} 内存使用大于85% (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: KubeDeploymentError</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_deployment_spec_replicas{job=&quot;kubernetes-service-endpoints&quot;} != kube_deployment_status_replicas_available{job=&quot;kubernetes-service-endpoints&quot;}</span></span>
<span class="line"><span style="color:#032F62;">        for: 3m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">          pod: &#39;{{$labels.deployment}}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Deployment {{ $labels.namespace }}/{{$labels.deployment }}控制器与实际数量不相符 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: coreDnsError</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_pod_container_status_running{container=&quot;coredns&quot;} == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} coreDns服务异常 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: kubeProxyError</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          kube_pod_container_status_running{container=&quot;kube-proxy&quot;} == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} kube-proxy服务异常 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodNetworkReceive</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(rate(container_network_receive_bytes_total{image!=&quot;&quot;,name=~&quot;^k8s_.*&quot;}[5m]) /1000) by (pod,namespace) &gt; 60000</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} 入口流量大于60MB/s (当前值: {{ $value }}K/s)&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PodNetworkTransmit</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(rate(container_network_transmit_bytes_total{image!=&quot;&quot;,name=~&quot;^k8s_.*&quot;}[5m]) /1000) by (pod,namespace) &gt; 60000</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;命名空间: {{ $labels.namespace }} | Pod名称: {{$labels.pod }} 出口流量大于60MB/s (当前值: {{ $value }}/K/s)&quot;</span></span></code></pre></div><h2 id="_3-3-volume-rules" tabindex="-1">3.3 Volume.rules <a class="header-anchor" href="#_3-3-volume-rules" aria-label="Permalink to &quot;3.3 Volume.rules&quot;">​</a></h2><p>基于NFS</p><p>pvc涉及参数:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">kube_persistentvolumeclaim_info 是一个预定义的指标，它提供了关于PVC的信息，包括它们的存储请求和限制</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">kube_persistentvolumeclaim_status_phase 指标提供了PVC的状态，例如Bound、Pending等</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">kube_persistentvolumeclaim_info 是一个预定义的指标，它提供了关于PVC的信息，包括它们的存储请求和限制</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">kube_persistentvolumeclaim_status_phase 指标提供了PVC的状态，例如Bound、Pending等</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407061030817.png" alt="image-20240706102956534"></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">volume.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: volume.rules</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PersistentVolumeClaimLost</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by(namespace, persistentvolumeclaim)(kube_persistentvolumeclaim_status_phase{phase=&quot;Lost&quot;}) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;PersistentVolumeClaim {{ $labels.namespace}}/{{ $labels.persistentvolumeclaim }} is lost!&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PersistentVolumeClaimPendig</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum by(namespace, persistentvolumeclaim)(kube_persistentvolumeclaim_status_phase{phase=&quot;Pendig&quot;}) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;PersistentVolumeClaim {{ $labels.namespace}}/{{ $labels.persistentvolumeclaim }} is pendig!&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PersistentVolume Failed</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(kube_persistentvolume_status_phase{phase=&quot;Failed&quot;,job=&quot;kubernetes-service-endpoints&quot;}) by (persistentvolume) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Persistent volume is failed state\\n VALUE ={{ $value }}\\n LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PersistentVolume Pending</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          sum(kube_persistentvolume_status_phase{phase=&quot;Pending&quot;,job=&quot;kubernetes-service-endpoints&quot;}) by (persistentvolume) == 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;Persistent volume is pending state\\n VALUE= {{ $value }}\\n LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: PVCUsageHigh</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (kubelet_volume_stats_used_bytes / kubelet_volume_stats_capacity_bytes) * 100 &gt; 80</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;PVC usage is above 85% (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;PVC {{ $labels.persistentvolumeclaim }} in namespace {{ $labels.namespace }} is using more than 85%,请相关人员及时处理！&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">volume.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: volume.rules</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PersistentVolumeClaimLost</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by(namespace, persistentvolumeclaim)(kube_persistentvolumeclaim_status_phase{phase=&quot;Lost&quot;}) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;PersistentVolumeClaim {{ $labels.namespace}}/{{ $labels.persistentvolumeclaim }} is lost!&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PersistentVolumeClaimPendig</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum by(namespace, persistentvolumeclaim)(kube_persistentvolumeclaim_status_phase{phase=&quot;Pendig&quot;}) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;PersistentVolumeClaim {{ $labels.namespace}}/{{ $labels.persistentvolumeclaim }} is pendig!&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PersistentVolume Failed</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(kube_persistentvolume_status_phase{phase=&quot;Failed&quot;,job=&quot;kubernetes-service-endpoints&quot;}) by (persistentvolume) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Persistent volume is failed state\\n VALUE ={{ $value }}\\n LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PersistentVolume Pending</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          sum(kube_persistentvolume_status_phase{phase=&quot;Pending&quot;,job=&quot;kubernetes-service-endpoints&quot;}) by (persistentvolume) == 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 2m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;Persistent volume is pending state\\n VALUE= {{ $value }}\\n LABELS = {{ $labels }}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: PVCUsageHigh</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (kubelet_volume_stats_used_bytes / kubelet_volume_stats_capacity_bytes) * 100 &gt; 80</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;PVC usage is above 85% (instance {{ $labels.instance }})&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;PVC {{ $labels.persistentvolumeclaim }} in namespace {{ $labels.namespace }} is using more than 85%,请相关人员及时处理！&quot;</span></span></code></pre></div><h2 id="_3-4-process-rules" tabindex="-1">3.4 Process.rules <a class="header-anchor" href="#_3-4-process-rules" aria-label="Permalink to &quot;3.4 Process.rules&quot;">​</a></h2><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051813759.png" alt="image-20240705181331503"></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">process.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: Process.rules</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: &#39;Process for docker already down!!!&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          (namedprocess_namegroup_num_procs{groupname=&quot;map[:docker]&quot;}) &lt; 1</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Process 停止工作&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;任务名称: docker | 正常进程数量: 1个 | 当前值: {{ $value }}，请相关人员及时处理！&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">process.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: Process.rules</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: &#39;Process for docker already down!!!&#39;</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          (namedprocess_namegroup_num_procs{groupname=&quot;map[:docker]&quot;}) &lt; 1</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Process 停止工作&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;任务名称: docker | 正常进程数量: 1个 | 当前值: {{ $value }}，请相关人员及时处理！&quot;</span></span></code></pre></div><blockquote><p>根据实际业务进行修改</p></blockquote><h2 id="_3-5-website-rules" tabindex="-1">3.5 Website.rules <a class="header-anchor" href="#_3-5-website-rules" aria-label="Permalink to &quot;3.5 Website.rules&quot;">​</a></h2><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051641180.png" alt="image-20240705164144755"></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">website.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: curlHttpStatus</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: &quot;业务报警: 网站不可访问&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: probe_http_status_code{job=&quot;blackbox-external-website&quot;} &gt;= 422 and probe_success{job=&quot;blackbox-external-website&quot;} == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;业务报警: 网站不可访问&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{$labels.instance}} 不可访问,请及时查看,当前状态码为{{$value}}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">website.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: curlHttpStatus</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: &quot;业务报警: 网站不可访问&quot;</span></span>
<span class="line"><span style="color:#032F62;">        expr: probe_http_status_code{job=&quot;blackbox-external-website&quot;} &gt;= 422 and probe_success{job=&quot;blackbox-external-website&quot;} == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;业务报警: 网站不可访问&#39;</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{$labels.instance}} 不可访问,请及时查看,当前状态码为{{$value}}&#39;</span></span></code></pre></div><blockquote><p>job根据自己环境修改</p></blockquote><h2 id="_3-6-ssl-rules" tabindex="-1">3.6 ssl.rules <a class="header-anchor" href="#_3-6-ssl-rules" aria-label="Permalink to &quot;3.6 ssl.rules&quot;">​</a></h2><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051627814.png" alt="image-20240705162731450"></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ssl.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &quot;ssl证书过期时间检查&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: &quot;ssl证书过期警告&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: (ssl_cert_not_after-time())/3600/24 &lt;7</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 3h</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;证书{{ $labels.instance }}还有{{ printf &quot;%.1f&quot; $value }}天就过期了,请尽快更新证书&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;ssl证书过期警告&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: &quot;ssl证书检查异常&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: ssl_probe_success == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;ssl证书检查异常&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;证书 {{ $labels.instance }} 识别失败，请检查&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ssl.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &quot;ssl证书过期时间检查&quot;</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: &quot;ssl证书过期警告&quot;</span></span>
<span class="line"><span style="color:#032F62;">        expr: (ssl_cert_not_after-time())/3600/24 &lt;7</span></span>
<span class="line"><span style="color:#032F62;">        for: 3h</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;证书{{ $labels.instance }}还有{{ printf &quot;%.1f&quot; $value }}天就过期了,请尽快更新证书&#39;</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;ssl证书过期警告&quot;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: &quot;ssl证书检查异常&quot;</span></span>
<span class="line"><span style="color:#032F62;">        expr: ssl_probe_success == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;ssl证书检查异常&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;证书 {{ $labels.instance }} 识别失败，请检查&quot;</span></span></code></pre></div><ul><li>热更新</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre></div><h2 id="_3-7-domain-rules" tabindex="-1">3.7 domain.rules <a class="header-anchor" href="#_3-7-domain-rules" aria-label="Permalink to &quot;3.7 domain.rules&quot;">​</a></h2><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407070008944.png" alt="image-20240707000837528"></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">groups</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">域名检测失败</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain_probe_success == 0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">2h</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{ $labels.instance }} ,域名检测&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{ $labels.domain }}, 域名检测失败,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">域名过期</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain_expiry_days &lt; 15</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">2h</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{ $labels.domain }},将在15天后过期,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">域名过期</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain_expiry_days &lt; 5</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">2h</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{ $labels.domain }},将在5天后过期,请及时查看!!!&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">groups</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">域名检测失败</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain_probe_success == 0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">2h</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{ $labels.instance }} ,域名检测&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{ $labels.domain }}, 域名检测失败,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">域名过期</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain_expiry_days &lt; 15</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">2h</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{ $labels.domain }},将在15天后过期,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">域名过期</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain_expiry_days &lt; 5</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">2h</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{ $labels.domain }},将在5天后过期,请及时查看!!!&#39;</span></span></code></pre></div><ul><li>对某个域名进行探测</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">blackbox-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DomainAccessDelayExceeds0.5s</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">域名：{{ $labels.instance }} 探测延迟大于 0.5 秒，当前延迟为：{{ $value }}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">域名探测，访问延迟超过 0.5 秒</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sum(probe_http_duration_seconds{job=~&quot;blackbox&quot;}) by (instance) &gt; 0.5</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">blackbox</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">blackbox-exporter</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DomainAccessDelayExceeds0.5s</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">域名：{{ $labels.instance }} 探测延迟大于 0.5 秒，当前延迟为：{{ $value }}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">域名探测，访问延迟超过 0.5 秒</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sum(probe_http_duration_seconds{job=~&quot;blackbox&quot;}) by (instance) &gt; 0.5</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">blackbox</span></span></code></pre></div><ul><li>格式化</li></ul><p>格式化下告警规则中的 <code>$value</code> 变量，有三种格式化数值的方法：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407251537788.png" alt="image-20240725153651426"></p><p><a href="https://blog.csdn.net/weixin_43798031/article/details/127488164?spm=1001.2014.3001.5502" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_43798031/article/details/127488164?spm=1001.2014.3001.5502</a></p><p><a href="https://help.aliyun.com/zh/ack/ack-managed-and-ack-dedicated/user-guide/best-practices-for-configuring-alert-rules-in-prometheus#4b57adc10aseg" target="_blank" rel="noreferrer">https://help.aliyun.com/zh/ack/ack-managed-and-ack-dedicated/user-guide/best-practices-for-configuring-alert-rules-in-prometheus#4b57adc10aseg</a></p><p><a href="https://heapdump.cn/article/6790528" target="_blank" rel="noreferrer">https://heapdump.cn/article/6790528</a></p><p><a href="https://www.ctq6.cn/prometheus%E7%9B%91%E6%8E%A7%E8%A7%84%E5%88%99%E8%AF%B4%E6%98%8E/#kubernetes-%E5%AD%98%E5%82%A8%E7%9B%B8%E5%85%B3" target="_blank" rel="noreferrer">https://www.ctq6.cn/prometheus监控规则说明/#kubernetes-存储相关</a></p>`,72),o=[p];function t(c,r,i,y,F,u){return n(),a("div",null,o)}const d=s(e,[["render",t]]);export{m as __pageData,d as default};
