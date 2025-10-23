import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. 部署","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus-alert/1-install.md","filePath":"guide/container/k8s/monitor/prometheus-alert/1-install.md","lastUpdated":1720533756000}'),l={name:"guide/container/k8s/monitor/prometheus-alert/1-install.md"},o=p(`<p><a href="https://github.com/feiyu563/PrometheusAlert" target="_blank" rel="noreferrer">官当</a></p><h1 id="_1-部署" tabindex="-1">1. 部署 <a class="header-anchor" href="#_1-部署" aria-label="Permalink to &quot;1. 部署&quot;">​</a></h1><h2 id="_1-1-下载" tabindex="-1">1.1 下载 <a class="header-anchor" href="#_1-1-下载" aria-label="Permalink to &quot;1.1 下载&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-mon</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/example/kubernetes/PrometheusAlert-Deployment.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 也可把 yaml 文件下载到本地</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/example/kubernetes/PrometheusAlert-Deployment.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-O</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/example/kubernetes/PrometheusAlert-Deployment.yaml</span></span>
<span class="line"><span style="color:#6A737D;"># 更改服务暴露方式，也可以更改配置文件中服务暴露方式, 默认是ClusterIP</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">patch</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">svc</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus-alert-center</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-mon</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{&quot;spec&quot;: {&quot;type&quot;: &quot;NodePort&quot;}}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-mon</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/example/kubernetes/PrometheusAlert-Deployment.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 也可把 yaml 文件下载到本地</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/example/kubernetes/PrometheusAlert-Deployment.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-O</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/example/kubernetes/PrometheusAlert-Deployment.yaml</span></span>
<span class="line"><span style="color:#6A737D;"># 更改服务暴露方式，也可以更改配置文件中服务暴露方式, 默认是ClusterIP</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">patch</span><span style="color:#24292E;"> </span><span style="color:#032F62;">svc</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus-alert-center</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-mon</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{&quot;spec&quot;: {&quot;type&quot;: &quot;NodePort&quot;}}&#39;</span></span></code></pre></div><h2 id="_1-2-创建存储" tabindex="-1">1.2 创建存储 <a class="header-anchor" href="#_1-2-创建存储" aria-label="Permalink to &quot;1.2 创建存储&quot;">​</a></h2><p>[root@kube-master prometheusAlert]# cat 1.prome-alert-storage.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prome-alert-data-pvc</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">accessModes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">storageClassName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;nfs-provisioner-storage&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prome-alert-data-pvc</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">accessModes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">storageClassName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;nfs-provisioner-storage&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span></code></pre></div><ul><li>执行apply</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">.prome-alert-storage.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">.prome-alert-storage.yaml</span></span></code></pre></div><h2 id="_1-2-创建mysql" tabindex="-1">1.2 创建mysql <a class="header-anchor" href="#_1-2-创建mysql" aria-label="Permalink to &quot;1.2 创建mysql&quot;">​</a></h2><h3 id="创建存储" tabindex="-1">创建存储 <a class="header-anchor" href="#创建存储" aria-label="Permalink to &quot;创建存储&quot;">​</a></h3><p>cat 2.prome-alert-mysql-storage.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-data-pvc</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">accessModes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">storageClassName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;nfs-provisioner-storage&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-data-pvc</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">accessModes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">storageClassName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;nfs-provisioner-storage&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span></code></pre></div><ul><li>执行apply</li></ul><h3 id="创建dp资源" tabindex="-1">创建dp资源 <a class="header-anchor" href="#创建dp资源" aria-label="Permalink to &quot;创建dp资源&quot;">​</a></h3><blockquote><p>mysql root密码Transsion@1011</p></blockquote><p>cat 3.Prometheus-alert-mysql-Deployment.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Secret</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-user-pwd</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">mysql-root-pwd</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">VHJhbnNzaW9uQDEwMTE=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-mon</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/mysql:5.7</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">valueFrom</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">secretKeyRef</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-user-pwd</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-root-pwd</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-port</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3306</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/var/lib/mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-data</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">persistentVolumeClaim</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">claimName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-data-pvc</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql-port</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3306</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3306</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Secret</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-user-pwd</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">mysql-root-pwd</span><span style="color:#24292E;">: </span><span style="color:#032F62;">VHJhbnNzaW9uQDEwMTE=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-mon</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/mysql:5.7</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">valueFrom</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">secretKeyRef</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-user-pwd</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-root-pwd</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-port</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3306</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/var/lib/mysql</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-data</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">persistentVolumeClaim</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">claimName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-data-pvc</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql-port</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3306</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3306</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span></code></pre></div><ul><li><p>执行apply</p></li><li><p>创建数据库</p></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 获取 mysql pod</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">monitor</span><span style="color:#F97583;">|</span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 进入 mysql pod</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-it</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mysql-6785bdcf-wsxhn</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-mon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/bin/bash</span></span>
<span class="line"><span style="color:#6A737D;"># 在 mysql pod 容器内执行</span></span>
<span class="line"><span style="color:#6A737D;"># 登录 mysql</span></span>
<span class="line"><span style="color:#B392F0;">mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-uroot</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span></span>
<span class="line"><span style="color:#6A737D;"># 创建数据库 prometheusalert</span></span>
<span class="line"><span style="color:#B392F0;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">DATABASE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheusalert</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CHARACTER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">SET</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">utf8mb4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">COLLATE</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">utf8mb4_general_ci</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 获取 mysql pod</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">monitor</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mysql</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 进入 mysql pod</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-it</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mysql-6785bdcf-wsxhn</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-mon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/bin/bash</span></span>
<span class="line"><span style="color:#6A737D;"># 在 mysql pod 容器内执行</span></span>
<span class="line"><span style="color:#6A737D;"># 登录 mysql</span></span>
<span class="line"><span style="color:#6F42C1;">mysql</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-uroot</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span></span>
<span class="line"><span style="color:#6A737D;"># 创建数据库 prometheusalert</span></span>
<span class="line"><span style="color:#6F42C1;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">DATABASE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheusalert</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CHARACTER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">SET</span><span style="color:#24292E;"> </span><span style="color:#032F62;">utf8mb4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">COLLATE</span><span style="color:#24292E;"> </span><span style="color:#032F62;">utf8mb4_general_ci</span><span style="color:#24292E;">;</span></span></code></pre></div><h2 id="_1-3-创建dp资源" tabindex="-1">1.3 创建dp资源 <a class="header-anchor" href="#_1-3-创建dp资源" aria-label="Permalink to &quot;1.3 创建dp资源&quot;">​</a></h2><p>[root@kube-master prometheusAlert]# cat 2.PrometheusAlert-Deployment.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">app.conf</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓全局配置-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    appname = PrometheusAlert</span></span>
<span class="line"><span style="color:#9ECBFF;">    #登录用户名</span></span>
<span class="line"><span style="color:#9ECBFF;">    login_user=admin</span></span>
<span class="line"><span style="color:#9ECBFF;">    #登录密码</span></span>
<span class="line"><span style="color:#9ECBFF;">    login_password=admin123</span></span>
<span class="line"><span style="color:#9ECBFF;">    #监听地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    httpaddr = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    #监听端口</span></span>
<span class="line"><span style="color:#9ECBFF;">    httpport = 8080</span></span>
<span class="line"><span style="color:#9ECBFF;">    runmode = dev</span></span>
<span class="line"><span style="color:#9ECBFF;">    #设置代理 proxy = http://123.123.123.123:8080</span></span>
<span class="line"><span style="color:#9ECBFF;">    proxy =</span></span>
<span class="line"><span style="color:#9ECBFF;">    #开启JSON请求</span></span>
<span class="line"><span style="color:#9ECBFF;">    copyrequestbody = true</span></span>
<span class="line"><span style="color:#9ECBFF;">    #告警消息标题</span></span>
<span class="line"><span style="color:#9ECBFF;">    title=PrometheusAlert</span></span>
<span class="line"><span style="color:#9ECBFF;">    #链接到告警平台地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    GraylogAlerturl=http://graylog.org</span></span>
<span class="line"><span style="color:#9ECBFF;">    #钉钉告警 告警logo图标地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    logourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/alert-center.png</span></span>
<span class="line"><span style="color:#9ECBFF;">    #钉钉告警 恢复logo图标地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    rlogourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/alert-center.png</span></span>
<span class="line"><span style="color:#9ECBFF;">    #短信告警级别(等于3就进行短信告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#9ECBFF;">    messagelevel=3</span></span>
<span class="line"><span style="color:#9ECBFF;">    #电话告警级别(等于4就进行语音告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#9ECBFF;">    phonecalllevel=4</span></span>
<span class="line"><span style="color:#9ECBFF;">    #默认拨打号码(页面测试短信和电话功能需要配置此项)</span></span>
<span class="line"><span style="color:#9ECBFF;">    defaultphone=xxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #故障恢复是否启用电话通知0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    phonecallresolved=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否前台输出file or console</span></span>
<span class="line"><span style="color:#9ECBFF;">    logtype=file</span></span>
<span class="line"><span style="color:#9ECBFF;">    #日志文件路径</span></span>
<span class="line"><span style="color:#9ECBFF;">    logpath=logs/prometheusalertcenter.log</span></span>
<span class="line"><span style="color:#9ECBFF;">    #转换Prometheus,graylog告警消息的时区为CST时区(如默认已经是CST时区，请勿开启)</span></span>
<span class="line"><span style="color:#9ECBFF;">    prometheus_cst_time=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #数据库驱动，支持sqlite3，mysql,postgres如使用mysql或postgres，请开启db_host,db_port,db_user,db_password,db_name的注释</span></span>
<span class="line"><span style="color:#9ECBFF;">    db_driver=mysql</span></span>
<span class="line"><span style="color:#9ECBFF;">    db_host=192.10.192.134</span></span>
<span class="line"><span style="color:#9ECBFF;">    db_port=3306</span></span>
<span class="line"><span style="color:#9ECBFF;">    db_user=root</span></span>
<span class="line"><span style="color:#9ECBFF;">    db_password=7Jzvxxxxv6hmj</span></span>
<span class="line"><span style="color:#9ECBFF;">    db_name=prometheusalert</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启告警记录 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    AlertRecord=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启告警记录定时删除 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    RecordLive=1</span></span>
<span class="line"><span style="color:#9ECBFF;">    #告警记录定时删除周期，单位天</span></span>
<span class="line"><span style="color:#9ECBFF;">    RecordLiveDay=7</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 是否将告警记录写入es7，0为关闭，1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    alert_to_es=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    # es地址，是[]string</span></span>
<span class="line"><span style="color:#9ECBFF;">    # beego.Appconfig.Strings读取配置为[]string，使用&quot;;&quot;而不是&quot;,&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    to_es_url=http://10.0.0.202:9200</span></span>
<span class="line"><span style="color:#9ECBFF;">    # to_es_url=http://es1:9200;http://es2:9200;http://es3:9200</span></span>
<span class="line"><span style="color:#9ECBFF;">    # es用户和密码</span></span>
<span class="line"><span style="color:#9ECBFF;">    # to_es_user=username</span></span>
<span class="line"><span style="color:#9ECBFF;">    # to_es_pwd=password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓webhook-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启钉钉告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-dingding=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #默认钉钉机器人地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    ddurl=https://oapi.dingtalk.com/robot/send?access_token=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启 @所有人(0为关闭,1为开启)</span></span>
<span class="line"><span style="color:#9ECBFF;">    dd_isatall=1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启微信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-weixin=1</span></span>
<span class="line"><span style="color:#9ECBFF;">    #默认企业微信机器人地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    wxurl=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=71c0a6f0-43a0-4ecf-b8c9-52aff88f3b68</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启飞书告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-feishu=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #默认飞书机器人地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    fsurl=https://open.feishu.cn/open-apis/bot/hook/xxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓腾讯云接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启腾讯云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-txdx=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #腾讯云短信接口key</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DX_appkey=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #腾讯云短信模版ID 腾讯云短信模版配置可参考 prometheus告警:{1}</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DX_tpl_id=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #腾讯云短信sdk app id</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DX_sdkappid=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #腾讯云短信签名 根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DX_sign=腾讯云</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启腾讯云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-txdh=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #腾讯云电话接口key</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DH_phonecallappkey=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #腾讯云电话模版ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DH_phonecalltpl_id=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #腾讯云电话sdk app id</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DH_phonecallsdkappid=xxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓华为云接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启华为云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-hwdx=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #华为云短信接口key</span></span>
<span class="line"><span style="color:#9ECBFF;">    HWY_DX_APP_Key=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #华为云短信接口Secret</span></span>
<span class="line"><span style="color:#9ECBFF;">    HWY_DX_APP_Secret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #华为云APP接入地址(端口接口地址)</span></span>
<span class="line"><span style="color:#9ECBFF;">    HWY_DX_APP_Url=https://rtcsms.cn-north-1.myhuaweicloud.com:10743</span></span>
<span class="line"><span style="color:#9ECBFF;">    #华为云短信模板ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    HWY_DX_Templateid=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #华为云签名名称，必须是已审核通过的，与模板类型一致的签名名称,按照自己的实际签名填写</span></span>
<span class="line"><span style="color:#9ECBFF;">    HWY_DX_Signature=华为云</span></span>
<span class="line"><span style="color:#9ECBFF;">    #华为云签名通道号</span></span>
<span class="line"><span style="color:#9ECBFF;">    HWY_DX_Sender=xxxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓阿里云接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启阿里云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-alydx=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云短信主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DX_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云短信接口密钥</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DX_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云短信签名名称</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DX_SignName=阿里云</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云短信模板ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DX_Template=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启阿里云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-alydh=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云电话主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DH_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云电话接口密钥</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DH_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云电话被叫显号，必须是已购买的号码</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DX_CalledShowNumber=xxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #阿里云电话文本转语音（TTS）模板ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    ALY_DH_TtsCode=xxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓容联云接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启容联云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-rlydh=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #容联云基础接口地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    RLY_URL=https://app.cloopen.com:8883/2013-12-26/Accounts/</span></span>
<span class="line"><span style="color:#9ECBFF;">    #容联云后台SID</span></span>
<span class="line"><span style="color:#9ECBFF;">    RLY_ACCOUNT_SID=xxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #容联云api-token</span></span>
<span class="line"><span style="color:#9ECBFF;">    RLY_ACCOUNT_TOKEN=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #容联云app_id</span></span>
<span class="line"><span style="color:#9ECBFF;">    RLY_APP_ID=xxxxxxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓邮件配置-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启邮件</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-email=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #邮件发件服务器地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    Email_host=smtp.qq.com</span></span>
<span class="line"><span style="color:#9ECBFF;">    #邮件发件服务器端口</span></span>
<span class="line"><span style="color:#9ECBFF;">    Email_port=465</span></span>
<span class="line"><span style="color:#9ECBFF;">    #邮件帐号</span></span>
<span class="line"><span style="color:#9ECBFF;">    Email_user=xxxxxxx@qq.com</span></span>
<span class="line"><span style="color:#9ECBFF;">    #邮件密码</span></span>
<span class="line"><span style="color:#9ECBFF;">    Email_password=xxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #邮件标题</span></span>
<span class="line"><span style="color:#9ECBFF;">    Email_title=运维告警</span></span>
<span class="line"><span style="color:#9ECBFF;">    #默认发送邮箱</span></span>
<span class="line"><span style="color:#9ECBFF;">    Default_emails=xxxxx@qq.com,xxxxx@qq.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓七陌云接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启七陌短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-7moordx=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #七陌账户ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    7MOOR_ACCOUNT_ID=Nxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #七陌账户APISecret</span></span>
<span class="line"><span style="color:#9ECBFF;">    7MOOR_ACCOUNT_APISECRET=xxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #七陌账户短信模板编号</span></span>
<span class="line"><span style="color:#9ECBFF;">    7MOOR_DX_TEMPLATENUM=n</span></span>
<span class="line"><span style="color:#9ECBFF;">    #注意：七陌短信变量这里只用一个var1，在代码里写死了。</span></span>
<span class="line"><span style="color:#9ECBFF;">    #-----------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启七陌webcall语音通知告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-7moordh=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #请在七陌平台添加虚拟服务号、文本节点</span></span>
<span class="line"><span style="color:#9ECBFF;">    #七陌账户webcall的虚拟服务号</span></span>
<span class="line"><span style="color:#9ECBFF;">    7MOOR_WEBCALL_SERVICENO=xxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 文本节点里被替换的变量，我配置的是text。如果被替换的变量不是text，请修改此配置</span></span>
<span class="line"><span style="color:#9ECBFF;">    7MOOR_WEBCALL_VOICE_VAR=text</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓telegram接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-tg=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #tg机器人token</span></span>
<span class="line"><span style="color:#9ECBFF;">    TG_TOKEN=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #tg消息模式 个人消息或者频道消息 0为关闭(推送给个人)，1为开启(推送给频道)</span></span>
<span class="line"><span style="color:#9ECBFF;">    TG_MODE_CHAN=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #tg用户ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    TG_USERID=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #tg频道name或者id, 频道name需要以@开始</span></span>
<span class="line"><span style="color:#9ECBFF;">    TG_CHANNAME=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #tg api地址, 可以配置为代理地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    #TG_API_PROXY=&quot;https://api.telegram.org/bot%s/%s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓workwechat接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启workwechat告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-workwechat=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 企业ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    WorkWechat_CropID=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 应用ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    WorkWechat_AgentID=xxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 应用secret</span></span>
<span class="line"><span style="color:#9ECBFF;">    WorkWechat_AgentSecret=xxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 接受用户</span></span>
<span class="line"><span style="color:#9ECBFF;">    WorkWechat_ToUser=&quot;zhangsan|lisi&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 接受部门</span></span>
<span class="line"><span style="color:#9ECBFF;">    WorkWechat_ToParty=&quot;ops|dev&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 接受标签</span></span>
<span class="line"><span style="color:#9ECBFF;">    WorkWechat_ToTag=&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 消息类型, 暂时只支持markdown</span></span>
<span class="line"><span style="color:#9ECBFF;">    # WorkWechat_Msgtype = &quot;markdown&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓百度云接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启百度云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-baidudx=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #百度云短信接口AK(ACCESS_KEY_ID)</span></span>
<span class="line"><span style="color:#9ECBFF;">    BDY_DX_AK=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #百度云短信接口SK(SECRET_ACCESS_KEY)</span></span>
<span class="line"><span style="color:#9ECBFF;">    BDY_DX_SK=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #百度云短信ENDPOINT（ENDPOINT参数需要用指定区域的域名来进行定义，如服务所在区域为北京，则为）</span></span>
<span class="line"><span style="color:#9ECBFF;">    BDY_DX_ENDPOINT=http://smsv3.bj.baidubce.com</span></span>
<span class="line"><span style="color:#9ECBFF;">    #百度云短信模版ID,根据自己审核通过的模版来填写(模版支持一个参数code：如prometheus告警:{code})</span></span>
<span class="line"><span style="color:#9ECBFF;">    BDY_DX_TEMPLATE_ID=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #百度云短信签名ID，根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#9ECBFF;">    TXY_DX_SIGNATURE_ID=xxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓百度Hi(如流)-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启百度Hi(如流)告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-ruliu=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #默认百度Hi(如流)机器人地址</span></span>
<span class="line"><span style="color:#9ECBFF;">    BDRL_URL=https://api.im.baidu.com/api/msg/groupmsgsend?access_token=xxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    #百度Hi(如流)群ID</span></span>
<span class="line"><span style="color:#9ECBFF;">    BDRL_ID=123456</span></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓bark接口-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-bark=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    #bark默认地址, 建议自行部署bark-server</span></span>
<span class="line"><span style="color:#9ECBFF;">    BARK_URL=https://api.day.app</span></span>
<span class="line"><span style="color:#9ECBFF;">    #bark key, 多个key使用分割</span></span>
<span class="line"><span style="color:#9ECBFF;">    BARK_KEYS=xxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 复制, 推荐开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    BARK_COPY=1</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 历史记录保存,推荐开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    BARK_ARCHIVE=1</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 消息分组</span></span>
<span class="line"><span style="color:#9ECBFF;">    BARK_GROUP=PrometheusAlert</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓语音播报-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #语音播报需要配合语音播报插件才能使用</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启语音播报通道,0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-voice=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    VOICE_IP=127.0.0.1</span></span>
<span class="line"><span style="color:#9ECBFF;">    VOICE_PORT=9999</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #---------------------↓飞书机器人应用-----------------------</span></span>
<span class="line"><span style="color:#9ECBFF;">    #是否开启feishuapp告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#9ECBFF;">    open-feishuapp=0</span></span>
<span class="line"><span style="color:#9ECBFF;">    # APPID</span></span>
<span class="line"><span style="color:#9ECBFF;">    FEISHU_APPID=cli_xxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    # APPSECRET</span></span>
<span class="line"><span style="color:#9ECBFF;">    FEISHU_APPSECRET=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#9ECBFF;">    # 可填飞书 用户open_id、user_id、union_ids、部门open_department_id</span></span>
<span class="line"><span style="color:#9ECBFF;">    AT_USER_ID=&quot;xxxxxxxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">user.csv</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    2019年4月10日,15888888881,小张,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#9ECBFF;">    2019年4月11日,15888888882,小李,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#9ECBFF;">    2019年4月12日,15888888883,小王,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#9ECBFF;">    2019年4月13日,15888888884,小宋,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center-conf</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">alertname</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">alertname</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">alertname</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/prometheus-alert:v4.8.2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TZ</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center-conf-map</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/app/conf/app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center-conf-map</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/app/user.csv</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">user.csv</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-db</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/app/db</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center-conf-map</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-center-conf</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">items</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          - </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">          - </span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">user.csv</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">user.csv</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-alert-db</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">persistentVolumeClaim</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">claimName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prome-alert-data-pvc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">app.conf</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓全局配置-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    appname = PrometheusAlert</span></span>
<span class="line"><span style="color:#032F62;">    #登录用户名</span></span>
<span class="line"><span style="color:#032F62;">    login_user=admin</span></span>
<span class="line"><span style="color:#032F62;">    #登录密码</span></span>
<span class="line"><span style="color:#032F62;">    login_password=admin123</span></span>
<span class="line"><span style="color:#032F62;">    #监听地址</span></span>
<span class="line"><span style="color:#032F62;">    httpaddr = &quot;0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#032F62;">    #监听端口</span></span>
<span class="line"><span style="color:#032F62;">    httpport = 8080</span></span>
<span class="line"><span style="color:#032F62;">    runmode = dev</span></span>
<span class="line"><span style="color:#032F62;">    #设置代理 proxy = http://123.123.123.123:8080</span></span>
<span class="line"><span style="color:#032F62;">    proxy =</span></span>
<span class="line"><span style="color:#032F62;">    #开启JSON请求</span></span>
<span class="line"><span style="color:#032F62;">    copyrequestbody = true</span></span>
<span class="line"><span style="color:#032F62;">    #告警消息标题</span></span>
<span class="line"><span style="color:#032F62;">    title=PrometheusAlert</span></span>
<span class="line"><span style="color:#032F62;">    #链接到告警平台地址</span></span>
<span class="line"><span style="color:#032F62;">    GraylogAlerturl=http://graylog.org</span></span>
<span class="line"><span style="color:#032F62;">    #钉钉告警 告警logo图标地址</span></span>
<span class="line"><span style="color:#032F62;">    logourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/alert-center.png</span></span>
<span class="line"><span style="color:#032F62;">    #钉钉告警 恢复logo图标地址</span></span>
<span class="line"><span style="color:#032F62;">    rlogourl=https://raw.githubusercontent.com/feiyu563/PrometheusAlert/master/doc/alert-center.png</span></span>
<span class="line"><span style="color:#032F62;">    #短信告警级别(等于3就进行短信告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#032F62;">    messagelevel=3</span></span>
<span class="line"><span style="color:#032F62;">    #电话告警级别(等于4就进行语音告警) 告警级别定义 0 信息,1 警告,2 一般严重,3 严重,4 灾难</span></span>
<span class="line"><span style="color:#032F62;">    phonecalllevel=4</span></span>
<span class="line"><span style="color:#032F62;">    #默认拨打号码(页面测试短信和电话功能需要配置此项)</span></span>
<span class="line"><span style="color:#032F62;">    defaultphone=xxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #故障恢复是否启用电话通知0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    phonecallresolved=0</span></span>
<span class="line"><span style="color:#032F62;">    #是否前台输出file or console</span></span>
<span class="line"><span style="color:#032F62;">    logtype=file</span></span>
<span class="line"><span style="color:#032F62;">    #日志文件路径</span></span>
<span class="line"><span style="color:#032F62;">    logpath=logs/prometheusalertcenter.log</span></span>
<span class="line"><span style="color:#032F62;">    #转换Prometheus,graylog告警消息的时区为CST时区(如默认已经是CST时区，请勿开启)</span></span>
<span class="line"><span style="color:#032F62;">    prometheus_cst_time=0</span></span>
<span class="line"><span style="color:#032F62;">    #数据库驱动，支持sqlite3，mysql,postgres如使用mysql或postgres，请开启db_host,db_port,db_user,db_password,db_name的注释</span></span>
<span class="line"><span style="color:#032F62;">    db_driver=mysql</span></span>
<span class="line"><span style="color:#032F62;">    db_host=192.10.192.134</span></span>
<span class="line"><span style="color:#032F62;">    db_port=3306</span></span>
<span class="line"><span style="color:#032F62;">    db_user=root</span></span>
<span class="line"><span style="color:#032F62;">    db_password=7Jzvxxxxv6hmj</span></span>
<span class="line"><span style="color:#032F62;">    db_name=prometheusalert</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启告警记录 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    AlertRecord=0</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启告警记录定时删除 0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    RecordLive=1</span></span>
<span class="line"><span style="color:#032F62;">    #告警记录定时删除周期，单位天</span></span>
<span class="line"><span style="color:#032F62;">    RecordLiveDay=7</span></span>
<span class="line"><span style="color:#032F62;">    # 是否将告警记录写入es7，0为关闭，1为开启</span></span>
<span class="line"><span style="color:#032F62;">    alert_to_es=0</span></span>
<span class="line"><span style="color:#032F62;">    # es地址，是[]string</span></span>
<span class="line"><span style="color:#032F62;">    # beego.Appconfig.Strings读取配置为[]string，使用&quot;;&quot;而不是&quot;,&quot;</span></span>
<span class="line"><span style="color:#032F62;">    to_es_url=http://10.0.0.202:9200</span></span>
<span class="line"><span style="color:#032F62;">    # to_es_url=http://es1:9200;http://es2:9200;http://es3:9200</span></span>
<span class="line"><span style="color:#032F62;">    # es用户和密码</span></span>
<span class="line"><span style="color:#032F62;">    # to_es_user=username</span></span>
<span class="line"><span style="color:#032F62;">    # to_es_pwd=password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓webhook-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启钉钉告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-dingding=0</span></span>
<span class="line"><span style="color:#032F62;">    #默认钉钉机器人地址</span></span>
<span class="line"><span style="color:#032F62;">    ddurl=https://oapi.dingtalk.com/robot/send?access_token=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启 @所有人(0为关闭,1为开启)</span></span>
<span class="line"><span style="color:#032F62;">    dd_isatall=1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #是否开启微信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-weixin=1</span></span>
<span class="line"><span style="color:#032F62;">    #默认企业微信机器人地址</span></span>
<span class="line"><span style="color:#032F62;">    wxurl=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=71c0a6f0-43a0-4ecf-b8c9-52aff88f3b68</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #是否开启飞书告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-feishu=0</span></span>
<span class="line"><span style="color:#032F62;">    #默认飞书机器人地址</span></span>
<span class="line"><span style="color:#032F62;">    fsurl=https://open.feishu.cn/open-apis/bot/hook/xxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓腾讯云接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启腾讯云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-txdx=0</span></span>
<span class="line"><span style="color:#032F62;">    #腾讯云短信接口key</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DX_appkey=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #腾讯云短信模版ID 腾讯云短信模版配置可参考 prometheus告警:{1}</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DX_tpl_id=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #腾讯云短信sdk app id</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DX_sdkappid=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #腾讯云短信签名 根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DX_sign=腾讯云</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #是否开启腾讯云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-txdh=0</span></span>
<span class="line"><span style="color:#032F62;">    #腾讯云电话接口key</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DH_phonecallappkey=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #腾讯云电话模版ID</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DH_phonecalltpl_id=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #腾讯云电话sdk app id</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DH_phonecallsdkappid=xxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓华为云接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启华为云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-hwdx=0</span></span>
<span class="line"><span style="color:#032F62;">    #华为云短信接口key</span></span>
<span class="line"><span style="color:#032F62;">    HWY_DX_APP_Key=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #华为云短信接口Secret</span></span>
<span class="line"><span style="color:#032F62;">    HWY_DX_APP_Secret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #华为云APP接入地址(端口接口地址)</span></span>
<span class="line"><span style="color:#032F62;">    HWY_DX_APP_Url=https://rtcsms.cn-north-1.myhuaweicloud.com:10743</span></span>
<span class="line"><span style="color:#032F62;">    #华为云短信模板ID</span></span>
<span class="line"><span style="color:#032F62;">    HWY_DX_Templateid=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #华为云签名名称，必须是已审核通过的，与模板类型一致的签名名称,按照自己的实际签名填写</span></span>
<span class="line"><span style="color:#032F62;">    HWY_DX_Signature=华为云</span></span>
<span class="line"><span style="color:#032F62;">    #华为云签名通道号</span></span>
<span class="line"><span style="color:#032F62;">    HWY_DX_Sender=xxxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓阿里云接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启阿里云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-alydx=0</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云短信主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DX_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云短信接口密钥</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DX_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云短信签名名称</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DX_SignName=阿里云</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云短信模板ID</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DX_Template=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #是否开启阿里云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-alydh=0</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云电话主账号AccessKey的ID</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DH_AccessKeyId=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云电话接口密钥</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DH_AccessSecret=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云电话被叫显号，必须是已购买的号码</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DX_CalledShowNumber=xxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #阿里云电话文本转语音（TTS）模板ID</span></span>
<span class="line"><span style="color:#032F62;">    ALY_DH_TtsCode=xxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓容联云接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启容联云电话告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-rlydh=0</span></span>
<span class="line"><span style="color:#032F62;">    #容联云基础接口地址</span></span>
<span class="line"><span style="color:#032F62;">    RLY_URL=https://app.cloopen.com:8883/2013-12-26/Accounts/</span></span>
<span class="line"><span style="color:#032F62;">    #容联云后台SID</span></span>
<span class="line"><span style="color:#032F62;">    RLY_ACCOUNT_SID=xxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #容联云api-token</span></span>
<span class="line"><span style="color:#032F62;">    RLY_ACCOUNT_TOKEN=xxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #容联云app_id</span></span>
<span class="line"><span style="color:#032F62;">    RLY_APP_ID=xxxxxxxxxxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓邮件配置-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启邮件</span></span>
<span class="line"><span style="color:#032F62;">    open-email=0</span></span>
<span class="line"><span style="color:#032F62;">    #邮件发件服务器地址</span></span>
<span class="line"><span style="color:#032F62;">    Email_host=smtp.qq.com</span></span>
<span class="line"><span style="color:#032F62;">    #邮件发件服务器端口</span></span>
<span class="line"><span style="color:#032F62;">    Email_port=465</span></span>
<span class="line"><span style="color:#032F62;">    #邮件帐号</span></span>
<span class="line"><span style="color:#032F62;">    Email_user=xxxxxxx@qq.com</span></span>
<span class="line"><span style="color:#032F62;">    #邮件密码</span></span>
<span class="line"><span style="color:#032F62;">    Email_password=xxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #邮件标题</span></span>
<span class="line"><span style="color:#032F62;">    Email_title=运维告警</span></span>
<span class="line"><span style="color:#032F62;">    #默认发送邮箱</span></span>
<span class="line"><span style="color:#032F62;">    Default_emails=xxxxx@qq.com,xxxxx@qq.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓七陌云接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启七陌短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-7moordx=0</span></span>
<span class="line"><span style="color:#032F62;">    #七陌账户ID</span></span>
<span class="line"><span style="color:#032F62;">    7MOOR_ACCOUNT_ID=Nxxx</span></span>
<span class="line"><span style="color:#032F62;">    #七陌账户APISecret</span></span>
<span class="line"><span style="color:#032F62;">    7MOOR_ACCOUNT_APISECRET=xxx</span></span>
<span class="line"><span style="color:#032F62;">    #七陌账户短信模板编号</span></span>
<span class="line"><span style="color:#032F62;">    7MOOR_DX_TEMPLATENUM=n</span></span>
<span class="line"><span style="color:#032F62;">    #注意：七陌短信变量这里只用一个var1，在代码里写死了。</span></span>
<span class="line"><span style="color:#032F62;">    #-----------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启七陌webcall语音通知告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-7moordh=0</span></span>
<span class="line"><span style="color:#032F62;">    #请在七陌平台添加虚拟服务号、文本节点</span></span>
<span class="line"><span style="color:#032F62;">    #七陌账户webcall的虚拟服务号</span></span>
<span class="line"><span style="color:#032F62;">    7MOOR_WEBCALL_SERVICENO=xxx</span></span>
<span class="line"><span style="color:#032F62;">    # 文本节点里被替换的变量，我配置的是text。如果被替换的变量不是text，请修改此配置</span></span>
<span class="line"><span style="color:#032F62;">    7MOOR_WEBCALL_VOICE_VAR=text</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓telegram接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-tg=0</span></span>
<span class="line"><span style="color:#032F62;">    #tg机器人token</span></span>
<span class="line"><span style="color:#032F62;">    TG_TOKEN=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #tg消息模式 个人消息或者频道消息 0为关闭(推送给个人)，1为开启(推送给频道)</span></span>
<span class="line"><span style="color:#032F62;">    TG_MODE_CHAN=0</span></span>
<span class="line"><span style="color:#032F62;">    #tg用户ID</span></span>
<span class="line"><span style="color:#032F62;">    TG_USERID=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #tg频道name或者id, 频道name需要以@开始</span></span>
<span class="line"><span style="color:#032F62;">    TG_CHANNAME=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #tg api地址, 可以配置为代理地址</span></span>
<span class="line"><span style="color:#032F62;">    #TG_API_PROXY=&quot;https://api.telegram.org/bot%s/%s&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓workwechat接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启workwechat告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-workwechat=0</span></span>
<span class="line"><span style="color:#032F62;">    # 企业ID</span></span>
<span class="line"><span style="color:#032F62;">    WorkWechat_CropID=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    # 应用ID</span></span>
<span class="line"><span style="color:#032F62;">    WorkWechat_AgentID=xxxx</span></span>
<span class="line"><span style="color:#032F62;">    # 应用secret</span></span>
<span class="line"><span style="color:#032F62;">    WorkWechat_AgentSecret=xxxx</span></span>
<span class="line"><span style="color:#032F62;">    # 接受用户</span></span>
<span class="line"><span style="color:#032F62;">    WorkWechat_ToUser=&quot;zhangsan|lisi&quot;</span></span>
<span class="line"><span style="color:#032F62;">    # 接受部门</span></span>
<span class="line"><span style="color:#032F62;">    WorkWechat_ToParty=&quot;ops|dev&quot;</span></span>
<span class="line"><span style="color:#032F62;">    # 接受标签</span></span>
<span class="line"><span style="color:#032F62;">    WorkWechat_ToTag=&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">    # 消息类型, 暂时只支持markdown</span></span>
<span class="line"><span style="color:#032F62;">    # WorkWechat_Msgtype = &quot;markdown&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓百度云接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启百度云短信告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-baidudx=0</span></span>
<span class="line"><span style="color:#032F62;">    #百度云短信接口AK(ACCESS_KEY_ID)</span></span>
<span class="line"><span style="color:#032F62;">    BDY_DX_AK=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #百度云短信接口SK(SECRET_ACCESS_KEY)</span></span>
<span class="line"><span style="color:#032F62;">    BDY_DX_SK=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #百度云短信ENDPOINT（ENDPOINT参数需要用指定区域的域名来进行定义，如服务所在区域为北京，则为）</span></span>
<span class="line"><span style="color:#032F62;">    BDY_DX_ENDPOINT=http://smsv3.bj.baidubce.com</span></span>
<span class="line"><span style="color:#032F62;">    #百度云短信模版ID,根据自己审核通过的模版来填写(模版支持一个参数code：如prometheus告警:{code})</span></span>
<span class="line"><span style="color:#032F62;">    BDY_DX_TEMPLATE_ID=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #百度云短信签名ID，根据自己审核通过的签名来填写</span></span>
<span class="line"><span style="color:#032F62;">    TXY_DX_SIGNATURE_ID=xxxxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓百度Hi(如流)-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启百度Hi(如流)告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-ruliu=0</span></span>
<span class="line"><span style="color:#032F62;">    #默认百度Hi(如流)机器人地址</span></span>
<span class="line"><span style="color:#032F62;">    BDRL_URL=https://api.im.baidu.com/api/msg/groupmsgsend?access_token=xxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    #百度Hi(如流)群ID</span></span>
<span class="line"><span style="color:#032F62;">    BDRL_ID=123456</span></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓bark接口-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启telegram告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-bark=0</span></span>
<span class="line"><span style="color:#032F62;">    #bark默认地址, 建议自行部署bark-server</span></span>
<span class="line"><span style="color:#032F62;">    BARK_URL=https://api.day.app</span></span>
<span class="line"><span style="color:#032F62;">    #bark key, 多个key使用分割</span></span>
<span class="line"><span style="color:#032F62;">    BARK_KEYS=xxxxx</span></span>
<span class="line"><span style="color:#032F62;">    # 复制, 推荐开启</span></span>
<span class="line"><span style="color:#032F62;">    BARK_COPY=1</span></span>
<span class="line"><span style="color:#032F62;">    # 历史记录保存,推荐开启</span></span>
<span class="line"><span style="color:#032F62;">    BARK_ARCHIVE=1</span></span>
<span class="line"><span style="color:#032F62;">    # 消息分组</span></span>
<span class="line"><span style="color:#032F62;">    BARK_GROUP=PrometheusAlert</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓语音播报-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #语音播报需要配合语音播报插件才能使用</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启语音播报通道,0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-voice=0</span></span>
<span class="line"><span style="color:#032F62;">    VOICE_IP=127.0.0.1</span></span>
<span class="line"><span style="color:#032F62;">    VOICE_PORT=9999</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #---------------------↓飞书机器人应用-----------------------</span></span>
<span class="line"><span style="color:#032F62;">    #是否开启feishuapp告警通道,可同时开始多个通道0为关闭,1为开启</span></span>
<span class="line"><span style="color:#032F62;">    open-feishuapp=0</span></span>
<span class="line"><span style="color:#032F62;">    # APPID</span></span>
<span class="line"><span style="color:#032F62;">    FEISHU_APPID=cli_xxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    # APPSECRET</span></span>
<span class="line"><span style="color:#032F62;">    FEISHU_APPSECRET=xxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span style="color:#032F62;">    # 可填飞书 用户open_id、user_id、union_ids、部门open_department_id</span></span>
<span class="line"><span style="color:#032F62;">    AT_USER_ID=&quot;xxxxxxxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">user.csv</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    2019年4月10日,15888888881,小张,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#032F62;">    2019年4月11日,15888888882,小李,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#032F62;">    2019年4月12日,15888888883,小王,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#032F62;">    2019年4月13日,15888888884,小宋,15999999999,备用联系人小陈,15999999998,备用联系人小赵</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center-conf</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">alertname</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">alertname</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">alertname</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/prometheus-alert:v4.8.2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TZ</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center-conf-map</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/app/conf/app.conf</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center-conf-map</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/app/user.csv</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">user.csv</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-db</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/app/db</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center-conf-map</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-center-conf</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">items</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#22863A;">key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">user.csv</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">user.csv</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-alert-db</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">persistentVolumeClaim</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">claimName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prome-alert-data-pvc</span></span></code></pre></div><ul><li>执行apply</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">.PrometheusAlert-Deployment.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#032F62;">.PrometheusAlert-Deployment.yaml</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051005835.png" alt="image-20240705100552677"></p>`,27),e=[o];function c(t,r,y,E,i,F){return n(),a("div",null,e)}const C=s(l,[["render",c]]);export{m as __pageData,C as default};
