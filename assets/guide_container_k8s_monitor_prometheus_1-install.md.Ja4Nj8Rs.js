import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. 基于Prometheus的全方位监控平台","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus/1-install.md","filePath":"guide/container/k8s/monitor/prometheus/1-install.md","lastUpdated":1720533756000}'),p={name:"guide/container/k8s/monitor/prometheus/1-install.md"},o=l(`<h1 id="_1-基于prometheus的全方位监控平台" tabindex="-1">1. 基于Prometheus的全方位监控平台 <a class="header-anchor" href="#_1-基于prometheus的全方位监控平台" aria-label="Permalink to &quot;1. 基于Prometheus的全方位监控平台&quot;">​</a></h1><h2 id="_1-1-部署配置" tabindex="-1">1.1 部署配置 <a class="header-anchor" href="#_1-1-部署配置" aria-label="Permalink to &quot;1.1 部署配置&quot;">​</a></h2><p>用的主要技术栈如下:</p><table><thead><tr><th>名字</th><th>含义</th></tr></thead><tbody><tr><td>Prometheus</td><td>监控主服务</td></tr><tr><td>node-exporter</td><td>数据采集器</td></tr><tr><td>kube-state-metrics</td><td>数据采集器</td></tr><tr><td>metrics-server</td><td>数据采集器</td></tr><tr><td>Consul</td><td>自动发现</td></tr><tr><td>blackbox</td><td>黑盒拨测</td></tr><tr><td>Alertmanager</td><td>监控告警服务</td></tr><tr><td>Grafana</td><td>数据展示服务</td></tr><tr><td>prometheusAlert</td><td>告警消息转发服务</td></tr></tbody></table><h2 id="_1-2-安装" tabindex="-1">1.2 安装 <a class="header-anchor" href="#_1-2-安装" aria-label="Permalink to &quot;1.2 安装&quot;">​</a></h2><h3 id="_1-2-1-部署顺序" tabindex="-1">1.2.1 部署顺序 <a class="header-anchor" href="#_1-2-1-部署顺序" aria-label="Permalink to &quot;1.2.1 部署顺序&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406261421906.png" alt="image-20240626142101988"></p><p>部署对外可访问Prometheus:</p><ol><li>首先需要创建Prometheus所在命名空间；</li><li>然后创建Prometheus使用的RBAC规则；</li><li>创建Prometheus的configmap来保存配置文件；</li><li>创建service暴露Prometheus服务；</li><li>创建deployment部署Prometheus容器；</li><li>最后创建Ingress实现外部域名访问Prometheus。</li></ol><h3 id="_1-2-2-创建命名空间" tabindex="-1">1.2.2 创建命名空间 <a class="header-anchor" href="#_1-2-2-创建命名空间" aria-label="Permalink to &quot;1.2.2 创建命名空间&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master Prometheus]# kubectl create namespace monitor</span></span>
<span class="line"><span style="color:#B392F0;">namespace/monitor</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">created</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master Prometheus]# kubectl create namespace monitor</span></span>
<span class="line"><span style="color:#6F42C1;">namespace/monitor</span><span style="color:#24292E;"> </span><span style="color:#032F62;">created</span></span></code></pre></div><h3 id="_1-2-3-创建rbac规则" tabindex="-1">1.2.3 创建RBAC规则 <a class="header-anchor" href="#_1-2-3-创建rbac规则" aria-label="Permalink to &quot;1.2.3 创建RBAC规则&quot;">​</a></h3><p>创建1.prometheus-rbac.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRole</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;nodes&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;nodes/proxy&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;services&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;endpoints&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;pods&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;extensions&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;ingress&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">nonResourceURLs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;/metrics&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRoleBinding</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#85E89D;">roleRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apiGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRole</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">cluster-admin</span></span>
<span class="line"><span style="color:#85E89D;">subjects</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRole</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;nodes&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;nodes/proxy&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;services&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;endpoints&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;pods&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;extensions&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;ingress&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">nonResourceURLs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;/metrics&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRoleBinding</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#22863A;">roleRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apiGroup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRole</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">cluster-admin</span></span>
<span class="line"><span style="color:#22863A;">subjects</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master prometheus]# kubectl apply -f 1.prometheus-rbac.yaml</span></span>
<span class="line"><span style="color:#B392F0;">serviceaccount/prometheus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">created</span></span>
<span class="line"><span style="color:#B392F0;">clusterrole.rbac.authorization.k8s.io/prometheus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">created</span></span>
<span class="line"><span style="color:#B392F0;">clusterrolebinding.rbac.authorization.k8s.io/prometheus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">created</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master prometheus]# kubectl apply -f 1.prometheus-rbac.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">serviceaccount/prometheus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">created</span></span>
<span class="line"><span style="color:#6F42C1;">clusterrole.rbac.authorization.k8s.io/prometheus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">created</span></span>
<span class="line"><span style="color:#6F42C1;">clusterrolebinding.rbac.authorization.k8s.io/prometheus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">created</span></span></code></pre></div><ul><li>查看</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sa</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clusterrole</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">clusterrolebinding</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sa</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clusterrole</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">clusterrolebinding</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus</span></span></code></pre></div><h3 id="_1-2-4-创建config" tabindex="-1">1.2.4 创建config <a class="header-anchor" href="#_1-2-4-创建config" aria-label="Permalink to &quot;1.2.4 创建config&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">prometheus.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    global:</span></span>
<span class="line"><span style="color:#9ECBFF;">      scrape_interval:     15s</span></span>
<span class="line"><span style="color:#9ECBFF;">      evaluation_interval: 15s</span></span>
<span class="line"><span style="color:#9ECBFF;">      external_labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">        cluster: &quot;kubernetes&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    ############ 数据采集job ###################</span></span>
<span class="line"><span style="color:#9ECBFF;">    scrape_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - job_name: prometheus</span></span>
<span class="line"><span style="color:#9ECBFF;">      static_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - targets: [&#39;127.0.0.1:9090&#39;]</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          instance: prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    ############ 指定告警规则文件路径位置 ###################</span></span>
<span class="line"><span style="color:#9ECBFF;">    rule_files:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - /etc/prometheus/rules/*.rules</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">prometheus.yml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    global:</span></span>
<span class="line"><span style="color:#032F62;">      scrape_interval:     15s</span></span>
<span class="line"><span style="color:#032F62;">      evaluation_interval: 15s</span></span>
<span class="line"><span style="color:#032F62;">      external_labels:</span></span>
<span class="line"><span style="color:#032F62;">        cluster: &quot;kubernetes&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    ############ 数据采集job ###################</span></span>
<span class="line"><span style="color:#032F62;">    scrape_configs:</span></span>
<span class="line"><span style="color:#032F62;">    - job_name: prometheus</span></span>
<span class="line"><span style="color:#032F62;">      static_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - targets: [&#39;127.0.0.1:9090&#39;]</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          instance: prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    ############ 指定告警规则文件路径位置 ###################</span></span>
<span class="line"><span style="color:#032F62;">    rule_files:</span></span>
<span class="line"><span style="color:#032F62;">    - /etc/prometheus/rules/*.rules</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">.prometheus-config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus-config</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#032F62;">.prometheus-config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus-config</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span></span></code></pre></div><h3 id="_1-2-5-创建configmap类型的rules" tabindex="-1">1.2.5 创建ConfigMap类型的rules <a class="header-anchor" href="#_1-2-5-创建configmap类型的rules" aria-label="Permalink to &quot;1.2.5 创建ConfigMap类型的rules&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-rules</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">general.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: general.rules</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: InstanceDown</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: |</span></span>
<span class="line"><span style="color:#9ECBFF;">          up{job=~&quot;other-ECS|k8s-nodes|prometheus&quot;} == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 5s</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;Instance {{ $labels.instance }} 停止工作&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} 已经停止1分钟以上.&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">node.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
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
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} : {{ $labels.mountpoint }} 分区使用大于85% (当前值: {{ $value }})&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-rules</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">general.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: general.rules</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: InstanceDown</span></span>
<span class="line"><span style="color:#032F62;">        expr: |</span></span>
<span class="line"><span style="color:#032F62;">          up{job=~&quot;other-ECS|k8s-nodes|prometheus&quot;} == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 5s</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;Instance {{ $labels.instance }} 停止工作&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} 已经停止1分钟以上.&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">node.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
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
<span class="line"><span style="color:#032F62;">          description: &quot;{{ $labels.instance }} 主机名：{{ $labels.hostname }} : {{ $labels.mountpoint }} 分区使用大于85% (当前值: {{ $value }})&quot;</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#9ECBFF;">.prometheus-rules.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus-rules</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#032F62;">.prometheus-rules.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus-rules</span></span></code></pre></div><h3 id="_1-2-6-创建prometheus-svc" tabindex="-1">1.2.6 创建prometheus svc <a class="header-anchor" href="#_1-2-6-创建prometheus-svc" aria-label="Permalink to &quot;1.2.6 创建prometheus svc&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span><span style="color:#9ECBFF;">.prometheus-svc.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">svc</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#032F62;">.prometheus-svc.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">svc</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span></span></code></pre></div><h3 id="_1-2-7-创建prometheus-deploy" tabindex="-1">1.2.7 创建prometheus deploy <a class="header-anchor" href="#_1-2-7-创建prometheus-deploy" aria-label="Permalink to &quot;1.2.7 创建prometheus deploy&quot;">​</a></h3><p>使用NFS提供的StorageClass来做数据存储</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">serviceAccountName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prom/prometheus:v2.36.0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9090</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">runAsUser</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">65534</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;/bin/prometheus&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--config.file=/etc/prometheus/prometheus.yml&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--web.enable-lifecycle&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--storage.tsdb.path=/prometheus&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--storage.tsdb.retention.time=10d&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--web.console.libraries=/etc/prometheus/console_libraries&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--web.console.templates=/etc/prometheus/consoles&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">2000m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">2048Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1000m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/-/ready</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9090</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/-/healthy</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9090</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-rules</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/prometheus/rules</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">configmap-reload</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">jimmidyson/configmap-reload:v0.5.0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--volume-dir=/etc/config&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--webhook-url=http://localhost:9090/-/reload&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">data</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">persistentVolumeClaim</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">claimName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-data-pvc</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-rules</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-rules</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">serviceAccountName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prom/prometheus:v2.36.0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">IfNotPresent</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9090</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">runAsUser</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">65534</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;/bin/prometheus&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--config.file=/etc/prometheus/prometheus.yml&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--web.enable-lifecycle&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--storage.tsdb.path=/prometheus&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--storage.tsdb.retention.time=10d&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--web.console.libraries=/etc/prometheus/console_libraries&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--web.console.templates=/etc/prometheus/consoles&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">2000m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">2048Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1000m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/-/ready</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9090</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/-/healthy</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9090</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/prometheus</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/prometheus</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-rules</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/prometheus/rules</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">configmap-reload</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">jimmidyson/configmap-reload:v0.5.0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">IfNotPresent</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--volume-dir=/etc/config&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--webhook-url=http://localhost:9090/-/reload&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">data</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">persistentVolumeClaim</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">claimName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-data-pvc</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-rules</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-rules</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-config</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deploy</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pods</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deploy</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pods</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span></span></code></pre></div><ul><li>参数解释</li></ul><p>Deployment 资源文件中的 containers 部分配置了两个容器，分别是:</p><ul><li>prometheus: Prometheus 容器是主容器，用于运行 Prometheus 进程</li><li>configmap-reload:用于监听指定的ConfigMap文件中的内容，如果内容发生更改，则执行webhookurl请求因为Prometheus支持通过接口重新加载配置文件，所以这里使用这个容器提供的机制来完成PrometheusConfigMap配置文件内容一有更改，就执行Prometheus的/-/reload接口，进行更新配置操作。</li></ul><p>Prometheus 参数说明</p><p>--web.enable-lifecycle: 启用 Prometheus 用于重新加载配置的 /-/reload 接口</p><p>--config.file: 指定 Prometheus 配置文件所在地址，这个地址是相对于容器内部而言的</p><p>--storage.tsdb.path: 指定 Prometheus 数据存储目录地址，这个地址是相对于容器而言的</p><p>--storage.tsdb.retention.time: 指定删除旧数据的时间，默认为 15d</p><p>--web.console.libraries: 指定控制台组件依赖的存储路径</p><p>--web.console.templates: 指定控制台模板的存储路径</p><h3 id="_1-2-8-创建ingress对外提供访问地址" tabindex="-1">1.2.8 创建ingress对外提供访问地址 <a class="header-anchor" href="#_1-2-8-创建ingress对外提供访问地址" aria-label="Permalink to &quot;1.2.8 创建ingress对外提供访问地址&quot;">​</a></h3><p>创建7.prometheus-ing.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Ingress</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-ingress</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ingressClassName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">host</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus.ikubernetes.net</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">http</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">paths</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">pathType</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Prefix</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">backend</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">service</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#85E89D;">number</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9090</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Ingress</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-ingress</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ingressClassName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">host</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus.ikubernetes.net</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">http</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">paths</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">pathType</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Prefix</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">backend</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">service</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">port</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#22863A;">number</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9090</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">7</span><span style="color:#9ECBFF;">.prometheus-ing.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ingress</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">                 </span><span style="color:#9ECBFF;">CLASS</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">HOSTS</span><span style="color:#E1E4E8;">                        </span><span style="color:#9ECBFF;">ADDRESS</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">PORTS</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">prometheus-ingress</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">prometheus.ikubernetes.net</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">10.103</span><span style="color:#9ECBFF;">.236.70</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">9</span><span style="color:#9ECBFF;">m35s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span><span style="color:#032F62;">.prometheus-ing.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ingress</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">                 </span><span style="color:#032F62;">CLASS</span><span style="color:#24292E;">   </span><span style="color:#032F62;">HOSTS</span><span style="color:#24292E;">                        </span><span style="color:#032F62;">ADDRESS</span><span style="color:#24292E;">         </span><span style="color:#032F62;">PORTS</span><span style="color:#24292E;">   </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">prometheus-ingress</span><span style="color:#24292E;">   </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;">   </span><span style="color:#032F62;">prometheus.ikubernetes.net</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">10.103</span><span style="color:#032F62;">.236.70</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">9</span><span style="color:#032F62;">m35s</span></span></code></pre></div><ul><li>访问验证</li></ul><p>浏览器进行访问, prometheus.ikubernetes.net</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406261727071.png" alt="image-20240626172317936"></p>`,46),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{m as __pageData,h as default};
