import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.部署环境准备","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/swarm/1.install.md","filePath":"guide/container/swarm/1.install.md","lastUpdated":1711706974000}'),l={name:"guide/container/swarm/1.install.md"},p=e(`<h1 id="_1-部署环境准备" tabindex="-1">1.部署环境准备 <a class="header-anchor" href="#_1-部署环境准备" aria-label="Permalink to &quot;1.部署环境准备&quot;">​</a></h1><p><code>swarm 至少需要三个节点 所以需要准备三台机器</code></p><ul><li>练习环境</li></ul><p><a href="https://labs.play-with-docker.com/" target="_blank" rel="noreferrer">https://labs.play-with-docker.com/</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#修改主机名</span></span>
<span class="line"><span style="color:#B392F0;">hostnamectl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set-hostname</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">manager-01</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#修改主机名</span></span>
<span class="line"><span style="color:#6F42C1;">hostnamectl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set-hostname</span><span style="color:#24292E;"> </span><span style="color:#032F62;">manager-01</span></span></code></pre></div><table><thead><tr><th>主机</th><th>ip地址</th><th>说明</th></tr></thead><tbody><tr><td>manager-01</td><td>192.168.177.130</td><td>swarm-manager节点</td></tr><tr><td>work-01</td><td>192.168.177.131</td><td>swarm-work01节点</td></tr><tr><td>work-02</td><td>192.168.177.129</td><td>swarm-work02节点</td></tr></tbody></table><p>docker版本：20.10.13</p><p>文档，<a href="https://docs.docker.com/engine/swarm/" target="_blank" rel="noreferrer">https://docs.docker.com/engine/swarm/</a></p><h2 id="容错节点" tabindex="-1">容错节点 <a class="header-anchor" href="#容错节点" aria-label="Permalink to &quot;容错节点&quot;">​</a></h2><p>管理节点以奇数形式存在，保证管理节点高可用</p><table><thead><tr><th style="text-align:center;">Swarm manager nodes</th><th style="text-align:center;">Repartition (on 3 Availability zones)</th></tr></thead><tbody><tr><td style="text-align:center;">3</td><td style="text-align:center;">1-1-1</td></tr><tr><td style="text-align:center;">5</td><td style="text-align:center;">2-2-1</td></tr><tr><td style="text-align:center;">7</td><td style="text-align:center;">3-2-2</td></tr><tr><td style="text-align:center;">9</td><td style="text-align:center;">3-3-3</td></tr></tbody></table><table><thead><tr><th style="text-align:center;">Swarm Size</th><th style="text-align:center;">Majority</th><th style="text-align:center;">Fault Tolerance</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">2</td><td style="text-align:center;">0</td></tr><tr><td style="text-align:center;"><strong>3</strong></td><td style="text-align:center;">2</td><td style="text-align:center;"><strong>1</strong></td></tr><tr><td style="text-align:center;">4</td><td style="text-align:center;">3</td><td style="text-align:center;">1</td></tr><tr><td style="text-align:center;"><strong>5</strong></td><td style="text-align:center;">3</td><td style="text-align:center;"><strong>2</strong></td></tr><tr><td style="text-align:center;">6</td><td style="text-align:center;">4</td><td style="text-align:center;">2</td></tr><tr><td style="text-align:center;"><strong>7</strong></td><td style="text-align:center;">4</td><td style="text-align:center;"><strong>3</strong></td></tr><tr><td style="text-align:center;">8</td><td style="text-align:center;">5</td><td style="text-align:center;">3</td></tr><tr><td style="text-align:center;"><strong>9</strong></td><td style="text-align:center;">5</td><td style="text-align:center;"><strong>4</strong></td></tr></tbody></table><h1 id="_2-初始化管理节点" tabindex="-1">2.初始化管理节点 <a class="header-anchor" href="#_2-初始化管理节点" aria-label="Permalink to &quot;2.初始化管理节点&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#advertise-addr 来指定其他节点连接m0时的地址</span></span>
<span class="line"><span style="color:#e1e4e8;">#来指定其他节点连接m0时的地址 来指定其他节点连接m0时的地址</span></span>
<span class="line"><span style="color:#e1e4e8;">#来指定其他节点连接m0时的地址</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker swarm init --advertise-addr 192.168.177.130:2377 --listen-addr</span></span>
<span class="line"><span style="color:#e1e4e8;">192.168.177.130:2377</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看节点信息</span></span>
<span class="line"><span style="color:#e1e4e8;">docker node ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看网络信息 docker-swarm 初始化时会创建一个类型为overlay的网络</span></span>
<span class="line"><span style="color:#e1e4e8;">docker network ls</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#advertise-addr 来指定其他节点连接m0时的地址</span></span>
<span class="line"><span style="color:#24292e;">#来指定其他节点连接m0时的地址 来指定其他节点连接m0时的地址</span></span>
<span class="line"><span style="color:#24292e;">#来指定其他节点连接m0时的地址</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker swarm init --advertise-addr 192.168.177.130:2377 --listen-addr</span></span>
<span class="line"><span style="color:#24292e;">192.168.177.130:2377</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看节点信息</span></span>
<span class="line"><span style="color:#24292e;">docker node ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看网络信息 docker-swarm 初始化时会创建一个类型为overlay的网络</span></span>
<span class="line"><span style="color:#24292e;">docker network ls</span></span></code></pre></div><h2 id="_2-1添加manager节点" tabindex="-1">2.1添加manager节点 <a class="header-anchor" href="#_2-1添加manager节点" aria-label="Permalink to &quot;2.1添加manager节点&quot;">​</a></h2><p><code>添加manager 节点 –token 会失效 时效为24小时 以后添加节点时 执行 docker swarm join-token 获取最新的token </code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#在manager节点执行。可以作为manager节点加入集群</span></span>
<span class="line"><span style="color:#e1e4e8;">docker swarm join-token -q manager</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#在manager节点执行。可以作为manager节点加入集群</span></span>
<span class="line"><span style="color:#24292e;">docker swarm join-token -q manager</span></span></code></pre></div><h2 id="_2-2添加worker节点" tabindex="-1">2.2添加worker节点 <a class="header-anchor" href="#_2-2添加worker节点" aria-label="Permalink to &quot;2.2添加worker节点&quot;">​</a></h2><p><code>节点 –token 会失效 时效为24小时 以后添加节点时 执行 docker swarm join-token 获取最新的token</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#在manager节点执行。可以作为worker节点加入集群</span></span>
<span class="line"><span style="color:#e1e4e8;">docker swarm join-token -q worker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#在manager节点执行。可以作为worker节点加入集群</span></span>
<span class="line"><span style="color:#24292e;">docker swarm join-token -q worker</span></span></code></pre></div><p>MANAGER STATUS列说明：</p><p>Leader 意味着该节点是使得群的所有群管理和编排决策的主要管理器节点。</p><p>：Reachable 意味着节点是管理者节点正在参与Raft共识。如果领导节点不可用，则该节点有资格被选为新领导者。</p><p>：Unavailable 意味着节点是不能与其他管理器通信的管理器。如果管理器节点不可用，您应该将新的管理器节点加入群集，或者将工作器节点升级为管理器。</p><p>AVAILABILITY列说明：</p><p>Active 意味着调度程序可以将任务分配给节点。</p><p>Pause 意味着调度程序不会将新任务分配给节点，但现有任务仍在运行。</p><p>Drain 意味着调度程序不会向节点分配新任务。调度程序关闭所有现有任务并在可用节点上调度它们</p><h2 id="_2-3-节点权限提升降低" tabindex="-1">2.3.节点权限提升降低 <a class="header-anchor" href="#_2-3-节点权限提升降低" aria-label="Permalink to &quot;2.3.节点权限提升降低&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#将worker节点提升为manager节点，在manager节点执行如下命令：</span></span>
<span class="line"><span style="color:#e1e4e8;">docker node promote hostname</span></span>
<span class="line"><span style="color:#e1e4e8;">docker node ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#将manager节点降低为worker节点，在manager节点执行如下命令：</span></span>
<span class="line"><span style="color:#e1e4e8;">docker node demote hostname</span></span>
<span class="line"><span style="color:#e1e4e8;">docker node ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#manager节点只用于管理集群，不希望部署服务。</span></span>
<span class="line"><span style="color:#e1e4e8;">docker node update --availability drain hostname</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@k8s-node01 ~]# docker node update  --help</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Usage:  docker node update [OPTIONS] NODE</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Update a node</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Options:</span></span>
<span class="line"><span style="color:#e1e4e8;">      --availability string   Availability of the node (&quot;active&quot;, &quot;pause&quot;, &quot;drain&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">      --label-add list        Add or update a node label (&quot;key=value&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">      --label-rm list         Remove a node label if exists</span></span>
<span class="line"><span style="color:#e1e4e8;">      --role string           Role of the node (&quot;worker&quot;, &quot;manager&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#将worker节点提升为manager节点，在manager节点执行如下命令：</span></span>
<span class="line"><span style="color:#24292e;">docker node promote hostname</span></span>
<span class="line"><span style="color:#24292e;">docker node ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#将manager节点降低为worker节点，在manager节点执行如下命令：</span></span>
<span class="line"><span style="color:#24292e;">docker node demote hostname</span></span>
<span class="line"><span style="color:#24292e;">docker node ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#manager节点只用于管理集群，不希望部署服务。</span></span>
<span class="line"><span style="color:#24292e;">docker node update --availability drain hostname</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@k8s-node01 ~]# docker node update  --help</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Usage:  docker node update [OPTIONS] NODE</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Update a node</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Options:</span></span>
<span class="line"><span style="color:#24292e;">      --availability string   Availability of the node (&quot;active&quot;, &quot;pause&quot;, &quot;drain&quot;)</span></span>
<span class="line"><span style="color:#24292e;">      --label-add list        Add or update a node label (&quot;key=value&quot;)</span></span>
<span class="line"><span style="color:#24292e;">      --label-rm list         Remove a node label if exists</span></span>
<span class="line"><span style="color:#24292e;">      --role string           Role of the node (&quot;worker&quot;, &quot;manager&quot;)</span></span></code></pre></div><h2 id="_2-4脱离集群" tabindex="-1">2.4脱离集群 <a class="header-anchor" href="#_2-4脱离集群" aria-label="Permalink to &quot;2.4脱离集群&quot;">​</a></h2><p><strong>各个节点离开集群（必须先是node节点离开集群，然后manager节点才能离开集群）</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#想要那个节点脱离集群就在那个节点下执行以下命令</span></span>
<span class="line"><span style="color:#e1e4e8;">docker swarm leave</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#想要那个节点脱离集群就在那个节点下执行以下命令</span></span>
<span class="line"><span style="color:#24292e;">docker swarm leave</span></span></code></pre></div><h2 id="_2-5删除已经脱离集群的节点" tabindex="-1">2.5删除已经脱离集群的节点 <a class="header-anchor" href="#_2-5删除已经脱离集群的节点" aria-label="Permalink to &quot;2.5删除已经脱离集群的节点&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#删除已经脱离集群的work-02节点 ,,如果是多个manager节点中的其中一个节点需要先将节点降为worker节点才能删除</span></span>
<span class="line"><span style="color:#e1e4e8;">docker node rm work-02</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#manager节点只能强制退出 manager退出后意味着整个swarm不复存在。</span></span>
<span class="line"><span style="color:#e1e4e8;">docker swarm leave --force</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#删除已经脱离集群的work-02节点 ,,如果是多个manager节点中的其中一个节点需要先将节点降为worker节点才能删除</span></span>
<span class="line"><span style="color:#24292e;">docker node rm work-02</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#manager节点只能强制退出 manager退出后意味着整个swarm不复存在。</span></span>
<span class="line"><span style="color:#24292e;">docker swarm leave --force</span></span></code></pre></div><h1 id="_3-图形界面" tabindex="-1">3.图形界面 <a class="header-anchor" href="#_3-图形界面" aria-label="Permalink to &quot;3.图形界面&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> docker run -itd --name visualizer -p 8099:8080 -e HOST=192.168.59.16 -e PORT=8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer:latest</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #或者使用以下命令  可以通过集群中所有ip+port进行访问</span></span>
<span class="line"><span style="color:#e1e4e8;"> docker service create \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--name=viz \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--publish=8080:8080/tcp \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--constraint=node.role==manager \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \\</span></span>
<span class="line"><span style="color:#e1e4e8;">dockersamples/visualizer</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> docker run -itd --name visualizer -p 8099:8080 -e HOST=192.168.59.16 -e PORT=8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer:latest</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #或者使用以下命令  可以通过集群中所有ip+port进行访问</span></span>
<span class="line"><span style="color:#24292e;"> docker service create \\</span></span>
<span class="line"><span style="color:#24292e;">--name=viz \\</span></span>
<span class="line"><span style="color:#24292e;">--publish=8080:8080/tcp \\</span></span>
<span class="line"><span style="color:#24292e;">--constraint=node.role==manager \\</span></span>
<span class="line"><span style="color:#24292e;">--mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \\</span></span>
<span class="line"><span style="color:#24292e;">dockersamples/visualizer</span></span></code></pre></div><ul><li>weavescope</li></ul><h1 id="_4-stack命令" tabindex="-1">4.stack命令 <a class="header-anchor" href="#_4-stack命令" aria-label="Permalink to &quot;4.stack命令&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#在manager节点中创建docker-compose.yml文件。执行如下命令：</span></span>
<span class="line"><span style="color:#e1e4e8;">docker stack deploy nginx-stack --compose-file=docker-compose.yml 或者是</span></span>
<span class="line"><span style="color:#e1e4e8;">docker stack deploy nginx-stack -c docker-compose.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">#查看stack服务运行情况。执行如下命令：</span></span>
<span class="line"><span style="color:#e1e4e8;">docker stack services nginx-stack</span></span>
<span class="line"><span style="color:#e1e4e8;">#查看5个容器运行在哪个节点中。执行如下命令：</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service ls #查看到NAME中的服务名为：nginx-stack_nginx-web</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service ps nginx-stack_nginx-web</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#在manager节点中创建docker-compose.yml文件。执行如下命令：</span></span>
<span class="line"><span style="color:#24292e;">docker stack deploy nginx-stack --compose-file=docker-compose.yml 或者是</span></span>
<span class="line"><span style="color:#24292e;">docker stack deploy nginx-stack -c docker-compose.yml</span></span>
<span class="line"><span style="color:#24292e;">#查看stack服务运行情况。执行如下命令：</span></span>
<span class="line"><span style="color:#24292e;">docker stack services nginx-stack</span></span>
<span class="line"><span style="color:#24292e;">#查看5个容器运行在哪个节点中。执行如下命令：</span></span>
<span class="line"><span style="color:#24292e;">docker service ls #查看到NAME中的服务名为：nginx-stack_nginx-web</span></span>
<span class="line"><span style="color:#24292e;">docker service ps nginx-stack_nginx-web</span></span></code></pre></div><h1 id="_5-常用命令" tabindex="-1">5.常用命令 <a class="header-anchor" href="#_5-常用命令" aria-label="Permalink to &quot;5.常用命令&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建服务</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service create \\  </span></span>
<span class="line"><span style="color:#e1e4e8;">  --image nginx \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  --replicas 2 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  nginx </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 更新服务</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service update \\  </span></span>
<span class="line"><span style="color:#e1e4e8;">  --image nginx:alpine \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  nginx </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除服务</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service rm nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 减少服务实例(这比直接删除服务要好)</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service scale nginx=0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 增加服务实例</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service scale nginx=5</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看所有服务</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看服务的容器状态</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service ps nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看服务的详细信息。</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service inspect nginx  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">实现零宕机部署也非常简单。这样也可以方便地实现持续部署:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 构建新镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">docker build -t hub.docker.com/image . </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 将新镜像上传到Docker仓库</span></span>
<span class="line"><span style="color:#e1e4e8;">docker push hub.docker.com/image</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 更新服务的镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service update --image hub.docker.com/image service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建服务</span></span>
<span class="line"><span style="color:#24292e;">docker service create \\  </span></span>
<span class="line"><span style="color:#24292e;">  --image nginx \\</span></span>
<span class="line"><span style="color:#24292e;">  --replicas 2 \\</span></span>
<span class="line"><span style="color:#24292e;">  nginx </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 更新服务</span></span>
<span class="line"><span style="color:#24292e;">docker service update \\  </span></span>
<span class="line"><span style="color:#24292e;">  --image nginx:alpine \\</span></span>
<span class="line"><span style="color:#24292e;">  nginx </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 删除服务</span></span>
<span class="line"><span style="color:#24292e;">docker service rm nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 减少服务实例(这比直接删除服务要好)</span></span>
<span class="line"><span style="color:#24292e;">docker service scale nginx=0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 增加服务实例</span></span>
<span class="line"><span style="color:#24292e;">docker service scale nginx=5</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看所有服务</span></span>
<span class="line"><span style="color:#24292e;">docker service ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看服务的容器状态</span></span>
<span class="line"><span style="color:#24292e;">docker service ps nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看服务的详细信息。</span></span>
<span class="line"><span style="color:#24292e;">docker service inspect nginx  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">实现零宕机部署也非常简单。这样也可以方便地实现持续部署:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 构建新镜像</span></span>
<span class="line"><span style="color:#24292e;">docker build -t hub.docker.com/image . </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 将新镜像上传到Docker仓库</span></span>
<span class="line"><span style="color:#24292e;">docker push hub.docker.com/image</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 更新服务的镜像</span></span>
<span class="line"><span style="color:#24292e;">docker service update --image hub.docker.com/image service</span></span></code></pre></div><h2 id="swarm" tabindex="-1">swarm <a class="header-anchor" href="#swarm" aria-label="Permalink to &quot;swarm&quot;">​</a></h2><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>docker swarm join</td><td>初始化一个 swarm 群集</td></tr><tr><td>docker swarm join</td><td>加入群集作为节点或管理器</td></tr><tr><td>docker swarm join-token</td><td>管理用于加入群集的令牌</td></tr><tr><td>docker swarm leave</td><td>离开 swarm 群集</td></tr><tr><td>docker swarm update</td><td>更新 swarm 群集</td></tr><tr><td>docker swarm unlock</td><td>解锁 swarm 群集</td></tr><tr><td>docker swarm unlock-key</td><td>管理解锁钥匙</td></tr></tbody></table><h2 id="node" tabindex="-1">node <a class="header-anchor" href="#node" aria-label="Permalink to &quot;node&quot;">​</a></h2><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>docker node demote</td><td>从 swarm 群集管理器中降级一个或多个节点</td></tr><tr><td>docker node inspect</td><td>显示一个或多个节点的详细信息</td></tr><tr><td>docker node ls</td><td>列出 swarm 群集中的节点</td></tr><tr><td>docker node promote</td><td>将一个或多个节点推入到群集管理器中</td></tr><tr><td>docker node ps</td><td>列出在一个或多个节点上运行的任务，默认为当前节点</td></tr><tr><td>docker node rm</td><td>从 swarm 群集删除一个或多个节点</td></tr><tr><td>docker node update</td><td>更新一个节点</td></tr></tbody></table><h2 id="service" tabindex="-1">service <a class="header-anchor" href="#service" aria-label="Permalink to &quot;service&quot;">​</a></h2><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>docker service create</td><td>创建服务</td></tr><tr><td>docker service inspect</td><td>显示一个或多个服务的详细信息</td></tr><tr><td>docker service logs</td><td>获取服务的日志</td></tr><tr><td>docker service ls</td><td>列出服务</td></tr><tr><td>docker service rm</td><td>删除一个或多个服务</td></tr><tr><td>docker service scale</td><td>设置服务的实例数量</td></tr><tr><td>docker service update</td><td>更新服务</td></tr><tr><td>docker service rollback</td><td>恢复服务至update之前的配置</td></tr></tbody></table><h2 id="stack" tabindex="-1">stack <a class="header-anchor" href="#stack" aria-label="Permalink to &quot;stack&quot;">​</a></h2><table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>docker stack deploy</td><td>部署新的堆栈或更新现有堆栈</td></tr><tr><td>docker stack ls</td><td>列出现有堆栈</td></tr><tr><td>docker stack ps</td><td>列出堆栈中的任务</td></tr><tr><td>docker stack rm</td><td>删除一个或多个堆栈</td></tr><tr><td>docker stack services</td><td>列出堆栈中的服务</td></tr></tbody></table><h1 id="_6-清理任务" tabindex="-1">6.清理任务 <a class="header-anchor" href="#_6-清理任务" aria-label="Permalink to &quot;6.清理任务&quot;">​</a></h1><p>Docker Swarm 的 global mode 为所有的 Docker 节点启动一个清理服务副本, 实现新节点加入时自动启动与配置更新时自动同步到所有节点</p><p>创建 docker-compose.yml 文件, 内容如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># docker-compose 文件版本, 需与 docker engine 兼容, 否则启动失败</span></span>
<span class="line"><span style="color:#e1e4e8;"># https://docs.docker.com/compose/compose-file/#compose-and-docker-compatibility-matrix</span></span>
<span class="line"><span style="color:#e1e4e8;">version: &quot;3.8&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置时区为宿主机时区</span></span>
<span class="line"><span style="color:#e1e4e8;">x-bind-timezone:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - &amp;bind-localtime</span></span>
<span class="line"><span style="color:#e1e4e8;">    type: bind</span></span>
<span class="line"><span style="color:#e1e4e8;">    source: /etc/localtime</span></span>
<span class="line"><span style="color:#e1e4e8;">    target: /etc/localtime</span></span>
<span class="line"><span style="color:#e1e4e8;">    read_only: true</span></span>
<span class="line"><span style="color:#e1e4e8;">  - &amp;bind-timezone</span></span>
<span class="line"><span style="color:#e1e4e8;">    type: bind</span></span>
<span class="line"><span style="color:#e1e4e8;">    source: /etc/timezone</span></span>
<span class="line"><span style="color:#e1e4e8;">    target: /etc/timezone</span></span>
<span class="line"><span style="color:#e1e4e8;">    read_only: true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">  docker-prune:</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 请将镜像 tag 修改为宿主机的 docker 版本</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: docker:19.03.13</span></span>
<span class="line"><span style="color:#e1e4e8;">    # https://docs.docker.com/engine/swarm/services/#create-services-using-templates</span></span>
<span class="line"><span style="color:#e1e4e8;">    hostname: &quot;docker-prune-{{.Node.Hostname}}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    entrypoint: docker-entrypoint.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 保持时区与宿主机一致(北京时间)</span></span>
<span class="line"><span style="color:#e1e4e8;">      - *bind-localtime</span></span>
<span class="line"><span style="color:#e1e4e8;">      - *bind-timezone</span></span>
<span class="line"><span style="color:#e1e4e8;">      - type: bind</span></span>
<span class="line"><span style="color:#e1e4e8;">        source: /var/run/docker.sock</span></span>
<span class="line"><span style="color:#e1e4e8;">        target: /var/run/docker.sock</span></span>
<span class="line"><span style="color:#e1e4e8;">    configs:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - source: docker-entrypoint</span></span>
<span class="line"><span style="color:#e1e4e8;">        target: /usr/local/bin/docker-entrypoint.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 赋予执行权限</span></span>
<span class="line"><span style="color:#e1e4e8;">        mode: 0555</span></span>
<span class="line"><span style="color:#e1e4e8;">      - source: run</span></span>
<span class="line"><span style="color:#e1e4e8;">        target: /usr/local/bin/run.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 赋予执行权限</span></span>
<span class="line"><span style="color:#e1e4e8;">        mode: 0555</span></span>
<span class="line"><span style="color:#e1e4e8;">    environment:</span></span>
<span class="line"><span style="color:#e1e4e8;">      # cron 表达式, 必配 https://crontab.guru/</span></span>
<span class="line"><span style="color:#e1e4e8;">      CRON: &quot;0 3 * * *&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 清理匹配到的镜像, 选配</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 一般用于在自己或公司名下的项目镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 因为该类镜像会频繁的发布与更新, 而更新后上个版本理论上可以删除</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 如果不配置或者为空则忽略该步骤</span></span>
<span class="line"><span style="color:#e1e4e8;">      PRUNE_IMAGE_BY_GREP: abc</span></span>
<span class="line"><span style="color:#e1e4e8;">    deploy:</span></span>
<span class="line"><span style="color:#e1e4e8;">      # global 模式, 在所有的 docker 节点上都会启动一份副本, 以达到 docker 节点新增时自动启动</span></span>
<span class="line"><span style="color:#e1e4e8;">      mode: global</span></span>
<span class="line"><span style="color:#e1e4e8;"># 在此处配置使用的网络, 如果不配置, docker 会创建一个默认网络 docker-prune_default</span></span>
<span class="line"><span style="color:#e1e4e8;"># 建议先创建一个外部网络, 然后使用改网络</span></span>
<span class="line"><span style="color:#e1e4e8;">#    networks:</span></span>
<span class="line"><span style="color:#e1e4e8;">#      swarm_webnet:</span></span>
<span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">#networks:</span></span>
<span class="line"><span style="color:#e1e4e8;">#  swarm_webnet:</span></span>
<span class="line"><span style="color:#e1e4e8;">#    # 是否为外部网络</span></span>
<span class="line"><span style="color:#e1e4e8;">#    external: true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configs:</span></span>
<span class="line"><span style="color:#e1e4e8;">  docker-entrypoint:</span></span>
<span class="line"><span style="color:#e1e4e8;">    file: ./docker-entrypoint.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">  run:</span></span>
<span class="line"><span style="color:#e1e4e8;">    file: ./run.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># docker-compose 文件版本, 需与 docker engine 兼容, 否则启动失败</span></span>
<span class="line"><span style="color:#24292e;"># https://docs.docker.com/compose/compose-file/#compose-and-docker-compatibility-matrix</span></span>
<span class="line"><span style="color:#24292e;">version: &quot;3.8&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 配置时区为宿主机时区</span></span>
<span class="line"><span style="color:#24292e;">x-bind-timezone:</span></span>
<span class="line"><span style="color:#24292e;">  - &amp;bind-localtime</span></span>
<span class="line"><span style="color:#24292e;">    type: bind</span></span>
<span class="line"><span style="color:#24292e;">    source: /etc/localtime</span></span>
<span class="line"><span style="color:#24292e;">    target: /etc/localtime</span></span>
<span class="line"><span style="color:#24292e;">    read_only: true</span></span>
<span class="line"><span style="color:#24292e;">  - &amp;bind-timezone</span></span>
<span class="line"><span style="color:#24292e;">    type: bind</span></span>
<span class="line"><span style="color:#24292e;">    source: /etc/timezone</span></span>
<span class="line"><span style="color:#24292e;">    target: /etc/timezone</span></span>
<span class="line"><span style="color:#24292e;">    read_only: true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">  docker-prune:</span></span>
<span class="line"><span style="color:#24292e;">    # 请将镜像 tag 修改为宿主机的 docker 版本</span></span>
<span class="line"><span style="color:#24292e;">    image: docker:19.03.13</span></span>
<span class="line"><span style="color:#24292e;">    # https://docs.docker.com/engine/swarm/services/#create-services-using-templates</span></span>
<span class="line"><span style="color:#24292e;">    hostname: &quot;docker-prune-{{.Node.Hostname}}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    entrypoint: docker-entrypoint.sh</span></span>
<span class="line"><span style="color:#24292e;">    volumes:</span></span>
<span class="line"><span style="color:#24292e;">      # 保持时区与宿主机一致(北京时间)</span></span>
<span class="line"><span style="color:#24292e;">      - *bind-localtime</span></span>
<span class="line"><span style="color:#24292e;">      - *bind-timezone</span></span>
<span class="line"><span style="color:#24292e;">      - type: bind</span></span>
<span class="line"><span style="color:#24292e;">        source: /var/run/docker.sock</span></span>
<span class="line"><span style="color:#24292e;">        target: /var/run/docker.sock</span></span>
<span class="line"><span style="color:#24292e;">    configs:</span></span>
<span class="line"><span style="color:#24292e;">      - source: docker-entrypoint</span></span>
<span class="line"><span style="color:#24292e;">        target: /usr/local/bin/docker-entrypoint.sh</span></span>
<span class="line"><span style="color:#24292e;">        # 赋予执行权限</span></span>
<span class="line"><span style="color:#24292e;">        mode: 0555</span></span>
<span class="line"><span style="color:#24292e;">      - source: run</span></span>
<span class="line"><span style="color:#24292e;">        target: /usr/local/bin/run.sh</span></span>
<span class="line"><span style="color:#24292e;">        # 赋予执行权限</span></span>
<span class="line"><span style="color:#24292e;">        mode: 0555</span></span>
<span class="line"><span style="color:#24292e;">    environment:</span></span>
<span class="line"><span style="color:#24292e;">      # cron 表达式, 必配 https://crontab.guru/</span></span>
<span class="line"><span style="color:#24292e;">      CRON: &quot;0 3 * * *&quot;</span></span>
<span class="line"><span style="color:#24292e;">      # 清理匹配到的镜像, 选配</span></span>
<span class="line"><span style="color:#24292e;">      # 一般用于在自己或公司名下的项目镜像</span></span>
<span class="line"><span style="color:#24292e;">      # 因为该类镜像会频繁的发布与更新, 而更新后上个版本理论上可以删除</span></span>
<span class="line"><span style="color:#24292e;">      # 如果不配置或者为空则忽略该步骤</span></span>
<span class="line"><span style="color:#24292e;">      PRUNE_IMAGE_BY_GREP: abc</span></span>
<span class="line"><span style="color:#24292e;">    deploy:</span></span>
<span class="line"><span style="color:#24292e;">      # global 模式, 在所有的 docker 节点上都会启动一份副本, 以达到 docker 节点新增时自动启动</span></span>
<span class="line"><span style="color:#24292e;">      mode: global</span></span>
<span class="line"><span style="color:#24292e;"># 在此处配置使用的网络, 如果不配置, docker 会创建一个默认网络 docker-prune_default</span></span>
<span class="line"><span style="color:#24292e;"># 建议先创建一个外部网络, 然后使用改网络</span></span>
<span class="line"><span style="color:#24292e;">#    networks:</span></span>
<span class="line"><span style="color:#24292e;">#      swarm_webnet:</span></span>
<span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">#networks:</span></span>
<span class="line"><span style="color:#24292e;">#  swarm_webnet:</span></span>
<span class="line"><span style="color:#24292e;">#    # 是否为外部网络</span></span>
<span class="line"><span style="color:#24292e;">#    external: true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configs:</span></span>
<span class="line"><span style="color:#24292e;">  docker-entrypoint:</span></span>
<span class="line"><span style="color:#24292e;">    file: ./docker-entrypoint.sh</span></span>
<span class="line"><span style="color:#24292e;">  run:</span></span>
<span class="line"><span style="color:#24292e;">    file: ./run.sh</span></span></code></pre></div><p>其中会用到两个脚本, 需与 docker-compose.yml 在同一文件夹中</p><ul><li>docker-entrypoint.sh</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># https://blog.knoldus.com/running-a-cron-job-in-docker-container/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Start the run once job.</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;Docker container has been started&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">touch /var/log/cron.log</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># Setup a cron schedule</span></span>
<span class="line"><span style="color:#e1e4e8;">echo &quot;\${CRON} run.sh &gt;&gt; /var/log/cron.log 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#e1e4e8;"># This extra line makes it a valid cron&quot; &gt;scheduler.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置定时任务</span></span>
<span class="line"><span style="color:#e1e4e8;">crontab scheduler.txt</span></span>
<span class="line"><span style="color:#e1e4e8;"># 后台启动定时任务</span></span>
<span class="line"><span style="color:#e1e4e8;">crond</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看定时任务执行日志</span></span>
<span class="line"><span style="color:#e1e4e8;">tail -f /var/log/cron.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># https://blog.knoldus.com/running-a-cron-job-in-docker-container/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Start the run once job.</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;Docker container has been started&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">touch /var/log/cron.log</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># Setup a cron schedule</span></span>
<span class="line"><span style="color:#24292e;">echo &quot;\${CRON} run.sh &gt;&gt; /var/log/cron.log 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#24292e;"># This extra line makes it a valid cron&quot; &gt;scheduler.txt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 配置定时任务</span></span>
<span class="line"><span style="color:#24292e;">crontab scheduler.txt</span></span>
<span class="line"><span style="color:#24292e;"># 后台启动定时任务</span></span>
<span class="line"><span style="color:#24292e;">crond</span></span>
<span class="line"><span style="color:#24292e;"># 查看定时任务执行日志</span></span>
<span class="line"><span style="color:#24292e;">tail -f /var/log/cron.log</span></span></code></pre></div><ul><li>run.sh</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 清理容器</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\\n清理容器 begin&quot;</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">container</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prune</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--force</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;清理容器 end&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 清理镜像</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\\n清理悬空镜像 begin&quot;</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">image</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prune</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--force</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;清理悬空镜像 end&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 清理匹配到的镜像</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> [ </span><span style="color:#9ECBFF;">&quot;\${</span><span style="color:#E1E4E8;">PRUNE_IMAGE_BY_GREP</span><span style="color:#9ECBFF;">}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> ]; </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 如果镜像被使用, 则删除失败</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\\n清理匹配到的镜像 begin&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">images</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\${</span><span style="color:#E1E4E8;">PRUNE_IMAGE_BY_GREP</span><span style="color:#9ECBFF;">}&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">awk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{print $3 }&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">xargs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rmi</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;清理项目镜像 end&quot;</span></span>
<span class="line"><span style="color:#F97583;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 清理容器</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\\n清理容器 begin&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">container</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prune</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--force</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;清理容器 end&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 清理镜像</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\\n清理悬空镜像 begin&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">image</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prune</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--force</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;清理悬空镜像 end&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 清理匹配到的镜像</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> [ </span><span style="color:#032F62;">&quot;\${</span><span style="color:#24292E;">PRUNE_IMAGE_BY_GREP</span><span style="color:#032F62;">}&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> ]; </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 如果镜像被使用, 则删除失败</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\\n清理匹配到的镜像 begin&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">images</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\${</span><span style="color:#24292E;">PRUNE_IMAGE_BY_GREP</span><span style="color:#032F62;">}&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">awk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{print $3 }&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">xargs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rmi</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;清理项目镜像 end&quot;</span></span>
<span class="line"><span style="color:#D73A49;">fi</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stack</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deploy</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--compose-file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-compose.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-prune</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stack</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-prune</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#更新</span></span>
<span class="line"><span style="color:#6A737D;"># 先停止, 再启动, 因为使用到了 docker config, 无法直接更新</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stack</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-prune</span><span style="color:#E1E4E8;"> &amp;&amp; </span><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stack</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deploy</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--compose-file</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-compose.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker-prune</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stack</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deploy</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--compose-file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-compose.yml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-prune</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#删除</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stack</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-prune</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#更新</span></span>
<span class="line"><span style="color:#6A737D;"># 先停止, 再启动, 因为使用到了 docker config, 无法直接更新</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stack</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-prune</span><span style="color:#24292E;"> &amp;&amp; </span><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stack</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deploy</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--compose-file</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-compose.yml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker-prune</span></span></code></pre></div><h1 id="_7-集群服务管理" tabindex="-1">7.集群服务管理 <a class="header-anchor" href="#_7-集群服务管理" aria-label="Permalink to &quot;7.集群服务管理&quot;">​</a></h1><h2 id="_7-1创建服务" tabindex="-1">7.1创建服务 <a class="header-anchor" href="#_7-1创建服务" aria-label="Permalink to &quot;7.1创建服务&quot;">​</a></h2><p>Docker 提供了 <code>docker stack</code> 命令集，用来在 docker swarm 中部署服务及更新服务，我们可以提前将服务的定义写入一个 <code>docker-compose.yml</code> 文件，然后交由 docker stack deploy\` 命令去执行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># ./docker-compose.yml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">version: &#39;3.6&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">  nginx:</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: nginx:1.17.6-alpine</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;80:80&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    networks:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - swarm_net</span></span>
<span class="line"><span style="color:#e1e4e8;">    deploy:</span></span>
<span class="line"><span style="color:#e1e4e8;">      mode: replicated</span></span>
<span class="line"><span style="color:#e1e4e8;">      replicas: 5</span></span>
<span class="line"><span style="color:#e1e4e8;">      restart_policy:</span></span>
<span class="line"><span style="color:#e1e4e8;">        condition: on-failure</span></span>
<span class="line"><span style="color:#e1e4e8;">        delay: 5s</span></span>
<span class="line"><span style="color:#e1e4e8;">        max_attempts: 3</span></span>
<span class="line"><span style="color:#e1e4e8;">        window: 120s</span></span>
<span class="line"><span style="color:#e1e4e8;">      update_config:</span></span>
<span class="line"><span style="color:#e1e4e8;">        parallelism: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">        delay: 5s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">networks:</span></span>
<span class="line"><span style="color:#e1e4e8;">  swarm_net:</span></span>
<span class="line"><span style="color:#e1e4e8;">    driver: overlay</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># ./docker-compose.yml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">version: &#39;3.6&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">  nginx:</span></span>
<span class="line"><span style="color:#24292e;">    image: nginx:1.17.6-alpine</span></span>
<span class="line"><span style="color:#24292e;">    ports:</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;80:80&quot;</span></span>
<span class="line"><span style="color:#24292e;">    networks:</span></span>
<span class="line"><span style="color:#24292e;">      - swarm_net</span></span>
<span class="line"><span style="color:#24292e;">    deploy:</span></span>
<span class="line"><span style="color:#24292e;">      mode: replicated</span></span>
<span class="line"><span style="color:#24292e;">      replicas: 5</span></span>
<span class="line"><span style="color:#24292e;">      restart_policy:</span></span>
<span class="line"><span style="color:#24292e;">        condition: on-failure</span></span>
<span class="line"><span style="color:#24292e;">        delay: 5s</span></span>
<span class="line"><span style="color:#24292e;">        max_attempts: 3</span></span>
<span class="line"><span style="color:#24292e;">        window: 120s</span></span>
<span class="line"><span style="color:#24292e;">      update_config:</span></span>
<span class="line"><span style="color:#24292e;">        parallelism: 2</span></span>
<span class="line"><span style="color:#24292e;">        delay: 5s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">networks:</span></span>
<span class="line"><span style="color:#24292e;">  swarm_net:</span></span>
<span class="line"><span style="color:#24292e;">    driver: overlay</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># ./deploy-nginx-service.yml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">---</span></span>
<span class="line"><span style="color:#e1e4e8;">- name: Deploy services to docker swarm cluster</span></span>
<span class="line"><span style="color:#e1e4e8;">  gather_facts: no</span></span>
<span class="line"><span style="color:#e1e4e8;">  hosts: leader</span></span>
<span class="line"><span style="color:#e1e4e8;">  vars:</span></span>
<span class="line"><span style="color:#e1e4e8;">    src_docker_compose: ./docker-compose.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">    dest_docker_compose: ~/docker-compose.yml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    stack_name: first_stack</span></span>
<span class="line"><span style="color:#e1e4e8;">  tasks:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - name: Upload docker compose file</span></span>
<span class="line"><span style="color:#e1e4e8;">      template:</span></span>
<span class="line"><span style="color:#e1e4e8;">        src: &quot;{{ src_docker_compose }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        dest: &quot;{{ dest_docker_compose }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    - name: Deploy services</span></span>
<span class="line"><span style="color:#e1e4e8;">      shell: docker stack deploy --with-registry-auth --prune --compose-file {{ dest_docker_compose }} {{ stack_name }}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    - name: Pause for 10 seconds to wait for services being running</span></span>
<span class="line"><span style="color:#e1e4e8;">      pause:</span></span>
<span class="line"><span style="color:#e1e4e8;">        seconds: 10</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    - name: Ensure services deployed</span></span>
<span class="line"><span style="color:#e1e4e8;">      shell: docker service ls</span></span>
<span class="line"><span style="color:#e1e4e8;">      register: service_output</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    - name: Output service list</span></span>
<span class="line"><span style="color:#e1e4e8;">      debug:</span></span>
<span class="line"><span style="color:#e1e4e8;">        msg: &quot;{{ service_output.stdout_lines }}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    - name: Show stacks</span></span>
<span class="line"><span style="color:#e1e4e8;">      shell: docker stack ls</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># ./deploy-nginx-service.yml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">---</span></span>
<span class="line"><span style="color:#24292e;">- name: Deploy services to docker swarm cluster</span></span>
<span class="line"><span style="color:#24292e;">  gather_facts: no</span></span>
<span class="line"><span style="color:#24292e;">  hosts: leader</span></span>
<span class="line"><span style="color:#24292e;">  vars:</span></span>
<span class="line"><span style="color:#24292e;">    src_docker_compose: ./docker-compose.yml</span></span>
<span class="line"><span style="color:#24292e;">    dest_docker_compose: ~/docker-compose.yml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    stack_name: first_stack</span></span>
<span class="line"><span style="color:#24292e;">  tasks:</span></span>
<span class="line"><span style="color:#24292e;">    - name: Upload docker compose file</span></span>
<span class="line"><span style="color:#24292e;">      template:</span></span>
<span class="line"><span style="color:#24292e;">        src: &quot;{{ src_docker_compose }}&quot;</span></span>
<span class="line"><span style="color:#24292e;">        dest: &quot;{{ dest_docker_compose }}&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    - name: Deploy services</span></span>
<span class="line"><span style="color:#24292e;">      shell: docker stack deploy --with-registry-auth --prune --compose-file {{ dest_docker_compose }} {{ stack_name }}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    - name: Pause for 10 seconds to wait for services being running</span></span>
<span class="line"><span style="color:#24292e;">      pause:</span></span>
<span class="line"><span style="color:#24292e;">        seconds: 10</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    - name: Ensure services deployed</span></span>
<span class="line"><span style="color:#24292e;">      shell: docker service ls</span></span>
<span class="line"><span style="color:#24292e;">      register: service_output</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    - name: Output service list</span></span>
<span class="line"><span style="color:#24292e;">      debug:</span></span>
<span class="line"><span style="color:#24292e;">        msg: &quot;{{ service_output.stdout_lines }}&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    - name: Show stacks</span></span>
<span class="line"><span style="color:#24292e;">      shell: docker stack ls</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">ansible-playbook</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-i</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">hosts.ini</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./deploy-nginx-service.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">ansible-playbook</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-i</span><span style="color:#24292E;"> </span><span style="color:#032F62;">hosts.ini</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./deploy-nginx-service.yml</span></span></code></pre></div><h3 id="manager节点创建服务" tabindex="-1"><em>Manager节点创建服务</em> <a class="header-anchor" href="#manager节点创建服务" aria-label="Permalink to &quot;*Manager节点创建服务*&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#使用Manager节点创建服务</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service create --replicas 1 --name myhello -p 8000:8000 --constraint &#39;node.role==manager&#39; kentalk/helloword</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#使用Manager节点扩缩容服务</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service scale myhello=3 --constraint &#39;node.role==manager&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#使用Manager节点创建服务</span></span>
<span class="line"><span style="color:#24292e;">docker service create --replicas 1 --name myhello -p 8000:8000 --constraint &#39;node.role==manager&#39; kentalk/helloword</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#使用Manager节点扩缩容服务</span></span>
<span class="line"><span style="color:#24292e;">docker service scale myhello=3 --constraint &#39;node.role==manager&#39;</span></span></code></pre></div><h3 id="worker节点部署服务" tabindex="-1">Worker节点部署服务 <a class="header-anchor" href="#worker节点部署服务" aria-label="Permalink to &quot;Worker节点部署服务&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#work节点创建服务</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service create --replicas 1 --name myhello -p 8000:8000 --constraint &#39;node.role==worker&#39; kentalk/helloworld</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#扩容</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service scale myhello=3 --constraint &#39;node.role==worker&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#work节点创建服务</span></span>
<span class="line"><span style="color:#24292e;">docker service create --replicas 1 --name myhello -p 8000:8000 --constraint &#39;node.role==worker&#39; kentalk/helloworld</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#扩容</span></span>
<span class="line"><span style="color:#24292e;">docker service scale myhello=3 --constraint &#39;node.role==worker&#39;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service create --replicas 1 --name web01 nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service create --replicas 1 --name web01 nginx</span></span></code></pre></div><h2 id="_7-2显示服务详细信息" tabindex="-1">7.2显示服务详细信息 <a class="header-anchor" href="#_7-2显示服务详细信息" aria-label="Permalink to &quot;7.2显示服务详细信息&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service inspect --pretty web01</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#返回json格式</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service inspect web01</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service inspect --pretty web01</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#返回json格式</span></span>
<span class="line"><span style="color:#24292e;">docker service inspect web01</span></span></code></pre></div><h2 id="_7-3扩容和缩容" tabindex="-1">7.3扩容和缩容 <a class="header-anchor" href="#_7-3扩容和缩容" aria-label="Permalink to &quot;7.3扩容和缩容&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service scale web01=3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service scale web01=3</span></span></code></pre></div><h2 id="_7-4查看服务任务" tabindex="-1">7.4查看服务任务 <a class="header-anchor" href="#_7-4查看服务任务" aria-label="Permalink to &quot;7.4查看服务任务&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看所有service</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看web01</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service ps web01</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看运行状态的service</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service ps -f &#39;desired-state=running&#39; web01</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看所有service</span></span>
<span class="line"><span style="color:#24292e;">docker service ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看web01</span></span>
<span class="line"><span style="color:#24292e;">docker service ps web01</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看运行状态的service</span></span>
<span class="line"><span style="color:#24292e;">docker service ps -f &#39;desired-state=running&#39; web01</span></span></code></pre></div><h2 id="_7-5滚动更新服务" tabindex="-1">7.5滚动更新服务 <a class="header-anchor" href="#_7-5滚动更新服务" aria-label="Permalink to &quot;7.5滚动更新服务&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#创建</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service create \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--replicas 3 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--name redis \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--update-delay 10s \\</span></span>
<span class="line"><span style="color:#e1e4e8;">redis:3.0.6</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#更新</span></span>
<span class="line"><span style="color:#e1e4e8;">docker service update --image redis:3.0.7 redis</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#创建</span></span>
<span class="line"><span style="color:#24292e;">docker service create \\</span></span>
<span class="line"><span style="color:#24292e;">--replicas 3 \\</span></span>
<span class="line"><span style="color:#24292e;">--name redis \\</span></span>
<span class="line"><span style="color:#24292e;">--update-delay 10s \\</span></span>
<span class="line"><span style="color:#24292e;">redis:3.0.6</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#更新</span></span>
<span class="line"><span style="color:#24292e;">docker service update --image redis:3.0.7 redis</span></span></code></pre></div><h2 id="_7-6创建服务时设定更新策略" tabindex="-1">7.6创建服务时设定更新策略 <a class="header-anchor" href="#_7-6创建服务时设定更新策略" aria-label="Permalink to &quot;7.6创建服务时设定更新策略&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service create \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--name my_web</span></span>
<span class="line"><span style="color:#e1e4e8;">--replicas 10 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--update-delay 10s \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--update-parallelism 2 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--update-failure-action continue \\</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx:1.12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service create \\</span></span>
<span class="line"><span style="color:#24292e;">--name my_web</span></span>
<span class="line"><span style="color:#24292e;">--replicas 10 \\</span></span>
<span class="line"><span style="color:#24292e;">--update-delay 10s \\</span></span>
<span class="line"><span style="color:#24292e;">--update-parallelism 2 \\</span></span>
<span class="line"><span style="color:#24292e;">--update-failure-action continue \\</span></span>
<span class="line"><span style="color:#24292e;">nginx:1.12</span></span></code></pre></div><h2 id="_7-7创建服务时设定回滚策略" tabindex="-1">7.7创建服务时设定回滚策略 <a class="header-anchor" href="#_7-7创建服务时设定回滚策略" aria-label="Permalink to &quot;7.7创建服务时设定回滚策略&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service create \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--name my_web \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--replicas 10 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--rollback-parallelism 2 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--rollback-monitor 20s \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--rollback-max-failure-ratio .2 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx:1.12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service create \\</span></span>
<span class="line"><span style="color:#24292e;">--name my_web \\</span></span>
<span class="line"><span style="color:#24292e;">--replicas 10 \\</span></span>
<span class="line"><span style="color:#24292e;">--rollback-parallelism 2 \\</span></span>
<span class="line"><span style="color:#24292e;">--rollback-monitor 20s \\</span></span>
<span class="line"><span style="color:#24292e;">--rollback-max-failure-ratio .2 \\</span></span>
<span class="line"><span style="color:#24292e;">nginx:1.12</span></span></code></pre></div><h2 id="_7-8服务更新" tabindex="-1">7.8服务更新 <a class="header-anchor" href="#_7-8服务更新" aria-label="Permalink to &quot;7.8服务更新&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service update --image nginx:1.13 my_web</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service update --image nginx:1.13 my_web</span></span></code></pre></div><h2 id="_7-9手动回滚" tabindex="-1">7.9手动回滚 <a class="header-anchor" href="#_7-9手动回滚" aria-label="Permalink to &quot;7.9手动回滚&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service update --rollback my_web</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service update --rollback my_web</span></span></code></pre></div><h2 id="_8-0角色切换" tabindex="-1">8.0角色切换 <a class="header-anchor" href="#_8-0角色切换" aria-label="Permalink to &quot;8.0角色切换&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#升级前</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@k8s-master01 docker-swarm]# docker node ls </span></span>
<span class="line"><span style="color:#e1e4e8;">ID                            HOSTNAME       STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION</span></span>
<span class="line"><span style="color:#e1e4e8;">lla0kao0df1ehymdwo2vzdmb3 *   k8s-master01   Ready     Active         Leader           19.03.15</span></span>
<span class="line"><span style="color:#e1e4e8;">91hhnuxxgfg7tuyorz9v5lhgn     k8s-node01     Ready     Active                          19.03.15</span></span>
<span class="line"><span style="color:#e1e4e8;">l5o7592d6wv53sfi7ufvj4o9y     k8s-node02     Ready     Active                          19.03.15</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#升级前</span></span>
<span class="line"><span style="color:#24292e;">[root@k8s-master01 docker-swarm]# docker node ls </span></span>
<span class="line"><span style="color:#24292e;">ID                            HOSTNAME       STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION</span></span>
<span class="line"><span style="color:#24292e;">lla0kao0df1ehymdwo2vzdmb3 *   k8s-master01   Ready     Active         Leader           19.03.15</span></span>
<span class="line"><span style="color:#24292e;">91hhnuxxgfg7tuyorz9v5lhgn     k8s-node01     Ready     Active                          19.03.15</span></span>
<span class="line"><span style="color:#24292e;">l5o7592d6wv53sfi7ufvj4o9y     k8s-node02     Ready     Active                          19.03.15</span></span></code></pre></div><h1 id="_8-swarm集群数据管理" tabindex="-1">8.swarm集群数据管理 <a class="header-anchor" href="#_8-swarm集群数据管理" aria-label="Permalink to &quot;8.swarm集群数据管理&quot;">​</a></h1><h2 id="_1-volume方式管理数据" tabindex="-1">1.volume方式管理数据 <a class="header-anchor" href="#_1-volume方式管理数据" aria-label="Permalink to &quot;1.volume方式管理数据&quot;">​</a></h2><p>​ volume模式：在宿主机上创建一个volume,默认目录为（/var/lib/docker/volume/your_custom_volume/_data），然后把容器的某个目录映射到宿主机的volume上，即使容器挂了，数据还会依然保留在宿主机的volume上</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">service</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--replicas</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--mount</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">type=volume,src=nginx_data,dst=/usr/share/nginx/html</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">www_web01</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nginx:1.12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">service</span><span style="color:#24292E;"> </span><span style="color:#032F62;">create</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--replicas</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--mount</span><span style="color:#24292E;"> </span><span style="color:#032F62;">type=volume,src=nginx_data,dst=/usr/share/nginx/html</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">www_web01</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nginx:1.12</span></span></code></pre></div><ul><li>查看服务</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service inspect www_web01</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service inspect www_web01</span></span></code></pre></div><ul><li>查看数据卷</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker volume inspect nginx_data</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker volume inspect nginx_data</span></span></code></pre></div><h2 id="_2-bind-mount方式管理数据" tabindex="-1">2.bind mount方式管理数据 <a class="header-anchor" href="#_2-bind-mount方式管理数据" aria-label="Permalink to &quot;2.bind mount方式管理数据&quot;">​</a></h2><p>bind mount模式：将宿主机某个目录映射到docker容器，很适合于网站，同时把宿主机的这个目录作为git版本目录，每次update代码的时候，容器就会更新。</p><p>创建数据目录</p><p>在mananger、worker01、worker02上创建web网站目录：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir -p /data/wwwroot</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">docker service create --replicas 1--mount type=bind,src=/data/wwwroot,dst=/usr/share/nginx/html --name www_web02 nginx:1.12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir -p /data/wwwroot</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">docker service create --replicas 1--mount type=bind,src=/data/wwwroot,dst=/usr/share/nginx/html --name www_web02 nginx:1.12</span></span></code></pre></div><h2 id="_3-nfs方式管理数据" tabindex="-1">3.NFS方式管理数据 <a class="header-anchor" href="#_3-nfs方式管理数据" aria-label="Permalink to &quot;3.NFS方式管理数据&quot;">​</a></h2><p>前面两种方式都是单机docker上数据共享方式，要是在集群中，这个就不适用了，我们必须使用共享存储或网络存储了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#随便找个节点进行安装</span></span>
<span class="line"><span style="color:#e1e4e8;">yum install nfs-utils -y</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#随便找个节点进行安装</span></span>
<span class="line"><span style="color:#24292e;">yum install nfs-utils -y</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service create \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--mount &#39;type=volume,src=nfs-vol,dst=/usr/share/nginx/html, \\</span></span>
<span class="line"><span style="color:#e1e4e8;">volume-driver=local,volume-opt=type=nfs,\\</span></span>
<span class="line"><span style="color:#e1e4e8;">volume-opt=device=:/data/container_data,&quot;volume-opt=o=addr=10.11.97.187,vers=4,soft,timeo=180,bg,tcp,rw&quot;&#39; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--name www_web03_nfs nginx:1.12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service create \\</span></span>
<span class="line"><span style="color:#24292e;">--mount &#39;type=volume,src=nfs-vol,dst=/usr/share/nginx/html, \\</span></span>
<span class="line"><span style="color:#24292e;">volume-driver=local,volume-opt=type=nfs,\\</span></span>
<span class="line"><span style="color:#24292e;">volume-opt=device=:/data/container_data,&quot;volume-opt=o=addr=10.11.97.187,vers=4,soft,timeo=180,bg,tcp,rw&quot;&#39; \\</span></span>
<span class="line"><span style="color:#24292e;">--name www_web03_nfs nginx:1.12</span></span></code></pre></div><h1 id="_9-swarm集群发布" tabindex="-1">9.swarm集群发布 <a class="header-anchor" href="#_9-swarm集群发布" aria-label="Permalink to &quot;9.swarm集群发布&quot;">​</a></h1><p>https 😕/docs.docker.com/engine/swarm/ingress/#/configure-an-external-load-balancer</p><p>服务发现： Swarm模式内置DNS组件，自动为每个服务分配DNS记录，然后服务的DNS名称在集群内的服务直接分发请求。</p><p>负载均衡：在Swarm集群中创建服务时， Ingress网络会自动为其分配一个虚拟IP(VIP），在DNS解析时返回VIP，流入该VIP的流量将自动发送（IPVS）该服务的所以健康任 务（容器）</p><h2 id="_1-创建服务" tabindex="-1">1.创建服务 <a class="header-anchor" href="#_1-创建服务" aria-label="Permalink to &quot;1.创建服务&quot;">​</a></h2><p>在每个节点上创建服务，使用ingress暴露publish port：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker service create --replicas=3 --name web01 -p 88:80 nginx:1.12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker service create --replicas=3 --name web01 -p 88:80 nginx:1.12</span></span></code></pre></div><h2 id="_2-查看容器分布节点" tabindex="-1">2.查看容器分布节点 <a class="header-anchor" href="#_2-查看容器分布节点" aria-label="Permalink to &quot;2.查看容器分布节点&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s-node01 ~]# docker service ls </span></span>
<span class="line"><span style="color:#e1e4e8;">ID             NAME      MODE         REPLICAS   IMAGE        PORTS</span></span>
<span class="line"><span style="color:#e1e4e8;">tjl6o6v4rcfz   web01     replicated   3/3        nginx:1.12   *:88-&gt;80/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@k8s-node01 ~]# docker service ps web01</span></span>
<span class="line"><span style="color:#e1e4e8;">ID             NAME      IMAGE        NODE           DESIRED STATE   CURRENT STATE           ERROR     PORTS</span></span>
<span class="line"><span style="color:#e1e4e8;">tmxw2pvfgtnu   web01.1   nginx:1.12   k8s-node01     Running         Running 9 minutes ago             </span></span>
<span class="line"><span style="color:#e1e4e8;">i6kmtbpgybfj   web01.2   nginx:1.12   k8s-node02     Running         Running 9 minutes ago             </span></span>
<span class="line"><span style="color:#e1e4e8;">w0b3hauyt73k   web01.3   nginx:1.12   k8s-master01   Running         Running 9 minutes ago</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s-node01 ~]# docker service ls </span></span>
<span class="line"><span style="color:#24292e;">ID             NAME      MODE         REPLICAS   IMAGE        PORTS</span></span>
<span class="line"><span style="color:#24292e;">tjl6o6v4rcfz   web01     replicated   3/3        nginx:1.12   *:88-&gt;80/tcp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@k8s-node01 ~]# docker service ps web01</span></span>
<span class="line"><span style="color:#24292e;">ID             NAME      IMAGE        NODE           DESIRED STATE   CURRENT STATE           ERROR     PORTS</span></span>
<span class="line"><span style="color:#24292e;">tmxw2pvfgtnu   web01.1   nginx:1.12   k8s-node01     Running         Running 9 minutes ago             </span></span>
<span class="line"><span style="color:#24292e;">i6kmtbpgybfj   web01.2   nginx:1.12   k8s-node02     Running         Running 9 minutes ago             </span></span>
<span class="line"><span style="color:#24292e;">w0b3hauyt73k   web01.3   nginx:1.12   k8s-master01   Running         Running 9 minutes ago</span></span></code></pre></div><p><code>如果你关掉某个节点上web01的服务，swarm会再次启动一个服务，以达到原来task的个数。在真实环境中，我们可以在swarm集群中的每个节点启动指定个数的tasks，然后在前端使用负载均衡设备，比如HA或Nginx都行，直接通过负载均衡的方式做到高可用</code></p><h2 id="_3-查看network" tabindex="-1">3.查看network <a class="header-anchor" href="#_3-查看network" aria-label="Permalink to &quot;3.查看network&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@k8s-node01 ~]# docker network ls</span></span>
<span class="line"><span style="color:#e1e4e8;">NETWORK ID     NAME              DRIVER    SCOPE</span></span>
<span class="line"><span style="color:#e1e4e8;">b9704956f6d1   bridge            bridge    local</span></span>
<span class="line"><span style="color:#e1e4e8;">e4cd8283fbd1   docker_gwbridge   bridge    local</span></span>
<span class="line"><span style="color:#e1e4e8;">a8ce4375181a   host              host      local</span></span>
<span class="line"><span style="color:#e1e4e8;">ldcaqwsczce8   ingress           overlay   swarm</span></span>
<span class="line"><span style="color:#e1e4e8;">9eb3e46dd217   none              null      local</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@k8s-node01 ~]# docker network ls</span></span>
<span class="line"><span style="color:#24292e;">NETWORK ID     NAME              DRIVER    SCOPE</span></span>
<span class="line"><span style="color:#24292e;">b9704956f6d1   bridge            bridge    local</span></span>
<span class="line"><span style="color:#24292e;">e4cd8283fbd1   docker_gwbridge   bridge    local</span></span>
<span class="line"><span style="color:#24292e;">a8ce4375181a   host              host      local</span></span>
<span class="line"><span style="color:#24292e;">ldcaqwsczce8   ingress           overlay   swarm</span></span>
<span class="line"><span style="color:#24292e;">9eb3e46dd217   none              null      local</span></span></code></pre></div><h3 id="查看ingress网络" tabindex="-1">查看ingress网络 <a class="header-anchor" href="#查看ingress网络" aria-label="Permalink to &quot;查看ingress网络&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker network inspect ld</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker network inspect ld</span></span></code></pre></div><p>可以看出ingress，模拟出了一个vxlan，驱动类型为overlay，网段为：10.255.0.0/16，网关为10.255.0.1，vxlan有4096个接口</p><h1 id="_10-swarm集群高可用架构实现" tabindex="-1">10.swarm集群高可用架构实现 <a class="header-anchor" href="#_10-swarm集群高可用架构实现" aria-label="Permalink to &quot;10.swarm集群高可用架构实现&quot;">​</a></h1><h1 id="_11-swarm配置文件管理" tabindex="-1">11.Swarm配置文件管理 <a class="header-anchor" href="#_11-swarm配置文件管理" aria-label="Permalink to &quot;11.Swarm配置文件管理&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1、 生成一个基本的Nginx配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;"># cat site.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">　　server_name localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">index index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2、 将site.conf保存到docker配置中</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># docker config create site.conf site.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"># docker config ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">3、 创建一个Nginx并应用这个配置</span></span>
<span class="line"><span style="color:#e1e4e8;"># docker service create \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--name nginx \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--config source=site.conf,target=/etc/nginx/conf.d/site.conf \\</span></span>
<span class="line"><span style="color:#e1e4e8;">--publish 8080:80 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1、 生成一个基本的Nginx配置文件</span></span>
<span class="line"><span style="color:#24292e;"># cat site.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　listen 80;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">　　server_name localhost;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location / {</span></span>
<span class="line"><span style="color:#24292e;">root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">index index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2、 将site.conf保存到docker配置中</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># docker config create site.conf site.conf</span></span>
<span class="line"><span style="color:#24292e;"># docker config ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">3、 创建一个Nginx并应用这个配置</span></span>
<span class="line"><span style="color:#24292e;"># docker service create \\</span></span>
<span class="line"><span style="color:#24292e;">--name nginx \\</span></span>
<span class="line"><span style="color:#24292e;">--config source=site.conf,target=/etc/nginx/conf.d/site.conf \\</span></span>
<span class="line"><span style="color:#24292e;">--publish 8080:80 \\</span></span>
<span class="line"><span style="color:#24292e;">nginx</span></span></code></pre></div><h1 id="_12-备份监控" tabindex="-1">12.备份监控 <a class="header-anchor" href="#_12-备份监控" aria-label="Permalink to &quot;12.备份监控&quot;">​</a></h1><p><a href="https://gdevillele.github.io/engine/swarm/admin_guide/#/recover-from-disaster" target="_blank" rel="noreferrer">https://gdevillele.github.io/engine/swarm/admin_guide/#/recover-from-disaster</a></p><p><a href="https://www.digitalocean.com/community/tutorials/how-to-create-a-cluster-of-docker-containers-with-docker-swarm-and-digitalocean-on-ubuntu-16-04" target="_blank" rel="noreferrer">https://www.digitalocean.com/community/tutorials/how-to-create-a-cluster-of-docker-containers-with-docker-swarm-and-digitalocean-on-ubuntu-16-04</a></p>`,127),o=[p];function c(t,r,i,d,y,h){return n(),a("div",null,o)}const g=s(l,[["render",c]]);export{u as __pageData,g as default};
