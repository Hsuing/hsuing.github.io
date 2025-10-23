import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const p="/assets/zabbix1.Gjv4Cl2h.png",l="/assets/zabbix2.9wcPNLmi.png",t="/assets/zabbix3.Ld4f7PhZ.png",o="/assets/zabbix4.S4Pqzl-7.png",i="/assets/zabbix5.4Bnl_xCy.png",c="/assets/zabbix6.aRvSZ9cN.png",r="/assets/zabbix7.Zj5oV5m8.png",b="/assets/zabbix8.sUTahoI5.png",u="/assets/zabbix9.KdEE8LDM.png",q="/assets/zabbix10.K3uKSOur.png",m="/assets/zabbix11.XZj9LOM-.png",h="/assets/zabbix12.nWq7LuO_.png",y="/assets/zabbix13.4vWxY1MW.png",d="/assets/zabbix14.g__ARZ1s.png",g="/assets/zabbix15.az0LKUSs.png",_="/assets/zabbix16.duMQw9oo.png",x="/assets/zabbix17.afNGrb9O.png",S=JSON.parse('{"title":"zabbix监控","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/rabbitmq/6-zabbix.md","filePath":"guide/Database/rabbitmq/6-zabbix.md","lastUpdated":1710405635000}'),z={name:"guide/Database/rabbitmq/6-zabbix.md"},v=e(`<p><a href="https://aeric.io/post/rabbitmq-prometheus-monitoring/" target="_blank" rel="noreferrer">https://aeric.io/post/rabbitmq-prometheus-monitoring/</a></p><p><a href="https://www.cnblogs.com/caoweixiong/p/12736573.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/caoweixiong/p/12736573.html</a></p><p><a href="https://www.codenong.com/jsab2f7c1e5ce0/" target="_blank" rel="noreferrer">https://www.codenong.com/jsab2f7c1e5ce0/</a></p><p><a href="https://wqblogs.com/2020/04/09/%E7%9B%91%E6%8E%A7rabbitmq/" target="_blank" rel="noreferrer">https://wqblogs.com/2020/04/09/监控rabbitmq/</a></p><h1 id="zabbix监控" tabindex="-1">zabbix监控 <a class="header-anchor" href="#zabbix监控" aria-label="Permalink to &quot;zabbix监控&quot;">​</a></h1><h2 id="_1、rabbitmq概述" tabindex="-1">1、rabbitmq概述 <a class="header-anchor" href="#_1、rabbitmq概述" aria-label="Permalink to &quot;1、rabbitmq概述&quot;">​</a></h2><p>​ rabbitmq是一个消息中间件，当大量消息生产时，但是消费者无法进行消费，可能会导致消息堆积，面对这种情况应当如何去预防呢？可以通过zabbix监控来rabbitmq消息队列是否出现堆积</p><p>使用的是rabbitmq的命令来实现的</p><p><em>rabbitmqctl list_queues</em></p><h2 id="_2、rabbitmq监控配置" tabindex="-1">2、rabbitmq监控配置 <a class="header-anchor" href="#_2、rabbitmq监控配置" aria-label="Permalink to &quot;2、rabbitmq监控配置&quot;">​</a></h2><p>由于zabbix通过rabbitmqctl权限方面并且还要获取rabbitmq的用户名和密码，所以采用crontab每分钟获取一次rabbitmq获取消息队列名称和消息堆积的数据。具体实现如下，通过一个脚本实现</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># vim /usr/local/zabbix/queues_list.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">rabbitmqctl  list_queues |grep -v &#39;Listing queues ...&#39;  |  grep -v Timeout: &gt; /tmp/.queues.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># vim /usr/local/zabbix/queues_list.sh</span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">rabbitmqctl  list_queues |grep -v &#39;Listing queues ...&#39;  |  grep -v Timeout: &gt; /tmp/.queues.txt</span></span></code></pre></div><p>在crontab -e 添加任务，特别注意：rabbitmq不是绝对路径，所以crontab环境变量一般为/bin,特别注意rabbitmqctl相关命令做个软连接至/bin目录下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># ln -s /sbin/rabbitmqctl  /bin/rabbitmqctl</span></span>
<span class="line"><span style="color:#e1e4e8;"># ln -s /usr/lib/rabbitmq/bin/rabbitmq-env  /bin/rabbitmq-env</span></span>
<span class="line"><span style="color:#e1e4e8;"># ln -s /usr/lib/erlang/bin/erl   /bin/erl</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># RMQ消息告警监控</span></span>
<span class="line"><span style="color:#e1e4e8;">*/1 * * * * /bin/bash /usr/local/zabbix/queues_list.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># ln -s /sbin/rabbitmqctl  /bin/rabbitmqctl</span></span>
<span class="line"><span style="color:#24292e;"># ln -s /usr/lib/rabbitmq/bin/rabbitmq-env  /bin/rabbitmq-env</span></span>
<span class="line"><span style="color:#24292e;"># ln -s /usr/lib/erlang/bin/erl   /bin/erl</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># RMQ消息告警监控</span></span>
<span class="line"><span style="color:#24292e;">*/1 * * * * /bin/bash /usr/local/zabbix/queues_list.sh</span></span></code></pre></div><p>由于消息队列 名称是动态的，所以采用zabbix的自动发现功能，那么为了实现功能</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># vim  /usr/local/zabbix/rabbitmq-queues.sh   </span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">####################################</span></span>
<span class="line"><span style="color:#e1e4e8;">#实现zabbix自动发现功能</span></span>
<span class="line"><span style="color:#e1e4e8;">####################################</span></span>
<span class="line"><span style="color:#e1e4e8;">proc_array=(\`cat /tmp/.queues.txt | awk &#39;{print $1}&#39;\`)</span></span>
<span class="line"><span style="color:#e1e4e8;">length=\${#proc_array[@]}</span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;">printf &quot;{\\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">printf &#39;\\t&#39;&quot;\\&quot;data\\&quot;:[&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">for ((i=0;i&lt;$length;i++))</span></span>
<span class="line"><span style="color:#e1e4e8;">do</span></span>
<span class="line"><span style="color:#e1e4e8;">    printf &quot;\\n\\t\\t{&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    printf &quot;\\&quot;{#QUEUES_NAME}\\&quot;:\\&quot;\${proc_array[$i]}\\&quot;}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if [ $i -lt $[$length-1] ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">        printf &quot;,&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    fi</span></span>
<span class="line"><span style="color:#e1e4e8;">done</span></span>
<span class="line"><span style="color:#e1e4e8;">    printf &quot;\\n\\t]\\n&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">printf &quot;}\\n&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># vim  /usr/local/zabbix/rabbitmq-queues.sh   </span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">####################################</span></span>
<span class="line"><span style="color:#24292e;">#实现zabbix自动发现功能</span></span>
<span class="line"><span style="color:#24292e;">####################################</span></span>
<span class="line"><span style="color:#24292e;">proc_array=(\`cat /tmp/.queues.txt | awk &#39;{print $1}&#39;\`)</span></span>
<span class="line"><span style="color:#24292e;">length=\${#proc_array[@]}</span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;">printf &quot;{\\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">printf &#39;\\t&#39;&quot;\\&quot;data\\&quot;:[&quot;</span></span>
<span class="line"><span style="color:#24292e;">for ((i=0;i&lt;$length;i++))</span></span>
<span class="line"><span style="color:#24292e;">do</span></span>
<span class="line"><span style="color:#24292e;">    printf &quot;\\n\\t\\t{&quot;</span></span>
<span class="line"><span style="color:#24292e;">    printf &quot;\\&quot;{#QUEUES_NAME}\\&quot;:\\&quot;\${proc_array[$i]}\\&quot;}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    if [ $i -lt $[$length-1] ];then</span></span>
<span class="line"><span style="color:#24292e;">        printf &quot;,&quot;</span></span>
<span class="line"><span style="color:#24292e;">    fi</span></span>
<span class="line"><span style="color:#24292e;">done</span></span>
<span class="line"><span style="color:#24292e;">    printf &quot;\\n\\t]\\n&quot;</span></span>
<span class="line"><span style="color:#24292e;">printf &quot;}\\n&quot;</span></span></code></pre></div><p><img src="`+p+`" alt=""></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># vim /usr/local/zabbix/queues_check.sh </span></span>
<span class="line"><span style="color:#e1e4e8;">#!/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">###############################</span></span>
<span class="line"><span style="color:#e1e4e8;">#zabbix获取key</span></span>
<span class="line"><span style="color:#e1e4e8;">###############################</span></span>
<span class="line"><span style="color:#e1e4e8;">queues=$1</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">function rmq_queues {</span></span>
<span class="line"><span style="color:#e1e4e8;">    queues_key=\`cat /tmp/.queues.txt | grep &quot;\\b\${queues}\\b&quot; | awk &#39;{print $2}&#39;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;$queues_key&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rmq_queues</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># vim /usr/local/zabbix/queues_check.sh </span></span>
<span class="line"><span style="color:#24292e;">#!/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">###############################</span></span>
<span class="line"><span style="color:#24292e;">#zabbix获取key</span></span>
<span class="line"><span style="color:#24292e;">###############################</span></span>
<span class="line"><span style="color:#24292e;">queues=$1</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">function rmq_queues {</span></span>
<span class="line"><span style="color:#24292e;">    queues_key=\`cat /tmp/.queues.txt | grep &quot;\\b\${queues}\\b&quot; | awk &#39;{print $2}&#39;\`</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;$queues_key&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rmq_queues</span></span></code></pre></div><h2 id="_3、zabbix-agentd配置" tabindex="-1">3、zabbix_agentd配置 <a class="header-anchor" href="#_3、zabbix-agentd配置" aria-label="Permalink to &quot;3、zabbix_agentd配置&quot;">​</a></h2><p>zabbix_agented配置文件配置如下图：特别注意/etc/zabbix/zabbix_agentd.conf文件中的Timeout参数记得修改为1-30任意数字</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># chown zabbix. -R /usr/local/zabbix/</span></span>
<span class="line"><span style="color:#e1e4e8;"># chmod -R 755  /usr/local/zabbix/</span></span>
<span class="line"><span style="color:#e1e4e8;"># vim /etc/zabbix/zabbix_agentd.d/Items.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">#监控RMQ消息积压</span></span>
<span class="line"><span style="color:#e1e4e8;">UserParameter=rabbitmq.queues,/bin/bash /usr/local/zabbix/rabbitmq-queues.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">UserParameter=queues.check[*],/bin/bash /usr/local/zabbix/queues_check.sh $1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># chown zabbix. -R /usr/local/zabbix/</span></span>
<span class="line"><span style="color:#24292e;"># chmod -R 755  /usr/local/zabbix/</span></span>
<span class="line"><span style="color:#24292e;"># vim /etc/zabbix/zabbix_agentd.d/Items.conf</span></span>
<span class="line"><span style="color:#24292e;">#监控RMQ消息积压</span></span>
<span class="line"><span style="color:#24292e;">UserParameter=rabbitmq.queues,/bin/bash /usr/local/zabbix/rabbitmq-queues.sh</span></span>
<span class="line"><span style="color:#24292e;">UserParameter=queues.check[*],/bin/bash /usr/local/zabbix/queues_check.sh $1</span></span></code></pre></div><h2 id="_4、zabbix-server配置" tabindex="-1">4、zabbix_server配置 <a class="header-anchor" href="#_4、zabbix-server配置" aria-label="Permalink to &quot;4、zabbix_server配置&quot;">​</a></h2><p>以下均是图形配置</p><p>（1）、‘配置’---》‘模块’----》‘创建模板’，如下图：</p><p><img src="`+l+'" alt=""></p><p>（2）、‘模板’对话框如下图：</p><p>​ 模板名：RabbitMQ-Queues</p><p>​ 群组：jzkj</p><p><img src="'+t+'" alt=""></p><p>（3）、创建应用集，如下图：</p><p><img src="'+o+'" alt=""></p><p><img src="'+i+'" alt=""></p><p><img src="'+c+'" alt=""></p><p>（4）、设置‘自动发现规则’，如下图：</p><p><img src="'+r+'" alt=""></p><p><img src="'+b+'" alt=""></p><p><img src="'+u+'" alt=""></p><p>（5）、设置‘监控项原型’，如下图：</p><p><img src="'+q+'" alt=""></p><p><img src="'+m+'" alt=""></p><p><img src="'+h+'" alt=""></p><p>（6）、设置‘触发器类型’，如下图：</p><p><img src="'+y+'" alt=""></p><p><img src="'+d+'" alt=""></p><p><img src="'+g+'" alt=""></p><p><img src="'+_+'" alt=""></p><p><img src="'+x+'" alt=""></p>',47),f=[v];function k($,w,P,C,E,R){return a(),n("div",null,f)}const U=s(z,[["render",k]]);export{S as __pageData,U as default};
