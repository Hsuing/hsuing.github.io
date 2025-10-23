import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const g=JSON.parse('{"title":"nginx 代理jenkins","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/Jenkins/index.md","filePath":"guide/Linux/Jenkins/index.md","lastUpdated":1720606881000}'),p={name:"guide/Linux/Jenkins/index.md"},l=e(`<p>export JAVA_OPTS=-Djava.awt.headless=true -Xmx512m -DJENKINS_HOME=/www/data/jenkins export MAVEN_OPTS=&quot;-Xmx512m -XX:MaxPermSize=256m&quot; export ANT_OPTS=&quot;-Xmx512mm -XX:MaxPermSize=256m&quot;</p><h1 id="nginx-代理jenkins" tabindex="-1">nginx 代理jenkins <a class="header-anchor" href="#nginx-代理jenkins" aria-label="Permalink to &quot;nginx 代理jenkins&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">通过使用basic_auth搜索用作任何其他应用程序的反向代理的Nginx,找到了我的问题的解决方案.</span></span>
<span class="line"><span style="color:#e1e4e8;">解决方案是这里找到的答案：https://serverfault.com/questions/511846/basic-auth-for-a-tomcat-app-jira-with-nginx-as-reverse-proxy</span></span>
<span class="line"><span style="color:#e1e4e8;">我的nginx配置中缺少的行是：</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> # Don&#39;t forward auth to Tomcat</span></span>
<span class="line"><span style="color:#e1e4e8;"> proxy_set_header   Authorization &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> 默认情况下,看起来在基本身份验证之后Nginx会另外将身份验证标头转发给Jenkins,这就是导致我的问题. Jenkins收到转发的auth标头,然后认为它也需要自己授权？！</span></span>
<span class="line"><span style="color:#e1e4e8;"> 如果我们将反向代理设置为不转发任何授权标头,如上所示,则一切正常. Nginx将提示basic_auth,并且在成功验证后,我们在转发到我们的反向代理时明确清除(重置？)auth标头. </span></span>
<span class="line"><span style="color:#e1e4e8;"> </span></span>
<span class="line"><span style="color:#e1e4e8;"> #完整配置</span></span>
<span class="line"><span style="color:#e1e4e8;"> upstream jenkinsUP {</span></span>
<span class="line"><span style="color:#e1e4e8;">	server 172.16.195.194:9191 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">	listen 80;</span></span>
<span class="line"><span style="color:#e1e4e8;">    server_name xxx.com;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#if ($geoip2_data_subdivisions_name != Beijing){</span></span>
<span class="line"><span style="color:#e1e4e8;">#    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">#}</span></span>
<span class="line"><span style="color:#e1e4e8;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"> if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    return 444;</span></span>
<span class="line"><span style="color:#e1e4e8;"> }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">	location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header   Authorization &quot;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">	proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header x-for $remote_addr;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header x-server $host;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_set_header x-agent $http_user_agent;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass     http://jenkinsUP/;</span></span>
<span class="line"><span style="color:#e1e4e8;">	#allow 106.39.149.43;</span></span>
<span class="line"><span style="color:#e1e4e8;">	#deny all;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">	access_log  /var/log/nginx/access.log es;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">通过使用basic_auth搜索用作任何其他应用程序的反向代理的Nginx,找到了我的问题的解决方案.</span></span>
<span class="line"><span style="color:#24292e;">解决方案是这里找到的答案：https://serverfault.com/questions/511846/basic-auth-for-a-tomcat-app-jira-with-nginx-as-reverse-proxy</span></span>
<span class="line"><span style="color:#24292e;">我的nginx配置中缺少的行是：</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> # Don&#39;t forward auth to Tomcat</span></span>
<span class="line"><span style="color:#24292e;"> proxy_set_header   Authorization &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> 默认情况下,看起来在基本身份验证之后Nginx会另外将身份验证标头转发给Jenkins,这就是导致我的问题. Jenkins收到转发的auth标头,然后认为它也需要自己授权？！</span></span>
<span class="line"><span style="color:#24292e;"> 如果我们将反向代理设置为不转发任何授权标头,如上所示,则一切正常. Nginx将提示basic_auth,并且在成功验证后,我们在转发到我们的反向代理时明确清除(重置？)auth标头. </span></span>
<span class="line"><span style="color:#24292e;"> </span></span>
<span class="line"><span style="color:#24292e;"> #完整配置</span></span>
<span class="line"><span style="color:#24292e;"> upstream jenkinsUP {</span></span>
<span class="line"><span style="color:#24292e;">	server 172.16.195.194:9191 max_fails=5 fail_timeout=30s;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">	listen 80;</span></span>
<span class="line"><span style="color:#24292e;">    server_name xxx.com;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">include /data/apps/nginx/conf/roles/*.conf;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#if ($geoip2_data_subdivisions_name != Beijing){</span></span>
<span class="line"><span style="color:#24292e;">#    return 444;</span></span>
<span class="line"><span style="color:#24292e;">#}</span></span>
<span class="line"><span style="color:#24292e;">if ($geoip2_data_country_name != China){</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"> if ($geoip2_data_country_code != CN) {</span></span>
<span class="line"><span style="color:#24292e;">    return 444;</span></span>
<span class="line"><span style="color:#24292e;"> }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">	location / {</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header   Authorization &quot;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">	proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header x-for $remote_addr;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header x-server $host;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_set_header x-agent $http_user_agent;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass     http://jenkinsUP/;</span></span>
<span class="line"><span style="color:#24292e;">	#allow 106.39.149.43;</span></span>
<span class="line"><span style="color:#24292e;">	#deny all;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">	access_log  /var/log/nginx/access.log es;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h1 id="jenkins-管理员密码重置" tabindex="-1">jenkins 管理员密码重置 <a class="header-anchor" href="#jenkins-管理员密码重置" aria-label="Permalink to &quot;jenkins 管理员密码重置&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">修改admin的加密密码为123456的加密密码 </span></span>
<span class="line"><span style="color:#e1e4e8;">#jbcrypt:$2a$10$MiIVR0rr/UhQBqT.bBq0QehTiQVqgNpUGyWW2nJObaVAM/2xSQdSq</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">vim /path/jenkins/users/admin/config.xml</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;hudson.security.HudsonPrivateSecurityRealm_-Details&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;passwordHash&gt;#jbcrypt:$2a$10$MiIVR0rr/UhQBqT.bBq0QehTiQVqgNpUGyWW2nJObaVAM/2xSQdSq&lt;/passwordHash&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/hudson.security.HudsonPrivateSecurityRealm_-Details&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">修改admin的加密密码为123456的加密密码 </span></span>
<span class="line"><span style="color:#24292e;">#jbcrypt:$2a$10$MiIVR0rr/UhQBqT.bBq0QehTiQVqgNpUGyWW2nJObaVAM/2xSQdSq</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">vim /path/jenkins/users/admin/config.xml</span></span>
<span class="line"><span style="color:#24292e;">&lt;hudson.security.HudsonPrivateSecurityRealm_-Details&gt;</span></span>
<span class="line"><span style="color:#24292e;">  &lt;passwordHash&gt;#jbcrypt:$2a$10$MiIVR0rr/UhQBqT.bBq0QehTiQVqgNpUGyWW2nJObaVAM/2xSQdSq&lt;/passwordHash&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/hudson.security.HudsonPrivateSecurityRealm_-Details&gt;</span></span></code></pre></div><p>官方文档：</p><p><a href="https://www.jenkins.io/zh/doc/book/using/using-credentials/" target="_blank" rel="noreferrer">https://www.jenkins.io/zh/doc/book/using/using-credentials/</a></p><p><a href="https://www.jenkins.io/zh/node/" target="_blank" rel="noreferrer">https://www.jenkins.io/zh/node/</a></p><h1 id="高亮、代码提示" tabindex="-1">高亮、代码提示 <a class="header-anchor" href="#高亮、代码提示" aria-label="Permalink to &quot;高亮、代码提示&quot;">​</a></h1><p>打开<code>插件市场</code>，并搜索<code>Jenkinsfile Support</code></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092221892.jpg" alt="006tNbRwly1ga5peffmdbj30qk0i23ze"></p><h1 id="规则校验" tabindex="-1">规则校验 <a class="header-anchor" href="#规则校验" aria-label="Permalink to &quot;规则校验&quot;">​</a></h1><p>打开<code>插件市场</code>，并搜索<code>Jenkins Pipeline Linter Connector</code></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092221979.jpg" alt="006tNbRwly1ga5pnci2e0j30ri0a8mxf"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">扩展\` &gt; \`Jenkins Pipeline Linter Connector</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">扩展\` &gt; \`Jenkins Pipeline Linter Connector</span></span></code></pre></div><p>配置插件</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092223920.jpg" alt="006tNbRwly1ga5pry5wu1j30u00w8wgd"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">http://&lt;your_jenkins_server:port&gt;/pipeline-model-converter/validate</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">http://&lt;your_jenkins_server:port&gt;/pipeline-model-converter/validate</span></span></code></pre></div><h3 id="校验" tabindex="-1">校验 <a class="header-anchor" href="#校验" aria-label="Permalink to &quot;校验&quot;">​</a></h3><p>在打开的<code>Jenkinsfile</code>文件中，按下快捷键<code>shift</code>+<code>command</code>+<code>P</code>(windows下是<code>shift</code>+<code>ctrl</code>+<code>P</code>)</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407092222830.jpg" alt="006tNbRwly1ga5puq988dj31a40o440n"></p><p>输入<code>validate Jenkinsfile</code>并按<code>回车</code>（记住快捷键，下次就可以快捷键操作了）</p><h2 id="批量删除历史记录" tabindex="-1">批量删除历史记录 <a class="header-anchor" href="#批量删除历史记录" aria-label="Permalink to &quot;批量删除历史记录&quot;">​</a></h2><p>项目管理 ----》 脚本命令行 ---》放入下面的脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">def jobName = &quot;ugou-admin-online&quot;   //删除的项目名称</span></span>
<span class="line"><span style="color:#e1e4e8;">def maxNumber = 600    // 保留的最小编号，意味着小于该编号的构建都将被删除</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Jenkins.instance.getItemByFullName(jobName).builds.findAll {</span></span>
<span class="line"><span style="color:#e1e4e8;">  it.number &lt;= maxNumber</span></span>
<span class="line"><span style="color:#e1e4e8;">}.each {</span></span>
<span class="line"><span style="color:#e1e4e8;">  it.delete()</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">def jobName = &quot;ugou-admin-online&quot;   //删除的项目名称</span></span>
<span class="line"><span style="color:#24292e;">def maxNumber = 600    // 保留的最小编号，意味着小于该编号的构建都将被删除</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Jenkins.instance.getItemByFullName(jobName).builds.findAll {</span></span>
<span class="line"><span style="color:#24292e;">  it.number &lt;= maxNumber</span></span>
<span class="line"><span style="color:#24292e;">}.each {</span></span>
<span class="line"><span style="color:#24292e;">  it.delete()</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,25),o=[l];function t(c,i,r,d,y,h){return n(),a("div",null,o)}const m=s(p,[["render",t]]);export{g as __pageData,m as default};
