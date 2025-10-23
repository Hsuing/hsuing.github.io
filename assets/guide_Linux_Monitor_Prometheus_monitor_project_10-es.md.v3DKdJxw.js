import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/monitor_project/10-es.md","filePath":"guide/Linux/Monitor/Prometheus/monitor_project/10-es.md","lastUpdated":1732185027000}'),e={name:"guide/Linux/Monitor/Prometheus/monitor_project/10-es.md"},p=l(`<p>规则</p><p>elasticsearch.rules</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALERT Elastic_UP</span></span>
<span class="line"><span style="color:#e1e4e8;">  IF elasticsearch_up{job=&quot;elasticsearch&quot;} != 1</span></span>
<span class="line"><span style="color:#e1e4e8;">  FOR 120s</span></span>
<span class="line"><span style="color:#e1e4e8;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;Instance {{ $labels.instance }}: Elasticsearch instance status is not 1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;This server&#39;s Elasticsearch instance status has a value of {{ $value }}.&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elastic_Cluster_Health_RED</span></span>
<span class="line"><span style="color:#e1e4e8;">  IF elasticsearch_cluster_health_status{color=&quot;red&quot;}==1</span></span>
<span class="line"><span style="color:#e1e4e8;">  FOR 300s</span></span>
<span class="line"><span style="color:#e1e4e8;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}.&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elastic_Cluster_Health_Yellow</span></span>
<span class="line"><span style="color:#e1e4e8;">  IF elasticsearch_cluster_health_status{color=&quot;yellow&quot;}==1</span></span>
<span class="line"><span style="color:#e1e4e8;">  FOR 300s</span></span>
<span class="line"><span style="color:#e1e4e8;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}.&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_JVM_Heap_Too_High</span></span>
<span class="line"><span style="color:#e1e4e8;"> IF elasticsearch_jvm_memory_used_bytes{area=&quot;heap&quot;} / elasticsearch_jvm_memory_max_bytes{area=&quot;heap&quot;} &gt; 0.8</span></span>
<span class="line"><span style="color:#e1e4e8;"> FOR 15m</span></span>
<span class="line"><span style="color:#e1e4e8;"> LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;ElasticSearch node {{ $labels.instance }} heap usage is high&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;The heap in {{ $labels.instance }} is over 80% for 15m.&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_health_up</span></span>
<span class="line"><span style="color:#e1e4e8;"> IF elasticsearch_cluster_health_up !=1</span></span>
<span class="line"><span style="color:#e1e4e8;"> FOR 1m</span></span>
<span class="line"><span style="color:#e1e4e8;"> LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;ElasticSearch node: {{ $labels.instance }} last scrape of the ElasticSearch cluster health failed&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;ElasticSearch node: {{ $labels.instance }} last scrape of the ElasticSearch cluster health failed&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_Too_Few_Nodes_Running</span></span>
<span class="line"><span style="color:#e1e4e8;">  IF elasticsearch_cluster_health_number_of_nodes &lt; 3</span></span>
<span class="line"><span style="color:#e1e4e8;">  FOR 5m</span></span>
<span class="line"><span style="color:#e1e4e8;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    description=&quot;There are only {{$value}} &lt; 3 ElasticSearch nodes running&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary=&quot;ElasticSearch running on less than 3 nodes&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_Count_of_JVM_GC_Runs</span></span>
<span class="line"><span style="color:#e1e4e8;"> IF rate(elasticsearch_jvm_gc_collection_seconds_count{}[5m])&gt;5</span></span>
<span class="line"><span style="color:#e1e4e8;"> FOR 60s</span></span>
<span class="line"><span style="color:#e1e4e8;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs &gt; 5 per sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs &gt; 5 per sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_GC_Run_Time</span></span>
<span class="line"><span style="color:#e1e4e8;"> IF rate(elasticsearch_jvm_gc_collection_seconds_sum[5m])&gt;0.3</span></span>
<span class="line"><span style="color:#e1e4e8;"> FOR 60s</span></span>
<span class="line"><span style="color:#e1e4e8;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: GC run time in seconds &gt; 0.3 sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;ElasticSearch node {{ $labels.instance }}: GC run time in seconds &gt; 0.3 sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_json_parse_failures</span></span>
<span class="line"><span style="color:#e1e4e8;"> IF elasticsearch_cluster_health_json_parse_failures&gt;0</span></span>
<span class="line"><span style="color:#e1e4e8;"> FOR 60s</span></span>
<span class="line"><span style="color:#e1e4e8;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: json parse failures &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;ElasticSearch node {{ $labels.instance }}: json parse failures &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_breakers_tripped</span></span>
<span class="line"><span style="color:#e1e4e8;"> IF rate(elasticsearch_breakers_tripped{}[5m])&gt;0</span></span>
<span class="line"><span style="color:#e1e4e8;"> FOR 60s</span></span>
<span class="line"><span style="color:#e1e4e8;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALERT Elasticsearch_health_timed_out</span></span>
<span class="line"><span style="color:#e1e4e8;"> IF elasticsearch_cluster_health_timed_out&gt;0</span></span>
<span class="line"><span style="color:#e1e4e8;"> FOR 60s</span></span>
<span class="line"><span style="color:#e1e4e8;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#e1e4e8;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#e1e4e8;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: Number of cluster health checks timed out &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    description = &quot;ElasticSearch node {{ $labels.instance }}: Number of cluster health checks timed out &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALERT Elastic_UP</span></span>
<span class="line"><span style="color:#24292e;">  IF elasticsearch_up{job=&quot;elasticsearch&quot;} != 1</span></span>
<span class="line"><span style="color:#24292e;">  FOR 120s</span></span>
<span class="line"><span style="color:#24292e;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;Instance {{ $labels.instance }}: Elasticsearch instance status is not 1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;This server&#39;s Elasticsearch instance status has a value of {{ $value }}.&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elastic_Cluster_Health_RED</span></span>
<span class="line"><span style="color:#24292e;">  IF elasticsearch_cluster_health_status{color=&quot;red&quot;}==1</span></span>
<span class="line"><span style="color:#24292e;">  FOR 300s</span></span>
<span class="line"><span style="color:#24292e;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}.&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elastic_Cluster_Health_Yellow</span></span>
<span class="line"><span style="color:#24292e;">  IF elasticsearch_cluster_health_status{color=&quot;yellow&quot;}==1</span></span>
<span class="line"><span style="color:#24292e;">  FOR 300s</span></span>
<span class="line"><span style="color:#24292e;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;Instance {{ $labels.instance }}: not all primary and replica shards are allocated in elasticsearch cluster {{ $labels.cluster }}.&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_JVM_Heap_Too_High</span></span>
<span class="line"><span style="color:#24292e;"> IF elasticsearch_jvm_memory_used_bytes{area=&quot;heap&quot;} / elasticsearch_jvm_memory_max_bytes{area=&quot;heap&quot;} &gt; 0.8</span></span>
<span class="line"><span style="color:#24292e;"> FOR 15m</span></span>
<span class="line"><span style="color:#24292e;"> LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;ElasticSearch node {{ $labels.instance }} heap usage is high&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;The heap in {{ $labels.instance }} is over 80% for 15m.&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_health_up</span></span>
<span class="line"><span style="color:#24292e;"> IF elasticsearch_cluster_health_up !=1</span></span>
<span class="line"><span style="color:#24292e;"> FOR 1m</span></span>
<span class="line"><span style="color:#24292e;"> LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;ElasticSearch node: {{ $labels.instance }} last scrape of the ElasticSearch cluster health failed&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;ElasticSearch node: {{ $labels.instance }} last scrape of the ElasticSearch cluster health failed&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_Too_Few_Nodes_Running</span></span>
<span class="line"><span style="color:#24292e;">  IF elasticsearch_cluster_health_number_of_nodes &lt; 3</span></span>
<span class="line"><span style="color:#24292e;">  FOR 5m</span></span>
<span class="line"><span style="color:#24292e;">  LABELS { severity=&quot;alert&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;">  ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    description=&quot;There are only {{$value}} &lt; 3 ElasticSearch nodes running&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    summary=&quot;ElasticSearch running on less than 3 nodes&quot;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_Count_of_JVM_GC_Runs</span></span>
<span class="line"><span style="color:#24292e;"> IF rate(elasticsearch_jvm_gc_collection_seconds_count{}[5m])&gt;5</span></span>
<span class="line"><span style="color:#24292e;"> FOR 60s</span></span>
<span class="line"><span style="color:#24292e;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs &gt; 5 per sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs &gt; 5 per sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_GC_Run_Time</span></span>
<span class="line"><span style="color:#24292e;"> IF rate(elasticsearch_jvm_gc_collection_seconds_sum[5m])&gt;0.3</span></span>
<span class="line"><span style="color:#24292e;"> FOR 60s</span></span>
<span class="line"><span style="color:#24292e;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: GC run time in seconds &gt; 0.3 sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;ElasticSearch node {{ $labels.instance }}: GC run time in seconds &gt; 0.3 sec and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_json_parse_failures</span></span>
<span class="line"><span style="color:#24292e;"> IF elasticsearch_cluster_health_json_parse_failures&gt;0</span></span>
<span class="line"><span style="color:#24292e;"> FOR 60s</span></span>
<span class="line"><span style="color:#24292e;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: json parse failures &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;ElasticSearch node {{ $labels.instance }}: json parse failures &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_breakers_tripped</span></span>
<span class="line"><span style="color:#24292e;"> IF rate(elasticsearch_breakers_tripped{}[5m])&gt;0</span></span>
<span class="line"><span style="color:#24292e;"> FOR 60s</span></span>
<span class="line"><span style="color:#24292e;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALERT Elasticsearch_health_timed_out</span></span>
<span class="line"><span style="color:#24292e;"> IF elasticsearch_cluster_health_timed_out&gt;0</span></span>
<span class="line"><span style="color:#24292e;"> FOR 60s</span></span>
<span class="line"><span style="color:#24292e;"> LABELS { severity=&quot;warning&quot;, value = &quot;{{$value}}&quot; }</span></span>
<span class="line"><span style="color:#24292e;"> ANNOTATIONS {</span></span>
<span class="line"><span style="color:#24292e;">    summary = &quot;ElasticSearch node {{ $labels.instance }}: Number of cluster health checks timed out &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    description = &quot;ElasticSearch node {{ $labels.instance }}: Number of cluster health checks timed out &gt; 0 and has a value of {{ $value }}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">groups</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elastic_UP</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_up{job=&quot;elasticsearch&quot;} != 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">2m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alert</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">This server&#39;s Elasticsearch instance status has a value of {{ $value</span></span>
<span class="line"><span style="color:#E1E4E8;">            }}</span><span style="color:#79B8FF;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Instance {{ $labels.instance }}: Elasticsearch instance status is</span></span>
<span class="line"><span style="color:#9ECBFF;">        not 1&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elastic_Cluster_Health_RED</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_cluster_health_status{color=&quot;red&quot;} == 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alert</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#9ECBFF;">        are allocated in elasticsearch cluster {{ $labels.cluster }}.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#9ECBFF;">        are allocated in elasticsearch cluster {{ $labels.cluster }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elastic_Cluster_Health_Yellow</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_cluster_health_status{color=&quot;yellow&quot;} == 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alert</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#9ECBFF;">        are allocated in elasticsearch cluster {{ $labels.cluster }}.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#9ECBFF;">        are allocated in elasticsearch cluster {{ $labels.cluster }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_JVM_Heap_Too_High</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_jvm_memory_used_bytes{area=&quot;heap&quot;} / elasticsearch_jvm_memory_max_bytes{area=&quot;heap&quot;}</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">&gt;</span><span style="color:#FDAEB7;font-style:italic;"> 0.8</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 15m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: alert</span></span>
<span class="line"><span style="color:#9ECBFF;">          value: &#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: The heap in {{ $labels.instance }} is over 80% for 15m.</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: ElasticSearch node {{ $labels.instance }} heap usage is high</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_health_up</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_cluster_health_up != 1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alert</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node: {{ $labels.instance }} last scrape of the</span></span>
<span class="line"><span style="color:#9ECBFF;">        ElasticSearch cluster health failed&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node: {{ $labels.instance }} last scrape of the ElasticSearch</span></span>
<span class="line"><span style="color:#9ECBFF;">        cluster health failed&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_Too_Few_Nodes_Running</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_cluster_health_number_of_nodes &lt; 3</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alert</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">There are only {{$value}} &lt; 3 ElasticSearch nodes running</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ElasticSearch running on less than 3 nodes</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_Count_of_JVM_GC_Runs</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rate(elasticsearch_jvm_gc_collection_seconds_count[5m]) &gt; 5</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs</span></span>
<span class="line"><span style="color:#9ECBFF;">        &gt; 5 per sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs &gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">        5 per sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_GC_Run_Time</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rate(elasticsearch_jvm_gc_collection_seconds_sum[5m]) &gt; 0.3</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: GC run time in seconds</span></span>
<span class="line"><span style="color:#9ECBFF;">        &gt; 0.3 sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: GC run time in seconds</span></span>
<span class="line"><span style="color:#9ECBFF;">        &gt; 0.3 sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_json_parse_failures</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_cluster_health_json_parse_failures &gt; 0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: json parse failures</span></span>
<span class="line"><span style="color:#9ECBFF;">        &gt; 0 and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: json parse failures &gt; 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_breakers_tripped</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rate(elasticsearch_breakers_tripped[5m]) &gt; 0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">        0 and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt; 0 and</span></span>
<span class="line"><span style="color:#9ECBFF;">        has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">alert</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Elasticsearch_health_timed_out</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">expr</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elasticsearch_cluster_health_timed_out &gt; 0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">for</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">severity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">warning</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">annotations</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: Number of cluster health</span></span>
<span class="line"><span style="color:#9ECBFF;">        checks timed out &gt; 0 and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">summary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;ElasticSearch node {{ $labels.instance }}: Number of cluster health</span></span>
<span class="line"><span style="color:#9ECBFF;">        checks timed out &gt; 0 and has a value of {{ $value }}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">groups</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elastic_UP</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_up{job=&quot;elasticsearch&quot;} != 1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">2m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alert</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">This server&#39;s Elasticsearch instance status has a value of {{ $value</span></span>
<span class="line"><span style="color:#24292E;">            }}</span><span style="color:#005CC5;">.</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Instance {{ $labels.instance }}: Elasticsearch instance status is</span></span>
<span class="line"><span style="color:#032F62;">        not 1&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elastic_Cluster_Health_RED</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_cluster_health_status{color=&quot;red&quot;} == 1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alert</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#032F62;">        are allocated in elasticsearch cluster {{ $labels.cluster }}.&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#032F62;">        are allocated in elasticsearch cluster {{ $labels.cluster }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elastic_Cluster_Health_Yellow</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_cluster_health_status{color=&quot;yellow&quot;} == 1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alert</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#032F62;">        are allocated in elasticsearch cluster {{ $labels.cluster }}.&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Instance {{ $labels.instance }}: not all primary and replica shards</span></span>
<span class="line"><span style="color:#032F62;">        are allocated in elasticsearch cluster {{ $labels.cluster }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_JVM_Heap_Too_High</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_jvm_memory_used_bytes{area=&quot;heap&quot;} / elasticsearch_jvm_memory_max_bytes{area=&quot;heap&quot;}</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">&gt;</span><span style="color:#B31D28;font-style:italic;"> 0.8</span></span>
<span class="line"><span style="color:#032F62;">        for: 15m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: alert</span></span>
<span class="line"><span style="color:#032F62;">          value: &#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          description: The heap in {{ $labels.instance }} is over 80% for 15m.</span></span>
<span class="line"><span style="color:#032F62;">          summary: ElasticSearch node {{ $labels.instance }} heap usage is high</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_health_up</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_cluster_health_up != 1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alert</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node: {{ $labels.instance }} last scrape of the</span></span>
<span class="line"><span style="color:#032F62;">        ElasticSearch cluster health failed&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node: {{ $labels.instance }} last scrape of the ElasticSearch</span></span>
<span class="line"><span style="color:#032F62;">        cluster health failed&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_Too_Few_Nodes_Running</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_cluster_health_number_of_nodes &lt; 3</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alert</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">There are only {{$value}} &lt; 3 ElasticSearch nodes running</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ElasticSearch running on less than 3 nodes</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_Count_of_JVM_GC_Runs</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rate(elasticsearch_jvm_gc_collection_seconds_count[5m]) &gt; 5</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs</span></span>
<span class="line"><span style="color:#032F62;">        &gt; 5 per sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: Count of JVM GC runs &gt;</span></span>
<span class="line"><span style="color:#032F62;">        5 per sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_GC_Run_Time</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rate(elasticsearch_jvm_gc_collection_seconds_sum[5m]) &gt; 0.3</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: GC run time in seconds</span></span>
<span class="line"><span style="color:#032F62;">        &gt; 0.3 sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: GC run time in seconds</span></span>
<span class="line"><span style="color:#032F62;">        &gt; 0.3 sec and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_json_parse_failures</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_cluster_health_json_parse_failures &gt; 0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: json parse failures</span></span>
<span class="line"><span style="color:#032F62;">        &gt; 0 and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: json parse failures &gt; 0</span></span>
<span class="line"><span style="color:#032F62;">        and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_breakers_tripped</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rate(elasticsearch_breakers_tripped[5m]) &gt; 0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt;</span></span>
<span class="line"><span style="color:#032F62;">        0 and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: breakers tripped &gt; 0 and</span></span>
<span class="line"><span style="color:#032F62;">        has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">alert</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Elasticsearch_health_timed_out</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">expr</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elasticsearch_cluster_health_timed_out &gt; 0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">for</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">severity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">warning</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;{{$value}}&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">annotations</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: Number of cluster health</span></span>
<span class="line"><span style="color:#032F62;">        checks timed out &gt; 0 and has a value of {{ $value }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">summary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;ElasticSearch node {{ $labels.instance }}: Number of cluster health</span></span>
<span class="line"><span style="color:#032F62;">        checks timed out &gt; 0 and has a value of {{ $value }}&#39;</span></span></code></pre></div>`,4),o=[p];function c(t,r,E,i,y,u){return a(),n("div",null,o)}const _=s(e,[["render",c]]);export{F as __pageData,_ as default};
