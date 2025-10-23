import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"1，阿里云加速","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/index.md","filePath":"guide/container/index.md","lastUpdated":1701229860000}'),p={name:"guide/container/index.md"},l=e(`<blockquote><p>[!WARNING] kskskks</p></blockquote><h1 id="_1-阿里云加速" tabindex="-1">1，阿里云加速 <a class="header-anchor" href="#_1-阿里云加速" aria-label="Permalink to &quot;1，阿里云加速&quot;">​</a></h1><p><a href="https://www.aliyun.com/" target="_blank" rel="noreferrer">https://www.aliyun.com/</a> -&gt;搜索容器镜像服务-&gt;进入管理控制台-&gt;选择镜像加速器-&gt;复制下方命令行执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">### sudo mkdir -p /etc/docker</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;registry-mirrors&quot;: [&quot;https://m30jn00e.mirror.aliyuncs.com&quot;]</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo systemctl daemon-reload</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">sudo systemctl restart docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">### sudo mkdir -p /etc/docker</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">&quot;registry-mirrors&quot;: [&quot;https://m30jn00e.mirror.aliyuncs.com&quot;]</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">sudo systemctl restart docker</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311221530587.jpg" alt="img"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311221530038.jpg" alt="img"></p><h1 id="_2-案例" tabindex="-1">2，案例 <a class="header-anchor" href="#_2-案例" aria-label="Permalink to &quot;2，案例&quot;">​</a></h1><p><strong>问题：</strong></p><p><em><strong>*ERROR: for high_mysql Cannot create container for service high_mysql: No command specified ERROR: Encountered errors while bringing up the project.*</strong></em></p><p><strong>问题描述：</strong></p><ul><li><strong>利用docker的export和save分别对容器和镜像进行打包</strong></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@miguan1:/opt/tpot/etc# docker export 512c649c07ba &gt; a.tar</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan1:/opt/tpot/etc# docker save new_1:v1 &gt; b.tar</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan1:/opt/tpot/etc# ls</span></span>
<span class="line"><span style="color:#e1e4e8;">a.tar  b.tar  compose  curator  logrotate  objects  tpot.yml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan1:/opt/tpot/etc# scp -r ./a.tar zeek@192.168.1.43:/home/zeek</span></span>
<span class="line"><span style="color:#e1e4e8;">zeek@192.168.1.43&#39;s password:</span></span>
<span class="line"><span style="color:#e1e4e8;">a.tar                                                                                       100%  567MB  90.6MB/s   00:06</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan1:/opt/tpot/etc# scp -r ./b.tar zeek@192.168.1.43:/home/zeek</span></span>
<span class="line"><span style="color:#e1e4e8;">zeek@192.168.1.43&#39;s password:</span></span>
<span class="line"><span style="color:#e1e4e8;">b.tar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@miguan1:/opt/tpot/etc# docker export 512c649c07ba &gt; a.tar</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@miguan1:/opt/tpot/etc# docker save new_1:v1 &gt; b.tar</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@miguan1:/opt/tpot/etc# ls</span></span>
<span class="line"><span style="color:#24292e;">a.tar  b.tar  compose  curator  logrotate  objects  tpot.yml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@miguan1:/opt/tpot/etc# scp -r ./a.tar zeek@192.168.1.43:/home/zeek</span></span>
<span class="line"><span style="color:#24292e;">zeek@192.168.1.43&#39;s password:</span></span>
<span class="line"><span style="color:#24292e;">a.tar                                                                                       100%  567MB  90.6MB/s   00:06</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@miguan1:/opt/tpot/etc# scp -r ./b.tar zeek@192.168.1.43:/home/zeek</span></span>
<span class="line"><span style="color:#24292e;">zeek@192.168.1.43&#39;s password:</span></span>
<span class="line"><span style="color:#24292e;">b.tar</span></span></code></pre></div><p><strong>分别生成新的镜像文件</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">root@miguan12:/opt# cat a.tar |docker import - new1:v1</span></span>
<span class="line"><span style="color:#e1e4e8;">sha256:55bd7ba312f7b73fa56f3dd81d408f5122efa1d828eb116b3f889e28282198d4</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan12:/opt# docker load -i b.tar</span></span>
<span class="line"><span style="color:#e1e4e8;">d0f104dc0a1f: Loading layer [==================================================&gt;]  72.49MB/72.49MB</span></span>
<span class="line"><span style="color:#e1e4e8;">316393412e04: Loading layer [==================================================&gt;]  338.4kB/338.4kB</span></span>
<span class="line"><span style="color:#e1e4e8;">e9affce9cbe8: Loading layer [==================================================&gt;]  9.539MB/9.539MB</span></span>
<span class="line"><span style="color:#e1e4e8;">e8fd11b2289c: Loading layer [==================================================&gt;]    4.2MB/4.2MB</span></span>
<span class="line"><span style="color:#e1e4e8;">b55e8d7c5659: Loading layer [==================================================&gt;]  1.536kB/1.536kB</span></span>
<span class="line"><span style="color:#e1e4e8;">ae39983d39c4: Loading layer [==================================================&gt;]  53.76MB/53.76MB</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan12:/opt# docker images</span></span>
<span class="line"><span style="color:#e1e4e8;">REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE</span></span>
<span class="line"><span style="color:#e1e4e8;">new1                       v1                  55bd7ba312f7        6 minutes ago       588MB</span></span>
<span class="line"><span style="color:#e1e4e8;">new_1                      v1                  82985bcdcd96        22 hours ago        595MB</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">root@miguan12:/opt# cat a.tar |docker import - new1:v1</span></span>
<span class="line"><span style="color:#24292e;">sha256:55bd7ba312f7b73fa56f3dd81d408f5122efa1d828eb116b3f889e28282198d4</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@miguan12:/opt# docker load -i b.tar</span></span>
<span class="line"><span style="color:#24292e;">d0f104dc0a1f: Loading layer [==================================================&gt;]  72.49MB/72.49MB</span></span>
<span class="line"><span style="color:#24292e;">316393412e04: Loading layer [==================================================&gt;]  338.4kB/338.4kB</span></span>
<span class="line"><span style="color:#24292e;">e9affce9cbe8: Loading layer [==================================================&gt;]  9.539MB/9.539MB</span></span>
<span class="line"><span style="color:#24292e;">e8fd11b2289c: Loading layer [==================================================&gt;]    4.2MB/4.2MB</span></span>
<span class="line"><span style="color:#24292e;">b55e8d7c5659: Loading layer [==================================================&gt;]  1.536kB/1.536kB</span></span>
<span class="line"><span style="color:#24292e;">ae39983d39c4: Loading layer [==================================================&gt;]  53.76MB/53.76MB</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">root@miguan12:/opt# docker images</span></span>
<span class="line"><span style="color:#24292e;">REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE</span></span>
<span class="line"><span style="color:#24292e;">new1                       v1                  55bd7ba312f7        6 minutes ago       588MB</span></span>
<span class="line"><span style="color:#24292e;">new_1                      v1                  82985bcdcd96        22 hours ago        595MB</span></span></code></pre></div><p><strong>镜像比较</strong></p><p><strong>红框以Cmd语令差异做出对比，可以利用docker inspect 镜像。可以看出，export的导出的镜像不带有容器运行时的第一条语令，save保存的镜像较为完整。原因：export导出的tar文件只是当前正在运行的容器，而包括docker run创建容器后/bin/sh -c后面的语令</strong></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202311221530959.jpg" alt="img"></p><p><strong>分别测试镜像生成容器的情况</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">自定义tpot.yml文件：</span></span>
<span class="line"><span style="color:#e1e4e8;">high_mysql:</span></span>
<span class="line"><span style="color:#e1e4e8;">    container_name: high_mysql</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: new1:v1   # --&gt; 根据测试镜像不同进行更换 </span></span>
<span class="line"><span style="color:#e1e4e8;">    tty: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    networks:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - cowrie_local</span></span>
<span class="line"><span style="color:#e1e4e8;">    environment:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - MYSQL_ROOT_PASSWORD=123456</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - &#39;3306:3306&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    read_only: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    restart: &#39;no&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    tty: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - /data/mysql:/opt</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(*)使用new1:v1镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan12:/opt/tpot/etc# docker-compose -f /opt/tpot/etc/tpot.yml up -d high_mysql</span></span>
<span class="line"><span style="color:#e1e4e8;">WARNING: Some networks were defined but are not used by any service: heralding_local, spiderfoot_local</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating high_mysql ...</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating high_mysql ... error</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR: for high_mysql  Cannot create container for service high_mysql: No command specified</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR: for high_mysql  Cannot create container for service high_mysql: No command specified</span></span>
<span class="line"><span style="color:#e1e4e8;">ERROR: Encountered errors while bringing up the project.</span></span>
<span class="line"><span style="color:#e1e4e8;">(*)验证</span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan12:/opt/tpot/etc# docker ps -a</span></span>
<span class="line"><span style="color:#e1e4e8;">CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS                 PORTS</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(*)使用new_1:v1镜像</span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan12:/opt/tpot/etc# docker-compose -f /opt/tpot/etc/tpot.yml up -d high_mysql</span></span>
<span class="line"><span style="color:#e1e4e8;">WARNING: Some networks were defined but are not used by any service: heralding_local, spiderfoot_local</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating high_mysql ...</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating high_mysql ... done</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(*)验证</span></span>
<span class="line"><span style="color:#e1e4e8;">root@miguan12:/opt/tpot/etc# docker ps -a</span></span>
<span class="line"><span style="color:#e1e4e8;">CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS                 PORTS                               NAMES</span></span>
<span class="line"><span style="color:#e1e4e8;">f967b9dfc2b3        new_1:v1                        &quot;docker-entrypoint.s…&quot;   38 seconds ago      Up 32 seconds          0.0.0.0:3306-&gt;3306/tcp, 33060/tcp   high_mysql</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">前提的记住启动之前容器的名字</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">自定义tpot.yml文件：</span></span>
<span class="line"><span style="color:#24292e;">high_mysql:</span></span>
<span class="line"><span style="color:#24292e;">    container_name: high_mysql</span></span>
<span class="line"><span style="color:#24292e;">    image: new1:v1   # --&gt; 根据测试镜像不同进行更换 </span></span>
<span class="line"><span style="color:#24292e;">    tty: true</span></span>
<span class="line"><span style="color:#24292e;">    networks:</span></span>
<span class="line"><span style="color:#24292e;">    - cowrie_local</span></span>
<span class="line"><span style="color:#24292e;">    environment:</span></span>
<span class="line"><span style="color:#24292e;">    - MYSQL_ROOT_PASSWORD=123456</span></span>
<span class="line"><span style="color:#24292e;">    ports:</span></span>
<span class="line"><span style="color:#24292e;">    - &#39;3306:3306&#39;</span></span>
<span class="line"><span style="color:#24292e;">    read_only: true</span></span>
<span class="line"><span style="color:#24292e;">    restart: &#39;no&#39;</span></span>
<span class="line"><span style="color:#24292e;">    tty: true</span></span>
<span class="line"><span style="color:#24292e;">    volumes:</span></span>
<span class="line"><span style="color:#24292e;">    - /data/mysql:/opt</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(*)使用new1:v1镜像</span></span>
<span class="line"><span style="color:#24292e;">root@miguan12:/opt/tpot/etc# docker-compose -f /opt/tpot/etc/tpot.yml up -d high_mysql</span></span>
<span class="line"><span style="color:#24292e;">WARNING: Some networks were defined but are not used by any service: heralding_local, spiderfoot_local</span></span>
<span class="line"><span style="color:#24292e;">Creating high_mysql ...</span></span>
<span class="line"><span style="color:#24292e;">Creating high_mysql ... error</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ERROR: for high_mysql  Cannot create container for service high_mysql: No command specified</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">ERROR: for high_mysql  Cannot create container for service high_mysql: No command specified</span></span>
<span class="line"><span style="color:#24292e;">ERROR: Encountered errors while bringing up the project.</span></span>
<span class="line"><span style="color:#24292e;">(*)验证</span></span>
<span class="line"><span style="color:#24292e;">root@miguan12:/opt/tpot/etc# docker ps -a</span></span>
<span class="line"><span style="color:#24292e;">CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS                 PORTS</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(*)使用new_1:v1镜像</span></span>
<span class="line"><span style="color:#24292e;">root@miguan12:/opt/tpot/etc# docker-compose -f /opt/tpot/etc/tpot.yml up -d high_mysql</span></span>
<span class="line"><span style="color:#24292e;">WARNING: Some networks were defined but are not used by any service: heralding_local, spiderfoot_local</span></span>
<span class="line"><span style="color:#24292e;">Creating high_mysql ...</span></span>
<span class="line"><span style="color:#24292e;">Creating high_mysql ... done</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(*)验证</span></span>
<span class="line"><span style="color:#24292e;">root@miguan12:/opt/tpot/etc# docker ps -a</span></span>
<span class="line"><span style="color:#24292e;">CONTAINER ID        IMAGE                           COMMAND                  CREATED             STATUS                 PORTS                               NAMES</span></span>
<span class="line"><span style="color:#24292e;">f967b9dfc2b3        new_1:v1                        &quot;docker-entrypoint.s…&quot;   38 seconds ago      Up 32 seconds          0.0.0.0:3306-&gt;3306/tcp, 33060/tcp   high_mysql</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">前提的记住启动之前容器的名字</span></span></code></pre></div><h2 id="docker-save-与-docker-export-以及-docker-load-和-docker-import-的区别" tabindex="-1">docker save 与 docker export 以及 docker load 和 docker import 的区别 <a class="header-anchor" href="#docker-save-与-docker-export-以及-docker-load-和-docker-import-的区别" aria-label="Permalink to &quot;docker save 与 docker export 以及 docker load 和 docker import 的区别&quot;">​</a></h2><ol><li>docker save保存的是镜像（image），docker export保存的是容器（container）；</li><li>docker load用来载入镜像包，docker import用来载入容器包，但两者都会恢复为镜像；</li><li>docker load不能对载入的镜像重命名，而docker import可以为镜像指定新名称</li></ol>`,21),o=[l];function t(c,r,i,y,d,g){return n(),a("div",null,o)}const u=s(p,[["render",t]]);export{h as __pageData,u as default};
