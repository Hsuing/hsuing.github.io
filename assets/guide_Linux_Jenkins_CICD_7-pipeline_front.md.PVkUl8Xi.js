import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/7-pipeline_front.md","filePath":"guide/Linux/Jenkins/CICD/7-pipeline_front.md","lastUpdated":1720533756000}'),l={name:"guide/Linux/Jenkins/CICD/7-pipeline_front.md"},p=e(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent { label &#39;master&#39;}</span></span>
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
<span class="line"><span style="color:#e1e4e8;">        branchName = &quot;选择分支&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        gitlabCredentialsId = &quot;git凭证&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        projectBuildDir = &quot;build&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        projectBuildPath = &quot;\${env.WORKSPACE}/\${projectBuildDir}/&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        nginxIp = &quot;发布ip&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        nginxHtmlRoot = &quot;/tmp/\${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        owner = &quot;font&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        group = &quot;font&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        backupRootDir = &quot;/opt/backup&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        backupJob = &quot;\${backupRootDir}/\${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        backupDir = &quot;\${backupJob}/\${env.BUILD_NUMBER}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        rollbackVersion = &quot;&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    /*=======================================常修改变量-end=======================================*/</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Deploy&#39;) {</span></span>
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
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;======================================项目 Build 文件夹路径 = \${projectBuildPath}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        echo &quot;======================================项目 Nginx 的 ROOT 路径 = \${nginxHtmlRoot}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Git Clone&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        git branch: &quot;\${branchName}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                        credentialsId: &quot;\${gitlabCredentialsId}&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                        url: &quot;\${gitUrl}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    } </span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;NPM Install&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        nodejs(&#39;nodejs&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            sh &quot;npm install&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;NPM Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        nodejs(&#39;nodejs&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            sh &quot;npm run build&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Backup&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    agent { label &#39;ansible&#39;}</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                            try {</span></span>
<span class="line"><span style="color:#e1e4e8;">                                isItBackupToday = sh (returnStatus: true, script:&#39;ansible \${nginxIp} -m shell -a &quot;ls -l --time-style=+%D \${backupJob} | grep $(date +%D)&quot;&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                                if (isItBackupToday !=0){</span></span>
<span class="line"><span style="color:#e1e4e8;">                                    try {</span></span>
<span class="line"><span style="color:#e1e4e8;">                                        sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${backupDir} state=directory owner=\${owner} group=\${group}&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                                        sh &#39;ansible \${nginxIp} -m shell -a &quot;cp -a \${nginxHtmlRoot}/* \${backupDir}&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                                    catch (exc) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                                        echo &#39;Something failed!&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                                    }  </span></span>
<span class="line"><span style="color:#e1e4e8;">                                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }</span></span>
<span class="line"><span style="color:#e1e4e8;">                            catch (exc) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                                echo &#39;Something failed!&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                            }                             </span></span>
<span class="line"><span style="color:#e1e4e8;">                        }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Nginx Deploy&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    agent { label &#39;ansible&#39;}</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        sh &#39;ansible \${nginxIp} -m synchronize -a &quot;src=\${projectBuildPath} dest=\${nginxHtmlRoot} delete=yes&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                        sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${nginxHtmlRoot} owner=\${owner} group=\${group} recurse=yes&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Tar Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        sh &quot;tar -zcf  \${env.JOB_NAME}.tar.gz \${projectBuildDir}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">                stage(&#39;Archive Artifacts&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        archiveArtifacts &quot;\${env.JOB_NAME}.tar.gz&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Rollback&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            when {</span></span>
<span class="line"><span style="color:#e1e4e8;">                expression { return params.DEPLOY_FLAG == &#39;rollback&#39; }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            agent { label &#39;ansible&#39;}</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                script {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;ansible \${nginxIp} -m shell -a &quot;ls -l  \${backupJob}&quot; | grep -v &quot;CHANGED&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    rollbackVersion = input(</span></span>
<span class="line"><span style="color:#e1e4e8;">                        message: &quot;请填写要回滚的版本&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">                        parameters: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                            string(name:&#39;BUILD_NUMBER&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">                        ]</span></span>
<span class="line"><span style="color:#e1e4e8;">                    )</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${nginxHtmlRoot} state=absent&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${nginxHtmlRoot} state=directory owner=\${owner} group=\${group}&quot;&#39;                    </span></span>
<span class="line"><span style="color:#e1e4e8;">                    withEnv([&quot;rollbackVersion=\${rollbackVersion}&quot;]){</span></span>
<span class="line"><span style="color:#e1e4e8;">                        sh &#39;ansible \${nginxIp} -m shell -a &quot;cp -a  \${backupJob}/\${rollbackVersion}/* \${nginxHtmlRoot}&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">    agent { label &#39;master&#39;}</span></span>
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
<span class="line"><span style="color:#24292e;">        branchName = &quot;选择分支&quot;</span></span>
<span class="line"><span style="color:#24292e;">        gitlabCredentialsId = &quot;git凭证&quot;</span></span>
<span class="line"><span style="color:#24292e;">        projectBuildDir = &quot;build&quot;</span></span>
<span class="line"><span style="color:#24292e;">        projectBuildPath = &quot;\${env.WORKSPACE}/\${projectBuildDir}/&quot;</span></span>
<span class="line"><span style="color:#24292e;">        nginxIp = &quot;发布ip&quot;</span></span>
<span class="line"><span style="color:#24292e;">        nginxHtmlRoot = &quot;/tmp/\${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#24292e;">        owner = &quot;font&quot;</span></span>
<span class="line"><span style="color:#24292e;">        group = &quot;font&quot;</span></span>
<span class="line"><span style="color:#24292e;">        backupRootDir = &quot;/opt/backup&quot;</span></span>
<span class="line"><span style="color:#24292e;">        backupJob = &quot;\${backupRootDir}/\${env.JOB_NAME}&quot;</span></span>
<span class="line"><span style="color:#24292e;">        backupDir = &quot;\${backupJob}/\${env.BUILD_NUMBER}&quot;</span></span>
<span class="line"><span style="color:#24292e;">        rollbackVersion = &quot;&quot;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    /*=======================================常修改变量-end=======================================*/</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Deploy&#39;) {</span></span>
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
<span class="line"><span style="color:#24292e;">                        echo &quot;======================================项目 Build 文件夹路径 = \${projectBuildPath}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        echo &quot;======================================项目 Nginx 的 ROOT 路径 = \${nginxHtmlRoot}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Git Clone&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        git branch: &quot;\${branchName}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                        credentialsId: &quot;\${gitlabCredentialsId}&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                        url: &quot;\${gitUrl}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    } </span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;NPM Install&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        nodejs(&#39;nodejs&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                            sh &quot;npm install&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;NPM Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        nodejs(&#39;nodejs&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                            sh &quot;npm run build&quot;</span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Backup&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    agent { label &#39;ansible&#39;}</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        script {</span></span>
<span class="line"><span style="color:#24292e;">                            try {</span></span>
<span class="line"><span style="color:#24292e;">                                isItBackupToday = sh (returnStatus: true, script:&#39;ansible \${nginxIp} -m shell -a &quot;ls -l --time-style=+%D \${backupJob} | grep $(date +%D)&quot;&#39;)</span></span>
<span class="line"><span style="color:#24292e;">                                if (isItBackupToday !=0){</span></span>
<span class="line"><span style="color:#24292e;">                                    try {</span></span>
<span class="line"><span style="color:#24292e;">                                        sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${backupDir} state=directory owner=\${owner} group=\${group}&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                                        sh &#39;ansible \${nginxIp} -m shell -a &quot;cp -a \${nginxHtmlRoot}/* \${backupDir}&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                                    }</span></span>
<span class="line"><span style="color:#24292e;">                                    catch (exc) {</span></span>
<span class="line"><span style="color:#24292e;">                                        echo &#39;Something failed!&#39;</span></span>
<span class="line"><span style="color:#24292e;">                                    }  </span></span>
<span class="line"><span style="color:#24292e;">                                }</span></span>
<span class="line"><span style="color:#24292e;">                            }</span></span>
<span class="line"><span style="color:#24292e;">                            catch (exc) {</span></span>
<span class="line"><span style="color:#24292e;">                                echo &#39;Something failed!&#39;</span></span>
<span class="line"><span style="color:#24292e;">                            }                             </span></span>
<span class="line"><span style="color:#24292e;">                        }</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Nginx Deploy&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    agent { label &#39;ansible&#39;}</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        sh &#39;ansible \${nginxIp} -m synchronize -a &quot;src=\${projectBuildPath} dest=\${nginxHtmlRoot} delete=yes&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                        sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${nginxHtmlRoot} owner=\${owner} group=\${group} recurse=yes&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Tar Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        sh &quot;tar -zcf  \${env.JOB_NAME}.tar.gz \${projectBuildDir}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">                stage(&#39;Archive Artifacts&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    steps {</span></span>
<span class="line"><span style="color:#24292e;">                        archiveArtifacts &quot;\${env.JOB_NAME}.tar.gz&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Rollback&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            when {</span></span>
<span class="line"><span style="color:#24292e;">                expression { return params.DEPLOY_FLAG == &#39;rollback&#39; }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            agent { label &#39;ansible&#39;}</span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                script {</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;ansible \${nginxIp} -m shell -a &quot;ls -l  \${backupJob}&quot; | grep -v &quot;CHANGED&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    rollbackVersion = input(</span></span>
<span class="line"><span style="color:#24292e;">                        message: &quot;请填写要回滚的版本&quot;,</span></span>
<span class="line"><span style="color:#24292e;">                        parameters: [</span></span>
<span class="line"><span style="color:#24292e;">                            string(name:&#39;BUILD_NUMBER&#39;)</span></span>
<span class="line"><span style="color:#24292e;">                        ]</span></span>
<span class="line"><span style="color:#24292e;">                    )</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${nginxHtmlRoot} state=absent&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;ansible \${nginxIp} -m file -a &quot;path=\${nginxHtmlRoot} state=directory owner=\${owner} group=\${group}&quot;&#39;                    </span></span>
<span class="line"><span style="color:#24292e;">                    withEnv([&quot;rollbackVersion=\${rollbackVersion}&quot;]){</span></span>
<span class="line"><span style="color:#24292e;">                        sh &#39;ansible \${nginxIp} -m shell -a &quot;cp -a  \${backupJob}/\${rollbackVersion}/* \${nginxHtmlRoot}&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,1),o=[p];function t(c,i,r,y,u,q){return n(),a("div",null,o)}const h=s(l,[["render",t]]);export{d as __pageData,h as default};
