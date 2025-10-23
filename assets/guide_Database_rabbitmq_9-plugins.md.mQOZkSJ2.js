import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const l="/assets/trace1.YQyP2-7Z.jpg",p="/assets/20200724145718676.qRdXig6B.png",t="/assets/trace.T94G451V.png",g=JSON.parse('{"title":"rabbitmq-delayed-message-exchange","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/rabbitmq/9-plugins.md","filePath":"guide/Database/rabbitmq/9-plugins.md","lastUpdated":1710405635000}'),o={name:"guide/Database/rabbitmq/9-plugins.md"},i=n(`<h1 id="rabbitmq-delayed-message-exchange" tabindex="-1">rabbitmq-delayed-message-exchange <a class="header-anchor" href="#rabbitmq-delayed-message-exchange" aria-label="Permalink to &quot;rabbitmq-delayed-message-exchange&quot;">​</a></h1><h2 id="_1-下载" tabindex="-1">1.下载 <a class="header-anchor" href="#_1-下载" aria-label="Permalink to &quot;1.下载&quot;">​</a></h2><p><a href="https://www.rabbitmq.com/community-plugins.html" target="_blank" rel="noreferrer">https://www.rabbitmq.com/community-plugins.html</a></p><p>RabbitMQ版本为3.6</p><p>wget <a href="https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/archive/refs/tags/rabbitmq_v3_6_12.tar.gz" target="_blank" rel="noreferrer">https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/archive/refs/tags/rabbitmq_v3_6_12.tar.gz</a></p><p>RabbitMQ版本为3.7</p><p><a href="https://dl.bintray.com/rabbitmq/community-plugins/3.7.x/rabbitmq_delayed_message_exchange/rabbitmq_delayed_message_exchange-20171201-3.7.x.zip" target="_blank" rel="noreferrer">https://dl.bintray.com/rabbitmq/community-plugins/3.7.x/rabbitmq_delayed_message_exchange/rabbitmq_delayed_message_exchange-20171201-3.7.x.zip</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># cp rabbitmq_delayed_message_exchange-20171201-3.7.x.ez    /usr/local/rabbitmq/plugins/</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">启用插件</span></span>
<span class="line"><span style="color:#e1e4e8;"># rabbitmq-plugins enable rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">查看</span></span>
<span class="line"><span style="color:#e1e4e8;"># rabbitmq-plugins list</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># cp rabbitmq_delayed_message_exchange-20171201-3.7.x.ez    /usr/local/rabbitmq/plugins/</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">启用插件</span></span>
<span class="line"><span style="color:#24292e;"># rabbitmq-plugins enable rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">查看</span></span>
<span class="line"><span style="color:#24292e;"># rabbitmq-plugins list</span></span></code></pre></div><h2 id="_2-插件安装" tabindex="-1">2. 插件安装 <a class="header-anchor" href="#_2-插件安装" aria-label="Permalink to &quot;2. 插件安装&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cp /root/rabbitmq_delayed_message_exchange-3.9.0.ez /data/ajime/ajime_apps/rabbitmq/plugins</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#启动</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@slave01 plugins]#  rabbitmq-plugins enable rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#e1e4e8;">warning: the VM is running with native name encoding of latin1 which may cause Elixir to malfunction as it expects utf8. Please ensure your locale is set to UTF-8 (which can be verified by running &quot;locale&quot; in your shell)</span></span>
<span class="line"><span style="color:#e1e4e8;">Enabling plugins on node rabbit@slave01:</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#e1e4e8;">The following plugins have been configured:</span></span>
<span class="line"><span style="color:#e1e4e8;">  rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#e1e4e8;">  rabbitmq_management</span></span>
<span class="line"><span style="color:#e1e4e8;">  rabbitmq_management_agent</span></span>
<span class="line"><span style="color:#e1e4e8;">  rabbitmq_mqtt</span></span>
<span class="line"><span style="color:#e1e4e8;">  rabbitmq_top</span></span>
<span class="line"><span style="color:#e1e4e8;">  rabbitmq_web_dispatch</span></span>
<span class="line"><span style="color:#e1e4e8;">Applying plugin configuration to rabbit@slave01...</span></span>
<span class="line"><span style="color:#e1e4e8;">The following plugins have been enabled:</span></span>
<span class="line"><span style="color:#e1e4e8;">  rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">set 6 plugins.</span></span>
<span class="line"><span style="color:#e1e4e8;">Offline change; changes will take effect at broker restart.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cp /root/rabbitmq_delayed_message_exchange-3.9.0.ez /data/ajime/ajime_apps/rabbitmq/plugins</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#启动</span></span>
<span class="line"><span style="color:#24292e;">[root@slave01 plugins]#  rabbitmq-plugins enable rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#24292e;">warning: the VM is running with native name encoding of latin1 which may cause Elixir to malfunction as it expects utf8. Please ensure your locale is set to UTF-8 (which can be verified by running &quot;locale&quot; in your shell)</span></span>
<span class="line"><span style="color:#24292e;">Enabling plugins on node rabbit@slave01:</span></span>
<span class="line"><span style="color:#24292e;">rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#24292e;">The following plugins have been configured:</span></span>
<span class="line"><span style="color:#24292e;">  rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#24292e;">  rabbitmq_management</span></span>
<span class="line"><span style="color:#24292e;">  rabbitmq_management_agent</span></span>
<span class="line"><span style="color:#24292e;">  rabbitmq_mqtt</span></span>
<span class="line"><span style="color:#24292e;">  rabbitmq_top</span></span>
<span class="line"><span style="color:#24292e;">  rabbitmq_web_dispatch</span></span>
<span class="line"><span style="color:#24292e;">Applying plugin configuration to rabbit@slave01...</span></span>
<span class="line"><span style="color:#24292e;">The following plugins have been enabled:</span></span>
<span class="line"><span style="color:#24292e;">  rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">set 6 plugins.</span></span>
<span class="line"><span style="color:#24292e;">Offline change; changes will take effect at broker restart.</span></span></code></pre></div><p>实现原理:</p><p>安装插件后会生成新的Exchange类型x-delayed-message，该类型消息支持延迟投递机制,接收到消息后并未立即将消息投递至目标队列中，而是存储在mnesia(一个分布式数据系统)表中，检测消息延迟时间，如达到可投递时间时并将其通过x-delayed-type类型标记的交换机类型投递至目标队列。</p><p>延迟任务应用场景</p><p>场景一：物联网系统经常会遇到向终端下发命令，如果命令一段时间没有应答，就需要设置成超时。</p><p>场景二：订单下单之后30分钟后，如果用户没有付钱，则系统自动取消订单。</p><p>场景三：过1分钟给新注册会员的用户，发送注册邮件等</p><h2 id="_3-记录日志rabbitmq-tracing" tabindex="-1">3.记录日志rabbitmq_tracing <a class="header-anchor" href="#_3-记录日志rabbitmq-tracing" aria-label="Permalink to &quot;3.记录日志rabbitmq_tracing&quot;">​</a></h2><p>官方文档，<a href="https://rabbitmq.com/firehose.html" target="_blank" rel="noreferrer">https://rabbitmq.com/firehose.html</a></p><h3 id="查看插件" tabindex="-1">查看插件 <a class="header-anchor" href="#查看插件" aria-label="Permalink to &quot;查看插件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@appman rabbitmq]# rabbitmq-plugins list</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Listing plugins with pattern &quot;.*&quot; ...</span></span>
<span class="line"><span style="color:#e1e4e8;"> Configured: E = explicitly enabled; e = implicitly enabled</span></span>
<span class="line"><span style="color:#e1e4e8;"> | Status: * = running on rabbit@appman</span></span>
<span class="line"><span style="color:#e1e4e8;"> |/</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_amqp1_0                  3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_auth_backend_cache       3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_auth_backend_http        3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_auth_backend_ldap        3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_auth_backend_oauth2      3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_auth_mechanism_ssl       3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_consistent_hash_exchange 3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[E*] rabbitmq_delayed_message_exchange 3.9.0</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_event_exchange           3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_federation               3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_federation_management    3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_jms_topic_exchange       3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[E*] rabbitmq_management               3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[e*] rabbitmq_management_agent         3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[E*] rabbitmq_mqtt                     3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_peer_discovery_aws       3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_peer_discovery_common    3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_peer_discovery_consul    3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_peer_discovery_etcd      3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_peer_discovery_k8s       3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_prometheus               3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_random_exchange          3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_recent_history_exchange  3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_sharding                 3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_shovel                   3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_shovel_management        3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_stomp                    3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_stream                   3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_stream_management        3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[E*] rabbitmq_top                      3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[E*] rabbitmq_tracing                  3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_trust_store              3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[e*] rabbitmq_web_dispatch             3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_web_mqtt                 3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_web_mqtt_examples        3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_web_stomp                3.9.7</span></span>
<span class="line"><span style="color:#e1e4e8;">[  ] rabbitmq_web_stomp_examples       3.9.7</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@appman rabbitmq]# rabbitmq-plugins list</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Listing plugins with pattern &quot;.*&quot; ...</span></span>
<span class="line"><span style="color:#24292e;"> Configured: E = explicitly enabled; e = implicitly enabled</span></span>
<span class="line"><span style="color:#24292e;"> | Status: * = running on rabbit@appman</span></span>
<span class="line"><span style="color:#24292e;"> |/</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_amqp1_0                  3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_auth_backend_cache       3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_auth_backend_http        3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_auth_backend_ldap        3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_auth_backend_oauth2      3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_auth_mechanism_ssl       3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_consistent_hash_exchange 3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[E*] rabbitmq_delayed_message_exchange 3.9.0</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_event_exchange           3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_federation               3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_federation_management    3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_jms_topic_exchange       3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[E*] rabbitmq_management               3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[e*] rabbitmq_management_agent         3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[E*] rabbitmq_mqtt                     3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_peer_discovery_aws       3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_peer_discovery_common    3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_peer_discovery_consul    3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_peer_discovery_etcd      3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_peer_discovery_k8s       3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_prometheus               3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_random_exchange          3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_recent_history_exchange  3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_sharding                 3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_shovel                   3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_shovel_management        3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_stomp                    3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_stream                   3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_stream_management        3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[E*] rabbitmq_top                      3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[E*] rabbitmq_tracing                  3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_trust_store              3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[e*] rabbitmq_web_dispatch             3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_web_mqtt                 3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_web_mqtt_examples        3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_web_stomp                3.9.7</span></span>
<span class="line"><span style="color:#24292e;">[  ] rabbitmq_web_stomp_examples       3.9.7</span></span></code></pre></div><h3 id="启用插件" tabindex="-1">启用插件 <a class="header-anchor" href="#启用插件" aria-label="Permalink to &quot;启用插件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#不用重启服务</span></span>
<span class="line"><span style="color:#e1e4e8;">[root@appman rabbitmq]# rabbitmq-plugins enable rabbitmq_tracing</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">[root@appman rabbitmq]# rabbitmq-plugins list</span></span>
<span class="line"><span style="color:#e1e4e8;">[E*] rabbitmq_tracing                  3.9.7</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#不用重启服务</span></span>
<span class="line"><span style="color:#24292e;">[root@appman rabbitmq]# rabbitmq-plugins enable rabbitmq_tracing</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">[root@appman rabbitmq]# rabbitmq-plugins list</span></span>
<span class="line"><span style="color:#24292e;">[E*] rabbitmq_tracing                  3.9.7</span></span></code></pre></div><h3 id="停用trace插件" tabindex="-1">停用trace插件 <a class="header-anchor" href="#停用trace插件" aria-label="Permalink to &quot;停用trace插件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@appman rabbitmq]# rabbitmq-plugins disable rabbitmq_tracing</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@appman rabbitmq]# rabbitmq-plugins disable rabbitmq_tracing</span></span></code></pre></div><h3 id="启用跟踪记录" tabindex="-1">启用跟踪记录 <a class="header-anchor" href="#启用跟踪记录" aria-label="Permalink to &quot;启用跟踪记录&quot;">​</a></h3><ul><li>语法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl trace_on -p [virtual host]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl trace_on -p [virtual host]</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#默认是/</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl trace_on</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#默认是/</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl trace_on</span></span></code></pre></div><p>添加完成后我们的虚拟地址下面将多出一个trace交换机,后续所有该虚拟地址下的消息都会在该交换机上进行记录</p><p><img src="`+l+'" alt=""></p><h3 id="关闭跟踪" tabindex="-1">关闭跟踪 <a class="header-anchor" href="#关闭跟踪" aria-label="Permalink to &quot;关闭跟踪&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmqctl trace_off</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmqctl trace_off</span></span></code></pre></div><h3 id="添加日志" tabindex="-1">添加日志 <a class="header-anchor" href="#添加日志" aria-label="Permalink to &quot;添加日志&quot;">​</a></h3><p>点击“Admin”菜单，右边会多出一个“Tracing”的菜单，填写Name(trace名字)、Format、Max payload bytes、Pattern</p><p>然后点击“添加Add trace”即可添加一个日志</p><p><img src="'+p+'" alt=""></p><ul><li>查看效果</li></ul><p><img src="'+t+`" alt=""></p><h3 id="格式说明" tabindex="-1">格式说明 <a class="header-anchor" href="#格式说明" aria-label="Permalink to &quot;格式说明&quot;">​</a></h3><p>Format”表示输出的消息日志格式，有Text和JSON两种，Text格式的日志方便人类阅读，JSON的方便程序解析。 Text格式的消息日志参考如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">================================================================================</span></span>
<span class="line"><span style="color:#e1e4e8;">2017-10-24 9:37:04:412: Message published</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Node:         rabbit@node1</span></span>
<span class="line"><span style="color:#e1e4e8;">Connection:   &lt;rabbit@node1.3.3552.0&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">Virtual host: /</span></span>
<span class="line"><span style="color:#e1e4e8;">User:         root</span></span>
<span class="line"><span style="color:#e1e4e8;">Channel:      1</span></span>
<span class="line"><span style="color:#e1e4e8;">Exchange:     exchange</span></span>
<span class="line"><span style="color:#e1e4e8;">Routing keys: [&lt;&lt;&quot;rk&quot;&gt;&gt;]</span></span>
<span class="line"><span style="color:#e1e4e8;">Routed queues: [&lt;&lt;&quot;queue&quot;&gt;&gt;]</span></span>
<span class="line"><span style="color:#e1e4e8;">Properties:   [{&lt;&lt;&quot;delivery_mode&quot;&gt;&gt;,signedint,1},{&lt;&lt;&quot;headers&quot;&gt;&gt;,table,[]}]</span></span>
<span class="line"><span style="color:#e1e4e8;">Payload: </span></span>
<span class="line"><span style="color:#e1e4e8;">trace test payload.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">================================================================================</span></span>
<span class="line"><span style="color:#24292e;">2017-10-24 9:37:04:412: Message published</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Node:         rabbit@node1</span></span>
<span class="line"><span style="color:#24292e;">Connection:   &lt;rabbit@node1.3.3552.0&gt;</span></span>
<span class="line"><span style="color:#24292e;">Virtual host: /</span></span>
<span class="line"><span style="color:#24292e;">User:         root</span></span>
<span class="line"><span style="color:#24292e;">Channel:      1</span></span>
<span class="line"><span style="color:#24292e;">Exchange:     exchange</span></span>
<span class="line"><span style="color:#24292e;">Routing keys: [&lt;&lt;&quot;rk&quot;&gt;&gt;]</span></span>
<span class="line"><span style="color:#24292e;">Routed queues: [&lt;&lt;&quot;queue&quot;&gt;&gt;]</span></span>
<span class="line"><span style="color:#24292e;">Properties:   [{&lt;&lt;&quot;delivery_mode&quot;&gt;&gt;,signedint,1},{&lt;&lt;&quot;headers&quot;&gt;&gt;,table,[]}]</span></span>
<span class="line"><span style="color:#24292e;">Payload: </span></span>
<span class="line"><span style="color:#24292e;">trace test payload.</span></span></code></pre></div><p>JSON格式的消息日志参考如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;timestamp&quot;: &quot;2017-10-24 9:37:04:412&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;type&quot;: &quot;published&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;node&quot;: &quot;rabbit@node1&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;connection&quot;: &quot;&lt;rabbit@node1.3.3552.0&gt;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;vhost&quot;: &quot;/&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;user&quot;: &quot;root&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;channel&quot;: 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;exchange&quot;: &quot;exchange&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;queue&quot;: &quot;none&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;routed_queues&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;queue&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;routing_keys&quot;: [</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;rk&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ],</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;delivery_mode&quot;: 1,</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;headers&quot;: {}</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;payload&quot;: &quot;dHJhY2UgdGVzdCBwYXlsb2FkLg==&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    &quot;timestamp&quot;: &quot;2017-10-24 9:37:04:412&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;type&quot;: &quot;published&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;node&quot;: &quot;rabbit@node1&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;connection&quot;: &quot;&lt;rabbit@node1.3.3552.0&gt;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;vhost&quot;: &quot;/&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;user&quot;: &quot;root&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;channel&quot;: 1,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;exchange&quot;: &quot;exchange&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;queue&quot;: &quot;none&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;routed_queues&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;queue&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">    &quot;routing_keys&quot;: [</span></span>
<span class="line"><span style="color:#24292e;">        &quot;rk&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ],</span></span>
<span class="line"><span style="color:#24292e;">    &quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;delivery_mode&quot;: 1,</span></span>
<span class="line"><span style="color:#24292e;">        &quot;headers&quot;: {}</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;payload&quot;: &quot;dHJhY2UgdGVzdCBwYXlsb2FkLg==&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>JSON格式的payload（消息体）默认会采用Base64进行编码，如上面的“trace test payload.”会被编码成“dHJhY2UgdGVzdCBwYXlsb2FkLg==”</p><p>“Max payload bytes”表示每条消息的最大限制，单位为B。比如设置了了此值为10，那么当有超过10B的消息经过RabbitMQ流转时，在记录到trace文件的时候会被截断。如上text日志格式中“trace test payload.”会被截断成“trace test”</p><p>“Pattern”用来设置匹配的模式，和Firehose的类似。如“#”匹配所有消息流入流出的情况，即当有客户端生产消息或者消费消息的时候，会把相应的消息日志都记录下来；“publish.#”匹配所有消息流入的情况；“deliver.#”匹配所有消息流出的情况</p><h3 id="查看消息" tabindex="-1">查看消息 <a class="header-anchor" href="#查看消息" aria-label="Permalink to &quot;查看消息&quot;">​</a></h3><p>直接点击trace-log</p><h2 id="_4-webui" tabindex="-1">4.webui <a class="header-anchor" href="#_4-webui" aria-label="Permalink to &quot;4.webui&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">rabbitmq-plugins enable rabbitmq_management</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#需要重启mq 才能访问web界面</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">rabbitmq-plugins enable rabbitmq_management</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#需要重启mq 才能访问web界面</span></span></code></pre></div><h3 id="nginx-代理" tabindex="-1">nginx 代理 <a class="header-anchor" href="#nginx-代理" aria-label="Permalink to &quot;nginx 代理&quot;">​</a></h3><p>正常访问该地址：<a href="https://xxx.xxx.com/mq/" target="_blank" rel="noreferrer">https://xxx.xxx.com/mq/</a> 时能正常跳转，但是 rabbitmq management 的 API url 出现了 %2f 字符，这些字符会在经过 nginx 被转换为</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /mq/ {</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header Host             $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header X-Real-IP        $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#e1e4e8;">	if ($request_uri ~* &quot;/mq/(.*)&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">			proxy_pass http://rabbitmq:15672/$1;</span></span>
<span class="line"><span style="color:#e1e4e8;">			break;</span></span>
<span class="line"><span style="color:#e1e4e8;">	}</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_pass http://rabbitmq:15672/;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /mq/ {</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header Host             $host;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header X-Real-IP        $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292e;">	if ($request_uri ~* &quot;/mq/(.*)&quot;){</span></span>
<span class="line"><span style="color:#24292e;">			proxy_pass http://rabbitmq:15672/$1;</span></span>
<span class="line"><span style="color:#24292e;">			break;</span></span>
<span class="line"><span style="color:#24292e;">	}</span></span>
<span class="line"><span style="color:#24292e;">	proxy_pass http://rabbitmq:15672/;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="_5-管理插件" tabindex="-1">5.管理插件 <a class="header-anchor" href="#_5-管理插件" aria-label="Permalink to &quot;5.管理插件&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@appman rabbitmq]# cat enabled_plugins</span></span>
<span class="line"><span style="color:#e1e4e8;">[rabbitmq_delayed_message_exchange,rabbitmq_management,rabbitmq_mqtt,rabbitmq_top,rabbitmq_tracing].</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">重启一下MQ的服务</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@appman rabbitmq]# cat enabled_plugins</span></span>
<span class="line"><span style="color:#24292e;">[rabbitmq_delayed_message_exchange,rabbitmq_management,rabbitmq_mqtt,rabbitmq_top,rabbitmq_tracing].</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">重启一下MQ的服务</span></span></code></pre></div>`,55),c=[i];function r(b,d,m,y,u,q){return a(),e("div",null,c)}const h=s(o,[["render",r]]);export{g as __pageData,h as default};
