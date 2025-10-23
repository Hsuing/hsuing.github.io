import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. Containerd配置","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/containerd/4-config.md","filePath":"guide/container/containerd/4-config.md","lastUpdated":1729765555000}'),p={name:"guide/container/containerd/4-config.md"},o=l(`<h1 id="_1-containerd配置" tabindex="-1">1. Containerd配置 <a class="header-anchor" href="#_1-containerd配置" aria-label="Permalink to &quot;1. Containerd配置&quot;">​</a></h1><h2 id="_1-1-containerd-service" tabindex="-1">1.1 containerd.service <a class="header-anchor" href="#_1-1-containerd-service" aria-label="Permalink to &quot;1.1 containerd.service&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">root@kube-master-01 containers</span><span style="color:#E1E4E8;">]# </span><span style="color:#9ECBFF;">cat /etc/systemd/system/containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">Unit</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=containerd container runtime</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://containerd.io</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network.target local-fs.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">Service</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStartPre=-/sbin/modprobe overlay</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/containerd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">Type=notify</span></span>
<span class="line"><span style="color:#9ECBFF;">Delegate=yes</span></span>
<span class="line"><span style="color:#9ECBFF;">KillMode=process</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=5</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">OOMScoreAdjust=-999</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">Install</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">root@kube-master-01 containers</span><span style="color:#24292E;">]# </span><span style="color:#032F62;">cat /etc/systemd/system/containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">Unit</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#032F62;">Description=containerd container runtime</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://containerd.io</span></span>
<span class="line"><span style="color:#032F62;">After=network.target local-fs.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">Service</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#032F62;">ExecStartPre=-/sbin/modprobe overlay</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/containerd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Type=notify</span></span>
<span class="line"><span style="color:#032F62;">Delegate=yes</span></span>
<span class="line"><span style="color:#032F62;">KillMode=process</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=5</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">OOMScoreAdjust=-999</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[</span><span style="color:#032F62;">Install</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>1.Delegate</p><p>2.KillMode 该值用来设置systemd单元进程被杀死的方式, 默认值:control-group, 该字段还可以设置如下:</p><p>control-group: 当前控制组里面的所有子进程都会被杀掉.</p><p>process: 只杀主进程.</p><p>mixed: 主进程收到SIGTERM信号,子进程收到SIGKILL信号.</p><p>none: 没有进程被杀掉, 只是执行服务的stop命令.</p><p><code>containerd</code>将KillMode的值设置为process,这样可以确保升级或重启containerd时<code>不杀死现有的容器</code>.</p></div><h2 id="_1-2-配置镜像加速" tabindex="-1">1.2 配置镜像加速 <a class="header-anchor" href="#_1-2-配置镜像加速" aria-label="Permalink to &quot;1.2 配置镜像加速&quot;">​</a></h2><h3 id="_1-修改配置文件-推荐" tabindex="-1">1.修改配置文件，推荐 <a class="header-anchor" href="#_1-修改配置文件-推荐" aria-label="Permalink to &quot;1.修改配置文件，推荐&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/config.toml</span></span>
<span class="line"><span style="color:#6A737D;"># 修改内容</span></span>
<span class="line"><span style="color:#E1E4E8;">[plugins.</span><span style="color:#9ECBFF;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#E1E4E8;">.registry]</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">config_path</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/etc/containerd/certs.d&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#6A737D;">#创建目录</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/certs.d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/config.toml</span></span>
<span class="line"><span style="color:#6A737D;"># 修改内容</span></span>
<span class="line"><span style="color:#24292E;">[plugins.</span><span style="color:#032F62;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#24292E;">.registry]</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">config_path</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/etc/containerd/certs.d&quot;</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#6A737D;">#创建目录</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/certs.d</span></span></code></pre></div><ul><li>重启服务</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">containerd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">containerd</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>建议：</p><p>/etc/containerd/config.toml配置文件当中打开config_path配置，指向镜像仓库配置目录即可。这种方式只</p><p>需要在第一次修改/etc/containerd/config.toml文件打开config_path配置时需要重启containerd，后续我</p><p>们增加镜像仓库配置都无需重启containerd，非常方便。</p><p><code>另一种方式-不推荐</code></p><p>/etc/containerd/config.toml配置文件，这种方式在较新版本的contaienrd中已经被废弃，将来肯定会被移</p><p>除，只不过现在还可以使用而已。另外，这种方式有一个不好的地方就是，每次改/etc/containerd/config.toml</p><p>配置文件，都需重启containerd服务。</p></div><h3 id="_2-添加加速配置" tabindex="-1">2.添加加速配置 <a class="header-anchor" href="#_2-添加加速配置" aria-label="Permalink to &quot;2.添加加速配置&quot;">​</a></h3><p>hosts.toml<code>文件中的内容仅支持：</code>server, capabilities, ca, client, skip_verify, [header], override_path</p><ul><li>docker</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># docker hub镜像加速</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/certs.d/docker.io</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/certs.d/docker.io/hosts.toml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">server = &quot;https://docker.io&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">[host.&quot;https://dockerproxy.com&quot;]</span></span>
<span class="line"><span style="color:#9ECBFF;">  capabilities = [&quot;pull&quot;, &quot;resolve&quot;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[host.&quot;https://docker.m.daocloud.io&quot;]</span></span>
<span class="line"><span style="color:#9ECBFF;">  capabilities = [&quot;pull&quot;, &quot;resolve&quot;]</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># registry.k8s.io镜像加速</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/certs.d/registry.k8s.io</span></span>
<span class="line"><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/certs.d/registry.k8s.io/hosts.toml</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> &#39;</span><span style="color:#9ECBFF;">EOF</span><span style="color:#E1E4E8;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">server = &quot;https://registry.k8s.io&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[host.&quot;https://k8s.m.daocloud.io&quot;]</span></span>
<span class="line"><span style="color:#9ECBFF;">  capabilities = [&quot;pull&quot;, &quot;resolve&quot;, &quot;push&quot;]</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># docker hub镜像加速</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/certs.d/docker.io</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/certs.d/docker.io/hosts.toml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">server = &quot;https://docker.io&quot;</span></span>
<span class="line"><span style="color:#032F62;">[host.&quot;https://dockerproxy.com&quot;]</span></span>
<span class="line"><span style="color:#032F62;">  capabilities = [&quot;pull&quot;, &quot;resolve&quot;]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[host.&quot;https://docker.m.daocloud.io&quot;]</span></span>
<span class="line"><span style="color:#032F62;">  capabilities = [&quot;pull&quot;, &quot;resolve&quot;]</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># registry.k8s.io镜像加速</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/certs.d/registry.k8s.io</span></span>
<span class="line"><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/certs.d/registry.k8s.io/hosts.toml</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> &#39;</span><span style="color:#032F62;">EOF</span><span style="color:#24292E;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">server = &quot;https://registry.k8s.io&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[host.&quot;https://k8s.m.daocloud.io&quot;]</span></span>
<span class="line"><span style="color:#032F62;">  capabilities = [&quot;pull&quot;, &quot;resolve&quot;, &quot;push&quot;]</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p><strong><code>hosts.toml</code>中可以配置多个镜像仓库，<code>containerd</code>下载竟像时会根据配置的顺序使用镜像仓库，只有当上一个仓库下载失败才会使用下一个镜像仓库</strong></p></div><h3 id="_3-验证" tabindex="-1">3.验证 <a class="header-anchor" href="#_3-验证" aria-label="Permalink to &quot;3.验证&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">nerdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--debug=true</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry.k8s.io/sig-storage/csi-provisioner:v3.5.0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">nerdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--debug=true</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">k8s.gcr.io/kube-apiserver:v1.17.3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">nerdctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--debug=true</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry.k8s.io/sig-storage/csi-provisioner:v3.5.0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">nerdctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--debug=true</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">k8s.gcr.io/kube-apiserver:v1.17.3</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>对于nerdctl命令来说，会自动使用/etc/containerd/certs.d目录下的配置镜像加速，但是对于ctr命令，需要指定--hosts-dir=/etc/containerd/certs.d。</p><p>比如：ctr i pull --hosts-dir=/etc/containerd/certs.d registry.k8s.io/sig-storage/csi-provisioner:v3.5.0，</p><p>如果要确定此命令是否真的使用了镜像加速，可以增加--debug=true参数，</p><p>比如：ctr --debug=true i pull --hosts-dir=/etc/containerd/certs.d registry.k8s.io/sig-storage/csi-provisioner:v3.5.0</p></div>`,18),e=[o];function t(c,r,i,y,d,E){return n(),a("div",null,e)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};
