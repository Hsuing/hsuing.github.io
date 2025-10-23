import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"1.下载","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/btc/1-install.md","filePath":"guide/Blockchain/btc/1-install.md","lastUpdated":1701401252000}'),l={name:"guide/Blockchain/btc/1-install.md"},o=e(`<h1 id="_1-下载" tabindex="-1">1.下载 <a class="header-anchor" href="#_1-下载" aria-label="Permalink to &quot;1.下载&quot;">​</a></h1><p><a href="https://bitcoin.org/en/download" target="_blank" rel="noreferrer">https://bitcoin.org/en/download</a></p><p>下载包是二进制，直接启动</p><h2 id="_2-启动" tabindex="-1">2.启动 <a class="header-anchor" href="#_2-启动" aria-label="Permalink to &quot;2.启动&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@ip-172-31-2-5 bitcoin-0.21.0]# cat etc/bitcoin.conf </span></span>
<span class="line"><span style="color:#e1e4e8;">rpcuser=xxx</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcpassword=xxxxx</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcport=28832</span></span>
<span class="line"><span style="color:#e1e4e8;">port=28833</span></span>
<span class="line"><span style="color:#e1e4e8;">bindip=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcbind=0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">rpcallowip=0.0.0.0/0</span></span>
<span class="line"><span style="color:#e1e4e8;">datadir=/data/coin/usdt/</span></span>
<span class="line"><span style="color:#e1e4e8;">daemon=1</span></span>
<span class="line"><span style="color:#e1e4e8;">server=1</span></span>
<span class="line"><span style="color:#e1e4e8;">#reindex=1</span></span>
<span class="line"><span style="color:#e1e4e8;">##reindex-chainstate=1</span></span>
<span class="line"><span style="color:#e1e4e8;">txindex=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@ip-172-31-2-5 bitcoin-0.21.0]# cat etc/bitcoin.conf </span></span>
<span class="line"><span style="color:#24292e;">rpcuser=xxx</span></span>
<span class="line"><span style="color:#24292e;">rpcpassword=xxxxx</span></span>
<span class="line"><span style="color:#24292e;">rpcport=28832</span></span>
<span class="line"><span style="color:#24292e;">port=28833</span></span>
<span class="line"><span style="color:#24292e;">bindip=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">rpcbind=0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">rpcallowip=0.0.0.0/0</span></span>
<span class="line"><span style="color:#24292e;">datadir=/data/coin/usdt/</span></span>
<span class="line"><span style="color:#24292e;">daemon=1</span></span>
<span class="line"><span style="color:#24292e;">server=1</span></span>
<span class="line"><span style="color:#24292e;">#reindex=1</span></span>
<span class="line"><span style="color:#24292e;">##reindex-chainstate=1</span></span>
<span class="line"><span style="color:#24292e;">txindex=1</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">nohup /data/apps/bitcoin-0.21.0/bin/bitcoind -conf=/data/apps/bitcoin-0.21.0/etc/bitcoin.conf &amp;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">nohup /data/apps/bitcoin-0.21.0/bin/bitcoind -conf=/data/apps/bitcoin-0.21.0/etc/bitcoin.conf &amp;</span></span></code></pre></div><h2 id="_3-查看高度" tabindex="-1">3.查看高度 <a class="header-anchor" href="#_3-查看高度" aria-label="Permalink to &quot;3.查看高度&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#进入到/data/coin/btc/目录下查看debug.log</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@btc btc]# tail debug.log </span></span>
<span class="line"><span style="color:#e1e4e8;">2021-04-13T10:05:42Z UpdateTip: new best=000000000000000020ffabffb615b2fdbdc3dc54c6327c07886ca69f90368ae5 height=312390 version=0x00000002 log2_work=79.883474 tx=43201641 date=&#39;2014-07-25T07:41:39Z&#39; progress=0.068324 cache=363.6MiB(2490823txo)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#进入到/data/coin/btc/目录下查看debug.log</span></span>
<span class="line"><span style="color:#24292e;">[root@btc btc]# tail debug.log </span></span>
<span class="line"><span style="color:#24292e;">2021-04-13T10:05:42Z UpdateTip: new best=000000000000000020ffabffb615b2fdbdc3dc54c6327c07886ca69f90368ae5 height=312390 version=0x00000002 log2_work=79.883474 tx=43201641 date=&#39;2014-07-25T07:41:39Z&#39; progress=0.068324 cache=363.6MiB(2490823txo)</span></span></code></pre></div><h1 id="_2-bitcoincore安装" tabindex="-1">2.bitcoincore安装 <a class="header-anchor" href="#_2-bitcoincore安装" aria-label="Permalink to &quot;2.bitcoincore安装&quot;">​</a></h1><p>官方下载地址：<a href="https://bitcoincore.org/en/download/" target="_blank" rel="noreferrer">https://bitcoincore.org/en/download/</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">wget https://bitcoincore.org/bin/bitcoin-core-0.20.1/bitcoin-0.20.1-x86_64-linux-gnu.tar.gz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">wget https://bitcoincore.org/bin/bitcoin-core-0.20.1/bitcoin-0.20.1-x86_64-linux-gnu.tar.gz</span></span></code></pre></div><h2 id="_2-1查用命令" tabindex="-1">2.1查用命令 <a class="header-anchor" href="#_2-1查用命令" aria-label="Permalink to &quot;2.1查用命令&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看网络状态：</span></span>
<span class="line"><span style="color:#e1e4e8;">bitcoin-cli getnetworkinfo</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看网络节点：</span></span>
<span class="line"><span style="color:#e1e4e8;">bitcoin-cli getpeerinfo</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看区块链信息：如同步进度、</span></span>
<span class="line"><span style="color:#e1e4e8;">bitcoin-cli getblockchaininfo</span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看所有命令</span></span>
<span class="line"><span style="color:#e1e4e8;">bitcoin-cli help</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看高度</span></span>
<span class="line"><span style="color:#e1e4e8;">./bin/bitcoin-cli -rpcuser=omn -rpcpassword=MeVz4mcTYZgvY4fT3bECaf8YkWKYxdhh -rpcconnect=127.0.0.1 -rpcport=28832 getblockcount</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">curl --user username:password --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: []}&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:8332/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看网络状态：</span></span>
<span class="line"><span style="color:#24292e;">bitcoin-cli getnetworkinfo</span></span>
<span class="line"><span style="color:#24292e;"># 查看网络节点：</span></span>
<span class="line"><span style="color:#24292e;">bitcoin-cli getpeerinfo</span></span>
<span class="line"><span style="color:#24292e;"># 查看区块链信息：如同步进度、</span></span>
<span class="line"><span style="color:#24292e;">bitcoin-cli getblockchaininfo</span></span>
<span class="line"><span style="color:#24292e;"># 查看所有命令</span></span>
<span class="line"><span style="color:#24292e;">bitcoin-cli help</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看高度</span></span>
<span class="line"><span style="color:#24292e;">./bin/bitcoin-cli -rpcuser=omn -rpcpassword=MeVz4mcTYZgvY4fT3bECaf8YkWKYxdhh -rpcconnect=127.0.0.1 -rpcport=28832 getblockcount</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">curl --user username:password --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: []}&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:8332/</span></span></code></pre></div><h2 id="_2-2其他工具" tabindex="-1">2.2其他工具 <a class="header-anchor" href="#_2-2其他工具" aria-label="Permalink to &quot;2.2其他工具&quot;">​</a></h2><p><a href="https://www.blockchain.com/en/explorer" target="_blank" rel="noreferrer">https://www.blockchain.com/en/explorer</a></p><ul><li><a href="https://bitnodes.earn.com/" target="_blank" rel="noreferrer">比特币全球节点分布</a></li><li><a href="https://www.blockchain.com/en/explorer" target="_blank" rel="noreferrer">比特币浏览器</a></li><li><a href="http://chainquery.com/bitcoin-api" target="_blank" rel="noreferrer">比特币在线RPC接口</a></li><li><a href="https://mistydew.github.io/archive.html" target="_blank" rel="noreferrer">比特币RPC接口解析</a></li><li><a href="https://bitcoinfees.earn.com/" target="_blank" rel="noreferrer">比特币交易费查询</a></li><li><a href="https://jlopp.github.io/bitcoin-core-config-generator/" target="_blank" rel="noreferrer">比特币配置工具</a></li><li><a href="http://book.8btc.com/books/6/masterbitcoin2cn/_book/" target="_blank" rel="noreferrer">推荐书：精通比特币</a></li></ul>`,16),p=[o];function t(c,i,r,d,b,h){return a(),n("div",null,p)}const y=s(l,[["render",t]]);export{g as __pageData,y as default};
