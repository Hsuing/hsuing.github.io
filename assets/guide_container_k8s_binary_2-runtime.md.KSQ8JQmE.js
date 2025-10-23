import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const k=JSON.parse('{"title":"1. Kubernetes容器运行时演进","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/binary/2-runtime.md","filePath":"guide/container/k8s/binary/2-runtime.md","lastUpdated":1726994086000}'),l={name:"guide/container/k8s/binary/2-runtime.md"},p=e(`<h1 id="_1-kubernetes容器运行时演进" tabindex="-1">1. Kubernetes容器运行时演进 <a class="header-anchor" href="#_1-kubernetes容器运行时演进" aria-label="Permalink to &quot;1. Kubernetes容器运行时演进&quot;">​</a></h1><p>早期的kubernetes runtime架构，远没这么复杂，kubelet创建容器，直接调用docker daemon，docker daemon自己调用libcontainer就把容器运行起来。</p><p>国际大厂们认为运行时标准不能被 Docker 一家公司控制，于是就串通搞了开放容器标准 OCI。忽悠Docker 把 libcontainer 封装了一下，变成 runC 捐献出来作为 OCI 的参考实现。</p><blockquote><p>OCI（开放容器标准），规定了2点：</p><ul><li>容器镜像要长啥样，即 ImageSpec。里面的大致规定就是你这个东西需要是一个压缩了的文件夹，文件夹里以 xxx 结构放 xxx 文件；</li><li>容器要需要能接收哪些指令，这些指令的行为是什么，即 RuntimeSpec。这里面的大致内容就是“容器”要能够执行 “create”，“start”，“stop”，“delete” 这些命令，并且行为要规范。</li></ul><p>runC 参考实现，就是它能按照标准将符合标准的容器镜像运行起来，标准的好处就是方便搞创新，只要符合标准，生态圈里的其它工具都能和我一起工作（……当然 OCI 这个标准本身制定得不怎么样，真正工程上还是要做一些 adapter 的），那我的镜像就可以用任意的工具去构建，我的“容器”就不一定非要用 namespace 和 cgroups 来做隔离。这就让各种虚拟化容器可以更好地参与到容器实现当中。</p></blockquote><p>再接下来 rkt(coreos推出的，类似docker) 想从 Docker 那边分一杯羹，希望 Kubernetes 原生支持 rkt 作为运行时，而且 PR 还真的合进去了。但是，整合出现的很多坑让Kubernetes疲于奔命。</p><p>然后，在Kubernetes 1.5 推出了 CRI 机制，即容器运行时接口（Container Runtime Interface），Kubernetes 告诉大家，你们想做 Runtime 可以啊，实现这个接口就成，成功反客为主。</p><p>不过 ，当时的 Kubernetes 尚未达到如今这般武林盟主的地位，容器运行时当然不能说我跟 Kubernetes 绑死了只提供 CRI 接口，于是就有了 shim（垫片）这个说法，一个 shim 的职责就是作为 Adapter 将各种容器运行时本身的接口适配到 Kubernetes 的 CRI 接口上，如下图中dockershim。</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409221518070.png" alt="Untitled"></p><p>这时，Docker 要搞 Swarm 进军 PaaS 市场，于是做了个架构切分，把容器操作都移动到一个单独的 Daemon 进程 containerd 中去，让 Docker Daemon 专门负责上层的封装编排。可惜 Swarm 在 Kubernetes 面前惨败。</p><p>之后，Docker 公司就把 containerd 项目捐给 CNCF 缩回去安心搞 Docker 企业版了。</p><p>Docker+containerd的runtime 实在是有点复杂了，于是Kubernetes就有了直接拿 containerd 做 oci-runtime 的方案。当然，除了 Kubernetes 之外，containerd 还要接诸如 Swarm 等调度系统，因此它不会去直接实现 CRI，这个适配工作当然就要交给一个 shim 了。</p><p>containerd 1.0 中，对 CRI 的适配通过一个单独的进程 CRI-containerd 来完成；</p><p>containerd 1.1 中做的又更漂亮一点，砍掉了 CRI-containerd 这个进程，直接把适配逻辑作为插件放进了 containerd 主进程中。</p><p>但在 containerd 做这些事情前，社区就已经有了一个更为专注的 cri-runtime：CRI-O，它非常纯粹，就是兼容 CRI 和 OCI，做一个 Kubernetes 专用的运行时：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409221518113.png" alt="Untitled"></p><p>其中 conmon 就对应 containerd-shim，大体意图是一样的。</p><p>CRI-O 和（直接调用）containerd 的方案比起默认的 dockershim 确实简洁很多，但没啥生产环境的验证案例。直到不久前的1.24版本，Kubernetes终于不再原生支持Docker，以后的生产环境想必越来越多的containerd 的方案了。</p><h1 id="_2-部署runtime方式" tabindex="-1">2. 部署runtime方式 <a class="header-anchor" href="#_2-部署runtime方式" aria-label="Permalink to &quot;2. 部署runtime方式&quot;">​</a></h1><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202409221529600.gif" alt=""></p><ul><li>集群创建方式1：Containerd 默认情况下，Kubernetes在创建集群的时候，使用的就是 Containerd方式。</li><li>集群创建方式2：Docker Docker使用的普及率较高，虽然Kubernetes 1.24默认情况下废弃了kubelet对于Docker的支持，但是我们还可以借助于Mirantis维护的cri-dockerd插件方式来实现Kubernetes集群的创建。</li><li>集群创建方式3：CRI-O CRI-O的方式是Kubernetes创建容器最直接的一种方式，在创建集群的时候，需要借助于cri-o插件的方式来实现Kubernetes集群的创建。</li></ul><h2 id="_1-方式1" tabindex="-1">1.方式1 <a class="header-anchor" href="#_1-方式1" aria-label="Permalink to &quot;1.方式1&quot;">​</a></h2><p>看下章</p><h2 id="_2-方式2" tabindex="-1">2.方式2 <a class="header-anchor" href="#_2-方式2" aria-label="Permalink to &quot;2.方式2&quot;">​</a></h2><h3 id="_2-1-部署containerd" tabindex="-1">2.1 部署containerd <a class="header-anchor" href="#_2-1-部署containerd" aria-label="Permalink to &quot;2.1 部署containerd&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#下载</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://github.com/containerd/containerd/releases/download/v1.7.22/cri-containerd-cni-1.7.22-linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#解压</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxvf cri-containerd-cni-1.7.22-linux-amd64.tar.gz -C /</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#下载</span></span>
<span class="line"><span style="color:#24292e;">wget https://github.com/containerd/containerd/releases/download/v1.7.22/cri-containerd-cni-1.7.22-linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#解压</span></span>
<span class="line"><span style="color:#24292e;">tar zxvf cri-containerd-cni-1.7.22-linux-amd64.tar.gz -C /</span></span></code></pre></div><ul><li>配置</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">containerd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tee</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">vim</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config.toml</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#B392F0;">SystemdCgroup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#修改为true</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">再修改/etc/containerd/config.toml中的</span></span>
<span class="line"><span style="color:#E1E4E8;">[plugins.</span><span style="color:#9ECBFF;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># sandbox_image = &quot;k8s.gcr.io/pause:3.6&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">sandbox_image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;registry.aliyuncs.com/google_containers/pause:3.9&quot;</span><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">#这里一定要注意，要根据下载到本地 pause镜像的版本来进行修改，否则初始化会过不去。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">再修改,默认是io.containerd.runc.v2,否则crictl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">无法连接containerd</span></span>
<span class="line"><span style="color:#E1E4E8;">[plugins.</span><span style="color:#9ECBFF;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#E1E4E8;">.containerd.runtimes.runc]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">runtime_type</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;io.containerd.runtime.v1.linux&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">containerd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tee</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/containerd/config.toml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">vim</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config.toml</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#6F42C1;">SystemdCgroup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">#修改为true</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">再修改/etc/containerd/config.toml中的</span></span>
<span class="line"><span style="color:#24292E;">[plugins.</span><span style="color:#032F62;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># sandbox_image = &quot;k8s.gcr.io/pause:3.6&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">sandbox_image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;registry.aliyuncs.com/google_containers/pause:3.9&quot;</span><span style="color:#24292E;">	</span><span style="color:#6A737D;">#这里一定要注意，要根据下载到本地 pause镜像的版本来进行修改，否则初始化会过不去。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">再修改,默认是io.containerd.runc.v2,否则crictl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">无法连接containerd</span></span>
<span class="line"><span style="color:#24292E;">[plugins.</span><span style="color:#032F62;">&quot;io.containerd.grpc.v1.cri&quot;</span><span style="color:#24292E;">.containerd.runtimes.runc]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">runtime_type</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;io.containerd.runtime.v1.linux&quot;</span></span></code></pre></div><ul><li>启动</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 重新加载Unit file</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开机启动,并启动服务</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">containerd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 重新加载Unit file</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#开机启动,并启动服务</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">containerd</span></span></code></pre></div><h3 id="_2-2-部署-docker" tabindex="-1">2.2 部署 Docker <a class="header-anchor" href="#_2-2-部署-docker" aria-label="Permalink to &quot;2.2 部署 Docker&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 二进制包下载地址：https://download.docker.com/linux/static/stable/x86_64/</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://mirrors.ustc.edu.cn/docker-ce/linux/static/stable/x86_64/docker-26.1.4.tgz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 二进制包下载地址：https://download.docker.com/linux/static/stable/x86_64/</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://mirrors.ustc.edu.cn/docker-ce/linux/static/stable/x86_64/docker-26.1.4.tgz</span></span></code></pre></div><h4 id="_1-解压" tabindex="-1">1.解压 <a class="header-anchor" href="#_1-解压" aria-label="Permalink to &quot;1.解压&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">xf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-</span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.tgz</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker/</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/bin/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-</span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.tgz</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker/</span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/bin/</span></span></code></pre></div><h4 id="_2-配置unit文件" tabindex="-1">2.配置unit文件 <a class="header-anchor" href="#_2-配置unit文件" aria-label="Permalink to &quot;2.配置unit文件&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 准备 docker 的 service 文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/systemd/system/docker.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Docker Application Container Engine</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://docs.docker.com</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#9ECBFF;">Requires=docker.socket containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=notify</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecReload=/bin/kill -s HUP </span><span style="color:#E1E4E8;">$MAINPID</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutSec=0</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=2</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">StartLimitBurst=3</span></span>
<span class="line"><span style="color:#9ECBFF;">StartLimitInterval=60s</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">Delegate=yes</span></span>
<span class="line"><span style="color:#9ECBFF;">KillMode=process</span></span>
<span class="line"><span style="color:#9ECBFF;">OOMScoreAdjust=-500</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 准备 docker 的 service 文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/systemd/system/docker.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Docker Application Container Engine</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://docs.docker.com</span></span>
<span class="line"><span style="color:#032F62;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#032F62;">Requires=docker.socket containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=notify</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#032F62;">ExecReload=/bin/kill -s HUP </span><span style="color:#24292E;">$MAINPID</span></span>
<span class="line"><span style="color:#032F62;">TimeoutSec=0</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=2</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">StartLimitBurst=3</span></span>
<span class="line"><span style="color:#032F62;">StartLimitInterval=60s</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">Delegate=yes</span></span>
<span class="line"><span style="color:#032F62;">KillMode=process</span></span>
<span class="line"><span style="color:#032F62;">OOMScoreAdjust=-500</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><blockquote><p>[Unit]</p><p>Description: 描述服务的作用，这里是Docker Application Container Engine，即Docker应用容器引擎。</p><p>Documentation: 提供关于此服务的文档链接，这里是Docker官方文档链接。</p><p>After: 说明该服务在哪些其他服务之后启动，这里是在网络在线、firewalld服务和containerd服务后启动。</p><p>Wants: 说明该服务想要的其他服务，这里是网络在线服务。</p><p>Requires: 说明该服务需要的其他服务，这里是docker.socket和containerd.service。</p><p>[Service]</p><p>Type: 服务类型，这里是notify，表示服务在启动完成时发送通知。</p><p>ExecStart: 命令，启动该服务时会执行的命令，这里是/usr/bin/dockerd -H fd:// --</p><p>containerd=/run/containerd/containerd.sock，即启动dockerd并指定一些参数，其中-H指定</p><p>dockerd的监听地址为fd://，--containerd指定containerd的sock文件位置。</p><p>ExecReload: 重载命令，当接收到HUP信号时执行的命令，这里是/bin/kill -s HUP $MAINPID，即发送HUP信号给主进程ID。</p><p>TimeoutSec: 服务超时时间，这里是0，表示没有超时限制。</p><p>RestartSec: 重启间隔时间，这里是2秒，表示重启失败后等待2秒再重启。</p><p>Restart: 重启策略，这里是always，表示总是重启。</p><p>StartLimitBurst: 启动限制次数，这里是3，表示在启动失败后最多重试3次。</p><p>StartLimitInterval: 启动限制时间间隔，这里是60秒，表示两次启动之间最少间隔60秒。</p><p>LimitNOFILE: 文件描述符限制，这里是infinity，表示没有限制。</p><p>LimitNPROC: 进程数限制，这里是infinity，表示没有限制。</p><p>LimitCORE: 核心转储限制，这里是infinity，表示没有限制。</p><p>TasksMax: 最大任务数，这里是infinity，表示没有限制。</p><p>Delegate: 修改权限，这里是yes，表示启用权限修改。</p><p>KillMode: 杀死模式，这里是process，表示杀死整个进程组。</p><p>OOMScoreAdjust: 用于调整进程在系统内存紧张时的优先级调整，这里是-500，表示将OOM分数降低500。 [Install]</p><p>WantedBy: 安装目标，这里是multi-user.target，表示在多用户模式下安装。</p><p>在WantedBy参数中，我们可以使用以下参数：</p><p>multi-user.target：指定该服务应该在多用户模式下启动。</p><p>graphical.target：指定该服务应该在图形化界面模式下启动。</p><p>default.target：指定该服务应该在系统的默认目标（runlevel）下启动。</p><p>rescue.target：指定该服务应该在系统救援模式下启动。</p><p>poweroff.target：指定该服务应该在关机时启动。</p><p>reboot.target：指定该服务应该在重启时启动。</p><p>halt.target：指定该服务应该在停止时启动。</p><p>shutdown.target：指定该服务应该在系统关闭时启动。</p><p>这些参数可以根据需要选择一个或多个，以告知系统在何时启动该服务。</p></blockquote><h4 id="_3-部署docker-socket-文件" tabindex="-1">3. 部署docker socket 文件 <a class="header-anchor" href="#_3-部署docker-socket-文件" aria-label="Permalink to &quot;3. 部署docker socket 文件&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#准备 docker 的 socket 文件</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/systemd/system/docker.socket</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Docker Socket for the API</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Socket]</span></span>
<span class="line"><span style="color:#9ECBFF;">ListenStream=/var/run/docker.sock</span></span>
<span class="line"><span style="color:#9ECBFF;">SocketMode=0660</span></span>
<span class="line"><span style="color:#9ECBFF;">SocketUser=root</span></span>
<span class="line"><span style="color:#9ECBFF;">SocketGroup=docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=sockets.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#准备 docker 的 socket 文件</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/systemd/system/docker.socket</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Docker Socket for the API</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Socket]</span></span>
<span class="line"><span style="color:#032F62;">ListenStream=/var/run/docker.sock</span></span>
<span class="line"><span style="color:#032F62;">SocketMode=0660</span></span>
<span class="line"><span style="color:#032F62;">SocketUser=root</span></span>
<span class="line"><span style="color:#032F62;">SocketGroup=docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=sockets.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">这是一个用于Docker API的socket配置文件，包含了以下参数：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Description：描述了该socket的作用，即为Docker API的socket。</span></span>
<span class="line"><span style="color:#e1e4e8;">[Socket]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ListenStream：指定了 socket 的监听地址，该 socket 会监听在 /var/run/docker.sock 上，即 Docker 守护程序使用的默认 sock 文件。</span></span>
<span class="line"><span style="color:#e1e4e8;">SocketMode：指定了socket文件的权限模式，此处为0660，即用户和用户组有读写权限，其他用户无权限。</span></span>
<span class="line"><span style="color:#e1e4e8;">SocketUser：指定了socket文件的所有者，此处为root用户。</span></span>
<span class="line"><span style="color:#e1e4e8;">SocketGroup：指定了socket文件的所属用户组，此处为docker用户组。</span></span>
<span class="line"><span style="color:#e1e4e8;">[Install]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">WantedBy：指定了该socket被启用时的目标，此处为sockets.target，表示当sockets.target启动时启用该socket。</span></span>
<span class="line"><span style="color:#e1e4e8;">该配置文件的作用是为 Docker 提供 API 访问的通道，它监听在 /var/run/docker.sock 上，具有 root 用户权限，但只接受 docker 用户组的成员的连接，并且其他用户无法访问。这样，只有 docker 用户组的成员可以通过该 socket 与 Docker 守护进程进行通信。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">这是一个用于Docker API的socket配置文件，包含了以下参数：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[Unit]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Description：描述了该socket的作用，即为Docker API的socket。</span></span>
<span class="line"><span style="color:#24292e;">[Socket]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ListenStream：指定了 socket 的监听地址，该 socket 会监听在 /var/run/docker.sock 上，即 Docker 守护程序使用的默认 sock 文件。</span></span>
<span class="line"><span style="color:#24292e;">SocketMode：指定了socket文件的权限模式，此处为0660，即用户和用户组有读写权限，其他用户无权限。</span></span>
<span class="line"><span style="color:#24292e;">SocketUser：指定了socket文件的所有者，此处为root用户。</span></span>
<span class="line"><span style="color:#24292e;">SocketGroup：指定了socket文件的所属用户组，此处为docker用户组。</span></span>
<span class="line"><span style="color:#24292e;">[Install]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">WantedBy：指定了该socket被启用时的目标，此处为sockets.target，表示当sockets.target启动时启用该socket。</span></span>
<span class="line"><span style="color:#24292e;">该配置文件的作用是为 Docker 提供 API 访问的通道，它监听在 /var/run/docker.sock 上，具有 root 用户权限，但只接受 docker 用户组的成员的连接，并且其他用户无法访问。这样，只有 docker 用户组的成员可以通过该 socket 与 Docker 守护进程进行通信。</span></span></code></pre></div></blockquote><h4 id="_4-配置docker加速" tabindex="-1">4.配置docker加速 <a class="header-anchor" href="#_4-配置docker加速" aria-label="Permalink to &quot;4.配置docker加速&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 配置加速器</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir /etc/docker/ -pv</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cat &gt;/etc/docker/daemon.json &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;max-concurrent-downloads&quot;: 10,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;log-driver&quot;: &quot;json-file&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;log-level&quot;: &quot;warn&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;log-opts&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;max-size&quot;: &quot;10m&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;max-file&quot;: &quot;3&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;data-root&quot;: &quot;/var/lib/docker&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;storage-driver&quot;: &quot;overlay2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 配置加速器</span></span>
<span class="line"><span style="color:#24292e;">mkdir /etc/docker/ -pv</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cat &gt;/etc/docker/daemon.json &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;max-concurrent-downloads&quot;: 10,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;log-driver&quot;: &quot;json-file&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;log-level&quot;: &quot;warn&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;log-opts&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;max-size&quot;: &quot;10m&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;max-file&quot;: &quot;3&quot;</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">  &quot;data-root&quot;: &quot;/var/lib/docker&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;storage-driver&quot;: &quot;overlay2&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div><h5 id="_5-启动" tabindex="-1">5.启动 <a class="header-anchor" href="#_5-启动" aria-label="Permalink to &quot;5.启动&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 启动 Docker</span></span>
<span class="line"><span style="color:#e1e4e8;">groupadd docker</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable --now docker.socket</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable --now docker.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl status docker.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker info</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 启动 Docker</span></span>
<span class="line"><span style="color:#24292e;">groupadd docker</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl enable --now docker.socket</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl enable --now docker.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">systemctl status docker.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker info</span></span></code></pre></div><h4 id="_5-部署-cri-docker" tabindex="-1">5.部署 cri-docker <a class="header-anchor" href="#_5-部署-cri-docker" aria-label="Permalink to &quot;5.部署 cri-docker&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 解压 cri-docker</span></span>
<span class="line"><span style="color:#6A737D;"># https://github.com/Mirantis/cri-dockerd/releases/</span></span>
<span class="line"><span style="color:#B392F0;">wget</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.15/cri-dockerd-0.3.15.amd64.tgz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">tar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">xvf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cri-dockerd-</span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">.amd64.tgz</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-r</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cri-dockerd</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/usr/bin/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+x</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/bin/cri-dockerd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 解压 cri-docker</span></span>
<span class="line"><span style="color:#6A737D;"># https://github.com/Mirantis/cri-dockerd/releases/</span></span>
<span class="line"><span style="color:#6F42C1;">wget</span><span style="color:#24292E;">  </span><span style="color:#032F62;">https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.15/cri-dockerd-0.3.15.amd64.tgz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">tar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xvf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cri-dockerd-</span><span style="color:#005CC5;">*</span><span style="color:#032F62;">.amd64.tgz</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-r</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cri-dockerd</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/usr/bin/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/bin/cri-dockerd</span></span></code></pre></div><h5 id="_1-配置unit文件" tabindex="-1">1.配置unit文件 <a class="header-anchor" href="#_1-配置unit文件" aria-label="Permalink to &quot;1.配置unit文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 写入启动  cri-docker 配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/cri-docker.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=CRI Interface for Docker Application Container Engine</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://docs.mirantis.com</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network-online.target firewalld.service docker.service</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#9ECBFF;">Requires=cri-docker.socket</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">Type=notify</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/bin/cri-dockerd --network-plugin=cni --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecReload=/bin/kill -s HUP </span><span style="color:#E1E4E8;">$MAINPID</span></span>
<span class="line"><span style="color:#9ECBFF;">TimeoutSec=0</span></span>
<span class="line"><span style="color:#9ECBFF;">RestartSec=2</span></span>
<span class="line"><span style="color:#9ECBFF;">Restart=always</span></span>
<span class="line"><span style="color:#9ECBFF;">StartLimitBurst=3</span></span>
<span class="line"><span style="color:#9ECBFF;">StartLimitInterval=60s</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNOFILE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#9ECBFF;">Delegate=yes</span></span>
<span class="line"><span style="color:#9ECBFF;">KillMode=process</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 写入启动  cri-docker 配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">  </span><span style="color:#032F62;">/usr/lib/systemd/system/cri-docker.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=CRI Interface for Docker Application Container Engine</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://docs.mirantis.com</span></span>
<span class="line"><span style="color:#032F62;">After=network-online.target firewalld.service docker.service</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#032F62;">Requires=cri-docker.socket</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">Type=notify</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/bin/cri-dockerd --network-plugin=cni --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9</span></span>
<span class="line"><span style="color:#032F62;">ExecReload=/bin/kill -s HUP </span><span style="color:#24292E;">$MAINPID</span></span>
<span class="line"><span style="color:#032F62;">TimeoutSec=0</span></span>
<span class="line"><span style="color:#032F62;">RestartSec=2</span></span>
<span class="line"><span style="color:#032F62;">Restart=always</span></span>
<span class="line"><span style="color:#032F62;">StartLimitBurst=3</span></span>
<span class="line"><span style="color:#032F62;">StartLimitInterval=60s</span></span>
<span class="line"><span style="color:#032F62;">LimitNOFILE=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitNPROC=infinity</span></span>
<span class="line"><span style="color:#032F62;">LimitCORE=infinity</span></span>
<span class="line"><span style="color:#032F62;">TasksMax=infinity</span></span>
<span class="line"><span style="color:#032F62;">Delegate=yes</span></span>
<span class="line"><span style="color:#032F62;">KillMode=process</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><h5 id="_2-配置socket文件" tabindex="-1">2.配置socket文件 <a class="header-anchor" href="#_2-配置socket文件" aria-label="Permalink to &quot;2.配置socket文件&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 写入 cri-docker 的 socket 配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/cri-docker.socket</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=CRI Docker Socket for the API</span></span>
<span class="line"><span style="color:#9ECBFF;">PartOf=cri-docker.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Socket]</span></span>
<span class="line"><span style="color:#9ECBFF;">ListenStream=%t/cri-dockerd.sock</span></span>
<span class="line"><span style="color:#9ECBFF;">SocketMode=0660</span></span>
<span class="line"><span style="color:#9ECBFF;">SocketUser=root</span></span>
<span class="line"><span style="color:#9ECBFF;">SocketGroup=docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=sockets.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 写入 cri-docker 的 socket 配置文件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/systemd/system/cri-docker.socket</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#032F62;">EOF</span></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=CRI Docker Socket for the API</span></span>
<span class="line"><span style="color:#032F62;">PartOf=cri-docker.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Socket]</span></span>
<span class="line"><span style="color:#032F62;">ListenStream=%t/cri-dockerd.sock</span></span>
<span class="line"><span style="color:#032F62;">SocketMode=0660</span></span>
<span class="line"><span style="color:#032F62;">SocketUser=root</span></span>
<span class="line"><span style="color:#032F62;">SocketGroup=docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=sockets.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><ul><li>配置</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/crictl.yaml</span></span>
<span class="line"><span style="color:#B392F0;">runtime-endpoint:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;unix:///var/run/cri-dockerd.sock&quot;</span></span>
<span class="line"><span style="color:#B392F0;">image-endpoint:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;unix:///var/run/cri-dockerd.sock&quot;</span></span>
<span class="line"><span style="color:#B392F0;">timeout:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#B392F0;">debug:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#B392F0;">pull-image-on-create:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#B392F0;">disable-pull-on-run:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/crictl.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">runtime-endpoint:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;unix:///var/run/cri-dockerd.sock&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">image-endpoint:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;unix:///var/run/cri-dockerd.sock&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">timeout:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#6F42C1;">debug:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#6F42C1;">pull-image-on-create:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#6F42C1;">disable-pull-on-run:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">crictl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">crictl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span></span></code></pre></div><h5 id="_3-启动" tabindex="-1">3.启动 <a class="header-anchor" href="#_3-启动" aria-label="Permalink to &quot;3.启动&quot;">​</a></h5><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 启动 cri-docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">enable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--now</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cri-docker.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">status</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker.service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 启动 cri-docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">daemon-reload</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">enable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--now</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cri-docker.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">status</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker.service</span></span></code></pre></div><h3 id="_2-3-配置kubelet-所有节点" tabindex="-1">2.3 配置kubelet-所有节点 <a class="header-anchor" href="#_2-3-配置kubelet-所有节点" aria-label="Permalink to &quot;2.3 配置kubelet-所有节点&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># kubelet 配置</span></span>
<span class="line"><span style="color:#6A737D;"># 当使用 docker 作为 Runtime</span></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/lib/systemd/system/kubelet.service</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Unit]</span></span>
<span class="line"><span style="color:#9ECBFF;">Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#9ECBFF;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#9ECBFF;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#9ECBFF;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#9ECBFF;">Requires=docker.socket containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Service]</span></span>
<span class="line"><span style="color:#9ECBFF;">ExecStart=/usr/local/bin/kubelet </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --kubeconfig=/etc/kubernetes/kubelet.kubeconfig </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --config=/etc/kubernetes/kubelet-conf.yml </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --container-runtime-endpoint=unix:///run/cri-dockerd.sock  </span><span style="color:#79B8FF;">\\\\</span></span>
<span class="line"><span style="color:#9ECBFF;">    --node-labels=node.kubernetes.io/node= </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">[Install]</span></span>
<span class="line"><span style="color:#9ECBFF;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#9ECBFF;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># kubelet 配置</span></span>
<span class="line"><span style="color:#6A737D;"># 当使用 docker 作为 Runtime</span></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/lib/systemd/system/kubelet.service</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Unit]</span></span>
<span class="line"><span style="color:#032F62;">Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#032F62;">Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#032F62;">After=network-online.target firewalld.service cri-docker.service docker.socket containerd.service</span></span>
<span class="line"><span style="color:#032F62;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#032F62;">Requires=docker.socket containerd.service</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Service]</span></span>
<span class="line"><span style="color:#032F62;">ExecStart=/usr/local/bin/kubelet </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --kubeconfig=/etc/kubernetes/kubelet.kubeconfig </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --config=/etc/kubernetes/kubelet-conf.yml </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --container-runtime-endpoint=unix:///run/cri-dockerd.sock  </span><span style="color:#005CC5;">\\\\</span></span>
<span class="line"><span style="color:#032F62;">    --node-labels=node.kubernetes.io/node= </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">[Install]</span></span>
<span class="line"><span style="color:#032F62;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#032F62;">EOF</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># IPv6示例</span></span>
<span class="line"><span style="color:#e1e4e8;"># 若不使用IPv6那么忽略此项即可</span></span>
<span class="line"><span style="color:#e1e4e8;"># 下方 --node-ip 更换为每个节点的IP即可</span></span>
<span class="line"><span style="color:#e1e4e8;"># cat &gt; /usr/lib/systemd/system/kubelet.service &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"># [Unit]</span></span>
<span class="line"><span style="color:#e1e4e8;"># Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#e1e4e8;"># Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#e1e4e8;"># After=network-online.target firewalld.service cri-docker.service docker.socket # containerd.service</span></span>
<span class="line"><span style="color:#e1e4e8;"># Wants=network-online.target</span></span>
<span class="line"><span style="color:#e1e4e8;"># Requires=docker.socket containerd.service</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># [Service]</span></span>
<span class="line"><span style="color:#e1e4e8;"># ExecStart=/usr/local/bin/kubelet \\\\</span></span>
<span class="line"><span style="color:#e1e4e8;">#     --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig  \\\\</span></span>
<span class="line"><span style="color:#e1e4e8;">#     --kubeconfig=/etc/kubernetes/kubelet.kubeconfig \\\\</span></span>
<span class="line"><span style="color:#e1e4e8;">#     --config=/etc/kubernetes/kubelet-conf.yml \\\\</span></span>
<span class="line"><span style="color:#e1e4e8;">#     --container-runtime-endpoint=unix:///run/cri-dockerd.sock  \\\\</span></span>
<span class="line"><span style="color:#e1e4e8;">#     --node-labels=node.kubernetes.io/node=   \\\\</span></span>
<span class="line"><span style="color:#e1e4e8;">#     --node-ip=192.168.1.31,2408:822a:245:8c01::fab</span></span>
<span class="line"><span style="color:#e1e4e8;"># [Install]</span></span>
<span class="line"><span style="color:#e1e4e8;"># WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#e1e4e8;"># EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># IPv6示例</span></span>
<span class="line"><span style="color:#24292e;"># 若不使用IPv6那么忽略此项即可</span></span>
<span class="line"><span style="color:#24292e;"># 下方 --node-ip 更换为每个节点的IP即可</span></span>
<span class="line"><span style="color:#24292e;"># cat &gt; /usr/lib/systemd/system/kubelet.service &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#24292e;"># [Unit]</span></span>
<span class="line"><span style="color:#24292e;"># Description=Kubernetes Kubelet</span></span>
<span class="line"><span style="color:#24292e;"># Documentation=https://github.com/kubernetes/kubernetes</span></span>
<span class="line"><span style="color:#24292e;"># After=network-online.target firewalld.service cri-docker.service docker.socket # containerd.service</span></span>
<span class="line"><span style="color:#24292e;"># Wants=network-online.target</span></span>
<span class="line"><span style="color:#24292e;"># Requires=docker.socket containerd.service</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># [Service]</span></span>
<span class="line"><span style="color:#24292e;"># ExecStart=/usr/local/bin/kubelet \\\\</span></span>
<span class="line"><span style="color:#24292e;">#     --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.kubeconfig  \\\\</span></span>
<span class="line"><span style="color:#24292e;">#     --kubeconfig=/etc/kubernetes/kubelet.kubeconfig \\\\</span></span>
<span class="line"><span style="color:#24292e;">#     --config=/etc/kubernetes/kubelet-conf.yml \\\\</span></span>
<span class="line"><span style="color:#24292e;">#     --container-runtime-endpoint=unix:///run/cri-dockerd.sock  \\\\</span></span>
<span class="line"><span style="color:#24292e;">#     --node-labels=node.kubernetes.io/node=   \\\\</span></span>
<span class="line"><span style="color:#24292e;">#     --node-ip=192.168.1.31,2408:822a:245:8c01::fab</span></span>
<span class="line"><span style="color:#24292e;"># [Install]</span></span>
<span class="line"><span style="color:#24292e;"># WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#24292e;"># EOF</span></span></code></pre></div>`,57),o=[p];function c(t,r,i,y,d,u){return n(),a("div",null,o)}const E=s(l,[["render",c]]);export{k as __pageData,E as default};
