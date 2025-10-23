import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. 在k8s部署","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/harbor/2-k8s-install.md","filePath":"guide/container/harbor/2-k8s-install.md","lastUpdated":1724379325000}'),p={name:"guide/container/harbor/2-k8s-install.md"},o=l(`<h1 id="_1-在k8s部署" tabindex="-1">1. 在k8s部署 <a class="header-anchor" href="#_1-在k8s部署" aria-label="Permalink to &quot;1. 在k8s部署&quot;">​</a></h1><p>安装依赖:</p><ul><li>Kubernetes cluster 1.10+</li><li>Helm 2.8.0+</li><li>High available ingress controller (Harbor does not manage the external endpoint)</li><li>High available PostgreSQL database (Harbor does not handle the deployment of HA of database)</li><li>High available Redis (Harbor does not handle the deployment of HA of Redis)</li><li>PVC that can be shared across nodes or external object storage</li></ul><h2 id="_1-0-ssl证书" tabindex="-1">1.0 ssl证书 <a class="header-anchor" href="#_1-0-ssl证书" aria-label="Permalink to &quot;1.0 ssl证书&quot;">​</a></h2><h2 id="_1-1-helm部署" tabindex="-1">1.1 helm部署 <a class="header-anchor" href="#_1-1-helm部署" aria-label="Permalink to &quot;1.1 helm部署&quot;">​</a></h2><h3 id="_1-1-1-添加仓库" tabindex="-1">1.1.1 添加仓库 <a class="header-anchor" href="#_1-1-1-添加仓库" aria-label="Permalink to &quot;1.1.1 添加仓库&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 添加仓库</span></span>
<span class="line"><span style="color:#B392F0;">helm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">repo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://helm.goharbor.io</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# helm repo list</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">      	</span><span style="color:#9ECBFF;">URL</span></span>
<span class="line"><span style="color:#B392F0;">bitnami</span><span style="color:#E1E4E8;">   	</span><span style="color:#9ECBFF;">https://charts.bitnami.com/bitnami</span></span>
<span class="line"><span style="color:#B392F0;">openkruise</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">https://openkruise.github.io/charts</span></span>
<span class="line"><span style="color:#B392F0;">harbor</span><span style="color:#E1E4E8;">    	</span><span style="color:#9ECBFF;">https://helm.goharbor.io</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 添加仓库</span></span>
<span class="line"><span style="color:#6F42C1;">helm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">repo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://helm.goharbor.io</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# helm repo list</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">      	</span><span style="color:#032F62;">URL</span></span>
<span class="line"><span style="color:#6F42C1;">bitnami</span><span style="color:#24292E;">   	</span><span style="color:#032F62;">https://charts.bitnami.com/bitnami</span></span>
<span class="line"><span style="color:#6F42C1;">openkruise</span><span style="color:#24292E;">	</span><span style="color:#032F62;">https://openkruise.github.io/charts</span></span>
<span class="line"><span style="color:#6F42C1;">harbor</span><span style="color:#24292E;">    	</span><span style="color:#032F62;">https://helm.goharbor.io</span></span></code></pre></div><p>配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://github.com/goharbor/harbor-helm/blob/master/values.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://github.com/goharbor/harbor-helm/blob/master/values.yaml</span></span></code></pre></div><p>几个重要的配置</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">expose</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 设置暴露服务的方式：&quot;ingress&quot;, &quot;clusterIP&quot;, &quot;nodePort&quot; or &quot;loadBalancer&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ingress</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">tls</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># SSL</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ingress</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">hosts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Core 域名</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">core</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">core.harbor.domain</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Notary 域名</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">notary</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">notary.harbor.domain</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 一般就是 nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">className</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露给外部访问的域名</span></span>
<span class="line"><span style="color:#85E89D;">externalURL</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">https://core.harbor.domain</span></span>
<span class="line"><span style="color:#B392F0;">...</span></span>
<span class="line"><span style="color:#6A737D;"># 数据持久化</span></span>
<span class="line"><span style="color:#85E89D;">persistence</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resourcePolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;keep&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">persistentVolumeClaim</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># 因为需要高可用，一般需要使用支持 ReadWriteMany 存储</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">jobservice</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">jobLog</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">database</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">trivy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">imageChartStorage</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 各种存储介质</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">filesystem</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">filesystem</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 日志级别</span></span>
<span class="line"><span style="color:#85E89D;">logLevel</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">info</span></span>
<span class="line"><span style="color:#6A737D;"># 默认密码</span></span>
<span class="line"><span style="color:#85E89D;">harborAdminPassword</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Harbor12345&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 服务部署，主要修改副本数</span></span>
<span class="line"><span style="color:#85E89D;">nginx</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">portal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">core</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">jobservice</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">trivy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">notary</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 数据库可以自带也可以用外部的</span></span>
<span class="line"><span style="color:#85E89D;">database</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;"># Redis 可以自带也可以用外部的</span></span>
<span class="line"><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 监控</span></span>
<span class="line"><span style="color:#85E89D;">exporter</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">metrics</span><span style="color:#E1E4E8;">:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">expose</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 设置暴露服务的方式：&quot;ingress&quot;, &quot;clusterIP&quot;, &quot;nodePort&quot; or &quot;loadBalancer&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ingress</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">tls</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># SSL</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ingress</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">hosts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Core 域名</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">core</span><span style="color:#24292E;">: </span><span style="color:#032F62;">core.harbor.domain</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Notary 域名</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">notary</span><span style="color:#24292E;">: </span><span style="color:#032F62;">notary.harbor.domain</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 一般就是 nginx</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">className</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 暴露给外部访问的域名</span></span>
<span class="line"><span style="color:#22863A;">externalURL</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://core.harbor.domain</span></span>
<span class="line"><span style="color:#6F42C1;">...</span></span>
<span class="line"><span style="color:#6A737D;"># 数据持久化</span></span>
<span class="line"><span style="color:#22863A;">persistence</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resourcePolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;keep&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">persistentVolumeClaim</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># 因为需要高可用，一般需要使用支持 ReadWriteMany 存储</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">jobservice</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">jobLog</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">database</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">trivy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">imageChartStorage</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 各种存储介质</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">filesystem</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">filesystem</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 日志级别</span></span>
<span class="line"><span style="color:#22863A;">logLevel</span><span style="color:#24292E;">: </span><span style="color:#032F62;">info</span></span>
<span class="line"><span style="color:#6A737D;"># 默认密码</span></span>
<span class="line"><span style="color:#22863A;">harborAdminPassword</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Harbor12345&quot;</span></span>
<span class="line"><span style="color:#6A737D;"># 服务部署，主要修改副本数</span></span>
<span class="line"><span style="color:#22863A;">nginx</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">portal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">core</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">jobservice</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">trivy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">notary</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 数据库可以自带也可以用外部的</span></span>
<span class="line"><span style="color:#22863A;">database</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;"># Redis 可以自带也可以用外部的</span></span>
<span class="line"><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 监控</span></span>
<span class="line"><span style="color:#22863A;">exporter</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">metrics</span><span style="color:#24292E;">:</span></span></code></pre></div><h3 id="_1-1-2-搜索chart" tabindex="-1">1.1.2 搜索chart <a class="header-anchor" href="#_1-1-2-搜索chart" aria-label="Permalink to &quot;1.1.2  搜索chart&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# helm search repo harbor -l </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor/harbor</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">head</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-4</span></span>
<span class="line"><span style="color:#B392F0;">harbor/harbor</span><span style="color:#E1E4E8;"> 	</span><span style="color:#79B8FF;">1.15</span><span style="color:#9ECBFF;">.0</span><span style="color:#E1E4E8;">       	</span><span style="color:#79B8FF;">2.11</span><span style="color:#9ECBFF;">.0</span><span style="color:#E1E4E8;">     	</span><span style="color:#9ECBFF;">An</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">open</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">trusted</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cloud</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">native</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">th...</span></span>
<span class="line"><span style="color:#B392F0;">harbor/harbor</span><span style="color:#E1E4E8;"> 	</span><span style="color:#79B8FF;">1.14</span><span style="color:#9ECBFF;">.3</span><span style="color:#E1E4E8;">       	</span><span style="color:#79B8FF;">2.10</span><span style="color:#9ECBFF;">.3</span><span style="color:#E1E4E8;">     	</span><span style="color:#9ECBFF;">An</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">open</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">trusted</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cloud</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">native</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">th...</span></span>
<span class="line"><span style="color:#B392F0;">harbor/harbor</span><span style="color:#E1E4E8;"> 	</span><span style="color:#79B8FF;">1.14</span><span style="color:#9ECBFF;">.2</span><span style="color:#E1E4E8;">       	</span><span style="color:#79B8FF;">2.10</span><span style="color:#9ECBFF;">.2</span><span style="color:#E1E4E8;">     	</span><span style="color:#9ECBFF;">An</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">open</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">trusted</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cloud</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">native</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">th...</span></span>
<span class="line"><span style="color:#B392F0;">harbor/harbor</span><span style="color:#E1E4E8;"> 	</span><span style="color:#79B8FF;">1.14</span><span style="color:#9ECBFF;">.1</span><span style="color:#E1E4E8;">       	</span><span style="color:#79B8FF;">2.10</span><span style="color:#9ECBFF;">.1</span><span style="color:#E1E4E8;">     	</span><span style="color:#9ECBFF;">An</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">open</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">source</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">trusted</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cloud</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">native</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">th...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# helm search repo harbor -l </span><span style="color:#D73A49;">|</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor/harbor</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">head</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-4</span></span>
<span class="line"><span style="color:#6F42C1;">harbor/harbor</span><span style="color:#24292E;"> 	</span><span style="color:#005CC5;">1.15</span><span style="color:#032F62;">.0</span><span style="color:#24292E;">       	</span><span style="color:#005CC5;">2.11</span><span style="color:#032F62;">.0</span><span style="color:#24292E;">     	</span><span style="color:#032F62;">An</span><span style="color:#24292E;"> </span><span style="color:#032F62;">open</span><span style="color:#24292E;"> </span><span style="color:#032F62;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">trusted</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cloud</span><span style="color:#24292E;"> </span><span style="color:#032F62;">native</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry</span><span style="color:#24292E;"> </span><span style="color:#032F62;">th...</span></span>
<span class="line"><span style="color:#6F42C1;">harbor/harbor</span><span style="color:#24292E;"> 	</span><span style="color:#005CC5;">1.14</span><span style="color:#032F62;">.3</span><span style="color:#24292E;">       	</span><span style="color:#005CC5;">2.10</span><span style="color:#032F62;">.3</span><span style="color:#24292E;">     	</span><span style="color:#032F62;">An</span><span style="color:#24292E;"> </span><span style="color:#032F62;">open</span><span style="color:#24292E;"> </span><span style="color:#032F62;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">trusted</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cloud</span><span style="color:#24292E;"> </span><span style="color:#032F62;">native</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry</span><span style="color:#24292E;"> </span><span style="color:#032F62;">th...</span></span>
<span class="line"><span style="color:#6F42C1;">harbor/harbor</span><span style="color:#24292E;"> 	</span><span style="color:#005CC5;">1.14</span><span style="color:#032F62;">.2</span><span style="color:#24292E;">       	</span><span style="color:#005CC5;">2.10</span><span style="color:#032F62;">.2</span><span style="color:#24292E;">     	</span><span style="color:#032F62;">An</span><span style="color:#24292E;"> </span><span style="color:#032F62;">open</span><span style="color:#24292E;"> </span><span style="color:#032F62;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">trusted</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cloud</span><span style="color:#24292E;"> </span><span style="color:#032F62;">native</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry</span><span style="color:#24292E;"> </span><span style="color:#032F62;">th...</span></span>
<span class="line"><span style="color:#6F42C1;">harbor/harbor</span><span style="color:#24292E;"> 	</span><span style="color:#005CC5;">1.14</span><span style="color:#032F62;">.1</span><span style="color:#24292E;">       	</span><span style="color:#005CC5;">2.10</span><span style="color:#032F62;">.1</span><span style="color:#24292E;">     	</span><span style="color:#032F62;">An</span><span style="color:#24292E;"> </span><span style="color:#032F62;">open</span><span style="color:#24292E;"> </span><span style="color:#032F62;">source</span><span style="color:#24292E;"> </span><span style="color:#032F62;">trusted</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cloud</span><span style="color:#24292E;"> </span><span style="color:#032F62;">native</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry</span><span style="color:#24292E;"> </span><span style="color:#032F62;">th...</span></span></code></pre></div><h3 id="_1-1-3-下载" tabindex="-1">1.1.3 下载 <a class="header-anchor" href="#_1-1-3-下载" aria-label="Permalink to &quot;1.1.3 下载&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#不指定版本,则下载最新版本</span></span>
<span class="line"><span style="color:#B392F0;">helm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">fetch</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor/harbor</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--untar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定版本</span></span>
<span class="line"><span style="color:#B392F0;">helm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor/harbor</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2.11</span><span style="color:#9ECBFF;">.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#不指定版本,则下载最新版本</span></span>
<span class="line"><span style="color:#6F42C1;">helm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">fetch</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor/harbor</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--untar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定版本</span></span>
<span class="line"><span style="color:#6F42C1;">helm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor/harbor</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2.11</span><span style="color:#032F62;">.0</span></span></code></pre></div><h3 id="_1-1-4-安装" tabindex="-1">1.1.4 安装 <a class="header-anchor" href="#_1-1-4-安装" aria-label="Permalink to &quot;1.1.4 安装&quot;">​</a></h3><ul><li>创建namepase</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">namespace</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kube-harbor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#032F62;">namespace</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kube-harbor</span></span></code></pre></div><ul><li>修改配置文件</li></ul><p>vi values.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#入口配置， 暴露服务的方式：&quot;ingress&quot;, &quot;clusterIP&quot;, &quot;nodePort&quot; or &quot;loadBalancer&quot;</span></span>
<span class="line"><span style="color:#85E89D;">expose</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ingress</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">tls</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">### 是否启用 https 协议</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">certSource</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">secret</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">auto</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># The common name used to generate the certificate, it&#39;s necessary</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># when the type isn&#39;t &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">commonName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;harbor.ikubernetes.net&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">secret</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">secretName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;harbor-tls&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Only needed when the &quot;expose.type&quot; is &quot;ingress&quot;.</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">notarySecretName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 如果Harbor部署在代理后，将其设置为代理的URL</span></span>
<span class="line"><span style="color:#85E89D;">externalURL</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">https://harbor.ikubernetes.net</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### Harbor 各个组件的持久化配置，并将 storageClass 设置为集群默认的 storageClass</span></span>
<span class="line"><span style="color:#85E89D;">persistence</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Setting it to &quot;keep&quot; to avoid removing PVCs during a helm delete</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># operation. Leaving it empty will delete PVCs after the chart deleted</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># (this does not apply for PVCs that are created for internal database</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># and redis components, i.e. they are never deleted automatically)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resourcePolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;keep&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">persistentVolumeClaim</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Use the existing PVC which must be created manually before bound,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># and specify the &quot;subPath&quot; if the PVC is shared with other components</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Specify the &quot;storageClass&quot; used to provision the volume. Or the default</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># StorageClass will be used(the default).</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Set it to &quot;-&quot; to disable dynamic provisioning</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 因为需要高可用，一般需要使用支持 ReadWriteMany 存储</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">chartmuseum</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">jobservice</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># If external database is used, the following settings for database will</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">database</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># If external Redis is used, the following settings for Redis will</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">trivy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 默认用户名 admin 的密码配置，注意：密码中一定要包含大小写字母与数字</span></span>
<span class="line"><span style="color:#85E89D;">harborAdminPassword</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hx123456&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 设置日志级别</span></span>
<span class="line"><span style="color:#85E89D;">logLevel</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#各个组件 CPU &amp; Memory 资源相关配置</span></span>
<span class="line"><span style="color:#85E89D;">nginx</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">portal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">core</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1000m</span></span>
<span class="line"><span style="color:#85E89D;">jobservice</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">controller</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">clair</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">clair</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">adapter</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">notary</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">signer</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">database</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">internal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">internal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">trivy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">200m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1000m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1024Mi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开启 chartmuseum，使 Harbor 能够存储 Helm 的 chart</span></span>
<span class="line"><span style="color:#85E89D;">chartmuseum</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">imageChartStorage</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Specify whether to disable \`redirect\` for images and chart storage, for</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># backends which not supported it (such as using minio for \`s3\` storage type), please disable</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># it. To disable redirects, simply set \`disableredirect\` to \`true\` instead.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Refer to</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># https://github.com/docker/distribution/blob/master/docs/configuration.md#redirect</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># for the detail.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">disableredirect</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Specify the &quot;caBundleSecretName&quot; if the storage service uses a self-signed certificate.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># The secret must contain keys named &quot;ca.crt&quot; which will be injected into the trust store</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># of registry&#39;s and chartmuseum&#39;s containers.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># caBundleSecretName:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Specify the type of storage: &quot;filesystem&quot;, &quot;azure&quot;, &quot;gcs&quot;, &quot;s3&quot;, &quot;swift&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># &quot;oss&quot; and fill the information needed in the corresponding section. The type</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># must be &quot;filesystem&quot; if you want to use persistent volumes for registry</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># and chartmuseum</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">s3</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">s3</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">region</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">cn-hangzhou-1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">bucket</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">harbor</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accesskey</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">VGZQY32LMFQOQPVNTDSJ</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">secretkey</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">YZMMYqoy1ypHaqGOUfwLvdAj9A731iDYDjYqwkU5</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">regionendpoint</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http://172.16.7.1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#encrypt: false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#keyid: mykeyid</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">secure</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#skipverify: false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#v4auth: true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#chunksize: &quot;5242880&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#rootdirectory: /s3/object/name/prefix</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#storageclass: STANDARD</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#multipartcopychunksize: &quot;33554432&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#multipartcopymaxconcurrency: 100</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#multipartcopythresholdsize: &quot;33554432&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#入口配置， 暴露服务的方式：&quot;ingress&quot;, &quot;clusterIP&quot;, &quot;nodePort&quot; or &quot;loadBalancer&quot;</span></span>
<span class="line"><span style="color:#22863A;">expose</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ingress</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">tls</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">### 是否启用 https 协议</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">certSource</span><span style="color:#24292E;">: </span><span style="color:#032F62;">secret</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">auto</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># The common name used to generate the certificate, it&#39;s necessary</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># when the type isn&#39;t &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">commonName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;harbor.ikubernetes.net&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">secret</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">secretName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;harbor-tls&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Only needed when the &quot;expose.type&quot; is &quot;ingress&quot;.</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">notarySecretName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 如果Harbor部署在代理后，将其设置为代理的URL</span></span>
<span class="line"><span style="color:#22863A;">externalURL</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://harbor.ikubernetes.net</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### Harbor 各个组件的持久化配置，并将 storageClass 设置为集群默认的 storageClass</span></span>
<span class="line"><span style="color:#22863A;">persistence</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Setting it to &quot;keep&quot; to avoid removing PVCs during a helm delete</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># operation. Leaving it empty will delete PVCs after the chart deleted</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># (this does not apply for PVCs that are created for internal database</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># and redis components, i.e. they are never deleted automatically)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resourcePolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;keep&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">persistentVolumeClaim</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Use the existing PVC which must be created manually before bound,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># and specify the &quot;subPath&quot; if the PVC is shared with other components</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Specify the &quot;storageClass&quot; used to provision the volume. Or the default</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># StorageClass will be used(the default).</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Set it to &quot;-&quot; to disable dynamic provisioning</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 因为需要高可用，一般需要使用支持 ReadWriteMany 存储</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">chartmuseum</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">jobservice</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># If external database is used, the following settings for database will</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">database</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># If external Redis is used, the following settings for Redis will</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">trivy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 默认用户名 admin 的密码配置，注意：密码中一定要包含大小写字母与数字</span></span>
<span class="line"><span style="color:#22863A;">harborAdminPassword</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hx123456&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 设置日志级别</span></span>
<span class="line"><span style="color:#22863A;">logLevel</span><span style="color:#24292E;">: </span><span style="color:#032F62;">info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#各个组件 CPU &amp; Memory 资源相关配置</span></span>
<span class="line"><span style="color:#22863A;">nginx</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">portal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">core</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1000m</span></span>
<span class="line"><span style="color:#22863A;">jobservice</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">controller</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">clair</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">clair</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">adapter</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">notary</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">signer</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">database</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">internal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">internal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">trivy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">200m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512Mi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1000m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1024Mi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开启 chartmuseum，使 Harbor 能够存储 Helm 的 chart</span></span>
<span class="line"><span style="color:#22863A;">chartmuseum</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">imageChartStorage</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Specify whether to disable \`redirect\` for images and chart storage, for</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># backends which not supported it (such as using minio for \`s3\` storage type), please disable</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># it. To disable redirects, simply set \`disableredirect\` to \`true\` instead.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Refer to</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># https://github.com/docker/distribution/blob/master/docs/configuration.md#redirect</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># for the detail.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">disableredirect</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Specify the &quot;caBundleSecretName&quot; if the storage service uses a self-signed certificate.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># The secret must contain keys named &quot;ca.crt&quot; which will be injected into the trust store</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># of registry&#39;s and chartmuseum&#39;s containers.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># caBundleSecretName:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Specify the type of storage: &quot;filesystem&quot;, &quot;azure&quot;, &quot;gcs&quot;, &quot;s3&quot;, &quot;swift&quot;,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># &quot;oss&quot; and fill the information needed in the corresponding section. The type</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># must be &quot;filesystem&quot; if you want to use persistent volumes for registry</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># and chartmuseum</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">s3</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">s3</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">region</span><span style="color:#24292E;">: </span><span style="color:#032F62;">cn-hangzhou-1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">bucket</span><span style="color:#24292E;">: </span><span style="color:#032F62;">harbor</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accesskey</span><span style="color:#24292E;">: </span><span style="color:#032F62;">VGZQY32LMFQOQPVNTDSJ</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">secretkey</span><span style="color:#24292E;">: </span><span style="color:#032F62;">YZMMYqoy1ypHaqGOUfwLvdAj9A731iDYDjYqwkU5</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">regionendpoint</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http://172.16.7.1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#encrypt: false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#keyid: mykeyid</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">secure</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#skipverify: false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#v4auth: true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#chunksize: &quot;5242880&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#rootdirectory: /s3/object/name/prefix</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#storageclass: STANDARD</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#multipartcopychunksize: &quot;33554432&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#multipartcopymaxconcurrency: 100</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#multipartcopythresholdsize: &quot;33554432&quot;</span></span></code></pre></div><ul><li>安装</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">helm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor/harbor</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor_values.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-n</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">harbor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">helm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor/harbor</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor_values.yaml</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-n</span><span style="color:#24292E;"> </span><span style="color:#032F62;">harbor</span></span></code></pre></div><h2 id="_1-2-数据库在外部" tabindex="-1">1.2 数据库在外部 <a class="header-anchor" href="#_1-2-数据库在外部" aria-label="Permalink to &quot;1.2 数据库在外部&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#入口配置， 暴露服务的方式：&quot;ingress&quot;, &quot;clusterIP&quot;, &quot;nodePort&quot; or &quot;loadBalancer&quot;</span></span>
<span class="line"><span style="color:#85E89D;">expose</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ingress</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">tls</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">### 是否启用 https 协议</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">certSource</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">secret</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">auto</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># The common name used to generate the certificate, it&#39;s necessary</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># when the type isn&#39;t &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">commonName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;harbor.ikubernetes.net&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">secret</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">secretName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;harbor-tls&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Only needed when the &quot;expose.type&quot; is &quot;ingress&quot;.</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">notarySecretName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 如果Harbor部署在代理后，将其设置为代理的URL</span></span>
<span class="line"><span style="color:#85E89D;">externalURL</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">https://harbor.ikubernetes.net</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### Harbor 各个组件的持久化配置，并将 storageClass 设置为集群默认的 storageClass</span></span>
<span class="line"><span style="color:#85E89D;">persistence</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># Setting it to &quot;keep&quot; to avoid removing PVCs during a helm delete</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># operation. Leaving it empty will delete PVCs after the chart deleted</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># (this does not apply for PVCs that are created for internal database</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># and redis components, i.e. they are never deleted automatically)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resourcePolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;keep&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">persistentVolumeClaim</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Use the existing PVC which must be created manually before bound,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># and specify the &quot;subPath&quot; if the PVC is shared with other components</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Specify the &quot;storageClass&quot; used to provision the volume. Or the default</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># StorageClass will be used(the default).</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># Set it to &quot;-&quot; to disable dynamic provisioning</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 因为需要高可用，一般需要使用支持 ReadWriteMany 存储</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">chartmuseum</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">jobservice</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># If external database is used, the following settings for database will</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">database</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># If external Redis is used, the following settings for Redis will</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">trivy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">existingClaim</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storageClass</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">subPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accessMode</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 默认用户名 admin 的密码配置，注意：密码中一定要包含大小写字母与数字</span></span>
<span class="line"><span style="color:#85E89D;">harborAdminPassword</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hx123456&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 设置日志级别</span></span>
<span class="line"><span style="color:#85E89D;">logLevel</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#各个组件 CPU &amp; Memory 资源相关配置</span></span>
<span class="line"><span style="color:#85E89D;">nginx</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">portal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">core</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1000m</span></span>
<span class="line"><span style="color:#85E89D;">jobservice</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">registry</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">controller</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">clair</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">clair</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">adapter</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">notary</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">signer</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">database</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">external</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">external</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">host</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;172.139.20.188&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;5432&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;postgres&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;123456&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">coreDatabase</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;registry&quot;</span></span>
<span class="line"><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">internal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#85E89D;">trivy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">200m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1000m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1024Mi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开启 chartmuseum，使 Harbor 能够存储 Helm 的 chart</span></span>
<span class="line"><span style="color:#85E89D;">chartmuseum</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">imageChartStorage</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Specify whether to disable \`redirect\` for images and chart storage, for</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># backends which not supported it (such as using minio for \`s3\` storage type), please disable</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># it. To disable redirects, simply set \`disableredirect\` to \`true\` instead.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Refer to</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># https://github.com/docker/distribution/blob/master/docs/configuration.md#redirect</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># for the detail.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">disableredirect</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Specify the &quot;caBundleSecretName&quot; if the storage service uses a self-signed certificate.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># The secret must contain keys named &quot;ca.crt&quot; which will be injected into the trust store</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># of registry&#39;s and chartmuseum&#39;s containers.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># caBundleSecretName:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># Specify the type of storage: &quot;filesystem&quot;, &quot;azure&quot;, &quot;gcs&quot;, &quot;s3&quot;, &quot;swift&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># &quot;oss&quot; and fill the information needed in the corresponding section. The type</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># must be &quot;filesystem&quot; if you want to use persistent volumes for registry</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># and chartmuseum</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">s3</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">s3</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">region</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">cn-hangzhou-1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">bucket</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">harbor</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">accesskey</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">VGZQY32LMFQOQPVNTDSJ</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">secretkey</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">YZMMYqoy1ypHaqGOUfwLvdAj9A731iDYDjYqwkU5</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">regionendpoint</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http://172.16.7.1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#encrypt: false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#keyid: mykeyid</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">secure</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#skipverify: false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#v4auth: true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#chunksize: &quot;5242880&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#rootdirectory: /s3/object/name/prefix</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#storageclass: STANDARD</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#multipartcopychunksize: &quot;33554432&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#multipartcopymaxconcurrency: 100</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">#multipartcopythresholdsize: &quot;33554432&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#入口配置， 暴露服务的方式：&quot;ingress&quot;, &quot;clusterIP&quot;, &quot;nodePort&quot; or &quot;loadBalancer&quot;</span></span>
<span class="line"><span style="color:#22863A;">expose</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ingress</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">tls</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">### 是否启用 https 协议</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">certSource</span><span style="color:#24292E;">: </span><span style="color:#032F62;">secret</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">auto</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># The common name used to generate the certificate, it&#39;s necessary</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># when the type isn&#39;t &quot;ingress&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">commonName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;harbor.ikubernetes.net&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">secret</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">secretName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;harbor-tls&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># The name of secret which contains keys named:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.crt&quot; - the certificate</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># &quot;tls.key&quot; - the private key</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Only needed when the &quot;expose.type&quot; is &quot;ingress&quot;.</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">notarySecretName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 如果Harbor部署在代理后，将其设置为代理的URL</span></span>
<span class="line"><span style="color:#22863A;">externalURL</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://harbor.ikubernetes.net</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### Harbor 各个组件的持久化配置，并将 storageClass 设置为集群默认的 storageClass</span></span>
<span class="line"><span style="color:#22863A;">persistence</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># Setting it to &quot;keep&quot; to avoid removing PVCs during a helm delete</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># operation. Leaving it empty will delete PVCs after the chart deleted</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># (this does not apply for PVCs that are created for internal database</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># and redis components, i.e. they are never deleted automatically)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resourcePolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;keep&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">persistentVolumeClaim</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Use the existing PVC which must be created manually before bound,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># and specify the &quot;subPath&quot; if the PVC is shared with other components</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Specify the &quot;storageClass&quot; used to provision the volume. Or the default</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># StorageClass will be used(the default).</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># Set it to &quot;-&quot; to disable dynamic provisioning</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 因为需要高可用，一般需要使用支持 ReadWriteMany 存储</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">chartmuseum</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">jobservice</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># If external database is used, the following settings for database will</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">database</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># If external Redis is used, the following settings for Redis will</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># be ignored</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">trivy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">existingClaim</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storageClass</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;csi-rbd-sc&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">subPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accessMode</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 默认用户名 admin 的密码配置，注意：密码中一定要包含大小写字母与数字</span></span>
<span class="line"><span style="color:#22863A;">harborAdminPassword</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hx123456&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 设置日志级别</span></span>
<span class="line"><span style="color:#22863A;">logLevel</span><span style="color:#24292E;">: </span><span style="color:#032F62;">info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#各个组件 CPU &amp; Memory 资源相关配置</span></span>
<span class="line"><span style="color:#22863A;">nginx</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">portal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">core</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1000m</span></span>
<span class="line"><span style="color:#22863A;">jobservice</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">registry</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">controller</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">clair</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">clair</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">adapter</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">notary</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">signer</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">database</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">external</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">external</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">host</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;172.139.20.188&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;5432&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;postgres&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;123456&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">coreDatabase</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;registry&quot;</span></span>
<span class="line"><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">internal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#22863A;">trivy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">200m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512Mi</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1000m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1024Mi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开启 chartmuseum，使 Harbor 能够存储 Helm 的 chart</span></span>
<span class="line"><span style="color:#22863A;">chartmuseum</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">imageChartStorage</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Specify whether to disable \`redirect\` for images and chart storage, for</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># backends which not supported it (such as using minio for \`s3\` storage type), please disable</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># it. To disable redirects, simply set \`disableredirect\` to \`true\` instead.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Refer to</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># https://github.com/docker/distribution/blob/master/docs/configuration.md#redirect</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># for the detail.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">disableredirect</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Specify the &quot;caBundleSecretName&quot; if the storage service uses a self-signed certificate.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># The secret must contain keys named &quot;ca.crt&quot; which will be injected into the trust store</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># of registry&#39;s and chartmuseum&#39;s containers.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># caBundleSecretName:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># Specify the type of storage: &quot;filesystem&quot;, &quot;azure&quot;, &quot;gcs&quot;, &quot;s3&quot;, &quot;swift&quot;,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># &quot;oss&quot; and fill the information needed in the corresponding section. The type</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># must be &quot;filesystem&quot; if you want to use persistent volumes for registry</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># and chartmuseum</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">s3</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">s3</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">region</span><span style="color:#24292E;">: </span><span style="color:#032F62;">cn-hangzhou-1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">bucket</span><span style="color:#24292E;">: </span><span style="color:#032F62;">harbor</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">accesskey</span><span style="color:#24292E;">: </span><span style="color:#032F62;">VGZQY32LMFQOQPVNTDSJ</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">secretkey</span><span style="color:#24292E;">: </span><span style="color:#032F62;">YZMMYqoy1ypHaqGOUfwLvdAj9A731iDYDjYqwkU5</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">regionendpoint</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http://172.16.7.1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#encrypt: false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#keyid: mykeyid</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">secure</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#skipverify: false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#v4auth: true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#chunksize: &quot;5242880&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#rootdirectory: /s3/object/name/prefix</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#storageclass: STANDARD</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#multipartcopychunksize: &quot;33554432&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#multipartcopymaxconcurrency: 100</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">#multipartcopythresholdsize: &quot;33554432&quot;</span></span></code></pre></div>`,25),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const A=s(p,[["render",t]]);export{d as __pageData,A as default};
