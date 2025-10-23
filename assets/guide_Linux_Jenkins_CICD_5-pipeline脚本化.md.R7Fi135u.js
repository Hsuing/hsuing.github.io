import{_ as s,o as n,c as e,R as a}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"案例","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/5-pipeline脚本化.md","filePath":"guide/Linux/Jenkins/CICD/5-pipeline脚本化.md","lastUpdated":1720533756000}'),l={name:"guide/Linux/Jenkins/CICD/5-pipeline脚本化.md"},p=a(`<h1 id="案例" tabindex="-1">案例 <a class="header-anchor" href="#案例" aria-label="Permalink to &quot;案例&quot;">​</a></h1><h2 id="_1-try" tabindex="-1">1.try <a class="header-anchor" href="#_1-try" aria-label="Permalink to &quot;1.try&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">import groovy.json.JsonSlurper</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">node {</span></span>
<span class="line"><span style="color:#e1e4e8;">    currentBuild.result = &quot;SUCCESS&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    echo &quot;PWD: \${pwd()}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // 判断发布环境</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (env.BRANCH_NAME == &#39;release&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        env.PRO_ENV = &quot;pro&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">        env.PRO_ENV = &quot;test&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // 默认设置</span></span>
<span class="line"><span style="color:#e1e4e8;">    env.VERSION = &#39;1.0.0&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    env.credentialsId = &#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    env.host = &#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    env.registryName = &#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    def imageName = &#39;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    def input_result // 用户输入项</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    try {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;config&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            echo &quot;Branch: \${env.BRANCH_NAME}, Environment: \${env.PRO_ENV}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            input_result = input message: &#39;Check Tasks&#39;, ok: &#39;ok&#39;, parameters: [</span></span>
<span class="line"><span style="color:#e1e4e8;">                booleanParam(name: &#39;install&#39;, defaultValue: false),</span></span>
<span class="line"><span style="color:#e1e4e8;">                booleanParam(name: &#39;test&#39;, defaultValue: true),</span></span>
<span class="line"><span style="color:#e1e4e8;">                booleanParam(name: &#39;deploy&#39;, defaultValue: true)</span></span>
<span class="line"><span style="color:#e1e4e8;">            ]</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        </span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Checkout&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 重置本地修改项</span></span>
<span class="line"><span style="color:#e1e4e8;">            try {</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;git checkout .&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            } catch (err) {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            </span></span>
<span class="line"><span style="color:#e1e4e8;">            checkout scm</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">            // 读取配置信息</span></span>
<span class="line"><span style="color:#e1e4e8;">            if(fileExists(&#39;config.json&#39;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                def str = readFile &#39;config.json&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                def jsonSlurper = new JsonSlurper()</span></span>
<span class="line"><span style="color:#e1e4e8;">                def obj = jsonSlurper.parseText(str)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                env.registryName = obj.registryName</span></span>
<span class="line"><span style="color:#e1e4e8;">                def envConifg = obj.env[env.PRO_ENV]</span></span>
<span class="line"><span style="color:#e1e4e8;">                </span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;envConifg: \${envConifg}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                env.VERSION = obj.version</span></span>
<span class="line"><span style="color:#e1e4e8;">                env.credentialsId = envConifg.credentialsId</span></span>
<span class="line"><span style="color:#e1e4e8;">                env.host = envConifg.host</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                imageName = &quot;\${env.registryName}:\${env.VERSION}_\${env.PRO_ENV}_\${BUILD_NUMBER}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;VERSION: \${env.VERSION} \${imageName}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            </span></span>
<span class="line"><span style="color:#e1e4e8;">            sh &#39;ls&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Install&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            if(input_result.install) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                docker.image(&#39;node:9.6.0&#39;).inside {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;node -v&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;sh ./scripts/install.sh&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Test&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            if(input_result.test) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                docker.image(&#39;node:9.6.0&#39;).inside {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sh &#39;sh ./scripts/test.sh&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Build Docker&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 构建上传镜像到容器仓库</span></span>
<span class="line"><span style="color:#e1e4e8;">            if(input_result.deploy) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                def customImage = docker.build(imageName, &quot;--build-arg PRO_ENV=\${env.PRO_ENV} .&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                docker.withRegistry(&quot;https://\${env.registryName}&quot;, &#39;docker-demo&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    /* Push the container to the custom Registry */</span></span>
<span class="line"><span style="color:#e1e4e8;">                    customImage.push()</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Deploy&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            if(input_result.deploy) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                // wechat服务器</span></span>
<span class="line"><span style="color:#e1e4e8;">                withCredentials([usernamePassword(credentialsId: env.credentialsId, usernameVariable: &#39;USER&#39;, passwordVariable: &#39;PWD&#39;)]) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    def otherArgs = &#39;-p 8001:8001&#39; // 区分不同环境的启动参数</span></span>
<span class="line"><span style="color:#e1e4e8;">                    def remote = [:]</span></span>
<span class="line"><span style="color:#e1e4e8;">                    remote.name = &#39;ssh-deploy&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    remote.allowAnyHosts = true</span></span>
<span class="line"><span style="color:#e1e4e8;">                    remote.host = env.host</span></span>
<span class="line"><span style="color:#e1e4e8;">                    remote.user = USER</span></span>
<span class="line"><span style="color:#e1e4e8;">                    remote.password = PWD</span></span>
<span class="line"><span style="color:#e1e4e8;">                </span></span>
<span class="line"><span style="color:#e1e4e8;">                    if(env.PRO_ENV == &quot;pro&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        otherArgs = &#39;-p 3000:3000&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                    try {</span></span>
<span class="line"><span style="color:#e1e4e8;">                        sshCommand remote: remote, command: &quot;docker rm -f demo&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    } catch (err) {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                    }</span></span>
<span class="line"><span style="color:#e1e4e8;">                    sshCommand remote: remote, command: &quot;docker run -d --name demo -v /etc/localtime:/etc/localtime -e PRO_ENV=&#39;\${env.PRO_ENV}&#39; \${otherArgs} \${imageName}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">                // 删除旧的镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &quot;docker rmi -f \${imageName.replaceAll(&quot;_\${BUILD_NUMBER}&quot;, &quot;_\${BUILD_NUMBER - 1}&quot;)}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    catch (err) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        currentBuild.result = &quot;FAILURE&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        throw err</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">import groovy.json.JsonSlurper</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">node {</span></span>
<span class="line"><span style="color:#24292e;">    currentBuild.result = &quot;SUCCESS&quot;</span></span>
<span class="line"><span style="color:#24292e;">    echo &quot;PWD: \${pwd()}&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // 判断发布环境</span></span>
<span class="line"><span style="color:#24292e;">    if (env.BRANCH_NAME == &#39;release&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">        env.PRO_ENV = &quot;pro&quot;</span></span>
<span class="line"><span style="color:#24292e;">    } else {</span></span>
<span class="line"><span style="color:#24292e;">        env.PRO_ENV = &quot;test&quot;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // 默认设置</span></span>
<span class="line"><span style="color:#24292e;">    env.VERSION = &#39;1.0.0&#39;</span></span>
<span class="line"><span style="color:#24292e;">    env.credentialsId = &#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">    env.host = &#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">    env.registryName = &#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">    def imageName = &#39;&#39;</span></span>
<span class="line"><span style="color:#24292e;">    def input_result // 用户输入项</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    try {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;config&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            echo &quot;Branch: \${env.BRANCH_NAME}, Environment: \${env.PRO_ENV}&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            input_result = input message: &#39;Check Tasks&#39;, ok: &#39;ok&#39;, parameters: [</span></span>
<span class="line"><span style="color:#24292e;">                booleanParam(name: &#39;install&#39;, defaultValue: false),</span></span>
<span class="line"><span style="color:#24292e;">                booleanParam(name: &#39;test&#39;, defaultValue: true),</span></span>
<span class="line"><span style="color:#24292e;">                booleanParam(name: &#39;deploy&#39;, defaultValue: true)</span></span>
<span class="line"><span style="color:#24292e;">            ]</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        </span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Checkout&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            // 重置本地修改项</span></span>
<span class="line"><span style="color:#24292e;">            try {</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;git checkout .&#39;</span></span>
<span class="line"><span style="color:#24292e;">            } catch (err) {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            </span></span>
<span class="line"><span style="color:#24292e;">            checkout scm</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">            // 读取配置信息</span></span>
<span class="line"><span style="color:#24292e;">            if(fileExists(&#39;config.json&#39;)) {</span></span>
<span class="line"><span style="color:#24292e;">                def str = readFile &#39;config.json&#39;</span></span>
<span class="line"><span style="color:#24292e;">                def jsonSlurper = new JsonSlurper()</span></span>
<span class="line"><span style="color:#24292e;">                def obj = jsonSlurper.parseText(str)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                env.registryName = obj.registryName</span></span>
<span class="line"><span style="color:#24292e;">                def envConifg = obj.env[env.PRO_ENV]</span></span>
<span class="line"><span style="color:#24292e;">                </span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;envConifg: \${envConifg}&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                env.VERSION = obj.version</span></span>
<span class="line"><span style="color:#24292e;">                env.credentialsId = envConifg.credentialsId</span></span>
<span class="line"><span style="color:#24292e;">                env.host = envConifg.host</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                imageName = &quot;\${env.registryName}:\${env.VERSION}_\${env.PRO_ENV}_\${BUILD_NUMBER}&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;VERSION: \${env.VERSION} \${imageName}&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            </span></span>
<span class="line"><span style="color:#24292e;">            sh &#39;ls&#39;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Install&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            if(input_result.install) {</span></span>
<span class="line"><span style="color:#24292e;">                docker.image(&#39;node:9.6.0&#39;).inside {</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;node -v&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;sh ./scripts/install.sh&#39;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Test&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            if(input_result.test) {</span></span>
<span class="line"><span style="color:#24292e;">                docker.image(&#39;node:9.6.0&#39;).inside {</span></span>
<span class="line"><span style="color:#24292e;">                    sh &#39;sh ./scripts/test.sh&#39;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Build Docker&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            // 构建上传镜像到容器仓库</span></span>
<span class="line"><span style="color:#24292e;">            if(input_result.deploy) {</span></span>
<span class="line"><span style="color:#24292e;">                def customImage = docker.build(imageName, &quot;--build-arg PRO_ENV=\${env.PRO_ENV} .&quot;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                docker.withRegistry(&quot;https://\${env.registryName}&quot;, &#39;docker-demo&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">                    /* Push the container to the custom Registry */</span></span>
<span class="line"><span style="color:#24292e;">                    customImage.push()</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Deploy&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            if(input_result.deploy) {</span></span>
<span class="line"><span style="color:#24292e;">                // wechat服务器</span></span>
<span class="line"><span style="color:#24292e;">                withCredentials([usernamePassword(credentialsId: env.credentialsId, usernameVariable: &#39;USER&#39;, passwordVariable: &#39;PWD&#39;)]) {</span></span>
<span class="line"><span style="color:#24292e;">                    def otherArgs = &#39;-p 8001:8001&#39; // 区分不同环境的启动参数</span></span>
<span class="line"><span style="color:#24292e;">                    def remote = [:]</span></span>
<span class="line"><span style="color:#24292e;">                    remote.name = &#39;ssh-deploy&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    remote.allowAnyHosts = true</span></span>
<span class="line"><span style="color:#24292e;">                    remote.host = env.host</span></span>
<span class="line"><span style="color:#24292e;">                    remote.user = USER</span></span>
<span class="line"><span style="color:#24292e;">                    remote.password = PWD</span></span>
<span class="line"><span style="color:#24292e;">                </span></span>
<span class="line"><span style="color:#24292e;">                    if(env.PRO_ENV == &quot;pro&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">                        otherArgs = &#39;-p 3000:3000&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                    try {</span></span>
<span class="line"><span style="color:#24292e;">                        sshCommand remote: remote, command: &quot;docker rm -f demo&quot;</span></span>
<span class="line"><span style="color:#24292e;">                    } catch (err) {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                    }</span></span>
<span class="line"><span style="color:#24292e;">                    sshCommand remote: remote, command: &quot;docker run -d --name demo -v /etc/localtime:/etc/localtime -e PRO_ENV=&#39;\${env.PRO_ENV}&#39; \${otherArgs} \${imageName}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">                // 删除旧的镜像</span></span>
<span class="line"><span style="color:#24292e;">                sh &quot;docker rmi -f \${imageName.replaceAll(&quot;_\${BUILD_NUMBER}&quot;, &quot;_\${BUILD_NUMBER - 1}&quot;)}&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    catch (err) {</span></span>
<span class="line"><span style="color:#24292e;">        currentBuild.result = &quot;FAILURE&quot;</span></span>
<span class="line"><span style="color:#24292e;">        throw err</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2-判断文件" tabindex="-1">2.判断文件 <a class="header-anchor" href="#_2-判断文件" aria-label="Permalink to &quot;2.判断文件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">//判断基础文件夹是否存在，不存在创建</span></span>
<span class="line"><span style="color:#e1e4e8;">sh &quot;sshpass -p \${docker_serverPasswd} ssh -o StrictHostKeyChecking=no \${docker_serverName}@\${docker_serverIP} &#39;test -d \${docker_serverPath}\${serviceNM} || mkdir -p \${docker_serverPath}\${serviceNM}&#39;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">//判断基础文件夹是否存在，不存在创建</span></span>
<span class="line"><span style="color:#24292e;">sh &quot;sshpass -p \${docker_serverPasswd} ssh -o StrictHostKeyChecking=no \${docker_serverName}@\${docker_serverIP} &#39;test -d \${docker_serverPath}\${serviceNM} || mkdir -p \${docker_serverPath}\${serviceNM}&#39;&quot;</span></span></code></pre></div><h2 id="_3-交互" tabindex="-1">3.交互 <a class="header-anchor" href="#_3-交互" aria-label="Permalink to &quot;3.交互&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline{</span></span>
<span class="line"><span style="color:#e1e4e8;">    agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">    triggers{</span></span>
<span class="line"><span style="color:#e1e4e8;">        upstream(upstreamProjects: &#39;job1,job2&#39;, threshold: hudson.model.Result.SUCCESS)</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages{</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;pre deploy&#39;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                script{</span></span>
<span class="line"><span style="color:#e1e4e8;">                    BRANCHES = sh  returnStdout: true, script: &#39;git branch -r | grep -v HEAD &gt; out.txt; git tag &gt;&gt; out.txt; cat out.txt;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                    dataMap = input message: &#39;准备发布到哪个环境&#39;, ok: &#39;确定&#39;, parameters: [choice(choices: [&#39;dev&#39;, &#39;sit&#39;, &#39;prod&#39;], description: &#39;部署环境&#39;, name: &#39;ENV&#39;), choice(choices: &quot;\${BRANCHES}&quot;, description: &#39;分支&#39;, name: &#39;TAG&#39;)], submitterParameter: &#39;APPROVER&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&quot;演示一下&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps{</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;\${dataMap[&#39;APPROVER&#39;]}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;\${dataMap[&#39;ENV&#39;]}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &quot;\${dataMap[&#39;TAG&#39;]}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline{</span></span>
<span class="line"><span style="color:#24292e;">    agent any</span></span>
<span class="line"><span style="color:#24292e;">    triggers{</span></span>
<span class="line"><span style="color:#24292e;">        upstream(upstreamProjects: &#39;job1,job2&#39;, threshold: hudson.model.Result.SUCCESS)</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    stages{</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;pre deploy&#39;){</span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                script{</span></span>
<span class="line"><span style="color:#24292e;">                    BRANCHES = sh  returnStdout: true, script: &#39;git branch -r | grep -v HEAD &gt; out.txt; git tag &gt;&gt; out.txt; cat out.txt;&#39;</span></span>
<span class="line"><span style="color:#24292e;">                    dataMap = input message: &#39;准备发布到哪个环境&#39;, ok: &#39;确定&#39;, parameters: [choice(choices: [&#39;dev&#39;, &#39;sit&#39;, &#39;prod&#39;], description: &#39;部署环境&#39;, name: &#39;ENV&#39;), choice(choices: &quot;\${BRANCHES}&quot;, description: &#39;分支&#39;, name: &#39;TAG&#39;)], submitterParameter: &#39;APPROVER&#39;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&quot;演示一下&quot;){</span></span>
<span class="line"><span style="color:#24292e;">            steps{</span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;\${dataMap[&#39;APPROVER&#39;]}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;\${dataMap[&#39;ENV&#39;]}&quot;</span></span>
<span class="line"><span style="color:#24292e;">                echo &quot;\${dataMap[&#39;TAG&#39;]}&quot;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,7),o=[p];function c(t,r,i,y,u,d){return n(),e("div",null,o)}const g=s(l,[["render",c]]);export{m as __pageData,g as default};
