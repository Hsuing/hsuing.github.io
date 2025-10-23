import{_ as s,o as a,c as n,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. 修改inflxudb存储路径","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/11-datapath.md","filePath":"guide/Database/influxdb/11-datapath.md","lastUpdated":1720533756000}'),p={name:"guide/Database/influxdb/11-datapath.md"},o=l(`<h1 id="_1-修改inflxudb存储路径" tabindex="-1">1. 修改inflxudb存储路径 <a class="header-anchor" href="#_1-修改inflxudb存储路径" aria-label="Permalink to &quot;1. 修改inflxudb存储路径&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/influxdb_data/influxdb/meta</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/influxdb_data/influxdb/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/influxdb_data/influxdb/wal</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/influxdb_data/logs</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">ln</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-sv</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/influxdb_data/logs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/influxdb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">chown</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-R</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">influxdb</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/influxdb_data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">influxdb</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[meta]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/data/influxdb_data/influxdb/meta&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">[data]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/data/influxdb_data/influxdb/data&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">wal-dir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/data/influxdb_data/influxdb/wal&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#backup</span></span>
<span class="line"><span style="color:#B392F0;">influxd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">backup</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-portable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-database</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">MarketBiyin</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/data/backup/MarketBiyin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#restore</span></span>
<span class="line"><span style="color:#B392F0;">influxd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restore</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-portable</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-db</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ProxyMarket</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-newdb</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ProxyMarket</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/tmp/ProxyMarket_back</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/influxdb_data/influxdb/meta</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/influxdb_data/influxdb/data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/influxdb_data/influxdb/wal</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/influxdb_data/logs</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">ln</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-sv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/influxdb_data/logs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/influxdb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">chown</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-R</span><span style="color:#24292E;"> </span><span style="color:#032F62;">influxdb</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/influxdb_data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">influxdb</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[meta]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/data/influxdb_data/influxdb/meta&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">[data]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/data/influxdb_data/influxdb/data&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">wal-dir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/data/influxdb_data/influxdb/wal&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#backup</span></span>
<span class="line"><span style="color:#6F42C1;">influxd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">backup</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-portable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-database</span><span style="color:#24292E;"> </span><span style="color:#032F62;">MarketBiyin</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/data/backup/MarketBiyin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#restore</span></span>
<span class="line"><span style="color:#6F42C1;">influxd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restore</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-portable</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-db</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ProxyMarket</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-newdb</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ProxyMarket</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/tmp/ProxyMarket_back</span></span></code></pre></div><p><a href="http://blog.51cto.com/10880347/2306804" target="_blank" rel="noreferrer">http://blog.51cto.com/10880347/2306804</a></p><h1 id="修改influxdb日志" tabindex="-1">#修改influxdb日志 <a class="header-anchor" href="#修改influxdb日志" aria-label="Permalink to &quot;#修改influxdb日志&quot;">​</a></h1><p>vi /etc/rsyslog.d/influxdb.conf</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">### InfluxDB Rules ###</span></span>
<span class="line"><span style="color:#e1e4e8;">if $programname == &#39;influxd&#39; then {</span></span>
<span class="line"><span style="color:#e1e4e8;">   action(type=&quot;omfile&quot; file=&quot;/var/log/influxdb/influxd.log&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">   stop</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">### InfluxDB Rules ###</span></span>
<span class="line"><span style="color:#24292e;">if $programname == &#39;influxd&#39; then {</span></span>
<span class="line"><span style="color:#24292e;">   action(type=&quot;omfile&quot; file=&quot;/var/log/influxdb/influxd.log&quot;)</span></span>
<span class="line"><span style="color:#24292e;">   stop</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>重启systemctl stop rsyslog 和influxdb</p>`,7),e=[o];function t(c,r,i,y,E,d){return a(),n("div",null,e)}const b=s(p,[["render",t]]);export{u as __pageData,b as default};
