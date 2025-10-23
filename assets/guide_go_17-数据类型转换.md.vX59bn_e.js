import{_ as s,o as n,c as a,R as l}from"./chunks/framework.zUbWieqp.js";const m=JSON.parse('{"title":"1. 数值转换字符串","description":"","frontmatter":{},"headers":[],"relativePath":"guide/go/17-数据类型转换.md","filePath":"guide/go/17-数据类型转换.md","lastUpdated":1725357249000}'),p={name:"guide/go/17-数据类型转换.md"},o=l(`<h1 id="_1-数值转换字符串" tabindex="-1">1. 数值转换字符串 <a class="header-anchor" href="#_1-数值转换字符串" aria-label="Permalink to &quot;1. 数值转换字符串&quot;">​</a></h1><p>strconv.Itoa</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">math</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">reflect</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">strconv</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">	计算圆的面积 , 半径为r, 面积为s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">函数名：are</span></span>
<span class="line"><span style="color:#6A737D;">参数：r float64</span></span>
<span class="line"><span style="color:#6A737D;">返回值：s float64</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">are</span><span style="color:#E1E4E8;">(r </span><span style="color:#F97583;">float64</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">float64</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	s </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> math.Pi </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> r </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> r</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 返回值，返回一个float64类型的值，用于用户访问的返回</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> s</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">	r </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">	s </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">are</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">float64</span><span style="color:#E1E4E8;">(r)) </span><span style="color:#6A737D;">// 类型转换，将int类型的r转换为float64类型的r</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;圆的面积是：&quot;</span><span style="color:#E1E4E8;">, s)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 数值转换字符串 ,strconv包</span></span>
<span class="line"><span style="color:#E1E4E8;">	i </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span></span>
<span class="line"><span style="color:#E1E4E8;">	stringNum </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> strconv.</span><span style="color:#79B8FF;">Itoa</span><span style="color:#E1E4E8;">(i) </span><span style="color:#6A737D;">// 将int类型的i转换为string类型的stringNum</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;将数值转换为字符串:&quot;</span><span style="color:#E1E4E8;">, stringNum)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 获取类型</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;获取类型:&quot;</span><span style="color:#E1E4E8;">, reflect.</span><span style="color:#79B8FF;">TypeOf</span><span style="color:#E1E4E8;">(stringNum))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 字符串转换数值 ,strconv包</span></span>
<span class="line"><span style="color:#E1E4E8;">	stringNum2 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	num, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> strconv.</span><span style="color:#79B8FF;">Atoi</span><span style="color:#E1E4E8;">(stringNum2) </span><span style="color:#6A737D;">// 将string类型的stringNum2转换为int类型的num</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;转换失败，错误信息：&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;num:&quot;</span><span style="color:#E1E4E8;">, num)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">math</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">reflect</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">strconv</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">	计算圆的面积 , 半径为r, 面积为s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">函数名：are</span></span>
<span class="line"><span style="color:#6A737D;">参数：r float64</span></span>
<span class="line"><span style="color:#6A737D;">返回值：s float64</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">are</span><span style="color:#24292E;">(r </span><span style="color:#D73A49;">float64</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">float64</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	s </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> math.Pi </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> r </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> r</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 返回值，返回一个float64类型的值，用于用户访问的返回</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> s</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">	r </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">	s </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">are</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">float64</span><span style="color:#24292E;">(r)) </span><span style="color:#6A737D;">// 类型转换，将int类型的r转换为float64类型的r</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;圆的面积是：&quot;</span><span style="color:#24292E;">, s)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 数值转换字符串 ,strconv包</span></span>
<span class="line"><span style="color:#24292E;">	i </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span></span>
<span class="line"><span style="color:#24292E;">	stringNum </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> strconv.</span><span style="color:#005CC5;">Itoa</span><span style="color:#24292E;">(i) </span><span style="color:#6A737D;">// 将int类型的i转换为string类型的stringNum</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;将数值转换为字符串:&quot;</span><span style="color:#24292E;">, stringNum)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 获取类型</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;获取类型:&quot;</span><span style="color:#24292E;">, reflect.</span><span style="color:#005CC5;">TypeOf</span><span style="color:#24292E;">(stringNum))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 字符串转换数值 ,strconv包</span></span>
<span class="line"><span style="color:#24292E;">	stringNum2 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#24292E;">	num, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> strconv.</span><span style="color:#005CC5;">Atoi</span><span style="color:#24292E;">(stringNum2) </span><span style="color:#6A737D;">// 将string类型的stringNum2转换为int类型的num</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;转换失败，错误信息：&quot;</span><span style="color:#24292E;">, err)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;num:&quot;</span><span style="color:#24292E;">, num)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="_2-字符串转换数值" tabindex="-1">2. 字符串转换数值 <a class="header-anchor" href="#_2-字符串转换数值" aria-label="Permalink to &quot;2. 字符串转换数值&quot;">​</a></h1><p>strconv.Atoi</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 字符串转换数值 ,strconv包</span></span>
<span class="line"><span style="color:#E1E4E8;">	stringNum2 </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	num, err </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> strconv.</span><span style="color:#79B8FF;">Atoi</span><span style="color:#E1E4E8;">(stringNum2) </span><span style="color:#6A737D;">// 将string类型的stringNum2转换为int类型的num</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;转换失败，错误信息：&quot;</span><span style="color:#E1E4E8;">, err)</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;num:&quot;</span><span style="color:#E1E4E8;">, num)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 字符串转换数值 ,strconv包</span></span>
<span class="line"><span style="color:#24292E;">	stringNum2 </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;100&quot;</span></span>
<span class="line"><span style="color:#24292E;">	num, err </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> strconv.</span><span style="color:#005CC5;">Atoi</span><span style="color:#24292E;">(stringNum2) </span><span style="color:#6A737D;">// 将string类型的stringNum2转换为int类型的num</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;转换失败，错误信息：&quot;</span><span style="color:#24292E;">, err)</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;num:&quot;</span><span style="color:#24292E;">, num)</span></span></code></pre></div><h1 id="_3-bool类型转换" tabindex="-1">3. bool类型转换 <a class="header-anchor" href="#_3-bool类型转换" aria-label="Permalink to &quot;3. bool类型转换&quot;">​</a></h1><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">fmt</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#B392F0;">strconv</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果是bool的就用strconv.ParseBool,如果是数值和字符串就用strconv.Itoa和strconv.Atoi</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 如果是bool类型，那么只能是1,0,true,false,True,False,TRUE,FALSE</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// strconv.Parsexxx ----&gt; 转换  布尔类型 1,true,True,TRUE,0,false,False,FALSE</span></span>
<span class="line"><span style="color:#E1E4E8;">	boo </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">	boo1, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> strconv.</span><span style="color:#79B8FF;">ParseBool</span><span style="color:#E1E4E8;">(boo)</span></span>
<span class="line"><span style="color:#E1E4E8;">	fmt.</span><span style="color:#79B8FF;">Println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;boo1:&quot;</span><span style="color:#E1E4E8;">, boo1)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">fmt</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#032F62;">&quot;</span><span style="color:#6F42C1;">strconv</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果是bool的就用strconv.ParseBool,如果是数值和字符串就用strconv.Itoa和strconv.Atoi</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 如果是bool类型，那么只能是1,0,true,false,True,False,TRUE,FALSE</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// strconv.Parsexxx ----&gt; 转换  布尔类型 1,true,True,TRUE,0,false,False,FALSE</span></span>
<span class="line"><span style="color:#24292E;">	boo </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;1&quot;</span></span>
<span class="line"><span style="color:#24292E;">	boo1, _ </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> strconv.</span><span style="color:#005CC5;">ParseBool</span><span style="color:#24292E;">(boo)</span></span>
<span class="line"><span style="color:#24292E;">	fmt.</span><span style="color:#005CC5;">Println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;boo1:&quot;</span><span style="color:#24292E;">, boo1)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,8),t=[o];function e(c,r,E,y,i,F){return n(),a("div",null,t)}const C=s(p,[["render",e]]);export{m as __pageData,C as default};
