import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const y=JSON.parse('{"title":"1.环境","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/0-bian_usdt.md","filePath":"guide/Blockchain/0-bian_usdt.md","lastUpdated":1701401252000}'),o={name:"guide/Blockchain/0-bian_usdt.md"},l=e(`<h1 id="_1-环境" tabindex="-1">1.环境 <a class="header-anchor" href="#_1-环境" aria-label="Permalink to &quot;1.环境&quot;">​</a></h1><h2 id="_1-实例配置" tabindex="-1">1.实例配置 <a class="header-anchor" href="#_1-实例配置" aria-label="Permalink to &quot;1.实例配置&quot;">​</a></h2><p><a href="https://aws.amazon.com/cn/ec2/dedicated-hosts/pricing/" target="_blank" rel="noreferrer">https://aws.amazon.com/cn/ec2/dedicated-hosts/pricing/</a></p><p><a href="https://www.instance-pricing.com/provider=aws-ec2/instance=m5zn.3xlarge/" target="_blank" rel="noreferrer">https://www.instance-pricing.com/provider=aws-ec2/instance=m5zn.3xlarge/</a></p><h2 id="_2-查看高度" tabindex="-1">2.查看高度 <a class="header-anchor" href="#_2-查看高度" aria-label="Permalink to &quot;2.查看高度&quot;">​</a></h2><p><a href="https://explorer.bnbchain.org/" target="_blank" rel="noreferrer">https://explorer.bnbchain.org/</a></p><p><a href="https://bscscan.com/" target="_blank" rel="noreferrer">https://bscscan.com/</a></p><h2 id="_3-支持平台" tabindex="-1">3.支持平台 <a class="header-anchor" href="#_3-支持平台" aria-label="Permalink to &quot;3.支持平台&quot;">​</a></h2><p>We support running a full node on <code>Mac OS X</code>, <code>Windows</code> and <code>Linux</code></p><h2 id="_4-最小配置" tabindex="-1">4.最小配置 <a class="header-anchor" href="#_4-最小配置" aria-label="Permalink to &quot;4.最小配置&quot;">​</a></h2><p>The hardware must meet certain requirements to run a full node.</p><ul><li>Desktop or laptop hardware running recent versions of Mac OS X, Windows, or Linux.</li><li>500 GB of free disk space, accessible at a minimum read/write speed of 100 MB/s.</li><li>4 cores of CPU and 8 gigabytes of memory (RAM).</li><li>A broadband Internet connection with upload/download speeds of at least 1 megabyte per second</li><li>Your full node has to run at least 4 hours per 24 hours in order to catch up with Beacon Chain More hours will be better, run your node continuously for best results.</li></ul><h1 id="_2-bsc" tabindex="-1">2.BSC <a class="header-anchor" href="#_2-bsc" aria-label="Permalink to &quot;2.BSC&quot;">​</a></h1><h2 id="_1-简介" tabindex="-1">1.简介 <a class="header-anchor" href="#_1-简介" aria-label="Permalink to &quot;1.简介&quot;">​</a></h2><p><a href="https://codeleading.com/article/55056220697/" target="_blank" rel="noreferrer">https://codeleading.com/article/55056220697/</a></p><p>文档：</p><p><a href="https://docs.bnbchain.org/docs/learn/intro" target="_blank" rel="noreferrer">https://docs.bnbchain.org/docs/learn/intro</a></p><h2 id="_2-搭建" tabindex="-1">2.搭建 <a class="header-anchor" href="#_2-搭建" aria-label="Permalink to &quot;2.搭建&quot;">​</a></h2><h3 id="fullnode" tabindex="-1">FullNode <a class="header-anchor" href="#fullnode" aria-label="Permalink to &quot;FullNode&quot;">​</a></h3><p><a href="https://docs.bnbchain.org/docs/beaconchain/fullnode/" target="_blank" rel="noreferrer">https://docs.bnbchain.org/docs/beaconchain/fullnode/</a></p><h1 id="_3-api" tabindex="-1">3.API <a class="header-anchor" href="#_3-api" aria-label="Permalink to &quot;3.API&quot;">​</a></h1><h2 id="_1-查看同步高度" tabindex="-1">1.查看同步高度 <a class="header-anchor" href="#_1-查看同步高度" aria-label="Permalink to &quot;1.查看同步高度&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl localhost:27147/status</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;jsonrpc&quot;: &quot;2.0&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;id&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">  &quot;result&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;node_info&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;protocol_version&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;p2p&quot;: &quot;7&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;block&quot;: &quot;10&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;app&quot;: &quot;0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      },</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;id&quot;: &quot;7156d461742e2a1e569fd68426009c4194830c93&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;listen_addr&quot;: &quot;aa841c226243a11e9a951063f6065739-eee556e439dc6a3b.elb.ap-northeast-1.amazonaws.com:27146&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;network&quot;: &quot;Binance-Chain-Ganges&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;version&quot;: &quot;0.30.1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;channels&quot;: &quot;354020212223303800&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;moniker&quot;: &quot;data-seed-2&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;other&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;tx_index&quot;: &quot;on&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;rpc_address&quot;: &quot;tcp://0.0.0.0:27147&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;sync_info&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;latest_block_hash&quot;: &quot;724AD02BE3216B7DD28B60F526C79E43D41C5E0AD6554C3390CA905A736593AE&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;latest_app_hash&quot;: &quot;1A2F316DB23C06FD897B680823145183A2DF9C64D05C0038F37B066567130F70&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;latest_block_height&quot;: &quot;7806468&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;latest_block_time&quot;: &quot;2019-04-12T11:21:50.410854479Z&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;catching_up&quot;: false</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;validator_info&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;address&quot;: &quot;32B88CEB9CE3EF1EABB840EC1556A5B4A5FD7FDB&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;pub_key&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;type&quot;: &quot;tendermint/PubKeyEd25519&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;value&quot;: &quot;jAXPwM0xV1iwn7XJz6H0Zk8RxgELUAfjStxzIYKxaEk=&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      },</span></span>
<span class="line"><span style="color:#e1e4e8;">      &quot;voting_power&quot;: &quot;0&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl localhost:27147/status</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">  &quot;jsonrpc&quot;: &quot;2.0&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;id&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">  &quot;result&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">    &quot;node_info&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;protocol_version&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;p2p&quot;: &quot;7&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;block&quot;: &quot;10&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;app&quot;: &quot;0&quot;</span></span>
<span class="line"><span style="color:#24292e;">      },</span></span>
<span class="line"><span style="color:#24292e;">      &quot;id&quot;: &quot;7156d461742e2a1e569fd68426009c4194830c93&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;listen_addr&quot;: &quot;aa841c226243a11e9a951063f6065739-eee556e439dc6a3b.elb.ap-northeast-1.amazonaws.com:27146&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;network&quot;: &quot;Binance-Chain-Ganges&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;version&quot;: &quot;0.30.1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;channels&quot;: &quot;354020212223303800&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;moniker&quot;: &quot;data-seed-2&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;other&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;tx_index&quot;: &quot;on&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;rpc_address&quot;: &quot;tcp://0.0.0.0:27147&quot;</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;sync_info&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;latest_block_hash&quot;: &quot;724AD02BE3216B7DD28B60F526C79E43D41C5E0AD6554C3390CA905A736593AE&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;latest_app_hash&quot;: &quot;1A2F316DB23C06FD897B680823145183A2DF9C64D05C0038F37B066567130F70&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;latest_block_height&quot;: &quot;7806468&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;latest_block_time&quot;: &quot;2019-04-12T11:21:50.410854479Z&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;catching_up&quot;: false</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;validator_info&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">      &quot;address&quot;: &quot;32B88CEB9CE3EF1EABB840EC1556A5B4A5FD7FDB&quot;,</span></span>
<span class="line"><span style="color:#24292e;">      &quot;pub_key&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;type&quot;: &quot;tendermint/PubKeyEd25519&quot;,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;value&quot;: &quot;jAXPwM0xV1iwn7XJz6H0Zk8RxgELUAfjStxzIYKxaEk=&quot;</span></span>
<span class="line"><span style="color:#24292e;">      },</span></span>
<span class="line"><span style="color:#24292e;">      &quot;voting_power&quot;: &quot;0&quot;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="rpc" tabindex="-1">RPC <a class="header-anchor" href="#rpc" aria-label="Permalink to &quot;RPC&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl &#39;localhost:27147&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/abci_info</span></span>
<span class="line"><span style="color:#e1e4e8;">/consensus_state</span></span>
<span class="line"><span style="color:#e1e4e8;">/dump_consensus_state</span></span>
<span class="line"><span style="color:#e1e4e8;">/genesis</span></span>
<span class="line"><span style="color:#e1e4e8;">/health</span></span>
<span class="line"><span style="color:#e1e4e8;">/net_info</span></span>
<span class="line"><span style="color:#e1e4e8;">/num_unconfirmed_txs</span></span>
<span class="line"><span style="color:#e1e4e8;">/status</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl &#39;localhost:27147&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/abci_info</span></span>
<span class="line"><span style="color:#24292e;">/consensus_state</span></span>
<span class="line"><span style="color:#24292e;">/dump_consensus_state</span></span>
<span class="line"><span style="color:#24292e;">/genesis</span></span>
<span class="line"><span style="color:#24292e;">/health</span></span>
<span class="line"><span style="color:#24292e;">/net_info</span></span>
<span class="line"><span style="color:#24292e;">/num_unconfirmed_txs</span></span>
<span class="line"><span style="color:#24292e;">/status</span></span></code></pre></div><h2 id="websockets" tabindex="-1">websockets <a class="header-anchor" href="#websockets" aria-label="Permalink to &quot;websockets&quot;">​</a></h2>`,26),t=[l];function p(c,r,i,u,q,d){return a(),n("div",null,t)}const _=s(o,[["render",p]]);export{y as __pageData,_ as default};
