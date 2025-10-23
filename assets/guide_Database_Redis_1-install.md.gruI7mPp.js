import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/Redis/1-install.md","filePath":"guide/Database/Redis/1-install.md","lastUpdated":1720533756000}'),l={name:"guide/Database/Redis/1-install.md"},p=n(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1，下载redis</span></span>
<span class="line"><span style="color:#e1e4e8;">#cd /usr/local/src/</span></span>
<span class="line"><span style="color:#e1e4e8;">#wget http://download.redis.io/releases/redis-3.0.7.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">#tar zxvf redis-3.0.7.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">#cd /usr/local/src/redis-3.0.7</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">#make MALLOC=jemalloc</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">#make PREFIX=/opt/apps/redis install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1，下载redis</span></span>
<span class="line"><span style="color:#24292e;">#cd /usr/local/src/</span></span>
<span class="line"><span style="color:#24292e;">#wget http://download.redis.io/releases/redis-3.0.7.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">#tar zxvf redis-3.0.7.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">#cd /usr/local/src/redis-3.0.7</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">#make MALLOC=jemalloc</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">#make PREFIX=/opt/apps/redis install</span></span></code></pre></div><p>5.0.7 和3.x 安装方式一样</p><h2 id="_2-启动方式" tabindex="-1">2.启动方式 <a class="header-anchor" href="#_2-启动方式" aria-label="Permalink to &quot;2.启动方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat &gt; /lib/systemd/system/redis.service &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;">Description=Redis persistent key-value database</span></span>
<span class="line"><span style="color:#e1e4e8;">After=network.target</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Service]</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/data/apps/reids/bin/redis-server /data/apps/reids/etc/redis.conf --supervised systemd</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStop=/bin/kill -s QUIT \\$MAINPID</span></span>
<span class="line"><span style="color:#e1e4e8;">Type=notify</span></span>
<span class="line"><span style="color:#e1e4e8;">User=redis</span></span>
<span class="line"><span style="color:#e1e4e8;">Group=redis</span></span>
<span class="line"><span style="color:#e1e4e8;">RuntimeDirectory=redis</span></span>
<span class="line"><span style="color:#e1e4e8;">RuntimeDirectoryMode=0755</span></span>
<span class="line"><span style="color:#e1e4e8;">LimitNOFILE=1000000</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy=multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat &gt; /lib/systemd/system/redis.service &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;">Description=Redis persistent key-value database</span></span>
<span class="line"><span style="color:#24292e;">After=network.target</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Service]</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/data/apps/reids/bin/redis-server /data/apps/reids/etc/redis.conf --supervised systemd</span></span>
<span class="line"><span style="color:#24292e;">ExecStop=/bin/kill -s QUIT \\$MAINPID</span></span>
<span class="line"><span style="color:#24292e;">Type=notify</span></span>
<span class="line"><span style="color:#24292e;">User=redis</span></span>
<span class="line"><span style="color:#24292e;">Group=redis</span></span>
<span class="line"><span style="color:#24292e;">RuntimeDirectory=redis</span></span>
<span class="line"><span style="color:#24292e;">RuntimeDirectoryMode=0755</span></span>
<span class="line"><span style="color:#24292e;">LimitNOFILE=1000000</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;">WantedBy=multi-user.target</span></span></code></pre></div><ul><li>reload</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl daemon-reload </span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable --now  redis</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl daemon-reload </span></span>
<span class="line"><span style="color:#24292e;">systemctl enable --now  redis</span></span></code></pre></div>`,6),t=[p];function o(c,i,r,d,y,u){return e(),a("div",null,t)}const h=s(l,[["render",o]]);export{g as __pageData,h as default};
