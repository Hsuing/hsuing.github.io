import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. 基于钉钉的报警媒介","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus/7-dingding.md","filePath":"guide/container/k8s/monitor/prometheus/7-dingding.md","lastUpdated":1720533756000}'),p={name:"guide/container/k8s/monitor/prometheus/7-dingding.md"},o=l(`<h1 id="_1-基于钉钉的报警媒介" tabindex="-1">1. 基于钉钉的报警媒介 <a class="header-anchor" href="#_1-基于钉钉的报警媒介" aria-label="Permalink to &quot;1. 基于钉钉的报警媒介&quot;">​</a></h1><h2 id="_1-1-生成钉钉机器人" tabindex="-1">1.1 生成钉钉机器人 <a class="header-anchor" href="#_1-1-生成钉钉机器人" aria-label="Permalink to &quot;1.1 生成钉钉机器人&quot;">​</a></h2><p>1.打开钉钉的智能群助手，点击添加机器人</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031432185.png" alt="img"></p><p>2.选择自定义机器人</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031433074.png" alt="img"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031433841.png" alt="img"></p><p>3.复制webhook地址后点击保存</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031433701.png" alt="img"></p><h1 id="_2-dingtalk部署" tabindex="-1">2. dingtalk部署 <a class="header-anchor" href="#_2-dingtalk部署" aria-label="Permalink to &quot;2. dingtalk部署&quot;">​</a></h1><h2 id="_2-1-创建configmap" tabindex="-1">2.1 创建configmap <a class="header-anchor" href="#_2-1-创建configmap" aria-label="Permalink to &quot;2.1 创建configmap&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk-cm</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">config.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    templates:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - /etc/prometheus-webhook-dingtalk/dingding.tmpl</span></span>
<span class="line"><span style="color:#9ECBFF;">    targets:</span></span>
<span class="line"><span style="color:#9ECBFF;">      webhook:</span></span>
<span class="line"><span style="color:#9ECBFF;">        url: https://oapi.dingtalk.com/robot/send?access_token=e5f3dbfbf4e3070427486e1ca288f3077aa5155d51f33ea012a838cc3070eb53</span></span>
<span class="line"><span style="color:#9ECBFF;">        message:</span></span>
<span class="line"><span style="color:#9ECBFF;">          text: &#39;{{ template &quot;dingtalk.to.message&quot; . }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">dingding.tmpl</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ define &quot;dingtalk.to.message&quot; }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if gt (len .Alerts.Firing) 0 -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    =========  **监控告警** ========= &lt;br&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    **告警集群:**     k8s &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警类型:**    {{ $alert.Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警级别:**    {{ $alert.Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警状态:**    {{ .Status }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **故障主机:**    {{ $alert.Labels.instance }} {{ $alert.Labels.device }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警主题:**    {{ .Annotations.summary }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警详情:**    {{ $alert.Annotations.message }}{{ $alert.Annotations.description}} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **主机标签:**    {{ range .Labels.SortedPairs  }}  &lt;/br&gt; [{{ .Name }}: {{ .Value | markdown | html }} ] &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    **故障时间:**    {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= = **end** =  =========</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if gt (len .Alerts.Resolved) 0 -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    ========= **故障恢复** ========= &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警集群:**     k8s &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警主题:**    {{ $alert.Annotations.summary }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警主机:**    {{ .Labels.instance }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警类型:**    {{ .Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警级别:**    {{ $alert.Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警状态:**    {{ .Status }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **告警详情:**    {{ $alert.Annotations.message }}{{ $alert.Annotations.description}} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **故障时间:**    {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    **恢复时间:**    {{ ($alert.EndsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    ========= = **end** =  =========</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk-cm</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">config.yml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    templates:</span></span>
<span class="line"><span style="color:#032F62;">      - /etc/prometheus-webhook-dingtalk/dingding.tmpl</span></span>
<span class="line"><span style="color:#032F62;">    targets:</span></span>
<span class="line"><span style="color:#032F62;">      webhook:</span></span>
<span class="line"><span style="color:#032F62;">        url: https://oapi.dingtalk.com/robot/send?access_token=e5f3dbfbf4e3070427486e1ca288f3077aa5155d51f33ea012a838cc3070eb53</span></span>
<span class="line"><span style="color:#032F62;">        message:</span></span>
<span class="line"><span style="color:#032F62;">          text: &#39;{{ template &quot;dingtalk.to.message&quot; . }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">dingding.tmpl</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    {{ define &quot;dingtalk.to.message&quot; }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- if gt (len .Alerts.Firing) 0 -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    =========  **监控告警** ========= &lt;br&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    **告警集群:**     k8s &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警类型:**    {{ $alert.Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警级别:**    {{ $alert.Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警状态:**    {{ .Status }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **故障主机:**    {{ $alert.Labels.instance }} {{ $alert.Labels.device }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警主题:**    {{ .Annotations.summary }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警详情:**    {{ $alert.Annotations.message }}{{ $alert.Annotations.description}} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **主机标签:**    {{ range .Labels.SortedPairs  }}  &lt;/br&gt; [{{ .Name }}: {{ .Value | markdown | html }} ] &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    **故障时间:**    {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    ========= = **end** =  =========</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    {{- if gt (len .Alerts.Resolved) 0 -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    ========= **故障恢复** ========= &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警集群:**     k8s &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警主题:**    {{ $alert.Annotations.summary }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警主机:**    {{ .Labels.instance }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警类型:**    {{ .Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警级别:**    {{ $alert.Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警状态:**    {{ .Status }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **告警详情:**    {{ $alert.Annotations.message }}{{ $alert.Annotations.description}} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **故障时间:**    {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    **恢复时间:**    {{ ($alert.EndsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    ========= = **end** =  =========</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span></code></pre></div><ul><li>apply</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">5</span><span style="color:#9ECBFF;">.dingtalk-configmap.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">5</span><span style="color:#032F62;">.dingtalk-configmap.yaml</span></span></code></pre></div><h2 id="_2-2-创建dp" tabindex="-1">2.2 创建dp <a class="header-anchor" href="#_2-2-创建dp" aria-label="Permalink to &quot;2.2 创建dp&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8060</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8060</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">strategy</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">rollingUpdate</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">maxSurge</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">25%</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">maxUnavailable</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">25%</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">RollingUpdate</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">restartPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Always&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/prometheus-webhook-dingtalk:v2.1.0</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;IfNotPresent&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk-conf</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/prometheus-webhook-dingtalk/</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;400m&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;500Mi&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;100m&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;100Mi&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8060</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">successThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">tcpSocket</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8060</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">tcpSocket</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8060</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk-conf</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">dingtalk-cm</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8060</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8060</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">strategy</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">rollingUpdate</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">maxSurge</span><span style="color:#24292E;">: </span><span style="color:#032F62;">25%</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">maxUnavailable</span><span style="color:#24292E;">: </span><span style="color:#032F62;">25%</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">RollingUpdate</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">restartPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Always&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/prometheus-webhook-dingtalk:v2.1.0</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;IfNotPresent&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk-conf</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/prometheus-webhook-dingtalk/</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;400m&quot;</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;500Mi&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;100m&quot;</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;100Mi&quot;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8060</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">successThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">tcpSocket</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8060</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">tcpSocket</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8060</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk-conf</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">dingtalk-cm</span></span></code></pre></div><ul><li>apply</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6</span><span style="color:#9ECBFF;">.dingtalk-webhook-delpoy.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#032F62;">.dingtalk-webhook-delpoy.yaml</span></span></code></pre></div><ul><li>热更新</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre></div><h2 id="_2-2-配置alertmanger" tabindex="-1">2.2 配置Alertmanger <a class="header-anchor" href="#_2-2-配置alertmanger" aria-label="Permalink to &quot;2.2 配置Alertmanger&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">alertmanager.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    global:</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_from: &#39;1046493951@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_username: &#39;1046493951@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_password: &#39;djubruffhuolbeee&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#9ECBFF;">    templates:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    route:</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_wait: 10s # 分组内第一个告警等待时间，10s内如有第二个告警会合并一个告警</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_interval: 2m # 发送新告警间隔时间</span></span>
<span class="line"><span style="color:#9ECBFF;">      repeat_interval: 10m # 重复告警间隔发送时间，如果没处理过多久再次发送一次</span></span>
<span class="line"><span style="color:#9ECBFF;">      receiver: &#39;wechat&#39;  #  默认接收人</span></span>
<span class="line"><span style="color:#9ECBFF;">      routes:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical222</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical111  #这里是测试，根据线上报警标签进行修改</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    receivers:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;email&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      email_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - to: &#39;hxopensource@163.com&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"><span style="color:#9ECBFF;">        html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        headers: { Subject: &quot;系统监控告警{{- if gt (len .Alerts.Resolved) 0 -}}恢复{{ end }}&quot; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #- name: &#39;devops&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    #  email_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">    #  - to: &#39;hxopensource@163.com,xxx@qq.com&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    #    send_resolved: true</span></span>
<span class="line"><span style="color:#9ECBFF;">    #    html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      wechat_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - corp_id: &#39;xxx&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        agent_id: 1000004</span></span>
<span class="line"><span style="color:#9ECBFF;">        api_secret: &#39;eGORelIo1EqzxxxxxxnkGELI-Ag3TTwo&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      webhook_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - url: &#39;http://dingtalk.monitor.svc.cluster.local:8060/dingtalk/webhook/send&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    inhibit_rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - source_match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: &#39;critical&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        target_match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: &#39;warning&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        equal: [&#39;alertname&#39;, &#39;dev&#39;, &#39;instance&#39;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">alertmanager.yml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    global:</span></span>
<span class="line"><span style="color:#032F62;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#032F62;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#032F62;">      smtp_from: &#39;1046493951@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_username: &#39;1046493951@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_password: &#39;djubruffhuolbeee&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#032F62;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#032F62;">    templates:</span></span>
<span class="line"><span style="color:#032F62;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#032F62;">    route:</span></span>
<span class="line"><span style="color:#032F62;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#032F62;">      group_wait: 10s # 分组内第一个告警等待时间，10s内如有第二个告警会合并一个告警</span></span>
<span class="line"><span style="color:#032F62;">      group_interval: 2m # 发送新告警间隔时间</span></span>
<span class="line"><span style="color:#032F62;">      repeat_interval: 10m # 重复告警间隔发送时间，如果没处理过多久再次发送一次</span></span>
<span class="line"><span style="color:#032F62;">      receiver: &#39;wechat&#39;  #  默认接收人</span></span>
<span class="line"><span style="color:#032F62;">      routes:</span></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical222</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical111  #这里是测试，根据线上报警标签进行修改</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    receivers:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;email&#39;</span></span>
<span class="line"><span style="color:#032F62;">      email_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - to: &#39;hxopensource@163.com&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"><span style="color:#032F62;">        html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        headers: { Subject: &quot;系统监控告警{{- if gt (len .Alerts.Resolved) 0 -}}恢复{{ end }}&quot; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #- name: &#39;devops&#39;</span></span>
<span class="line"><span style="color:#032F62;">    #  email_configs:</span></span>
<span class="line"><span style="color:#032F62;">    #  - to: &#39;hxopensource@163.com,xxx@qq.com&#39;</span></span>
<span class="line"><span style="color:#032F62;">    #    send_resolved: true</span></span>
<span class="line"><span style="color:#032F62;">    #    html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#032F62;">      wechat_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - corp_id: &#39;xxx&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#032F62;">        agent_id: 1000004</span></span>
<span class="line"><span style="color:#032F62;">        api_secret: &#39;eGORelIo1EqzxxxxxxnkGELI-Ag3TTwo&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#032F62;">      webhook_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - url: &#39;http://dingtalk.monitor.svc.cluster.local:8060/dingtalk/webhook/send&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    inhibit_rules:</span></span>
<span class="line"><span style="color:#032F62;">      - source_match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: &#39;critical&#39;</span></span>
<span class="line"><span style="color:#032F62;">        target_match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: &#39;warning&#39;</span></span>
<span class="line"><span style="color:#032F62;">        equal: [&#39;alertname&#39;, &#39;dev&#39;, &#39;instance&#39;]</span></span></code></pre></div><h2 id="_2-3-发送消息" tabindex="-1">2.3 发送消息 <a class="header-anchor" href="#_2-3-发送消息" aria-label="Permalink to &quot;2.3 发送消息&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-H</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Content-Type: application/json&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://alertmanager.ikubernetes.net/api/v1/alerts</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#9ECBFF;">&#39;[{&quot;labels&quot;:{&quot;severity&quot;:&quot;critical111&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-H</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Content-Type: application/json&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://alertmanager.ikubernetes.net/api/v1/alerts</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#032F62;">&#39;[{&quot;labels&quot;:{&quot;severity&quot;:&quot;critical111&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031714144.png" alt="image-20240703171400899"></p>`,26),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{m as __pageData,g as default};
