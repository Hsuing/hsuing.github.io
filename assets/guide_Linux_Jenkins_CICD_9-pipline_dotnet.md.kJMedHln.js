import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/9-pipline_dotnet.md","filePath":"guide/Linux/Jenkins/CICD/9-pipline_dotnet.md","lastUpdated":1720533756000}'),l={name:"guide/Linux/Jenkins/CICD/9-pipline_dotnet.md"},p=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">  agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">  environment {</span></span>
<span class="line"><span style="color:#e1e4e8;">    HOST_TEST = &#39;172.16.195.190&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    HOST_ONLINE = &#39;jenkins@39.101.219.110&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    SOURCE_DIR = &quot;$WORKSPACE/src/backend/bin/Release/net5.0/linux-x64/publish/*&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    PROJECT_NAME = &#39;app_backend&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    TARGET_DIR = &quot;/data/ufun/\${PROJECT_NAME}/&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    PROCESS_NAME = &quot;/data/ufun/\${PROJECT_NAME}/backend&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    BUILD_DIR = &quot;$WORKSPACE/src/backend&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    SERVICE_DIT = &quot;/data/ufun/start_scripts/\${PROJECT_NAME}.sh&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    LOG_DIR = &quot;/data/ufun/start_scripts/logs/\${PROJECT_NAME}.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  options{</span></span>
<span class="line"><span style="color:#e1e4e8;">        timestamps()</span></span>
<span class="line"><span style="color:#e1e4e8;">        ansiColor(&#39;xterm&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    	buildDiscarder(logRotator(daysToKeepStr: &#39;6&#39;, numToKeepStr: &#39;5&#39;))</span></span>
<span class="line"><span style="color:#e1e4e8;">        disableConcurrentBuilds()</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  parameters {</span></span>
<span class="line"><span style="color:#e1e4e8;">    choice(</span></span>
<span class="line"><span style="color:#e1e4e8;">      description: &#39;你需要选择哪个环境进行部署 ?&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      name: &#39;env&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      choices: [&#39;测试环境&#39;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">    choice(</span></span>
<span class="line"><span style="color:#e1e4e8;">      description: &#39;你需要选择哪个分支进行部署 ?&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      name: &#39;branchs&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">      choices: [&#39;test&#39;,&#39;dev&#39;]</span></span>
<span class="line"><span style="color:#e1e4e8;">    )</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name: &#39;update&#39;, defaultValue: &#39;&#39;, description: &#39;本次更新内容?&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">  stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">    stage(&#39;获取仓库代码&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">     steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">       script {</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">         //deleteDir()</span></span>
<span class="line"><span style="color:#e1e4e8;">          checkout([$class: &#39;GitSCM&#39;, branches: [[name: &quot;*/$branchs&quot;]], doGenerateSubmoduleConfigurations: false, extensions: [[$class: &#39;CleanBeforeCheckout&#39;]], submoduleCfg: [], userRemoteConfigs: [[url: &#39;git@codefenglei.leihuofeng.net:edu/eiduapp.backend.git&#39;]]])</span></span>
<span class="line"><span style="color:#e1e4e8;">          env.GIT_COMMIT_MSG = sh (script: &#39;git log -1 --pretty=%B \${GIT_COMMIT}&#39;, returnStdout: true).trim()</span></span>
<span class="line"><span style="color:#e1e4e8;">          </span></span>
<span class="line"><span style="color:#e1e4e8;">           wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    // some block</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //def user = env.BUILD_USER</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //manager.addShortText(&quot;启动人：\${manager.envVars[&#39;BUILD_USER&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //manager.addShortText(&quot;启动人：\${user}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    </span></span>
<span class="line"><span style="color:#e1e4e8;">                    //buildName &quot;#\${BUILD_NUMBER}-^\${BRANCH}^-\${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    buildName &quot;#\${BUILD_NUMBER}-^\${env.GIT_COMMIT_MSG}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //输出最新一次提交信息</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //HTTPD_LOCATION= sh(  returnStdout: true, script: &#39;git show -s  |grep -vE &quot;commit|Date&quot; |grep -v &quot;^$&quot;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //修改Description&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //buildDescription &quot;\${HTTPD_LOCATION}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">       }</span></span>
<span class="line"><span style="color:#e1e4e8;">     }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    stage(&#39;build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">		sh &quot; echo 进入到\${BUILD_DIR}目录下&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        set +x</span></span>
<span class="line"><span style="color:#e1e4e8;">        cd \${BUILD_DIR}</span></span>
<span class="line"><span style="color:#e1e4e8;">        /data/apps/sdk5.0/dotnet publish -c Release -r  linux-x64  --self-contained true --configfile \${BUILD_DIR}/nuget.config</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">       </span></span>
<span class="line"><span style="color:#e1e4e8;">       </span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    stage(&#39;deploy service&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      when {</span></span>
<span class="line"><span style="color:#e1e4e8;">        expression {</span></span>
<span class="line"><span style="color:#e1e4e8;">          params.env == &#39;测试环境&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">      steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">        sshagent(credentials: [&#39;beta&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">          //sh &quot;ssh -o StrictHostKeyChecking=no \${HOST_TEST} uname -a&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          //sh &quot;rsync -avzP --exclude=appsettings.json \${SOURCE_DIR} \${HOST_TEST}:\${TARGET_DIR}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          sh &quot;rsync -avzP  \${SOURCE_DIR} \${HOST_TEST}:\${TARGET_DIR}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">          sh &#39;echo &quot;部署成功~&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">     stage(&#39;start service&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">      steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                withEnv([&#39;JENKINS_NODE_COOKIE=dontKillMe&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        export BUILD_ID=dontKillMe</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;开始调用远程对auth进行重启&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ssh -o StrictHostKeyChecking=no \${HOST_TEST} &quot;sh \${SERVICE_DIT} stop&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ssh -o StrictHostKeyChecking=no \${HOST_TEST} &quot;sh \${SERVICE_DIT} start&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;查看启动日志&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ssh -o StrictHostKeyChecking=no \${HOST_TEST} &quot;sleep 10;tail -20 \${LOG_DIR}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">      </span></span>
<span class="line"><span style="color:#e1e4e8;">      stage(&#39;check health&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">			steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">			script{</span></span>
<span class="line"><span style="color:#e1e4e8;">			//</span></span>
<span class="line"><span style="color:#e1e4e8;">				script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //def healthUrl = null</span></span>
<span class="line"><span style="color:#e1e4e8;">                    healthUrl = &quot;ssh \${HOST_TEST} &#39;ps -ef|grep \${PROCESS_NAME}|grep -v grep&#39;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    echo &quot;睡眠1分钟，待应用完全准备好&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    Thread.sleep((long) 1000 * 60 * 1)//睡眠1分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">                    String shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#e1e4e8;">                    echo &quot;应用健康检查结果:\${shellStr}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    if (shellStr.indexOf(&quot;\${PROCESS_NAME}&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        Thread.sleep((long) 1000 * 60 * 1)//睡眠0.5分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">                        shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#e1e4e8;">                        if (shellStr.indexOf(&quot;\${PROCESS_NAME}&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            throw new RuntimeException(&quot;应用不稳定，请检查服务是否正常&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">		 //</span></span>
<span class="line"><span style="color:#e1e4e8;">          }</span></span>
<span class="line"><span style="color:#e1e4e8;">      }</span></span>
<span class="line"><span style="color:#e1e4e8;">   }</span></span>
<span class="line"><span style="color:#e1e4e8;">      </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  post {</span></span>
<span class="line"><span style="color:#e1e4e8;">    success {</span></span>
<span class="line"><span style="color:#e1e4e8;">      dingtalk (</span></span>
<span class="line"><span style="color:#e1e4e8;">        robot: &#39;han&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        type: &#39;ACTION_CARD&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        atAll: true,</span></span>
<span class="line"><span style="color:#e1e4e8;">        title: &#39;你有新的消息，请注意查收&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        hideAvatar: false,</span></span>
<span class="line"><span style="color:#e1e4e8;">        text:[</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;### [\${env.JOB_NAME}](\${env.JOB_URL}) &quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &#39;---&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &#39;- 所属：后端服务&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;- 构建任务：\${env.BUILD_DISPLAY_NAME}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;- Git commit：\${env.GIT_COMMIT_MSG}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;- 本次更新内容：\${params.update}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;- 部署环境：\${params.env}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;- 持续时间：\${currentBuild.durationString}&quot;.split(&quot;and counting&quot;)[0],</span></span>
<span class="line"><span style="color:#e1e4e8;">          &quot;- 构建人: &lt;font color=#EE0000 &gt;\${currentBuild.buildCauses.shortDescription}&lt;/font&gt;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">          &#39;- 构建结果：成功&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        ]</span></span>
<span class="line"><span style="color:#e1e4e8;">      )</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">  agent any</span></span>
<span class="line"><span style="color:#24292e;">  environment {</span></span>
<span class="line"><span style="color:#24292e;">    HOST_TEST = &#39;172.16.195.190&#39;</span></span>
<span class="line"><span style="color:#24292e;">    HOST_ONLINE = &#39;jenkins@39.101.219.110&#39;</span></span>
<span class="line"><span style="color:#24292e;">    SOURCE_DIR = &quot;$WORKSPACE/src/backend/bin/Release/net5.0/linux-x64/publish/*&quot;</span></span>
<span class="line"><span style="color:#24292e;">    PROJECT_NAME = &#39;app_backend&#39;</span></span>
<span class="line"><span style="color:#24292e;">    TARGET_DIR = &quot;/data/ufun/\${PROJECT_NAME}/&quot;</span></span>
<span class="line"><span style="color:#24292e;">    PROCESS_NAME = &quot;/data/ufun/\${PROJECT_NAME}/backend&quot;</span></span>
<span class="line"><span style="color:#24292e;">    BUILD_DIR = &quot;$WORKSPACE/src/backend&quot;</span></span>
<span class="line"><span style="color:#24292e;">    SERVICE_DIT = &quot;/data/ufun/start_scripts/\${PROJECT_NAME}.sh&quot;</span></span>
<span class="line"><span style="color:#24292e;">    LOG_DIR = &quot;/data/ufun/start_scripts/logs/\${PROJECT_NAME}.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  options{</span></span>
<span class="line"><span style="color:#24292e;">        timestamps()</span></span>
<span class="line"><span style="color:#24292e;">        ansiColor(&#39;xterm&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    	buildDiscarder(logRotator(daysToKeepStr: &#39;6&#39;, numToKeepStr: &#39;5&#39;))</span></span>
<span class="line"><span style="color:#24292e;">        disableConcurrentBuilds()</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  parameters {</span></span>
<span class="line"><span style="color:#24292e;">    choice(</span></span>
<span class="line"><span style="color:#24292e;">      description: &#39;你需要选择哪个环境进行部署 ?&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      name: &#39;env&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      choices: [&#39;测试环境&#39;]</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">    choice(</span></span>
<span class="line"><span style="color:#24292e;">      description: &#39;你需要选择哪个分支进行部署 ?&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      name: &#39;branchs&#39;,</span></span>
<span class="line"><span style="color:#24292e;">      choices: [&#39;test&#39;,&#39;dev&#39;]</span></span>
<span class="line"><span style="color:#24292e;">    )</span></span>
<span class="line"><span style="color:#24292e;">    string(name: &#39;update&#39;, defaultValue: &#39;&#39;, description: &#39;本次更新内容?&#39;)</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">  stages {</span></span>
<span class="line"><span style="color:#24292e;">    stage(&#39;获取仓库代码&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">     steps {</span></span>
<span class="line"><span style="color:#24292e;">       script {</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">         //deleteDir()</span></span>
<span class="line"><span style="color:#24292e;">          checkout([$class: &#39;GitSCM&#39;, branches: [[name: &quot;*/$branchs&quot;]], doGenerateSubmoduleConfigurations: false, extensions: [[$class: &#39;CleanBeforeCheckout&#39;]], submoduleCfg: [], userRemoteConfigs: [[url: &#39;git@codefenglei.leihuofeng.net:edu/eiduapp.backend.git&#39;]]])</span></span>
<span class="line"><span style="color:#24292e;">          env.GIT_COMMIT_MSG = sh (script: &#39;git log -1 --pretty=%B \${GIT_COMMIT}&#39;, returnStdout: true).trim()</span></span>
<span class="line"><span style="color:#24292e;">          </span></span>
<span class="line"><span style="color:#24292e;">           wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                    // some block</span></span>
<span class="line"><span style="color:#24292e;">                    //def user = env.BUILD_USER</span></span>
<span class="line"><span style="color:#24292e;">                    //manager.addShortText(&quot;启动人：\${manager.envVars[&#39;BUILD_USER&#39;]}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                    //manager.addShortText(&quot;启动人：\${user}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                    </span></span>
<span class="line"><span style="color:#24292e;">                    //buildName &quot;#\${BUILD_NUMBER}-^\${BRANCH}^-\${BUILD_USER}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    buildName &quot;#\${BUILD_NUMBER}-^\${env.GIT_COMMIT_MSG}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //输出最新一次提交信息</span></span>
<span class="line"><span style="color:#24292e;">                    //HTTPD_LOCATION= sh(  returnStdout: true, script: &#39;git show -s  |grep -vE &quot;commit|Date&quot; |grep -v &quot;^$&quot;&#39;)</span></span>
<span class="line"><span style="color:#24292e;">                    //修改Description&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //buildDescription &quot;\${HTTPD_LOCATION}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">       }</span></span>
<span class="line"><span style="color:#24292e;">     }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    stage(&#39;build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">      steps {</span></span>
<span class="line"><span style="color:#24292e;">		sh &quot; echo 进入到\${BUILD_DIR}目录下&quot;</span></span>
<span class="line"><span style="color:#24292e;">        sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">        set +x</span></span>
<span class="line"><span style="color:#24292e;">        cd \${BUILD_DIR}</span></span>
<span class="line"><span style="color:#24292e;">        /data/apps/sdk5.0/dotnet publish -c Release -r  linux-x64  --self-contained true --configfile \${BUILD_DIR}/nuget.config</span></span>
<span class="line"><span style="color:#24292e;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">       </span></span>
<span class="line"><span style="color:#24292e;">       </span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    stage(&#39;deploy service&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">      when {</span></span>
<span class="line"><span style="color:#24292e;">        expression {</span></span>
<span class="line"><span style="color:#24292e;">          params.env == &#39;测试环境&#39;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">      steps {</span></span>
<span class="line"><span style="color:#24292e;">        sshagent(credentials: [&#39;beta&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">          //sh &quot;ssh -o StrictHostKeyChecking=no \${HOST_TEST} uname -a&quot;</span></span>
<span class="line"><span style="color:#24292e;">          //sh &quot;rsync -avzP --exclude=appsettings.json \${SOURCE_DIR} \${HOST_TEST}:\${TARGET_DIR}&quot;</span></span>
<span class="line"><span style="color:#24292e;">          sh &quot;rsync -avzP  \${SOURCE_DIR} \${HOST_TEST}:\${TARGET_DIR}&quot;</span></span>
<span class="line"><span style="color:#24292e;">          sh &#39;echo &quot;部署成功~&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">     stage(&#39;start service&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">      steps {</span></span>
<span class="line"><span style="color:#24292e;">                withEnv([&#39;JENKINS_NODE_COOKIE=dontKillMe&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                        export BUILD_ID=dontKillMe</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;开始调用远程对auth进行重启&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        ssh -o StrictHostKeyChecking=no \${HOST_TEST} &quot;sh \${SERVICE_DIT} stop&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        ssh -o StrictHostKeyChecking=no \${HOST_TEST} &quot;sh \${SERVICE_DIT} start&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;查看启动日志&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        ssh -o StrictHostKeyChecking=no \${HOST_TEST} &quot;sleep 10;tail -20 \${LOG_DIR}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">      </span></span>
<span class="line"><span style="color:#24292e;">      stage(&#39;check health&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">			steps {</span></span>
<span class="line"><span style="color:#24292e;">			script{</span></span>
<span class="line"><span style="color:#24292e;">			//</span></span>
<span class="line"><span style="color:#24292e;">				script {</span></span>
<span class="line"><span style="color:#24292e;">                    //def healthUrl = null</span></span>
<span class="line"><span style="color:#24292e;">                    healthUrl = &quot;ssh \${HOST_TEST} &#39;ps -ef|grep \${PROCESS_NAME}|grep -v grep&#39;&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    echo &quot;睡眠1分钟，待应用完全准备好&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    Thread.sleep((long) 1000 * 60 * 1)//睡眠1分钟</span></span>
<span class="line"><span style="color:#24292e;">                    String shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#24292e;">                    echo &quot;应用健康检查结果:\${shellStr}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    if (shellStr.indexOf(&quot;\${PROCESS_NAME}&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    } else {</span></span>
<span class="line"><span style="color:#24292e;">                        Thread.sleep((long) 1000 * 60 * 1)//睡眠0.5分钟</span></span>
<span class="line"><span style="color:#24292e;">                        shellStr = sh(script: &quot;\${healthUrl}&quot;, returnStdout: true)</span></span>
<span class="line"><span style="color:#24292e;">                        if (shellStr.indexOf(&quot;\${PROCESS_NAME}&quot;) &gt; 0) {</span></span>
<span class="line"><span style="color:#24292e;">                            echo &quot;应用健康运行&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        } else {</span></span>
<span class="line"><span style="color:#24292e;">                            throw new RuntimeException(&quot;应用不稳定，请检查服务是否正常&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">		 //</span></span>
<span class="line"><span style="color:#24292e;">          }</span></span>
<span class="line"><span style="color:#24292e;">      }</span></span>
<span class="line"><span style="color:#24292e;">   }</span></span>
<span class="line"><span style="color:#24292e;">      </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  post {</span></span>
<span class="line"><span style="color:#24292e;">    success {</span></span>
<span class="line"><span style="color:#24292e;">      dingtalk (</span></span>
<span class="line"><span style="color:#24292e;">        robot: &#39;han&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        type: &#39;ACTION_CARD&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        atAll: true,</span></span>
<span class="line"><span style="color:#24292e;">        title: &#39;你有新的消息，请注意查收&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        hideAvatar: false,</span></span>
<span class="line"><span style="color:#24292e;">        text:[</span></span>
<span class="line"><span style="color:#24292e;">          &quot;### [\${env.JOB_NAME}](\${env.JOB_URL}) &quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &#39;---&#39;,</span></span>
<span class="line"><span style="color:#24292e;">          &#39;- 所属：后端服务&#39;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;- 构建任务：\${env.BUILD_DISPLAY_NAME}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;- Git commit：\${env.GIT_COMMIT_MSG}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;- 本次更新内容：\${params.update}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;- 部署环境：\${params.env}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &quot;- 持续时间：\${currentBuild.durationString}&quot;.split(&quot;and counting&quot;)[0],</span></span>
<span class="line"><span style="color:#24292e;">          &quot;- 构建人: &lt;font color=#EE0000 &gt;\${currentBuild.buildCauses.shortDescription}&lt;/font&gt;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">          &#39;- 构建结果：成功&#39;</span></span>
<span class="line"><span style="color:#24292e;">        ]</span></span>
<span class="line"><span style="color:#24292e;">      )</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,1),o=[p];function t(c,r,i,y,u,q){return n(),a("div",null,o)}const _=s(l,[["render",t]]);export{h as __pageData,_ as default};
