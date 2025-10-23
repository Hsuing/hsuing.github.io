import{_ as s,o as n,c as a,R as p}from"./chunks/framework.zUbWieqp.js";const l="/assets/sql.PZmO0NlS.jpg",h=JSON.parse('{"title":"一、如何在tengine/nginx层做ABtest","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/modules/6-fenliu.md","filePath":"guide/Linux/web/nginx/modules/6-fenliu.md","lastUpdated":1701928035000}'),o={name:"guide/Linux/web/nginx/modules/6-fenliu.md"},e=p('<h1 id="一、如何在tengine-nginx层做abtest" tabindex="-1">一、如何在tengine/nginx层做ABtest <a class="header-anchor" href="#一、如何在tengine-nginx层做abtest" aria-label="Permalink to &quot;一、如何在tengine/nginx层做ABtest&quot;">​</a></h1><p><strong>我们希望 分流解决方案将一部分流量分到新应用，另一部分流量分到老应用，且该流量是可以控制的</strong></p><p><strong>- 我们希望新老版本有明显的标识来区分用户命中的是新版还是老版(即打点)</strong></p><p><strong>- 假如“我们严谨的PD们”想要看AB对比数据，我们还要比较方便的从报表分区新老版命中</strong></p><p>上述三条其实基本构成了一个简易的AB系统，类似我们常用的buckettest、BTS等，当然 BTS此类实验平台还有一个比较完善的控制台来控制切流和报表汇总</p><p><img src="'+l+`" alt="依赖访问结构"></p><p>虚线是新版的访问路径，对于γ类型，如果要做ABtest，需要在上层vip/lvs层做，过于复杂，因此可以转化成β的结构，或者将B中的 新老应用层级交换一下。对于β形态，我们完全可以将老应用A 当成α形态中的老应用，因此我们只需对α形态进行讨论</p><h3 id="_1-思路一-通过发布批次控制切流节奏" tabindex="-1">1）思路一：通过发布批次控制切流节奏 <a class="header-anchor" href="#_1-思路一-通过发布批次控制切流节奏" aria-label="Permalink to &quot;1）思路一：通过发布批次控制切流节奏&quot;">​</a></h3><p>这是我们做业务页面迁移时比较常用的方法，即在应用M层修改 反向代理逻辑，使请求转发到新应用B，并通过发布的批数来控制切流节奏。</p><p><strong>优点</strong>: 修改方便，只需发布一次M，修改出错成本低； <strong>缺点</strong>: 无法控制用户访问新版老版，只能由应用M的lvs或VIPServer的负载均衡做随机分流，如果遇到流量不均衡问题，切流会十分不均衡。业务效果无法对比，因为用户会时而刷出新版，时而刷出老版。发布周期长，需要长时间占用发布流程。</p><p>上述方案一般用于 只迁移，不做业务数据对比的技术改造升级项目</p><h3 id="_2-思路二-在应用m层的tengine-nginx层做分流" tabindex="-1">2）思路二：在应用M层的tengine/nginx层做分流 <a class="header-anchor" href="#_2-思路二-在应用m层的tengine-nginx层做分流" aria-label="Permalink to &quot;2）思路二：在应用M层的tengine/nginx层做分流&quot;">​</a></h3><p><strong>优点</strong>: 分流策略可以根据cookie、ip、ua等灵活配置，可以比较精确的控制流量分布； <strong>缺点</strong>: 需要至少发布两次，配置较为复杂，容易搞出问题</p><p><strong>如果是仅仅进行技术迁移，一般用方案一即可，如果遇到需要精确流量控制或者需要准确的技术和业务数据对比那方案二无疑是比较好的</strong></p><h2 id="_3-在tengine-nginx-层做ab-test" tabindex="-1">3. 在tengine/nginx 层做AB test <a class="header-anchor" href="#_3-在tengine-nginx-层做ab-test" aria-label="Permalink to &quot;3. 在tengine/nginx 层做AB test&quot;">​</a></h2><h3 id="_1-分流器设计" tabindex="-1">1）分流器设计： <a class="header-anchor" href="#_1-分流器设计" aria-label="Permalink to &quot;1）分流器设计：&quot;">​</a></h3><p><strong>使用 if语句做分流器:</strong></p><p>例如我们对/abc/ path下的请求，cookie中含有version=1的转发到老应用，对version=2的转发到新应用：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $version </span><span style="color:#9ECBFF;">&quot;default&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_cookie </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;version=1&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $version </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($http_cookie </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;version=2&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $version </span><span style="color:#9ECBFF;">v2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/abc/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://A_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($versuib = v2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://B_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">......</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $version </span><span style="color:#032F62;">&quot;default&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_cookie </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;version=1&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $version </span><span style="color:#032F62;">v1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($http_cookie </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;version=2&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $version </span><span style="color:#032F62;">v2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/abc/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://A_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($versuib = v2) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://B_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">......</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><p><strong>使用 map做分流器：</strong></p><p>例如我们对/abc/ path下的请求，cookie中含有version=1的转发到老应用，对version=2的转发到新应用：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;"> $COOKIE_version $version </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">v2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">default</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/abc/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://A_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($versuib = v2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://B_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">map</span><span style="color:#24292E;"> $COOKIE_version $version </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">2</span><span style="color:#24292E;"> </span><span style="color:#032F62;">v2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> </span><span style="color:#032F62;">default</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/abc/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://A_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($versuib = v2) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://B_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span></code></pre></div><p>注： $COOKIE_version 是nginx的语法，指获取cookie中key=version的值</p><p><strong>使用split_clients 方法:</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">##下面在http 块中</span></span>
<span class="line"><span style="color:#B392F0;">split_clients</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$COOKIE_cna</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> $appversion </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">50%</span><span style="color:#E1E4E8;">     </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">*</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">v2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">##下面在server块中</span></span>
<span class="line"><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/abc/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://A_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($version = v2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://B_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">##下面在http 块中</span></span>
<span class="line"><span style="color:#6F42C1;">split_clients</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$COOKIE_cna</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> $appversion </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">50%</span><span style="color:#24292E;">     </span><span style="color:#032F62;">v1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">*</span><span style="color:#24292E;">       </span><span style="color:#032F62;">v2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">##下面在server块中</span></span>
<span class="line"><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/abc/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://A_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($version = v2) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://B_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span></code></pre></div><p>注：cna是我们常用的cookie分流的值，每一个用户的cna是一样的，保证能按照cookie进行分流</p><p><strong>使用lua 编写分流脚本:</strong></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">init_by_lua</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;  </span></span>
<span class="line"><span style="color:#9ECBFF;">               mmh2 = require &quot;murmurhash2&quot;  </span></span>
<span class="line"><span style="color:#9ECBFF;">      &#39;</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/abc/</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $version </span><span style="color:#9ECBFF;">&quot;default&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">set_by_lua</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">            local cna = ngx.var.cookie_cna;</span></span>
<span class="line"><span style="color:#9ECBFF;">            local hash_code = mmh2(cna) % 100;</span></span>
<span class="line"><span style="color:#9ECBFF;">            if hash_code &gt;= 50 then</span></span>
<span class="line"><span style="color:#9ECBFF;">                ngx.var.version = v1;</span></span>
<span class="line"><span style="color:#9ECBFF;">            else </span></span>
<span class="line"><span style="color:#9ECBFF;">                ngx.var.version = v2;</span></span>
<span class="line"><span style="color:#9ECBFF;">            end</span></span>
<span class="line"><span style="color:#9ECBFF;">        &#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://A_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($versuib = v2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">http://B_APP</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">init_by_lua</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;  </span></span>
<span class="line"><span style="color:#032F62;">               mmh2 = require &quot;murmurhash2&quot;  </span></span>
<span class="line"><span style="color:#032F62;">      &#39;</span><span style="color:#24292E;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">location</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/abc/</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $version </span><span style="color:#032F62;">&quot;default&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">set_by_lua</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">            local cna = ngx.var.cookie_cna;</span></span>
<span class="line"><span style="color:#032F62;">            local hash_code = mmh2(cna) % 100;</span></span>
<span class="line"><span style="color:#032F62;">            if hash_code &gt;= 50 then</span></span>
<span class="line"><span style="color:#032F62;">                ngx.var.version = v1;</span></span>
<span class="line"><span style="color:#032F62;">            else </span></span>
<span class="line"><span style="color:#032F62;">                ngx.var.version = v2;</span></span>
<span class="line"><span style="color:#032F62;">            end</span></span>
<span class="line"><span style="color:#032F62;">        &#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($version = v1) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://A_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($versuib = v2) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#032F62;">http://B_APP</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span></code></pre></div><p>注：mmh2 = require &quot;murmurhash2&quot; 为引入第三方hash函数：murmurhash2；</p><p><strong>处理第一次请求时无cookie情况：</strong></p><p>按照惯例，第一次无cookie的情况会随机一个数来进行分流，第二次来访问时再根据cookie进行重新分流，虽然会导致有1/2的概率会导致用户第一次访问和第二次不一致，但是由于我们的业务第一次无cookie访问的用户大部分是新用户，有超过60%的用户没有第二次访问，因此这个比例是比较小的。</p><p>如果要做到绝对的精确分流，就要对无cookie的用户增加一个cookie来标示其所属的桶。两种方法分别对应</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">set_by_lua</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    local cna = ngx.var.cookie_cna;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    if cna == &#39;&#39; or cna == nil then</span></span>
<span class="line"><span style="color:#9ECBFF;">        math.randomseed(1);</span></span>
<span class="line"><span style="color:#9ECBFF;">nvx.var.cookie_cna= math.random(0,100);</span></span>
<span class="line"><span style="color:#9ECBFF;">    end</span></span>
<span class="line"><span style="color:#9ECBFF;">  &#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">set_by_lua</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">    local cna = ngx.var.cookie_cna;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    if cna == &#39;&#39; or cna == nil then</span></span>
<span class="line"><span style="color:#032F62;">        math.randomseed(1);</span></span>
<span class="line"><span style="color:#032F62;">nvx.var.cookie_cna= math.random(0,100);</span></span>
<span class="line"><span style="color:#032F62;">    end</span></span>
<span class="line"><span style="color:#032F62;">  &#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>@@需要进行精确分流的方法</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">set</span><span style="color:#E1E4E8;"> $random_num </span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">set_by_lua</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;</span></span>
<span class="line"><span style="color:#9ECBFF;">    local cna = ngx.var.cookie_cna;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">    if cna == &#39;&#39; or cna == nil then</span></span>
<span class="line"><span style="color:#9ECBFF;">        math.randomseed(1);</span></span>
<span class="line"><span style="color:#9ECBFF;"> nvx.var.random_num = math.random(0,100);</span></span>
<span class="line"><span style="color:#9ECBFF;">    end</span></span>
<span class="line"><span style="color:#9ECBFF;">  &#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ($random_num </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">= </span><span style="color:#79B8FF;">101</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Set-Cookie</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;random_num=</span><span style="color:#E1E4E8;">$random_num</span><span style="color:#9ECBFF;">;&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 在后续的判断中首先根据random_num进行分流，再根据cna进行分流</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">set</span><span style="color:#24292E;"> $random_num </span><span style="color:#005CC5;">101</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">set_by_lua</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;</span></span>
<span class="line"><span style="color:#032F62;">    local cna = ngx.var.cookie_cna;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">    if cna == &#39;&#39; or cna == nil then</span></span>
<span class="line"><span style="color:#032F62;">        math.randomseed(1);</span></span>
<span class="line"><span style="color:#032F62;"> nvx.var.random_num = math.random(0,100);</span></span>
<span class="line"><span style="color:#032F62;">    end</span></span>
<span class="line"><span style="color:#032F62;">  &#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ($random_num </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">= </span><span style="color:#005CC5;">101</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">add_header</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Set-Cookie</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;random_num=</span><span style="color:#24292E;">$random_num</span><span style="color:#032F62;">;&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">## 在后续的判断中首先根据random_num进行分流，再根据cna进行分流</span></span></code></pre></div><h3 id="_2-分流比例控制" tabindex="-1">2）分流比例控制： <a class="header-anchor" href="#_2-分流比例控制" aria-label="Permalink to &quot;2）分流比例控制：&quot;">​</a></h3><p>中的默认都是设置的50%比例切流，如果“我们可爱的PD”要求2：8分咋整？要么我们改一下上面的比例重新发布一下，要么引入实时干预的某个东西。当然重新发布对于我们懒惰的程序员来说是无法忍受的。还好tengine支持访问diamond和tair：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">http</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">diamond_server</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">jmenv.tbsite.net:8080</span><span style="color:#E1E4E8;">;    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">diamond_app</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">group</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">dataid</span><span style="color:#E1E4E8;"> $content $version;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">split_clients</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">$COOKIE_cna</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> $appversion </span><span style="color:#9ECBFF;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        $content     </span><span style="color:#9ECBFF;">v1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">*</span><span style="color:#E1E4E8;">       </span><span style="color:#9ECBFF;">v2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">http</span><span style="color:#24292E;"> </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">diamond_server</span><span style="color:#24292E;"> </span><span style="color:#032F62;">jmenv.tbsite.net:8080</span><span style="color:#24292E;">;    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">diamond_app</span><span style="color:#24292E;"> </span><span style="color:#032F62;">group</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dataid</span><span style="color:#24292E;"> $content $version;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">split_clients</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">$COOKIE_cna</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> $appversion </span><span style="color:#032F62;">{</span></span>
<span class="line"><span style="color:#24292E;">        $content     </span><span style="color:#032F62;">v1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">*</span><span style="color:#24292E;">       </span><span style="color:#032F62;">v2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注: 上面代码未经线上测试，如要使用，请自行测试验证。content变量就是从diamond里面读取到的设置的ratio啦，可以设置为0%，10%，50%等等</p><h3 id="_3-分流打点与数据查看" tabindex="-1">3）分流打点与数据查看： <a class="header-anchor" href="#_3-分流打点与数据查看" aria-label="Permalink to &quot;3）分流打点与数据查看：&quot;">​</a></h3><p>只分流不打点，业务数据没法看啊，所以我们得想办法把新版和老版本区分开。我们可以在nginx里面搞定或者在新老版本的应用里面 打上对应的业务点位。在我们的实践中，是采用的第二种方案，是为了延续之前做BT的参数，使用resion_trace 字段中的cid打点。你也可以在新版中加个cookie: bts_v = 1, = 2, 然后在日志报表中 捞对应的cookie来判断</p><h2 id="_4-ip-分流" tabindex="-1">4.ip 分流 <a class="header-anchor" href="#_4-ip-分流" aria-label="Permalink to &quot;4.ip 分流&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">user  nginx;</span></span>
<span class="line"><span style="color:#e1e4e8;">worker_processes  1;</span></span>
<span class="line"><span style="color:#e1e4e8;">error_log  /var/log/nginx/error.log warn;</span></span>
<span class="line"><span style="color:#e1e4e8;">pid        /var/run/nginx.pid;</span></span>
<span class="line"><span style="color:#e1e4e8;">events {</span></span>
<span class="line"><span style="color:#e1e4e8;">    worker_connections  1024;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;">http {</span></span>
<span class="line"><span style="color:#e1e4e8;">    include       /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#e1e4e8;">    default_type  application/octet-stream;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    access_log  /var/log/nginx/access.log  main;</span></span>
<span class="line"><span style="color:#e1e4e8;">    sendfile        on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #tcp_nopush     on;</span></span>
<span class="line"><span style="color:#e1e4e8;">    keepalive_timeout  65;</span></span>
<span class="line"><span style="color:#e1e4e8;">    #gzip  on;</span></span>
<span class="line"><span style="color:#e1e4e8;">geo $remote_addr $geo {</span></span>
<span class="line"><span style="color:#e1e4e8;">     default 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">#     10.0.0.66/32 1;</span></span>
<span class="line"><span style="color:#e1e4e8;">     10.0.0.65/32 2;</span></span>
<span class="line"><span style="color:#e1e4e8;">     10.0.0.0/24 3;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream server_65 {</span></span>
<span class="line"><span style="color:#e1e4e8;">  server 10.0.0.65:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">upstream server_66 {</span></span>
<span class="line"><span style="color:#e1e4e8;">  server 10.0.0.66:80;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">     listen      80 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">     listen       [::]:80 default_server;</span></span>
<span class="line"><span style="color:#e1e4e8;">     server_name  _;</span></span>
<span class="line"><span style="color:#e1e4e8;">     root         /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($geo = 1) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        #return 200 &#39;this is for 10.0.0.66&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://server_66;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($geo = 2) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        #return 200 &#39;this is for 10.0.0.65&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">        proxy_pass http://server_65;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ($geo = 3) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        #return 200 &#39;this is for 10.0.0.0/24&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">           }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">user  nginx;</span></span>
<span class="line"><span style="color:#24292e;">worker_processes  1;</span></span>
<span class="line"><span style="color:#24292e;">error_log  /var/log/nginx/error.log warn;</span></span>
<span class="line"><span style="color:#24292e;">pid        /var/run/nginx.pid;</span></span>
<span class="line"><span style="color:#24292e;">events {</span></span>
<span class="line"><span style="color:#24292e;">    worker_connections  1024;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;">http {</span></span>
<span class="line"><span style="color:#24292e;">    include       /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#24292e;">    default_type  application/octet-stream;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#24292e;">                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    access_log  /var/log/nginx/access.log  main;</span></span>
<span class="line"><span style="color:#24292e;">    sendfile        on;</span></span>
<span class="line"><span style="color:#24292e;">    #tcp_nopush     on;</span></span>
<span class="line"><span style="color:#24292e;">    keepalive_timeout  65;</span></span>
<span class="line"><span style="color:#24292e;">    #gzip  on;</span></span>
<span class="line"><span style="color:#24292e;">geo $remote_addr $geo {</span></span>
<span class="line"><span style="color:#24292e;">     default 0;</span></span>
<span class="line"><span style="color:#24292e;">#     10.0.0.66/32 1;</span></span>
<span class="line"><span style="color:#24292e;">     10.0.0.65/32 2;</span></span>
<span class="line"><span style="color:#24292e;">     10.0.0.0/24 3;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">upstream server_65 {</span></span>
<span class="line"><span style="color:#24292e;">  server 10.0.0.65:80;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">upstream server_66 {</span></span>
<span class="line"><span style="color:#24292e;">  server 10.0.0.66:80;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">     listen      80 default_server;</span></span>
<span class="line"><span style="color:#24292e;">     listen       [::]:80 default_server;</span></span>
<span class="line"><span style="color:#24292e;">     server_name  _;</span></span>
<span class="line"><span style="color:#24292e;">     root         /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">    if ($geo = 1) {</span></span>
<span class="line"><span style="color:#24292e;">        #return 200 &#39;this is for 10.0.0.66&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://server_66;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    if ($geo = 2) {</span></span>
<span class="line"><span style="color:#24292e;">        #return 200 &#39;this is for 10.0.0.65&#39;;</span></span>
<span class="line"><span style="color:#24292e;">        proxy_pass http://server_65;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    if ($geo = 3) {</span></span>
<span class="line"><span style="color:#24292e;">        #return 200 &#39;this is for 10.0.0.0/24&#39;;</span></span>
<span class="line"><span style="color:#24292e;">           }</span></span></code></pre></div>`,43),c=[e];function t(r,i,y,E,F,d){return n(),a("div",null,c)}const _=s(o,[["render",t]]);export{h as __pageData,_ as default};
