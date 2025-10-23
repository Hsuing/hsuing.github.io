import{_ as s,o as a,c as e,R as n}from"./chunks/framework.zUbWieqp.js";const _=JSON.parse('{"title":"1.数据库","description":"","frontmatter":{},"headers":[],"relativePath":"guide/Database/SqlServer/17-sp.md","filePath":"guide/Database/SqlServer/17-sp.md","lastUpdated":1729160572000}'),p={name:"guide/Database/SqlServer/17-sp.md"},l=n(`<h1 id="_1-数据库" tabindex="-1">1.数据库 <a class="header-anchor" href="#_1-数据库" aria-label="Permalink to &quot;1.数据库&quot;">​</a></h1><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">--sp_helpdb:报告有关指定数据库或所有数据库的信息。</span></span>
<span class="line"><span style="color:#E1E4E8;">sp_helpdb </span><span style="color:#6A737D;">--显示所有数据库信息（名称、大小等）</span></span>
<span class="line"><span style="color:#E1E4E8;">sp_helpdb Recruitment </span><span style="color:#6A737D;">--显示Recruitment数据库信息（名称、大小等）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--sp_renamedb:更改数据库的名称。</span></span>
<span class="line"><span style="color:#E1E4E8;">sp_renamedb ’pubs’,’pub’</span><span style="color:#6A737D;">--将名为pubs的数据库改名为pub</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--sp_dboption：显示或更改数据库选项。不能在master 或tempdb 数据库上使用sp_dboption。</span></span>
<span class="line"><span style="color:#E1E4E8;">sp_dboption ’Recruitment’,’</span><span style="color:#F97583;">READ</span><span style="color:#E1E4E8;"> ONLY’,’TRUE’</span><span style="color:#6A737D;">--设置Recruitment数据库为READ ONLY</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">--sp_helpdb:报告有关指定数据库或所有数据库的信息。</span></span>
<span class="line"><span style="color:#24292E;">sp_helpdb </span><span style="color:#6A737D;">--显示所有数据库信息（名称、大小等）</span></span>
<span class="line"><span style="color:#24292E;">sp_helpdb Recruitment </span><span style="color:#6A737D;">--显示Recruitment数据库信息（名称、大小等）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--sp_renamedb:更改数据库的名称。</span></span>
<span class="line"><span style="color:#24292E;">sp_renamedb ’pubs’,’pub’</span><span style="color:#6A737D;">--将名为pubs的数据库改名为pub</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--sp_dboption：显示或更改数据库选项。不能在master 或tempdb 数据库上使用sp_dboption。</span></span>
<span class="line"><span style="color:#24292E;">sp_dboption ’Recruitment’,’</span><span style="color:#D73A49;">READ</span><span style="color:#24292E;"> ONLY’,’TRUE’</span><span style="color:#6A737D;">--设置Recruitment数据库为READ ONLY</span></span></code></pre></div><h1 id="_2-表" tabindex="-1">2.表 <a class="header-anchor" href="#_2-表" aria-label="Permalink to &quot;2.表&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">--sp_help:当前数据库中查找对象。</span></span>
<span class="line"><span style="color:#B392F0;">sp_help Employee --显示Employee表的结构</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">--sp_rename:更改当前数据库中用户创建对象（如表、列或用户定义数据类型）的名称。</span></span>
<span class="line"><span style="color:#B392F0;">sp_rename ’employee’,’employ’</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">--sp_help:当前数据库中查找对象。</span></span>
<span class="line"><span style="color:#6F42C1;">sp_help Employee --显示Employee表的结构</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">--sp_rename:更改当前数据库中用户创建对象（如表、列或用户定义数据类型）的名称。</span></span>
<span class="line"><span style="color:#6F42C1;">sp_rename ’employee’,’employ’</span></span></code></pre></div><h1 id="_3-用户自定义数据类型" tabindex="-1">3.用户自定义数据类型 <a class="header-anchor" href="#_3-用户自定义数据类型" aria-label="Permalink to &quot;3.用户自定义数据类型&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">--sp_addtype：创建用户定义的数据类型。</span></span>
<span class="line"><span style="color:#B392F0;">sp_addtype birthday, datetime, ’NULL’</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">--创建了一个名为birthday 的用户定义数据类型（基于datetime），该数据类型允许空值</span></span>
<span class="line"><span style="color:#B392F0;">--sp_droptype: 删除用户定义的数据类型。</span></span>
<span class="line"><span style="color:#B392F0;">sp_droptype ’birthday’--删除用户定义的数据类型birthday</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">--sp_help：查看用户自定义数据类型的情况</span></span>
<span class="line"><span style="color:#B392F0;">sp_help birthday --查看用户定义的数据类型birthday的信息</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">--sp_addtype：创建用户定义的数据类型。</span></span>
<span class="line"><span style="color:#6F42C1;">sp_addtype birthday, datetime, ’NULL’</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">--创建了一个名为birthday 的用户定义数据类型（基于datetime），该数据类型允许空值</span></span>
<span class="line"><span style="color:#6F42C1;">--sp_droptype: 删除用户定义的数据类型。</span></span>
<span class="line"><span style="color:#6F42C1;">sp_droptype ’birthday’--删除用户定义的数据类型birthday</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">--sp_help：查看用户自定义数据类型的情况</span></span>
<span class="line"><span style="color:#6F42C1;">sp_help birthday --查看用户定义的数据类型birthday的信息</span></span></code></pre></div><h1 id="_4-规则" tabindex="-1">4.规则 <a class="header-anchor" href="#_4-规则" aria-label="Permalink to &quot;4.规则&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">--sp_bindrule：将规则绑定到列或用户定义的数据类型。</span></span>
<span class="line"><span style="color:#B392F0;">sp_bindrule rulType,’Titles.Type’--将规则rulType绑定到Titles表的Type列</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">--sp_unbindrule：在当前数据库中为列或用户定义数据类型解除规则绑定。</span></span>
<span class="line"><span style="color:#B392F0;">sp_unbindrule ’Titles.Type’--取消绑定到Tiltes表中的Type列的规则</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">--sp_helptext:查看规则的详细信息。</span></span>
<span class="line"><span style="color:#B392F0;">sp_helptext rulType --查看规则rulType的详细信息</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">--sp_bindrule：将规则绑定到列或用户定义的数据类型。</span></span>
<span class="line"><span style="color:#6F42C1;">sp_bindrule rulType,’Titles.Type’--将规则rulType绑定到Titles表的Type列</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">--sp_unbindrule：在当前数据库中为列或用户定义数据类型解除规则绑定。</span></span>
<span class="line"><span style="color:#6F42C1;">sp_unbindrule ’Titles.Type’--取消绑定到Tiltes表中的Type列的规则</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">--sp_helptext:查看规则的详细信息。</span></span>
<span class="line"><span style="color:#6F42C1;">sp_helptext rulType --查看规则rulType的详细信息</span></span></code></pre></div><h1 id="_5-缺省" tabindex="-1">5.缺省 <a class="header-anchor" href="#_5-缺省" aria-label="Permalink to &quot;5.缺省&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--sp_bindefault:将默认值绑定到列或用户定义的数据类型。</span></span>
<span class="line"><span style="color:#e1e4e8;">--sp_unbindefault:在当前数据库中为列或者用户定义数据类型解除（删除）默认值绑定。</span></span>
<span class="line"><span style="color:#e1e4e8;">--sp_helptext:查看默认值的信息。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--sp_bindefault:将默认值绑定到列或用户定义的数据类型。</span></span>
<span class="line"><span style="color:#24292e;">--sp_unbindefault:在当前数据库中为列或者用户定义数据类型解除（删除）默认值绑定。</span></span>
<span class="line"><span style="color:#24292e;">--sp_helptext:查看默认值的信息。</span></span></code></pre></div><h1 id="_6-索引" tabindex="-1">6.索引 <a class="header-anchor" href="#_6-索引" aria-label="Permalink to &quot;6.索引&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--sp_helpindex：报告有关表或视图上索引的信息。</span></span>
<span class="line"><span style="color:#e1e4e8;">--sp_helpindex employee    --查看employee表中索引信息</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--sp_helpindex：报告有关表或视图上索引的信息。</span></span>
<span class="line"><span style="color:#24292e;">--sp_helpindex employee    --查看employee表中索引信息</span></span></code></pre></div><h1 id="_7-视图" tabindex="-1">7.视图 <a class="header-anchor" href="#_7-视图" aria-label="Permalink to &quot;7.视图&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--sp_helptext:查看视图文本</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--sp_helptext:查看视图文本</span></span></code></pre></div><h1 id="_8-存储过程" tabindex="-1">8.存储过程 <a class="header-anchor" href="#_8-存储过程" aria-label="Permalink to &quot;8.存储过程&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"> --sp_helptext:查看存储过程文本</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"> --sp_helptext:查看存储过程文本</span></span></code></pre></div><h1 id="_9-触发器" tabindex="-1">9.触发器 <a class="header-anchor" href="#_9-触发器" aria-label="Permalink to &quot;9.触发器&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">--sp_help &lt;触发器名&gt;：查看指定触发器是否存在</span></span>
<span class="line"><span style="color:#e1e4e8;">--sp_helptrigger:返回指定表中定义的当前数据库的触发器类型。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">--sp_help &lt;触发器名&gt;：查看指定触发器是否存在</span></span>
<span class="line"><span style="color:#24292e;">--sp_helptrigger:返回指定表中定义的当前数据库的触发器类型。</span></span></code></pre></div><h1 id="_10-其它" tabindex="-1">10.其它 <a class="header-anchor" href="#_10-其它" aria-label="Permalink to &quot;10.其它&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">--sp_help：报告有关数据库对象、用户定义数据类型或 数据类型的信息。</span></span>
<span class="line"><span style="color:#e1e4e8;">--sp_helptext:显示规则、默认值、未加密的存储过程、用户定义函数、触发器或视图的文本。</span></span>
<span class="line"><span style="color:#e1e4e8;">--sp_rename:更改当前数据库中用户创建对象（如表、列或用户定义数据类型）的名称。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">--sp_help：报告有关数据库对象、用户定义数据类型或 数据类型的信息。</span></span>
<span class="line"><span style="color:#24292e;">--sp_helptext:显示规则、默认值、未加密的存储过程、用户定义函数、触发器或视图的文本。</span></span>
<span class="line"><span style="color:#24292e;">--sp_rename:更改当前数据库中用户创建对象（如表、列或用户定义数据类型）的名称。</span></span></code></pre></div>`,20),t=[l];function o(c,i,r,d,h,y){return a(),e("div",null,t)}const b=s(p,[["render",o]]);export{_ as __pageData,b as default};
