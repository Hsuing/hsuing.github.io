import{_ as a,D as e,o as n,c as l,I as p,w as o,R as t,a as c}from"./chunks/framework.zUbWieqp.js";const v=JSON.parse('{"title":"1. HttpAPI","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/10-httpapi.md","filePath":"guide/Database/influxdb/10-httpapi.md","lastUpdated":1720606881000}'),r={name:"guide/Database/influxdb/10-httpapi.md"},u=t(`<h1 id="_1-httpapi" tabindex="-1">1. HttpAPI <a class="header-anchor" href="#_1-httpapi" aria-label="Permalink to &quot;1. HttpAPI&quot;">​</a></h1><p><a href="https://docs.influxdata.com/influxdb/v1.7/tools/api/" target="_blank" rel="noreferrer">官方文档1.7</a></p><table><thead><tr><th>Endpoint</th><th>Description</th></tr></thead><tbody><tr><td>/debug/requests</td><td>测试某时间段的用户（client）query或write的情况。</td></tr><tr><td>/ping</td><td>测试数据库状态，返回204则正常</td></tr><tr><td>/query</td><td>查询的请求</td></tr><tr><td>/write</td><td>写入数据的请求</td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ curl http://localhost:8086/debug/requests?seconds=60</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;user1:123.45.678.91&quot;: {&quot;writes&quot;:3,&quot;queries&quot;:0},</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;user1:000.0.0.0&quot;: {&quot;writes&quot;:0,&quot;queries&quot;:16},</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;user2:xx.xx.xxx.xxx&quot;: {&quot;writes&quot;:4,&quot;queries&quot;:0}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@pg02 influxdb]# curl -sl -I localhost:8086/ping</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#e1e4e8;">Request-Id: 0cd8f6b3-2a3f-11eb-8015-525400a367e0</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Influxdb-Version: 1.7.0</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Request-Id: 0cd8f6b3-2a3f-11eb-8015-525400a367e0</span></span>
<span class="line"><span style="color:#e1e4e8;">Date: Thu, 19 Nov 2020 08:13:05 GMT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ curl http://localhost:8086/debug/requests?seconds=60</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">&quot;user1:123.45.678.91&quot;: {&quot;writes&quot;:3,&quot;queries&quot;:0},</span></span>
<span class="line"><span style="color:#24292e;">&quot;user1:000.0.0.0&quot;: {&quot;writes&quot;:0,&quot;queries&quot;:16},</span></span>
<span class="line"><span style="color:#24292e;">&quot;user2:xx.xx.xxx.xxx&quot;: {&quot;writes&quot;:4,&quot;queries&quot;:0}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@pg02 influxdb]# curl -sl -I localhost:8086/ping</span></span>
<span class="line"><span style="color:#24292e;">HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#24292e;">Request-Id: 0cd8f6b3-2a3f-11eb-8015-525400a367e0</span></span>
<span class="line"><span style="color:#24292e;">X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#24292e;">X-Influxdb-Version: 1.7.0</span></span>
<span class="line"><span style="color:#24292e;">X-Request-Id: 0cd8f6b3-2a3f-11eb-8015-525400a367e0</span></span>
<span class="line"><span style="color:#24292e;">Date: Thu, 19 Nov 2020 08:13:05 GMT</span></span></code></pre></div><h2 id="_1-1-query" tabindex="-1">1.1 query <a class="header-anchor" href="#_1-1-query" aria-label="Permalink to &quot;1.1 query&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">GET http://localhost:8086/query</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">POST http://localhost:8086/query</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">GET http://localhost:8086/query</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">POST http://localhost:8086/query</span></span></code></pre></div><table><thead><tr><th>Verb</th><th>Query Type</th></tr></thead><tbody><tr><td>GET</td><td>使用场景: <code>SELECT</code>, <code>SHOW</code></td></tr><tr><td>POST</td><td>使用场景:<code>SELECT INTO</code>, <code>ALTER</code>, <code>CREATE</code>, <code>DELETE</code>, <code>DROP</code>, <code>GRANT</code>, <code>KILL</code>, <code>REVOKE</code></td></tr></tbody></table><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@pg02 influxdb]# curl -G &#39;http://localhost:8086/query?db=test&#39; --data-urlencode &#39;q=SELECT * FROM &quot;table&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;error&quot;:&quot;unable to parse authentication credentials&quot;}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@pg02 influxdb]# curl -G &#39;http://localhost:8086/query?db=test&amp;u=admin&amp;p=123456&#39; --data-urlencode &#39;q=SELECT * FROM &quot;table&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">{&quot;results&quot;:[{&quot;statement_id&quot;:0,&quot;series&quot;:[{&quot;name&quot;:&quot;table&quot;,&quot;columns&quot;:[&quot;time&quot;,&quot;dd&quot;],&quot;values&quot;:[[&quot;2020-11-19T07:52:57.33605989Z&quot;,44]]}]}]}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -XPOST &#39;http://localhost:8086/query?db=mydb&#39; --data-urlencode &#39;q=SELECT * INTO &quot;newmeas&quot; FROM &quot;mymeas&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -XPOST &#39;http://localhost:8086/query&#39; --data-urlencode &#39;q=CREATE DATABASE &quot;mydb&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -XPOST &#39;http://localhost:8086/query?u=myusername&amp;p=mypassword&#39; --data-urlencode &#39;q=CREATE DATABASE &quot;mydb&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -G &#39;http://localhost:8086/query?db=mydb&amp;epoch=s&#39; --data-urlencode &#39;q=SELECT * FROM &quot;mymeas&quot;;SELECT mean(&quot;myfield&quot;) FROM &quot;mymeas&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -H &quot;Accept: application/csv&quot; -G &#39;http://localhost:8086/query?db=mydb&#39; --data-urlencode &#39;q=SELECT * FROM &quot;mymeas&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">// 返回svg格式</span></span>
<span class="line"><span style="color:#e1e4e8;">name,tags,time,myfield,mytag1,mytag2</span></span>
<span class="line"><span style="color:#e1e4e8;">mymeas,,1488327378000000000,33.1,mytag1,mytag2</span></span>
<span class="line"><span style="color:#e1e4e8;">mymeas,,1488327438000000000,12.4,12,14</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -G &#39;http://localhost:8086/query?db=mydb&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">--data-urlencode &#39;q=SELECT * FROM &quot;mymeas&quot; WHERE &quot;mytag1&quot; = $tag_value AND  &quot;myfield&quot; &lt; $field_value&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">--data-urlencode &#39;params={&quot;tag_value&quot;:&quot;12&quot;,&quot;field_value&quot;:30}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@pg02 influxdb]# curl -G &#39;http://localhost:8086/query?db=test&#39; --data-urlencode &#39;q=SELECT * FROM &quot;table&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">{&quot;error&quot;:&quot;unable to parse authentication credentials&quot;}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@pg02 influxdb]# curl -G &#39;http://localhost:8086/query?db=test&amp;u=admin&amp;p=123456&#39; --data-urlencode &#39;q=SELECT * FROM &quot;table&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">{&quot;results&quot;:[{&quot;statement_id&quot;:0,&quot;series&quot;:[{&quot;name&quot;:&quot;table&quot;,&quot;columns&quot;:[&quot;time&quot;,&quot;dd&quot;],&quot;values&quot;:[[&quot;2020-11-19T07:52:57.33605989Z&quot;,44]]}]}]}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ curl -XPOST &#39;http://localhost:8086/query?db=mydb&#39; --data-urlencode &#39;q=SELECT * INTO &quot;newmeas&quot; FROM &quot;mymeas&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ curl -XPOST &#39;http://localhost:8086/query&#39; --data-urlencode &#39;q=CREATE DATABASE &quot;mydb&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ curl -XPOST &#39;http://localhost:8086/query?u=myusername&amp;p=mypassword&#39; --data-urlencode &#39;q=CREATE DATABASE &quot;mydb&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ curl -G &#39;http://localhost:8086/query?db=mydb&amp;epoch=s&#39; --data-urlencode &#39;q=SELECT * FROM &quot;mymeas&quot;;SELECT mean(&quot;myfield&quot;) FROM &quot;mymeas&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ curl -H &quot;Accept: application/csv&quot; -G &#39;http://localhost:8086/query?db=mydb&#39; --data-urlencode &#39;q=SELECT * FROM &quot;mymeas&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">// 返回svg格式</span></span>
<span class="line"><span style="color:#24292e;">name,tags,time,myfield,mytag1,mytag2</span></span>
<span class="line"><span style="color:#24292e;">mymeas,,1488327378000000000,33.1,mytag1,mytag2</span></span>
<span class="line"><span style="color:#24292e;">mymeas,,1488327438000000000,12.4,12,14</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ curl -G &#39;http://localhost:8086/query?db=mydb&#39; </span></span>
<span class="line"><span style="color:#24292e;">--data-urlencode &#39;q=SELECT * FROM &quot;mymeas&quot; WHERE &quot;mytag1&quot; = $tag_value AND  &quot;myfield&quot; &lt; $field_value&#39; </span></span>
<span class="line"><span style="color:#24292e;">--data-urlencode &#39;params={&quot;tag_value&quot;:&quot;12&quot;,&quot;field_value&quot;:30}&#39;</span></span></code></pre></div><h2 id="_1-2-write" tabindex="-1">1.2 write <a class="header-anchor" href="#_1-2-write" aria-label="Permalink to &quot;1.2 write&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">POST http://localhost:8086/write</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">POST http://localhost:8086/write</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ curl -i -XPOST &quot;http://localhost:8086/write?db=mydb&quot; --data-binary &#39;mymeas,mytag=1 myfield=90&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 支持多行</span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -i -XPOST &quot;http://localhost:8086/write?db=mydb&quot; --data-binary &#39;mymeas,mytag=3 myfield=89</span></span>
<span class="line"><span style="color:#e1e4e8;">mymeas,mytag=2 myfield=34 1463689152000000000&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 支持文件</span></span>
<span class="line"><span style="color:#e1e4e8;">$ curl -i -XPOST &quot;http://localhost:8086/write?db=mydb&quot; --data-binary @data.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ curl -i -XPOST &quot;http://localhost:8086/write?db=mydb&quot; --data-binary &#39;mymeas,mytag=1 myfield=90&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 支持多行</span></span>
<span class="line"><span style="color:#24292e;">$ curl -i -XPOST &quot;http://localhost:8086/write?db=mydb&quot; --data-binary &#39;mymeas,mytag=3 myfield=89</span></span>
<span class="line"><span style="color:#24292e;">mymeas,mytag=2 myfield=34 1463689152000000000&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 支持文件</span></span>
<span class="line"><span style="color:#24292e;">$ curl -i -XPOST &quot;http://localhost:8086/write?db=mydb&quot; --data-binary @data.txt</span></span></code></pre></div><h2 id="_1-3-开启鉴权后如何写数据" tabindex="-1">1.3 开启鉴权后如何写数据 <a class="header-anchor" href="#_1-3-开启鉴权后如何写数据" aria-label="Permalink to &quot;1.3 开启鉴权后如何写数据&quot;">​</a></h2><p>使用insert命令行写数据：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&gt; INSERT cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&gt; INSERT cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000</span></span></code></pre></div><p>使用HTTP API写数据：</p><ul><li><p>用户名密码写在 URL 中</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&amp;u=admin&amp;p=admin&quot; --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&amp;u=admin&amp;p=admin&quot; --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre></div></li><li><p>用户名密码写在 HTTP 头 Authorization 选项</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&quot; -u admin:admin --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&quot; -u admin:admin --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre></div></li></ul><p><strong>HTTP API 查询的方式变为</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query&quot; -u admin:admin --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query&quot; --data-urlencode &quot;u=admin&quot; --data-urlencode &quot;p=admin&quot; --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query?u=admin&amp;p=admin&amp;q=SHOW+DATABASES&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query&quot; -u admin:admin --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query&quot; --data-urlencode &quot;u=admin&quot; --data-urlencode &quot;p=admin&quot; --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query?u=admin&amp;p=admin&amp;q=SHOW+DATABASES&quot;</span></span></code></pre></div><h1 id="_2-curl" tabindex="-1">2. curl <a class="header-anchor" href="#_2-curl" aria-label="Permalink to &quot;2. curl&quot;">​</a></h1><h2 id="_2-1-write" tabindex="-1">2.1 write <a class="header-anchor" href="#_2-1-write" aria-label="Permalink to &quot;2.1 write&quot;">​</a></h2><ul><li>http api 写入</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@TEST log]# curl -i -XPOST &#39;http://172.31.171.251:8086/write?db=test&#39; --data-binary &#39;cpu_load_short,host=server01,region=us-west value=0.74&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#e1e4e8;">Request-Id: c8362c7f-d858-11e9-804d-0242ac110003</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Influxdb-Version: 1.7.8</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Request-Id: c8362c7f-d858-11e9-804d-0242ac110003</span></span>
<span class="line"><span style="color:#e1e4e8;">Date: Mon, 16 Sep 2019 08:05:43 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@TEST log]# docker exec -it influxdb /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">root@a1229df1ff1e:/# influx</span></span>
<span class="line"><span style="color:#e1e4e8;">Connected to http://localhost:8086 version 1.7.8</span></span>
<span class="line"><span style="color:#e1e4e8;">InfluxDB shell version: 1.7.8</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; use test</span></span>
<span class="line"><span style="color:#e1e4e8;">Using database test</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; show measurements;</span></span>
<span class="line"><span style="color:#e1e4e8;">name: measurements</span></span>
<span class="line"><span style="color:#e1e4e8;">name</span></span>
<span class="line"><span style="color:#e1e4e8;">----</span></span>
<span class="line"><span style="color:#e1e4e8;">add_test</span></span>
<span class="line"><span style="color:#e1e4e8;">cpu_load_short</span></span>
<span class="line"><span style="color:#e1e4e8;">userBaseInfo</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from cpu_load_short</span></span>
<span class="line"><span style="color:#e1e4e8;">name: cpu_load_short</span></span>
<span class="line"><span style="color:#e1e4e8;">time                host     region  value</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ----     ------  -----</span></span>
<span class="line"><span style="color:#e1e4e8;">1568621143922664620 server01 us-west 0.74</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@TEST log]# curl -i -XPOST &#39;http://172.31.171.251:8086/write?db=test&#39; --data-binary &#39;cpu_load_short,host=server01,region=us-west value=0.74&#39;</span></span>
<span class="line"><span style="color:#24292e;">HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#24292e;">Request-Id: c8362c7f-d858-11e9-804d-0242ac110003</span></span>
<span class="line"><span style="color:#24292e;">X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#24292e;">X-Influxdb-Version: 1.7.8</span></span>
<span class="line"><span style="color:#24292e;">X-Request-Id: c8362c7f-d858-11e9-804d-0242ac110003</span></span>
<span class="line"><span style="color:#24292e;">Date: Mon, 16 Sep 2019 08:05:43 GMT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@TEST log]# docker exec -it influxdb /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">root@a1229df1ff1e:/# influx</span></span>
<span class="line"><span style="color:#24292e;">Connected to http://localhost:8086 version 1.7.8</span></span>
<span class="line"><span style="color:#24292e;">InfluxDB shell version: 1.7.8</span></span>
<span class="line"><span style="color:#24292e;">&gt; use test</span></span>
<span class="line"><span style="color:#24292e;">Using database test</span></span>
<span class="line"><span style="color:#24292e;">&gt; show measurements;</span></span>
<span class="line"><span style="color:#24292e;">name: measurements</span></span>
<span class="line"><span style="color:#24292e;">name</span></span>
<span class="line"><span style="color:#24292e;">----</span></span>
<span class="line"><span style="color:#24292e;">add_test</span></span>
<span class="line"><span style="color:#24292e;">cpu_load_short</span></span>
<span class="line"><span style="color:#24292e;">userBaseInfo</span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from cpu_load_short</span></span>
<span class="line"><span style="color:#24292e;">name: cpu_load_short</span></span>
<span class="line"><span style="color:#24292e;">time                host     region  value</span></span>
<span class="line"><span style="color:#24292e;">----                ----     ------  -----</span></span>
<span class="line"><span style="color:#24292e;">1568621143922664620 server01 us-west 0.74</span></span></code></pre></div><ul><li>根据文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat txt</span></span>
<span class="line"><span style="color:#e1e4e8;">cpu_load_short,host=server01,region=us-west value=0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">cpu_load_short,host=server02,region=us-west value=0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">cpu_load_short,host=server03,region=us-west value=0.74</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@TEST ~]# curl -i -XPOST &#39;http://172.31.171.251:8086/write?db=test&#39; --data-binary @txt</span></span>
<span class="line"><span style="color:#e1e4e8;">HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#e1e4e8;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#e1e4e8;">Request-Id: 353783c1-d859-11e9-8052-0242ac110003</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Influxdb-Version: 1.7.8</span></span>
<span class="line"><span style="color:#e1e4e8;">X-Request-Id: 353783c1-d859-11e9-8052-0242ac110003</span></span>
<span class="line"><span style="color:#e1e4e8;">Date: Mon, 16 Sep 2019 08:08:46 GMT</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; select * from cpu_load_short</span></span>
<span class="line"><span style="color:#e1e4e8;">name: cpu_load_short</span></span>
<span class="line"><span style="color:#e1e4e8;">time                host     region  value</span></span>
<span class="line"><span style="color:#e1e4e8;">----                ----     ------  -----</span></span>
<span class="line"><span style="color:#e1e4e8;">1568621143922664620 server01 us-west 0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">1568621326803092273 server01 us-west 0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">1568621326803092273 server02 us-west 0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">1568621326803092273 server03 us-west 0.74</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat txt</span></span>
<span class="line"><span style="color:#24292e;">cpu_load_short,host=server01,region=us-west value=0.74</span></span>
<span class="line"><span style="color:#24292e;">cpu_load_short,host=server02,region=us-west value=0.74</span></span>
<span class="line"><span style="color:#24292e;">cpu_load_short,host=server03,region=us-west value=0.74</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@TEST ~]# curl -i -XPOST &#39;http://172.31.171.251:8086/write?db=test&#39; --data-binary @txt</span></span>
<span class="line"><span style="color:#24292e;">HTTP/1.1 204 No Content</span></span>
<span class="line"><span style="color:#24292e;">Content-Type: application/json</span></span>
<span class="line"><span style="color:#24292e;">Request-Id: 353783c1-d859-11e9-8052-0242ac110003</span></span>
<span class="line"><span style="color:#24292e;">X-Influxdb-Build: OSS</span></span>
<span class="line"><span style="color:#24292e;">X-Influxdb-Version: 1.7.8</span></span>
<span class="line"><span style="color:#24292e;">X-Request-Id: 353783c1-d859-11e9-8052-0242ac110003</span></span>
<span class="line"><span style="color:#24292e;">Date: Mon, 16 Sep 2019 08:08:46 GMT</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt; select * from cpu_load_short</span></span>
<span class="line"><span style="color:#24292e;">name: cpu_load_short</span></span>
<span class="line"><span style="color:#24292e;">time                host     region  value</span></span>
<span class="line"><span style="color:#24292e;">----                ----     ------  -----</span></span>
<span class="line"><span style="color:#24292e;">1568621143922664620 server01 us-west 0.74</span></span>
<span class="line"><span style="color:#24292e;">1568621326803092273 server01 us-west 0.74</span></span>
<span class="line"><span style="color:#24292e;">1568621326803092273 server02 us-west 0.74</span></span>
<span class="line"><span style="color:#24292e;">1568621326803092273 server03 us-west 0.74</span></span></code></pre></div><h2 id="_2-2-query" tabindex="-1">2.2 query <a class="header-anchor" href="#_2-2-query" aria-label="Permalink to &quot;2.2 query&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@bug ~]# curl -G &#39;http://172.31.171.251:8086/query?pretty=true&#39; --data-urlencode &quot;db=test&quot; --data-urlencode &quot;q=select value from cpu_load_short where region=&#39;us-west&#39;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;results&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;statement_id&quot;: 0,</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;series&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;name&quot;: &quot;cpu_load_short&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;columns&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                        &quot;time&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                        &quot;value&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;values&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                        [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            &quot;2019-09-16T08:05:43.92266462Z&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                            0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">                        [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            &quot;2019-09-16T08:08:46.803092273Z&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                            0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">                        [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            &quot;2019-09-16T08:08:46.803092273Z&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                            0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ],</span></span>
<span class="line"><span style="color:#e1e4e8;">                        [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            &quot;2019-09-16T08:08:46.803092273Z&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                            0.74</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ]</span></span>
<span class="line"><span style="color:#e1e4e8;">                    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@bug ~]# curl -G &#39;http://172.31.171.251:8086/query?pretty=true&#39; --data-urlencode &quot;db=test&quot; --data-urlencode &quot;q=select value from cpu_load_short where region=&#39;us-west&#39;&quot;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;results&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;statement_id&quot;: 0,</span></span>
<span class="line"><span style="color:#24292e;">            &quot;series&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                {</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;name&quot;: &quot;cpu_load_short&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;columns&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                        &quot;time&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                        &quot;value&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    ],</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;values&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">                        [</span></span>
<span class="line"><span style="color:#24292e;">                            &quot;2019-09-16T08:05:43.92266462Z&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                            0.74</span></span>
<span class="line"><span style="color:#24292e;">                        ],</span></span>
<span class="line"><span style="color:#24292e;">                        [</span></span>
<span class="line"><span style="color:#24292e;">                            &quot;2019-09-16T08:08:46.803092273Z&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                            0.74</span></span>
<span class="line"><span style="color:#24292e;">                        ],</span></span>
<span class="line"><span style="color:#24292e;">                        [</span></span>
<span class="line"><span style="color:#24292e;">                            &quot;2019-09-16T08:08:46.803092273Z&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                            0.74</span></span>
<span class="line"><span style="color:#24292e;">                        ],</span></span>
<span class="line"><span style="color:#24292e;">                        [</span></span>
<span class="line"><span style="color:#24292e;">                            &quot;2019-09-16T08:08:46.803092273Z&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                            0.74</span></span>
<span class="line"><span style="color:#24292e;">                        ]</span></span>
<span class="line"><span style="color:#24292e;">                    ]</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            ]</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    ]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2-3带有用户查询" tabindex="-1">2.3带有用户查询 <a class="header-anchor" href="#_2-3带有用户查询" aria-label="Permalink to &quot;2.3带有用户查询&quot;">​</a></h2><h3 id="查询" tabindex="-1">查询 <a class="header-anchor" href="#查询" aria-label="Permalink to &quot;查询&quot;">​</a></h3><p>http带上admin用户查询、写入数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query&quot; -u username:password --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query&quot; --data-urlencode &quot;u=username&quot; --data-urlencode &quot;p=password&quot; --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query?u=username&amp;p=password&amp;q=SHOW+DATABASES&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query&quot; -u username:password --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query&quot; --data-urlencode &quot;u=username&quot; --data-urlencode &quot;p=password&quot; --data-urlencode &quot;q=SHOW DATABASES&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query?u=username&amp;p=password&amp;q=SHOW+DATABASES&quot;</span></span></code></pre></div><ul><li><strong>json</strong>展开显示</li></ul><p><code>?pretty=true</code>能够将<strong>json</strong>展开显示</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -G &quot;http://localhost:8086/query?pretty=true&quot; -u root:newpwd --data-urlencode &quot;q=show databases&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -G &quot;http://localhost:8086/query?pretty=true&quot; -u root:newpwd --data-urlencode &quot;q=show databases&quot;</span></span></code></pre></div><h3 id="写入" tabindex="-1">写入 <a class="header-anchor" href="#写入" aria-label="Permalink to &quot;写入&quot;">​</a></h3><p><strong>用户名密码写在URL中</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&amp;u=username&amp;p=password&quot; --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&amp;u=username&amp;p=password&quot; --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre></div><p><strong>用户名密码写在HTTP头Authorization选项</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&quot; -u username:password --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">curl -i -X POST &quot;http://localhost:8086/write?db=mydb&quot; -u username:password --data-binary &quot;cpu_load_short,host=server01,region=us-west value=0.64,value2=0.86 1434055562000000000&quot;</span></span></code></pre></div>`,38);function i(d,y,q,h,m,b){const s=e("center");return n(),l("div",null,[p(s,null,{default:o(()=>[c("Influx HttpAPI")]),_:1}),u])}const T=a(r,[["render",i]]);export{v as __pageData,T as default};
