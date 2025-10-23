import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/6-pipeline参数化.md","filePath":"guide/Linux/Jenkins/CICD/6-pipeline参数化.md","lastUpdated":1720533756000}'),p={name:"guide/Linux/Jenkins/CICD/6-pipeline参数化.md"},l=e(`<h2 id="_1-参数化构建界面" tabindex="-1">1.参数化构建界面 <a class="header-anchor" href="#_1-参数化构建界面" aria-label="Permalink to &quot;1.参数化构建界面&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092146448.png" alt=""></p><h2 id="_2-交付流水线界面" tabindex="-1">2.交付流水线界面 <a class="header-anchor" href="#_2-交付流水线界面" aria-label="Permalink to &quot;2.交付流水线界面&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092146610.png" alt=""></p><h2 id="_3-脚本详解" tabindex="-1">3.脚本详解 <a class="header-anchor" href="#_3-脚本详解" aria-label="Permalink to &quot;3.脚本详解&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#!groovy</span></span>
<span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    //在任何可用的代理上执行Pipeline</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">    //参数化变量，目前只支持[booleanParam, choice, credentials, file, text, password, run, string]这几种参数类型，其他高级参数化类型还需等待社区支持。</span></span>
<span class="line"><span style="color:#e1e4e8;">    parameters {</span></span>
<span class="line"><span style="color:#e1e4e8;">    //git代码路径【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name:&#39;repoUrl&#39;, defaultValue: &#39;git@git.*****.com:*****/*****.git&#39;, description: &#39;git代码路径&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //repoBranch参数后续替换成git parameter不再依赖手工输入,JENKINS-46451【git parameters目前还不支持pipeline】</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name:&#39;repoBranch&#39;, defaultValue: &#39;master&#39;, description: &#39;git分支名称&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //pom.xml的相对路径</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name:&#39;pomPath&#39;, defaultValue: &#39;pom.xml&#39;, description: &#39;pom.xml的相对路径&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //war包的相对路径</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name:&#39;warLocation&#39;, defaultValue: &#39;rpc/war/target/*.war&#39;, description: &#39;war包的相对路径 &#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //服务器参数采用了组合方式，避免多次选择，使用docker为更佳实践【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#e1e4e8;">    choice(name: &#39;server&#39;,choices:&#39;192.168.1.107,9090,*****,*****\\n192.168.1.60,9090,*****,*****&#39;, description: &#39;测试服务器列表选择(IP,JettyPort,Name,Passwd)&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //测试服务器的dubbo服务端口</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name:&#39;dubboPort&#39;, defaultValue: &#39;31100&#39;, description: &#39;测试服务器的dubbo服务端口&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //单元测试代码覆盖率要求，各项目视要求调整参数</span></span>
<span class="line"><span style="color:#e1e4e8;">    string(name:&#39;lineCoverage&#39;, defaultValue: &#39;20&#39;, description: &#39;单元测试代码覆盖率要求(%)，小于此值pipeline将会失败！&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    //若勾选在pipelie完成后会邮件通知测试人员进行验收</span></span>
<span class="line"><span style="color:#e1e4e8;">    booleanParam(name: &#39;isCommitQA&#39;,description: &#39;是否邮件通知测试人员进行人工验收&#39;,defaultValue: false )</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    //环境变量，初始确定后一般不需更改</span></span>
<span class="line"><span style="color:#e1e4e8;">    tools {</span></span>
<span class="line"><span style="color:#e1e4e8;">        maven &#39;maven3&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        jdk   &#39;jdk8&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    //常量参数，初始确定后一般不需更改</span></span>
<span class="line"><span style="color:#e1e4e8;">    environment{</span></span>
<span class="line"><span style="color:#e1e4e8;">        //git服务全系统只读账号cred_id【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#e1e4e8;">        CRED_ID=&#39;*****-****-****-****-*********&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        //测试人员邮箱地址【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#e1e4e8;">        QA_EMAIL=&#39;*****@*****.com&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        //接口测试（网络层）的job名，一般由测试人员编写</span></span>
<span class="line"><span style="color:#e1e4e8;">        ITEST_JOBNAME=&#39;Guahao_InterfaceTest_ExpertPatient&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    options {</span></span>
<span class="line"><span style="color:#e1e4e8;">        //保持构建的最大个数</span></span>
<span class="line"><span style="color:#e1e4e8;">        buildDiscarder(logRotator(numToKeepStr: &#39;10&#39;)) </span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    //定期检查开发代码更新，工作日每晚4点做daily build</span></span>
<span class="line"><span style="color:#e1e4e8;">    triggers {</span></span>
<span class="line"><span style="color:#e1e4e8;">        pollSCM(&#39;H 4 * * 1-5&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">   //pipeline运行结果通知给触发者</span></span>
<span class="line"><span style="color:#e1e4e8;">    post{</span></span>
<span class="line"><span style="color:#e1e4e8;">        success{</span></span>
<span class="line"><span style="color:#e1e4e8;">            script { </span></span>
<span class="line"><span style="color:#e1e4e8;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                mail to: &quot;\${BUILD_USER_EMAIL }&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) result&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                body: &quot;\${BUILD_USER}&#39;s pineline &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) run success\\n请及时前往\${env.BUILD_URL}进行查看&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        failure{</span></span>
<span class="line"><span style="color:#e1e4e8;">            script { </span></span>
<span class="line"><span style="color:#e1e4e8;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                mail to: &quot;\${BUILD_USER_EMAIL }&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) result&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                body: &quot;\${BUILD_USER}&#39;s pineline  &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) run failure\\n请及时前往\${env.BUILD_URL}进行查看&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        unstable{</span></span>
<span class="line"><span style="color:#e1e4e8;">            script { </span></span>
<span class="line"><span style="color:#e1e4e8;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                mail to: &quot;\${BUILD_USER_EMAIL }&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER})结果&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                body: &quot;\${BUILD_USER}&#39;s pineline &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) run unstable\\n请及时前往\${env.BUILD_URL}进行查看&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    //pipeline的各个阶段场景</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;代码获取&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">            //根据param.server分割获取参数,包括IP,jettyPort,username,password</span></span>
<span class="line"><span style="color:#e1e4e8;">            script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                def split=params.server.split(&quot;,&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                serverIP=split[0]</span></span>
<span class="line"><span style="color:#e1e4e8;">                jettyPort=split[1]</span></span>
<span class="line"><span style="color:#e1e4e8;">                serverName=split[2]</span></span>
<span class="line"><span style="color:#e1e4e8;">                serverPasswd=split[3]</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">              echo &quot;starting fetchCode from \${params.repoUrl}......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">              // Get some code from a GitHub repository</span></span>
<span class="line"><span style="color:#e1e4e8;">              git credentialsId:CRED_ID, url:params.repoUrl, branch:params.repoBranch</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;单元测试&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">              echo &quot;starting unitTest......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">              //注入jacoco插件配置,clean test执行单元测试代码. All tests should pass.</span></span>
<span class="line"><span style="color:#e1e4e8;">              sh &quot;mvn org.jacoco:jacoco-maven-plugin:prepare-agent -f \${params.pomPath} clean test -Dautoconfig.skip=true -Dmaven.test.skip=false -Dmaven.test.failure.ignore=true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">              junit &#39;**/target/surefire-reports/*.xml&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">              //配置单元测试覆盖率要求，未达到要求pipeline将会fail,code coverage.LineCoverage&gt;20%.</span></span>
<span class="line"><span style="color:#e1e4e8;">              jacoco changeBuildStatus: true, maximumLineCoverage:&quot;\${params.lineCoverage}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;静态检查&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;starting codeAnalyze with SonarQube......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                //sonar:sonar.QualityGate should pass</span></span>
<span class="line"><span style="color:#e1e4e8;">                withSonarQubeEnv(&#39;SonarQube&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                  //固定使用项目根目录\${basedir}下的pom.xml进行代码检查</span></span>
<span class="line"><span style="color:#e1e4e8;">                  sh &quot;mvn -f pom.xml clean compile sonar:sonar&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                timeout(10) { </span></span>
<span class="line"><span style="color:#e1e4e8;">                    //利用sonar webhook功能通知pipeline代码检测结果，未通过质量阈，pipeline将会fail</span></span>
<span class="line"><span style="color:#e1e4e8;">                    def qg = waitForQualityGate() </span></span>
<span class="line"><span style="color:#e1e4e8;">                        if (qg.status != &#39;OK&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            error &quot;未通过Sonarqube的代码质量阈检查，请及时修改！failure: \${qg.status}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;部署测试环境&#39;) { </span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;starting deploy to \${serverIP}......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                //编译和打包</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &quot;mvn  -f \${params.pomPath} clean package -Dautoconfig.skip=true -Dmaven.test.skip=true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                archiveArtifacts warLocation</span></span>
<span class="line"><span style="color:#e1e4e8;">                script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //发布war包到指定服务器，虚拟机文件目录通过shell脚本初始化建立，所以目录是固定的</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &quot;sshpass -p \${serverPasswd} scp \${params.warLocation} \${serverName}@\${serverIP}:htdocs/war&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //这里增加了一个小功能，在服务器上记录了基本部署信息，方便多人使用一套环境时问题排查，storge in {WORKSPACE}/deploy.log  &amp; remoteServer:htdocs/war</span></span>
<span class="line"><span style="color:#e1e4e8;">                    Date date = new Date()</span></span>
<span class="line"><span style="color:#e1e4e8;">                    def deploylog=&quot;\${date.toString()},\${BUILD_USER} use pipeline  &#39;\${JOB_NAME}(\${BUILD_NUMBER})&#39; deploy branch \${params.repoBranch} to server \${serverIP}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    println deploylog</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &quot;echo \${deploylog} &gt;&gt;\${WORKSPACE}/deploy.log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &quot;sshpass -p \${serverPasswd} scp \${WORKSPACE}/deploy.log \${serverName}@\${serverIP}:htdocs/war&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    //jetty restart，重启jetty</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &quot;sshpass -p \${serverPasswd} ssh \${serverName}@\${serverIP} &#39;bin/jettyrestart.sh&#39; &quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">      stage(&#39;接口自动化测试&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;starting interfaceTest......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                 //为确保jetty启动完成，加了一个判断，确保jetty服务器启动可以访问后再执行接口层测试。</span></span>
<span class="line"><span style="color:#e1e4e8;">                 timeout(5) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                     waitUntil {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        try {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            //确保jetty服务的端口启动成功</span></span>
<span class="line"><span style="color:#e1e4e8;">                            sh &quot;nc -z \${serverIP} \${jettyPort}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            //sh &quot;wget -q http://\${serverIP}:\${jettyPort} -O /dev/null&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            return true</span></span>
<span class="line"><span style="color:#e1e4e8;">                        } catch (exception) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            return false</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                //将参数IP和Port传入到接口测试的job，需要确保接口测试的job参数可注入</span></span>
<span class="line"><span style="color:#e1e4e8;">                 build job: ITEST_JOBNAME, parameters: [string(name: &quot;dubbourl&quot;, value: &quot;\${serverIP}:\${params.dubboPort}&quot;)]</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;UI自动化测试&#39;) { </span></span>
<span class="line"><span style="color:#e1e4e8;">             steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">             echo &quot;starting UITest......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">             //这个项目不需要UI层测试，UI自动化与接口测试的pipeline脚本类似</span></span>
<span class="line"><span style="color:#e1e4e8;">             }</span></span>
<span class="line"><span style="color:#e1e4e8;">         }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;性能自动化测试 &#39;) { </span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                 echo &quot;starting performanceTest......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                //视项目需要增加性能的冒烟测试，具体实现后续专文阐述</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;通知人工验收&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                script{</span></span>
<span class="line"><span style="color:#e1e4e8;">                    wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    if(params.isCommitQA==false){</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;不需要通知测试人员人工验收&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }else{</span></span>
<span class="line"><span style="color:#e1e4e8;">                        //邮件通知测试人员人工验收</span></span>
<span class="line"><span style="color:#e1e4e8;">                         mail to: &quot;\${QA_EMAIL}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                         subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER})人工验收通知&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                         body: &quot;\${BUILD_USER}提交的PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER})进入人工验收环节\\n请及时前往\${env.BUILD_URL}进行测试验收&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        // stage(&#39;发布系统&#39;) { </span></span>
<span class="line"><span style="color:#e1e4e8;">        //     steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">        //         echo &quot;starting deploy......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        //     //    TODO发布环节后续专题阐述</span></span>
<span class="line"><span style="color:#e1e4e8;">        //     }</span></span>
<span class="line"><span style="color:#e1e4e8;">        // }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#!groovy</span></span>
<span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    //在任何可用的代理上执行Pipeline</span></span>
<span class="line"><span style="color:#24292e;">    agent any</span></span>
<span class="line"><span style="color:#24292e;">    //参数化变量，目前只支持[booleanParam, choice, credentials, file, text, password, run, string]这几种参数类型，其他高级参数化类型还需等待社区支持。</span></span>
<span class="line"><span style="color:#24292e;">    parameters {</span></span>
<span class="line"><span style="color:#24292e;">    //git代码路径【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#24292e;">    string(name:&#39;repoUrl&#39;, defaultValue: &#39;git@git.*****.com:*****/*****.git&#39;, description: &#39;git代码路径&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    //repoBranch参数后续替换成git parameter不再依赖手工输入,JENKINS-46451【git parameters目前还不支持pipeline】</span></span>
<span class="line"><span style="color:#24292e;">    string(name:&#39;repoBranch&#39;, defaultValue: &#39;master&#39;, description: &#39;git分支名称&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    //pom.xml的相对路径</span></span>
<span class="line"><span style="color:#24292e;">    string(name:&#39;pomPath&#39;, defaultValue: &#39;pom.xml&#39;, description: &#39;pom.xml的相对路径&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    //war包的相对路径</span></span>
<span class="line"><span style="color:#24292e;">    string(name:&#39;warLocation&#39;, defaultValue: &#39;rpc/war/target/*.war&#39;, description: &#39;war包的相对路径 &#39;)</span></span>
<span class="line"><span style="color:#24292e;">    //服务器参数采用了组合方式，避免多次选择，使用docker为更佳实践【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#24292e;">    choice(name: &#39;server&#39;,choices:&#39;192.168.1.107,9090,*****,*****\\n192.168.1.60,9090,*****,*****&#39;, description: &#39;测试服务器列表选择(IP,JettyPort,Name,Passwd)&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    //测试服务器的dubbo服务端口</span></span>
<span class="line"><span style="color:#24292e;">    string(name:&#39;dubboPort&#39;, defaultValue: &#39;31100&#39;, description: &#39;测试服务器的dubbo服务端口&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    //单元测试代码覆盖率要求，各项目视要求调整参数</span></span>
<span class="line"><span style="color:#24292e;">    string(name:&#39;lineCoverage&#39;, defaultValue: &#39;20&#39;, description: &#39;单元测试代码覆盖率要求(%)，小于此值pipeline将会失败！&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    //若勾选在pipelie完成后会邮件通知测试人员进行验收</span></span>
<span class="line"><span style="color:#24292e;">    booleanParam(name: &#39;isCommitQA&#39;,description: &#39;是否邮件通知测试人员进行人工验收&#39;,defaultValue: false )</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    //环境变量，初始确定后一般不需更改</span></span>
<span class="line"><span style="color:#24292e;">    tools {</span></span>
<span class="line"><span style="color:#24292e;">        maven &#39;maven3&#39;</span></span>
<span class="line"><span style="color:#24292e;">        jdk   &#39;jdk8&#39;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    //常量参数，初始确定后一般不需更改</span></span>
<span class="line"><span style="color:#24292e;">    environment{</span></span>
<span class="line"><span style="color:#24292e;">        //git服务全系统只读账号cred_id【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#24292e;">        CRED_ID=&#39;*****-****-****-****-*********&#39;</span></span>
<span class="line"><span style="color:#24292e;">        //测试人员邮箱地址【参数值对外隐藏】</span></span>
<span class="line"><span style="color:#24292e;">        QA_EMAIL=&#39;*****@*****.com&#39;</span></span>
<span class="line"><span style="color:#24292e;">        //接口测试（网络层）的job名，一般由测试人员编写</span></span>
<span class="line"><span style="color:#24292e;">        ITEST_JOBNAME=&#39;Guahao_InterfaceTest_ExpertPatient&#39;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    options {</span></span>
<span class="line"><span style="color:#24292e;">        //保持构建的最大个数</span></span>
<span class="line"><span style="color:#24292e;">        buildDiscarder(logRotator(numToKeepStr: &#39;10&#39;)) </span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    //定期检查开发代码更新，工作日每晚4点做daily build</span></span>
<span class="line"><span style="color:#24292e;">    triggers {</span></span>
<span class="line"><span style="color:#24292e;">        pollSCM(&#39;H 4 * * 1-5&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">   //pipeline运行结果通知给触发者</span></span>
<span class="line"><span style="color:#24292e;">    post{</span></span>
<span class="line"><span style="color:#24292e;">        success{</span></span>
<span class="line"><span style="color:#24292e;">            script { </span></span>
<span class="line"><span style="color:#24292e;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                mail to: &quot;\${BUILD_USER_EMAIL }&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) result&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                body: &quot;\${BUILD_USER}&#39;s pineline &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) run success\\n请及时前往\${env.BUILD_URL}进行查看&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        failure{</span></span>
<span class="line"><span style="color:#24292e;">            script { </span></span>
<span class="line"><span style="color:#24292e;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                mail to: &quot;\${BUILD_USER_EMAIL }&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) result&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                body: &quot;\${BUILD_USER}&#39;s pineline  &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) run failure\\n请及时前往\${env.BUILD_URL}进行查看&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        unstable{</span></span>
<span class="line"><span style="color:#24292e;">            script { </span></span>
<span class="line"><span style="color:#24292e;">                wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                mail to: &quot;\${BUILD_USER_EMAIL }&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER})结果&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                body: &quot;\${BUILD_USER}&#39;s pineline &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER}) run unstable\\n请及时前往\${env.BUILD_URL}进行查看&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    //pipeline的各个阶段场景</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;代码获取&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">            //根据param.server分割获取参数,包括IP,jettyPort,username,password</span></span>
<span class="line"><span style="color:#24292e;">            script {</span></span>
<span class="line"><span style="color:#24292e;">                def split=params.server.split(&quot;,&quot;)</span></span>
<span class="line"><span style="color:#24292e;">                serverIP=split[0]</span></span>
<span class="line"><span style="color:#24292e;">                jettyPort=split[1]</span></span>
<span class="line"><span style="color:#24292e;">                serverName=split[2]</span></span>
<span class="line"><span style="color:#24292e;">                serverPasswd=split[3]</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">              echo &quot;starting fetchCode from \${params.repoUrl}......&quot;</span></span>
<span class="line"><span style="color:#24292e;">              // Get some code from a GitHub repository</span></span>
<span class="line"><span style="color:#24292e;">              git credentialsId:CRED_ID, url:params.repoUrl, branch:params.repoBranch</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;单元测试&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">              echo &quot;starting unitTest......&quot;</span></span>
<span class="line"><span style="color:#24292e;">              //注入jacoco插件配置,clean test执行单元测试代码. All tests should pass.</span></span>
<span class="line"><span style="color:#24292e;">              sh &quot;mvn org.jacoco:jacoco-maven-plugin:prepare-agent -f \${params.pomPath} clean test -Dautoconfig.skip=true -Dmaven.test.skip=false -Dmaven.test.failure.ignore=true&quot;</span></span>
<span class="line"><span style="color:#24292e;">              junit &#39;**/target/surefire-reports/*.xml&#39;</span></span>
<span class="line"><span style="color:#24292e;">              //配置单元测试覆盖率要求，未达到要求pipeline将会fail,code coverage.LineCoverage&gt;20%.</span></span>
<span class="line"><span style="color:#24292e;">              jacoco changeBuildStatus: true, maximumLineCoverage:&quot;\${params.lineCoverage}&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;静态检查&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;starting codeAnalyze with SonarQube......&quot;</span></span>
<span class="line"><span style="color:#24292e;">                //sonar:sonar.QualityGate should pass</span></span>
<span class="line"><span style="color:#24292e;">                withSonarQubeEnv(&#39;SonarQube&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                  //固定使用项目根目录\${basedir}下的pom.xml进行代码检查</span></span>
<span class="line"><span style="color:#24292e;">                  sh &quot;mvn -f pom.xml clean compile sonar:sonar&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                script {</span></span>
<span class="line"><span style="color:#24292e;">                timeout(10) { </span></span>
<span class="line"><span style="color:#24292e;">                    //利用sonar webhook功能通知pipeline代码检测结果，未通过质量阈，pipeline将会fail</span></span>
<span class="line"><span style="color:#24292e;">                    def qg = waitForQualityGate() </span></span>
<span class="line"><span style="color:#24292e;">                        if (qg.status != &#39;OK&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                            error &quot;未通过Sonarqube的代码质量阈检查，请及时修改！failure: \${qg.status}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;部署测试环境&#39;) { </span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;starting deploy to \${serverIP}......&quot;</span></span>
<span class="line"><span style="color:#24292e;">                //编译和打包</span></span>
<span class="line"><span style="color:#24292e;">                sh &quot;mvn  -f \${params.pomPath} clean package -Dautoconfig.skip=true -Dmaven.test.skip=true&quot;</span></span>
<span class="line"><span style="color:#24292e;">                archiveArtifacts warLocation</span></span>
<span class="line"><span style="color:#24292e;">                script {</span></span>
<span class="line"><span style="color:#24292e;">                    wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                    //发布war包到指定服务器，虚拟机文件目录通过shell脚本初始化建立，所以目录是固定的</span></span>
<span class="line"><span style="color:#24292e;">                    sh &quot;sshpass -p \${serverPasswd} scp \${params.warLocation} \${serverName}@\${serverIP}:htdocs/war&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //这里增加了一个小功能，在服务器上记录了基本部署信息，方便多人使用一套环境时问题排查，storge in {WORKSPACE}/deploy.log  &amp; remoteServer:htdocs/war</span></span>
<span class="line"><span style="color:#24292e;">                    Date date = new Date()</span></span>
<span class="line"><span style="color:#24292e;">                    def deploylog=&quot;\${date.toString()},\${BUILD_USER} use pipeline  &#39;\${JOB_NAME}(\${BUILD_NUMBER})&#39; deploy branch \${params.repoBranch} to server \${serverIP}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    println deploylog</span></span>
<span class="line"><span style="color:#24292e;">                    sh &quot;echo \${deploylog} &gt;&gt;\${WORKSPACE}/deploy.log&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    sh &quot;sshpass -p \${serverPasswd} scp \${WORKSPACE}/deploy.log \${serverName}@\${serverIP}:htdocs/war&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    //jetty restart，重启jetty</span></span>
<span class="line"><span style="color:#24292e;">                    sh &quot;sshpass -p \${serverPasswd} ssh \${serverName}@\${serverIP} &#39;bin/jettyrestart.sh&#39; &quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">      stage(&#39;接口自动化测试&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;starting interfaceTest......&quot;</span></span>
<span class="line"><span style="color:#24292e;">                script {</span></span>
<span class="line"><span style="color:#24292e;">                 //为确保jetty启动完成，加了一个判断，确保jetty服务器启动可以访问后再执行接口层测试。</span></span>
<span class="line"><span style="color:#24292e;">                 timeout(5) {</span></span>
<span class="line"><span style="color:#24292e;">                     waitUntil {</span></span>
<span class="line"><span style="color:#24292e;">                        try {</span></span>
<span class="line"><span style="color:#24292e;">                            //确保jetty服务的端口启动成功</span></span>
<span class="line"><span style="color:#24292e;">                            sh &quot;nc -z \${serverIP} \${jettyPort}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                            //sh &quot;wget -q http://\${serverIP}:\${jettyPort} -O /dev/null&quot;</span></span>
<span class="line"><span style="color:#24292e;">                            return true</span></span>
<span class="line"><span style="color:#24292e;">                        } catch (exception) {</span></span>
<span class="line"><span style="color:#24292e;">                            return false</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                //将参数IP和Port传入到接口测试的job，需要确保接口测试的job参数可注入</span></span>
<span class="line"><span style="color:#24292e;">                 build job: ITEST_JOBNAME, parameters: [string(name: &quot;dubbourl&quot;, value: &quot;\${serverIP}:\${params.dubboPort}&quot;)]</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;UI自动化测试&#39;) { </span></span>
<span class="line"><span style="color:#24292e;">             steps{</span></span>
<span class="line"><span style="color:#24292e;">             echo &quot;starting UITest......&quot;</span></span>
<span class="line"><span style="color:#24292e;">             //这个项目不需要UI层测试，UI自动化与接口测试的pipeline脚本类似</span></span>
<span class="line"><span style="color:#24292e;">             }</span></span>
<span class="line"><span style="color:#24292e;">         }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;性能自动化测试 &#39;) { </span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                 echo &quot;starting performanceTest......&quot;</span></span>
<span class="line"><span style="color:#24292e;">                //视项目需要增加性能的冒烟测试，具体实现后续专文阐述</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;通知人工验收&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                script{</span></span>
<span class="line"><span style="color:#24292e;">                    wrap([$class: &#39;BuildUser&#39;]) {</span></span>
<span class="line"><span style="color:#24292e;">                    if(params.isCommitQA==false){</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;不需要通知测试人员人工验收&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }else{</span></span>
<span class="line"><span style="color:#24292e;">                        //邮件通知测试人员人工验收</span></span>
<span class="line"><span style="color:#24292e;">                         mail to: &quot;\${QA_EMAIL}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                         subject: &quot;PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER})人工验收通知&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                         body: &quot;\${BUILD_USER}提交的PineLine &#39;\${JOB_NAME}&#39; (\${BUILD_NUMBER})进入人工验收环节\\n请及时前往\${env.BUILD_URL}进行测试验收&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        // stage(&#39;发布系统&#39;) { </span></span>
<span class="line"><span style="color:#24292e;">        //     steps{</span></span>
<span class="line"><span style="color:#24292e;">        //         echo &quot;starting deploy......&quot;</span></span>
<span class="line"><span style="color:#24292e;">        //     //    TODO发布环节后续专题阐述</span></span>
<span class="line"><span style="color:#24292e;">        //     }</span></span>
<span class="line"><span style="color:#24292e;">        // }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,6),o=[l];function t(c,r,i,y,u,d){return n(),a("div",null,o)}const q=s(p,[["render",t]]);export{g as __pageData,q as default};
