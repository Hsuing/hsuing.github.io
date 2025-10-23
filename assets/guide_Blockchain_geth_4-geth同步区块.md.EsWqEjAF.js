import{_ as e,D as a,o as n,c as p,I as l,w as t,R as o,a as c}from"./chunks/framework.zUbWieqp.js";const b=JSON.parse('{"title":"1.关闭 A服务器 上 的 geth","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/geth/4-geth同步区块.md","filePath":"guide/Blockchain/geth/4-geth同步区块.md","lastUpdated":1701401252000}'),i={name:"guide/Blockchain/geth/4-geth同步区块.md"},r=o(`<p>核心思路 : 从原有的(或者从别人那里) 拷贝数据到自己的服务器</p><blockquote><p>在 geth 的控制台调用 eth.syncing 发现 currentBlock 一直低于highestBlock</p></blockquote><p>环境：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">服务器 A: 已经同步好区块的服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">服务器 B: 同步有问题的服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">当前区块数据大小: 180G 左右</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">服务器 A: 已经同步好区块的服务器</span></span>
<span class="line"><span style="color:#24292e;">服务器 B: 同步有问题的服务器</span></span>
<span class="line"><span style="color:#24292e;">当前区块数据大小: 180G 左右</span></span></code></pre></div><h1 id="_1-关闭-a服务器-上-的-geth" tabindex="-1">1.关闭 A服务器 上 的 geth <a class="header-anchor" href="#_1-关闭-a服务器-上-的-geth" aria-label="Permalink to &quot;1.关闭 A服务器 上 的 geth&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ps -axu | grep geth # 查看geth 的 pid </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">kill  -INT \${pid} # 给 geth 发出 停止信号 #.... 等待关闭完成(大约 20 秒) </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tail -n 10 nohup.out # 查看是否输出 已经关闭了数据库</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ps -axu | grep geth # 确保没有geth 正在运行</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ps -axu | grep geth # 查看geth 的 pid </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">kill  -INT \${pid} # 给 geth 发出 停止信号 #.... 等待关闭完成(大约 20 秒) </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tail -n 10 nohup.out # 查看是否输出 已经关闭了数据库</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ps -axu | grep geth # 确保没有geth 正在运行</span></span></code></pre></div><h1 id="_2-拷贝数据到新的服务器" tabindex="-1">2.拷贝数据到新的服务器 <a class="header-anchor" href="#_2-拷贝数据到新的服务器" aria-label="Permalink to &quot;2.拷贝数据到新的服务器&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">scp A  root@B:/root/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">scp A  root@B:/root/</span></span></code></pre></div><h1 id="_3-在-b-服务器上-同步-a-服务器-的数据" tabindex="-1">3.在 B 服务器上 同步 A 服务器 的数据 <a class="header-anchor" href="#_3-在-b-服务器上-同步-a-服务器-的数据" aria-label="Permalink to &quot;3.在 B 服务器上 同步 A 服务器 的数据&quot;">​</a></h1><ul><li>数据cp结束之后，把 A 服务的geth 重新启动起来</li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>启动数据文件夹指向复制过来的文件夹, 同步节点 指向 服务器 A. 不过记得修改 nodekey, 否则无法同步</p></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">./geth --data-dir =/tmp/eth/ # 生成 新的 nodekey </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#将原有的nodkey 改名 </span></span>
<span class="line"><span style="color:#e1e4e8;">mv ~/ethdata/data/geth/nodekey ~/ethdata/data/geth/nodekey2 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 复制新生成的nodekey 到数据目录</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> cp /tmp/eth/geth/nodekey  /data/coin/eth/geth/nodekey rm -rf /tmp/eth/ </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #启动</span></span>
<span class="line"><span style="color:#e1e4e8;"> nohup /data/apps/eth/geth --rpc --port 8546 --rpcport 8545 --rpcapi admin,web3,db,eth,net,personal --rpcaddr=172.31.171.xxx --datadir /data/coin/eth --maxpeers 100 --cache 1024 &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">./geth --data-dir =/tmp/eth/ # 生成 新的 nodekey </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#将原有的nodkey 改名 </span></span>
<span class="line"><span style="color:#24292e;">mv ~/ethdata/data/geth/nodekey ~/ethdata/data/geth/nodekey2 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 复制新生成的nodekey 到数据目录</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> cp /tmp/eth/geth/nodekey  /data/coin/eth/geth/nodekey rm -rf /tmp/eth/ </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #启动</span></span>
<span class="line"><span style="color:#24292e;"> nohup /data/apps/eth/geth --rpc --port 8546 --rpcport 8545 --rpcapi admin,web3,db,eth,net,personal --rpcaddr=172.31.171.xxx --datadir /data/coin/eth --maxpeers 100 --cache 1024 &amp;</span></span></code></pre></div><h1 id="_4-geth-控制台-将a-服务器的节点添加进去" tabindex="-1">4.geth 控制台, 将A 服务器的节点添加进去 <a class="header-anchor" href="#_4-geth-控制台-将a-服务器的节点添加进去" aria-label="Permalink to &quot;4.geth 控制台, 将A 服务器的节点添加进去&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/geth attach http://xxx.xxx.xxx.xxx # 连接到</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 添加服务器A geht 的节点</span></span>
<span class="line"><span style="color:#e1e4e8;">admin.addPeer(&quot;enode://xxxxx@0.0.0.0:30303?discport=0&quot;);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/geth attach http://xxx.xxx.xxx.xxx # 连接到</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 添加服务器A geht 的节点</span></span>
<span class="line"><span style="color:#24292e;">admin.addPeer(&quot;enode://xxxxx@0.0.0.0:30303?discport=0&quot;);</span></span></code></pre></div><ul><li>查看p2p 节点</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">head /path/nohup.out </span></span>
<span class="line"><span style="color:#e1e4e8;">NFO [11-29|07:56:16.208] Started P2P networking  self=&quot;enode://xxxxx@0.0.0.0:30303?discport=0&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">head /path/nohup.out </span></span>
<span class="line"><span style="color:#24292e;">NFO [11-29|07:56:16.208] Started P2P networking  self=&quot;enode://xxxxx@0.0.0.0:30303?discport=0&quot;</span></span></code></pre></div>`,16);function d(h,g,y,u,x,k){const s=a("center");return n(),p("div",null,[l(s,null,{default:t(()=>[c("geth 同步区块一直落后的解决方案")]),_:1}),r])}const m=e(i,[["render",d]]);export{b as __pageData,m as default};
