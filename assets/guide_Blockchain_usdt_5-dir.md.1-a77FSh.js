import{_ as s,o as e,c as n,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"Bitcion Core 目录说明","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/usdt/5-dir.md","filePath":"guide/Blockchain/usdt/5-dir.md","lastUpdated":1701401252000}'),p={name:"guide/Blockchain/usdt/5-dir.md"},l=a(`<h1 id="bitcion-core-目录说明" tabindex="-1">Bitcion Core 目录说明 <a class="header-anchor" href="#bitcion-core-目录说明" aria-label="Permalink to &quot;Bitcion Core 目录说明&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">./</span></span>
<span class="line"><span style="color:#e1e4e8;">../</span></span>
<span class="line"><span style="color:#e1e4e8;">.lock</span></span>
<span class="line"><span style="color:#e1e4e8;">.walletlock</span></span>
<span class="line"><span style="color:#e1e4e8;">MP_persist/</span></span>
<span class="line"><span style="color:#e1e4e8;">MP_spinfo/</span></span>
<span class="line"><span style="color:#e1e4e8;">MP_stolist/</span></span>
<span class="line"><span style="color:#e1e4e8;">MP_tradelist/</span></span>
<span class="line"><span style="color:#e1e4e8;">MP_txlist/</span></span>
<span class="line"><span style="color:#e1e4e8;">OMNI_feecache/</span></span>
<span class="line"><span style="color:#e1e4e8;">OMNI_feehistory/</span></span>
<span class="line"><span style="color:#e1e4e8;">Omni_TXDB/</span></span>
<span class="line"><span style="color:#e1e4e8;">banlist.dat</span></span>
<span class="line"><span style="color:#e1e4e8;">bitcoind.pid</span></span>
<span class="line"><span style="color:#e1e4e8;">blocks/</span></span>
<span class="line"><span style="color:#e1e4e8;">chainstate/</span></span>
<span class="line"><span style="color:#e1e4e8;">database/</span></span>
<span class="line"><span style="color:#e1e4e8;">db.log</span></span>
<span class="line"><span style="color:#e1e4e8;">debug.log</span></span>
<span class="line"><span style="color:#e1e4e8;">fee_estimates.dat</span></span>
<span class="line"><span style="color:#e1e4e8;">indexes/</span></span>
<span class="line"><span style="color:#e1e4e8;">mempool.dat</span></span>
<span class="line"><span style="color:#e1e4e8;">omnicore.log</span></span>
<span class="line"><span style="color:#e1e4e8;">peers.dat</span></span>
<span class="line"><span style="color:#e1e4e8;">wallet.dat</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">./</span></span>
<span class="line"><span style="color:#24292e;">../</span></span>
<span class="line"><span style="color:#24292e;">.lock</span></span>
<span class="line"><span style="color:#24292e;">.walletlock</span></span>
<span class="line"><span style="color:#24292e;">MP_persist/</span></span>
<span class="line"><span style="color:#24292e;">MP_spinfo/</span></span>
<span class="line"><span style="color:#24292e;">MP_stolist/</span></span>
<span class="line"><span style="color:#24292e;">MP_tradelist/</span></span>
<span class="line"><span style="color:#24292e;">MP_txlist/</span></span>
<span class="line"><span style="color:#24292e;">OMNI_feecache/</span></span>
<span class="line"><span style="color:#24292e;">OMNI_feehistory/</span></span>
<span class="line"><span style="color:#24292e;">Omni_TXDB/</span></span>
<span class="line"><span style="color:#24292e;">banlist.dat</span></span>
<span class="line"><span style="color:#24292e;">bitcoind.pid</span></span>
<span class="line"><span style="color:#24292e;">blocks/</span></span>
<span class="line"><span style="color:#24292e;">chainstate/</span></span>
<span class="line"><span style="color:#24292e;">database/</span></span>
<span class="line"><span style="color:#24292e;">db.log</span></span>
<span class="line"><span style="color:#24292e;">debug.log</span></span>
<span class="line"><span style="color:#24292e;">fee_estimates.dat</span></span>
<span class="line"><span style="color:#24292e;">indexes/</span></span>
<span class="line"><span style="color:#24292e;">mempool.dat</span></span>
<span class="line"><span style="color:#24292e;">omnicore.log</span></span>
<span class="line"><span style="color:#24292e;">peers.dat</span></span>
<span class="line"><span style="color:#24292e;">wallet.dat</span></span></code></pre></div><p><a href="https://github.com/bitcoin/bitcoin/blob/master/doc/files.md" target="_blank" rel="noreferrer">https://github.com/bitcoin/bitcoin/blob/master/doc/files.md</a></p><p>.lock</p><ul><li>比特币数据目录锁文件</li></ul><p>banlist.dat</p><ul><li>存储禁用节点的 IPs/子网</li></ul><p>blocks/blk000??.dat【v0.8.0 及之后的版本】; blkxxxx.dat【v0.8.0 之前的版本】</p><pre><code>区块数据（定制，每个文件 128MiB）；包含链接的原始区块。存储的是真正的比特币区块，以网络格式，转储到硬盘上。
</code></pre><p>blocks/rev000??.dat【v0.8.0 及之后的版本】</p><pre><code>区块回退数据（定制）。
</code></pre><p>blocks/index/*【v0.8.0 及之后的版本】; blkindex.dat【v0.8.0 之前的版本】</p><pre><code>区块索引（LevelDB）；与 blkxxxx.dat 一起使用的索引信息。
</code></pre><p>chainstate/*【v0.8.0 及之后的版本】</p><pre><code>区块链状态数据库（LevelDB）。
</code></pre><p>database/*【v0.8.0 及之后的版本】;【v0.16.0 及之后的版本】</p><pre><code>BDB（Berkeley DB）数据库环境，仅用于钱包；移动到 wallets/ 目录下。
</code></pre><p>db.log【v0.16.0 及之后的版本】</p><pre><code>钱包数据库日志文件，移动到 wallets/ 目录下。
</code></pre><p>debug.log</p><pre><code>比特币详细的日志文件，包含通过 bitcoind 或 bitcoin-qt 生成的调试信息和日志信息。不时自动修剪。
</code></pre><p>fee_estimates.dat【v0.10.0 及之后的版本】</p><pre><code>存储用于确认所必需的估算的最小交易费和优先级的统计数据。在程序关闭之前保存，并在启动时读入。
</code></pre><p>indexes/txindex/*【v0.17.0 及之后的版本】</p><pre><code>可选的交易索引数据库（LevelDB）。
</code></pre><p>mempool.dat【v0.14.0 及之后的版本】</p><pre><code>内存池交易的导出数据。
</code></pre><p>peers.dat【v0.7.0 及之后的版本】; addr.dat【v0.7.0 之前的版本】</p><pre><code>对端 IP 地址数据库（特定的格式）。存储对端信息以便更容易重连。该文件使用比特币指定的文件格式，与任何数据库系统不相关；存储 ip 地址以便更容易重新连接。
</code></pre><p>wallets/wallet.dat【v0.16.0 及之后的版本】; wallet.dat</p><pre><code>包含密钥和交易的个人钱包（BDB）；存储密钥，交易，元数据和选项。请务必备份该文件。它包含花费你的比特币所必须的密钥。
</code></pre><p>wallets/database/*【v0.16.0 及之后的版本】</p><pre><code>BDB 数据库环境。
</code></pre><p>wallets/db.log【v0.16.0 及之后的版本】</p><pre><code>钱包数据库日志文件。
</code></pre><p>onion_private_key【v0.12.0 及之后的版本】</p><pre><code>使用 -listenonion 选项缓存的洋葱路由隐藏服务私钥。
</code></pre><p>guisettings.ini.bak</p><pre><code>使用 -resetguisettings 选项后之前的 GUI 设置的备份
</code></pre><p>个人身份识别数据【v0.8 及以上版本】</p><p>如果你希望向朋友发送区块链，避免它们大量下载，这部分可能对你有用。</p><pre><code>    wallet.dat
        包含链接到它们的地址和交易。请务必备份此文件。它包含花费比特币所需的密钥。你不应将此文件传输给任何第三方，否则它们可能会光顾你的比特币。
    db.log
        可能包含与你的钱包有关的信息。它可以安全删除。
    debug.log
        可能包含 IP 地址和交易 ID。它可以安全删除。
    database/folder
        这应该仅存于 bitcoin-qt 运行时。它包含你的钱包相关的信息（BDB 状态）。
    peers.dat
        不知道是否包含个人身份识别数据。它可以安全删除
</code></pre>`,42),o=[l];function c(t,i,r,d,y,b){return e(),n("div",null,o)}const h=s(p,[["render",c]]);export{g as __pageData,h as default};
