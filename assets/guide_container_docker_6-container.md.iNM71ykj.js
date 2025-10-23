import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. 容器管理","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/docker/6-container.md","filePath":"guide/container/docker/6-container.md","lastUpdated":1721805479000}'),p={name:"guide/container/docker/6-container.md"},e=l(`<h1 id="_1-容器管理" tabindex="-1">1. 容器管理 <a class="header-anchor" href="#_1-容器管理" aria-label="Permalink to &quot;1. 容器管理&quot;">​</a></h1><h2 id="_1-1-创建容器" tabindex="-1">1.1 创建容器 <a class="header-anchor" href="#_1-1-创建容器" aria-label="Permalink to &quot;1.1 创建容器&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#创建容器（仅创建，不运⾏）</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> [image]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建并运⾏容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-itd</span><span style="color:#E1E4E8;"> [image]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#创建容器（仅创建，不运⾏）</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> [image]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#创建并运⾏容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-itd</span><span style="color:#24292E;"> [image]</span></span></code></pre></div><h2 id="_1-2-启动容器" tabindex="-1">1.2 启动容器 <a class="header-anchor" href="#_1-2-启动容器" aria-label="Permalink to &quot;1.2 启动容器&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#关闭容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#重启容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> [container]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#关闭容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#重启容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> [container]</span></span></code></pre></div><h2 id="_1-3-列出运行容器" tabindex="-1">1.3 列出运行容器 <a class="header-anchor" href="#_1-3-列出运行容器" aria-label="Permalink to &quot;1.3 列出运行容器&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#列出正在运行的容器</span></span>
<span class="line"><span style="color:#e1e4e8;">docker ps | docker container ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#列出所有，不管关闭的还是在运行的</span></span>
<span class="line"><span style="color:#e1e4e8;">docker ps -a | docker container ls -a</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#列出正在运行的容器</span></span>
<span class="line"><span style="color:#24292e;">docker ps | docker container ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#列出所有，不管关闭的还是在运行的</span></span>
<span class="line"><span style="color:#24292e;">docker ps -a | docker container ls -a</span></span></code></pre></div><h2 id="_1-4-容器交互" tabindex="-1">1.4 容器交互 <a class="header-anchor" href="#_1-4-容器交互" aria-label="Permalink to &quot;1.4 容器交互&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-it</span><span style="color:#E1E4E8;"> [container] /bin/bash</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#退出容器，容器也会关闭，如果想退出容器但不想容器停止，则按住Ctrl+P+Q退出</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">attach</span><span style="color:#E1E4E8;"> [container]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-it</span><span style="color:#24292E;"> [container] /bin/bash</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#退出容器，容器也会关闭，如果想退出容器但不想容器停止，则按住Ctrl+P+Q退出</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">attach</span><span style="color:#24292E;"> [container]</span></span></code></pre></div><h2 id="_1-5-查看容器日志" tabindex="-1">1.5 查看容器日志 <a class="header-anchor" href="#_1-5-查看容器日志" aria-label="Permalink to &quot;1.5 查看容器日志&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">logs</span><span style="color:#E1E4E8;"> [container]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">logs</span><span style="color:#24292E;"> [container]</span></span></code></pre></div><h2 id="_1-6-删除容器" tabindex="-1">1.6 删除容器 <a class="header-anchor" href="#_1-6-删除容器" aria-label="Permalink to &quot;1.6 删除容器&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">container</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> [container]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker logs nginx-server -f</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker logs nginx-server -f -t</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看最后10行日志</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker logs nginx-server -f -t --tail 10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">-t</span><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">显示时间</span></span>
<span class="line"><span style="color:#B392F0;">-f</span><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#B392F0;">--tail</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">显示条数</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">批量删除</span><span style="color:#B392F0;">&quot;exit&quot;</span><span style="color:#B392F0;">状态的容器</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">container</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> [container]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker logs nginx-server -f</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker logs nginx-server -f -t</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看最后10行日志</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker logs nginx-server -f -t --tail 10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">-t</span><span style="color:#24292E;">    </span><span style="color:#032F62;">显示时间</span></span>
<span class="line"><span style="color:#6F42C1;">-f</span><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6F42C1;">--tail</span><span style="color:#24292E;"> </span><span style="color:#032F62;">number</span><span style="color:#24292E;"> </span><span style="color:#032F62;">显示条数</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">批量删除</span><span style="color:#6F42C1;">&quot;exit&quot;</span><span style="color:#6F42C1;">状态的容器</span></span></code></pre></div><h2 id="_1-7-查看容器资源" tabindex="-1">1.7 查看容器资源 <a class="header-anchor" href="#_1-7-查看容器资源" aria-label="Permalink to &quot;1.7 查看容器资源&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#显示容器内进程</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">top</span><span style="color:#E1E4E8;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#显示容器资源使⽤情况</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stats</span><span style="color:#E1E4E8;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stats</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--format</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">容器名字</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#显示容器内进程</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">top</span><span style="color:#24292E;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#显示容器资源使⽤情况</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stats</span><span style="color:#24292E;"> [container]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stats</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--format</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">容器名字</span></span></code></pre></div><h2 id="_1-8-复制文件" tabindex="-1">1.8 复制文件 <a class="header-anchor" href="#_1-8-复制文件" aria-label="Permalink to &quot;1.8 复制文件&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#复制本地⽂件到容器内的指定路径</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cp</span><span style="color:#E1E4E8;"> [FILE] [container]:[PATH]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#将宿主机文件复制到容器内</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker cp /etc/issue 5a44:/root/</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker exec 5a44 cat /root/issue</span></span>
<span class="line"><span style="color:#B392F0;">Ubuntu</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20.04</span><span style="color:#9ECBFF;">.4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">LTS</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\n</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\l</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">##将容器内文件复制到宿主机</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker cp -a 5a44:/etc/centos-release </span><span style="color:#79B8FF;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#cat centos-release </span></span>
<span class="line"><span style="color:#B392F0;">CentOS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Linux</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">release</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8.4</span><span style="color:#9ECBFF;">.2105</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#复制本地⽂件到容器内的指定路径</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cp</span><span style="color:#24292E;"> [FILE] [container]:[PATH]</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#将宿主机文件复制到容器内</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker cp /etc/issue 5a44:/root/</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker exec 5a44 cat /root/issue</span></span>
<span class="line"><span style="color:#6F42C1;">Ubuntu</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20.04</span><span style="color:#032F62;">.4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">LTS</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\n</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\l</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">##将容器内文件复制到宿主机</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker cp -a 5a44:/etc/centos-release </span><span style="color:#005CC5;">.</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#cat centos-release </span></span>
<span class="line"><span style="color:#6F42C1;">CentOS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Linux</span><span style="color:#24292E;"> </span><span style="color:#032F62;">release</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8.4</span><span style="color:#032F62;">.2105</span></span></code></pre></div><h1 id="_2-容器运行" tabindex="-1">2. 容器运⾏ <a class="header-anchor" href="#_2-容器运行" aria-label="Permalink to &quot;2. 容器运⾏&quot;">​</a></h1><h2 id="_2-1-help" tabindex="-1">2.1 help <a class="header-anchor" href="#_2-1-help" aria-label="Permalink to &quot;2.1 help&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker  --help</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Commands:</span></span>
<span class="line"><span style="color:#e1e4e8;"> attach     Attach to a running container # 当前 shell 下 attach 连接指定运行镜像</span></span>
<span class="line"><span style="color:#e1e4e8;"> build      Build an image from a Dockerfile # 通过 Dockerfile 定制镜像</span></span>
<span class="line"><span style="color:#e1e4e8;"> commit     Create a new image from a container&#39;s changes # 提交当前容器为新的镜像</span></span>
<span class="line"><span style="color:#e1e4e8;"> cp         Copy files/folders from the containers filesystem to the host path</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 从容器中拷贝指定文件或者目录到宿主机中</span></span>
<span class="line"><span style="color:#e1e4e8;"> create     Create a new container # 创建一个新的容器，同 run，但不启动容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> diff       Inspect changes on a container&#39;s filesystem # 查看 docker 容器变化</span></span>
<span class="line"><span style="color:#e1e4e8;"> events     Get real time events from the server # 从 docker 服务获取容器实时事件</span></span>
<span class="line"><span style="color:#e1e4e8;"> exec       Run a command in an existing container # 在已存在的容器上运行命令</span></span>
<span class="line"><span style="color:#e1e4e8;"> export     Stream the contents of a container as a tar archive </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 导出容器的内容流作为一个 tar 归档文件[对应 import ]</span></span>
<span class="line"><span style="color:#e1e4e8;"> history    Show the history of an image # 展示一个镜像形成历史</span></span>
<span class="line"><span style="color:#e1e4e8;"> images     List images # 列出系统当前镜像</span></span>
<span class="line"><span style="color:#e1e4e8;"> import     Create a new filesystem image from the contents of a tarball </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 从tar包中的内容创建一个新的文件系统映像[对应 export]</span></span>
<span class="line"><span style="color:#e1e4e8;"> info       Display system-wide information # 显示系统相关信息</span></span>
<span class="line"><span style="color:#e1e4e8;"> inspect    Return low-level information on a container # 查看容器详细信息</span></span>
<span class="line"><span style="color:#e1e4e8;"> kill       Kill a running container # kill 指定 docker 容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> load       Load an image from a tar archive # 从一个 tar 包中加载一个镜像[对应 save]</span></span>
<span class="line"><span style="color:#e1e4e8;"> login      Register or Login to the docker registry server </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 注册或者登陆一个 docker 源服务器</span></span>
<span class="line"><span style="color:#e1e4e8;"> logout     Log out from a Docker registry server # 从当前 Docker registry 退出</span></span>
<span class="line"><span style="color:#e1e4e8;"> logs       Fetch the logs of a container # 输出当前容器日志信息</span></span>
<span class="line"><span style="color:#e1e4e8;"> port       Lookup the public-facing port which is NAT-ed to PRIVATE_PORT</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 查看映射端口对应的容器内部源端口</span></span>
<span class="line"><span style="color:#e1e4e8;"> pause      Pause all processes within a container # 暂停容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> ps         List containers # 列出容器列表</span></span>
<span class="line"><span style="color:#e1e4e8;"> pull       Pull an image or a repository from the docker registry server</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 从docker镜像源服务器拉取指定镜像或者库镜像</span></span>
<span class="line"><span style="color:#e1e4e8;"> push       Push an image or a repository to the docker registry server</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 推送指定镜像或者库镜像至docker源服务器</span></span>
<span class="line"><span style="color:#e1e4e8;"> restart    Restart a running container # 重启运行的容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> rm         Remove one or more containers # 移除一个或者多个容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> rmi        Remove one or more images </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]</span></span>
<span class="line"><span style="color:#e1e4e8;"> run        Run a command in a new container</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 创建一个新的容器并运行一个命令</span></span>
<span class="line"><span style="color:#e1e4e8;"> save       Save an image to a tar archive # 保存一个镜像为一个 tar 包[对应 load]</span></span>
<span class="line"><span style="color:#e1e4e8;"> search     Search for an image on the Docker Hub # 在 docker hub 中搜索镜像</span></span>
<span class="line"><span style="color:#e1e4e8;"> start      Start a stopped containers # 启动容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> stop       Stop a running containers # 停止容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> tag        Tag an image into a repository # 给源中镜像打标签</span></span>
<span class="line"><span style="color:#e1e4e8;"> top        Lookup the running processes of a container # 查看容器中运行的进程信息</span></span>
<span class="line"><span style="color:#e1e4e8;"> unpause Unpause a paused container # 取消暂停容器</span></span>
<span class="line"><span style="color:#e1e4e8;"> version    Show the docker version information # 查看 docker 版本号</span></span>
<span class="line"><span style="color:#e1e4e8;"> wait       Block until a container stops, then print its exit code </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> # 截取容器停止时的退出状态值</span></span>
<span class="line"><span style="color:#e1e4e8;">Run &#39;docker COMMAND --help&#39; for more information on a command.??</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> run   运行一个新的container</span></span>
<span class="line"><span style="color:#e1e4e8;">      # Usage:docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</span></span>
<span class="line"><span style="color:#e1e4e8;">      -a,--attack</span></span>
<span class="line"><span style="color:#e1e4e8;">      -i，--interactive=false   以交互模式运行容器，通常和-t搭配</span></span>
<span class="line"><span style="color:#e1e4e8;">      -t,--tty=false   分配一个伪输入终端</span></span>
<span class="line"><span style="color:#e1e4e8;">          -d  后台运行</span></span>
<span class="line"><span style="color:#e1e4e8;">      -P  允许外部访问容器所有开启的端口</span></span>
<span class="line"><span style="color:#e1e4e8;">      -p  端口映射  -p 80:80</span></span>
<span class="line"><span style="color:#e1e4e8;">      --name  指定启动后容器的名字</span></span>
<span class="line"><span style="color:#e1e4e8;">        # docker run -i -t centos</span></span>
<span class="line"><span style="color:#e1e4e8;">        # docker run -i -t -d centos /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">        # docker run -i -t -d --name My_Container centos /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">        # docker run -i -t -d -p 80:80 --name My_Container centos /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">      -v,--volume=[] 创建数据卷</span></span>
<span class="line"><span style="color:#e1e4e8;">         /mnt 在容器中创建一个数据卷</span></span>
<span class="line"><span style="color:#e1e4e8;">         /webapp:/src/webapp     目录挂载。将本地的webapp目录挂载到容器的/src/webapp。容器和宿主机的挂载目录都会同时变化</span></span>
<span class="line"><span style="color:#e1e4e8;">         /test.txt:/tmp/text.txt 文件挂载。将本地的/test.txt文件挂载到容器的/tmp/text.txt(注意，只能修改容器挂载内的文件，否则不同步)</span></span>
<span class="line"><span style="color:#e1e4e8;">       # docker run -ti -v /da --name=dbdata centos 创建一个容器dbdata,并创建一个数据卷挂载容器dbdata的/da目录</span></span>
<span class="line"><span style="color:#e1e4e8;">    --volume-from 共享挂载数据卷</span></span>
<span class="line"><span style="color:#e1e4e8;">      # # docker run -ti -v /mnt --name db centos    创建一个数据卷容器db,并创建一个数据卷挂载到容器db的/mnt目录下</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker run -ti --volume-from=db --name db1 centos # db1容器挂载db 容器中的数据卷</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker run -ti --volume-from=db --name db2 centos # db2容器挂载db 容器中的数据卷</span></span>
<span class="line"><span style="color:#e1e4e8;">        此时三个容器db,db1,db2都可以分享目录/mnt</span></span>
<span class="line"><span style="color:#e1e4e8;">    --link  连接其他容器</span></span>
<span class="line"><span style="color:#e1e4e8;">      --link NAME:Alias  Name要建立连接的容器名，Alias连接的容器的别名</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker run -ti -d -P --name web --link lamp:lamp centos6.4 /bin/bash 新建容器web和已经运行的容器lamp连接 </span></span>
<span class="line"><span style="color:#e1e4e8;">    ps 显示容器的列表</span></span>
<span class="line"><span style="color:#e1e4e8;">      -a  显示所有信息 </span></span>
<span class="line"><span style="color:#e1e4e8;">      -q  只显示ID</span></span>
<span class="line"><span style="color:#e1e4e8;">          # docker inspect 5d20c5528521  显示容器的详细信息</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker ps -a -q ID</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker inspect -f &quot;{{ .State.Pid }}&quot; 5d20c5528521  显示运行容器的PID</span></span>
<span class="line"><span style="color:#e1e4e8;">    stop|start|restart 停止|启动|重启容器</span></span>
<span class="line"><span style="color:#e1e4e8;">    exec 进入容器(推荐使用)</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker exec [OPTIONS] CONTAINER COMMAND [ARG...]</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker exec -t -i 216c623071b3 /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">    attack CONTAINER_ID  进入容器</span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker attack 216c623071b3</span></span>
<span class="line"><span style="color:#e1e4e8;">      使用 attach 命令有时候并不方便。当多个窗口同时 attach 到同一个容器的时候，所有窗口都会同步显示。当某个窗口因命令阻塞时,其他窗口也无法执行操作了</span></span>
<span class="line"><span style="color:#e1e4e8;">    nsenter</span></span>
<span class="line"><span style="color:#e1e4e8;">      # yum install util-linux </span></span>
<span class="line"><span style="color:#e1e4e8;">      # PID=$(docker inspect -f &quot;{{ .State.Pid }}&quot; 5d20c5528521)</span></span>
<span class="line"><span style="color:#e1e4e8;">      # nsenter --target $PID --mount --uts --ipc --net --pid</span></span>
<span class="line"><span style="color:#e1e4e8;">      # nsenter --target 10981 --mount --uts --ipc --net --pid</span></span>
<span class="line"><span style="color:#e1e4e8;">           -t, --target &lt;pid&gt;     要获取名字空间的目标进程</span></span>
<span class="line"><span style="color:#e1e4e8;">       -m, --mount[=&lt;file&gt;]   enter mount namespace</span></span>
<span class="line"><span style="color:#e1e4e8;">       -u, --uts[=&lt;file&gt;]     enter UTS namespace (hostname etc)</span></span>
<span class="line"><span style="color:#e1e4e8;">       -i, --ipc[=&lt;file&gt;]     enter System V IPC namespace</span></span>
<span class="line"><span style="color:#e1e4e8;">       -n, --net[=&lt;file&gt;]     enter network namespace</span></span>
<span class="line"><span style="color:#e1e4e8;">       -p, --pid[=&lt;file&gt;]     enter pid namespace</span></span>
<span class="line"><span style="color:#e1e4e8;">    rm   删除一个容器</span></span>
<span class="line"><span style="color:#e1e4e8;">      -f, --force=true  强制删除</span></span>
<span class="line"><span style="color:#e1e4e8;">      -l, --link=false  删除容器的连接，但保留容器</span></span>
<span class="line"><span style="color:#e1e4e8;">      -v, --volumes=false  删除容器挂载的数据卷</span></span>
<span class="line"><span style="color:#e1e4e8;">    export 导出容器,导出一个已经创建的容器到一个文件，不管此时这个容器是否处于运行状态</span></span>
<span class="line"><span style="color:#e1e4e8;">      -o, --output=&quot;&quot; </span></span>
<span class="line"><span style="color:#e1e4e8;">      # docker export 929bf12bc6ea &gt; centos_6.4_php.tar</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">docker  --help</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Commands:</span></span>
<span class="line"><span style="color:#24292e;"> attach     Attach to a running container # 当前 shell 下 attach 连接指定运行镜像</span></span>
<span class="line"><span style="color:#24292e;"> build      Build an image from a Dockerfile # 通过 Dockerfile 定制镜像</span></span>
<span class="line"><span style="color:#24292e;"> commit     Create a new image from a container&#39;s changes # 提交当前容器为新的镜像</span></span>
<span class="line"><span style="color:#24292e;"> cp         Copy files/folders from the containers filesystem to the host path</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 从容器中拷贝指定文件或者目录到宿主机中</span></span>
<span class="line"><span style="color:#24292e;"> create     Create a new container # 创建一个新的容器，同 run，但不启动容器</span></span>
<span class="line"><span style="color:#24292e;"> diff       Inspect changes on a container&#39;s filesystem # 查看 docker 容器变化</span></span>
<span class="line"><span style="color:#24292e;"> events     Get real time events from the server # 从 docker 服务获取容器实时事件</span></span>
<span class="line"><span style="color:#24292e;"> exec       Run a command in an existing container # 在已存在的容器上运行命令</span></span>
<span class="line"><span style="color:#24292e;"> export     Stream the contents of a container as a tar archive </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 导出容器的内容流作为一个 tar 归档文件[对应 import ]</span></span>
<span class="line"><span style="color:#24292e;"> history    Show the history of an image # 展示一个镜像形成历史</span></span>
<span class="line"><span style="color:#24292e;"> images     List images # 列出系统当前镜像</span></span>
<span class="line"><span style="color:#24292e;"> import     Create a new filesystem image from the contents of a tarball </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 从tar包中的内容创建一个新的文件系统映像[对应 export]</span></span>
<span class="line"><span style="color:#24292e;"> info       Display system-wide information # 显示系统相关信息</span></span>
<span class="line"><span style="color:#24292e;"> inspect    Return low-level information on a container # 查看容器详细信息</span></span>
<span class="line"><span style="color:#24292e;"> kill       Kill a running container # kill 指定 docker 容器</span></span>
<span class="line"><span style="color:#24292e;"> load       Load an image from a tar archive # 从一个 tar 包中加载一个镜像[对应 save]</span></span>
<span class="line"><span style="color:#24292e;"> login      Register or Login to the docker registry server </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 注册或者登陆一个 docker 源服务器</span></span>
<span class="line"><span style="color:#24292e;"> logout     Log out from a Docker registry server # 从当前 Docker registry 退出</span></span>
<span class="line"><span style="color:#24292e;"> logs       Fetch the logs of a container # 输出当前容器日志信息</span></span>
<span class="line"><span style="color:#24292e;"> port       Lookup the public-facing port which is NAT-ed to PRIVATE_PORT</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 查看映射端口对应的容器内部源端口</span></span>
<span class="line"><span style="color:#24292e;"> pause      Pause all processes within a container # 暂停容器</span></span>
<span class="line"><span style="color:#24292e;"> ps         List containers # 列出容器列表</span></span>
<span class="line"><span style="color:#24292e;"> pull       Pull an image or a repository from the docker registry server</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 从docker镜像源服务器拉取指定镜像或者库镜像</span></span>
<span class="line"><span style="color:#24292e;"> push       Push an image or a repository to the docker registry server</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 推送指定镜像或者库镜像至docker源服务器</span></span>
<span class="line"><span style="color:#24292e;"> restart    Restart a running container # 重启运行的容器</span></span>
<span class="line"><span style="color:#24292e;"> rm         Remove one or more containers # 移除一个或者多个容器</span></span>
<span class="line"><span style="color:#24292e;"> rmi        Remove one or more images </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]</span></span>
<span class="line"><span style="color:#24292e;"> run        Run a command in a new container</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 创建一个新的容器并运行一个命令</span></span>
<span class="line"><span style="color:#24292e;"> save       Save an image to a tar archive # 保存一个镜像为一个 tar 包[对应 load]</span></span>
<span class="line"><span style="color:#24292e;"> search     Search for an image on the Docker Hub # 在 docker hub 中搜索镜像</span></span>
<span class="line"><span style="color:#24292e;"> start      Start a stopped containers # 启动容器</span></span>
<span class="line"><span style="color:#24292e;"> stop       Stop a running containers # 停止容器</span></span>
<span class="line"><span style="color:#24292e;"> tag        Tag an image into a repository # 给源中镜像打标签</span></span>
<span class="line"><span style="color:#24292e;"> top        Lookup the running processes of a container # 查看容器中运行的进程信息</span></span>
<span class="line"><span style="color:#24292e;"> unpause Unpause a paused container # 取消暂停容器</span></span>
<span class="line"><span style="color:#24292e;"> version    Show the docker version information # 查看 docker 版本号</span></span>
<span class="line"><span style="color:#24292e;"> wait       Block until a container stops, then print its exit code </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> # 截取容器停止时的退出状态值</span></span>
<span class="line"><span style="color:#24292e;">Run &#39;docker COMMAND --help&#39; for more information on a command.??</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> run   运行一个新的container</span></span>
<span class="line"><span style="color:#24292e;">      # Usage:docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</span></span>
<span class="line"><span style="color:#24292e;">      -a,--attack</span></span>
<span class="line"><span style="color:#24292e;">      -i，--interactive=false   以交互模式运行容器，通常和-t搭配</span></span>
<span class="line"><span style="color:#24292e;">      -t,--tty=false   分配一个伪输入终端</span></span>
<span class="line"><span style="color:#24292e;">          -d  后台运行</span></span>
<span class="line"><span style="color:#24292e;">      -P  允许外部访问容器所有开启的端口</span></span>
<span class="line"><span style="color:#24292e;">      -p  端口映射  -p 80:80</span></span>
<span class="line"><span style="color:#24292e;">      --name  指定启动后容器的名字</span></span>
<span class="line"><span style="color:#24292e;">        # docker run -i -t centos</span></span>
<span class="line"><span style="color:#24292e;">        # docker run -i -t -d centos /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">        # docker run -i -t -d --name My_Container centos /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">        # docker run -i -t -d -p 80:80 --name My_Container centos /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">      -v,--volume=[] 创建数据卷</span></span>
<span class="line"><span style="color:#24292e;">         /mnt 在容器中创建一个数据卷</span></span>
<span class="line"><span style="color:#24292e;">         /webapp:/src/webapp     目录挂载。将本地的webapp目录挂载到容器的/src/webapp。容器和宿主机的挂载目录都会同时变化</span></span>
<span class="line"><span style="color:#24292e;">         /test.txt:/tmp/text.txt 文件挂载。将本地的/test.txt文件挂载到容器的/tmp/text.txt(注意，只能修改容器挂载内的文件，否则不同步)</span></span>
<span class="line"><span style="color:#24292e;">       # docker run -ti -v /da --name=dbdata centos 创建一个容器dbdata,并创建一个数据卷挂载容器dbdata的/da目录</span></span>
<span class="line"><span style="color:#24292e;">    --volume-from 共享挂载数据卷</span></span>
<span class="line"><span style="color:#24292e;">      # # docker run -ti -v /mnt --name db centos    创建一个数据卷容器db,并创建一个数据卷挂载到容器db的/mnt目录下</span></span>
<span class="line"><span style="color:#24292e;">      # docker run -ti --volume-from=db --name db1 centos # db1容器挂载db 容器中的数据卷</span></span>
<span class="line"><span style="color:#24292e;">      # docker run -ti --volume-from=db --name db2 centos # db2容器挂载db 容器中的数据卷</span></span>
<span class="line"><span style="color:#24292e;">        此时三个容器db,db1,db2都可以分享目录/mnt</span></span>
<span class="line"><span style="color:#24292e;">    --link  连接其他容器</span></span>
<span class="line"><span style="color:#24292e;">      --link NAME:Alias  Name要建立连接的容器名，Alias连接的容器的别名</span></span>
<span class="line"><span style="color:#24292e;">      # docker run -ti -d -P --name web --link lamp:lamp centos6.4 /bin/bash 新建容器web和已经运行的容器lamp连接 </span></span>
<span class="line"><span style="color:#24292e;">    ps 显示容器的列表</span></span>
<span class="line"><span style="color:#24292e;">      -a  显示所有信息 </span></span>
<span class="line"><span style="color:#24292e;">      -q  只显示ID</span></span>
<span class="line"><span style="color:#24292e;">          # docker inspect 5d20c5528521  显示容器的详细信息</span></span>
<span class="line"><span style="color:#24292e;">      # docker ps -a -q ID</span></span>
<span class="line"><span style="color:#24292e;">      # docker inspect -f &quot;{{ .State.Pid }}&quot; 5d20c5528521  显示运行容器的PID</span></span>
<span class="line"><span style="color:#24292e;">    stop|start|restart 停止|启动|重启容器</span></span>
<span class="line"><span style="color:#24292e;">    exec 进入容器(推荐使用)</span></span>
<span class="line"><span style="color:#24292e;">      # docker exec [OPTIONS] CONTAINER COMMAND [ARG...]</span></span>
<span class="line"><span style="color:#24292e;">      # docker exec -t -i 216c623071b3 /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">    attack CONTAINER_ID  进入容器</span></span>
<span class="line"><span style="color:#24292e;">      # docker attack 216c623071b3</span></span>
<span class="line"><span style="color:#24292e;">      使用 attach 命令有时候并不方便。当多个窗口同时 attach 到同一个容器的时候，所有窗口都会同步显示。当某个窗口因命令阻塞时,其他窗口也无法执行操作了</span></span>
<span class="line"><span style="color:#24292e;">    nsenter</span></span>
<span class="line"><span style="color:#24292e;">      # yum install util-linux </span></span>
<span class="line"><span style="color:#24292e;">      # PID=$(docker inspect -f &quot;{{ .State.Pid }}&quot; 5d20c5528521)</span></span>
<span class="line"><span style="color:#24292e;">      # nsenter --target $PID --mount --uts --ipc --net --pid</span></span>
<span class="line"><span style="color:#24292e;">      # nsenter --target 10981 --mount --uts --ipc --net --pid</span></span>
<span class="line"><span style="color:#24292e;">           -t, --target &lt;pid&gt;     要获取名字空间的目标进程</span></span>
<span class="line"><span style="color:#24292e;">       -m, --mount[=&lt;file&gt;]   enter mount namespace</span></span>
<span class="line"><span style="color:#24292e;">       -u, --uts[=&lt;file&gt;]     enter UTS namespace (hostname etc)</span></span>
<span class="line"><span style="color:#24292e;">       -i, --ipc[=&lt;file&gt;]     enter System V IPC namespace</span></span>
<span class="line"><span style="color:#24292e;">       -n, --net[=&lt;file&gt;]     enter network namespace</span></span>
<span class="line"><span style="color:#24292e;">       -p, --pid[=&lt;file&gt;]     enter pid namespace</span></span>
<span class="line"><span style="color:#24292e;">    rm   删除一个容器</span></span>
<span class="line"><span style="color:#24292e;">      -f, --force=true  强制删除</span></span>
<span class="line"><span style="color:#24292e;">      -l, --link=false  删除容器的连接，但保留容器</span></span>
<span class="line"><span style="color:#24292e;">      -v, --volumes=false  删除容器挂载的数据卷</span></span>
<span class="line"><span style="color:#24292e;">    export 导出容器,导出一个已经创建的容器到一个文件，不管此时这个容器是否处于运行状态</span></span>
<span class="line"><span style="color:#24292e;">      -o, --output=&quot;&quot; </span></span>
<span class="line"><span style="color:#24292e;">      # docker export 929bf12bc6ea &gt; centos_6.4_php.tar</span></span></code></pre></div><h3 id="_1-2-1-run" tabindex="-1">1.2.1 run <a class="header-anchor" href="#_1-2-1-run" aria-label="Permalink to &quot;1.2.1 run&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s1 ~]#  docker run hello-world</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s1 ~]#  docker run hello-world</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker run</span></span>
<span class="line"><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">、先检测本地是否有镜像</span></span>
<span class="line"><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">、本地没有该镜像，则会向镜像仓库拉取这个镜像</span></span>
<span class="line"><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">、先create、再start把该镜像的容器运行起来</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">解析：</span></span>
<span class="line"><span style="color:#E1E4E8;">docker </span><span style="color:#B392F0;">client客户端连接到了服务端</span><span style="color:#E1E4E8;">(服务端是以一个守护进程的形式跑在操作系统里面的)典型的C</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">S架构</span></span>
<span class="line"><span style="color:#E1E4E8;">由docker服务端的守护进程从docker hub 上下载了镜像</span></span>
<span class="line"><span style="color:#E1E4E8;">服务端创建了一个新的容器，然后从拉去的这个镜像启动了一个容器，容器执行了脚本</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">可执行程序让我们可以查看</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">使用</span></span>
<span class="line"><span style="color:#E1E4E8;">docker服务端把这些信息流（传递）返回到客户端并展示出来，(展示在终端上)</span></span>
<span class="line"><span style="color:#E1E4E8;">docker client可以是多种形式，比如</span><span style="color:#9ECBFF;">&quot;docker&quot;</span><span style="color:#E1E4E8;">命令工具所在的终端</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker run</span></span>
<span class="line"><span style="color:#005CC5;">1</span><span style="color:#24292E;">、先检测本地是否有镜像</span></span>
<span class="line"><span style="color:#005CC5;">2</span><span style="color:#24292E;">、本地没有该镜像，则会向镜像仓库拉取这个镜像</span></span>
<span class="line"><span style="color:#005CC5;">3</span><span style="color:#24292E;">、先create、再start把该镜像的容器运行起来</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">解析：</span></span>
<span class="line"><span style="color:#24292E;">docker </span><span style="color:#6F42C1;">client客户端连接到了服务端</span><span style="color:#24292E;">(服务端是以一个守护进程的形式跑在操作系统里面的)典型的C</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">S架构</span></span>
<span class="line"><span style="color:#24292E;">由docker服务端的守护进程从docker hub 上下载了镜像</span></span>
<span class="line"><span style="color:#24292E;">服务端创建了一个新的容器，然后从拉去的这个镜像启动了一个容器，容器执行了脚本</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">可执行程序让我们可以查看</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">使用</span></span>
<span class="line"><span style="color:#24292E;">docker服务端把这些信息流（传递）返回到客户端并展示出来，(展示在终端上)</span></span>
<span class="line"><span style="color:#24292E;">docker client可以是多种形式，比如</span><span style="color:#032F62;">&quot;docker&quot;</span><span style="color:#24292E;">命令工具所在的终端</span></span></code></pre></div><h3 id="_1-2-2-tag" tabindex="-1">1.2.2 tag <a class="header-anchor" href="#_1-2-2-tag" aria-label="Permalink to &quot;1.2.2 tag&quot;">​</a></h3><p>官方文档，<a href="https://docs.docker.com/engine/reference/commandline/tag/" target="_blank" rel="noreferrer">https://docs.docker.com/engine/reference/commandline/tag/</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#TARGET_IMAGE[:TAG]格式一般形式</span></span>
<span class="line"><span style="color:#B392F0;">仓库主机FQDN或IP[:端口]/项目名(或用户名</span><span style="color:#E1E4E8;">)/image名字:版本</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker tag alpine alpine:10.15</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#添加镜像标签</span></span>
<span class="line"><span style="color:#B392F0;">格式：docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tag</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">名称:[旧标签]</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">新名称:[新标签]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#docker tag ubuntu:latest ubuntu:20  #给ubuntu打上标签20，原来的标签是latest</span></span>
<span class="line"><span style="color:#B392F0;">ubuntu</span><span style="color:#E1E4E8;">                                                  </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">01</span><span style="color:#9ECBFF;">f29b872827</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">weeks</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ago</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">77.8</span><span style="color:#9ECBFF;">MB</span></span>
<span class="line"><span style="color:#B392F0;">ubuntu</span><span style="color:#E1E4E8;">                                                  </span><span style="color:#9ECBFF;">latest</span><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">01</span><span style="color:#9ECBFF;">f29b872827</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">weeks</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ago</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">77.8</span><span style="color:#9ECBFF;">MB</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除tag</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@appman marketapi]# docker rmi ubuntu:20</span></span>
<span class="line"><span style="color:#B392F0;">Untagged:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ubuntu:20</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#TARGET_IMAGE[:TAG]格式一般形式</span></span>
<span class="line"><span style="color:#6F42C1;">仓库主机FQDN或IP[:端口]/项目名(或用户名</span><span style="color:#24292E;">)/image名字:版本</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker tag alpine alpine:10.15</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#添加镜像标签</span></span>
<span class="line"><span style="color:#6F42C1;">格式：docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tag</span><span style="color:#24292E;"> </span><span style="color:#032F62;">名称:[旧标签]</span><span style="color:#24292E;"> </span><span style="color:#032F62;">新名称:[新标签]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#docker tag ubuntu:latest ubuntu:20  #给ubuntu打上标签20，原来的标签是latest</span></span>
<span class="line"><span style="color:#6F42C1;">ubuntu</span><span style="color:#24292E;">                                                  </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">01</span><span style="color:#032F62;">f29b872827</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#032F62;">weeks</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ago</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">77.8</span><span style="color:#032F62;">MB</span></span>
<span class="line"><span style="color:#6F42C1;">ubuntu</span><span style="color:#24292E;">                                                  </span><span style="color:#032F62;">latest</span><span style="color:#24292E;">    </span><span style="color:#005CC5;">01</span><span style="color:#032F62;">f29b872827</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#032F62;">weeks</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ago</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">77.8</span><span style="color:#032F62;">MB</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除tag</span></span>
<span class="line"><span style="color:#24292E;">[root@appman marketapi]# docker rmi ubuntu:20</span></span>
<span class="line"><span style="color:#6F42C1;">Untagged:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ubuntu:20</span></span></code></pre></div><h2 id="_2-2-容器操作" tabindex="-1">2.2 容器操作 <a class="header-anchor" href="#_2-2-容器操作" aria-label="Permalink to &quot;2.2 容器操作&quot;">​</a></h2><p>官方文档：</p><p><a href="https://docs.docker.com/engine/reference/commandline/images/" target="_blank" rel="noreferrer">https://docs.docker.com/engine/reference/commandline/images/</a></p><h3 id="_2-2-0查看容器" tabindex="-1">2.2.0查看容器 <a class="header-anchor" href="#_2-2-0查看容器" aria-label="Permalink to &quot;2.2.0查看容器&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#-a 选项可以显示所有的容器	</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">容器的ID号</span><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">加载的镜像</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">运行的程序</span><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">创建时间</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">当前的状态</span><span style="color:#E1E4E8;">                   </span><span style="color:#9ECBFF;">端口映射</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">名称</span></span>
<span class="line"><span style="color:#B392F0;">CONTAINER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ID</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">IMAGE</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">COMMAND</span><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">CREATED</span><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">                      </span><span style="color:#9ECBFF;">PORTS</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">NAMES</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;">    </span><span style="color:#6A737D;">#-a 选项可以显示所有的容器	</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">容器的ID号</span><span style="color:#24292E;">      </span><span style="color:#032F62;">加载的镜像</span><span style="color:#24292E;">     </span><span style="color:#032F62;">运行的程序</span><span style="color:#24292E;">                </span><span style="color:#032F62;">创建时间</span><span style="color:#24292E;">       </span><span style="color:#032F62;">当前的状态</span><span style="color:#24292E;">                   </span><span style="color:#032F62;">端口映射</span><span style="color:#24292E;">   </span><span style="color:#032F62;">名称</span></span>
<span class="line"><span style="color:#6F42C1;">CONTAINER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ID</span><span style="color:#24292E;">   </span><span style="color:#032F62;">IMAGE</span><span style="color:#24292E;">         </span><span style="color:#032F62;">COMMAND</span><span style="color:#24292E;">                  </span><span style="color:#032F62;">CREATED</span><span style="color:#24292E;">        </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">                      </span><span style="color:#032F62;">PORTS</span><span style="color:#24292E;">     </span><span style="color:#032F62;">NAMES</span></span></code></pre></div><h3 id="_2-2-1删除容器" tabindex="-1">2.2.1删除容器 <a class="header-anchor" href="#_2-2-1删除容器" aria-label="Permalink to &quot;2.2.1删除容器&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]docker rm container_id</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除停止的容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">container_id</span><span style="color:#E1E4E8;">      </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#强行删除正在运行的容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;">          </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除指定状态的容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span><span style="color:#B392F0;">docker</span><span style="color:#9ECBFF;"> ps </span><span style="color:#79B8FF;">-qf</span><span style="color:#9ECBFF;"> status=exited\`</span><span style="color:#E1E4E8;">   </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除所有停止的容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">container</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prune</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;">          </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#删除所有容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span><span style="color:#B392F0;">docker</span><span style="color:#9ECBFF;"> ps </span><span style="color:#79B8FF;">-a</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-q</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">         </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除所有容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-q</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">xargs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;">      </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除所有</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-q</span><span style="color:#F97583;">|</span><span style="color:#B392F0;">xargs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义删除所有容器的别名</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#vim .bashrc </span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#. .bashrc</span></span>
<span class="line"><span style="color:#F97583;">alias</span><span style="color:#E1E4E8;"> rmc</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;docker rm -f \`docker ps -qa\`&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]docker rm container_id</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除停止的容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">container_id</span><span style="color:#24292E;">      </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#强行删除正在运行的容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;">          </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除指定状态的容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> ps </span><span style="color:#005CC5;">-qf</span><span style="color:#032F62;"> status=exited\`</span><span style="color:#24292E;">   </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除所有停止的容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">container</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prune</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;">          </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#删除所有容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> ps </span><span style="color:#005CC5;">-a</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-q</span><span style="color:#032F62;">\`</span><span style="color:#24292E;">         </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除所有容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-q</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">xargs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;">      </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除所有</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-q</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">xargs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 定义删除所有容器的别名</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#vim .bashrc </span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#. .bashrc</span></span>
<span class="line"><span style="color:#D73A49;">alias</span><span style="color:#24292E;"> rmc</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;docker rm -f \`docker ps -qa\`&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s1 ~]# for i in \`docker ps -a | grep -i exit | awk &#39;{print $1}&#39;\`; do docker rm -f $i;done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s1 ~]# for i in \`docker ps -a | grep -i exit | awk &#39;{print $1}&#39;\`; do docker rm -f $i;done</span></span></code></pre></div><h3 id="_2-2-3启动" tabindex="-1">2.2.3启动 <a class="header-anchor" href="#_2-2-3启动" aria-label="Permalink to &quot;2.2.3启动&quot;">​</a></h3><p>启动容器有两种方式，一种是基于<code>镜像</code>新建一个容器并启动，另外一个是将在<code>终止状态（stopped）的容器</code>重新启动。</p><p>docker容器可以理解为在沙盒中运行的进程。这个沙盒包含了该进程运行所必须的资源，包括文件系统、系统类库、shell 环境等等。但这个沙盒默认是不会运行任何程序的。需要在沙盒中运行一个进程来启动某一个容器。这个进程是该容器的唯一进程，所以当该进程结束的时候，容器也会完全的停止</p><blockquote><p>启动容器。可以用ID，也可以用名字</p></blockquote><h4 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker run [选项] [镜像名] [shell命令] [参数]</span></span>
<span class="line"><span style="color:#e1e4e8;">#选项:</span></span>
<span class="line"><span style="color:#e1e4e8;">-i,       --interactive Keep STDIN open even if not attached，通常和-t一起使用</span></span>
<span class="line"><span style="color:#e1e4e8;">-t,       --tty 分配pseudo-TTY，通常和-i一起使用,注意对应的容器必须运行shell才支持进入</span></span>
<span class="line"><span style="color:#e1e4e8;">-d,       --detach Run container in background and print container ID,台后运行，默认前台</span></span>
<span class="line"><span style="color:#e1e4e8;">--name string         Assign a name to the container</span></span>
<span class="line"><span style="color:#e1e4e8;">--h, --hostname string     Container host name</span></span>
<span class="line"><span style="color:#e1e4e8;">--rm             Automatically remove the container when it exits</span></span>
<span class="line"><span style="color:#e1e4e8;">-p, --publish list        Publish a container&#39;s port(s) to the host</span></span>
<span class="line"><span style="color:#e1e4e8;">-P, --publish-all       Publish all exposed ports to random ports</span></span>
<span class="line"><span style="color:#e1e4e8;">--dns list          Set custom DNS servers</span></span>
<span class="line"><span style="color:#e1e4e8;">--entrypoint string     Overwrite the default ENTRYPOINT of the image</span></span>
<span class="line"><span style="color:#e1e4e8;">--restart policy</span></span>
<span class="line"><span style="color:#e1e4e8;">--privileged        Give extended privileges to container</span></span>
<span class="line"><span style="color:#e1e4e8;">-e, --env=[]        Set environment variables</span></span>
<span class="line"><span style="color:#e1e4e8;">--env-file=[]         Read in a line delimited file of environment variables</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker run [选项] [镜像名] [shell命令] [参数]</span></span>
<span class="line"><span style="color:#24292e;">#选项:</span></span>
<span class="line"><span style="color:#24292e;">-i,       --interactive Keep STDIN open even if not attached，通常和-t一起使用</span></span>
<span class="line"><span style="color:#24292e;">-t,       --tty 分配pseudo-TTY，通常和-i一起使用,注意对应的容器必须运行shell才支持进入</span></span>
<span class="line"><span style="color:#24292e;">-d,       --detach Run container in background and print container ID,台后运行，默认前台</span></span>
<span class="line"><span style="color:#24292e;">--name string         Assign a name to the container</span></span>
<span class="line"><span style="color:#24292e;">--h, --hostname string     Container host name</span></span>
<span class="line"><span style="color:#24292e;">--rm             Automatically remove the container when it exits</span></span>
<span class="line"><span style="color:#24292e;">-p, --publish list        Publish a container&#39;s port(s) to the host</span></span>
<span class="line"><span style="color:#24292e;">-P, --publish-all       Publish all exposed ports to random ports</span></span>
<span class="line"><span style="color:#24292e;">--dns list          Set custom DNS servers</span></span>
<span class="line"><span style="color:#24292e;">--entrypoint string     Overwrite the default ENTRYPOINT of the image</span></span>
<span class="line"><span style="color:#24292e;">--restart policy</span></span>
<span class="line"><span style="color:#24292e;">--privileged        Give extended privileges to container</span></span>
<span class="line"><span style="color:#24292e;">-e, --env=[]        Set environment variables</span></span>
<span class="line"><span style="color:#24292e;">--env-file=[]         Read in a line delimited file of environment variables</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#运行hello world</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker run nginx echo </span><span style="color:#9ECBFF;">&quot;hello world&quot;</span></span>
<span class="line"><span style="color:#B392F0;">hello</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">world</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker run -d --name nginx-server --rm  -p 80:80 nginx </span></span>
<span class="line"><span style="color:#B392F0;">7d17bed169e209fde3a548c956cc8e4f672d56fa80afdfe03eefab9e83ba4331</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">----后台运行</span></span>
<span class="line"><span style="color:#B392F0;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">定义名字</span></span>
<span class="line"><span style="color:#B392F0;">--rm</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">容器停止时自动删除</span></span>
<span class="line"><span style="color:#B392F0;">-p</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">指定端口</span></span>
<span class="line"><span style="color:#B392F0;">-P</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">随机生成端口</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#运行hello world</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker run nginx echo </span><span style="color:#032F62;">&quot;hello world&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">hello</span><span style="color:#24292E;"> </span><span style="color:#032F62;">world</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker run -d --name nginx-server --rm  -p 80:80 nginx </span></span>
<span class="line"><span style="color:#6F42C1;">7d17bed169e209fde3a548c956cc8e4f672d56fa80afdfe03eefab9e83ba4331</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">----后台运行</span></span>
<span class="line"><span style="color:#6F42C1;">--name</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">----</span><span style="color:#24292E;"> </span><span style="color:#032F62;">定义名字</span></span>
<span class="line"><span style="color:#6F42C1;">--rm</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">----</span><span style="color:#24292E;"> </span><span style="color:#032F62;">容器停止时自动删除</span></span>
<span class="line"><span style="color:#6F42C1;">-p</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">----</span><span style="color:#24292E;"> </span><span style="color:#032F62;">指定端口</span></span>
<span class="line"><span style="color:#6F42C1;">-P</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">----</span><span style="color:#24292E;"> </span><span style="color:#032F62;">随机生成端口</span></span></code></pre></div><h4 id="容器启动" tabindex="-1">容器启动 <a class="header-anchor" href="#容器启动" aria-label="Permalink to &quot;容器启动&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker start 容器id   #启动容器</span></span>
<span class="line"><span style="color:#e1e4e8;">docker restart 容器id #重启容器</span></span>
<span class="line"><span style="color:#e1e4e8;">docker stop 容器id    #停止当前正在运行的容器</span></span>
<span class="line"><span style="color:#e1e4e8;">docker kill 容器id    #强制停止当前容器</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker start 容器id   #启动容器</span></span>
<span class="line"><span style="color:#24292e;">docker restart 容器id #重启容器</span></span>
<span class="line"><span style="color:#24292e;">docker stop 容器id    #停止当前正在运行的容器</span></span>
<span class="line"><span style="color:#24292e;">docker kill 容器id    #强制停止当前容器</span></span></code></pre></div><ul><li>容器获取 root 权限</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@DY-Ubuntu-01 ~]#docker run -it --privileged centos          #使用--privileged 让容器获取 root 权限</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@DY-Ubuntu-01 ~]#docker run -it --privileged centos          #使用--privileged 让容器获取 root 权限</span></span></code></pre></div><h4 id="容器停止" tabindex="-1">容器停止 <a class="header-anchor" href="#容器停止" aria-label="Permalink to &quot;容器停止&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span><span style="color:#B392F0;">docker</span><span style="color:#9ECBFF;"> ps </span><span style="color:#79B8FF;">-a</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-q</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#停止所有容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span><span style="color:#B392F0;">docker</span><span style="color:#9ECBFF;"> ps </span><span style="color:#79B8FF;">-a</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-q</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">         </span><span style="color:#6A737D;">#启动所有容器</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> ps </span><span style="color:#005CC5;">-a</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-q</span><span style="color:#032F62;">\`</span><span style="color:#24292E;">          </span><span style="color:#6A737D;">#停止所有容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> ps </span><span style="color:#005CC5;">-a</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-q</span><span style="color:#032F62;">\`</span><span style="color:#24292E;">         </span><span style="color:#6A737D;">#启动所有容器</span></span></code></pre></div><h4 id="暂停和恢复容器" tabindex="-1">暂停和恢复容器 <a class="header-anchor" href="#暂停和恢复容器" aria-label="Permalink to &quot;暂停和恢复容器&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pause</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx1</span><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#暂停容器</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">unpause</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx1</span><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">#恢复容器</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pause</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx1</span><span style="color:#24292E;">          </span><span style="color:#6A737D;">#暂停容器</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unpause</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx1</span><span style="color:#24292E;">          </span><span style="color:#6A737D;">#恢复容器</span></span></code></pre></div><h4 id="容器发信号" tabindex="-1">容器发信号 <a class="header-anchor" href="#容器发信号" aria-label="Permalink to &quot;容器发信号&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kill</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">可以给容器发信号,默认号SIGKILL,即9信号</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kill</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx1</span><span style="color:#E1E4E8;">                   </span><span style="color:#6A737D;">#关闭容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kill</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span><span style="color:#B392F0;">docker</span><span style="color:#9ECBFF;"> ps </span><span style="color:#79B8FF;">-a</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-q</span><span style="color:#9ECBFF;">\`</span><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">#强制关闭所有运行中的容器</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kill</span><span style="color:#24292E;"> </span><span style="color:#032F62;">可以给容器发信号,默认号SIGKILL,即9信号</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kill</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx1</span><span style="color:#24292E;">                   </span><span style="color:#6A737D;">#关闭容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kill</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span><span style="color:#6F42C1;">docker</span><span style="color:#032F62;"> ps </span><span style="color:#005CC5;">-a</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-q</span><span style="color:#032F62;">\`</span><span style="color:#24292E;">        </span><span style="color:#6A737D;">#强制关闭所有运行中的容器</span></span></code></pre></div><h4 id="查看" tabindex="-1">查看 <a class="header-anchor" href="#查看" aria-label="Permalink to &quot;查看&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">查看容器（ps）</span></span>
<span class="line"><span style="color:#6A737D;"># 列出当前所有正在运行的container </span></span>
<span class="line"><span style="color:#E1E4E8;">$docker ps </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 显示全部容器，包括退出状态的容器 </span></span>
<span class="line"><span style="color:#E1E4E8;">$docker ps -a </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 列出最近一次启动的container </span></span>
<span class="line"><span style="color:#E1E4E8;">$docker ps -1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#只显示容器ID</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-a</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看退出状态的容器，注意：exited不要大写</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ps</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;status=exited&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看容器内的进程</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">top</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看容器资源使用情况</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stats</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">#查看容器的详细信息</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">inspect</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#选择性查看镜像信息</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">inspect</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;{{.Metadata}}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">httpd:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">inspect</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;{{.RootFS}}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">httpd:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">inspect</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;{{.Created}}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">httpd:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">inspect</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;{{.RepoTags}}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">httpd:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">查看容器（ps）</span></span>
<span class="line"><span style="color:#6A737D;"># 列出当前所有正在运行的container </span></span>
<span class="line"><span style="color:#24292E;">$docker ps </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 显示全部容器，包括退出状态的容器 </span></span>
<span class="line"><span style="color:#24292E;">$docker ps -a </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 列出最近一次启动的container </span></span>
<span class="line"><span style="color:#24292E;">$docker ps -1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#只显示容器ID</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-a</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-q</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看退出状态的容器，注意：exited不要大写</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ps</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;status=exited&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看容器内的进程</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">top</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看容器资源使用情况</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stats</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">#查看容器的详细信息</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">inspect</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#选择性查看镜像信息</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">inspect</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;{{.Metadata}}&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">httpd:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">inspect</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;{{.RootFS}}&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">httpd:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">inspect</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;{{.Created}}&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">httpd:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">inspect</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;{{.RepoTags}}&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">httpd:latest</span></span></code></pre></div><h3 id="_2-3-4-容器交互" tabindex="-1">2.3.4 容器交互 <a class="header-anchor" href="#_2-3-4-容器交互" aria-label="Permalink to &quot;2.3.4 容器交互&quot;">​</a></h3><h4 id="exec" tabindex="-1">exec <a class="header-anchor" href="#exec" aria-label="Permalink to &quot;exec&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#容器必须正常运行</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker ps </span></span>
<span class="line"><span style="color:#B392F0;">CONTAINER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ID</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">IMAGE</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">COMMAND</span><span style="color:#E1E4E8;">                  </span><span style="color:#9ECBFF;">CREATED</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">STATUS</span><span style="color:#E1E4E8;">         </span><span style="color:#9ECBFF;">PORTS</span><span style="color:#E1E4E8;">                               </span><span style="color:#9ECBFF;">NAMES</span></span>
<span class="line"><span style="color:#B392F0;">7d17bed169e2</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">nginx</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">&quot;/docker-entrypoint.…&quot;</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">minutes</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ago</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">Up</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">minutes</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">0.0</span><span style="color:#9ECBFF;">.0.0:80</span><span style="color:#E1E4E8;">-</span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">80/tcp,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">:::80</span><span style="color:#E1E4E8;">-</span><span style="color:#F97583;">&gt;</span><span style="color:#9ECBFF;">80/tcp</span><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">nginx-server</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker exec -it 7d17bed169e2 /bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker run -it nginx /bin/bash </span></span>
<span class="line"><span style="color:#B392F0;">root@1fdabf241d64:/#</span></span>
<span class="line"><span style="color:#B392F0;">■</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">退出：</span></span>
<span class="line"><span style="color:#B392F0;">1、Ctrl+d</span></span>
<span class="line"><span style="color:#B392F0;">2、exit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#不进入容器中查看,执行一次性命令</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker exec -it nginx ls -l /</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#容器必须正常运行</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker ps </span></span>
<span class="line"><span style="color:#6F42C1;">CONTAINER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ID</span><span style="color:#24292E;">   </span><span style="color:#032F62;">IMAGE</span><span style="color:#24292E;">     </span><span style="color:#032F62;">COMMAND</span><span style="color:#24292E;">                  </span><span style="color:#032F62;">CREATED</span><span style="color:#24292E;">         </span><span style="color:#032F62;">STATUS</span><span style="color:#24292E;">         </span><span style="color:#032F62;">PORTS</span><span style="color:#24292E;">                               </span><span style="color:#032F62;">NAMES</span></span>
<span class="line"><span style="color:#6F42C1;">7d17bed169e2</span><span style="color:#24292E;">   </span><span style="color:#032F62;">nginx</span><span style="color:#24292E;">     </span><span style="color:#032F62;">&quot;/docker-entrypoint.…&quot;</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">7</span><span style="color:#24292E;"> </span><span style="color:#032F62;">minutes</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ago</span><span style="color:#24292E;">   </span><span style="color:#032F62;">Up</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span><span style="color:#24292E;"> </span><span style="color:#032F62;">minutes</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">0.0</span><span style="color:#032F62;">.0.0:80</span><span style="color:#24292E;">-</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">80/tcp,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">:::80</span><span style="color:#24292E;">-</span><span style="color:#D73A49;">&gt;</span><span style="color:#032F62;">80/tcp</span><span style="color:#24292E;">   </span><span style="color:#032F62;">nginx-server</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker exec -it 7d17bed169e2 /bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#或者</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker run -it nginx /bin/bash </span></span>
<span class="line"><span style="color:#6F42C1;">root@1fdabf241d64:/#</span></span>
<span class="line"><span style="color:#6F42C1;">■</span><span style="color:#24292E;"> </span><span style="color:#032F62;">退出：</span></span>
<span class="line"><span style="color:#6F42C1;">1、Ctrl+d</span></span>
<span class="line"><span style="color:#6F42C1;">2、exit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#不进入容器中查看,执行一次性命令</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker exec -it nginx ls -l /</span></span></code></pre></div><blockquote><p>当利用 docker run 来创建容器时，Docker 在后台运行的标准操作包括：</p><p>检查本地是否存在指定的镜像，不存在就从公有仓库下载 利用镜像创建并启动一个容器 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去 从地址池配置一个 ip 地址给容器 执行用户指定的应用程序 执行完毕后容器被终止</p></blockquote><h4 id="nsenter" tabindex="-1"><strong>nsenter</strong> <a class="header-anchor" href="#nsenter" aria-label="Permalink to &quot;**nsenter**&quot;">​</a></h4><p>无需sshd、无需attach也可以登录容器</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#通过nsenter访问容器中的空间</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# rpm -qf </span><span style="color:#9ECBFF;">\`</span><span style="color:#79B8FF;">which</span><span style="color:#9ECBFF;"> nsenter\`</span></span>
<span class="line"><span style="color:#B392F0;">util-linux-ng-2.17.2-12.18.el6.x86_64</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker inspect 4e870027f9c4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker inspect -f {{.State.Pid}} 4e870027f9c4</span></span>
<span class="line"><span style="color:#B392F0;">16255</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# nsenter --target 16255 --mount --uts --ipc --net --pid</span></span>
<span class="line"><span style="color:#B392F0;">root@4e870027f9c4:/#</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#通过nsenter访问容器中的空间</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# rpm -qf </span><span style="color:#032F62;">\`</span><span style="color:#005CC5;">which</span><span style="color:#032F62;"> nsenter\`</span></span>
<span class="line"><span style="color:#6F42C1;">util-linux-ng-2.17.2-12.18.el6.x86_64</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker inspect 4e870027f9c4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker inspect -f {{.State.Pid}} 4e870027f9c4</span></span>
<span class="line"><span style="color:#6F42C1;">16255</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# nsenter --target 16255 --mount --uts --ipc --net --pid</span></span>
<span class="line"><span style="color:#6F42C1;">root@4e870027f9c4:/#</span></span></code></pre></div><h4 id="attach" tabindex="-1">attach <a class="header-anchor" href="#attach" aria-label="Permalink to &quot;attach&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s1 ~]# docker attach 44fc0f0582d9</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s1 ~]# docker attach 44fc0f0582d9</span></span></code></pre></div><blockquote><p>但在，使用该命令有一个问题。当多个窗口同时使用该命令进入该容器时，所有的窗口都会同步显示。如果有一个窗口阻塞了，那么其他窗口也无法再进行操作。</p><p>因为这个原因，所以docker attach命令不太适合于生产环境，平时自己开发应用时可以使用该命令</p></blockquote><h4 id="port" tabindex="-1">port <a class="header-anchor" href="#port" aria-label="Permalink to &quot;port&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker run -d -P --name nginx1 nginx           #映射容器所有暴露端口至随机本地端口</span></span>
<span class="line"><span style="color:#e1e4e8;">docker port nginx1                             #查看容器的端口映射关系</span></span>
<span class="line"><span style="color:#e1e4e8;">80/tcp -&gt; 0.0.0.0:49153</span></span>
<span class="line"><span style="color:#e1e4e8;">80/tcp -&gt; :::49153</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -t nat -vnL                           #自动生成Iptables规则</span></span>
<span class="line"><span style="color:#e1e4e8;">iptables -S -t nat</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定端口映射</span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -d --name nginx2 -p 80 nginx      #容器80端口映射宿主机本地随机端口</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -d --name nginx3 -p 81:80 nginx   #容器80端口映射到宿主机本地端口81</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -d --name nginx4 -p 192.168.100.201:82:80 nginx   #宿主机本地IP:宿主机本地端口:容器端口</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -d --name nginx5 -p 192.168.100.201::80 nginx     #宿主机本地IP:宿主机本地随机端口:容器端口，默认从32768开始</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -d --name nginx6 -p 192.168.100.201:83:80/udp nginx  #宿主机本机ip:宿主机本地端口:容器端口/协议，默认为tcp协议</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -d --name nginx7 -p 8088:80/tcp -p 8443:443/tcp -p 53:53/udp nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">   #一次性映射多个端口+协议</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker run -d -P --name nginx1 nginx           #映射容器所有暴露端口至随机本地端口</span></span>
<span class="line"><span style="color:#24292e;">docker port nginx1                             #查看容器的端口映射关系</span></span>
<span class="line"><span style="color:#24292e;">80/tcp -&gt; 0.0.0.0:49153</span></span>
<span class="line"><span style="color:#24292e;">80/tcp -&gt; :::49153</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">iptables -t nat -vnL                           #自动生成Iptables规则</span></span>
<span class="line"><span style="color:#24292e;">iptables -S -t nat</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定端口映射</span></span>
<span class="line"><span style="color:#24292e;">docker run -d --name nginx2 -p 80 nginx      #容器80端口映射宿主机本地随机端口</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run -d --name nginx3 -p 81:80 nginx   #容器80端口映射到宿主机本地端口81</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run -d --name nginx4 -p 192.168.100.201:82:80 nginx   #宿主机本地IP:宿主机本地端口:容器端口</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run -d --name nginx5 -p 192.168.100.201::80 nginx     #宿主机本地IP:宿主机本地随机端口:容器端口，默认从32768开始</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run -d --name nginx6 -p 192.168.100.201:83:80/udp nginx  #宿主机本机ip:宿主机本地端口:容器端口/协议，默认为tcp协议</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run -d --name nginx7 -p 8088:80/tcp -p 8443:443/tcp -p 53:53/udp nginx</span></span>
<span class="line"><span style="color:#24292e;">   #一次性映射多个端口+协议</span></span></code></pre></div><h3 id="_2-3-6-传递运行命令" tabindex="-1">2.3.6 传递运行命令 <a class="header-anchor" href="#_2-3-6-传递运行命令" aria-label="Permalink to &quot;2.3.6 传递运行命令&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker run -d alpine tail -f /etc/hosts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker run -d alpine tail -f /etc/hosts</span></span></code></pre></div><h3 id="_2-3-7-容器内部的hosts文件" tabindex="-1">2.3.7 容器内部的hosts文件 <a class="header-anchor" href="#_2-3-7-容器内部的hosts文件" aria-label="Permalink to &quot;2.3.7 容器内部的hosts文件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#容器会自动将容器的ID加入自已的/etc/hosts文件中，并解析成容器的IP</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -it --rm --add-host www.wang.org:6.6.6.6 --add-host www.dayu.org:8.8.8.8 busybox     #修改容器的 hosts文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#容器会自动将容器的ID加入自已的/etc/hosts文件中，并解析成容器的IP</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker run -it --rm --add-host www.wang.org:6.6.6.6 --add-host www.dayu.org:8.8.8.8 busybox     #修改容器的 hosts文件</span></span></code></pre></div><h3 id="_2-3-8-指定容器dns" tabindex="-1">2.3.8 指定容器DNS <a class="header-anchor" href="#_2-3-8-指定容器dns" aria-label="Permalink to &quot;2.3.8 指定容器DNS&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">容器的dns服务器，默认采用宿主机的dns</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">地址，可以用下面方式指定其它的DNS地址</span></span>
<span class="line"><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">将dns地址配置在宿主机</span></span>
<span class="line"><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">在容器启动时加选项</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dns=x.x.x.x</span></span>
<span class="line"><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">在/etc/docker/daemon.json</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">文件中指定</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#容器的DNS默认从宿主机的DNS获取</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#systemd-resolve --status </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-A1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;DNS server&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">Current</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">DNS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Server:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.100.1</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">DNS</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Servers:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.100.1</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker run -it --rm --name centos1 centos         </span></span>
<span class="line"><span style="color:#E1E4E8;">[root@019dd9a4ba35 /]# egrep -v </span><span style="color:#9ECBFF;">&quot;^#|^$&quot;</span><span style="color:#E1E4E8;"> /etc/resolv.conf </span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#9ECBFF;">.100.1</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定DNS地址</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker run -it --rm --name centos2 --dns 1.1.1.1 --dns 6.6.6.6 --dns 8.8.8.8 centos bash            </span></span>
<span class="line"><span style="color:#E1E4E8;">[root@d7ddcff827ba /]# egrep -v </span><span style="color:#9ECBFF;">&quot;^#|^$&quot;</span><span style="color:#E1E4E8;"> /etc/resolv.conf</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.1</span><span style="color:#9ECBFF;">.1.1</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6.6</span><span style="color:#9ECBFF;">.6.6</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8.8</span><span style="color:#9ECBFF;">.8.8</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定domain名</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker run -it --rm --name centos3 --dns 6.6.6.6 --dns 8.8.8.8 --dns-searc wang.org --dns-search wang.com busybox                   </span></span>
<span class="line"><span style="color:#B392F0;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># egrep -v &quot;^#|^$&quot; /etc/resolv.conf</span></span>
<span class="line"><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wang.org</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wang.com</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6.6</span><span style="color:#9ECBFF;">.6.6</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8.8</span><span style="color:#9ECBFF;">.8.8</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#配置文件指定DNS和搜索domain名</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#vim /etc/docker/daemon.json</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;registry-mirrors&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;https://pgavrk5n.mirror.aliyuncs.com&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;storage-driver&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;overlay2&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;dns&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">:</span><span style="color:#E1E4E8;"> [ </span><span style="color:#9ECBFF;">&quot;114.114.114.114&quot;,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;119.29.29.29&quot;],</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">&quot;dns-search&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;"> [ </span><span style="color:#9ECBFF;">&quot;wangxiaochun.com&quot;,</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;wang.org&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker run -it --rm centos bash</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@f35bfa417d29 /]# cat /etc/resolv.conf </span></span>
<span class="line"><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wangxiaochun.com</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wang.org</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">114.114</span><span style="color:#9ECBFF;">.114.114</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">119.29</span><span style="color:#9ECBFF;">.29.29</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#用--dns指定优先级更高</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@DY-Ubuntu-01 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]#docker run -it --rm --dns 6.6.6.6 --dns 8.8.8.8 centos bash</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@c6c43766b04e /]# cat /etc/resolv.conf </span></span>
<span class="line"><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wangxiaochun.com</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">wang.org</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6.6</span><span style="color:#9ECBFF;">.6.6</span></span>
<span class="line"><span style="color:#B392F0;">nameserver</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8.8</span><span style="color:#9ECBFF;">.8.8</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">容器的dns服务器，默认采用宿主机的dns</span><span style="color:#24292E;"> </span><span style="color:#032F62;">地址，可以用下面方式指定其它的DNS地址</span></span>
<span class="line"><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">将dns地址配置在宿主机</span></span>
<span class="line"><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">在容器启动时加选项</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dns=x.x.x.x</span></span>
<span class="line"><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">在/etc/docker/daemon.json</span><span style="color:#24292E;"> </span><span style="color:#032F62;">文件中指定</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#容器的DNS默认从宿主机的DNS获取</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#systemd-resolve --status </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-A1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;DNS server&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">Current</span><span style="color:#24292E;"> </span><span style="color:#032F62;">DNS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Server:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.100.1</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">DNS</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Servers:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.100.1</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker run -it --rm --name centos1 centos         </span></span>
<span class="line"><span style="color:#24292E;">[root@019dd9a4ba35 /]# egrep -v </span><span style="color:#032F62;">&quot;^#|^$&quot;</span><span style="color:#24292E;"> /etc/resolv.conf </span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#032F62;">.100.1</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定DNS地址</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker run -it --rm --name centos2 --dns 1.1.1.1 --dns 6.6.6.6 --dns 8.8.8.8 centos bash            </span></span>
<span class="line"><span style="color:#24292E;">[root@d7ddcff827ba /]# egrep -v </span><span style="color:#032F62;">&quot;^#|^$&quot;</span><span style="color:#24292E;"> /etc/resolv.conf</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.1</span><span style="color:#032F62;">.1.1</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6.6</span><span style="color:#032F62;">.6.6</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8.8</span><span style="color:#032F62;">.8.8</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#指定domain名</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker run -it --rm --name centos3 --dns 6.6.6.6 --dns 8.8.8.8 --dns-searc wang.org --dns-search wang.com busybox                   </span></span>
<span class="line"><span style="color:#6F42C1;">/</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># egrep -v &quot;^#|^$&quot; /etc/resolv.conf</span></span>
<span class="line"><span style="color:#6F42C1;">search</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wang.org</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wang.com</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6.6</span><span style="color:#032F62;">.6.6</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8.8</span><span style="color:#032F62;">.8.8</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#配置文件指定DNS和搜索domain名</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#vim /etc/docker/daemon.json</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;registry-mirrors&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;https://pgavrk5n.mirror.aliyuncs.com&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;storage-driver&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;overlay2&quot;,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;dns&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">:</span><span style="color:#24292E;"> [ </span><span style="color:#032F62;">&quot;114.114.114.114&quot;,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;119.29.29.29&quot;],</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">&quot;dns-search&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;"> [ </span><span style="color:#032F62;">&quot;wangxiaochun.com&quot;,</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;wang.org&quot;]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker run -it --rm centos bash</span></span>
<span class="line"><span style="color:#24292E;">[root@f35bfa417d29 /]# cat /etc/resolv.conf </span></span>
<span class="line"><span style="color:#6F42C1;">search</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wangxiaochun.com</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wang.org</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">114.114</span><span style="color:#032F62;">.114.114</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">119.29</span><span style="color:#032F62;">.29.29</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#用--dns指定优先级更高</span></span>
<span class="line"><span style="color:#24292E;">[root@DY-Ubuntu-01 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]#docker run -it --rm --dns 6.6.6.6 --dns 8.8.8.8 centos bash</span></span>
<span class="line"><span style="color:#24292E;">[root@c6c43766b04e /]# cat /etc/resolv.conf </span></span>
<span class="line"><span style="color:#6F42C1;">search</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wangxiaochun.com</span><span style="color:#24292E;"> </span><span style="color:#032F62;">wang.org</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6.6</span><span style="color:#032F62;">.6.6</span></span>
<span class="line"><span style="color:#6F42C1;">nameserver</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8.8</span><span style="color:#032F62;">.8.8</span></span></code></pre></div><h3 id="_2-3-9-修改容器" tabindex="-1">2.3.9 修改容器 <a class="header-anchor" href="#_2-3-9-修改容器" aria-label="Permalink to &quot;2.3.9 修改容器&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">对某一个容器做了修改之后（通过在容器中运行某一个命令），可以把对容器的修改保存下来，这样下次可以从保存后的最新状态运行该容器。</span></span>
<span class="line"><span style="color:#e1e4e8;"> commit  基于已有镜像的容器再生成一个新的镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">     # docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]</span></span>
<span class="line"><span style="color:#e1e4e8;">     -m,--message=&quot;&quot;  提交信息，为镜像描述内容</span></span>
<span class="line"><span style="color:#e1e4e8;">     -a,--author=&quot;&quot;   作者信息</span></span>
<span class="line"><span style="color:#e1e4e8;">     -p,--pause=true  提交时暂停容器运行</span></span>
<span class="line"><span style="color:#e1e4e8;">     My_Container:1  是提交的镜像名称和版本</span></span>
<span class="line"><span style="color:#e1e4e8;"># docker commit -m &quot;Centos7 x64 First Image&quot; -a &quot;Loren&quot; 33d619155d03 My_centos7:1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">对某一个容器做了修改之后（通过在容器中运行某一个命令），可以把对容器的修改保存下来，这样下次可以从保存后的最新状态运行该容器。</span></span>
<span class="line"><span style="color:#24292e;"> commit  基于已有镜像的容器再生成一个新的镜像</span></span>
<span class="line"><span style="color:#24292e;">     # docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]</span></span>
<span class="line"><span style="color:#24292e;">     -m,--message=&quot;&quot;  提交信息，为镜像描述内容</span></span>
<span class="line"><span style="color:#24292e;">     -a,--author=&quot;&quot;   作者信息</span></span>
<span class="line"><span style="color:#24292e;">     -p,--pause=true  提交时暂停容器运行</span></span>
<span class="line"><span style="color:#24292e;">     My_Container:1  是提交的镜像名称和版本</span></span>
<span class="line"><span style="color:#24292e;"># docker commit -m &quot;Centos7 x64 First Image&quot; -a &quot;Loren&quot; 33d619155d03 My_centos7:1</span></span></code></pre></div><h3 id="_2-3-10-容器中执行命令" tabindex="-1">2.3.10 容器中执行命令 <a class="header-anchor" href="#_2-3-10-容器中执行命令" aria-label="Permalink to &quot;2.3.10 容器中执行命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 显示一个运行的容器里面的进程信息 </span></span>
<span class="line"><span style="color:#E1E4E8;">$docker top Name/ID </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从容器里面拷贝文件/目录到本地一个路径 </span></span>
<span class="line"><span style="color:#E1E4E8;">$docker cp Name:/container_path to_path </span></span>
<span class="line"><span style="color:#E1E4E8;">$docker cp ID:/container_path to_path </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">###显示容器CPU、内存的等状态</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker stats nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 显示一个运行的容器里面的进程信息 </span></span>
<span class="line"><span style="color:#24292E;">$docker top Name/ID </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 从容器里面拷贝文件/目录到本地一个路径 </span></span>
<span class="line"><span style="color:#24292E;">$docker cp Name:/container_path to_path </span></span>
<span class="line"><span style="color:#24292E;">$docker cp ID:/container_path to_path </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">###显示容器CPU、内存的等状态</span></span>
<span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker stats nginx</span></span></code></pre></div><h3 id="_2-3-11-修改容器名字" tabindex="-1">2.3.11 修改容器名字 <a class="header-anchor" href="#_2-3-11-修改容器名字" aria-label="Permalink to &quot;2.3.11 修改容器名字&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@k8s1 </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">]# docker rename container_id_old container_new</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@k8s1 </span><span style="color:#D73A49;">~</span><span style="color:#24292E;">]# docker rename container_id_old container_new</span></span></code></pre></div><h3 id="_2-3-12-查看容器资源" tabindex="-1">2.3.12 查看容器资源 <a class="header-anchor" href="#_2-3-12-查看容器资源" aria-label="Permalink to &quot;2.3.12 查看容器资源&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#选项只输出当前的状态</span></span>
<span class="line"><span style="color:#e1e4e8;">docker stats --no-stream</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#json形式</span></span>
<span class="line"><span style="color:#e1e4e8;">docker stats --no-stream --format \\</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;{\\&quot;container\\&quot;:\\&quot;{{ .Container }}\\&quot;,\\&quot;memory\\&quot;:{\\&quot;raw\\&quot;:\\&quot;{{ .MemUsage }}\\&quot;,\\&quot;percent\\&quot;:\\&quot;{{ .MemPerc }}\\&quot;},\\&quot;cpu\\&quot;:\\&quot;{{ .CPUPerc }}\\&quot;}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#选项只输出当前的状态</span></span>
<span class="line"><span style="color:#24292e;">docker stats --no-stream</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#json形式</span></span>
<span class="line"><span style="color:#24292e;">docker stats --no-stream --format \\</span></span>
<span class="line"><span style="color:#24292e;">    &quot;{\\&quot;container\\&quot;:\\&quot;{{ .Container }}\\&quot;,\\&quot;memory\\&quot;:{\\&quot;raw\\&quot;:\\&quot;{{ .MemUsage }}\\&quot;,\\&quot;percent\\&quot;:\\&quot;{{ .MemPerc }}\\&quot;},\\&quot;cpu\\&quot;:\\&quot;{{ .CPUPerc }}\\&quot;}&quot;</span></span></code></pre></div><h1 id="_1-4-修改存储路径" tabindex="-1">1.4 修改存储路径 <a class="header-anchor" href="#_1-4-修改存储路径" aria-label="Permalink to &quot;1.4 修改存储路径&quot;">​</a></h1><ul><li>查看docker存储路径</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker info |grep Dir</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker info |grep Dir</span></span></code></pre></div><ul><li>关闭docker 服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">systemctl stop docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">systemctl stop docker</span></span></code></pre></div><p>/etc/docker/daemon.json ，没有自己创建</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;data-root&quot;: &quot;/www/docker&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;data-root&quot;: &quot;/www/docker&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>或者</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s1 ~]# vim /usr/lib/systemd/system/docker.service</span></span>
<span class="line"><span style="color:#e1e4e8;">ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --graph=/path</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> --graph=/path</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"># systemctl start docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s1 ~]# vim /usr/lib/systemd/system/docker.service</span></span>
<span class="line"><span style="color:#24292e;">ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --graph=/path</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> --graph=/path</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"># systemctl start docker</span></span></code></pre></div><blockquote><p>保存重启</p></blockquote><h1 id="_1-5配置文件" tabindex="-1">1.5配置文件 <a class="header-anchor" href="#_1-5配置文件" aria-label="Permalink to &quot;1.5配置文件&quot;">​</a></h1><p>#docker配置文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;graph&quot;: &quot;/data/docker&quot;,          #数据目录</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;storage-driver&quot;: &quot; overlay2&quot;,   #存储引擎</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;insecure-registries&quot;: [&quot;registry.access.redhat.com&quot;,&quot; quary.io&quot;]    #私有仓库</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;registry-mirrors&quot;: [&quot;https://q&quot;]        #镜像加速</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;bip&quot;: &quot;172.7.5.1/24&quot;,                     #docker网络（面试题—如何永久配置docker网络地址，就是在daemon.json 里面配置&quot;bip&quot;字段）</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],        #启动时候的额外参数(驱动)</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;live-restore&quot;: true           #当docker容器引擎挂掉的时候，使用docker跑起来的容器还能运行（分离)</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">docker容器网络生产经验</span></span>
<span class="line"><span style="color:#e1e4e8;">docker 的网络建议和宿主机的IP“对照”</span></span>
<span class="line"><span style="color:#e1e4e8;">比如宿主机10.2.5.6容器的地址就可以修改为172.5.6.1，这样方便在故障发生时，更容易定位故障节点位置</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">&quot;graph&quot;: &quot;/data/docker&quot;,          #数据目录</span></span>
<span class="line"><span style="color:#24292e;">&quot;storage-driver&quot;: &quot; overlay2&quot;,   #存储引擎</span></span>
<span class="line"><span style="color:#24292e;">&quot;insecure-registries&quot;: [&quot;registry.access.redhat.com&quot;,&quot; quary.io&quot;]    #私有仓库</span></span>
<span class="line"><span style="color:#24292e;">&quot;registry-mirrors&quot;: [&quot;https://q&quot;]        #镜像加速</span></span>
<span class="line"><span style="color:#24292e;">&quot;bip&quot;: &quot;172.7.5.1/24&quot;,                     #docker网络（面试题—如何永久配置docker网络地址，就是在daemon.json 里面配置&quot;bip&quot;字段）</span></span>
<span class="line"><span style="color:#24292e;">&quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;],        #启动时候的额外参数(驱动)</span></span>
<span class="line"><span style="color:#24292e;">&quot;live-restore&quot;: true           #当docker容器引擎挂掉的时候，使用docker跑起来的容器还能运行（分离)</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">docker容器网络生产经验</span></span>
<span class="line"><span style="color:#24292e;">docker 的网络建议和宿主机的IP“对照”</span></span>
<span class="line"><span style="color:#24292e;">比如宿主机10.2.5.6容器的地址就可以修改为172.5.6.1，这样方便在故障发生时，更容易定位故障节点位置</span></span></code></pre></div><h1 id="_1-6-镜像加速" tabindex="-1">1.6 镜像加速 <a class="header-anchor" href="#_1-6-镜像加速" aria-label="Permalink to &quot;1.6 镜像加速&quot;">​</a></h1><p><a href="https://help.aliyun.com/document_detail/60750.html?spm=a2c4g.11186623.6.559.3db39456zcOTBb" target="_blank" rel="noreferrer">阿里镜像加速配置</a></p>`,94),o=[e];function c(t,r,i,y,E,d){return n(),a("div",null,o)}const h=s(p,[["render",c]]);export{u as __pageData,h as default};
