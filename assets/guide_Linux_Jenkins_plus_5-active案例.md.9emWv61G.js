import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一、active案例","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/plus/5-active案例.md","filePath":"guide/Linux/Jenkins/plus/5-active案例.md","lastUpdated":1720533756000}'),l={name:"guide/Linux/Jenkins/plus/5-active案例.md"},p=e(`<h1 id="一、active案例" tabindex="-1">一、active案例 <a class="header-anchor" href="#一、active案例" aria-label="Permalink to &quot;一、active案例&quot;">​</a></h1><h2 id="_1-rollback" tabindex="-1">1.rollback <a class="header-anchor" href="#_1-rollback" aria-label="Permalink to &quot;1.rollback&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242118788.jpg" alt="active案例"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242118913.jpg" alt="active案例"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Groovy Script :</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">return [</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;tmrm-auth-business-service&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;tmrm-auth-service&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;tmrm-auth-web&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;tmrm-order-service&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Groovy Script :</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">return [</span></span>
<span class="line"><span style="color:#24292e;">&quot;tmrm-auth-business-service&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;tmrm-auth-service&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;tmrm-auth-web&quot;,</span></span>
<span class="line"><span style="color:#24292e;">&quot;tmrm-order-service&quot;</span></span>
<span class="line"><span style="color:#24292e;">]</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242118085.jpg" alt="active案例"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242118868.jpg" alt="active案例"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Groovy Script</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rollback=[&#39;bash&#39;, &#39;-c&#39;, &quot;ssh 172.16.0.96 &#39;sh /data/scritps/less.sh;cat cat /data/scritps/tmrm-order-service.txt&#39; &quot;].execute().text.readLines()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if (actions.equals(&quot;tmrm-order-service&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return rollback</span></span>
<span class="line"><span style="color:#e1e4e8;">} else {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return [&quot;选择action后显示&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Groovy Script</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rollback=[&#39;bash&#39;, &#39;-c&#39;, &quot;ssh 172.16.0.96 &#39;sh /data/scritps/less.sh;cat cat /data/scritps/tmrm-order-service.txt&#39; &quot;].execute().text.readLines()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if (actions.equals(&quot;tmrm-order-service&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">  return rollback</span></span>
<span class="line"><span style="color:#24292e;">} else {</span></span>
<span class="line"><span style="color:#24292e;">  return [&quot;选择action后显示&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242119171.jpg" alt="active案例"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242119119.jpg" alt="active案例"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Groovy Script</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">business=[&quot;all&quot;,&quot;172.16.0.96&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">if (actions.equals(&quot;tmrm-order-service&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return business</span></span>
<span class="line"><span style="color:#e1e4e8;">} else {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return [&quot;选择action后显示&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Groovy Script</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">business=[&quot;all&quot;,&quot;172.16.0.96&quot;]</span></span>
<span class="line"><span style="color:#24292e;">if (actions.equals(&quot;tmrm-order-service&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">  return business</span></span>
<span class="line"><span style="color:#24292e;">} else {</span></span>
<span class="line"><span style="color:#24292e;">  return [&quot;选择action后显示&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>效果图</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242119604.jpg" alt="active案例"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#/bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">echoRed() { echo $&#39;\\e[0;31m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#e1e4e8;">echoYellow() { echo $&#39;\\e[0;33m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">rollbackWar=/data/test_env_project_war/back_war</span></span>
<span class="line"><span style="color:#e1e4e8;">rollbackPath=/data/webapps</span></span>
<span class="line"><span style="color:#e1e4e8;">scripts=/data/webapps/scripts</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">remoteFile=\`ssh $host &quot;ls \${rollbackWar}/$rollback&quot;\`</span></span>
<span class="line"><span style="color:#e1e4e8;">FileName=\${remoteFile##*/}</span></span>
<span class="line"><span style="color:#e1e4e8;">rollbackname=\${FileName%.*}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if [ &quot;$FileName&quot; == &quot;$rollback&quot; ];then</span></span>
<span class="line"><span style="color:#e1e4e8;">	echoRed &quot;该\${FileName}包存在可以回滚&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    echoRed &quot;开始执行替换。。。。&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssh $host &quot;\\cp -f \${rollbackWar}/$rollback $rollbackPath/$rollbackname/\${rollbackname}.jar&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    echoRed &quot;开启启动$rollbackname。。。。&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    ssh $host &quot;sh \${scripts}/order/rollbackService.sh \${sprintActive}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">else</span></span>
<span class="line"><span style="color:#e1e4e8;">	echoRed &quot;该\${FileName}包不存在，请检查该版本之后在回滚&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">	exit 0</span></span>
<span class="line"><span style="color:#e1e4e8;">fi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#/bin/bash</span></span>
<span class="line"><span style="color:#24292e;">echoRed() { echo $&#39;\\e[0;31m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#24292e;">echoYellow() { echo $&#39;\\e[0;33m&#39;&quot;$1&quot;$&#39;\\e[0m&#39;; }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">rollbackWar=/data/test_env_project_war/back_war</span></span>
<span class="line"><span style="color:#24292e;">rollbackPath=/data/webapps</span></span>
<span class="line"><span style="color:#24292e;">scripts=/data/webapps/scripts</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">remoteFile=\`ssh $host &quot;ls \${rollbackWar}/$rollback&quot;\`</span></span>
<span class="line"><span style="color:#24292e;">FileName=\${remoteFile##*/}</span></span>
<span class="line"><span style="color:#24292e;">rollbackname=\${FileName%.*}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if [ &quot;$FileName&quot; == &quot;$rollback&quot; ];then</span></span>
<span class="line"><span style="color:#24292e;">	echoRed &quot;该\${FileName}包存在可以回滚&quot;</span></span>
<span class="line"><span style="color:#24292e;">    echoRed &quot;开始执行替换。。。。&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ssh $host &quot;\\cp -f \${rollbackWar}/$rollback $rollbackPath/$rollbackname/\${rollbackname}.jar&quot;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    echoRed &quot;开启启动$rollbackname。。。。&quot;</span></span>
<span class="line"><span style="color:#24292e;">    ssh $host &quot;sh \${scripts}/order/rollbackService.sh \${sprintActive}&quot;</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">else</span></span>
<span class="line"><span style="color:#24292e;">	echoRed &quot;该\${FileName}包不存在，请检查该版本之后在回滚&quot;</span></span>
<span class="line"><span style="color:#24292e;">	exit 0</span></span>
<span class="line"><span style="color:#24292e;">fi</span></span></code></pre></div><ul><li>if else</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">dev=[&quot;dev-01&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">qa=[&quot;qa-01&quot;,&quot;qa-02&quot;,&quot;qa-03&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">pl= [&quot;pl-01&quot;,&quot;pl-02&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if (env.equals(&quot;dev&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return dev</span></span>
<span class="line"><span style="color:#e1e4e8;">} else if (env.equals(&quot;qa&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return qa</span></span>
<span class="line"><span style="color:#e1e4e8;">} else if (env.equals(&quot;pl&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return pl</span></span>
<span class="line"><span style="color:#e1e4e8;">} else {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return [&quot;Unknown hosts&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">dev=[&quot;dev-01&quot;]</span></span>
<span class="line"><span style="color:#24292e;">qa=[&quot;qa-01&quot;,&quot;qa-02&quot;,&quot;qa-03&quot;]</span></span>
<span class="line"><span style="color:#24292e;">pl= [&quot;pl-01&quot;,&quot;pl-02&quot;]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if (env.equals(&quot;dev&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">  return dev</span></span>
<span class="line"><span style="color:#24292e;">} else if (env.equals(&quot;qa&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">  return qa</span></span>
<span class="line"><span style="color:#24292e;">} else if (env.equals(&quot;pl&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">  return pl</span></span>
<span class="line"><span style="color:#24292e;">} else {</span></span>
<span class="line"><span style="color:#24292e;">  return [&quot;Unknown hosts&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>列出文件列表</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">path=&quot;/data/jenkins/workspace/backup/test-monitor-grade-44s&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">rollback=[&#39;bash&#39;, &#39;-c&#39;, &quot;ls -t1 \${path}&quot;].execute().text.readLines()</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if (Action.equals(&quot;RollBack&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return rollback</span></span>
<span class="line"><span style="color:#e1e4e8;">} else {</span></span>
<span class="line"><span style="color:#e1e4e8;">  return [&quot;选择RollBack后显示&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">path=&quot;/data/jenkins/workspace/backup/test-monitor-grade-44s&quot;</span></span>
<span class="line"><span style="color:#24292e;">rollback=[&#39;bash&#39;, &#39;-c&#39;, &quot;ls -t1 \${path}&quot;].execute().text.readLines()</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if (Action.equals(&quot;RollBack&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">  return rollback</span></span>
<span class="line"><span style="color:#24292e;">} else {</span></span>
<span class="line"><span style="color:#24292e;">  return [&quot;选择RollBack后显示&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="pipeline" tabindex="-1">pipeline <a class="header-anchor" href="#pipeline" aria-label="Permalink to &quot;pipeline&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">properties([</span></span>
<span class="line"><span style="color:#e1e4e8;">    parameters([</span></span>
<span class="line"><span style="color:#e1e4e8;">        [$class: &#39;ChoiceParameter&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            choiceType: &#39;PT_SINGLE_SELECT&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            description: &#39;Select the Env Name from the Dropdown List&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            filterLength: 1, </span></span>
<span class="line"><span style="color:#e1e4e8;">            filterable: true, </span></span>
<span class="line"><span style="color:#e1e4e8;">            name: &#39;Env&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            randomName: &#39;choice-parameter-5631314439613978&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            script: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                $class: &#39;GroovyScript&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">                fallbackScript: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                    classpath: [], </span></span>
<span class="line"><span style="color:#e1e4e8;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">                    script: </span></span>
<span class="line"><span style="color:#e1e4e8;">                        &#39;return[\\&#39;Could not get Env\\&#39;]&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                ], </span></span>
<span class="line"><span style="color:#e1e4e8;">                script: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                    classpath: [], </span></span>
<span class="line"><span style="color:#e1e4e8;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">                    script: </span></span>
<span class="line"><span style="color:#e1e4e8;">                        &#39;return[&quot;Dev&quot;,&quot;QA&quot;,&quot;Stage&quot;,&quot;Prod&quot;]&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                ]</span></span>
<span class="line"><span style="color:#e1e4e8;">            ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        ], </span></span>
<span class="line"><span style="color:#e1e4e8;">        [$class: &#39;CascadeChoiceParameter&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            choiceType: &#39;PT_SINGLE_SELECT&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            description: &#39;Select the Server from the Dropdown List&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            filterLength: 1, </span></span>
<span class="line"><span style="color:#e1e4e8;">            filterable: true, </span></span>
<span class="line"><span style="color:#e1e4e8;">            name: &#39;Server&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            randomName: &#39;choice-parameter-5631314456178619&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            referencedParameters: &#39;Env&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">            script: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                $class: &#39;GroovyScript&#39;, </span></span>
<span class="line"><span style="color:#e1e4e8;">                fallbackScript: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                    classpath: [], </span></span>
<span class="line"><span style="color:#e1e4e8;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">                    script: </span></span>
<span class="line"><span style="color:#e1e4e8;">                        &#39;return[\\&#39;Could not get Environment from Env Param\\&#39;]&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                ], </span></span>
<span class="line"><span style="color:#e1e4e8;">                script: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                    classpath: [], </span></span>
<span class="line"><span style="color:#e1e4e8;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#e1e4e8;">                    script: </span></span>
<span class="line"><span style="color:#e1e4e8;">                        &#39;&#39;&#39; if (Env.equals(&quot;Dev&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">                                return[&quot;devaaa001&quot;,&quot;devaaa002&quot;,&quot;devbbb001&quot;,&quot;devbbb002&quot;,&quot;devccc001&quot;,&quot;devccc002&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                            else if(Env.equals(&quot;QA&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">                                return[&quot;qaaaa001&quot;,&quot;qabbb002&quot;,&quot;qaccc003&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                            else if(Env.equals(&quot;Stage&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">                                return[&quot;staaa001&quot;,&quot;stbbb002&quot;,&quot;stccc003&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                            else if(Env.equals(&quot;Prod&quot;)){</span></span>
<span class="line"><span style="color:#e1e4e8;">                                return[&quot;praaa001&quot;,&quot;prbbb002&quot;,&quot;prccc003&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                        &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                ]</span></span>
<span class="line"><span style="color:#e1e4e8;">            ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        ]</span></span>
<span class="line"><span style="color:#e1e4e8;">    ])</span></span>
<span class="line"><span style="color:#e1e4e8;">])</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">  environment {</span></span>
<span class="line"><span style="color:#e1e4e8;">         vari = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">  stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">      stage (&quot;Example&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">         script{</span></span>
<span class="line"><span style="color:#e1e4e8;">          echo &#39;Hello&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">          echo &quot;\${params.Env}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          echo &quot;\${params.Server}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          //if (params.Server.equals(&quot;Could not get Environment from Env Param&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">          //    echo &quot;Must be the first build after Pipeline deployment.  Aborting the build&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          //    currentBuild.result = &#39;ABORTED&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">          //    return</span></span>
<span class="line"><span style="color:#e1e4e8;">          //}</span></span>
<span class="line"><span style="color:#e1e4e8;">          echo &quot;Crossed param validation&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">			}</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">properties([</span></span>
<span class="line"><span style="color:#24292e;">    parameters([</span></span>
<span class="line"><span style="color:#24292e;">        [$class: &#39;ChoiceParameter&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            choiceType: &#39;PT_SINGLE_SELECT&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            description: &#39;Select the Env Name from the Dropdown List&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            filterLength: 1, </span></span>
<span class="line"><span style="color:#24292e;">            filterable: true, </span></span>
<span class="line"><span style="color:#24292e;">            name: &#39;Env&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            randomName: &#39;choice-parameter-5631314439613978&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            script: [</span></span>
<span class="line"><span style="color:#24292e;">                $class: &#39;GroovyScript&#39;, </span></span>
<span class="line"><span style="color:#24292e;">                fallbackScript: [</span></span>
<span class="line"><span style="color:#24292e;">                    classpath: [], </span></span>
<span class="line"><span style="color:#24292e;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#24292e;">                    script: </span></span>
<span class="line"><span style="color:#24292e;">                        &#39;return[\\&#39;Could not get Env\\&#39;]&#39;</span></span>
<span class="line"><span style="color:#24292e;">                ], </span></span>
<span class="line"><span style="color:#24292e;">                script: [</span></span>
<span class="line"><span style="color:#24292e;">                    classpath: [], </span></span>
<span class="line"><span style="color:#24292e;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#24292e;">                    script: </span></span>
<span class="line"><span style="color:#24292e;">                        &#39;return[&quot;Dev&quot;,&quot;QA&quot;,&quot;Stage&quot;,&quot;Prod&quot;]&#39;</span></span>
<span class="line"><span style="color:#24292e;">                ]</span></span>
<span class="line"><span style="color:#24292e;">            ]</span></span>
<span class="line"><span style="color:#24292e;">        ], </span></span>
<span class="line"><span style="color:#24292e;">        [$class: &#39;CascadeChoiceParameter&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            choiceType: &#39;PT_SINGLE_SELECT&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            description: &#39;Select the Server from the Dropdown List&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            filterLength: 1, </span></span>
<span class="line"><span style="color:#24292e;">            filterable: true, </span></span>
<span class="line"><span style="color:#24292e;">            name: &#39;Server&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            randomName: &#39;choice-parameter-5631314456178619&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            referencedParameters: &#39;Env&#39;, </span></span>
<span class="line"><span style="color:#24292e;">            script: [</span></span>
<span class="line"><span style="color:#24292e;">                $class: &#39;GroovyScript&#39;, </span></span>
<span class="line"><span style="color:#24292e;">                fallbackScript: [</span></span>
<span class="line"><span style="color:#24292e;">                    classpath: [], </span></span>
<span class="line"><span style="color:#24292e;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#24292e;">                    script: </span></span>
<span class="line"><span style="color:#24292e;">                        &#39;return[\\&#39;Could not get Environment from Env Param\\&#39;]&#39;</span></span>
<span class="line"><span style="color:#24292e;">                ], </span></span>
<span class="line"><span style="color:#24292e;">                script: [</span></span>
<span class="line"><span style="color:#24292e;">                    classpath: [], </span></span>
<span class="line"><span style="color:#24292e;">                    sandbox: false, </span></span>
<span class="line"><span style="color:#24292e;">                    script: </span></span>
<span class="line"><span style="color:#24292e;">                        &#39;&#39;&#39; if (Env.equals(&quot;Dev&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">                                return[&quot;devaaa001&quot;,&quot;devaaa002&quot;,&quot;devbbb001&quot;,&quot;devbbb002&quot;,&quot;devccc001&quot;,&quot;devccc002&quot;]</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                            else if(Env.equals(&quot;QA&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">                                return[&quot;qaaaa001&quot;,&quot;qabbb002&quot;,&quot;qaccc003&quot;]</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                            else if(Env.equals(&quot;Stage&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">                                return[&quot;staaa001&quot;,&quot;stbbb002&quot;,&quot;stccc003&quot;]</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                            else if(Env.equals(&quot;Prod&quot;)){</span></span>
<span class="line"><span style="color:#24292e;">                                return[&quot;praaa001&quot;,&quot;prbbb002&quot;,&quot;prccc003&quot;]</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                        &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                ]</span></span>
<span class="line"><span style="color:#24292e;">            ]</span></span>
<span class="line"><span style="color:#24292e;">        ]</span></span>
<span class="line"><span style="color:#24292e;">    ])</span></span>
<span class="line"><span style="color:#24292e;">])</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">  environment {</span></span>
<span class="line"><span style="color:#24292e;">         vari = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  agent any</span></span>
<span class="line"><span style="color:#24292e;">  stages {</span></span>
<span class="line"><span style="color:#24292e;">      stage (&quot;Example&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">        steps {</span></span>
<span class="line"><span style="color:#24292e;">         script{</span></span>
<span class="line"><span style="color:#24292e;">          echo &#39;Hello&#39;</span></span>
<span class="line"><span style="color:#24292e;">          echo &quot;\${params.Env}&quot;</span></span>
<span class="line"><span style="color:#24292e;">          echo &quot;\${params.Server}&quot;</span></span>
<span class="line"><span style="color:#24292e;">          //if (params.Server.equals(&quot;Could not get Environment from Env Param&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">          //    echo &quot;Must be the first build after Pipeline deployment.  Aborting the build&quot;</span></span>
<span class="line"><span style="color:#24292e;">          //    currentBuild.result = &#39;ABORTED&#39;</span></span>
<span class="line"><span style="color:#24292e;">          //    return</span></span>
<span class="line"><span style="color:#24292e;">          //}</span></span>
<span class="line"><span style="color:#24292e;">          echo &quot;Crossed param validation&quot;</span></span>
<span class="line"><span style="color:#24292e;">			}</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>url:</p><p><a href="http://wiki.eryajf.net/pages/2075.html#_3-%E8%B0%83%E6%95%B4shell%E3%80%82" target="_blank" rel="noreferrer">http://wiki.eryajf.net/pages/2075.html#_3-调整shell。</a></p><p><a href="http://blog.leanote.com/post/benmo/jenkins%E5%9F%BA%E4%BA%8EAnsible%E8%87%AA%E5%8A%A8%E5%8F%91%E5%B8%83spring-boot-cloud%E9%A1%B9%E7%9B%AE-%E9%9D%9EK8S" target="_blank" rel="noreferrer">http://blog.leanote.com/post/benmo/jenkins基于Ansible自动发布spring-boot-cloud项目-非K8S</a></p><p><a href="https://wiki.eryajf.net/pages/3510.html#_3-%E4%BC%98%E5%8C%96%E6%96%B9%E6%A1%88" target="_blank" rel="noreferrer">https://wiki.eryajf.net/pages/3510.html#_3-优化方案</a></p><p><a href="https://blog.51cto.com/u_3388803/2519849" target="_blank" rel="noreferrer">https://blog.51cto.com/u_3388803/2519849</a></p><p><a href="https://blog.csdn.net/TOBEALISTENNER/article/details/109071609" target="_blank" rel="noreferrer">https://blog.csdn.net/TOBEALISTENNER/article/details/109071609</a></p>`,26),o=[p];function t(c,r,i,u,y,q){return n(),a("div",null,o)}const b=s(l,[["render",t]]);export{h as __pageData,b as default};
