import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. 配置告警","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus-alert/2-config.md","filePath":"guide/container/k8s/monitor/prometheus-alert/2-config.md","lastUpdated":1720533756000}'),e={name:"guide/container/k8s/monitor/prometheus-alert/2-config.md"},t=l(`<h1 id="_1-配置告警" tabindex="-1">1. 配置告警 <a class="header-anchor" href="#_1-配置告警" aria-label="Permalink to &quot;1. 配置告警&quot;">​</a></h1><p>导入sql配置</p><h2 id="_1-0-测试告警" tabindex="-1">1.0 测试告警 <a class="header-anchor" href="#_1-0-测试告警" aria-label="Permalink to &quot;1.0 测试告警&quot;">​</a></h2><p>点击模版管理--&gt;自定义模版</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051111808.png" alt="image-20240705111101407"></p><p>这些就是通过sql导入进来的信息</p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>此次是以<code>飞书</code>为例,飞书webhook 定义关键字时需注意和你报警模版中的关键字保持一致即可,否则不能发出警告</p></div><p><code>编辑飞书这个模版</code>,配置好之后,点击---&gt;告警管理---&gt;告警测试---&gt;飞书</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051150988.png" alt="image-20240705115043908"></p><ul><li>飞书效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051151700.png" alt="image-20240705115114052"></p><h2 id="_1-1-模版配置" tabindex="-1">1.1 模版配置 <a class="header-anchor" href="#_1-1-模版配置" aria-label="Permalink to &quot;1.1 模版配置&quot;">​</a></h2><h3 id="_1-1-1-添加自定义模版-ec2" tabindex="-1">1.1.1 添加自定义模版-ec2 <a class="header-anchor" href="#_1-1-1-添加自定义模版-ec2" aria-label="Permalink to &quot;1.1.1 添加自定义模版-ec2&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051047032.png" alt="image-20240705104726474"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051050716.png" alt="image-20240705105026006"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}{{if eq $v.status</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;resolved&quot;}}[PROMETHEUS-恢复信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; **[{{$v.labels.alertname}}]({{$var}})**✅</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;当前状态:&lt;/font&gt; **&lt;font color=&quot;#67C23A&quot;&gt;已恢复&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;结束时间:&lt;/font&gt; {{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{{else}}[PROMETHEUS-告警信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; **[{{$v.labels.alertname}}]({{$var}})**🔥</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;当前状态:&lt;/font&gt; **&lt;font color=&quot;#E6A23C&quot;&gt;需要处理&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{{end}}{{ end }}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ $urimsg:=&quot;&quot;}}{{ range $key,$value:=.commonLabels }}{{$urimsg =</span></span>
<span class="line"><span style="color:#e1e4e8;">print $urimsg $key &quot;%3D%22&quot; $value &quot;%22%2C&quot; }}{{end}}[✍点我屏蔽该告警](http://alertmanager.ikubernetes.net/#/silences/new?filter=%7B{{SplitString $urimsg 0 -3}}%7D)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}{{if eq $v.status</span></span>
<span class="line"><span style="color:#24292e;">&quot;resolved&quot;}}[PROMETHEUS-恢复信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#24292e;">&gt; **[{{$v.labels.alertname}}]({{$var}})**✅</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;当前状态:&lt;/font&gt; **&lt;font color=&quot;#67C23A&quot;&gt;已恢复&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;结束时间:&lt;/font&gt; {{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#24292e;">{{else}}[PROMETHEUS-告警信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#24292e;">&gt; **[{{$v.labels.alertname}}]({{$var}})**🔥</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;当前状态:&lt;/font&gt; **&lt;font color=&quot;#E6A23C&quot;&gt;需要处理&lt;/font&gt;**</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#24292e;">{{end}}{{ end }}</span></span>
<span class="line"><span style="color:#24292e;">{{ $urimsg:=&quot;&quot;}}{{ range $key,$value:=.commonLabels }}{{$urimsg =</span></span>
<span class="line"><span style="color:#24292e;">print $urimsg $key &quot;%3D%22&quot; $value &quot;%22%2C&quot; }}{{end}}[✍点我屏蔽该告警](http://alertmanager.ikubernetes.net/#/silences/new?filter=%7B{{SplitString $urimsg 0 -3}}%7D)</span></span></code></pre></div><h3 id="_1-1-2-添加自定义模版pod" tabindex="-1">1.1.2 添加自定义模版Pod <a class="header-anchor" href="#_1-1-2-添加自定义模版pod" aria-label="Permalink to &quot;1.1.2 添加自定义模版Pod&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}{{if eq $v.status &quot;resolved&quot;}}[PROMETHEUS-恢复信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; **[{{$v.labels.alertname}}]({{$var}})**✅</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;结束时间:&lt;/font&gt; {{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;命名空间:&lt;/font&gt; {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;实例名称:&lt;/font&gt; {{$v.labels.pod}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;info&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{{else}}[PROMETHEUS-告警信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; **[{{$v.labels.alertname}}]({{$var}})**🔥</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;命名空间:&lt;/font&gt; {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;实例名称:&lt;/font&gt; {{$v.labels.pod}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">{{end}}{{ end }}</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ $urimsg:=&quot;&quot;}}{{ range $key,$value:=.commonLabels }}{{$urimsg =</span></span>
<span class="line"><span style="color:#e1e4e8;">print $urimsg $key &quot;%3D%22&quot; $value &quot;%22%2C&quot; }}{{end}}[✍点我屏蔽该告警](http://alertmanager.ikubernetes.net/#/silences/new?filter=%7B{{SplitString $urimsg 0 -3}}%7D)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{{ $var := .externalURL}}{{ range $k,$v:=.alerts }}{{if eq $v.status &quot;resolved&quot;}}[PROMETHEUS-恢复信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#24292e;">&gt; **[{{$v.labels.alertname}}]({{$var}})**✅</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;结束时间:&lt;/font&gt; {{GetCSTtime $v.endsAt}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;命名空间:&lt;/font&gt; {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;实例名称:&lt;/font&gt; {{$v.labels.pod}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;info&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#24292e;">{{else}}[PROMETHEUS-告警信息]({{$v.generatorURL}})</span></span>
<span class="line"><span style="color:#24292e;">&gt; **[{{$v.labels.alertname}}]({{$var}})**🔥</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;告警级别:&lt;/font&gt; {{$v.labels.severity}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;开始时间:&lt;/font&gt; {{GetCSTtime $v.startsAt}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;命名空间:&lt;/font&gt; {{$v.labels.namespace}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;实例名称:&lt;/font&gt; {{$v.labels.pod}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;实例地址:&lt;/font&gt; {{$v.labels.instance}}</span></span>
<span class="line"><span style="color:#24292e;">&gt; &lt;font color=&quot;#FF0000&quot;&gt;**{{$v.annotations.description}}**&lt;/font&gt;</span></span>
<span class="line"><span style="color:#24292e;">{{end}}{{ end }}</span></span>
<span class="line"><span style="color:#24292e;">{{ $urimsg:=&quot;&quot;}}{{ range $key,$value:=.commonLabels }}{{$urimsg =</span></span>
<span class="line"><span style="color:#24292e;">print $urimsg $key &quot;%3D%22&quot; $value &quot;%22%2C&quot; }}{{end}}[✍点我屏蔽该告警](http://alertmanager.ikubernetes.net/#/silences/new?filter=%7B{{SplitString $urimsg 0 -3}}%7D)</span></span></code></pre></div><h2 id="_1-2-告警路由" tabindex="-1">1.2 告警路由 <a class="header-anchor" href="#_1-2-告警路由" aria-label="Permalink to &quot;1.2 告警路由&quot;">​</a></h2><p>告警路由的名称,<code>实例-环境-部门-创建人</code>,这样当大量路由创建的时候容易区分</p><h3 id="_1-2-1-路由作用" tabindex="-1">1.2.1 路由作用 <a class="header-anchor" href="#_1-2-1-路由作用" aria-label="Permalink to &quot;1.2.1 路由作用&quot;">​</a></h3><p><strong>可根据路由配置,分发到不同群组</strong></p><p><strong>如果不指定默认路由,告警则走默认告警组</strong></p><h3 id="_1-2-2-创建路由" tabindex="-1">1.2.2 创建路由 <a class="header-anchor" href="#_1-2-2-创建路由" aria-label="Permalink to &quot;1.2.2 创建路由&quot;">​</a></h3><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051426290.png" alt="image-20240705142559024"></p><ul><li>发送没有指定标签</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -XPOST -H &#39;Content-Type: application/json&#39; http://alertmanager.ikubernetes.net/api/v1/alerts -d&#39;[{&quot;labels&quot;:{&quot;hostname&quot;:&quot;you&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -XPOST -H &#39;Content-Type: application/json&#39; http://alertmanager.ikubernetes.net/api/v1/alerts -d&#39;[{&quot;labels&quot;:{&quot;hostname&quot;:&quot;you&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051429302.png" alt="image-20240705142921182"></p><ul><li>指定根据路由标签名字发送</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -XPOST -H &#39;Content-Type: application/json&#39; http://alertmanager.ikubernetes.net/api/v1/alerts -d&#39;[{&quot;labels&quot;:{&quot;hostname&quot;:&quot;han&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -XPOST -H &#39;Content-Type: application/json&#39; http://alertmanager.ikubernetes.net/api/v1/alerts -d&#39;[{&quot;labels&quot;:{&quot;hostname&quot;:&quot;han&quot;},&quot;annotations&quot;:{&quot;summary&quot;:&quot;This is a testalert&quot;}}]&#39;</span></span></code></pre></div><ul><li>效果,devops组默认接收</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407051431566.png" alt="image-20240705143140290"></p><h3 id="_1-2-3-路由正则" tabindex="-1">1.2.3 路由正则 <a class="header-anchor" href="#_1-2-3-路由正则" aria-label="Permalink to &quot;1.2.3 路由正则&quot;">​</a></h3><h2 id="_1-3-alertmanger接入prometheusalert" tabindex="-1">1.3 Alertmanger接入PrometheusAlert <a class="header-anchor" href="#_1-3-alertmanger接入prometheusalert" aria-label="Permalink to &quot;1.3 Alertmanger接入PrometheusAlert&quot;">​</a></h2><p><code>此次采用Prometheus Rules</code></p><h3 id="_1-3-1-alertmanager配置" tabindex="-1">1.3.1 alertmanager配置 <a class="header-anchor" href="#_1-3-1-alertmanager配置" aria-label="Permalink to &quot;1.3.1 alertmanager配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">alertmanager-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">alertmanager.yml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    global:</span></span>
<span class="line"><span style="color:#9ECBFF;">      resolve_timeout: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_smarthost: &#39;smtp.qq.com:465&#39;     # 邮箱服务器的SMTP主机配置</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_from: &#39;xxx@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_username: &#39;xx@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_auth_password: &#39;djubruxxxeee&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#9ECBFF;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#9ECBFF;">    templates:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    route:</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_wait: 10s # 分组内第一个告警等待时间，10s内如有第二个告警会合并一个告警</span></span>
<span class="line"><span style="color:#9ECBFF;">      group_interval: 1m # 发送新告警间隔时间</span></span>
<span class="line"><span style="color:#9ECBFF;">      repeat_interval: 10m # 重复告警间隔发送时间，如果没处理过多久再次发送一次</span></span>
<span class="line"><span style="color:#9ECBFF;">      receiver: &#39;webhook&#39;  #  默认接收人</span></span>
<span class="line"><span style="color:#9ECBFF;">      routes:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: critical222</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">      - receiver: &#39;dingtalk&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        match:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    receivers:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;email&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      email_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - to: &#39;xxxsource@163.com&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"><span style="color:#9ECBFF;">        html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        headers: { Subject: &quot;系统监控告警{{- if gt (len .Alerts.Resolved) 0 -}}恢复{{ end }}&quot; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    #- name: &#39;devops&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    #  email_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">    #  - to: &#39;hxopxxource@163.com,xxx@qq.com&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    #    send_resolved: true</span></span>
<span class="line"><span style="color:#9ECBFF;">    #    html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      wechat_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - corp_id: &#39;wwe158c08ab4275006&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        agent_id: 1000004</span></span>
<span class="line"><span style="color:#9ECBFF;">        api_secret: &#39;eGORelIo1EqzLfgEQs3oPfsdtAOm5nkGELI-Ag3TTwo&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;dingtalk&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      webhook_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - url: &#39;http://dingtalk.monitor.svc.cluster.local:8060/dingtalk/webhook/send&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      webhook_configs:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - url: &#39;http://prometheus-alert-center.monitor.svc:8080/prometheusalert?type=fs&amp;tpl=prometheus-fs&amp;fsurl=https://open.feishu.cn/open-apis/bot/v2/hook/51eb144c-cc6a-xxxx-4c9b23&#39;</span></span>
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
<span class="line"><span style="color:#032F62;">      smtp_from: &#39;xxx@qq.com&#39;    # 发送邮件主题</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_username: &#39;xx@qq.com&#39;      # 登录用户名</span></span>
<span class="line"><span style="color:#032F62;">      smtp_auth_password: &#39;djubruxxxeee&#39;    # 此处的auth password是邮箱的第三方登录授权密码，而非用户密码</span></span>
<span class="line"><span style="color:#032F62;">      smtp_require_tls: false           # 有些邮箱需要开启此配置，这里使用的是企微邮箱，仅做测试，不需要开启此功能。</span></span>
<span class="line"><span style="color:#032F62;">    templates:</span></span>
<span class="line"><span style="color:#032F62;">      - &#39;/etc/alertmanager/*.tmpl&#39;</span></span>
<span class="line"><span style="color:#032F62;">    route:</span></span>
<span class="line"><span style="color:#032F62;">      group_by: [&#39;env&#39;,&#39;instance&#39;,&#39;type&#39;,&#39;group&#39;,&#39;job&#39;,&#39;alertname&#39;,&#39;cluster&#39;]</span></span>
<span class="line"><span style="color:#032F62;">      group_wait: 10s # 分组内第一个告警等待时间，10s内如有第二个告警会合并一个告警</span></span>
<span class="line"><span style="color:#032F62;">      group_interval: 1m # 发送新告警间隔时间</span></span>
<span class="line"><span style="color:#032F62;">      repeat_interval: 10m # 重复告警间隔发送时间，如果没处理过多久再次发送一次</span></span>
<span class="line"><span style="color:#032F62;">      receiver: &#39;webhook&#39;  #  默认接收人</span></span>
<span class="line"><span style="color:#032F62;">      routes:</span></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;email&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: critical222</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">      - receiver: &#39;dingtalk&#39;</span></span>
<span class="line"><span style="color:#032F62;">        match:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    receivers:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;email&#39;</span></span>
<span class="line"><span style="color:#032F62;">      email_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - to: &#39;xxxsource@163.com&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"><span style="color:#032F62;">        html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"><span style="color:#032F62;">        headers: { Subject: &quot;系统监控告警{{- if gt (len .Alerts.Resolved) 0 -}}恢复{{ end }}&quot; }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    #- name: &#39;devops&#39;</span></span>
<span class="line"><span style="color:#032F62;">    #  email_configs:</span></span>
<span class="line"><span style="color:#032F62;">    #  - to: &#39;hxopxxource@163.com,xxx@qq.com&#39;</span></span>
<span class="line"><span style="color:#032F62;">    #    send_resolved: true</span></span>
<span class="line"><span style="color:#032F62;">    #    html: &#39;{{ template &quot;email.to.html&quot; . }}&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;wechat&#39;</span></span>
<span class="line"><span style="color:#032F62;">      wechat_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - corp_id: &#39;wwe158c08ab4275006&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_party: &#39;1&#39;</span></span>
<span class="line"><span style="color:#032F62;">        to_user: &#39;@all&#39;</span></span>
<span class="line"><span style="color:#032F62;">        agent_id: 1000004</span></span>
<span class="line"><span style="color:#032F62;">        api_secret: &#39;eGORelIo1EqzLfgEQs3oPfsdtAOm5nkGELI-Ag3TTwo&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;dingtalk&#39;</span></span>
<span class="line"><span style="color:#032F62;">      webhook_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - url: &#39;http://dingtalk.monitor.svc.cluster.local:8060/dingtalk/webhook/send&#39;</span></span>
<span class="line"><span style="color:#032F62;">        send_resolved: true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    - name: &#39;webhook&#39;</span></span>
<span class="line"><span style="color:#032F62;">      webhook_configs:</span></span>
<span class="line"><span style="color:#032F62;">      - url: &#39;http://prometheus-alert-center.monitor.svc:8080/prometheusalert?type=fs&amp;tpl=prometheus-fs&amp;fsurl=https://open.feishu.cn/open-apis/bot/v2/hook/51eb144c-cc6a-xxxx-4c9b23&#39;</span></span>
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
<span class="line"><span style="color:#032F62;">    {{- end }}</span></span></code></pre></div><ul><li>执行apply</li><li>热更新</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://alertmanager.ikubernetes.net/-/reload</span></span></code></pre></div><h1 id="_2-配置详解" tabindex="-1">2. 配置详解 <a class="header-anchor" href="#_2-配置详解" aria-label="Permalink to &quot;2. 配置详解&quot;">​</a></h1>`,41),p=[t];function o(c,r,i,y,u,F){return n(),a("div",null,p)}const d=s(e,[["render",o]]);export{m as __pageData,d as default};
