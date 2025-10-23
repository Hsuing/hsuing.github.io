import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"1.api访问,区块同步监测","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/geth/3-api.md","filePath":"guide/Blockchain/geth/3-api.md","lastUpdated":1741240552000}'),l={name:"guide/Blockchain/geth/3-api.md"},p=e(`<p>JSON-RPC是区块链外部调用的标配了。以太坊同样也实现了这个功能。底层支持四种协议：InProc，IPC，HTTP，WEBSOCKED。上层除了常规的方法调用之外还实现了Pub/Sub功能</p><h1 id="_1-api访问-区块同步监测" tabindex="-1">1.api访问,区块同步监测 <a class="header-anchor" href="#_1-api访问-区块同步监测" aria-label="Permalink to &quot;1.api访问,区块同步监测&quot;">​</a></h1><ul><li><p>大概一周的时间,可以同步完成　，云服务器8核16G内存+50g系统SDD盘+500g数据SDD盘，采用计算型</p></li><li><p>查看 同步eth_syncing</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@eth ~]# curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_syncing&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.31.39.254:8545</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;jsonrpc&quot;:&quot;2.0&quot;,&quot;id&quot;:67,&quot;result&quot;:{&quot;currentBlock&quot;:&quot;0x87b7e1&quot;,&quot;highestBlock&quot;:&quot;0x87b836&quot;,&quot;knownStates&quot;:&quot;0x113b861a&quot;,&quot;pulledStates&quot;:&quot;0x113b7f11&quot;,&quot;startingBlock&quot;:&quot;0x87a009&quot;}}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@eth ~]# curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_syncing&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.31.39.254:8545</span></span>
<span class="line"><span style="color:#24292e;">{&quot;jsonrpc&quot;:&quot;2.0&quot;,&quot;id&quot;:67,&quot;result&quot;:{&quot;currentBlock&quot;:&quot;0x87b7e1&quot;,&quot;highestBlock&quot;:&quot;0x87b836&quot;,&quot;knownStates&quot;:&quot;0x113b861a&quot;,&quot;pulledStates&quot;:&quot;0x113b7f11&quot;,&quot;startingBlock&quot;:&quot;0x87a009&quot;}}</span></span></code></pre></div><ul><li>查看块高度</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">echo $((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data  &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.31.39.254:8545 |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">echo $((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data  &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.31.39.254:8545 |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))</span></span></code></pre></div><p>默认是显示为１６进制</p><ul><li>查看账户信息</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_accounts&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.25.0.10:8545</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_accounts&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.25.0.10:8545</span></span></code></pre></div><ul><li>查看账户余额</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_getBalance&quot;,&quot;params&quot;:[&quot;0xde1e758511a7c67e7db93d1c23c1060a21db4615&quot;,&quot;latest&quot;],&quot;id&quot;:67}&#39; 172.25.0.10:8545</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_getBalance&quot;,&quot;params&quot;:[&quot;0xde1e758511a7c67e7db93d1c23c1060a21db4615&quot;,&quot;latest&quot;],&quot;id&quot;:67}&#39; 172.25.0.10:8545</span></span></code></pre></div><ul><li>查看交易状态</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;miner_start&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.25.0.10:8545</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;miner_start&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.25.0.10:8545</span></span></code></pre></div><p>有时geth进程运行正常，区块同步故障，需要检查区块高度是否增长</p><p>使用curl访问api查询区块高度，间隔一段时间在查，对比没增长则重启进程</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#定时任务</span></span>
<span class="line"><span style="color:#e1e4e8;">#check blockchain</span></span>
<span class="line"><span style="color:#e1e4e8;">#*/4 * * * * bash /opt/shell/check.geth.sh</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#var</span></span>
<span class="line"><span style="color:#e1e4e8;">eth_api=localhost:8545</span></span>
<span class="line"><span style="color:#e1e4e8;">Stime=180</span></span>
<span class="line"><span style="color:#e1e4e8;">[ $1 -gt $Stime ] &amp;&amp; { Stime=$1 ; }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">H1=$((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39;  $eth_api |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sleep $Stime</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">H2=$((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39;  $eth_api |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if [[ $H1 -eq $H2 ]];then</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;geth restart at  $(date +%F&quot; &quot;%T)  block $H1&quot; &gt;&gt;/tmp/geth.restart.log</span></span>
<span class="line"><span style="color:#e1e4e8;">    supervisorctl restart geth &amp;&gt;/dev/null</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#定时任务</span></span>
<span class="line"><span style="color:#24292e;">#check blockchain</span></span>
<span class="line"><span style="color:#24292e;">#*/4 * * * * bash /opt/shell/check.geth.sh</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#var</span></span>
<span class="line"><span style="color:#24292e;">eth_api=localhost:8545</span></span>
<span class="line"><span style="color:#24292e;">Stime=180</span></span>
<span class="line"><span style="color:#24292e;">[ $1 -gt $Stime ] &amp;&amp; { Stime=$1 ; }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">H1=$((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39;  $eth_api |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sleep $Stime</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">H2=$((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39;  $eth_api |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if [[ $H1 -eq $H2 ]];then</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;geth restart at  $(date +%F&quot; &quot;%T)  block $H1&quot; &gt;&gt;/tmp/geth.restart.log</span></span>
<span class="line"><span style="color:#24292e;">    supervisorctl restart geth &amp;&gt;/dev/null</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span></code></pre></div><h1 id="_1-1geth客户端登陆操作" tabindex="-1">1.1geth客户端登陆操作 <a class="header-anchor" href="#_1-1geth客户端登陆操作" aria-label="Permalink to &quot;1.1geth客户端登陆操作&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@eth eth]# ./geth attach rpc:http://172.31.39.254:8545</span></span>
<span class="line"><span style="color:#e1e4e8;">Welcome to the Geth JavaScript console!</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">instance: Geth/v1.9.6-stable-bd059680/linux-amd64/go1.13.1</span></span>
<span class="line"><span style="color:#e1e4e8;">coinbase: 0x24106cc3ccd0a5266874c67f5dc44abc330861be</span></span>
<span class="line"><span style="color:#e1e4e8;">at block: 0 (Thu, 01 Jan 1970 00:00:00 UTC)</span></span>
<span class="line"><span style="color:#e1e4e8;"> modules: eth:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@eth eth]# ./geth attach rpc:http://172.31.39.254:8545</span></span>
<span class="line"><span style="color:#24292e;">Welcome to the Geth JavaScript console!</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">instance: Geth/v1.9.6-stable-bd059680/linux-amd64/go1.13.1</span></span>
<span class="line"><span style="color:#24292e;">coinbase: 0x24106cc3ccd0a5266874c67f5dc44abc330861be</span></span>
<span class="line"><span style="color:#24292e;">at block: 0 (Thu, 01 Jan 1970 00:00:00 UTC)</span></span>
<span class="line"><span style="color:#24292e;"> modules: eth:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><p>或者</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@eth eth]# ./geth attach /data/coin/eth/geth.ipc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@eth eth]# ./geth attach /data/coin/eth/geth.ipc</span></span></code></pre></div><ul><li>操作</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看状态</span></span>
<span class="line"><span style="color:#e1e4e8;">eth</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看最新区块高度</span></span>
<span class="line"><span style="color:#e1e4e8;">eth.blockNumber</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看同步状态，返回 false 未同步或同步到最新了</span></span>
<span class="line"><span style="color:#e1e4e8;">eth.syncing</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#生成账户，密码 password123</span></span>
<span class="line"><span style="color:#e1e4e8;">personal.newAccount(&#39;password123&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; eth.syncing    ----输出false代表同步成功</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  currentBlock: 8894954,    // 同步到的区块高度</span></span>
<span class="line"><span style="color:#e1e4e8;">  highestBlock: 8895035,    // 所链接的节点的最高高度 </span></span>
<span class="line"><span style="color:#e1e4e8;">  knownStates: 289655671,</span></span>
<span class="line"><span style="color:#e1e4e8;">  pulledStates: 289651487,</span></span>
<span class="line"><span style="color:#e1e4e8;">  startingBlock: 8888329</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看状态</span></span>
<span class="line"><span style="color:#24292e;">eth</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看最新区块高度</span></span>
<span class="line"><span style="color:#24292e;">eth.blockNumber</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看同步状态，返回 false 未同步或同步到最新了</span></span>
<span class="line"><span style="color:#24292e;">eth.syncing</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#生成账户，密码 password123</span></span>
<span class="line"><span style="color:#24292e;">personal.newAccount(&#39;password123&#39;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; eth.syncing    ----输出false代表同步成功</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  currentBlock: 8894954,    // 同步到的区块高度</span></span>
<span class="line"><span style="color:#24292e;">  highestBlock: 8895035,    // 所链接的节点的最高高度 </span></span>
<span class="line"><span style="color:#24292e;">  knownStates: 289655671,</span></span>
<span class="line"><span style="color:#24292e;">  pulledStates: 289651487,</span></span>
<span class="line"><span style="color:#24292e;">  startingBlock: 8888329</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="supervisor管理以太坊geth进程" tabindex="-1">supervisor管理以太坊geth进程 <a class="header-anchor" href="#supervisor管理以太坊geth进程" aria-label="Permalink to &quot;supervisor管理以太坊geth进程&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#安装启动supervisor(ubuntu)</span></span>
<span class="line"><span style="color:#e1e4e8;">apt-get install -y supervisor</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start supervisor</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable supervisor</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#配置geth</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /var/log/geth</span></span>
<span class="line"><span style="color:#e1e4e8;">vim /etc/supervisor/conf.d/geth.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">#配置文件如下 </span></span>
<span class="line"><span style="color:#e1e4e8;">[program:geth]</span></span>
<span class="line"><span style="color:#e1e4e8;">command=/opt/geth/geth --rpc --rpcapi web3,eth,net,db,personal --rpcaddr 0.0.0.0 --rpcport 8545</span></span>
<span class="line"><span style="color:#e1e4e8;">directory=/opt/geth</span></span>
<span class="line"><span style="color:#e1e4e8;">user=root</span></span>
<span class="line"><span style="color:#e1e4e8;">autostart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">autorestart=true</span></span>
<span class="line"><span style="color:#e1e4e8;">startretries=9999</span></span>
<span class="line"><span style="color:#e1e4e8;">exitcodes=0</span></span>
<span class="line"><span style="color:#e1e4e8;">stopsignal=KILL</span></span>
<span class="line"><span style="color:#e1e4e8;">stopwaitsecs=10</span></span>
<span class="line"><span style="color:#e1e4e8;">redirect_stderr=true</span></span>
<span class="line"><span style="color:#e1e4e8;">logfile_backups=10</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile_maxbytes=8MB</span></span>
<span class="line"><span style="color:#e1e4e8;">stdout_logfile=/var/log/geth/geth.log</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#安装启动supervisor(ubuntu)</span></span>
<span class="line"><span style="color:#24292e;">apt-get install -y supervisor</span></span>
<span class="line"><span style="color:#24292e;">systemctl start supervisor</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable supervisor</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#配置geth</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /var/log/geth</span></span>
<span class="line"><span style="color:#24292e;">vim /etc/supervisor/conf.d/geth.conf </span></span>
<span class="line"><span style="color:#24292e;">#配置文件如下 </span></span>
<span class="line"><span style="color:#24292e;">[program:geth]</span></span>
<span class="line"><span style="color:#24292e;">command=/opt/geth/geth --rpc --rpcapi web3,eth,net,db,personal --rpcaddr 0.0.0.0 --rpcport 8545</span></span>
<span class="line"><span style="color:#24292e;">directory=/opt/geth</span></span>
<span class="line"><span style="color:#24292e;">user=root</span></span>
<span class="line"><span style="color:#24292e;">autostart=true</span></span>
<span class="line"><span style="color:#24292e;">autorestart=true</span></span>
<span class="line"><span style="color:#24292e;">startretries=9999</span></span>
<span class="line"><span style="color:#24292e;">exitcodes=0</span></span>
<span class="line"><span style="color:#24292e;">stopsignal=KILL</span></span>
<span class="line"><span style="color:#24292e;">stopwaitsecs=10</span></span>
<span class="line"><span style="color:#24292e;">redirect_stderr=true</span></span>
<span class="line"><span style="color:#24292e;">logfile_backups=10</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile_maxbytes=8MB</span></span>
<span class="line"><span style="color:#24292e;">stdout_logfile=/var/log/geth/geth.log</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#使用supervisor启动geth</span></span>
<span class="line"><span style="color:#e1e4e8;">supervisorctl reload</span></span>
<span class="line"><span style="color:#e1e4e8;">supervisorctl restart geth</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#使用supervisor启动geth</span></span>
<span class="line"><span style="color:#24292e;">supervisorctl reload</span></span>
<span class="line"><span style="color:#24292e;">supervisorctl restart geth</span></span></code></pre></div><h1 id="_2-docker方式部署geth节点" tabindex="-1">2.docker方式部署geth节点 <a class="header-anchor" href="#_2-docker方式部署geth节点" aria-label="Permalink to &quot;2.docker方式部署geth节点&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#date dir</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p /data/eth_date</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#run eth</span></span>
<span class="line"><span style="color:#e1e4e8;">docker run -dit --name eth -h eth \\</span></span>
<span class="line"><span style="color:#e1e4e8;"> -v /etc/localtime:/etc/localtime:ro \\</span></span>
<span class="line"><span style="color:#e1e4e8;"> -v /data/eth_date:/root/.ethereum \\</span></span>
<span class="line"><span style="color:#e1e4e8;"> -p 30303:30303 -p 8545:8545 \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  --restart=always \\</span></span>
<span class="line"><span style="color:#e1e4e8;">ethereum/client-go:stable  --rpc --rpcaddr &quot;0.0.0.0&quot; \\</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpcapi &quot;web3,eth,net,db,personal&quot; --maxpeers=50 --rpccorsdomain &quot;*&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#date dir</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p /data/eth_date</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#run eth</span></span>
<span class="line"><span style="color:#24292e;">docker run -dit --name eth -h eth \\</span></span>
<span class="line"><span style="color:#24292e;"> -v /etc/localtime:/etc/localtime:ro \\</span></span>
<span class="line"><span style="color:#24292e;"> -v /data/eth_date:/root/.ethereum \\</span></span>
<span class="line"><span style="color:#24292e;"> -p 30303:30303 -p 8545:8545 \\</span></span>
<span class="line"><span style="color:#24292e;">  --restart=always \\</span></span>
<span class="line"><span style="color:#24292e;">ethereum/client-go:stable  --rpc --rpcaddr &quot;0.0.0.0&quot; \\</span></span>
<span class="line"><span style="color:#24292e;">  --rpcapi &quot;web3,eth,net,db,personal&quot; --maxpeers=50 --rpccorsdomain &quot;*&quot;</span></span></code></pre></div><h1 id="_3-rpc要加密访问" tabindex="-1">3.RPC要加密访问 <a class="header-anchor" href="#_3-rpc要加密访问" aria-label="Permalink to &quot;3.RPC要加密访问&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 80 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen [::]:80 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">	root /var/www/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">	server_name localhost;</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">	location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">		try_files $uri $uri/ =404;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">	location /eth {</span></span>
<span class="line"><span style="color:#e1e4e8;">    	#try_files $uri $uri/ =404;</span></span>
<span class="line"><span style="color:#e1e4e8;">    	auth_basic &quot;Restricted Area&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    	auth_basic_user_file /etc/nginx/geth.htpasswd;</span></span>
<span class="line"><span style="color:#e1e4e8;">		proxy_pass http://localhost:rpcport;</span></span>
<span class="line"><span style="color:#e1e4e8;">		if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;*&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        #</span></span>
<span class="line"><span style="color:#e1e4e8;">        # Tell client that this pre-flight info is valid for 20 days</span></span>
<span class="line"><span style="color:#e1e4e8;">        #</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Access-Control-Max-Age&#39; 1728000;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Content-Type&#39; &#39;text/plain charset=UTF-8&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        add_header &#39;Content-Length&#39; 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">        return 204;</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span>
<span class="line"><span style="color:#e1e4e8;">  	}</span></span>
<span class="line"><span style="color:#e1e4e8;">	</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 80 default_server;</span></span>
<span class="line"><span style="color:#24292e;">	listen [::]:80 default_server;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">	root /var/www/html;</span></span>
<span class="line"><span style="color:#24292e;">	server_name localhost;</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">	location / {</span></span>
<span class="line"><span style="color:#24292e;">		try_files $uri $uri/ =404;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">	location /eth {</span></span>
<span class="line"><span style="color:#24292e;">    	#try_files $uri $uri/ =404;</span></span>
<span class="line"><span style="color:#24292e;">    	auth_basic &quot;Restricted Area&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    	auth_basic_user_file /etc/nginx/geth.htpasswd;</span></span>
<span class="line"><span style="color:#24292e;">		proxy_pass http://localhost:rpcport;</span></span>
<span class="line"><span style="color:#24292e;">		if ($request_method = &#39;OPTIONS&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Origin&#39; &#39;*&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Methods&#39; &#39;GET, POST, OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Allow-Headers&#39; &#39;DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        #</span></span>
<span class="line"><span style="color:#24292e;">        # Tell client that this pre-flight info is valid for 20 days</span></span>
<span class="line"><span style="color:#24292e;">        #</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Access-Control-Max-Age&#39; 1728000;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Content-Type&#39; &#39;text/plain charset=UTF-8&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        add_header &#39;Content-Length&#39; 0;</span></span>
<span class="line"><span style="color:#24292e;">        return 204;</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span>
<span class="line"><span style="color:#24292e;">  	}</span></span>
<span class="line"><span style="color:#24292e;">	</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,29),t=[p];function o(c,r,i,u,d,h){return a(),n("div",null,t)}const g=s(l,[["render",o]]);export{q as __pageData,g as default};
