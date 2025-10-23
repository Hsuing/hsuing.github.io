import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const d=JSON.parse('{"title":"1. vue案例","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/CICD/base_jenkins/vue-slave-node.md","filePath":"guide/container/k8s/CICD/base_jenkins/vue-slave-node.md","lastUpdated":1722954450000}'),p={name:"guide/container/k8s/CICD/base_jenkins/vue-slave-node.md"},o=l(`<h1 id="_1-vue案例" tabindex="-1">1. vue案例 <a class="header-anchor" href="#_1-vue案例" aria-label="Permalink to &quot;1. vue案例&quot;">​</a></h1><h2 id="_1-1-创建pipeline" tabindex="-1">1.1 创建pipeline <a class="header-anchor" href="#_1-1-创建pipeline" aria-label="Permalink to &quot;1.1 创建pipeline&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">def git_address = &quot;http://house.freehan.ink/root/vue3_web_element-demo-plus.git&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#9ECBFF;">def git_auth = &quot;02d72dd6-0eab-4261-b0c0-12824e083421&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">//构建版本的名称</span></span>
<span class="line"><span style="color:#9ECBFF;">def tag = &quot;latest&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">//Harbor私服地址</span></span>
<span class="line"><span style="color:#9ECBFF;">def harbor_url = &quot;registry.cn-zhangjiakou.aliyuncs.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">//Harbor的项目名称</span></span>
<span class="line"><span style="color:#9ECBFF;">def harbor_project_name = &quot;vue-demo&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">//Harbor的凭证</span></span>
<span class="line"><span style="color:#9ECBFF;">def harbor_auth = &quot;1e7ee468-9da7-469b-a43a-xxx&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">//启动时间</span></span>
<span class="line"><span style="color:#9ECBFF;">def start = new Date().format(&#39;yyyy-MM-dd HH:mm:ss&#39;)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">//创建一个Pod的模板，label为jenkins-slave-vue</span></span>
<span class="line"><span style="color:#85E89D;">podTemplate(label</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;jenkins-slave-vue&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#85E89D;">cloud</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;kubernetes&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">containerTemplate(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;jnlp&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;registry.cn-zhangjiakou.aliyuncs.com/hsuing/inbound-agent:latest-jdk11&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ttyEnabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">)</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">containerTemplate(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;docker&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;registry.cn-zhangjiakou.aliyuncs.com/hsuing/docker:stable&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">ttyEnabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;cat&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#85E89D;">hostPathVolume(mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;/var/run/docker.sock&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">hostPath:&#39;/var/run/docker.sock&#39;)</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ],</span></span>
<span class="line"><span style="color:#9ECBFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">//引用jenkins-slave-vue的pod模块来构建Jenkins-slave-vue的pod</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">node(&quot;jenkins-slave-vue&quot;)</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">stage(&#39;拉取代码&#39;)</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">checkout(</span><span style="color:#E1E4E8;">[</span><span style="color:#85E89D;">$class</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;GitSCM&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#85E89D;">branches</span><span style="color:#E1E4E8;">: [[</span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;*/main&#39;</span><span style="color:#E1E4E8;">]], </span><span style="color:#85E89D;">extensions</span><span style="color:#E1E4E8;">: [], </span><span style="color:#85E89D;">userRemoteConfigs</span><span style="color:#E1E4E8;">: [[</span><span style="color:#85E89D;">credentialsId</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;\${git_auth}&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#85E89D;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;\${git_address}&quot;</span><span style="color:#E1E4E8;">]]]</span><span style="color:#9ECBFF;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">//定义newTag</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">全局变量</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">def newTag = sh(returnStdout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;echo \`date +&quot;%Y%m%d%H%M&quot;_\`\`git describe --tags --always\`&#39;).trim()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">stage(&#39;编译描述&#39;)</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">// 自定义设置构建历史显示的名称和描述信息</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">// 不同的部署方式设置构建历史显示的名称和描述信息方式不一样，根据自己的部署方式自行百度找到设置方法</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">script</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">//设置buildName</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">wrap(</span><span style="color:#E1E4E8;">[</span><span style="color:#85E89D;">$class</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;BuildUser&#39;</span><span style="color:#E1E4E8;">]</span><span style="color:#9ECBFF;">)</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">//修改Description</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">buildDescription &quot;$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">BUILD_USER</span><span style="color:#E1E4E8;">} &gt; </span><span style="color:#9ECBFF;">$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">project_name</span><span style="color:#E1E4E8;">} &gt; </span><span style="color:#9ECBFF;">$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">branch</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">				}</span></span>
<span class="line"><span style="color:#9ECBFF;">			}</span></span>
<span class="line"><span style="color:#9ECBFF;">        }</span></span>
<span class="line"><span style="color:#9ECBFF;">        //</span></span>
<span class="line"><span style="color:#9ECBFF;">		stage(&#39;构建镜像&#39;){</span></span>
<span class="line"><span style="color:#9ECBFF;">			</span></span>
<span class="line"><span style="color:#9ECBFF;">			//把选择的项目信息转为数组</span></span>
<span class="line"><span style="color:#9ECBFF;">			def selectedProjects = &quot;$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">project_name</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;.split(&#39;,&#39;)</span></span>
<span class="line"><span style="color:#9ECBFF;">				for(int i=0;i&lt;selectedProjects.size();i++){</span></span>
<span class="line"><span style="color:#9ECBFF;">					//取出每个项目的名称</span></span>
<span class="line"><span style="color:#9ECBFF;">					def currentProjectName = selectedProjects[i];</span></span>
<span class="line"><span style="color:#9ECBFF;">					//定义镜像名称</span></span>
<span class="line"><span style="color:#9ECBFF;">					def imageName = &quot;$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">currentProjectName</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">:$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">tag</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">					//定义newTag</span></span>
<span class="line"><span style="color:#9ECBFF;">					//def newTag = sh(returnStdout: true,script: &#39;echo \`date +&quot;</span><span style="color:#E1E4E8;">%</span><span style="color:#9ECBFF;">Y%m%d%H%M&quot;_\`\`git describe --tags --always\`&#39;).trim()</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">//镜像编译</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">//sh &quot;sed -i &#39;s#ACTIVEPROFILE#$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">springProfilesActive</span><span style="color:#E1E4E8;">}#</span><span style="color:#9ECBFF;">g&#39; Dockerfile&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">container(&#39;docker&#39;)</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">sh &quot;docker build -t $</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">imageName</span><span style="color:#E1E4E8;">} </span><span style="color:#9ECBFF;">.&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">//给镜像打标签</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">sh &quot;docker tag $</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">imageName</span><span style="color:#E1E4E8;">} </span><span style="color:#9ECBFF;">$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_url</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">/hsuing/$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_project_name</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">:$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">newTag</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">					//登录Harbor，并上传镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">					withCredentials([usernamePassword(credentialsId:&quot;$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_auth</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;, passwordVariable: &#39;password&#39;, usernameVariable:&#39;username&#39;)])</span></span>
<span class="line"><span style="color:#9ECBFF;">					{</span></span>
<span class="line"><span style="color:#9ECBFF;">						//登录</span></span>
<span class="line"><span style="color:#9ECBFF;">						sh &quot;docker login -u $</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">username</span><span style="color:#E1E4E8;">} </span><span style="color:#9ECBFF;">-p $</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">password</span><span style="color:#E1E4E8;">} </span><span style="color:#9ECBFF;">$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_url</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">						//上传镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">						sh &quot;docker push $</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_url</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">/hsuing/$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_project_name</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">:$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">newTag</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">					}</span></span>
<span class="line"><span style="color:#9ECBFF;">					//删除本地镜像</span></span>
<span class="line"><span style="color:#9ECBFF;">					sh &quot;docker rmi -f $</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">imageName</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">					sh &quot;docker rmi -f $</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_url</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">/hsuing/$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_project_name</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">:$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">newTag</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">				}</span></span>
<span class="line"><span style="color:#9ECBFF;">			}</span></span>
<span class="line"><span style="color:#9ECBFF;">          </span></span>
<span class="line"><span style="color:#9ECBFF;">			}</span></span>
<span class="line"><span style="color:#9ECBFF;">		</span></span>
<span class="line"><span style="color:#9ECBFF;">		//</span></span>
<span class="line"><span style="color:#9ECBFF;">        stage(&#39;部署到k8s平台&#39;){</span></span>
<span class="line"><span style="color:#9ECBFF;">			def selectedProjects = &quot;$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">project_name</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;.split(&#39;,&#39;)</span></span>
<span class="line"><span style="color:#9ECBFF;">			//定义newTag</span></span>
<span class="line"><span style="color:#9ECBFF;">		    //def newTag = sh(returnStdout: true,script: &#39;echo \`date +&quot;</span><span style="color:#E1E4E8;">%</span><span style="color:#9ECBFF;">Y%m%d%H%M&quot;_\`\`git describe --tags --always\`&#39;).trim()</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#9ECBFF;">for(int i=0;i&lt;selectedProjects.size();i++)</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">//取出每个项目的名称</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#9ECBFF;">def currentProjectName = selectedProjects</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">i</span><span style="color:#E1E4E8;">]</span><span style="color:#9ECBFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">			    </span><span style="color:#9ECBFF;">def deploy_image_name =&quot;$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_url</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">/hsuing/$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">harbor_project_name</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">:$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">newTag</span><span style="color:#E1E4E8;">}</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">				//基于控制器的方式部署到K8S</span></span>
<span class="line"><span style="color:#9ECBFF;">				sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#9ECBFF;">sed -i &#39;s#\\$IMAGE_NAME#$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">deploy_image_name</span><span style="color:#E1E4E8;">}#</span><span style="color:#9ECBFF;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#9ECBFF;">					sed -i &#39;s#\\$APP_NAME#$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">currentProjectName</span><span style="color:#E1E4E8;">}#</span><span style="color:#9ECBFF;">&#39;  deployment.yaml</span></span>
<span class="line"><span style="color:#9ECBFF;">					sed -i &#39;s#\\$APP_REPLICAS#$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">replicas</span><span style="color:#E1E4E8;">}#</span><span style="color:#9ECBFF;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#9ECBFF;">					sed -i &#39;s#\\$NAMESPACE#$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">namespaces</span><span style="color:#E1E4E8;">}#</span><span style="color:#9ECBFF;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#9ECBFF;">					sed -i &#39;s#\\$PODMEMORY#$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">podsMem</span><span style="color:#E1E4E8;">}#</span><span style="color:#9ECBFF;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#9ECBFF;">					sed -i &#39;s#\\$PODCPU#$</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">podsCpu</span><span style="color:#E1E4E8;">}#</span><span style="color:#9ECBFF;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#9ECBFF;">					cat deployment.yaml</span></span>
<span class="line"><span style="color:#9ECBFF;">				&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">			}</span></span>
<span class="line"><span style="color:#9ECBFF;">				//部署到K8S</span></span>
<span class="line"><span style="color:#9ECBFF;">				kubernetesDeploy(kubeconfigId: &quot;55a88b59-fd12-4bf0-ba57-8a664fed2f71&quot;, configs: &quot;deployment.yaml&quot;)</span></span>
<span class="line"><span style="color:#9ECBFF;">			}</span></span>
<span class="line"><span style="color:#9ECBFF;">        }</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">def git_address = &quot;http://house.freehan.ink/root/vue3_web_element-demo-plus.git&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#032F62;">def git_auth = &quot;02d72dd6-0eab-4261-b0c0-12824e083421&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">//构建版本的名称</span></span>
<span class="line"><span style="color:#032F62;">def tag = &quot;latest&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">//Harbor私服地址</span></span>
<span class="line"><span style="color:#032F62;">def harbor_url = &quot;registry.cn-zhangjiakou.aliyuncs.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">//Harbor的项目名称</span></span>
<span class="line"><span style="color:#032F62;">def harbor_project_name = &quot;vue-demo&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">//Harbor的凭证</span></span>
<span class="line"><span style="color:#032F62;">def harbor_auth = &quot;1e7ee468-9da7-469b-a43a-xxx&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">//启动时间</span></span>
<span class="line"><span style="color:#032F62;">def start = new Date().format(&#39;yyyy-MM-dd HH:mm:ss&#39;)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">//创建一个Pod的模板，label为jenkins-slave-vue</span></span>
<span class="line"><span style="color:#22863A;">podTemplate(label</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;jenkins-slave-vue&#39;</span><span style="color:#24292E;">, </span><span style="color:#22863A;">cloud</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;kubernetes&#39;</span><span style="color:#24292E;">, </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">containerTemplate(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;jnlp&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;registry.cn-zhangjiakou.aliyuncs.com/hsuing/inbound-agent:latest-jdk11&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ttyEnabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">)</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">containerTemplate(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;docker&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;registry.cn-zhangjiakou.aliyuncs.com/hsuing/docker:stable&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">ttyEnabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">command</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;cat&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">)</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#22863A;">hostPathVolume(mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;/var/run/docker.sock&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">hostPath:&#39;/var/run/docker.sock&#39;)</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  ],</span></span>
<span class="line"><span style="color:#032F62;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">//引用jenkins-slave-vue的pod模块来构建Jenkins-slave-vue的pod</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">node(&quot;jenkins-slave-vue&quot;)</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">stage(&#39;拉取代码&#39;)</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">checkout(</span><span style="color:#24292E;">[</span><span style="color:#22863A;">$class</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;GitSCM&#39;</span><span style="color:#24292E;">, </span><span style="color:#22863A;">branches</span><span style="color:#24292E;">: [[</span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;*/main&#39;</span><span style="color:#24292E;">]], </span><span style="color:#22863A;">extensions</span><span style="color:#24292E;">: [], </span><span style="color:#22863A;">userRemoteConfigs</span><span style="color:#24292E;">: [[</span><span style="color:#22863A;">credentialsId</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;\${git_auth}&quot;</span><span style="color:#24292E;">, </span><span style="color:#22863A;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;\${git_address}&quot;</span><span style="color:#24292E;">]]]</span><span style="color:#032F62;">)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">//定义newTag</span><span style="color:#24292E;">,</span><span style="color:#032F62;">全局变量</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">def newTag = sh(returnStdout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span><span style="color:#22863A;">script</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;echo \`date +&quot;%Y%m%d%H%M&quot;_\`\`git describe --tags --always\`&#39;).trim()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">stage(&#39;编译描述&#39;)</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">// 自定义设置构建历史显示的名称和描述信息</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">// 不同的部署方式设置构建历史显示的名称和描述信息方式不一样，根据自己的部署方式自行百度找到设置方法</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">script</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">//设置buildName</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">wrap(</span><span style="color:#24292E;">[</span><span style="color:#22863A;">$class</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;BuildUser&#39;</span><span style="color:#24292E;">]</span><span style="color:#032F62;">)</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">//修改Description</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">buildDescription &quot;$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">BUILD_USER</span><span style="color:#24292E;">} &gt; </span><span style="color:#032F62;">$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">project_name</span><span style="color:#24292E;">} &gt; </span><span style="color:#032F62;">$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">branch</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">				}</span></span>
<span class="line"><span style="color:#032F62;">			}</span></span>
<span class="line"><span style="color:#032F62;">        }</span></span>
<span class="line"><span style="color:#032F62;">        //</span></span>
<span class="line"><span style="color:#032F62;">		stage(&#39;构建镜像&#39;){</span></span>
<span class="line"><span style="color:#032F62;">			</span></span>
<span class="line"><span style="color:#032F62;">			//把选择的项目信息转为数组</span></span>
<span class="line"><span style="color:#032F62;">			def selectedProjects = &quot;$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">project_name</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;.split(&#39;,&#39;)</span></span>
<span class="line"><span style="color:#032F62;">				for(int i=0;i&lt;selectedProjects.size();i++){</span></span>
<span class="line"><span style="color:#032F62;">					//取出每个项目的名称</span></span>
<span class="line"><span style="color:#032F62;">					def currentProjectName = selectedProjects[i];</span></span>
<span class="line"><span style="color:#032F62;">					//定义镜像名称</span></span>
<span class="line"><span style="color:#032F62;">					def imageName = &quot;$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">currentProjectName</span><span style="color:#24292E;">}</span><span style="color:#032F62;">:$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">tag</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">					//定义newTag</span></span>
<span class="line"><span style="color:#032F62;">					//def newTag = sh(returnStdout: true,script: &#39;echo \`date +&quot;</span><span style="color:#24292E;">%</span><span style="color:#032F62;">Y%m%d%H%M&quot;_\`\`git describe --tags --always\`&#39;).trim()</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">//镜像编译</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">//sh &quot;sed -i &#39;s#ACTIVEPROFILE#$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">springProfilesActive</span><span style="color:#24292E;">}#</span><span style="color:#032F62;">g&#39; Dockerfile&quot;</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">container(&#39;docker&#39;)</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">sh &quot;docker build -t $</span><span style="color:#24292E;">{</span><span style="color:#032F62;">imageName</span><span style="color:#24292E;">} </span><span style="color:#032F62;">.&quot;</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">//给镜像打标签</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">sh &quot;docker tag $</span><span style="color:#24292E;">{</span><span style="color:#032F62;">imageName</span><span style="color:#24292E;">} </span><span style="color:#032F62;">$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_url</span><span style="color:#24292E;">}</span><span style="color:#032F62;">/hsuing/$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_project_name</span><span style="color:#24292E;">}</span><span style="color:#032F62;">:$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">newTag</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">					//登录Harbor，并上传镜像</span></span>
<span class="line"><span style="color:#032F62;">					withCredentials([usernamePassword(credentialsId:&quot;$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_auth</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;, passwordVariable: &#39;password&#39;, usernameVariable:&#39;username&#39;)])</span></span>
<span class="line"><span style="color:#032F62;">					{</span></span>
<span class="line"><span style="color:#032F62;">						//登录</span></span>
<span class="line"><span style="color:#032F62;">						sh &quot;docker login -u $</span><span style="color:#24292E;">{</span><span style="color:#032F62;">username</span><span style="color:#24292E;">} </span><span style="color:#032F62;">-p $</span><span style="color:#24292E;">{</span><span style="color:#032F62;">password</span><span style="color:#24292E;">} </span><span style="color:#032F62;">$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_url</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">						//上传镜像</span></span>
<span class="line"><span style="color:#032F62;">						sh &quot;docker push $</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_url</span><span style="color:#24292E;">}</span><span style="color:#032F62;">/hsuing/$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_project_name</span><span style="color:#24292E;">}</span><span style="color:#032F62;">:$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">newTag</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">					}</span></span>
<span class="line"><span style="color:#032F62;">					//删除本地镜像</span></span>
<span class="line"><span style="color:#032F62;">					sh &quot;docker rmi -f $</span><span style="color:#24292E;">{</span><span style="color:#032F62;">imageName</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">					sh &quot;docker rmi -f $</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_url</span><span style="color:#24292E;">}</span><span style="color:#032F62;">/hsuing/$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_project_name</span><span style="color:#24292E;">}</span><span style="color:#032F62;">:$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">newTag</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">				}</span></span>
<span class="line"><span style="color:#032F62;">			}</span></span>
<span class="line"><span style="color:#032F62;">          </span></span>
<span class="line"><span style="color:#032F62;">			}</span></span>
<span class="line"><span style="color:#032F62;">		</span></span>
<span class="line"><span style="color:#032F62;">		//</span></span>
<span class="line"><span style="color:#032F62;">        stage(&#39;部署到k8s平台&#39;){</span></span>
<span class="line"><span style="color:#032F62;">			def selectedProjects = &quot;$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">project_name</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;.split(&#39;,&#39;)</span></span>
<span class="line"><span style="color:#032F62;">			//定义newTag</span></span>
<span class="line"><span style="color:#032F62;">		    //def newTag = sh(returnStdout: true,script: &#39;echo \`date +&quot;</span><span style="color:#24292E;">%</span><span style="color:#032F62;">Y%m%d%H%M&quot;_\`\`git describe --tags --always\`&#39;).trim()</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#032F62;">for(int i=0;i&lt;selectedProjects.size();i++)</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">//取出每个项目的名称</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#032F62;">def currentProjectName = selectedProjects</span><span style="color:#24292E;">[</span><span style="color:#032F62;">i</span><span style="color:#24292E;">]</span><span style="color:#032F62;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">			    </span><span style="color:#032F62;">def deploy_image_name =&quot;$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_url</span><span style="color:#24292E;">}</span><span style="color:#032F62;">/hsuing/$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">harbor_project_name</span><span style="color:#24292E;">}</span><span style="color:#032F62;">:$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">newTag</span><span style="color:#24292E;">}</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#032F62;">				//基于控制器的方式部署到K8S</span></span>
<span class="line"><span style="color:#032F62;">				sh &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#032F62;">sed -i &#39;s#\\$IMAGE_NAME#$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">deploy_image_name</span><span style="color:#24292E;">}#</span><span style="color:#032F62;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#032F62;">					sed -i &#39;s#\\$APP_NAME#$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">currentProjectName</span><span style="color:#24292E;">}#</span><span style="color:#032F62;">&#39;  deployment.yaml</span></span>
<span class="line"><span style="color:#032F62;">					sed -i &#39;s#\\$APP_REPLICAS#$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">replicas</span><span style="color:#24292E;">}#</span><span style="color:#032F62;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#032F62;">					sed -i &#39;s#\\$NAMESPACE#$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">namespaces</span><span style="color:#24292E;">}#</span><span style="color:#032F62;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#032F62;">					sed -i &#39;s#\\$PODMEMORY#$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">podsMem</span><span style="color:#24292E;">}#</span><span style="color:#032F62;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#032F62;">					sed -i &#39;s#\\$PODCPU#$</span><span style="color:#24292E;">{</span><span style="color:#032F62;">podsCpu</span><span style="color:#24292E;">}#</span><span style="color:#032F62;">&#39; deployment.yaml</span></span>
<span class="line"><span style="color:#032F62;">					cat deployment.yaml</span></span>
<span class="line"><span style="color:#032F62;">				&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#032F62;">			}</span></span>
<span class="line"><span style="color:#032F62;">				//部署到K8S</span></span>
<span class="line"><span style="color:#032F62;">				kubernetesDeploy(kubeconfigId: &quot;55a88b59-fd12-4bf0-ba57-8a664fed2f71&quot;, configs: &quot;deployment.yaml&quot;)</span></span>
<span class="line"><span style="color:#032F62;">			}</span></span>
<span class="line"><span style="color:#032F62;">        }</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202408062158738.png" alt="image-20240806215752988"></p><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202408062158195.png" alt="image-20240806215820445"></p>`,6),t=[o];function e(c,r,E,y,F,i){return n(),a("div",null,t)}const C=s(p,[["render",e]]);export{d as __pageData,C as default};
