import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const C=JSON.parse('{"title":"1. RESTClient 简介","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/client-go/1-RESTClient.md","filePath":"guide/go/client-go/1-RESTClient.md","lastUpdated":1721805479000}'),l={name:"guide/go/client-go/1-RESTClient.md"},o=p(`<h1 id="_1-restclient-简介" tabindex="-1">1. RESTClient 简介 <a class="header-anchor" href="#_1-restclient-简介" aria-label="Permalink to &quot;1. RESTClient 简介&quot;">​</a></h1><p><code>RESTClient</code> 是 <code>client-go</code> 最基础的客户端，主要是对 <code>HTTP Reqeust</code> 进行了封装，对外提供 <code>RESTful</code> 风格的 <code>API</code> ，并且提供丰富的 <code>API</code> 用于各种设置，相比其他几种客户端虽然更复杂，但是也更为灵活。</p><p>使用 <code>RESTClient</code> 对 <code>kubernetes</code> 的资源进行增删改查的基本步骤如下：</p><ol><li>确定要操作的资源类型(例如查找 <code>deployment</code> 列表)，去官方API文档中找到对于的 <code>path</code> 、数据结构等信息，后面会用到。</li><li>加载配置 <code>kubernetes</code> 配置文件（和 <code>kubectl</code> 使用的那种 <code>kubeconfig</code> 完全相同）。</li><li>根据配置文件生成配置对象，并且通过API对配置对象就行设置（例如请求的 <code>path</code>、<code>Group</code>、<code>Version</code>、序列化反序列化工具等）。</li><li>创建 <code>RESTClient</code> 实例，入参是配置对象。</li><li>调用 <code>RESTClient</code> 实例的方法向 <code>kubernetes</code> 的 <code>API Server</code> 发起请求，编码用 <code>fluent</code> 风格将各种参数传入(例如指定 <code>namespace</code>、资源等)，如果是查询类请求，还要传入数据结构实例的指针，改数据结构用于接受 <code>kubernetes</code> 返回的查询结果</li></ol><h1 id="_2-restclient-编码" tabindex="-1">2. RESTClient 编码 <a class="header-anchor" href="#_2-restclient-编码" aria-label="Permalink to &quot;2. RESTClient 编码&quot;">​</a></h1><p>touch main.go</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">context</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">flag</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">k8s.io/client-go/kubernetes/scheme</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">k8s.io/client-go/rest</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">k8s.io/client-go/tools/clientcmd</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">k8s.io/client-go/util/homedir</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">corev1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">k8s.io/api/core/v1</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">metav1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">k8s.io/apimachinery/pkg/apis/meta/v1</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">path/filepath</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> kubeconfig </span><span style="color:#F97583;">*</span><span style="color:#F97583;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// home是家目录，如果能取得家目录的值，就可以用来做默认值</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> home</span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;">homedir.</span><span style="color:#79B8FF;">HomeDir</span><span style="color:#E1E4E8;">(); home </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 如果输入了kubeconfig参数，该参数的值就是kubeconfig文件的绝对路径，</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 如果没有输入kubeconfig参数，就用默认路径~/.kube/config</span></span>
<span class="line"><span style="color:#E1E4E8;">		kubeconfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> flag.</span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;kubeconfig&quot;</span><span style="color:#E1E4E8;">, filepath.</span><span style="color:#79B8FF;">Join</span><span style="color:#E1E4E8;">(home, </span><span style="color:#9ECBFF;">&quot;.kube&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;config&quot;</span><span style="color:#E1E4E8;">), </span><span style="color:#9ECBFF;">&quot;(optional) absolute path to the kubeconfig file&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 如果取不到当前用户的家目录，就没办法设置kubeconfig的默认目录了，只能从入参中取</span></span>
<span class="line"><span style="color:#E1E4E8;">		kubeconfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> flag.</span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;kubeconfig&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;absolute path to the kubeconfig file&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	flag.</span><span style="color:#79B8FF;">Parse</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 从本机加载kubeconfig配置文件，因此第一个参数为空字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">	config, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> clientcmd.</span><span style="color:#79B8FF;">BuildConfigFromFlags</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">kubeconfig)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// kubeconfig加载失败就直接退出了</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">panic</span><span style="color:#E1E4E8;">(err.</span><span style="color:#79B8FF;">Error</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 参考path : /api/v1/namespaces/{namespace}/pods</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.APIPath </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;api&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// pod的group是空字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.GroupVersion </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">corev1.SchemeGroupVersion</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 指定序列化工具</span></span>
<span class="line"><span style="color:#E1E4E8;">	config.NegotiatedSerializer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scheme.Codecs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 根据配置信息构建restClient实例</span></span>
<span class="line"><span style="color:#E1E4E8;">	restClient, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> rest.</span><span style="color:#79B8FF;">RESTClientFor</span><span style="color:#E1E4E8;">(config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err</span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">panic</span><span style="color:#E1E4E8;">(err.</span><span style="color:#79B8FF;">Error</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 保存pod结果的数据结构实例</span></span>
<span class="line"><span style="color:#E1E4E8;">	result </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">corev1.PodList{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//  指定namespace</span></span>
<span class="line"><span style="color:#E1E4E8;">	namespace </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;kube-system&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 设置请求参数，然后发起请求</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// GET请求</span></span>
<span class="line"><span style="color:#E1E4E8;">	err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> restClient.</span><span style="color:#79B8FF;">Get</span><span style="color:#E1E4E8;">().</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">//  指定namespace，参考path : /api/v1/namespaces/{namespace}/pods</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">Namespace</span><span style="color:#E1E4E8;">(namespace).</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 查找多个pod，参考path : /api/v1/namespaces/{namespace}/pods</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">Resource</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;pods&quot;</span><span style="color:#E1E4E8;">).</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 指定大小限制和序列化工具</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">VersionedParams</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">metav1.ListOptions{Limit:</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">}, scheme.ParameterCodec).</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 请求</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">Do</span><span style="color:#E1E4E8;">(context.</span><span style="color:#79B8FF;">TODO</span><span style="color:#E1E4E8;">()).</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// 结果存入result</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">Into</span><span style="color:#E1E4E8;">(result)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">panic</span><span style="color:#E1E4E8;">(err.</span><span style="color:#79B8FF;">Error</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 表头</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;namespace</span><span style="color:#79B8FF;">\\t</span><span style="color:#9ECBFF;"> status</span><span style="color:#79B8FF;">\\t\\t</span><span style="color:#9ECBFF;"> name</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 每个pod都打印namespace、status.Phase、name三个字段</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, d </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> result.Items {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%v\\t</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">%v\\t</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">%v\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">			d.Namespace,</span></span>
<span class="line"><span style="color:#E1E4E8;">			d.Status.Phase,</span></span>
<span class="line"><span style="color:#E1E4E8;">			d.Name)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">context</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">flag</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">k8s.io/client-go/kubernetes/scheme</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">k8s.io/client-go/rest</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">k8s.io/client-go/tools/clientcmd</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">k8s.io/client-go/util/homedir</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">corev1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">k8s.io/api/core/v1</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">metav1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">k8s.io/apimachinery/pkg/apis/meta/v1</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">path/filepath</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> kubeconfig </span><span style="color:#D73A49;">*</span><span style="color:#D73A49;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// home是家目录，如果能取得家目录的值，就可以用来做默认值</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> home</span><span style="color:#D73A49;">:=</span><span style="color:#24292E;">homedir.</span><span style="color:#005CC5;">HomeDir</span><span style="color:#24292E;">(); home </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 如果输入了kubeconfig参数，该参数的值就是kubeconfig文件的绝对路径，</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 如果没有输入kubeconfig参数，就用默认路径~/.kube/config</span></span>
<span class="line"><span style="color:#24292E;">		kubeconfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> flag.</span><span style="color:#005CC5;">String</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;kubeconfig&quot;</span><span style="color:#24292E;">, filepath.</span><span style="color:#005CC5;">Join</span><span style="color:#24292E;">(home, </span><span style="color:#032F62;">&quot;.kube&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;config&quot;</span><span style="color:#24292E;">), </span><span style="color:#032F62;">&quot;(optional) absolute path to the kubeconfig file&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 如果取不到当前用户的家目录，就没办法设置kubeconfig的默认目录了，只能从入参中取</span></span>
<span class="line"><span style="color:#24292E;">		kubeconfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> flag.</span><span style="color:#005CC5;">String</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;kubeconfig&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;absolute path to the kubeconfig file&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	flag.</span><span style="color:#005CC5;">Parse</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 从本机加载kubeconfig配置文件，因此第一个参数为空字符串</span></span>
<span class="line"><span style="color:#24292E;">	config, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> clientcmd.</span><span style="color:#005CC5;">BuildConfigFromFlags</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">kubeconfig)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// kubeconfig加载失败就直接退出了</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">panic</span><span style="color:#24292E;">(err.</span><span style="color:#005CC5;">Error</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 参考path : /api/v1/namespaces/{namespace}/pods</span></span>
<span class="line"><span style="color:#24292E;">	config.APIPath </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;api&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// pod的group是空字符串</span></span>
<span class="line"><span style="color:#24292E;">	config.GroupVersion </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">corev1.SchemeGroupVersion</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 指定序列化工具</span></span>
<span class="line"><span style="color:#24292E;">	config.NegotiatedSerializer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scheme.Codecs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 根据配置信息构建restClient实例</span></span>
<span class="line"><span style="color:#24292E;">	restClient, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> rest.</span><span style="color:#005CC5;">RESTClientFor</span><span style="color:#24292E;">(config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err</span><span style="color:#D73A49;">!=</span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">panic</span><span style="color:#24292E;">(err.</span><span style="color:#005CC5;">Error</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 保存pod结果的数据结构实例</span></span>
<span class="line"><span style="color:#24292E;">	result </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">corev1.PodList{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//  指定namespace</span></span>
<span class="line"><span style="color:#24292E;">	namespace </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;kube-system&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 设置请求参数，然后发起请求</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// GET请求</span></span>
<span class="line"><span style="color:#24292E;">	err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> restClient.</span><span style="color:#005CC5;">Get</span><span style="color:#24292E;">().</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">//  指定namespace，参考path : /api/v1/namespaces/{namespace}/pods</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">Namespace</span><span style="color:#24292E;">(namespace).</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 查找多个pod，参考path : /api/v1/namespaces/{namespace}/pods</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">Resource</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;pods&quot;</span><span style="color:#24292E;">).</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 指定大小限制和序列化工具</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">VersionedParams</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">metav1.ListOptions{Limit:</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">}, scheme.ParameterCodec).</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 请求</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">Do</span><span style="color:#24292E;">(context.</span><span style="color:#005CC5;">TODO</span><span style="color:#24292E;">()).</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// 结果存入result</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">Into</span><span style="color:#24292E;">(result)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">panic</span><span style="color:#24292E;">(err.</span><span style="color:#005CC5;">Error</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 表头</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;namespace</span><span style="color:#005CC5;">\\t</span><span style="color:#032F62;"> status</span><span style="color:#005CC5;">\\t\\t</span><span style="color:#032F62;"> name</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 每个pod都打印namespace、status.Phase、name三个字段</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, d </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> result.Items {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%v\\t</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">%v\\t</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">%v\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">			d.Namespace,</span></span>
<span class="line"><span style="color:#24292E;">			d.Status.Phase,</span></span>
<span class="line"><span style="color:#24292E;">			d.Name)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><a href="https://isekiro.com/client-go%E7%AE%80%E5%8D%95%E6%95%99%E7%A8%8B%E4%B8%89-clientset/" target="_blank" rel="noreferrer">https://isekiro.com/client-go简单教程三-clientset/</a></p>`,8),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const d=s(l,[["render",t]]);export{C as __pageData,d as default};
