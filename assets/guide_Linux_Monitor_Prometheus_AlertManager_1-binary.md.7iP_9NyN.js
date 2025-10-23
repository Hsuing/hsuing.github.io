import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/AlertManager/1-binary.md","filePath":"guide/Linux/Monitor/Prometheus/AlertManager/1-binary.md","lastUpdated":1733967691000}'),l={name:"guide/Linux/Monitor/Prometheus/AlertManager/1-binary.md"},p=e(`<p><a href="https://www.cnblogs.com/hahaha111122222/p/15588243.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/hahaha111122222/p/15588243.html</a></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">cat &gt;/usr/lib/systemd/system/alertmanager.service &lt;&lt;EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">Unit</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Alertmanager for prometheus</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://prometheus.io/docs/alerting/alertmanager/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">Service</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=on-failure</span></span>
<span class="line"><span style="color:#9ECBFF;">User=prometheus</span></span>
<span class="line"><span style="color:#9ECBFF;">EnvironmentFile=/etc/default/prometheus-alertmanager</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/bin/prometheus-alertmanager \\</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">--cluster.advertise-address=&quot;ip:9093&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Add this, as otherwise it won&#39;t work</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecReload=/bin/kill -HUP $MAINPID</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutStopSec=20s</span></span>
<span class="line"><span style="color:#9ECBFF;">SendSIGKILL=no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">Install</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">cat &gt;/usr/lib/systemd/system/alertmanager.service &lt;&lt;EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">Unit</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#032F62;">Description=Alertmanager for prometheus</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://prometheus.io/docs/alerting/alertmanager/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">Service</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#032F62;">Restart=on-failure</span></span>
<span class="line"><span style="color:#032F62;">User=prometheus</span></span>
<span class="line"><span style="color:#032F62;">EnvironmentFile=/etc/default/prometheus-alertmanager</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/bin/prometheus-alertmanager \\</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#032F62;">--cluster.advertise-address=&quot;ip:9093&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Add this, as otherwise it won&#39;t work</span></span>
<span class="line"><span style="color:#032F62;">ExecReload=/bin/kill -HUP $MAINPID</span></span>
<span class="line"><span style="color:#032F62;">TimeoutStopSec=20s</span></span>
<span class="line"><span style="color:#032F62;">SendSIGKILL=no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">Install</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><p><a href="https://docs.taler.net/system-administration/prometheus-alerts.html" target="_blank" rel="noreferrer">https://docs.taler.net/system-administration/prometheus-alerts.html</a></p>`,3),t=[p];function o(r,c,i,y,E,m){return a(),n("div",null,t)}const u=s(l,[["render",o]]);export{F as __pageData,u as default};
