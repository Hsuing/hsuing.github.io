import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/influxdb/0-influx-cli.md","filePath":"guide/Database/influxdb/0-influx-cli.md","lastUpdated":1720533756000}'),l={name:"guide/Database/influxdb/0-influx-cli.md"},t=n(`<h2 id="i-安装" tabindex="-1">I. 安装 <a class="header-anchor" href="#i-安装" aria-label="Permalink to &quot;I. 安装&quot;">​</a></h2><p>安装教程，直接参考官网链接，<a href="https://docs.influxdata.com/influxdb/v1.7/introduction/installation/" target="_blank" rel="noreferrer">installing-influxdb-oss</a></p><h2 id="_2-influx-cli" tabindex="-1">2. influx-cli <a class="header-anchor" href="#_2-influx-cli" aria-label="Permalink to &quot;2. influx-cli&quot;">​</a></h2><p>官方, <a href="https://docs.influxdata.com/influxdb/v1.7/tools/shell/" target="_blank" rel="noreferrer">InfluxDB command line interface (CLI/shell)</a></p><p>influx自带了一个控制台访问操作的工具: <code>influx</code></p><p>常用的参数</p><table><thead><tr><th>参数</th><th>示例</th><th>说明</th></tr></thead><tbody><tr><td><code>-username</code></td><td>admin</td><td>配置访问用户名</td></tr><tr><td><code>-password</code></td><td>admin</td><td>配置访问密码</td></tr><tr><td><code>-format</code></td><td><code>json csv column</code></td><td>格式化输出结果</td></tr><tr><td><code>-host</code></td><td><code>localhost</code></td><td>influxdb提供访问的域名或ip</td></tr><tr><td><code>-port</code></td><td>8086</td><td>influxdb提供访问的端口号</td></tr><tr><td><code>-precisoin</code></td><td><code>rfc3339(h,m,s,ms,u,ns)</code></td><td>指定time时间戳格式化</td></tr></tbody></table><ul><li>实例</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">influx -username=admin -password=admin -format=colume -host=127.0.0.1 -port=8086 -precisoin=rfc3339</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看帮助</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;help</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#进入到influx ，执行</span></span>
<span class="line"><span style="color:#e1e4e8;">注意pretty输入一次表示开启，再输入一次表示关闭</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;pretty</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;format column</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&gt;precision rfc3339</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">influx -username=admin -password=admin -format=colume -host=127.0.0.1 -port=8086 -precisoin=rfc3339</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看帮助</span></span>
<span class="line"><span style="color:#24292e;">&gt;help</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#进入到influx ，执行</span></span>
<span class="line"><span style="color:#24292e;">注意pretty输入一次表示开启，再输入一次表示关闭</span></span>
<span class="line"><span style="color:#24292e;">&gt;pretty</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;format column</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&gt;precision rfc3339</span></span></code></pre></div><ul><li>退出方式</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">exit/quit/ctrl+d      quits the influx shell</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">exit/quit/ctrl+d      quits the influx shell</span></span></code></pre></div>`,11),p=[t];function o(c,i,d,r,u,h){return e(),a("div",null,p)}const y=s(l,[["render",o]]);export{m as __pageData,y as default};
