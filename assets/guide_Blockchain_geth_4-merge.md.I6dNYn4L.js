import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.节点","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/geth/4-merge.md","filePath":"guide/Blockchain/geth/4-merge.md","lastUpdated":1760930002000}'),p={name:"guide/Blockchain/geth/4-merge.md"},l=e(`<h1 id="_1-节点" tabindex="-1">1.节点 <a class="header-anchor" href="#_1-节点" aria-label="Permalink to &quot;1.节点&quot;">​</a></h1><p>将客户端细分为 CL(Consensus Layer) 及 EL(Execution Layer)</p><table><thead><tr><th>零件</th><th>描述</th></tr></thead><tbody><tr><td><strong>以太坊节点</strong> 又名“节点”</td><td>以太坊节点是一起工作的<strong>执行节点</strong>和<strong>信标节点</strong>。以太坊节点进行点对点通信以保护以太坊网络，并且需要<strong>执行层客户端软件</strong>和<strong>共识层客户端软件</strong>。</td></tr><tr><td><strong>执行节点</strong></td><td><strong>执行节点使用执行客户端软件来处理以太坊执行层</strong>中的交易和智能合约。Nethermind、Besu 和 Go Ethereum (Geth) 是执行客户端软件的示例。 执行节点将通过点对点网络与其他执行节点通信，并与本地信标节点通信。</td></tr><tr><td><strong>信标节点</strong></td><td>信标节点使用信标节点客户端软件来协调以太坊的权益证明共识。Prysm、Teku、Lighthouse 和 Nimbus 是包含信标节点和验证器客户端软件的共识客户端。 信标节点将通过点对点网络与其他信标节点、本地执行节点和（可选）本地验证器进行通信。</td></tr><tr><td><strong>验证器</strong></td><td>验证器客户端是专门的软件，可以让人们在以太坊的<strong>共识层</strong>中质押 32 ETH 作为抵押品。验证人负责在以太坊的股权证明共识机制内提出区块，并将在<a href="https://ethereum.org/en/upgrades/merge/" target="_blank" rel="noreferrer">合并</a>后完全取代工作证明矿工。 验证者将仅与本地信标节点对话。验证者的信标节点告诉验证者要做什么，并在验证者履行职责时将验证者的工作广播到以太坊网络。</td></tr></tbody></table><h1 id="_2-网络" tabindex="-1">2.网络 <a class="header-anchor" href="#_2-网络" aria-label="Permalink to &quot;2.网络&quot;">​</a></h1><p>每个以太坊网络都分为两层：<strong>执行层</strong>（EL）和<strong>共识层</strong>（CL）</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311151828039.png" alt=""></p><p>每个以太坊节点都包含两层的软件：<strong>执行层</strong>客户端软件（如 Nethermind、Besu、Geth 和 Erigon）和<strong>共识层</strong>客户端软件（如 Prysm、Teku、Lighthouse、Nimbus 和 Lodestar）。</p><p>每个网络的执行层都与（并且仅与）其相应的“合作伙伴”共识层一起工作。EL-CL 网络对共同运行以太坊权益证明</p><h2 id="_1-geth-el" tabindex="-1">1.geth(EL) <a class="header-anchor" href="#_1-geth-el" aria-label="Permalink to &quot;1.geth(EL)&quot;">​</a></h2><p>Geth v1.10.24 is a small hotfix release for users of the GraphQL APIs. It fixes a single bug where filtering for logs from a single transaction via GraphQL returned logs from the entire block, not just the single transaction. Single transaction log filtering is unavailable via the RPC and does not impact the merge.</p><p>文档，<a href="https://geth.ethereum.org/docs/interface/les" target="_blank" rel="noreferrer">https://geth.ethereum.org/docs/interface/les</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/data/apps/snapeth/geth --authrpc.jwtsecret /data/apps/prysm/jwt.hex --syncmode snap --allow-insecure-unlock --authrpc.port 8551 --port 30303 --http --http.port 8546 --http.port 8545 --http.api web3,db,eth,net,personal --http.addr=172.31.34.215 --datadir /data/coin/snapETH --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#运行之后，产生的问题，解决方式，必须运行CL，等CL同步完</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:16.047] Unexpected storage ranges packet         peer=edfd25cd reqid=7,641,177,353,239,260,592</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:16.135] Unexpected storage ranges packet         peer=3b5c310a reqid=1,621,849,408,279,827,598</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:16.154] Unexpected bytecode packet               peer=b3debcd5 reqid=6,947,168,298,603,109,298</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:16.595] Unexpected storage ranges packet         peer=5b606ada reqid=3,622,311,717,466,879,639</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:16.595] Unexpected bytecode packet               peer=5b606ada reqid=4,981,076,003,635,715,678</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO [09-16|02:52:18.636] Disabling direct-ancient mode            origin=15,537,221 ancient=14,811,135</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO [09-16|02:52:19.841] Imported new block headers               count=0    elapsed=123.110ms   number=15,537,393 hash=55b11b..7bb286 age=20h9m37s   ignored=172</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO [09-16|02:52:19.841] Legacy sync reached merge threshold      number=15,537,394 hash=b84f2d..b2e97c td=58,750,014,772,935,592,709,055 ttd=58,750,000,000,000,000,000,000</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO [09-16|02:52:19.870] State sync in progress                   synced=72.84% state=149.09GiB accounts=269,540,706@30.55GiB slots=578,886,908@115.51GiB codes=507,734@3.03GiB    eta=5h2m37.906s</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:19.893] Local chain is post-merge, waiting for beacon client sync switch-over... </span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:19.947] Unexpected storage ranges packet         peer=edfd25cd reqid=7,823,624,587,836,870,649</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:19.961] Unexpected storage ranges packet         peer=3b5c310a reqid=3,033,182,872,383,144,071</span></span>
<span class="line"><span style="color:#e1e4e8;">WARN [09-16|02:52:20.637] Unexpected storage ranges packet         peer=5b606ada reqid=8,019,658,869,622,868,299</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#正常之后日志信息</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO [09-21|02:22:00.853] Imported new potential chain segment     blocks=1       txs=137         mgas=11.635  elapsed=75.972ms     mgasps=153.151  number=15,578,827 hash=5b6b5c..e88843 dirty=255.63MiB</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO [09-21|02:22:00.896] Chain head was updated                   number=15,578,827 hash=5b6b5c..e88843 root=e8775b..56db73 elapsed=3.56246ms</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO [09-21|02:22:00.897] Unindexed transactions                   blocks=1       txs=148         tail=13,228,828 elapsed=1.250ms</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/data/apps/snapeth/geth --authrpc.jwtsecret /data/apps/prysm/jwt.hex --syncmode snap --allow-insecure-unlock --authrpc.port 8551 --port 30303 --http --http.port 8546 --http.port 8545 --http.api web3,db,eth,net,personal --http.addr=172.31.34.215 --datadir /data/coin/snapETH --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#运行之后，产生的问题，解决方式，必须运行CL，等CL同步完</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:16.047] Unexpected storage ranges packet         peer=edfd25cd reqid=7,641,177,353,239,260,592</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:16.135] Unexpected storage ranges packet         peer=3b5c310a reqid=1,621,849,408,279,827,598</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:16.154] Unexpected bytecode packet               peer=b3debcd5 reqid=6,947,168,298,603,109,298</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:16.595] Unexpected storage ranges packet         peer=5b606ada reqid=3,622,311,717,466,879,639</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:16.595] Unexpected bytecode packet               peer=5b606ada reqid=4,981,076,003,635,715,678</span></span>
<span class="line"><span style="color:#24292e;">INFO [09-16|02:52:18.636] Disabling direct-ancient mode            origin=15,537,221 ancient=14,811,135</span></span>
<span class="line"><span style="color:#24292e;">INFO [09-16|02:52:19.841] Imported new block headers               count=0    elapsed=123.110ms   number=15,537,393 hash=55b11b..7bb286 age=20h9m37s   ignored=172</span></span>
<span class="line"><span style="color:#24292e;">INFO [09-16|02:52:19.841] Legacy sync reached merge threshold      number=15,537,394 hash=b84f2d..b2e97c td=58,750,014,772,935,592,709,055 ttd=58,750,000,000,000,000,000,000</span></span>
<span class="line"><span style="color:#24292e;">INFO [09-16|02:52:19.870] State sync in progress                   synced=72.84% state=149.09GiB accounts=269,540,706@30.55GiB slots=578,886,908@115.51GiB codes=507,734@3.03GiB    eta=5h2m37.906s</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:19.893] Local chain is post-merge, waiting for beacon client sync switch-over... </span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:19.947] Unexpected storage ranges packet         peer=edfd25cd reqid=7,823,624,587,836,870,649</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:19.961] Unexpected storage ranges packet         peer=3b5c310a reqid=3,033,182,872,383,144,071</span></span>
<span class="line"><span style="color:#24292e;">WARN [09-16|02:52:20.637] Unexpected storage ranges packet         peer=5b606ada reqid=8,019,658,869,622,868,299</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#正常之后日志信息</span></span>
<span class="line"><span style="color:#24292e;">INFO [09-21|02:22:00.853] Imported new potential chain segment     blocks=1       txs=137         mgas=11.635  elapsed=75.972ms     mgasps=153.151  number=15,578,827 hash=5b6b5c..e88843 dirty=255.63MiB</span></span>
<span class="line"><span style="color:#24292e;">INFO [09-21|02:22:00.896] Chain head was updated                   number=15,578,827 hash=5b6b5c..e88843 root=e8775b..56db73 elapsed=3.56246ms</span></span>
<span class="line"><span style="color:#24292e;">INFO [09-21|02:22:00.897] Unindexed transactions                   blocks=1       txs=148         tail=13,228,828 elapsed=1.250ms</span></span></code></pre></div><h2 id="_2-prysm-cl" tabindex="-1">2.Prysm (CL) <a class="header-anchor" href="#_2-prysm-cl" aria-label="Permalink to &quot;2.Prysm (CL)&quot;">​</a></h2><p>文档，<a href="https://docs.prylabs.network/docs/troubleshooting/issues-errors" target="_blank" rel="noreferrer">https://docs.prylabs.network/docs/troubleshooting/issues-errors</a></p><p><a href="https://ethereum.org/zh/developers/docs/nodes-and-clients/" target="_blank" rel="noreferrer">https://ethereum.org/zh/developers/docs/nodes-and-clients/</a></p><p>客户端，<a href="https://ethereum.org/en/upgrades/get-involved/#clients" target="_blank" rel="noreferrer">https://ethereum.org/en/upgrades/get-involved/#clients</a></p><h3 id="_2-0默认端口" tabindex="-1">2.0默认端口 <a class="header-anchor" href="#_2-0默认端口" aria-label="Permalink to &quot;2.0默认端口&quot;">​</a></h3><table><thead><tr><th>端口</th><th>说明</th></tr></thead><tbody><tr><td>13000</td><td>P2P网络通信端口，用于节点间的点对点通信，包括区块传输和状态同步等</td></tr><tr><td>4000</td><td>Beacon链RPC端口，用于与Beacon链进行通信，例如获取当前验证者集合、验证者信息等</td></tr><tr><td>4001</td><td>Validator链RPC端口，用于与Validator链进行通信，例如获取验证者的质押信息、验证者状态等</td></tr><tr><td>8080</td><td>Grafana监控端口，如果启用了Prysm的统计和可视化功能，则可以使用该端口访问Grafana面板</td></tr></tbody></table><h3 id="_2-1安装" tabindex="-1">2.1安装 <a class="header-anchor" href="#_2-1安装" aria-label="Permalink to &quot;2.1安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir prysm &amp;&amp; cd prysm</span></span>
<span class="line"><span style="color:#e1e4e8;">curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh &amp;&amp; chmod +x prysm.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">sh prysm.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir prysm &amp;&amp; cd prysm</span></span>
<span class="line"><span style="color:#24292e;">curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh &amp;&amp; chmod +x prysm.sh</span></span>
<span class="line"><span style="color:#24292e;">sh prysm.sh</span></span></code></pre></div><h3 id="_2-2jwt-身份验证" tabindex="-1">2.2JWT 身份验证 <a class="header-anchor" href="#_2-2jwt-身份验证" aria-label="Permalink to &quot;2.2JWT 身份验证&quot;">​</a></h3><p>两种方式随机取一</p><ul><li>1.openssl</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">openssl rand -hex 32 | tr -d &quot;\\n&quot; &gt; &quot;jwt.hex&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">openssl rand -hex 32 | tr -d &quot;\\n&quot; &gt; &quot;jwt.hex&quot;</span></span></code></pre></div><ul><li>2.prysm</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">./prysm.sh beacon-chain generate-auth-secret</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">./prysm.sh beacon-chain generate-auth-secret</span></span></code></pre></div><h3 id="_2-3启动" tabindex="-1">2.3启动 <a class="header-anchor" href="#_2-3启动" aria-label="Permalink to &quot;2.3启动&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">./prysm.sh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">beacon-chain</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--execution-endpoint=http://127.0.0.1:8551</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--datadir=/data/prym_data</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--jwt-secret=/data/apps/prysm/jwt.hex</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--checkpoint-sync-url=https://beaconstate.info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#默认启动数据存放到/root/.eth2 目录下</span></span>
<span class="line"><span style="color:#B392F0;">--execution-endpoint</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">指定eth块服务</span></span>
<span class="line"><span style="color:#E1E4E8;">--datadir</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">指定数据路径</span></span>
<span class="line"><span style="color:#E1E4E8;">--checkpoint-sync-url</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">从最新的状态开始拉取数据</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">./prysm.sh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">beacon-chain</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--execution-endpoint=http://127.0.0.1:8551</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--datadir=/data/prym_data</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--jwt-secret=/data/apps/prysm/jwt.hex</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--checkpoint-sync-url=https://beaconstate.info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#默认启动数据存放到/root/.eth2 目录下</span></span>
<span class="line"><span style="color:#6F42C1;">--execution-endpoint</span><span style="color:#24292E;">  </span><span style="color:#032F62;">指定eth块服务</span></span>
<span class="line"><span style="color:#24292E;">--datadir</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">  </span><span style="color:#6F42C1;">指定数据路径</span></span>
<span class="line"><span style="color:#24292E;">--checkpoint-sync-url</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">从最新的状态开始拉取数据</span></span></code></pre></div><p>操作顺序，1.先制作hex密钥，2.启动eth，3.启动prysm</p><h4 id="systemd启动" tabindex="-1">systemd启动 <a class="header-anchor" href="#systemd启动" aria-label="Permalink to &quot;systemd启动&quot;">​</a></h4><p>vim /lib/systemd/system/prysm.service</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">prysm</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mainnet</span></span>
<span class="line"><span style="color:#E1E4E8;">After</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network-online.target</span></span>
<span class="line"><span style="color:#E1E4E8;">Wants</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">User</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">WorkingDirectory</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/prysm</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/prysm/</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">beacon-chain</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--execution-endpoint=http://localhost:8551</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--jwt-secret=/data/prysm/jwt.hex</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">--datadir=/data/prysm/data</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--accept-terms-of-use=true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">Restart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">RestartSec</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">LimitNOFILE</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">65535</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">prysm</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mainnet</span></span>
<span class="line"><span style="color:#24292E;">After</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network-online.target</span></span>
<span class="line"><span style="color:#24292E;">Wants</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">User</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">WorkingDirectory</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/prysm</span></span>
<span class="line"><span style="color:#24292E;">ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/prysm/</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">beacon-chain</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--execution-endpoint=http://localhost:8551</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--jwt-secret=/data/prysm/jwt.hex</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">--datadir=/data/prysm/data</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--accept-terms-of-use=true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">Restart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">RestartSec</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">LimitNOFILE</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">65535</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prysm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看日志</span></span>
<span class="line"><span style="color:#B392F0;">journalctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-u</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prysm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prysm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看日志</span></span>
<span class="line"><span style="color:#6F42C1;">journalctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-u</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prysm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span></span></code></pre></div><h4 id="supervisor启动" tabindex="-1">supervisor启动 <a class="header-anchor" href="#supervisor启动" aria-label="Permalink to &quot;supervisor启动&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[program:prysm]</span></span>
<span class="line"><span style="color:#E1E4E8;">directory</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/apps/prysm</span></span>
<span class="line"><span style="color:#E1E4E8;">command</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/bin/bash</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./prysm.sh beacon-chain --execution-endpoint=http://127.0.0.1:8551  --jwt-secret=/data/apps/prysm/jwt.hex&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">autostart</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">autorestart</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">startretries</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">stderr_logfile</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/log/prysm_error.log</span></span>
<span class="line"><span style="color:#E1E4E8;">stdout_logfile</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/log/prysm_out.log</span></span>
<span class="line"><span style="color:#E1E4E8;">stdout_logfile_maxbytes</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">50</span><span style="color:#9ECBFF;">MB</span></span>
<span class="line"><span style="color:#B392F0;">stdout_logfile_backups</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[program:prysm]</span></span>
<span class="line"><span style="color:#24292E;">directory</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/apps/prysm</span></span>
<span class="line"><span style="color:#24292E;">command</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/bin/bash</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./prysm.sh beacon-chain --execution-endpoint=http://127.0.0.1:8551  --jwt-secret=/data/apps/prysm/jwt.hex&quot;</span></span>
<span class="line"><span style="color:#24292E;">autostart</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">autorestart</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">startretries</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">stderr_logfile</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/log/prysm_error.log</span></span>
<span class="line"><span style="color:#24292E;">stdout_logfile</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/log/prysm_out.log</span></span>
<span class="line"><span style="color:#24292E;">stdout_logfile_maxbytes</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">50</span><span style="color:#032F62;">MB</span></span>
<span class="line"><span style="color:#6F42C1;">stdout_logfile_backups</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span></code></pre></div><ul><li>eth启动</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">nohup /data/apps/snapeth/geth --authrpc.jwtsecret /data/apps/prysm/jwt.hex --syncmode snap --allow-insecure-unlock --authrpc.port 8551 --port 30303 --http --http.port 8546 --http.port 8545 --http.api web3,db,eth,net,personal --http.addr=127.0.0.1 --datadir /data/coin/snapETH --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">nohup /data/apps/snapeth/geth --authrpc.jwtsecret /data/apps/prysm/jwt.hex --syncmode snap --allow-insecure-unlock --authrpc.port 8551 --port 30303 --http --http.port 8546 --http.port 8545 --http.api web3,db,eth,net,personal --http.addr=127.0.0.1 --datadir /data/coin/snapETH --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs &amp;</span></span></code></pre></div><h2 id="_3-cl常用操作" tabindex="-1">3.CL常用操作 <a class="header-anchor" href="#_3-cl常用操作" aria-label="Permalink to &quot;3.CL常用操作&quot;">​</a></h2><h3 id="查看同步结果" tabindex="-1">查看同步结果 <a class="header-anchor" href="#查看同步结果" aria-label="Permalink to &quot;查看同步结果&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -s http://localhost:3500/eth/v1/node/syncing | jq .</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;data&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;head_slot&quot;: &quot;4166307&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sync_distance&quot;: &quot;561507&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;is_syncing&quot;: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;is_optimistic&quot;: false</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#is_optimistic&quot;:false  ，则还未同步完成</span></span>
<span class="line"><span style="color:#e1e4e8;">#&quot;is_syncing&quot;: false, 则同步完成</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#同步完成现象</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@xxx snapeth]# curl -s http://localhost:3500/eth/v1/node/syncing | jq .</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;data&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;head_slot&quot;: &quot;4734586&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sync_distance&quot;: &quot;0&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;is_syncing&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;is_optimistic&quot;: true</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -s http://localhost:3500/eth/v1/node/syncing | jq .</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;data&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;head_slot&quot;: &quot;4166307&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sync_distance&quot;: &quot;561507&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;is_syncing&quot;: true,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;is_optimistic&quot;: false</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#is_optimistic&quot;:false  ，则还未同步完成</span></span>
<span class="line"><span style="color:#24292e;">#&quot;is_syncing&quot;: false, 则同步完成</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#同步完成现象</span></span>
<span class="line"><span style="color:#24292e;">[root@xxx snapeth]# curl -s http://localhost:3500/eth/v1/node/syncing | jq .</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;data&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;head_slot&quot;: &quot;4734586&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sync_distance&quot;: &quot;0&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;is_syncing&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;is_optimistic&quot;: true</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="查看slot高度" tabindex="-1">查看slot高度 <a class="header-anchor" href="#查看slot高度" aria-label="Permalink to &quot;查看slot高度&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@eth_new ~]# curl -s http://127.0.0.1:3500/eth/v1/beacon/headers/finalized | jq .&#39;data.header.message&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;slot&quot;: &quot;4748832&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;proposer_index&quot;: &quot;331717&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;parent_root&quot;: &quot;0xdabc42c10b36ad8ac21d9d89d8ee160ad1127c3d78858c0613526892f5a15f72&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;state_root&quot;: &quot;0xf4011d79ca926886768e5f6d5611cb8c6436be0d18181e95af40d1ea278c8cc7&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;body_root&quot;: &quot;0x0ee2407161d8cd98f282da0a80ccb229cbf6f9d93be7d2e8cec547fc3f794db7&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@eth_new ~]# curl -s http://127.0.0.1:3500/eth/v1/beacon/headers/finalized | jq .&#39;data.header.message&#39;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;slot&quot;: &quot;4748832&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;proposer_index&quot;: &quot;331717&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;parent_root&quot;: &quot;0xdabc42c10b36ad8ac21d9d89d8ee160ad1127c3d78858c0613526892f5a15f72&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;state_root&quot;: &quot;0xf4011d79ca926886768e5f6d5611cb8c6436be0d18181e95af40d1ea278c8cc7&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;body_root&quot;: &quot;0x0ee2407161d8cd98f282da0a80ccb229cbf6f9d93be7d2e8cec547fc3f794db7&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="查看cl版本" tabindex="-1">查看CL版本 <a class="header-anchor" href="#查看cl版本" aria-label="Permalink to &quot;查看CL版本&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@xxx prysm]# sh prysm.sh beacon-chain --version</span></span>
<span class="line"><span style="color:#e1e4e8;">Latest Prysm version is v3.1.1.</span></span>
<span class="line"><span style="color:#e1e4e8;">Beacon chain is up to date.</span></span>
<span class="line"><span style="color:#e1e4e8;">Verifying binary integrity.</span></span>
<span class="line"><span style="color:#e1e4e8;">beacon-chain-v3.1.1-linux-amd64: OK</span></span>
<span class="line"><span style="color:#e1e4e8;">gpg: Signature made Fri 09 Sep 2022 08:57:35 PM UTC using RSA key ID F1A5036E</span></span>
<span class="line"><span style="color:#e1e4e8;">gpg: Good signature from &quot;Preston Van Loon &lt;preston@prysmaticlabs.com&gt;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">gpg: WARNING: This key is not certified with a trusted signature!</span></span>
<span class="line"><span style="color:#e1e4e8;">gpg:          There is no indication that the signature belongs to the owner.</span></span>
<span class="line"><span style="color:#e1e4e8;">Primary key fingerprint: 0AE0 051D 647B A3C1 A917  AF40 72E3 3E4D F1A5 036E</span></span>
<span class="line"><span style="color:#e1e4e8;">Verified /data/apps/prysm/dist/beacon-chain-v3.1.1-linux-amd64 has been signed by Prysmatic Labs.</span></span>
<span class="line"><span style="color:#e1e4e8;">Starting Prysm beacon-chain --version</span></span>
<span class="line"><span style="color:#e1e4e8;">beacon-chain version Prysm/v3.1.1/653ea3b030c3bb99aa3f3d95a8de9f4d6e147930. Built at: 2022-09-09 17:21:54+00:00</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@xxx prysm]# sh prysm.sh beacon-chain --version</span></span>
<span class="line"><span style="color:#24292e;">Latest Prysm version is v3.1.1.</span></span>
<span class="line"><span style="color:#24292e;">Beacon chain is up to date.</span></span>
<span class="line"><span style="color:#24292e;">Verifying binary integrity.</span></span>
<span class="line"><span style="color:#24292e;">beacon-chain-v3.1.1-linux-amd64: OK</span></span>
<span class="line"><span style="color:#24292e;">gpg: Signature made Fri 09 Sep 2022 08:57:35 PM UTC using RSA key ID F1A5036E</span></span>
<span class="line"><span style="color:#24292e;">gpg: Good signature from &quot;Preston Van Loon &lt;preston@prysmaticlabs.com&gt;&quot;</span></span>
<span class="line"><span style="color:#24292e;">gpg: WARNING: This key is not certified with a trusted signature!</span></span>
<span class="line"><span style="color:#24292e;">gpg:          There is no indication that the signature belongs to the owner.</span></span>
<span class="line"><span style="color:#24292e;">Primary key fingerprint: 0AE0 051D 647B A3C1 A917  AF40 72E3 3E4D F1A5 036E</span></span>
<span class="line"><span style="color:#24292e;">Verified /data/apps/prysm/dist/beacon-chain-v3.1.1-linux-amd64 has been signed by Prysmatic Labs.</span></span>
<span class="line"><span style="color:#24292e;">Starting Prysm beacon-chain --version</span></span>
<span class="line"><span style="color:#24292e;">beacon-chain version Prysm/v3.1.1/653ea3b030c3bb99aa3f3d95a8de9f4d6e147930. Built at: 2022-09-09 17:21:54+00:00</span></span></code></pre></div><h3 id="cl↔el节点连通性" tabindex="-1"><strong>CL↔EL节点连通性</strong> <a class="header-anchor" href="#cl↔el节点连通性" aria-label="Permalink to &quot;**CL↔EL节点连通性**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@xxx prysm]# curl -s http://localhost:3500/eth/v1alpha1/node/eth1/connections |jq .</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;currentAddress&quot;: &quot;http://127.0.0.1:8551&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;currentConnectionError&quot;: &quot;no contract code at given address&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;addresses&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;http://127.0.0.1:8551&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;connectionErrors&quot;: []</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#解释</span></span>
<span class="line"><span style="color:#e1e4e8;">currentConnectionError: no contract code at given address，您的执行节点可能仍在同步。否则，如果您没有看到任何错误，则您的信标节点已连接到您的执行节点。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">此输出可以解释为“EN-BN 连接正常”：{&quot;currentAddress&quot;:&quot;http://localhost:8551&quot;,&quot;currentConnectionError&quot;:&quot;&quot;,&quot;addresses&quot;:[&quot;http://localhost:8551&quot;],&quot;connectionErrors&quot;:[]}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#正常输出</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@xxx ~]# curl -s http://localhost:3500/eth/v1alpha1/node/eth1/connections |jq .</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;currentAddress&quot;: &quot;http://127.0.0.1:8551&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;currentConnectionError&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;addresses&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;http://127.0.0.1:8551&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ],</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;connectionErrors&quot;: []</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@xxx prysm]# curl -s http://localhost:3500/eth/v1alpha1/node/eth1/connections |jq .</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;currentAddress&quot;: &quot;http://127.0.0.1:8551&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;currentConnectionError&quot;: &quot;no contract code at given address&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;addresses&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;http://127.0.0.1:8551&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;connectionErrors&quot;: []</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#解释</span></span>
<span class="line"><span style="color:#24292e;">currentConnectionError: no contract code at given address，您的执行节点可能仍在同步。否则，如果您没有看到任何错误，则您的信标节点已连接到您的执行节点。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">此输出可以解释为“EN-BN 连接正常”：{&quot;currentAddress&quot;:&quot;http://localhost:8551&quot;,&quot;currentConnectionError&quot;:&quot;&quot;,&quot;addresses&quot;:[&quot;http://localhost:8551&quot;],&quot;connectionErrors&quot;:[]}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#正常输出</span></span>
<span class="line"><span style="color:#24292e;">[root@xxx ~]# curl -s http://localhost:3500/eth/v1alpha1/node/eth1/connections |jq .</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;currentAddress&quot;: &quot;http://127.0.0.1:8551&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;currentConnectionError&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;addresses&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">    &quot;http://127.0.0.1:8551&quot;</span></span>
<span class="line"><span style="color:#24292e;">  ],</span></span>
<span class="line"><span style="color:#24292e;">  &quot;connectionErrors&quot;: []</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h3 id="查看cl-slot-高度" tabindex="-1">查看CL slot 高度 <a class="header-anchor" href="#查看cl-slot-高度" aria-label="Permalink to &quot;查看CL slot 高度&quot;">​</a></h3><p>Current Slot</p><p><a href="https://beaconcha.in/" target="_blank" rel="noreferrer">https://beaconcha.in/</a></p><p>或者</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#同步完成现象</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@xxx snapeth]# curl -s http://localhost:3500/eth/v1/node/syncing | jq .</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;data&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;head_slot&quot;: &quot;4734586&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sync_distance&quot;: &quot;0&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;is_syncing&quot;: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;is_optimistic&quot;: true</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#同步完成现象</span></span>
<span class="line"><span style="color:#24292e;">[root@xxx snapeth]# curl -s http://localhost:3500/eth/v1/node/syncing | jq .</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;data&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;head_slot&quot;: &quot;4734586&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sync_distance&quot;: &quot;0&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;is_syncing&quot;: false,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;is_optimistic&quot;: true</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>查看端口</p><table><thead><tr><th>端口/协议</th><th>防火墙规则</th><th>原因/注意事项</th></tr></thead><tbody><tr><td><code>8545/TCP</code></td><td>阻止所有流量。</td><td>这是执行节点的查询 API 的 JSON-RPC 端口。您（和应用程序）可以使用此端口检查执行节点状态，查询执行层链数据，甚至提交交易。这个端口一般不应该暴露给外界。</td></tr><tr><td><code>3500/TCP</code></td><td>阻止所有流量。</td><td>这是信标节点查询 API 的 JSON-RPC 端口。您（和应用程序）可以使用此端口检查信标节点状态并查询共识层链数据。这个端口一般不应该暴露给外界。</td></tr><tr><td><code>8551/TCP</code></td><td>阻止所有流量。</td><td>您的信标节点使用此端口连接到执行节点的<a href="https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md" target="_blank" rel="noreferrer">引擎 API 。</a>只有当您的本地信标节点连接到远程执行节点时，才应允许通过此端口的入站和出站流量。</td></tr><tr><td><code>4000/TCP</code></td><td>阻止所有流量。</td><td>您的验证器使用此端口通过<a href="https://grpc.io/" target="_blank" rel="noreferrer">gRPC</a>连接到您的信标节点。只有当您的本地验证器连接到远程信标节点时，才应允许通过此端口的入站和出站流量。</td></tr><tr><td><code>*/UDP+TCP</code></td><td>允许出站流量。</td><td>为了<a href="https://github.com/ethereum/devp2p/wiki/Discovery-Overview" target="_blank" rel="noreferrer">发现</a>对等点，Prysm 的信标节点通过随机端口拨出。允许来自任何端口的出站 TCP/UDP 流量将有助于 Prysm 找到对等点。</td></tr><tr><td><code>13000/TCP</code></td><td>允许入站和出站流量。</td><td>在我们发现对等点之后，我们通过这个端口拨叫它们为<a href="https://libp2p.io/" target="_blank" rel="noreferrer">libp2p</a>建立一个持续的连接，并且所有 gossip/p2p 请求和响应都将通过该连接流动。</td></tr><tr><td><code>12000/UDP</code></td><td>允许入站和出站流量。</td><td>你的信标节点公开这个 UDP 端口，以便其他以太坊节点可以发现你的节点，请求链数据，并提供链数据。</td></tr><tr><td><code>30303/TCP+UDP</code></td><td>允许入站和出站流量。</td><td><code>30303/TCP</code>是您的执行节点的侦听器端口，<code>30303/UDP</code>而是它的发现端口。此规则允许您的执行节点连接到其他对等节点。请注意，某些客户端<code>30301</code>默认使用。</td></tr></tbody></table><p>请注意，共识客户端和执行客户端都允许您自定义其中的许多端口。上面的规则表基于默认端口值</p><h2 id="_5-数据目录结构" tabindex="-1">5.数据目录结构 <a class="header-anchor" href="#_5-数据目录结构" aria-label="Permalink to &quot;5.数据目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@eth_new prym_data]# tree -L 3</span></span>
<span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">├── beaconchaindata</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── beaconchaindata</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   └── beaconchain.db</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── beaconchain.db</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── metaData</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── tosaccepted</span></span>
<span class="line"><span style="color:#e1e4e8;">├── metaData</span></span>
<span class="line"><span style="color:#e1e4e8;">└── tosaccepted</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@eth_new prym_data]# tree -L 3</span></span>
<span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">├── beaconchaindata</span></span>
<span class="line"><span style="color:#24292e;">│   ├── beaconchaindata</span></span>
<span class="line"><span style="color:#24292e;">│   │   └── beaconchain.db</span></span>
<span class="line"><span style="color:#24292e;">│   ├── beaconchain.db</span></span>
<span class="line"><span style="color:#24292e;">│   ├── metaData</span></span>
<span class="line"><span style="color:#24292e;">│   └── tosaccepted</span></span>
<span class="line"><span style="color:#24292e;">├── metaData</span></span>
<span class="line"><span style="color:#24292e;">└── tosaccepted</span></span></code></pre></div><h2 id="_6-api" tabindex="-1">6.API <a class="header-anchor" href="#_6-api" aria-label="Permalink to &quot;6.API&quot;">​</a></h2><p><a href="https://ethereum.github.io/beacon-APIs/#/Beacon" target="_blank" rel="noreferrer">https://ethereum.github.io/beacon-APIs/#/Beacon</a></p><h2 id="_7-merge" tabindex="-1">7.merge <a class="header-anchor" href="#_7-merge" aria-label="Permalink to &quot;7.merge&quot;">​</a></h2><p><a href="https://medium.com/taipei-ethereum-meetup/eth-2-0-cl-el-separation-and-impact-of-the-merge-dbeb6828c907" target="_blank" rel="noreferrer">https://medium.com/taipei-ethereum-meetup/eth-2-0-cl-el-separation-and-impact-of-the-merge-dbeb6828c907</a></p><p><a href="https://notes.ethereum.org/@hww/the-merge-brief-summary#Execution-Layer-EL-%E5%9F%B7%E8%A1%8C%E5%B1%A4" target="_blank" rel="noreferrer">https://notes.ethereum.org/@hww/the-merge-brief-summary#Execution-Layer-EL-執行層</a></p><h3 id="容器方式" tabindex="-1">容器方式 <a class="header-anchor" href="#容器方式" aria-label="Permalink to &quot;容器方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">version: &#39;3.9&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">  beacon-node:</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: gcr.io/prysmaticlabs/prysm/beacon-chain:v2.1.3-rc.3</span></span>
<span class="line"><span style="color:#e1e4e8;">    hostname: beacon-node</span></span>
<span class="line"><span style="color:#e1e4e8;">    restart: always</span></span>
<span class="line"><span style="color:#e1e4e8;">    container_name: beacon-node</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;./data:/data&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;./genesis.ssz:/genesis/genesis.ssz&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;./eth-node/root/.ethereum/ropsten:/ropsten&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    command:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --datadir=/data</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --rpc-host=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --monitoring-host=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --http-web3provider=http://eth-node:8550</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --genesis-state=/genesis/genesis.ssz</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --terminal-total-difficulty-override=50000000000000000</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --ropsten</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --accept-terms-of-use</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --jwt-secret=/ropsten/geth/jwtsecret</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 4000:4000</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 13000:13000 </span></span>
<span class="line"><span style="color:#e1e4e8;">      - 12000:12000/udp</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  eth-node:</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: ethereum/client-go:v1.10.18</span></span>
<span class="line"><span style="color:#e1e4e8;">    hostname: eth-node</span></span>
<span class="line"><span style="color:#e1e4e8;">    restart: always</span></span>
<span class="line"><span style="color:#e1e4e8;">    container_name: eth-node</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 30303:30303</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 30303:30303/udp</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 8550:8550</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 8546:8546</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 6060:6060</span></span>
<span class="line"><span style="color:#e1e4e8;">    restart: always</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;./eth-node/root:/root&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    command:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --ropsten</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --cache=1024</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --nousb</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --port=30303</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --http</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --http.api=admin,debug,miner,txpool,personal,eth,net,web3</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --http.port=8550</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --http.addr=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --http.vhosts=*</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --http.corsdomain=*</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --metrics</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --metrics.addr=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --metrics.port=6060</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --graphql</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --graphql.vhosts=*</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --ws</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --ws.addr=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --ws.port=8546</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --ws.api=admin,debug,miner,txpool,personal,eth,net,web3</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --ws.origins=*</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --rpc.allow-unprotected-txs</span></span>
<span class="line"><span style="color:#e1e4e8;">      - --override.terminaltotaldifficulty=50000000000000000</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">version: &#39;3.9&#39;</span></span>
<span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">  beacon-node:</span></span>
<span class="line"><span style="color:#24292e;">    image: gcr.io/prysmaticlabs/prysm/beacon-chain:v2.1.3-rc.3</span></span>
<span class="line"><span style="color:#24292e;">    hostname: beacon-node</span></span>
<span class="line"><span style="color:#24292e;">    restart: always</span></span>
<span class="line"><span style="color:#24292e;">    container_name: beacon-node</span></span>
<span class="line"><span style="color:#24292e;">    volumes:</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;./data:/data&quot;</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;./genesis.ssz:/genesis/genesis.ssz&quot;</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;./eth-node/root/.ethereum/ropsten:/ropsten&quot;</span></span>
<span class="line"><span style="color:#24292e;">    command:</span></span>
<span class="line"><span style="color:#24292e;">      - --datadir=/data</span></span>
<span class="line"><span style="color:#24292e;">      - --rpc-host=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">      - --monitoring-host=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">      - --http-web3provider=http://eth-node:8550</span></span>
<span class="line"><span style="color:#24292e;">      - --genesis-state=/genesis/genesis.ssz</span></span>
<span class="line"><span style="color:#24292e;">      - --terminal-total-difficulty-override=50000000000000000</span></span>
<span class="line"><span style="color:#24292e;">      - --ropsten</span></span>
<span class="line"><span style="color:#24292e;">      - --accept-terms-of-use</span></span>
<span class="line"><span style="color:#24292e;">      - --jwt-secret=/ropsten/geth/jwtsecret</span></span>
<span class="line"><span style="color:#24292e;">    ports:</span></span>
<span class="line"><span style="color:#24292e;">      - 4000:4000</span></span>
<span class="line"><span style="color:#24292e;">      - 13000:13000 </span></span>
<span class="line"><span style="color:#24292e;">      - 12000:12000/udp</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  eth-node:</span></span>
<span class="line"><span style="color:#24292e;">    image: ethereum/client-go:v1.10.18</span></span>
<span class="line"><span style="color:#24292e;">    hostname: eth-node</span></span>
<span class="line"><span style="color:#24292e;">    restart: always</span></span>
<span class="line"><span style="color:#24292e;">    container_name: eth-node</span></span>
<span class="line"><span style="color:#24292e;">    ports:</span></span>
<span class="line"><span style="color:#24292e;">      - 30303:30303</span></span>
<span class="line"><span style="color:#24292e;">      - 30303:30303/udp</span></span>
<span class="line"><span style="color:#24292e;">      - 8550:8550</span></span>
<span class="line"><span style="color:#24292e;">      - 8546:8546</span></span>
<span class="line"><span style="color:#24292e;">      - 6060:6060</span></span>
<span class="line"><span style="color:#24292e;">    restart: always</span></span>
<span class="line"><span style="color:#24292e;">    volumes:</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;./eth-node/root:/root&quot;</span></span>
<span class="line"><span style="color:#24292e;">    command:</span></span>
<span class="line"><span style="color:#24292e;">      - --ropsten</span></span>
<span class="line"><span style="color:#24292e;">      - --cache=1024</span></span>
<span class="line"><span style="color:#24292e;">      - --nousb</span></span>
<span class="line"><span style="color:#24292e;">      - --port=30303</span></span>
<span class="line"><span style="color:#24292e;">      - --http</span></span>
<span class="line"><span style="color:#24292e;">      - --http.api=admin,debug,miner,txpool,personal,eth,net,web3</span></span>
<span class="line"><span style="color:#24292e;">      - --http.port=8550</span></span>
<span class="line"><span style="color:#24292e;">      - --http.addr=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">      - --http.vhosts=*</span></span>
<span class="line"><span style="color:#24292e;">      - --http.corsdomain=*</span></span>
<span class="line"><span style="color:#24292e;">      - --metrics</span></span>
<span class="line"><span style="color:#24292e;">      - --metrics.addr=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">      - --metrics.port=6060</span></span>
<span class="line"><span style="color:#24292e;">      - --graphql</span></span>
<span class="line"><span style="color:#24292e;">      - --graphql.vhosts=*</span></span>
<span class="line"><span style="color:#24292e;">      - --ws</span></span>
<span class="line"><span style="color:#24292e;">      - --ws.addr=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">      - --ws.port=8546</span></span>
<span class="line"><span style="color:#24292e;">      - --ws.api=admin,debug,miner,txpool,personal,eth,net,web3</span></span>
<span class="line"><span style="color:#24292e;">      - --ws.origins=*</span></span>
<span class="line"><span style="color:#24292e;">      - --rpc.allow-unprotected-txs</span></span>
<span class="line"><span style="color:#24292e;">      - --override.terminaltotaldifficulty=50000000000000000</span></span></code></pre></div><ul><li>单节点</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-itd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--restart=unless-stopped</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/localtime:/etc/localtime</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/timezone:/etc/timezone</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">beacon-node</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">$(</span><span style="color:#79B8FF;">pwd</span><span style="color:#9ECBFF;">)/data:/data</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">$(</span><span style="color:#79B8FF;">pwd</span><span style="color:#9ECBFF;">)/data/jwt.hex:/opt/jwt.hex</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--network=host</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#9ECBFF;">gcr.io/prysmaticlabs/prysm/beacon-chain:v3.1.1</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--datadir=/data</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--jwt-secret=/opt/jwt.hex</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--rpc-host=0.0.0.0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--grpc-gateway-host=0.0.0.0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--monitoring-host=0.0.0.0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--execution-endpoint=http://127.0.0.1:8551</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--accept-terms-of-use=true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-itd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--restart=unless-stopped</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/localtime:/etc/localtime</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/timezone:/etc/timezone</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">beacon-node</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$(</span><span style="color:#005CC5;">pwd</span><span style="color:#032F62;">)/data:/data</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$(</span><span style="color:#005CC5;">pwd</span><span style="color:#032F62;">)/data/jwt.hex:/opt/jwt.hex</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--network=host</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#032F62;">gcr.io/prysmaticlabs/prysm/beacon-chain:v3.1.1</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--datadir=/data</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--jwt-secret=/opt/jwt.hex</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--rpc-host=0.0.0.0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--grpc-gateway-host=0.0.0.0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--monitoring-host=0.0.0.0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--execution-endpoint=http://127.0.0.1:8551</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--accept-terms-of-use=true</span></span></code></pre></div>`,65),o=[l];function t(c,r,i,y,d,h){return a(),n("div",null,o)}const E=s(p,[["render",t]]);export{g as __pageData,E as default};
