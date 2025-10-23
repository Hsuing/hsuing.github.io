import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. 配置参数解析详解","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Monitor/Prometheus/AlertManager/3-config_detail.md","filePath":"guide/Linux/Monitor/Prometheus/AlertManager/3-config_detail.md","lastUpdated":1720533756000}'),p={name:"guide/Linux/Monitor/Prometheus/AlertManager/3-config_detail.md"},o=l(`<h1 id="_1-配置参数解析详解" tabindex="-1">1. 配置参数解析详解 <a class="header-anchor" href="#_1-配置参数解析详解" aria-label="Permalink to &quot;1. 配置参数解析详解&quot;">​</a></h1><p><a href="https://prometheus.io/docs/alerting/latest/configuration/" target="_blank" rel="noreferrer">官当</a></p><blockquote><p>这边参照的是当前最新的 <code>0.24</code> 版本，后面如果版本有继续迭代，可能会出现有些参数不一样</p></blockquote><p>关于 alertmanager 的配置文件的配置，官方也有提供了 example 参考: <a href="https://github.com/prometheus/alertmanager/blob/main/doc/examples/simple.yml" target="_blank" rel="noreferrer">alertmanager simple.yml</a></p><h2 id="_1-1-global" tabindex="-1">1.1 global <a class="header-anchor" href="#_1-1-global" aria-label="Permalink to &quot;1.1 global&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 全局配置，有些可被下面的具体配置替换</span></span>
<span class="line"><span style="color:#85E89D;">global</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># smtp 相关的邮箱发送配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 邮件发送来源，很多时候要跟 username 的发送邮箱同一个</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_from</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;tmpl_string&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># smtp 协议的发送端点</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_smarthost</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 定义的主机名称 (hostname)</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_hello</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt; | default = &quot;localhost&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 登录的用户名和密码，以及对应的一些加密协议</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_auth_username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_auth_password</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;secret&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_auth_identity</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_auth_secret</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;secret&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 是否启用 tls 加密，默认启用</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">smtp_require_tls</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;bool&gt; | default = true</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 一些第三方的 receivers 配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">slack_api_url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;secret&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">slack_api_url_file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;filepath&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">victorops_api_key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;secret&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">victorops_api_url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt; | default = &quot;https://alert.victorops.com/integrations/generic/20131114/alert/&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">pagerduty_url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt; | default = &quot;https://events.pagerduty.com/v2/enqueue&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">opsgenie_api_key</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;secret&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">opsgenie_api_key_file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;filepath&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">opsgenie_api_url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt; | default = &quot;https://api.opsgenie.com/&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">wechat_api_url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt; | default = &quot;https://qyapi.weixin.qq.com/cgi-bin/&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">wechat_api_secret</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;secret&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">wechat_api_corp_id</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">telegram_api_url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;string&gt; | default = &quot;https://api.telegram.org&quot;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># http 客户端配置，允许配置接收方用来与基于 HTTP 的 API 服务通信的 HTTP 客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">http_config</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;http_config&gt;</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 如果超过这个时间段，prometheus 那边没有给出警报的状态更新，alertmanager 就默认这个警报已经解决</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 对于 alertmanager 来说，哪怕 prometheus 一直给 firing 状态，那也是警报有新的状态更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 一定是要那种没有任何状态值给过来的，比如 prometheus server 挂了，或者 rules 警报规则被删除了这种</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ </span><span style="color:#85E89D;">resolve_timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;duration&gt; | default = 5m</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 模板文件目录</span></span>
<span class="line"><span style="color:#6A737D;"># 警报模板可以自定义通知的信息格式，以及其包含的对应警报指标数据，可以自定义Email、企业微信的模板，配置指定的存放位置</span></span>
<span class="line"><span style="color:#85E89D;">templates</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ - </span><span style="color:#9ECBFF;">&lt;filepath&gt; ...</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 警报的路由树</span></span>
<span class="line"><span style="color:#85E89D;">route</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;route&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 警报通知接收者配置</span></span>
<span class="line"><span style="color:#85E89D;">receivers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#9ECBFF;">&lt;receiver&gt; ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 抑制规则配置</span></span>
<span class="line"><span style="color:#85E89D;">inhibit_rules</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ - </span><span style="color:#9ECBFF;">&lt;inhibit_rule&gt; ...</span><span style="color:#E1E4E8;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 静音/激活 的时间间隔的一组数据</span></span>
<span class="line"><span style="color:#6A737D;"># 他配置的时间点和名称，要匹配 route 节点下的 mute_time_intervals 或者 active_time_intervals</span></span>
<span class="line"><span style="color:#85E89D;">time_intervals</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  [ - </span><span style="color:#9ECBFF;">&lt;time_interval&gt; ...</span><span style="color:#E1E4E8;"> ]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 全局配置，有些可被下面的具体配置替换</span></span>
<span class="line"><span style="color:#22863A;">global</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># smtp 相关的邮箱发送配置</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 邮件发送来源，很多时候要跟 username 的发送邮箱同一个</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_from</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;tmpl_string&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># smtp 协议的发送端点</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_smarthost</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 定义的主机名称 (hostname)</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_hello</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt; | default = &quot;localhost&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 登录的用户名和密码，以及对应的一些加密协议</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_auth_username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_auth_password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;secret&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_auth_identity</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_auth_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;secret&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 是否启用 tls 加密，默认启用</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">smtp_require_tls</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;bool&gt; | default = true</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 一些第三方的 receivers 配置</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">slack_api_url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;secret&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">slack_api_url_file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;filepath&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">victorops_api_key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;secret&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">victorops_api_url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt; | default = &quot;https://alert.victorops.com/integrations/generic/20131114/alert/&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">pagerduty_url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt; | default = &quot;https://events.pagerduty.com/v2/enqueue&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">opsgenie_api_key</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;secret&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">opsgenie_api_key_file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;filepath&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">opsgenie_api_url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt; | default = &quot;https://api.opsgenie.com/&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">wechat_api_url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt; | default = &quot;https://qyapi.weixin.qq.com/cgi-bin/&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">wechat_api_secret</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;secret&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">wechat_api_corp_id</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">telegram_api_url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;string&gt; | default = &quot;https://api.telegram.org&quot;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># http 客户端配置，允许配置接收方用来与基于 HTTP 的 API 服务通信的 HTTP 客户端</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">http_config</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;http_config&gt;</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 如果超过这个时间段，prometheus 那边没有给出警报的状态更新，alertmanager 就默认这个警报已经解决</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 对于 alertmanager 来说，哪怕 prometheus 一直给 firing 状态，那也是警报有新的状态更新</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 一定是要那种没有任何状态值给过来的，比如 prometheus server 挂了，或者 rules 警报规则被删除了这种</span></span>
<span class="line"><span style="color:#24292E;">  [ </span><span style="color:#22863A;">resolve_timeout</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;duration&gt; | default = 5m</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 模板文件目录</span></span>
<span class="line"><span style="color:#6A737D;"># 警报模板可以自定义通知的信息格式，以及其包含的对应警报指标数据，可以自定义Email、企业微信的模板，配置指定的存放位置</span></span>
<span class="line"><span style="color:#22863A;">templates</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  [ - </span><span style="color:#032F62;">&lt;filepath&gt; ...</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 警报的路由树</span></span>
<span class="line"><span style="color:#22863A;">route</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;route&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 警报通知接收者配置</span></span>
<span class="line"><span style="color:#22863A;">receivers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#032F62;">&lt;receiver&gt; ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 抑制规则配置</span></span>
<span class="line"><span style="color:#22863A;">inhibit_rules</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  [ - </span><span style="color:#032F62;">&lt;inhibit_rule&gt; ...</span><span style="color:#24292E;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 静音/激活 的时间间隔的一组数据</span></span>
<span class="line"><span style="color:#6A737D;"># 他配置的时间点和名称，要匹配 route 节点下的 mute_time_intervals 或者 active_time_intervals</span></span>
<span class="line"><span style="color:#22863A;">time_intervals</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  [ - </span><span style="color:#032F62;">&lt;time_interval&gt; ...</span><span style="color:#24292E;"> ]</span></span></code></pre></div><p><a href="https://kebingzao.com/2022/11/29/prometheus-4-alertmanager/" target="_blank" rel="noreferrer">https://kebingzao.com/2022/11/29/prometheus-4-alertmanager/</a></p>`,7),e=[o];function t(r,c,E,y,i,g){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
