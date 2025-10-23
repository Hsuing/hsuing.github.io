import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/tool/2-gradle.md","filePath":"guide/Linux/Jenkins/tool/2-gradle.md","lastUpdated":1720533756000}'),p={name:"guide/Linux/Jenkins/tool/2-gradle.md"},o=l(`<h2 id="_1-安装" tabindex="-1">1.安装 <a class="header-anchor" href="#_1-安装" aria-label="Permalink to &quot;1.安装&quot;">​</a></h2><p>官方地址，<a href="https://gradle.org/install/" target="_blank" rel="noreferrer">https://gradle.org/install/</a></p><p>官网：<a href="https://www.hebbao.com/wp-content/themes/begin/go.php?url=aHR0cHM6Ly9ncmFkbGUub3JnL3JlbGVhc2VzLw==" target="_blank" rel="noreferrer">https://gradle.org/releases/</a> Gradle基于Groovy，具有更灵活更强大的构建系统，能帮助我们构建更复杂的项目</p><h2 id="_2-下载" tabindex="-1">2.下载 <a class="header-anchor" href="#_2-下载" aria-label="Permalink to &quot;2.下载&quot;">​</a></h2><p>The current Gradle release is 7.4.2</p><ul><li>依赖环境</li></ul><p>Gradle runs on all major operating systems and requires only a <a href="https://adoptopenjdk.net/" target="_blank" rel="noreferrer">Java JDK</a> version 8 or higher to be installed</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ java -version</span></span>
<span class="line"><span style="color:#e1e4e8;">java version &quot;1.8.0_121&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ java -version</span></span>
<span class="line"><span style="color:#24292e;">java version &quot;1.8.0_121&quot;</span></span></code></pre></div><ul><li>下载gradle</li></ul><p><a href="https://gradle.org/next-steps/?version=7.4.2&amp;format=bin" target="_blank" rel="noreferrer">Binary-only</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ mkdir /opt/gradle</span></span>
<span class="line"><span style="color:#e1e4e8;">$ unzip -d /opt/gradle gradle-7.4.2-bin.zip</span></span>
<span class="line"><span style="color:#e1e4e8;">$ ls /opt/gradle/gradle-7.4.2</span></span>
<span class="line"><span style="color:#e1e4e8;">LICENSE  NOTICE  bin  getting-started.html  init.d  lib  media</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ mkdir /opt/gradle</span></span>
<span class="line"><span style="color:#24292e;">$ unzip -d /opt/gradle gradle-7.4.2-bin.zip</span></span>
<span class="line"><span style="color:#24292e;">$ ls /opt/gradle/gradle-7.4.2</span></span>
<span class="line"><span style="color:#24292e;">LICENSE  NOTICE  bin  getting-started.html  init.d  lib  media</span></span></code></pre></div><ul><li>配置环境变量</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$vim /etc/profile </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">export PATH=$PATH:/opt/gradle/gradle-7.4.2/bin</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">source /etc/profile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$vim /etc/profile </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">export PATH=$PATH:/opt/gradle/gradle-7.4.2/bin</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">source /etc/profile</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ gradle -v</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">------------------------------------------------------------</span></span>
<span class="line"><span style="color:#e1e4e8;">Gradle 7.4.2</span></span>
<span class="line"><span style="color:#e1e4e8;">------------------------------------------------------------</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ gradle -v</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">------------------------------------------------------------</span></span>
<span class="line"><span style="color:#24292e;">Gradle 7.4.2</span></span>
<span class="line"><span style="color:#24292e;">------------------------------------------------------------</span></span></code></pre></div><p><strong>常用命令</strong></p><ul><li><p>gradle build 构建项目</p></li><li><p>gradle build -x test 构建项目跳过测试</p></li><li><p>gradle clean 清空构建目录</p></li></ul><h2 id="_3-jenkins配置" tabindex="-1">3.jenkins配置 <a class="header-anchor" href="#_3-jenkins配置" aria-label="Permalink to &quot;3.jenkins配置&quot;">​</a></h2><ul><li>系统设置-&gt;全局工具配置</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407042234788.png" alt=""></p><ul><li>pipeline</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">stage (&quot;gradlebuild&quot;){</span></span>
<span class="line"><span style="color:#e1e4e8;">    gradleHome = tool &#39;GRADLE&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    sh &quot;\${gradleHome}/bin/gradle -v&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">stage (&quot;gradlebuild&quot;){</span></span>
<span class="line"><span style="color:#24292e;">    gradleHome = tool &#39;GRADLE&#39;</span></span>
<span class="line"><span style="color:#24292e;">    sh &quot;\${gradleHome}/bin/gradle -v&quot;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><ul><li>案例</li></ul><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//gitlab传递的数据{}</span></span>
<span class="line"><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;\${webhookdata}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> buildTools </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;gradle&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;/data/gradle-7.2&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;">//数据格式化</span></span>
<span class="line"><span style="color:#E1E4E8;">webhookdata </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> readJSON </span><span style="color:#79B8FF;">text</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;\${webhookdata}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#6A737D;">//提取仓库信息</span></span>
<span class="line"><span style="color:#E1E4E8;">env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">srcUrl</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> webhookdata[</span><span style="color:#9ECBFF;">&quot;project&quot;</span><span style="color:#E1E4E8;">][</span><span style="color:#9ECBFF;">&quot;git_http_url&quot;</span><span style="color:#E1E4E8;">]   </span><span style="color:#6A737D;">//项目地址</span></span>
<span class="line"><span style="color:#E1E4E8;">env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">branchName</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> webhookdata[</span><span style="color:#9ECBFF;">&quot;ref&quot;</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">-</span><span style="color:#9ECBFF;">&quot;refs/heads/&quot;</span><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 分支</span></span>
<span class="line"><span style="color:#E1E4E8;">env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">commitId</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> webhookdata[</span><span style="color:#9ECBFF;">&quot;checkout_sha&quot;</span><span style="color:#E1E4E8;">]            </span><span style="color:#6A737D;">//提交id</span></span>
<span class="line"><span style="color:#E1E4E8;">env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">commitUser</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> webhookdata[</span><span style="color:#9ECBFF;">&quot;user_username&quot;</span><span style="color:#E1E4E8;">]         </span><span style="color:#6A737D;">// 提交人</span></span>
<span class="line"><span style="color:#E1E4E8;">env</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">userEmail </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> webhookdata[</span><span style="color:#9ECBFF;">&quot;user_email&quot;</span><span style="color:#E1E4E8;">]            </span><span style="color:#6A737D;">//邮箱</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">currentBuild</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">description </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Trigger by Gitlab </span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;"> branch: \${env.branchName} </span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;"> user: \${env.commitUser} &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">currentBuild</span><span style="color:#F97583;">.</span><span style="color:#E1E4E8;">displayName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;\${env.commitId}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">pipeline{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//指定运行此流水线的节点，指定标签的名字</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent { node { label </span><span style="color:#9ECBFF;">&quot;build&quot;</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//阶段1 获取代码</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;CheckOut&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//定义阶段1的变量</span></span>
<span class="line"><span style="color:#E1E4E8;">            environment {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">NAME</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;hwf01&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">VERSION</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;1.1.11&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">ENVTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;DEV1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#6A737D;">//branchName = &quot;\${params.branchName}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#6A737D;">//srcUrl = &quot;\${params.srcUrl}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    checkout([$</span><span style="color:#79B8FF;">class</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;GitSCM&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">branches</span><span style="color:#E1E4E8;">: [[</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;\${env.branchName}&quot;</span><span style="color:#E1E4E8;">]],</span></span>
<span class="line"><span style="color:#E1E4E8;">                              </span><span style="color:#79B8FF;">extensions</span><span style="color:#E1E4E8;">: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">                              </span><span style="color:#79B8FF;">userRemoteConfigs</span><span style="color:#E1E4E8;">: [[</span><span style="color:#79B8FF;">credentialsId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;gitlab-root&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                   </span><span style="color:#79B8FF;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;\${env.srcUrl}&quot;</span><span style="color:#E1E4E8;">]]])</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;Build&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;运行构建&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#6A737D;">//要是想获取input的值,打印他的环境变量</span></span>
<span class="line"><span style="color:#E1E4E8;">                    sh </span><span style="color:#9ECBFF;">&quot;\${buildTools[&quot;gradle&quot;]}/bin/gradle clean &amp;&amp; \${buildTools[&quot;gradle&quot;]}/bin/gradle build -x test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(</span><span style="color:#9ECBFF;">&quot;Test&quot;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps{</span></span>
<span class="line"><span style="color:#E1E4E8;">                script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;运行测试&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                    sh </span><span style="color:#9ECBFF;">&quot;\${buildTools[&quot;gradle&quot;]}/bin/gradle test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    junit </span><span style="color:#9ECBFF;">&#39;build/test-results/test/*.xml&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    post {</span></span>
<span class="line"><span style="color:#E1E4E8;">        always{</span></span>
<span class="line"><span style="color:#E1E4E8;">            script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;流水线结束后，经常做的事情&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//EmailUser(&quot;\${env.userEmail}&quot;, currentBuild.currentResult)</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        success{</span></span>
<span class="line"><span style="color:#E1E4E8;">            script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;流水线成功后，要做的事情&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        failure{</span></span>
<span class="line"><span style="color:#E1E4E8;">            script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;流水线失败后，要做的事情&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        aborted{</span></span>
<span class="line"><span style="color:#E1E4E8;">            script{</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;流水线取消后，要做的事情&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//gitlab传递的数据{}</span></span>
<span class="line"><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;\${webhookdata}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> buildTools </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;gradle&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;/data/gradle-7.2&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;">//数据格式化</span></span>
<span class="line"><span style="color:#24292E;">webhookdata </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> readJSON </span><span style="color:#005CC5;">text</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;\${webhookdata}&quot;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6A737D;">//提取仓库信息</span></span>
<span class="line"><span style="color:#24292E;">env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">srcUrl</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> webhookdata[</span><span style="color:#032F62;">&quot;project&quot;</span><span style="color:#24292E;">][</span><span style="color:#032F62;">&quot;git_http_url&quot;</span><span style="color:#24292E;">]   </span><span style="color:#6A737D;">//项目地址</span></span>
<span class="line"><span style="color:#24292E;">env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">branchName</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> webhookdata[</span><span style="color:#032F62;">&quot;ref&quot;</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">-</span><span style="color:#032F62;">&quot;refs/heads/&quot;</span><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 分支</span></span>
<span class="line"><span style="color:#24292E;">env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">commitId</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> webhookdata[</span><span style="color:#032F62;">&quot;checkout_sha&quot;</span><span style="color:#24292E;">]            </span><span style="color:#6A737D;">//提交id</span></span>
<span class="line"><span style="color:#24292E;">env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">commitUser</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> webhookdata[</span><span style="color:#032F62;">&quot;user_username&quot;</span><span style="color:#24292E;">]         </span><span style="color:#6A737D;">// 提交人</span></span>
<span class="line"><span style="color:#24292E;">env</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">userEmail </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> webhookdata[</span><span style="color:#032F62;">&quot;user_email&quot;</span><span style="color:#24292E;">]            </span><span style="color:#6A737D;">//邮箱</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">currentBuild</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">description </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Trigger by Gitlab </span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;"> branch: \${env.branchName} </span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;"> user: \${env.commitUser} &quot;</span></span>
<span class="line"><span style="color:#24292E;">currentBuild</span><span style="color:#D73A49;">.</span><span style="color:#24292E;">displayName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;\${env.commitId}&quot;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">pipeline{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//指定运行此流水线的节点，指定标签的名字</span></span>
<span class="line"><span style="color:#24292E;">    agent { node { label </span><span style="color:#032F62;">&quot;build&quot;</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">    stages{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//阶段1 获取代码</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;CheckOut&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//定义阶段1的变量</span></span>
<span class="line"><span style="color:#24292E;">            environment {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">NAME</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hwf01&quot;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">VERSION</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1.1.11&quot;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">ENVTYPE</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;DEV1&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                script{</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6A737D;">//branchName = &quot;\${params.branchName}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6A737D;">//srcUrl = &quot;\${params.srcUrl}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    checkout([$</span><span style="color:#005CC5;">class</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;GitSCM&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">branches</span><span style="color:#24292E;">: [[</span><span style="color:#005CC5;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;\${env.branchName}&quot;</span><span style="color:#24292E;">]],</span></span>
<span class="line"><span style="color:#24292E;">                              </span><span style="color:#005CC5;">extensions</span><span style="color:#24292E;">: [],</span></span>
<span class="line"><span style="color:#24292E;">                              </span><span style="color:#005CC5;">userRemoteConfigs</span><span style="color:#24292E;">: [[</span><span style="color:#005CC5;">credentialsId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;gitlab-root&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                                   </span><span style="color:#005CC5;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;\${env.srcUrl}&quot;</span><span style="color:#24292E;">]]])</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;Build&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;运行构建&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6A737D;">//要是想获取input的值,打印他的环境变量</span></span>
<span class="line"><span style="color:#24292E;">                    sh </span><span style="color:#032F62;">&quot;\${buildTools[&quot;gradle&quot;]}/bin/gradle clean &amp;&amp; \${buildTools[&quot;gradle&quot;]}/bin/gradle build -x test&quot;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(</span><span style="color:#032F62;">&quot;Test&quot;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            steps{</span></span>
<span class="line"><span style="color:#24292E;">                script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;运行测试&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                    sh </span><span style="color:#032F62;">&quot;\${buildTools[&quot;gradle&quot;]}/bin/gradle test&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    junit </span><span style="color:#032F62;">&#39;build/test-results/test/*.xml&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    post {</span></span>
<span class="line"><span style="color:#24292E;">        always{</span></span>
<span class="line"><span style="color:#24292E;">            script{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;流水线结束后，经常做的事情&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//EmailUser(&quot;\${env.userEmail}&quot;, currentBuild.currentResult)</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        success{</span></span>
<span class="line"><span style="color:#24292E;">            script{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;流水线成功后，要做的事情&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        failure{</span></span>
<span class="line"><span style="color:#24292E;">            script{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;流水线失败后，要做的事情&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        aborted{</span></span>
<span class="line"><span style="color:#24292E;">            script{</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;流水线取消后，要做的事情&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,23),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const q=s(p,[["render",t]]);export{F as __pageData,q as default};
