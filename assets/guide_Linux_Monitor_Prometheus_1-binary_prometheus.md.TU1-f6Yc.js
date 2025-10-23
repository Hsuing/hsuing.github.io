import{_ as s,o as a,c as n,R as p}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. 部署Prometheus","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/1-binary_prometheus.md","filePath":"guide/Linux/Monitor/Prometheus/1-binary_prometheus.md","lastUpdated":1734344767000}'),l={name:"guide/Linux/Monitor/Prometheus/1-binary_prometheus.md"},e=p(`<h1 id="_1-部署prometheus" tabindex="-1">1. 部署Prometheus <a class="header-anchor" href="#_1-部署prometheus" aria-label="Permalink to &quot;1. 部署Prometheus&quot;">​</a></h1><p><a href="https://prometheus.io/download/" target="_blank" rel="noreferrer">官当</a></p><h2 id="_1-1-下载" tabindex="-1">1.1 下载 <a class="header-anchor" href="#_1-1-下载" aria-label="Permalink to &quot;1.1 下载&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#下载lts稳定版本</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#下载lts稳定版本</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/prometheus/prometheus/releases/download/v2.53.3/prometheus-2.53.3.linux-amd64.tar.gz</span></span></code></pre></div><h2 id="_1-2-创建用户" tabindex="-1">1.2 创建用户 <a class="header-anchor" href="#_1-2-创建用户" aria-label="Permalink to &quot;1.2 创建用户&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建用户</span></span>
<span class="line"><span style="color:#B392F0;">useradd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-rs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/bin/</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建目录</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-xf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus-2.53.3.linux-amd64.tar.gz</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--strip-components=1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-C</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/prometheus/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#修改权限</span></span>
<span class="line"><span style="color:#B392F0;">chown</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-R</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus.</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/prometheus</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建用户</span></span>
<span class="line"><span style="color:#6F42C1;">useradd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-rs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/bin/</span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建目录</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/prometheus</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#解压</span></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-xf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus-2.53.3.linux-amd64.tar.gz</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--strip-components=1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-C</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/prometheus/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#修改权限</span></span>
<span class="line"><span style="color:#6F42C1;">chown</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-R</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus.</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/prometheus</span></span></code></pre></div><h2 id="_1-3-配置systemd" tabindex="-1">1.3 配置systemd <a class="header-anchor" href="#_1-3-配置systemd" aria-label="Permalink to &quot;1.3 配置systemd&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/systemd/system/prometheus.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Prometheus Time Series Collection and Processing Server</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://prometheus.io/docs/introduction/overview/</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">User=prometheus</span></span>
<span class="line"><span style="color:#9ECBFF;">Group=prometheus</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=simple</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/data/apps/prometheus/prometheus </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --config.file /data/apps/prometheus/prometheus.yml </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --storage.tsdb.path /data/apps/prometheus/ </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --web.console.templates=/data/apps/prometheus/consoles </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --web.console.libraries=/data/apps/prometheus/console_libraries </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --web.enable-lifecycle </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --storage.tsdb.retention.time=10d </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --storage.tsdb.no-lockfile </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --storage.tsdb.min-block-duration=2h </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --storage.tsdb.max-block-duration=2h</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/systemd/system/prometheus.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Prometheus Time Series Collection and Processing Server</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://prometheus.io/docs/introduction/overview/</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#032F62;">After=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">User=prometheus</span></span>
<span class="line"><span style="color:#032F62;">Group=prometheus</span></span>
<span class="line"><span style="color:#032F62;">Type=simple</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/data/apps/prometheus/prometheus </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --config.file /data/apps/prometheus/prometheus.yml </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --storage.tsdb.path /data/apps/prometheus/ </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --web.console.templates=/data/apps/prometheus/consoles </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --web.console.libraries=/data/apps/prometheus/console_libraries </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --web.enable-lifecycle </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --storage.tsdb.retention.time=10d </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --storage.tsdb.no-lockfile </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --storage.tsdb.min-block-duration=2h </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#032F62;">    --storage.tsdb.max-block-duration=2h</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><ul><li>启动</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prometheus</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prometheus</span></span></code></pre></div><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202412161800028.png" alt="image-20241216180016321"></p>`,12),o=[e];function t(c,r,i,y,F,d){return a(),n("div",null,o)}const E=s(l,[["render",t]]);export{u as __pageData,E as default};
