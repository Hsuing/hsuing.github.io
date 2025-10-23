import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1.Redis修改密码","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/Redis/5-cmd.md","filePath":"guide/Database/Redis/5-cmd.md","lastUpdated":1720533756000}'),l={name:"guide/Database/Redis/5-cmd.md"},p=e(`<h1 id="_1-redis修改密码" tabindex="-1">1.Redis修改密码 <a class="header-anchor" href="#_1-redis修改密码" aria-label="Permalink to &quot;1.Redis修改密码&quot;">​</a></h1><h1 id="_2-redis慢日志" tabindex="-1">2.Redis慢日志 <a class="header-anchor" href="#_2-redis慢日志" aria-label="Permalink to &quot;2.Redis慢日志&quot;">​</a></h1><p>redis 可以把执行时间超过我们设定值的命令记录下来</p><p>这里的执行时间不包括 I/O 操作,比如与客户端,发送应答等等,就是实际执行命令所需的时间(命令唯一执行的阶段，线程被阻塞且不能同时处理其他请求)</p><h2 id="_2-2-设置-redis-slowlog" tabindex="-1">2.2 设置 Redis slowlog <a class="header-anchor" href="#_2-2-设置-redis-slowlog" aria-label="Permalink to &quot;2.2 设置 Redis slowlog&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">两种方式：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    可以通过配置 redis.conf 来完成。</span></span>
<span class="line"><span style="color:#e1e4e8;">    运行时，使用 CONFIG GET 和 CONFIG SET 命令配置</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">配置两个参数：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">slowlog-log-slower-than 表示慢查询预设的超时阀值，单位是微妙(μs)1s = 1000ms = 1_000_000μs默认10000微秒，即10毫秒执行超过这个时间的命令将被记录到慢查询日志</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">slowlog-max-len表示慢查询最大的条数,默认为 128，当slowlog超过设定的最大值后，会将最早的slowlog删除，是个FIFO队列</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">两种方式：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    可以通过配置 redis.conf 来完成。</span></span>
<span class="line"><span style="color:#24292e;">    运行时，使用 CONFIG GET 和 CONFIG SET 命令配置</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">配置两个参数：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">slowlog-log-slower-than 表示慢查询预设的超时阀值，单位是微妙(μs)1s = 1000ms = 1_000_000μs默认10000微秒，即10毫秒执行超过这个时间的命令将被记录到慢查询日志</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">slowlog-max-len表示慢查询最大的条数,默认为 128，当slowlog超过设定的最大值后，会将最早的slowlog删除，是个FIFO队列</span></span></code></pre></div><blockquote><p>[!TIP] 需要注意的是，设置负数表示禁用 slowlog ，而设置 0 则强制记录每个命令的执行情况</p></blockquote><h2 id="_2-3-动态配置" tabindex="-1">2.3 动态配置 <a class="header-anchor" href="#_2-3-动态配置" aria-label="Permalink to &quot;2.3 动态配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">- 查看当前slowlog-log-slower-than设置</span></span>
<span class="line"><span style="color:#e1e4e8;">     127.0.0.1:6379&gt; CONFIG GET slowlog-log-slower-than</span></span>
<span class="line"><span style="color:#e1e4e8;">     1)  &quot;slowlog-log-slower-than&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">     2)  &quot;10000&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- 设置slowlog-log-slower-than为30ms</span></span>
<span class="line"><span style="color:#e1e4e8;">     127.0.0.1:6379&gt; CONFIG SET slowlog-log-slower-than 30000</span></span>
<span class="line"><span style="color:#e1e4e8;">     OK</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- 设置slowlog-max-len为1000</span></span>
<span class="line"><span style="color:#e1e4e8;">     127.0.0.1:6379&gt; CONFIG SET slowlog-max-len 1000</span></span>
<span class="line"><span style="color:#e1e4e8;">     OK</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">- 查看len</span></span>
<span class="line"><span style="color:#e1e4e8;">    127.0.0.1:6379&gt; config get slowlog-max-len</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">- 查看当前slowlog-log-slower-than设置</span></span>
<span class="line"><span style="color:#24292e;">     127.0.0.1:6379&gt; CONFIG GET slowlog-log-slower-than</span></span>
<span class="line"><span style="color:#24292e;">     1)  &quot;slowlog-log-slower-than&quot;</span></span>
<span class="line"><span style="color:#24292e;">     2)  &quot;10000&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- 设置slowlog-log-slower-than为30ms</span></span>
<span class="line"><span style="color:#24292e;">     127.0.0.1:6379&gt; CONFIG SET slowlog-log-slower-than 30000</span></span>
<span class="line"><span style="color:#24292e;">     OK</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- 设置slowlog-max-len为1000</span></span>
<span class="line"><span style="color:#24292e;">     127.0.0.1:6379&gt; CONFIG SET slowlog-max-len 1000</span></span>
<span class="line"><span style="color:#24292e;">     OK</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">- 查看len</span></span>
<span class="line"><span style="color:#24292e;">    127.0.0.1:6379&gt; config get slowlog-max-len</span></span></code></pre></div><ul><li>修改配置文件</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#e1e4e8;">slowlog-max-len 128</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">slowlog-log-slower-than 10000</span></span>
<span class="line"><span style="color:#24292e;">slowlog-max-len 128</span></span></code></pre></div><h2 id="_2-4-查看" tabindex="-1">2.4 查看 <a class="header-anchor" href="#_2-4-查看" aria-label="Permalink to &quot;2.4 查看&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看slowlog总条数</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:9379&gt; slowlog len</span></span>
<span class="line"><span style="color:#e1e4e8;">(integer) 0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># slowlog reset 重置已记录的 slowlog 信息</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:9379&gt; slowlog reset</span></span>
<span class="line"><span style="color:#e1e4e8;">(integer) 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看slowlog总条数</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:9379&gt; slowlog len</span></span>
<span class="line"><span style="color:#24292e;">(integer) 0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># slowlog reset 重置已记录的 slowlog 信息</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:9379&gt; slowlog reset</span></span>
<span class="line"><span style="color:#24292e;">(integer) 0</span></span></code></pre></div><h2 id="_2-5-查看-slowlog" tabindex="-1">2.5 查看 slowlog <a class="header-anchor" href="#_2-5-查看-slowlog" aria-label="Permalink to &quot;2.5 查看 slowlog&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 查看slowlog ALL</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; SLOWLOG GET</span></span>
<span class="line"><span style="color:#e1e4e8;">1) 1) (integer) 25</span></span>
<span class="line"><span style="color:#e1e4e8;">    2) (integer) 1440057769</span></span>
<span class="line"><span style="color:#e1e4e8;">    3) (integer) 6</span></span>
<span class="line"><span style="color:#e1e4e8;">    4) 1)  &quot;SLOWLOG&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">       2)  &quot;LEN&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">redis 127.0.0.1:6379&gt; slowlog get 2 //只需要查看最后2个慢命令</span></span>
<span class="line"><span style="color:#e1e4e8;">    1) 1) (integer) 14             //slowlog 唯一标识</span></span>
<span class="line"><span style="color:#e1e4e8;">       2) (integer) 1309448221     //unix 时间戳</span></span>
<span class="line"><span style="color:#e1e4e8;">       3) (integer) 15             //命令执行的时间，单位：微秒</span></span>
<span class="line"><span style="color:#e1e4e8;">       4) 1) &quot;ping&quot;                //具体执行的命令，最多记录128</span></span>
<span class="line"><span style="color:#e1e4e8;">    2) 1) (integer) 13</span></span>
<span class="line"><span style="color:#e1e4e8;">       2) (integer) 1309448128</span></span>
<span class="line"><span style="color:#e1e4e8;">       3) (integer) 30</span></span>
<span class="line"><span style="color:#e1e4e8;">       4) 1) &quot;slowlog&quot;  //查询命令，完整命令为 SLOWLOG GET，slowlog最多保存前面的31个key和128字符</span></span>
<span class="line"><span style="color:#e1e4e8;">          2) &quot;get&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          3) &quot;100&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//其中 Redis 4.0 及以上版本还包含以下两部分:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">       5) &quot;127.0.0.1:58217&quot;         //客户端IP:Port</span></span>
<span class="line"><span style="color:#e1e4e8;">       6) &quot;worker-123&quot;              //客户端名称</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">需要注意此命令需要 2.2.12及以上版本的 redis 才能支持</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 查看slowlog ALL</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; SLOWLOG GET</span></span>
<span class="line"><span style="color:#24292e;">1) 1) (integer) 25</span></span>
<span class="line"><span style="color:#24292e;">    2) (integer) 1440057769</span></span>
<span class="line"><span style="color:#24292e;">    3) (integer) 6</span></span>
<span class="line"><span style="color:#24292e;">    4) 1)  &quot;SLOWLOG&quot;</span></span>
<span class="line"><span style="color:#24292e;">       2)  &quot;LEN&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">redis 127.0.0.1:6379&gt; slowlog get 2 //只需要查看最后2个慢命令</span></span>
<span class="line"><span style="color:#24292e;">    1) 1) (integer) 14             //slowlog 唯一标识</span></span>
<span class="line"><span style="color:#24292e;">       2) (integer) 1309448221     //unix 时间戳</span></span>
<span class="line"><span style="color:#24292e;">       3) (integer) 15             //命令执行的时间，单位：微秒</span></span>
<span class="line"><span style="color:#24292e;">       4) 1) &quot;ping&quot;                //具体执行的命令，最多记录128</span></span>
<span class="line"><span style="color:#24292e;">    2) 1) (integer) 13</span></span>
<span class="line"><span style="color:#24292e;">       2) (integer) 1309448128</span></span>
<span class="line"><span style="color:#24292e;">       3) (integer) 30</span></span>
<span class="line"><span style="color:#24292e;">       4) 1) &quot;slowlog&quot;  //查询命令，完整命令为 SLOWLOG GET，slowlog最多保存前面的31个key和128字符</span></span>
<span class="line"><span style="color:#24292e;">          2) &quot;get&quot;</span></span>
<span class="line"><span style="color:#24292e;">          3) &quot;100&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//其中 Redis 4.0 及以上版本还包含以下两部分:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">       5) &quot;127.0.0.1:58217&quot;         //客户端IP:Port</span></span>
<span class="line"><span style="color:#24292e;">       6) &quot;worker-123&quot;              //客户端名称</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">需要注意此命令需要 2.2.12及以上版本的 redis 才能支持</span></span></code></pre></div><p>参考: <a href="http://blog.sina.com.cn/s/blog_48c95a190101gebh.html" target="_blank" rel="noreferrer">http://blog.sina.com.cn/s/blog_48c95a190101gebh.html</a></p>`,16),o=[p];function t(c,i,r,g,y,d){return n(),a("div",null,o)}const w=s(l,[["render",t]]);export{u as __pageData,w as default};
