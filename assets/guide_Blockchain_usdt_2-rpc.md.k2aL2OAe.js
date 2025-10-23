import{_ as s,o as n,c as t,R as a}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"一、rpcapi","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/usdt/2-rpc.md","filePath":"guide/Blockchain/usdt/2-rpc.md","lastUpdated":1701401252000}'),e={name:"guide/Blockchain/usdt/2-rpc.md"},l=a(`<p>查看文档：<a href="https://en.bitcoin.it/wiki/API_reference_(JSON-RPC)#Command_line_.28cURL.29" target="_blank" rel="noreferrer">https://en.bitcoin.it/wiki/API_reference_(JSON-RPC)#Command_line_.28cURL.29</a></p><p>method：<a href="https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list" target="_blank" rel="noreferrer">https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list</a></p><h1 id="一、rpcapi" tabindex="-1">一、rpcapi <a class="header-anchor" href="#一、rpcapi" aria-label="Permalink to &quot;一、rpcapi&quot;">​</a></h1><h2 id="_1-查看高度" tabindex="-1">1.查看高度 <a class="header-anchor" href="#_1-查看高度" aria-label="Permalink to &quot;1.查看高度&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@/data/apps/omnicore-0.5.0# curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter host password for user &#39;omn&#39;:</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;result&quot;:603447,&quot;error&quot;:null,&quot;id&quot;:&quot;curltest&quot;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#不输入密码形式</span></span>
<span class="line"><span style="color:#e1e4e8;">root@usdtback-13:/data/apps/omnicore-0.11.0#curl --user omn:password --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@/data/apps/omnicore-0.5.0# curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span>
<span class="line"><span style="color:#24292e;">Enter host password for user &#39;omn&#39;:</span></span>
<span class="line"><span style="color:#24292e;">{&quot;result&quot;:603447,&quot;error&quot;:null,&quot;id&quot;:&quot;curltest&quot;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#不输入密码形式</span></span>
<span class="line"><span style="color:#24292e;">root@usdtback-13:/data/apps/omnicore-0.11.0#curl --user omn:password --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span></code></pre></div><h2 id="_2-查看usdt链信息" tabindex="-1">2.查看usdt链信息 <a class="header-anchor" href="#_2-查看usdt链信息" aria-label="Permalink to &quot;2.查看usdt链信息&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getinfo&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getinfo&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span></code></pre></div><h2 id="_3-查看当前区块的高度" tabindex="-1">3.查看当前区块的高度 <a class="header-anchor" href="#_3-查看当前区块的高度" aria-label="Permalink to &quot;3.查看当前区块的高度&quot;">​</a></h2><ul><li>如果没有同步完块，执行curl 命令很慢</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@data/apps/omnicore-0.5.0# curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span>
<span class="line"><span style="color:#e1e4e8;">Enter host password for user &#39;omn&#39;:</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;result&quot;:603447,&quot;error&quot;:null,&quot;id&quot;:&quot;curltest&quot;}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@data/apps/omnicore-0.5.0# curl --user omn --data-binary &#39;{&quot;jsonrpc&quot;: &quot;1.0&quot;, &quot;id&quot;:&quot;curltest&quot;, &quot;method&quot;: &quot;getblockcount&quot;, &quot;params&quot;: [] }&#39; -H &#39;content-type: text/plain;&#39; http://127.0.0.1:28832</span></span>
<span class="line"><span style="color:#24292e;">Enter host password for user &#39;omn&#39;:</span></span>
<span class="line"><span style="color:#24292e;">{&quot;result&quot;:603447,&quot;error&quot;:null,&quot;id&quot;:&quot;curltest&quot;}</span></span></code></pre></div><h2 id="_4-命令" tabindex="-1">4.命令 <a class="header-anchor" href="#_4-命令" aria-label="Permalink to &quot;4.命令&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//bitcoind 命令通用格式</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  bitcoind [选项]</span></span>
<span class="line"><span style="color:#e1e4e8;">  bitcoind [选项] &lt;命令&gt; [参数]  将命令发送到 -server 或 bitcoind</span></span>
<span class="line"><span style="color:#e1e4e8;">  bitcoind [选项] help           列出命令</span></span>
<span class="line"><span style="color:#e1e4e8;">  bitcoind [选项] help &lt;命令&gt;    获取该命令的帮助</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> //bitcoind常见命令</span></span>
<span class="line"><span style="color:#e1e4e8;">  -conf=&lt;文件名&gt;     指定配置文件（默认：bitcoin.conf）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -pid=&lt;文件名&gt;      指定 pid （进程 ID）文件（默认：bitcoind.pid）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -gen               生成比特币</span></span>
<span class="line"><span style="color:#e1e4e8;">  -gen=0             不生成比特币</span></span>
<span class="line"><span style="color:#e1e4e8;">  -min               启动时最小化</span></span>
<span class="line"><span style="color:#e1e4e8;">  -splash            启动时显示启动屏幕（默认：1）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -datadir=&lt;目录名&gt;  指定数据目录</span></span>
<span class="line"><span style="color:#e1e4e8;">  -dbcache=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       设置数据库缓存大小，单位为兆字节（MB）（默认：25）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -dblogsize=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;     设置数据库磁盘日志大小，单位为兆字节（MB）（默认：100）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -timeout=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       设置连接超时，单位为毫秒&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -proxy=&lt;ip:端口 style=&quot;word-wrap: break-word;&quot;&gt;   通过 Socks4 代理链接&lt;/ip:端口&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -dns               addnode 允许查询 DNS 并连接</span></span>
<span class="line"><span style="color:#e1e4e8;">  -port=&lt;端口&gt;       监听 &lt;端口&gt; 上的连接（默认：8333，测试网络 testnet：18333）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -maxconnections=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;  最多维护 &lt;n style=&quot;word-wrap: break-word;&quot;&gt;个节点连接（默认：125）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -addnode=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;      添加一个节点以供连接，并尝试保持与该节点的连接&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -connect=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;      仅连接到这里指定的节点&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -irc               使用 IRC（因特网中继聊天）查找节点（默认：0）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -listen            接受来自外部的连接（默认：1）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -dnsseed           使用 DNS 查找节点（默认：1）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -banscore=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;      与行为异常节点断开连接的临界值（默认：100）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -bantime=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       重新允许行为异常节点连接所间隔的秒数（默认：86400）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -maxreceivebuffer=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;  最大每连接接收缓存，&lt;n style=&quot;word-wrap: break-word;&quot;&gt;*1000 字节（默认：10000）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -maxsendbuffer=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;  最大每连接发送缓存，&lt;n style=&quot;word-wrap: break-word;&quot;&gt;*1000 字节（默认：10000）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -upnp              使用全局即插即用（UPNP）映射监听端口（默认：0）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -detachdb          分离货币块和地址数据库。会增加客户端关闭时间（默认：0）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -paytxfee=&lt;amt style=&quot;word-wrap: break-word;&quot;&gt;    您发送的交易每 KB 字节的手续费&lt;/amt&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -testnet           使用测试网络</span></span>
<span class="line"><span style="color:#e1e4e8;">  -debug             输出额外的调试信息</span></span>
<span class="line"><span style="color:#e1e4e8;">  -logtimestamps     调试信息前添加[时间戳](http://8btc.com/article-165-1.html)</span></span>
<span class="line"><span style="color:#e1e4e8;">  -printtoconsole    发送跟踪/调试信息到控制台而不是 debug.log 文件</span></span>
<span class="line"><span style="color:#e1e4e8;">  -printtodebugger   发送跟踪/调试信息到调试器</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcuser=&lt;用户名&gt;  JSON-RPC 连接使用的用户名</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcpassword=&lt;密码&gt;  JSON-RPC 连接使用的密码</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcport=&lt;port style=&quot;word-wrap: break-word;&quot;&gt;    JSON-RPC 连接所监听的 &lt;端口&gt;（默认：8332）&lt;/port&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcallowip=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;   允许来自指定 &lt;ip style=&quot;word-wrap: break-word;&quot;&gt;地址的 JSON-RPC 连接&lt;/ip&gt;&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcconnect=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;   发送命令到运行在 &lt;ip style=&quot;word-wrap: break-word;&quot;&gt;地址的节点（默认：127.0.0.1）&lt;/ip&gt;&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -blocknotify=&lt;命令&gt; 当最好的货币块改变时执行命令（命令中的 %s 会被替换为货币块哈希值）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -upgradewallet     将钱包升级到最新的格式</span></span>
<span class="line"><span style="color:#e1e4e8;">  -keypool=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       将密匙池的尺寸设置为 &lt;n style=&quot;word-wrap: break-word;&quot;&gt;（默认：100）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rescan            重新扫描货币块链以查找钱包丢失的交易</span></span>
<span class="line"><span style="color:#e1e4e8;">  -checkblocks=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;   启动时检查多少货币块（默认：2500，0 表示全部）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  -checklevel=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;    货币块验证的级别（0-6，默认：1）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">**SSL 选项：**</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcssl                                  使用 OpenSSL（https）JSON-RPC 连接</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcsslcertificatechainfile=&lt;文件.cert&gt;  服务器证书文件（默认：server.cert）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcsslprivatekeyfile=&lt;文件.pem&gt;         服务器私匙文件（默认：server.pem）</span></span>
<span class="line"><span style="color:#e1e4e8;">  -rpcsslciphers=&lt;密码&gt;                    可接受的密码（默认：TLSv1+HIGH:!SSLv2:!aNULL:!eNULL:!AH:!3DES:@STRENGTH）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//bitcoind 命令通用格式</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  bitcoind [选项]</span></span>
<span class="line"><span style="color:#24292e;">  bitcoind [选项] &lt;命令&gt; [参数]  将命令发送到 -server 或 bitcoind</span></span>
<span class="line"><span style="color:#24292e;">  bitcoind [选项] help           列出命令</span></span>
<span class="line"><span style="color:#24292e;">  bitcoind [选项] help &lt;命令&gt;    获取该命令的帮助</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> //bitcoind常见命令</span></span>
<span class="line"><span style="color:#24292e;">  -conf=&lt;文件名&gt;     指定配置文件（默认：bitcoin.conf）</span></span>
<span class="line"><span style="color:#24292e;">  -pid=&lt;文件名&gt;      指定 pid （进程 ID）文件（默认：bitcoind.pid）</span></span>
<span class="line"><span style="color:#24292e;">  -gen               生成比特币</span></span>
<span class="line"><span style="color:#24292e;">  -gen=0             不生成比特币</span></span>
<span class="line"><span style="color:#24292e;">  -min               启动时最小化</span></span>
<span class="line"><span style="color:#24292e;">  -splash            启动时显示启动屏幕（默认：1）</span></span>
<span class="line"><span style="color:#24292e;">  -datadir=&lt;目录名&gt;  指定数据目录</span></span>
<span class="line"><span style="color:#24292e;">  -dbcache=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       设置数据库缓存大小，单位为兆字节（MB）（默认：25）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -dblogsize=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;     设置数据库磁盘日志大小，单位为兆字节（MB）（默认：100）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -timeout=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       设置连接超时，单位为毫秒&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -proxy=&lt;ip:端口 style=&quot;word-wrap: break-word;&quot;&gt;   通过 Socks4 代理链接&lt;/ip:端口&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -dns               addnode 允许查询 DNS 并连接</span></span>
<span class="line"><span style="color:#24292e;">  -port=&lt;端口&gt;       监听 &lt;端口&gt; 上的连接（默认：8333，测试网络 testnet：18333）</span></span>
<span class="line"><span style="color:#24292e;">  -maxconnections=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;  最多维护 &lt;n style=&quot;word-wrap: break-word;&quot;&gt;个节点连接（默认：125）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -addnode=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;      添加一个节点以供连接，并尝试保持与该节点的连接&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -connect=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;      仅连接到这里指定的节点&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -irc               使用 IRC（因特网中继聊天）查找节点（默认：0）</span></span>
<span class="line"><span style="color:#24292e;">  -listen            接受来自外部的连接（默认：1）</span></span>
<span class="line"><span style="color:#24292e;">  -dnsseed           使用 DNS 查找节点（默认：1）</span></span>
<span class="line"><span style="color:#24292e;">  -banscore=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;      与行为异常节点断开连接的临界值（默认：100）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -bantime=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       重新允许行为异常节点连接所间隔的秒数（默认：86400）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -maxreceivebuffer=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;  最大每连接接收缓存，&lt;n style=&quot;word-wrap: break-word;&quot;&gt;*1000 字节（默认：10000）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -maxsendbuffer=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;  最大每连接发送缓存，&lt;n style=&quot;word-wrap: break-word;&quot;&gt;*1000 字节（默认：10000）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -upnp              使用全局即插即用（UPNP）映射监听端口（默认：0）</span></span>
<span class="line"><span style="color:#24292e;">  -detachdb          分离货币块和地址数据库。会增加客户端关闭时间（默认：0）</span></span>
<span class="line"><span style="color:#24292e;">  -paytxfee=&lt;amt style=&quot;word-wrap: break-word;&quot;&gt;    您发送的交易每 KB 字节的手续费&lt;/amt&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -testnet           使用测试网络</span></span>
<span class="line"><span style="color:#24292e;">  -debug             输出额外的调试信息</span></span>
<span class="line"><span style="color:#24292e;">  -logtimestamps     调试信息前添加[时间戳](http://8btc.com/article-165-1.html)</span></span>
<span class="line"><span style="color:#24292e;">  -printtoconsole    发送跟踪/调试信息到控制台而不是 debug.log 文件</span></span>
<span class="line"><span style="color:#24292e;">  -printtodebugger   发送跟踪/调试信息到调试器</span></span>
<span class="line"><span style="color:#24292e;">  -rpcuser=&lt;用户名&gt;  JSON-RPC 连接使用的用户名</span></span>
<span class="line"><span style="color:#24292e;">  -rpcpassword=&lt;密码&gt;  JSON-RPC 连接使用的密码</span></span>
<span class="line"><span style="color:#24292e;">  -rpcport=&lt;port style=&quot;word-wrap: break-word;&quot;&gt;    JSON-RPC 连接所监听的 &lt;端口&gt;（默认：8332）&lt;/port&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -rpcallowip=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;   允许来自指定 &lt;ip style=&quot;word-wrap: break-word;&quot;&gt;地址的 JSON-RPC 连接&lt;/ip&gt;&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -rpcconnect=&lt;ip style=&quot;word-wrap: break-word;&quot;&gt;   发送命令到运行在 &lt;ip style=&quot;word-wrap: break-word;&quot;&gt;地址的节点（默认：127.0.0.1）&lt;/ip&gt;&lt;/ip&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -blocknotify=&lt;命令&gt; 当最好的货币块改变时执行命令（命令中的 %s 会被替换为货币块哈希值）</span></span>
<span class="line"><span style="color:#24292e;">  -upgradewallet     将钱包升级到最新的格式</span></span>
<span class="line"><span style="color:#24292e;">  -keypool=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;       将密匙池的尺寸设置为 &lt;n style=&quot;word-wrap: break-word;&quot;&gt;（默认：100）&lt;/n&gt;&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -rescan            重新扫描货币块链以查找钱包丢失的交易</span></span>
<span class="line"><span style="color:#24292e;">  -checkblocks=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;   启动时检查多少货币块（默认：2500，0 表示全部）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;">  -checklevel=&lt;n style=&quot;word-wrap: break-word;&quot;&gt;    货币块验证的级别（0-6，默认：1）&lt;/n&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">**SSL 选项：**</span></span>
<span class="line"><span style="color:#24292e;">  -rpcssl                                  使用 OpenSSL（https）JSON-RPC 连接</span></span>
<span class="line"><span style="color:#24292e;">  -rpcsslcertificatechainfile=&lt;文件.cert&gt;  服务器证书文件（默认：server.cert）</span></span>
<span class="line"><span style="color:#24292e;">  -rpcsslprivatekeyfile=&lt;文件.pem&gt;         服务器私匙文件（默认：server.pem）</span></span>
<span class="line"><span style="color:#24292e;">  -rpcsslciphers=&lt;密码&gt;                    可接受的密码（默认：TLSv1+HIGH:!SSLv2:!aNULL:!eNULL:!AH:!3DES:@STRENGTH）</span></span></code></pre></div><p>#FAQ</p><p>参考地址：</p><p><a href="https://github.com/OmniLayer/omnicore/releases" target="_blank" rel="noreferrer">https://github.com/OmniLayer/omnicore/releases</a></p>`,15),o=[l];function p(r,c,i,u,d,q){return n(),t("div",null,o)}const w=s(e,[["render",p]]);export{g as __pageData,w as default};
