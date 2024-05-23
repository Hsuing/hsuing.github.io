import{_ as a,c as n,o,R as s}from"./chunks/framework.CIzs38F0.js";const u=JSON.parse('{"title":"1.解决 golang 中 grep console 插件不生效问题","description":"","frontmatter":{},"headers":[],"relativePath":"guide/faq/9-goland.md","filePath":"guide/faq/9-goland.md","lastUpdated":1715940689000}'),e={name:"guide/faq/9-goland.md"},t=s('<h1 id="_1-解决-golang-中-grep-console-插件不生效问题" tabindex="-1">1.解决 golang 中 grep console 插件不生效问题 <a class="header-anchor" href="#_1-解决-golang-中-grep-console-插件不生效问题" aria-label="Permalink to &quot;1.解决 golang 中 grep console 插件不生效问题&quot;">​</a></h1><p>日志多了以后不好找，idea 中的神奇 grep console 在 goland 竟然不好使了，</p><ol><li>ctrl+shift+a 找到 Registry</li></ol><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401221037467.png" alt="image-20240122103650425"></p><p>2.找到go.run.processes.with.pty,改为 false</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202401221037636.png" alt="image-202401221037534951"></p><p>之后关闭窗口即可</p><h1 id="_2-一条竖线" tabindex="-1">2.一条竖线 <a class="header-anchor" href="#_2-一条竖线" aria-label="Permalink to &quot;2.一条竖线&quot;">​</a></h1><p><strong>去掉编辑界面中右侧的一条竖线</strong></p><p>按下 Ctrl+Shift+A</p><p>输入 show right margin</p><p>选择 off</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202404101006220.png" alt="image-20240410100628540"></p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202404101007106.png" alt="image-20240410100727963"></p><h1 id="_3-unhandled-err" tabindex="-1">3.unhandled err <a class="header-anchor" href="#_3-unhandled-err" aria-label="Permalink to &quot;3.unhandled err&quot;">​</a></h1><p>现象，</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202404101018532.png" alt="image-20240410101836128"></p><p>解决方式，</p><p>file----&gt;setting，直接搜索</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202404101022899.png" alt="image-20240410102200842"></p><h1 id="_4-调整内存" tabindex="-1">4.调整内存 <a class="header-anchor" href="#_4-调整内存" aria-label="Permalink to &quot;4.调整内存&quot;">​</a></h1><p>点击“Help” -&gt; “Edit Custom VM Options”来编辑虚拟机参数。在打开的文件中，我们可以更改-Xmx参数来设置Goland能够使用的最大堆内存大小</p><p><img src="https://nnaigos.oss-cn-hangzhou.aliyuncs.com/imgs/202405161203389.png" alt="image-20240516120254567"></p>',23),i=[t];function g(p,l,r,c,h,d){return o(),n("div",null,i)}const _=a(e,[["render",g]]);export{u as __pageData,_ as default};