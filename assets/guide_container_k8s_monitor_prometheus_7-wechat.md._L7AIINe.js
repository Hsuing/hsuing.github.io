import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. 注册企业微信","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus/7-wechat.md","filePath":"guide/container/k8s/monitor/prometheus/7-wechat.md","lastUpdated":1720533756000}'),p={name:"guide/container/k8s/monitor/prometheus/7-wechat.md"},e=l(`<h1 id="_1-注册企业微信" tabindex="-1">1. 注册企业微信 <a class="header-anchor" href="#_1-注册企业微信" aria-label="Permalink to &quot;1. 注册企业微信&quot;">​</a></h1><h2 id="_1-1-打开注册地址" tabindex="-1">1.1 打开注册地址 <a class="header-anchor" href="#_1-1-打开注册地址" aria-label="Permalink to &quot;1.1 打开注册地址&quot;">​</a></h2><p><a href="https://work.weixin.qq.com/wework_admin/register_wx?from=myhome_baidu" target="_blank" rel="noreferrer">https://work.weixin.qq.com/wework_admin/register_wx?from=myhome_baidu</a></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031151678.png" alt="img"></p><h2 id="_1-2-企业id" tabindex="-1">1.2 企业ID <a class="header-anchor" href="#_1-2-企业id" aria-label="Permalink to &quot;1.2 企业ID&quot;">​</a></h2><p>找到&quot;我的企业&quot; 下拉找到 &quot;企业ID/corpid&quot; 这个记录一下后面会用到</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031153321.png" alt="image-20240703115340322"></p><h2 id="_1-3-生成应用" tabindex="-1">1.3 生成应用 <a class="header-anchor" href="#_1-3-生成应用" aria-label="Permalink to &quot;1.3 生成应用&quot;">​</a></h2><p>1.找到&quot;应用管理&quot; ==&gt;&gt; &quot;自建&quot; ==&gt;&gt; &quot;创建应用&quot;</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031154354.png" alt="img"></p><p>2.选择上一步创建的图片，填写应用信息</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031155368.png" alt="img"></p><p>3.记录 &quot;Agentid&quot; &quot;Secret&quot; 后面会用</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031155276.png" alt="img"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031156827.png" alt="img"></p><p>4.配置企业可用IP</p><p>里面需要企业的域名，在域名下放一个文件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031157320.png" alt="img"></p><p>上面这个配置不通过一直会报错：</p><p>{&quot;errcode&quot;:60020,&quot;errmsg&quot;:&quot;not allow to access from your ip, hint: [***], from ip: ***, more info at <a href="https://open.work.weixin.qq.com/devtool/query?e=60020" target="_blank" rel="noreferrer">https://open.work.weixin.qq.com/devtool/query?e=60020</a>&quot;}</p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>企业可信IP在很早之前不用开启,虽然也报60020,但是可以调用,后来创建应用程序自动开启,导致不配置ip,无法调用</p><p>要想使用新的应用,则需要monye</p></div><h1 id="_2-基于企业微信的报警媒介" tabindex="-1">2. 基于企业微信的报警媒介 <a class="header-anchor" href="#_2-基于企业微信的报警媒介" aria-label="Permalink to &quot;2. 基于企业微信的报警媒介&quot;">​</a></h1><p><code>实时告警通知</code>：企业微信/钉钉等即时通信工具能够实现实时的告警通知，使得团队成员能够及时响应和解决问题。</p><p><code>通知范围更广</code>：基于企业微信/钉钉的告警通知可以通过群组和@某人的方式，将告警通知发送给更广泛的接收者，避免出现漏报的情况。</p><p><code>告警信息更直观</code>：企业微信/钉钉等通信工具提供了更丰富的告警信息呈现方式，例如文本消息、链接、图片、语音等，使得告警信息更加直观和易于理解。</p><h1 id="_3-alertmanger配置config" tabindex="-1">3. Alertmanger配置config <a class="header-anchor" href="#_3-alertmanger配置config" aria-label="Permalink to &quot;3. Alertmanger配置config&quot;">​</a></h1><p>cat 2.alertmanager-configmap-wechat.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">alertmanager.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    global:</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_from: &#39;xxx@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_username: &#39;xxx@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_password: &#39;xxxx&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#9ECBFF;">    templates:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    route:</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_wait: 10s</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_interval: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">      repeat_interval: 10m</span></span>
<span class="line"><span style="color:#9ECBFF;">      receiver: &#39;wechat&#39;</span></span>
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
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
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
<span class="line"><span style="color:#9ECBFF;">      - corp_id: &#39;wwe158xxx4275006&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        agent_id: 1000004</span></span>
<span class="line"><span style="color:#9ECBFF;">        api_secret: &#39;eGORelIo1EqzLfxxxxsdtAOm5nkGELI-Ag3TTwo&#39;</span></span>
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
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">alertmanager.yml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    global:</span></span>
<span class="line"><span style="color:#032F62;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#032F62;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#032F62;">      smtp_from: &#39;xxx@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_username: &#39;xxx@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_password: &#39;xxxx&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#032F62;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#032F62;">    templates:</span></span>
<span class="line"><span style="color:#032F62;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#032F62;">    route:</span></span>
<span class="line"><span style="color:#032F62;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#032F62;">      group_wait: 10s</span></span>
<span class="line"><span style="color:#032F62;">      group_interval: 2m</span></span>
<span class="line"><span style="color:#032F62;">      repeat_interval: 10m</span></span>
<span class="line"><span style="color:#032F62;">      receiver: &#39;wechat&#39;</span></span>
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
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
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
<span class="line"><span style="color:#032F62;">      - corp_id: &#39;wwe158xxx4275006&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#032F62;">        agent_id: 1000004</span></span>
<span class="line"><span style="color:#032F62;">        api_secret: &#39;eGORelIo1EqzLfxxxxsdtAOm5nkGELI-Ag3TTwo&#39;</span></span>
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
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span></code></pre></div><ul><li>apply</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">kubectl apply -f  2.alertmanager-configmap-wechat.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">kubectl apply -f  2.alertmanager-configmap-wechat.yaml</span></span></code></pre></div><ul><li>热更新</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre></div><ul><li>发送测试</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-H</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Content-Type: application/json&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://alertmanager.ikubernetes.net/api/v1/alerts</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;[{&quot;labels&quot;:{&quot;severity&quot;:&quot;critical222&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-H</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Content-Type: application/json&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://alertmanager.ikubernetes.net/api/v1/alerts</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;[{&quot;labels&quot;:{&quot;severity&quot;:&quot;critical222&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407031205632.png" alt="image-20240703120504375"></p>`,36),o=[e];function t(c,r,i,F,y,m){return n(),a("div",null,o)}const g=s(p,[["render",t]]);export{d as __pageData,g as default};
