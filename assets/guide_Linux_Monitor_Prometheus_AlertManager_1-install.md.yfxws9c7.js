import{_ as e,o as a,c as s,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/AlertManager/1-install.md","filePath":"guide/Linux/Monitor/Prometheus/AlertManager/1-install.md","lastUpdated":1735121496000}'),t={name:"guide/Linux/Monitor/Prometheus/AlertManager/1-install.md"},l=n(`<p><a href="https://www.cnblogs.com/blogof-fusu/p/17161554.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/blogof-fusu/p/17161554.html</a></p><p><a href="https://devopscube.com/prometheus-alert-manager/" target="_blank" rel="noreferrer">https://devopscube.com/prometheus-alert-manager/</a></p><p><a href="https://kebingzao.com/2022/11/29/prometheus-4-alertmanager/" target="_blank" rel="noreferrer">https://kebingzao.com/2022/11/29/prometheus-4-alertmanager/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">      tee /etc/systemd/system/alertmanager.service &lt;&lt;-&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">      [Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">      Description=Alert manager Server</span></span>
<span class="line"><span style="color:#e1e4e8;">      Documentation=https://prometheus.io/docs/introduction/overview/</span></span>
<span class="line"><span style="color:#e1e4e8;">      After=network-online.target</span></span>
<span class="line"><span style="color:#e1e4e8;">      [Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">      User=prometheus</span></span>
<span class="line"><span style="color:#e1e4e8;">      Restart=on-failure</span></span>
<span class="line"><span style="color:#e1e4e8;">      ExecStart={{alertmanager_deploy_path}}/alertmanager --config.file={{alertmanager_deploy_path}}/alertmanager.yml --storage.path={{alertmanager_base_path}}/data</span></span>
<span class="line"><span style="color:#e1e4e8;">      [Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">      WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#e1e4e8;">      </span></span>
<span class="line"><span style="color:#e1e4e8;">      EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">      tee /etc/systemd/system/alertmanager.service &lt;&lt;-&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#24292e;">      [Unit]</span></span>
<span class="line"><span style="color:#24292e;">      Description=Alert manager Server</span></span>
<span class="line"><span style="color:#24292e;">      Documentation=https://prometheus.io/docs/introduction/overview/</span></span>
<span class="line"><span style="color:#24292e;">      After=network-online.target</span></span>
<span class="line"><span style="color:#24292e;">      [Service]</span></span>
<span class="line"><span style="color:#24292e;">      User=prometheus</span></span>
<span class="line"><span style="color:#24292e;">      Restart=on-failure</span></span>
<span class="line"><span style="color:#24292e;">      ExecStart={{alertmanager_deploy_path}}/alertmanager --config.file={{alertmanager_deploy_path}}/alertmanager.yml --storage.path={{alertmanager_base_path}}/data</span></span>
<span class="line"><span style="color:#24292e;">      [Install]</span></span>
<span class="line"><span style="color:#24292e;">      WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#24292e;">      </span></span>
<span class="line"><span style="color:#24292e;">      EOF</span></span></code></pre></div>`,4),p=[l];function r(o,c,i,m,g,d){return a(),s("div",null,p)}const _=e(t,[["render",r]]);export{u as __pageData,_ as default};
