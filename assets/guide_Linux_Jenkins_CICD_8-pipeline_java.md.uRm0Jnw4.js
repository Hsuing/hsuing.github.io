import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/8-pipeline_java.md","filePath":"guide/Linux/Jenkins/CICD/8-pipeline_java.md","lastUpdated":1720533756000}'),l={name:"guide/Linux/Jenkins/CICD/8-pipeline_java.md"},p=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent { label &#39;slave&#39; }</span></span>
<span class="line"><span style="color:#e1e4e8;">    options {</span></span>
<span class="line"><span style="color:#e1e4e8;">        timestamps()</span></span>
<span class="line"><span style="color:#e1e4e8;">        disableConcurrentBuilds()</span></span>
<span class="line"><span style="color:#e1e4e8;">        buildDiscarder(</span></span>
<span class="line"><span style="color:#e1e4e8;">            logRotator(</span></span>
<span class="line"><span style="color:#e1e4e8;">                numToKeepStr: &#39;20&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                daysToKeepStr: &#39;30&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">            )</span></span>
<span class="line"><span style="color:#e1e4e8;">        )</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    parameters {</span></span>
<span class="line"><span style="color:#e1e4e8;">        choice(</span></span>
<span class="line"><span style="color:#e1e4e8;">           name: &quot;DEPLOY_FLAG&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">           choices: [&#39;deploy&#39;, &#39;rollback&#39;],</span></span>
<span class="line"><span style="color:#e1e4e8;">           description: &quot;发布/回滚&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        )</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    /*=======================================常修改变量-start=======================================*/</span></span>
<span class="line"><span style="color:#e1e4e8;">    environment {</span></span>
<span class="line"><span style="color:#e1e4e8;">        gitUrl = &quot;git地址&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        branchName = &quot;分支名称&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        gitlabCredentialsId = &quot;认证凭证&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        projectRunDir = &quot;项目运行目录&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        jobName = &quot;\${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        serviceName = &quot;服务名称&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        serviceType = &quot;jar&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        runHosts = &quot;192.168.167.xx,192.168.167.xx&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        rollbackVersion = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Deploy&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            when {</span></span>
<span class="line"><span style="color:#e1e4e8;">                expression { return params.DEPLOY_FLAG == &#39;deploy&#39; }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Pre Env&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;======================================项目名称 = \${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;======================================项目 URL = \${gitUrl}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;======================================项目分支 = \${branchName}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;======================================当前编译版本号 = \${env.BUILD_NUMBER}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Git Clone&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        git branch: &quot;\${branchName}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                        credentialsId: &quot;\${gitlabCredentialsId}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                        url: &quot;\${gitUrl}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Mvn Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        withMaven(jdk: &#39;jdk1.8&#39;, maven: &#39;maven&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            sh &quot;mvn clean package -Dmaven.test.skip=true -U -f \${serviceName}/pom.xml&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Ansible Deploy&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                        script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            sleep 5</span></span>
<span class="line"><span style="color:#e1e4e8;">                            ansiColor(&#39;xterm&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                                ansiblePlaybook colorized: true, extras: &#39;-e &quot;directory=\${projectRunDir}&quot; -e &quot;job=\${jobName}&quot; -e &quot;service=\${serviceName}&quot; -e &quot;type=\${serviceType}&quot;&#39;, installation: &#39;ansible&#39;, inventory: &#39;/etc/ansible/hosts.yml&#39;, limit: &quot;\${runHosts}&quot;, playbook: &#39;/etc/ansible/playbook/deploy-jenkins.yml&#39;                            </span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }   </span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Rollback&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            when {</span></span>
<span class="line"><span style="color:#e1e4e8;">                expression { return params.DEPLOY_FLAG == &#39;rollback&#39; }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    rollbackVersion = input(</span></span>
<span class="line"><span style="color:#e1e4e8;">                        message: &quot;请填写要回滚的版本&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                        parameters: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            string(name:&#39;last_number&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ]</span></span>
<span class="line"><span style="color:#e1e4e8;">                    )</span></span>
<span class="line"><span style="color:#e1e4e8;">                    withEnv([&quot;rollbackVersion=\${rollbackVersion}&quot;]){</span></span>
<span class="line"><span style="color:#e1e4e8;">                        sh &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            echo &quot;正在回滚至就近第\${rollbackVersion}个版本&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            ansible \${runHosts} -m shell -a &quot;sh \${projectRunDir}/rollback.sh \${rollbackVersion} \${serviceName}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    post {</span></span>
<span class="line"><span style="color:#e1e4e8;">        always {</span></span>
<span class="line"><span style="color:#e1e4e8;">            deleteDir()</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        success {</span></span>
<span class="line"><span style="color:#e1e4e8;">            echo &#39;This task is successful!&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent { label &#39;slave&#39; }</span></span>
<span class="line"><span style="color:#24292e;">    options {</span></span>
<span class="line"><span style="color:#24292e;">        timestamps()</span></span>
<span class="line"><span style="color:#24292e;">        disableConcurrentBuilds()</span></span>
<span class="line"><span style="color:#24292e;">        buildDiscarder(</span></span>
<span class="line"><span style="color:#24292e;">            logRotator(</span></span>
<span class="line"><span style="color:#24292e;">                numToKeepStr: &#39;20&#39;,</span></span>
<span class="line"><span style="color:#24292e;">                daysToKeepStr: &#39;30&#39;,</span></span>
<span class="line"><span style="color:#24292e;">            )</span></span>
<span class="line"><span style="color:#24292e;">        )</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    parameters {</span></span>
<span class="line"><span style="color:#24292e;">        choice(</span></span>
<span class="line"><span style="color:#24292e;">           name: &quot;DEPLOY_FLAG&quot;,</span></span>
<span class="line"><span style="color:#24292e;">           choices: [&#39;deploy&#39;, &#39;rollback&#39;],</span></span>
<span class="line"><span style="color:#24292e;">           description: &quot;发布/回滚&quot;</span></span>
<span class="line"><span style="color:#24292e;">        )</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    /*=======================================常修改变量-start=======================================*/</span></span>
<span class="line"><span style="color:#24292e;">    environment {</span></span>
<span class="line"><span style="color:#24292e;">        gitUrl = &quot;git地址&quot;</span></span>
<span class="line"><span style="color:#24292e;">        branchName = &quot;分支名称&quot;</span></span>
<span class="line"><span style="color:#24292e;">        gitlabCredentialsId = &quot;认证凭证&quot;</span></span>
<span class="line"><span style="color:#24292e;">        projectRunDir = &quot;项目运行目录&quot;</span></span>
<span class="line"><span style="color:#24292e;">        jobName = &quot;\${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#24292e;">        serviceName = &quot;服务名称&quot;</span></span>
<span class="line"><span style="color:#24292e;">        serviceType = &quot;jar&quot;</span></span>
<span class="line"><span style="color:#24292e;">        runHosts = &quot;192.168.167.xx,192.168.167.xx&quot;</span></span>
<span class="line"><span style="color:#24292e;">        rollbackVersion = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Deploy&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            when {</span></span>
<span class="line"><span style="color:#24292e;">                expression { return params.DEPLOY_FLAG == &#39;deploy&#39; }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            stages {</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Pre Env&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;======================================项目名称 = \${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;======================================项目 URL = \${gitUrl}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;======================================项目分支 = \${branchName}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;======================================当前编译版本号 = \${env.BUILD_NUMBER}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Git Clone&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        git branch: &quot;\${branchName}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                        credentialsId: &quot;\${gitlabCredentialsId}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                        url: &quot;\${gitUrl}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Mvn Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        withMaven(jdk: &#39;jdk1.8&#39;, maven: &#39;maven&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                            sh &quot;mvn clean package -Dmaven.test.skip=true -U -f \${serviceName}/pom.xml&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Ansible Deploy&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps{</span></span>
<span class="line"><span style="color:#24292e;">                        script {</span></span>
<span class="line"><span style="color:#24292e;">                            sleep 5</span></span>
<span class="line"><span style="color:#24292e;">                            ansiColor(&#39;xterm&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                                ansiblePlaybook colorized: true, extras: &#39;-e &quot;directory=\${projectRunDir}&quot; -e &quot;job=\${jobName}&quot; -e &quot;service=\${serviceName}&quot; -e &quot;type=\${serviceType}&quot;&#39;, installation: &#39;ansible&#39;, inventory: &#39;/etc/ansible/hosts.yml&#39;, limit: &quot;\${runHosts}&quot;, playbook: &#39;/etc/ansible/playbook/deploy-jenkins.yml&#39;                            </span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }   </span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Rollback&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            when {</span></span>
<span class="line"><span style="color:#24292e;">                expression { return params.DEPLOY_FLAG == &#39;rollback&#39; }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                script {</span></span>
<span class="line"><span style="color:#24292e;">                    rollbackVersion = input(</span></span>
<span class="line"><span style="color:#24292e;">                        message: &quot;请填写要回滚的版本&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                        parameters: [</span></span>
<span class="line"><span style="color:#24292e;">                            string(name:&#39;last_number&#39;)</span></span>
<span class="line"><span style="color:#24292e;">                        ]</span></span>
<span class="line"><span style="color:#24292e;">                    )</span></span>
<span class="line"><span style="color:#24292e;">                    withEnv([&quot;rollbackVersion=\${rollbackVersion}&quot;]){</span></span>
<span class="line"><span style="color:#24292e;">                        sh &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                            echo &quot;正在回滚至就近第\${rollbackVersion}个版本&quot;</span></span>
<span class="line"><span style="color:#24292e;">                            ansible \${runHosts} -m shell -a &quot;sh \${projectRunDir}/rollback.sh \${rollbackVersion} \${serviceName}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        &#39;&#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    post {</span></span>
<span class="line"><span style="color:#24292e;">        always {</span></span>
<span class="line"><span style="color:#24292e;">            deleteDir()</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        success {</span></span>
<span class="line"><span style="color:#24292e;">            echo &#39;This task is successful!&#39;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,1),o=[p];function c(t,r,i,y,u,q){return n(),a("div",null,o)}const b=s(l,[["render",c]]);export{d as __pageData,b as default};
