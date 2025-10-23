import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/plus/9-build_user.md","filePath":"guide/Linux/Jenkins/plus/9-build_user.md","lastUpdated":1720533756000}'),p={name:"guide/Linux/Jenkins/plus/9-build_user.md"},l=e(`<h2 id="_1-获取用户名字" tabindex="-1">1.获取用户名字 <a class="header-anchor" href="#_1-获取用户名字" aria-label="Permalink to &quot;1.获取用户名字&quot;">​</a></h2><p>需要两个插件：</p><p>​ build-user-vars-plugin <a href="https://github.com/jenkinsci/build-user-vars-plugin/releases" target="_blank" rel="noreferrer">下载地址</a></p><p>​ Groovy Postbuild</p><p>官方语法：</p><p>​ <a href="http://jenkinsserver/jenkins/pipeline-syntax/globals#en" target="_blank" rel="noreferrer">http://jenkinsServer/jenkins/pipeline-syntax/globals#en</a></p><p>​ <a href="https://plugins.jenkins.io/build-user-vars-plugin/" target="_blank" rel="noreferrer">https://plugins.jenkins.io/build-user-vars-plugin/</a></p><p>pipeline中的全局变量，默认不支持获取当前构建任务的构建人，要想获取构建人的信息</p><p>echo &quot;\${currentBuild.displayName},\${currentBuild.result}&quot;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#Pipeline Examples</span></span>
<span class="line"><span style="color:#e1e4e8;">node {</span></span>
<span class="line"><span style="color:#e1e4e8;">  wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    def user = env.BUILD_USER_ID</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                      sh &#39;echo &quot;\${BUILD_USER}&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      sh &quot;echo \${JOB_NAME} \${BUILD_NUMBER} \${GIT_BRANCH} \${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#Pipeline Examples</span></span>
<span class="line"><span style="color:#24292e;">node {</span></span>
<span class="line"><span style="color:#24292e;">  wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">    def user = env.BUILD_USER_ID</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                      sh &#39;echo &quot;\${BUILD_USER}&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                      sh &quot;echo \${JOB_NAME} \${BUILD_NUMBER} \${GIT_BRANCH} \${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span></code></pre></div><h2 id="_2-设置构建名称" tabindex="-1">2.设置构建名称 <a class="header-anchor" href="#_2-设置构建名称" aria-label="Permalink to &quot;2.设置构建名称&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242127440.jpg" alt=""></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406242128776.jpg" alt=""></p><p>实现方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    // some block</span></span>
<span class="line"><span style="color:#e1e4e8;">                    def user = env.BUILD_USER</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //manager.addShortText(&quot;启动人：\${manager.envVars[&#39;BUILD_USER&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    manager.addShortText(&quot;启动人：\${user}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    </span></span>
<span class="line"><span style="color:#e1e4e8;">                    //buildName &quot;#\${BUILD_NUMBER}-^\${BRANCH}^-\${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    buildName &quot;#\${BUILD_NUMBER}-^\${update}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //输出最新一次提交信息</span></span>
<span class="line"><span style="color:#e1e4e8;">                    HTTPD_LOCATION= sh(  returnStdout: true, script: &#39;git show -s  |grep -vE &quot;commit|Date&quot; |grep -v &quot;^$&quot;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //修改Description&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    buildDescription &quot;\${HTTPD_LOCATION}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    // buildDescription &#39;&lt;span style=&quot;padding-left: 160px;color: #0587d4;&quot;&gt; demo:\${buildVersion}  \${environment}  \${branch} &lt;/span&gt;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                    // some block</span></span>
<span class="line"><span style="color:#24292e;">                    def user = env.BUILD_USER</span></span>
<span class="line"><span style="color:#24292e;">                    //manager.addShortText(&quot;启动人：\${manager.envVars[&#39;BUILD_USER&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                    manager.addShortText(&quot;启动人：\${user}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                    </span></span>
<span class="line"><span style="color:#24292e;">                    //buildName &quot;#\${BUILD_NUMBER}-^\${BRANCH}^-\${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    buildName &quot;#\${BUILD_NUMBER}-^\${update}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //输出最新一次提交信息</span></span>
<span class="line"><span style="color:#24292e;">                    HTTPD_LOCATION= sh(  returnStdout: true, script: &#39;git show -s  |grep -vE &quot;commit|Date&quot; |grep -v &quot;^$&quot;&#39;)</span></span>
<span class="line"><span style="color:#24292e;">                    //修改Description&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    buildDescription &quot;\${HTTPD_LOCATION}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    // buildDescription &#39;&lt;span style=&quot;padding-left: 160px;color: #0587d4;&quot;&gt; demo:\${buildVersion}  \${environment}  \${branch} &lt;/span&gt;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">  agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">  environment {</span></span>
<span class="line"><span style="color:#e1e4e8;">    HOST_TEST = &#39;172.16.195.190&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    HOST_ONLINE = &#39;jenkins@39.101.219.110&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    SOURCE_DIR = &quot;$WORKSPACE/src/EduPayCenter/PayCenterApi/bin/Release/net5.0/linux-x64/publish/*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    TARGET_DIR = &#39;/data/ufun/pay/&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    BUILD_DIR = &quot;$WORKSPACE/src/EduPayCenter/PayCenterApi&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    SERVICE_DIT = &quot;/data/ufun/start_scripts/pay.sh&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    LOG_DIR = &quot;/data/ufun/start_scripts/logs/pay.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">options{</span></span>
<span class="line"><span style="color:#e1e4e8;">        timestamps()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">parameters {</span></span>
<span class="line"><span style="color:#e1e4e8;">    choice(</span></span>
<span class="line"><span style="color:#e1e4e8;">      description: &#39;你需要选择哪个环境进行部署 ?&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      name: &#39;env&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      choices: [&#39;测试环境&#39;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name: &#39;update&#39;, defaultValue: &#39;&#39;, description: &#39;本次更新内容?&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"> stages{</span></span>
<span class="line"><span style="color:#e1e4e8;">      stage(&#39;检查服务&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">			steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">      //</span></span>
<span class="line"><span style="color:#e1e4e8;">            script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    // some block</span></span>
<span class="line"><span style="color:#e1e4e8;">                    def user = env.BUILD_USER</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //manager.addShortText(&quot;启动人：\${manager.envVars[&#39;BUILD_USER&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    manager.addShortText(&quot;启动人：\${user}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    </span></span>
<span class="line"><span style="color:#e1e4e8;">                    //buildName &quot;#\${BUILD_NUMBER}-^\${BRANCH}^-\${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    buildName &quot;#\${BUILD_NUMBER}-^\${update}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //输出最新一次提交信息</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //HTTPD_LOCATION= sh(  returnStdout: true, script: &#39;git show -s  |grep -vE &quot;commit|Date&quot; |grep -v &quot;^$&quot;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //修改Description&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //buildDescription &quot;\${HTTPD_LOCATION}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                    //def healthUrl = null</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //if (&#39;production&#39; == &quot;\${profile}&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        healthUrl = &quot;ssh \${HOST_TEST} &#39;ps -ef|grep PayCenterApi|grep -v grep&#39;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //}</span></span>
<span class="line"><span style="color:#e1e4e8;">                    echo &quot;睡眠两分钟，待应用完全准备好&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    Thread.sleep((long) 1000 * 60 * 1)//睡眠1分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">                    String shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    echo &quot;应用健康检查结果:\${shellStr}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    if (shellStr.indexOf(&quot;/data/ufun/pay/PayCenterApi&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        Thread.sleep((long) 1000 * 60 * 1)//睡眠0.5分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">                        shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#e1e4e8;">                        if (shellStr.indexOf(&quot;/data/ufun/pay/PayCenterApi&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            throw new RuntimeException(&quot;应用不稳定，请检查服务是否正常&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">      // </span></span>
<span class="line"><span style="color:#e1e4e8;">          }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">  agent any</span></span>
<span class="line"><span style="color:#24292e;">  environment {</span></span>
<span class="line"><span style="color:#24292e;">    HOST_TEST = &#39;172.16.195.190&#39;</span></span>
<span class="line"><span style="color:#24292e;">    HOST_ONLINE = &#39;jenkins@39.101.219.110&#39;</span></span>
<span class="line"><span style="color:#24292e;">    SOURCE_DIR = &quot;$WORKSPACE/src/EduPayCenter/PayCenterApi/bin/Release/net5.0/linux-x64/publish/*&quot;</span></span>
<span class="line"><span style="color:#24292e;">    TARGET_DIR = &#39;/data/ufun/pay/&#39;</span></span>
<span class="line"><span style="color:#24292e;">    BUILD_DIR = &quot;$WORKSPACE/src/EduPayCenter/PayCenterApi&quot;</span></span>
<span class="line"><span style="color:#24292e;">    SERVICE_DIT = &quot;/data/ufun/start_scripts/pay.sh&quot;</span></span>
<span class="line"><span style="color:#24292e;">    LOG_DIR = &quot;/data/ufun/start_scripts/logs/pay.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">options{</span></span>
<span class="line"><span style="color:#24292e;">        timestamps()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">parameters {</span></span>
<span class="line"><span style="color:#24292e;">    choice(</span></span>
<span class="line"><span style="color:#24292e;">      description: &#39;你需要选择哪个环境进行部署 ?&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      name: &#39;env&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      choices: [&#39;测试环境&#39;]</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">    string(name: &#39;update&#39;, defaultValue: &#39;&#39;, description: &#39;本次更新内容?&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"> stages{</span></span>
<span class="line"><span style="color:#24292e;">      stage(&#39;检查服务&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">			steps {</span></span>
<span class="line"><span style="color:#24292e;">      //</span></span>
<span class="line"><span style="color:#24292e;">            script {</span></span>
<span class="line"><span style="color:#24292e;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                    // some block</span></span>
<span class="line"><span style="color:#24292e;">                    def user = env.BUILD_USER</span></span>
<span class="line"><span style="color:#24292e;">                    //manager.addShortText(&quot;启动人：\${manager.envVars[&#39;BUILD_USER&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                    manager.addShortText(&quot;启动人：\${user}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                    </span></span>
<span class="line"><span style="color:#24292e;">                    //buildName &quot;#\${BUILD_NUMBER}-^\${BRANCH}^-\${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    buildName &quot;#\${BUILD_NUMBER}-^\${update}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //输出最新一次提交信息</span></span>
<span class="line"><span style="color:#24292e;">                    //HTTPD_LOCATION= sh(  returnStdout: true, script: &#39;git show -s  |grep -vE &quot;commit|Date&quot; |grep -v &quot;^$&quot;&#39;)</span></span>
<span class="line"><span style="color:#24292e;">                    //修改Description&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //buildDescription &quot;\${HTTPD_LOCATION}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                    //def healthUrl = null</span></span>
<span class="line"><span style="color:#24292e;">                    //if (&#39;production&#39; == &quot;\${profile}&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">                        healthUrl = &quot;ssh \${HOST_TEST} &#39;ps -ef|grep PayCenterApi|grep -v grep&#39;&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //}</span></span>
<span class="line"><span style="color:#24292e;">                    echo &quot;睡眠两分钟，待应用完全准备好&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    Thread.sleep((long) 1000 * 60 * 1)//睡眠1分钟</span></span>
<span class="line"><span style="color:#24292e;">                    String shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#24292e;">                    echo &quot;应用健康检查结果:\${shellStr}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    if (shellStr.indexOf(&quot;/data/ufun/pay/PayCenterApi&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    } else {</span></span>
<span class="line"><span style="color:#24292e;">                        Thread.sleep((long) 1000 * 60 * 1)//睡眠0.5分钟</span></span>
<span class="line"><span style="color:#24292e;">                        shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#24292e;">                        if (shellStr.indexOf(&quot;/data/ufun/pay/PayCenterApi&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#24292e;">                            echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        } else {</span></span>
<span class="line"><span style="color:#24292e;">                            throw new RuntimeException(&quot;应用不稳定，请检查服务是否正常&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">      // </span></span>
<span class="line"><span style="color:#24292e;">          }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">2.构建历史中显示更多信息(方式一)</span></span>
<span class="line"><span style="color:#e1e4e8;">安装插件 groovy-postbuild</span></span>
<span class="line"><span style="color:#e1e4e8;">构建后操作步骤 – &gt; Groovy Postbuild --&gt; 填写如下内容 --&gt; 应用 &amp;&amp; 保存</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">manager.addShortText(&quot;部署分支:\${manager.envVars[&#39;GIT_BRANCH&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//common上面参数化 构建的传参取值</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">manager.addShortText(manager.build.buildVariables.get(&quot;common&quot;))</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">//获取代码提交人的信息并显示在历史记录上</span></span>
<span class="line"><span style="color:#e1e4e8;">String command=&#39;cd /root/.jenkins/workspace/OperateFe-Test &amp;&amp; git show -s --pretty=%an&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">def commit= [ &#39;sh&#39;, &#39;-c&#39;, command ].execute().text</span></span>
<span class="line"><span style="color:#e1e4e8;">manager.addShortText(&quot;代码提交人:\${commit}&quot;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">2.构建历史中显示更多信息(方式一)</span></span>
<span class="line"><span style="color:#24292e;">安装插件 groovy-postbuild</span></span>
<span class="line"><span style="color:#24292e;">构建后操作步骤 – &gt; Groovy Postbuild --&gt; 填写如下内容 --&gt; 应用 &amp;&amp; 保存</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">manager.addShortText(&quot;部署分支:\${manager.envVars[&#39;GIT_BRANCH&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//common上面参数化 构建的传参取值</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">manager.addShortText(manager.build.buildVariables.get(&quot;common&quot;))</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">//获取代码提交人的信息并显示在历史记录上</span></span>
<span class="line"><span style="color:#24292e;">String command=&#39;cd /root/.jenkins/workspace/OperateFe-Test &amp;&amp; git show -s --pretty=%an&#39;</span></span>
<span class="line"><span style="color:#24292e;">def commit= [ &#39;sh&#39;, &#39;-c&#39;, command ].execute().text</span></span>
<span class="line"><span style="color:#24292e;">manager.addShortText(&quot;代码提交人:\${commit}&quot;)</span></span></code></pre></div>`,17),o=[l];function t(c,r,i,u,y,d){return n(),a("div",null,o)}const g=s(p,[["render",t]]);export{q as __pageData,g as default};
