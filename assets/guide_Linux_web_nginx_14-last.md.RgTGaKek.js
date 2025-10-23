import{_ as s,o as n,c as a,R as e}from"./chunks/framework.zUbWieqp.js";const l="/assets/1.zzwRjvcQ.png",p="/assets/2.zYRVOKkd.png",w=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/web/nginx/14-last.md","filePath":"guide/Linux/web/nginx/14-last.md","lastUpdated":1701684699000}'),o={name:"guide/Linux/web/nginx/14-last.md"},t=e(`<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">rewrite语法：</span></span>
<span class="line"><span style="color:#B392F0;">　　指令语法：rewrite</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">regex</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">replacement[flag]</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">　　默认值：none</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">　　应用位置：server、location、if</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">　　rewrite是实现URL重定向的重要指令，他根据regex(正则表达式</span><span style="color:#E1E4E8;">)来匹配内容跳转到replacement，结尾是flag标记</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">rewrite语法：</span></span>
<span class="line"><span style="color:#6F42C1;">　　指令语法：rewrite</span><span style="color:#24292E;"> </span><span style="color:#032F62;">regex</span><span style="color:#24292E;"> </span><span style="color:#032F62;">replacement[flag]</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">　　默认值：none</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">　　应用位置：server、location、if</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">　　rewrite是实现URL重定向的重要指令，他根据regex(正则表达式</span><span style="color:#24292E;">)来匹配内容跳转到replacement，结尾是flag标记</span></span></code></pre></div><p>一．正则表达式匹配，其中：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~</span><span style="color:#E1E4E8;"> 为区分大小写匹配</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> 为不区分大小写匹配</span></span>
<span class="line"><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#B392F0;">~和!~*分别为区分大小写不匹配及不区分大小写不匹配</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~</span><span style="color:#24292E;"> 为区分大小写匹配</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> 为不区分大小写匹配</span></span>
<span class="line"><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">~和!~*分别为区分大小写不匹配及不区分大小写不匹配</span></span></code></pre></div><p>二．文件及目录匹配，其中：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">-f和!-f用来判断是否存在文件</span></span>
<span class="line"><span style="color:#B392F0;">-d和!-d用来判断是否存在目录</span></span>
<span class="line"><span style="color:#B392F0;">-e和!-e用来判断是否存在文件或目录</span></span>
<span class="line"><span style="color:#B392F0;">-x和!-x用来判断文件是否可执行</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">-f和!-f用来判断是否存在文件</span></span>
<span class="line"><span style="color:#6F42C1;">-d和!-d用来判断是否存在目录</span></span>
<span class="line"><span style="color:#6F42C1;">-e和!-e用来判断是否存在文件或目录</span></span>
<span class="line"><span style="color:#6F42C1;">-x和!-x用来判断文件是否可执行</span></span></code></pre></div><ul><li>常用正则表达式</li></ul><table><thead><tr><th>字符</th><th>描述</th></tr></thead><tbody><tr><td>\\</td><td>将后面接着的字符标记为一个特殊字符或者一个原义字符或一个向后引用</td></tr><tr><td>^</td><td>匹配输入字符串的起始位置</td></tr><tr><td>$</td><td>匹配输入字符串的结束位置</td></tr><tr><td>*</td><td>匹配前面的字符零次或者多次</td></tr><tr><td>+</td><td>匹配前面字符串一次或者多次</td></tr><tr><td>?</td><td>匹配前面字符串的零次或者一次</td></tr><tr><td>.</td><td>匹配除“\\n”之外的所有单个字符</td></tr><tr><td>(pattern)</td><td>匹配括号内的pattern</td></tr></tbody></table><ul><li>总的正则表达</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">|字符             | 描述                           |</span></span>
<span class="line"><span style="color:#e1e4e8;">| ------------------ | --------------------------------  |</span></span>
<span class="line"><span style="color:#e1e4e8;">|\\ |将下一个字符标记符、或一个向后引用、或一个八进制转义符。例如，“\\\\n”匹配\\n。“\\n”匹配换行符。序列“\\\\”匹配“\\”而“\\(”则匹配“(”。即相当于多种编程语言中都有的“转义字符”的概念。))|</span></span>
<span class="line"><span style="color:#e1e4e8;">|^ |匹配输入字行首。如果设置了RegExp对象的Multiline属性，^也匹配“\\n”或“\\r”之后的位置|</span></span>
<span class="line"><span style="color:#e1e4e8;">|$ |匹配输入行尾。如果设置了RegExp对象的Multiline属性，$也匹配“\\n”或“\\r”之前的位置|</span></span>
<span class="line"><span style="color:#e1e4e8;">|***** |匹配前面的子表达式任意次。例如，zo*能匹配“z”，也能匹配“zo”以及“zoo”。*等价于{0,}|</span></span>
<span class="line"><span style="color:#e1e4e8;">|+ |匹配前面的子表达式一次或多次(大于等于1次）。例如，“zo+”能匹配“zo”以及“zoo”，但不能匹配“z”。+等价于{1,}。|</span></span>
<span class="line"><span style="color:#e1e4e8;">|? |匹配前面的子表达式零次或一次。例如，“do(es)?”可以匹配“do”或“does”。?等价于{0,1}|</span></span>
<span class="line"><span style="color:#e1e4e8;">|{n} |n是一个非负整数。匹配确定的n次。例如，“o{2}”不能匹配“Bob”中的“o”，但是能匹配“food”中的两个o|</span></span>
<span class="line"><span style="color:#e1e4e8;">|{n,}| n是一个非负整数。至少匹配n次。例如，“o{2,}”不能匹配“Bob”中的“o”，但能匹配“foooood”中的所有o。“o{1,}”等价于“o+”。“o{0,}&quot;则等价于“o*&quot;|</span></span>
<span class="line"><span style="color:#e1e4e8;">|{n,m} |m和n均为非负整数，其中n&lt;=m。最少匹配n次且最多匹配m次。例如，“o{1,3}”将匹配“fooooood”中的前三个o为一组，后三个o为一组。“o{0,1}”等价于“o?”。请注意在逗号和两个数之间不能有空格|</span></span>
<span class="line"><span style="color:#e1e4e8;">|? | 当该字符紧跟在任何一个其他限制符（*,+,?，{n}，{n,}，{n,m}）后面时，匹配模式是非贪婪的。非贪婪模式尽可能少地匹配所搜索的字符串，而默认的贪婪模式则尽可能多地匹配所搜索的字符串。例如，对于字符串“oooo”，“o+”将尽可能多地匹配“o”，得到结果[“oooo”]，而“o+?”将尽可能少地匹配“o”，得到结果 [&#39;o&#39;, &#39;o&#39;, &#39;o&#39;, &#39;o&#39;]|</span></span>
<span class="line"><span style="color:#e1e4e8;">|.点| 匹配除“\\n”和&quot;\\r&quot;之外的任何单个字符。要匹配包括“\\n”和&quot;\\r&quot;在内的任何字符，请使用像“[\\s\\S]”的模式|</span></span>
<span class="line"><span style="color:#e1e4e8;">|(pattern)| 匹配pattern并获取这一匹配。所获取的匹配可以从产生的Matches集合得到，在VBScript中使用SubMatches集合，在JScript中则使用$0…$9属性。要匹配圆括号字符，请使用“\\(”或“\\)”|</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">|字符             | 描述                           |</span></span>
<span class="line"><span style="color:#24292e;">| ------------------ | --------------------------------  |</span></span>
<span class="line"><span style="color:#24292e;">|\\ |将下一个字符标记符、或一个向后引用、或一个八进制转义符。例如，“\\\\n”匹配\\n。“\\n”匹配换行符。序列“\\\\”匹配“\\”而“\\(”则匹配“(”。即相当于多种编程语言中都有的“转义字符”的概念。))|</span></span>
<span class="line"><span style="color:#24292e;">|^ |匹配输入字行首。如果设置了RegExp对象的Multiline属性，^也匹配“\\n”或“\\r”之后的位置|</span></span>
<span class="line"><span style="color:#24292e;">|$ |匹配输入行尾。如果设置了RegExp对象的Multiline属性，$也匹配“\\n”或“\\r”之前的位置|</span></span>
<span class="line"><span style="color:#24292e;">|***** |匹配前面的子表达式任意次。例如，zo*能匹配“z”，也能匹配“zo”以及“zoo”。*等价于{0,}|</span></span>
<span class="line"><span style="color:#24292e;">|+ |匹配前面的子表达式一次或多次(大于等于1次）。例如，“zo+”能匹配“zo”以及“zoo”，但不能匹配“z”。+等价于{1,}。|</span></span>
<span class="line"><span style="color:#24292e;">|? |匹配前面的子表达式零次或一次。例如，“do(es)?”可以匹配“do”或“does”。?等价于{0,1}|</span></span>
<span class="line"><span style="color:#24292e;">|{n} |n是一个非负整数。匹配确定的n次。例如，“o{2}”不能匹配“Bob”中的“o”，但是能匹配“food”中的两个o|</span></span>
<span class="line"><span style="color:#24292e;">|{n,}| n是一个非负整数。至少匹配n次。例如，“o{2,}”不能匹配“Bob”中的“o”，但能匹配“foooood”中的所有o。“o{1,}”等价于“o+”。“o{0,}&quot;则等价于“o*&quot;|</span></span>
<span class="line"><span style="color:#24292e;">|{n,m} |m和n均为非负整数，其中n&lt;=m。最少匹配n次且最多匹配m次。例如，“o{1,3}”将匹配“fooooood”中的前三个o为一组，后三个o为一组。“o{0,1}”等价于“o?”。请注意在逗号和两个数之间不能有空格|</span></span>
<span class="line"><span style="color:#24292e;">|? | 当该字符紧跟在任何一个其他限制符（*,+,?，{n}，{n,}，{n,m}）后面时，匹配模式是非贪婪的。非贪婪模式尽可能少地匹配所搜索的字符串，而默认的贪婪模式则尽可能多地匹配所搜索的字符串。例如，对于字符串“oooo”，“o+”将尽可能多地匹配“o”，得到结果[“oooo”]，而“o+?”将尽可能少地匹配“o”，得到结果 [&#39;o&#39;, &#39;o&#39;, &#39;o&#39;, &#39;o&#39;]|</span></span>
<span class="line"><span style="color:#24292e;">|.点| 匹配除“\\n”和&quot;\\r&quot;之外的任何单个字符。要匹配包括“\\n”和&quot;\\r&quot;在内的任何字符，请使用像“[\\s\\S]”的模式|</span></span>
<span class="line"><span style="color:#24292e;">|(pattern)| 匹配pattern并获取这一匹配。所获取的匹配可以从产生的Matches集合得到，在VBScript中使用SubMatches集合，在JScript中则使用$0…$9属性。要匹配圆括号字符，请使用“\\(”或“\\)”|</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">(?:pattern) 非获取匹配，匹配pattern但不获取匹配结果，不进行存储供以后使用。这在使用或字符“(|)”来组合一个模式的各个部分时很有用。例如“industr(?:y|ies)”就是一个比“industry|industries”更简略的表达式</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(?=pattern) 非获取匹配，正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如，“Windows(?=95|98|NT|2000)”能匹配“Windows2000”中的“Windows”，但不能匹配“Windows3.1”中的“Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(?!pattern) 非获取匹配，正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如“Windows(?!95|98|NT|2000)”能匹配“Windows3.1”中的“Windows”，但不能匹配“Windows2000”中的“Windows”</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(?&lt;=pattern)&gt;) 非获取匹配，反向肯定预查，与正向肯定预查类似，只是方向相反。例如，“(?&lt;=95|98|NT|2000)Windows”能匹配“2000Windows”中的“Windows”，但不能匹配“3.1Windows”中的“Windows”。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">“(?&lt;=95|98|NT|2000)Windows”目前在python3.6中re模块测试会报错，用“|”连接的字符串长度必须一样，这里“95|98|NT”的长度都是2，“2000”的长度是4，会报错&gt;)&gt;)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">(?&lt;!patte_n)&gt;) 非获取匹配，反向否定预查，与正向否定预查类似，只是方向相反。例如“(?&lt;!95|98|NT|2000)Windows”能匹配“3.1Windows”中的“Windows”，但不能匹配“2000Windows”中的“Windows”。这个地方不正确，有问题</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">此处用或任意一项都不能超过2位，如“(?&lt;!95|98|NT|20)Windows正确，“(?&lt;!95|980|NT|20)Windows 报错，若是单独使用则无限制，如(?&lt;!2000)Windows 正确匹配</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">* rewrite 最后一项flag参数</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">| 标记符号             | 说明                           |</span></span>
<span class="line"><span style="color:#e1e4e8;">| ------------------ | --------------------------------  |</span></span>
<span class="line"><span style="color:#e1e4e8;">|last   |本条规则匹配完成后继续向下匹配新的location URI规则|</span></span>
<span class="line"><span style="color:#e1e4e8;">|break  |本条规则匹配完成后终止，不在匹配任何规则|</span></span>
<span class="line"><span style="color:#e1e4e8;">|redirect   |返回302临时重定向,浏览器地址会显示跳转后的URL地址|</span></span>
<span class="line"><span style="color:#e1e4e8;">|permanent  |返回301永久重定向,浏览器地址会显示跳转后的URL地址|</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">(?:pattern) 非获取匹配，匹配pattern但不获取匹配结果，不进行存储供以后使用。这在使用或字符“(|)”来组合一个模式的各个部分时很有用。例如“industr(?:y|ies)”就是一个比“industry|industries”更简略的表达式</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(?=pattern) 非获取匹配，正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如，“Windows(?=95|98|NT|2000)”能匹配“Windows2000”中的“Windows”，但不能匹配“Windows3.1”中的“Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(?!pattern) 非获取匹配，正向否定预查，在任何不匹配pattern的字符串开始处匹配查找字符串，该匹配不需要获取供以后使用。例如“Windows(?!95|98|NT|2000)”能匹配“Windows3.1”中的“Windows”，但不能匹配“Windows2000”中的“Windows”</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(?&lt;=pattern)&gt;) 非获取匹配，反向肯定预查，与正向肯定预查类似，只是方向相反。例如，“(?&lt;=95|98|NT|2000)Windows”能匹配“2000Windows”中的“Windows”，但不能匹配“3.1Windows”中的“Windows”。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">“(?&lt;=95|98|NT|2000)Windows”目前在python3.6中re模块测试会报错，用“|”连接的字符串长度必须一样，这里“95|98|NT”的长度都是2，“2000”的长度是4，会报错&gt;)&gt;)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">(?&lt;!patte_n)&gt;) 非获取匹配，反向否定预查，与正向否定预查类似，只是方向相反。例如“(?&lt;!95|98|NT|2000)Windows”能匹配“3.1Windows”中的“Windows”，但不能匹配“2000Windows”中的“Windows”。这个地方不正确，有问题</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">此处用或任意一项都不能超过2位，如“(?&lt;!95|98|NT|20)Windows正确，“(?&lt;!95|980|NT|20)Windows 报错，若是单独使用则无限制，如(?&lt;!2000)Windows 正确匹配</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">* rewrite 最后一项flag参数</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">| 标记符号             | 说明                           |</span></span>
<span class="line"><span style="color:#24292e;">| ------------------ | --------------------------------  |</span></span>
<span class="line"><span style="color:#24292e;">|last   |本条规则匹配完成后继续向下匹配新的location URI规则|</span></span>
<span class="line"><span style="color:#24292e;">|break  |本条规则匹配完成后终止，不在匹配任何规则|</span></span>
<span class="line"><span style="color:#24292e;">|redirect   |返回302临时重定向,浏览器地址会显示跳转后的URL地址|</span></span>
<span class="line"><span style="color:#24292e;">|permanent  |返回301永久重定向,浏览器地址会显示跳转后的URL地址|</span></span></code></pre></div><p>应用场景： 调整用户浏览的URL，看起来规范 为了让搜索引擎收录网站内容，让用户体验更好 网站更换新域名后 根据特殊的变量、目录、客户端信息进行跳转</p><p>使用last和break实现URI重写，浏览器地址栏不变。而且两者有细微差别，使用alias指令必须用last标记;使用proxy_pass指令时，需要使用break标记。Last标记在本条rewrite规则执行完毕后，会对其所在server{......}标签重新发起请求，而break标记则在本条规则匹配完成后，终止匹配。 例如：如果我们将类似URL/photo/123456 重定向到/path/to/photo/12/1234/123456.png rewrite &quot;/photo/([0-9]{2})([0-9]{2})([0-9]{2})&quot;/path/to/photo/$1/$1$2/$1$2$3.png ;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 1.last和break</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">用法：</span></span>
<span class="line"><span style="color:#e1e4e8;">    两个指令用法相同，但含义不同，需要放到rewrite规则的末尾，用来控制重写后的链接是否继续被nginx配置执行(主要是rewrite、return指令)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 1.last和break</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">用法：</span></span>
<span class="line"><span style="color:#24292e;">    两个指令用法相同，但含义不同，需要放到rewrite规则的末尾，用来控制重写后的链接是否继续被nginx配置执行(主要是rewrite、return指令)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /test/break {  # break测试 location1</span></span>
<span class="line"><span style="color:#e1e4e8;">  rewrite ^.*/test(.*)$ &quot;/here&quot; break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /test/last {   # last测试 location2</span></span>
<span class="line"><span style="color:#e1e4e8;">  rewrite ^.*/test(.*)$ &quot;/here&quot; last;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /here {    # 正常地址 location3</span></span>
<span class="line"><span style="color:#e1e4e8;">  default_type text/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">  return 200 &quot;&lt;h1&gt;ok&lt;/h1&gt;&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /test/break {  # break测试 location1</span></span>
<span class="line"><span style="color:#24292e;">  rewrite ^.*/test(.*)$ &quot;/here&quot; break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /test/last {   # last测试 location2</span></span>
<span class="line"><span style="color:#24292e;">  rewrite ^.*/test(.*)$ &quot;/here&quot; last;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /here {    # 正常地址 location3</span></span>
<span class="line"><span style="color:#24292e;">  default_type text/html;</span></span>
<span class="line"><span style="color:#24292e;">  return 200 &quot;&lt;h1&gt;ok&lt;/h1&gt;&quot;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>break 只要匹配到规则，就回去本地路径目录中寻找请求的文件； last 匹配到规则，跳转后没有内容，则带着跳转后的请求，重新的向server发起一次请求</p><p>break请求： 1.请求rw.test.com/break； 2.首先，会去查找本地的/code/rewrite/test/index.html； 3.如果找到了，则返回/code/rewrite/test/index.html内容； 4.如果没有找到则返回404，找到目录却没有主页，则返回403；</p><p>last请求： 1.请求rw.test.com/last; 2.首先，会去查找本地的/code/rewrite/test/index.html； 3.如果找到了，则返回/code/rewrite/test/index.html内容； 4.如果没找到，会带着新跳转的URI再向server发起一次请求，请求rw.test.com/test; 5.如果匹配到新的location，则返回该location匹配的内容； 6.如果没有匹配到新的，则再返回404或403；</p><h2 id="_1-首先测试下break-请求-test-break" tabindex="-1">1.首先测试下break, 请求/test/break <a class="header-anchor" href="#_1-首先测试下break-请求-test-break" aria-label="Permalink to &quot;1.首先测试下break, 请求/test/break&quot;">​</a></h2><p><img src="`+l+'" alt="1"></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>请求/test/break 匹配到location1，然后地址重写为/here，返回404，表示没有再次匹配location</p></div><h2 id="_2-测试last-请求-test-last" tabindex="-1">2.测试last, 请求/test/last <a class="header-anchor" href="#_2-测试last-请求-test-last" aria-label="Permalink to &quot;2.测试last, 请求/test/last&quot;">​</a></h2><p><img src="'+p+`" alt="1"></p><p>请求/test/break 匹配到location2，然后地址重写为/here，正常返回ok页面，表示重写后又再次匹配所有location</p><p>总结：</p><p>break表示重写后停止不再匹配，last表示重写后跳到server块再次用重写后的地址匹配</p><ul><li>用途：</li></ul><p>1.break一般用于接口重定向，例如将<a href="http://127.0.0.1/down/123.xls" target="_blank" rel="noreferrer">http://127.0.0.1/down/123.xls</a>...😕/192.168.0.1:8080/file/123.xls(解决跨域下载)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /down {</span></span>
<span class="line"><span style="color:#e1e4e8;">  rewrite ^/down(.*)$ &quot;http://192.168.0.1:8080/file$1&quot; break;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /down {</span></span>
<span class="line"><span style="color:#24292e;">  rewrite ^/down(.*)$ &quot;http://192.168.0.1:8080/file$1&quot; break;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>2.last用于请求路径发生改变的常规需求，例如将<a href="http://127.0.0.1/request/getlist" target="_blank" rel="noreferrer">http://127.0.0.1/request/getlist</a> 放在了对应 <a href="http://127.0.0.1/api/getlist" target="_blank" rel="noreferrer">http://127.0.0.1/api/getlist</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">location /request {</span></span>
<span class="line"><span style="color:#e1e4e8;">  rewrite ^/request(.*)$ &quot;/api&quot; last;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">location /api {</span></span>
<span class="line"><span style="color:#e1e4e8;">  default_type Application/json;</span></span>
<span class="line"><span style="color:#e1e4e8;">  return 200 &#39;{&quot;code&quot;:0,data:[1,2,3]}&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">location /request {</span></span>
<span class="line"><span style="color:#24292e;">  rewrite ^/request(.*)$ &quot;/api&quot; last;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">location /api {</span></span>
<span class="line"><span style="color:#24292e;">  default_type Application/json;</span></span>
<span class="line"><span style="color:#24292e;">  return 200 &#39;{&quot;code&quot;:0,data:[1,2,3]}&#39;;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_3-域名跳转" tabindex="-1">3. 域名跳转 <a class="header-anchor" href="#_3-域名跳转" aria-label="Permalink to &quot;3. 域名跳转&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">        listen       80;</span></span>
<span class="line"><span style="color:#e1e4e8;">        server_name  brian.com;</span></span>
<span class="line"><span style="color:#e1e4e8;">        location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">            root   html/brian;</span></span>
<span class="line"><span style="color:#e1e4e8;">            index  index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    if ( $http_host ~* &quot;^(.*)&quot;) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        set $domain $1;</span></span>
<span class="line"><span style="color:#e1e4e8;">        rewrite ^(.*) http://www.baidu.com break;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">        listen       80;</span></span>
<span class="line"><span style="color:#24292e;">        server_name  brian.com;</span></span>
<span class="line"><span style="color:#24292e;">        location / {</span></span>
<span class="line"><span style="color:#24292e;">            root   html/brian;</span></span>
<span class="line"><span style="color:#24292e;">            index  index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    if ( $http_host ~* &quot;^(.*)&quot;) {</span></span>
<span class="line"><span style="color:#24292e;">        set $domain $1;</span></span>
<span class="line"><span style="color:#24292e;">        rewrite ^(.*) http://www.baidu.com break;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 4，redirect和permanent的区别</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">**redirect:** 每次请求都会询问服务器，是否跳转，如果服务器不可用，则跳转失败</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">**permanent:** 请求一次后，会记录跳转的地址，以后不再询问，直接跳转，通过浏览器缓存记录</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">## 5，Rewrite 匹配规则</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#### 1.rewrite匹配的优先级</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">\`\`\`bash</span></span>
<span class="line"><span style="color:#e1e4e8;">1.先执行server模块的rewrite指令</span></span>
<span class="line"><span style="color:#e1e4e8;">2.其次执行location匹配规则</span></span>
<span class="line"><span style="color:#e1e4e8;">3.最后执行location里面的rewrite</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 4，redirect和permanent的区别</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">**redirect:** 每次请求都会询问服务器，是否跳转，如果服务器不可用，则跳转失败</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">**permanent:** 请求一次后，会记录跳转的地址，以后不再询问，直接跳转，通过浏览器缓存记录</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">## 5，Rewrite 匹配规则</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#### 1.rewrite匹配的优先级</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">\`\`\`bash</span></span>
<span class="line"><span style="color:#24292e;">1.先执行server模块的rewrite指令</span></span>
<span class="line"><span style="color:#24292e;">2.其次执行location匹配规则</span></span>
<span class="line"><span style="color:#24292e;">3.最后执行location里面的rewrite</span></span></code></pre></div>`,33),c=[t];function r(i,d,y,h,u,g){return n(),a("div",null,c)}const k=s(o,[["render",r]]);export{w as __pageData,k as default};
