import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"一、query数据查询","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/6-query.md","filePath":"guide/Database/influxdb/6-query.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/6-query.md"},p=e(`<h1 id="一、query数据查询" tabindex="-1">一、query数据查询 <a class="header-anchor" href="#一、query数据查询" aria-label="Permalink to &quot;一、query数据查询&quot;">​</a></h1><p>使用influx客户端命令时，建议加上&quot;<code>-precision rfc3339&quot;参数，这样交互界面返回的时间将不再是timestamp，而是符合rfc339时间格式的时间戳&quot;YYYY-MM-DDTHH:MM:SS.nnnnnnnnnZ)&quot;</code></p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@appman ~]# influx </span><span style="color:#F97583;">-precision</span><span style="color:#E1E4E8;"> rfc3339</span></span>
<span class="line"><span style="color:#E1E4E8;">Connected </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">//</span><span style="color:#E1E4E8;">localhost:</span><span style="color:#79B8FF;">8086</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">InfluxDB shell </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">Enter an InfluxQL query</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> k_LINKUSDT_5m;</span></span>
<span class="line"><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">: k_LINKUSDT_5m</span></span>
<span class="line"><span style="color:#F97583;">time</span><span style="color:#E1E4E8;">                 </span><span style="color:#F97583;">close</span><span style="color:#E1E4E8;">   high    low     </span><span style="color:#F97583;">open</span><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">times</span><span style="color:#E1E4E8;">         val              vol</span></span>
<span class="line"><span style="color:#6A737D;">----                 -----   ----    ---     ----    -----         ---              ---</span></span>
<span class="line"><span style="color:#79B8FF;">2022</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">04</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">28T09:</span><span style="color:#79B8FF;">05</span><span style="color:#E1E4E8;">:00Z </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9504</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9505</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9104</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9104</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1651136700000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1823533</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">27466635</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">141016</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">29297</span></span>
<span class="line"><span style="color:#79B8FF;">2022</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">04</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">28T09:</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">:00Z </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9604</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9703</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9504</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9504</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1651137000000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2389227</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">76983544</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">184418</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">367635</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#或者，进入终端之后</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@appman ~]# influx</span></span>
<span class="line"><span style="color:#E1E4E8;">Connected </span><span style="color:#F97583;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">//</span><span style="color:#E1E4E8;">localhost:</span><span style="color:#79B8FF;">8086</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">InfluxDB shell </span><span style="color:#F97583;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">Enter an InfluxQL query</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">precision</span><span style="color:#E1E4E8;"> rfc3339</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> k_LINKUSDT_5m;</span></span>
<span class="line"><span style="color:#F97583;">name</span><span style="color:#E1E4E8;">: k_LINKUSDT_5m</span></span>
<span class="line"><span style="color:#F97583;">time</span><span style="color:#E1E4E8;">                 </span><span style="color:#F97583;">close</span><span style="color:#E1E4E8;">   high    low     </span><span style="color:#F97583;">open</span><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">times</span><span style="color:#E1E4E8;">         val              vol</span></span>
<span class="line"><span style="color:#6A737D;">----                 -----   ----    ---     ----    -----         ---              ---</span></span>
<span class="line"><span style="color:#79B8FF;">2022</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">04</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">28T09:</span><span style="color:#79B8FF;">05</span><span style="color:#E1E4E8;">:00Z </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9504</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9505</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9104</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9104</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1651136700000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1823533</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">27466635</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">141016</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">29297</span></span>
<span class="line"><span style="color:#79B8FF;">2022</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">04</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">28T09:</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">:00Z </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9604</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9703</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9504</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">9504</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1651137000000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2389227</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">76983544</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">184418</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">367635</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@appman ~]# influx </span><span style="color:#D73A49;">-precision</span><span style="color:#24292E;"> rfc3339</span></span>
<span class="line"><span style="color:#24292E;">Connected </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">http</span><span style="color:#24292E;">:</span><span style="color:#D73A49;">//</span><span style="color:#24292E;">localhost:</span><span style="color:#005CC5;">8086</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">InfluxDB shell </span><span style="color:#D73A49;">version</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">Enter an InfluxQL query</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> k_LINKUSDT_5m;</span></span>
<span class="line"><span style="color:#D73A49;">name</span><span style="color:#24292E;">: k_LINKUSDT_5m</span></span>
<span class="line"><span style="color:#D73A49;">time</span><span style="color:#24292E;">                 </span><span style="color:#D73A49;">close</span><span style="color:#24292E;">   high    low     </span><span style="color:#D73A49;">open</span><span style="color:#24292E;">    </span><span style="color:#D73A49;">times</span><span style="color:#24292E;">         val              vol</span></span>
<span class="line"><span style="color:#6A737D;">----                 -----   ----    ---     ----    -----         ---              ---</span></span>
<span class="line"><span style="color:#005CC5;">2022</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">04</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">28T09:</span><span style="color:#005CC5;">05</span><span style="color:#24292E;">:00Z </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9504</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9505</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9104</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9104</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1651136700000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1823533</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">27466635</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">141016</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">29297</span></span>
<span class="line"><span style="color:#005CC5;">2022</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">04</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">28T09:</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">:00Z </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9604</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9703</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9504</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9504</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1651137000000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2389227</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">76983544</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">184418</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">367635</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#或者，进入终端之后</span></span>
<span class="line"><span style="color:#24292E;">[root@appman ~]# influx</span></span>
<span class="line"><span style="color:#24292E;">Connected </span><span style="color:#D73A49;">to</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">http</span><span style="color:#24292E;">:</span><span style="color:#D73A49;">//</span><span style="color:#24292E;">localhost:</span><span style="color:#005CC5;">8086</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">version</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">InfluxDB shell </span><span style="color:#D73A49;">version</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">Enter an InfluxQL query</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">precision</span><span style="color:#24292E;"> rfc3339</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> k_LINKUSDT_5m;</span></span>
<span class="line"><span style="color:#D73A49;">name</span><span style="color:#24292E;">: k_LINKUSDT_5m</span></span>
<span class="line"><span style="color:#D73A49;">time</span><span style="color:#24292E;">                 </span><span style="color:#D73A49;">close</span><span style="color:#24292E;">   high    low     </span><span style="color:#D73A49;">open</span><span style="color:#24292E;">    </span><span style="color:#D73A49;">times</span><span style="color:#24292E;">         val              vol</span></span>
<span class="line"><span style="color:#6A737D;">----                 -----   ----    ---     ----    -----         ---              ---</span></span>
<span class="line"><span style="color:#005CC5;">2022</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">04</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">28T09:</span><span style="color:#005CC5;">05</span><span style="color:#24292E;">:00Z </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9504</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9505</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9104</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9104</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1651136700000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1823533</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">27466635</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">141016</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">29297</span></span>
<span class="line"><span style="color:#005CC5;">2022</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">04</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">28T09:</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">:00Z </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9604</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9703</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9504</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">9504</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1651137000000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2389227</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">76983544</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">184418</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">367635</span></span></code></pre></div><h2 id="_1-1-基本查询" tabindex="-1">1.1 基本查询 <a class="header-anchor" href="#_1-1-基本查询" aria-label="Permalink to &quot;1.1 基本查询&quot;">​</a></h2><ul><li>基本查询语法如下</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT &lt;field_key&gt;[,&lt;field_key&gt;,&lt;tag_key&gt;] FROM &lt;measurement_name&gt;[,&lt;measurement_name&gt;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT &lt;field_key&gt;[,&lt;field_key&gt;,&lt;tag_key&gt;] FROM &lt;measurement_name&gt;[,&lt;measurement_name&gt;]</span></span></code></pre></div><ul><li>注解：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select语句</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">select * : 表示查询所有的field和tag对应的值</span></span>
<span class="line"><span style="color:#e1e4e8;">select field_key: 表示查询特定的field对应的值</span></span>
<span class="line"><span style="color:#e1e4e8;">select tag_key: 表示查询的特定的tag对应的值</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT &quot;&lt;field_key&gt;&quot;::field,&quot;&lt;tag_key&gt;&quot;::tag: 注意::field和::tag用来限定这个数据的类型为tag或者是field</span></span>
<span class="line"><span style="color:#e1e4e8;">from语句</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">from后面需要接上measurement，表示从这个mesaurement中查询数据</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">FROM &lt;measurement_name&gt; 从指定的measurement中获取数据</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM &lt;measurement_name&gt;,&lt;measurement_name&gt; 从多个measurement中获取数据</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM &lt;database_name&gt;.&lt;retention_policy_name&gt;.&lt;measurement_name&gt; 从某个数据库中某个保留策略中查询measurement中的数据</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select语句</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">select * : 表示查询所有的field和tag对应的值</span></span>
<span class="line"><span style="color:#24292e;">select field_key: 表示查询特定的field对应的值</span></span>
<span class="line"><span style="color:#24292e;">select tag_key: 表示查询的特定的tag对应的值</span></span>
<span class="line"><span style="color:#24292e;">SELECT &quot;&lt;field_key&gt;&quot;::field,&quot;&lt;tag_key&gt;&quot;::tag: 注意::field和::tag用来限定这个数据的类型为tag或者是field</span></span>
<span class="line"><span style="color:#24292e;">from语句</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">from后面需要接上measurement，表示从这个mesaurement中查询数据</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">FROM &lt;measurement_name&gt; 从指定的measurement中获取数据</span></span>
<span class="line"><span style="color:#24292e;">FROM &lt;measurement_name&gt;,&lt;measurement_name&gt; 从多个measurement中获取数据</span></span>
<span class="line"><span style="color:#24292e;">FROM &lt;database_name&gt;.&lt;retention_policy_name&gt;.&lt;measurement_name&gt; 从某个数据库中某个保留策略中查询measurement中的数据</span></span></code></pre></div><ul><li>列子</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; show measurements;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: measurements</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">userBaseInfo</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603201523971883 test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603207102083370 test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603211019641828 test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show tag keys from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">tagKey</span></span>
<span class="line"><span style="color:#e1e4e8;">------</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">phone</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; show measurements;</span></span>
<span class="line"><span style="color:#24292e;">name: measurements</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">add_test</span></span>
<span class="line"><span style="color:#24292e;">userBaseInfo</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1568603201523971883 test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#24292e;">1568603207102083370 test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#24292e;">1568603211019641828 test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; show tag keys from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">tagKey</span></span>
<span class="line"><span style="color:#24292e;">------</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">phone</span></span></code></pre></div><h2 id="_1-2-查询指定的field-tag的方式" tabindex="-1">1.2 查询指定的field/tag的方式 <a class="header-anchor" href="#_1-2-查询指定的field-tag的方式" aria-label="Permalink to &quot;1.2 查询指定的field/tag的方式&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select email::field ,&quot;name&quot;::tag from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                email        name</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -----        ----</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603201523971883 test@126.com YiHui</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603207102083370 test@126.com YiHui</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603211019641828 test@126.com YiHui</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select email::field ,&quot;name&quot;::tag from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                email        name</span></span>
<span class="line"><span style="color:#24292e;">----                -----        ----</span></span>
<span class="line"><span style="color:#24292e;">1568603201523971883 test@126.com YiHui</span></span>
<span class="line"><span style="color:#24292e;">1568603207102083370 test@126.com YiHui</span></span>
<span class="line"><span style="color:#24292e;">1568603211019641828 test@126.com YiHui</span></span></code></pre></div><h2 id="_1-3-保留策略数据查询" tabindex="-1">1.3 保留策略数据查询 <a class="header-anchor" href="#_1-3-保留策略数据查询" aria-label="Permalink to &quot;1.3 保留策略数据查询&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建保留策略</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; create retention policy &quot;1D&quot; duration 1d on test</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 插入一条数据</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; insert into &quot;1D&quot; yhh,name=二灰,phone=119 email=&quot;test@126.com&quot;,blog=&quot;http://sss.hhui.top&quot;,id=27</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查询</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from &quot;1D&quot;.yhh</span></span>
<span class="line"><span style="color:#e1e4e8;">name: yhh</span></span>
<span class="line"><span style="color:#e1e4e8;">time                blog                   email            id name phone</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ----                   -----            -- ---- -----</span></span>
<span class="line"><span style="color:#e1e4e8;">1565693045801509796 http://sss.top test@126.com 27 二灰   119</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建保留策略</span></span>
<span class="line"><span style="color:#24292e;">&gt; create retention policy &quot;1D&quot; duration 1d on test</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 插入一条数据</span></span>
<span class="line"><span style="color:#24292e;">&gt; insert into &quot;1D&quot; yhh,name=二灰,phone=119 email=&quot;test@126.com&quot;,blog=&quot;http://sss.hhui.top&quot;,id=27</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查询</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from &quot;1D&quot;.yhh</span></span>
<span class="line"><span style="color:#24292e;">name: yhh</span></span>
<span class="line"><span style="color:#24292e;">time                blog                   email            id name phone</span></span>
<span class="line"><span style="color:#24292e;">----                ----                   -----            -- ---- -----</span></span>
<span class="line"><span style="color:#24292e;">1565693045801509796 http://sss.top test@126.com 27 二灰   119</span></span>
<span class="line"><span style="color:#24292e;">&gt;</span></span></code></pre></div><blockquote><p>唯一需要注意的是measurement前面需要加上保留策略</p></blockquote><h1 id="二、where语句" tabindex="-1">二、Where语句 <a class="header-anchor" href="#二、where语句" aria-label="Permalink to &quot;二、Where语句&quot;">​</a></h1><ul><li>语法：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT_clause FROM_clause WHERE &lt;conditional_expression&gt; [(AND|OR) &lt;conditional_expression&gt; [...]]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT_clause FROM_clause WHERE &lt;conditional_expression&gt; [(AND|OR) &lt;conditional_expression&gt; [...]]</span></span></code></pre></div><p>where后面的条件表达式，因为influxdb中的数据可以划分为两类，这<code>两种不同的类型</code>，在构建查询语句的时候，会有一些区别</p><h2 id="_2-1-field查询条件" tabindex="-1">2.1 field查询条件 <a class="header-anchor" href="#_2-1-field查询条件" aria-label="Permalink to &quot;2.1 field查询条件&quot;">​</a></h2><ul><li>我们已知field的类型有四种：string|int|boolean|float，所以它支持的操作符有</li></ul><table><thead><tr><th>操作符</th><th>说明</th></tr></thead><tbody><tr><td>=</td><td>相等</td></tr><tr><td>&lt;&gt;, !=</td><td>不相同</td></tr><tr><td>&gt;, &gt;=</td><td>大于,大于等于</td></tr><tr><td>&lt;, &lt;=</td><td>小于,小于等于</td></tr></tbody></table><h2 id="_2-2-tag查询条件" tabindex="-1">2.2 tag查询条件 <a class="header-anchor" href="#_2-2-tag查询条件" aria-label="Permalink to &quot;2.2 tag查询条件&quot;">​</a></h2><ul><li>在influxdb中tag都是string类型，会建立索引，所以基于tag的查询效率一般来讲是优于field查询的，它支持的操作符为</li></ul><table><thead><tr><th>操作符</th><th>说明</th></tr></thead><tbody><tr><td>=</td><td>相等</td></tr><tr><td>&lt;&gt;, !=</td><td>不相同</td></tr></tbody></table><p><code>在influxdb中没有in查询，不同的查询条件可以使用and/or来连接，表示同时满足or一个满足即可</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 根据field进行查询</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from yhh where age=26</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 根据tag进行查询</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from yhh where phone!=&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 简单的运算查询</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from yhh where age + 2&gt;30</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 根据field进行查询</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from yhh where age=26</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 根据tag进行查询</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from yhh where phone!=&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 简单的运算查询</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from yhh where age + 2&gt;30</span></span></code></pre></div><ul><li>查询语句中，推荐的写法是</li></ul><blockquote><p>tag key或field key请使用双引号括起来 如果类型为string，请用单引号把过滤条件括起来</p></blockquote><h2 id="_2-3-or" tabindex="-1">2.3 or <a class="header-anchor" href="#_2-3-or" aria-label="Permalink to &quot;2.3 or&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from weather where altitude=1001 or temperature=11</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time                altitude area humidity temperature</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -------- ---- -------- -----------</span></span>
<span class="line"><span style="color:#e1e4e8;">1607656662027484500 1001     南    -5       11</span></span>
<span class="line"><span style="color:#e1e4e8;">1607656706278952000 999      南    -5       11</span></span>
<span class="line"><span style="color:#e1e4e8;">1607656751612223600 1002     西    -2       11</span></span>
<span class="line"><span style="color:#e1e4e8;">1607656799728402900 1003     东    -2       11</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from weather where altitude=1001 or temperature=11</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time                altitude area humidity temperature</span></span>
<span class="line"><span style="color:#24292e;">----                -------- ---- -------- -----------</span></span>
<span class="line"><span style="color:#24292e;">1607656662027484500 1001     南    -5       11</span></span>
<span class="line"><span style="color:#24292e;">1607656706278952000 999      南    -5       11</span></span>
<span class="line"><span style="color:#24292e;">1607656751612223600 1002     西    -2       11</span></span>
<span class="line"><span style="color:#24292e;">1607656799728402900 1003     东    -2       11</span></span></code></pre></div><h2 id="_2-4-模糊查询" tabindex="-1">2.4 模糊查询 <a class="header-anchor" href="#_2-4-模糊查询" aria-label="Permalink to &quot;2.4 模糊查询&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> * from test</span></span>
<span class="line"><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">test</span></span>
<span class="line"><span style="color:#F97583;">time</span><span style="color:#E1E4E8;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#B392F0;">----</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">---</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-----</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">------------</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span></span>
<span class="line"><span style="color:#B392F0;">1585897703920290000</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">test</span><span style="color:#E1E4E8;">         </span></span>
<span class="line"><span style="color:#B392F0;">1585897983909417000</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">test1</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#B392F0;">1585898383503216000</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">test1</span><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#B392F0;">1585901694441000000</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app1</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#B392F0;">1585901704179677000</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios1</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## =~/给定字段/ 包含指定字段的</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> * from test where monitor_name =</span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">/app/</span></span>
<span class="line"><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">test</span></span>
<span class="line"><span style="color:#F97583;">time</span><span style="color:#E1E4E8;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#B392F0;">----</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">---</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-----</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">------------</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span></span>
<span class="line"><span style="color:#B392F0;">1585901694441000000</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app1</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">3</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#=~/^给定字段/ 以指定字段开始的</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> * from test where monitor_name =</span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">/^app/</span></span>
<span class="line"><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">test</span></span>
<span class="line"><span style="color:#F97583;">time</span><span style="color:#E1E4E8;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#B392F0;">----</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">---</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-----</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">------------</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span></span>
<span class="line"><span style="color:#B392F0;">1585901694441000000</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app1</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#=~/给定字段$/ 以指定字段结尾的</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">select</span><span style="color:#E1E4E8;"> * from test where monitor_name =</span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;">/p1$/</span></span>
<span class="line"><span style="color:#B392F0;">name:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">test</span></span>
<span class="line"><span style="color:#F97583;">time</span><span style="color:#E1E4E8;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#B392F0;">----</span><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">---</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-----</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">----</span><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">------------</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">---</span></span>
<span class="line"><span style="color:#B392F0;">1585901694441000000</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ios</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">app1</span><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> * from test</span></span>
<span class="line"><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">test</span></span>
<span class="line"><span style="color:#D73A49;">time</span><span style="color:#24292E;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#6F42C1;">----</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">---</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-----</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">----</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">------------</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span></span>
<span class="line"><span style="color:#6F42C1;">1585897703920290000</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">test</span><span style="color:#24292E;">         </span></span>
<span class="line"><span style="color:#6F42C1;">1585897983909417000</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">test1</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#6F42C1;">1585898383503216000</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">test1</span><span style="color:#24292E;">        </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#6F42C1;">1585901694441000000</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app1</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#6F42C1;">1585901704179677000</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios1</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## =~/给定字段/ 包含指定字段的</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> * from test where monitor_name =</span><span style="color:#D73A49;">~</span><span style="color:#24292E;">/app/</span></span>
<span class="line"><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">test</span></span>
<span class="line"><span style="color:#D73A49;">time</span><span style="color:#24292E;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#6F42C1;">----</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">---</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-----</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">----</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">------------</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span></span>
<span class="line"><span style="color:#6F42C1;">1585901694441000000</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app1</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">3</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#=~/^给定字段/ 以指定字段开始的</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> * from test where monitor_name =</span><span style="color:#D73A49;">~</span><span style="color:#24292E;">/^app/</span></span>
<span class="line"><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">test</span></span>
<span class="line"><span style="color:#D73A49;">time</span><span style="color:#24292E;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#6F42C1;">----</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">---</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-----</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">----</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">------------</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span></span>
<span class="line"><span style="color:#6F42C1;">1585901694441000000</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app1</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#=~/给定字段$/ 以指定字段结尾的</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">select</span><span style="color:#24292E;"> * from test where monitor_name =</span><span style="color:#D73A49;">~</span><span style="color:#24292E;">/p1$/</span></span>
<span class="line"><span style="color:#6F42C1;">name:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">test</span></span>
<span class="line"><span style="color:#D73A49;">time</span><span style="color:#24292E;">                app count host      monitor_name num</span></span>
<span class="line"><span style="color:#6F42C1;">----</span><span style="color:#24292E;">                </span><span style="color:#005CC5;">---</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-----</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">----</span><span style="color:#24292E;">      </span><span style="color:#005CC5;">------------</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">---</span></span>
<span class="line"><span style="color:#6F42C1;">1585901694441000000</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ios</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">     </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">app1</span><span style="color:#24292E;">         </span><span style="color:#005CC5;">3</span></span></code></pre></div><h1 id="三、分组查询" tabindex="-1">三、分组查询 <a class="header-anchor" href="#三、分组查询" aria-label="Permalink to &quot;三、分组查询&quot;">​</a></h1><ul><li>语法：nfluxdb sql的分组也是使用group by语句</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT_clause FROM_clause [WHERE_clause] GROUP BY [* | &lt;tag_key&gt;[,&lt;tag_key]]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT_clause FROM_clause [WHERE_clause] GROUP BY [* | &lt;tag_key&gt;[,&lt;tag_key]]</span></span></code></pre></div><h2 id="_3-1-group-by-tag" tabindex="-1">3.1 group by tag <a class="header-anchor" href="#_3-1-group-by-tag" aria-label="Permalink to &quot;3.1 group by tag&quot;">​</a></h2><ul><li>用来分组的必须是tag，也就是说对于influxdb而言，不支持根据field进行分组</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看tag</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show tag keys from add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">tagKey</span></span>
<span class="line"><span style="color:#e1e4e8;">------</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">phone</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test group by phone</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">tags: phone=110</span></span>
<span class="line"><span style="color:#e1e4e8;">time                email        name  user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -----        ----  -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603201523971883 test@126.com YiHui 20</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603207102083370 test@126.com YiHui 21</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603211019641828 test@126.com YiHui 22</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看tag</span></span>
<span class="line"><span style="color:#24292e;">&gt; show tag keys from add_test</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">tagKey</span></span>
<span class="line"><span style="color:#24292e;">------</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">phone</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test group by phone</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">tags: phone=110</span></span>
<span class="line"><span style="color:#24292e;">time                email        name  user_id</span></span>
<span class="line"><span style="color:#24292e;">----                -----        ----  -------</span></span>
<span class="line"><span style="color:#24292e;">1568603201523971883 test@126.com YiHui 20</span></span>
<span class="line"><span style="color:#24292e;">1568603207102083370 test@126.com YiHui 21</span></span>
<span class="line"><span style="color:#24292e;">1568603211019641828 test@126.com YiHui 22</span></span></code></pre></div><h2 id="_3-2-group-by" tabindex="-1">3.2 group by * <a class="header-anchor" href="#_3-2-group-by" aria-label="Permalink to &quot;3.2 group by *&quot;">​</a></h2><ul><li>另外一个与一般SQL语法不一样的是group by 后面可以跟上*，表示根据所有的tag进行分组</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test group by *</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">tags: name=YiHui, phone=110</span></span>
<span class="line"><span style="color:#e1e4e8;">time                email        user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -----        -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603201523971883 test@126.com 20</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603207102083370 test@126.com 21</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603211019641828 test@126.com 22</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from add_test group by *</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">tags: name=YiHui, phone=110</span></span>
<span class="line"><span style="color:#24292e;">time                email        user_id</span></span>
<span class="line"><span style="color:#24292e;">----                -----        -------</span></span>
<span class="line"><span style="color:#24292e;">1568603201523971883 test@126.com 20</span></span>
<span class="line"><span style="color:#24292e;">1568603207102083370 test@126.com 21</span></span>
<span class="line"><span style="color:#24292e;">1568603211019641828 test@126.com 22</span></span></code></pre></div><h2 id="_3-3-group-by-time" tabindex="-1">3.3 group by time <a class="header-anchor" href="#_3-3-group-by-time" aria-label="Permalink to &quot;3.3 group by time&quot;">​</a></h2><ul><li>语法：</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT &lt;function&gt;(&lt;field_key&gt;) FROM_clause WHERE &lt;time_range&gt; GROUP BY time(&lt;time_interval&gt;),[tag_key] [fill(&lt;fill_option&gt;)]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT &lt;function&gt;(&lt;field_key&gt;) FROM_clause WHERE &lt;time_range&gt; GROUP BY time(&lt;time_interval&gt;),[tag_key] [fill(&lt;fill_option&gt;)]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 为了显示方便，将数据的时间戳改成日期方式展示</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; precision rfc3339</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603201523971883 test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603207102083370 test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#e1e4e8;">1568603211019641828 test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#只是临时修改</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; precision rfc3339</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; </span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                           email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                           -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:41.523971883Z test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:47.10208337Z  test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:51.019641828Z test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select count(*) from yhh where time&gt;&#39;2019-09-16T03:06:41.523971883Z&#39; and time&lt;&#39;2019-07-23T13:50:43.440000821Z&#39;  GROUP BY time(2m)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 为了显示方便，将数据的时间戳改成日期方式展示</span></span>
<span class="line"><span style="color:#24292e;">&gt; precision rfc3339</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test;</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">1568603201523971883 test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#24292e;">1568603207102083370 test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#24292e;">1568603211019641828 test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#只是临时修改</span></span>
<span class="line"><span style="color:#24292e;">&gt; precision rfc3339</span></span>
<span class="line"><span style="color:#24292e;">&gt; </span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test;</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                           email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                           -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:41.523971883Z test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:47.10208337Z  test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:51.019641828Z test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select count(*) from yhh where time&gt;&#39;2019-09-16T03:06:41.523971883Z&#39; and time&lt;&#39;2019-07-23T13:50:43.440000821Z&#39;  GROUP BY time(2m)</span></span></code></pre></div><ul><li><p>select后面跟上的是单个or多个field的聚合操作，根据时间进行分组时，不允许查询具体的field值</p></li><li><p>where条件限定查询的时间范围，否则会得到很多数据</p></li><li><p>group by time(2m) 表示每2分钟做一个分组， group by time(2s)则表示每2s做一个分组</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from yhh where time&gt;&#39;2019-07-23T13:44:38.654374538Z&#39; and time&lt;&#39;2019-07-23T13:50:43.440000821Z&#39;  GROUP BY time(2m)</span></span>
<span class="line"><span style="color:#e1e4e8;">ERR: GROUP BY requires at least one aggregate function</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from yhh where time&gt;&#39;2019-07-23T13:44:38.654374538Z&#39; and time&lt;&#39;2019-07-23T13:50:43.440000821Z&#39;  GROUP BY time(2m)</span></span>
<span class="line"><span style="color:#24292e;">ERR: GROUP BY requires at least one aggregate function</span></span></code></pre></div><h1 id="四、排序" tabindex="-1">四、排序 <a class="header-anchor" href="#四、排序" aria-label="Permalink to &quot;四、排序&quot;">​</a></h1><ul><li><p>在influxdb中排序，只支持针对time进行排序，其他的field，tag（因为是string类型，也没法排）是不能进行排序的</p></li><li><p>语法： 根据时间倒序/升序</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">order by time desc/asc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">order by time desc/asc</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">## 根据时间进行倒排(从高往下)</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test order by time desc</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                           email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                           -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:51.019641828Z test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:47.10208337Z  test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:41.523971883Z test@126.com YiHui 110   20</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">## 根据时间进行倒排(从高往下)</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test order by time desc</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                           email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                           -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:51.019641828Z test@126.com YiHui 110   22</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:47.10208337Z  test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:41.523971883Z test@126.com YiHui 110   20</span></span></code></pre></div><h2 id="_4-1-查询限制" tabindex="-1">4.1 查询限制 <a class="header-anchor" href="#_4-1-查询限制" aria-label="Permalink to &quot;4.1 查询限制&quot;">​</a></h2><ul><li><p>我们常见的分页就是limit语句，我们常见的limit语句为 limit page, size，可以实现分页；然而在influxdb中则不同，limit后面只能跟上一个数字，表示限定查询的最多条数</p></li><li><p>limit</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT_clause [INTO_clause] FROM_clause [WHERE_clause] [GROUP_BY_clause] [ORDER_BY_clause] LIMIT &lt;N&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">N指定每次measurement返回的point个数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT_clause [INTO_clause] FROM_clause [WHERE_clause] [GROUP_BY_clause] [ORDER_BY_clause] LIMIT &lt;N&gt;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">N指定每次measurement返回的point个数</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test limit 2</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                           email        name  phone user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                           -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:41.523971883Z test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:47.10208337Z  test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#显示一条信息</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from weather limit 1</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time                altitude area humidity temperature</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -------- ---- -------- -----------</span></span>
<span class="line"><span style="color:#e1e4e8;">1607604432455278300 1001     南    -5       10</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#limit 10 offset 15，就是从第15行开始之后的10条数据</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from weather limit 2 offset 2</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time                altitude area humidity temperature</span></span>
<span class="line"><span style="color:#e1e4e8;">----                -------- ---- -------- -----------</span></span>
<span class="line"><span style="color:#e1e4e8;">1607656662027484500 1001     南    -5       11</span></span>
<span class="line"><span style="color:#e1e4e8;">1607656706278952000 999      南    -5       11</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from add_test limit 2</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">time                           email        name  phone user_id</span></span>
<span class="line"><span style="color:#24292e;">----                           -----        ----  ----- -------</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:41.523971883Z test@126.com YiHui 110   20</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:47.10208337Z  test@126.com YiHui 110   21</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#显示一条信息</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from weather limit 1</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time                altitude area humidity temperature</span></span>
<span class="line"><span style="color:#24292e;">----                -------- ---- -------- -----------</span></span>
<span class="line"><span style="color:#24292e;">1607604432455278300 1001     南    -5       10</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#limit 10 offset 15，就是从第15行开始之后的10条数据</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from weather limit 2 offset 2</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time                altitude area humidity temperature</span></span>
<span class="line"><span style="color:#24292e;">----                -------- ---- -------- -----------</span></span>
<span class="line"><span style="color:#24292e;">1607656662027484500 1001     南    -5       11</span></span>
<span class="line"><span style="color:#24292e;">1607656706278952000 999      南    -5       11</span></span></code></pre></div><ul><li>分组之后，再限定查询条数</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from yhh group by &quot;name&quot; limit 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from yhh group by &quot;name&quot; limit 1</span></span></code></pre></div><h2 id="_4-2-slimit" tabindex="-1">4.2 slimit <a class="header-anchor" href="#_4-2-slimit" aria-label="Permalink to &quot;4.2 slimit&quot;">​</a></h2><ul><li><p>N指定从指定measurement返回的series数</p></li><li><p>语法</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT_clause [INTO_clause] FROM_clause [WHERE_clause] GROUP BY *[,time(&lt;time_interval&gt;)] [ORDER_BY_clause] SLIMIT &lt;N&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT_clause [INTO_clause] FROM_clause [WHERE_clause] GROUP BY *[,time(&lt;time_interval&gt;)] [ORDER_BY_clause] SLIMIT &lt;N&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test group by * slimit 3</span></span>
<span class="line"><span style="color:#e1e4e8;">name: add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">tags: name=YiHui, phone=110</span></span>
<span class="line"><span style="color:#e1e4e8;">time                           email        user_id</span></span>
<span class="line"><span style="color:#e1e4e8;">----                           -----        -------</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:41.523971883Z test@126.com 20</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:47.10208337Z  test@126.com 21</span></span>
<span class="line"><span style="color:#e1e4e8;">2019-09-16T03:06:51.019641828Z test@126.com 22</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select * from add_test group by * slimit 3</span></span>
<span class="line"><span style="color:#24292e;">name: add_test</span></span>
<span class="line"><span style="color:#24292e;">tags: name=YiHui, phone=110</span></span>
<span class="line"><span style="color:#24292e;">time                           email        user_id</span></span>
<span class="line"><span style="color:#24292e;">----                           -----        -------</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:41.523971883Z test@126.com 20</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:47.10208337Z  test@126.com 21</span></span>
<span class="line"><span style="color:#24292e;">2019-09-16T03:06:51.019641828Z test@126.com 22</span></span></code></pre></div><blockquote><p>slimit 有待于查看</p></blockquote><h2 id="_4-3-分页" tabindex="-1">4.3 分页 <a class="header-anchor" href="#_4-3-分页" aria-label="Permalink to &quot;4.3 分页&quot;">​</a></h2><ul><li>语法： offset来实现分页</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT_clause [INTO_clause] FROM_clause [WHERE_clause] [GROUP_BY_clause] [ORDER_BY_clause] LIMIT_clause OFFSET &lt;N&gt; [SLIMIT_clause]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT_clause [INTO_clause] FROM_clause [WHERE_clause] [GROUP_BY_clause] [ORDER_BY_clause] LIMIT_clause OFFSET &lt;N&gt; [SLIMIT_clause]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查询结果只有2条数据，从第三个开始（0开始计数）</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from add_test limit 2 offset 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查询结果只有2条数据，从第三个开始（0开始计数）</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from add_test limit 2 offset 3</span></span></code></pre></div><h2 id="_4-4-查询数据库大小" tabindex="-1">4.4 查询数据库大小 <a class="header-anchor" href="#_4-4-查询数据库大小" aria-label="Permalink to &quot;4.4 查询数据库大小&quot;">​</a></h2><p>You can see the approximate size of the InfluxDB data directory by running the following query against the <code>_internal</code> databases <code>shard</code> measurement:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">select sum(diskBytes) / 1024 / 1024 /1024 from _internal.&quot;monitor&quot;.&quot;shard&quot; where time &gt; now() - 10s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">select sum(diskBytes) / 1024 / 1024 /1024 from _internal.&quot;monitor&quot;.&quot;shard&quot; where time &gt; now() - 10s</span></span></code></pre></div><p>The result will be in gigabytes. You can also see the size per database by adding a <code>group by &quot;database&quot;</code>:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt;select sum(diskBytes) / 1024 / 1024 /1024 from _internal.&quot;monitor&quot;.&quot;shard&quot; where time &gt; now() - 10s group by &quot;database&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">name: shard</span></span>
<span class="line"><span style="color:#e1e4e8;">tags: database=_internal</span></span>
<span class="line"><span style="color:#e1e4e8;">time                sum</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ---</span></span>
<span class="line"><span style="color:#e1e4e8;">1568618563361835183 0.04565209522843361</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">name: shard</span></span>
<span class="line"><span style="color:#e1e4e8;">tags: database=hello</span></span>
<span class="line"><span style="color:#e1e4e8;">time                sum</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ---</span></span>
<span class="line"><span style="color:#e1e4e8;">1568618563361835183 8.130446076393127e-7</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">name: shard</span></span>
<span class="line"><span style="color:#e1e4e8;">tags: database=test</span></span>
<span class="line"><span style="color:#e1e4e8;">time                sum</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ---</span></span>
<span class="line"><span style="color:#e1e4e8;">1568618563361835183 0.0000015720725059509277</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt;select sum(diskBytes) / 1024 / 1024 /1024 from _internal.&quot;monitor&quot;.&quot;shard&quot; where time &gt; now() - 10s group by &quot;database&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">name: shard</span></span>
<span class="line"><span style="color:#24292e;">tags: database=_internal</span></span>
<span class="line"><span style="color:#24292e;">time                sum</span></span>
<span class="line"><span style="color:#24292e;">----                ---</span></span>
<span class="line"><span style="color:#24292e;">1568618563361835183 0.04565209522843361</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">name: shard</span></span>
<span class="line"><span style="color:#24292e;">tags: database=hello</span></span>
<span class="line"><span style="color:#24292e;">time                sum</span></span>
<span class="line"><span style="color:#24292e;">----                ---</span></span>
<span class="line"><span style="color:#24292e;">1568618563361835183 8.130446076393127e-7</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">name: shard</span></span>
<span class="line"><span style="color:#24292e;">tags: database=test</span></span>
<span class="line"><span style="color:#24292e;">time                sum</span></span>
<span class="line"><span style="color:#24292e;">----                ---</span></span>
<span class="line"><span style="color:#24292e;">1568618563361835183 0.0000015720725059509277</span></span></code></pre></div><h1 id="_6-聚合" tabindex="-1">6.聚合 <a class="header-anchor" href="#_6-聚合" aria-label="Permalink to &quot;6.聚合&quot;">​</a></h1><p><a href="https://docs.influxdata.com/influxdb/v1.7/query_language/functions/" target="_blank" rel="noreferrer">https://docs.influxdata.com/influxdb/v1.7/query_language/functions/</a></p><h3 id="聚合类" tabindex="-1">聚合类 <a class="header-anchor" href="#聚合类" aria-label="Permalink to &quot;聚合类&quot;">​</a></h3><table><thead><tr><th>函数</th><th>描述</th><th>语法</th></tr></thead><tbody><tr><td>COUNT()</td><td>返回一个字段中的非空值的数量</td><td>#SELECT COUNT( [ * |&lt;field_key&gt; |/&lt;regular_expression&gt;/ ] ) [INTO_clause] FROM_clause [WHERE_clause] [GROUP_BY_clause] [ORDER_BY_clause] [LIMIT_clause] [OFFSET_clause] [SLIMIT_clause] [SOFFSET_clause]#</td></tr><tr><td>DISTINCT()</td><td>返回一个字段去重后的唯一值</td><td>&lt;SELECT DISTINCT( [ * |&lt;field_key&gt; |/&lt;regular_expression&gt;/ ] ) FROM_clause [WHERE_clause] [GROUP_BY_clause] [ORDER_BY_clause] [LIMIT_clause] [OFFSET_clause] [SLIMIT_clause] [SOFFSET_clause]&gt;</td></tr><tr><td>INTEGRAL()</td><td>返回曲线下面的字段值</td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table><p><a href="https://blog.csdn.net/yue530tomtom/article/details/82688453" target="_blank" rel="noreferrer">https://blog.csdn.net/yue530tomtom/article/details/82688453</a></p><h2 id="_6-1count-函数" tabindex="-1">6.1count()函数 <a class="header-anchor" href="#_6-1count-函数" aria-label="Permalink to &quot;6.1count()函数&quot;">​</a></h2><p>返回一个（field）字段中的非空值的数量</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT COUNT(&lt;field_key&gt;) FROM &lt;measurement_name&gt; [WHERE &lt;stuff&gt;] [GROUP BY &lt;stuff&gt;]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select count(humidity) from weather</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time count</span></span>
<span class="line"><span style="color:#e1e4e8;">---- -----</span></span>
<span class="line"><span style="color:#e1e4e8;">0    6</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT COUNT(&lt;field_key&gt;) FROM &lt;measurement_name&gt; [WHERE &lt;stuff&gt;] [GROUP BY &lt;stuff&gt;]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select count(humidity) from weather</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time count</span></span>
<span class="line"><span style="color:#24292e;">---- -----</span></span>
<span class="line"><span style="color:#24292e;">0    6</span></span></code></pre></div><h2 id="_6-2mean-函数" tabindex="-1">6.2MEAN() 函数 <a class="header-anchor" href="#_6-2mean-函数" aria-label="Permalink to &quot;6.2MEAN() 函数&quot;">​</a></h2><p>返回一个字段（field）中的值的算术平均值（平均值）。字段类型必须是长整型或float64。</p><p>语法格式：<code>SELECT MEAN(&lt;field_key&gt;) FROM &lt;measurement_name&gt; [WHERE &lt;stuff&gt;] [GROUP BY &lt;stuff&gt;]</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; SELECT MEAN(humidity) from weather</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time mean</span></span>
<span class="line"><span style="color:#e1e4e8;">---- ----</span></span>
<span class="line"><span style="color:#e1e4e8;">0    -3.8333333333333335</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; SELECT MEAN(humidity) from weather</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time mean</span></span>
<span class="line"><span style="color:#24292e;">---- ----</span></span>
<span class="line"><span style="color:#24292e;">0    -3.8333333333333335</span></span></code></pre></div><h2 id="_6-3median-函数" tabindex="-1">6.3MEDIAN()函数 <a class="header-anchor" href="#_6-3median-函数" aria-label="Permalink to &quot;6.3MEDIAN()函数&quot;">​</a></h2><p>从单个字段（field）中的排序值返回中间值（中位数）。中值是在一组数值中居于中间的数值。字段值的类型必须是长整型或float64格式。</p><p>语法：<code>SELECT MEDIAN(&lt;field_key&gt;) FROM &lt;measurement_name&gt; [WHERE &lt;stuff&gt;] [GROUP BY &lt;stuff&gt;]</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; SELECT MEAN(humidity) from weather</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time mean</span></span>
<span class="line"><span style="color:#e1e4e8;">---- ----</span></span>
<span class="line"><span style="color:#e1e4e8;">0    -3.8333333333333335</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; SELECT MEAN(humidity) from weather</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time mean</span></span>
<span class="line"><span style="color:#24292e;">---- ----</span></span>
<span class="line"><span style="color:#24292e;">0    -3.8333333333333335</span></span></code></pre></div><h2 id="_6-4spread-函数" tabindex="-1">6.4SPREAD()函数 <a class="header-anchor" href="#_6-4spread-函数" aria-label="Permalink to &quot;6.4SPREAD()函数&quot;">​</a></h2><p><code>返回字段的最小值和最大值之间的差值。数据的类型必须是长整型或float64</code></p><p>语法：<code>SELECT SPREAD(&lt;field_key&gt;) FROM &lt;measurement_name&gt; [WHERE &lt;stuff&gt;] [GROUP BY &lt;stuff&gt;]</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select spread(humidity) from weather</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time spread</span></span>
<span class="line"><span style="color:#e1e4e8;">---- ------</span></span>
<span class="line"><span style="color:#e1e4e8;">0    3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select spread(humidity) from weather</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time spread</span></span>
<span class="line"><span style="color:#24292e;">---- ------</span></span>
<span class="line"><span style="color:#24292e;">0    3</span></span></code></pre></div><h2 id="_6-5sum-函数" tabindex="-1">6.5SUM()函数 <a class="header-anchor" href="#_6-5sum-函数" aria-label="Permalink to &quot;6.5SUM()函数&quot;">​</a></h2><p>返回一个字段中的所有值的和。字段的类型必须是长整型或float64。</p><p>语法：<code>SELECT SUM(&lt;field_key&gt;) FROM &lt;measurement_name&gt; [WHERE &lt;stuff&gt;] [GROUP BY &lt;stuff&gt;</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select sum(humidity) from weather</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time sum</span></span>
<span class="line"><span style="color:#e1e4e8;">---- ---</span></span>
<span class="line"><span style="color:#e1e4e8;">0    -23</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select sum(humidity) from weather</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time sum</span></span>
<span class="line"><span style="color:#24292e;">---- ---</span></span>
<span class="line"><span style="color:#24292e;">0    -23</span></span></code></pre></div><h2 id="_6-6integral-函数" tabindex="-1">6.6INTEGRAL()函数 <a class="header-anchor" href="#_6-6integral-函数" aria-label="Permalink to &quot;6.6INTEGRAL()函数&quot;">​</a></h2><p>返回曲线</p><p>语法：<code>SELECT INTEGRAL( [ * | &lt;field_key&gt; | /&lt;regular_expression&gt;/ ] [ , &lt;unit&gt; ] ) [INTO_clause] FROM_clause [WHERE_clause] [GROUP_BY_clause] [ORDER_BY_clause] [LIMIT_clause] [OFFSET_clause] [SLIMIT_clause] [SOFFSET_clause]\`\` </code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select INTEGRAL(temperature) from weather</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time integral</span></span>
<span class="line"><span style="color:#e1e4e8;">---- --------</span></span>
<span class="line"><span style="color:#e1e4e8;">0    497728.82358215</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select INTEGRAL(temperature) from weather</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time integral</span></span>
<span class="line"><span style="color:#24292e;">---- --------</span></span>
<span class="line"><span style="color:#24292e;">0    497728.82358215</span></span></code></pre></div><h2 id="_6-7distinc-函数" tabindex="-1">6.7distinc()函数 <a class="header-anchor" href="#_6-7distinc-函数" aria-label="Permalink to &quot;6.7distinc()函数&quot;">​</a></h2><p>去重</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; select distinct(temperature) from weather</span></span>
<span class="line"><span style="color:#e1e4e8;">name: weather</span></span>
<span class="line"><span style="color:#e1e4e8;">time distinct</span></span>
<span class="line"><span style="color:#e1e4e8;">---- --------</span></span>
<span class="line"><span style="color:#e1e4e8;">0    10</span></span>
<span class="line"><span style="color:#e1e4e8;">0    9</span></span>
<span class="line"><span style="color:#e1e4e8;">0    11</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; select distinct(temperature) from weather</span></span>
<span class="line"><span style="color:#24292e;">name: weather</span></span>
<span class="line"><span style="color:#24292e;">time distinct</span></span>
<span class="line"><span style="color:#24292e;">---- --------</span></span>
<span class="line"><span style="color:#24292e;">0    10</span></span>
<span class="line"><span style="color:#24292e;">0    9</span></span>
<span class="line"><span style="color:#24292e;">0    11</span></span></code></pre></div><h1 id="_7-连续查询" tabindex="-1">7.连续查询 <a class="header-anchor" href="#_7-连续查询" aria-label="Permalink to &quot;7.连续查询&quot;">​</a></h1><p>当数据超过保存策略里指定的时间之后就会被删除，但是这时候可能并不想数据被完全删掉，怎么办？ influxdb提供了联系查询，可以做数据统计采样。</p><ul><li>查看数据库的Continous Queries</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">show continuous queries</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">show continuous queries</span></span></code></pre></div><ul><li>创建新的Continous Queries</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">create continous query cq_name on db_name begin select sum(count) into new_table_name from table_name group by time(30m) end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">create continous query cq_name on db_name begin select sum(count) into new_table_name from table_name group by time(30m) end</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">- cq_name：连续查询名字；</span></span>
<span class="line"><span style="color:#e1e4e8;">- db_name：数据库名字；</span></span>
<span class="line"><span style="color:#e1e4e8;">- sum(count)：计算总和；</span></span>
<span class="line"><span style="color:#e1e4e8;">- table_name：当前表名；</span></span>
<span class="line"><span style="color:#e1e4e8;">- new_table_name：存新的数据的表名；</span></span>
<span class="line"><span style="color:#e1e4e8;">- 30m：时间间隔为30分钟</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">- cq_name：连续查询名字；</span></span>
<span class="line"><span style="color:#24292e;">- db_name：数据库名字；</span></span>
<span class="line"><span style="color:#24292e;">- sum(count)：计算总和；</span></span>
<span class="line"><span style="color:#24292e;">- table_name：当前表名；</span></span>
<span class="line"><span style="color:#24292e;">- new_table_name：存新的数据的表名；</span></span>
<span class="line"><span style="color:#24292e;">- 30m：时间间隔为30分钟</span></span></code></pre></div><ul><li>删除Continous Queries</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">drop continous query cp_name on db_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">drop continous query cp_name on db_name</span></span></code></pre></div><h1 id="_8-其他操作" tabindex="-1">8.其他操作 <a class="header-anchor" href="#_8-其他操作" aria-label="Permalink to &quot;8.其他操作&quot;">​</a></h1><h2 id="_7-1查询操作" tabindex="-1">7.1查询操作 <a class="header-anchor" href="#_7-1查询操作" aria-label="Permalink to &quot;7.1查询操作&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#----综合使用</span></span>
<span class="line"><span style="color:#e1e4e8;">书写顺序</span></span>
<span class="line"><span style="color:#e1e4e8;">select distinct * from &#39;表名&#39; where &#39;限制条件&#39;  group by &#39;分组依据&#39; having &#39;过滤条件&#39; order by  limit &#39;展示条数&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">执行顺序</span></span>
<span class="line"><span style="color:#e1e4e8;">from       -- 查询</span></span>
<span class="line"><span style="color:#e1e4e8;">where      -- 限制条件</span></span>
<span class="line"><span style="color:#e1e4e8;">group by   -- 分组</span></span>
<span class="line"><span style="color:#e1e4e8;">having     -- 过滤条件</span></span>
<span class="line"><span style="color:#e1e4e8;">order by   -- 排序</span></span>
<span class="line"><span style="color:#e1e4e8;">limit      -- 展示条数</span></span>
<span class="line"><span style="color:#e1e4e8;">distinct   -- 去重</span></span>
<span class="line"><span style="color:#e1e4e8;">select     -- 查询的结果</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#----综合使用</span></span>
<span class="line"><span style="color:#24292e;">书写顺序</span></span>
<span class="line"><span style="color:#24292e;">select distinct * from &#39;表名&#39; where &#39;限制条件&#39;  group by &#39;分组依据&#39; having &#39;过滤条件&#39; order by  limit &#39;展示条数&#39;</span></span>
<span class="line"><span style="color:#24292e;">执行顺序</span></span>
<span class="line"><span style="color:#24292e;">from       -- 查询</span></span>
<span class="line"><span style="color:#24292e;">where      -- 限制条件</span></span>
<span class="line"><span style="color:#24292e;">group by   -- 分组</span></span>
<span class="line"><span style="color:#24292e;">having     -- 过滤条件</span></span>
<span class="line"><span style="color:#24292e;">order by   -- 排序</span></span>
<span class="line"><span style="color:#24292e;">limit      -- 展示条数</span></span>
<span class="line"><span style="color:#24292e;">distinct   -- 去重</span></span>
<span class="line"><span style="color:#24292e;">select     -- 查询的结果</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查询最新表数据</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from talbe_name order by time desc limit 2;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查询最新表数据</span></span>
<span class="line"><span style="color:#24292e;">select * from talbe_name order by time desc limit 2;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SHOW FIELD KEYS --查看当前数据库所有表的字段</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW series from pay --查看key数据</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW TAG KEYS FROM &quot;pay&quot; --查看key中tag key值</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW TAG VALUES FROM &quot;pay&quot; WITH KEY = &quot;merId&quot; --查看key中tag 指定key值对应的值</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW TAG VALUES FROM cpu WITH KEY IN (&quot;region&quot;, &quot;host&quot;) WHERE service = &#39;redis&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">DROP SERIES FROM &lt;measurement_name[,measurement_name]&gt; WHERE &lt;tag_key&gt;=&#39;&lt;tag_value&gt;&#39; --删除key</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW CONTINUOUS QUERIES   --查看连续执行命令</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW QUERIES  --查看最后执行命令</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">KILL QUERY &lt;qid&gt; --结束命令</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW RETENTION POLICIES ON mydb  --查看保留数据</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查询数据</span></span>
<span class="line"><span style="color:#e1e4e8;">SELECT * FROM /.*/ LIMIT 1  --查询当前数据库下所有表的第一行记录</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from pay  order by time desc limit 2</span></span>
<span class="line"><span style="color:#e1e4e8;">select * from  db_name.&quot;POLICIES name&quot;.measurement_name --指定查询数据库下数据保留中的表数据 POLICIES name数据保留</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">删除数据</span></span>
<span class="line"><span style="color:#e1e4e8;">delete from &quot;query&quot; --删除表所有数据，则表就不存在了</span></span>
<span class="line"><span style="color:#e1e4e8;">drop MEASUREMENT &quot;query&quot;   --删除表（注意会把数据保留删除使用delete不会）</span></span>
<span class="line"><span style="color:#e1e4e8;">DELETE FROM cpu</span></span>
<span class="line"><span style="color:#e1e4e8;">DELETE FROM cpu WHERE time &lt; &#39;2000-01-01T00:00:00Z&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">DELETE WHERE time &lt; &#39;2000-01-01T00:00:00Z&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP DATABASE “testDB” --删除数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP RETENTION POLICY &quot;dbbak&quot; ON mydb --删除保留数据为dbbak数据</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP SERIES from pay where tag_key=&#39;&#39; --删除key中的tag</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW SHARDS  --查看数据存储文件</span></span>
<span class="line"><span style="color:#e1e4e8;">DROP SHARD 1</span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW SHARD GROUPS</span></span>
<span class="line"><span style="color:#e1e4e8;">SHOW SUBSCRIPTIONS</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SHOW FIELD KEYS --查看当前数据库所有表的字段</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW series from pay --查看key数据</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW TAG KEYS FROM &quot;pay&quot; --查看key中tag key值</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW TAG VALUES FROM &quot;pay&quot; WITH KEY = &quot;merId&quot; --查看key中tag 指定key值对应的值</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW TAG VALUES FROM cpu WITH KEY IN (&quot;region&quot;, &quot;host&quot;) WHERE service = &#39;redis&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">DROP SERIES FROM &lt;measurement_name[,measurement_name]&gt; WHERE &lt;tag_key&gt;=&#39;&lt;tag_value&gt;&#39; --删除key</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW CONTINUOUS QUERIES   --查看连续执行命令</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW QUERIES  --查看最后执行命令</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">KILL QUERY &lt;qid&gt; --结束命令</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW RETENTION POLICIES ON mydb  --查看保留数据</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查询数据</span></span>
<span class="line"><span style="color:#24292e;">SELECT * FROM /.*/ LIMIT 1  --查询当前数据库下所有表的第一行记录</span></span>
<span class="line"><span style="color:#24292e;">select * from pay  order by time desc limit 2</span></span>
<span class="line"><span style="color:#24292e;">select * from  db_name.&quot;POLICIES name&quot;.measurement_name --指定查询数据库下数据保留中的表数据 POLICIES name数据保留</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">删除数据</span></span>
<span class="line"><span style="color:#24292e;">delete from &quot;query&quot; --删除表所有数据，则表就不存在了</span></span>
<span class="line"><span style="color:#24292e;">drop MEASUREMENT &quot;query&quot;   --删除表（注意会把数据保留删除使用delete不会）</span></span>
<span class="line"><span style="color:#24292e;">DELETE FROM cpu</span></span>
<span class="line"><span style="color:#24292e;">DELETE FROM cpu WHERE time &lt; &#39;2000-01-01T00:00:00Z&#39;</span></span>
<span class="line"><span style="color:#24292e;">DELETE WHERE time &lt; &#39;2000-01-01T00:00:00Z&#39;</span></span>
<span class="line"><span style="color:#24292e;">DROP DATABASE “testDB” --删除数据库</span></span>
<span class="line"><span style="color:#24292e;">DROP RETENTION POLICY &quot;dbbak&quot; ON mydb --删除保留数据为dbbak数据</span></span>
<span class="line"><span style="color:#24292e;">DROP SERIES from pay where tag_key=&#39;&#39; --删除key中的tag</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SHOW SHARDS  --查看数据存储文件</span></span>
<span class="line"><span style="color:#24292e;">DROP SHARD 1</span></span>
<span class="line"><span style="color:#24292e;">SHOW SHARD GROUPS</span></span>
<span class="line"><span style="color:#24292e;">SHOW SUBSCRIPTIONS</span></span></code></pre></div><p><a href="https://blog.csdn.net/vtnews/article/details/80197045?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165132454816781432975844%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&amp;request_id=165132454816781432975844&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-13-80197045.142%5Ev9%5Epc_search_result_cache,157%5Ev4%5Enew_style&amp;utm_term=InfluxDB+DTDB+%E5%AF%B9%E6%AF%94&amp;spm=1018.2226.3001.4187" target="_blank" rel="noreferrer">https://blog.csdn.net/vtnews/article/details/80197045?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165132454816781432975844%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&amp;request_id=165132454816781432975844&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-13-80197045.142^v9^pc_search_result_cache,157^v4^new_style&amp;utm_term=InfluxDB+DTDB+对比&amp;spm=1018.2226.3001.4187</a></p>`,118),o=[p];function t(c,r,i,y,d,E){return a(),n("div",null,o)}const h=s(l,[["render",t]]);export{m as __pageData,h as default};
