import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1. Alertmanager简介","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus/7-Alertmanager.md","filePath":"guide/container/k8s/monitor/prometheus/7-Alertmanager.md","lastUpdated":1720533756000}'),p={name:"guide/container/k8s/monitor/prometheus/7-Alertmanager.md"},e=l(`<h1 id="_1-alertmanager简介" tabindex="-1">1. Alertmanager简介 <a class="header-anchor" href="#_1-alertmanager简介" aria-label="Permalink to &quot;1. Alertmanager简介&quot;">​</a></h1><p><a href="https://prometheus.io/docs/alerting/latest/alertmanager/" target="_blank" rel="noreferrer">官当</a></p><p>Alertmanager 主要用于接收 Prometheus 发送的告警信息，它支持丰富的告警通知渠道，例如邮件、微信、钉钉、Slack 等常用沟通工具，而且很容易做到告警信息进行去重，降噪，分组等，是一款很好用的告警通知系统。</p><h2 id="_1-1-alertmanager-常用的功能" tabindex="-1">1.1 AlertManager 常用的功能 <a class="header-anchor" href="#_1-1-alertmanager-常用的功能" aria-label="Permalink to &quot;1.1 AlertManager 常用的功能&quot;">​</a></h2><p><code>抑制</code>：指的是当某一告警信意发送后，可以停止由此告警引发的其它告警，避免相同的告警信息重复发送8</p><p><code>静默</code>：静默也是一种机制，指的是依据设置的标签，对告警行为进行静默处理。</p><p><code>发送告警</code>：支持配置多种告警规则，可以根据不同的路由配置，采用不同的告警方式发送告警通知。</p><p><code>告警分组</code>：分组机制可以将详细的告警信息合并成一个通知。</p><h2 id="_1-2-prometheus-和-alertmanager-的关系" tabindex="-1">1.2 Prometheus 和 AlertManager 的关系 <a class="header-anchor" href="#_1-2-prometheus-和-alertmanager-的关系" aria-label="Permalink to &quot;1.2 Prometheus 和 AlertManager 的关系&quot;">​</a></h2><p>prometheus 触发一条告警的过程：</p><p>prometheus---&gt;触发阈值---&gt;超出持续时间---&gt;alertmanager---&gt;分组|抑制|静默---&gt;媒体类型---&gt;邮件|钉钉|微信等</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407021552783.png" alt="image-20240702155232473"></p><h2 id="_1-3-发送警告生命周期" tabindex="-1">1.3 发送警告生命周期 <a class="header-anchor" href="#_1-3-发送警告生命周期" aria-label="Permalink to &quot;1.3 发送警告生命周期&quot;">​</a></h2><p>一条告警产生后，它的状态可能是 <code>inactive</code>、<code>pending</code> 或者 <code>firing</code> 中的一种,还要经过 Alertmanager 的分组、抑制处理、静默处理、去重处理和降噪处理最后再发送给接收者。这个过程中可能会因为各种原因会导致告警产生了却最终没有进行通知，可以通过下图了解整个告警的生命周期：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407021515543.png" alt="img"></p><p>报警状态分 3 种：</p><ul><li>inactive：没有异常.</li><li>pending：已触发阈值，但未满足告警持续时间（即 rule 中的 for 字段）.</li><li>firing：已触发阈值且满足条件并发送至 alertmanager.</li></ul><h1 id="_2-alertmanager核心概念" tabindex="-1">2. AlertManager核心概念 <a class="header-anchor" href="#_2-alertmanager核心概念" aria-label="Permalink to &quot;2. AlertManager核心概念&quot;">​</a></h1><h2 id="_2-1-分组" tabindex="-1">2.1 分组 <a class="header-anchor" href="#_2-1-分组" aria-label="Permalink to &quot;2.1 分组&quot;">​</a></h2><p>被触发的警报合并为一个警报进行通知，避免瞬间突发性的接受大量警报通知，使得管理员无法对问题进行快速定位。</p><ul><li>场景</li></ul><p>在Kubernetes集群中，运行着重量级规模的实例，即便是集群中持续很小一段时间的网络延迟或者延迟导致网络抖动，也会引发大量类似服务应用无法连接DB的故障。如果在警报规则中定义每一个应用实例都发送警报，那么到最后的结果就是会有大量的警报信息通过<code>Alertmanager</code>发送给咱们的运维及研发小伙伴。</p><h2 id="_2-2-抑制" tabindex="-1">2.2 抑制 <a class="header-anchor" href="#_2-2-抑制" aria-label="Permalink to &quot;2.2 抑制&quot;">​</a></h2><p><code>Inhibition</code> 是当某条警报已经发送，停止重复发送由此警报引发的其他异常或故障的警报机制</p><h2 id="_2-3-静默" tabindex="-1">2.3 静默 <a class="header-anchor" href="#_2-3-静默" aria-label="Permalink to &quot;2.3 静默&quot;">​</a></h2><p><code>silences</code>提供了一个简单的机制，根据标签快速对警报进行静默处理；对传进来的警报进行匹配检查，如果接受到警报符合静默的配置，Alertmanager则不会发送警报通知。</p><ul><li>场景</li></ul><p>1.用于解决严重生产故障问题时因所花费的时间过长，通过静默设置避免接收到过多的无用通知;</p><p>2.在已知的例行维护中，防止对例行维护中的机器发送不必要的告警；</p><h3 id="设置静默" tabindex="-1">设置静默 <a class="header-anchor" href="#设置静默" aria-label="Permalink to &quot;设置静默&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031453210.png" alt="image-20240703145323614"></p><h1 id="_3-alertmanager部署" tabindex="-1">3. Alertmanager部署 <a class="header-anchor" href="#_3-alertmanager部署" aria-label="Permalink to &quot;3. Alertmanager部署&quot;">​</a></h1><h2 id="_3-1-创建存储" tabindex="-1">3.1 创建存储 <a class="header-anchor" href="#_3-1-创建存储" aria-label="Permalink to &quot;3.1 创建存储&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">root@kube-master alertmanager</span><span style="color:#E1E4E8;">]# </span><span style="color:#9ECBFF;">cat 1.alertmanager-storage.yaml</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-pvc</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">accessModes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">ReadWriteMany</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">storageClassName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;nfs-provisioner-storage&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">storage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">5Gi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">root@kube-master alertmanager</span><span style="color:#24292E;">]# </span><span style="color:#032F62;">cat 1.alertmanager-storage.yaml</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager-pvc</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">accessModes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">ReadWriteMany</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">storageClassName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;nfs-provisioner-storage&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">storage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">5Gi</span></span></code></pre></div><ul><li>apply</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#9ECBFF;">.alertmanager-storage.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@kube-master alertmanager]# kubectl get pvc -nmonitor</span></span>
<span class="line"><span style="color:#B392F0;">NAME</span><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">VOLUME</span><span style="color:#E1E4E8;">                                     </span><span style="color:#9ECBFF;">CAPACITY</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">ACCESS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">MODES</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">STORAGECLASS</span><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">AGE</span></span>
<span class="line"><span style="color:#B392F0;">alertmanager-pvc</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">Bound</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">pvc-07eac89f-672f-4352-a3c7-adb136ec2295</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">5</span><span style="color:#9ECBFF;">Gi</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">RWX</span><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">nfs-provisioner-storage</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">3</span><span style="color:#9ECBFF;">s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#032F62;">.alertmanager-storage.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看</span></span>
<span class="line"><span style="color:#24292E;">[root@kube-master alertmanager]# kubectl get pvc -nmonitor</span></span>
<span class="line"><span style="color:#6F42C1;">NAME</span><span style="color:#24292E;">                  </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">   </span><span style="color:#032F62;">VOLUME</span><span style="color:#24292E;">                                     </span><span style="color:#032F62;">CAPACITY</span><span style="color:#24292E;">   </span><span style="color:#032F62;">ACCESS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">MODES</span><span style="color:#24292E;">   </span><span style="color:#032F62;">STORAGECLASS</span><span style="color:#24292E;">              </span><span style="color:#032F62;">AGE</span></span>
<span class="line"><span style="color:#6F42C1;">alertmanager-pvc</span><span style="color:#24292E;">      </span><span style="color:#032F62;">Bound</span><span style="color:#24292E;">    </span><span style="color:#032F62;">pvc-07eac89f-672f-4352-a3c7-adb136ec2295</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">5</span><span style="color:#032F62;">Gi</span><span style="color:#24292E;">        </span><span style="color:#032F62;">RWX</span><span style="color:#24292E;">            </span><span style="color:#032F62;">nfs-provisioner-storage</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">3</span><span style="color:#032F62;">s</span></span></code></pre></div><h2 id="_3-2-创建configmap" tabindex="-1">3.2 创建configMap <a class="header-anchor" href="#_3-2-创建configmap" aria-label="Permalink to &quot;3.2 创建configMap&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">root@kube-master alertmanager</span><span style="color:#E1E4E8;">]# </span><span style="color:#9ECBFF;">cat 2.alertmanager-configmap-wechat.yaml</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">alertmanager.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    global:</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_from: &#39;xxxx@xxxx.cn&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_username: &#39;xxxx@xxxx.cn&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_password: &#39;yfXBjxxxxDwYTjn&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    templates:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    route:</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_wait: 10s</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_interval: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">      repeat_interval: 10m</span></span>
<span class="line"><span style="color:#9ECBFF;">      receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      routes:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    receivers:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;email&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      email_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - to: &#39;xxxx@163.com&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"><span style="color:#9ECBFF;">        html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      wechat_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - corp_id: &#39;wwe158c08abxxxx06&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        agent_id: 100xxx</span></span>
<span class="line"><span style="color:#9ECBFF;">        api_secret: &#39;0UATPXAb10hW0Kbzbi69xxxxxxx5BTIapn_rs&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      webhook_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - url: &#39;http://webhook-dingtalk.monitor.svc.cluster.local:8060/dingtalk/webhook1/send&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    inhibit_rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - source_match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: &#39;critical&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        target_match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: &#39;warning&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        equal: [&#39;alertname&#39;, &#39;dev&#39;, &#39;instance&#39;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">wechat.tmpl</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ define &quot;wechat.default.message&quot; }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if gt (len .Alerts.Firing) 0 -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if eq $index 0 }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= 监控报警 =========</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警状态：{{   .Status }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警级别：{{ .Labels.severity }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警类型：{{ $alert.Labels.alertname }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    故障主机: {{ $alert.Labels.instance }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警主题: {{ $alert.Annotations.summary }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警详情: {{ $alert.Annotations.message }}{{ $alert.Annotations.description}};</span></span>
<span class="line"><span style="color:#9ECBFF;">    触发阀值：{{ .Annotations.value }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    故障时间: {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= = end =  =========</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if gt (len .Alerts.Resolved) 0 -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if eq $index 0 }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= 告警恢复 =========</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警类型：{{ .Labels.alertname }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警状态：{{   .Status }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警主题: {{ $alert.Annotations.summary }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警详情: {{ $alert.Annotations.message }}{{ $alert.Annotations.description}};</span></span>
<span class="line"><span style="color:#9ECBFF;">    故障时间: {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    恢复时间: {{ ($alert.EndsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if gt (len $alert.Labels.instance) 0 }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    实例信息: {{ $alert.Labels.instance }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= = end =  =========</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">email.tmpl</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ define &quot;email.from&quot; }}xxx.com{{ end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ define &quot;email.to&quot; }}xxx.com{{ end }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ define &quot;email.to.html&quot; }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if gt (len .Alerts.Firing) 0 -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ range .Alerts }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= 监控报警 =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警程序: prometheus_alert &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警级别: {{ .Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警类型: {{ .Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警主机: {{ .Labels.instance }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警主题: {{ .Annotations.summary }}  &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警详情: {{ .Annotations.description }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    触发时间: {{ .StartsAt.Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= = end =  =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ end }}{{ end -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    {{- if gt (len .Alerts.Resolved) 0 -}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ range .Alerts }}</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= 告警恢复 =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警程序: prometheus_alert &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警级别: {{ .Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警类型: {{ .Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警主机: {{ .Labels.instance }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警主题: {{ .Annotations.summary }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    告警详情: {{ .Annotations.description }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    触发时间: {{ .StartsAt.Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    恢复时间: {{ .EndsAt.Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    ========= = end =  =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#9ECBFF;">    {{ end }}{{ end -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">root@kube-master alertmanager</span><span style="color:#24292E;">]# </span><span style="color:#032F62;">cat 2.alertmanager-configmap-wechat.yaml</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">alertmanager.yml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    global:</span></span>
<span class="line"><span style="color:#032F62;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#032F62;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#032F62;">      smtp_from: &#39;xxxx@xxxx.cn&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_username: &#39;xxxx@xxxx.cn&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_password: &#39;yfXBjxxxxDwYTjn&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#032F62;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    templates:</span></span>
<span class="line"><span style="color:#032F62;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#032F62;">    route:</span></span>
<span class="line"><span style="color:#032F62;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#032F62;">      group_wait: 10s</span></span>
<span class="line"><span style="color:#032F62;">      group_interval: 2m</span></span>
<span class="line"><span style="color:#032F62;">      repeat_interval: 10m</span></span>
<span class="line"><span style="color:#032F62;">      receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#032F62;">      routes:</span></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    receivers:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;email&#39;</span></span>
<span class="line"><span style="color:#032F62;">      email_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - to: &#39;xxxx@163.com&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"><span style="color:#032F62;">        html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#032F62;">      wechat_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - corp_id: &#39;wwe158c08abxxxx06&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#032F62;">        agent_id: 100xxx</span></span>
<span class="line"><span style="color:#032F62;">        api_secret: &#39;0UATPXAb10hW0Kbzbi69xxxxxxx5BTIapn_rs&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#032F62;">      webhook_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - url: &#39;http://webhook-dingtalk.monitor.svc.cluster.local:8060/dingtalk/webhook1/send&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    inhibit_rules:</span></span>
<span class="line"><span style="color:#032F62;">      - source_match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: &#39;critical&#39;</span></span>
<span class="line"><span style="color:#032F62;">        target_match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: &#39;warning&#39;</span></span>
<span class="line"><span style="color:#032F62;">        equal: [&#39;alertname&#39;, &#39;dev&#39;, &#39;instance&#39;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">wechat.tmpl</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    {{ define &quot;wechat.default.message&quot; }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- if gt (len .Alerts.Firing) 0 -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{- if eq $index 0 }}</span></span>
<span class="line"><span style="color:#032F62;">    ========= 监控报警 =========</span></span>
<span class="line"><span style="color:#032F62;">    告警状态：{{   .Status }}</span></span>
<span class="line"><span style="color:#032F62;">    告警级别：{{ .Labels.severity }}</span></span>
<span class="line"><span style="color:#032F62;">    告警类型：{{ $alert.Labels.alertname }}</span></span>
<span class="line"><span style="color:#032F62;">    故障主机: {{ $alert.Labels.instance }}</span></span>
<span class="line"><span style="color:#032F62;">    告警主题: {{ $alert.Annotations.summary }}</span></span>
<span class="line"><span style="color:#032F62;">    告警详情: {{ $alert.Annotations.message }}{{ $alert.Annotations.description}};</span></span>
<span class="line"><span style="color:#032F62;">    触发阀值：{{ .Annotations.value }}</span></span>
<span class="line"><span style="color:#032F62;">    故障时间: {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}</span></span>
<span class="line"><span style="color:#032F62;">    ========= = end =  =========</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- if gt (len .Alerts.Resolved) 0 -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{- range $index, $alert := .Alerts -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{- if eq $index 0 }}</span></span>
<span class="line"><span style="color:#032F62;">    ========= 告警恢复 =========</span></span>
<span class="line"><span style="color:#032F62;">    告警类型：{{ .Labels.alertname }}</span></span>
<span class="line"><span style="color:#032F62;">    告警状态：{{   .Status }}</span></span>
<span class="line"><span style="color:#032F62;">    告警主题: {{ $alert.Annotations.summary }}</span></span>
<span class="line"><span style="color:#032F62;">    告警详情: {{ $alert.Annotations.message }}{{ $alert.Annotations.description}};</span></span>
<span class="line"><span style="color:#032F62;">    故障时间: {{ ($alert.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}</span></span>
<span class="line"><span style="color:#032F62;">    恢复时间: {{ ($alert.EndsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- if gt (len $alert.Labels.instance) 0 }}</span></span>
<span class="line"><span style="color:#032F62;">    实例信息: {{ $alert.Labels.instance }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    ========= = end =  =========</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">email.tmpl</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    {{ define &quot;email.from&quot; }}xxx.com{{ end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{ define &quot;email.to&quot; }}xxx.com{{ end }}</span></span>
<span class="line"><span style="color:#032F62;">    {{ define &quot;email.to.html&quot; }}</span></span>
<span class="line"><span style="color:#032F62;">    {{- if gt (len .Alerts.Firing) 0 -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{ range .Alerts }}</span></span>
<span class="line"><span style="color:#032F62;">    ========= 监控报警 =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警程序: prometheus_alert &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警级别: {{ .Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警类型: {{ .Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警主机: {{ .Labels.instance }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警主题: {{ .Annotations.summary }}  &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警详情: {{ .Annotations.description }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    触发时间: {{ .StartsAt.Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    ========= = end =  =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    {{ end }}{{ end -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    {{- if gt (len .Alerts.Resolved) 0 -}}</span></span>
<span class="line"><span style="color:#032F62;">    {{ range .Alerts }}</span></span>
<span class="line"><span style="color:#032F62;">    ========= 告警恢复 =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警程序: prometheus_alert &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警级别: {{ .Labels.severity }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警类型: {{ .Labels.alertname }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警主机: {{ .Labels.instance }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警主题: {{ .Annotations.summary }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    告警详情: {{ .Annotations.description }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    触发时间: {{ .StartsAt.Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    恢复时间: {{ .EndsAt.Format &quot;2006-01-02 15:04:05&quot; }} &lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    ========= = end =  =========&lt;br&gt;</span></span>
<span class="line"><span style="color:#032F62;">    {{ end }}{{ end -}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span></code></pre></div><ul><li>apply</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">kubectl</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">apply</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#9ECBFF;">.alertmanager-configmap-wechat.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">kubectl</span><span style="color:#24292E;">  </span><span style="color:#032F62;">apply</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#032F62;">.alertmanager-configmap-wechat.yaml</span></span></code></pre></div><h2 id="_3-3-创建dp" tabindex="-1">3.3 创建dp <a class="header-anchor" href="#_3-3-创建dp" aria-label="Permalink to &quot;3.3 创建dp&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">root@kube-master alertmanager</span><span style="color:#E1E4E8;">]# </span><span style="color:#9ECBFF;">cat 3.alertmanager-deploy.yaml</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ClusterIP</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9093</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9093</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#B392F0;">---</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">k8s-app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/alertmanager:v0.24.0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">IfNotPresent</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9093</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">## 指定容器中AlertManager配置文件存放地址 (Docker容器中的绝对位置)</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--config.file=/etc/alertmanager/alertmanager.yml&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">## 指定AlertManager管理界面地址，用于在发生的告警信息中,附加AlertManager告警信息页面地址</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--web.external-url=https://alertmanager.ikubernetes.net&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">## 指定监听的地址及端口</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&#39;--cluster.advertise-address=0.0.0.0:9093&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">## 指定数据存储位置 (Docker容器中的绝对位置)</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--storage.path=/alertmanager&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1000m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">500m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/-/ready</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9093</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">livenessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">httpGet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/-/healthy</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9093</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">data</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">configmap-reload</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">#image: jimmidyson/configmap-reload:v0.7.1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/configmap-reload:v0.9.0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--volume-dir=/etc/config&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">&quot;--webhook-url=http://localhost:9093/-/reload&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">data</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">persistentVolumeClaim</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">claimName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-pvc</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">root@kube-master alertmanager</span><span style="color:#24292E;">]# </span><span style="color:#032F62;">cat 3.alertmanager-deploy.yaml</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ClusterIP</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9093</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9093</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#6F42C1;">---</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">k8s-app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/alertmanager:v0.24.0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">IfNotPresent</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9093</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">## 指定容器中AlertManager配置文件存放地址 (Docker容器中的绝对位置)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--config.file=/etc/alertmanager/alertmanager.yml&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">## 指定AlertManager管理界面地址，用于在发生的告警信息中,附加AlertManager告警信息页面地址</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--web.external-url=https://alertmanager.ikubernetes.net&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">## 指定监听的地址及端口</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&#39;--cluster.advertise-address=0.0.0.0:9093&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">## 指定数据存储位置 (Docker容器中的绝对位置)</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--storage.path=/alertmanager&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1000m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">500m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/-/ready</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9093</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">livenessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">httpGet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/-/healthy</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9093</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">data</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/alertmanager</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/alertmanager</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">configmap-reload</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">#image: jimmidyson/configmap-reload:v0.7.1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/configmap-reload:v0.9.0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--volume-dir=/etc/config&quot;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">&quot;--webhook-url=http://localhost:9093/-/reload&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100Mi</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">data</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">persistentVolumeClaim</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">claimName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager-pvc</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager-config</span></span></code></pre></div><h2 id="_3-4-创建ingress" tabindex="-1">3.4 创建ingress <a class="header-anchor" href="#_3-4-创建ingress" aria-label="Permalink to &quot;3.4 创建ingress&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">root@kube-master alertmanager</span><span style="color:#E1E4E8;">]# </span><span style="color:#9ECBFF;">cat 4.alertmanager-ingress.yaml</span></span>
<span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Ingress</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-ingress</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ingressClassName</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">host</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager.ikubernetes.net</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">http</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">paths</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">pathType</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Prefix</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">backend</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">service</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#85E89D;">number</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9093</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">root@kube-master alertmanager</span><span style="color:#24292E;">]# </span><span style="color:#032F62;">cat 4.alertmanager-ingress.yaml</span></span>
<span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">networking.k8s.io/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Ingress</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager-ingress</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ingressClassName</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">host</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager.ikubernetes.net</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">http</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">paths</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">pathType</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Prefix</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">backend</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">service</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">port</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#22863A;">number</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9093</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407022230663.png" alt="image-20240702223006412"></p><ul><li>配置文件热更新</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -XPOST http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -XPOST http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre></div><h1 id="_4-alertmanager高可用" tabindex="-1">4. Alertmanager高可用 <a class="header-anchor" href="#_4-alertmanager高可用" aria-label="Permalink to &quot;4. Alertmanager高可用&quot;">​</a></h1><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">部署模式：可以使用 StatefulSet 控制器来部署 Alertmanager，因为它可以保证每个 Pod 有唯一的网络标识和持久化存储。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">存储：为 Alertmanager 配置持久化存储，例如使用 PersistentVolumes (PV) 和 PersistentVolumeClaims (PVC)。这可以确保即使 Pod 重启或迁移，配置和数据也不会丢失。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">服务发现：配置服务发现机制，以便 Prometheus 可以发现并连接到所有 Alertmanager 实例。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">配置：在 Alertmanager 的配置文件中，设置 cluster.peer 参数，这样每个实例都可以知道其他实例的位置，并形成集群。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">网络：确保 Alertmanager 实例之间可以互相通信，这通常通过集群内部的网络通信实现。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">负载均衡：在 Alertmanager 前面设置一个负载均衡器，以便 Prometheus 可以通过单个端点与所有实例通信。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">监控：部署监控工具来监控 Alertmanager 集群的健康状况。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">部署模式：可以使用 StatefulSet 控制器来部署 Alertmanager，因为它可以保证每个 Pod 有唯一的网络标识和持久化存储。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">存储：为 Alertmanager 配置持久化存储，例如使用 PersistentVolumes (PV) 和 PersistentVolumeClaims (PVC)。这可以确保即使 Pod 重启或迁移，配置和数据也不会丢失。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">服务发现：配置服务发现机制，以便 Prometheus 可以发现并连接到所有 Alertmanager 实例。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">配置：在 Alertmanager 的配置文件中，设置 cluster.peer 参数，这样每个实例都可以知道其他实例的位置，并形成集群。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">网络：确保 Alertmanager 实例之间可以互相通信，这通常通过集群内部的网络通信实现。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">负载均衡：在 Alertmanager 前面设置一个负载均衡器，以便 Prometheus 可以通过单个端点与所有实例通信。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">监控：部署监控工具来监控 Alertmanager 集群的健康状况。</span></span></code></pre></div>`,50),o=[e];function t(c,r,E,y,i,F){return n(),a("div",null,o)}const d=s(p,[["render",t]]);export{g as __pageData,d as default};
