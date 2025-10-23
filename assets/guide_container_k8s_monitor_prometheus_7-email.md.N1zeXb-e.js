import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. 邮件方式发送告警","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus/7-email.md","filePath":"guide/container/k8s/monitor/prometheus/7-email.md","lastUpdated":1720533756000}'),p={name:"guide/container/k8s/monitor/prometheus/7-email.md"},e=l(`<h1 id="_1-邮件方式发送告警" tabindex="-1">1. 邮件方式发送告警 <a class="header-anchor" href="#_1-邮件方式发送告警" aria-label="Permalink to &quot;1. 邮件方式发送告警&quot;">​</a></h1><h2 id="_1-1-配置stmp账户" tabindex="-1">1.1 配置stmp账户 <a class="header-anchor" href="#_1-1-配置stmp账户" aria-label="Permalink to &quot;1.1 配置stmp账户&quot;">​</a></h2><ol><li>首先进入 qq 邮箱后台，然后点击设置</li><li>选择 【帐户】，再选中开启 IMAP 服务,获取<code>授权密码</code></li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407022237669.png" alt="image-20240702223726319"></p><h2 id="_1-2-创建configmap" tabindex="-1">1.2 创建configmap <a class="header-anchor" href="#_1-2-创建configmap" aria-label="Permalink to &quot;1.2 创建configmap&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">alertmanager.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    global:</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_from: &#39;104xxx@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_username: &#39;104xxx@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_password: &#39;djuxxxxxbeee&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_hello: &#39;@qq.com&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    templates:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    route:</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_wait: 10s</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_interval: 2m</span></span>
<span class="line"><span style="color:#9ECBFF;">      repeat_interval: 10m</span></span>
<span class="line"><span style="color:#9ECBFF;">      receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      routes:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"></span>
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
<span class="line"><span style="color:#9ECBFF;">      - to: &#39;hxopexxx@163.com&#39;</span></span>
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
<span class="line"><span style="color:#9ECBFF;">      - corp_id: &#39;wwe158cxxx&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        agent_id: 1000007</span></span>
<span class="line"><span style="color:#9ECBFF;">        api_secret: &#39;0UATPXAb10hW0Kbzxxxzl5BTIapn_rs&#39;</span></span>
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
<span class="line"><span style="color:#9ECBFF;">    {{- end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">alertmanager-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">alertmanager.yml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    global:</span></span>
<span class="line"><span style="color:#032F62;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#032F62;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#032F62;">      smtp_from: &#39;104xxx@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_username: &#39;104xxx@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_password: &#39;djuxxxxxbeee&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#032F62;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#032F62;">      smtp_hello: &#39;@qq.com&#39;</span></span>
<span class="line"><span style="color:#032F62;">    templates:</span></span>
<span class="line"><span style="color:#032F62;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#032F62;">    route:</span></span>
<span class="line"><span style="color:#032F62;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#032F62;">      group_wait: 10s</span></span>
<span class="line"><span style="color:#032F62;">      group_interval: 2m</span></span>
<span class="line"><span style="color:#032F62;">      repeat_interval: 10m</span></span>
<span class="line"><span style="color:#032F62;">      receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#032F62;">      routes:</span></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"></span>
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
<span class="line"><span style="color:#032F62;">      - to: &#39;hxopexxx@163.com&#39;</span></span>
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
<span class="line"><span style="color:#032F62;">      - corp_id: &#39;wwe158cxxx&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#032F62;">        agent_id: 1000007</span></span>
<span class="line"><span style="color:#032F62;">        api_secret: &#39;0UATPXAb10hW0Kbzxxxzl5BTIapn_rs&#39;</span></span>
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
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span></code></pre></div><ul><li>配置文件热更新</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -XPOST http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -XPOST http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre></div><ul><li>测试发送邮件</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-H</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Content-Type: application/json&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://alertmanager.ikubernetes.net/api/v1/alerts</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;[{&quot;labels&quot;:{&quot;severity&quot;:&quot;critical&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-H</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Content-Type: application/json&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://alertmanager.ikubernetes.net/api/v1/alerts</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;[{&quot;labels&quot;:{&quot;severity&quot;:&quot;critical&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407022232110.png" alt="image-20240702223246144"></p><h2 id="_1-3-效果" tabindex="-1">1.3 效果 <a class="header-anchor" href="#_1-3-效果" aria-label="Permalink to &quot;1.3 效果&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407022243293.png" alt="image-20240702224039588"></p><ul><li>恢复告警</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407022241623.png" alt="image-20240702224109291"></p><h1 id="_2-模版" tabindex="-1">2. 模版 <a class="header-anchor" href="#_2-模版" aria-label="Permalink to &quot;2. 模版&quot;">​</a></h1><h2 id="_2-1" tabindex="-1">2.1 <a class="header-anchor" href="#_2-1" aria-label="Permalink to &quot;2.1&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{{ </span><span style="color:#9ECBFF;">$var := .externalURL</span><span style="color:#E1E4E8;">}}{{ </span><span style="color:#9ECBFF;">range $k</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">$v:=.alerts</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{</span><span style="color:#9ECBFF;">if eq $v.status &quot;resolved&quot;</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#6A737D;">#### [Prometheus恢复信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警名称&lt;/font&gt;：[{{$v.labels.alertname}}]({{$var}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警级别&lt;/font&gt;：{{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;触发时间&lt;/font&gt;：{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#02b340&quot;&gt;恢复时间&lt;/font&gt;：{{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;故障实例&lt;/font&gt;：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警详情&lt;/font&gt;：{{$v.annotations.description}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{</span><span style="color:#9ECBFF;">else</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#6A737D;">#### [Prometheus告警信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警名称&lt;/font&gt;：[{{$v.labels.alertname}}]({{$var}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警级别&lt;/font&gt;：{{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;触发时间&lt;/font&gt;：{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;故障实例&lt;/font&gt;：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警详情&lt;/font&gt;：{{$v.annotations.description}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{</span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{ </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{{ </span><span style="color:#032F62;">$var := .externalURL</span><span style="color:#24292E;">}}{{ </span><span style="color:#032F62;">range $k</span><span style="color:#24292E;">,</span><span style="color:#032F62;">$v:=.alerts</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">{{</span><span style="color:#032F62;">if eq $v.status &quot;resolved&quot;</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#6A737D;">#### [Prometheus恢复信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警名称&lt;/font&gt;：[{{$v.labels.alertname}}]({{$var}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警级别&lt;/font&gt;：{{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;触发时间&lt;/font&gt;：{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#02b340&quot;&gt;恢复时间&lt;/font&gt;：{{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;故障实例&lt;/font&gt;：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警详情&lt;/font&gt;：{{$v.annotations.description}}</span></span>
<span class="line"><span style="color:#24292E;">{{</span><span style="color:#032F62;">else</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#6A737D;">#### [Prometheus告警信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警名称&lt;/font&gt;：[{{$v.labels.alertname}}]({{$var}})</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警级别&lt;/font&gt;：{{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;触发时间&lt;/font&gt;：{{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;故障实例&lt;/font&gt;：{{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#6A737D;">##### &lt;font color=&quot;#FF0000&quot;&gt;告警详情&lt;/font&gt;：{{$v.annotations.description}}</span></span>
<span class="line"><span style="color:#24292E;">{{</span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">{{ </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}</span></span></code></pre></div><h2 id="_2-2" tabindex="-1">2.2 <a class="header-anchor" href="#_2-2" aria-label="Permalink to &quot;2.2&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">template_email.tmpl</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#E1E4E8;">	{{ </span><span style="color:#9ECBFF;">define &quot;email.html&quot;</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{- </span><span style="color:#9ECBFF;">if gt (len .Alerts.Firing) 0 -</span><span style="color:#E1E4E8;">}}{{ </span><span style="color:#9ECBFF;">range .Alerts</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#9ECBFF;">报警&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;strong&gt;实例:&lt;/strong&gt; {{ .Labels.instance }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;strong&gt;概述:&lt;/strong&gt; {{ .Annotations.summary }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;strong&gt;详情:&lt;/strong&gt; {{ .Annotations.description }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;strong&gt;时间:&lt;/strong&gt; {{ (.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{ </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}{{ </span><span style="color:#9ECBFF;">end -</span><span style="color:#E1E4E8;">}}</span><span style="color:#9ECBFF;">&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{- </span><span style="color:#9ECBFF;">if gt (len .Alerts.Resolved) 0 -</span><span style="color:#E1E4E8;">}}{{ </span><span style="color:#9ECBFF;">range .Alerts</span><span style="color:#E1E4E8;"> }}</span><span style="color:#9ECBFF;">&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#9ECBFF;">恢复&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;strong&gt;实例:&lt;/strong&gt; {{ .Labels.instance }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;strong&gt;信息:&lt;/strong&gt; {{ .Annotations.summary }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&lt;strong&gt;恢复:&lt;/strong&gt; {{ (.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{ </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}{{ </span><span style="color:#9ECBFF;">end -</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">template_email.tmpl</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#24292E;">	{{ </span><span style="color:#032F62;">define &quot;email.html&quot;</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">    {{- </span><span style="color:#032F62;">if gt (len .Alerts.Firing) 0 -</span><span style="color:#24292E;">}}{{ </span><span style="color:#032F62;">range .Alerts</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#032F62;">报警&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;strong&gt;实例:&lt;/strong&gt; {{ .Labels.instance }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;strong&gt;概述:&lt;/strong&gt; {{ .Annotations.summary }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;strong&gt;详情:&lt;/strong&gt; {{ .Annotations.description }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;strong&gt;时间:&lt;/strong&gt; {{ (.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    {{ </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}{{ </span><span style="color:#032F62;">end -</span><span style="color:#24292E;">}}</span><span style="color:#032F62;">&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    {{- </span><span style="color:#032F62;">if gt (len .Alerts.Resolved) 0 -</span><span style="color:#24292E;">}}{{ </span><span style="color:#032F62;">range .Alerts</span><span style="color:#24292E;"> }}</span><span style="color:#032F62;">&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#032F62;">恢复&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;strong&gt;实例:&lt;/strong&gt; {{ .Labels.instance }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;strong&gt;信息:&lt;/strong&gt; {{ .Annotations.summary }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&lt;strong&gt;恢复:&lt;/strong&gt; {{ (.StartsAt.Add 28800e9).Format &quot;2006-01-02 15:04:05&quot; }}&lt;br&gt;</span></span>
<span class="line"><span style="color:#24292E;">    {{ </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}{{ </span><span style="color:#032F62;">end -</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">    {{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}</span></span></code></pre></div>`,21),t=[e];function o(c,r,i,y,F,E){return n(),a("div",null,t)}const m=s(p,[["render",o]]);export{u as __pageData,m as default};
