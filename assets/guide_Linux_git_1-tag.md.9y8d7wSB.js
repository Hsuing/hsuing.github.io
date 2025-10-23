import{_ as s,o as a,c as n,R as e}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/git/1-tag.md","filePath":"guide/Linux/git/1-tag.md","lastUpdated":1701414740000}'),l={name:"guide/Linux/git/1-tag.md"},p=e(`<h2 id="_1-标签" tabindex="-1">1.标签 <a class="header-anchor" href="#_1-标签" aria-label="Permalink to &quot;1.标签&quot;">​</a></h2><h3 id="_1-标签的实质" tabindex="-1"><strong>1.标签的实质</strong> <a class="header-anchor" href="#_1-标签的实质" aria-label="Permalink to &quot;**1.标签的实质**&quot;">​</a></h3><p>标签与分支十分相似，都是指向某一次提交；并且，它们的值都为各自指向提交的<code>SHA1</code>值；但是，不同于会随着提交的变化而变化的分支，一旦给某次提交添加了标签，该标签就永远不会发生变化。</p><p><strong>「注意」</strong>：标签标识的是某一次提交，这次提交可以是任何分支上的任何一次提交</p><h4 id="两类标签" tabindex="-1"><strong>两类标签</strong> <a class="header-anchor" href="#两类标签" aria-label="Permalink to &quot;**两类标签**&quot;">​</a></h4><p><code>Git</code>标签有两种：</p><ul><li><strong>「轻量级标签」</strong>(<code>lightweight</code>)：不可添加注释；</li><li><strong>「带有附注的标签」</strong>(<code>annotated</code>)：可以添加注释；</li></ul><p>带注释的标签用于发布，而轻量级标签则用于私人或临时对象</p><p><strong>「什么时候打标签呢？」</strong></p><ul><li><strong>「版本发布」</strong>：一般<code>master</code>分支都会作为项目的发布分支，当项目开发到了一个成熟的阶段，准备在<code>master</code>分支进行发布时。一般都会在<code>master</code>分支的当前提交上打上一个类似&quot;<code>v1.2</code>&quot;的标签</li></ul><h3 id="_2-创建标签" tabindex="-1">2.创建标签 <a class="header-anchor" href="#_2-创建标签" aria-label="Permalink to &quot;2.创建标签&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#添加一个轻量级标签v1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">git tag v1.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#带有附注的标签v2.0</span></span>
<span class="line"><span style="color:#e1e4e8;">git tag -a v2.0 -m &#39;test&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">git dog</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">git dog为git log --all --decorate --oneline --graph的别名</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#添加一个轻量级标签v1.0</span></span>
<span class="line"><span style="color:#24292e;">git tag v1.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#带有附注的标签v2.0</span></span>
<span class="line"><span style="color:#24292e;">git tag -a v2.0 -m &#39;test&#39;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">git dog</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">git dog为git log --all --decorate --oneline --graph的别名</span></span></code></pre></div><p>查看存储标签文件的<code>.git/refs/tags</code>目录</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509223.png" alt=""></p><ul><li><code>tags</code>目录下存储着添加的标签文件<code>v1.0</code>和<code>v2.0</code>；</li><li>分别打开标签文件<code>v1.0</code>和<code>v2.0</code>，它们的值都是一个<code>SHA1</code>值，并且与添加标签时所在提交<code>mas2</code>的<code>SHA1</code>值<code>6920a6e...</code>相等。</li><li><code>emm...</code>等等！并不相等呀，只有<code>v1.0</code>的值与提交<code>mas2</code>的<code>SHA1</code>值相等，而与<code>v2.0</code>的值并不相等！</li><li>为什么给同一次提交<code>mas2</code>添加的标签，它们的<code>SHA1</code>值会不相等呢？这是因为<code>v1.0</code>是轻量级标签，而<code>v2.0</code>是带有附注的标签</li></ul><p>虽然两个标签标记的都是同一次提交，但是它们的构造不一样：</p><ul><li>轻量级标签<code>v1.0</code>直接将这次提交的<code>SHA1</code>值作为自己的<code>SHA1</code>值；</li><li>而带附注的标签<code>v2.0</code>会创建一个<code>tag</code>对象，它的<code>SHA1</code>值是<code>tag</code>对象的<code>SHA1</code>值；</li></ul><p>这就是轻量级标签与带有附注标签的区别。不过这两个标签仍然会指向同一次提交，如下图所示：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509218.png" alt=""></p><h3 id="_3-查看标签" tabindex="-1">3.查看标签 <a class="header-anchor" href="#_3-查看标签" aria-label="Permalink to &quot;3.查看标签&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#查看所有</span></span>
<span class="line"><span style="color:#e1e4e8;">git tag  或者 git tag --list</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看指定标签</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">tag与分支并没有关系，它标识的是某次特定的提交</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看标签内容</span></span>
<span class="line"><span style="color:#e1e4e8;">git show v1.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#查看所有</span></span>
<span class="line"><span style="color:#24292e;">git tag  或者 git tag --list</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看指定标签</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">tag与分支并没有关系，它标识的是某次特定的提交</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看标签内容</span></span>
<span class="line"><span style="color:#24292e;">git show v1.0</span></span></code></pre></div><p><strong>「轻量级标签」</strong>：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509904.png" alt=""></p><p>如图所示，该指令会显示标签<code>v1.0</code>所指向的提交；并且，会输出标签指向提交与上一次提交的比较结果；由于标签<code>v1.0</code>指向的提交为<code>master</code>分支的第一次提交，所以上一次提交为<code>null</code>。因此比较结果显示：相比于上一次提交，标签指向的提交<code>1st</code>在文件<code>test.txt</code>中新增了一行<code>1st</code>；</p><p><strong>「带注释的标签」</strong></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509845.png" alt=""></p><p>相比于轻量级标签，带附注的标签是一个对象，可以存储附注和打标签的人和时间等信息，所以显示的信息多一些；从图中的比较结果可知，相比于上一次提交<code>1st</code>，标签<code>v2.0</code>指向的提交<code>2nd</code>为文件<code>test.txt</code>新增了一行<code>2nd</code>；</p><h3 id="_4-查找标签" tabindex="-1">4.<strong>查找标签</strong> <a class="header-anchor" href="#_4-查找标签" aria-label="Permalink to &quot;4.**查找标签**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git tag -l</span></span>
<span class="line"><span style="color:#e1e4e8;">该方式支持正则表达式查找；</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git tag -l</span></span>
<span class="line"><span style="color:#24292e;">该方式支持正则表达式查找；</span></span></code></pre></div><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509314.png" alt=""></p><p>如上图所示：</p><ul><li><code>v*</code>表示搜索所有以<code>v</code>开头的标签；</li><li><code>?2*</code>表示搜索任意开头，但包含<code>2</code>的标签；</li></ul><h3 id="_5-将标签推送到远程" tabindex="-1">5.<strong>将标签推送到远程</strong> <a class="header-anchor" href="#_5-将标签推送到远程" aria-label="Permalink to &quot;5.**将标签推送到远程**&quot;">​</a></h3><h4 id="_5-1推送所有标签" tabindex="-1">5.1推送所有标签 <a class="header-anchor" href="#_5-1推送所有标签" aria-label="Permalink to &quot;5.1推送所有标签&quot;">​</a></h4><p>要将标签推送到远程仓库，首先要建立本地仓库与远程仓库的联系，比如可以采用：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git push -u origin master</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">git push origin --tag</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">或者</span></span>
<span class="line"><span style="color:#e1e4e8;">git push --tag</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git push -u origin master</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">git push origin --tag</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">或者</span></span>
<span class="line"><span style="color:#24292e;">git push --tag</span></span></code></pre></div><h4 id="_5-2指定标签推送" tabindex="-1">5.2指定标签推送 <a class="header-anchor" href="#_5-2指定标签推送" aria-label="Permalink to &quot;5.2指定标签推送&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git push origin tag_name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git push origin tag_name</span></span></code></pre></div><h4 id="_5-3推送个标签到远程" tabindex="-1">5.3推送个标签到远程 <a class="header-anchor" href="#_5-3推送个标签到远程" aria-label="Permalink to &quot;5.3推送个标签到远程&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git push origin  v2.0 v3.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git push origin  v2.0 v3.0</span></span></code></pre></div><p><strong>「完整写法为」</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git push origin refs/tags/v4.0:refs/tags/v4.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git push origin refs/tags/v4.0:refs/tags/v4.0</span></span></code></pre></div><h3 id="_6-删除远程标签" tabindex="-1">6.<strong>删除远程标签</strong> <a class="header-anchor" href="#_6-删除远程标签" aria-label="Permalink to &quot;6.**删除远程标签**&quot;">​</a></h3><h4 id="_6-1第1种" tabindex="-1">6.1第1种 <a class="header-anchor" href="#_6-1第1种" aria-label="Permalink to &quot;6.1第1种&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#只删除远程</span></span>
<span class="line"><span style="color:#e1e4e8;">git push origin :tag_name</span></span>
<span class="line"><span style="color:#e1e4e8;">如：</span></span>
<span class="line"><span style="color:#e1e4e8;">git push origin :v3.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#完整方式</span></span>
<span class="line"><span style="color:#e1e4e8;">git push origin :refs/tags/v3.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#只删除远程</span></span>
<span class="line"><span style="color:#24292e;">git push origin :tag_name</span></span>
<span class="line"><span style="color:#24292e;">如：</span></span>
<span class="line"><span style="color:#24292e;">git push origin :v3.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#完整方式</span></span>
<span class="line"><span style="color:#24292e;">git push origin :refs/tags/v3.0</span></span></code></pre></div><h4 id="_6-2第2种" tabindex="-1">6.2第2种 <a class="header-anchor" href="#_6-2第2种" aria-label="Permalink to &quot;6.2第2种&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git push origin --delete tag_name</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如：</span></span>
<span class="line"><span style="color:#e1e4e8;">git push origin --delete v2.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git push origin --delete tag_name</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如：</span></span>
<span class="line"><span style="color:#24292e;">git push origin --delete v2.0</span></span></code></pre></div><h3 id="_7-删除本地标签" tabindex="-1">7.<strong>删除本地标签</strong> <a class="header-anchor" href="#_7-删除本地标签" aria-label="Permalink to &quot;7.**删除本地标签**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git tag -d tag_name</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">如：</span></span>
<span class="line"><span style="color:#e1e4e8;">#删除</span></span>
<span class="line"><span style="color:#e1e4e8;">git tag -d v3.0</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#查看</span></span>
<span class="line"><span style="color:#e1e4e8;">git tag</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git tag -d tag_name</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">如：</span></span>
<span class="line"><span style="color:#24292e;">#删除</span></span>
<span class="line"><span style="color:#24292e;">git tag -d v3.0</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#查看</span></span>
<span class="line"><span style="color:#24292e;">git tag</span></span></code></pre></div><h3 id="_8-切换标签" tabindex="-1">8.<strong>切换标签</strong> <a class="header-anchor" href="#_8-切换标签" aria-label="Permalink to &quot;8.**切换标签**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">git checkout</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">git checkout</span></span></code></pre></div><p>如图所示，在<code>master</code>分支上进行了三次提交，并且添加了相应的标签：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509822.png" alt=""></p><p>当我们通过<code>checkout</code>命令切换到标签<code>v2.0</code>时</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509841.png" alt=""></p><p>可见，会出现游离的提交。此时查看各分支状态</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509640.png" alt=""></p><p>如上图所示，当前处于标签<code>v2.0</code>指向的提交，并且切换标签的过程中改变了<code>HEAD</code>指针的指向。但是，并没有改变分支<code>master</code>的指向。过程如下图所示：</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202312011509369.png" alt=""></p><p>也就是说，切换标签与使用<code>reset</code>进行版本回退十分相似。只不过切换标签只改变了<code>HEAD</code>指针的指向，会造成游离的提交。若有需要可以创建一个新分支进行保存</p><h3 id="_9-拉取标签" tabindex="-1">9.<strong>拉取标签</strong> <a class="header-anchor" href="#_9-拉取标签" aria-label="Permalink to &quot;9.**拉取标签**&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#拉取所有标签</span></span>
<span class="line"><span style="color:#e1e4e8;">git pull</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#指定标签拉取,前提是已经clone过</span></span>
<span class="line"><span style="color:#e1e4e8;">git pull git@xxx:xxx/AdServer.git tag_name</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">#没有clone 过,指定标签</span></span>
<span class="line"><span style="color:#e1e4e8;">git clone -b 0.8.0 https://gitee.com/xx/xxx.git</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#拉取所有标签</span></span>
<span class="line"><span style="color:#24292e;">git pull</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#指定标签拉取,前提是已经clone过</span></span>
<span class="line"><span style="color:#24292e;">git pull git@xxx:xxx/AdServer.git tag_name</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">#没有clone 过,指定标签</span></span>
<span class="line"><span style="color:#24292e;">git clone -b 0.8.0 https://gitee.com/xx/xxx.git</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">通过shell 脚本自动获取最新tag，并输入最新版本后，推到git上</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 拉取分支上现有的tags</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">git fetch --tags</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo -e &quot;所有tag列表&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">git tag -l -n</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo -e &quot;\${tagList}&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#获取最新版本tag</span></span>
<span class="line"><span style="color:#e1e4e8;">LatestTag=$(git describe --tags \`git rev-list --tags --max-count=1\`)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo -e &quot;最新版本tag......&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">echo -e &quot;$LatestTag&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">echo -e &quot;请输入要新增的版本号...... 如 v1.0.1&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">#输入tag名称</span></span>
<span class="line"><span style="color:#e1e4e8;">read tagName</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">git tag \${tagName}</span></span>
<span class="line"><span style="color:#e1e4e8;">#推到分支上</span></span>
<span class="line"><span style="color:#e1e4e8;">git push origin \${tagName}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">通过shell 脚本自动获取最新tag，并输入最新版本后，推到git上</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 拉取分支上现有的tags</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">git fetch --tags</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo -e &quot;所有tag列表&quot;</span></span>
<span class="line"><span style="color:#24292e;">git tag -l -n</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo -e &quot;\${tagList}&quot;</span></span>
<span class="line"><span style="color:#24292e;">#获取最新版本tag</span></span>
<span class="line"><span style="color:#24292e;">LatestTag=$(git describe --tags \`git rev-list --tags --max-count=1\`)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo -e &quot;最新版本tag......&quot;</span></span>
<span class="line"><span style="color:#24292e;">echo -e &quot;$LatestTag&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">echo -e &quot;请输入要新增的版本号...... 如 v1.0.1&quot;</span></span>
<span class="line"><span style="color:#24292e;">#输入tag名称</span></span>
<span class="line"><span style="color:#24292e;">read tagName</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">git tag \${tagName}</span></span>
<span class="line"><span style="color:#24292e;">#推到分支上</span></span>
<span class="line"><span style="color:#24292e;">git push origin \${tagName}</span></span></code></pre></div>`,63),o=[p];function c(t,i,r,g,d,h){return a(),n("div",null,o)}const v=s(l,[["render",c]]);export{u as __pageData,v as default};
