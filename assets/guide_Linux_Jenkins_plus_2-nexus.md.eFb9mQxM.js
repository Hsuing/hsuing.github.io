import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一、nexus-artifact-uploader","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/plus/2-nexus.md","filePath":"guide/Linux/Jenkins/plus/2-nexus.md","lastUpdated":1720533756000}'),p={name:"guide/Linux/Jenkins/plus/2-nexus.md"},o=l(`<h1 id="一、nexus-artifact-uploader" tabindex="-1">一、nexus-artifact-uploader <a class="header-anchor" href="#一、nexus-artifact-uploader" aria-label="Permalink to &quot;一、nexus-artifact-uploader&quot;">​</a></h1><ul><li>Publish Maven Artifacts to Nexus OSS Using Pipelines or Maven Jobs</li></ul><h2 id="_1-1-安装-nexus-artifact-uploader-and-pipeline-utility-steps-plugins" tabindex="-1">1.1 安装 &quot;Nexus Artifact Uploader&quot; and &quot;Pipeline Utility Steps&quot; Plugins <a class="header-anchor" href="#_1-1-安装-nexus-artifact-uploader-and-pipeline-utility-steps-plugins" aria-label="Permalink to &quot;1.1  安装 &quot;Nexus Artifact Uploader&quot; and &quot;Pipeline Utility Steps&quot; Plugins&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221816022.png" alt="Nexus Artifact Uploader"></p><ul><li>或者离线下载</li></ul><p><a href="https://plugins.jenkins.io/nexus-artifact-uploader" target="_blank" rel="noreferrer">https://plugins.jenkins.io/nexus-artifact-uploader</a></p><h2 id="_2-1-create" tabindex="-1">2.1 create <a class="header-anchor" href="#_2-1-create" aria-label="Permalink to &quot;2.1 create&quot;">​</a></h2><ul><li>Create Repository in Nexus OSS</li><li>Create a Valid User in Nexus OSS</li><li>Create Valid Jenkins Credentials to Authenticate To Nexus OSS</li><li>Set Up Maven as A Managed Tool</li></ul><p><strong>以上步骤请产看下篇文章</strong></p><h2 id="_2-3-publishing-artifacts-using-maven-job" tabindex="-1">2.3 Publishing Artifacts Using Maven Job <a class="header-anchor" href="#_2-3-publishing-artifacts-using-maven-job" aria-label="Permalink to &quot;2.3 Publishing Artifacts Using Maven Job&quot;">​</a></h2><p>So if we are using this type of Jobs we can perform exactly the same task we did in the previous example using Pipelines. This Job has the particularity helping us defining these variables which are quite self-explained with the information extracted from the pom.xml file:</p><ul><li>POM_DISPLAYNAME</li><li>POM_VERSION</li><li>POM_GROUPID</li><li>POM_ARTIFACTID</li><li>POM_PACKAGING</li></ul><p><a href="https://plugins.jenkins.io/maven-plugin" target="_blank" rel="noreferrer">https://plugins.jenkins.io/maven-plugin</a></p><ul><li>1-创建项目工程</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221817184.png" alt="1-创建项目工程"></p><ul><li>2-Pom</li></ul><p>Root POM: pom.xml, Goals: package -DskipTests=true</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221817410.png" alt="Pom"></p><ul><li>3- step publish the artifact to Nexus OSS</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221817794.png" alt="step publish the artifact to Nexus OSS"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202406221817057.png" alt="效果"></p><h1 id="publishing-artifacts-using-jenkins-pipelines" tabindex="-1">Publishing Artifacts Using Jenkins Pipelines <a class="header-anchor" href="#publishing-artifacts-using-jenkins-pipelines" aria-label="Permalink to &quot;Publishing Artifacts Using Jenkins Pipelines&quot;">​</a></h1><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">label &quot;master&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">tools {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">// Note</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">this should match with the tool name configured in your jenkins instance (JENKINS_URL/configureTools/)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">maven &quot;Maven 3.6.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">environment {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">// This can be nexus3 or nexus2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">NEXUS_VERSION = &quot;nexus3&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">// This can be http or https</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">NEXUS_PROTOCOL = &quot;http&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">// Where your Nexus is running</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">NEXUS_URL = &quot;172.17.0.3:8081&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">// Repository where we will upload the artifact</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">NEXUS_REPOSITORY = &quot;repository-example&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">// Jenkins credential id to authenticate to Nexus OSS</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">NEXUS_CREDENTIAL_ID = &quot;nexus-credentials&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">stage(&quot;clone code&quot;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">// Let&#39;s clone the source</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">git &#39;https://github.com/danielalejandrohc/cargotracker.git&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">stage(&quot;mvn build&quot;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">// If you are using Windows then you should use &quot;bat&quot; step</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">// Since unit testing is out of the scope we skip them</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">sh &quot;mvn package -DskipTests=true&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">stage(&quot;publish to nexus&quot;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#9ECBFF;">script {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#85E89D;">// Read POM xml file using &#39;readMavenPom&#39; step , this step &#39;readMavenPom&#39; is included in</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">https://plugins.jenkins.io/pipeline-utility-steps</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#85E89D;">pom = readMavenPom file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;pom.xml&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">// Find built artifact under target folder</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#85E89D;">filesByGlob = findFiles(glob</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;target/*.\${pom.packaging}&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">// Print some info from the artifact found</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">echo &quot;\${filesByGlob[0].name} \${filesByGlob[0].path} \${filesByGlob[0].directory} \${filesByGlob[0].length} \${filesByGlob[0].lastModified}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">// Extract the path from the File found</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">artifactPath = filesByGlob[0].path;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">// Assign to a boolean response verifying If the artifact name exists</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">artifactExists = fileExists artifactPath;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#9ECBFF;">if(artifactExists) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#85E89D;">echo &quot;*** File</span><span style="color:#E1E4E8;">: </span><span style="color:#85E89D;">\${artifactPath}, group</span><span style="color:#E1E4E8;">: </span><span style="color:#85E89D;">\${pom.groupId}, packaging</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${pom.packaging}, version \${pom.version}&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#9ECBFF;">nexusArtifactUploader(</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">nexusVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NEXUS_VERSION,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NEXUS_PROTOCOL,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">nexusUrl</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NEXUS_URL,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pom.groupId,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pom.version,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">repository</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NEXUS_REPOSITORY,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">credentialsId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">NEXUS_CREDENTIAL_ID,</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#85E89D;">artifacts</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#9ECBFF;">// Artifact generated such as .jar</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">.ear and .war files.</span></span>
<span class="line"><span style="color:#E1E4E8;">                                [</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pom.artifactId</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#85E89D;">classifier</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#85E89D;">file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">artifactPath</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pom.packaging</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#9ECBFF;">// Lets upload the pom.xml file for additional information for Transitive dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">                                [</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pom.artifactId</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#85E89D;">classifier</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#85E89D;">file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;pom.xml&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;pom&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">                            ]</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#9ECBFF;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    } </span><span style="color:#9ECBFF;">else {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#85E89D;">error &quot;*** File</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${artifactPath}, could not be found&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">agent {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">label &quot;master&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">tools {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">// Note</span><span style="color:#24292E;">: </span><span style="color:#032F62;">this should match with the tool name configured in your jenkins instance (JENKINS_URL/configureTools/)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">maven &quot;Maven 3.6.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">environment {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">// This can be nexus3 or nexus2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">NEXUS_VERSION = &quot;nexus3&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">// This can be http or https</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">NEXUS_PROTOCOL = &quot;http&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">// Where your Nexus is running</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">NEXUS_URL = &quot;172.17.0.3:8081&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">// Repository where we will upload the artifact</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">NEXUS_REPOSITORY = &quot;repository-example&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">// Jenkins credential id to authenticate to Nexus OSS</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">NEXUS_CREDENTIAL_ID = &quot;nexus-credentials&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">stages {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">stage(&quot;clone code&quot;) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">steps {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">// Let&#39;s clone the source</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">git &#39;https://github.com/danielalejandrohc/cargotracker.git&#39;;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">stage(&quot;mvn build&quot;) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">steps {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">// If you are using Windows then you should use &quot;bat&quot; step</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">// Since unit testing is out of the scope we skip them</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">sh &quot;mvn package -DskipTests=true&quot;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">stage(&quot;publish to nexus&quot;) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">steps {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#032F62;">script {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#22863A;">// Read POM xml file using &#39;readMavenPom&#39; step , this step &#39;readMavenPom&#39; is included in</span><span style="color:#24292E;">: </span><span style="color:#032F62;">https://plugins.jenkins.io/pipeline-utility-steps</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#22863A;">pom = readMavenPom file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;pom.xml&quot;;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">// Find built artifact under target folder</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#22863A;">filesByGlob = findFiles(glob</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;target/*.\${pom.packaging}&quot;);</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">// Print some info from the artifact found</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">echo &quot;\${filesByGlob[0].name} \${filesByGlob[0].path} \${filesByGlob[0].directory} \${filesByGlob[0].length} \${filesByGlob[0].lastModified}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">// Extract the path from the File found</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">artifactPath = filesByGlob[0].path;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">// Assign to a boolean response verifying If the artifact name exists</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">artifactExists = fileExists artifactPath;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#032F62;">if(artifactExists) {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#22863A;">echo &quot;*** File</span><span style="color:#24292E;">: </span><span style="color:#22863A;">\${artifactPath}, group</span><span style="color:#24292E;">: </span><span style="color:#22863A;">\${pom.groupId}, packaging</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${pom.packaging}, version \${pom.version}&quot;;</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#032F62;">nexusArtifactUploader(</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">nexusVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NEXUS_VERSION,</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NEXUS_PROTOCOL,</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">nexusUrl</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NEXUS_URL,</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pom.groupId,</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pom.version,</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">repository</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NEXUS_REPOSITORY,</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">credentialsId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">NEXUS_CREDENTIAL_ID,</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#22863A;">artifacts</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#032F62;">// Artifact generated such as .jar</span><span style="color:#24292E;">, </span><span style="color:#032F62;">.ear and .war files.</span></span>
<span class="line"><span style="color:#24292E;">                                [</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pom.artifactId</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#22863A;">classifier</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#22863A;">file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">artifactPath</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pom.packaging</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#032F62;">// Lets upload the pom.xml file for additional information for Transitive dependencies</span></span>
<span class="line"><span style="color:#24292E;">                                [</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pom.artifactId</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#22863A;">classifier</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#22863A;">file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;pom.xml&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;pom&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">                            ]</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#032F62;">);</span></span>
<span class="line"><span style="color:#24292E;">                    } </span><span style="color:#032F62;">else {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#22863A;">error &quot;*** File</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${artifactPath}, could not be found&quot;;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,23),e=[o];function t(c,r,i,E,y,u){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{h as __pageData,d as default};
