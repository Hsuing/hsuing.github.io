import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1.busybox","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/Yaml/2-yaml_example.md","filePath":"guide/container/k8s/Yaml/2-yaml_example.md","lastUpdated":1715940689000}'),l={name:"guide/container/k8s/Yaml/2-yaml_example.md"},o=p(`<h1 id="_1-busybox" tabindex="-1">1.busybox <a class="header-anchor" href="#_1-busybox" aria-label="Permalink to &quot;1.busybox&quot;">​</a></h1><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">run</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">busybox</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">busybox:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">/bin/sh</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">-c</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">sleep 10; touch /tmp/healthy; sleep 30000</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">exec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">cat</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">/tmp/healthy</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">busybox</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">busybox</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">run</span><span style="color:#24292E;">: </span><span style="color:#032F62;">busybox</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">busybox</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">busybox:latest</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">/bin/sh</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">-c</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">sleep 10; touch /tmp/healthy; sleep 30000</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">exec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">cat</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">/tmp/healthy</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span></code></pre></div><h1 id="_2-蓝绿" tabindex="-1">2.蓝绿 <a class="header-anchor" href="#_2-蓝绿" aria-label="Permalink to &quot;2.蓝绿&quot;">​</a></h1><p>在进行蓝/绿部署时，应用程序的一个新副本（绿）将与现有版本（蓝）一起部署。然后更新应用程序的入口/路由器以切换到新版本（绿）。然后，您需要等待旧（蓝）版本来完成所有发送给它的请求，但是大多数情况下，应用程序的流量将一次更改为新版本；Kubernetes不支持内置的蓝/绿部署。目前最好的方式是创建新的部署，然后更新应用程序的服务（如service）以指向新的部署；蓝绿部署是不停老版本，部署新版本然后进行测试，确认OK后将流量逐步切到新版本。蓝绿部署无需停机，并且风险较小。</p><ul><li>demo-blue1.yaml</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-blue1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">revisionHistoryLimit</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">strategy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">rollingUpdate</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">maxSurge</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">30%</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">maxUnavailable</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">30%</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-blue1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">opcache/devops-go-sample:hello1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">scheme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">HTTP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">successThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">scheme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">HTTP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">successThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-blue1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">revisionHistoryLimit</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">strategy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">rollingUpdate</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">maxSurge</span><span style="color:#24292E;">: </span><span style="color:#032F62;">30%</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">maxUnavailable</span><span style="color:#24292E;">: </span><span style="color:#032F62;">30%</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-blue1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">opcache/devops-go-sample:hello1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">scheme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">HTTP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">successThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">scheme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">HTTP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">successThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span></code></pre></div><ul><li>demo-green2.yaml</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-green2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v2</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">revisionHistoryLimit</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">strategy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">rollingUpdate</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">maxSurge</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">30%</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">maxUnavailable</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">30%</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-green2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">opcache/devops-go-sample:hello2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">scheme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">HTTP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">successThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">scheme</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">HTTP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">successThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-green2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v2</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">revisionHistoryLimit</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">strategy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">rollingUpdate</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">maxSurge</span><span style="color:#24292E;">: </span><span style="color:#032F62;">30%</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">maxUnavailable</span><span style="color:#24292E;">: </span><span style="color:#032F62;">30%</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-green2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">opcache/devops-go-sample:hello2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">scheme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">HTTP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">successThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">scheme</span><span style="color:#24292E;">: </span><span style="color:#032F62;">HTTP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">successThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span></code></pre></div><ul><li>Service-v1.yaml</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span></code></pre></div><ul><li>Service-v2.yaml</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v2</span></span></code></pre></div><ul><li>执行</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">demo-blue1.yaml</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">demo-green2.yaml</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Service-v1.yaml</span></span>
<span class="line"><span style="color:#6A737D;">#获取SVC  IP</span></span>
<span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rc,pods,svc,ingress</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-A</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-o</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wide</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">demo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">demo-blue1.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">demo-green2.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Service-v1.yaml</span></span>
<span class="line"><span style="color:#6A737D;">#获取SVC  IP</span></span>
<span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rc,pods,svc,ingress</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-A</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-o</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wide</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">demo</span></span></code></pre></div><ul><li>验证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">for i in \`seq 1 100000\`; do curl  clusterIP:8080/?a=$i ;echo &quot; &quot;; done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">for i in \`seq 1 100000\`; do curl  clusterIP:8080/?a=$i ;echo &quot; &quot;; done</span></span></code></pre></div><h1 id="_3-暴露多个端口" tabindex="-1">3.暴露多个端口 <a class="header-anchor" href="#_3-暴露多个端口" aria-label="Permalink to &quot;3.暴露多个端口&quot;">​</a></h1><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demotest1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demotest1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demotest1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demotest1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">docker pull opcache/devops-go-sample:hello1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8081</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demotest1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">default</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NodePort</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http-test1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">nodePort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8080</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http-test2</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8081</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">nodePort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8081</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demotest1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demotest1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demotest1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demotest1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demotest1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">docker pull opcache/devops-go-sample:hello1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8081</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demotest1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">default</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NodePort</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http-test1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">nodePort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8080</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http-test2</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8081</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">nodePort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8081</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demotest1</span></span></code></pre></div>`,18),e=[o];function c(t,E,r,y,i,F){return n(),a("div",null,e)}const C=s(l,[["render",c]]);export{m as __pageData,C as default};
