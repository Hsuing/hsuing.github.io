import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Logs/Filebeat/1-k8s.md","filePath":"guide/Linux/Logs/Filebeat/1-k8s.md","lastUpdated":1732269995000}'),p={name:"guide/Linux/Logs/Filebeat/1-k8s.md"},o=l(`<div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRole</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">] </span><span style="color:#6A737D;"># &quot;&quot; indicates the core API group</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#9ECBFF;">namespaces</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#9ECBFF;">pods</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#9ECBFF;">nodes</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#9ECBFF;">get</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#9ECBFF;">watch</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#9ECBFF;">list</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;apps&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">replicasets</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;batch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">jobs</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;list&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;watch&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Role</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># should be the namespace where filebeat is running</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">coordination.k8s.io</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">leases</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;create&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;update&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Role</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat-kubeadm-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">apiGroups</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">configmaps</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resourceNames</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">kubeadm-config</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">verbs</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRoleBinding</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#85E89D;">subjects</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">roleRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterRole</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apiGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">RoleBinding</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">subjects</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">roleRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Role</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apiGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">RoleBinding</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat-kubeadm-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">subjects</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ServiceAccount</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">roleRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Role</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat-kubeadm-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apiGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">filebeat.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    filebeat.inputs:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - type: container</span></span>
<span class="line"><span style="color:#9ECBFF;">      paths:</span></span>
<span class="line"><span style="color:#9ECBFF;">        - /var/log/containers/*.log</span></span>
<span class="line"><span style="color:#9ECBFF;">      processors:</span></span>
<span class="line"><span style="color:#9ECBFF;">        - add_kubernetes_metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">            host: \${NODE_NAME}</span></span>
<span class="line"><span style="color:#9ECBFF;">            matchers:</span></span>
<span class="line"><span style="color:#9ECBFF;">            - logs_path:</span></span>
<span class="line"><span style="color:#9ECBFF;">                logs_path: &quot;/var/log/containers/&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    # To enable hints based autodiscover, remove \`filebeat.inputs\` configuration and uncomment this:</span></span>
<span class="line"><span style="color:#9ECBFF;">    #filebeat.autodiscover:</span></span>
<span class="line"><span style="color:#9ECBFF;">    #  providers:</span></span>
<span class="line"><span style="color:#9ECBFF;">    #    - type: kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">    #      node: \${NODE_NAME}</span></span>
<span class="line"><span style="color:#9ECBFF;">    #      hints.enabled: true</span></span>
<span class="line"><span style="color:#9ECBFF;">    #      hints.default_config:</span></span>
<span class="line"><span style="color:#9ECBFF;">    #        type: container</span></span>
<span class="line"><span style="color:#9ECBFF;">    #        paths:</span></span>
<span class="line"><span style="color:#9ECBFF;">    #          - /var/log/containers/*\${data.kubernetes.container.id}.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    processors:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - add_cloud_metadata:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - add_host_metadata:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    cloud.id: \${ELASTIC_CLOUD_ID}</span></span>
<span class="line"><span style="color:#9ECBFF;">    cloud.auth: \${ELASTIC_CLOUD_AUTH}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    output.elasticsearch:</span></span>
<span class="line"><span style="color:#9ECBFF;">      hosts: [&#39;\${ELASTICSEARCH_HOST:elastiscearch-master}:\${ELASTICSEARCH_PORT:9200}&#39;]</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DaemonSet</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">serviceAccountName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">terminationGracePeriodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">hostNetwork</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">dnsPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterFirstWithHostNet</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">docker.elastic.co/beats/filebeat:7.17.3</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;-c&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;/etc/filebeat.yml&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;-e&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ELASTICSEARCH_HOST</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">elastiscearch-master</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ELASTICSEARCH_PORT</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;9200&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ELASTIC_CLOUD_ID</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ELASTIC_CLOUD_AUTH</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NODE_NAME</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">valueFrom</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">fieldRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">fieldPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">spec.nodeName</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">runAsUser</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;"># If using Red Hat OpenShift uncomment this:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#privileged: true</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">200Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/filebeat.yml</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat.yml</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/usr/share/filebeat/data</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">varlibdockercontainers</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/docker/containers</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">varlog</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/log</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">defaultMode</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0640</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filebeat-config</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">varlibdockercontainers</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/docker/containers</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">varlog</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/log</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># data folder stores a registry of read status for all files, so we don&#39;t send everything again on a Filebeat pod restart</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">data</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;"># When filebeat runs as non-root user, this directory needs to be writable by group (g+w).</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/filebeat-data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DirectoryOrCreate</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRole</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">] </span><span style="color:#6A737D;"># &quot;&quot; indicates the core API group</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#032F62;">namespaces</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#032F62;">pods</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#032F62;">nodes</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#032F62;">get</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#032F62;">watch</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#032F62;">list</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;apps&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">replicasets</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;batch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">jobs</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;list&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;watch&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Role</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># should be the namespace where filebeat is running</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">coordination.k8s.io</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">leases</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;create&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;update&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Role</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat-kubeadm-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">apiGroups</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">configmaps</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resourceNames</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">kubeadm-config</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">verbs</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRoleBinding</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#22863A;">subjects</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">roleRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterRole</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apiGroup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">RoleBinding</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">subjects</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">roleRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Role</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apiGroup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">RoleBinding</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat-kubeadm-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">subjects</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ServiceAccount</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">roleRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Role</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat-kubeadm-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apiGroup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">rbac.authorization.k8s.io</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">filebeat.yml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    filebeat.inputs:</span></span>
<span class="line"><span style="color:#032F62;">    - type: container</span></span>
<span class="line"><span style="color:#032F62;">      paths:</span></span>
<span class="line"><span style="color:#032F62;">        - /var/log/containers/*.log</span></span>
<span class="line"><span style="color:#032F62;">      processors:</span></span>
<span class="line"><span style="color:#032F62;">        - add_kubernetes_metadata:</span></span>
<span class="line"><span style="color:#032F62;">            host: \${NODE_NAME}</span></span>
<span class="line"><span style="color:#032F62;">            matchers:</span></span>
<span class="line"><span style="color:#032F62;">            - logs_path:</span></span>
<span class="line"><span style="color:#032F62;">                logs_path: &quot;/var/log/containers/&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    # To enable hints based autodiscover, remove \`filebeat.inputs\` configuration and uncomment this:</span></span>
<span class="line"><span style="color:#032F62;">    #filebeat.autodiscover:</span></span>
<span class="line"><span style="color:#032F62;">    #  providers:</span></span>
<span class="line"><span style="color:#032F62;">    #    - type: kubernetes</span></span>
<span class="line"><span style="color:#032F62;">    #      node: \${NODE_NAME}</span></span>
<span class="line"><span style="color:#032F62;">    #      hints.enabled: true</span></span>
<span class="line"><span style="color:#032F62;">    #      hints.default_config:</span></span>
<span class="line"><span style="color:#032F62;">    #        type: container</span></span>
<span class="line"><span style="color:#032F62;">    #        paths:</span></span>
<span class="line"><span style="color:#032F62;">    #          - /var/log/containers/*\${data.kubernetes.container.id}.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    processors:</span></span>
<span class="line"><span style="color:#032F62;">      - add_cloud_metadata:</span></span>
<span class="line"><span style="color:#032F62;">      - add_host_metadata:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    cloud.id: \${ELASTIC_CLOUD_ID}</span></span>
<span class="line"><span style="color:#032F62;">    cloud.auth: \${ELASTIC_CLOUD_AUTH}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    output.elasticsearch:</span></span>
<span class="line"><span style="color:#032F62;">      hosts: [&#39;\${ELASTICSEARCH_HOST:elastiscearch-master}:\${ELASTICSEARCH_PORT:9200}&#39;]</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DaemonSet</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">serviceAccountName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">terminationGracePeriodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">hostNetwork</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">dnsPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterFirstWithHostNet</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">docker.elastic.co/beats/filebeat:7.17.3</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">args</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;-c&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;/etc/filebeat.yml&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;-e&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ELASTICSEARCH_HOST</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">elastiscearch-master</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ELASTICSEARCH_PORT</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;9200&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ELASTIC_CLOUD_ID</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ELASTIC_CLOUD_AUTH</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NODE_NAME</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">valueFrom</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">fieldRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">fieldPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">spec.nodeName</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">runAsUser</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;"># If using Red Hat OpenShift uncomment this:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">#privileged: true</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">200Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/filebeat.yml</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat.yml</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/usr/share/filebeat/data</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">varlibdockercontainers</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/docker/containers</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">varlog</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/log</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">defaultMode</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0640</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filebeat-config</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">varlibdockercontainers</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/docker/containers</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">varlog</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/log</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># data folder stores a registry of read status for all files, so we don&#39;t send everything again on a Filebeat pod restart</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">data</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;"># When filebeat runs as non-root user, this directory needs to be writable by group (g+w).</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/filebeat-data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DirectoryOrCreate</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span></code></pre></div>`,1),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const C=s(p,[["render",c]]);export{A as __pageData,C as default};
