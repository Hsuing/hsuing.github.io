import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const h=JSON.parse('{"title":"一. 背景","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/资源对象/9-secretReload.md","filePath":"guide/container/k8s/资源对象/9-secretReload.md","lastUpdated":1721730545000}'),l={name:"guide/container/k8s/资源对象/9-secretReload.md"},p=n(`<p>文档,<a href="https://github.com/stakater/Reloader" target="_blank" rel="noreferrer">https://github.com/stakater/Reloader</a></p><h1 id="一-背景" tabindex="-1">一. 背景 <a class="header-anchor" href="#一-背景" aria-label="Permalink to &quot;一. 背景&quot;">​</a></h1><h2 id="_1-1-配置中心问题" tabindex="-1">1.1 配置中心问题 <a class="header-anchor" href="#_1-1-配置中心问题" aria-label="Permalink to &quot;1.1 配置中心问题&quot;">​</a></h2><p>在云原生中配置中心，例如：<code>Configmap</code>和<code>Secret</code>对象，虽然可以进行直接更新资源对象</p><ul><li>对于引用这些有些不变的配置是可以打包到镜像中的，那可变的配置呢？</li><li>信息泄漏，很容易引发安全风险，尤其是一些敏感信息，比如密码、密钥等。</li><li>每次配置更新后，都要重新打包一次，升级应用。镜像版本过多，也给镜像管理和镜像中心存储带来很大的负担。</li><li>定制化太严重，可扩展能力差，且不容易复用。</li></ul><h2 id="_1-2-使用方式" tabindex="-1">1.2 使用方式 <a class="header-anchor" href="#_1-2-使用方式" aria-label="Permalink to &quot;1.2 使用方式&quot;">​</a></h2><p><code>Configmap</code>或<code>Secret</code>使用有两种方式，一种是<code>env</code>系统变量赋值，一种是<code>volume</code>挂载赋值，env写入系统的configmap是不会热更新的，而volume写入的方式支持热更新！</p><ul><li>对于env环境的，必须要滚动更新pod才能生效，也就是删除老的pod，重新使用镜像拉起新pod加载环境变量才能生效。</li><li>对于volume的方式，虽然内容变了，但是需要我们的应用直接监控configmap的变动，或者一直去更新环境变量才能在这种情况下达到热更新的目的。</li></ul><p>应用不支持热更新，可以在业务容器中启动一个sidercar容器，监控configmap的变动，更新配置文件，或者也滚动更新pod达到更新配置的效果。</p><h1 id="二-解决方案" tabindex="-1">二. 解决方案 <a class="header-anchor" href="#二-解决方案" aria-label="Permalink to &quot;二. 解决方案&quot;">​</a></h1><p>ConfigMap 和 Secret 是 Kubernetes 常用的保存配置数据的对象，你可以根据需要选择合适的对象存储数据。通过 Volume 方式挂载到 Pod 内的，kubelet 都会定期进行更新。但是通过环境变量注入到容器中，这样无法感知到 ConfigMap 或 Secret 的内容更新。</p><p>目前如何让 Pod 内的业务感知到 ConfigMap 或 Secret 的变化，还是一个待解决的问题。但是我们还是有一些 Workaround 的。</p><p>如果业务自身支持 reload 配置的话，比如nginx -s reload，可以通过 inotify 感知到文件更新，或者直接定期进行 reload（这里可以配合我们的 readinessProbe 一起使用）。</p><p>如果我们的业务没有这个能力，考虑到不可变基础设施的思想，我们是不是可以采用滚动升级的方式进行？没错，这是一个非常好的方法。目前有个开源工具Reloader，它就是采用这种方式，通过 watch ConfigMap 和 Secret，一旦发现对象更新，就自动触发对 Deployment 或 StatefulSet 等工作负载对象进行滚动升级。</p><h1 id="三-reloader简介" tabindex="-1">三. reloader简介 <a class="header-anchor" href="#三-reloader简介" aria-label="Permalink to &quot;三. reloader简介&quot;">​</a></h1><h2 id="_3-1-reloader简介" tabindex="-1">3.1 reloader简介 <a class="header-anchor" href="#_3-1-reloader简介" aria-label="Permalink to &quot;3.1 reloader简介&quot;">​</a></h2><p><code>Reloader</code> 可以观察 ConfigMap 和 Secret 中的变化，并通过相关的 deploymentconfiggs、 deploymentconfiggs、 deploymonset 和 statefulset 对 Pods 进行滚动升级。</p><h2 id="_3-2-reloader安装" tabindex="-1">3.2 reloader安装 <a class="header-anchor" href="#_3-2-reloader安装" aria-label="Permalink to &quot;3.2 reloader安装&quot;">​</a></h2><ul><li>helm安装</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ helm repo add stakater https://stakater.github.io/stakater-charts</span></span>
<span class="line"><span style="color:#e1e4e8;">$ helm repo update</span></span>
<span class="line"><span style="color:#e1e4e8;">$ helm install stakater/reloader</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ helm repo add stakater https://stakater.github.io/stakater-charts</span></span>
<span class="line"><span style="color:#24292e;">$ helm repo update</span></span>
<span class="line"><span style="color:#24292e;">$ helm install stakater/reloader</span></span></code></pre></div><ul><li>Kustomize</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ kubectl apply -k https://github.com/stakater/Reloader/deployments/kubernetes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ kubectl apply -k https://github.com/stakater/Reloader/deployments/kubernetes</span></span></code></pre></div><ul><li>资源清单安装</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ kubectl apply -f https://raw.githubusercontent.com/stakater/Reloader/master/deployments/kubernetes/reloader.yaml</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">clusterrole.rbac.authorization.k8s.io/reloader-reloader-role created</span></span>
<span class="line"><span style="color:#e1e4e8;">clusterrolebinding.rbac.authorization.k8s.io/reloader-reloader-role-binding created</span></span>
<span class="line"><span style="color:#e1e4e8;">deployment.apps/reloader-reloader created</span></span>
<span class="line"><span style="color:#e1e4e8;">serviceaccount/reloader-reloader created</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">NAME                                     READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#e1e4e8;">pod/reloader-reloader-66d46d5885-nx64t   1/1     Running   0          15s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">NAME                                READY   UP-TO-DATE   AVAILABLE   AGE</span></span>
<span class="line"><span style="color:#e1e4e8;">deployment.apps/reloader-reloader   1/1     1            1           16s</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">NAME                                           DESIRED   CURRENT   READY   AGE</span></span>
<span class="line"><span style="color:#e1e4e8;">replicaset.apps/reloader-reloader-66d46d5885   1         1         1       16s</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ kubectl apply -f https://raw.githubusercontent.com/stakater/Reloader/master/deployments/kubernetes/reloader.yaml</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">clusterrole.rbac.authorization.k8s.io/reloader-reloader-role created</span></span>
<span class="line"><span style="color:#24292e;">clusterrolebinding.rbac.authorization.k8s.io/reloader-reloader-role-binding created</span></span>
<span class="line"><span style="color:#24292e;">deployment.apps/reloader-reloader created</span></span>
<span class="line"><span style="color:#24292e;">serviceaccount/reloader-reloader created</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">NAME                                     READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#24292e;">pod/reloader-reloader-66d46d5885-nx64t   1/1     Running   0          15s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">NAME                                READY   UP-TO-DATE   AVAILABLE   AGE</span></span>
<span class="line"><span style="color:#24292e;">deployment.apps/reloader-reloader   1/1     1            1           16s</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">NAME                                           DESIRED   CURRENT   READY   AGE</span></span>
<span class="line"><span style="color:#24292e;">replicaset.apps/reloader-reloader-66d46d5885   1         1         1       16s</span></span></code></pre></div><p><code>reloader</code> 能够配置忽略cm或者secrets资源，可以通过配置在reader deploy中的spec.template.spec.containers.args，如果两个都忽略，那就缩小deploy为0，或者不部署reoader。</p><table><thead><tr><th>Args</th><th>Description</th></tr></thead><tbody><tr><td>--resources-to-ignore=configMaps</td><td>To ignore configMaps</td></tr><tr><td>--resources-to-ignore=secrets</td><td>To ignore secrets</td></tr></tbody></table><h2 id="_3-3-配置" tabindex="-1">3.3 配置 <a class="header-anchor" href="#_3-3-配置" aria-label="Permalink to &quot;3.3 配置&quot;">​</a></h2><h3 id="_3-3-1-自动更新" tabindex="-1">3.3.1 自动更新 <a class="header-anchor" href="#_3-3-1-自动更新" aria-label="Permalink to &quot;3.3.1 自动更新&quot;">​</a></h3><p><code>reloader.stakater.com/search</code> 和 <code>reloader.stakater.com/auto</code> 并不在一起工作。如果你在你的部署上有一个 reloader.stakater.com/auto : “true”的注释，该资源对象引用的所有configmap或这secret的改变都会重启该资源，不管他们是否有 reloader.stakater.com/match : “true”的注释。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">kind: Deployment</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;">    reloader.stakater.com/auto: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  template: metadata:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">kind: Deployment</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  annotations:</span></span>
<span class="line"><span style="color:#24292e;">    reloader.stakater.com/auto: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  template: metadata:</span></span></code></pre></div><h3 id="_3-3-2-制定更新" tabindex="-1">3.3.2 制定更新 <a class="header-anchor" href="#_3-3-2-制定更新" aria-label="Permalink to &quot;3.3.2 制定更新&quot;">​</a></h3><p>指定一个特定的configmap或者secret，只有在我们指定的配置图或秘密被改变时才会触发滚动升级，这样，它不会触发滚动升级所有配置图或秘密在部署，后台登录或状态设置中使用。</p><p>一个制定deployment资源对象，在引用的configmap或者secret种，只有<code>reloader.stakater.com/match: &quot;true&quot;</code>为true才会出发更新，为false或者不进行标记，该资源对象都不会监视配置的变化而重启。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">kind: Deployment</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;">    reloader.stakater.com/search: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  template:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">kind: Deployment</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  annotations:</span></span>
<span class="line"><span style="color:#24292e;">    reloader.stakater.com/search: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  template:</span></span></code></pre></div><p>cm配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">kind: ConfigMap</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;">    reloader.stakater.com/match: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">data:</span></span>
<span class="line"><span style="color:#e1e4e8;">  key: value</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">kind: ConfigMap</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  annotations:</span></span>
<span class="line"><span style="color:#24292e;">    reloader.stakater.com/match: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;">data:</span></span>
<span class="line"><span style="color:#24292e;">  key: value</span></span></code></pre></div><h3 id="_3-3-3-指定cm" tabindex="-1">3.3.3 指定cm <a class="header-anchor" href="#_3-3-3-指定cm" aria-label="Permalink to &quot;3.3.3 指定cm&quot;">​</a></h3><p>如果一个deployment挂载有多个cm或者的场景下，我们只希望更新特定一个cm后，deploy发生滚动更新，更新其他的cm，deploy不更新，这种场景可以将cm在deploy中指定为单个或着列表实现。</p><p>例如：一个deploy有挂载nginx-cm1和nginx-cm2两个configmap，只想nginx-cm1更新的时候deploy才发生滚动更新，此时无需在两个cm中配置注解，只需要在deploy中写入<code>configmap.reloader.stakater.com/reload:nginx-cm1</code>，其中nginx-cm1如果发生更新，deploy就会触发滚动更新。</p><p>如果多个cm直接用逗号隔开</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># configmap对象</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: Deployment</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;">    configmap.reloader.stakater.com/reload: &quot;nginx-cm1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  template: metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;"># secret对象</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: Deployment</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;">    secret.reloader.stakater.com/reload: &quot;foo-secret&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  template: metadata:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># configmap对象</span></span>
<span class="line"><span style="color:#24292e;">kind: Deployment</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  annotations:</span></span>
<span class="line"><span style="color:#24292e;">    configmap.reloader.stakater.com/reload: &quot;nginx-cm1&quot;</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  template: metadata:</span></span>
<span class="line"><span style="color:#24292e;"># secret对象</span></span>
<span class="line"><span style="color:#24292e;">kind: Deployment</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  annotations:</span></span>
<span class="line"><span style="color:#24292e;">    secret.reloader.stakater.com/reload: &quot;foo-secret&quot;</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  template: metadata:</span></span></code></pre></div><blockquote><p>无需在cm或secret中添加注解，只需要在引用资源对象中添加注解即可。</p></blockquote><h1 id="四-测试" tabindex="-1">四. 测试 <a class="header-anchor" href="#四-测试" aria-label="Permalink to &quot;四. 测试&quot;">​</a></h1><h2 id="_4-1-deploy" tabindex="-1">4.1 deploy <a class="header-anchor" href="#_4-1-deploy" aria-label="Permalink to &quot;4.1 deploy&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">apiVersion: apps/v1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: Deployment</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:   </span></span>
<span class="line"><span style="color:#e1e4e8;">    reloader.stakater.com/search: &quot;true&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  labels:</span></span>
<span class="line"><span style="color:#e1e4e8;">    run: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">  namespace: default</span></span>
<span class="line"><span style="color:#e1e4e8;">spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">  replicas: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">  selector:</span></span>
<span class="line"><span style="color:#e1e4e8;">    matchLabels:</span></span>
<span class="line"><span style="color:#e1e4e8;">      run: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">  template:</span></span>
<span class="line"><span style="color:#e1e4e8;">    metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">      labels:</span></span>
<span class="line"><span style="color:#e1e4e8;">        run: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">    spec:</span></span>
<span class="line"><span style="color:#e1e4e8;">      containers:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - image: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">        name: nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">        volumeMounts:       </span></span>
<span class="line"><span style="color:#e1e4e8;">        - name: nginx-cm</span></span>
<span class="line"><span style="color:#e1e4e8;">          mountPath: /data/cfg</span></span>
<span class="line"><span style="color:#e1e4e8;">          readOnly: true</span></span>
<span class="line"><span style="color:#e1e4e8;">      volumes:      </span></span>
<span class="line"><span style="color:#e1e4e8;">      - name: nginx-cm</span></span>
<span class="line"><span style="color:#e1e4e8;">        configMap:          </span></span>
<span class="line"><span style="color:#e1e4e8;">          name: nginx-cm</span></span>
<span class="line"><span style="color:#e1e4e8;">          items:          </span></span>
<span class="line"><span style="color:#e1e4e8;">          - key: config.yaml        </span></span>
<span class="line"><span style="color:#e1e4e8;">            path: config.yaml</span></span>
<span class="line"><span style="color:#e1e4e8;">            mode: 0644</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">apiVersion: apps/v1</span></span>
<span class="line"><span style="color:#24292e;">kind: Deployment</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  annotations:   </span></span>
<span class="line"><span style="color:#24292e;">    reloader.stakater.com/search: &quot;true&quot;</span></span>
<span class="line"><span style="color:#24292e;">  labels:</span></span>
<span class="line"><span style="color:#24292e;">    run: nginx</span></span>
<span class="line"><span style="color:#24292e;">  name: nginx</span></span>
<span class="line"><span style="color:#24292e;">  namespace: default</span></span>
<span class="line"><span style="color:#24292e;">spec:</span></span>
<span class="line"><span style="color:#24292e;">  replicas: 1</span></span>
<span class="line"><span style="color:#24292e;">  selector:</span></span>
<span class="line"><span style="color:#24292e;">    matchLabels:</span></span>
<span class="line"><span style="color:#24292e;">      run: nginx</span></span>
<span class="line"><span style="color:#24292e;">  template:</span></span>
<span class="line"><span style="color:#24292e;">    metadata:</span></span>
<span class="line"><span style="color:#24292e;">      labels:</span></span>
<span class="line"><span style="color:#24292e;">        run: nginx</span></span>
<span class="line"><span style="color:#24292e;">    spec:</span></span>
<span class="line"><span style="color:#24292e;">      containers:</span></span>
<span class="line"><span style="color:#24292e;">      - image: nginx</span></span>
<span class="line"><span style="color:#24292e;">        name: nginx</span></span>
<span class="line"><span style="color:#24292e;">        volumeMounts:       </span></span>
<span class="line"><span style="color:#24292e;">        - name: nginx-cm</span></span>
<span class="line"><span style="color:#24292e;">          mountPath: /data/cfg</span></span>
<span class="line"><span style="color:#24292e;">          readOnly: true</span></span>
<span class="line"><span style="color:#24292e;">      volumes:      </span></span>
<span class="line"><span style="color:#24292e;">      - name: nginx-cm</span></span>
<span class="line"><span style="color:#24292e;">        configMap:          </span></span>
<span class="line"><span style="color:#24292e;">          name: nginx-cm</span></span>
<span class="line"><span style="color:#24292e;">          items:          </span></span>
<span class="line"><span style="color:#24292e;">          - key: config.yaml        </span></span>
<span class="line"><span style="color:#24292e;">            path: config.yaml</span></span>
<span class="line"><span style="color:#24292e;">            mode: 0644</span></span></code></pre></div><h2 id="_4-2-configmap" tabindex="-1">4.2 configmap <a class="header-anchor" href="#_4-2-configmap" aria-label="Permalink to &quot;4.2 configmap&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">apiVersion: v1</span></span>
<span class="line"><span style="color:#e1e4e8;">data:</span></span>
<span class="line"><span style="color:#e1e4e8;">  config.yaml: |</span></span>
<span class="line"><span style="color:#e1e4e8;">    # project settings</span></span>
<span class="line"><span style="color:#e1e4e8;">    DEFAULT_CONF:</span></span>
<span class="line"><span style="color:#e1e4e8;">      port: 8888 </span></span>
<span class="line"><span style="color:#e1e4e8;">    UNITTEST_TENCENT_ZONE: ap-chongqing-1</span></span>
<span class="line"><span style="color:#e1e4e8;">kind: ConfigMap</span></span>
<span class="line"><span style="color:#e1e4e8;">metadata:</span></span>
<span class="line"><span style="color:#e1e4e8;">  name: nginx-cm</span></span>
<span class="line"><span style="color:#e1e4e8;">  annotations:</span></span>
<span class="line"><span style="color:#e1e4e8;">    reloader.stakater.com/match: &quot;true&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">apiVersion: v1</span></span>
<span class="line"><span style="color:#24292e;">data:</span></span>
<span class="line"><span style="color:#24292e;">  config.yaml: |</span></span>
<span class="line"><span style="color:#24292e;">    # project settings</span></span>
<span class="line"><span style="color:#24292e;">    DEFAULT_CONF:</span></span>
<span class="line"><span style="color:#24292e;">      port: 8888 </span></span>
<span class="line"><span style="color:#24292e;">    UNITTEST_TENCENT_ZONE: ap-chongqing-1</span></span>
<span class="line"><span style="color:#24292e;">kind: ConfigMap</span></span>
<span class="line"><span style="color:#24292e;">metadata:</span></span>
<span class="line"><span style="color:#24292e;">  name: nginx-cm</span></span>
<span class="line"><span style="color:#24292e;">  annotations:</span></span>
<span class="line"><span style="color:#24292e;">    reloader.stakater.com/match: &quot;true&quot;</span></span></code></pre></div><h2 id="_4-3-测试" tabindex="-1">4.3 测试 <a class="header-anchor" href="#_4-3-测试" aria-label="Permalink to &quot;4.3 测试&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ kubectl  get pod</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME                     READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx-68c9bf4ff7-9gmg6   1/1     Running   0          10m</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ kubectl  get cm</span></span>
<span class="line"><span style="color:#e1e4e8;">NAME       DATA   AGE</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx-cm   1      28m</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 更新cm内容</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">$ kubectl edit cm nginx-cm </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">configmap/nginx-cm edited</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看po发生了滚动更新，重新加载配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">$ kubectl get pod</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">NAME                     READY   STATUS              RESTARTS   AGE</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx-66c758b548-9dllm   0/1     ContainerCreating   0          4s</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx-68c9bf4ff7-9gmg6   1/1     Running             0          10m</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ kubectl  get pod</span></span>
<span class="line"><span style="color:#24292e;">NAME                     READY   STATUS    RESTARTS   AGE</span></span>
<span class="line"><span style="color:#24292e;">nginx-68c9bf4ff7-9gmg6   1/1     Running   0          10m</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ kubectl  get cm</span></span>
<span class="line"><span style="color:#24292e;">NAME       DATA   AGE</span></span>
<span class="line"><span style="color:#24292e;">nginx-cm   1      28m</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 更新cm内容</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">$ kubectl edit cm nginx-cm </span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">configmap/nginx-cm edited</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看po发生了滚动更新，重新加载配置文件</span></span>
<span class="line"><span style="color:#24292e;">$ kubectl get pod</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">NAME                     READY   STATUS              RESTARTS   AGE</span></span>
<span class="line"><span style="color:#24292e;">nginx-66c758b548-9dllm   0/1     ContainerCreating   0          4s</span></span>
<span class="line"><span style="color:#24292e;">nginx-68c9bf4ff7-9gmg6   1/1     Running             0          10m</span></span></code></pre></div><h1 id="五-reloader-使用注意事项" tabindex="-1">五. Reloader 使用注意事项 <a class="header-anchor" href="#五-reloader-使用注意事项" aria-label="Permalink to &quot;五. Reloader 使用注意事项&quot;">​</a></h1><ul><li>Reloader 为全局资源对象，建议部署在一个公共服务的ns下，然后其他ns也可以正常使用reloader特性。</li><li>Reloader.stakater.com/auto : 如果配置configmap或者secret在 deploymentconfigmap/deployment/daemonsets/Statefulsets</li><li>secret.reloader.stakater.com/reload 或者 configmap.reloader.stakater.com/reload 注释中被使用，那么 true 只会重新加载 pod，不管使用的是 configmap 还是 secret。</li><li>reloader.stakater.com/search 和 reloader.stakater.com/auto 不能同时使用。如果你在你的部署上有一个 reloader.stakater.com/auto : “true”的注释，那么它总是会在你修改了 configmaps 或者使用了机密之后重新启动，不管他们是否有 reloader.stakater.com/match : “true”的注释。</li></ul><h1 id="六-总结" tabindex="-1">六. 总结 <a class="header-anchor" href="#六-总结" aria-label="Permalink to &quot;六. 总结&quot;">​</a></h1><p>Reloader通过 watch ConfigMap 和 Secret，一旦发现对象更新，就自动触发对 Deployment 或 StatefulSet 等工作负载对象进行滚动升级。</p><p>如果我们的应用内部没有去实时监控配置文件，利用该方式可以非常方便的实现配置的热更新。</p>`,54),o=[p];function t(c,r,i,d,y,m){return a(),e("div",null,o)}const g=s(l,[["render",t]]);export{h as __pageData,g as default};
