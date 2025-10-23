import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const b=JSON.parse('{"title":"1.下载","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/usdt/1-usdtinstall.md","filePath":"guide/Blockchain/usdt/1-usdtinstall.md","lastUpdated":1701401252000}'),l={name:"guide/Blockchain/usdt/1-usdtinstall.md"},p=e(`<h1 id="_1-下载" tabindex="-1">1.下载 <a class="header-anchor" href="#_1-下载" aria-label="Permalink to &quot;1.下载&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://www.omnilayer.org/download.html</span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">https://github.com/OmniLayer/omnicore/releases    #这个需要编译</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://www.omnilayer.org/download.html</span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">https://github.com/OmniLayer/omnicore/releases    #这个需要编译</span></span></code></pre></div><h1 id="_2-安装" tabindex="-1">２.安装 <a class="header-anchor" href="#_2-安装" aria-label="Permalink to &quot;２.安装&quot;">​</a></h1><ul><li>ubuntu18_x64</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">apt-get update</span></span>
<span class="line"><span style="color:#e1e4e8;">apt-get install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils</span></span>
<span class="line"><span style="color:#e1e4e8;">apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev</span></span>
<span class="line"><span style="color:#e1e4e8;">apt-get install libboost-all-dev</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">apt-get update</span></span>
<span class="line"><span style="color:#24292e;">apt-get install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils</span></span>
<span class="line"><span style="color:#24292e;">apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev</span></span>
<span class="line"><span style="color:#24292e;">apt-get install libboost-all-dev</span></span></code></pre></div><h1 id="_3-编写配置文件" tabindex="-1">3.编写配置文件 <a class="header-anchor" href="#_3-编写配置文件" aria-label="Permalink to &quot;3.编写配置文件&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat /data/apps/omnicore-0.5.0/etc/bitcoin.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rpcuser=111</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcpassword=222</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcport=28832</span></span>
<span class="line"><span style="color:#e1e4e8;">port=28833</span></span>
<span class="line"><span style="color:#e1e4e8;">bindip=172.31.32.94</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcallowip=x.x.x.x</span></span>
<span class="line"><span style="color:#e1e4e8;">datadir=/data/coin/usdt/</span></span>
<span class="line"><span style="color:#e1e4e8;">daemon=1</span></span>
<span class="line"><span style="color:#e1e4e8;">server=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#reindex=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#reindex-chainstate=1</span></span>
<span class="line"><span style="color:#e1e4e8;">txindex=1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#解释：</span></span>
<span class="line"><span style="color:#e1e4e8;"># 测试链填 1 主链填 0 </span></span>
<span class="line"><span style="color:#e1e4e8;">testnet=1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#代表事务初始索引，查看所有交易</span></span>
<span class="line"><span style="color:#e1e4e8;">txindex=1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#监听模式，默认启动</span></span>
<span class="line"><span style="color:#e1e4e8;">listen=1 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#允许bitcoin接收JSON-RPC</span></span>
<span class="line"><span style="color:#e1e4e8;">server=1  </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#RPC用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcuser=bindip</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#RPC密码</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcpassword=１２</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#RPC端口</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcport=8888</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#允许RPC访问ip</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcallowip=192.168.23.210　　＃代表允许访问钱包的ip地址及端口</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat /data/apps/omnicore-0.5.0/etc/bitcoin.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rpcuser=111</span></span>
<span class="line"><span style="color:#24292e;">rpcpassword=222</span></span>
<span class="line"><span style="color:#24292e;">rpcport=28832</span></span>
<span class="line"><span style="color:#24292e;">port=28833</span></span>
<span class="line"><span style="color:#24292e;">bindip=172.31.32.94</span></span>
<span class="line"><span style="color:#24292e;">rpcallowip=x.x.x.x</span></span>
<span class="line"><span style="color:#24292e;">datadir=/data/coin/usdt/</span></span>
<span class="line"><span style="color:#24292e;">daemon=1</span></span>
<span class="line"><span style="color:#24292e;">server=1</span></span>
<span class="line"><span style="color:#24292e;">#reindex=1</span></span>
<span class="line"><span style="color:#24292e;">#reindex-chainstate=1</span></span>
<span class="line"><span style="color:#24292e;">txindex=1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#解释：</span></span>
<span class="line"><span style="color:#24292e;"># 测试链填 1 主链填 0 </span></span>
<span class="line"><span style="color:#24292e;">testnet=1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#代表事务初始索引，查看所有交易</span></span>
<span class="line"><span style="color:#24292e;">txindex=1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#监听模式，默认启动</span></span>
<span class="line"><span style="color:#24292e;">listen=1 </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#允许bitcoin接收JSON-RPC</span></span>
<span class="line"><span style="color:#24292e;">server=1  </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#RPC用户名</span></span>
<span class="line"><span style="color:#24292e;">rpcuser=bindip</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#RPC密码</span></span>
<span class="line"><span style="color:#24292e;">rpcpassword=１２</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#RPC端口</span></span>
<span class="line"><span style="color:#24292e;">rpcport=8888</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#允许RPC访问ip</span></span>
<span class="line"><span style="color:#24292e;">rpcallowip=192.168.23.210　　＃代表允许访问钱包的ip地址及端口</span></span></code></pre></div><ul><li>正式配置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rpcuser=omn</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcpassword=MeVz4mcTbECaf8YkWKYxdhh</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcport=28832</span></span>
<span class="line"><span style="color:#e1e4e8;">port=28833</span></span>
<span class="line"><span style="color:#e1e4e8;">bindip=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcbind=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcallowip=0.0.0.0/0</span></span>
<span class="line"><span style="color:#e1e4e8;">datadir=/data/coin/usdt/</span></span>
<span class="line"><span style="color:#e1e4e8;">daemon=1</span></span>
<span class="line"><span style="color:#e1e4e8;">server=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#reindex=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#reindex-chainstate=1</span></span>
<span class="line"><span style="color:#e1e4e8;">txindex=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rpcuser=omn</span></span>
<span class="line"><span style="color:#24292e;">rpcpassword=MeVz4mcTbECaf8YkWKYxdhh</span></span>
<span class="line"><span style="color:#24292e;">rpcport=28832</span></span>
<span class="line"><span style="color:#24292e;">port=28833</span></span>
<span class="line"><span style="color:#24292e;">bindip=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">rpcbind=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">rpcallowip=0.0.0.0/0</span></span>
<span class="line"><span style="color:#24292e;">datadir=/data/coin/usdt/</span></span>
<span class="line"><span style="color:#24292e;">daemon=1</span></span>
<span class="line"><span style="color:#24292e;">server=1</span></span>
<span class="line"><span style="color:#24292e;">#reindex=1</span></span>
<span class="line"><span style="color:#24292e;">#reindex-chainstate=1</span></span>
<span class="line"><span style="color:#24292e;">txindex=1</span></span></code></pre></div><h1 id="_4-启动" tabindex="-1">4.启动 <a class="header-anchor" href="#_4-启动" aria-label="Permalink to &quot;4.启动&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">./bin/omnicored -conf=/data/apps/omnicore-0.5.0/etc/bitcoin.conf --datadir=/data/coin/usdt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#解释：</span></span>
<span class="line"><span style="color:#e1e4e8;">--datadir  指定路径，默认在/root/.bitcoin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">./bin/omnicored -conf=/data/apps/omnicore-0.5.0/etc/bitcoin.conf --datadir=/data/coin/usdt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#解释：</span></span>
<span class="line"><span style="color:#24292e;">--datadir  指定路径，默认在/root/.bitcoin</span></span></code></pre></div><ul><li>查看启动现象</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@ip-172-31-32-94:/data/coin/usdt# tail debug.log  </span></span>
<span class="line"><span style="color:#e1e4e8;">2019-11-12 10:05:32 UpdateTip: new best=00000000000000000006f8927734bdf657972f1f3167afe35929af86e4fdd855 height=603444 version=0x20800000 log2_work=91.325046 tx=473909927 date=&#39;2019-11-12 10:05:15&#39; progress=1.000000 cache=202.8MiB(160797tx) warning=&#39;61 of last 100 blocks have unexpected version&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@ip-172-31-32-94:/data/coin/usdt# tail debug.log  </span></span>
<span class="line"><span style="color:#24292e;">2019-11-12 10:05:32 UpdateTip: new best=00000000000000000006f8927734bdf657972f1f3167afe35929af86e4fdd855 height=603444 version=0x20800000 log2_work=91.325046 tx=473909927 date=&#39;2019-11-12 10:05:15&#39; progress=1.000000 cache=202.8MiB(160797tx) warning=&#39;61 of last 100 blocks have unexpected version&#39;</span></span></code></pre></div><h1 id="_5-关闭" tabindex="-1">5.关闭 <a class="header-anchor" href="#_5-关闭" aria-label="Permalink to &quot;5.关闭&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;stop&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;stop&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span></code></pre></div>`,15),o=[p];function t(c,i,r,d,y,u){return a(),n("div",null,o)}const g=s(l,[["render",t]]);export{b as __pageData,g as default};
