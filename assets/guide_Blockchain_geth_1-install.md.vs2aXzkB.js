import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. 配置 go 语言运行环境","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/geth/1-install.md","filePath":"guide/Blockchain/geth/1-install.md","lastUpdated":1756834371000}'),l={name:"guide/Blockchain/geth/1-install.md"},p=e(`<blockquote><p>机器配置</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">高级配置</span></span>
<span class="line"><span style="color:#e1e4e8;">CPU: 网络增强型 8 核</span></span>
<span class="line"><span style="color:#e1e4e8;">内存: 16GB</span></span>
<span class="line"><span style="color:#e1e4e8;">硬盘: 500GB SSD 固态硬盘</span></span>
<span class="line"><span style="color:#e1e4e8;">网络: 3M+</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">中产阶级配置</span></span>
<span class="line"><span style="color:#e1e4e8;">CPU: 通用型 4 核</span></span>
<span class="line"><span style="color:#e1e4e8;">内存: 8GB</span></span>
<span class="line"><span style="color:#e1e4e8;">硬盘: 500GB 高速云盘(机械硬盘)</span></span>
<span class="line"><span style="color:#e1e4e8;">网络: 1MB (独享)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">贫民配置</span></span>
<span class="line"><span style="color:#e1e4e8;">CPU: 通用型 2 核</span></span>
<span class="line"><span style="color:#e1e4e8;">内存: 4GB</span></span>
<span class="line"><span style="color:#e1e4e8;">硬盘: 500GB 高速云盘</span></span>
<span class="line"><span style="color:#e1e4e8;">网络: 1M</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">注意：同步时间ＵＴＣ</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">同步的时候不怎么吃负载 只吃磁盘跟网络</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">同步速度看使用的硬盘 以下为本人实测：</span></span>
<span class="line"><span style="color:#e1e4e8;">服务器 8核16G</span></span>
<span class="line"><span style="color:#e1e4e8;">AWS m6i</span></span>
<span class="line"><span style="color:#e1e4e8;">使用gp3磁盘 8K IO 200M读写 每小时同步8000个块</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Google Cloud C2-standard-8</span></span>
<span class="line"><span style="color:#e1e4e8;">便宜的话可以用&quot;平衡的永久性磁盘&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">1TB磁盘的情况下 6K IO 240M读写 每小时大约4000-5000个块</span></span>
<span class="line"><span style="color:#e1e4e8;">SSD与aws速度相同</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">高级配置</span></span>
<span class="line"><span style="color:#24292e;">CPU: 网络增强型 8 核</span></span>
<span class="line"><span style="color:#24292e;">内存: 16GB</span></span>
<span class="line"><span style="color:#24292e;">硬盘: 500GB SSD 固态硬盘</span></span>
<span class="line"><span style="color:#24292e;">网络: 3M+</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">中产阶级配置</span></span>
<span class="line"><span style="color:#24292e;">CPU: 通用型 4 核</span></span>
<span class="line"><span style="color:#24292e;">内存: 8GB</span></span>
<span class="line"><span style="color:#24292e;">硬盘: 500GB 高速云盘(机械硬盘)</span></span>
<span class="line"><span style="color:#24292e;">网络: 1MB (独享)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">贫民配置</span></span>
<span class="line"><span style="color:#24292e;">CPU: 通用型 2 核</span></span>
<span class="line"><span style="color:#24292e;">内存: 4GB</span></span>
<span class="line"><span style="color:#24292e;">硬盘: 500GB 高速云盘</span></span>
<span class="line"><span style="color:#24292e;">网络: 1M</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">注意：同步时间ＵＴＣ</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">同步的时候不怎么吃负载 只吃磁盘跟网络</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">同步速度看使用的硬盘 以下为本人实测：</span></span>
<span class="line"><span style="color:#24292e;">服务器 8核16G</span></span>
<span class="line"><span style="color:#24292e;">AWS m6i</span></span>
<span class="line"><span style="color:#24292e;">使用gp3磁盘 8K IO 200M读写 每小时同步8000个块</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Google Cloud C2-standard-8</span></span>
<span class="line"><span style="color:#24292e;">便宜的话可以用&quot;平衡的永久性磁盘&quot;</span></span>
<span class="line"><span style="color:#24292e;">1TB磁盘的情况下 6K IO 240M读写 每小时大约4000-5000个块</span></span>
<span class="line"><span style="color:#24292e;">SSD与aws速度相同</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>注意：由于现在公网上eth的块有1Ｔ数据量</p></div><h1 id="_1-配置-go-语言运行环境" tabindex="-1">1. 配置 go 语言运行环境 <a class="header-anchor" href="#_1-配置-go-语言运行环境" aria-label="Permalink to &quot;1. 配置 go 语言运行环境&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://golang.org/dl/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://dl.google.com/go/go1.13.1.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 解压</span></span>
<span class="line"><span style="color:#e1e4e8;">tar xvpzf go1.13.1.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 安装</span></span>
<span class="line"><span style="color:#e1e4e8;">mv go /usr/local/</span></span>
<span class="line"><span style="color:#e1e4e8;">sudo ln -s /usr/local/go/bin/go /usr/local/bin/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://golang.org/dl/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">wget https://dl.google.com/go/go1.13.1.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 解压</span></span>
<span class="line"><span style="color:#24292e;">tar xvpzf go1.13.1.linux-amd64.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 安装</span></span>
<span class="line"><span style="color:#24292e;">mv go /usr/local/</span></span>
<span class="line"><span style="color:#24292e;">sudo ln -s /usr/local/go/bin/go /usr/local/bin/</span></span></code></pre></div><h1 id="_2-源码安装-geth" tabindex="-1">2. 源码安装 geth <a class="header-anchor" href="#_2-源码安装-geth" aria-label="Permalink to &quot;2. 源码安装 geth&quot;">​</a></h1><blockquote><p>采用编译以太坊官方的源码来安装， 我安装的时候最新版本是 v1.8.17, 大家具体根据自己情况下载对应的版本，下载地址：<a href="https://github.com/ethereum/go-ethereum/tags" target="_blank" rel="noreferrer">https://github.com/ethereum/go-ethereum/tags</a></p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://github.com/ethereum/go-ethereum/archive/v1.8.17.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"># 解压</span></span>
<span class="line"><span style="color:#e1e4e8;">tar xvpzf v1.8.17.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">mv go-ethereum-1.8.17 /usr/local/go-ethereum</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /usr/local/go-ethereum</span></span>
<span class="line"><span style="color:#e1e4e8;">make all</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://github.com/ethereum/go-ethereum/archive/v1.8.17.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"># 解压</span></span>
<span class="line"><span style="color:#24292e;">tar xvpzf v1.8.17.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">mv go-ethereum-1.8.17 /usr/local/go-ethereum</span></span>
<span class="line"><span style="color:#24292e;">cd /usr/local/go-ethereum</span></span>
<span class="line"><span style="color:#24292e;">make all</span></span></code></pre></div><blockquote><p>编译完成之后在 build/bin 目录下会生成很多可执行文件，geth 就是其中一个</p></blockquote><h2 id="_2-1-二进制" tabindex="-1">2.1 二进制 <a class="header-anchor" href="#_2-1-二进制" aria-label="Permalink to &quot;2.1 二进制&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看下载页面最新版</span></span>
<span class="line"><span style="color:#e1e4e8;"># https://ethereum.github.io/go-ethereum/downloads/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#下载</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /opt</span></span>
<span class="line"><span style="color:#e1e4e8;">Version=1.8.20-24d727b6</span></span>
<span class="line"><span style="color:#e1e4e8;">wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-\${Version}.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#解压安装</span></span>
<span class="line"><span style="color:#e1e4e8;">tar zxf geth-linux-amd64-\${Version}.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">rm -f geth-linux-amd64-\${Version}.tar.gz</span></span>
<span class="line"><span style="color:#e1e4e8;">rm -rf /opt/geth</span></span>
<span class="line"><span style="color:#e1e4e8;">ln -fs /opt/geth-linux-amd64-\${Version} /opt/geth</span></span>
<span class="line"><span style="color:#e1e4e8;">ln -fs /opt/geth-linux-amd64-\${Version}/geth  /usr/local/bin/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#检查</span></span>
<span class="line"><span style="color:#e1e4e8;">geth version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看下载页面最新版</span></span>
<span class="line"><span style="color:#24292e;"># https://ethereum.github.io/go-ethereum/downloads/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#下载</span></span>
<span class="line"><span style="color:#24292e;">cd /opt</span></span>
<span class="line"><span style="color:#24292e;">Version=1.8.20-24d727b6</span></span>
<span class="line"><span style="color:#24292e;">wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-\${Version}.tar.gz</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#解压安装</span></span>
<span class="line"><span style="color:#24292e;">tar zxf geth-linux-amd64-\${Version}.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">rm -f geth-linux-amd64-\${Version}.tar.gz</span></span>
<span class="line"><span style="color:#24292e;">rm -rf /opt/geth</span></span>
<span class="line"><span style="color:#24292e;">ln -fs /opt/geth-linux-amd64-\${Version} /opt/geth</span></span>
<span class="line"><span style="color:#24292e;">ln -fs /opt/geth-linux-amd64-\${Version}/geth  /usr/local/bin/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#检查</span></span>
<span class="line"><span style="color:#24292e;">geth version</span></span></code></pre></div><p>或者下载二进制 <a href="https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.9.6-bd059680.tar.gz" target="_blank" rel="noreferrer">https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.9.6-bd059680.tar.gz</a></p><h2 id="_2-2-配置环境变量" tabindex="-1">2.2 配置环境变量 <a class="header-anchor" href="#_2-2-配置环境变量" aria-label="Permalink to &quot;2.2 配置环境变量&quot;">​</a></h2><p>编辑 /etc/profile 文件，添加 geth 和 go 语言的环境变量</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">GOROOT=/usr/local/go</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PATH=&quot;/usr/local/go/bin:/usr/local/go-ethereum/build/bin:$PATH&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">GOROOT=/usr/local/go</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PATH=&quot;/usr/local/go/bin:/usr/local/go-ethereum/build/bin:$PATH&quot;</span></span></code></pre></div><h2 id="_2-3启动" tabindex="-1">2.3启动 <a class="header-anchor" href="#_2-3启动" aria-label="Permalink to &quot;2.3启动&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mkdir /data/coin</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/apps/eth/geth --rpc --rpcport 8545 --rpcapi web3,db,eth,net,personal --rpcaddr=172.31.39.1  --datadir /data/coin/eth --maxpeers 100</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">nohup geth --syncmode &quot;fast&quot; --networkid 1 --datadir /data --cache 2048 --identity &quot;ddblock&quot; --rpc --rpcapi &quot;db,eth,net,web3&quot; --rpccorsdomain &quot;*&quot; --rpcport 8545 --port 30303 --rpcaddr 127.0.0.1  &amp; &gt; nohup.out</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#online</span></span>
<span class="line"><span style="color:#e1e4e8;">nohup /data/apps/eth/geth  --allow-insecure-unlock --rpc --port 8546 --rpcport 8545 --rpcapi web3,db,eth,net,personal --rpcaddr=172.31.34.215 --datadir /data/coin/eth --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs &amp;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">默认date目录在 ~/.ethereum/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mkdir /data/coin</span></span>
<span class="line"><span style="color:#24292e;">/data/apps/eth/geth --rpc --rpcport 8545 --rpcapi web3,db,eth,net,personal --rpcaddr=172.31.39.1  --datadir /data/coin/eth --maxpeers 100</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">nohup geth --syncmode &quot;fast&quot; --networkid 1 --datadir /data --cache 2048 --identity &quot;ddblock&quot; --rpc --rpcapi &quot;db,eth,net,web3&quot; --rpccorsdomain &quot;*&quot; --rpcport 8545 --port 30303 --rpcaddr 127.0.0.1  &amp; &gt; nohup.out</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#online</span></span>
<span class="line"><span style="color:#24292e;">nohup /data/apps/eth/geth  --allow-insecure-unlock --rpc --port 8546 --rpcport 8545 --rpcapi web3,db,eth,net,personal --rpcaddr=172.31.34.215 --datadir /data/coin/eth --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs &amp;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">默认date目录在 ~/.ethereum/</span></span></code></pre></div><h3 id="高本版启动方式" tabindex="-1">高本版启动方式 <a class="header-anchor" href="#高本版启动方式" aria-label="Permalink to &quot;高本版启动方式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#1.10.13</span></span>
<span class="line"><span style="color:#e1e4e8;">nohup /data/apps/eth/geth  --allow-insecure-unlock  --http --http.port 8546 --http.port 8545 --http.api web3,eth,net,personal --http.addr=172.31.34.215 --datadir /data/coin/eth --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#1.10.13</span></span>
<span class="line"><span style="color:#24292e;">nohup /data/apps/eth/geth  --allow-insecure-unlock  --http --http.port 8546 --http.port 8545 --http.api web3,eth,net,personal --http.addr=172.31.34.215 --datadir /data/coin/eth --maxpeers 101 --cache 1024 --rpc.allow-unprotected-txs &amp;</span></span></code></pre></div><h3 id="_4-1-参数进行简单解释" tabindex="-1">4.1 参数进行简单解释 <a class="header-anchor" href="#_4-1-参数进行简单解释" aria-label="Permalink to &quot;4.1 参数进行简单解释&quot;">​</a></h3><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>--syncmode</td><td>同步模式，有三种fast ,full,light</td></tr><tr><td>--networkid</td><td>网络ID(整型, 1=Main, 2=Morden (弃用), 3=Ropsten, 4=Rinkeby) 这里我们使用默认值 1 表示同步主网的数据</td></tr><tr><td>--datadir</td><td>钱包以及区块数据等存储目录，这个建议单独使用数据盘，不要指定系统盘的文件夹</td></tr><tr><td>--identity</td><td>节点标识符</td></tr><tr><td>--rpc</td><td>开启 RPC 服务</td></tr><tr><td>--rpcapi</td><td>开放那些 API 给 JSONRPC 调用，默认 personal 工具是不开放的</td></tr><tr><td>--rpccorsdomain</td><td>RPC 调用跨域限制，*号标识不限制</td></tr><tr><td>--rpcport</td><td>JSONRPC 服务监控的端口</td></tr><tr><td>--port</td><td>同步服务端口</td></tr><tr><td>--cache</td><td>调整内存分配 最小16MB，默认128MB</td></tr><tr><td>--rpcaddr</td><td>可以调用 RPC 服务的IP地址，我这里只允许本地调用，不开放给其他用户，如果你想做成 Infura 那样作为公开的 API 的话，可以设置成 0.0.0.0</td></tr><tr><td>--ws</td><td>开启 WS-RPC 服务</td></tr><tr><td>--wsaddr</td><td>指定WS-RPC 服务监听地址，默认为 “localhost”</td></tr><tr><td>--wsport</td><td>指定 WS-RPC 服务监听端口，默认值：8546</td></tr><tr><td>--wsapi</td><td>指定WS-RPC 开启API，默认为 “eth,net,web3”</td></tr><tr><td>--wsorigins</td><td>指定允许“websockets”请求的地址</td></tr><tr><td>--maxpeers</td><td>设置允许最大连接节点数目，默认为25</td></tr></tbody></table><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>nohup {cmd} &amp; &gt; nohup.out</p></div><p>注意：在已经进行过正常区块同步的链上，不要使用该命令，也就是说，使用该选项必须从区块同步最初开始，当同步到最新区块后，可以正常同步区块，下次启动时就可以不用输入次选项，区块高度也会达到快速同步高度</p><ul><li>目录介绍</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@eth eth]# ls /data/coin/eth/</span></span>
<span class="line"><span style="color:#e1e4e8;">geth  geth.ipc  keystore</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    geth, 用于存储公链的数据</span></span>
<span class="line"><span style="color:#e1e4e8;">    keystore, 用于存储秘钥</span></span>
<span class="line"><span style="color:#e1e4e8;">    geth.ipc=, 启动时产生一个文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@eth eth]# ls /data/coin/eth/</span></span>
<span class="line"><span style="color:#24292e;">geth  geth.ipc  keystore</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    geth, 用于存储公链的数据</span></span>
<span class="line"><span style="color:#24292e;">    keystore, 用于存储秘钥</span></span>
<span class="line"><span style="color:#24292e;">    geth.ipc=, 启动时产生一个文件</span></span></code></pre></div><h3 id="supervisor方式" tabindex="-1">supervisor方式 <a class="header-anchor" href="#supervisor方式" aria-label="Permalink to &quot;supervisor方式&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># cat prysm.ini </span></span>
<span class="line"><span style="color:#E1E4E8;">[program:prysm1]</span></span>
<span class="line"><span style="color:#E1E4E8;">directory</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/apps/prysm</span></span>
<span class="line"><span style="color:#E1E4E8;">command</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/bin/bash</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./prysm.sh beacon-chain --execution-endpoint=http://127.0.0.1:8551  --jwt-secret=/data/apps/prysm/jwt.hex&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">autostart</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">autorestart</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">startretries</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">stderr_logfile</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/log/prysm_error.log</span></span>
<span class="line"><span style="color:#E1E4E8;">stdout_logfile</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/data/log/prysm_out.log</span></span>
<span class="line"><span style="color:#E1E4E8;">stdout_logfile_maxbytes</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">50</span><span style="color:#9ECBFF;">MB</span></span>
<span class="line"><span style="color:#B392F0;">stdout_logfile_backups</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># cat prysm.ini </span></span>
<span class="line"><span style="color:#24292E;">[program:prysm1]</span></span>
<span class="line"><span style="color:#24292E;">directory</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/apps/prysm</span></span>
<span class="line"><span style="color:#24292E;">command</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/bin/bash</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./prysm.sh beacon-chain --execution-endpoint=http://127.0.0.1:8551  --jwt-secret=/data/apps/prysm/jwt.hex&quot;</span></span>
<span class="line"><span style="color:#24292E;">autostart</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">autorestart</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">startretries</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">stderr_logfile</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/log/prysm_error.log</span></span>
<span class="line"><span style="color:#24292E;">stdout_logfile</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/data/log/prysm_out.log</span></span>
<span class="line"><span style="color:#24292E;">stdout_logfile_maxbytes</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">50</span><span style="color:#032F62;">MB</span></span>
<span class="line"><span style="color:#6F42C1;">stdout_logfile_backups</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span></span></code></pre></div><h3 id="systemd方式" tabindex="-1">systemd方式 <a class="header-anchor" href="#systemd方式" aria-label="Permalink to &quot;systemd方式&quot;">​</a></h3><p>vim /lib/systemd/system/geth.service</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[Unit]</span></span>
<span class="line"><span style="color:#E1E4E8;">  Description</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">goerli</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">chain</span></span>
<span class="line"><span style="color:#E1E4E8;">  StartLimitIntervalSec</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">500</span></span>
<span class="line"><span style="color:#E1E4E8;">  StartLimitBurst</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Service]</span></span>
<span class="line"><span style="color:#E1E4E8;">  Restart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">on-failure</span></span>
<span class="line"><span style="color:#E1E4E8;">  RestartSec</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span><span style="color:#9ECBFF;">s</span></span>
<span class="line"><span style="color:#E1E4E8;">  ExecStart</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/usr/local/geth/geth</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">--mainnet</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--http</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.addr</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;0.0.0.0&quot;</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--http.api</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eth,net,engine,admin</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--syncmode</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">snap</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--gcmode</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">archive</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--authrpc.addr</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--authrpc.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8551</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--authrpc.vhosts</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">localhost</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--authrpc.jwtsecret</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/prysm/jwt.hex</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--datadir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/eth</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--allow-insecure-unlock</span></span>
<span class="line"><span style="color:#E1E4E8;">  Type</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">simple</span></span>
<span class="line"><span style="color:#E1E4E8;">  User</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">  KillSignal</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">SIGINT</span></span>
<span class="line"><span style="color:#E1E4E8;">  TimeoutStopSec</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">12000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[Install]</span></span>
<span class="line"><span style="color:#E1E4E8;">  WantedBy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">multi-user.target</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[Unit]</span></span>
<span class="line"><span style="color:#24292E;">  Description</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">goerli</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">chain</span></span>
<span class="line"><span style="color:#24292E;">  StartLimitIntervalSec</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">500</span></span>
<span class="line"><span style="color:#24292E;">  StartLimitBurst</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Service]</span></span>
<span class="line"><span style="color:#24292E;">  Restart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">on-failure</span></span>
<span class="line"><span style="color:#24292E;">  RestartSec</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span><span style="color:#032F62;">s</span></span>
<span class="line"><span style="color:#24292E;">  ExecStart</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/usr/local/geth/geth</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">--mainnet</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--http</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.addr</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;0.0.0.0&quot;</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--http.api</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eth,net,engine,admin</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--syncmode</span><span style="color:#24292E;"> </span><span style="color:#032F62;">snap</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--gcmode</span><span style="color:#24292E;"> </span><span style="color:#032F62;">archive</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">--authrpc.addr</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--authrpc.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8551</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--authrpc.vhosts</span><span style="color:#24292E;"> </span><span style="color:#032F62;">localhost</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--authrpc.jwtsecret</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/prysm/jwt.hex</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--datadir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/eth</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--allow-insecure-unlock</span></span>
<span class="line"><span style="color:#24292E;">  Type</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">simple</span></span>
<span class="line"><span style="color:#24292E;">  User</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">  KillSignal</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">SIGINT</span></span>
<span class="line"><span style="color:#24292E;">  TimeoutStopSec</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">12000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[Install]</span></span>
<span class="line"><span style="color:#24292E;">  WantedBy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">multi-user.target</span></span></code></pre></div><h2 id="_2-4关闭" tabindex="-1">2.4关闭 <a class="header-anchor" href="#_2-4关闭" aria-label="Permalink to &quot;2.4关闭&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#e1e4e8;">pid=\`ps -ef|grep geth|grep -v grep|awk &#39;{print $2}&#39;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">echo $pid</span></span>
<span class="line"><span style="color:#e1e4e8;">kill -INT $pid</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292e;">pid=\`ps -ef|grep geth|grep -v grep|awk &#39;{print $2}&#39;\`</span></span>
<span class="line"><span style="color:#24292e;">echo $pid</span></span>
<span class="line"><span style="color:#24292e;">kill -INT $pid</span></span></code></pre></div><blockquote><p>kill -INT $pid将“中断”信号发送到具有进程ID的进程pid。然而，该过程可以决定忽略该信号，或者在退出和/或忽略它之前捕获信号并做某事</p></blockquote><blockquote><p>kill -9 $pid发送无法捕获或忽略的“kill”信号。该过程将被强制关闭，不会通知该过程，也没有机会进行任何清理</p></blockquote><h1 id="_3-容器方式" tabindex="-1">3. 容器方式 <a class="header-anchor" href="#_3-容器方式" aria-label="Permalink to &quot;3. 容器方式&quot;">​</a></h1><p>获取镜像：<a href="https://hub.docker.com/r/ethereum/client-go/tags" target="_blank" rel="noreferrer">https://hub.docker.com/r/ethereum/client-go/tags</a></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">snapeth-geth</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--network</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">host</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/coin/snapETH:/gethdata</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/prysm/jwt.hex:/jwt.hex</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">ethereum/client-go:stable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--authrpc.jwtsecret</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/jwt.hex</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--syncmode</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">snap</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--allow-insecure-unlock</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--authrpc.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8551</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">30303</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--http</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--http.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8545</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--http.api</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">web3,db,eth,net,personal</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--http.addr=0.0.0.0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--datadir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/gethdata</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--maxpeers</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--cache</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--rpc.allow-unprotected-txs</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">snapeth-geth</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--network</span><span style="color:#24292E;"> </span><span style="color:#032F62;">host</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/coin/snapETH:/gethdata</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/prysm/jwt.hex:/jwt.hex</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">ethereum/client-go:stable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--authrpc.jwtsecret</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/jwt.hex</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--syncmode</span><span style="color:#24292E;"> </span><span style="color:#032F62;">snap</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--allow-insecure-unlock</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--authrpc.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8551</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">30303</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--http</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--http.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8545</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--http.api</span><span style="color:#24292E;"> </span><span style="color:#032F62;">web3,db,eth,net,personal</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--http.addr=0.0.0.0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--datadir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/gethdata</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--maxpeers</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">101</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--cache</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--rpc.allow-unprotected-txs</span></span></code></pre></div><p>参数解释</p><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td><code>--authrpc.jwtsecret</code></td><td>用于验证共识客户端的 JWT 文件（如 Prysm）</td></tr><tr><td><code>--syncmode snap</code></td><td>使用 Snap 同步，适合快速同步主网</td></tr><tr><td><code>--allow-insecure-unlock</code></td><td>允许 HTTP API 解锁账户（开发或私链使用）</td></tr><tr><td><code>--authrpc.port 8551</code></td><td>Engine API（用于与共识客户端通信）端口</td></tr><tr><td><code>--port 30303</code></td><td>P2P 网络端口（TCP 和 UDP）</td></tr><tr><td><code>--http</code>、<code>--http.port 8545</code></td><td>启用 RPC 服务</td></tr><tr><td><code>--http.api</code></td><td>暴露的模块</td></tr><tr><td><code>--http.addr</code></td><td>绑定地址（容器中写为 <code>0.0.0.0</code>）</td></tr><tr><td><code>--datadir</code></td><td>Geth 数据存储位置</td></tr><tr><td><code>--cache 1024</code></td><td>内存缓存</td></tr><tr><td><code>--rpc.allow-unprotected-txs</code></td><td>允许未签名的交易（开发测试使用）</td></tr></tbody></table><h1 id="_6-进入节点-javascript-终端" tabindex="-1">6.进入节点 javascript 终端 <a class="header-anchor" href="#_6-进入节点-javascript-终端" aria-label="Permalink to &quot;6.进入节点 javascript 终端&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@eth eth]# ./geth attach /data/coin/eth/geth.ipc </span></span>
<span class="line"><span style="color:#e1e4e8;">Welcome to the Geth JavaScript console!</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">instance: Geth/v1.9.6-stable-bd059680/linux-amd64/go1.13.1</span></span>
<span class="line"><span style="color:#e1e4e8;">at block: 0 (Thu, 01 Jan 1970 08:00:00 CST)</span></span>
<span class="line"><span style="color:#e1e4e8;"> datadir: /data/coin/eth</span></span>
<span class="line"><span style="color:#e1e4e8;"> modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">命令行支持的API，这个可以在启动参数上设置</span></span>
<span class="line"><span style="color:#e1e4e8;">admin:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">debug:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">eth:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">ethash:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">miner:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">net:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">personal:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">rpc:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">txpool:1.0 </span></span>
<span class="line"><span style="color:#e1e4e8;">web3:1.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">以下方式进入，参数比较少</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@eth eth]# ./geth attach rpc:http://172.31.171.255:8545</span></span>
<span class="line"><span style="color:#e1e4e8;">Welcome to the Geth JavaScript console!</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">instance: Geth/v1.9.6-stable-bd059680/linux-amd64/go1.13.1</span></span>
<span class="line"><span style="color:#e1e4e8;">at block: 0 (Thu, 01 Jan 1970 08:00:00 CST)</span></span>
<span class="line"><span style="color:#e1e4e8;"> datadir: /data/coin/eth</span></span>
<span class="line"><span style="color:#e1e4e8;"> modules: admin:1.0 eth:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@eth eth]# ./geth attach /data/coin/eth/geth.ipc </span></span>
<span class="line"><span style="color:#24292e;">Welcome to the Geth JavaScript console!</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">instance: Geth/v1.9.6-stable-bd059680/linux-amd64/go1.13.1</span></span>
<span class="line"><span style="color:#24292e;">at block: 0 (Thu, 01 Jan 1970 08:00:00 CST)</span></span>
<span class="line"><span style="color:#24292e;"> datadir: /data/coin/eth</span></span>
<span class="line"><span style="color:#24292e;"> modules: admin:1.0 debug:1.0 eth:1.0 ethash:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">命令行支持的API，这个可以在启动参数上设置</span></span>
<span class="line"><span style="color:#24292e;">admin:1.0 </span></span>
<span class="line"><span style="color:#24292e;">debug:1.0 </span></span>
<span class="line"><span style="color:#24292e;">eth:1.0 </span></span>
<span class="line"><span style="color:#24292e;">ethash:1.0 </span></span>
<span class="line"><span style="color:#24292e;">miner:1.0 </span></span>
<span class="line"><span style="color:#24292e;">net:1.0 </span></span>
<span class="line"><span style="color:#24292e;">personal:1.0 </span></span>
<span class="line"><span style="color:#24292e;">rpc:1.0 </span></span>
<span class="line"><span style="color:#24292e;">txpool:1.0 </span></span>
<span class="line"><span style="color:#24292e;">web3:1.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">以下方式进入，参数比较少</span></span>
<span class="line"><span style="color:#24292e;">[root@eth eth]# ./geth attach rpc:http://172.31.171.255:8545</span></span>
<span class="line"><span style="color:#24292e;">Welcome to the Geth JavaScript console!</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">instance: Geth/v1.9.6-stable-bd059680/linux-amd64/go1.13.1</span></span>
<span class="line"><span style="color:#24292e;">at block: 0 (Thu, 01 Jan 1970 08:00:00 CST)</span></span>
<span class="line"><span style="color:#24292e;"> datadir: /data/coin/eth</span></span>
<span class="line"><span style="color:#24292e;"> modules: admin:1.0 eth:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0</span></span></code></pre></div><h3 id="_6-1查看当前同步状态" tabindex="-1">6.1查看当前同步状态 <a class="header-anchor" href="#_6-1查看当前同步状态" aria-label="Permalink to &quot;6.1查看当前同步状态&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; eth.syncing</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  currentBlock: 6143193,</span></span>
<span class="line"><span style="color:#e1e4e8;">  highestBlock: 6143296,</span></span>
<span class="line"><span style="color:#e1e4e8;">  knownStates: 91512910,</span></span>
<span class="line"><span style="color:#e1e4e8;">  pulledStates: 91498893,</span></span>
<span class="line"><span style="color:#e1e4e8;">  startingBlock: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">解释：</span></span>
<span class="line"><span style="color:#e1e4e8;">- startingBlock：开始同步的起始区块编号； </span></span>
<span class="line"><span style="color:#e1e4e8;">- currentBlock：当前正在导入的区块编号； </span></span>
<span class="line"><span style="color:#e1e4e8;">- highestBlock：通过所链接的节点获得的当前最高的区块高度； </span></span>
<span class="line"><span style="color:#e1e4e8;">- pulledStates：当前已经拉取的状态条目数； </span></span>
<span class="line"><span style="color:#e1e4e8;">- knownStates：当前已知的待拉取的总状态条目数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#或者查看高度</span></span>
<span class="line"><span style="color:#e1e4e8;">echo $((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data  &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.31.34.215:8545 |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))查看高度</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; eth.syncing</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  currentBlock: 6143193,</span></span>
<span class="line"><span style="color:#24292e;">  highestBlock: 6143296,</span></span>
<span class="line"><span style="color:#24292e;">  knownStates: 91512910,</span></span>
<span class="line"><span style="color:#24292e;">  pulledStates: 91498893,</span></span>
<span class="line"><span style="color:#24292e;">  startingBlock: 0</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">解释：</span></span>
<span class="line"><span style="color:#24292e;">- startingBlock：开始同步的起始区块编号； </span></span>
<span class="line"><span style="color:#24292e;">- currentBlock：当前正在导入的区块编号； </span></span>
<span class="line"><span style="color:#24292e;">- highestBlock：通过所链接的节点获得的当前最高的区块高度； </span></span>
<span class="line"><span style="color:#24292e;">- pulledStates：当前已经拉取的状态条目数； </span></span>
<span class="line"><span style="color:#24292e;">- knownStates：当前已知的待拉取的总状态条目数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#或者查看高度</span></span>
<span class="line"><span style="color:#24292e;">echo $((\`curl -s -X POST -H &quot;Content-Type&quot;:application/json --data  &#39;{&quot;jsonrpc&quot;:&quot;2.0&quot;, &quot;method&quot;:&quot;eth_blockNumber&quot;,&quot;params&quot;:[],&quot;id&quot;:67}&#39; 172.31.34.215:8545 |awk -F&#39;&quot;&#39; &#39;{print $(NF-1)}&#39;\`))查看高度</span></span></code></pre></div><p>这里有个坑就是，你会发现你每次执行 eth.syncing 命令的时候 currentBlock 和 highestBlock 都只相差几百，以为马上就要同步完了，只有几百个区块了。 其实你还只是同步了一小部分。这个是正常现象，因为我们使用了 --fast 选项，所以开始只同步了区块头，它还要慢慢的去同步区块 Body.</p><p>另外在同步的过程中我们通过 eth.blockNumber 去查看当前区块号的话会显示为 0</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; eth.blockNumber</span></span>
<span class="line"><span style="color:#e1e4e8;">0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">eth.blockNumber获得的返回结果为0</span></span>
<span class="line"><span style="color:#e1e4e8;">原因：</span></span>
<span class="line"><span style="color:#e1e4e8;">在Geth1.6和1.7客户端中默认使用快速（fast）同步，因此在同步的过程中节点只下载最近的状态，中间区块的状态是不可用的。因此，直到同步完成，最新的完整块都为0，因为所有比较新的块在同步期间是不完整的。当快速同步完成时，它会下载头部的关联状态，此时头部块完整，最新的块可以关联到当前的头部。简单来说就是在快速同步的过程中，需要构建一个头部信息，如果此信息为构建完成，通过上面的接口查询到的结果就是0。当同步完成，后续就不会再出现此问题</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; eth.blockNumber</span></span>
<span class="line"><span style="color:#24292e;">0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">eth.blockNumber获得的返回结果为0</span></span>
<span class="line"><span style="color:#24292e;">原因：</span></span>
<span class="line"><span style="color:#24292e;">在Geth1.6和1.7客户端中默认使用快速（fast）同步，因此在同步的过程中节点只下载最近的状态，中间区块的状态是不可用的。因此，直到同步完成，最新的完整块都为0，因为所有比较新的块在同步期间是不完整的。当快速同步完成时，它会下载头部的关联状态，此时头部块完整，最新的块可以关联到当前的头部。简单来说就是在快速同步的过程中，需要构建一个头部信息，如果此信息为构建完成，通过上面的接口查询到的结果就是0。当同步完成，后续就不会再出现此问题</span></span></code></pre></div><h3 id="_6-2节点连接个数" tabindex="-1">6.2节点连接个数 <a class="header-anchor" href="#_6-2节点连接个数" aria-label="Permalink to &quot;6.2节点连接个数&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; net.peerCount</span></span>
<span class="line"><span style="color:#e1e4e8;">32</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; net.peerCount</span></span>
<span class="line"><span style="color:#24292e;">32</span></span></code></pre></div><h3 id="_6-4-pull-完成" tabindex="-1">6.4 pull 完成 <a class="header-anchor" href="#_6-4-pull-完成" aria-label="Permalink to &quot;6.4 pull 完成&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#说明没有在同步数据</span></span>
<span class="line"><span style="color:#e1e4e8;">eth.blockNumber = 0 eth.syncing = false, </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#证明正在同步中</span></span>
<span class="line"><span style="color:#e1e4e8;">eth.blockNumber = 0 eth.syncing = {currentBlock: 490891,highestBlock: 9702028,knownStates: 975641,pulledStates: 953009,startingBlock: 0}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#出现如下结果，块才能使用</span></span>
<span class="line"><span style="color:#e1e4e8;">如果你通过 eth.syncing 返回的是 false 的，或者 eth.blockNumber 返回的是大于 0 的整数的话，如下</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; eth.blockNumber</span></span>
<span class="line"><span style="color:#e1e4e8;">6712841</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; eth.syncing</span></span>
<span class="line"><span style="color:#e1e4e8;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#说明没有在同步数据</span></span>
<span class="line"><span style="color:#24292e;">eth.blockNumber = 0 eth.syncing = false, </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#证明正在同步中</span></span>
<span class="line"><span style="color:#24292e;">eth.blockNumber = 0 eth.syncing = {currentBlock: 490891,highestBlock: 9702028,knownStates: 975641,pulledStates: 953009,startingBlock: 0}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#出现如下结果，块才能使用</span></span>
<span class="line"><span style="color:#24292e;">如果你通过 eth.syncing 返回的是 false 的，或者 eth.blockNumber 返回的是大于 0 的整数的话，如下</span></span>
<span class="line"><span style="color:#24292e;">&gt; eth.blockNumber</span></span>
<span class="line"><span style="color:#24292e;">6712841</span></span>
<span class="line"><span style="color:#24292e;">&gt; eth.syncing</span></span>
<span class="line"><span style="color:#24292e;">false</span></span></code></pre></div><p>那么 Congratulations, 同步已经完成，你就可以开始调用钱包 API 转账了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Imported new block headers 导入区块的头部</span></span>
<span class="line"><span style="color:#e1e4e8;">Imported new block receipts 导入区块的凭据</span></span>
<span class="line"><span style="color:#e1e4e8;">Imported new state entries 导入区块的结构</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Imported new block headers 导入区块的头部</span></span>
<span class="line"><span style="color:#24292e;">Imported new block receipts 导入区块的凭据</span></span>
<span class="line"><span style="color:#24292e;">Imported new state entries 导入区块的结构</span></span></code></pre></div><h1 id="_7-控制端" tabindex="-1">7.控制端 <a class="header-anchor" href="#_7-控制端" aria-label="Permalink to &quot;7.控制端&quot;">​</a></h1><blockquote><p>geth attach ipc://mnt/.ethereum/geth.ipc (根据个人路径定制)</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">自己的全部信息</span></span>
<span class="line"><span style="color:#e1e4e8;">$ admin.nodeInfo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 获取当前节点的 ID 和端口</span></span>
<span class="line"><span style="color:#e1e4e8;">$ admin.nodeInfo.id</span></span>
<span class="line"><span style="color:#e1e4e8;">$ admin.nodeInfo.ports.listener</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#添加节点 </span></span>
<span class="line"><span style="color:#e1e4e8;">$ admin.addPeer(&quot;enode://xxx@47.52.16.149:30303&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">true #返回true</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看连接的节点</span></span>
<span class="line"><span style="color:#e1e4e8;">$ admin.peers</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#连接数量</span></span>
<span class="line"><span style="color:#e1e4e8;">$ net.peerCount</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#是否是监听节点</span></span>
<span class="line"><span style="color:#e1e4e8;">$ net.listening</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 退出命令行界面</span></span>
<span class="line"><span style="color:#e1e4e8;">$ exit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">自己的全部信息</span></span>
<span class="line"><span style="color:#24292e;">$ admin.nodeInfo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 获取当前节点的 ID 和端口</span></span>
<span class="line"><span style="color:#24292e;">$ admin.nodeInfo.id</span></span>
<span class="line"><span style="color:#24292e;">$ admin.nodeInfo.ports.listener</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#添加节点 </span></span>
<span class="line"><span style="color:#24292e;">$ admin.addPeer(&quot;enode://xxx@47.52.16.149:30303&quot;)</span></span>
<span class="line"><span style="color:#24292e;">true #返回true</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看连接的节点</span></span>
<span class="line"><span style="color:#24292e;">$ admin.peers</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#连接数量</span></span>
<span class="line"><span style="color:#24292e;">$ net.peerCount</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#是否是监听节点</span></span>
<span class="line"><span style="color:#24292e;">$ net.listening</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 退出命令行界面</span></span>
<span class="line"><span style="color:#24292e;">$ exit</span></span></code></pre></div><h1 id="_8-账户" tabindex="-1">8.账户 <a class="header-anchor" href="#_8-账户" aria-label="Permalink to &quot;8.账户&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看我的账户 </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; eth.accounts</span></span>
<span class="line"><span style="color:#e1e4e8;">[]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 新建一个账户</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; personal.newAccount(&quot;test.dan&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;0x377410e6b50762a51d54d9f26830e60124072f35&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 再查看我的账户</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; eth.accounts</span></span>
<span class="line"><span style="color:#e1e4e8;">[&quot;0x377410e6b50762a51d54d9f26830e60124072f35&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看账号余额</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; eth.getBalance(eth.accounts[0])</span></span>
<span class="line"><span style="color:#e1e4e8;">0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看我的账户 </span></span>
<span class="line"><span style="color:#24292e;">&gt; eth.accounts</span></span>
<span class="line"><span style="color:#24292e;">[]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 新建一个账户</span></span>
<span class="line"><span style="color:#24292e;">&gt; personal.newAccount(&quot;test.dan&quot;)</span></span>
<span class="line"><span style="color:#24292e;">&quot;0x377410e6b50762a51d54d9f26830e60124072f35&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 再查看我的账户</span></span>
<span class="line"><span style="color:#24292e;">&gt; eth.accounts</span></span>
<span class="line"><span style="color:#24292e;">[&quot;0x377410e6b50762a51d54d9f26830e60124072f35&quot;]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看账号余额</span></span>
<span class="line"><span style="color:#24292e;">&gt; eth.getBalance(eth.accounts[0])</span></span>
<span class="line"><span style="color:#24292e;">0</span></span></code></pre></div><h1 id="_9-高版本语法-1-10-20" tabindex="-1">9.高版本语法，1.10.20 <a class="header-anchor" href="#_9-高版本语法-1-10-20" aria-label="Permalink to &quot;9.高版本语法，1.10.20&quot;">​</a></h1><p>官方文档，<a href="https://geth.ethereum.org/docs/getting-started" target="_blank" rel="noreferrer">https://geth.ethereum.org/docs/getting-started</a></p><p>默认同步模式是snap</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ geth --help</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME:</span></span>
<span class="line"><span style="color:#e1e4e8;">   geth - the go-ethereum command line interface</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">   Copyright 2013-2022 The go-ethereum Authors</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">USAGE:</span></span>
<span class="line"><span style="color:#e1e4e8;">   geth [options] [command] [command options] [arguments...]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">VERSION:</span></span>
<span class="line"><span style="color:#e1e4e8;">   1.10.19-stable-23bee162</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">COMMANDS:</span></span>
<span class="line"><span style="color:#e1e4e8;">   account                            Manage accounts</span></span>
<span class="line"><span style="color:#e1e4e8;">   attach                             Start an interactive JavaScript environment (connect to node)</span></span>
<span class="line"><span style="color:#e1e4e8;">   console                            Start an interactive JavaScript environment</span></span>
<span class="line"><span style="color:#e1e4e8;">   db                                 Low level database operations</span></span>
<span class="line"><span style="color:#e1e4e8;">   dump                               Dump a specific block from storage</span></span>
<span class="line"><span style="color:#e1e4e8;">   dumpconfig                         Show configuration values</span></span>
<span class="line"><span style="color:#e1e4e8;">   dumpgenesis                        Dumps genesis block JSON configuration to stdout</span></span>
<span class="line"><span style="color:#e1e4e8;">   export                             Export blockchain into file</span></span>
<span class="line"><span style="color:#e1e4e8;">   export-preimages                   Export the preimage database into an RLP stream</span></span>
<span class="line"><span style="color:#e1e4e8;">   import                             Import a blockchain file</span></span>
<span class="line"><span style="color:#e1e4e8;">   import-preimages                   Import the preimage database from an RLP stream</span></span>
<span class="line"><span style="color:#e1e4e8;">   init                               Bootstrap and initialize a new genesis block</span></span>
<span class="line"><span style="color:#e1e4e8;">   js                                 Execute the specified JavaScript files</span></span>
<span class="line"><span style="color:#e1e4e8;">   license                            Display license information</span></span>
<span class="line"><span style="color:#e1e4e8;">   makecache                          Generate ethash verification cache (for testing)</span></span>
<span class="line"><span style="color:#e1e4e8;">   makedag                            Generate ethash mining DAG (for testing)</span></span>
<span class="line"><span style="color:#e1e4e8;">   removedb                           Remove blockchain and state databases</span></span>
<span class="line"><span style="color:#e1e4e8;">   show-deprecated-flags              Show flags that have been deprecated</span></span>
<span class="line"><span style="color:#e1e4e8;">   snapshot                           A set of commands based on the snapshot</span></span>
<span class="line"><span style="color:#e1e4e8;">   version                            Print version numbers</span></span>
<span class="line"><span style="color:#e1e4e8;">   version-check                      Checks (online) whether the current version suffers from any known security vulnerabilities</span></span>
<span class="line"><span style="color:#e1e4e8;">   wallet                             Manage Ethereum presale wallets</span></span>
<span class="line"><span style="color:#e1e4e8;">   help, h                            Shows a list of commands or help for one command</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ETHEREUM OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --config value                      TOML configuration file</span></span>
<span class="line"><span style="color:#e1e4e8;">  --datadir.minfreedisk value         Minimum free disk space in MB, once reached triggers auto shut down (default = --cache.gc converted to MB, 0 = disabled)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --keystore value                    Directory for the keystore (default = inside the datadir)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --usb                               Enable monitoring and management of USB hardware wallets</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pcscdpath value                   Path to the smartcard daemon (pcscd) socket file</span></span>
<span class="line"><span style="color:#e1e4e8;">  --networkid value                   Explicitly set network id (integer)(For testnets: use --ropsten, --rinkeby, --goerli instead) (default: 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --syncmode value                    Blockchain sync mode (&quot;snap&quot;, &quot;full&quot; or &quot;light&quot;) (default: snap)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --exitwhensynced                    Exits after block synchronisation completes</span></span>
<span class="line"><span style="color:#e1e4e8;">  --gcmode value                      Blockchain garbage collection mode (&quot;full&quot;, &quot;archive&quot;) (default: &quot;full&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txlookuplimit value               Number of recent blocks to maintain transactions index for (default = about one year, 0 = entire chain) (default: 2350000)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethstats value                    Reporting URL of a ethstats service (nodename:secret@host:port)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --identity value                    Custom node name</span></span>
<span class="line"><span style="color:#e1e4e8;">  --lightkdf                          Reduce key-derivation RAM &amp; CPU usage at some expense of KDF strength</span></span>
<span class="line"><span style="color:#e1e4e8;">  --eth.requiredblocks value          Comma separated block number-to-hash mappings to require for peering (&lt;number&gt;=&lt;hash&gt;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --mainnet                           Ethereum mainnet</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ropsten                           Ropsten network: pre-configured proof-of-stake test network</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rinkeby                           Rinkeby network: pre-configured proof-of-authority test network</span></span>
<span class="line"><span style="color:#e1e4e8;">  --goerli                            Görli network: pre-configured proof-of-authority test network</span></span>
<span class="line"><span style="color:#e1e4e8;">  --sepolia                           Sepolia network: pre-configured proof-of-work test network</span></span>
<span class="line"><span style="color:#e1e4e8;">  --kiln                              Kiln network: pre-configured proof-of-work to proof-of-stake test network</span></span>
<span class="line"><span style="color:#e1e4e8;">  --datadir value                     Data directory for the databases and keystore (default: &quot;~/.ethereum&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --datadir.ancient value             Data directory for ancient chain segments (default = inside chaindata)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --remotedb value                    URL for remote database</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">LIGHT CLIENT OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --light.serve value                 Maximum percentage of time allowed for serving LES requests (multi-threaded processing allows values over 100) (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --light.ingress value               Incoming bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --light.egress value                Outgoing bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --light.maxpeers value              Maximum number of light clients to serve, or light servers to attach to (default: 100)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ulc.servers value                 List of trusted ultra-light servers</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ulc.fraction value                Minimum % of trusted ultra-light servers required to announce a new head (default: 75)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ulc.onlyannounce                  Ultra light server sends announcements only</span></span>
<span class="line"><span style="color:#e1e4e8;">  --light.nopruning                   Disable ancient light chain data pruning</span></span>
<span class="line"><span style="color:#e1e4e8;">  --light.nosyncserve                 Enables serving light clients before syncing</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">DEVELOPER CHAIN OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --dev                               Ephemeral proof-of-authority network with a pre-funded developer account, mining enabled</span></span>
<span class="line"><span style="color:#e1e4e8;">  --dev.period value                  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --dev.gaslimit value                Initial block gas limit (default: 11500000)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ETHASH OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.cachedir value             Directory to store the ethash verification caches (default = inside the datadir)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.cachesinmem value          Number of recent ethash caches to keep in memory (16MB each) (default: 2)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.cachesondisk value         Number of recent ethash caches to keep on disk (16MB each) (default: 3)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.cacheslockmmap             Lock memory maps of recent ethash caches</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.dagdir value               Directory to store the ethash mining DAGs (default: &quot;~/.ethash&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.dagsinmem value            Number of recent ethash mining DAGs to keep in memory (1+GB each) (default: 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.dagsondisk value           Number of recent ethash mining DAGs to keep on disk (1+GB each) (default: 2)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ethash.dagslockmmap               Lock memory maps for recent ethash mining DAGs</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">TRANSACTION POOL OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.locals value               Comma separated accounts to treat as locals (no flush, priority inclusion)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.nolocals                   Disables price exemptions for locally submitted transactions</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.journal value              Disk journal for local transaction to survive node restarts (default: &quot;transactions.rlp&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.rejournal value            Time interval to regenerate the local transaction journal (default: 1h0m0s)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.pricelimit value           Minimum gas price limit to enforce for acceptance into the pool (default: 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.pricebump value            Price bump percentage to replace an already existing transaction (default: 10)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.accountslots value         Minimum number of executable transaction slots guaranteed per account (default: 16)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.globalslots value          Maximum number of executable transaction slots for all accounts (default: 5120)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.accountqueue value         Maximum number of non-executable transaction slots permitted per account (default: 64)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.globalqueue value          Maximum number of non-executable transaction slots for all accounts (default: 1024)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --txpool.lifetime value             Maximum amount of time non-executable transaction are queued (default: 3h0m0s)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PERFORMANCE TUNING OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache value                       Megabytes of memory allocated to internal caching (default = 4096 mainnet full node, 128 light mode) (default: 1024)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.database value              Percentage of cache memory allowance to use for database io (default: 50)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.trie value                  Percentage of cache memory allowance to use for trie caching (default = 15% full mode, 30% archive mode) (default: 15)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.trie.journal value          Disk journal directory for trie cache to survive node restarts (default: &quot;triecache&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.trie.rejournal value        Time interval to regenerate the trie cache journal (default: 1h0m0s)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.gc value                    Percentage of cache memory allowance to use for trie pruning (default = 25% full mode, 0% archive mode) (default: 25)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.snapshot value              Percentage of cache memory allowance to use for snapshot caching (default = 10% full mode, 20% archive mode) (default: 10)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.noprefetch                  Disable heuristic state prefetch during block import (less CPU and disk IO, more time waiting for data)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.preimages                   Enable recording the SHA3/keccak preimages of trie keys</span></span>
<span class="line"><span style="color:#e1e4e8;">  --fdlimit value                     Raise the open file descriptor resource limit (default = system fd limit) (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ACCOUNT OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --unlock value                      Comma separated list of accounts to unlock</span></span>
<span class="line"><span style="color:#e1e4e8;">  --password value                    Password file to use for non-interactive password input</span></span>
<span class="line"><span style="color:#e1e4e8;">  --signer value                      External signer (url or path to ipc file)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --allow-insecure-unlock             Allow insecure account unlocking when account-related RPCs are exposed by http</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">API AND CONSOLE OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ipcdisable                        Disable the IPC-RPC server</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ipcpath value                     Filename for IPC socket/pipe within the datadir (explicit paths escape it)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http                              Enable the HTTP-RPC server</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.addr value                   HTTP-RPC server listening interface (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.port value                   HTTP-RPC server listening port (default: 8545)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.api value                    API&#39;s offered over the HTTP-RPC interface</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.rpcprefix value              HTTP path path prefix on which JSON-RPC is served. Use &#39;/&#39; to serve on all paths.</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.corsdomain value             Comma separated list of domains from which to accept cross origin requests (browser enforced)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.vhosts value                 Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts &#39;*&#39; wildcard. (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws                                Enable the WS-RPC server</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.addr value                     WS-RPC server listening interface (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.port value                     WS-RPC server listening port (default: 8546)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.api value                      API&#39;s offered over the WS-RPC interface</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.rpcprefix value                HTTP path prefix on which JSON-RPC is served. Use &#39;/&#39; to serve on all paths.</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.origins value                  Origins from which to accept websockets requests</span></span>
<span class="line"><span style="color:#e1e4e8;">  --authrpc.jwtsecret value           Path to a JWT secret to use for authenticated RPC endpoints</span></span>
<span class="line"><span style="color:#e1e4e8;">  --authrpc.addr value                Listening address for authenticated APIs (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --authrpc.port value                Listening port for authenticated APIs (default: 8551)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --authrpc.vhosts value              Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts &#39;*&#39; wildcard. (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --graphql                           Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.</span></span>
<span class="line"><span style="color:#e1e4e8;">  --graphql.corsdomain value          Comma separated list of domains from which to accept cross origin requests (browser enforced)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --graphql.vhosts value              Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts &#39;*&#39; wildcard. (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpc.gascap value                  Sets a cap on gas that can be used in eth_call/estimateGas (0=infinite) (default: 50000000)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpc.evmtimeout value              Sets a timeout used for eth_call (0=infinite) (default: 5s)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpc.txfeecap value                Sets a cap on transaction fee (in ether) that can be sent via the RPC APIs (0 = no cap) (default: 1)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpc.allow-unprotected-txs         Allow for unprotected (non EIP155 signed) transactions to be submitted via RPC</span></span>
<span class="line"><span style="color:#e1e4e8;">  --jspath loadScript                 JavaScript root path for loadScript (default: &quot;.&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --exec value                        Execute JavaScript statement</span></span>
<span class="line"><span style="color:#e1e4e8;">  --preload value                     Comma separated list of JavaScript files to preload into the console</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">NETWORKING OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --bootnodes value                   Comma separated enode URLs for P2P discovery bootstrap</span></span>
<span class="line"><span style="color:#e1e4e8;">  --discovery.dns value               Sets DNS discovery entry points (use &quot;&quot; to disable DNS)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --port value                        Network listening port (default: 30303)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --maxpeers value                    Maximum number of network peers (network disabled if set to 0) (default: 50)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --maxpendpeers value                Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nat value                         NAT port mapping mechanism (any|none|upnp|pmp|extip:&lt;IP&gt;) (default: &quot;any&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nodiscover                        Disables the peer discovery mechanism (manual peer addition)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --v5disc                            Enables the experimental RLPx V5 (Topic Discovery) mechanism</span></span>
<span class="line"><span style="color:#e1e4e8;">  --netrestrict value                 Restricts network communication to the given IP networks (CIDR masks)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nodekey value                     P2P node key file</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nodekeyhex value                  P2P node key as hex (for testing)</span></span>
<span class="line"><span style="color:#e1e4e8;">  </span></span>
<span class="line"><span style="color:#e1e4e8;">MINER OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --mine                              Enable mining</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.threads value               Number of CPU threads to use for mining (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.notify value                Comma separated HTTP URL list to notify of new work packages</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.notify.full                 Notify with pending block headers instead of work packages</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.gasprice value              Minimum gas price for mining a transaction (default: 1000000000)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.gaslimit value              Target gas ceiling for mined blocks (default: 30000000)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.etherbase value             Public address for block mining rewards (default = first account) (default: &quot;0&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.extradata value             Block extra data set by the miner (default = client version)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.recommit value              Time interval to recreate the block being mined (default: 3s)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --miner.noverify                    Disable remote sealing verification</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">GAS PRICE ORACLE OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --gpo.blocks value                  Number of recent blocks to check for gas prices (default: 20)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --gpo.percentile value              Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --gpo.maxprice value                Maximum transaction priority fee (or gasprice before London fork) to be recommended by gpo (default: 500000000000)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --gpo.ignoreprice value             Gas price below which gpo will ignore transactions (default: 2)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">VIRTUAL MACHINE OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --vmdebug                           Record information useful for VM and contract debugging</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">LOGGING AND DEBUGGING OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --fakepow                           Disables proof-of-work verification</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nocompaction                      Disables db compaction after import</span></span>
<span class="line"><span style="color:#e1e4e8;">  --verbosity value                   Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --vmodule value                     Per-module verbosity: comma-separated list of &lt;pattern&gt;=&lt;level&gt; (e.g. eth/*=5,p2p=4)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --log.json                          Format logs with JSON</span></span>
<span class="line"><span style="color:#e1e4e8;">  --log.backtrace value               Request a stack trace at a specific logging statement (e.g. &quot;block.go:271&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --log.debug                         Prepends log messages with call-site location (file and line number)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof                             Enable the pprof HTTP server</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.addr value                  pprof HTTP server listening interface (default: &quot;127.0.0.1&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.port value                  pprof HTTP server listening port (default: 6060)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.memprofilerate value        Turn on memory profiling with the given rate (default: 524288)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.blockprofilerate value      Turn on block profiling with the given rate (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.cpuprofile value            Write CPU profile to the given file</span></span>
<span class="line"><span style="color:#e1e4e8;">  --trace value                       Write execution trace to the given file</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">METRICS AND STATS OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics                              Enable metrics collection and reporting</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.expensive                    Enable expensive metrics collection and reporting</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.addr value                   Enable stand-alone metrics HTTP server listening interface (default: &quot;127.0.0.1&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.port value                   Metrics HTTP server listening port (default: 6060)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb                     Enable metrics export/push to an external InfluxDB database</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.endpoint value      InfluxDB API endpoint to report metrics to (default: &quot;http://localhost:8086&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.database value      InfluxDB database name to push reported metrics to (default: &quot;geth&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.username value      Username to authorize access to the database (default: &quot;test&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.password value      Password to authorize access to the database (default: &quot;test&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.tags value          Comma-separated InfluxDB tags (key/values) attached to all measurements (default: &quot;host=localhost&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdbv2                   Enable metrics export/push to an external InfluxDB v2 database</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.token value         Token to authorize access to the database (v2 only) (default: &quot;test&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.bucket value        InfluxDB bucket name to push reported metrics to (v2 only) (default: &quot;geth&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --metrics.influxdb.organization value  InfluxDB organization name (v2 only) (default: &quot;geth&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ALIASED (deprecated) OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nousb                             Disables monitoring for and managing USB hardware wallets (deprecated)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --whitelist value                   Comma separated block number-to-hash mappings to enforce (&lt;number&gt;=&lt;hash&gt;) (deprecated in favor of --eth.requiredblocks)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">MISC OPTIONS:</span></span>
<span class="line"><span style="color:#e1e4e8;">  --snapshot                                Enables snapshot-database mode (default = enable)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --bloomfilter.size value                  Megabytes of memory allocated to bloom-filter for pruning (default: 2048)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ignore-legacy-receipts                  Geth will start up even if there are legacy receipts in freezer</span></span>
<span class="line"><span style="color:#e1e4e8;">  --help, -h                                show help</span></span>
<span class="line"><span style="color:#e1e4e8;">  --override.grayglacier value              Manually specify Gray Glacier fork-block, overriding the bundled setting (default: 0)</span></span>
<span class="line"><span style="color:#e1e4e8;">  --override.terminaltotaldifficulty value  Manually specify TerminalTotalDifficulty, overriding the bundled setting (default: &lt;nil&gt;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">COPYRIGHT:</span></span>
<span class="line"><span style="color:#e1e4e8;">   Copyright 2013-2022 The go-ethereum Authors</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">$ geth --help</span></span>
<span class="line"><span style="color:#24292e;">NAME:</span></span>
<span class="line"><span style="color:#24292e;">   geth - the go-ethereum command line interface</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">   Copyright 2013-2022 The go-ethereum Authors</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">USAGE:</span></span>
<span class="line"><span style="color:#24292e;">   geth [options] [command] [command options] [arguments...]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">VERSION:</span></span>
<span class="line"><span style="color:#24292e;">   1.10.19-stable-23bee162</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">COMMANDS:</span></span>
<span class="line"><span style="color:#24292e;">   account                            Manage accounts</span></span>
<span class="line"><span style="color:#24292e;">   attach                             Start an interactive JavaScript environment (connect to node)</span></span>
<span class="line"><span style="color:#24292e;">   console                            Start an interactive JavaScript environment</span></span>
<span class="line"><span style="color:#24292e;">   db                                 Low level database operations</span></span>
<span class="line"><span style="color:#24292e;">   dump                               Dump a specific block from storage</span></span>
<span class="line"><span style="color:#24292e;">   dumpconfig                         Show configuration values</span></span>
<span class="line"><span style="color:#24292e;">   dumpgenesis                        Dumps genesis block JSON configuration to stdout</span></span>
<span class="line"><span style="color:#24292e;">   export                             Export blockchain into file</span></span>
<span class="line"><span style="color:#24292e;">   export-preimages                   Export the preimage database into an RLP stream</span></span>
<span class="line"><span style="color:#24292e;">   import                             Import a blockchain file</span></span>
<span class="line"><span style="color:#24292e;">   import-preimages                   Import the preimage database from an RLP stream</span></span>
<span class="line"><span style="color:#24292e;">   init                               Bootstrap and initialize a new genesis block</span></span>
<span class="line"><span style="color:#24292e;">   js                                 Execute the specified JavaScript files</span></span>
<span class="line"><span style="color:#24292e;">   license                            Display license information</span></span>
<span class="line"><span style="color:#24292e;">   makecache                          Generate ethash verification cache (for testing)</span></span>
<span class="line"><span style="color:#24292e;">   makedag                            Generate ethash mining DAG (for testing)</span></span>
<span class="line"><span style="color:#24292e;">   removedb                           Remove blockchain and state databases</span></span>
<span class="line"><span style="color:#24292e;">   show-deprecated-flags              Show flags that have been deprecated</span></span>
<span class="line"><span style="color:#24292e;">   snapshot                           A set of commands based on the snapshot</span></span>
<span class="line"><span style="color:#24292e;">   version                            Print version numbers</span></span>
<span class="line"><span style="color:#24292e;">   version-check                      Checks (online) whether the current version suffers from any known security vulnerabilities</span></span>
<span class="line"><span style="color:#24292e;">   wallet                             Manage Ethereum presale wallets</span></span>
<span class="line"><span style="color:#24292e;">   help, h                            Shows a list of commands or help for one command</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ETHEREUM OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --config value                      TOML configuration file</span></span>
<span class="line"><span style="color:#24292e;">  --datadir.minfreedisk value         Minimum free disk space in MB, once reached triggers auto shut down (default = --cache.gc converted to MB, 0 = disabled)</span></span>
<span class="line"><span style="color:#24292e;">  --keystore value                    Directory for the keystore (default = inside the datadir)</span></span>
<span class="line"><span style="color:#24292e;">  --usb                               Enable monitoring and management of USB hardware wallets</span></span>
<span class="line"><span style="color:#24292e;">  --pcscdpath value                   Path to the smartcard daemon (pcscd) socket file</span></span>
<span class="line"><span style="color:#24292e;">  --networkid value                   Explicitly set network id (integer)(For testnets: use --ropsten, --rinkeby, --goerli instead) (default: 1)</span></span>
<span class="line"><span style="color:#24292e;">  --syncmode value                    Blockchain sync mode (&quot;snap&quot;, &quot;full&quot; or &quot;light&quot;) (default: snap)</span></span>
<span class="line"><span style="color:#24292e;">  --exitwhensynced                    Exits after block synchronisation completes</span></span>
<span class="line"><span style="color:#24292e;">  --gcmode value                      Blockchain garbage collection mode (&quot;full&quot;, &quot;archive&quot;) (default: &quot;full&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --txlookuplimit value               Number of recent blocks to maintain transactions index for (default = about one year, 0 = entire chain) (default: 2350000)</span></span>
<span class="line"><span style="color:#24292e;">  --ethstats value                    Reporting URL of a ethstats service (nodename:secret@host:port)</span></span>
<span class="line"><span style="color:#24292e;">  --identity value                    Custom node name</span></span>
<span class="line"><span style="color:#24292e;">  --lightkdf                          Reduce key-derivation RAM &amp; CPU usage at some expense of KDF strength</span></span>
<span class="line"><span style="color:#24292e;">  --eth.requiredblocks value          Comma separated block number-to-hash mappings to require for peering (&lt;number&gt;=&lt;hash&gt;)</span></span>
<span class="line"><span style="color:#24292e;">  --mainnet                           Ethereum mainnet</span></span>
<span class="line"><span style="color:#24292e;">  --ropsten                           Ropsten network: pre-configured proof-of-stake test network</span></span>
<span class="line"><span style="color:#24292e;">  --rinkeby                           Rinkeby network: pre-configured proof-of-authority test network</span></span>
<span class="line"><span style="color:#24292e;">  --goerli                            Görli network: pre-configured proof-of-authority test network</span></span>
<span class="line"><span style="color:#24292e;">  --sepolia                           Sepolia network: pre-configured proof-of-work test network</span></span>
<span class="line"><span style="color:#24292e;">  --kiln                              Kiln network: pre-configured proof-of-work to proof-of-stake test network</span></span>
<span class="line"><span style="color:#24292e;">  --datadir value                     Data directory for the databases and keystore (default: &quot;~/.ethereum&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --datadir.ancient value             Data directory for ancient chain segments (default = inside chaindata)</span></span>
<span class="line"><span style="color:#24292e;">  --remotedb value                    URL for remote database</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">LIGHT CLIENT OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --light.serve value                 Maximum percentage of time allowed for serving LES requests (multi-threaded processing allows values over 100) (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --light.ingress value               Incoming bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --light.egress value                Outgoing bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --light.maxpeers value              Maximum number of light clients to serve, or light servers to attach to (default: 100)</span></span>
<span class="line"><span style="color:#24292e;">  --ulc.servers value                 List of trusted ultra-light servers</span></span>
<span class="line"><span style="color:#24292e;">  --ulc.fraction value                Minimum % of trusted ultra-light servers required to announce a new head (default: 75)</span></span>
<span class="line"><span style="color:#24292e;">  --ulc.onlyannounce                  Ultra light server sends announcements only</span></span>
<span class="line"><span style="color:#24292e;">  --light.nopruning                   Disable ancient light chain data pruning</span></span>
<span class="line"><span style="color:#24292e;">  --light.nosyncserve                 Enables serving light clients before syncing</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">DEVELOPER CHAIN OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --dev                               Ephemeral proof-of-authority network with a pre-funded developer account, mining enabled</span></span>
<span class="line"><span style="color:#24292e;">  --dev.period value                  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --dev.gaslimit value                Initial block gas limit (default: 11500000)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ETHASH OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.cachedir value             Directory to store the ethash verification caches (default = inside the datadir)</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.cachesinmem value          Number of recent ethash caches to keep in memory (16MB each) (default: 2)</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.cachesondisk value         Number of recent ethash caches to keep on disk (16MB each) (default: 3)</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.cacheslockmmap             Lock memory maps of recent ethash caches</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.dagdir value               Directory to store the ethash mining DAGs (default: &quot;~/.ethash&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.dagsinmem value            Number of recent ethash mining DAGs to keep in memory (1+GB each) (default: 1)</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.dagsondisk value           Number of recent ethash mining DAGs to keep on disk (1+GB each) (default: 2)</span></span>
<span class="line"><span style="color:#24292e;">  --ethash.dagslockmmap               Lock memory maps for recent ethash mining DAGs</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">TRANSACTION POOL OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.locals value               Comma separated accounts to treat as locals (no flush, priority inclusion)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.nolocals                   Disables price exemptions for locally submitted transactions</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.journal value              Disk journal for local transaction to survive node restarts (default: &quot;transactions.rlp&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.rejournal value            Time interval to regenerate the local transaction journal (default: 1h0m0s)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.pricelimit value           Minimum gas price limit to enforce for acceptance into the pool (default: 1)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.pricebump value            Price bump percentage to replace an already existing transaction (default: 10)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.accountslots value         Minimum number of executable transaction slots guaranteed per account (default: 16)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.globalslots value          Maximum number of executable transaction slots for all accounts (default: 5120)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.accountqueue value         Maximum number of non-executable transaction slots permitted per account (default: 64)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.globalqueue value          Maximum number of non-executable transaction slots for all accounts (default: 1024)</span></span>
<span class="line"><span style="color:#24292e;">  --txpool.lifetime value             Maximum amount of time non-executable transaction are queued (default: 3h0m0s)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PERFORMANCE TUNING OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --cache value                       Megabytes of memory allocated to internal caching (default = 4096 mainnet full node, 128 light mode) (default: 1024)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.database value              Percentage of cache memory allowance to use for database io (default: 50)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.trie value                  Percentage of cache memory allowance to use for trie caching (default = 15% full mode, 30% archive mode) (default: 15)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.trie.journal value          Disk journal directory for trie cache to survive node restarts (default: &quot;triecache&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.trie.rejournal value        Time interval to regenerate the trie cache journal (default: 1h0m0s)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.gc value                    Percentage of cache memory allowance to use for trie pruning (default = 25% full mode, 0% archive mode) (default: 25)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.snapshot value              Percentage of cache memory allowance to use for snapshot caching (default = 10% full mode, 20% archive mode) (default: 10)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.noprefetch                  Disable heuristic state prefetch during block import (less CPU and disk IO, more time waiting for data)</span></span>
<span class="line"><span style="color:#24292e;">  --cache.preimages                   Enable recording the SHA3/keccak preimages of trie keys</span></span>
<span class="line"><span style="color:#24292e;">  --fdlimit value                     Raise the open file descriptor resource limit (default = system fd limit) (default: 0)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ACCOUNT OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --unlock value                      Comma separated list of accounts to unlock</span></span>
<span class="line"><span style="color:#24292e;">  --password value                    Password file to use for non-interactive password input</span></span>
<span class="line"><span style="color:#24292e;">  --signer value                      External signer (url or path to ipc file)</span></span>
<span class="line"><span style="color:#24292e;">  --allow-insecure-unlock             Allow insecure account unlocking when account-related RPCs are exposed by http</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">API AND CONSOLE OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --ipcdisable                        Disable the IPC-RPC server</span></span>
<span class="line"><span style="color:#24292e;">  --ipcpath value                     Filename for IPC socket/pipe within the datadir (explicit paths escape it)</span></span>
<span class="line"><span style="color:#24292e;">  --http                              Enable the HTTP-RPC server</span></span>
<span class="line"><span style="color:#24292e;">  --http.addr value                   HTTP-RPC server listening interface (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --http.port value                   HTTP-RPC server listening port (default: 8545)</span></span>
<span class="line"><span style="color:#24292e;">  --http.api value                    API&#39;s offered over the HTTP-RPC interface</span></span>
<span class="line"><span style="color:#24292e;">  --http.rpcprefix value              HTTP path path prefix on which JSON-RPC is served. Use &#39;/&#39; to serve on all paths.</span></span>
<span class="line"><span style="color:#24292e;">  --http.corsdomain value             Comma separated list of domains from which to accept cross origin requests (browser enforced)</span></span>
<span class="line"><span style="color:#24292e;">  --http.vhosts value                 Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts &#39;*&#39; wildcard. (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --ws                                Enable the WS-RPC server</span></span>
<span class="line"><span style="color:#24292e;">  --ws.addr value                     WS-RPC server listening interface (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --ws.port value                     WS-RPC server listening port (default: 8546)</span></span>
<span class="line"><span style="color:#24292e;">  --ws.api value                      API&#39;s offered over the WS-RPC interface</span></span>
<span class="line"><span style="color:#24292e;">  --ws.rpcprefix value                HTTP path prefix on which JSON-RPC is served. Use &#39;/&#39; to serve on all paths.</span></span>
<span class="line"><span style="color:#24292e;">  --ws.origins value                  Origins from which to accept websockets requests</span></span>
<span class="line"><span style="color:#24292e;">  --authrpc.jwtsecret value           Path to a JWT secret to use for authenticated RPC endpoints</span></span>
<span class="line"><span style="color:#24292e;">  --authrpc.addr value                Listening address for authenticated APIs (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --authrpc.port value                Listening port for authenticated APIs (default: 8551)</span></span>
<span class="line"><span style="color:#24292e;">  --authrpc.vhosts value              Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts &#39;*&#39; wildcard. (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --graphql                           Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.</span></span>
<span class="line"><span style="color:#24292e;">  --graphql.corsdomain value          Comma separated list of domains from which to accept cross origin requests (browser enforced)</span></span>
<span class="line"><span style="color:#24292e;">  --graphql.vhosts value              Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts &#39;*&#39; wildcard. (default: &quot;localhost&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --rpc.gascap value                  Sets a cap on gas that can be used in eth_call/estimateGas (0=infinite) (default: 50000000)</span></span>
<span class="line"><span style="color:#24292e;">  --rpc.evmtimeout value              Sets a timeout used for eth_call (0=infinite) (default: 5s)</span></span>
<span class="line"><span style="color:#24292e;">  --rpc.txfeecap value                Sets a cap on transaction fee (in ether) that can be sent via the RPC APIs (0 = no cap) (default: 1)</span></span>
<span class="line"><span style="color:#24292e;">  --rpc.allow-unprotected-txs         Allow for unprotected (non EIP155 signed) transactions to be submitted via RPC</span></span>
<span class="line"><span style="color:#24292e;">  --jspath loadScript                 JavaScript root path for loadScript (default: &quot;.&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --exec value                        Execute JavaScript statement</span></span>
<span class="line"><span style="color:#24292e;">  --preload value                     Comma separated list of JavaScript files to preload into the console</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">NETWORKING OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --bootnodes value                   Comma separated enode URLs for P2P discovery bootstrap</span></span>
<span class="line"><span style="color:#24292e;">  --discovery.dns value               Sets DNS discovery entry points (use &quot;&quot; to disable DNS)</span></span>
<span class="line"><span style="color:#24292e;">  --port value                        Network listening port (default: 30303)</span></span>
<span class="line"><span style="color:#24292e;">  --maxpeers value                    Maximum number of network peers (network disabled if set to 0) (default: 50)</span></span>
<span class="line"><span style="color:#24292e;">  --maxpendpeers value                Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --nat value                         NAT port mapping mechanism (any|none|upnp|pmp|extip:&lt;IP&gt;) (default: &quot;any&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --nodiscover                        Disables the peer discovery mechanism (manual peer addition)</span></span>
<span class="line"><span style="color:#24292e;">  --v5disc                            Enables the experimental RLPx V5 (Topic Discovery) mechanism</span></span>
<span class="line"><span style="color:#24292e;">  --netrestrict value                 Restricts network communication to the given IP networks (CIDR masks)</span></span>
<span class="line"><span style="color:#24292e;">  --nodekey value                     P2P node key file</span></span>
<span class="line"><span style="color:#24292e;">  --nodekeyhex value                  P2P node key as hex (for testing)</span></span>
<span class="line"><span style="color:#24292e;">  </span></span>
<span class="line"><span style="color:#24292e;">MINER OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --mine                              Enable mining</span></span>
<span class="line"><span style="color:#24292e;">  --miner.threads value               Number of CPU threads to use for mining (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --miner.notify value                Comma separated HTTP URL list to notify of new work packages</span></span>
<span class="line"><span style="color:#24292e;">  --miner.notify.full                 Notify with pending block headers instead of work packages</span></span>
<span class="line"><span style="color:#24292e;">  --miner.gasprice value              Minimum gas price for mining a transaction (default: 1000000000)</span></span>
<span class="line"><span style="color:#24292e;">  --miner.gaslimit value              Target gas ceiling for mined blocks (default: 30000000)</span></span>
<span class="line"><span style="color:#24292e;">  --miner.etherbase value             Public address for block mining rewards (default = first account) (default: &quot;0&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --miner.extradata value             Block extra data set by the miner (default = client version)</span></span>
<span class="line"><span style="color:#24292e;">  --miner.recommit value              Time interval to recreate the block being mined (default: 3s)</span></span>
<span class="line"><span style="color:#24292e;">  --miner.noverify                    Disable remote sealing verification</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">GAS PRICE ORACLE OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --gpo.blocks value                  Number of recent blocks to check for gas prices (default: 20)</span></span>
<span class="line"><span style="color:#24292e;">  --gpo.percentile value              Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)</span></span>
<span class="line"><span style="color:#24292e;">  --gpo.maxprice value                Maximum transaction priority fee (or gasprice before London fork) to be recommended by gpo (default: 500000000000)</span></span>
<span class="line"><span style="color:#24292e;">  --gpo.ignoreprice value             Gas price below which gpo will ignore transactions (default: 2)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">VIRTUAL MACHINE OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --vmdebug                           Record information useful for VM and contract debugging</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">LOGGING AND DEBUGGING OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --fakepow                           Disables proof-of-work verification</span></span>
<span class="line"><span style="color:#24292e;">  --nocompaction                      Disables db compaction after import</span></span>
<span class="line"><span style="color:#24292e;">  --verbosity value                   Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)</span></span>
<span class="line"><span style="color:#24292e;">  --vmodule value                     Per-module verbosity: comma-separated list of &lt;pattern&gt;=&lt;level&gt; (e.g. eth/*=5,p2p=4)</span></span>
<span class="line"><span style="color:#24292e;">  --log.json                          Format logs with JSON</span></span>
<span class="line"><span style="color:#24292e;">  --log.backtrace value               Request a stack trace at a specific logging statement (e.g. &quot;block.go:271&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --log.debug                         Prepends log messages with call-site location (file and line number)</span></span>
<span class="line"><span style="color:#24292e;">  --pprof                             Enable the pprof HTTP server</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.addr value                  pprof HTTP server listening interface (default: &quot;127.0.0.1&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.port value                  pprof HTTP server listening port (default: 6060)</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.memprofilerate value        Turn on memory profiling with the given rate (default: 524288)</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.blockprofilerate value      Turn on block profiling with the given rate (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.cpuprofile value            Write CPU profile to the given file</span></span>
<span class="line"><span style="color:#24292e;">  --trace value                       Write execution trace to the given file</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">METRICS AND STATS OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --metrics                              Enable metrics collection and reporting</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.expensive                    Enable expensive metrics collection and reporting</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.addr value                   Enable stand-alone metrics HTTP server listening interface (default: &quot;127.0.0.1&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.port value                   Metrics HTTP server listening port (default: 6060)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb                     Enable metrics export/push to an external InfluxDB database</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.endpoint value      InfluxDB API endpoint to report metrics to (default: &quot;http://localhost:8086&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.database value      InfluxDB database name to push reported metrics to (default: &quot;geth&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.username value      Username to authorize access to the database (default: &quot;test&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.password value      Password to authorize access to the database (default: &quot;test&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.tags value          Comma-separated InfluxDB tags (key/values) attached to all measurements (default: &quot;host=localhost&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdbv2                   Enable metrics export/push to an external InfluxDB v2 database</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.token value         Token to authorize access to the database (v2 only) (default: &quot;test&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.bucket value        InfluxDB bucket name to push reported metrics to (v2 only) (default: &quot;geth&quot;)</span></span>
<span class="line"><span style="color:#24292e;">  --metrics.influxdb.organization value  InfluxDB organization name (v2 only) (default: &quot;geth&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ALIASED (deprecated) OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --nousb                             Disables monitoring for and managing USB hardware wallets (deprecated)</span></span>
<span class="line"><span style="color:#24292e;">  --whitelist value                   Comma separated block number-to-hash mappings to enforce (&lt;number&gt;=&lt;hash&gt;) (deprecated in favor of --eth.requiredblocks)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">MISC OPTIONS:</span></span>
<span class="line"><span style="color:#24292e;">  --snapshot                                Enables snapshot-database mode (default = enable)</span></span>
<span class="line"><span style="color:#24292e;">  --bloomfilter.size value                  Megabytes of memory allocated to bloom-filter for pruning (default: 2048)</span></span>
<span class="line"><span style="color:#24292e;">  --ignore-legacy-receipts                  Geth will start up even if there are legacy receipts in freezer</span></span>
<span class="line"><span style="color:#24292e;">  --help, -h                                show help</span></span>
<span class="line"><span style="color:#24292e;">  --override.grayglacier value              Manually specify Gray Glacier fork-block, overriding the bundled setting (default: 0)</span></span>
<span class="line"><span style="color:#24292e;">  --override.terminaltotaldifficulty value  Manually specify TerminalTotalDifficulty, overriding the bundled setting (default: &lt;nil&gt;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">COPYRIGHT:</span></span>
<span class="line"><span style="color:#24292e;">   Copyright 2013-2022 The go-ethereum Authors</span></span></code></pre></div><h2 id="_9-0-参数分类" tabindex="-1">9.0 参数分类 <a class="header-anchor" href="#_9-0-参数分类" aria-label="Permalink to &quot;9.0 参数分类&quot;">​</a></h2><h3 id="_1-性能调优选项" tabindex="-1">1.性能调优选项 <a class="header-anchor" href="#_1-性能调优选项" aria-label="Permalink to &quot;1.性能调优选项&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">PERFORMANCE TUNING OPTIONS:           性能调整选项</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache value                       分配给内部缓存的内存兆字节（默认 = 4096 主网全节点，128 轻模式）（默认：1024）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.database value              用于数据库 io 的缓存内存允许百分比（默认值：50）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.trie value                  用于 trie 缓存的缓存内存允许百分比（默认值 = 15% 完整模式，30% 存档模式）（默认值：15）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.trie.journal value          trie 缓存的磁盘日志目录以在节点重新启动后继续存在（默认值：“triecache”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.trie.rejournal value        重新生成 trie 缓存日志的时间间隔（默认值：1小时）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.gc value                    用于修剪修剪的缓存内存百分比（默认值 = 25% 完整模式，0% 存档模式）（默认值：25）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.snapshot value              用于快照缓存的缓存允许百分比（默认值 = 10% 完整模式，20% 存档模式）（默认值：10）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.noprefetch                  在块导入期间禁用启发式状态预取（更少的 CPU 和磁盘 IO，更多的时间等待数据）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --cache.preimages                   启用记录 trie 密钥的 SHA3/keccak 原像</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">PERFORMANCE TUNING OPTIONS:           性能调整选项</span></span>
<span class="line"><span style="color:#24292e;">  --cache value                       分配给内部缓存的内存兆字节（默认 = 4096 主网全节点，128 轻模式）（默认：1024）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.database value              用于数据库 io 的缓存内存允许百分比（默认值：50）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.trie value                  用于 trie 缓存的缓存内存允许百分比（默认值 = 15% 完整模式，30% 存档模式）（默认值：15）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.trie.journal value          trie 缓存的磁盘日志目录以在节点重新启动后继续存在（默认值：“triecache”）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.trie.rejournal value        重新生成 trie 缓存日志的时间间隔（默认值：1小时）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.gc value                    用于修剪修剪的缓存内存百分比（默认值 = 25% 完整模式，0% 存档模式）（默认值：25）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.snapshot value              用于快照缓存的缓存允许百分比（默认值 = 10% 完整模式，20% 存档模式）（默认值：10）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.noprefetch                  在块导入期间禁用启发式状态预取（更少的 CPU 和磁盘 IO，更多的时间等待数据）</span></span>
<span class="line"><span style="color:#24292e;">  --cache.preimages                   启用记录 trie 密钥的 SHA3/keccak 原像</span></span></code></pre></div><h3 id="_2-api和控制台选项" tabindex="-1">2.API和控制台选项 <a class="header-anchor" href="#_2-api和控制台选项" aria-label="Permalink to &quot;2.API和控制台选项&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">API AND CONSOLE OPTIONS:              API 和控制台选项</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ipcdisable                        禁用 IPC-RPC 服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ipcpath value                     datadir 中 IPC 套接字/管道的文件名（显式路径对其进行转义）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http                              启用 HTTP-RPC 服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.addr value                   HTTP-RPC 服务器监听接口（默认：“localhost”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.port value                   HTTP-RPC 服务器监听端口（默认：8545）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.api value                    通过 HTTP-RPC 接口提供的 API</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.rpcprefix value              提供 JSON-RPC 的 HTTP 路径路径前缀。使用“/”在所有路径上提供服务。</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.corsdomain value             接受跨源请求的域的逗号分隔列表（浏览器强制执行）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --http.vhosts value                 逗号分隔的虚拟主机名列表，从中接受请求（服务器强制执行）。接受“*”通配符。 （默认：“本地主机”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws                                启用 WS-RPC 服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.addr value                     WS-RPC 服务器监听接口（默认：“localhost”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.port value                     WS-RPC 服务器监听端口（默认：8546）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.api value                      通过 WS-RPC 接口提供的 API</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.rpcprefix value                提供 JSON-RPC 的 HTTP 路径前缀。使用“/”在所有路径上提供服务。</span></span>
<span class="line"><span style="color:#e1e4e8;">  --ws.origins value                  接受 websockets 请求的来源</span></span>
<span class="line"><span style="color:#e1e4e8;">  --graphql                           在 HTTP-RPC 服务器上启用 GraphQL。请注意，GraphQL 只能在 HTTP 服务器启动的情况下启动。</span></span>
<span class="line"><span style="color:#e1e4e8;">  --graphql.corsdomain value          接受跨源请求的域的逗号分隔列表（浏览器强制执行）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --graphql.vhosts value              逗号分隔的虚拟主机名列表，从中接受请求（服务器强制执行）。接受“*”通配符。 （默认：“本地主机”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpc.gascap value                  设置可以在 eth_call/estimateGas 中使用的 gas 上限（0=无限）（默认值：50000000）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpc.txfeecap value                设置可以通过 RPC API 发送的交易费用上限（以以太为单位）（0 = 无上限）（默认值：1）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --rpc.allow-unprotected-txs         允许通过 RPC 提交不受保护的（非 EIP155 签名）交易</span></span>
<span class="line"><span style="color:#e1e4e8;">  --jspath loadScript                 loadScript 的 JavaScript 根路径（默认值：“.”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --exec value                        执行 JavaScript 语句</span></span>
<span class="line"><span style="color:#e1e4e8;">  --preload value                     要预加载到控制台的以逗号分隔的 JavaScript 文件列表</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">API AND CONSOLE OPTIONS:              API 和控制台选项</span></span>
<span class="line"><span style="color:#24292e;">  --ipcdisable                        禁用 IPC-RPC 服务器</span></span>
<span class="line"><span style="color:#24292e;">  --ipcpath value                     datadir 中 IPC 套接字/管道的文件名（显式路径对其进行转义）</span></span>
<span class="line"><span style="color:#24292e;">  --http                              启用 HTTP-RPC 服务器</span></span>
<span class="line"><span style="color:#24292e;">  --http.addr value                   HTTP-RPC 服务器监听接口（默认：“localhost”）</span></span>
<span class="line"><span style="color:#24292e;">  --http.port value                   HTTP-RPC 服务器监听端口（默认：8545）</span></span>
<span class="line"><span style="color:#24292e;">  --http.api value                    通过 HTTP-RPC 接口提供的 API</span></span>
<span class="line"><span style="color:#24292e;">  --http.rpcprefix value              提供 JSON-RPC 的 HTTP 路径路径前缀。使用“/”在所有路径上提供服务。</span></span>
<span class="line"><span style="color:#24292e;">  --http.corsdomain value             接受跨源请求的域的逗号分隔列表（浏览器强制执行）</span></span>
<span class="line"><span style="color:#24292e;">  --http.vhosts value                 逗号分隔的虚拟主机名列表，从中接受请求（服务器强制执行）。接受“*”通配符。 （默认：“本地主机”）</span></span>
<span class="line"><span style="color:#24292e;">  --ws                                启用 WS-RPC 服务器</span></span>
<span class="line"><span style="color:#24292e;">  --ws.addr value                     WS-RPC 服务器监听接口（默认：“localhost”）</span></span>
<span class="line"><span style="color:#24292e;">  --ws.port value                     WS-RPC 服务器监听端口（默认：8546）</span></span>
<span class="line"><span style="color:#24292e;">  --ws.api value                      通过 WS-RPC 接口提供的 API</span></span>
<span class="line"><span style="color:#24292e;">  --ws.rpcprefix value                提供 JSON-RPC 的 HTTP 路径前缀。使用“/”在所有路径上提供服务。</span></span>
<span class="line"><span style="color:#24292e;">  --ws.origins value                  接受 websockets 请求的来源</span></span>
<span class="line"><span style="color:#24292e;">  --graphql                           在 HTTP-RPC 服务器上启用 GraphQL。请注意，GraphQL 只能在 HTTP 服务器启动的情况下启动。</span></span>
<span class="line"><span style="color:#24292e;">  --graphql.corsdomain value          接受跨源请求的域的逗号分隔列表（浏览器强制执行）</span></span>
<span class="line"><span style="color:#24292e;">  --graphql.vhosts value              逗号分隔的虚拟主机名列表，从中接受请求（服务器强制执行）。接受“*”通配符。 （默认：“本地主机”）</span></span>
<span class="line"><span style="color:#24292e;">  --rpc.gascap value                  设置可以在 eth_call/estimateGas 中使用的 gas 上限（0=无限）（默认值：50000000）</span></span>
<span class="line"><span style="color:#24292e;">  --rpc.txfeecap value                设置可以通过 RPC API 发送的交易费用上限（以以太为单位）（0 = 无上限）（默认值：1）</span></span>
<span class="line"><span style="color:#24292e;">  --rpc.allow-unprotected-txs         允许通过 RPC 提交不受保护的（非 EIP155 签名）交易</span></span>
<span class="line"><span style="color:#24292e;">  --jspath loadScript                 loadScript 的 JavaScript 根路径（默认值：“.”）</span></span>
<span class="line"><span style="color:#24292e;">  --exec value                        执行 JavaScript 语句</span></span>
<span class="line"><span style="color:#24292e;">  --preload value                     要预加载到控制台的以逗号分隔的 JavaScript 文件列表</span></span></code></pre></div><h3 id="_3-网络选项" tabindex="-1">3.网络选项 <a class="header-anchor" href="#_3-网络选项" aria-label="Permalink to &quot;3.网络选项&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">NETWORKING OPTIONS:                   网络选项</span></span>
<span class="line"><span style="color:#e1e4e8;">  --bootnodes value                   用于 P2P 发现引导程序的逗号分隔的 enode URL</span></span>
<span class="line"><span style="color:#e1e4e8;">  --discovery.dns value               设置 DNS 发现入口点（使用“”禁用 DNS）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --port value                        网络监听端口（默认：30303）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --maxpeers value                    网络对等点的最大数量（如果设置为 0，则禁用网络）（默认值：50）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --maxpendpeers value                最大挂起连接尝试次数（如果设置为 0，则使用默认值）（默认值：0）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nat value                         NAT 端口映射机制（any|none|upnp|pmp|extip： )（默认值：“任何”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nodiscover                        禁用对等发现机制（手动对等添加）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --v5disc                            启用实验性 RLPx V5（主题发现）机制</span></span>
<span class="line"><span style="color:#e1e4e8;">  --netrestrict value                 将网络通信限制到给定的 IP 网络（CIDR 掩码）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nodekey value                     P2P节点密钥文件</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nodekeyhex value                  P2P 节点密钥为十六进制（用于测试）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">NETWORKING OPTIONS:                   网络选项</span></span>
<span class="line"><span style="color:#24292e;">  --bootnodes value                   用于 P2P 发现引导程序的逗号分隔的 enode URL</span></span>
<span class="line"><span style="color:#24292e;">  --discovery.dns value               设置 DNS 发现入口点（使用“”禁用 DNS）</span></span>
<span class="line"><span style="color:#24292e;">  --port value                        网络监听端口（默认：30303）</span></span>
<span class="line"><span style="color:#24292e;">  --maxpeers value                    网络对等点的最大数量（如果设置为 0，则禁用网络）（默认值：50）</span></span>
<span class="line"><span style="color:#24292e;">  --maxpendpeers value                最大挂起连接尝试次数（如果设置为 0，则使用默认值）（默认值：0）</span></span>
<span class="line"><span style="color:#24292e;">  --nat value                         NAT 端口映射机制（any|none|upnp|pmp|extip： )（默认值：“任何”）</span></span>
<span class="line"><span style="color:#24292e;">  --nodiscover                        禁用对等发现机制（手动对等添加）</span></span>
<span class="line"><span style="color:#24292e;">  --v5disc                            启用实验性 RLPx V5（主题发现）机制</span></span>
<span class="line"><span style="color:#24292e;">  --netrestrict value                 将网络通信限制到给定的 IP 网络（CIDR 掩码）</span></span>
<span class="line"><span style="color:#24292e;">  --nodekey value                     P2P节点密钥文件</span></span>
<span class="line"><span style="color:#24292e;">  --nodekeyhex value                  P2P 节点密钥为十六进制（用于测试）</span></span></code></pre></div><h3 id="_4-日志和调试选项" tabindex="-1">4.日志和调试选项 <a class="header-anchor" href="#_4-日志和调试选项" aria-label="Permalink to &quot;4.日志和调试选项&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">LOGGING AND DEBUGGING OPTIONS:        记录和调试选项</span></span>
<span class="line"><span style="color:#e1e4e8;">  --fakepow                           禁用工作量证明验证</span></span>
<span class="line"><span style="color:#e1e4e8;">  --nocompaction                      导入后禁用数据库压缩</span></span>
<span class="line"><span style="color:#e1e4e8;">  --verbosity value                   日志详细程度：0=silent，1=error，2=warn，3=info，4=debug，5=detail（默认：3）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --vmodule value                     每个模块的详细程度：逗号分隔的列表= （例如 eth/*=5,p2p=4）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --log.json                          使用 JSON 格式化日志</span></span>
<span class="line"><span style="color:#e1e4e8;">  --log.backtrace value               在特定日志语句（例如“block.go:271”）处请求堆栈跟踪</span></span>
<span class="line"><span style="color:#e1e4e8;">  --log.debug                         使用呼叫站点位置（文件和行号）预先准备日志消息</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof                             启用 pprof HTTP 服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.addr value                  pprof HTTP 服务器监听接口（默认：“127.0.0.1”）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.port value                  pprof HTTP 服务器监听端口（默认：6060）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.memprofilerate value        以给定的速率打开内存分析（默认值：524288）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.blockprofilerate value      以给定的速率打开块分析（默认值：0）</span></span>
<span class="line"><span style="color:#e1e4e8;">  --pprof.cpuprofile value            将 CPU 配置文件写入给定文件</span></span>
<span class="line"><span style="color:#e1e4e8;">  --trace value                       将执行跟踪写入给定文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">LOGGING AND DEBUGGING OPTIONS:        记录和调试选项</span></span>
<span class="line"><span style="color:#24292e;">  --fakepow                           禁用工作量证明验证</span></span>
<span class="line"><span style="color:#24292e;">  --nocompaction                      导入后禁用数据库压缩</span></span>
<span class="line"><span style="color:#24292e;">  --verbosity value                   日志详细程度：0=silent，1=error，2=warn，3=info，4=debug，5=detail（默认：3）</span></span>
<span class="line"><span style="color:#24292e;">  --vmodule value                     每个模块的详细程度：逗号分隔的列表= （例如 eth/*=5,p2p=4）</span></span>
<span class="line"><span style="color:#24292e;">  --log.json                          使用 JSON 格式化日志</span></span>
<span class="line"><span style="color:#24292e;">  --log.backtrace value               在特定日志语句（例如“block.go:271”）处请求堆栈跟踪</span></span>
<span class="line"><span style="color:#24292e;">  --log.debug                         使用呼叫站点位置（文件和行号）预先准备日志消息</span></span>
<span class="line"><span style="color:#24292e;">  --pprof                             启用 pprof HTTP 服务器</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.addr value                  pprof HTTP 服务器监听接口（默认：“127.0.0.1”）</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.port value                  pprof HTTP 服务器监听端口（默认：6060）</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.memprofilerate value        以给定的速率打开内存分析（默认值：524288）</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.blockprofilerate value      以给定的速率打开块分析（默认值：0）</span></span>
<span class="line"><span style="color:#24292e;">  --pprof.cpuprofile value            将 CPU 配置文件写入给定文件</span></span>
<span class="line"><span style="color:#24292e;">  --trace value                       将执行跟踪写入给定文件</span></span></code></pre></div><h2 id="_9-1以太坊的几种同步模式" tabindex="-1">9.1以太坊的几种同步模式 <a class="header-anchor" href="#_9-1以太坊的几种同步模式" aria-label="Permalink to &quot;9.1以太坊的几种同步模式&quot;">​</a></h2><p>查看geth命令行参数<code>geth --help</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--syncmode value                    Blockchain sync mode (&quot;snap&quot;, &quot;full&quot; or &quot;light&quot;) (default: snap)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--syncmode value                    Blockchain sync mode (&quot;snap&quot;, &quot;full&quot; or &quot;light&quot;) (default: snap)</span></span></code></pre></div><p>参数支持&quot;full&quot;, &quot;snap&quot;, &quot;light&quot; 三种模式「原先的&quot;fast&quot;已被 &quot;snap&quot;替代」</p><p>同步模式 --syncmode <code>&lt;mode&gt;</code> 您可以使用确定网络中节点类型的参数以三种不同同步模式之一启动 Geth 。</p><p>这些是：</p><ul><li>Full : 下载所有区块（包括标题、交易和收据）并通过执行每个区块增量生成区块链的状态。</li><li>Snap（默认）：与快速相同的功能，但具有更快的算法，但不对区块中的交易进行重放以生成状态数据，只会在后期对区块中的数据（包括交易）进行<strong>校验</strong></li><li>Light：下载所有区块头、区块数据，并随机验证一些，不同步区块体和状态数据，仅在需要时从网络上其他节点处获取</li></ul><p><a href="https://blog.ethereum.org/2021/03/03/geth-v1-10-0/" target="_blank" rel="noreferrer">官方推荐使用快照同步</a>，简单说就是新的算法替代原先的fast模式</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311151828990.png" alt=""></p><h3 id="snap启动" tabindex="-1">snap启动 <a class="header-anchor" href="#snap启动" aria-label="Permalink to &quot;snap启动&quot;">​</a></h3><blockquote><p>修改默认启动端口，第一个数字加1</p></blockquote><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">nohup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/snapeth/geth</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--syncmode</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">snap</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--allow-insecure-unlock</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--authrpc.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9551</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">40303</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9546</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9545</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.api</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">web3,db,eth,net,personal</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.addr=172.31.34.215</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--datadir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/coin/snapETH</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--maxpeers</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--cache</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--rpc.allow-unprotected-txs</span><span style="color:#E1E4E8;"> &amp;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#线上</span></span>
<span class="line"><span style="color:#B392F0;">nohup</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/snapeth/geth</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--authrpc.jwtsecret</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/apps/prysm/jwt.hex</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--syncmode</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">snap</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--allow-insecure-unlock</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--authrpc.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8551</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">30303</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8546</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.port</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8545</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.api</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">web3,db,eth,net,personal</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--http.addr=172.31.34.215</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--datadir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/coin/snapETH</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--maxpeers</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--cache</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1024</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--rpc.allow-unprotected-txs</span><span style="color:#E1E4E8;"> &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">nohup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/snapeth/geth</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--syncmode</span><span style="color:#24292E;"> </span><span style="color:#032F62;">snap</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--allow-insecure-unlock</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--authrpc.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9551</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">40303</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9546</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9545</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.api</span><span style="color:#24292E;"> </span><span style="color:#032F62;">web3,db,eth,net,personal</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.addr=172.31.34.215</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--datadir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/coin/snapETH</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--maxpeers</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">101</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--cache</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--rpc.allow-unprotected-txs</span><span style="color:#24292E;"> &amp;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#线上</span></span>
<span class="line"><span style="color:#6F42C1;">nohup</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/snapeth/geth</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--authrpc.jwtsecret</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/apps/prysm/jwt.hex</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--syncmode</span><span style="color:#24292E;"> </span><span style="color:#032F62;">snap</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--allow-insecure-unlock</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--authrpc.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8551</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">30303</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8546</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.port</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8545</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.api</span><span style="color:#24292E;"> </span><span style="color:#032F62;">web3,db,eth,net,personal</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--http.addr=172.31.34.215</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--datadir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/coin/snapETH</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--maxpeers</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">101</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--cache</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1024</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--rpc.allow-unprotected-txs</span><span style="color:#24292E;"> &amp;</span></span></code></pre></div><h1 id="手册参考地址" tabindex="-1">手册参考地址： <a class="header-anchor" href="#手册参考地址" aria-label="Permalink to &quot;手册参考地址：&quot;">​</a></h1><p><a href="https://www.netkiller.cn/blockchain/ethereum/geth/index.html" target="_blank" rel="noreferrer">https://www.netkiller.cn/blockchain/ethereum/geth/index.html</a></p><p><a href="https://ethgasstation.info/index.php" target="_blank" rel="noreferrer">ETH手续费价格查询</a></p><p><a href="https://github.com/ethereum/go-ethereum/wiki/Management-APIs" target="_blank" rel="noreferrer">官方github-API</a></p><p><a href="https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_getbalance" target="_blank" rel="noreferrer">官方github-RPC</a></p><p><a href="http://cw.hubwiz.com/card/c/ethereum-json-rpc-api/1/3/22/" target="_blank" rel="noreferrer">汇智网-RPC-中文</a></p><p><a href="https://ethereum.gitbooks.io/frontier-guide/content/rpc.html#eth_gettransactionreceipt" target="_blank" rel="noreferrer">GitBook-RPC-英文</a></p>`,89),o=[p];function t(c,r,i,y,d,u){return a(),n("div",null,o)}const g=s(l,[["render",t]]);export{m as __pageData,g as default};
