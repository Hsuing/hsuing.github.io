import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/swarm/4.stack.md","filePath":"guide/container/swarm/4.stack.md","lastUpdated":1703083183000}'),l={name:"guide/container/swarm/4.stack.md"},p=e(`<h2 id="_1-部署" tabindex="-1">1.部署 <a class="header-anchor" href="#_1-部署" aria-label="Permalink to &quot;1.部署&quot;">​</a></h2><p><code>docker stack deploy 镜像必须提前存在</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker stack deploy -c docker-stack.yml service_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker stack deploy -c docker-stack.yml service_name</span></span></code></pre></div><ul><li>查看应用状态</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker stack services vote</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker stack services vote</span></span></code></pre></div><ul><li>查看stack的状态</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">docker stack ls</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者</span></span>
<span class="line"><span style="color:#e1e4e8;">docker stack ps vote</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">docker stack ls</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者</span></span>
<span class="line"><span style="color:#24292e;">docker stack ps vote</span></span></code></pre></div><p>案例</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">version: &quot;3&quot;		# 版本号，deploy功能是3版本及以上才有的</span></span>
<span class="line"><span style="color:#e1e4e8;">services:			# 服务，每个服务对应配置相同的一个或者多个docker容器</span></span>
<span class="line"><span style="color:#e1e4e8;">  redis:			# 服务名，自取</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: redis:alpine		# 创建该服务所基于的镜像。使用stack部署，只能基于镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports: 			# 容器内外的端口映射情况</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;1883:1883&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;9001:9001&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    networks:		# 替代了命令行模式的--link选项</span></span>
<span class="line"><span style="color:#e1e4e8;">      - fiware</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes: 		# 容器内外数据传输的对应地址</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;/srv/mqtt/config:/mqtt/config:ro&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;/srv/mqtt/log:/mqtt/log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;/srv/mqtt/data/:/mqtt/data/&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    command: -dbhost stack_mongo # 命令行模式中跟在最后的参数，此条没有固定的格式，建议参照所部署的docker镜像的说明文档来确定是否需要该项、需要写什么</span></span>
<span class="line"><span style="color:#e1e4e8;">    deploy:</span></span>
<span class="line"><span style="color:#e1e4e8;">      mode: replicated</span></span>
<span class="line"><span style="color:#e1e4e8;">      replicas: 6			# replicas模式， 副本数目为1</span></span>
<span class="line"><span style="color:#e1e4e8;">      endpoint_mode: vip</span></span>
<span class="line"><span style="color:#e1e4e8;">      labels: </span></span>
<span class="line"><span style="color:#e1e4e8;">        description: &quot;This redis service label&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      resources:</span></span>
<span class="line"><span style="color:#e1e4e8;">        limits:</span></span>
<span class="line"><span style="color:#e1e4e8;">          cpus: &#39;0.50&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">          memory: 50M</span></span>
<span class="line"><span style="color:#e1e4e8;">        reservations:</span></span>
<span class="line"><span style="color:#e1e4e8;">          cpus: &#39;0.25&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">          memory: 20M</span></span>
<span class="line"><span style="color:#e1e4e8;">      restart_policy:</span></span>
<span class="line"><span style="color:#e1e4e8;">        condition: on-failure</span></span>
<span class="line"><span style="color:#e1e4e8;">        delay: 5s</span></span>
<span class="line"><span style="color:#e1e4e8;">        max_attempts: 3</span></span>
<span class="line"><span style="color:#e1e4e8;">        window: 120s</span></span>
<span class="line"><span style="color:#e1e4e8;">      placement:</span></span>
<span class="line"><span style="color:#e1e4e8;">        constraints:</span></span>
<span class="line"><span style="color:#e1e4e8;">          - &quot;node.role==worker&quot;		# 部署位置，只在工作节点部署</span></span>
<span class="line"><span style="color:#e1e4e8;">          - &quot;engine.labels.operatingsystem==ubuntu 18.04&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        preferences:</span></span>
<span class="line"><span style="color:#e1e4e8;">          - spread: node.labels.zone</span></span>
<span class="line"><span style="color:#e1e4e8;">      update_config:</span></span>
<span class="line"><span style="color:#e1e4e8;">        parallelism: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">        delay: 10s</span></span>
<span class="line"><span style="color:#e1e4e8;">        order: stop-first</span></span>
<span class="line"><span style="color:#e1e4e8;">  visualizer:</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: sz-pg-oam-docker-hub-001.tendcloud.com/library/visualizer:stable</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;8080:8080&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    stop_grace_period: 1m30s</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;/var/run/docker.sock:/var/run/docker.sock&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    deploy:</span></span>
<span class="line"><span style="color:#e1e4e8;">      placement:</span></span>
<span class="line"><span style="color:#e1e4e8;">        constraints: [node.role == manager]</span></span>
<span class="line"><span style="color:#e1e4e8;">networks:		 # 定义部署该项目所需要的网络</span></span>
<span class="line"><span style="color:#e1e4e8;">  fiware:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">version: &quot;3&quot;		# 版本号，deploy功能是3版本及以上才有的</span></span>
<span class="line"><span style="color:#24292e;">services:			# 服务，每个服务对应配置相同的一个或者多个docker容器</span></span>
<span class="line"><span style="color:#24292e;">  redis:			# 服务名，自取</span></span>
<span class="line"><span style="color:#24292e;">    image: redis:alpine		# 创建该服务所基于的镜像。使用stack部署，只能基于镜像</span></span>
<span class="line"><span style="color:#24292e;">    ports: 			# 容器内外的端口映射情况</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;1883:1883&quot;</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;9001:9001&quot;</span></span>
<span class="line"><span style="color:#24292e;">    networks:		# 替代了命令行模式的--link选项</span></span>
<span class="line"><span style="color:#24292e;">      - fiware</span></span>
<span class="line"><span style="color:#24292e;">    volumes: 		# 容器内外数据传输的对应地址</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;/srv/mqtt/config:/mqtt/config:ro&quot;</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;/srv/mqtt/log:/mqtt/log&quot;</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;/srv/mqtt/data/:/mqtt/data/&quot;</span></span>
<span class="line"><span style="color:#24292e;">    command: -dbhost stack_mongo # 命令行模式中跟在最后的参数，此条没有固定的格式，建议参照所部署的docker镜像的说明文档来确定是否需要该项、需要写什么</span></span>
<span class="line"><span style="color:#24292e;">    deploy:</span></span>
<span class="line"><span style="color:#24292e;">      mode: replicated</span></span>
<span class="line"><span style="color:#24292e;">      replicas: 6			# replicas模式， 副本数目为1</span></span>
<span class="line"><span style="color:#24292e;">      endpoint_mode: vip</span></span>
<span class="line"><span style="color:#24292e;">      labels: </span></span>
<span class="line"><span style="color:#24292e;">        description: &quot;This redis service label&quot;</span></span>
<span class="line"><span style="color:#24292e;">      resources:</span></span>
<span class="line"><span style="color:#24292e;">        limits:</span></span>
<span class="line"><span style="color:#24292e;">          cpus: &#39;0.50&#39;</span></span>
<span class="line"><span style="color:#24292e;">          memory: 50M</span></span>
<span class="line"><span style="color:#24292e;">        reservations:</span></span>
<span class="line"><span style="color:#24292e;">          cpus: &#39;0.25&#39;</span></span>
<span class="line"><span style="color:#24292e;">          memory: 20M</span></span>
<span class="line"><span style="color:#24292e;">      restart_policy:</span></span>
<span class="line"><span style="color:#24292e;">        condition: on-failure</span></span>
<span class="line"><span style="color:#24292e;">        delay: 5s</span></span>
<span class="line"><span style="color:#24292e;">        max_attempts: 3</span></span>
<span class="line"><span style="color:#24292e;">        window: 120s</span></span>
<span class="line"><span style="color:#24292e;">      placement:</span></span>
<span class="line"><span style="color:#24292e;">        constraints:</span></span>
<span class="line"><span style="color:#24292e;">          - &quot;node.role==worker&quot;		# 部署位置，只在工作节点部署</span></span>
<span class="line"><span style="color:#24292e;">          - &quot;engine.labels.operatingsystem==ubuntu 18.04&quot;</span></span>
<span class="line"><span style="color:#24292e;">        preferences:</span></span>
<span class="line"><span style="color:#24292e;">          - spread: node.labels.zone</span></span>
<span class="line"><span style="color:#24292e;">      update_config:</span></span>
<span class="line"><span style="color:#24292e;">        parallelism: 2</span></span>
<span class="line"><span style="color:#24292e;">        delay: 10s</span></span>
<span class="line"><span style="color:#24292e;">        order: stop-first</span></span>
<span class="line"><span style="color:#24292e;">  visualizer:</span></span>
<span class="line"><span style="color:#24292e;">    image: sz-pg-oam-docker-hub-001.tendcloud.com/library/visualizer:stable</span></span>
<span class="line"><span style="color:#24292e;">    ports:</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;8080:8080&quot;</span></span>
<span class="line"><span style="color:#24292e;">    stop_grace_period: 1m30s</span></span>
<span class="line"><span style="color:#24292e;">    volumes:</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;/var/run/docker.sock:/var/run/docker.sock&quot;</span></span>
<span class="line"><span style="color:#24292e;">    deploy:</span></span>
<span class="line"><span style="color:#24292e;">      placement:</span></span>
<span class="line"><span style="color:#24292e;">        constraints: [node.role == manager]</span></span>
<span class="line"><span style="color:#24292e;">networks:		 # 定义部署该项目所需要的网络</span></span>
<span class="line"><span style="color:#24292e;">  fiware:</span></span></code></pre></div>`,9),o=[p];function t(c,r,i,y,d,u){return n(),a("div",null,o)}const v=s(l,[["render",t]]);export{k as __pageData,v as default};
