import{_ as s,c as a,o as n,R as l}from"./chunks/framework.CIzs38F0.js";const C=JSON.parse('{"title":"1.查看","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/cmd/service.md","filePath":"guide/container/k8s/cmd/service.md","lastUpdated":1715738069000}'),p={name:"guide/container/k8s/cmd/service.md"},o=l(`<h1 id="_1-查看" tabindex="-1">1.查看 <a class="header-anchor" href="#_1-查看" aria-label="Permalink to &quot;1.查看&quot;">​</a></h1><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# kubectl get svc</span><span style="color:#F97583;">|</span><span style="color:#B392F0;">service</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">TYPE</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">CLUSTER-IP</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">EXTERNAL-IP</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">PORT</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">S</span><span style="color:#E1E4E8;">)          </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">kubernetes</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ClusterIP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">443</span><span style="color:#9ECBFF;">/TCP</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">24</span><span style="color:#9ECBFF;">h</span></span>
<span class="line"><span style="color:#B392F0;">nginx</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">NodePort</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.253.94</span><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">8080</span><span style="color:#9ECBFF;">:32498/TCP</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">109</span><span style="color:#9ECBFF;">m</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">NodePort</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">让节点对外可以访问</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# kubectl get svc</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">service</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">         </span><span style="color:#032F62;">TYPE</span><span style="color:#24292E;">        </span><span style="color:#032F62;">CLUSTER-IP</span><span style="color:#24292E;">       </span><span style="color:#032F62;">EXTERNAL-IP</span><span style="color:#24292E;">   </span><span style="color:#032F62;">PORT</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">)          </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">kubernetes</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ClusterIP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">443</span><span style="color:#032F62;">/TCP</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">24</span><span style="color:#032F62;">h</span></span>
<span class="line"><span style="color:#6F42C1;">nginx</span><span style="color:#24292E;">        </span><span style="color:#032F62;">NodePort</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.253.94</span><span style="color:#24292E;">   </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">8080</span><span style="color:#032F62;">:32498/TCP</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">109</span><span style="color:#032F62;">m</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">NodePort</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">让节点对外可以访问</span></span></code></pre></div><h1 id="_2-创建" tabindex="-1">2.创建 <a class="header-anchor" href="#_2-创建" aria-label="Permalink to &quot;2.创建&quot;">​</a></h1><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建负载均衡</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">expose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pod</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pod_name</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--port=9999</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--tart-port=8080</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--type=NodePort</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">--port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">负载均衡port</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建负载均衡</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">expose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pod_name</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--port=9999</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--tart-port=8080</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--type=NodePort</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">--port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">负载均衡port</span></span></code></pre></div><h1 id="_3-编辑" tabindex="-1">3.编辑 <a class="header-anchor" href="#_3-编辑" aria-label="Permalink to &quot;3.编辑&quot;">​</a></h1><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# kubectl edit svc  svc_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# kubectl edit svc  svc_name</span></span></code></pre></div><h1 id="_4-访问" tabindex="-1">4.访问 <a class="header-anchor" href="#_4-访问" aria-label="Permalink to &quot;4.访问&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202404111719619.png" alt="image-20240411171842643"></p><h1 id="_5-svc查看endpoints" tabindex="-1">5.svc查看Endpoints <a class="header-anchor" href="#_5-svc查看endpoints" aria-label="Permalink to &quot;5.svc查看Endpoints&quot;">​</a></h1><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master yaml]# kubectl describe svc demo-service</span><span style="color:#F97583;">|</span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Endpoints</span></span>
<span class="line"><span style="color:#B392F0;">Endpoints:</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">172.17</span><span style="color:#9ECBFF;">.74.126:80,172.23.127.105:80,172.23.127.109:80</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">more...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master yaml]# kubectl describe svc demo-service</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Endpoints</span></span>
<span class="line"><span style="color:#6F42C1;">Endpoints:</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">172.17</span><span style="color:#032F62;">.74.126:80,172.23.127.105:80,172.23.127.109:80</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">more...</span></span></code></pre></div><ul><li>查看完整ip</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@kube-master yaml]# kubectl describe  endpoints </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">svc-name</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">Name:</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">demo-service</span></span>
<span class="line"><span style="color:#B392F0;">Namespace:</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#B392F0;">Labels:</span><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">Annotations:</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">endpoints.kubernetes.io/last-change-trigger-time:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2024</span><span style="color:#9ECBFF;">-05-14T01:50:10Z</span></span>
<span class="line"><span style="color:#B392F0;">Subsets:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Addresses:</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">172.17</span><span style="color:#9ECBFF;">.74.126,172.23.127.105,172.23.127.109,172.30.0.170,172.30.0.171</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">NotReadyAddresses:</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Ports:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Name</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">Port</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">Protocol</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">----</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--------</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">Events:</span><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;</span><span style="color:#9ECBFF;">non</span><span style="color:#E1E4E8;">e</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@kube-master yaml]# kubectl describe  endpoints </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">svc-name</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">Name:</span><span style="color:#24292E;">         </span><span style="color:#032F62;">demo-service</span></span>
<span class="line"><span style="color:#6F42C1;">Namespace:</span><span style="color:#24292E;">    </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#6F42C1;">Labels:</span><span style="color:#24292E;">       </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">Annotations:</span><span style="color:#24292E;">  </span><span style="color:#032F62;">endpoints.kubernetes.io/last-change-trigger-time:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2024</span><span style="color:#032F62;">-05-14T01:50:10Z</span></span>
<span class="line"><span style="color:#6F42C1;">Subsets:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Addresses:</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">172.17</span><span style="color:#032F62;">.74.126,172.23.127.105,172.23.127.109,172.30.0.170,172.30.0.171</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">NotReadyAddresses:</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Ports:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Name</span><span style="color:#24292E;">  </span><span style="color:#032F62;">Port</span><span style="color:#24292E;">  </span><span style="color:#032F62;">Protocol</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">----</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">----</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--------</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">http</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">    </span><span style="color:#032F62;">TCP</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">Events:</span><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;</span><span style="color:#032F62;">non</span><span style="color:#24292E;">e</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div>`,12),e=[o];function t(c,r,y,E,F,i){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{C as __pageData,h as default};