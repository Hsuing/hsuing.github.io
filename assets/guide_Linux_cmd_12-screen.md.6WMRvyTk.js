import{_ as s,o as e,c as a,R as n}from"./chunks/framework.zUbWieqp.js";const u=JSON.parse('{"title":"一、什么是screen？","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Linux/cmd/12-screen.md","filePath":"guide/Linux/cmd/12-screen.md","lastUpdated":1713620657000}'),l={name:"guide/Linux/cmd/12-screen.md"},p=n(`<h1 id="一、什么是screen" tabindex="-1">一、什么是screen？ <a class="header-anchor" href="#一、什么是screen" aria-label="Permalink to &quot;一、什么是screen？&quot;">​</a></h1><p>Screen是一个可以在多个进程之间多路复用一个物理终端的全屏窗口管理器。Screen中有会话的概念，用户可以在一个会话中创建多个screen窗口，在每一个screen窗口中就像操作一个真实的telnet/SSH连接窗口那样。 通俗的讲，screen命令用于新建一个或多个“命令行窗口”，在新建的这“窗口”中，可以执行命令；每个“窗口”都是独立并行的</p><p>官方站点：<a href="http://www.gnu.org/software/screen/" target="_blank" rel="noreferrer">http://www.gnu.org/software/screen/</a></p><h1 id="二、安装screen" tabindex="-1">二、安装screen <a class="header-anchor" href="#二、安装screen" aria-label="Permalink to &quot;二、安装screen&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">yum install screen</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">yum install screen</span></span></code></pre></div><h1 id="三、使用screen" tabindex="-1">三、使用screen <a class="header-anchor" href="#三、使用screen" aria-label="Permalink to &quot;三、使用screen&quot;">​</a></h1><h3 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># screen [-AmRvx -ls -wipe][-d &lt;作业名称&gt;][-h &lt;行数&gt;][-r &lt;作业名称&gt;][-s ][-S &lt;作业名称&gt;]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># screen [-AmRvx -ls -wipe][-d &lt;作业名称&gt;][-h &lt;行数&gt;][-r &lt;作业名称&gt;][-s ][-S &lt;作业名称&gt;]</span></span></code></pre></div><h3 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-label="Permalink to &quot;选项&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">-A 　将所有的视窗都调整为目前终端机的大小。</span></span>
<span class="line"><span style="color:#e1e4e8;">-d &lt;作业名称&gt; 　将指定的screen作业离线。</span></span>
<span class="line"><span style="color:#e1e4e8;">-h &lt;行数&gt; 　指定视窗的缓冲区行数。</span></span>
<span class="line"><span style="color:#e1e4e8;">-m 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。</span></span>
<span class="line"><span style="color:#e1e4e8;">-r &lt;作业名称&gt; 　恢复离线的screen作业。</span></span>
<span class="line"><span style="color:#e1e4e8;">-R 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。</span></span>
<span class="line"><span style="color:#e1e4e8;">-s 　指定建立新视窗时，所要执行的shell。</span></span>
<span class="line"><span style="color:#e1e4e8;">-S &lt;作业名称&gt; 　指定screen作业的名称。</span></span>
<span class="line"><span style="color:#e1e4e8;">-v 　显示版本信息。</span></span>
<span class="line"><span style="color:#e1e4e8;">-x 　恢复之前离线的screen作业。</span></span>
<span class="line"><span style="color:#e1e4e8;">-ls或--list 　显示目前所有的screen作业。</span></span>
<span class="line"><span style="color:#e1e4e8;">-wipe 　检查目前所有的screen作业，并删除已经无法使用的screen作业。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">-A 　将所有的视窗都调整为目前终端机的大小。</span></span>
<span class="line"><span style="color:#24292e;">-d &lt;作业名称&gt; 　将指定的screen作业离线。</span></span>
<span class="line"><span style="color:#24292e;">-h &lt;行数&gt; 　指定视窗的缓冲区行数。</span></span>
<span class="line"><span style="color:#24292e;">-m 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。</span></span>
<span class="line"><span style="color:#24292e;">-r &lt;作业名称&gt; 　恢复离线的screen作业。</span></span>
<span class="line"><span style="color:#24292e;">-R 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。</span></span>
<span class="line"><span style="color:#24292e;">-s 　指定建立新视窗时，所要执行的shell。</span></span>
<span class="line"><span style="color:#24292e;">-S &lt;作业名称&gt; 　指定screen作业的名称。</span></span>
<span class="line"><span style="color:#24292e;">-v 　显示版本信息。</span></span>
<span class="line"><span style="color:#24292e;">-x 　恢复之前离线的screen作业。</span></span>
<span class="line"><span style="color:#24292e;">-ls或--list 　显示目前所有的screen作业。</span></span>
<span class="line"><span style="color:#24292e;">-wipe 　检查目前所有的screen作业，并删除已经无法使用的screen作业。</span></span></code></pre></div><h3 id="常用screen参数" tabindex="-1">常用screen参数 <a class="header-anchor" href="#常用screen参数" aria-label="Permalink to &quot;常用screen参数&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">screen -S yourname -&gt; 新建一个叫yourname的session</span></span>
<span class="line"><span style="color:#e1e4e8;">screen -ls -&gt; 列出当前所有的session</span></span>
<span class="line"><span style="color:#e1e4e8;">screen -r yourname -&gt; 回到yourname这个session</span></span>
<span class="line"><span style="color:#e1e4e8;">screen -d yourname -&gt; 远程detach某个session</span></span>
<span class="line"><span style="color:#e1e4e8;">screen -d -r yourname -&gt; 结束当前session并回到yourname这个session</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">screen -S yourname -&gt; 新建一个叫yourname的session</span></span>
<span class="line"><span style="color:#24292e;">screen -ls -&gt; 列出当前所有的session</span></span>
<span class="line"><span style="color:#24292e;">screen -r yourname -&gt; 回到yourname这个session</span></span>
<span class="line"><span style="color:#24292e;">screen -d yourname -&gt; 远程detach某个session</span></span>
<span class="line"><span style="color:#24292e;">screen -d -r yourname -&gt; 结束当前session并回到yourname这个session</span></span></code></pre></div><p>在每个screen session 下，所有命令都以 ctrl+a(C-a) 开始</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">C-a ? -&gt; 显示所有键绑定信息</span></span>
<span class="line"><span style="color:#e1e4e8;">C-a c -&gt; 创建一个新的运行shell的窗口并切换到该窗口</span></span>
<span class="line"><span style="color:#e1e4e8;">C-a n -&gt; Next，切换到下一个 window </span></span>
<span class="line"><span style="color:#e1e4e8;">C-a p -&gt; Previous，切换到前一个 window </span></span>
<span class="line"><span style="color:#e1e4e8;">C-a 0..9 -&gt; 切换到第 0..9 个 window</span></span>
<span class="line"><span style="color:#e1e4e8;">Ctrl+a [Space] -&gt; 由视窗0循序切换到视窗9</span></span>
<span class="line"><span style="color:#e1e4e8;">C-a C-a -&gt; 在两个最近使用的 window 间切换 </span></span>
<span class="line"><span style="color:#e1e4e8;">C-a x -&gt; 锁住当前的 window，需用用户密码解锁</span></span>
<span class="line"><span style="color:#e1e4e8;">C-a d -&gt; detach，暂时离开当前session，将目前的 screen session (可能含有多个 windows) 丢到后台执行，并会回到还没进 screen 时的状态，此时在 screen session 里，每个 window 内运行的 process (无论是前台/后台)都在继续执行，即使 logout 也不影响。 </span></span>
<span class="line"><span style="color:#e1e4e8;">C-a z -&gt; 把当前session放到后台执行，用 shell 的 fg 命令则可回去。</span></span>
<span class="line"><span style="color:#e1e4e8;">C-a w -&gt; 显示所有窗口列表</span></span>
<span class="line"><span style="color:#e1e4e8;">C-a t -&gt; time，显示当前时间，和系统的 load </span></span>
<span class="line"><span style="color:#e1e4e8;">C-a k -&gt; kill window，强行关闭当前的 window</span></span>
<span class="line"><span style="color:#e1e4e8;">C-a [ -&gt; 进入 copy mode，在 copy mode 下可以回滚、搜索、复制就像用使用 vi 一样</span></span>
<span class="line"><span style="color:#e1e4e8;">    C-b Backward，PageUp </span></span>
<span class="line"><span style="color:#e1e4e8;">    C-f Forward，PageDown </span></span>
<span class="line"><span style="color:#e1e4e8;">    H(大写) High，将光标移至左上角 </span></span>
<span class="line"><span style="color:#e1e4e8;">    L Low，将光标移至左下角 </span></span>
<span class="line"><span style="color:#e1e4e8;">    0 移到行首 </span></span>
<span class="line"><span style="color:#e1e4e8;">    $ 行末 </span></span>
<span class="line"><span style="color:#e1e4e8;">    w forward one word，以字为单位往前移 </span></span>
<span class="line"><span style="color:#e1e4e8;">    b backward one word，以字为单位往后移 </span></span>
<span class="line"><span style="color:#e1e4e8;">    Space 第一次按为标记区起点，第二次按为终点 </span></span>
<span class="line"><span style="color:#e1e4e8;">    Esc 结束 copy mode </span></span>
<span class="line"><span style="color:#e1e4e8;">C-a ] -&gt; paste，把刚刚在 copy mode 选定的内容贴上</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">C-a ? -&gt; 显示所有键绑定信息</span></span>
<span class="line"><span style="color:#24292e;">C-a c -&gt; 创建一个新的运行shell的窗口并切换到该窗口</span></span>
<span class="line"><span style="color:#24292e;">C-a n -&gt; Next，切换到下一个 window </span></span>
<span class="line"><span style="color:#24292e;">C-a p -&gt; Previous，切换到前一个 window </span></span>
<span class="line"><span style="color:#24292e;">C-a 0..9 -&gt; 切换到第 0..9 个 window</span></span>
<span class="line"><span style="color:#24292e;">Ctrl+a [Space] -&gt; 由视窗0循序切换到视窗9</span></span>
<span class="line"><span style="color:#24292e;">C-a C-a -&gt; 在两个最近使用的 window 间切换 </span></span>
<span class="line"><span style="color:#24292e;">C-a x -&gt; 锁住当前的 window，需用用户密码解锁</span></span>
<span class="line"><span style="color:#24292e;">C-a d -&gt; detach，暂时离开当前session，将目前的 screen session (可能含有多个 windows) 丢到后台执行，并会回到还没进 screen 时的状态，此时在 screen session 里，每个 window 内运行的 process (无论是前台/后台)都在继续执行，即使 logout 也不影响。 </span></span>
<span class="line"><span style="color:#24292e;">C-a z -&gt; 把当前session放到后台执行，用 shell 的 fg 命令则可回去。</span></span>
<span class="line"><span style="color:#24292e;">C-a w -&gt; 显示所有窗口列表</span></span>
<span class="line"><span style="color:#24292e;">C-a t -&gt; time，显示当前时间，和系统的 load </span></span>
<span class="line"><span style="color:#24292e;">C-a k -&gt; kill window，强行关闭当前的 window</span></span>
<span class="line"><span style="color:#24292e;">C-a [ -&gt; 进入 copy mode，在 copy mode 下可以回滚、搜索、复制就像用使用 vi 一样</span></span>
<span class="line"><span style="color:#24292e;">    C-b Backward，PageUp </span></span>
<span class="line"><span style="color:#24292e;">    C-f Forward，PageDown </span></span>
<span class="line"><span style="color:#24292e;">    H(大写) High，将光标移至左上角 </span></span>
<span class="line"><span style="color:#24292e;">    L Low，将光标移至左下角 </span></span>
<span class="line"><span style="color:#24292e;">    0 移到行首 </span></span>
<span class="line"><span style="color:#24292e;">    $ 行末 </span></span>
<span class="line"><span style="color:#24292e;">    w forward one word，以字为单位往前移 </span></span>
<span class="line"><span style="color:#24292e;">    b backward one word，以字为单位往后移 </span></span>
<span class="line"><span style="color:#24292e;">    Space 第一次按为标记区起点，第二次按为终点 </span></span>
<span class="line"><span style="color:#24292e;">    Esc 结束 copy mode </span></span>
<span class="line"><span style="color:#24292e;">C-a ] -&gt; paste，把刚刚在 copy mode 选定的内容贴上</span></span></code></pre></div><h2 id="状态介绍" tabindex="-1">状态介绍 <a class="header-anchor" href="#状态介绍" aria-label="Permalink to &quot;状态介绍&quot;">​</a></h2><p>通常情况下，screen创建的虚拟终端，有两个工作模式：</p><ul><li><em><strong>Attached</strong></em>：表示当前screen正在作为主终端使用，为活跃状态</li><li><em><strong>Detached</strong></em>：表示当前screen正在后台使用，为非激发状态</li></ul><h3 id="终端列表" tabindex="-1">终端列表 <a class="header-anchor" href="#终端列表" aria-label="Permalink to &quot;终端列表&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">screenv -ls</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">screenv -ls</span></span></code></pre></div><h3 id="新建终端" tabindex="-1">新建终端 <a class="header-anchor" href="#新建终端" aria-label="Permalink to &quot;新建终端&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">screen -R name_user</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Ctrl+a，再按d，即可保持这个screen到后台并回到主终端：</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">screen -R name_user</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Ctrl+a，再按d，即可保持这个screen到后台并回到主终端：</span></span></code></pre></div><ul><li>使用<code>-R</code>创建，如果之前有创建唯一一个同名的screen，则直接进入之前创建的screen</li><li>使用<code>-S</code>创建和直接输入<code>screen</code>创建的虚拟终端，不会检录之前创建的screen（<strong>也就是会创建同名的screen</strong>)</li></ul><h3 id="回到终端" tabindex="-1">回到终端 <a class="header-anchor" href="#回到终端" aria-label="Permalink to &quot;回到终端&quot;">​</a></h3><p>使用<code>-R</code>或者<code>-r</code>命令即可：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">screen -r [pid/name]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">pid/name：为虚拟终端PID或Name</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">screen -r [pid/name]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">pid/name：为虚拟终端PID或Name</span></span></code></pre></div><h3 id="清除终端" tabindex="-1">清除终端 <a class="header-anchor" href="#清除终端" aria-label="Permalink to &quot;清除终端&quot;">​</a></h3><p>比较推荐的方法，是进入对应虚拟终端，然后输入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 退出终端</span></span>
<span class="line"><span style="color:#e1e4e8;">exit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 退出终端</span></span>
<span class="line"><span style="color:#24292e;">exit</span></span></code></pre></div><ul><li>或者</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 使用-R/-r/-S均可</span></span>
<span class="line"><span style="color:#e1e4e8;">screen -R [pid/Name] -X quit</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 使用-R/-r/-S均可</span></span>
<span class="line"><span style="color:#24292e;">screen -R [pid/Name] -X quit</span></span></code></pre></div><h3 id="擦除全部的screen" tabindex="-1">擦除全部的screen <a class="header-anchor" href="#擦除全部的screen" aria-label="Permalink to &quot;擦除全部的screen&quot;">​</a></h3><p>服务器重启之后，全部的screen均会挂掉，需要借助擦除命令，将所有挂掉的screen清除掉</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">screen -wipe</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">screen -wipe</span></span></code></pre></div><h3 id="看更多的命令" tabindex="-1">看更多的命令 <a class="header-anchor" href="#看更多的命令" aria-label="Permalink to &quot;看更多的命令&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ctrl+a然后shift+?</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ctrl+a然后shift+?</span></span></code></pre></div><h3 id="screen-高级应用" tabindex="-1">screen 高级应用 <a class="header-anchor" href="#screen-高级应用" aria-label="Permalink to &quot;screen 高级应用&quot;">​</a></h3><p><strong>会话共享</strong></p><p>还有一种比较好玩的会话恢复，可以实现会话共享。假设你在和朋友在不同地点以相同用户登录一台机器，然后你创建一个screen会话，你朋友可以在他的终端上命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">[root@TS-DEV ~]# screen -x</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">[root@TS-DEV ~]# screen -x</span></span></code></pre></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h3>`,40),c=[p];function o(t,r,i,d,h,g){return e(),a("div",null,c)}const v=s(l,[["render",o]]);export{u as __pageData,v as default};
