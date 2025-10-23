import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"1. Helm流程控制","description":"","frontmatter":{},"headers":[],"relativePath":"guide/container/k8s/Helm/3-Helm-流程控制.md","filePath":"guide/container/k8s/Helm/3-Helm-流程控制.md","lastUpdated":1737367865000}'),p={name:"guide/container/k8s/Helm/3-Helm-流程控制.md"},o=l(`<h1 id="_1-helm流程控制" tabindex="-1">1. Helm流程控制 <a class="header-anchor" href="#_1-helm流程控制" aria-label="Permalink to &quot;1. Helm流程控制&quot;">​</a></h1><h2 id="_1-1-运算符" tabindex="-1">1.1 运算符 <a class="header-anchor" href="#_1-1-运算符" aria-label="Permalink to &quot;1.1 运算符&quot;">​</a></h2><table><thead><tr><th>运算符</th><th>作用</th></tr></thead><tbody><tr><td>eq</td><td>等于（equal to）</td></tr><tr><td>ne</td><td>不等于（not equal to）</td></tr><tr><td>lt</td><td>小于（less than）</td></tr><tr><td>le</td><td>小于等于（less than or equal to）</td></tr><tr><td>gt</td><td>大于（greater than）</td></tr><tr><td>ge</td><td>大于等于（greater than or equal to）</td></tr></tbody></table><h2 id="_1-2-if-else-条件块" tabindex="-1">1.2 if/else 条件块 <a class="header-anchor" href="#_1-2-if-else-条件块" aria-label="Permalink to &quot;1.2 if/else 条件块&quot;">​</a></h2><ul><li>语法</li></ul><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407091721881.png" alt="image-20240709172058586"></p><p>如果值为如下情况，则if条件评估为 false</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">一个布尔型的假</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">一个数字零</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">一个空的字符串</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">一个</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nil（空或</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">null）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">一个空的集合（map，slice，tuple，dict，array）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">一个布尔型的假</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">一个数字零</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">一个空的字符串</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">一个</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nil（空或</span><span style="color:#24292E;"> </span><span style="color:#032F62;">null）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">一个空的集合（map，slice，tuple，dict，array）</span></span></code></pre></div><p>例子:</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407091721171.png" alt="image-20240709172126263"></p><p>上面配置是基于同一个pod 部署两个容器，一个是应用一个是nginx 的配置的通用模板。 也就是说默认是关闭nginx 配置的，如果启用可以通过--set nginx.enabled=true 方式。</p><div class="warning custom-block"><p class="custom-block-title">💡 说明</p><p>当模板引擎运行时，它会删除 <img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407091731667.png" alt="image-20240709173149693"> 中的内容，但保留其余空白,如下方式删除空行</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202407091723419.png" alt="image-20240709172340334"> 花括号里面的中横行“-” 的用途是清除helm 渲染后的yml 文件里面的空行，由于像if 判断这些语句不是k8s里面yml 文件里的配置信息，所以渲染后的yml 文件中if 等语句的位置会产生空行，所以加上“-”就会清除空行</p><p>谨慎使用：如： -}} ,这将会把如上的结果生成在同一行,因为它消除了两边的换行符.</p></div><h2 id="_1-3-with-指定范围" tabindex="-1">1.3 with 指定范围 <a class="header-anchor" href="#_1-3-with-指定范围" aria-label="Permalink to &quot;1.3 with 指定范围&quot;">​</a></h2><ul><li>定义</li></ul><p><strong>with作用域</strong>,用来控制变量范围。回想一下，<code>.</code>是对 <em>当前作用域</em> 的引用。因此 <code>.Values</code>就是告诉模板在当前作用域查找<code>Values</code>对象。</p><p><code>with</code>语句块内不能再 <code>.Release.Name</code>对象，否则报错</p><ul><li>语法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{{ with PIPELINE }}</span></span>
<span class="line"><span style="color:#e1e4e8;">  # restricted scope</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{{ with PIPELINE }}</span></span>
<span class="line"><span style="color:#24292e;">  # restricted scope</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span></code></pre></div><ul><li>案例</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.Release.Name</span><span style="color:#E1E4E8;">}}</span><span style="color:#9ECBFF;">-configmap</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">myvalue</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">with .Values.favorite</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">drink</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.drink | default &quot;tea&quot; | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">food</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.food | upper | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">注意，现在我们可以引用 .drink 和 .food 无需对其进行限定。这是因为该 with 声明设置 . 为指向 .Values.favorite。在 {{end}} 后 . 复位其先前的范围。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">但是请注意！在受限范围内，此时将无法从父范围访问其他对象。例如，下面会报错：</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">with .Values.favorite</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">drink</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.drink | default &quot;tea&quot; | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">food</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.food | upper | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">release</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.Release.Name</span><span style="color:#E1E4E8;">}}    </span><span style="color:#6A737D;">#此处报错</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">解决方式：</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">$releaseName := .Release.Name -</span><span style="color:#E1E4E8;">}}　　　　　　#</span><span style="color:#9ECBFF;">在with区域外定义要引入的值，在里面再通过变量引入</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">with .Values.favorite</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">drink</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.drink | default &quot;tea&quot; | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">food</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.food | upper | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#85E89D;">release</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">$releaseName</span><span style="color:#E1E4E8;"> }}    　　　　　　　　  </span><span style="color:#6A737D;">#通过定义的变量引入</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.Release.Name</span><span style="color:#24292E;">}}</span><span style="color:#032F62;">-configmap</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">myvalue</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">with .Values.favorite</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">drink</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.drink | default &quot;tea&quot; | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">food</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.food | upper | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">注意，现在我们可以引用 .drink 和 .food 无需对其进行限定。这是因为该 with 声明设置 . 为指向 .Values.favorite。在 {{end}} 后 . 复位其先前的范围。</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">但是请注意！在受限范围内，此时将无法从父范围访问其他对象。例如，下面会报错：</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">with .Values.favorite</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">drink</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.drink | default &quot;tea&quot; | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">food</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.food | upper | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">release</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.Release.Name</span><span style="color:#24292E;">}}    </span><span style="color:#6A737D;">#此处报错</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">解决方式：</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">$releaseName := .Release.Name -</span><span style="color:#24292E;">}}　　　　　　#</span><span style="color:#032F62;">在with区域外定义要引入的值，在里面再通过变量引入</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">with .Values.favorite</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">drink</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.drink | default &quot;tea&quot; | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">food</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.food | upper | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#22863A;">release</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">$releaseName</span><span style="color:#24292E;"> }}    　　　　　　　　  </span><span style="color:#6A737D;">#通过定义的变量引入</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span></code></pre></div><h2 id="_1-4-range-循环块" tabindex="-1">1.4 range 循环块 <a class="header-anchor" href="#_1-4-range-循环块" aria-label="Permalink to &quot;1.4 range 循环块&quot;">​</a></h2><ul><li>定义</li></ul><p>Helm 的模板语言中，遍历集合的方式是使用 range 操作(类似for)</p><ul><li>语法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">{{ range PIPELINE }}</span></span>
<span class="line"><span style="color:#e1e4e8;">  # restricted scope</span></span>
<span class="line"><span style="color:#e1e4e8;">{{ end }}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">{{ range PIPELINE }}</span></span>
<span class="line"><span style="color:#24292e;">  # restricted scope</span></span>
<span class="line"><span style="color:#24292e;">{{ end }}</span></span></code></pre></div><ul><li>案例</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">cat values.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">favorite</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">drink</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">coffee</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">food</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">pizza</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">pizzaToppings</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">mushrooms</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">cheese</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">peppers</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#9ECBFF;">onions</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">将这个列表打印到我们的 ConfigMap 中：</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">cat templates/configmap.yaml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.Release.Name</span><span style="color:#E1E4E8;">}}</span><span style="color:#9ECBFF;">-configmap</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">myvalue</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  {{- </span><span style="color:#9ECBFF;">with .Values.favorite</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">drink</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.drink | default &quot;tea&quot; | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">food</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.food | upper | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  {{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">toppings</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span><span style="color:#FDAEB7;font-style:italic;">    　　　　　　　　　　　　　　　　　　　　    #因为此处要引入的是多行字符串，所以通过&quot;|-&quot;方式 </span></span>
<span class="line"><span style="color:#9ECBFF;">  {{- range .Values.pizzaToppings}}</span></span>
<span class="line"><span style="color:#9ECBFF;">    - {{. | title | quote}}　　　　　　　　　　　　　　　#&quot;.&quot; 就是循环的对象中的单个元素，由此可见range也具有with 一样的功能，可以限定范围。</span></span>
<span class="line"><span style="color:#9ECBFF;">  {{- end}}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">循环自建的元祖</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">　　</span><span style="color:#9ECBFF;">有时能快速在模板中创建一个列表，然后遍历该列表是很有用的。Helm 模板有一个功能可以使这个变得简单：tuple。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">sizes</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">  {{- range tuple &quot;small&quot; &quot;medium&quot; &quot;large&quot;}}</span></span>
<span class="line"><span style="color:#9ECBFF;">  - {{.}}</span></span>
<span class="line"><span style="color:#9ECBFF;">  {{- end}}</span></span>
<span class="line"><span style="color:#9ECBFF;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> {{</span><span style="color:#9ECBFF;">/*输出如下*/</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">sizes</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">    - small</span></span>
<span class="line"><span style="color:#9ECBFF;">    - medium</span></span>
<span class="line"><span style="color:#9ECBFF;">    - large</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">用于类似列表的对象以同时捕获索引和值：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">toppings</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|-</span></span>
<span class="line"><span style="color:#9ECBFF;">  {{- range $index, $topping := .Values.pizzaToppings}}</span></span>
<span class="line"><span style="color:#9ECBFF;">  {{$index}}: {{ $topping }}</span></span>
<span class="line"><span style="color:#9ECBFF;">  {{- end}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">　</span><span style="color:#9ECBFF;">注意，range 首先是变量，然后是赋值运算符，然后是列表。这将分配整数索引（从零开始）给 $index，值给 $topping。运行它将产生：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">对于同时具有键和值的数据结构，我们可以使用 range 来获得两者</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.Release.Name</span><span style="color:#E1E4E8;">}}</span><span style="color:#9ECBFF;">-configmap</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">myvalue</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{- </span><span style="color:#9ECBFF;">range $key</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">$val := .Values.favorite</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{</span><span style="color:#9ECBFF;">$key</span><span style="color:#E1E4E8;">}}: {{ </span><span style="color:#9ECBFF;">$val | quote</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">#favorite 定义在 values.yaml中，如上文所示。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">cat values.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">favorite</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">drink</span><span style="color:#24292E;">: </span><span style="color:#032F62;">coffee</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">food</span><span style="color:#24292E;">: </span><span style="color:#032F62;">pizza</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">pizzaToppings</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">mushrooms</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">cheese</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">peppers</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#032F62;">onions</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">将这个列表打印到我们的 ConfigMap 中：</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">cat templates/configmap.yaml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.Release.Name</span><span style="color:#24292E;">}}</span><span style="color:#032F62;">-configmap</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">myvalue</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#24292E;">  {{- </span><span style="color:#032F62;">with .Values.favorite</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">drink</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.drink | default &quot;tea&quot; | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">food</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.food | upper | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">  {{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">toppings</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span><span style="color:#B31D28;font-style:italic;">    　　　　　　　　　　　　　　　　　　　　    #因为此处要引入的是多行字符串，所以通过&quot;|-&quot;方式 </span></span>
<span class="line"><span style="color:#032F62;">  {{- range .Values.pizzaToppings}}</span></span>
<span class="line"><span style="color:#032F62;">    - {{. | title | quote}}　　　　　　　　　　　　　　　#&quot;.&quot; 就是循环的对象中的单个元素，由此可见range也具有with 一样的功能，可以限定范围。</span></span>
<span class="line"><span style="color:#032F62;">  {{- end}}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">循环自建的元祖</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">　　</span><span style="color:#032F62;">有时能快速在模板中创建一个列表，然后遍历该列表是很有用的。Helm 模板有一个功能可以使这个变得简单：tuple。</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">sizes</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">  {{- range tuple &quot;small&quot; &quot;medium&quot; &quot;large&quot;}}</span></span>
<span class="line"><span style="color:#032F62;">  - {{.}}</span></span>
<span class="line"><span style="color:#032F62;">  {{- end}}</span></span>
<span class="line"><span style="color:#032F62;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> {{</span><span style="color:#032F62;">/*输出如下*/</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">sizes</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">    - small</span></span>
<span class="line"><span style="color:#032F62;">    - medium</span></span>
<span class="line"><span style="color:#032F62;">    - large</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">用于类似列表的对象以同时捕获索引和值：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">toppings</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|-</span></span>
<span class="line"><span style="color:#032F62;">  {{- range $index, $topping := .Values.pizzaToppings}}</span></span>
<span class="line"><span style="color:#032F62;">  {{$index}}: {{ $topping }}</span></span>
<span class="line"><span style="color:#032F62;">  {{- end}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">　</span><span style="color:#032F62;">注意，range 首先是变量，然后是赋值运算符，然后是列表。这将分配整数索引（从零开始）给 $index，值给 $topping。运行它将产生：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">对于同时具有键和值的数据结构，我们可以使用 range 来获得两者</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.Release.Name</span><span style="color:#24292E;">}}</span><span style="color:#032F62;">-configmap</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">myvalue</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#24292E;">    {{- </span><span style="color:#032F62;">range $key</span><span style="color:#24292E;">, </span><span style="color:#032F62;">$val := .Values.favorite</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">    {{</span><span style="color:#032F62;">$key</span><span style="color:#24292E;">}}: {{ </span><span style="color:#032F62;">$val | quote</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">    {{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">#favorite 定义在 values.yaml中，如上文所示。</span></span></code></pre></div><h2 id="_1-5-变量" tabindex="-1">1.5 变量 <a class="header-anchor" href="#_1-5-变量" aria-label="Permalink to &quot;1.5 变量&quot;">​</a></h2><ul><li>定义</li></ul><p>Helm模板中，变量是对另一个对象的命名引用。遵循<code>$name</code>变量的格式且指定了一个特殊的赋值运算符：<code>:=</code></p><p><code>变量通常不是 “全局” 的。它们的范围是它们所在的块</code></p><ul><li>案例</li></ul><p>这段代码会失败</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">with .Values.favorite</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">drink</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.drink | default &quot;tea&quot; | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">food</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.food | upper | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">release</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.Release.Name</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">Release.Name 不在该 with 块中限制的范围内。解决范围问题的一种方法是将对象分配给可以在不考虑当前范围的情况下访问的变量。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">with .Values.favorite</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">drink</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.drink | default &quot;tea&quot; | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">food</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.food | upper | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">release</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.Release.Name</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">Release.Name 不在该 with 块中限制的范围内。解决范围问题的一种方法是将对象分配给可以在不考虑当前范围的情况下访问的变量。</span></span></code></pre></div><p>使用变量重写上面的 Release.Name</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">v1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ConfigMap</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.Release.Name</span><span style="color:#E1E4E8;">}}</span><span style="color:#9ECBFF;">-configmap</span></span>
<span class="line"><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">myvalue</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">$relname := .Release.Name -</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">with .Values.favorite</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">drink</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.drink | default &quot;tea&quot; | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">food</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">.food | upper | quote</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">release</span><span style="color:#E1E4E8;">: {{</span><span style="color:#9ECBFF;">$relname</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">注意，在我们开始 with 块之前，我们赋值 $relname :=.Release.Name。现在在 with 块内部，$relname 变量仍然指向发布名称。因为变量不受with 范围限制。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">v1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ConfigMap</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.Release.Name</span><span style="color:#24292E;">}}</span><span style="color:#032F62;">-configmap</span></span>
<span class="line"><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">myvalue</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Hello World&quot;</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">$relname := .Release.Name -</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">with .Values.favorite</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">drink</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.drink | default &quot;tea&quot; | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">food</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">.food | upper | quote</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">release</span><span style="color:#24292E;">: {{</span><span style="color:#032F62;">$relname</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;">}}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">注意，在我们开始 with 块之前，我们赋值 $relname :=.Release.Name。现在在 with 块内部，$relname 变量仍然指向发布名称。因为变量不受with 范围限制。</span></span></code></pre></div><h2 id="_1-6-命名模板" tabindex="-1">1.6 命名模板 <a class="header-anchor" href="#_1-6-命名模板" aria-label="Permalink to &quot;1.6 命名模板&quot;">​</a></h2><p><a href="https://helm.sh/zh/docs/chart_template_guide/named_templates/" target="_blank" rel="noreferrer">模版</a></p><div class="danger custom-block"><p class="custom-block-title">❌ 注意</p><p>在命名模板时要注意一个重要的细节：模板名称是全局的。如果声明两个具有相同名称的模板，则最后加载一个模板是起作用的模板。</p></div><h3 id="define定义命名模板" tabindex="-1">define定义命名模板 <a class="header-anchor" href="#define定义命名模板" aria-label="Permalink to &quot;define定义命名模板&quot;">​</a></h3><p>可以在/templates/*.yaml 文件中定义命名模板也可以在/templates/_helpers.tpl 定义</p><h3 id="template-include-使用命名模板" tabindex="-1">template/include 使用命名模板 <a class="header-anchor" href="#template-include-使用命名模板" aria-label="Permalink to &quot;template/include 使用命名模板&quot;">​</a></h3><p><strong>include与template 区别</strong></p><p>include 是可以替代template 的更高级的用法，可以增加<code>缩进</code>功能。</p><p>例如创建一个configmap 它的lable 和 data 下面的数据缩进是不同的，lable 缩进在metadata 下面，所以lable 下面的数据是相比于顶格是缩进四个空格。data 本身就是顶格写的，它下面的数据缩进两个空格即可</p><p>define 定义的命名模板内容如果同时引入到lable 和 data 下面，那么相同的内容但是缩进不同，如果直接用template 引入那么就会原模原样引入不缩进而是顶格引入到yaml 中</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">这样不符合configmap 的定义语法可能不报错但是不会生效这两部分内容，</span></span>
<span class="line"><span style="color:#9ECBFF;">即使在模本文件中缩进引用{{- template &quot;mychart.labels&quot; . }},依然不生效，</span></span>
<span class="line"><span style="color:#9ECBFF;">所以在引入过程中需要增加空格所以include 可以替代template 增加空格，语法为：{{- include &quot;mychart.labels&quot; .| indent 4 }} 数字4表示缩进几个空格</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">这样不符合configmap 的定义语法可能不报错但是不会生效这两部分内容，</span></span>
<span class="line"><span style="color:#032F62;">即使在模本文件中缩进引用{{- template &quot;mychart.labels&quot; . }},依然不生效，</span></span>
<span class="line"><span style="color:#032F62;">所以在引入过程中需要增加空格所以include 可以替代template 增加空格，语法为：{{- include &quot;mychart.labels&quot; .| indent 4 }} 数字4表示缩进几个空格</span></span></code></pre></div><ul><li>案例</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">cat _helpers.tpl</span></span>
<span class="line"><span style="color:#E1E4E8;">  {{</span><span style="color:#9ECBFF;">/* 生成基本的资源配置 */</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  {{- </span><span style="color:#9ECBFF;">define &quot;resources&quot;</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  {{- </span><span style="color:#9ECBFF;">with .Values.resources</span><span style="color:#E1E4E8;">}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">limits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">.limits.cpu</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">.limits.memory</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">requests</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">cpu</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">.requests.cpu</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">memory</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">.requests.memory</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">   {{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">   {{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">cat templates/deployment.yaml</span></span>
<span class="line"><span style="color:#B392F0;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">.Release.Name</span><span style="color:#E1E4E8;"> }}</span><span style="color:#9ECBFF;">-nginx</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">.Values.image.repository</span><span style="color:#E1E4E8;"> }}</span><span style="color:#9ECBFF;">/nginx-qa:{{ .Values.image.tagn }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">imagePullPolicy</span><span style="color:#E1E4E8;">: {{ </span><span style="color:#9ECBFF;">.Values.image.pullPolicy</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">containerPort</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">80</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">TCP</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">resources</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{- </span><span style="color:#9ECBFF;">include &quot;resources&quot; .| indent 10</span><span style="color:#E1E4E8;"> }}            </span><span style="color:#6A737D;">#在此处通过命名模板名字引用</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">nginx-config</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/nginx/conf.d</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">cat _helpers.tpl</span></span>
<span class="line"><span style="color:#24292E;">  {{</span><span style="color:#032F62;">/* 生成基本的资源配置 */</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">  {{- </span><span style="color:#032F62;">define &quot;resources&quot;</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">  {{- </span><span style="color:#032F62;">with .Values.resources</span><span style="color:#24292E;">}}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">limits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">.limits.cpu</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">.limits.memory</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">requests</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">cpu</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">.requests.cpu</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">memory</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">.requests.memory</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">   {{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">   {{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">cat templates/deployment.yaml</span></span>
<span class="line"><span style="color:#6F42C1;">...</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">.Release.Name</span><span style="color:#24292E;"> }}</span><span style="color:#032F62;">-nginx</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">.Values.image.repository</span><span style="color:#24292E;"> }}</span><span style="color:#032F62;">/nginx-qa:{{ .Values.image.tagn }}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">imagePullPolicy</span><span style="color:#24292E;">: {{ </span><span style="color:#032F62;">.Values.image.pullPolicy</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">containerPort</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">80</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">TCP</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">resources</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    {{- </span><span style="color:#032F62;">include &quot;resources&quot; .| indent 10</span><span style="color:#24292E;"> }}            </span><span style="color:#6A737D;">#在此处通过命名模板名字引用</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">nginx-config</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/nginx/conf.d</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span></code></pre></div><h2 id="_1-7-模板中" tabindex="-1">1.7 模板中&quot;-&quot; <a class="header-anchor" href="#_1-7-模板中" aria-label="Permalink to &quot;1.7 模板中&quot;-&quot;&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">示例一</span></span>
<span class="line"><span style="color:#B392F0;">...</span></span>
<span class="line"><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: {{- </span><span style="color:#9ECBFF;">Values.name -</span><span style="color:#E1E4E8;">}}　#</span><span style="color:#9ECBFF;">话括号里面的横线左边的会删除括号左边的空格，右边的会删除右边的空格，在此处一般不加这俩“-”</span></span>
<span class="line"><span style="color:#B392F0;">...</span></span>
<span class="line"><span style="color:#9ECBFF;">示例二</span></span>
<span class="line"><span style="color:#B392F0;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">{{</span><span style="color:#9ECBFF;">-if Values.nginx.enable</span><span style="color:#E1E4E8;"> }}　#</span><span style="color:#9ECBFF;">此处作用就是删除if 和 end 逻辑语句所占的空行，因为这些流程控制语句不会渲染成实际的yaml 配置，默认保留空行再yaml 文件中，所以需要用“-”删除</span></span>
<span class="line"><span style="color:#B392F0;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">{{- </span><span style="color:#9ECBFF;">end</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#B392F0;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">示例一</span></span>
<span class="line"><span style="color:#6F42C1;">...</span></span>
<span class="line"><span style="color:#22863A;">name</span><span style="color:#24292E;">: {{- </span><span style="color:#032F62;">Values.name -</span><span style="color:#24292E;">}}　#</span><span style="color:#032F62;">话括号里面的横线左边的会删除括号左边的空格，右边的会删除右边的空格，在此处一般不加这俩“-”</span></span>
<span class="line"><span style="color:#6F42C1;">...</span></span>
<span class="line"><span style="color:#032F62;">示例二</span></span>
<span class="line"><span style="color:#6F42C1;">...</span></span>
<span class="line"><span style="color:#24292E;">{{</span><span style="color:#032F62;">-if Values.nginx.enable</span><span style="color:#24292E;"> }}　#</span><span style="color:#032F62;">此处作用就是删除if 和 end 逻辑语句所占的空行，因为这些流程控制语句不会渲染成实际的yaml 配置，默认保留空行再yaml 文件中，所以需要用“-”删除</span></span>
<span class="line"><span style="color:#6F42C1;">...</span></span>
<span class="line"><span style="color:#24292E;">{{- </span><span style="color:#032F62;">end</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#6F42C1;">...</span></span></code></pre></div><h2 id="_1-8-调试" tabindex="-1">1.8 调试 <a class="header-anchor" href="#_1-8-调试" aria-label="Permalink to &quot;1.8 调试&quot;">​</a></h2><p>Helm也提供了<code>--dry-run --debug</code>调试参数，帮助验证模板正确性。在执行helm install时候带上这两个参数就可以把对应的values值和渲染的资源清单打印出来，而不会真正的去部署一个release</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">helm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">web</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dry-run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/root/mychart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">helm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">web</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dry-run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/root/mychart</span></span></code></pre></div>`,54),e=[o];function c(t,r,E,y,i,d){return n(),a("div",null,e)}const m=s(p,[["render",c]]);export{u as __pageData,m as default};
