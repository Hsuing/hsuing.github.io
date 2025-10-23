import{_ as e,o as s,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1.ingress","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/swarm/3.netwrok.md","filePath":"guide/container/swarm/3.netwrok.md","lastUpdated":1703083183000}'),r={name:"guide/container/swarm/3.netwrok.md"},l=n(`<p>文档：</p><p>​ <a href="https://docs.docker.com/network/drivers/overlay/#container-discovery" target="_blank" rel="noreferrer">https://docs.docker.com/network/drivers/overlay/#container-discovery</a></p><h1 id="_1-ingress" tabindex="-1">1.ingress <a class="header-anchor" href="#_1-ingress" aria-label="Permalink to &quot;1.ingress&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s-node01 ~]# docker network ls </span></span>
<span class="line"><span style="color:#e1e4e8;">NETWORK ID     NAME              DRIVER    SCOPE</span></span>
<span class="line"><span style="color:#e1e4e8;">b9704956f6d1   bridge            bridge    local</span></span>
<span class="line"><span style="color:#e1e4e8;">e4cd8283fbd1   docker_gwbridge   bridge    local</span></span>
<span class="line"><span style="color:#e1e4e8;">a8ce4375181a   host              host      local</span></span>
<span class="line"><span style="color:#e1e4e8;">ldcaqwsczce8   ingress           overlay   swarm</span></span>
<span class="line"><span style="color:#e1e4e8;">9eb3e46dd217   none              null      local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s-node01 ~]# docker network ls </span></span>
<span class="line"><span style="color:#24292e;">NETWORK ID     NAME              DRIVER    SCOPE</span></span>
<span class="line"><span style="color:#24292e;">b9704956f6d1   bridge            bridge    local</span></span>
<span class="line"><span style="color:#24292e;">e4cd8283fbd1   docker_gwbridge   bridge    local</span></span>
<span class="line"><span style="color:#24292e;">a8ce4375181a   host              host      local</span></span>
<span class="line"><span style="color:#24292e;">ldcaqwsczce8   ingress           overlay   swarm</span></span>
<span class="line"><span style="color:#24292e;">9eb3e46dd217   none              null      local</span></span></code></pre></div><p>​ Swarm mode的<code>ingress</code>网络，分布于整个swarm集群，每台swarm node上都有这两个端口：</p><p>​ 7946 TCP/UDP 容器网络发现</p><p>​ 4789 UDP 容器ingress网络</p><p>​ Ingress网络是一个覆盖网络，在服务节点之间进行负载均衡。当您启动或加入 Dockersworm 时，会自动创建I ngress 网络。在 Docker Swarm 中，所有节点都属于一个名为 ingress 的虚拟网络，以便轻松地将服务暴露给外界。当客户端向 Docker swarm 中所有节点公开的端口发出请求时，该请求将转发到名为 IPVS 的模块。IPVS 跟踪参与该服务的所有 IP 地址，选择其中之一，并将请求路由到该路径。</p><p>​ 暴露端口时，可以在 docker service create 命令中设置要暴露的端口。如果不单独指定端口，管理节点会自动分配30000～32767范围内的端口</p><h1 id="_2-docker-gwbridge" tabindex="-1">2.docker_gwbridge <a class="header-anchor" href="#_2-docker-gwbridge" aria-label="Permalink to &quot;2.docker_gwbridge&quot;">​</a></h1><p>​ 它是一个桥接网络，将覆盖网络（包括 Ingress 网络）连接到每个 Docker 守护进程的物理网络。默认情况下，每个运行服务的容器都连接到本地 Docker 守护进程主机的 docker_gwbridge 网络。这个 docker_gwbridge 网络是在您初始化或加入 docker swarm 时创建的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker network create --attachable --driver overlay loadbalance_test2</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker service create --name loadbalance_test2 --network=testbackend --replicas 4 -p 99:80 utyk/swarm_loadbalance_check:1.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#安装</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install bridge-utils</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看网桥信息</span></span>
<span class="line"><span style="color:#e1e4e8;">brctl show</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#创建</span></span>
<span class="line"><span style="color:#e1e4e8;">docker network create  --subnet 172.18.0.0/16  --gateway 172.18.0.1  -o com.docker.network.bridge.enableicc=false  -o com.docker.network.bridge.name=dockergwbridge docker_gwbridge</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker network create --attachable --driver overlay loadbalance_test2</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker service create --name loadbalance_test2 --network=testbackend --replicas 4 -p 99:80 utyk/swarm_loadbalance_check:1.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#安装</span></span>
<span class="line"><span style="color:#24292e;">yum install bridge-utils</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看网桥信息</span></span>
<span class="line"><span style="color:#24292e;">brctl show</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#创建</span></span>
<span class="line"><span style="color:#24292e;">docker network create  --subnet 172.18.0.0/16  --gateway 172.18.0.1  -o com.docker.network.bridge.enableicc=false  -o com.docker.network.bridge.name=dockergwbridge docker_gwbridge</span></span></code></pre></div><p><a href="https://cloud.tencent.com/developer/article/1402614" target="_blank" rel="noreferrer">https://cloud.tencent.com/developer/article/1402614</a></p><p><a href="https://juejin.cn/post/7177971761156194360" target="_blank" rel="noreferrer">https://juejin.cn/post/7177971761156194360</a></p><p><a href="https://juejin.cn/post/7178865592537972773" target="_blank" rel="noreferrer">https://juejin.cn/post/7178865592537972773</a></p><p><a href="https://xie.infoq.cn/link?target=https%3A%2F%2Fwww.cnblogs.com%2Fyyxianren%2Fp%2F10892066.html" target="_blank" rel="noreferrer">docker 修改gwbridge ip address</a></p><p><a href="https://xie.infoq.cn/link?target=https%3A%2F%2Ftonybai.com%2F2016%2F10%2F11%2Fsome-problems-under-swarm-mode-in-docker-1-12%2F" target="_blank" rel="noreferrer">Docker 1.12 swarm模式下遇到的各种问题</a></p><p><a href="https://xie.infoq.cn/link?target=https%3A%2F%2Fwww.cnblogs.com%2Fbigberg%2Fp%2F8779302.html" target="_blank" rel="noreferrer">Swarm使用原生的overlay网络</a></p><p><a href="https://xie.infoq.cn/link?target=https%3A%2F%2Fchanjarster.github.io%2Fpost%2Fdocker-overlay-network%2F" target="_blank" rel="noreferrer">一种生产环境Docker Overlay Network的配置方案</a></p>`,19),o=[l];function p(c,t,i,d,k,g){return s(),a("div",null,o)}const y=e(r,[["render",p]]);export{h as __pageData,y as default};
