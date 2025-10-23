import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const p="/assets/modb_20220110_21c6c8ec-71b7-11ec-b076-fa163eb4f6be.WLP8OwhX.png",d=JSON.parse('{"title":"1、rabbitmq_exporter采集介绍","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/rabbitmq/10-Prometheus.md","filePath":"guide/Database/rabbitmq/10-Prometheus.md","lastUpdated":1710405635000}'),l={name:"guide/Database/rabbitmq/10-Prometheus.md"},o=e('<p>第一种：RabbitMQ内部集成Prometheus来获取指标</p><ul><li>3.8.0之前版本，RabbitMQ可以使用单独的插件prometheus_rabbitmq_exporter来向Prometheus公开指标，要单独下载到RabbitMQ安装目录中进行安装；</li></ul><p>prometheus_rabbitmq_exporter：<a href="https://github.com/deadtrickster/prometheus_rabbitmq_exporter" target="_blank" rel="noreferrer">https://github.com/deadtrickster/prometheus_rabbitmq_exporter</a></p><ul><li>3.8.0版开始，RabbitMQ附带了内置的Prometheus＆Grafana支持。虽然内置了该插件，但也要进行安装</li></ul><p>rabbitmq-prometheus：<a href="https://github.com/rabbitmq/rabbitmq-prometheus" target="_blank" rel="noreferrer">https://github.com/rabbitmq/rabbitmq-prometheus</a></p><p>第二种：使用独立程序来获取指标（RabbitMQ_exporter）</p><p>不管什么版本都能使用，要单独启动exporter进程</p><p>rabbitmq_exporter：<a href="https://github.com/kbudde/rabbitmq_exporter" target="_blank" rel="noreferrer">https://github.com/kbudde/rabbitmq_exporter</a></p><p>RabbitMQ 官方监控介绍：</p><ul><li><a href="https://www.rabbitmq.com/monitoring.html" target="_blank" rel="noreferrer">https://www.rabbitmq.com/monitoring.html</a></li><li><a href="https://www.rabbitmq.com/prometheus.html#overview-prometheus" target="_blank" rel="noreferrer">https://www.rabbitmq.com/prometheus.html#overview-prometheus</a></li></ul><h1 id="_1、rabbitmq-exporter采集介绍" tabindex="-1">1、rabbitmq_exporter采集介绍 <a class="header-anchor" href="#_1、rabbitmq-exporter采集介绍" aria-label="Permalink to &quot;1、rabbitmq_exporter采集介绍&quot;">​</a></h1><p>rabbitmq_exporter通过读取rabbitmq中一些监控数据消息，并将其转换成prometheus指标格式并暴露http接口被prometheus采集：</p><p><img src="'+p+`" alt=""></p><h1 id="_2、部署rabbitmq-exporter" tabindex="-1">2、部署rabbitmq_exporter <a class="header-anchor" href="#_2、部署rabbitmq-exporter" aria-label="Permalink to &quot;2、部署rabbitmq_exporter&quot;">​</a></h1><p><a href="https://github.com/kbudde/rabbitmq_exporter" target="_blank" rel="noreferrer">https://github.com/kbudde/rabbitmq_exporter</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@node1 prometheus]# wget https://github.com/kbudde/rabbitmq_exporter/releases/download/v1.0.0-RC7/rabbitmq_exporter-1.0.0-RC7.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@node1 prometheus]# tar xf rabbitmq_exporter-1.0.0-RC7.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@node1 prometheus]# mv -f rabbitmq_exporter-1.0.0-RC7.linux-amd64/ rabbitmq_exporter</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@node1 prometheus]# cd rabbitmq_exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@node1 prometheus]# wget https://github.com/kbudde/rabbitmq_exporter/releases/download/v1.0.0-RC7/rabbitmq_exporter-1.0.0-RC7.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">[root@node1 prometheus]# tar xf rabbitmq_exporter-1.0.0-RC7.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">[root@node1 prometheus]# mv -f rabbitmq_exporter-1.0.0-RC7.linux-amd64/ rabbitmq_exporter</span></span>
<span class="line"><span style="color:#24292e;">[root@node1 prometheus]# cd rabbitmq_exporter</span></span></code></pre></div><ul><li>配置文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">vim config.example.json</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;rabbit_url&quot;: &quot;http://127.0.0.1:15672&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;rabbit_user&quot;: &quot;guest&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;rabbit_pass&quot;: &quot;guest&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;publish_port&quot;: &quot;9419&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;publish_addr&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;output_format&quot;: &quot;TTY&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;ca_file&quot;: &quot;ca.pem&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;cert_file&quot;: &quot;client-cert.pem&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;key_file&quot;: &quot;client-key.pem&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;insecure_skip_verify&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;exlude_metrics&quot;: [],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;include_exchanges&quot;: &quot;.*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;skip_exchanges&quot;: &quot;^$&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;include_queues&quot;: &quot;.*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;skip_queues&quot;: &quot;^$&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;skip_vhost&quot;: &quot;^$&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;include_vhost&quot;: &quot;.*&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;rabbit_capabilities&quot;: &quot;no_sort,bert&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;aliveness_vhost&quot;: &quot;/&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;enabled_exporters&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;exchange&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;node&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;overview&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;queue&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;aliveness&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;timeout&quot;: 30,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;max_queues&quot;: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">vim config.example.json</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;rabbit_url&quot;: &quot;http://127.0.0.1:15672&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;rabbit_user&quot;: &quot;guest&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;rabbit_pass&quot;: &quot;guest&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;publish_port&quot;: &quot;9419&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;publish_addr&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;output_format&quot;: &quot;TTY&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;ca_file&quot;: &quot;ca.pem&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;cert_file&quot;: &quot;client-cert.pem&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;key_file&quot;: &quot;client-key.pem&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;insecure_skip_verify&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;exlude_metrics&quot;: [],</span></span>
<span class="line"><span style="color:#24292e;">    &quot;include_exchanges&quot;: &quot;.*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;skip_exchanges&quot;: &quot;^$&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;include_queues&quot;: &quot;.*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;skip_queues&quot;: &quot;^$&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;skip_vhost&quot;: &quot;^$&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;include_vhost&quot;: &quot;.*&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;rabbit_capabilities&quot;: &quot;no_sort,bert&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;aliveness_vhost&quot;: &quot;/&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;enabled_exporters&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">            &quot;exchange&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;node&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;overview&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;queue&quot;,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;aliveness&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">    &quot;timeout&quot;: 30,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;max_queues&quot;: 0</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="配置rabbitmq-exporter服务启动" tabindex="-1">配置rabbitmq_exporter服务启动 <a class="header-anchor" href="#配置rabbitmq-exporter服务启动" aria-label="Permalink to &quot;配置rabbitmq_exporter服务启动&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@node1 rabbitmq_exporter]# cat /usr/lib/systemd/system/rabbitmq_exporter.service</span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">User=root</span></span>
<span class="line"><span style="color:#e1e4e8;">Group=root</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/data/prometheus/rabbitmq_exporter/rabbitmq_exporter -config-file /data/prometheus/rabbitmq_exporter/config.json</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description=node_exporter</span></span>
<span class="line"><span style="color:#e1e4e8;">After=network.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@node1 rabbitmq_exporter]# cat /usr/lib/systemd/system/rabbitmq_exporter.service</span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">User=root</span></span>
<span class="line"><span style="color:#24292e;">Group=root</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/data/prometheus/rabbitmq_exporter/rabbitmq_exporter -config-file /data/prometheus/rabbitmq_exporter/config.json</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description=node_exporter</span></span>
<span class="line"><span style="color:#24292e;">After=network.target</span></span></code></pre></div><h1 id="_3、添加采集监控配置" tabindex="-1">3、添加采集监控配置 <a class="header-anchor" href="#_3、添加采集监控配置" aria-label="Permalink to &quot;3、添加采集监控配置&quot;">​</a></h1><p>采集多个rabbitmq_exporter通常用label加以区分</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">    scrape_configs:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 线上rabbitmq 监控</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    - job_name: &#39;prod-rabbitmq01&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      honor_timestamps: true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      scrape_interval: 30s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      scrape_timeout: 10s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      metrics_path: /metrics</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      scheme: http</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      static_configs:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        - targets: [&#39;10.x.x.47:9099&#39;]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          labels:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            instance: prod-rabbitmq-01</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    # 线上rabbitmq-seckill 监控</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    - job_name: &#39;prod-rabbitmq02&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      static_configs:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        - targets: [&#39;10.0.x.x:19099&#39;]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          labels:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            instance: prod-rabbitmq-02</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">    scrape_configs:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 线上rabbitmq 监控</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    - job_name: &#39;prod-rabbitmq01&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      honor_timestamps: true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      scrape_interval: 30s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      scrape_timeout: 10s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      metrics_path: /metrics</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      scheme: http</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      static_configs:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        - targets: [&#39;10.x.x.47:9099&#39;]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          labels:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            instance: prod-rabbitmq-01</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    # 线上rabbitmq-seckill 监控</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    - job_name: &#39;prod-rabbitmq02&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      static_configs:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        - targets: [&#39;10.0.x.x:19099&#39;]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          labels:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            instance: prod-rabbitmq-02</span></span></code></pre></div><h1 id="_4、添加监控面板" tabindex="-1">4、添加监控面板 <a class="header-anchor" href="#_4、添加监控面板" aria-label="Permalink to &quot;4、添加监控面板&quot;">​</a></h1><h1 id="_5添加告警alter-rule" tabindex="-1">5添加告警Alter Rule <a class="header-anchor" href="#_5添加告警alter-rule" aria-label="Permalink to &quot;5添加告警Alter Rule&quot;">​</a></h1><p><a href="https://chenzhonzhou.github.io/2020/04/02/prometheusalert-duo-qu-dao-gao-jing-tong-zhi-gong-ju/" target="_blank" rel="noreferrer">https://chenzhonzhou.github.io/2020/04/02/prometheusalert-duo-qu-dao-gao-jing-tong-zhi-gong-ju/</a></p><p>编辑prometheus-rule文件添加</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> #mq 节点状态</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      - alert: rabbitmq-status</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        expr: rabbitmq_running{job=&quot;prod-rabbitmq&quot;} != 1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        for: 10s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        labels:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          severity: 严重</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          app: ops</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          summary: &quot;rabbitmq Instance down&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          description: &quot;生产rabbitmq:{{ $labels.node }} 节点宕机 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      #mq节点内存使用</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      - alert: rabbitmq-node_mem_used</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        expr: rabbitmq_node_mem_used_re{job=&quot;prod-rabbitmq&quot;} / rabbitmq_node_mem_limit_re{job=&quot;prod-rabbitmq&quot;}  &gt; 0.8</span></span>
<span class="line"><span style="color:#e1e4e8;">        for: 10s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        labels:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          severity: 严重</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          app: ops</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          summary: &quot;rabbitmq pod节点内存使用&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          description:&quot;rabbitmq:{{ $labels.node }} 内存实际使用超80% (当前值: {{ $value }})&quot;  </span></span>
<span class="line"><span style="color:#e1e4e8;">          </span></span>
<span class="line"><span style="color:#e1e4e8;">          </span></span>
<span class="line"><span style="color:#e1e4e8;">          </span></span>
<span class="line"><span style="color:#e1e4e8;">  #mq堆积消息监控</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      - alert: rabbitmq_queue_messages_unack</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        expr: sum by (queue ,job)(rabbitmq_queue_messages_unacknowledged{job=&quot;prod-rabbitmq&quot;}) &gt; 500</span></span>
<span class="line"><span style="color:#e1e4e8;">       for: 5m</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        labels:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          severity: critical</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          app: ops</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          summary: &quot;{{ $labels.queue }} MQ队列unack消息&gt; 500 &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          description: &quot;{{ $labels.queue }} MQ队列unack消息&gt; 500 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">           #MQ推送错误监控</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      - alert: PushMqFailed</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        expr:  sum by (job) (rabbitmq_failed_to_publish_total{job != &quot;&quot;}) &gt;5</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        for: 30s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        labels:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          severity: critical</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          app: ops</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          summary: &quot;{{ $labels.job }} {{ $labels.instance }} 推送MQ 错误大于5 &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          description: &quot;{{ $labels.job }} {{ $labels.instance }} 推送MQ 错误大于5 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">  #mq队列消息监控</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      - alert: rabbitmq_queue_messages_ready</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        expr: sum by(queue ,job) (rabbitmq_queue_messages_ready_re{job=&quot;prod-rabbitmq&quot;}) </span></span>
<span class="line"><span style="color:#e1e4e8;">   </span></span>
<span class="line"><span style="color:#e1e4e8;">        for: 5m</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        labels:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          severity: critical</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          app: ops</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          summary: &quot;{{ $labels.queue }} MQ队列ready消息&gt; 500 &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">          description: &quot;{{ $labels.queue }} MQ队列ready消息数&gt; 5000 持续10min (当前值: {{ $value }})&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> #mq 节点状态</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      - alert: rabbitmq-status</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        expr: rabbitmq_running{job=&quot;prod-rabbitmq&quot;} != 1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        for: 10s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        labels:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          severity: 严重</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          app: ops</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        annotations:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          summary: &quot;rabbitmq Instance down&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          description: &quot;生产rabbitmq:{{ $labels.node }} 节点宕机 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      #mq节点内存使用</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      - alert: rabbitmq-node_mem_used</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        expr: rabbitmq_node_mem_used_re{job=&quot;prod-rabbitmq&quot;} / rabbitmq_node_mem_limit_re{job=&quot;prod-rabbitmq&quot;}  &gt; 0.8</span></span>
<span class="line"><span style="color:#24292e;">        for: 10s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        labels:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          severity: 严重</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          app: ops</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        annotations:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          summary: &quot;rabbitmq pod节点内存使用&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          description:&quot;rabbitmq:{{ $labels.node }} 内存实际使用超80% (当前值: {{ $value }})&quot;  </span></span>
<span class="line"><span style="color:#24292e;">          </span></span>
<span class="line"><span style="color:#24292e;">          </span></span>
<span class="line"><span style="color:#24292e;">          </span></span>
<span class="line"><span style="color:#24292e;">  #mq堆积消息监控</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      - alert: rabbitmq_queue_messages_unack</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        expr: sum by (queue ,job)(rabbitmq_queue_messages_unacknowledged{job=&quot;prod-rabbitmq&quot;}) &gt; 500</span></span>
<span class="line"><span style="color:#24292e;">       for: 5m</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        labels:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          severity: critical</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          app: ops</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        annotations:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          summary: &quot;{{ $labels.queue }} MQ队列unack消息&gt; 500 &quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          description: &quot;{{ $labels.queue }} MQ队列unack消息&gt; 500 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#24292e;">           #MQ推送错误监控</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      - alert: PushMqFailed</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        expr:  sum by (job) (rabbitmq_failed_to_publish_total{job != &quot;&quot;}) &gt;5</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        for: 30s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        labels:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          severity: critical</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          app: ops</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        annotations:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          summary: &quot;{{ $labels.job }} {{ $labels.instance }} 推送MQ 错误大于5 &quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          description: &quot;{{ $labels.job }} {{ $labels.instance }} 推送MQ 错误大于5 (当前值: {{ $value }})&quot;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">  #mq队列消息监控</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      - alert: rabbitmq_queue_messages_ready</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        expr: sum by(queue ,job) (rabbitmq_queue_messages_ready_re{job=&quot;prod-rabbitmq&quot;}) </span></span>
<span class="line"><span style="color:#24292e;">   </span></span>
<span class="line"><span style="color:#24292e;">        for: 5m</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        labels:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          severity: critical</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          app: ops</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        annotations:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          summary: &quot;{{ $labels.queue }} MQ队列ready消息&gt; 500 &quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">          description: &quot;{{ $labels.queue }} MQ队列ready消息数&gt; 5000 持续10min (当前值: {{ $value }})&quot;</span></span></code></pre></div>`,28),t=[o];function r(c,i,u,y,q,b){return n(),a("div",null,t)}const _=s(l,[["render",r]]);export{d as __pageData,_ as default};
