import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一、撮合交易所搭建","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Blockchain/anli.md","filePath":"guide/Blockchain/anli.md","lastUpdated":1701401252000}'),l={name:"guide/Blockchain/anli.md"},o=p(`<h1 id="一、撮合交易所搭建" tabindex="-1">一、撮合交易所搭建 <a class="header-anchor" href="#一、撮合交易所搭建" aria-label="Permalink to &quot;一、撮合交易所搭建&quot;">​</a></h1><p>启动顺序：</p><p>签名-----&gt;钱包----&gt;撮合</p><h1 id="二、签名" tabindex="-1">二、签名 <a class="header-anchor" href="#二、签名" aria-label="Permalink to &quot;二、签名&quot;">​</a></h1><h2 id="usdt" tabindex="-1">usdt <a class="header-anchor" href="#usdt" aria-label="Permalink to &quot;usdt&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#启动</span></span>
<span class="line"><span style="color:#e1e4e8;">/data/kr/sign/usdt/signature_services_3.0.0 bw btc -conf app.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">cat app.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">[sign]</span></span>
<span class="line"><span style="color:#e1e4e8;">signserverip=172.31.14.252</span></span>
<span class="line"><span style="color:#e1e4e8;">signserverport=7684</span></span>
<span class="line"><span style="color:#e1e4e8;">[service]</span></span>
<span class="line"><span style="color:#e1e4e8;">mode=server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#启动</span></span>
<span class="line"><span style="color:#24292e;">/data/kr/sign/usdt/signature_services_3.0.0 bw btc -conf app.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">cat app.conf</span></span>
<span class="line"><span style="color:#24292e;">[sign]</span></span>
<span class="line"><span style="color:#24292e;">signserverip=172.31.14.252</span></span>
<span class="line"><span style="color:#24292e;">signserverport=7684</span></span>
<span class="line"><span style="color:#24292e;">[service]</span></span>
<span class="line"><span style="color:#24292e;">mode=server</span></span></code></pre></div><h2 id="eth" tabindex="-1">eth <a class="header-anchor" href="#eth" aria-label="Permalink to &quot;eth&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#eth 不用配置文件</span></span>
<span class="line"><span style="color:#B392F0;">./eth_sign</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-address</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">:8999</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#eth 不用配置文件</span></span>
<span class="line"><span style="color:#6F42C1;">./eth_sign</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-address</span><span style="color:#24292E;"> </span><span style="color:#032F62;">:8999</span></span></code></pre></div><h2 id="btc" tabindex="-1">btc <a class="header-anchor" href="#btc" aria-label="Permalink to &quot;btc&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#启动方式</span></span>
<span class="line"><span style="color:#B392F0;">/data/kr/sign/btc/btc_sign_3.0.0</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bw</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">btc</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-conf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#配置文件</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@app btc]# cat app.conf </span></span>
<span class="line"><span style="color:#E1E4E8;">[sign]</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverip</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.14.252</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">7681</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[service]</span></span>
<span class="line"><span style="color:#E1E4E8;">mode</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#启动方式</span></span>
<span class="line"><span style="color:#6F42C1;">/data/kr/sign/btc/btc_sign_3.0.0</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bw</span><span style="color:#24292E;"> </span><span style="color:#032F62;">btc</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-conf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#配置文件</span></span>
<span class="line"><span style="color:#24292E;">[root@app btc]# cat app.conf </span></span>
<span class="line"><span style="color:#24292E;">[sign]</span></span>
<span class="line"><span style="color:#24292E;">signserverip</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.14.252</span></span>
<span class="line"><span style="color:#24292E;">signserverport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">7681</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[service]</span></span>
<span class="line"><span style="color:#24292E;">mode</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">server</span></span></code></pre></div><h1 id="三、match-搭建" tabindex="-1">三、match 搭建 <a class="header-anchor" href="#三、match-搭建" aria-label="Permalink to &quot;三、match 搭建&quot;">​</a></h1><h2 id="eth-1" tabindex="-1">eth <a class="header-anchor" href="#eth-1" aria-label="Permalink to &quot;eth&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#eth to usdt  其他类似</span></span>
<span class="line"><span style="color:#B392F0;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-jar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xms1024m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xmx3096m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exchange-matching-2.4.0.jar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">eth</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">usdt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#eth to usdt  其他类似</span></span>
<span class="line"><span style="color:#6F42C1;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-jar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xms1024m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xmx3096m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exchange-matching-2.4.0.jar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">eth</span><span style="color:#24292E;"> </span><span style="color:#032F62;">usdt</span></span></code></pre></div><h2 id="usdt-1" tabindex="-1">usdt <a class="header-anchor" href="#usdt-1" aria-label="Permalink to &quot;usdt&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># btc = usdt 启动方式一样</span></span>
<span class="line"><span style="color:#B392F0;">java</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-jar</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xms1024m</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-Xmx3096m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exchange-matching-2.4.0.jar</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">btc</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">usdt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># btc = usdt 启动方式一样</span></span>
<span class="line"><span style="color:#6F42C1;">java</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-jar</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xms1024m</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-Xmx3096m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exchange-matching-2.4.0.jar</span><span style="color:#24292E;"> </span><span style="color:#032F62;">btc</span><span style="color:#24292E;"> </span><span style="color:#032F62;">usdt</span></span></code></pre></div><h2 id="btc-1" tabindex="-1">btc <a class="header-anchor" href="#btc-1" aria-label="Permalink to &quot;btc&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">/data/kr/sign/btc/btc_sign_3.0.0</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bw</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">btc</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-conf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">[sign]</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverip</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.14.252</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">7681</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[service]</span></span>
<span class="line"><span style="color:#E1E4E8;">mode</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">/data/kr/sign/btc/btc_sign_3.0.0</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bw</span><span style="color:#24292E;"> </span><span style="color:#032F62;">btc</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-conf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"><span style="color:#24292E;">[sign]</span></span>
<span class="line"><span style="color:#24292E;">signserverip</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.14.252</span></span>
<span class="line"><span style="color:#24292E;">signserverport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">7681</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[service]</span></span>
<span class="line"><span style="color:#24292E;">mode</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">server</span></span></code></pre></div><h1 id="四、钱包" tabindex="-1">四、钱包 <a class="header-anchor" href="#四、钱包" aria-label="Permalink to &quot;四、钱包&quot;">​</a></h1><h2 id="usdt-2" tabindex="-1">usdt <a class="header-anchor" href="#usdt-2" aria-label="Permalink to &quot;usdt&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#启动，先启动块，在启动钱包</span></span>
<span class="line"><span style="color:#B392F0;">/data/trade/usdt/wallet_services_2.2.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bw</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">usdt</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-conf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">[api]</span></span>
<span class="line"><span style="color:#E1E4E8;">url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://172.31.14.252:9157/finance/%s</span></span>
<span class="line"><span style="color:#E1E4E8;">id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">cfx</span></span>
<span class="line"><span style="color:#E1E4E8;">key</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">cfx123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[email]</span></span>
<span class="line"><span style="color:#E1E4E8;">url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://59.110.241.51:9080/email/send</span></span>
<span class="line"><span style="color:#E1E4E8;">from</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">tools@chainup.com</span></span>
<span class="line"><span style="color:#E1E4E8;">to</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1656564652</span><span style="color:#9ECBFF;">@qq.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[node]</span></span>
<span class="line"><span style="color:#E1E4E8;">rpchost</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.5.94</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcuser</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">omn</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcpwd</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">MeVz4m12edswacTYZgvY</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">28832</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[block]</span></span>
<span class="line"><span style="color:#E1E4E8;">blockip</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1:27017</span></span>
<span class="line"><span style="color:#E1E4E8;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">usdtcoin</span></span>
<span class="line"><span style="color:#E1E4E8;">pwd</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[wallet]</span></span>
<span class="line"><span style="color:#6A737D;">#debug=0</span></span>
<span class="line"><span style="color:#E1E4E8;">maxstock</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#E1E4E8;">maxbalance</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">minbalance</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">fphone</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">13165079783</span></span>
<span class="line"><span style="color:#E1E4E8;">ephone</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">13165079783</span></span>
<span class="line"><span style="color:#E1E4E8;">alarmtimeout</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1800</span></span>
<span class="line"><span style="color:#E1E4E8;">coldaddress</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">coldhash</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span><span style="color:#9ECBFF;">L8pH5FqMW3eTB222E6Rgh4BJRm4fuYk22</span></span>
<span class="line"><span style="color:#E1E4E8;">smsurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://59.110.241.51:8090/smsSend</span></span>
<span class="line"><span style="color:#E1E4E8;">minerfee</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">50000</span></span>
<span class="line"><span style="color:#E1E4E8;">fee_rate</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">150000</span></span>
<span class="line"><span style="color:#E1E4E8;">usdtbtcfee</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">546</span></span>
<span class="line"><span style="color:#E1E4E8;">sysmaxusdt</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[sign]</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverip</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.14.252</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">7684</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[service]</span></span>
<span class="line"><span style="color:#E1E4E8;">mode</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">client</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#启动，先启动块，在启动钱包</span></span>
<span class="line"><span style="color:#6F42C1;">/data/trade/usdt/wallet_services_2.2.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bw</span><span style="color:#24292E;"> </span><span style="color:#032F62;">usdt</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-conf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app.conf</span></span>
<span class="line"><span style="color:#24292E;">[api]</span></span>
<span class="line"><span style="color:#24292E;">url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://172.31.14.252:9157/finance/%s</span></span>
<span class="line"><span style="color:#24292E;">id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">cfx</span></span>
<span class="line"><span style="color:#24292E;">key</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">cfx123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[email]</span></span>
<span class="line"><span style="color:#24292E;">url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://59.110.241.51:9080/email/send</span></span>
<span class="line"><span style="color:#24292E;">from</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">tools@chainup.com</span></span>
<span class="line"><span style="color:#24292E;">to</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1656564652</span><span style="color:#032F62;">@qq.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[node]</span></span>
<span class="line"><span style="color:#24292E;">rpchost</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.5.94</span></span>
<span class="line"><span style="color:#24292E;">rpcuser</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">omn</span></span>
<span class="line"><span style="color:#24292E;">rpcpwd</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">MeVz4m12edswacTYZgvY</span></span>
<span class="line"><span style="color:#24292E;">rpcport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">28832</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[block]</span></span>
<span class="line"><span style="color:#24292E;">blockip</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1:27017</span></span>
<span class="line"><span style="color:#24292E;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">usdtcoin</span></span>
<span class="line"><span style="color:#24292E;">pwd</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[wallet]</span></span>
<span class="line"><span style="color:#6A737D;">#debug=0</span></span>
<span class="line"><span style="color:#24292E;">maxstock</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#24292E;">maxbalance</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">minbalance</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">fphone</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">13165079783</span></span>
<span class="line"><span style="color:#24292E;">ephone</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">13165079783</span></span>
<span class="line"><span style="color:#24292E;">alarmtimeout</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1800</span></span>
<span class="line"><span style="color:#24292E;">coldaddress</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">coldhash</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span><span style="color:#032F62;">L8pH5FqMW3eTB222E6Rgh4BJRm4fuYk22</span></span>
<span class="line"><span style="color:#24292E;">smsurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://59.110.241.51:8090/smsSend</span></span>
<span class="line"><span style="color:#24292E;">minerfee</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">50000</span></span>
<span class="line"><span style="color:#24292E;">fee_rate</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">150000</span></span>
<span class="line"><span style="color:#24292E;">usdtbtcfee</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">546</span></span>
<span class="line"><span style="color:#24292E;">sysmaxusdt</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[sign]</span></span>
<span class="line"><span style="color:#24292E;">signserverip</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.14.252</span></span>
<span class="line"><span style="color:#24292E;">signserverport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">7684</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[service]</span></span>
<span class="line"><span style="color:#24292E;">mode</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">client</span></span></code></pre></div><ul><li>启动usdt 块</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@app usdtblock]# pwd</span></span>
<span class="line"><span style="color:#B392F0;">/data/trade/usdt/usdtblock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@app usdtblock]# cat app.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">[chain]</span></span>
<span class="line"><span style="color:#E1E4E8;">height</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">536508</span></span>
<span class="line"><span style="color:#E1E4E8;">hash</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0000000000000000001064</span><span style="color:#9ECBFF;">ec5fb6c8246168ed52939ad24a331f047596810b29</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[mongo]</span></span>
<span class="line"><span style="color:#E1E4E8;">host</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span></span>
<span class="line"><span style="color:#E1E4E8;">port</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">27017</span></span>
<span class="line"><span style="color:#E1E4E8;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">usdtcoin</span></span>
<span class="line"><span style="color:#E1E4E8;">pwd</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[rpc]</span></span>
<span class="line"><span style="color:#E1E4E8;">rpchost</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.5.94</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcuser</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">omn</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcpwd</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">MeVz4m12edswacTYZgvY</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@app usdtblock]# cat usdt.conf </span></span>
<span class="line"><span style="color:#E1E4E8;">[usdtchain]</span></span>
<span class="line"><span style="color:#E1E4E8;">confirm</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">height</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">680917</span></span>
<span class="line"><span style="color:#E1E4E8;">hash</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">00000000000000000007671</span><span style="color:#9ECBFF;">b599f1165db955c09d854c7e37da51995161e056a</span></span>
<span class="line"><span style="color:#E1E4E8;">codeAddress</span><span style="color:#F97583;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[mongo]</span></span>
<span class="line"><span style="color:#E1E4E8;">host</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span></span>
<span class="line"><span style="color:#E1E4E8;">port</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">27017</span></span>
<span class="line"><span style="color:#E1E4E8;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">usdtcoin</span></span>
<span class="line"><span style="color:#E1E4E8;">pwd</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[omni]</span></span>
<span class="line"><span style="color:#E1E4E8;">rpchost</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.5.94</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcuser</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">omn</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcpwd</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">MeVz4m12edswacTYZgvY</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">28832</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[alarm]</span></span>
<span class="line"><span style="color:#E1E4E8;">signature</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">【ch】</span></span>
<span class="line"><span style="color:#E1E4E8;">smsurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://172.0.0.2:8090/smsSend</span></span>
<span class="line"><span style="color:#E1E4E8;">phone</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1234567890</span></span>
<span class="line"><span style="color:#E1E4E8;">proxy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">ytxgj</span></span>
<span class="line"><span style="color:#E1E4E8;">type</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">201</span></span>
<span class="line"><span style="color:#E1E4E8;">emailurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://172.0.0.2:9080/email/SendSms</span></span>
<span class="line"><span style="color:#E1E4E8;">from</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">admin@cinup.com</span></span>
<span class="line"><span style="color:#E1E4E8;">to</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">to@chup.com</span></span>
<span class="line"><span style="color:#E1E4E8;">subject</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">usdt钱包报警</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[api]</span></span>
<span class="line"><span style="color:#E1E4E8;">apiUrl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://172.31.14.252:9157/finance/</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">apiID</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">cfx</span></span>
<span class="line"><span style="color:#E1E4E8;">apiSecret</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">cfx123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动块</span></span>
<span class="line"><span style="color:#B392F0;">./usdtblock_3.1.4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">启动完会产生两个块</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@app usdtblock]# pwd</span></span>
<span class="line"><span style="color:#6F42C1;">/data/trade/usdt/usdtblock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@app usdtblock]# cat app.conf</span></span>
<span class="line"><span style="color:#24292E;">[chain]</span></span>
<span class="line"><span style="color:#24292E;">height</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">536508</span></span>
<span class="line"><span style="color:#24292E;">hash</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0000000000000000001064</span><span style="color:#032F62;">ec5fb6c8246168ed52939ad24a331f047596810b29</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[mongo]</span></span>
<span class="line"><span style="color:#24292E;">host</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span></span>
<span class="line"><span style="color:#24292E;">port</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">27017</span></span>
<span class="line"><span style="color:#24292E;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">usdtcoin</span></span>
<span class="line"><span style="color:#24292E;">pwd</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[rpc]</span></span>
<span class="line"><span style="color:#24292E;">rpchost</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.5.94</span></span>
<span class="line"><span style="color:#24292E;">rpcuser</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">omn</span></span>
<span class="line"><span style="color:#24292E;">rpcpwd</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">MeVz4m12edswacTYZgvY</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@app usdtblock]# cat usdt.conf </span></span>
<span class="line"><span style="color:#24292E;">[usdtchain]</span></span>
<span class="line"><span style="color:#24292E;">confirm</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">height</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">680917</span></span>
<span class="line"><span style="color:#24292E;">hash</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">00000000000000000007671</span><span style="color:#032F62;">b599f1165db955c09d854c7e37da51995161e056a</span></span>
<span class="line"><span style="color:#24292E;">codeAddress</span><span style="color:#D73A49;">=</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[mongo]</span></span>
<span class="line"><span style="color:#24292E;">host</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span></span>
<span class="line"><span style="color:#24292E;">port</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">27017</span></span>
<span class="line"><span style="color:#24292E;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">usdtcoin</span></span>
<span class="line"><span style="color:#24292E;">pwd</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[omni]</span></span>
<span class="line"><span style="color:#24292E;">rpchost</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.5.94</span></span>
<span class="line"><span style="color:#24292E;">rpcuser</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">omn</span></span>
<span class="line"><span style="color:#24292E;">rpcpwd</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">MeVz4m12edswacTYZgvY</span></span>
<span class="line"><span style="color:#24292E;">rpcport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">28832</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[alarm]</span></span>
<span class="line"><span style="color:#24292E;">signature</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">【ch】</span></span>
<span class="line"><span style="color:#24292E;">smsurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://172.0.0.2:8090/smsSend</span></span>
<span class="line"><span style="color:#24292E;">phone</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1234567890</span></span>
<span class="line"><span style="color:#24292E;">proxy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">ytxgj</span></span>
<span class="line"><span style="color:#24292E;">type</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">201</span></span>
<span class="line"><span style="color:#24292E;">emailurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://172.0.0.2:9080/email/SendSms</span></span>
<span class="line"><span style="color:#24292E;">from</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">admin@cinup.com</span></span>
<span class="line"><span style="color:#24292E;">to</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">to@chup.com</span></span>
<span class="line"><span style="color:#24292E;">subject</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">usdt钱包报警</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[api]</span></span>
<span class="line"><span style="color:#24292E;">apiUrl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://172.31.14.252:9157/finance/</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">apiID</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">cfx</span></span>
<span class="line"><span style="color:#24292E;">apiSecret</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">cfx123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动块</span></span>
<span class="line"><span style="color:#6F42C1;">./usdtblock_3.1.4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">启动完会产生两个块</span></span></code></pre></div><h2 id="eth-2" tabindex="-1">eth <a class="header-anchor" href="#eth-2" aria-label="Permalink to &quot;eth&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#eth 启动没有块</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@app eth]# pwd</span></span>
<span class="line"><span style="color:#B392F0;">/data/trade/eth</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#B392F0;">./eth_wallet</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-c</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/trade/eth/app.yaml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#eth 启动没有块</span></span>
<span class="line"><span style="color:#24292E;">[root@app eth]# pwd</span></span>
<span class="line"><span style="color:#6F42C1;">/data/trade/eth</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动</span></span>
<span class="line"><span style="color:#6F42C1;">./eth_wallet</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-c</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/trade/eth/app.yaml</span></span></code></pre></div><h2 id="btc-2" tabindex="-1">btc <a class="header-anchor" href="#btc-2" aria-label="Permalink to &quot;btc&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@app update_app]# pwd</span></span>
<span class="line"><span style="color:#B392F0;">/data/trade/btc/update_app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[root@app update_app]# cat app.conf </span></span>
<span class="line"><span style="color:#E1E4E8;">[chain]</span></span>
<span class="line"><span style="color:#E1E4E8;">height</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">679974</span></span>
<span class="line"><span style="color:#E1E4E8;">hash</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">00000000000000000005</span><span style="color:#9ECBFF;">aa8d4911dfe5cb8c5f1dfa3ad4998eaa1571e5a30f70</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[mongo]</span></span>
<span class="line"><span style="color:#E1E4E8;">host</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span></span>
<span class="line"><span style="color:#E1E4E8;">port</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">27017</span></span>
<span class="line"><span style="color:#E1E4E8;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">bitcoinuser</span></span>
<span class="line"><span style="color:#E1E4E8;">pwd</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[rpc]</span></span>
<span class="line"><span style="color:#E1E4E8;">rpchost</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.2.5</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcuser</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">111</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcpwd</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">222</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动块，btc块启动，会产生两个块进程</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@app update_app]#./btc_block_2.0.3 btc</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#钱包启动，钱包会产生3个进程</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@app btc]# pwd</span></span>
<span class="line"><span style="color:#B392F0;">/data/trade/btc</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@app btc]#./btc_wallet_2.0.4 bw btc -conf app.conf</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看配置文件</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@app btc]# cat app.conf </span></span>
<span class="line"><span style="color:#E1E4E8;">[api]</span></span>
<span class="line"><span style="color:#E1E4E8;">url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://172.31.14.252:9157/finance/%s</span></span>
<span class="line"><span style="color:#E1E4E8;">id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">cfx</span></span>
<span class="line"><span style="color:#E1E4E8;">key</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">cfx123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[email]</span></span>
<span class="line"><span style="color:#E1E4E8;">url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://172.0.0.2:9080/email/send</span></span>
<span class="line"><span style="color:#E1E4E8;">from</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">admin@chainup.com</span></span>
<span class="line"><span style="color:#E1E4E8;">to</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">to@chainup.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[node]</span></span>
<span class="line"><span style="color:#E1E4E8;">rpchost</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.2.5</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcuser</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">111</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcpassword</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">222</span></span>
<span class="line"><span style="color:#E1E4E8;">rpcport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">8332</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[block]</span></span>
<span class="line"><span style="color:#E1E4E8;">blockip</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1:27017</span></span>
<span class="line"><span style="color:#E1E4E8;">username</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">bitcoinuser</span></span>
<span class="line"><span style="color:#E1E4E8;">pwd</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[wallet]</span></span>
<span class="line"><span style="color:#E1E4E8;">maxstock</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">10000</span></span>
<span class="line"><span style="color:#E1E4E8;">maxbalance</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5000</span></span>
<span class="line"><span style="color:#E1E4E8;">minbalance</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">fphone</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">15024401424</span></span>
<span class="line"><span style="color:#E1E4E8;">ephone</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">15024401424</span></span>
<span class="line"><span style="color:#E1E4E8;">alarmtimeout</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1800</span></span>
<span class="line"><span style="color:#E1E4E8;">coldaddress</span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">coldhash</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span><span style="color:#9ECBFF;">L8pH5FqMW3eTB222E6Rgh4BJRm4fuYk22</span></span>
<span class="line"><span style="color:#E1E4E8;">smsurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://172.0.0.2:8090/smsSend</span></span>
<span class="line"><span style="color:#E1E4E8;">internalextrafee</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">100000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[sms]</span></span>
<span class="line"><span style="color:#E1E4E8;">proxy</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">ytxgj</span></span>
<span class="line"><span style="color:#E1E4E8;">type</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">11</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[sign]</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverip</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">172.31</span><span style="color:#9ECBFF;">.14.252</span></span>
<span class="line"><span style="color:#E1E4E8;">signserverport</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">7681</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[service]</span></span>
<span class="line"><span style="color:#E1E4E8;">mode</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">client</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@app update_app]# pwd</span></span>
<span class="line"><span style="color:#6F42C1;">/data/trade/btc/update_app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[root@app update_app]# cat app.conf </span></span>
<span class="line"><span style="color:#24292E;">[chain]</span></span>
<span class="line"><span style="color:#24292E;">height</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">679974</span></span>
<span class="line"><span style="color:#24292E;">hash</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">00000000000000000005</span><span style="color:#032F62;">aa8d4911dfe5cb8c5f1dfa3ad4998eaa1571e5a30f70</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[mongo]</span></span>
<span class="line"><span style="color:#24292E;">host</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span></span>
<span class="line"><span style="color:#24292E;">port</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">27017</span></span>
<span class="line"><span style="color:#24292E;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">bitcoinuser</span></span>
<span class="line"><span style="color:#24292E;">pwd</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[rpc]</span></span>
<span class="line"><span style="color:#24292E;">rpchost</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.2.5</span></span>
<span class="line"><span style="color:#24292E;">rpcuser</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">111</span></span>
<span class="line"><span style="color:#24292E;">rpcpwd</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">222</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#启动块，btc块启动，会产生两个块进程</span></span>
<span class="line"><span style="color:#24292E;">[root@app update_app]#./btc_block_2.0.3 btc</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#钱包启动，钱包会产生3个进程</span></span>
<span class="line"><span style="color:#24292E;">[root@app btc]# pwd</span></span>
<span class="line"><span style="color:#6F42C1;">/data/trade/btc</span></span>
<span class="line"><span style="color:#24292E;">[root@app btc]#./btc_wallet_2.0.4 bw btc -conf app.conf</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#查看配置文件</span></span>
<span class="line"><span style="color:#24292E;">[root@app btc]# cat app.conf </span></span>
<span class="line"><span style="color:#24292E;">[api]</span></span>
<span class="line"><span style="color:#24292E;">url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://172.31.14.252:9157/finance/%s</span></span>
<span class="line"><span style="color:#24292E;">id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">cfx</span></span>
<span class="line"><span style="color:#24292E;">key</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">cfx123</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[email]</span></span>
<span class="line"><span style="color:#24292E;">url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://172.0.0.2:9080/email/send</span></span>
<span class="line"><span style="color:#24292E;">from</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">admin@chainup.com</span></span>
<span class="line"><span style="color:#24292E;">to</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">to@chainup.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[node]</span></span>
<span class="line"><span style="color:#24292E;">rpchost</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.2.5</span></span>
<span class="line"><span style="color:#24292E;">rpcuser</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">111</span></span>
<span class="line"><span style="color:#24292E;">rpcpassword</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">222</span></span>
<span class="line"><span style="color:#24292E;">rpcport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">8332</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[block]</span></span>
<span class="line"><span style="color:#24292E;">blockip</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1:27017</span></span>
<span class="line"><span style="color:#24292E;">username</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">bitcoinuser</span></span>
<span class="line"><span style="color:#24292E;">pwd</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[wallet]</span></span>
<span class="line"><span style="color:#24292E;">maxstock</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">10000</span></span>
<span class="line"><span style="color:#24292E;">maxbalance</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5000</span></span>
<span class="line"><span style="color:#24292E;">minbalance</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">fphone</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">15024401424</span></span>
<span class="line"><span style="color:#24292E;">ephone</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">15024401424</span></span>
<span class="line"><span style="color:#24292E;">alarmtimeout</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1800</span></span>
<span class="line"><span style="color:#24292E;">coldaddress</span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">coldhash</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span><span style="color:#032F62;">L8pH5FqMW3eTB222E6Rgh4BJRm4fuYk22</span></span>
<span class="line"><span style="color:#24292E;">smsurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://172.0.0.2:8090/smsSend</span></span>
<span class="line"><span style="color:#24292E;">internalextrafee</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">100000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[sms]</span></span>
<span class="line"><span style="color:#24292E;">proxy</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">ytxgj</span></span>
<span class="line"><span style="color:#24292E;">type</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">11</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[sign]</span></span>
<span class="line"><span style="color:#24292E;">signserverip</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">172.31</span><span style="color:#032F62;">.14.252</span></span>
<span class="line"><span style="color:#24292E;">signserverport</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">7681</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[service]</span></span>
<span class="line"><span style="color:#24292E;">mode</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">client</span></span></code></pre></div>`,26),e=[o];function c(t,r,y,i,E,F){return n(),a("div",null,e)}const C=s(l,[["render",c]]);export{h as __pageData,C as default};
