import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. 自定义资源接入","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/monitor/prometheus/5-自定义监控.md","filePath":"guide/container/k8s/monitor/prometheus/5-自定义监控.md","lastUpdated":1720533756000}'),l={name:"guide/container/k8s/monitor/prometheus/5-自定义监控.md"},o=p(`<h1 id="_1-自定义资源接入" tabindex="-1">1. 自定义资源接入 <a class="header-anchor" href="#_1-自定义资源接入" aria-label="Permalink to &quot;1. 自定义资源接入&quot;">​</a></h1><p>Prometheus使用各种Exporter来监控资源。Exporter可以看成是监控的agent端，它负责收集对应资源的指标，并提供接口给到Prometheus读取。</p><h1 id="_2-ecs数据抓取" tabindex="-1">2. ECS数据抓取 <a class="header-anchor" href="#_2-ecs数据抓取" aria-label="Permalink to &quot;2. ECS数据抓取&quot;">​</a></h1><h2 id="_2-1-配置安装node-exporter" tabindex="-1">2.1 配置安装node-exporter <a class="header-anchor" href="#_2-1-配置安装node-exporter" aria-label="Permalink to &quot;2.1 配置安装node-exporter&quot;">​</a></h2><ul><li>启动容器</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">docker run -d -p 9100:9100 \\</span></span>
<span class="line"><span style="color:#9ECBFF;">-v &quot;/proc:/host/proc&quot; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">-v &quot;/sys:/host/sys&quot; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">-v &quot;/:/rootfs&quot; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">-v &quot;/etc/localtime:/etc/localtime&quot; \\</span></span>
<span class="line"><span style="color:#9ECBFF;">prom/node-exporter \\</span></span>
<span class="line"><span style="color:#9ECBFF;">--path.procfs /host/proc \\</span></span>
<span class="line"><span style="color:#9ECBFF;">--path.sysfs /host/sys \\</span></span>
<span class="line"><span style="color:#9ECBFF;">--collector.filesystem.ignored-mount-points</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;^/(sys|proc|dev|host|etc)($|/)&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">docker run -d -p 9100:9100 \\</span></span>
<span class="line"><span style="color:#032F62;">-v &quot;/proc:/host/proc&quot; \\</span></span>
<span class="line"><span style="color:#032F62;">-v &quot;/sys:/host/sys&quot; \\</span></span>
<span class="line"><span style="color:#032F62;">-v &quot;/:/rootfs&quot; \\</span></span>
<span class="line"><span style="color:#032F62;">-v &quot;/etc/localtime:/etc/localtime&quot; \\</span></span>
<span class="line"><span style="color:#032F62;">prom/node-exporter \\</span></span>
<span class="line"><span style="color:#032F62;">--path.procfs /host/proc \\</span></span>
<span class="line"><span style="color:#032F62;">--path.sysfs /host/sys \\</span></span>
<span class="line"><span style="color:#032F62;">--collector.filesystem.ignored-mount-points</span></span>
<span class="line"><span style="color:#032F62;">&quot;^/(sys|proc|dev|host|etc)($|/)&quot;</span></span></code></pre></div><blockquote><p>验证,curl localhost:9100/metrics</p></blockquote><ul><li>创建采集器</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">- </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;other-ECS&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&#39;10.103.236.199:9100&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">hostname</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;test-node-exporter&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">- </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;other-ECS&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&#39;10.103.236.199:9100&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">hostname</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;test-node-exporter&#39;</span></span></code></pre></div><ul><li>热加载</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -XPOST http://prometheus.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -XPOST http://prometheus.ikubernetes.net/-/reload</span></span></code></pre></div><h1 id="_3-process-exporter进程监控" tabindex="-1">3. process-exporter进程监控 <a class="header-anchor" href="#_3-process-exporter进程监控" aria-label="Permalink to &quot;3. process-exporter进程监控&quot;">​</a></h1><p><a href="https://github.com/ncabatoff/process-exporter" target="_blank" rel="noreferrer">官当</a></p><p>process-export主要用来做进程监控，比如某个服务的进程数、消耗了多少CPU、内存等资源</p><h2 id="_3-0-语法" tabindex="-1">3.0 语法 <a class="header-anchor" href="#_3-0-语法" aria-label="Permalink to &quot;3.0 语法&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">vim /opt/process-exporter/config/process-exporter.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">process_names</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;">#  - name: &quot;{{.Comm}}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#    cmdline:</span></span>
<span class="line"><span style="color:#6A737D;">#    - &#39;.+&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">cmdline</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">&#39;nginx&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">cmdline</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">&#39;/opt/atlassian/confluence/bin/tomcat-juli.jar&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">cmdline</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">&#39;vsftpd&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">cmdline</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">&#39;redis-server&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">vim /opt/process-exporter/config/process-exporter.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">process_names</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;">#  - name: &quot;{{.Comm}}&quot;</span></span>
<span class="line"><span style="color:#6A737D;">#    cmdline:</span></span>
<span class="line"><span style="color:#6A737D;">#    - &#39;.+&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">cmdline</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">&#39;nginx&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">cmdline</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">&#39;/opt/atlassian/confluence/bin/tomcat-juli.jar&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">cmdline</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">&#39;vsftpd&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">cmdline</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">&#39;redis-server&#39;</span></span></code></pre></div><p>cmdline: 所选进程的唯一标识，ps -ef 可以查询到。如果改进程不存在，则不会有该进程的数据采集到。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{{.Comm}}  记得带上{{}}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{{.Comm}}  记得带上{{}}</span></span></code></pre></div><table><thead><tr><th style="text-align:left;">.Comm</th><th style="text-align:left;">groupname=&quot;redis-server&quot;</th><th style="text-align:left;">exe或者sh文件名称</th></tr></thead><tbody><tr><td style="text-align:left;">.ExeBase</td><td style="text-align:left;">groupname=&quot;redis-server *:6379&quot;</td><td style="text-align:left;">/</td></tr><tr><td style="text-align:left;">.ExeFull</td><td style="text-align:left;">groupname=&quot;/usr/bin/redis-server *:6379&quot;</td><td style="text-align:left;">ps中的进程完成信息</td></tr><tr><td style="text-align:left;">.Username</td><td style="text-align:left;">groupname=&quot;redis&quot;</td><td style="text-align:left;">使用进程所属的用户进行分组</td></tr><tr><td style="text-align:left;">.Matches</td><td style="text-align:left;">groupname=&quot;map[:redis]&quot;</td><td style="text-align:left;">表示配置到关键字&quot;redis&quot;</td></tr></tbody></table><h2 id="_3-1-创建挂载目录" tabindex="-1">3.1 创建挂载目录 <a class="header-anchor" href="#_3-1-创建挂载目录" aria-label="Permalink to &quot;3.1 创建挂载目录&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mkdir -p /opt/process-exporter/config</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cat /opt/process-exporter/config/process-exporter.yml</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">process_names</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;{{.Matches}}&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 匹配模板</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">cmdline</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     - </span><span style="color:#9ECBFF;">&#39;api&#39;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#根据自己的修改</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">mkdir -p /opt/process-exporter/config</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">cat /opt/process-exporter/config/process-exporter.yml</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">process_names</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;{{.Matches}}&quot;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 匹配模板</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">cmdline</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     - </span><span style="color:#032F62;">&#39;api&#39;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">#根据自己的修改</span></span></code></pre></div><h2 id="_3-2-配置安装process-exporter" tabindex="-1">3.2 配置安装process-exporter <a class="header-anchor" href="#_3-2-配置安装process-exporter" aria-label="Permalink to &quot;3.2 配置安装process-exporter&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-itd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9256</span><span style="color:#9ECBFF;">:9256</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--privileged</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/proc:/host/proc</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/opt/process-exporter/config:/config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ncabatoff/process-exporter</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--procfs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/host/proc</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-config.path</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config/process-exporter.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-itd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9256</span><span style="color:#032F62;">:9256</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--privileged</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/proc:/host/proc</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/opt/process-exporter/config:/config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ncabatoff/process-exporter</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--procfs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/host/proc</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-config.path</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config/process-exporter.yml</span></span></code></pre></div><ul><li>验证</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost:9256/metrics</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">aux</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">api</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost:9256/metrics</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">ps</span><span style="color:#24292E;"> </span><span style="color:#032F62;">aux</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">grep</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">api</span></span></code></pre></div><h1 id="_4-k8s中process-exporter进程监控" tabindex="-1">4. k8s中process-exporter进程监控 <a class="header-anchor" href="#_4-k8s中process-exporter进程监控" aria-label="Permalink to &quot;4. k8s中process-exporter进程监控&quot;">​</a></h1><p>需要监控k8s集群每台linux服务器的 docker kubelet进程运行状态，当有进程异常时，触发告警</p><h2 id="_4-1-配置config" tabindex="-1">4.1 配置config <a class="header-anchor" href="#_4-1-配置config" aria-label="Permalink to &quot;4.1 配置config&quot;">​</a></h2><ul><li>创建config</li></ul><p>1.exporter-cofig.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">process-exporter-config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">process-exporter-config.yaml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    process_names:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      cmdline:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &#39;docker&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: &quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">      cmdline:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - &#39;kubelet&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">process-exporter-config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">process-exporter-config.yaml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    process_names:</span></span>
<span class="line"><span style="color:#032F62;">    - name: &quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      cmdline:</span></span>
<span class="line"><span style="color:#032F62;">      - &#39;docker&#39;</span></span>
<span class="line"><span style="color:#032F62;">    - name: &quot;{{.Matches}}&quot;</span></span>
<span class="line"><span style="color:#032F62;">      cmdline:</span></span>
<span class="line"><span style="color:#032F62;">      - &#39;kubelet&#39;</span></span></code></pre></div><ul><li>执行</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">kubectl apply -f 1.exporter-cofig.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">kubectl apply -f 1.exporter-cofig.yaml</span></span></code></pre></div><h2 id="_4-2-安装" tabindex="-1">4.2 安装 <a class="header-anchor" href="#_4-2-安装" aria-label="Permalink to &quot;4.2 安装&quot;">​</a></h2><ul><li>创建daeset</li></ul><p>2.exporter-dp.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DaemonSet</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">process-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">process-exporter</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">process-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">process-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">hostPID</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">hostIPC</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">hostNetwork</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">nodeSelector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">kubernetes.io/os</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">linux</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">process-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/process-exporter:latest</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#9ECBFF;">-config.path=/config/process-exporter-config.yaml</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9256</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">150m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">180Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">runAsNonRoot</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">runAsUser</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">65534</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">proc</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/proc</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/config</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">proc</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/proc</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">configMap</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">process-exporter-config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DaemonSet</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">process-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">process-exporter</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">process-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">process-exporter</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">hostPID</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">hostIPC</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">hostNetwork</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">nodeSelector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">kubernetes.io/os</span><span style="color:#24292E;">: </span><span style="color:#032F62;">linux</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">process-exporter</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/process-exporter:latest</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">args</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#032F62;">-config.path=/config/process-exporter-config.yaml</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9256</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10Mi</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">150m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">180Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">runAsNonRoot</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">runAsUser</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">65534</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">proc</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/proc</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/config</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">proc</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/proc</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">configMap</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">process-exporter-config</span></span></code></pre></div><ul><li>apply</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">kubectl apply -f 2.exporter-dp.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">kubectl apply -f 2.exporter-dp.yaml</span></span></code></pre></div><ul><li>验证</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl pod-ip:9256/metrics</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl pod-ip:9256/metrics</span></span></code></pre></div><h2 id="_4-3-prometheus配置采集器" tabindex="-1">4.3 prometheus配置采集器 <a class="header-anchor" href="#_4-3-prometheus配置采集器" aria-label="Permalink to &quot;4.3 prometheus配置采集器&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;process-exporter&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">scrape_timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">1m</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">kubernetes_sd_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">role</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">node</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">relabel_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">source_labels</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">__address__</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">regex</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;(.*):10250&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">replacement</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;\${1}:9256&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">target_label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">__address__</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">action</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">replace</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">action</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">labelmap</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">regex</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">__meta_kubernetes_node_label_(.+)</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">source_labels</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">__meta_kubernetes_node_address_InternalIP</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">action</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">replace</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">target_label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ip</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;process-exporter&#39;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">scrape_timeout</span><span style="color:#24292E;">: </span><span style="color:#032F62;">1m</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">kubernetes_sd_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">role</span><span style="color:#24292E;">: </span><span style="color:#032F62;">node</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">relabel_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">source_labels</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">__address__</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">regex</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;(.*):10250&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">replacement</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;\${1}:9256&#39;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">target_label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">__address__</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">action</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replace</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">action</span><span style="color:#24292E;">: </span><span style="color:#032F62;">labelmap</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">regex</span><span style="color:#24292E;">: </span><span style="color:#032F62;">__meta_kubernetes_node_label_(.+)</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">source_labels</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">__meta_kubernetes_node_address_InternalIP</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">action</span><span style="color:#24292E;">: </span><span style="color:#032F62;">replace</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">target_label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ip</span></span></code></pre></div><ul><li>热更新</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406301541827.png" alt="image-20240630154052134"></p><h2 id="_4-4-rule规则" tabindex="-1">4.4 rule规则 <a class="header-anchor" href="#_4-4-rule规则" aria-label="Permalink to &quot;4.4 rule规则&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-rule</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">prometheus-rule</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitoring</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">alert-rules.yaml</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: node-alert</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: service not running</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: namedprocess_namegroup_num_procs == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 1m</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">          team: server</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &quot;{{$labels.ip}} service status not running&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &quot;{{$labels.ip}} {{$labels.groupname}} service status not running&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          value: &quot;{{$labels.groupname}}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-rule</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">prometheus-rule</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitoring</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">alert-rules.yaml</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: node-alert</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: service not running</span></span>
<span class="line"><span style="color:#032F62;">        expr: namedprocess_namegroup_num_procs == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 1m</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">          team: server</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &quot;{{$labels.ip}} service status not running&quot;</span></span>
<span class="line"><span style="color:#032F62;">          description: &quot;{{$labels.ip}} {{$labels.groupname}} service status not running&quot;</span></span>
<span class="line"><span style="color:#032F62;">          value: &quot;{{$labels.groupname}}&quot;</span></span></code></pre></div><p>模板ID为249</p><h1 id="_5-domain-exporter" tabindex="-1">5. domain-exporter <a class="header-anchor" href="#_5-domain-exporter" aria-label="Permalink to &quot;5. domain-exporter&quot;">​</a></h1><p>文档,<a href="https://github.com/caarlos0/domain_exporter/releases" target="_blank" rel="noreferrer">https://github.com/caarlos0/domain_exporter/releases</a></p><h2 id="_5-1-创建svc" tabindex="-1">5.1 创建svc <a class="header-anchor" href="#_5-1-创建svc" aria-label="Permalink to &quot;5.1 创建svc&quot;">​</a></h2><p>cat 1.domain-svc.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Service</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9222</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">targetPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9222</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Service</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9222</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">targetPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9222</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span></code></pre></div><ul><li>执行apply</li></ul><h2 id="_5-2-创建dp" tabindex="-1">5.2 创建dp <a class="header-anchor" href="#_5-2-创建dp" aria-label="Permalink to &quot;5.2 创建dp&quot;">​</a></h2><p>cat 2.domain-exporter-dp.yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apps/v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Deployment</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">monitor</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">replicas</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">matchLabels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">labels</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">app</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/domain_exporter:v1.23.0</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">tcp</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9222</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">100m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">50Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">200m</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">256Mi</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">runAsUser</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1000</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">readOnlyRootFilesystem</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">runAsNonRoot</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">readinessProbe</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">tcpSocket</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9222</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">initialDelaySeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">timeoutSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">periodSeconds</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">successThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">failureThreshold</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apps/v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Deployment</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">monitor</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">replicas</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">matchLabels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">labels</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">app</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-zhangjiakou.aliyuncs.com/hsuing/domain_exporter:v1.23.0</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">tcp</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9222</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">100m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">50Mi</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: </span><span style="color:#032F62;">200m</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: </span><span style="color:#032F62;">256Mi</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">runAsUser</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1000</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">readOnlyRootFilesystem</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">runAsNonRoot</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">readinessProbe</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">tcpSocket</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9222</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">initialDelaySeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">timeoutSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">periodSeconds</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">successThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">failureThreshold</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span></code></pre></div><ul><li>执行apply</li></ul><h2 id="_5-3-接入prometheus" tabindex="-1">5.3 接入prometheus <a class="header-anchor" href="#_5-3-接入prometheus" aria-label="Permalink to &quot;5.3 接入prometheus&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">metrics_path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/probe</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">relabel_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">source_labels</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">__address__</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">target_label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">__param_target</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">target_label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">__address__</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">replacement</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">domain-exporter:9222</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># domain_exporter address</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">baidu.com</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#根据环境修改</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">metrics_path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/probe</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">relabel_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">source_labels</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">__address__</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">target_label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">__param_target</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">target_label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">__address__</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">replacement</span><span style="color:#24292E;">: </span><span style="color:#032F62;">domain-exporter:9222</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># domain_exporter address</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">baidu.com</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#根据环境修改</span></span></code></pre></div><ul><li><p>执行apply</p></li><li><p>热更新</p></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">curl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-XPOST</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">curl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-XPOST</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://prometheus.ikubernetes.net/-/reload</span></span></code></pre></div><h2 id="_5-4-报警规则" tabindex="-1">5.4 报警规则 <a class="header-anchor" href="#_5-4-报警规则" aria-label="Permalink to &quot;5.4 报警规则&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">domain.rules</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">    groups:</span></span>
<span class="line"><span style="color:#9ECBFF;">    - name: domain</span></span>
<span class="line"><span style="color:#9ECBFF;">      rules:</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: 域名检测失败</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: domain_probe_success == 0</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2h</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;{{ $labels.instance }} ,域名检测&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.domain }}, 域名检测失败,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: 域名过期</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: domain_expiry_days &lt; 15</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2h</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.domain }},将在15天后过期,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">      - alert: 域名过期</span></span>
<span class="line"><span style="color:#9ECBFF;">        expr: domain_expiry_days &lt; 5</span></span>
<span class="line"><span style="color:#9ECBFF;">        for: 2h</span></span>
<span class="line"><span style="color:#9ECBFF;">        labels:</span></span>
<span class="line"><span style="color:#9ECBFF;">          severity: warning</span></span>
<span class="line"><span style="color:#9ECBFF;">        annotations:</span></span>
<span class="line"><span style="color:#9ECBFF;">          summary: &#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">          description: &#39;{{ $labels.domain }},将在5天后过期,请及时查看!!!&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">domain.rules</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">    groups:</span></span>
<span class="line"><span style="color:#032F62;">    - name: domain</span></span>
<span class="line"><span style="color:#032F62;">      rules:</span></span>
<span class="line"><span style="color:#032F62;">      - alert: 域名检测失败</span></span>
<span class="line"><span style="color:#032F62;">        expr: domain_probe_success == 0</span></span>
<span class="line"><span style="color:#032F62;">        for: 2h</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;{{ $labels.instance }} ,域名检测&#39;</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.domain }}, 域名检测失败,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: 域名过期</span></span>
<span class="line"><span style="color:#032F62;">        expr: domain_expiry_days &lt; 15</span></span>
<span class="line"><span style="color:#032F62;">        for: 2h</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.domain }},将在15天后过期,请及时查看!!!&#39;</span></span>
<span class="line"><span style="color:#032F62;">      - alert: 域名过期</span></span>
<span class="line"><span style="color:#032F62;">        expr: domain_expiry_days &lt; 5</span></span>
<span class="line"><span style="color:#032F62;">        for: 2h</span></span>
<span class="line"><span style="color:#032F62;">        labels:</span></span>
<span class="line"><span style="color:#032F62;">          severity: warning</span></span>
<span class="line"><span style="color:#032F62;">        annotations:</span></span>
<span class="line"><span style="color:#032F62;">          summary: &#39;{{ $labels.instance }},域名过期&#39;</span></span>
<span class="line"><span style="color:#032F62;">          description: &#39;{{ $labels.domain }},将在5天后过期,请及时查看!!!&#39;</span></span></code></pre></div><ul><li>执行apply</li><li>热更新</li></ul><h1 id="_6-redis-export" tabindex="-1">6. redis-export <a class="header-anchor" href="#_6-redis-export" aria-label="Permalink to &quot;6. redis-export&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">version: &quot;3.2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">  redis-exporter:</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: oliver006/redis_exporter</span></span>
<span class="line"><span style="color:#e1e4e8;">    container_name: redis-exporter</span></span>
<span class="line"><span style="color:#e1e4e8;">    restart: unless-stopped</span></span>
<span class="line"><span style="color:#e1e4e8;">    command:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;-redis.password-file=/redis_passwd.json&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - /usr/share/zoneinfo/PRC:/etc/localtime</span></span>
<span class="line"><span style="color:#e1e4e8;">      - /data/redis-exporter/redis_passwd.json:/redis_passwd.json</span></span>
<span class="line"><span style="color:#e1e4e8;">    expose:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 9121</span></span>
<span class="line"><span style="color:#e1e4e8;">    network_mode: &quot;host&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">version: &quot;3.2&quot;</span></span>
<span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">  redis-exporter:</span></span>
<span class="line"><span style="color:#24292e;">    image: oliver006/redis_exporter</span></span>
<span class="line"><span style="color:#24292e;">    container_name: redis-exporter</span></span>
<span class="line"><span style="color:#24292e;">    restart: unless-stopped</span></span>
<span class="line"><span style="color:#24292e;">    command:</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;-redis.password-file=/redis_passwd.json&quot;</span></span>
<span class="line"><span style="color:#24292e;">    volumes:</span></span>
<span class="line"><span style="color:#24292e;">      - /usr/share/zoneinfo/PRC:/etc/localtime</span></span>
<span class="line"><span style="color:#24292e;">      - /data/redis-exporter/redis_passwd.json:/redis_passwd.json</span></span>
<span class="line"><span style="color:#24292e;">    expose:</span></span>
<span class="line"><span style="color:#24292e;">      - 9121</span></span>
<span class="line"><span style="color:#24292e;">    network_mode: &quot;host&quot;</span></span></code></pre></div><h1 id="_7-mysql-export" tabindex="-1">7. mysql-export <a class="header-anchor" href="#_7-mysql-export" aria-label="Permalink to &quot;7. mysql-export&quot;">​</a></h1><p><a href="https://github.com/prometheus/mysqld_exporter" target="_blank" rel="noreferrer">https://github.com/prometheus/mysqld_exporter</a></p><p><a href="https://github.com/starsliao/TenSunS/blob/main/docs/%E5%A6%82%E4%BD%95%E4%BC%98%E9%9B%85%E7%9A%84%E4%BD%BF%E7%94%A8%E4%B8%80%E4%B8%AAmysqld_exporter%E7%9B%91%E6%8E%A7%E6%89%80%E6%9C%89%E7%9A%84MySQL%E5%AE%9E%E4%BE%8B.md" target="_blank" rel="noreferrer">https://github.com/starsliao/TenSunS/blob/main/docs/如何优雅的使用一个mysqld_exporter监控所有的MySQL实例.md</a></p><h1 id="_8-pg-export" tabindex="-1">8. PG-export <a class="header-anchor" href="#_8-pg-export" aria-label="Permalink to &quot;8. PG-export&quot;">​</a></h1><p><a href="https://github.com/prometheus-community/postgres_exporter" target="_blank" rel="noreferrer">https://github.com/prometheus-community/postgres_exporter</a></p><p><a href="https://cloud.tencent.com/developer/article/1868937" target="_blank" rel="noreferrer">https://cloud.tencent.com/developer/article/1868937</a></p><p><a href="https://pigsty.cc/zh/docs/pgsql/dashboard/" target="_blank" rel="noreferrer">https://pigsty.cc/zh/docs/pgsql/dashboard/</a></p><p><a href="https://demo.pigsty.cc/dashboards/f/pgsql/pgsql" target="_blank" rel="noreferrer">https://demo.pigsty.cc/dashboards/f/pgsql/pgsql</a></p><p><a href="https://grafana.com/grafana/dashboards/?plcmt=footer" target="_blank" rel="noreferrer">搜索模版</a></p><p>参考,</p><p><a href="https://grafana.com/grafana/dashboards/9965" target="_blank" rel="noreferrer">https://grafana.com/grafana/dashboards/9965</a></p><p><a href="https://cloud.tencent.com/document/product/1416/56038" target="_blank" rel="noreferrer">https://cloud.tencent.com/document/product/1416/56038</a></p>`,81),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
