import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"3.Pod安全上下文","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/资源对象/2-pod安全.md","filePath":"guide/container/k8s/资源对象/2-pod安全.md","lastUpdated":1730196597000}'),e={name:"guide/container/k8s/资源对象/2-pod安全.md"},p=l(`<p>官档,<a href="https://kubernetes.io/zh-cn/docs/concepts/security/pod-security-standards/" target="_blank" rel="noreferrer">https://kubernetes.io/zh-cn/docs/concepts/security/pod-security-standards/</a></p><h2 id="_1-禁止root" tabindex="-1">1. 禁止root <a class="header-anchor" href="#_1-禁止root" aria-label="Permalink to &quot;1. 禁止root&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#帮助</span></span>
<span class="line"><span style="color:#e1e4e8;">kubectl explain pod.spec.securityContext</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#帮助</span></span>
<span class="line"><span style="color:#24292e;">kubectl explain pod.spec.securityContext</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Pod</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;name&gt;</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">runAsUser</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;UID higher than 1000&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">runAsGroup</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;UID higher than 3000&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Pod</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;name&gt;</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">runAsUser</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;UID higher than 1000&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">runAsGroup</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;UID higher than 3000&gt;</span></span></code></pre></div><h2 id="_2-禁用allowprivilegeescalation" tabindex="-1">2. 禁用allowPrivilegeEscalation <a class="header-anchor" href="#_2-禁用allowprivilegeescalation" aria-label="Permalink to &quot;2. 禁用allowPrivilegeEscalation&quot;">​</a></h2><p>allowPrivilegeEscalation=true 表示容器的任何子进程都可以获得比父进程更多的权限。最好将其设置为 false，以确保 RunAsUser 命令不能绕过其现有的权限集。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Pod</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;Pod name&gt;</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;container name&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&lt;image&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">securityContext</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">allowPrivilegeEscalation</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Pod</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;Pod name&gt;</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;container name&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&lt;image&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">securityContext</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">allowPrivilegeEscalation</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span></code></pre></div><h1 id="_3-pod安全上下文" tabindex="-1">3.Pod安全上下文 <a class="header-anchor" href="#_3-pod安全上下文" aria-label="Permalink to &quot;3.Pod安全上下文&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">cat 18-pod-securityContext.yaml </span></span>
<span class="line"><span style="color:#e1e4e8;">apiVersion: v1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: Pod</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">   name: securitycontext-004</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  containers:</span></span>
<span class="line"><span style="color:#e1e4e8;">  - name: c1</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: harbor.oldboyedu.com/tools/centos7-iptabls:v0.1</span></span>
<span class="line"><span style="color:#e1e4e8;">    # args:</span></span>
<span class="line"><span style="color:#e1e4e8;">    # - tail</span></span>
<span class="line"><span style="color:#e1e4e8;">    # - -f</span></span>
<span class="line"><span style="color:#e1e4e8;">    # - /etc/hosts</span></span>
<span class="line"><span style="color:#e1e4e8;">    # 配置Pod的安全相关属性</span></span>
<span class="line"><span style="color:#e1e4e8;">    securityContext:</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 配置容器为特权容器，若配置了特权容器，可能对capabilities测试有影响哟!</span></span>
<span class="line"><span style="color:#e1e4e8;">      #privileged: true</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 自定义LINUX内核特性</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 推荐阅读:</span></span>
<span class="line"><span style="color:#e1e4e8;">      #   https://man7.org/linux/man-pages/man7/capabilities.7.html</span></span>
<span class="line"><span style="color:#e1e4e8;">      #   https://docs.docker.com/compose/compose-file/compose-file-v3/#cap_add-cap_drop</span></span>
<span class="line"><span style="color:#e1e4e8;">      capabilities:</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 添加所有的Linux内核功能</span></span>
<span class="line"><span style="color:#e1e4e8;">        add:</span></span>
<span class="line"><span style="color:#e1e4e8;">        - ALL</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 移除指定Linux内核特性</span></span>
<span class="line"><span style="color:#e1e4e8;">        drop:</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 代表禁用网络管理的配置,</span></span>
<span class="line"><span style="color:#e1e4e8;">        # - NET_ADMIN</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 代表禁用UID和GID，表示你无法使用chown命令哟</span></span>
<span class="line"><span style="color:#e1e4e8;">        # 比如执行&quot;useradd oldboyedu&quot;时会创建&quot;/home/oldboyedu&quot;目录，并执行chown修改目录权限为&quot;oldboyedu&quot;用户，此时你会发现可以创建用户成功，但无法修改&quot;/home/oldboyedu&quot;目录的属主和属组。</span></span>
<span class="line"><span style="color:#e1e4e8;">        - CHOWN</span></span>
<span class="line"><span style="color:#e1e4e8;">        # # 代表禁用chroot命令</span></span>
<span class="line"><span style="color:#e1e4e8;">        - SYS_CHROOT</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 如果容器的进程以root身份运行，则禁止容器启动!</span></span>
<span class="line"><span style="color:#e1e4e8;">      # runAsNonRoot: true</span></span>
<span class="line"><span style="color:#e1e4e8;">      # 指定运行程序的用户UID，注意，该用户的UID必须存在!</span></span>
<span class="line"><span style="color:#e1e4e8;">      # runAsUser: 666</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">cat 18-pod-securityContext.yaml </span></span>
<span class="line"><span style="color:#24292e;">apiVersion: v1</span></span>
<span class="line"><span style="color:#24292e;">kind: Pod</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">   name: securitycontext-004</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  containers:</span></span>
<span class="line"><span style="color:#24292e;">  - name: c1</span></span>
<span class="line"><span style="color:#24292e;">    image: harbor.oldboyedu.com/tools/centos7-iptabls:v0.1</span></span>
<span class="line"><span style="color:#24292e;">    # args:</span></span>
<span class="line"><span style="color:#24292e;">    # - tail</span></span>
<span class="line"><span style="color:#24292e;">    # - -f</span></span>
<span class="line"><span style="color:#24292e;">    # - /etc/hosts</span></span>
<span class="line"><span style="color:#24292e;">    # 配置Pod的安全相关属性</span></span>
<span class="line"><span style="color:#24292e;">    securityContext:</span></span>
<span class="line"><span style="color:#24292e;">      # 配置容器为特权容器，若配置了特权容器，可能对capabilities测试有影响哟!</span></span>
<span class="line"><span style="color:#24292e;">      #privileged: true</span></span>
<span class="line"><span style="color:#24292e;">      # 自定义LINUX内核特性</span></span>
<span class="line"><span style="color:#24292e;">      # 推荐阅读:</span></span>
<span class="line"><span style="color:#24292e;">      #   https://man7.org/linux/man-pages/man7/capabilities.7.html</span></span>
<span class="line"><span style="color:#24292e;">      #   https://docs.docker.com/compose/compose-file/compose-file-v3/#cap_add-cap_drop</span></span>
<span class="line"><span style="color:#24292e;">      capabilities:</span></span>
<span class="line"><span style="color:#24292e;">        # 添加所有的Linux内核功能</span></span>
<span class="line"><span style="color:#24292e;">        add:</span></span>
<span class="line"><span style="color:#24292e;">        - ALL</span></span>
<span class="line"><span style="color:#24292e;">        # 移除指定Linux内核特性</span></span>
<span class="line"><span style="color:#24292e;">        drop:</span></span>
<span class="line"><span style="color:#24292e;">        # 代表禁用网络管理的配置,</span></span>
<span class="line"><span style="color:#24292e;">        # - NET_ADMIN</span></span>
<span class="line"><span style="color:#24292e;">        # 代表禁用UID和GID，表示你无法使用chown命令哟</span></span>
<span class="line"><span style="color:#24292e;">        # 比如执行&quot;useradd oldboyedu&quot;时会创建&quot;/home/oldboyedu&quot;目录，并执行chown修改目录权限为&quot;oldboyedu&quot;用户，此时你会发现可以创建用户成功，但无法修改&quot;/home/oldboyedu&quot;目录的属主和属组。</span></span>
<span class="line"><span style="color:#24292e;">        - CHOWN</span></span>
<span class="line"><span style="color:#24292e;">        # # 代表禁用chroot命令</span></span>
<span class="line"><span style="color:#24292e;">        - SYS_CHROOT</span></span>
<span class="line"><span style="color:#24292e;">      # 如果容器的进程以root身份运行，则禁止容器启动!</span></span>
<span class="line"><span style="color:#24292e;">      # runAsNonRoot: true</span></span>
<span class="line"><span style="color:#24292e;">      # 指定运行程序的用户UID，注意，该用户的UID必须存在!</span></span>
<span class="line"><span style="color:#24292e;">      # runAsUser: 666</span></span></code></pre></div><p><a href="https://www.elastic.co/cn/support/matrix#matrix_compatibility" target="_blank" rel="noreferrer">https://www.elastic.co/cn/support/matrix#matrix_compatibility</a></p>`,10),o=[p];function c(t,r,i,y,d,E){return n(),a("div",null,o)}const m=s(e,[["render",c]]);export{h as __pageData,m as default};
