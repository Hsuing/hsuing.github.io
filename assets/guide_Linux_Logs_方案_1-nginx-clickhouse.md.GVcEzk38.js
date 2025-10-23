import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.部署clickhosue","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Logs/方案/1-nginx-clickhouse.md","filePath":"guide/Linux/Logs/方案/1-nginx-clickhouse.md","lastUpdated":1730282162000}'),p={name:"guide/Linux/Logs/方案/1-nginx-clickhouse.md"},o=l(`<h1 id="_1-部署clickhosue" tabindex="-1">1.部署clickhosue <a class="header-anchor" href="#_1-部署clickhosue" aria-label="Permalink to &quot;1.部署clickhosue&quot;">​</a></h1><h2 id="_1-1-安装" tabindex="-1">1.1 安装 <a class="header-anchor" href="#_1-1-安装" aria-label="Permalink to &quot;1.1 安装&quot;">​</a></h2><h2 id="_1-2-创建数据库" tabindex="-1">1.2 创建数据库 <a class="header-anchor" href="#_1-2-创建数据库" aria-label="Permalink to &quot;1.2 创建数据库&quot;">​</a></h2><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#创建库</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">DATABASE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IF</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">NOT</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">EXISTS</span><span style="color:#E1E4E8;"> nginxlogs ENGINE</span><span style="color:#F97583;">=Atomic</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#创建表</span></span>
<span class="line"><span style="color:#F97583;">CREATE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">TABLE</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">nginxlogs</span><span style="color:#E1E4E8;">.nginx_access</span></span>
<span class="line"><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`timestamp\`</span><span style="color:#E1E4E8;"> DateTime64(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Asia/Shanghai&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`server_ip\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`domain\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`request_method\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`status\`</span><span style="color:#E1E4E8;"> Int32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`top_path\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`path\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`query\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`protocol\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`referer\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`upstreamhost\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`responsetime\`</span><span style="color:#E1E4E8;"> Float32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`upstreamtime\`</span><span style="color:#E1E4E8;"> Float32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`duration\`</span><span style="color:#E1E4E8;"> Float32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`request_length\`</span><span style="color:#E1E4E8;"> Int32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`response_length\`</span><span style="color:#E1E4E8;"> Int32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_ip\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_latitude\`</span><span style="color:#E1E4E8;"> Float32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_longitude\`</span><span style="color:#E1E4E8;"> Float32,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`remote_user\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`remote_ip\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`xff\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_city\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_region\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_country\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`http_user_agent\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_browser_family\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_browser_major\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_os_family\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_os_major\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_device_brand\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`client_device_model\`</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">\`createdtime\`</span><span style="color:#E1E4E8;"> DateTime64(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Asia/Shanghai&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">ENGINE </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MergeTree</span></span>
<span class="line"><span style="color:#F97583;">PARTITION</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">BY</span><span style="color:#E1E4E8;"> toYYYYMMDD(</span><span style="color:#F97583;">timestamp</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">PRIMARY KEY</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">timestamp</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;"> server_ip,</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">status</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;"> top_path,</span></span>
<span class="line"><span style="color:#E1E4E8;"> domain,</span></span>
<span class="line"><span style="color:#E1E4E8;"> upstreamhost,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_ip,</span></span>
<span class="line"><span style="color:#E1E4E8;"> remote_user,</span></span>
<span class="line"><span style="color:#E1E4E8;"> request_method,</span></span>
<span class="line"><span style="color:#E1E4E8;"> protocol,</span></span>
<span class="line"><span style="color:#E1E4E8;"> responsetime,</span></span>
<span class="line"><span style="color:#E1E4E8;"> upstreamtime,</span></span>
<span class="line"><span style="color:#E1E4E8;"> duration,</span></span>
<span class="line"><span style="color:#E1E4E8;"> request_length,</span></span>
<span class="line"><span style="color:#E1E4E8;"> response_length,</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">path</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;"> referer,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_city,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_region,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_country,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_browser_family,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_browser_major,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_os_family,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_os_major,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_device_brand,</span></span>
<span class="line"><span style="color:#E1E4E8;"> client_device_model</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">TTL toDateTime(</span><span style="color:#F97583;">timestamp</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> toIntervalDay(</span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">SETTINGS index_granularity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8192</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#创建库</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">DATABASE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IF</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">NOT</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">EXISTS</span><span style="color:#24292E;"> nginxlogs ENGINE</span><span style="color:#D73A49;">=Atomic</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#创建表</span></span>
<span class="line"><span style="color:#D73A49;">CREATE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">TABLE</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">nginxlogs</span><span style="color:#24292E;">.nginx_access</span></span>
<span class="line"><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`timestamp\`</span><span style="color:#24292E;"> DateTime64(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Asia/Shanghai&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`server_ip\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`domain\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`request_method\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`status\`</span><span style="color:#24292E;"> Int32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`top_path\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`path\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`query\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`protocol\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`referer\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`upstreamhost\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`responsetime\`</span><span style="color:#24292E;"> Float32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`upstreamtime\`</span><span style="color:#24292E;"> Float32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`duration\`</span><span style="color:#24292E;"> Float32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`request_length\`</span><span style="color:#24292E;"> Int32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`response_length\`</span><span style="color:#24292E;"> Int32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_ip\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_latitude\`</span><span style="color:#24292E;"> Float32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_longitude\`</span><span style="color:#24292E;"> Float32,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`remote_user\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`remote_ip\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`xff\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_city\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_region\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_country\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`http_user_agent\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_browser_family\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_browser_major\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_os_family\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_os_major\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_device_brand\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`client_device_model\`</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">\`createdtime\`</span><span style="color:#24292E;"> DateTime64(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Asia/Shanghai&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">ENGINE </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MergeTree</span></span>
<span class="line"><span style="color:#D73A49;">PARTITION</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">BY</span><span style="color:#24292E;"> toYYYYMMDD(</span><span style="color:#D73A49;">timestamp</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">PRIMARY KEY</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">timestamp</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;"> server_ip,</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">status</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;"> top_path,</span></span>
<span class="line"><span style="color:#24292E;"> domain,</span></span>
<span class="line"><span style="color:#24292E;"> upstreamhost,</span></span>
<span class="line"><span style="color:#24292E;"> client_ip,</span></span>
<span class="line"><span style="color:#24292E;"> remote_user,</span></span>
<span class="line"><span style="color:#24292E;"> request_method,</span></span>
<span class="line"><span style="color:#24292E;"> protocol,</span></span>
<span class="line"><span style="color:#24292E;"> responsetime,</span></span>
<span class="line"><span style="color:#24292E;"> upstreamtime,</span></span>
<span class="line"><span style="color:#24292E;"> duration,</span></span>
<span class="line"><span style="color:#24292E;"> request_length,</span></span>
<span class="line"><span style="color:#24292E;"> response_length,</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">path</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;"> referer,</span></span>
<span class="line"><span style="color:#24292E;"> client_city,</span></span>
<span class="line"><span style="color:#24292E;"> client_region,</span></span>
<span class="line"><span style="color:#24292E;"> client_country,</span></span>
<span class="line"><span style="color:#24292E;"> client_browser_family,</span></span>
<span class="line"><span style="color:#24292E;"> client_browser_major,</span></span>
<span class="line"><span style="color:#24292E;"> client_os_family,</span></span>
<span class="line"><span style="color:#24292E;"> client_os_major,</span></span>
<span class="line"><span style="color:#24292E;"> client_device_brand,</span></span>
<span class="line"><span style="color:#24292E;"> client_device_model</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">TTL toDateTime(</span><span style="color:#D73A49;">timestamp</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> toIntervalDay(</span><span style="color:#005CC5;">30</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">SETTINGS index_granularity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8192</span><span style="color:#24292E;">;</span></span></code></pre></div><h2 id="_1-3-创建用户" tabindex="-1">1.3 创建用户 <a class="header-anchor" href="#_1-3-创建用户" aria-label="Permalink to &quot;1.3 创建用户&quot;">​</a></h2><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">在user.xml中添加</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">users</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">		&lt;</span><span style="color:#85E89D;">root</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">&gt;123456&lt;/</span><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">                &lt;</span><span style="color:#85E89D;">ip</span><span style="color:#E1E4E8;">&gt;::/0&lt;/</span><span style="color:#85E89D;">ip</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;/</span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">profile</span><span style="color:#E1E4E8;">&gt;default&lt;/</span><span style="color:#85E89D;">profile</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            &lt;</span><span style="color:#85E89D;">quota</span><span style="color:#E1E4E8;">&gt;default&lt;/</span><span style="color:#85E89D;">quota</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;/</span><span style="color:#85E89D;">root</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">users</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">在user.xml中添加</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">users</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">		&lt;</span><span style="color:#22863A;">root</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">password</span><span style="color:#24292E;">&gt;123456&lt;/</span><span style="color:#22863A;">password</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">networks</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">                &lt;</span><span style="color:#22863A;">ip</span><span style="color:#24292E;">&gt;::/0&lt;/</span><span style="color:#22863A;">ip</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;/</span><span style="color:#22863A;">networks</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">profile</span><span style="color:#24292E;">&gt;default&lt;/</span><span style="color:#22863A;">profile</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">            &lt;</span><span style="color:#22863A;">quota</span><span style="color:#24292E;">&gt;default&lt;/</span><span style="color:#22863A;">quota</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;/</span><span style="color:#22863A;">root</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">users</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h1 id="_2-部署grafana" tabindex="-1">2.部署grafana <a class="header-anchor" href="#_2-部署grafana" aria-label="Permalink to &quot;2.部署grafana&quot;">​</a></h1><h2 id="_2-1-安装" tabindex="-1">2.1 安装 <a class="header-anchor" href="#_2-1-安装" aria-label="Permalink to &quot;2.1 安装&quot;">​</a></h2><p>看grafana章节</p><h2 id="_2-2-安装clickhouse插件" tabindex="-1">2.2 安装clickhouse插件 <a class="header-anchor" href="#_2-2-安装clickhouse插件" aria-label="Permalink to &quot;2.2 安装clickhouse插件&quot;">​</a></h2><p>clickhouse 数据源插件有两种，</p><p>1.<a href="https://grafana.com/grafana/plugins/vertamedia-clickhouse-datasource/?tab=installation" target="_blank" rel="noreferrer">Altinity plugin for ClickHouse</a></p><p>2.<a href="https://grafana.com/grafana/plugins/grafana-clickhouse-datasource/" target="_blank" rel="noreferrer">ClickHouse</a></p><p>按照说明，官方的clickHouse插件只支持<code>ClickHouse 22.7+</code>版本，</p><p>ClickHouse 22版本以下，选择<code>Altinity plugin for ClickHouse</code>这个插件</p><h3 id="_1-图形安装" tabindex="-1">1.图形安装 <a class="header-anchor" href="#_1-图形安装" aria-label="Permalink to &quot;1.图形安装&quot;">​</a></h3><ol><li>From the <strong>Connections</strong> page in the sidebar, select the <strong>Add new connection</strong> tab.</li><li>Search for <strong>ClickHouse</strong> and click on the signed plugin by Grafana Labs:</li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202410301432960.png" alt="Select the ClickHouse plugin on the connections page"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202410301433647.png" alt="Install the ClickHouse plugin"></p><h3 id="_2-命令安装" tabindex="-1">2.命令安装 <a class="header-anchor" href="#_2-命令安装" aria-label="Permalink to &quot;2.命令安装&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">grafana-cli plugins install vertamedia-clickhouse-datasource</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">grafana-cli plugins install vertamedia-clickhouse-datasource</span></span></code></pre></div><h3 id="_3-离线安装" tabindex="-1">3.离线安装 <a class="header-anchor" href="#_3-离线安装" aria-label="Permalink to &quot;3.离线安装&quot;">​</a></h3><p>下载地址，<a href="https://grafana.com/grafana/plugins/" target="_blank" rel="noreferrer">https://grafana.com/grafana/plugins/</a></p><p>下载离线包，放到指定目录下（/var/lib/grafana/plugins）进行解压，重启服务即可</p><h2 id="_2-3-添加数据源" tabindex="-1">2.3 添加数据源 <a class="header-anchor" href="#_2-3-添加数据源" aria-label="Permalink to &quot;2.3 添加数据源&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202410301435642.png" alt="image-20241030143529814"></p><ul><li>填写数据库ip和端口，其他保持不变</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202410301436012.png" alt="image-20241030143621500"></p><ul><li>填写用户名和密码，其他保持不变</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202410301437750.png" alt="image-20241030143742182"></p><p>最后点击保存和测试</p><h1 id="_3-部署vector" tabindex="-1">3.部署vector <a class="header-anchor" href="#_3-部署vector" aria-label="Permalink to &quot;3.部署vector&quot;">​</a></h1>`,32),e=[o];function t(c,r,E,i,y,g){return n(),a("div",null,e)}const _=s(p,[["render",t]]);export{u as __pageData,_ as default};
