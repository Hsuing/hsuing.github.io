import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/CICD/4-pipeline结合git.md","filePath":"guide/Linux/Jenkins/CICD/4-pipeline结合git.md","lastUpdated":1720533756000}'),t={name:"guide/Linux/Jenkins/CICD/4-pipeline结合git.md"},p=n(`<h2 id="_1-创建pipeline工程" tabindex="-1">1-创建pipeline工程 <a class="header-anchor" href="#_1-创建pipeline工程" aria-label="Permalink to &quot;1-创建pipeline工程&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092149986.png" alt="配置自定义参数1"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092149257.png" alt="配置自定义参数"></p><h2 id="_2-credentialsid-凭证-配置" tabindex="-1">2-credentialsId(凭证) 配置 <a class="header-anchor" href="#_2-credentialsid-凭证-配置" aria-label="Permalink to &quot;2-credentialsId(凭证) 配置&quot;">​</a></h2><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092149223.jpg" alt="credentialsId配置"></p><ul><li>效果</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092149959.png" alt="配置自定义参数"></p><h2 id="_3-pipeline-脚本" tabindex="-1">3-pipeline 脚本 <a class="header-anchor" href="#_3-pipeline-脚本" aria-label="Permalink to &quot;3-pipeline 脚本&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">pipeline {</span></span>
<span class="line"><span style="color:#e1e4e8;">   agent any</span></span>
<span class="line"><span style="color:#e1e4e8;">   parameters {</span></span>
<span class="line"><span style="color:#e1e4e8;">        gitParameter branchFilter: &#39;origin/(.*)&#39;, defaultValue: &#39;developer&#39;, name: &#39;BRANCH&#39;, type: &#39;PT_BRANCH&#39;,description:&#39;请选择分支进行部署，默认是developer&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    stages {</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Checkout&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &#39;开始拉取代码.....git branch: &quot;\${params.BRANCH}&quot;,&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                git branch: &quot;\${params.BRANCH}&quot;, credentialsId: &#39;git&#39;, url: &#39;xxx:tanmo_crm/tmrm-product-search.git&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }        </span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &#39;开始执行打包操作.......&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;mvn clean package -U&#39; </span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">       stage(&#39;CopyJar&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;scp \${WORKSPACE}/tmrm-product-search-service/target/tmrm-product-search-service.jar root@\${RemoteIp}:/data/test_env_project_war/online_war&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;scp \${WORKSPACE}/tmrm-product-search-web/target/tmrm-product-search-web.jar root@\${RemoteIp}:/data/test_env_project_war/online_war&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                sh &#39;scp \${WORKSPACE}/tmrm-product-search-business-service/target/tmrm-product-search-business-service.jar root@\${RemoteIp}:/data/test_env_project_war/online_war&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            steps {</span></span>
<span class="line"><span style="color:#e1e4e8;">                //sh &#39;ssh root@10.50.12.8 &quot;sh /opt/wars/{远程服务器的一个文件夹}/deploy.sh&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                echo &#39;测活成功&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                script {</span></span>
<span class="line"><span style="color:#e1e4e8;">					if (&quot;\${ServerName}&quot; == &quot;tmrm-product-search-web&quot;) {	</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-web.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">					} else if (&quot;\${ServerName}&quot; == &quot;tmrm-product-search-service&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;echo \${ServerName}&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-service.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">					}else if (&quot;\${ServerName}&quot; == &quot;tmrm-product-search-business-service&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-business.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">					} else if (&quot;\${ServerName}&quot; == &quot;all&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;echo \${ServerName}&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-web.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-service.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-business.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">					}</span></span>
<span class="line"><span style="color:#e1e4e8;">			   }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">pipeline {</span></span>
<span class="line"><span style="color:#24292e;">   agent any</span></span>
<span class="line"><span style="color:#24292e;">   parameters {</span></span>
<span class="line"><span style="color:#24292e;">        gitParameter branchFilter: &#39;origin/(.*)&#39;, defaultValue: &#39;developer&#39;, name: &#39;BRANCH&#39;, type: &#39;PT_BRANCH&#39;,description:&#39;请选择分支进行部署，默认是developer&#39;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    stages {</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Checkout&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                echo &#39;开始拉取代码.....git branch: &quot;\${params.BRANCH}&quot;,&#39;</span></span>
<span class="line"><span style="color:#24292e;">                git branch: &quot;\${params.BRANCH}&quot;, credentialsId: &#39;git&#39;, url: &#39;xxx:tanmo_crm/tmrm-product-search.git&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }        </span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Build&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                echo &#39;开始执行打包操作.......&#39;</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;mvn clean package -U&#39; </span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">       stage(&#39;CopyJar&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;scp \${WORKSPACE}/tmrm-product-search-service/target/tmrm-product-search-service.jar root@\${RemoteIp}:/data/test_env_project_war/online_war&#39;</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;scp \${WORKSPACE}/tmrm-product-search-web/target/tmrm-product-search-web.jar root@\${RemoteIp}:/data/test_env_project_war/online_war&#39;</span></span>
<span class="line"><span style="color:#24292e;">                sh &#39;scp \${WORKSPACE}/tmrm-product-search-business-service/target/tmrm-product-search-business-service.jar root@\${RemoteIp}:/data/test_env_project_war/online_war&#39;</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#24292e;">            steps {</span></span>
<span class="line"><span style="color:#24292e;">                //sh &#39;ssh root@10.50.12.8 &quot;sh /opt/wars/{远程服务器的一个文件夹}/deploy.sh&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">                echo &#39;测活成功&#39;</span></span>
<span class="line"><span style="color:#24292e;">                script {</span></span>
<span class="line"><span style="color:#24292e;">					if (&quot;\${ServerName}&quot; == &quot;tmrm-product-search-web&quot;) {	</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-web.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">					} else if (&quot;\${ServerName}&quot; == &quot;tmrm-product-search-service&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;echo \${ServerName}&#39;</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-service.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">					}else if (&quot;\${ServerName}&quot; == &quot;tmrm-product-search-business-service&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-business.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">					} else if (&quot;\${ServerName}&quot; == &quot;all&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;echo \${ServerName}&#39;</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-web.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-service.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">						sh &#39;ssh root@\${RemoteIp} &quot;sh /data/webapps/scripts/product-search-business.sh&quot;&#39;</span></span>
<span class="line"><span style="color:#24292e;">					}</span></span>
<span class="line"><span style="color:#24292e;">			   }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,9),l=[p];function o(c,r,i,h,u,d){return e(),a("div",null,l)}const q=s(t,[["render",o]]);export{m as __pageData,q as default};
